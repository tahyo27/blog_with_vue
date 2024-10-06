<script setup>
import { ref, onMounted } from 'vue';
import { useCookies } from 'vue3-cookies';
import { useRouter } from 'vue-router';
import { useEventBus } from '../utils/LoginEvent.js';

//쿠키 사용
const { cookies } = useCookies();
const router = useRouter();
const eventBus = useEventBus();


const username = ref(cookies.get('username') || '');
const remainingTime = ref(30); // 초기 유효 시간 설정 새로고침하면 유효시간 30으로 바뀌어서 어떻게 바꿀지 생각

const countdown = () => {
  const interval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value -= 1; // 남은 시간 줄어들기
    } else {
      clearInterval(interval); // 남은 시간이 0이 되면 인터벌 정지
      cookies.remove('username'); // 쿠키 삭제
      username.value = null; // username 초기화
    }
  }, 60000); // 1분마다 남은 시간 줄어듦
};

const logout = () => {
  cookies.remove('jwtToken');
  cookies.remove('username'); // 쿠키 삭제
  username.value = null; // username 초기화
  router.push('/'); //페이지 리디렉션
};

// 페이지 맨 아래로 스크롤하는 함수
const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth' // 부드럽게 스크롤
  });
};

onMounted(() => {
  countdown(); // 컴포넌트가 mounted 되었을 때 카운트다운 시작
});
</script>

<template>
    <header class="myblog-header">
      <span>EVERYTHING IS PERSONAL. INCLUDING THIS BLOG.</span>
      <h1>Train of Thought</h1>
      <nav class="myblog-nav">
        <div><RouterLink to="/">Home</RouterLink></div>
        <div><RouterLink to="/about">About</RouterLink></div>
        <div><RouterLink to="/myblog">My Blog</RouterLink></div>
        <div><RouterLink to="/write">My Blog(write)</RouterLink></div>
        <div @click="scrollToBottom" class="contact-div">
            Contact
        </div>
        <div><RouterLink to="/login">Log In</RouterLink></div>
        <div v-if="username">
          <p>환영합니다, {{ username }}</p>
          <p>남은 유효 시간: {{ remainingTime }}분</p>
        </div>
        <button @click="logout">로그아웃</button>
      </nav>
    </header>
</template>

<style scoped>
.myblog-header {
    text-align: center;
    margin-bottom: 10rem;
}
.myblog-header span {
    font-size: 2.1rem;
}
.myblog-header h1 {
    margin-top: 10px;
    font-size: 7rem;
}

.myblog-nav {
    display: flex;
    justify-content: center;
    border: 1px solid black;
    height: 3.5rem;
    border-left: none;
    border-right: none;
}

.myblog-nav div {
    display: flex;
    align-items: center; 
    justify-content: center;
    
    height: 100%;
    width: 12rem;
    border: 1px solid black;
    border-right: none;
    border-bottom: none;
    border-top: none;
}

.myblog-nav div:first-child {
    border-left: none;
}

.contact-div {
  cursor: pointer;
}

</style>