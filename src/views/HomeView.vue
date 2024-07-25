<template>
  <div class="home">
    <head>
      <nav>
        <div class="nav_bar">
          <el-button type="primary">Primary</el-button>
        </div>
      </nav>
    </head>
    <router-view />
  </div>
</template>

<script setup>
// @ is an alias to /src
</script>

<style lang="scss" scoped>
head,
nav {
  display: block;
}
.home {
  width: 100%;
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
.nav_bar {
  width: 100%;
}
</style>
