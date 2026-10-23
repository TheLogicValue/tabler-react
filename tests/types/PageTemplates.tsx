import * as React from "react";
import StandaloneFormPage from "../../src/page_templates/StandaloneFormPage.react";
import type { StandaloneFormPageProps } from "../../src/page_templates/StandaloneFormPage.react";
import DefaultErrorPage from "../../src/page_templates/errors/DefaultErrorPage.react";
import type { DefaultErrorPageProps } from "../../src/page_templates/errors/DefaultErrorPage.react";
import Error400Page from "../../src/page_templates/errors/Error400Page.react";
import Error401Page from "../../src/page_templates/errors/Error401Page.react";
import Error403Page from "../../src/page_templates/errors/Error403Page.react";
import Error404Page from "../../src/page_templates/errors/Error404Page.react";
import Error500Page from "../../src/page_templates/errors/Error500Page.react";
import Error503Page from "../../src/page_templates/errors/Error503Page.react";
import LoginPage from "../../src/page_templates/account/LoginPage";
import type { LoginPageProps, LoginPageStrings, LoginPageValues } from "../../src/page_templates/account/LoginPage";
import LegacyLoginPage from "../../src/page_templates/account/LoginPage/LoginPage.react";
import ForgotPasswordPage from "../../src/page_templates/account/ForgotPasswordPage";
import type { ForgotPasswordPageProps, ForgotPasswordPageStrings } from "../../src/page_templates/account/ForgotPasswordPage";
import RegisterPage from "../../src/page_templates/account/RegisterPage";
import type { RegisterPageProps, RegisterPageStrings, RegisterPageValues } from "../../src/page_templates/account/RegisterPage";

const loginValues: LoginPageValues = Object.freeze({ email: "user@example.com", password: "secret" });
const loginStrings: LoginPageStrings = Object.freeze({ buttonText: "Entrar" });
const registerValues: RegisterPageValues = Object.freeze({ ...loginValues, name: "Ana", terms: "accepted" });
const registerStrings: RegisterPageStrings = { termsLabel: "Aceptar condiciones" };
const forgotStrings: ForgotPasswordPageStrings = { instructions: "Indica tu correo" };
const handlers = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => event.currentTarget.checked,
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => event.currentTarget.name,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => event.preventDefault(),
};
const standalone: StandaloneFormPageProps = { imageURL: "/logo.svg", page: "account", children: <p>Acceso</p> };
const error: DefaultErrorPageProps = { title: "Error", subtitle: "No disponible", details: "Detalles", action: "Volver" };
const login: LoginPageProps = { ...handlers, strings: loginStrings, values: loginValues, errors: { email: "Revisar" }, children: <a href="/ayuda">Ayuda</a> };
const register: RegisterPageProps = { ...handlers, strings: registerStrings, values: registerValues, touched: { name: true, terms: true }, errors: { name: "Revisar" } };
const forgot: ForgotPasswordPageProps = { ...handlers, strings: forgotStrings, touched: { email: true }, errors: { email: "Revisar" }, values: { email: "user@example.com" } };

export const pageTemplateExamples = <>
  <StandaloneFormPage {...standalone} />
  <StandaloneFormPage />
  <DefaultErrorPage {...error} />
  <Error400Page {...error} /><Error401Page /><Error403Page />
  <Error404Page /><Error500Page /><Error503Page />
  <LoginPage {...login} /><LoginPage />
  <LegacyLoginPage {...handlers} values={loginValues} touched={{ password: true }} />
  <RegisterPage {...register} /><RegisterPage />
  <ForgotPasswordPage {...forgot} /><ForgotPasswordPage />
</>;

// @ts-expect-error action changes the back button's text, not its content or route.
export const errorActionElement = <Error404Page action={<a href="/">Volver</a>} />;
// @ts-expect-error The exported login renders errors directly and has no touched filter.
export const loginTouched = <LoginPage touched={{ email: true }} />;
// @ts-expect-error The registration template forwards terms as value, not checked.
export const booleanTerms = <RegisterPage values={{ terms: false }} />;
// @ts-expect-error Only fields defined by the template can be marked touched.
export const unknownTouchedField = <ForgotPasswordPage touched={{ password: true }} />;
// @ts-expect-error Text overrides must be strings.
export const invalidStrings = <LoginPage strings={{ title: 42 }} />;
// @ts-expect-error Submit is emitted by the form, not an input.
export const invalidSubmit = <RegisterPage onSubmit={(event: React.FormEvent<HTMLInputElement>) => event.preventDefault()} />;
// @ts-expect-error onChange receives the input's event, not its value directly.
export const invalidChange = <LoginPage onChange={(value: string) => value.trim()} />;
// @ts-expect-error RegisterPage does not render additional children.
export const ignoredChildren = <RegisterPage>Extra</RegisterPage>;
