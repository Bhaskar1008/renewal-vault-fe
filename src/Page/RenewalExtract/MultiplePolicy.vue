<template>
    <v-app style="background-color:#E8EEEF">
        <div style="margin-left:35px" class="mt-4">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Multiple Policy Modification</v-text>
                </div>
        <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
			<!-- <v-layout class="cardwhitebackclr pa-3" align-center style="">
                <div class="mr-3">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Multiple Policy Modification</v-text>
                </div>
			</v-layout> -->

            <v-divider class=""></v-divider>
            
            <v-form ref="formData">
            <v-layout v-if="hideFields == false" class="pl-3 pt-4" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Line of Business *</p>
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
                                v-model="uploadProdCode"
                            ></v-select >
                        </v-flex>
                        <!-- <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Batch ID *</p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                v-model="uploadBatchID" 
                                :rules="textRule"
                                label="Enter...">
                            </v-text-field>
                        </v-flex> -->
                        <!-- <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Sub Producer Code</p>
                            <v-text-field 
                                solo 
                                label="Enter..."
                                v-model="producerSubCode"
                                
                                return-object
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Dealer Code</p>
                            <v-text-field 
                                solo 
                                label="Enter..."
                                v-model="dealerCode"
                                
                                return-object
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Office location Code</p>
                            <v-text-field 
                                solo 
                                label="Enter..."
                                v-model="locCode"
                                
                                return-object
                            ></v-text-field>
                        </v-flex> -->
                        <!-- <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Upload</p>
                            <v-flex class="dm-fileContainer-bulk mt-1 mr-2" style="border: 1px solid #c1c8cc;">
                                <v-text class="caption font-weight-medium">Uploading Via Browsing</v-text>
                                <v-icon style="cursor:pointer" right>publish</v-icon>
                                <input
                                    hide-details = "true"
                                    type="file"
                                    ref="fileref"
                                    id="fileUpload"
                                    accept=".csv"
                                    @change="onFilePicked"
                                />
                                
                            </v-flex>
                        </v-flex> -->
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Upload</p>
                            <v-flex class="dm-fileContainer-bulk mt-1 mr-2" style="border: 1px solid #c1c8cc;height: 38px;">
                                <label 
                                for="myfile"
                                class="caption font-weight-medium" style="margin-left: 5px;cursor: pointer;">Uploading Via Browsing</label>
                                <!-- <v-icon style="cursor:pointer" right>publish</v-icon> -->
                                <img class="ml-3" src="../../assets/upload.png"/>
                                <input
                                     hide-details= "true"
                                        type="file"
                                        ref="fileref"
                                        id="myfile"
                                        name="myfile"
                                        @change="onFilePicked"
                                />
                                
                            </v-flex>
                        </v-flex>

                        <v-flex style="position:relative;top:20px;width:40px" class="mr-3">
                         <v-btn @click="JSONToCSVConvertor2" class="ma-2" color="#0073BB" dark small>
                            <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon>
                            <v-divider vertical class="mr-2"></v-divider>
                            Sample file format
                            </v-btn>
                        </v-flex>
                        
                    </v-layout>
                </v-flex>
            </v-layout>

            <!-- <v-layout v-if="hideFields == false" class="pl-3 mb-3" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Upload</p>
                            <v-flex class="dm-fileContainer-bulk mt-1 mr-2" style="border: 1px solid #c1c8cc;">
                                <v-text class="caption font-weight-medium">Uploading Via Browsing</v-text>
                                <v-icon style="cursor:pointer" right>publish</v-icon>
                                <input
                                    hide-details = "true"
                                    type="file"
                                    ref="fileref"
                                    id="fileUpload"
                                    accept=".csv"
                                    @change="onFilePicked"
                                />
                                
                            </v-flex>
                        </v-flex>

                        <v-flex style="position:relative;top:20px;width:40px" class="mr-3">
                         <v-btn @click="JSONToCSVConvertor2" class="ma-2" color="#23B1A9" dark small>
                            <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon>
                            <v-divider vertical class="mr-2"></v-divider>
                            Sample file format
                            </v-btn>
                        </v-flex>

                        
                    </v-layout>
                </v-flex>
            </v-layout> -->
            </v-form>

           
            <!-- <v-divider class=""></v-divider> -->
            <v-layout v-if="hideFields == false" class="pa-2" style="position:relative;bottom:15px;float:right">
                
                <!-- <v-btn  class="ma-2" color="#152F38" dark small>
                    <v-icon small dark left class="mr-2">cancel</v-icon>
                    <v-divider vertical class="mr-2"></v-divider>
                    Close
                </v-btn> -->
                <v-btn flat style="width:100px;height:35px;background-color:#FFFFFF;color:#646666;border:1.5px solid #ccc;border-radius:3px" @click="clearUploadData()" class="ma-2 pa-3" color="#646666" dark small>
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
        <v-card class="ma-3 pa-4" v-if="accessPermission.edit === true ? true : false || accessPermission.view === true ? true : false || hideFields == false">
            <v-text-field
                v-model="searchText"
                append-icon="search"
                label="Search"
                single-line
                class="mb-4"
                style="width:20%"
                hide-details
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
                        <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.BATCHID}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.LOB}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.PRODUCT_CODE}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.SUB_PRODUCER_CD}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.DEALER_CODE }}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.OFFICE_LOCATION_CODE}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.APPROVAL_STATUS }}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.DECLINE_REASON }}</td> -->
                        
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.JOB_ID}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.STATUS}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.POL_COUNT}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC;display:flex;position:relative;top:12px;color:#1CAFCB">DOWNLOAD
                            <div class="ml-3" style="cursor:pointer">
                                <img style="width:25px;height:20px" @click="downloadData(props.item.JOB_ID,props.item.LOB_NAME)" class="export-icon" src="../../assets/download_new.png">
                                
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

        <v-card v-if="hideFields == true" class="ma-3">
            <div>
                <v-data-table
                    :headers="headers2"
                    :items="Tabledata2"
                    :search="searchText"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1">

                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.JOB_ID}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.STATUS}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.POL_COUNT}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;position:relative;top:10px;display:flex;border-right: 1px solid #C1C8CC;color:#1CAFCB">DOWNLOAD
                            <div class="ml-3" style=";cursor:pointer">
                                <img @click="downloadData(props.item.JOB_ID,props.item.LOB_NAME)" class="export-icon" src="web/assets/Path93052x.png">
                                <!-- <img v-if="setDownload == true" @click="JSONToCSVConvertor(props.item.CSV_DATA,props.item.JOB_ID+'_'+props.item.LOB_NAME,true,props.item.JOB_ID)" class="export-icon ml-2" src="web/assets/Path93052x.png"> -->
                            </div>
                        </td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">
                             <v-flex class="dm-fileContainer-bulk mt-1 mr-2" style="border: 1px solid #c1c8cc;">
                                <v-text class="caption font-weight-medium">Uploading Via Browsing</v-text>
                                <!-- <v-icon style="cursor:pointer" right>publish</v-icon> -->
                                <img class="ml-3" src="../../assets/upload.png"/>
                                <input
                                    hide-details = "true"
                                    type="file"
                                    ref="fileref"
                                    id="fileUpload"
                                    accept=".csv"
                                    @change="onFileUpload"
                                    :disabled="props.item.VTEXT"
                                />
                                
                            </v-flex>
                        <!-- </v-flex> -->
                        </td>
                        <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.PRODUCER_CD_OLD}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.PRODUCER_CD_NEW}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.PRODUCER_NAME_OLD}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.PRODUCER_NAME_NEW }}</td> -->
                        <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">
                            
                              <v-select
                                label="Enter..."
                                v-model="props.item.APPROVAL_STATUS"
                                @change="changeDecision(props.item.APPROVAL_STATUS,props.item,props.item.DECLINE_REASON)"
                                solo
                                style="width:150px;position:relative;top:12px"
                                :items="decisionItems"
                                class="rounded-0"
                              ></v-select>
                            
                        </td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">
                            
                              <v-text-field
                                label="Enter..."
                                v-model="props.item.DECLINE_REASON"
                                solo
                                style="width:150px;position:relative;top:12px"
                                class="rounded-0"
                              ></v-text-field>
                            
                        </td> -->
                        <td>
                        <v-btn :dark="!props.item.VTEXT" :disabled="props.item.VTEXT" style="position:relative" @click="submitdecision(props.item.APPROVAL_STATUS,props.item,props.item.DECLINE_REASON)" class="ma-2" color="#23B1A9" small>
                            <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon>
                            <v-divider vertical class="mr-2"></v-divider>
                            Submit
                        </v-btn>
                        </td>
                        <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.APPROVAL_STATUS }}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.DECLINE_REASON }}</td> -->
                        <!-- <td v-if="props.item.STATUS === 'Submitted'" class="text-xs-left" style="border-right: 1px solid #C1C8CC">-</td>
                        <td v-if="props.item.STATUS !== 'Submitted'" class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.ERROR_COUNT}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC;display:flex;align-items:center">Download
                            <div class="ml-3" style="display:flex;cursor:pointer" @click="JSONToCSVConvertor(props.item.CSV_DATA,props.item.JOB_ID+'_'+props.item.LOB_NAME,true,props.item.JOB_ID)">
                                <img class="export-icon" src="web/assets/Path93052x.png">
                            </div>
                        </td> -->
                    </template>
                </v-data-table>

                <!-- <div class="text-xs-center pt-2">
                    <v-pagination v-model="pageNumber" color="#152F38" flat :length="pagelength" @input="nextPage($event)"></v-pagination>
                </div> -->
                <v-container fluid class="my-3 paginationStyle" v-if="Tabledata2.length !== 0">
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

let tokenDataObj = null
let lastjobid = ''

export default {
    
    data(){
        return{
            accessPermission:{},
            decisionItems: ['Approve','Reject'],
            decision: '',
            selectFileData:{},
            selectFileData2:{},
            textRule: [v => !!v || 'This Field is required'],
            producerSubCode: '',
            producerName: '',
            uploadLOB:'',
            uploadProdCode: '',
            triggerProdCode:'',
            dealerCode: '',
            locCode: '',
            policyNo: '',
            triggerBatchID:'',
            triggerBatchStartDate:'',
            triggerBatchStartDateMenu:'',
            lobDataArray:[],
            prodCodeArray:[],

            headers: [
                { text: 'Batch ID', value: 'JOB_ID' },
                { text: 'Approval Status', value: 'STATUS' },
                { text: 'Policy Count', value: 'POL_COUNT' },
                { text: 'View Data', value: 'View Data' },

                // { text: 'LOB', value: 'LOB' },
                // { text: 'Product Code', value: 'Product Code' },
                // { text: 'Policy Number', value: 'Policy Number' },
                // { text: 'Producer Name', value: 'Producer Name' },
                // { text: 'Sub Producer Code', value: 'Sub Producer Code' },
                // { text: 'Dealer Code', value: 'Dealer Code' },
                // { text: 'Office location code', value: 'Office location code' },
                // { text: 'Approval Status', value: 'Approval Status' },
                // { text: 'Decline Reason', value: 'Decline Reason' },
            ],
            headers2: [
                { text: 'Batch ID', value: 'JOB_ID' },
                { text: 'Approval Status', value: 'STATUS' },
                { text: 'Policy Count', value: 'POL_COUNT' },
                { text: 'View Data', value: 'View Data' },
                { text: 'File Upload', value: 'File Upload' },
                // { text: 'Producer Name(old)', value: 'Producer Name(old)' },
                // { text: 'Producer Name(New)', value: 'Producer Name(New)' },
                // { text: 'Decision', value: 'Decision' },
                // { text: 'Decline Reason', value: 'Decline Reason' },
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

            searchText: '',
            selected: [],
            Tabledata:[],
            Tabledata2:[],
            skipdiffrence:this.paginationdiff(),
            skip:0,
            pageNumber: 1,
            pagelength:1,
            setDownload: false,
            hideFields: false,
            uploadBatchID: '',
            dataForm: ''
        }
    },

    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Multiple Policy Modification');
        console.log(Math.floor(1000000000 + Math.random() * 9000000000));
        console.log(this.$store.getters.getAgentDetails.designation);
        this.accessPermission=userPermissionValidator('FR9')
        if(this.$store.getters.getAgentDetails.designation == 'maker'){
            this.hideFields = true;
            this.getToken()
            this.getTableData('15',0);
        }else{
            this.hideFields = false;
            this.getToken2()
            this.getTableData2('15',0);
        }
        
    },

    methods: {
        submitdecision(val,data,reason){
            console.log("Dropdown val =>",val,data,reason);
            let self = this;
            if(val == 'Reject' && reason == undefined){
                self.showToast( "Please Enter Decline reason" , self.TOST().WARNING); 
            }else{
                console.log(self.selectFileData2);
                if (self.selectFileData2[0] !== undefined) {
                let formData =  new FormData()
                formData.append("policies", self.selectFileData2[0])
                formData.append("batchId", data.JOB_ID)
                formData.append("approvedBy", this.$store.getters.getAgentDetails.designation)
                console.log('FORMDATA',formData) 

            self.showLoader('Loading',true);
            axios({
                method: "post",
                url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/update/modification-status/multiple",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: formData,
            }).then(function (response) {
                console.log('POST RESPONSE:::',response)
                if(response.data.msg === 'Success'){
                    self.showLoader('Loading',false);
                    self.showToast( "Submitted successfully" , self.TOST().SUCCESS);
                    // self.tableDataBind('15',0,self.triggerProdCode.value,self.policyNo);
                    // self.$refs.formData.reset();
                    
                }
            }).catch(function (error) {
                if(error){
                    self.showLoader('Loading',false);
                    console.log('POST RESPONSE:::',error)
                    
                    self.showToast( error.message, self.TOST().ERROR);
                    
                }
            });
            }else{
                    this.showToast("Please Select Valid file format", this.TOST().ERROR);
                }
            }
            
        },

        changeDecision(val,data,reason){
            console.log("Dropdown val =>",val,data);
            
        },

        onFilePicked(event){
            console.log('CSVVV FILEEEE @CHANGE ____________________',event.target.files)
            let self = this
            self.selectFileData = event.target.files            
            if(event.target.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ){
                if(Object.keys(self.selectFileData).length !== 0 ){
                    self.showToast( "File Added Successfully" , self.TOST().SUCCESS);
                }
            }else{
                self.selectFileData = ''
                self.showToast( "Only Excel file allowed" , self.TOST().WARNING);
            }
        },

        onFileUpload(event){
            console.log('CSVVV FILEEEE @CHANGE ____________________',event.target.files)
            let self = this
            if(event.target.files[0].type == 'application/vnd.ms-excel' || event.target.files[0].type == 'text/csv'){
            self.selectFileData2 = event.target.files
            console.log('CSVVV FILEEEE @CHANGE ____________________',self.selectFileData2)
            if(Object.keys(self.selectFileData2).length !== 0 ){
                self.showToast( "Status Updated Successfully" , self.TOST().SUCCESS);
            }
            }else{
                self.selectFileData2 = ''
                console.log('CSVVV FILEEEE @CHANGE ____________________',self.selectFileData2)
                self.showToast( "Only CSV files allowed" , self.TOST().WARNING);
            }
            
        },

        JSONToCSVConvertor2(){
            var multiplePOlicy = [{"MASTER POLICY" : "9876","LOB":"GCV","PRODUCER CODE":"98","PRODUCER NAME":"Test","SUB PRODUCER CODE":"Test","SUB PRODUCER NAME":"Test","PRODUCER TYPE":"Test","DEALER CODE":"Test","OFFICE LOCATION CODE":"Test","OFFICE LOCATION NAME":"Test"}];
            this.JSONToCSVConvertor(multiplePOlicy,"SampleMultiplePolicyUpload",true);   
        },

        clearUploadData(){
            let self = this
            // self.uploadLOB = ''
            // self.uploadProdCode = ''
            // self.uploadBatchID = ''
            self.$refs.formData.reset();
            self.selectFileData = {}
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
            // this.getdata('15',this.skip)
            this.getTableData('15',this.skip)
        },
        getToken2(){
            let self = this
            axios.post(config.oAuthURl,
                'grant_type=client_credentials&client_id=4mvhrgqptajd0stm50l7g1alin&client_secret=1job69ftt8042aa4geppjf05bp005lkkgogt7reegl00cslqosbn'
            ).then( res => {
                
                if(res.status == 200){
                    tokenDataObj = res.data
                    this.getLOBData()
                    this.getTableData2('15',0)
                    // console.log('POST__TOKEEENNN__RSPPPPPPP' , tokenDataObj)
                }
            })
            .catch(error => {})
        },
        getToken(){
            let self = this
            axios.post('https://397611673480-auth.auth.ap-south-1.amazoncognito.com/oauth2/token',
                'grant_type=client_credentials&client_id=4mvhrgqptajd0stm50l7g1alin&client_secret=1job69ftt8042aa4geppjf05bp005lkkgogt7reegl00cslqosbn'
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
            // this.uploadProdCode = this.prodCodeArray[0]
            // console.log('LOBBB @CHANGE ____________________',lob)
            if(lob.NUM_IL_PRODUCT_CODE == 3188){
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'pcv'})
                this.uploadProdCode = this.prodCodeArray[0]

            }else if(lob.NUM_IL_PRODUCT_CODE == 3189){
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'gcv'})
                this.uploadProdCode = this.prodCodeArray[0]

            }else if(lob.NUM_IL_PRODUCT_CODE == 3191){
                
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'mcv'})
                this.uploadProdCode = this.prodCodeArray[0]
            }else{
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:lob.NUM_IL_PRODUCT_NAME})
                this.uploadProdCode = this.prodCodeArray[0]
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
            axios.get(`https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/lob-list?productcodes=${lob_list}`, _head).then(function (response) {
                // console.log('RESPPPPPP____________________',response)
                if(response.status == 200){
                    self.lobDataArray = response.data.data
                }
                
            }).catch(function (error) {});
        },

        addNewIcon(batchId,item) {
            this.showToast( "Your report is being ready. please wait for some time" , this.TOST().SUCCESS);
            axios({
                method: "get",
                url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/policy-download/"+ batchId,
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
            }).then(function (response) {
                console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
                this.fileLinkUrl = response.data.fileURL;
                if(response.data.status === 200){
                    // self.JSONToCSVConvertor(response.data.data,batchId+'_'+lobName,true)
                    console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
            
                }
            }).catch(function (error) {});
            
            var clearIntervalTime = setInterval(() => {
                axios({
                method: "get",
                url: "https://397611673480-renewal-vault-docs.s3.ap-south-1.amazonaws.com/1626160431-MotorCommercialGCV.csv",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
            }).then(function (response) {
                console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
                if(response.status === 200){
                    this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
                    this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false : ''});
                    clearInterval(clearIntervalTime);
                    
                }
            }).catch(function (error) {
                if(error){
                clearInterval(clearIntervalTime);
                }
            });

            },10000)

            // setTimeout(() => {
            //     this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
            //     this.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false : ''});
            // },300000)

        },

        downloadData(batchId,stage) {
            let self = this;
            axios({
                method: "get",
                url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/get-modified-policy-group/"+stage+"/"+batchId,
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
            }).then(function (response) {
                console.log('GETTTT___DOWNLOAD RESPONSE:::',response)
                if(response.data.status === 200){
                    self.JSONToCSVConvertor(response.data.data,batchId+'_'+stage,true)

                    // var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
                    // var link = document.createElement("a");
                    // link.href = response.data.fileURL;
                    // link.style = "visibility:hidden";
                    // link.download = batchId+'_'+lobName + ".csv";
                    // // link.setAttribute('download', 'file.csv');
                    // document.body.appendChild(link);
                    // link.click();
                    // document.body.removeChild(link);
                }
            }).catch(function (error) {});
        },

        JSONToCSVConvertor(JSONData, fileName, ShowLabel) {
            // this.batchIDData = batchID
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

            // console.log('CSV___________' , JSONData)
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
            // console.log('CSV___________' , JSONData)
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
            console.log('GETTTT___UPLOAD RESPONSE:::',self.selectFileData[0])
            
            if(!this.$refs.formData.validate()){
                this.$refs.formData.validate();
                this.showToast("Please Enter Valid Data", this.TOST().WARNING);
            }else if(self.uploadLOB != undefined && self.selectFileData[0] == undefined){
                this.showToast("Please Select file to upload", this.TOST().WARNING);
            }else{
                console.log('FINE')
            // if(Object.keys(self.selectFileData).length !== 0 ){
                console.log(self.selectFileData);
                if (self.selectFileData[0] !== undefined) {
                    // let _batch_Id = self.selectFileData[0].name.split('_')[0]
                    // let stageData = self.selectFileData[0].name.split('_')[1]
                    // let _state = stageData.includes('GCV') ? 'gcv' : stageData.includes('PCV') ? 'pcv' : stageData.includes('MCV') ? 'mcv' :''
                    let randomVal = Math.floor(1000000000 + Math.random() * 9000000000).toString();
                    let formData =  new FormData()
                    formData.append("policies", self.selectFileData[0])
                    formData.append("batchId", randomVal)
                    // formData.append("batchId", self.batchIDData !== '' ? self.batchIDData : _batch_Id)
                    formData.append("stage", self.uploadProdCode.value)
                    console.log('FORMDATA',formData)
                    self.showLoader('Loading',true);
                    axios({
                        method: "post",
                        url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/policy-modification/multiple",
                        headers: {
                            "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                            "Content-Type": "application/json",
                        },
                        data: formData ,
                    }).then(function (response) {
                        console.log('GETTTT___UPLOAD RESPONSE:::',response)
                        if(response.data.status === 200){
                            self.showLoader('Loading',false);
                            self.showToast( "File Uploaded Successfully" , self.TOST().SUCCESS);
                            self.dataForm = formData;
                            self.getTableData2('15',0)
                            // self.tableDataBind('15',0,self.triggerProdCode.value,self.policyNo);
                            // self.tableDataBind(self.uploadProdCode.value,randomVal);
                            self.$refs.formData.reset();
                            
                            // self.uploadLOB = ''
                            // self.uploadProdCode = ''
                            // self.uploadBatchID = ''
                        }
                    }).catch(function (error) {
                        if(error){
                            self.showLoader('Loading',false);
                            self.showToast( "In file "+error.response.data.errors , self.TOST().ERROR);
                        }
                    });
                }else{
                    this.showToast("Please Select Valid file format", this.TOST().ERROR);
                }

            }
        },

        tableDataBind(stage,batchId){
            let self = this
            axios({
                method: "get",
                url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/get-modified-policy-group/"+stage+"/"+batchId,
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
            }).then(function (response) {
                console.log('DATA RESPONSE:::',response.data.data) 
                self.Tabledata = []
                let _respData = response.data.data
                self.Tabledata = _respData.map((item) => {
                    return{
                        BATCHID: item.BATCH_ID,
                        LOB: item.TXT_STAGE == 'gcv' ? 'MotorCommercialGCV': item.TXT_STAGE == 'pcv' ? 'MotorCommercialPCV': 'MotorCommercialMCV',
                        PRODUCT_CODE: item.TXT_PRODUCER_CD,
                        POLICY_NO: item.TXT_POLICY_NO,
                        PRODUCER_NAME: item.TXT_PRODUCER_NAME,
                        SUB_PRODUCER_CD: item.TXT_SUB_PRODUCER_CD,
                        DEALER_CODE: item.TXT_DEALER_CODE,
                        OFFICE_LOCATION_CODE: item.TXT_OFFICE_LOCATION_CODE,
                        APPROVAL_STATUS: item.APPROVAL_STATUS,
                        DECLINE_REASON: item.DECLINE_REASON,
                    }
                })
                

                // console.log('DATA Tabledata_______:::',self.Tabledata)
                
            }).catch(function (error) {});
        },

        getTableData2(limitvalue,skip){
            let self = this
            axios({
                method: "post",
                url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/policy-modification-paginator/multiple",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    limit: limitvalue,
                    offset: skip
                    // lastEvaluatedKey: skip	
                    // lastEvaluatedKey : {JOB_ID: skip}
                },
            }).then(function (response) {
                console.log('DATA RESPONSE:::',response.data)
                self.Tabledata = []
                let _respData = response.data.data
                for(let i = 0 ; i < _respData.length ; i++){
                    let _finalData = {
                        STATUS: _respData[i].APPROVAL_STATUS,
                        POL_COUNT: _respData[i].POLICY_COUNT,
                        WHOLE_DATA: _respData,
                        JOB_ID: _respData[i].BATCH_ID,
                        POLICY_NO: _respData[i].TXT_POLICY_NO,
                        LOB_NAME: _respData[i].TXT_STAGE,
                        PRODUCER_CD_OLD: _respData[i].TXT_PRODUCER_CD,
                        PRODUCER_CD_NEW: _respData[i].TXT_PRODUCER_CD,
                        PRODUCER_NAME_OLD: _respData[i].TXT_PRODUCER_NAME,
                        PRODUCER_NAME_NEW: _respData[i].TXT_PRODUCER_NAME,
                        // TXT_STAGE: _respData[i].TXT_STATE,
                        // SUB_PRODUCER_CD: _respData[i].TXT_SUB_PRODUCER_CD,
                        // DEALER_CODE: _respData[i].TXT_DEALER_CODE,
                        // OFFICE_LOCATION_CODE: _respData[i].OFFICE_LOCATION_CODE,
                        VIEW_DTA: '',
                        ACTION: ''
                    }
                    self.Tabledata.push(_finalData)
                    // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata)
                }

                console.log('DATA Tabledata_______:::',self.Tabledata)
                
                // lastjobid = response.data.data.hasOwnProperty('LastEvaluatedKey') ? response.data.data.LastEvaluatedKey.JOB_ID : ''
                // let totalCount =  response.data.data.Count
                self.totalListCount = response.data.data.length
                
                // self.pagelength = Math.ceil(totalCount/self.skipdiffrence)
            }).catch(function (error) {});
        },

        getTableData(limitvalue,skip){
            let self = this
            axios({
                method: "post",
                url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/policy-modification-paginator/multiple",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    limit: limitvalue,
                    offset: skip
                    // lastEvaluatedKey: skip	
                    // lastEvaluatedKey : {JOB_ID: skip}
                },
            }).then(function (response) {
                console.log('DATA RESPONSE:::',response.data)
                self.Tabledata2 = []
                let _respData = response.data.data
                for(let i = 0 ; i < _respData.length ; i++){
                    let _finalData = {
                        VTEXT: _respData[i].APPROVAL_STATUS == 'Approve' || _respData[i].APPROVAL_STATUS == 'Partial Approve' || _respData[i].APPROVAL_STATUS == 'Decline' ? true: false,
                        STATUS: _respData[i].APPROVAL_STATUS,
                        POL_COUNT: _respData[i].POLICY_COUNT,
                        WHOLE_DATA: _respData,
                        JOB_ID: _respData[i].BATCH_ID,
                        POLICY_NO: _respData[i].TXT_POLICY_NO,
                        LOB_NAME: _respData[i].TXT_STAGE,
                        PRODUCER_CD_OLD: _respData[i].TXT_PRODUCER_CD,
                        PRODUCER_CD_NEW: _respData[i].TXT_PRODUCER_CD,
                        PRODUCER_NAME_OLD: _respData[i].TXT_PRODUCER_NAME,
                        PRODUCER_NAME_NEW: _respData[i].TXT_PRODUCER_NAME,
                        // TXT_STAGE: _respData[i].TXT_STATE,
                        // SUB_PRODUCER_CD: _respData[i].TXT_SUB_PRODUCER_CD,
                        // DEALER_CODE: _respData[i].TXT_DEALER_CODE,
                        // OFFICE_LOCATION_CODE: _respData[i].OFFICE_LOCATION_CODE,
                        VIEW_DTA: '',
                        ACTION: ''
                    }
                    self.Tabledata2.push(_finalData)
                    // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata)
                }

                console.log('DATA Tabledata_______:::',self.Tabledata2)
                
                // lastjobid = response.data.data.hasOwnProperty('LastEvaluatedKey') ? response.data.data.LastEvaluatedKey.JOB_ID : ''
                // let totalCount =  response.data.data.Count
                self.totalListCount = response.data.data.length
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
            return this.uploadBatchStartDate ? moment(this.uploadBatchStartDate).format("DD-MM-YYYY"): ''
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
    border-right: 1px solid #fff;
    background-color: #01AFCB;
}

.export-icon{
    height: 15px;
    width: 15px;
}

.export-icon-down{
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