import React from 'react';
import './Spinner.css'
export default function Spinner({ height = 26, width = 26 }) {
    return <svg className="svg-container" height={height} width={width} viewBox="0 0 100 100">
        <circle className="loader-svg loading" cx="50" cy="50" r="45"></circle>
        <circle className="loader-svg animate" cx="50" cy="50" r="45"></circle>
    </svg>
}