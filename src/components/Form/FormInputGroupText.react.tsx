import * as React from "react";
import cn from "classnames";
export type FormInputGroupTextProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};
export type Props = FormInputGroupTextProps;
function FormInputGroupText({
  className,
  children
}: FormInputGroupTextProps): React.ReactNode {
  const classes = cn("input-group-text", className);
  return <span className={classes}>{children}</span>;
}
FormInputGroupText.displayName = "Form.InputGroupText";
export default FormInputGroupText;
