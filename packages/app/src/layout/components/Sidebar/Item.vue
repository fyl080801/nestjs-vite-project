<script lang="ts" setup>
const { icon, title } = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});

// export default defineComponent({
//   name: 'MenuItem',
//   functional: true,
//   props: {

//   },
//   render(h, context) {
//     const { icon, title } = context.props;
//     const vnodes = [];

//     if (icon) {
//       if (icon.includes('el-icon')) {
//         vnodes.push();
//       } else {
//         vnodes.push();
//       }
//     }

//     if (title) {
//       vnodes.push();
//     }
//     return vnodes;
//   },
// });
</script>

<template>
  <i v-if="icon && icon.includes('el-icon')" :class="[icon, 'sub-el-icon']" />
  <svg-icon v-if="icon && !icon.includes('el-icon')" :icon-class="icon" />
  <span v-if="title" slot="title">{{ title }}</span>
</template>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
