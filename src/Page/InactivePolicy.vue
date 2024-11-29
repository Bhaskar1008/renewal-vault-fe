<template>
    <v-app style="background-color:#E8EEEF">
        <!-- <v-form ref="formData" v-model="formnew"> -->
        <div style="margin-left:35px" class="mt-4">
            <!-- <v-text class="body-2 font-weight-bold" style="color:#646666">RN Scheduler</v-text> -->
            <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Inactivate policy in Renewal vault</v-text>
        </div>    
        <v-card class="ma-3" style="height:260px">
            <v-layout class="cardwhitebackclr pa-3" align-center style="">
                

                <!-- <v-divider  class="mr-3" vertical ></v-divider> -->

                <!-- <div class="mr-2 pl-3 pr-3 pt-1 pb-1" style="background-color:#152F38;display:flex;flex-direction:row;align-items:center;border-radius:20px">
                    <v-icon small dark>add</v-icon>
                    <div class="ml-1 mr-1">
                        <v-text class="caption" style="color:#fff">Create New Schedule</v-text>
                    </div>
                </div> -->
            </v-layout>

            <!-- <v-divider class=""></v-divider> -->

            <!-- <div class="pa-2 pl-4" style="background-color:#07458E">
                <v-text class="button font-weight-medium" style="color:#fff">Create Schedule for Renewal Notice</v-text>
            </div> -->
            <v-form ref="formData">
            <v-layout class="pl-3" xs12 row wrap>
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
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Product Code *</p>
                            <v-select 
                                :items="prodCodeArray"  
                                solo 
                                disabled
                                label="Select"
                                item-text="text"
                                item-value="value"
                                return-object
                                v-model="productCode"
                            ></v-select >
                        </v-flex>
                        <v-flex xs3 class="mr-3">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Policy Number</p>
                            <v-text-field 
                                class="rounded-0 " 
                                solo 
                                v-model="polNum" 
                                label="Enter...">
                            </v-text-field>
                        </v-flex>

                        <v-flex xs3 class="mr-3">
                            <v-layout column class="cust-rmvpd-pr">
                                <p class="font-weight-bold mb-1 caption" style="color:#646666">Expiry Date</p>
                                <v-menu
                                    ref="calender"
                                    :close-on-content-click="false"
                                    v-model="expiryDateMenu"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    max-width="290px"
                                    min-width="290px" 
                                    class="rounded-0 ">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            slot="activator"
                                            label="MM/DD//YYYY"
                                            :value="computedexpiryDate"
                                            solo
                                            class="rounded-0"
                                            readonly 
                                            maxlength="10"
                                            v-bind="attrs"
                                            v-on="on">
                                        <div slot="prepend-inner" style="background-color:#F7F7F7"><img class="pa-1" style="height:35px" src="../assets/date_24X24.png"/></div></v-text-field>
                                    </template>
                                    <v-date-picker :min="todaydatevalue" @input="expiryDateMenu = false" v-model="expiryDate" no-title></v-date-picker>
                                </v-menu>
                            </v-layout>
                        </v-flex>

                        
                    </v-layout>
                    <v-layout>
                        <v-flex xs3 class="mr-0">
                            <p class="font-weight-bold mb-1 caption" style="color:#646666">Upload </p>
                            <v-flex class="dm-fileContainer-bulk mt-1 mr-2" style="border: 1px solid #c1c8cc;">
                                <v-text class="caption font-weight-medium">Uploading Via Browsing</v-text>
                                <img class="ml-3" src="../assets/upload.png"/>
                                <input
                                    hide-details = "true"
                                    type="file"
                                    ref="fileref"
                                    id="fileUpload"
                                    name="myfile"
                                    @change="onFilePicked"/>
                            </v-flex>
                        </v-flex>
                        <v-flex xs3 class="mt-3">
                            <v-btn @click="JSONToCSVConvertor2()" flat style="width:65%;height:35px;background-color:#0073bb;color:#fff;border:1.5px solid #ccc;border-radius:3px" class="ma-2 pa-3" dark small>
                                <!-- <v-icon small dark left >delete</v-icon> -->
                                Download Sample Format
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            </v-form>

            <!-- <v-divider class=""></v-divider> -->

            <v-layout class="pa-2" style="position:relative;float:right">
                <!-- <v-btn class="ma-2" color="#152F38" dark small>
                    <v-icon small dark left >cancel</v-icon>
                    Close
                </v-btn> -->
                <v-btn flat style="width:100px;height:35px;background-color:#FFFFFF;color:#646666;border:1.5px solid #ccc;border-radius:3px" class="ma-2 pa-3" @click="clearalldata()" dark small>
                    <!-- <v-icon small dark left >delete</v-icon> -->
                    Clear
                </v-btn>
                <v-btn flat style="width:100px;height:35px;background-color:#0073BB;color:#FFFFFF;border:1.5px solid #ccc;border-radius:4px" @click="submitDataActualdata()" class="ma-2 pa-3"  dark small>
                    <!-- <v-icon small dark left>check_circle</v-icon> -->
                    Submit
                </v-btn>

            </v-layout>
        </v-card>
        <!-- <v-card>
            <v-card-title>
            Nutrition
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.fat }}</td>
                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                    <td class="text-xs-right">{{ props.item.protein }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                </template>
                
            </v-data-table>
        </v-card> -->
    </v-app>
</template>

<script>import axios from 'axios';
import xlsx from 'json-as-xlsx'
import moment from 'moment';
let tokenDataObj = null

export default {
    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Collection and Processing');
        // this.User_id = this.$store.state.agentDetails.userId;
        this.getToken()
        // this.JSONToCSVConvertor(this.csvData,'sampleCSV',true,'MCV')
         this.todaydatevalue = moment().format("YYYY-MM-DD");
         
    },

    computed: {
        computedexpiryDate(){
            return this.expiryDate ? moment(this.expiryDate).format("DD-MM-YYYY"): ''
        },
    },

    data(){
        return{

            polNum: '',
            todaydatevalue:'',
            selectFileData:{},
            textRule: [v => !!v || 'This Field is required'],
            lobDataArray:[],
            tokenData:{},
            productCode:'',
            prodCodeArray:[],
            lineOfBusiness:'',
            expiryDateMenu:false,
            expiryDate:null,
            search: '',
            headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' }
            ],
            desserts: [
            {
                name: 'Frozen Yogurt',
                calories: 159,
                fat: 6.0,
                carbs: 24,
                protein: 4.0,
                iron: '1%'
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
                protein: 4.3,
                iron: '1%'
            },
            {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                protein: 6.0,
                iron: '7%'
            },
            {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                protein: 4.3,
                iron: '8%'
            },
            {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
                protein: 3.9,
                iron: '16%'
            },
            {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
                protein: 0.0,
                iron: '0%'
            },
            {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
                protein: 0,
                iron: '2%'
            },
            {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
                protein: 6.5,
                iron: '45%'
            },
            {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
                protein: 4.9,
                iron: '22%'
            },
            {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
                protein: 7,
                iron: '6%'
            }
            ]
        }
    },

    methods:{
        onFilePicked(event){
            // console.log('CSVVV FILEEEE @CHANGE ____________________',|| event.target.files[0].type == "application/vnd.ms-excel")
            let self = this
            self.selectFileData = event.target.files
            if(event.target.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ){
                if(Object.keys(self.selectFileData).length !== 0 ){
                    self.showToast( "File Added Successfully" , self.TOST().SUCCESS);
                }
            }else{
                self.showToast( "Only Excel file allowed" , self.TOST().WARNING);
            }

        },

        JSONToCSVConvertor2(){
            var multiplePOlicy = [{"Policy number" : "235036081","Expiry date":""}];
            this.JSONToCSVConvertor(multiplePOlicy,"Sample_InactiveUpload",true);   
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
        },

        clearalldata(){
            let self = this

            self.$refs.formData.reset();
            self.selectFileData = {}

        },    

        submitDataActualdata(){
            let self = this
            if(self.$refs.formData.validate()){
                if((self.polNum || self.expiryDate) || Object.keys(self.selectFileData).length !== 0){
                    self.showLoader('Loading',true);
                    let formData =  new FormData()
                    if (self.selectFileData[0] !== undefined) {
                        formData.append("policies", self.selectFileData[0])
                        formData.append("expDate", self.expiryDate)
                        formData.append("policyNo", self.polNum)
                        formData.append("stage", self.productCode.value)
                        console.log('frmdta', formData)
                    }else{
                        formData.append("policies", '')
                        formData.append("expDate", self.expiryDate)
                        formData.append("policyNo", self.polNum)
                        formData.append("stage", self.productCode.value)
                        console.log('frmdta', formData)
                    }
                    axios({
                        method: "put",
                        url:
                            "https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/inactivate-policy?lob="+self.productCode.value,
                        headers: {
                            "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                            "Content-Type": "application/json",
                        },
                        data: formData,
                    }).then(function (response) {
                        console.log('POST RESPONSE:::',response)
                        if(response.data.status == "Success"){
                            self.showLoader('Loading',false);
                            self.showToast( response.data.message , self.TOST().SUCCESS);
                            self.clearalldata()
                        }
                    }).catch(function (error) {
                        if(error){
                            self.showToast( "Enter Valid Data" , self.TOST().ERROR);
                            self.showLoader('Loading',false);
                        }
                    })
                }else{
                    self.showToast("Please enter PolicyNo & Expiry Date or Upload File", self.TOST().WARNING);
                }
            }else {
                self.showToast("Please Fill Required Fields", self.TOST().WARNING);
            }
        },

        getToken(){
            let self = this
            axios.post(config.oAuthURl,
                `grant_type=client_credentials&client_id=4mvhrgqptajd0stm50l7g1alin&client_secret=1job69ftt8042aa4geppjf05bp005lkkgogt7reegl00cslqosbn`
            ).then( res => {
                
                if(res.status == 200){
                    tokenDataObj = res.data
                    // this.getdata('15',0)
                    this.getLOBData()
                    // this.getNotificationData();
                    // console.log('POST__TOKEEENNN__RSPPPPPPP' , tokenDataObj)
                }
            })
            .catch(error => {})
        },

        getLOBData(){
            let self = this
            let _head = {
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
            }
            axios.get('https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/lob', _head).then(function (response) {
                // console.log('RESPPPPPP____________________',response)
                if(response.status == 200){
                    self.lobDataArray = response.data.data
                }
                
            }).catch(function (error) {});
        },

        changeLobData(lob){
            this.prodCodeArray = []
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
            // console.log('prof', this.productCode)
        },
    }
}
</script>

<style>

</style>