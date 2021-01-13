<template>
  <div class="h-full" @click="openMenu = null">
    <header>
      <h1
        class="text-3xl text-center font-bold mt-1 w-full border-b-2 border-primary"
      >
        Meine Ortsgruppen
      </h1>
    </header>
    <main class="overflow-scroll">
      <ul class="flex flex-col m-2 shadow-2xl">
        <li
          v-for="(localGroup, i) of localGroups"
          :key="localGroup.name"
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
              <h2 class="text-2xl">
                {{ localGroup.name }}
              </h2>
            </summary>
            <div class="border-t-2 flex flex-col justify-center">
              <h3 class="text-xl">Fragen:</h3>
              <form class="flex flex-col">
                <label :for="localGroup.id + '-streik'" class="mt-5 mb-3">
                  Hat die OG vor am 18.03 zu streiken?
                </label>
                <select
                  :id="localGroup.id + '-streik'"
                  v-model="localGroup.questionary.streik"
                  class="mb-5"
                >
                  <option :value="null">-</option>
                  <option value="1">Sicher nicht</option>
                  <option value="2">Wahrscheinlich nicht</option>
                  <option value="3">Wahrscheinlich schon</option>
                  <option value="4">Sicher</option>
                </select>
                <label :for="localGroup.id + '-why-not'" class="mb-3">
                  Warum nicht?
                </label>
                <textarea
                  :id="localGroup.id + '-why-not'"
                  v-model="localGroup.questionary['why-not']"
                  class="mb-5"
                >
                </textarea>
                <label :for="localGroup.id + '-orga'" class="mb-3">
                  Habt ihr genug Menschen für die Orga?
                </label>
                <select
                  :id="localGroup.id + '-orga'"
                  v-model="localGroup.questionary.orga"
                  class="mb-5"
                >
                  <option :value="null">-</option>
                  <option value="1">Nein überhaupt nicht</option>
                  <option value="2">Ein bisschen knapp</option>
                  <option value="3">Genau richtig</option>
                  <option value="4">Fast zu viele</option>
                </select>
                <label :for="localGroup.id + '-technik'" class="mb-3">
                  Habt ihr genug Technik?
                </label>
                <select
                  :id="localGroup.id + '-technik'"
                  v-model="localGroup.questionary.technik"
                  class="mb-5"
                >
                  <option :value="null">-</option>
                  <option value="1">Nein überhaupt nicht</option>
                  <option value="2">Ein bisschen knapp</option>
                  <option value="3">Genau richtig</option>
                  <option value="4">Fast zu viel</option>
                </select>
                <label :for="localGroup.id + '-mobi'" class="mb-3">
                  Hat die OG schon Mobimaterial bestellt?
                </label>
                <select
                  :id="localGroup.id + '-mobi'"
                  v-model="localGroup.questionary.mobi"
                  class="mb-5"
                >
                  <option :value="null">-</option>
                  <option value="1">Nein &amp; wird sie nicht</option>
                  <option value="2">Nein, aber will sie noch</option>
                  <option value="3">Ja</option>
                </select>
                <label :for="localGroup.id + '-starter'" class="mb-3">
                  Habt ihr alle Sachen aus den Starterpacks?
                </label>
                <div
                  id="localGroup.id + '-starter'"
                  class="mb-5 flex justify-around"
                >
                  <div>
                    <label :for="localGroup.id + 'starter-yes'"> Ja </label>
                    <input
                      :id="localGroup.id + '-starter-yes'"
                      v-model="localGroup.questionary.starter"
                      :name="localGroup.id + '-starter'"
                      type="radio"
                      :value="true"
                    />
                  </div>
                  <div>
                    <label :for="localGroup.id + 'starter-no'"> Nein </label>
                    <input
                      :id="localGroup.id + '-starter-no'"
                      v-model="localGroup.questionary.starter"
                      :name="localGroup.id + '-starter'"
                      type="radio"
                      :value="false"
                    />
                  </div>
                </div>
              </form>
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
                  <label class="my-1"> Name: </label>
                  <input
                    v-model="localGroup.newDeli.name"
                    class="my-1"
                    :disabled="localGroup.newDeliMenu === 'LOADING'"
                    required
                  />
                </div>
                <div class="flex justify-between">
                  <label class="my-1 w-5"> Nummer: </label>
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
            </div>
          </details>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import RepresentativeComponent from '@/components/Representative.vue'

class LocalGroup {
  representatives: Representative[]
  exRepresentatives: Representative[]
  name: string
  id: string
  newDeliMenu: 'CLOSED' | 'OPEN' | 'LOADING' = 'CLOSED'
  newDeli = { name: '', phone: '' }
  questionary = {
    streik: null,
    'why-not': '',
    orga: null,
    technik: null,
    mobi: null,
    starter: null,
  }

  axios: NuxtAxiosInstance

  constructor(data: any, axios: NuxtAxiosInstance) {
    this.axios = axios
    this.representatives = data.representatives.map(
      (rep: any) => new Representative(rep, axios)
    )
    this.exRepresentatives = data.exRepresentatives.map(
      (rep: any) => new Representative(rep, axios)
    )
    this.name = data.name
    this.id = data.id
  }

  async removeRep(rep: Representative) {
    await this.axios.delete(`/localGroups/${this.id}/representatives/${rep.id}`)
    const index = this.representatives.findIndex((r) => r === rep)
    this.representatives.splice(index, 1)
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

  $axios: any

  created() {
    this.$axios.get('localGroups').then((response: any) => {
      this.localGroups = response.data.map(
        (localGroup: any) => new LocalGroup(localGroup, this.$axios)
      )
    })
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
