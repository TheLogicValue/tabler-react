import * as React from "react";

export type ClickOutsideProps = {
  readonly children: (props: { setElementRef: (element: HTMLElement | null) => void }) => React.ReactNode;
  readonly onOutsideClick: () => void;
};

/**
 * A helper to help you do something when a user clicks outside of a component
 */
class ClickOutside extends React.PureComponent<ClickOutsideProps> {
  declare elementRef: HTMLElement | null | undefined;

  componentDidMount = (): void => {
    document.addEventListener("mousedown", this.handleOutsideOnClick, false);
  };

  componentWillUnmount = (): void => {
    document.removeEventListener("mousedown", this.handleOutsideOnClick, false);
  };

  setElementRef = (el: HTMLElement | null): void => {
    if (el) this.elementRef = el;
  };

  isOutsideClick = (target: unknown) =>
    this.elementRef &&
    target instanceof Node &&
    !this.elementRef.contains(target);

  handleOutsideOnClick = ({ target }: MouseEvent): void => {
    if (this.isOutsideClick(target)) this.props.onOutsideClick();
  };

  render(): React.ReactNode {
    const { children } = this.props;
    return children({ setElementRef: this.setElementRef });
  }
}

export default ClickOutside;
