import React from 'react'
import ReactECharts from 'echarts-for-react'

export default function PieChart({
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
    tooltipFormatter,
    center = ['50%', '50%'],
}) {

    const option = {
        title: { text: title },
        tooltip: { trigger: 'item' },
        toolbox: {
            feature: {
                saveAsImage: {
                    name: downloadName,
                    title: downloadTitle,
                    show: download
                }
            }
        },
        legend: {
            show: legend,
            bottom: "0rem",
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                label: {
                    show: true
                },
                labelLine: {
                    show: true,
                    length: 20,
                    length2: 10
                },
                center: center,
                tooltip: {
                    formatter: (item) => tooltipFormatter(item),
                },
                data: series?.map((item, i) => ({
                    name: seriesDataName[i],
                    value: item,
                    itemStyle: { color: colors[i] }
                }))
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