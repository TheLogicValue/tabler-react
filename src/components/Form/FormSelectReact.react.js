// @flow

import React, {useState} from "react";
import cn from "classnames";
import Select, { components } from 'react-select';

function FormSelectReact(props) {
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
    isFixedMenu,
    menuTarget,
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

  const CustomValueContainer = ({
    children,
    ...props
  }) => {
    let [values, input] = children;

    if (Array.isArray(values)) {
      const val = (i) => values[i].props.children;
      const { length } = values;

      switch (length) {
        case 1:
          values = `${val(0)} selecionada`;
          break;
        case 2:
          values = `${val(0)} y ${val(1)} selecionada`;
          break;
        case 3:
          values = `${val(0)}, ${val(1)} y ${val(2)} selecionada`;
          break;
        default:
          const plural = values.length === 3 + 1 ? "" : "s";
          const otherCount = length - 3;
          values = `${val(0)}, ${val(1)}, ${val(
            2
          )} y ${otherCount} otra${plural} selecionada${plural}`;
          break;
      }
    }

    return (
      <components.ValueContainer {...props}>
        {values}
        {input}
      </components.ValueContainer>
    )
  }
  const customStyles = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "var(--quaternary)" : "",
        color: state.isDisabled ? 'var(--light-disabled)' : '',
        cursor: "pointer"
      }),
      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
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
        {...props}
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
        menuPortalTarget={menuTarget ?? document.body}
        menuPosition={isFixedMenu ? 'fixed' : 'absolute'}
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
          IndicatorSeparator:() => null,
          ValueContainer: CustomValueContainer 
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
