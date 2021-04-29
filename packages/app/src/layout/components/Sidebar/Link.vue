<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { isExternal } from '../../../utils/validate';

const { to } = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const external = computed(() => isExternal(to));
const type = computed(() => {
  if (external) {
    return 'a';
  }
  return 'router-link';
});

const linkProps = (to) => {
  if (external) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener',
    };
  }
  return {
    to: to,
  };
};
</script>

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
