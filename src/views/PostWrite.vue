<template>
  <div class="form-container">
    <h1>인서트페이지</h1>
    <form @submit.prevent="saveBoard" class="board-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input v-model="title" type="text" id="title" name="title" required />
      </div>

      <div class="form-group">
        <label for="author">Author:</label>
        <input v-model="author" type="text" id="author" name="author" required />
      </div>
    </form>

    <div ref="editorElement" class="editor"></div>
    <div class="button-container">
      <button type="button" @click="saveBoard" class="save-button">저장</button>
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
                  const response = await fetch('http://localhost:8072/temp/image', {
                    method: 'POST',
                    body: formData,
                  });

                  if (!response.ok) {
                    throw new Error('이미지 업로드 실패');
                  }

                  const data = await response.json();
                  console.log("이미지 파일 url", data.url)
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
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
}

.board-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 5px;
}

input[type="text"] {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
}

input[type="text"]:focus {
  border-color: #007BFF;
  outline: none;
}

.editor {
  min-height: 150px;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.button-container {
  text-align: center;
  margin-top: 20px;
}

.save-button {
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #0056b3;
}
</style>