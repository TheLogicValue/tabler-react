import React from 'react'
import ContentLoader from "react-content-loader"
import type { IContentLoaderProps } from "react-content-loader"

export type LoaderZoneProps = {
    readonly width?: IContentLoaderProps["width"];
    readonly height: string | number;
    readonly title?: string;
    readonly speed?: number;
    readonly backgroundColor?: string;
    readonly foregroundColor?: string;
};

// Keep the legacy subtraction for numeric lengths, including fractional units.
// Expressions such as calc()/var() are passed through without interpretation.
function contentHeight(height: string | number): string | number {
    if (typeof height === "number") return height - 0.313;
    const length = /^(-?(?:\d+\.?\d*|\.\d+))([a-z%]*)$/i.exec(height);
    return length ? `${Number(length[1]) - 0.313}${length[2]}` : height;
}

const LoaderZone = ({ width, height, title = "Loading", speed = 2, backgroundColor = "#f3f3f3", foregroundColor = "#ecebeb" }: LoaderZoneProps): React.ReactElement => {

    return <ContentLoader
        speed={speed}
        className="loading-zone"
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        title={title}
        style={{ padding: "0.125rem 0.313rem" }}
    >
        <rect x="0" y="0" rx="2" ry="2" width={width} height={contentHeight(height)} />
    </ContentLoader>
}
export default LoaderZone
