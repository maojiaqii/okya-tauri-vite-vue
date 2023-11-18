<script setup lang="ts">
const aboutVisible = ref(false)
const asadas = ref([])
const datas = [{ id: '1', label: 's1' }, { id: '2', label: 's2' }, { id: '3', label: 's3' }, { id: '4', label: 's4' }, { id: '5', label: 's5' }]
const czxcasad = `M${Number.parseInt((Math.random() * (1000000 - 1) + 1).toString())}`
const remote = ref('sys_sex')
const icon = ref('')
function click() {
  aboutVisible.value = true
}
function optionSelected(item: any) {
  console.log('optionSelected', item)
}
function change(item: any) {
  console.log(icon.value)
}
function inputChange(item: any) {
  console.log(item)
}
</script>

<template>
  <MButton @click="click" name="按钮" />
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
  <MDialog fullscreen  v-model="aboutVisible">
    <MExcel :containerId="czxcasad" />
  </MDialog>
</template>
