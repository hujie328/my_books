<template>
  <div
    class="box_tmp"
    :style="{
      left: boxInfo.left,
      top: boxInfo.top,
      width: boxInfo.width,
      height: boxInfo.height,
    }"
  >
    <div class="right_btn"></div>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";

const props = defineProps(["box"]);

const boxInfo = ref(props.box.value);
</script>

<style lang="scss">
.box_tmp {
  border: 1px dotted #0069c2;
  position: absolute;

  .right_btn {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 10px;
    height: 10px;
    background-color: #0069c2;
  }
}
</style>
