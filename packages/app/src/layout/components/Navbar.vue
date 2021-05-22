<script lang="ts" setup>
import { computed } from 'vue';
import Breadcrumb from '../../components/Breadcrumb/index.vue';
import Hamburger from '../../components/Hamburger/index.vue';
import ErrorLog from '../../components/ErrorLog/index.vue';
import Screenfull from '../../components/Screenfull/index.vue';
// import SizeSelect from '../../components/SizeSelect/index.vue';
// import Search from '../../components/HeaderSearch';
import { useAppStore, useUserStore, DeviceType } from '../../store';
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMessageBox,
} from 'element-plus';

const { state: appState, toggleSideBar } = useAppStore();
const { state: userState, userLogout } = useUserStore();
const sidebar = computed(() => appState.sidebar);
const avatar = computed(() => userState.avatar);
const device = computed(() => appState.device);

const logout = async () => {
  try {
    await ElMessageBox.confirm('是否退出？', '退出');
    await userLogout();
    window.location.reload();
  } catch {
    // cancel
  }
};
</script>

<template>
  <div class="navbar">
    <Hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== DeviceType.Mobile">
        <!-- <search id="header-search" class="right-menu-item" /> -->
        <ErrorLog class="errLog-container right-menu-item hover-effect" />
        <Screenfull id="screenfull" class="right-menu-item hover-effect" />
        <!-- <SizeSelect id="size-select" class="right-menu-item hover-effect" /> -->
      </template>

      <ElDropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <ElDropdownMenu>
            <router-link to="/profile/index">
              <ElDropdownItem>Profile</ElDropdownItem>
            </router-link>
            <router-link to="/">
              <ElDropdownItem>Dashboard</ElDropdownItem>
            </router-link>
            <a
              target="_blank"
              href="https://github.com/PanJiaChen/vue-element-admin/"
            >
              <ElDropdownItem>Github</ElDropdownItem>
            </a>
            <a
              target="_blank"
              href="https://panjiachen.github.io/vue-element-admin-site/#/"
            >
              <ElDropdownItem>Docs</ElDropdownItem>
            </a>
            <ElDropdownItem divided @click.native="logout">
              <span :style="{ display: 'block' }">Log Out</span>
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
