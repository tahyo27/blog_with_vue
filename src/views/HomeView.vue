<script setup>
import './../assets/home.css';

import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])

const latestPost = computed(() => {
  return posts.value.length > 0 ? posts.value[posts.value.length - 1] : null;
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8072/posts')
    posts.value = response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
})


</script>

<template>
  <div>
    <header class="header">
      <span>EVERYTHING IS PERSONAL. INCLUDING THIS BLOG.</span>
      <h1>Train of Thought</h1>
      <nav class="nav">
        <div>Home</div>
        <div>About</div>
        <div>My Blog</div>
        <div>Contact</div>
        <div>Search</div>
        <div>SNS</div>
      </nav>
    </header>
  <main class="main">
    <div class="feature">
      <div class="featureImg">이미지 들어갈 자리</div>
      <div class="latestMain" v-if="latestPost">
        <h2>{{ latestPost.title }}</h2>
        <p>{{ latestPost.content }}</p>
      </div>
    </div>
  </main>
  <main class="maintwo">
    <h1>RAIN OF THOUGHT</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </li>
    </ul>
      
  

  </main>
  <footer class="footer">
    내가 제작했습니다

  </footer>
  </div>
</template>

