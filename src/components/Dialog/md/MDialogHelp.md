<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MDialog</h1>
</div>

<h2>示例</h2>
```html
<MDialog v-model="aboutVisible" :title="t('button.about')">
  <component :is="about"></component>
</MDialog>
```

<h2>属性</h2>
```js
{
  // 弹窗标题标志
  title: {
    type: String,
    default: '',
  },
  // 全屏标志
  fullscreen: {
    type: Boolean,
    default: false,
  },
  // 拖动标志
  draggable: {
    type: Boolean,
    default: false,
  },
  // 打开关闭标志
  modelValue: {
    type: Boolean,
    default: false,
  },
  // 宽度标志
  width: {
    type: [String, Number],
    default: '50%',
  }
}
```
