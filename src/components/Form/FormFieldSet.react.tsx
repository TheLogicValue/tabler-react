import * as React from "react";
import cn from "classnames";
export type FormFieldSetProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};
export type Props = FormFieldSetProps;
function FormFieldSet({
  className,
  children
}: FormFieldSetProps): React.ReactNode {
  const classes = cn("form-fieldset", className);
  return <fieldset className={classes}>{children}</fieldset>;
}
FormFieldSet.displayName = "Form.FieldSet";
export default FormFieldSet;
