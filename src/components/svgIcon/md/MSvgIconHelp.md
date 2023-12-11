<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MSvgIcon</h1>
</div>

<h2>示例</h2>
```html
<MSvgIcon :icon="icon" />
```

<h2>属性</h2>
```js
{
  // SVG 图标名称或在线URL或xml
  icon: {
    type: String,
    required: true,
  },
  // 颜色值
  color: {
    type: String,
    default: '#1296db',
  },
  // 宽高
  size: {
    type: String,
    default: '1.3em',
  }
}
```
