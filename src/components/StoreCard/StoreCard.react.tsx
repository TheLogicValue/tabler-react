import * as React from "react";
import Card from "../Card/Card.react";
import Text from "../Text/Text.react";
import Button from "../Button/Button.react";
import Icon from "../Icon/Icon.react";

export type StoreCardProps = {
  /** Propiedad heredada que no personaliza el contenido ni el botón. */
  readonly children?: React.ReactNode;
  readonly title?: string;
  readonly price?: string;
  readonly subtitle?: string;
  readonly imgUrl?: string;
  readonly imgAlt?: string;
};

function StoreCard({
  children,
  title,
  subtitle,
  price,
  imgUrl,
  imgAlt,
}: StoreCardProps): React.ReactElement {
  return (
    <Card>
      <Card.Body>
        <div className="mb-4 text-center">
          <img src={imgUrl} alt={imgAlt} />
        </div>
        <Card.Title>{title}</Card.Title>
        <Text className="card-subtitle">{subtitle}</Text>

        <div className="mt-5 d-flex align-items-center">
          <div className="product-price">
            <strong>{price}</strong>
          </div>
          <div className="ml-auto">
            <Button color="primary">
              <Icon prefix="fe" name="plus" />
              Add to cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default StoreCard;
