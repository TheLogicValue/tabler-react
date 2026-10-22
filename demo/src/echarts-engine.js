// This consumer uses the modular engine for the five chart components exposed
// by Tabler. The published library keeps using the declared echarts-for-react
// dependency, so other consumers can choose their own bundling strategy.
import EChartsReactCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import {
  AriaComponent, GridComponent, LegendComponent, RadarComponent,
  TitleComponent, ToolboxComponent, TooltipComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

echarts.use([
  BarChart, LineChart, PieChart, RadarChart,
  AriaComponent, GridComponent, LegendComponent, RadarComponent,
  TitleComponent, ToolboxComponent, TooltipComponent,
  LabelLayout, UniversalTransition, CanvasRenderer, SVGRenderer,
])

export default class DemoECharts extends EChartsReactCore {
  constructor(props) {
    super(props)
    this.echarts = echarts
  }
}
