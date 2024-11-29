<template>
  <v-app style="background-color: #e8eeef">
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Upload Modified Renewal Extract
      </v-text>
    </div>
    <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
      <!-- <v-layout class="cardwhitebackclr pa-3" align-center style="">
                <div class="mr-3">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Upload Modified Renewal Extract </v-text>
                </div>
			</v-layout> -->

      <v-divider class=""></v-divider>

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
                  :items="lobDataArray"
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
              <v-flex xs3 class="mr-3">
                <!-- :rules="textRule" -->
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
                  Policy No
                </p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="policyNo"
                  label="Enter..."
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Upload
                </p>
                <v-flex
                  class="dm-fileContainer-bulk mt-1 mr-2"
                  style="border: 1px solid #c1c8cc"
                >
                  <v-text class="caption font-weight-medium"
                    >Uploading Via Browsing</v-text
                  >
                  <!-- <v-icon style="cursor:pointer" right>publish</v-icon> -->
                  <img class="ml-3" src="../../assets/upload.png" />
                  <input
                    hide-details="true"
                    type="file"
                    ref="fileref"
                    id="fileUpload"
                    accept=".csv"
                    @change="onFilePicked"
                  />
                  <!-- accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" -->
                </v-flex>
              </v-flex>
              <!-- <v-flex style="position:relative;top:20px;width:40px" class="mr-3">
                         <v-btn @click="JSONToCSVConvertor2" class="ma-2" color="#23B1A9" dark small>
                            <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon>
                            <v-divider vertical class="mr-2"></v-divider>
                            Sample file format
                            </v-btn>
                        </v-flex> -->
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout class="pl-3" xs12 row wrap>
          <v-flex xs3 class="mr-3">
            <v-layout column class="cust_pr">
              <p class="font-weight-bold mb-1 caption" style="color: #646666">
                Job Scheduled Date From
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
                Job Scheduled Date To
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
      ></v-text-field>
      <div>
        <v-data-table
          :headers="headers"
          :items="Tabledata"
          :search="searchText"
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
            <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.PRODUCT_CODE}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.RENEWAL_EXPIRY_DATE_FROM}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.RENEWAL_EXPIRY_DATE_TO }}</td> ../../assets/arrow.png -->
            <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.JOB_START_DATE}} {{ props.item.JOB_START_TIME}}</td> -->
            <td
              class="text-xs-left truncate"
              style="
                background-color: #eff3f4;
                display: flex;
                align-items: center;
              "
            >
              {{ props.item.REMARKS }}
              <v-tooltip left class="ml-2" style="display: flex">
                <v-icon slot="activator" small>info</v-icon
                ><span>{{ props.item.REMARKS }}</span>
              </v-tooltip>
            </td>
            <td class="text-xs-left" style="background-color: #eff3f4">
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
            <!-- <td v-if="props.item.STATUS === 'Submitted'" class="text-xs-left" style="background-color:#EFF3F4">-</td> -->
            <td class="text-xs-left" style="background-color: #eff3f4">
              {{ props.item.ERROR_COUNT }}
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
                color: #1cafcb;
              "
            >
              EXPORT
              <div
                v-if="props.item.hidePrevIcon == true"
                class="ml-3"
                style="display: flex; cursor: pointer"
              >
                <img
                  @click="addNewIcon(props.item, props.item.FILE_URL)"
                  class="export-icon"
                  src="../../assets/downloadicon.png"
                />
                <!-- <img @click="addNewIcon(props.item)" class="export-icon" src="web/assets/Path93052x.png"> -->
              </div>
            </td>
            <td
              v-if="props.item.showDownloadIcon == true"
              class="text-xs-left"
              style="
                background-color: #eff3f4;
                display: flex;
                align-items: center;
                color: #1cafcb;
              "
            >
              DOWNLOAD
              <div
                v-if="props.item.showDownloadIcon == true"
                class="ml-3"
                style="display: flex; cursor: pointer"
              >
                <img
                  @click="
                    downloadData(
                      props.item.JOB_ID,
                      props.item.LOB_NAME,
                      props.item.FILE_URL
                    )
                  "
                  class="export-icon-down ml-2"
                  src="../../assets/downloadicon.png"
                />
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
import moment from "moment";
import { oAuthURl, BaseURl, tokenCred } from "../../common/API_Config";
import { userPermissionValidator } from "./validator/permissionValidator";

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
      jobBatchStartDateMenuFr: "",
      jobBatchStartDateMenuTo: "",
      uploadBatchStartDateMenu: "",
      policyNo: "",
      lobDataArray: [],
      prodCodeArray: [],
      searchText: "",

      headers: [
        {
          text: "Batch ID",
          // align: 'start',
          sortable: false,
          value: "JOB_ID",
        },
        { text: "LOB", value: "LOB_NAME" },
        // { text: 'Product Code', value: 'Product Code' },
        // { text: 'Policy Exp. From', value: 'Policy Exp. From' },
        // { text: 'Policy Exp. To', value: 'Policy Exp. To' },
        { text: "Job Sched Date/Time", value: "JOB_START_DATE" },
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
    };
  },

  created() {
    this.$store.commit("SET_PAGE_TITLE", "Upload Modified Renewal Extract ");
    this.getToken();
    this.accessPermission = userPermissionValidator("FR12");
  },

  methods: {
    onFilePicked(event) {
      console.log(
        "CSVVV FILEEEE @CHANGE ____________________",
        event.target.files
      );
      let self = this;
      self.selectFileData = event.target.files;
      if (
        event.target.files[0].type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        if (Object.keys(self.selectFileData).length !== 0) {
          self.showToast("File Added Successfully", self.TOST().SUCCESS);
        }
      } else {
        self.selectFileData = "";
        self.showToast("Only Excel file allowed", self.TOST().WARNING);
      }
    },

    JSONToCSVConvertor2() {
      var multiplePOlicy = [
        {
          "Policy number": "",
          "Expiry date": "",
          "Fleet code": "",
          "Fleet Name": "",
          "Producer Code": "",
          "Producer Name": "",
          "Sub Producer Name": "",
          "Sub Producer Code": "",
          "Producer Type": "",
          "Dealer code": "",
          "Office location name": "",
          "Office location code": "",
          "Manufacturer Name": "",
          "Manufacture Code": "",
          "Model Name": "",
          "Model Code": "",
          "Variant name": "",
          "Variant code": "",
          "Manufacturing year": "",
          Segment: "",
          "Segment code": "",
          "Body type": "",
          "Fuel type": "",
          "Fuel type code": "",
          "Vehicle Usage": "",
          GVW: "",
          "Type Of bus": "",
          "Cubic capacity / KW": "",
          "Seating Capacity": "",
          "RTO location": "",
          "RTO Code": "",
          "Tariff zone": "",
          "UW Zone": "",
          "RTO Cluster code": "",
          "RTO Cluster Name": "",
          "Renewal vehicle IDV year": "",
          "CNG/LPG Kit IDV": "",
          "Renewal NCB": "",
          "Dep No of claims": "",
          "Depreciation reimbursement premium": "",
          "Engine secure option": "",
          "Tyre secure option": "",
          "Renewal Underwriting loading": "",
          "Renewal Underwriting discount": "",
          "Renewal loading / Discount": "",
          "TPPD Liability": "",
          "Basic TP Premium": "",
          "TPPD Premium": "",
          "CNG Kit TP": "",
          "Renewal Status": "",
          "Decline Reason": "",
          "RN Override": "",
          "Renewal Flag": "",
          "Campaign Rate code": "",
          "Tagic Rate code": "",
          "Decline rule code": "",
          "Reference Number": "",
          "Policy Number": "",
          "Alternate policy number": "",
          "Renewal inception date": "",
          "Renewal expiry date": "",
          "Policy Start Time": "",
          "Policy Expiry Time": "",
          "Previous policy period in days": "",
          "Certificate Number": "",
          "Renewal certificate numbe": "",
          "renewal count": "",
          "Financier Name": "",
          "Agreement Type": "",
          "Customer ID": "",
          "Customer type": "",
          "Customer name": "",
          Salutation: "",
          "Date of Birth": "",
          Gender: "",
          "Email ID": "",
          "Is office address same as mailing address": "",
          "Home/ Office Address Line 1": "",
          "Home/ Office Address Line 2": "",
          "Home/ Office Address Line 3": "",
          "Home/ Office Address Pin Code": "",
          "Home/ Office Address District": "",
          "Home/ Office Address State": "",
          "Home/ Office Mobile": "",
          "Home/ Office STD Landline No": "",
          "Home/ Office Fax No": "",
          "Office Location/Code": "",
          "Mailing Addr Line 1": "",
          "Mailing Addr Line 2": "",
          "Mailing Addr Line 3": "",
          "Mailing Pincode": "",
          "Mailing District": "",
          "Mailing State": "",
          "Mailing Telephone": "",
          "Service Tax Exepmtion category": "",
          "Product Code": "",
          "Product Name": "",
          "Policy Plan": "",
          "OD Tenure": "",
          "TP Tenure": "",
          "Date of Purchase / Registration": "",
          "Date of first registration": "",
          "Vehicle Age": "",
          "Registration Number": "",
          "Engine Number": "",
          "Chassis number": "",
          "Ex Showroom Price": "",
          "Previous year vehicle IDV": "",
          "Non Electrical Accessories IDV": "",
          "Electrical Accessories IDV": "",
          Bangladesh: "",
          Bhutan: "",
          Maldives: "",
          Nepal: "",
          Pakistan: "",
          Srilanka: "",
          "Theft and Conversion by Hirer-IMT 43": "",
          "Cover Lamp": "",
          Tyre: "",
          "Tubes-IMT 23": "",
          "Commercial & Private purpose_OD  IMT-34": "",
          "Overturning loading _OD IMT-47": "",
          "PA Unnamed Hirer IMT-18": "",
          "LL to FPP IMT-38": "",
          "LL to NFPP EMP IMT-37": "",
          "LL to NFPP NOT EMP IMT-37 A": "",
          "Hired Vehicle DRN by Hirer  IMT-35": "",
          "Indemnity to Hirer ": "",
          "Neg of Insrd IMT-36": "",
          "Indemnity to Hirer Neg of Own IMT-44": "",
          "LL to Pasngr excld employee IMT-46": "",
          "Commercial & Private purpose_TP  34": "",
          "LL to person empld in connection IMT-39": "",
          "Indemnity to hirer IMT-45": "",
          "LL to more than 6 emp in GCV IMT-39 A": "",
          "Own Premises Discount_OD IMT-13": "",
          "Own Site Discount_OD IMT-14": "",
          CWP: "",
          "Previous year Claim count OD": "",
          "Previous year Claim count TP": "",
          "Previous year Claim count addon": "",
          "Previous year Claim Amount OD": "",
          "Trailer Registration Number": "",
          "Trailer Chasis Number": "",
          "Is RN Generated": "",
          "Dep no of claims incurred in previous year": "",
          NUM_PREVIOUSYEAR_PREM: "",
          TXT_PREVIOUS_POLICY_PLAN: "",
          TXT_PREVIOUSPOLICYTYPE: "",
          NUM_PREVIOUS_TOTAL_IDV: "",
          NUM_PREVIOUSYEARNCB: "",
          "Fleet Policy reference no": "",
          "Fleet Policy Rate": "",
          "Fleet COA %": "",
          "Policy Cover variant": "",
          "Categorization of age": "",
          "Difference in IDV %": "",
          "Trailer IDV": "",
          "Total IDV": "",
          "Tariff Rate": "",
          "GLM Rate": "",
          "Applied Rate": "",
          "Previous year basis of rating": "",
          "Renewal basis of rating": "",
          "Basic OD premium": "",
          "OD premium after loading/discount": "",
          "Non electrical accessories OD premium": "",
          "Electrical Acessories OD premium": "",
          "CNG/LPG Kit OD Premium": "",
          "GVW Premium ": "",
          "GVW Premium after discount ": "",
          Surcharge: "",
          "Surcharge-OD Premium after Discount": "",
          "Own damage cover for Trailers": "",
          "Additional Towing Charges": "",
          "OD cover Fiber Glass Tank": "",
          "Geographical Extension OD": "",
          "Anti Theft Device discount": "",
          "Automobile Association Discount": "",
          "Previous Year NCB": "",
          "Previous Year Protected NCB": "",
          "Renewal protected NCB": "",
          "Previous year NCB Amount": "",
          "Renewal NCB amount": "",
          "Engine Secure Premium": "",
          "Tyre Secure Premium": "",
          "Consumable expenses Premium": "",
          "Return to Invoice premium": "",
          "NCB protection Opted last year": "",
          "NCB Protection No. Of claims": "",
          "NCB Protection Premium": "",
          "Daily Allowance Premium": "",
          "Daily Allowance limit": "",
          "Courtesy Hire": "",
          "Key replacement SI": "",
          "Key Replacement Premium": "",
          "Loss of personal belongings SI": "",
          "Loss of Personal belonging Premium": "",
          "Emergency Transport SI": "",
          "Emergency Transport Hotel Premium": "",
          "RSA Premium": "",
          "Prem_EMI Protector": "",
          "CSI_Emergency Medical expenses": "",
          "Prem_Emergency Medical exp": "",
          "CSI_RIM Guard": "",
          "Prem_Rim Guard": "",
          "CSI_Addtnl Transport Cost": "",
          "Prem_Addtnl Transport Cost": "",
          "CSI_Loss of Equipments": "",
          "Prem_Loss of Equipments": "",
          "Prem_Loss of Income": "",
          "CSI_Addtional PA Own Drvr": "",
          "Prem_Addtional PA Own Drvr": "",
          "CSI_Additional PA for employee": "",
          "Prem_Additional PA for employee": "",
          "CSI_Additional TPPD": "",
          "Prem_Additional TPPD": "",
          "Previous year loading/ discount": "",
          "Agri and tractors with Trailers-Extended Cover IMT-48": "",
          "Own Premises Discount_TP": "",
          "Own Site Discount_TP": "",
          "Third Party cover for trailers": "",
          "PA to Owner Driver": "",
          "PA cover term": "",
          "PA to unnamed passanger": "",
          "SI for Unnamed Passengers": "",
          "Number of Unnamed passengers": "",
          "PA to named passanger": "",
          "SI PA Cover Named Persons": "",
          "Number of Named Persons": "",
          "PA to Paid Driver": "",
          "SI for driver/cleaner/conductor": "",
          "Number driver/cleaner/conductor": "",
          "LL to Paid Driver": "",
          "LL to employees": "",
          "LL to soldier / sailor / airman": "",
          "Geographical Extension TP": "",
          "TP Premium Per passeneger": "",
          "Effective TP Premium": "",
          "Total Premium before tax": "",
          "Total Renewal Premium without Add-on": "",
          "Total Renewal Premium with Add-on": "",
          "Any transfer of insurance in previous policy": "",
          "Any endorsement pending under previous policy": "",
          "Previous year claim count": "",
          "Previous year claim amount": "",
          "Loss description": "",
          "Previous year Claim Amount TP": "",
          "Previous year Claim Amount Addon": "",
          "key replacement count": "",
          "historical claim count": "",
          "incurred historical claim amount": "",
          "PA Nominee Name": "",
          "PA Relationship": "",
          "Imposed Excess amount": "",
          "Renewal Generation Date": "",
          "RN Print Required": "",
          "Moratorium code": "",
          "Addon eligibility code": "",
          "Add on exception code": "",
          "Renewal UW rule code": "",
          "Moratorium Exception code": "",
          "Rating Exception code": "",
          "Renewal Rule Exception code": "",
          "Decline Exception code": "",
          "Vehicle Laid Up Adjustment": "",
          "Updated By": "",
          "Update Date": "",
          "Process Name": "",
          "RN Modification Date": "",
          "CAQ Date": "",
          "EAQ Date": "",
          "Inbuilt CNG/LPG kit OD Premium": "",
          "Renewal extract Status Flag": "",
          "Flag Description_Error": "",
          "UGST/SGST": "",
          CGST: "",
          IGST: "",
          "Kerala Cess": "",
        },
      ];
      this.JSONToCSVConvertor(
        multiplePOlicy,
        "SampleMultiplePolicyUpload",
        true
      );
    },

    clearUploadData() {
      let self = this;
      self.selectFileData = {};
      self.$refs.formData.reset();
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
      this.getTableData("15", this.skip);
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
            this.getTableData("15", 0);
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
      let self = this;
      let _head = {
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
      };
      axios
        .get(BaseURl + "/lob", _head)
        .then(function (response) {
          // console.log('RESPPPPPP____________________',response)
          if (response.status == 200) {
            self.lobDataArray = response.data.data;
          }
        })
        .catch(function (error) {});
    },

    addNewIcon(item, url) {
      let self = this;
      self.showToast(
        "Your report is being ready. please wait for some time",
        this.TOST().SUCCESS
      );
      // axios({
      //     method: "get",
      //     url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/policy-download/"+ batchId,
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

      axios({
        method: "get",
        // url: val,
        // url: "https://397611673480-renewal-vault-docs.s3.ap-south-1.amazonaws.com/"+batchId+"-"+lob+".csv",
        url: BaseURl + "/notice-regeneration/policy-download/" + item.JOB_ID,
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          // console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
          if (response.status === 200) {
            setTimeout(() => {
              if (url != undefined) {
                self.Tabledata.map((el) => {
                  el.JOB_ID === item.JOB_ID ? (el.showDownloadIcon = true) : "";
                });
              }
              if (url != undefined) {
                self.Tabledata.map((el) => {
                  el.JOB_ID === item.JOB_ID ? (el.hidePrevIcon = false) : "";
                });
                // self.showToast( "Your report is ready to Download" , self.TOST().SUCCESS);
              }
              console.log("GETTTT___DOWNLOAD RESPONSE:::", response);

              // clearInterval(clearIntervalTime);
            }, 5000);
          }
        })
        .catch(function (error) {
          if (error) {
            // clearInterval(clearIntervalTime);
            console.log("GETTTT___DOWNLOAD RESPONSE:::", error);

            self.showToast(
              "Something went wrong, Please try again",
              self.TOST().ERROR
            );
          }
        });

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
    },

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
      //     // url: 'https://397611673480-renewal-vault-docs.s3.ap-south-1.amazonaws.com/1626429123-MotorCommercialGCV.csv',
      //     url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/policy-download/"+ batchId,
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

    // downloadData(batchId,lobName) {
    //     axios({
    //         method: "get",
    //         url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/policy-download/"+ batchId,
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
      // console.log('GETTTT___UPLOAD RESPONSE:::',self.selectFileData)
      if (!this.$refs.formData.validate()) {
        this.$refs.formData.validate();
        this.showToast("Please Fill Required Fields", this.TOST().WARNING);
      } else {
        // return
        if (!this.uploadBatchID && !this.policyNo) {
          this.showToast(
            "Enter Batch ID or Policy Number",
            this.TOST().WARNING
          );
        } else {
          if (Object.keys(self.selectFileData).length !== 0) {
            if (self.selectFileData[0] !== undefined) {
              // let _batch_Id = self.selectFileData[0].name.split('_')[0]
              // let stageData = self.selectFileData[0].name.split('_')[1]
              // let _state = stageData.includes('GCV') ? 'gcv' : stageData.includes('PCV') ? 'pcv' : stageData.includes('MCV') ? 'mcv' :''
              let formData = new FormData();
              formData.append("policies", self.selectFileData[0]);
              // formData.append("batchId", self.uploadBatchID)
              // formData.append("batchId", self.batchIDData !== '' ? self.batchIDData : _batch_Id)
              formData.append("stage", self.uploadProdCode.value);
              formData.append("JOBStartDateFrom", self.jobBatchStartDateFrom);
              formData.append("JOBStartDateTo", self.jobBatchStartDateTo);
              self.showLoader("Loading", true);
              axios({
                method: "post",
                url: BaseURl + "/post-generation-modification",
                headers: {
                  Authorization:
                    tokenDataObj.token_type + " " + tokenDataObj.access_token,
                  "Content-Type": "application/json",
                },
                data: formData,
              })
                .then(function (response) {
                  // console.log('GETTTT___UPLOAD RESPONSE:::',response)
                  if (response.data.status === 200) {
                    self.showLoader("Loading", false);
                    self.showToast(
                      "Submitted Successfully",
                      self.TOST().SUCCESS
                    );
                    self.selectFileData = {};
                    self.$refs.formData.reset();
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
                  // console.log('GETTTT___UPLOAD RESPONSE:::',error.message)
                  console.log("GETTTT___UPLOAD RESPONSE:::", error.response);
                });
            }
          } else {
            self.showToast("Please Select file to upload", self.TOST().WARNING);
          }
        }
      }
    },

    getTableData(limitvalue, skip) {
      let self = this;
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
          moduleName: "uploadModifiedRenewalExtract",
          // lastEvaluatedKey: skip
          // lastEvaluatedKey : {JOB_ID: skip}
        },
      })
        .then(function (response) {
          // console.log('DATA RESPONSE:::',response.data)
          self.Tabledata = [];
          let _respData = response.data.data.Items;
          for (let i = 0; i < _respData.length; i++) {
            if (_respData[i].LOB_NAME) {
              let _finalData = {
                ERROR_COUNT: _respData[i].ERROR_COUNT,
                FILE_URL: _respData[i].FILE_URL,
                JOB_ID: _respData[i].JOB_ID,
                JOB_START_DATE: _respData[i].JOB_START_DATE,
                JOB_START_TIME: _respData[i].JOB_START_TIME,
                JOB_STATUS: _respData[i].JOB_STATUS,
                LOB_NAME: _respData[i].LOB_NAME,
                POLICY_COUNT: _respData[i].POLICY_COUNT,
                PRODUCT_CODE: _respData[i].PRODUCT_CODE,
                REMARKS: _respData[i].REMARKS,
                RENEWAL_EXPIRY_DATE_FROM: _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                STAGE: _respData[i].STAGE,
                STATUS: _respData[i].STATUS,
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
              self.Tabledata.push(_finalData);
            }
            // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata)
          }

          console.log("DATA Tabledata_______:::", self.Tabledata);

          lastjobid = response.data.data.hasOwnProperty("LastEvaluatedKey")
            ? response.data.data.LastEvaluatedKey.JOB_ID
            : "";
          // let totalCount =  response.data.data.Count
          self.totalListCount = response.data.data.Count;
          // self.pagelength = Math.ceil(totalCount/self.skipdiffrence)
        })
        .catch(function (error) {});
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
</style>