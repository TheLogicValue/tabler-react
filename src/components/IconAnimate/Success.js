import React from 'react';
import './IconAnimate.css'
export default function Success({ height = 26, width = 26 }) {
    return <svg className="svg-container" height={height} width={width} viewBox="0 0 100 100">
        <circle className="loader-svg success" cx="50" cy="50" r="45"></circle>
        <polyline className="loader-svg success" points="20 45 40 65 75 30"></polyline>
    </svg>
}