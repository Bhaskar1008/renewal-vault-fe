
<template>
    <v-card>
        <v-layout row wrap>
            <v-card flat style="background-color:#FAFAFA; width:100%;">
                <v-layout wrap justify-space-between class="pt-4 ml-3 mr-3 " color="#FAFAFA">
                    <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                        <v-select v-model="channeldatafilter" :items="channeldataall" item-text="text" item-value="value" label="Channel" @change="channelfilters"></v-select>
                    </v-flex>
                    <v-flex></v-flex>
                    <!-- <v-btn depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="openDialog()">Add Partner
                        <v-icon dark right>add_circle</v-icon>
                    </v-btn> -->
                    <v-menu transition="slide-y-transition">
                        <v-btn depressed medium slot="activator" color="secondary" @click="openwindow" class="white--text thebtn">Bulk Upload
                            <v-icon dark right>publish</v-icon>
                        </v-btn>
                    </v-menu>
                    <v-flex xs10 sm6 md2 class="ml-2">
                        <p>{{selec_emp_code}}</p>
                        <v-text-field @keyup.enter="startsearch" v-model="selec_emp_code" label="Search" append-icon="search" height="30px"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-card>
            <div>
                <hr>
            </div>
            <v-flex class="ml-3 mr-3 mt-3" style="flex-flow:column wrap;width:100%;">
                <v-layout row justify-space-between class="mr-5 mt-3 ">
                    <v-flex>
                        <v-dialog v-model="dialog" persistent max-width="800px">
                            <v-card>

                                <v-flex style="background-color:#3a3a3a">
                                    <v-card-title class="subheading" style="color:white">{{btnname}} Partner</v-card-title>
                                </v-flex>
                                <v-card-text>
                                
                                <v-flex xs12 sm6 md6>
                                                <p class="body-2 mb-3">Please upload Profile Image from local:</p>
                                                <v-layout align-center row wrap>
                                                    <v-flex xs4 sm6 md2>
                                                        <input type="file" name="media_upload" ref="prodVideo" accept="image/*" class="sd-img-btn-size media-pos" style="opacity: 0" @change="handleFileUpload"/>
                                                        <img src="../assets/Group_968.png" class="sd-img-btn-size"/>
                                                    </v-flex>
                                                    <!-- <v-flex xs6 sm3>
                                                        <p class="caption font-italic font-weight-medium" style="color:#9B9B9B">Supports mp4 format. Approx time to upload 2mb file - 30 min</p>
                                                    </v-flex> -->
                                                </v-layout>
                                </v-flex>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            
                                            <v-flex xs12 sm6 md6>
                                                <v-select v-model="partnerInfo.channelName" :rules="[v => !!partnerInfo.channelName || 'This field is required']" required :readonly="channeledit" label="Channel Name*" :items="channeldata" item-text="text" item-value="value"></v-select>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.partnerId" :rules="[v => !!partnerInfo.partnerId || 'This field is required']" required label="Partner ID*"></v-text-field>
                                            </v-flex>
                                            <!-- <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.salutation" label="Salutation"></v-text-field>
                                            </v-flex> -->
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.partnerName" :rules="[v => !!partnerInfo.partnerName || 'This field is required']" required label="Partner Name*"></v-text-field>
                                            </v-flex>
                                            <!-- <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.middlename" label="Middle Name"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.lastname" :rules="[v => !!partnerInfo.lastname || 'This field is required']" required label="Last Name*"></v-text-field>
                                            </v-flex> -->
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.contactNo" :rules="[v => !!partnerInfo.contactNo || 'This field is required']" required mask="phone" label="Contact No.*"></v-text-field>
                                            </v-flex>

                                            <v-flex xs12 sm6 md6>
                                                <v-menu ref="calender" :close-on-content-click="false" v-model="calender" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                                    <v-text-field slot="activator" v-model="partnerInfo.DOJ" label="Joining Date" persistent-hint prepend-icon="event" @blur="date = parseDate(partnerInfo.DOJ)"></v-text-field>
                                                    <v-date-picker v-model="date" no-title @input="validAge"></v-date-picker>
                                                </v-menu>
                                                <p style="color:red;font-size:13px;opacity:0.8;position: absolute;bottom: 839px;">{{agetext}}</p>
                                            </v-flex>

                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.EmailId" label="Email" :rules="[v => /.+@.+/.test(v) || 'E-mail must be valid']"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12>
                                                <v-text-field v-model="partnerInfo.address" :rules="[v => !!partnerInfo.address || 'This field is required']" label="Address"></v-text-field>
                                            </v-flex>

                                            <v-flex xs12 sm12 md12>
                                                <span>Gender</span>
                                                <v-radio-group :rules="[v => !!partnerInfo.gender || 'This field is required']" required v-model="partnerInfo.gender" row>
                                                    <v-radio label="Male" color="#00ACC1" value="male"></v-radio>
                                                    <v-radio label="Female" color="#00ACC1" value="female"></v-radio>
                                                </v-radio-group>
                                            </v-flex>

                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.latitude" label="Latitude"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.longitude" label="Longitude"></v-text-field>
                                            </v-flex>

                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.bankName" label="Bank Name"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="partnerInfo.csmId" label="CSM ID"></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn depressed large color="grey lighten-3" @click="dialog=false">Cancel
                                        <v-icon right dark>highlight_off</v-icon>
                                    </v-btn>
                                    <v-btn depressed large color="secondary" @click="partnerCURD">{{btnname}}
                                        <v-icon dark right>check_circle</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-flex>
                </v-layout>

                <v-flex justify-center md12 ml-3 mt-3 mr-5 mb-4>
                    <h3 class="text-xs-center mb-3">KPI Details</h3>
                    <v-data-table v-model="selected" :headers="headers" :items="dummydata" hide-actions  item-key="_id" class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <!-- <td>
                                <v-checkbox v-model="props.item.selected" @change="custTableCheck(props.item.client_id, $event, props.index)" primary hide-details></v-checkbox>
                            </td> -->
                                              <!-- </td> -->
                                        <td class="">{{props.item.employee_e_code}}</td>
                                        <td class="">{{props.item.employeeName}}</td>
                                        <td class="">{{props.item.Designation}}</td>
                                        <td class="">{{props.item.Branch_Name}}</td>
                                        <!-- <td class=""><span :style="{color: props.item.leadpopStatus == 'Active' ? '#13961c' : '#d61111'}">{{props.item.leadpopStatus}} </span> -->
                                        <!-- </td> -->
                                        <td class="">{{props.item.rank}}</td>
                                        <td class="">{{props.item.Renewed_Policy_count}}</td>
                                        <td class="">{{props.item.uploadedDate}}</td>
                                        <td class="">{{props.item.Final_Score}}</td>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-flex>
        </v-layout>
        <div class="text-xs-center pagination">
            <v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
        </div>
        <v-dialog v-model="dialogBulkUpld" persistent max-width="820px">
            <v-card>
                <v-flex style="background-color:#3a3a3a">
                    <!-- sm99 -->

                    <v-card-title class="subheading" style="color:white;justify-content:space-between;">Upload File
                        <v-icon dark @click="dialogBulkUpld = false">clear</v-icon>
                    </v-card-title>
                </v-flex>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-stepper v-model="steps"  >
                            <v-stepper-header>
                                <v-stepper-step step="1">Upload Data</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step :complete="steps > 1" step="2">Status</v-stepper-step>
                            </v-stepper-header>
                            <v-stepper-items>
                                <v-stepper-content step="1">
                                  <v-layout row class="pa-2">
                                    <div style="display:flex; flex-direction:column;justify-content: center;"> <p style="font-size:20px; font-weight:500;" >Please Select a Month</p>
                                                <p v-if="datemonth" >Your Selected month for Uploading the KPI sheet is: <span class="selectedmon">{{moment(datemonth).format('MMMM')}} | {{datemonth}}</span> </p>
                                    </div>
                                            <v-flex class="picit">  
                                                    <v-date-picker
                                                        v-model="datemonth"
                                                        type="month"
                                                        class="pa-2"
                                                        :min="previous_year"
                                                        :max="current_one"
                                                    ></v-date-picker>
                                            </v-flex>
                                    </v-layout>

                                    <v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
                                    <v-layout>
                                        <v-flex class="fileContainer-bulk  mt-6">
                                            <v-text class="upload-text">UPLOAD FILE</v-text>
                                            <v-icon right dark>publish</v-icon>
                                            <input type="file" id="fileUpload" @change="jsonupload">
                                        </v-flex>
                                        <v-layout ml-3 column>
                                            <v-text v-if="excelfilename !== '' " class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">{{excelfilename}}</v-text>
                                            <v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Supports xls/csv format.</v-text>
                                            <v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Approx time to upload 2 mb file - 30 min.</v-text>
                                        </v-layout>
                                    </v-layout>
                                    <v-layout ml-3 mt-3>
                                        <div v-if="fileLink !== ''">
                                            <v-layout row>
                                                <div class="font-weight-medium body-2 ">Selected File:</div>
                                                <div class="body-1 font-weight-regular font-italic">{{fileLink}}</div>
                                            </v-layout>
                                        </div>
                                    </v-layout>
                                    <v-layout mt-3 justify-space-between>
                                        <a href="https://image-upload-bucket-2019.s3.ap-south-1.amazonaws.com/069fcec1f14d108e0294d8da75fdff8e39372766.xlsx" download>
                                            <v-btn color="primary">sample file
                                                <v-icon right dark>save_alt</v-icon>
                                            </v-btn>
                                        </a>
                                        <v-btn color="primary" @click="goNext()">Next
                                            <v-icon class="ml-2" size="20px">arrow_forward</v-icon>
                                        </v-btn>
                                    </v-layout>
                                </v-stepper-content>
                                <v-stepper-content step="2">
                                    <v-flex xs12 sm12 md12 style="display:flex;align-items:center">
                                        <v-icon large color="success">check_circle_outline</v-icon>
                                        <v-text class="subheading font-weight-medium ml-3">{{sucessCount}} Users Data successfully Uploaded</v-text>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 mt-3 style="display:flex;align-items:center">
                                        <v-icon large color="error">highlight_off</v-icon>
                                        <v-text class="subheading font-weight-medium ml-3">Errors Found in {{failCount}} Users Data</v-text>
                                    </v-flex>
                                    <v-flex mt-3>
                                        <v-text class="subheading font-weight-medium ml-1">Failed Data:</v-text> <a :href="errorLink" download>{{errorLink}}</a>
                                    </v-flex>
                                    <v-card-actions style="justify-content:flex-end;">
                                        <v-layout mt-5 justify-space-between>
                                            <v-btn color="primary" @click="goback">
                                                <v-icon class="mr-2">arrow_back</v-icon>Previous</v-btn>
                                            <v-btn color="primary" @click="cancelStepper">Close
                                                <v-icon class="ml-2" size="20px">clear</v-icon>
                                            </v-btn>
                                        </v-layout>
                                    </v-card-actions>
                                </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Manual Allocation Popup  -Salman -->
        <v-dialog v-model="manualAlloc" max-width="750">
            <v-card>
                <v-layout justify-space-between style="background-color:#424242">
                    <v-card-title class="title" style="color:white">Manual Allocation</v-card-title>
                    <v-flex xs4 class="ma-2">
                        <!-- <v-text-field @input="Searchdatatable" v-model="value" label="Search" append-icon="search" height="30px"></v-text-field>  -->
                        <v-text-field @input="searchAgentCust" v-model="agentSearch" flat dark solo-inverted hide-details prepend-inner-icon="search" label="Search" class=""></v-text-field>
                    </v-flex>
                </v-layout>
                <v-flex pa-2>
                    <v-flex v-if="showAlertext == false">
                        <v-flex>
                            <v-text class="caption font-weight-medium" style="color:#C62828">#Some of the selected leads do not have common ‘city’ value</v-text>
                        </v-flex>
                        <v-flex>
                            <v-text class="caption font-weight-medium" style="color:#C62828">#Some of the selected leads are already allocated</v-text>
                        </v-flex>
                    </v-flex>
                    <v-layout>
                        <v-flex xs3>
                            <v-flex>
                                <v-select v-model="channelpop" @change="getPopChannel" :items="channeldata" item-text="text" label="Channel Name"></v-select>
                            </v-flex>
                            <v-flex>
                                <v-select v-model="statepop" @change="cityfind" :items="StateListdata" item-text="text" label="State"></v-select>
                            </v-flex>
                            <v-flex>
                                <v-select v-model="citypop" @change="cityData" :items="Citylist" item-text="asciiname" label="City"></v-select>
                            </v-flex>
                            <v-flex>
                                <v-select v-model="branchpop" :items="branchArray" item-text="text" label="Branch"></v-select>
                            </v-flex>
                            <v-btn round small color="primary" @click="getAllAgents">Show agents</v-btn>
                        </v-flex>
                        <v-flex xs9 ml-3>
                            <v-flex v-if="showAlertext == false" style="display:flex;justify-content:center">
                                <v-flex xs5 ml-3 mt-4>
                                    <v-img src="/web/assets/Group2686.png" style="height:120px;width:140px"></v-img>
                                    <v-flex xs10 mt-1>
                                        <v-text class="caption font-weight-medium" style="color:#90A4AE">Either select a branch or search for agent code</v-text>
                                    </v-flex>
                                </v-flex>
                            </v-flex>
                            <v-flex v-if="showAlertext == true">
                                <v-data-table ref="vTable" v-model="popTable" :headers="popHeader" :items="agentObj" hide-actions :pagination.sync="pagination" item-key="_id" class="elevation-1">
                                    <template slot="items" slot-scope="props">
                                        <!-- <td> -->
                                            <!-- <v-checkbox v-model="props.popTable" @change="agentTable(props.item._id,$event)" primary hide-details></v-checkbox> -->
                                            <!-- <v-radio-group v-model="radios" row>
                                                <v-radio :value="props.item._id" @change="agentTable(props.item._id,$event)"></v-radio>
                                            </v-radio-group> -->
                     
                                        <!-- </td> -->
                                        <td class="">{{props.item.employee_e_code}}</td>
                                        <td class="">{{props.item.employeeName}}</td>
                                        <td class="">{{props.item.Designation}}</td>
                                        <td class="">{{props.item.Branch_Name}}</td>
                                        <!-- <td class=""><span :style="{color: props.item.leadpopStatus == 'Active' ? '#13961c' : '#d61111'}">{{props.item.leadpopStatus}} </span> -->
                                        <!-- </td> -->
                                        <td class="">{{props.item.rank}}</td>
                                          <td class="">{{props.item.Renewed_Policy_count}}</td>
                                            <td class="">{{props.item.uploadedDate}}</td>
                                              <td class="">{{props.item.Final_Score}}</td>
                                    </template>
                                </v-data-table>
                                <v-layout wrap align-center>
                                    <v-flex text-sm-center mt-2>
                                        <v-flex>
                                            <!-- <v-text class="caption font-weight-medium" style="color:#C62828">Cannot proceed!</v-text> --></v-flex>
                                        <v-flex>
                                            <!-- <v-text class="caption font-weight-medium" style="color:#C62828">The count of selected agents is more than the count of leads</v-text> --></v-flex>
                                    </v-flex>
                                    <v-btn round small color="primary" v-if="showAllocateBtn === true" @click="allocateLeads">Allocate</v-btn>
                                    <v-btn round small disabled color="primary" v-else>Allocate</v-btn>
                                </v-layout>
                                <div class="text-xs-center pt-2">
                                    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                                </div>
                            </v-flex>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round medium color="primary" @click="manualAlloc = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Auto Allocation Popup  -Salman -->
        <v-dialog v-model="autoAlloc" max-width="650">
            <v-card>
                <v-flex style="background-color:#424242">
                    <v-card-title class="title" style="color:white">Auto Allocation</v-card-title>
                </v-flex>
                <!-- <v-card-text>
                            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                            </v-card-text> -->
                <v-flex text-sm-center mt-4>
                    <v-text class="body-1 font-weight-bold" style="color:#0277BD">Allocating...</v-text>
                </v-flex>
                <v-flex text-sm-center mt-2 mb-4>
                    <v-text class="body-1 font-weight-bold">25 leads from 6 cities to agents in 6 branches</v-text>
                </v-flex>
                <v-card-actions style="justify-content:space-between">
                    <!-- <v-spacer></v-spacer> -->
                    <v-btn small round color="primary" @click="autoAlloc = false">Undo Process</v-btn>
                    <v-btn small round color="primary" @click="autoAlloc = false">finish</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<script>
import axios from 'axios'
import loadChannel from '../common/onProjectLoad.js'
import moment from 'moment';
const martialList = [{text:'Single',value:'single'},{text:'Married',value:'married'},{text:'Divorced',value:'divorced'},{text:'Widowed',value:'widowed'}]
const salutationList = ["Mr","Mrs"]
var fileUpload = null;

let initialPartnerInfoState = {};

export default {
    filters: {
        formateDate(milisecond) {
            try {
                return new Date(parseInt(milisecond)).toLocaleDateString()
            } catch (err) {
                return milisecond;
            }
        }
    },
    created(){
        this.selec_emp_code = ""
        this.get_kpi_dash_data('all', null);

        var d = Date.now();
        this.current_one = moment(d).format('YYYY-MM');
        var pd = new Date(this.current_one);
        pd.setFullYear(pd.getFullYear()-1);
        this.previous_year = moment(pd).format('YYYY-MM');
        this.$store.commit('SET_PAGE_TITLE', 'KPI Dashboard');
        loadChannel.getChannel(this, res => {
            console.log("mixin channel data", res)
            for (let i = 0; i < res.length; i++) {
                if (res[i].active === 1){
                    let channetobj = {
                        text: res[i].channelName,
                        value: res[i]._id
                    }
                    this.channeldata.push(channetobj)
                    this.channeldataall.push(channetobj)
                }
            }
            
            let alldata = {
                text: 'All',
                value: 'all',
            }
            this.channeldataall.unshift(alldata)
        })
        // this.channeldatafilter = 'all'
        // this.GetAllLeadData(this.channeldatafilter);
        // this.fetchExistingPartners();
        // this.getoccupation();
        //  console.log("wkrjwlekrjwl =>", this.$refs.vTable);
    },
    mounted() {
        initialPartnerInfoState = JSON.parse(JSON.stringify(this.partnerInfo));
        let _date_ = new Date();
        this.partnerInfo.partnerId = 'P'+_date_.getSeconds()+''+this.generateRandomCode().toUpperCase();
        this.GetAgentstate();
        // this.getAgentCity();
    },
    data() {
        return {

        kpitable:{
            employee_e_code:"",
            employeeName:"",
            Designation:"",
            Branch_Name:"",
            rank:"",
            Renewed_Policy_count:"",
            uploadedDate:"",
            Final_Score:""
}
,
            selec_emp_code:"",
            datemonth:"",
            current_one:"",
            previous_year:"",
            exdata:[],
            channeledit: false,
            oneditonly: false,
            editedItem: {
                AffiliateName: '',
                firstn: '',
                lastn: '',
            },
            profileimage:'',
            moment,
            // StateList,
            custID: [],
            agentSearch: '',
            agntStateList: [],
            agentCityList: [],
            branchArray: [],
            allAgents: [],
            custIDLen: '0',
            channelPopID: '',
            headCheck: '',
            radios: 1,
            channelpop: '',
            statepop: '',
            citypop: '',
            branchpop: '',
            popTable: '',
            filterByData: '',
            agentpopStatus: '',
            valueData: [],
            showManual: false,
            showAllocateBtn: false,
            Citylist: [],
            cityDataDrp: [],
            showCityDrop: false,
            StateListdata: [],
            martialList,
            dialog: false,
            value: '',
            agetext: '',
            TableName: '',
            btnname: 'Add',
            pageLength: 0,
            page: 1,
            skip: 0,
            calender: false,
            date: null,
            calender1: false,
            date1: null,
            calender2: false,
            date2: null,
            CustomerId: '',
            allCheckSelect: '',
            OccupationList: [],
            salutationList,
            getState: {},

            partnerInfo: {
                channelName: '',
                partnerId: '',
                partnerName: '',
                contactNo: '',
                DOJ: '',
                EmailId: '',
                address: '',
                gender: '',
                latitude: '',
                longitude: '',
                bankName: '',
                csmId: '',
                avatar:''
            },
            skipdiffrence: this.paginationdiff(),
            channeldatafilter: 'all',
            channeldataall: [],
            channeldata: [],
            selected: [],
            manualAlloc: false,
            autoAlloc: false,
            showAlertext: false,
            pagination: {},
            bulkData: [],
            sucessCount: 0,
            failCount: 0,
            errorLink: 'Link Comes Here',
            fileLink: '',
            excelfilename: '',
            dialogBulkUpld: false,
            customerdataList: [],
            filterby: '',
            filterStruct: '',
            valueDrp: '',
            cityDrp: '',
            custListData: [],
            custdbStruct: {
                client_id: '',
                customer_first_name: '',
                customer_last_name: '',
                primary_telephone: '',
                email_id: '',
                state_code: '',
                city_code: '',
                Agent_primary_email: '',
                fullobj: []
            },
            allocatedlist: [
            {
                text: 'Allocated',
                value: 'allocated'
            },
            {
                text: 'Un Allocated',
                value: 'unallocated'
            }],
            filterList: [
                // {text: 'Status', value: 'status'},
                // {text: 'Source', value: 'source'},
                // {text: 'Campaign', value: 'campaign'},
                // {text: 'Affiliate', value: 'affiliate'},
                {
                    text: 'State',
                    value: 'state'
                },
                // {text: 'City', value: 'city'},
                {
                    text: 'Is Allocated',
                    value: 'isallocated'
                },
            ],

            headers: [
                {
                    text:"Employee Code",
                    value:"employee_e_code"
                },
                {
                    text:"Employee Name",
                    value:"employeeName"
                },
                {
                    text: 'Designation',
                    value: 'Designation'
                },
                {
                    text: 'Branch Name',
                    value: 'Branch_Name'
                },
                {
                    text: 'Rank',
                    value: 'rank'
                },
                {
                    text: 'Renewed Policy',
                    value: 'Renewed_Policy_count'
                },
               
                {
                    text: 'Uploaded Date',
                    value: 'uploadedDate'
                },
                {
                    text: 'Final Score',
                    value: 'Final_Score'
                }
                // {text: 'Allocated to', value: 'allocated'},
                // {
                //     text: 'Action',
                //     value: 'action',
                //     sortable: false
                // }
            ],
            dummydata: [],
            popHeader: [
            {
                text: '',
                value: 'blank'
            },
            {
                text: 'First Name',
                value: 'Fname'
            },
            {
                text: 'Last Name',
                value: 'Lname'
            },
            {
                text: 'Agent ID',
                value: 'agentId'
            },
            {
                text: 'Reporting Manager',
                value: 'reportingManager'
            },
            {
                text: 'User Status',
                value: 'userStats'
            },
            {
                text: 'Open Leads',
                value: 'openLeads'
            }, ],
            leadData: [],
            errormsg: '',
        }
    },
    computed: {
        objmethod() {
            var self = this;
            // if (Array.isArray(this.custListData)) {
            //     return this.custListData.filter(function(cust) {
            //         return cust.client_id.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
            //             cust.primary_telephone.toString().toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
            //             cust.customer_first_name.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
            //             cust.customer_last_name.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
            //             cust.email_id.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
            //             cust.state_code.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
            //             cust.city_code.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
            //             cust.Agent_primary_email.toLowerCase().indexOf(self.value.toLowerCase()) >= 0
            //     });
            // }
            return {};
        },
        pages() {
            if (this.pagination.rowsPerPage == null ||
                this.pagination.totalItems == null
            ) return 0
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },
        agentObj() {
            // var self = this;
            // if (Array.isArray(this.allAgents)) {
            //     return this.allAgents.filter(function(agent) {
            //         //    console.log('Filter Lead', agent)
            //         return agent.first_name.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
            //             agent.last_name.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
            //             agent._id.toString().toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
            //             agent.reporting_manager.first_name.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
            //             agent.leadpopStatus.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
            //             agent.city.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0
            //     });
            // }
        }
    },
    watch: {

        // selec_emp_code(val){
        //     var val = val
        //         if(val == null || val == "" || val == undefined){
        //              return 'all'
        //         }
               
        // },  


        date(val) {
            this.partnerInfo.DOJ = this.formatDate(this.date)
        },
        date1(val) {
            this.customerformdata.nominee1dob = this.formatDate(this.date1)
        },
        date2(val) {
            this.customerformdata.nominee2dob = this.formatDate(this.date2)
        }
    },
    methods: {

        startsearch(){
           console.log('EMp code pt be eached is', this.selec_emp_code);
              this.get_kpi_dash_data(this.selec_emp_code, null);
        },

          /**
         * @author Khan Usama
         * @function handleFileUpload
         * @param {*} event
         * @description The function is based on conditions of pages which is indicated by el. it contains page no. like 1,2 and 3 etc.
         * In this page
         */

        handleFileUpload(event) {
                let self = this;
                let formData = new FormData();
                let Fileread = event.target.files[0]
                formData.append('media_upload', Fileread);


                const UPLOAD_API = this.API_Service_admin()+'v2/uploadFile';     // server API
                axios.post(UPLOAD_API, formData, {
                headers: {  'Content-Type': 'multipart/form-data' }
            })
                .then(function(res){
                if(res.data.errCode === -1){
                    let response = res.data.errMsg
                    self.profileimage = response.location
                    console.log("File Location ",self.profileimage);
                }
        
            })

            },

        openDialog() {
            this.dialog = true;
            this.partnerInfo = JSON.parse(JSON.stringify(initialPartnerInfoState));

            let _date_ = new Date();
            this.partnerInfo.partnerId = 'P'+_date_.getSeconds()+''+this.generateRandomCode().toUpperCase();
            console.log("Partner Popup", this.partnerInfo);
        },

        partnerCURD() {

            let formdata = {
                partnerId: this.partnerInfo.partnerId,
                partnerName: this.partnerInfo.partnerName,
                emailAddress: this.partnerInfo.EmailId,
                status: this.partnerInfo.status || true,
                gender: this.partnerInfo.gender,
                contactNo: this.partnerInfo.contactNo,
                addresss: this.partnerInfo.address,
                bankName: this.partnerInfo.bankName,
                latitude: this.partnerInfo.latitude,
                longitude: this.partnerInfo.longitude,
                joiningDate: this.partnerInfo.DOJ,
                channel_code: this.partnerInfo.channelName,
                csmId: this.partnerInfo.csmId,
                avatar : this.profileimage,
                adminId : this.getAgentInfo()._id
            };

            let self = this;
            let temp = self.dummydata.slice(0, self.dummydata.length);
            self.dummydata = [];

            switch(this.btnname) {
                case 'Add':
                    console.log("New Partner : hkshf" , formdata);
                    
                    this.POST('new_existing_partner', formdata, function(res, error) {
                        if (error) {
                            self.dialog = false;

                            return;
                        }
                        switch(res.data.errCode) {
                            case -1:
                            
                            let response = res.data.errMsg;
                            temp.push(self.reFormateData(response));
                            self.dummydata = temp.slice(0, temp.length).reverse();
                            self.dialog = false;
                            break;
                            case 4:
                            self.dialog = false;

                                break;
                        }
                    });
                    break;
                case 'Update':
                    break;
                default:
                    break;
            }
        },
        // fetchExistingPartners(channel = null) {

        //     let API = this.API_Service()+'fetch_existing_partners?access_by=admin&adminId='+this.getAgentInfo()._id+'&skip=0';
        //     if (Boolean(channel)) {
        //        API = API+'&channel_code='+channel;
        //     }
        //     let self = this;
        //     axios.get(API).then(res => {
        //         // console.log("Partner Response", res);
        //         let caseId = res.data.errCode;
        //         switch(caseId) {
        //             case -1:
        //                 self.dummydata = [];
        //                 let data = res.data.errMsg[0];

        //                 let collection = [];

        //                 for (let element of data) {
        //                     collection.push(self.reFormateData(element));
        //                 }

        //                 // console.log("Collection",collection);
        //                 self.dummydata = collection.slice(0, collection.length);
        //                 break;
        //             case 4:
        //                 self.showToast('Database Error', this.TOST().ERROR)
        //                 break;
        //             case 567:
        //                 self.showToast('Partners not found', this.TOST().INFO)
        //                 break;
        //         }
        //     }).catch(err => {
        //         console.log("error",err);
        //     });
        // },

        reFormateData(element) {
            console.log("Element Chek",element);
            return {
                addresss: Boolean(element.addresss) ? element.addresss : "-",
                avatar: element.avatar,
                bankName: Boolean(element.bankName) ? element.bankName : "-",
                channel_code: element.channel_code,
                contactNo: element.contactNo,
                createdBy: element.createdBy,
                createdDate: element.createdDate,
                csmId: element.csmId,
                emailAddress: Boolean(element.emailAddress) ? element.emailAddress : "-",
                gender: element.gender,
                joiningDate: Boolean(element.joiningDate) ? new Date(parseInt(element.joiningDate)).toLocaleDateString() : "-",
                latitude: element.latitude,
                longitude: element.longitude,
                partnerId: element.partnerId,
                partnerName: this.doSentenceCase(element.partnerName),
                status: element.status == true ? 'Active' : 'Inactive',
                color: element.status === true ? 'rgb(19, 150, 28)' : 'rgb(217, 59, 17)',
                updatedDate: new Date(parseInt(element.updatedDate)).toLocaleDateString(),
                _id: element._id
            }
        },

        resetCustFilters() {
            this.channeldatafilter = 'all';
            this.filterby = '';
            this.valueDrp = '';
            this.cityDrp = '';
            this.filterStruct = '';
            this.GetAllLeadData()
        },
        removeSelection() {
            this.custID = [];
            this.custIDLen = '0';
            // this.selected = []
            this.headCheck = false
            this.custID = [];
            // console.log('custListData',this.custListData)
            for (let i = 0; i < this.custListData.length; i++) {
                this.custListData[i].selected = false
            }
            this.showManual = false;
        },
        // @Change Event function for Popup Channel Dropdown List @author:Salman Shaikh
        getPopChannel(event) {
            console.log('Channel Event::', event)
            this.channelPopID = event;
            // this.getAllAgents(this.channelPopID)
        },
        // @Change Event function for Popup Table's Radio buttons for Agents @author:Salman Shaikh
        agentTable(_id, event) {
            // console.log('EVENT>>',event)
            console.log('_ID>>', _id)
            this.AgentID = _id;
            this.popTable = ''
            this.showAllocateBtn = true
        },
        GetAgentstate() {
            this.GETSTATE(res => {
                console.log("State", res)
                this.getState = res;
                for (let i = 0; i < this.getState.length; i++) {
                    let statedata = {
                        text: this.getState[i].region_data.name,
                        code: this.getState[i].region_data.adminCode1
                    }
                    this.StateListdata.push(statedata)
                }
            })
            console.log(this.StateListdata, "response mixin data")
        },
        // getAgentCity(ev){
        //         console.log("event ev>>", ev)
        //         let codes= this.agntStateList.filter(e=>{
        //             if(e.text === ev){
        //                 return e.code
        //             }
        //         })
        //         this.GETCITY(codes[0].code,resp=>{
        //             this.agentCityList = resp[0].cities
        //         })
        // },
        cityData(event) {
            // console.log("City event ", event)
            // console.log("city :>>", this.citypop)
            // console.log("State :>>", this.statepop)
            axios.get(this.API_Service_admin() + 'getbranch?branchfilter=All&created_by='+this.getAgentInfo()._id+'&skip=0&user_city=' + this.citypop + '&user_state=' + this.statepop)
                .then(res => {
                    console.log('Branch details', res.data.errMsg[0])
                    this.branchArray = [];
                    let branchArr = res.data.errMsg[0];
                    for (var i = 0; i < branchArr.length; i++)
                    {
                        let brdata = {
                            text: branchArr[i].branchName,
                            value: branchArr[i]._id,
                        }
                        this.branchArray.push(brdata)
                    }
                    //    console.log("Branch Array ==>>>",this.branchArray)
                })
        },
        getAllAgents() {
            // console.log("city :>>", this.citypop)
            // console.log("State :>>", this.statepop)
            // console.log("Channel :>>", this.channelPopID)
            this.popTable = '';
            // this.agntObj = [];
            this.showAllocateBtn = false;
            if (this.popState !== '') {
                this.GET('getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode=' + this.channelPopID + '&skip=0&user_state=' + this.statepop + '&user_city=' + this.citypop + '&user_branch=' + this.branchpop, res => {
                    res.data.errMsg[0].forEach(element => {
                        element.agentpopStatus = '';
                    });
                    console.log('All AGENT Resp', res.data.errMsg[0])
                    this.allAgents = res.data.errMsg[0]
                    this.showAlertext = true
                    for (var i = 0; i < this.allAgents.length; i++) {
                        if (this.allAgents[i].active === 1) {
                            this.allAgents[i].agentpopStatus = 'Active'
                        } else if (this.allAgents[i].active === 0) {
                            this.allAgents[i].agentpopStatus = 'InActive'
                        }
                    }
                })
            }
        },
        custTableCheck(user_ID, bool, ind) {
            // console.log('Cust USER ID:> ', user_ID)
            // console.log('Cust Bool :> ', bool)
            // console.log('cust INDEX:>  ', ind);
            this.custListData[ind].selected = bool;
            if (bool) {
                this.custIDLen++;
            } else {
                this.custIDLen--;
            }
            for (let i = 0; i < this.customerdataList.length; i++) {
                if (user_ID === this.customerdataList[i].client_id) {
                    if (bool) {
                        this.custID.push({
                            _id: this.customerdataList[i]._id
                        }); // push the Id in array if checked
                        this.showManual = true;
                        this.headCheck = true
                        console.log('Cust ID True', this.custID)
                    } else {
                        const index = this.custID.findIndex(list => list.client_id == user_ID); //Find the index of stored id
                        this.custID.splice(index, 1); // Then remove
                        console.log('Cust ID False', this.custID)
                        if (this.custID.length === 0) {
                            this.showManual = false
                            this.headCheck = false
                        }
                    }
                }
            }
            // this.custIDLen = this.custID.length
            // console.log('Cust ID LEn',this.custIDLen)
        },
        allocateLeads() {
            var allocID = this.custID
            console.log('Ag ID>>', this.AgentID)
            console.log('agent SelctId:>', allocID)
            // console.log('agentId:>',this.AgentID )
            if (allocID.length !== 0) {
                const manualLeadId = {
                    userId: this.getAgentInfo()._id,
                    Allocated_user_id: this.AgentID,
                    customer_ids: allocID,
                }
                axios.post(this.API_Service_admin() + 'manualAllocation_customer', manualLeadId).then(
                    res => {
                        var affiliateData = res.data.errMsg
                        console.log('manual Alloc:>>', res.data.errMsg)
                    }
                ).catch(err => {
                    console.log(err);
                });
            }
            this.showToast('Leads Allocated Successfully', 'success')
        },
        filterBY(e) {
            console.log('Filters>>', e)
            if (e === 'state') {
                this.filterByData = e;
                this.valueData = [];
                for (let i = 0; i < this.getState.length; i++) {
                    let value = {
                        text: this.getState[i].region_data.name,
                        code: this.getState[i].region_data.adminCode1
                    }
                    this.valueData.push(value);
                    // console.log('VAlue Data State',this.valueData)
                }
            } else if (e === 'isallocated') {
                this.filterByData = e;
                this.valueData = [];
                this.showCityDrop = false
                console.log("allocatged list", this.allocatedlist)
                for (let i = 0; i < this.allocatedlist.length; i++) {
                    let value = {
                        text: this.allocatedlist[i].text,
                        value: this.allocatedlist[i].value
                    }
                    this.valueData.push(value);
                    // console.log('VAlue Data Allocate',this.valueData)
                }
            }
        },
        valueDropdown(event) {
            console.log('VAlue Event:>', event)
            console.log("filterByData ", this.filterByData)
            this.filterStruct = '';
            if (this.filterByData !== 'state') {
                this.filterStruct = this.filterby + '|' + this.valueDrp;
                console.log("Filter Struct ", this.filterStruct)
                this.GetAllLeadData(this.channeldatafilter);
            } else {
                this.filterStruct = '';
                this.filterStruct = this.filterby + '|' + this.valueDrp
                console.log("Filter Struct ", this.filterStruct)
                this.GetAllLeadData(this.channeldatafilter)
                let codes = this.valueData.filter(e => {
                    if (e.text === event) {
                        return e.code
                    }
                })
                // console.log(" before if Event",event)
                this.cityDataDrp
                event === codes[0].text ? this.showCityDrop = true : '';
                this.GETCITY(codes[0].code, resp => {
                    // console.log("city ", resp[0].cities)
                    this.cityDataDrp = resp[0].cities
                })
            }
        },
        cityDropdown(e) {
            console.log('CITY DROP Event:>', e)
            this.filterStruct = '';
            this.filterStruct = this.filterby + '|' + this.valueDrp + '|' + this.cityDrp
            console.log("Filter Struct ", this.filterStruct)
            this.GetAllLeadData(this.channeldatafilter)
        },

        validAge(date) {
            this.calender = false
            let datevalue = moment(date).valueOf()
            console.log('Date', datevalue)
            let currentdate = Date.now()
            let datesub = moment(currentdate).subtract(18, 'years').format('MM-DD-YYYY');
            console.log('Subtract year', datesub)
            let convertsub = moment(datesub).valueOf()
            if (datevalue >= convertsub) {
                console.log('Your Age is Not 18')
                this.agetext = 'You are less than 18 years'
            } else {
                this.agetext = ''
            }
        },
        getoccupation() {
            this.GET('fetch_occupation?filter=0', resp => {
                if (resp.data.errCode === -1) {
                    let data = resp.data.errMsg[0];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].status === 1) {
                            let Ocuupationdetails = {
                                text: data[i].occupation,
                                value: data[i]._id,
                            }
                            this.OccupationList.push(Ocuupationdetails)
                        }
                    }
                    console.log("Occupation Data List", this.OccupationList)
                }
            })
        },


        /**
         * @author Khan Usama
         */
        createPartner() {

            console.log("FORMDATA", formdata)
            this.POSTUSER('addCustomer', formdata, res => {
                if (res.data.errCode == -1) {
                    this.showToast('Customer Added Successfully', this.TOST().SUCCESS)
                    this.GetAllLeadData('all');
                    this.dialog = false;
                } else {
                    this.showToast('Something went Wrong', this.TOST().ERROR)
                }
            })
        },
        Editcustomer(item, index) {
            console.log("The data to be eidted is =>", item)
            this.channeledit = true
            this.oneditonly = true;
            console.log(item, 'edited items')
            this.dialog = true;
            this.btnname = 'Update';
            this.customerformdata.clientId = item.fullobj.client_id,
                this.customerformdata.salutation = item.fullobj.salutation,
                this.customerformdata.firstname = item.fullobj.customer_first_name,
                this.customerformdata.middlename = item.fullobj.customer_middle_name,
                this.customerformdata.lastname = item.fullobj.customer_last_name,
                this.customerformdata.gender = item.fullobj.gender,
                this.customerformdata.Dob = item.fullobj.date_of_birth,
                this.customerformdata.nationality = item.fullobj.nationality,
                this.customerformdata.primarymobileno = item.fullobj.primary_telephone,
                this.customerformdata.secondarymobileno = item.fullobj.secondary_telephone,
                this.customerformdata.EmailId = item.fullobj.email_id,
                this.customerformdata.Address1 = item.fullobj.address_1,
                this.customerformdata.Address2 = item.fullobj.address_2,
                this.customerformdata.state = item.fullobj.state_code,
                this.customerformdata.city = item.fullobj.city_code,
                this.customerformdata.pincode = item.fullobj.pincode,
                this.customerformdata.income = item.fullobj.income,
                this.customerformdata.noofchildren = item.fullobj.no_of_children
            this.customerformdata.professiontype = item.fullobj.profession_type,
                this.customerformdata.occuepationcode = item.fullobj.occupation_code,
                this.customerformdata.nomineename1 = item.fullobj.nominee1_name,
                this.customerformdata.nominee1dob = item.fullobj.nominee1_dob,
                this.customerformdata.nomineename2 = item.fullobj.nominee2_name,
                this.customerformdata.nominee2dob = item.fullobj.nominee2_dob,
                this.customerformdata.martialstatus = item.fullobj.marital_status,
                this.customerformdata.recompdt1 = item.fullobj.recom_pdt_1_code,
                this.customerformdata.recompdt2 = item.fullobj.recom_pdt_2_code,
                this.customerformdata.Allocatetoagent = item.fullobj.allocatedToAgent.agent_id,
                this.customerformdata.channelName = item.fullobj.customerChannel._id,
                this.customerformdata.applicationcode = item.fullobj.application_code,
                this.CustomerId = item.fullobj._id,
                // this.customerformdata.applicationcode=
                this.cityfind(item.fullobj.state_code)
        },
        UPDATEcustomer() {
            let formdata = {
                client_id: this.customerformdata.clientId,
                salutation: this.customerformdata.salutation,
                customer_first_name: this.customerformdata.firstname,
                customer_middle_name: this.customerformdata.middlename,
                customer_last_name: this.customerformdata.lastname,
                gender: this.customerformdata.gender,
                date_of_birth: this.customerformdata.Dob,
                nationality: this.customerformdata.nationality,
                primary_telephone: this.customerformdata.primarymobileno,
                secondary_telephone: this.customerformdata.secondarymobileno,
                email_id: this.customerformdata.EmailId,
                address_1: this.customerformdata.Address1,
                address_2: this.customerformdata.Address2,
                state_code: this.customerformdata.state,
                city_code: this.customerformdata.city,
                pincode: this.customerformdata.pincode,
                income: this.customerformdata.income,
                no_of_children: this.customerformdata.noofchildren,
                profession_type: this.customerformdata.professiontype,
                occupation_code: this.customerformdata.occuepationcode,
                nominee1_name: this.customerformdata.nomineename1,
                nominee1_dob: this.customerformdata.nominee1dob,
                nominee2_name: this.customerformdata.nomineename2,
                nominee2_dob: this.customerformdata.nominee2dob,
                marital_status: this.customerformdata.martialstatus,
                recom_pdt_1_code: this.customerformdata.recompdt1,
                recom_pdt_2_code: this.customerformdata.recompdt2,
                allocatedToAgent: this.customerformdata.Allocatetoagent,
                customerChannel: this.customerformdata.channelName,
                proposalId: this.customerformdata.proposalId,
                admin_Id: this.getAgentInfo()._id,
                customerId: this.CustomerId,
            }
            console.log("FORMDATA", formdata)
            this.PUTUSER('updateCustomer', formdata, res => {
                if (res.data.errCode == -1) {
                    this.showToast('Customer Updated Successfully', this.TOST().SUCCESS)
                    this.GetAllLeadData('all');
                    this.dialog = false;
                } else {
                    this.showToast('Something went Wrong', this.TOST().ERROR)
                }
            })
        },
        cityfind(ev) {
            console.log("event ", this.StateListdata)
            let codes = this.StateListdata.filter(e => {
                if (e.text === ev) {
                    return e.code
                }
            })
            console.log("event filter", codes)
            this.GETCITY(codes[0].code, resp => {
                console.log("city ", resp[0].cities)
                this.Citylist = resp[0].cities
            })
        },
        // Vuetify code
        formatDate(date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        // Vuetify code
        parseDate(date) {
            if (!date) return null
            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        gotoLeadForm() {
            // Here, Store is clear before going to next page
            this.commit('SAVE_LEAD_RESPONSE', null);
            this.jump('/Lmaster/status');
        },
        toggleAll(e) {
            // console.log('Toggle Event',e)
            // console.log('V-MODEl ',this.headCheck)
            this.allCheckSelect = e
            this.showManual = true;
            this.selected = []
            this.custIDLen = 0;
            let temp = this.custListData.map(items => {
                if (e == true) {
                    this.custID = this.objmethod.slice()
                    console.log('SeleCTED', this.custID)
                    this.custIDLen++;
                } else {
                    this.custID = [];
                    console.log('Un SeleCTED', this.custID)
                    this.showManual = false;
                    this.custIDLen = 0;
                }
                items.selected = e;
                // this.allCheckSelect = items
                // console.log('ITEMS ',items)
                return items;
            });
            this.custListData = [];
            this.custListData = temp;
            temp = undefined;
        },
        changeSort(column) {
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
            } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
            }
        },
        deleteItem(item, index) {
            this.usrdetails.splice(index, 1)
        },
        getLeadData(id, callback = null) {
            axios.get(this.API_Service() + 'getlead_details/' + id).then(
                res => {
                    /**
                     * @author Khan Usama
                     * Date 9/3/2019
                     * @description Access lead by id
                     */
                    if (typeof(callback) == 'function') {
                        callback(res)
                        return;
                    }
                    //    ---------------------
                    console.log('GET USER REPONSE OF LEAD', res.data.errMsg)
                    // this.leaddatanew = res.data.errMsg
                    this.leadData = res.data.errMsg[0]
                    this.editItem(this.leadData, 0)
                    // for(var i =0 ;i< this.usrdetails.length;i++)
                    // {
                    //     this.TableName = this.usrdetails[i].firstName + this.usrdetails[i].lastName
                    // }
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
        },
        channelfilters(e) {
            console.log('data', e)
            this.page = 1
            this.channeldatafilter = e
            // this.fetchExistingPartners(this.channeldatafilter)
        },
        next(e) {
                console.log("Next was fired");
            this.selec_emp_code = ""
            let skipdata = e - 1
            console.log('data', skipdata)
            if (skipdata === 0) {
                this.skip = 0
            } else {
                this.skip = this.skipdiffrence * skipdata
            }
            // console.log('skip data', this.skip)
            this.get_kpi_dash_data('all',this.skip)
        },
        GetAllLeadData(e, skip) {
            console.log("User Id", this.getAgentInfo()._id)
            console.log("Event", e)
            console.log("Skip", skip)
            this.customerdataList = []
            let FILTER_API = this.API_Service() + 'v2/getCustomer?admin_id=' + this.getAgentInfo()._id;
            if (this.channeldatafilter === 'all') {
                if (Object.keys(this.filterStruct).length === 0) {
                    this.custListData = [];
                    FILTER_API = FILTER_API + '&skip=' + skip;
                    console.log(" TRUE Filter Api RESPONSE", FILTER_API)
                } else {
                    this.custListData = [];
                    FILTER_API = FILTER_API + '&skip=' + skip + '&filterBy=' + this.filterStruct;
                    console.log(" False Filter Api RESPONSE", FILTER_API)
                }
            } else {
                if (Object.keys(this.filterStruct).length === 0) {
                    this.custListData = [];
                    FILTER_API = FILTER_API + '&channelCode=' + e + '&skip=' + skip;
                    console.log(" Else IF Filter Api RESPONSE", FILTER_API)
                } else {
                    this.custListData = [];
                    FILTER_API = FILTER_API + '&channelCode=' + e + '&skip=' + skip + '&filterBy=' + this.filterStruct;
                    console.log("Else Api RESPONSE", FILTER_API)
                }
            }
            let self = this
            axios.get(FILTER_API).then(
                res => {
                    //    console.log("GET Policy DATA::==->", res);
                    if (res.data.errCode === -1) {
                        self.customerdataList = res.data.errMsg
                        console.log("GETCustomer API DATA ::==>", self.customerdataList);
                        for (var i = 0; i < self.customerdataList.length; i++) {
                            self.custdbStruct = {};
                            // self.leadListData = [];
                            self.custdbStruct.client_id = self.customerdataList[i].client_id;
                            self.custdbStruct.selected = false;
                            // console.log('LEAD NAME: >',self.custdbStruct.name)
                            self.custdbStruct.customer_first_name = self.checkValidity(self.customerdataList[i].customer_first_name)
                            self.custdbStruct.customer_last_name = self.checkValidity(self.customerdataList[i].customer_last_name)
                            self.custdbStruct.primary_telephone = self.checkValidity(self.customerdataList[i].primary_telephone)
                            self.custdbStruct.email_id = self.checkValidity(self.customerdataList[i].email_id)
                            self.custdbStruct.state_code = self.checkValidity(self.customerdataList[i].state_code)
                            self.custdbStruct.city_code = self.checkValidity(self.customerdataList[i].city_code)
                            // self.custdbStruct.appcode = self.customerdataList[i].application_code
                            self.customerformdata.applicationcode = self.customerdataList[i].application_code === null ? '-' : self.customerdataList[i].application_code;
                            self.custdbStruct.Agent_primary_email = self.customerdataList[i].allocatedToAgent === null ? '-' : self.customerdataList[i].allocatedToAgent.primary_email;
                            self.custdbStruct.fullobj = self.customerdataList[i]
                            // console.log('LEAD LISTIIII: >',self.custdbStruct)
                            //new variable for application code => customerformdata.applicationcode
                            self.custListData.push(self.custdbStruct)
                            // console.log('Customer LIST: >',self.custListData)
                        }
                        console.log("Application Code from GET CUST is =>", self.custListData)
                        var pageLen = res.data.errMsg[1]
                        let totalCount = pageLen[0].totalCount
                        console.log('Page Length:', totalCount)
                        self.pageLength = Math.ceil(totalCount / self.skipdiffrence)
                        // console.log("getting CUSTOMER data for table::=>", self.customerdataList);
                    }
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );
        },
        checkValidity(data) {
            // console.log('Validity Data', data);
            if (data == "" || data == "undefined" || data == null || data == '' || data == 'Invalid Date') {
                return "-"
            } else {
                return data;
            }
        },
        Searchdatatable(e) {
            console.log("e data", e)
            this.value = e;
        },
        searchAgentCust(search) {
            console.log("Search", search)
            this.agentSearch = search;
        },

        goback(){
               console.log("goback called on previous BEFORE=>", this.steps);
                this.steps = 1;
                console.log("goback called on previous after=>", this.steps)
        },

        goNext() {
            // alert('firing post api');
            // console.log("Data is",JSON.parse(this.bulkData))
            // let datanew = JSON.parse(this.bulkData)
            // let temarray=[]
            // for(let i=0;i<datanew.length ; i++){
            //     if(datanew[i].firstName !== "" || datanew[i].lastName !== "" || datanew[i].primaryMobile !== "" || datanew[i].email !== "" || datanew[i].city !== "" || datanew[i].state !== "" || datanew[i].leadStatus !== "" || datanew[i].leadDisposition !== "" || datanew[i].LeadSubDisposition !== "" || datanew[i].start_time !== "" || datanew[i].start_date !== "" || datanew[i].remarksfromSource !== "" || datanew[i].remarksfromUser !== "" || datanew[i].leadOwnerId !== "" || datanew[i].leadCreatorId !== "" ){
            //         temarray.push(datanew[i])
            //     }else{
            //     }
            // }
            // console.log('temp array final data',temarray)

            if( this.bulkData.length == 0){
                this.showToast('KPI Sheet is empty', this.TOST().ERROR);
                return
            }else if(this.datemonth == '' || this.datemonth == null || this.datemonth == undefined){
                 this.showToast('Please select a month to continue', this.TOST().ERROR);
                return

            }

            const formData = {
                userId:this.getAgentInfo()._id,
                kpiJSON: this.bulkData,
                month: moment(this.datemonth).format('MMMM'),
                year: moment(this.datemonth).format('YYYY')
            };

            console.log("FormData before sending is", formData);
           
            this.showLoader('Uploading', true);
            let self = this;

            this.POST('kpi_sheet', formData, (res, err) => {
             
                    if (res.data.errCode == -1) {
                        console.log("Download link",res.data.errMsg);
                        self.showToast('File uploaded successfully', self.TOST().SUCCESS);
                        self.steps = 2
                        self.sucessCount = res.data.errMsg.success
                        self.failCount = res.data.errMsg.failed
                        self.errorLink = res.data.errMsg.link
                        this.showLoader('Uploading', false);
                    }
                    else if (res.data.errCode == 4)
                    {
                        self.showToast('Database Error', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                    }
                    else if (res.data.errCode == 510)
                    {
                        self.showToast(' User not found', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                    }
                    else if (res.data.errCode == 430)
                    {
                        self.showToast('Request body is empty', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                    }
                    else if (res.data.errCode == 303)
                    {
                        self.showToast('Agent id is invalid', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                    }
                    else if (res.data.errCode == 343)
                    {
                        self.showToast('JSON format invalid', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                    }
                    else
                    {
                        self.showToast('Error while uploading Customer Data', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                    }
                    // Error while uploading Customer Data
                })
        },
        cancelStepper() {
            this.dialogBulkUpld = false
            this.channeldatafilter = 'all'
            this.GetAllLeadData(this.channeldatafilter);
            this.steps = 1
        },
        openwindow() {
            this.bulkData = []
            this.dialogBulkUpld = true
            this.sucessCount = 0
            this.failCount = 0
            this.excelfilename = ''
            fileUpload = null
            this.steps = 1
            this.errorLink = 'Link Comes Here'
            this.fileLink = ''
        },
        get_kpi_dash_data(incomeingdata ,skip){
            // getkpi
            // alert('getting all agents');
            // http://172.16.57.33:2030/secure/admin/fetch_kpi_data/5d80e7f584dfaa4a37a6b722
            var get_kpi_data
            var incoming = incomeingdata == 'all' || incomeingdata == null || incomeingdata == undefined || incomeingdata == "" ? 'all' : this.selec_emp_code

            console.log('INCOMING IS ->', incoming)

            if(incoming == 'all'){
                get_kpi_data = 'fetch_kpi_data/'+this.getAgentInfo()._id+'?skip='+skip
            }else{
                 get_kpi_data = 'fetch_kpi_data/'+this.getAgentInfo()._id+'?emp_code='+this.selec_emp_code
            }
              
            this.GET(get_kpi_data, res => {
                // console.log('Response Data is ->', res.data.errMsg);
                 this.dummydata = []
                var resdata = [];
                resdata = res.data.errMsg[0];
                  var pageLen = res.data.errMsg[1]
                  let totalCount = pageLen[0].count
                  console.log('Page Length:->',totalCount );
                  this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                // console.log('resdata is ->',resdata);
                var reslen = resdata.length
                for(let i=0; i<reslen; i++){
                        this.kpitable = {
                                employee_e_code: resdata[i].employee_e_code,
                                employeeName: resdata[i].employeeName,
                                Designation:resdata[i].Designation,
                                Branch_Name:resdata[i].Branch_Name,
                                rank: resdata[i].rank,
                                Renewed_Policy_count: resdata[i].Renewed_Policy_count,
                                uploadedDate:new Date(parseInt(resdata[i].uploadedDate)).toLocaleDateString(),
                                Final_Score:resdata[i].Final_Score            
                        }
                    this.dummydata.push(this.kpitable)
              }
             })
               
       
                  
                    
            console.log("dummydata for table is ->", this.dummydata);


            //   })

        },

        jsonupload(e) {
            console.log("Event is", e)

            console.log('File Name======>>>', e.target.files[0].name)
            var me = this
            
            
            //Reference the FileUpload element.
            fileUpload = document.getElementById("fileUpload");
            console.log("File is", fileUpload)
            //Validate whether File is valid Excel file.
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
            if (regex.test(fileUpload.value.toLowerCase())) {
                if (typeof(FileReader) != "undefined") {
                    //getting the excel file name 
                    me.excelfilename = e.target.files[0].name
                    var reader = new FileReader();
                    //For Browsers other than IE.
                    if (reader.readAsBinaryString) {
                        //For NON IE Browser.
                        reader.addEventListener('load', (e) => {
                            this.ProcessExcel(e.target.result)
                        })
                        reader.readAsBinaryString(fileUpload.files[0])
                    }
                    else {
                        //For IE Browser.
                        reader.addEventListener('load', (e) => {
                            var data = "";
                            var bytes = new Uint8Array(e.target.result);
                            for (var i = 0; i < bytes.byteLength; i++) {
                                data += String.fromCharCode(bytes[i]);
                            }
                            this.ProcessExcel(data);
                        })
                        reader.readAsArrayBuffer(fileUpload.files[0]);
                    }
                }
                else {
                    me.showToast("This browser does not support HTML5.", "error");
                }
            } else {
                me.showToast("Please upload a valid Excel file.", "error", );
            }
        },
        ProcessExcel(data) {
           
            //Read the Excel File data.
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
           
            var first_sheet_name = workbook.SheetNames[0];

            //  console.log("execel result is =>", workbook);

            // var sheet_len = workbook.SheetNames.length

         
            //  this.exdata = []
            // for(let i=0; i < sheet_len ; i++){
            //        this.exdata.push(XLSX.utils.sheet_to_csv((workbook.Sheets[workbook.SheetNames[i]])).split("\n"))
            // }
            // // console.log('all sheet data->', all_sheets_data);
        

            // console.log('sheet to csv result ->', this.exdata);
            // // var exdata_len = this.exdata.length
            // // var single_lined_data = []

            // // for(let j=0; j<exdata_len; j++){
            // //      single_lined_data.push(this.exdata[j].split("\n"));
            // // }
            // // console.log("Single lined data is - >", single_lined_data);
            // return
            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
            //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
            //        raw: true
            //}));
            //  workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            var excelData = []
            excelData = XLSX.utils.sheet_to_csv(worksheet);
            // var json_object = JSON.stringify(XL_row_object);
            // console.log(excelData);
            var lines = excelData.split("\n");
            var result = [];
            var headers = lines[0].split(",");
            // console.log('Lines are', lines)
            for (var i = 1; i < lines.length - 1; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                for (var j = 0; j < currentline.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
          
            this.showToast('File Uploaded Successfully', 'success')
            let Str = JSON.stringify(result)
            // console.log("Final JSON Result:::::::",Str);
            //   let StrParse = JSON.parse(Str)
            this.bulkData = Str
              console.log("BULK JSON is ->", this.bulkData);
        },
    }
}
</script>

<style scoped>

.picit .v-date-picker-table table{
        width: 200px;
        height: 29px;
        /* border:2px greenyellow solid; */
}
.picit .v-date-picker-table--month td{
         height: 46px;
}

.picit .v-date-picker-header{
     width: 210px;
}
.picit{
    display: flex;
    justify-content: flex-end;
}

/* .picit .v-btn{
    
    padding: 0px 10px;
} */

 .selectedmon{

     font-family: roboto;
     font-weight: 700;
     letter-spacing: 0.2px;
     font-size: 16px;
     color:#01b4bb;

 }

 .sd-img-btn-size {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }


.media-pos {
        position: absolute;
        top: 127px;
    }

.thebtn{
      display:flex;
     align-items:center;
     color:white;
     border-radius:5px;
     font-size:15px;
    }

.thebtn2{
    display:flex;
    align-items:center;
    justify-content:center;
     color:white;
     font-size:12px;
}

    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }
    .btn-size{
        width: 1000px
}
.fileContainer-bulk {
    overflow: hidden;
    position: relative;
}

.fileContainer-bulk [type=file] {
    cursor: inherit;
    display: block;
    font-size: 999px;
    filter: alpha(opacity=0);
    /* min-height: 100%;
    min-width: 100%; */
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
}

/* Example stylistic flourishes */

.fileContainer-bulk {
    background-color:#1976d2 ;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        /* height: 10px; */
}

.fileContainer-bulk [type=file] {
    cursor: pointer;
}
.aloc-btn{
    display: flex;
    width: 230px;
    flex-direction: row;
}
 @media screen and (min-width: 320px){
         .margin-t30{
             margin-top: 30px;
         }
            .upload-text{
             font-size:14px;
             color:#FDFEFF;
             font-weight: 500
         }
            .fileContainer-bulk {
            width:155px;
            display: inline-flex;
            border-radius: 2px;
            margin-top: 6px;
            height: 37px;
            position: relative;
            cursor: pointer;
        }

     }


</style>
