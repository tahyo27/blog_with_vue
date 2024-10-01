<script setup>
import './../assets/myblog.css';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'
// 타이틀 제목도 길면 자를 생각 하기
const posts = ref([])


const router = useRouter();

const postDivide = (content) => {
  if (!content) return { imageHtml: '', text: '' }; //디폴트 이미지와 글자 나중에 넣기

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  
  const firstImage = tempDiv.querySelector('img');
  const imageHtml = firstImage ? firstImage.outerHTML : '<img src="https://via.placeholder.com/150?text=No+Image+Available" alt="No Image" />'; //디폴트 이미지 넣을 생각

  const textContent = Array.from(tempDiv.querySelectorAll('p'))
    .filter(p => !p.querySelector('img'))
    .map(p => p.textContent)
    .join(' ');

  const truncatedText = textContent.length > 15 ? textContent.slice(0, 10) + '...' : textContent;

  return { imageHtml, text: truncatedText };
};

const goToPostDetail = (id) => {
  router.push({ name: 'select', params: { id } });
};

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
  
  <main class="myblog-main">
    <div class="myblog-post-nav">
      <div class="category-item">All Posts</div>
      <div class="category-item">Travel</div>
      <div class="category-item">My Top 5</div>
      <div class="category-item">Art & Culture</div>
    </div>
    <div class="myblog-list">
      <ul>
      <li v-for="post in posts" :key="post.id" @click="() => goToPostDetail(post.id)">
        <div class="myblog-image-container" v-html="postDivide(post.content).imageHtml"></div>
        <div class="myblog-text-container">
          <h1>{{ post.title }}</h1>
          <p>{{ postDivide(post.content).text }}</p>
        </div>
      </li>
    </ul>
    </div>
  </main>
  </div>

</template>

<style>

</style>
