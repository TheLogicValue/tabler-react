// @flow

import * as React from "react";
import cn from "classnames";
import { Container, Grid, Nav } from "../../";

type subNavItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +LinkComponent?: React.ElementType,
  +useExact?: boolean,
|};

type navItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +active?: boolean,
  +LinkComponent?: React.ElementType,
  +subItems?: Array<subNavItem>,
  +useExact?: boolean,
|};

type navItems = Array<navItem>;

export type Props = {|
  +children?: React.Node,
  +items?: React.ChildrenArray<React.Element<typeof Nav.Item>>,
  +itemsObjects?: navItems,
  /**
   * Display a search form to the right of the nav items
   */
  +withSearchForm?: boolean,
  /**
   * Provide your own component to replace the search form
   */
  +rightColumnComponent?: React.Node,
  /**
   * Toggle the collapsed state of the nav
   */
  +collapse?: boolean,
  +routerContextComponentType?: React.ElementType,
  +vertical?: boolean,
|};

const SiteNav = ({
  children,
  items,
  itemsObjects,
  withSearchForm = true,
  rightColumnComponent,
  collapse = true,
  routerContextComponentType,
  stickyTop = false,
  condensed = false,
  vertical = false
}: Props): React.Node => {
  const sticky = stickyTop ? "sticky-top" : ""
  const isCondensed = condensed ? "" : "d-lg-flex"
  const classes = cn("header p-0 " + sticky + " " + isCondensed, { collapse });

  if (vertical){
    return (
      <div className="collapse navbar-collapse" id="navbar-menu">
        <Nav
          tabbed={false}
          vertical
          className="navbar-nav pt-lg-3"
          items={items}
          itemsObjects={itemsObjects}
          routerContextComponentType={routerContextComponentType}
        />
      </div>
    )
  }else{
    return (
      <div className={classes}>
        <Container>
          {children || (
            <Grid.Row className="align-items-center">
              <Grid.Col className="col-lg order-lg-first">
                <Nav
                  tabbed
                  className="border-0 flex-column flex-lg-row"
                  items={items}
                  itemsObjects={itemsObjects}
                  routerContextComponentType={routerContextComponentType}
                />
              </Grid.Col>
            </Grid.Row>
          )}
        </Container>
      </div>
    );
  }
};

SiteNav.displayName = "Site.Nav";

export default SiteNav;
