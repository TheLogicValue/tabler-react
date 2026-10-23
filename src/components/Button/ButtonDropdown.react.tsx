import * as React from "react";
import Button from "./Button.react";
import Dropdown from "../Dropdown";
import { FloatingProvider, FloatingReference } from "../../helpers/Floating.react";
import type { ButtonProps } from "../Button/Button.react";
import type { DropdownMenuProps } from "../Dropdown/DropdownMenu.react";


export type ButtonDropdownProps = ButtonProps & {
  readonly value?: string;
  readonly children?: React.ReactNode;
  readonly dropdownProps?: DropdownMenuProps;
};

type ButtonDropdownState = {
  isOpen: boolean,
};

class ButtonDropdown extends React.Component<ButtonDropdownProps, ButtonDropdownState> {
  declare static displayName: string;
  state: ButtonDropdownState = { isOpen: false };

  _handleButtonOnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState(s => ({ isOpen: !s.isOpen }));
    if (this.props.onClick) (this.props.onClick as React.MouseEventHandler<HTMLElement>)(e);
  };

  render(): React.ReactNode {
    const { children, value, dropdownProps, ...buttonProps } = this.props;

    const propsForDropdownMenu: DropdownMenuProps = dropdownProps
      ? { ...dropdownProps, show: this.state.isOpen }
      : {
          show: this.state.isOpen,
        };

    const dropdownMenu = React.createElement(
      Dropdown.Menu,
      propsForDropdownMenu,
      children
    );

    return (
      <FloatingProvider outsidePress onDismiss={() => this.setState({ isOpen: false })}>
        <FloatingReference rootRef={buttonProps.rootRef}>
          {({ ref }) => {
            const propsForButton = Object.assign(
              {}, buttonProps, {
                type: buttonProps.type || "button",
                onClick: this._handleButtonOnClick,
                rootRef: ref,
                isDropdownToggle: true,
              }
            );
            const button = React.createElement(Button, propsForButton, value);
            return button;
          }}
        </FloatingReference>
        {dropdownMenu}
      </FloatingProvider>
    );
  }
}

ButtonDropdown.displayName = "Button.Dropdown";

export default ButtonDropdown;
