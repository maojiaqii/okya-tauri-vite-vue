<script lang="ts" setup>
import { generateMD5 } from './utils/md5.js'

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
    default: 'http://localhost:11001/file/uploader',
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
    type: [Array<string>, String],
    default: '*.*',
  },
  /**
   * @description 是否支持多选文件
   */
  multiple: {
    type: Boolean,
    default: true,
  },
  query: {
    type: Object,
    default: {},
  },
})
const emits = defineEmits(['fileAdded', 'fileSuccess', 'fileError'])
const { t } = useI18n()
const uploaderRef = ref()
const uploadBtnRef = ref()
const files = ref()
const collapse = ref(false)

const initProps = computed(() => {
  return {
    target: props.target,
    chunkSize: props.chunkSize,
    fileParameterName: props.fileParameterName,
    maxChunkRetries: props.maxChunkRetries,
    singleFile: !props.multiple,
    /**
     * @description 服务器分片校验函数，秒传及断点续传基础
     */
    checkChunkUploadedByResponse(chunk, message) {
      let objMessage = {}
      try {
        objMessage = JSON.parse(message)
      }
      catch (e) {}
      return (objMessage.data || []).includes(chunk.offset + 1)
    },
    /**
     * @description 处理上传的业务返回
     */
    processResponse(response, cb, file, chunk){
      let objMessage = {}
      try {
        objMessage = JSON.parse(response)
      }
      catch (e) {}
      // true时出发fileError事件
      cb(!(objMessage.code && objMessage.code === 200), response)
    },
    query: props.query,
    testChunks: true,
    headers: {
      Authorization: sessionStorage.getItem('token'),
    },
  }
})

async function onFileAdded(file: any, event: any) {
  emits('fileAdded', file)
  // 计算MD5
  computeMD5(file).then((md5: string) => {
    startUpload(file, md5)
  }).catch(() => {})
}

function onFileSuccess(rootFile: any, file: any, message: string, chunk: any) {
  file.status = 'success'
  ElNotification.success({
    message: `${file.name}上传成功！`,
    duration: 3000,
    position: 'bottom-right',
  })
  emits('fileSuccess', file, message)
}

function onFileProgress(rootFile: any, file: any, chunk: any) {
  if (file.status === 'waiting')
    file.status = 'uploading'
}

function onFileError(rootFile: any, file: any, message: string, chunk: any) {
  file.pause()
  file.status = 'failed'
  ElNotification.error({
    message: `${file.name}上传失败！`,
    duration: 3000,
    position: 'bottom-right',
  })
  emits('fileError', file, message)
}

function computeMD5(file: any) {
  // 暂停文件
  file.pause()
  // 文件状态设为"计算MD5"
  file.status = 'md5'
  // 开始计算MD5
  return new Promise((resolve: any, reject: any) => {
    generateMD5(file, props.chunkSize, {
      onProgress(currentChunk: number, chunks: number) {
        // 实时展示MD5的计算进度
        nextTick(() => {
          file.progressNum = ((currentChunk / chunks) * 100).toFixed(0)
        })
      },
      onSuccess(md5: string, message: string) {
        ElNotification.success({
          message,
          dangerouslyUseHTMLString: true,
          duration: 3000,
          position: 'bottom-right',
        })
        file.status = 'paused'
        resolve(md5)
      },
      onError() {
        ElNotification.success({
          message: `文件${file.name}读取出错，请检查该文件`,
          duration: 3000,
          position: 'bottom-right',
        })
        file.status = 'error'
        // file.cancel()
        reject()
      },
    })
  })
}
// md5计算完毕，开始上传
function startUpload(file: any, md5: string) {
  file.uniqueIdentifier = md5
  file.status = 'waiting'
  file.resume()
}

function pause(file: any) {
  file.pause()
  file.status = 'paused'
}
function resume(file: any) {
  file.status = 'waiting'
  file.resume()
}
function cancel(file: any) {
  file.cancel()
}
function retry(file: any) {
  file.retry()
}

onMounted(() => {
})
</script>

<template>
  <!-- 上传 -->
  <uploader
    ref="uploaderRef"
    class="uploader-app"
    :options="initProps"
    :auto-start="false"
    @file-added="onFileAdded"
    @file-success="onFileSuccess"
    @file-progress="onFileProgress"
    @file-error="onFileError"
  >
    <uploader-unsupport />
    <uploader-list>
      <template #default="{ fileList }">
        <div class="file-panel" :class="{ collapse }">
          <div class="file-title">
            <span class="title">{{ title }}</span>
            <div class="operate">
              <a class="icon-btn mx-1" :title="t(collapse ? 'button.minimize' : 'button.maximize')" @click="collapse = !collapse">
                <svg w="1em" h="1em">
                  <use :xlink:href="`#icon-${collapse ? 'minimize' : 'maximize'}`" />
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
                    <div class="uploader-file-info">
                      <span class="uploader-file-name" :title="file.name"><i class="uploader-file-icon" :icon="obj.fileCategory" />{{ file.name }}</span>
                      <div class="uploader-file-size">
                        {{ obj.formatedSize }}
                      </div>
                      <div class="uploader-file-meta" />
                      <div class="uploader-file-status">
                        <el-progress
                          v-if="obj.file.status === 'uploading' || obj.file.status === 'md5'"
                          class="upload-progress"
                          :stroke-width="24"
                          :percentage="parseInt(obj.progress || obj.file.progressNum || '0')"
                          status="success"
                          striped
                          striped-flow
                        >
                          <span v-if="obj.file.status === 'uploading'">{{ `${obj.formatedAverageSpeed}   ${obj.formatedTimeRemaining}` }}</span>
                          <span v-else>{{ `${obj.progress || obj.file.progressNum}% ` + t(`upload-status.${obj.file.status}`) }}</span>
                        </el-progress>
                        <span v-else>{{ t(`upload-status.${obj.file.status}`) }}</span>
                      </div>
                      <div class="uploader-file-actions">
                        <!-- 暂停 -->
                        <a v-if="obj.file.status === 'uploading' || obj.file.status === 'waiting'" class="icon-btn ml-2" :title="t('button.pause')" @click="pause(file, obj)">
                          <svg w="0.8em" h="0.8em">
                            <use xlink:href="#icon-pause" />
                          </svg>
                        </a>
                        <!-- 开始 -->
                        <a v-if="obj.file.status === 'paused'" class="icon-btn ml-2" :title="t('button.start')" @click="resume(file, obj)">
                          <svg w="0.8em" h="0.8em">
                            <use xlink:href="#icon-start" />
                          </svg>
                        </a>
                        <!-- 重试 -->
                        <a v-if="obj.file.status === 'failed'" class="icon-btn ml-2" :title="t('button.retry')" @click="retry(file, obj)">
                          <svg w="0.75em" h="0.75em">
                            <use xlink:href="#icon-retry" />
                          </svg>
                        </a>
                        <!-- 取消 -->
                        <a v-if="obj.file.status !== 'success'" class="icon-btn ml-2" :title="t('button.cancel')" @click="cancel(file, obj)">
                          <svg w="0.8em" h="0.8em">
                            <use xlink:href="#icon-cancel" />
                          </svg>
                        </a>
                        <!-- 删除 -->
                        <a v-if="obj.file.status === 'success'" class="icon-btn ml-2" :title="t('button.remove')" @click="remove(file, obj)">
                          <svg w="0.8em" h="0.8em">
                            <use xlink:href="#icon-close2" />
                          </svg>
                        </a>
                        <!-- 下载 -->
                        <a v-if="obj.file.status === 'success'" class="icon-btn ml-2" :title="t('button.download')" @click="download(file, obj)">
                          <svg w="0.8em" h="0.8em">
                            <use xlink:href="#icon-download" />
                          </svg>
                        </a>
                        <!-- 预览 -->
                        <a v-if="obj.file.status === 'success'" class="icon-btn ml-2" :title="t('button.preview')" @click="preview(file, obj)">
                          <svg w="0.8em" h="0.8em">
                            <use xlink:href="#icon-preview" />
                          </svg>
                        </a>
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
      <uploader-btn id="global-uploader-btn" ref="uploadBtnRef" :attrs="{ accept: typeof props.accept === 'object' ? props.accept.join() : props.accept }">
        <a class="uploader-btn-class" :title="t('button.upload')">
          <svg w="1em" h="1em">
            <use xlink:href="#icon-upload" />
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
}

.upload-progress {
  margin-top: 2px;
  width: 98%;
}

.uploader-file {
  height: 1.5em;
  line-height: 1.5em;
}

.uploader-file-name {
  border-right: 1px solid #cdcdcd;
  width: 40%;
  overflow: hidden;
  float: left;
  display: inline-flex;
  text-indent: 5px;
}

.uploader-file-size {
  width: 10%;
  border-right: 1px solid #cdcdcd;
  text-indent: 10px;
}
.uploader-file-meta {
  border-right: 1px solid #cdcdcd;
  width: 10%;
}
.uploader-file-status {
  border-right: 1px solid #cdcdcd;
  width: 33%;
  text-indent: 20px;
}
.uploader-file-actions {
  width: 7%;
  margin-top: 2px;
}

.uploader-file-icon {
  margin-left: 5px;
  margin-right: 0;
  margin-top: 2px;
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
