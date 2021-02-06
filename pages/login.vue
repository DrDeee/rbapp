<template>
  <main>
    <div class="text-xl flex flex-col h-screen items-center">
      <h1 class="text-center mt-10 m-5">
        Hi Aktivisti, herzlich willkommen zur Regio App
      </h1>
      <button class="p-1 px-2 max-w-sm m-5" @click="$auth.loginWith('cloud')">
        Mit Cloud-Account einloggen
      </button>
      <img src="~/assets/greata.jpeg" class="max-h-full flex-shrink" />
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class IndexView extends Vue {}
</script>
