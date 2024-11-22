import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function DoughnutChart({
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
    tooltipFormatter
}) {

    const option = {
        title: { text: title },
        tooltip: { trigger: 'item' },
        toolbox: {
            feature: { saveAsImage: { name: downloadName, title: downloadTitle, show: download } }
        },
        legend: { bottom: 2 },
        series: [
            {
                type: 'pie',
                radius: ['30%', '70%'],
                label: {
                    show: true,
                    formatter: '{c}',
                    position: 'inside'
                },
                tooltip: {
                    formatter: (item) => tooltipFormatter(item),
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