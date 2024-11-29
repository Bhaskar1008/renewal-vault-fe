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

            this.GET('getallAgent?user_id=5b7d151a04fec16628a9319f' , res => {
                    // this.allAgentdata = res.data.errMsg;
                    console.log('xyz :',res.data.errMsg);
                    res.data.errMsg.forEach(element => {
                        element.slectStatus = '';
                    });

                    this.allAgentdata = res.data.errMsg
                    console.log('User REPONSE',this.allAgentdata)
                    
                    for( var i=0; i <= this.allAgentdata.length; i++){
                        // let userDetails =[]
                        if(this.allAgentdata[i].active === 1){
                            this.allAgentdata[i].slectStatus = 'Active'
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
        // formTitle () {
        //     return this.editedIndex === -1 ? 'Add' : 'Update'
        // },
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
               
        },


        editItem (items, index) {            
          
             console.log("Data is",item)
            console.log("Index is",i)
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
                      this.editedItem.channelcode = itemsUser.channelCode
                      this.editedItem.rolecode = itemsUser.roleCode
        
        },

        updateUser(items){
        
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
