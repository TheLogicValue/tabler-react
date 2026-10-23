import * as React from "react";
import cn from "classnames";
import List from "../List";
import Media from "../Media/Media.react";
import Text from "../Text/Text.react";
import CommentList from "./CommentList.react";
import CommentReply from "./CommentReply.react";

export type CommentProps = {
  /** Propiedad heredada sin representación; utiliza text y replies. */
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly avatarURL?: string;
  readonly name?: string;
  readonly date?: string;
  readonly text?: string;
  readonly replies?: React.ReactNode;
};

function Comment({
  className,
  children,
  avatarURL,
  name,
  date,
  text,
  replies,
}: CommentProps): React.ReactElement {
  const classes = cn("py-5", className);

  return (
    <List.GroupItem className={classes}>
      <Media>
        <Media.Object avatar objectURL={avatarURL} size="md" className="mr-4" />
        <Media.Body>
          <Media.Heading>
            <small className="float-right text-muted">{date}</small>
            <h5>{name}</h5>
          </Media.Heading>
          <Text>{text}</Text>
          {replies && <Media.List>{replies}</Media.List>}
        </Media.Body>
      </Media>
    </List.GroupItem>
  );
}

Comment.List = CommentList;
Comment.Reply = CommentReply;

export default Comment;
