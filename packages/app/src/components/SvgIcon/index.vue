<script lang="ts" setup>
import { defineProps, computed } from 'vue';
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '../../utils/validate';

const { iconClass, className } = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
});

// const { proxy } = getCurrentInstance();
const external = computed(() => isExternal(iconClass));
const iconName = computed(() => `#icon-${iconClass}`);
const svgClass = computed(() => {
  if (className) {
    return `svg-icon ${className}`;
  } else {
    return 'svg-icon';
  }
});
const styleExternalIcon = computed(() => ({
  mask: `url(${iconClass}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`,
}));
</script>

<template>
  <div
    v-if="external"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
