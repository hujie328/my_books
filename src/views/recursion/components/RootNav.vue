<template>
  <div class="nood_box" style="padding-left: 20px;">
    <template v-for="item in modelValue">
      <div @click="expendHandle(item)" class="nood_item">
        <div :class="['nood_dot', item.children ? 'have_children' : '']"></div>
        <div class="nood_name">{{ item.name }}</div>
      </div>
      <div v-if="item.children" :class="['nav_box', item.isExpend ? 'expend' : 'hidden']">
        <RootNav v-model="item.children" />
      </div>
    </template>
  </div>
</template>


<script setup>

import RootNav from './RootNav.vue'
const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})


const expendHandle = (item) => {
  item.isExpend = !(!!item.isExpend)
  emits('update:modelValue', props.modelValue)
}

</script>

<style lang="scss" scoped>
.nood_box {
  padding-left: 20px;

  .nood_item {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-top: 10px;

    .nood_dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: aqua;

      &.have_children {
        background-color: transparent;
        border: 1px solid aqua;
      }
    }

    .nood_name {
      margin-left: 10px;
      color: #FFFFFF;
    }
  }
}

.nav_box {
  overflow: hidden;

  &.expend {
    height: fit-content;

  }

  &.hidden {
    height: 0;
  }
}
</style>