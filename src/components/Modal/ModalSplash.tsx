import "./ModalSplash.css";
import React from "react";
export type ModalSplashProps = {
  readonly image?: string;
  readonly alt?: string;
};
export default function ModalSplash({
  image,
  alt = "splash"
}: ModalSplashProps): React.ReactElement {
  return <div className="splash-container">
        <div className="stage">
            <div className="dot-pulse"></div>
        </div>
        <img src={image} className="splash-image" alt={alt}></img>
    </div>;
}
