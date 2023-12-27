<script setup lang="ts">
import {TableDataObject} from "~/types";

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

const tableColumns = [
  {
    prop: "label",
    label: "列名",
    visible: true,
    sortable: true,
    filterable: true
  },
  {
    prop: "visible",
    label: "显示",
    width: 60,
    visible: true,
    sortable: true,
    filterable: true
  },
  {
    prop: "sortable",
    label: "排序",
    width: 60,
    visible: true
  },
  {
    prop: "filter",
    label: "筛选",
    width: 60,
    visible: true
  },
  {
    prop: "align",
    label: "对齐",
    width: 100,
    visible: true
  },
  {
    prop: "fixed",
    label: "固定",
    width: 60,
    visible: true
  }
]
const tableData: TableDataObject = {
  count: 20,
  data: [{label: '列名1', visible: '显示2', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示3', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示4', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示2s', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示e', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示2', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示d', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示2', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示g', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名2', visible: '显示g', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名2', visible: '显示g', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名2', visible: '显示21', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名2', visible: '显示2qw', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名2', visible: '显示2r', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名3', visible: '显示gr', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名4', visible: '显示2t', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名5', visible: '显示2t', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名q', visible: '显示25', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名4', visible: '显示2h', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名r', visible: '显示2n', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名g', visible: '显示2x', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名d', visible: '显示2f', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名6', visible: '显示2ww', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名9', visible: '显示2hhh', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名4', visible: '显示2', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示2d', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示2', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示2', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'},
    {label: '列名1', visible: '显示2', sortable: '排序3', filter: '筛选4', align: '对齐5', fixed: '固定6'}],
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
