/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:51:36 
 * @Description: 设备详情统计图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-02 11:40:21
 */

import {merge} from "lodash"
import {pollutantFormat} from "@/util/util.js"
 
export default {
  template: '<div></div>',
  data() {
    return {
      // 默认配置项
      lineColor: ['#7be55a', '#FFDF02', '#F93148'],
      lineName: ['一级标准', '二级标准', '三极标准'],
      defaultSetting: {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: 40,
          right: 10,
          top: 20,
          bottom: 40
        },
        xAxis: { 
          type: 'category',
          axisLabel: {
            color: '#232323',
            rotate: 45,
            fontSize: 10,
            interval : 0,
            showMinLabel: true,
						showMaxLabel: true,
            formatter: function (value, index) {
              return value.slice(11, 16)
            },
          },
          // 刻度
          axisTick: { 
            show: false,
						alignWithLabel: true,
						lineStyle: {
							color: '#bbbbbb'
						}
          },
          // 轴线
          axisLine: {
            show: true,
            lineStyle: {
              color: '#eee',
            }
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#232323',
            fontSize: 12,
          }
        },
        series: [{
          data: [],
          type: 'line',
          name: '数据',
          showSymbol: false,
          smooth: true,
          symbolSize: 6,
          symbol: 'image://http://'+window.location.host+'/static/images/symbol.png',
            // symbol: 'rect',
          itemStyle: {
            normal: {
              color: "#fff"
            },
          },
          areaStyle: {
            normal: {}
          },
          lineStyle: {
            width: 1,
          },
        }
        ]
      }
    }
  },
  props: {
    selector: String,
    sourceData: Object,
    option: Object, // 配置项
    pollution: String, // 污染物
    timeType: Number,
    isshowsm: Boolean,
  },
  mounted() {
    this.options = merge({}, this.defaultSetting, this.option)
    // 初始化图表
    this.myChart = echarts.init(document.querySelector(this.selector))
    this.initChart()
    // console.log('http://'+window.location.host+'/static/images/symbol.png')
  },
  methods: {
    /*
    * 初始化图表
    */
    initChart() {
       
      if (_.isEmpty(this.sourceData)) {
        return this.myChart.clear()
      }
      let data = this.sourceData.data
      let option = this.options
      let maxData = []
      let yData = data[0][this.pollution]
      let levelSeries = this.renderLevelline(yData) // 1，2，3级数据
      let levesData = []
      let level1Data = levelSeries[0][0]
      let level2Data = levelSeries[0][1]
      let level3Data = levelSeries[0][2]
      // level等级数据
      let level_1 = levelSeries[1][0]
      let level_2 = levelSeries[1][1]
      let level_3 = levelSeries[1][2]
      // 获取最大值
      let max_y = this.sourceData.grade[`${this.pollution}Level`][`${this.pollution}Level_max`]
      for (let i = 0; i < data.length; i++) {
        maxData.push(max_y)
      }
      let max = Math.max(...yData)
     
      let fillColor = new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: '#7be55a' // 绿
      }, {
        offset: 0,
        color: '#7be55a' // 绿
      }])
      // 24小时数据最大值大于该污染物的一极标准，小于二极标准
      if (max > level_1 && max < level_2) {
        let colorsArray = [{
          offset: 0,
          color: '#7be55a' // 绿
        }, {
          offset: 1,
          color: '#FFDF02' // 黄
        }]
        fillColor = new echarts.graphic.LinearGradient(0, 1, 0, 0, colorsArray)
        levesData = [level1Data, level2Data]
        yData.push(level_1, level_2)
      }
      // 24小时数据最大值大于该污染物的二极标准，小于等于三极标准
      if (max >= level_2 && max < level_3) {
        let colorsArray = [{
          offset: 0,
          color: '#7be55a' // 绿
        },{
          offset: level_2 / max,
          color: '#FFDF02' // 黄
        },{
          offset: 1,
          color: '#f93232' // 红
        }]
        fillColor = new echarts.graphic.LinearGradient(0, 1, 0, 0, colorsArray)
        levesData = [level1Data, level2Data, level3Data]
        yData.push(level_1, level_2)
      }
      // 24小时数据最大值大于该污染物的三极标准，小于最大值
      if (max >= level_3 && max < max_y) {
        let colorsArray = [{
          offset: 0,
          color: '#7be55a' // 绿
        }, {
          offset: level_2 / max,
          color: '#FFDF02' // 黄
        }, {
          offset: level_3 / max,
          color: '#f93232' // 红
        }, {
          offset: 1,
          color: '#f93232' // 红
        }]
        fillColor = new echarts.graphic.LinearGradient(0, 1, 0, 0, colorsArray)
        levesData = [level1Data, level2Data, level3Data]
        yData.push(level_1, level_2, level_3)
      }
      // 24小时数据最大值大于该污染物的最大值(为0没有数据，展示3条线)
      if (max > max_y || max === 0) {
        if(max === 0) {
          max = max_y
        }
        console.log(level_2 / max, level_2, max)
        let colorsArray = [{
          offset: 0,
          color: '#7be55a' // 绿
        }, {
          offset: level_2 / max,
          color: '#FFDF02' // 黄
        }, {
          offset: level_3 / max,
          color: '#f93232' // 红
        }, {
          offset: 1,
          color: '#f93232' // 红
        }]
        fillColor = new echarts.graphic.LinearGradient(0, 1, 0, 0, colorsArray)
        levesData = [level1Data, level2Data, level3Data]
        yData.push(level_1, level_2, level_3, max_y, maxData)
      }
      
      option.series[0].areaStyle.normal.color = fillColor // 填充色
      option.series = [option.series[0], ...levesData]
      option.series[0].data = data[0][this.pollution]
      let maxLen = String(Math.max(...yData)).length
      let xAxis = this.sourceData.xaxis
      option.xAxis.data = xAxis
      option.grid.left = maxLen > 5 ? maxLen * 16 : maxLen * 18
      this.formatterTooltip()
      this.formartXAxis()
      this.myChart.clear()
      this.myChart.setOption(option)
      // 监听窗口变化
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },
    formartXAxis() {
      let {options, sourceData, timeType} = this
      let showXaxis = sourceData.showXaxis
      // 今天和年的x轴时间长一些，加长底部显示
      if(timeType === 7) {
        options.grid.bottom = 70
        options.grid.left = 50
      }else {
        options.grid.bottom = 50
        options.grid.left = 40
      }
      // 格式化x轴时间
      options.xAxis.axisLabel.formatter = (value) => { 
        let xvalue = showXaxis.indexOf(value.slice(0, 19))
        if(xvalue !== -1){
          return this.formattimeType(value)
        }
      }
    },
    /**格式化时间类型 */
    formattimeType(time) {
      const { timeType } = this
      // 时间1:昨天,2:今天,3:最近7天,4:最近30天,5:自定义,6:最近3天,7:近一年)
      switch(timeType) {
        case 2:
        return `${time.slice(11, 16)}`
        case 3:
        case 5:
          return  `${time.slice(5, 10).replace('-', '/')}`
        case 4:
          return  `${time.slice(5, 10).replace('-', '/')}`
        case 7:
          // 第一个和最后一个显示到日，中间显示到月
          if(time.indexOf('-01') !== -1) {
            return time.slice(0, 7).replace('-', '/')
          }
          return time.slice(0, 10).replace(/-/g, '/')
        default:
          break;
      }
    },
    /*
     * 渲染标准线
     */
    renderLevelline() {
      const {lineColor, lineName} = this
      // 标准线
      let levelData = this.sourceData.grade[`${this.pollution}Level`]
      let levelDatas = []
      let series = []
      lineName.map((item, index) => {
        let value = levelData[`${this.pollution}Level_${index + 1}`]
        levelDatas.push(value)
        let values = this.sourceData.xaxis.map(() => value)
        series.push({
          name: item,
          type: 'line',
          showSymbol: false,
          smooth: false,
          lineStyle: {
            type: 'dotted'
          },
          data: values,
          itemStyle: {
            normal: {
              color: lineColor[index]
            },
          },
          emphasis: {
            itemStyle: {
              color: 'none',
              borderColor: 'none'
            }
          }
        })
      })
      return [series, levelDatas]
    },
    /**格式化 Tooltip*/
    formatterTooltip() {
      let {options, pollution} = this
      let xaxis = this.sourceData.xaxis
      options.tooltip.formatter = (params) => {
        let html = '';
        if (params.length > 0) {
          let tooltipDate = xaxis[params[0].dataIndex]
 
          let value = params[0].value;
          html += `<div class='chart-tooltip'>${tooltipDate}<br/>`
          html += `<b style='color:#fff; font-size: 0.12rem'> ●</b><span style='padding-left:5px; margin: 0'>${pollutantFormat(pollution)}：${value}</span>`
          return html += "</div>";
        }
      }
    }
  },
  /*
   * 监听参数变化
   */
  watch: {
    'sourceData': function () {
      this.initChart()
    },
    // 监听污染物变化
    'pollution': function () {
      this.initChart()
    },
    'isshowsm': function () {
      this.myChart.resize()
    }
  }
}


