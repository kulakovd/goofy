<script setup lang="ts">
import Page from '@/components/Page.vue';
import PageTitle from '@/components/PageTitle.vue';
import AddTaskButton from '@/components/AddTaskButton.vue';
import TaskList from '@/components/Task/TaskList.vue';
import ProjectColor from '@/components/ProjectColor.vue';

const project = {
  id: '1',
  title: 'Project 1',
  color: 'gray',
  goal: /** Long long string */ `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed euismod, diam id aliquam ultrices, nisl nunc aliquet 
    nunc, vitae ultricies nisl nunc vitae nunc. Sed euismod, 
    diam id aliquam ultrices, nisl nunc aliquet nunc, vitae 
    ultricies nisl nunc vitae nunc. Sed euismod, diam id 
    aliquam ultrices, nisl nunc aliquet nunc, vitae ultricies 
    nisl nunc vitae nunc. Sed euismod, diam id aliquam 
  `
} as const;
</script>

<template>
  <Page>
    <div class="head">
      <PageTitle>
        <ProjectColor :color="project.color" size="large" />
        {{ project.title }}
      </PageTitle>
      <AddTaskButton />
    </div>
    <div>
      <span class="goal-title">Project goal:</span>
      <span class="goal-text">{{ project.goal }}</span>
    </div>
    <TaskList />
  </Page>
</template>

<style scoped>
.head {
  z-index: 1;
  position: sticky;
  top: 0;
  background: white;
  width: 100%;
}

.goal-title {
  font-weight: bold;
}
</style>
