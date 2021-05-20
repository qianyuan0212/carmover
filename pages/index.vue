<template>
  <v-app>
    <v-app-bar fixed app light dark color="primary">
      <v-spacer :class="{ 'ml-12': mobiles.length }"></v-spacer>
      <v-toolbar-title>
        <div class="text-base">我的联系方式</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <form-mobile-editor
        v-if="mobiles.length"
        :value="mobiles"
        @change="save"
      ></form-mobile-editor>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-list>
          <template v-for="(item, index) in mobiles">
            <v-list-item :key="item.mobile" :value="item" class="px-5 py-2">
              <v-list-item-content>
                <v-list-item-title class="primary--text">
                  {{ item.name }}{{ item.gender }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.mobile }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action v-if="index === 0">
                <v-list-item-action-text>主号码</v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
            <v-divider :key="'divider' + index"></v-divider>
          </template>
        </v-list>

        <form-mobile-editor
          v-if="!mobiles.length"
          :value="mobiles"
          @change="save"
        >
          <template #activator="{ on, attrs }">
            <div class="px-2">
              <v-btn
                block
                outlined
                x-large
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                创建联系方式
              </v-btn>
            </div>
          </template>
        </form-mobile-editor>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      mobiles: [
        // {
        //   name: 'A',
        //   gender: '先生',
        //   mobile: '18911754060',
        // },
        // {
        //   name: 'B',
        //   gender: '先生',
        //   mobile: '18911754050',
        // },
        // {
        //   name: 'Q',
        //   gender: '先生',
        //   mobile: '18911754030',
        // },
      ],
    }
  },
  watch: {
    page(val) {
      // console.log({ val })
    },
  },
  methods: {
    save(data) {
      this.mobiles = data
    },
  },
}
</script>
