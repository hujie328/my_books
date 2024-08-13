<template>
    <div class="home">
        <div class="left_block"></div>
        <div class="right_main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    display: flex;

    .left_block {
        width: 200px;

        @media screen and (width < 768px) {
            display: none;
        }
    }

    .right_main {
        flex: 1;
        padding: 0 30px;
        overflow: hidden;
    }
}
</style>