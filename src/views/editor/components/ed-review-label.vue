<template>
  <div class="mark-container" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
    <div :style="currentBoxStyle" class="drag-box" v-if="isDrawing"></div>
  </div>
</template>

<script setup>
// 导入Vue的computed、ref和reactive函数
import { computed, ref, reactive } from "vue"

// 使用reactive创建一个响应式对象，用于存储鼠标按下时的起始点坐标
const startPoint = reactive({ x: 0, y: 0 });
// 使用reactive创建一个响应式对象，用于存储鼠标移动时的当前点坐标
const currentPoint = reactive({ x: 0, y: 0 })
// 使用ref创建一个响应式变量，用于标记鼠标是否按下
const isDrawing = ref(false)

// 当鼠标在容器内按下时，记录起始点坐标并设置isDrawing为true
const onMouseDown = (event) => {
  isDrawing.value = true
  startPoint.x = event.layerX
  startPoint.y = event.layerY
  currentPoint.x = event.layerX
  currentPoint.y = event.layerY
};

// 当鼠标在容器内移动时，如果isDrawing为true，更新当前点坐标
const onMouseMove = (event) => {
  if (isDrawing.value) {
    currentPoint.x = event.layerX
    currentPoint.y = event.layerY
  }
}

// 当鼠标在容器内抬起时，设置isDrawing为false
const onMouseUp = () => {
  isDrawing.value = false
}
// 使用computed计算当前绘制框的样式，包括位置、大小和边框样式
const currentBoxStyle = computed(() => ({
  position: "absolute",
  border: "2px dashed #409EFF",
  display: "block",
  left: `${Math.min(startPoint.x, currentPoint.x)}px`,
  top: `${Math.min(startPoint.y, currentPoint.y)}px`,
  width: `${Math.abs(currentPoint.x - startPoint.x)}px`,
  height: `${Math.abs(currentPoint.y - startPoint.y)}px`,
}))
</script>

<style lang="scss" scoped>
.mark-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  .drag-box {
    pointer-events: none;
  }
}
</style>
