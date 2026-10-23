import * as React from "react";
import type { Location } from "react-router-dom";

export type RouterLocation = Pick<Location, "pathname"> & Partial<Omit<Location, "pathname">>;
export type RouterContextProviderProps = {
  readonly location: RouterLocation;
  readonly callback: (location: RouterLocation) => void;
};

class RouterContextProvider extends React.Component<RouterContextProviderProps> {
  componentDidMount(): void {
    const { callback, location } = this.props;
    callback(location);
  }

  componentDidUpdate(previous: RouterContextProviderProps): void {
    if (previous.location.pathname !== this.props.location.pathname) {
      this.props.callback(this.props.location);
    }
  }

  render(): React.ReactNode { return null; }
}
export default RouterContextProvider;
