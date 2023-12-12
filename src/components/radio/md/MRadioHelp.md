<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MRadio</h1>
</div>

<h2>示例</h2>
```html
<MRadio v-model="inv" :options="options" show-blank />
```

<h2>属性</h2>
```js
{
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description 选项集
   */
  options: {
    type: Array <ValabelObject>,
    default: [],
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
   * @description 是否显示空值选项
   */
  showBlank: {
    type: Boolean,
    default: true,
  }
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: any)
```
