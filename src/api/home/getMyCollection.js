/*
 * @Author: zhanghongqiao 
 * @Date: 2018-10-18 14:58:50 
 * @Email: 991034150@qq.com 
 * @Description: 我收藏的设备(对比)
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-10-31 13:31:39
 */
 
export default {
  url: '/appletHome/getHomeMyCollection/:openId/:sortField/:direction',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":"",
    "result":{
      "data|20":[
        {
          "shared":0,
          "hcho":"0.064",
          "level":"4",
          "stationName":"西侧办公区B",
          "equipmentId":"F009FA0126"
        },
        {
          "shared":1,
          "hcho":"--",
          "level":"--",
          "stationName":"王的设备",
          "equipmentId":"F009FA2222"
        }
      ],
      "recordsTotal":2
    }
  }
}