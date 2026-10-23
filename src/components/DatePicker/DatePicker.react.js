import React, { useRef, useState, forwardRef, useImperativeHandle, useMemo, useEffect, useId } from 'react';

import { Icon } from "../"
import { addDays, format, isValid, parse, startOfDay } from 'date-fns';
import { DayPicker, dateMatchModifiers } from 'react-day-picker';
import { usePositioning } from '../../helpers/Floating.react';
import FocusTrap from 'focus-trap-react';

import { es } from 'date-fns/locale/es';
import 'react-day-picker/style.css';
import './DatePicker.css';

const DayPickerTLV = forwardRef((props, ref) => {
    const {
        date, dateIni, toMonth, fromMonth, lastDate, today,
        previousDay = null, isHistoric = true, disabled = false,
        ...calendarProps
    } = props

    const [currentDay, setCurrentDay] = useState(() => startOfDay(new Date()));
    const inputRef = useRef(null);
    const errorId = useId();
    const defaultFromMonth = new Date(currentDay.getFullYear() - 5, 0);
    const defaultToMonth = new Date(currentDay.getFullYear(), 11);

    // Advance at local midnight, including days affected by daylight saving.
    useEffect(() => {
        const timeout = setTimeout(() => setCurrentDay(startOfDay(new Date())),
            Math.max(1, addDays(currentDay, 1).getTime() - Date.now()));
        return () => clearTimeout(timeout);
    }, [currentDay]);

    const dateIniData = useMemo(() => {
        const valueDate = new Date(dateIni != undefined ? dateIni : currentDay)
        if (!today) {
            valueDate.setDate(valueDate.getDate() - (previousDay ?? 1))
        }

        return valueDate
    }, [dateIni, today, previousDay, currentDay])
    const dateData = date != undefined ? new Date(date) : dateIniData

    const [inputValue, setInputValue] = useState(format(new Date(dateData.getFullYear(), dateData.getMonth(), dateData.getDate()), 'dd/MM/y'));
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Preserve explicit disabled matchers and future mode; history defaults to today.
    const getDisabledDays = (referenceDay = currentDay) => disabled || (isHistoric
        ? { after: lastDate ?? referenceDay }
        : lastDate ? { before: lastDate } : false);
    const isAllowedDate = (value, referenceDay = currentDay) =>
        isValid(value) && !dateMatchModifiers(value, getDisabledDays(referenceDay));
    const parsedValue = parse(inputValue, 'dd/MM/y', currentDay);
    const selected = isAllowedDate(parsedValue) ? parsedValue : undefined;
    let inputError = '';
    if (inputValue && !isValid(parsedValue)) {
        inputError = 'Introduce una fecha válida con el formato dd/mm/aaaa.';
    } else if (inputValue && !isAllowedDate(parsedValue)) {
        inputError = disabled ? 'Esta fecha no está permitida.' : isHistoric
            ? 'La fecha no puede ser posterior al ' + format(lastDate ?? currentDay, 'dd/MM/y') + '.'
            : 'La fecha no puede ser anterior al ' + format(lastDate, 'dd/MM/y') + '.';
    }
    useEffect(() => {
        inputRef.current?.setCustomValidity(inputError);
    }, [inputError]);

    const [referenceElement, setReferenceElement] = useState(null);
    const buttonRef = useRef(null);
    const floating = usePositioning({
        reference: referenceElement,
        open: isCalendarOpen,
        placement: 'bottom-start'
    });

    useImperativeHandle(ref, () => {
        return { 
            get value() {
                const referenceDay = startOfDay(new Date());
                const value = parse(inputValue, 'dd/MM/y', referenceDay);
                return isAllowedDate(value, referenceDay) ? value : new Date(NaN);
            },
            reset: () => {
                setInputValue(format(new Date(dateData.getFullYear(), dateData.getMonth(), dateData.getDate()), 'dd/MM/y'));
            }
        }
    })

    const closeCalendar = () => {
        setIsCalendarOpen(false);
        buttonRef.current?.focus();
    };

    const handleInputChange = (e) => {
        setInputValue(e.currentTarget.value);
    };

    const handleButtonClick = () => {
        setIsCalendarOpen(true);
    };

    const handleDaySelect = (date) => {
        if (date && !isAllowedDate(date)) return;
        if (date) {
            setInputValue(format(date, 'dd/MM/y'));
            closeCalendar();
        } else {
            setInputValue('');
        }
    };

    return (
        <div>
            <div ref={setReferenceElement} className={inputError ? "DayPicker DayPicker--invalid" : "DayPicker"}>
                <input
                    ref={inputRef}
                    type="text"
                    aria-invalid={inputError ? true : undefined}
                    aria-describedby={inputError ? errorId : undefined}
                    placeholder={format(currentDay, 'dd/MM/y')}
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
            {inputError && <div id={errorId} className="datepicker-error" role="alert">{inputError}</div>}
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
                            defaultMonth={isValid(selected) ? selected : dateIniData}
                            selected={selected}
                            onSelect={handleDaySelect}
                            disabled={getDisabledDays()}
                            today={currentDay}
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
