<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './views/HeaderComponent.vue';
</script>

<template>
  <div>
    
    <HeaderComponent />
    <RouterLink to="/"></RouterLink>
    <FooterComponent />
  </div>
  <RouterView />
  <footer class="myblog-footer">
      © 2035 by Train of Thoughts. Powered and secured by TH
  </footer>
</template>

<style scoped>
.myblog-footer {
    margin-top: 30rem;
    display: flex;
    height: 10rem;
    justify-content: center;
}
</style>
