import { defineStore } from 'pinia';
import VueCookies from 'vue-cookies'; // vue-cookies 임포트

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null,
    isLoggedIn: false,
    timeLeft: 1800, // 초기 시간 (초 단위로 설정, 30분 = 1800초)
    timer: null, // 타이머 참조 변수
  }),
  actions: {
    login(username) {
      // 쿠키에 사용자 이름 저장
      VueCookies.set('username', username, { maxAge: 1800 });
      this.username = username; // Pinia 스토어에 사용자 이름 저장
      this.isLoggedIn = true; // 로그인 상태 업데이트

      this.startTimer(); // 타이머 시작
    },
    logout() {
      VueCookies.remove('username'); // 쿠키에서 사용자 이름 제거
      this.username = null; // Pinia 스토어에서 사용자 이름 제거
      this.isLoggedIn = false; // 로그아웃 상태 업데이트

      this.clearTimer(); // 타이머 정지
    },
    loadUserFromCookie() {
      // 쿠키에서 사용자 이름을 가져와 상태 업데이트
      const username = VueCookies.get('username');
      if (username) {
        this.username = username;
        this.isLoggedIn = true;

        this.startTimer(); // 타이머 시작
      }
    },

    startTimer() {
      // 이미 타이머가 실행 중이면 초기화
      this.clearTimer();

      // 쿠키에서 남은 시간 가져오기 (초 단위)
      const cookieExpiry = VueCookies.get('username', true)?.expiry || null;
      const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
      this.timeLeft = cookieExpiry ? cookieExpiry - currentTime : 1800;

      // 1초마다 timeLeft를 감소시키는 타이머 시작
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          this.logout(); // 시간이 다 되면 로그아웃
          this.clearTimer();
        }
      }, 1000);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer); // 타이머 정지
        this.timer = null;
      }
    },
  },
});