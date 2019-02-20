/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 11:22:20
 * @Email: 991034150@qq.com
 * @Description: 所有mock 出口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-05 16:27:23
 */
 
import * as homeMock from './home'
import * as commonMock from './common'
 
export default {
  ...commonMock,
  ...homeMock,
}
