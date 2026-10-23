import * as React from "react";
import cn from "classnames";
export type FormSwitchStackProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};
export type Props = FormSwitchStackProps;
function FormToggleStack({
  className,
  children
}: FormSwitchStackProps): React.ReactNode {
  const classes = cn("custom-switches-stacked", className);
  return <div className={classes}>{children}</div>;
}
FormToggleStack.displayName = "Form.ToggleStack";
export default FormToggleStack;
