<script setup lang="ts">
import DragIcon from '@/components/Task/DragIcon.vue'
</script>

<template>
  <div class="drag">
    <DragIcon />
  </div>
</template>

<style scoped>
.drag {
  border-radius: 4px;
  cursor: grab;
  position: absolute;
  top: 0;
  left: -24px;
  padding: 8px 4px;
  opacity: 0;
}

.drag:hover {
  background: var(--menu-hover-bg);
}

.drag:active {
  cursor: grabbing;
}
</style>
