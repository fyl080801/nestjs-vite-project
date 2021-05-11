<script lang="ts" setup>
import {
  reactive,
  computed,
  watch,
  onMounted,
  nextTick,
  ref,
  getCurrentInstance,
} from 'vue';
import { useTagsViewStore, usePermissionStore } from '../../../store';
import { useRoute, useRouter } from 'vue-router';
import ScrollPane from './ScrollPane.vue';
import * as path from 'path';

const { proxy } = getCurrentInstance();
const tag = ref();
const scrollPane = ref();
const {
  state: tagViewState,
  addVisitedView,
  addView,
  updateVisitedView,
  delCachedView,
  delView,
  delOthersViews,
  delAllViews,
} = useTagsViewStore();
const { state: permissionState } = usePermissionStore();
const route = useRoute();
const router = useRouter();
const data = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: [],
});
const visitedViews = computed(() => tagViewState.visitedViews);
const routes = computed(() => permissionState.routes);

const isActive = (route) => {
  return route.path === route.path;
};

const isAffix = (tag) => {
  return tag.meta && tag.meta.affix;
};

const filterAffixTags = (routes, basePath = '/') => {
  let tags = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
};

const initTags = () => {
  const affixTags = (data.affixTags = filterAffixTags(routes.value));
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      addVisitedView(tag);
    }
  }
};

const addTags = () => {
  const { name } = route;
  if (name) {
    addView(route);
  }
  return false;
};

const moveToCurrentTag = () => {
  const tags = tag.value;
  nextTick(() => {
    for (const tag of tags) {
      if (tag.to.path === route.path) {
        scrollPane.value.moveToTarget(tag);
        // when query is different then update
        if (tag.to.fullPath !== route.fullPath) {
          updateVisitedView(route);
        }
        break;
      }
    }
  });
};

const refreshSelectedTag = (view) => {
  delCachedView(view).then(() => {
    const { fullPath } = view;
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath,
      });
    });
  });
};

const closeSelectedTag = (view) => {
  delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view);
    }
  });
};

const closeOthersTags = () => {
  router.push(data.selectedTag);
  delOthersViews(data.selectedTag).then(() => {
    moveToCurrentTag();
  });
};

const closeAllTags = (view) => {
  delAllViews().then(({ visitedViews }) => {
    if (data.affixTags.some((tag) => tag.path === view.path)) {
      return;
    }
    toLastView(visitedViews, view);
  });
};

const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    router.push(latestView.fullPath);
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath });
    } else {
      router.push('/');
    }
  }
};

const openMenu = (tag, e) => {
  const menuMinWidth = 105;
  const offsetLeft = proxy.$el.getBoundingClientRect().left; // container margin left
  const offsetWidth = proxy.$el.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const left = e.clientX - offsetLeft + 15; // 15: margin right

  if (left > maxLeft) {
    data.left = maxLeft;
  } else {
    data.left = left;
  }

  data.top = e.clientY;
  data.visible = true;
  data.selectedTag = tag;
};
const closeMenu = () => {
  data.visible = false;
};
const handleScroll = () => {
  closeMenu();
};

watch(
  () => route,
  () => {
    addTags();
    moveToCurrentTag();
  },
);

watch(
  () => data.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu);
    } else {
      document.body.removeEventListener('click', closeMenu);
    }
  },
);

onMounted(() => {
  initTags();
  addTags();
});
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="data.visible"
      :style="{ left: data.left + 'px', top: data.top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(data.selectedTag)">Refresh</li>
      <li
        v-if="!isAffix(data.selectedTag)"
        @click="closeSelectedTag(data.selectedTag)"
      >
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(data.selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
