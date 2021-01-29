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
                    class="flex flex-col md:max-w-sm"
                    @submit.prevent=""
                    @change="localGroup.sendPoll()"
                  >
                    <h4 class="mt-5 mb-3 text-lg">
                      Welche Inhalte des OG Starterpacks habt ihr und in welchem
                      Bereich wünscht ihr euch mehr Unterstützung?
                    </h4>
                    <table class="w-full flex flex-col">
                      <thead class="flex justify-end w-full">
                        <th class="mr-2 flex-grow"></th>
                        <th class="block w-12 mr-2 text-center">Haben Wir</th>
                        <th class="block w-20 text-center">Brauchen Wir</th>
                      </thead>
                      <tbody>
                        <tr class="flex flex-wrap justify-end items-center">
                          <td class="flex-grow">Sticker und Plakate:</td>
                          <td
                            class="flex items-center justify-center w-12 mr-2"
                          >
                            <input
                              v-model="localGroup.poll.sticker"
                              type="radio"
                              name="sticker"
                              :value="true"
                            />
                          </td>
                          <td class="flex items-center justify-center w-20">
                            <input
                              v-model="localGroup.poll.sticker"
                              type="radio"
                              name="sticker"
                              :value="false"
                            />
                          </td>
                          <td
                            v-if="localGroup.poll.sticker === false"
                            class="w-full text-center flex justify-end"
                          >
                            <a
                              href="https://fffutu.re/"
                              class="text-blue-500 mr-2"
                            >
                              Bestell-link
                            </a>
                            <div class="flex">
                              <button
                                v-clipboard="'https://fffutu.re/'"
                                class="mr-1"
                              >
                                <font-awesome-icon icon="copy" />
                              </button>
                              <button
                                v-if="$util.hasShare()"
                                @lick.prevent="
                                  $util.share({
                                    url: 'https://fffutu.re/',
                                    title: 'Plakate & Sticker bestellen',
                                  })
                                "
                              >
                                <font-awesome-icon icon="share" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr class="flex flex-wrap justify-end items-center">
                          <td class="flex-grow">Ordner:innenbinden:</td>
                          <td
                            class="flex items-center justify-center w-12 mr-2"
                          >
                            <input
                              v-model="localGroup.poll.binden"
                              type="radio"
                              name="binden"
                              :value="true"
                            />
                          </td>
                          <td class="flex items-center justify-center w-20">
                            <input
                              v-model="localGroup.poll.binden"
                              type="radio"
                              name="binden"
                              :value="false"
                            />
                          </td>
                          <td
                            v-if="localGroup.poll.binden === false"
                            class="w-full flex justify-end"
                          >
                            <a
                              href="https://fffutu.re/"
                              class="text-blue-500 mr-2"
                            >
                              Starterpack bestellen
                            </a>
                            <div class="flex">
                              <button
                                v-clipboard="'https://fffutu.re/'"
                                class="mr-1"
                              >
                                <font-awesome-icon icon="copy" />
                              </button>
                              <button
                                v-if="$util.hasShare()"
                                @lick.prevent="
                                  $util.share({
                                    url: 'https://fffutu.re/',
                                    title: 'Starterpack für deine OG bestellen',
                                  })
                                "
                              >
                                <font-awesome-icon icon="share" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr class="flex flex-wrap justify-end items-center">
                          <td class="flex-grow">Technik:</td>
                          <td
                            class="flex items-center justify-center w-12 mr-2"
                          >
                            <input
                              v-model="localGroup.poll.equipment"
                              type="radio"
                              name="equipment"
                              :value="true"
                            />
                          </td>
                          <td class="flex items-center justify-center w-20">
                            <input
                              v-model="localGroup.poll.equipment"
                              type="radio"
                              name="equipment"
                              :value="false"
                            />
                          </td>
                          <td
                            v-if="localGroup.poll.equipment === false"
                            class="flex w-full justify-end"
                          >
                            <a
                              href="https://fffutu.re/"
                              class="text-blue-500 mr-2"
                            >
                              Technik über OnFire bestellen
                            </a>
                            <div class="flex">
                              <button
                                v-clipboard="'https://fffutu.re/'"
                                class="mr-1"
                              >
                                <font-awesome-icon icon="copy" />
                              </button>
                              <button
                                v-if="$util.hasShare()"
                                @lick.prevent="
                                  $util.share({
                                    url: 'https://fffutu.re/',
                                    title: 'Technik für deine OG bestellen',
                                  })
                                "
                              >
                                <font-awesome-icon icon="share" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p class="mt-3">
                      Allgemein gibt es noch die Schritt-für-Schritt Anleitung,
                      die das Organisieren einer Demo komplett erklärt:
                      <a href="" class="text-blue-500">https://fffutu.re</a>
                    </p>
                    <h4 class="mt-5 mb-3 text-lg">
                      Wie groß war eure größte Demo (ca.) ?
                    </h4>
                    <input
                      type="number"
                      class="appearance-none w-20 self-end"
                    />
                    <div
                      class="flex mt-5 mb-3 items-center justify-between flex-wrap"
                    >
                      <h4 class="text-lg">Sind die Delis aktuell?</h4>
                      <div class="flex-grow flex justify-end">
                        <label class="flex items-center mr-3">
                          <input
                            v-model="localGroup.poll.reps"
                            type="radio"
                            class="mr-1"
                            name="reps"
                            :value="true"
                          />
                          Ja
                        </label>
                        <label class="flex items-center mr-3">
                          <input
                            v-model="localGroup.poll.reps"
                            type="radio"
                            class="mr-1"
                            name="reps"
                            :value="false"
                          />
                          Nein
                        </label>
                      </div>
                      <p
                        v-if="localGroup.poll.reps === false"
                        class="w-full ml-2"
                      >
                        Wer sind denn dann die aktuellen Delis? Trage sie unter
                        Delis ein und sie werden automatisch den bundesweiten
                        Infogruppen hinzugefügt
                      </p>
                    </div>
                    <div>
                      <h4 class="mt-5 mb-1 text-lg">
                        Welche SM-Kanäle habt ihr (WA, Insta, ...) und habt ihr
                        sie schon auf die Website eingetragen?
                      </h4>
                      <div class="flex justify-around">
                        <label class="flex items-center ml-2">
                          <input
                            v-model="localGroup.poll.sm"
                            type="radio"
                            class="mr-1"
                            name="sm"
                            :value="true"
                          />
                          Alles aktuell
                        </label>
                        <label class="flex items-center mr-2">
                          <input
                            v-model="localGroup.poll.sm"
                            type="radio"
                            class="mr-1"
                            name="sm"
                            :value="false"
                          />
                          Nicht wirklich
                        </label>
                      </div>
                      <p
                        v-if="localGroup.poll.sm === false"
                        class="ml-1 mt-1 leading-tight text-center"
                      >
                        Die SM-Kanäle können hier aktualisiert werden:
                        <a
                          href="https://fffutu.re/MessengerEintragen"
                          class="text-blue-600"
                        >
                          https://fffutu.re/MessengerEintragen
                        </a>
                      </p>
                    </div>
                    <h4 class="mt-5 mb-3 text-lg">
                      Werdet ihr beim Großstreik streiken?
                    </h4>
                    <select v-model="localGroup.poll.strike">
                      <option :value="null">-</option>
                      <option :value="0">Sicher nicht</option>
                      <option :value="1">Vermutlich nicht</option>
                      <option :value="2">Vermutlich</option>
                      <option :value="3">Auf jeden Fall</option>
                    </select>
                    <p v-if="localGroup.poll.strike >= 2">
                      Die Aktion sollte schonmal in die Schnellregistrierung
                      eingetragen werden:
                      <a href="" class="text-blue-500">https://fffutu.re</a>
                    </p>
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
import { clipboard } from 'vue-clipboards'
import RepresentativeComponent from '@/components/Representative.vue'

class LocalGroup {
  allRepresentatives: Representative[]

  get representatives() {
    return this.allRepresentatives.filter((rep) => rep.status === 'CURRENT')
  }

  get exRepresentatives() {
    return this.allRepresentatives.filter((rep) => rep.status === 'EX')
  }

  name: string
  id: string
  newDeliMenu: 'CLOSED' | 'OPEN' | 'LOADING' = 'CLOSED'
  newDeli = { name: '', phone: '' }
  buddy: any = null
  poll = {
    reps: null,
    strike: null,
    whyNot: null,
    equipment: null,
    people: null,
    mobi: null,
    starter: null,
    binden: null,
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
    this.allRepresentatives = data.representatives.map(
      (rep: any) => new Representative(rep, axios)
    )
    this.name = data.name
    this.id = data.id
    // data.buddy is sometimes undefined, but we just want null
    this.buddy = data.buddy || null
    if (data.poll) {
      // TODO:
      // this.poll = data.poll
    }
  }

  async removeRep(rep: Representative) {
    await this.axios.delete(`/localGroups/${this.id}/representatives/${rep.id}`)
    const index = this.allRepresentatives.findIndex((r) => r === rep)
    this.allRepresentatives.splice(index, 1)
  }

  async setRepStatus(rep: Representative, newStatus: 'EX' | 'CURRENT') {
    rep.status = newStatus
    await this.axios.put(
      `/localGroups/${this.id}/representatives/${rep.id}`,
      rep
    )
  }

  cancelNewDeli() {
    this.newDeliMenu = 'CLOSED'
    this.newDeli.name = ''
    this.newDeli.phone = ''
  }

  async saveNewDeli() {
    this.newDeliMenu = 'LOADING'
    this.allRepresentatives.push(
      new Representative(
        await this.axios.$post(`localGroups/${this.id}/representatives`, {
          status: 'CURRENT',
          ...this.newDeli,
        }),
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
  status: 'EX' | 'CURRENT'

  id: string

  constructor(data: any, axios: NuxtAxiosInstance) {
    this.axios = axios
    this.name = data.name
    this.originalName = this.name
    this.phone = data.phone
    this.originalPhone = this.phone
    this.id = data.id
    this.status = data.status
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
  directives: {
    clipboard,
  },
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
    return user.groups?.includes('/RegioBuddys')
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
