import * as React from "react";
import cn from "classnames";
import Icon from "../Icon";
export type FormSelectGroupItemProps = {
  readonly className?: string;
  readonly label?: string;
  readonly value?: string | number;
  readonly name: string;
  readonly checked?: boolean;
  readonly icon?: string;
  readonly type?: "radio" | "checkbox";
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly onClick?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLInputElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLInputElement>;
};
export type Props = FormSelectGroupItemProps;
function FormSelectGroupItem({
  className,
  label,
  name,
  value,
  checked,
  icon,
  type,
  onChange,
  onFocus,
  onBlur,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave
}: FormSelectGroupItemProps): React.ReactNode {
  const classes = cn({
    "selectgroup-item": true
  }, className);
  const btnClasses = cn("selectgroup-button", {
    "selectgroup-button-icon": icon
  });
  const outputLabel = icon ? <Icon name={icon} /> : label;
  return <label className={classes}>
      {type === "checkbox" ? <input type="checkbox" name={name} value={value} className="selectgroup-input" checked={checked} onChange={onChange} onClick={onClick} onFocus={onFocus} onBlur={onBlur} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} /> : <input type="radio" name={name} value={value} className="selectgroup-input" checked={checked} onChange={onChange} onClick={onClick} onFocus={onFocus} onBlur={onBlur} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} />}
      <span className={btnClasses}>{outputLabel}</span>
    </label>;
}
FormSelectGroupItem.displayName = "Form.SelectGroupItem";
export default FormSelectGroupItem;
