<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'

defineProps<{
  list: { id: string; title: string }
}>()
</script>

<template>
  <router-link :to="`/list/${list.id}`">
    <SidebarItem>
      {{ list.title }}
    </SidebarItem>
  </router-link>
</template>
