<script setup>
import './../assets/select.css';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

const post = ref({
  id: '',
  title: '',
  content: ''
});

// API 호출 함수 정의
const fetchPost = async () => {
    console.log("API호출");
    const postId = route.params.id;
  try {
    const response = await axios.get(`http://localhost:8072/posts/${postId}`); // 나중에 홈에서 클릭하면 포스트아이디 들어가게 변경
    post.value = response.data; 
    // 응답 데이터 확인
    console.log('API Response:', response.data);
  } catch (error) {
    console.error("There was an error!", error);
  }
};
// 컴포넌트가 마운트될 때 API 호출
onMounted(fetchPost);
</script>


<template>
  <div>
    <header class="select-header">
      <span>EVERYTHING IS PERSONAL. INCLUDING THIS BLOG.</span>
      <h1>Train of Thought</h1>
      <nav class="select-nav">
        <div>Home</div>
        <div>About</div>
        <div>My Blog</div>
        <div>Contact</div>
        <div>Search</div>
        <div>SNS</div>
      </nav>
    </header>
  <main class="select-main">
    <div class="select-post-nav">all post</div>
    <div class="select-feature">
        <h1>{{ post.title }}</h1>
        <div v-html="post.content"></div>
    </div>
  </main>
  <footer class="select-footer">
    내가 제작했습니다

  </footer>
  </div>
</template>

