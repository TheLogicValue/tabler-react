import * as React from "react";
import cn from "classnames";
export type FormLabelProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly aside?: string;
  readonly onClick?: React.MouseEventHandler<HTMLLabelElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLLabelElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLLabelElement>;
};
export type Props = FormLabelProps;
function FormLabel({
  className,
  aside,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave
}: FormLabelProps): React.ReactNode {
  const classes = cn("form-label", className);
  return <label className={classes} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      {aside && <span className="form-label-small">{aside}</span>}
      {children}
    </label>;
}
FormLabel.displayName = "Form.Label";
export default FormLabel;
