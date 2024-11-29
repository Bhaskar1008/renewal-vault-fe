<template>
  <v-app style="background-color: #e8eeef">
    <div style="margin-left: 35px" class="mt-2">
      <v-breadcrumbs :items="items"></v-breadcrumbs>
    </div>

    <!-- create table -->
    <section v-if="show === 'table-form'">
      <v-card elevation="2" style="margin: 8px 35px; padding: 10px 20px">
        <CreateTableForm @clicked="showAddJobScheduler"></CreateTableForm>
      </v-card>
    </section>

    <!-- add job schedule form -->
    <section v-else-if="show == 'job-schedule-form'">
      <v-card elevation="2" style="margin: 8px 35px; padding: 10px 20px">
        <AddJobSchedulerForm
          @clicked="showAddJobScheduler"
        ></AddJobSchedulerForm>
      </v-card>
    </section>

    <!-- job schedule page -->
    <section v-else>
      <!-- header bar -->
      <v-card elevation="2" style="margin: 8px 35px; padding: 10px 20px">
        <v-card-actions>
          <v-list-item class="grow">
            <v-row style="display: flex; justify-content: right">
              <div class="head-card-text">Job Scheduler</div>
              <v-spacer></v-spacer>

              <v-btn
                tile
                small
                color="success"
                @click="showAddJobScheduler('table-form')"
              >
                <v-icon left> mdi-plus-box-outline </v-icon>
                Create Table
              </v-btn>
              <v-btn
                small
                tile
                color="success"
                @click="showAddJobScheduler('job-schedule-form')"
              >
                <v-icon left> mdi-plus-box-outline </v-icon>
                Add Job Scheduler
              </v-btn>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>

      <!-- table header -->
      <v-card elevation="2" style="margin: 20px 35px; padding: 10px 20px">
        <!-- <v-list-item class="grow"> -->
        <v-row style="display: flex; justify-content: right; height: 80px">
          <div class="head-card-text">Job Scheduler List</div>
          <v-spacer></v-spacer>
          <!-- Filter By -->
          <v-flex xs3 class="mr-3">
            <p class="font-weight-bold mb-1 caption" style="color: #646666">
              Filter By
            </p>
            <v-select
              style="min-height: 0px"
              solo
              label="Select"
              :items="filterByOpn"
              item-text="text"
              item-value="value"
              return-object
            ></v-select>
          </v-flex>
          <v-btn small tile class="mt-4" color="primary">
            <v-icon left> mdi-magnify </v-icon>
            search
          </v-btn>
        </v-row>
        <!-- </v-list-item> -->
        <div>
          <v-data-table
            :headers="headers"
            :items="TableData"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td
                v-for="item of headers"
                :key="item.text"
                class="text-xs-justify pr-2"
                style="background-color: #eff3f4"
              >
                <div
                  v-if="item.value === 'Actions'"
                  @mouseleave="ShowMenu({ [props.item.id]: false })"
                >
                  <v-btn
                    class="ma-2"
                    :id="item.text"
                    @mouseover="ShowMenu({ [props.item.id]: true })"
                    text
                    icon
                    color=" lighten-2"
                  >
                    <v-icon> mdi-dots-vertical</v-icon>
                  </v-btn>

                  <v-card
                    class="menu-action"
                    id="item.text"
                    @mouseover="ShowMenu({ [props.item.id]: true })"
                    @mouseleave="ShowMenu({ [props.item.id]: false })"
                    v-show="overMenu[props.item.id]"
                  >
                    <v-list-item class="list-action">
                      <v-list-item-icon>
                        <v-icon small> mdi-eye-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>VIEW </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item two-line class="list-action">
                      <v-list-item-icon>
                        <v-icon color="#01afcb" small
                          >mdi-check-circle-outline</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-content
                        style="color: #01afcb; vertical-align: middle"
                        >SCHEDULE
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item three-line class="list-action red">
                      <v-list-item-icon>
                        <v-icon color="red" small>
                          mdi-close-box-outline</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-content>DELETE </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </div>

                <div v-else>
                  {{ props.item[item.value] }}
                </div>
              </td>
            </template>
          </v-data-table>

          <v-container fluid class="my-3 paginationStyle">
            <v-layout justify-end>
              <div class="margincls mt-3 mr-3">
                <span>
                  Showing <b>{{ 0 }}</b> - <b>{{ 0 }}</b></span
                >
                <span>
                  out of <b>{{ totalListCount }}</b> records
                </span>
              </div>
              <v-pagination
                class="mr-4 mt-1 navpagenumber"
                color="#152F38"
                :total-visible="5"
              >
              </v-pagination>
              <!-- @input="nextPage($event)" -->
              <!-- v-model="pageNumber" -->
              <!-- :length="getNoOfPages" -->
            </v-layout>
          </v-container>
        </div>
      </v-card>
    </section>
  </v-app>
</template>

<script>
import CreateTableForm from "./CreateTableForm.vue";
import AddJobSchedulerForm from "./AddJobSchedulerForm.vue";
export default {
  name: "JobScheduler",
  components: { CreateTableForm, AddJobSchedulerForm },
  data: () => ({
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/#/rn-scheduler",
      },
      {
        text: "Job Scheduler",
        disabled: false,
        href: "/#/job-scheduler",
      },
    ],
    overMenu: {},
    filterByOpn: ["Jobs To Schedule", "Job Scheduled"],
    headers: [
      {
        text: "Table Name",
        sortable: false,
        value: "table_name",
      },
      { text: "Column Name", sortable: false, value: "column_name" },
      { text: "Data Type", value: "data_type", sortable: false },
      { text: "Primary Key", value: "primary_key", sortable: false },
      { text: "Secondary Key", sortable: false, value: "secondary_key" },
      { text: "Read Capacity", value: "read_cap", sortable: false },
      { text: "Write Capacity", value: "write_cap", sortable: false },
      { text: "Index Details", value: "index_details", sortable: false },
      { text: "Actions", sortable: false, value: "Actions" },
    ],
    TableData: [
      {
        id: 1,
        table_name: "Name of table",
        column_name: "Name of column",
        data_type: "Data Types",
        primary_key: 1233123,
        secondary_key: 2334,
        read_cap: "Dummy test",
        write_cap: "Test dummy",
        index_details: "test",
      },
      {
        id: 2,
        table_name: "Name of table",
        column_name: "Name of column",
        data_type: "Data Types",
        primary_key: 1233123,
        secondary_key: 2334,
        read_cap: "Dummy test",
        write_cap: "Test dummy",
        index_details: "test",
      },
      {
        id: 3,
        table_name: "Name of table",
        column_name: "Name of column",
        data_type: "Data Types",
        primary_key: 1233123,
        secondary_key: 2334,
        read_cap: "Dummy test",
        write_cap: "Test dummy",
        index_details: "test",
      },
    ],
    page: 1,
    pageStartIndex: 1,
    pageRowCount: 15,
    totalListCount: 0,
    show: "all",
    selectedItem: 1,
    items1: [
      { text: "VIEW", icon: "mdi-eye-outline" },
      { text: "SCHEDULE", icon: "mdi-check-circle-outline" },
      { text: "DELETE", icon: "mdi-close-box-outline" },
    ],
  }),

  methods: {
    showAddJobScheduler(val) {
      console.log(val, "show");
      this.show = val;
    },
    ShowMenu(val) {
      console.log({ ...this.overMenu, ...val });
      this.overMenu = val;
    },
  },
};
</script>

<style >
ul > :first-child a {
  /* font-weight: bold; */
  color: #000000 !important;
  opacity: 0.6;
  font-size: 14px !important;
}
.v-breadcrumbs__item {
  font-weight: bold;
  color: #1e83c2;
  font-size: 14px !important;
}
.v-breadcrumbs__divider {
  color: #000000 !important;
  opacity: 0.6;
  font-size: 14px !important;
}
.head-card-text {
  font-weight: bold;
  color: #1e83c2;
  /* opacity: 0.6; */
  font-size: 14px !important;
}
.v-btn {
  text-transform: capitalize;
}
.menu-action {
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  font-size: 12px;
  padding: 0px 10px;
}
.list-action {
  cursor: pointer;
  padding: 10px 0px;
  /* padding: 2px 10px; */
}
.red {
  color: red;
  background-color: white !important;
}
</style>