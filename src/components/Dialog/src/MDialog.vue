<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  resizeable: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [String, Number],
    default: '50%',
  },
})

const emits = defineEmits(['closed', 'opened', 'update:modelValue'])

const {
  t,
} = useI18n()

function closed() {
  emits('closed')
}

function opened() {
  emits('opened')
}

const dialogVisible = computed({
  get: () => {
    return props.modelValue
  },
  set: (nv) => {
    emits('update:modelValue', nv)
  },
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible" :draggable="draggable" :width="width" :fullscreen="fullscreen"
    :close-on-click-modal="false" :show-close="false"
    destroy-on-close append-to-body @closed="closed" @opened="opened">
    <template #header="{ close, titleId }">
      <span :id="titleId">{{title}}</span>
      <div float-right>
        <a v-if="resizeable" class="icon-btn mx-1" :title="t(fullscreen ? 'button.minimize' : 'button.maximize')" @click="fullscreen = !fullscreen">
          <svg w="1em" h="1em">
            <use :xlink:href="`#icon-${fullscreen ? 'minimize' : 'maximize'}`"/>
          </svg>
        </a>
        <a class="icon-btn mx-1" :title="t('button.close')" @click="close">
          <svg w="1em" h="1em">
            <use xlink:href="#icon-close-fill"/>
          </svg>
        </a>
      </div>
      <slot name="header" />
    </template>
    <template #default>
      <slot />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<style lang="scss">
.el-dialog__header {
  margin-right: 0!important;
}

.el-dialog {
  margin-top: 2em;
  margin-bottom: 2em;
  .is-fullscreen {
    margin-top: 0;
    margin-bottom: 0;
  }
}

.el-dialog.is-fullscreen {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
