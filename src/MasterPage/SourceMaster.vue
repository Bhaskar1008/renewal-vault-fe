<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3" style="flex-flow:column wrap">
                    <!-- <v-text class=" headline font-weight-bold">Source Master</v-text>
                    <hr> -->
                        <v-layout row  justify-space-between class="mr-5 mt-3">
                            <v-flex class="white-lighten--4">
                                <v-btn round depressed medium slot="activator" color="primary" class="white--text" @click.native="addChannel()">
                                    Add New Source
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn>
                                </v-flex>
                            <v-flex xs10 sm6 md4 class=" mt-1">
                                <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                height="30px"></v-text-field>                            
                            </v-flex>
                    </v-layout>

                    <v-layout row justify-center>
               
                    <v-flex justify-center md11 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">Source Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="sourceresponse"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item._id | filterid('c')}}</td>
                            <td class="">{{props.item.name}}</td>
                            <td class="">{{props.item.sourceStatus}}</td>
                            <td class="">{{props.item.createdBy.first_name +' '+ props.item.createdBy.last_name}}</td>
                           <td class="">{{props.item.createdDate | formate-date}}</td>
                           <td class="">{{props.item.updatedBy.first_name +' '+ props.item.updatedBy.last_name}}</td>
                           <td class="">{{props.item.updatedDate | formate-date}}</td>


                            <td class="">
                                <v-icon small class="mr-2" @click="editItem(props.item,props.index)">edit</v-icon>
                                <v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon>
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
                                <v-text-field v-model="editedItem.sourceName" label="Source Name"></v-text-field>
                            </v-flex>
                            <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.channelCode" disabled label="Channel Code"></v-text-field>
                            </v-flex> -->
                            <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.channelStatus" :items="chnlstatus" item-text="text" label="Source Status" ></v-select>                                
                            </v-flex>
                            
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                    </v-dialog> 

                </v-flex>    
            </v-layout> 
            <div class="text-xs-center pagination">
                              <!-- <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination> -->
                    </div> 
            </v-card>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 

var index = 0; // used for put api
export default {

    created(){
          this.$store.commit('SET_PAGE_TITLE','Source Master');
        this.mapNewFields();
            this.Getchannel();
             
        this.uID =  this.getAgentInfo();
       
    },

    data(){
        return{
            globalindex:null,
            uID:null,
            dialog: false,
            btnname:'',
            pagination: {},
            pageLength:0,
            value:'',
            sourceresponse:[],
            chanelResponse:[],
            // chnelstatus:[],
            editChanel:{},
            TableIndex:'',
            headers:[
                        {text: 'Source ID', value: 'id'},
                        {text: 'Source Name', value: 'name'},
                        {text: 'Source Status', value: 'status'},
                        {text: 'Created By', value:'CreatedBy'},
                        {text: 'Created Date', value: 'CreatedDate'},
                        {text: 'Updated By', value: 'UpdatedBy'},
                        {text: 'Updated Date', value: 'UpdatedDate'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
            tableData: [],
                editedIndex: -1,
                editedItem: {
                sourceName: '',
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
                sourceName: '',
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

    Sendtoglobalindex(i){
        console.log("GLobal Index Fired::>")
        this.globalindex = i
        console.log("Global Index is >>>",  this.globalindex);
    },


    methods:{

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
                    channelName: e.channelCode.channelName,
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

            Getchannel(){
                 this.GET('fetch_lead_sources?filter=0',res => {
                //    console.log('GET CHANEL DATA',res.data.errMsg);
                    // this.chanelResponse = res.data.errMsg
                    // console.log('CHANEL REPONSE',this.chanelResponse)

                    console.log('GET SOURCE DATA', res.data.errMsg );
                    res.data.errMsg.forEach( element => {
                        element.sourceStatus = '';
                    });

                    this.sourceresponse = res.data.errMsg
                    console.log('Source REPONSE',this.sourceresponse)
                    
                    for( var i=0; i <= this.sourceresponse.length; i++){
                        // console.log('active==>',this.branchResponse[i].active)
                        // let branchDetails =[]
                        if(this.sourceresponse[i].status === 1){
                            // console.log('active==>',this.branchResponse[i].active)
                            this.sourceresponse[i].sourceStatus = 'Active'
                           
                        }else if(this.sourceresponse[i].status === 0){
                            this.sourceresponse[i].sourceStatus = 'InActive'
                           
                        }
                    }
               
               }
           );
            },
        //  selectchStatus(){
        //     this.chnlstatusIndex = this.chnlstatus.indexOf(this.editedItem.channelStatus)
        //     console.log('select==>',this.chnlstatusIndex)
            
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
            this.btnname = 'Add';
         
              this.editedItem.sourceName = '';
          
            // this.editedItem.channelCode = '';
            this.editedItem.channelStatus = '';
                // this.editedItem.categroyStatus = '';
            this.dialog = true;
        },


        editItem (item,i) {
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            // _index = i;
            this.Sendtoglobalindex(i);
            console.log("Preserved Table Index", this.TableIndex);
            this.btnname = 'Update' 
               
            this.dialog = true
            var itemsChanel = item;
            console.log("new item is",itemsChanel);
            this.editedItem.sourceName = itemsChanel.name;
            // this.editedItem.channelCode = itemsChanel.channelCode;
            this.editedItem.channelStatus = itemsChanel.status === 1 ? this.chnlstatus[1] : this.chnlstatus[0];
            this.editchanneiId = itemsChanel._id
        },

        editChanl(item){
            // console.log('CHANNEL CODE',this.editedItem.channelStatus)
            let status = null
            if(this.editedItem.channelStatus === 'Active'){
                status =1
            }else if(this.editedItem.channelStatus === 'InActive'){
                status =0
            }
             this.PUT('update_lead_source/',
             {     
                //    status:  status,
                   status: status,    
                   channel_name: this.editedItem.sourceName,
                   userId:  this.uID._id,
                   id: this.editchanneiId

             },res => {
                     if(res.data.errCode === -1){
                    console.log('DATABASE RESPONSE',res.data.errMsg);
                    this.editChanel = res.data.errMsg

                //    console.log("Response is from server ",res.data.errMsg);
                 
                  var len = res.data.errMsg.length
                  console.log("After EDIT",len)
                  this.$store.commit('SET_CHANEL_DETAILS',this.editChanel);
                //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})  
                this.showToast(' Updated Successfully','success');
                let passedid = this.editchanneiId;
                let index = i;
                this.fetchById(passedid, index); 
                    this.dialog = false
                     }else{
                        this.showToast('Something went wrong','error')
                     }
               }
           )
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

        save(){
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
                   sourceName: this.editedItem.sourceName,
                    // sequence: this.editedItem.sequence,
                    // channelCode: this.channelCode,
                    status: code,
                    userId: this.uID._id,
                }

                console.log('POP : ', sendData);
                
              this.POST('create_source', sendData,res => {
                        //    console.log('POST CHANEL DATA',res.data.errMsg);
                        if(res.data.errCode === -1){
                            self.editChanel = res.data.errMsg;
                            console.log('Response Data',self.editChanel)
                            self.$store.commit('SET_CHANEL_DETAILS',self.editChanel);
                            // self.updateChnl();
                            self.dialog = false ;
                                        
                                // if(self.editChanel.active === 1){
                                //     self.channelStatus = 'Active'
                                // }else{
                                //     self.channelStatus = 'Inactive'
                                // }
                                // console.log(sendData);
                                
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
                            
                    }
                );
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
