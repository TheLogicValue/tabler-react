import * as React from "react";
import cn from "classnames";
import Container from "../Container.react";
import Grid from "../Grid";
import Nav from "../Nav";

import type { NavItemObject, NavProps } from "../Nav";

export type SiteNavProps = {
  readonly children?: React.ReactNode;
  readonly items?: React.ReactNode;
  readonly itemsObjects?: ReadonlyArray<NavItemObject>;
  /**
   * Display a search form to the right of the nav items
   */
  readonly withSearchForm?: boolean;
  /**
   * Provide your own component to replace the search form
   */
  readonly rightColumnComponent?: React.ReactNode;
  /**
   * Toggle the collapsed state of the nav
   */
  readonly collapse?: boolean;
  readonly routerContextComponentType?: NavProps["routerContextComponentType"];
  readonly vertical?: boolean;
  readonly navOption?: React.ReactNode;
  readonly stickyTop?: boolean;
  readonly condensed?: boolean;
};

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
  vertical = false,
  navOption
}: SiteNavProps): React.ReactNode => {
  const sticky = stickyTop ? "sticky-top" : ""
  const isCondensed = condensed ? "" : "d-lg-flex"
  const classes = cn("header p-0 " + sticky + " " + isCondensed, { collapse });

  if (vertical) {
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
  } else {
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
              { navOption ? <Grid.Col className="col-1"> {navOption} </Grid.Col> : null }              
            </Grid.Row>
          )}
        </Container>
      </div>
    );
  }
};

SiteNav.displayName = "Site.Nav";

export default SiteNav;

export type Props = SiteNavProps;
