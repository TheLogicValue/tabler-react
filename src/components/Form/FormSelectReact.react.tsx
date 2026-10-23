import React from "react";
import cn from "classnames";
import Select from 'react-select';
import type { Props as SelectProps, GroupBase, SelectInstance, StylesConfig, CommonProps } from 'react-select';
export type FormSelectOption = {
  readonly value: string | number;
  readonly label: string;
};
export type FormSelectReactProps<Option = FormSelectOption, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> = SelectProps<Option, IsMulti, Group> & {
  readonly options?: SelectProps<Option, IsMulti, Group>["options"];
  readonly value?: SelectProps<Option, IsMulti, Group>["value"];
  readonly defaultValue?: SelectProps<Option, IsMulti, Group>["defaultValue"];
  readonly onChange?: SelectProps<Option, IsMulti, Group>["onChange"];
  readonly onBlur?: SelectProps<Option, IsMulti, Group>["onBlur"];
  readonly isMulti?: IsMulti;
  readonly isDisabled?: boolean;
  readonly isClearable?: boolean;
  readonly placeholder?: React.ReactNode;
  readonly menuIsOpen?: boolean;
  readonly menuPlacement?: SelectProps<Option, IsMulti, Group>["menuPlacement"];
  readonly onMenuOpen?: () => void;
  readonly onMenuClose?: () => void;
  readonly closeMenuOnScroll?: SelectProps<Option, IsMulti, Group>["closeMenuOnScroll"];
  readonly isLoading?: boolean;
  readonly className?: string;
  readonly name?: string;
  readonly children?: React.ReactNode;
  readonly valid?: boolean;
  readonly tick?: boolean;
  readonly invalid?: boolean;
  readonly cross?: boolean;
  readonly feedback?: string;
  readonly error?: string;
  readonly label?: string;
  readonly disabledValue?: string | number;
  readonly disabled?: boolean;
  readonly clearable?: boolean;
  readonly readOnly?: boolean;
  readonly multiple?: boolean;
  readonly selectRef?: React.Ref<SelectInstance<Option, IsMulti, Group>>;
  readonly isFixedMenu?: boolean;
  readonly menuTarget?: HTMLElement | null;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLDivElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>;
  readonly clearValue?: CommonProps<Option, IsMulti, Group>["clearValue"];
  readonly getStyles?: CommonProps<Option, IsMulti, Group>["getStyles"];
  readonly getValue?: CommonProps<Option, IsMulti, Group>["getValue"];
  readonly hasValue?: boolean;
  readonly selectOption?: CommonProps<Option, IsMulti, Group>["selectOption"];
  readonly selectProps?: SelectProps<Option, IsMulti, Group>;
  readonly setValue?: CommonProps<Option, IsMulti, Group>["setValue"];
  readonly emotion?: unknown;
};
function FormSelectReact<Option = FormSelectOption, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: FormSelectReactProps<Option, IsMulti, Group>): React.ReactNode {
  const {
    className,
    selectRef,
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
  const classes = cn({
    "form-control": false,
    "custom-select-react": true,
    "disabled": isDisabled,
    "is-valid": valid,
    "state-valid": tick,
    "is-invalid": invalid || !!error,
    "state-invalid": cross || !!error
  }, className);
  const customStyles: StylesConfig<Option, IsMulti, Group> = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "var(--quaternary)" : "",
      color: state.isDisabled ? 'var(--light-disabled)' : '',
      cursor: "pointer"
    }),
    menuPortal: base => ({
      ...base,
      zIndex: 9999
    }),
    control: (styles, {
      isFocused
    }) => ({
      ...styles,
      '&:hover': {
        borderColor: 'var(--primary)'
      },
      borderColor: isFocused ? 'var(--primary)' : '',
      boxShadow: 'var(--primary)',
      borderStyle: 'unset'
    }),
    valueContainer: (styles, {
      isDisabled
    }) => ({
      ...styles,
      background: isDisabled ? 'var(--disabled) !important' : '',
      color: isDisabled ? 'var(--light-disabled) !important' : ''
    })
  };
  const feedback = error || props.feedback;
  const contents = <React.Fragment>
      <Select<Option, IsMulti, Group> {...props} {...{
      children,
      onMouseEnter,
      onMouseLeave,
      onPointerEnter,
      onPointerLeave,
      onClick,
      readOnly,
      multiple,
      clearValue,
      getStyles,
      getValue,
      hasValue,
      selectOption,
      selectProps,
      setValue,
      emotion
    }} name={name} value={isDisabled ? null : value} defaultValue={defaultValue} onChange={onChange} menuIsOpen={menuIsOpen} onBlur={onBlur} menuPortalTarget={menuTarget ?? document.body} menuPosition={isFixedMenu ? 'fixed' : 'absolute'} menuPlacement={menuPlacement} onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} closeMenuOnScroll={closeMenuOnScroll} className={classes} classNamePrefix="react-select" isMulti={isMulti} isClearable={isClearable} isDisabled={isDisabled} isLoading={isLoading} options={options} placeholder={isDisabled ? disabledValue : placeholder} ref={selectRef} components={{
      MultiValueContainer: () => null,
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null
    }} styles={customStyles} />
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment>;
  return contents;
}
FormSelectReact.displayName = "Form.SelectReact";

/** @component */
export default FormSelectReact;
