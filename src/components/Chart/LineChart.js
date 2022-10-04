import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function LineChart({
    lines,
    height,
    selectedOptions,
    getLegend,
    tooltipFormatter,
    xAxisData,
    yAxisMinInterval,
    yAxisFormatter,
    yAxisMinMax,
    complete = false,
    name = "Export",
    title = "",
    download = false
}) {
    const option = {
        tooltip: {
            confine: true,
            trigger: 'axis',
            axisPointer: { animation: false },
            formatter: (item) => tooltipFormatter(item)
        },
        toolbox: {
            feature: {
                saveAsImage: { name: name, title: title, show: download }
            }
        },
        legend: {
            data: selectedOptions,
            selected: getLegend,
            show: complete,
            bottom: "0rem",
            symbol: null
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: complete,
            data: xAxisData,
            axisLabel: { rotate: 10, verticalAlign: "top", fontSize: 9 },
        },
        grid: {
            top: download == true ? 30 : 10,
            bottom: complete == true ? 70 : 0,
            left: complete == true ? 60 : 0,
            right: complete == true ? 60 : 0,
        },
        yAxis: {
            show: complete,
            type: 'value',
            splitNumber: 4,
            axisPointer: { snap: true },
            minorSplitLine: { show: true },
            minInterval: yAxisMinInterval,
            axisLabel: { formatter: (item) => yAxisFormatter(item) },
            max: (value) => yAxisMinMax(value, "max"),
            min: (value) => yAxisMinMax(value, "min"),
        },
        series: lines?.map(item => ({
            data: item.data,
            color: item.color,
            name: item.name,
            type: 'line',
            smooth: false,
            showSymbol: true,
            sampling: 'lttb',
            animation: false,
            lineStyle: { width: 2, animation: false, type: "solid" },
        }))
    }

    return <ReactECharts className={'charts-complete-' + complete} option={option} style={{ height: height }} />
}