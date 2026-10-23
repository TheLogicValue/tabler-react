import * as React from "react";
import cn from "classnames";
import FormGroup from "./FormGroup.react";
export type FormTextareaProps = {
  readonly className?: string;
  readonly valid?: boolean;
  readonly tick?: boolean;
  readonly invalid?: boolean;
  readonly cross?: boolean;
  readonly feedback?: string;
  readonly error?: string;
  readonly placeholder?: string;
  readonly name?: string;
  readonly value?: string | number;
  readonly defaultValue?: string | number;
  readonly disabled?: boolean;
  readonly rows?: number;
  readonly children?: string;
  readonly label?: string;
  readonly maxlength?: number;
  readonly onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  readonly onClick?: React.MouseEventHandler<HTMLTextAreaElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLTextAreaElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLTextAreaElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLTextAreaElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLTextAreaElement>;
};
export type Props = FormTextareaProps;
function FormTextarea(props: FormTextareaProps): React.ReactNode {
  const {
    className,
    name,
    valid,
    tick,
    invalid,
    cross,
    error,
    placeholder,
    defaultValue,
    value,
    disabled,
    rows,
    children,
    onChange,
    onBlur,
    onFocus,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    label,
    maxlength
  } = props;
  const classes = cn("form-control", {
    "is-valid": valid,
    "state-valid": tick,
    "is-invalid": invalid || !!error,
    "state-invalid": cross || !!error
  }, className);
  const feedback = error || props.feedback;
  const contents = <React.Fragment>
      <textarea className={classes} name={name} placeholder={placeholder} defaultValue={defaultValue} value={value || children} disabled={disabled} rows={rows} onChange={onChange} onBlur={onBlur} onClick={onClick} onFocus={onFocus} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} maxLength={maxlength} />
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment>;
  return label ? <FormGroup label={label}>{contents}</FormGroup> : contents;
}
FormTextarea.displayName = "Form.Textarea";

/** @component */
export default FormTextarea;
