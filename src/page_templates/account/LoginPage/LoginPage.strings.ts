const strings = {
  title: "Login to your Account",
  buttonText: "Login",
  emailLabel: "Email Address",
  emailPlaceholder: "Enter email",
  passwordLabel: "Password",
  passwordPlaceholder: "Password",
};

export default strings;

export type LoginPageStrings = Partial<Record<keyof typeof strings, string>>;
export type stringTypes = LoginPageStrings;
