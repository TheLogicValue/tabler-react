import * as React from "react";
import Form from "../components/Form/Form.react";
import Button from "../components/Button/Button.react";
import type { FormProps } from "../components/Form/Form.react";
import type { FormInputProps } from "../components/Form/FormInput.react";
import type { ButtonProps } from "../components/Button/Button.react";

export type FormWithSingleInputAndButtonProps = {
  readonly formProps?: FormProps;
  readonly inputProps?: FormInputProps;
  readonly buttonProps?: ButtonProps;
};

/**
 * A form containing a single input field with an appended Button
 */
function FormWithSingleInputAndButton({
  formProps,
  inputProps,
  buttonProps,
}: FormWithSingleInputAndButtonProps): React.ReactElement {
  const button = React.createElement(Button, buttonProps);
  return (
    <Form {...formProps}>
      <Form.InputGroup inputProps={inputProps} append={button} />
    </Form>
  );
}

export default FormWithSingleInputAndButton;
