<style lang="scss" >
@import "~@/assets/styles/constant/index.scss";
.wave-ball {
  position: relative;
  color: $fc2;
  margin: 0 auto;
  width: 140px;
  margin-top: 38px;
  height: 140px;
  .value {
    position: absolute;
    z-index: 99;
    top: 28px;
    font-size: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
  }
  .value.aqi-chart-value {
    top: -20px;
  }
  .describe,
  .name {
    position: absolute;
    width: 100%;
    bottom: 22px;
    font-size: 14px;
    z-index: 99;
    text-align: center;
  }
  .name {
    bottom: 54px;
  }
  .chart {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
.ball-contailer{
  width: 100%;
  height: 100%;
  .ball{
    width:100%;
    height:100%;
    border:4px solid;
    border-radius:50%;
    overflow:hidden;
    position:relative;
    i{
      width:1300px;
      height:300px;
      display:block;
      position:absolute;
      bottom: -2px;
    }
    // 完美
    .level1,
    .level2,
    .level3,
    .level4,
    .level5{
      animation: movesine 80s linear infinite;
      &::after {
        top: -6px; /*no*/
      }
    }
    .level1,  
    .level1-1,
    .level2,  
    .level2-1,
    .level3,  
    .level3-1,
    .level4,  
    .level4-1,
    .level5,  
    .level5-1{
      &::after {
        height: 8px;
        width: 100%;
        content: "";
        position:absolute;
        left: 0;
      }
    }
    .level1-1,
    .level2-1,
    .level3-1,
    .level4-1,
    .level5-1{
      animation: movesine1 100s linear infinite;
      &::after {
        top: -6px; /*no*/
        opacity: 0.5;
      }
    }
    .level1,  
    .level1-1{
     background-image: linear-gradient(180deg, #a9f382 0%, #78e651 100%);
      &::after {
        background:url(./images/level1.png) left top repeat-x;
      }
    }
    
    .level2,  
    .level2-1{
     background-image: linear-gradient(180deg, #dcf14e 0%, #c3e632 100%);
      &::after {
        background:url(./images/level2.png) left top repeat-x;
      }
    }
    .level3,  
    .level3-1{
      background-image: linear-gradient(180deg, #fff005 0%, #fee002 100%);
      &::after {
        background:url(./images/level3.png) left top repeat-x;
      }
    }
    .level4,  
    .level4-1{
      background-image: linear-gradient(180deg, #fbad4a 0%, #f67d29 100%);
      &::after {
        background:url(./images/level4.png) left top repeat-x;
      }
    }
    .level5,  
    .level5-1{
      background-image: linear-gradient(180deg, #fc5c7b 0%, #f9354d 100%);
      &::after {
        background:url(./images/level5.png) left top repeat-x;
      }
    }
    .def{
      background: #a5aab2;
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      top: 60%;
    }
  }
}
@keyframes movesine {
  0% {
    left:-20px;
  }
  50% {
    left:-1000px;
  }
  100% {
    left:-20px;
  }
}

@keyframes movesine1 {
  0% {
    left:-1000px;
  }
  50% {
    left:-20px;
  }
  100% {
    left:-1000px;
  }
}
</style>

<template>
  <div class="wave-ball">
    <template v-if="!isEmpty(sourceData)">
      <!-- 动态加载 -->
      <div class="value" 
        v-show="String(sourceData.value).indexOf('.') == -1 && sourceData.value > 1" :class="`${chartclass}-value`"></div>
      <!-- 小于1的无法滚动 -->

      <div class="value" 
        v-show="String(sourceData.value).indexOf('.') !== -1">{{sourceData.value}}</div>
      <!-- 离线 -->
      <div class="value off-line"  
        v-show="sourceData.value === '?' || sourceData.value === 0">
        {{sourceData.value}}
      </div>
      <div class="name">I·AQI</div>
      <div class="describe">{{sourceData.describe}}</div>
      <div class="chart" :class="chartclass">
        <!-- <WaveCharts :selector="`.${chartclass}`" 
          
          :option="option" 
          :sourceData="sourceData.chartData" /> -->
        <div class="ball-contailer">
          <div class="ball" :style="{ 'borderColor':borderColor }">
            <i :class="'level'+level+'-1'" 
               :style="{ 'height': `${height}rem`}"
               v-if="!def">
            </i>
            <i :class="'level'+level" 
               :style="{ 'height': `${height}rem`}"
               v-if="!def">
            </i>
            <span class="def" v-if="def"></span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import { WaveCharts } from "@/charts/index.js";
import DigitRoll from "@/assets/plugins/digitroll.js";
import { isEmpty } from "lodash";
export default {
  data() {
    return {
      level:1,//aqi等级
      height: 0.4,
      imgH: 9, // 图片高度
      borderColor:"#fff",//边框颜色
      def:false,//默认样式
    };
  },
  components: {
    // WaveCharts
  },
  props: {
    chartclass: String,
    selector: String,
    sourceData: Object,
    option: Object
  },
  mounted() {
    this.setRoll();  
    this.drawSine(this.sourceData);
  },
  methods: {
    isEmpty: isEmpty,
    setRoll() {
      this.$nextTick(() => {
        if(!this.sourceData.value) {
          return
        }
        let dRoll = new DigitRoll({
          container: `.${this.chartclass}-value`
        });
        dRoll.roll(this.sourceData.value);
      });
    },
    drawSine(data){
      this.level = data.level;
      this.height = (data.chartData * 100 - this.imgH ) / 100
      if(typeof data.value=='number'){
        this.def=false;
      }else{
        this.def=true;
      }
    }
  },
  watch: {
    sourceData: function(a) {
      this.setRoll();
      this.drawSine(a);
    }
  }
};
</script>

