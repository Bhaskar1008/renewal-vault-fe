<template>
  <v-app style="background-color: #e8eeef">
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Renewal Extract Report</v-text
      >
    </div>
    <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
      <v-form ref="formData">
        <v-layout class="pl-3 pt-4" xs12 row wrap>
          <v-flex xs12>
            <v-layout class="cust_pr">
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
                  Batch ID *
                </p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="triggerBatchID"
                  label="Enter..."
                >
                </v-text-field>
              </v-flex>

              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Line of Business *
                </p>
                <v-select
                  solo
                  label="Select"
                  v-model="triggerLOB"
                  :items="newLobArray || lobDataArray"
                  item-text="NUM_IL_PRODUCT_NAME"
                  item-value="NUM_IL_PRODUCT_CODE"
                  :rules="textRule"
                  return-object
                  @change="changeLobData(triggerLOB)"
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
                  v-model="triggerProdCode"
                ></v-select>
              </v-flex>
              <!-- <v-flex xs3 class="mr-3">
                            <v-layout column class="cust-rmvpd-pr">
                                <p class="font-weight-bold mb-1 caption" style="color:#646666">Policy Expiry Period From *</p>
                                <v-menu
                                    ref="calender"
                                    :close-on-content-click="false"
                                    v-model="downldPolicyStartFromDateMenu"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    max-width="290px"
                                    min-width="290px" 
                                    class="rounded-0 ">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            slot="activator"
                                            label="Select.."
                                            :value="computedJobStartDate"
                                            solo
                                            class="rounded-0"
                                            readonly 
                                            maxlength="10"
                                            :rules="textRule"
                                            v-bind="attrs"
                                            v-on="on">
                                        <div  slot="prepend-inner" style="background-color:#F7F7F7;padding:6px;"><span class="material-icons">date_range</span></div></v-text-field>
                                    </template>
                                    <v-date-picker @input="downldPolicyStartFromDateMenu = false" v-model="downldPolicyStartFromDate" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                        </v-flex>
                         
                        <v-flex xs3 class="mr-3">
                            <v-layout column class="cust-rmvpd-pr">
                                <p class="font-weight-bold mb-1 caption" style="color:#646666">Policy Expiry Period To *</p>
                                <v-menu
                                    ref="calender"
                                    :close-on-content-click="false"
                                    v-model="downldPolicyStartToDateMenu"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    max-width="290px"
                                    min-width="290px" 
                                    class="rounded-0 ">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            slot="activator"
                                            label="Select.."
                                            :value="computedJobStartDateTo"
                                            solo
                                            class="rounded-0"
                                            readonly 
                                            maxlength="10"
                                            :rules="textRule"
                                            v-bind="attrs"
                                            v-on="on">
                                        <div  slot="prepend-inner" style="background-color:#F7F7F7;padding:6px;"><span class="material-icons">date_range</span></div></v-text-field>
                                    </template>
                                    <v-date-picker @input="downldPolicyStartToDateMenu = false" v-model="downldPolicyStartToDate" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                    </v-flex>  -->
              <!-- <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Policy No</p>
                            <v-text-field 
                                solo 
                                label="Enter..."
                                v-model="policyNo"
                                
                                return-object
                            ></v-text-field>
                        </v-flex>
                    <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Batch ID </p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                v-model="triggerBatchID" 
                                label="Enter...">
                            </v-text-field>
                        </v-flex> -->
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Report Type *
                </p>
                <v-select
                  solo
                  label="Select"
                  v-model="overview"
                  :rules="textRule"
                  :items="overviewItems"
                  return-object
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout
          class="pl-3"
          xs12
          row
          wrap
          v-if="request == 'Expiry Date From and Expiry Date To'"
        >
          <v-flex xs3 class="mr-3">
            <v-layout column class="cust_pr">
              <p class="font-weight-bold mb-1 caption" style="color: #646666">
                Expiry Date From *
              </p>
              <v-menu
                ref="calender"
                :close-on-content-click="false"
                v-model="jobBatchStartDateMenuFr"
                :nudge-right="40"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
                class="rounded-0"
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
                        bottom: 5px;
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
            <v-layout column class="cust_pr">
              <p class="font-weight-bold mb-1 caption" style="color: #646666">
                Expiry Date To *
              </p>
              <v-menu
                ref="calender"
                :close-on-content-click="false"
                v-model="jobBatchStartDateMenuTo"
                :nudge-right="40"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
                class="rounded-0"
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
                        bottom: 5px;
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
        </v-layout>

        <!-- <v-layout class="pl-3 pt-2" xs12 row wrap>
                <v-flex xs12>
                <v-layout class="cust_pr">
                    <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Batch ID *</p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                v-model="triggerBatchID" 
                                label="Enter...">
                            </v-text-field>
                        </v-flex>
                    <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Report Type</p>
                            <v-select 
                                solo 
                                label="Select"
                                v-model="overview"
                                :items="overviewItems" 
                                return-object
                            ></v-select >
                        </v-flex>
                </v-layout>    
                </v-flex>


            </v-layout> -->
      </v-form>

      <!-- <v-divider class=""></v-divider> -->
      <v-layout
        class="pa-2"
        style="position: relative; bottom: 15px; float: right"
      >
        <!-- <v-btn  class="ma-2" color="#152F38" dark small>
                    <v-icon small dark left class="mr-2">cancel</v-icon>
                    <v-divider vertical class="mr-2"></v-divider>
                    Close
                </v-btn> -->
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
          @click="clearTriggerData()"
          class="ma-2 pa-3"
          dark
          small
        >
          <!-- <v-icon small dark left class="mr-2">cancel</v-icon> -->
          <v-divider vertical class="mr-2"></v-divider>
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
          <!-- <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon> -->
          <v-divider vertical class="mr-2"></v-divider>
          Submit
        </v-btn>
      </v-layout>
    </v-card>

    <v-card
      class="ma-3 pa-4"
      v-if="
        accessPermission.edit === true
          ? true
          : false || accessPermission.view === true
          ? true
          : false
      "
    >
      <v-text-field
        v-model="searchText"
        append-icon="search"
        label="Search By Policy No/Batch ID"
        single-line
        class="mb-4"
        style="
          width: 20%;
          float: left;
          margin-top: 15px;
          margin-right: 30px;
          margin-left: 10px;
        "
        hide-details
        @input="getTableData('15', 0, true)"
      ></v-text-field>
      <button
        @click="getTableData('15', 0)"
        style="
          float: right;
          background-color: #1e83c2;
          padding: 10px;
          top: 0;
          color: #fff;
          border-radius: 7px;
          margin-bottom: 10px;
        "
      >
        Refresh
      </button>
      <!-- <v-flex xs12 sm6 d-flex class="cust_pr filter-enabled mt-4 mr-3" style="max-width: 190px;float:left;flex-direction:column;margin-bottom:-27px">
                  <label style="margin-top:-14px">Request Type </label>
                  <v-select v-model="filterRequest" :items="filterReqItems"  label="Select Status" solo @change="filterBy()" return-object></v-select>
               </v-flex> -->
      <div>
        <v-data-table
          :headers="headers"
          :items="Tabledata"
          v-bind:pagination.sync="pagination"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.TXT_POLICY_NO_CHAR }}
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.LOB_NAME }}
            </td>
            <!-- <td class="text-xs-left" style="background-color:#EFF3F4;">{{props.item.REPORT_TYPE == undefined ? 'Overview Report': 'Detailed'}}</td> -->
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.POLICY_COUNT }}
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.UPDATE_TIMESTAMP }}
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              <p
                v-if="props.item.STATUS === 'Inprogress'"
                class="classProgress"
              >
                {{ props.item.STATUS }}
              </p>
              <p v-if="props.item.STATUS === 'Success'" class="classSuccess">
                {{ props.item.STATUS }}
              </p>
            </td>
            <!-- <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{ props.item.POL_NO}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{ props.item.REPORT_TYPE }}</td> -->
            <!-- <td class="text-xs-left truncate" style="background-color:#EFF3F4;display:flex;align-items:center">{{props.item.REMARKS}}
                            <v-tooltip left class="ml-2" style="display:flex">
                                <v-icon slot="activator" small>info</v-icon><span>{{ props.item.REMARKS }}</span>
                            </v-tooltip>
                        </td> -->
            <!-- <td class="text-xs-left" style="background-color:#EFF3F4">
                            <p v-if="props.item.STATUS === 'Success'" class="classSuccess">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'Failed'" class="classFailed">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'In Progress'" class="classProgress">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'Submitted'" class="classProgress">{{props.item.STATUS}}</p>
                        </td>
                        <td  class="text-xs-left" style="background-color:#EFF3F4">{{props.item.ERROR_COUNT}}</td>
                        <td  class="text-xs-left" style="background-color:#EFF3F4">{{props.item.POLICY_COUNT}}</td> -->
            <td
              v-if="props.item.STATUS == 'Success'"
              class="text-xs-left"
              style="
                background-color: #eff3f4;
                border-right: 1px solid #c1c8cc;
                display: flex;
                align-items: center;
              "
            >
              Download
              <div class="ml-3" style="display: flex; cursor: pointer">
                <img
                  @click="downloadData(props.item.RENEWAL_REPORT_LINK)"
                  class="export-icon-down"
                  style="height: 17px"
                  src="../../assets/downloadicon.png"
                />
              </div>
              <!-- <div v-hide class="ml-3" style="display:flex;cursor:pointer">
                           Processing..
                            </div> -->
              <!-- <div v-if="props.item.showDownloadIcon == true" class="ml-3" style="color:black;display:flex;cursor:pointer">
                                <img @click="downloadData(props.item.JOB_ID,props.item.LOB_NAME,props.item.FILE_URL)" class="export-icon-down ml-2" src="../../assets/downArrowDI.png">    
                            </div> -->
            </td>
            <td
              v-else
              style="
                background-color: #eff3f4;
                border-right: 1px solid #c1c8cc;
                display: flex;
                align-items: center;
              "
            >
              _
              <v-tooltip left class="ml-2">
                <v-icon slot="activator" small
                  >info
                  <span
                    >Please wait while Report is being generated...</span
                  ></v-icon
                >
              </v-tooltip>
            </td>
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
        </v-container>
      </div>
    </v-card>
  </v-app>
</template>
<script>
import axios from "axios";
import xlsx from "json-as-xlsx";
import moment from "moment";
import { BaseURl, oAuthURl, tokenCred } from "../../common/API_Config";
import { userPermissionValidator } from "../RenewalNotice/validator/permissionValidator";

let tokenDataObj = null;
let lastjobid = "";

export default {
  data() {
    return {
      accessPermission: {},
      disableDate: false,
      jobBatchStartDateFrom: "",
      jobBatchStartDateTo: "",
      textRule: [(v) => !!v || "This Field is required"],
      triggerLOB: "",
      triggerProdCode: "",
      triggerBatchID: "",
      downldPolicyStartFromDate: "",
      downldPolicyStartToDate: "",
      policyNo: "",
      downldBatchID: "",
      overviewItems: ["Overview Report"],
      overview: "Overview Report",
      request: "",
      requestItems: [
        "Policy No",
        "Batch ID",
        "Expiry Date From and Expiry Date To",
      ],
      filterRequest: "",
      filterReqItems: [
        "All",
        "Policy No",
        "Batch ID",
        "Expiry Date From and Expiry Date To",
      ],
      triggerBatchStartDate: "",
      jobBatchStartDateMenuFr: "",
      jobBatchStartDateMenuTo: "",
      triggerBatchStartDateMenu: "",
      lobDataArray: [],
      prodCodeArray: [],
      searchText: "",
      newLobArray: [],
      headers: [
        {
          text: "Batch ID",
          // align: 'start',
          // sortable: false,
          value: "JOB_ID",
        },
        { text: "LOB", value: "LOB_NAME" },
        { text: "Policy Count", value: "POLICY_COUNT" },
        { text: "Updated Timestamp", value: "UPDATE_TIMESTAMP" },
        // {text:'',value:''},
        // { text: 'Report Type', value: 'REPORT_TYPE' },
        // { text: 'Product Code', value: 'PRODUCT_CODE' },
        // { text: 'Policy Number', value: 'PolicyNumber' },
        // { text: 'Report Type', value: 'ReportType' },
        // { text: 'Job Sched Date/Time', value: 'Job Sched Date/Time' },
        // { text: 'Remarks', value: 'REMARKS' },
        // { text: 'Status', value: 'STATUS' },
        // { text: 'BRE Status', value: 'BRE Status' },
        // { text: 'CCM Status', value: 'CCM Status' },
        // { text: 'Error Count', value: 'ERROR_COUNT' },
        { text: "Status", value: "STATUS" },
        { text: "Actions", value: "Actions" },
      ],
      pagination: {
        rowsPerPage: 15,
      },
      page: 1,
      pageStartIndex: 1,
      pageRowCount: 15,
      totalListCount: 0,
      IsFilter: false,
      search: "",
      selected: [],
      Tabledata: [],
      skipdiffrence: this.paginationdiff(),
      skip: 0,
      pageNumber: 1,
      pagelength: 1,
      searchFlag: false,
    };
  },

  created() {
    this.$store.commit("SET_PAGE_TITLE", "Renewal Extract Report");
    this.getToken();
    this.accessPermission = userPermissionValidator("FR7");
  },

  methods: {
    clearTriggerData() {
      this.$refs.formData.reset();
      // this.getTableData('15',0)
      this.disableDate = false;
    },
    nextPage(e) {
      let skipdata = e - 1;
      console.log("Page Number", skipdata);
      if (skipdata === 0) {
        this.skip = 0;
        this.pageStartIndex = 1;
      } else {
        this.skip = this.pageRowCount * skipdata;
        this.pageStartIndex = this.pageRowCount + 1;
      }
      this.getTableData("15", this.skip, (this.searchFlag = false));
    },

    downloadData(url) {
      var link = document.createElement("a");
      link.href = url;
      link.style = "visibility:hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
            tokenDataObj = res.data;
            self.getLOBData();
            console.log("before");
            self.getTableData("15", 0);
            console.log("after");
          }
        })
        .catch((error) => {});
    },

    changeLobData(lob) {
      this.prodCodeArray = [];
      console.log(lob, "lob data");
      if (lob.NUM_IL_PRODUCT_CODE == 3188) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "pcv",
        });
        this.triggerProdCode = this.prodCodeArray[0];
      } else if (lob.NUM_IL_PRODUCT_CODE == 3189) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "gcv",
        });
        this.triggerProdCode = this.prodCodeArray[0];
      } else if (lob.NUM_IL_PRODUCT_CODE == 3191) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "mcv",
        });
        this.triggerProdCode = this.prodCodeArray[0];
      } else {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: lob.NUM_IL_PRODUCT_NAME,
        });
        this.triggerProdCode = this.prodCodeArray[0];
      }
    },

    getLOBData() {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let lob_list = JSON.stringify(access_list_fr.data.LOB);
      console.log(lob_list, "lob list api");
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
            console.log(self.newLobArray, "newlobarray");

            return true;
          } else {
            return response;
          }
        })
        .catch(function (error) {});
    },

    JSONToCSVConvertor(JSONData, fileName, ShowLabel, item) {
      console.log(item);
      let self = this;
      axios({
        method: "post",
        url: BaseURl + "/policy-download/search",
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
        data: {
          stage: item.LOB_NAME,
          batchId: item.JOB_ID,
          policyNo: self.policyNo,
          reportType: item.REPORT_TYPE == undefined ? "short" : "detailed",
        },
      })
        .then(function (response) {
          console.log("DATA RESPONSE:::", response.data);
          if (response.status == 200) {
            console.log("DATA RESPONSE:::", response.data.data);
            let arraySend = [];
            let newArr = {};
            var multiplePOlicy = [
              { "Product name": "" },
              { "Policy no": "" },
              { "Previous policy start date": "" },
              { "Previous policy End date": "" },
              { "Customer name": "" },
              { "Status (Success/Failed)": "" },
              { "Reason for Error": "" },
            ];
            if (response.data.data.length == 0) {
              console.log("DATA RESPONSE:::=> if");
              newArr = multiplePOlicy.map((item, index) => {
                return { label: Object.keys(multiplePOlicy[index]), value: "" };
              });
              arraySend = multiplePOlicy;
            } else {
              console.log("DATA RESPONSE:::=> else");
              newArr = Object.keys(response.data.data[0]).map((item) => {
                return { label: item, value: item };
              });
              arraySend = response.data.data;
            }
            console.log("else", newArr);

            if (fileName.split("_")[1] == "Medicare - All Variants") {
              fileName = fileName.split("_")[0] + "_Medicare";
            }
            let data = [
              {
                sheet: fileName,
                columns: newArr,
                content: arraySend,
              },
            ];
            let settings = {
              fileName: fileName, // Name of the spreadsheet
              extraLength: 3, // A bigger number means that columns will be wider
              writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
            };
            xlsx(data, settings);
            console.log(Object.keys(JSONData[0]), JSONData);
          }
        })
        .catch(function (error) {});
    },

    submitStatusData(batchID, lobName) {
      let self = this;
      console.log(self.overview, "overview");
      if (!this.$refs.formData.validate()) {
        this.$refs.formData.validate();
        this.showToast("Please Fill Required Fields", this.TOST().WARNING);
      } else {
        console.log(self.overview, "overview");
        axios({
          method: "post",
          url: BaseURl + "/renewal-reports",
          headers: {
            Authorization:
              tokenDataObj.token_type + " " + tokenDataObj.access_token,
            "Content-Type": "application/json",
          },
          data: {
            lobName: self.triggerLOB.NUM_IL_PRODUCT_NAME,
            expiryFrom: self.jobBatchStartDateFrom,
            expiryTo: self.jobBatchStartDateTo,
            batchId: self.triggerBatchID,
            policyNumber: self.policyNo,
            reportType:
              self.overview == "Overview Report" ? "overview" : "detailed",
          },
        })
          .then(function (response) {
            console.log("POST RESPONSE:::", response);
            self.Tabledata = [];
            if (response.status === 200) {
              console.log("response.data.data", response.data.data);
              self.showToast("Successfully Submitted", self.TOST().SUCCESS);
              console.log(self.Tabledata);
              // self.$refs.formData.reset();
              self.getTableData("15", 0);
            }
          })
          .catch(function (error) {
            if (error) {
              self.showToast(response.data.message, self.TOST().ERROR);
            }
          });
      }
    },

    getTableData(limitvalue, skip, searchFlag = false) {
      let self = this;
      // let access_list_fr = JSON.parse(localStorage.loginResp)
      // let access_list = access_list_fr.data;
      // let role = access_list.ROLE;
      // let lob = self.newLobArray[0].PARENT_PRODUCT_NAME;
      // let parent_product_name;
      // if(role == "admin" || role == "user"){
      //     console.log(lob,"collection new lob aaray")
      //     parent_product_name=lob
      //     console.log(parent_product_name,"parent product name trial")
      //     // lob[0] == 1601 || lob[0] == 1602 || lob[0] == 1604 ? "Travel" : lob[0] == 2154 ? "MARINE" : lob[0] == 5507 ? "BGR" : "";
      // }else if(role == "super-admin"){
      //     parent_product_name = '';
      //     console.log("else part in collection and processing")
      // }
      // console.log(" searchflag::",self.searchFlag)
      // console.log("batchID", self.JOB_ID)
      self.searchFlag = self.searchText == "" ? false : true;
      if (
        self.searchFlag &&
        self.searchText != "" &&
        self.searchText.length > 2
      ) {
        console.log("search functionality");
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
            moduleName: "renewalReports",
            searchFlag: true,
            batchid_or_policyno: self.searchText,
          },
        })
          .then(function (response) {
            self.Tabledata = [];
            let _respData = response.data.data.Items;

            for (let i = 0; i < _respData.length; i++) {
              console.log(
                "(((((((((CCM_JOB_STATUS search))))))))):::",
                _respData
              );
              let update = moment(
                new Date(parseInt(_respData[i].UPDATE_TIMESTAMP, 10))
              ).format("YYYY-MM-DD hh:mm:SS A");
              console.log(update, _respData[i].UPDATE_TIMESTAMP, "updated");
              let _finalData = {
                TXT_POLICY_NO_CHAR: _respData[i].TXT_POLICY_NO_CHAR,
                LOB_NAME: _respData[i].LOB_NAME || "OpenMarineCargo",
                // LOB_NAME:"OpenMarineCargo",
                POLICY_COUNT: _respData[i].POLICY_COUNT,
                RENEWAL_REPORT_LINK: _respData[i].RENEWAL_REPORT_LINK,
                UPDATE_STAGE: _respData[i].UPDATE_STAGE,
                UPDATE_TIMESTAMP: update,
                STATUS: _respData[i].STATUS,
              };
              self.Tabledata.push(_finalData);
              console.log(
                _finalData,
                "DATA _respData __STATUSSS_____ search:::",
                self.Tabledata
              );
            }
            console.log("DATA Tabledata_______ search:::", self.Tabledata);
            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.TXT_POLICY_NO_CHAR
              : "";
            let totalCount = response.data.data.Count;
            self.totalListCount = response.data.data.Count;

            // self.totalListCount = response.data.data.Count
            // console.log(self.totalListCount,"lineno822")
            //  self.pageStartIndex = skip + 1
            // lastjobid = response.data.data.hasOwnProperty('LastEvaluatedKey') ? response.data.data.LastEvaluatedKey.TXT_POLICY_NO_CHAR : ''
          })
          .catch(function (error) {});
      } else {
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
            moduleName: "renewalReports",
            //  parentProductName: parent_product_name,
          },
        })
          .then(function (response) {
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            for (let i = 0; i < _respData.length; i++) {
              console.log("(((((((((CCM_JOB_STATUS))))))))):::", _respData);
              let update = moment(
                new Date(parseInt(_respData[i].UPDATE_TIMESTAMP, 10))
              ).format("YYYY-MM-DD hh:mm:SS A");
              console.log(_respData[i].TXT_POLICY_NO_CHAR, "updated");
              let _finalData = {
                TXT_POLICY_NO_CHAR: _respData[i].TXT_POLICY_NO_CHAR,
                LOB_NAME: _respData[i].LOB_NAME,
                POLICY_COUNT: _respData[i].POLICY_COUNT,
                RENEWAL_REPORT_LINK: _respData[i].RENEWAL_REPORT_LINK,
                UPDATE_STAGE: _respData[i].UPDATE_STAGE,
                UPDATE_TIMESTAMP: update,
                STATUS: _respData[i].STATUS,
              };
              self.Tabledata.push(_finalData);
              console.log(
                _finalData,
                "DATA _respData __STATUSSS_____ remew:::",
                self.Tabledata
              );
            }
            console.log("DATA Tabledata_______:::", self.Tabledata);
            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.TXT_POLICY_NO_CHAR
              : "";
            let totalCount = response.data.data.Count;
            self.totalListCount = response.data.data.Count;
          })
          .catch(function (error) {});
      }
    },
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

    computedJobStartDate() {
      return this.downldPolicyStartFromDate
        ? moment(this.downldPolicyStartFromDate).format("DD-MM-YYYY")
        : "";
    },

    computedJobStartDateTo() {
      return this.downldPolicyStartToDate
        ? moment(this.downldPolicyStartToDate).format("DD-MM-YYYY")
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
  },
};
</script>
<style>
.paginationStyle {
  /* background-color: #F7F7F7;  */
  /* box-shadow: 0px 2px 2px #00000051; border: 0.5px solid #C1C8CC;  */
  opacity: 1;
  padding: 2px;
  font-size: 12px;
  color: black;
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

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme--light.v-table thead th {
  color: #fff;
  /* border-right: 1px solid #fff; */
  background-color: #01afcb;
}

.export-icon {
  height: 15px;
  width: 15px;
}

.searchbox-text-desgn {
  /* box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); */
  color: #666767;
  opacity: 1;
  font-family: robotoregular;
  font-size: 14px;
  padding: 13px;
  /* margin-top:20px; */
  /* padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 10px;
    padding-right: 40px; */
}

.cust-dropdwn-hgt.v-text-field.v-text-field--solo .v-input__control {
  min-height: 40px;
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

.cardwhitebackclr {
  background-color: #ffffff;
  /* justify-content: center;
    align-items: center; */
}

.reconRle-di .v-text-field.v-text-field--solo .v-input__control {
  min-height: 38px;
}
</style>