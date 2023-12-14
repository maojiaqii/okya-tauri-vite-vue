<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MRichEditor</h1>
</div>

<h2>示例</h2>
```html
<MRichEditor v-model="dt" />
```

<h2>属性</h2>
```js
{
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: undefined,
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
}
```
