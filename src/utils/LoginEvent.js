import { reactive } from 'vue';

const EventBus = reactive({});

export const useEventBus = () => {
  return {
    emit(event, payload) {
      EventBus[event] = payload;
      console.log("로그인이벤트작동");
    },
    on(event, callback) {
      if (EventBus[event]) {
        callback(EventBus[event]);
      }
    },
  };
};