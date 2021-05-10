<template>
  <div>
    <v-window v-model="value" touchless class="h-full">
      <v-window-item class="h-full" :value="0">
        <v-container>
          <form-mobile-editor
            label="添加联系方式"
            counter
            maxlength="20"
            :rules="[
              (v) => !!v || '职位不能为空',
              (v) => (v && v.length <= 20) || '最多20个字符',
            ]"
            @input="save({ jobName: $event })"
          >
          </form-mobile-editor>
        </v-container>
      </v-window-item>
      <v-window-item class="h-full" :value="1">
        <v-container>
          <v-card elevation="0">
            <v-card-title>bbbb</v-card-title>
          </v-card>
        </v-container>
      </v-window-item>
    </v-window>

    <v-bottom-navigation v-model="value" app color="primary">
      <v-btn>
        <span>my phones</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-btn>
        <span>my codes</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    }
  },
  watch: {
    value(val) {
      console.log({ val })
    },
  },
  methods: {
    save() {},
  },
}
</script>
