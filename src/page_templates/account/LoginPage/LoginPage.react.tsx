import * as React from "react";

import FormCard from "../../../forms/FormCard.react";
import FormTextInput from "../../../forms/FormTextInput.react";
import StandaloneFormPage from "../../StandaloneFormPage.react";
import withTouchedErrors from "../../../helpers/withTouchedErrors.react";

import defaultStrings from "./LoginPage.strings";
import type { LoginPageStrings } from "./LoginPage.strings";

export type LoginPageValues = {
  readonly email?: string;
  readonly password?: string;
};

export type LoginPageProps = {
  readonly strings?: LoginPageStrings;
  readonly imageURL?: string;
  readonly action?: string;
  readonly method?: string;
  readonly values?: LoginPageValues;
  readonly errors?: LoginPageValues;
  readonly touched?: Readonly<Partial<Record<keyof LoginPageValues, boolean>>>;
  readonly onSubmit?: React.FormEventHandler<HTMLFormElement>;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

/**
 * A login page
 * Can be easily wrapped with form libraries like formik and redux-form
 */
function LoginPage(props: LoginPageProps): React.ReactElement {
  const {
    action,
    method,
    onSubmit,
    onChange,
    onBlur,
    values,
    strings = {},
    errors,
    imageURL,
  } = props;

  return (
    <StandaloneFormPage imageURL={imageURL}>
      <FormCard
        buttonText={strings.buttonText || defaultStrings.buttonText}
        title={strings.title || defaultStrings.title}
        onSubmit={onSubmit}
        action={action}
        method={method}
      >
        <FormTextInput
          name="email"
          label={strings.emailLabel || defaultStrings.emailLabel}
          placeholder={
            strings.emailPlaceholder || defaultStrings.emailPlaceholder
          }
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.email}
          error={errors && errors.email}
        />
        <FormTextInput
          name="password"
          type="password"
          label={strings.passwordLabel || defaultStrings.passwordLabel}
          placeholder={
            strings.passwordPlaceholder || defaultStrings.passwordPlaceholder
          }
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.password}
          error={errors && errors.password}
        />
      </FormCard>
    </StandaloneFormPage>
  );
}

const LoginPageWithTouchedErrors: React.ComponentType<LoginPageProps> = withTouchedErrors(
  ["email", "password"]
)(LoginPage);

export default LoginPageWithTouchedErrors;
