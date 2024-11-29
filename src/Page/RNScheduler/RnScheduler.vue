<template>
  <v-app style="background-color: #e8eeef">
    <!-- <v-form ref="formData" v-model="formnew"> -->
    <div style="margin-left: 35px" class="mt-4">
      <!-- <v-text class="body-2 font-weight-bold" style="color:#646666">RN Scheduler</v-text> -->
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Collection and Processing</v-text
      >
    </div>
    <v-card
      class="ma-3"
      style="height: 315px"
      v-if="accessPermission.edit === true ? true : false"
    >
      <v-layout class="cardwhitebackclr pa-3" align-center>
        <!-- <v-divider  class="mr-3" vertical ></v-divider> -->

        <!-- <div class="mr-2 pl-3 pr-3 pt-1 pb-1" style="background-color:#152F38;display:flex;flex-direction:row;align-items:center;border-radius:20px">
                    <v-icon small dark>add</v-icon>
                    <div class="ml-1 mr-1">
                        <v-text class="caption" style="color:#fff">Create New Schedule</v-text>
                    </div>
                </div> -->
      </v-layout>

      <!-- <v-divider class=""></v-divider> -->

      <!-- <div class="pa-2 pl-4" style="background-color:#07458E">
                <v-text class="button font-weight-medium" style="color:#fff">Create Schedule for Renewal Notice</v-text>
            </div> -->
      <v-form ref="formData">
        <v-layout class="pl-3" xs12 row wrap>
          <v-flex xs12>
            <v-layout class="cust_pr">
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption cardTextColor">
                  Line of Business *
                </p>
                <v-select
                  id="lineOfBusiness"
                  solo
                  label="Select"
                  v-model="lineOfBusiness"
                  :items="newLobArray"
                  item-text="NUM_IL_PRODUCT_NAME"
                  item-value="NUM_IL_PRODUCT_CODE"
                  return-object
                  :rules="textRule"
                  @change="changeLobData(lineOfBusiness)"
                ></v-select>
              </v-flex>
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption cardTextColor">
                  Product Code *
                </p>
                <v-select
                  :items="prodCodeArray"
                  solo
                  disabled
                  label="Select"
                  item-text="text"
                  item-value="value"
                  return-object
                  v-model="productCode"
                ></v-select>
              </v-flex>

              <v-flex xs3 class="mr-3">
                <v-layout column class="cust-rmvpd-pr">
                  <p class="font-weight-bold mb-1 caption cardTextColor">
                    Expiry Period From <span>*</span>
                  </p>
                  <v-menu
                    :disabled="lineOfBusiness == ''"
                    ref="calender"
                    v-model="expiryPeriodFromMenu"
                    :close-on-content-click="false"
                    offset-y
                    :nudge-right="40"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                    class="rounded-0"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        slot="activator"
                        label="MM/DD/YYYY"
                        :value="computedExpiryPeriodFrom"
                        solo
                        class="rounded-0"
                        readonly
                        maxlength="10"
                        v-bind="attrs"
                        :rules="!medicare ? textRule : []"
                        v-on="on"
                      >
                        <div slot="prepend-inner" class="dateIcon">
                          <img
                            class="pa-1"
                            style="height: 35px"
                            src="../../assets/date_24X24.png"
                          />
                        </div>
                      </v-text-field>
                    </template>
                    <v-date-picker
                      @input="expiryPeriodFromMenu = false"
                      @change="checkExpiryDate"
                      v-model="expiryPeriodFrom"
                      no-title
                    ></v-date-picker>
                  </v-menu>
                </v-layout>
              </v-flex>

              <v-flex xs3 class="mr-3">
                <v-layout column class="cust-rmvpd-pr">
                  <p class="font-weight-bold mb-1 caption cardTextColor">
                    Expiry Period To <span>*</span>
                  </p>
                  <v-menu
                    ref="calender"
                    :close-on-content-click="false"
                    v-model="expiryPeriodToMenu"
                    :nudge-right="40"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                    class="rounded-0"
                    :disabled="lineOfBusiness == ''"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        slot="activator"
                        label="MM/DD/YYYY"
                        :value="computedExpiryPeriodTo"
                        solo
                        class="rounded-0"
                        readonly
                        maxlength="10"
                        :rules="!medicare ? textRule : []"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <div slot="prepend-inner" class="dateIcon">
                          <img
                            class="pa-1"
                            style="height: 35px"
                            src="../../assets/date_24X24.png"
                          />
                        </div>
                      </v-text-field>
                    </template>
                    <v-date-picker
                      @input="expiryPeriodToMenu = false"
                      @change="checkExpiryDate"
                      v-model="expiryPeriodTo"
                      no-title
                    ></v-date-picker>
                  </v-menu>
                </v-layout>
              </v-flex>
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption cardTextColor">
                  Job Scheduler *
                </p>
                <v-select
                  solo
                  label="Select"
                  v-model="jobScheduler"
                  :items="jobSchedArray"
                  item-text="text"
                  item-value="text"
                  :rules="textRule"
                  @change="changeJobSchedData(jobScheduler)"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout class="pl-3 pb-4 jobScheduler1" xs12 row wrap>
          <!-- <v-flex xs12> -->
          <div style="display: flex">
            <v-layout class="cust_pr" id="jobStartDateId" row wrap>
              <!-- <v-flex xs3 class="mr-3" v-if="lobList=='5507'">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Job Scheduler *</p>
                            <v-select 
                                solo 
                                label="Select"
                                v-model="jobScheduler"
                                :items="jobSchedArray"  
                                item-text="text"
                                item-value="text"
                                :rules="textRule"
                                @change="changeJobSchedData(jobScheduler)"
                            ></v-select>
                        </v-flex> -->
              <v-flex class="mr-3">
                <v-layout
                  column
                  xs2
                  class="cust-rmvpd-pr"
                  style="width: 244px"
                  v-if="showFields == false"
                >
                  <p class="font-weight-bold mb-1 caption cardTextColor">
                    Job Start Date *
                  </p>
                  <v-menu
                    ref="calender"
                    :close-on-content-click="false"
                    v-model="jobStartDateMenu"
                    :nudge-right="40"
                    transition="scale-transition"
                    :disabled="showShedulerDateTime"
                    max-width="290px"
                    min-width="290px"
                    class="rounded-0"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        slot="activator"
                        label="MM/DD/YYYY"
                        :value="computedJobStartDate"
                        solo
                        :disabled="showShedulerDateTime"
                        class="rounded-0"
                        readonly
                        maxlength="10"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <div slot="prepend-inner" class="dateIcon">
                          <img
                            class="pa-1"
                            style="height: 35px"
                            src="../../assets/date_24X24.png"
                          /></div
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :min="todaydatevalue"
                      @input="jobStartDateMenu = false"
                      v-model="jobStartDate"
                      no-title
                    ></v-date-picker>
                  </v-menu>
                </v-layout>
              </v-flex>

              <v-flex class="mr-3" style="flex-direction: row">
                <v-layout
                  xs3
                  column
                  class="cust-rmvpd-pr"
                  id="jobStartDateId"
                  style="width: 243px"
                >
                  <p class="font-weight-bold mb-1 caption cardTextColor">
                    Job Start Time *
                  </p>
                  <input
                    class="searchbox-text-desgn"
                    :disabled="showShedulerDateTime"
                    v-model="jobStartTime"
                    placeholder="Select Start Date"
                    type="time"
                    style="height: 38px"
                    id="jobStartDateId"
                    step="2"
                  />
                </v-layout>
              </v-flex>
            </v-layout>

            <v-flex>
              <v-layout
                style="margin-left: 0px"
                column
                class="cust-rmvpd-pr cust_pr"
                id="remarkJobSchedule"
              >
                <p class="font-weight-bold mb-1 caption cardTextColor">
                  Remarks
                </p>
                <v-text-field
                  style="width: 243px; height: 10px"
                  class="rounded-0"
                  solo
                  v-model="remarkData"
                  label="Enter..."
                  id="remark"
                  maxlength="15"
                  autocomplete="off"
                >
                </v-text-field>
              </v-layout>
              <v-flex
                v-layout
                xs3
                class="mr-1"
                style="margin-left: 260px; margin-top: -27px; width: 200px"
                v-if="lobList == '5507'"
              >
                <v-checkbox
                  v-model="checkbox"
                  label="Manual QC"
                  @change="manualQC"
                ></v-checkbox>
              </v-flex>
            </v-flex>
          </div>
          <v-flex xs6 class="mr-3" v-if="!this.medicare"> </v-flex>
          <v-flex xs3 class="mr-3" v-if="this.medicare"> </v-flex>
          <!-- </v-flex> -->
        </v-layout>
      </v-form>

      <!-- <v-divider class=""></v-divider> -->

      <v-layout
        class="pa-2"
        style="position: relative; bottom: 40px; float: right"
      >
        <!-- <v-btn class="ma-2" color="#152F38" dark small>
                    <v-icon small dark left >cancel</v-icon>
                    Close
                </v-btn> -->
        <v-btn
          flat
          style="
            width: 80px;
            height: 35px;
            background-color: #ffffff;
            border: 1.5px solid #ccc;
            border-radius: 3px;
            color: #646666;
          "
          class="ma-1 pa-3 cardTextColor"
          @click="clearalldata()"
          dark
          small
        >
          <!-- <v-icon small dark left >delete</v-icon> -->
          Clear
        </v-btn>
        <v-btn
          flat
          style="
            width: 80px;
            height: 35px;
            background-color: #0073bb;
            color: #ffffff;
            border: 1.5px solid #ccc;
            border-radius: 4px;
          "
          @click="submitDataActualdata()"
          class="ma-1 pa-3"
          dark
          small
        >
          <!-- <v-icon small dark left>check_circle</v-icon> -->
          Submit
        </v-btn>
      </v-layout>
    </v-card>
    <!-- </v-form> -->
    <v-card
      class="ma-3 pa-4"
      v-if="
        accessPermission.view === true
          ? true
          : false || accessPermission.edit === true
          ? true
          : false
      "
    >
      <v-text-field
        v-model="searchText"
        append-icon="search"
        label="Search"
        single-line
        class="mb-4"
        style="width: 20%"
        hide-details
        @input="getdata('15', 0, true)"
      ></v-text-field>
      <v-btn
        v-if="isLogAvailable"
        @click="generateLogs()"
        style="
          float: right;
          background-color: #29c83f;
          top: 0;
          color: #fff;
          border-radius: 7px;
          margin-bottom: 10px;
          text-transform: capitalize;
        "
      >
        Generate Logs
      </v-btn>
      <v-btn
        @click="searchData()"
        style="
          float: right;
          background-color: #1e83c2;
          top: 0;
          color: #fff;
          border-radius: 7px;
          margin-bottom: 10px;
          text-transform: capitalize;
        "
      >
        Refresh
      </v-btn>

      <div>
        <v-data-table
          no-data-text="No data available"
          :headers="headers"
          :items="Tabledata"
          show-select
          v-bind:pagination.sync="pagination"
          hide-actions
          class="elevation-1"
          select-all
        >
          <template slot="headers" slot-scope="props">
            <tr>
              <th style="background: rgb(1, 175, 203)" v-if="isLogAvailable">
                <v-checkbox
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                  v-model="headerCheckbox"
                  primary
                  hide-details
                  @change="toggleAll($event, Tabledata)"
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
            <td style="background-color: #eff3f4" v-if="isLogAvailable">
              <v-checkbox
                v-model="props.item.selected"
                @change="tableCheckbox($event, props.item)"
                primary
                hide-details
              >
              </v-checkbox>
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.JOB_ID }}
            </td>
            <td style="background-color: #eff3f4; padding: 0px">
              {{ props.item.LOB_NAME }}
            </td>
            <td
              class="text-xs-left"
              style="background-color: #eff3f4; padding-left: 35px"
            >
              {{ props.item.RENEWAL_EXPIRY_DATE_FROM }}
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.RENEWAL_EXPIRY_DATE_TO }}
            </td>
            <td
              class="text-xs-left"
              style="background-color: #eff3f4; padding-left: 8px"
            >
              {{ props.item.JOB_START_DATE }} {{ props.item.JOB_START_TIME }}
            </td>
            <td
              class="text-xs-left truncate"
              style="
                background-color: #eff3f4;
                display: flex;
                align-items: center;
                height: 55px;
              "
            >
              {{ props.item.REMARKS }}
              <v-tooltip left class="ml-2" style="display: flex">
                <v-icon slot="activator" small style="margin-left: 10px"
                  >info</v-icon
                ><span>{{ props.item.REMARKS }}</span>
              </v-tooltip>
            </td>
            <td
              class="text-xs-left"
              style="background-color: #eff3f4; padding: 6px"
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
            <!-- <td v-if="props.item.STATUS === 'Submitted'" class="text-xs-left" style="background-color:#EFF3F4">-</td> -->
            <td class="text-xs-center" style="background-color: #eff3f4">
              {{ props.item.ERROR_COUNT }}
            </td>
            <td class="text-xs-center" style="background-color: #eff3f4">
              {{ props.item.POLICY_COUNT }}
            </td>
            <td
              v-if="props.item.hidePrevIcon == true"
              @click="actionProcess == true"
              class="text-xs-left"
              style="
                background-color: #eff3f4;
                display: flex;
                align-items: center;
              "
            >
              <div v-if="props.item.STATUS == 'Success' && props.item.POLICY_COUNT !=0">
                <div
                  v-if="props.item.hidePrevIcon == true"
                  class="ml-3"
                  style="display: flex; cursor: pointer"
                >
                  <button
                    id="demo"
                    class="export-icon mr-5"
                    @click="
                      addNewIcon(
                        props.item,
                        props.item.COLLECTION_PROCESSING_FILE_URL,
                        props.item.BatchID
                      )
                    "
                    v-if="actionProcess == true"
                  >
                    GENERATE
                  </button>
                  <img
                    @click="
                      addNewIcon(
                        props.item,
                        props.item.COLLECTION_PROCESSING_FILE_URL,
                        props.item.BatchID
                      )
                    "
                    class="export-icon ml-2"
                    src="../../assets/downloadicon.png"
                  />
                </div>
              </div>

              <div v-else style="display: flex">
                _
                <v-tooltip left class="ml-2">
                  <v-icon slot="activator" small>info</v-icon
                  ><span>Only Success cases can be downloaded!</span>
                </v-tooltip>
              </div>
            </td>
            <td
              class="text-xs-center"
              style="
                background-color: #eff3f4;
                display: flex;
                align-items: center;
              "
              v-if="props.item.showDownloadIcon == true"
            >
              {{
                props.item.COLLECTION_PROCESSING_FILE_URL
                  ? "DOWNLOAD"
                  : "INPROGRESS"
              }}
              <div
                class="ml-3"
                style="color: black; display: flex; cursor: pointer"
                v-if="props.item.showDownloadIcon == true"
              >
                <img
                  v-if="props.item.COLLECTION_PROCESSING_FILE_URL"
                  @click="
                    downloadData(props.item.COLLECTION_PROCESSING_FILE_URL)
                  "
                  class="export-icon-down"
                  src="../../assets/downloadicon.png"
                  style="height: 16px"
                />
                <!-- <img  @click="JSONToCSVConvertor(props.item.CSV_DATA,props.item.JOB_ID+'_'+props.item.LOB_NAME,true,props.item.JOB_ID)" class="export-icon ml-2" src="web/assets/Path93052x.png"> -->
              </div>
              <!-- {{item.Actions}} -->
            </td>
            <!--end here -->

            <!-- <td v-if="props.item.hidePrevIcon == true" class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center">EXPORT
                            <div v-if="props.item.hidePrevIcon == true" class="ml-3" style="display:flex;cursor:pointer">
                                <img @click="addNewIcon(props.item,props.item.FILE_URL)" class="export-icon" src="../../assets/downloadicon.png"> -->
            <!-- <v-icon v-if="setDownload == true" @click="JSONToCSVConvertor(props.item.CSV_DATA,props.item.JOB_ID+'_'+props.item.LOB_NAME,true,props.item.JOB_ID)" class="export-icon ml-2">arrow-down-circle</v-icon> -->
            <!-- <v-icon @click="addNewIcon(props.item.JOB_ID,props.item.LOB_NAME )" v-if="setDownload == true" @click="downloadClicked" slot="activator" ../../assets/arrow.png small>download</v-icon> -->
            <!-- </div>
                        </td> -->
            <!-- <td class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center" v-if="props.item.showDownloadIcon == true">DOWNLOAD    
                            <div v-if="props.item.showDownloadIcon == true" class="ml-3" style="color:black;display:flex;cursor:pointer">
                                <img @click="downloadData(props.item.JOB_ID,props.item.LOB_NAME,props.item.FILE_URL)" class="export-icon-down" src="../../assets/downloadicon.png"> -->
            <!-- <img  @click="JSONToCSVConvertor(props.item.CSV_DATA,props.item.JOB_ID+'_'+props.item.LOB_NAME,true,props.item.JOB_ID)" class="export-icon ml-2" src="web/assets/Path93052x.png"> -->
            <!-- </div> -->
            <!-- {{item.Actions}} -->
            <!-- </td> -->
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>

        <!-- <div class="text-xs-center pt-2">
                    <v-pagination v-model="pageNumber" color="#152F38" flat :length="pagelength" @input="nextPage($event)"></v-pagination>
                </div> -->
        <v-container fluid class="my-3 paginationStyle">
          <v-layout justify-end>
            <div class="margincls mt-3 mr-3">
              <span>
                Showing <b>{{ pageStartIndex }}</b> -
                <b>{{ pageEndIndex }}</b></span
              >
              <span>
                out of <b>{{ totalCount }}</b> records
              </span>
            </div>
            <v-pagination
              class="mr-4 mt-1 navpagenumber"
              v-model="pageNumber"
              color="#152F38"
              :length="getNoOfPages"
              :total-visible="5"
              @input="nextPage($event)"
            >
            </v-pagination>
          </v-layout>
        </v-container>
      </div>
      <template>
        <div class="text-xs-center txt-loader" v-if="dataLoader">
          <v-progress-circular :size="100" color="white" indeterminate
            >Loading...</v-progress-circular
          >
        </div>
      </template>
    </v-card>
    <!-- <Notification :notification-data="notifications"></Notification> -->
  </v-app>
</template>
<script>
import axios from "axios";
import xlsx from "json-as-xlsx";
import moment from "moment";
import { BaseURl, oAuthURl, tokenCred } from "../../common/API_Config.js";
import {
  userPermissionValidator,
  usernameFromLocalStorage,
} from "../RenewalNotice/validator/permissionValidator";
import { apiService } from "../RenewalNotice/common/common";
let tokenDataObj = null;
let lastjobid = "";
// import Notification from '../../component/Header-SalesAdmin.vue';

export default {
  data() {
    return {
      dataLoader: false,
      headerCheckbox: false,
      checkbox: false,
      showFields: false,
      accessPermission: {},
      jobSchdleNowLater: "Now",
      actionProcess: true,
      medicare: false,
      searchText: "",
      RangeArray: [
        { name: "Date Range", value: "dateRange" },
        { name: "Policy No", value: "policyNo" },
      ],
      filterType: "",
      policyNo: null,
      disableFilter: false,
      // statusItemsPerPage: 10,
      formnew: false,
      textRule: [(v) => !!v || "This Field is required"],
      jobSchedArray: [
        { text: "Now", value: true },
        { text: "Later", value: false },
      ],
      jobScheduler: "",
      showShedulerDateTime: false,
      jobStartTimeNowMenu: false,
      skipdiffrence: this.paginationdiff(),
      skip: 0,
      pageNumber: 1,
      pagelength: 1,
      tokenData: {},
      lobDataArray: [],
      newLobArray: [],
      page: 1,
      pageStartIndex: 1,
      pageRowCount: 15,
      // totalCount: 0,
      totalCount:0,
      IsFilter: false,
      prodCodeArray: [],
      expiryPeriodFrom: "",
      expiryPeriodTo: "",
      parentProductName: "",
      remarkData: "",
      jobStartDate: "",
      jobStartTime: "",
      productCode: "",
      lineOfBusiness: "",
      expiryPeriodToMenu: false,
      expiryPeriodFromMenu: false,
      jobStartDateMenu: false,
      headers: [
        {
          text: "Batch ID",
          // align: 'start',
          sortable: true,
          value: "JOB_ID",
        },
        { text: "LOB", value: "LOB_NAME" },
        { text: "Policy Exp. From", value: "Policy Exp. From", sortable: true },
        { text: "Policy Exp. To", value: "Policy Exp. To", sortable: true },
        {
          text: "Job Sched Date/Time",
          sortable: true,
          value: "JOB_START_DATE",
        },
        { text: "Remarks", value: "REMARKS" },
        { text: "Status", value: "STATUS" },
        { text: "Error Count", value: "ERROR_COUNT" },
        { text: "Policy Count", value: "POLICY_COUNT" },
        { text: "Actions", sortable: false, value: "Actions" },
      ],

      search: "",
      pagination: {
        rowsPerPage: 15,
      },
      selected: [],
      Tabledata: [],
      TabledataForCheckbox: [],
      selectedSinglePolicy: [],
      jobStartDateNow: "",
      jobStartTimeNow: "",
      todaydatevalue: "",
      notificationData: [],
      searchFlag: false,
      lobList: "",
      isLogAvailable: false,
    };
  },

  created() {
    this.$store.commit("SET_PAGE_TITLE", "Collection and Processing");
    // this.User_id = this.$store.state.agentDetails.userId;
    this.getToken();
    // this.JSONToCSVConvertor(this.csvData,'sampleCSV',true,'MCV')
    this.todaydatevalue = moment().format("YYYY-MM-DD");

    // user permission validate
    this.accessPermission = userPermissionValidator("FR2");
    this.checkGenerateDateHandler();
  },

  methods: {
    manualQC() {
      let access_list_fr = JSON.parse(localStorage.loginResp);
      this.lobList = access_list_fr.data.LOB;
    },
    dateRule(v) {
      if (this.range && this.range == "dateRange") {
        if (!!v) {
          return "This field is required";
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    checkGenerateDateHandler() {
      let userData = JSON.parse(localStorage.loginResp);
      console.log(userData.data.PARENT_PRODUCT_NAME, "s");
      if(userData.data.isGenerateLog){
        this.isLogAvailable = true;
      }else{
        this.isLogAvailable = false;
      }
      // if (userData.data.ROLE == "super-admin") {
      //   this.isLogAvailable = true;
      // } else if (
      //   userData.data.ROLE == "admin" && userData.data.PARENT_PRODUCT_NAME == "MARINE" 
      //    ) {
      //   this.isLogAvailable = true;
      // } else {
      //   this.isLogAvailable = false;
      // }
      // }
      const username = userData.data.USER_NAME;
      apiService("get", `/fetch/user?userName=${username}`, {})
        .then((res) => {
          if (res.status == 200) {
            const { data } = res.data;
            this.noOfBackDays = data.noOfBackDays;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tableCheckbox(event, item) {
      let currentData = item;
      let policy_data = JSON.parse(JSON.stringify(item));
      if (event == true) {
        this.selectedSinglePolicy.push(policy_data);
      } else {
        const indexOfObject = this.selectedSinglePolicy.findIndex((res) => {
          return res.JOB_ID === currentData.JOB_ID;
        });
        this.selectedSinglePolicy.splice(indexOfObject, 1);
        // this.selectedSinglePolicy = data;
        console.log("data", this.selectedSinglePolicy, this.headerCheckbox);
      }
    },

    clickAll(event, table) {
      if (this.headerCheckbox) {
        for (var i = 0; i < table.length; i++) {
          this.Tabledata[i].selected = true;
        }
      } else {
        for (var i = 0; i < table.length; i++) {
          this.Tabledata[i].selected = false;
        }
      }
      if (event == true) {
        for (var i = 0; i < this.Tabledata.length; i++) {
          this.selectedSinglePolicy.push(this.Tabledata[i]);
        }
        console.log(
          this.selectedSinglePolicy,
          "this.selectedSinglePolicy if",
          table
        );
      } else {
        this.selectedSinglePolicy = [];
        console.log(
          this.selectedSinglePolicy,
          "this.selectedSinglePolicy else",
          table
        );
      }
    },
    toggleAll(event, table) {
      this.clickAll(this.headerCheckbox, table, "toggleall values");
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    generateLogs() {
      let self = this;
      self.dataLoader = true;
      let batchID = self.selectedSinglePolicy.map((res) => res.JOB_ID);
      console.log(batchID.length >= 1, "batch id");
      if (batchID.length >= 1) {
        apiService("post", `batch-creation/logs`, { batchID })
          .then((res) => {
            if (res.status == 200) {
              const { data } = res.data;
              console.log(data, "da");
              this.downloadFileFromUrl(data);
              self.dataLoader = false;
            }
          })
          .catch((err) => {
            console.log(err);
            self.showToast(
              "Something went wrong please try again.",
              self.TOST().WARNING
            );
            self.dataLoader = false;
          });
      } else {
        self.showToast("Please Select at least 1 Batch", self.TOST().WARNING);
        self.dataLoader = false;
      }
    },
    downloadFileFromUrl(url) {
      console.log(url);
      var link = document.createElement("a");
      link.href = url;
      link.style = "visibility:hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    searchData() {
      let self = this;
      this.dataLoader = true;
      setTimeout(() => {
        this.dataLoader = false;
        self.getdata("15", this.skip, (this.searchFlag = false));
      }, 3000);
    },
    // ExpiryDate(){
    //     if(document.querySelector("v-text-field").value == ''){
    //         // disabled= true;
    //        document.getElementById('expFromTo').disabled = true;
    //     }
    //     else{
    //         // disabled=false
    //         document.getElementById("expFromTo").disabled = false;
    //     }
    // },
    changeJobSchedData(ev) {
      // let self = this
      // ev ? this.showShedulerDateTime = true : this.showShedulerDateTime = false
      if (ev == "Later") {
        this.showShedulerDateTime = false;
        // let currentDate = new Date()
        // this.jobStartDate = moment(currentDate).format("YYYY-MM-DD");
        // this.jobStartTime = new Date().toLocaleTimeString();
        document.getElementById("jobStartDateId").style.display = "";
        document.getElementById("remarkInput").style.marginTop = "25px";
      } else {
        this.showShedulerDateTime = true;
        // self.jobStartTimeNow = ''
        this.jobStartDate = "";
        document.getElementById("jobStartDateId").style.display = "none";
      }
    },

    changeLobData(lob) {
      let self = this;
      this.prodCodeArray = [];
      if (lob.NUM_IL_PRODUCT_CODE == 3188) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "pcv",
        });
        this.productCode = this.prodCodeArray[0];
        this.medicare = false;
      } else if (lob.NUM_IL_PRODUCT_CODE == 3189) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "gcv",
        });
        this.productCode = this.prodCodeArray[0];
        this.medicare = false;
      } else if (lob.NUM_IL_PRODUCT_CODE == 3191) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "mcv",
        });
        this.productCode = this.prodCodeArray[0];
        this.medicare = false;
      } else {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: lob.NUM_IL_PRODUCT_NAME,
        });
        this.productCode = this.prodCodeArray[0];
        this.medicare = true;
      }
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
        .get(BaseURl + `/lob-list?productcodes=${lob_list}`, _head)
        .then(function (response) {
          if (response.status == 200) {
            self.lobDataArray = response.data.data;
            self.newLobArray = self.lobDataArray;
            return true;
          } else {
            return response;
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    actionMethod() {
      document.getElementById("demo").innerHTML = "INPROGRESS";
    },
    addNewIcon(item, url, batchId) {
      let self = this;
      // this.actionMethod();

      // setTimeout(this.actionMethod(), 500);

      self.showToast(
        "Your report is being ready. Please wait for some time",
        self.TOST().SUCCESS
      );
      if (true) {
        self.Tabledata.map((el) => {
          el.JOB_ID === item.JOB_ID ? (el.showDownloadIcon = true) : "";
        });
        self.Tabledata.map((el) => {
          el.JOB_ID === item.JOB_ID ? (el.hidePrevIcon = false) : "";
        });
        self.Tabledata.map((el) => {
          el.JOB_ID === item.JOB_ID
            ? (el.COLLECTION_PROCESSING_FILE_URL = url)
            : "";
        });
      }
      // axios({
      //   method: "get",
      //   url: BaseURl + "/batch-status/" + item.JOB_ID,
      //   headers: {
      //     Authorization:
      //       tokenDataObj.token_type + " " + tokenDataObj.access_token,
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then(function (response) {
      //     console.log(response.data.data.data.Location,"location")
      //     if (response.status === 200) {
      //       setTimeout(() => {
      //         if (response.data.data) {
      //           self.Tabledata.map((el) => {
      //             el.JOB_ID === item.JOB_ID ? (el.showDownloadIcon = true) : "";
      //           });
      //           self.Tabledata.map((el) => {
      //             el.JOB_ID === item.JOB_ID ? (el.hidePrevIcon = false) : "";
      //           });
      //           self.Tabledata.map((el) => {
      //             el.JOB_ID === item.JOB_ID
      //               ? (el.COLLECTION_PROCESSING_FILE_URL = response.data.data.data.Location)
      //               : "";
      //           });
      //         } else {
      //           self.showToast(
      //             "Your report is not generated",
      //             self.TOST().ERROR
      //           );
      //         }
      //       }, 1000);
      // }
      // })
      // .catch(function (error) {
      //   if (error) {
      //     // clearInterval(clearIntervalTime);
      //     self.showToast(
      //       "Something went wrong, Please try again",
      //       self.TOST().ERROR
      //     );
      //   }
      // });
    },

    downloadData(url) {
      console.log(url);
      var link = document.createElement("a");
      link.href = url;
      link.style = "visibility:hidden";
      // link.download = batchId + "_" + lobName + ".xlsx";
      // link.setAttribute('download', 'file.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    nextPage(e) {
      let skipdata = e - 1;
      if (skipdata === 0) {
        this.skip = 0;
        this.pageStartIndex = 1;
      } else {
        this.skip = this.pageRowCount * skipdata;
        this.pageStartIndex = this.pageRowCount + 1;
      }
      this.getdata("15", this.skip, (this.searchFlag = false));
    },

    clearalldata() {
      this.$refs.formData.reset();
      let self = this;
      self.expiryPeriodFrom = "";
      self.expiryPeriodTo = "";
      self.jobStartDate = "";
      self.jobStartTime = "";
      self.remarkData = "";
      self.lineOfBusiness = "";
      self.productCode = "";
      self.jobScheduler = "";
    },
    getdata(limitvalue, skip, searchFlag = false) {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let access_list = access_list_fr.data;
      let role = access_list.ROLE;
      let lob = self.newLobArray[0].PARENT_PRODUCT_NAME;
      let parent_product_name;
      this.selectedSinglePolicy = [];
      if (role == "admin" || role == "user") {
        parent_product_name = lob;
      } else if (role == "super-admin") {
        parent_product_name = "";
      }
      console.log("rupali")
      const search =
        self.searchText && self.searchText.length > 2
          ? { batchid_or_policyno: self.searchText, searchFlag: true }
          : {};
      searchFlag = self.searchText == "" ? false : true;
      axios({
        method: "post",
        url: BaseURl + "/job-paginator",
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
        data: {
          limit: limitvalue,
          offset: skip,
          moduleName: "collectionAndProcessing",
          parentProductName: parent_product_name,
          ...usernameFromLocalStorage,
          ...search,
        },
      })
        .then(function (response) {
          console.log(response,"response")
          let _respData = response.data.data.Items.map((e) => {
            return {
              ...e,
              showDownloadIcon: false,
              hidePrevIcon: true,
              CSV_DATA:
                e.TXT_POLICY_LIST.length == 0 || e.TXT_POLICY_LIST == ""
                  ? []
                  : e.TXT_POLICY_LIST.map(function (el) {
                      let _data = {
                        "Product name": e.LOB_NAME,
                        "Policy no": el.TXT_POLICY_NO,
                        "Previous policy start date":
                          el.DAT_PREVIOUSPOLICYSTARTDATE,
                        "Previous policy End date":
                          el.DAT_PREVIOUSPOLICYENDDATE,
                        "Customer name": el.TXT_CLIENT_NAME,
                        "Status (Success/Failed)": el.status,
                        "Reason for Error": el.hasOwnProperty("message")
                          ? el.message
                          : "",
                      };
                      return _data;
                    }),
            };
          });
          console.log("rupali shinde",response.data.data.Count,_respData)
          self.Tabledata = _respData;
          self.totalCount = response.data.data.Count;
          console.log( self.pageStartIndex, "self.totalCount",self.totalCount);
          self.pageStartIndex = skip + 1;
        })
        .catch(function (error) {
        });
    },
    getToken() {
      let self = this;
      axios
        .post(
          oAuthURl,
          `grant_type=${tokenCred.grantType}&client_id=${tokenCred.clientId}&client_secret=${tokenCred.clientSecret}`
        )
        .then((res) => {
          if (res.status == 200) {
            let access_list_fr = JSON.parse(localStorage.loginResp);
            this.lobList = access_list_fr.data.LOB;

            tokenDataObj = res.data;
            this.getLOBData();
            setTimeout(() => {
              this.getdata("15", 0);
            }, 3000);
          }
        })
        .catch((error) => {});
    },

    shortRemark(text) {
      try {
        if (text.length > 15) {
          text = text.slice(0, 15) + "...";
        }
        return text;
      } catch (err) {}
    },

    submitDataActualdata() {
      let self = this;
      if (this.$refs.formData.validate()) {
        if (
          this.medicare == true &&
          this.expiryPeriodFrom == "" &&
          this.expiryPeriodTo == ""
        ) {
          this.showToast(
            "Please Select Expiry Period From and Expiry Period To",
            this.TOST().WARNING
          );
        } else {
          let new_id = Math.round(new Date().getTime() / 1000);
          let _jobDateStart = self.jobStartDate;
          let _jobTimeStart = self.jobStartTime;
          axios({
            method: "post",
            url:
              BaseURl +
              "/job/renewalvault?producttype=" +
              self.productCode.value,
            headers: {
              Authorization:
                tokenDataObj.token_type + " " + tokenDataObj.access_token,
              "Content-Type": "application/json",
            },
            data: {
              expiry_date_from: self.expiryPeriodFrom,
              expiry_date_to: self.expiryPeriodTo,
              job_start_date: _jobDateStart,
              job_start_time: _jobTimeStart,
              remarks: self.remarkData,
              lob_name: self.lineOfBusiness.NUM_IL_PRODUCT_NAME,
              product_code: self.productCode.text,
              job_schedule_now: self.jobScheduler,
              filterType: self.filterType,
              policyNo: self.policyNo,
              parentProductName: self.lineOfBusiness.PARENT_PRODUCT_NAME,
              MANUAL_QC: self.checkbox,
              JOB_ID: new_id.toString(),
              ...usernameFromLocalStorage,
            },
          })
            .then(function (response) {
              if (response.data.status == 200) {
                // self.showLoader('Loading',false);
                self.showToast(
                  "Data for" + " " + new_id + " " + "Inserted Successfully",
                  self.TOST().SUCCESS
                );
                self.getdata("15", 0);
                self.clearalldata();
                // setTimeout(() => {
                // if(response.data.data){
                // self.getdata('15',0)
                //     }
                // },8000)
              }
            })
            .catch(function (error) {
              if (error) {
                console.log("error in rnsch", error.status);

                if (self.expiryPeriodFrom == "") {
                  self.showToast(
                    "Please select Expiry Period From Date",
                    self.TOST().ERROR
                  );
                } else if (self.expiryPeriodTo == "") {
                  self.showToast(
                    "Please select Expiry Period To Date",
                    self.TOST().ERROR
                  );
                }
                // console.log("error in rnsch",response.errors)
                self.showToast(
                  `Job has already created between... ${self.expiryPeriodFrom} to ${self.expiryPeriodTo}`,
                  self.TOST().ERROR
                  // self.errors
                );
                // self.showLoader('Loading',false);
              }
            });
        }
        // }
      } else {
        this.showToast("Please fill required fields", this.TOST().WARNING);
      }
    },

    checkExpiryDate() {
      let self = this;
      if (self.expiryPeriodFrom && self.expiryPeriodTo) {
        if (self.expiryPeriodFrom <= self.expiryPeriodTo) {
          axios({
            method: "post",
            url: BaseURl + "/check-for-expdate",
            headers: {
              Authorization:
                tokenDataObj.token_type + " " + tokenDataObj.access_token,
              "Content-Type": "application/json",
            },
            data: {
              expiryFrom: self.expiryPeriodFrom,
              expiryTo: self.expiryPeriodTo,
              parentProductName: self.lineOfBusiness.PARENT_PRODUCT_NAME,
              productCode: self.lineOfBusiness.NUM_IL_PRODUCT_CODE,
            },
          })
            .then(function (response) {
              if (response.data.status == 400) {
                self.showToast(response.data.message, self.TOST().WARNING);
                self.expiryPeriodFrom = "";
                self.expiryPeriodTo = "";
              }
            })
            .catch(function (error) {
              if (error) {
                self.showToast(error.response.data.message, self.TOST().ERROR);
                // self.showLoader('Loading',false);
                self.expiryPeriodFrom = "";
                self.expiryPeriodTo = "";
              }
            });
        } else {
          self.showToast(
            "Expiry To Date should not be less than Expiry From Date",
            self.TOST().ERROR
          );
        }
      }
    },
  },

  filter: {},

  computed: {
    computedExpiryPeriodTo() {
      return this.expiryPeriodTo
        ? moment(this.expiryPeriodTo).format("DD-MM-YYYY")
        : "";
    },
    computedExpiryPeriodFrom() {
      return this.expiryPeriodFrom
        ? moment(this.expiryPeriodFrom).format("DD-MM-YYYY")
        : "";
    },
    computedJobStartDate() {
      return this.jobStartDate
        ? moment(this.jobStartDate).format("DD-MM-YYYY")
        : "";
    },
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

    pageEndIndex() {
      if (!this.totalCount) {
        return 0;
      } else {
        return this.pageStartIndex + this.pageRowCount <= this.totalCount
          ? this.pageStartIndex + this.pageRowCount - 1
          : this.totalCount;
      }
    },
    getNoOfPages() {
      if (!this.totalCount) {
        return 0;
      } else {
        return Math.ceil(this.totalCount / this.pageRowCount);
      }
    },
  },
};
</script>
<style>
.dateIcon {
  background-color: #f7f7f7;
  /* margin-bottom: 10px; */
}
.cardTextColor {
  color: #646666;
}
.paginationStyle {
  /* background-color: #F7F7F7;  */
  /* box-shadow: 0px 2px 2px #00000051; border: 0.5px solid #C1C8CC;  */
  opacity: 1;
  padding: 2px;
  font-size: 12px;
  /* color: black; */
}
.classSuccess {
  background-color: #29c83f;
  /* width: 70px; */
  color: white;
  text-align: center;
  padding: 3px;
  position: relative;
  top: 7px;
  border-radius: 5px;
}

.classFailed {
  background-color: #fd5f57;
  color: white;
  text-align: center;
  padding: 3px;
  position: relative;
  top: 7px;
  border-radius: 5px;
}

.classProgress {
  background-color: #febc2e;
  /* width: 100px; */
  color: white;
  text-align: center;
  padding: 3px;
  position: relative;
  top: 7px;
  border-radius: 5px;
}

.classSubmitted {
  background-color: #febc2e;
  /* width: 100px; */
  color: white;
  text-align: center;
  padding: 3px;
  position: relative;
  top: 7px;
  border-radius: 5px;
}

.theme--light.v-table thead th {
  color: #fff;
  /* border-right: 1px solid #ccc; */
  background-color: #01afcb;
}

table.v-table thead tr {
  height: 36px;
}

table.v-table tbody td {
  font-weight: 400;
  font-size: 13px;
  margin: 0px;
  height: 41px;
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  border: 0.5px solid #d5d5d5;
  box-shadow: none;
}
.v-input__prepend-inner {
  margin-top: 0px;
}
/* .theme--light.v-table thead th td {
    background-color: #ccc;
} */

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v-tooltip__content {
  /* font-size: 50px !important; */
  opacity: 1 !important;
  background-color: #fff;
  color: #666767;
  /* display: block !important; */
}
.cust_pr .v-menu__activator {
  align-items: center;
  cursor: pointer;
  display: flex;
  /* width: 323px; */
}

.cust_pr .v-text-field .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: 38px !important;
  display: flex !important;
  align-items: center !important;
  /* border:1px red solid; */
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
.searchbox-text-desgn {
  /* box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); */
  color: #666767;
  border: 0.5px solid #d5d5d5;
  opacity: 1;
  font-size: 14px;
  padding: 7px;
}

.export-icon {
  height: 15px;
  width: 15px;
}

.cust-dropdwn-hgt.v-text-field.v-text-field--solo .v-input__control {
  min-height: 40px;
}

.cardwhitebackclr {
  background-color: #ffffff;
  /* justify-content: center;
    align-items: center; */
}

.reconRle-di .v-text-field.v-text-field--solo .v-input__control {
  min-height: 38px;
}
.alignClass {
  background-color: #01afcb;
}
.txt-loader {
  position: fixed !important;
  left: 50% !important;
  top: 50% !important;
  z-index: 9999;
  transform: translate(-50%, -50%) !important;
  pointer-events: none !important;
}
.v-progress-circular {
  margin: 1rem;
  box-shadow: 10px 10px 10px 1000px rgba(54, 48, 48, 0.5) !important;
  background-color: rgba(54, 48, 48, 0.5);
  width: 150px;
  overflow: hidden;
}

/* .openSansText{
    font-family: 'Open Sans', sans-serif;
    color: #333333;
} */
</style>