<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MColorSelect</h1>
</div>

<h2>示例</h2>
```html
<MColorSelect v-model="icon" @change="change" size="large" />
```

<h2>属性</h2>
```js
{
  modelValue: {
    type: [String, Number, Array],
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
   * @description 控件尺寸
   */
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: string)
```
