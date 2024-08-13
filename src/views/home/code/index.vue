<template>
    <div ref="codeMain" class="code_main">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { EditorView } from 'codemirror';

const codeMain = ref(null);


onMounted(() => {
    const editorView = new EditorView({
        parent: codeMain.value,
        doc: 'hellow'
    });

    // 回显代码的示例
    editorView.dispatch({
        changes: {
            from: 0,
            to: editorView.state.doc.length,
            insert: '您要回显的代码内容'
        }
    });
});
</script>

<style scoped></style>