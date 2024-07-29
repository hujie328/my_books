<template>
  <div
    id="drawing_board"
    class="drawing_board"
    @mousedown="mousedownHandle"
    @mousemove="mousemoveHandle"
    @mouseup="mouseupHandle"
    @mouseleave="mouseleaveHandle"
  >
    <Box v-for="box in boxList" :box="box"></Box>
  </div>
</template>

<script setup>
import Box from "./box.vue";
import { ref, reactive } from "vue";
const boxList = reactive([]);
const ISLONGDOWN_TIME = 1 * 1000;
let downTimer = null;
let downPoint = {
  x: 0,
  y: 0,
};

let mouseEvent = ref({});

let isLock = true;

// 鼠标按下事件
const mousedownHandle = (event) => {
  if (event.target.id != "drawing_board") return;
  const { buttons, offsetX, offsetY } = event;
  if (buttons === 1) {
    downTimer = setTimeout(() => {
      isLock = false;
      boxList.push(mouseEvent);
      clearTimeout(downTimer);
    }, ISLONGDOWN_TIME);
  }
  downPoint.x = offsetX;
  downPoint.y = offsetY;
  mouseEvent.value.left = offsetX + "px";
  mouseEvent.value.top = offsetY + "px";
  
};

// 鼠标移动事件
const mousemoveHandle = (event) => {
  if (event.target.id != "drawing_board") return;
  if (isLock) return;
  mouseEvent.value.width = event.offsetX - downPoint.x -10 + "px";
  mouseEvent.value.height = event.offsetY - downPoint.y - 10 + "px";
};

const mouseleaveHandle = (event) => {
  downTimer && clearTimeout(downTimer);
  if (isLock) return;
  if (event.target.id != "drawing_board") return;
  if (
    !mouseEvent.value.width ||
    !mouseEvent.value.height ||
    mouseEvent.value.width < 0 ||
    mouseEvent.value.height < 0
  ) {
    boxList.pop();
  }
  mouseEvent = {};
  isLock = true;
};

// 鼠标松开事件
const mouseupHandle = (event) => {
  downTimer && clearTimeout(downTimer);
  if (isLock) return;
  if (event.target.id != "drawing_board") return;
  if (
    !mouseEvent.value.width ||
    !mouseEvent.value.height ||
    mouseEvent.value.width < 0 ||
    mouseEvent.value.height < 0
  ) {
    boxList.pop();
  }
  mouseEvent = ref( {});
  isLock = true;
};
</script>

<style lang="scss" scoped>
.drawing_board {
  width: 800px;
  height: 800px;
  background-color: aliceblue;
  position: relative;
}
</style>
