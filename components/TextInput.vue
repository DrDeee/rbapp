<template>
  <fieldset class="mt-3 bg-gray-200 p-2">
    <div class="mb-3 text-lg">
      {{ question }}
    </div>
    <textarea
      v-model="value"
      class="w-full"
      @input="
        $emit(
          'input',
          $event.target.value === '' ? undefined : $event.target.value
        )
      "
    />
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
    required: true,
  })
  value!: string
}
</script>

<style>
fieldset fieldset.multiplechoice {
  background-color: white;
}
</style>
