<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
                 <v-layout row  justify-space-between class="bgclrsource pt-3 pr-3 pl-2 bgclr">
                            <v-flex>
                                <v-btn round depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addChannel()">
                                    add Channel
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
            <v-layout row wrap>
                <v-flex class="mt-3" style="flex-flow:column wrap">
                    <!-- <v-text class=" headline font-weight-bold">Channel Master</v-text>
                    <hr> -->
                    <v-layout row justify-center>
               
                    <v-flex justify-center md11 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">Channel Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="objmethod"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.channelName}}</td>
                            <td class="">{{props.item.channelCode}}</td>
                            <td class="status"> <span class="status" :style="{color: props.item.channelStatus == 'Active' ? '#13961c' : '#d61111'}"> {{props.item.channelStatus}} </span></td>
                           
                            <td class="">
                                <v-icon small class="mr-2" @click="editItem(props.item,props.index)">edit</v-icon>
                                <!-- <v-icon small >delete</v-icon> @click="deleteItem(props.item,props.index)" -->
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
                                <v-text-field counter="50" maxlength="50" :disabled="disch"  :readonly="disch" :rules="clubValid" v-model="editedItem.chanelName" @input="Channelvalidation(editedItem.chanelName)" label="Channel Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.channelCode" disabled label="Channel Code"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.channelStatus" :items="chnlstatus" item-text="text" label="Status" ></v-select>                                
                            </v-flex>
                             <v-flex xs12 sm6 md6></v-flex>
                             <v-flex xs12 sm6 md6 v-if="onaddonly">
                                <v-checkbox v-model="def"   label="This will add Default data" ></v-checkbox>                                
                            </v-flex>
                           
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn :disabled="disaddbutton" depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
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
import { required, minLength } from 'vuelidate/lib/validators'

var index = 0; // used for put api
export default {

    validations: {
            editedItem: {
                chanelName:{
                    required, minLength: minLength(2)
                },
            },
           


    },

    created(){
        this.$store.commit('SET_PAGE_TITLE','Channel Master');
            this.Getchannel();
       
    },
    mounted(){
        this.headers.map(e =>{
                    e.sortable = false;
        })
    },

    data(){
        return{
            disaddbutton:false,
            disch:false,
            onaddonly:false,
            api1:"",
            def:false,
            dialog: false,
            btnname:'',
            clubValid : [],
            pagination: {},
            pageLength:0,
            value:'',
            chanelResponse:[],
            // chnelstatus:[],
            editChanel:{},
            TableIndex:'',
            headers:[
                        {text: 'Channel', value: 'chanelName'},
                        {text: 'Channel Code', value: 'channelCode'},
                        {text: 'Channel Status', value: 'channelStatus'},
                        // {text: 'Branch Name', value: 'branch_name'},
                        // {text: 'Area', value: 'area'},
                        // {text: 'City Name', value: 'city_name'},
                        // {text: 'State Name', value: 'state_name'},
                        // {text: 'Region Name', value: 'region_name'},
                        // {text: 'Zone Name', value: 'zone_name'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
            tableData: [],
                editedIndex: -1,
                editedItem: {
                    chanelName:'',
                    channelCode:'',
                    channelStatus:'',
                // branch_name:'',
                // area:'',
                // city_name:'',
                // state_name:'',
                // region_name:'',
                // zone_name:'',
            },
            defaultItem: {
                chanelName:'',
                channelCode:'',
                channelStatus:'',
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
       return this.chanelResponse.filter(function(cust){return cust.channelName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || cust.channelCode.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
       
       
          
         });
       //return this.customers;
    },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Channel' : 'Edit Channel'
        },

         value() {
           console.log(this.value);
       }
    },
    methods:{

        Channelvalidation(value){
            try{
                let nameRegex =/^[A-Za-z0-9&_ ]+$/;
                this.clubValid = []
                value === '' ? this.clubValid.push('This is field required') : ''
                value.match(nameRegex) ? this.clubValid.push() : this.clubValid.push('Only alphabets and numbers are allowed')
            }catch(err){
                console.log(err)
            }
        },
        Searchdatatable (e) {

            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
            },
            Getchannel(){
                     let self = this;
        //  this.GET('getchannel?userId='+this.getAgentInfo()._id , function(res , error){

                 this.GET('getchannel?userId='+this.getAgentInfo()._id+'&filter=all' , function(res , error){
                      //    console.log('GET CHANEL DATA',res.data.errMsg);
                    // this.chanelResponse = res.data.errMsg
                    // console.log('CHANEL REPONSE',this.chanelResponse)

                    if(error){
                        console.log('Checl ERROR',error)
                        return;
                    }
                    console.log('GET CHANEL DATA', res.data.errMsg );
                    res.data.errMsg.forEach( element => {
                        element.channelStatus = '';
                    });

                    self.chanelResponse = res.data.errMsg
                    console.log('CHANEL REPONSE',self.chanelResponse)
                    
                    for( var i=0; i < self.chanelResponse.length; i++){
                        // console.log('active==>',self.branchResponse[i].active)
                        // let branchDetails =[]
                        if(self.chanelResponse[i].active === 1){
                            // console.log('active==>',self.branchResponse[i].active)
                            self.chanelResponse[i].channelStatus = 'Active'
                           
                        }else if(self.chanelResponse[i].active === 0){
                            self.chanelResponse[i].channelStatus = 'InActive'
                           
                        }
                    }
                 })
            },
        //  selectchStatus(){
        //     this.chnlstatusIndex = this.chnlstatus.indexOf(this.editedItem.channelStatus)
        //     console.log('select==>',this.chnlstatusIndex)
            
        // },

        saveAndEdit(_btnname){
            if(this.clubValid.length === 0){
            if(_btnname == 'Add' )
            {
                if(this.def == true){
                    this.savedef();
                }else{
                     this.save();
                }
               
            } 
            else if(_btnname == 'Update'){
                    this.editChanl();
            }
            }
            },

        addChannel(){
            this.disaddbutton = false;
            this.disch = false;
            this.onaddonly = true;
            this.btnname = 'Add';
            this.editedItem.chanelName = '';
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
            this.disaddbutton = false;
            this.disch= true;
            this.onaddonly = false;
            console.log("EDITING", this.onaddonly)
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            // _index = i;
            this.btnname = 'Update' 
               
            this.dialog = true
            var itemsChanel = item;
            console.log("new item is",itemsChanel)
            this.editedItem.chanelName = itemsChanel.channelName;
            this.editedItem.channelCode = itemsChanel.channelCode;
            this.editedItem.channelStatus = itemsChanel.channelStatus;
            this.editchanneiId = itemsChanel._id
        
        },

        editChanl(item){
               this.disch = false;
            // console.log('CHANNEL CODE',this.editedItem.channelStatus)
            let status = null
            if(this.editedItem.channelStatus === 'Active'){
                status =1            
            }else if(this.editedItem.channelStatus === 'InActive'){
                status =0            
            }
             this.PUT('updateChannel/'+this.editchanneiId,
             {              
                    channel_name: this.editedItem.chanelName,
                    channel_code: this.editedItem.channelCode, 
                    active: status,                   
                    user_Id: this.getAgentInfo()._id
             }, (res , error) =>{
                   if(res.data.errCode === -1){
                   console.log('DATABASE RESPONSE',res.data.errMsg);
                    this.editChanel = res.data.errMsg

                //    console.log("Response is from server ",res.data.errMsg);
                 
                  var len = res.data.errMsg.length
                  console.log("After EDIT",len)
                    this.$store.commit('SET_CHANEL_DETAILS',this.editChanel);
                //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})  
                this.showToast('Channel Updated Successfully','success')
                this.Getchannel(); 
                    this.dialog = false
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

        savedef(){
            this.disaddbutton = true
            console.log("SAVE DEFUALT POST API IS FIRED");
             let self = this;
                // Post API hit
                // console.log('CHANEL NAME',this.editedItem.channelName),
              
                console.log('Active InActive ::: ',this.editedItem.channelStatus);
                let code = null;
                if(this.editedItem.channelStatus === "InActive") {
                    code = 0;
                } else if(this.editedItem.channelStatus === "Active") {
                    code = 1;
                }
                let sendData = {
                    user_Id: this.getAgentInfo()._id,
                    channel_name: self.editedItem.chanelName,
                    channel_code: self.editedItem.channelCode,
                    active: code
                }
 
                console.log('SEND DATA DEFAULT : -> ', sendData);
            //   var sudeeplocalip = "http://127.0.0.1:5010/secure/admin/";
              this.POST('setDefault_data', sendData ,(res , error)=>{
                   //    console.log('POST CHANEL DATA',res.data.errMsg);
                        if(res.data.errCode === -1){
                            self.editChanel = res.data.errMsg;
                            console.log('Response Data DEFAULT',self.editChanel)
                            self.$store.commit('SET_CHANEL_DETAILS',self.editChanel);
                            // self.updateChnl();
                            self.dialog = false    ;
                            
                                // if(self.editChanel.active === 1){
                                //     self.channelStatus = 'Active'
                                // }else{
                                //     self.channelStatus = 'Inactive'
                                // }
                                
                                // const formData={
                                // channelName :self.editedItem.chanelName,
                                // channel_code: self.editedItem.channelCode,
                                // _id: self.editedItem.channelCode,
                                // channelStatus:self.channelStatus,
                                
                                // }
                                // self.chanelResponse.push(formData)
                                this.showToast('Channel created Successfully','success')
                                this.Getchannel();
                        }else{
                            console.log("I AM ELSE")
                           this.showToast('Something went wrong','error') 
                        }
              })
                // this.close()
            },


        save(){

            if(/^\s+$/g.test(this.editedItem.chanelName)){
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                 this.disaddbutton = false
                return
            }else if(this.$v.$invalid == true){
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                 this.disaddbutton = false
                return
            }else{
               console.log("ready to run regular flow")
                this.disaddbutton = true
                console.log("Normal NON-DEFAULT API will be fired");
             let self = this;
                // Post API hit
                // console.log('CHANEL NAME',this.editedItem.channelName),
                // console.log('Active InActive ::: ',this.editedItem.channelStatus);
                let code = null;
                if(this.editedItem.channelStatus === "InActive") {
                    code = 0;
                } else if(this.editedItem.channelStatus === "Active") {
                    code = 1;
                }
                let sendData = {
                    channel_name: self.editedItem.chanelName,
                    channel_code: self.editedItem.channelCode,
                    active: code
                }

                console.log('POP : ', sendData);
               
              this.POST('addChannel/'+this.getAgentInfo()._id, sendData , (res , error)=>{
                     //    console.log('POST CHANEL DATA',res.data.errMsg);
                        if(res.data.errCode === -1){
                            self.editChanel = res.data.errMsg;
                            console.log('Response Data',self.editChanel)
                            self.$store.commit('SET_CHANEL_DETAILS',self.editChanel);
                            // self.updateChnl();
                            self.dialog = false    ;
                            
                                // if(self.editChanel.active === 1){
                                //     self.channelStatus = 'Active'
                                // }else{
                                //     self.channelStatus = 'Inactive'
                                // }
                                
                                // const formData={
                                // channelName :self.editedItem.chanelName,
                                // channel_code: self.editedItem.channelCode,
                                // _id: self.editedItem.channelCode,
                                // channelStatus:self.channelStatus,
                                
                                // }
                                // self.chanelResponse.push(formData)
                                this.showToast('Channel created Successfully','success')
                                this.Getchannel();
                        }else{
                           this.showToast('Something went wrong','error') 
                        }
              })

                // this.close()
            }

             

                
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
.bgclr{
    background-color: #FAFAFA;
}

.thebtn{
      display:flex;
     align-items:center; 
     color:white;
     border-radius:5px;
     font-size:15px;
}
    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
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
      }
</style>
