/*
* @Author: zhanghongqiao
* @Date: 2018-10-18 13:27:32
* @Email: 991034150@qq.com
* @Description: 扫一扫
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-10-25 17:28:42
*/

<style lang="scss">
  .scan-icon {
    background: url("./images/icon.png") no-repeat;
    background-size: 100% 100%;
    width: 56px;
    height: 56px;
    position: fixed;
    right: 8px;
    bottom: 8px;
    z-index: 999;
  }
</style>


<template>
  <div @click="goScan(1)" class="scan-icon"></div>
</template>
<script>
  import {fetch} from "@/util/request";
  import { goScan } from "@/util/util"

  export default {
    mounted() {
      fetch("fetchWechatAuth", {currentUrl: location.href.split('#')[0]}, data => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名
          jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
        });
      });
    },
    methods: {
      goScan: goScan,
    },
  }
</script>
