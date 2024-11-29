<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="selectedAccessList"
      class="elevation-1"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td
          v-for="item of headers"
          :key="item.value"
          class="text-xs-justify pr-2"
          style="background-color: #eff3f4;vertical-align: text-top;"
        >
          <div class="m-1"
         
          v-if="item.value === 'view' || item.value === 'edit'">
            <v-checkbox 
            v-model="props.item[item.value]"></v-checkbox>
          </div>
          <div v-else>
            {{ props.item[item.value] }}
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "LOBPermission",
  inject: ["selectedAccessList"],
  data() {
    return {
      headers: [
        {
          text: "Access List",
          align: "start",
          sortable: false,
          value: "page",
        },

        { text: "View", value: "view", sortable: false },
        { text: "Edit", value: "edit", sortable: false },
      ],
    };
  },
};
</script>

<style scoped>
th {
  padding: 10px 20px;
  background-color: #01afcb;
  color: white;

  margin: 0px !important;
}
tr {
  margin: 0px !important;
}
td {
  text-align: left;
  padding: 0px 10px;

  background-color: #eff3f4;
  border-bottom: 1px solid #d2d5d6;
}
.v-datatable .v-input--selection-controls {
    margin: 0px;
    padding-top: 3vh;
  
}
table {
  width: 100%;
  border-collapse: collapse;
}
</style>