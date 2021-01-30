<template>
  <form class="flex items-center text-lg p-1 h-24" @submit.prevent="save()">
    <button
      v-if="!editing"
      class="mx-1 w-8 h-8 flex-none"
      type="button"
      @click="editing = true"
    >
      <font-awesome-icon icon="edit" />
    </button>
    <button
      v-else
      type="button"
      class="mx-1 w-8 h-8 flex justify-center items-center text-gray-200 flex-none"
      @click.prevent="reset()"
    >
      <font-awesome-icon icon="times" />
    </button>

    <div class="mx-2 flex-grow flex flex-col justify-between">
      <div class="flex justify-between mb-2">
        <label v-if="!editing" class="mx-1">
          {{ representative.name }}
        </label>
        <input v-else v-model="name" class="w-full" required />
        <!--
      If the menu is open somehow the event handler on the main
      div triggers also and the menu isn't hidden :(
      @click.stop prevents this somehow
    -->
        <details
          v-if="!editing"
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
                type="button"
                class="p-2 w-full text-center rounded-t-lg rounded-b-none"
                @click="
                  $store.dispatch('setRepStatus', {
                    group: localGroup.id,
                    rep: representative.id,
                    status: representative.status === 'EX' ? 'CURRENT' : 'EX',
                  })
                "
              >
                {{
                  representative.status === 'EX'
                    ? 'Zum Deli machen'
                    : 'Zum Ex-Deli machen'
                }}
              </button>
            </li>
            <li>
              <button
                type="button"
                class="p-2 w-full text-center rounded-b-lg rounded-t-none shadow-none"
                @click="
                  $store.dispatch('removeRep', {
                    group: localGroup.id,
                    rep: representative.id,
                  })
                "
              >
                Kontaktdaten löschen
              </button>
            </li>
          </ul>
        </details>
      </div>
      <div class="flex justify-between">
        <a
          v-if="!editing"
          class="text-center text-primary flex items-center"
          target="_blank"
          :href="'tel:' + representative.phone"
        >
          {{ representative.formattedPhone }}
        </a>
        <input
          v-else
          v-model="phone"
          class="text-primary px-1 rounded-lg w-full border border-solid border-primary"
          type="tel"
          required
        />
        <div v-if="!editing" class="flex">
          <a
            :href="representative.waMe"
            class="mx-1 button w-8 h-8"
            target="_blank"
          >
            <font-awesome-icon :icon="['fab', 'whatsapp']" />
          </a>
          <button
            type="button"
            class="w-8 h-8"
            @click="representative.copyNumber()"
          >
            <font-awesome-icon icon="copy" />
          </button>
        </div>
      </div>
    </div>
    <button v-if="editing" class="flex-none mx-1 w-8 h-8" type="submit">
      <font-awesome-icon icon="save" />
    </button>
  </form>
</template>
<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator'

@Component
export default class Representative extends Vue {
  @Prop({ type: Object, required: true })
  localGroup!: any

  @Prop({ type: Object, required: true })
  representative!: any

  @Prop({ type: String })
  openMenu!: String

  editing = false

  name = ''
  phone = ''

  created() {
    this.reset()
  }

  reset() {
    this.name = this.representative.name
    this.phone = this.representative.phone
    this.editing = false
  }

  save() {
    this.$store.dispatch('setRepData', {
      group: this.localGroup.id,
      rep: this.representative.id,
      data: { name: this.name, phone: this.phone },
    })
    this.reset()
  }
}
</script>
