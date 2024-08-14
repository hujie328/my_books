<template>
    <div ref="codeMain" class="code_main">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript'
import { markdown } from '@codemirror/lang-markdown'

const codeMain = ref(null);

const state = EditorState.create({
    doc: "const",  //这是文本
    extensions: [basicSetup, javascript(), markdown()]
})
let editorView = ''
onMounted(() => {
    editorView = new EditorView({
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
    const transaction = editorView.state.update({
        changes: { from: editorView.state.doc.length, insert: '新的文本' },
    });
    editorView.dispatch(transaction);

    // const updatedCode = editorView.state.doc.toString();
    // console.log(updatedCode);
});

</script>

<style scoped></style>