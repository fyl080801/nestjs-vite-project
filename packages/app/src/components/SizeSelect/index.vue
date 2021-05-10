<script lang="ts" setup>
import {
  computed,
  nextTick,
  // getCurrentInstance
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  ElTooltip,
  ElMessage,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
} from 'element-plus';
import { useAppStore, useTagsViewStore } from '../../store';

// const { proxy } = getCurrentInstance();
const { state, setSize } = useAppStore();
const { delAllCachedViews } = useTagsViewStore();
const route = useRoute();
const router = useRouter();
const sizeOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Medium', value: 'medium' },
  { label: 'Small', value: 'small' },
  { label: 'Mini', value: 'mini' },
];

const size = computed(() => {
  return state.size;
});

const handleSetSize = (size) => {
  // proxy['$ELEMENT'].size = size;
  setSize(size);
  refreshView();
  ElMessage.success({
    message: 'Switch Size Success',
    type: 'success',
  });
};

const refreshView = () => {
  // In order to make the cached page re-rendered
  delAllCachedViews();

  const { fullPath } = route;

  nextTick(() => {
    router.replace({
      path: '/redirect' + fullPath,
    });
  });
};
</script>

<template>
  <ElTooltip content="Global Size" effect="dark" placement="bottom">
    <ElDropdown trigger="click" @command="handleSetSize">
      <div>
        <svg-icon class-name="size-icon" icon-class="size" />
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem
            v-for="item of sizeOptions"
            :key="item.value"
            :disabled="size === item.value"
            :command="item.value"
          >
            {{ item.label }}
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </ElTooltip>
</template>
