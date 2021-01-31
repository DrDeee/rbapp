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
      class="self-center flex flex-col"
      @reset="
        {
          editingNewGroup = false
          newLocalGroup = { name: '', state: null }
        }
      "
      @submit.prevent="createNewGroup()"
    >
      <div class="mt-5 flex justify-between items-center">
        <label class="mr-3">Name:</label>
        <input v-model="newLocalGroup.name" required />
      </div>
      <div class="my-5 flex justify-between items-center">
        <label class="mr-3">Bundesland:</label>
        <select v-model="newLocalGroup.state" required>
          <option disabled selected :value="null">–</option>
          <option value="bw">Baden-Württemberg</option>
          <option value="be">Berlin</option>
          <option value="bb">Brandenburg</option>
          <option value="hb">Bremen</option>
          <option value="by">Bayern</option>
          <option value="hh">Hamburg</option>
          <option value="he">Hessen</option>
          <option value="mv">Mecklenburg-Vorpommern</option>
          <option value="ni">Niedersachsen</option>
          <option value="nw">Nordrhein-Westfalen</option>
          <option value="rp">Rheinland-Pfalz</option>
          <option value="sl">Saarland</option>
          <option value="sn">Sachsen</option>
          <option value="st">Sachsen-Anhalt</option>
          <option value="sh">Schleswig-Holstein</option>
          <option value="th">Thüringen</option>
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
