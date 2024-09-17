<script setup>
import './../assets/home.css';
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'
// 타이틀 제목도 길면 자를 생각 하기
const posts = ref([]);
const cursor = ref(null); //더보기용 커서

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

// onMounted(async () => {
//   try {
//     const response = await axios.get('http://localhost:8072/posts')
//     posts.value = response.data
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching posts:', error)
//   }
 
// })

// 로드 시 게시물 가져오기
onMounted(async () => {
  await loadPosts();
});

// API 호출 함수
const loadPosts = async () => {
  try {
    const response = await axios.get('http://localhost:8072/posts', {
      params: { cursor: cursor.value }  //커서 페이징 커서 전달
    });
    const fetchedPosts = response.data;

    if (fetchedPosts.length > 0) {
      posts.value = [...posts.value, ...fetchedPosts];  // 기존 포스트에 새 포스트 추가
      cursor.value = fetchedPosts[fetchedPosts.length - 1].id;  // 마지막 포스트 ID 커서로 업데이트
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

// 더보기 버튼 클릭 시
const loadMore = async () => {
  await loadPosts();
};



</script>

<template>
  <div>
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
      <div class="main-left">
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

        <button class="plus-button" @click="loadMore">포스트 더보기</button>
      </div>
    
    <div class="main-right">
        <div class="right-about">
          <h1>ABOUT ME</h1>
          <div><img src="../../public/고라파덕.webp"></div>
          <div><p>TH의 블로그입니다. 만들면서 여러 공부를 하는 블로그입니다.</p>
          </div>
          <div class="right-read">
            <RouterLink to="/about">Read More ></RouterLink>
          </div>     
        </div>
    
        <div class="right-about-bottom">
          <h1>MY PICK OF MONTH</h1>
          <div><img src="../../public/book.jpg"></div>
          <div><p>이번 달 픽은 없습니다.</p></div>
        </div>
    </div>
      
    
  </main>

</div>

  <RouterView />
</template>

