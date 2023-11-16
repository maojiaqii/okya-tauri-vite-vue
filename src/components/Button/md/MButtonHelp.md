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
  // 按钮名称标志
  name: {
    type: String,
    default: '',
  },
  // 控件尺寸标志
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
  // 按钮类型标志
  type: {
    type: String,
    default: 'primary',
    validator: (val: string) => ['primary', 'success', 'warning', 'danger', 'info'].includes(val),
  },
  // 载入状态标志
  loading: {
    type: Boolean,
    default: false,
  },
  // 禁用标志
  disabled: {
    type: Boolean,
    default: false,
  },
  // 按钮权限标志
  perms: {
    type: String,
    default: undefined,
  },
  // 按钮图标标志
  icon: {
    type: String,
    default: undefined,
  },
  // 朴素按钮标志
  plain: {
    type: Boolean,
    default: false,
  },
  // 圆形按钮标志
  circle: {
    type: Boolean,
    default: false,
  },
  // 圆角按钮标志
  round: {
    type: Boolean,
    default: false,
  },
  // 文字按钮标志
  text: {
    type: Boolean,
    default: false,
  },
  // 防抖标志
  debounce: {
    type: Boolean,
    default: true,
  },
  // 防抖延迟标志（毫秒）
  delay: {
    type: Number,
    default: 300,
  }
}
```
