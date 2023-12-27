<script setup lang="ts">
import {useAppStore} from '~/stores/app'

const emits = defineEmits(['clearFilter', 'clearSort'])

const {t} = useI18n()
const app = useAppStore()
const visible =ref(false)

const clearSort = () => {
  emits('clearSort')
}

const clearFilter = () => {
  emits('clearFilter')
}

onMounted(async () => {
})
</script>
<template>
  <div mr-4 mb-1 float-right b-b-1 b-l-1>
    <Transition name="slide-fade">
      <div v-if="visible" float-right>
        <a class="icon-btn mx-2 !outline-none" :title="t('button.clear_sorts')" @click="clearSort">
          <MSvgIcon icon="clear-sorts"/>
        </a>
        <a class="icon-btn mx-2 !outline-none" :title="t('button.clear_filters')" @click="clearFilter">
          <MSvgIcon icon="clear-filters"/>
        </a>
        <el-popover
          placement="bottom"
          :width="600"
          trigger="click"
        >
          <template #reference>
            <a class="icon-btn mx-2 !outline-none" :title="t('button.settings')">
              <MSvgIcon icon="settings-5-line"/>
            </a>
          </template>
          <el-tabs model-value="first">
            <el-tab-pane label="表格配置" name="first">
              <el-checkbox v-model="borderProp" label="边框" size="large"/>
              <el-checkbox v-model="showRowNumProp" label="行号" size="large"/>
              <br>
              <el-checkbox v-model="showCheckBoxProp" label="复选框" size="large"/>
              <el-checkbox v-model="showSumProp" label="合计" size="large"/>
              <br>
              <el-checkbox v-model="showOperationProp" label="操作列" size="large"/>
              <el-checkbox v-model="showPaginationProp" label="分页" size="large"/>
            </el-tab-pane>
            <el-tab-pane label="字段配置" name="second">
              <el-checkbox v-model="borderProp" label="边框" size="large"/>
              <el-checkbox v-model="showRowNumProp" label="行号" size="large"/>
              <br>
              <el-checkbox v-model="showCheckBoxProp" label="复选框" size="large"/>
              <el-checkbox v-model="showSumProp" label="合计" size="large"/>
              <br>
              <el-checkbox v-model="showOperationProp" label="操作列" size="large"/>
              <el-checkbox v-model="showPaginationProp" label="分页" size="large"/>
            </el-tab-pane>
          </el-tabs>
        </el-popover>
      </div>
    </Transition>
    <a class="icon-btn mx-2 !outline-none" :title="t(visible ? 'button.collapse_toolbar' : 'button.expend_toolbar')" @click="visible = !visible">
      <MSvgIcon :icon="visible ? 'right-right' : 'left-left'"/>
    </a>
  </div>
</template>
<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
