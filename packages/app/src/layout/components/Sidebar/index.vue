<script lang="ts" setup>
import { computed } from 'vue';
// import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';
import variables from '../../../styles/variables.scss';
import { ElScrollbar, ElMenu } from 'element-plus';
import {
  useSettingsStore,
  useAppStore,
  usePermissionStore,
} from '../../../store';

const { state: settingsState } = useSettingsStore();
const { state: appState } = useAppStore();
const { state: permissionState } = usePermissionStore();

const route = useRoute();
const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
const showLogo = computed(() => settingsState.showSidebarLogo);
const isCollapse = computed(() => !appState.sidebar.opened);
const permission_routes = computed(() => permissionState.routes);
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <ElScrollbar wrap-class="scrollbar-wrapper">
      <ElMenu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables['menuBg']"
        :text-color="variables['menuText']"
        :unique-opened="false"
        :active-text-color="variables['menuActiveText']"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </ElMenu>
    </ElScrollbar>
  </div>
</template>
