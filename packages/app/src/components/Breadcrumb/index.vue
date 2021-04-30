<template>
  <ElBreadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <ElBreadcrumbItem v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </ElBreadcrumbItem>
    </transition-group>
  </ElBreadcrumb>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as pathToRegexp from 'path-to-regexp';
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';

const route = useRoute();
const router = useRouter();
const levelList = ref(null);

const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];

  const dashboardMatch: any = {
    path: '/dashboard',
    meta: { title: 'Dashboard' },
  };
  if (!isDashboard(first)) {
    matched = [dashboardMatch].concat(matched);
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false,
  );
};

const isDashboard = (route) => {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
};

const pathCompile = (path) => {
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const { params } = route;
  var toPath = pathToRegexp.compile(path);
  return toPath(params);
};

const handleLink = (item) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(pathCompile(path));
};

watch(
  () => route,
  () => {
    if (route.path.startsWith('/redirect/')) {
      return;
    }
    getBreadcrumb();
  },
);

getBreadcrumb();
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
