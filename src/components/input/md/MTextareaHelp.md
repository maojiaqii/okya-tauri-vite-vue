<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MTextarea</h1>
</div>

<h2>示例</h2>
```html
<MTextarea v-model="asadas" :autosize="{ minRows: 2, maxRows: 4 }" :minLength=10 :maxLength=100 />
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
   * @description 控件类型
   */
  type: {
    type: String,
    default: 'text',
    validator: (val: string) => ['text', 'textarea', 'password'].includes(val),
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
   * @description 是否可以被清空
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 自动高度
   */
  autosize: {
    type: [Object, Boolean],
    // eslint-disable-next-line vue/require-valid-default-prop
    default: { minRows: 2, maxRows: 2 },
  },
  /**
   * @description 最小长度
   */
  minLength: {
    type: Number,
    default: undefined,
  },
  /**
   * @description 最大长度
   */
  maxLength: {
    type: Number,
    default: undefined,
  },
}
```
<h2>事件</h2>
```js
值改变回调事件，返回值
change(val: string)
```
