
<template>
    <v-app style="background-color:#E8EEEF">
        <div style="margin-left:35px" class="mt-4">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Scheduler Batches</v-text>
                </div>

        <v-card class="ma-3">
			<!-- <v-layout class="cardwhitebackclr pa-3" align-center style="">
                <div class="mr-3">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Collection and Processing Status</v-text>
                </div>
			</v-layout> -->

            <!-- <v-divider class=""></v-divider> -->

            <v-form ref="formData">
            <v-layout class="pl-3 pt-4" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Line of Business *</p>
                            <v-select 
                                solo 
                                label="Select"
                                v-model="statusLOB"
                                :items="lobDataArray"  
                                item-text="NUM_IL_PRODUCT_NAME"
                                item-value="NUM_IL_PRODUCT_CODE"
                                return-object
                                :rules="textRule"
                                @change="changeLobData(statusLOB)"
                            ></v-select >
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Product Code ( 0 for all product) *</p>
                            <v-select 
                                :items="prodCodeArray"  
                                solo 
                                disabled
                                label="Select"
                                item-text="text"
                                item-value="value"
                                return-object
                                v-model="statusProdCode"
                            ></v-select >
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Policy Number</p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                v-model="statusBatchID" 
                                label="Enter...">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <v-layout column class="cust-rmvpd-pr">
                                <p class="font-weight-bold mb-1 caption" style="color:#646666">Expiry Period From <span>*</span></p>
                                <v-menu
                                    :disabled="lineOfBusiness==''"
                                    ref="calender"
                                    v-model="expiryPeriodFromMenu"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    max-width="290px"
                                    min-width="290px" 
                                    class="rounded-0">
                                    <template v-slot:activator="{on, attrs}">
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
                                            v-on="on">
                                            <div slot="prepend-inner" style="background-color:#F7F7F7"><img class="pa-1" style="height:35px" src="../../assets/date_24X24.png"/></div>
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="expiryPeriodFromMenu = false"
                                   v-model="expiryPeriodFrom" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout class="pl-3 pt-4" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        
                        
                        
                        <v-flex xs3 class="mr-3">
                            <v-layout column class="cust-rmvpd-pr">
                                <p class="font-weight-bold mb-1 caption" style="color:#646666">Expiry Period To<span>*</span></p>
                                <v-menu
                                ref="calender"
                                    v-model="expiryPeriodToMenu"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    max-width="290px"
                                    min-width="290px" 
                                    class="rounded-0 "
                                    :disabled="lineOfBusiness==''">
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
                                            <div  slot="prepend-inner" style="background-color:#F7F7F7"><img class="pa-1" style="height:35px" src="../../assets/date_24X24.png"/></div>
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="expiryPeriodToMenu = false"  v-model="expiryPeriodTo" no-title></v-date-picker>
                                </v-menu>
                                
                            </v-layout>
                        </v-flex>
                        <!-- <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Channel</p>
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
                    </v-layout>
                </v-flex>
            </v-layout>
            </v-form>
           
            <!-- <v-divider class=""></v-divider> -->

            <v-layout class="pa-2" style="position:relative;bottom:15px;float:right">
                <!-- <v-btn  @click="getTableData('15',0)" class="ma-2" color="#fff"  small>
                    <v-icon small  left>mdi-close</v-icon>
                    Reset
                </v-btn> -->
                <v-btn flat style="width:100px;height:35px;background-color:#FFFFFF;color:#646666;border:1.5px solid #ccc;border-radius:3px" @click="clearalldata()" class="ma-2 pa-3" dark small>
                    <!-- <v-icon small  left>delete</v-icon> -->
                    Clear
                </v-btn>
                <v-btn flat style="width:100px;height:35px;background-color:#0073BB;color:#FFFFFF;border:1.5px solid #ccc;border-radius:4px" @click="submitStatusData('15',0)" class="ma-2 pa-3" dark small>
                    <!-- <v-icon small dark left>mdi-checkbox-marked-circle</v-icon> -->
                    Submit
                </v-btn>

            </v-layout>
        </v-card>
        
        
        <v-card class="ma-3 pa-4">
            <v-text-field
                v-model="searchText"
                append-icon="search"
                label="Search"
                single-line
                class="mb-4"
                style="width:20%"
                hide-details
            ></v-text-field>
             <button @click="searchData('15',0)" style="float:right;background-color:#1E83C2;padding:10px;top:0;color:#fff;border-radius: 7px;margin-bottom: 10px;">Refresh</button>
            <div  >
                <v-data-table
                    :headers="headers"
                    :items="Tabledata"
                    :search="searchText"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1">
           
                   <template slot="items" slot-scope="props"> 
                       <td  class="text-xs-left pr-2" style="background-color:#EFF3F4;cursor:pointer;" @click="dialog = true; policyDataTable(15,0,props.item.JOB_ID);">{{props.item.JOB_ID}}</td>
       
                        <td class="text-xs-left pr-2" style="background-color:#EFF3F4;padding:0px">{{props.item.LOB_NAME}}</td>
                       
                        <td class="text-xs-left pr-2" style="background-color:#EFF3F4">{{ props.item.JOB_START_DATE}} {{ props.item.JOB_START_TIME}}</td>
                        
                        <td class="text-xs-left pr-2 truncate" style="background-color:#EFF3F4;display:flex;align-items:center">{{props.item.REMARKS}}
                            <v-tooltip left class="ml-2" style="display:flex">
                                <v-icon slot="activator" small>info</v-icon><span>{{ props.item.REMARKS }}</span>
                            </v-tooltip>
                        </td>
                        <td class="text-xs-left" style="background-color:#EFF3F4">
                            <p v-if="props.item.STATUS === 'Success'" class="classSuccess">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'Failed'" class="classFailed">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'In Progress'" class="classProgress" style="width:120px">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'Submitted'" class="classSubmitted">{{props.item.STATUS}}</p>
                        </td>
                        
                        <td class="text-xs-left" style="background-color:#EFF3F4">{{props.item.POLICY_COUNT}}</td>

                        <td v-if="props.item.hidePrevIcon == true" class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center">
                            <div class="ml-3" style="display:flex;cursor:pointer;color:rgb(28, 175, 203);">
                             <button class="export-icon mr-5" @click="batchStatusApi(props.item,props.item.FILE_URL,props.item.JOB_ID,props.item.LOB_NAME)">EXPORT</button>
                              <img @click="batchStatusApi(props.item,props.item.FILE_URL,props.item.JOB_ID)" class="export-icon" src="../../assets/downloadicon.png"/>
                               
                            </div>
                            
                        </td>
                        
                        <td class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center;color:rgb(28, 175, 203)" v-if="props.item.showDownloadIcon == true">DOWNLOAD    
                            <div v-if="props.item.showDownloadIcon == true" class="ml-3" style="color:black;display:flex;cursor:pointer">
                                <img @click="downloadData(props.item.JOB_ID,props.item.LOB_NAME,props.item.FILE_URL)" class="export-icon-down" src="../../assets/downloadicon.png" style="height:16px">
                               
                            </div>
                            <!-- {{item.Actions}} -->
                         </td>
                    </template> 
                </v-data-table>

   <template>
 
    <v-dialog
        v-model="dialog"
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable 
        style="overflow-y:scroll;opacity:0.5 ;"
      >
        <v-card tile >
          <v-toolbar
            flat
            dark
            color="white"
          >
            <v-btn
              icon
              light
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title style="color:black">Policy Details</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              right
              offset-y
            >
            </v-menu>
          </v-toolbar>

          <div style="flex: 1 1 auto;width: 80%;margin: 0 auto;" >

            <v-data-table
                    :headers="subheaders"
                    :items="PolicyTabledata"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1">

                      <template slot="items" slot-scope="props" >
                        <td class="text-xs-left pr-2" style="background-color:#EFF3F4;cursor: pointer; ">{{props.item.POLICY_NO}}</td> 
                        <td class="text-xs-left pr-2" style="background-color:#EFF3F4;padding:0px">{{props.item.LOB_NAME}}</td>
                        <td class="text-xs-left pr-2" style="background-color:#EFF3F4">{{ props.item.JOB_START_TIME}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4">
                            <p v-if="props.item.STATUS === 'Success'" class="classSuccess">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'Failed'" class="classFailed">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'In Progress'" class="classProgress" style="width:120px">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'Submitted'" class="classSubmitted">{{props.item.STATUS}}</p>
                        </td>
                       </template>
                       </v-data-table>
                       
                <v-container fluid class="my-3 paginationStyle" v-if="Tabledata.length !== 0">
                    <v-layout justify-end>
                        <div class="margincls mt-3 mr-3">
                            <span> Showing <b>{{ pageStartIndex }}</b> - <b>{{ pageEndIndex }}</b></span>
                            <span> out of <b>{{ totalListCount }}</b> records </span>
                        </div>
                        <v-pagination 
                            class="mr-4 mt-1"
                            v-model="pageNumber" 
                            color="#152F38" :length="getNoOfPages" 
                            :total-visible="5" @input="nextPage($event)">
                        </v-pagination>
                    </v-layout>
                </v-container> 

          </div>

                </v-card>
            </v-dialog>
            </template>
 

                <v-container fluid class="my-3 paginationStyle" v-if="Tabledata.length !== 0">
                    <v-layout justify-end>
                        <div class="margincls mt-3 mr-3">
                            <span> Showing <b>{{ pageStartIndex }}</b> - <b>{{ pageEndIndex }}</b></span>
                            <span> out of <b>{{ totalListCount }}</b> records </span>
                        </div>
                        <v-pagination 
                            class="mr-4 mt-1"
                            v-model="pageNumber" 
                            color="#152F38" :length="getNoOfPages" 
                            :total-visible="5" @input="nextPage($event)">
                        </v-pagination>
                    </v-layout>
                </v-container>
            </div>
            
        </v-card>
    </v-app>
 </template>
<script>

import axios from 'axios'
import xlsx from 'json-as-xlsx'
import moment from 'moment';
import { tokenCred } from '../../common/API_Config';

let tokenDataObj = null
let lastjobid = ''

export default {
    
    data(){
    return {
            dialogm1: '',
            dialog: false,
            actionProcess: true,
            jobBatchStartDateFrom: '',
            jobBatchStartDateTo: '',
            textRule: [v => !!v || 'This Field is required'],
            statusLOB:'',
            statusProdCode:'',
            statusBatchID:'',
            statusBatchStartDate:'',
            jobBatchStartDateMenuFr: '',
            jobBatchStartDateMenuTo: '',
            statusBatchStartDateMenu:'',
            lobDataArray:[],
            prodCodeArray:[],
            search:'',
            searchText: '',
            lobName:"",
            expiryPeriodFrom:'',
            expiryPeriodTo:'',
            page            :   1,
            pageStartIndex  :   1,
            pageRowCount  :   15,
            totalListCount  :   0,
            IsFilter: false,
            PolicyTabledata:[],
            

            headers: [
                { text: 'Batch ID',value: 'JOB_ID',},
                { text: 'LOB', value: 'LOB_NAME' },
                // { text: 'Product Code', value: 'Product Code' },
                // { text: 'Policy Exp. From', value: 'Policy Exp. From' },
                // { text: 'Policy Exp. To', value: 'Policy Exp. To' },
                { text: 'Job Sched Date/Time', value: 'JOB_START_DATE' },
                // { text: 'Job Execution Date', value: 'EXECUTION_END_TIME' },
                { text: 'Remarks', value: 'REMARKS' },
                { text: 'Status', value: 'STATUS' },
                // { text: 'Error Count', value: 'ERROR_COUNT' },
                { text: 'Policy Count', value: 'POLICY_COUNT' },
                { text: 'Actions',sortable:false, value: 'Actions' },
        ],
             subheaders: [
                { text: 'Policy Number',value: 'POLICY_NO',},
                { text: 'LOB', value: 'LOB_NAME' },
                { text: 'Job Sched Date/Time', value: 'JOB_START_DATE' },
                { text: 'Status', value: 'STATUS' },                
            ],
            pagination: {
                rowsPerPage: 15
            },
            rowIndex:'',
            search: '',
            selected: [],
            Tabledata:[],
            skipdiffrence:this.paginationdiff(),
            skip:0,
            pageNumber: 1,
            pagelength:1,   
            expiryPeriodToMenu:true,
            expiryPeriodFromMenu:false, 
        }
    },

    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Collection and Processing Status');
        this.getToken()
        
    },

    computed: {
        computedExpiryPeriodTo(){
            return this.expiryPeriodTo ? moment(this.expiryPeriodTo).format("DD-MM-YYYY"): ''
        },
        computedExpiryPeriodFrom(){
            return this.expiryPeriodFrom ? moment(this.expiryPeriodFrom).format("DD-MM-YYYY"): ''

        },
        computedJobStartDate(){
            return this.jobStartDate ? moment(this.jobStartDate).format("DD-MM-YYYY"): ''
        },
        input_disabled() {
            return this.lineOfBusiness == "" ? true : false;
        },
        input_disabled1() {
            return this.lineOfBusiness == "" ? true : false;
        },
        pages () {
            if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
            ) return 0

            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },  

        pageEndIndex(){
            if(!this.totalListCount){
                return 0
            }else{
                return ((this.pageStartIndex + (this.pageRowCount)) <= this.totalListCount) ? this.pageStartIndex + (this.pageRowCount) - 1 : this.totalListCount;
            }
        },

        getNoOfPages(){
            if(!this.totalListCount){
                return 0;
            }else{
                return Math.ceil(this.totalListCount / this.pageRowCount);
            }
        },
    },

    methods: {

        nextPage(e) {
            let skipdata = e - 1
            // skipdata === 0 ? this.skip = 0 : this.skip = this.skipdiffrence*skipdata
            console.log('Page Number', skipdata)
            if (skipdata === 0) {
                this.skip = 0
                this.pageStartIndex = 1
            } else {
                this.skip = this.pageRowCount * skipdata
                this.pageStartIndex = this.pageRowCount + 1

            }
            this.getTableData('15', this.skip)
        },
        searchData() {
            let self = this
            self.getTableData('15', 0)
        },

        getToken() {
            let self = this
            axios.post(oAuthURl,
                `grant_type=${tokenCred.grantType}&client_id=${tokenCred.clientId}&client_secret=${tokenCred.clientSecret}`
            ).then(res => {

                if (res.status == 200) {
                    tokenDataObj = res.data
                    this.getLOBData()
                    this.getTableData('15', 0)
                    // console.log('POST__TOKEEENNN__RSPPPPPPP' , tokenDataObj)
                }
            })
                .catch(error => { })
        },

        changeLobData(lob) {
            this.prodCodeArray = []

            if (lob.NUM_IL_PRODUCT_CODE == 3188) {
                this.prodCodeArray.push({ text: lob.NUM_IL_PRODUCT_CODE, value: 'pcv' })
                this.statusProdCode = this.prodCodeArray[0]

            } else if (lob.NUM_IL_PRODUCT_CODE == 3189) {
                this.prodCodeArray.push({ text: lob.NUM_IL_PRODUCT_CODE, value: 'gcv' })
                this.statusProdCode = this.prodCodeArray[0]

            } else if (lob.NUM_IL_PRODUCT_CODE == 3191) {

                this.prodCodeArray.push({ text: lob.NUM_IL_PRODUCT_CODE, value: 'mcv' })
                this.statusProdCode = this.prodCodeArray[0]
            } else {
                this.prodCodeArray.push({ text: lob.NUM_IL_PRODUCT_CODE, value: lob.NUM_IL_PRODUCT_NAME })
                this.statusProdCode = this.prodCodeArray[0]
            }
        },
        batchStatusApi(item, url, batchId) {
            // console.log(props);
            console.log("batchStatusApi");
            console.log(item, url, batchId);
            console.log(item.LOB_NAME)
            let self = this;
            self.showToast("Your report is being ready. Please wait for some time", self.TOST().SUCCESS);

            axios({
                method: "post",
                url: "https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/renewal-status",
                headers: {
                    "Authorization": tokenDataObj.token_type + ' ' + tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    "BatchID": batchId,
                    "JOBStartDate": item.JOB_START_DATE,
                    // // "JOBStartDateFrom": item.JOBStartDateFrom,
                    // // "JOBStartDateTo": item.JOBStartDateTo,
                    "LOBName": item.LOB_NAME,
                    "ProductCode": item.PRODUCT_CODE
                },
            }).then(function (response) {
                console.log('response  - - > ', response.data.data);
                if (response.status === 200) {
                    setTimeout(() => {
                        if (response.data.data) {
                            self.Tabledata.map((el) => { el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : '' });
                            self.Tabledata.map((el) => { el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false : '' });
                            self.Tabledata.map((el) => { el.JOB_ID === item.JOB_ID ? el.FILE_URL = response.data.data : '' });

                        } else {
                            self.showToast("Your report is not generated", self.TOST().ERROR);
                        }

                    }, 8000)
                }
            }).catch(function (error) {
                if (error) {
                    self.showToast("Something went wrong, Please try again", self.TOST().ERROR);
                }
            });


        },
        downloadData(batchId, lobName, url) {
            console.log("url = = ", url);
            var link = document.createElement("a");
            link.href = url;
            link.style = "visibility:hidden";
            link.download = batchId + '_' + lobName + ".csv";
            // link.setAttribute('download', 'file.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        },



        getLOBData() {
            let self = this
            let _head = {
                headers: {
                    "Authorization": tokenDataObj.token_type + ' ' + tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
            }
            axios.get('https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/lob', _head).then(function (response) {
                // console.log('RESPPPPPP____________________',response)
                if (response.status == 200) {
                    self.lobDataArray = response.data.data
                }

            }).catch(function (error) { });
        },

        JSONToCSVConvertor2(fileName) {
            var multiplePOlicy = [{ "Product name": "", "Policy no": "", "Previous policy start date": "", "Previous policy End date": "", "Customer name": "", "Status (Success/Failed)": "", "Reason for Error": "" }];
            this.JSONToCSVConvertor(multiplePOlicy, fileName, true);
        },

        JSONToCSVConvertor(JSONData, fileName, ShowLabel, dataItem) {
            console.log(dataItem);
            let self = this;
            axios({
                method: "post",
                url:
                    "https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/renewal-status",
                headers: {
                    "Authorization": tokenDataObj.token_type + ' ' + tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    BatchID: dataItem.JOB_ID,
                    JOBStartDate: dataItem.JOB_START_DATE,
                    LOBName: dataItem.LOB_NAME,
                    ProductCode: dataItem.PRODUCT_CODE,
                    JOBStartDateFrom: '',
                    JOBStartDateTo: '',
                },
            }).then(function (response) {
                console.log('POST RESPONSE:::', response)
                if (response.status == 200) {
                    console.log(response.data.data)
                    let newArr = {};

                    let arraySend = [];
                    var multiplePOlicy = [{ "Product name": "" }, { "Policy no": "" }, { "Previous policy start date": "" }, { "Previous policy End date": "" }, { "Customer name": "" }, { "Status (Success/Failed)": "" }, { "Reason for Error": "" }];
                    if (response.data.data[0].TXT_POLICY_LIST.length == 0) {
                        newArr = multiplePOlicy.map((item, index) => {
                            return { label: Object.keys(multiplePOlicy[index]), value: '' }
                        })
                        arraySend = multiplePOlicy
                    } else {
                        newArr = Object.keys(response.data.data[0].TXT_POLICY_LIST[0]).map((item) => {
                            return { label: item, value: item }
                        })
                        arraySend = response.data.data[0].TXT_POLICY_LIST
                    }
                    console.log("else", newArr)

                    if (fileName.split('_')[1] == 'Medicare - All Variants') {
                        fileName = fileName.split('_')[0] + '_Medicare'
                    }

                    let data = [
                        {
                            sheet: fileName,
                            columns: newArr,
                            content: arraySend
                        },
                    ]

                    let settings = {
                        fileName: fileName, // Name of the spreadsheet
                        extraLength: 3, // A bigger number means that columns will be wider
                        writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
                    }

                    xlsx(data, settings)
                    // }
                }
            }).catch(function (error) {
                // if(error){
                //     self.showToast( "Something wrong" , self.TOST().ERROR);
                //     self.showLoader('Loading',false);
                // }
            });


        },

        submitStatusData(limitvalue, skip) {
            let self = this
            if (this.$refs.formData.validate()) {
                // if (this.jobBatchStartDateFrom < this.jobBatchStartDateTo) {
                axios({
                    method: "post",
                    url:
                        "https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/job-paginator",
                    headers: {
                        "Authorization": tokenDataObj.token_type + ' ' + tokenDataObj.access_token,
                        "Content-Type": "application/json",
                    },
                    data: {
                        limit: limitvalue,
                        offset: skip,
                        moduleName: "batchStatus",
                        batchID: self.statusBatchID,
                        lobName: self.statusLOB.NUM_IL_PRODUCT_NAME,
                        JOBStartDateFrom: self.jobBatchStartDateFrom,
                        JOBStartDateTo: self.jobBatchStartDateTo,
                        productCode: self.statusLOB.NUM_IL_PRODUCT_CODE
                    },
                }).then(function (response) {
                    console.log('POST RESPONSE:::', response)
                    if (response.data.msg === 'Success') {
                        self.showToast("Data Inserted Successfully", self.TOST().SUCCESS);
                        self.Tabledata = []
                        let _respData = response.data.data.Items
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
                                    RENEWAL_EXPIRY_DATE_FROM: _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                                    RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                                    STAGE: _respData[i].STAGE,
                                    STATUS: _respData[i].STATUS,
                                    showDownloadIcon: false,
                                    hidePrevIcon: true,
                                    FILE_URL: _respData[i].FILE_URL,
                                    CSV_DATA: _respData[i].TXT_POLICY_LIST.length == 0 || _respData[i].TXT_POLICY_LIST == '' ? [] : _respData[i].TXT_POLICY_LIST.map(function (el) {
                                        let _data = {
                                            'Product name': _respData[i].LOB_NAME,
                                            'Policy no': el.TXT_POLICY_NO,
                                            'Previous policy start date': el.DAT_PREVIOUSPOLICYSTARTDATE,
                                            'Previous policy End date': el.DAT_PREVIOUSPOLICYENDDATE,
                                            'Customer name': el.TXT_CLIENT_NAME,
                                            'Status (Success/Failed)': el.status,
                                            'Reason for Error': el.hasOwnProperty('message') ? el.message : '',
                                        }
                                        return _data
                                    }),
                                    TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                                }
                                self.Tabledata.unshift(_finalData)
                            }
                            // self.clearalldata();   
                        }
                        self.pageStartIndex = skip + 1;
                        self.totalListCount = response.data.data.Count

                        lastjobid = response.data.data.hasOwnProperty('LastEvaluatedKey') ? response.data.data.LastEvaluatedKey.JOB_ID : ''
                    }
                }).catch(function (error) {
                    if (error) {
                        self.showToast("Enter Valid Data", self.TOST().ERROR);
                        self.showLoader('Loading', false);
                    }
                });
            }
            //   else {
            //             this.showToast("Job Schedular To Date should not be less than Job Schedular From Date", this.TOST().WARNING);
            // }
            // }
            else {
                this.showToast("Please Fill Required Fields", this.TOST().WARNING);
            }
        },


        clearalldata() {
            this.$refs.formData.reset();
            // this.statusLOB = '',
            // this.statusProdCode = '',
            // this.statusBatchID = '',
            // this.statusBatchStartDate = ''
        },


        policyDataTable(limitvalue, skip, batch_id) {
            let self = this
            console.log("--------------------------")
            console.log(batch_id)
            console.log("--------------------------")
            axios({
                method: "post",
                url: 'https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/policiesFilter',

                headers: {
                    "Authorization": tokenDataObj.token_type + ' ' + tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    limit: limitvalue,
                    offset: skip,
                    moduleName: "schedulerBatches",
                    jobid: batch_id ? batch_id : ""
                },
            }).then(function (response) {
                console.log('POLICYFILTERAPI', response.data)
                self.PolicyTabledata = []
                let _respData = response.data.data
                console.log("POLICYFILTERAPI",_respData)
                for (let i = 0; i < _respData.length; i++) {
                    if (_respData[i].LOB_NAME) {
                        let _finalData = {
                            POLICY_NO: _respData[i].POLICY_NO,
                            JOB_START_TIME: _respData[i].JOB_START_TIME,
                            LOB_NAME: _respData[i].LOB_NAME,
                            STATUS: _respData[i].STATUS,
                        }
                       self.PolicyTabledata.unshift(_finalData)

                    }
                }
                    // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata.length)
                self.pageStartIndex = skip + 1;
                self.totalListCount = response.data.data.Count
                
                lastjobid = response.data.data.hasOwnProperty('LastEvaluatedKey') ? response.data.data.LastEvaluatedKey.POLICY_NO : ''
                // let totalCount =  response.data.data.Count
                console.log('DATA Tabledata_______:::plicyapi',self.PolicyTabledata)
                // self.pagelength = Math.ceil(totalCount/self.skipdiffrence)
            }).catch(function (error) {});
            },

        getTableData(limitvalue,skip){
            let self = this
            axios({
                method: "post",
                url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/job-paginator",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json", 
                },
                data: {
                    limit: limitvalue,
                    offset: skip,
                    moduleName:"schedulerBatches",
                    expiryFrom:self.expiryPeriodFrom,
                    expiryTo:self.expiryPeriodTo,
                    parentProductName:self.statusLOB.PARENT_PRODUCT_NAME,
                    stage:self.stage,
                    policyno:self.policyNo
                },
            }).then(function (response) {
                // console.log('DATA RESPONSE:::',response.data)
                self.Tabledata = []
                let _respData = response.data.data.Items
                for(let i = 0 ; i < _respData.length ; i++){
                    if(_respData[i].LOB_NAME){
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
                            RENEWAL_EXPIRY_DATE_FROM: _respData[i].RENEWAL_EXPIRY_DATE_FROM,
                            RENEWAL_EXPIRY_DATE_TO: _respData[i].RENEWAL_EXPIRY_DATE_TO,
                            STAGE: _respData[i].STAGE,
                            STATUS: _respData[i].STATUS,
                            showDownloadIcon: false,
                            hidePrevIcon: true,
                            FILE_URL:_respData[i].FILE_URL,
                            CSV_DATA :_respData[i].TXT_POLICY_LIST.length == 0 || _respData[i].TXT_POLICY_LIST == '' ? [] : _respData[i].TXT_POLICY_LIST.map(function(el) { 
                        let _data = { 
                             'Product name' : _respData[i].LOB_NAME,
                             'Policy no' : el.TXT_POLICY_NO,
                             'Previous policy start date' : el.DAT_PREVIOUSPOLICYSTARTDATE,
                             'Previous policy End date' : el.DAT_PREVIOUSPOLICYENDDATE,
                             'Customer name' : el.TXT_CLIENT_NAME,
                             'Status (Success/Failed)' : el.status,
                             'Reason for Error' : el.hasOwnProperty('message') ? el.message : '', 
                           }
                        return _data
                        }),
                            TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                        }
                        self.Tabledata.unshift(_finalData)
                        // 

                    }
                }
                    // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata.length)
                self.pageStartIndex = skip + 1;
                self.totalListCount = response.data.data.Count
                
                lastjobid = response.data.data.hasOwnProperty('LastEvaluatedKey') ? response.data.data.LastEvaluatedKey.JOB_ID : ''
                // let totalCount =  response.data.data.Count
                console.log('DATA Tabledata_______:::',self.Tabledata)
                

                // self.pagelength = Math.ceil(totalCount/self.skipdiffrence)
            }).catch(function (error) {});
            },
             
                } 
        }
</script>
<style>

.paginationStyle{
    /* background-color: #F7F7F7;  */
    /* box-shadow: 0px 2px 2px #00000051; border: 0.5px solid #C1C8CC;  */
    opacity: 1;
    padding:2px;
    font-size: 12px;
    /* color: black; */
}

.margincls{
    margin-top: 13px;
}

.navpagenumber .v-pagination__navigation{
	box-shadow:unset !important;
	border-radius: unset !important;
	background-color:#FFFFFF !important;
	border:1px solid #DAE1E6 !important;
	height: 29px !important;
	width: 29px !important;
}

.navpagenumber .v-pagination__item{
	box-shadow:unset !important;
	min-width:29px !important;
	height:29px !important;
	border-radius: unset !important;
	border:1px solid #DAE1E6 !important;
	font-size: 13px !important;
    background-color:#07458e !important;
}


.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme--light.v-table thead th {
    color: #fff;
    /* border-right: 1px solid #fff; */
    background-color: #01AFCB;
}

.export-icon{
    height: 15px;
    width: 15px;
}

.searchbox-text-desgn{ 
    /* box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); */
    color:#666767;
    opacity: 1;
    font-family: robotoregular;
    font-size: 14px;   
    padding:13px;
    /* margin-top:20px; */
    /* padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 10px;
    padding-right: 40px; */
}

.cust-dropdwn-hgt.v-text-field.v-text-field--solo .v-input__control{
	min-height: 40px;
}

.cust_pr .v-text-field .v-input__slot,
.v-text-field--outline .v-input__slot {
    
    min-height: 38px !important;
    display: flex !important;
    align-items: center !important;
    /* border:1px red solid; */
}
.cust-rmvpd-pr .v-text-field.v-text-field--enclosed>.v-input__control>.v-input__slot {
    padding: 0px !important;;
}
.cust_pr .v-input{
    font-size: 13px !important;
}
.cust_pr .v-input input {
    font-size: 13px !important;
}

.cust_pr .v-input .v-label {
    font-size: 13px !important;
}

.cardwhitebackclr{
    background-color: #ffffff;
    /* justify-content: center;
    align-items: center; */
}

.reconRle-di .v-text-field.v-text-field--solo .v-input__control{
	min-height: 38px;
}
</style>