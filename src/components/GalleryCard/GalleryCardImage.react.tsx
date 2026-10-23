import * as React from "react";
import cn from "classnames";

export type GalleryCardImageProps = {
  readonly src: string;
  readonly alt?: string;
  readonly href?: string;
  readonly rounded?: boolean;
  readonly className?: string;
  readonly to?: string;
  readonly RootComponent?: React.ElementType;
};

function GalleryCardImage({
  src,
  alt,
  href,
  rounded = true,
  className,
  to,
  RootComponent,
}: GalleryCardImageProps): React.ReactElement {
  const componentClasses = cn("mb-3");

  const imageClasses = cn(
    {
      rounded: rounded,
    },
    className
  );

  const componentOptionalProps: { href?: string } = {};

  if (href) {
    componentOptionalProps.href = href;
  }

  const image = <img src={src} alt={alt} className={imageClasses} />;
  return RootComponent ? (
    <RootComponent className={componentClasses} to={to}>
      {image}
    </RootComponent>
  ) : (
    <a className={componentClasses} {...componentOptionalProps}>
      {image}
    </a>
  );
}

GalleryCardImage.displayName = "GalleryCard.Image";

/** @component */
export default GalleryCardImage;
