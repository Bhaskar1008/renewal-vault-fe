<template>
  <div
    style="padding: 10px; margin-left: 10px"
    v-if="selectedAccessList.length"
  >
    <v-tabs class="tabs-color" v-model="currentItem" slider-color="#07458e">
      <v-tab
        v-for="item in items"
        :key="item"
        :href="'#tab-' + item"
        :style="[
          items.length == 2
            ? 'tab-' + item === 'tab-Lob permission'
              ? { 'border-radius': '10px 0px 0px 0px' }
              : { 'border-radius': '0px 10px 0px 0px' }
            : { 'border-radius': '10px 10px 0px 0px' },
        ]"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentItem">
      <v-tab-item v-for="item in items" :key="item" :value="'tab-' + item">
        <v-card flat>
          <!-- <v-card-text> -->
         
          <LOBPermission v-if="currentItem === 'tab-Lob permission'" />
          <FeatureAvailability v-else />
          <!-- </v-card-text> -->
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import LOBPermission from "./LOBPermission";
import FeatureAvailability from "./FeatureAvailability";
export default {
  name: "AddUserTabs",
  inject: ["showRenewalStatus", "selectedAccessList"],
  data: () => ({
    currentItem: "tab-Lob permission",
    items: ["Lob permission"],
  }),
  components: {
    FeatureAvailability,
    LOBPermission,
  },
  created() {
    this.checkTab(this.showRenewalStatus);
  },
  methods: {
    checkTab(value) {
      if (value) {
        this.items = ["Lob permission", "Feature availability"];
      } else {
        this.items = ["Lob permission"];
      }
    },
  },
  watch: {
    showRenewalStatus(newQuestion, oldQuestion) {
      this.checkTab(newQuestion);
    },
  },
};
</script>

<style scoped>
.theme--light.v-tabs__bar .v-tabs__div {
  color: azure;
  background-color: #07458e;
}
</style>