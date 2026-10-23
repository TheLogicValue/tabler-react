import * as React from "react";
import cn from "classnames";
import Form from "./";
export type FormRadioProps = {
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
  readonly onClick?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLInputElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLInputElement>;
};
export type Props = FormRadioProps;
function FormRadio({
  className,
  label,
  value,
  name,
  checked,
  disabled,
  readOnly,
  onChange,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave,
  onBlur,
  onFocus,
  onClick,
  isInline
}: FormRadioProps): React.ReactNode {
  const classes = cn("custom-control custom-radio", {
    "custom-control-inline": isInline
  }, className);
  const events = {
    onChange: onChange,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onPointerEnter: onPointerEnter,
    onPointerLeave: onPointerLeave,
    onBlur: onBlur,
    onFocus: onFocus,
    onClick: onClick
  };
  const inputComponent = <Form.Input {...events} type="radio" name={name} value={value} checked={checked} className={classes} disabled={disabled} readOnly={readOnly} onChange={onChange} />;
  return label ? <label className={classes}>
      {inputComponent}
      <span className="custom-control-label">{label}</span>
    </label> : inputComponent;
}
FormRadio.displayName = "Form.Radio";
export default FormRadio;
