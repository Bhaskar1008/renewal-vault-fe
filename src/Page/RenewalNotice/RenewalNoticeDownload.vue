<template>
  <v-app style="background-color: #e8eeef">
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Download Pre Extract</v-text
      >
    </div>
    <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
      <v-divider class=""></v-divider>
      <v-layout
        color="#FFFFFF"
        class="mx-2"
        style="position: relative; top: 5px; background-color: #ffffff"
      >
        <v-form ref="form" v-model="isForm">
          <v-layout
            color="#FFFFFF"
            class="mx-2"
            style="background-color: #ffffff"
          >
            <v-text
              class="body-2 font-weight-bold"
              style="position: relative; top: 30px; color: #1e83c2"
              >Option for Download</v-text
            >
            <v-flex class="ml-5">
              <v-layout column class="cust_pr">
                <v-radio-group v-model="valueOfGRadio">
                  <v-radio
                    flat
                    style="height: 38px"
                    class="font-weight-bold mt-0 newClassLeft"
                    value="Download-pre-extract"
                    hide-details
                    label="Download-pre-extract"
                    @change="getTableData('15', 0)"
                  ></v-radio>
                </v-radio-group>
              </v-layout>
            </v-flex>
            <v-flex style="width: 260px" class="ml-2">
              <v-layout column class="mx-2 cust_pr">
                <v-radio-group v-model="valueOfGRadio">
                  <v-radio
                    flat
                    style="height: 38px"
                    class="font-weight-bold mt-0 newClassLeft"
                    value="Download-referred-cases"
                    hide-details
                    label="Download-referred-cases"
                    @change="getTableDataforTravel('15', 0)"
                  ></v-radio>
                </v-radio-group>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-form>
      </v-layout>
      <v-form ref="formdata">
        <v-layout class="pl-3 pt-4" xs12 row wrap>
          <v-flex xs12>
            <v-layout class="cust_pr">
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption text_color">
                  Line of Business *
                </p>
                <v-select
                  solo
                  label="Select"
                  v-model="downldLOB"
                  :rules="textRule"
                  :items="newLobArray"
                  item-text="NUM_IL_PRODUCT_NAME"
                  item-value="NUM_IL_PRODUCT_CODE"
                  return-object
                  @change="changeLobData(downldLOB)"
                ></v-select>
              </v-flex>
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption text_color">
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
                  v-model="downldProdCode"
                ></v-select>
              </v-flex>
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption text_color">Batch ID</p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="downldBatchID"
                  label="Enter..."
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3 class="mr-3">
                <v-layout column class="cust-rmvpd-pr">
                  <p class="font-weight-bold mb-1 caption text_color">
                    Job Start Date From
                  </p>
                  <v-menu
                    ref="calender"
                    :close-on-content-click="false"
                    v-model="jobBatchStartDateMenuFrom"
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
                        <div slot="prepend-inner" class="dateStyle">
                          <img
                            class="pa-1 mr-2"
                            style="height: 35px"
                            src="../../assets/date_24X24.png"
                          /></div
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      @input="jobBatchStartDateMenuFrom = false"
                      v-model="jobBatchStartDateFrom"
                      no-title
                    ></v-date-picker>
                  </v-menu>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout class="pl-3" xs12 row wrap>
          <v-flex xs3 class="mr-3">
            <v-layout column class="cust_pr">
              <p class="font-weight-bold mb-1 caption text_color">
                Job Scheduled Date To
              </p>
              <v-menu
                ref="calender"
                :close-on-content-click="false"
                v-model="jobBatchStartDateMenuTo"
                :nudge-right="40"
                transition="scale-transition"
                max-width="280px"
                min-width="280px"
                class="rounded-0"
                style="width: 307px"
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
                      style="right: 12px"
                      class="dateStyle"
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
      </v-form>
      <v-layout
        class="pa-2"
        style="position: relative; bottom: 15px; float: right"
      >
        <v-btn
          flat
          @click="clearDownldData()"
          class="ma-2 pa-3 clearBtn"
          color="#646666"
          dark
          small
        >
          <v-divider vertical class="mr-2"></v-divider>
          Clear
        </v-btn>
        <v-btn
          flat
          @click="
            valueOfGRadio == 'Download-pre-extract'
              ? getTableData('15', 0, true)
              : getTableDataforTravel('15', 0, true)
          "
          class="ma-2 pa-3 submitBtn"
          color="#0073BB"
          dark
          small
          style="color: #ffffff"
        >
          <v-divider vertical class="mr-2"></v-divider>
          Submit
        </v-btn>
      </v-layout>
    </v-card>
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
        @keyup="
          searchFlag = true;
          searchFunctionality(valueOfGRadio);
        "
      ></v-text-field>
      <button @click="searchData()" class="refreshBtn">Refresh</button>
      <div>
        <v-data-table
          :headers="headers"
          :items="Tabledata"
          :search="searchText"
          :sort-by="['JOB_START_DATE']"
          :sort-desc="[true]"
          v-bind:pagination.sync="pagination"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left tableDataBg">
              {{ props.item.JOB_ID }}
            </td>
            <td class="text-xs-left tableDataBg">
              {{ props.item.LOB_NAME }}
            </td>
            <td class="text-xs-left tableDataBg">
              {{ props.item.JOB_START_DATE }} {{ props.item.JOB_START_TIME }}
            </td>
            <td
              class="text-xs-left truncate tableDataBg"
              style="display: flex; align-items: center"
            >
              {{ props.item.REMARKS }}
              <v-tooltip left class="ml-2" style="display: flex">
                <v-icon slot="activator" small>info</v-icon
                ><span>{{ props.item.REMARKS }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs-left tableDataBg">
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
              <p v-if="props.item.STATUS === 'Submitted'" class="classProgress">
                {{ props.item.STATUS }}
              </p>
            </td>
            <td class="text-xs-left tableDataBg">
              {{ props.item.ERROR_COUNT }}
            </td>
            <td class="text-xs-left tableDataBg">
              {{ props.item.POLICY_COUNT }}
            </td>
            <td
              v-if="props.item.hidePrevIcon == true"
              class="text-xs-left tableDataBg"
              style="display: flex; align-items: center"
            >
              <div
                v-if="
                  (props.item.hidePrevIcon == true &&
                    props.item.STATUS == 'Failed') ||
                  props.item.STATUS == 'Success'
                "
                class="ml-3"
                style="display: flex; cursor: pointer; color: rgb(28, 175, 203)"
              >
                <button
                  class="export-icon mr-5"
                  @click="
                    batchStatusApi(
                      props.item,
                      props.item.DOWNLOAD_PRE_EXTRACT_FILE_URL,
                      props.item.JOB_ID
                    )
                  "
                >
                  EXPORT
                </button>
                <img
                  @click="
                    batchStatusApi(
                      props.item,
                      props.item.DOWNLOAD_PRE_EXTRACT_FILE_URL,
                      props.item.JOB_ID
                    )
                  "
                  class="export-icon"
                  src="../../assets/downloadicon.png"
                />
              </div>
              <div v-else style="display: flex; margin-left: 20px">
                _
                <v-tooltip left class="ml-2 mt-2" style="display: flex">
                  <v-icon slot="activator" small>info</v-icon
                  ><span>Only Success cases can be downloaded!</span>
                </v-tooltip>
              </div>
            </td>

            <td
              v-if="
                props.item.showDownloadIcon == true &&
                props.item.DOWNLOAD_PRE_EXTRACT_FILE_URL
              "
              class="text-xs-left tableDataBg"
              style="
                display: flex;
                align-items: center;
                color: rgb(28, 175, 203);
              "
            >
              DOWNLOAD
              <div
                v-if="
                  props.item.showDownloadIcon == true &&
                  props.item.DOWNLOAD_PRE_EXTRACT_FILE_URL
                "
                class="ml-3"
                style="display: flex; cursor: pointer"
              >
                <img
                  @click="
                    downloadData(
                      props.item.JOB_ID,
                      props.item.LOB_NAME,
                      props.item.DOWNLOAD_PRE_EXTRACT_FILE_URL
                    )
                  "
                  class="export-icon-down"
                  style="height: 17px"
                  src="../../assets/downloadicon.png"
                />
              </div>
            </td>
          </template>
        </v-data-table>
        <v-container
          fluid
          class="my-3 paginationStyle"
          v-if="Tabledata.length !== 0"
        >
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
       <template>
          <div class="text-xs-center txt-loader" v-if="dataLoader">
            <v-progress-circular :size="100" color="white" indeterminate
              >Loading...</v-progress-circular
            >
          </div>
        </template>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {
  usernameFromLocalStorage,
  userPermissionValidator,
} from "./validator/permissionValidator";
import { BaseURl, oAuthURl, tokenCred } from "../../common/API_Config";

let tokenDataObj = null;
let lastjobid = "";

export default {
  data() {
    return {
      accessPermission: {},
      valueOfGRadio: "Download-pre-extract",
      jobBatchStartDateFrom: "",
      jobBatchStartDateTo: "",
      textRule: [(v) => !!v || "This Field is required"],
      fileLinkUrl: "",
      Tabledata: [],
      downldLOB: "",
      downldProdCode: "",
      downldBatchID: "",
      dataLoader: false,

      downldBatchStartDate: "",
      jobBatchStartDateMenuFrom: "",
      jobBatchStartDateMenuTo: "",
      downldBatchStartDateMenu: "",
      lobDataArray: [],
      newLobArray: [],
      prodCodeArray: [],
      searchText: "",
      parentProductName: "",
      headers: [
        {
          text: "Batch ID",
          value: "JOB_ID",
        },
        { text: "LOB", value: "LOB_NAME" },
        {
          text: "Job Sched Date/Time",
          value: "JOB_START_DATE",
          sortable: true,
          align: "end",
        },
        { text: "Remarks", value: "REMARKS" },
        { text: "Status", value: "STATUS" },
        { text: "Error Count", value: "ERROR_COUNT" },
        { text: "Policy Count", value: "POLICY_COUNT" },
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
      setDownload: false,
      downloadCSV: false,
      showDwnldBtn: false,
      searchFlag: false,
      TravelTabledata: [],
    };
  },
  watch: {
    valueOfGRadio(val) {
      console.log(val);
      if (val == "Download-referred-cases") {
        this.showFields = true;
        this.$refs.formdata.reset();
      } else {
        this.showFields = false;
        this.$refs.formdata.reset();
      }
    },
  },

  created() {
    this.$store.commit("SET_PAGE_TITLE", "Download Pre Extract");
    this.getToken();
    console.log(this.showFields, this.valueOfGRadio);
    this.accessPermission = userPermissionValidator("FR4");
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
        ? moment(this.jobBatchStartDateFrom).format("YYYY-MM-DD")
        : "";
    },

    computedjobStartDateTo() {
      return this.jobBatchStartDateTo
        ? moment(this.jobBatchStartDateTo).format("YYYY-MM-DD")
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

  methods: {
    nextPage(e) {
      let skipdata = e - 1;
      // skipdata === 0 ? this.skip = 0 : this.skip = this.skipdiffrence*skipdata
      console.log("Page Number", skipdata);
      if (skipdata === 0) {
        this.skip = 0;
        this.pageStartIndex = 1;
      } else {
        this.skip = this.pageRowCount * skipdata;
        this.pageStartIndex = this.pageRowCount + 1;
      }
      if (this.valueOfGRadio == "Download-pre-extract") {
        this.getTableData("15", this.skip, (this.searchFlag = false));
      } else {
        this.getTableDataforTravel("15", this.skip, (this.searchFlag = false));
      }
    },

    searchData(val) {
      let self = this;
      this.dataLoader = true; 
      if (this.valueOfGRadio == "Download-pre-extract") {
         setTimeout(() => {
            this.dataLoader = false;
            self.getTableData("15", this.skip, this.searchFlag = false);
            }, 3000);
      this.searchText="";      

      } else {
         setTimeout(() => {
            this.dataLoader = false;
            self.getTableDataforTravel("15", 0, true);
            }, 3000);
        this.searchText="";      

        
      }
    },
    //  searchData() {
    //   let self = this;
    //   this.dataLoader = true;
    //   setTimeout(() => {
    //         this.dataLoader = false;
    //         self.getTableData("15", this.skip, this.searchFlag = false);
    //         }, 3000);
    // },
    searchFunctionality(val) {
      if (val == "Download-referred-cases") {
        this.getTableDataforTravel("15", 0,true);
      } else {
        this.getTableData("15", 0, true);
      }
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
            this.getLOBData();
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
        this.downldProdCode = this.prodCodeArray[0];
      } else if (lob.NUM_IL_PRODUCT_CODE == 3189) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "gcv",
        });
        this.downldProdCode = this.prodCodeArray[0];
      } else if (lob.NUM_IL_PRODUCT_CODE == 3191) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "mcv",
        });
        this.downldProdCode = this.prodCodeArray[0];
      } else {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: lob.NUM_IL_PRODUCT_NAME,
        });
        this.downldProdCode = this.prodCodeArray[0];
      }
    },

    batchStatusApi(item, url, batchId) {
      let self = this;
      if (self.valueOfGRadio == "") {
        this.showToast("Please Select the Option", this.TOST().WARNING);
      } else {
        if (self.valueOfGRadio == "Download-pre-extract") {
          self.showToast(
            "Your report is being ready. Please wait for some time",
            self.TOST().SUCCESS
          );
          axios({
            method: "get",
            url: BaseURl + "/policy-download/" + item.JOB_ID,
            headers: {
              Authorization:
                tokenDataObj.token_type + " " + tokenDataObj.access_token,
              "Content-Type": "application/json",
            },
            data: {
              batchId: batchId,
              lobName: item.LOB_NAME,
            },
          })
            .then(function (response) {
              if (response.status === 200) {
                setTimeout(() => {
                  if (response.data.data) {
                    self.Tabledata.map((el) => {
                      el.JOB_ID === item.JOB_ID
                        ? (el.showDownloadIcon = true)
                        : "";
                    });
                    self.Tabledata.map((el) => {
                      el.JOB_ID === item.JOB_ID
                        ? (el.hidePrevIcon = false)
                        : "";
                    });
                    self.Tabledata.map((el) => {
                      el.JOB_ID === item.JOB_ID
                        ? (el.DOWNLOAD_PRE_EXTRACT_FILE_URL =
                            response.data.data)
                        : "";
                    });
                  } else {
                    self.showToast(
                      "Your report is not generated",
                      self.TOST().ERROR
                    );
                  }
                }, 8000);
              }
            })
            .catch(function (error) {
              if (error) {
                self.showToast(
                  "Something went wrong, Please try again",
                  self.TOST().ERROR
                );
              }
            });
        } else {
          self.showToast(
            "Your report is being ready. Please wait for some time",
            self.TOST().SUCCESS
          );
          axios({
            method: "get",
            url: BaseURl + "/download/referred-policies/" + item.JOB_ID,
            headers: {
              Authorization:
                tokenDataObj.token_type + " " + tokenDataObj.access_token,
              "Content-Type": "application/json",
            },
            data: {
              batchId: batchId,
              lobName: item.LOB_NAME,
            },
          })
            .then(function (response) {
              if (response.status === 200) {
                setTimeout(() => {
                  if (response.data.data) {
                    self.Tabledata.map((el) => {
                      el.JOB_ID === item.JOB_ID
                        ? (el.showDownloadIcon = true)
                        : "";
                    });
                    self.Tabledata.map((el) => {
                      el.JOB_ID === item.JOB_ID
                        ? (el.hidePrevIcon = false)
                        : "";
                    });
                    self.Tabledata.map((el) => {
                      el.JOB_ID === item.JOB_ID
                        ? (el.DOWNLOAD_PRE_EXTRACT_FILE_URL =
                            response.data.data)
                        : "";
                    });
                  } else {
                    self.showToast(
                      "Your report is not generated",
                      self.TOST().ERROR
                    );
                  }
                }, 8000);
              }
            })
            .catch(function (error) {
              if (error) {
                self.showToast(
                  "Something went wrong, Please try again",
                  self.TOST().ERROR
                );
              }
            });
        }
      }
    },

    downloadData(batchId, lobName, url) {
      var link = document.createElement("a");
      link.href = url;
      link.style = "visibility:hidden";
      link.download = batchId + "_" + lobName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    getLOBData() {
      let productID = this.$store.state.agentDetails.userId;
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
    clearDownldData() {
      let self = this;
      self.$refs.formdata.reset();
    },

    getTableDataforTravel(limitvalue, skip, searchFlag = false) {
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
      self.searchFlag = self.searchText == "" ? false : true;
      if (
        self.searchFlag &&
        self.searchText != "" &&
        self.searchText.length > 2
      ) {
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
            moduleName: "downloadPreExtractTravelReferred",
            searchFlag: self.searchFlag,
            batchid_or_policyno: self.searchText,
            parentProductName: parent_product_name,
            lobName: self.downldLOB.NUM_IL_PRODUCT_NAME,
          },
        })
          .then(function (response) {
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            for (let i = 0; i < _respData.length; i++) {
              if (_respData[i].LOB_NAME) {
                let _finalData = {
                  ERROR_COUNT: _respData[i].ERROR_COUNT,
                  DOWNLOAD_PRE_EXTRACT_FILE_URL:
                    _respData[i].DOWNLOAD_PRE_EXTRACT_FILE_URL,
                  JOB_ID: _respData[i].JOB_ID,
                  JOB_START_DATE: _respData[i].JOB_START_DATE,
                  JOB_START_TIME: _respData[i].JOB_START_TIME,
                  JOB_STATUS: _respData[i].JOB_STATUS,
                  LOB_NAME: _respData[i].LOB_NAME,
                  POLICY_COUNT: _respData[i].REFERRED_COUNT,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS: _respData[i].REMARKS,
                  RENEWAL_EXPIRY_DATE_FROM:
                    _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                  RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                  STAGE: _respData[i].STAGE,
                  STATUS: _respData[i].STATUS,
                  SUCCESS_POLICIES_FILE_URL:
                    _respData[i].SUCCESS_POLICIES_FILE_URL,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  CSV_DATA:
                    _respData[i].TXT_POLICY_LIST.length == 0 ||
                    _respData[i].TXT_POLICY_LIST == ""
                      ? []
                      : _respData[i].TXT_POLICY_LIST.map(function (el) {
                          let _data = {
                            "Product name": _respData[i].LOB_NAME,
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
                  TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                };
                self.Tabledata.unshift(_finalData);
              }
              self.clearDownldData();
            }
            self.totalListCount = response.data.data.Count;
            self.pageStartIndex = skip + 1;
            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.JOB_ID
              : "";
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
            moduleName: "downloadPreExtractTravelReferred",
            parentProductName: parent_product_name,
            // lobName:self.downldLOB.NUM_IL_PRODUCT_NAME,
            searchFlag: self.searchFlag,
            jobId: self.downldBatchID,
          },
        })
          .then(function (response) {
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            for (let i = 0; i < _respData.length; i++) {
              if (_respData[i].LOB_NAME) {
                let _finalData = {
                  ERROR_COUNT: _respData[i].ERROR_COUNT,
                  DOWNLOAD_PRE_EXTRACT_FILE_URL:
                    _respData[i].DOWNLOAD_PRE_EXTRACT_FILE_URL,
                  JOB_ID: _respData[i].JOB_ID,
                  JOB_START_DATE: _respData[i].JOB_START_DATE,
                  JOB_START_TIME: _respData[i].JOB_START_TIME,
                  JOB_STATUS: _respData[i].JOB_STATUS,
                  LOB_NAME: _respData[i].LOB_NAME,
                  POLICY_COUNT: _respData[i].REFERRED_COUNT,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS: _respData[i].REMARKS,
                  RENEWAL_EXPIRY_DATE_FROM:
                    _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                  RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                  STAGE: _respData[i].STAGE,
                  STATUS: _respData[i].STATUS,
                  SUCCESS_POLICIES_FILE_URL:
                    _respData[i].SUCCESS_POLICIES_FILE_URL,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  CSV_DATA:
                    _respData[i].TXT_POLICY_LIST.length == 0 ||
                    _respData[i].TXT_POLICY_LIST == ""
                      ? []
                      : _respData[i].TXT_POLICY_LIST.map(function (el) {
                          let _data = {
                            "Product name": _respData[i].LOB_NAME,
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
                  TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                };
                self.Tabledata.unshift(_finalData);
              }
              self.clearDownldData();
            }
            self.totalListCount = response.data.data.Count;
            self.pageStartIndex = skip + 1;
            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.JOB_ID
              : "";
            self.pagelength = Math.ceil(totalCount / self.skipdiffrence);
          })
          .catch(function (error) {});
      }
    },

    getTableData(limitvalue, skip, searchFlag = false) {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let access_list = access_list_fr.data;
      let role = access_list.ROLE;
      let lob = self.newLobArray[0].PARENT_PRODUCT_NAME;
      let parent_product_name ;
      if (role == "admin" || role == "user") {
        parent_product_name = lob;
      } else if (role == "super-admin") {
        parent_product_name = "";
      }
      if (this.$refs.formdata.validate()) {
        axios({
          method: "post",
          url: BaseURl + "/job-paginator",
          headers: {
            Authorization:
              tokenDataObj.token_type + " " + tokenDataObj.access_token,
            "Content-Type": "application/json",
          },
          data: {
            JOBStartDateFrom: self.jobBatchStartDateFrom,
            JOBStartDateTo: self.jobBatchStartDateTo,
            jobId: self.downldBatchID,
            limit: limitvalue,
            lobName: self.downldLOB.NUM_IL_PRODUCT_NAME,
            moduleName: "downloadPreExtract",
            offset: skip,
            parentProductName:parent_product_name ,
            productCode: self.downldLOB.NUM_IL_PRODUCT_CODE,
            searchFlag: true,
          },
        })
          .then(function (response) {
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            for (let i = 0; i < _respData.length; i++) {
              if (_respData[i].LOB_NAME) {
                let _finalData = {
                  NEWARR: _respData[i],
                  ERROR_COUNT: _respData[i].ERROR_COUNT,
                  JOB_ID: _respData[i].JOB_ID,
                  JOB_START_DATE: _respData[i].JOB_START_DATE,
                  JOB_START_TIME: _respData[i].JOB_START_TIME,
                  EXECUTION_END_TIME: _respData[i].EXECUTION_END_TIME,
                  JOB_STATUS: _respData[i].JOB_STATUS,
                  LOB_NAME: _respData[i].LOB_NAME,
                  POLICY_COUNT: _respData[i].POLICY_COUNT,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS: _respData[i].REMARKS,
                  RENEWAL_EXPIRY_DATE_FROM:
                    _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                  RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                  STAGE: _respData[i].STAGE,
                  STATUS: _respData[i].STATUS,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  FILE_URL: _respData[i].FILE_URL,
                  CSV_DATA:
                    _respData[i].TXT_POLICY_LIST.length == 0 ||
                    _respData[i].TXT_POLICY_LIST == ""
                      ? []
                      : _respData[i].TXT_POLICY_LIST.map(function (el) {
                          let _data = {
                            "Product name": _respData[i].LOB_NAME,
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
                  TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                };
                self.Tabledata.push(_finalData);
              }
              self.clearDownldData();
            }
            self.pageStartIndex = skip + 1;
            self.totalListCount = response.data.data.Count;

            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.JOB_ID
              : "";
          })
          .catch(function (error) {});
      } else if (
        self.searchFlag &&
        self.searchText != "" &&
        self.searchText.length > 2
      ) {
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
            moduleName: "downloadPreExtract",
            productCode: "",
            lobName: "",
            batchid_or_policyno: self.searchText,
            searchFlag: self.searchFlag,
            parentProductName:parent_product_name,
            filterBy: {
              STATUS: ["Failed"],
            },
          },
        })
          .then(function (response) {
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            for (let i = 0; i < _respData.length; i++) {
              if (_respData[i].LOB_NAME) {
                let _finalData = {
                  ERROR_COUNT: _respData[i].ERROR_COUNT,
                  DOWNLOAD_PRE_EXTRACT_FILE_URL:
                    _respData[i].DOWNLOAD_PRE_EXTRACT_FILE_URL,
                  JOB_ID: _respData[i].JOB_ID,
                  JOB_START_DATE: _respData[i].JOB_START_DATE,
                  JOB_START_TIME: _respData[i].JOB_START_TIME,
                  JOB_STATUS: _respData[i].JOB_STATUS,
                  LOB_NAME: _respData[i].LOB_NAME,
                  POLICY_COUNT: _respData[i].POLICY_COUNT,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS: _respData[i].REMARKS,
                  RENEWAL_EXPIRY_DATE_FROM:
                    _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                  RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                  STAGE: _respData[i].STAGE,
                  STATUS: _respData[i].STATUS,
                  SUCCESS_POLICIES_FILE_URL:
                    _respData[i].SUCCESS_POLICIES_FILE_URL,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  CSV_DATA:
                    _respData[i].TXT_POLICY_LIST.length == 0 ||
                    _respData[i].TXT_POLICY_LIST == ""
                      ? []
                      : _respData[i].TXT_POLICY_LIST.map(function (el) {
                          let _data = {
                            "Product name": _respData[i].LOB_NAME,
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
                  TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                };
                self.Tabledata.unshift(_finalData);
              }
              self.clearDownldData();
            }
            self.totalListCount = response.data.data.Count;
            self.pageStartIndex = skip + 1;
            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.JOB_ID
              : "";
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
            moduleName: "downloadPreExtract",
            productCode: "",
            lobName: "",
            filterBy: {
              STATUS: ["Failed"],
            },
            parentProductName: parent_product_name,
          },
        })
          .then(function (response) {
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            for (let i = 0; i < _respData.length; i++) {
              if (_respData[i].LOB_NAME) {
                let _finalData = {
                  ERROR_COUNT: _respData[i].ERROR_COUNT,
                  DOWNLOAD_PRE_EXTRACT_FILE_URL:
                    _respData[i].DOWNLOAD_PRE_EXTRACT_FILE_URL,
                  JOB_ID: _respData[i].JOB_ID,
                  JOB_START_DATE: _respData[i].JOB_START_DATE,
                  JOB_START_TIME: _respData[i].JOB_START_TIME,
                  JOB_STATUS: _respData[i].JOB_STATUS,
                  LOB_NAME: _respData[i].LOB_NAME,
                  POLICY_COUNT: _respData[i].POLICY_COUNT,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS: _respData[i].REMARKS,
                  RENEWAL_EXPIRY_DATE_FROM:
                    _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                  RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                  STAGE: _respData[i].STAGE,
                  STATUS: _respData[i].STATUS,
                  SUCCESS_POLICIES_FILE_URL:
                    _respData[i].SUCCESS_POLICIES_FILE_URL,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  CSV_DATA:
                    _respData[i].TXT_POLICY_LIST.length == 0 ||
                    _respData[i].TXT_POLICY_LIST == ""
                      ? []
                      : _respData[i].TXT_POLICY_LIST.map(function (el) {
                          let _data = {
                            "Product name": _respData[i].LOB_NAME,
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
                  TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                };
                self.Tabledata.unshift(_finalData);
              }
              self.clearDownldData();
            }
            self.totalListCount = response.data.data.Count;
            self.pageStartIndex = skip + 1;
            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.JOB_ID
              : "";
          })
          .catch(function (error) {});
      }
    },
  },
};
</script>
<style>
.tableDataBg {
  background-color: #eff3f4;
}
.refreshBtn {
  float: right;
  background-color: #1e83c2;
  padding: 10px;
  top: 0;
  color: #fff;
  border-radius: 7px;
  margin-bottom: 10px;
}
.dateStyle {
  position: relative;
  background-color: #f7f7f7;
  bottom: 5px;
  top: 0px;
}
.text_color {
  color: #646666;
}
.clearBtn {
  width: 100px;
  height: 35px;
  background-color: #ffffff;
  color: #646666;
  border: 1.5px solid #ccc;
  border-radius: 4px;
}
.submitBtn {
  width: 100px;
  height: 35px;
  background-color: #0073bb;
  border: 1.5px solid #ccc;
  border-radius: 4px;
}
.paginationStyle {
  /* background-color: #F7F7F7;  */
  /* box-shadow: 0px 2px 2px #00000051; border: 0.5px solid #C1C8CC;  */
  opacity: 1;
  padding: 2px;
  font-size: 12px;
  /* color: black; */
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

.export-icon-down {
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
</style>