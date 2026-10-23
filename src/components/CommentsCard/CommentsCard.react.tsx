import * as React from "react";
import cn from "classnames";
import FormWithSingleInputAndButton from "../../forms/FormWithSingleInputAndButton.react";
import Card from "../Card";
import Comment from "../Comment";

export type CommentsCardProps = {
  /** Se pasa a Comment, cuya implementación heredada no representa children. */
  readonly children?: React.ReactNode;
  readonly className?: string;
};

function CommentsCard({ className, children }: CommentsCardProps): React.ReactElement {
  const classes = cn(className);
  return (
    <Card className={classes}>
      <Card.Header>
        <FormWithSingleInputAndButton
          inputProps={{ placeholder: "Message" }}
          buttonProps={{ icon: "camera", color: "secondary" }}
        />
        <Comment>{children}</Comment>
      </Card.Header>
    </Card>
  );
}

export default CommentsCard;
