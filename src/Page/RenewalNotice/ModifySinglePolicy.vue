<template>
    <v-app style="background-color:#E8EEEF">
        <div style="margin-left:35px" class="mt-4">
                    <p class="body-2 font-weight-bold mb-0" style="color:#1E83C2">Modify Single Policy Type</p>
                </div>
        <v-card class="ma-3" v-if="accessPermission.edit === true ? true : false">
            <!-- <v-layout class="cardwhitebackclr pa-3" align-center>
                <div class="mr-3">
                    <p class="body-2 font-weight-bold mb-0" style="color:#1E83C2">Modify Single Policy Type</p>
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
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Policy Number *</p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                :rules="textRule"
                                v-model="policyNo" 
                                label="Enter...">
                            </v-text-field>
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
                <v-btn flat style="width:100px;height:35px;background-color:#FFFFFF;color:#646666;border:1.5px solid #ccc;border-radius:3px" @click="clearTriggerData()" class="ma-2 pa-3" color="#646666" dark small>
                    <!-- <v-icon small dark left class="mr-2">delete</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Clear
                </v-btn>
                <v-btn flat style="width:100px;height:35px;background-color:#0073BB;color:#FFFFFF;border:1.5px solid #ccc;border-radius:4px" @click="submitMSPData()" class="ma-2 pa-3" color="#0073BB" dark small>
                    <!-- <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Submit
                </v-btn>
            </v-layout>
        </v-card>

        <v-card class="ma-3 pa-4" style="width:90%"  v-if="accessPermission.edit === true ? true : false || accessPermission.view === true ? true : false">
            <template>
                <v-data-table
                    :headers="headers"
                    :items="Tabledata"
                    :search="search"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1">
 
                    <template slot="items" slot-scope="props">
                        
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ getSTAGE(props.item)}}</td>
                        <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC" v-if="props.item.STAGE" >{{"-----------"}}</td> -->
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.TXT_CHANNELTYPE}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.TXT_OFFICEBRANCHLOCATIONCODE}}</td>

                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{props.item.TXT_POLICY_NO}}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ getStatus(props.item)}}</td>
                        <!-- <td class="text-xs-left" style="border-right: 1px solid #C1C8CC" v-if="!props.item.renewalStatus" >{{"-----------"}}</td> -->

                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC;align-items:center">
                            <v-select 
                                solo 
                                dense
                                label="Select"
                                v-model="status"
                                :items="statusArray"  
                                @change="editItem(status, props.item.TXT_POLICY_NO, props.item.STAGE)"  
                                class="mt-2 mb-0"                        
                            ></v-select >
                        </td>         
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC;align-items:center">
                            <v-text-field
                                solo
                                dense
                                label="Enter remarks"
                                v-model="remarks"
                                class="mt-2 mb-0">
                            </v-text-field>
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
import { oAuthURl, tokenCred } from '../../common/API_Config'
// import moment from 'moment';

let tokenDataObj = null
let lastjobid = ''

export default {
    data(){
       return{
           accessPermission:{},
           policyNo:"",
           productCode:"",
           lineOfBusiness:"",
           prodCodeArray:[],
           lobDataArray:[],
           status:'',
           remarks:'',
           statusArray:['Accept','Decline'],
           Tabledata:[
                // {
                //     LOB_NAME: "esfegsekkgedsfsfsdfsd",
                //     PRODUCT_CODE: "dgdgdrhryytrgdrg",
                //     TXT_POLICY_NO: '3412000169',
                //     // JobSchedDateTime: "4/1/2020 6:00:00 PM",
                //     // renewalStatus: "Running",
                //     REMARKS: 'test',
                //     // action: 'Download Report'
                // }
           ],
            
            search:'',
            textRule: [v => !!v || 'This Field is required'],
            headers: [
                
                { text: 'LOB', value: 'LOB_NAME',sortable: false },
                { text: 'Channel', value: 'ProductCode', sortable: false },
                { text: 'Branch Code', value: 'ProductCode', sortable: false },

                { text: 'Policy Number',align: 'start',sortable: false,value: 'policyNo',},
                // { text: 'Job Sched Date/Time', value: 'Job Sched Date/Time' },
                { text: 'Current Status', value: 'renewalstatus',sortable: false },
                { text: 'Status', value: 'Status', sortable: false },
                
                { text: 'Remarks', value: 'Remarks', sortable: false },
                // { text: 'Actions', value: 'Actions' },
            ],

            page            :   1,
            pageStartIndex  :   1,
            pageRowCount  :   10,
            totalListCount  :   0,
            IsFilter: false,

            pagination: {
                rowsPerPage: 15
            },
            skipdiffrence:this.paginationdiff(),
            skip:0,
            pageNumber: 1,
            pagelength:1,
       }
    },

    computed:{
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
    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Modify Single Policy Type');
        this.getToken()
        this.accessPermission=userPermissionValidator('FR15')
    },

    methods:{

        getSTAGE(item){
            // console.log('----item',item);
            return item.STAGE ? "MotorCommerial"+item.STAGE : "------------"
        },

        getStatus(item){
            return item.renewalStatus ? item.renewalStatus : "------------"
        },

        getToken(){
            let self = this
            axios.post(oAuthURl,
                `grant_type=${tokenCred.grantType}&client_id=${tokenCred.clientId}&client_secret=${tokenCred.clientSecret}`).then( res => {
                
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

        nextPage(e) {
            let skipdata = e - 1
            skipdata === 0 ? this.skip = 0 : this.skip = this.skipdiffrence*skipdata
            this.getTableData('15',this.skip)
        },

        clearTriggerData(){
            let self = this
            self.policyNo = ''
            self.productCode = ''
            self.lineOfBusiness = ''
        },

        submitMSPData(){
            // let requestData = {
            //     policyNumber : this.policyNo,
            //     stage: this.productCode.value
            // 3412000169
            // }

            // this.POST_ByURL("modifyPolicy", requestData, (res) => {
            //     console.log('DATA RESPONSE:::',res);
            // }, (error) => {
            //     console.log("----->",error);
            //     this.showToast( "Enter Valid Data" , this.TOST().ERROR);
            //     this.showLoader('Loading',false);
            // });
            let self = this;
            self.showLoader('Loading',true);
            axios({
                method: "post",
                url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/getpolicylatestdata",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    policyNumber : this.policyNo,
                    stage: this.productCode.value
                },
            }).then(function (response) {
                console.log('DATA RESPONSE:::',response);
                self.Tabledata = []
                if(response.status == 200){
                    self.showLoader('Loading',false);
                    if(response.data.TXT_POLICY_NO && response.data.STAGE && response.data.renewalStatus){
                        self.Tabledata.push(response.data)
                        self.totalListCount = response.data.length
                    }else{
                        self.showToast( "No Policy Found" , self.TOST().ERROR);
                    }
                }
            }).catch(function (error) {
                console.log("----->",error);
                self.showToast( "Enter Valid Data" , self.TOST().ERROR);
                self.showLoader('Loading',false);
            });
        },

        editItem(status,policyno,lob){
            let self = this;
            
            if(status){
                // if(status == 'Accept'){

                // }else if(status == 'Decline' && this.remarks !== ''){
                    // 3412000169
                // }
                // if(confirm("Are you sure to Update")){
                    self.showLoader('Loading',true);
                        axios({
                            method: "post",
                            url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/policy-modification/declineoraccept",
                            headers: {
                                "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                                "Content-Type": "application/json",
                            },
                            data: {
                                renewalStatus: status,
                                policyNumber : policyno,
                                stage: lob.toLowerCase(),
                                remarks: self.remarks
                            },
                        }).then(function (response) {
                            console.log('DATA RESPONSE:::',response);
                            // self.Tabledata = []
                            self.showLoader('Loading',false);
                            if(response.data.status == 200){
                                self.showToast( "Updated successfully" , self.TOST().SUCCESS);
                            }
                        }).catch(function (error) {
                            console.log("----->",error);
                            self.showToast( "Enter Valid Data" , self.TOST().ERROR);
                            self.showLoader('Loading',false);
                        });
                //   }else{
                //       self.status = '';
                //   }
            }
            
        }
    }, 
}
</script>

<style>


</style>