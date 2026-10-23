import * as React from "react";
import cn from "classnames";
import Card from "../Card";
import Media from "../Media";
import Grid from "../Grid";
import Header from "../Header";

export type ContactAddress = {
  readonly line1?: string;
  readonly line2?: string;
};
export type ContactDetail = {
  readonly title: string;
  readonly content?: React.ReactNode;
};
export type ContactDescription = {
  readonly title: string;
  readonly content?: string;
};

export type ContactCardProps = {
  readonly children?: React.ReactNode;
  readonly className?: string;
  /**
   * The Card title
   */
  readonly cardTitle?: string;
  /**
   * Render a map at the top of the Card
   */
  readonly map?: React.ReactNode;
  /**
   * Render a map placeholder at the top of the Card
   */
  readonly mapPlaceholder?: string;
  /**
   * Add rounded corners to the Media.Object rendered by objectURL
   */
  readonly rounded?: boolean;
  /**
   * Display an Avatar in place of the Media.Object rendered by objectURL
   */
  readonly avatar?: boolean;
  /**
   * The URL of a contact image to displayed alongside thier name
   */
  readonly objectURL?: string;
  /**
   * The alt value for the objectURL image
   */
  readonly alt?: string;
  /**
   * The contacts name
   */
  readonly name?: string;
  /**
   * The contacts address
   */
  readonly address?: ContactAddress;
  /**
   * An array of contacts details displayed in a 2 column Grid
   */
  readonly details?: ReadonlyArray<ContactDetail>;
  /**
   * An additional block of text below the details
   */
  readonly description?: string | ContactDescription;
};

/**
 * Renders a Card designed for displaying details of a person or business
 */
function ContactCard({
  children,
  className,
  cardTitle,
  map,
  mapPlaceholder,
  rounded,
  avatar,
  objectURL,
  alt,
  name,
  address,
  details,
  description,
}: ContactCardProps): React.ReactElement {
  const cardClassName = cn(className);
  return (
    <Card className={cardClassName} title={cardTitle}>
      {(mapPlaceholder || map) && (
        <Card.Map placeholder={mapPlaceholder}>{map}</Card.Map>
      )}
      <Card.Body>
        <Media className="mb-5">
          <Media.Object
            size="md"
            className="mr-4"
            avatar={avatar}
            rounded={rounded}
            objectURL={objectURL}
            alt={alt}
          />

          <Media.Body>
            {name && <Header.H5>{name}</Header.H5>}
            {address && (
              <address className="text-muted small">
                {address.line1}
                {address.line2 && <br />}
                {address.line2}
              </address>
            )}
          </Media.Body>
        </Media>
        {details && (
          <Grid.Row>
            {details.map((d, i) => (
              <Grid.Col width={6} key={i}>
                <Header.H6>{d.title}</Header.H6>
                <p>{d.content}</p>
              </Grid.Col>
            ))}
          </Grid.Row>
        )}
        {description && (
          <React.Fragment>
            <Header.H6>
              {typeof description === "string"
                ? "Description"
                : description.title}
            </Header.H6>
            <p>
              {typeof description === "string"
                ? description
                : description.content}
            </p>
          </React.Fragment>
        )}
        {children}
      </Card.Body>
    </Card>
  );
}

export default ContactCard;
