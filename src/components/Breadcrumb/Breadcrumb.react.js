import React from 'react';
import {Grid, List} from "../"

function Breadcrumb(props) {

  function isLast(index) {
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
                            <button className={`btn btn-link ${disabled}`} onClick={()=> props.selected(crumb.path)}>
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