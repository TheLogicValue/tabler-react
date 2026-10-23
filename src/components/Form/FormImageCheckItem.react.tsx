import * as React from "react";
import Grid from "../Grid";
export type FormImageCheckItemProps = {
  readonly className?: string;
  readonly value: string | number;
  readonly imageURL: string;
  readonly col?: {
    readonly width?: number;
    readonly sm?: number;
    readonly md?: number;
    readonly lg?: number;
  };
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly onClick?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLInputElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLInputElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLInputElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLInputElement>;
};
export type Props = FormImageCheckItemProps;
function FormImageCheckItem({
  className,
  col: {
    width = 6,
    sm = 4,
    md = 0,
    lg = 0
  } = {},
  imageURL,
  value,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur
}: FormImageCheckItemProps): React.ReactNode {
  return <Grid.Col width={width} sm={sm} md={md} lg={lg}>
      <label className="imagecheck mb-4">
        <input name="imagecheck" type="checkbox" value={value} className="imagecheck-input" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onFocus={onFocus} onBlur={onBlur} />
        <figure className="imagecheck-figure">
          <img src={imageURL} alt="Select" className="imagecheck-image" />
        </figure>
      </label>
    </Grid.Col>;
}
FormImageCheckItem.displayName = "Form.ImageCheckItem";
export default FormImageCheckItem;
