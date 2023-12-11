<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MCard</h1>
</div>

<h2>示例</h2>
```html
<MCard v-show="app.viewTransition" :card-height="cardHeight" shadow="hover" :header="cardTitle" :show-header="app.viewOpenStyle === 'breadcrumb'">
  <span>1111111111111111111</span>
</MCard>
```

<h2>属性</h2>
```js
{
  /**
   * @description 内容可视高度
   */
  cardHeight: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description 标题
   */
  header: {
    type: String,
    default: '',
  },
  /**
   * @description 阴影显示类型
   */
  shadow: {
    type: String,
    default: 'always',
    validator: (val: string) => ['', 'always', 'never', 'hover'].includes(val),
  },
  /**
   * @description 内容样式
   */
  bodyStyle: {
    type: Object as PropType<CSSProperties>,
    default: { padding: '10px' },
  },
  /**
   * @description 是否显示标题
   */
  showHeader: {
    type: Boolean,
    default: false,
  },
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: string)
```
