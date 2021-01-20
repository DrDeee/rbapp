<template>
  <div class="h-full" @click="openMenu = null">
    <header>
      <h1
        class="text-3xl text-center font-bold mt-1 w-full border-b-2 border-primary"
      >
        Meine Buddies
      </h1>
    </header>
    <main class="overflow-scroll">
      <ul class="flex flex-col m-2 p-2 shadow-2xl flex-grow">
        <li
          v-for="buddy of buddies"
          :key="buddy.id"
          class="my-2 border border-t-gray-600 w-full flex flex-col justify-around"
        >
          <div class="flex justify-around w-full my-3">
            <span>
              {{ buddy.name }}
            </span>
            <span>
              {{ buddy.cloudUsername }}
            </span>
          </div>
          <div class="flex justify-around w-full mb-3">
            <button @click="buddyToDelete = buddy">Löschen</button>
            <button>Bearbeiten</button>
          </div>
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
      <button v-if="!adding" class="mx-auto mt-5" @click="adding = true">
        Buddy hinzufügen
      </button>
      <form
        v-else
        class="flex flex-col mx-3"
        @reset="adding = false"
        @submit.prevent="addBuddy()"
      >
        <h2 class="text-center text-xl font-book">Buddy hinzufügen</h2>
        <div class="flex mt-3">
          <label for="name" class="w-24"> Name: </label>
          <input v-model="newBuddy.name" required />
        </div>
        <div class="flex my-3">
          <label for="username" class="w-24"> Username: </label>
          <input id="username" v-model="newBuddy.cloudUsername" required />
        </div>
        <div class="flex justify-around">
          <input type="reset" value="Abbrechen" />
          <input type="submit" value="Speichern" />
        </div>
      </form>
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

  buddies: Array<{ name: string; cloudUsername: string; id: string }> = []

  addBuddy() {
    return this.$axios.$post('buddies', this.newBuddy).then((newBuddy: any) => {
      this.buddies.push(newBuddy)
      this.adding = false
    })
  }

  created() {
    this.$axios.$get('buddies').then((buddies: any) => (this.buddies = buddies))
  }

  deleteBuddy(buddy: any) {
    return this.$axios.delete(`buddies/${buddy.id}`).then(() => {
      const index = this.buddies.findIndex(({ id }) => id === buddy.id)
      this.buddies.splice(index, 1)
      this.buddyToDelete = null
    })
  }
}
</script>
<style></style>
