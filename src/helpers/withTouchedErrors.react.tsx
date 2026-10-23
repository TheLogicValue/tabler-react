import * as React from "react";

export type TouchedFields = Readonly<Record<string, boolean | undefined>>;
export type FieldErrors = Readonly<Record<string, string | undefined>>;
export type TouchedErrorsProps = {
  readonly touched?: TouchedFields | null;
  readonly errors?: FieldErrors | null;
};

/**
 * Returns an object of fields with values set based on the touched and error values
 * If a value is both touched and has a non-empty error string it is returned as the fields value
 */
function touchedErrors(
  touched: TouchedFields | null = {},
  errors: FieldErrors | null = {},
  fields: ReadonlyArray<string> = []
): Record<string, string | undefined> {
  return fields.reduce<Record<string, string | undefined>>(
    (acc, cur) =>
      Object.assign(acc, {
        [cur]: touched && touched[cur] && errors ? errors[cur] : "",
      }),
    {}
  );
}

/**
 * A HOC that modifies the errors propso that it only returns errors if the the field
 * has also been touched
 * First takes an array of the field names, followed by the component
 */
function withTouchedErrors(fields: ReadonlyArray<string> = []) {
  return function withComponent<P extends TouchedErrorsProps>(
    Component: React.ComponentType<P>
  ): React.ComponentType<P> {
    return function WithTouchedErrors(props: P): React.ReactElement {
      const errors = touchedErrors(props.touched, props.errors, fields);
      return <Component {...props} errors={errors} />;
    };
  };
}

export default withTouchedErrors;
