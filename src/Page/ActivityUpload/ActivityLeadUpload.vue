<template>
<v-app>
    <v-card>
        <!-- <v-layout row wrap mt-3 >
            <v-flex class="ml-3 mr-3" style="flex-flow:column wrap;max-width:98%;">
                <v-layout row justify-space-between class="mr-3 mt-3 ">
                   <v-flex xs10 sm6 md2 style="display:flex;align-items:center">
                    
                         <v-select v-model="channeldatafilter"
                            :items="channeldataall"
                            item-text="text"
                            item-value="value"
                            label="Channel"
                            @change="channelfilters">
                        </v-select>
                    </v-flex>
        </v-layout> -->
    <!-- new overview cards  -->
                
        <v-layout justify-space-around row wrap mt-3  class="mb-2"  transition="slide-y-transition">
                    <v-flex md3.5 ml-3>
                        <v-card hover flat ripple height=100 color="light-blue lighten-3" class="card-1">
                            
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/action/supervisor_account_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{newleads}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">New Leads</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex md3.5 mr-3 ml-3>
                        <v-card hover flat ripple height=100 color="teal lighten-3" class="card-1">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/notification/sync_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{convlead}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Converted</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex md3.5 mr-3>
                        <v-card hover flat ripple height=100 :color="colordata" class="card-1">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/notification/sync_disabled_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{failedleads}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Failed</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
        </v-layout>



        <v-card flat style="background-color:#FAFAFA;">
         <v-layout row  justify-space-between class="mr-3 pt-4 ml-3" color="#FAFAFA">
               <v-flex xs10 sm6 md2 style="display:flex;align-items:center">
                        <!-- <v-text class=" headline font-weight-bold">Activity Upload</v-text> -->
                         <v-select v-model="channeldatafilter"
                            :items="channeldataall"
                            item-text="text"
                            item-value="value"
                            label="Channel"
                            @change="channelfilters">
                        </v-select>
                    </v-flex>

                 <v-flex></v-flex>

                  
                 <v-btn  depressed medium slot="activator" color="#1976D2" class="white--text thebtn" @click="gotoLeadForm">
                            add Lead
                            <v-icon dark right>add_circle</v-icon>
                    </v-btn>
                    <v-menu transition="slide-y-transition" >
                            <v-btn  depressed medium slot="activator" color="secondary" @click="openwindow" class="white--text thebtn">
                                Bulk Upload
                                <v-icon dark right>publish</v-icon>
                            </v-btn>
                    </v-menu>

                    <v-flex ml-2 xs10 sm6 md2 class="">
                        <v-text-field  @input="Searchdatatable" v-model="value" label="Search"  append-icon="search" height="30px"></v-text-field>
                    </v-flex>
                </v-layout>
        </v-card>   

                <hr>
        <v-layout row  justify-space-between class="mr-3 mt-3 ml-3">
                    <!-- <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                        <v-select v-model="channeldatafilter"
                            :items="channeldataall"
                            item-text="text"
                            item-value="value"
                            label="Channel"
                            @change="channelfilters">
                        </v-select>
                    </v-flex> -->
                    <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                        <v-select v-model="filterby"
                            :items="filterList"
                            item-text="text"
                            item-value="value"
                            label="Filter by:"
                            @change="filterBY">
                        </v-select>
                    </v-flex>
                    <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                        <v-select v-model="valueDrp"
                            :items="valueData"
                            item-text="text"
                            item-value="value"
                            label="Value"
                            @change="drpDwnValue">
                        </v-select>
                    </v-flex>
                    <v-flex xs10 sm6 md2 class=" mt-1 mr-4" v-if="showCityDrop === true">
                        <v-select v-model="cityDrp"
                            :items="cityDataDrp"
                            item-text="asciiname"
                            label="City"
                            @change="cityDropdown">
                        </v-select>
                    </v-flex>
                    <!-- <v-flex xs10 sm6 md2 class=" mt-1">
                        <v-text-field
                        @input="Searchdatatable"
                        v-model="value"
                        label="Search"
                        append-icon="search"
                        height="30px"></v-text-field>
                    </v-flex> -->
                     <v-flex></v-flex>
                </v-layout>


                <v-layout >
                    <v-layout wrap mt-3 ml-3 align-center>
                        <v-flex xs5>     
                             <v-text v-if="norecords" class="font-weight-bold body-2 typolg">No records found...</v-text>
                             <v-text v-if="norecords == false" class="font-weight-bold body-2 typolg">Showing {{  first }} to {{skip + differ}} out of {{tcount}}</v-text>
                        </v-flex>
                        <v-flex xs4 @click="resetFilters">
                            <v-btn round small class="white--text thebtn2" color="#1976D2"> Reset filters </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout wrap mt-3 ml-3 align-center justify-end xs0>
                        <v-flex xs2>
                            <v-text class="font-weight-bold body-2">{{leadLen}} items selected</v-text>
                        </v-flex>
                        <v-flex xs3 @click="removeSelection">
                            <v-btn round small color="#1976D2"  class="white--text thebtn2">Remove Selection</v-btn>
                        </v-flex>

                    <v-flex xs3>
                        <v-flex xs9 text-sm-center>
                            <v-text class="font-weight-medium body-1">Allocate</v-text>
                        </v-flex>
                        <div class="aloc-btn">

                            <v-flex xs4 text-sm-center>
                                <v-btn  @click="showPopup" small  fab dark color="secondary" v-if="showManualBtn === true">
                                    <!-- <v-icon dark>list</v-icon> -->
                                    <v-img src="../../../web/assets/Group2818.png" style="height:30px;width:30px"></v-img>
                                </v-btn>
                                <v-btn small fab disabled v-else>
                                    <!-- <v-icon dark>list</v-icon> -->
                                    <v-img src="../../../web/assets/Group2818.png" style="height:30px;width:30px"></v-img>
                                </v-btn>
                                <v-text class="font-weight-medium body-1">Manual</v-text>
                            </v-flex>
                            <v-flex xs4 text-sm-center>
                                <v-btn @click="autoAllocation" small  fab dark color="primary">
                                    <!-- <v-icon dark >list</v-icon> -->
                                    <v-img src="../../../web/assets/Group2819.png" style="height:30px;width:30px"></v-img>
                                </v-btn>
                                    <v-text class="font-weight-medium body-1">Auto</v-text>
                            </v-flex>
                        </div>
                    </v-flex>


                    </v-layout>

                </v-layout>

                <v-flex justify-center md12 ma-3>
                                <h3 class="text-xs-center mb-3">Lead Details</h3>
                                <v-data-table
                                v-model="selected"
                                :headers="headers"
                                :items="objmethod"
                                :search="search"
                            
                                hide-actions
                                select-all
                                item-key="_id"
                                class="elevation-1">
                                <template slot="headers" slot-scope="props" >
                                    <!-- <p>{{props}}</p> -->
                                    <tr>
                                        <th> -
                                            <!-- <v-checkbox v-model="leadHeadCheck" :input-value="props.all" :indeterminate="props.indeterminate"  hide-details @change="toggleAll($event)"></v-checkbox> -->
                                        </th>
                                    <th
                                        v-for="header in props.headers"
                                        :key="header.text"
                                        style="color:black"
                                        :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                        @click="changeSort(header.value)"
                                    >
                                    <!-- <v-icon small>arrow_upward</v-icon> -->
                                        {{ header.text }}
                                    </th>
                                    </tr>
                                </template>

                                <template slot="items" slot-scope="props">
                                    <!-- <tr :active="props.item.selected" @click="props.item.selected = !props.item.selected"> -->
                                         <!-- v-bind:style="{ visibility: props.item.vis  }" -->
                                   <v-flex v-bind:style="{ visibility: props.item.vis  }" >
                                    <td class="checkboxone" >
                                        <v-checkbox   v-model="props.item.selected" @change="tableCheck(props.item._id,$event,props.index)" primary hide-details></v-checkbox>
                                    </td>
                                    </v-flex>
                                    <td class="">{{props.item.name}} </td>
                                    <td class="">{{props.item.leadSource}}</td>
                                    <td class="">{{props.item.start_date}}</td>
                                    <td class="">{{props.item.start_time}}</td>
                                    <td class="">{{props.item.email}}</td>
                                    <td class="">{{props.item.primaryMobile}}</td>
                                    <td class=""><p class="singlealign" >{{props.item.state}}</p></td>
                                    <td class="">{{props.item._id | id-filter('L')}}</td>
                                    <td class="">{{props.item.city}}</td>
                                    <td class="">{{props.item.channelname}}</td>
                                    <td class="wdmax">{{props.item.leadStatus == 'converted' ? "Converted" : props.item.leadStatus == 'newleadentery'  ? 'New Lead Entry' : props.item.leadStatus == 'nocontact' ? 'No Contact' : "-"}}</td>
                                    <td class="wdmax">{{props.item.leadDisposition == 'appointment' ? 'Appointment' : props.item.leadDisposition == 'callback' ? 'Call Back' : props.item.leadDisposition == 'shorthangup' ? 'Short Hang-up' :  props.item.leadDisposition == 'wrongnumber' ? 'Wrong Number' : '-'  }}</td>
                                    <td class="">{{props.item.leadsubDisposition}}</td>
                                    <td class="">{{props.item.camapignName}}</td>
                                    <td class="">{{props.item.affiliateMasterId}}</td>
                            
                                    <td class="">{{props.item.Agent_primary_email}}</td>
                                    <!-- <td class="">{{props.item.reminder}}</td> -->
                                    <td class="">{{props.item.remarksfromSource}}</td>
                                    <td class="">{{props.item.remarksfromUser}}</td>
                                    <td>
                                        <v-icon small class="mr-2" style="cursor:pointer" @click="editlead(props.item._id)">edit</v-icon>
                                        <!-- <v-icon small class="mr-2" style="cursor:pointer" @click="editlead(props.item._id)">edit</v-icon> -->
                                        <v-icon small style="cursor:pointer" @click="deleteItem(props.item,props.index)">delete</v-icon>
                                    </td>
                                    <!-- </tr> -->
                                </template>
                            </v-data-table>
                        </v-flex>
                </v-flex>
        </v-layout>
        <div class="text-xs-center pagination">
            <v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
        </div>
        <v-dialog v-model="dialogBulkUpld" persistent max-width="700px">
                <v-card>
                    <v-flex style="background-color:#3a3a3a">
                        <v-card-title class="subheading" style="color:white;justify-content:space-between;" >Upload File
                            <v-icon dark @click="dialogBulkUpld = false">clear</v-icon>
                        </v-card-title>

                    </v-flex>

                    <v-card-text>
                    <v-container grid-list-md>
                        <v-stepper v-model="steps">
                            <v-stepper-header>
                            <v-stepper-step   step="1">Upload Data</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step  :complete="steps > 1" step="2">Status</v-stepper-step>
                            </v-stepper-header>

                            <v-stepper-items>
                            <v-stepper-content step="1">
                                    <v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
                                    <v-layout >
                                        <v-flex  class="fileContainer-bulk  mt-6">
                                    <v-text class="upload-text">UPLOAD FILE</v-text>
                                        <v-icon right dark>publish</v-icon>
                                <input type="file"
                                id="fileUpload"
                                @change="jsonupload">
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
                                                <div class="font-weight-medium body-2 "> Selected File: </div>
                                                <div class="body-1 font-weight-regular font-italic">{{fileLink}}</div>
                                            </v-layout>
                                        </div>
                                    </v-layout>
                                <v-layout mt-3 justify-space-between>
                                        <!-- <a href="../../../web/assets/LeadSampleFile.xlsx" download> -->
                                        <a href="https://image-upload-bucket-2019.s3.ap-south-1.amazonaws.com/98e53dbd3b0a1f6da99d4b597c5ab9571ba7747d.xlsx" download>
                                        <v-btn color="primary">sample file
                                            <v-icon right dark>save_alt</v-icon>
                                        </v-btn>
                                        </a>
                                        <v-btn color="primary" @click="goNext()">Next <v-icon class="ml-2" size="20px">arrow_forward</v-icon></v-btn>

                                </v-layout>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                    <v-flex xs12 sm12 md12 style="display:flex;align-items:center">
                                        <v-icon large color="success">check_circle_outline</v-icon>
                                        <v-text class="subheading font-weight-medium ml-3"> {{sucessCount}} Users  Data successfully Uploaded</v-text>
                                    </v-flex>

                                    <v-flex xs12 sm12 md12 mt-3 style="display:flex;align-items:center">
                                        <v-icon large color="error">highlight_off</v-icon>
                                        <v-text class="subheading font-weight-medium ml-3">Errors Found in {{failCount}}  Users Data</v-text>
                                    </v-flex>
                                    <v-flex mt-3>
                                        <v-text class="subheading font-weight-medium ml-1">Failed Data:</v-text>
                                        <a :href ="errorLink" download>{{errorLink}}</a>
                                    </v-flex>
                                <v-card-actions style="justify-content:flex-end;">
                                <v-layout mt-5 justify-space-between>
                                    <v-btn color="primary" @click="steps =1 " ><v-icon class="mr-2">arrow_back</v-icon>Previous</v-btn>
                                    <v-btn color="primary" @click="cancelStepper">Close<v-icon class="ml-2" size="20px">clear</v-icon></v-btn>
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
            <v-dialog v-model="manualAlloc" max-width="900" >
                <v-card>
                    <v-layout justify-space-between style="background-color:#424242">
                        <v-card-title class="title" style="color:white">Manual Allocation</v-card-title>
                        <v-flex xs4 class="ma-2">
                            <!-- <v-text-field @input="Searchdatatable" v-model="value" label="Search" append-icon="search" height="30px"></v-text-field>  -->
                            <v-text-field @input="searchAgentData" v-model="searchAgent" flat dark solo-inverted hide-details prepend-inner-icon="search" label="Search" class=""></v-text-field>
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
                                <v-flex >
                                    <v-select v-model="popChannel" @change="getPopChannel"  :items="channeldata" item-text="text"   label="Channel Name"></v-select>
                                </v-flex>
                                <v-flex >
                                    <v-select v-model="popState" @change="getAgentCity" :items="agntStateList" item-text="text" autocomplete label="State"></v-select>
                                </v-flex>
                                <v-flex >
                                    <v-select v-model="popCity" @change="cityData" :items="agentCityList" item-text="asciiname" autocomplete  label="City"></v-select>
                                </v-flex>
                                <v-flex >
                                    <v-select v-model="popBranch" @change="branchDrop" :items="branchArray"  item-text="text" autocomplete label="Branch"></v-select>
                                </v-flex>
                                <v-btn round small color="primary" @click="getAllAgents">
                                    Show agents
                                </v-btn>
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
                                    <v-data-table
                                        v-model="popTable"
                                        :headers="popHeader"
                                        :items="agentObj"
                                        :search="search"
                                        hide-actions
                                        :pagination.sync="pagination"
                                        item-key="_id"
                                        class="elevation-1">

                                        <template slot="items" slot-scope="props">
                                            <!-- <tr :active="props.selected" @click="props.selected = !props.selected"> -->
                                            <td >
                                                <!-- <v-checkbox v-model="props.popTable" @change="agentTable(props.item._id,$event)" primary hide-details></v-checkbox> -->
                                                <v-radio-group v-model="radios" row>
                                                    <v-radio :value="props.item._id" @change="agentTable(props.item._id,$event, props.item)" ></v-radio>
                                                </v-radio-group>
                                            </td>
                                            <td class="">{{props.item.first_name}}</td>
                                            <td class="">{{props.item.last_name}}</td>
                                            <td class="">{{props.item.agent_id}}</td>
                                            <td class="">{{props.item.reporting_manager.first_name}}</td>
                                            <td class=""><span :style="{color: props.item.leadpopStatus == 'Active' ? '#13961c' : '#d61111'}" >{{props.item.leadpopStatus}} </span></td>
                                            <td class="">{{props.item.city}}</td>
                                            <!-- </tr> -->
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

                                        <v-btn round small color="primary" v-if="showAllocateBtn === true" @click="allocateLeads">
                                            Allocate
                                        </v-btn>
                                        <v-btn round small disabled color="primary"  v-else>
                                            Allocate
                                        </v-btn>

                                    </v-layout>
                                    <!-- <div class="text-xs-center pagination pt-2">
                                        <v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
                                    </div> -->
                                </v-flex>
                            </v-flex>

                        </v-layout>
                    </v-flex>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn round medium color="primary" @click="closemanualpopup">Close</v-btn>
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
                     <!-- <v-flex text-sm-center mt-2>
                        <v-text class="subheading font-weight-bold" style="color:#F44336">00:{{timer}}</v-text>
                    </v-flex> -->
                    <v-flex text-sm-center mt-2 mb-4>
                        <v-text class="body-1 font-weight-bold">25 leads from 6 cities to agents in 6 branches</v-text>
                    </v-flex>

                    <v-card-actions style="justify-content:space-between">
                        <!-- <v-spacer></v-spacer> -->
                        <!-- <v-btn small round color="primary" v-if="showUndo === true" @click="undoProcess">
                            Undo Process
                        </v-btn>
                        <v-btn small round disabled color="primary" v-else>
                            Undo Process
                        </v-btn> -->
                        <v-btn small round color="primary" @click="autoAlloc = false">
                            finish
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbar" :bottom="x === 'bottom'" :left="y === 'left'" :color="color" :multi-line="mode === 'multi-line'" :timeout="timeout" :vertical="mode === 'vertical'">
                Undo Process
                <v-btn dark flat color="primary" @click="undoProcess">Undo </v-btn>
            </v-snackbar>
    </v-card>
</v-app>
</template>
<script>
import axios from 'axios'
import loadChannel from '../../common/onProjectLoad.js'
import lead from './leadCreate/submitLead'
import {LEAD_STATUS_LIST} from '../ActivityUpload/leadCreate/data-lib.js'
var fileUpload =null

export default {
    created(){

      // new count api http://159.89.161.64:3020/secure/admin/admin_lead_count/5b3b4cc28fa96d39870443e3?channelCode=5d19e62378402c1d059bc54b
        // this line mentioned below will set the first page number as 1 waiting to be swapped later
        this.first = 1
        // this line populates the count on created as the count function was triggred from Channel drop-down
        this.callcardcount('all');
        this.$store.commit('SET_PAGE_TITLE','Activity Lead Upload');
        // console.log('OBJ METHOD' , this.objmethod)
        let self = this;
        loadChannel.getChannel(this, res => {
            console.log("mixin channel data" ,  res)
            console.log("Before API HIT")
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

                this.channeldataall.unshift(alldata);
              
               
        })
     
        // this.channeldatafilter = 'all'
        this.GetAllLeadData(this.channeldatafilter);

        // this.getAllAgents();
        this.GetAgentstate();
        this.getAgentCity();
        // axios.get('http://159.89.161.64:3020/secure/admin/admin_lead_count/5b3b4cc28fa96d39870443e3?channelCode=5d19e62378402c1d059bc54b').then(res => {

        //                     console.log('NEW API', res.data);

        //  })
        // this.timerCount();

    },
    mounted(){
        // console.log('OBJ METHOD' , this.objmethod())
    },
    data(){
        return{
            rmng_id:"",
            rmng_fname:"",
            rmng_lname:"",
            agent_fname:"",
            agent_lname:"",
            norecords:false,
            enablebtn:true,
            less:false,
            differ:15,
            first:1,
            second:0,
            tcount:0,
            countcard:false,
            newleads:0,
            convlead:0,
            failedleads:0,
            colordata:'red lighten-3',
            vis:'',
            allocatedfilter:'',
            value:'',
            TableName:'',
            search: '',
            searchAgent:'',
            snackbar:'',
            mode:'',
            x:'',
            y:'left',
            color:'secondary',
            timeout:null,
            showUndo:false,
            pageLength:0,
            page:1,
            skip:0,
            skipfilterdata:0,
            radios:1,
            skipdiffrence:this.paginationdiff(),
            channeldatafilter:'all',
            channeldataall:[],
            channeldata:[],
            selected:[],
            popTable:'',
            agntStateList:[],
            agentCityList:[],
            allAgents:[],
            branchArray:[],
            agentSelctId:{},
            agentsAll:[],
            agntObj:[],
            getState:[],
            cityDataDrp:[],
            showCityDrop:false,
            evState:'',
            affiliateName:[],
            cityDrp:'',
            leadLen:'0',
            AgentID:'',
            showAllocateBtn:false,
            finalID:[],
            manualID:[],
            manualAlloc:false,
            autoAlloc:false,
            showAlertext:false,
            showManualBtn:false,
            pagination:{},
            popChannel:'',
            popState:'',
            popCity:'',
            popBranch:'',
            leadpopStatus:'',
            channelPopID:'',
            leadHeadCheck:'',
            stateItems:['Maharashtra','Goa','Kerala','Karnataka'],
            cityItems:['Mumbai','Panaji','Chennai','Bangalore'],
            branchItems:['Chembur','Andheri','Mulund','Powai'],
            dbStruct:{
                name:'',
                leadSource:'',
                email:'',
                primaryMobile:'',
                state:'',
                _id:'',
                city:'',
                statusProductType:'',
                leadDisposition:'',
                leadsubDisposition:'',
                leadStatus:'',
                camapignName:'',
                affiliateName:'',
                start_date:'',
                start_time:'',
                Agent_primary_email:'',
                reminder:'',
                remarksfromSource:'',
                remarksfromUser:'',
                channelname:'',
            },

            leadListData:[],

            bulkData:[],
            sucessCount:0,
            failCount:0,
            errorLink:'Link Comes Here',
            fileLink:'',
            excelfilename:'',
            dialogBulkUpld:false,
            leadDetailsallList:[],
            filterby:'',
            selectFilter:'',
            selectValue:'',
            valueDrp:'',
            filterStruct:'',
            timer:60,
            valueData:[],
              allocatedlist:[
                {text: 'Allocated', value: 'allocated'},
                {text: 'Un Allocated', value: 'unallocated'}

            ],
            filterList:[
                    {text: 'Status', value: 'status'},
                    {text: 'Source', value: 'source'},
                    {text: 'Campaign', value: 'campaign'},
                    {text: 'Affiliate', value: 'affiliate'},
                    {text: 'State', value: 'state'},
                    // {text: 'City', value: 'city'},
                    {text: 'Is Allocated', value: 'isallocated'},
                ],
            headers:[
                        {text: 'Name', value: 'Name'},
                        {text: 'Source', value: 'source'},
                         {text: 'Date', value: 'start_date'},
                        {text: 'Time', value: 'start_time'},
                        {text: 'Email', value: 'email'},
                        {text: 'Mobile', value: 'primaryMobiles'},
                        {text: 'State', value: 'state'},
                        {text: 'LeadID', value: '_id'},
                        {text: 'City', value: 'city'},
                        // {text: 'Product', value: 'statusProductType'},
                        {text: 'Channel Name', value: 'channelName'},
                        {text: 'Lead Status', value: 'leadStatus'},
                        {text: 'Disposition', value: 'appointmentdisPosition'},
                        {text: 'SubDisposition', value: 'appointmentsubdisPosition'},
                        {text: 'Campaign Name', value: 'campaign'},
                        {text: 'Affiliate Name', value: 'affiliate'},
                       
                        {text: 'Allocated To', value: 'isallocated'},
                        // {text: 'Reminder', value: 'reminder'},
                        {text: 'SourceRemarks', value: 'remarksfromSource'},
                        {text: 'UserRemarks', value: 'remarksfromUser'},
                        {text: 'Action', value: 'action', sortable: false}
                    ],

            popHeader:[
                {text:'',value:'blank'},
                {text:'First Name',value:'Fname'},
                {text:'Last Name',value:'Lname'},
                {text:'Agent ID',value:'agentId'},
                {text:'Reporting Manager',value:'reportingManager'},
                {text:'User Status',value:'userStats'},
                {text:'Open Leads',value:'openLeads'},
            ],
            leadData:[],
            errormsg:'',
            timeInSecs:'',
        }
    },

    filters: {
        isempty(value) {
            console.log(' = >>>>> ', value);
            if (value == null || value === undefined || value === "") {
                return "-";
            } else {
                return value;
            }
        }
    },
    computed:{


        objmethod() {
            // if(this.errormsg !== 'No lead for user / agent' || this.errormsg  !== 'User not found'){
        try {
         var self=this;
         if (Array.isArray(this.leadListData)) {

         return this.leadListData.filter(function(cust){
        //    console.log('Filter Lead', cust)
           return cust.name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        //  || cust.lastName.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.Agent_primary_email.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.primaryMobile.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.state.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.city.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        //  || cust.statusProductType.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.leadStatus.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.leadDisposition.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.leadsubDisposition.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.remarksfromSource.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || self.idFilter(cust._id).toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.remarksfromUser.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.camapignName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.affiliateMasterId.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.leadSource.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.reminder.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.start_date.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.start_time.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.statusProductType.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        });

        }
        } catch(err) {
               console.log(err)
           }
        },

        pages () {
            if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
            ) return 0

            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
            console.log('Per_PAGE->', this.pagination.rowsPerPage);
        },

        agentObj(){
            var self=this;
            if (Array.isArray(this.allAgents)) {

                return this.allAgents.filter(function(agent){
                //    console.log('Filter Lead', agent)
                return agent.first_name.toLowerCase().indexOf(self.searchAgent.toLowerCase()) >=0
                || agent.last_name.toLowerCase().indexOf(self.searchAgent.toLowerCase()) >=0
                || agent._id.toString().toLowerCase().indexOf(self.searchAgent.toLowerCase()) >=0
                || agent.reporting_manager.first_name.toLowerCase().indexOf(self.searchAgent.toLowerCase()) >=0
                || agent.leadpopStatus.toLowerCase().indexOf(self.searchAgent.toLowerCase()) >=0
                || agent.city.toLowerCase().indexOf(self.searchAgent.toLowerCase()) >=0

            });

            }
        }

    },
    methods:{


        undoProcess(){
            
            let formData = {
                channelCode : '5cbaf3e2bf1c296da0aae7d7',
                userId : this.getAgentInfo()._id
            }
                    this.POST('undo_auto_allocation',formData,(res,error)=>{
                    if(error){
                        console.log(error)
                    }else{
                    var undoAllocate = res.data.errMsg
                    console.log('Undo Alloc:>>',res.data.errMsg)
                    this.snackbar = false
                    }
                    
                })
        },
        autoAllocation(){
            let formData = {
                channelCode : '5cbaf3e2bf1c296da0aae7d7',
                userId : this.getAgentInfo()._id
            }
                    this.POST('autolAllocation_lead',formData,(res,error)=>{
                        if(error){
                            console.log(error)
                        }else{
                        var autoAllocate = res.data.errMsg
                        console.log('Auto Alloc:>>',res.data.errMsg)
                        this.autoAlloc = true;
                        this.snackbar = true
                        this.timer = 60;
                        this.timerCount();
                        }

                    })
        }, 

        timerCount(){
            var self = this;
            self.timer = 60
            // this.showUndo = true;
            var interval = setInterval(() => {
                self.timer = self.timer - 1;
                
                // console.log('TIME COUNT',self.timer);     
                if (self.timer === 0) {
                    self.timer = "00";
                    this.snackbar = false
                    clearInterval(interval)

                    let formData = {
                        channelCode : '5cbaf3e2bf1c296da0aae7d7',
                        userId : this.getAgentInfo()._id
                    }

                    this.POST('trf_tempLead_leads',formData,(res,error) => {
                        if(error){
                            console.log(error)
                        }else{
                            var undoAlloc = res.data.errMsg
                            console.log('Undo Alloc Temp:>>',res.data.errMsg)
                        
                        }
                    })
                }
            }, 1000);
        },
        resetFilters(){
            this.channeldatafilter = 'all';
            this.filterby = '';
            this.valueDrp = '';
            this.cityDrp = '';
            this.filterStruct = '';
            this.GetAllLeadData(this.channeldatafilter)
        },
        removeSelection(){
            this.manualID = [];
            this.leadLen = '0';
            this.selected = [];
            this.showManualBtn = false;
            this.leadHeadCheck = false
            // console.log('leadListData',this.leadListData)
            for(let i=0;i<this.leadListData.length;i++){
                this.leadListData[i].selected = false
            }
        },

        // @Change Event function for Popup Channel Dropdown List @author:Salman Shaikh
        getPopChannel(event){
            console.log('Channel Event::',event)
            this.channelPopID = event;
            this.getAllAgents(this.channelPopID)
        },

        // @Change Event function for Popup Table's Radio buttons for Agents @author:Salman Shaikh
        agentTable(_id,event, alldata){

            //at99

            console.log('alldata is ->>',alldata);
            this.rmng_id = alldata.reporting_manager._id
            this.rmng_fname = alldata.reporting_manager.first_name
            this.rmng_lname = ""
            this.agent_fname = alldata.first_name
            this.agent_lname = alldata.last_name
            console.log('_ID>>',_id)
            this.AgentID = _id;
            this.popTable = '';
            this.showAllocateBtn = true

        },
        // @Change Event function for Main Page Table's Checkboxes for Leads @author:Salman Shaikh
        tableCheck(user_ID,bool,ind){
            // console.log("user_ID :>>", user_ID)
            // console.log("bool :>>", bool)
            // console.log("ind :>>", ind)
            // console.log('SELEct',this.selected)

            this.leadListData[ind].selected = bool;
            if (bool) {
                this.leadLen++;
            } else {
                this.leadLen--;
            }

            for(let i = 0;i< this.leadDetailsallList.length; i++){
                if(user_ID === this.leadDetailsallList[i]._id){
                    if (bool) {
                            this.manualID.push({_id:this.leadDetailsallList[i]._id}); // push the Id in array if checked
                             this.showManualBtn = true;
                              this.leadHeadCheck = true
                            //   this.leadLen = this.manualID.length
                            // console.log('agent Id(1):>', this.manualID)
                        } else {
                            const index = this.manualID.findIndex(list => list._id == user_ID);//Find the index of stored id
                            this.manualID.splice(index, 1); // Then remove
                            // this.leadLen = this.manualID.length
                            if(this.manualID.length === 0){
                                this.showManualBtn = false;
                                this.leadHeadCheck = false
                            }
                        }
                    }
            }
            // this.leadLen = this.manualID.length
        },

        // Popup Filter Function @click of Show Agents @author:Salman Shaikh
        getAllAgents(){
            // console.log("city :>>", this.popCity)
            // console.log("State :>>", this.popState)
            // console.log("Channel :>>", this.channelPopID)
            console.log("BRanch :>>", this.popBranch)

            this.popTable = '';
            this.agntObj = [];
            this.showAllocateBtn = false;
            if(this.popState !== ''){
                this.GET('getallAgent?user_id='+this.$store.state.agentDetails._id+'&channelCode='+this.channelPopID+'&skip=0&user_state='+this.popState+'&user_city='+this.popCity + '&user_branch=' + this.popBranch, res => {

                   res.data.errMsg[0].forEach( element => {
                        element.leadpopStatus = '';
                    });

                    console.log('All AGENT Resp',res.data.errMsg[0])
                    this.allAgents = res.data.errMsg[0]
                    this.showAlertext = true

                    for(var i =0;i< this.allAgents.length;i++){
                         if(this.allAgents[i].active === 1){
                            this.allAgents[i].leadpopStatus = 'Active'
                        }else if(this.allAgents[i].active === 0){
                            this.allAgents[i].leadpopStatus = 'InActive'
                        }

                    }
                })
            }

        },
        showPopup(){
            this.manualAlloc = true
            this.searchAgent=''
            this.showAlertext=false
            this.popChannel=''
            this.popState=''
            this.popCity=''
            this.popBranch=''
            this.showAlertext=false
            this.allAgents=[]
            this.AgentID = ''
            this.showAllocateBtn = false
            this.radios = 1

        },
        allocateLeads(){
            var allocID =  this.manualID
            // console.log('Ag ID>>',this.AgentID)
            // console.log('agent SelctId:>',allocID )
            // console.log('agentId:>',this.AgentID )
            if(allocID.length !== 0){
            const manualLeadId ={

                userId:this.$store.state.agentDetails._id,
                Allocated_user_id:this.AgentID,
                Lead_Id_List:allocID,
                firstName:  this.agent_fname,
                lastName:  this.agent_lname , 
                reporting_manager_first_name: this.rmng_fname , 
                reporting_manager_last_name: this.rmng_lname, 
                reporting_manager_id:  this.rmng_id ,

             }
             console.log("formdata for allocate ->",manualLeadId);
             this.POST('manualAllocation_lead',manualLeadId,(res,error) => {
                    if(error){
                        console.log(error)
                    }else{
                        var affiliateData = res.data.errMsg
                        console.log('manual Alloc:>>',res.data.errMsg)
                    }
                    })
            }

            this.showToast('Leads Allocated Successfully','success')
            this.manualAlloc = false;
            console.log(" channel filter ",this.channeldatafilter, this.skipfilterdata)
            this.GetAllLeadData(this.channeldatafilter,this.skipfilterdata);
            this.manualID=[]
            this.showManualBtn = false
            // this.popChannel = '';
            // this.popState = '';
            // this.popCity = '';
            // this.popBranch = '';

        },
        closemanualpopup(){
            this.manualID=[] 
            this.showManualBtn = false
            this.manualAlloc = false 
            this.removeSelection();
            // this.leadHeadCheck =false
            

        },
         GetAgentstate(){
                this.GETSTATE(res=>{
                    // console.log('State Resp',res)
                    this.getState = res;
                for(let i =0;i<this.getState.length;i++){
                    let statedata={
                        text:this.getState[i].region_data.name,
                        code:this.getState[i].region_data.adminCode1
                    }
                    this.agntStateList.push(statedata)
                    // this.agntStateList.sort();
                }

            })
            // console.log(this.agntStateList,"response mixin data")

            },
            getAgentCity(ev){
                    console.log("event ev>>", ev)
                    let codes= this.agntStateList.filter(e=>{
                        if(e.text === ev){
                            return e.code
                        }
                    })
                    this.GETCITY(codes[0].code,resp=>{
                        this.agentCityList = resp[0].cities
                    })
            },
            cityData(event){
                // console.log("City event ", event)
                // console.log("city :>>", this.popCity)
                // console.log("State :>>", this.popState)
                 this.GET('getbranch?branchfilter=All&created_by='+this.getAgentInfo()._id+'&channelCode='+this.channelPopID+'&skip=0&user_city='+this.popCity+'&user_state='+this.popState,res => {
                   console.log('Branch details',res.data.errMsg[0])
                   this.branchArray=[];
                   let branchArr = res.data.errMsg[0];
                   for(var i =0;i< branchArr.length;i++)
                   {
                       let brdata={
                           text: branchArr[i].branchName,
                           value: branchArr[i]._id,
                       }
                           this.branchArray.push(brdata)
                   }
                //    console.log("Branch Array ==>>>",this.branchArray)
               })

            },

            branchDrop(branch){
                console.log('BRANCH Name: ',branch)
            },
        gotoLeadForm() {
            // Here, Store is clear before going to next page
            this.commit('Lead_Object', 'clear');
            // let tabs={
            //     link:'/Lmaster/status',
            //     linkno:1
            // }
            // this.commit('LEAD_LINKS_TAB',tabs)

            /**
             * @author Khan Usama
             * Date 03/04/2019
             * @name initialLeadBodyStructure
             * @description When we want to create a fresh lead then first we need to commit empty object which is same as api form body
             * Taken from submitLead.js File
             */

            let objectWrapper = [];
            objectWrapper.push(JSON.parse(JSON.stringify(lead.initialLeadBodyStructure)));
            this.commit('Lead_Object', objectWrapper);
            this.jump('/Lmaster/status');

            this.commit('LED_PUT_POST','POST')
            objectWrapper = undefined;
      },
       toggleAll (e) {
        //    console.log('Toggle Event',e)
            this.showManualBtn = true;
            this.selected = []
            this.leadLen = 0;

         let temp = this.leadListData.map(items => {
            if (e == true) {
                this.manualID = this.objmethod.slice()
                console.log('SeleCTED',this.manualID)
                this.leadLen++;
            } else {
                this.manualID = [];
                console.log('Un SeleCTED',this.manualID)
                this.showManualBtn = false;
                this.leadLen = 0;
            }
            items.selected = e;
            return items;
        });

        this.leadListData  = [];
        this.leadListData = temp;
        // console.log('Dataa',this.leadListData)
        temp = undefined;

      },
      changeSort (column) {
          console.log('Column ',column)
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },

      editlead(id){
                /**
                 * Date 9/3/2019
                 */
                console.log("Which id->", id)
                this.getLeadData(id, res => {
                    if (res.data.errCode == -1) {
                        console.log("FROM -1->",res.data.errMsg[0] )
                        // res.data.errMsg.userId  = res.data.errMsg.userId;
                        let _lead_response = Object.assign({
                            LeadId: res.data.errMsg[0]._id,
                            user_id: res.data.errMsg[0].userId._id,
                            lead_Owner_Id: res.data.errMsg[0].leadOwnerId,
                            lead_Creator_Id: res.data.errMsg[0].leadCreatorId,
                        }, res.data.errMsg[0]);

                        delete _lead_response.leadOwnerId;
                        delete _lead_response.leadCreatorId;
                        delete _lead_response.leadSource;
                        delete _lead_response.camapignName;
                        delete _lead_response.affiliateMasterId;

                        _lead_response = Object.assign({
                            leadSource: Boolean(res.data.errMsg[0].leadSource) ? typeof(res.data.errMsg[0].leadSource) === "object" ? res.data.errMsg[0].leadSource._id : res.data.errMsg[0].leadSource : "",
                            camapignName: Boolean(res.data.errMsg[0].camapignName) ? typeof(res.data.errMsg[0].camapignName) === "object" ? res.data.errMsg[0].camapignName._id : res.data.errMsg[0].camapignName : "",
                            affiliateMasterId: Boolean(res.data.errMsg[0].affiliateMasterId) ? typeof(res.data.errMsg[0].affiliateMasterId) === "object" ? res.data.errMsg[0].affiliateMasterId._id : res.data.errMsg[0].affiliateMasterId : "",
                        }, _lead_response);

                        let arr = [];
                        arr.push(_lead_response);

                        if (_lead_response.leadStatus === 'contact' && _lead_response.leadDisposition === 'appointment') {
                            arr.push(res.data.errMsg[1]);
                        }

                        this.$store.commit('Lead_Object', arr);
                        console.log('New Fields are assign  ' , arr);

                        this.commit('LED_PUT_POST','PUT')
                        // console.log("lead mutation data", res.data.errMsg)
                        this.$router.push('/Lmaster/status')
                        // let tabs={
                        //     link:'/Lmaster/status',
                        //     linkno:1
                        // }
                        // this.commit('LEAD_LINKS_TAB',tabs)
                                }
                });
            },

      deleteItem (item,index) {
        this.usrdetails.splice(index, 1)
        },
        getLeadData(id, callback = null){
             this.GET('getlead_details/'+id, res => {

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
                    console.log('GET USER REPONSE OF LEAD',res.data.errMsg)
                    // this.leaddatanew = res.data.errMsg
                    this.leadData = res.data.errMsg[0]

                    this.editItem(this.leadData, 0)
                    // for(var i =0 ;i< this.usrdetails.length;i++)
                    // {
                    //     this.TableName = this.usrdetails[i].firstName + this.usrdetails[i].lastName
                    // }
               })
         },
         channelfilters(e){
            console.log('I am called by created ',e)
            this.page = 1
            this.channeldatafilter = e;
              console.log('this.channeldatafilter',this.channeldatafilter);
                var ch = this.channeldatafilter;
            this.callcardcount(e)
                
            // this.GetAllLeadData(this.channeldatafilter)
            this.enablebtn = true
            this.next(1)
             this.first = 1
            if(this.differ == 0)  {
                     this.skip= 15; 
            } 
           
        },

        callcardcount(e){

             this.GET('admin_lead_count/'+this.$store.state.agentDetails._id+'?channelCode='+e, res => {
                    console.log('NEWAPI',res.data.errMsg);
                    let allcount = res.data.errMsg
                    this.newleads = allcount.open_lead;
                    this.convlead = allcount.lead_convertd;
                    this.failedleads =allcount.failed_lead_count;

                     })

        },

        filterBY(e){
            console.log('Filters>>',e)

            // this.selectFilter = e
            // console.log('Filter By>>',this.filterby)
            if(e === 'affiliate'){
                this.evState = e;
                this.valueData =[];
                this.showCityDrop = false
                this.GET('fetch_affiliate?filter=30',res => {
                    var affiliateData = res.data.errMsg
                    for(let i = 0;i < affiliateData.length;i++){
                        let value ={
                            text:affiliateData[i].name,
                            value:affiliateData[i]._id
                        }
                        this.valueData.push(value);
                        // console.log('VAlue Data',this.valueData)
                    }
               }
           )
            }else if(e === 'campaign'){
                this.evState = e;
                this.valueData =[];
                this.showCityDrop = false
                 this.GET('fetch_campaign_list?filter=30',res => {
                        var campData = res.data.errMsg
                        // console.log('VAlue Data',campData)
                        for(let i = 0;i < campData.length;i++){
                        let value ={
                            text:campData[i].name,
                            value:campData[i]._id
                        }
                        this.valueData.push(value);
                            // console.log('VAlue Data',this.valueData)
                        }
                }
            );
            }else if(e === 'source'){
                this.evState = e;
                this.valueData =[];
                this.showCityDrop = false
                 this.GET('fetch_lead_sources?filter=30',res => {
                        var sourceData = res.data.errMsg
                        console.log('VAlue Data',sourceData)
                        for(let i = 0;i < sourceData.length;i++){
                        let value ={
                            text:sourceData[i].name,
                            value:sourceData[i]._id
                        }
                        this.valueData.push(value);
                            // console.log('VAlue Data',this.valueData)
                        }
                })
            }else if(e === 'status'){
                this.evState = e;
                this.valueData =[];
                this.showCityDrop = false
                // console.log('LEAD_STATUS_LIST ',LEAD_STATUS_LIST )
                 for(let i = 0;i < LEAD_STATUS_LIST.length;i++){
                    let value ={
                        text:LEAD_STATUS_LIST[i].dispValue,
                        value:LEAD_STATUS_LIST[i].value
                    }
                    this.valueData.push(value);
                        // console.log('VAlue Data',this.valueData)
                }
            }else if(e === 'isallocated'){
                this.evState = e;
                this.valueData =[];
                this.showCityDrop = false
              console.log("allocatged list",this.allocatedlist)
                for(let i = 0; i< this.allocatedlist.length; i++){
                     let value ={
                        text:this.allocatedlist[i].text,
                        value:this.allocatedlist[i].value
                    }
                    this.valueData.push(value);
                }


            }else if(e === 'state'){
                // this.valueDropdown(e)
                this.evState = e;
                this.valueData = [];
                for(let i =0;i<this.getState.length;i++){
                    let value={
                        text:this.getState[i].region_data.name,
                        code:this.getState[i].region_data.adminCode1
                    }
                    this.valueData.push(value);
                    // console.log('VAlue Data State',this.valueData)
                }
            }

        },

        drpDwnValue(e){
            this.selectValue = e
            // console.log('VALUE>>',this.selectValue)
            // console.log('VAlue Ev:>',this.evState)
            // console.log('this.filterby:>',this.filterby)

            this.filterStruct = '';
            // this.evState !== 'state'  ? this.filterStruct = this.filterby +'|'+ this.valueDrp : '';
            if(this.evState !== 'state'){
                this.filterStruct = this.filterby +'|'+ this.valueDrp
                console.log("Filter Struct ", this.filterStruct)
                // this.GetAllLeadData(this.channeldatafilter)
                  this.next(1)
            }else{
                 // console.log('value Data>>',this.valueData)
                this.filterStruct = '';
                this.filterStruct = this.filterby +'|'+ this.valueDrp
                console.log("Filter Struct ", this.filterStruct)
                // this.GetAllLeadData(this.channeldatafilter)
                  this.next(1)
                let codes= this.valueData.filter(e=>{
                    if(e.text === this.selectValue){
                        return e.code
                    }
                })
                // console.log(" Filter Event",codes)
                this.cityDataDrp = [];
                this.selectValue === codes[0].text ? this.showCityDrop = true : '';
                this.GETCITY(codes[0].code,resp=>{
                    // console.log("city ", resp[0].cities)
                    this.cityDataDrp = resp[0].cities
                })
            }
        },

        cityDropdown(city){
            // console.log('City Drop:>',city)
            console.log('this.filterby:>',this.filterby)
            console.log(' this.valueDrp:>', this.valueDrp)
            this.filterStruct = '';
            this.filterStruct = this.filterby +'|'+ this.valueDrp +'|'+ this.cityDrp
            console.log("Filter Struct ", this.filterStruct)
            this.GetAllLeadData(this.channeldatafilter)
        },

        next(e){ // console.log('Page Event', e)
                let skipdata = e - 1
                console.log('SKIPDATA',skipdata);
                var skipper = e
                if(skipdata === 0 ){
                    this.skip = 0
                }else{
                    this.skip = this.skipdiffrence*skipdata
                }
                console.log('Only data',this.skip)
                this.GetAllLeadData(this.channeldatafilter,this.skip)
                console.log("The counter is->", this.page);
                
                       // conditions for dynamic page records values with a difference of 15 per page limit,
                       // passing value to first with each increment in pagination
                this.first = this.skip;
                if(skipdata == (this.pageLength -1)){
                        this.differ = 0;
                        this.skip = this.tcount;
                        console.log('this.first',this.first);
                        console.log('From IF updated');
                }else{
                     this.differ = 15;
                    console.log('this.first',this.first);
                    console.log("NOT YET")
                }
                // AS the first pagination skip value is 0 and 15 start from second the first is being set to 1 as the skip  value passed was 0
                if(this.first == 0){
                        console.log('MAKE 1')
                        this.first = 1;
                 } 
                // this condition handles the count of the first value to start from one record after the previous skip value
                if(this.skip > 14){
                 this.first =  this.first + 1
                    console.log('Add ONE',  this.first + 1)
                
                }
                console.log('THESKIP is', this.skip);    
                
            },

           new(){
                    if(this.less){
                        this.differ= 0;
                        this.first = 1;
                        this.skip = this.tcount;
                    }else{
                           this.differ= 15;
                    }
            },

         GetAllLeadData(e,skip){
            console.log('get all get e  = >> '+ e);
            this.skipfilterdata = skip
            this.channeldatafilter = e
            console.log("User Id",this.getAgentInfo()._id)
            // console.log("Filter Structure",this.filterStruct)

             let FILTER_API ='getagent_alllead/'+this.getAgentInfo()._id;
            // console.log('fiLT STRUCT',this.filterStruct)

            if(this.channeldatafilter === 'all'){
                if (Object.keys(this.filterStruct).length === 0) {
                    this.leadListData = [];
                    FILTER_API = FILTER_API+'?skip='+skip;
                    console.log(" TRUE Filter Api RESPONSE",FILTER_API)
                } else {
                    this.leadListData = [];
                    FILTER_API = FILTER_API+'?skip='+skip+'&filterBy='+this.filterStruct;
                    console.log(" False Filter Api RESPONSE",FILTER_API)
                }
            } else {
                if (Object.keys(this.filterStruct).length === 0) {
                    this.leadListData = [];
                    FILTER_API = FILTER_API+'?channelCode='+e +'&skip='+skip;
                    console.log(" True CHannel Filter",FILTER_API)
                } else {
                    this.leadListData = [];
                    FILTER_API = FILTER_API+'?channelCode='+e +'&skip='+skip+'&filterBy='+this.filterStruct;
                    console.log("False CHannel Filter",FILTER_API)
                }
            }

            this.GETUSER(FILTER_API,res => {
                    if(res.data.errCode === -1){
                    this.errormsg = res.data.errMsg

                    console.log('GET Lead REPONSE OF LEAD',this.errormsg)
                    this.leadDetailsallList = res.data.errMsg[0]
                    // console.log('GET LEAD ID>',this.leadDetailsallList)

                    for(var i =0 ;i< this.leadDetailsallList.length;i++){
                        this.dbStruct = {};
                        // this.leadListData = [];
                        this.dbStruct.name = this.checkValidity(this.leadDetailsallList[i].firstName) + ' ' + this.checkValidity(this.leadDetailsallList[i].lastName)
                        // console.log('NAME >',this.dbStruct.name)
                        this.dbStruct.selected = false;
                        this.dbStruct.leadSource = this.leadDetailsallList[i].leadSource === null  ? '-' : this.leadDetailsallList[i].leadSource.name
                        this.dbStruct.primaryMobile = this.checkValidity(this.leadDetailsallList[i].primaryMobile)
                        this.dbStruct.email = this.checkValidity(this.leadDetailsallList[i].email)
                        this.dbStruct.state = this.checkValidity(this.leadDetailsallList[i].state)
                        this.dbStruct._id = this.checkValidity(this.leadDetailsallList[i]._id)
                        this.dbStruct.city = this.checkValidity(this.leadDetailsallList[i].city)
                        this.dbStruct.statusProductType =this.checkValidity(this.leadDetailsallList[i].statusProductType)
                        this.dbStruct.leadStatus = this.checkValidity(this.leadDetailsallList[i].leadStatus)
                        if( this.dbStruct.leadStatus == 'converted'){
                             this.dbStruct.vis = 'hidden';
                        }else{
                             this.dbStruct.vis = 'visible';
                        }
                        // console.log("VIS is->", this.dbStruct.vis);
                        this.dbStruct.camapignName = this.leadDetailsallList[i].camapignName === null ? '-' : this.leadDetailsallList[i].camapignName.name
                        this.dbStruct.affiliateMasterId = this.leadDetailsallList[i].affiliateMasterId === null ? '-' : this.leadDetailsallList[i].affiliateMasterId.name
                        this.dbStruct.leadDisposition = this.checkValidity(this.leadDetailsallList[i].leadDisposition)
                        this.dbStruct.leadsubDisposition = this.checkValidity(this.leadDetailsallList[i].leadsubDisposition)
                        this.dbStruct.start_date = this.checkValidity(this.leadDetailsallList[i].start_date)
                        this.dbStruct.start_time = this.checkValidity(this.leadDetailsallList[i].start_time)
                        console.log("Start_date->",this.dbStruct.start_date + "DATE"+this.dbStruct.start_time);
                        this.dbStruct.Agent_primary_email = this.leadDetailsallList[i].userId  === null ? '-' : this.leadDetailsallList[i].userId.primary_email
                        this.dbStruct.reminder = this.checkValidity(this.leadDetailsallList[i].reminder)
                        this.dbStruct.remarksfromSource = this.checkValidity(this.leadDetailsallList[i].remarksfromSource)
                        this.dbStruct.remarksfromUser = this.checkValidity(this.leadDetailsallList[i].remarksfromUser)
                        this.dbStruct.channelname = this.leadDetailsallList[i].channelCode  === null  ? '-' : this.leadDetailsallList[i].channelCode.channelName

                        this.leadListData.push(this.dbStruct)
                        this.second = this.leadListData.length
                      
                        // console.log('LEAD LIST: >',this.leadListData) 
                    }

                    var pageLen = res.data.errMsg[1]
                    console.log('LEAD pageLen: >',pageLen)
                    let totalCount = pageLen[0].totalCount
                    this.tcount = totalCount;
                    if(this.tcount == 0){
                        this.norecords = true
                    }else{
                        this.norecords = false
                    }

                    if(this.tcount < 15){
                        this.less = true;
                        this.new()
                    }else{
                         this.less = false;
                    }


                    // console.log('Page Length:',totalCount)
                    // console.log('Skip Diff Length:',this.skipdiffrence)
                    this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                    // console.log('PAGE LEN->', this.pageLength);
                    // console.log("The data to populate",this.leadDetailsallList);
               }
               }
           )
         },

         checkValidity(data) {
                // console.log('Validity Data', data);
                if (data == "" || data == "undefined" || data == null || data == '' || data == 'Invalid Date') {
                    return "-"
                } else {
                    return data;
                }
            },
            Searchdatatable (e) {
                console.log("e data",e)
                this.value = e;
            },
            searchAgentData(search){
                console.log("Search Text",search)
                this.searchAgent = search
            },
            goNext(){
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

                const formData={
                leadInJson:this.bulkData
            }

            // axios.post(this.API_Service_admin()+'bulk_upload/5c860e5ce7b9540e5da5fcfb',formData).then(
                this.POST('bulk_upload/'+this.getAgentInfo()._id, formData,res=>{
                if(res.data.errCode==-1)
                {
                    this.showToast('File uploaded successfully', this.TOST().SUCCESS);
                    this.steps = 2
                    this.sucessCount = res.data.errMsg.success
                    this.failCount = res.data.errMsg.failed
                    this.errorLink = res.data.errMsg.link
                }
                else
                {
                    this.showToast('Error while uploading lead Data', this.TOST().ERROR);
                }
            })
        },
                cancelStepper(){
                    this.dialogBulkUpld = false
                    this.channeldatafilter = 'all'
                    this.GetAllLeadData(this.channeldatafilter);
                    this.steps =1
                },
                openwindow(){
                    let me =this
                    me.bulkData=[]
                    me.dialogBulkUpld = true
                    me.steps =1
                    me.sucessCount=0
                    me.failCount=0
                     me.excelfilename = ''
                    fileUpload = null

                    me.errorLink='Link Comes Here'
                    me.fileLink=''
                },
    jsonupload(e) {
            console.log("Event is",e)
            console.log('File Name======>>>',e.target.files[0].name)

            var me = this
            me.excelfilename= e.target.files[0].name
        //Reference the FileUpload element.
        fileUpload = document.getElementById("fileUpload");
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
                                me.showToast("This browser does not support HTML5.","error");
                            }
                        } else {

                            me.showToast("Please upload a valid Excel file.","error",);
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
                console.log(excelData);
                var lines=excelData.split("\n");

            var result = [];

            var headers=lines[0].split(",");
            console.log('Lines are',lines)

            for(var i=1;i<lines.length-1;i++){

                var obj = {};
                var currentline=lines[i].split(",");
                for(var j=0;j<currentline.length;j++){
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            console.log("JSON IS",result)
            this.showToast('File Uploaded Successfully','success')
            let Str = JSON.stringify(result)
            //   let StrParse = JSON.parse(Str)
            this.bulkData = Str
            },

    }

}
</script>

<style>

.singlealign{
        width: 130px; text-align: center; margin-bottom: 2px !important;
}

.wdmax{ padding: 0px 10px !important; }

.checkboxone{
    padding: 10px !important;
    padding-top: 12px !important;
}
  
.thebtn2{    
    display:flex;
    align-items:center; 
    justify-content:center;
     color:white;
     font-size:12px;
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
