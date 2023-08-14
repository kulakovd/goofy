<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'

defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink :to="to" active-class="active">
    <SidebarItem class="item">
      <slot />
    </SidebarItem>
  </RouterLink>
</template>

<style>
.active .item {
  background-color: var(--menu-hover-bg);
}
</style>
