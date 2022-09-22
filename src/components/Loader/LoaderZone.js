import React from 'react'
import ContentLoader from "react-content-loader"

const LoaderZone = ({ width, height, title = "Loading", speed = 2, backgroundColor = "#f3f3f3", foregroundColor = "#ecebeb" }) => {

    const updateHeight = (height, operation, operationValue = 0.313) => {
        let unity = "";
        let value = "";

        for (let h of height) {
            if (isNaN(parseInt(h))) unity += h
            else value += h
        }

        const operations = {
            "res": () => (parseFloat(value) - operationValue) + unity.replace(".", ""),
            "sum": () => (parseFloat(value) + operationValue) + unity.replace(".", "")
        }

        return operations[operation]()
    }

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
        <rect x="0" y="0" rx="2" ry="2" width={width} height={updateHeight(height, "res")} />
    </ContentLoader>
}
export default LoaderZone