<template>
    <v-app>
        <!-- <v-content> -->
            <!-- Activity upload -->
            <v-card>
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3 " style="flex-flow:column wrap;width:100%;padding-right:37px">
                    <v-text class="mt-4 headline font-weight-bold">Activity Report</v-text>
                    <hr>
                     
                
                    <!-- <v-container grid-list-md> -->
                        <v-flex p  class="mt-4">
                    <h3>Filter</h3>
                    </v-flex>
                        <v-layout row wrap>
                    <v-flex  xs12 sm6 md3 class=" mr-3 ">
                                <v-select :items="branchArray" 
                                item-value="src"
                                @input = "changeBranch(editedItem.Branch)"
                                  v-model="editedItem.Branch" 
                                   label="Branch Wise" ></v-select>
                    </v-flex>
                            <v-flex  xs12 sm6 md3 class="mr-3 ">
                                <v-select :items="item" 
                                item-value="src"
                                @input = "changeBranch(editedItem.Branch)"
                                  v-model="editedItem.Activitytype" 
                                   label="Activity Type wise" ></v-select>
                            </v-flex>
                            <v-flex  xs12 sm6 md3 class=" mr-3 margin-left-report">
                                 <v-text-field
                                        slot="activator"
                                        v-model="editedItem.username"
                                        label="Search By Name"
                                        
                                      
                                        
                                    > </v-text-field>
                            </v-flex>
                              <v-flex >
                        <v-btn depressed medium color="primary" class="white--text" >
                            Search
                            <v-icon right>search</v-icon>
                        </v-btn>
                        </v-flex>
                           
                        </v-layout>
                         
                    <!-- </v-container> -->
                       
                        
                    <v-flex justify-center md12 ml-3 mt-3>
                        <h3 class="text-xs-center mb-3">Activity Report Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="usrdetails"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td  class="">{{props.item.firstName +" "+ props.item.lastName}} </td>
                            <td class="">{{props.item.email}}</td>
                            <td class="">{{props.item.primaryMobile}}</td>
                            <td class="">{{props.item.state}}</td>
                              <td class="">{{props.item._id}}</td>
                             <td class="">{{props.item.city}}</td>
                            <td class="">{{props.item.statusProductType}}</td>
                            <td class="">{{props.item.leadStatus}}</td>
                            

                            <td class="">{{props.item.appointmentdisPosition}}</td>
                            <td class="">{{props.item.Activitytype}}</td>

                             <td class="">{{props.item.start_date}}</td>
                            <td class="">{{props.item.start_time}}</td>
                            <td class="">{{props.item.reminder}}</td>
                            <td class="">{{props.item.remarksfromSource}}</td>

                             <td class="">{{props.item.remarksfromUser}}</td>
                        
                         

                                <!-- <v-icon small class="mr-2" style="cursor:pointer" @click="editItem(props.item,props.index)">edit</v-icon>
                                <v-icon small style="cursor:pointer" @click="deleteItem(props.item,props.index)">delete</v-icon> -->
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
<!-- // LEAD POPUP DIALOG -->
                   
                    <!-- END LEAD POPUP DIALOG HERE -->

                </v-flex>    
            </v-layout> 
            </v-card>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 
import moment from 'moment'
import { mapMutations } from 'vuex'

export default {
    data(){
        return{
            moment:moment,
            dialog: false,
            showOwner:false,
            TableNames:'',
            savedItem:[],
            branchCodeArray:[],
            displayOwnerDetails:false,
            LeadAllocationName:'Easwar',
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
                        {text: 'Name', value: 'Name'},
                        {text: 'Email', value: 'email'},
                        {text: 'Mobile', value: 'primaryMobile'},

                         {text: 'State', value: 'state'},
                          {text: 'LeadID', value: '_id'},
                        {text: 'City', value: 'city'},
                        {text: 'Product', value: 'statusProductType'},

                         {text: 'Status', value: 'leadStatus'},
                         {text:'Activity Type',value:'Activitytype'},
                        {text: 'Disposition', value: 'appointmentdisPosition'},
                        {text: 'Date', value: 'start_date'},

                         {text: 'Time', value: 'start_time'},
                            {text: 'Reminder', value: 'reminder'},
                        {text: 'SourceRemarks', value: 'remarksfromSource'},
                        {text: 'UserRemarks', value: 'remarksfromUser'},

                       

                        // {text: 'Action', value: 'action', sortable: false}

                ],
            userTableData: [],
                editedIndex: -1,
                itembranch:[
                    'Axis Malad','Axis Borivali','Axis Andheri','Axis Kandivali'
                ],
                    itemstate: [
                  "Andhra Pradesh", "Arunachal Pradesh", "Assam,Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
        "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh",
        "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman & Diu", "Dehi", "Lakshadweep", "Puducherry"
                   ],
                itemcity: [
                    'Mumbai','New Delhi','Pune','Hyderabad','Kolkata','Chennai','Ahmedabad','Kanpur'
                   ],
                itemproduct: [
                    'Auto','Health','Home'
                   ],
                   itemstatus:[
                         {text: 'Fresh', value: 'newleadentery'},
                            {text: 'Not Available', value: 'nocontact'},
                        {text: 'Reschedule', value: 'contact'},
                        {text: 'Collected', value: 'collected'},
                    //    'Fresh','Not Available','Rescheduled','Collected'
                   ],
                   itemdisposition:[
                       
                   ],
                   itemreminder:[
                       'None','15 min before','1 hr before','2 hr before'
                   ],
                   itemtime:[
                       {
        time: "8:00 AM",
        value: "28800000"
    }, {
        time: "8:30 AM",
        value: "30600000"
    }, {
        time: "9:00 AM",
        value: "32400000"
    }, {
        time: "9:30 AM",
        value: "34200000"
    }, {
        time: "10:00 AM",
        value: "36000000"
    }, {
        time: "10:30 AM",
        value: "37800000"
    }, {
        time: "11:00 AM",
        value: "39600000"
    }, {
        time: "11:30 AM",
        value: "41400000"
    }, {
        time: "12:00 PM",
        value: "43200000"
    }, {
        time: "12:30 PM",
        value: "45000000"
    }, {
        time: "1:00 PM",
        value: "46800000"
    }, {
        time: "1:30 PM",
        value: "48600000"
    }, {
        time: "2:00 PM",
        value: "50400000"
    }, {
        time: "2:30 PM",
        value: "52200000"
    }, {
        time: "3:00 PM",
        value: "54000000"
    }, {
        time: "3:30 PM",
        value: "55800000"
    }, {
        time: "4:00 PM",
        value: "57600000"
    }, {
        time: "4:30 PM",
        value: "59400000"
    }, {
        time: "5:00 PM",
        value: "61200000"
    }, {
        time: "5:30 PM",
        value: "63000000"
    }, {
        time: "6:00 PM",
        value: "64800000"
    }, {
        time: "6:30 PM",
        value: "66600000"
    }, {
        time: "7:00 PM",
        value: "68400000"
    }, {
        time: "7:30 PM",
        value: "70200000"
    }, {
        time: "8:00 PM",
        value: "72000000"
    }, {
        time: "8:30 PM",
        value: "73800000"
    }, {
        time: "9:00 PM",
        value: "75600000"
    }, {
        time: "9:30 PM",
        value: "77400000"
    }
                   ],
                   itemdesignation:['Branch Manager','Relationship Manager'],
                   itemowner:[
                    {
                        text: "Usama",
                        value: "5b8e2fb744487867bad96436"
                    }, {
                        text: "Abhishek",
                        value: "5b8e3c7f44487867bad96459"
                    }, {
                        text: "DK",
                        value: "5b8e38e244487867bad9644b"
                    }, {
                        text: "Pankaj",
                        value: "5b8e3e7b44487867bad96460"
                    }, {
                        text: "Ashraf",
                        value: "5b8e3ca544487867bad9645c"
                    }, {
                        text: "Gopal",
                        value: "5b8e3caf44487867bad9645d"
                    }, {
                        text: "Shoaib",
                        value: "5b8e3e7144487867bad9645f"
                    },
                    {
                        text: "Bhavik",
                        value: "5b8e3e7f44487867bad96461"
                    },
                    {
                        text: "Salman",
                        value: "5b8e3c9044487867bad9645a"
                    },
                    {
                        text: "Easwar",
                        value: "5b8e3c9b44487867bad9645b"
                    },
                    {
                        text: "Himanshu",
                        value: "5b8e3e5f44487867bad9645e"
                    }
                   ],
                   itemactivity:[
                    "New Sales Call",
                    "Renewal Pick-up",
                    "Proposal Pick-up"
                   ],
                editedItem: {
                //       itemstate: [
                //     'Maharshtra','Karnataka','Goa','Gujarat','Orissa','Kerela','Tamil Nadu'
                //    ],
                // itemcity: [
                //     'Mumbai','New Delhi','Pune','Hyderabad','Kolkata','Chennai','Ahmedabad'
                //    ],
                // itemproduct: [
                //     'Auto','Health','Home'
                //    ],
                Firstname:'',
                Lastname:'',
                Email:'',
                Mobile:'',
                State:'Maharashtra',
                Branch:'',                
                City:'Mumbai',
                Scheduledate:'',
                Scheduletime:'',
                Product:'',
                Status:'newleadentery',
                Disposition:'',
                Reminder:'',
                RemarkSource:'',
                RemarkUser:'',
                Designation:'',
                Owner:'',
                Activity:'',
                BranchCode:'',
            },
            defaultItem: {
                //   itemstate: [
                //     'Maharshtra','Karnataka','Goa','Gujarat','Orissa','Kerela','Tamil Nadu'
                //    ],
                // itemcity: [
                //     'Mumbai','New Delhi','Pune','Hyderabad','Kolkata','Chennai','Ahmedabad'
                //    ],
                // itemproduct: [
                //       'Auto','Health','Home'
                //    ],
                Firstname:'',
                Lastname:'',
                Email:'',
                Scheduledate:'',
                Scheduletime:'',
                Mobile:'',
                State:'Maharashtra',
                Branch:'',
                City:'Mumbai',
                Product:'',
                Status:'newleadentery',
                Disposition:'',
                Reminder:'',
                 RemarkSource:'',
                RemarkUser:'',
                 Designation:'',
                Owner:'',
                Activity:'',
                BranchCode:''    
            },
            showDispostion:false,
            showCalendar:true,
            LeadId:'',
            savedIndex:'',
            branchArray:[],
            branchDetails:[],
            // status:['Active','Inactive'],
        }
    },
    created(){
        this.$store.commit('SET_PAGE_TITLE','Activity Report');
        this.GET('getbranch?created_by=this.getAgentInfo()._id&branchfilter=All',res => {
                    console.log('Branch details', res)
                    let branchArr = res.data.errMsg;
                    this.branchDetails = res.data.errMsg
                    for(var i =0;i< branchArr.length;i++)
                    {
                        this.branchArray.push(branchArr[i].branchName)
                        this.branchCodeArray.push(branchArr[i].branchCode)
                    }
                    console.log("Branch Array",this.branchArray)
				
					
                })
               
    
        this.GETUSER('getlead/5b8e3c9b44487867bad9645b?leadfilter=all',res => {
                    
                    console.log('GET USER REPONSE OF LEAD',res.data.errMsg)
                    this.usrdetails = res.data.errMsg
                    for(var i =0 ;i< this.usrdetails.length;i++)
                    {
                        this.TableName = this.usrdetails[i].firstName +' '+this.usrdetails[i].lastName
                        // console.log("name =========>>>>>>>>>>>>>",this.TableName)
                        // this.TableNames = this.TableName
                    }
               }
           )

            

    },


    
    methods:{
    
     
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
          .margin-left-report{
              margin-left:170px;
          }
          .add-branch-btn{
               display: flex;
              justify-content: flex-end;
              margin-right: 15px;              
          }
      }
</style>
