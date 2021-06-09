<template>
  <v-app>
    <!-- <v-app-bar fixed app light dark color="primary">
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <div class="text-base">呼叫车主</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar> -->
    <v-main>
      <v-container>
        <v-card v-if="mobiles.length" elevation="0" class="py-10">
          <v-card-title class="justify-center">
            {{ mobiles[0].name }}{{ mobiles[0].gender }}
          </v-card-title>
          <v-card-actions>
            <v-btn block x-large color="primary"> 呼叫 </v-btn>
          </v-card-actions>
        </v-card>
        <template v-if="mobiles.length > 1">
          <v-divider class="mt-8" />
          <v-card elevation="0">
            <v-card-title>备用号码</v-card-title>
            <v-card-content class="flex">
              <div>{{ mobiles[1].name }}{{ mobiles[1].gender }}</div>
              <v-spacer />
              <v-btn icon color="primary">
                <v-icon>mdi-phone</v-icon>
              </v-btn>
            </v-card-content>
          </v-card>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      mobiles: [],
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.$store.dispatch('getMobileById', id).then((res) => {
        if (res.code === 0 && res.data.mobiles) {
          this.mobiles = res.data.mobiles
        }
      })
    }
  },
}
</script>
