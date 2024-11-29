<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3 " style="flex-flow:column wrap;width:100%;padding-right:37px">
                    <!-- <v-text class="mt-4 headline font-weight-bold">Activity Tracking</v-text> -->
                    <hr>
                
                        <!-- <v-flex  class="add-branch-btn">
                        <v-btn depressed medium color="primary" class="white--text" @click="addUser()">
                            Add Lead
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                        </v-flex> -->
                        
                    <v-flex justify-center md12 ml-3 mt-3>
                        <!-- <h3 class="text-xs-center mb-3">Details</h3> -->
                        <v-data-table
                        :headers="headers"
                        :items="usrdetails"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.firstName}} {{props.item.lastName}} </td>
                            <td class="">{{props.item.email}}</td>
                            <td class="">{{props.item.primaryMobile}}</td>
                            <td class="">{{props.item.state}}</td>
                              <td class="">{{props.item._id}}</td>
                             <td class="">{{props.item.city}}</td>
                            <td class="">{{props.item.statusProductType}}</td>
                            <td class="">{{props.item.leadStatus}}</td>
                            <td class="">{{props.item.appointmentdisPosition}}</td>

                             <td class="">{{props.item.start_date}}</td>
                            <td class="">{{props.item.start_time}}</td>
                            <td class="">{{props.item.reminder}}</td>
                            <td class="">{{props.item.remarksfromSource}}</td>

                             <td class="">{{props.item.remarksfromUser}}</td>
                                <!-- <v-icon small class="mr-2" style="cursor:pointer" @click="editItem(props.item,props.index)">edit</v-icon> -->
                                <!-- <v-icon small style="cursor:pointer" @click="deleteItem(props.item,props.index)">delete</v-icon> -->
                                <td class="mt-3">
                                <v-icon small style="cursor:pointer" @click="editItem(props.item,props.index)">remove_red_eye</v-icon>
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
<!-- // LEAD POPUP DIALOG -->
                    <v-dialog v-model="dialog"  persistent max-width = "800px"  >

                     <v-card>
                        <v-flex style="background-color:#3a3a3a;">                          
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}} </v-card-title>
                            <!-- <v-icon >highlight_off</v-icon> -->
                        </v-flex>
                        
                    
                        <!-- LEAD HISTORY COMPONENT -->
                             <activity-step></activity-step>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <!-- <v-btn depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn> -->
                    </v-card-actions>
                    </v-card>
                    </v-dialog> 
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
import ActivityStep from './activityTrackStep'

export default {
    data(){
        return{
            moment:moment,
            dialog: false,
            showOwner:false,
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
                        {text: 'Disposition', value: 'appointmentdisPosition'},
                        {text: 'Date', value: 'start_date'},

                         {text: 'Time', value: 'start_time'},
                            {text: 'Reminder', value: 'reminder'},
                        {text: 'SourceRemarks', value: 'remarksfromSource'},
                        {text: 'UserRemarks', value: 'remarksfromUser'},

                       

                        {text: 'Action', value: 'action', sortable: false}

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
    components:{
        ActivityStep,
    },
    created(){
        this.$store.commit('SET_PAGE_TITLE','Activity Tracking');

        this.GETUSER(this.API_Service()+'getlead/5b8e3c9b44487867bad9645b?leadfilter=all', res => {
            console.log('GET USER REPONSE OF LEAD',res.data.errMsg)
            this.usrdetails = res.data.errMsg
            for(var i =0 ;i< this.usrdetails.length;i++){
                this.TableName = this.usrdetails[i].firstName + this.usrdetails[i].lastName
            }
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
            return this.editedIndex === -1 ? 'Create Lead' : 'Edit Lead'
        },
          computedDateFormatted () {
        return this.formatDate(this.date)
      },
     
    },
    watch:{
        
     date (val) {
        this.editedItem.Scheduledate = this.formatDate(this.date)
        // this.editedItem.pickupdateprop = this.formatDate(this.date)
        // this.editedItem.pickupdateprospect = this.formatDate(this.date)
        
        
      }
    },
    methods:{
         ...mapMutations(['showSnackbar', 'closeSnackbar']),

      changeStatus(stat){
          console.log("Selected value",stat)
         if(stat =='newleadentery')
         {
            this.showDispostion = false
            this.showCalendar = true
         }   
         else if(stat=='nocontact')
         {
         this.showDispostion=true
         this.itemdisposition = [
             {text:'Not Reachable',value:'notreachable'},
               {text:'Ringing/Busy',value:'ringingbusy'},
                 {text:'Wrong Number',value:'wrongnumber'},
                   {text:'Invalid',value:'invalid'}]
         }
        else if(stat=='contact')
         {
         this.showDispostion=true
         this.itemdisposition = [
               {text:'Reschedule',value:'appointment'}]
         }
           else if(stat=='collected')
         {
         this.showDispostion=true
         this.itemdisposition = [
               {text:'Collected',value:'collected'}]
         }
      },
      changeDisposition(dispo){
      if(dispo == 'appointment')
      {
          this.showCalendar = true
      }

      },
      changeOwner(own){
          console.log("Owner is",own)
          if(own=='5b8e2fb744487867bad96436')
          {
              this.LeadAllocationName = 'Usama'
          }
         
          else if(own=='5b8e38e244487867bad9644b')
          {
              this.LeadAllocationName='DK'
          }
            else if(own=='5b8e3e7b44487867bad96460')
          {
              this.LeadAllocationName='Pankaj'
          }
           else if(own=='5b8e3c7f44487867bad96459')
          {
              this.LeadAllocationName="Abhishek"
          }
            else if(own=='5b8e3ca544487867bad9645c')
          {
              this.LeadAllocationName='Ashraf'
          }
            else if(own=='5b8e3caf44487867bad9645d')
          {
              this.LeadAllocationName='Gopal'
          }
            else if(own=='5b8e3e7144487867bad9645f')
          {
              this.LeadAllocationName='Shoaib'
          }
             else if(own=='5b8e3c9044487867bad9645a')
          {
              this.LeadAllocationName='Salman'
          }
             else if(own=='5b8e3c9b44487867bad9645b')
          {
              this.LeadAllocationName='Easwar'
          }
             else if(own=='5b8e3e5f44487867bad9645e')
          {
              this.LeadAllocationName='Himanshu'
          }
             else if(own=='5b8e3e7f44487867bad96461')
          {
              this.LeadAllocationName='Bhavik'
          }
        //      else if(own='5b8e3e7144487867bad9645f')
        //   {
        //       this.LeadAllocationName='Shoaib'
        //   }

      },
      changeBranch(item){


                    let index = this.branchDetails.findIndex( obj => obj.branchName === item);
                    console.log("CODE BRANCH",this.branchDetails[index].branchCode)
                   this.editedItem.BranchCode= this.branchDetails[index].branchCode;


            

        //   if(branch == 'Axis Marol')
        //   {
        //       this.editedItem.BranchCode ='859595'
        //   }
        //    if(branch == 'Axis Dadar')
        //   {
        //       this.editedItem.BranchCode ='4314314'
        //   }
        //    if(branch == 'Axis Mulund')
        //   {
        //       this.editedItem.BranchCode ='87987'
        //   }
        //    if(branch == 'Axis kandivali')
        //   {
        //       this.editedItem.BranchCode ='00000'
        //   }
        //    if(branch == 'Axis Andheri')
        //   {
        //       this.editedItem.BranchCode ='242347873'
        //   }
        //    if(branch == 'Axis Malad')
        //   {
        //       this.editedItem.BranchCode ='78768678'
        //   }
        //    if(branch == 'Axis Borivali')
        //   {
        //       this.editedItem.BranchCode ='00565464'
        //   }
          
  
      },
      showOwnerDetails(){
          this.displayOwnerDetails = true
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
            this.editedItem.Firstname='',
            this.editedItem.Lastname ='',
            this.editedItem.Status='',
            this.editedItem.Activity = '',
            this.editedItem.Status='newleadentery',
            this.editedItem.BranchCode = '',
            this.editedItem.Branch = '',
            this.editedItem.Mobile ='',
            this.editedItem.Product = '',
            this.editedItem.RemarkSource = '',
            this.editedItem.RemarkUser ='',
            this.editedItem.Scheduledate='',
            this.editedItem.Scheduletime = '',
            this.editedItem.Reminder ='',
            this.editedItem.Email ='',
            // this.editedItem.State='',
            // this.editedItem.City=''
            this.editedItem.Owner='',
            this.editedItem.Designation='',
                // this.BranchsoldId ='',
                // this.ActivityType = '',
                // this.assign = '',
                // this.CustName = '',
                // this.policyId = '',
                // this.CheckNo = '',
                // this.Amount = '',
                // this.pickupdate = '',


                // this.branchcode = '',
                // this.channelcode = '',
                // this.rolecode = '',
                // this.reportingBranchcode = '',
            this.dialog=true;
            this.LeadAllocationName ='Easwar'
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
        },

        editUser(){
            console.log("Edited data",this.savedItem)
              this.PUTUSER('updateLead/'+this.savedItem._id ,{
                    appointmentdisPosition:this.editedItem.Disposition,
                    leadStatus:this.editedItem.Status,
                    remarksfromSource:this.editedItem.RemarkSource,
                    remarksfromUser:this.editedItem.RemarkUser,
                    productType:this.editedItem.Product,
                    email:this.editedItem.Email,
                    primaryMobile:this.editedItem.Mobile,
                    state:this.editedItem.State,
                    city:this.editedItem.City,
                      branchCode :this.editedItem.BranchCode,
                    firstName:this.editedItem.Firstname,
                    lastName:this.editedItem.Lastname,
                    start_time:parseInt(this.editedItem.Scheduletime),
                     start_date:moment(this.editedItem.Scheduledate).valueOf(),
                     lead_Creator_Id:'5b8e3c9b44487867bad9645b',
                     lead_Owner_Id:this.savedItem.leadOwnerId,
                     user_id:this.savedItem.leadOwnerId

                },res => {
                        if(res.data.errCode == -1)
                        {
                             this.showSnackbar({text: 'Lead Updated Successfully',color:'green'}) 
                             if(this.editedItem.Status == 'rescheduled' && this.editedItem.Disposition=='rescheduled')
                             {
                                 this.notificationdata()
                             }
                             console.log('RESPONSE',res.data.errMsg);               
                            let putResponse = res.data.errMsg;
                            console.log('PUT RESPONSE',putResponse)
                           
                        }
                           else if (res.data.errCode === 4) {
                            // self.vSnackBar("Success", storeData[0].statusLeadData.start_date)
                              this.showSnackbar({text: 'Database Error',color:'red'}) 
                        } else if (res.data.errCode === 9) {
                              this.showSnackbar({text: 'Lead phone no. already exists',color:'red'})
                        } else if (res.data.errCode === 16) {
                              this.showSnackbar({text: 'Appointment not booked',color:'red'})
                        } else if (res.data.errCode === 1) {
                              this.showSnackbar({text: 'Mandatory field not found',color:'red'})
                        }
                        else if (res.data.errCode === 576) {
                              this.showSnackbar({text: 'Lead Phone no cannot be modified',color:'red'})
                        }
                            this.dialog = false                            
                            
                    }
                ).catch(
                    err => {
                        console.log(err) ;
                    }

                );
                            const EditLeaddata={
                  appointmentdisPosition:this.editedItem.Disposition,
                    leadStatus:this.editedItem.Status,
                    remarksfromSource:this.editedItem.RemarkSource,
                    remarksfromUser:this.editedItem.RemarkUser,
                    statusProductType:this.editedItem.Product,
                    email :this.editedItem.Email,
                    primaryMobile:this.editedItem.Mobile,
                    state:this.editedItem.State,
                    city:this.editedItem.City,
                    reminder:this.editedItem.Reminder,
                    firstName:this.editedItem.Firstname,
                    lastName:this.editedItem.Lastname,
                    start_time:this.editedItem.Scheduletime,
                     branchCode :this.editedItem.BranchCode,
                     start_date:this.editedItem.Scheduledate,
                    // user_id:leadownidentity,
                    // lead_Creator_Id:'5b8e3c9b44487867bad9645b',
                    // lead_Owner_Id:leadownidentity,
             }
             console.log("Lead Data is",EditLeaddata)
             console.log("Saved Index",this.savedIndex)
             Object.assign(this.usrdetails[this.savedIndex], EditLeaddata)
            this.dialog=false;

        },


        editItem (item,i) {
            console.log("LEAD ID", item._id);
            let me = this;

            this.savedIndex=i
            this.GET('getbranch?created_by=this.getAgentInfo()._id&branchfilter=All', res => {
                    console.log('Branch details', res)
                    let branchArr = res.data.errMsg;
                    for(var i =0;i< branchArr.length;i++)
                    {
                        this.branchArray.push(branchArr[i].branchName)
                    }
                    console.log("Branch Array",this.branchArray);
                    // BranchCode = branchCode
                    // Branch = branchName

                    let index = branchArr.findIndex( obj => obj.branchCode === item.branchCode);
                    console.log("CODE BRANCH",branchArr[index].branchName)
                   me.editedItem.Branch= branchArr[index].branchName;
                   me.editedItem.BranchCode= branchArr[index].branchCode;


                //    console.log(me.editedItem.Branch, 'New Branch Name ' );
					
                })

                this.GETUSER('getlead_details/'+item._id , res => {
                    console.log('Lead Edit Response is', res)
                    let LeadDetails = res.data.errMsg[1];
                      console.log("Edited Time",LeadDetails.start_time)
                       this.editedItem.Scheduletime=LeadDetails.start_time
                    this.editedItem.Scheduledate = moment(LeadDetails.start_date).format('MM-DD-YYYY')
                   
                    this.getTime(this.editedItem.Scheduletime)
				
					
                })
                console.log("Edited Time",this.editedItem.Scheduletime)
            this.savedItem = item
            //   let leadownidentity=''
            // if(this.editedItem.Owner !=='')
            // {
            //     leadownidentity=this.editedItem.Owner
            // }
            // else{
            //     leadownidentity = '5b8e3c9b44487867bad9645b'
            // }
            // let userIdentity = this.$store.getters.getAgentDetails
            let epochDate = moment(this.editedItem.Scheduledate).valueOf()
        //      axios.get('http://172.16.59.96:5010/secure/admin/getActivityupload?user_id=5b7d151a04fec16628a9319f').then(
        //        res => {
                    
        //             // console.log('GET USER REPONSE',res.data.errMsg)
        //             this.usrdetails = res.data.errMsg;
        //             console.log('GET USER REPONSE',this.usrdetails);                    
        //        }
        //    ).catch(
        //        err => {
        //            console.log(err) ;
        //        }
        //    );
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            this.btnname = 'Update' 
               
            this.dialog = true
            if(item.leadOwnerId=='5b8e38e244487867bad9644b')
            {
                // this.displayOwnerDetails = true
                this.LeadAllocationName = 'DK'
                this.editedItem.Owner = 'DK'
            }
                this.LeadId = item._id
                console.log("Lead Id in Edit is",this.LeadId)
                  console.log("Status is",item.leadStatus)
                   this.editedItem.Status=item.leadStatus
                   this.editedItem.Disposition=item.appointmentdisPosition
                   if(item.leadStatus !== 'newleadentery')
                   {
                       this.showDispostion = true
                     
                       if(item.appointmentdisPosition ==='appointment')
                       {
                         this.itemdisposition=[{text:'Reschedule',value:'appointment'}]
                          
                           this.showCalendar = true
                         
                           
                         
                       }
                
                             else if(item.appointmentdisPosition==='collected')
                             {
                                    this.itemdisposition = [{text:'Collected',value:'collected'}]
                                }
                                else if(item.appointmentdisPosition==='notreachable')
                                  this.itemdisposition = [{text:'Not Reachable',value:'notreachable'}]
                                 
                                    else if(item.appointmentdisPosition==='ringingbusy')
                                  this.itemdisposition = [{text:'Ringing/Busy',value:'ringingbusy'}]
                                     else if(item.appointmentdisPosition==='wrongnumber')
                                  this.itemdisposition = [{text:'Wrong Number',value:'wrongnumber'}]
                                     else if(item.appointmentdisPosition==='invalid')
                                  this.itemdisposition = [{text:'Invalid',value:'invalid'}]
                             }
                       


              
                       
            
                   else {
                       this.showCalendar = true                 
                        }
                        this.editedItem.Branch = item.branchCode
                       
                        let branch = item.branchCode
                         console.log("Branch name is",branch)
        //                  if(branch == 'Axis Marol')
        //   {
        //       this.editedItem.BranchCode ='859595'
        //   }
        //    if(branch == 'Axis Dadar')
        //   {
        //       this.editedItem.BranchCode ='4314314'
        //   }
        //    if(branch == 'Axis Mulund')
        //   {
        //       this.editedItem.BranchCode ='87987'
        //   }
        //    if(branch == 'Axis kandivali')
        //   {
        //       this.editedItem.BranchCode ='00000'
        //   }
        //    if(branch == 'Axis Andheri')
        //   {
        //       this.editedItem.BranchCode ='242347873'
        //   }
        //    if(branch == 'Axis Malad')
        //   {
        //       this.editedItem.BranchCode ='78768678'
        //   }
        //    if(branch == 'Axis Borivali')
        //   {
        //       this.editedItem.BranchCode ='00565464'
        //   }
                   this.editedItem.RemarkSource=item.remarksfromSource
                    this.editedItem.RemarkUser=item.remarksfromUser
                   this.editedItem.Product=item.statusProductType
                   this.editedItem.Email=item.email
                    this.editedItem.Mobile=item.primaryMobile
                    this.editedItem.Activity = item.Activitytype
                   this.editedItem.State=item.state
                    this.editedItem.City=item.city
                    this.editedItem.Firstname=item.firstName
                   this.editedItem.Lastname=item.lastName
                 
                //     epochDate:item.
                //    userIdentity:item.
                //     '5b8e3c9b44487867bad9645b':item.
                //     leadownidentity:item.
                      
                    //   user_Id:'this.getAgentInfo()._id'

           // this.editedItem.chanelName = itemsUser.channelName;
           // this.editedItem.channelCode = itemsUser._id;
        
        },
        getTime(time)
        {
            console.log("Time outside function is",time)
            this.editedItem.Scheduletime = time.toString()
             console.log("Time outside function is", this.editedItem.Scheduletime)
        },

        
        deleteItem (item,index) {
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
            let leadownidentity=''
            if(this.editedItem.Owner !==''){
                leadownidentity=this.editedItem.Owner
            }else{
                leadownidentity = '5b8e3c9b44487867bad9645b'
            }
            let userIdentity = this.$store.getters.getAgentDetails
            let epochDate = moment(this.editedItem.Scheduledate).valueOf()
            let self = this;
          
            this.POSTUSER('addlead/' ,{
                appointmentdisPosition:this.editedItem.Disposition,
                leadStatus:this.editedItem.Status,
                remarksfromSource:this.editedItem.RemarkSource,
                remarksfromUser:this.editedItem.RemarkUser,
                statusProductType:this.editedItem.Product,
                email:this.editedItem.Email,
                primaryMobile:this.editedItem.Mobile,
                state:this.editedItem.State,
                city:this.editedItem.City,
                Activitytype:this.editedItem.Activity,
                branchCode :this.editedItem.BranchCode,
                teamMembers: "[]",
                firstName:this.editedItem.Firstname,
                lastName:this.editedItem.Lastname,
                start_time:parseInt(this.editedItem.Scheduletime),
                start_date:epochDate,
                //  lead_Creator_Id:leadownidentity,
                // lead_Owner_Id:'5b8e3c9b44487867bad9645b',
                lead_Creator_Id:'5b8e3c9b44487867bad9645b',
                lead_Owner_Id:leadownidentity,
                user_id:leadownidentity,

                //USAMA NEEDED FIELDS NOT NEEDED FOR ADMIN
                line1: '',
                line2: '',
                line3: '',
                country: '',
                // state: storeData[2].contactLeadData.state /** For country */ ,
                // city: storeData[2].contactLeadData.city,
                pincode: '',
                // primaryMobile: storeData[2].contactLeadData.primaryMobile,
                secondaryMobile: '',
                landlineNo: '',
                // email: storeData[2].contactLeadData.email,
                socialSecurityAdharNo: '',
                mailingAddressStatus: 'Yes',
                // mailingAddressSecond
                mailingAddressSecond: JSON.stringify({
                    mailingaddress: {
                        line1: '',
                        line2: '',
                        line3: '',
                    },
                    state:'',         
                    city: '',
                    country: '',
                    pincode: '',
                }),
                // firstName: storeData[1].personalLeadData.firstName,
                // lastName: storeData[1].personalLeadData.lastName,
                dob: '',
                gender: '',
                maritalStatus: '',
                childStatus: '',
                ChildInfo: '[]',
                education: '',
                incomeGroup: '',
                annuaLincome: '',
                professionType: '',
                // //
                productCategory: '',
                productType: '',
                solution: '',
                expectedPremium: '',
                expectedclosureDate: '',
                HaveLifeInsurance: {
                    ExistInsur: 'No',
                    ExistHealthInsur: 'No'
                },
                SumAssured: '',
                Insurance: '',
                Insurancedetails: '[]',
                riskComensmentDate: '',
                HaveLifeInsurance_details: '[]',

                } , res => {
                    if(res.data.errCode == -1){
                        this.showSnackbar({text: 'Lead Created Successfully',color:'green'}) 
                        this.notificationdata()
                        console.log('RESPONSE',res.data.errMsg);               
                        let postResponse = res.data.errMsg;
                        console.log('USER DETAILS',postResponse)
                        this.usrdetails.push(postResponse)
                        this.dialog = false 
                    }
                    else if (res.data.errCode === 4) {
                        // self.vSnackBar("Success", storeData[0].statusLeadData.start_date)
                            this.showSnackbar({text: 'Database Error',color:'red'}) 
                    } else if (res.data.errCode === 9) {
                            this.showSnackbar({text: 'Lead phone no. already exists',color:'red'})
                    } else if (res.data.errCode === 16) {
                            this.showSnackbar({text: 'Appointment not booked',color:'red'})
                    } else if (res.data.errCode === 1) {
                            this.showSnackbar({text: 'Mandatory field not found',color:'red'})
                    }
                    // } else if (response.data.errCode === 576) {
                    //       this.showSnackbar({text: 'Database Error',color:'red'})
                    //     self.$store.commit('SAVE_RESPONSE', response.data);
                    //     callback(1);
                    //     self.$router.push("/leadmasterpage/statuslead");
                    // } else if (response.data.errCode === 729) {
                    //     self.$store.commit('SAVE_RESPONSE', response.data);
                    //     callback(1);
                    //     self.$router.push("/leadmasterpage/statuslead");
                    // } else if (response.data.errCode === 625) {
                    //     self.$store.commit('SAVE_RESPONSE', response.data);
                    //     callback(1);
                    //     self.$router.push("/leadmasterpage/statuslead");
                    // } 
                }

            ).catch(
                err => {
                        this.showSnackbar({text: 'Please Check API Response',color:'red'})
                    console.log(err) ;
                }
            );
                
        },
        //CODE FOR NOTIFICATIONS
        notificationdata(){
            var today = Date.now()
            let convertedDate = moment(today).valueOf()
            let me = this;
            var epochdate = "";
            if (this.editedItem.Scheduledate !== "") {
                epochdate = moment(this.editedItem.Scheduledate).valueOf()
            }
            //  me.vSnackBar('success', 'Notification function excuted')
            let notification_types = ''
            if(this.editedItem.Activity === 'New Sales Call'){
                notification_types ='applications'
            }else if(this.editedItem.Activity === 'Renewal Pick-up'){
                notification_types ='renewals'
            }else if(this.editedtItem.Activity === 'Proposal Pick-up'){
                notification_types ='applications'
            }

            let index = this.branchDetails.findIndex( obj => obj.branchCode === me.editedItem.BranchCode);

            let notiobj = {
                branchName : this.branchDetails[index].branchName,
                branchcode :this.editedItem.BranchCode,
                activityType :this.editedItem.Activity,
            }
            let NotifyData = {
                first_name :this.editedItem.Firstname,
                last_name :this.editedItem.Lastname,
                ClientName: this.firstname+' '+this.lastname,
                notification_body: JSON.stringify(notiobj),
                notification_type: notification_types,
                notification_status : this.editedItem.Status,
                Deadline:epochdate,
                created_date: convertedDate
            }
            let leadidentity=''
            if(this.editedItem.Owner !==''){
                leadidentity=this.editedItem.Owner
            }else{
                leadidentity = '5b8e3c9b44487867bad9645b'
            }
            this.POSTUSER('sendnotification/' +leadidentity,{
                first_name :this.editedItem.Firstname,
                last_name :this.editedItem.Lastname,
                ClientName: this.firstname+' '+this.lastname,
                notification_body: JSON.stringify(notiobj),
                notification_type: notification_types,
                notification_status : this.editedItem.Status,
                Deadline:epochdate,
                created_date: convertedDate
            } , res => {
                if(res.data.errCode == -1){

                }else{
                    this.showSnackbar({text: 'Mandatory field not found',color:'red'})
                }
            })

            //        stream.fetch({
            //                            method: "POST",
            //                            url: "http://159.89.161.64:5055/secure/user/sendnotification/" +
            //                                me.$store.state.agentDetails._id,
            //                            headers: {
            //                                "Content-Type": "application/json"
            //                            },
            //                            body: JSON.stringify(NotifyData),
            //                            type: "json"
            //                        },

            //                        function(response) {
            //                            //   var me = this
            //                            var errcodeAPI = -1;
            //                            if (response.data.errCode == errcodeAPI) {
            //                            } else {
            //                                me.vSnackBar('error', 'Mandatory field not found')
            //                            }
            //                        }
            //                    );

           },
           notificationPutData(){
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
