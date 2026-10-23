import * as React from "react";
import cn from "classnames";
import Card from "../Card";
import Stamp from "../Stamp";
import Header from "../Header";
import Text from "../Text";

export type StampCardProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly icon?: string;
  readonly color?: string;
  readonly header?: React.ReactNode;
  readonly footer?: React.ReactNode;
};

function StampCard({
  children,
  className,
  icon,
  color = "",
  header,
  footer,
}: StampCardProps): React.ReactElement {
  const classes = cn("p-3", className);
  return (
    <Card className={classes}>
      <div className="d-flex align-items-center">
        <Stamp color={color} icon={icon} className="mr-3" />
        <div>
          {header && (
            <Header size={4} className="m-0">
              {header}
            </Header>
          )}
          {children}
          {footer && <Text.Small muted>{footer}</Text.Small>}
        </div>
      </div>
    </Card>
  );
}

StampCard.displayName = "StampCard";

export default StampCard;
