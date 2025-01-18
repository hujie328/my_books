<template>
    <div class="banner">
        <p class="typing-effect">{{ p1t }}</p>
    </div>
</template>

<script setup>
const p1t = "欢迎来到静谧森林"


</script>

<style lang="scss" scoped>
.banner {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    .typing-effect {
        font-size: 24px;
        color: #FFFFFF;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        border-right: 2px solid rgba(#FFFFFF, 0.6);
        animation: typing 2s steps(8, end) forwards, borderhidden .5s linear 2s forwards;
    }

    @keyframes typing {
        from {
            width: 0;
        }

        to {
            width: 200px;
        }
    }

    @keyframes borderhidden {
        from {}

        to {
            border-right: 0;
        }
    }
}
</style>