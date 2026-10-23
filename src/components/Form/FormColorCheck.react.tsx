import * as React from "react";
import cn from "classnames";
import Grid from "../Grid";
export type FormColorCheckProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};
export type Props = FormColorCheckProps;
function FormColorCheck({
  className,
  children
}: FormColorCheckProps): React.ReactNode {
  const classes = cn("gutters-xs", className);
  return <Grid.Row className={classes}>{children}</Grid.Row>;
}
FormColorCheck.displayName = "Form.ColorCheck";
export default FormColorCheck;
