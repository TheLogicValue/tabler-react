import * as React from "react";
import cn from "classnames";
export type FormHelpProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly position?: "top" | "bottom";
  readonly message?: React.ReactNode;
};
export type Props = FormHelpProps;
function FormHelp({
  className,
  children,
  position = "top",
  message
}: FormHelpProps): React.ReactNode {
  const classes = cn("form-help", className);
  return <span className={classes} data-content={message} data-toggle="popover" data-placement={position}>
      {children || "?"}
    </span>;
}
FormHelp.displayName = "Form.Help";
export default FormHelp;
