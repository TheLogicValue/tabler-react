import * as React from "react";

import FormCard from "../../../forms/FormCard.react";
import FormTextInput from "../../../forms/FormTextInput.react";
import StandaloneFormPage from "../../StandaloneFormPage.react";
import withTouchedErrors from "../../../helpers/withTouchedErrors.react";

import defaultStrings from "./ForgotPasswordPage.strings";
import type { ForgotPasswordPageStrings } from "./ForgotPasswordPage.strings";

export type ForgotPasswordPageValues = {
  readonly email?: string;
};

export type ForgotPasswordPageProps = {
  readonly strings?: ForgotPasswordPageStrings;
  readonly imageURL?: string;
  readonly action?: string;
  readonly method?: string;
  readonly values?: ForgotPasswordPageValues;
  readonly errors?: ForgotPasswordPageValues;
  readonly touched?: Readonly<Partial<Record<keyof ForgotPasswordPageValues, boolean>>>;
  readonly onSubmit?: React.FormEventHandler<HTMLFormElement>;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

/**
 * A forgot password page
 * Can be easily wrapped with form libraries like formik and redux-form
 */
function ForgotPasswordPage(props: ForgotPasswordPageProps): React.ReactElement {
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
        <p className="text-muted">
          {strings.instructions || defaultStrings.instructions}
        </p>
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
      </FormCard>
    </StandaloneFormPage>
  );
}

const ForgotPasswordPageWithTouchedErrors: React.ComponentType<ForgotPasswordPageProps> = withTouchedErrors(
  ["email"]
)(ForgotPasswordPage);

export default ForgotPasswordPageWithTouchedErrors;
