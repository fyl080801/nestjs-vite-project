<script lang="ts" setup>
import { ElButton } from 'element-plus';
// import { mapGetters } from 'vuex';
// import adminDashboard from './admin';
// import editorDashboard from './editor';

// export default {
//   name: 'Dashboard',
//   components: { adminDashboard, editorDashboard },
//   data() {
//     return {
//       currentRole: 'adminDashboard',
//     };
//   },
//   computed: {
//     ...mapGetters(['roles']),
//   },
//   created() {
//     if (!this.roles.includes('admin')) {
//       this.currentRole = 'editorDashboard';
//     }
//   },
// };
</script>

<template>
  <div class="dashboard-container">
    dashboard
    <i class="el-icon-setting"></i>
    <ElButton>xxx</ElButton>
    <!-- <component :is="currentRole" /> -->
  </div>
</template>
