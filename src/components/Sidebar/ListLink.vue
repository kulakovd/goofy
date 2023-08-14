<script setup lang="ts">
import SidebarLink from './SidebarLink.vue';

defineProps<{
  list: { id: string; title: string }
}>()
</script>

<template>
  <SidebarLink :to="`/list/${list.id}`">
    {{ list.title }}
  </SidebarLink>
</template>
