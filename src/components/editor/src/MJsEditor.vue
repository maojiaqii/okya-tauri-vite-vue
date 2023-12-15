<script lang="ts" setup>
import { clickOutside } from '~/directive'
import beautify from "js-beautify";
import type {CmComponentRef} from "codemirror-editor-vue3"
import type {Editor, EditorConfiguration} from "codemirror";
import Codemirror from "codemirror-editor-vue3";
import 'codemirror/theme/darcula.css'
import "codemirror/addon/selection/active-line"
// 代码提示
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
// 代码折叠
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
// 匹配括号
import "codemirror/addon/edit/matchbrackets"
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/display/placeholder.js";

const vClickOutside = clickOutside

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined,
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 录入区域高度
   */
  height: {
    type: Number,
    default: 500,
  },
})
const emits = defineEmits(['update:modelValue', 'change', 'input'])

const contentValue = computed(() => props.modelValue)
const {t} = useI18n()
const cmRef = ref<CmComponentRef>()
const cmOptions: EditorConfiguration = {
  mode: "text/javascript",
  theme: isDark.value ? 'darcula' : 'default',
  spellcheck: true,
  tabSize: 2,
  indentWithTabs: true,
  smartIndent: true,
  readOnly: props.disabled ? "nocursor" : false,
  extraKeys: {
    // 触发按键
    Tab: "autocomplete",
  },
  hintOptions: {
    // 自定义提示选项
    completeSingle: false, // 当匹配只有一项的时候是否自动补全
  },
  foldGutter: true,
  gutters: [
    'CodeMirror-linenumbers',
    'CodeMirror-foldgutter',
    'CodeMirror-lint-markers',
  ],
  styleActiveLine: true,
  matchBrackets: true,
}
const contextMenuLeft = ref('0px')
const contextMenuTop = ref('0px')
const contextMenuOpacity = ref(0)
const contextMenuZIndex = ref(-999)

const onChange = (val: string, cm: Editor) => {
  emits('update:modelValue', val)
  emits('change', val)
}

const onInput = (val: string) => {
  emits('input', val)
}

const onReady = (cm: Editor) => {
  setTimeout(() => {
    cm.setValue(contentValue.value)
  }, 100)
}

function rightClick(contextMenuEvent: MouseEvent) {
  try {
    contextMenuEvent.preventDefault()
  }catch (e) {
  }
  contextMenuLeft.value = `${contextMenuEvent.pageX}px`
  contextMenuTop.value = `${contextMenuEvent.pageY}px`
  contextMenuOpacity.value = 1
  contextMenuZIndex.value = 9999
};

function onClickOutside() {
  contextMenuLeft.value = '0px'
  contextMenuTop.value = '0px'
  contextMenuOpacity.value = 0
  contextMenuZIndex.value = -999
}

const format = () => {
  cmRef.value?.cminstance.setValue(beautify.js(contentValue.value))
}

const clear = () => {
  cmRef.value?.cminstance.setValue('')
}

onMounted(() => {
  cmRef.value?.refresh()
})

onUnmounted(() => {
  cmRef.value?.destroy()
})
</script>
<template>
  <codemirror ref="cmRef"
              :options="cmOptions"
              :placeholder="placeholder ? placeholder : t('component.placeholder_input')"
              border
              :height="height"
              :keepCursorInEnd="true"
              @change="onChange"
              @input="onInput"
              @ready="onReady"
              @contextmenu="rightClick"
  />
  <ul v-click-outside="onClickOutside" class="context_menu">
    <li @click="format"><MSvgIcon mr-1 icon="format" />{{t('button.format')}}</li>
    <li @click="clear"><MSvgIcon mr-1 icon="clear" />{{t('button.clear')}}</li>
  </ul>
</template>

<style scoped lang="scss">
.context_menu {
  font-size: 1em;
  line-height: 2em;
  width: 8em;
  border: 1px solid lightgrey;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.09);
  position: absolute;
  left: v-bind(contextMenuLeft);
  top: v-bind(contextMenuTop);
  z-index: v-bind(contextMenuZIndex);
  opacity: v-bind(contextMenuOpacity);

  li {
    display: flex;
    justify-content: left;
    align-items: center;
    list-style-type: none;
    padding: 0.1em;
    background-color: var(--c-bg);
    border-radius: 4px;
    cursor: pointer;
  }

  li:hover {
    background-color: rgb(240 240 240 / 99%);
  }
}
</style>
