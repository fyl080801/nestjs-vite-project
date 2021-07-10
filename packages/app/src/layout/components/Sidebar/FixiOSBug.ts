// export default {
//   computed: {
//     device() {
//       return this.$store.state.app.device
//     }
//   },
//   mounted() {
//     // In order to fix the click on menu on the ios device will trigger the mouseleave bug
//     // https://github.com/PanJiaChen/vue-element-admin/issues/1135
//     this.fixBugIniOS()
//   },
//   methods: {
//
//   }
// }

import { computed, onMounted } from 'vue';
import { DeviceType, useAppStore } from '../../../store';

export const useFixOSBug = (subMenu) => {
  const { state } = useAppStore();

  const device = computed(() => state.device);

  const fixBugIniOS = () => {
    if (subMenu) {
      const handleMouseleave = subMenu.handleMouseleave;
      subMenu.handleMouseleave = (e) => {
        if (device.value === DeviceType.Mobile) {
          return;
        }
        handleMouseleave(e);
      };
    }
  };

  onMounted(() => {
    fixBugIniOS();
  });

  return { device, fixBugIniOS };
};
