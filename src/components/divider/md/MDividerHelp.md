<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MDivider</h1>
</div>

<h2>示例</h2>
```html
<MDivider content="123321" />
```

<h2>属性</h2>
```js
{
  /**
   * @description 文本内容（支持html）
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * @description 分割线方向
   */
  direction: {
    type: String,
    default: 'horizontal',
    validator: (val: string) => ['', 'horizontal', 'vertical'].includes(val),
  },
  /**
   * @description 文本内容位置
   */
  contentPosition: {
    type: String,
    default: 'left',
    validator: (val: string) => ['', 'left', 'right', 'center'].includes(val),
  },
}
```
