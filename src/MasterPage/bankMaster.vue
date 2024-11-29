<template>
    <v-app>
        <!-- <v-content> -->
            <v-card flat>
            <v-layout row wrap >

                <v-flex class="ml-5 mr-5" style="flex-flow:column wrap">
                    <v-card  row wrap class="pb-4 pt-1">
                        <v-card flat class="pt-2 pl-3 pr-3" style="background-color:#fafafa;" > 
                            <v-layout row wrap mt-1 justify-space-between>
<div style="display:flex; flex-direction:row;">
                            <h3 class="mt-2">To bulk upload Bank details:</h3>                
                            <v-flex class="ml-5">
                                <v-btn depressed medium color="blue-grey" class="white--text br-radius">
                                    sample file
                                    <v-icon right dark>get_app</v-icon>
                                </v-btn>
                            <v-btn depressed medium color="primary" class="white--text br-radius">
                                upload file
                                <v-icon dark right>publish</v-icon>
                            </v-btn>
                            </v-flex>
</div>

<div style="display:flex; flex-direction:row;">
                             <h3 class="mt-2">To bulk modify Bank details:</h3>                
                            <v-flex class="ml-5">
                                <v-btn depressed medium color="blue-grey" class="white--text br-radius">
                                    existing data
                                    <v-icon right dark>get_app</v-icon>
                                </v-btn>
                            <v-btn depressed medium color="primary" class="white--text br-radius">
                                upload file
                                <v-icon dark right>publish</v-icon>
                            </v-btn>
                            </v-flex>
</div>
                        </v-layout>

                        <v-layout row wrap mt-2>
                            <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                                    <!-- <v-select v-model="channeldatafilter" 
                                        :items="channeldataall"  
                                        item-text="text" 
                                        item-value="value" 
                                        label="Channel"
                                        @change="channelfilters">  @change="channelfilters"
                                    </v-select> -->
                                    <v-select v-model="channeldatafilter" 
                                            :items="channeldataall"  
                                            item-text="text" 
                                            item-value="value" 
                                            label="Channel"
                                           >
                                    </v-select>

                            </v-flex>

                        <v-flex  class="add-branch-btn mt-2">
                            <v-btn depressed medium color="primary" class="white--text br-radius" @click.native="addBank()">
                                add bank
                                <v-icon dark right>add_circle</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex xs10 sm6 md2 class="ml-3" >
                               <!-- @input="Searchdatatable" v-model="value" -->
                                    <v-text-field 
                                    label="Search" append-icon="search"
                                    height="30px"></v-text-field>                            
                        </v-flex>
                        </v-layout>
                    </v-card>
                
                      

                    <v-layout row justify-center>
               
                    <v-flex xs10 sm12 md6 mt-3 >
                        <h3 class="text-xs-center mb-3">Bank Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="bankResponse"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.bankName}}</td>
                            <td class="">{{props.item.channelCode.channelName == null ? "-" : props.item.channelCode.channelName}}</td>
                            <td>  <span  class="status" :style="{color: props.item.channelStatus== 'Active' ? '#13961c' : '#d61111'}">    {{props.item.channelStatus}} </span></td>
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
                                <v-text-field v-model="editedItem.bankName" label="Bank Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <!-- <v-text-field v-model="editedItem.chanelId" label="Channel Code"></v-text-field> -->
                                <v-select v-model="editedItem.chanelId" :items="itemsBank"  item-text="text" item-value="value" label="Channel Code"></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select @change="selectchStatus()" v-model="editedItem.bankStatus" :items="chnlstatus" item-text="text" item-value="value" label="Status" ></v-select>                                
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


                     <!-- <div class="text-xs-center pagination">
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination>
                        </div>  -->
                    </v-card>
                </v-flex>    
            </v-layout> 
            </v-card>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>

import axios from 'axios' 
import loadChannel from '../common/onProjectLoad.js' 

var index = 0; // used for put api
export default {

    created(){


            
                // this.channeldatafilter = 'all'
            // this.GetRole(this.channeldatafilter);





                this.$store.commit('SET_PAGE_TITLE','Bank Master');     
                this.bankStore = this.$store.state.chanelDetails

                //  for(let i = 0; i <  this.bankStore.length; i++){
                //         let data={
                //             text : this.bankStore[i].channelName,
                //             value : this.bankStore[i]._id,
                //         }
                //         this.itemsBank.push(data)
                //         console.log("itemsBank is->", this.itemsBank);
                        // console.log('ITEMS BANK 1:',this.itemsBank)
                // }

                loadChannel.getChannel(this, res => {
                    console.log("mixin channel ==================>" , res)

                    let channelalldata=[]

                    for(let i =0;i<res.length;i++){
                            
                        if(res[i].active === 1){
                            let channetobj ={
                                text:res[i].channelName,
                                value:res[i]._id
                            }
                             this.itemsBank.push(channetobj)
                            this.channeldataall.push(channetobj);
                            console.log('array for channel ->', this.channeldataall);
                        }
                    }

                   
                })


                this.getBankResp();
    },

     // mounted(){
    //     this.getbankpage(this.pagetab)
    // },


    data(){
        return{
            channeldataall:[],
            channeldatafilter:'',
            pagetab:0,            
            pageLength:3,
            bankpagedata:[],

             bankStore:[],
            itemsBank:[],
            dialog: false,
            btnname:'',
            bankResponse:[],
            // chnelstatus:[],
            itemsBank:[],
            editBank:{},
            bankData:[],
            TableIndex:'',
            headers:[
                        {text: 'Bank Name', value: 'bankName'},
                        {text: 'Channel Name', value: 'chanelId'},
                        {text: 'Bank Status', value: 'bankStatus'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
            tableData: [],
                editedIndex: -1,
         editedItem: {
                bankName:'',
                chanelId:'',
                bankStatus:'',
            },
            defaultItem: {
                bankName:'',
                chanelId:'',
                bankStatus:'',
            },
            chnlstatus:[{text:'InActive',value:0}, {text:'Active',value:1}],
            bnkstatusIndex:''
                
        }
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Bank' : 'Edit Bank  '
        },

         value() {
           console.log(this.value);
       }
    },
    methods:{

        getbankpage(e){
        this.pagetab = e
        console.log("Page skip",this.pagetab)
         var user = this.$store.state.userId
      // http://172.16.57.188:5010/secure/user/getmyAttendance/5bbcc632835e564e267bd1cd?sortBy=604800000&skip=0
       axios.get(this.API_Service()+'getmyAttendance/'+user+'?sortBy=604800000&skip='+this.pagetab).then(
            res => {
                   
                this.bankpagedata = res.data.errMsg[0]
                var pageLen = res.data.errMsg[1]
                let totalCount;
                this.totalCount = pageLen[0].totalCount
                console.log('User Atten REPONSE:',this.bankpagedata)
                   console.log('Page Length:',this.totalCount)
                   this.pageLength = Math.ceil(this.totalCount/10)
                    // let i=0;
                  //  let f_nme = this.userAttendance[0].first_name
                  //  console.log(f_nme)
                  //  let l_nme = this.userAttendance[0].last_name

                  //  this.name = f_nme + ' ' + l_nme
                  //  console.log(name)
               


            }
        ).catch(
            err => {
                console.log(err) ;
            }
        );
  
      },

          next(event){
          console.log("Next Page",event)
          this.pagetab = (event-1)*10
          this.getbankpage(this.pagetab)
        },

         selectchStatus(){
            this.bnkstatusIndex = this.chnlstatus.indexOf(this.editedItem.bankStatus)
            console.log('select==>',this.bnkstatusIndex)
            
        },

        getBankResp(){
            axios.get(this.API_Service_admin()+'getbankMaster?userId='+this.getAgentInfo()._id).then(
               res => {
               
                    res.data.errMsg.forEach( element => {
                        element.channelStatus = '';
                    });

                    this.bankResponse = res.data.errMsg
                    console.log('GET Bank REPONSE',this.bankResponse)

                     
                    
                    for( var i=0; i <= this.bankResponse.length; i++){
                        if(this.bankResponse[i].active === 1){
                            this.bankResponse[i].channelStatus = 'Active'
                           
                        }else{
                            this.bankResponse[i].channelStatus = 'InActive'
                           
                        }
                    }                   
               
               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
        },

        saveAndEdit(_btnname){
             if(_btnname == 'Add' )
            {
                this.save();
            } 
            else if(_btnname == 'Update'){
                this.editBankMaster();
            }
            },

        addBank(){
            this.btnname = 'Add';
            this.editedItem.bankName = '';
            this.editedItem.chanelId = '';
            this.editedItem.bankStatus = '';
            this.dialog = true;
        },


        editItem (item,i) {
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            // _index = i;
            this.btnname = 'Update' 
               
            this.dialog = true
            var itemsBank = item;
            console.log("new item is",itemsBank)
            this.editedItem.bankName = itemsBank.bankName;
            this.editedItem._id = itemsBank._id;
            this.editedItem.bankStatus = itemsBank.active;
            this.editedItem.chanelId = itemsBank.channelCode._id;
            
            
                console.log("update id",itemsBank._id)
        },

        editBankMaster(item){
            
            // console.log('CHANNEL CODE',this.editedItem.bankStatus)
                this.showLoader('Uploading', true);
                console.log("update id",item)

             axios.put(this.API_Service_admin()+'updateBankmaster/'+this.editedItem._id,
             {              
                    bank_Name: this.editedItem.bankName,
                    channel_Id: this.editedItem.chanelId, 
                    active:this.editedItem.bankStatus,                   
                    userId: this.getAgentInfo()._id
            }).then(
                 res => {
                        if(res.data.errCode !== -1){
                            this.showToast('Something went wrong', this.TOST().ERROR);
                            this.showLoader('Uploading', false);
                        }else if(res.data.errCode === -1){
                            console.log('DATABASE PUT RESPONSE',res.data.errMsg);
                            this.editBank = res.data.errMsg                 
                            var len = res.data.errMsg.length
                            console.log("After EDIT",len)
                            // this.$store.commit('SET_CHANEL_DETAILS',this.editBank);
                            Object.assign(this.bankResponse[this.TableIndex], this.editBank)
                            this.dialog = false

                            // this.showToast('API Hit Successfully', this.TOST().SUCCESS);
                            this.showLoader('Uploading', false);
                            this.getBankResp(); 
                        }
               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
            if(this.editBank.active === 1){
                    this.channelStatus = 'Active'
                }else{
                     this.channelStatus = 'Inactive'
                }

                //  const FormData={
                //     bank_Name:this.editedItem.bankName,
                //     _id:this.editedItem.chanelId,
                //      channelStatus:this.editedItem.bankStatus,

                //      }
                //       Object.assign(this.bankResponse[this.TableIndex], FormData)
        },

       

        deleteItem(index) {
        // const index = this.tableData.indexOf(item)
        // this.cfrDataObj.splice(index, 1);
        // confirm('Are you sure you want to delete this item?') && 
        this.bankResponse.splice(index, 1)
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
                console.log('Active InActive ::: ',this.editedItem.bankStatus);
                // let code = null;
                // if(this.editedItem.bankStatus === "InActive") {
                //     code = 1;
                // } else if(this.editedItem.bankStatus === "Active") {
                //     code = 1;
                // }
                let sendData = {
                    bank_Name: self.editedItem.bankName,
                    channel_Id: self.editedItem.chanelId,
                    active: self.editedItem.bankStatus
                }

                console.log('POP : ', sendData);
                    this.showLoader('Uploading', true);

                axios.post(this.API_Service_admin()+'addBankmaster/'+this.getAgentInfo()._id, sendData).then(
                    res => {

                         if(res.data.errCode !== -1){
                            self.showToast('Something went wrong', self.TOST().ERROR);
                            this.showLoader('Uploading', false);
                            Object.assign(this.bankResponse[this.editedIndex], this.editedItem)
                        }else if(res.data.errCode === -1){
                            self.editBank = res.data.errMsg;
                            console.log('Post Response Data',self.editBank)
                            // self.$store.commit('SET_CHANEL_DETAILS',self.editBank);
                            this.bankResponse.push(this.editedItem)
                            self.dialog = false    ;
                            
                                if(self.editBank.active === 1){
                                    self.channelStatus = 'Active'
                                }else{
                                    self.channelStatus = 'InActive'
                                }
                                                              
                                // this.showToast('API Hit Successfully', this.TOST().SUCCESS);
                                this.showLoader('Uploading', false); 
                                this.getBankResp();   
                        }   
                    }
                ).catch(
                    err => {
                        console.log(err) ;
                    }
                );
                
                },
    }
}
</script>
<style>

    .status{
     font-family:roboto; font-weight:500; letter-spacing:0.1px;
    }

    .br-radius{border-radius:6px;}

    .pagination{
            margin-top: 20px;
}

    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }
    .btn-size{
        width: 1000px
}
     @media screen and (min-width: 320px){

    .pagination{
                 margin-top: 20px;
}

     }
      @media screen and (min-width: 728px){
          .add-branch-btn{
              display: flex;
              justify-content: flex-end;
              margin-right: 15px;
          }

        .pagination{
                 margin-top: 20px;
}
      }
      @media screen and (min-width: 922px){
        .pagination{
                 margin-top: 20px;
}

          .add-branch-btn{
               display: flex;
              justify-content: flex-end;
              margin-right: 15px;              
          }
      }
</style>
