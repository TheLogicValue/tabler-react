import "./ModalSplash.css"
import React from "react"

export default function ModalSplash({ image, alt="splash" }) {
    return <div className="splash-container">
        <div className="stage">
            <div className="dot-pulse"></div>
        </div>
        <img src={image} className="splash-image" alt={alt}></img>
    </div>
}