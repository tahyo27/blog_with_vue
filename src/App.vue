<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/Header.vue';
import FooterComponent from './components/Footer.vue';

import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'

// 현재 라우터 정보를 가져옴
const route = useRoute()

// 푸터를 숨기고 싶은 경로
const hideFooterRoutes = ['/write', '/about', '/login']

const showFooter = ref(true)

// route가 변경될 때마다 showFooter 재계산
watchEffect(() => {
  showFooter.value = !hideFooterRoutes.includes(route.path)
})
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

