
<template>
    <v-app>
        <!-- <v-content> -->
        <v-card >      
            <v-layout row wrap ml-5 mr-5 >
              
                <v-flex class="ml-3 " style="flex-flow:column wrap;">
                     <v-card  row wrap class=" pt-1">
                        
                    <!-- <v-text class="mt-4 headline font-weight-bold">Branch Master</v-text> -->
                    <!-- <hr> -->
                    <v-card flat class="pt-1 pl-3 pr-2" style="background-color:#fafafa;"> 
                    <v-layout row wrap  justify-space-between >
                   </v-layout>

                   <v-layout row wrap mt-3 justify-space-between>
                        <!-- <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                                    <v-select v-model="channeldatafilter" 
                                        :items="channeldataall"  
                                        item-text="text" 
                                        item-value="value" 
                                        label="Channel"
                                        @change="channelfilters">
                                    </v-select>                            
                        </v-flex> -->
                      <div class="disflex">
                            <v-flex class="mt-2 mr-2" >
                                <v-btn depressed medium color="secondary" @click="openbulkbox" class="white--text br-radius">
                                    Bulk Upload
                                    <v-icon dark right>publish</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex  class="add-branch-btn mt-2" >
                                <v-btn depressed medium color="primary" class="white--text br-radius" @click.native="dialog=true">
                                    add branch
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex xs10 sm6 class="ml-3" >
                                    <v-text-field 
                                    @input="Searchdatatable"
                                    v-model="value"
                                    label="Search" 
                                    append-icon="search"
                                    height="30px"></v-text-field>                            
                            </v-flex>
                   </div>
                   </v-layout>
        </v-card>
    

<v-flex>
     
        <v-dialog v-model="dialogBulkUpldnew" persistent max-width="700px">
                <v-card>
                    <v-flex style="background-color:#3a3a3a">
                        <v-card-title class="subheading" style="color:white;justify-content:space-between;" >Upload File
                            <v-icon dark @click="dialogBulkUpldnew = false">clear</v-icon>
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
                               >
                                <!-- @change="jsonupload" -->
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
                                        <v-btn color="primary" v-if="nextbuttonhide === true" >Next <v-icon class="ml-2" size="20px">arrow_forward</v-icon></v-btn>
                                        <!-- @click="goNext()" -->
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
                                    <v-btn color="primary" >Close <v-icon class="ml-2" size="20px">clear</v-icon></v-btn>
                                    <!-- @click="closepopup()" -->
                                </v-layout>
                                </v-card-actions>
                            </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>

</v-flex>

                
                    <v-flex justify-center md12 ml-3 mr-3 mt-3 >
                        <h3 class="text-xs-center mb-3">Branch Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="branchResponse"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <!-- <td class="">{{props.item.channel}}</td> -->
                            <td class="">{{props.item.channelCode.channelName}}</td>
                            <td class="">{{props.item.BranchRadius}}</td>
                            <td class="">{{props.item.branchName}}</td>
                            <td class="">{{props.item.branchCode}}</td>
                            <td class="">{{props.item.bankm_id.bankName}}</td>
                            <td class="">{{props.item.Area}}</td>
                            <td class="">{{props.item.cityName}}</td>
                            <td class="">{{props.item.stateName}}</td>
                            <td class="">{{props.item.regionName}}</td>
                            <td class="">{{props.item.zoneName}}</td>
                            <!-- <td class="">{{props.item.zoneName}}</td> -->
                            <td class="">{{props.item.Lattitude}}</td>
                            <td class="">{{props.item.Logitude}}</td>
                            <td class="">{{props.item.statusSelected}}</td>
                            <td class="justify-center layout px-0">
                                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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
                                <v-select v-model="editedItem.subChannel" :items="itemsBank"  item-text="text" item-value="value" label="Channel Name"></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6> 
                                <v-text-field v-model="editedItem.branchradius" label="Set Branch Radius"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.branchName" label="Branch Name"
                                 @input="$v.editedItem.branchName.$touch()"
                                @blur="$v.editedItem.branchName.$touch()"
                                 :error-messages="branchErrors"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.branchCode" label="Branch Code"
                                 @input="$v.editedItem.branchCode.$touch()"
                                @blur="$v.editedItem.branchCode.$touch()"
                                 :error-messages="codeErrors"
                                ></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Area" label="Area"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.cityName" label="City Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.stateName" label="State Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.regionName" label="Region Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.zoneName" label="Zone Name"></v-text-field>
                            </v-flex>
                            <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.zoneName" label="Zone Name"></v-text-field>
                            </v-flex> -->
                            <!-- <v-flex>
                                 <v-select v-model="" :items="itemsBank"  item-text="text" item-value="value" label="Channel"></v-select>
                            </v-flex> -->
                            <v-flex xs12 sm6 md6>
                                 
                                <v-text-field v-model="editedItem.Lattitude" label="Branch Location Lattitude"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Logitude" label="Branch Location Logitude"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6 >
                                <!-- <p>Status</p> -->
                                <v-select @change="selectStatus()" v-model="editedItem.statusSelected" :items="status"  item-text="text" label="Status" 
                                 @input="$v.editedItem.statusSelected.$touch()"
                                @blur="$v.editedItem.statusSelected.$touch()"
                                 :error-messages="statusErrors"
                                >Status</v-select>
                                <!-- <v-overflow-btn @change="selectStatus()" v-model="editedItem.statusSelected" :items="status" label="Status" target="#dropdown-example"></v-overflow-btn> -->
                            </v-flex>
                                 
                            <v-flex xs12 sm6 md6 >
                               <v-select :items="bankdata" v-model="editedItem.bankcode" item-text="text" label="Bank Name" item-value="value"></v-select>
                                <!-- <v-overflow-btn @change="selectStatus()" v-model="editedItem.statusSelected" :items="status" label="Status" target="#dropdown-example"></v-overflow-btn> -->
                            </v-flex>
                            <p>{{editedItem.bankcode}}</p>
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
                        <v-btn depressed large color="secondary" @click.native="save">{{formTitle}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>

                        <!-- <v-btn> {{this.branchid}}</v-btn> -->

                    </v-card-actions>
                    </v-card>
                    </v-dialog> 
                  </v-card>
                </v-flex> 
                  
            </v-layout> 
        </v-card> 
            <div class="text-xs-center pagination">
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination>
            </div>  
     
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 
import { required, minLength, between,email } from 'vuelidate/lib/validators'
export default {
    created(){

             this.$store.commit('SET_PAGE_TITLE','Branch Master');
             this.bankStore = this.$store.state.chanelDetails
                for(let i = 0; i <  this.bankStore.length; i++){
                       let data={
                           text : this.bankStore[i].channelName,
                           value : this.bankStore[i]._id,
                       }
                       this.itemsBank.push(data)
                    //    console.log('ITEMS BANK 1:',this.itemsBank)
               }
            
            axios.get(this.API_Service_admin()+'getbankMaster?userId='+this.getAgentInfo()._id+'&s')
                .then(res =>

                        { 
                            // console.log('New Branch Bank Data', res.data.errMsg);
                        for(let i=0; i < res.data.errMsg.length; i++)
                        {
                            let newbank={
                                    text: res.data.errMsg[i].bankName,
                                    value: res.data.errMsg[i]._id
                            }

                        this.bankdata.push(newbank);
                        // console.log("new object data", this.bankdata)
                        }
                }
            )
         
         this.getBranchMaster();  

        //    GET CHANNEL DATA
        this.channelData = this.$store.getters.getChannelData
        console.log("Channel Data",this.channelData)
        
        
    },

    mounted(){
        // This Function is used to Get branch data with pagination.
    //   this.GetBranchdata(this.branchskip)
    },

    validations: {
     editedItem: {
        branchName: {
        required,
      },
      branchCode:{
          required,
      },
      statusSelected:{
          required
      },
},
},

    data(){
        return{
            dialogBulkUpldnew:false,
            steps:null,
            // edited:{
                
            // },
            // selected:false,
             branchskip:0,
            pagination: {},
            pageLength:0,
            Branchdata:[],

             bankStore:[],
            itemsBank:[],
            Bchanneldata:[],
            bankdata:[],
            channelData:[],
            selectedbankdata2:[],
            branchid:'',
            modelid:null,
            branchResponse:[],
            postBranchData:{},
            dialog: false,
            headers:[
                        {text: 'Channel', value: 'subChannel'},
                        {text:'BranchRadius',value:'BranchRadius'},
                        {text: 'Branch Name', value: 'branchName'},
                        {text: 'Branch Code', value: 'branchCode'},
                        {text: 'Bank Branch', value: 'bankcode'},
                        {text: 'Area', value: 'Area'},
                        {text: 'City Name', value: 'cityName'},
                        {text: 'State Name', value: 'stateName'},
                        {text: 'Region Name', value: 'regionName'},
                        {text: 'Zone Name', value: 'zoneName'},
                        {text: 'Lattitude', value: 'Lattitude'},
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
                    lattitude:'',
                    BranchRadius:'',
                    bankcode:''
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
                    lattitude:'',
                    BranchRadius:'',
                    bankcode:''
                    // status:''
                    
                },
                getStatus:'',
                
                statusIndex:'',
                status:['InActive','Active'],
              
                
        }
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Edit'
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
           codeErrors () {
      const errors = []
      if (!this.$v.editedItem.branchCode.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.branchCode.required && errors.push('BranchCode is required.')
      return errors
    },
       statusErrors () {
      const errors = []
      if (!this.$v.editedItem.statusSelected.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.statusSelected.required && errors.push('Status is required.')
      return errors
    },
    },
    methods:{

        openbulkbox(){

            console.log("Bulk BOX")
            this.dialogBulkUpldnew= true;
            
        },
        // this function is used to get Branch details from API with paginatin @Ashraf Khan =====  date:2/4/2019
                GetBranchdata(e){
                this.branchskip =e
                console.log("Page skip",this.branchskip)
                var user = this.$store.state.userId
            axios.get(this.API_Service()+'getmyAttendance/'+user+'?sortBy=604800000&skip='+this.branchskip).then(
                    res => {

                        this.Branchdata = res.data.errMsg[0]
                        var pageLen = res.data.errMsg[1]
                        let totalCount = pageLen[0].totalCount
                        console.log('User Atten REPONSE:',this.Branchdata)
                        console.log('Page Length:',totalCount)
                        this.pageLength = Math.ceil(totalCount/10)
                    }
                ).catch(
                    err => {
                        console.log(err) ;
                    }
                );
        
            },
            next(event){
                console.log("Next Page",event)
                this.branchskip = (event-1)*10
                this.GetBranchdata(this.branchskip)
                },

        // End heare Pagination function

        setvalue(branch){
         console.log("Passed Value", branch)
             axios.post('http://172.16.59.143:5010/secure/admin/addBranch/'+this.getAgentInfo()._id,{
                 bankm_id: this.branchid
             })
             .then(res =>{
                    console.log("Passed Value", branchid)
             })
        },

        getBranchMaster(){
             axios.get(this.API_Service_admin()+'getbranch?created_by='+this.getAgentInfo()._id+'&branchfilter=All').then(
               res => {
                //    console.log('GET BRANCH DATA',res.data.errMsg);
                    res.data.errMsg.forEach(element => {
                                   element.statusSelected = '';
                               });
                    this.branchResponse = res.data.errMsg
                    console.log('Get Branch REPONSE',this.branchResponse)
                    
                    for( var i=0; i <= this.branchResponse.length; i++){
                        let branchDetails =[]
                        if(this.branchResponse[i].active == 1){
                            this.branchResponse[i].statusSelected = 'Active'
                        }else{
                            this.branchResponse[i].statusSelected = 'InActive' 
                        }
                    }
               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
        },


        selectStatus(){
            this.statusIndex = this.status.indexOf(this.editedItem.statusSelected)
            console.log('select==>',this.statusIndex)
            
        },
        editItem (item) {
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
            this.editedItem.regionName = itemData.regionName;
            this.editedItem.zoneName = itemData.zoneName;
            this.editedItem.statusSelected = itemData.statusSelected;
            this.editedItem.Lattitude =itemData.latitude
            this.editedItem.Logitude = itemData.longitude
            this.editedItem.BranchRadius = itemData.BranchRadius
            this.editedItem.bankcode = itemData.bankm_id._id             
            // this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem (item) {
            const index = this.branchResponse.indexOf(item)
            // confirm('Are you sure you want to delete this item?') && 
            this.branchResponse.splice(index, 1)
        },


        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                
                this.editedIndex = -1
            }, 300)
        },

        save () {
                      this.$v.$touch()
               console.log(this.$v)  
          if (this.$v.$invalid == true) {
              console.log("Form has errors")  
      }
      else
      {
            if (this.editedIndex > -1) {
                Object.assign(this.branchResponse[this.editedIndex], this.editedItem)
                var barnch_id_update = this.editedItem.branchCode
                

                console.log(barnch_id_update , 'barnch_id_update')
                console.log(this.$store.getters.getAgentDetails._id , 'PUT AGENT ID ')
                var self = this;
                let statusact=null
                if(self.editedItem.statusSelected === 'Active'){
                    statusact=1
                }else if(self.editedItem.statusSelected === 'InActive'){
                    statusact=0
                }
                axios.put(this.API_Service_admin()+'updateBranch/'+barnch_id_update,
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
                        bankm_id:this.editedItem.bankcode,
                        longitude  :this.editedItem.Logitude ,
                        latitude:this.editedItem.Lattitude,
                        active: statusact            

                    }).then(
                        res => {
                        console.log(res.data.errMsg);
                            this.editBranch = res.data.errMsg

                        console.log("Response is from server ",this.editBranch);
                        
                        // this.$store.commit('SET_MASTER_ROLE_DETAILS', this.editBranch)
                        // Object.assign(this.branchResponse[this.editedIndex], this.editBranch)
                        this.getBranchMaster();
                    
                        this.dialog = false
                        //   this.vSnackbar('success', 'Data Edited Succesfully')   
                        this.close();                        
                    
                    }
                ).catch(
                    err => {
                        console.log(err) ;
                    }
                );
        } else {
            this.branchResponse.push(this.editedItem)
            console.log('Updated table==>',this.branchResponse)
            var userID = this.$store.getters.getAgentDetails._id;
            console.log(userID , 'lOgggedn in user @POST API this.$store.getters.getAgentDetails._id')
            let self = this;
            let statusact=null
                if(self.editedItem.statusSelected === 'Active'){
                    statusact=1
                }else if(self.editedItem.statusSelected === 'InActive'){
                    statusact=0
                }
            axios.post(this.API_Service_admin()+'addBranch/'+userID,{

                    channel_Id:this.editedItem.subChannel,
                    branc_hName:this.editedItem.branchName,
                    branch_Code:this.editedItem.branchCode,
                    area:this.editedItem.Area,
                    city_Name:this.editedItem.cityName,
                    state_Name:this.editedItem.stateName,
                    region_Name:this.editedItem.regionName,
                    zone_Name:this.editedItem.zoneName,
                    bankm_id:this.editedItem.bankcode,
                     longitude  :this.editedItem.Logitude ,
                    latitude:this.editedItem.Lattitude,
                    active: statusact 

                }).then(
                    res => {
                        //   console.log('POST CHANEL DATA',res.data.errMsg);
                        this.postBranchData =res.data.errMsg;
                        console.log('post data',this.postBranchData)
                        this.branchResponse.push(this.editedItem)
                        this.getBranchMaster();

                        // this.$store.commit('SET_MASTER_ROLE_DETAILS',this.postBranchData);
                        // console.log(this.obj)
                    }
                ).catch(
                    err => {
                        console.log(err) ;
                    }
                );
             }
                this.close()
            }
        }
    }
}
</script>
<style>

body{
    margin :0;
    padding: 0;
}

/* 
    .child-flex>*, .flex{
        max-width: 98%;
    } */
    .disflex{
        display:flex; flex-direction:row; 
        justify-content:space-between;
    }

    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }
    .btn-size{
        width: 1000px
}
     @media screen and (min-width: 320px){
         .br-radius{
             border-radius:6px;
         }

     }
      @media screen and (min-width: 728px){
          .add-branch-btn{
              border-radius:5px;
              display: flex;
              justify-content: flex-end;
              margin-right: 15px;
          }
      }
      @media screen and (min-width: 922px){
          .add-branch-btn{
               display: flex;
              justify-content: flex-end;
              /* margin-right: 110px;               */
          }
        .pagination{
            margin-top: 20px;
    }
      }
</style>



