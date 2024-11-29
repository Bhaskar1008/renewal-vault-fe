<template>
    <v-app>
        <!-- <v-content> -->
    <v-card>
     <v-layout row wrap >
         <v-card flat style="background-color:#FAFAFA; width:100%;">
                  <v-layout class="pt-4 ml-3 mr-3 " >
                    <v-flex xs10 sm6 md2 class=" mr-4">
                            <v-select v-model="channeldatafilter"
                                    :items="channeldataall"
                                    item-text="text"
                                    item-value="value"
                                    label="Channel"
                                    @change="channelfilters(channeldatafilter, 1)">
                            </v-select>
                    </v-flex>
                    <v-flex> </v-flex>
                     <v-btn  depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addrole()">
                                    add KPI Main Category
                                    <v-icon dark right>add_circle</v-icon>
                     </v-btn>

                     <!-- <v-menu transition="slide-y-transition" >
                                <v-btn  depressed medium slot="activator" color="secondary" class="white--text thebtn">
                                    Bulk Upload/Modify
                                    <v-icon dark right>publish</v-icon>
                                </v-btn>
                                <v-list>
                                    <v-list-tile>
                                        <v-btn flat color="secondary" @click="addUser()">Bulk Upload</v-btn>
                                    </v-list-tile>
                                    <v-list-tile >
                                        <v-btn flat color="secondary"  @click="dialogBulkUpld = true">Bulk Modify</v-btn>
                                    </v-list-tile>
                                </v-list>
                     </v-menu> -->
                    <!-- <v-flex xs10 sm6 md2 class="ml-3 ">
                                <v-text-field
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search"
                                append-icon="search"
                                height="30px"></v-text-field>
                    </v-flex> -->
                   </v-layout>
            </v-card>

        <v-flex class="ml-3 mr-3 mt-2 mb-4" style="flex-flow:column wrap; width:97%;">
                    <!-- <v-text class="headline font-weight-bold">Role Master</v-text>
                  -->
                        <v-layout row justify-space-between>
                            <!-- do not delete this line -->
                        <v-flex xs2></v-flex>

                    <v-flex justify-center md11 ml-3 mt-3>
                        <h3 class="text-xs-center mb-3">KPI Main Category</h3>
                        <v-data-table
                        :headers="headers"
                        :items="getresponse"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">

                            <td class="">{{props.item.categoryName}}</td>
                            <td class="">{{props.item.hasOwnProperty('channel') != true ? '-' : props.item.channel.channelName  }}</td>
                            <td class="">{{props.item.categoryId}}</td>
                            <!-- <td class="">{{props.item.channelCode.channelName}}</td> -->
                            <!-- <td > <span class="status" :style="{color: props.item.status == 1 ? '#13961c' : '#d61111'}"> {{props.item.status == 1 ? "Active" : "Inactive" }} </span> </td> -->
                             <td class="">Admin Imran</td>
                               <td class="">Admin Imran</td>
                            <!-- <td class="">{{props.item.branch_name}}</td>
                            <td class="">{{props.item.area}}</td>
                            <td class="">{{props.item.city_name}}</td>
                            <td class="">{{props.item.state_name}}</td>
                            <td class="">{{props.item.region_name}}</td>
                            <td class="">{{props.item.zone_name}}</td> -->
                            <td class="justify-center layout px-0">
                                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                                <!-- <v-icon small >delete</v-icon> -->
                                <!-- @click="deleteItem(props.item)" -->
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
                <v-flex xs2></v-flex>
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
                                <v-select
                                        :error-messages="check_ch"
                                        v-model="cat_ch"
                                        :items="channeldata"
                                        item-text="text"
                                        item-value="value"
                                        label="Channel"
                                        required
                                        @change="channelfilters(cat_ch, 2)">
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                            <v-text-field
                                    required
                                    :error-messages="check_name"
                                    counter="50" maxlength="50" v-model="editedItem.rolename" label="Main Category *"></v-text-field>
                            </v-flex>
                            <!-- <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.rolestatus"  :items="itemActive" item-text="text" item-value="value" label="Status"></v-select>
                            </v-flex>  -->


                            <!-- <p>{{typeof editedItem.rolestatus}}</p> -->
                            <!-- <v-flex xs12 sm6 md6>
                                <v-select  :readonly="disrolecode" v-model="editedItem.channel" @change="setchannel" :items="channeldata" item-text="text" item-value="value" label="Status"></v-select>
                            </v-flex> -->

                            <!-- <v-flex xs12 sm6 md6>
                                <v-text-field counter="20" maxlength="20" :readonly="disrolecode" v-model="editedItem.rolecode" label="Role Code"></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.rolestatus"  :items="itemActive" item-text="text" item-value="value" label="Role Status"></v-select>
                            </v-flex> -->

                             <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.branch_name" label="Branch Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.area" label="Area"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.city_name" label="City Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.state_name" label="State Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.region_name" label="Region Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.zone_name" label="Zone Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6 >
                                <p>Status</p>
                                <v-overflow-btn :items="status" label="Status" target="#dropdown-example"></v-overflow-btn>
                            </v-flex> -->

                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click="close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary" @click="saveAndEditBtn(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                    </v-dialog>

                </v-flex>
            </v-layout>
            <div class="text-xs-center pagination" v-if="getresponse.length > 0" >
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
import loadChannel from '../common/onProjectLoad.js'
import { required, minLength } from 'vuelidate/lib/validators'


export default {

    validations: {
        editedItem:{
            rolename:{
                required,
                minLength: minLength(2)
            },
        },



    },
    mounted(){
        this.headers.map(e =>{
                    e.sortable = false;
        })
    },
    data(){
        return{
            popupTitle:"",
            check_ch:[],
            cat_ch:"",
            rname: false,
            doc_id:"",
            disrolecode: false,
            dialog: false,
            postdata:'',
            pagination: {},
            pageLength:0,
            page:1,
            skip:0,
            skipdiffrence:this.paginationdiff(),
            channeldatafilter:'all',
            editrole:'',
            btnname:'',

            statusIndex:'',
            channeldataall:[],
            // ChannelFilter:'all',
            value:'',
            status:['InActive','Active'],
            getresponse:[],
            headers:[
                        {text: 'Category Name', value: 'categoryName'},
                        {text: 'Channel', value: 'channel'},
                        {text: 'Category ID', value: 'categoryid'},
                        // {text: 'Status', value: 'status'},
                        {text: 'Created by', value: 'createdby'},
                        {text: 'Updated by', value: 'updatedby'},
                        {text: 'Action', value: 'action'},
                        // {text: 'Area', value: 'area'},
                        // {text: 'City Name', value: 'city_name'},
                        // {text: 'State Name', value: 'state_name'},
                        // {text: 'Region Name', value: 'region_name'},
                        // {text: 'Zone Name', value: 'zone_name'},

                ],
                // itemActivedata:[],
                itemActive:[
                    {text: 'Active', value: 1},
                    {text: 'InActive', value: 0},
                ],
            tableData: [],
                editedIndex: -1,
                editedItem: {
                rolename:'',
                rolecode:'',
                rolestatus:'',
                statusSelected:'',
                channel:'',
                // branch_name:'',
                // area:'',
                // city_name:'',
                // state_name:'',
                // region_name:'',
                // zone_name:'',
            },
            defaultItem: {
                rolename:'',
                rolecode:'',
                rolestatus:'',
                statusSelected:'',
                // branch_name:'',
                // area:'',
                // city_name:'',
                // state_name:'',
                // region_name:'',
                // zone_name:'',

            },
            status:['Active','InActive'],
            actStatus:'',
            channeldata:[],


        }
    },

           created(){
                 this.$store.commit('SET_PAGE_TITLE','KPI Main Category');
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

                this.GetRole('all', 0);
        },

    computed: {

        check_name(){

                if(this.editedItem.rolename.length > 0){
                    if(/^[a-zA-z \s]+$/g.test(this.editedItem.rolename) != true){
                        this.rname = true
                        return "Only alphabets are allowed"
                    }else{
                        this.rname = false
                        return []
                    }
                }

        },

        objmethod() {


    	 var self=this;
        return this.getresponse.filter(function(cust){return cust.roleName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || cust.roleCode.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || cust.channelCode.channelName.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
         });
       //return this.customers;
    },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Edit'
        },

    },
    methods:{

        Searchdatatable (e) {
            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
            },
            channelfilters(e, data){
                 console.log('e',e)
                 console.log('data is',data)
                this.page=1
                    if(data == 1){
                        this.channeldatafilter = e
                        this.GetRole(this.channeldatafilter, 0)
                    }else{
                        this.check_ch = []
                        this.cat_ch = e
                    }

                // this.GetRole(this.channeldatafilter)
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
                this.GetRole(this.channeldatafilter,this.skip)
            },

            GetRole(e,skip){

                console.log('e is', e)

                let self = this;
                let Filter_Data

                if(this.channeldatafilter == 'all'){
                    e = 'all'
                }

                if(e === 'all' || e === undefined || e === null){
                    Filter_Data ='fetchKPIMaster/main_category?userId='+this.getAgentInfo()._id+'&skip='+skip
                } else {
                    Filter_Data ='fetchKPIMaster/main_category?userId='+this.getAgentInfo()._id+'&skip='+skip+'&channel='+this.channeldatafilter
                }
                this.GET(Filter_Data, (res, error) => {
                    if(!error) {
                        if(res.data.errCode == -1) {
                            self.getresponse = []
                            self.getresponse = res.data.errMsg[0]
                            var pageLen = res.data.errMsg[1]
                            let totalCount = pageLen[0].count
                            self.pageLength = Math.ceil(totalCount/self.skipdiffrence)
                        } else if(res.data.errCode === 1) {
                            self.showToast(res.data.errMsg, self.TOST().INFO)
                        } else if(res.data.errCode === 4) {
                            self.showToast(res.data.errMsg, self.TOST().ERROR)
                        } else if(res.data.errCode === 303) {
                            self.getresponse = []
                            self.showToast("No categories available", self.TOST().WARNING)
                        } else if (res.data.errCode === 2601) {
                            self.showToast(res.data.errMsg, self.TOST().INFO)
                        } else {
                            self.showToast(res.data.errMsg, self.TOST().INFO)
                        }
                    } else {
                        console.log(error);
                        self.showToast('Something went Wrong', self.TOST().ERROR)
                    }
                });
            },
         selectStatus(){
            this.statusIndex = this.status.indexOf(this.editedItem.statusSelected)
            console.log('select==>',this.statusIndex)

        },

         saveAndEditBtn(_btnname){
             if( _btnname == 'Add' )
            {
                this.save();
            }
            else if(_btnname == 'Update'){
                this.editRolemstr();
             }
            },

        addrole(){
            this.check_ch = []
            this.disrolecode = false;
            this.btnname='Add';
            this.popupTitle = "Add New Main Category"
            this.cat_ch = '';
            this.editedItem.rolestatus =0
            this.editedItem.rolename =''
            this.editedItem.rolecode=''
            this.editedItem.channel=this.$store.state.lastchanneselected
            this.dialog=true;
        },
        setchannel(e){
            console.log("channel store",e)
            this.$store.commit('LAST_CHNNEL_DATA',e)
        },

        editItem(item){
                this.cat_ch = ''
                this.disrolecode = true;
                console.log("item",item);
                this.btnname = 'Update';
                this.popupTitle = "Update New Main Category"
                this.dialog = true;
                this.editedItem.rolename = item.categoryName
                this.editedItem.rolestatus = item.status
                this.doc_id = item._id
                this.cat_ch =  item.channel._id

                return
                // this.editedIndex = this.getresponse.indexOf(item)
                console.log('index is ',this.editedIndex)

                this.editedItem = Object.assign({}, item)



         },

    editRolemstr(){

        console.log('UPDATE fired');

             var self = this;
             this.PUT('updateKPIMaster/main_category',
             {
                 categoryName: self.editedItem.rolename  ,
                 status: self.editedItem.rolestatus ,
                 userId:  self.getAgentInfo()._id ,
                 documentId: self.doc_id ,
                 channel: self.cat_ch

                //    role_Name: self.editedItem.rolename,
                //    role_id: self.editedItem.rolecode,
                //    roleCode:self.editedItem.rolecode,
                //    active: self.editedItem.rolestatus,
                //    channel_Id:self.editedItem.channel  ,

             }, (res, error) => {

                if (!error) {
                    if (res.data.errCode === -1) {
                        self.editrole = res.data.errMsg
                        let len = res.data.errMsg.length
                        //   console.log("After EDIT",len)
                        //   self.$store.commit('SET_MASTER_ROLE_DETAILS', self.editrole)
                        self.showToast('Role Updated Succesfully','success')
                        self.dialog = false
                        self.channeldatafilter = 'all'
                        self.GetRole();
                        //   this.vSnackbar('success', 'Data Edited Succesfully')
                        // this.close();
                    } else if (res.data.errCode === 1) {
                        self.showToast(res.data.errMsg, self.TOST().INFO)
                    } else if (res.data.errCode === 4) {
                        self.showToast(res.data.errMsg, self.TOST().ERROR)
                    } else if (res.data.errCode === 2500) {
                        self.showToast(res.data.errMsg, self.TOST().WARNING)
                    } else if (res.data.errCode === 2601) {
                        self.showToast(res.data.errMsg, self.TOST().INFO)
                    }
                } else {
                    self.showToast('Something went Wrong', self.TOST().ERROR)
                }
            });

            // if(self.editedItem.rolestatus === 1){
            //     this.actStatus = 'Active'
            // }else{
            //     this.actStatus = "InActive"
            // }


            //  const FormData={
            //    roleName:self.editedItem.rolename,
            //    _id : self.editedItem.rolecode,
            //     StatusRole: this.actStatus


            //          }
            //           Object.assign(this.getresponse[this.editedIndex], FormData)

    },


        deleteItem (item) {
            console.log('item',item)
        const index = this.getresponse.indexOf(item)
        // confirm('Are you sure you want to delete this item?') &&
        this.getresponse.splice(index, 1)
        },

        close () {
        this.dialog = false
        // setTimeout(() => {
        //     this.editedItem = Object.assign({}, this.defaultItem)
        //     this.editedIndex = -1
        // }, 300)
        },


        save() {

        let rleactive;
        let self = this;

        if(this.rname){
            self.showToast('Please, enter valid data', self.TOST().WARNING);
            return;
        }

        if(this.cat_ch == "" || this.cat_ch == null || this.cat_ch == undefined){
               self.check_ch = "Please Select Channel and continue"
               self.showToast('Please Select Channel and try again', self.TOST().WARNING);
                return;
        }

          var formData = {
            categoryName: self.editedItem.rolename ,
            status: self.editedItem.rolestatus,
            channel: this.cat_ch,
            userId: this.getAgentInfo()._id
        }

        console.log("formdata for post is ->", formData);


        if(/^\s+$/g.test(self.editedItem.rolename) || this.$v.$invalid == true ){
            self.showToast('Please fill empty fields', self.TOST().WARNING);
            return
        }else {
                // p99
                this.POST('KPIMasters/main_category',formData, (res, error) => {
                   if (!error) {
                        if (res.data.errCode == -1) {
                            //console.log('POST CHANEL DATA',res.data.errMsg);
                            //this.postdata = res.data.errMsg;
                            self.getresponse.push(res.data.errMsg)

                            self.showToast('Main KPI Category Created Successfully','success')
                            self.dialog = false
                            self.close();
                        } else if (res.data.errCode === 1) {
                            self.showToast(res.data.errMsg, self.TOST().INFO)
                        } else if (res.data.errCode === 4) {
                            self.showToast(res.data.errMsg, self.TOST().ERROR)
                        } else if (res.data.errCode === 2500) {
                            self.showToast(res.data.errMsg, self.TOST().WARNING)
                        } else if (res.data.errCode === 2601) {
                            self.showToast(res.data.errMsg, self.TOST().INFO)
                        } else if (res.data.errCode === 4){
                            self.showToast( 'Duplicate Category found' , self.TOST().ERROR)
                        }
                    } else {
                        self.showToast('Something went Wrong', self.TOST().ERROR)
                    }
               });
            }

        },




    }

    }

</script>
<style>
    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }

    .status{
    font-family:roboto; font-weight:500; letter-spacing:0.1px;
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
