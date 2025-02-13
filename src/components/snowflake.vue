<template>
  <canvas id="snowfall"></canvas>
</template>

<script setup>
import { onMounted } from "vue";

/* 控制下雪 */
function snowFall(snow) {
  /* 可配置属性 */
  snow = snow || {};
  this.maxFlake = snow.maxFlake || 200; /* 最多片数 */
  this.flakeSize = snow.flakeSize || 10; /* 雪花形状 */
  this.fallSpeed = snow.fallSpeed || 1; /* 坠落速度 */
}
/* 兼容写法 */
requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
    setTimeout(callback, 1000 / 60);
  };

cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.oCancelAnimationFrame;
/* 开始下雪 */
snowFall.prototype.start = function () {
  /* 创建画布 */
  snowCanvas.apply(this);
  /* 创建雪花形状 */
  createFlakes.apply(this);
  /* 画雪 */
  drawSnow.apply(this);
};
/* 创建画布 */
function snowCanvas() {
  /* 添加 Dom 结点 */
  let snowcanvas = document.querySelector("#snowfall");
  snowcanvas.width = document.body.scrollWidth;
  snowcanvas.height = document.body.scrollHeight;
  snowcanvas.setAttribute(
    "style",
    "position:fixed; top: 0; left: 0; bottom:0; right:0; z-index: -1; pointer-events: none;"
  );
  document.getElementsByTagName("body")[0].appendChild(snowcanvas);
  this.canvas = snowcanvas;
  this.ctx = snowcanvas.getContext("2d");
  /* 窗口大小改变的处理 */
  window.onresize = function () {
    snowcanvas.width = document.body.scrollWidth;
    snowcanvas.height = document.body.scrollHeight;
  };
}
/* 雪运动对象 */
function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
  this.x = Math.floor(Math.random() * canvasWidth); /* x 坐标 */
  this.y = Math.floor(Math.random() * canvasHeight); /* y 坐标 */
  this.size = Math.random() * flakeSize + 2; /* 形状 */
  this.maxSize = flakeSize; /* 最大形状 */
  this.speed = Math.random() * 1 + fallSpeed; /* 坠落速度 */
  this.fallSpeed = fallSpeed; /* 坠落速度 */
  this.velY = this.speed; /* Y 方向速度 */
  this.velX = 0; /* X 方向速度 */
  this.stepSize = Math.random() / 30; /* 步长 */
  this.step = 0; /* 步数 */
}
flakeMove.prototype.update = function (canvasWidth, canvasHeight) {
  let x = this.x;
  let y = this.y;
  /* 左右摆动(余弦) */
  this.velX *= 0.98;
  if (this.velY <= this.speed) {
    this.velY = this.speed;
  }
  this.velX += Math.cos((this.step += 0.05)) * this.stepSize;
  this.y += this.velY;
  this.x += this.velX;
  /* 飞出边界的处理 */ if (
    this.x >= canvasWidth ||
    this.x <= 0 ||
    this.y >= canvasHeight ||
    this.y <= 0
  ) {
    this.reset(canvasWidth, canvasHeight);
  }
};
/* 飞出边界-放置最顶端继续坠落 */
flakeMove.prototype.reset = function (width, height) {
  this.x = Math.floor(Math.random() * width);
  this.y = 0;
  this.size = Math.random() * this.maxSize + 2;
  this.speed = Math.random() * 1 + this.fallSpeed;
  this.velY = this.speed;
  this.velX = 0;
};
// 渲染雪花-随机形状（此处可修改雪花颜色！！！）
flakeMove.prototype.render = function (ctx) {
  let snowFlake = ctx.createRadialGradient(
    this.x,
    this.y,
    0,
    this.x,
    this.y,
    this.size
  );
  snowFlake.addColorStop(
    0,
    "rgba(255, 255, 255, 0.9)"
  ); /* 此处是雪花颜色，默认是白色 */
  snowFlake.addColorStop(
    0.5,
    "rgba(255, 255, 255, 0.5)"
  ); /* 若要改为其他颜色，请自行查 */
  snowFlake.addColorStop(
    1,
    "rgba(255, 255, 255, 0)"
  ); /* 找 16 进制的 RGB 颜色代码。 */
  ctx.save();
  ctx.fillStyle = snowFlake;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};
/* 创建雪花-定义形状 */
function createFlakes() {
  let maxFlake = this.maxFlake,
    flakes = (this.flakes = []),
    canvas = this.canvas;
  for (let i = 0; i < maxFlake; i++) {
    flakes.push(
      new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed)
    );
  }
}
/* 画雪 */
function drawSnow() {
  let maxFlake = this.maxFlake,
    flakes = this.flakes;
  let ctx = this.ctx;
  let canvas = this.canvas;
  let that = this;
  /* 清空雪花 */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let e = 0; e < maxFlake; e++) {
    flakes[e].update(canvas.width, canvas.height);
    flakes[e].render(ctx);
  }
  /*  一帧一帧的画 */
  this.loop = requestAnimationFrame(function () {
    drawSnow.apply(that);
  });
}
/* 调用及控制方法 */
let snow = new snowFall({ maxFlake: 100, flakeSize: 8, fallSpeed: 2 });
onMounted(() => {
  snow.start();
});
</script>
