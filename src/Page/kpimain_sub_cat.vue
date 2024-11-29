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
                                    @change="channelfilters">
                            </v-select>          
                                              
                    </v-flex>
                    <v-flex> </v-flex>
                     <v-btn  depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addrole()">
                                    add KPI Sub Category
                                    <v-icon dark right>add_circle</v-icon>
                     </v-btn>

                     <v-menu transition="slide-y-transition" >
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
                     </v-menu>
                    <v-flex xs10 sm6 md2 class="ml-3 ">
                                <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                height="30px"></v-text-field>                            
                    </v-flex>
                   </v-layout>  
            </v-card>

        <v-flex class="ml-3 mr-3 mt-2" style="flex-flow:column wrap; width:97%;">  
                    <!-- <v-text class="headline font-weight-bold">Role Master</v-text>
                  -->
                        <v-layout row justify-space-between>
                            <!-- do not delete this line -->
                        <v-flex xs2></v-flex>
                        
                    <v-flex justify-center md11 ml-3 mt-3>
                        <h3 class="text-xs-center mb-3">KPI Sub Category</h3>
                        <v-data-table
                        :headers="headers"
                        :items="getresponse"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.parentCategory.categoryName}}</td>
                            <td class="">{{props.item.categoryName}}</td>
                            <td class="">{{props.item.categoryId}}</td>
                            <!-- <td class="">{{props.item.channelCode.channelName}}</td> -->
                            <td > <span class="status" :style="{color: props.item.status == 1 ? '#13961c' : '#d61111'}"> {{props.item.status == 1 ? "Active" : "Inactive" }} </span> </td>
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
                                <v-text-field counter="50" maxlength="50" v-model="editedItem.rolename" label="Sub Category"></v-text-field>
                            </v-flex>
                            <!-- <p>
                                {{editedItem.parent}}
                            </p> -->
                             <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.parent"  :items="main_parent" item-text="text" item-value="value" label="Main Category"></v-select>
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.rolestatus"  :items="itemActive" item-text="text" item-value="value" label="Status"></v-select>
                            </v-flex> 
                            
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary" @click.native="saveAndEditBtn(btnname)">{{btnname}}
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
    data(){
        return{

            doc_update_id:"",

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
                        {text: 'Parent Category', value: 'parentcategory'},
                        {text: 'Sub-Category', value: 'categoryName'},
                        {text: 'Category ID', value: 'categoryid'},
                        {text: 'Status', value: 'status'},
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
            main_parent:[],
            tableData: [],
                editedIndex: -1,

                editedItem: {
                rolename:'',
                rolecode:'',
                parent:'',
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
             
                
            },
            status:['Active','InActive'],
            actStatus:'',
            channeldata:[],
              
                
        }
    },

           created(){

            this.$store.commit('SET_PAGE_TITLE','KPI Sub Category');
           
              
              this.get_parent_cat();

               console.log('mainparent is ->', this.main_parent );
            this.GetRole();
        },

    computed: {
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
        popupTitle(){
            return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
        }
    },
    methods:{

        get_parent_cat(){
                this.GET('fetchKPIMaster/main_category?userId='+this.getAgentInfo()._id ,res => {
                
                    console.log("mixin channel data" ,  res.data.errMsg[0])
                    var parentdata = res.data.errMsg[0]
                    for(let i =0;i< parentdata.length;i++){
                            
                        if(parentdata[i].status === 1){
                            let channetobj ={
                                text:parentdata[i].categoryName,
                                value:parentdata[i]._id
                            }
                           this.main_parent.push(channetobj)
                        }
                    }
                   
                })
        },

        Searchdatatable (e) {

            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
            },
                channelfilters(e){
                console.log('data',e)
                this.page=1
                this.channeldatafilter = e
                this.GetRole(this.channeldatafilter)
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
                console.log('e value',e)
                let Filter_Data
                       
                 Filter_Data ='fetchKPIMaster/sub_category?userId='+this.getAgentInfo()._id+'&skip='+0
               
                 this.GET(Filter_Data,res => {
                     this.getresponse = []
                //    console.log(res.data.errMsg);
                //    res.data.errMsg.forEach(element => {
                //                    element.StatusRole = '';
                //                });
                    this.getresponse = res.data.errMsg[0]

                    console.log('GetResponse kpi main cat', this.getresponse);
                // var getreslen =  res.data.errMsg[0].length;
                // for(let j=0; j<getreslen; j++ ){
                        
                //         if( res.data.errMsg[0][j].channelCode.active == 1){
                //            getroleres.push(res.data.errMsg[0][j]);
                //         }

                // }
                //    console.log("new array is ->",getroleres);
                //    this.getresponse = getroleres

                    // var pageLen = res.data.errMsg[1]
                    // let totalCount = pageLen[0].totalCount
                    // console.log('Page Length:',totalCount)
                    // this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                    // this.pageLength =6
                    // for( var i=0; i <= this.getresponse.length; i++){
                    //     // console.log('active==>',this.branchResponse[i].active)
                    //     let branchDetails =[]
                    //     if(this.getresponse[i].active ==1){
                    //         // console.log('active==>',this.branchResponse[i].active)
                    //         this.getresponse[i].StatusRole = 'Active'
                    //     }else{
                    //         this.getresponse[i].StatusRole = 'InActive'
                    //     }
                    // }

                    // console.log(this.obj)
               }
           );
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
            this.disrolecode = false;
            this.btnname='Add';
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
                this.disrolecode = true;
                console.log("item",item)
                this.btnname = 'Update';
                this.dialog = true;
                this.doc_update_id = item._id
                this.editedItem.rolename = item.categoryName
                this.editedItem.rolestatus = item.status
                this.editedItem.parent = item.parentCategory._id

                return
                // this.editedIndex = this.getresponse.indexOf(item)
                console.log('index is ',this.editedIndex)
           
                this.editedItem = Object.assign({}, item)
             
              
         
         },

    editRolemstr(){
        console.log(' UPDATE fired ');
    
        // console.log('role status', this.editedItem.rolestatus + " - "+  this.editedItem.rolename);
       // Object.assign(this.getresponse[this.editedIndex], this.editedItem) 
             var self = this;
             this.PUT('updateKPIMaster/sub_category',
             {              
                    categoryName: self.editedItem.rolename,
                    status: self.editedItem.rolestatus,
                    userId: self.getAgentInfo()._id ,
                    parentCategory: self.editedItem.parent,
                    documentId: self.doc_update_id,

             },res => {
                    if(res.data.errCode === -1){

                    console.log(res.data.errMsg);
                    this.editrole = res.data.errMsg

                   console.log("Response is from server ",res.data.errMsg);
                 
                  var len = res.data.errMsg.length;
                //   console.log("After EDIT",len)
                //   this.$store.commit('SET_MASTER_ROLE_DETAILS', this.editrole)
                  this.showToast('Sub-Category Updated Succesfully','success')
                  this.dialog = false
                  this.channeldatafilter = 'all'
                  this.GetRole(this.channeldatafilter);
                //   this.vSnackbar('success', 'Data Edited Succesfully')   
                // this.close();                        
                     }else{
                         this.showToast('Something went wrong','success')
                     }
               }
           );

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
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            
            this.editedIndex = -1
        }, 300)
        },


        save(){

        let rleactive;
        // console.log('Index is',this.editedIndex)
        // console.log('Role Status',this.editedItem.rolestatus)
        // console.log('rolecode',this.editedItem.rolecode)
        

        let self = this;
        // if(this.editedItem.rolecode === null || this.editedItem.rolecode === ''  ) {
        //     console.log("From IF checkinng Null or empty")
        //    this.showToast('Please, Add a Role Code to Continue...','error');  
        //    this.dialog = true;  
        //    return
        // }else 

        var formData = {
            categoryName: self.editedItem.rolename ,
            parentCategory: self.editedItem.parent,
            status: self.editedItem.rolestatus,
            userId: this.getAgentInfo()._id
        }
        
        console.log("formdata for post is ->", formData );

        
        if(/^\s+$/g.test(self.editedItem.rolename) || this.$v.$invalid == true ){
            self.showToast('Please fill empty fields', self.TOST().WARNING);
            return
        }else {
                // p99
               this.POST('KPIMasters/sub_category',formData,res => {
                if(res.data.errCode === -1){
                //console.log('POST CHANEL DATA',res.data.errMsg);
                //this.postdata = res.data.errMsg;
                  console.log('post data response',  res.data.errMsg)
                  this.getresponse.push(res.data.errMsg);
                 
                //   this.$store.commit('SET_MASTER_ROLE_DETAILS',this.postdata);
                   // console.log(this.obj)
                //    this.channeldatafilter = 'all'
                //    this.GetRole(this.channeldatafilter);
                   this.showToast('Main KPI Category Created Successfully','success')
                   this.dialog = false
                  }else{
                      this.showToast('Something went wrong','error')
                  }
                   
              }
          );
       
        //   if(this.postdata.active == 1)
        //   {
        //     this.actStatus = 'Active' 
        //   }
        //   else
        //   {
        //    this.actStatus = "Active"
        //   }
        //   const formData={
        //        roleName:this.editedItem.rolename,
        //        _id : this.editedItem.rolecode,
        //        StatusRole: this.actStatus 
           

        //   }

        //     this.getresponse.push(formData)
       

      this.close()

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
