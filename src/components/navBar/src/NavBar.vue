<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window'
import { debounce, handleIsTauri, useScreenfullEffect } from '~/utils'
import { useAppStore } from '~/stores/app'
import about from '~/pages/About/about.md'

const {
  t,
  availableLocales,
  locale,
} = useI18n()
const app = useAppStore()
const { isFullScreenTag, handleFullScreen } = useScreenfullEffect()

onMounted(async () => {
  app.$state.appWindow = await handleIsTauri()
})

function toggleLocales() {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  app.setLang(locale.value)
}
const resize = debounce(() => handleFullScreen(document.getElementById('body')))

const aboutVisible = ref(false)
</script>

<template>
  <nav b-b text-xl h="2.4em" data-tauri-drag-region>
    <div float-left h="full" ml>
      <img src="../../../../src-tauri/icons/icon1.png" h="full" w="4.2em" alt="">
    </div>
    <div float-right style="line-height: 2.8em">
      <a class="icon-btn mx-2 !outline-none" :title="t(isFullScreenTag ? 'button.minimize' : 'button.maximize')" @click="resize">
        <MSvgIcon :icon="isFullScreenTag ? 'minimize' : 'maximize'" />
      </a>

      <a class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
        <MSvgIcon :icon="isDark ? 'moon-line' : 'sun-line'" />
      </a>

      <a class="icon-btn mx-2" :class="locale === 'en' ? '' : '-rotate-y-180'" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <MSvgIcon icon="translate" />
      </a>

      <a class="icon-btn mx-2" :title="t('button.about')" @click="aboutVisible = !aboutVisible">
        <MSvgIcon icon="information-line" />
      </a>

      <UserInfo class="icon-btn mx-2" />

      <a v-if="app.appWindow" class="icon-btn mx-2" :title="t('button.minimize')" @click="appWindow.minimize()">
        <MSvgIcon icon="minimize" />
      </a>

      <a v-if="app.appWindow" class="icon-btn mx-2" :title="t('button.maximize')" @click="appWindow.toggleMaximize()">
        <MSvgIcon icon="maximize" />
      </a>

      <a v-if="app.appWindow" class="icon-btn mx-2" :title="t('button.close')" @click="appWindow.close()">
        <MSvgIcon icon="close-fill" />
      </a>
    </div>
  </nav>

  <MDialog v-model="aboutVisible" :title="t('button.about')">
    <component :is="about"></component>
  </MDialog>
</template>
