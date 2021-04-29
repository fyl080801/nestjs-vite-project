<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ThemePicker from '../../../components/ThemePicker/index.vue';

const { state, dispatch } = useStore();
const fixedHeader = computed(() => state.settings.fixedHeader);
const tagsView = computed(() => state.settings.tagsView);
const sidebarLogo = computed(() => state.settings.sidebarLogo);

const updateFixedHeader = (val) => {
  dispatch('settings/changeSetting', {
    key: 'fixedHeader',
    value: val,
  });
};
const updateTagsView = (val) => {
  dispatch('settings/changeSetting', {
    key: 'tagsView',
    value: val,
  });
};
const updateSidebarLogo = (val) => {
  dispatch('settings/changeSetting', {
    key: 'sidebarLogo',
    value: val,
  });
};
const themeChange = (val) => {
  dispatch('settings/changeSetting', {
    key: 'theme',
    value: val,
  });
};
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Page style setting</h3>

      <div class="drawer-item">
        <span>Theme Color</span>
        <theme-picker
          style="float: right; height: 26px; margin: -3px 8px 0 0"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>Open Tags-View</span>
        <el-switch
          :value="tagsView"
          @input="updateTagsView"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>Fixed Header</span>
        <el-switch
          :value="fixedHeader"
          @input="updateFixedHeader"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch
          :value="sidebarLogo"
          @input="updateSidebarLogo"
          class="drawer-switch"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
