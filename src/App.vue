<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/Header.vue';
import FooterComponent from './components/Footer.vue';

import { useRoute } from 'vue-router'

// 현재 라우터 정보를 가져옴
const route = useRoute()

// 푸터를 숨기고 싶은 경로
const hideFooterRoutes = ['/write', '/about']

// 현재 경로가 hideFooterRoutes에 없으면 푸터를 보여줌
const showFooter = !hideFooterRoutes.includes(route.path)

</script>

<template>
  <div>
    <HeaderComponent />
    <RouterLink to="/"></RouterLink>
    <RouterView />
    <!-- 특정 경로에 따라 푸터 숨기기 -->
    <FooterComponent v-if="showFooter" />
  </div>

  
</template>

