import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function BarChart({
    title = "",
    type = "vertical",
    height,
    colors,
    complete,
    rotateX,
    //series
    series,
    seriesName,
    seriesShowBackground = true,
    //download
    downloadName = "Export",
    downloadTitle = "",
    download = false,
    //Methods    
    tooltipformatter,
    yAxisformatter,
    yAxisMinMax,
    xAxisMinMax,
    //data Axis
    xAxisData,
    yAxisData
}) {

    const xAxis = () => {
        let xAxis = {
            type: type === "vertical" ? "category" : "value",
            data: xAxisData
        }
        if (type === "vertical") {
            xAxis.axisLabel = { rotate: rotateX, verticalAlign: "top", fontSize: 9, interval: 0 }
        }
        if (type !== "vertical") {
            xAxis.boundaryGap = [0, 0.01]
            xAxis.max = (value) => xAxisMinMax(value, "max")
            xAxis.min = (value) => xAxisMinMax(value, "min")
        }
        return xAxis
    }

    const yAxis = () => {
        let yAxis = {
            type: type === "vertical" ? "value" : "category",
            data: yAxisData
        }
        if (type === "vertical") {
            yAxis.show = complete
            yAxis.axisLabel = { formatter: (item) => yAxisformatter(item) }
            yAxis.max = (value) => yAxisMinMax(value, "max")
            yAxis.min = (value) => yAxisMinMax(value, "min")
        }
        return yAxis
    }

    const grid = () => {
        let verticalGrid = {
            top: complete == true ? 30 : 10,
            bottom: complete == true ? 70 : 0,
            left: complete == true ? 60 : 0,
            right: complete == true ? 60 : 0,
        }
        let horizontalGrid = {
            left: '3%',
            right: '4%',
            top: '5%',
            bottom: '25%',
            containLabel: true
        }
        return type === "vertical" ? verticalGrid : horizontalGrid
    }

    const series = () => {
        try {
            return series.map((item, i) => ({
                type: 'bar',
                color: colors[i],
                name: seriesName[i],
                data: item[i],
                showBackground: seriesShowBackground,
                backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' },
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const option = {
        title: { text: title, left: 'center' },
        toolbox: {
            feature: { saveAsImage: { name: downloadName, title: downloadTitle, show: download } }
        },
        legend: { show: complete, bottom: "0rem", symbol: null },
        tooltip: {
            trigger: 'item',
            axisPointer: { type: 'shadow' },
            formatter: (item) => tooltipformatter(item)
        },
        xAxis: xAxis(),
        yAxis: yAxis(),
        grid: grid(),
        series: series()
    }

    return <ReactECharts className={'charts-complete-' + complete} option={option} style={{ height: height }} />
}
