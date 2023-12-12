<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MText</h1>
</div>

<h2>示例</h2>
```html
<MText content="3123123123123" :style="{ color: 'red', textAlign: 'center' }" />
```

<h2>属性</h2>
```js
/**
 * @description 文字内容
 */
content: {
  type: String,
  default: undefined,
},
/**
 * @description 自定义样式
 */
style: {
  type: Object,
},
```
