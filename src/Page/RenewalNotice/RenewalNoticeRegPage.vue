<template>
  <v-app style="background-color: #e8eeef">
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Renewal Notice Regeneration</v-text
      >
    </div>
    <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
      <!-- <v-layout class="cardwhitebackclr pa-3" align-center style="">
                <div class="mr-3">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Renewal Notice Regeneration</v-text>
                </div>
			</v-layout> -->

      <!-- <v-divider class=""></v-divider> -->

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
            <!-- <h1 class="font-weight-bold mb-1 caption" style="position:relative;top:30px;color:#646666">Option for Regeneration</h1> -->
            <v-text
              class="body-2 font-weight-bold"
              style="position: relative; top: 30px; color: #1e83c2"
              >Option for Regeneration</v-text
            >
            <v-flex class="ml-5">
              <v-layout column class="mx-2 cust_pr">
                <v-radio-group v-model="valueOfGRadio">
                  <v-radio
                    flat
                    style="height: 38px"
                    class="font-weight-bold mt-0 newClassLeft"
                    value="Product-wise"
                    hide-details
                    label="Batch-wise"
                    @change="headersForProductWise()"
                  ></v-radio>
                </v-radio-group>
              </v-layout>
            </v-flex>
            <v-flex style="width: 140px" class="ml-2">
              <v-layout column class="mx-2 cust_pr">
                <v-radio-group v-model="valueOfGRadio">
                  <v-radio
                    flat
                    style="height: 38px"
                    class="font-weight-bold mt-0 newClassLeft"
                    value="Policy-wise"
                    hide-details
                    label="Policy-wise"
                     @change="headersForProductWise()"
                  ></v-radio>
                </v-radio-group>
              </v-layout>
            </v-flex>
            <v-flex style="width:140px;" class="ml-2">
              <v-layout column class="mx-2 cust_pr">
                <v-radio-group v-model="valueOfGRadio">
                  <v-radio
                    flat
                    style="height: 38px"
                    class="font-weight-bold mt-0 newClassLeft"
                    value="Proposal-No"
                    hide-details
                    label="Proposal-No"
                    @change="headersForProductWise()"

                  ></v-radio>
                </v-radio-group>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-form>
      </v-layout>

      <v-divider style="width: 100%" class=""></v-divider>
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
                  v-model="uploadLOB"
                  :items="newLobArray || lobDataArray"
                  item-text="NUM_IL_PRODUCT_NAME"
                  item-value="NUM_IL_PRODUCT_CODE"
                  return-object
                  :rules="textRule"
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
              <v-flex v-if="showFields == false && valueOfGRadio=='Product-wise'" xs3 class="mr-3">
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
              <v-flex v-if="showFields == true && valueOfGRadio=='Policy-wise'" xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Policy No*
                </p>
                <v-text-field
                  solo
                  label="Enter..."
                  v-model="policyNo"
                  :rules="textRule"
                  return-object
                ></v-text-field>
              </v-flex>
              <v-flex v-if="showFields == true && valueOfGRadio=='Proposal-No'" xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Proposal No*
                </p>
                <v-text-field
                  solo
                  label="Enter..."
                  v-model="policyNo"
                  :rules="textRule"
                  return-object
                ></v-text-field>
              </v-flex>
              <v-flex
                xs3
                class="mr-3"
                v-if="showFields == false"
                id="uploadFile"
              >
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Upload*
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
                  <img @change="onFilePicked()" class="ml-3" src="../../assets/upload.png" />
                    </label
                  >
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
              <!-- new -->
              <v-flex
                xs3
                class="mr-3"
                id="policyRemark"
                v-if="showFields == true"
              >
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Remarks
                </p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="remarkData"
                  label="Enter..."
                  autocomplete="off"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout class="pl-3 pt-2" xs12 row wrap>
          <v-flex xs12>
            <v-layout class="cust_pr">
              <v-flex xs3 class="mr-3" v-if="showFields == false">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Job Scheduler *
                </p>
                <v-select
                  solo
                  label="Select"
                  v-model="jobScheduler"
                  :items="jobSchedArray"
                  :rules="textRule"
                  @change="changeJobSchedData(jobScheduler)"
                ></v-select>
              </v-flex>
              <v-flex xs3 class="mr-3" v-if="showFields == false">
                <v-layout column class="cust-rmvpd-pr">
                  <p
                    class="font-weight-bold mb-1 caption"
                    style="color: #646666"
                  >
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
                    :minute-interval="15"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        slot="activator"
                        label="Select.."
                        :value="computedJobStartDate"
                        solo
                        class="rounded-0"
                        :disabled="showShedulerDateTime"
                        readonly
                        :rules="textRule"
                        maxlength="10"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <!-- <div slot="prepend-inner" style="background-color:#F7F7F7;padding:6px;"><span class="material-icons">date_range</span></div> -->
                        <div
                          slot="prepend-inner"
                          style="background-color: #f7f7f7; margin-top: -10px"
                        >
                          <img
                            class="pa-1"
                            style="height: 35px"
                            src="../../assets/date_24X24.png"
                          />
                        </div>
                      </v-text-field>
                    </template>
                    <v-date-picker
                      @input="jobStartDateMenu = false"
                      v-model="jobStartDate"
                      no-title
                    ></v-date-picker>
                  </v-menu>
                </v-layout>
              </v-flex>
              <v-flex
                v-if="showFields == false"
                xs3
                class="mr-3"
                style="display: flex; flex-direction: column"
              >
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Job Start Time *
                </p>
                <input
                  class="rounded-0"
                  :disabled="showShedulerDateTime"
                  v-model="jobStartTime"
                  :rules="textRule"
                  style="height: 37px; border: 1px solid #ccc"
                  placeholder="Select Start Date"
                  type="time"
                  step="2"
                />

                <!-- <v-menu
                                ref="lossTimemenu"
                                v-model="lossTimemenu"
                                :close-on-content-click="false"
                                offset-y
                                readonly
                                max-width="290px"                                
                                min-width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    v-model="jobStartTime"
                                    placeholder="HH:MM"
                                    v-bind="attrs"
                                    solo
                                    dense
                                    readonly
                                    v-on="on"
                                    class="forminput"                                   
                                    append-icon="mdi-menu-down">
                                    <template v-slot:prepend-inner class="mx-0">
                                        <v-icon class="iconstyle">mdi-clock</v-icon>
                                    </template>
                                    </v-text-field>
                                </template>
                                <v-time-picker
                                    v-model="jobStartTime"
                                    full-width
                                    no-title                                   
                                    @click:minute="$refs.lossTimemenu.save(jobStartTime)"
                                    format="24hr"
                                ></v-time-picker>
                                </v-menu> -->
              </v-flex>
              <v-flex xs3 class="mr-3" v-if="showFields == false">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Remarks
                </p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="remarkData"
                  label="Enter..."
                  autocomplete="off"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="ml-3" v-if="showFields == false">
            <a
              href="https://rv-travel-update-related-files.s3.ap-south-1.amazonaws.com/config/Renewal-Notice-Upload-File.xlsx"
              >Sample File</a
            >
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
          :disabled="dataLoader"
          style="
            width: 100px;
            height: 35px;
            background-color: #0073bb;
            color: #ffffff;
            border: 1.5px solid #ccc;
            border-radius: 4px;
          "
          @click="submitStatusData('15', 0)"
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

    <v-card class="ma-3 pa-4" v-if="
        accessPermission.edit === true
          ? true
          : false || accessPermission.view === true
          ? true
          : false
      ">
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
              {{ props.item.BATCH_ID_OR_POLICY_NUMBER }}
            </td>
            <td
              class="text-xs-left"
              style="background-color: #eff3f4; padding: 0px"
            >
              {{ props.item.LOB_NAME }}
            </td>
            <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.PRODUCT_CODE}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.RENEWAL_EXPIRY_DATE_FROM}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.RENEWAL_EXPIRY_DATE_TO }}</td> -->
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
              {{ props.item.REMARKS }}
              <v-icon slot="activator" small>info</v-icon>
            </td>
            <!-- <td class="text-xs-left truncate"   style="background-color:#EFF3F4;display:flex;align-items:center">
                         {{props.item.REMARKS}} -->
            <!--   <v-tooltip left class="ml-2" style="display:flex">
                                <v-icon slot="activator" v-if="props.item.REMARKS == undefined || '' " small>info</v-icon><span>{{ props.item.REMARKS }}</span>
                            </v-tooltip> -->
            <!-- <v-tooltip left class="ml-2" style="display:flex">
                                <v-icon slot="activator" small  style="margin-left:10px">info</v-icon><span>{{ props.item.REMARKS }}</span>
                            </v-tooltip> -->

            <!-- </td> -->
            <td class="text-xs-left" style="background-color: #eff3f4">
              <p v-if="props.item.RN_STATUS === 'Success'" class="classSuccess">
                {{ props.item.RN_STATUS }}
              </p>
              <p v-if="props.item.RN_STATUS === 'Failed'" class="classFailed">
                {{ props.item.RN_STATUS }}
              </p>
              <p
                v-if="props.item.RN_STATUS === 'In Progress'"
                class="classProgress"
              >
                {{ props.item.RN_STATUS }}
              </p>
              <p
                v-if="props.item.RN_STATUS === 'Submitted'"
                class="classSuccess"
              >
                {{ props.item.RN_STATUS }}
              </p>
            </td>
            <!-- <td v-if="props.item.STATUS === 'Submitted'" class="text-xs-left" style="background-color:#EFF3F4">-</td> -->
            <td class="text-xs-center" style="background-color: #eff3f4">
              {{ props.item.RN_SUCCESS_COUNT }}
            </td>
            <td class="text-xs-center" style="background-color: #eff3f4">
              {{ props.item.RN_ERROR_COUNT }}
            </td>
            <td class="text-xs-center" style="background-color: #eff3f4">
              {{ props.item.POLICY_COUNT }}
            </td>
            <!-- <td class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center;color:#1CAFCB">DOWNLOAD
                            <div v-if="props.item.hidePrevIcon == true" class="ml-3" style="display:flex;cursor:pointer">
                                <img @click="addNewIcon(props.item,props.item.FILE_URL,props.item.BatchID)" class="export-icon" src="../../assets/downloadicon.png">
                                
                            </div>
                            <div v-if="props.item.showDownloadIcon == true" class="ml-3" style="display:flex;cursor:pointer">
                                <img @click="downloadData(props.item.JOB_ID,props.item.LOB_NAME,props.item.FILE_URL)" class="export-icon-down ml-2" src="../../assets/downloadicon.png">
                            </div>
                        </td> -->

            <!-- new  -->
            <!-- <td v-if="props.item.hidePrevIcon == true"
                        @click="actionProcess == false" class="text-xs-left" style="background-color: #eff3f4;display:flex;align-items: center;"> 
                                <div v-if="props.item.hidePrevIcon == true" class="ml-3" style="display:flex;cursor:pointer">
                                <button id="demo" class="export-icon mr-5" @click="addNewIcon(props.item,props.item.S3FILE_URL,props.item.BATCH_ID_OR_NUM_REFERENCE_NUMBER);actionMethod()"
                                v-if="actionProcess == true">EXPORT
                                </button>
                                <img @click="addNewIcon(props.item,props.item.S3FILE_URL,props.item.BATCH_ID_OR_NUM_REFERENCE_NUMBER)" class="export-icon" src="../../assets/downloadicon.png"> 
                                </div>

                            <div v-else style="display: flex">_
                            <v-tooltip left class="ml-2" >
                                <v-icon slot="activator" small>info</v-icon
                                ><span>Only Success cases can be downloaded!</span>
                            </v-tooltip>
                            </div>
                        </td> -->

            <!-- new 2 -->
            <!-- <td v-if="props.item.hidePrevIcon == true" @click="actionProcess == true" class="text-xs-left" style="background-color: #eff3f4;display:flex;align-items: center;">
                           
                                <div v-if="props.item.hidePrevIcon == true" class="ml-3" style="display:flex;cursor:pointer ">
                                <button id="demo" class="export-icon mr-5" @click="addNewIcon(props.item,props.item.S3FILE_URL,props.item.BATCH_ID_OR_NUM_REFERENCE_NUMBER);actionMethod()" v-if="actionProcess == true">EXPORT
                                </button>
                                <img @click="addNewIcon(props.item,props.item.S3FILE_URL,props.item.BATCH_ID_OR_NUM_REFERENCE_NUMBER)" class="export-icon" src="../../assets/downloadicon.png"> 
                                </div>
                        

                            <div v-else style="display: flex">_
                            <v-tooltip left class="ml-2" >
                                <v-icon slot="activator" small>info</v-icon
                                ><span>Only Success cases can be downloaded!</span>
                            </v-tooltip>
                            </div>
                        </td> -->

            <!-- <td class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center" v-if="props.item.showDownloadIcon == true">DOWNLOAD    
                            <div v-if="props.item.showDownloadIcon == true" class="ml-3" style="color:black;display:flex;cursor:pointer">
                                <img @click="downloadData(props.item.BATCH_ID_OR_NUM_REFERENCE_NUMBER,props.item.LOB_NAME,props.item.S3FILE_URL)" class="export-icon-down" src="../../assets/downloadicon.png" style="height:16px">
                                 <img  @click="JSONToCSVConvertor(props.item.CSV_DATA,props.item.JOB_ID+'_'+props.item.LOB_NAME,true,props.item.JOB_ID)" class="export-icon ml-2" src="web/assets/Path93052x.png">-->
            <!-- </div> -->
            <!-- {{item.Actions}} -->
            <!-- </td>  -->

            <!-- <td class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center" v-if="props.item.showDownloadIcon == true">  
                            <div v-if="props.item.showDownloadIcon == true" class="ml-3" style="color:black;display:flex;cursor:pointer">DOWNLOAD  
                                <img @click="downloadData(props.item.BATCH_ID_OR_NUM_REFERENCE_NUMBER,props.item.LOB_NAME,props.item.S3FILE_URL)" class="export-icon-down" src="../../assets/downloadicon.png" style="height:16px">
                                 <img  @click="JSONToCSVConvertor(props.item.CSV_DATA,props.item.JOB_ID+'_'+props.item.LOB_NAME,true,props.item.JOB_ID)" class="export-icon ml-2" src="web/assets/Path93052x.png"> -->
            <!-- </div> -->
            <!-- {{item.Actions}} -->
            <!-- </td> -->

            <!-- new -->
            <td
              v-if="props.item.hidePrevIcon == true"
              class="text-xs-left"
              style="
                background-color:#eff3f4;
                display:flex;
                align-items: center;
              "
            >
              <div
                v-if="(props.item.RN_STATUS === 'Submitted'|| props.item.RN_STATUS === 'Failed' || props.item.RN_STATUS === 'Success')"
                class="ml-3"
                style="display: flex; cursor: pointer"
              >
                DOWNLOAD
                <img
                  @click="
                    downloadData(
                      props.item.BATCH_ID_OR_POLICY_NUMBER,
                      props.item.LOB_NAME,
                      props.item.RN_REGENARATION_DOWNLOAD_FILE_LINK
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
                  ><span>Only Success/Failed cases can be downloaded!</span>
                </v-tooltip>
              </div>
            </td>
          </template>
        </v-data-table>

        <!-- <div class="text-xs-center pt-2">
                    <v-pagination v-model="pageNumber" color="#152F38" flat :length="pagelength" @input="nextPage($event)"></v-pagination>
                </div> -->
        <v-container
          fluid
          class="my-3 paginationStyle"
          v-if="Tabledata.length !== 0"
        >
          <v-layout justify-end>
            <div class="margincls" style="margin-top:16px">
              <span> Showing {{ pageStartIndex }} - {{ pageEndIndex }}</span>
              <span> out of {{ totalListCount }} records </span>
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
  BaseURl,
  oAuthURl,
  sampleFileURlForTravel,
tokenCred,
} from "../../common/API_Config.js";
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
      actionProcess: true,
      lossTimemenu: false,
      remarkData: "",
      jobSchedArray: ["Now", "Later"],
      jobScheduler: "",
      showShedulerDateTime: false,
      jobStartDateMenu: false,
      valueOfGRadio: "Product-wise",
      textRule: [(v) => !!v || "This Field is required"],
      selectFileData: {},
      batchIDData: "",
      uploadLOB: "",
      uploadProdCode: "",
      uploadBatchID: "",
      uploadBatchStartDate: "",
      uploadBatchStartDateMenu: "",
      lobDataArray: [],
      prodCodeArray: [],
      newLobArray: [],
      searchText: "",
      jobStartDate: "",
      jobStartTime: "",
      lineOfBusiness: "",
      parentProductName: "",
      dataLoader: false,

      headers: [
        {
          text: "Batch ID/Num Reference Number",
          // align: 'start',
          sortable: true,
          value: "BATCH_ID_OR_POLICY_NUMBER",
        },
        { text: "LOB", value: "LOB_NAME" },
        // { text: 'Product Code', value: 'Product Code' },
        // { text: 'Policy Exp. From', value: 'Policy Exp. From' },
        // { text: 'Policy Exp. To', value: 'Policy Exp. To' },
        { text: "Job Sched Date/Time", value: "UPDATE_TIMESTAMP" },
        { text: "Remarks", value: "REMARKS" },
        { text: "RN Status", value: "RN_STATUS" },
        { text: "RN Success Count", valeu: "RN_SUCCESS_COUNT" },
        { text: "RN Error Count", value: "RN_ERROR_COUNT" },
        { text: "RN Policy Count", value: "POLICY_COUNT" },
        { text: "Actions", sortable: false, value: "Actions" },
      ],
      headersForPolicyWise: [
        {
          text: "Proposal No",
          // align: 'start',
          value: "BATCH_ID_OR_POLICY_NUMBER",
        },
        { text: "LOB", value: "LOB_NAME" },
        // { text: 'Product Code', value: 'Product Code' },
        // { text: 'Policy Exp. From', value: 'Policy Exp. From' },
        // { text: 'Policy Exp. To', value: 'Policy Exp. To' },
        { text: "Job Sched Date/Time", value: "UPDATE_TIMESTAMP" },
        { text: "Remarks", value: "REMARKS" },
        { text: "RN Status", value: "RN_STATUS" },
        { text: "RN Success Count", value: "RN_SUCCESS_COUNT" },
        { text: "RN Error Count", value: "RN_ERROR_COUNT" },
        { text: "RN Policy Count", value: "POLICY_COUNT" },
        { text: "Actions", sortable: false, value: "Actions" },
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
      showFields: false,
      policyNo: "",
      validFileUploaded: false,
      isSelecting: false,
      selectedFile: null,
      searchFlag: false,
    };
  },

  watch: {
    valueOfGRadio(val) {
      console.log(val,this.valueOfGRadio,"headersForProductWise");
      if (val == "Policy-wise") {
        this.showFields = true;
        this.$refs.formData.reset();
        this.headers=this.headersForAll    
      }
      else if(val == "Proposal-No"){
        this.showFields = true;
        this.$refs.formData.reset();
        this.headers=this.headersForPolicyWise
      }
      else {
        this.showFields = false;
        this.$refs.formData.reset();
        this.headers=this.headersForAll
      }
    },
  },

  created() {
    this.$store.commit("SET_PAGE_TITLE", "Renewal Notice Regeneration");
    this.getToken();
    console.log(this.showFields, this.valueOfGRadio);
    this.accessPermission = userPermissionValidator("FR10");
    // if(this.showFields == false){
    //     this.valueOfGRadio
    // }
  },

  methods: {
    headersForProductWise() {
      console.log("headersForProductWise",this.valueOfGRadio)
      if(this.valueOfGRadio == "Proposal-No") {
        this.headersForPolicyWise = [
        { text: "Proposal No",value: "BATCH_ID_OR_POLICY_NUMBER",},
        { text: "LOB", value: "LOB_NAME" },
        { text: "Job Sched Date/Time", value: "UPDATE_TIMESTAMP" },
        { text: "Remarks", value: "REMARKS" },
        { text: "RN Status", value: "RN_STATUS" },
        { text: "RN Success Count", value: "RN_SUCCESS_COUNT" },
        { text: "RN Error Count", value: "RN_ERROR_COUNT" },
        { text: "RN Policy Count", value: "POLICY_COUNT" },
        { text: "Actions", sortable: false, value: "Actions" }, 
        ]
      } 
      else {
         this.headersForAll = [
        {text: "Batch ID/Num Reference Number", sortable: true,value: "BATCH_ID_OR_POLICY_NUMBER",},
        { text: "LOB", value: "LOB_NAME" },
        { text: "Job Sched Date/Time", value: "UPDATE_TIMESTAMP" },
        { text: "Remarks", value: "REMARKS" },
        { text: "RN Status", value: "RN_STATUS" },
        { text: "RN Success Count", valeu: "RN_SUCCESS_COUNT" },
        { text: "RN Error Count", value: "RN_ERROR_COUNT" },
        { text: "RN Policy Count", value: "POLICY_COUNT" },
        { text: "Actions", sortable: false, value: "Actions" },
      ]
      }
    },
    changeJobSchedData(ev) {
      console.log("DATA changeJobSchedData:::", ev);
      // ev ? this.showShedulerDateTime = true : this.showShedulerDateTime = false
      if (ev == "Now") {
        this.showShedulerDateTime = true;
        let currentDate = new Date();
        this.jobStartDate = moment(currentDate).format("YYYY-MM-DD");
        this.jobStartTime = new Date().toLocaleTimeString();
        console.log(this.jobStartTime);
      } else {
        this.showShedulerDateTime = false;
      }
      // new Date().toLocaleTimeString();
    },
    searchData() {
      let self = this;
      this.dataLoader = true;
      this.searchText="";      
      setTimeout(() => {
            this.dataLoader = false;
            self.getTableData("15", this.skip, this.searchFlag = false);
            }, 3000);

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
        }
      } else {
        self.showToast("Only Excel files allowed", self.TOST().WARNING);
      }
    },
    //  handleFileImport() {
    //         this.isSelecting = true;

    //         // After obtaining the focus when closing the FilePicker, return the button state to normal
    //         window.addEventListener('focus', () => {
    //             this.isSelecting = false
    //         }, { once: true });

    //         // Trigger click on the FileInput
    //         this.$refs.uploader.click();
    //     },

    clearUploadData() {
      let self = this;
      self.selectFileData = {};
      console.log(self.selectFileData);
      self.$refs.formData.reset();
      // self.uploadLOB = ''
      // self.uploadProdCode = ''
      // self.uploadBatchID = ''
    },

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
      this.getTableData("15",this.skip, (this.searchFlag = false))
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
          // console.log('RESPPPPPP____________________',response)
          if (response.status == 200) {
            self.lobDataArray = response.data.data;
            // for (let i = 0; i < self.lobDataArray.length; i++) {
            //         if (productID == 42 || productID == 43  ) {
            //             console.log(" inside for loop", self.lobDataArray[i].PARENT_PRODUCT_NAME)
            //             if (self.lobDataArray[i].PARENT_PRODUCT_NAME == "Travel") {
            //                 self.newLobArray.push(self.lobDataArray[i])
            //                 console.log("after pushing into array", self.newLobArray)
            //              }
            //         }
            //         else {
            //             self.newLobArray = self.lobDataArray

            //         }
            // }
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

    // addNewIcon(item,url,batchId) {
    //     let self=this
    //     console.log(batchId,url,item)
    //     this.showToast( "Your report is being ready. please wait for some time" , this.TOST().SUCCESS);
    //     axios({
    //         method: "get",
    //         url:"BaseURl +"
    // /policy-download/"+ batchId,
    //         headers: {
    //             "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
    //             "Content-Type": "application/json",
    //         },
    //     }).then(function (response) {
    //         console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
    //         console.log(this.Tabledata,"table data")
    //         // this.fileLinkUrl = response.data.fileURL;
    //         if(response.data.status === 200){
    //             // self.JSONToCSVConvertor(response.data.data,batchId+'_'+lobName,true)
    //             console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
    //             setTimeout(() => {
    //               if(response.data.data){
    //                 self.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
    //                 console.log(self.Tabledata,"tableData")
    //                 self.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false: ''});
    //                   self.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.FILE_URL = response.data.data: ''});

    //               }else{
    //                 self.showToast( "Your report is not generated" , self.TOST().ERROR);
    //               }

    //                 // if(url != undefined){
    //                 //     self.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
    //                 //     // self.showToast( "Your report is ready to Download" , self.TOST().SUCCESS);
    //                 // }
    //                 // if(url != undefined){
    //                 //     self.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false: ''});
    //                 //     self.showToast( "Report Downloaded successfully", self.TOST().SUCCESS);
    //                 // }
    //             },8000)

    //         }
    //     }).catch(function (error) {
    //         if(error){
    //         // clearInterval(clearIntervalTime);
    //         self.showToast( "Something went wrong, Please try again" , self.TOST().ERROR);
    //         }
    //     });

    //     var clearIntervalTime = setInterval(() => {
    //         axios({
    //         method: "get",
    //         url: "https://397611673480-renewal-vault-docs.s3.ap-south-1.amazonaws.com/1626160431-MotorCommercialGCV.csv",
    //         headers: {
    //             "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
    //             "Content-Type": "application/json",
    //         },
    //     }).then(function (response) {
    //         console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
    //         if(response.status === 200){
    //             this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
    //             this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false : ''});
    //             clearInterval(clearIntervalTime);

    //         }
    //     }).catch(function (error) {
    //         if(error){
    //         clearInterval(clearIntervalTime);
    //         }
    //     });

    //     },10000)

    //     // setTimeout(() => {
    //     //     this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
    //     //     this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false : ''});
    //     // },300000)

    // },

    // addNewIcon(item,url) {
    //     console.log(url);
    //     let self = this;
    //     self.showToast( "Your report is being ready. please wait for some time" , self.TOST().SUCCESS);

    //     // this.intervalFunc();
    //     // if(url != undefined){
    //     // this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
    //     // }
    //     // if(url != undefined){
    //     // this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false: ''});
    //     // }

    //     setTimeout(() => {
    //         if(url != undefined){
    //         this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
    //         }
    //         if(url != undefined){
    //         this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false: ''});
    //         }
    //     },7000)

    // },

    // downloadData(batchId,lobName) {
    //     axios({
    //         method: "get",
    //         url:"BaseURl +"
    // /policy-download/"+ batchId,
    //         headers: {
    //             "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
    //             "Content-Type": "application/json",
    //         },
    //     }).then(function (response) {
    //         // console.log('GETTTT___DOWNLOAD RESPONSE:::',response)
    //         if(response.data.status === 200){
    //             // self.JSONToCSVConvertor(response.data.data,batchId+'_'+lobName,true)

    //             // var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
    //             var link = document.createElement("a");
    //             link.href = response.data.fileURL;
    //             link.style = "visibility:hidden";
    //             link.download = batchId+'_'+lobName + ".csv";
    //             // link.setAttribute('download', 'file.csv');
    //             document.body.appendChild(link);
    //             link.click();
    //             document.body.removeChild(link);
    //         }
    //     }).catch(function (error) {});
    // },

    // new

    addNewIcon(item, url, batchId) {
      console.log("request ", item, url, batchId);
      let self = this;
      self.showToast(
        "Your report is being ready. Please wait for some time",
        self.TOST().SUCCESS
      );
      // function actionMethod(){
      //     document.getElementById("demo").innerHTML="INPROCESS"
      // }
      // const INPROCESS = setTimeout(actionMethod,500);
      axios({
        method: "get",
        url:
          "https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/notice-regeneration/policy-download/" +
          item.BATCH_ID_OR_POLICY_NUMBER,
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("GETTTT___DOWNLOAD RESPONSE:::", response);
          if (response.status === 200) {
            console.log("inside interval");
            // self.getTableData('15',0);
            setTimeout(() => {
              if (response.data.data) {
                self.Tabledata.map((el) => {
                  el.BATCH_ID_OR_POLICY_NUMBER ===
                  item.BATCH_ID_OR_POLICY_NUMBER
                    ? (el.showDownloadIcon = true)
                    : "";
                });
                self.Tabledata.map((el) => {
                  el.BATCH_ID_OR_POLICY_NUMBER ===
                  item.BATCH_ID_OR_POLICY_NUMBER
                    ? (el.hidePrevIcon = false)
                    : "";
                });
                self.Tabledata.map((el) => {
                  el.BATCH_ID_OR_POLICY_NUMBER ===
                  item.BATCH_ID_OR_POLICY_NUMBER
                    ? (el.S3FILE_URL = response.data.data)
                    : "";
                });
              } else {
                self.showToast(
                  "Your report is not generated",
                  self.TOST().ERROR
                );
              }
            }, 1000);
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
    },
    downloadData(batchId, lobName, url) {
      console.log(url);
      var link = document.createElement("a");
      link.href = url;
      link.style = "visibility:hidden";
      link.download = batchId + "_" + lobName + ".csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
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

    submitStatusData(limitvalue, skip) {
      let self = this;
      self.dataLoader = true;
      console.log(self.jobScheduler); 
      if (!this.$refs.formData.validate()) {
        this.$refs.formData.validate();
        this.showToast("Please Enter Valid Data", this.TOST().WARNING);
      } else if (self.valueOfGRadio == "") {
        this.showToast(
          "Please Select the Option for regeneration",
          this.TOST().WARNING
        );
      } else if (self.jobStartTime == "" && self.showFields == false) {
        this.showToast("Please Select Job start time", this.TOST().WARNING);
      } else {
        console.log("WORKING FINE:::", self.selectFileData[0]);

        if (self.valueOfGRadio == "Batch-wise" || self.showFields == false) {
          if (
            self.selectFileData[0] !== undefined &&
            self.validFileUploaded == false
          ) {
            console.log("GETTTT___UPLOAD RESPONSE:::");
            let formData = new FormData();
            formData.append("policies", self.selectFileData[0]);
            formData.append("batchId", self.uploadBatchID);
            // formData.append("batchId", self.batchIDData !== '' ? self.batchIDData : _batch_Id)
            formData.append(
              "parentProductName",
              self.uploadLOB.PARENT_PRODUCT_NAME
            );
            formData.append("stage", self.uploadProdCode.value);
            formData.append("job_schedule_now", self.jobScheduler);
            formData.append("job_start_date", self.jobStartDate);
            formData.append("job_start_time", self.jobStartTime);
            formData.append("remarks", self.remarkData);

            // self.showLoader('Loading',true);
            axios({
              method: "post",
              url: BaseURl + "/notice-regeneration",
              headers: {
                Authorization:
                  tokenDataObj.token_type + " " + tokenDataObj.access_token,
                "Content-Type": "application/json",
              },
              data: formData,
              limit: limitvalue,
              offset: skip,
              moduleName: "rnRegenerationPage",
            })
              .then(function (response) {
                // console.log('GETTTT___UPLOAD RESPONSE:::',response)
                if (response.data) {
                  self.dataLoader = false;
                  self.showToast("Submitted Successfully", self.TOST().SUCCESS);
                  // self.$refs.form.reset();
                  self.$refs.formData.reset();
                  // self.uploadLOB = ''
                  // self.uploadProdCode = ''
                  // self.uploadBatchID = ''
                }
              })
              .catch(function (error) {
                if (error) {
                  self.showLoader("Loading", false);
                  self.showToast(
                    error.response.data.message,
                    self.TOST().ERROR
                  );
                }
              });
          } else if (
            self.selectFileData[0] == undefined &&
            self.validFileUploaded == true
          ) {
            console.log("GETTTT___UPLOAD RESPONSE:::");
            this.showToast(
              "Please Select Valid File Format",
              this.TOST().WARNING
            );
          } else if (self.selectFileData[0] == undefined) {
            console.log("GETTTT___UPLOAD RESPONSE:::");
            let formData = new FormData();
            formData.append("policies", "");
            formData.append("batchId", self.uploadBatchID);
            // formData.append("batchId", self.batchIDData !== '' ? self.batchIDData : _batch_Id)
            formData.append(
              "parentProductName",
              self.uploadLOB.PARENT_PRODUCT_NAME
            );
            formData.append("stage", self.uploadProdCode.value);
            formData.append("job_schedule_now", self.jobScheduler);
            formData.append("job_start_date", self.jobStartDate);
            formData.append("job_start_time", self.jobStartTime);
            formData.append("remarks", self.remarkData);

            // self.showLoader('Loading',true);
            axios({
              method: "post",
              url: BaseURl + "/notice-regeneration",
              headers: {
                Authorization:
                  tokenDataObj.token_type + " " + tokenDataObj.access_token,
                "Content-Type": "application/json",
              },
              data: formData,
            })
              .then(function (response) {
                // console.log('GETTTT___UPLOAD RESPONSE:::',response)
                if (response.data) {
                  self.dataLoader = false;
                  
                  // self.showLoader('Loading',false);
                  self.showToast("Submitted Successfully", self.TOST().SUCCESS);
                  // self.$refs.form.reset();
                  self.$refs.formData.reset();
                  // self.uploadLOB = ''
                  // self.uploadProdCode = ''
                  // self.uploadBatchID = ''
                }
              })
              .catch(function (error) {
                if (error) {
                  // self.showLoader('Loading',false);
                  self.showToast(
                    error.response.data.message,
                    self.TOST().ERROR
                  );
                }
              });
          }
        }
        else {
          if (
            self.selectFileData[0] !== undefined &&
            self.validFileUploaded == false
          ) {
            // let _batch_Id = self.selectFileData[0].name.split('_')[0]
            // let stageData = self.selectFileData[0].name.split('_')[1]
            // let _state = stageData.includes('GCV') ? 'gcv' : stageData.includes('PCV') ? 'pcv' : stageData.includes('MCV') ? 'mcv' :''
            let formData = new FormData();
            formData.append("policies", self.selectFileData[0]);
            formData.append("policyNo", self.policyNo);
            // formData.append("batchId", self.batchIDData !== '' ? self.batchIDData : _batch_Id)
            formData.append(
              "parentProductName",
              self.uploadLOB.PARENT_PRODUCT_NAME
            );
            formData.append("job_schedule_now", "Now");
            formData.append("stage", self.uploadProdCode.value);
            formData.append("remarks", self.remarkData);

            // self.showLoader('Loading',true);
            axios({
              method: "post",
              url: BaseURl + "/notice-regeneration",
              headers: {
                Authorization:
                  tokenDataObj.token_type + " " + tokenDataObj.access_token,
                "Content-Type": "application/json",
              },
              data: formData,
            })
              .then(function (response) {
                // console.log('GETTTT___UPLOAD RESPONSE:::',response)
                if (response.data) {
                  self.dataLoader = false;

                  // self.showLoader('Loading',false);
                  self.showToast("Submitted Successfully", self.TOST().SUCCESS);
                  // self.$refs.form.reset();
                  self.$refs.formData.reset();
                  // self.uploadLOB = ''
                  // self.uploadProdCode = ''
                  // self.uploadBatchID = ''
                }
              })
              .catch(function (error) {
                if (error) {
                  // self.showLoader('Loading',false);
                  self.showToast(
                    error.response.data.message,
                    self.TOST().ERROR
                  );
                }
              });
          } else if (
            self.selectFileData[0] == undefined &&
            self.validFileUploaded == true
          ) {
            console.log("GETTTT___UPLOAD RESPONSE:::");
            this.showToast(
              "Please Select Valid File Format",
              this.TOST().WARNING
            );
          } else if (self.selectFileData[0] == undefined) {
            let formData = new FormData();
            formData.append("policies", "");
            formData.append("policyNo", self.policyNo);
            // formData.append("batchId", self.batchIDData !== '' ? self.batchIDData : _batch_Id)
            formData.append(
              "parentProductName",
              self.uploadLOB.PARENT_PRODUCT_NAME
            );
            formData.append("stage", self.uploadProdCode.value);
            formData.append("remarks", self.remarkData);

            // self.showLoader('Loading',true);
            axios({
              method: "post",
              url: BaseURl + "/notice-regeneration",
              headers: {
                Authorization:
                  tokenDataObj.token_type + " " + tokenDataObj.access_token,
                "Content-Type": "application/json",
              },
              data: formData,
            })
              .then(function (response) {
                // console.log('GETTTT___UPLOAD RESPONSE:::',response)
                if (response.data) {
                  self.dataLoader = false;
                  // self.showLoader('Loading',false);
                  self.showToast("Submitted Successfully", self.TOST().SUCCESS);
                  // self.$refs.form.reset();
                  self.$refs.formData.reset();
                  // self.uploadLOB = ''
                  // self.uploadProdCode = ''
                  // self.uploadBatchID = ''
                }
              })
              .catch(function (error) {
                if (error) {
                  // self.showLoader('Loading',false);
                  self.showToast(
                    error.response.data.message,
                    self.TOST().ERROR
                  );
                }
              });
          }
        }
      }
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
      console.log(self.searchText, "serachtext");
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
            moduleName: "rnRegenerationPage",
            renewalNoticeFlag: true,
            parentProductName: self.uploadLOB.PARENT_PRODUCT_NAME,
            batchid_or_policyno: self.searchText,
            searchFlag: true,
          },
        })
          .then(function (response) {
            console.log("DATA RESPONSE:::", response.data);
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            console.log();
            console.log(_respData, "RN regeneration page");
            console.log(response.data.data, "RN regeneration page response");
            for (let i = 0; i < _respData.length; i++) {
              console.log(_respData[i], "respdata");
              if (_respData[i]) {
                // let update = moment(
                //   new Date(parseInt(_respData[i].UPDATE_TIMESTAMP, 10))
                // ).format("YYYY-MM-DD hh:mm:SS A");
                // console.log(update, _respData[i].UPDATE_TIMESTAMP, "updated");
                let _finalData = {
                  ERROR_COUNT: _respData[i].ERROR_COUNT,
                  S3FILE_URL: _respData[i].S3FILE_URL,
                  BATCH_ID_OR_POLICY_NUMBER:
                    _respData[i].BATCH_ID_OR_POLICY_NUMBER,
                  RN_REGENARATION_DOWNLOAD_FILE_LINK:
                    _respData[i].RN_REGENARATION_DOWNLOAD_FILE_LINK,
                  UPDATE_TIMESTAMP: _respData[i].UPDATE_TIMESTAMP,
                  JOB_STATUS: _respData[i].JOB_STATUS,
                  LOB_NAME: _respData[i].LOB_NAME,
                  POLICY_COUNT: _respData[i].POLICY_COUNT,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS:
                    _respData[i].REMARKS == "undefined"
                      ? ""
                      : _respData[i].REMARKS,

                  RENEWAL_EXPIRY_DATE_FROM:
                    _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                  RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                  UPDATE_STAGE: _respData[i].UPDATE_STAGE,
                  STATUS: _respData[i].STATUS,
                  RN_SUCCESS_COUNT: _respData[i].RN_SUCCESS_COUNT,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  RN_STATUS: _respData[i].RN_STATUS,
                  RN_ERROR_COUNT: _respData[i].RN_ERROR_COUNT,
                  //RN_SUCCESS_COUNT : _respData[i].RN_SUCCESS_COUNT,
                  // CSV_DATA :_respData[i].TXT_POLICY_LIST.length == 0 || _respData[i].TXT_POLICY_LIST == '' ? [] : _respData[i].TXT_POLICY_LIST.map(function(el) {
                  // let _data = {
                  //     'Product name' : _respData[i].LOB_NAME,
                  //     'Policy no' : el.TXT_POLICY_NO,
                  //     'Previous policy start date' : el.DAT_PREVIOUSPOLICYSTARTDATE,
                  //     'Previous policy End date' : el.DAT_PREVIOUSPOLICYENDDATE,
                  //     'Customer name' : el.TXT_CLIENT_NAME,
                  //     'Status (Success/Failed)' : el.status,
                  //     'Reason for Error' : el.hasOwnProperty('message') ? el.message : '',
                  // }
                  //  return _data
                  // }),
                  // TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                };
                console.log("DATA _finalData::", _finalData);
                self.Tabledata.unshift(_finalData);
              }
              console.log("DATA _respData __STATUSSS_____:::", self.Tabledata);
            }

            console.log("DATA Tabledata_______:::", self.Tabledata);
            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.BATCH_ID_OR_POLICY_NUMBER
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
            moduleName: "rnRegenerationPage",
            renewalNoticeFlag: true,
            parentProductName: parent_product_name,
          },
        })
          .then(function (response) {
            console.log("DATA RESPONSE:::", response.data);
            self.Tabledata = [];
            let _respData = response.data.data.Items;
            console.log(_respData, "RN regeneration page");
            console.log(response.data.data, "RN regeneration page response");
            for (let i = 0; i < _respData.length; i++) {
              console.log(_respData[i], "respdata");
              if (_respData[i]) {
                // let update = moment(
                //   new Date(parseInt(_respData[i].UPDATE_TIMESTAMP, 10))
                // ).format("YYYY-MM-DD hh:mm:SS A");
                // console.log(update, _respData[i].UPDATE_TIMESTAMP, "updated");
                let _finalData = {
                  ERROR_COUNT: _respData[i].ERROR_COUNT,
                  S3FILE_URL: _respData[i].S3FILE_URL,
                  BATCH_ID_OR_POLICY_NUMBER:
                    _respData[i].BATCH_ID_OR_POLICY_NUMBER,
                  RN_REGENARATION_DOWNLOAD_FILE_LINK:
                    _respData[i].RN_REGENARATION_DOWNLOAD_FILE_LINK,
                  UPDATE_TIMESTAMP: _respData[i].UPDATE_TIMESTAMP,
                  JOB_STATUS: _respData[i].JOB_STATUS,
                  LOB_NAME: _respData[i].LOB_NAME,
                  POLICY_COUNT: _respData[i].POLICY_COUNT,
                  PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                  REMARKS:
                    _respData[i].REMARKS == "undefined"
                      ? ""
                      : _respData[i].REMARKS,
                  RENEWAL_EXPIRY_DATE_FROM:
                    _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                  RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                  UPDATE_STAGE: _respData[i].UPDATE_STAGE,
                  STATUS: _respData[i].STATUS,
                  RN_SUCCESS_COUNT: _respData[i].RN_SUCCESS_COUNT,
                  showDownloadIcon: false,
                  hidePrevIcon: true,
                  RN_STATUS: _respData[i].RN_STATUS,
                  RN_ERROR_COUNT: _respData[i].RN_ERROR_COUNT,
                };
                console.log("DATA _finalData::", _finalData);
                self.Tabledata.unshift(_finalData);
              }
              console.log("DATA _respData __STATUSSS_____:::", self.Tabledata);
            }

            console.log("DATA Tabledata_______:::", self.Tabledata);
            lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
              ? response.data.data.LastEvaluatedKey.BATCH_ID_OR_POLICY_NUMBER
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
      return this.jobStartDate
        ? moment(this.jobStartDate).format("DD-MM-YYYY")
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