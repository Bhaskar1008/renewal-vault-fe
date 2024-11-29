<template>
    <v-app>
        <!-- <v-content> -->
            <!-- Activity upload -->
            <v-card>
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3 mr-4" style="flex-flow:column wrap">
                    <v-text class="mt-4 headline font-weight-bold">Activity Upload</v-text>
                    <hr>
                    <v-flex  class="mt-4">
                    <h3>To bulk upload User details:</h3>
                    </v-flex>
                
                    <v-flex class="mt-4">
                        <v-btn depressed medium color="blue-grey" class="white--text">
                            download sample
                            <v-icon right dark>get_app</v-icon>
                        </v-btn>
                    <v-btn depressed medium color="primary" class="white--text">
                        upload file
                        <v-icon dark right>publish</v-icon>
                    </v-btn>
                    </v-flex>
                   
                    <v-flex class="mt-4"> 
                        <h3>To bulk modify User details:</h3>
                    </v-flex>
                    <v-flex class="mt-4">                        
                        <v-btn depressed medium color="blue-grey" class="white--text">
                            export existing data
                            <v-icon right dark>get_app</v-icon>
                        </v-btn>
                        <v-btn
                            depressed medium color="primary"
                            class="white--text"
                            >
                            upload file
                            <v-icon dark right>publish</v-icon>
                        </v-btn>
                        </v-flex>
                
                        <v-flex  class="add-branch-btn">
                        <v-btn depressed medium color="primary" class="white--text" @click.native="addUser()">
                            add user
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                        </v-flex>
                        
                    <v-flex justify-center md12 ml-3 mt-3>
                        <h3 class="text-xs-center mb-3">Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="usrdetails"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.Branchsolid}}</td>
                            <td class="">{{props.item.ActivityType}}</td>
                            <td class="">{{props.item.Assigntos}}</td>
                            <td class="">

                                <v-icon small class="mr-2" style="cursor:pointer" @click="editItem(props.item,props.index)">edit</v-icon>
                                <v-icon small style="cursor:pointer" @click="deleteItem(props.item,props.index)">delete</v-icon>
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>

                    <v-dialog v-model="dialog"  persistent max-width = "800px"  >

                     <v-card>
                        <v-flex style="background-color:#3a3a3a;">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.BranchsoldId" label="Branch SOL ID"></v-text-field>
                            </v-flex>
                             <v-flex  xs12 sm6 md6>
                                <v-select :items="item" 
                                item-value="src"
                              
                                 @input="dropdowndata(editedItem.ActivityType)" 
                                  v-model="editedItem.ActivityType" 
                                   label="Activity Type" ></v-select>
                            </v-flex>
                            <v-flex  xs12 sm6 md6>
                                <v-select :items="itemassign" 
                                item-value="src"
                              
                                 @input="dropdowndata(editedItem.assign)" 
                                  v-model="editedItem.assign" 
                                   label="Assign to (RM ID)" ></v-select>
                            </v-flex>
                            
                             <v-flex v-if="rnwldata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.CustName" label="Name of the customer"></v-text-field>
                            </v-flex>
                             <v-flex v-if="rnwldata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.policyId" label="Policy ID"></v-text-field>
                            </v-flex>
                            <v-flex v-if="rnwldata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.CheckNo" label="Cheque Number"></v-text-field>
                            </v-flex>
                             <v-flex v-if="rnwldata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Amount" label="Amount"></v-text-field>
                            </v-flex>
                            <v-flex v-if="rnwldata === true" xs12 sm6 md6>
                                <!-- <v-text-field v-model="editedItem.pickupdate" label="Pick-up date"></v-text-field> -->

                                    <v-menu
                                    ref="menu1"
                                    :close-on-content-click="false"
                                    v-model="menu1"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                    >
                                    <v-text-field
                                        slot="activator"
                                        v-model="editedItem.pickupdate"
                                        label="Pickup Date"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint
                                        prepend-icon="event"
                                        @blur="date = parseDate(editedItem.pickupdate)"
                                    ></v-text-field>
                                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                    <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
                                
                            </v-flex>

                            <v-flex v-if="proposaerdata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.propserName" label="Name of the proposer"></v-text-field>
                            </v-flex>
                             <v-flex v-if="proposaerdata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.proposerId" label="Proposal ID"></v-text-field>
                            </v-flex>
                            <v-flex v-if="proposaerdata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.CheckNoprop" label="Cheque Number"></v-text-field>
                            </v-flex>
                             <v-flex v-if="proposaerdata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Amountpro" label="Amount"></v-text-field>
                            </v-flex>
                            <v-flex v-if="proposaerdata === true" xs12 sm6 md6>
                                <!-- <v-text-field v-model="editedItem.pickupdate" label="Pick-up date"></v-text-field> -->

                                    <v-menu
                                    ref="menu1"
                                    :close-on-content-click="false"
                                    v-model="menu1"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                    >
                                    <v-text-field
                                        slot="activator"
                                        v-model="editedItem.pickupdateprop"
                                        label="Pickup Date"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint
                                        prepend-icon="event"
                                        @blur="date = parseDate(editedItem.pickupdateprop)"
                                    ></v-text-field>
                                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                    <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
                                
                            </v-flex>


                            <v-flex v-if="newsaledata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.prospectName" label="Name of the prospect"></v-text-field>
                            </v-flex>
                             <v-flex v-if="newsaledata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.productType" label="Product Type"></v-text-field>
                            </v-flex>
                            <v-flex v-if="newsaledata === true" xs12 sm6 md6>
                                <v-text-field v-model="editedItem.mobileNo" label="Mobile Number"></v-text-field>
                            </v-flex>
                             <v-flex v-if="newsaledata === true" xs12 sm6 md6>
                                
                            
                                <v-dialog
                                    ref="dialog"
                                    v-model="modal2"
                                    :return-value.sync="editedItem.Scheduldate"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                                >
                                    <v-text-field
                                    slot="activator"
                                    v-model="editedItem.Scheduldate"
                                    label="Scheduled Date"
                                    prepend-icon="access_time"
                                    readonly
                                    ></v-text-field>
                                    <v-time-picker
                                    v-if="modal2"
                                    v-model="time"
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                                
                            
                            
                            
                            
                            </v-flex>
                            <v-flex v-if="newsaledata === true" xs12 sm6 md6>
                                <!-- <v-text-field v-model="editedItem.pickupdate" label="Pick-up date"></v-text-field> -->

                                    <v-menu
                                    ref="menu1"
                                    :close-on-content-click="false"
                                    v-model="menu1"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                    >
                                    <v-text-field
                                        slot="activator"
                                        v-model="editedItem.pickupdateprospect"
                                        label="Scheduled Time"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint
                                        prepend-icon="event"
                                        @blur="date = parseDate(editedItem.pickupdateprospect)"
                                    ></v-text-field>
                                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                    <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
                                
                            </v-flex>
                            
                            <!-- <v-flex xs12 sm6 md6 >
                                <p>Status</p>
                                <v-overflow-btn :items="status" label="Status" target="#dropdown-example"></v-overflow-btn>
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
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 

export default {
    data(){
        return{
            dialog: false,
            btnname:'',
            usrdetails:[],
            TableIndex:'',
            dropsowndata:'',
             date: null,
             branchname:'',
             menu2: false,
             modal2: false,
             rnwldata:false,
             proposaerdata:false,
             newsaledata:false,
             itemassign : [
                    {text:"ADMINDK_updated",value:"787878"},
                    {text:"testdk UPDATED",value:"898989"},
                   ],
             item:["Renewal Pick-up","Proposal pick-up","New Sales Call"],
             dateFormatted: null,
            menu1: false,
            menu2: false,
            headers:[
                        {text: 'Branch SOL ID', value: 'Branchsolid'},
                        {text: 'Activity Type', value: 'ActivityType'},
                        {text: 'Assign to (RM ID)', value: 'Assignto'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
            userTableData: [],
                editedIndex: -1,
                editedItem: {
               BranchsoldId:'',
               ActivityType:'',
                CustName:'',
                branch:'',
                policyId:'',
                Amount:'',
                CheckNo:'',
                pickupdate:'',
                
                propserName:'',
                proposerId:'',
                CheckNoprop:'',
                Amountpro:'',
                pickupdateprop:'',
                pickupdateprospect:'',
                mobileNo:'',
                prospectName:'',
                productType:'',
                Scheduldate:'',
                assign:'',
            },
            defaultItem: {
               BranchsoldId:'',
               ActivityType:'',
                CustName:'',
                
                policyId:'',
                Amount:'',
                CheckNo:'',
                branch:'',
                pickupdate:'',
                propserName:'',
                proposerId:'',
                CheckNoprop:'',
                Amountpro:'',
                pickupdateprop:'',
                pickupdateprospect:'',
                mobileNo:'',
                prospectName:'',
                productType:'',
                Scheduldate:'',
                assign:'',

                
            },
            // status:['Active','Inactive'],
              
                
        }
    },
    created(){
        
        this.GET('getActivityupload?user_id=5b7d151a04fec16628a9319f' , res => {
            console.log('GET USER REPONSE',res.data.errMsg)
        }).catch(
            err => {
                console.log(err) ;
            }
        );

    },


    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Edit'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Branch' : 'Edit Branch'
        },
          computedDateFormatted () {
        return this.formatDate(this.date)
      },
     
    },
    watch:{
        
     date (val) {
        this.editedItem.pickupdate = this.formatDate(this.date)
        this.editedItem.pickupdateprop = this.formatDate(this.date)
        this.editedItem.pickupdateprospect = this.formatDate(this.date)
        
        
      }
    },
    methods:{

         dropdowndata(dat){
             console.log(dat)
          if(dat === "Renewal Pick-up"){
              
            this.rnwldata = true
            this.proposaerdata = false
            this.newsaledata = false

          }else if (dat === "Proposal pick-up"){
            
               this.proposaerdata = true
                this.newsaledata = false
                this.rnwldata = false
          }else if (dat === "New Sales Call"){
          
            this.newsaledata = true
            this.rnwldata = false
            this.proposaerdata = false

          }
      },


        saveAndEdit(_btnname){
             if(_btnname == 'Add' )
            {
                this.save();
            } 
            else if(_btnname == 'Update'){
                    this.editUser();
            }
            },

        addUser(){
            this.btnname='Add';
                this.BranchsoldId ='',
                this.ActivityType = '',
                this.assign = '',
                this.CustName = '',
                this.policyId = '',
                this.CheckNo = '',
                this.Amount = '',
                this.pickupdate = '',


                this.branchcode = '',
                this.channelcode = '',
                this.rolecode = '',
                this.reportingBranchcode = '',
            this.dialog=true;
        },

        editUser(){
            this.dialog=false;
        },


        editItem (item,i) {
            this.GET('getActivityupload?user_id=5b7d151a04fec16628a9319f' , res => {
                // console.log('GET USER REPONSE',res.data.errMsg)
                this.usrdetails = res.data.errMsg;
                console.log('GET USER REPONSE',this.usrdetails);                    
            }).catch(
                err => {
                    console.log(err) ;
                }
            );
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            this.btnname = 'Update' 
               
            this.dialog = true
            var itemsUser = item;
            console.log("New item is",itemsUser)
            this.editedItem.primaryEmail = itemsUser.primary_email
            this.editedItem.firstName = itemsUser.first_name
            this.editedItem.lastName = itemsUser.last_name
            this.editedItem.agentId = itemsUser.agent_id
            this.editedItem.passwrd = itemsUser.password
            this.editedItem.branch = itemsUser.branch
            this.editedItem.reportingManager = itemsUser.reporting_manager 
            this.editedItem.Active = itemsUser.active
            this.editedItem.branchcode = itemsUser.branchCode
            this.editedItem.channelcode = itemsUser.channelCode
            this.editedItem.rolecode = itemsUser.roleCode
            this.editedItem.reportingBranchcode = itemsUser.reportingBranchCode
            //   user_Id:'this.getAgentInfo()._id'
           // this.editedItem.chanelName = itemsUser.channelName;
           // this.editedItem.channelCode = itemsUser._id;
        },
        
        deleteItem (item) {
            // const index = this.usrdetails.indexOf(item)
            // confirm('Are you sure you want to delete this item?') && 
            this.usrdetails.splice(index, 1)
        },

        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                
                this.editedIndex = -1
            }, 300)
        },
        save () {
            //     if (this.editedIndex > -1) {
            //     Object.assign(this.userTableData[this.editedIndex], this.editedItem)
            //   } else {
            //     this.userTableData.push(this.editedItem)
            //   }
            //   this.close()
             let self = this;
            //  console.log('EMAIL',this.editedItem.primaryEmail)
            this.POST('addagnet' ,{
                      BranchSOLID:this.editedItem.BranchsoldId,
                      ActivityType:this.editedItem.ActivityType,
                      RM_name:this.editedItem.assign,
                      Nameofthecustomer:this.editedItem.CustName,
                      PolicyID:this.editedItem.policyId,
                      ChequeNumber:this.editedItem.CheckNo,
                      Amount:this.editedItem.Amount,
                      Pickupdate:this.editedItem.pickupdate,
                    //   branchCode:this.editedItem.branchcode,
                    //   channelCode:this.editedItem.channelcode,
                    //   roleCode:this.editedItem.rolecode,
                    //   reportingBranchCode:this.editedItem.reportingBranchcode,
                      user_Id:'this.getAgentInfo()._id'

                } , res => {
                        console.log('RESPONSE',res.data.errMsg);               
                        this.usrdetails = res.data.errMsg;
                        console.log('USER DETAILS',this.usrdetails)
                        this.dialog = false                            
                            
                }).catch(
                    err => {
                        console.log(err) ;
                    }
                );
                const formData={
                    BranchSOLID:this.editedItem.BranchsoldId,
                    ActivityType:this.editedItem.ActivityType,
                    RM_name:this.editedItem.assign,
                    Nameofthecustomer:this.editedItem.CustName,
                    PolicyID:this.editedItem.policyId,
                    ChequeNumber:this.editedItem.CheckNo,
                    Amount:this.editedItem.Amount,
                    Pickupdate:this.editedItem.pickupdate,
                    //   primary_email:this.editedItem.primaryEmail,
                    //   first_name:this.editedItem.firstName,
                    //   last_name:this.editedItem.lastName,
                    //   agent_id:this.editedItem.agentId,
                    //   password:this.editedItem.passwrd,
                    //   branch:this.editedItem.branch,
                    //   reporting_manager:this.editedItem.reportingManager,
                    //   active:this.editedItem.Active,
                    //   branchCode:this.editedItem.branchcode,
                    //   channelCode:this.editedItem.channelcode,
                    //   roleCode:this.editedItem.rolecode,
                    //   reportingBranchCode:this.editedItem.reportingBranchcode,
                    //   user_Id:'this.getAgentInfo()._id'                      
                }
                 this.usrdetails.push(formData)
                //  console.log('USER DETAILS',this.usrdetails)
                // this.close()
                
        },

         formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        }
     
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
