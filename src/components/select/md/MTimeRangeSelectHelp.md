<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MTimeRangeSelect</h1>
</div>

<h2>示例</h2>
```html
<MTimeRangeSelect v-model="asadas" format="HH:mm:ss" @change="change" />
```

<h2>属性</h2>
```js
{
  modelValue: {
    type: Array<string | number>,
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
   * @description 字符串格式
   */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /**
   * @description 开始时间的占位内容
   */
  startPlaceholder: {
    type: String,
    default: undefined,
  },
  /**
   * @description 结束时间的占位内容
   */
  endPlaceholder: {
    type: String,
    default: undefined,
  },
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: any)
```
