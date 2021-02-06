<template>
  <div class="h-full">
    <header class="border-b-2 border-primary">
      <h1 class="text-3xl text-center font-bold mt-1 w-full">
        Meine Ortsgruppen
      </h1>
    </header>
    <main>
      <div class="flex flex-col h-full">
        <div v-if="$isAdmin()" class="shadow-lg mt-2 mx-2">
          <div class="flex">
            <input
              v-model="searchTerm"
              type="search"
              class="rounded-b-none rounded-r-none flex-grow"
              placeholder="Suchen..."
            />
            <button
              class="rounded-l-none rounded-b-none"
              @click="toggleFilterMenu()"
            >
              <font-awesome-icon icon="filter" />
            </button>
          </div>
          <div class="relative w-full flex justify-end">
            <div
              class="h-0 border-0 transition-all duration-300 flex flex-col overflow-hidden p-0 absolute bg-white border-primary border-l border-r w-74 justify-center"
              :class="{
                'h-24': isFilterExpanded,
                'p-1': isFilterExpanded,
                'border-b': isFilterExpanded,
              }"
            >
              <label class="flex items-center w-full">
                <input
                  v-model="filterSetting"
                  type="radio"
                  class="mr-2"
                  name="filter"
                  value="all"
                />
                Alle OGs
              </label>
              <label class="flex items-center">
                <input
                  v-model="filterSetting"
                  type="radio"
                  class="mr-2"
                  name="filter"
                  value="mine"
                />
                Nur OGs, von denen ich Buddy bin
              </label>
              <label class="flex items-center">
                <input
                  v-model="filterSetting"
                  type="radio"
                  class="mr-2"
                  name="filter"
                  value="withoutBuddy"
                />
                Nur OGs ohne Buddy
              </label>
            </div>
          </div>
        </div>
        <div
          v-if="localGroups"
          class="flex-grow mx-2 mb-2 shadow-2xl overflow-y-scroll"
        >
          <details
            v-for="state of $util
              .states()
              .filter((state) => stateHasGroups(state))"
            :key="state"
            class="state-overview"
            open
          >
            <summary class="flex items-center justify-between max-w-sm mx-auto">
              <h2 class="text-2xl ml-1 flex font-semibold">
                {{ $util.stateToName(state) }}:
              </h2>
              <font-awesome-icon
                icon="caret-down"
                class="open-indicator hidden"
              />
              <font-awesome-icon icon="caret-up" class="closed-indicator" />
            </summary>
            <ul class="flex-grow mx-2 mb-2 shadow-2xl">
              <li
                v-for="(localGroup, i) of localGroups.filter(
                  (g) => g.state === state
                )"
                :key="localGroup.id"
                class="border border-t-gray-600 w-full flex justify-center"
                :class="{
                  'bg-green-600': localGroup.finished,
                  'rounded-b-lg': i === localGroups.length - 1,
                  'border-b-gray-600': i === localGroups.length - 1,
                }"
              >
                <details class="list-style-none w-full py-1">
                  <summary
                    class="list-style-none flex items-center cursor-pointer"
                    @click="expandGroup(localGroup.id)"
                  >
                    <h3 class="text-2xl text-center ml-1">
                      {{ localGroup.name }}
                    </h3>
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
                                v-if="isFinishedPoll(localGroup.poll)"
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
                      <NewRepresentative
                        @newRep="
                          $store.dispatch('newRep', {
                            rep: $event,
                            group: localGroup.id,
                          })
                        "
                      />
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
          </details>
        </div>
        <div
          v-else
          class="flex-grow m-2 shadow-2xl flex items-center justify-center bg-gray-500 bg-opacity-25 rounded-lg"
        >
          <font-awesome-icon
            icon="spinner"
            class="text-5xl animate-spin"
            aria-hidden="false"
            alt="Ortsgruppen werden geladen"
          />
        </div>
        <NewLocalGroup v-if="$isAdmin()" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { clipboard } from 'vue-clipboards'
import RepresentativeComponent from '@/components/Representative.vue'
import { LocalGroup } from 'src/LocalGroup'

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

  searchTerm = ''

  stateHasGroups(state: any) {
    return !!this.localGroups.find((g: any) => g.state === state)
  }

  get localGroups() {
    return this.$store.state.localGroups?.filter((g: LocalGroup) => {
      if (this.filterSetting === 'withoutBuddy' && g.buddy !== null) {
        return false
      } else if (
        this.filterSetting === 'mine' &&
        (g.buddy === null || g.buddy !== this.userAsBuddy.id)
      ) {
        return false
      }
      if (this.searchTerm !== '') {
        return g.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      }
      return true
    })
  }

  buddies: any = []
  userAsBuddy: any = null

  $axios: any

  created() {
    this.$store.dispatch('getGroups')
    this.$axios.$get('buddies').then((data: any) => {
      this.buddies = data
      this.userAsBuddy = this.buddies.find(
        (buddy: any) => buddy.cloudUsername === this.$auth.user!.username
      )
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

  isFinishedPoll(poll: any) {
    for (const prop in poll) {
      if (poll[prop] === null) {
        return false
      }
    }
    return true
  }

  isFilterExpanded = false
  toggleFilterMenu() {
    this.isFilterExpanded = !this.isFilterExpanded
  }

  filterSetting: 'all' | 'mine' | 'withoutBuddy' = 'all'
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
.state-overview[open] > summary > .open-indicator {
  display: block;
}
.state-overview[open] > summary > .closed-indicator {
  display: none;
}
</style>
