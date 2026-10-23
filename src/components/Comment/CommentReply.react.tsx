import * as React from "react";
import Media from "../Media";

export type CommentReplyProps = {
  /** Propiedad heredada sin representación; utiliza text. */
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly avatarURL?: string;
  readonly name?: string;
  /** Propiedad heredada que no se representa en la respuesta. */
  readonly date?: string;
  readonly text?: string;
};

function CommentReply({
  className,
  children,
  avatarURL,
  name,
  date,
  text,
}: CommentReplyProps): React.ReactElement {
  return (
    <Media.ListItem className={className}>
      <Media.Object avatar objectURL={avatarURL} className="mr-4" />
      <Media.Body>
        <strong>{name}: </strong>
        {text}
      </Media.Body>
    </Media.ListItem>
  );
}

export default CommentReply;
