import * as React from "react";
import cn from "classnames";
import Icon from "../Icon";
import Avatar from "../Avatar";
import { Button } from "../Button";
import AlertLink from "./AlertLink.react";


export type AlertType =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger";

export type AlertProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  /**
   * The type of this Alert, changes it's color
   */
  readonly type: AlertType;
  /**
   * An Icon to be displayed on the right hand side of the Alert
   */
  readonly icon?: string;
  /**
   * Add extra space above and below the alert
   */
  readonly hasExtraSpace?: boolean;
  /**
   * Adds an 'X' to the left side of the Alert that dismisses the Alert
   */
  readonly isDismissible?: boolean;
  /**
   * Display an Avatar on the left hand side of this Alert
   */
  readonly avatar?: string;
  /**
   * Handle the dismissing of the Alert yourself
   */
  readonly onDismissClick?: () => void;
  readonly onClick?: React.MouseEventHandler<HTMLDivElement>;
  readonly onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  readonly onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  readonly onPointerEnter?: React.PointerEventHandler<HTMLDivElement>;
  readonly onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
};

type AlertState = {
  isDismissed: boolean,
};

class Alert extends React.Component<AlertProps, AlertState> {
  state: AlertState = {
    isDismissed: false,
  };

  _handleOnDismissClick = (): void => {
    if (this.props.onDismissClick) this.props.onDismissClick();
    this.setState({ isDismissed: true });
  };

  static Link = AlertLink;

  render(): React.ReactNode {
    const { isDismissed } = this.state;
    const {
      className,
      children,
      type,
      icon,
      hasExtraSpace,
      isDismissible,
      avatar,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onPointerEnter,
      onPointerLeave,
    }: AlertProps = this.props;
    const classes = cn(
      "alert",
      `alert-${type}`,
      {
        "alert-icon": !!icon,
        "mt-5 mb-6": hasExtraSpace,
        "alert-dismissible": isDismissible,
        "alert-avatar": !!avatar,
      },
      className
    );

    const events = {
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onPointerEnter: onPointerEnter,
      onPointerLeave: onPointerLeave,
    };

    return (
      !isDismissed && (
        <div {...events} className={classes} role="alert">
          {isDismissible && (
            <Button type="button" aria-label="Close alert" className="close" onClick={this._handleOnDismissClick} />
          )}
          {avatar && <Avatar imageURL={avatar} />}
          {icon && <Icon name={icon} className="mr-2" isAriaHidden={true} />}
          {children}
        </div>
      )
    );
  }
}

export default Alert;
