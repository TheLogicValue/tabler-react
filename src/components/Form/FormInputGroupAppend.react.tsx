import * as React from "react";
import cn from "classnames";
export type FormInputGroupAppendProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};
export type Props = FormInputGroupAppendProps;
function FormInputGroupAppend({
  className,
  children
}: FormInputGroupAppendProps): React.ReactNode {
  const classes = cn("input-group-append", className);
  return <span className={classes}>{children}</span>;
}
FormInputGroupAppend.displayName = "Form.InputGroupAppend";
export default FormInputGroupAppend;
