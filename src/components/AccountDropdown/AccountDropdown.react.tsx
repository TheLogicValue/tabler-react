import * as React from "react";
import Dropdown from "../Dropdown";
import Avatar from "../Avatar";

import type { itemObject } from "../Dropdown/Dropdown.react";

export type DefaultAccountOption =
  | "profile"
  | "settings"
  | "mail"
  | "message"
  | "divider"
  | "help"
  | "logout";

type optionsType = ReadonlyArray<DefaultAccountOption | itemObject>;

type defaultOptionsType = Record<DefaultAccountOption, itemObject>;

export type AccountDropdownProps = {
  readonly avatarURL?: string;
  readonly avatarImage?: React.ReactNode;
  readonly name?: string;
  readonly description?: string;
  /**
   * An array of the option items within the Dropdown
   */
  readonly options?: optionsType;
  /**
   * The default RootComponent for all options.
   * optionsObjects[x].RootComponent takes priority
   */
  readonly optionsRootComponent?: React.ElementType;
};

const defaultOptions: defaultOptionsType = {
  profile: { icon: "user", value: "Profile", to: "/profile" },
  settings: { icon: "settings", value: "Settings", to: "/settings" },
  mail: { icon: "mail", value: "Inbox", to: "/mail" },
  message: { icon: "send", value: "Message", to: "/message" },
  help: { icon: "help-circle", value: "Need help?", to: "/help" },
  logout: { icon: "log-out", value: "Sign out", to: "/logout" },
  divider: { isDivider: true },
};

const itemsFromDefaultOptions = (options: optionsType) =>
  options.map(opt => (typeof opt === "string" ? defaultOptions[opt] : opt));

/**
 * A component for fast creation of an account centric dropdown
 */
function AccountDropdown({
  avatarURL,
  avatarImage,
  name,
  description,
  options = [],
  optionsRootComponent,
}: AccountDropdownProps): React.ReactNode {
  const itemsObjects = itemsFromDefaultOptions(options);

  return (
    <Dropdown
      isNavLink
      triggerClassName="pr-0 leading-none"
      triggerContent={
        <React.Fragment>
          {avatarImage}
          {avatarURL && <Avatar imageURL={avatarURL} />}
          <span className="ml-2 d-none d-lg-block">
            <span className="text-default">{name}</span>
            <small className="text-muted d-block mt-1">{description}</small>
          </span>
        </React.Fragment>
      }
      position="bottom-end"
      arrow={true}
      arrowPosition="right"
      toggle={false}
      itemsObject={itemsObjects}
      itemsRootComponent={optionsRootComponent}
    />
  );
}

export default AccountDropdown;

export type Props = AccountDropdownProps;
