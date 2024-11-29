<template>
    <v-app>
        <!-- <v-content> -->
            <!-- Activity upload -->
            <v-card>
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3 " style="flex-flow:column wrap;width:100%;padding-right:37px">
                    <v-text class="mt-4 headline font-weight-bold">Car Data Upload</v-text>
                    <hr>
                    <!-- <v-flex row wrap  class="mt-4">
                    <h3>To bulk upload Activity details:</h3>
                    </v-flex> -->
                
                  <!-- <v-flex class="mt-4" style="flex-direction:row;" >
                        <v-btn depressed medium color="blue-grey" class="white--text">
                            download sample
                            <v-icon right dark>get_app</v-icon>
                        </v-btn>
                        <v-flex  class="fileContainer-bulk  mt-6">
                               <v-text class="upload-text">UPLOAD FILE</v-text>
                                  <v-icon right dark>publish</v-icon>
                          <input type="file"  
                        id="fileUpload"
                         @change="jsonupload">
                        </v-flex>
                  
                    </v-flex> -->
                    <!-- <v-flex class="mt-4"> 
                        <h3>To bulk modify Activity details:</h3>
                    </v-flex> -->
                    <!-- <v-flex class="mt-4">                        
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
                        </v-flex> -->
                
                        <!-- <v-flex  class="add-branch-btn">
                        <v-btn depressed medium color="primary" class="white--text" @click="addUser()">
                            Add Lead
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                        </v-flex> -->
                        <v-flex class="margin-t30">
                          <v-menu transition="slide-y-transition" >
                            <v-btn round depressed medium slot="activator"  color="secondary" class="white--text">
                                Add Car Data
                                <v-icon dark right>add_circle</v-icon>
                            </v-btn>
                            <v-list>
                                <!-- <v-list-tile>
                                    <v-btn flat color="secondary" @click="addUser()">Single User</v-btn>
                                </v-list-tile> -->
                                <v-list-tile >
                                    <v-btn flat color="secondary"  @click="dialogBulkUpldFun()">Bulk Upload</v-btn>
                                </v-list-tile>

                            </v-list>
                        </v-menu>
                        </v-flex>
                        
                    <v-flex justify-center md12 ml-3 mt-3>
                        <h3 class="text-xs-center mb-3">Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="userTableData"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                        <td class="">{{props.item.make}}</td>                        
                        <td class="">{{props.item.model}}</td>
                        <td class="">{{props.item.productionYear}}</td>
                        <td class="">{{props.item.city}}</td>
                        <td class="">{{props.item.fuel}}</td>
                        <td class="">{{props.item.RegistrationNo}}</td>
                        <v-icon small class="mr-2" style="cursor:pointer" @click="editItem(props.item,props.index)">edit</v-icon>
                        <v-icon small style="cursor:pointer" @click="deleteItem(props.item,props.index)">delete</v-icon>
                            
                        </template>
                    </v-data-table>
                </v-flex>
<!-- // LEAD POPUP DIALOG -->
                    <v-dialog v-model="dialog"  persistent max-width = "800px"  >

                     <v-card>
                        <v-flex style="background-color:#3a3a3a;">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                    <v-card-text>
                         <form @submit.prevent="saveAndEdit()">
                        <v-container  grid-list-md>
                            <v-layout wrap>
                                  <v-flex  xs12 sm6 md6>
                                <v-select :items="itemactivity" 
                                item-value="src"
                                  v-model="editedItem.Activity" 
                                   label="Activity Type"
                                     @input="$v.editedItem.Activity.$touch()"
                                @blur="$v.editedItem.Activity.$touch()"
                                 :error-messages="activityErrors"
                                   ></v-select>
                            </v-flex>
                                     <v-flex  xs12 sm6 md6>
                                <v-select :items="itemstatus" 
                                item-value="value"
                                item-text="text"
                                @input="changeStatus(editedItem.Status)"
                                  v-model="editedItem.Status" 
                                   label="Activity Status" ></v-select>
                            </v-flex>
                                 <v-flex  xs12 sm6 md6 v-if="showDispostion==true">
                                <v-select :items="itemdisposition" 
                                 item-value="value"
                                item-text="text"
                                @input="changeDisposition(editedItem.Disposition)"
                                  v-model="editedItem.Disposition" 
                                   label="Activity Disposition" ></v-select>
                            </v-flex>


                            
                             <v-flex xs12 sm6 md6 v-if="showCalendar==true">
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
                                        v-model="editedItem.Scheduledate"
                                        label="Pickup Date"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint
                                        prepend-icon="event"
                                          @input="$v.editedItem.Scheduledate.$touch()"
                                @blur="$v.editedItem.Scheduledate.$touch()"
                                 :error-messages="dateErrors"
                                    ></v-text-field>
                                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                            </v-flex>
                             <v-flex xs12 sm6 md6 v-if="showCalendar==true">
                                    <v-select :items="itemtime" 
                                 item-value="value"
                                item-text="time"
                                  v-model="editedItem.Scheduletime" 
                                   label="Select Time" 
                                     @input="$v.editedItem.Scheduletime.$touch()"
                                @blur="$v.editedItem.Scheduletime.$touch()"
                                 :error-messages="timeErrors"
                                   ></v-select>
                            </v-flex>
                             <v-flex xs12 sm6 md6 v-if="showCalendar==true">
                                <v-select :items="itemreminder" 
                                item-value="src"
                                @input="changeDispo(editedItem.Reminder)"
                                  v-model="editedItem.Reminder" 
                                   label="Set Reminder for Lead Owner" ></v-select>
                            </v-flex>
                            </v-layout>
                            <v-layout wrap>
                                <!-- Added by Abhishek -->
                                 <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Firstname" label="First Name of Customer"
                                  @input="$v.editedItem.Firstname.$touch()"
                                @blur="$v.editedItem.Firstname.$touch()"
                                 :error-messages="nameErrors"
                                ></v-text-field>
                            </v-flex>

                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Lastname" label="Last Name of Customer"
                                  @input="$v.editedItem.Lastname.$touch()"
                                @blur="$v.editedItem.Lastname.$touch()"
                                 :error-messages="lastnameErrors"
                                ></v-text-field>
                            </v-flex>

                                 <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Email" label="Email Address of Customer"></v-text-field>
                            </v-flex>

                             <v-flex xs12 sm6 md6>
                                <v-text-field  v-model="editedItem.Mobile" label="Primary Mobile of Customer"
                                  @input="$v.editedItem.Mobile.$touch()"
                                @blur="$v.editedItem.Mobile.$touch()"
                                 :error-messages="mobileErrors"
                                ></v-text-field>
                            </v-flex>
                            <v-flex>
                                 <v-select :items="itemstate" 
                                item-value="src"
                                  v-model="editedItem.State" 
                                   label="State" ></v-select>
                            </v-flex>
                            <v-flex  xs12 sm6 md6>
                                <v-select :items="itemcity" 
                                item-value="src"
                                  v-model="editedItem.City" 
                                   label="City" ></v-select>
                            </v-flex>
                             
                                <v-flex  xs12 sm6 md6>
                                <v-select :items="branchArray" 
                                item-value="src"
                                @input = "changeBranch(editedItem.Branch)"
                                  v-model="editedItem.Branch" 
                                   label="Branch Name" ></v-select>
                            </v-flex>

                               <v-flex  xs12 sm6 md6>
                                   <v-text-field v-model="editedItem.BranchCode" label="Branch Code"></v-text-field>
                                <!-- <v-select :items="branchCodeArray" 
                                item-value="src"
                                  v-model="editedItem.BranchCode" 
                                   label="Branch Code" ></v-select> -->
                            </v-flex>


                             <v-flex  xs12 sm6 md6>
                                <v-select :items="itemproduct" 
                                item-value="src"
                                  v-model="editedItem.Product" 
                                   label="Product Type" ></v-select>
                            </v-flex>

                            




                           
                            
                            </v-layout>
                            <v-layout wrap>
                             


                              <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.RemarkSource" label="Remarks From Source"></v-text-field>
                            </v-flex>

                                 <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.RemarkUser" label="Remarks From User"></v-text-field>
                            </v-flex>
                            
                            </v-layout>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md6 mt-3>
                              
                                <v-text>Currently this lead is allocated to {{LeadAllocationName}}</v-text>
                            </v-flex>
                              <!-- <v-flex xs12 sm6 md6 v-if="showOwner== true">
                              
                                <v-text>Currently this lead is allocated to {{LeadAllocationName}}</v-text>
                            </v-flex> -->
                              <v-flex xs12 sm6 md6 @click="showOwnerDetails">
                                  <v-btn>Change Owner</v-btn>
                              </v-flex>
                                
                                 <v-flex  v-if="displayOwnerDetails==true" xs12 sm6 md6>
                                <v-select :items="itemdesignation" 
                                item-value="src"
                                  v-model="editedItem.Designation" 
                                   label="Select Designation" ></v-select>
                            </v-flex>

                             <v-flex  v-if="displayOwnerDetails==true"  xs12 sm6 md6>
                                <v-select :items="itemowner" 
                                 item-value="value"
                                item-text="text"
                                @input ="changeOwner(editedItem.Owner)"
                                  v-model="editedItem.Owner" 
                                   label="Select Lead Owner" ></v-select>
                            </v-flex>
                              
                                </v-layout>

                         
                        </v-container>
                         </form>
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
                    <!-- END LEAD POPUP DIALOG HERE -->

                </v-flex>    
            </v-layout> 

                <!-- DIALOG FOR BULK UPLOAD -->
                    <v-dialog v-model="dialogBulkUpld" persistent max-width="700px">
                         <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white;justify-content:space-between;" >Upload File
                                <v-icon dark @click="dialogBulkUpld = false">clear</v-icon>
                                <!-- <img src='https://www.materialui.co/materialIcons/file/file_upload_white_192x192.png' width="35px"></img> -->
                            </v-card-title>

                        </v-flex>

                     <v-card-text>
                        <v-container grid-list-md>
                           <v-stepper v-model="steps">
                                <v-stepper-header>
                                <v-stepper-step :complete="steps > 1"  step="1">Upload Data</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step  step="2">Status</v-stepper-step>

                                <!-- <v-divider></v-divider> -->

                                <!-- <v-stepper-step  step="3">Name of step 3</v-stepper-step> -->
                                </v-stepper-header>

                                <v-stepper-items>
                                <v-stepper-content step="1">
                                    <!-- <v-card class="mb-3"  height="200px"> -->
                                        <v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
                                        <v-layout >
                                         <v-flex  class="fileContainer-bulk  mt-6">
                                     <v-text class="upload-text">UPLOAD FILE</v-text>
                                            <v-icon right dark>publish</v-icon>
                                    <input type="file"  
                                    id="fileUpload"
                                    @change="jsonupload">
                                    </v-flex>
                                        <!-- <div class="fileContainer-bulk  mt-4-bulk"  >
                                            <v-text class="documt-normal-text-size-bulk subheading ">UPLOAD</v-text>
                                            <v-icon dark>publish</v-icon>
                                            <input type="file"
                                            id="fileUpload"
                                            @change="jsonupload">
                                        </div> -->
                                        <v-layout ml-3 column>
                                            <v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Supports xls/csv format.</v-text>
                                            <v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Approx time to upload 2 mb file - 30 min.</v-text>
                                        </v-layout>
                                        </v-layout>
                                        <v-layout ml-3 mt-3>
                                            <div v-if="fileLink !== ''">
                                                <v-layout row>
                                                    <div class="font-weight-medium body-2 "> Selected File: </div>
                                                    <div class="body-1 font-weight-regular font-italic">{{fileLink}}</div>
                                                </v-layout>
                                            </div>
                                        </v-layout>
                                    <!-- </v-card> -->
                                    <!-- <v-divider></v-divider>                                         -->
                                    <v-layout mt-3 justify-space-between>
                                        <!-- <v-card-actions style="justify-content:/space-between;"> -->
                                            <!-- <v-spacer></v-spacer> -->
                                            <a href="../assets/UserRoles.xlsx" download>
                                            <v-btn color="primary">sample file
                                                <v-icon right dark>save_alt</v-icon>
                                            </v-btn>
                                            </a>
                                            <v-btn color="primary" @click="goNext()">Next <v-icon class="ml-2" size="20px">arrow_forward</v-icon></v-btn>

                                        <!-- </v-card-actions> -->
                                    </v-layout>
                                </v-stepper-content>

                                <v-stepper-content step="2">
                                    <!-- <v-card class="mb-5 pa-5" height="200px"> -->
                                        <v-flex xs12 sm12 md12 style="display:flex;align-items:center">
                                            <v-icon large color="success">check_circle_outline</v-icon>
                                            <v-text class="subheading font-weight-medium ml-3">{{sucessCount}} Users Data successfully Uploaded</v-text>
                                        </v-flex>

                                        <v-flex xs12 sm12 md12 mt-3 style="display:flex;align-items:center">
                                            <v-icon large color="error">highlight_off</v-icon>
                                            <v-text class="subheading font-weight-medium ml-3">Errors Found in {{failCount}} Users Data</v-text>
                                        </v-flex>
                                        <v-flex mt-3>
                                            <v-text class="subheading font-weight-medium ml-1">Failed Data:</v-text>
                                            <a :href ="errorLink" download>{{errorLink}}</a>
                                        </v-flex>

                                    <!-- </v-card>  -->
                                    <v-card-actions style="justify-content:flex-end;">
                                    <!-- <v-btn color="primary" @click.native=" close()">Download
                                        <v-icon right dark>save_alt</v-icon>
                                    </v-btn> -->
                                    <v-layout mt-5 justify-space-between>
                                        <v-btn color="primary" @click="steps =1"><v-icon class="mr-2">arrow_back</v-icon>Previous</v-btn>
                                        <v-btn color="primary" @click="cancelStepper">Cancel <v-icon class="ml-2" size="20px">clear</v-icon></v-btn>
                                    </v-layout>
                                    </v-card-actions>
                                </v-stepper-content>
                             </v-stepper-items>
                            </v-stepper>

                        </v-container>
                    </v-card-text>

                    </v-card>

                    </v-dialog>
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
import moment from 'moment'
import { mapMutations } from 'vuex'
import { required, minLength, between,email } from 'vuelidate/lib/validators'
export default {
    validations: {
     editedItem: {
      Firstname: {
        required,
      },
       Lastname: {
        required,
      },
      Mobile:{
          required,
      },
      Scheduledate:{
          required
      },
       Scheduletime:{
          required,
      },
        Activity:{
          required
      },
},
mounted(){
        // This Function is used to Get Activity Upload data with pagination.
    //   this.GetActivitydata(this.Activityleadskip)
    },
},
    data(){
        return{
            Activityleadskip:0,
            pagination: {},
            pageLength:0,
            Activitydata:[],
            bulkData:[],
            sucessCount:0,
            failCount:0,
            errorLink:'Link Comes Here',
            moment:moment,
            dialog: false,
            dialogBulkUpld:false,
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
                        {text: 'Car Make', value: 'carmake'},
                        {text: 'Car Model', value: 'carmodel'},
                        {text: 'Year Of Production', value: 'Yearofproduction'},
                        {text: 'City', value: 'city'},
                        {text: 'Fuel', value: 'fuel'},
                        {text: 'Registration No', value: 'registrationno'},
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
            user_id:'',
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
        this.$store.commit('SET_PAGE_TITLE','Car Bulk Upload');
        this.GETUSER('fetch_carInfo?filter=all' , res => {
                this.userTableData = res.data.errMsg;
                console.log('GET USER REPONSE on varible',this.userTableData)
                // this.usrdetails = res.data.errMsg
                // for(var i =0 ;i< this.usrdetails.length;i++)
                // {
                //     this.TableName = this.usrdetails[i].firstName + this.usrdetails[i].lastName
                // }
            } 
        ).catch(
            err => {
                console.log(err) ;
            }
        );
        //    axios.get(this.API_Service_admin()+'getbranch?created_by=5c2f3b609213a67e026006b1&branchfilter=All')
        //                 .then(res => {
        //             console.log('Branch details', res)
        //             let branchArr = res.data.errMsg;
        //             this.branchDetails = res.data.errMsg
        //             for(var i =0;i< branchArr.length;i++)
        //             {
        //                 this.branchArray.push(branchArr[i].branchName)
        //                 this.branchCodeArray.push(branchArr[i].branchCode)
        //             }
        //             console.log("Branch Array",this.branchArray);
        //         })
        //          this.user_id = this.getAgentInfo()._id;
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
                 nameErrors () {
      const errors = []
      if (!this.$v.editedItem.Firstname.$dirty) return errors

      !this.$v.editedItem.Firstname.required && errors.push('First Name is required.')
      return errors
    },
               lastnameErrors () {
      const errors = []
      if (!this.$v.editedItem.Lastname.$dirty) return errors

      !this.$v.editedItem.Lastname.required && errors.push('Last Name is required.')
      return errors
    },
               mobileErrors () {
      const errors = []
      if (!this.$v.editedItem.Mobile.$dirty) return errors

      !this.$v.editedItem.Mobile.required && errors.push('Mobile no is required.')
      return errors
    },
               dateErrors () {
      const errors = []
      if (!this.$v.editedItem.Scheduledate.$dirty) return errors

      !this.$v.editedItem.Scheduledate.required && errors.push('Date is required.')
      return errors
    },
               timeErrors () {
      const errors = []
      if (!this.$v.editedItem.Scheduletime.$dirty) return errors

      !this.$v.editedItem.Scheduletime.required && errors.push('Time is required.')
      return errors
    },
               activityErrors () {
      const errors = []
      const name=''
      if (!this.$v.editedItem.Activity.$dirty) return errors

      !this.$v.editedItem.Activity.required && errors.push('Activity Type is required.')
      return errors
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
            // this function is used to get Activity Upload Lead details from API with paginatin @Ashraf Khan =====  date:2/4/2019
            GetActivitydata(e){
                this.Activityleadskip =e
                console.log("Page skip",this.Activityleadskip)
                var user = this.$store.state.userId
                this.GETUSER('getmyAttendance/'+user+'?sortBy=604800000&skip='+this.Activityleadskip , res => {

                        this.Activitydata = res.data.errMsg[0]
                        var pageLen = res.data.errMsg[1]
                        let totalCount = pageLen[0].totalCount
                        console.log('User Atten REPONSE:',this.Activitydata)
                        console.log('Page Length:',totalCount)
                        this.pageLength = Math.ceil(totalCount/10)
                    }
                ).catch(
                    err => {
                        console.log(err) ;
                    }
                );
        
            },
            next(event){
                console.log("Next Page",event)
                this.Activityleadskip = (event-1)*10
                this.GetActivitydata(this.Activityleadskip)
                },

        // End heare Pagination function

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
        jsonupload(e) {
            console.log("Event is",e)
            var me = this
        //Reference the FileUpload element.
        var fileUpload = document.getElementById("fileUpload");
        console.log("File is",fileUpload)
 
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
 
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    //For NON IE Browser.
                      reader.addEventListener('load', (e) => {
       this.ProcessExcel(e.target.result)
    })
    reader.readAsBinaryString(fileUpload.files[0])
                } 
                else {
                    //For IE Browser.
                      reader.addEventListener('load', (e) => {
                                   var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        this.ProcessExcel(data);
                      })
                      reader.readAsArrayBuffer(fileUpload.files[0]); 
                
                 }
                }
             else {
                me.vSnackBar("error","This browser does not support HTML5.");
            }
        } else {
           
            me.vSnackBar("error","Please upload a valid Excel file.");
        }
    },

     ProcessExcel(data) {                     
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        console.log("Workbook is",workbook.Strings)

 
       var first_sheet_name = workbook.SheetNames[0];
           /* Get worksheet */
           var worksheet = workbook.Sheets[first_sheet_name];
        //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
        //        raw: true
        //    }));
        //  workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var excelData =[]
        excelData = XLSX.utils.sheet_to_csv(worksheet);
        // var json_object = JSON.stringify(XL_row_object);
        console.log("Excel Data is",excelData);
        var lines=excelData.split("\n");

  var result = [];

  var headers=lines[0].split(",");
//    var headers=lines[0];
  console.log('Headers are',headers)
  console.log('Lines are',lines)

  for(var i=1;i<lines.length-1;i++){

	  var obj = {};
    //   var currentline=lines[i];  
       var currentline=lines[i].split(",");
	  for(var j=0;j<currentline.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

      result.push(obj);
        

  }
  console.log("JSON IS",result)
  let Str = JSON.stringify(result)
//   let StrParse = JSON.parse(Str)
  this.bulkData = Str


        
    },
     goNext(){
        console.log("Data is",this.bulkData)
        const formData={
            jsonCarData:this.bulkData
        }

        this.POST('car_bulk/'+this.getAgentInfo()._id,formData , res=>{
            if(res.data.errCode==-1){
                this.showToast('File uploaded successfully', this.TOST().SUCCESS);
                this.steps = 2
                this.sucessCount = res.data.errMsg.success
                this.failCount = res.data.errMsg.failed
                this.errorLink = res.data.errMsg.link
            }else{
                this.showToast('Error while uploading lead Data', this.TOST().ERROR); 
            }
        })
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
       dialogBulkUpldFun(){
            // this.dialogBulkUpld = false
            console.log("Dialog Open", this.dialogBulkUpld)

           this.dialogBulkUpld = true
                 console.log("Dialog Open", this.dialogBulkUpld)
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
            this.GET('getbranch?created_by='+this.getAgentInfo()._id+'&branchfilter=All' , res => {
                console.log('Branch details', res)
                let branchArr = res.data.errMsg;
                this.branchDetails = res.data.errMsg
                for(var i =0;i< branchArr.length;i++){
                    this.branchArray.push(branchArr[i].branchName)
                    this.branchCodeArray.push(branchArr[i].branchCode)
                }
                console.log("Branch Array",this.branchArray)
            })
        },

        editUser(){
            console.log("Edited data",this.savedItem)
            this.$v.$touch()
            console.log(this.$v)  
            if (this.$v.$invalid == true) {
                console.log("Form has errors")  
            } else{

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

                } , res => {
                        if(res.data.errCode == -1){
                            this.showSnackbar({text: 'Lead Updated Successfully',color:'green'}) 
                            if(this.editedItem.Status == 'rescheduled' && this.editedItem.Disposition=='rescheduled'){
                                this.notificationdata()
                            }
                            console.log('RESPONSE',res.data.errMsg);               
                            let putResponse = res.data.errMsg;
                            console.log('PUT RESPONSE',putResponse)
                        }else if (res.data.errCode === 4) {
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
}
        },


        editItem (item,i) {
            console.log("LEAD ID", item._id);
            let me = this;
            this.savedIndex=i
                this.GET('getbranch?created_by='+this.getAgentInfo()._id+'&branchfilter=All' , res => {
                    console.log('Branch details', res)
                    let branchArr = res.data.errMsg;
                    for(var i =0;i< branchArr.length;i++){
                        this.branchArray.push(branchArr[i].branchName)
                    }
                    console.log("Branch Array",this.branchArray);
                    // BranchCode = branchCode
                    // Branch = branchName
                    let index = branchArr.findIndex( obj => obj.branchCode === item.branchCode);
                    console.log("CODE BRANCH",branchArr[index].branchName)
                    me.editedItem.Branch= branchArr[index].branchName;
                    me.editedItem.BranchCode= branchArr[index].branchCode;
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
                if(item.leadOwnerId=='5b8e38e244487867bad9644b'){
                    // this.displayOwnerDetails = true
                    this.LeadAllocationName = 'DK'
                    this.editedItem.Owner = 'DK'
                }
                this.LeadId = item._id
                console.log("Lead Id in Edit is",this.LeadId)
                console.log("Status is",item.leadStatus)
                this.editedItem.Status=item.leadStatus
                this.editedItem.Disposition=item.appointmentdisPosition
                if(item.leadStatus !== 'newleadentery'){
                    this.showDispostion = true
                    if(item.appointmentdisPosition ==='appointment'){
                        this.itemdisposition=[{text:'Reschedule',value:'appointment'}]
                        this.showCalendar = true
                    }else if(item.appointmentdisPosition==='collected'){
                        this.itemdisposition = [{text:'Collected',value:'collected'}]
                    }else if(item.appointmentdisPosition==='notreachable')
                        this.itemdisposition = [{text:'Not Reachable',value:'notreachable'}]
                        
                        else if(item.appointmentdisPosition==='ringingbusy')
                        this.itemdisposition = [{text:'Ringing/Busy',value:'ringingbusy'}]
                            else if(item.appointmentdisPosition==='wrongnumber')
                        this.itemdisposition = [{text:'Wrong Number',value:'wrongnumber'}]
                            else if(item.appointmentdisPosition==='invalid')
                        this.itemdisposition = [{text:'Invalid',value:'invalid'}]
                }else {
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
                //   user_Id:'5b3b4cc28fa96d39870443e3'
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
            this.$v.$touch()
            console.log(this.$v)  
            if (this.$v.$invalid == true) {
                console.log("Form has errors")  
            } else{
                let leadownidentity=''
                if(this.editedItem.Owner !==''){
                    leadownidentity=this.editedItem.Owner
                }else{
                    leadownidentity = '5b8e3c9b44487867bad9645b'
                }
                let userIdentity = this.$store.getters.getAgentDetails
                let epochDate = moment(this.editedItem.Scheduledate).valueOf()
                let self = this;
                let formdata={
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
                }
                this.usrdetails.push(formdata)
                this.POSTUSER('addlead/' ,formdata , res => {
                    if(res.data.errCode == -1){
                        this.showSnackbar({text: 'Lead Created Successfully',color:'green'}) 
                        this.notificationdata()
                        console.log('RESPONSE',res.data.errMsg);               
                        let postResponse = res.data.errMsg;
                        console.log('USER DETAILS',postResponse)
                        this.usrdetails.push(postResponse)
                        this.dialog = false 
                            // window.location.reload()                           
                    }else if (res.data.errCode === 4) {
                        // self.vSnackBar("Success", storeData[0].statusLeadData.start_date)
                        this.showSnackbar({text: 'Database Error',color:'red'}) 
                    } else if (res.data.errCode === 9) {
                        this.showSnackbar({text: 'Lead phone no. already exists',color:'red'})
                    } else if (res.data.errCode === 16) {
                        this.showSnackbar({text: 'Appointment not booked',color:'red'})
                    } else if (res.data.errCode === 1) {
                        this.showSnackbar({text: 'Mandatory field not found',color:'red'})
                    }else if(res.data.errCode == 625) {
                        this.showSnackbar({text: 'Time cannot be less than current time',color:'red'})
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
                }).catch(
                    err => {
                            this.showSnackbar({text: 'Please Check API Response',color:'red'})
                        console.log(err) ;
                    }
                );
            }   
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
                //                            url: "http://159.89.161.64:5015/secure/user/sendnotification/" +
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
.fileContainer-bulk {
    overflow: hidden;
    position: relative;
}

.fileContainer-bulk [type=file] {
    cursor: inherit;
    display: block;
    font-size: 999px;
    filter: alpha(opacity=0);
    /* min-height: 100%;
    min-width: 100%; */
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
}

/* Example stylistic flourishes */

.fileContainer-bulk {
    background-color:#1976d2 ;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        /* height: 10px; */
}

.fileContainer-bulk [type=file] {
    cursor: pointer;
}
     @media screen and (min-width: 320px){
         .margin-t30{
             margin-top: 30px;
         }
            .upload-text{
             font-size:14px;
             color:#FDFEFF;
             font-weight: 500
         }
            .fileContainer-bulk {
            width:155px;
            display: inline-flex;
            border-radius: 2px;
            margin-top: 6px;
            height: 37px;
            position: relative;
            cursor: pointer;
        }

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
          .pagination{
            margin-top: 20px;
            }
      }
</style>