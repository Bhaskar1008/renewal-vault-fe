<template>
   <v-card>
      <v-layout row wrap>

         <div>
            <hr>
         </div>
         <v-flex class="ml-3 mr-3 mt-3" style="flex-flow:column wrap;width:100%;">
            <v-layout row justify-space-between class="mr-5 mt-3 ">
               <v-flex>
                  <v-dialog v-model="dialog" persistent max-width="800px">
                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                           <v-card-title class="subheading" style="color:white">{{btnname}} Partner</v-card-title>
                        </v-flex>
                        <v-card-text>
                           <v-flex v-if="false" xs12 sm6 md6>
                              <p class="body-2 mb-3">Please upload Profile Image from local:</p>
                              <v-layout align-center row wrap>
                                 <v-flex xs4 sm6 md2>
                                    <input type="file" name="media_upload" ref="prodVideo" accept="image/*" class="sd-img-btn-size media-pos" style="opacity: 0" @change="handleFileUpload"/>
                                    <img src="../assets/Group_968.png" class="sd-img-btn-size"/>
                                 </v-flex>
                                 <!-- <v-flex xs6 sm3>
                                    <p class="caption font-italic font-weight-medium" style="color:#9B9B9B">Supports mp4 format. Approx time to upload 2mb file - 30 min</p>
                                    </v-flex> -->
                              </v-layout>
                           </v-flex>
                           <v-container grid-list-md>
                              <v-layout wrap>
                                 <v-flex xs12 sm6 md6>
                                    <v-select v-model="partnerInfo.channelName"
                                        :rules="channelname"
                                        @blur="valdationallfields(partnerInfo.channelName, 'Channelname')"
                                        :readonly="channeledit"
                                        label="Channel Name*"
                                        :items="channeldata"
                                        item-text="text"
                                        item-value="value"
                                    ></v-select>

                                 </v-flex>
                                 <v-flex xs12 sm6 md6>
                                    <v-text-field
                                       v-model="partnerInfo.partnerId" readonly="true"  label="Partner ID*"></v-text-field>
                                 </v-flex>
                                 <!-- <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="partnerInfo.salutation" label="Salutation"></v-text-field>
                                    </v-flex> -->
                                 <v-flex xs12 sm6 md6>
                                    <v-text-field
                                        minlength="3"
                                        maxlength="50"
                                        counter="50"
                                        :rules="partnername"
                                        @blur="valdationallfields(partnerInfo.partnerName,'Partnername')"
                                        @input="valdationallfields(partnerInfo.partnerName,'Partnername')"
                                        v-model="partnerInfo.partnerName"
                                        label="Partner Name*"
                                    ></v-text-field>
                                 </v-flex>
                                 <!-- <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="partnerInfo.middlename" label="Middle Name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="partnerInfo.lastname" :rules="[v => !!partnerInfo.lastname || 'This field is required']" required label="Last Name*"></v-text-field>
                                    </v-flex> -->
                                 <v-flex xs12 sm6 md6>
                                    <!-- <v-text-field
                                        v-model="partnerInfo.contactNo"
                                        :rules="partnercontact"
                                        @blur="valdationallfields(partnerInfo.contactNo,'Partnercontact')"
                                        @input="valdationallfields(partnerInfo.contactNo,'Partnercontact')"
                                        mask="phone"
                                        label="Contact No.*"
                                    ></v-text-field> -->

                                    <v-text-field
                                        v-model="partnerInfo.contactNo"
                                        :rules="partnercontact"
                                        @input="valdationallfields(partnerInfo.contactNo, 'Partnercontact')"
                                        mask="phone"
                                        label="Contact No."
                                    ></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6 md6>
                                    <v-menu
                                        ref="calender2"
                                        :close-on-content-click="false"
                                        v-model="calender2"
                                        :nudge-right="40"
                                        lazy transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <v-text-field
                                            slot="activator"
                                            v-model="partnerInfo.DOB"
                                            label="Date of Birth*"
                                            persistent-hint prepend-icon="event"
                                            @blur="P_age = parseDate(partnerInfo.DOB)"
                                        ></v-text-field>
                                       <v-date-picker min="1950-01-01" v-model="P_age" no-title @input="validAge"></v-date-picker>
                                    </v-menu>
                                    <!-- dobtext -->
                                    <p style="color:red;font-size:13px;opacity:0.8;position: absolute; margin-top: -12px !important;">{{agetext}}</p>
                                 </v-flex>
                                 <v-flex xs12 sm6 md6>
                                    <v-menu
                                        ref="calender"
                                        :close-on-content-click="false"
                                        v-model="calender"
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
                                            v-model="partnerInfo.DOJ"
                                            label="Joining Date"
                                            persistent-hint prepend-icon="event"
                                            @blur="date = parseDate(partnerInfo.DOJ)"
                                        ></v-text-field>
                                       <v-date-picker min="1969-01-01" v-model="date" no-title @input="joinin"></v-date-picker>
                                    </v-menu>
                                    <p style="color:red;font-size:13px;opacity:0.8;position: absolute; margin-top: -12px !important;">{{dobtext}}</p>
                                 </v-flex>
                                 <v-flex xs12 sm6 md6>
                                    <!-- <v-text-field v-model="partnerInfo.EmailId" :rules="partneremail" @blur="valdationallfields(partnerInfo.EmailId,'Partneremail')"  @input="valdationallfields(partnerInfo.EmailId,'Partneremail')" label="Email*" ></v-text-field> -->
                                    <v-text-field
                                        v-model="partnerInfo.EmailId"
                                        :rules="partneremail"
                                        @input="valdationallfields(partnerInfo.EmailId,'Partneremail')"
                                        label="Email"
                                    ></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm12 md12>
                                    <!-- <v-text-field
                                        maxlength="100"
                                        counter="100"
                                        v-model="partnerInfo.address"
                                        @blur="valdationallfields(partnerInfo.address,'address')"
                                        @input="valdationallfields(partnerInfo.address,'address')"
                                        :rules="address"
                                        label="Address"
                                    ></v-text-field> -->
                                    <v-text-field
                                        maxlength="100"
                                        counter="100"
                                        v-model="partnerInfo.address"
                                        @input="valdationallfields(partnerInfo.address,'address')"
                                        :rules="address"
                                        label="Address"
                                    ></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm12 md12>
                                    <span>Gender</span>
                                    <v-radio-group  v-model="partnerInfo.gender" row>
                                       <v-radio label="Male" color="#00ACC1" value="male"></v-radio>
                                       <v-radio label="Female" color="#00ACC1" value="female"></v-radio>
                                       <v-radio label="Other" color="#00ACC1" value="other"></v-radio>
                                    </v-radio-group>
                                 </v-flex>
                                 <v-flex xs12 sm6 md6>
                                    <v-text-field type="Number" v-model="partnerInfo.latitude" label="Latitude"></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6 md6>
                                    <v-text-field type="Number" v-model="partnerInfo.longitude" label="Longitude"></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6 md6>
                                    <v-text-field
                                       v-model="partnerInfo.bankName" :rules="bankname"  @input="valdationallfields(partnerInfo.bankName,'bankname')" label="Bank Name"></v-text-field>
                                 </v-flex>
                                 <v-flex xs12 sm6 md6>
                                    <v-text-field
                                    v-model="partnerInfo.csmId"
                                    label="Employee Id*" :rules="cmsid" @blur="valdationallfields(partnerInfo.csmId,'cmsid')"  @input="valdationallfields(partnerInfo.csmId,'cmsid')" ></v-text-field>
                                 </v-flex>
                              </v-layout>
                           </v-container>
                        </v-card-text>
                        <v-card-actions>
                           <v-spacer></v-spacer>
                           <v-btn depressed large color="grey lighten-3" @click="dialog=false">
                              Cancel
                              <v-icon right dark>highlight_off</v-icon>
                           </v-btn>
                           <v-btn depressed large color="secondary" @click="postputpartner">
                              {{btnname}}
                              <v-icon dark right>check_circle</v-icon>
                           </v-btn>
                        </v-card-actions>
                     </v-card>
                  </v-dialog>
               </v-flex>
            </v-layout>



                 <v-layout justify-space-around row wrap mt-3>
                    <v-flex md4>
                        <v-card hover flat ripple height=100 color="light-blue lighten-3" class="card-1">

                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/action/supervisor_account_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{allpartners}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">All Partners</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex md4>
                        <v-card hover flat ripple height=100 color="teal lighten-3" class="card-1 ml-2 mr-2">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/notification/sync_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{allocatedpartners}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Allocated</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex md4>
                        <v-card hover flat ripple height=100 color="red lighten-3" class="card-1">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/notification/sync_disabled_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{unallocatedpartners}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Unallocated</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>

        <h2 class="text-xs-center ma-2">Producers/Partners (TAGIC Agency)</h2>
        <hr>

        <v-card flat style="background-color:#fff; width:100%;">
            <v-layout wrap justify-space-between align-center class="pt-4 ml-3 mr-3 " color="#FAFAFA">
                <v-btn  style="border-radius: 55px" medium slot="activator" color="secondary" class="white--text thebtn" @click.native="openDialog()">
                  Add Partner
                  <v-icon dark right>add_circle</v-icon>
               </v-btn>

                <v-menu transition="slide-y-transition">
                  <v-btn depressed medium slot="activator" color="secondary" @click="openwindow" class="white--text thebtn">
                     Bulk Upload
                     <v-icon dark right>publish</v-icon>
                  </v-btn>
               </v-menu>

               <v-flex></v-flex>


                <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                  <v-select v-model="channeldatafilter" :items="channeldataall" item-text="text" item-value="value" label="Channel" @change="channelfilters"></v-select>
               </v-flex>
               <v-flex xs10 sm6 md3 class="ml-2">
                   <!-- @input="Searchdatatable"-->
                  <v-text-field @input="clearempty" @keyup.enter="fetchExistingPartners(channeldatafilter , 0, {ident: true, search: value})" v-model="value" label="Search by Partner Name and ID" append-icon="search" height="30px"></v-text-field>
               </v-flex>
            </v-layout>
        </v-card>

            <v-flex justify-center md12 ml-3 mt-3 mr-5 mb-4>

               <v-data-table v-model="selected" :headers="headers" :items="dummydata" hide-actions select-all item-key="_id" class="elevation-1">
                  <template slot="items" slot-scope="props">
                     <td>
                        <v-checkbox v-model="props.item.selected" @change="custTableCheck(props.item.client_id, $event, props.index)" primary hide-details></v-checkbox>
                     </td>
                     <td class="">{{props.item.partnerName}}</td>
                     <td class="">  {{props.item.channel_code.channelName}} </td>
                     <td class="">{{props.item.partnerId}}</td>
                        <td class="" style="text-transform:capitalize" >{{props.item.csmId.first_name+" "+props.item.csmId.last_name}}</td>
                           <td class="">{{props.item.csmId.employeeCode}}</td>
                     <td class="">{{props.item.emailAddress}}</td>
                     <td class="">{{props.item.contactNo}}</td>
                     <td class="">{{props.item.addresss}}</td>
                     <td class="">{{props.item.joiningDate}}</td>
                     <!-- <td class="" :style="{color: props.item.status == false ? 'red' :'green' }">{{props.item.status == false ? 'Not Met' : 'Met'}}</td> -->
                     <td class="">
                        <v-icon small class="mr-2" @click="Editcustomer(props.item, props.index)">edit</v-icon>
                     </td>
                  </template>
               </v-data-table>
            </v-flex>
         </v-flex>
      </v-layout>

      <div class="text-xs-center pagination pb-3">
         <v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
      </div>

      <v-dialog v-model="dialogBulkUpld" persistent max-width="700px">
         <v-card>
            <v-flex style="background-color:#3a3a3a">
               <v-card-title class="subheading" style="color:white;justify-content:space-between;">
                  Upload File
                  <v-icon dark @click="dialogBulkUpld = false">clear</v-icon>
               </v-card-title>
            </v-flex>
            <v-card-text>
               <v-container grid-list-md>
                  <v-stepper v-model="steps">
                     <v-stepper-header>
                        <v-stepper-step step="1">Upload Data</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="steps > 1" step="2">Status</v-stepper-step>
                     </v-stepper-header>
                     <v-stepper-items>
                        <v-stepper-content step="1">
                           <v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
                           <v-layout>
                              <v-flex class="fileContainer-bulk  mt-6">
                                 <v-text class="upload-text">UPLOAD FILE</v-text>
                                 <v-icon right dark>publish</v-icon>
                                 <input type="file" id="fileUpload" @change="jsonupload">
                              </v-flex>
                              <v-layout ml-3 column>
                                 <v-text v-if="excelfilename !== '' " class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">{{excelfilename}}</v-text>
                                 <v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Supports xls/csv format.</v-text>
                                 <v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Approx time to upload 2 mb file - 30 min.</v-text>
                              </v-layout>
                           </v-layout>
                           <v-layout ml-3 mt-3>
                              <div v-if="fileLink !== ''">
                                 <v-layout row>
                                    <div class="font-weight-medium body-2 ">Selected File:</div>
                                    <div class="body-1 font-weight-regular font-italic">{{fileLink}}</div>
                                 </v-layout>
                              </div>
                           </v-layout>
                           <v-layout mt-3 justify-space-between>
                              <a href="https://image-upload-bucket-2019.s3.ap-south-1.amazonaws.com/bcc3ea6a0ce2c9bef0aba5db1a2f133e7141086d.xlsx" download>
                                 <v-btn color="primary">
                                    sample file
                                    <v-icon right dark>save_alt</v-icon>
                                 </v-btn>
                              </a>
                              <v-btn color="primary" @click="goNext()">
                                 Next
                                 <v-icon class="ml-2" size="20px">arrow_forward</v-icon>
                              </v-btn>
                           </v-layout>
                        </v-stepper-content>
                        <v-stepper-content step="2">
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
                              <a :href="errorLink" download>{{errorLink}}</a>
                           </v-flex>
                           <v-card-actions style="justify-content:flex-end;">
                              <v-layout mt-5 justify-space-between>
                                 <v-btn color="primary" @click="steps =1 ">
                                    <v-icon class="mr-2">arrow_back</v-icon>
                                    Previous
                                 </v-btn>
                                 <v-btn color="primary" @click="cancelStepper">
                                    Close
                                    <v-icon class="ml-2" size="20px">clear</v-icon>
                                 </v-btn>
                              </v-layout>
                           </v-card-actions>
                        </v-stepper-content>
                     </v-stepper-items>
                  </v-stepper>
               </v-container>
            </v-card-text>
         </v-card>
      </v-dialog>
      <!-- Manual Allocation Popup  -Salman -->
      <v-dialog v-model="manualAlloc" max-width="750">
         <v-card>
            <v-layout justify-space-between style="background-color:#424242">
               <v-card-title class="title" style="color:white">Manual Allocation</v-card-title>
               <v-flex xs4 class="ma-2">
                  <!-- <v-text-field @input="Searchdatatable" v-model="value" label="Search" append-icon="search" height="30px"></v-text-field>  -->
                  <v-text-field @input="searchAgentCust" v-model="agentSearch" flat dark solo-inverted hide-details prepend-inner-icon="search" label="Search" class=""></v-text-field>
               </v-flex>
            </v-layout>
            <v-flex pa-2>
               <v-flex v-if="showAlertext == false">
                  <v-flex>
                     <v-text class="caption font-weight-medium" style="color:#C62828">#Some of the selected leads do not have common ‘city’ value</v-text>
                  </v-flex>
                  <v-flex>
                     <v-text class="caption font-weight-medium" style="color:#C62828">#Some of the selected leads are already allocated</v-text>
                  </v-flex>
               </v-flex>
               <v-layout>
                  <v-flex xs3>
                     <v-flex>
                        <v-select v-model="channelpop" @change="getPopChannel" :items="channeldata" item-text="text" label="Channel Name"></v-select>
                     </v-flex>
                     <v-flex>
                        <v-select v-model="statepop" @change="cityfind" :items="StateListdata" item-text="text" label="State"></v-select>
                     </v-flex>
                     <v-flex>
                        <v-select v-model="citypop" @change="cityData" :items="Citylist" item-text="asciiname" label="City"></v-select>
                     </v-flex>
                     <v-flex>
                        <v-select v-model="branchpop" :items="branchArray" item-text="text" label="Branch"></v-select>
                     </v-flex>
                     <v-btn round small color="primary" @click="getAllAgents">Show agents</v-btn>
                  </v-flex>
                  <v-flex xs9 ml-3>
                     <v-flex v-if="showAlertext == false" style="display:flex;justify-content:center">
                        <v-flex xs5 ml-3 mt-4>
                           <v-img src="/web/assets/Group2686.png" style="height:120px;width:140px"></v-img>
                           <v-flex xs10 mt-1>
                              <v-text class="caption font-weight-medium" style="color:#90A4AE">Either select a branch or search for agent code</v-text>
                           </v-flex>
                        </v-flex>
                     </v-flex>
                     <v-flex v-if="showAlertext == true">
                        <v-data-table ref="vTable" v-model="popTable" :headers="popHeader" :items="agentObj" hide-actions :pagination.sync="pagination" item-key="_id" class="elevation-1">
                           <template slot="items" slot-scope="props">
                              <td>
                                 <!-- <v-checkbox v-model="props.popTable" @change="agentTable(props.item._id,$event)" primary hide-details></v-checkbox> -->
                                 <v-radio-group v-model="radios" row>
                                    <v-radio :value="props.item._id" @change="agentTable(props.item._id,$event)"></v-radio>
                                 </v-radio-group>
                              </td>
                              <td class="">{{props.item.first_name}}</td>
                              <td class="">{{props.item.last_name}}</td>
                              <td class="">{{props.item._id}}</td>
                              <td class="">{{props.item.reporting_manager.first_name}}</td>
                              <td class=""><span :style="{color: props.item.leadpopStatus == 'Active' ? '#13961c' : '#d61111'}">{{props.item.leadpopStatus}} </span>
                              </td>
                              <td class="">{{props.item.city}}</td>
                           </template>
                        </v-data-table>
                        <v-layout wrap align-center>
                           <v-flex text-sm-center mt-2>
                              <v-flex>
                                 <!-- <v-text class="caption font-weight-medium" style="color:#C62828">Cannot proceed!</v-text> -->
                              </v-flex>
                              <v-flex>
                                 <!-- <v-text class="caption font-weight-medium" style="color:#C62828">The count of selected agents is more than the count of leads</v-text> -->
                              </v-flex>
                           </v-flex>
                           <v-btn round small color="primary" v-if="showAllocateBtn === true" @click="allocateLeads">Allocate</v-btn>
                           <v-btn round small disabled color="primary" v-else>Allocate</v-btn>
                        </v-layout>
                        <div class="text-xs-center pt-2">
                           <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                        </div>
                     </v-flex>
                  </v-flex>
               </v-layout>
            </v-flex>
            <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn round medium color="primary" @click="manualAlloc = false">Close</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
      <!-- Auto Allocation Popup  -Salman -->
      <v-dialog v-model="autoAlloc" max-width="650">
         <v-card>
            <v-flex style="background-color:#424242">
               <v-card-title class="title" style="color:white">Auto Allocation</v-card-title>
            </v-flex>
            <!-- <v-card-text>
               Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
               </v-card-text> -->
            <v-flex text-sm-center mt-4>
               <v-text class="body-1 font-weight-bold" style="color:#0277BD">Allocating...</v-text>
            </v-flex>
            <v-flex text-sm-center mt-2 mb-4>
               <v-text class="body-1 font-weight-bold">25 leads from 6 cities to agents in 6 branches</v-text>
            </v-flex>
            <v-card-actions style="justify-content:space-between">
               <!-- <v-spacer></v-spacer> -->
               <v-btn small round color="primary" @click="autoAlloc = false">Undo Process</v-btn>
               <v-btn small round color="primary" @click="autoAlloc = false">finish</v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </v-card>
</template>
<script>
   import axios from 'axios'
   import loadChannel from '../common/onProjectLoad.js'
   import moment from 'moment';

   import { required, minLength,  maxLength, between,email } from 'vuelidate/lib/validators'

   const martialList = [{text:'Single',value:'single'},{text:'Married',value:'married'},{text:'Divorced',value:'divorced'},{text:'Widowed',value:'widowed'}]
   const salutationList = ["Mr","Mrs"]
   var fileUpload = null;
   let initialPartnerInfoState = {};

   export default{

        validations:{

            // partnerInfo:{
            //        csmId:{
            //            required,
            //        },
            //        partnerName:{
            //            required
            //        },
            //        contactNo:{
            //              required
            //        }

            // },



        },

       filters: {
           formateDate(milisecond) {
               try {
                   return new Date(parseInt(milisecond)).toLocaleDateString()
               } catch (err) {
                   return milisecond;
               }
           }
       },
       created() {

           this.$store.commit('SET_PAGE_TITLE', 'Existing partner');
           loadChannel.getChannel(this, res => {
               console.log("mixin channel data", res)
               for (let i = 0; i < res.length; i++) {
                   if (res[i].active === 1) {
                       let channetobj = {
                           text: res[i].channelName,
                           value: res[i]._id
                       }
                       this.channeldata.push(channetobj)
                       this.channeldataall.push(channetobj)
                   }
               }
               let alldata = {
                   text: 'All',
                   value: 'all',
               }
               this.channeldataall.unshift(alldata)
           })

           // this.channeldatafilter = 'all'
           // this.GetAllLeadData(this.channeldatafilter);
           this.channelfilters('all')
        //    Have Commented this line because of it will hit api twice
        //    this.fetchExistingPartners();
        // this.getoccupation();
        //  console.log("wkrjwlekrjwl =>", this.$refs.vTable);

       },
       mounted() {
           initialPartnerInfoState = JSON.parse(JSON.stringify(this.partnerInfo));
           let _date_ = new Date();
           this.partnerInfo.partnerId = 'P'+_date_.getSeconds()+''+this.generateRandomCode().toUpperCase();
           this.GetAgentstate();
           // this.getAgentCity();
           this.headers.map(e =>{
                   e.sortable = false;
           })
       },
       data() {
           return {

               allpartners:0,
               allocatedpartners:0,
               unallocatedpartners:0,

               only_once:false,

               check_search:false,

               main_edit_id:'',
               stopdoj:false,
               channeledit: false,
               oneditonly: false,
               editedItem: {
                   AffiliateName: '',
                   firstn: '',
                   lastn: '',
               },
               profileimage:'',
               moment,
               // StateList,
               custID: [],
               agentSearch: '',
               agntStateList: [],
               tableindex:0,
               agentCityList: [],
               branchArray: [],
               allAgents: [],
               custIDLen: '0',
               channelPopID: '',
               headCheck: '',
               radios: 1,
               channelpop: '',
               statepop: '',
               citypop: '',
               branchpop: '',
               popTable: '',
               filterByData: '',
               agentpopStatus: '',
               valueData: [],
               showManual: false,
               showAllocateBtn: false,
               Citylist: [],
               cityDataDrp: [],
               showCityDrop: false,
               StateListdata: [],
               martialList,
               dialog: false,
               value: '',
               agetext: '',
               TableName: '',
               btnname: 'Add',
               pageLength: 0,
               page: 1,
               skip: 0,
               calender: false,

               date: null,
               P_age:null,
               dobtext:'',
               calender1: false,
               date1: null,
               calender2: false,
               date2: null,
               CustomerId: '',
               allCheckSelect: '',
               OccupationList: [],
               salutationList,
               getState: {},
               partnerInfo:{

                   channelName: '',
                   partnerId: '',
                   partnerName: '',
                   contactNo: '',
                   DOJ: '',
                   DOB:'',
                   EmailId: '',
                   address: '',
                   gender: '',
                   latitude: '',
                   longitude: '',
                   bankName: '',
                   csmId: '',
                   avatar:''

               },
               skipdiffrence: this.paginationdiff(),
               channeldatafilter: 'all',
               channeldataall: [],
               channeldata: [],
               selected: [],
               manualAlloc: false,
               autoAlloc: false,
               showAlertext: false,
               pagination: {},
               bulkData: [],
               sucessCount: 0,
               failCount: 0,
               errorLink: 'Link Comes Here',
               fileLink: '',
               excelfilename: '',
               dialogBulkUpld: false,
               customerdataList: [],
               filterby: '',
               filterStruct: '',
               valueDrp: '',
               cityDrp: '',
               custListData: [],
               custdbStruct: {
                   client_id: '',
                   customer_first_name: '',
                   customer_last_name: '',
                   primary_telephone: '',
                   email_id: '',
                   state_code: '',
                   city_code: '',
                   Agent_primary_email: '',
                   fullobj: []
               },
               allocatedlist: [
               {
                   text: 'Allocated',
                   value: 'allocated'
               },
               {
                   text: 'Un Allocated',
                   value: 'unallocated'
               }],
               filterList: [
                   // {text: 'Status', value: 'status'},
                   // {text: 'Source', value: 'source'},
                   // {text: 'Campaign', value: 'campaign'},
                   // {text: 'Affiliate', value: 'affiliate'},
                   {
                       text: 'State',
                       value: 'state'
                   },
                   // {text: 'City', value: 'city'},
                   {
                       text: 'Is Allocated',
                       value: 'isallocated'
                   },
               ],
               headers: [
                   {
                       text: 'Partner Name',
                       value: 'name'
                   },
                    {
                       text: 'Channel',
                       value: 'ch'
                   },
                   {
                       text: 'Partner ID',
                       value: 'partner'
                   },
                   {
                       text: 'Employee Name',
                       value: 'empname'
                   },
                   {
                       text: 'Employee ID',
                       value: 'empcode'
                   },
                   {
                       text: 'E-mail ID',
                       value: 'emailid'
                   },
                   {
                       text: 'Mobile number',
                       value: 'mobilenumber'
                   },
                   {
                       text: 'Address location',
                       value: 'Addresslocation'
                   },
                   {
                       text: 'Joining date',
                       value: 'joiningdate'
                   },
                   // {
                   //     text: 'Status',
                   //     value: 'status'
                   // },
                   // {text: 'Allocated to', value: 'allocated'},
                   {
                       text: 'Action',
                       value: 'action',
                       sortable: false
                   }
               ],
               dummydata: [],
               popHeader: [
               {
                   text: '',
                   value: 'blank'
               },
               {
                   text: 'First Name',
                   value: 'Fname'
               },
               {
                   text: 'Last Name',
                   value: 'Lname'
               },
               {
                   text: 'Agent ID',
                   value: 'agentId'
               },
               {
                   text: 'Reporting Manager',
                   value: 'reportingManager'
               },
               {
                   text: 'User Status',
                   value: 'userStats'
               },
               {
                   text: 'Open Leads',
                   value: 'openLeads'
               }, ],
               leadData: [],
               errormsg: '',
               channelname:[],
               partnername:[],
               partnercontact:[],
               partneremail:[],
               address:[],
               bankname:[],
               cmsid:[],
           }
       },
       computed: {



    //    cn(){
    //      const errors = []
    //      if (!this.$v.partnerInfo.contactNo.$dirty) return errors
    //        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
    //      !this.$v.partnerInfo.contactNo.required && errors.push('Contact Number is required.')
    //      return errors
    //    },

    //    pn(){
    //      const errors = []
    //      if (!this.$v.partnerInfo.partnerName.$dirty) return errors
    //        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
    //      !this.$v.partnerInfo.partnerName.required && errors.push('Partner Name is required.')
    //      return errors
    //    },

    //    csmid() {
    //      const errors = []
    //      if (!this.$v.partnerInfo.csmId.$dirty) return errors
    //        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
    //      !this.$v.partnerInfo.csmId.required && errors.push('CSM ID is required.')
    //      return errors
    //    },

           objmethod() {
               var self = this;
               // dummydata

            return self.dummydata.filter(function(cust){return cust.partnerName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.emailAddress.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.addresss.toLowerCase().indexOf(self.value.toLowerCase()) >=0
             || cust.contactNo.toLowerCase().indexOf(self.value.toString().toLowerCase()) >=0
            })

               // if (Array.isArray(this.custListData)) {
               //     return this.custListData.filter(function(cust) {
               //         return cust.client_id.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
               //             cust.primary_telephone.toString().toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
               //             cust.customer_first_name.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
               //             cust.customer_last_name.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
               //             cust.email_id.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
               //             cust.state_code.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
               //             cust.city_code.toLowerCase().indexOf(self.value.toLowerCase()) >= 0 ||
               //             cust.Agent_primary_email.toLowerCase().indexOf(self.value.toLowerCase()) >= 0
               //     });
               // }
               // return {};
           },
           pages() {
               if (this.pagination.rowsPerPage == null ||
                   this.pagination.totalItems == null
               ) return 0
               return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
           },
           agentObj() {
               // var self = this;
               // if (Array.isArray(this.allAgents)) {
               //     return this.allAgents.filter(function(agent) {
               //         //    console.log('Filter Lead', agent)
               //         return agent.first_name.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
               //             agent.last_name.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
               //             agent._id.toString().toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
               //             agent.reporting_manager.first_name.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
               //             agent.leadpopStatus.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0 ||
               //             agent.city.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >= 0
               //     });
               // }
           }
       },
       watch: {



           date(val) {
               this.partnerInfo.DOJ = this.formatDate(this.date)
           },
           P_age(val) {
               this.partnerInfo.DOB = this.formatDate(this.P_age)
           },
           date1(val) {
               this.customerformdata.nominee1dob = this.formatDate(this.date1)
           },
           date2(val) {
               this.customerformdata.nominee2dob = this.formatDate(this.date2)
           }
       },
       methods:{

           clearempty(){

             if(this.value.length === 0 || this.value === null || this.value === undefined || this.value === " " || /^\s+$/g.test(this.value)){
                    if(this.check_search){
                        this.page = 1
					    this.fetchExistingPartners('all', 0, {ident: false, search:''});
                    }


			 }

           },


            call_partner_validation(data, type, field){

                   var self = this
                //    this.validate_alpha_numeric(data, type, (res, datanew)=>{
                //        if(res == true){
                //            self.partnerInfo[field] =  datanew
                //            self.$forceUpdate();
                //            return
                //        }
                //    })
           },

           valdationallfields(value,name){
               console.log("Name",name)
               let nameRegex =/^[A-Za-z0-9 ]+$/;
               let nameonlyRegex =/^[A-Za-z ]+$/;
               let targetRegex =/^[0-9 ]+$/;
               let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

               if(name === 'Channelname'){
                   this.channelname = []
                    value === '' ? this.channelname.push('This is field required') : ''
               }else if(name === 'Partnername'){
                   this.partnername = []
                    value === '' ? this.partnername.push('This is field required') : ''
                    value.match(nameonlyRegex) ? this.partnername.push() : this.partnername.push('Only alphabets are allowed')
               }else if(name === 'Partnercontact'){
                   this.partnercontact = []
                   if (!value) {
                       this.partnercontact = []
                       return;
                   }
                    // value === '' ? this.partnercontact.push('This is field required') : ''
                    value.match(targetRegex) ? this.partnercontact.push() : this.partnercontact.push('Only numbers are allowed')
               }else if(name === 'Partneremail'){
                    this.partneremail = []
                    if (!value) {
                         this.partneremail = []
                         return;
                    }
                    value.match(emailRegex) ? this.partneremail.push() : this.partneremail.push('Email Should be in Proper Format')
               }
            //    else if(name === 'address'){
            //        this.address = []
            //         value === '' ? this.address.push('This is field required') : ''
            //    }
               else if(name === 'bankname'){
                   this.bankname = []
                   if (!value) {
                       this.bankname = []
                       return;
                   }
                    value.match(nameRegex) ? this.bankname.push() : this.bankname.push('Only alphabets and numbers are allowed')
               }else if(name === 'cmsid'){
                    this.cmsid = []
                    value === '' ? this.cmsid.push('This is field required') : ''
                    value.match(nameRegex) ? this.cmsid.push() : this.cmsid.push('Only alphabets and numbers are allowed')
               }

           },

             /**
            * @author Khan Usama
            * @function handleFileUpload
            * @param {*} event
            * @description The function is based on conditions of pages which is indicated by el. it contains page no. like 1,2 and 3 etc.
            * In this page
            */

           handleFileUpload(event) {
                   let self = this;
                   let formData = new FormData();
                   let Fileread = event.target.files[0]
                   formData.append('media_upload', Fileread);


                   const UPLOAD_API = this.API_Service_admin()+'v2/uploadFile';     // server API
               //     axios.post(UPLOAD_API, formData, {
               //     headers: {  'Content-Type': 'multipart/form-data' }
               // })
                   // .then(function(res){
                 this.POST(UPLOAD_API,formData , (res , error) => {
                   if(res.data.errCode === -1){
                       let response = res.data.errMsg
                       self.profileimage = response.location
                       console.log("File Location ",self.profileimage);
                   }
               })
           },

           openDialog() {
               this.$v.$reset();
               this.dialog = true;
               this.partnerInfo = JSON.parse(JSON.stringify(initialPartnerInfoState));
               let _date_ = new Date();
               this.partnerInfo.partnerId = 'P'+_date_.getSeconds()+''+this.generateRandomCode().toUpperCase();
               console.log("Partner Popup", this.partnerInfo);
               this.channelname=[]
               this.partnername=[]
               this.partnercontact=[]
               this.partneremail=[]
               this.address=[]
               this.bankname=[]
               this.cmsid=[]
           },

            postputpartner(){
                this.partnerCURD();
                    // if (this.channelname.length === 0 && this.partnername.length === 0 && this.cmsid.length === 0 && this.stopdoj === false) {

                    // }
            },

            partnerCURD() {

                //    this.$v.$touch();
                // console.log(this.$v)
                //    if(this.$v.$invalid == true) {
                //        console.log("Form has errors")
                //        return
                //    }else
                if (!this.partnerInfo.partnerName) {
                    this.showToast('Partner name is required', this.TOST().WARNING);
                    return;
                }

                if (!this.partnerInfo.csmId) {
                    this.showToast('Employee Id is required', this.TOST().WARNING);
                    return;
                }
                //    if (this.partnerInfo.csmId == "" || this.partnerInfo.EmailId == "" || this.partnerInfo.contactNo == "" || this.partnerInfo.partnerName == "" || this.stopdoj == true) {

                //         this.showToast('Please, enter valid data in mandatory fields', this.TOST().ERROR);
                //         return
                //     }

                let formdata = {
                    partnerId: this.partnerInfo.partnerId,
                    partnerName: this.partnerInfo.partnerName,
                    emailAddress: this.partnerInfo.EmailId,
                    status: false,
                    gender: this.partnerInfo.gender,
                    contactNo: this.partnerInfo.contactNo,
                    addresss: this.partnerInfo.address,
                    bankName: this.partnerInfo.bankName,
                    latitude: this.partnerInfo.latitude,
                    longitude: this.partnerInfo.longitude,
                    joiningDate: this.partnerInfo.DOJ,
                    channel_code: this.partnerInfo.channelName,
                    csmId: this.partnerInfo.csmId,
                    avatar: this.profileimage,
                    adminId: this.getAgentInfo()._id,
                    dateOfBirth: this.partnerInfo.DOB,
                };

                if (this.btnname == 'Update') {
                    formdata.partnerId = this.main_edit_id
                }


                let self = this;
                let temp = self.dummydata.slice(0, self.dummydata.length);
                self.dummydata = [];

                switch (this.btnname) {
                    case 'Add':
                        console.log("New Partner : hkshf", formdata);

                        this.POST('new_existing_partner', formdata, function(res, error) {
                            if (error) {
                                self.dialog = false;

                                return;
                            }
                            switch (res.data.errCode) {
                                case -1:

                                    let response = res.data.errMsg;
                                    //    temp.push(self.reFormateData(response));
                                    //    self.dummydata = temp.slice(0, temp.length).reverse();
                                    self.fetchExistingPartners(self.channeldatafilter, 0, {
                                        ident: false,
                                        search: ""
                                    })
                                    self.dialog = false;
                                    break;
                                case 4:
                                    self.showToast(res.data.errMsg, self.TOST().ERROR)
                                    self.dialog = false;

                                    break;

                                case 42:
                                    self.dialog = true;
                                    self.showToast('Employee Id is not exist', self.TOST().ERROR)

                                    break;

                                case 1:
                                    self.dialog = true;

                                    self.showToast(res.data.errMsg, self.TOST().INFO)

                                    break;

                                case 2500:
                                    self.dialog = true;

                                    self.showToast(res.data.errMsg, self.TOST().WARNING)
                                    break;

                                case 2601:
                                    self.dialog = true;

                                    self.showToast(res.data.errMsg, self.TOST().INFO)
                                    break;
                            }
                        });
                        break;
                    case 'Update':

                        this.PUTUSER('update_partner_details', formdata, function(res, error) {
                            if (error) {
                                self.dialog = false;
                                return;
                            }

                            switch (res.data.errCode) {
                                case -1:

                                    let response = res.data.errMsg;
                                    temp.push(self.reFormateData(response));
                                    temp.splice(self.tableindex, 1)
                                    console.log("TEmpDATA::", temp);
                                    self.dummydata = temp.slice(0, temp.length).reverse();
                                    self.dialog = false;
                                    self.btnname = 'Add'
                                    //    console.log('Edited Data>>>>',self.dummydata);

                                    //    self.fetchExistingPartners(self.channeldatafilter,0 ,{ident: false, search:""} )
                                    break;
                                case 4:
                                    self.dialog = false;

                                    break;

                                case 42:
                                    self.dialog = true;
                                    self.showToast('CMS does not exists', self.TOST().ERROR)

                                    break;

                                case 1:
                                    self.dialog = true;

                                    self.showToast(res.data.errMsg, self.TOST().INFO)

                                    break;

                                case 2500:
                                    self.dialog = true;

                                    self.showToast(res.data.errMsg, self.TOST().WARNING)
                                    break;

                                case 2601:
                                    self.dialog = true;

                                    self.showToast(res.data.errMsg, self.TOST().INFO)
                                    break;
                            }

                        })

                        //update api needed
                        break;
                    default:
                        break;

                }
            },

           fetchExistingPartners(channel = undefined,skip, search) {
               console.log('ADMIN _id ',this.getAgentInfo()._id);
               console.log("Check channel",channel);

               let API

              if(search.ident){

                    if(this.value.length > 0){
                        this.only_once = true

                        API ='fetch_existing_partners?access_by=admin&adminId='+this.getAgentInfo()._id+'&skip='+skip+'&search='+this.value
                        this.check_search = true

                    }else if(this.only_once){
                             API ='fetch_existing_partners?access_by=admin&adminId='+this.getAgentInfo()._id+'&skip='+0
                             this.check_search = false
                             this.only_once = false
                             this.page = 1
                    }else{
                        console.log('do nothing')
                        return
                    }


              }else if(channel == 'all' || channel == undefined){

                    API ='fetch_existing_partners?access_by=admin&adminId='+this.getAgentInfo()._id+'&skip='+skip
                     this.check_search = false
              }else{
                    API ='fetch_existing_partners?access_by=admin&adminId='+this.getAgentInfo()._id+'&skip='+skip+'&channel='+channel
                    this.check_search = false
              }

                console.log("Final API BuiLd is ->", API)


               let self = this;
               // axios.get(API).then(res => {
               this.GETUSER(API , function(res,error){
                   // console.log("Partner Response", res);
                   if(error){
                       console.log("ERROR CHECK",error)
                       return;
                   }
                   let caseId = res.data.errCode;
                   switch(caseId) {
                       case -1:
                           self.dummydata = [];
                           let data = res.data.errMsg[0];

                           var pageLen = res.data.errMsg[1]
                           let totalCount = pageLen[0].count
                           console.log('Page Length:', totalCount)
                           self.pageLength = Math.ceil(totalCount / self.skipdiffrence)

                           let collection = [];

                           for (let element of data) {
                               collection.push(self.reFormateData(element));
                           }

                           // console.log("Collection",collection);
                           self.dummydata = collection.slice(0, collection.length);
                           console.log("GET EXISIting Data:::",self.dummydata);
                           break;
                       case 4:
                        self.dummydata = [];
                           self.showToast('Database Error', self.TOST().ERROR)
                            self.pageLength = 0
                           break;
                       case 567:
                           self.dummydata = [];
                            self.pageLength = 0
                           self.showToast('Partners not found', self.TOST().INFO)
                           break;
                   }
               })
           },

           reFormateData(element) {
               // console.log("Element Check",element);




               return {
                   addresss: Boolean(element.addresss) ? element.addresss : "-",
                   avatar: element.avatar,
                   bankName: Boolean(element.bankName) ? element.bankName : "-",
                   channel_code: element.channel_code,
                   contactNo: element.contactNo,
                   createdBy: element.createdBy,
                   createdDate: element.createdDate,
                   csmId: element.csmId,
                   emailAddress: Boolean(element.emailAddress) ? element.emailAddress : "-",
                   gender: element.gender,
                //    joiningDate: Boolean(element.joiningDate) ? new Date(parseInt(element.joiningDate)).toLocaleDateString() : element.joiningDate ? 'Invalid Date' : '-',
                   joiningDate: element.joiningDate === 'NaN' ? '-' : Boolean(element.joiningDate) ? new Date(parseInt(element.joiningDate)).toLocaleDateString() : '-',

                   latitude: element.latitude,
                   longitude: element.longitude,
                   partnerId: element.partnerId,
                   partnerName: this.doSentenceCase(element.partnerName),
                   status: element.status == true ? 'Active' : 'Inactive',
                   color: element.status === true ? 'rgb(19, 150, 28)' : 'rgb(217, 59, 17)',
                   updatedDate: new Date(parseInt(element.updatedDate)).toLocaleDateString(),
                   dob: element.dateOfBirth,
                   _id: element._id
               }
           },

           resetCustFilters() {
               this.channeldatafilter = 'all';
               this.filterby = '';
               this.valueDrp = '';
               this.cityDrp = '';
               this.filterStruct = '';
               this.GetAllLeadData()
           },
           removeSelection() {
               this.custID = [];
               this.custIDLen = '0';
               // this.selected = []
               this.headCheck = false
               this.custID = [];
               // console.log('custListData',this.custListData)
               for (let i = 0; i < this.custListData.length; i++) {
                   this.custListData[i].selected = false
               }
               this.showManual = false;
           },
           // @Change Event function for Popup Channel Dropdown List @author:Salman Shaikh
           getPopChannel(event) {
               console.log('Channel Event::', event)
               this.channelPopID = event;
               // this.getAllAgents(this.channelPopID)
           },
           // @Change Event function for Popup Table's Radio buttons for Agents @author:Salman Shaikh
           agentTable(_id, event) {
               // console.log('EVENT>>',event)
               console.log('_ID>>', _id)
               this.AgentID = _id;
               this.popTable = ''
               this.showAllocateBtn = true
           },
           GetAgentstate() {
               this.GETSTATE(res => {
                   console.log("State", res)
                   this.getState = res;
                   for (let i = 0; i < this.getState.length; i++) {
                       let statedata = {
                           text: this.getState[i].region_data.name,
                           code: this.getState[i].region_data.adminCode1
                       }
                       this.StateListdata.push(statedata)
                   }
               })
               console.log(this.StateListdata, "response mixin data")
           },
           // getAgentCity(ev){
           //         console.log("event ev>>", ev)
           //         let codes= this.agntStateList.filter(e=>{
           //             if(e.text === ev){
           //                 return e.code
           //             }
           //         })
           //         this.GETCITY(codes[0].code,resp=>{
           //             this.agentCityList = resp[0].cities
           //         })
           // },
           cityData(event) {
               // console.log("City event ", event)
               // console.log("city :>>", this.citypop)
               // console.log("State :>>", this.statepop)
               // axios.get(this.API_Service_admin() + 'getbranch?branchfilter=All&created_by='+this.getAgentInfo()._id+'&skip=0&user_city=' + this.citypop + '&user_state=' + this.statepop)
               //     .then(res => {
                       this.GET('getbranch?branchfilter=All&created_by='+this.getAgentInfo()._id+'&skip=0&user_city=' + this.citypop + '&user_state=' + this.statepop, function(res,error){
                       console.log('Branch details', res.data.errMsg[0])
                       this.branchArray = [];
                       let branchArr = res.data.errMsg[0];
                       for (var i = 0; i < branchArr.length; i++)
                       {
                           let brdata = {
                               text: branchArr[i].branchName,
                               value: branchArr[i]._id,
                           }
                           this.branchArray.push(brdata)
                       }
                       //    console.log("Branch Array ==>>>",this.branchArray)
                   })
           },
           getAllAgents() {
               // console.log("city :>>", this.citypop)
               // console.log("State :>>", this.statepop)
               // console.log("Channel :>>", this.channelPopID)
               this.popTable = '';
               // this.agntObj = [];
               this.showAllocateBtn = false;
               if (this.popState !== '') {
                   this.GET('getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode=' + this.channelPopID + '&skip=0&user_state=' + this.statepop + '&user_city=' + this.citypop + '&user_branch=' + this.branchpop, res => {
                       res.data.errMsg[0].forEach(element => {
                           element.agentpopStatus = '';
                       });
                       console.log('All AGENT Resp', res.data.errMsg[0])
                       this.allAgents = res.data.errMsg[0]
                       this.showAlertext = true
                       for (var i = 0; i < this.allAgents.length; i++) {
                           if (this.allAgents[i].active === 1) {
                               this.allAgents[i].agentpopStatus = 'Active'
                           } else if (this.allAgents[i].active === 0) {
                               this.allAgents[i].agentpopStatus = 'InActive'
                           }
                       }
                   })
               }
           },
           custTableCheck(user_ID, bool, ind) {
               // console.log('Cust USER ID:> ', user_ID)
               // console.log('Cust Bool :> ', bool)
               // console.log('cust INDEX:>  ', ind);
               this.custListData[ind].selected = bool;
               if (bool) {
                   this.custIDLen++;
               } else {
                   this.custIDLen--;
               }
               for (let i = 0; i < this.customerdataList.length; i++) {
                   if (user_ID === this.customerdataList[i].client_id) {
                       if (bool) {
                           this.custID.push({
                               _id: this.customerdataList[i]._id
                           }); // push the Id in array if checked
                           this.showManual = true;
                           this.headCheck = true
                           console.log('Cust ID True', this.custID)
                       } else {
                           const index = this.custID.findIndex(list => list.client_id == user_ID); //Find the index of stored id
                           this.custID.splice(index, 1); // Then remove
                           console.log('Cust ID False', this.custID)
                           if (this.custID.length === 0) {
                               this.showManual = false
                               this.headCheck = false
                           }
                       }
                   }
               }
               // this.custIDLen = this.custID.length
               // console.log('Cust ID LEn',this.custIDLen)
           },
           allocateLeads() {
               var allocID = this.custID
               console.log('Ag ID>>', this.AgentID)
               console.log('agent SelctId:>', allocID)
               // console.log('agentId:>',this.AgentID )
               if (allocID.length !== 0) {
                   const manualLeadId = {
                       userId: this.getAgentInfo()._id,
                       Allocated_user_id: this.AgentID,
                       customer_ids: allocID,
                   }
                   // axios.post(this.API_Service_admin() + 'manualAllocation_customer', manualLeadId).then(
                   //     res => {
                       this.POST('manualAllocation_customer',manualLeadId , (res , error) => {

                           var affiliateData = res.data.errMsg
                           console.log('manual Alloc:>>', res.data.errMsg)
                       }
                   ).catch(err => {
                       console.log(err);
                   });
               }
               this.showToast('Leads Allocated Successfully', 'success')
           },
           filterBY(e) {
               console.log('Filters>>', e)
               if (e === 'state') {
                   this.filterByData = e;
                   this.valueData = [];
                   for (let i = 0; i < this.getState.length; i++) {
                       let value = {
                           text: this.getState[i].region_data.name,
                           code: this.getState[i].region_data.adminCode1
                       }
                       this.valueData.push(value);
                       // console.log('VAlue Data State',this.valueData)
                   }
               } else if (e === 'isallocated') {
                   this.filterByData = e;
                   this.valueData = [];
                   this.showCityDrop = false
                   console.log("allocatged list", this.allocatedlist)
                   for (let i = 0; i < this.allocatedlist.length; i++) {
                       let value = {
                           text: this.allocatedlist[i].text,
                           value: this.allocatedlist[i].value
                       }
                       this.valueData.push(value);
                       // console.log('VAlue Data Allocate',this.valueData)
                   }
               }
           },
           valueDropdown(event) {
               console.log('VAlue Event:>', event)
               console.log("filterByData ", this.filterByData)
               this.filterStruct = '';
               if (this.filterByData !== 'state') {
                   this.filterStruct = this.filterby + '|' + this.valueDrp;
                   console.log("Filter Struct ", this.filterStruct)
                   this.GetAllLeadData(this.channeldatafilter);
               } else {
                   this.filterStruct = '';
                   this.filterStruct = this.filterby + '|' + this.valueDrp
                   console.log("Filter Struct ", this.filterStruct)
                   this.GetAllLeadData(this.channeldatafilter)
                   let codes = this.valueData.filter(e => {
                       if (e.text === event) {
                           return e.code
                       }
                   })
                   // console.log(" before if Event",event)
                   this.cityDataDrp
                   event === codes[0].text ? this.showCityDrop = true : '';
                   this.GETCITY(codes[0].code, resp => {
                       // console.log("city ", resp[0].cities)
                       this.cityDataDrp = resp[0].cities
                   })
               }
           },
           cityDropdown(e) {
               console.log('CITY DROP Event:>', e)
               this.filterStruct = '';
               this.filterStruct = this.filterby + '|' + this.valueDrp + '|' + this.cityDrp
               console.log("Filter Struct ", this.filterStruct)
               this.GetAllLeadData(this.channeldatafilter)
           },

           validAge(date) {

               this.calender2 = false
               let datevalue = moment(date).valueOf()
               console.log('Date', datevalue)
               let currentdate = Date.now()
               let datesub = moment(currentdate).subtract(18, 'years').format('MM-DD-YYYY');
               console.log('Subtract year', datesub)
               let convertsub = moment(datesub).valueOf()

               if (datevalue >= convertsub) {
                   // console.log('Your Age is Not 18')

                   this.agetext = 'Your age is less than 18 years'
                   this.stopdoj =  true
               } else {
                   this.stopdoj =  false
                   this.dobtext = ''
                   this.agetext = ''
               }
           },

            joinin(date) {
                this.dobtext = ''
                if (this.stopdoj) {
                    this.dobtext = ''
                    return;
                } else {
                    this.calender = false
                    let datevalue = moment(date).valueOf()
                    let dobis = this.partnerInfo.DOB
                    let currentdate = moment(Date.now()).valueOf()
                    // console.log("date.now ->", Date.now());
                    var compared = moment(datevalue).valueOf()
                    console.log('current date ->', moment(datevalue).valueOf(), "  selected -> ", compared);
                    if (compared > currentdate) {
                        this.dobtext = 'Your Date of Joining cannot be in the future'
                        this.showToast('Your Date of Joining cannot be in the future', this.TOST().WARNING);
                        return;
                    }


                    if (moment(datevalue).valueOf() >= moment(dobis).valueOf() && moment(datevalue).valueOf() != moment(dobis).valueOf()) {
                        console.log('DOB J is greater');
                        //  let datesub = moment(datevalue).subtract(18, 'years').format('MM-DD-YYYY');
                        // if(moment(dobis).valueOf() >= moment(datesub).valueOf()){
                        //      this.dobtext = 'Your not 18 years yet to join'
                        // }else{
                        this.dobtext = ''
                        // }

                        // this.dobtext = ''
                    } else {
                        // console.log('DOJ is smaller than DOB');
                        this.dobtext = 'Your Date of Joining is invalid, should be greater than your age'
                        this.showToast('Your Date of Joining is invalid, should be greater than DOB', this.TOST().WARNING);
                        return;
                    }

                }


                // let datevalue = moment(date).valueOf()
                // console.log('Date', datevalue)
                // let currentdate = Date.now()
                // let datesub = moment(currentdate).subtract(18, 'years').format('MM-DD-YYYY');
                // console.log('Subtract year', datesub)
                // let convertsub = moment(datesub).valueOf()
                // if (datevalue >= convertsub) {
                //     // console.log('Your Age is Not 18')
                //     this.dobtext = 'You cannot join'
                // } else {
                //     this.dobtext = ''
                // }
            },
            validDOB(date) {

                this.calender2 = false
                let datevalue = moment(date).valueOf()
                console.log('Date', datevalue)
                let currentdate = Date.now()
                let datesub = moment(currentdate).subtract(18, 'years').format('MM-DD-YYYY');
                console.log('Subtract year', datesub)
                let convertsub = moment(datesub).valueOf()
                if (datevalue >= convertsub) {
                    console.log('Your Age is Not 18')
                    this.dobtext = "You're less than 18 years"
                } else {
                    this.dobtext = ""
                }

            },
           getoccupation() {
               this.GET('fetch_occupation?filter=0', resp => {
                   if (resp.data.errCode === -1) {
                       let data = resp.data.errMsg[0];
                       for (let i = 0; i < data.length; i++) {
                           if (data[i].status === 1) {
                               let Ocuupationdetails = {
                                   text: data[i].occupation,
                                   value: data[i]._id,
                               }
                               this.OccupationList.push(Ocuupationdetails)
                           }
                       }
                       console.log("Occupation Data List", this.OccupationList)
                   }
               })
           },


           /**
            * @author Khan Usama
            */
           createPartner() {

               console.log("FORMDATA", formdata)
               this.POSTUSER('addCustomer', formdata, res => {
                   if (res.data.errCode == -1) {
                       this.showToast('Customer Added Successfully', this.TOST().SUCCESS)
                       this.GetAllLeadData('all');
                       this.dialog = false;
                   } else {
                       this.showToast('Something went Wrong', this.TOST().ERROR)
                   }
               })
           },
           Editcustomer(item, index){


            console.log("The data to be eidted is =>", item,index)
            this.tableindex = index
            this.channeledit = true
            this.oneditonly = true;
            // console.log(item, 'edited items')
            this.dialog = true;
            this.btnname = 'Update';
            this.main_edit_id = item._id
            this.partnerInfo.partnerId = item.partnerId
            this.partnerInfo.partnerName = item.partnerName
            this.partnerInfo.EmailId = item.emailAddress
            this.partnerInfo.status= item.status
            this.partnerInfo.gender = item.gender
            this.partnerInfo.contactNo = item.contactNo
            this.partnerInfo.address = item.addresss
            this.partnerInfo.bankName = item.bankName
            this.partnerInfo.latitude = item.latitude
            this.partnerInfo.longitude = item.longitude
            this.partnerInfo.DOJ = item.joiningDate === '-'? '' : item.joiningDate
            this.partnerInfo.channelName = item.channel_code._id
            this.partnerInfo.csmId = item.csmId.employeeCode
            this.profileimage = item.avatar == null || item.avatar == "" ? "-" : item.avatar
            this.partnerInfo.DOB = moment(item.dob).format("MM/DD/YYYY")

               return;

                   this.customerformdata.clientId = item.fullobj.client_id,
                   this.customerformdata.salutation = item.fullobj.salutation,
                   this.customerformdata.firstname = item.fullobj.customer_first_name,
                   this.customerformdata.middlename = item.fullobj.customer_middle_name,
                   this.customerformdata.lastname = item.fullobj.customer_last_name,
                   this.customerformdata.gender = item.fullobj.gender,
                   this.customerformdata.Dob = item.fullobj.date_of_birth,
                   this.customerformdata.nationality = item.fullobj.nationality,
                   this.customerformdata.primarymobileno = item.fullobj.primary_telephone,
                   this.customerformdata.secondarymobileno = item.fullobj.secondary_telephone,
                   this.customerformdata.EmailId = item.fullobj.email_id,
                   this.customerformdata.Address1 = item.fullobj.address_1,
                   this.customerformdata.Address2 = item.fullobj.address_2,
                   this.customerformdata.state = item.fullobj.state_code,
                   this.customerformdata.city = item.fullobj.city_code,
                   this.customerformdata.pincode = item.fullobj.pincode,
                   this.customerformdata.income = item.fullobj.income,
                   this.customerformdata.noofchildren = item.fullobj.no_of_children
                   this.customerformdata.professiontype = item.fullobj.profession_type,
                   this.customerformdata.occuepationcode = item.fullobj.occupation_code,
                   this.customerformdata.nomineename1 = item.fullobj.nominee1_name,
                   this.customerformdata.nominee1dob = item.fullobj.nominee1_dob,
                   this.customerformdata.nomineename2 = item.fullobj.nominee2_name,
                   this.customerformdata.nominee2dob = item.fullobj.nominee2_dob,
                   this.customerformdata.martialstatus = item.fullobj.marital_status,
                   this.customerformdata.recompdt1 = item.fullobj.recom_pdt_1_code,
                   this.customerformdata.recompdt2 = item.fullobj.recom_pdt_2_code,
                   this.customerformdata.Allocatetoagent = item.fullobj.allocatedToAgent.agent_id,
                   this.customerformdata.channelName = item.fullobj.customerChannel._id,
                   this.customerformdata.applicationcode = item.fullobj.application_code,
                   this.CustomerId = item.fullobj._id,
                   // this.customerformdata.applicationcode=
                   this.cityfind(item.fullobj.state_code)


               // the existing partner editing info



           },
           UPDATEcustomer() {
               let formdata = {
                   client_id: this.customerformdata.clientId,
                   salutation: this.customerformdata.salutation,
                   customer_first_name: this.customerformdata.firstname,
                   customer_middle_name: this.customerformdata.middlename,
                   customer_last_name: this.customerformdata.lastname,
                   gender: this.customerformdata.gender,
                   date_of_birth: this.customerformdata.Dob,
                   nationality: this.customerformdata.nationality,
                   primary_telephone: this.customerformdata.primarymobileno,
                   secondary_telephone: this.customerformdata.secondarymobileno,
                   email_id: this.customerformdata.EmailId,
                   address_1: this.customerformdata.Address1,
                   address_2: this.customerformdata.Address2,
                   state_code: this.customerformdata.state,
                   city_code: this.customerformdata.city,
                   pincode: this.customerformdata.pincode,
                   income: this.customerformdata.income,
                   no_of_children: this.customerformdata.noofchildren,
                   profession_type: this.customerformdata.professiontype,
                   occupation_code: this.customerformdata.occuepationcode,
                   nominee1_name: this.customerformdata.nomineename1,
                   nominee1_dob: this.customerformdata.nominee1dob,
                   nominee2_name: this.customerformdata.nomineename2,
                   nominee2_dob: this.customerformdata.nominee2dob,
                   marital_status: this.customerformdata.martialstatus,
                   recom_pdt_1_code: this.customerformdata.recompdt1,
                   recom_pdt_2_code: this.customerformdata.recompdt2,
                   allocatedToAgent: this.customerformdata.Allocatetoagent,
                   customerChannel: this.customerformdata.channelName,
                   proposalId: this.customerformdata.proposalId,
                   admin_Id: this.getAgentInfo()._id,
                   customerId: this.CustomerId,
               }
               console.log("FORMDATA", formdata)
               this.PUTUSER('updateCustomer', formdata, res => {
                   if (res.data.errCode == -1) {
                       this.showToast('Customer Updated Successfully', this.TOST().SUCCESS)
                       this.GetAllLeadData('all');
                       this.dialog = false;
                   } else {
                       this.showToast('Something went Wrong', this.TOST().ERROR)
                   }
               })
           },
           cityfind(ev) {
               console.log("event ", this.StateListdata)
               let codes = this.StateListdata.filter(e => {
                   if (e.text === ev) {
                       return e.code
                   }
               })
               console.log("event filter", codes)
               this.GETCITY(codes[0].code, resp => {
                   console.log("city ", resp[0].cities)
                   this.Citylist = resp[0].cities
               })
           },
           // Vuetify code
           formatDate(date) {
               if (!date) return null
               const [year, month, day] = date.split('-')
               return `${month}/${day}/${year}`
           },
           // Vuetify code
           parseDate(date) {
               if (!date) return null
               const [month, day, year] = date.split('/')
               return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
           },
           gotoLeadForm() {
               // Here, Store is clear before going to next page
               this.commit('SAVE_LEAD_RESPONSE', null);
               this.jump('/Lmaster/status');
           },
           toggleAll(e) {
               // console.log('Toggle Event',e)
               // console.log('V-MODEl ',this.headCheck)
               this.allCheckSelect = e
               this.showManual = true;
               this.selected = []
               this.custIDLen = 0;
               let temp = this.custListData.map(items => {
                   if (e == true) {
                       this.custID = this.objmethod.slice()
                       console.log('SeleCTED', this.custID)
                       this.custIDLen++;
                   } else {
                       this.custID = [];
                       console.log('Un SeleCTED', this.custID)
                       this.showManual = false;
                       this.custIDLen = 0;
                   }
                   items.selected = e;
                   // this.allCheckSelect = items
                   // console.log('ITEMS ',items)
                   return items;
               });
               this.custListData = [];
               this.custListData = temp;
               temp = undefined;
           },
           changeSort(column) {
               if (this.pagination.sortBy === column) {
                   this.pagination.descending = !this.pagination.descending
               } else {
                   this.pagination.sortBy = column
                   this.pagination.descending = false
               }
           },
           deleteItem(item, index) {
               this.usrdetails.splice(index, 1)
           },

           editingdata(incomdata, index){

                   console.log("incoming data for edit is ->", incomdata ,"  index :", index);
                   // id to feed the single user get api
                   let edit_it = incomdata._id


           },

           getLeadData(id, callback = null) {


               return
               // axios.get(this.API_Service() + 'getlead_details/' + id).then(

               //     res => {

                       this.GETUSER('getlead_details/'+ id, function(res,error){
                       /**
                        * @author Khan Usama
                        * Date 9/3/2019
                        * @description Access lead by id
                        */
                       if (typeof(callback) == 'function') {
                           callback(res)
                           return;
                       }
                       //    ---------------------
                       console.log('GET USER REPONSE OF LEAD', res.data.errMsg)
                       // this.leaddatanew = res.data.errMsg
                       this.leadData = res.data.errMsg[0]
                       this.editItem(this.leadData, 0)
                       // for(var i =0 ;i< this.usrdetails.length;i++)
                       // {
                       //     this.TableName = this.usrdetails[i].firstName + this.usrdetails[i].lastName
                       // }
                   }
               ).catch(
                   err => {
                       console.log(err);
                   }
               );
           },
           channelfilters(e) {
               console.log('data', e)
               this.page = 1
               this.channeldatafilter = e
               this.fetchExistingPartners(this.channeldatafilter,0 ,{ident: false, search:""} )
           },
           next(e) {
               let skipdata = e - 1
               console.log('data', skipdata)
               if (skipdata === 0) {
                   this.skip = 0
               } else {
                   this.skip = this.skipdiffrence * skipdata
               }
               console.log('skip data', this.skip)
               this.fetchExistingPartners(this.channeldatafilter, this.skip, {ident: this.check_search, search: this.value} )
           },
           GetAllLeadData(e, skip) {
               console.log("User Id", this.getAgentInfo()._id)
               console.log("Event", e)
               console.log("Skip", skip)
               this.customerdataList = []
               let FILTER_API = this.API_Service() + 'v2/getCustomer?admin_id=' + this.getAgentInfo()._id;
               if (this.channeldatafilter === 'all') {
                   if (Object.keys(this.filterStruct).length === 0) {
                       this.custListData = [];
                       FILTER_API = FILTER_API + '&skip=' + skip;
                       console.log(" TRUE Filter Api RESPONSE", FILTER_API)
                   } else {
                       this.custListData = [];
                       FILTER_API = FILTER_API + '&skip=' + skip + '&filterBy=' + this.filterStruct;
                       console.log(" False Filter Api RESPONSE", FILTER_API)
                   }
               } else {
                   if (Object.keys(this.filterStruct).length === 0) {
                       this.custListData = [];
                       FILTER_API = FILTER_API + '&channelCode=' + e + '&skip=' + skip;
                       console.log(" Else IF Filter Api RESPONSE", FILTER_API)
                   } else {
                       this.custListData = [];
                       FILTER_API = FILTER_API + '&channelCode=' + e + '&skip=' + skip + '&filterBy=' + this.filterStruct;
                       console.log("Else Api RESPONSE", FILTER_API)
                   }
               }
               let self = this
               // axios.get(FILTER_API).then(
                   // res => {
                       this.GETUSER(FILTER_API , function(res,error){

                       //    console.log("GET Policy DATA::==->", res);
                       if (res.data.errCode === -1) {
                           self.customerdataList = res.data.errMsg
                           console.log("GETCustomer API DATA ::==>", self.customerdataList);
                           for (var i = 0; i < self.customerdataList.length; i++) {
                               self.custdbStruct = {};
                               // self.leadListData = [];
                               self.custdbStruct.client_id = self.customerdataList[i].client_id;
                               self.custdbStruct.selected = false;
                               // console.log('LEAD NAME: >',self.custdbStruct.name)
                               self.custdbStruct.customer_first_name = self.checkValidity(self.customerdataList[i].customer_first_name)
                               self.custdbStruct.customer_last_name = self.checkValidity(self.customerdataList[i].customer_last_name)
                               self.custdbStruct.primary_telephone = self.checkValidity(self.customerdataList[i].primary_telephone)
                               self.custdbStruct.email_id = self.checkValidity(self.customerdataList[i].email_id)
                               self.custdbStruct.state_code = self.checkValidity(self.customerdataList[i].state_code)
                               self.custdbStruct.city_code = self.checkValidity(self.customerdataList[i].city_code)
                               // self.custdbStruct.appcode = self.customerdataList[i].application_code
                               self.customerformdata.applicationcode = self.customerdataList[i].application_code === null ? '-' : self.customerdataList[i].application_code;
                               self.custdbStruct.Agent_primary_email = self.customerdataList[i].allocatedToAgent === null ? '-' : self.customerdataList[i].allocatedToAgent.primary_email;
                               self.custdbStruct.fullobj = self.customerdataList[i]
                               // console.log('LEAD LISTIIII: >',self.custdbStruct)
                               //new variable for application code => customerformdata.applicationcode
                               self.custListData.push(self.custdbStruct)
                               // console.log('Customer LIST: >',self.custListData)
                           }
                           console.log("Application Code from GET CUST is =>", self.custListData)
                           var pageLen = res.data.errMsg[1]
                           let totalCount = pageLen[0].totalCount
                           console.log('Page Length:', totalCount)
                           self.pageLength = Math.ceil(totalCount / self.skipdiffrence)
                           // console.log("getting CUSTOMER data for table::=>", self.customerdataList);
                       }
                   }
               ).catch(
                   err => {
                       console.log(err);
                   }
               );
           },
           checkValidity(data) {
               // console.log('Validity Data', data);
               if (data == "" || data == "undefined" || data == null || data == '' || data == 'Invalid Date') {
                   return "-"
               } else {
                   return data;
               }
           },
           Searchdatatable(e) {
               console.log("e data", e)
               this.value = e;
           },
           searchAgentCust(search) {
               console.log("Search", search)
               this.agentSearch = search;
           },
           goNext() {
               // console.log("Data is",JSON.parse(this.bulkData))
               // let datanew = JSON.parse(this.bulkData)
               // let temarray=[]
               // for(let i=0;i<datanew.length ; i++){
               //     if(datanew[i].firstName !== "" || datanew[i].lastName !== "" || datanew[i].primaryMobile !== "" || datanew[i].email !== "" || datanew[i].city !== "" || datanew[i].state !== "" || datanew[i].leadStatus !== "" || datanew[i].leadDisposition !== "" || datanew[i].LeadSubDisposition !== "" || datanew[i].start_time !== "" || datanew[i].start_date !== "" || datanew[i].remarksfromSource !== "" || datanew[i].remarksfromUser !== "" || datanew[i].leadOwnerId !== "" || datanew[i].leadCreatorId !== "" ){
               //         temarray.push(datanew[i])
               //     }else{
               //     }
               // }
               // console.log('temp array final data',temarray)

               if(this.bulkData.length == 0){
                    this.showToast('Please Upload a Sheet to continue', this.TOST().ERROR);
                  return
               }

               const formData = {
                   existingPartners: this.bulkData
               };
               console.log("FormData json check", formData);
               this.showLoader('Uploading', true);
               let self = this;
               // axios.post(this.API_Service_admin() + 'bulk_partner/'+this.getAgentInfo()._id, formData).then(
               //     res => {
                       this.POST('bulk_partner/'+this.getAgentInfo()._id,formData , (res , error) => {

                       if (res.data.errCode == -1) {
                           // console.log("Download link",res.data.errMsg);
                           self.showToast('File uploaded successfully', self.TOST().SUCCESS);
                           self.steps = 2
                           self.sucessCount = res.data.errMsg.success
                           self.failCount = res.data.errMsg.failed
                           self.errorLink = res.data.errMsg.link
                           this.showLoader('Uploading', false);
                       }
                       else if (res.data.errCode == 4)
                       {
                           self.showToast('Database Error', self.TOST().ERROR);
                           this.showLoader('Uploading', false);
                       }
                       else if (res.data.errCode == 510)
                       {
                           self.showToast(' User not found', self.TOST().ERROR);
                           this.showLoader('Uploading', false);
                       }
                       else if (res.data.errCode == 430)
                       {
                           self.showToast('Request body is empty', self.TOST().ERROR);
                           this.showLoader('Uploading', false);
                       }
                       else if (res.data.errCode == 303)
                       {
                           self.showToast('Agent id is invalid', self.TOST().ERROR);
                           this.showLoader('Uploading', false);
                       }
                       else if (res.data.errCode == 343)
                       {
                           self.showToast('JSON format invalid', self.TOST().ERROR);
                           this.showLoader('Uploading', false);
                       }
                       else
                       {
                           self.showToast('Error while uploading Customer Data', self.TOST().ERROR);
                           this.showLoader('Uploading', false);
                       }
                       // Error while uploading Customer Data
                   })
           },
           cancelStepper() {
               this.dialogBulkUpld = false
               this.channeldatafilter = 'all'
               this.GetAllLeadData(this.channeldatafilter);
               this.steps = 1
           },
           openwindow() {
               this.bulkData = []
               this.dialogBulkUpld = true
               this.sucessCount = 0
               this.failCount = 0
               this.excelfilename = ''
               fileUpload = null
               this.steps = 1
               this.errorLink = 'Link Comes Here'
               this.fileLink = ''
           },
           jsonupload(e){


               // console.log("Event is", e)
               // console.log('File Name======>>>', e.target.files[0].name)
               var me = this
               //Reference the FileUpload element.
               fileUpload = document.getElementById("fileUpload");
               console.log("File is", fileUpload)
               //Validate whether File is valid Excel file.
               var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
               if (regex.test(fileUpload.value.toLowerCase())) {
                   if (typeof(FileReader) != "undefined"){

                       me.excelfilename = e.target.files[0].name
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
                       me.showToast("This browser does not support HTML5.", "error");
                   }
               } else {
                   me.showToast("Please upload a valid Excel file.", "error", );
               }
           },
           ProcessExcel(data) {
               //Read the Excel File data.
               var workbook = XLSX.read(data, {
                   type: 'binary'
               });
               console.log("Workbook is", workbook.Strings)
               var first_sheet_name = workbook.SheetNames[0];
               /* Get worksheet */
               var worksheet = workbook.Sheets[first_sheet_name];
               //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
               //        raw: true
               //    }));
               //  workbook.SheetNames.forEach(function(sheetName) {
               // Here is your object
               var excelData = []
               excelData = XLSX.utils.sheet_to_csv(worksheet);
               // var json_object = JSON.stringify(XL_row_object);
               console.log(excelData);
               var lines = excelData.split("\n");
               var result = [];
               var headers = lines[0].split(",");
               console.log('Lines are', lines)
               for (var i = 1; i < lines.length - 1; i++) {
                   var obj = {};
                   var currentline = lines[i].split(",");
                   for (var j = 0; j < currentline.length; j++) {
                       obj[headers[j]] = currentline[j];
                   }
                   result.push(obj);
               }
               console.log("JSON IS", result)
               this.showToast('File Uploaded Successfully', 'success')
               let Str = JSON.stringify(result)
               // console.log("Final JSON Result:::::::",Str);
               //   let StrParse = JSON.parse(Str)
               this.bulkData = Str

           },
       }
   }
</script>
<style>
   .sd-img-btn-size {
   width: 80px;
   height: 80px;
   cursor: pointer;
   }
   .media-pos {
   position: absolute;
   top: 127px;
   }
   .thebtn{
   display:flex;
   align-items:center;
   color:white;
   border-radius:5px;
   font-size:15px;
   }
   .thebtn2{
   display:flex;
   align-items:center;
   justify-content:center;
   color:white;
   font-size:12px;
   }
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
   .aloc-btn{
   display: flex;
   width: 230px;
   flex-direction: row;
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
</style>
