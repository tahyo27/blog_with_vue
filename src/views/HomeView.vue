<script setup>
import './../assets/home.css';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'

const posts = ref([])

const latestPost = computed(() => {
  return posts.value.length > 0 ? posts.value[0] : null;
});

const remainingPosts = computed(() => {
  return posts.value.length > 1 ? posts.value.slice(1) : [];
});

const latestImageHtml = computed(() => {
  if (!latestPost.value || !latestPost.value.content) return '';

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = latestPost.value.content;
  
  const firstImage = tempDiv.querySelector('img');
  return firstImage ? firstImage.outerHTML : '';
});

const truncatedContent = computed(() => {
  if (!latestPost.value || !latestPost.value.content) return '';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = latestPost.value.content;
  
  const textContent = Array.from(tempDiv.querySelectorAll('p'))
    .filter(p => !p.querySelector('img'))
    .map(p => p.textContent)
    .join(' '); // <p></p> 태그 속 img없는 텍스트 추출해서 합침

  return textContent.length > 10 ? textContent.slice(0, 10) + '...' : textContent; //몇글자 제한할지 고민
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8072/posts')
    posts.value = response.data
    console.log(response.data);
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
      <div class="featureImg" v-html="latestImageHtml"></div>
      <div class="latestMain" v-if="latestPost">
        <h2>{{ latestPost.title }}</h2>
        <p>{{ truncatedContent }}</p>
      </div>
    </div>
  </main>
  <main class="maintwo">
    <h1>TRAIN OF THOUGHT</h1>
    <ul>
      <li v-for="post in remainingPosts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p v-html="post.content"></p>
      </li>
    </ul>
      
  

  </main>
  <footer class="footer">
    <div> 밑에 하단 푸터부분 나중에 만들어야함</div>

  </footer>
  </div>
</template>

