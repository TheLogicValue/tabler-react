import * as React from "react";
import cn from "classnames";
export type FormSwitchProps = {
  readonly className?: string;
  readonly name?: string;
  readonly label?: string | number;
  readonly value?: string | number;
  readonly checked?: boolean;
  readonly disabled?: boolean;
  readonly type?: "checkbox" | "radio";
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly onClick?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLInputElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLInputElement>;
};
export type Props = FormSwitchProps;
const FormToggle = React.forwardRef<HTMLInputElement, FormSwitchProps>(function FormToggle({
  className,
  type = "checkbox",
  name,
  value,
  label,
  checked,
  onChange,
  disabled,
  onBlur,
  onFocus,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave
}: FormSwitchProps, ref): React.ReactNode {
  const classes = cn("custom-switch", className);
  return <label className={classes}>
      <input type={type} name={name} value={value} className="custom-switch-input" checked={checked} disabled={disabled} ref={ref} onChange={onChange} onBlur={onBlur} onClick={onClick} onFocus={onFocus} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} />
      <span className="custom-switch-indicator" />
      <span className="custom-switch-description">{label}</span>
    </label>;
});
FormToggle.displayName = "Form.Toggle";
export default FormToggle;
