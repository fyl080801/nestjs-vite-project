<template>
  <div v-if="errorLogs.length > 0">
    <ElBadge
      :is-dot="true"
      style="line-height: 25px; margin-top: -5px"
      @click.native="dialogTableVisible = true"
    >
      <ElButton style="padding: 8px 10px" size="small" type="danger">
        <svg-icon icon-class="bug" />
      </ElButton>
    </ElBadge>

    <ElDialog v-model="dialogTableVisible" width="80%" :append-to-body="true">
      <div slot="title">
        <span style="padding-right: 10px">Error Log</span>
        <ElButton
          size="mini"
          type="primary"
          icon="el-icon-delete"
          @click="clearAll"
        >
          Clear All
        </ElButton>
      </div>
      <ElTable :data="errorLogs" border>
        <ElTableColumn label="Message">
          <template v-slot="{ row }">
            <div>
              <span class="message-title">Msg:</span>
              <ElTag type="danger">
                {{ row.err.message }}
              </ElTag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 10px"
                >Info:
              </span>
              <ElTag type="warning">
                {{ row.vm.$vnode.tag }} error in {{ row.info }}
              </ElTag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 16px"
                >Url:
              </span>
              <ElTag type="success">
                {{ row.url }}
              </ElTag>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Stack">
          <template v-slot="scope">
            {{ scope.row.err.stack }}
          </template>
        </ElTableColumn>
      </ElTable>
    </ElDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useErrorLogStore } from '../../store';
import {
  ElBadge,
  ElButton,
  ElDialog,
  ElTag,
  ElTable,
  ElTableColumn,
} from 'element-plus';

const { state, clearErrorLog } = useErrorLogStore();
const dialogTableVisible = ref(false);
const errorLogs = computed(() => state.logs);
const clearAll = () => {
  dialogTableVisible.value = false;
  clearErrorLog();
};
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
