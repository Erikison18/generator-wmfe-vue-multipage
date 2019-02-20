/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-23 15:58:04 
 * @Email: 991034150@qq.com 
 * @Description: 室外AQI数据
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-10-16 09:49:30
 */

export default {
  url: '/home/outDoorAqiInfo/:domainId',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":"",
    "result":{
      "data":{
        "pm10Level": 2,
        "o3":23,
        "so2Level":1,
        "pm10": 15,
        "coLevel":1,
        "co":1.0,
        "domainId":110100,
        "no2":42,
        "pm25Level":2,
        "pm25":73,
        "aqiLevel":2,
        "no2Level":1,
        "so2":2,
        "aqi":98,
        "o3Level":1,
        "rtcTime":"2018-10-16 08:00:00"
      },
      "advise":"空气良好，可以正常参加户外活动。",
      "icon":"suitout,window",
      "rain_icon":"",
      "rain_advise":""
    }
  }
}