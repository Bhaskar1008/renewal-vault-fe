<template>
    <v-app>
        <!-- <v-content> -->
        <v-card>
            <v-layout row  justify-space-between class="bgclrsource pt-3 pr-3 pl-2 bgclr">
                <v-flex>
                    <v-btn round depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="create_admin()">
                        Create Admin
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
                            <h3 class="text-xs-center mb-3">Product Admins</h3>
                            <v-data-table
                            :headers="headers"
                            :items="objmethod"
                            hide-actions
                            class="elevation-1">
                            <template slot="items" slot-scope="props">
                                <td class="">{{checkValidity(props.item.first_name) +' '+ checkValidity(props.item.last_name)}}</td>
                                <!-- <td class="">{{props.item.admin_lname}}</td> -->
                                <td class="">{{checkValidity(props.item.email)}}</td>
                                <td class="">{{checkValidity(props.item.mobile_no)}}</td>
                                <td class="">{{checkValidity(props.item.state)}}</td>
                                <td class="">{{checkValidity(props.item.city)}}</td>
                                <td class="">{{checkValidity(props.item.designation)}}</td>
                                <td class="status"> <span :style="{color: props.item.admin_status == 'Active' ? '#13961c' : '#d61111'}"> {{checkValidity(props.item.admin_status)}} </span></td>
                                <td class="">{{checkValidity(props.item.last_login)}}</td>
                                <td class="">{{checkValidity(props.item.noOf_logins)}}</td>
                                <td class="">{{checkValidity(props.item.product_sd_code)}}</td>
                            
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
                                            <v-text-field counter="50" maxlength="50" v-model="editedItem.admin_fname" label="First Name"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field counter="50" maxlength="50" v-model="editedItem.admin_lname" label="Last Name"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field counter="50" maxlength="50" v-model="editedItem.admin_email" label="Email"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field counter="50" maxlength="50" v-model="editedItem.admin_mobNo" label="Mobile No."></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-select  v-model="editedItem.admin_state" :items="allStatesData" autocomplete  @change="adminCity" item-text="text" label="State" ></v-select>                                
                                        </v-flex> 
                                        <v-flex xs12 sm6 md6>
                                            <v-select  v-model="editedItem.admin_city" :items="allCityData" autocomplete item-text="asciiname" label="City" ></v-select>                                
                                        </v-flex> 
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field counter="50" maxlength="50" v-model="editedItem.admin_desig" label="Designation"></v-text-field>                            
                                        </v-flex> 
                                        <v-flex xs12 sm6 md6>
                                            <!-- <v-select  v-model="editedItem.admin_role" :items="chnlstatus" item-text="text" label="Role" ></v-select> -->
                                            <v-text-field counter="50" maxlength="50" v-model="editedItem.admin_role" label="Role"></v-text-field>
                                        </v-flex> 
                                        <v-flex xs12 sm6 md6>
                                            <v-select  v-model="editedItem.admin_status" :items="chnlstatus" item-text="text" label="Status" ></v-select>                                
                                        </v-flex> 
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field counter="50" maxlength="50" v-model="editedItem.admin_productCode" label="Product Code"></v-text-field>
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
                <v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
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
        this.$store.commit('SET_PAGE_TITLE','Admin Creation');
        this.getAdminUSers();

        this.GETSTATE(res=>{
            for(let i =0;i<res.length;i++){
                let statedata={
                    text:res[i].region_data.name,
                    code:res[i].region_data.adminCode1
                }
                this.allStatesData.push(statedata)
            }
        })
       
    },

    data(){
        return{
            allStatesData:[],
            allCityData:[],
            disaddbutton:false,
            // disch:false,
            // onaddonly:false,
            api1:"",
            def:false,
            dialog: false,
            btnname:'',
            pagination: {},
            pageLength:0,
            page:'',
            value:'',
            adminGetData:[],
            chanelResponse:[],
            getAdminUsers:[],
            // chnelstatus:[],
            editChanel:{},
            TableIndex:'',
            headers:[
                {text: 'Name', value: 'name'},
                // {text: 'Last Name', value: 'lastname'},
                {text: 'Email', value: 'email'},
                {text: 'Mobile No.', value: 'mobNo'},
                {text: 'State', value: 'state'},
                {text: 'City', value: 'city'},
                {text: 'Designation', value: 'designation'},
                {text: 'Status', value: 'status'},
                {text: 'Last Login', value: 'lastLogin'},
                {text: 'No of Logins', value: 'noOfLogins'},
                {text: 'Product Code', value: 'productCode'},
                {text: 'Action', value: 'action', sortable: false}
            ],
            tableData: [],
            editedIndex: -1,
            editedItem: {
                admin_fname:'',
                admin_lname:'',
                admin_email:'',
                admin_mobNo:'',
                admin_state:'',
                admin_city:'',
                admin_desig:'',
                admin_role:'',
                admin_status:'',
                admin_productCode:'',
                admin_lastLogin:'',
                admin_noOfLogins:'',
            },
            defaultItem: {
                admin_fname:'',
                admin_lname:'',
                admin_email:'',
                admin_mobNo:'',
                admin_state:'',
                admin_city:'',
                admin_desig:'',
                admin_role:'',
                admin_status:'',
                admin_productCode:'',
                admin_lastLogin:'',
                admin_noOfLogins:'',
            },
            chnlstatus:['InActive', 'Active'],
            chnlstatusIndex:'',
            editchanneiId:'',
        }
    },
    computed: {
        objmethod() {
            try{
                var self=this;
                return this.getAdminUsers.filter(function(cust){
                    return cust.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
                    || cust.last_name.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                    || cust.email.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                    || cust.mobile_no.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                    || cust.state.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                    || cust.city.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                    || cust.designation.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                    || cust.last_login.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                    || cust.noOf_logins.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                    || cust.product_sd_code.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                });
            }catch(err){}
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Admin' : 'Edit Admin'
        },

        value() {
           console.log(this.value);
        }
    },
    methods:{
        getAdminUSers(){
            this.GET('fetchAllAdminUsers/'+this.getAgentInfo()._id+'?skip=0',res => {
                
                this.getAdminUsers = res.data.errMsg[0]
                console.log('(FETCH_ADMIN )==>>',this.getAdminUsers);
                for( var i=0; i < this.getAdminUsers.length; i++){
                    if(this.getAdminUsers[i].active === 1){
                        this.getAdminUsers[i].admin_status = 'Active'
                    }else if(this.getAdminUsers[i].active === 0){
                        this.getAdminUsers[i].admin_status = 'InActive'
                    }
                }
            }); 
        },
        checkValidity(data){
            try{
                if(data === "" || data === null || data === undefined || data === 'undefined'){
                    return '-';
                }else{
                    return data;
                }
            }catch(err){
                // console.log(err);
            }
        },
        adminCity(ev){
            // console.log("event ", ev)
            let codes= this.allStatesData.filter(e=>{
                if(e.text === ev){
                    return e.code
                }
            })
            // console.log("event filter",codes)
            this.GETCITY(codes[0].code,resp=>{
                // console.log("city ", resp[0].cities)
                this.allCityData = resp[0].cities
            })
        },
        Searchdatatable (e) {
            this.value = e;
            // console.log("value is",this.value);
        },
        Getchannel(){
            //  axios.get(this. API_Service_admin() + 'getchannel?userId='+this.getAgentInfo()._id).then(
            this.GET('getchannel?userId='+this.getAgentInfo()._id , function(res,error){
                res.data.errMsg.forEach( element => {
                    element.channelStatus = '';
                });

                this.chanelResponse = res.data.errMsg
                console.log('CHANEL REPONSE',this.chanelResponse)
                for( var i=0; i <= this.chanelResponse.length; i++){
                    if(this.chanelResponse[i].active === 1){
                        this.chanelResponse[i].channelStatus = 'Active'
                    }else if(this.chanelResponse[i].active === 0){
                        this.chanelResponse[i].channelStatus = 'InActive'
                    }
                }
            }).catch(
                err => {
                console.log(err) ;
            });
        },

        saveAndEdit(_btnname){
            if(_btnname == 'Add' ){
                this.saveAdminData();
            } else if(_btnname == 'Update'){
                this.editAdminData();
            }
        },

        create_admin(){
            this.btnname = 'Add';
            this.editedItem.admin_fname = '';
            this.editedItem.admin_lname = '';
            this.editedItem.admin_email = '';
            this.editedItem.admin_mobNo = '';
            this.editedItem.admin_state = '';
            this.editedItem.admin_city = '';
            this.editedItem.admin_desig = '';
            this.editedItem.admin_role = '';
            this.editedItem.admin_status = 'InActive';
            this.editedItem.admin_productCode = '';
            this.editedItem.admin_lastLogin = '';
            this.editedItem.admin_noOfLogins = '';
            this.dialog = true;
        },
        editItem (item,i) {
            console.log("Data is",item)
            // console.log("Index is",i)
            this.btnname = 'Update' 
            this.dialog = true
            var adminData = item;
            this.editedItem.admin_fname = adminData.first_name
            this.editedItem.admin_lname = adminData.last_name
            this.editedItem.admin_email = adminData.email
            this.editedItem.admin_mobNo = adminData.mobile_no
            this.editedItem.admin_state = adminData.state
            this.editedItem.admin_city = adminData.city
            this.editedItem.admin_desig = adminData.designation
            this.editedItem.admin_role = adminData.designation
            this.editedItem.admin_status = adminData.active === 1 ? 'Active' : 'InActive';
            this.editedItem.admin_productCode = adminData.product_sd_code
            this.editedItem.admin_lastLogin = adminData.last_login
            this.editedItem.admin_noOfLogins = adminData.noOf_logins
        },

        editAdminData(item){
               this.disch = false;
            // console.log('CHANNEL CODE',this.editedItem.channelStatus)
            let status = null
            if(this.editedItem.channelStatus === 'Active'){
                status =1            
            }else if(this.editedItem.channelStatus === 'InActive'){
                status =0            
            }
            //  axios.put(this. API_Service_admin() + 'updateChannel/'+this.editchanneiId,
            this.PUT( 'updateChannel/'+this.editchanneiId,{              
                    channel_name: this.editedItem.chanelName,
                    channel_code: this.editedItem.channelCode, 
                    active: status,                   
                    user_Id: this.getAgentInfo()._id    
             },(res , error) => {
           
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
               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
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
        saveAdminData(){
            // if(/^\s+$/g.test(this.editedItem.chanelName)){
            //     this.showToast('Please fill all empty fields', this.TOST().WARNING);
            //      this.disaddbutton = false
            //     return
            // }else if(this.$v.$invalid == true){
            //     this.showToast('Please fill all empty fields', this.TOST().WARNING);
            //      this.disaddbutton = false
            //     return
            // }else{
            //    console.log("ready to run regular flow")
            // this.disaddbutton = true
                // console.log("ACT__INACT_",this.editedItem.admin_status);
            let self = this;
            let code = null;
            if(this.editedItem.admin_status === "InActive") {
                code = 0;
            } else if(this.editedItem.admin_status === "Active") {
                code = 1;
            }
            let sendData = {
                first_name: this.editedItem.admin_fname,
                last_name: this.editedItem.admin_lname,
                // agent_id: req.body.agent_id;
                email: this.editedItem.admin_email,
                designation: this.editedItem.admin_desig,
                roleType: this.editedItem.admin_role,
                mobile_no: this.editedItem.admin_mobNo,
                status: code,
                product_sd_code: this.editedItem.admin_productCode,
                userId: this.getAgentInfo()._id,
                state: this.editedItem.admin_state,
                city: this.editedItem.admin_city
            }
            // console.log('POP : ', sendData);
            this.POST('createAdminAccount/',sendData , (res , error) => {            
                if(res.data.errCode === -1){

                    console.log('Response Data',res.data.errMsg)
                    let adminResp = res.data.errMsg
                    self.dialog = false;
                    this.showToast('Admin created Successfully','success')

                    // this.admin_fname = adminResp.first_name
                    // this.admin_lname = adminResp.last_name
                    // this.admin_email = adminResp.email
                    // this.admin_mobNo = adminResp.first_name
                    // this.admin_state = adminResp.first_name
                    // this.admin_city = adminResp.first_name
                    // this.admin_desig = adminResp.designation
                    // this.admin_status = adminResp.active === 1 ? 'Active' : 'InActive'
                    // this.admin_productCode = adminResp.product_sd_code
                    // this.admin_lastLogin = adminResp.first_name
                    // this.admin_noOfLogins = adminResp.noOf_logins
                    this.getAdminUSers();
                }else{
                    this.showToast('Something went wrong','error') 
                }
            })
            // }
        },
     
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
