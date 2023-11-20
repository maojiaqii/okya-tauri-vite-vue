<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MTimeSelect</h1>
</div>

<h2>示例</h2>
```html
<MTimeSelect v-model="tm" format="HH:mm:ss" @change="inputChange" />
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
   * @description 字符串格式
   */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: undefined,
  },
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: string)
```
