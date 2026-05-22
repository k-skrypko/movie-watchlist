<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <UTabs
    :items="[
      { label: 'Всі', value: 'all' },
      { label: 'До перегляду', value: 'watchlist' },
      { label: 'Переглянуто', value: 'watched' },
    ]"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event as string)"
  />
</template>