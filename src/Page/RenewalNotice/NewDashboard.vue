<template>
   <v-app style="display:flex;overflow:auto">
     <div style="height:250px;background-color:rgb(239,243,244);width:161%">
        <v-flex style="margin-left:35px;margin-top:35px;">
            <v-text style="font-size:35px">Hello John,</v-text>
            <v-text style="font-size:25px">welcome back!</v-text>
        </v-flex>
            <v-text style="font-size:18px;margin-left:35px;">Last logged in:</v-text>

      <v-layout style="display:flex;" xs2>
        <v-row style="margin-top:20px">
         <p class="font-weight-bold" style="font-size:18px;float:left;margin-left:28px;padding:8px">Dashboard of</p>
          <v-select 
          id="mySelect"
            v-model="lineOfBusiness"
            :items="lobDataArray"  
            item-text="NUM_IL_PRODUCT_NAME"
            item-value="NUM_IL_PRODUCT_CODE"
            return-object
            style="width:290px;padding:0px 7px"
            @change="changeLobData(lineOfBusiness), displayDataProductwise(lineOfBusiness.NUM_IL_PRODUCT_NAME),
            displayPolicyCount(lineOfBusiness.NUM_IL_PRODUCT_NAME)">
            </v-select>
        </v-row>
        <!-- <ul style="display:flex;list-style: none;display: flex;
            list-style: none;
            margin-left: 920px;
            margin-top: 47px;
            font-size: 16px;
            font-weight: 11px;
            font-weight: 500;">
            <li style="margin-right: 11px;">Today</li>
            <li style="margin-right: 11px;">Yesterday</li>
            <li style="margin-right: 11px;">This week</li>
            <li style="margin-right: 11px;">Custom</li>

        </ul> -->
      </v-layout>
     </div>

      <template >
        <div style="display:flex;flex-direction:row"     :policyCount="policyWiseResponse"> 
         <div style="display:flex" >  
          <v-card class="ml-5" style="width:320px;height:210px;border-radius:10px;bottom:53px">
            <v-card-text  >
              <div style="font-weight:bold;font-size:60px;margin:25px;">
              {{ policyCount.totalPoliciesCount  }}
            </div>
              <p  style="font-weight:bold;font-size:15px">Total No of Policies to be Renewed</p>
            </v-card-text>   
          </v-card>
         </div>

         <div style="display:flex">
          <v-card class="ml-3" style="width:320px;height:210px;border-radius:10px;bottom:53px;">
            <v-card-text>
              <div style="font-weight:bold;font-size:60px;margin:25px;">{{policyCount.endorsmentCount }} </div>
              <p style="font-weight:bold;font-size:15px">Endorsment Requests Processed</p>
            </v-card-text>   
          </v-card>
         </div>
          
         <div style="display:flex;position:absolute">
          <v-card class="ml-5" style="width:320px;height:210px;border-radius:10px;top:170px">
            <v-card-text>
              <div style="font-weight:bold;font-size:60px;margin:25px;">{{policyCount.successCount}}</div>
              <p style="font-weight:bold;font-size:px"> No of Policies Renewed successfully</p>
            </v-card-text>   
          </v-card>
         </div>

         <div style="display:flex;position:absolute">
          <v-card class="ml-3" style="width:320px;height:210px;border-radius:10px;top:170px;left:370px">
            <v-card-text>
              <div style="font-weight:bold;font-size:60px;margin:25px;">{{ policyCount.rejectedCount}} </div>
              <p style="font-weight:bold;font-size:15px">Renewals Rejected </p>
            </v-card-text>   
           </v-card>
         </div>

         <div style="display:flex;position:absolute;top:197px;left:700px">
            <v-card style="width:500px;height:430px;border-radius:12px;margin-left:20px">
             <v-text style="font-size:20px;font-weight:bold;padding:20px;">TOP 5 COVERS TAKEN</v-text>
             <v-divider></v-divider>
            </v-card>
         </div>
            
            
         <div style="display:flex;position:absolute;top:197px;left:1215px">
            <v-card style="width:500px;height:430px;border-radius:12px;margin-left:20px">
             <v-text style="font-size:20px;font-weight:bold;padding:20px;">COVERAGE WISE REPORT</v-text>
             <v-divider></v-divider>
            </v-card>
         </div>
        </div>
      </template>

      <!-- <template>
          <v-layout>
              <v-card style="width:1000px;height:430px;bottom:473px;margin-left:720px;border-radius:15px">
                  <v-text style="font-size:20px;font-weight:bold;padding:20px;">TOP 5 COVERS TAKEN</v-text>
                  <v-divider></v-divider>
              </v-card>
          </v-layout>
      </template> -->

      <template>
              <v-card class="ml-5" style="width:800px;border-radius:10px;top:190px">
                  <v-text class="font-weight-bold" style="float:left;padding:15px;font-size:18px">COLLECTION AND PROCESSING BATCH STATUS</v-text>
                  <v-text class="font-weight-bold" style="float:right;padding:15px;font-size:15px">EXPORT</v-text>
                 <v-divider class="mt-5"></v-divider>
                 <div>
                <v-data-table
                    :headers="headers"
                    :items="productWiseResponse"
                    :search="searchText"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                    class="elevation-1 pa-3"
                    >
                     <template slot="items" slot-scope="props" >
                        <td class="text-xs-left" style="background-color:#EFF3F4;">{{props.item.JOB_ID}}</td>
                       <td class="text-xs-left" style="background-color:#EFF3F4;padding-left:8px">{{ props.item.JOB_START_DATE}} {{ props.item.JOB_START_TIME}}</td>
                       <td class="text-xs-left" style="background-color:#EFF3F4;padding:6px">
                         <p v-if="props.item.STATUS === 'Success'" class="classSuccess">{{props.item.STATUS}}</p>
                         <p v-if="props.item.STATUS === 'Failed'" class="classFailed">{{props.item.STATUS}}</p>
                         <p v-if="props.item.STATUS === 'In Progress'" class="classProgress">{{props.item.STATUS}}</p>
                         <p v-if="props.item.STATUS === 'Submitted'" class="classSubmitted">{{props.item.STATUS}}</p>
                       </td>
                      <td v-if="props.item.hidePrevIcon == true" @click="actionProcess == true" class="text-xs-left" style="background-color: #eff3f4;display:flex;align-items: center;height:54px">
                            <div v-if="props.item.STATUS == 'Success'">
                                <div v-if="props.item.hidePrevIcon == true" class="ml-3" style="display:flex;cursor:pointer ">
                                <button id="demo" class="export-icon mr-5" @click="addNewIcon(props.item,props.item.COLLECTION_PROCESSING_FILE_URL,props.item.BatchID);actionMethod()" v-if="actionProcess == true">EXPORT
                                </button>
                                <img @click="addNewIcon(props.item,props.item.COLLECTION_PROCESSING_FILE_URL,props.item.BatchID)" class="export-icon" src="../../assets/downloadicon.png"> 
                                </div>
                            </div>

                            <div v-else style="display: flex">_
                            <v-tooltip left class="ml-2" >
                                <v-icon slot="activator" small>info</v-icon
                                ><span>Only Success cases can be downloaded!</span>
                            </v-tooltip>
                            </div>
                        </td> 
                         <td class="text-xs-left" style="background-color:#EFF3F4;display:flex;align-items:center" v-if="props.item.showDownloadIcon == true">DOWNLOAD    
                            <div v-if="props.item.showDownloadIcon == true" class="ml-3" style="color:black;display:flex;cursor:pointer">
                                <img @click="downloadData(props.item.JOB_ID,props.item.LOB_NAME,props.item.COLLECTION_PROCESSING_FILE_URL)" class="export-icon-down" src="../../assets/downloadicon.png" style="height:16px">
                                <!-- <img  @click="JSONToCSVConvertor(props.item.CSV_DATA,props.item.JOB_ID+'_'+props.item.LOB_NAME,true,props.item.JOB_ID)" class="export-icon ml-2" src="web/assets/Path93052x.png"> -->
                            </div>
                            <!-- {{item.Actions}} -->
                         </td>
                     </template>    
                    
                </v-data-table>
                 </div>
              </v-card>
      </template>
      <!-- <template>
              <v-card class="ml-5" style="width:874px;border-radius:10px;top:31px left: 831px;">
                  <v-text class="font-weight-bold" style="float:left;padding:15px;font-size:18px">LOBWISE RENEWAL ACTIVITY</v-text>
                  <v-text class="font-weight-bold" style="float:right;padding:15px;font-size:15px">EXPORT</v-text>
                 <v-divider class="mt-5"></v-divider>
              </v-card>
      </template>          -->

   </v-app>
</template>

<script>

import axios from 'axios'
import xlsx from 'json-as-xlsx'
import moment from 'moment';
import {BaseURl, oAuthURl, tokenCred} from "../../common/API_Config"
let tokenDataObj = null;
let lastjobid = '';
let _respData;
let policyCount;
let productWiseResponse=[];
let policyWiseResponse=[];

export default {
    data(){
        return{
            actionProcess: true,
            medicare: false,
            searchText: '',
            RangeArray:[{'name':'Date Range','value':'dateRange'},{'name':'Policy No','value':'policyNo'}],
            filterType:'',
            policyNo:null,
            disableFilter:false,
            formnew: false,
            textRule: [v => !!v || 'This Field is required'],
            jobSchedArray:[
                {text:'Now',value:true},
                {text:'Later',value:false}
            ],
            jobScheduler:'',
            showShedulerDateTime:false,
            jobStartTimeNowMenu:false,
            skipdiffrence:this.paginationdiff(),
            skip:0,
            pageNumber: 1,
            pagelength:1,
            tokenData:{},
            lobDataArray:[],

            page: 1,
            pageStartIndex: 1,
            pageRowCount: 15,
            totalListCount: 0,
            IsFilter: false,

            prodCodeArray:[],
            endorsmentCount:'',
            rejectedCount:'',
            successCount:'',
            totalPoliciesCount:'',
            policyCount:'',
            expiryPeriodFrom:'',
            expiryPeriodTo:'',
            remarkData:'',
            parentProductName:'',
            jobStartDate:'',
            jobStartTime:'',
            productCode:'',
            lineOfBusiness:'',
            expiryPeriodToMenu:false,
            expiryPeriodFromMenu:false,
            jobStartDateMenu:false,
            headers: [
                {text: 'Batch ID', sortable: false,value: 'JOB_ID'},
                { text: 'Job Sched Date/Time', value: 'JOB_START_DATE' },
                { text: 'Status', value: 'STATUS' },
                { text: 'Actions', value: 'Actions' },
            ],

            search: '',
            pagination: {
                rowsPerPage: 7
            },
            selected: [],
            Tabledata:[],
            productWiseResponse:[],
            policyWiseResponse:[],
            jobStartDateNow:'',
            jobStartTimeNow:'',
            todaydatevalue :'',
            notificationData: [],
            coverage:{
                "Personal Accident":"73.1K",
                "Third Party":"73.1K",
                "Accidental Coverage":"73.1K",
                "Theft":"73.1K",
                "Fire":"73.1K",
                "Natural Disaster":"73.1K"
            }
        }
    },

    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Collection and Processing');
        // this.User_id = this.$store.state.agentDetails.userId;
        this.getToken()
        // this.JSONToCSVConvertor(this.csvData,'sampleCSV',true,'MCV')
         this.todaydatevalue = moment().format("YYYY-MM-DD");
         
    },

    methods: {
        dateRule(v){
            if(this.range && this.range == 'dateRange'){
                if(!!v){
                    return 'This field is required'
                }else{
                    return true
                }
            }else{
                return true
            }
        },
   
        

        changeLobData(lob){
            this.prodCodeArray = []
            // console.log('LOBBB @CHANGE ____________________',lob)
            if(lob.NUM_IL_PRODUCT_CODE == 3188){
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'pcv'})
                this.productCode = this.prodCodeArray[0]
                this.medicare = false  
            }else if(lob.NUM_IL_PRODUCT_CODE == 3189){
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'gcv'})
                this.productCode = this.prodCodeArray[0]
                this.medicare = false
            }else if(lob.NUM_IL_PRODUCT_CODE == 3191){                
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:'mcv'})
                this.productCode = this.prodCodeArray[0]
                this.medicare = false
            }else{
                this.prodCodeArray.push({text:lob.NUM_IL_PRODUCT_CODE,value:lob.NUM_IL_PRODUCT_NAME})
                this.productCode = this.prodCodeArray[0]
                this.medicare = true
            }
        },

        getLOBData(){
           // console.log("base url", BaseURl, this.BaseURl)
            let self = this
            let _head = {
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
            }
            axios.get(BaseURl+'/lob', _head).then(function (response) {
                // console.log('RESPPPPPP____________________',response)
                if(response.status == 200){
                    self.lobDataArray = response.data.data
                }
                
            }).catch(function (error) {});
        },

        addNewIcon(item,url) {
            console.log(url);
            let self = this;
            self.showToast( "Your report is being ready. Please wait for some time", self.TOST().SUCCESS);
            function actionMethod(){
                document.getElementById("demo").innerHTML="INPROCESS"
            }
            const inprocess = setTimeout(actionMethod,500)
            axios({
                method: "get",                
                url: BaseURl+"/batch-status/"+ item.JOB_ID ,
                headers: {  
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.accesstoken,
                    "Content-Type": "application/json",
                },
            }).then(function (response) {
                console.log('GETTTT___DOWNLOAD RESPONSE:::',response);
                if(response.status === 200){
                    console.log("inside interval");
                    // self.getTableData('15',0);

                    setTimeout(() => {
                        if(url != undefined){
                            self.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.showDownloadIcon = true : ''});
                            // self.showToast( "Your report is ready to Download" , self.TOST().SUCCESS);
                        }
                        if(url != undefined){
                            self.Tabledata.map((el)=>{ el.JOB_ID === item.JOB_ID ? el.hidePrevIcon = false: ''});
                            self.showToast( "Report Downloaded successfully", self.TOST().SUCCESS);
                        }
                    },8000)
                }
            }).catch(function (error) {
                if(error){
                // clearInterval(clearIntervalTime);
                self.showToast( "Something went wrong, Please try again" , self.TOST().ERROR);
                }
            });
                    

        },


        downloadData(batchId,lobName,url){
            console.log(url);
             var link = document.createElement("a");
                    link.href = url;
                    link.style = "visibility:hidden";
                    link.download = batchId+'_'+lobName + ".csv";
                    // link.setAttribute('download', 'file.csv');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
        },
// **************************************************************************

         displayDataProductwise(lobName){
                const self = this;
                console.log("lob name ", lobName)
                console.log(" productWiseResponse array", productWiseResponse)
                for(let i in _respData){
                if(_respData[i].LOB_NAME == lobName){
                    self.productWiseResponse.push(_respData[i])
                } 
                }  console.log("resp", productWiseResponse)
                },
    // *****************************************************************
        displayPolicyCount(lobname){
            let self = this
            let _head_ = {
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                
            }
         

 if (lobname) {
  axios
    .get(
      BaseURl + `/dashBoard-getCountBy-productName?productName=${lobname}`,
      _head_
    )
    .then(function (response) {
      // console.log('RESPPPPPP____________________',response)
      self.policyCount = response.data.policyData;
      console.log(self.policyCount);
      console.log("res " + response.data);
      console.log(`data fetched successfully  ${lobname}`)
      self.showToast( `Data fetched successfully for  ${lobname}`, self.TOST().SUCCESS)
    })
    .catch(function (error) {
      console.log(error);
    });
            }
else {
    axios
    .get(BaseURl + "/dashBoard-getCountBy-productName", _head_)
    .then(function (response) {
      // console.log('RESPPPPPP____________________',response)
      self.policyCount = response.data.policyData;
        console.log(self.policyCount);
      self.showToast( `Successfully Policy Data fetched`, self.TOST().SUCCESS)
      
    //   console.log("res " + response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
}            
        },
// ****************************************************************************

// ****************************************************************************


        getdata(limitvalue,skip){
            console.log("Last KEY::",skip)
            let self = this
            axios({
                method: "post",
                url:BaseURl+"/job-paginator",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    limit: limitvalue,
                    offset: skip,
                    // lastEvaluatedKey: skip	
                    // lastEvaluatedKey : {JOB_ID: skip}
                },
            }).then(function (response) {
                console.log('DATA RESPONSE:::',response.data.data.Items)
                self.Tabledata = []
                // let _data = {}
                _respData = response.data.data.Items
                // console.log("rrrrrrrrrrrr", _respData)
                for(let i = 0 ; i < _respData.length ; i++){
                    if( _respData[i].LOB_NAME){
                        // console.log("_respData[i]", _respData[i])
                            let _finalData = {
                                JOB_ID: _respData[i].JOB_ID,
                                JOB_START_DATE: _respData[i].JOB_START_DATE,
                                JOB_START_TIME: _respData[i].JOB_START_TIME,
                                JOB_STATUS: _respData[i].JOB_STATUS,
                                STATUS: _respData[i].STATUS,
                                showDownloadIcon: false,
                                hidePrevIcon: true,
                                CSV_DATA :_respData[i].TXT_POLICY_LIST.length == 0 || _respData[i].TXT_POLICY_LIST == '' ? [] : _respData[i].TXT_POLICY_LIST.map(function(el) { 
                                                                                        return _data
                                                                                    }),
                                TXT_POLICY_LIST: _respData[i].TXT_POLICY_LIST,
                            }
                        
                        self.Tabledata.push(_finalData)
                    // console.log('DATA _respData __INS_____:::',self.Tabledata)
                    }
                }

               
            }).catch(function (error) {});
        },
        
        getToken(){
            let self = this
            axios.post(oAuthURl,
                `grant_type=${tokenCred.grantType}&client_id=${tokenCred.clientId}&client_secret=${tokenCred.clientSecret}`
            ).then( res => {
                
                if(res.status == 200){
                    tokenDataObj = res.data
                    this.getdata('15',0)
                    this.getLOBData()
                    this.displayPolicyCount()


// this.getNotificationData();
                    // console.log('POST__TOKEEENNN__RSPPPPPPP' , tokenDataObj)
                }
            })
            .catch(error => {})
        },

        shortRemark(text) {
            try {
                if (text.length > 15) { text = text.slice(0, 15)+'...';}
                return text;
            }catch(err) {}
        },

        submitDataActualdata(){
            let self = this
            if(this.$refs.formData.validate()){
                if(this.jobStartDate == "" || this.jobScheduler == ""){
                    this.showToast("Please Enter Job Start Time & Job Schedular", this.TOST().WARNING);
                }else{
                    if(this.medicare == true && (this.expiryPeriodFrom == '' && this.expiryPeriodTo == '')|| this.policyNo == ''){
                        this.showToast("Please Enter Expiry Periods or Policy Number", this.TOST().WARNING);
                    }else{
                        let new_id = Math.round(new Date().getTime()/1000)
                        let _jobDateStart = self.jobStartDate
                        let _jobTimeStart = self.jobStartTime
                        self.showLoader('Loading',true);
                        axios({
                            method: "post",
                            url:
                                BaseURl+"/job/renewalvault?producttype="+self.productCode.value,
                            headers: {
                                "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                                "Content-Type": "application/json",
                            },
                            data: {
                                expiry_date_from: self.expiryPeriodFrom,
                                expiry_date_to: self.expiryPeriodTo,
                                job_start_date:  _jobDateStart,
                                job_start_time: _jobTimeStart,
                                remarks: self.remarkData,
                                lob_name: self.lineOfBusiness.NUM_IL_PRODUCT_NAME,
                                product_code: self.productCode.text,
                                job_schedule_now:self.jobScheduler,
                                filterType:self.filterType,
                                policyNo:self.policyNo,
                                JOB_ID:	new_id.toString()
                            },
                        }).then(function (response) {
                            // console.log('POST RESPONSE:::',response.data)
                            if(response.data.status == 200){
                                self.showLoader('Loading',false);
                                self.showToast( "Data for"+" "+new_id+" "+"Inserted Successfully" , self.TOST().SUCCESS);
                                self.getdata('15',0)
                                self.clearalldata()
                            }
                        }).catch(function (error) {
                            if(error){
                                self.showToast( "Please enter valid data" , self.TOST().ERROR);
                                self.showLoader('Loading',false);
                            }
                        });
                    }
                }
            }
            else {
                this.showToast("Please fill required fields", this.TOST().WARNING);
            }
        },

        checkExpiryDate(){
            console.log('==========in')
            let self = this
            if(self.expiryPeriodFrom && self.expiryPeriodTo){
                axios({
                    method: "post",
                    url:
                        BaseURl+"/check-for-expdate",
                    headers: {
                        "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                        "Content-Type": "application/json",
                    },
                    data: {
                        expiryFrom: self.expiryPeriodFrom,
                        expiryTo: self.expiryPeriodTo,
                    },
                }).then(function (response) {
                    // console.log('POST RESPONSE:::',response.data)
                    if(response.data.status == 400){
                        self.showToast( response.data.message , self.TOST().WARNING);
                        self.expiryPeriodFrom = ''
                        self.expiryPeriodTo = ''
                    }
                }).catch(function (error) {
                    if(error){
                        self.showToast( error.response.data.message , self.TOST().ERROR);
                        self.showLoader('Loading',false);
                        self.expiryPeriodFrom = ''
                        self.expiryPeriodTo = ''
                    }
                });
            }
        },

        JSONToCSVConvertor2(fileName){
            var multiplePOlicy = [{"Product name" : "","Policy no":"","Previous policy start date":"","Previous policy End date":"","Customer name":"","Status (Success/Failed)":"","Reason for Error":""}];
            this.JSONToCSVConvertor(multiplePOlicy,fileName,true);   
        },

        JSONToCSVConvertor(JSONData, fileName, ShowLabel) {
            // console.log(JSONData,fileName);
            let newArr = {};
            if(JSONData.length == 0){
                this.JSONToCSVConvertor2(fileName);
            }else{
                newArr = Object.keys(JSONData[0]).map((item) => {
                return {label: item, value: item }
            })
            }

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
        },
    },

    filter:{
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
}


</script>

<style scoped>
.theme--light.v-table thead th{
    background-color: lightgray;
}

.scroll{
    overflow-x: auto;
}
</style>
