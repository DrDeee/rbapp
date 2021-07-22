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
          v-model="poll.globalStrike"
          question="Habt ihr vor eine Aktion am globalen Klimastreik (24.9) zu machen? (Details egal)"
          :choices="[
            ['Ja', true],
            ['Nein', false],
          ]"
        >
          <p v-if="poll.globalStrike === 'true'">
            Dann schnell damit in die
            <a href="https://fffutu.re/2409-schnell"
              >Schnellregistrierung https://fffutu.re/2409-schnell</a
            >
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.orderedMobi"
          question="Habt ihr schon Mobimaterial für den 24.09 bestellt?"
          :choices="[
            ['Ja', true],
            ['Nein', false],
          ]"
        >
          <p v-if="poll.orderedMobi === 'false'">
            Dann mal ab dafür:
            <a href="https://fffutu.re/mobimaterial"
              >https://fffutu.re/mobimaterial</a
            >
          </p>
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
            <a href="https://fffutu.re/technikbedarf"
              >fffutu.re/technikbedarf</a
            >
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.profileGenerator"
          question="Habt ihr schon unseren Profilbildgenerator geteilt?"
          :choices="[
            ['Ja', true],
            ['Nein', false],
          ]"
        >
          <p v-if="poll.profileGenerator === 'false'">
            Dann teilen, teilen, teilen:
            <a href="https://fffutu.re/profilbildfuersklima"
              >fffutu.re/profilbildfuersklima</a
            >
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.folder"
          question="Kennt ihr schon unseren Linktree zum globalen Klimastreik?"
          :choices="[
            ['Ja', true],
            ['Nein', false],
          ]"
        >
          <p v-if="poll.folder === 'false'">
            Dann tobt euch aus:
            <a href="https://ffftre.es/global_strike_24_09"
              >ffftre.es/global_strike_24_09</a
            >
          </p>
        </MultipleChoice>
        <h4>
          Bei welchem Workshop vor der Bundestagswahl hättet ihr Interesse
          teilzunehmen?
        </h4>
        <MultipleChoice
          v-model="poll.strategy"
          question="Politische Strategie für Aktivistis"
        />
        <MultipleChoice
          v-model="poll.strategy"
          question="Teamorga für Aktivistis"
        />
        <MultipleChoice
          v-model="poll.pressBeginner"
          question="Presse für Anfänger:innen"
        />
        <MultipleChoice
          v-model="poll.pressAdvanced"
          question="Presse für Fortgeschrittene"
        />
        <MultipleChoice
          v-model="poll.howToFFF"
          question="How to FFF - Grundlagen für neue und junge Ortsgruppen"
        />
        <MultipleChoice
          v-model="poll.skillShare"
          question="Skillsharing Ausbildung"
        />
        <MultipleChoice
          v-model="poll.socialMediaWS"
          question="Social-Media Workshops"
        />
        <MultipleChoice
          v-model="poll.politicalTalks"
          question="Politiker:innen Gespräche"
        />
        <label>
          An welchen Tagen und zu welchen Uhrzeiten habt ihr tendenziell am
          ehesten Zeit und Lust auf einen Workshop?
          <textarea class="w-full"></textarea>
        </label>
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
        <MultipleChoice
          v-model="poll.playbook"
          question="Wisst ihr wo ihr Hilfe bekommt wegen Finanzierung eurer Demos?"
        >
          <p v-if="poll.playbook === 'false'">
            Dann findet ihr das hier:
            <a
              href="https://ffftre.es/finanzen_finanzierung_von_materialien_und_aktionen"
              >ffftre.es/finanzen_finanzierung_von_materialien_und_aktionen</a
            >
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.spenden"
          question="Sammelt ihr schon Spenden auf euren Demos?"
        >
          <p v-if="poll.spenden === 'false'">
            Dann fangt mal an :) Die Finanz AG gibt dazu bald auch einen
            Leitfaden raus, an sich aber einfach einmal die Leute anhauen und
            nach Unterstützung freundlich fragen
          </p>
        </MultipleChoice>
        <p class="text-center">Danke für eure Arbeit &lt;3</p>
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

<style lang="postcss" scoped>
a {
  @apply text-blue-500;
}
</style>
