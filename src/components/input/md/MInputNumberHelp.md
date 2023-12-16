<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MInputNumber</h1>
</div>

<h2>示例</h2>
```html
<MInputNumber v-model="inv" placeholder="数字" size="large" @change="inputChange" />
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
   * @description 最小值
   */
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY,
  },
  /**
   * @description 最大值
   */
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  /**
   * @description 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 是否只能输入 step 的倍数
   */
  stepStrictly: Boolean,
  /**
   * @description 是否显示控制按钮
   */
  controls: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 控制按钮位置
   */
  controlsPosition: {
    type: String,
    default: 'right',
    values: ['', 'right'],
  },
  /**
   * @description 精度
   */
  precision: {
    type: Number,
    validator: (val: number) =>
    val >= 0 && val === Number.parseInt(`${val}`, 10),
  },
}
```
<h2>事件</h2>
```js
值改变回调事件，返回值
change(val: number)
```
