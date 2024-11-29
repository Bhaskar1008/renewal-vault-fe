<template>
  <v-app style="background-color: #e8eeef">
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Upload Pre Extract</v-text
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
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Batch ID
                </p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="uploadBatchID"
                  label="Enter..."
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3 class="mr-3">
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
                    >Uploading Via Browsing
                    <img @change="onFilePicked($event)"  style="cursor: pointer" class="ml-3" src="../../assets/upload.png"  /></label
                  >
                  <!-- <v-text class="caption font-weight-medium" id="uploadText1">{{selectFileData[0].name}}</v-text> -->
                  <!-- <v-icon style="cursor:pointer" right>publish</v-icon> -->
                   
                  
                  <input
                    hide-details="true"
                    type="file"
                    ref="fileref"
                    id="myfile"
                    name="myfile"
                    @change="onFilePicked"
                    style="z-index: -1; cursor: pointer"
                  />
                  
                  <!-- <div class="fileinputs">
	                                    <input type="file" class="file" />
	                                  <div class="fakefile">
                                         <label>file{{self.selectFileData[i].name}}</label> 
		                                
		                                <img class="ml-3" src="../../assets/upload.png" />
	                                  </div>
                                    </div> -->
                  <!-- <v-file-input label="File input" filled prepend-icon="mdi-camera"></v-file-input>
                                     -->
                  <!-- accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" -->
                </v-flex>
                <!-- <label>File - <b>{{  selectFileData[0] || selectFileData[0].name  }}</b></label>  -->

              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- <v-layout class="pl-3" xs12 row wrap>
                <v-flex xs3 class="mr-3">
                            <v-layout column class="cust_pr">
                                <p class="font-weight-bold mb-1 caption" style="color:#646666">Job Scheduled Date From</p>
                                <v-menu
                                    ref="calender"
                                    :close-on-content-click="false"
                                    v-model="jobBatchStartDateMenuFr"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    max-width="290px"
                                    min-width="290px" 
                                    class="rounded-0 ">
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
                                            v-on="on">
                                        <div  slot="prepend-inner" style="position:relative;right:12px;background-color:#F7F7F7"><img class="pa-1" style="height:35px" src="../../assets/date_24X24.png"/></div></v-text-field>
                                    </template>
                                    <v-date-picker @input="jobBatchStartDateMenuFr = false" v-model="jobBatchStartDateFrom" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <v-layout column class="cust_pr">
                                <p class="font-weight-bold mb-1 caption" style="color:#646666">Job Scheduled Date To</p>
                                <v-menu
                                    ref="calender"
                                    :close-on-content-click="false"
                                    v-model="jobBatchStartDateMenuTo"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    max-width="290px"
                                    min-width="290px" 
                                    class="rounded-0 ">
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
                                            v-on="on">
                                        <div  slot="prepend-inner" style="position:relative;right:12px;background-color:#F7F7F7"><img class="pa-1" style="height:35px" src="../../assets/date_24X24.png"/></div></v-text-field>
                                    </template>
                                    <v-date-picker @input="jobBatchStartDateMenuTo = false" v-model="jobBatchStartDateTo" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                        </v-flex>
            </v-layout> -->
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
                style="width: 308px; height: 10px"
                class="rounded-0 caption"
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
        class="mb-4"
        style="width: 20%"
        hide-details
        @input="getTableData('15', 0, true)"
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
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.JOB_ID }}
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.LOB_NAME }}
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
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
              {{ props.item.REMARKS ? props.item.REMARKS : "-" }}
              <v-tooltip left class="ml-2" style="display: flex">
                <v-icon
                  slot="activator"
                  v-if="props.item.REMARKS == undefined"
                  small
                  >info</v-icon
                ><span>{{ props.item.REMARKS ? props.item.REMARKS : "-" }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              <p
                v-if="props.item.JOB_STATUS === 'Success'"
                class="classSuccess"
              >
                {{ props.item.JOB_STATUS || props.item.RN_STATUS  }}
              </p>
              <p v-if="props.item.JOB_STATUS === 'Failed' || props.item.RN_STATUS === 'Failed' " class="classFailed">
                {{ props.item.JOB_STATUS || props.item.RN_STATUS  }}

              </p>
              <p
                v-if="props.item.JOB_STATUS === 'In Progress ' || props.item.RN_STATUS === 'Pending' "
                class="classProgress"
              >
                {{ props.item.JOB_STATUS || props.item.RN_STATUS  }}

              </p>
              <p
                v-if="props.item.JOB_STATUS === 'Submitted' || props.item.RN_STATUS === 'Submitted'"
                class="classProgress"
              >
                {{ props.item.JOB_STATUS || props.item.RN_STATUS  }}

              </p>
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.IPDS_SUCCESS_COUNT }}
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.IPDS_ERROR_COUNT }}
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.POLICY_COUNT }}
            </td>
        
            <td
              v-if="props.item.hidePrevIcon == true"
              class="text-xs-left"
              style="
                background-color: #eff3f4;
                display: flex;
                align-items: center;
                color: rgb(28, 175, 203);
              "
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
                      props.item.FILE_URL
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
          </template>
        </v-data-table>

        <!-- <div class="text-xs-center pt-2"></div>
                    <v-pagination v-model="pageNumber" color="#152F38" flat :length="pagelength" @input="nextPage($event)"></v-pagination>
                </div> -->
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
        <template>
          <div class="text-xs-center txt-loader" v-if="dataLoader">
            <v-progress-circular :size="100" color="white" indeterminate
              >Loading...</v-progress-circular
            >
          </div>
        </template>
      </div>
    </v-card>
  </v-app>
</template>
<script>
import axios from "axios";
import moment from "moment";
import { BaseURl, oAuthURl, tokenCred } from "../../common/API_Config";
import {
  usernameFromLocalStorage,
  userPermissionValidator,
} from "./validator/permissionValidator";

let tokenDataObj = null;
let lastjobid = "";

export default {
  data() {
    return {
      accessPermission: {},
      jobBatchStartDateFrom: "",
      jobBatchStartDateTo: "",
      textRule: [(v) => !!v || "This Field is required"],
      selectFileData: {},
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
      headers: [
        { text: "Batch ID", value: "JOB_ID" },
        { text: "LOB", value: "LOB_NAME" },
        { text: "Job Sched Date/Time", value: "UPDATE_TIMESTAMP" },
        { text: "Remarks", value: "REMARKS" },
        { text: "Status", value: "IPDS_STATUS" },
        { text: "Success Count", value: "IPDS_SUCCESS_COUNT" },
        { text: "Error Count", value: "IPDS_ERROR_COUNT" },
        { text: "Policy Count", value: "POLICY_COUNT" },
        { text: "Actions", sortable: false, value: "Actions" },
      ],
      pagination: {
        rowsPerPage: 15,
      },
      dataLoader: false,
      search: "",
      selected: [],
      Tabledata: [],
      skipdiffrence: this.paginationdiff(),
      skip: 0,
      pageNumber: 1,
      pagelength: 1,
      setDownload: false,
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
    this.accessPermission = userPermissionValidator("FR5");
  },

  methods: {
    onFilePicked(event) {
      let self = this;
      console.log(event,"file");
      self.selectFileData = event.target.files;
      console.log(self.selectFileData, "file");
      // if(self.selectFileData[0].name){
      //     document.getElementById("uploadText").style.display="none"
      // }else{
      //     // document.getElementById("uploadText1").style.display="flex"
      // }

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
    searchData() {
      this.dataLoader = true;
      let self = this;
      this.searchText = ""
      setTimeout(() => {
            this.dataLoader = false;
            self.getTableData("15", this.skip, this.searchFlag = false);
            }, 3000);

    },

    clearUploadData() {
      let self = this;
      self.$refs.formdata.reset();
      // self.uploadLOB = ''
      // self.uploadProdCode = ''
      // self.uploadBatchID = ''
      self.selectFileData = {};
    },

    nextPage(e) {
      let skipdata = e - 1;
      // skipdata === 0 ? this.skip = 0 : this.skip = this.skipdiffrence*skipdata

      if (skipdata === 0) {
        this.skip = 0;
        this.pageStartIndex = 1;
      } else {
        this.skip = this.pageRowCount * skipdata;
        this.pageStartIndex = this.pageRowCount + 1;
      }
      this.getTableData("15", this.skip, (this.searchFlag = false));
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
      // this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:lob.NUM_IL_PRODUCT_NAME})
      // this.uploadProdCode = this.prodCodeArray[0]
      // console.log('LOBBB @CHANGE ____________________',lob)
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
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let lob_list = JSON.stringify(access_list_fr.data.LOB);
      let self = this;
      let _head = {
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
      };
      axios
        .get(`${BaseURl}/lob-list?productcodes=${lob_list}`, _head)
        .then(function (response) {
          // console.log('RESPPPPPP____________________',response)
          if (response.status == 200) {
            self.lobDataArray = response.data.data;
            self.newLobArray = self.lobDataArray;
            console.log(self.newLobArray, "newlobarray");

            return true;
            // for (let i = 0; i < self.lobDataArray.length; i++) {
            //         if (productID == 42 || productID ==43) {
            //             console.log(" inside for loop", self.lobDataArray[i].PARENT_PRODUCT_NAME)
            //             if (self.lobDataArray[i].PARENT_PRODUCT_NAME == "Travel") {
            //                 self.newLobArray.push(self.lobDataArray[i])
            //                 console.log("after pushing into array", self.newLobArray)
            //              }}
            //         else {
            //             self.newLobArray = self.lobDataArray
            //         }}
            // console.log(self.newLobArray, "newlobarray")
          } else {
            return response;
          }
        })
        .catch(function (error) {
          return error;
        });
    },

    addNewIcon(item, batchId, url) {
      let self = this;
      console.log(" request ", item, url, batchId);
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
          console.log("GETTTT___DOWNLOAD RESPONSE:::", response.data.data);
          if (response.status === 200) {
            setTimeout(() => {
              console.log("table", self.Tabledata);
              if (response.data.data) {
                self.Tabledata.map((el) => {
                  el.JOB_ID === item.JOB_ID ? (el.showDownloadIcon = true) : "";
                });
                self.Tabledata.map((el) => {
                  el.JOB_ID === item.JOB_ID ? (el.hidePrevIcon = false) : "";
                });
                self.Tabledata.map((el) => {
                  el.JOB_ID === item.JOB_ID
                    ? (el.FILE_URL = response.data.data)
                    : "";
                });
              } else {
                self.showToast(
                  "Your report is not generated",
                  self.TOST().ERROR
                );
              }
            }, 5000);
          }
        })
        .catch(function (error) {
          if (error) {
            // clearInterval(clearIntervalTime);
            self.showToast(
              "Something went wrong, Please try again",
              self.TOST().ERROR
            );
          }
        });

      // ----------------------
      // axios({
      //     method: "get",
      //     url:"BaseURl +"
      // /policy-download/"+ batchId,
      //     headers: {
      //         "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
      //         "Content-Type": "application/json",
      //     },
      // }).then(function (response) {
      //     console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
      //     this.fileLinkUrl = response.data.fileURL;
      //     if(response.data.status === 200){
      //         // self.JSONToCSVConvertor(response.data.data,batchId+'_'+lobName,true)
      //         console.log('GETTTT___DOWNLOAD RESPONSE:::',response);

      //     }
      // }).catch(function (error) {});

      // var clearIntervalTime = setInterval(() => {
      //     axios({
      //     method: "get",
      //     url: "https://397611673480-renewal-vault-docs.s3.ap-south-1.amazonaws.com/1626160431-MotorCommercialGCV.csv",
      //     headers: {
      //         "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
      //         "Content-Type": "application/json",
      //     },
      // }).then(function (response) {
      //     console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
      //     if(response.status === 200){
      //         this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
      //         this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false : ''});
      //         clearInterval(clearIntervalTime);

      //     }
      // }).catch(function (error) {
      //     if(error){
      //     clearInterval(clearIntervalTime);
      //     }
      // });

      // },10000)

      // setTimeout(() => {
      //     this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
      //     this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false : ''});
      // },300000)
    },

    downloadData(batchId, lobName, url) {
      console.log(url);
      var link = document.createElement("a");
      link.href = url;
      link.style = "visibility:hidden";
      link.download = batchId + "_" + lobName + ".csv";
      // link.setAttribute('download', 'file.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // axios({
      //     method: "get",
      //     url:"BaseURl +"
      // /policy-download/"+ batchId,
      //     headers: {
      //         "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
      //         "Content-Type": "application/json",
      //     },
      // }).then(function (response) {
      //     // console.log('GETTTT___DOWNLOAD RESPONSE:::',response)
      //     if(response.data.status === 200){
      //         // self.JSONToCSVConvertor(response.data.data,batchId+'_'+lobName,true)

      //         // var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
      //         var link = document.createElement("a");
      //         link.href = response.data.fileURL;
      //         link.style = "visibility:hidden";
      //         link.download = batchId+'_'+lobName + ".csv";
      //         // link.setAttribute('download', 'file.csv');
      //         document.body.appendChild(link);
      //         link.click();
      //         document.body.removeChild(link);
      //     }
      // }).catch(function (error) {});
    },

    JSONToCSVConvertor(JSONData, fileName, ShowLabel, batchID) {
      // this.batchIDData = batchID
      var arrData =
        typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
      var CSV = "";
      if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
          row += index + ",";
        }
        row = row.slice(0, -1);
        CSV += row + "\r\n";
      }
      for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
          var arrValue = arrData[i][index] == null ? "" : arrData[i][index];
          row += arrValue + ",";
        }
        row.slice(0, row.length - 1);
        CSV += row + "\r\n";
      }
      if (CSV == "") {
        growl.error("Invalid data");
        return;
      }
      // console.log('CSV___________' , CSV)
      var fileName = fileName;

      var uri = "data:application/csv;charset=utf-8," + escape(CSV);
      var link = document.createElement("a");
      link.href = uri;
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    submitStatusData() {
      let self = this;
      if (this.$refs.formdata.validate()) {
        if (Object.keys(self.selectFileData).length !== 0) {
          if (self.selectFileData[0] !== undefined) {
            let formData = new FormData();
            formData.append("policies", self.selectFileData[0]);
            formData.append("batchId", self.uploadBatchID);
            // formData.append("remarks", self.remarkData);
            formData.append("parentProductName",self.uploadLOB.PARENT_PRODUCT_NAME
            );
            formData.append("stage", self.uploadProdCode.value);
            axios({
              method: "post",
              url: BaseURl + "/policy-upload",

              headers: {
                Authorization:
                  tokenDataObj.token_type + " " + tokenDataObj.access_token,
                "Content-Type": "application/json",
              },
              data:formData ,
            })
              .then(function (response) {
                // console.log('GETTTT___UPLOAD RESPONSE:::',response)
                if (response.data.status === 200) {
                  // self.showLoader('Loading',false);
                  self.showToast("Submitted Successfully", self.TOST().SUCCESS);
                  self.clearUploadData();
                  setTimeout(() => {
                    self.getTableData("15", 0);
                  }, 8000);
                  self.uploadLOB = "";
                  self.uploadProdCode = "";
                  self.uploadBatchID = "";
                }
              })
              .catch(function (error) {
                if (error) {
                  console.log(error.response);
                  // self.showLoader('Loading',false);
                  self.showToast(
                    error.response.data.message,
                    self.TOST().ERROR
                  );
                }
              });
          }
        } else {
          self.showToast("Please Select file to upload", self.TOST().WARNING);
        }
      } else {
        this.showToast("Please Fill Required Fields", this.TOST().WARNING);
      }
    const fileInput = document.getElementById('myfile');
    // if (fileInput.value === '') {
    //  this.showToast("Please select a file", this.TOST().WARNING);
    //  return false;
    // }
    },

    getTableData(limitvalue, skip, searchFlag = false) {
      
      let self = this;
      searchFlag = self.searchText == "" ? false : true;
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
            moduleName: "upload_modified_extract",
            searchFlag: true,
            limit: limitvalue,
            offset: skip,
            batchid_or_policyno: self.searchText,
            searchFlag: true,
            ...usernameFromLocalStorage("FR5"),
          },
        })
          .then(function (response) {
            // this.dataLoader = false;
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            for (let i = 0; i < _respData.length; i++) {
              // if( _respData[i].LOB_NAME){
              let update = moment(
                new Date(parseInt(_respData[i].UPDATE_TIMESTAMP, 10))
              ).format("YYYY-MM-DD hh:mm:SS A");
              console.log(update, _respData[i].UPDATE_TIMESTAMP, "updated");
              console.log("remarks test", _respData[i].REMARKS);
              let _finalData = {
                IPDS_ERROR_COUNT: _respData[i].IPDS_ERROR_COUNT,
                FILE_URL: _respData[i].S3FILE_URL,
                JOB_ID: _respData[i].BATCH_ID_OR_POLICY_NUMBER,
                UPDATE_TIMESTAMP: update,
                JOB_STATUS: _respData[i].IPDS_STATUS,
                LOB_NAME: _respData[i].LOB_NAME,
                POLICY_COUNT: _respData[i].POLICY_COUNT,
                PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                REMARKS: _respData[i].REMARKS,
                RENEWAL_EXPIRY_DATE_FROM: _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                IPDS_SUCCESS_COUNT: _respData[i].IPDS_SUCCESS_COUNT,
                RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                UPDATE_STAGE: _respData[i].UPDATE_STAGE,
                IPDS_STATUS: _respData[i].IPDS_STATUS,
                showDownloadIcon: false,
                hidePrevIcon: true,
                //     CSV_DATA :_respData[i].TXT_POLICY_LIST.length == 0 || _respData[i].TXT_POLICY_LIST == '' ? [] : _respData[i].TXT_POLICY_LIST.map(function(el) {
                //  let _data = { 'Product name' : _respData[i].LOB_NAME,
                //                'Policy no' : el.TXT_POLICY_NO,
                //                'Previous policy start date' : el.DAT_PREVIOUSPOLICYSTARTDATE,
                //                'Previous policy End date' : el.DAT_PREVIOUSPOLICYENDDATE,
                //                'Customer name' : el.TXT_CLIENT_NAME,
                //                'Status (Success/Failed)' : el.status,
                //                'Reason for Error' : el.hasOwnProperty('message') ? el.message : '',
                //              }
                //             return _data
                //         }),
                //     TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
              };
              self.Tabledata.unshift(_finalData);
              // }
              // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata )
            }

            self.pageStartIndex = skip + 1;
            self.totalListCount = response.data.data.Count;

            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.JOB_ID
              : "";
            self.pagelength = Math.ceil(totalCount / self.skipdiffrence);
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
            moduleName: "upload_modified_extract",
            parentProductName: parent_product_name,
            ...usernameFromLocalStorage("FR5"),
          },
        })
          .then(function (response) {
            console.log("DATA RESPONSE search:::", response.data);
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            console.log(_respData, "resp data");
            for (let i = 0; i < _respData.length; i++) {
              console.log(_respData[i], "resp data");
              if (_respData[i].LOB_NAME) {
                let update = moment(
                  new Date(parseInt(_respData[i].UPDATE_TIMESTAMP, 10))
                ).format("YYYY-MM-DD hh:mm:SS A");
                console.log(update, _respData[i].UPDATE_TIMESTAMP, "updated");
                console.log("remarks test", _respData[i].REMARKS);
                let _finalData = {
                  IPDS_ERROR_COUNT: _respData[i].IPDS_ERROR_COUNT,
                  FILE_URL: _respData[i].S3FILE_URL,
                  JOB_ID: _respData[i].BATCH_ID_OR_POLICY_NUMBER,
                  UPDATE_TIMESTAMP: update,
                  JOB_STATUS: _respData[i].IPDS_STATUS,
                  LOB_NAME: _respData[i].LOB_NAME,
                  POLICY_COUNT: _respData[i].POLICY_COUNT,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS: _respData[i].REMARKS,
                  // RENEWAL_EXPIRY_DATE_FROM: _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                  IPDS_SUCCESS_COUNT: _respData[i].IPDS_SUCCESS_COUNT,
                  // RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                  UPDATE_STAGE: _respData[i].UPDATE_STAGE,
                  IPDS_STATUS: _respData[i].IPDS_STATUS,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  //     CSV_DATA :_respData[i].TXT_POLICY_LIST.length == 0 || _respData[i].TXT_POLICY_LIST == '' ? [] : _respData[i].TXT_POLICY_LIST.map(function(el) {
                  //  let _data = { 'Product name' : _respData[i].LOB_NAME,
                  //                'Policy no' : el.TXT_POLICY_NO,
                  //                'Previous policy start date' : el.DAT_PREVIOUSPOLICYSTARTDATE,
                  //                'Previous policy End date' : el.DAT_PREVIOUSPOLICYENDDATE,
                  //                'Customer name' : el.TXT_CLIENT_NAME,
                  //                'Status (Success/Failed)' : el.status,
                  //                'Reason for Error' : el.hasOwnProperty('message') ? el.message : '',
                  //              }
                  //             return _data
                  //         }),
                  //     TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                };
                self.Tabledata.unshift(_finalData);
              }
              // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata )
            }

            console.log("DATA Tabledata_______:::", self.Tabledata);

            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.JOB_ID
              : "";

            self.pageStartIndex = skip + 1;
            self.totalListCount = response.data.data.Count;
            self.pagelength = Math.ceil(totalCount / self.skipdiffrence);
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
div.fileinputs {
  position: relative;
}

div.fakefile {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
}

input.file {
  position: relative;
  text-align: right;
  opacity: 0;
  z-index: 2;
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