<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MSvgIcon</h1>
</div>

<h2>示例</h2>
```html
<MSelect v-model="asadas" :remote="remote" filterable collapseTags lazy multiple />
```

<h2>属性</h2>
```js
{
  // 绑定数据标志
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
  },
  // 占位内容标志
  placeholder: {
    type: String,
    default: undefined,
  },
  // 静态数据源标志
  options: {
    type: Array,
    default: undefined,
  },
  // 远程数据源（字典代码）标志
  remote: {
    type: String,
    default: undefined,
  },
  // 实际值的字段标志
  valueKey: {
    type: String,
    default: 'id',
  },
  // 显示值的字段标志
  labelKey: {
    type: String,
    default: 'label',
  },
  // 控件尺寸标志
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
  // 是否禁用标志
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否可过滤标志
  filterable: {
    type: Boolean,
    default: false,
  },
  // 是否可清空标志
  clearable: {
    type: Boolean,
    default: true,
  },
  // 是否可新建标志
  allowCreate: {
    type: Boolean,
    default: false,
  },
  // 是否可多选标志
  multiple: {
    type: Boolean,
    default: false,
  },
  // 是否懒加载标志
  lazy: {
    type: Boolean,
    default: false,
  },
  // 懒加载条数标志
  lazyCount: {
    type: Number,
    default: 10,
  },
  // 多选时是否合并选项标志
  collapseTags: {
    type: Boolean,
    default: false,
  },
  // 超过多少选项时合并标志
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
