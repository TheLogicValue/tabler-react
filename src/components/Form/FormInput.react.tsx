import * as React from "react";
import Icon from "../Icon";
import cn from "classnames";
import FormGroup from "./FormGroup.react";

/**
 * A an input field
 */
export type FormInputProps = {
  readonly className?: string;
  readonly icon?: string;
  readonly position?: "append" | "prepend";
  readonly valid?: boolean;
  readonly tick?: boolean;
  readonly invalid?: boolean;
  readonly cross?: boolean;
  readonly feedback?: string;
  readonly error?: string;
  readonly type?: React.HTMLInputTypeAttribute;
  readonly placeholder?: string;
  readonly name?: string;
  readonly value?: string | number;
  readonly defaultValue?: string | number;
  readonly min?: string | number;
  readonly max?: string | number;
  readonly step?: string | number;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly autoFocus?: boolean;
  readonly required?: boolean;
  readonly checked?: boolean;
  readonly label?: string;
  readonly autoComplete?: "on" | "off";
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly onClick?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLInputElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLInputElement>;
  readonly onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  readonly onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  readonly onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  readonly onCopy?: React.ClipboardEventHandler<HTMLInputElement>;
  readonly onCut?: React.ClipboardEventHandler<HTMLInputElement>;
  readonly onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
};
export type Props = FormInputProps;
function FormInput(props: FormInputProps): React.ReactNode {
  const {
    className,
    name,
    icon,
    position = "prepend",
    valid,
    tick,
    invalid,
    cross,
    error,
    placeholder,
    value,
    defaultValue,
    min,
    max,
    step,
    minLength,
    maxLength,
    checked,
    onChange,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyUp,
    onKeyDown,
    onCopy,
    onCut,
    onPaste,
    disabled,
    readOnly,
    autoFocus,
    required,
    label,
    autoComplete
  } = props;
  const type = props.type || "text";
  const classes = cn({
    "form-control": type !== "checkbox" && type !== "radio",
    "custom-control-input": type === "checkbox" || type === "radio",
    "is-valid": valid,
    "state-valid": tick,
    "is-invalid": invalid || !!error,
    "state-invalid": cross || !!error
  }, className);
  const feedback = error || props.feedback;
  const allInputProps = {
    name,
    className: classes,
    type,
    placeholder,
    value,
    defaultValue,
    min,
    max,
    step,
    minLength,
    maxLength,
    disabled,
    readOnly,
    autoFocus,
    required,
    onChange,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyUp,
    onKeyDown,
    onCopy,
    onCut,
    onPaste,
    autoComplete
  };
  const contents = !icon ? <React.Fragment>
      {type === "checkbox" || type === "radio" ? <input {...allInputProps} checked={checked} /> : <input {...allInputProps} />}
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment> : <React.Fragment>
      <div className="input-icon">
        {position === "prepend" && <span className="input-icon-addon">
            <Icon name={icon} />
          </span>}
        <input {...allInputProps} />
        {position === "append" && <span className="input-icon-addon">
            <Icon name={icon} />
          </span>}
      </div>
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment>;
  return label ? <FormGroup label={label}>{contents}</FormGroup> : contents;
}
FormInput.displayName = "Form.Input";

/** @component */
export default FormInput;
