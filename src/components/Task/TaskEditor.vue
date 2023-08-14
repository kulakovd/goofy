<script setup lang="ts">
import EditorControls from '@/components/EditorControls.vue'
import { ref } from 'vue'

const props = defineProps<{
  mode: 'create' | 'edit'
  title: string | null
  description: string | null
}>()

defineEmits<{
  cancel: []
  save: [{ title: string; description: string }]
  delete: []
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
    >
      {{ description }}
    </div>
    <EditorControls
      class="controls"
      :show-delete="mode === 'edit'"
      :save-text="mode === 'create' ? 'Add' : 'Save'"
      @delete="$emit('delete')"
      @cancel="$emit('cancel')"
      @save="$emit('save', { title, description })"
    />
  </div>
</template>

<style scoped>
.editor {
  padding: 8px;
  border: 1px solid var(--color-text);
  border-radius: var(--border-radius);
}

.title {
  font-weight: bold;
}

.description {
  height: fit-content;
  resize: none;
  white-space: pre-wrap;
}

.controls {
  margin-top: 8px;
}
</style>
