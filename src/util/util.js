/*
 * @Author: zhanghongqiao@hiynn.com
 * @Date: 2018-04-18 11:05:26
 * @Description: 共用方法
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-10-28 16:58:05
 */

/**
 *  获取某个范围的随机数
 *  @param    {number}  min 最大值
 *  @param    {number}  max 最小值
 *  @return   {object}  null
 */
export const randomNumber = (min, max) => {
  let range = max - min
  let rand = Math.random()
  let num = min + Math.round(rand * range)
  return num
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
  const {length} = list
  let index = 0
  let value
  while (++index < length) {
    value = list[index]
    if (f(value, index, list)) {
      return value
    }
  }
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
  return val && typeof val.then === 'function'
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

/**
 * 重置字体大小
 */
export function resetSize(uiw = 375) {
  let docEl = document.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth >= 768) {
      docEl.style.fontSize = 100 * (768 / uiw) + 'px';
    } else {
      docEl.style.fontSize = 100 * (clientWidth / uiw) + 'px';
    }
    // docEl.style.fontSize = 100 * (clientWidth / baseWidth) + 'px';
  }
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
  recalc()
  window.addEventListener('resize', function () {
    recalc()
  })
}

/**
 * 设置Cookie
 * @param {string} key
 * @param {*} val
 * @param {*} path
 */
export function setCookie(key, val, path) {
  if (!path) path = "/";
  document.cookie = key + "=" + val + "; expires=Session; path=" + path;  //设置cookie
  // var Days = 30;
  // var exp = new Date();
  // exp.setTime(exp.getTime() + Days*24*60*60*1000);
  // document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}


/**
 * 获取Cookie
 * @param {string} key 获取 Cookie
 */
export function getCookie(key) {
  /*获取cookie参数*/
  let getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
  let arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
  let tips;  //声明变量tips
  for (let i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
    let arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
    if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
      tips = arr[1];   //将cookie的值赋给变量tips
      break;   //终止for循环遍历
    }
  }
  return tips;
}


/**
 *
 * 清空cookie
 * @export
 * @param {string} name
 */
export function clearCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 20);
  var cval = getCookie(name);
  if (cval != null) {
    console.log("=0" + cval + ";expires=" + exp.toGMTString())
    document.cookie = name + "=0" + cval + ";expires=" + exp.toGMTString();
  }


}

/**
 * 获取地址栏参数
 * @param {string} name
 */
export function getUrlParms(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}

/**
 * 污染源类型判断
 * @param type 污染源
 * @returns {string} 污染源
 */
export function pollutantFormat(type) {
  if (!type) {
    return ''
  }
  type = type.toUpperCase()
  switch (type) {
    case 'PM25':
      return 'PM<sub>2.5</sub>'
    case 'PM10':
      return 'PM<sub>10</sub>'
    case 'O3':
      return 'O<sub>3</sub>'
    case 'SO2':
      return 'SO<sub>2</sub>'
    case 'NO2':
      return 'NO<sub>2</sub>'
    case 'AQI2':
      return 'AQI<sub>2</sub>'
    case 'CO2':
      return 'CO<sub>2</sub>'
    case 'IAQI':
      return 'I·AQI'
    case "HCHO":
      return "甲醛"
    case "HUMIDITY":
      return "湿度"
    case "TEMPERATURE":
      return "温度"
    default:
      return type
  }
}


/**湿度颜色 */
export function temlevelColor(level) {
  switch (level) {
    case "潮湿":
      return "level1";
    case "舒适":
      return "level2";
    case "干燥":
      return "level3";
    case "加载中":
      return "off-line-color"
  }
}

/**温度颜色 */
export function humlevelColor(level) {
  switch (level) {
    case "偏冷":
      return "level1";
    case "舒适":
      return "level2";
    case "偏热":
      return "level3";
    case "加载中":
      return "off-line-color"
  }
}

/** 室内舒适室的颜色*/
export function indoorLevelColor(level) {
  switch (Number(level)) {
    case 4:
      return "inlevel4";
    case 3:
      return "inlevel3";
    case 2:
      return "inlevel2";
    case 1:
      return "inlevel1";
    case 0:
      return "inlevel0";
    case -1:
      return "inlevel5";
    case -2:
      return "inlevel6";
    case -3:
      return "inlevel7";
    case -4:
      return "inlevel8";
    case -100:
      return "off-line-color"
  }
}

export function renderWatherIcon(weather) {
  switch (weather) {
    case '中到大雨':
      return 'mh-rain' // mh = Moderate-heavy
    case '中到大雪':
      return 'mh-snow'
    case '中雨':
      return 'm-rain'
    case '中雪':
      return 'm-snow'
    case '冻雨':
      return 'freeze-rain'
    case '多云':
      return 'cloud'
    case '大到暴雨':
      return 'h-rainstorm'
    case '大到暴雪':
      return 'h-blizzard'
    case '大暴雨':
      return 'bRainstorm'
    case '大雨':
      return 'h-rain'
    case '大雪':
      return 'h-snow'
    case '小到中雨':
      return 'l-mRain'
    case '小到中雪':
      return 'l-mSnow'
    case '小雨':
      return 'lRain'    //  // l = Light Rain
    case '小雪':
      return 'lSnow'
    case '扬沙':
      return 'blowing-sand'
    case '晴':
      return 'sun'
    case '暴雨':
      return 'rainstorm'
    case '暴雪':
      return 'blizzard'
    case '沙尘暴':
      return 'sand-storm'
    case '浮尘':
      return 'floating-dust'
    case '特大暴雨':
      return 'hh-rainstorm'
    case '阴':
      return 'overcast'
    case '阵雨':
      return 'shower'
    case '阵雪':
      return 'snow-shower'
    case '雨夹雪':
      return 'rain-snow'
    case '雷阵雨':
      return 'thunder-shower'
    case '雾':
      return 'fog'
    case '霾':
      return 'haze'
    case '冰雹':
      return 'hail'
    case '龙卷风':
      return 'tornado'
    default:
      return 'cloud'
  }
}

export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * 计算iaqi的值
 * @param {object} data iaqi的值
 */
export function formatIaqiData(data) {
  let iaqiMax = 300
  let value = data.iaqi;
  // 球球填充占比计算(球球占满是1，加0.1是为了太高占得太满，太低看不到)
  let iaqi = value / iaqiMax + 0.1;
  // --判断为离线处理
  let level = value === "--" ? 6 : data.iaqiLevel;
  // 1,2完美、舒适反填充
  if (level === 1 || level === 2) {
    iaqi = 1 - iaqi;
  }
  return {
    value: value === "--" ? "?" : Number(value), // 球内显示的值
    // 画水波纹及颜色的数据
    chartData: value == "--" ? 0.4 : iaqi,
    // chartData: {
    //   value: value === "--" ? [[0.4, 0.4]] : [[iaqi, iaqi - 0.05]],
    //   level: level
    // },
    level: level,
    // 描述
    describe: value === "--" ? "加载中" : data.iaqiDesc
  }
}

export const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }

    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {
  },
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};

//跳到扫一扫界面
export function goScan(type) {
  console.log(type)
  wx.scanQRCode({
    needResult: 1,
    success(res) {
      if (res.resultStr) {
        wx.miniProgram.navigateTo({
          url: `/pages/scan/result/result?res=${res.resultStr}&preType=${type}`
        })
      }
    },
    fail(res) {
    }
  })
}

/**
 * 下拉刷新
 * @param {Function} callback 将值初始化的方法
 * @param {Array} item 需要重新加载的数据
 */
export function pullDownRefresh(item, callback) {

  let element = document.querySelector('.app-container'),
    refreshContainer = document.querySelector('.refreshContainer'),
    refreshText = document.querySelector('.refreshText'),
    startPos = 0,
    transitionHeight = 0,
    istrue = false;
  element.addEventListener('touchstart', function (e) {
    startPos = e.touches[0].clientY;
    window.pageYOffset == 0 ? istrue = true : istrue = false;
    element.style.position = 'relative';
    element.style.top = '0px';
    element.style.transition = 'top 0s';
    refreshContainer.style.opacity = 0;
    refreshContainer.style.transition = 'opacity 0s';
  }, false);

  element.addEventListener('touchmove', function (e) {
    if (istrue) {
      transitionHeight = e.touches[0].pageY - startPos;
      if (transitionHeight > 0) {
        e.preventDefault();
      }
      refreshText.innerText = '下拉刷新';
      transitionHeight >= 55 ? transitionHeight = 55 : '';
      element.style.top = transitionHeight + 'px';
      refreshContainer.style.opacity = transitionHeight / 10 * 0.2;
      if (transitionHeight >= 50) {
        refreshText.innerText = '释放更新';
      }
    }
  }, false);

  element.addEventListener('touchend', function (e) {
    let top = e.changedTouches[0].clientY - startPos;
    element.style.transition = 'top .5s ease .5s';
    element.style.top = '0px';
    refreshContainer.style.transition = 'opacity .5s ease .5s';
    refreshContainer.style.opacity = 0;
    if (istrue) {
      istrue = false;
      if (top >= 50) {
        if (callback) {
          callback()
        }
        refreshText.innerText = '更新中...';
        item.map(request => {
          request()
        })
      }
    }
  }, false);
}