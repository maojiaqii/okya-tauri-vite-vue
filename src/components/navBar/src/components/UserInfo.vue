<script setup lang="ts">
import userPng from '~/assets/avatar.jpg'
import type { LoginUser } from '~/types'

const { t } = useI18n()
const user: LoginUser = computed(() => {
  return JSON.parse(sessionStorage.getItem('user'))
})
</script>

<template>
  <el-dropdown v-if="user && user.asUser" style="margin-top: 0.3em" trigger="hover">
    <span class="flex items-center">
      <img
        mx-2 w-9 rounded-5
        :src="userPng"
        alt=""
      >
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item disabled>
          <MSvgIcon icon="user-line" />
          {{ user.asUser.userName }}
        </el-dropdown-item>
        <el-dropdown-item>
          <MSvgIcon icon="settings-5-line" />
          {{ t('setting') }}
        </el-dropdown-item>
        <el-dropdown-item divided>
          <MSvgIcon icon="logout-box-line" />
          {{ t('logout') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
</style>
