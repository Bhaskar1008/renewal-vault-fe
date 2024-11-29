
<template>
    <v-app>
        <v-card>
            <v-layout row wrap >
                <v-card flat style="background-color:#FAFAFA; width:100%;">
                    <v-layout wrap justify-space-between class="pt-4 ml-3 mr-3 " color="#FAFAFA" >
                        <!-- <v-flex xs10 sm6 md2 style="display:flex;align-items:center">
                            <v-text class=" headline font-weight-bold">Customers Lists</v-text>
                        </v-flex> -->
                         <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                            <v-select v-model="channeldatafilter"
                                :items="channeldataall"
                                item-text="text"
                                item-value="value"
                                label="Channel"
                                @change="channelfilters">
                            </v-select>
                         </v-flex>

                         <v-flex></v-flex>

                        <v-btn  depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addCustomer()">
                            add Customer
                            <v-icon dark right>add_circle</v-icon>
                        </v-btn>

                        <v-menu transition="slide-y-transition" >
                            <v-btn  depressed medium slot="activator" color="secondary" @click="openwindow" class="white--text thebtn">
                                Bulk Upload
                                <v-icon dark right>publish</v-icon>
                            </v-btn>
                        </v-menu>
                        <v-flex xs10 sm6 md2 class="ml-2">
                            <v-text-field  @input="Searchdatatable" v-model="value" label="Search"  append-icon="search" height="30px"></v-text-field>
                        </v-flex>

                    </v-layout>
                </v-card>
                <div>  <hr></div>

            <v-flex class="ml-3 mr-3 mt-3" style="flex-flow:column wrap;width:100%;">
            <v-layout>
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
                        @change="valueDropdown">
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
            </v-layout>

            <v-layout row  justify-space-between class="mr-5 mt-3 ">
                <v-flex>
                    <v-dialog v-model="dialog" persistent max-width="800px">
                        <v-card>
                            <v-flex style="background-color:#3a3a3a">
                                <v-card-title class="subheading" style="color:white" >{{btnname}} Customer</v-card-title>
                            </v-flex>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-form v-model="valid" ref="form">
                                        <v-layout wrap>
                                            <v-flex xs12 sm6 md6>
                                                <v-select v-model="customerformdata.channelName"
                                                :rules="[() => !!customerformdata.channelName || 'This field is required']"
                                                required
                                                :readonly="channeledit"
                                                label="Channel Name*" :items="channeldata" item-text="text" item-value="value"></v-select>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="customerformdata.clientId"
                                                :rules="clientIdValid"
                                                required
                                                label="Client ID*"
                                                @input="call_validation(customerformdata.clientId , 'clientId')"
                                                ></v-text-field>
                                                <!-- v-model , type, 'fieldname' -->
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                :rules="salutationValid"
                                                @input="call_validation(customerformdata.salutation , 'salutation')"
                                                v-model="customerformdata.salutation"  label="Salutation"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                @input="call_validation(customerformdata.firstname, 'firstname')"
                                                v-model="customerformdata.firstname"
                                                :rules="fnameValid"
                                                required
                                                label="First Name*"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                :rules="midNameValid"
                                                @input="call_validation(customerformdata.middlename , 'middlename')"
                                                v-model="customerformdata.middlename"
                                                label="Middle Name"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                @input="call_validation(customerformdata.lastname , 'lastname')"
                                                v-model="customerformdata.lastname"
                                                :rules="lnameValid"
                                                required
                                                label="Last Name*"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                @input="call_validation(customerformdata.primarymobileno, 'primarymobileno')"
                                                v-model="customerformdata.primarymobileno"
                                                :rules="primNumValid"
                                                required
                                                mask="phone" label="Primary Phone Number*"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                :rules="secNumValid"
                                                @input="call_validation(customerformdata.secondarymobileno, 'secondarymobileno')"
                                                v-model="customerformdata.secondarymobileno" mask="phone" label="Secondary Phone Number"></v-text-field>
                                            </v-flex>
                                            <v-flex  xs12 sm6 md6>
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
                                                    v-model="customerformdata.Dob"
                                                    :rules="dobValid"
                                                    label="Date of Birth*"
                                                    persistent-hint
                                                    prepend-icon="event"

                                                    @blur="date = parseDate(customerformdata.Dob)"
                                                ></v-text-field>
                                                <v-date-picker  v-model="date" no-title @input="validAge"></v-date-picker>
                                            </v-menu>
                                            <p style="color:red;font-size:13px;opacity:0.8;position: absolute;bottom: 839px;">{{agetext}}</p>
                                            </v-flex>
                                            <v-flex  xs12 sm6 md6>
                                                <v-radio-group
                                                        :rules="[v => !!customerformdata.gender || 'This field is required']"
                                                        required
                                                        v-model="customerformdata.gender" row>
                                                    <v-radio

                                                        label="Male"
                                                        color="#00ACC1"
                                                        value="male"
                                                    ></v-radio>
                                                    <v-radio
                                                        label="Female"
                                                        color="#00ACC1"
                                                        value="female"
                                                    ></v-radio>
                                                </v-radio-group>
                                            </v-flex>

                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="customerformdata.EmailId"
                                                label="Email Address"
                                                :rules="emailValid"
                                                @input="call_validation(customerformdata.EmailId, 'emailID')"
                                                required
                                                ></v-text-field>
                                            </v-flex>

                                            <v-flex xs4 sm5 md6>
                                                <v-select
                                                :items="Nationalitydata"
                                                autocomplete
                                                color="#00ACC1"
                                                label="Nationality*"
                                                :rules="[v => !!customerformdata.nationality || 'This field is required']"
                                                required
                                                v-model="customerformdata.nationality"
                                                ></v-select>
                                                <!-- :rules="[v => !!customerformdata.nationality || 'This field is required']" -->

                                            </v-flex>
                                            <v-flex xs4 sm5 md6>
                                                <v-select
                                                :items="StateListdata"
                                                autocomplete
                                                color="#00ACC1"
                                                label="State*"
                                                :rules="[v => !!customerformdata.state || 'This field is required']"
                                                required
                                                v-model="customerformdata.state"
                                                @change="cityfind"
                                                item-text="text"
                                                ></v-select>

                                            </v-flex>
                                            <v-flex xs4 sm5 md6>
                                                <v-select
                                                :items="Citylist"
                                                autocomplete
                                                color="#00ACC1"
                                                label="City*"
                                                :rules="[v => !!customerformdata.city || 'This field is required']"
                                                required
                                                v-model="customerformdata.city"
                                                item-text="name"
                                                ></v-select>

                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                @input="call_validation(customerformdata.Address1, 'Address1')"
                                                v-model="customerformdata.Address1"
                                                :rules="add1Validate"
                                                required
                                                label="Address 1*"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                :rules="add2Validate"
                                                @input="call_validation(customerformdata.Address2, 'Address2')"
                                                v-model="customerformdata.Address2"  label="Address 2"></v-text-field>
                                            </v-flex>
                                            
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                    :rules="pinValidate"
                                                    @input="call_validation(customerformdata.pincode , 'pincode')"
                                                    v-model="customerformdata.pincode" type="number" label="Pin code">
                                                </v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                :rules="incomeValidate"
                                                @input="call_validation(customerformdata.income, 'income')"
                                                v-model="customerformdata.income" type="number" label="income"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="customerformdata.noofchildren" type="number" label="No of Children"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="customerformdata.professiontype"  label="Profession Type"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-select :items="OccupationList" item-text="text"
                                                :rules="[v => !!customerformdata.occuepationcode || 'This field is required']"
                                                required
                                                item-value="value" v-model="customerformdata.occuepationcode"  label="Occupation Code*"></v-select>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                
                                                @input="call_validation(customerformdata.nomineename1 , 'nomineename1')"
                                                v-model="customerformdata.nomineename1"  label="Nominee 1 Name"></v-text-field>
                                            </v-flex>
                                            <v-flex  xs12 sm6 md6>
                                                <v-menu
                                                    ref="calender"
                                                    :close-on-content-click="false"
                                                    v-model="calender1"
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
                                                    v-model="customerformdata.nominee1dob"
                                                    label="Nominee 1 Dob"
                                                    persistent-hint
                                                    prepend-icon="event"
                                                    @blur="date1 = parseDate(customerformdata.nominee1dob)"
                                                ></v-text-field>
                                                <v-date-picker v-model="date1" no-title @input="calender1 = false"></v-date-picker>
                                                </v-menu>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                :rules="nom2Validate"
                                                @input="call_validation(customerformdata.nomineename2 , 'nomineename2')"
                                                v-model="customerformdata.nomineename2"  label="Nominee 2 Name"></v-text-field>
                                            </v-flex>
                                            <v-flex  xs12 sm6 md6>
                                                <v-menu
                                                    ref="calender"
                                                    :close-on-content-click="false"
                                                    v-model="calender2"
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
                                                        v-model="customerformdata.nominee2dob"
                                                        label="Nominee 2 Dob"
                                                        persistent-hint
                                                        prepend-icon="event"
                                                        @blur="date2 = parseDate(customerformdata.nominee2dob)"
                                                    ></v-text-field>
                                                    <v-date-picker v-model="date2" no-title @input="calender2 = false"></v-date-picker>
                                                </v-menu>
                                            </v-flex>
                                            <v-flex xs4 sm5 md6>
                                                <v-select
                                                :items="martialList"
                                                color="#00ACC1"
                                                label="Martial Status"

                                                v-model="customerformdata.martialstatus"
                                                item-text="text"
                                                item-value="value"
                                                ></v-select>

                                            </v-flex>
                                            <!-- :rules="[v => !!customerformdata.recompdt1 || 'This field is required']" -->
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field 
                                                    :rules="prodName1Validate"
                                                    v-model="customerformdata.recompdt1"
                                                    required
                                                    @input="call_validation(customerformdata.recompdt1 , 'recompdt1')"
                                                    label="Product Name 1 ">
                                                </v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                :rules="prodName2Validate"
                                                @input="call_validation(customerformdata.recompdte , 'recompdte')"
                                                v-model="customerformdata.recompdte"  label="Product Name 2 "></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6 v-if="oneditonly">
                                                <v-text-field
                                                :rules="appIdValidate"
                                                @input="call_validation(customerformdata.applicationcode , 'applicationcode')"
                                                readonly  v-model="customerformdata.applicationcode"
                                                label="Application ID"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field
                                                :rules="empIdValidate"
                                                @input="call_validation(customerformdata.Allocatetoagent , 'Allocatetoagent')"
                                                v-model="customerformdata.Allocatetoagent"  label="Employee ID"></v-text-field>
                                            </v-flex>
                                            <!-- <v-flex xs4 sm5 md6>
                                                <v-select
                                                :items="Allocatetoagentlist"
                                                color="#00ACC1"
                                                label="Allocate To Agent"
                                                required
                                                v-model="customerformdata.Allocatetoagent"
                                                item-text="text"
                                                item-value="value"
                                                ></v-select>

                                            </v-flex> -->



                                        </v-layout>
                                    </v-form>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn depressed large color="grey lighten-3" @click.native="dialog=false">Cancel
                                    <v-icon right dark>highlight_off</v-icon>
                                </v-btn>
                                <v-btn depressed large color="secondary" @click.native="CustomerAddPut">{{btnname}}
                                    <v-icon dark right>check_circle</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-flex>
            </v-layout>


                    <v-layout >
                        <v-layout wrap mt-3 ml-3 align-center>
                            <v-flex xs5>
                                <span class="font-weight-bold body-2">Showing 1 to 25 out of 2182</span>
                            </v-flex>
                            <v-flex xs4 @click="resetCustFilters">
                                <v-btn round small class="white--text thebtn2" color="#1976D2">Reset filters</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-layout wrap mt-3 ml-3 align-center justify-end xs0>
                            <v-flex xs2>
                                <span class="font-weight-bold body-2">{{custIDLen}} items selected</span>
                            </v-flex>
                            <v-flex xs3 @click="removeSelection">
                                <v-btn round small  class="white--text thebtn2" color="#1976D2">Remove Selection</v-btn>
                            </v-flex>

                        <v-flex xs3>
                            <v-flex xs9 text-sm-center>
                                <span class="font-weight-medium body-1">Allocate</span>
                            </v-flex>
                            <div class="aloc-btn">

                                <v-flex xs4 text-sm-center>
                                    
                                    <v-btn  @click="manualAlloc = true" small  fab dark color="secondary" v-if="showManual === true">
                                  
                                        <v-img src="../../../web/assets/Group2818.png" style="height:30px;width:30px"></v-img>
                                    </v-btn>
                                    <v-btn small fab disabled v-else>
                                  
                                        <v-img src="../../../web/assets/Group2818.png" style="height:30px;width:30px"></v-img>
                                    </v-btn>
                                    <span class="font-weight-medium body-1">Manual</span>
                                </v-flex>
                                <!-- <v-flex xs4 text-sm-center>
                                    <v-btn @click="autoAlloc = true" small  fab dark color="primary">
                                       
                                        <v-img src="../../../web/assets/Group2819.png" style="height:30px;width:30px"></v-img>
                                    </v-btn>
                                     <span class="font-weight-medium body-1">Auto</span>
                                </v-flex> -->
                            </div>
                        </v-flex>

                        </v-layout>

                    </v-layout>

                    <v-flex justify-center md12 ml-3 mt-3 mr-5 mb-4>
                                    <h3 class="text-xs-center mb-3">Details</h3>
                                    <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="objmethod"
                                    hide-actions
                                    select-all
                                    item-key="_id"
                                    class="elevation-1">
                                    <template slot="headers" slot-scope="props" >
                                        <tr><th><v-checkbox v-model="headCheck" :input-value="props.all" :indeterminate="props.indeterminate" primary hide-details @change="toggleAll($event)"></v-checkbox>
                                        <!-- <p>{{props }}</p> -->
                                        </th>
                                        <!-- style="color:black" -->
                                        <th
                                            v-for="header in props.headers"
                                            :key="header.text"

                                            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                            @click="changeSort(header.value)"
                                        >
                                            <!-- <v-icon small>arrow_upward</v-icon> -->
                                            {{ header.text }}
                                        </th>
                                        </tr>
                                    </template>

                                    <template slot="items" slot-scope="props">
                                        <!-- <tr :active="props.selected" @click="props.selected = !props.selected"> -->
                                        <td>
                                            <v-checkbox v-model="props.item.selected" @change="custTableCheck(props.item.client_id, $event, props.index)" primary hide-details></v-checkbox>
                                        </td>
                                        <td class="">{{props.item.client_id}}</td>
                                        <td class="">{{props.item.customer_first_name}} </td>
                                        <td class="">{{props.item.customer_last_name}} </td>
                                        <td class="">{{props.item.primary_telephone}}</td>
                                        <td class="">{{props.item.email_id}}</td>
                                        <td class="">{{props.item.state_code}}</td>
                                        <td class="">{{props.item.city_code}}</td>
                                        <td class="">{{props.item.Agent_primary_email}}</td>

                                        <td>
                                            <v-icon small class="mr-2" style="cursor:pointer" @click="Editcustomer(props.item,props.index)">edit</v-icon>
                                            <!-- <v-icon small style="cursor:pointer" @click="deleteItem(props.item,props.index)">delete</v-icon> -->
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
                                     <span class="upload-text">UPLOAD FILE</span>
                                            <v-icon right dark>publish</v-icon>
                                    <input type="file"
                                    id="fileUpload"
                                    @change="jsonupload">
                                    </v-flex>
                                        <v-layout ml-3 column>
                                            <span v-if="excelfilename !== '' " class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">{{excelfilename}}</span>
                                            <span class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Supports xls/csv format.</span>
                                            <span class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Approx time to upload 2 mb file - 30 min.</span>
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
                                            <a href="https://image-upload-bucket-2019.s3.ap-south-1.amazonaws.com/89932ca78177ba90a2160ab2f421d700ca5e25df.xlsx" download>
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
                                            <span class="subheading font-weight-medium ml-3"> {{sucessCount}} Users  Data successfully Uploaded</span>
                                        </v-flex>

                                        <v-flex xs12 sm12 md12 mt-3 style="display:flex;align-items:center">
                                            <v-icon large color="error">highlight_off</v-icon>
                                            <span class="subheading font-weight-medium ml-3">Errors Found in {{failCount}}  Users Data</span>
                                        </v-flex>
                                        <v-flex mt-3>
                                            <span class="subheading font-weight-medium ml-1">Failed Data:</span>
                                            <a :href ="errorLink" download>{{errorLink}}</a>
                                        </v-flex>
                                    <v-card-actions style="justify-content:flex-end;">
                                    <v-layout mt-5 justify-space-between>
                                        <v-btn color="primary" @click="steps =1 " ><v-icon class="mr-2">arrow_back</v-icon>Previous</v-btn>
                                        <v-btn color="primary" @click="cancelStepper">Close <v-icon class="ml-2" size="20px">clear</v-icon></v-btn>
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
                                    <span class="caption font-weight-medium" style="color:#C62828">#Some of the selected leads do not have common ‘city’ value</span>
                                </v-flex>
                                <v-flex>
                                    <span class="caption font-weight-medium" style="color:#C62828">#Some of the selected leads are already allocated</span>
                                </v-flex>
                            </v-flex>

                            <v-layout>
                                <v-flex xs3>
                                    <v-flex >
                                        <v-select v-model="channelpop" @change="getPopChannel"  :items="channeldata" item-text="text"  label="Channel Name"></v-select>
                                    </v-flex>
                                    <v-flex >
                                        <v-select v-model="statepop" @change="cityfind" :items="StateListdata" item-text="text"  label="State"></v-select>
                                    </v-flex>
                                    <v-flex >
                                        <v-select v-model="citypop" @change="cityData" :items="Citylist" item-text="asciiname"  label="City"></v-select>
                                    </v-flex>
                                    <v-flex >
                                        <v-select v-model="branchpop" :items="branchArray"  item-text="text"  label="Branch"></v-select>
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
                                            <span class="caption font-weight-medium" style="color:#90A4AE">Either select a branch or search for agent code</span>
                                        </v-flex>
                                        </v-flex>
                                    </v-flex>

                                    <v-flex v-if="showAlertext == true">
                                        <v-data-table
                                            ref="vTable"
                                            v-model="popTable"
                                            :headers="popHeader"
                                            :items="agentObj"
                                            hide-actions
                                            :pagination.sync="pagination"
                                            item-key="_id"
                                            class="elevation-1" >

                                            <template slot="items" slot-scope="props">
                                                <td >
                                                    <!-- <v-checkbox v-model="props.popTable" @change="agentTable(props.item._id,$event)" primary hide-details></v-checkbox> -->
                                                    <v-radio-group v-model="radios" row>
                                                        <v-radio :value="props.item._id" @change="agentTable(props.item._id,$event)" ></v-radio>
                                                    </v-radio-group>
                                                </td>
                                                <td class="">{{props.item.first_name}}</td>
                                                <td class="">{{props.item.last_name}}</td>
                                                <td class="">{{props.item._id}}</td>
                                                <td class="">{{props.item.reporting_manager.first_name}}</td>
                                                <td class=""><span :style="{color: props.item.leadpopStatus == 'Active' ? '#13961c' : '#d61111'}" >{{props.item.leadpopStatus}} </span></td>
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
                                             <v-btn round small color="primary" v-if="showAllocateBtn === true" @click="allocateLeads">
                                                Allocate
                                            </v-btn>
                                            <v-btn round small disabled color="primary"  v-else>
                                                Allocate
                                            </v-btn>
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
                            <span class="body-1 font-weight-bold" style="color:#0277BD">Allocating...</span>
                        </v-flex>
                        <v-flex text-sm-center mt-2 mb-4>
                            <span class="body-1 font-weight-bold">25 leads from 6 cities to agents in 6 branches</span>
                        </v-flex>

                        <v-card-actions style="justify-content:space-between">
                            <!-- <v-spacer></v-spacer> -->
                            <v-btn small round color="primary" @click="autoAlloc = false">
                                Undo Process
                            </v-btn>
                            <v-btn small round color="primary" @click="autoAlloc = false">
                                finish
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
        </v-card>
    </v-app>
</template>
<script>
import axios from 'axios'
import loadChannel from '../common/onProjectLoad.js'
import moment from 'moment'

const Nationalitydata = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]
//  const StateList = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
// "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
// "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh",
// "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman & Diu", "Delhi", "Lakshadweep", "Puducherry"]
// const Citylist = ["Mumbai","Kanpur","Lucknow","Banglore","Patna","Bhopal","Allahabad","Ahmadabad"]
const martialList = [{text:'Single',value:'single'},{text:'Married',value:'married'},{text:'Divorced',value:'divorced'},{text:'Widowed',value:'widowed'}]
const salutationList = ["Mr","Mrs"]
var fileUpload = null

export default {

    filters: {

       formateDate(milisecond) {
           try {
               return new Date(parseInt(milisecond)).toLocaleDateString()
           } catch(err) {
               return milisecond;
           }
       }
   },
    created(){
        this.$store.commit('SET_PAGE_TITLE','Customers List');
        loadChannel.getChannel(this, res => {
            console.log("mixin channel data" ,  res)
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
        // this.channeldatafilter = 'all'
         this.GetAllLeadData(this.channeldatafilter,this.skip);
         this.getoccupation();

        //  console.log("wkrjwlekrjwl =>", this.$refs.vTable);
    },

    mounted(){
            this.customerformdata.clientId = this.generateRandomCode().toUpperCase();
             console.log("this.customerformdata.clientId " + this.customerformdata.clientId);

        this.GetAgentstate();
        this.getAgentCity();


    },
    data(){
        return{
            valid:false,
            chNameValid:[],
            dobValid:[],
            emailValid:[],
            clientIdValid:[],
            salutationValid:[],
            midNameValid:[],
            fnameValid:[],
            lnameValid:[],
            primNumValid:[],
            secNumValid:[],
            add1Validate:[],
            add2Validate:[],
            pinValidate:[],
            incomeValidate:[],
            nom1Validate:[],
            nom2Validate:[],
            prodName1Validate:[],
            prodName2Validate:[],
            appIdValidate:[],
            empIdValidate:[],
            channeledit:false,
            oneditonly:false,
            editedItem: {
                AffiliateName:'',
               firstn:'',
               lastn:'',

            },
            moment,
            steps: 0,
            Nationalitydata,
            // StateList,
            custID:[],
            agentSearch:'',
            agntStateList:[],
            agentCityList:[],
            branchArray:[],
            allAgents:[],
            custIDLen:'0',
            channelPopID:'',
            headCheck:'',
            radios:1,
            channelpop:'',
            statepop:'',
            citypop:'',
            branchpop:'',
            popTable:'',
            filterByData:'',
            agentpopStatus:'',
            valueData:[],
            showManual:false,
            showAllocateBtn:false,
            Citylist:[],
            cityDataDrp:[],
            showCityDrop:false,
            StateListdata:[],
            martialList,
            dialog:false,
            value:'',
            agetext:'',
            TableName:'',
            btnname:'',
            pageLength:0,
            page:1,
            skip:0,
            calender: false,
            date: null,
            calender1: false,
            date1: null,
            calender2: false,
            date2: null,
            CustomerId:'',
            allCheckSelect:'',
            OccupationList:[],
            salutationList,
            getState:{},
            customerformdata:{
                Dob:null,
                nominee1dob:null,
                nominee2dob:null,
                clientId:'',
                salutation:'',
                firstname:'',
                middlename:'',
                lastname:'',
                primarymobileno:'',
                secondarymobileno:'',
                gender:'',
                nationality:'India',
                EmailId:'',
                Address1:'',
                Address2:'',
                state:'',
                city:'',
                pincode:'',
                income:'',
                noofchildren:'',
                professiontype:'',
                occuepationcode:'',
                nomineename1:'',
                nomineename2:'',
                martialstatus:'',
                Allocatetoagent:'',
                recompdt1:'',
                recompdt2:'',
                channelName:'',
                proposalId:'',
                applicationcode:'',
            },
            skipdiffrence:this.paginationdiff(),
            channeldatafilter:'all',
            channeldataall:[],
            channeldata:[],
            selected: [],
            manualAlloc:false,
            autoAlloc:false,
            showAlertext:false,
            pagination:{},

            bulkData:[],
            sucessCount:0,
            failCount:0,
            errorLink:'Link Comes Here',
            fileLink:'',
            excelfilename:'',
            dialogBulkUpld:false,
            customerdataList:[],
            filterby:'',
            filterStruct:'',
            valueDrp:'',
            cityDrp:'',
            custListData:[],
            custdbStruct:{
                client_id :'',
                customer_first_name:'',
                customer_last_name:'',
                primary_telephone:'',
                email_id:'',
                state_code:'',
                city_code:'',
                Agent_primary_email:'',
                fullobj:[]

            },
            allocatedlist:[
                {text: 'Allocated', value: 'allocated'},
                {text: 'Un Allocated', value: 'unallocated'}

            ],
            filterList:[
                    // {text: 'Status', value: 'status'},
                    // {text: 'Source', value: 'source'},
                    // {text: 'Campaign', value: 'campaign'},
                    // {text: 'Affiliate', value: 'affiliate'},
                    {text: 'State', value: 'state'},
                    // {text: 'City', value: 'city'},
                    {text: 'Is Allocated', value: 'isallocated'},
                ],
            headers:[
                        {text: 'Customer ID', value: 'customerid'},
                        {text: 'First Name', value: 'fname'},
                        {text: 'Last Name', value: 'lname'},
                        {text: 'Primary Contact', value: 'contact'},
                        {text: 'E-mail', value: 'mail'},
                        {text: 'State', value: 'state'},
                        {text: 'City', value: 'city'},
                        {text: 'Allocated to', value: 'allocated'},
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
        }
    },
    computed:{
        // clientIdValid(){
        //     // value.match(nameRegex)
        //     return [
        //         v => !!v || 'This field is required',
        //         v => v.match(/^[A-Za-z0-9 ]+$/) || 'Only alphabets are allowed'
        //     ]
        // },
        objmethod() {
            var self=this;
            if (Array.isArray(this.custListData)) {
            return this.custListData.filter(function(cust){return cust.client_id.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.primary_telephone.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.customer_first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.customer_last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.email_id.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.state_code.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.city_code.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.Agent_primary_email.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            });
            }
        },
        pages () {
            if (this.pagination.rowsPerPage == null ||
                this.pagination.totalItems == null
            ) return 0

            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },

        agentObj(){
            var self=this;
            if (Array.isArray(this.allAgents)) {
                return this.allAgents.filter(function(agent){
                //    console.log('Filter Lead', agent)
                return agent.first_name.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >=0
                || agent.last_name.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >=0
                || agent._id.toString().toLowerCase().indexOf(self.agentSearch.toLowerCase()) >=0
                || agent.reporting_manager.first_name.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >=0
                || agent.leadpopStatus.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >=0
                || agent.city.toLowerCase().indexOf(self.agentSearch.toLowerCase()) >=0

            });

            }
        }

    },
    watch: {
        date (val) {
            this.customerformdata.Dob = this.formatDate(this.date)
        },
        date1 (val) {
            this.customerformdata.nominee1dob = this.formatDate(this.date1)
        },
        date2 (val) {
            this.customerformdata.nominee2dob = this.formatDate(this.date2)
        }
    },
    methods:{
        call_validation(value,fieldName){
            var self = this
            try{
                // console.log('Club_FIELDS)=>',value)
                let nameRegex =/^[A-Za-z0-9 ]+$/;
                let numRegex =/^[0-9 ]+$/;
                
                if(fieldName == 'clientId'){
                    this.clientIdValid = []
                    value === '' ? this.clientIdValid.push('This field is required') : ''
                    value.match(nameRegex) ? this.clientIdValid.push() : this.clientIdValid.push('Only alphabets are allowed')

                }else if(fieldName == 'salutation'){
                    this.salutationValid = []
                    // value === '' ? this.salutationValid.push('This field is required') : ''
                    value.match(/^[A-Za-z. ]+$/) ? this.salutationValid.push() : this.salutationValid.push('Only alphabets are allowed')

                }else if(fieldName == 'firstname'){
                    this.fnameValid = []
                    value === '' ? this.fnameValid.push('This field is required') : ''
                    value.match(nameRegex) ? this.fnameValid.push() : this.fnameValid.push('Only alphabets are allowed')

                }else if(fieldName == 'middlename'){
                    this.midNameValid = []
                    value === '' ? this.midNameValid.push() : ''
                    value.match(nameRegex) ? this.midNameValid.push() : this.midNameValid.push('Only alphabets are allowed')

                }else if(fieldName == 'lastname'){
                    this.lnameValid = []
                    value === '' ? this.lnameValid.push('This field is required') : ''
                    value.match(nameRegex) ? this.lnameValid.push() : this.lnameValid.push('Only alphabets are allowed')

                }else if(fieldName == 'primarymobileno'){
                    this.primNumValid = []
                    value === '' ? this.primNumValid.push('This field is required') : ''
                    value.match(numRegex) ? this.primNumValid.push() : this.primNumValid.push('Only numbers are allowed')

                }else if(fieldName == 'secondarymobileno'){
                    this.secNumValid = []
                    value === '' ? this.secNumValid.push() : ''
                    value.match(numRegex) ? this.secNumValid.push() : this.secNumValid.push('Only numbers are allowed')

                }else if(fieldName == 'Address1'){
                    this.add1Validate = []
                    value === '' ? this.add1Validate.push('This field is required') : ''
                    value.match(/^[A-Za-z0-9.,()/ -]+$/) ? this.add1Validate.push() : this.add1Validate.push('Only numbers are allowed')

                }else if(fieldName == 'Address2'){
                    this.add2Validate = []
                    value === '' ? this.add2Validate.push() : ''
                    value.match(/^[A-Za-z0-9.,()/ -]+$/) ? this.add2Validate.push() : this.add2Validate.push('Only numbers are allowed')

                }else if(fieldName == 'pincode'){
                    this.pinValidate = []
                    value === '' ? this.pinValidate.push() : ''
                    value.match(numRegex) ? this.pinValidate.push() : this.pinValidate.push('Only numbers are allowed')

                }else if(fieldName == 'income'){
                    this.incomeValidate = []
                    value === '' ? this.incomeValidate.push() : ''
                    value.match(numRegex) ? this.incomeValidate.push() : this.incomeValidate.push('Only numbers are allowed')

                }else if(fieldName == 'nomineename1'){
                    this.nom1Validate = []
                    value === '' ? this.nom1Validate.push() : ''
                    value.match(nameRegex) ? this.nom1Validate.push() : this.nom1Validate.push('Only alphabets are allowed')

                }else if(fieldName == 'nomineename2'){
                    this.nom2Validate = []
                    value === '' ? this.nom2Validate.push() : ''
                    value.match(nameRegex) ? this.nom2Validate.push() : this.nom2Validate.push('Only alphabets are allowed')

                }else if(fieldName == 'recompdt1'){
                    this.prodName1Validate = []
                    value === '' ? this.prodName1Validate.push() : ''
                    value.match(nameRegex) ? this.prodName1Validate.push() : this.prodName1Validate.push('Only alphabets are allowed')

                }else if(fieldName == 'recompdte'){
                    this.prodName2Validate = []
                    value === '' ? this.prodName2Validate.push() : ''
                    value.match(nameRegex) ? this.prodName2Validate.push() : this.prodName2Validate.push('Only alphabets are allowed')

                }else if(fieldName == 'applicationcode'){
                    this.appIdValidate = []
                    value === '' ? this.appIdValidate.push() : ''
                    value.match(nameRegex) ? this.appIdValidate.push() : this.appIdValidate.push('Only alphabets and numbers are allowed')

                }else if(fieldName == 'Allocatetoagent'){
                    this.empIdValidate = []
                    value === '' ? this.empIdValidate.push() : ''
                    value.match(nameRegex) ? this.empIdValidate.push() : this.empIdValidate.push('Only alphabets and numbers are allowed')

                }else if(fieldName == 'emailID'){
                    this.emailValid = []
                    value === '' ? this.emailValid.push() : ''
                    value.match( /.+@.+/) ? this.emailValid.push() : this.emailValid.push('Enter a valid E-mail')

                }
                
            }catch(err){}
            // this.validate_alpha_numeric(data, type, (res, datanew)=>{
            //     if(res == true){
            //         self.customerformdata[field] =  datanew
            //         self.$forceUpdate();
            //         return
            //     }
            // })
        },

        resetCustFilters(){
            this.channeldatafilter = 'all';
            this.filterby = '';
            this.valueDrp = '';
            this.cityDrp = '';
            this.filterStruct = '';
            this.GetAllLeadData()
        },

        removeSelection(){
            this.custID = [];
            this.custIDLen = '0';
            // this.selected = []
            this.headCheck = false
            this.custID = [];
            // console.log('custListData',this.custListData)
            for(let i=0;i<this.custListData.length;i++){
                this.custListData[i].selected = false
            }
            this.showManual = false;
        },

        // @Change Event function for Popup Channel Dropdown List @author:Salman Shaikh
        getPopChannel(event){
            console.log('Channel Event::',event)
            this.channelPopID = event;
            // this.getAllAgents(this.channelPopID)
        },

        // @Change Event function for Popup Table's Radio buttons for Agents @author:Salman Shaikh
        agentTable(_id,event){
            // console.log('EVENT>>',event)
            console.log('_ID>>',_id)
            this.AgentID = _id;
            this.popTable = ''
            this.showAllocateBtn = true

        },

        GetAgentstate(){
            this.GETSTATE(res=>{
                console.log("State",res)
                this.getState = res;
                for(let i =0;i<this.getState.length;i++){
                    let statedata={
                        text:this.getState[i].region_data.name,
                        code:this.getState[i].region_data.adminCode1
                    }
                    this.StateListdata.push(statedata)
                }

            })
            console.log(this.StateListdata,"response mixin data")
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
        cityData(event){
            // console.log("City event ", event)
            // console.log("city :>>", this.citypop)
            // console.log("State :>>", this.statepop)
            this.GET('getbranch?branchfilter=All&created_by='+this.$store.state.agentDetails._id+'&skip=0&user_city='+this.citypop+'&user_state='+this.statepop,res => {
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

        getAllAgents(){
            // console.log("city :>>", this.citypop)
            // console.log("State :>>", this.statepop)
            // console.log("Channel :>>", this.channelPopID)

            this.popTable = '';
            // this.agntObj = [];
            this.showAllocateBtn = false;
            if(this.popState !== ''){
                this.GET('getallAgent?user_id='+this.$store.state.agentDetails._id+'&channelCode='+this.channelPopID+'&skip=0&user_state='+this.statepop+'&user_city='+this.citypop+ '&user_branch=' + this.branchpop, res => {

                   res.data.errMsg[0].forEach( element => {
                        element.agentpopStatus = '';
                    });

                    console.log('All AGENT Resp',res.data.errMsg[0])
                    this.allAgents = res.data.errMsg[0]
                    this.showAlertext = true

                    for(var i =0;i< this.allAgents.length;i++){
                         if(this.allAgents[i].active === 1){
                            this.allAgents[i].agentpopStatus = 'Active'
                        }else if(this.allAgents[i].active === 0){
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

            for(let i = 0;i < this.customerdataList.length; i++) {
                if(user_ID === this.customerdataList[i].client_id){
                    if (bool) {
                            this.custID.push({_id:this.customerdataList[i]._id}); // push the Id in array if checked
                             this.showManual = true;
                             this.headCheck = true
                             console.log('Cust ID True',this.custID)
                        } else {
                            const index = this.custID.findIndex(list => list.client_id == user_ID);//Find the index of stored id
                            this.custID.splice(index, 1); // Then remove
                            console.log('Cust ID False',this.custID)
                            if(this.custID.length === 0){
                                this.showManual = false
                                this.headCheck = false
                            }
                        }
                    }
            }

            // this.custIDLen = this.custID.length
            // console.log('Cust ID LEn',this.custIDLen)



        },

        allocateLeads(){
            var allocID =  this.custID
            console.log('Ag ID>>',this.AgentID)
            console.log('agent SelctId:>',allocID )
            // console.log('agentId:>',this.AgentID )
            if(allocID.length !== 0){
                const manualLeadId ={
                userId: this.$store.state.agentDetails._id,
                Allocated_user_id:this.AgentID,
                customer_ids:allocID,
             }
             this.POST('manualAllocation_customer',manualLeadId,res => {
                    var affiliateData = res.data.errMsg
                    console.log('manual Alloc:>>',res.data.errMsg)
                    }
                )
            }
             this.showToast('Leads Allocated Successfully','success')

        },

        filterBY(e){
            console.log('Filters>>',e)

            if(e === 'state'){
                this.filterByData = e;
                this.valueData = [];
                for(let i =0;i<this.getState.length;i++){
                    let value={
                        text:this.getState[i].region_data.name,
                        code:this.getState[i].region_data.adminCode1
                    }
                    this.valueData.push(value);
                    // console.log('VAlue Data State',this.valueData)
                }
            }else if(e === 'isallocated'){
                this.filterByData = e;
                this.valueData =[];
                this.showCityDrop = false
                console.log("allocatged list",this.allocatedlist)
                for(let i = 0; i< this.allocatedlist.length; i++){
                     let value ={
                        text:this.allocatedlist[i].text,
                        value:this.allocatedlist[i].value
                    }
                    this.valueData.push(value);
                    // console.log('VAlue Data Allocate',this.valueData)
                }
            }
        },

        valueDropdown(event){
            console.log('VAlue Event:>',event)
            console.log("filterByData ", this.filterByData)

            this.filterStruct = '';
            if(this.filterByData !== 'state'){
                this.filterStruct = this.filterby +'|'+ this.valueDrp;
                console.log("Filter Struct ", this.filterStruct)
                this.GetAllLeadData(this.channeldatafilter,this.skip);
            }else{
                this.filterStruct = '';
                this.filterStruct = this.filterby +'|'+ this.valueDrp
                console.log("Filter Struct ", this.filterStruct)

                this.GetAllLeadData(this.channeldatafilter,this.skip)
                let codes= this.valueData.filter(e=>{
                    if(e.text === event){
                        return e.code
                    }
                })
                // console.log(" before if Event",event)
                this.cityDataDrp
                event === codes[0].text ? this.showCityDrop = true : '';
                this.GETCITY(codes[0].code,resp=>{
                    // console.log("city ", resp[0].cities)
                    this.cityDataDrp = resp[0].cities
                })
            }

        },

        cityDropdown(e){
            console.log('CITY DROP Event:>',e)
            this.filterStruct = '';
            this.filterStruct = this.filterby +'|'+ this.valueDrp +'|'+ this.cityDrp
            console.log("Filter Struct ", this.filterStruct)
            this.GetAllLeadData(this.channeldatafilter,this.skip)
        },

        addCustomer(){
            this.oneditonly = false;
            this.channeledit = false;
            this.btnname = 'Add';
            this.customerformdata.clientId='',
            this.customerformdata.salutation='',
            this.customerformdata.firstname='',
            this.customerformdata.middlename='',
            this.customerformdata.lastname='',
            this.customerformdata.primarymobileno='',
            this.customerformdata.secondarymobileno='',
            this.customerformdata.gender='',
            this.customerformdata.nationality='India',
            this.customerformdata.EmailId='',
            this.customerformdata.Address1='',
            this.customerformdata.Address2='',
            this.customerformdata.state='',
            this.customerformdata.city='',
            this.customerformdata.pincode='',
            this.customerformdata.income='',
            this.customerformdata.noofchildren='',
            this.customerformdata.professiontype='',
            this.customerformdata.occuepationcode='',
            this.customerformdata.nomineename1='',
            this.customerformdata.nomineename2='',
            this.customerformdata.martialstatus='',
            this.customerformdata.Allocatetoagent='',
            this.customerformdata.recompdt1='',
            this.customerformdata.recompdt2='',
            this.customerformdata.Dob=null,
            this.customerformdata.nominee1dob=null,
            this.customerformdata.nominee2dob=null,
            this.customerformdata.channelName ='',
            this.customerformdata.proposalId='',
            // console.log('channelName)=>>',this.customerformdata.channelName)
            // this.chNameValid = [ !!this.customerformdata.channelName || ''],
            this.$refs.form.reset()
            // this.dobValid = [],
            // this.emailValid = [],
            // this.clientIdValid = [],
            // this.salutationValid = [],
            // this.midNameValid = [],
            // this.fnameValid = [],
            // this.lnameValid = [],
            // this.primNumValid = [],
            // this.secNumValid = [],
            // this.add1Validate = [],
            // this.add2Validate = [],
            // this.pinValidate = [],
            // this.incomeValidate = [],
            // this.nom1Validate = [],
            // this.nom2Validate = [],
            // this.prodName1Validate = [],
            // this.prodName2Validate = [],
            // this.appIdValidate = [],
            // this.empIdValidate = [],
            this.dialog = true;
        },
        validAge(date){
            this.calender = false
            let datevalue = moment(date).valueOf()
             console.log('Date',datevalue)
             let currentdate=Date.now()
             let datesub = moment(currentdate).subtract(18, 'years').format('MM-DD-YYYY');
             console.log('Subtract year',datesub)
             let convertsub=moment(datesub).valueOf()
             if(datevalue >=  convertsub ){
                 console.log('Your Age is Not 18')
                 this.agetext ='You are less than 18 years'
             }else{
                  this.agetext = ''
             }


        },
        getoccupation(){
            this.GET('fetch_occupation?filter=0',resp=>{
                if(resp.data.errCode === -1){
                     let data=resp.data.errMsg[0];
                    for(let i=0;i<data.length;i++){
                        if(data[i].status === 1){
                            let Ocuupationdetails={
                                text:data[i].occupation,
                                value:data[i]._id,
                            }
                            this.OccupationList.push(Ocuupationdetails)
                        }
                    }
                     console.log("Occupation Data List",this.OccupationList)
                }
            })
        },
        CustomerAddPut(){
            if(this.btnname === 'Add'){
                this.AddcustomerPost()
            }else if(this.btnname === 'Update'){
                this.UPDATEcustomer();
            }
        },

        AddcustomerPost(){
            try{
                let self = this;

                if(self.customerformdata.channelName === '' || self.customerformdata.clientId === '' || self.customerformdata.firstname === ''
                    || self.customerformdata.lastname === ''|| self.customerformdata.primarymobileno === ''|| self.customerformdata.Dob === ''
                    || self.customerformdata.nationality === ''|| self.customerformdata.state === ''|| self.customerformdata.city === ''
                    || self.customerformdata.Address1 === ''|| self.customerformdata.occuepationcode === ''){
                    
                    self.showToast('Please, Add the required fields','warning'); 
                    self.$refs.form.validate() 
                    self.clientIdValid =  [ !!self.customerformdata.clientId || 'This field is required' ]
                    self.dobValid =  [ !!self.customerformdata.Dob || 'This field is required' ]
                    self.fnameValid = [ !!self.customerformdata.firstname || 'This field is required' ]
                    self.lnameValid = [ !!self.customerformdata.lastname || 'This field is required' ]
                    self.primNumValid = [ !!self.customerformdata.primarymobileno || 'This field is required' ]
                    self.add1Validate = [  !!self.customerformdata.Address1 || 'This field is required' ]
                    self.dialog = true; 

                }
                // else if(self.clientIdValid.length !== 0 || self.salutationValid.length !== 0 || self.midNameValid.length !== 0 || self.fnameValid.length !== 0 ||
                //     self.lnameValid.length !== 0 || self.primNumValid.length !== 0 || self.secNumValid.length !== 0 || self.add1Validate.length !== 0 || 
                //     self.add2Validate.length !== 0 || self.pinValidate.length !== 0 || self.incomeValidate.length !== 0 || self.nom1Validate.length !== 0 || 
                //     self.nom2Validate.length !== 0 || self.prodName1Validate.length !== 0 || self.prodName2Validate.length !== 0 || self.appIdValidate.length !== 0 || 
                //     self.empIdValidate.length !== 0){
                        
                //         self.showToast('Please, Insert the correct data','warning');  
                //         self.dialog = true; 
                // }
                else{
                   
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
                        userId: this.getAgentInfo()._id,
                    }

                    
                    this.POSTUSER('addCustomer', formdata, (res, error) => {
                        if (!error) {
                            if (res.data.errCode == -1) {
                                self.showToast('Customer Added Successfully', self.TOST().SUCCESS)
                                self.GetAllLeadData('all', self.skip);
                                self.dialog = false;
                            } else if (res.data.errCode === 1) {
                                self.showToast(res.data.errMsg, self.TOST().INFO)
                            } else if (res.data.errCode === 4) {
                                self.showToast(res.data.errMsg, self.TOST().ERROR)
                            } else if (res.data.errCode === 2500) {
                                self.showToast(res.data.errMsg, self.TOST().WARNING)
                            } else if (res.data.errCode === 2601) {
                                self.showToast(res.data.errMsg, self.TOST().INFO)
                            }else if(res.data.errCode === 11000){
                                self.showToast('Customer already exist', self.TOST().ERROR)
                            }
                        } else {
                            self.showToast('Something went Wrong', self.TOST().ERROR)
                        }
                    })
                }
            }catch(err){}
        },
        Editcustomer(item,index){
            console.log("The data to be eidted is =>", item)
            this.channeledit = true
            this.oneditonly = true;
                console.log(item,'edited items::::')
                this.dialog = true;
                this.btnname = 'Update';
                this.customerformdata.clientId =item.fullobj.client_id,
                this.customerformdata.salutation=item.fullobj.salutation,
                this.customerformdata.firstname=item.fullobj.customer_first_name,
                this.customerformdata.middlename=item.fullobj.customer_middle_name,
                this.customerformdata.lastname=item.fullobj.customer_last_name,
                this.customerformdata.gender=item.fullobj.gender,
                this.customerformdata.Dob=item.fullobj.date_of_birth,
                this.customerformdata.nationality=item.fullobj.nationality,
                this.customerformdata.primarymobileno=item.fullobj.primary_telephone,
                this.customerformdata.secondarymobileno=item.fullobj.secondary_telephone === null ? '' : item.fullobj.secondary_telephone,
                this.customerformdata.EmailId=item.fullobj.email_id,
                this.customerformdata.Address1=item.fullobj.address_1,
                this.customerformdata.Address2=item.fullobj.address_2,
                this.customerformdata.state=item.fullobj.state_code,
                this.customerformdata.city=item.fullobj.city_code,
                this.customerformdata.pincode=item.fullobj.pincode,
                this.customerformdata.income=item.fullobj.income,
                this.customerformdata.noofchildren=item.fullobj.no_of_children
                this.customerformdata.professiontype=item.fullobj.profession_type,
                this.customerformdata.occuepationcode=item.fullobj.occupation_code,
                this.customerformdata.nomineename1=item.fullobj.nominee1_name,
                this.customerformdata.nominee1dob=item.fullobj.nominee1_dob,
                this.customerformdata.nomineename2=item.fullobj.nominee2_name,
                this.customerformdata.nominee2dob=item.fullobj.nominee2_dob,
                this.customerformdata.martialstatus=item.fullobj.marital_status,
                this.customerformdata.recompdt1=item.fullobj.recom_pdt_1_code,
                this.customerformdata.recompdt2=item.fullobj.recom_pdt_2_code,
                this.customerformdata.Allocatetoagent=item.fullobj.allocatedToAgent.employeeCode,
                this.customerformdata.channelName=item.fullobj.customerChannel._id,
                this.customerformdata.applicationcode= item.fullobj.application_code,
                this.CustomerId = item.fullobj._id,
                // this.customerformdata.applicationcode=
                this.cityfind(item.fullobj.state_code)

        },

        UPDATEcustomer(){
            let self = this;
            console.log("CHANEEL NAME::::::::",self.customerformdata.channelName);

            if(self.customerformdata.channelName === '' || self.customerformdata.clientId === '' || self.customerformdata.firstname === ''
                || self.customerformdata.lastname === ''|| self.customerformdata.primarymobileno === ''|| self.customerformdata.Dob === ''
                || self.customerformdata.nationality === ''|| self.customerformdata.state === ''|| self.customerformdata.city === ''
                || self.customerformdata.Address1 === ''|| self.customerformdata.occuepationcode === ''){
                
                self.showToast('Please, Add the required fields','warning'); 
                self.$refs.form.validate() 
                self.clientIdValid =  [ !!self.customerformdata.clientId || 'This field is required' ]
                self.dobValid =  [ !!self.customerformdata.Dob || 'This field is required' ]
                self.fnameValid = [ !!self.customerformdata.firstname || 'This field is required' ]
                self.lnameValid = [ !!self.customerformdata.lastname || 'This field is required' ]
                self.primNumValid = [ !!self.customerformdata.primarymobileno || 'This field is required' ]
                self.add1Validate = [  !!self.customerformdata.Address1 || 'This field is required' ]
                self.dialog = true; 

            }
            // else if(self.clientIdValid.length !== 0 || self.salutationValid.length !== 0 || self.midNameValid.length !== 0 || self.fnameValid.length !== 0 ||
            //     self.lnameValid.length !== 0 || self.primNumValid.length !== 0 || self.secNumValid.length !== 0 || self.add1Validate.length !== 0 || 
            //     self.add2Validate.length !== 0 || self.pinValidate.length !== 0 || self.incomeValidate.length !== 0 || self.nom1Validate.length !== 0 || 
            //     self.nom2Validate.length !== 0 || self.prodName1Validate.length !== 0 || self.prodName2Validate.length !== 0 || self.appIdValidate.length !== 0 || 
            //     self.empIdValidate.length !== 0){
                    
            //         self.showToast('Please, Insert the correct data','warning');  
            //         self.dialog = true; 
            
            // }
            else{
                let formdata = {
                    client_id:this.customerformdata.clientId,
                    salutation:this.customerformdata.salutation,
                    customer_first_name:this.customerformdata.firstname,
                    customer_middle_name:this.customerformdata.middlename,
                    customer_last_name:this.customerformdata.lastname,
                    gender:this.customerformdata.gender,
                    date_of_birth:this.customerformdata.Dob,
                    nationality:this.customerformdata.nationality,
                    primary_telephone:this.customerformdata.primarymobileno,
                    secondary_telephone:this.customerformdata.secondarymobileno,
                    email_id:this.customerformdata.EmailId,
                    address_1:this.customerformdata.Address1,
                    address_2:this.customerformdata.Address2,
                    state_code:this.customerformdata.state,
                    city_code:this.customerformdata.city,
                    pincode:this.customerformdata.pincode,
                    income:this.customerformdata.income,
                    no_of_children:this.customerformdata.noofchildren,
                    profession_type:this.customerformdata.professiontype,
                    occupation_code:this.customerformdata.occuepationcode,
                    nominee1_name:this.customerformdata.nomineename1,
                    nominee1_dob:this.customerformdata.nominee1dob,
                    nominee2_name:this.customerformdata.nomineename2,
                    nominee2_dob:this.customerformdata.nominee2dob,
                    marital_status:this.customerformdata.martialstatus,
                    recom_pdt_1_code:this.customerformdata.recompdt1,
                    recom_pdt_2_code:this.customerformdata.recompdt2,
                    allocatedToAgent:this.customerformdata.Allocatetoagent,
                    customerChannel:this.customerformdata.channelName,
                    proposalId:this.customerformdata.proposalId,
                    admin_Id:this.getAgentInfo()._id,
                    customerId:this.CustomerId,
                    userId: this.getAgentInfo()._id,
                }
                let self = this;
                this.PUTUSER('updateCustomer',formdata , (res, error)=>{
                    if (!error) {
                        if(res.data.errCode == -1){
                            self.showToast('Customer Updated Successfully',self.TOST().SUCCESS)
                            self.GetAllLeadData('all');
                            self.dialog = false;
                        } else if (res.data.errCode === 1) {
                            self.showToast(res.data.errMsg, self.TOST().INFO)
                        } else if (res.data.errCode === 4) {
                            self.showToast(res.data.errMsg, self.TOST().ERROR)
                        } else if (res.data.errCode === 2500) {
                            self.showToast(res.data.errMsg, self.TOST().WARNING)
                        } else if (res.data.errCode === 2601) {
                            self.showToast(res.data.errMsg, self.TOST().INFO)
                        }else if(res.data.errCode === 11000){
                                self.showToast('Customer already exist', self.TOST().ERROR)
                        }
                    }
                })
            }
        },

        cityfind(ev){
            console.log("event ", this.StateListdata)
            let codes= this.StateListdata.filter(e=>{
                if(e.text === ev){
                    return e.code
                }
            })
            console.log("event filter",codes)
            this.GETCITY(codes[0].code,resp=>{
                console.log("city ", resp[0].cities)
                this.Citylist = resp[0].cities
            })
        },
        // Vuetify code
        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        // Vuetify code
        parseDate (date) {
            if (!date) return null
            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },


        gotoLeadForm() {
            // Here, Store is clear before going to next page
            this.commit('SAVE_LEAD_RESPONSE', null);
            this.jump('/Lmaster/status');
      },
       toggleAll (e) {
            // console.log('Toggle Event',e)
            // console.log('V-MODEl ',this.headCheck)
            this.allCheckSelect = e
            this.showManual = true;
            this.selected = []
            this.custIDLen = 0;

        let temp = this.custListData.map(items => {
            if (e == true) {
                this.custID = this.objmethod.slice()
                console.log('SeleCTED',this.custID)
                this.custIDLen++;
            } else {
                this.custID = [];
                console.log('Un SeleCTED',this.custID)
                this.showManual = false;
                this.custIDLen = 0;
            }
            items.selected = e;
            // this.allCheckSelect = items
            // console.log('ITEMS ',items)
            return items;
        });

        this.custListData  = [];
        this.custListData = temp;
        temp = undefined;


      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      deleteItem (item,index) {
        this.usrdetails.splice(index, 1)
        },
        getLeadData(id, callback = null){
             this.GET('getlead_details/'+id,res => {


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
               }
           )
         },

         channelfilters(e){
            console.log('data',e)
                this.page=1
                this.channeldatafilter = e
                this.GetAllLeadData(this.channeldatafilter,this.skip)
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
                this.GetAllLeadData(this.channeldatafilter,this.skip)
            },
         GetAllLeadData(e,skip){
            console.log("User Id",this.getAgentInfo()._id)
            console.log("Event",e)
            console.log("Skip",skip)
            this.customerdataList=[]
            let FILTER_API ='v2/getCustomer?admin_id='+this.getAgentInfo()._id;

            if(this.channeldatafilter === 'all'){
                if (Object.keys(this.filterStruct).length === 0) {
                    this.custListData =[];
                    FILTER_API = FILTER_API+'&skip='+skip;
                    console.log(" TRUE Filter Api RESPONSE",FILTER_API)
                } else {
                    this.custListData =[];
                    FILTER_API = FILTER_API+'&skip='+skip+'&filterBy='+this.filterStruct;
                    console.log(" False Filter Api RESPONSE",FILTER_API)
                }
            } else {
                if (Object.keys(this.filterStruct).length === 0) {
                    this.custListData =[];
                    FILTER_API = FILTER_API+'&channelCode='+e +'&skip='+skip;
                     console.log(" Else IF Filter Api RESPONSE",FILTER_API)
                } else {
                    this.custListData =[];
                    FILTER_API = FILTER_API+'&channelCode='+e +'&skip='+skip+'&filterBy='+this.filterStruct;
                     console.log("Else Api RESPONSE",FILTER_API)
                }
            }
            let self =this

            self.GETUSER(FILTER_API,res => {

                   console.log("GET Policy DATA::==->", res);
                    if(res.data.errCode === -1){
                    self.customerdataList = res.data.errMsg[0]
                    console.log("GETCustomer API DATA ::==>", self.customerdataList);

                    for(var i =0 ;i< self.customerdataList.length;i++){
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
                        let totalCount = pageLen[0].count
                        console.log('Page Length:',totalCount)
                        self.pageLength = Math.ceil(totalCount/self.skipdiffrence)

                    // console.log("getting CUSTOMER data for table::=>", self.customerdataList);

               }
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
         Searchdatatable (e) {
                console.log("e data",e)
                this.value = e;
            },

            searchAgentCust(search){
                console.log("Search",search)
                this.agentSearch = search;
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
                customerJson:this.bulkData
            }

            console.log("FormData json check",formData);
            this.showLoader('Uploading', true);
            let User_id = this.$store.state.agentDetails._id;
            let self = this;
            this.POST('customer_bulk_upload/'+User_id,formData,res=>{
                if(res.data.errCode==-1)
                {
                        // console.log("Download link",res.data.errMsg);
                        self.showToast('File uploaded successfully', self.TOST().SUCCESS);
                        self.steps = 2
                        self.sucessCount = res.data.errMsg.success
                        self.failCount = res.data.errMsg.failed
                        self.errorLink = res.data.errMsg.link
                        this.showLoader('Uploading', false);
                }

                else if(res.data.errCode== 4)
                {
                        self.showToast('Database Error', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                }

                else if(res.data.errCode == 510)
                {
                        self.showToast(' User not found', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                }

                 else if(res.data.errCode == 430)
                {
                        self.showToast('Request body is empty', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                }
                 else if(res.data.errCode == 303)
                {
                        self.showToast('Agent id is invalid', self.TOST().ERROR);
                        this.showLoader('Uploading', false);
                }

                  else if(res.data.errCode == 343)
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
                cancelStepper(){
                    this.dialogBulkUpld = false
                    this.channeldatafilter = 'all'
                    this.GetAllLeadData(this.channeldatafilter);
                    this.steps =1
                },
                openwindow(){
                    this.bulkData=[]
                    this.dialogBulkUpld = true
                    this.sucessCount=0
                    this.failCount=0
                    this.excelfilename = ''
                    fileUpload=null
                    this.steps = 1
                    this.errorLink='Link Comes Here'
                    this.fileLink=''
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
                //  Here is your object
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
