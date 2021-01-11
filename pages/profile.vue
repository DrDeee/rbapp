<template>
  <div>
    <header>
      <h1 class="text-3xl text-center font-bold mt-1 border-b-2 border-primary">
        Mein Profil
      </h1>
    </header>
    <main class="flex flex-col items-center">
      <div class="my-5">
        <label> Username: </label>
        <span>
          {{ this.$auth.user.username }}
        </span>
      </div>
      <button @click="$auth.logout()">Log out</button>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ProfileView extends Vue {}
</script>
