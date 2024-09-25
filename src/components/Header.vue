<script setup>
import { ref } from 'vue';

// 페이지 맨 아래로 스크롤하는 함수
const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth' // 부드럽게 스크롤
  });
};
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