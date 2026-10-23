import React, { useRef, useState, forwardRef, useImperativeHandle, useMemo } from 'react';

import { Icon } from "../"
import { format, isValid, parse } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { usePositioning } from '../../helpers/Floating.react';
import FocusTrap from 'focus-trap-react';

import { es } from 'date-fns/locale/es';
import 'react-day-picker/style.css';
import './DatePicker.css';

const currentYear = new Date().getFullYear();
const currentMonth = new Date();
const defaultFromMonth = new Date(currentYear - 5, 0);
const defaultToMonth = new Date(currentYear, 11);

const DayPickerTLV = forwardRef((props, ref) => {
    const {
        date, dateIni, toMonth, fromMonth, lastDate, today,
        previousDay = null, isHistoric = true, disabled = false,
        ...calendarProps
    } = props

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
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const [referenceElement, setReferenceElement] = useState(null);
    const buttonRef = useRef(null);
    const floating = usePositioning({
        reference: referenceElement,
        open: isCalendarOpen,
        placement: 'bottom-start'
    });

    useImperativeHandle(ref, () => {
        return { 
            value: parse(inputValue, 'dd/MM/y', new Date()),
            reset: () => {
                setInputValue(format(new Date(dateData.getFullYear(), dateData.getMonth(), dateData.getDate()), 'dd/MM/y'));
                setSelected(date);
            }
        }
    })

    const closeCalendar = () => {
        setIsCalendarOpen(false);
        buttonRef.current?.focus();
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
        setIsCalendarOpen(true);
    };

    const handleDaySelect = (date) => {
        setSelected(date);
        if (date) {
            setInputValue(format(date, 'dd/MM/y'));
            closeCalendar();
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
            {isCalendarOpen && (
                <FocusTrap
                    active
                    focusTrapOptions={{
                        initialFocus: false,
                        fallbackFocus: () => floating.refs.floating.current,
                        allowOutsideClick: true,
                        clickOutsideDeactivates: true,
                        onDeactivate: closeCalendar
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
                            {...calendarProps}
                            className={["tabler-datepicker-calendar", calendarProps.className].filter(Boolean).join(" ")}
                            autoFocus={isCalendarOpen}
                            mode="single"
                            defaultMonth={selected == null ? dateIniData : selected}
                            selected={selected}
                            onSelect={handleDaySelect}
                            disabled={disabled || (isHistoric
                                ? { after: lastDate ?? dateIniData }
                                : lastDate ? { before: lastDate } : undefined)}
                            today={dateIniData}
                            startMonth={fromMonth || calendarProps.startMonth || defaultFromMonth}
                            endMonth={toMonth || calendarProps.endMonth || defaultToMonth}
                            locale={es}
                            captionLayout="label"
                        />
                    </div>
                </FocusTrap>
            )}
        </div>
    );
})

DayPickerTLV.displayName = "DatePicker"

export default DayPickerTLV
