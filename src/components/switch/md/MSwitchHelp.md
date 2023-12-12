<div class="text-center">
  <div class="text-4xl -mb-6 m-auto" />
  <h1>MSwitch</h1>
</div>

<h2>示例</h2>
```html
<MSwitch v-model="inv" inline-prompt active-text="是" inactive-text="否" :active-value="0" :inactive-value="1" @change="fileComplete"/>
```

<h2>属性</h2>
```js
{
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description switch 状态为 on 时的值
   */
  activeValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  /**
   * @description switch 状态为 off 时的值
   */
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  /**
   * @description switch 状态为 on 时的文字描述
   */
  activeText: {
    type: String,
    default: '',
  },
  /**
   * @description switch 状态为 off 时的文字描述
   */
  inactiveText: {
    type: String,
    default: '',
  },
  /**
   * @description 无论图标或文本是否显示在点内，只会呈现文本的第一个字符
   */
  inlinePrompt: {
    type: Boolean,
    default: false,
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
  }
}
```

<h2>事件</h2>
```js
选中值改变回调事件，返回选中值
change(val: any)
```
