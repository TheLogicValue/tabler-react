import * as React from "react";
import cn from "classnames";
export type FormFileInputProps = {
  readonly className?: string;
  readonly value?: string | number;
  readonly name?: string;
  readonly label?: string;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly accept?: string;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly onClick?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLInputElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLInputElement>;
};
export type Props = FormFileInputProps;
type State = {
  fileName: string;
};
class FormFileInput extends React.Component<FormFileInputProps, State> {
  static displayName = "Form.FileInput";
  state = {
    fileName: ""
  };
  _handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      fileName: event.target.files?.[0]?.name ?? ""
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };
  render(): React.ReactNode {
    const {
      className,
      value,
      name,
      label: labelFromProps = "Choose file",
      disabled,
      readOnly,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onPointerEnter,
      onPointerLeave,
      onFocus,
      onBlur,
      accept
    } = this.props;
    const classes = cn("custom-file", className);
    const label = this.state.fileName || labelFromProps;
    return <div className={classes}>
        <input type="file" className="custom-file-input" name={name} value={value} disabled={disabled} readOnly={readOnly} onChange={this._handleOnChange} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onFocus={onFocus} onBlur={onBlur} accept={accept} />
        <label className="custom-file-label" style={{
        whiteSpace: "nowrap",
        display: "block",
        overflow: "hidden"
      }}>
          {label}
        </label>
      </div>;
  }
}
export default FormFileInput;
