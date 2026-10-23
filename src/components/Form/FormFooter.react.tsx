import * as React from "react";
import cn from "classnames";
export type FormFooterProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};
export type Props = FormFooterProps;
function FormFooter(props: FormFooterProps): React.ReactNode {
  const classes = cn("form-footer", props.className);
  return <div className={classes}>{props.children}</div>;
}
FormFooter.displayName = "Form.Footer";
export default FormFooter;
