/*
 * @Author: zhanghongqiao 
 * @Date: 2018-06-04 19:41:01 
 * @Email: 991034150@qq.com 
 * @Description: 入口文件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-05 16:35:53
 */

import Vue from 'vue'
import App from './home.vue'
import '@/assets/styles/index.scss'
 
// 渲染前处理(引入所有API)
import preLoader from '@/util/loader/loader'
import mockAPI from '@/api/mockIndex'
import '@/../static/styles/swiper.min.css';
import { Message } from 'element-ui';
Vue.prototype.$message = Message;
// ========================================================
// Mock & Config Setup
// 渲染前设置配置项和mock API，config为子模块配置项
// ========================================================
preLoader.load({
  config: {},
  apis: mockAPI
})
 
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

// ================= 启用热加载=============
if(module.hot) {
  module.hot.accept()
}