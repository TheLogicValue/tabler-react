import * as React from "react";
import cn from "classnames";
import Icon from "../Icon";

export type CardOptionsItemProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly icon?: string;
  readonly type?: "collapse" | "close" | "fullscreen";
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
  readonly "aria-label"?: string;
};

function CardOptionsItem({
  className,
  children,
  icon,
  type,
  onClick,
  "aria-label": ariaLabel,
}: CardOptionsItemProps): React.ReactElement {
  const classes = cn(
    "tabler-action",
    {
      "card-options-collapse": type === "collapse",
      "card-options-remove": type === "close",
      "card-options-fullscreen": type === "fullscreen",
    },
    className
  );

  const dataToggle = ((): string => {
    switch (type) {
      case "collapse":
        return "card-collapse";
      case "close":
        return "card-remove";
      case "fullscreen":
        return "card-remove";
      default:
        return "";
    }
  })();

  const iconName = ((): string => {
    if (icon) {
      return icon;
    }
    switch (type) {
      case "collapse":
        return "chevron-up";
      case "close":
        return "x";
      case "fullscreen":
        return "maximize";
      default:
        return "";
    }
  })();

  return (
    <button
      type="button"
      className={classes}
      data-toggle={dataToggle}
      onClick={onClick}
      aria-label={ariaLabel || (type && { collapse: "Collapse card", close: "Close card", fullscreen: "Toggle fullscreen" }[type]) || "Card action"}
    >
      <Icon name={iconName} />
    </button>
  );
}

CardOptionsItem.displayName = "Card.OptionsItem";

export default CardOptionsItem;
