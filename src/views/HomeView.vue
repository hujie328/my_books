<template>
  <div class="home_view" @scroll="pageScrollHandle">

    <head>
      <nav>
        <div class="nav_bar_block" :style="{ top: scrollTop }">
          <el-row align="middle" justify="center">
            <!-- 顶部导航 -->
            <el-col :md="9" :xs="0">
              <div class="bars_list">
                <div class="bar_item">
                  <i class="iconfont icon-home"></i>
                  <span>首页</span>
                </div>
                <div class="bar_item">
                  <i class="iconfont icon-shuoshuo"></i>
                  <span>说说</span>
                </div>
                <div class="bar_item">
                  <i class="iconfont icon-time"></i>
                  <span>归档</span>
                </div>
                <div class="bar_item">
                  <i class="iconfont icon-biji"></i>
                  <span>森林书</span>
                </div>
              </div>
            </el-col>
            <!-- 搜索 -->
            <el-col :md="9" :xs="0">
              <div class="seach_box">
                <div :class="['seach', isExpend ? 'expend' : '']">
                  <i class="iconfont icon-search seach_icon" @click="seachClickHandle"></i>
                  <input @blur="seachBlurHandle" ref="seachInput" v-model="seachValue" type="text" placeholder="搜索点什么呢"
                    class="seach_input" />
                </div>
              </div>
            </el-col>
            <!-- 只有移动端显示 -->
            <el-col :xs="12" :sm="0"></el-col>
          </el-row>
        </div>
      </nav>
    </head>
    <banner></banner>
    <div class="router-box">
      <router-view></router-view>
    </div>
    <snowflake></snowflake>
  </div>
</template>

<script setup>
import 'element-plus/theme-chalk/display.css'
import snowflake from '@/components/snowflake.vue';
import banner from '@/components/banner/index.vue';

// 搜索款是否展开
const isExpend = ref(false)
// 搜索款的值
let seachValue = ref('')
const seachInput = ref(null)

const scrollTop = ref('0px')


const seachClickHandle = () => {
  isExpend.value = true
  seachInput.value.focus()
}

const seachBlurHandle = () => {
  if (seachValue.value) return
  isExpend.value = false
}

const pageScrollHandle = (event) => {
  scrollTop.value = `${event.target.scrollTop}px`
  if(event.target.scrollTop > 500){
    
  }
}


</script>

<style lang="scss" scoped>
head,
nav {
  display: block;
}

.home_view {
  width: 100%;
  height: 100vh;
  overflow: auto;

  &::before {
    content: "";
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url(@/assets/daymode.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -2;
  }
}

.nav_bar_block {
  width: 100%;
  padding: 10px;
  position: relative;

  .bars_list {
    display: flex;
    align-items: center;
    cursor: pointer;

    .bar_item {
      padding: 0 20px;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      font-size: 14px;

      &:hover {
        color: #b3beb8;
      }

      .iconfont {
        margin-right: 6px;
      }
    }
  }

  .seach_box {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;

    .seach {
      width: 250px;
      display: flex;
      border-radius: 4px;
      padding: 12px 10px;
      position: relative;
      right: -220px;
      background-color: transparent;
      transition: all 0.3s;

      &.expend {
        background-color: #FFFFFF;
        right: 10px;

        .seach_icon {
          color: #adb5bd;
        }

      }

      .seach_icon {
        font-size: 18px;
        color: #FFFFFF;
        margin-right: 10px;
      }

      .seach_input {
        flex: 1;
        overflow: hidden;
        height: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        color: #8898aa;
        font-size: 14px;


        &::placeholder {
          color: #8898aa;
          font-size: 14px;
        }
      }
    }
  }
}

.router-box {
  width: 100%;
}
</style>
