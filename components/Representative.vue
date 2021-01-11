<template>
  <div class="flex items-center text-lg p-1 h-24">
    <button
      v-if="!representative.editing"
      class="mx-1 w-8 h-8 flex-none"
      @click="representative.editing = !representative.editing"
    >
      <font-awesome-icon icon="edit" />
    </button>
    <button
      v-else
      class="mx-1 w-8 h-8 flex justify-center items-center text-gray-200 flex-none"
      @click="representative.cancel()"
    >
      <font-awesome-icon icon="times" />
    </button>

    <div class="mx-2 flex-grow flex flex-col justify-between">
      <div class="flex justify-between mb-2">
        <label v-if="!representative.editing" class="mx-1">
          {{ representative.name }}
        </label>
        <input v-else v-model="representative.name" class="w-full" />
        <!--
      If the menu is open somehow the event handler on the main
      div triggers also and the menu isn't hidden :(
      @click.stop prevents this somehow
    -->
        <details
          v-if="!representative.editing"
          :open="openMenu === representative.id"
          @toggle="
            $emit(
              'update:openMenu',
              $event.target.attributes['open'] ? representative.id : null
            )
          "
          @click.stop
        >
          <summary class="text-primary">
            <font-awesome-icon icon="ellipsis-h" />
          </summary>
          <ul
            class="absolute left-auto bg-primary rounded-lg menu-right text-lg"
            @click="$emit('update:openMenu', null)"
          >
            <li>
              <button
                class="p-2 w-full text-center rounded-t-lg rounded-b-none"
                @click="
                  isEx
                    ? localGroup.makeCurrent(representative)
                    : localGroup.makeEx(representative)
                "
              >
                {{ isEx ? 'Zum Deli machen' : 'Zum Ex-Deli machen' }}
              </button>
            </li>
            <li>
              <button
                class="p-2 w-full text-center rounded-b-lg rounded-t-none shadow-none"
                @click="localGroup.removeRep(representative)"
              >
                Kontaktdaten löschen
              </button>
            </li>
          </ul>
        </details>
      </div>
      <div class="flex justify-between">
        <a
          v-if="!representative.editing"
          class="text-center text-primary flex items-center"
          :href="'tel:' + representative.phone"
        >
          {{ representative.formattedPhone }}
        </a>
        <input
          v-else
          v-model="representative.phone"
          class="text-primary px-1 rounded-lg w-full border border-solid border-primary"
          type="phone"
        />
        <div v-if="!representative.editing" class="flex">
          <a :href="representative.waMe" class="mx-1 button w-8 h-8">
            <font-awesome-icon :icon="['fab', 'whatsapp']" />
          </a>
          <button class="w-8 h-8" @click="representative.copyNumber()">
            <font-awesome-icon icon="copy" />
          </button>
        </div>
      </div>
    </div>
    <button
      v-if="representative.editing"
      class="flex-none mx-1 w-8 h-8"
      @click="representative.save()"
    >
      <font-awesome-icon icon="save" />
    </button>
  </div>
</template>
<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator'

@Component
export default class Representative extends Vue {
  @Prop({ type: Object, required: true })
  localGroup!: any

  @Prop({ type: Object, required: true })
  representative!: any

  @Prop({ type: Boolean, required: true })
  isEx!: boolean

  @Prop({ type: String })
  openMenu!: String
}
</script>
