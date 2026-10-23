
import React from 'react'

export type LoaderNoDataProps = {
    readonly height?: React.CSSProperties["height"];
    readonly backgroundColor?: React.CSSProperties["backgroundColor"];
    readonly title?: React.ReactNode;
};

const LoaderNoData = ({ height, backgroundColor = "#fff", title = "No data" }: LoaderNoDataProps): React.ReactElement => {
    return <div style={
        {
            height: height,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            backgroundColor: backgroundColor
        }
    }>{title}</div>
}
export default LoaderNoData
