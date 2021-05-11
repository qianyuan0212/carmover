<template>
  <v-app>
    <v-app-bar fixed app light dark color="primary">
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <div class="text-base">呼叫车主</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-card elevation="0">
          <v-card-title><v-spacer />{{ name }}<v-spacer /></v-card-title>
          <v-card-actions>
            <v-btn block x-large color="primary"> Call </v-btn>
          </v-card-actions>
        </v-card>
        <v-divider />
        <v-card elevation="0">
          <v-card-title>
            <div>backup</div>
            <v-spacer />
            <v-btn icon color="primary">
              <v-icon>mdi-phone</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-divider />
        <v-card elevation="0">
          <v-card-title>
            <div>backup</div>
            <v-spacer />
            <v-btn icon color="primary">
              <v-icon>mdi-phone</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: 'Owner Name',
    }
  },
}
</script>
