<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template #activator="{ on, attrs }">
      <slot name="activator" v-bind="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>
      </slot>
    </template>
    <v-sheet class="h-full">
      <v-toolbar flat tile class="w-full">
        <v-btn text class="px-0 -ml-2 grey--text" @click="close">取消</v-btn>
        <v-toolbar-title>
          <div class="text-base">{{ $attrs.label }}</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text class="px-0 -mr-2" @click="confirm">保存</v-btn>
      </v-toolbar>
      <v-container>
        <v-form ref="form" v-model="valid" class="px-3">
          <v-card elevation="0" class="mt-3">
            <h3 class="text-sm font-medium mb-3 black--text">主号码</h3>
            <v-text-field
              v-model="cloneValue[0].mobile"
              label="手机号"
              type="number"
              :rules="mobileRules"
              required
            ></v-text-field>
            <v-text-field v-model="cloneValue[0].name" label="称呼">
              <template #append>
                <div class="pl-5" @click="toggleGender(0)">
                  {{ cloneValue[0].gender }}
                </div>
              </template>
            </v-text-field>
          </v-card>
          <v-card elevation="0" class="mt-12">
            <h3 class="text-sm font-medium mb-3 black--text">备用号码</h3>
            <v-text-field
              v-model="cloneValue[1].mobile"
              label="手机号"
              type="number"
              :rules="mobileRules2"
              required
            ></v-text-field>
            <v-text-field v-model="cloneValue[1].name" label="称呼">
              <template #append>
                <div class="pl-5" @click="toggleGender(1)">
                  {{ cloneValue[1].gender }}
                </div>
              </template>
            </v-text-field>
          </v-card>
          <!-- <v-card elevation="0" class="mt-6">
            <h3 class="text-sm font-medium mb-2">备用号码2</h3>
            <v-text-field
              v-model="cloneValue[2].mobile"
              label="手机号"
              type="number"
              :rules="mobileRules2"
              required
            ></v-text-field>
            <v-text-field v-model="cloneValue[2].name" label="称呼">
              <template #append>
                <div class="pl-5" @click="toggleGender(2)">
                  {{ cloneValue[2].gender }}
                </div>
              </template>
            </v-text-field>
          </v-card> -->
        </v-form>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data: () => ({
    dialog: false,
    valid: true,
    cloneValue: [{}, {}],
    mobileRules: [
      (v) => !!v || '主号码不能为空',
      (v) => (v && /^1[3-9]\d{9}$/.test(v)) || '请输入正确的手机号',
    ],
    mobileRules2: [
      // (v) => !!v || '手机号不能为空',
      (v) => (v && /^1[3-9]\d{9}$/.test(v)) || !v || '请输入正确的手机号',
    ],
  }),
  watch: {
    dialog(val) {
      if (val) {
        this.cloneValue = cloneDeep(this.value)
        for (let i = 0; i < 2; i++) {
          if (!this.cloneValue[i]) {
            this.cloneValue[i] = {}
          }
          if (!this.cloneValue[i].gender) {
            this.$set(this.cloneValue[i], 'gender', '先生')
          }
        }
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      }
      this.$emit(val ? 'open' : 'close')
    },
  },
  methods: {
    toggleGender(i) {
      this.cloneValue[i].gender =
        this.cloneValue[i].gender === '先生' ? '女士' : '先生'
    },
    close() {
      this.dialog = false
    },
    confirm() {
      if (this.$refs.form.validate()) {
        this.$emit(
          'change',
          this.cloneValue.filter((item) => item.mobile)
        )
        this.dialog = false
      }
    },
  },
}
</script>
