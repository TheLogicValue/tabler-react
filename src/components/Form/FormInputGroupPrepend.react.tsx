import * as React from "react";
import cn from "classnames";
export type FormInputGroupPrependProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};
export type Props = FormInputGroupPrependProps;
function FormInputGroupPrepend({
  className,
  children
}: FormInputGroupPrependProps): React.ReactNode {
  const classes = cn("input-group-prepend", className);
  return <span className={classes}>{children}</span>;
}
FormInputGroupPrepend.displayName = "Form.InputGroupPrepend";
export default FormInputGroupPrepend;
