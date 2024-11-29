<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="selectedBucket"
      class="elevation-1"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <!-- <tr v-for="item of headers"
          :key="item.value" >
          <td v-if="item.value === 'page' || item.value === 'name'">
            {{ props.item[item.value] }}
          </td>
          <td v-else>
            <v-checkbox v-model="props.item[item.value]"></v-checkbox>
          </td>
          </tr> -->

        <td
          v-for="item of headers"
          :key="item.value"
          class="text-xs-justify pr-2"
          style="background-color: #eff3f4"
        >
          <div v-if="item.value === 'page' || item.value === 'name'">
            {{ props.item[item.value] }}
          </div>
          <div v-else>
            <v-checkbox v-model="props.item[item.value]"></v-checkbox>
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "FeatureAvailability",
  inject: ["selectedBucket", "selectedAccessList", "parentProductList"],
  data() {
    return {
      headers: [{ text: "Buckets", value: "name", sortable: false }],
    };
  },
  methods: {
    dynamicHeader() {
      const checkParentProduct =
        this.parentProductList == "CV" || this.parentProductList == "TW" ? "FR1" : "FR21";
      let filter = this.selectedAccessList.filter(
        (e) => e.id === checkParentProduct
      );
      if (filter.length) {
        let feat = filter[0].features;
        const modify = feat.map((e) => {
          return {
            text: e.name,
            value: e.name,
            sortable: false,
          };
        });
        this.headers = [...this.headers, ...modify];
      }
    },
  },
  created() {
    this.dynamicHeader();
  },
  watch: {
    selectedAccessList(newData, oldData) {
      this.dynamicHeader();
    },
  },
};
</script>

<style scoped>
.v-datatable .v-input--selection-controls {
    margin: 0px;
    padding-top: 3vh;
  
}
</style>