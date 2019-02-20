/*
 * @Author: zhanghongqiao 
 * @Date: 2018-10-18 18:47:31 
 * @Email: 991034150@qq.com 
 * @Description: 我的设备
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-10-22 17:48:41
 */
 
export default {
  url: '/appletHome/getHomeMyEq/:openId',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":"",
    "result|2":[
      {
        "data|3":[
          {
            "tvoc":"0.224",
            "iaqi":"102",
            "tvocLevel":"1",
            "temDesc":"舒适",
            "co2":"937",
            "co2Level":"4",
            "isCollect":1,
            "equipmentId":"F009FA0126",
            "hchoLevel":"3",
            "hcho":"0.04",
            "iaqiDesc":"适宜",
            "pm25Level":"1",
            "pm25":"2",
            "stationName":"西侧办公区B",
            "iaqiLevel":"4",
            "humDesc":"舒适",
            "stationId":"19006"
          }
        ],
        "moInfo":{
          "address":null,
          "capation":"办公区",
          "domainId":null,
          "id":101210,
          "moType":"1502",
          "orderBy":null,
          "parentId":1012,
          "projectId":null
        }
      }
    ]
  }
}