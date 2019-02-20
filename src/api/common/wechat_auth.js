/*
 * @Author: wangjinnan
 * @Date: 2018-10-18 14:06:05 
 * @Email: 991034150@qq.com 
 * @Description: 微信js sdk安全认证
 * @Last Modified by: wangjinnan
 * @Last Modified time: 2018-10-18 14:07:33
 */

export default {
  url: '/jsauth/wechat',
  enableMock: false, // 是否使用本地假数据
  mock: {
    "erroCode": 2000,
    "erroMsg": null,
    "result": {
      "appId": "fskdfjlasd"
    }
  }
}