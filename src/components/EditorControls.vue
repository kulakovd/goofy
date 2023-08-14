<script setup lang="ts">
import Button from '@/components/Button.vue'

defineProps<{
  saveText?: string
  showDelete?: boolean
}>()

defineEmits<{
  cancel: []
  save: []
  delete: []
}>()
</script>

<template>
  <div class="controls wrapper">
    <div class="controls">
      <Button @click="$emit('save')">{{ saveText ?? 'Save' }}</Button>
      <Button type="secondary" @click="$emit('cancel')">Cancel</Button>
    </div>
    <div>
      <Button
        v-if="showDelete"
        type="secondary"
        @click="$emit('delete')"
      >
        Delete
      </Button>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
}

.wrapper {
  justify-content: space-between;
}
</style>
