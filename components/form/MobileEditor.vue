<template>
  <v-bottom-sheet v-model="sheet" fullscreen>
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs, value }"> </slot>
    </template>
    <v-sheet class="h-full">
      <v-toolbar absolute flat tile class="w-full">
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
      <v-container class="h-full flex flex-col">
        <v-form ref="form" v-model="valid" class="px-2 py-2 mt-20">
          <v-text-field
            v-model="cloneValue.mobile"
            label="手机号"
            type="number"
            :rules="mobileRules"
            required
          ></v-text-field>
          <v-text-field v-model="cloneValue.name" label="称呼">
            <template #append>
              <div class="pl-5" @click="toggleGender">
                {{ cloneValue.gender }}
              </div>
            </template>
          </v-text-field>
        </v-form>
        <v-spacer></v-spacer>
        <div>
          <template v-if="value.primary === false">
            <v-divider></v-divider>
            <v-btn block text large color="primary" @click="primaryHandler"
              >设置为主号</v-btn
            >
          </template>
          <template v-if="value.mobile">
            <v-divider></v-divider>
            <v-btn block text large color="error" @click="deleteHandler"
              >删除</v-btn
            >
          </template>
        </div>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data: () => ({
    sheet: false,
    valid: true,
    cloneValue: {},
    mobileRules: [
      (v) => !!v || '手机号不能为空',
      (v) => (v && /^1[3-9]\d{9}$/.test(v)) || '请输入正确的手机号',
    ],
  }),
  watch: {
    sheet(val) {
      if (val) {
        this.cloneValue = cloneDeep(this.value)
        if (!this.cloneValue.gender) {
          this.$set(this.cloneValue, 'gender', '先生')
        }
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      }
      this.$emit(val ? 'open' : 'close')
    },
  },
  methods: {
    toggleGender() {
      this.cloneValue.gender =
        this.cloneValue.gender === '先生' ? '女士' : '先生'
    },
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
    primaryHandler() {
      this.$emit('setPrimary')
      this.close()
    },
    deleteHandler() {
      this.$emit('delete')
      this.close()
    },
  },
}
</script>
