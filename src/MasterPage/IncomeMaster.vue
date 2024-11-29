<template>
    <v-app>
        <!-- <v-content> -->

            <v-card>
                  <v-layout class="bgclrsrc pl-3 pt-3 ">
                        <v-layout row  justify-space-between class="mr-5">
                            <v-flex>
                                <v-btn round depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addChannel()">
                                    add Income Group
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn>
                                </v-flex>
                            <v-flex xs10 md3 class="">
                                <v-text-field
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search"
                                append-icon="search"
                                height="30px"></v-text-field>
                            </v-flex>
                    </v-layout>

                    </v-layout>
            <v-layout row wrap >
                <v-flex class="ml-2 " style="flex-flow:column wrap ">
                    <!-- <v-text class=" headline font-weight-bold">Income Group Master</v-text>
                    <hr> -->

                    <v-layout row justify-center>

                    <v-flex justify-center md11 ml-3 >
                        <h3 class="text-xs-center mb-3">Income Group Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="objmethod"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">

                            <!-- <td class="">{{props.item._id | filterid('C')}}</td> -->
                            <td class="">{{props.item.code}}</td>
                           <td class="">{{props.item.incomeGroupName}}</td>
                           <td class=""> <span class="status" :style="{color: props.item.incomeGroupStatus == 'Active' ? '#13961c' : '#d61111'}" >{{props.item.incomeGroupStatus}} </span></td>
                           <td class="">{{props.item.createdBy.first_name == undefined ? "-" : props.item.createdBy.first_name  +' '+ props.item.createdBy.last_name == undefined ? "-" : props.item.createdBy.last_name }}</td>
                           <td class="">{{props.item.createdDate | formate-date}}</td>
                           <td class="">{{props.item.updatedBy.first_name == undefined ? "-" : props.item.updatedBy.first_name +' '+ props.item.updatedBy.last_name  == undefined ? "-" : props.item.updatedBy.last_name }}</td>
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
                                <v-text-field 
                                  @change="income_valid(editedItem.incomeGroupName, 5, 'incomeGroupName')"
                                  counter="50" maxlength="50" v-model="editedItem.incomeGroupName" label="Income Group Name"></v-text-field>
                            </v-flex>
                            <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.DocumentsCode" label="Documents Code"></v-text-field>
                            </v-flex> -->
                            <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.incomeGroupStatus" :items="chnlstatus" item-text="text" label="Status" ></v-select>
                            </v-flex>

                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn  :disabled="disinadd" depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
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
        editedItem:{
            incomeGroupName:{
                required,
                minLength: minLength(2)
            }
        },


    },

    created(){
          this.$store.commit('SET_PAGE_TITLE','Income Master');
            this.Getchannel(1);
            let agetdetails = {}
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
            page:1,
            skipdiffrence:this.paginationdiff(),
            skip:0,
            disinadd:false,
            dialog: false,
            btnname:'',
            pagination: {},
            pageLength:0,
            value:'',
            incomegroupsresponse:[],
            chanelResponse:[],
            // chnelstatus:[],
            editChanel:{},
            editincomegroup:{},
            TableIndex:'',
            headers:[
                        {text: 'Income Group ID', value: 'DocumentsID'},
                        {text: 'Income Group Name', value: 'incomeGroupName'},
                        // {text: 'Documents Code', value: 'DocumentsCode'},
                        {text: 'Income Group Status', value: 'DocumentsStatus'},
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
                incomeGroupName:'',
                incomeGroupID:'',
                incomeGroupStatus:'',

            },
            defaultItem: {
                incomeGroupName:'',
                incomeGroupID:'',
                incomeGroupStatus:'',
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
       return this.incomegroupsresponse.filter(function(cust){return cust.incomeGroupName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
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
            return this.editedIndex === -1 ? 'New Income Group' : 'Edit Income Group'
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

    income_valid(data, type, field){

        var self = this                
        this.validate_alpha_numeric(data, type, (res, datanew)=>{
            if(res == true){ 
                self.editedItem[field] = datanew
                self.$forceUpdate();
                return
            }
        })

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
            //gi99
            Getchannel(skip){
                let self = this;
                 self.GET('fetch_income_groups?filter=0'+'&skip='+skip , function (res , error){
                       //    console.log('GET CHANEL DATA',res.data.errMsg);
                    // self.chanelResponse = res.data.errMsg
                    // console.log('CHANEL REPONSE',self.chanelResponse)


                    console.log('GET Income master DATA', res.data.errMsg );

                    var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].totalCount
                    console.log('Page Length:',totalCount)
                    self.pageLength = Math.ceil(totalCount/self.skipdiffrence)

                    res.data.errMsg.forEach( element => {
                        element.incomeGroupStatus = '';
                    });

                    self.incomegroupsresponse = res.data.errMsg[0]
                    console.log('income group REPONSE',self.incomegroupsresponse)

                    for( var i=0; i <= self.incomegroupsresponse.length; i++){
                        // console.log('active==>',self.branchResponse[i].active)
                        // let branchDetails =[]

                         if(self.incomegroupsresponse[i].hasOwnProperty('updatedBy') ){
                               self.incomegroupsresponse[i].updatedBy.first_name = self.incomegroupsresponse[i].updatedBy.first_name
                               self.incomegroupsresponse[i].updatedBy.last_name  = self.incomegroupsresponse[i].updatedBy.last_name
                               self.incomegroupsresponse[i].updatedDate = self.incomegroupsresponse[i].updatedDate
                            }else{
                            let updatedBy = {
                                updatedBy: {
                                    first_name:" - ",
                                    last_name:""
                                }
                            }
                            let temp = Object.assign(updatedBy, self.incomegroupsresponse[i]);

                            self.incomegroupsresponse[i] = temp;
                            }






                        if(self.incomegroupsresponse[i].status === 1){
                            // console.log('active==>',self.branchResponse[i].active)
                            self.incomegroupsresponse[i].incomeGroupStatus = 'Active'

                        }else if(self.incomegroupsresponse[i].status === 0){
                            self.incomegroupsresponse[i].incomeGroupStatus = 'InActive'

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
            this.btnname = 'Add';
            this.editedItem.incomeGroupName = '';
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
            this.disinadd = false;
        },


        editItem (item,i) {
            this.editedIndex = 1;
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            // _index = i;
            this.btnname = 'Update'
            this.disinadd = false;

            this.dialog = true
            var itemsincome = item;
            console.log("income new item is",itemsincome)
            this.editedItem.incomeGroupName = itemsincome.incomeGroupName;
            // this.editedItem.DocumentsCode = itemsincome.documentCode;
            this.editedItem.incomeGroupID = itemsincome._id;
            this.editedItem.incomeGroupStatus = itemsincome.status === 1 ? this.chnlstatus[1] : this.chnlstatus[0];

                // incomeGroupName:'',
                // incomeGroupID:'',
                // incomeGroupStatus:'',
        },

        editChanl(item){

            // console.log('CHANNEL CODE',this.editedItem.channelStatus)
            let status = null
            if(this.editedItem.incomeGroupStatus === 'Active'){
                status = 1
            }else if(this.editedItem.incomeGroupStatus === 'InActive'){
                status = 0
            }
             this.PUT('update_income_group',
             {
                    incomeGroupName: this.editedItem.incomeGroupName,
                    id:this.editedItem.incomeGroupID,
                    status: status,
                    userId: this.getAgentInfo()._id


             }, (res , error) =>{

                    if(res.data.errCode === -1){
                    console.log('PUT DATABASE RESPONSE',res.data.errMsg);
                    this.editincomegroup = res.data.errMsg

                    //    console.log("Response is from server ",res.data.errMsg);

                    var len = res.data.errMsg.length
                    console.log("After EDIT",len)
                    this.$store.commit('SET_AFFILIATE_DETAILS',this.editincomegroup);
                    //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})
                    this.showToast('Income Group Updated Successfully','success')
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

            if(/^\s+$/g.test(this.editedItem.incomeGroupName)){
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                  this.disinadd = false;
                    return
            }else if(this.$v.$invalid == true){
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                  this.disinadd = false;
                    return
            }else{
                console.log("Regular flow execute")

                this.disinadd = true;
                let self = this;
                // Post API hit
                // console.log('CHANEL NAME',this.editedItem.channelName),
                console.log('Active InActive ::: ',this.editedItem.DocumentsStatus);
                let code = null;
                if(this.editedItem.incomeGroupStatus === "InActive") {
                    code = 0;
                } else if(this.editedItem.incomeGroupStatus === "Active") {
                    code = 1;
                }


                let sendData = {
                    incomeGroupName: self.editedItem.incomeGroupName,
                    status: code,
                    userId: this.getAgentInfo()._id ,
                }

                // incomeGroupName:'',
                // incomeGroupID:'',
                // incomeGroupStatus:'',

                console.log('POP sending data: ', sendData);

              this.POST('create_income_group',sendData , (res , error)=>{

                     //    console.log('POST CHANEL DATA',res.data.errMsg);
                        if(res.data.errCode === -1){
                            self.editincomegroup = res.data.errMsg;
                            console.log('Response Data',self.editincomegroup)
                            self.$store.commit('SET_AFFILIATE_DETAILS',self.editincomegroup);
                            // self.updateChnl();
                            self.dialog = false ;

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
                                this.showToast('new Income Group created Successfully','success')
                                this.Getchannel();
                        }else{
                           this.showToast('Something went wrong','error')
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

.bgclrsrc{
    background-color: #fafafa;
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
