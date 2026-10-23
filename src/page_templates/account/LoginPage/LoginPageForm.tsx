import React from "react"
import FormTextInput from "../../../forms/FormTextInput.react"
import FormCard from "../../../forms/FormCard.react"
import StandaloneFormPage from "../../StandaloneFormPage.react"
import defaultStrings from "./LoginPage.strings"
import type { LoginPageStrings } from "./LoginPage.strings"

export type LoginPageValues = {
  readonly email?: string;
  readonly password?: string;
};

export type LoginPageProps = {
  readonly imageURL?: string;
  readonly action?: string;
  readonly method?: string;
  readonly onSubmit?: React.FormEventHandler<HTMLFormElement>;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly values?: LoginPageValues;
  readonly strings?: LoginPageStrings;
  readonly errors?: LoginPageValues;
  readonly children?: React.ReactNode;
};

export default function LoginPageForm({ imageURL, action, method, onSubmit, onChange, onBlur, values, strings = {}, errors, children }: LoginPageProps = {}): React.ReactElement {

    return (
        <StandaloneFormPage
            imageURL={imageURL}
            page="login"
        >
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
                    placeholder={strings.emailPlaceholder || defaultStrings.emailPlaceholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values && values.email}
                    error={errors && errors.email}
                />
                <FormTextInput
                    name="password"
                    type="password"
                    label={strings.passwordLabel || defaultStrings.passwordLabel}
                    placeholder={strings.passwordPlaceholder || defaultStrings.passwordPlaceholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values && values.password}
                    error={errors && errors.password}
                />
            </FormCard>
            {children}
        </StandaloneFormPage>
    )
}