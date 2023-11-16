<div class="text-center">
  <!-- You can use Vue components inside markdown -->
  <div i-carbon-dicom-overlay class="text-4xl -mb-6 m-auto" />
  <h3>{{ lang }}</h3>
</div>

```
import { useAppStore } from '~/stores/app'

const {
  locale,
} = useI18n()

const lang = computed(() => {
  return locale.value
})
```
Check out the [GitHub repo](https://github.com/YunYouJun/tauri-vite-vue) for more details.
