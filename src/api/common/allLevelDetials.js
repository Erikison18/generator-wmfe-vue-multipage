/*
 * @Author: zhanghongqiao 
 * @Date: 2018-09-27 11:55:42 
 * @Email: 991034150@qq.com 
 * @Description: 获取所有等级详情
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-09-27 12:05:53
 */

export default {
  url: '/indoor/realtime/getAllLevelDetials',
  // enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode": 2000,
    "erroMsg": "",
    "result": {
      "hchoLevels": [
        {
          "id": 12,
          "level": 1,
          "levelDescribe": "完美",
          "levelMaxValue": 0.01,
          "levelMinValue": 0,
          "pollution": "hcho",
          "type": "0"
        },
        {
          "id": 14,
          "level": 2,
          "levelDescribe": "极好",
          "levelMaxValue": 0.03,
          "levelMinValue": 0.01,
          "pollution": "hcho",
          "type": "0"
        },
        {
          "id": 16,
          "level": 3,
          "levelDescribe": "舒适",
          "levelMaxValue": 0.06,
          "levelMinValue": 0.03,
          "pollution": "hcho",
          "type": "0"
        },
        {
          "id": 18,
          "level": 4,
          "levelDescribe": "适宜",
          "levelMaxValue": 0.1,
          "levelMinValue": 0.06,
          "pollution": "hcho",
          "type": "0"
        },
        {
          "id": 20,
          "level": 5,
          "levelDescribe": "净化",
          "levelMaxValue": 4,
          "levelMinValue": 0.1,
          "pollution": "hcho",
          "type": "0"
        }
      ],
      "tvocLevels": [
        {
          "id": 22,
          "level": 1,
          "levelDescribe": "完美",
          "levelMaxValue": 0.23,
          "levelMinValue": 0,
          "pollution": "tvoc",
          "type": "0"
        },
        {
          "id": 24,
          "level": 2,
          "levelDescribe": "极好",
          "levelMaxValue": 0.35,
          "levelMinValue": 0.23,
          "pollution": "tvoc",
          "type": "0"
        },
        {
          "id": 26,
          "level": 3,
          "levelDescribe": "舒适",
          "levelMaxValue": 0.5,
          "levelMinValue": 0.35,
          "pollution": "tvoc",
          "type": "0"
        },
        {
          "id": 28,
          "level": 4,
          "levelDescribe": "适宜",
          "levelMaxValue": 0.6,
          "levelMinValue": 0.5,
          "pollution": "tvoc",
          "type": "0"
        },
        {
          "id": 30,
          "level": 5,
          "levelDescribe": "净化",
          "levelMaxValue": 10,
          "levelMinValue": 0.6,
          "pollution": "tvoc",
          "type": "0"
        }
      ],
      "co2Levels": [
        {
          "id": 42,
          "level": 1,
          "levelDescribe": "完美",
          "levelMaxValue": 400,
          "levelMinValue": 0,
          "pollution": "co2",
          "type": "0"
        },
        {
          "id": 44,
          "level": 2,
          "levelDescribe": "极好",
          "levelMaxValue": 800,
          "levelMinValue": 400,
          "pollution": "co2",
          "type": "0"
        },
        {
          "id": 46,
          "level": 3,
          "levelDescribe": "舒适",
          "levelMaxValue": 900,
          "levelMinValue": 800,
          "pollution": "co2",
          "type": "0"
        },
        {
          "id": 48,
          "level": 4,
          "levelDescribe": "适宜",
          "levelMaxValue": 1000,
          "levelMinValue": 900,
          "pollution": "co2",
          "type": "0"
        },
        {
          "id": 50,
          "level": 5,
          "levelDescribe": "净化",
          "levelMaxValue": 10000,
          "levelMinValue": 1000,
          "pollution": "co2",
          "type": "0"
        }
      ],
      "iaqiLevels": [
        {
          "id": 2,
          "level": 1,
          "levelDescribe": "完美",
          "levelMaxValue": 30,
          "levelMinValue": 0,
          "pollution": "iaqi",
          "type": "0"
        },
        {
          "id": 4,
          "level": 2,
          "levelDescribe": "极好",
          "levelMaxValue": 60,
          "levelMinValue": 30,
          "pollution": "iaqi",
          "type": "0"
        },
        {
          "id": 6,
          "level": 3,
          "levelDescribe": "舒适",
          "levelMaxValue": 90,
          "levelMinValue": 60,
          "pollution": "iaqi",
          "type": "0"
        },
        {
          "id": 8,
          "level": 4,
          "levelDescribe": "适宜",
          "levelMaxValue": 120,
          "levelMinValue": 90,
          "pollution": "iaqi",
          "type": "0"
        },
        {
          "id": 10,
          "level": 5,
          "levelDescribe": "净化",
          "levelMaxValue": 300,
          "levelMinValue": 120,
          "pollution": "iaqi",
          "type": "0"
        }
      ],
      "humLevels": [
        {
          "id": 1596,
          "level": 1,
          "levelDescribe": "干燥",
          "levelMaxValue": 30,
          "levelMinValue": 0,
          "pollution": "hum",
          "type": "0"
        },
        {
          "id": 1598,
          "level": 2,
          "levelDescribe": "舒适",
          "levelMaxValue": 60,
          "levelMinValue": 30,
          "pollution": "hum",
          "type": "0"
        },
        {
          "id": 1600,
          "level": 3,
          "levelDescribe": "潮湿",
          "levelMaxValue": null,
          "levelMinValue": 60,
          "pollution": "hum",
          "type": "0"
        }
      ],
      "temLevels": [
        {
          "id": 1590,
          "level": 1,
          "levelDescribe": "偏冷",
          "levelMaxValue": 23,
          "levelMinValue": 0,
          "pollution": "tem",
          "type": "0"
        },
        {
          "id": 1592,
          "level": 2,
          "levelDescribe": "舒适",
          "levelMaxValue": 28,
          "levelMinValue": 23,
          "pollution": "tem",
          "type": "0"
        },
        {
          "id": 1594,
          "level": 3,
          "levelDescribe": "偏热",
          "levelMaxValue": null,
          "levelMinValue": 28,
          "pollution": "tem",
          "type": "0"
        }
      ],
      "pm25Levels": [
        {
          "id": 52,
          "level": 1,
          "levelDescribe": "完美",
          "levelMaxValue": 6,
          "levelMinValue": 0,
          "pollution": "pm25",
          "type": "0"
        },
        {
          "id": 54,
          "level": 2,
          "levelDescribe": "极好",
          "levelMaxValue": 15,
          "levelMinValue": 6,
          "pollution": "pm25",
          "type": "0"
        },
        {
          "id": 56,
          "level": 3,
          "levelDescribe": "舒适",
          "levelMaxValue": 35,
          "levelMinValue": 15,
          "pollution": "pm25",
          "type": "0"
        },
        {
          "id": 58,
          "level": 4,
          "levelDescribe": "适宜",
          "levelMaxValue": 75,
          "levelMinValue": 35,
          "pollution": "pm25",
          "type": "0"
        },
        {
          "id": 60,
          "level": 5,
          "levelDescribe": "净化",
          "levelMaxValue": 999,
          "levelMinValue": 75,
          "pollution": "pm25",
          "type": "0"
        }
      ]
    }
  }
  
}