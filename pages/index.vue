<template>
  <div class="h-full" @click=";(openMenu = null) && alert('test')">
    <header class="border-b-2 border-primary">
      <h1 class="text-3xl text-center font-bold mt-1 w-full">
        Meine Ortsgruppen
      </h1>
    </header>
    <main>
      <div class="flex flex-col h-full">
        <ul class="flex-grow m-2 shadow-2xl overflow-y-scroll">
          <li
            v-for="(localGroup, i) of localGroups"
            :key="localGroup.id"
            class="border border-t-gray-600 w-full flex justify-center"
            :class="{
              'bg-green-600': localGroup.finished,
              'rounded-t-lg': i === 0,
              'rounded-b-lg': i === localGroups.length - 1,
              'border-b-gray-600': i === localGroups.length - 1,
            }"
          >
            <details class="list-style-none w-full py-1">
              <summary
                class="list-style-none text-center cursor-pointer"
                @click="expandGroup(localGroup.id)"
              >
                <h2 class="text-2xl">{{ localGroup.name }}</h2>
              </summary>
              <div
                v-if="isExpanded(localGroup.id)"
                class="border-t-2 flex flex-col justify-center md:flex-row md:justify-around md:flex-wrap min-w-md px-1"
              >
                <section class="w-full max-w-xs">
                  <h3 class="text-xl">Umfragen:</h3>
                  <table class="flex flex-col p-3">
                    <thead class="flex">
                      <th class="w-32">Thema</th>
                      <th class="w-24 text-center">Ausgefüllt?</th>
                    </thead>
                    <tbody>
                      <tr class="flex">
                        <td class="w-32">Großstreik 19.03</td>
                        <td class="text-center w-24">
                          <font-awesome-icon
                            class="text-primary"
                            icon="check-circle"
                          />
                        </td>
                        <td class="ml-3">
                          <NuxtLink
                            :to="`/${localGroup.name}/poll`"
                            class="button"
                          >
                            <font-awesome-icon icon="edit" />
                          </NuxtLink>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section class="flex flex-col relative">
                  <h3 class="text-xl">Delis:</h3>
                  <ul>
                    <li
                      v-for="deli of localGroup.representatives"
                      :key="deli.id"
                      class="deli"
                    >
                      <representative
                        :local-group="localGroup"
                        :representative="deli"
                        :open-menu.sync="openMenu"
                      />
                    </li>
                  </ul>
                  <button
                    v-if="newRepMenus[localGroup.id] === undefined"
                    class="m-3 text-xl inline-block"
                    @click="openNewRepMenu(localGroup.id)"
                  >
                    Neuer Deli
                  </button>
                  <form
                    v-else
                    class="flex flex-col px-1"
                    :class="{
                      'text-gray-600': localGroup.newDeliMenu === 'LOADING',
                    }"
                    @reset="cancelNewRep(localGroup.id)"
                    @submit.prevent="submitNewRep(localGroup.id)"
                  >
                    <div class="flex justify-between">
                      <label class="m-1">Name:</label>
                      <input
                        v-model="newRepMenus[localGroup.id].name"
                        class="my-1"
                        :disabled="localGroup.newDeliMenu === 'LOADING'"
                        required
                      />
                    </div>
                    <div class="flex justify-between">
                      <label class="m-1">Nummer:</label>
                      <input
                        v-model="newRepMenus[localGroup.id].phone"
                        class="my-1"
                        type="tel"
                        required
                      />
                    </div>
                    <div class="flex justify-around mt-1">
                      <input
                        type="reset"
                        class="px-1"
                        value="Abbrechen"
                        @click="cancelNewRep(localGroup.id)"
                      />
                      <input type="submit" value="Speichern" class="px-1" />
                    </div>
                  </form>
                </section>
                <section
                  v-if="localGroup.exRepresentatives.length > 0"
                  class="relative"
                >
                  <h3 class="text-xl">Ex-Delis:</h3>
                  <ul>
                    <li
                      v-for="deli of localGroup.exRepresentatives"
                      :key="deli.id"
                      class="flex flex-col justify-around text-lg p-1 deli"
                    >
                      <representative
                        :local-group="localGroup"
                        :representative="deli"
                        :open-menu.sync="openMenu"
                      />
                    </li>
                  </ul>
                </section>
                <section v-if="$isAdmin()">
                  <h3 class="text-xl">Buddy:</h3>
                  <!-- the @change could prob be replaced with a watcher -->
                  <select
                    class="mx-auto block"
                    @change.stop="
                      $store.dispatch('setBuddy', {
                        group: localGroup.id,
                        buddy: $event.target.value,
                      })
                    "
                  >
                    <option :value="null">-</option>
                    <option
                      v-for="buddy of buddies"
                      :key="buddy.id"
                      :value="buddy.id"
                      :selected="buddy.id === localGroup.buddy"
                    >
                      {{ `${buddy.name} (${buddy.cloudUsername})` }}
                    </option>
                  </select>
                </section>
              </div>
            </details>
          </li>
        </ul>
        <NewLocalGroup v-if="$isAdmin()" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { clipboard } from 'vue-clipboards'
import RepresentativeComponent from '@/components/Representative.vue'

@Component({
  directives: {
    clipboard,
  },
  components: {
    RepresentativeComponent,
  },
})
export default class IndexView extends Vue {
  openMenu: null | HTMLElement = null

  newRepMenus: any = {}

  openNewRepMenu(groupId: string) {
    Vue.set(this.newRepMenus, groupId, {
      name: '',
      phone: '',
    })
  }

  cancelNewRep(groupId: string) {
    Vue.delete(this.newRepMenus, groupId)
  }

  submitNewRep(groupId: string) {
    this.$store.dispatch('newRep', {
      group: groupId,
      rep: this.newRepMenus[groupId],
    })
    this.cancelNewRep(groupId)
  }

  get localGroups() {
    return this.$store.state.localGroups
  }

  buddies: any = []

  $axios: any

  created() {
    this.$store.dispatch('getGroups')
    this.$axios.$get('buddies').then((data: any) => {
      this.buddies = data
    })
  }

  isAdmin() {
    const user = this.$auth.user as any
    return user.groups?.includes('/RegioBuddys')
  }

  handleClick() {
    alert('test')
  }

  expandedGroups: any = {}

  expandGroup(groupId: string) {
    Vue.set(this.expandedGroups, groupId, true)
  }

  isExpanded(groupId: string) {
    return this.expandedGroups[groupId]
  }
}
</script>
<style>
.deli + .deli::before {
  @apply block rounded-full w-11/12 m-auto h-1 bg-secondary;
  content: '';
}

.menu-right {
  left: calc(100% - 210px);
}
</style>
