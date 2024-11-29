<template>
    <v-app style="background-color:#E8EEEF">
        <div style="margin-left:35px" class="mt-4">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Single Policy Modification</v-text>
                </div>
        <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
			<!-- <v-layout class="cardwhitebackclr pa-3" align-center style="">
                <div class="mr-3">
                    <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Single Policy Modification</v-text>
                </div>
			</v-layout> -->

            <v-divider class=""></v-divider>

            <v-form ref="formData">
            <v-layout v-if="hideFields == false" class="pl-3 pt-4" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Policy No. *</p>
                            <v-text-field 
                                solo 
                                label="Enter..."
                                v-model="policyNo"
                                :rules="textRule"
                                return-object
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Line of Business *</p>
                            <v-select 
                                solo 
                                label="Select"
                                v-model="triggerLOB"
                                :items="lobDataArray"  
                                :rules="textRule"
                                item-text="NUM_IL_PRODUCT_NAME"
                                item-value="NUM_IL_PRODUCT_CODE"
                                return-object
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
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Producer Code *</p>
                            <v-text-field 
                                solo 
                                label="Enter..."
                                v-model="producerCode"
                                :rules="textRule"
                                return-object
                            ></v-text-field>
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
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Producer Name</p>
                            <v-text-field 
                                solo 
                                label="Enter..."
                                v-model="producerName"
                                
                                return-object
                            ></v-text-field>
                        </v-flex>
                        

                        <!-- <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Sub Producer Code</p>
                            <v-text-field 
                                solo 
                                label="Enter..."
                                v-model="producerSubCode"
                                
                                return-object
                            ></v-text-field>
                        </v-flex> -->
                       
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout v-if="hideFields == false" class="pl-3 pt-2" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        
                        <v-flex xs3 class="mr-3">
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
                        </v-flex>
                        <v-flex xs3 class="">
                            <!-- <p class="font-weight-bold mb-1 caption" style="color:#646666">Renewal Status</p>
                            <v-text-field 
                                solo 
                                label="Enter..."
                                v-model="policyNo"
                                :rules="textRule"
                                return-object
                            ></v-text-field> -->
                        </v-flex>                
                        <v-flex xs3 class="">
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            </v-form>
           
            <!-- <v-divider class=""></v-divider> -->
            <v-layout v-if="hideFields == false" class="pa-2" style="position:relative;bottom:15px;float:right">
                
                <!-- <v-btn  class="ma-2" color="#152F38" dark small>
                    <v-icon small dark left class="mr-2">cancel</v-icon>
                    <v-divider vertical class="mr-2"></v-divider>
                    Close
                </v-btn> -->
                <v-btn flat style="width:100px;height:35px;background-color:#FFFFFF;color:#646666;border:1.5px solid #ccc;border-radius:3px" @click="clearTriggerData()" class="ma-2 pa-3" dark small>
                    <!-- <v-icon small dark left class="mr-2">delete</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Clear
                </v-btn>
                <v-btn flat style="width:100px;height:35px;background-color:#0073BB;color:#FFFFFF;border:1.5px solid #ccc;border-radius:4px" @click="submitStatusData()" class="ma-2 pa-3"  dark small>
                    <!-- <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Submit
                </v-btn>
            </v-layout>
        </v-card>

        <v-card class="ma-3 pa-4" v-if="accessPermission.view === true ? true : false || accessPermission.edit === true ? true : false || hideFields == false">
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
                    :items="computedTable"
                    :search="searchText"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1">

                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.LOB}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.PRODUCER_CODE}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.POLICY_NO}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{ props.item.PRODUCER_NAME}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{ props.item.SUB_PRODUCER_CD }}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{ props.item.DEALER_CODE}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{ props.item.OFFICE_LOCATION_CODE }}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC;display:flex;justify-content:center">
                            <!-- {{ props.item.APPROVAL_STATUS }} -->
                            <p v-if="props.item.APPROVAL_STATUS === 'Success'" class="classSuccess">{{props.item.APPROVAL_STATUS}}</p>
                            <p v-if="props.item.APPROVAL_STATUS === 'Failed'" class="classFailed">{{props.item.APPROVAL_STATUS}}</p>
                            <p v-if="props.item.APPROVAL_STATUS === 'Pending'" class="classProgress">{{props.item.APPROVAL_STATUS}}</p>
                        </td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{ props.item.DECLINE_REASON }}</td>
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
                    :headers="headers2"
                    :items="Tabledata2"
                    :search="searchText"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1">

                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.POLICY_NO}}</td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">{{props.item.STATUS}}</td>
                        <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.PRODUCER_CD_OLD}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.PRODUCER_CD_NEW}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.PRODUCER_NAME_OLD}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.PRODUCER_NAME_NEW }}</td> -->
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">
                            <v-btn @click="viewDetails(props.item)" style="color:black;background-color:#FFFFFF" class="ma-2" color="#23B1A9" dark small>
                                <v-icon small dark left class="mr-2">visibility</v-icon>
                                <v-divider vertical class="mr-2"></v-divider>
                                View Data
                            </v-btn>
                        </td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">
                            <!-- <template v-slot:props.item="{ props }"> -->
                              <v-select
                                label="Enter..."
                                v-model="props.item.APPROVAL_STATUS"
                                @change="changeDecision(props.item.APPROVAL_STATUS,props.item,props.item.DECLINE_REASON)"
                                solo
                                :disabled="props.item.VTEXT"
                                style="width:150px;position:relative;top:12px"
                                :items="decisionItems"
                                class="rounded-0"
                              ></v-select>
                            <!-- </template> -->
                        </td>
                        <td class="text-xs-left" style="background-color:#EFF3F4;border-right: 1px solid #C1C8CC">
                            <!-- <template v-slot:props.item="{ props }"> -->
                              <v-text-field
                                label="Enter..."
                                v-model="props.item.DECLINE_REASON"
                                solo
                                :disabled="props.item.VTEXT"
                                style="width:150px;position:relative;top:12px"
                                class="rounded-0"
                              ></v-text-field>
                            <!-- </template> -->
                        </td>
                        <v-btn :dark="!props.item.VTEXT" :disabled="props.item.VTEXT" style="position:relative;top:15px" @click="submitdecision(props.item.APPROVAL_STATUS,props.item,props.item.DECLINE_REASON)" class="ma-2" color="#23B1A9" small>
                            <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon>
                            <v-divider vertical class="mr-2"></v-divider>
                            Submit
                        </v-btn>
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

        <!--------Pop up------>
        <v-dialog
            v-model="DetailsPop"
            persistent
            max-width="1120px"
            max-height="400px"
            class="">
                <v-card color="#F7F7F7" class="pb-2" tile>
                    <v-card>
                    <v-layout
                        justify-space-between
                        class=""
                        style="flex:1;background-ox-shadow: 0px 3px 5px #00000029;"
                    >
                        <v-card-title
                        class="pa-0 pl-3 text-capitalize"
                        style="color:#10242B;font-size:23px"
                        >Single Policy Details</v-card-title
                        >

                        <div
                        style="border-left:1px solid #C1C8CC;"
                        @click="() => {DetailsPop = false}"
                        >
                        <v-icon style="cursor: pointer;" class="pa-2">close</v-icon>
                        </div>
                    </v-layout>
                    </v-card>
                    <v-card class="ma-3">
                        <div>
                            <v-data-table
                                :headers="headers3"
                                :items="Tabledata3"
                                :search="search"
                                v-bind:pagination.sync="pagination"
                                hide-actions
                                class="elevation-1">

                                <template slot="items" slot-scope="props">
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.POLICY_NO}}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.LOB}}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.PRODUCER_CODE_OLD}}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.PRODUCER_CODE_NEW}}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.PRODUCER_NAME_OLD }}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.PRODUCER_NAME_NEW}}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.DEALER_CODE_OLD }}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.DEALER_CODE_NEW }}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.SUB_PRODUCER_CD_OLD }}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.SUB_PRODUCER_CD_NEW }}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.OFFICE_LOCATION_CODE_OLD }}</td>
                                    <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.OFFICE_LOCATION_CODE_NEW }}</td>
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
                </v-card>
        </v-dialog>
        
    </v-app>
</template>
<script>

import axios from 'axios'
import moment from 'moment';
import { BaseURl, oAuthURl, tokenCred } from '../../common/API_Config';
import {userPermissionValidator} from "../RenewalNotice/validator/permissionValidator"

let tokenDataObj = null
let lastjobid = ''

export default {
    
    data(){
        return{
            accessPermission:{},
            disableReopenBtn: false,
            isDisable: false,
            producerCode: '',
            rejectReason: '',
            uploadBatchID: '',
            DetailsPop: false,
            decisionItems: ['Approve','Reject'],
            decision: '',
            textRule: [v => !!v || 'This Field is required'],
            producerSubCode: '',
            producerName: '',
            triggerLOB:'',
            triggerProdCode:'',
            dealerCode: '',
            locCode: '',
            policyNo: '',
            triggerBatchID:'',
            triggerBatchStartDate:'',
            triggerBatchStartDateMenu:'',
            lobDataArray:[],
            prodCodeArray:[],
            searchText:'',

            headers: [
                { text: 'LOB', value: 'LOB' },
                { text: 'Producer Code', value: 'PRODUCER_CODE' },
                { text: 'Policy Number', value: 'POLICY_NO' },
                { text: 'Producer Name', value: 'PRODUCER_NAME' },
                { text: 'Sub Producer Code', value: 'SUB_PRODUCER_CD' },
                { text: 'Dealer Code', value: 'DEALER_CODE' },
                { text: 'Office location code', value: 'OFFICE_LOCATION_CODE' },
                { text: 'Approval Status', value: 'APPROVAL_STATUS' },
                { text: 'Decline Reason', value: 'DECLINE_REASON' },
                // { text: 'Error Count', value: 'Error Count' },
                // { text: 'Actions', value: 'Actions' },
            ],

            headers2: [
                { text: 'Policy Number', value: 'POLICY_NO' },
                { text: 'Approval Status', value: 'APPROVAL_STATUS' },
                // { text: 'Producer Code(New)', value: 'Policy Number(New)' },
                // { text: 'Producer Name(old)', value: 'Producer Name(old)' },
                // { text: 'Producer Name(New)', value: 'Producer Name(New)' },
                { text: 'View Data', value: 'View Data' },
                { text: 'Decision', value: 'Decision' },
                { text: 'Decline Reason', value: 'DECLINE_REASON' },
                { text: 'Actions', value: 'Actions' },
            ],

            headers3: [
                { text: 'Policy Number', value: 'Policy Number' },
                { text: 'LOB', value: 'LOB' },
                // { text: 'Product Code', value: 'Product Code' },
                { text: 'Producer Code(old)', value: 'Producer Code(old)' },
                { text: 'Producer Code(New)', value: 'Policy Number(New)' },
                { text: 'Producer Name(old)', value: 'Producer Name(old)' },
                { text: 'Producer Name(New)', value: 'Producer Name(New)' },
                { text: 'Dealer Code(Old)', value: 'Dealer Code(Old)' },
                { text: 'Dealer Code(New)', value: 'Dealer Code(New)' },
                { text: 'Sub Producer Code(Old)', value: 'Sub Producer Code(Old)' },
                { text: 'Sub Producer Code(New)', value: 'Sub Producer Code(New)' },
                { text: 'Office location code(Old)', value: 'Office location code(Old)' },
                { text: 'Office location code(New)', value: 'Office location code(New)' },
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
            Tabledata2:[],
            Tabledata3:[],
            skipdiffrence:this.paginationdiff(),
            skip:0,
            pageNumber: 1,
            pagelength:1,
            hideFields: false
        }
    },

    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Single Policy Modification');
        console.log(this.$store.getters.getAgentDetails.designation);
        this.accessPermission=userPermissionValidator('FR8')
        if(this.$store.getters.getAgentDetails.designation == 'maker'){
            this.hideFields = true;
            this.getToken()
            this.getTableData('15',0);
        }else{
            this.hideFields = false;
            this.getToken();
            this.tableDataBind('15',0);
        }
    },

    methods: {
        viewDetails(data){
            console.log("Row data =>",data);
            this.DetailsPop = true;
            
            let self = this
            axios({
                method: "get",
                url:BaseURl + `/get-modified-policy/"+data.TXT_STAGE+"/"+data.POLICY_NO`,
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
            }).then(function (response) {
                console.log('DATA RESPONSE:::',response.data) 
                self.Tabledata3 = []
                let _respData = response.data;
                self.Tabledata3.push({
                        LOB: _respData.modifiedPolicy[0].LOB,
                        PRODUCER_CODE_NEW: _respData.modifiedPolicy[0]['PRODUCER CODE'],
                        PRODUCER_CODE_OLD: _respData.oldPolicy[0]['PRODUCER CODE'],
                        POLICY_NO: data.POLICY_NO,
                        PRODUCER_NAME_OLD: _respData.oldPolicy[0]['PRODUCER NAME'],
                        PRODUCER_NAME_NEW: _respData.modifiedPolicy[0]['PRODUCER NAME'] == '' ? '-':_respData.modifiedPolicy[0]['PRODUCER NAME'],
                        SUB_PRODUCER_CD_NEW: _respData.modifiedPolicy[0]['SUB PRODUCER CODE'] == '' ? '-': _respData.modifiedPolicy[0]['SUB PRODUCER CODE'],
                        SUB_PRODUCER_CD_OLD: _respData.oldPolicy[0]['SUB PRODUCER CODE'] == '' || _respData.oldPolicy[0]['SUB PRODUCER CODE'] == null ? '-': _respData.oldPolicy[0]['SUB PRODUCER CODE'],
                        DEALER_CODE_NEW: _respData.modifiedPolicy[0]['DEALER CODE'] == '' ? '-':_respData.modifiedPolicy[0]['DEALER CODE'],
                        DEALER_CODE_OLD: _respData.oldPolicy[0]['DEALER CODE'] == '' || _respData.oldPolicy[0]['DEALER CODE'] == null ? '-':_respData.oldPolicy[0]['DEALER CODE'],
                        OFFICE_LOCATION_CODE_NEW: _respData.modifiedPolicy[0]['OFFICE LOCATION CODE'] == '' ? '-':_respData.modifiedPolicy[0]['OFFICE LOCATION CODE'],
                        OFFICE_LOCATION_CODE_OLD: _respData.oldPolicy[0]['OFFICE LOCATION CODE'] == '' ? '-':_respData.oldPolicy[0]['OFFICE LOCATION CODE'],
                        APPROVAL_STATUS: _respData['APPROVAL STATUS'],
                        DECLINE_REASON: _respData['DECLINE REASON'],
                })
                
                
                
            }).catch(function (error) {});
            // self.policyNo = data.POLICY_NO;
            // self.lobDataArray.push(data.TXT_STAGE);
            // self.triggerLOB = data.TXT_STAGE;
            // self.prodCodeArray.push(data.PRODUCER_CD_OLD);
            // self.triggerProdCode = data.PRODUCER_CD_OLD;
            // self.producerName = data.PRODUCER_NAME_OLD;
            // self.producerSubCode = data.SUB_PRODUCER_CD;
            // self.dealerCode = data.DEALER_CODE;
            // self.locCode = data.OFFICE_LOCATION_CODE;
             
        },

        changeDecision(val,data,reason){
            console.log("Dropdown val =>",val,data);
        },

        submitdecision(val,data,reason){
            console.log("Dropdown val =>",val,data,reason);
            let self = this;
            if(val == 'Reject' && reason == undefined){
                self.showToast( "Please Enter Decline reason" , self.TOST().WARNING); 
            }else{
            self.showLoader('Loading',true);
            axios({
                method: "post",
                url:BaseURl + `/update/modification-status/single`,
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    approvedBy: this.$store.getters.getAgentDetails.designation,
                    batchId: data.BATCH_ID,
                    policyNo: data.POLICY_NO,
                    status: data.APPROVAL_STATUS == 'Reject' ? 'Decline': 'Approve',
                    declineReason: data.DECLINE_REASON,
                    // DEALER_CODE: self.dealerCode,
                    // OFFICE_LOCATION_CODE: self.locCode,

                },
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
                    self.showToast( response.data.message, self.TOST().ERROR);
                    
                }
            });
            }
        },

        clearTriggerData(){
            this.$refs.formData.reset();
            // let self = this
            // self.triggerLOB = ''
            // self.triggerProdCode = ''
            // self.triggerBatchID = ''
            // self.getTableData('15',0)
        },

        nextPage(e) {
            // console.log('e',e, this.skipdiffrence)
            // // let skipdata = e. - 1
            // // skipdata === 0 ? this.skip = 0 : this.skip = this.skipdiffrence*skipdata
            // if(this.IsFilter==false){
            //     console.log(this.page)
            //     // this.goToNextPage(this.page)
            //     this.getTableData('15',this.skip)
            // }
            // this.pageStartIndex =   e == 1 ? 1 : ((e - 1) * this.pageRowCount) + 1;
            console.log('e',e)
            let skipdata = e - 1
            console.log('Page Number',skipdata)
            if(skipdata === 0 ){
                this.skip = 0
                this.pageStartIndex = 1
            }else{
                this.skip = this.pageRowCount*skipdata
                this.pageStartIndex = this.pageRowCount+1
            }
            this.getTableData('15',this.skip)            
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
                    this.tableDataBind('15',0);
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
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            var CSV = '';
            if (ShowLabel) {
                var row = "";
                for (var index in arrData[0]) {
                    row += index + ',';
                }
                row = row.slice(0, -1);
                CSV += row + '\r\n';
            }
            for (var i = 0; i < arrData.length; i++) {
                var row = "";
                for (var index in arrData[i]) {
                    var arrValue = arrData[i][index] == null ? "" : arrData[i][index];
                    row += arrValue + ',';
                }
                row.slice(0, row.length - 1);
                CSV += row + '\r\n';
            }
            if (CSV == '') {
                growl.error("Invalid data");
                return;
            }
            // console.log('CSV___________' , CSV)
            var fileName = fileName;
            
            var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
            var link = document.createElement("a");
            link.href = uri;
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        submitStatusData(){
            let self = this
            if(!this.$refs.formData.validate()){
                this.$refs.formData.validate();
                this.showToast("Please Enter Valid Data", this.TOST().WARNING);
            }else {
            self.showLoader('Loading',true);
            axios({
                method: "post",
                url:BaseURl + `/policy-modification/single`,
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    // batchId: self.uploadBatchID,
                    stage: self.triggerProdCode.value,
                    policyNo: self.policyNo,
                    PRODUCER_CODE: self.producerCode,
                    PRODUCER_NAME: self.producerName,
                    SUB_PRODUCER_CODE: self.producerSubCode,
                    DEALER_CODE: self.dealerCode,
                    OFFICE_LOCATION_CODE: self.locCode,

                },
            }).then(function (response) {
                console.log('POST RESPONSE:::',response)
                if(response.data.msg === 'Success'){
                    self.showLoader('Loading',false);
                    self.showToast( "Submitted successfully" , self.TOST().SUCCESS);
                    self.tableDataBind('10',0);
                    // self.tableDataBind('15',0,self.triggerProdCode.value,self.policyNo);
                    self.$refs.formData.reset();
                    
                    
                    // self.Tabledata = []
                    // self.Tabledata.push(response.data.data)
                    // console.log('((((((((((((Tabledata)))))))))))) RESPONSE:::',self.Tabledata)
                    // self.triggerLOB = ''
                    // self.triggerProdCode = ''
                    // self.triggerBatchID = ''
                }
            }).catch(function (error) {
                if(error){
                    self.showLoader('Loading',false);
                    self.showToast( error.response.data.message, self.TOST().ERROR);
                    self.$refs.formData.reset();
                }
            });
            }
        },

        // tableDataBind(limitvalue,skip){
        //     let self = this
        //     axios({
        //         method: "get",
        //         url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/get-modified-policy/"+stage+"/"+polNum,
        //         headers: {
        //             "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
        //             "Content-Type": "application/json",
        //         },
        //     }).then(function (response) {
        //         console.log('DATA RESPONSE:::',response) 
        //         self.Tabledata = []
        //         let _respData = response.data.modifiedPolicy;
        //         self.Tabledata = _respData.map((item) => {
        //             return{
        //                 LOB: item.LOB,
        //                 PRODUCER_CODE: item['PRODUCER CODE'],
        //                 POLICY_NO: item['MASTER POLICY'],
        //                 PRODUCER_NAME: item['PRODUCER NAME'],
        //                 SUB_PRODUCER_CD: item['SUB PRODUCER CODE'],
        //                 DEALER_CODE: item['DEALER CODE'],
        //                 OFFICE_LOCATION_CODE: item['OFFICE LOCATION CODE'],
        //                 APPROVAL_STATUS: item['APPROVAL STATUS'],
        //                 DECLINE_REASON: item['DECLINE REASON'],
        //             }
        //         })
        //         // for(let i = 0 ; i < _respData.length ; i++){
        //         //     let _finalData = {
                        
        //         //     }
        //         // }
                

        //         // console.log('DATA Tabledata_______:::',self.Tabledata)
                
        //     }).catch(function (error) {});
        // },

        tableDataBind(limitvalue,skip){
             let self = this
            axios({
                method: "post",
                url:BaseURl + `/policy-modification-paginator`,
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
                console.log('DATA RESPONSE:::',response.data.data)
                self.Tabledata = []
                let _respData = response.data.data;
                self.Tabledata = _respData.map((item) => {
                    return{
                        LOB: item.TXT_STAGE,
                        PRODUCER_CODE: item.TXT_PRODUCER_CD,
                        POLICY_NO: item.TXT_POLICY_NO,
                        PRODUCER_NAME: item.TXT_PRODUCER_NAME == '' ? '-': item.TXT_PRODUCER_NAME,
                        SUB_PRODUCER_CD: item.TXT_SUB_PRODUCER_CD == '' ? '-': item.TXT_SUB_PRODUCER_CD,
                        DEALER_CODE: item.TXT_DEALER_CODE == '' ? '-': item.TXT_DEALER_CODE,
                        OFFICE_LOCATION_CODE: item.TXT_OFFICE_LOCATION_CODE == '' ? '-': item.TXT_OFFICE_LOCATION_CODE,
                        APPROVAL_STATUS: item.APPROVAL_STATUS == 'Approve' ? 'Approved': item.APPROVAL_STATUS == 'Decline'? 'Rejected': item.APPROVAL_STATUS,
                        DECLINE_REASON: item.DECLINE_REASON == '' || item.DECLINE_REASON == null ? '-': item.DECLINE_REASON,
                    }
                })
                   
                console.log('DATA Tabledata_______:::',self.Tabledata)
                
                lastjobid = response.data.data.hasOwnProperty('LastEvaluatedKey') ? response.data.data.LastEvaluatedKey.JOB_ID : ''
                let totalCount =  response.data.data.length
                self.totalListCount = response.data.data.length
                // self.pagelength = Math.ceil(totalCount/self.skipdiffrence)
            }).catch(function (error) {});

        },

        getTableData(limitvalue,skip){
            let self = this
            axios({
                method: "post",
                url:BaseURl +`/policy-modification-paginator`,
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
                console.log('DATA RESPONSE:::',response.data.data)
                self.Tabledata2 = []
                let _respData = response.data.data
                for(let i = 0 ; i < _respData.length ; i++){
                    // if(_respData[i].APPROVAL_STATUS == 'Approve' || _respData[i].APPROVAL_STATUS == 'Decline'){
                    //     _respData[i].VTEXT = true;
                    // }
                    let _finalData = {
                        VTEXT: _respData[i].APPROVAL_STATUS == 'Approve' || _respData[i].APPROVAL_STATUS == 'Decline' ? true: false,
                        STATUS: _respData[i].APPROVAL_STATUS,
                        BATCH_ID: _respData[i].BATCH_ID,
                        POLICY_NO: _respData[i].TXT_POLICY_NO,
                        PRODUCER_CD_OLD: _respData[i].TXT_PRODUCER_CD,
                        PRODUCER_CD_NEW: _respData[i].TXT_PRODUCER_CD,
                        PRODUCER_NAME_OLD: _respData[i].TXT_PRODUCER_NAME,
                        PRODUCER_NAME_NEW: _respData[i].TXT_PRODUCER_NAME,
                        TXT_STAGE: _respData[i].TXT_STAGE,
                        SUB_PRODUCER_CD: _respData[i].TXT_SUB_PRODUCER_CD,
                        DEALER_CODE: _respData[i].TXT_DEALER_CODE,
                        OFFICE_LOCATION_CODE: _respData[i].OFFICE_LOCATION_CODE,
                        VIEW_DTA: '',
                        ACTION: ''
                    }
                    self.Tabledata2.push(_finalData)

                    // console.log('DATA _respData __STATUSSS_____:::',self.Tabledata)
                }
                // for(let i = 0 ; i < self.Tabledata2.length ; i++){
                //     if(self.Tabledata2[i].APPROVAL_STATUS == 'Approve' || self.Tabledata2[i].APPROVAL_STATUS == 'Decline'){
                //         self.Tabledata2[i].VTEXT = true;
                //     }
                      
                // }

                console.log('DATA Tabledata_______:::',self.Tabledata2)
                
                lastjobid = response.data.data.hasOwnProperty('LastEvaluatedKey') ? response.data.data.LastEvaluatedKey.JOB_ID : ''
                let totalCount =  response.data.data.Count
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
            return this.triggerBatchStartDate ? moment(this.triggerBatchStartDate).format("DD-MM-YYYY"): ''
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

        computedTable(){
            return (this.Tabledata && this.Tabledata.length) ?  this.Tabledata.slice(this.pageStartIndex - 1, this.pageStartIndex + 9) : [];
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