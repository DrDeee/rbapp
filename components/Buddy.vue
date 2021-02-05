<template>
  <div
    class="my-1 border border-t-gray-600 w-full flex justify-around rounded-lg shadow-xl bg-white max-w-sm sm:max-w-xl mx-auto p-1 sm:p-2"
  >
    <div
      class="flex flex-col sm:flex-row justify-around sm:justify-start sm:items-center w-full mr-2"
    >
      <div class="flex h-8 items-center sm:w-40 sm:mr-2">
        <label class="font-semibold w-32 sm:w-auto mr-2 flex-none">
          Name:
        </label>
        <div v-if="editable">
          <input v-model="editBuddy.name" class="min-w-0 w-full" />
        </div>
        <span v-else>
          {{ buddy.name }}
        </span>
      </div>
      <div class="flex h-8 items-center">
        <label class="font-semibold w-32 mr-2 flex-none">
          Cloud-Username:
        </label>
        <div v-if="editable" class="sm:w-40">
          <input v-model="editBuddy.cloudUsername" class="min-w-0 w-full" />
        </div>
        <span v-else class="sm:w-40">
          {{ buddy.cloudUsername }}
        </span>
      </div>
    </div>
    <div
      v-if="$isAdmin()"
      class="flex flex-col sm:flex-row h-full justify-between"
    >
      <button
        v-if="!editable"
        class="w-8 h-8 py-1 mb-1 sm:mb-0 sm:mr-3"
        @click="startEditing()"
      >
        <font-awesome-icon icon="edit" />
      </button>
      <button
        v-else
        class="w-8 h-8 py-1 mb-1 sm:mb-0 sm:mr-3"
        @click="stopEditing()"
      >
        <font-awesome-icon icon="times" />
      </button>
      <button
        v-if="!editable"
        class="w-8 h-8 py-1"
        @click="showDeleteConfirm = true"
      >
        <font-awesome-icon icon="trash" />
      </button>
      <button v-else class="w-8 h-8 py-1" @click="submit()">
        <font-awesome-icon icon="save" />
      </button>
    </div>
    <div
      v-if="showDeleteConfirm"
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
            @click="showDeleteConfirm = false"
          >
            Nicht löschen
          </button>
          <button class="bg-yellow-600 text-black w-32" @click="deleteBuddy()">
            Löschen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class BuddyView extends Vue {
  @Prop({ required: true })
  buddy!: any

  editBuddy: any = null

  showDeleteConfirm = false
  editable = false
  startEditing() {
    this.editable = true
    this.editBuddy = Object.assign({}, this.buddy)
  }

  stopEditing() {
    this.editable = false
  }

  deleteBuddy() {
    return this.$store.dispatch('deleteBuddy', this.buddy.id)
  }

  submit() {
    return this.$store
      .dispatch('updateBuddy', this.editBuddy)
      .then(() => (this.editable = false))
  }
}
</script>
