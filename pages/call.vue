<template>
  <div>
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
  </div>
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
