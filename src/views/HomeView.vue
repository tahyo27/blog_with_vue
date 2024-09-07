<script setup>
import './../assets/home.css';
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'
// 타이틀 제목도 길면 자를 생각 하기
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

  return textContent.length > 20 ? textContent.slice(0, 20) + '...' : textContent; //몇글자 제한할지 고민
});

const postDivide = (content) => {
  if (!content) return { imageHtml: '', text: '' }; //디폴트 이미지와 글자 나중에 넣기

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  
  const firstImage = tempDiv.querySelector('img');
  const imageHtml = firstImage ? firstImage.outerHTML : ''; //디폴트 이미지 넣을 생각

  const textContent = Array.from(tempDiv.querySelectorAll('p'))
    .filter(p => !p.querySelector('img'))
    .map(p => p.textContent)
    .join(' ');

  const truncatedText = textContent.length > 10 ? textContent.slice(0, 10) + '...' : textContent;

  return { imageHtml, text: truncatedText };
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
    <header class="header">
      <span>EVERYTHING IS PERSONAL. INCLUDING THIS BLOG.</span>
      <h1>Train of Thought</h1>
      <nav class="nav">
        <div><RouterLink to="/">Home</RouterLink></div>
        <div><RouterLink to="/about">About</RouterLink></div>
        <div><RouterLink to="/write">My Blog(write)</RouterLink></div>
        <div><RouterLink to="/select">Select</RouterLink></div>
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
    <div class="mainLeft">
      <div class="maintwoTrain">
        <h1>TRAIN OF THOUGHT</h1>
      </div>
    <ul>
      <li v-for="post in remainingPosts" :key="post.id">
        <div class="image-container" v-html="postDivide(post.content).imageHtml"></div>
        <div class="text-container">
          <h1>{{ post.title }}</h1>
          <p>{{ postDivide(post.content).text }}</p>
        </div>
      </li>
    </ul>
  </div>
    
  <div class="mainRight">
    <div>about me</div>
  </div>
      
  </main>

  
  <footer class="footer">
    <div> 밑에 하단 푸터부분 나중에 만들어야함</div>

  </footer>
  </div>

  <RouterView />
</template>

