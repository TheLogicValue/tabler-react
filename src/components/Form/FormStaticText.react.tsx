import * as React from "react";
import cn from "classnames";
export type FormStaticTextProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly onChange?: React.FormEventHandler<HTMLDivElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLDivElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLDivElement>;
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLDivElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
};
export type Props = FormStaticTextProps;
function FormStaticText({
  className,
  children,
  onChange,
  onBlur,
  onFocus,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave
}: FormStaticTextProps): React.ReactNode {
  const classes = cn("form-control-plaintext", className);
  return <div className={classes} onChange={onChange} onBlur={onBlur} onClick={onClick} onFocus={onFocus} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      {children}
    </div>;
}
FormStaticText.displayName = "Form.StaticText";
export default FormStaticText;
