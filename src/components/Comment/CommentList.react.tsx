import * as React from "react";
import cn from "classnames";
import List from "../List";

export type CommentListProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function CommentList({ className, children }: CommentListProps): React.ReactElement {
  const classes = cn("card-list-group", className);
  return <List.Group className={classes}>{children}</List.Group>;
}

export default CommentList;
