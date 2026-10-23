// GalleryCardDetails Component
import * as React from "react";
import cn from "classnames";

import Avatar from "../Avatar";

export type GalleryCardDetailsProps = {
  /** Propiedad heredada sin efecto: Details devuelve un fragmento. */
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly avatarURL?: string;
  readonly fullName?: string | null;
  readonly dateString?: string | null;
};

function GalleryCardDetails({
  className,
  children,
  avatarURL,
  fullName,
  dateString,
}: GalleryCardDetailsProps): React.ReactElement {
  //classes

  const avatarClasses = cn("mr-3");
  const dateStringClasses = cn("d-block text-muted");

  //conditions
  const hasOtherDetails = fullName !== null || dateString !== null;

  //components
  const avatar = (
    <Avatar imageURL={avatarURL} size="md" className={avatarClasses} />
  );
  // TODO: The following could be a seperate component
  const otherDetails = (
    <div>
      <div>{fullName}</div>
      <small className={dateStringClasses}> {dateString}</small>{" "}
    </div>
  );

  return (
    <React.Fragment>
      {avatarURL && avatar}
      {hasOtherDetails && otherDetails}
      {children}
    </React.Fragment>
  );
}

GalleryCardDetails.displayName = "GalleryCard.Details";

export default GalleryCardDetails;
