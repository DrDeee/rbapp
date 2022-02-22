<template>
  <div class="h-full">
    <header class="border-b-2 border-primary h-auto">
      <h1 class="text-3xl text-center font-bold mt-1 w-full">
        Umfrage – {{ localGroup && localGroup.name }}
      </h1>
    </header>
    <header class="border-b-2 border-primary h-auto">
      <h1 class="text-sm text-center mt-1 w-full" v-html="cnt"></h1>
    </header>
    <main class="overflow-y-scroll">
      <form
        v-if="localGroup && poll"
        class="flex flex-col p-1 sm:p-5 max-w-xl mx-auto"
        @submit.prevent
      >
        <MultipleChoice
          v-model="poll.gs2503"
          question="Seid ihr beim nächsten Global Strike am 25.03. am Start?"
          :choices="[
            ['Ja', 'yes'],
            ['Wir mobilisieren zu einer anderen OG', 'other'],
            ['Nein, wir achten auf unsere Kapazitäten', 'selfcare'],
            ['Nein, wir haben keine Kapazitäten', 'nocappas'],
          ]"
        >
          <p v-if="poll.gs2503 === 'yes'">
            Dann schnell eintragen:
            <a href="ffutu.re/streikregistrierung"> zur Streikregistrierung </a>
          </p>
        </MultipleChoice>
        <MultipleChoice
          v-model="poll.knowAboutOverview"
          question="Kennt ihr die Übersichtswebseite info.fffutu.re/uebersicht?"
        >
          <p v-if="poll.knowAboutOverview === 'false'">
            Schaut sie euch doch mal an, dort findet ihr unzählige Links, die
            euch als OG unterstützen sollen:<br />
            <a href="https://info.fffutu.re/uebersicht">
              info.fffutu.re/uebersicht
            </a>
          </p>
        </MultipleChoice>
        <fieldset class="mt-3 p-2 bg-gray-200">
          <div class="mb-3 text-lg">Wisst ihr von...</div>
          <MultipleChoice
            v-model="poll.knowAboutActionGuide"
            question="...den Aktions-Leitfäden von der Bundesebene?"
          >
            <p v-if="poll.knowAboutActionGuide === 'false'">
              Hier findest du den Aktionsplanungs-Leitfaden:
              <a href="https://info.fffutu.re/uebersicht/aktionsanleitung"
                >info.fffutu.re/uebersicht/aktionsanleitung</a
              ><br />
              Schaut doch mal rein!
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutSpeechCollection"
            question="...der Redensammlung?"
          >
            <p v-if="poll.knowAboutSpeechCollection === 'false'">
              Hier findet ihr die Redensammlung:
              <a href=" https://info.fffutu.re/reden-lieder-und-gedichte">
                info.fffutu.re/reden-lieder-und-gedichte</a
              ><br />
              Es gibt auch ein paar Gedichte :)
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutActionIdeas"
            question="...der Aktionsideen-Sammlung?"
          >
            <p v-if="poll.knowAboutActionIdeas === 'false'">
              Dann schaut mal gerne hier rein:
              <a href=" https://info.fffutu.re/Aktionsideen"
                >info.fffutu.re/Aktionsideen</a
              ><br />Sie sind sogar auf Corona-Konformität geprüft
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutGenerator"
            question="...vom krassen Generator für Demoanmeldung und Social Media/Messenger-Texte?"
          >
            <p v-if="poll.knowAboutGenerator === 'false'">
              Dann schaut mal hier:
              <a href="https://anmeldung.websiteag.lol"
                >anmeldung.websiteag.lol</a
              >
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutPreparedSharepics"
            question="...von den vorgefertigten Sharepics für euren Streik?"
          >
            <p v-if="poll.knowAboutPreparedSharepics === 'false'">
              Schaut doch einfach mal rein:
              <a href="https://fffutu.re/sharepix">fffutu.re/sharepix</a>
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutLocalNewsletter"
            question="...der Möglichkeit einen lokalen Newsletter (nach PLZ) zu versenden?"
            :choices="[
              ['Ja', 'yes'],
              ['Nein, aber würden wir gern', 'interested'],
              ['Ist nichts für uns', 'notInterested'],
            ]"
          >
            <p v-if="poll.knowAboutLocalNewsletter === 'interested'">
              Dann meldet euch doch bei
              <a href="https://fffutu.re/sharepix">fffutu.re/sharepix</a>
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutRHAG"
            question="...der Rechtshilfe-AG, an die ihr euch bei rechtlichen Problemen wenden könnt?
(z.B. bei Problemen mit der Polizei auf Demos etc.)"
          >
            <p v-if="poll.knowAboutRHAG === 'false'">
              Bei rechtlichen Problemen meldet euch einfach bei Jonas:
              <b>+491759142052</b>
              (<a href="https://wa.me/491759142052">wa.me/491759142052</a>)
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutFundraisingGuide"
            question="...dem Leitfaden zum Spendensammeln?"
          >
            <p v-if="poll.knowAboutFundraisingGuide === 'false'">
              Ihr findet den Leitfaden hier:
              <a href="https://info.fffutu.re/fundraising-leitfaden"
                >info.fffutu.re/fundraising-leitfaden</a
              >
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutPMTemplate"
            question="...der Vorlage für eine Pressemitteilung von eurer OG für den 25.03.?"
          >
            <p v-if="poll.knowAboutPMTemplate === 'false'">
              Die Vorlage findet ihr unter
              <a href="https://fffutu.re/KA0Z5o">fffutu.re/KA0Z5o</a>
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutKoopMP"
            question="...dem Koop-Masterpad der Kooperations AG?"
          >
            <p v-if="poll.knowAboutKoopMP === 'false'">
              Schaut doch einfach mal rein:
              <a href="https://fffutu.re/Koop-Masterpad"
                >fffutu.re/Koop-Masterpad</a
              >
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.knowAboutSMGuide"
            question="...dem Social Media Leitfaden?"
          >
            <p v-if="poll.knowAboutSMGuide === 'false'">
              Der Leitfaden ist unter
              <a href="https://fffutu.re/Koop-Masterpad"
                >fffutu.re/Koop-Masterpad</a
              >
              zu finden.
            </p>
          </MultipleChoice>
        </fieldset>
        <fieldset class="mt-3 p-2 bg-gray-200">
          <div class="mb-3 text-lg">Braucht ihr noch einen Workshop zu...</div>
          <MultipleChoice
            v-model="poll.kneedsPAWorkshop"
            question="...Pressearbeit?"
          >
            <p v-if="poll.kneedsPAWorkshop === 'true'">
              Am 25./26.02. um 16 Uhr oder am 3.03. um 15 Uhr hier:
              <a href="https://fffutu.re/PresseWS">fffutu.re/PresseWS</a>
            </p>
          </MultipleChoice>
          <MultipleChoice
            v-model="poll.kneedsFRWorkshop"
            question="...Spenden sammeln?"
          >
            <p v-if="poll.kneedsFRWorkshop === 'true'">
              Dann seit am <b>2.03.2022</b> um <b>19 Uhr</b> dabei:
              <a href="https://fffutu.re/fundraising-tk"
                >ffutu.re/fundraising-tk</a
              >
            </p>
          </MultipleChoice>
        </fieldset>
        <TextInput
          v-model="poll.additionalWishes"
          question="Wo wünscht ihr euch noch mehr Unterstützung von der Bundesebene? Habt ihr konkrete Ideen dazu?"
        />
        <MultipleChoice
          v-model="poll.knowAboutFFFKGGoettingen"
          question="Wisst ihr vom nächsten FfF-Kongress in Göttingen (08.-12. April)?"
        >
          <p v-if="poll.knowAboutFFFKGGoettingen === 'false'">
            Weitere Infos folgen unter
            <a href="https://fffutu.re/KonferenzINFO">fffutu.re/KonferenzINFO</a
            >.
          </p>
        </MultipleChoice>
        <!--         <MultipleChoice
          v-model="poll.hasUpToDateReps"
          question="Sind das hier die aktuellen Delis?"
        >
          <template v-if="localGroup.representatives.length === 0" #before>
            <div class="mb-3">
              <div class="text-center">Keine Delis eingespeichert</div>
              <ul class="w-full flex flex-col justify-center items-center">
                <li
                  v-for="representative in localGroup.representatives"
                  :key="representative.id"
                >
                  {{ representative.name }}, {{ representative.formattedPhone }}
                </li>
              </ul>
            </div>
          </template>
          <div class="flex justify-center">
            <NewRepresentative
              v-if="poll.hasUpToDateReps === 'false'"
              class="mt-5"
              @newRep="
                $store.dispatch('newRep', {
                  rep: $event,
                  group: localGroup.id,
                })
              "
            />
          </div>
          <p v-if="poll.hasUpToDateReps === 'false'" class="ml-2 text-sm">
            Wer sind denn dann die aktuellen Delis? Trage sie entweder hier oder
            später ein und
            <em> melde sie bei eine:r Regio-AG-Sprecher:in</em>, damit der:die
            Deli den bundesweiten Infogruppen hinzugefügt werden kann. >
          </p>
        </MultipleChoice>
        <fieldset class="p-2  infos">
          <div class="mb-3 text-lg">
            Hey, hier nochmal die wichtigsten Infos zusammengefasst:
          </div>
          <p v-if="poll.orderedEquipment === 'needed'">
            Hier könnt ihr Technik von FFF bekommen:
            https://fffutu.re/technikbedarf
            <br />➡️ Außerdem gibt es hier Megaphone, falls ihr welche braucht:
            https://forms.gle/vcHp1nGGSZiuQE9j9
          </p>
          <p v-if="poll.stepForStep === 'false'">
            Nutzt den Schritt für Schritt Aktionsleitfaden um bei der Orga
            nichts zu vergessen: https://fffutu.re/schritt-fuer-schritt
          </p>
          <p v-if="poll.playbook === 'false'">
            Tipps zur Organisation eurer Ortsgruppe gibt's im OG Playbook:
            https://ffftre.es/og-playbook
          </p>
          <p v-if="poll.demonstrationRegistration === 'false'">
            Schickt eure neuen Delis bitte an Elena (https://wa.me/4915175003949
            ) oder Merle (https://wa.me/491711144013 )
          </p>
          <p>Unsere Wichtigsten Tools, die euch bei der Arbeit helfen:</p>

          <ul class="tools">
            <li v-if="poll.toolpic === 'false'">
              Sharpics erstellen: http://toolpic.fridaysforfuture.is/ &amp;
              http://toolpic.fridaysforfuture.io/
            </li>
            <li v-if="poll.cloud === 'false'">
              Unsere Cloud (hier müsst ihr euch erstmal einen Zugang erstellen
              lassen): https://fffutu.re/cloud_beantragen
            </li>
            <li v-if="poll.linktree === 'false'">
              Lintrees: https://admin.ffftre.es/ (funktioniert nur mit Cloud
              Account)
            </li>
            <li>
              Pads (textdokumente die sich gemeinsam bearbeiten lassen):
              https://pad.fridaysforfuture.de/
            </li>
            <li v-if="poll.linkshortener === 'false'">
              Linkverkürzer: https://fffutu.re/
            </li>
          </ul>
          <p>
            Tragt eure Social Media Kanäle außerdem bitte noch hier ein, damit
            diese auf unserer Website zu finden sind:
            https://fffutu.re/MessengerEintragen
          </p>
          <p>
            Wenn ihr eine @fridaysforfuture.de Mailadresse haben wollt, meldet
            euch beim Techsupport:
            <a href="https://wa.me/4915678731731" target="_blank"
              >https://wa.me/4915678731731</a
            >
          </p>
          <p>
            Alle wichtigen Links zum Globalen Klimastreik findet ihr nochmal
            hier:
            <a href="https://ffftre.es/global_strike_24_09" target="_blank"
              >https://ffftre.es/global_strike_24_09</a
            >
          </p>
        </fieldset> -->
        <div
          class="flex justify-between mt-3 p-2 bg-secondary rounded-md text-white"
        >
          <div class="text-5xl">🎉</div>
          <div class="text-right text-2xl">
            Danke fürs Ausfüllen<br />
            Eure Regio AG :)
          </div>
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
  get cnt() {
    let ret = ''
    Object.keys(this.poll).forEach((k) => (ret += "'" + k + "': String,<br />"))
    return ret
  }

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

.infos p::before {
  content: '▶️ ';
}

ul.tools {
  margin-left: 2rem;
  list-style-type: '➡️ ';
}
</style>
