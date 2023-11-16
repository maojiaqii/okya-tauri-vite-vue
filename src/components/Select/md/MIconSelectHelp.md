<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MSvgIcon</h1>
</div>

<h2>示例</h2>
```html
<MIconSelect v-model="icon" @change="change" size="large" />
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
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: string)
```
