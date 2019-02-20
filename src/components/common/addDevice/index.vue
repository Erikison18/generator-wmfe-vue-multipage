/*
 * @Author: zhanghongqiao 
 * @Date: 2018-10-17 18:16:59 
 * @Email: 991034150@qq.com 
 * @Description: 扫描添加设备
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-10-18 11:54:48
 */
<style lang="scss">
.add-device {
  width: 100%;
  height: 116px;
  background: #fff;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 8px;
  margin-bottom: 16px;
  padding: 15px 0;
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  display: flex;
  .line {
    border-top: 1px dashed #1a1a1a;
    position: absolute;
    top: 43px;
    width: 223px;
    margin-left: 50%;
    left: -111.5px;
  }
  .item {
    float: left;
    position: relative;
    text-align: center;
    // width: 25%;
    flex: 1;
    div {
      line-height: 16px;
      color: #232323;
    }
  }
  i {
    width: 56px;
    height: 56px;
    display: inline-block;
  }
  .step1Icon {
    background: url(./images/step1_icon.png) no-repeat center center;
    background-size: cover;
  }
  .step2Icon {
    background: url(./images/step2_add.png) no-repeat center center;
    background-size: cover;
  }
  .step3Icon {
    background: url(./images/step3_accomplish.png) no-repeat center center;
    background-size: cover;
  }
  .step4Icon {
    background: url(./images/step4_inspect.png) no-repeat center center;
    background-size: cover;
  }
}
</style>


<template>
  <div class="add-device">
    <span class="line"></span>
    <div class="item" v-for="item in steps" :key="item.icon">
      <i :class="item.icon"></i>
      <div v-for="txt in item.text" :key="txt">{{txt}}</div>
    </div>
     
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [],
      defSteps: [
        {
          icon: 'step1Icon',
          text: ['扫描', '设备二维码']
        },{
          icon: 'step2Icon',
          text: ['添加', '安装信息']
        },{
          icon: 'step3Icon',
          text: ['完成', '设备添加']
        },{
          icon: 'step4Icon',
          text: ['查看', '添加信息']
        }
      ]
    }
  },
  props: {
    dataSource: Array
  },
  mounted() {
    this.steps = this.dataSource || this.defSteps
  }
}
</script>

