const assert = require('node:assert/strict')
const { test } = require('node:test')
const { createRequire } = require('node:module')
const path = require('node:path')
const consumerRequire = createRequire(path.join(process.env.TABLER_TEST_PACKAGE_DIR || path.join(__dirname, '..'), 'package.json'))
const { BarChart, LineChart, PieChart, DoughnutChart, RadarChart } = consumerRequire(process.env.TABLER_TEST_PACKAGE_DIR || './dist/index.js')
const echarts = consumerRequire('echarts')
const colors = ['#3676c8', '#21a48a']
const bounds = (range, edge) => edge === 'min' ? 0 : range.max + 10
const formatter = item => String(item.value)
const charts = [
  ['BarChart', BarChart, { colors, complete: true, series: [[10, 20]], seriesName: ['Peso'], xAxisData: ['A', 'B'], yAxisFormatter: String, yAxisMinMax: bounds, tooltipFormatter: formatter }],
  ['LineChart', LineChart, { lines: [{ name: 'Peso', data: [10, 20], color: colors[0] }], complete: true, xAxisData: ['A', 'B'], selectedOptions: ['Peso'], getLegend: { Peso: true }, yAxisFormatter: String, yAxisMinMax: bounds, tooltipFormatter: items => items.map(formatter).join(', ') }],
  ['PieChart', PieChart, { colors, series: [10, 20], seriesDataName: ['A', 'B'], tooltipFormatter: formatter }],
  ['DoughnutChart', DoughnutChart, { colors, series: [10, 20], seriesDataName: ['A', 'B'], tooltipFormatter: formatter }],
  ['RadarChart', RadarChart, { colors, series: [[60, 70]], seriesDataName: ['Perfil'], indicator: [{ name: 'A', max: 100 }, { name: 'B', max: 100 }], tooltipFormatter: formatter }],
]

for (const [name, Component, props] of charts) test(name + ' genera opciones válidas para ECharts y se representa en SVG', () => {
  // These wrappers are pure functions. Inspect the real ReactECharts boundary,
  // then let the actual engine render it, independently of browser layout.
  const output = Component(props)
  assert.equal(output.props.option.series[0].type, name === 'DoughnutChart' ? 'pie' : name.replace('Chart', '').toLowerCase())
  const instance = echarts.init(null, null, { renderer: 'svg', ssr: true, width: 600, height: 320 })
  try {
    instance.setOption({ ...output.props.option, animation: false })
    const svg = instance.renderToSVGString()
    assert.match(svg, /<svg\b/)
    assert.match(svg, /<path\b/)
    assert.equal(instance.getOption().series.length, output.props.option.series.length)
  } finally { instance.dispose() }
})

test('Las barras conservan las orientaciones, el contrato de stack y las referencias del consumidor', () => {
  const data = [10, 20], categories = ['A', 'B']
  const original = Object.freeze({ min: 2, max: 20 }), calls = []
  const minMax = (range, edge) => { calls.push([range, edge]); return edge === 'min' ? 0 : 30 }
  const common = { colors, series: [data], seriesName: ['Peso'], tooltipFormatter: formatter }
  const horizontal = BarChart({ ...common, type: 'horizontal', yAxisData: categories, xAxisFormatter: value => value + '%', xAxisMinMax: minMax }).props.option
  assert.equal(horizontal.yAxis.type, 'category')
  assert.equal(horizontal.yAxis.data, categories)
  assert.equal(horizontal.series[0].data, data)
  assert.equal(horizontal.xAxis.axisLabel.formatter(10), '10%')
  assert.equal(horizontal.xAxis.min(original), 0)
  assert.equal(horizontal.xAxis.max(original), 30)
  assert.deepEqual(calls, [[original, 'min'], [original, 'max']])
  const stacked = BarChart({ ...common, stack: 'total', series: ['Peso'], seriesName: [data], yAxisFormatter: String, yAxisMinMax: bounds }).props.option
  assert.equal(stacked.series[0].name, 'Peso')
  assert.equal(stacked.series[0].data, data)
  assert.equal(stacked.series[0].stack, 'total')
})

test('Los callbacks de tooltip conservan sus objetos/arrays y la expansión sigue perteneciendo al consumidor', () => {
  const item = { name: 'A', seriesName: 'Peso', value: 20, percent: 50 }, items = [item]
  for (const [name, Component, props] of charts) {
    let received
    const output = Component({ ...props, tooltipFormatter: value => { received = value; return 'Formato local' } })
    const callback = output.props.option.tooltip.formatter || output.props.option.series[0].tooltip.formatter
    assert.equal(callback(name === 'LineChart' ? items : item), 'Formato local')
    assert.equal(received, name === 'LineChart' ? items : item)
  }
  let expands = 0
  const line = LineChart({ ...charts[1][2], onExpand: () => expands++ }).props.option
  line.toolbox.feature.myTool2.onclick()
  assert.equal(expands, 1)
  assert.equal(line.toolbox.feature.myTool2.show, true)
})

test('Los gráficos conservan estilos, descargas y opciones fijadas por cada wrapper', () => {
  for (const [, Component, props] of charts) {
    const output = Component({ ...props, height: '320px', paddingBottom: 12, download: true, downloadName: 'informe', name: 'informe', downloadTitle: 'Descargar', title: 'Descargar' })
    assert.equal(output.props.style.height, '320px')
    assert.equal(output.props.option.toolbox.feature.saveAsImage.show, true)
    assert.equal(output.props.option.toolbox.feature.saveAsImage.name, 'informe')
    if (Component !== LineChart) assert.equal(output.props.style.paddingBottom, 12)
  }
  const doughnut = DoughnutChart({ ...charts[3][2], legendformatter: '{d}%' }).props.option
  assert.equal(doughnut.series[0].label.formatter, '{d}%')
  assert.deepEqual(doughnut.series[0].radius, ['30%', '70%'])
  const pie = PieChart({ ...charts[2][2], center: ['45%', '55%'], legendformatter: 'Ignored' }).props.option
  assert.deepEqual(pie.series[0].center, ['45%', '55%'])
  assert.equal(pie.series[0].label.formatter, undefined)
})
