<template>
    <v-app style="background-color:#E8EEEF">
        <div style="margin-left:35px" class="mt-4">
                    <p class="body-2 font-weight-bold mb-0" style="color:#1E83C2">Policy Modifications Audit Trail</p>
                </div>
        <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
            <!-- <v-layout class="cardwhitebackclr pa-3" align-center>
                <div class="mr-3">
                    <p class="body-2 font-weight-bold mb-0" style="color:#1E83C2">Policy Modifications Audit Trail</p>
                </div>
            </v-layout> -->

            <v-divider class=""></v-divider>

            <v-layout class="pl-3 pt-4" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Line of Business *</p>
                            <v-select 
                                solo 
                                label="Select"
                                v-model="lineOfBusiness"
                                :items="lobDataArray"  
                                item-text="NUM_IL_PRODUCT_NAME"
                                item-value="NUM_IL_PRODUCT_CODE"
                                return-object
                                :rules="textRule"
                                @change="changeLobData(lineOfBusiness)"
                            ></v-select >
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Product Code ( 0 for all product) *</p>
                            <v-select 
                                :items="prodCodeArray"  
                                solo 
                                class="font-weight-bold textbold"
                                disabled
                                label="Select"
                                item-text="text"
                                item-value="value"
                                return-object
                                v-model="productCode"
                            ></v-select >
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <v-layout column class="cust-rmvpd-pr">
                                <p class="font-weight-bold mb-1 caption" style="color:#646666">Expiry Period From </p>
                                <v-menu
                                    ref="calender"
                                    :close-on-content-click="false"
                                    v-model="expiryPeriodFromMenu"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    max-width="290px"
                                    min-width="290px" 
                                    class="rounded-0">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            slot="activator"
                                            label="Select.."
                                            v-model="computedExpiryPeriodFrom"
                                            solo
                                            class="rounded-0"
                                            readonly 
                                            maxlength="10"
                                            v-bind="attrs"
                                            v-on="on">
                                            <!-- <div  slot="prepend-inner" style="background-color:#F7F7F7;padding:6px;"><span class="material-icons">date_range</span></div> -->
                                            <div slot="prepend-inner" style="background-color:#F7F7F7"><img class="pa-1" style="height:35px" src="../../assets/date_24X24.png"/></div>
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="expiryPeriodFromMenu = false" v-model="expiryPeriodFrom" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <v-layout column class="cust-rmvpd-pr">
                                <p class="font-weight-bold mb-1 caption" style="color:#646666">Expiry Period To</p>
                                <v-menu
                                    ref="calender"
                                    :close-on-content-click="false"
                                    v-model="expiryPeriodToMenu"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    max-width="290px"
                                    min-width="290px" 
                                    class="rounded-0">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            slot="activator"
                                            label="Select.."
                                            v-model="computedExpiryPeriodTo"
                                            solo
                                            class="rounded-0"
                                            readonly 
                                            maxlength="10"
                                            v-bind="attrs"
                                            v-on="on">
                                            <!-- <div  slot="prepend-inner" style="background-color:#F7F7F7;padding:6px;"><span class="material-icons">date_range</span></div> -->
                                            <div slot="prepend-inner" style="background-color:#F7F7F7"><img class="pa-1" style="height:35px" src="../../assets/date_24X24.png"/></div>
                                        </v-text-field>
                                    </template>
                                    <v-date-picker @input="expiryPeriodToMenu = false" v-model="expiryPeriodTo" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Batch ID</p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                v-model="batchID" 
                                label="Enter...">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout class="pl-3 pt-2" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Policy Number</p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                v-model="policyNo" 
                                label="Enter...">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <!-- <v-divider class=""></v-divider> -->
            <v-layout class="pa-2" style="position:relative;bottom:15px;float:right">
                
                <!-- <v-btn  class="ma-2" color="#152F38" dark small>
                    <v-icon small dark left class="mr-2">cancel</v-icon>
                    <v-divider vertical class="mr-2"></v-divider>
                    Close
                </v-btn> -->
                <v-btn flat style="width:100px;height:35px;background-color:#FFFFFF;color:#646666;border:1.5px solid #ccc;border-radius:3px" @click="clearTriggerData()" class="ma-2 pa-3"  dark small>
                    <!-- <v-icon small dark left class="mr-2">delete</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Clear
                </v-btn>
                <v-btn flat style="width:100px;height:35px;background-color:#0073BB;color:#FFFFFF;border:1.5px solid #ccc;border-radius:4px" @click="submitPAData()" class="ma-2 pa-3"  dark small>
                    <!-- <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Submit
                </v-btn>
            </v-layout>
        </v-card>

        <v-card class="ma-3 pa-4" style="width:55%" v-if="accessPermission.edit === true ? true : false || accessPermission.view === true ? true : false">
            <template>
                <v-data-table
                    :headers="headers"
                    :items="Tabledata"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1">

                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ getstage(props.item)}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.TXT_POLICY_NO}}</td>    
                        <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.AUDIT_ID}}</td> -->

                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC;display:flex;align-items:center">Download
                            <div class="ml-3" style="display:flex;cursor:pointer" @click="JSONToCSVConvertor(props.item, props.item.TXT_POLICY_NO)">
                                <img class="export-icon" src="web/assets/Path93052x.png">
                            </div>
                        </td>
                    </template>
                </v-data-table>

                <!-- <div class="text-xs-center pt-2">
                    <v-pagination v-model="pageNumber" color="#152F38" flat :length="pagelength" @input="nextPage($event)"></v-pagination>
                </div> -->

                <v-container fluid class="my-3 paginationStyle" v-if="Tabledata.length !== 0">
                    <v-layout justify-end>
                        <div class="margincls">
                            <span> Showing {{ pageStartIndex }} - {{ pageEndIndex }}</span>
                            <span> out of {{ totalListCount }} records </span>
                        </div>
                        <v-pagination 
                            class="mr-4 mt-1 navpagenumber"
                             v-model="pageNumber" 
                            color="#152F38" :length="getNoOfPages" 
                            :total-visible="5" @input="nextPage($event)">
                        </v-pagination>
                    </v-layout>
                </v-container>
            </template>
            
        </v-card>
    </v-app>
</template>

<script>

import axios from 'axios'
import moment from 'moment';
import { oAuthURl, tokenCred } from '../../common/API_Config';
import {userPermissionValidator} from "./validator/permissionValidator"

let tokenDataObj = null
let lastjobid = ''

export default {
    data(){
       return{
           accessPermission:{},
           textRule: [v => !!v || 'This Field is required'],
           policyNo:"",
           batchID:"",
           productCode:"",
           lineOfBusiness:"",
           prodCodeArray:[],
           expiryPeriodFrom:'',
           expiryPeriodTo:'',
           expiryPeriodToMenu:false,
           expiryPeriodFromMenu:false,
           lobDataArray:[],
            headers: [
                { text: 'LOB', value: 'STAGE', sortable: false},
               
                { text: 'Policy Number', value: 'TXT_POLICY_NOs', sortable: false },
               
                { text: 'Actions', value: 'Actions', sortable: false},
            ],

            search: '',
            pagination: {
                rowsPerPage: 15
            },
            skipdiffrence:this.paginationdiff(),
            skip:0,
            pageNumber: 1,
            pagelength:1,
            selected: [],
            Tabledata:[],

              page            :   1,
            pageStartIndex  :   1,
            pageRowCount  :   10,
            totalListCount  :   0,
            IsFilter: false,
       }
    },

    computed: {
        computedExpiryPeriodTo(){
            return this.expiryPeriodTo ? moment(this.expiryPeriodTo).format("DD-MM-YYYY"): ''
        },

        computedExpiryPeriodFrom(){
            return this.expiryPeriodFrom ? moment(this.expiryPeriodFrom).format("DD-MM-YYYY"): ''
        },

        ageEndIndex(){
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
    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Policy Modifications Audit Trail');
        this.getToken()
        this.accessPermission=userPermissionValidator('FR13')
        
    },

    methods:{
        getstage(item){
            console.log("item",item);
            return item.STAGE ? "MotorCommerial"+item.STAGE : "------------"
        },

        getToken(){
            let self = this
            axios.post(oAuthURl,
                `grant_type=${tokenCred.grantType}&client_id=${tokenCred.clientId}&client_secret=${tokenCred.clientSecret}`
            ).then( res => {
                
                if(res.status == 200){
                    tokenDataObj = res.data
                    this.getLOBData()
                    // this.getTableData('15',0)
                    // console.log('POST__TOKEEENNN__RSPPPPPPP' , tokenDataObj)
                }
            })
            .catch(error => {})
        },

        changeLobData(lob){
            this.prodCodeArray = []
            // this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:lob.NUM_IL_PRODUCT_NAME})
            // this.productCode = this.prodCodeArray[0]
            // console.log('LOBBB @CHANGE ____________________',lob)
            if(lob.NUM_IL_PRODUCT_CODE == 3188){
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'pcv'})
                this.productCode = this.prodCodeArray[0]

            }else if(lob.NUM_IL_PRODUCT_CODE == 3189){
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'gcv'})
                this.productCode = this.prodCodeArray[0]

            }else if(lob.NUM_IL_PRODUCT_CODE == 3191){
                
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'mcv'})
                this.productCode = this.prodCodeArray[0]
            }else{
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:lob.NUM_IL_PRODUCT_NAME})
                this.productCode = this.prodCodeArray[0]
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

        clearTriggerData(){
            let self = this
            self.policyNo = ''
            self.productCode = ''
            self.lineOfBusiness = '',
            self.batchID = '',
            self.expiryPeriodFrom = '',
            self.expiryPeriodTo = ''
        },

        submitPAData(){
            let self = this;
            if(!this.lineOfBusiness && !this.batchID && !this.policyNo && !(this.expiryPeriodFrom && this.expiryPeriodTo)){
                self.showToast( "Please Enter Required fields" , self.TOST().WARNING);
            }else if(!this.batchID && !this.policyNo && !(this.expiryPeriodFrom && this.expiryPeriodTo)){
                self.showToast( "Enter the Policy Number or batchID or Date" , self.TOST().WARNING);
            }
            // else if(this.policyNo && (this.expiryPeriodFrom && this.expiryPeriodTo)){
            //     // tocheck the policy no is between given dates
                
            // }
            else{
                // to submit
                self.showLoader('Loading',true);
                    axios({
                        method: "post",
                        url:
                            "https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/renewal-vault/audit-trail",
                        headers: {
                            "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                            "Content-Type": "application/json",
                        },
                        data: {
                            stage: this.productCode.value,
                            policyNo: this.policyNo,
                            batchId: this.batchID,
                            fromDate: this.expiryPeriodFrom,
                            toDate: this.expiryPeriodTo                                                                                          
                        },
                    }).then(function (response) {
                        if(response.status == 200 && response.data.data.length !== 0){
                            self.showLoader('Loading',false);
                            self.showToast( "Data Inserted Successfully" , self.TOST().SUCCESS);
                            // self.getdata('15',0)
                            console.log('POST RESPONSE:::response.data.data',response.data.data)
                            let resData = response.data.data
                            // let blob = new Buffer([response.data.data.data], { type: 'application/pdf' })
                            // let link = document.createElement('a')
                            // link.href = fs.writeFileSync('excel.xlsx', resData, 'utf8');
                            // link.download = 'test.pdf'
                            // link.click()
                                        

                            for(var i = 0; i < resData.length; i++){
                                let t_data = []
                                t_data.push(resData[i].data[0])
                                let finalTableData = {
                                    STAGE : resData[i].STAGE,
                                    TXT_POLICY_NO : resData[i].TXT_POLICY_NO,
                                    CSV_DATA : resData[i].data.length == 0 || resData[i].data == '' ? [] : t_data
                                    // .map(function(el){
                                    //     "Collection & processing batch errors"
                                    //     "Modification stage 1 (prior to Renewal Notice Generation)"	
                                    //     "Modification stage 2 (after to Renewal Notice Generation)"	
                                    //     "CAQ Modification"		
                                    //     'EAQ modification'	
                                    //     'Other modifications'		
                                    //     'Modifications during renewal fulfilemnt'		

                                    //     let data = {}
                                    //     return data;
                                    // }),
                                }
                                self.Tabledata.push(finalTableData)
                            }
                            
                            self.Tabledata = response.data.data
                            self.clearTriggerData()
                        }else{
                            self.showLoader('Loading',false);
                            self.showToast( "No Policy Found" , self.TOST().ERROR);
                            // self.clearTriggerData()
                        }
                    }).catch(function (error) {
                        if(error){
                            self.showLoader('Loading',false);
                            self.showToast( "Enter Valid Data" , self.TOST().ERROR);
                            
                        }
                    });

            }
        },

        JSONToCSVConvertor(item, policyno) {
            console.log("-item",item.fileUrl, policyno);

                var link = document.createElement("a");
                    link.href = item.fileUrl;
                    link.style = "visibility:hidden";
                    link.download = policyno + ".csv";
                    // link.setAttribute('download', 'file.csv');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
        },

        nextPage(e) {
        
            let skipdata = e - 1
            console.log('Page Number',skipdata)
            if(skipdata === 0 ){
                this.skip = 0
            }else{
                this.skip = this.skipdiffrence*skipdata
            }
            this.getdata('15',this.skip)
        },
    },
}
</script>

<style>
    .claimlabel {
        color: #646666;
        font-size: 12px;
        font-weight: bold;
    }

    .forminput {
        border-radius: 0;
        font-size: 14px !important;
    }

    .textbold.v-select.v-input--dense .v-select__selection--comma{
        color:black !important;
    }
</style>