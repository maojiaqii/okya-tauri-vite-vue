<script setup lang="ts">
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
</script>

<template>

  <MText content="3123123123123" :style="{ color: 'red', textAlign: 'center' }" />
  <MHtml content="<b>3123123123123</b>" :style="{ color: 'red', textAlign: 'center' }" />
  <MButton plain icon='right' @click="click" name="按钮" />
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
    <MJsEditor v-model="dt123" @change="fileComplete"/>
<!--    <MExcel :containerId="czxcasad" />-->
  </MDialog>
</template>
