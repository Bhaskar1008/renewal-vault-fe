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
                                    add Role
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
                        <h3 class="text-xs-center mb-3">Role Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="objmethod"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.roleName}}</td>
                            <td class="">{{props.item._id}}</td>
                            <td class="">{{props.item.channelCode.channelName}}</td>
                            <td > <span class="status" :style="{color: props.item.StatusRole == 'Active' ? '#13961c' : '#d61111'}"> {{props.item.StatusRole}} </span> </td>
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
                            <v-form v-model="validRoleForm" ref="form">
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md6>
                                        <v-select 
                                            :rules="[ !!editedItem.channel || 'This field is required' ]"  
                                            :readonly="disrolecode" 
                                            v-model="editedItem.channel" 
                                            @change="setchannel" 
                                            :items="channeldata" 
                                            item-text="text" 
                                            item-value="value" 
                                            label="Channel Name is">
                                        </v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field counter="50" maxlength="50" 
                                            :rules="nameValid" @input="role_validate(editedItem.rolename , 'rolename')"
                                            v-model="editedItem.rolename" label="Role Name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field 
                                            :rules="codeValid" @input="role_validate(editedItem.rolecode , 'rolecode')"
                                            counter="20" maxlength="20" :readonly="disrolecode" v-model="editedItem.rolecode" label="Role Code"></v-text-field>
                                    </v-flex>
                                    
                                    <v-flex xs12 sm6 md6>
                                        <v-select  v-model="editedItem.rolestatus"  :items="itemActive" item-text="text" item-value="value" label="Role Status"></v-select>
                                    </v-flex>

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
                            </v-form>
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
    mounted() {
        this.headers.map(e =>{
                    e.sortable = false;
        })
    },
    data(){
        return{
            validRoleForm:false,
            nameValid:[],
            codeValid:[],
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
                {text: 'Role Name', value: 'rolename'},
                {text: 'Role Code', value: 'rolecode'},
                {text: 'Channel Name', value: 'channelname'},
                {text: 'Role Status', value: 'StatusRole'},
                {text: 'Action', value: 'action', sortable: false}
                // {text: 'Branch Name', value: 'branch_name'},
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
            this.$store.commit('SET_PAGE_TITLE','Role Master');
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
            this.GetRole(this.channeldatafilter);
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
        role_validate(value,fieldName){
            try{
                // console.log('ROLE_FIELDS)=>',value,'fieldName)=>',fieldName)
                let nameRegex =/^[A-Za-z0-9&_ ]+$/;
                // let targetRegex =/^[A-Za-z0-9 ]+$/;
                
                if(fieldName == 'rolename'){
                    this.nameValid = []
                    value === '' ? this.nameValid.push('This is field required') : ''
                    value.match(nameRegex) ? this.nameValid.push() : this.nameValid.push('Only alphabets are allowed')

                }else if(fieldName == 'rolecode'){
                    this.codeValid = []
                    value === '' ? this.codeValid.push('This is field required') : ''
                    value.match(nameRegex) ? this.codeValid.push() : this.codeValid.push('Only alphabets and numbers are allowed')

                }
            }catch(err){}
            // var self = this                
            // this.validate_alpha_numeric(data, type, (res, datanew)=>{
            //     if(res == true){ 
            //         self.editedItem[field] = datanew
            //         self.$forceUpdate();
            //         return
            //     }
            // })
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
                if(e === 'all'){
                    Filter_Data ='getrole?userId='+this.getAgentInfo()._id+'&skip='+skip
                }else{
                    Filter_Data ='getrole?userId='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip
                }
                 this.GET(Filter_Data,res => {
                   console.log(res.data.errMsg);
                   res.data.errMsg.forEach(element => {
                                   element.StatusRole = '';
                               });
                
                console.log('GetResponse ROLES', res.data.errMsg[0]);
                let getroleres = []
                var getreslen =  res.data.errMsg[0].length;
                for(let j=0; j<getreslen; j++ ){
                        
                        if( res.data.errMsg[0][j].channelCode.active == 1){
                           getroleres.push(res.data.errMsg[0][j]);
                        }

                }
                   console.log("new array is ->",getroleres);
                   this.getresponse = getroleres

                    var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].totalCount
                    console.log('Page Length:',totalCount)
                    this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                    // this.pageLength =6
                    
                    for( var i=0; i <= this.getresponse.length; i++){
                        // console.log('active==>',this.branchResponse[i].active)
                        let branchDetails =[]
                        if(this.getresponse[i].active ==1){
                            // console.log('active==>',this.branchResponse[i].active)
                            this.getresponse[i].StatusRole = 'Active'
                        }else{
                            this.getresponse[i].StatusRole = 'InActive'
                        }
                    }

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
            this.nameValid = []
            this.codeValid = []
            this.$refs.form.reset()
            this.dialog=true;
            
        },
        setchannel(e){
            console.log("channel store",e)
            this.$store.commit('LAST_CHNNEL_DATA',e)
        },

        editItem (item) {
            this.disrolecode = true;
            console.log("item",item)
            this.editedIndex = this.getresponse.indexOf(item)
            console.log('index is ',this.editedIndex)
            this.btnname = 'Update' 
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            this.editedItem.rolename = item.roleName
            this.editedItem.rolecode = item.roleCode  
            this.editedItem.channel=item.channelCode._id
            console.log('Channel name is->', this.editedItem.channel);
            if(item.StatusRole == 'Active'){
                this.editedItem.rolestatus = 1
            }else{
                this.editedItem.rolestatus = 0
            }
        },

        editRolemstr(){
            let Id = this.$store.state.agentDetails._id
            console.log("Id",Id)
            // Object.assign(this.getresponse[this.editedIndex], this.editedItem) 
             var self = this;

            if(this.editedItem.rolename === '' || this.editedItem.rolecode === '' || this.editedItem.channel === ''){
                this.showToast('Please, Add the required fields','warning');  
                self.$refs.form.validate() 
                self.nameValid =  [ !!self.editedItem.rolename || 'This field is required' ]
                self.codeValid =  [ !!self.editedItem.rolecode || 'This field is required' ]
                this.dialog = true; 

            }else if(self.nameValid.length !== 0 || self.codeValid.length !== 0){
                this.showToast('Please, Add the correct data','warning');  
                this.dialog = true; 
            }else{
                this.PUT('updateRole/'+this.editedItem.rolecode,{              
                    role_Name: self.editedItem.rolename,
                    role_id: self.editedItem.rolecode,
                    roleCode:self.editedItem.rolecode,
                    active: self.editedItem.rolestatus, 
                    channel_Id:self.editedItem.channel  ,
                    user_Id:self.getAgentInfo()._id
                },res => {
                    if(res.data.errCode === -1){
                        console.log(res.data.errMsg);
                        this.editrole = res.data.errMsg
                        console.log("Response is from server ",res.data.errMsg);
                        // if(this.postdata.active == 1)
                        //     {
                        //         this.actStatus = 'Active' 
                        //     }
                        //     else
                        //     {
                        //     this.actStatus = "InActive"
                        //     }
                        var len = res.data.errMsg.length
                        console.log("After EDIT",len)
                        this.$store.commit('SET_MASTER_ROLE_DETAILS', this.editrole)
                        this.showToast('Role Updated Succesfully','success')
                        this.dialog = false
                        this.channeldatafilter = 'all'
                        this.GetRole(this.channeldatafilter);
                        //   this.vSnackbar('success', 'Data Edited Succesfully')   
                        // this.close();                        
                    }else{
                        this.showToast('Something went wrong','success')
                    }
                });
            }
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


        save () {
            let rleactive;
            console.log('Index is',this.editedIndex)
            console.log('Role Status',this.editedItem.rolestatus)
            console.log('rolecode',this.editedItem.rolecode)
            // editedItem.channel
            // this.codeValid

            let self = this;
            if(this.editedItem.rolename === '' || this.editedItem.rolecode === '' || this.editedItem.channel === '' ||
                this.editedItem.rolename === undefined || this.editedItem.rolecode === undefined || this.editedItem.channel === undefined) {
                // console.log("From IF checkinng Null or empty")
                self.$refs.form.validate() 
                this.showToast('Please, Add the required fields','warning');  
                self.nameValid =  [ !!self.editedItem.rolename || 'This field is required' ]
                self.codeValid =  [ !!self.editedItem.rolecode || 'This field is required' ]
                this.dialog = true;  
                return
            }else if(self.nameValid.length !== 0 || self.codeValid.length !== 0){
                this.showToast('Please, Enter the correct data','warning');  
                this.dialog = true;  

            }else {
                this.POST('addRole/'+this.getAgentInfo()._id,{
                    // console.log(res.data.errMsg),
                    role_Name: self.editedItem.rolename,
                    roleCode: self.editedItem.rolecode,
                    active: self.editedItem.rolestatus,
                    channel_Id:self.editedItem.channel 

                    },res => {
                    if(res.data.errCode === -1){
                        //   console.log('POST CHANEL DATA',res.data.errMsg);
                        this.postdata =res.data.errMsg;
                        console.log('post data',this.postdata)

                        this.$store.commit('SET_MASTER_ROLE_DETAILS',this.postdata);
                        // console.log(this.obj)
                        this.channeldatafilter = 'all'
                        this.GetRole(this.channeldatafilter);
                        this.showToast('Role Created Successfully','success')
                        this.dialog = false
                    }else{
                        this.showToast('Something went wrong','error')
                    }
                    
                });
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
