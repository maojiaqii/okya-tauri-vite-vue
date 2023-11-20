<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MDateSelect</h1>
</div>

<h2>示例</h2>
```html
<MDateSelect v-model="dt" format="YYYY/MM/DD" disabledDate="after" @change="inputChange" />
```

<h2>属性</h2>
```js
{
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
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
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 控件类型
   */
  type: {
    type: String,
    default: 'date',
    validator: (val: string) => ['year', 'month', 'date', 'datetime', 'week'].includes(val),
  },
  /**
   * @description 字符串格式
   */
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: undefined,
  },
  /**
   * @description 禁用今天之前、之后、今天
   */
  disabledDate: {
    type: String,
    default: undefined,
    validator: (val: string) => ['', 'before', 'after', 'now'].includes(val),
  },
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: string)
```
