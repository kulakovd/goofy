# Goofy

The simplest to-do app for tracking your lists and projects without distraction.

## The problem

To-do list apps usually offers too many futures that distracts you from the main functionality of the app. They might be so comprehensive that you need to read a manual to understand how to start with it. This situation doesn't help you to get your affairs in order. It more likely will lead you to give up the app not creating the first task.

Goofy, as it clear from its name, very simple and stupid app. There are functions that Goofy doens't have and will never have:
- It can not be integrated with calendars and emails;
- It can not notify you about you tasks
- It can not monitor that you complete tasks in time
- It can not prioritize tasks you create
- It can not categorize your tasks by any criteria but project
- It can not make a hierarchy of your tasks

## How to use it then

Goofy has only two entities: task and project.

Tasks placed in 3 default lists:
- Today
- This week
- Later

Every task has three properties: Title, Description and Completion (yes or no).
The description is optional and you can put there any additional info, but you usually needn't.

A project has three properties as well: Title, Goal and Completion. 
Fill goal field answering two questions:
- How do you see the result of the project?
- Why do you need to complete the project?

Seeing the goal should help you to maintain a motivation to complete the project.
And you can use the goal to understand that tasks to add to the project (Does this task leads me completing the project?)

# Development

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
