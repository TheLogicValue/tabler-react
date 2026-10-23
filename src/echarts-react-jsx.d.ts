import type * as React from "react";

// echarts-for-react 3 declares render(): JSX.Element. React 19 moved that
// namespace under React; supply only the missing return type for source checks.
declare global {
  namespace JSX {
    type Element = React.JSX.Element;
  }
}
