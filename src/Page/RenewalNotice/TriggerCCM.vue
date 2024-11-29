<template>
    <v-app style="background-color:#E8EEEF">
        <div style="margin-left:35px" class="mt-4">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Trigger to CCM</v-text>
                </div>
        <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
			<!-- <v-layout class="cardwhitebackclr pa-3" align-center style="">
                <div class="mr-3">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Trigger to CCM</v-text>
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
                                v-model="triggerLOB"
                                :items="lobDataArray"  
                                item-text="NUM_IL_PRODUCT_NAME"
                                item-value="NUM_IL_PRODUCT_CODE"
                                return-object
                                :rules="textRule"
                                @change="changeLobData(triggerLOB)"
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
                                v-model="triggerProdCode"
                            ></v-select >
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Batch ID</p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                
                                v-model="triggerBatchID" 
                                label="Enter...">
                            </v-text-field>
                        </v-flex>
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
                                        <div  slot="prepend-inner" style="position:relative;right:12px;background-color:#F7F7F7;bottom:5px"><img class="pa-1" style="height:35px" src="../../assets/date_24X24.png"/></div></v-text-field>
                                    </template>
                                    <v-date-picker @input="jobBatchStartDateMenuFr = false" v-model="jobBatchStartDateFrom" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                        </v-flex>
                       
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout class="pl-3" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        <v-flex xs3 style="margin-right:5%">
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
                                        <div  slot="prepend-inner" style="position:relative;right:12px;background-color:#F7F7F7;bottom:5px"><img class="pa-1" style="height:35px" src="../../assets/date_24X24.png"/></div></v-text-field>
                                    </template>
                                    <v-date-picker @input="jobBatchStartDateMenuTo = false" v-model="jobBatchStartDateTo" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3></v-flex>
                        <v-flex xs3></v-flex>
                        <v-flex xs3></v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            </v-form>
           
            <!-- <v-divider class=""></v-divider> -->
            <v-layout class="pa-2" style="position:relative;bottom:15px;float:right">
                
                <!-- <v-btn  class="ma-2" color="#152F38" dark small>
                    <v-icon small dark left class="mr-2">cancel</v-icon>
                    <v-divider vertical class="mr-2"></v-divider>
                    Close
                </v-btn> -->
                <v-btn  flat style="width:100px;height:35px;background-color:#FFFFFF;color:#646666;border:1.5px solid #ccc;border-radius:3px" @click="clearTriggerData()" class="ma-2 pa-3" color="#646666" dark small>
                    <!-- <v-icon small dark left class="mr-2">delete</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Clear
                </v-btn>
                <v-btn flat style="width:100px;height:35px;background-color:#0073BB;color:#FFFFFF;border:1.5px solid #ccc;border-radius:4px" @click="submitStatusData()" class="ma-2 pa-3" color="#0073BB" dark small>
                    <!-- <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Submit
                </v-btn>
            </v-layout>
        </v-card>

        <v-card class="ma-3 pa-4" v-if="accessPermission.edit === true ? true : false || accessPermission.view === true ? true : false">
            <v-text-field
                v-model="searchText"
                append-icon="search"
                label="Search"
                single-line
                class="mb-4"
                style="width:20%"
                hide-details
                @input="getTableData('15',0)"
            ></v-text-field>
            <div>
                <v-data-table
                    :headers="headers"
                    :items="Tabledata"
                    :search="searchText"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1">

                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left" style="background-color:#EFF3F4;">{{props.item.JOB_ID}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;">{{props.item.LOB_NAME}}</td>
                        <!-- <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.PRODUCT_CODE}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{ props.item.RENEWAL_EXPIRY_DATE_FROM}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{ props.item.RENEWAL_EXPIRY_DATE_TO }}</td> -->
                        <td class="text-xs-left" style="background-color:#EFF3F4">{{ props.item.JOB_START_DATE}} {{ props.item.JOB_START_TIME}}</td>
                        <td class="text-xs-left truncate" style="background-color:#EFF3F4;display:flex;align-items:center">{{props.item.REMARKS}}
                            <v-tooltip left class="ml-2" style="display:flex">
                                <v-icon slot="activator" small>info</v-icon><span>{{ props.item.REMARKS }}</span>
                            </v-tooltip>
                        </td>
                        <td class="text-xs-left" style="background-color:#EFF3F4">
                            <p v-if="props.item.STATUS === 'Success'" class="classSuccess">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'Failed'" class="classFailed">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'In Progress'" class="classProgress">{{props.item.STATUS}}</p>
                            <p v-if="props.item.STATUS === 'Submitted'" class="classProgress">{{props.item.STATUS}}</p>
                        </td>
                        <!-- <td class="text-xs-left" style="background-color:#EFF3F4">{{ props.item.BRE_JOB_STATUS }}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4">{{ props.item.CCM_JOB_STATUS }}</td> -->
                        <!-- <td v-if="props.item.STATUS === 'Submitted'" class="text-xs-left" style="background-color:#EFF3F4">-</td> -->
                        <td class="text-xs-left" style="background-color:#EFF3F4">{{props.item.ERROR_COUNT}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4">{{props.item.POLICY_COUNT}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center">DOWNLOAD
                            <div class="ml-3" style="display:flex;cursor:pointer" @click="JSONToCSVConvertor(props.item.CSV_DATA,props.item.JOB_ID+'_'+props.item.LOB_NAME,true,props.item.JOB_ID)">
                                <img class="export-icon" src="../../assets/downloadicon.png">
                            </div>
                        </td>
                    </template>
                </v-data-table>

                <!-- <div class="text-xs-center pt-2">
                    <v-pagination v-model="pageNumber" color="#152F38" flat :length="pagelength" @input="nextPage($event)"></v-pagination>
                </div> -->
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
import {BaseURl, oAuthURl, tokenCred} from "../../common/API_Config.js"
import { userPermissionValidator } from "./validator/permissionValidator"


let tokenDataObj = null
let lastjobid = ''

export default {
    
    data(){
        return{
            accessPermission:{},
            jobBatchStartDateFrom: '',
            jobBatchStartDateTo: '',
            textRule: [v => !!v || 'This Field is required'],
            triggerLOB:'',
            triggerProdCode:'',
            triggerBatchID:'',
            triggerBatchStartDate:'',
            jobBatchStartDateMenuFr: '',
            jobBatchStartDateMenuTo: '',
            triggerBatchStartDateMenu:'',
            lobDataArray:[],
            prodCodeArray:[],
            searchText:'',

             headers: [
                {
                text: 'Batch ID',
                // align: 'start',
                // sortable: false,
                value: 'JOB_ID',
                },
                { text: 'LOB', value: 'LOB_NAME' },
                // { text: 'Product Code', value: 'Product Code' },
                // { text: 'Policy Exp. From', value: 'Policy Exp. From' },
                // { text: 'Policy Exp. To', value: 'Policy Exp. To' },
                { text: 'Job Sched Date/Time', value: 'JOB_START_DATE' },
                { text: 'Remarks', value: 'REMARKS' },
                { text: 'Status', value: 'STATUS' },
                // { text: 'BRE Status', value: 'BRE Status' },
                // { text: 'CCM Status', value: 'CCM Status' },
                { text: 'Error Count', value: 'ERROR_COUNT' },
                { text: 'Policy Count', value: 'POLICY_COUNT' },
                { text: 'Actions', value: 'Actions' },
            ],

            pagination: {
                rowsPerPage: 15
            },

            page            :   1,
            pageStartIndex  :   1,
            pageRowCount  :   15,
            totalListCount  :   0,
            IsFilter: false,

            search: '',
            selected: [],
            Tabledata:[],
            skipdiffrence:this.paginationdiff(),
            skip:0,
            pageNumber: 1,
            pagelength: 1,
            searchFlag:false
        }
    },

    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Trigger to CCM');
        this.getToken()
        this.accessPermission = userPermissionValidator("FR6");
        
    },

    methods: {
        clearTriggerData(){
            let self = this
            self.$refs.formData.reset();
            // self.triggerLOB = ''
            // self.triggerProdCode = ''
            // self.triggerBatchID = ''
            self.getTableData('15',0)
        },

        nextPage(e) {
            let skipdata = e - 1
            // skipdata === 0 ? this.skip = 0 : this.skip = this.skipdiffrence*skipdata
            console.log('Page Number',skipdata)
            if(skipdata === 0 ){
                this.skip = 0
                this.pageStartIndex = 1
            }else{
                this.skip = this.pageRowCount*skipdata
                this.pageStartIndex = this.pageRowCount+1
            }
            this.getTableData('15',this.skip, this.searchFlag=false)
        },

        getToken(){
            let self = this
            axios.post(oAuthURl,
                `grant_type=${tokenCred.grantType}&client_id=${tokenCred.clientId}&client_secret=${tokenCred.clientSecret}`
            ).then( res => {
                
                if(res.status == 200){
                    tokenDataObj = res.data
                    this.getLOBData()
                    this.getTableData('15',0)
                    // console.log('POST__TOKEEENNN__RSPPPPPPP' , tokenDataObj)
                }
            })
            .catch(error => {})
        },

        changeLobData(lob){
            this.prodCodeArray = []
            // this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:lob.NUM_IL_PRODUCT_NAME})
            // this.triggerProdCode = this.prodCodeArray[0]
            // console.log('LOBBB @CHANGE ____________________',lob)
            if(lob.NUM_IL_PRODUCT_CODE == 3188){
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'pcv'})
                this.triggerProdCode = this.prodCodeArray[0]

            }else if(lob.NUM_IL_PRODUCT_CODE == 3189){
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'gcv'})
                this.triggerProdCode = this.prodCodeArray[0]

            }else if(lob.NUM_IL_PRODUCT_CODE == 3191){
                
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'mcv'})
                this.triggerProdCode = this.prodCodeArray[0]
            }else{
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:lob.NUM_IL_PRODUCT_NAME})
                this.triggerProdCode = this.prodCodeArray[0]
            }
        },

        getLOBData(){
            let self = this
            let access_list_fr = JSON.parse(localStorage.loginResp)
             let lob_list = JSON.stringify(access_list_fr.data.LOB)
            let _head = {
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
            }
            axios.get(BaseURl + `/lob-list?productcodes=${lob_list}`, _head).then(function (response) {
                // console.log('RESPPPPPP____________________',response)
                if(response.status == 200){
                    self.lobDataArray = response.data.data
                }
                
            }).catch(function (error) {});
        },

        JSONToCSVConvertor(JSONData, fileName, ShowLabel) {
            let newArr = Object.keys(JSONData[0]).map((item) => {
                return {label: item, value: item }
            })

            let data = [
              {
                sheet: fileName,
                columns: newArr,
                content: JSONData
              },
            ]

            let settings = {
                fileName: fileName, // Name of the spreadsheet
                extraLength: 3, // A bigger number means that columns will be wider
                writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
              }
             
            xlsx(data,settings)

            console.log(Object.keys(JSONData[0]), JSONData);
            
            // var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            // var CSV = '';
            // if (ShowLabel) {
            //     var row = "";
            //     for (var index in arrData[0]) {
            //         row += index + ',';
            //     }
            //     row = row.slice(0, -1);
            //     CSV += row + '\r\n';
            // }
            // for (var i = 0; i < arrData.length; i++) {
            //     var row = "";
            //     for (var index in arrData[i]) {
            //         var arrValue = arrData[i][index] == null ? "" : arrData[i][index];
            //         row += arrValue + ',';
            //     }
            //     row.slice(0, row.length - 1);
            //     CSV += row + '\r\n';
            // }
            // if (CSV == '') {
            //     growl.error("Invalid data");
            //     return;
            // }
            // console.log('CSV___________' , CSV)
            // var fileName = fileName;
            
            // var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
            // var link = document.createElement("a");
            // link.href = uri;
            // link.style = "visibility:hidden";
            // link.download = fileName + ".xlsx";
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        },

        submitStatusData(){
            let self = this
            if(this.$refs.formData.validate()){
            self.showLoader('Loading',true);
            axios({
                method: "post",
                url:BaseURl +"/trigger-ccm",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    batchID: self.triggerBatchID,
                    stage: self.triggerProdCode.value,
                    JOBStartDateFrom: self.jobBatchStartDateFrom,
                    JOBStartDateTo: self.jobBatchStartDateTo,
                },
            }).then(function (response) {
                console.log('POST RESPONSE:::',response)
                if(response.data.msg === 'Success'){
                    self.showLoader('Loading',false);
                    self.showToast( "Submitted successfully" , self.TOST().SUCCESS);
                     self.getTableData('15',0);
                    // console.log('((((((((((((Tabledata)))))))))))) RESPONSE:::',self.Tabledata)
                    // self.triggerLOB = ''
                    // self.triggerProdCode = ''
                    // self.triggerBatchID = ''
                }
            }).catch(function (error) {
                if(error){
                    self.showToast( "Enter Valid Data" , self.TOST().ERROR);
                    self.showLoader('Loading',false);
                }
            });
            }else {
                this.showToast("Please Fill Required Fields", this.TOST().WARNING);
            }
        },

        getTableData(limitvalue,skip){
            let self = this
            
            axios({
                method: "post",
                url:BaseURl +"/job-paginator",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    limit: limitvalue,
                    offset: skip,
                    moduleName:"triggerToCCM"
                },
            }).then(function (response) {
                // console.log('DATA RESPONSE:::',response.data) 
                self.Tabledata = []
                let _respData = response.data.data.Items
                for(let i = 0 ; i < _respData.length ; i++){
                    console.log('(((((((((CCM_JOB_STATUS))))))))):::',_respData[i].CCM_JOB_STATUS) 
                    if( _respData[i].LOB_NAME){
                        let _finalData = {
                            ERROR_COUNT: _respData[i].ERROR_COUNT,
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
                            CCM_JOB_STATUS: _respData[i].hasOwnProperty('CCM_JOB_STATUS') ? _respData[i].CCM_JOB_STATUS : '-',
                            BRE_JOB_STATUS: _respData[i].hasOwnProperty('CCM_JOB_STATUS') ? _respData[i].CCM_JOB_STATUS : '-',
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
                        self.Tabledata.push(_finalData)
                    }
                    // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata)
                }

                // console.log('DATA Tabledata_______:::',self.Tabledata)
                
                lastjobid = response.data.data.hasOwnProperty('LastEvaluatedKey') ? response.data.data.LastEvaluatedKey.JOB_ID : ''
                let totalCount =  response.data.data.Count
                self.totalListCount = response.data.data.Count
                // self.pagelength = Math.ceil(totalCount/self.skipdiffrence)
            }).catch(function (error) {});
        },
    },

    computed: {
        pages () {
            if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
            ) return 0

            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },

        computedJobStartDate(){
            return this.triggerBatchStartDate ? moment(this.triggerBatchStartDate).format("DD-MM-YYYY"): ''
        },

        computedjobStartDateFrom(){
            return this.jobBatchStartDateFrom ? moment(this.jobBatchStartDateFrom).format("DD-MM-YYYY"): ''
        },

        computedjobStartDateTo(){
            return this.jobBatchStartDateTo ? moment(this.jobBatchStartDateTo).format("DD-MM-YYYY"): ''
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
}
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