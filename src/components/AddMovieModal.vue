<script setup lang="ts">
import { ref } from 'vue'
import { useMoviesStore } from '../stores/movies'

const store = useMoviesStore()
const isOpen = ref(false)

const title = ref('')
const genre = ref('')
const customGenre = ref('')
const year = ref(new Date().getFullYear())
const poster = ref('')
const posterMode = ref<'url' | 'file'>('url')
const status = ref<'watchlist' | 'watched'>('watchlist')

const genres = [
  { label: 'Бойовик', value: 'Бойовик' },
  { label: 'Комедія', value: 'Комедія' },
  { label: 'Драма', value: 'Драма' },
  { label: 'Жахи', value: 'Жахи' },
  { label: 'Фантастика', value: 'Фантастика' },
  { label: 'Мелодрама', value: 'Мелодрама' },
  { label: 'Анімація', value: 'Анімація' },
  { label: 'Документальний', value: 'Документальний' },
  { label: 'Інше', value: 'Інше' },
]

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    poster.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

function submit() {
  if (!title.value || !genre.value) return

  const finalGenre = genre.value === 'Інше' ? customGenre.value : genre.value

  store.addMovie({
    title: title.value,
    genre: finalGenre,
    year: year.value,
    poster: poster.value,
    status: status.value,
  })

  title.value = ''
  genre.value = ''
  customGenre.value = ''
  year.value = new Date().getFullYear()
  poster.value = ''
  posterMode.value = 'url'
  status.value = 'watchlist'
  isOpen.value = false
}
</script>

<template>
  <UButton label="+ Додати фільм" color="primary" @click="isOpen = true" />

  <UModal v-model:open="isOpen" title="Додати фільм">
    <template #body>
      <div class="flex flex-col gap-4">
        <UFormField label="Назва">
          <UInput v-model="title" placeholder="Назва фільму" class="w-full" />
        </UFormField>

        <UFormField label="Жанр">
          <select v-model="genre" class="w-full border rounded-md px-3 py-2 text-sm">
            <option value="" disabled>Оберіть жанр</option>
            <option v-for="g in genres" :key="g.value" :value="g.value">{{ g.label }}</option>
          </select>
        </UFormField>

        <UFormField v-if="genre === 'Інше'" label="Свій жанр">
          <UInput v-model="customGenre" placeholder="Введіть жанр" class="w-full" />
        </UFormField>

        <UFormField label="Рік">
          <UInput v-model="year" type="number" class="w-full" />
        </UFormField>

        <UFormField label="Постер">
          <div class="flex gap-2 mb-2">
            <UButton
              label="Посилання"
              :color="posterMode === 'url' ? 'primary' : 'neutral'"
              variant="soft"
              size="sm"
              @click="posterMode = 'url'; poster = ''"
            />
            <UButton
              label="Завантажити фото"
              :color="posterMode === 'file' ? 'primary' : 'neutral'"
              variant="soft"
              size="sm"
              @click="posterMode = 'file'; poster = ''"
            />
          </div>
          <UInput
            v-if="posterMode === 'url'"
            v-model="poster"
            placeholder="https://..."
            class="w-full"
          />
          <input
            v-else
            type="file"
            accept="image/*"
            class="w-full text-sm"
            @change="handleFileUpload"
          />
        </UFormField>

        <UFormField label="Статус">
          <select v-model="status" class="w-full border rounded-md px-3 py-2 text-sm">
            <option value="watchlist">До перегляду</option>
            <option value="watched">Переглянуто</option>
          </select>
        </UFormField>
      </div>
    </template>

    <template #footer>
      <UButton label="Додати" color="primary" @click="submit" />
      <UButton label="Скасувати" color="neutral" variant="soft" @click="isOpen = false" />
    </template>
  </UModal>
</template>