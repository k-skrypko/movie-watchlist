import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Movie {
  id: string
  title: string
  genre: string
  year: number
  poster: string
  status: 'watchlist' | 'watched'
}

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[]>(JSON.parse(localStorage.getItem('movies') || '[]'))

  function saveToStorage() {
    localStorage.setItem('movies', JSON.stringify(movies.value))
  }

  function addMovie(movie: Omit<Movie, 'id'>) {
    movies.value.push({
      ...movie,
      id: crypto.randomUUID(),
    })
    saveToStorage()
  }

  function removeMovie(id: string) {
    movies.value = movies.value.filter(m => m.id !== id)
    saveToStorage()
  }

  function toggleStatus(id: string) {
    const movie = movies.value.find(m => m.id === id)
    if (movie) {
      movie.status = movie.status === 'watchlist' ? 'watched' : 'watchlist'
      saveToStorage()
    }
  }

  const watchlist = computed(() => movies.value.filter(m => m.status === 'watchlist'))
  const watched = computed(() => movies.value.filter(m => m.status === 'watched'))

  return { movies, addMovie, removeMovie, toggleStatus, watchlist, watched }
})