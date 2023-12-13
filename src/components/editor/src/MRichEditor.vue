<script lang="ts" setup>
// 引入tinymce编辑器
import Editor from '@tinymce/tinymce-vue'

// 引入node_modules里的tinymce相关文件文件
import tinymce from 'tinymce/tinymce'

// tinymce默认hidden，不引入则不显示编辑器
import 'tinymce/skins/ui/oxide/skin.css'

// 编辑器主题，不引入则报错
import 'tinymce/themes/silver'

// 引入编辑器图标icon，不引入则不显示对应图标
import 'tinymce/icons/default'
import 'tinymce/icons/default/icons'

// 引入编辑器插件（基本免费插件都在这儿了）
// 高级列表
import 'tinymce/plugins/advlist'

// 锚点
import 'tinymce/plugins/anchor'

// 自动链接
import 'tinymce/plugins/autolink'

// 编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import 'tinymce/plugins/autoresize'

// 自动存稿
import 'tinymce/plugins/autosave'

// 特殊字符
import 'tinymce/plugins/charmap'

// 编辑源码
import 'tinymce/plugins/code'

// 代码示例
import 'tinymce/plugins/codesample'

// 文字方向
import 'tinymce/plugins/directionality'

// 表情
import 'tinymce/plugins/emoticons'

// 文档属性
import 'tinymce/plugins/fullpage'

// 全屏
import 'tinymce/plugins/fullscreen'

// 帮助
import 'tinymce/plugins/help'

// 水平分割线
import 'tinymce/plugins/hr'

// 引入css
import 'tinymce/plugins/importcss'

// 插入日期时间
import 'tinymce/plugins/insertdatetime'

// 超链接
import 'tinymce/plugins/link'

// 列表插件
import 'tinymce/plugins/lists'

// 插入编辑媒体
import 'tinymce/plugins/media'

// 插入图片
import 'tinymce/plugins/image'

// 插入不间断空格
import 'tinymce/plugins/nonbreaking'

// 插入分页符
import 'tinymce/plugins/pagebreak'

// 粘贴插件
import 'tinymce/plugins/paste'

// 预览
import 'tinymce/plugins/preview'

// 打印
import 'tinymce/plugins/print'

// 快速工具栏
import 'tinymce/plugins/quickbars'

// 保存
import 'tinymce/plugins/save'

// 查找替换
import 'tinymce/plugins/searchreplace'

// 切入切出，按tab键切出编辑器，切入页面其他输入框中
import 'tinymce/plugins/tabfocus'

// 表格
import 'tinymce/plugins/table'

// 内容模板
import 'tinymce/plugins/template'

// 文字颜色
import 'tinymce/plugins/textcolor'

// 快速排版
import 'tinymce/plugins/textpattern'

// 目录生成器
import 'tinymce/plugins/toc'

// 显示元素范围
import 'tinymce/plugins/visualblocks'

// 显示不可见字符
import 'tinymce/plugins/visualchars'

// 字数统计
import 'tinymce/plugins/wordcount'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  plugins: {
    type: [String, Array],
    default:
      'save print preview searchreplace link autolink directionality visualblocks visualchars fullscreen template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists image media wordcount textpattern autosave fullscreen',
  },
  toolbar: {
    type: [String, Array],
    default:
      'save undo redo | forecolor backcolor bold italic underline strikethrough link image insertdatetime |  hr pagebreak | bullist numlist | blockquote subscript superscript removeformat | alignleft aligncenter alignright alignjustify outdent indent lineheight | styleselect formatselect fontselect fontsizeselect | code print preview fullscreen importDoc',
  },
  placeholder: {
    type: String,
    default: '在这里输入文字',
  },
  height: {
    type: Number,
    default: 200,
  },
})

const emits = defineEmits(['update:modelValue', 'change'])
const editDialogVisible = ref(false)
const uploadref = ref()
const selectFile = ref()
const html2Pdf = ref()
const printPDF = ref()
const init = ref({
  language_url: '../../../public/tinymce/langs/zh_CN.js', // 引入语言包文件
  language: 'zh_CN', // 语言类型

  skin_url: '../../../public/tinymce/skins/ui/oxide', // 皮肤：浅色
  // skin_url: '/tinymce/skins/ui/oxide-dark',//皮肤：暗色

  plugins: props.plugins, // 插件配置
  toolbar: props.toolbar, // 工具栏配置，设为false则隐藏
  toolbar_drawer: false,
  // menubar: 'file edit',  //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

  fontsize_formats:
    '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', // 字体大小
  font_formats:
    '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;', // 字体样式
  lineheight_formats: '0.5 0.8 1 1.2 1.5 1.75 2 2.5 3 4 5', // 行高配置，也可配置成"12px 14px 16px 20px"这种形式

  height: props.height, // 注：引入autoresize插件时，此属性失效
  placeholder: props.placeholder,
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
})

    const printObj = {
      id: 'printMe',
      popTitle: '@MJQ',
      extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
    }

    const contentValue = computed({
      // 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
      get: () => props.modelValue,
      set: (nv) => {
        emit('update:modelValue', nv)
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
        globalProperties.message.error('只可上传一个docx文件!')
        return
      }
      const reader = new FileReader()
      reader.readAsArrayBuffer(fileList[0].raw)
      reader.onload = (e: any) => {
        mammoth.convertToHtml({ arrayBuffer: reader.result }).then((resultObject: any) => {
          contentValue.value = resultObject.value
        })
      }
      uploadref.value.clearFiles()
    }

    const handleSave = (editor: any) => {
      editDialogVisible.value = true
    }

    const handleDownLoad_Doc = () => {
      const htmlStr = `
                <!DOCTYPE html>
                <html>
                  <body>${
        contentValue.value
        }</body>
                </html>`
      asBlob(htmlStr, { orientation: 'landscape' }).then((data: any) => {
        saveAs(data, 'Doc.docx')
      })
    }

    const handleDownLoad_Pdf = () => {
      printPDF.value.ref.click()
    }



})
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
      ref="uploadref"
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
  </div>
</template>
