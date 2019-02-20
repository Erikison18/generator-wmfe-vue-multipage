export default {
  url: '/jsauth/get/refresh',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":"",
    "result|1":[0, 1]//0不刷新 1刷新
  }
}