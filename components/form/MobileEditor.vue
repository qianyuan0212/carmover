<template>
  <v-bottom-sheet v-model="sheet" fullscreen>
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs, value }">
        <v-text-field
          :rules="[]"
          :value="value"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </slot>
    </template>
    <v-sheet class="h-full overflow-auto">
      <v-toolbar flat tile>
        <v-btn icon @click="close">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <div class="text-base">{{ $attrs.label }}</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text class="px-0 -mr-2" :min-width="56" @click="confirm"
          >确定</v-btn
        >
      </v-toolbar>
      <v-form ref="form" v-model="valid" class="pa-5">
        <slot v-bind="slotProps">
          <v-textarea
            v-if="textarea"
            v-model="cloneValue"
            v-bind="$attrs"
            label=""
          ></v-textarea>
          <v-text-field
            v-else
            v-model="cloneValue"
            v-bind="$attrs"
            label=""
            :type="type"
          ></v-text-field>
        </slot>
        <slot name="description">
          <div
            v-if="description"
            class="pt-5 text-sm font-light grey--text text--darken-2"
            v-html="description"
          ></div>
        </slot>
      </v-form>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  inheritAttrs: false,
  props: {
    value: {},
    type: {
      type: String,
      default: 'text',
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    sheet: false,
    valid: true,
    cloneValue: undefined,
  }),
  computed: {
    slotProps() {
      return {
        attrs: { ...this.$attrs, value: this.cloneValue },
        on: { input: this.inputHandler },
      }
    },
  },
  watch: {
    sheet(val) {
      if (val) {
        if (typeof this.value === 'object') {
          this.cloneValue = cloneDeep(this.value)
        } else {
          this.cloneValue = this.value
        }
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      }
      this.$emit(val ? 'open' : 'close')
    },
  },
  methods: {
    close() {
      this.sheet = false
    },
    confirm() {
      if (this.$refs.form.validate()) {
        this.$emit('input', this.cloneValue)
        this.sheet = false
      }
    },
    inputHandler(e) {
      this.cloneValue = e
    },
  },
}
</script>
