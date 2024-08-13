<template>
  <div class="mark-container" :style="isEditing ? '' : 'pointer-events: none;'" @mousedown="onMouseDown"
    @mousemove="onMouseMove" @mouseup="onMouseUp">
    <div :style="currentBoxStyle" class="drag-box" v-if="isDrawing"></div>

    <!-- 临时 -->
    <div v-if="isTemporary" @mousedown.stop @mousemove.stop @mouseup.stop @mouseleave.stop>
      <div :style="markersObj.style" class="temporaryBox"></div>
      <div class="temporaryBox_b" :style="{
    top: markersObj.currentPoint.y - 19 + 'px',
    left: markersObj.currentPoint.x - 19 + 'px',
  }">
        <div class="temporary">
          <div class="temporary-name">川</div>
        </div>
        <div class="comment">
          <input type="text" placeholder="请输入评论" v-model="markersObj.text" />
          <button @click.stop="ensureMarker">确定</button>
          <!-- <button @click.stop="$emit('delete-marker', marker.id)">{{marker.id}}删除</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";

defineOptions({
  name: "edReviewLabel",
  inheritAttrs: false,
});

const props = defineProps({
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  isEditing: {
    type: Boolean,
    default: true,
  },
});

const markersList = ref([]);
const startPoint = reactive({ x: 0, y: 0 });
const currentPoint = reactive({ x: 0, y: 0 });
const isDrawing = ref(false); // 鼠标是否按下
const isTemporary = ref(false); // 临时弹窗开启

// 临时
const markersObj = ref({});

const onMouseDown = (event) => {
  if (isTemporary.value) {
    // isDrawing.value = false;
    // isTemporary.value = false;
    return;
  }

  isDrawing.value = true;
  isTemporary.value = false;
  startPoint.x = event.layerX;
  startPoint.y = event.layerY;
  currentPoint.x = event.layerX;
  currentPoint.y = event.layerY;
};

const onMouseMove = (event) => {
  if (isDrawing.value) {
    currentPoint.x = event.layerX;
    currentPoint.y = event.layerY;
  }
};
const onMouseUp = () => {
  if (isTemporary.value) {
    isDrawing.value = false;
    isTemporary.value = false;
  } else {
    markersObj.value.style = currentBoxStyle.value;
    markersObj.value.currentPoint = currentPoint;
    isDrawing.value = false;
    isTemporary.value = true;
  }
};

const currentBoxStyle = computed(() => ({
  position: "absolute",
  border: "2px dashed #409EFF",
  display: "block",
  left: `${Math.min(startPoint.x, currentPoint.x)}px`,
  top: `${Math.min(startPoint.y, currentPoint.y)}px`,
  width: `${Math.abs(currentPoint.x - startPoint.x)}px`,
  height: `${Math.abs(currentPoint.y - startPoint.y)}px`,
}));
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

  .temporaryBox {}

  .temporaryBox_b {
    position: absolute;
  }

  .temporary {
    width: 38px;
    height: 38px;
    // background-image: url(image/dadianliuyanpinglun.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    display: flex;
    justify-content: center;

    .temporary-name {
      width: 24px;
      height: 19px;
      margin-top: 6px;
      border-radius: 218px;
      background: #409eff;
      font-size: 12px;
      color: #ffffff;
      text-align: center;
      line-height: 19px;
    }
  }

  .comment {
    width: 240px;
    height: 48px;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 40px;
    top: -8px;
    border-radius: 8px;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 34px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
      border: 0;
      outline: none;
      background-color: rgba(0, 0, 0, 0);
      width: 100%;
      height: 20px;
      font-size: 12px;
    }
  }
}
</style>
