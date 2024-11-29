<template>
  <v-app style="background-color: #e8eeef">
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Upload Referred Cases</v-text
      >
    </div>
    <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
      <!-- <v-layout class="cardwhitebackclr pa-3" align-center style="">
                <div class="mr-3">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Upload Pre Extract</v-text>
                </div>
			</v-layout> -->

      <v-divider class=""></v-divider>
      <v-form ref="formdata">
        <v-layout>
          <v-container fluid>
            <v-flex>
              <div>
                <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
                  >Option for Referred cases
                </v-text>
                <input
                  v-model="batchPolicyRadio"
                  type="radio"
                  value="Batch Id"
                  style="margin-left: 13px; margin-top: 5px"
                  id="BatchId"
                />
                Batch Wise
                <input
                  v-model="batchPolicyRadio"
                  type="radio"
                  value="Policy No"
                  style="margin-left: 13px; margin-top: 5px"
                  id="PolicyNo"
                />
                Policy Wise
              </div>
            </v-flex>
          </v-container>
        </v-layout>

        <v-layout class="pl-3" xs12 row wrap>
          <v-flex xs12>
            <v-layout class="cust_pr">
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Line of Business *
                </p>
                <v-select
                  solo
                  label="Select"
                  v-model="uploadLOB"
                  :items="newLobArray || lobDataArray"
                  item-text="NUM_IL_PRODUCT_NAME"
                  item-value="NUM_IL_PRODUCT_CODE"
                  :rules="textRule"
                  return-object
                  @change="changeLobData(uploadLOB)"
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
                  v-model="uploadProdCode"
                ></v-select>
              </v-flex>
              <v-flex xs3 class="mr-3" v-if="batchPolicyRadio == 'Batch Id'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Batch Id *
                </p>
                <v-text-field
                  :disabled="batchPolicyRadio == 'Policy No'"
                  class="rounded-0"
                  solo
                  v-model="uploadBatchID"
                  label="Enter..."
                  :rules="textRule"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3 class="mr-3" v-if="batchPolicyRadio == 'Policy No'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Policy No
                </p>
                <v-text-field
                  :disabled="batchPolicyRadio == 'Batch Id'"
                  class="rounded-0"
                  solo
                  v-model="policyNumber"
                  label="Enter..."
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3 class="mr-3" v-if="batchPolicyRadio == 'Batch Id'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Upload *
                </p>
                <v-flex
                  class="mt-1 mr-2"
                  style="border: 1px solid #c1c8cc; height: 38px"
                >
                  <label
                    for="myfile1"
                    class="caption font-weight-medium"
                    style="margin-left: 5px; cursor: pointer"
                    >Uploading Via Browsing
                  </label>
                  <img class="ml-3" src="../../assets/upload.png" />
                  <!-- <v-icon style="cursor:pointer" right>publish</v-icon> -->

                  <input
                    hide-details
                    type="file"
                    ref="fileref"
                    id="myfile1"
                    name="myfile"
                    @change="onFilePicked"
                  />
                  <!-- accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" -->
                </v-flex>
              </v-flex>
              <v-flex xs3 class="mr-3" v-if="batchPolicyRadio == 'Policy No'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Upload *
                </p>
                <v-flex
                  class="mt-1 mr-2"
                  style="border: 1px solid #c1c8cc; height: 38px"
                >
                  <label
                    for="myfile"
                    class="caption font-weight-medium"
                    style="margin-left: 5px; cursor: pointer"
                    >Uploading Via Browsing
                  </label>
                  <img class="ml-3" src="../../assets/upload.png" />
                  <!-- <v-icon style="cursor:pointer" right>publish</v-icon> -->

                  <input
                    hide-details
                    type="file"
                    ref="fileref"
                    id="myfile"
                    name="myfile"
                    @change="onFilePicked"
                  />
                  <!-- accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" -->
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout class="pl-3" xs12 row wrap>
          <v-flex>
            <v-layout
              style="margin-left: 0px"
              column
              class="cust-rmvpd-pr cust_pr"
            >
              <p class="font-weight-bold mb-1 caption" style="color: #646666">
                Remarks
              </p>
              <v-text-field
                style="width: 310px; height: 10px"
                class="rounded-0"
                solo
                label="Enter..."
                maxlength="15"
                v-model="remarkData"
                autocomplete="off"

              ></v-text-field>
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
          @click="clearUploadData()"
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
          @click="submitStatusData()"
          class="ma-2 pa-3"
          color="#0073BB"
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
        label="Search"
        single-line
        class="mb-1"
        style="width: 20%; padding: 10px"
        hide-details
        @keyup="getTableData('15', 0, true)"
      ></v-text-field>
      <button
        @click="searchData()"
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
      <div>
        <v-data-table
          :headers="headers"
          :items="Tabledata"
          v-bind:pagination.sync="pagination"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left truncate" style="background-color: #eff3f4">
              {{ props.item.JOB_ID }}
            </td>
            <td class="text-xs-left truncate" style="background-color: #eff3f4">
              {{ props.item.LOB_NAME }}
            </td>
            <td class="text-xs-left truncate" style="background-color: #eff3f4">
              {{ props.item.UPDATE_TIMESTAMP }}
            </td>

            <td
              class="text-xs-left truncate"
              style="
                background-color: #eff3f4;
                display: flex;
                align-items: center;
              "
            >
              {{ props.item.REMARKS }}
              <v-icon
                slot="activator"
                v-if="props.item.REMARKS == undefined"
                small
                >info</v-icon
              >
            </td>
            <!-- <td class="text-xs-left" style="background-color:#EFF3F4">
                            <p v-if="props.item.IPDS_STATUS === 'Success'" class="classSuccess">{{props.item.IPDS_STATUS}}</p>
                            <p v-if="props.item.IPDS_STATUS === 'Failed'" class="classFailed">{{props.item.IPDS_STATUS}}</p>
                            <p v-if="props.item.IPDS_STATUS === 'In Progress'" class="classProgress">{{props.item.IPDS_STATUS}}</p>
                            <p v-if="props.item.IPDS_STATUS === 'Submitted'" class="classProgress">{{props.item.IPDS_STATUS}}</p>
                        </td> -->
            <!-- <td class="text-xs-left" style="background-color:#EFF3F4">{{props.item.IPDS_SUCCESS_COUNT}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4">{{props.item.IPDS_ERROR_COUNT}}</td> -->
            <td
              class="text-s-center"
              style="background-color: #eff3f4; padding-left: 59px"
            >
              {{ props.item.POLICY_COUNT }}
            </td>
            <!-- <td class="text-xs-left" style="background-color:#EFF3F4">{{props.item.UPLOADED_STATUS}}</td> -->
            <td
              v-if="props.item.hidePrevIcon == true"
              class="text-xs-left"
              style="background-color: #eff3f4; padding-left: 4px"
            >
              <div
                v-if="props.item.hidePrevIcon == true"
                class="ml-3"
                style="display: flex; cursor: pointer"
              >
                DOWNLOAD
                <img
                  @click="
                    downloadData(
                      props.item.JOB_ID,
                      props.item.LOB_NAME,
                      props.item.REFERRED_DOWNLOAD_FILE_LINK
                    )
                  "
                  class="export-icon ml-2"
                  src="../../assets/downloadicon.png"
                />
              </div>
              <div v-else style="display: flex">
                _
                <v-tooltip left class="ml-2">
                  <v-icon slot="activator" small>info</v-icon
                  ><span>Only Success cases can be downloaded!</span>
                </v-tooltip>
              </div>
            </td>
            <!-- props.item.UW_REFERRAL_CHECK=='Reffered' -->
            <!-- <td v-if="props.item.showDownloadIcon == true" class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center">DOWNLOAD
                            <div v-if="props.item.showDownloadIcon == true" class="ml-3" style="display:flex;cursor:pointer">
                                <img @click="downloadData(props.item.JOB_ID,props.item.LOB_NAME,props.item.FILE_URL)" class="export-icon-down" src="../../assets/downloadicon.png">
                            </div>
                        </td> -->
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
  </v-app>
</template>
<script>
import axios from "axios";
import moment from "moment";
import { oAuthURl, BaseURl, tokenCred } from "../../common/API_Config";
import { userPermissionValidator } from "./validator/permissionValidator";

let tokenDataObj = null;
let lastjobid = "";

export default {
  data() {
    return {
      accessPermission: {},
      showFields: true,
      uploadFile: "",
      batchPolicyRadio: "Batch Id",
      policyBatch: ["Policy No", "Batch Id"],
      lineOfBusiness: "",
      parentProductName: "",
      policyNumber: "",
      policies: "",
      jobBatchStartDateFrom: "",
      jobBatchStartDateTo: "",
      textRule: [(v) => !!v || "This Field is required"],
      selectFileData: {},
      fileName: "",
      dataLoader: false,
      batchIDData: "",
      uploadLOB: "",
      uploadProdCode: "",
      uploadBatchID: "",
      uploadBatchStartDate: "",
      uploadBatchStartDateMenu: "",
      jobBatchStartDateMenuFr: "",
      jobBatchStartDateMenuTo: "",
      lobDataArray: [],
      newLobArray: [],
      prodCodeArray: [],
      searchText: "",
      remarkData: "",

      //     data:{
      //         uploadBatchID:'',
      //         policyNumber:''
      // },
      headers: [
        {
          text: "Batch ID",
          value: "JOB_ID",
        },
        { text: "LOB", value: "LOB_NAME" },
        { text: "Job Sched Date/Time", value: "UPDATE_TIMESTAMP" },
        { text: "Remarks", value: "REMARKS" },
        // { text: 'Status', value: 'IPDS_STATUS' },
        // { text: 'Success Count', value: 'IPDS_SUCCESS_COUNT' },
        // { text: 'Error Count', value: 'IPDS_ERROR_COUNT' },
        { text: "Policy Count", value: "POLICY_COUNT" },
        // {text:'Uploaded Status',value:'UPLOADED_STATUS'},
        { text: "Actions", sortable: false, value: "Actions" },
      ],
      pagination: {
        rowsPerPage: 15,
      },

      search: "",
      selected: [],
      Tabledata: [],
      skipdiffrence: this.paginationdiff(),
      skip: 0,
      pageNumber: 1,
      pagelength: 1,
      tokenData: {},
      page: 1,
      pageStartIndex: 1,
      pageRowCount: 15,
      totalListCount: 0,
      IsFilter: false,
      searchFlag: false,
    };
  },

  created() {
    this.$store.commit("SET_PAGE_TITLE", "Upload Pre Extract");
    this.getToken();
    this.accessPermission = userPermissionValidator("FR14");
  },

  methods: {
    onFilePicked(event) {
      console.log(event.target.files, "event");
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
          // self.selectFileData={}
          // console.log(self.selectFileData[0].name,"file data")
        }
      } else {
        self.showToast("Excel and CSV file allowed", self.TOST().WARNING);
      }
    },

    // onChange(event) {
    //       var data = event.target.value;
    //       console.log(data);
    //   },

    clearUploadData() {
      let self = this;
      self.$refs.formdata.reset();
      // self.selectFileData = {},
      self.uploadLOB = "";
      self.uploadProdCode = "";
      self.batchId = "";
      self.policyNumber = "";
      self.selectFileData = [];
      self.remarkData = "";
    },
    searchData() {
      let self = this;
      this.dataLoader = true;
      setTimeout(() => {
            this.dataLoader = false;
            self.getTableData("15", this.skip, this.searchFlag = false);
            }, 3000);
      this.searchText="";      

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
            // console.log('POST__TOKEEENNN__RSPPPPPPP' , tokenDataObj)
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
        this.uploadProdCode = this.prodCodeArray[0];
      } else if (lob.NUM_IL_PRODUCT_CODE == 3189) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "gcv",
        });
        this.uploadProdCode = this.prodCodeArray[0];
      } else if (lob.NUM_IL_PRODUCT_CODE == 3191) {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: "mcv",
        });
        this.uploadProdCode = this.prodCodeArray[0];
      } else {
        this.prodCodeArray.push({
          text: lob.NUM_IL_PRODUCT_CODE,
          value: lob.NUM_IL_PRODUCT_NAME,
        });
        this.uploadProdCode = this.prodCodeArray[0];
      }
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

    addNewIcon(item, url) {
      let self = this;
      self.showToast(
        "Your report is being ready. please wait for some time",
        self.TOST().SUCCESS
      );
      axios({
        method: "get",
        url: BaseURl + "/notice-regeneration/policy-download/" + item.JOB_ID,
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("GETTTT___DOWNLOAD RESPONSE:::", response);
          if (response.status === 200) {
            setTimeout(() => {
              console.log(url);
              if (url != undefined) {
                console.log("check");
                self.Tabledata.map((el) => {
                  el.JOB_ID === item.JOB_ID ? (el.showDownloadIcon = true) : "";
                });
              }
              if (url != undefined) {
                self.Tabledata.map((el) => {
                  el.JOB_ID === item.JOB_ID ? (el.hidePrevIcon = false) : "";
                });
              }
            }, 5000);
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
    },

    downloadData(batchId, lobName, url) {
      console.log("request ", batchId, url);
      var link = document.createElement("a");
      link.href = url;
      link.style = "visibility:hidden";
      link.download = batchId + "_" + lobName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    submitStatusData() {
      let self = this;
      console.log("api call test");
      if (this.$refs.formdata.validate()) {
        console.log("api call test 2", self.selectFileData);
        if (Object.keys(self.selectFileData).length !== 0) {
          if (self.selectFileData[0] !== undefined) {
            let formData = new FormData();
            formData.append("lobName", self.uploadLOB.NUM_IL_PRODUCT_NAME);
            console.log(self.uploadLOB, "lob name");
            formData.append(
              "parentProductName",
              self.uploadLOB.PARENT_PRODUCT_NAME
            );
            formData.append("policies", self.selectFileData[0]);
            formData.append("remarks", self.remarkData);
            console.log(self.remarkData, "remarks");
            if (document.getElementById("BatchId").checked) {
              formData.append("batchId", self.uploadBatchID);
            } else {
              formData.append("policyNumber", self.policyNumber);
            }
            console.log(formData, "form Data");

            axios({
              method: "post",
              url: BaseURl + "/updated-policy-upload",
              headers: {
                Authorization:
                  tokenDataObj.token_type + " " + tokenDataObj.access_token,
                "Content-Type": "application/json",
              },
              data: formData,
            })
              .then(function (response) {
                console.log(response.data, "travel referred resp");
                if (response.data.status === 200) {
                  self.showLoader("Loading", false);
                  self.showToast("Submitted Successfully", self.TOST().SUCCESS);
                  self.clearUploadData();
                  self.uploadLOB.PARENT_PRODUCT_NAME = "";
                  self.policyNumber = "";
                  self.uploadLOB = "";
                  self.uploadProdCode = "";
                  self.uploadBatchID = "";
                  self.selectFileData = [];
                }
              })
              .catch(function (error) {
                if (error) {
                  console.log(error.response, "resp error");
                  self.showLoader("Loading", false);
                  self.showToast(
                    error.response.data.message,
                    self.TOST().ERROR
                  );
                  self.uploadLOB.PARENT_PRODUCT_NAME = "";
                  self.policyNumber = "";
                  self.uploadLOB = "";
                  self.uploadProdCode = "";
                  self.uploadBatchID = "";
                  self.selectFileData = [];
                }
              });
          }
        }
        // else{
        //     self.showToast("Please Select file to upload" , self.TOST().WARNING);
        // }
      } else {
        this.showToast("Please Fill Required Fields", this.TOST().WARNING);
      }
    },
    nextPage(e) {
      console.log("e", e);
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

    getTableData(limitvalue, skip, searchFlag = false) {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let access_list = access_list_fr.data;
      let role = access_list.ROLE;
      let lob = self.newLobArray[0].PARENT_PRODUCT_NAME;
      let parent_product_name;
      // console.log(self.newLobArray[0].PARENT_PRODUCT_NAME);
      if (role == "admin" || role == "user") {
        // parent_product_name = self.newLobArray[0].PARENT_PRODUCT_NAME;
        parent_product_name = lob;
      } else if (role == "super-admin") {
        parent_product_name = "";
      }
      console.log("gettabledata");
      console.log(self.uploadLOB.PARENT_PRODUCT_NAME);
      searchFlag = self.searchText == "" ? false : true;
      if (searchFlag && self.searchText != "" && self.searchText.length > 2) {
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
            moduleName: "referred",
            parentProductName: "Travel",
            batchid_or_policyno: self.searchText,
            searchFlag: true,
          },
        })
          .then(function (response) {
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            for (let i = 0; i < _respData.length; i++) {
              if (_respData[i].LOB_NAME) {
                let update = moment(
                  new Date(parseInt(_respData[i].UPDATE_TIMESTAMP, 10))
                ).format("YYYY-MM-DD hh:mm:SS A");
                console.log(update, _respData[i].UPDATE_TIMESTAMP, "updated");
                let _finalData = {
                  IPDS_ERROR_COUNT: _respData[i].IPDS_ERROR_COUNT,
                  REFERRED_DOWNLOAD_FILE_LINK:
                    _respData[i].REFERRED_DOWNLOAD_FILE_LINK,
                  JOB_ID: _respData[i].BATCH_ID_OR_POLICY_NUMBER,
                  LOB_NAME: _respData[i].LOB_NAME,
                  UPDATE_TIMESTAMP: update,
                  POLICY_COUNT: _respData[i].POLICY_COUNT,
                  IPDS_SUCCESS_COUNT: _respData[i].IPDS_SUCCESS_COUNT,
                  PARENT_PRODUCT_NAME: _respData[i].PARENT_PRODUCT_NAME,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS: _respData[i].REMARKS,
                  UPDATE_STAGE: _respData[i].UPDATE_STAGE,
                  IPDS_STATUS: _respData[i].IPDS_STATUS,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  //     CSV_DATA :_respData[i].TXT_POLICY_LIST.length == 0 || _respData[i].TXT_POLICY_LIST == '' ? [] : _respData[i].TXT_POLICY_LIST.map(function(el) {
                  //  let _data = {
                  //     'Parent product name':_respData[i].PARENT_PRODUCT_NAME,
                  //     'Product name' : _respData[i].LOB_NAME,
                  //     'Policy no' : el.TXT_POLICY_NO,
                  //     'Previous policy start date' : el.DAT_PREVIOUSPOLICYSTARTDATE,
                  //     'Previous policy End date' : el.DAT_PREVIOUSPOLICYENDDATE,
                  //     'Customer name' : el.TXT_CLIENT_NAME,
                  //     'Status (Success/Failed)' : el.status,
                  //     'Reason for Error' : el.hasOwnProperty('message') ? el.message : '',
                  // }
                  // if(_respData[i].PARENT_PRODUCT_NAME == 'Travel'){
                  // return _data
                  // }
                  // }),
                  //         TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                };
                self.Tabledata.unshift(_finalData);
              }
              // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata)
            }

            console.log("DATA Tabledata_______:::", self.Tabledata);

            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.JOB_ID
              : "";
            let totalCount = response.data.data.Count;
            self.totalListCount = response.data.data.Count;
            // self.pagelength = Math.ceil(totalCount/self.skipdiffrence)
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
            moduleName: "referred",
            parentProductName: parent_product_name,
            // parentProductName: productID == 42 || productID == 43 ? "Travel" : " ",
          },
        })
          .then(function (response) {
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            for (let i = 0; i < _respData.length; i++) {
              if (_respData[i].LOB_NAME) {
                let update = moment(
                  new Date(parseInt(_respData[i].UPDATE_TIMESTAMP, 10))
                ).format("YYYY-MM-DD hh:mm:SS A");
                console.log(update, _respData[i].UPDATE_TIMESTAMP, "updated");
                let _finalData = {
                  IPDS_ERROR_COUNT: _respData[i].IPDS_ERROR_COUNT,
                  REFERRED_DOWNLOAD_FILE_LINK:
                    _respData[i].REFERRED_DOWNLOAD_FILE_LINK,
                  JOB_ID: _respData[i].BATCH_ID_OR_POLICY_NUMBER,
                  LOB_NAME: _respData[i].LOB_NAME,
                  UPDATE_TIMESTAMP: update,
                  POLICY_COUNT: _respData[i].POLICY_COUNT,
                  IPDS_SUCCESS_COUNT: _respData[i].IPDS_SUCCESS_COUNT,
                  PARENT_PRODUCT_NAME: _respData[i].PARENT_PRODUCT_NAME,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS: _respData[i].REMARKS,
                  UPDATE_STAGE: _respData[i].UPDATE_STAGE,
                  IPDS_STATUS: _respData[i].IPDS_STATUS,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  //     CSV_DATA :_respData[i].TXT_POLICY_LIST.length == 0 || _respData[i].TXT_POLICY_LIST == '' ? [] : _respData[i].TXT_POLICY_LIST.map(function(el) {
                  //  let _data = {
                  //     'Parent product name':_respData[i].PARENT_PRODUCT_NAME,
                  //     'Product name' : _respData[i].LOB_NAME,
                  //     'Policy no' : el.TXT_POLICY_NO,
                  //     'Previous policy start date' : el.DAT_PREVIOUSPOLICYSTARTDATE,
                  //     'Previous policy End date' : el.DAT_PREVIOUSPOLICYENDDATE,
                  //     'Customer name' : el.TXT_CLIENT_NAME,
                  //     'Status (Success/Failed)' : el.status,
                  //     'Reason for Error' : el.hasOwnProperty('message') ? el.message : '',
                  // }
                  // if(_respData[i].PARENT_PRODUCT_NAME == 'Travel'){
                  // return _data
                  // }
                  // }),
                  //         TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                };
                self.Tabledata.unshift(_finalData);
              }
              // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata)
            }

            console.log("DATA Tabledata_______:::", self.Tabledata);

            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.JOB_ID
              : "";
            let totalCount = response.data.data.Count;
            self.totalListCount = response.data.data.Count;
            // self.pagelength = Math.ceil(totalCount/self.skipdiffrence)
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
      return this.uploadBatchStartDate
        ? moment(this.uploadBatchStartDate).format("DD-MM-YYYY")
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
  /* color: black; */
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
/* upload file button */
input[type="file"] {
  display: none;
}

.myfileUpload {
  cursor: pointer;
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