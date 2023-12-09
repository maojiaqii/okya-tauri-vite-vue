<script lang="ts" setup>
import { generateMD5 } from './utils/md5.js'
import type { ResponseObject } from '~/types'
import { file as fileApi } from '~/api'

const props = defineProps({
  modelValue: {
    type: [Array<string>, String],
    default: [],
  },
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
    default: '/api/file/uploader',
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
  maxCounts: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  query: {
    type: Object,
    default: {},
  },
})
const emits = defineEmits(['update:modelValue', 'change', 'fileAdded', 'fileComplete', 'fileError'])
const { t } = useI18n()
const uploaderRef = ref()
const uploadBtnRef = ref()
const files = ref()
const collapse = ref(false)

const childValue = computed({
  get: () => props.modelValue,
  set: (nv) => {
    console.log(nv)
    emits('update:modelValue', nv)
  },
})

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
    processResponse(response, cb, file, chunk) {
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
  if (props.modelValue) {
    if ((typeof props.modelValue === 'object' && props.modelValue.includes(file.name)) || props.modelValue === file.name) {
      file.status = 'uploaded'
      file.pause()
    }
  }
  if (file.status !== 'uploaded') {
    if (props.maxCounts <= uploaderRef.value.files.length) {
      file.ignored = true
      file.cancel()
      ElNotification.error({
        message: `最多只能上传${props.maxCounts}个文件`,
        duration: 3000,
        position: 'bottom-right',
      })
    }
    if (!file.ignored) {
      // 计算MD5
      computeMD5(file).then((md5: string) => {
        for (const afile of uploaderRef.value.files) {
          if (md5 === afile.uniqueIdentifier) {
            file.ignored = true
            file.cancel()
            ElNotification.error({
              message: `${file.name}已存在！`,
              duration: 3000,
              position: 'bottom-right',
            })
          }
        }
        if (!file.ignored) {
          emits('fileAdded', file)
          startUpload(file, md5)
        }
      }).catch(() => {
      })
    }
  }
}

function onFileSuccess(rootFile: any, file: any, message: string, chunk: any) {
  file.status = 'merging'
  file.progressNum = 100
  fileApi.merge({ identifier: rootFile.uniqueIdentifier }).then((res: ResponseObject) => {
    if (res.code === 200) {
      file.status = 'success'
      ElNotification.success({
        message: `${file.name}上传成功！`,
        duration: 3000,
        position: 'bottom-right',
      })
      childValue.value.push(rootFile.uniqueIdentifier)
      emits('fileComplete', rootFile)
      emits('change', childValue.value)
    }
    else {
      file.status = 'merge-failed'
    }
  }).catch((e) => {
  })
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
        if (file.status !== 'canceled') {
          /* ElNotification.success({
            message,
            dangerouslyUseHTMLString: true,
            duration: 3000,
            position: 'bottom-right',
          }) */
          file.status = 'paused'
          resolve(md5)
        }
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
  if (file.status !== 'canceled' && file.status !== 'uploaded') {
    file.uniqueIdentifier = md5
    file.status = 'waiting'
    file.resume()
  }
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
  file.status = 'canceled'
  file.cancel()
}
function retry(file: any) {
  file.retry()
}
function remove(file: any) {
  file.cancel()
  childValue.value.splice(childValue.value.indexOf(file.uniqueIdentifier), 1)
  emits('change', childValue.value)
}
function download(file: any) {
  let num = 0
  const data = []
  fileApi.downLoadCount({ fileIdentifier: file.uniqueIdentifier }).then((res) => {
    const totalCount = res.data
    if (totalCount > 0) {
      // eslint-disable-next-line no-unused-expressions
      file.status = 'downloading'
      function doDownLoad(count: number) {
        fileApi.downLoad({ fileIdentifier: file.uniqueIdentifier, no: count }).then((res) => {
          if (res.size > 0) {
            data[count] = res
            doDownLoad(num++)
            file.progressNum = ((num / totalCount) * 100).toFixed(0)
          }
          else {
            const blob = new Blob(data)
            // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
            // IE10以上支持blob但是依然不支持download
            if ('download' in document.createElement('a')) {
              // 支持a标签download的浏览器
              const link = document.createElement('a') // 创建a标签
              link.download = file.name // a标签添加属性
              link.style.display = 'none'
              link.href = URL.createObjectURL(blob)
              document.body.appendChild(link)
              link.click() // 执行下载
              URL.revokeObjectURL(link.href) // 释放url
              document.body.removeChild(link) // 释放标签
            }
            else {
              // 其他浏览器
              navigator.msSaveBlob(blob, file.name)
            }
            file.status = 'downloaded'
          }
        }).catch((e) => {
        })
      }
      doDownLoad(num)
    }
  }).catch((e) => {})
}

function preview(file: any) {
  file.status = '12312312'
}

function formatSize(size: number) {
  if (size < 1024)
    return `${size.toFixed(0)} B`
  else if (size < 1024 * 1024)
    return `${(size / 1024.0).toFixed(1)} KB`
  else if (size < 1024 * 1024 * 1024)
    return `${(size / 1024.0 / 1024.0).toFixed(1)} MB`
  else
    return `${(size / 1024.0 / 1024.0 / 1024.0).toFixed(1)} GB`
}

function generateFile(obj: any) {
  if (obj.file.status === 'uploaded') {
    fileApi.getInfo({ fileIdentifier: obj.file.uniqueIdentifier.replace('32-', '') }).then((res: ResponseObject) => {
      if (res.code === 200) {
        obj.file.uniqueIdentifier = res.data.fileIdentifier
        obj.file.name = res.data.fileName
        obj.file.size = res.data.fileSize
        obj.file.uploadBy = res.data.uploadBy
        obj.file.uploadTime = res.data.uploadTime
      }
      else {
        obj.file.status = 'unKnown'
      }
    })
  }
  else {
    obj.file.uploadBy = JSON.parse(sessionStorage.getItem('user')).userCode
    obj.file.uploadTime = new Date().format('yyyy-MM-dd hh:mm:ss')
  }
}

onMounted(() => {
  nextTick(() => {
    if (props.modelValue) {
      if (typeof props.modelValue === 'object') {
        for (const identifier of props.modelValue)
          uploaderRef.value.uploader.addFile(new File([identifier], identifier))
      }
      else {
        uploaderRef.value.uploader.addFile(new File([props.modelValue], props.modelValue))
      }
    }
  })
})
</script>

<template>
  <!-- 上传 -->
  <uploader
    ref="uploaderRef"
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
            <span class="title">{{ `${title}(${fileList.length})` }}</span>
            <div class="operate">
              <a class="icon-btn mx-1" :title="t(collapse ? 'button.expend' : 'button.collapse')" @click="collapse = !collapse">
                <svg w="1em" h="1em">
                  <use :xlink:href="`#icon-${collapse ? 'triangle' : 'triangle_1'}`" />
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
                    {{generateFile(obj)}}
                    <div class="uploader-file-info">
                      <span class="uploader-file-icon1"><i class="uploader-file-icon" :icon="obj.fileCategory" /></span>
                      <span class="uploader-file-name" :title="obj.file.name">
                        {{ obj.file.name }}
                      </span>
                      <div class="uploader-file-size">
                        {{ formatSize(obj.file.size) }}
                      </div>
                      <div class="uploader-file-status">
                        <el-progress
                          v-if="obj.file.status === 'uploading' || obj.file.status === 'md5' || obj.file.status === 'downloading' || obj.file.status === 'merging'"
                          class="upload-progress"
                          text-inside
                          :stroke-width="24"
                          :percentage="parseInt(obj.progress || obj.file.progressNum || '0')"
                          status="success"
                          striped
                          striped-flow
                        >
                          <span v-if="obj.file.status === 'uploading'">{{ `${obj.formatedAverageSpeed}` }}</span>
                          <span v-else>{{ `${obj.progress || obj.file.progressNum}% ${t(`upload-status.${obj.file.status}`)}` }}</span>
                        </el-progress>
                        <span v-else>{{ t(`upload-status.${obj.file.status}`) }}</span>
                      </div>
                      <span class="uploader-file-meta" :title="obj.file.uploadBy">{{obj.file.uploadBy}}</span>
                      <span class="uploader-file-meta" :title="obj.file.uploadTime">{{obj.file.uploadTime}}</span>
                      <div class="uploader-file-actions">
                        <!-- 暂停 -->
                        <a v-if="obj.file.status === 'uploading' || obj.file.status === 'waiting'" class="icon-btn ml-2" :title="t('button.pause')" @click="pause(file)">
                          <svg w="0.8em" h="0.8em" color="orange">
                            <use xlink:href="#icon-pause" />
                          </svg>
                        </a>
                        <!-- 开始 -->
                        <a v-if="obj.file.status === 'paused'" class="icon-btn ml-2" :title="t('button.start')" @click="resume(file)">
                          <svg w="0.8em" h="0.8em" color="green">
                            <use xlink:href="#icon-start" />
                          </svg>
                        </a>
                        <!-- 重试 -->
                        <a v-if="obj.file.status === 'failed'" class="icon-btn ml-2" :title="t('button.retry')" @click="retry(file)">
                          <svg w="0.75em" h="0.75em" color="green">
                            <use xlink:href="#icon-retry" />
                          </svg>
                        </a>
                        <!-- 取消 -->
                        <a v-if="!['success', 'uploaded', 'unKnown', 'downloading', 'downloaded'].includes(obj.file.status)" class="icon-btn ml-2" :title="t('button.cancel')" @click="cancel(file)">
                          <svg w="0.8em" h="0.8em" color="red">
                            <use xlink:href="#icon-cancel" />
                          </svg>
                        </a>
                        <!-- 删除 -->
                        <a v-if="['success', 'uploaded', 'unKnown', 'downloading', 'downloaded'].includes(obj.file.status)" class="icon-btn ml-2" :title="t('button.remove')" @click="remove(file)">
                          <svg w="0.8em" h="0.8em" color="red">
                            <use xlink:href="#icon-close2" />
                          </svg>
                        </a>
                        <!-- 下载 -->
                        <a v-if="['success', 'uploaded', 'downloading', 'downloaded'].includes(obj.file.status)" class="icon-btn ml-2" :title="t('button.download')" @click="download(obj.file)">
                          <svg w="0.8em" h="0.8em">
                            <use xlink:href="#icon-download" />
                          </svg>
                        </a>
                        <!-- 预览 -->
                        <a v-if="['success', 'uploaded', 'downloading', 'downloaded'].includes(obj.file.status)" class="icon-btn ml-2" :title="t('button.preview')" @click="preview(file)">
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
  &.collapse {
    .file-list {
      height: 0;
    }
  }
}

.upload-progress {
  margin-top: 2px;
}

.uploader-file {
  height: 1.5em;
  line-height: 1.5em;
}
.uploader-file-name {
  border-right: 1px solid #cdcdcd;
  width: 38%;
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
  width: 23%;
  text-indent: 20px;
}
.uploader-file-actions {
  width: 7%;
  margin-top: 2px;
}
.uploader-file-icon1 {
  float: left;
  position: relative;
  height: 100%;
  width: 2%;
}

.uploader-file-icon {
  margin-left: 0;
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
