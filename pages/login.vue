<template>
  <main class="text-xl flex flex-col justify-center h-screen items-center">
    <h1 class="text-center m-5">
      Hi Aktivist, herzlich willkommen zur Regio App
    </h1>
    <button class="p-1 px-2 max-w-sm m-5" @click="$auth.loginWith('cloud')">
      Mit Cloud-Account einloggen
    </button>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class IndexView extends Vue {}
</script>
