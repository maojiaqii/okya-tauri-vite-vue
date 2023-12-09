<script setup lang="ts">
const aboutVisible = ref(false)
const asadas = ref([])
const inv = ref(0)
const datas = [{ id: '1', label: 's1' }, { id: '2', label: 's2' }, { id: '3', label: 's3' }, { id: '4', label: 's4' }, { id: '5', label: 's5' }]
const czxcasad = `M${Number.parseInt((Math.random() * (1000000 - 1) + 1).toString())}`
const remote = ref('sys_sex')
const icon = ref('')
const dt = ref('')
const tm = ref(1700470641000)
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
}
</script>

<template>
  <MButton plain icon='right' @click="click" name="按钮" />
  <MSelect v-model="asadas" :remote="remote" size="small" filterable collapseTags multiple lazy @optionSelected="optionSelected" />
  <MIconSelect v-model="icon" @change="change" size="large" />
  <MInput v-model="asadas" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" :minLength=10 :maxLength=100 />
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
  <MTimeSelect v-model="tm" format="HH:mm:ss" @change="inputChange" />
  <MDivider content="123321" />
  <MRate v-model="inv" allow-half @change="change" size="large" />
  <MUpload v-model="asadas" @change="change" @fileComplete="fileComplete"/>
  <MDialog fullscreen  v-model="aboutVisible">
    <MExcel :containerId="czxcasad" />
  </MDialog>
</template>
