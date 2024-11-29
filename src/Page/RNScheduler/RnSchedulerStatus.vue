<template>
  <v-app style="background-color: #e8eeef">
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Batch Status</v-text
      >
    </div>
    <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
      <v-form ref="formData">
        <v-layout class="pl-3 pt-4" xs12 row wrap>
          <v-flex xs12>
            <v-layout class="cust_pr">
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Line of Business *
                </p>
                <v-select
                  solo
                  label="Select"
                  v-model="statusLOB"
                  :items="newLobArray || lobDataArray"
                  item-text="NUM_IL_PRODUCT_NAME"
                  item-value="NUM_IL_PRODUCT_CODE"
                  return-object
                  :rules="textRule"
                  @change="changeLobData(statusLOB)"
                ></v-select>
              </v-flex>

              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Product Code ( 0 for all product) *
                </p>
                <v-select
                  :items="prodCodeArray"
                  solo
                  disabled
                  label="Select"
                  item-text="text"
                  item-value="value"
                  return-object
                  v-model="statusProdCode"
                ></v-select>
              </v-flex>
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Request Type *
                </p>
                <v-select
                  solo
                  label="Select"
                  v-model="request"
                  :rules="textRule"
                  :items="requestItems"
                  return-object
                ></v-select>
              </v-flex>
              <v-flex xs3 class="mr-3" v-if="request == 'Policy No'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Policy No *
                </p>
                <v-text-field
                  solo
                  label="Enter..."
                  v-model="policyNo"
                  return-object
                ></v-text-field>
              </v-flex>
              <v-flex xs3 class="mr-3" v-if="request == 'Batch ID'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Batch ID
                </p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="statusBatchID"
                  label="Enter..."
                >
                </v-text-field>
              </v-flex>
              <v-flex
                xs3
                class="mr-3"
                v-if="request == 'Group Of Policy Numbers'"
              >
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Upload *
                </p>
                <v-flex
                  class="dm-fileContainer-bulk mt-1 mr-2"
                  style="border: 1px solid #c1c8cc; height: 38px"
                >
                  <label
                    for="myfile"
                    class="caption font-weight-medium"
                    style="margin-left: 5px; cursor: pointer"
                    >Uploading Via Browsing</label
                  >
                  <img class="ml-3" src="../../assets/upload.png" />
                  <input
                    hide-details="true"
                    type="file"
                    ref="fileref"
                    id="myfile"
                    name="myfile"
                    @change="onFilePicked"
                    style="z-index: -1"
                  />
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex class="ml-3">
            <a href="">Sample File</a>
          </v-flex>
        </v-layout>
      </v-form>
      <v-layout
        class="pa-2"
        style="position: relative; bottom: 15px; float: right"
      >
        <v-btn
          flat
          style="
            width: 100px;
            height: 35px;
            background-color: #ffffff;
            color: #646666;
            border: 1.5px solid #ccc;
            border-radius: 3px;
          "
          @click="clearalldata()"
          class="ma-2 pa-3"
          dark
          small
        >
          Clear
        </v-btn>
        <v-btn
          flat
          style="
            width: 100px;
            height: 35px;
            background-color: #0073bb;
            color: #ffffff;
            border: 1.5px solid #ccc;
            border-radius: 4px;
          "
          @click="submitStatusData()"
          class="ma-2 pa-3"
          dark
          small
        >
          Submit
        </v-btn>
      </v-layout>
    </v-card>

    <v-card
      class="ma-3 pa-4"
      v-if="
        accessPermission.edit === true || accessPermission.view === true
          ? true
          : false
      "
    >
      <div style="display: flex; flex-direction: row">
        <v-flex
          xs3
          class="mr-5 cust_pr"
          style="margin-left: 5px
            display: flex;flex-direction: column;max-width:211px"
        >
          <p class="font-weight-bold mb-1 caption" style="color: #646666">
            Filter By *
          </p>
          <v-select
            solo
            label="Select"
            v-model="filter"
            :items="requestValues"
            item-text="text"
            item-value="value"
            return-object
            @change="
              headerForDropdown(filter);
              getTableData('15', 0);
            "
          ></v-select>
        </v-flex>
        <v-text-field
          v-model="searchText"
          append-icon="search"
          label="Search"
          single-line
          class="mb-4"
          style="margin-top: 15px; max-width: 230px; margin-left: -30px"
          hide-details
          @input="getTableData('15', 0)"
        ></v-text-field>
        <div style="display: flex" v-if="filter.text == 'Expiry From and To'">
          <v-flex xs3 class="mr-3">
            <v-layout column class="cust_pr" style="width: 210px">
              <p class="font-weight-bold mb-1 caption" style="color: #646666">
                Job Scheduled Date From
              </p>
              <v-menu
                ref="calender"
                :close-on-content-click="false"
                v-model="jobBatchStartDateMenuFr"
                :nudge-right="40"
                transition="scale-transition"
                class="rounded-0"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    slot="activator"
                    label="Select.."
                    :value="computedjobStartDateFrom"
                    solo
                    class="rounded-0"
                    readonly
                    maxlength="10"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <div
                      slot="prepend-inner"
                      style="
                        position: relative;
                        right: 12px;
                        background-color: #f7f7f7;
                        margin-top: -1px;
                      "
                    >
                      <img
                        class="pa-1"
                        style="height: 35px"
                        src="../../assets/date_24X24.png"
                      /></div
                  ></v-text-field>
                </template>
                <v-date-picker
                  @input="jobBatchStartDateMenuFr = false"
                  v-model="jobBatchStartDateFrom"
                  no-title
                ></v-date-picker>
              </v-menu>
            </v-layout>
          </v-flex>
          <v-flex xs3 class="mr-3">
            <v-layout
              column
              class="cust_pr"
              style="width: 210px; margin-left: 70px"
            >
              <p class="font-weight-bold mb-1 caption" style="color: #646666">
                Job Scheduled Date To
              </p>
              <v-menu
                ref="calender"
                :close-on-content-click="false"
                v-model="jobBatchStartDateMenuTo"
                :nudge-right="40"
                transition="scale-transition"
                class="rounded-0"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    slot="activator"
                    label="Select.."
                    :value="computedjobStartDateTo"
                    solo
                    class="rounded-0"
                    readonly
                    maxlength="10"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <div
                      slot="prepend-inner"
                      style="
                        position: relative;
                        right: 12px;
                        background-color: #f7f7f7;
                        margin-top: -1px;
                      "
                    >
                      <img
                        class="pa-1"
                        style="height: 35px"
                        src="../../assets/date_24X24.png"
                      /></div
                  ></v-text-field>
                </template>
                <v-date-picker
                  @input="jobBatchStartDateMenuTo = false"
                  v-model="jobBatchStartDateTo"
                  no-title
                ></v-date-picker>
              </v-menu>
            </v-layout>
          </v-flex>
        </div>
        <div style="display: flex; flex-direction: row; margin-top: 18px">
          <v-btn
            flat
            @click="getTableData('15', 0)"
            class="submitBtn"
            dark
            small
            v-if="filter.value == 'expirydates'"
            style="margin-left: -70px"
          >
            Submit
          </v-btn>
          <v-btn
            class="dropbtn"
            style="background-color: #2a811b; color: white"
            @click="downloadData()"
          >
            <v-icon style="margin-right: 9px" small>mdi-download</v-icon>
            Download
          </v-btn>
        </div>
      </div>
      <!-- <button @click="searchData()" style="float:right;background-color:#1E83C2;padding:10px;top:0;color:#fff;border-radius: 7px;margin-bottom: 10px;">Refresh</button> -->
      <div>
        <template>
          <v-data-table
            :headers="headers"
            :items="computedArray"
            hide-actions
            v-bind:pagination.sync="pagination"
            class="elevation-1"
            select-all
            v-model="selectedRow"
            show-select
          >
            <template slot="headers" slot-scope="props">
              <!-- v-slot:headers="props" -->
              <tr>
                <th style="background: rgb(1, 175, 203)" >
                  <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    primary
                    hide-details
                    v-model="headerCheckbox"
                    @change="toggleAll($event, Tabledata)"
                    :disabled="!(filter.value=='policy_no')"
                  ></v-checkbox>
                </th>
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  style="color: white; background: rgb(1, 175, 203)"
                  :class="[
                    'column sortable',
                    pagination.descending ? 'desc' : 'asc',
                    header.value === pagination.sortBy ? 'active' : '',
                  ]"
                  @click="changeSort(header.value)"
                >
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <!-- <tr :active="props.BatchId" @click="props.BatchId = !props.BatchId"> -->
              <td style="background-color: #eff3f4">
                <v-checkbox
                  v-model="props.item.selected"
                  primary
                  hide-details
                  @change="
                    tableCheckboxForFitler($event, props.item);
                    changeStatus(props.item.JOB_ID);
                  "
                  :disabled="
                    selected.length > 0 && selected[0] != props.item.JOB_ID
                  "
                >
                </v-checkbox>
              </td>
              <td
                v-if="filter.value == 'Batch_ID'"
                class="text-xs-left pr-2"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{ props.item.JOB_ID }}
              </td>
              <td
                v-if="filter.value == 'policy_no'"
                class="text-xs-left pr-2"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{ props.item.POLICY_NUMBER }}
              </td>
              <td
                v-if="filter.value == 'Batch_ID'"
                class="text-xs-left pr-2"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{ props.item.LOB_NAME }}
              </td>
              <td
                v-if="filter.value == 'policy_no'"
                class="text-xs-left pr-2"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{ props.item.PRODUCT_NAME }}
              </td>
              <td
                v-if="filter.value == 'expirydates'"
                class="text-xs-left pr-2"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{ props.item.PRODUCT_NAME }}
              </td>
              <td
                class="text-xs-left"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{ props.item.POLICY_COUNT }}
              </td>
              <td
                v-if="filter.value == 'Batch_ID'"
                class="text-xs-left pr-2"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{ props.item.JOB_START_DATE }} {{ props.item.JOB_START_TIME }}
              </td>
              <td
                v-if="filter.value == 'Batch_ID'"
                class="text-xs-left"
                style="background-color: #eff3f4; text-align-last: center"
              >
                <p v-if="props.item.STATUS === 'Success'" class="classSuccess">
                  {{ props.item.STATUS }}
                </p>
                <p v-if="props.item.STATUS === 'Failed'" class="classFailed">
                  {{ props.item.STATUS }}
                </p>
                <p
                  v-if="props.item.STATUS === 'In Progress'"
                  class="classProgress"
                  style="width: 120px"
                >
                  {{ props.item.STATUS }}
                </p>
                <p
                  v-if="props.item.STATUS === 'Submitted'"
                  class="classSubmitted"
                >
                  {{ props.item.STATUS }}
                </p>
              </td>
              <!-- <td
                v-if="filter.value == 'policy_no'"
                class="text-xs-left"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{ props.item.RN_STATUS }}
              </td> -->
              <!-- </tr> -->
            </template>
          </v-data-table>
        </template>
        <v-layout justify-end>
          <div class="margincls mt-3 mr-3">
            <span>
              Showing <b>{{ pageStartIndex }}</b> -
              <b>{{ pageEndIndex }}</b></span
            >
            <span>
              out of <b>{{ totalListCount }}</b> records
            </span>
          </div>
          <v-pagination
            class="mr-4 mt-1"
            v-model="pageNumber"
            color="#152F38"
            :length="getNoOfPages"
            :total-visible="5"
            @input="nextPage($event)"
          >
          </v-pagination>
        </v-layout>
      </div>
    </v-card>
  </v-app>
</template>
<script>
import axios from "axios";
import xlsx from "json-as-xlsx";
import moment from "moment";
import { userPermissionValidator } from "../RenewalNotice/validator/permissionValidator";
import { apiService } from ".././RenewalNotice/common/common";
import { BaseURl, oAuthURl, tokenCred } from "../../common/API_Config.js";

let tokenDataObj = null;
let lastjobid = "";

export default {
  data() {
    return {
      singleSelect: false,
      headerCheckbox: false,
      policyNo: "",
      request: "",
      requestItems: ["Policy No", "Batch ID", "Group Of Policy Numbers"],
      filter: { text: "Batch ID", value: "Batch_ID" },
      requestValues: [
        { text: "Policy No", value: "policy_no" },
        { text: "Batch ID", value: "Batch_ID" },
        { text: "Expiry From and To", value: "expirydates" },
      ],
      actionProcess: true,
      jobBatchStartDateFrom: "",
      jobBatchStartDateTo: "",
      textRule: [(v) => !!v || "This Field is required"],
      statusLOB: "",
      statusProdCode: "",
      statusBatchID: "",
      statusBatchStartDate: "",
      jobBatchStartDateMenuFr: "",
      jobBatchStartDateMenuTo: "",
      statusBatchStartDateMenu: "",
      lobDataArray: [],
      newLobArray: [],
      prodCodeArray: [],
      parentProductName: "",
      search: "",
      searchText: "",
      lobName: "",
      page: 1,
      pageStartIndex: 1,
      pageRowCount: 15,
      totalListCount: 0,
      IsFilter: false,
      accessPermission: {},
      headers: [
        { text: "Batch ID", value: "JOB_ID" },
        { text: "LOB", value: "LOB_NAME" },
        { text: "Count", value: "COUNT" },
        { text: "Job Sched Date/Time", value: "JOB_START_DATE" },
        { text: "Reason", value: "REASON" },
        { text: "Status", value: "STATUS" },
      ],
      pagination: {
        rowsPerPage: 15,
        sortBy: "name",
      },
      search: "",
      selected: [],
      Tabledata: [],
      skipdiffrence: this.paginationdiff(),
      skip: 0,
      pageNumber: 1,
      pagelength: 1,
      selectedSingleData: [],
      BatchId: "",
      expiryDates: "",
      policy_no: [],
      TabledataForCheckbox: [],
      selectedRow: [],
      allClick: false,
    };
  },

  created() {
    this.$store.commit("SET_PAGE_TITLE", "Collection and Processing Status");
    this.getToken();
    this.headerForDropdown(this.filter);
    this.accessPermission = userPermissionValidator("FR3");
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },

    computedBatchStartDate() {
      return this.statusBatchStartDate
        ? moment(this.statusBatchStartDate).format("DD-MM-YYYY")
        : "";
    },

    computedjobStartDateFrom() {
      return this.jobBatchStartDateFrom
        ? moment(this.jobBatchStartDateFrom).format("DD-MM-YYYY")
        : "";
    },

    computedjobStartDateTo() {
      return this.jobBatchStartDateTo
        ? moment(this.jobBatchStartDateTo).format("DD-MM-YYYY")
        : "";
    },

    pageEndIndex() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return this.pageStartIndex + this.pageRowCount <= this.totalListCount
          ? this.pageStartIndex + this.pageRowCount - 1
          : this.totalListCount;
      }
    },

    getNoOfPages() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return Math.ceil(this.totalListCount / this.pageRowCount);
      }
    },
    computedArray() {
      return this.Tabledata && this.Tabledata.length ? this.Tabledata : [];
    },
  },

  methods: {
    headerForDropdown(filterData) {
      console.log(filterData.value, "filter data in header dropdown");
      if (filterData.value === "Batch_ID") {
        this.headers = [
          { text: "Batch ID", value: "BATCH_ID" },
          { text: "LOB", value: "LOB_NAME" },
          { text: "Count", value: "COUNT" },
          { text: "Job Sched Date/Time", value: "JOB_START_DATE" },
          { text: "Status", value: "STATUS" },
        ];
      } else if (filterData.value === "policy_no") {
        this.headers = [
          { text: "Policy No", value: "POLICY_NUMBER" },
          { text: "LOB", value: "PRODUCT_NAME" },
          { text: "Status", value: "RN_STATUS" },
        ];
      } else {
        this.headers = [
          {
            text: "Policy No",
            value: "BATCH_ID_OR_POLICY_NUMBER",
            filter: "Policy No",
          },
          { text: "LOB", value: "PRODUCT_NAME" },
          { text: "Count", value: "COUNT" },
          { text: "Job Sched Date/Time", value: "JOB_START_DATE" },
          { text: "Reason", value: "REASON" },
          { text: "Status", value: "STATUS" },
        ];
      }
    },
    clickAll(event, table) {
      this.TabledataForCheckbox = table
      if (this.headerCheckbox) {
        console.log(this.TabledataForCheckbox,"dfgh");
        for (var i = 0; i < table.length; i++) {
          this.TabledataForCheckbox[i].selected = true;
        }
      } else {
        for (var i = 0; i < table.length; i++) {
          this.TabledataForCheckbox[i].selected = false;
        }
      }
      if (event) {
        for (var i = 0; i < this.Tabledata.length; i++) {
          this.selectedSingleData.push(this.Tabledata[i]);
        }
      } else {
        this.selectedSingleData = [];
      }
    },
    toggleAll(event, table) {
        this.allClick = event;
        console.log(table,"toggle all table")
        this.clickAll(this.headerCheckbox, table, "toggleall values");

        let tempTableData = [];
        for (let i = this.pageStartIndex - 1; i < this.totalListCount; i++) {
          tempTableData[i] = this.Tabledata[i];
          if (event == true) {
            let temp = tempTableData.map((items) => {
              event == true
                ? (this.selectedRow = tempTableData.slice())
                : (this.selectedRow = []);
              items.selectedRow = event;
              return items;
            });
            tempTableData = [];
            tempTableData = temp;
            temp = undefined;
          }
        }

    },
    changeStatus(data) {
      console.log(data, "change status", this.selected, this.selected.length);
      if (
        this.filter.value == "Batch_ID" ||
        this.filter.value == "expirydates"
      ) {
        if (this.selected.length != 0) {
          this.selected.pop();
        } else {
          this.selected.push(data);
        }
      }
    },
    tableCheckbox(event, item) {
      // console.log(event, "event in checkbox", item, this.filter);
      let currentData = item;
      let data = JSON.parse(JSON.stringify(item));
      console.log(data, "data");
      if (event == true) {
        this.selectedSingleData.push(data);
        console.log(this.selectedSingleData, "single data");
      } else {
        const indexOfObject = this.selectedSingleData.findIndex((res) => {
          return res.JOB_ID === currentData.JOB_ID;
        });
        this.selectedSingleData.splice(indexOfObject, 1);
      }
    },
    tableCheckboxForFitler(event, item) {
      console.log(
        event,
        "event in checkbox",
        item,
        this.filter,
        this.selectedRow,
        this.headerCheckbox,
        item.selected,
        this.TabledataForCheckbox
      );
      let data = item;
      // let data = JSON.parse(JSON.stringify(item));
      console.log(data, "data");
      if (this.filter.value == "policy_no") {
        this.BatchId = {};
        this.expiryDates = {};
        if (event == true) {
          this.policy_no.push(data);
        } else {
          const indexOfObject = this.policy_no.findIndex((res) => {
            return (
              res.POLICY_NUMBER === data.POLICY_NUMBER
            );
          });
          this.policy_no.splice(indexOfObject, 1);
        }
      } else if (this.filter.value == "Batch_ID") {
        this.policy_no = [];
        this.expiryDates = {};
        if (event == true) {
          this.BatchId = data;
        } else {
          this.BatchId = {};
        }
      } else {
        this.policy_no = [];
        this.BatchId = {};
        if (event == true) {
          this.expiryDates = data;
        } else {
          this.expiryDates = {};
        }
      }
      console.log(this.policy_no, "rupali");
      console.log(this.BatchId, "ufghjd");
      console.log(this.expiryDates, "ertyu");
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    nextPage(e) {
      console.log(this.pageStartIndex,this.pageRowCount,this.totalListCount,"pagination data")
      let skipdata = e - 1;
      if (skipdata === 0) {
        this.skip = 0;
        this.pageStartIndex = 1;
      } else {
        this.skip = this.pageRowCount * skipdata;
        this.pageStartIndex = this.pageRowCount + 1;
      }
      this.getTableData("15", this.skip);
    },
    searchData() {
      let self = this;
      self.getTableData("15", 0);
    },
    onFilePicked(event) {
      let self = this;
      self.selectFileData = event.target.files;
      console.log(self.selectFileData, "file");
      if (
        self.selectFileData[0].type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        event.target.files[0].type == "text/csv"
      ) {
        if (Object.keys(self.selectFileData).length !== 0) {
          self.showToast("File Added Successfully", self.TOST().SUCCESS);
          console.log(self.selectFileData[0].name, "file data");
        }
      } else {
        self.showToast("Excel and CSV file allowed", self.TOST().WARNING);
      }
    },
    getToken() {
      let self = this;
      axios
        .post(oAuthURl,
          `grant_type=${tokenCred.grantType}&client_id=${tokenCred.clientId}&client_secret=${tokenCred.clientSecret}`
        )
        .then((res) => {
          if (res.status == 200) {
            tokenDataObj = res.data;
            this.getLOBData();
            self.headerForDropdown(this.filter);
            setTimeout(() => {
              this.getTableData("15", 0);
            }, 3000);
          }
        })
        .catch((error) => {});
    },

    changeLobData(lob) {
      this.prodCodeArray = [];
      if (lob.NUM_IL_PRODUCT_CODE == 3188) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "pcv",
        });
        this.statusProdCode = this.prodCodeArray[0];
      } else if (lob.NUM_IL_PRODUCT_CODE == 3189) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "gcv",
        });
        this.statusProdCode = this.prodCodeArray[0];
      } else if (lob.NUM_IL_PRODUCT_CODE == 3191) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "mcv",
        });
        this.statusProdCode = this.prodCodeArray[0];
      } else {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: lob.NUM_IL_PRODUCT_NAME,
        });
        this.statusProdCode = this.prodCodeArray[0];
      }
    },
    downloadData() {
      let self = this;
      let downloadPolicies = []; // 15 records completed Records
      self.policy_no.forEach((value) => {
        downloadPolicies.push(value.POLICY_NUMBER);
      });
      // if (!self.headerCheckbox){
      //   self.showToast(
      //     "Please select atleast one BatchID/JobID to download",
      //     self.TOST().WARNING
      //   );
      // } 
     
      axios({
        method: "post",
        url: BaseURl + "/renewal-status",
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
        data: {
          policyNumber: downloadPolicies,
          expiryFrom: self.jobBatchStartDateFrom,
          expiryTo: self.jobBatchStartDateTo,
          policyWise: true,
          PARENT_PRODUCT_NAME: self.newLobArray[0].PARENT_PRODUCT_NAME,
          jobId: self.BatchId.JOB_ID,
        },
      })
        .then(function (response) {
          
          console.log(response.data.data, "response download api");
          var link = document.createElement("a");
          link.href = response.data.data;
          link.download = response.data.data;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);          
        })
        .catch(function (err) {
          if(err){
            self.showToast(err,self.TOST().WARNING)
          }
        }); 
    },

    getLOBData() {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let lob_list = JSON.stringify(access_list_fr.data.LOB);
      let _head = {
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
      };
      axios
        .get(
          BaseURl + `/lob-list?productcodes=${lob_list}`,
          _head
        )
        .then(function (response) {
          if (response.status == 200) {
            self.lobDataArray = response.data.data;
            self.newLobArray = self.lobDataArray;
            console.log(self.newLobArray, "newlobarray");
            return true;
          } else {
            return response;
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    submitStatusData() {
      let self = this;
      console.log(self.statusLOB.NUM_IL_PRODUCT_CODE, "status lob");
      // if (this.$refs.formData.validate()) {
      axios({
        method: "post",
        url: BaseURl +`/re-batchCreation/${self.statusLOB.PARENT_PRODUCT_NAME}`,
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
        data: {
          productCode: self.statusLOB.NUM_IL_PRODUCT_CODE,
          batchId: self.statusBatchID,
          policyNumber: self.policyNo,
          // policies: self.selectFileData[0].name,
        },
      })
        .then(function (response) {
          console.log("POST RESPONSE:::", response);
          if (response.data.message == "success") {
            self.clearalldata();
            self.showToast("Successfully Submitted", self.TOST().SUCCESS);
            self.getTableData("15", 0);
          }
        })
        .catch(function (error) {
          console.log(error, "error");
          if (error) {
            self.showToast("Enter Valid Data", self.TOST().ERROR);
          }
        });
      // }
    },

    clearalldata() {
      this.$refs.formData.reset();
    },
    getTableData(limitvalue, skip) {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let access_list = access_list_fr.data;
      let role = access_list.ROLE;
      let lob = self.newLobArray[0].PARENT_PRODUCT_NAME;
      let parent_product_name;
      if (role == "admin" || role == "user") {
        parent_product_name = lob;
      } else if (role == "super-admin") {
        parent_product_name = "";
      }
      axios({
        method: "post",
        url: BaseURl + `/getBatchwiseorpolicywiseDetails`,
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
        data: {
          searchField: self.filter.value, 
          searchFlag: self.searchText,
          limit: limitvalue,
          offSet: skip,
          moduleName: "batchStatus",
          parentProductName: parent_product_name,
          expiryFrom: self.jobBatchStartDateFrom,
          expiryTo: self.jobBatchStartDateTo,
        },
      })
        .then(function (response) {
          self.Tabledata = [];
          let _respData = response.data.data.data;
          // console.log(_respData,"response",self.Tabledata)
          for (let i = 0; i < _respData.length; i++) {
            // if (_respData[i].LOB_NAME || _respData[i].PRODUCT_NAME) {
            let _finalData = {
              NEWARR: _respData[i],
              ERROR_COUNT: _respData[i].ERROR_COUNT,
              JOB_ID: _respData[i].JOB_ID,
              POLICY_NUMBER: _respData[i].POLICY_NUMBER,
              JOB_START_DATE: _respData[i].JOB_START_DATE,
              JOB_START_TIME: _respData[i].JOB_START_TIME,
              EXECUTION_END_TIME: _respData[i].EXECUTION_END_TIME,
              JOB_STATUS: _respData[i].JOB_STATUS,
              LOB_NAME: _respData[i].LOB_NAME,
              PRODUCT_NAME: _respData[i].PRODUCT_NAME,
              POLICY_COUNT: _respData[i].POLICY_COUNT,
              PRODUCT_CODE: _respData[i].PRODUCT_CODE,
              REMARKS: _respData[i].REMARKS,
              RENEWAL_EXPIRY_DATE_FROM: _respData[i].RENEWAL_EXPIRY_DATE_FROM,
              RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
              STAGE: _respData[i].STAGE,
              STATUS: _respData[i].STATUS,
              RN_STATUS: _respData[i].RN_STATUS,
              showDownloadIcon: false,
              hidePrevIcon: true,
              TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
            };
            self.Tabledata.push(_finalData);
            self.TabledataForCheckbox.push(_finalData);
            // }
          }
          self.totalListCount = response.data.data.Count;
          self.pageStartIndex = skip + 1;
          lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
            ? response.data.data.LastEvaluatedKey.JOB_ID
            : "";
          console.log(self.totalListCount,self.pageStartIndex,lastjobid,computedArray)
        })
        .catch(function (error) {});
    },
  },
};
</script>
<style>
.paginationStyle {
  opacity: 1;
  padding: 2px;
  font-size: 12px;
}

.margincls {
  margin-top: 13px;
}

.navpagenumber .v-pagination__navigation {
  box-shadow: unset !important;
  border-radius: unset !important;
  background-color: #ffffff !important;
  border: 1px solid #dae1e6 !important;
  height: 29px !important;
  width: 29px !important;
}

.navpagenumber .v-pagination__item {
  box-shadow: unset !important;
  min-width: 29px !important;
  height: 29px !important;
  border-radius: unset !important;
  border: 1px solid #dae1e6 !important;
  font-size: 13px !important;
  background-color: #07458e !important;
}

.dropbtn {
  height: 31px;
  border-radius: 4px;
  background-color: #2a811b;
  color: white;
  text-transform: capitalize;
  font-size: 13px;
  top: 4px;
}
.submitBtn {
  height: 31px;
  border-radius: 4px;
  background-color: #0f0f96;
  color: white;
  text-transform: capitalize;
  font-size: 13px;
  top: 4px;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme--light.v-table thead th {
  color: #fff;
  background-color: #01afcb;
}

.export-icon {
  height: 15px;
  width: 15px;
}

.searchbox-text-desgn {
  color: #666767;
  opacity: 1;
  font-family: robotoregular;
  font-size: 14px;
  padding: 13px;
}

.cust-dropdwn-hgt.v-text-field.v-text-field--solo .v-input__control {
  min-height: 40px;
}

.cust_pr .v-text-field .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: 38px !important;
  display: flex !important;
  align-items: center !important;
}

.cust-rmvpd-pr
  .v-text-field.v-text-field--enclosed
  > .v-input__control
  > .v-input__slot {
  padding: 0px !important;
}

.cust_pr .v-input {
  font-size: 13px !important;
}

.cust_pr .v-input input {
  font-size: 13px !important;
}

.cust_pr .v-input .v-label {
  font-size: 13px !important;
}

.cardwhitebackclr {
  background-color: #ffffff;
}
.reconRle-di .v-text-field.v-text-field--solo .v-input__control {
  min-height: 38px;
}
input[type="file"] {
  display: none;
}
.main_dropdown .v-text-field.v-text-field--solo .v-input__control {
  min-height: 30px !important;
  max-height: 5px;
  border-radius: 5px;
}
</style>
