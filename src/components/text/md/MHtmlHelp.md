<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MHtml</h1>
</div>

<h2>示例</h2>
```html
<MHtml content="<p>3123123123123</p>" :style="{ color: 'red', textAlign: 'center' }" />
```

<h2>属性</h2>
```js
/**
 * @description html内容
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
