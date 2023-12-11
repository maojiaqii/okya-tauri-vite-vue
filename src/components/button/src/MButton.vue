<script lang="ts" setup>
import { useAppStore } from '~/stores/app'
import { debounce } from '~/utils'

const props = defineProps({
  /**
   * @description 按钮名称
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * @description 控件尺寸
   */
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
  /**
   * @description 按钮类型
   */
  type: {
    type: String,
    default: 'primary',
    validator: (val: string) => ['primary', 'success', 'warning', 'danger', 'info'].includes(val),
  },
  /**
   * @description 载入状态
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 按钮权限
   */
  perms: {
    type: String,
    default: undefined,
  },
  /**
   * @description 按钮图标
   */
  icon: {
    type: String,
    default: undefined,
  },
  /**
   * @description 朴素按钮
   */
  plain: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 圆形按钮
   */
  circle: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 圆角按钮
   */
  round: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 文字按钮
   */
  text: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 防抖
   */
  debounce: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 防抖延迟（毫秒）
   */
  delay: {
    type: Number,
    default: 300,
  },
})
const emits = defineEmits(['click'])

const app = useAppStore()
const label = ref('')
const icon = ref('')

const click = debounce(() => emits('click'), props.debounce, props.delay)

function hasPerms(perms: string) {
  if (!perms) {
    label.value = props.name
    icon.value = props.icon
    return true
  }
  for (let i = 0; i < app.$state.buttons.length; i++) {
    const bt = app.$state.buttons[i]
    if (bt.perms === perms) {
      label.value = bt.menuName == null ? props.name : bt.menuName
      icon.value = bt.icon == null ? props.icon : bt.icon
      return true
    }
  }
  return false
}
</script>

<template>
  <div v-if="circle && hasPerms(perms)" style="margin-left: 10px;float: left;">
    <el-tooltip placement="top-start" :content="label" :show-after="1000" trigger="hover">
      <el-button :size="size" :type="type" :disabled="disabled" :loading="loading && app.loading" :text="text" circle :plain="plain" dark @click="click">
        <template v-if="icon" #icon>
          <MSvgIcon color="var(--el-text-color-primary)" :icon="icon" />
        </template>
      </el-button>
    </el-tooltip>
  </div>
  <el-button v-else-if="hasPerms(perms) && !circle" :round="round" :text="text" :size="size" :type="type" :loading="loading && app.loading" :disabled="disabled" :plain="plain" dark @click="click">
    <template v-if="icon" #icon>
      <MSvgIcon color="var(--el-text-color-primary)" :icon="icon" />
    </template>
    <slot :label="label">
      <span style="color:var(--el-text-color-primary);">{{ label }}</span>
    </slot>
  </el-button>
</template>
