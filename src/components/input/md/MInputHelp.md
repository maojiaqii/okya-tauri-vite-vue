<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MInput</h1>
</div>

<h2>示例</h2>
```html
<MInput v-model="asadas">
  <template #prefix>
    <MSvgIcon icon="translate" />
  </template>
  <template #append>
    123
  </template>
</MInput>
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
