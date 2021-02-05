<template>
  <div class="h-full">
    <header class="border-b-2 border-primary h-auto">
      <h1 class="text-3xl text-center font-bold mt-1 w-full">
        Umfrage – {{ localGroup && localGroup.name }}
      </h1>
    </header>
    <main class="overflow-y-scroll">
      <form
        v-if="localGroup && poll"
        class="flex flex-col p-1 sm:p-5 max-w-xl mx-auto"
        @submit.prevent=""
      >
        <h4 class="mb-3 text-lg">
          Welche Inhalte des OG Starterpacks habt ihr und in welchem Bereich
          wünscht ihr euch mehr Unterstützung?
        </h4>
        <table class="w-full flex flex-col">
          <thead class="flex justify-end sm:justify-start w-full">
            <th class="mr-2 flex-grow sm:flex-none sm:w-40 sm:mr-0"></th>
            <th class="block w-12 mr-2 text-center">Haben Wir</th>
            <th class="block w-20 text-center">Brauchen Wir</th>
          </thead>
          <tbody>
            <tr
              class="flex flex-wrap justify-end sm:justify-start items-center sm:h-8"
            >
              <td class="flex-grow sm:flex-none sm:w-40">
                Sticker und Plakate:
              </td>
              <td class="flex items-center justify-center w-12 mr-2">
                <input
                  v-model="poll.hasMobiStuff"
                  type="radio"
                  name="hasMobiStuff"
                  :value="true"
                />
              </td>
              <td class="flex items-center justify-center w-20">
                <input
                  v-model="poll.hasMobiStuff"
                  type="radio"
                  name="hasMobiStuff"
                  :value="false"
                />
              </td>
              <td
                v-if="poll.hasMobiStuff === false"
                class="w-full sm:w-auto text-center flex justify-end"
              >
                <a
                  href="https://forms.gle/peK8Mf9EJWx21Yax6"
                  class="text-blue-500 mr-2"
                  target="_blank"
                >
                  Bestell-link
                </a>
                <div class="flex">
                  <button
                    v-clipboard="'https://forms.gle/peK8Mf9EJWx21Yax6'"
                    class="mr-5"
                  >
                    <font-awesome-icon icon="copy" />
                  </button>
                  <button
                    v-if="$util.hasShare()"
                    @lick.prevent="
                      $util.share({
                        url: 'https://forms.gle/peK8Mf9EJWx21Yax6',
                        title: 'Plakate & Sticker bestellen',
                      })
                    "
                  >
                    <font-awesome-icon icon="share" />
                  </button>
                </div>
              </td>
            </tr>
            <tr
              class="flex flex-wrap justify-end items-center sm:justify-start sm:h-8"
            >
              <td class="flex-grow sm:flex-none sm:w-40">
                Ordner:innenbinden:
              </td>
              <td class="flex items-center justify-center w-12 mr-2">
                <input
                  v-model="poll.hasArmbands"
                  type="radio"
                  name="hasArmbands"
                  :value="true"
                />
              </td>
              <td class="flex items-center justify-center w-20">
                <input
                  v-model="poll.hasArmbands"
                  type="radio"
                  name="hasArmbands"
                  :value="false"
                />
              </td>
              <td
                v-if="poll.hasArmbands === false"
                class="w-full flex justify-end sm:w-auto"
              >
                <a
                  href="https://fffutu.re/"
                  class="text-blue-500 mr-2"
                  target="_blank"
                >
                  Starterpack bestellen
                </a>
                <div class="flex">
                  <button v-clipboard="'https://fffutu.re/'" class="mr-5">
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
            <tr
              class="flex flex-wrap justify-end items-center sm:justify-start sm:h-8"
            >
              <td class="flex-grow sm:flex-none sm:w-40">Technik:</td>
              <td class="flex items-center justify-center w-12 mr-2">
                <input
                  v-model="poll.hasEquipment"
                  type="radio"
                  name="hasEquipment"
                  :value="true"
                />
              </td>
              <td class="flex items-center justify-center w-20">
                <input
                  v-model="poll.hasEquipment"
                  type="radio"
                  name="hasEquipment"
                  :value="false"
                />
              </td>
              <!--
              <td
                v-if="poll.hasEquipment === false"
                class="flex w-full justify-end sm:w-auto"
              >
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfFkBfhHskJhlkfykarrE2MOyv3lbHXNKgCVCaGpFoqZ6Qrrg/viewform"
                  class="text-blue-500 mr-2"
                  target="_blank"
                >
                  Technikbedarfsumfrage
                </a>
                <div class="flex">
                  <button v-clipboard="'https://fffutu.re/'" class="mr-5">
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
              -->
            </tr>
          </tbody>
        </table>
        <p class="mt-3">
          Allgemein gibt es noch die Schritt-für-Schritt Anleitung, die das
          Organisieren einer Demo komplett erklärt:
          <a href="" class="text-blue-500" target="_blank">
            https://fffutu.re
          </a>
        </p>
        <div class="flex flex-wrap mt-5 items-center">
          <h4 class="text-lg self-begin mr-3">
            Wie groß war eure größte Demo (ca.)?
          </h4>
          <div class="flex-grow flex justify-end">
            <input
              v-model="poll.biggestStrike"
              type="number"
              class="appearance-none w-20"
            />
          </div>
        </div>
        <div
          class="flex flex-col mt-5 mb-3 items-center justify-between flex-wrap"
        >
          <div class="flex flex-wrap w-full">
            <h4 class="text-lg self-start mb-3">
              Sind das hier die aktuellen Delis?
            </h4>
            <div class="flex-grow flex justify-end">
              <label class="flex items-center mr-3">
                <input
                  v-model="poll.hasUpToDateReps"
                  type="radio"
                  class="mr-1"
                  name="hasUpToDateReps"
                  :value="true"
                />
                Ja
              </label>
              <label class="flex items-center mr-3">
                <input
                  v-model="poll.hasUpToDateReps"
                  type="radio"
                  class="mr-1"
                  name="hasUpToDateReps"
                  :value="false"
                />
                Nein
              </label>
            </div>
          </div>
          <div v-if="localGroup.representatives.length === 0">
            Keine Delis eingespeichert
          </div>
          <ul class="w-full flex flex-col justify-center items-center">
            <li
              v-for="representative in localGroup.representatives"
              :key="representative.id"
            >
              {{ representative.name }}, {{ representative.formattedPhone }}
            </li>
          </ul>
          <NewRepresentative
            v-if="poll.hasUpToDateReps === false"
            class="mt-5"
          />
          <p v-if="poll.hasUpToDateReps === false" class="ml-2">
            Wer sind denn dann die aktuellen Delis? Trage sie entweder hier oder
            später ein und sie werden automatisch den bundesweiten Infogruppen
            hinzugefügt
          </p>
        </div>
        <div class="flex flex-wrap pt-5">
          <h4 class="mb-1 text-lg max-w-sm">
            Welche SM-Kanäle habt ihr (WA, Insta, ...) und habt ihr sie schon
            auf die Website eingetragen?
          </h4>
          <div class="flex flex-col flex-grow justify-around ml-3">
            <label class="flex items-center self-end w-32">
              <input
                v-model="poll.hasUpToDateSM"
                type="radio"
                class="mr-1"
                name="hasUpToDateSM"
                :value="true"
              />
              Alles aktuell
            </label>
            <label class="flex items-center self-end w-32">
              <input
                v-model="poll.hasUpToDateSM"
                type="radio"
                class="mr-1"
                name="hasUpToDateSM"
                :value="false"
              />
              Nicht wirklich
            </label>
          </div>
          <p
            v-if="poll.hasUpToDateSM === false"
            class="ml-1 mt-1 leading-tight text-center"
          >
            Die SM-Kanäle können hier aktualisiert werden:
            <a
              href="https://fffutu.re/MessengerEintragen"
              class="text-blue-600"
              target="_blank"
            >
              https://fffutu.re/MessengerEintragen
            </a>
          </p>
        </div>
        <div class="flex flex-wrap items-center my-5">
          <h4 class="text-lg mr-3">Werdet ihr beim Großstreik streiken?</h4>
          <div class="flex-grow flex justify-end">
            <select v-model="poll.globalStrike" class="max-w-sm self-end">
              <option :value="null">-</option>
              <option :value="0">Sicher nicht</option>
              <option :value="1">Vermutlich nicht</option>
              <option :value="2">Vermutlich</option>
              <option :value="3">Auf jeden Fall</option>
            </select>
          </div>
          <p v-if="poll.globalStrike >= 2">
            Die Aktion sollte schonmal in die Schnellregistrierung eingetragen
            werden:
            <a
              href="https://fffutu.re/1903-schnell"
              class="text-blue-500"
              target="_blank"
            >
              https://fffutu.re/1903-schnell
            </a>
          </p>
        </div>
      </form>
    </main>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { LocalGroup } from '@/src/LocalGroup'
import { clipboard } from 'vue-clipboards'

@Component({
  directives: {
    clipboard,
  },
})
export default class PollView extends Vue {
  get localGroup() {
    return (
      this.$store.state.localGroups?.find(
        (g: LocalGroup) => g.name === this.$route.params.localGroup
      ) || null
    )
  }

  poll: any = null

  @Watch('poll', { deep: true })
  onPollChanged(poll: any, oldValue: any) {
    if (oldValue !== null) {
      this.$store.dispatch('submitPoll', {
        group: this.localGroup.id,
        poll,
      })
    }
  }

  created() {
    if (!this.$store.state.localGroups) {
      this.$store
        .dispatch('getGroups')
        .then(() => (this.poll = Object.assign({}, this.localGroup?.poll)))
    } else {
      this.poll = Object.assign({}, this.localGroup?.poll)
    }
  }
}
</script>
