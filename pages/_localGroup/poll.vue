<template>
  <div class="h-full">
    <header class="border-b-2 border-primary h-auto">
      <h1 class="text-3xl text-center font-bold mt-1 w-full">
        Umfrage – {{ localGroup.name }}
      </h1>
    </header>
    <main class="overflow-y-scroll">
      <form
        v-if="localGroup && localGroup.poll"
        class="flex flex-col h-full p-1 sm:p-5 max-w-xl mx-auto"
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
                class="w-full sm:w-auto text-center flex justify-end"
              >
                <a href="https://fffutu.re/" class="text-blue-500 mr-2">
                  Bestell-link
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
                class="w-full flex justify-end sm:w-auto"
              >
                <a href="https://fffutu.re/" class="text-blue-500 mr-2">
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
                class="flex w-full justify-end sm:w-auto"
              >
                <a href="https://fffutu.re/" class="text-blue-500 mr-2">
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
            </tr>
          </tbody>
        </table>
        <p class="mt-3">
          Allgemein gibt es noch die Schritt-für-Schritt Anleitung, die das
          Organisieren einer Demo komplett erklärt:
          <a href="" class="text-blue-500">https://fffutu.re</a>
        </p>
        <div class="flex flex-wrap mt-5 items-center">
          <h4 class="text-lg self-begin mr-3">
            Wie groß war eure größte Demo (ca.)?
          </h4>
          <div class="flex-grow flex justify-end">
            <input type="number" class="appearance-none w-20" />
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
          </div>
          <div v-if="localGroup.representatives.length === 0">
            Keine Delis eingespeichert
          </div>
          <ul class="w-full flex flex-col justify-center">
            <li
              v-for="representative in localGroup.representatives"
              :key="representative.id"
            >
              {{ representative.name }}, {{ representative.formattedPhone }}
            </li>
          </ul>
          <NewRepresentative
            v-if="localGroup.poll.reps === false"
            class="mt-5"
          />
          <p v-if="localGroup.poll.reps === false" class="ml-2">
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
                v-model="localGroup.poll.sm"
                type="radio"
                class="mr-1"
                name="sm"
                :value="true"
              />
              Alles aktuell
            </label>
            <label class="flex items-center self-end w-32">
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
        <div class="flex flex-wrap items-center my-5">
          <h4 class="text-lg mr-3">Werdet ihr beim Großstreik streiken?</h4>
          <div class="flex-grow flex justify-end">
            <select v-model="localGroup.poll.strike" class="max-w-sm self-end">
              <option :value="null">-</option>
              <option :value="0">Sicher nicht</option>
              <option :value="1">Vermutlich nicht</option>
              <option :value="2">Vermutlich</option>
              <option :value="3">Auf jeden Fall</option>
            </select>
          </div>
          <p v-if="localGroup.poll.strike >= 2">
            Die Aktion sollte schonmal in die Schnellregistrierung eingetragen
            werden:
            <a href="" class="text-blue-500">https://fffutu.re</a>
          </p>
        </div>
      </form>
    </main>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { LocalGroup } from '@/src/LocalGroup'

@Component
export default class PollView extends Vue {
  get localGroup() {
    return (
      this.$store.state.localGroups?.find(
        (g: LocalGroup) => g.name === this.$route.params.localGroup
      ) || null
    )
  }

  created() {
    if (this.$store.state.localGroups.length === 0) {
      this.$store.dispatch('getGroups')
    }
  }
}
</script>
