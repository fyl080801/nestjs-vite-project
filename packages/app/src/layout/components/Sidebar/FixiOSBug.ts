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
import { useStore } from 'vuex';

export const useFixOSBug = (subMenu) => {
  const { state } = useStore();

  const device = computed(() => state.app.device);

  const fixBugIniOS = () => {
    if (subMenu) {
      const handleMouseleave = subMenu.handleMouseleave;
      subMenu.handleMouseleave = (e) => {
        if (device.value === 'mobile') {
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
