import * as React from "react";
import cn from "classnames";
import Grid from "../Grid";

// FormEvents not imported due to check on props utilization. FormRatioProps typing do not use mandatory props.

export type FormRatioCommonProps = {
  readonly className?: string;
  readonly step?: number;
  readonly min?: number;
  readonly max?: number;
  readonly onClick?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLInputElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLInputElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
};
export type FormRatioProps = FormRatioCommonProps & ({
  readonly value: number;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
  readonly defaultValue?: never;
} | {
  readonly defaultValue: number;
  readonly value?: never;
  readonly onChange?: never;
});
export type Props = FormRatioProps;
type State = {
  internalValue: number;
};
class FormRatio extends React.PureComponent<FormRatioProps, State> {
  static displayName = "Form.Ratio";
  state: State = {
    internalValue: !this.props.onChange ? this.props.defaultValue : 0
  };
  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (this.props.onChange) {
      this.props.onChange(e);
    } else {
      const value = Number(e.target.value);
      this.setState({
        internalValue: value
      });
    }
  };
  render(): React.ReactNode {
    const {
      className,
      step = 1,
      min = 0,
      max = 0,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onPointerEnter,
      onPointerLeave,
      onFocus,
      onBlur
    } = this.props;
    const classes = cn(className);
    const value: number = this.props.onChange ? this.props.value : this.state.internalValue;
    return <Grid.Row className={classes} alignItems="center">
        <Grid.Col>
          <input type="range" className="form-control custom-range" step={step} min={min} max={max} onChange={this.handleOnChange} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} value={value} />
        </Grid.Col>
        <Grid.Col auto>
          <input type="number" className="form-control w-8" value={value} onFocus={onFocus} onBlur={onBlur} readOnly />
        </Grid.Col>
      </Grid.Row>;
  }
}
export default FormRatio;
