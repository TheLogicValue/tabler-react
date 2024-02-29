import React, {useRef, useCallback, useState, useEffect} from "react"
import ReactSelect from "react-select";
import {Dropdown, Icon} from "../";

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
  +icon?:string,
  +placeholder?:string,
  +name?:string,
  +label?:string,
  +options?:string,
  +value?:Array<Object>,
  +isDisabled?: boolean

|};

function FormSelectMultiple(props: Props): React.Node {
  
// isOptionSelected sees previous props.value after onChange
const valueRef = useRef(props.value);
valueRef.current = props.value;

const headerChange = useCallback(() => {
  if (props.icon != null){
    return <Icon className="mr-2" name={props.icon} />;
  }else{
    switch(valueRef.current.length){
      case 0: 
        return props.placeholder
      case 1: 
        return props.value[0].label
      default: 
        return valueRef.current.length + " " +props.name+ " de " + props.options.length
    }
  }
},[props])

const [titulo, setTitulo] = useState(headerChange())
const selectAllOption = {
  value: "<SELECT_ALL>",
  label: "Seleccionar todos"
};

useEffect(() => {
  setTitulo(headerChange())
}, [headerChange])

const customStyles = {
  valueContainer: (provided) => ({
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
      cursor: "pointer"
    }),
};

const isSelectAllSelected = () =>
  valueRef.current.length === props.options.length;

const isOptionSelected = option =>
  valueRef.current.some(({ value }) => value === option.value) ||
  isSelectAllSelected();

const getOptions = () => [selectAllOption, ...props.options];

const getValue = () =>  props.value;

const onChange = (newValue, actionMeta) => {
  const { action, option, removedValue } = actionMeta;
  
  if (action === "select-option" && option.value === selectAllOption.value) {
    props.onChange(props.options, actionMeta);
  } else if (
    (action === "deselect-option" &&
      option.value === selectAllOption.value) ||
    (action === "remove-value" &&
      removedValue.value === selectAllOption.value)
  ) {
    props.onChange([], actionMeta);
  } else if (
    actionMeta.action === "deselect-option" &&
    isSelectAllSelected()
  ) {
    props.onChange(
      props.options.filter(({ value }) => value !== option.value),
      actionMeta
    );
  } else {
    props.onChange(newValue || [], actionMeta);
  }

};

return (
  <Dropdown
      triggerContent={titulo}
      items={
          <ReactSelect
              {...props}
              isOptionSelected={isOptionSelected}
              options={getOptions()}
              onChange={onChange}
              placeholder=""
              value={getValue()}
              menuIsOpen
              isDisabled={props.isDisabled}
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              isMulti 
              components={{
                  MultiValueContainer: () => null,
                  DropdownIndicator:() => null,
                  IndicatorSeparator:() => null
              }}
              styles={customStyles}
              className="basic-multi-select"
              classNamePrefix="select"
              isClearable={true}
              controlShouldRenderValue={true}
              tabSelectsValue={false}
          />
      }
  /> 
  );
    };

FormSelectMultiple.displayName = "Form.SelectMultiple";

/** @component */
export default FormSelectMultiple;
