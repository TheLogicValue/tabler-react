import * as React from "react";

import FormCard from "../../../forms/FormCard.react";
import FormTextInput from "../../../forms/FormTextInput.react";
import FormCheckboxInput from "../../../forms/FormCheckboxInput.react";
import StandaloneFormPage from "../../StandaloneFormPage.react";
import withTouchedErrors from "../../../helpers/withTouchedErrors.react";

import defaultStrings from "./RegisterPage.strings";
import type { RegisterPageStrings } from "./RegisterPage.strings";

export type RegisterPageValues = {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
  readonly terms?: string;
};

export type RegisterPageProps = {
  readonly strings?: RegisterPageStrings;
  readonly imageURL?: string;
  readonly action?: string;
  readonly method?: string;
  readonly values?: RegisterPageValues;
  readonly errors?: RegisterPageValues;
  readonly touched?: Readonly<Partial<Record<keyof RegisterPageValues, boolean>>>;
  readonly onSubmit?: React.FormEventHandler<HTMLFormElement>;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

/**
 * A register page
 * Can be easily wrapped with form libraries like formik and redux-form
 */
function RegisterPage(props: RegisterPageProps): React.ReactElement {
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
          name="name"
          label={strings.nameLabel || defaultStrings.nameLabel}
          placeholder={
            strings.namePlaceholder || defaultStrings.namePlaceholder
          }
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.name}
          error={errors && errors.name}
        />
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
        <FormCheckboxInput
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.terms}
          name="terms"
          label={strings.termsLabel || defaultStrings.termsLabel}
        />
      </FormCard>
    </StandaloneFormPage>
  );
}

const RegisterPageWithTouchedErrors: React.ComponentType<RegisterPageProps> = withTouchedErrors(
  ["name", "email", "password", "terms"]
)(RegisterPage);

export default RegisterPageWithTouchedErrors;
