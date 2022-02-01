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
        @submit.prevent
      >
        <MultipleChoice
          v-model="poll.strategySurveyFilledOut"
          question="Ihr wollt die Strategie von FFF mitgestalten und habt die Umfrage schon ausgefüllt?"
        >
          <p v-if="poll.strategySurveyFilledOut === 'false'">
            Zur
            <a href="https://www.surveymonkey.de/r/Strategie1"> Umfrage </a>
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.participateAndDecide"
          question="Wollt ihr selbst mitmachen und mitentscheiden, was FFF im nächsten Jahr machen soll?"
        >
          <p v-if="poll.participateAndDecide === 'true'">
            Dann könnt ihr hier der Strategie-AG beitreten (dafür musst du kein
            Deli sein!)
            <a href="https://t.me/+y_IbIn0K4k4yYThi">
              https://t.me/+y_IbIn0K4k4yYThi
            </a>
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.politicallyActive"
          question="Ist die OG Kommunalpolitisch aktiv?"
          :choices="[
            ['Ja', 'true'],
            ['Nein', 'false'],
            ['Was ist das?', 'whatsThat'],
          ]"
        >
          <p v-if="poll.politicallyActive === 'whatsThat'">
            Hier findet ihr Infos dazu: (dafür musst du kein Deli sein!)
            <a href="http://fffutu.re/Kommunalpolitik">
              fffutu.re/Kommunalpolitik
            </a>
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.helpNeeded"
          question="Braucht eure OG/Delis mal ein 'How to Bundesebene' von 'mir' (eurem Buddy)?"
        >
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.status"
          question="OG Status?"
          :choices="[
            ['Aktiv', 'active'],
            ['Aufbau Hilfe benötigt', 'helpNeeded'],
            ['Inaktiv', 'inactive'],
            ['Tot', 'dead'],
          ]"
        >
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.orderedEquipment"
          question="Habt ihr schon Technik bestellt?"
          :choices="[
            ['Ja', 'alreadyOrdered'],
            ['Nein und brauchen wir nicht', 'notNeeded'],
            ['Nein und brauchen wir', 'needed'],
          ]"
        >
          <p v-if="poll.orderedEquipment === 'needed'">
            Dann bestellt hier:
            <a href="https://fffutu.re/technik2503">fffutu.re/technikbedarf</a>
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.stepForStep"
          question="Kennt ihr unseren Schritt-für-Schritt Aktionsplanungsleitfaden?"
        >
          <p v-if="poll.stepForStep === 'false'">
            Dann los:
            <a href="https://fffutu.re/schritt-fuer-schritt"
              >fffutu.re/schritt-fuer-schritt</a
            >
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.playbook"
          question="Kennt ihr unser OG-Playbook mit Tipps und Tricks zur Organisation eurer Ortsgruppe?"
        >
          <p v-if="poll.playbook === 'false'">
            Dann findet ihr das hier:
            <a href="https://ffftre.es/og-playbook">ffftre.es/og-playbook</a>
          </p>
        </MultipleChoice>
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
            @newRep="
              $store.dispatch('newRep', {
                rep: $event,
                group: localGroup.id,
              })
            "
          />
          <p v-if="poll.hasUpToDateReps === false" class="ml-2">
            Wer sind denn dann die aktuellen Delis? Trage sie entweder hier oder
            später ein und sie werden automatisch den bundesweiten Infogruppen
            hinzugefügt
          </p>
        </div>
        <h4>Kennt ihr unsere wichtigsten Tools?</h4>
        <MultipleChoice
          v-model="poll.demonstrationRegistration"
          question="Demoanmeldungsgenerator?"
        >
          <p v-if="poll.demonstrationRegistration === 'false'">
            Dann ab dafür:
            <a href="https://fffutu.re/Demoanmeldungsgenerator"
              >fffutu.re/Demoanmeldungsgenerator</a
            >
          </p>
        </MultipleChoice>
        <MultipleChoice v-model="poll.toolpic" question="Toolpic?">
          <p v-if="poll.toolpic === 'false'">
            Dann ab dafür:
            <a href="https://toolpic.de">toolpic.de</a>
          </p>
        </MultipleChoice>
        <MultipleChoice v-model="poll.cloud" question="Cloud?">
          <p v-if="poll.cloud === 'false'">
            Dann ab dafür:
            <a href="https://fffutu.re/cloud_beantragen"
              >fffutu.re/cloud_beantragen</a
            >
          </p>
        </MultipleChoice>
        <MultipleChoice v-model="poll.linktree" question="Linktree?">
          <p v-if="poll.linktree === 'false'">
            Dann ab dafür:
            <a href="https://admin.ffftre.es">admin.ffftr.es</a>
          </p>
        </MultipleChoice>
        <MultipleChoice v-model="poll.linkshortener" question="Linkverkürzer?">
          <p v-if="poll.linkshortener === 'false'">
            Dann ab dafür:
            <a href="https://fffutu.re">fffutu.re</a>
          </p>
        </MultipleChoice>
        <p>Hey, hier nochmal die wichtigsten Infos zusammengefasst:</p>
        <p v-if="poll.orderedEquipment === 'needed'">
          ▶️ Hier könnt ihr Technik von FFF bekommen:
          https://fffutu.re/technikbedarf
          <br />➡️ Außerdem gibt es hier Megaphone, falls ihr welche braucht:
          https://forms.gle/vcHp1nGGSZiuQE9j9
        </p>
        <p v-if="poll.stepForStep === 'false'">
          ▶️ Nutzt den Schritt für Schritt Aktionsleitfaden um bei der Orga
          nichts zu vergessen: https://fffutu.re/schritt-fuer-schritt
        </p>
        <p v-if="poll.playbook === 'false'">
          ▶️ Tipps zur Organisation eurer Ortsgruppe gibt's im OG Playbook:
          https://ffftre.es/og-playbook
        </p>
        <p v-if="poll.demonstrationRegistration === 'false'">
          ▶️ Schickt eure neuen Delis bitte an Elena
          (https://wa.me/4915175003949 ) oder Merle (https://wa.me/491711144013
          )
        </p>
        <p>▶️ Unsere Wichtigsten Tools, die euch bei der Arbeit helfen:</p>

        <ul>
          <li v-if="poll.toolpic === 'false'">
            -> Sharpics erstellen: http://toolpic.fridaysforfuture.is/ &amp;
            http://toolpic.fridaysforfuture.io/
          </li>
          <li v-if="poll.cloud === 'false'">
            -> Unsere Cloud (hier müsst ihr euch erstmal einen Zugang erstellen
            lassen): https://fffutu.re/cloud_beantragen
          </li>
          <li v-if="poll.linktree === 'false'">
            -> Lintrees: https://admin.ffftre.es/ (funktioniert nur mit Cloud
            Account)
          </li>
          -> Pads (textdokumente die sich gemeinsam bearbeiten lassen):
          https://pad.fridaysforfuture.de/
          <li v-if="poll.linkshortener === 'false'">
            -> Linkverkürzer: https://fffutu.re/
          </li>
        </ul>
        <p>
          ▶️ Tragt eure Social Media Kanäle außerdem bitte noch hier ein, damit
          diese auf unserer Website zu finden sind:
          https://fffutu.re/MessengerEintragen
        </p>
        <p>
          ▶️ Wenn ihr eine @fridaysforfuture.de Mailadresse haben wollt, meldet
          euch beim Techsupport: https://wa.me/4915678731731
        </p>
        <p>
          ▶️ Alle wichtigen Links zum Globalen Klimastreik findet ihr nochmal
          hier: https://ffftre.es/global_strike_24_09
        </p>
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
        poll: Object.assign({}, poll),
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

<style lang="postcss" scoped>
a {
  @apply text-blue-500;
}
</style>
