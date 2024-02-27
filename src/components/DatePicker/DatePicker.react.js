import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

import { Icon } from "../"
import { format, isValid, parse } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { usePopper } from 'react-popper';
import FocusTrap from 'focus-trap-react';

import es from 'date-fns/locale/es';
import 'react-day-picker/dist/style.css';
import './DatePicker.css';

const currentYear = new Date().getFullYear();
const currentMonth = new Date();
const fromMonth = new Date(currentYear - 5, 0);
const toMonth = new Date(currentYear, 11);

const DayPickerTLV = forwardRef((props, ref) => {
    const { date, dateIni } = props

    const dateIniData = dateIni != undefined ? new Date(dateIni) : currentMonth;
    const dateData = date != undefined ? new Date(date) : dateIniData;

    const [inputValue, setInputValue] = useState(format(new Date(dateData.getFullYear(), dateData.getMonth(), dateData.getDate()), 'dd/MM/y'));
    const [selected, setSelected] = useState(date);
    const [isPopperOpen, setIsPopperOpen] = useState(false);

    const popperRef = useRef(null);
    const buttonRef = useRef(null);
    const [popperElement, setPopperElement] = useState(null);

    const popper = usePopper(popperRef.current, popperElement, {
        placement: 'bottom-start'
    });

    useImperativeHandle(ref, () => {
        return parse(inputValue, 'dd/MM/y', new Date())
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
            <div ref={popperRef} className="DayPicker">
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
                        style={popper.styles.popper}
                        className="dialog-sheet"
                        {...popper.attributes.popper}
                        ref={setPopperElement}
                        role="dialog"
                    >
                        <DayPicker
                            {...props}
                            initialFocus={isPopperOpen}
                            mode="single"
                            defaultMonth={selected == null ? dateIniData : selected}
                            selected={selected}
                            onSelect={handleDaySelect}
                            disabled={[
                                {
                                    after: dateIniData,
                                }
                            ]}
                            today={dateIniData}
                            fromMonth={fromMonth}
                            toMonth={toMonth}
                            locale={es}
                            captionLayout="buttons"
                        />
                    </div>
                </FocusTrap>
            )}
        </div>
    );
})

export default DayPickerTLV