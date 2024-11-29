<template>
    <v-app>
        <v-content>
            <v-card>
                
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3" style="flex-flow:column wrap;width:100%;padding-right:70px">
                    <v-text class=" headline font-weight-bold">User Management</v-text>
                    <hr>
                    <v-layout row wrap mt-4>

                      <h3 class="mt-2">To bulk upload User details:</h3>                
                    <v-flex class="ml-5">
                        <v-btn depressed medium color="blue-grey" class="white--text">
                            sample file
                            <v-icon right dark>get_app</v-icon>
                        </v-btn>
                    <v-btn depressed medium color="primary" class="white--text">
                        upload file
                        <v-icon dark right>publish</v-icon>
                    </v-btn>
                    </v-flex>
                   </v-layout>

                   <v-layout row wrap mt-5>
                        
                      <h3 class="mt-2">To bulk modify User details:</h3>                
                    <v-flex class="ml-5">
                        <v-btn depressed medium color="blue-grey" class="white--text">
                            existing data
                            <v-icon right dark>get_app</v-icon>
                        </v-btn>
                    <v-btn depressed medium color="primary" class="white--text">
                        upload file
                        <v-icon dark right>publish</v-icon>
                    </v-btn>
                    </v-flex>
                   </v-layout>
                
                        <v-flex  class="add-branch-btn">
                            <v-btn depressed medium color="primary" class="white--text" @click.native="addUser()">
                                add User
                                <v-icon dark right>add_circle</v-icon>
                            </v-btn>
                        </v-flex>

                    <v-layout row >
                
                    <v-flex justify-center md12 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">User Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="allAgentdata"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                             
                            <!-- <td class="">{{props.index}}</td> -->
                            <td class="">{{props.item.primary_email}}</td>
                            <td class="">{{props.item.first_name}}</td>
                            <td class="">{{props.item.last_name}}</td>
                            <td class="">{{props.item.agent_id}}</td>
                            <td class="">{{props.item.password}}</td>
                            <td class="">{{props.item.branch}}</td>
                            <td class="">{{props.item.reporting_manager}}</td>
                            <td class="">{{props.item.slectStatus}}</td>
                            <!-- <td class="">{{props.item.branchCode.branchCode}}</td> -->
                            <td class="">{{props.item.channelCode}}</td>
                            <td class="">{{props.item.roleCode}}</td>
                            <!-- <td class="">{{props.item.reportingBranchCode}}</td> -->
                            <td class="justify-center layout px-0">
                                <v-icon small class="mr-2" @click="editItem(props.item, props.index)">edit</v-icon>
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
                                <v-text-field v-model="editedItem.primaryEmail" label="Primary Email"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.agentId" label="Agent ID"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.passwrd" label="Password"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.branch"  :items="branchArray"  item-text="text" item-value="value" label="Branch" ></v-select>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.reportingManager" :items="itemsReprtMngr"  item-text="text" item-value="value"  label="Reporting Manager" ></v-select>                                
                            </v-flex>
                             <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Active" label="Active"></v-text-field>
                            </v-flex> -->
                             <v-flex xs12 sm6 md6>
                                <v-select @change="selectStatus()" v-model="editedItem.slectStatus" :items="userstatus" item-text="text" item-value="value" label="User Status" ></v-select>                                                                
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.channelcode" :items="itemsChanel"  item-text="text" item-value="value"  label="Channel Code" ></v-select>                                                                
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.rolecode" :items="itemsRole"  item-text="text" item-value="value"  label="Role Code" ></v-select>                                                                
                            </v-flex>
                             <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.reportingBranchcode" label="Reporting Branch Code"></v-text-field>
                            </v-flex> -->
                           
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
                
            </v-card>
        </v-content>   
   
    </v-app>
</template>
<script>
import axios from 'axios' 

var _index = 0; // used for put api
export default {

    created(){

            axios.get(this. API_Service_admin() + 'getallAgent?user_id=5b7d151a04fec16628a9319f').then(
               res => {
                    
                    // console.log('GET USER REPONSE',res.data.errMsg);
                
                    // this.allAgentdata = res.data.errMsg;
                    // console.log('GET USER REPONSE', this.allAgentda)

                     console.log('xyz :',res.data.errMsg);
                    res.data.errMsg.forEach(element => {
                                   element.slectStatus = '';
                               });

                    this.allAgentdata = res.data.errMsg
                    console.log('User REPONSE',this.allAgentdata)
                    
                    for( var i=0; i <= this.allAgentdata.length; i++){
                        // console.log('activeNESS==>',this.allAgentdata)
                        // let userDetails =[]
                        if(this.allAgentdata[i].active === 1){
                            // console.log('active==>',this.allAgentdata[i].active)
                            this.allAgentdata[i].slectStatus = 'Active'
                            // console.log('active==>1',this.allAgentdata[i].Active)                          
                        }else{
                            this.allAgentdata[i].slectStatus = 'InActive'
                            
                        }
                    }

               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
    },


  
    data(){
        return{
            dialog: false,
            btnname:'',
             usrdetails:[],
            TableIndex:'',
            branchArray:[],
            userstatus:['InActive','Active'],
            usrputdetails:[],
            allAgentdata:[],
            itemsBranch : [
                    {text:"ADMINDK_updated",value:"787878"},
                    {text:"testdk UPDATED",value:"898989"},
                   ],

                itemsReprtMngr : [
                    {text:"Usama",value:"5b8e2fb744487867bad96436"},
                     {text:"Sudeep",value:"5b8e38e244487867bad9644b"},
                      {text:"Abhishek",value:"5b8e3c7f44487867bad96459"},
                       {text:"Salman",value:"5b8e3c9044487867bad9645a"},
                    
                   ],

                itemsChanel : [
                    {text:"Abhi123",value:"AS9823"},
                    {text:"sudeep",value:"sd12"},
                   ],
                itemsBranchCode: [
                    {text:"ADMINDK_updated",value:"787878"},
                    {text:"testdk UPDATED",value:"898989"},
                   ],
                 itemsRole:[
                    {text:"Usama",value:"UK1242"},
                    {text:"dsd",value:"sds23"},
                   ],

            headers:[
                        {text: 'Primary Email', value: 'primaryEmail'},
                        {text: 'First Name', value: 'firstName'},
                        {text: 'Last Name', value: 'lastName'},
                        {text: 'Agent ID', value: 'agentId'},
                        {text: 'Password', value: 'passwrd'},
                        {text: 'Branch', value: 'branch'},
                        {text: 'Reporting Manager', value: 'reportingManager'},
                        {text: 'User Status', value: 'slectStatus'},
                        {text: 'Channel Code', value: 'channelcode'},
                        {text: 'Role Code', value: 'rolecode'},
                       
                        {text: 'Action', value: 'action', sortable: false}
                ],
            userTableData: [],
                editedIndex: -1,
                editedItem: {
               primaryEmail:'',
                firstName:'',
                lastName:'',
                agentId:'',
                passwrd:'',
                branch:'',
                reportingManager:'',
                slectStatus:'',
                branchcode:'',
                channelcode:'',
                rolecode:'',
                reportingBranchcode:'',
            },
            defaultItem: {
               primaryEmail:'',
                firstName:'',
                lastName:'',
                agentId:'',
                passwrd:'',
                branch:'',
                reportingManager:'',
                slectStatus:'',
                branchcode:'',
                channelcode:'',
                rolecode:'',
                reportingBranchcode:'',
                
            },
            statusIndex:''
              
                
        }
    },
    computed: {
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
         selectStatus(){
            this.statusIndex = this.userstatus.indexOf(this.editedItem.slectStatus)
            console.log('select==>',this.statusIndex)
            
        },

        saveAndEdit(_btnname){
             if(_btnname == 'Add' )
            {
                this.save();
            } 
            else if(_btnname == 'Update'){
                    this.updateUser();
            }
            },

        addUser(){
            this.btnname='Add';
                this.editedItem.primaryEmail ='',
                this.editedItem.firstName = '',
                this.editedItem.lastName = '',
                this.editedItem.agentId = '',
                this.editedItem.passwrd = '',
                this.editedItem.branch = '',
                this.editedItem.reportingManager = '',
                this.editedItem.slectStatus = '',
                this.editedItem.branchcode = '',
                this.editedItem.channelcode = '',
                this.editedItem.rolecode = '',
                this.editedItem.reportingBranchcode = '',
                this.dialog=true;

                let userid = this.$store.state.agentDetails._id;

            axios.get(this. API_Service_admin() + 'getbranch?created_by='+userid+'&branchfilter=All')
                   .then(res => {
                   console.log('Branch details', res)
                   let branchArr = res.data.errMsg;
                   for(var i =0;i< branchArr.length;i++)
                   {
                       this.branchArray.push(branchArr[i].branchName)
                   }
                   console.log("Branch Array",this.branchArray)
                
                    
               })
        },


        editItem (items, index) {
            // console.log('DATA LIST : ', items._id);
            
            let user_Id = this.allAgentdata[index]._id
            console.log(user_Id,'USER ID')
              axios.get(this. API_Service() + 'getuserDetails?user_id=' + user_Id).then(
               res => {
                    
                    this.usrdetails = res.data.errMsg;
                    console.log('GET SINGLE USER REPONSE',this.usrdetails);                    
               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );

            //  console.log("Data is",item)
            // console.log("Index is",i)
            this.TableIndex = index
            
            this.btnname = 'Update' 
               
            this.dialog = true

            var itemsUser = items;
            console.log("NEW USER ITEM IS::",itemsUser)
                      this.editedItem.primaryEmail = itemsUser.primary_email
                      this.editedItem.firstName = itemsUser.first_name
                      this.editedItem.lastName = itemsUser.last_name
                      this.editedItem.agentId = itemsUser.agent_id
                      this.editedItem.passwrd = itemsUser.password
                      this.editedItem.branch = itemsUser.branch
                      this.editedItem.reportingManager = itemsUser.reporting_manager 
                      this.editedItem.slectStatus = itemsUser.slectStatus
                    //   this.editedItem.branchcode = itemsUser.branchCode
                      this.editedItem.channelcode = itemsUser.channelCode
                      this.editedItem.rolecode = itemsUser.roleCode
                    //   this.editedItem.reportingBranchcode = itemsUser.reportingBranchCode
        
        },

        updateUser(items){
        //      status = null;
        //      if(parseInt(this.editedItem.Active) === 'InActive') {
        //                 status = 0;
        //             } else if(parseInt(this.editedItem.Active) === 'Active') {
        //                  status = 1;
        //             }
           let self = this;
           let User_Id = this.usrdetails[0]._id
            console.log(self.statusIndex,' ACTIVEEEEEEE')
            console.log(User_Id,' PUT USER ID')

             axios.put(this. API_Service_admin() + 'updateAgent/' + User_Id,
             {              
                    primary_email:self.editedItem.primaryEmail,
                      first_name:self.editedItem.firstName,
                      last_name:self.editedItem.lastName,
                      agent_id:self.editedItem.agentId,
                      password:self.editedItem.passwrd,
                      branch:self.editedItem.branch,
                      reporting_manager:self.editedItem.reportingManager,
                      active:self.statusIndex,
                      channelCode:self.editedItem.channelcode,
                      roleCode:self.editedItem.rolecode,
                      user_Id: self.$store.state.agentDetails._id 
             }).then(
                 res => {
                     console.log('UPDATE RESPONSE',res.data.errMsg); 
                     self.usrputdetails = res.data.errMsg;
                    //  console.log('UPDATE RESPONSE After',self.usrputdetails);                      
                     self.dialog = false  ;
               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
            if(self.usrputdetails.active === 1){
                    self.slectStatus = 'Active'
                }else{
                     self.slectStatus = 'Inactive'
                }
                console.log(self.slectStatus,'SELECT STATUS')
            const formData={
                    primary_email:self.editedItem.primaryEmail,
                      first_name:self.editedItem.firstName,
                      last_name:self.editedItem.lastName,
                      agent_id:self.editedItem.agentId,
                      password:self.editedItem.passwrd,
                      branch:self.editedItem.branch,
                      reporting_manager:self.editedItem.reportingManager,
                      slectStatus:self.slectStatus,
                      channelCode:self.channelcode,
                      roleCode:self.editedItem.rolecode,
                }
                      Object.assign(this.allAgentdata[this.TableIndex], formData)

        },

       

        deleteItem(index) {
       
        this.allAgentdata.splice(index, 1)
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
                console.log('Active InActive ::: ',this.editedItem.slectStatus);
                let usercode = null;
                if(this.editedItem.slectStatus === "InActive") {
                    usercode = 1;
                } else if(this.editedItem.slectStatus === "Active") {
                    usercode = 1;
                }
                let senduserData = {
                    primary_email:self.editedItem.primaryEmail,
                      first_name:self.editedItem.firstName,
                      last_name:self.editedItem.lastName,
                      agent_id:self.editedItem.agentId,
                      password:self.editedItem.passwrd,
                      branch:self.editedItem.branch,
                      reporting_manager:self.editedItem.reportingManager,
                      active:usercode,
                      channelCode:self.editedItem.channelcode,
                      roleCode:self.editedItem.rolecode,
                      user_Id:self.$store.state.agentDetails._id
                }
                console.log('POP : ', senduserData);                

                // console.log(self.editedItem.reportingManager,'REPORTING MANAGER')
              axios.post(this. API_Service_admin() + 'addagnet/',senduserData).then(
                    res => {
                            console.log('RESPONSE', res.data.errMsg);               
                            let dataResp = res.data.errMsg;
                            console.log('Type of Property : ', typeof(dataResp));
                            console.log('USER DETAILS', dataResp);
                            
                            // console.log('Qury is hitted by Salman');
                            // self.insertDataIntoTable();
                                    
                        if(dataResp.active === 1){
                            self.slectStatus = 'Active'
                        }else{
                            self.slectStatus = 'InActive'
                        }
                        // let self = this;
                        
                            const formData={
                            primary_email: self.editedItem.primaryEmail,
                            first_name: self.editedItem.firstName,
                            last_name:self.editedItem.lastName,
                            agent_id:self.editedItem.agentId,
                            password:self.editedItem.passwrd,
                            branch:self.editedItem.branch,
                            reporting_manager:self.editedItem.reportingManager,
                            slectStatus:self.slectStatus,
                            channelCode:self.editedItem.channelcode,
                            roleCode:self.editedItem.rolecode,
                        }
                        self.allAgentdata.push(formData);

                    }
                ).catch(
                    err => {
                        console.log(err) ;
                    }
                );

                this.dialog = false;

                },


    }
}
</script>
<style>
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
