import React from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption, BarSeriesOption, XAxisComponentOption, YAxisComponentOption, LegendComponentOption } from "echarts";
import type { BarChartProps, BarChartData, ChartTooltipItem, ChartCategoryData } from "./types";

export default function BarChart ({
    title = "",
    type = "vertical",
    height = "18.75rem",
    paddingBottom = null,
    legend = true,
    colors,
    complete,
    rotateX,
    //series
    series,
    seriesName,
    //download
    downloadName = "Export",
    downloadTitle = "",
    download = false,
    //Methods    
    tooltipFormatter,
    yAxisFormatter,
    xAxisFormatter,
    yAxisMinMax,
    xAxisMinMax,
    //data Axis
    xAxisData,
    yAxisData,
    //config series
    stack = null,
    decal = null,
    seriesShowBackground = true,
    backgroundStyleColor = 'rgba(180, 180, 180, 0.2)'
}: BarChartProps): React.ReactElement {

    const xAxis = () => {
        const xAxis: XAxisComponentOption & { data?: ChartCategoryData } = {
            type: type === "vertical" ? "category" : "value",
            data: xAxisData
        }
        if (type === "vertical") {
            xAxis.axisLabel = { rotate: rotateX, verticalAlign: "top", fontSize: 9, interval: 0 }
        }
        if (type !== "vertical") {
            xAxis.boundaryGap = [0, 0.01]
            xAxis.axisLabel = { formatter: (item: number) => xAxisFormatter!(item) }
            xAxis.max = (value) => xAxisMinMax!(value, "max")
            xAxis.min = (value) => xAxisMinMax!(value, "min")
        }
        return xAxis
    }

    const yAxis = () => {
        const yAxis: YAxisComponentOption & { data?: ChartCategoryData } = {
            type: type === "vertical" ? "value" : "category",
            data: yAxisData
        }
        if (type === "vertical") {
            yAxis.show = complete
            yAxis.axisLabel = { formatter: (item: number) => yAxisFormatter!(item) }
            yAxis.max = (value) => yAxisMinMax!(value, "max")
            yAxis.min = (value) => yAxisMinMax!(value, "min")
        }
        return yAxis
    }

    const grid = () => {
        const verticalGrid = {
            top: complete == true ? 30 : 10,
            bottom: complete == true ? 70 : 0,
            left: complete == true ? 60 : 0,
            right: complete == true ? 60 : 0,
        }
        const horizontalGrid = {
            left: '3%',
            right: '4%',
            top: '5%',
            bottom: '25%',
            containLabel: true
        }
        return type === "vertical" ? verticalGrid : horizontalGrid
    }

    const serie = () => {
        return series.map((item, i) => {

            const ser: BarSeriesOption & { backgoundStyle: { color: string } } = {
                type: 'bar',
                color: colors[i],
                name: ((!stack) ? seriesName[i] : item) as string,
                data: ((!stack) ? item : seriesName[i]) as BarChartData,
                stack: stack ?? undefined,
                showBackground: seriesShowBackground,
                backgoundStyle: { color: backgroundStyleColor },
              
            }

            if(decal) {
                ser.itemStyle = {
                    decal: {
                        ...{ show: seriesName[i] != "Fondo" },
                        color: 'white',
                        rotation: 0.5,
                        dashArrayX: [1, 0],
                        dashArrayY: [2, 5],
                        symbolSize: 0.5,
                        symbol: seriesName[i] == "Fondo" ? "none" : undefined
                    }
                }
            }

            return ser
        })
    }

    const option: EChartsOption = {
        title: { text: title, left: 'center' },
        toolbox: {
            feature: { saveAsImage: { name: downloadName, title: downloadTitle, show: download } }
        },
        legend: { show: legend, bottom: "0rem", symbol: null } as LegendComponentOption & { symbol: null },
        tooltip: {
            trigger: 'item',
            axisPointer: { type: 'shadow' },
            formatter: (item) => tooltipFormatter(item as ChartTooltipItem)
        },
        xAxis: xAxis(),
        yAxis: yAxis(),
        grid: grid(),
        series: serie()
    }

    const style = () => {
        const style: React.CSSProperties = { height: height }
        if (paddingBottom) style.paddingBottom = paddingBottom
        return style
    }

    return <ReactECharts className={'charts-complete-' + complete} option={option} style={style()} />
}
