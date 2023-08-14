<script setup lang="ts">
import ListPageHead from '@/components/ListPageHead.vue';
import PageTitle from '@/components/PageTitle.vue';
import ProjectColor from '@/components/Project/ProjectColor.vue';
import EditorControls from '@/components/EditorControls.vue';
import ProjectColorPicker from '@/components/Project/ProjectColorPicker.vue';
import { useListsStore } from '@/stores/lists'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue';
import type { Project } from '@/domain';

const listsStore = useListsStore()
const { openedList } = storeToRefs(listsStore)

const choosingColor = ref(false)
const editing = ref(false)

const editorRef = ref<HTMLElement | null>(null)

const newColor = ref<Project['color'] | null>(null)
const color = computed<Project['color']>(() => newColor.value ?? openedList.value?.color ?? 'gray')

function selectColor(color: Project['color']) {
  newColor.value = color
  choosingColor.value = false
}

function cancelEditing() {
  editing.value = false
  choosingColor.value = false

  if (editorRef.value == null) return
  editorRef.value.textContent = openedList.value?.title ?? ''
}

function save() {
  editing.value = false
  choosingColor.value = false

  if (openedList.value.id == null) return

  const title = editorRef.value?.textContent ?? ''
  listsStore.updateProject(openedList.value.id, { title, color: color.value })
}
</script>

<template>
  <ListPageHead>
    <div class="title-block" :class="{ 'editing': editing }">
      <PageTitle>
        <ProjectColorPicker
          v-if="choosingColor"
          :color="color"
          @update:color="selectColor"
        />
        <ProjectColor
          v-else
          :color="color" 
          size="large"
          @click="editing = true; choosingColor = true"
        />
        <span
          ref="editorRef"
          class="title-editor"
          contenteditable="true"
          placeholder="Title"
          @focus="editing = true"
        >
          {{ openedList.title }}
        </span>
      </PageTitle>
      <EditorControls v-if="editing" @save="save" @cancel="cancelEditing" />
    </div>
  </ListPageHead>
</template>

<style scoped>
.title-editor {
  font-weight: inherit;
}

.title-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.editing {
  padding: 8px;
  border: 1px solid var(--color-text);
  border-radius: var(--border-radius);
}
</style>
