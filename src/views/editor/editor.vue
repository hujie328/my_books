<template>
  <div class="editor">
    <!-- <div class="editor__header"></div> -->
    <div class="editor__main">
      <div class="box"><edReviewLabel></edReviewLabel></div>
    </div>
  </div>
</template>

<script setup>
import edReviewLabel from "./components/ed-review-label.vue";

</script>

<style lang="scss" scoped>
.editor{
  width: 100%;
  height: 100vh;
}
.editor__main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  .box{
    width: 80%;
    height: 80%;
  }
}
</style>
