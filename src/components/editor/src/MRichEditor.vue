<script lang="ts" setup>
import { useAppStore } from '~/stores/app'
import mammoth from 'mammoth'
import { asBlob } from 'html-docx-js-typescript'
import { saveAs } from 'file-saver'
import print from 'vue3-print-nb'
// 引入tinymce编辑器
import Editor from '@tinymce/tinymce-vue'

const props = defineProps({
  modelValue: {
    type: String,
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
  },
})
const vPrint = print
const emits = defineEmits(['update:modelValue', 'change'])
const { locale, t } = useI18n()
const app = useAppStore()
const editDialogVisible = ref(false)
const uploader = ref()
const selectFile = ref()
const printPDF = ref()
const skin = computed(() => {
  return isDark.value ? 'oxide-dark' : 'oxide'
})
const language = computed(() => {
  return `${locale.value}-Hans`
})
const init = computed(() => {
  return  {
    promotion: false,
    language: language.value,
    skin: skin.value,
    plugins: 'save print preview accordion searchreplace link autolink directionality visualblocks visualchars fullscreen template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists image media wordcount textpattern autosave fullscreen', // 插件配置
    toolbar: 'save preview importDoc undo redo styles fontfamily forecolor backcolor bold italic underline image bullist numlist alignleft aligncenter alignright alignjustify outdent indent lineheight  fullscreen', // 工具栏配置，设为false则隐藏
    toolbar_mode: 'wrap',
    toolbar_drawer: false,
    // menubar: 'false',  //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”
    fontsize_formats:
    '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', // 字体大小
      font_formats:
    '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;', // 字体样式
      lineheight_formats: '0.5 0.8 1 1.2 1.5 1.75 2 2.5 3 4 5', // 行高配置，也可配置成"12px 14px 16px 20px"这种形式
    height: props.height, // 注：引入autoresize插件时，此属性失效
    placeholder: props.placeholder ? props.placeholder : t('component.placeholder_input'),
    branding: false, // tiny技术支持信息是否显示
    resize: 'true', // 编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
    elementpath: false, // 元素路径是否显示
    content_style: 'img {max-width:100%;}', // 直接自定义可编辑区域的css样式
    paste_data_images: true, // 图片是否可粘贴
    // tinymce插入图片支持转base64操作
    images_upload_handler(blobInfo: any, success: any, failure: any) {
    const reader = new FileReader()
    reader.readAsDataURL(blobInfo.blob())
    reader.onload = function () {
      success(this.result)
    }
  },
    save_enablewhendirty: false,
    save_onsavecallback: (editor: any) => handleSave(editor),
    setup: (editor: any) => handleSetup(editor),
  }
})

const printOptions = {
  id: 'printMe',
  popTitle: '', // 打印配置页上方的标题
  extraHead: '', // 最上方的头部文字，附加在head标签上的额外标签，使用逗号分割
  preview: false, // 是否启动预览模式，默认是false
  previewTitle: '预览的标题', // 打印预览的标题
  previewPrintBtnLabel: '预览结束，开始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
  zIndex: 20002, // 预览窗口的z-index，默认是20002，最好比默认值更高
  previewBeforeOpenCallback() {
    // console.log()
  }, // 预览窗口打开之前的callback
  previewOpenCallback() {
    // console.log('已经加载完预览窗口，预览打开了！')
  }, // 预览窗口打开时的callback
  beforeOpenCallback() {
    // console.log('开始打印之前！')
  }, // 开始打印之前的callback
  openCallback() {
    // console.log('执行打印了！')
  }, // 调用打印时的callback
  closeCallback() {
  }, // 关闭打印的callback(无法区分确认or取消)
  clickMounted() {
  },
  standard: '',
  extraCss: ''
}

const contentValue = computed({
  get: () => props.modelValue,
  set: (nv) => {
    emits('update:modelValue', nv)
  },
})

onMounted(() => {
  tinymce.init({})
})

const handleSetup = (editor: any) => {
  editor.ui.registry.addButton('importDoc', {
    tooltip: '导入Docx',
    icon: 'upload',
    onAction() {
      selectFile.value.ref.click()
    },
  })
}
const handleChange = (file: any, fileList: any) => {
  if (fileList.size > 1) {
    ElMessage.error('只可上传一个docx文件!')
    return
  }
  const reader = new FileReader()
  reader.readAsArrayBuffer(fileList[0].raw)
  reader.onload = (e: any) => {
    mammoth.convertToHtml({ arrayBuffer: reader.result }).then((resultObject: any) => {
      contentValue.value = resultObject.value
    })
  }
  uploader.value.clearFiles()
}
const handleSave = (editor: any) => {
  editDialogVisible.value = true
}
const handleDownLoad_Doc = () => {
  const htmlStr = `
            <!DOCTYPE html>
            <html>
              <body>${contentValue.value}</body>
            </html>`
  asBlob(htmlStr, { orientation: 'landscape' }).then((data: any) => {
    saveAs(data, `${new Date().valueOf()}.docx`)
  })
}
const handleDownLoad_Pdf = () => {
  printPDF.value.ref.click()
}
</script>

<template>
  <div>
    <div class="tinymce-box">
      <Editor
        v-model="contentValue"
        :init="init"
        :disabled="disabled"
      />
    </div>
    <el-upload
      ref="uploader"
      action=""
      accept=".docx"
      class="upload-demo"
      :multiple="true"
      :auto-upload="false"
      :on-change="handleChange"
    >
      <template #trigger>
        <el-button v-show="false" ref="selectFile" type="primary" />
      </template>
    </el-upload>
    <div style="width: 0;height: 0;overflow: hidden">
      <span id="printMe" v-html="contentValue" />
    </div>
    <el-button v-show="false" ref="printPDF" v-print="printOptions"></el-button>
    <m-dialog width="20%" v-model="editDialogVisible">
      请选择需要保存的文件类型：
      <div style="margin-top: 10px">
        <el-row gutter="12">
          <el-col span="6">
            <el-link type="primary" @click="handleDownLoad_Doc">DOCX</el-link>
          </el-col>
          <el-col span="6">
            <el-link type="warning" @click="handleDownLoad_Pdf">PDF</el-link>
          </el-col>
        </el-row>
      </div>
    </m-dialog>
  </div>
</template>
