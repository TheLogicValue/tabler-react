import React from 'react';
import './IconAnimate.css'
export default function Error({ height = 26, width = 26 }) {
    return <svg className="svg-container" height={height} width={width} viewBox="0 0 100 100">
        <circle className="loader-svg error" cx="50" cy="50" r="45"></circle>
        <path className="loader-svg error" d="M30,30 L70,70"></path>
        <path className="loader-svg error" d="M70,30 L30,70"></path>
    </svg>
}