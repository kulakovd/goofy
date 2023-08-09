<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'

defineProps<{
  list: { id: string; name: string }
}>()
</script>

<template>
  <router-link :to="`/list/${list.id}`">
    <SidebarItem>
      {{ list.name }}
    </SidebarItem>
  </router-link>
</template>
