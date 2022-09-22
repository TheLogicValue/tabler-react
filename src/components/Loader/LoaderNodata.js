
import React from 'react'
const LoaderNoData = ({ height, backgroundColor = "#fff", title = "No data" }) => {
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