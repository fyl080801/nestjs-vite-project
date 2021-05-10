<script lang="ts" setup>
import { computed } from 'vue';
import RightPanel from '../components/RightPanel/index.vue';
import {
  AppMain,
  Navbar,
  Settings,
  Sidebar,
  // TagsView,
} from './components';
import { useResize } from './mixin/ResizeHandler';
import { useSettingsStore, useAppStore, DeviceType } from '../store';

const { state: appState, closeSideBar } = useAppStore();
const { state: settingsState } = useSettingsStore();

const device = computed(() => appState.device);
const showSettings = computed(() => settingsState.showSettings);
const needTagsView = computed(() => settingsState.showTagsView);
const fixedHeader = computed(() => settingsState.fixedHeader);
const classObj = computed(() => {
  return {
    hideSidebar: !appState.sidebar.opened,
    openSidebar: appState.sidebar.opened,
    withoutAnimation: appState.sidebar.withoutAnimation,
    mobile: device.value === DeviceType.Mobile,
  };
});

const handleClickOutside = () => {
  closeSideBar(false);
};

useResize();
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === DeviceType.Mobile && appState.sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <!-- <TagsView v-if="needTagsView" /> -->
      </div>
      <AppMain />
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
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
