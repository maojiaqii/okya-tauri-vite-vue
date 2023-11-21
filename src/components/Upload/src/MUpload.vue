<script lang="ts" setup>
const props = defineProps({
  /**
   * @description 标题
   */
  title: {
    type: String,
    default: '附件',
  },
  /**
   * @description 远程上传接口地址
   */
  target: {
    type: String,
    default: 'http://localhost:3000/uploadzzz',
  },
  /**
   * @description 分片大小2M/片
   */
  chunkSize: {
    type: Number,
    default: 2 * 1024 * 1024,
  },
  /**
   * @description 上传文件时文件的参数名
   */
  fileParameterName: {
    type: String,
    default: 'file',
  },
  /**
   * @description 最大自动失败重试上传次数
   */
  maxChunkRetries: {
    type: Number,
    default: 3,
  },
  /**
   * @description 允许上传的文件类型
   */
  accept: {
    type: Array<String>,
    default: undefined,
  },
  /**
   * @description 是否支持多选文件
   */
  multiple: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 服务器分片校验函数，秒传及断点续传基础
   */
  checkChunkUploadedByResponse: function (chunk, message) {
    console.log(message)
    const skip = false
    /* try {
      let objMessage = JSON.parse(message)
      if (objMessage.skipUpload) {
        skip = true
      } else {
        skip = (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
      }
    } catch (e) {} */
    return skip
  },
})
const emits = defineEmits(['fileAdded'])
const { t } = useI18n()
const uploaderRef = ref()
const uploadBtnRef = ref()
const files = ref()
const collapse = ref(false)
const fileStatusText = {
  success: '上传成功',
  error: '上传失败',
  uploading: '上传中',
  paused: '已暂停',
  waiting: '等待上传',
}

const initProps = computed(() => {
  return { target: props.target, chunkSize: props.chunkSize, fileParameterName: props.fileParameterName, maxChunkRetries: props.maxChunkRetries, singleFile: !props.multiple }
})

function onFileAdded(file: any, event: any) {
  emits('fileAdded', file)
  console.log('onFileAdded', file, event)
}

function onFileSuccess(rootFile: any, file: any, message: string, chunk: any) {
  console.log('onFileSuccess', rootFile, file, message, chunk)
}

function onFileProgress(rootFile: any, file: any, chunk: any) {
  console.log('onFileProgress', rootFile, file, chunk)
}

function onFileError(rootFile: any, file: any, message: string, chunk: any) {
  console.log('onFileAdded', rootFile, file, message, chunk)
}

onMounted(()=>{
  // 设置允许上传的文件类型
  nextTick(()=>{
    if(props.accept){
      uploadBtnRef.value?.btn.control?.setAttribute('accept', props.accept.join())
    }
  })
})
</script>

<template>
  <!-- 上传 -->
  <uploader
    ref="uploaderRef"
    class="uploader-app"
    :options="initProps"
    :file-status-text="fileStatusText"
    :auto-start="false"
    @file-added="onFileAdded"
    @file-success="onFileSuccess"
    @file-progress="onFileProgress"
    @file-error="onFileError"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-list>
      <template #default="{fileList}">
        <div class="file-panel" :class="{ collapse }">
          <div class="file-title">
            <span class="title">{{ title }}</span>
            <div class="operate">
              <a class="icon-btn mx-1" :title="t(collapse ? 'button.minimize' : 'button.maximize')"
                 @click="collapse = !collapse"
              >
                <svg w="1em" h="1em">
                  <use :xlink:href="`#icon-${collapse ? 'minimize' : 'maximize'}`"/>
                </svg>
              </a>
            </div>
          </div>
          <ul class="file-list">
            <el-scrollbar max-height="10em">
              <li
                v-for="file in fileList"
                :key="file.id"
                class="file-item"
              >
                <uploader-file
                  ref="files"
                  :class="[`file_${file.id}`]"
                  :file="file"
                  :list="true"
                >
                  <template #default="obj">
                    <div class="uploader-file-progress" :class="obj.progressingClass" :style="obj.progressStyle"></div>
                    <div class="uploader-file-info">
                      <div class="uploader-file-name"><i class="uploader-file-icon" :icon="obj.fileCategory"></i>{{file.name}}</div>
                      <div class="uploader-file-size">{{obj.formatedSize}}</div>
                      <div class="uploader-file-meta"></div>
                      <div class="uploader-file-status">
                        <span v-show="obj.status !== 'uploading'">{{statusText}}</span>
                        <span v-show="obj.status === 'uploading'">
                          <span>{{obj.progressStyle.progress}}&nbsp;</span>
                          <em>{{obj.formatedAverageSpeed}}&nbsp;</em>
                          <i>{{obj.formatedTimeRemaining}}</i>
                        </span>
                      </div>
                      <div class="uploader-file-actions">
                        <span class="uploader-file-pause" @click="pause"></span>
                        <span class="uploader-file-resume" @click="resume">️</span>
                        <span class="uploader-file-retry" @click="retry"></span>
                        <span class="uploader-file-remove" @click="remove"></span>
                      </div>
                    </div>
                  </template>
                </uploader-file>
              </li>
              <li v-if="!fileList.length">
                暂无待上传文件
              </li>
            </el-scrollbar>
          </ul>
        </div>
      </template>
    </uploader-list>
    <div>
      <uploader-btn id="global-uploader-btn" ref="uploadBtnRef">
        <a class="uploader-btn-class" :title="t('button.upload')">
          <svg w="1em" h="1em">
            <use xlink:href="#icon-upload"/>
          </svg>
        </a>
      </uploader-btn>
    </div>
  </uploader>
</template>

<style lang="scss">
.file-panel {
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 7px 7px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .file-title {
    display: flex;
    height: 1.5em;
    line-height: 1.5em;
    padding: 0 15px;
    border-bottom: 1px solid #ddd;
    background-color: var(--c-bg);

    .title {
    }

    .operate {
      flex: 1;
      text-align: right;
    }
  }

  .file-list {
    position: relative;
    background-color: var(--c-bg);
    transition: all 0.3s;

    .file-item {
      background-color: var(--c-bg);
    }
  }

  &.collapse {
    .file-title {
      background-color: var(--c-bg);
    }

    .file-list {
      height: 0;
    }
  }
}

.no-file {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;

  svg {
    vertical-align: text-bottom;
  }
}

.uploader-file {
  &.md5 {
    .uploader-file-resume {
      display: none;
    }
  }
}

.uploader-file-icon {
  &:before {
    content: '' !important;
  }

  &[icon='image'] {
    background: url(./images/image-icon.png);
  }

  &[icon='audio'] {
    background: url(./images/audio-icon.png);
    background-size: contain;
  }

  &[icon='video'] {
    background: url(./images/video-icon.png);
  }

  &[icon='document'] {
    background: url(./images/text-icon.png);
  }

  &[icon='unknown'] {
    background: url(./images/zip.png) no-repeat center;
    background-size: contain;
  }
}

.uploader-file-actions > span {
  margin-right: 6px;
}

.custom-status {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

#global-uploader-btn {
  height: 1.5em;
  position: relative;
  background-color: rgb(245, 245, 245, 20%);
  border: 1px dashed lightgrey;
  width: 100%;

  .uploader-btn-class {
    display: inline-block;
    margin-bottom: 1em;
  }
}

#global-uploader-btn:hover {
  box-shadow: inset 0px 0px 10px lightgrey;
}
</style>
