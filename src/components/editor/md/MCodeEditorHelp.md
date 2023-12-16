<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MCodeEditor</h1>
</div>

<h2>示例</h2>
```html
<MCodeEditor v-model="dt123" mode="text/x-mysql" @change="fileComplete"/>
```

<h2>属性</h2>
```js
{
  modelValue: {
    type: String,
    default: undefined,
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * @description 模式 text/javascript text/x-mysql text/x-vue
   */
  mode: {
    type: String,
    default: 'text/javascript',
  },
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 录入区域高度
   */
  height: {
    type: Number,
    default: 500,
  }
}
```
<h2>事件</h2>
```js
值改变回调事件，返回值
change(val: string)
```
