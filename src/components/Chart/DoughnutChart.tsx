import React from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption, LegendComponentOption } from "echarts";
import type { DoughnutChartProps, ChartTooltipItem } from "./types";

export default function DoughnutChart({
    title = "",
    height = "18.75rem",
    paddingBottom = null,
    legend = true,
    legendformatter = '{c}',   
    colors,
    complete,
    //series
    series,
    seriesDataName,
    //download
    downloadName = "Export",
    downloadTitle = "",
    download = false,
    //Methods    
    tooltipFormatter
}: DoughnutChartProps): React.ReactElement {

    const option: EChartsOption = {
        title: { text: title },
        tooltip: { trigger: 'item' },
        toolbox: {
            feature: { saveAsImage: { name: downloadName, title: downloadTitle, show: download } }
        },
        legend: { show: legend, bottom: "0rem", symbol: null } as LegendComponentOption & { symbol: null },
        series: [
            {
                type: 'pie',
                radius: ['30%', '70%'],
                label: {
                    show: true,
                    formatter: legendformatter,
                    position: 'inside'
                },
                tooltip: {
                    formatter: (item) => tooltipFormatter(item as ChartTooltipItem),
                },
                data: series?.map((item, i) => {
                    return {
                        name: seriesDataName[i],
                        value: item,
                        itemStyle: { color: colors[i] }
                    }
                })
            }
        ]
    }

    const style = () => {
        const style: React.CSSProperties = { height: height }
        if (paddingBottom) style.paddingBottom = paddingBottom
        return style
    }

    return <ReactECharts className={'charts-complete-' + complete} option={option} style={style()} />
}