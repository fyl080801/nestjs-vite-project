<script lang="ts" setup>
import { useSettingsStore } from '../../../store';
import { computed } from 'vue';
import ThemePicker from '../../../components/ThemePicker/index.vue';
import { ElSwitch } from 'element-plus';

const { state, changeSetting } = useSettingsStore();
const fixedHeader = computed(() => state.fixedHeader);
const tagsView = computed(() => state.showTagsView);
const sidebarLogo = computed(() => state.showSidebarLogo);

const updateFixedHeader = (val) => {
  changeSetting('fixedHeader', val);
};
const updateTagsView = (val) => {
  changeSetting('showTagsView', val);
};
const updateSidebarLogo = (val) => {
  changeSetting('showSidebarLogo', val);
};
const themeChange = (val) => {
  changeSetting('theme', val);
};
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">Page style setting</h3>

      <div class="drawer-item">
        <span>Theme Color</span>
        <ThemePicker
          style="float: right; height: 26px; margin: -3px 8px 0 0"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>Open Tags-View</span>
        <ElSwitch
          :value="tagsView"
          @input="updateTagsView"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>Fixed Header</span>
        <ElSwitch
          :value="fixedHeader"
          @input="updateFixedHeader"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <ElSwitch
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
