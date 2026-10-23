import * as React from "react";
import cn from "classnames";
import { Loader } from "../Loader";
import DimmerContent from "./DimmerContent.react";

export type DimmerProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly active?: boolean;
  readonly loader?: boolean;
};

function Dimmer({ className, children, active, loader }: DimmerProps): React.ReactElement {
  const classes = cn({ dimmer: true, active: active }, className);
  return (
    <div className={classes}>
      <React.Fragment>
        {loader && <Loader />}
        <DimmerContent>{children}</DimmerContent>
      </React.Fragment>
    </div>
  );
}

Dimmer.displayName = "Dimmer";
Dimmer.Content = DimmerContent;
export default Dimmer;