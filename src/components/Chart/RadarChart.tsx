import React from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from "echarts";
import type { RadarChartProps, RadarTooltipItem } from "./types";

export default function RadarChart({
    title = "",   
    height = "18.75rem",
    paddingBottom = null,
    colors,
    complete,   
    //series
    series,
    seriesDataName,
    indicator,
    //download
    downloadName = "Export",
    downloadTitle = "",
    download = false,
    //Methods    
    tooltipFormatter
}: RadarChartProps): React.ReactElement { 

    const option: EChartsOption = {
        title: { text: title },
        tooltip: { trigger: 'axis' },
        toolbox: {
            feature: { saveAsImage: { name: downloadName, title: downloadTitle, show: download } }
        },
        legend: { bottom: 2 },
        radar: {
            indicator: indicator,
            radius: 90,
            center: ["50%", "50%"]
        },
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item',
                    formatter: (item) => tooltipFormatter(item as RadarTooltipItem),
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