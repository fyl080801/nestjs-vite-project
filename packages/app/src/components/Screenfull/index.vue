<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import * as screenfull from 'screenfull';
import { ElMessage } from 'element-plus';

const isFullscreen = ref(false);

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning({ message: 'you browser can not work', type: 'warning' });
    return false;
  }
  screenfull.toggle();
};

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change);
  }
};

const destroy = () => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change);
  }
};

onBeforeUnmount(() => {
  destroy();
});

onMounted(() => {
  init();
});
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
