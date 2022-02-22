<template>
  <button
    v-if="menuClosed"
    class="m-3 text-xl inline-block"
    @click="menuClosed = false"
  >
    Neue:r Deli
  </button>
  <form
    v-else
    class="flex flex-col px-1"
    @reset="cancel"
    @submit.prevent="submit"
  >
    <div class="flex justify-between">
      <label class="m-1">Name:</label>
      <input v-model="name" class="my-1" required />
    </div>
    <div class="flex justify-between">
      <label class="m-1">Nummer:</label>
      <input v-model="phone" class="my-1" type="tel" required />
    </div>
    <div class="flex justify-around mt-1">
      <input type="reset" class="px-1" value="Abbrechen" />
      <input type="submit" value="Speichern" class="px-1" />
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class newRepView extends Vue {
  menuClosed = true
  name = ''
  phone = ''

  constructor() {
    super()
    this.resetState()
  }

  resetState() {
    this.menuClosed = true
    this.name = ''
    this.phone = ''
  }

  cancel() {
    this.resetState()
  }

  submit() {
    this.$emit('newRep', { name: this.name, phone: this.phone })
    this.resetState()
  }
}
</script>
