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
                >fffutu.re/fundraising-tk</a
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
