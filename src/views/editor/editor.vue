<template>
  <div class="editor">
    <div class="editor__header"></div>
    <div class="editor__main">
      <drawingBoard></drawingBoard>
    </div>
  </div>
</template>

<script setup>
import drawingBoard from "./components/drawingBoard.vue";
</script>

<style lang="scss" scoped>
.editor__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
}
</style>
