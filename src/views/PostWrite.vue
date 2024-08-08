<template>
  <div>
    <h1>인서트페이지</h1>
    <form @submit.prevent="saveBoard">
      <label for="title">Title:</label>
      <input v-model="title" type="text" id="title" name="title" required />
      <br /><br />
      <label for="author">Author:</label>
      <input v-model="author" type="text" id="author" name="author" required />
    </form>

    <div ref="editorElement"></div>
    <div>
      <button type="button" @click="saveBoard">저장</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/editor';

export default {
  setup() {
    const title = ref('');
    const author = ref('');
    const editor = ref(null);
    const editorElement = ref(null);

    onMounted(() => {
      try {
        if (editorElement.value) {
          editor.value = new Editor({
            el: editorElement.value,
            previewStyle: 'vertical',
            height: '500px',
            initialEditType: 'wysiwyg',
            hooks: {
              addImageBlobHook: async (blob, callback) => {
                const formData = new FormData();
                formData.append('file', blob, blob.name);

                try {
                  const response = await fetch('/image/temp', {
                    method: 'POST',
                    body: formData,
                  });

                  if (!response.ok) {
                    throw new Error('이미지 업로드 실패');
                  }

                  const data = await response.json();
                  callback(data.url);
                } catch (error) {
                  console.error('Error:', error);
                }
              },
            },
          });
        } else {
          console.error('에디터 엘리먼트 정의되지않음');
        }
      } catch (error) {
        console.error('에디터 초기화 실패', error);
      }
    });

    const saveBoard = async () => {
      if (editor.value.getMarkdown().length < 1) {
        alert('내용을 입력하세요');
        throw new Error('에디터에 내용이 필요합니다');
      }

      const content = editor.value.getHTML();
      const payload = {
        title: title.value,
        author: author.value,
        content: content,
      };

      try {
        const response = await axios.post('http://localhost:8072/posts', payload);
        console.log('성공:', response.data);
        alert('저장이 완료되었습니다.');
      } catch (error) {
        console.error('Error:', error);
        alert('저장 중 오류가 발생했습니다.');
      }
    };

    return {
      title,
      author,
      saveBoard,
      editorElement,
    };
  },
};
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>