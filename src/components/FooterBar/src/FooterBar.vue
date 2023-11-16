<script setup lang="ts">
const appVersion = `v${process.env.__APP_VERSION__}`.replaceAll('"', '')
</script>

<template>
  <div class="mx-auto text-center opacity-75 dark:opacity-50 text-sm">
    <a href="" target="_blank">
      {{appVersion}}
    </a>
  </div>
</template>
