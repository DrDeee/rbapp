<template>
  <div class="self-center">
    <button
      v-if="!editingNewGroup"
      class="my-5 text-xl relative"
      @click="editingNewGroup = true"
    >
      Neue Ortsgruppe
    </button>
    <form
      v-else
      class="self-center flex flex-col px-1"
      @reset="
        {
          editingNewGroup = false
          newLocalGroup = { name: '', state: null }
        }
      "
      @submit.prevent="createNewGroup()"
    >
      <div class="mt-5 flex justify-between items-center">
        <label class="mr-1">Name:</label>
        <input v-model="newLocalGroup.name" required />
      </div>
      <div class="my-5 flex justify-between items-center">
        <label class="mr-1">Bundesland:</label>
        <select v-model="newLocalGroup.state" required>
          <option disabled selected :value="null">–</option>
          <option v-for="state of $util.states()" :key="state" :value="state">
            {{ $util.stateToName(state) }}
          </option>
        </select>
      </div>
      <div class="flex justify-around max-w-md mb-3">
        <button type="reset" class="w-24">Abbrechen</button>
        <button type="submit" class="w-24">Speichern</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class NewLocalGroup extends Vue {
  editingNewGroup = false
  newLocalGroup = { name: '', state: null }

  createNewGroup() {
    this.$store.dispatch('newLocalGroup', this.newLocalGroup)
    this.editingNewGroup = false
    this.newLocalGroup = { name: '', state: null }
  }
}
</script>
