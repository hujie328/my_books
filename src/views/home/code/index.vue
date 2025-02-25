<template>
  <div ref="codeMain" class="code_main"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror"
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

const codeMain = ref()

const state = EditorState.create({
  doc: "console.log('Hello World')", // 初始内容
  extensions: [
    basicSetup,
    html({ autoCloseTags: true, matchTags: { bothTags: true } }),
    oneDark,                        // 应用暗黑主题
    EditorView.lineWrapping,        // 自动换行
    EditorView.updateListener.of((update) => {
    })
  ]
});

let editor = null

onMounted(() => {
  editor = new EditorView({
    state,
    parent: codeMain.value  // 挂载到 DOM 元素
  });
})
</script>

<style scoped></style>
