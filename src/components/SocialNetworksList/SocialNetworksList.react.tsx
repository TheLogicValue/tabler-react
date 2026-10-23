import * as React from "react";
import cn from "classnames";
import List from "../List";
import Icon from "../Icon";
import { Button } from "../Button";

export type SocialNetworkItem = {
  readonly name: string;
  readonly label?: string;
  readonly to?: string;
  readonly tooltip?: string;
  readonly color?: string;
};

export type SocialNetworksListProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly asButtons?: boolean;
  readonly prefix?: string;
  readonly itemsObjects?: ReadonlyArray<SocialNetworkItem>;
  readonly items?: ReadonlyArray<React.ReactNode>;
};

function listItemFromObjectFactory(
  asButtons: boolean = false,
  iconPrefix: string
) {
  return function SocialNetworkListItem(item: SocialNetworkItem, index: number) {
    const itemContent = asButtons ? (
      <Button to={item.to} social={item.name} color={item.color} size="sm">
        {item.label}
      </Button>
    ) : (
      <a href={item.to} data-original-title={item.tooltip}>
        <Icon prefix={iconPrefix} name={item.name} />
      </a>
    );
    return <List.Item key={index} inline>{itemContent}</List.Item>;
  };
}

function SocialNetworksList(props: SocialNetworksListProps): React.ReactElement {
  const {
    children,
    className,
    asButtons,
    prefix = "fe",
    items,
    itemsObjects,
  } = props;
  const classes = cn("social-links", className);

  const getObjectListItem = listItemFromObjectFactory(asButtons, prefix);

  const contents =
    (itemsObjects && itemsObjects.map(getObjectListItem)) ||
    (items && items.map((item, index) => <List.Item key={index} inline>{item}</List.Item>)) ||
    children;

  return (
    <List inline className={classes}>
      {contents}
    </List>
  );
}

SocialNetworksList.displayName = "SocialNetworksList";

export default SocialNetworksList;
