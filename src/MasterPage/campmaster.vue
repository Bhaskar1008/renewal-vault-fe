<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
             <v-layout row  justify-space-between class="bgclrcamp bgclrsource pt-3 pl-3 pr-3">
                            <v-flex>
                                <v-btn round depressed medium slot="activator" color="primary" class="ml-0 white--text thebtn" @click.native="addChannel()">
                                    Add New Campaign
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn>
                                </v-flex>
                            <v-flex xs10 sm6 md2 class="">
                                <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                height="30px"></v-text-field>                            
                            </v-flex>
             </v-layout>
            <v-layout row wrap >
                <v-flex class=" mt-3" style="flex-flow:column wrap">
                    <!-- <v-text class="headline font-weight-bold">Campaign Master</v-text>
                    <hr> -->
                    <v-layout row justify-center>
               
                    <v-flex justify-center md11 mt-3 >
                        <h3 class="text-xs-center mb-3">Campaign Details</h3>
                        <v-data-table
                        hide-default-footer
                        hide-actions
                        pagination.sync
                        :headers="headers"
                        :items="campresponse"
                        
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.code }}</td>
                            <td class="">{{props.item.name}}</td>
                            <td > <span class="status" :style="{color: props.item.campStatus == 'Active' ? '#13961c' : '#d61111'}" >{{props.item.campStatus}} </span></td>
                            <td class="">{{props.item.createdBy.first_name == undefined ? "-" : props.item.createdBy.first_name +' '+ props.item.createdBy.last_name}}</td>
                           <td class="">{{props.item.createdDate | formate-date}}</td>
                           <td class="">{{props.item.updatedBy.first_name  == undefined ? "-" : props.item.updatedBy.first_name  +' '+ props.item.updatedBy.last_name}}</td>
                           <td class="">{{props.item.updatedDate | formate-date}}</td>

                            <td class="">
                                <v-icon small class="mr-2" @click="editItem(props.item,props.index)">edit</v-icon>
                                <!-- <v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon> -->
                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>
                             
                </v-layout>

                    <v-dialog v-model="dialog" persistent max-width="800px">

                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field   :readonly="disname"  v-model="editedItem.campName" @change="checklength" counter="15" maxlength="15" hint  label="Campaign Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                               <v-select  v-model="editedItem.campStatus" :items="chnlstatus" item-text="text" label="Status" ></v-select>                                
                            </v-flex>
                            <v-flex xs12 sm6 md6 v-if="ccode">
                                <v-text-field :readonly="disname"  v-model="editedItem.campcode"  label="Campaign Code" ></v-text-field>                                
                            </v-flex>
                            
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary"  :disabled="disbtn" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                    </v-dialog> 

                </v-flex>    
            </v-layout> 
            <div class="text-xs-center pagination" v-if="visible === true">
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

import { required, minLength, between } from 'vuelidate/lib/validators'

var index = 0; // used for put api
export default {

      validations: {
     editedItem: {
        campName: {
            required,
            minLength: minLength(2)
                }
        },
    },

    created(){
              this.$store.commit('SET_PAGE_TITLE','Campaign Master');
            this.GetCampaighn(0);
            let agetdetails = {}
            // agetdetails = this.getAgentInfo()
            // console.log("agentID Check",agetdetails)
          this.uID =  this.getAgentInfo();
          console.log("THe USer ID IS :::=>>>",this.uID);
    },
    mounted(){
        this.headers.map(e =>{
                    e.sortable = false;
        })
    },

    data(){
        return{
            page:1,
            skipdiffrence:this.paginationdiff(),
            skip:0,
            disname:false,
            disbtn:false,
            ccode:false,
            dialog: false,
            visible:false,
            skipdiffrence:this.paginationdiff(),
            btnname:'',
            pagination: {},
            pageLength:0,
            skip:0,
            page:1,
            value:'',
            campresponse:[],
            chanelResponse:[],
            // chnelstatus:[],
            editChanel:{},
            editsourceresponse:{},
            TableIndex:'',
            headers:[
                        {text: 'Campaign Code', value: 'codeID'},
                        {text: 'Campaign Name', value: 'campName'},
                        {text: 'Campaign Status', value: 'campStatus'},
                        {text: 'Created By', value:'CreatedBy'},
                        {text: 'Created Date', value: 'CreatedDate'},
                        {text: 'Updated By', value: 'UpdatedBy'},
                        {text: 'Updated Date', value: 'UpdatedDate'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
            UserID:'',
            tableData: [],
                editedIndex: -1,
                editedItem: {
                campName:'',
                sourceID:'',
                campStatus:'',
                campaignDate:'',
                campcode:'',
               
            },
            defaultItem: {
                campName:'',
                sourceID:'',
                campStatus:'',
                campaignDate:'',
                // branch_name:'',
                // area:'',
                // city_name:'',
                // state_name:'',
                // region_name:'',
                // zone_name:'',
            },
            chnlstatus:['InActive', 'Active'],
            chnlstatusIndex:'',
            editchanneiId:'',
        }
    },
    computed: {
         objmethod() {
        
    	 var self=this;
       return this.campresponse.filter(function(cust){return cust.name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 
        || cust.code.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || cust.createdBy.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 ||  cust.createdBy.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 || 
         cust.updatedBy.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 ||  cust.updatedBy.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 
          || cust._id.toLowerCase().indexOf(self.value.toLowerCase()) >=0  
       
       
          
         });
       //return this.customers;
    },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'Add New Channel' : 'Edit Channel'
        },

    //      value() {
    //        console.log(this.value);
    //    }
    },

    filters: {

       formateDate(milisecond) {
           try {
               return new Date(parseInt(milisecond)).toLocaleDateString()
           } catch(err) {
               return milisecond;
           }
       }
       ,
        filterid(id, initial) {
           try {
               if (id == null || id == undefined || id == "") { return id; }
               return initial + id.slice(16, 25).toUpperCase();
           } catch (err) { return id; }
       },
   },

    methods:{

    next(e){
                let skipdata = e - 1
                console.log('data',skipdata)
                if(skipdata === 0 ){
                    this.skip = 0
                }else{
                    this.skip = this.skipdiffrence*skipdata
                }
                console.log('skip data',this.skip)
                this.Getchannel(this.skip)
    },



        checklength(){
                if(this.editedItem.campName.length > 15){
                    this.showToast('Character limit is only 15', this.TOST().WARNING);
                    console.log("greater than 15 ",this.editedItem.campName.length);
                    return
                }
               
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
                this.GetCampaighn(this.skip)
            },
      
        Searchdatatable (e) {

            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
            },

               fetchById(id, rootIndex) {
            // console.log('Fetch By Id : ', rootIndex);
            let self = this;
            this.showLoader(true);
            this.GET('fetch_lead_sources?id='+id, function(res, error) {

                if (error) {
                    self.showLoader(false);
                    self.showToast('Something goes wrong', self.TOST().ERROR);
                    console.log('Error ', error);
                    return;
                }
                // When database fails
                if (res.data.errCode == 4) {
                    self.showLoader(false);
                    self.showToast('Database Error', self.TOST().ERROR);
                    return;
                }
                let temp =  self.chanelResponse.splice(0, self.chanelResponse.length);

                self.chanelResponse = [];
                if (res.data.errCode == -1) {
                    res.data.errMsg.forEach((e, index, array) => {
                        temp[rootIndex] = self.mapNewFields(e, rootIndex);
                    });
                    // console.log('Temporray Value : ' , temp);
                    self.chanelResponse = temp.splice(0, temp.length);
                } else {
                    self.showToast('Data not found', self.TOST().INFO);
                }

                self.showLoader(false);
            });
        },

        mapNewFields(e, index) {
                  console.log("New fields for mapping are::=>", e)
            try {
                return {
                    index,
                    _id: e._id,
                    // created_by: e.created_by,
                    // updated_by: e.updated_by,
                    // channelName: e.channelCode.channelName,
                    status: e.status === 1 ? "Active" : "Inactive",
                    // created_by_name: e.created_by.first_name+' '+e.created_by.last_name,
                    // created_date: e.created_date,
                    // updated_by_name: e.updated_by.first_name+' '+e.updated_by.last_name,
                    // updated_date: e.updated_date
                }
            } catch(err) {
                console.log("An error has occured in ")
            }
        },

            GetCampaighn(skip){
                     let self = this;
                //  this.GET('getchannel?userId='+this.getAgentInfo()._id , function(res , error){
                 this.GET('fetch_campaign_list?filter=0&skip='+skip , function(res , error){
                     //    console.log('GET CHANEL DATA',res.data.errMsg);
                    // this.chanelResponse = res.data.errMsg
                    // console.log('CHANEL REPONSE',this.chanelResponse)
                    console.log("Check Error",error);

                    console.log('GET Campaign DATA=>', res.data.errMsg[0] );
                    res.data.errMsg[0].forEach( element => {
                    element.campStatus = '';
                    });
                    self.campresponse  = []
                    self.campresponse = res.data.errMsg[0]
                    console.log('Source REPONSE',self.campresponse)
                        var pageLen = res.data.errMsg[1]
                        let totalCount = pageLen[0].totalCount
                        console.log('Page Length:',totalCount)
                        self.pageLength = Math.ceil(totalCount/self.skipdiffrence)
                        if(self.pageLength >1){
                        self.visible = true
                            }else{
                                self.visible =false
                            }
                    
                    for( var i=0; i < self.campresponse.length; i++){
                        // console.log('active==>',self.branchResponse[i].active)
                        // let branchDetails =[]
                    //    console.log("fname is ->",self.campresponse[i])  
                        self.campaignDate = self.campresponse[i].createdDate;
                       
                        var thedate = new Date(self.campaignDate);
                        // console.log("The Campaign Date is::=>", thedate.toLocaleDateString());

                        if(self.campresponse[i].hasOwnProperty('updatedBy') ){
                               self.campresponse[i].updatedBy.first_name = self.campresponse[i].updatedBy.first_name
                               self.campresponse[i].updatedBy.last_name  = self.campresponse[i].updatedBy.last_name
                               self.campresponse[i].updatedDate = self.campresponse[i].updatedDate 
                            }else{
                            let updatedBy = {
                                updatedBy: {
                                    first_name:" - ",
                                    last_name:""
                                }
                            }
                            let temp = Object.assign(updatedBy, self.campresponse[i]);

                            self.campresponse[i] = temp;
                            }


                        if(self.campresponse[i].status === 1){
                            // console.log('active==>',self.branchResponse[i].active)
                            self.campresponse[i].campStatus = 'Active'
                           
                        }else if(self.campresponse[i].status === 0){
                            self.campresponse[i].campStatus = 'InActive'
                           
                        }
                    }
                 })
            
            },
        //  selectchStatus(){
        //     self.chnlstatusIndex = self.chnlstatus.indexOf(self.editedItem.channelStatus)
        //     console.log('select==>',self.chnlstatusIndex)
            
        // },
        saveAndEdit(_btnname){
             if(_btnname == 'Add' )
            {
                this.save();
            } 
            else if(_btnname == 'Update'){
                  
                    this.editChanl();
            }
            },

        addChannel(){
             this.disbtn = false;
            this.disname = false;
            this.ccode = false;
            this.btnname = 'Add';
            this.editedItem.campName = '';
             this.editedItem.campaignDate =''
            if(this.chanelResponse.length === 0){
                this.editedItem.channelCode  ='CH1'
            }else{
            let chanel = this.chanelResponse[0].channelCode
            // console.log('channe;',chanel)
            let constsplitchannel = chanel.split('CH')
            // console.log("Chnel code",(constsplitchannel[1]) )
            let intchnnal = parseInt(constsplitchannel[1])
            this.editedItem.channelCode  ='CH'+(intchnnal+1)
            }
            // this.editedItem.channelCode = '';
            this.editedItem.channelStatus = 'InActive';
            this.dialog = true;
        },


        editItem (item,i) {
             this.disname = true;
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            // _index = i;
            this.btnname = 'Update' 
            this.ccode=true;
            this.dialog = true;
            var itemssource = item;
            console.log("new item is",itemssource)
            this.editedItem.campcode = itemssource.code;
            this.editedItem.campName = itemssource.name;
            this.editedItem.sourceID = itemssource._id;
            this.editedItem.campStatus = itemssource.status === 1 ? this.chnlstatus[1] : this.chnlstatus[0];        
        },

        editChanl(item){  
                 
            // console.log('CHANNEL CODE',this.editedItem.channelStatus)
            let status = null
            if(this.editedItem.campStatus === 'Active'){
                status = 1
            }else if(this.editedItem.campStatus === 'InActive'){
                status = 0
            }
            console.log('Before PUT',  this.editedItem.campName);
             this.PUT('update_campaign',
             {              
                    campName: this.editedItem.campName,
                    id: this.editedItem.sourceID, 
                    status: status,                   
                    userId: this.getAgentInfo()._id,
                    code: this.editedItem.campcode,

                        
             },(res , error) =>{
                if(res.data.errCode === -1){
                   console.log('PUT DATABASE RESPONSE',res.data.errMsg);
                    this.editsourceresponse = res.data.errMsg

                //    console.log("Response is from server ",res.data.errMsg);
                 
                  var len = res.data.errMsg.length
                  console.log("After EDIT",len)
                // this.$store.commit('SET_AFFILIATE_DETAILS',this.editsourceresponse);
                //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})  
                this.showToast('Your Campaign Updated Successfully','success')
                // this.fetchById(); 
                this.GetCampaighn(0);
                    this.dialog = false

                     }else if(res.data.errCode === 428){
                          this.showToast('Campaign code data is mandatory','error')
                     }else{
                        this.showToast('Something went wrong','error')
                     }
             })

            // if(this.editChanel.active === 1){
            //         this.channelStatus = 'Active'
            //     }else{
            //          this.channelStatus = 'Inactive'
            //     }

            //      const FormData={
            //         channelName:this.editedItem.chanelName,
            //         _id:this.editedItem.channelCode,
            //          channelStatus:this.editedItem.channelStatus,

            //          }
            //           Object.assign(this.chanelResponse[this.TableIndex], FormData)
          this.disbtn = false;

        },

       

        deleteItem(index) {
        // const index = this.tableData.indexOf(item)
        // this.cfrDataObj.splice(index, 1);
        // confirm('Are you sure you want to delete this item?') && 
        this.chanelResponse.splice(index, 1)
        },

        close () {
        this.dialog = false
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            
            this.editedIndex = -1
        }, 300)
        },


        save(){
             this.disbtn = true;
             let self = this;
             // this condition will check for blank spaces only, anything after blank space is valid
            if(/^\s+$/g.test(self.editedItem.campName)){
                        self.showToast('Campaign Name should not be empty', self.TOST().WARNING);
                        this.disbtn = false;
                        return
            }
            else if(self.$v.$invalid == true){
                      self.showToast('Campaign Name should not be empty', self.TOST().WARNING);
                     this.disbtn = false;
            }
            else{
               
                // Post API hit
                // console.log('CHANEL NAME',this.editedItem.channelName),
                console.log('Active InActive ::: ',this.editedItem.campStatus);
                let code = null;
                if(this.editedItem.campStatus === "InActive") {
                    code = 0;
                } else if(this.editedItem.campStatus === "Active") {
                    code = 1;
                }
                let sendData = {
                    campaignName: self.editedItem.campName,
                    userId: this.getAgentInfo()._id ,
                    status: code,
                }

                console.log('POP sending data: ', sendData);
               
              this.POST('create_campaign',sendData , (res , error) =>{
                   //    console.log('POST CHANEL DATA',res.data.errMsg);
                        if(res.data.errCode === -1){
                            self.editsourceresponse = res.data.errMsg[0];
                            console.log('Response Data',self.editsourceresponse)
                            self.$store.commit('SET_AFFILIATE_DETAILS',self.editsourceresponse);
                            // self.updateChnl();
                            self.dialog = false    ;
                            
                                // if(self.editChanel.active === 1){
                                //     self.channelStatus = 'Active'
                                // }else{a
                                //     self.channelStatus = 'Inactive'
                                // }
                                
                                // const formData={
                                // channelName :self.editedItem.chanelName,
                                // channel_code: self.editedItem.channelCode,
                                // _id: self.editedItem.channelCode,
                                // channelStatus:self.channelStatus,
                                
                                // }
                                // self.chanelResponse.push(formData)
                                this.showToast('Campaign created Successfully','success');
                                this.GetCampaighn(0);
                                this.disbtn = false;
                        }else{
                           this.disbtn = false;
                           this.showToast('Mandatory fields not found','error');
                        }
              })
        }
                // this.close()

               
                },

                // updateChnl(){
                //     let self = this;
                //     self.chanelResponse = self.$store.state.chanelDetails;
                //     console.log('CHNEL RESPONSE',self.chanelResponse)
                // },
     
    }
}
</script>
<style>

 .status{
    font-family:roboto; font-weight:500; letter-spacing:0.1px;
 }

.bgclrsource{
    background-color: #fafafa;
}
.bgclrcamp{
    background-color: #FAFAFA;
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
              margin-right: 15px;              
          }
          .pagination{
            margin-top: 20px;
            }
      }
</style>
