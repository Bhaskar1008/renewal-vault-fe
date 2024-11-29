<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
                <v-layout row  justify-space-between class="pr-3 pl-3 pt-3 bgclrsource">
                            <v-flex>
                                <v-btn round depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addChannel()">
                                    add Affiliate
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn>
                                </v-flex>
                            <v-flex xs10 sm6 md4 class="">
                                <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                height="30px"></v-text-field>                            
                            </v-flex>
                    </v-layout>
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3 white" style="flex-flow:column wrap">
                    <!-- <v-text class=" headline font-weight-bold">Affiliate Master</v-text>
                    <hr> -->

                    <v-layout row justify-center>
               
                    <v-flex justify-center md11 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">Affiliate Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="objmethod"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <!-- | filterid('C') -->
                            <td class="">{{props.item.code }}</td>
                            <td class="">{{props.item.name}}</td>
                            <!-- <td class="">{{props.item.AffiliateStatus}}</td> -->
                            <td class=""> <span class="status" :style="{color: props.item.AffiliateStatus == 'Active' ? '#13961c' : '#d61111'}" >{{props.item.AffiliateStatus == undefined ? "-" : props.item.AffiliateStatus }} </span></td>
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
                                <v-text-field  counter="50" maxlength="50" :readonly="disafname" v-model="editedItem.AffiliateName" label="Affiliate Name"></v-text-field>
                            </v-flex>
                            <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.AffiliateID" disabled label="Affiliate Code"></v-text-field>
                            </v-flex> -->
                            <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.AffiliateStatus" :items="chnlstatus" item-text="text" label="Status" ></v-select>                                
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

var index = 0; // used for put api
export default {

    created(){
            this.Getchannel(0);
            let agetdetails = {}
              this.$store.commit('SET_PAGE_TITLE','Affilitate Master');
            // agetdetails = this.getAgentInfo()
            // console.log("agentID Check",agetdetails)
            // this.UserID
    },
    mounted(){
        this.headers.map(e =>{
                    e.sortable = false;
        })
    },

    data(){
        return{
            disaffname:false,
            page:1,
            skip:0,
            skipdiffrence:this.paginationdiff(),
            disafname:false,
            dialog: false,
            btnname:'',
            pagination: {},
            pageLength:0,
            value:'',
            affiliateresponse:[],
            chanelResponse:[],
            // chnelstatus:[],
            editChanel:{},
            editaffiliateresponse:{},
            TableIndex:'',
            headers:[
                        {text: 'Affiliate ID', value: 'AffiliateID'},
                        {text: 'Affiliate Name', value: 'AffiliateName'},
                        {text: 'Affiliate Status', value: 'AffiliateStatus'},
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
                AffiliateName:'',
                AffiliateID:'',
                AffiliateStatus:'',
               
            },
            defaultItem: {
                AffiliateName:'',
                AffiliateID:'',
                AffiliateStatus:'',
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
       return this.affiliateresponse.filter(function(cust){return cust.name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || cust.createdBy.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || cust.createdBy.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || cust.updatedBy.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || cust.updatedBy.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        // || cust.AffiliateStatus.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || self.filteridf(cust._id).toLowerCase().indexOf(self.value.toLowerCase()) >=0 
        
         });
       //return this.customers;
    },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Affiliate' : 'Edit Affiliate'
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
       },
       filterid(id) {
           try {
               if (id == null || id == undefined || id == "") { return id; }
               return 'C' + id.slice(16, 25).toUpperCase();
           } catch (err) { return id; }
       },
       
   },

  


    methods:{
        //n99
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



        
        //This function is used for Serach the Affiliate With ID.
         filteridf(id) {
           try {
               if (id == null || id == undefined || id == "") { return id; }
               return 'C' + id.slice(16, 25).toUpperCase();
           } catch (err) { return id; }
       },
        
        Searchdatatable (e) {

            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
            },
            //af99
            Getchannel(skip){
                let self = this;
            // this.GET('getprodCategory?filter='+filter, function(res, error) {

                 this.GET('fetch_affiliate?filter=0'+'&skip='+skip , function(res,error){
                    //    console.log('GET CHANEL DATA',res.data.errMsg);
                    // this.chanelResponse = res.data.errMsg
                    // console.log('CHANEL REPONSE',this.chanelResponse)
                    // console.log('GET affiliate DATA', res.data.errMsg[1] );
                    //Pagination from here
                    var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].totalCount
                    console.log('Page Length:',totalCount)
                    self.pageLength = Math.ceil(totalCount/self.skipdiffrence)

                    res.data.errMsg.forEach( element => {
                        element.AffiliateStatus = '';
                    });

                    self.affiliateresponse = res.data.errMsg[0]
                    console.log('Affiliate REPONSE',self.affiliateresponse)
                    
                    for( var i=0; i <= self.affiliateresponse.length; i++){
                        // console.log('active==>',self.branchResponse[i].active)
                        // let branchDetails =[]
                        if(self.affiliateresponse[i].status === 1){
                            // console.log('active==>',self.branchResponse[i].active)
                            self.affiliateresponse[i].AffiliateStatus = 'Active'
                           
                        }else if(self.affiliateresponse[i].status === 0){
                            self.affiliateresponse[i].AffiliateStatus = 'InActive'
                           
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
            this.disafname = false;
            this.btnname = 'Add';
            this.editedItem.AffiliateName = '';
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
            this.disafname =true
            this.editedIndex = 1;
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            // _index = i;
            this.btnname = 'Update' 
               
            this.dialog = true
            var itemsaffiliate = item;
            console.log("new item is",itemsaffiliate)
            this.editedItem.AffiliateName = itemsaffiliate.name;
            this.editedItem.AffiliateID = itemsaffiliate._id;
            this.editedItem.AffiliateStatus = itemsaffiliate.status === 1 ? this.chnlstatus[1] : this.chnlstatus[0];
           
        
        },

        editChanl(item){
            
            // console.log('CHANNEL CODE',this.editedItem.channelStatus)
            let status = null
            if(this.editedItem.AffiliateStatus === 'Active'){
                status = 1
            }else if(this.editedItem.AffiliateStatus === 'InActive'){
                status = 0
            }
             this.PUT( 'update_affiliate',
             {              
                    affiliateName: this.editedItem.AffiliateName,
                    id:this.editedItem.AffiliateID, 
                    status: status,                   
                    userId: this.getAgentInfo()._id

                        
             },(res , error) => {
                   if(res.data.errCode === -1){
                   console.log('PUT DATABASE RESPONSE',res.data.errMsg);
                    this.editaffiliateresponse = res.data.errMsg

                //    console.log("Response is from server ",res.data.errMsg);
                 
                  var len = res.data.errMsg.length
                  console.log("After EDIT",len)
                this.$store.commit('SET_AFFILIATE_DETAILS',this.editaffiliateresponse);
                //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})  
                this.showToast('AFFILIATE Updated Successfully','success')
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


        save(){

           
             let self = this;

             if(/^\s+$/g.test(self.editedItem.AffiliateName)){
                        self.showToast('Affiliate Name should not be empty', self.TOST().WARNING);
                        return
            }
            else{

                // Post API hit
                // console.log('CHANEL NAME',this.editedItem.channelName),
                console.log('Active InActive ::: ',this.editedItem.AffiliateStatus);
                let code = null;
                if(this.editedItem.AffiliateStatus === "InActive") {
                    code = 0;
                } else if(this.editedItem.AffiliateStatus === "Active") {
                    code = 1;
                }
                let sendData = {
                    affiliateName: self.editedItem.AffiliateName,
                    userId: this.getAgentInfo()._id ,
                    status: code
                }

                console.log('POP sending data: ', sendData);
                // this.POST('AddprodCategoryMaster/'+this.user_id, sendData, (res, error) => {              
              this.POST('create_affiliate',sendData , (res , error) => {
                     console.log('POST DATA',res.data.errMsg[0]);
                        if(res.data.errCode === -1){
                            self.editaffiliateresponse = res.data.errMsg[0];
                            console.log('Response Data',self.editaffiliateresponse)
                            self.$store.commit('SET_AFFILIATE_DETAILS',self.editaffiliateresponse);
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
                                this.showToast('Affiliate created Successfully','success')
                                this.Getchannel();
                        }else{
                             if(res.data.errCode == 313 ){
                                this.showToast('Affiliate Name should not be empty', self.TOST().WARNING);
                        }
                        //    this.showToast('Something went wrong','error') 
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
    .bgclrsource{
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
              margin-right: 15px;              
          }
      }
</style>
