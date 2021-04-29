<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Logo from './Logo.vue';
import SidebarItem from './SidebarItem.vue';
import variables from '../../../styles/variables.scss';

const route = useRoute();
const { state } = useStore();
const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
const showLogo = computed(() => state.settings.sidebarLogo);
const isCollapse = computed(() => !state.app.sidebar.opened);
const permission_routes = computed(() => state.permission.routes);
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables['menuBg']"
        :text-color="variables['menuText']"
        :unique-opened="false"
        :active-text-color="variables['menuActiveText']"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
