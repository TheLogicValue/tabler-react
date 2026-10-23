import * as React from "react";
import cn from "classnames";
import Grid from "../Grid";
export type FormColorCheckItemProps = {
  readonly className?: string;
  readonly color: string;
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly onClick?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLInputElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLInputElement>;
};
export type Props = FormColorCheckItemProps;
function FormColorCheckItem({
  className,
  color,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur
}: FormColorCheckItemProps): React.ReactNode {
  const classes = cn(className);
  return <Grid.Col auto className={classes}>
      <label className="colorinput">
        <input name="color" type="checkbox" value={color} className="colorinput-input" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onFocus={onFocus} onBlur={onBlur} />
        <span className={`colorinput-color bg-${color}`} />
      </label>
    </Grid.Col>;
}
FormColorCheckItem.displayName = "Form.ColorCheckItem";
export default FormColorCheckItem;
