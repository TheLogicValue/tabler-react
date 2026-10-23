import React from 'react';
import Grid from "../Grid"
import List from "../List"

export type BreadcrumbCrumb<TPath = string> = {
  readonly name: React.ReactNode;
  readonly path: TPath;
};

export type BreadcrumbProps<TPath = string> = {
  readonly crumbs: ReadonlyArray<BreadcrumbCrumb<TPath>>;
  readonly selected: (path: TPath) => void;
};

function Breadcrumb<TPath = string>(props: BreadcrumbProps<TPath>): React.ReactElement {

  function isLast(index: number) {
    return index === props.crumbs.length - 1;
  }

  return (
    <div className="">
        <div className="container">
            <Grid.Row>
                <List className="breadcrumb">
                {
                props.crumbs.map((crumb, ci) => {
                    const disabled = isLast(ci) ? 'disabled' : '';
                    return (
                        <li
                            key={ci}
                            className="breadcrumb-item align-items-center"
                        >
                            <button type="button" className={`btn btn-link ${disabled}`} onClick={()=> props.selected(crumb.path)}>
                                {crumb.name}
                            </button>
                        </li>
                    );
                })
                }
                </List>
            </Grid.Row>
        </div>
      </div>
  );
}

export default Breadcrumb;
