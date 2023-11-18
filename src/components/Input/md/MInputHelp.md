<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MSvgIcon</h1>
</div>

<h2>示例</h2>
```html
<MInput v-model="asadas" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" :minLength=10 :maxLength=100 />
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
  // 绑定数据标志
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
  },
  // 占位内容标志
  placeholder: {
    type: String,
    default: undefined,
  },
  // 控件类型标志
  type: {
    type: String,
    default: 'text',
    validator: (val: string) => ['text', 'textarea', 'password'].includes(val),
  },
  // 控件尺寸标志
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
  // 是否禁用标志
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否可清空标志
  clearable: {
    type: Boolean,
    default: true,
  },
  // type=textarea时，高度是否自适应
  autosize: {
    type: [Object, Boolean],
    default: { minRows: 2, maxRows: 2 },
  },
  // 最小输入长度标志
  minLength: {
    type: Number,
    default: undefined,
  },
  // 最大输入长度标志
  maxLength: {
    type: Number,
    default: undefined,
  },
}
```
