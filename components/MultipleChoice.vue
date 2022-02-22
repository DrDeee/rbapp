<template>
  <fieldset class="p-2 mt-3 bg-gray-200 multiplechoice">
    <div class="mb-3 text-lg">{{ question }}</div>
    <slot name="before" />
    <div
      :class="{
        flex: true,
        'justify-around': !asCol,
        'flex-col': asCol,
      }"
    >
      <div
        v-for="[answer, answerValue] of choices"
        :key="answer"
        @click="$emit('input', answerValue)"
      >
        <input
          type="radio"
          :value="answerValue"
          :name="question"
          :model="value"
          :checked="value === answerValue"
          @change="$emit('input', $event.target.value)"
        />
        <label>
          {{ answer }}
        </label>
      </div>
    </div>
    <slot />
  </fieldset>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class MultipleChoice extends Vue {
  @Prop({
    required: true,
  })
  question!: String

  @Prop({
    default: () => [
      ['Ja', 'true'],
      ['Nein', 'false'],
    ],
  })
  choices!: Array<[String, any]>

  @Prop({
    required: true,
  })
  value!: any

  get asCol() {
    return this.choices.length > 2
  }
}
</script>

<style>
fieldset fieldset.multiplechoice {
  background-color: white;
}
</style>
