import * as React from "react";
import Card from "../Card/Card.react";
import Icon from "../Icon/Icon.react";

export type BlogCardProps = {
  /** Propiedad heredada que no se representa. */
  readonly children?: React.ReactNode;
  readonly title?: string;
  /** Propiedad heredada sin efecto; utiliza postHref. */
  readonly titleUrl?: string;
  /** Propiedad heredada sin efecto; utiliza avatarImgSrc. */
  readonly avatarUrl?: string;
  readonly description?: string;
  readonly date?: string;
  /** Propiedad heredada sin efecto; utiliza imgSrc. */
  readonly imgUrl?: string;
  readonly iconName?: string;
  readonly iconHref?: string;
  readonly authorName?: string;
  readonly avatarImgSrc?: string;
  readonly imgSrc?: string;
  readonly imgAlt?: string;
  readonly aside?: boolean;
  readonly postHref?: string;
  readonly profileHref?: string;
};

function BlogCard({
  children,
  title,
  description,
  avatarUrl,
  imgUrl,
  imgAlt,
  aside,
  authorName,
  date,
  imgSrc = "",
  avatarImgSrc = "",
  iconName,
  iconHref,
  postHref,
  profileHref,
}: BlogCardProps): React.ReactElement {
  return !aside ? (
    <Card>
      <a href={postHref}>
        <img className="card-img-top" src={imgSrc} alt={imgAlt} />
      </a>
      <Card.Body className="d-flex flex-column">
        <h4>
          <a href={postHref}>{title}</a>
        </h4>
        <div className="text-muted">{description}</div>
        <div className="d-flex align-items-center pt-5 mt-auto">
          <div
            className="avatar avatar-md mr-3"
            style={{ backgroundImage: `url(${avatarImgSrc})` }}
          />
          <div>
            <a href={profileHref} className="text-default">
              {authorName}
            </a>
            <small className="d-block text-muted">{date}</small>
          </div>
          <div className="ml-auto text-muted">
            <a href={iconHref} className="icon d-none d-md-inline-block ml-3">
              <Icon prefix="fe" name={iconName || "heart"} />
            </a>
          </div>
        </div>
      </Card.Body>
    </Card>
  ) : (
    <Card className="card-aside">
      <a
        href={postHref}
        className="card-aside-column"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        {""}
      </a>
      <Card.Body className="d-flex flex-column">
        <h4>
          <a href={postHref}>{title}</a>
        </h4>
        <div className="text-muted">{description}</div>
        <div className="d-flex align-items-center pt-5 mt-auto">
          <div
            className="avatar avatar-md mr-3"
            style={{ backgroundImage: `url(${avatarImgSrc})` }}
          />
          <div>
            <a href={profileHref} className="text-default">
              {authorName}
            </a>
            <small className="d-block text-muted">{date}</small>
          </div>
          <div className="ml-auto text-red">
            <a href={iconHref} className="icon d-none d-md-inline-block ml-3">
              <Icon prefix="fe" name={iconName || "heart"} />
            </a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

/** @component */
export default BlogCard;
