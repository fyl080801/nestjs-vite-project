const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

import { watch, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore, DeviceType } from '../../store';

export const useResize = () => {
  const route = useRoute();
  const { state, toggleDevice, closeSideBar } = useAppStore();

  const $_isMobile = () => {
    const rect = body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  };

  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = $_isMobile();
      toggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);

      if (isMobile) {
        closeSideBar(true);
      }
    }
  };

  watch(
    () => route.path,
    () => {
      if (state.device === DeviceType.Mobile && state.sidebar.opened) {
        closeSideBar(false);
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
      toggleDevice(DeviceType.Mobile);
      closeSideBar(true);
    }
  });
};
