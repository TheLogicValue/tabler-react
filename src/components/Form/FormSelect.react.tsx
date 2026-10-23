import * as React from "react";
import cn from "classnames";
import FormGroup from "./FormGroup.react";
export type FormSelectProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly valid?: boolean;
  readonly tick?: boolean;
  readonly invalid?: boolean;
  readonly cross?: boolean;
  readonly feedback?: string;
  readonly error?: string;
  readonly label?: string;
  readonly name?: string;
  readonly value?: string | number | readonly string[];
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly multiple?: boolean;
  readonly onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  readonly onClick?: React.MouseEventHandler<HTMLSelectElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLSelectElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLSelectElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLSelectElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLSelectElement>;
};
export type Props = FormSelectProps;
function FormSelect(props: FormSelectProps): React.ReactNode {
  const {
    className,
    children,
    valid,
    tick,
    invalid,
    cross,
    error,
    label,
    disabled,
    readOnly,
    name,
    value,
    onChange,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onClick,
    multiple
  } = props;
  const classes = cn({
    "form-control": true,
    "custom-select": true,
    "is-valid": valid,
    "state-valid": tick,
    "is-invalid": invalid || !!error,
    "state-invalid": cross || !!error
  }, className);
  const feedback = error || props.feedback;
  const contents = <React.Fragment>
      <select name={name} value={value} onChange={onChange} onBlur={onBlur} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onClick={onClick} className={classes} disabled={disabled} {...{
      readOnly
    }} multiple={multiple}>
        {children}
      </select>
      {feedback && <span className="invalid-feedback">{feedback}</span>}
    </React.Fragment>;
  return label ? <FormGroup label={label}>{contents}</FormGroup> : contents;
}
FormSelect.displayName = "Form.Select";

/** @component */
export default FormSelect;
