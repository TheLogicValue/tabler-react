import * as React from "react";
import cn from "classnames";
import Grid from "../Grid";
export type FormImageCheckProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};
export type Props = FormImageCheckProps;
function FormImageCheck({
  className,
  children
}: FormImageCheckProps): React.ReactNode {
  const classes = cn("gutters-sm", className);
  return <Grid.Row className={classes}>{children}</Grid.Row>;
}
FormImageCheck.displayName = "Form.ImageCheck";
export default FormImageCheck;
