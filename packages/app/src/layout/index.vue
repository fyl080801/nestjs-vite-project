<script lang="ts" setup>
import { computed } from 'vue';
import RightPanel from '../components/RightPanel/index.vue';
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components';
import { useResize } from './mixin/ResizeHandler';
import { useStore } from 'vuex';

const { state, dispatch } = useStore();

const device = computed(() => state.app.device);
const showSettings = computed(() => state.settings.showSettings);
const needTagsView = computed(() => state.settings.tagsView);
const fixedHeader = computed(() => state.settings.fixedHeader);
const classObj = computed(() => {
  return {
    hideSidebar: !state.app.sidebar.opened,
    openSidebar: state.app.sidebar.opened,
    withoutAnimation: state.app.sidebar.withoutAnimation,
    mobile: device.value === 'mobile',
  };
});

const handleClickOutside = () => {
  dispatch('app/closeSideBar', { withoutAnimation: false });
};

useResize();
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && state.app.sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
@import '../styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
