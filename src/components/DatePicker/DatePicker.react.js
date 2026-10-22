import React, { useRef, useState, forwardRef, useImperativeHandle, useMemo } from 'react';

import { Icon } from "../"
import { format, isValid, parse } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { usePositioning } from '../../helpers/Floating.react';
import FocusTrap from 'focus-trap-react';

import es from 'date-fns/locale/es';
import 'react-day-picker/dist/style.css';
import './DatePicker.css';

const currentYear = new Date().getFullYear();
const currentMonth = new Date();
const defaultFromMonth = new Date(currentYear - 5, 0);
const defaultToMonth = new Date(currentYear, 11);

const DayPickerTLV = forwardRef((props, ref) => {
    const { date, dateIni, toMonth, fromMonth, lastDate, today, previousDay = null, isHistoric = true, disabled = false } = props

    const dateIniData = useMemo(() => {
        const valueDate = new Date(dateIni != undefined ? dateIni : currentMonth)
        if (!today) {
            valueDate.setDate(valueDate.getDate() - (previousDay ?? 1))
        }

        return valueDate
    }, [dateIni, today, previousDay])
    const dateData = date != undefined ? new Date(date) : dateIniData

    const [inputValue, setInputValue] = useState(format(new Date(dateData.getFullYear(), dateData.getMonth(), dateData.getDate()), 'dd/MM/y'));
    const [selected, setSelected] = useState(date);
    const [isPopperOpen, setIsPopperOpen] = useState(false);

    const [referenceElement, setReferenceElement] = useState(null);
    const buttonRef = useRef(null);
    const floating = usePositioning({
        reference: referenceElement,
        open: isPopperOpen,
        placement: 'bottom-start'
    });

    useImperativeHandle(ref, () => {
        return { 
            value: parse(inputValue, 'dd/MM/y', new Date()),
            reset: () => setInputValue(format(new Date(dateData.getFullYear(), dateData.getMonth(), dateData.getDate()), 'dd/MM/y'))
        }
    })

    const closePopper = () => {
        setIsPopperOpen(false);
        buttonRef.current.focus();
    };

    const handleInputChange = (e) => {
        const { value } = e.currentTarget;

        setInputValue(value);
        const date = parse(value, 'dd/MM/y', new Date());
        if (isValid(date)) {
            setSelected(date);
        } else {
            setSelected(undefined);
        }
    };

    const handleButtonClick = () => {
        setIsPopperOpen(true);
    };

    const handleDaySelect = (date) => {
        setSelected(date);
        if (date) {
            setInputValue(format(date, 'dd/MM/y'));
            closePopper();
        } else {
            setInputValue('');
        }
    };

    return (
        <div>
            <div ref={setReferenceElement} className="DayPicker">
                <input
                    type="text"
                    placeholder={format(new Date(), 'dd/MM/y')}
                    value={inputValue}
                    onChange={handleInputChange}
                    className="input-reset pa2 ma2 bg-white black ba"
                />
                <button
                    ref={buttonRef}
                    type="button"
                    aria-label="Pick a date"
                    onClick={handleButtonClick}
                >
                    <Icon prefix="fe" name="calendar" />
                </button>
            </div>
            {isPopperOpen && (
                <FocusTrap
                    active
                    focusTrapOptions={{
                        initialFocus: false,
                        allowOutsideClick: true,
                        clickOutsideDeactivates: true,
                        onDeactivate: closePopper
                    }}
                >
                    <div
                        tabIndex={-1}
                        style={floating.floatingStyles}
                        className="dialog-sheet"
                        data-placement={floating.placement}
                        ref={floating.refs.setFloating}
                        role="dialog"
                    >
                        <DayPicker
                            {...props}
                            initialFocus={isPopperOpen}
                            mode="single"
                            timeZone="+01:00"
                            defaultMonth={selected == null ? dateIniData : selected}
                            selected={selected}
                            onSelect={handleDaySelect}
                            disabled={disabled || [
                                {
                                    before: !isHistoric && lastDate,
                                    after: isHistoric && (lastDate ?? dateIniData),
                                }
                            ]}
                            today={dateIniData}
                            fromMonth={fromMonth || defaultFromMonth}
                            toMonth={toMonth || defaultToMonth}
                            locale={es}
                            captionLayout="buttons"
                        />
                    </div>
                </FocusTrap>
            )}
        </div>
    );
})

DayPickerTLV.displayName = "DatePicker"

export default DayPickerTLV
