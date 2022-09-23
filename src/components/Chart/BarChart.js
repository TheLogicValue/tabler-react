import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function BarChart({
    height,
    series,
    seriesDataName,
    seriesName,
    colors,
    complete,
    titleBarchart,
    rotateX,
    //download
    name = "Export",
    title = "",
    download = false,
    //functions
    tooltipformatter,
    yAxisformatter,
    yAxisMinMax,
    xAxisData
}) {
    const option = {
        title: { text: titleBarchart, left: 'center' },
        toolbox: {
            feature: { saveAsImage: { name: name, title: title, show: download } }
        },
        legend: { show: complete, bottom: "0rem", symbol: null },
        tooltip: {
            trigger: 'item',
            axisPointer: { type: 'shadow' },
            formatter: (item) => tooltipformatter(item)
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: { rotate: rotateX, verticalAlign: "top", fontSize: 9, interval: 0 }
        },
        yAxis: {
            show: complete,
            type: 'value',
            axisLabel: { formatter: (item) => yAxisformatter(item) },
            max: (value) => yAxisMinMax(value, "max"),
            min: (value) => yAxisMinMax(value, "min")
        },
        grid: {
            top: complete == true ? 30 : 10,
            bottom: complete == true ? 70 : 0,
            left: complete == true ? 60 : 0,
            right: complete == true ? 60 : 0,
        },
        series: series.map((item, i) => ({
            data: item.slice(0, seriesDataName.length),
            name: seriesName[i],
            color: colors[i],
            type: 'bar',
            showBackground: true,
            backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' },
        }))
    }

    return <ReactECharts className={'charts-complete-' + complete} option={option} style={{ height: height }} />
}
