import React from "react"
import FormTextInput from "../../../forms/FormTextInput.react"
import FormCard from "../../../forms/FormCard.react"
import StandaloneFormPage from "../../StandaloneFormPage.react"

export default function LoginPageForm({ imageURL, action, method, onSubmit, onChange, onBlur, values, strings = {}, errors, children } = {}) {

    const defaultStrings = {
        title: "Login to your Account",
        buttonText: "Login",
        emailLabel: "Email Address",
        emailPlaceholder: "Enter email",
        passwordLabel: "Password",
        passwordPlaceholder: "Password",
    }

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