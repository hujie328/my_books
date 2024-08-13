<template>
    <div ref="codeMain" class="code_main">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript'
const codeMain = ref(null);

const state = EditorState.create({
    doc: "hello",  //这是文本
    extensions: [basicSetup, javascript()]
})

onMounted(() => {
    const editorView = new EditorView({
        parent: codeMain.value,
        state
    });

    // 回显代码的示例
    editorView.dispatch({
        changes: {
            from: editorView.state.doc.length,
            insert: ' world!'
        }
    });
    const updatedCode = editorView.state.doc.toString();
    console.log(updatedCode);
});
</script>

<style scoped></style>