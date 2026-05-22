<script setup lang="ts">
import type { Movie } from '../stores/movies'
import { useMoviesStore } from '../stores/movies'

const props = defineProps<{ movie: Movie }>()
const store = useMoviesStore()
</script>

<template>
  <UCard class="flex flex-col gap-2">
    <img
      v-if="movie.poster"
      :src="movie.poster"
      :alt="movie.title"
      class="w-full h-48 object-cover rounded-lg"
    />
    <div v-else class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
      Немає постера
    </div>

    <div class="flex flex-col gap-1">
      <h3 class="font-bold text-lg">{{ movie.title }}</h3>
      <p class="text-sm text-gray-500">{{ movie.genre }} · {{ movie.year }}</p>
      <p class="text-sm font-medium" :class="movie.status === 'watchlist' ? 'text-yellow-500' : 'text-green-500'">
        {{ movie.status === 'watchlist' ? '🎬 До перегляду' : '✅ Переглянуто' }}
      </p>
    </div>

    <div class="flex gap-2 mt-2">
      <UButton
        :label="movie.status === 'watchlist' ? 'Позначити як переглянуто' : 'Повернути до перегляду'"
        color="primary"
        variant="outline"
        size="sm"
        class="flex-1"
        @click="store.toggleStatus(movie.id)"
      />
      <UButton
        icon="i-heroicons-trash"
        color="error"
        variant="soft"
        size="sm"
        @click="store.removeMovie(movie.id)"
      />
    </div>
  </UCard>
</template>