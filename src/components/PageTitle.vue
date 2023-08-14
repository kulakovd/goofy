<script setup lang="ts"></script>

<template>
  <h1>
    <slot />
  </h1>
</template>

<style scoped>
h1 {
  display: flex;
  font-size: 1.5em;
  font-weight: bold;
  align-items: center;
  gap: 8px;
}
</style>
