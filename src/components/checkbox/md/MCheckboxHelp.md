<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MCheckbox</h1>
</div>

<h2>示例</h2>
```html
<MCheckbox v-model="asadas" :options="options" show-all />
```

<h2>属性</h2>
```js
{
  modelValue: {
    type: [Array<string>, Array<number>, Array<boolean>],
    default: undefined,
  },
  /**
   * @description 选项集
   */
  options: {
    type: Array<ValabelObject>,
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
   * @description 是否显示全部选项
   */
  showAll: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 可被勾选的 checkbox 的最小数量
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * @description 可被勾选的 checkbox 的最大数量
   */
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  }
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: any)
```
