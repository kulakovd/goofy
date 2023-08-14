<script setup lang="ts">
import { ref } from 'vue';
import SidebarItem from './SidebarItem.vue'
import { $ } from 'vue/macros';

defineProps<{
  to: string
}>()

const emit = defineEmits<{
  drop: []
}>()

const showDropzone = ref(false)

function onDrop() {
  showDropzone.value = false
  emit('drop')
}
</script>

<template>
  <RouterLink :to="to" active-class="active">
    <SidebarItem
      class="item"
      :class="{ 'dropzone-active': showDropzone }"
      @dragenter="showDropzone = true"
      @dragleave="showDropzone = false"
      @drop="onDrop"
    >
      <slot />
    </SidebarItem>
  </RouterLink>
</template>

<style>
.active .item, .item:hover, .dropzone-active {
  background-color: var(--menu-hover-bg);
}
</style>
