export default function drawChart(selector, option) {
  option.value > option.maxValue ? (option.value = option.maxValue) : "";
  option.teAngle =
    (option.value / option.maxValue) * (option.feAngle - option.fsAngle) +
    option.fsAngle;
  let canvas = document.querySelector(selector);
  canvas.style.transform = "rotate(125deg)";
  let ctx = canvas.getContext("2d");
  let deg = Math.PI / 180;
  let dpr = 4; //window.devicePixelRatio;
  let i = option.fsAngle;
  let timer = null;
  canvas.width = option.canvasWidth * dpr;
  canvas.height = option.canvasHeight * dpr;
  ctx.strokeStyle = option.fColor;
  ctx.lineWidth = option.lineWidth * dpr;
  ctx.lineCap = option.lineCap;

  //绘制总进度（度数）
  ctx.beginPath();
  ctx.arc(
    option.p.x * dpr,
    option.p.y * dpr,
    option.r * dpr,
    deg * option.fsAngle,
    deg * option.feAngle
  );
  ctx.stroke();

  //计算渐变色集（根据aqi等级）
  let colorSet = [];
  let gradient = [];
  if (option.aqilevel == 1 || option.aqilevel == 2) {
    gradient = gradientColor(option.tColor[0], option.tColor[option.aqilevel - 1], Math.ceil(option.teAngle));
    colorSet.push.apply(colorSet, gradient);
  } else {
    for (let step = 1; step < option.aqilevel; step++) {
      gradient = gradientColor(option.tColor[step - 1], option.tColor[step], Math.ceil(option.teAngle / (option.aqilevel - 1)));
      colorSet.push.apply(colorSet, gradient);
    }
  }

  //绘制虚拟色盘
  let gradientBg = null;
  let gradientCanvas = document.createElement('canvas');
  let gcx = gradientCanvas.getContext('2d');
  gradientCanvas.width = option.canvasWidth * dpr; // 目标宽度
  gradientCanvas.height = option.canvasHeight * dpr; // 目标高度
  let iSectors = 360;
  let iSectorAngle = (360 / iSectors) / 180 * Math.PI;
  gcx.clearRect(0, 0, gcx.canvas.width, gcx.canvas.height);
  gcx.save();
  gcx.translate(canvas.width / 2, canvas.height / 2);
  for (let j = 0; j < iSectors; j++) {
    let startAngle = 0;
    let endAngle = startAngle + iSectorAngle;
    let radius = (canvas.width / 2) - 1;
    let color = j <= colorSet.length ? colorSet[j] : option.tColor[0];
    gcx.beginPath();
    gcx.moveTo(0, 0);
    gcx.arc(0, 0, radius, startAngle, endAngle);
    gcx.closePath();
    gcx.strokeStyle = color;
    gcx.stroke();
    gcx.fillStyle = color;
    gcx.fill();
    gcx.rotate(iSectorAngle);
  }
  gcx.restore();
  gradientBg = ctx.createPattern(gradientCanvas, 'no-repeat');

  //添加动画
  let raf = null;
  drowColorArc();

  function drowColorArc() {
    //绘制渐变进度条
    ctx.beginPath();
    ctx.lineWidth = option.lineWidth * dpr;
    ctx.arc(
      option.p.x * dpr,
      option.p.y * dpr,
      option.r * dpr,
      deg * option.tsAngle,
      deg * i
    );
    ctx.strokeStyle = gradientBg;
    ctx.stroke();

    i += 10;
    if (i > option.teAngle) {
      cancelAnimationFrame(raf);
      //绘制圆点
      ctx.beginPath();
      ctx.lineWidth = (option.lineWidth * 2) * dpr;
      ctx.arc(
        option.p.x * dpr,
        option.p.y * dpr,
        option.r * dpr,
        deg * i - deg * (option.lineWidth * 2),
        deg * i - deg * (option.lineWidth * 2) + 0.017
      );
      ctx.strokeStyle = option.tColor[option.aqilevel - 1];
      ctx.stroke();
    } else {
      raf = requestAnimationFrame(drowColorArc);
    }
  }

  /*
   *计算两指定色值之间的过渡
   *startColor 【开始色值】
   *endColor 【结束色值】
   *step 【过渡次数】
   */
  function gradientColor(startColor, endColor, step) {
    let startRGB = colorRgb(startColor); //转换为rgb数组模式
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];

    let endRGB = colorRgb(endColor);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];

    let sR = (endR - startR) / step; //总差值
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;

    let colorArr = [];
    for (let i = 0; i < step; i++) {
      //计算每一步的hex值 
      let hex = colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
      colorArr.push(hex);
    }
    return colorArr;
  }

  // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
  function colorRgb(scolor) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = scolor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return sColorChange;
    } else {
      return sColor;
    }
  };

  // 将rgb表示方式转换为hex表示方式
  function colorHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += (aNum[i] + aNum[i]);
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
}