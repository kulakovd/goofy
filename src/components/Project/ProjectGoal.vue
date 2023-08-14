<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import EditorControls from '@/components/EditorControls.vue'

const listsStore = useListsStore()
const { openedList } = storeToRefs(listsStore)

const editing = ref(false)

const editorRef = ref<HTMLElement | null>(null)

function cancelEditing() {
  editing.value = false

  if (editorRef.value == null) return
  editorRef.value.textContent = openedList.value?.goal ?? ''
}

function saveGoal() {
  editing.value = false

  if (openedList.value.id == null) return

  const goal = editorRef.value?.textContent ?? ''
  listsStore.updateProject(openedList.value.id, { goal })
}
</script>

<template>
  <div class="goal" :class="{ editing: editing }">
    <div>
      <span class="goal-title">Project goal: </span>
      <span
        ref="editorRef"
        class="goal-text"
        contenteditable="true"
        placeholder="type your goal here"
        @focus="editing = true"
      >
        {{ openedList.goal }}
      </span>
    </div>
    <EditorControls v-if="editing" @save="saveGoal" @cancel="cancelEditing" />
  </div>
</template>

<style scoped>
.goal {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.goal-title {
  font-weight: bold;
}

.goal-text {
  min-width: 100px;
}

.editing {
  padding: 8px;
  border: 1px solid var(--color-text);
  border-radius: var(--border-radius);
}
</style>
