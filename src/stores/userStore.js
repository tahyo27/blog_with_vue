import { defineStore } from 'pinia';
import VueCookies from 'vue-cookies'; // vue-cookies 임포트

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null,
    isLoggedIn: false,
  }),
  actions: {
    login(username) {
      // 쿠키에 사용자 이름 저장
      VueCookies.set('username', username, { maxAge: 1800 });
      this.username = username; // Pinia 스토어에 사용자 이름 저장
      this.isLoggedIn = true; // 로그인 상태 업데이트
    },
    logout() {
      VueCookies.remove('username'); // 쿠키에서 사용자 이름 제거
      this.username = null; // Pinia 스토어에서 사용자 이름 제거
      this.isLoggedIn = false; // 로그아웃 상태 업데이트
    },
    loadUserFromCookie() {
      // 쿠키에서 사용자 이름을 가져와 상태 업데이트
      const username = VueCookies.get('username');
      if (username) {
        this.username = username;
        this.isLoggedIn = true;
      }
    },
  },
});