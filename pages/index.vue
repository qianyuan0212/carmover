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
            <v-list-item :key="item.mobile" :value="item" class="px-5 py-5">
              <v-list-item-content>
                <v-list-item-title class="text-subtitle-2">
                  <span v-if="index === 0">主号码</span>
                  <span v-else>备用号码</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div class="flex align-center mt-2">
                    <span class="text-h5 primary--text">
                      {{ formatMobile(item.mobile) }}
                    </span>
                    <v-spacer />
                    <span> {{ item.name }}{{ item.gender }}</span>
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
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
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['mobiles']),
  },
  watch: {
    page(val) {
      // console.log({ val })
    },
  },
  created() {
    this.$store.dispatch('getMobile')
  },
  methods: {
    formatMobile(mobile) {
      const arrMobile = Array.from(mobile)
      arrMobile.splice(7, 0, ' ')
      arrMobile.splice(3, 0, ' ')
      return arrMobile.join('')
    },
    save(mobiles) {
      this.$store.dispatch('saveMobile', mobiles)
    },
  },
}
</script>
