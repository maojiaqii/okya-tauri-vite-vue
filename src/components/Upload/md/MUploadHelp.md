<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MUpload</h1>
</div>

<h2>示例</h2>
```html
<MUpload v-model="asadas" @change="change" @fileComplete="fileComplete"/>
```

<h2>属性</h2>
```js
{
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
  /**
   * @description 最大上传文件数量
   */
  maxCounts: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  /**
   * @description 其他参数
   */
  query: {
    type: Object,
    default: {},
  }
}
```

<h2>事件</h2>
```js
值改变回调事件，返回上传文件列表值
change(val: string | Array<string>)
文件添加事件，返回添加的文件对象
fileAdded(file)
文件上传成功事件，返回上传成功的文件对象
fileComplete(file)
文件上传失败事件，返回上传失败的文件对象和失败信息
fileError(file, message)
```
