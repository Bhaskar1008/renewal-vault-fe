<template>
   <v-app style="background-color:#E8EEEF">
       <div style="margin-left:35px" class="mt-4">
                <p class="body-2 font-weight-bold mb-0" style="color:#1E83C2">Sharing Renewal Notice</p>
            </div>
    <v-card class="ma-3">
        <!-- <v-layout class="cardwhitebackclr pa-3" align-center>
            <div class="mr-3">
                <p class="body-2 font-weight-bold mb-0" style="color:#1E83C2">Sharing Renewal Notice</p>
            </div>
        </v-layout> -->

        <v-divider class=""></v-divider>
        <v-form ref="form">
            <v-layout class="pl-3 pt-4" xs12 row wrap>
                <v-flex xs12>
                    <v-layout class="cust_pr">
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Line of Business</p>
                            <v-select 
                                solo 
                                item-text="NUM_IL_PRODUCT_NAME"
                                item-value="NUM_IL_PRODUCT_NAME"
                                return-object
                                :items="lobDataArray"  
                                label="Select"
                                :rules="textRule"
                                v-model="lob"
                                @change="changeLobData(lob)"
                            ></v-select >
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Producer Code </p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                v-model="producerCode" 
                                label="Enter...">
                            </v-text-field>
                        </v-flex>
                        
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Policy Number </p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                v-model="policyNo" 
                                
                                label="Enter...">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-form>
            <!-- <v-divider class=""></v-divider> -->
            <v-layout class="pa-2" style="position:relative;bottom:15px;float:right">
                
                <v-btn flat style="width:100px;height:35px;background-color:#FFFFFF;color:#646666;border:1.5px solid #ccc;border-radius:3px" @click="clearTriggerData()" class="ma-2 pa-3" color="#646666" dark small>
                    <!-- <v-icon small dark left class="mr-2">delete</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Clear
                </v-btn>

                <v-btn flat style="width:100px;height:35px;background-color:#0073BB;color:#FFFFFF;border:1.5px solid #ccc;border-radius:4px" class="ma-2 pa-3" color="#0073BB" dark small @click="submitData()">
                    <!-- <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon> -->
                    <v-divider vertical class="mr-2"></v-divider>
                    Submit
                </v-btn>

                <v-btn  class="ma-2" color="#E46A25" dark small v-if="download === true" @click="downloadFile()">
                    <v-icon small dark left class="mr-2">mdi-download</v-icon>
                    <v-divider vertical class="mr-2"></v-divider>
                    Download
                </v-btn>
            </v-layout>
    
    </v-card>
   </v-app> 
</template>

<script>

import axios from 'axios'
// import moment from 'moment';
import xlsx from 'json-as-xlsx'
import { oAuthURl, tokenCred } from '../../common/API_Config'


let tokenDataObj = null
let lastjobid = ''

    export default {
        data(){
            return{
               textRule: [v => !!v || 'This Field is required'],
               policyNo:"",
               producerCode:"",
               lob:"",
               lobDataArray:[],
               isPolicyNumber:false,
               download:false,
               prodCodeArray:[],
               uploadProdCode:'',
               JSONData:[]


            }
        },

        created(){
            this.$store.commit('SET_PAGE_TITLE', 'Sharing Renewal Notice');
            this.getToken();
        
        },

        methods:{

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
                // this.lobDataArray = []
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

            clearTriggerData(){
                this.$refs.form.reset();
                // this.policyNo = "",
                // this.producerCode = "",
                // this.lob = ""
                // this.download = false;
            },

            checkPolicy(){
                if(this.policyNo){
                    this.isPolicyNumber = true;
                }else{
                    this.isPolicyNumber = false;
                }
            },

            submitData(){
                console.log(this.lob)
                let lobToSend = this.lob.NUM_IL_PRODUCT_NAME == 'MotorCommercialGCV' ? 'gcv': this.lob.NUM_IL_PRODUCT_NAME == 'MotorCommercialPCV' ? 'pcv': 'mcv';
                // console.log(lobToSend)
                
                let self = this;
                this.checkPolicy();
                // console.log("899999999999",self.uploadProdCode.value)
                    // if(this.policyNo !== '' || this.policyNo == null && this.producerCode !== ''){
                    //     self.showToast( "Enter either Policy Number or Producer Code" , self.TOST().WARNING);
                    // }
                if(self.$refs.form.validate()){
                    if(this.policyNo == '' && this.producerCode == ''){
                        self.showToast( "Enter either Policy Number or Producer Code" , self.TOST().WARNING);
                    }else if(this.policyNo && this.producerCode){
                        self.showToast( "Enter either Policy Number or Producer Code" , self.TOST().WARNING);
                    }else{
                        let data =  {}
                        // let inputArr = [];
                        if(this.isPolicyNumber == true){         
                            data = {
                                "input":[
                                    {
                                        "number":this.policyNo, 
                                        "stage":lobToSend
                                    }
                                ],
                                "isPolicyNumber":self.isPolicyNumber
                            }                   
                        }else{
                            // inputArr.push({"number":this.producerCode, "stage":self.uploadProdCode.value})
                            // formData.append("input",[{"number":this.producerCode, "stage":self.uploadProdCode.value}])
                            // formData.append("isPolicyNumber", self.isPolicyNumber)
                            data = {
                                "input":[
                                    {
                                        "number":this.producerCode, 
                                        "stage":lobToSend
                                    }
                                ],
                                "isPolicyNumber":self.isPolicyNumber
                            }    
                        }
                        self.showLoader('Loading',true);

                        axios({
                            method: "post",
                            url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/get-data-by-policy-or-producer-number",
                            headers: {
                                "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                                "Content-Type": "application/json",
                            },
                            
                            data: data,
                        }).then(function (response) {
                            // console.log('GETTTT___UPLOAD RESPONSE:::',response)
                            if(response.status == 200 && response.data.length !== 0){
                                
                                self.showLoader('Loading',false);
                                self.showToast( "Data Fetched successfully" , self.TOST().SUCCESS);
                                self.$refs.form.reset();
                                self.JSONData  = [];
                                for(let i = 0 ; i < response.data.length ; i++){
                                    let _finalData = {
                                        "Polciy Number" : response.data[i].policyNumber,
                                        "Producer Code" : response.data[i].producerCode,
                                        SMS : response.data[i].sms == '' ? 'No': 'YES',
                                        Email : response.data[i].email == '' ? 'No': 'YES',
                                        "Physical Copy" : response.data[i].physicalCopy == '' ? 'No': response.data[i].physicalCopy,
                                        "Renewal Expiry Date" : response.data[i].renewalExpiryDate == '' ? 'No' : response.data[i].renewalExpiryDate,
                                        "Sub Producer Code": response.data[i].subProducerCode == '' || response.data[i].subProducerCode == 'null' ? '-': response.data[i].subProducerCode

                                    }
                                    
                                    self.JSONData.push(_finalData)

                                }
                                // self.$refs.form.reset();
                                self.download = true;
                
                            }else{
                                self.showLoader('Loading',false);
                                self.showToast( "No Data Found" , self.TOST().WARNING);
                                self.$refs.form.reset();

                            }
                        }).catch(function (error) {
                            if(error){
                                self.showLoader('Loading',false);
                                self.showToast( error.response.data.message , self.TOST().ERROR);
                            }
                        });
                    }
                }else{
                    this.$refs.form.validate();
                    this.showToast("Please Enter Valid Data", this.TOST().WARNING);
                }
            },

            downloadFile(){
                let fileName = new Date().getTime()
                let newArr = Object.keys(this.JSONData[0]).map((item) => {
                    return {label: item, value: item }
                })

                let data = [
                    {
                        sheet: fileName,
                        columns: newArr,
                        content: this.JSONData
                    },
                ]

                let settings = {
                    fileName: fileName, // Name of the spreadsheet
                    extraLength: 3, // A bigger number means that columns will be wider
                    writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
                }
                
                xlsx(data,settings)
                this.download = false;

                // console.log(Object.keys(this.JSONData[0]));
            }

        }
    }
</script>

<style>

</style>