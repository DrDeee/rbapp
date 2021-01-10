<template>
  <div v-if="this.$auth.loggedIn" @click="openMenu = null">
    <h1 class="text-3xl text-center font-bold my-1">Meine Ortsgruppen</h1>
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
            <h3 class="text-xl">Delis:</h3>
            <ul>
              <li
                v-for="deli of localGroup.representatives"
                :key="deli.name"
                class="flex flex-col justify-around text-lg p-1 deli"
              >
                <div class="flex justify-between p-1 mb-2">
                  {{ deli.name }}
                  <!--
                  If the menu is open somehow the event handler on the main
                  div triggers also and the menu isn't hidden :(
                  @click.stop prevents this somehow
                -->
                  <details
                    :open="openMenu === deli.id"
                    @toggle="
                      openMenu = $event.target.attributes['open']
                        ? deli.id
                        : null
                    "
                    @click.stop
                  >
                    <summary class="text-primary">
                      <font-awesome-icon icon="ellipsis-h" />
                    </summary>
                    <ul
                      class="absolute left-auto bg-primary rounded-lg menu-right text-lg"
                      @click="openMenu = null"
                    >
                      <li>
                        <button
                          class="p-2 w-full text-center rounded-t-lg rounded-b-none"
                          @click="localGroup.makeEx(deli)"
                        >
                          Zum Ex-Deli machen
                        </button>
                      </li>
                      <li>
                        <button
                          class="p-2 w-full text-center rounded-b-lg rounded-t-none"
                          @click="localGroup.removeRep(deli)"
                        >
                          Kontaktdaten löschen
                        </button>
                      </li>
                    </ul>
                  </details>
                </div>
                <div class="flex justify-between">
                  <button
                    v-if="!deli.editing"
                    class="mx-1 w-8 h-8 flex-none"
                    @click="deli.editing = !deli.editing"
                  >
                    <font-awesome-icon icon="edit" />
                  </button>
                  <button
                    v-else
                    class="mx-1 w-8 h-8 flex justify-center items-center text-gray-200 flex-none"
                    @click="deli.cancel()"
                  >
                    <font-awesome-icon icon="times" />
                  </button>
                  <a
                    v-if="!deli.editing"
                    class="text-center text-primary flex items-center"
                    :href="'tel:' + deli.phone"
                  >
                    {{ deli.formattedPhone }}
                  </a>
                  <input
                    v-else
                    v-model="deli.phone"
                    class="text-primary min-w-0 px-1 rounded-lg border border-solid border-primary"
                    type="phone"
                  />
                  <div v-if="!deli.editing" class="flex">
                    <a :href="deli.waMe" class="mx-1 button w-8 h-8">
                      <font-awesome-icon :icon="['fab', 'whatsapp']" />
                    </a>
                    <button class="w-8 h-8" @click="deli.copyNumber()">
                      <font-awesome-icon icon="copy" />
                    </button>
                  </div>
                  <div v-else class="flex-none">
                    <button class="mx-1 w-8 h-8" @click="deli.save()">
                      <font-awesome-icon icon="save" />
                    </button>
                  </div>
                </div>
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
              :class="{ 'text-gray-600': localGroup.newDeliMenu === 'LOADING' }"
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
                :key="deli.name"
                class="flex flex-col justify-around text-lg p-1 deli"
              >
                <div class="flex justify-between p-1 mb-2">
                  {{ deli.name }}
                  <!--
                  If the menu is open somehow the event handler on the main
                  div triggers also and the menu isn't hidden :(
                  @click.stop prevents this somehow
                -->
                  <details
                    :open="openMenu === deli.id"
                    @toggle="
                      openMenu = $event.target.attributes['open']
                        ? deli.id
                        : null
                    "
                    @click.stop
                  >
                    <summary class="text-primary">
                      <font-awesome-icon icon="ellipsis-h" />
                    </summary>
                    <ul
                      class="absolute left-auto bg-primary rounded-lg menu-right text-lg"
                      @click="openMenu = null"
                    >
                      <li>
                        <button
                          class="p-2 w-full text-center rounded-b-none"
                          @click="localGroup.makeCurrent(deli)"
                        >
                          Zum Deli machen
                        </button>
                      </li>
                      <li>
                        <button
                          class="p-2 w-full text-center rounded-t-none"
                          @click="localGroup.removeRep(deli)"
                        >
                          Kontaktdaten löschen
                        </button>
                      </li>
                    </ul>
                  </details>
                </div>
                <div class="flex justify-between">
                  <button
                    v-if="!deli.editing"
                    class="mx-1 w-8 h-8 flex-none"
                    @click="deli.editing = !deli.editing"
                  >
                    <font-awesome-icon icon="edit" />
                  </button>
                  <button
                    v-else
                    class="mx-1 w-8 h-8 flex justify-center items-center text-gray-200 flex-none"
                    @click="deli.cancel()"
                  >
                    <font-awesome-icon icon="times" />
                  </button>
                  <a
                    v-if="!deli.editing"
                    class="text-center text-primary flex items-center"
                    :href="'tel:' + deli.phone"
                  >
                    {{ deli.formattedPhone }}
                  </a>
                  <input
                    v-else
                    v-model="deli.phone"
                    class="text-primary min-w-0 px-1 rounded-lg border border-solid border-primary"
                    type="phone"
                  />
                  <div v-if="!deli.editing" class="flex">
                    <a :href="deli.waMe" class="mx-1 button w-8 h-8">
                      <font-awesome-icon :icon="['fab', 'whatsapp']" />
                    </a>
                    <button class="w-8 h-8" @click="deli.copyNumber()">
                      <font-awesome-icon icon="copy" />
                    </button>
                  </div>
                  <div v-else class="flex-none">
                    <button class="mx-1 w-8 h-8" @click="deli.save()">
                      <font-awesome-icon icon="save" />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </details>
      </li>
    </ul>
  </div>
  <div
    v-else
    class="text-xl flex flex-col justify-center h-screen items-center"
  >
    <h1 class="text-center m-5">
      Hi Aktivist, herzlich willkommen zur Regio App
    </h1>
    <button class="p-1 px-2 max-w-sm m-5" @click="$auth.loginWith('cloud')">
      Mit Cloud-Account einloggen
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

class LocalGroup {
  representatives: Representative[]
  exRepresentatives: Representative[]
  name: string
  id: string
  newDeliMenu: 'CLOSED' | 'OPEN' | 'LOADING' = 'CLOSED'
  newDeli = { name: '', phone: '' }

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
  originalPhone: string
  phone: string
  editing = false
  menuOpen = false
  axios: NuxtAxiosInstance

  id: string

  constructor(data: any, axios: NuxtAxiosInstance) {
    this.axios = axios
    this.name = data.name
    this.phone = data.phone
    this.originalPhone = this.phone
    this.id = data.id
  }

  toggleMenu(event: Event, localGroups: { representatives: Representative[] }) {
    console.log(event)
    const target = event?.target as HTMLElement
    this.menuOpen = !!target.getAttribute('open')
    console.log(localGroups)
  }

  get waMe() {
    return (
      'https://wa.me/' + this.phone.replace(/[\s+()]/g, '').replace(/^0/, '49')
    )
  }

  async save() {
    await this.axios.patch(`/representatives/${this.id}`, { phone: this.phone })
    this.editing = false
    this.originalPhone = this.phone
  }

  cancel() {
    this.editing = false
    this.phone = this.originalPhone
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

@Component
export default class IndexView extends Vue {
  openMenu: null | HTMLElement = null

  localGroups: any = []

  $axios: any

  created() {
    this.$axios.get('localGroups').then((response: any) => {
      console.log(response)
      this.localGroups = response.data.map(
        (localGroup: any) => new LocalGroup(localGroup, this.$axios)
      )
    })
  }
}
</script>
<style>
button:hover,
.button:hover,
input[type='submit']:hover,
input[disabled],
button[disabled] {
  @apply text-primary bg-gray-200 border border-primary;
}
input[disabled],
button[disabled] {
  @apply pointer-events-none;
}
button,
.button,
input[type='submit'],
button:active,
.button:active,
input[type='submit']:active {
  @apply rounded-full flex justify-center items-center bg-primary text-gray-200
      border border-primary;
}

details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
.deli + .deli::before {
  content: '';
  background: rgba(0, 0, 0, 0.4);
  height: 3px;
  border-radius: 100px;
  width: 90%;
  margin: auto;
}

input {
  @apply text-primary px-1 rounded-lg border border-solid border-primary;
}
.menu-right {
  left: calc(100% - 210px);
}
</style>
