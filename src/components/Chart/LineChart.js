import React from "react";
import ReactECharts from "echarts-for-react";

export default function LineChartTabler({
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
    top = null,
    right = null,
    left = null,
    bottom = null,
    download = false,
    onExpand = null,
    toolboxTop = 0,
    toolboxRight = 10,
    toolboxBottom = 10,
}) {
    const option = {
        tooltip: {
            trigger: "axis",
            axisPointer: { animation: false },
            confine: false,
            appendToBody: true,
            formatter: (item) => tooltipFormatter(item),
        },
        toolbox: {
            top: toolboxTop,
            right: toolboxRight,
            bottom: toolboxBottom,
            itemSize: onExpand != null ? 8 : 15,
            feature: {
                saveAsImage: { name: name, title: title, show: download },
                myTool2: {
                    show: onExpand != null,
                    title: "",
                    icon: "path://M15,3 L21,3 L21,9 M9,21 L3,21 L3,15 M21,3 L14,10 M3,21 L10,14",
                    onclick: onExpand,
                },
            },
        },
        legend: {
            data: selectedOptions,
            selected: getLegend,
            show: complete,
            bottom: "0rem",
            symbol: null,
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            show: complete,
            data: xAxisData,
            axisLabel: { rotate: 10, verticalAlign: "top", fontSize: 9 },
        },
        grid: {
            top: top || (download ? 30 : 10),
            bottom: bottom || (complete ? 70 : onExpand != null ? 30 : 0),
            left: left || (complete ? 60 : 0),
            right: right || (complete ? 60 : onExpand != null ? 30 : 0),
        },
        yAxis: {
            show: complete,
            type: "value",
            splitNumber: 4,
            axisPointer: { snap: true },
            minorSplitLine: { show: true },
            minInterval: yAxisMinInterval,
            axisLabel: { formatter: (item) => yAxisFormatter(item) },
            max: (value) => yAxisMinMax(value, "max"),
            min: (value) => yAxisMinMax(value, "min"),
        },
        series: lines?.map((item) => ({
            data: item.data,
            color: item.color,
            name: item.name,
            type: "line",
            smooth: false,
            showSymbol: true,
            sampling: "lttb",
            animation: false,
            lineStyle: { width: 2, animation: false, type: "solid" },
        })),
    };

    return (
        <ReactECharts
            className={"charts-complete-" + complete}
            option={option}
            style={{ height: height }}
        />
    );
}
