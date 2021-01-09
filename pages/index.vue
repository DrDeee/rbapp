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
                          class="p-2 w-full text-center rounded-b-none"
                          @click="deli.makeEx()"
                        >
                          Zum Ex-Deli machen
                        </button>
                      </li>
                      <li>
                        <button
                          class="p-2 w-full text-center rounded-t-none"
                          @click="deli.remove()"
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
    <button class="p-1 max-w-sm m-5" @click="$auth.loginWith('cloud')">
      Mit Cloud-Account einloggen
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

class LocalGroup {
  representatives: Representative[]
  name: string
  newDeliMenu: 'CLOSED' | 'OPEN' | 'LOADING' = 'CLOSED'
  newDeli = { name: '', phone: '' }

  constructor(data: any) {
    this.representatives = data.representatives.map(
      (representative: any) => new Representative(representative)
    )
    this.name = data.name
  }

  cancelNewDeli() {
    this.newDeliMenu = 'CLOSED'
    this.newDeli.name = ''
    this.newDeli.phone = ''
  }

  async saveNewDeli(axios: any) {
    this.newDeliMenu = 'LOADING'
    this.representatives.push(
      new Representative(
        await axios.post('http://localhost:8000/representatives', this.newDeli)
          .data
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

  id: string

  status: 'CURRENT' | 'EX'

  constructor(data: any) {
    this.name = data.name
    this.phone = data.phone
    this.originalPhone = this.phone
    this.status = 'CURRENT'
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

  save() {
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

  makeEx() {
    this.status = 'EX'
    this.menuOpen = false
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
    this.$axios
      .get('http://localhost:8000/localGroups')
      .then((response: any) => {
        this.localGroups = response.data.map(
          (localGroup: any) => new LocalGroup(localGroup)
        )
      })
  }
}
</script>
<style>
button,
.button,
input[type='submit'] {
  @apply rounded-lg flex justify-center items-center bg-primary text-gray-200
      border border-primary;
}
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
