import * as React from "react";
import cn from "classnames";
import Form from "./";
export type FormCheckboxProps = {
  readonly className?: string;
  readonly label?: string;
  readonly value?: string | number;
  readonly name?: string;
  readonly checked?: boolean;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly isInline?: boolean;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
};
export type Props = FormCheckboxProps;
function FormCheckbox({
  className,
  label,
  value,
  name,
  checked,
  disabled,
  readOnly,
  onChange,
  onFocus,
  onBlur,
  isInline
}: FormCheckboxProps): React.ReactNode {
  const classes = cn("custom-control custom-checkbox", {
    "custom-control-inline": isInline
  }, className);
  const inputComponent = <Form.Input type="checkbox" name={name} value={value} checked={checked} className={classes} disabled={disabled} readOnly={readOnly} onChange={onChange} onBlur={onBlur} onFocus={onFocus} />;
  return label ? <label className={classes}>
      {inputComponent}
      <span className="custom-control-label">{label}</span>
    </label> : inputComponent;
}
FormCheckbox.displayName = "Form.Checkbox";

/** @component */
export default FormCheckbox;
