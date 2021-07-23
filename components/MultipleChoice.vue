<template>
  <fieldset>
    <legend class="mb-3 text-lg">{{ question }}</legend>
    <div class="flex justify-around">
      <label v-for="[answer, answerValue] of choices" :key="answer">
        {{ answer }}
        <input
          type="radio"
          :value="answerValue"
          :name="question"
          :model="value"
          :checked="value === answerValue"
          @change="$emit('input', $event.target.value)"
        />
      </label>
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
}
</script>
