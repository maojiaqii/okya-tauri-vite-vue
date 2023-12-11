<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MButton</h1>
</div>

<h2>示例</h2>
```html
<MButton circle @click="buttonClick" icon="left" name="按钮名称" />
```

<h2>属性</h2>
```js
{
  /**
   * @description 按钮名称
   */
  name: {
    type: String,
    default: '',
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
   * @description 按钮类型
   */
  type: {
    type: String,
    default: 'primary',
    validator: (val: string) => ['primary', 'success', 'warning', 'danger', 'info'].includes(val),
  },
  /**
   * @description 载入状态
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 按钮权限
   */
  perms: {
    type: String,
    default: undefined,
  },
  /**
   * @description 按钮图标
   */
  icon: {
    type: String,
    default: undefined,
  },
  /**
   * @description 朴素按钮
   */
  plain: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 圆形按钮
   */
  circle: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 圆角按钮
   */
  round: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 文字按钮
   */
  text: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 防抖
   */
  debounce: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 防抖延迟（毫秒）
   */
  delay: {
    type: Number,
    default: 300,
  }
}
```
