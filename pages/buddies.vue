<template>
  <div class="h-full" @click="openMenu = null">
    <header>
      <h1
        class="text-3xl text-center font-bold mt-1 w-full border-b-2 border-primary"
      >
        Meine Buddies
      </h1>
    </header>
    <main class="overflow-scroll p-1 justify-center">
      <ul class="flex flex-col">
        <li v-for="buddy of buddies" :key="buddy.id">
          <Buddy :buddy="buddy" />
        </li>
      </ul>
      <div
        v-if="buddyToDelete"
        class="absolute left-0 top-0 w-full h-full p-2 flex items-center bg-black bg-opacity-25"
      >
        <div
          class="w-full max-w-sm mx-auto bg-white p-2 rounded-lg shadow-2xl border-yellow-600 border-2"
        >
          <h2
            class="font-bold text-center text-2xl mb-3 border-yellow-600 border-b-2"
          >
            Buddy löschen
          </h2>
          Bist du dir sicher, dass du den Buddy löschen willst?
          <div class="flex justify-around my-3">
            <button
              class="bg-secondary text-black w-32"
              @click="buddyToDelete = null"
            >
              Nicht löschen
            </button>
            <button
              class="bg-yellow-600 text-black w-32"
              @click="deleteBuddy(buddyToDelete)"
            >
              Löschen
            </button>
          </div>
        </div>
      </div>
      <div v-if="$isAdmin()" class="w-auto mt-1 mb-4">
        <button
          v-if="!adding"
          class="mx-auto shadow-2xl px-4 py-1"
          @click="adding = true"
        >
          Buddy hinzufügen
        </button>
        <form
          v-else
          class="flex flex-col mx-3 mx-auto max-w-sm bg-white rounded-lg shadow-2xl p-2"
          @reset="adding = false"
          @submit.prevent="addBuddy()"
        >
          <h2 class="text-center text-xl font-book mb-3">Buddy hinzufügen</h2>
          <div class="flex justify-between my-1">
            <label for="name" class="w-24"> Name: </label>
            <input v-model="newBuddy.name" required />
          </div>
          <div class="flex justify-between my-1">
            <label for="username" class="w-24"> Username: </label>
            <input id="username" v-model="newBuddy.cloudUsername" required />
          </div>
          <div class="flex justify-around mt-3">
            <input type="reset" value="Abbrechen" />
            <input type="submit" value="Speichern" />
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import RepresentativeComponent from '@/components/Representative.vue'

@Component({
  components: {
    RepresentativeComponent,
  },
})
export default class IndexView extends Vue {
  openMenu: null | HTMLElement = null

  localGroups: any = []

  $axios: any

  adding = false

  newBuddy = { name: '', cloudUsername: '' }
  buddyToDelete = null

  get buddies() {
    return this.$store.state.buddies
  }

  addBuddy() {
    return this.$store
      .dispatch('newBuddy', this.newBuddy)
      .then(() => (this.adding = false))
  }

  created() {
    this.$store.dispatch('getBuddies')
  }
}
</script>
<style></style>
