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
            v-for="(localGroup, i) of localGroupsFiltered"
            :key="localGroup.id"
            class="border border-t-gray-600 w-full flex justify-center"
            :class="{
              'bg-green-600': localGroup.finished,
              'rounded-t-lg': i === 0,
              'rounded-b-lg': i === localGroups.length - 1,
              'border-b-gray-600': i === localGroups.length - 1,
            }"
          >
            <details class="list-style-none w-full p-1">
              <summary class="list-style-none text-center">
                <h2 class="text-2xl">{{ localGroup.name }}</h2>
              </summary>
              <div
                class="border-t-2 flex flex-col justify-center md:flex-row md:justify-around md:flex-wrap min-w-md"
              >
                <section>
                  <h3 class="text-xl">Fragen:</h3>
                  <form
                    v-if="localGroup.poll"
                    class="flex flex-col"
                    @change="localGroup.sendPoll()"
                  >
                    <label :for="localGroup.id + '-streik'" class="mt-5 mb-3">
                      Hat die OG vor am 18.03 zu streiken?
                    </label>
                    <select
                      :id="localGroup.id + '-streik'"
                      v-model="localGroup.poll.strike"
                      class="mb-5"
                    >
                      <option :value="null">-</option>
                      <option :value="1">Sicher nicht</option>
                      <option :value="2">Wahrscheinlich nicht</option>
                      <option :value="3">Wahrscheinlich schon</option>
                      <option :value="4">Sicher</option>
                    </select>
                    <label
                      v-if="
                        localGroup.poll.streik && localGroup.poll.streik !== 4
                      "
                      :for="localGroup.id + '-why-not'"
                      class="mb-3"
                    >
                      Warum nicht?
                    </label>
                    <textarea
                      v-if="
                        localGroup.poll.streik && localGroup.poll.streik !== 4
                      "
                      :id="localGroup.id + '-why-not'"
                      v-model="localGroup.poll.whyNot"
                      class="mb-5"
                    ></textarea>
                    <label :for="localGroup.id + '-orga'" class="mb-3"
                      >Habt ihr genug Menschen für die Orga?</label
                    >
                    <select
                      :id="localGroup.id + '-orga'"
                      v-model="localGroup.poll.people"
                      class="mb-5"
                    >
                      <option :value="null">-</option>
                      <option value="1">Nein überhaupt nicht</option>
                      <option value="2">Ein bisschen knapp</option>
                      <option value="3">Genau richtig</option>
                      <option value="4">Fast zu viele</option>
                    </select>
                    <label :for="localGroup.id + '-technik'" class="mb-3"
                      >Habt ihr genug Technik?</label
                    >
                    <select
                      :id="localGroup.id + '-technik'"
                      v-model="localGroup.poll.equipment"
                      class="mb-5"
                    >
                      <option :value="null">-</option>
                      <option value="1">Nein überhaupt nicht</option>
                      <option value="2">Ein bisschen knapp</option>
                      <option value="3">Genau richtig</option>
                      <option value="4">Fast zu viel</option>
                    </select>
                    <label :for="localGroup.id + '-mobi'" class="mb-3"
                      >Hat die OG schon Mobimaterial bestellt?</label
                    >
                    <select
                      :id="localGroup.id + '-mobi'"
                      v-model="localGroup.poll.mobi"
                      class="mb-5"
                    >
                      <option :value="null">-</option>
                      <option value="1">Nein &amp; wird sie nicht</option>
                      <option value="2">Nein, aber will sie noch</option>
                      <option value="3">Ja</option>
                    </select>
                    <label :for="localGroup.id + '-starter'" class="mb-3"
                      >Habt ihr alle Sachen aus den Starterpacks?</label
                    >
                    <div
                      id="localGroup.id + '-starter'"
                      class="mb-5 flex justify-around"
                    >
                      <div>
                        <label :for="localGroup.id + 'starter-yes'">Ja</label>
                        <input
                          :id="localGroup.id + '-starter-yes'"
                          v-model="localGroup.poll.starter"
                          :name="localGroup.id + '-starter'"
                          type="radio"
                          :value="true"
                        />
                      </div>
                      <div>
                        <label :for="localGroup.id + 'starter-no'">Nein</label>
                        <input
                          :id="localGroup.id + '-starter-no'"
                          v-model="localGroup.poll.starter"
                          :name="localGroup.id + '-starter'"
                          type="radio"
                          :value="false"
                        />
                      </div>
                    </div>
                  </form>
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
                        :is-ex="false"
                      />
                    </li>
                  </ul>
                  <button
                    v-if="localGroup.newDeliMenu == 'CLOSED'"
                    class="m-3 text-xl inline-block"
                    @click="localGroup.newDeliMenu = 'OPEN'"
                  >
                    Neuer Deli
                  </button>
                  <form
                    v-else
                    class="flex flex-col px-1"
                    :class="{
                      'text-gray-600': localGroup.newDeliMenu === 'LOADING',
                    }"
                    @submit.prevent="localGroup.saveNewDeli($axios)"
                  >
                    <div class="flex justify-between">
                      <label class="m-1">Name:</label>
                      <input
                        v-model="localGroup.newDeli.name"
                        class="my-1"
                        :disabled="localGroup.newDeliMenu === 'LOADING'"
                        required
                      />
                    </div>
                    <div class="flex justify-between">
                      <label class="m-1">Nummer:</label>
                      <input
                        v-model="localGroup.newDeli.phone"
                        class="my-1"
                        type="tel"
                        :disabled="localGroup.newDeliMenu === 'LOADING'"
                      />
                    </div>
                    <div class="flex justify-around mt-1">
                      <button
                        class="px-1"
                        :disabled="localGroup.newDeliMenu == 'LOADING'"
                        @click="localGroup.cancelNewDeli()"
                      >
                        Abbrechen
                      </button>
                      <input
                        type="submit"
                        value="Speichern"
                        class="px-1"
                        :disabled="localGroup.newDeliMenu == 'LOADING'"
                      />
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
                        is-ex
                      />
                    </li>
                  </ul>
                </section>
                <section v-if="$isAdmin()">
                  <h3 class="text-xl">Buddy:</h3>
                  <!-- the @change could prob be replaced with a watcher -->
                  <select
                    v-model="localGroup.buddy"
                    class="mx-auto block"
                    @change="localGroup.setBuddy()"
                  >
                    <option :value="null">-</option>
                    <option
                      v-for="buddy of buddies"
                      :key="buddy.id"
                      :value="buddy.id"
                    >
                      {{ `${buddy.name} (${buddy.cloudUsername})` }}
                    </option>
                  </select>
                </section>
              </div>
            </details>
          </li>
        </ul>
        <div v-if="$isAdmin()" class="self-center">
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
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { CancelTokenSource } from 'axios'
import RepresentativeComponent from '@/components/Representative.vue'

class LocalGroup {
  representatives: Representative[]
  exRepresentatives: Representative[]
  name: string
  id: string
  newDeliMenu: 'CLOSED' | 'OPEN' | 'LOADING' = 'CLOSED'
  newDeli = { name: '', phone: '' }
  buddy: any = null
  poll = {
    strike: null,
    whyNot: null,
    equipment: null,
    people: null,
    mobi: null,
    starter: null,
  }

  axios: NuxtAxiosInstance
  pollCancelToken: CancelTokenSource | null = null

  sendPoll() {
    // eslint-disable-next-line no-unused-expressions
    this.pollCancelToken?.cancel()
    this.pollCancelToken = this.axios.CancelToken.source()
    return this.axios.put(`/localGroups/${this.id}/poll`, this.poll, {
      cancelToken: this.pollCancelToken.token,
    })
  }

  constructor(data: any, axios: NuxtAxiosInstance) {
    this.axios = axios
    this.pollCancelToken = axios.CancelToken.source()
    this.representatives = data.representatives.map(
      (rep: any) => new Representative(rep, axios)
    )
    this.exRepresentatives = data.exRepresentatives.map(
      (rep: any) => new Representative(rep, axios)
    )
    this.name = data.name
    this.id = data.id
    // data.buddy is sometimes undefined, but we just want null
    this.buddy = data.buddy || null
    if (data.poll) {
      this.poll = data.poll
    }
  }

  async removeRep(rep: Representative) {
    await this.axios.delete(`/localGroups/${this.id}/representatives/${rep.id}`)
    const index = this.representatives.findIndex((r) => r === rep)
    this.representatives.splice(index, 1)
  }

  async removeExRep(exRep: Representative) {
    await this.axios.delete(
      `/localGroups/${this.id}/exRepresentatives/${exRep.id}`
    )
    const index = this.exRepresentatives.findIndex((r) => r === exRep)
    this.exRepresentatives.splice(index, 1)
  }

  async makeCurrent(rep: Representative) {
    await this.axios.put(`/localGroups/${this.id}/representatives/${rep.id}`)
    const index = this.exRepresentatives.findIndex((r) => r === rep)
    this.exRepresentatives.splice(index, 1)
    this.representatives.push(rep)
  }

  async makeEx(rep: Representative) {
    await this.axios.put(`/localGroups/${this.id}/exRepresentatives/${rep.id}`)
    const index = this.representatives.findIndex((r) => r === rep)
    this.representatives.splice(index, 1)
    this.exRepresentatives.push(rep)
  }

  cancelNewDeli() {
    this.newDeliMenu = 'CLOSED'
    this.newDeli.name = ''
    this.newDeli.phone = ''
  }

  async saveNewDeli() {
    this.newDeliMenu = 'LOADING'
    this.representatives.push(
      new Representative(
        await this.axios.$post(
          `localGroups/${this.id}/representatives`,
          this.newDeli
        ),
        this.axios
      )
    )
    this.cancelNewDeli()
  }

  setBuddy() {
    if (this.buddy) {
      return this.axios.put(`localGroups/${this.id}/buddy/${this.buddy}`)
    } else {
      return this.axios.delete(`localGroups/${this.id}/buddy/`)
    }
  }
}

class Representative {
  name: string
  originalName: string
  phone: string
  originalPhone: string
  editing = false
  menuOpen = false
  axios: NuxtAxiosInstance

  id: string

  constructor(data: any, axios: NuxtAxiosInstance) {
    this.axios = axios
    this.name = data.name
    this.originalName = this.name
    this.phone = data.phone
    this.originalPhone = this.phone
    this.id = data.id
  }

  get waMe() {
    return (
      'https://wa.me/' + this.phone.replace(/[\s+()]/g, '').replace(/^0/, '49')
    )
  }

  async save() {
    await this.axios.patch(`/representatives/${this.id}`, {
      phone: this.phone,
      name: this.name,
    })
    this.editing = false
    this.originalPhone = this.phone
    this.originalName = this.name
  }

  cancel() {
    this.editing = false
    this.phone = this.originalPhone
    this.name = this.originalName
  }

  copyNumber() {
    window.navigator.clipboard.writeText(this.formattedPhone)
  }

  get phoneLink() {
    return 'tel:' + this.phone
  }

  get formattedPhone() {
    const countryCode = this.phone.slice(0, 3)
    const firstPart = this.phone.slice(3, 7)
    const secondPart = this.phone.slice(7)
    return countryCode + ' ' + firstPart + ' ' + secondPart
  }
}

@Component({
  components: {
    RepresentativeComponent,
  },
})
export default class IndexView extends Vue {
  openMenu: null | HTMLElement = null

  localGroups: any = []

  get localGroupsFiltered() {
    return [...this.localGroups].sort((a, b) => a.name.localeCompare(b.name))
  }

  buddies: any = []

  editingNewGroup = false
  newLocalGroup = { name: '', state: null }

  $axios: any

  created() {
    this.$axios.$get('localGroups').then((data: any) => {
      this.localGroups = data.map(
        (localGroup: any) => new LocalGroup(localGroup, this.$axios)
      )
    })
    this.$axios.$get('buddies').then((data: any) => {
      this.buddies = data
    })
  }

  async createNewGroup() {
    const newGroup = await this.$axios.$post('localGroups', this.newLocalGroup)
    this.editingNewGroup = false
    this.localGroups.push(new LocalGroup(newGroup, this.$axios))
    this.newLocalGroup = { name: '', state: null }
  }

  isAdmin() {
    const user = this.$auth.user as any
    return user.groups?.includes('/OG Amrum')
  }

  handleClick() {
    alert('test')
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
