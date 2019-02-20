 
export default {
  url: '/appletHome/getHomeMyEqCompare/:openId/:moId/:sortField/:direction',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":"",
    "result":{
      "data|5":[
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