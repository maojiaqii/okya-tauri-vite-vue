<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MSelect</h1>
</div>

<h2>示例</h2>
```html
<MSelect v-model="asadas" :remote="remote" filterable collapseTags lazy multiple />
```

<h2>属性</h2>
```js
{
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: undefined,
  },
  /**
   * @description 静态选项内容
   */
  options: {
    type: Array,
    default: undefined,
  },
  /**
   * @description 远程字典代码
   */
  remote: {
    type: String,
    default: undefined,
  },
  /**
   * @description 实际值的字段标志
   */
  valueKey: {
    type: String,
    default: 'id',
  },
  /**
   * @description 显示值的字段标志
   */
  labelKey: {
    type: String,
    default: 'label',
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
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否可过滤
   */
  filterable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否可清空
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否可新建
   */
  allowCreate: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否懒加载
   */
  lazy: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 懒加载每次加载条数
   */
  lazyCount: {
    type: Number,
    default: 10,
  },
  /**
   * @description 多选时是否合并选项标志
   */
  collapseTags: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 超过多少选项时合并标志
   */
  maxCollapseTags: {
    type: Number,
    default: 2,
  },
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: any)
选中值改变回调事件，返回选中对象
optionSelected(option: any)
```
