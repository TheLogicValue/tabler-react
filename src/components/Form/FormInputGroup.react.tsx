import * as React from "react";
import cn from "classnames";
import Form from "./Form.react";
import FormInputGroupAppend from "./FormInputGroupAppend.react";
import FormInputGroupPrepend from "./FormInputGroupPrepend.react";
import type { FormInputProps as InputProps } from "./FormInput.react";
export type FormInputGroupProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly append?: React.ReactNode;
  readonly prepend?: React.ReactNode;
  readonly RootComponent?: React.ElementType;
  readonly inputProps?: InputProps;
};
export type Props = FormInputGroupProps;
function FormInputGroup(props: FormInputGroupProps): React.ReactNode {
  const {
    className,
    append,
    prepend,
    RootComponent,
    inputProps
  } = props;
  const classes = cn({
    "input-group": true
  }, className);
  const Component = RootComponent || "div";
  const children = inputProps ? <Form.Input {...inputProps} /> : props.children;
  if (prepend === true) {
    return <FormInputGroupPrepend>{children}</FormInputGroupPrepend>;
  }
  if (append === true) {
    return <FormInputGroupAppend>{children}</FormInputGroupAppend>;
  }
  return <Component className={classes}>
      {prepend && <FormInputGroupPrepend>{prepend}</FormInputGroupPrepend>}
      {children}
      {append && <FormInputGroupAppend>{append}</FormInputGroupAppend>}
    </Component>;
}
FormInputGroup.displayName = "Form.InputGroup";
export default FormInputGroup;
