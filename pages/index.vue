<template>
  <div class="h-full">
    <header class="border-b-2 border-primary">
      <h1 class="text-3xl text-center font-bold mt-1 w-full">
        Meine Ortsgruppen
      </h1>
    </header>
    <main>
      <div class="flex flex-col h-full">
        <ul
          v-if="localGroups !== null"
          class="flex-grow m-2 shadow-2xl overflow-y-scroll"
        >
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
