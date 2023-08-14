<script setup lang="ts">
import Button from '@/components/Button.vue'

defineProps<{
  saveText?: string 
}>()

defineEmits<{
  cancel: []
  save: []
}>()
</script>

<template>
  <div class="controls">
    <Button type="secondary" @click="$emit('cancel')">Cancel</Button>
    <Button @click="$emit('save')">{{ saveText ?? 'Save' }}</Button>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
