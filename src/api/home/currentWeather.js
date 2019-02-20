/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-23 15:24:20 
 * @Email: 991034150@qq.com 
 * @Description: 天气信息数据
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-10-19 11:46:02
 */

export default {
  url: '/home/todayWeather/:domainId',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":"",
    "result":{
      "hum":37.0,
      "rainfall":0.0,
      "windPower":"一",
      "wspd":1.1,
      "weekend":"星期四",
      "pressure":1023.0,
      "domainId":110100,
      "minTem":"9",
      "maxTem":"19",
      "weather":"晴",
      "windDirection":"ES",
      "tem":"18",
      "rtcTime":"2018-10-18"
    }
  }
}