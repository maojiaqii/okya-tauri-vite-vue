<script setup lang="ts">
import {TableColumnObject, TableDataObject} from "~/types";

const aboutVisible = ref(false)
const asadas = ref([])
const inv = ref(0)
const options = [{ value: '1', label: 's1' }, { value: '2', label: 's2' }, { value: '3', label: 's3' }, { value: '4', label: 's4' }, { value: '5', label: 's5' }]
const czxcasad = `M${Number.parseInt((Math.random() * (1000000 - 1) + 1).toString())}`
const remote = ref('sys_sex')
const icon = ref('')
const dt = ref('')
const dt123 = ref('closeMenu(e){\n' +
  '              this.visible = false;\n' +
  '          }')
const tm = ref(1700470641000)

const tableColumns: Array<TableColumnObject> = [
  {
    prop: "label",
    label: "列名",
    sortable: true,
    filterable: true,
    comment: '12312312312'
  },
  {
    prop: "visible",
    label: "显示",
    sortable: true,
    filterable: true
  },
  {
    prop: "sortable",
    label: "排序",
    sortable: true
  },
  {
    prop: "filter",
    label: "筛选"
  },
  {
    prop: "align",
    label: "对齐",
    width: 100
  },
  {
    prop: "fixed",
    label: "固定"
  }
]
const tableData: TableDataObject = {
  count: 1000,
  data: Array.from({ length: 1000 }).map((_, i) => {
    return {label: '列名' + i, visible: '显示' + i, sortable: '排序' + i, filter: '筛选' + i, align: '对齐对齐对齐对齐对齐对齐对齐对齐对齐对齐对齐对齐对齐对齐对齐' + i, fixed: '固定' + i}
  }),
  pageNum: 1
}
function click() {
  aboutVisible.value = true
}
function optionSelected(item: any) {
  console.log('optionSelected', item)
}
function change(item: any) {
  console.log(asadas.value)
}
function inputChange(item: any) {
  console.log(new Date(tm.value).valueOf())
}
function fileComplete(item: any) {
  console.log(item)
  console.log(dt123.value)
}

function sortChange(item: any) {
  console.log(item)
}

onMounted(() => {
})

</script>

<template>
  <MButton plain icon='right' @click="click" name="按钮" />
  <MButton plain icon='right' @click="click" name="按钮" />
  <MButton plain icon='right' @click="click" name="按钮" />
  <MButton plain icon='right' @click="click" name="按钮" />
  <MButton plain icon='right' @click="click" name="按钮" />
  <MButton plain icon='right' @click="click" name="按钮" />
  <m-table :data="tableData" :columns="tableColumns" @sort-change="sortChange"></m-table>
  <MText content="3123123123123" :style="{ color: 'red', textAlign: 'center' }" />
  <MHtml content="<b>3123123123123</b>" :style="{ color: 'red', textAlign: 'center' }" />
  <MSelect v-model="asadas" :remote="remote" size="small" filterable collapseTags multiple lazy @optionSelected="optionSelected" />
  <MIconSelect v-model="icon" @change="change" size="large" />
  <MTextarea v-model="asadas" :autosize="{ minRows: 2, maxRows: 4 }" :minLength=10 :maxLength=100 />
  <MInput v-model="asadas" @change="inputChange">
    <template #prefix>
      <MSvgIcon icon="translate" />
    </template>
    <template #append>
      asdasdasdasd
    </template>
  </MInput>
  <MInputNumber v-model="inv" placeholder="数字" size="large" @change="inputChange" />
  <MColorSelect v-model="icon" @change="inputChange" />
  <MDateSelect v-model="dt" format="YYYY/MM/DD" disabledDate="after" @change="inputChange" />
  <MDateRangeSelect v-model="asadas" format="YYYY/MM/DD" disabledDate="after" @change="change" />
  <MTimeSelect v-model="tm" format="HH:mm:ss" @change="inputChange" />
  <MTimeRangeSelect v-model="asadas" format="HH:mm:ss" @change="change" />
  <MDivider content="123321" />
  <MRate v-model="inv" allow-half @change="change" size="large" />
  <MUpload v-model="asadas" @change="change" @fileComplete="fileComplete"/>
  <MSwitch v-model="inv" inline-prompt active-text="是" inactive-text="否" :active-value="0" :inactive-value="1" @change="fileComplete"/>
  <MRadio v-model="inv" :options="options" show-blank />
  <MCheckbox v-model="asadas" :options="options" show-all />
  <MRichEditor v-model="dt" />
  <MDialog fullscreen  v-model="aboutVisible">
    <MCodeEditor v-model="dt123" mode="text/x-vue" @change="fileComplete"/>
<!--    <MExcel :containerId="czxcasad" />-->
  </MDialog>
</template>
