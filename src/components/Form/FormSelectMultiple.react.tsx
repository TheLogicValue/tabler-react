import React, { useRef, useCallback, useState, useEffect } from "react";
import ReactSelect from "react-select";
import Dropdown from "../Dropdown";
import Icon from "../Icon";
import type { Props as SelectProps, ActionMeta, StylesConfig } from "react-select";
import type { FormSelectOption } from "./FormSelectReact.react";
export type SelectAllOption = {
  readonly value: "<SELECT_ALL>";
  readonly label: string;
};
export type FormSelectMultipleProps<Option extends FormSelectOption = FormSelectOption> = Omit<SelectProps<Option | SelectAllOption, true>, "value" | "options" | "onChange" | "name"> & {
  readonly value: readonly Option[];
  readonly options: readonly Option[];
  readonly onChange: (value: readonly Option[], action: ActionMeta<Option | SelectAllOption>) => void;
  readonly icon?: string;
  readonly placeholder?: string;
  readonly name?: string;
  readonly label?: string;
  readonly valid?: boolean;
  readonly isDisabled?: boolean;
};
function FormSelectMultiple<Option extends FormSelectOption = FormSelectOption>(props: FormSelectMultipleProps<Option>): React.ReactNode {
  // isOptionSelected sees previous props.value after onChange
  const valueRef = useRef(props.value);
  valueRef.current = props.value;
  const headerChange = useCallback(() => {
    if (props.icon != null) {
      return <Icon className="mr-2" name={props.icon} />;
    } else {
      switch (valueRef.current.length) {
        case 0:
          return props.placeholder;
        case 1:
          return props.value[0].label;
        default:
          return valueRef.current.length + " " + props.name + " de " + props.options.length;
      }
    }
  }, [props]);
  const [titulo, setTitulo] = useState(headerChange());
  const selectAllOption: SelectAllOption = {
    value: "<SELECT_ALL>",
    label: "Seleccionar todos"
  };
  useEffect(() => {
    setTitulo(headerChange());
  }, [headerChange]);
  const customStyles: StylesConfig<Option | SelectAllOption, true> = {
    valueContainer: provided => ({
      ...provided,
      textOverflow: "ellipsis",
      maxWidth: "90%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      display: "initial"
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "" : "",
      backgroundColor: state.isSelected ? "var(--quaternary)" : "",
      fontWeight: state.isSelected ? "bold" : undefined,
      cursor: "pointer"
    })
  };
  const isSelectAllSelected = () => valueRef.current.length === props.options.length;
  const isOptionSelected = (option: Option | SelectAllOption) => valueRef.current.some(({
    value
  }) => value === option.value) || isSelectAllSelected();
  const getOptions = () => [selectAllOption, ...props.options];
  const getValue = () => props.value;
  const onChange: NonNullable<SelectProps<Option | SelectAllOption, true>["onChange"]> = (newValue, actionMeta) => {
    const {
      action,
      option,
      removedValue
    } = actionMeta;
    if (action === "select-option" && option?.value === selectAllOption.value) {
      props.onChange(props.options, actionMeta);
    } else if (action === "deselect-option" && option?.value === selectAllOption.value || action === "remove-value" && removedValue.value === selectAllOption.value) {
      props.onChange([], actionMeta);
    } else if (action === "deselect-option" && option && isSelectAllSelected()) {
      props.onChange(props.options.filter(({
        value
      }) => value !== option.value), actionMeta);
    } else {
      props.onChange(newValue.filter((item): item is Option => item.value !== selectAllOption.value), actionMeta);
    }
  };
  return <Dropdown triggerContent={titulo} items={<ReactSelect<Option | SelectAllOption, true> {...props} isOptionSelected={isOptionSelected} options={getOptions()} onChange={onChange} placeholder="" value={getValue()} menuIsOpen isDisabled={props.isDisabled} hideSelectedOptions={false} closeMenuOnSelect={false} isMulti components={{
    MultiValueContainer: () => null,
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null
  }} styles={customStyles} className="basic-multi-select" classNamePrefix="select" isClearable={true} controlShouldRenderValue={true} tabSelectsValue={false} />} />;
}
;
FormSelectMultiple.displayName = "Form.SelectMultiple";

/** @component */
export default FormSelectMultiple;
