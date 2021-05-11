<template>
  <v-app>
    <v-app-bar fixed app light dark color="primary">
      <v-icon v-if="mobiles.length < 3" class="invisible">mdi-plus</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <div class="text-base">我的联系方式</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <form-mobile-editor
        v-if="mobiles.length < 3"
        label="添加联系方式"
        @input="add"
      >
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </form-mobile-editor>
    </v-app-bar>
    <v-main>
      <v-container class="h-full">
        <form-mobile-editor
          v-for="(item, index) in mobiles"
          :key="item.mobile"
          :value="item"
          label="修改联系方式"
          @input="save($event, index)"
          @setPrimary="setPrimary(index)"
          @delete="deleteHandler(index)"
        >
          <template #activator="{ on, attrs }">
            <div class="-mx-3">
              <v-list-item class="px-5 py-2">
                <v-list-item-content>
                  <v-list-item-title
                    class="primary--text"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ item.name }}{{ item.gender }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.mobile }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="item.primary">
                  <v-list-item-action-text>主号码</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </template>
        </form-mobile-editor>

        <template v-if="!mobiles.length">
          <form-mobile-editor label="添加联系方式" @input="add">
            <template #activator="{ on, attrs }">
              <div class="mt-8 px-2">
                <v-btn
                  block
                  outlined
                  x-large
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  添加联系方式
                </v-btn>
              </div>
            </template>
          </form-mobile-editor>
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      mobiles: [
        {
          name: 'A',
          gender: '先生',
          mobile: '18911754060',
          primary: true,
        },
        {
          name: 'B',
          gender: '先生',
          mobile: '18911754050',
          primary: false,
        },
        {
          name: 'Q',
          gender: '先生',
          mobile: '18911754030',
          primary: false,
        },
      ],
    }
  },
  watch: {
    page(val) {
      // console.log({ val })
    },
  },
  methods: {
    save(data, index) {
      this.mobiles.splice(index, 1, data)
    },
    add(data) {
      data.primary = !this.mobiles.length
      this.mobiles.push(data)
    },
    setPrimary(index) {
      this.mobiles.forEach((item, i) => {
        item.primary = i === index
      })
    },
    deleteHandler(index) {
      const { primary: primaryVal } = this.mobiles[index]
      this.mobiles.splice(index, 1)
      if (primaryVal && this.mobiles.length) {
        this.mobiles[0].primary = true
      }
    },
  },
}
</script>
