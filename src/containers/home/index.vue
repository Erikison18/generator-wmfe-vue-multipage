/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-08 21:31:55
* @Description: 首页入口组件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-11-02 09:45:50
*/

 
<template>
  <div class="healthmobile-home">
    <p class="refreshContainer">
      <i></i><span class="refreshText"></span>
    </p>
    <!-- 首页顶部模块 -->
    <div class="topContailer" @click="handleToOutdoor">
      <template v-if="weatherData">
      <div class="top">
        <div class="left">
          <i class="addIcon"></i>{{weatherData.cityName}}
          {{weatherData.districtName}}
        </div>
        <div class="right">
          {{weatherData.rtcTime}}
          {{weatherData.weekend}}
          {{weatherData.minTem}}~{{weatherData.maxTem}}℃
        </div>
      </div>
      <div class="content">
        <div class="left">
          <div class="infoOne">
            <img :src="weatherIcon" alt=""/>
            <span class="tem">{{weatherData.tem}}℃</span>
            <span>{{weatherData.weather}}</span>
          </div>
          <div class="infoTwo">
            <i class="windIcon"></i>{{weatherData.windPower}}级
            <i class="waterIcon"></i>{{weatherData.hum}}%
            <i class="pressureIcon"></i>{{weatherData.pressure}}hPa           
          </div>
          <div class="infoThree">
            <span>| 出行建议</span>
            <img 
              :src="'static/images/airQuality/'+i+'-white.png'" v-for='i in adviceIcons'  alt="" :key="i">
          </div>
        </div>
        <div class="right">
          <canvas id="chart" width="110" height="110"></canvas>
          <div class="value">{{aqi}}</div>
          <div class="type">AQI</div>
          <div class="scale">
            <img :src="'static/images/leaf/level'+aqilevel+'.png'" v-if="aqilevel" />{{levelText}}
          </div>
        </div>
      </div>
      </template>
    </div>
    
    <!-- 我收藏的设备(有收藏显示，没有隐藏) -->
     <EquipmentList :title="'我收藏的设备'" 
      v-if="allCollection.length != 0"
      :allCollection="allCollection"
      :levelDetials="levelDetials"
      :domainId="domainId"
      :openId="openId"
      :className="'my-collection'"
      v-model="iscollect"
      :type="0"/>
      
      <EquipmentList
        v-for="(item, index) in myEquipments"
        :key="index"
        :title="item.moInfo.capation"  
        :allCollection="item.data"
        :domainId="domainId"
        :openId="openId"
        :levelDetials="levelDetials"
        :type="1"
        :moId="String(item.moInfo.id)"
        v-model="iscollect"
        :className="`my-eq${index}`" />  
    <!-- 扫描添加设备模块 -->
    <div class="scaContailer" v-if="myEquipments.length == 0">
      <div class="title">
        <div class="left">扫描添加设备</div>
      </div>
      <!-- 扫描添加设备 -->
      <AddDevice />
    </div>
    <!-- 设备介绍咨询模块 -->
    <div class="conContailer">
      <div class="title">
        <div class="left">设备介绍咨询</div>
      </div>
      <div class="content">
        <i class="devIcon"></i>
        <div class="text">
          <div class="item1">守护您的每一寸呼吸</div>
          <div class="item2">AItect· 健康空气管家</div>
          <div class="button"  @click="handleProductIntroduce">产品介绍</div>
           <a class="wholeServiceIcon" href="tel:01080698942"></a>
        </div>
      </div>
    </div>
    <Scan id="scanQRCode" @click="handleGoToScan" /> 
  </div>
</template>

<script>
import "./index.scss";
import { fetch } from "@/util/request";
import { renderWatherIcon, getQueryString, pullDownRefresh } from "@/util/util";
import { AddDevice } from "@/components/common";
import Scan from './scan/index.vue'
import EquipmentList from "./equipmentList.vue";
import { isEmpty } from 'lodash'
import { ArcChart } from '@/charts/index.js'
export default {
  data() {
    return {
      weatherData: {},
      weatherIcon: "",
      adviceIcons: [],
      levelText: "",
      aqi: "",
      aqilevel: "",
      show: false,
      iscollect: {
        id: '', 
        state: false
      },
      sortField: "hcho", // 排序字段默认甲醛
      domainId: "110100",
      openId: "oVyrm5WWtQpUVP5WFhPeAEQ5j_y0",//'oVyrm5ZsBuX6mIGnfTO1EVlBpaKQ'
      showLoading: false,
      myCollection: [],
      allCollection: [], // 所有我的收藏
      myEquipments: [],
      levelDetials: {
        pm25: 0,
        tvoc: 0,
        co2: 0,
        hcho: 0
      },
      timer:null
    };
  },
  mounted() {
    // 调用获取地址栏参数
    this.getUrlParams();
    // 获取天气预报
    this.requestWeather();
    // 查询室外空气质量
    this.requestOutDoor();
    // 查询所有污染物分级标准
    this.requestAllLevelDetials();
    //下拉刷新
    pullDownRefresh(
      [this.requestWeather, 
       this.requestOutDoor, 
       this.requestMyCollectAll,
       this.requestMyEquipment])

    this.requestGetRefresh();
  },
  destroyed(){
    clearInterval(this.timer);
  },
  components: {
    AddDevice,
    Scan,
    EquipmentList
  },
  methods: {
    isEmpty: isEmpty,
    // 获取地址栏参数
    getUrlParams() {
      let searchUrl = window.location.search;
      // 该判断是为了开发直接进页面联调
      if (searchUrl.indexOf("?") === -1) {
        return;
      }
      this.domainId = getQueryString("domainId");
      this.openId = getQueryString("openId");
    },
    /*
    * 读取定位点天气信息
    */
    requestWeather() {
      fetch("fetchCurrentWeather", { domainId: this.domainId }, data => {
        this.weatherData = data;
        this.weatherIcon =
          "static/images/weather/" + renderWatherIcon(data.weather) + ".png";
      });
    },

    //获取刷新标志
    requestGetRefresh(){
      let self=this;
      self.timer=setInterval(()=>{
        fetch('fetchGetRefresh', { openId:self.openId }, data => {
          if(data==1){
            self.requestWeather();
            self.requestOutDoor();
            // 我的收藏(所有，滑动数据)
            self.requestMyCollectAll();
            // 查询我的设备
            self.requestMyEquipment();
          }
        })
      },1000*3);
    },

    // 获取所有我的收藏
    requestMyCollectAll() {
      fetch("fetchGetMyCollectAll", { openId: this.openId }, data => {
        if (!data) {
          return (this.allCollection = []);
        }
        this.allCollection = data;
      });
    },
    // 我的设备（空间）
    requestMyEquipment() {
      fetch("fetchGetMyEq", { openId: this.openId }, data => {
        if (!data) {
          return (this.myEquipments = []);
        }
        this.myEquipments = data;
      });
    },
    
    // 查询所有污染物分级标准
    requestAllLevelDetials() {
      fetch("fetchAllLevelDetials", data => {
        for (let item in this.levelDetials) {
          let levels = data[`${item}Levels`];
          this.levelDetials[item] = levels[4].levelMinValue;
        }
      });
    },
    
    /*
    * 读取出行建议
    */
    requestOutDoor() {
      let self = this;
      let option = {
        //配置数据集
        canvasWidth: 110, //cnavas宽度
        canvasHeight: 110, //canvas高度
        p: {
          //绘图圆心
          x: 55,
          y: 55
        },
        r: 50, //绘图半径
        fsAngle: 0,//125, //默认圆起始点角度
        feAngle: 290,//55 + 360, //默认圆结束点角度
        fColor: "rgb(241,240,246)", //默认圆颜色
        tsAngle: 0, //动圆起始点角度
        teAngle: 0, //动圆结束点角度
        tColor: ['#77E750', '#FFDF02', '#F67825', '#F93148', '#99004C', '#690000'],//动圆颜色
        lineWidth: 5, //圆线条宽度
        lineCap: "round", //圆线条末端样式(butt:平直,round:圆,square:正方形)
        maxValue: 500, //最大值
        value: 0, //值
        aqilevel:1 //aqi等级
      };
      fetch("fetchOutDoorAqi", { domainId: self.domainId }, data => {
        self.adviceIcon(data.data.aqiLevel);
        self.aqi = data.data.aqi;
        self.aqilevel = data.data.aqiLevel;
        option.value = data.data.aqi;
        option.aqilevel = data.data.aqiLevel;
        ArcChart('#chart',option);
      });
    },
    handleGoToScan() {
      wx.miniProgram.navigateTo({
        url: "/pages/scan/scan"
      });
    },
    /*
    * 点击室外模块跳转 
    */
    handleToOutdoor() {
      // window.location.href = "outdoor.html?domainId=" + this.domainId;
      wx.miniProgram.navigateTo({
        url: `/pages/weather/outdoor/outdoor`
      })
    },
    /*
     *点击产品介绍 
     */
    handleProductIntroduce() {
      // window.location.href = "productIntroduce.html;
      wx.miniProgram.switchTab({url:'/pages/about/introduce/introduce'})
    },

    /*
    * 出行建议图标过滤
    */
    adviceIcon(level) {
      switch (level) {
        case 6: // 严重污染
          this.adviceIcons = ["kz", "jh"]; // 带口罩、开启净化器
          this.levelText = "严重";
          break;
        case 5: // 重度污染
          this.adviceIcons = ["kz", "jh"]; // 带口罩、开启净化器
          this.levelText = "重度";
          break;
        case 4: // 中度污染
          this.adviceIcons = ["kz", "cx", "jh"]; // 带口罩、减少外出、开启净化器
          this.levelText = "中度";
          break;
        case 3: // 轻度污染
          this.adviceIcons = ["kz", "cx", "kc", "jh"]; // 带口罩、减少外出、减少开窗、开启净化器
          this.levelText = "轻度";
          break;
        case 2: // 良
          this.adviceIcons = ["zc", "kc"]; // 适宜外出、 适宜开窗
          this.levelText = "良";
          break;
        case 1: // 优
          this.adviceIcons = ["zc", "kc"]; // 适宜外出、 适宜开窗
          this.levelText = "优";
          break;
        default:
          break;
      }
    },
    
  },
  watch: {
    // 监听分级标准(获取分级标准的数据后才能计算污染的进度)
    levelDetials: {
      handler() {
        // 我的收藏(所有，滑动数据)
        this.requestMyCollectAll();
        // 查询我的设备
        this.requestMyEquipment();
      },
      deep: true
    },
    // 设备收藏状态
    iscollect: function() {
      this.requestMyCollectAll(); // 全部收藏
      // 重新查询我的设备（空间）
      this.requestMyEquipment()
    }
  }
};
</script>


 



