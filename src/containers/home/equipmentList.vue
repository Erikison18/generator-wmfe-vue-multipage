/*
 * @Author: zhanghongqiao 
 * @Date: 2018-10-18 15:02:12 
 * @Email: 991034150@qq.com 
 * @Description: 设备列表
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-10-31 14:47:19
 */

 <template>
      <div class="devContailer" :class="{fixed: isfixed}">
      <div class="title">
        <div class="left">{{title}}</div>
        <div v-if="allCollection.length > 1" 
            class="right"
            :class="{active:show}" 
            @click="handleShow($event)">对比<i></i></div>
      </div>
      <div class="content" v-if="show" >
        <div class="type">
          <p v-for="item in polluteTypeTabs" 
            :key="item"
            :class="{active: item === ptype}"
            @click="handleClickType(item, $event)">
            <span v-html="pollutantFormat(item)" ></span>
            <i id="arrow" 
              @click.self="handleSort" 
              :class="{up: sort === 'DESC', down: sort === 'ASC'}" ></i>
          </p>
        </div>
        <div class="devList" v-show="item === ptype" 
            v-for="item in polluteTypeTabs" :key="`${item}0`" :id="item">
          <div class="title">
            <span class="index">序号</span>
            <span class="name">设备名称</span>
            <span class="typeName"><b v-html="pollutantFormat(ptype)" />{{units[ptype]}}</span>
          </div>
          <TableList 
            :totalPage="totalPage" 
            v-model="page" 
            :length="length"
            :ptype="ptype"
            :showLoading="showLoading"
            :sourceData="compareData[ptype]"
            v-if="compareData" />
        </div>
      </div>

      <div class="slider" :class="className">
         <!-- 两台设备及以上可滑动 start -->
          <swiper :options="swiperOption" v-if="allCollection.length > 1">
            <swiper-slide
              v-for="(item, index) in allCollection" 
              :class="{sharing: item.shared != 0 || item.selfEq == 1, 
              'no-share': item.shared == 0 && item.selfEq == 0}" 
              :key="index"
              @click="handleGotoDeatils(item, $event)">
              <div class="title" >
                <div class="equipment-icon">
                  <p :class="{lh24: item.selfEq == 0}">
                    <span>{{item.stationName}}</span> 
                    <span v-if="item.selfEq == 1 || type == 1">{{item.equipmentId}}</span>
                  </p>
                </div>
                <!-- 收藏图标 -->
                <CollectIcon 
                  :equipmentId="item.equipmentId"
                  v-model="isCollect"
                  :type="type"
                  :collectState="collectState"
                  :isCollect="item.isCollect == 0 ? false : true" />
              </div>
              <!-- 未共享设备 -->
              <div class="content" v-if="item.shared == 0 && type == 0 && item.selfEq == 0">
                <p>您已无权查看该设备!</p>
                  <div class="add-button" 
                  @click="handleCollection(item.equipmentId, item.isCollect)">取消收藏</div>
              </div>
              <!-- 已共享设备 -->
              <div class="content" v-if="item.shared !== 0 || item.selfEq == 1">
                <div class="left"  v-if="!isEmpty(iaqiData)">
                  <WaveBall 
                    :chartclass="`${className}-aqi-chart-${index}`" 
                    :sourceData="iaqiData[index]"/>
                </div>
                <div class="right">
                  <div class="top">
                    <span class="tempItem"><i></i>{{item.temDesc}}</span>
                    <span class="humItem"><i></i>{{item.humDesc}}</span>
                  </div>
                  <div class="itemList">
                    <div class="item " v-for="(ptype, j) in pollutes[index]" :key="j">
                        <div class="text">
                          <span class="name" v-html="pollutantFormat(ptype.name)" /> 
                          <span class="value">{{ptype.value}}</span>
                        </div>
                        <div class="picBar">
                          <div :style="{width: `${ptype.width}%`, background: ptype.color}"></div>
                        </div>  
                      </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <!-- Add Pagination -->
            <div v-show="allCollection.length > 1" class="swiper-pagination"  slot="pagination"></div>
          </swiper>
          <!-- 两台设备及以上可滑动 end -->
          <!--  一台设备无滑动 start  -->
          <div class="swiper-container" v-if="allCollection.length == 1">
            <div class="swiper-slide"
              v-for="(item, index) in allCollection" 
              :class="{sharing: item.shared != 0 || item.selfEq == 1, 
              'no-share': item.shared == 0 && item.selfEq == 0}" 
              :key="index"
              @click="handleGotoDeatils(item, $event)">
              <div class="title" >
                <div class="equipment-icon">
                  <p :class="{lh24: item.selfEq == 0}">
                    <span>{{item.stationName}}</span> 
                    <span v-if="item.selfEq == 1 || type == 1">{{item.equipmentId}}</span>
                  </p>
                </div>
                <!-- 收藏图标 -->
                <CollectIcon 
                  :equipmentId="item.equipmentId"
                  v-model="isCollect"
                  :type="type"
                  :collectState="collectState"
                  :isCollect="item.isCollect == 0 ? false : true" />
              </div>
              <!-- 未共享设备 -->
              <div class="content" v-if="item.shared == 0 && type == 0 && item.selfEq == 0">
                <p>您已无权查看该设备!</p>
                  <div class="add-button" 
                  @click="handleCollection(item.equipmentId, item.isCollect)">取消收藏</div>
              </div>
              <!-- 已共享设备 -->
              <div class="content" v-if="item.shared !== 0 || item.selfEq == 1">
                <div class="left"  v-if="!isEmpty(iaqiData)">
                  <WaveBall 
                    :chartclass="`${className}-aqi-chart-${index}`" 
                    :sourceData="iaqiData[index]"/>
                </div>
                <div class="right">
                  <div class="top">
                    <span class="tempItem"><i></i>{{item.temDesc}}</span>
                    <span class="humItem"><i></i>{{item.humDesc}}</span>
                  </div>
                  <div class="itemList">
                    <div class="item " v-for="(ptype, j) in pollutes[index]" :key="j">
                        <div class="text">
                          <span class="name" v-html="pollutantFormat(ptype.name)" /> 
                          <span class="value">{{ptype.value}}</span>
                        </div>
                        <div class="picBar">
                          <div :style="{width: `${ptype.width}%`, background: ptype.color}"></div>
                        </div>  
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  一台设备无滑动 end  -->
      </div>
    </div>
 </template>

 <script>
import { inDoorlevelColors } from "@/config/levelColor.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import TableList from "./tableList.vue";
import { fetch } from "@/util/request";
import { isEmpty } from "lodash";
import { pollutantFormat, formatIaqiData } from "@/util/util";
import { WaveBall } from "@/components/common";
import CollectIcon from "./collectIcon.vue";
export default {
  data() {
    let self = this;
    return {
      // title: "我收藏的设备",
      pollute: ["pm25", "hcho", "tvoc", "co2"],
      pollutes: [],
      polluteTypeTabs: ["iaqi", "hcho", "tvoc", "pm25", "co2"],
      show: false,
      ptype: "hcho",
      saveClickPtype: ["hcho"],
      iaqiMax: 300,
      sort: "DESC",
      isclickptype: false,
      totalPage: 0,
      page: 0, // 第几页
      length: 2, // 每页数量
      minW: 3,
      units: {
        pm25: "(μg/m3)", // pm2.5最大值
        tvoc: "(mg/m3)", // tvoc最大值
        hcho: "(mg/m3)", // 甲醛最大值
        co2: "(ppm)" // co2最大值
      },
      touchstartY: "",
      touchendY: "",
      showLoading: true,
      iaqiData: [],
      compareData: {
        iaqi: [],
        hcho: [],
        tvoc: [],
        pm25: [],
        co2: []
      },
      swiper: null,
      collectState: 0,
      isCollect: {
        state: false,
        id: ""
      },
      isfixed: false,
      setTimeout1: null,
      //swiper配置
      swiperOption: {
        loop: false, // 循环
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          click: function(event) {
            let item = self.allCollection[this.realIndex];
            self.handleGotoDeatils(item, event);
          }
        }
      }
    };
  },
  model: {
    event: "change"
  },
  components: {
    WaveBall,
    CollectIcon,
    TableList,
    swiper,
    "swiper-slide": swiperSlide
  },
  props: {
    title: String,
    allCollection: Array, // 收藏数据
    levelDetials: Object,
    className: String,
    domainId: String,
    openId: String,
    type: Number,
    moId: String,
  },
  mounted() {
    this.setIaqiData();
  },
  methods: {
    pollutantFormat: pollutantFormat,
    isEmpty: isEmpty,
    /*
    * 获取我收藏的设备(对比)
    */
    requestMyCollection() {
      let params = {
        openId: this.openId,
        sortField: this.ptype,
        direction: this.sort,
      };
      fetch("fetchGetMyCollection", { ...params }, data => {
        this.setcompareData(data);
      });
    },

    /*
     * 空间下的设备，对比
    */
    requestMyEqCompare() {
      let params = {
        openId: this.openId,
        moId: this.moId,
        sortField: this.ptype,
        direction: this.sort
      };
      fetch("fetchGetMyEqCompare", { ...params }, data => {
        this.setcompareData(data);
      });
    },
    /**设备设备对比的值 */
    setcompareData(data) {
      if (!data) {
        return (this.compareData[this.ptype] = []);
      }
      this.showLoading = false;
      this.compareData[this.ptype] = data.data
      
    },
    getCompareData() {
      // 为0是我的收藏
      if (this.type === 0) {
        this.requestMyCollection();
      } else {
        this.requestMyEqCompare();
      }
    },
    // 取消收藏
    handleCollection(id, iscollect) {
      let collectFlag = !iscollect ? 0 : 1;
      if (this.type === 0) {
        collectFlag = 0;
      }
      let params = {
        openId: this.openId,
        equipmentId: id,
        collectionFlag: collectFlag // 0取消，1收藏
      };
      fetch("fetchCollection", params, data => {
        if(!data) {
          collectFlag === 0
            ? this.messagePopup("取消收藏失败")
            : this.messagePopup("收藏失败");
          return  
        }
        this.collectState = data.erroCode
        if (data.erroCode === 2000) {
          this.messagePopup(data.result);
          this.requestMyCollection();
          this.$emit('change', {id: id, state: collectFlag})
        } else {
          this.messagePopup(data.erroMsg)
        }
      });
    },
    // 到设备详情
    handleGotoDeatils(item, event) {
      // item.shared == 0未共享不可以查看详情
      let shared = item.shared == 0 && item.selfEq == 0
      if (
        event.target.className === "add-button" ||
        shared ||
        event.target.id == "collect"
      ) {
        return;
      }
      
      const { openId, domainId } = this;
      const { equipmentId } = item;
      // let params = `domainId=${domainId}&equipmentId=${equipmentId}&openId=${openId}`;
      // location.href = `indoor.html?${params}`;
      // 跳转到小程序
      wx.miniProgram.navigateTo({
        url: `/pages/weather/indoor/indoor?equipmentId=${equipmentId}`
      });
    },

    // 格式化iaqi数据
    setIaqiData() {
      this.iaqiData = [];
      this.pollutes = [];
      if (isEmpty(this.allCollection)) {
        return;
      }
      this.allCollection.map((item, index) => {
        // 调用计算iaqi的值
        this.iaqiData.push(formatIaqiData(item));
        this.forPMatData(item);
      });
    },
    /*
     * 格式化污染物数据 
     */
    forPMatData(data) {
      let arry = [];
      this.pollute.map(name => {
        let realValue = data[name];
        let value = 0;
        let level = data[`${name}Level`];
        if (level > 5) {
          level = 5;
        }
        const { pm25, tvoc, co2, hcho } = this.levelDetials;
        // 每种污染真实值/最大值
        switch (name) {
          case "pm25":
            value = realValue / pm25;
            break;
          case "tvoc":
            value = realValue / tvoc;
            break;
          case "co2":
            value = realValue / co2;
            break;
          case "hcho":
            value = realValue / hcho;
            break;
          default:
            break;
        }
        let width = value > 0 ? value * 100 : value;
        if (width < this.minW) {
          width = this.minW + width;
        }
        if (value === "--" || isNaN(value)) {
          width = 0;
        }
        if (width > 100) {
          width = 100;
        }
        arry.push({
          name: name,
          width: width,
          value: realValue,
          color: inDoorlevelColors[level - 1]
        });
      });
      this.pollutes.push(arry);
    },
    // 点击排序
    handleSort() {
      this.isclickptype = false;
      this.sort === "ASC" ? (this.sort = "DESC") : (this.sort = "ASC");
    },
    /*
    * 点击类型
    * 激活点击类型，使其改变样式
    * e:event
    */
    handleClickType(type, event) {
      if (event.target.id == "arrow") {
        return;
      }
      this.isclickptype = true;
      this.ptype = type;
      this.sort = "DESC";
    },
    /*
    * 点击对比
    * 展开/收起对应列表
    */
    handleShow(event) {
      let e=window.event || event;
      this.show = !this.show;
     
      if (!this.show) {
        this.isfixed = false;
      } else {
        // 清空上一次的设备
        this.compareData = {
          iaqi: [],
          hcho: [],
          tvoc: [],
          pm25: [],
          co2: []
        }
        // 默认保存当前选中的类型
        this.saveClickPtype = [this.ptype]
        this.getCompareData();
        this.isfixed = true;
      }
    },
    // 排序
    sortNumber(a, b) {
      let num1 = a[this.ptype];
      let num2 = b[this.ptype];
      if (num1 == "--") {
        num1 = 0;
      }
      if (num2 == "--") {
        num2 = 0;
      }
      if (this.sort === "ASC") {
        return num1 - num2;
      } else {
        return num2 - num1;
      }
    },
    /**提示框 */
    messagePopup(text) {
      this.$message({
        message: text,
        duration: 1500, // 0 不关闭弹窗
        center: true,
        type: ""
      });
    }
  },
  watch: {
    allCollection: function() {
      this.setIaqiData();
    },
    sort: function() {
      this.compareData[this.ptype].sort(this.sortNumber);
    },
    ptype: function() {
      let isIndex = this.saveClickPtype.indexOf(this.ptype);
      // 判断是否已经请求过该类型数据
      if (isIndex == -1) {
        this.saveClickPtype.push(this.ptype);
        this.getCompareData();
      }
      // 排序恢复到降序
      this.sort === "DESC"
      this.compareData[this.ptype].sort(this.sortNumber); 
    },
    isCollect: function() {
      const { id, state } = this.isCollect;
      this.handleCollection(id, state);
    }
  }
};
</script>
 