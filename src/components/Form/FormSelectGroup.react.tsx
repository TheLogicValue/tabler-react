import * as React from "react";
import cn from "classnames";
import type { FormSelectGroupItemProps } from "./FormSelectGroupItem.react";
export type FormSelectGroupProps = {
  readonly children: readonly React.ReactElement<FormSelectGroupItemProps>[];
  readonly className?: string;
  readonly pills?: boolean;
  readonly canSelectMultiple?: boolean;
  readonly onChange?: React.FormEventHandler<HTMLDivElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLDivElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLDivElement>;
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLDivElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
};
export type Props = FormSelectGroupProps;
function FormSelectGroup({
  className,
  children,
  pills,
  canSelectMultiple,
  onChange,
  onFocus,
  onBlur,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave
}: FormSelectGroupProps): React.ReactNode {
  const classes = cn({
    selectgroup: true,
    "w-100": true,
    "selectgroup-pills": pills
  }, className);
  return <div className={classes} onChange={onChange} onClick={onClick} onFocus={onFocus} onBlur={onBlur} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      {canSelectMultiple ? children.map(itm => React.cloneElement(itm, {
      type: "checkbox"
    })) : children}
    </div>;
}
FormSelectGroup.displayName = "Form.SelectGroup";
export default FormSelectGroup;
