<script setup lang="ts">
import Button from '@/components/Button.vue'
import { useTasksStore } from '@/stores/tasks'
import { ref } from 'vue'

const props = defineProps<{
  mode: 'create' | 'edit'
  title: string | null
  description: string | null
}>()

defineEmits<{
  cancel: []
  save: [{ title: string; description: string }]
}>()

const title = ref(props.title ?? '')
const description = ref(props.description ?? '')

function titleBlurHandler(event: Event) {
  title.value = (event.target as HTMLElement).innerText
}

function descBlurHandler(event: Event) {
  description.value = (event.target as HTMLElement).innerText
}
</script>

<template>
  <div class="editor">
    <div class="title input" contenteditable="true" placeholder="Title" @blur="titleBlurHandler">
      {{ title }}
    </div>
    <div
      class="description input"
      contenteditable="true"
      placeholder="Description"
      @blur="descBlurHandler"
      v-html="description"
    />
    <div class="controls">
      <Button type="secondary" @click="$emit('cancel')"> Cancel </Button>
      <Button @click="$emit('save', { title, description })">
        {{ mode === 'create' ? 'Add' : 'Save' }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.editor {
  padding: 8px;
  border: 1px solid var(--color-text);
  border-radius: 4px;
}

.input::placeholder {
  font-weight: normal;
  color: var(--color-text);
  opacity: 0.5;
}

.input:focus {
  outline: none;
}

.input[placeholder]:empty::before {
  content: attr(placeholder);
  color: var(--color-text);
  opacity: 0.5;
}

.title {
  font-weight: bold;
}

.description {
  height: fit-content;
  resize: none;
  white-space: pre;
}

.controls {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
