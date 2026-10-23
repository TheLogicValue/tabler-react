const strings = {
  title: "Create New Account",
  buttonText: "Create Account",
  nameLabel: "Name",
  namePlaceholder: "Enter name",
  emailLabel: "Email Address",
  emailPlaceholder: "Enter email",
  passwordLabel: "Password",
  passwordPlaceholder: "Password",
  termsLabel: "Agree to the terms and policy",
};

export default strings;

export type RegisterPageStrings = Partial<Record<keyof typeof strings, string>>;
export type stringTypes = RegisterPageStrings;
