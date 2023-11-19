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
  /**
   * @description 弹窗标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 是否允许缩放（按钮）
   */
  resizeable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否全屏
   */
  fullscreen: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否拖动
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 打开关闭
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 窗体宽度
   */
  width: {
    type: [String, Number],
    default: '50%',
  }
}
```
