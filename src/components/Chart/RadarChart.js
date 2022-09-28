import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function BarChart({
    title = "",   
    height = "18.75rem",
    paddingBottom = null,
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
    tooltipFormatter,    
    indicator
}) { 

    const option = {
        title: { text: title },
        tooltip: { trigger: 'axis' },
        toolbox: {
            feature: { saveAsImage: { name: downloadName, title: downloadTitle, show: download } }
        },
        legend: { bottom: 2 },
        radar: {
            indicator: indicator(),
            radius: 90,
            center: ["50%", "50%"]
        },
        series: [
            {
                type: 'radar',
                tooltip: {
                    trigger: 'item',
                    formatter: item => tooltipFormatter(item),
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
        let style = { height: height }
        if (paddingBottom) style.paddingBottom = paddingBottom
        return style
    }

    return <ReactECharts className={'charts-complete-' + complete} option={option} style={style()} />
}