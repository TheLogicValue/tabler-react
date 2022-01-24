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
  +defaultValue?: string | number,
  +disabled?: boolean,
  +clearable?: boolean,
  +readOnly?: boolean,
  +multiple?: boolean,
  
|};

function FormSelectReact(props: Props): React.Node {
  const {
    className,
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
    onMenuOpen,
    onMenuClose,
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
        color: state.isDisabled ? 'var(--light)' : '',
        cursor: "pointer"
      }),
      control: (styles, { data, isDisabled, isFocused, isSelected, isHover }) => ({
        ...styles,
          '&:hover': { borderColor: 'var(--primary)' },
          borderColor: isFocused ? 'var(--primary)' : '', 
          color: isDisabled ? 'var(--light)' : '',
          boxShadow: 'var(--primary)',
          borderStyle: 'unset'
      })
  };
  
  const feedback = error || props.feedback;

  const contents = (
    <React.Fragment>
      <Select
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        className={classes}
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
        placeholder={placeholder}
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
