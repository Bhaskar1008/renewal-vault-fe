<template>
  <v-app style="background-color: #e8eeef">
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Upload Warranties & Othergrid Data</v-text
      >
    </div>
    <v-card class="ma-3">
      <v-divider class=""></v-divider>
      <v-form ref="formdata">
        <v-layout class="pl-3" xs12 row wrap style="margin: 21px 4px 0 8px">
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
                  :rules="[(v) => !!v || 'LOB is required']"
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
                  :rules="[(v) => !!v || 'Product Code is required']"
                ></v-select>
              </v-flex>

              <v-flex xs3 class="mr-3">
                <v-layout column class="cust-rmvpd-pr">
                  <p class="font-weight-bold mb-1 caption cardTextColor">
                    Insertion Date <span>*</span>
                  </p>
                  <v-menu
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
                        v-on="on"
                        :rules="[(v) => !!v || 'Insertion Date is required']"
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
                      v-model="expiryPeriodFrom"
                      @change="selectedDateTost()"
                      no-title
                      :min="previousDate"
                      :max="currentDate"
                    ></v-date-picker>
                  </v-menu>
                </v-layout>
              </v-flex>
              <v-flex xs3 class="mr-3">
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
              </v-flex>
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Upload *
                </p>
                <v-flex
                  class="mt-1 mr-2"
                  style="
                    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%),
                      0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
                    height: 48px;
                  "
                >
                  <label
                    for="myfile1"
                    class="caption font-weight-medium"
                    style="margin-left: 10px; cursor: pointer"
                    >Uploading Via Browsing
                  </label>
                  <img class="ml-3" src="../../assets/upload.png" />
                  <input
                    hide-details
                    type="file"
                    ref="fileref"
                    id="myfile1"
                    name="myfile"
                    @change="onFilePicked"
                  />
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-form>

      <!-- <v-divider class=""></v-divider> -->
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
          @click="clearData()"
          class="ma-2 pa-3"
          color="#646666"
          dark
          small
        >
          <!-- <v-icon small dark left class="mr-2">delete</v-icon> -->
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
          @click="submitData()"
          class="ma-2 pa-3"
          color="#0073BB"
          dark
          small
        >
          <v-divider vertical class="mr-2"></v-divider>
          Submit
        </v-btn>
      </v-layout>
    </v-card>
    <v-card class="ma-3 pa-4">
      <div style="display: flex">
        <v-text-field
          v-model="searchText"
          append-icon="search"
          label="Search"
          single-line
          class="mb-1"
          style="max-width: 20%; padding: 20px; float: left"
          hide-details
          @input="getPolicyData('10', 0, true)"
        ></v-text-field>
        <v-btn
          class="setDate"
          v-if="isDateAvailable"
          style="background-color: #1e83c2; color: white;"
          @click="showSearchHandler()"
          >Set Available Date</v-btn
        >
      </div>
      <div class="syncData">
        <v-flex xs3 class="mr-3" style="width: 361px">
          <v-layout column class="cust-rmvpd-pr">
            <p class="font-weight-bold mb-1 caption cardTextColor">
              Select Date <span>*</span>
            </p>
            <v-menu
              ref="calender"
              v-model="expiryPeriodToMenu"
              :close-on-content-click="false"
              offset-y
              :nudge-right="40"
              transition="scale-transition"
              class="rounded-0"
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
                v-model="expiryPeriodTo"
                @change="selectedDateTost()"
                no-title
                :min="previousDate"
                :max="currentDate"
              ></v-date-picker>
            </v-menu>
          </v-layout>
        </v-flex>

        <v-btn
          class="dropbtn"
          style="background-color: #1e83c2; color: white; margin-left: 5px"
          @click="getPolicyData('10', 0, (searchFlag = true))"
        >
          Sync Data
        </v-btn>
        <v-btn
          class="dropbtn"
          style="background-color: #2a811b; color: white"
          @click="downloadPolicy()"
        >
          <v-icon style="margin-right: 9px" small>mdi-download</v-icon>
          Download
        </v-btn>
        <v-btn
          class="dropbtn"
          style="background-color: #1e83c2; color: white"
          @click="refreshData()"
        >
          Refresh
        </v-btn>
      </div>

      <div>
        <v-data-table
          no-data-text="No data available"
          :headers="headers"
          :items="policyLists"
          v-bind:pagination.sync="pagination"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td
              class="text-xs-left"
              style="background-color: #eff3f4; padding: 18px"
            >
              {{ props.item.TXT_POLICY_NO_CHAR }}
            </td>

            <td
              class="text-xs-left"
              style="background-color: #eff3f4; padding: 18px"
            >
              {{ props.item.DAT_ETL_INSERT_DATETIME }}
            </td>
            <td
              class="text-xs-left"
              style="background-color: #eff3f4; padding-left: 35px"
            >
              {{ props.item.NUM_REFERENCE_NUMBER }}
            </td>
            <td
              class="text-xs-left"
              style="background-color: #eff3f4; padding: 18px"
            >
              {{ props.item.DAT_POLICY_EFF_TODATE }}
            </td>
          </template>
        </v-data-table>
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
    </v-card>
    <v-dialog
      persistent
      v-model="showCustomDateRange"
      overlay
      scrollable
      max-width="400"
    >
      <v-card tile>
        <v-toolbar dark style="background-color: #0073bb; height: 35px">
          <v-toolbar-title
            style="color: white; margin-bottom: 25px; font-size: 15px"
            >Set</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn
            icon
            light
            @click="onCloseHandler"
            style="color: white; margin-bottom: 28px"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-menu bottom right offset-y></v-menu>
        </v-toolbar>
        <div>
          <v-form ref="formdata">
            <v-layout
              class="pl-3 pt-4 d-flex justify-space-between"
              xs6
              row
              wrap
            >
              <v-layout column class="dateRange">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  No of days backdated <span>*</span>
                </p>
                <v-text-field
                  style="margin-right: 10px"
                  class="rounded-0"
                  type="number"
                  solo
                  v-model="noOfBackDays"
                  label="Enter..."
                  id="remark"
                  maxlength="15"
                  autocomplete="off"
                >
                </v-text-field>
              </v-layout>
            </v-layout>
            <v-layout
              class="pa-2"
              style="position: relative; bottom: 15px; float: right"
            >
              <v-btn
                flat
                class="ma-2 pa-3 btn clear-btn"
                color="#646666"
                dark
                small
                @click="onCloseHandler"
              >
                Close
              </v-btn>

              <v-btn
                flat
                class="ma-2 pa-3 btn update-btn"
                color="#0073BB"
                dark
                small
                @click="onBackDateHandler"
                >Update
              </v-btn>
            </v-layout>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <!-- <template>
      <div class="text-xs-center txt-loader" v-if="dataLoader">
        <v-progress-circular :size="100" color="white" indeterminate
          >Loading...</v-progress-circular
        >
      </div>
    </template> -->
  </v-app>
</template>

<script>
import axios from "axios";
import { oAuthURl, BaseURl } from "../../common/API_Config.js";
import moment from "moment";
import { policySummaryMOPheader } from "./common/tableHeader";
import CustomDateRangePicker from "./common/CustomDateRangePicker.vue";
import { apiService } from "./common/common";

export default {
  components: {
    CustomDateRangePicker,
  },
  data() {
    return {
      showCustomDateRange: false,
      dataLoader: false,
      userData: {},
      searchText: "",
      remarkData: "",
      lobDataArray: [],
      newLobArray: [],
      lobData: [],
      policyLists: [],
      lineOfBusiness: "",
      prodCodeArray: [],
      selectFileData: {},
      headers: policySummaryMOPheader,
      uploadProdCode: "",
      limitValue: 5,
      offset: 0,
      pageStartIndex: 1,
      totalListCount: 0,
      pageNumber: 1,
      pagelength: 1,
      page: 1,
      pageRowCount: 10,
      productCode: "",
      expiryPeriodFrom: "",
      expiryPeriodTo: "",
      expiryPeriodToMenu: false,
      expiryPeriodFromMenu: false,
      search: "",
      pagination: {
        rowsPerPage: 15,
      },
      searchFlag: false,
      skipdiffrence: this.paginationdiff(),

      noOfBackDays: 0,

      isDateAvailable: false,
      // textRule: [(v) => !!v || "This Field is required"],
    };
  },
  created() {
    this.getLobData();
    this.checkSetDateAvailableHandler();
  },
  methods: {
    checkSetDateAvailableHandler() {
      let userData = JSON.parse(localStorage.loginResp);
      // console.log(userData.data.ROLE,"s")
      if (
        userData.data.ROLE == "admin" ||
        userData.data.ROLE == "super-admin"
      ) {
        this.isDateAvailable = true;
      } else {
        this.isDateAvailable = false;
      }
      const username = userData.data.USER_NAME;

      apiService("get", `/fetch/user?userName=${username}`, {})
        .then((res) => {
          if (res.status == 200) {
            const { data } = res.data;
            // console.log(data, "da");

            this.noOfBackDays = data.noOfBackDays;
            // this.communicationSystemOpn = data.rng;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCloseHandler() {
      this.showCustomDateRange = false;
    },
    onBackDateHandler() {
      let self = this;

      if (this.noOfBackDays >= 0 && this.noOfBackDays <= 365) {
        this.isLoading = true;
        apiService("post", "/update/communication-systems", {
          noOfBackDays: this.noOfBackDays,
        })
          .then((res) => {
            if (res.status == 200) {
              self.isLoading = false;
              self.showToast(res.data.msg, self.TOST().SUCCESS);
              self.onCloseHandler();
              self.checkSetDateAvailableHandler();
            }
          })
          .catch((err) => {
            self.isLoading = false;
            self.showToast("Failed to set available date", self.TOST().WARNING);
            self.onCloseHandler();
            self.checkSetDateAvailableHandler();
          });
      } else {
        self.showToast(
          "Please provide valid no of backdays",
          self.TOST().WARNING
        );
      }
    },
    showSearchHandler() {
      this.showCustomDateRange = true;
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
      this.getPolicyData("10", this.skip, true);
    },

    refreshData() {
      let self = this;
      self.getPolicyData("10", 0, (searchFlag = true));
    },

    clearData() {
      let self = this;
      self.$refs.formdata.reset();
      self.productCode = "";
      self.lineOfBusiness = "";
      self.selectFileData = [];
      self.remarkData = "";
      self.expiryPeriodTo = "";
      self.expiryPeriodFrom = "";
    },

    getPolicyData(limitvalue, skip, searchFlag = false) {
      let self = this;
      searchFlag = self.searchText == "" ? false : true;
      const payload = {
        date: self.expiryPeriodTo,
        limit: limitvalue,
        offSet: skip,
        searchFlag: true,
        policyNumber: self.searchText,
      };
      apiService("post", `/getWarrentyDetails`, payload)
        .then((response) => {
          const { errCode, data, errMsg } = response.data;
          if (errCode === -1) {
            self.policyLists = [];
            let _respData = data.data;
            for (let i = 0; i < _respData.length; i++) {
              let _finalData = {
                DAT_ETL_INSERT_DATETIME: _respData[i].DAT_ETL_INSERT_DATETIME,
                DAT_POLICY_EFF_TODATE: _respData[i].DAT_POLICY_EFF_TODATE,
                NUM_REFERENCE_NUMBER: _respData[i].NUM_REFERENCE_NUMBER,
                TXT_POLICY_NO_CHAR: _respData[i].TXT_POLICY_NO_CHAR,
              };
              self.policyLists.unshift(_finalData);
              console.log(self.policyLists, "datafortable");

              self.totalListCount = data.Count;
              self.pageStartIndex = skip + 1;
            }
          } else if (data === null) {
            self.policyLists = [];
            self.showToast("No data Available", self.TOST().WARNING);
          }
          // else {
          //   self.showToast(errMsg, self.TOST().WARNING);
          // }
        })
        .catch((err) => {
          self.showToast("Failed to fetch policy count", self.TOST().WARNING);
        });
    },

    getLobData() {
      return new Promise((approve, reject) => {
        let self = this;
        let access_list_fr = JSON.parse(localStorage.loginResp);
        let lob_list = JSON.stringify(access_list_fr.data.LOB);

        apiService("get", `/lob-list?productcodes=${lob_list}`, {})
          .then(function (response) {
            if (response.status == 200) {
              self.lobDataArray = response.data.data;
              self.newLobArray = self.lobDataArray;
              // self.lineOfBusiness = response.data.data[0];
              approve(true);
            } else {
              approve(response);
            }
          })
          .catch(function (error) {
            reject(error);
          });
      });
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

    onFilePicked(event) {
      console.log(event.target.files, "event");
      let self = this;
      self.selectFileData = event.target.files;
      console.log(self.selectFileData, "file");
      if (
        self.selectFileData[0].type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        if (Object.keys(self.selectFileData).length !== 0) {
          self.showToast("File Added Successfully", self.TOST().SUCCESS);
        }
      } else {
        self.showToast("Excel and CSV file allowed", self.TOST().WARNING);
      }
    },

    submitData() {
      let self = this;
      console.log("api call test");
      if (this.$refs.formdata.validate()) {
        console.log("api call test 2", self.selectFileData[0]);
        if (Object.keys(self.selectFileData).length !== 0) {
          if (self.selectFileData[0] !== undefined) {
            let formData = new FormData();
            formData.append("policies", self.selectFileData[0]);
            formData.append("insertionDate", self.expiryPeriodFrom);
            formData.append("productCode", self.productCode.text);
            console.log("newData1", self.productCode.text);
            formData.append("lobName", self.lineOfBusiness.NUM_IL_PRODUCT_NAME);
            console.log("newData2", self.lineOfBusiness);

            console.log(formData, "form Data");
            apiService(
              "post",
              `/update/warrenties-othergrid-data/Marine`,
              formData
            )
              .then(function (response) {
                console.log("uploadResponse", response);
                const { status, data, msg } = response.data;
                console.log("data", status, data);

                if (status == 200) {
                  let newData = data.data;
                  console.log("newData", newData);
                  self.showToast(
                    "File Uploaded Succesfully",
                    self.TOST().SUCCESS
                  );
                  // self.selectFileData = [];
                  // self.expiryPeriodFrom = "";
                  // self.productCode = "";
                  // self.lineOfBusiness = "";
                }
                if (data == "Success") {
                  self.showToast(
                    "File Submitted Successfully",
                    self.TOST().SUCCESS
                  );
                }
                // else {
                //  self.showToast("Please upload a proper file",this.TOST().WARNING);
                // }
              })
              .catch(function (error) {
                console.log("uploadError", error);
                if (error) {
                  console.log(error.response, "resp error");
                }
              });
          }
        }
      } else {
        this.showToast("Please Fill Required Fields", this.TOST().WARNING);
      }
    },

    selectedDateTost() {
      let self = this;
      if (self.expiryPeriodFrom || self.expiryPeriodTo) {
        alert(
          `The selected date is : ${
            self.expiryPeriodFrom || self.expiryPeriodTo
          } `
        );
      }
    },

    downloadPolicy() {
      this.dataLoader = true;
      let self = this;
      const payload = {
        insertionDate: self.expiryPeriodTo,
      };

      // const  access_list_fr = JSON.parse(localStorage.awsToken);

      // axios({
      //   method: "post",
      //   baseURL: "https://9h0d6g9kf2.execute-api.ap-south-1.amazonaws.com/prod",
      //   url: "/download-warranties-othergrid-details",
      //   headers: {
      //     // "Authorization": access_list_fr.token_type + ' ' + access_list_fr.access_token,
      //     "Content-Type": "application/json",
      //   },
      //   data: payload,
      // })
      //   .then((res) => {
      //     const { status, errMsg, data } = res.data;
      //     if (status === 200) {
      //       let newData = res.data;
      //       console.log(newData);
      //       this.downloadFileFromUrl(data, payload + "_" + ".xlxs");
      //       this.dataLoader = false;
      //     } else {
      //       self.showToast(errMsg, self.TOST().WARNING);
      //     }
      //   })
      //   .catch((err) => {
      //     self.showToast("Failed to due report", self.TOST().WARNING);
      //   });

      apiService("post", "/download-warranties-othergrid-details", payload)
        .then((res) => {
          const { status, message, data } = res.data;
          if (status === 200) {
            let newData = res.data;
            console.log(newData);
            this.downloadFileFromUrl(data, payload + "_" + ".xlxs");
            this.dataLoader = false;
          } else {
            self.showToast(message, self.TOST().WARNING);
          }
        })
        .catch((err) => {
          self.showToast("Failed to due report", self.TOST().WARNING);
        });
    },
    downloadFileFromUrl(url, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // this.$delete(link);
    },
  },
  computed: {
    currentDate() {
      return moment().format("YYYY-MM-DD");
    },
    previousDate() {
      return moment().subtract(this.noOfBackDays, "d").format("YYYY-MM-DD");
    },
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
<style scoped>
/* upload file button */
input[type="file"] {
  display: none;
}
.syncData {
  display: flex;
  float: right;
  margin-right: -150px;
}
.setDate {
  margin-left: 844px;
  /* float: right; */
  /* bottom: 60px; */
  /* background-color:#1e83c2;
  color: white; */
  text-transform: capitalize;
  height: 31px;
  border-radius: 4px;
}
.dropbtn {
  height: 31px;
  border-radius: 4px;
  color: white;
  text-transform: capitalize;
  font-size: 13px;
  top: 16px;
}
.paginationStyle {
  opacity: 1;
  padding: 2px;
  font-size: 12px;
}
.data-v-ed113400 {
  text-align: left !important;
}
.custom-header {
  text-align: left !important;
  background-color: #01afcb !important;
  color: white !important;
}
.clear-btn {
  color: #0073bb !important;
  background-color: #ffffff !important;
  border: 1.5px solid #ccc;
}
.update-btn {
  background-color: #0073bb;
  color: #ffffff !important;
  border: 1.5px solid #0073bb;
}
/* .v-progress-circular {
  margin-top:-500px;
  box-shadow: 10px 10px 10px 1000px rgba(54, 48, 48, 0.5) !important;
  background-color: rgba(54, 48, 48, 0.5);
  overflow: hidden;
} */
</style>

