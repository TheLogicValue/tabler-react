// @flow

import React, {useState} from "react";
import cn from "classnames";
import Select from 'react-select';

import type {
  FocusEvents,
  FormEvents,
  MouseEvents,
  PointerEvents,
} from "../../";

type Props = {|
  ...FocusEvents,
  ...FormEvents,
  ...MouseEvents,
  ...PointerEvents,
  +children?: React.Node,
  +className?: string,
  +valid?: boolean,
  +tick?: boolean,
  +invalid?: boolean,
  +cross?: boolean,
  +feedback?: string,
  +error?: string,
  /**
   * Wraps the select in Form.Group and adds a label
   */
  +label?: string,
  +name?: string,
  +value?: string | number,
  +disabledValue?: string | number,
  +defaultValue?: string | number,
  +disabled?: boolean,
  +clearable?: boolean,
  +readOnly?: boolean,
  +multiple?: boolean,
  
|};

function FormSelectReact(props: Props): React.Node {
  const {
    className,
    selectRef,
    modalContainer = false,
    disabledValue = "-",
    children,
    valid,
    tick,
    invalid,
    cross,
    error,
    readOnly,
    name,
    value,
    defaultValue,
    onChange,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onClick,
    multiple,
    clearValue,
    getStyles,
    getValue,
    hasValue,
    isMulti,
    isDisabled,
    isClearable,
    menuPlacement,
    menuIsOpen,
    onMenuOpen,
    onMenuClose,
    closeMenuOnScroll,
    isLoading,
    options,
    selectOption,
    selectProps,
    setValue,
    emotion,
    placeholder
  } = props;

  const classes = cn(
    {
      "form-control": false,
      "custom-select-react": true,
      "disabled": isDisabled,
      "is-valid": valid,
      "state-valid": tick,
      "is-invalid": invalid || !!error,
      "state-invalid": cross || !!error,
    },
    className
  );

  const customStyles = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "var(--quaternary)" : "",
        color: state.isDisabled ? 'var(--light-disabled)' : '',
        cursor: "pointer"
      }),
      control: (styles, { data, isDisabled, isFocused, isSelected, isHover }) => ({
        ...styles,
          '&:hover': { 
            borderColor: 'var(--primary)' 
          },
          borderColor: isFocused ? 'var(--primary)' : '', 
          boxShadow: 'var(--primary)',
          borderStyle: 'unset'
      }),
      valueContainer: (styles, {isDisabled}) => ({
        ...styles,
        background: isDisabled ? 'var(--disabled) !important': '',
        color: isDisabled ? 'var(--light-disabled) !important' : '',
      }),
      // menu: (provided) => ({
      //   ...provided,
      //   position: modalContainer && 'fixed',
      //   zIndex: modalContainer && 10,
      // }),
  };
  
  const feedback = error || props.feedback;

  const contents = (
    <React.Fragment>
      <Select
        name={name}
        value={isDisabled ? disabledValue : value}
        defaultValue={defaultValue}
        onChange={onChange}
        menuIsOpen={menuIsOpen}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
        menuPlacement={menuPlacement}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        closeMenuOnScroll={closeMenuOnScroll}
        className={classes}
        classNamePrefix="react-select"
        readOnly={readOnly}
        multiple={multiple}
        clearValue={clearValue}
        getStyles={getStyles}
        getValue={getValue}
        hasValue={hasValue}
        isMulti={isMulti}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        options={options}
        selectOption={selectOption}
        selectProps={selectProps}
        setValue={setValue}
        emotion={emotion}
        placeholder={isDisabled ? disabledValue : placeholder}
        ref={selectRef}
        components={{
          MultiValueContainer: () => null,
          DropdownIndicator: () => null,
          IndicatorSeparator:() => null
        }}
        styles={customStyles}
      >
        {children}
      </Select>
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment>
  );

  return contents;
}

FormSelectReact.displayName = "Form.SelectReact";

/** @component */
export default FormSelectReact;
