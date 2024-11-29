<template>
  <v-app style="background-color: #b5c1c433">
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Excel Bulk Bucket Movement</v-text
      >
    </div>
    <v-card class="ma-3"
    style="cursor: auto;"
    >
      <v-divider class=""></v-divider>
      <v-form ref="formdata">
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
                  v-model="policyLOB"
                  :items="lobDataArray"
                  item-text="NUM_IL_PRODUCT_NAME"
                  item-value="NUM_IL_PRODUCT_CODE"
                  return-object
                ></v-select>

                <!-- <v-select
                  class="main_dropdown"
                  id="lineOfBusiness"
                  solo
                  hide-details
                  label="Select line of business"
                  v-model="policyLOB"
                  :items="lobDataArray"
                  item-text="NUM_IL_PRODUCT_NAME"
                  item-value="NUM_IL_PRODUCT_CODE"
                  return-object
                  @change="getPolicyCountData()"
                ></v-select> -->
              </v-flex>
              <!-- <template>
  <v-file-input
    v-model="file"
    color="deep-purple accent-4"
    counter
    label="File input"
    multiple
    placeholder="Select your files"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="deep-purple accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="text-overline grey--text text--darken-3 mx-2"
      >
        +{{ file.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
</template> -->
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Upload *
                </p>

                <!-- {{ file }} -->
                <v-flex
                  class="dm-fileContainer-bulk mt-1 mr-2"
                  style="border: 1px solid #c1c8cc; height: 38px"
                >
                  <label
                    for="myfile"
                    class="caption font-weight-medium"
                    style="margin-left: 5px; cursor: pointer"
                  >
                    {{
                      selectFileData
                        ? selectFileData[0].name
                        : "upload excel for bulk movement"
                    }}
                    <img
                      style="cursor: pointer"
                      class="ml-3"
                      src="../../../assets/upload.png"
                  /></label>
                  <!-- <v-file-input
  show-size
  truncate-length="15"
></v-file-input> -->
                  <input
                    hide-details="true"
                    type="file"
                    id="myfile"
                    name="myfile"
                    ref="imageUploader"
                    @click="resetImageUploader"
                    @change="onFilePicked"
                    style="z-index: -1; cursor: pointer"
                  />
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs1 class="ml-3">
            <p
              style="display: contents;"
              @click="
                downloadData(
                  'https://cv-ccm-releated-files.s3.ap-south-1.amazonaws.com/policies.xlsx'
                )
              "
            >
              <a>Sample File</a>
          </p>
          </v-flex>
        </v-layout>
      </v-form>

      <v-layout
        class="pa-2"
        style="position: relative; bottom: 15px; float: right"
      >
        <v-btn
          flat
          @click="clearUploadData()"
          class="ma-2 pa-3 clear-upload-btn"
          color="#646666"
          dark
          small
        >
          <v-divider vertical class="mr-2"></v-divider>
          Clear
        </v-btn>
        <v-btn
          flat
          @click="excelUploadHandler()"
          class="ma-2 pa-3 submit-upload-btn"
          color="#0073BB"
          dark
          small
        >
          <v-divider vertical class="mr-2"></v-divider>
          Submit
        </v-btn>
      </v-layout>
    </v-card>
    <v-flex class="d-flex mb-6" color="grey lighten-2" flat tile>
        <v-flex class="d-flex" color="grey lighten-2" flat tile>
          <v-flex class="pa-2" outlined tile style="display: flex">
            <v-text
              class="body-2 font-weight-bold mt-4"
              style="color: #1e83c2; margin-left: 20px"
              >Filtered By Created Date
            </v-text>
            <span>
              <p
                class="body-2 font-weight-bold"
                style="color: #e46a25; margin-left: 8px; margin-top: 23px"
              >
                {{
                  expiryDateFrom
                    ? expiryDateFrom.split("-")[0] +
                      "-" +
                      monthNames[parseInt(expiryDateFrom.split("-")[1]) - 1] +
                      "-" +
                      expiryDateFrom.split("-")[2]
                    : expiryDateFrom
                }}
                To
                {{
                  expiryDateTo
                    ? expiryDateTo.split("-")[0] +
                      "-" +
                      monthNames[parseInt(expiryDateTo.split("-")[1]) - 1] +
                      "-" +
                      expiryDateTo.split("-")[2]
                    : expiryDateTo
                }}
              </p>
            </span>
          </v-flex>
        </v-flex>
       
        <v-flex
          class="pa-2"
          outlined
          tile
          xs3
          style="max-width: 250px; right: 30px"
        >
          <p class="font-weight-bold mb-1 caption" style="color: #646666">
            Status*
          </p>
          <v-select
            class="main_dropdown"
            id="lineOfBusiness"
            solo
            hide-details
            v-model="selectedStatus"
            :items="statusOpt"
          ></v-select>
        </v-flex>

        <v-flex class="pa-2" outlined tile xs3 style="max-width: 232px">
          <p
            class="font-weight-bold mb-1 caption"
            style="color: #646666; margin-left: 15px"
          >
          Filter By Created Date *
          </p>
          <v-select
            solo
            hide-details
            class="main_dropdown"
            :items="expiryDate"
            item-text="text"
            item-value="value"
            label="YYYY/MM/DD"
            v-model="selectedDate"
            style="max-width: 180px; left: 15px"
            @input="getDateRange(true)"
            return-object
          >
          </v-select>
        </v-flex>
      </v-flex>
    <v-card class="ma-3">
      <div>
        <v-data-table
          :headers="headers"
          :items="tableData"
          hide-actions
          class="elevation-1 pa-4"
        >
          <template slot="items" slot-scope="props">
            <td
              v-for="item of headers"
              :key="item.text"
              class="text-xs-justify pr-2"
              style="background-color: #eff3f4"
            >
              <div v-if="item.value === 'TXT_POLICY_NO'">
                <a
                  @click.stop="
                    drawer = !drawer;
                    getPolicyDetailsByPolicyNo(props.item.TXT_POLICY_NO);
                  "
                  >{{ props.item.TXT_POLICY_NO }}</a
                >
              </div>
              <div
                v-if="item.value == 'ORIGINAL_FILE_PATH'"
                class="text-xs-left"
                style="background-color: #eff3f4; padding-left: 45px"
              >
                <p
                  style=""
                  @click="downloadData(props.item.ORIGINAL_FILE_PATH)"
                >
                  <a>DOWNLOAD</a>
                </p>
              </div>

              <div
                v-else-if="item.value == 'UPDATED_FILE_PATH'"
                class="text-xs-left"
                style="background-color: #eff3f4; padding-left: 45px"
              >
                <p
                  style=""
                  @click="downloadData(props.item.UPDATED_FILE_PATH)"
                  v-if="props.item.UPDATED_FILE_PATH"
                >
                  <a>DOWNLOAD</a>
                </p>
                <p v-else>-</p>
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
                Showing <b>{{ pageStartIndex }}</b> -
                <b>{{ pageEndIndex() }}</b></span
              >
              <span>
                out of <b>{{ totalListCount }}</b> records
              </span>
            </div>

            <v-pagination
              class="mr-4 mt-1 navpagenumber"
              v-model="pageNumber"
              color="#152F38"
              :length="getNoOfPages()"
              :total-visible="5"
              @input="nextPage($event)"
            >
            </v-pagination>
          </v-layout>
        </v-container>
      </div>
    </v-card>
     <!-- search date dropdown dailog -->
     <template>
      <v-dialog v-model="dialog1" persistent overlay scrollable max-width="400">
        <v-card tile>
          <v-toolbar dark style="background-color: #0073bb; height: 35px">
            <v-toolbar-title
              style="color: white; margin-bottom: 25px; font-size: 15px"
              >Select</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn
              icon
              light
              @click="closeCustom()"
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
                <v-flex xs3 class="ml-1 cust_pr">
                  <v-layout column class="dateRange">
                    <p
                      class="font-weight-bold mb-1 caption"
                      style="color: #646666"
                    >
                      From Date <span>*</span>
                    </p>
                    <v-menu
                      ref="calender"
                      v-model="expiryPeriodFromMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                      class="rounded-0"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          slot="activator"
                          label="YYYY/MM/DD"
                          :value="computedExpiryPeriodFrom"
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
                              right: -1px;
                              margin-top: -10px;
                              background-color: #f7f7f7;
                              margin-left: -12px;
                            "
                          >
                            <img
                              class="pa-1"
                              style="height: 35px"
                              src="../../../assets/date_24X24.png"
                            />
                          </div>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        @input="expiryPeriodFromMenu = false"
                        v-model="expiryDateFrom"
                        no-title
                      ></v-date-picker>
                    </v-menu>
                  </v-layout>
                </v-flex>
                <v-layout column class="ml-5 dateRange">
                  <v-flex xs3 class="ml-5 cust_pr dateRange">
                    <p
                      class="font-weight-bold mb-1 caption"
                      style="color: #646666"
                    >
                      To Date <span>*</span>
                    </p>
                    <v-menu
                      ref="calender"
                      v-model="expiryPeriodToMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                      class="rounded-0"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          slot="activator"
                          label="YYYY/MM/DD"
                          :value="computedExpiryPeriodTo"
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
                              right: -1px;
                              margin-top: -10px;
                              background-color: #f7f7f7;
                              margin-left: -12px;
                            "
                          >
                            <img
                              class="pa-1"
                              style="height: 35px"
                              src="../../../assets/date_24X24.png"
                            />
                          </div>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        @input="expiryPeriodToMenu = false"
                        v-model="expiryDateTo"
                        no-title
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-layout>
              <v-layout
                class="pa-2"
                style="position: relative; bottom: 15px; float: right"
              >
                <v-btn
                  flat
                  style="
                    width: 100px;
                    height: 30px;
                    background-color: #ffffff;
                    color: #646666;
                    border: 1.5px solid #ccc;
                    border-radius: 3px;
                  "
                  @click="clearAlldata()"
                  class="ma-2 pa-3"
                  color="#646666"
                  dark
                  small
                >
                  <v-divider vertical class="mr-2"></v-divider>Clear
                </v-btn>

                <v-btn
                  flat
                  style="
                    width: 100px;
                    height: 30px;
                    background-color: #0073bb;
                    color: #ffffff;
                    border: 1.5px solid #ccc;
                    border-radius: 4px;
                  "
                  class="ma-2 pa-3"
                  color="#0073BB"
                  dark
                  small
                  @click="
                    updateDateRange();
                    closeCustom();
                  "
                  >Update
                </v-btn>
              </v-layout>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
    </template>

    <template>
      <div class="text-xs-center txt-loader" v-if="dataLoader">
        <v-progress-circular :size="100" color="white" indeterminate
          >Loading...</v-progress-circular
        >
      </div>
    </template>
  </v-app>
</template>
  
  <script>
import moment from "moment";
import { cvApiPath } from "../../../common/API_Config";
import { apiService,dateRangeFilterOpn ,monthNames} from "../common/common";
import { excelMovementTable } from "../common/tableHeader";

export default {
  data() {
    return {
      selectedStatus: "ALL",
      statusOpt: ["ALL","STARTED","IN-PROGRESS","FAILED","COMPLETED"],
      dataLoader: false,
      selectFileData: null,
      headers: excelMovementTable,
      expiryDate: dateRangeFilterOpn,
      monthNames: monthNames,
      selectedDate: { text: "Next 3 Months", value: "N3M" },
      expiryDateFrom: "",
      expiryDateTo: "",
      expiryPeriodFromMenu: false,
      expiryPeriodToMenu: false,
      dialog1:false,
      limitValue: 15,
      offset: 0,
      tableData: [],
      pageStartIndex: 1,
      totalListCount: 10,
      pageNumber: 1,
      communicationSystemOpn: "",
      file: "",
      policyLOB:{},
      lobDataArray:[]
    };
  },
  created() {
    this.dataLoader = true;

    const awsToken = localStorage.awsToken;
    if (awsToken) {
      this.defaultFunction();
    } else {
      setTimeout(() => {
        this.defaultFunction();
      }, 3000);
    }
  },

  methods: {
    defaultFunction() {
      this.getLOBOption();
      this.getUserData();
      this.getDateRange(false);
      this.getExcelMovementHistory();
    },
    getUserData() {
      let userData = JSON.parse(localStorage.loginResp);
      const username = userData.data.USER_NAME;
      apiService("get", `/fetch/user?userName=${username}`, {})
        .then((res) => {
          if (res.status == 200) {
            const { data } = res.data;
            // console.log(data, "da");
            this.communicationSystemOpn = data.rng;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetImageUploader() {
      this.$refs.imageUploader.value = "";
    },
    pageEndIndex() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return this.pageStartIndex + this.limitValue <= this.totalListCount
          ? this.pageStartIndex + this.limitValue - 1
          : this.totalListCount;
      }
    },

    nextPage(e) {
      let skipData = e - 1;
      if (skipData === 0) {
        this.offset = 0;
        this.pageStartIndex = 1;
      } else {
        this.offset = this.limitValue * skipData;
        this.pageStartIndex = this.limitValue + 1;
      }
      this.getExcelMovementHistory();
    },
    getNoOfPages() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return Math.ceil(this.totalListCount / this.limitValue);
      }
    },
    clearUploadData() {
      this.policyLOB = {};
      this.selectFileData = null;
      this.file = "";
    },
    getLOBOption() {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let lob_list = JSON.stringify(access_list_fr.data.LOB);
      apiService("get", `/lob-list?productcodes=${lob_list}`, {})
        .then(function (response) {
          if (response.status == 200) {
            // self.lobDataArray = response.data.data.filter(
            //   (e) => e.PARENT_PRODUCT_NAME == "CV"
            // );
            let filteredLob = response.data.data.filter(
                (e) => e.PARENT_PRODUCT_NAME == "CV"
              );
              self.lobDataArray = filteredLob;
              self.policyLOB = filteredLob[0];
            self.dataLoader = false;
          } else {
            self.lobDataArray = [];
            self.dataLoader = false;
            self.policyLOB = {};
          }
        })
        .catch(function (error) {
          console.log(error,"erro")
          self.lobDataArray = [];
          self.policyLOB = {};
          self.dataLoader = false;
        });
    },
    onFilePicked(event) {
      console.log(event, "file");
      let self = this;
      if (
        event.target.files[0].type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        event.target.files[0].type == "text/csv"
      ) {
        self.selectFileData = event.target.files;
      } else {
        self.selectFileData = null;
        self.showToast(
          "Allowed only file type excel and CSV",
          self.TOST().WARNING
        );
      }
    },

    downloadData(uri) {
      var link = document.createElement("a");
      let date = new Date();
      link.download = "failed" + date + ".pdf";
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.$delete(link);
    },

    excelUploadHandler() {
      let self = this;
      if (self.selectFileData && self.policyLOB.NUM_IL_PRODUCT_NAME) {
        let user = JSON.parse(localStorage.loginResp);
        // console.log(user,"uyser")
        // console.log(this.selectFileData,user.data.USER_NAME ,this.policyLOB.NUM_IL_PRODUCT_NAME, "s");
        let formData = new FormData();
        formData.append("file", self.selectFileData[0]);
        formData.append("STAGE_NAME", self.policyLOB.NUM_IL_PRODUCT_NAME);
        formData.append("communicationSystem", self.communicationSystemOpn);
        formData.append("USERID", user.data.USER_NAME);
        self.dataLoader = true;
        apiService("post", cvApiPath.excelPoliciesMovement, formData)
          .then((res) => {
            if (res.data.status == 200) {
              self.showToast(
                "Excel policy movement started",
                self.TOST().SUCCESS
              );
              self.getExcelMovementHistory();
              self.clearUploadData();
              self.dataLoader = false;
            } else {
              self.getExcelMovementHistory();
              self.showToast(res.data.msg, self.TOST().WARNING);
              self.dataLoader = false;
            }
            console.log("res", res);
          })
          .catch((err) => {
            self.dataLoader = false;
            console.log("err", err);
          });
      } else {
        self.showToast("Please provide required field ", self.TOST().WARNING);
        self.dataLoader = false;
      }
    },
    getExcelMovementHistory(status = "ALL") {
      let self = this;
      let user = JSON.parse(localStorage.loginResp);
      self.dataLoader = true;
      apiService("post", `${cvApiPath.excelMovementHistory}`, {
        userId: user.data.USER_NAME,
        role: user.data.ROLE,
        limit: self.limitValue,
        offset: self.offset,
        status:status,
        startDate: self.expiryDateFrom
          ? self.expiryDateFrom 
          : "",
          endDate: self.expiryDateTo
          ? self.expiryDateTo 
          : "",
      })
        .then((res) => {
          self.tableData = res.data.data.response.Result.map((e) => {
            return {
              ...e,
              CREATED_DATE: moment(new Date(e.createdAt)).format(
                "YYYY-MM-DD h:mm:ss a"
              ),
              UPDATED_DATE: moment(new Date(e.updatedAt)).format(
                "YYYY-MM-DD h:mm:ss a"
              ),
            };
          });
          self.pageStartIndex = self.offset + 1;
          self.totalListCount = res.data.data.response.TotalCount;
          self.dataLoader = false;
          console.log(res, "res");
        })
        .catch((err) => {
          self.dataLoader = false;
          console.log(err, "err");
        });
    },
    getDateRange(triggerAPI) {
      let self = this;
      let now = new Date();

      if (self.selectedDate.value == "N2M") {
        let currentfirst = now.setMonth(now.getMonth());
        self.expiryDateFrom = moment(
          new Date(parseInt(currentfirst, 10))
        ).format("YYYY-MM-DD");

        let currentlast = now.setMonth(now.getMonth() + 2);
        self.expiryDateTo = moment(new Date(parseInt(currentlast, 10))).format(
          "YYYY-MM-DD"
        );
      } else if (self.selectedDate.value == "N3M") {
        let currentfirst = now.setMonth(now.getMonth());
        self.expiryDateFrom = moment(
          new Date(parseInt(currentfirst, 10))
        ).format("YYYY-MM-DD") ;

       
        let currentlast = now.setMonth(now.getMonth() + 3);
        self.expiryDateTo = 
        moment(new Date(parseInt(currentlast, 10))).format(
          "YYYY-MM-DD"
        );
      } 
      else if (self.selectedDate.value == "DR") {
        self.dialog1 = true;
      } 
      else if (self.selectedDate.value == "CM") {
        let y = now.getFullYear();
        let m = now.getMonth();
        let firstDay = new Date(y, m, 1, 0);
        self.expiryDateFrom = moment(firstDay).format("YYYY-MM-DD");
        let lastDay = new Date(y, m + 1, 0);
        self.expiryDateTo = moment(lastDay).format("YYYY-MM-DD");
      }
      if (triggerAPI && self.selectedDate.value != "DR") {
        self.getExcelMovementHistory(self.selectedStatus);
      } else {
        self.dataLoader = false;
      }
  
    },
    updateDateRange() {
      let self = this;
      if (self.expiryDateFrom == "" && self.expiryDateTo == "") {
        self.showToast("Please select any Date Range", self.TOST().WARNING);
      } else {
        if (self.expiryDateFrom > self.expiryDateTo) {
          self.showToast(
            "Please select a valid Date Range",
            self.TOST().WARNING
          );
        } else {
          self.dataLoader = true;
          self.dialog1 = false;
          this.getExcelMovementHistory(self.selectedStatus);
        }
      }
    },
    clearAlldata() {
      if (this.expiryDateFrom > this.expiryDateTo) {
        this.showToast("Please select a valid Date Range", this.TOST().WARNING);
      } else {
        this.$refs.formdata.reset();
        this.expiryDateFrom = "";
        this.expiryDateTo = "";
      }
    },
    closeCustom() {
      if (this.expiryDateFrom > this.expiryDateTo) {
        this.showToast("Please select a valid Date Range", this.TOST().WARNING);
      } else {
        this.dialog1 = false;
      }
    },

  },
  computed: {
    computedExpiryPeriodTo() {
      return this.expiryDateTo
        ? moment(this.expiryDateTo).format("YYYY-MM-DD")
        : "";
    },
    computedExpiryPeriodFrom() {
      return this.expiryDateFrom
        ? moment(this.expiryDateFrom).format("YYYY-MM-DD")
        : "";
    },
  },
  watch: {
    selectedStatus(newData, oldData) {
      this.getExcelMovementHistory(newData);
    },
 
  
  },
};

</script>
  
  <style>
.load {
  background-color: #fafafa;
  transition: inherit;
}
.v-card {
  cursor: pointer;
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
.submit-upload-btn {
  width: 100px;
  height: 35px;
  background-color: #0073bb !important;
  color: #ffffff !important;
  border: 1.5px solid #ccc !important;
  border-radius: 4px;
}

.clear-upload-btn {
  width: 100px;
  height: 35px;
  background-color: #ffffff !important;
  color: #646666 !important;
  border: 1.5px solid #ccc !important;
  border-radius: 3px;
}
.dropdown-content {
  display: none;
  position: absolute;
  top: 24px;
  left: -16px;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content p:hover {
  background-color: white;
  padding: 8px 7px 0px 12px;
}

.dropdown-content p {
  color: black;
  padding: 8px 7px 0px 12px;
  text-align: initial;
  text-decoration: none;
  display: block;
}
.dropbtn:hover .dropdown-content {
  display: block;
}

.dropuploadbtn {
  height: 31px;
  border-radius: 4px;
  background-color: #e46a25;
  color: white;
  text-transform: capitalize;
  font-size: 13px;
  top: 4px;
}
.dropdown-content-upload {
  display: none;
  position: absolute;
  top: 24px;
  right: -47px;
  background-color: white;
  min-width: 143px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content-upload p {
  color: black;
  padding: 8px 7px 0px 12px;
  text-align: initial;
  text-decoration: none;
  display: block;
}
.dropuploadbtn:hover .dropdown-content-upload {
  display: block;
}

.dateRange {
  width: 170px;
}
.v-input input {
  max-height: 32px;
}

#labelForUpload {
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 51px 0px 0px 0px;
  font-size: 15px;
}
.uploadDiv {
  margin: 0 auto;
  margin-top: 30px;
  height: 120px;
  width: 475px;
  background-color: rgb(238, 235, 235);
  outline: 1px dashed black;
}
.uploadDivCount {
  margin-top: 20px;
  height: 85px;
  width: 400px;
  margin-left: 16px;
  background-color: rgb(238, 235, 235);
}
input[type="file"] {
  display: none;
}

.dropdown:hover {
  display: block;
  margin-top: 0;
}

.breFailed {
  width: 450px;
  margin: 22px;
}
.table1::-webkit-scrollbar {
  width: 8px;
}

.table1 ::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.table1 ::-webkit-scrollbar-thumb {
  background: #606060;
  border-radius: 5px;
}

.highlight {
  border: 1px solid #01afcb;
  opacity: 1;
  /* width: 142px; */
  /* margin: -8px 0px 0px -8px; */
  /* height: 81px; */
  color: #01afcb;
  /* font-size: 8px !important; */
  background-image: linear-gradient(#ffffff, #e6e6e6);
  box-shadow: #0073bb4d;
}

.dropdown-action {
  display: none;
  position: absolute;
  bottom: -25px;
  right: 25px;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.dropdown-action p {
  top: 10px;
  color: black;
  padding: 8px 7px 0px 12px;
  text-align: initial;
  text-decoration: none;
  display: block;
  font-weight: 400;
  z-index: 1000;
}
.menubtn:hover .dropdown-action {
  display: block;
}
td input[type="text"] {
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: #ffffff;
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
.inbox-pos {
  display: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
td input[type="number"] {
  -moz-appearance: textfield;
}
*/ .main_dropdown .v-text-field.v-text-field--solo .v-input__control {
  min-height: 30px !important;
  max-height: 5px;
  border-radius: 5px;
}

.main_dropdown
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  border-radius: 5px;
  outline: solid 1px rgb(201, 201, 201);
}
.v-text-field.v-text-field--enclosed .v-input__append-inner,
.v-text-field.v-text-field--enclosed .v-input__append-outer,
.v-text-field.v-text-field--enclosed .v-input__prepend-inner,
.v-text-field.v-text-field--enclosed .v-input__prepend-outer {
  color: #606060;
  margin-right: -9px;
}
.auditTrail_table .theme--light.v-table tbody tr:nth-child(odd) {
  background-color: #e9eff7;
}

.auditTrail_table .theme--light.v-table tbody tr:nth-child(even) {
  background-color: #d1deef;
}

.auditTrail_table .v-table__overflow table thead tr th {
  background-color: #5b9bd5;
  color: white;
}
.table-bucketlabel {
  background-color: #01afcb;
  color: white;
  border-radius: 25px;
  font-size: 11px;
  font-weight: 400;
  padding: 4px;
  border-radius: 16px;
}
.bulk-action-select {
  max-width: 211px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
}
.table-col-policyNo {
  background-color: #eff3f4;
  padding: 10px;
  color: #0073bb;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
}
.view-btn-model {
  width: 112px;
  height: 35px;
  background-color: #0073bb;
  text-transform: capitalize;
  justify-content: start;
  right: 190px;
  color: #ffffff !important;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  justify-content: center;
}

.clear-btn-model {
  width: 100px;
  height: 35px;
  background-color: #ffffff;
  color: #646666 !important;
  border: 1.5px solid #ccc;
  border-radius: 3px;
  text-transform: capitalize;
}
.update-btn-model {
  width: 100px;
  height: 35px;
  background-color: #0073bb;
  color: #ffffff !important;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  text-transform: capitalize;
}

@media (min-width: 267.98px) {
  .bucket-card {
    width: 140px;
    height: 82px;
    max-width: 140px;
  }
  .card-lab {
    font-size: 9px;
  }
  .card-num {
    font-size: 16px;
  }
}

@media (min-width: 991.98px) {
  .bucket-card {
    width: 140px;
    height: 80px;
    max-width: 140px;
  }
  .card-lab {
    font-size: 9px;
  }
  .card-num {
    font-size: 16px;
  }
}

@media (min-width: 1199.98px) {
  .bucket-card {
    width: 150px;
    height: 85px;
    max-width: 150px;
  }
  .card-lab {
    font-size: 10px;
  }
  .card-num {
    font-size: 18px;
  }
}

@media (min-width: 1399px) {
  .bucket-card {
    width: 165px;
    height: 95px;
    max-width: 165px;
  }
  .card-lab {
    font-size: 12px;
  }
  .card-num {
    font-size: 20px;
  }
}
</style>
  