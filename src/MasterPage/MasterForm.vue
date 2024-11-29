<template>
    <v-app>
       <!-- <v-content> -->
            <v-card>
            <v-layout row wrap >
                <v-card flat style="width:100%;">
                  <v-layout class="pt-4 pl-3 pr-3 bgclrsrc" >
                     <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                                <v-select v-model="channeldatafilter" 
                                    :items="channeldataall"  
                                    item-text="text"   
                                    item-value="value"  
                                    label="Channel"
                                    @change="channelfilters">
                                </v-select>                            
                     </v-flex>
                     <v-flex></v-flex>
                     <v-btn  depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addbranch">
                                    add Branch
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn>
                            <v-menu transition="slide-y-transition" >
                                <v-btn  depressed medium slot="activator" color="secondary" @click="openwindow" class="white--text thebtn">
                                    Bulk Upload
                                    <v-icon dark right>publish</v-icon>
                                </v-btn>
                            </v-menu>

                               
                            <v-flex xs10 sm6 md2 class="ml-3">
                                <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                height="30px"></v-text-field>                            
                            </v-flex>
                    </v-layout>
                </v-card>  
    <!-- <v-card flat class="pt-3"> -->
                    <v-flex class="ml-3 mr-3" style="flex-flow:column wrap;width:98%;">
                    
                    <!-- <v-text class="mt-4 headline font-weight-bold">Branch Master</v-text> -->
            <v-dialog v-model="dialogBulkUpld" persistent max-width="700px">
                <v-card>
                    <v-flex style="background-color:#3a3a3a">
                        <v-card-title class="subheading" style="color:white;justify-content:space-between;" >Upload File
                            <v-icon dark @click="dialogBulkUpld = false">clear</v-icon>
                        </v-card-title>
                    </v-flex>

                    <v-card-text>
                    <v-container grid-list-md>
                        <v-stepper v-model="steps">
                            <v-stepper-header>
                            <v-stepper-step   step="1">Upload Data</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step  :complete="steps > 1" step="2">Status</v-stepper-step>
                            </v-stepper-header>

                            <v-stepper-items>
                            <v-stepper-content step="1">
                                    <v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
                                    <v-layout >
                                        <v-flex  class="fileContainer-bulk  mt-6">
                                    <v-text class="upload-text">UPLOAD FILE</v-text>
                                        <v-icon right dark>publish</v-icon>
                                <input type="file"
                                id="fileUpload"
                                @change="jsonupload">
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
                                                <div class="font-weight-medium body-2 "> Selected File: </div>
                                                <div class="body-1 font-weight-regular font-italic">{{fileLink}}</div>
                                            </v-layout>
                                        </div>
                                    </v-layout>
                                <v-layout mt-3 justify-space-between>
                                        <!-- <a href="../../../web/assets/LeadSampleFile.xlsx" download> -->
                                        <a href="https://image-upload-bucket-2019.s3.ap-south-1.amazonaws.com/dcd969307c0c51278111b9cd6e870ee513c68b6c.xlsx" download>
                                        <v-btn color="primary">sample file
                                            <v-icon right dark>save_alt</v-icon>
                                        </v-btn>
                                        </a>
                                        <v-btn color="primary" v-if="nextbuttonhide === true" @click="goNext()">Next <v-icon class="ml-2" size="20px">arrow_forward</v-icon></v-btn>
                                        <v-btn disabled color="primary" v-else >Next <v-icon class="ml-2" size="20px">arrow_forward</v-icon></v-btn>

                                </v-layout>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                    <v-flex xs12 sm12 md12 style="display:flex;align-items:center">
                                        <v-icon large color="success">check_circle_outline</v-icon>
                                        <v-text class="subheading font-weight-medium ml-3"> {{sucessCount}} Users  Data successfully Uploaded</v-text>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12 mt-3 style="display:flex;align-items:center">
                                        <v-icon large color="error">highlight_off</v-icon>
                                        <v-text class="subheading font-weight-medium ml-3">Errors Found in {{failCount}}  Users Data</v-text>
                                    </v-flex>
                                    <v-flex mt-3>
                                        <v-text class="subheading font-weight-medium ml-1">Failed Data:</v-text>
                                        <a :href ="errorLink" download>{{ipdata}}</a>
                                    </v-flex>
                                <v-card-actions style="justify-content:flex-end;">
                                <v-layout mt-5 justify-space-between>
                                    <v-btn color="primary" @click="steps =1 " ><v-icon class="mr-2">arrow_back</v-icon>Previous</v-btn>
                                    <v-btn color="primary" @click="closepopup()">Close <v-icon class="ml-2" size="20px">clear</v-icon></v-btn>
                                </v-layout>
                                </v-card-actions>
                            </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </v-container>
                </v-card-text>
            </v-card>
            </v-dialog>
                        
                    <v-flex justify-center md11 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">Branch Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="objmethod"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <!-- <td class="">{{props.item.channel}}</td> -->
                            <td class="">{{props.item.channelCode.channelName}}</td>
                            <td class="">{{props.item.branchRadius}}</td>
                            <td class="">{{props.item.branchCode}}</td>
                            <td class="">{{props.item.branchName}}</td>
                            <!-- <td class="">{{props.item.bankm_id.bankName}}</td> -->
                            <td class="">{{props.item.Area}}</td>
                            <td class="">{{props.item.cityName}}</td>
                            <td class="">{{props.item.stateName}}</td>
                            <td class="">{{props.item.regionName}}</td>
                            <td class="">{{props.item.zoneName}}</td>
                            <!-- <td class="">{{props.item.zoneName}}</td> -->
                            <td class="">{{props.item.l}}</td>
                            <td class="">{{props.item.Logitude}}</td>
                            <td class=""> <span class="status" :style="{color: props.item.statusSelected == 'Active' ? '#13961c' : '#d61111'}"> {{props.item.statusSelected}} </span> </td>
                            
                            <td class="justify-center layout px-0">
                                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                                <!-- <v-icon small @click="deleteItem(props.item)">delete</v-icon> -->
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>

                    <v-dialog v-model="dialog" persistent max-width="800px">

                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                    <v-card-text>
                            <form @submit.prevent="save()">
                        <v-container grid-list-md>
                            <v-layout wrap>
                            
                            <v-flex xs12 sm6 md6>
                                <!-- <v-text-field v-model="editedItem.subChannel" label="Channel Code"></v-text-field> -->
                                <v-select :readonly="chread" :disabled="chread" v-model="editedItem.subChannel" @change="setchannel" :items="channeldata"  item-text="text" item-value="value" label="Channel Name"></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6> 
                                <v-select v-model="editedItem.branchradius" :items="radiusbranch" label="Set Branch Radius"></v-select>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field counter="50" maxlength="50" v-model="editedItem.branchName" label="Branch Name"
                                 @change="call_branch_valid(editedItem.branchName, 4 , 'branchName')"
                                 @input="$v.editedItem.branchName.$touch()"
                                 @blur="$v.editedItem.branchName.$touch()"
                                 :error-messages="branchErrors"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                 @change="call_branch_valid(editedItem.branchCode, 5 , 'branchCode')"
                                 v-model="editedItem.branchCode" label="Branch Code"
                                 @input="$v.editedItem.branchCode.$touch()"
                                 @blur="$v.editedItem.branchCode.$touch()"
                                 :error-messages="codeErrors"
                                ></v-text-field>
                            </v-flex>
                        
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.stateName" :items="stateList" @change="getAgentCity" autocomplete label="State Name"
                                  @input="$v.editedItem.stateName.$touch()"
                                  @blur="$v.editedItem.stateName.$touch()"
                                  :error-messages="stateerrors" ></v-select>
                                
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.cityName" :items="cityList"  item-text="asciiname" autocomplete label="City Name"
                                  @input="$v.editedItem.cityName.$touch()"
                                  @blur="$v.editedItem.cityName.$touch()"
                                  :error-messages="cityerrors"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field counter="50" maxlength="50" v-model="editedItem.Area" label="Area"
                                  @input="$v.editedItem.Area.$touch()"
                                  @blur="$v.editedItem.Area.$touch()"
                                  :error-messages="areaerrors"
                                  @change="call_branch_valid(editedItem.Area, 4 , 'Area')"
                                ></v-text-field>
                            </v-flex>

                              <!-- @input="$v.editedItem.Area.$touch()"
                                @blur="$v.editedItem.Area.$touch()"
                                 :error-messages="areaErrors" -->
                            
                             <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.regionName" label="Region Name"></v-text-field>
                            </v-flex> -->
                             <v-flex xs12 sm6 md6>
                                <v-text-field 
                                  @change="call_branch_valid(editedItem.zoneName, 5 , 'zoneName')"
                                  counter="50" maxlength="50"  v-model="editedItem.zoneName" label="Zone Name"></v-text-field>
                            </v-flex>

                              <v-flex xs12 sm8 m8>
                                <v-text-field 
                                  @change="call_branch_valid(editedItem.branchAdd, 1 , 'branchAdd')"
                                  id="autocomplete" v-model="editedItem.branchAdd" label="Enter Full Address"  @focus="getinput"></v-text-field>
                            </v-flex>

                               <v-flex xs12 sm4 md4>
                                <v-btn depressed large color="secondary" @click="getLocationAdd(editedItem.branchAdd)">Get Co-ordinates
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                            </v-flex>
                            <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.zoneName" label="Zone Name"></v-text-field>
                            </v-flex> -->
                            <!-- <v-flex>
                                 <v-select v-model="" :items="itemsBank"  item-text="text" item-value="value" label="Channel"></v-select>
                            </v-flex> -->
                            <v-flex xs12 sm6 md6>
                                 
                                <v-text-field v-model="editedItem.Lattitude" type='number' label="Branch Location Latitude"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Logitude" type='number' label="Branch Location Logitude"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6 >
                                <!-- <p>Status</p> -->
                                <v-select 
                                 @change="selectStatus()" v-model="editedItem.statusSelected" :items="status"  item-text="text" label="Status" 
                                 @input="$v.editedItem.statusSelected.$touch()"
                                 @blur="$v.editedItem.statusSelected.$touch()"
                                 :error-messages="statusErrors"
                                >Status</v-select>
                                <!-- <v-overflow-btn @change="selectStatus()" v-model="editedItem.statusSelected" :items="status" label="Status" target="#dropdown-example"></v-overflow-btn> -->
                            </v-flex>

                            <!-- <v-flex xs12 sm6 md6 >
                               <v-select :items="bankdata" v-model="editedItem.bankcode" item-text="text" label="Bank Branch" item-value="value"></v-select>
                               
                            </v-flex> -->
                             <!-- @change="setvalue(branchid)" -->
                           <!-- // New drop down box -->
                          
                            </v-layout>
                        </v-container>
                            </form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close(comment1)">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn  :disabled="disbrbtn"  depressed large color="secondary" @click.native="save">{{formTitle}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>

                        <!-- <v-btn> {{this.branchid}}</v-btn> -->

                    </v-card-actions>
                    </v-card>
                    </v-dialog> 

                </v-flex>    
            </v-layout> 
            <div class="text-xs-center pagination">
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination>
                    </div>  

            </v-card>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 
import state from '../common/stateList'
import { required, minLength,  maxLength, between,email } from 'vuelidate/lib/validators'
import loadChannel from '../common/onProjectLoad.js'
import {
    STATES,
    CITIES } from '../Page/ActivityUpload/leadCreate/data-lib.js'
    var fileUpload = null;
export default {
    created(){
        this.$store.commit('SET_PAGE_TITLE','Branch Master');
        // var stList = state.State
        //   console.log("State List",this.stateList)
        //   for(var i =0;i<stList.length;i++)
        //   {
        //       this.stateList.push(stList[i].State)
        //   }
            loadChannel.getChannel(this, res => {
                    console.log("mixin channel data" ,  res)
                    let channelalldata=[]
                    for(let i =0;i<res.length;i++){
                            
                        if(res[i].active === 1){
                            let channetobj ={
                                text:res[i].channelName,
                                value:res[i]._id
                                
                            }
                            this.channeldata.push(channetobj)  
                            this.channeldataall.push(channetobj)
                        }

                    }
                    let alldata={
                                text:'All',
                                value:'all',
                            }
                        
                        this.channeldataall.unshift(alldata)
                })
            this.channeldatafilter = 'all'
         this.getBranchMaster(this.channeldatafilter);  

        //    GET CHANNEL DATA
        this.channelData = this.$store.getters.getChannelData
        console.log("Channel Data",this.channelData)
        

        this.GetAgentstate();
        
    },

    mounted(){
        this.headers.map(e =>{
                    e.sortable = false;
            })
        var me = this
        this.geocoder = new google.maps.Geocoder();
              var input = document.getElementById('autocomplete');
              
      var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.addListener('place_changed', function() {
                var place = autocomplete.getPlace();
                 var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
          console.log(address," Real Address")
          me.editedItem.branchAdd = address
            })
        // This Function is used to Get branch data with pagination.
    //   this.GetBranchdata(this.branchskip)
            
    },

    validations: {
     editedItem: {
        branchName: {
        required,
         minLength: minLength(2),
      },
      branchCode:{
          required,
          minLength: minLength(2)
      },
      statusSelected:{
          required,
          minLength: minLength(2),
      },
      Area:{
          required,
          minLength: minLength(2),
      },
      zoneName:{
          required,
          minLength:minLength(2),
      },
        stateName:{
          required, 
      },
       cityName:{
          required,
      }

},
},

    data(){
        return{
            chread:false,
            disbrbtn:false,
            ipdata:"",
            // edited:{
                
            // },
            // selected:false,
            nextbuttonhide:false,
            STATES,
            CITIES,
            stateList:[],
            cityList:[],
             pageLength:0,
            page:1,
            skip:0,
            skipdiffrence:this.paginationdiff(),
            channeldatafilter:'all',
            
            Branchdata:[],
            channeldataall:[],
            channelData:[],

             bankStore:[],
            itemsBank:[],
            Bchanneldata:[],
            bankdata:[],
            selectedbankdata2:[],
            branchid:'',
            modelid:null,
            bulkData:[],
            sucessCount:0,
            failCount:0,
            errorLink:'Link Comes Here',
            fileLink:'',
            excelfilename:'',
            dialogBulkUpld:false,
	        steps:null,
            branchResponse:[],
            channeldata:[],
            value:'',
            postBranchData:{},
            dialog: false,
            radiusbranch:["N/A","25 meters","50 meters","100 meters"],
            headers:[
                        {text: 'Channel', value: 'subChannel'},
                        {text:'BranchRadius',value:'BranchRadius'},
                        // {text: 'Branch Name', value: 'branchName'},
                        {text: 'Branch Code', value: 'branchCode'},
                        {text: 'Bank Branch', value: 'bankcode'},
                        {text: 'Area', value: 'Area'},
                        {text: 'City Name', value: 'cityName'},
                        {text: 'State Name', value: 'stateName'},
                        {text: 'Region Name', value: 'regionName'},
                        {text: 'Zone Name', value: 'zoneName'},
                        {text: 'Latitude', value: 'Latitude'},
                        {text: 'Longitude', value: 'Longitude'},
                        {text: 'Status', value: 'status'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
                tableData: [],
                editedIndex: -1,
                editedItem: {
                    
                    subChannel:'',
                    branchName:'',
                    branchCode:'',
                    Area:'',
                    cityName:'',
                    stateName:'',
                    regionName:'',
                    zoneName:'',
                    statusSelected:'',
                    Logitude:'',
                    Lattitude:'',
                    branchRadius:'',
                    bankcode:'',
                    branchAdd:''
                    // status:''
                },
                
                defaultItem: {
                    subChannel:'',
                    branchName:'',
                    branchCode:'',
                    Area:'',
                    cityName:'',
                    stateName:'',
                    regionName:'',
                    zoneName:'',
                    statusSelected:'',
                     Logitude:'',
                    Lattitude:'',
                    branchRadius:'',
                    bankcode:'',
                    branchAdd:''
                    // status:''
                    
                },
                getStatus:'',
                lat1 :'',
                lng1:'',
                
                statusIndex:'',
                status:['InActive','Active'],
              
                
        }
    },

    computed:{
        objmethod() {
        
       
    	 var self=this;
       return this.branchResponse.filter(function(cust){return cust.branchName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        //  || cust.branchRadius.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.branchCode.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.channelCode.channelName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.Area.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.cityName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.stateName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.regionName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.zoneName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        //  || cust.l.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        //  || cust.Logitude.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         });
      
    },
    formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
    popupTitle(){
            return this.editedIndex === -1 ? 'New Branch' : 'Edit Branch'
        },
    branchErrors () {
      const errors = []
      if (!this.$v.editedItem.branchName.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.branchName.required && errors.push('Branch Name is required.')
      return errors
    },

    
    stateerrors() {
      const errors = []
      if (!this.$v.editedItem.stateName.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.stateName.required && errors.push('State is required.')
      return errors
    },

    cityerrors() {
      const errors = []
      if (!this.$v.editedItem.cityName.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.cityName.required && errors.push('State is required.')
      return errors
    },
    
    areaerrors () {
      const errors = []
      if (!this.$v.editedItem.Area.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.Area.required && errors.push('Area is required.')
      return errors
    },

    codeErrors () { 
      const errors = []
      if (!this.$v.editedItem.branchCode.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.branchCode.required && errors.push('Branch-Code is required.')
      return errors
    },
       statusErrors () {
      const errors = []
      if (!this.$v.editedItem.statusSelected.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.statusSelected.required && errors.push('Status is required.')
      return errors
    },

        areaErrors(){
        const errors = []
        if (!this.$v.editedItem.Area.$dirty) return errors
            //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
        !this.$v.editedItem.Area.required && errors.push('Area is required.')
        return errors  

        }
    },


    methods:{

        call_branch_valid(data, type, field){

                var self = this                
                this.validate_alpha_numeric(data, type, (res, datanew)=>{
                    if(res == true){     
                        self.editedItem[field] = datanew
                        self.$forceUpdate();
                        return
                    }
                })
        },



        callfunction(){
                 this.showToast('function called from validations', this.TOST().WARNING);
        },

        closepopup(){
        let me = this
        me.bulkData = []
        me.dialogBulkUpld = false
        me.excelfilename = ''

        console.log("BULK DATA CHECK",me.bulkData)
        },
        // changeState(event){
        //     console.log("Evebt",event)
        //    let cityArray =[]
        
        //    var ST = state.State
        //       console.log(ST,"Full List")
        //     let varientArray= ST.filter(e=>{
        //     if(e.State === event){
        //         console.log("matched")
        //         return e.Cities;
        //     }
        // })
        // console.log("Filter City",varientArray[0].Cities)
        // this.cityList = varientArray[0].Cities
        // },
        cancelStepper(){
                    this.dialogBulkUpld = false

                    // this.channeldatafilter = 'all'
                    // this.GetAllLeadData(this.channeldatafilter);
                    this.steps =1
                },
        openwindow(){

            let me = this
                    document.getElementById("fileUpload").value="";
                    // console.log("Files Clear",me.excelfilename);
                    // console.log("check data",this.bulkData);
                    me.bulkData=[]
                    me.dialogBulkUpld = true
                    me.sucessCount=0
                    me.failCount=0
                    me.excelfilename = ''
                    fileUpload = null
                    me.steps = 1

                    me.errorLink='Link Comes Here'
                    me.fileLink=''
                },
                goNext(){
                    
                const formData={
                    branches:this.bulkData
                    }
                // const formData={
                //     "CHANNEL_CODE": "CH1",
                //     "BRANCH_RADIUS": "",
                //     "BRANCH_NAME": "Axix Malad",
                //     "BRANCH_CODE": "40595",
                //     "STATE": "",
                //     "CITY": "",
                //     "AREA": "",
                //     "ZONE_NAME": "",
                //     "LATITUDE": "",
                //     "LONGITUDE": ""
                    
                // }

                this.POST('branch_bulk/'+this.getAgentInfo()._id, formData,res=>{
                if(res.data.errCode==-1)
                {
                    this.showToast('File uploaded successfully', this.TOST().SUCCESS);
                    this.steps = 2
                    this.sucessCount = res.data.errMsg.success
                    this.failCount = res.data.errMsg.failed
                    this.errorLink = res.data.errMsg.link

                    this.ipdata = this.errorLink.substring(this.errorLink.indexOf("download/") + 9);;
                     
                }
                else if(res.data.errCode==510)
                {
                    this.showToast('User not found', this.TOST().ERROR);
                }
                else if(res.data.errCode==4)
                {
                    this.showToast('Database Error', this.TOST().ERROR);
                }
                else if(res.data.errCode==343)
                {
                    this.showToast('Please upload a valid file.', this.TOST().ERROR);
                }
                else if(res.data.errCode==430)
                {
                    this.showToast('Request body is empty', this.TOST().ERROR);
                }
            })
                },
        jsonupload(e) {
            console.log("Event is",e)
            console.log('File Name======>>>',e.target.files[0].name)

            var me = this
            me.excelfilename= e.target.files[0].name
        //Reference the FileUpload element.
        fileUpload = document.getElementById("fileUpload");
        console.log("File is",fileUpload)

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
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
                                me.showToast("This browser does not support HTML5.","error");
                            this.nextbuttonhide = false;

                            }
                        } else {

                            me.showToast("Please upload a valid file.","error",);
                            this.nextbuttonhide = false;
                        }
                    },
            ProcessExcel(data) {
                //Read the Excel File data.
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                console.log("Workbook is",workbook.Strings)

                var first_sheet_name = workbook.SheetNames[0];
                    /* Get worksheet */
                    var worksheet = workbook.Sheets[first_sheet_name];
                //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
                //        raw: true
            //    var newdata = this.getmachinedata('dataone', 1, 0);
                var excelData =[]
                excelData = XLSX.utils.sheet_to_csv(worksheet);
                // var json_object = JSON.stringify(XL_row_object);
                console.log(excelData);
                var lines=excelData.split("\n");

            var result = [];

            var headers=lines[0].split(",");
            console.log('Lines are',lines)

            for(var i=1;i<lines.length-1;i++){

                var obj = {};
                var currentline=lines[i].split(",");
                for(var j=0;j<currentline.length;j++){
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            console.log("JSON IS",result)
            this.nextbuttonhide = true;
            let Str = JSON.stringify(result)
            //   let StrParse = JSON.parse(Str)
            this.bulkData = Str
            // this.goNext();
            this.showToast('File Uploaded Successfully','success')


            
            },

        GetAgentstate(){
            this.GETSTATE(res=>{
                // console.log('State Resp',res)
            for(let i =0;i<res.length;i++){
                let statedata={
                    text:res[i].region_data.name,
                    code:res[i].region_data.adminCode1
                }
                this.stateList.push(statedata)
            }

        })
        // console.log(this.agntStateList,"response mixin data")

        },
        getAgentCity(ev){
                console.log("event ev>>", ev)
                let codes= this.stateList.filter(e=>{
                    if(e.text === ev){
                        return e.code
                    }
                })
                this.GETCITY(codes[0].code,resp=>{
                    this.cityList = resp[0].cities
                })
        },
        getinput(){
            var me = this
                //   console.log("Autocomplete",autocom)
                //   this.editedItem.branchAdd = e.value
                //   this.editedItem.branchAdd = autocom
        
        },
            Searchdatatable (e) {
                console.log("e data",e)
                this.value = e;
            },
            
        // this function is used to get Branch details from API with paginatin @Ashraf Khan =====  date:2/4/2019
            //     GetBranchdata(e){
            //     console.log('e value',e)
            //     let Filter_Data
            //     if(e === 'all'){
            //         Filter_Data =  this. API_Service_admin() + 'getrole?userId='+this.getAgentInfo()._id+'&skip='+skip
            //     }else{
            //         Filter_Data = this. API_Service_admin() + 'getrole?userId='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip
            //     }
            //     var user = this.$store.state.userId
            // axios.get(this.API_Service()+'getmyAttendance/'+user+'?sortBy=604800000&skip='+this.branchskip).then(
            //         res => {

            //             this.Branchdata = res.data.errMsg[0]
            //             var pageLen = res.data.errMsg[1]
            //         let totalCount = pageLen[0].totalCount
            //         console.log('Page Length:',totalCount)
            //         this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
            //         }
            //     ).catch(
            //         err => {
            //             console.log(err) ;
            //         }
            //     );
        
            // },
            // next(event){
            //     console.log("Next Page",event)
            //     this.branchskip = (event-1)*10
            //     this.GetBranchdata(this.branchskip)
            //     },

        // End heare Pagination function

        // setvalue(branch){
        //  console.log("Passed Value", branch)
        //      axios.post('http://172.16.59.143:5010/secure/admin/addBranch/5b3b4cc28fa96d39870443e3',{
        //          bankm_id: this.branchid
        //      })
        //      .then(res =>{
        //             console.log("Passed Value", branchid)
        //      })
        // },
        channelfilters(e){
            console.log('data',e)
                this.page=1
                this.channeldatafilter = e
                this.getBranchMaster(this.channeldatafilter)
        },
        next(e){
                
                let skipdata = e - 1
                console.log('data',skipdata)
                if(skipdata === 0 ){
                    this.skip = 0
                }else{
                    this.skip = this.skipdiffrence*skipdata
                }
                console.log('skip data',this.skip)
                this.getBranchMaster(this.channeldatafilter,this.skip)
            },

        getBranchMaster(e,skip){
            console.log('e value',e)
            let Filter_Data
            if(e === 'all'){
                Filter_Data = 'getbranch?branchfilter=All&created_by='+this.getAgentInfo()._id +'&skip='+skip
            }else{
                Filter_Data ='getbranch?branchfilter=All&created_by='+this.getAgentInfo()._id+'&channelCode='+e +'&skip='+skip
            }
            let self = this;
             self.GET(Filter_Data, (res, error) => {
                 if(error){
                     console.log("CHECK ERROR ",error)
                     return;
                 }
                //    console.log('GET BRANCH DATA',res.data.errMsg);
                // The line below will add a new property for the resultant array of objects
                if(res.data.errCode === -1){
                     res.data.errMsg[0].forEach(element => {
                                   element.statusSelected = '';
                               });
                    self.branchResponse = res.data.errMsg[0]
                    console.log('Get Branch REPONSE',self.branchResponse)
                    var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].totalCount
                    console.log('Total Page Length:',totalCount)
                    self.pageLength = Math.ceil(totalCount/self.skipdiffrence)
                    console.log("after math ceil->", self.pageLength)
                    for( let i=0; i < self.branchResponse.length; i++){
                        // let branchDetails =[] 
                        if(self.branchResponse[i].active == 1){
                            self.branchResponse[i].statusSelected = 'Active'
                        }else{
                            self.branchResponse[i].statusSelected = 'InActive' 
                        }
                    }
                }
                   
               }
           );
        },

        selectStatus(){
            this.statusIndex = this.status.indexOf(this.editedItem.statusSelected)
            console.log('Select ==>',this.statusIndex)    
        },

        addbranch(){
            this.$v.$reset();
            this.disbrbtn=false;
            this.chread = false;
            this.dialog = true
            this.editedItem.statusSelected='InActive'
            this.editedItem.subChannel=this.$store.state.lastchanneselected
            this.editedItem.branchradius ='50 meters'
        },

        setchannel(e){
            console.log("channel store",e)
            this.$store.commit('LAST_CHNNEL_DATA',e)
        },

        editItem (item) {
            this.chread = true
            this.disbrbtn = false;
            this.editedIndex = this.branchResponse.indexOf(item)
            console.log('ITEMMM:',item)
            var itemData = item
            this.editedItem.subChannel =  itemData.channelCode._id
            // console.log( 'SUB Chann',this.editedItem.subChannel)
            this.editedItem.branchName = itemData.branchName;
            this.editedItem.branchCode = itemData.branchCode;
            this.editedItem.Area = itemData.Area;
            this.editedItem.cityName = itemData.cityName;
            this.editedItem.stateName = itemData.stateName;
            this.getAgentCity(itemData.stateName);
            this.editedItem.regionName = itemData.regionName;
            this.editedItem.zoneName = itemData.zoneName;
            this.editedItem.statusSelected = itemData.statusSelected;
            this.editedItem.Logitude = itemData.longitude;
            this.editedItem.Lattitude = itemData.latitude;
            this.editedItem.branchRadius = itemData.branchRadius
            // this.editedItem.bankcode = itemData.bankm_id._id             
            // this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            const index = this.branchResponse.indexOf(item)
            // confirm('Are you sure you want to delete this item?') && 
            this.branchResponse.splice(index, 1);
        },

        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                
                this.editedIndex = -1
            }, 300)
        },
          getLocationAdd(addData) {

            if(addData == "" || addData == null || addData == undefined ){
                 this.showToast('Please Enter Address to get Co-ordinates','info') 
                 console.log("inside addData->",addData);
            }else{

                var me = this
                console.log("Current place in function",addData)
                // me.address =me.currentPlace
                me.editedItem.branchAdd = addData
                me.geocoder.geocode( { 'address': me.editedItem.branchAdd}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                //   alert("Latitude: "+results[0].geometry.location.lat());
                //   alert("Longitude: "+results[0].geometry.location.lng());
                    me.lat1 = results[0].geometry.location.lat()
                    me.lng1 = results[0].geometry.location.lng()
                        me.finalAddress()
                }else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
                });

            }

    
  },
  finalAddress()
  {
   console.log("Final Address",this.lng1)
    console.log("Final Latitiude Address",this.lat1)
   this.editedItem.Lattitude = this.lat1
   this.editedItem.Logitude = this.lng1
  },

        save () {

//h99 
// editedItem.branchName
// editedItem.branchCode
// editedItem.Area
// editedItem.zoneName
// editedItem.branchAdd

                this.$v.$touch();
                console.log(this.$v)  
                if (this.$v.$invalid == true) {
                    console.log("Form has errors")  
                     this.showToast('Please fill all empty fields', this.TOST().WARNING);
                    return
                }
            else
            {
                //nned to create a mixin of this
                 if(/^\s+$/g.test(this.editedItem.branchName)){
                      this.showToast('Please fill all empty fields', this.TOST().WARNING);
                      return
                }else if( /^\s+$/g.test(this.editedItem.Area)){
                      this.showToast('Please fill all empty fields', this.TOST().WARNING);
                      return
                }else if(/^\s+$/g.test(this.editedItem.branchCode)){
                      this.showToast('Please fill all empty fields', this.TOST().WARNING);
                      return
                }else if(/^\s+$/g.test(this.editedItem.branchAdd)){
                        this.showToast('Please fill all empty fields', this.TOST().WARNING);
                        return
                // }else if (/^\s+$/g.test(this.editedItem.zoneName)) {
                //       this.showToast('Please fill all empty fields', this.TOST().WARNING);
                //       return
                }else{
                        console.log("Values are not blank, start regular flow");
                        this.disbrbtn = true;
                        // return
                        if (this.editedIndex > -1) {
                Object.assign(this.branchResponse[this.editedIndex], this.editedItem)
                var barnch_id_update = this.editedItem.branchCode
                

                // console.log(barnch_id_update , 'barnch_id_update')
                // console.log(this.$store.getters.getAgentDetails._id , 'PUT AGENT ID ')
                var self = this;
                let statusact=null;
                if(self.editedItem.statusSelected === 'Active'){
                    statusact=1
                }else if(self.editedItem.statusSelected === 'InActive'){
                    statusact=0
                }
                this.PUT('updateBranch/'+barnch_id_update,
                    {              
                        user_Id : this.$store.getters.getAgentDetails._id,
                        channel_Id:this.editedItem.subChannel,
                        branc_hName:this.editedItem.branchName,
                        branch_Code:this.editedItem.branchCode,
                        area:this.editedItem.Area,
                        city_Name:this.editedItem.cityName,
                        state_Name:this.editedItem.stateName,
                        region_Name:this.editedItem.regionName,
                        zone_Name:this.editedItem.zoneName,
                        radius :this.editedItem.branchradius,
                        longitude:this.editedItem.Logitude,
                        latitude  :this.editedItem.Lattitude,
                        // bankm_id:this.editedItem.bankcode,
                        active: statusact            

                    },res => {
                            if(res.data.errCode === -1){
                        console.log(res.data.errMsg);
                            this.editBranch = res.data.errMsg

                        console.log("Response is from server ",this.editBranch);
                        
                        // this.$store.commit('SET_MASTER_ROLE_DETAILS', this.editBranch)
                        // Object.assign(this.branchResponse[this.editedIndex], this.editBranch)
                        this.channeldatafilter = 'all'
                        this.getBranchMaster(this.channeldatafilter);
                        this.showToast('Branch Updated successfully','success')
                        this.dialog = false
                        //   this.vSnackbar('success', 'Data Edited Succesfully')   
                        this.close();                        
                            }else{
                            this.showToast('Something went wrong','error')
                            }
                    }
                )
        } else {
            this.branchResponse.push(this.editedItem)
            console.log('Updated table==>',this.branchResponse)
            var userID = this.getAgentInfo()._id;
            console.log(userID , 'lOgggedn in user @POST API this.$store.getters.getAgentDetails._id')
            let self = this;
            let statusact=null
                if(self.editedItem.statusSelected === 'Active'){
                    statusact=1
                }else if(self.editedItem.statusSelected === 'InActive'){
                    statusact=0
                }
                
            this.POST('addBranch/'+userID,{

                    channel_Id:this.editedItem.subChannel,
                    branc_hName:this.editedItem.branchName,
                    branch_Code:this.editedItem.branchCode,
                    area:this.editedItem.Area,
                    city_Name:this.editedItem.cityName,
                    state_Name:this.editedItem.stateName,
                    region_Name:this.editedItem.regionName,
                    zone_Name:this.editedItem.zoneName,
                    radius :this.editedItem.branchradius,
                    longitude:this.editedItem.Logitude,
                    latitude  :this.editedItem.Lattitude,
                    // bankm_id:this.editedItem.bankcode,
                    active: statusact 

                },res => {
                        if(res.data.errCode === -1){
                        //   console.log('POST CHANEL DATA',res.data.errMsg);
                        this.postBranchData =res.data.errMsg;
                        console.log('post data',this.postBranchData)
                        this.branchResponse.push(this.editedItem)
                        this.showToast('Branch created successfully','success')
                        this.channeldatafilter = 'all'
                        this.getBranchMaster(this.channeldatafilter);

                        // this.$store.commit('SET_MASTER_ROLE_DETAILS',this.postBranchData);
                        // console.log(this.obj)
                        }else{
                            this.showToast('Something went wrong','error')
                        }
                    }
                );
              }
                this.close();
             }
                         
            }
        }
    }
}
</script>
<style>
    .bgclrsrc{
        background-color: #fafafa;
    }

    .status{
    font-family:roboto; font-weight:500; letter-spacing:0.1px;
    }

    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }
    .thebtn{
      display:flex;
     align-items:center; 
     color:white;
     border-radius:5px;
     font-size:15px;
    }
    .btn-size{
        width: 1000px
}
     @media screen and (min-width: 320px){

     }
      @media screen and (min-width: 728px){
          .add-branch-btn{
              display: flex;
              justify-content: flex-end;
              margin-right: 15px;
          }
      }
      @media screen and (min-width: 922px){
          .add-branch-btn{
               display: flex;
              justify-content: flex-end;
              margin-right: 110px;              
          }
          .pagination{
  margin-top: 20px;
}
      }
</style>
