const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

import { watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export const useResize = () => {
  const route = useRoute();
  const { state, dispatch } = useStore();

  const $_isMobile = () => {
    const rect = body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };

  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = $_isMobile();
      dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop');

      if (isMobile) {
        dispatch('app/closeSideBar', { withoutAnimation: true });
      }
    }
  };

  watch(
    () => route,
    () => {
      if (state.app.device === 'mobile' && state.app.sidebar.opened) {
        dispatch('app/closeSideBar', { withoutAnimation: false });
      }
    },
  );

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler);
  });

  onMounted(() => {
    const isMobile = $_isMobile();

    if (isMobile) {
      dispatch('app/toggleDevice', 'mobile');
      dispatch('app/closeSideBar', { withoutAnimation: true });
    }
  });
};
