<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMoviesStore } from './stores/movies'
import MovieCard from './components/MovieCard.vue'
import AddMovieModal from './components/AddMovieModal.vue'
import MovieFilter from './components/MovieFilter.vue'

const store = useMoviesStore()
const filter = ref('all')

const filteredMovies = computed(() => {
  if (filter.value === 'all') return store.movies
  if (filter.value === 'watchlist') return store.watchlist
  return store.watched
})
</script>

<template>
  <UApp>
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">🎬 Movie Watchlist</h1>
        <AddMovieModal />
      </div>

      <MovieFilter v-model="filter" class="mb-6" />

      <div v-if="filteredMovies.length === 0" class="text-center text-gray-400 py-16">
        Список порожній — додай перший фільм!
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </UApp>
</template>