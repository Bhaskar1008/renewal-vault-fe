
<template>
    <v-app>
        <v-card>
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3" style="flex-flow:column wrap;width:100%;padding-right:70px">
                    <v-text class=" headline font-weight-bold">User Management (Banca)</v-text>
                    <hr>

                    <v-layout row >
                        <v-flex justify-center md12 ml-3 mt-3 >
                            <v-layout row  justify-space-between>
                                <v-menu transition="slide-y-transition" >
                                    <v-btn round depressed medium slot="activator" color="secondary" class="white--text">
                                        add User
                                        <v-icon dark right>add_circle</v-icon>
                                    </v-btn>
                                    <v-list>
                                        <v-list-tile>
                                            <v-btn flat color="secondary" @click="addUser()">Single User</v-btn>
                                        </v-list-tile>
                                        <v-list-tile >
                                            <v-btn flat color="secondary"  @click="openwindow">Bulk Upload</v-btn>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                                <v-layout row >
                                        <v-flex xs10 sm6 md4 class=" mt-4">
                                        </v-flex>
                                        <v-flex xs10 sm6 md4 class=" mt-4">
                                            <v-select v-model="channelFilter"  @change="selectChnFilter" :items="channeltxtarray" item-text="text" item-value="value"  label="Chanel Name" ></v-select>
                                        </v-flex>
                                    <v-flex xs10 sm6 md4 class=" mt-4 mr-2">
                                    <v-text-field
                                        @change="Searchdatatable"
                                        v-model="value"
                                        label="Search"
                                        append-icon="search"
                                        height="30px"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                            <v-data-table
                                :headers="headers"
                                :items="userDataList"
                                hide-actions
                                class="elevation-1">
                                <template slot="items" slot-scope="props">
                                    <!-- <td class="">{{props.index}}</td> -->
                                    <td class="text-xs-left" >{{props.item.primary_email}}</td>
                                    <td class="">{{props.item.mobile_no}}</td>
                                    <td class="text-xs-left">{{props.item.first_name | to-capitlaize}}</td>
                                    <td class="text-xs-left">{{props.item.last_name | to-capitlaize}}</td>
                                    <td class="">{{props.item.agent_id}}</td>
                                    <td class="text-xs-left">{{props.item.branchName}}</td>
                                    <!-- <td class="">{{props.item.attendanceCount}}</td> -->
                                    <td class="text-xs-left">{{props.item.RM_first_name}}</td>
                                    <td class="">{{props.item.slectStatus}}</td>
                                    <td class="text-xs-left">{{props.item.branchCode}}</td>
                                    <td class="text-xs-left">{{props.item.channelName}}</td>
                                    <td class="text-xs-left">{{props.item.hierarchyName}}</td>
                                    <td class="text-xs-left">{{props.item.roleCode}}</td>
                                    <!-- <td class="">{{props.item.reportingBranchCode}}</td> -->
                                    <td class="justify-center layout px-0">
                                        <v-menu transition="scale-transition">
                                            <v-btn icon class="mx-0" slot="activator" >
                                                <v-icon color="grey">settings</v-icon>
                                            </v-btn>
                                            <v-list>
                                                <v-list-tile >
                                                    <v-btn flat color="primary" @click="editItem(props.item,props.index)">Edit</v-btn>
                                                </v-list-tile>
                                                <v-list-tile >
                                                    <v-btn flat color="primary" @click="deleteItem(props.item,props.index)">Delete</v-btn>
                                                </v-list-tile>
                                                <v-list-tile >
                                                    <v-btn flat color="primary" @click="resetPassword(props.item)">Reset Password</v-btn>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-layout>

                    <!-- SINGLE USER UPLOAD DIALOG -->
                    <v-dialog v-model="dialog" persistent max-width="800px">
                        <v-card>
                            <v-flex style="background-color:#3a3a3a">
                                <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                            </v-flex>
                            <v-card-text>
                                <form @submit.prevent="saveAndEdit()">
                                    <v-container grid-list-md>
                                    <template>
                                        <v-expansion-panel v-model="panelBasic" expand>
                                            <!-- EXPANSION-PANEL 'BASIC DETAILS' -->
                                        <v-expansion-panel-content>
                                            <div slot="header" class="body-2">Basic Details</div>
                                            <v-flex pa-3 class="grey lighten-5">
                                                <!-- <v-layout wrap>
                                                    <v-flex xs12 md3 class="mb-3">
                                                        <p class="body-2">Upload Profile Picture :</p>
                                                        <img v-if="profileImages.respFileName  !== ''" :src="node_img_url() + profileImages.respFileName " class="height-image"/>
                                                    </v-flex>

                                                    <v-layout row wrap align-center style="cursor:pointer" class="mb-4">
                                                        <input ref="planPictures"  type="file" accept="image/x-png,image/jpeg" class="selectfile" @change="handleFileUpload"/>
                                                        <v-flex xs2 >
                                                            <img src="../assets/Group_971.png" class="uploadimage"/>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-layout> -->
                                                <v-layout wrap>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-select v-model="editedItem.channelname" @change="changeFil" :items="channeltxtDialog" item-text="text" item-value="value"  label="Channel Name"
                                                        @input="$v.editedItem.channelname.$touch()"
                                                        @blur="$v.editedItem.channelname.$touch()"
                                                        :error-messages="ChanelErrors" ></v-select>
                                                    </v-flex>

                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field v-model="editedItem.primaryEmail"
                                                        label="Primary Email"
                                                        @input="$v.editedItem.primaryEmail.$touch()"
                                                        @blur="$v.editedItem.primaryEmail.$touch()"
                                                        :error-messages="emailErrors"
                                                        required>
                                                        </v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field v-model="editedItem.mobileno"
                                                        label="Enter Mobile No"
                                                        :mask="mobnumber"
                                                        @input="$v.editedItem.mobileno.$touch()"
                                                        @blur="$v.editedItem.mobileno.$touch()"
                                                        :error-messages="mobileErrors"
                                                        required>
                                                        </v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field
                                                        v-model="editedItem.firstName"
                                                        label="First Name"
                                                        counter="50"
                                                        maxlength="50"
                                                        @input="$v.editedItem.firstName.$touch()"
                                                        @blur="$v.editedItem.firstName.$touch()"
                                                        :error-messages="nameErrors"
                                                        required>
                                                        </v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field  maxlength="50" counter="50" v-model="editedItem.lastName" label="Last Name"></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field v-model="editedItem.agentId" label="Agent ID"
                                                            @input="$v.editedItem.agentId.$touch()"
                                                        @blur="$v.editedItem.agentId.$touch()"
                                                        :error-messages="agentIdErrors">
                                                        </v-text-field>
                                                    </v-flex>

                                                    <!-- DESIGNATION -->
                                                    <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
                                                        <v-select v-model="editedItem.designation"  :items="designationdata"  @change="designationselect"  item-text="text" item-value="value" label="Designation"
                                                        ></v-select>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6 v-else>
                                                        <v-select disabled v-model="editedItem.designation"  :items="designationdata"  @change="designationselect"  item-text="text" item-value="value" label="Designation"
                                                        ></v-select>
                                                    </v-flex>

                                                    <!-- HIERARCHY -->
                                                    <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
                                                        <v-select v-model="editedItem.heirarchy" :items="selectheirarchy"  @change="setHierarchy"  item-text="text" item-value="value"  label="Hierarchy Name"
                                                        @input="$v.editedItem.heirarchy.$touch()"
                                                        @blur="$v.editedItem.heirarchy.$touch()"
                                                        :error-messages="HeirarchyErrors"
                                                        ></v-select>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6 v-else>
                                                        <v-select disabled v-model="editedItem.heirarchy" :items="selectheirarchy"  @change="setHierarchy"  item-text="text" item-value="value"  label="Hierarchy Name"
                                                        @input="$v.editedItem.heirarchy.$touch()"
                                                        @blur="$v.editedItem.heirarchy.$touch()"
                                                        :error-messages="HeirarchyErrors"
                                                        ></v-select>
                                                    </v-flex>

                                                    <!-- ROLE-CODE -->
                                                    <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
                                                        <v-select v-model="editedItem.rolecode" :items="selectrole" @change="setRole"  item-text="text" item-value="value"  label="Role name"
                                                        @input="$v.editedItem.rolecode.$touch()"
                                                        @blur="$v.editedItem.rolecode.$touch()"
                                                        :error-messages="codeErrors" ></v-select>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6 v-else>
                                                        <v-select disabled v-model="editedItem.rolecode" :items="selectrole" @change="setRole"  item-text="text" item-value="value"  label="Role name"
                                                        @input="$v.editedItem.rolecode.$touch()"
                                                        @blur="$v.editedItem.rolecode.$touch()"
                                                        :error-messages="codeErrors" ></v-select>
                                                    </v-flex>

                                                    <!-- BRANCH -->
                                                    <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
                                                        <v-select v-model="editedItem.branch" @input="$v.editedItem.branch.$touch()"
                                                        @blur="$v.editedItem.branch.$touch()" :error-messages="branchErrors"
                                                        :items="branchArray" autocomplete item-text="text" item-value="value" label="Branch"
                                                        ></v-select>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6 v-else>
                                                        <v-select disabled v-model="editedItem.branch"  :items="branchArray" autocomplete item-text="text" item-value="value" label="Branch"
                                                        ></v-select>
                                                    </v-flex>

                                                    <!-- REPORTING MANAGER HIERARCHY-->
                                                    <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
                                                        <v-select v-model="editedItem.reportinmanagerhierarchy"
                                                        :items="heirarchydatalists" @change="reporingdataarray"
                                                        item-text="text"
                                                        item-value="value"
                                                        label="Reporting Manager Hierarchy"
                                                        ></v-select>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6 v-else>
                                                        <v-select disabled v-model="editedItem.reportinmanagerhierarchy"
                                                        :items="heirarchydatalists" @change="reporingdataarray"
                                                        item-text="text"
                                                        item-value="value"
                                                        label="Reporting Manager Hierarchy"
                                                        ></v-select>
                                                    </v-flex>

                                                    <!-- REPORTING MANAGER -->
                                                    <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
                                                        <v-select v-model="editedItem.reportingManager"
                                                        :items="finalreporingdata"
                                                        item-text="username"
                                                        item-value="user_id"
                                                        label="Reporting Manager"></v-select>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6 v-else>
                                                        <v-select disabled v-model="editedItem.reportingManager"
                                                        :items="finalreporingdata"
                                                        item-text="username"
                                                        item-value="user_id"
                                                        label="Reporting Manager"></v-select>
                                                    </v-flex>

                                                    <v-flex xs12 sm6 md6>
                                                        <v-select  v-model="editedItem.slectStatus" :items="userstatus" item-text="text" label="User Status"
                                                        @input="$v.editedItem.slectStatus.$touch()"
                                                        @blur="$v.editedItem.slectStatus.$touch()"
                                                        :error-messages="statusErrors"></v-select>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-expansion-panel-content>

                                            <!-- EXPANSION-PANEL 'Contact Details' -->
                                        <v-expansion-panel-content >
                                            <div slot="header" class="body-2">Contact Details</div>
                                            <v-flex pa-3 class="grey lighten-5">
                                                <v-layout wrap>
                                                    <!-- sc99 -->
                                                    <v-flex xs12 sm6 md6>
                                                        <v-select v-model="editedItem.state" @change="cityfind"
                                                        @input="$v.editedItem.state.$touch()"
                                                        @blur="$v.editedItem.state.$touch()"  :error-messages="stateerror"
                                                        autocomplete :items="stateItems" item-text="text"  label="State"></v-select>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-select v-model="editedItem.city" :items="cityItems"
                                                        @input="$v.editedItem.city.$touch()"
                                                        @blur="$v.editedItem.city.$touch()"  :error-messages="cityerror"
                                                        autocomplete item-text="asciiname"  label="City"></v-select>
                                                    </v-flex>
                                                    <v-flex xs6>
                                                        <v-text-field v-model="editedItem.address1" label="Address Line 1"></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs6>
                                                        <v-text-field v-model="editedItem.address2" label="Address Line 2"></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs6>
                                                        <v-text-field v-model="editedItem.postalCode" label="Postal code"></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs6>
                                                        <v-text-field v-model="editedItem.secMobileNo" label="Secondary mobile no."></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs6>
                                                        <v-text-field v-model="editedItem.secEmail" label="Secondary email ID"></v-text-field>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-expansion-panel-content>

                                        <!-- EXPANSION-PANEL 'Bank and Identification details' -->
                                        <v-expansion-panel-content>
                                            <div slot="header" class="body-2">Bank and Identification details</div>
                                            <v-flex pa-3 class="grey lighten-5">
                                                <v-layout wrap>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-select v-model="editedItem.docsType" :items="docType"  label="Add ID"></v-select>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-select v-model="editedItem.nationality" :items="items"  item-text="state" item-value="abbr" label="Nationality"></v-select>
                                                    </v-flex>
                                                </v-layout>
                                                <v-flex>
                                                    <v-text class="subheading font-weight-medium">Account with Bank :</v-text>
                                                </v-flex>
                                                <v-layout wrap>
                                                    <v-layout>
                                                        <v-flex xs12 sm6 md10>
                                                            <v-text-field v-model="editedItem.ifscCode" label="IFSC Code"></v-text-field>
                                                            <!-- :error-messages="ifscErrors" @input="$v.editedItem.ifscCode.$touch()" -->
                                                                <!-- @blur="$v.editedItem.ifscCode.$touch() -->
                                                        </v-flex>
                                                        <v-flex xs12 sm6 md1 style="display:flex;cursor:pointer" >
                                                            <v-icon @click.native="bankApi()">search</v-icon>
                                                        </v-flex>
                                                    </v-layout>

                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field v-model="editedItem.bankName" label="Bank Name"></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field v-model="editedItem.branchName" label="Branch Name"></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field v-model="editedItem.bankState" label="State"></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                    <v-text-field v-model="editedItem.bankCity" label="City"></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field v-model="editedItem.accNo" label="Account No."></v-text-field>
                                                    </v-flex>
                                                    <v-flex xs12 sm6 md6>
                                                        <v-text-field v-model="editedItem.nameAccHolder" label="Name of Account Holder"></v-text-field>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-expansion-panel-content>
                                        <v-expansion-panel-content>
                                            <div slot="header" class="body-2">Map Branches</div>
                                            <v-flex pa-3 class="grey lighten-5">
                                                <v-layout wrap>
                                                    <v-flex xs6 sm3 md3>
                                                        <v-select v-model="editedItem.branchstate" :items="branchstate"  label="State"></v-select>
                                                    </v-flex>
                                                    <v-flex xs6 sm3 md3>
                                                        <v-select v-model="editedItem.branchRegion" :items="branchregion" label="Region"  item-text="text" item-value="value" ></v-select>
                                                    </v-flex>
                                                    <v-flex xs6 sm3 md3>
                                                        <v-select v-model="editedItem.branchcity" :items=" branchcity"  label="City"></v-select>
                                                    </v-flex>
                                                    <v-flex xs6 sm3 md3>
                                                        <v-select v-model="editedItem.branchZone" :items="branchzone" label="Zone"  item-text="text" item-value="value"></v-select>
                                                    </v-flex>
                                                </v-layout>
                                                <v-data-table
                                                    :headers="branchheaders"
                                                    :items="Branchlistdata"
                                                    hide-actions
                                                    class="elevation-1">
                                                    <template slot="items" slot-scope="props">
                                                        <td class="text-xs-left" >{{props.item.branchCode}}</td>
                                                        <td class="">{{props.item.branchName}}</td>
                                                        <td class="text-xs-left">{{props.item.stateName}}</td>
                                                        <td class="text-xs-left">{{props.item.cityName }}</td>
                                                        <td class="">{{props.item.regionName}}</td>
                                                        <td class="text-xs-left">{{props.item.zoneName}}</td>
                                                        <td class="text-xs-left">{{props.item.Area}}</td>
                                                        <!-- <td class="">{{props.item.slectStatus}}</td>
                                                        <td class="text-xs-left">{{props.item.branchCode}}</td>
                                                        <td class="text-xs-left">{{props.item.channelName}}</td>
                                                        <td class="text-xs-left">{{props.item.hierarchyName}}</td>
                                                        <td class="text-xs-left">{{props.item.roleCode}}</td> -->
                                                        <!-- <td class="justify-center layout px-0">
                                                            <v-menu transition="scale-transition">
                                                                <v-btn icon class="mx-0" slot="activator" >
                                                                    <v-icon color="grey">settings</v-icon>
                                                                </v-btn>
                                                                <v-list>
                                                                    <v-list-tile >
                                                                        <v-btn flat color="primary" @click="editItem(props.item,props.index)">Edit</v-btn>
                                                                    </v-list-tile>
                                                                    <v-list-tile >
                                                                        <v-btn flat color="primary" @click="deleteItem(props.item,props.index)">Delete</v-btn>
                                                                    </v-list-tile>
                                                                    <v-list-tile >
                                                                        <v-btn flat color="primary" @click="resetPassword(props.item)">Reset Password</v-btn>
                                                                    </v-list-tile>
                                                                </v-list>
                                                            </v-menu>
                                                        </td> -->
                                                    </template>
                                                </v-data-table>
                                            </v-flex>

                                        </v-expansion-panel-content>
                                        </v-expansion-panel>
                                        <!-- </v-flex> -->
                                        </template>

                                        <!-- <v-divider style="border-color:#FAFAFA"></v-divider> -->
                                    </v-container>
                                </form>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                                    <v-icon right dark>highlight_off</v-icon>
                                </v-btn>
                                <v-btn depressed large color="secondary" @click.native="saveAndEdit(btnname)"> {{btnname}}
                                    <v-icon dark right>check_circle</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-flex>
            </v-layout>

            <!--DIALOG FOR RESET PASSWORD-->
            <v-dialog v-model="resetDialog" persistent max-width="400px">
                <v-card>
                    <v-flex style="background-color:#3a3a3a">
                        <v-card-title class="subheading" style="color:white" >Reset Password</v-card-title>
                    </v-flex>
                    <v-card-text> Are you Sure you want to Reset this user's password</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed  color="grey lighten-3" @click="resetDialog=false">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed  color="secondary" @click="resetFunct()">Reset
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

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
                                </v-stepper-header>
                                <v-stepper-items>
                                    <v-stepper-content step="1">
                                        <!-- <v-card class="mb-3"  height="200px"> -->
                                        <v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
                                        <v-layout >
                                            <v-flex  class="fileContainer-bulk  mt-6">
                                                <v-text class="upload-text">UPLOAD FILE</v-text>
                                                <v-icon right dark>publish</v-icon>
                                                <input type="file" id="fileUpload" @change="jsonupload">
                                            </v-flex>
                                            <!-- <div class="fileContainer-bulk  mt-4-bulk"  >
                                                <v-text class="documt-normal-text-size-bulk subheading ">UPLOAD</v-text>
                                                <v-icon dark>publish</v-icon>
                                                <input type="file"
                                                id="fileUpload"
                                                @change="jsonupload">
                                            </div> -->
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
                                            <a href="https://image-upload-bucket-2019.s3.ap-south-1.amazonaws.com/198cedf8938356a64452cdb96ef7e31441fe6aeb.xlsx" download>
                                            <v-btn color="primary">sample file
                                                <v-icon right dark>save_alt</v-icon>
                                            </v-btn>
                                            </a>
                                            <v-btn color="primary" @click="goUserNxt()">Next <v-icon class="ml-2" size="20px">arrow_forward</v-icon></v-btn>
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
                                            <a :href ="errorLink" download>{{errorLink}}</a>
                                        </v-flex>

                                        <v-card-actions style="justify-content:flex-end;">
                                            <v-layout mt-5 justify-space-between>
                                                <v-btn color="primary" @click="steps =1"><v-icon class="mr-2">arrow_back</v-icon>Previous</v-btn>
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

                    <div v-if="pageLength > 1"  class="text-xs-center pagination">
                        <v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
                    </div>
            </v-card>
    </v-app>
</template>
<script>
import axios from 'axios'
import { required, minLength,maxLength, between,email } from 'vuelidate/lib/validators'
import loadChannel from '../common/onProjectLoad.js'
var _index = 0; // used for put api
var fileUpload =null;

let duplicate_edit_item = {};
let branchheaders = [{text:'Branch Code',valu:'branchcode'},
{text:'Branch Name',valu:'branchname'},
{text:'State',valu:'state'},
{text:'City',valu:'city'},
{text:'Region',valu:'region'},
{text:'Zone',valu:'zone'},
{text:'Area',valu:'area'}
]
export default {

    created(){

        // console.log('editedItem.channelname_Creat',this.editedItem.channelname)
        duplicate_edit_item = JSON.parse(JSON.stringify(this.editedItem));
        console.log("The agent info id is =>", this.getAgentInfo()._id);
        this.agentID =  this.getAgentInfo()._id;
        this.channeldatalist();
        this.user_id = this.$store.state.agentDetails._id
        console.log('User Id TYPE',this.user_id)
        // this.getUserData()
        // this.getuserdatareporting();

        // axios.get(this.API_Service_admin()+'/fetch_document_type?filter=30').then(
        //     res => {
            this.GET('/fetch_document_type?filter=30' , function(res,error){
                    if(res.data.errCode !== -1){
                    this.obj = "request failed";
                }else{
                    // console.log('fetchDOcument API:>',res.data.errMsg)
                    var fetchDoc = res.data.errMsg
                    for(let i = 0;i < fetchDoc.length;i++){
                        this.docs = fetchDoc[i].documentType
                        this.docMasterId = fetchDoc[i]._id
                        console.log('Doc Master ID',this.docMasterId)
                        this.docType.push(this.docs)
                        // console.log('DOCU TYPE',this.docType)
                    }
                }
            }
        ).catch(
            err => {
                console.log(err) ;
            }
        );

        this.GETSTATE(res=>{
            for(let i =0;i<res.length;i++){
                let statedata={
                    text:res[i].region_data.name,
                    code:res[i].region_data.adminCode1
                }
                    this.stateItems.push(statedata)
            }
        })
        console.log(this.stateItems,"response mixin data");
    },

    mounted(){

       this.channelFilter = 'all'
       this.getuserdatareporting( this.channelFilter,this.skip);




        // this.Banklist();

    },

    validations: {
        editedItem: {

           branch:{
               required
           },
            state:{
                required
            },
            city:{
                required
            },

            firstName: {
                required,
            },
            primaryEmail:{
                required,
                email
            },
            agentId:{
                required
            },
            mobileno:{
                required,
            },
                reportingManager:{
                required
            },
                slectStatus:{
                required
            },
                rolecode:{
                required
            },
            channelname:{
                required
            },
            heirarchy:{
                required
            },
            // ifscCode:{
            //     required,
            //     minLength: minLength(11),
            //     maxLength: maxLength(11)
            //     },
        },
    },

    data(){
        return{
            fnamecheck:"",
            branchheaders,
            Branchlistdata:[],
            showChannelDependFields :false,
            mobnumber:'###-###-####',
            agentID:null,
            Userskip:0,
            pagination: {},
            docType:[],
            docs:{},
            docsType:'',
            pageLength:10,
            UserData:[],
            bulkData:[],
            panelBasic:[true,false,false],
            items: [
                { state: 'Indian', abbr: 'IN' },
                { state: 'Georgia', abbr: 'GA' },
                { state: 'Nebraska', abbr: 'NE' },
                { state: 'California', abbr: 'CA' },
                { state: 'New York', abbr: 'NY' }
            ],
            stateItems:[
                    // { text: 'Maharashtra', value: 'Mh' },
                    // { text: 'Gujarat', value: 'Gj' },
                    // { text: 'Kerala', value: 'Kl' },
                    // { text: 'Goa', value: 'Ga' },
                    // { text: 'Madhya Pradesh', value: 'Mp' }
                ],
            cityItems:[
                    // { text: 'Mumbai', value: 'mum' },
                    // { text: 'Ahmedabad', value: 'ah' },
                    // { text: 'Chennai', value: 'ch' },
                    // { text: 'Panaji', value: 'pn' },
                    // { text: 'Bhopal', value: 'bh' }
                ],
             sucessCount:0,
            failCount:0,
            errorLink:'Link Comes Here',
            value:'',
            designationdata:[],
            searchcache: '',
            imageUrlList:'',
               fileName:'',
                imageList:[],
                imgact:false,
                excelfilename:'',
            search: '',
            resetDialog:false,
            dialog: false,
            dialogBulkUpld:false,
            downloadlink:"../assets/Bulk_Activity_Upload.xlsx",
            fileLink:'',
            split:[],
            btnname:'',
            user_id:'',
            channeltxtarray:[],
            channeltxtDialog:[],
            heirarchydatalists:[],
            selectheirarchy:[],
            selectrole:[],
            finalreporingdata:[],
            steps:0,
            usrdetails:[],
            TableIndex:'',
            branchArray:[],
            bankdataarray:[],
            userreportinghierarchy:[],
            userstatus:['InActive','Active'],
            usrputdetails:[],
            allAgentdata:[],
            tempData:[],
            finalbankdata:[],
            docMasterId:{},
            profileImages:{
	            respFileName:'',
	            respFileType:''
            },
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
                // {text:"Usama",value:"UK1242"},
                // {text:"dsd",value:"sds23"},
            ],
            headers:[
                {text: 'Primary Email', value: 'primaryEmail'},
                {text: 'mobile no', value: 'mobileno'},
                {text: 'First Name', value: 'firstName'},
                {text: 'Last Name', value: 'lastName'},
                {text: 'Agent ID', value: 'agentId'},
                {text: 'Branch', value: 'branch'},
                // {text: 'Attendance Count', value: 'attendanceCount'},
                {text: 'Reporting Manager', value: 'reportingManager'},
                {text: 'User Status', value: 'slectStatus'},
                {text:'Branch Code',value:'branchCode'},
                {text: 'Channel Name', value: 'channelname'},
                {text:'Hierarchy Name',value:'heirarchy'},
                {text: 'Role Code', value: 'rolecode'},
                {text: 'Action', value: 'action', sortable: false}
            ],
            userTableData: [],
            editedIndex: -1,
            channelFilter:'',
            editedItem: {
                primaryEmail:'',
                firstName:'',
                lastName:'',
                agentId:'',
                // passwrd:'',
                branch:'',
                reportingManager:'',
                slectStatus:'',
                branchcode:'',
                channelcode:'',
                rolecode:'',
                reportingBranchcode:'',
                mobileno:'',
                channelname:'',
                heirarchy:'',
                reportinmanagerhierarchy:'',
                bank:'',
                designation:'',
                profileImagetype:'',
                profileImagename:'',
                nationality:'',
                state:'',
                city:'',
                address1:'',
                address2:'',
                postalCode:'',
                secMobileNo:'',
                secEmail:'',
                bankName:'',
                ifscCode:'',
                bankState:'',
                bankCity:'',
                branchName:'',
                accNo:'',
                nameAccHolder:'',
            },
            defaultItem: {
               primaryEmail:'',
                firstName:'',
                lastName:'',
                agentId:'',
                // passwrd:'',
                branch:'',
                reportingManager:'',
                slectStatus:'',
                branchcode:'',
                channelcode:'',
                rolecode:'',
                reportingBranchcode:'',
                mobileno:'',
                channelname:'',
                heirarchy:'',
                reportinmanagerhierarchy:'',
                bank:'',
                designation:'',
                nationality:'',
                state:'',
                city:'',
                address1:'',
                address2:'',
                postalCode:'',
                secMobileNo:'',
                secEmail:'',
                bankName:'',
                ifscCode:'',
                bankState:'',
                bankCity:'',
                branchName:'',
                accNo:'',
                nameAccHolder:'',
            },
            responcedesignation:[],
            statusIndex:'',
            skipdiffrence:this.paginationdiff(),
            skip:0,
            channeldatafilter:'all',
            page:1,
            resetPass:'',
            userDataList:[],
            userDB:{
                primary_email:'',
                mobile_no:'',
                first_name:'',
                last_name:'',
                agent_id:'',
                branchName:'',
                RM_first_name:'',
                slectStatus:'',
                branchCode:'',
                channelName:'',
                hierarchyName:'',
                roleCode:'',
                fullobj:'',
            },
        }
    },
    watch:{
        //   search( n, old){
        //    console.log(n)
        //    console.log(old)
        // //    if(n)
        // //    {
        //        this.allAgentdata =  this.allAgentdata.filter((user) => {
        //               return user.first_name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || user.last_name.toLowerCase().indexOf(this.search.toLowerCase()) > -1  ;
        //            });
        // //    }
        //   }
    },
    filters: {
        empties(str) {
            if (str == null || str == undefined || str == "") {
                return "-"
            } else {
                return str
            }
        }
    },
    computed: {
        objmethod() {
            var self=this;
            return this.userDataList.filter(function(cust){return cust.primary_email.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.mobile_no.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
            ||cust.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.agent_id.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.branchName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.RM_first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.slectStatus.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.branchCode.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.channelName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.hierarchyName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.roleCode.toLowerCase().indexOf(self.value.toLowerCase()) >=0;
            });
            //return this.customers;
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Agent' : 'Edit Agent'
        },

        value() {
           console.log(this.value);
        },
        nameErrors () {
            const errors = []
            const name=''
            this.editItem.firstName = name
            if (!this.$v.editedItem.firstName.$dirty) return errors

            !this.$v.editedItem.firstName.required && errors.push('Name is required.')
            return errors
        },
        emailErrors () {
            const errors = []
            if (!this.$v.editedItem.primaryEmail.$dirty) return errors
                !this.$v.editedItem.primaryEmail.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.primaryEmail.required && errors.push('Email is required.')
            return errors
        },
        //  mobilenoErrors () {
        //   const errors = []
        //   if (!this.$v.editedItem.mobileno.$dirty) return errors
        //     //   !this.$v.editedItem.mobileno.email && errors.push('Must be Valid Mobile No')
        //   !this.$v.editedItem.mobileno.required && errors.push('mobile no is required.')
        //   return errors
        // },
        agentIdErrors () {
            const errors = []
            if (!this.$v.editedItem.agentId.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.agentId.required && errors.push('Agent ID is required.')
            return errors
        },
        //    passwordErrors () {
        //   const errors = []
        //   if (!this.$v.editedItem.passwrd.$dirty) return errors
        //     //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
        //   !this.$v.editedItem.passwrd.required && errors.push('Password is required.')
        //   return errors
        // },
        mobileErrors () {
            const errors = []
            if (!this.$v.editedItem.mobileno.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.mobileno.required && errors.push('Mobile No is required.')
            return errors
        },
        //    branchErrors () {
        //   const errors = []
        //   if (!this.$v.editedItem.branch.$dirty) return errors
        //   !this.$v.editedItem.branch.required && errors.push('Branch Name  is required.')
        //   return errors
        // },
        managerErrors () {
            const errors = []
            if (!this.$v.editedItem.reportingManager.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.reportingManager.required && errors.push('Reporting Manager is required.')
            return errors
        },
        branchErrors(){
            const errors = []
            if (!this.$v.editedItem.branch.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.branch.required && errors.push('Branch is required.')
            return errors
        },
        codeErrors () {
            const errors = []
            if (!this.$v.editedItem.rolecode.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.rolecode.required && errors.push('Role Name is required.')
            return errors
        },
        ChanelErrors () {
            const errors = []
            if (!this.$v.editedItem.channelname.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.channelname.required && errors.push('Channel Name is required.')
            return errors
        },
        HeirarchyErrors () {
            const errors = []
            if (!this.$v.editedItem.heirarchy.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.heirarchy.required && errors.push('Hierarchy Name is required.')
            return errors
        },
        // cityerror
         stateerror() {
            const errors = []
            if (!this.$v.editedItem.state.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.state.required && errors.push('State is required.')
            return errors
        },

        cityerror() {
            const errors = []
            if (!this.$v.editedItem.city.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.city.required && errors.push('City is also required.')
            return errors
        },



        statusErrors () {
            const errors = []
            if (!this.$v.editedItem.slectStatus.$dirty) return errors
                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
            !this.$v.editedItem.slectStatus.required && errors.push('Status is required.')
            return errors
        },
        // ifscErrors () {
        //     const errors = []
        //     if (!this.$v.editedItem.ifscCode.$dirty) return errors
        //         //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
        //     !this.$v.editedItem.ifscCode.required && errors.push('IFSC Code is required.')
        //     !this.$v.editedItem.ifscCode.minLength && errors.push('Invalid IFSC Code')
        //     !this.$v.editedItem.ifscCode.maxLength && errors.push('Invalid IFSC Code')
        //     return errors
        // },
    },

    methods:{
        Hselect(event){
            console.log("H Selected is =>", event);
        },
        setHierarchy(event) {
            // console.log("hierarchy : " , event);
            this.editedItem.heirarchy = event
        },
        setRole(event) {
            // console.log("Role : " , event);
            this.editedItem.rolecode = event
        },

        designationselect(event){
            let desigid = event;
            this.selectheirarchy = [];
            this.selectrole = [];

            for(let i = 0; i < this.responcedesignation.length; i++){
                if(desigid === this.responcedesignation[i]._id){
                    let heirarchymap = {
                        text: this.responcedesignation[i].hierarchyId.hierarchyName,
                        value: this.responcedesignation[i].hierarchyId._id
                    }

                    this.selectheirarchy.push(heirarchymap)
                // this new code is implemented for data pre-populated
                    this.editedItem.heirarchy = {'text' : this.selectheirarchy[0].text, 'value' : this.selectheirarchy[0].value}
                //   this.editedItem.heirarchy = this.selectheirarchy.value
                //   this.editedItem.heirarchy = this.responcedesignation[0].hierarchyId._id
                    let rolemap ={
                        text: this.responcedesignation[i].roleId.roleName,
                        value: this.responcedesignation[i].roleId._id
                    }
                    this.selectrole.push(rolemap)
                    console.log('SELECT ROLE PUSH',this.selectrole)
                //   new code is implement for data prepopulated
                    this.editedItem.rolecode = {'text':this.selectrole[0].text,'value':this.selectrole[0].value}
                    console.log('SELECT ROLE ',this.editedItem.rolecode)
                //   this.rolecode = this.responcedesignation[i].roleId._id
                //   this.editedItem.rolecode = this.responcedesignation[0].roleId._id;    Lates comment
                //   console.log("Role data",this.rolecode)
                }
            }

            console.log("hierarch data", this.selectheirarchy);
            console.log("Roles data", this.selectrole);
        },

        cityfind(ev){
            console.log("event ", this.StateListdata)
            let codes= this.stateItems.filter(e=>{
                if(e.text === ev){
                    return e.code
                }
            })
            console.log("event filter",codes)
            this.GETCITY(codes[0].code,resp=>{
                console.log("city ", resp[0].cities)
                this.cityItems = resp[0].cities
            })
        },
        bankApi(){
            // GETBANKAPI
            // axios.get('https://ifsc.razorpay.com/'+ this.editedItem.ifscCode).then(
                this.GETBANKAPI(this.editedItem.ifscCode , function(res,error){
                // res => {
                        if(!res.statusText){
                        this.obj = "request failed";
                    }else{
                        var razorpayData = res.data
                        if(this.editedItem.ifscCode === razorpayData.IFSC){
                            this.editedItem.branchName = razorpayData.BRANCH;
                            this.editedItem.bankName = razorpayData.BANK;
                            this.editedItem.bankState = razorpayData.STATE;
                            this.editedItem.bankCity = razorpayData.CITY;
                        }
                    }
                }
            ).catch(
                err => {
                    console.log(err) ;
                }
            );
        },

        changeFil(e, cb = null){
            console.log("Selected channel is",e)
            this.channeldatafilter = e;
            this.channeldatafilter !== '' ? this.showChannelDependFields = true : this.channeldatafilter === '' ? this.showChannelDependFields = false : ''

            let self = this;
            // Asynchronus
            self.getrole(self.channeldatafilter, function () {
                self.heirarchydatalist(self.channeldatafilter, function() {
                    self.Getdesignation(self.channeldatafilter, function() {
                         self.branchlist(self.channeldatafilter, function() {
                            if (typeof cb === 'function') {
                                cb('1');
                            }
                        })
                    })
                });
            });
            //  if(res.data.errMsg[0].length == 0){
            //              console.log("Its empty! from CHANGEFIL function->",res.data.errMsg[0].length);
            //              this.editedItem.reportinmanagerhierarchy = "Unassigned";
            //              this.editedItem.reportingManager = "Unassigned";
            //              let heirarchydata = {
            //                     text: "Unassigned",
            //                     value: "unassigned"
            //                 }
            //              this.heirarchydatalists.push(heirarchydata);
            //         }
        },
        selectChnFilter(e){
         console.log("Selected channel is",e)
          this.page=1
         this.channeldatafilter = e
         this.getuserdatareporting(this.channeldatafilter,this.skip)

        },
        resetPassword(temp){
            this.resetDialog = true
            console.log("Reset Data",temp)
            this.resetPass = temp.fullobj._id
            //    this.resetId = temp.
        },
        resetFunct()
        {
            console.log("RESET PASSWOERD ID",this.resetPass)
            const formData={
                user_id :this.resetPass,
                admin_id:this.getAgentInfo()._id,
            }
            console.log("RESET FORMDATA",formData)
            // axios.post(this.API_Service_admin()+'gen_random_key',formData).then(
              this.POST('gen_random_key',formData , (res , error) => {
                // res=>{
                    if(res.data.errCode  == -1){
                        this.resetDialog = false
                        console.log(res.data.errMsg)
                        this.showToast('Temporary password has been send to your email','success')
                    }
                })
        },

        Searchdatatable (e) {
            //  @shoaib this code is used for search the data whatever user insert in the text box .please write only first name
            this.value = e;
            console.log("Channel Filter check",this.channelFilter)
            let FilterData
            if(this.channelFilter == 'all'){
                FilterData = this.API_Service_admin()+'getallAgent?user_id='+this.getAgentInfo()._id+'&skip=0&searchtxt='+this.value+'&searchType=fname'
                console.log("Search Filter all")
            }else{
                FilterData = this.API_Service_admin()+'getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+this.channelFilter+'&skip=0&searchtxt='+this.value+'&searchType=fname'
                console.log("Search Filter other channel")
            }
            console.log(" Serach value is",this.value);
            // axios.get(FilterData).then(
            this.GET(FilterData, function(res,error){
                // res => {
                    let searchuserdata = res.data.errMsg[0];
                    console.log("Searchable data",searchuserdata);
                    var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].totalCount
                    console.log('Page Length:',totalCount)
                    this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                    console.log("Check Page length",this.pageLength);

                    this.userDataList=[];
                    for(let i = 0;i<searchuserdata.length;i++){

                        let DB_strct = {};
                        DB_strct.primary_email = this.checkValidity(searchuserdata[i].primary_email)
                        DB_strct.mobile_no = this.checkValidity(searchuserdata[i].mobile_no)
                        DB_strct.first_name = this.checkValidity(searchuserdata[i].first_name)
                        DB_strct.last_name = this.checkValidity(searchuserdata[i].last_name)
                        DB_strct.agent_id = this.checkValidity(searchuserdata[i].agent_id)
                        DB_strct.branchName = searchuserdata[i].branchCode  === null ? '-' : searchuserdata[i].branchCode.branchName
                        DB_strct.RM_first_name = searchuserdata[i].reporting_manager === null ? '-' : searchuserdata[i].reporting_manager.first_name
                        DB_strct.slectStatus =this.checkValidity(searchuserdata[i].slectStatus)
                        DB_strct.branchCode = searchuserdata[i].branchCode === null ? '-' : searchuserdata[i].branchCode.branchCode
                        DB_strct.channelName = searchuserdata[i].channelCode === null ? '-' : searchuserdata[i].channelCode.channelName
                        DB_strct.hierarchyName = searchuserdata[i].hierarchy_id === null ? '-' : searchuserdata[i].hierarchy_id.hierarchyName
                        DB_strct.roleCode = searchuserdata[i].roleCode === null ? '-' : searchuserdata[i].roleCode.roleCode
                        DB_strct.fullobj = searchuserdata[i]

                        this.userDataList.push(DB_strct)
                        console.log("Final Array",this.userDataList);
                    }
            })

        },
        loadData(data){
            console.log("Changes", data)
            //    this.getUserData()
        },
         // this function is used to get Activity Upload Lead details from API with paginatin @Ashraf Khan =====  date:2/4/2019
        GetUserData(e){
            this.Userskip =e
            console.log("Page skip",this.Userskip)
            var user = this.$store.state.userId

            // axios.get(this.API_Service()+'getmyAttendance/'+user+'?sortBy=604800000&skip='+this.Userskip).then(
            this.GETUSER('getmyAttendance/'+user+'?sortBy=604800000&skip='+this.Userskip, function(res,error){
                // res => {
                    this.UserData = res.data.errMsg[0]
                    // var pageLen = res.data.errMsg[1]
                    // let totalCount = pageLen[0].totalCount
                    // console.log('User Atten REPONSE:',this.UserData)
                    // console.log('Page Length:',totalCount)
                    // this.pageLength = Math.ceil(totalCount/10)
                }
            ).catch(
                err => {
                    console.log(err) ;
                }
            );

        },
        next(e){
            let skipdata = e - 1
            console.log('Page Number',skipdata)
            if(skipdata === 0 ){
                this.skip = 0
            }else{
                this.skip = this.skipdiffrence*skipdata
            }
            this.getuserdatareporting(this.channeldatafilter,this.skip)
        },
        // End here Pagination function

        saveID(dat){
            console.log('User Data')
            console.log('User Data',dat._id)
            this.$store.commit('SAVE_INDIVIDID',dat._id)
            this.$router.push('/userattendance')
        },

        getrole(chanel, cb = null){
            // axios.get(this.API_Service_admin()+'getrole?userId='+this.getAgentInfo()._id+'&channelCode='+chanel).then(
            // res => {
                this.GET('getrole?userId='+this.getAgentInfo()._id+'&channelCode='+chanel , function(res,error){
                let roledata = res.data.errMsg[0]
                for(let i=0;i<roledata.length;i++){
                    if(roledata[i].active === 1){
                        let data = {
                            text : roledata[i].roleName,
                            value : roledata[i]._id,
                        }
                        this.itemsRole.push(data)
                    }
                }
                if (typeof cb === 'function') {
                    cb();
                }
            });
        },
        cancelStepper(){
            this.steps=1
            this.dialog = false
            this.dialogBulkUpld = false
            this.getuserdatareporting( this.channelFilter,this.skip);
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
            console.log("Event is",e.target.value)
            this.split  = e.target.value
            console.log("array is",this.split)
            this.fileLink = e.target.value
            this.excelfilename= e.target.files[0].name
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
                    }else {
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
                }else {
                    // this.vSnackBar("error","This browser does not support HTML5.");
                }
            } else {
                // this.vSnackBar("error","Please upload a valid Excel file.");
            }
        },
        handleFileUpload(event){
            console.log('My Event ', event);
            if(event.target.files.length > 0){
                this.showLoader('Uploading', true);
                if (event.target.files[0].type.split("/")[0] == "image") {
                    this.editedItem.profileImagetype = event.target.files[0];
                    this.editedItem.profileImagename = this.editedItem.profileImagetype.name;
                    /**
                     * Whole File object. Which is send through upload API
                     */
                    let sendFile = this.editedItem.profileImagetype;
                    this.submitFile(sendFile);     // Function which handle, upload functionality
                } else {
                    this.showToast('You can\'t upload this file type from here', this.TOST().WARNING);
                }
            } else {
                this.showToast('Please, select file first', this.TOST().INFO);
            }
        },

        submitFile(sendFile) {
            let _this = this;
            // The first thing we need to do is implement a FormData object like this:
            let formData = new FormData();

            /**
             * Next, what we will do is append the file to the formData.
             * This is done through the  append() method on the object:
             * FormData.append() – Web APIs | MDN. What we are doing is essentially
             * building a key-value pair to submit to the server like a
             * standard POST request:
             */

            // formData.append('file', sendFile);
            // Change for multer
            formData.append('media_upload', sendFile);

            // Upload API
            // axios.post(_this.API_Service_admin()+'uploadFile', formData, {
            //     headers: {  'Content-Type': 'multipart/form-data' }
            // })
              this.POST('uploadFile',formData , (res , error) => {
            // .then(function(res){
                _this.showLoader('Uploading', false);
                   if(res.data.errMsg.fileType == 'jpg' || res.data.errMsg.fileType == 'jpeg'
                    || res.data.errMsg.fileType == 'png') {
                        _this.profileImages.respFileName = res.data.errMsg.fileName;
                        _this.profileImages.respFileType = res.data.errMsg.fileType;
                    }

                if ('fileName' in res.data.errMsg) {
                    _this.showToast('File uploaded successfully', _this.TOST().SUCCESS);
                    _this.showLoader('Uploading', false);
                } else {
                    _this.showToast('Uploading process intrupted', _this.TOST().ERROR);
                    _this.showLoader('Uploading', false);
                }
            })
            .catch(function(error){
                _this.showLoader('Uploading', false);
                console.log('Catch Error : ', error );
                _this.showToast('Something goes wrong during uploading', _this.TOST().ERROR);
            });
        },

        // for profile image
        onFileChange(e){
            //TESY CODE
            let selectedFiles = event.target.files || event.dataTransfer.files
            this.imageList = []
            for(var i =0; i < selectedFiles.length;i++){
                this.imageList.push(selectedFiles[i]);
            }
            if (!this.imageList.length) {
                return
            }
            this.createImage(this.imageList)
            this.imgact = true;
        },
        createImage (file) {
            this.tableShow = true;
            console.log(file)
            this.fileName = file[0].name
            for (var i = 0; i < file.length; i++) {
                console.log(file.length)
                var fileReader = new FileReader()
                // var vm = this
                fileReader.addEventListener('load', () => {
                    this.imageUrlList=fileReader.result
                    console.log(i,this.imageUrlList)
                })
                fileReader.readAsDataURL(file[i])
                this.imageList = file[i]
            }
            console.log(this.imageUrlList)
        },

        reporingdataarray(e){
            console.log("inside E on reporting manager select", e);
            // Hierarchy is is coming from hierarchy API where hierarchy_id has to be object
            this.finalreporingdata=[]
            let filteruserreport = this.userreportinghierarchy.map(ep =>{
                if(ep.hierarchyid == e){
                    return ep;
                }
                // console.log("The filtered from MAP reportings manager",this.finalreporingdata)
            });
            for(let i = 0; i < filteruserreport.length; i++){
                if(filteruserreport[i] !== undefined){
                    this.finalreporingdata.push(filteruserreport[i]);
                    // console.log("The filtered from FOR LOOP reportings manager",this.finalreporingdata)
                }
            }

            //re99

            for(let i = 0;i < this.finalreporingdata.length;i++){
                if(this.finalreporingdata[i].user_id === this.fnamecheck){
                    this.finalreporingdata.splice(i, 1)
                }
            }
            // var keyis = this.finalreporingdata.findIndex(element => element.user_id == this.fnamecheck )
            // console.log('key is ->', keyis)
            // this.finalreporingdata.splice(keyis, 1)
            // console.log('After splice >>', this.finalreporingdata)

            this.editedItem.reportingManager= this.finalreporingdata[0];
            if(this.finalreporingdata == null || this.finalreporingdata == "" || this.finalreporingdata == undefined){
                var unassigned = "Unassigned";
                let Unassigned = {
                    username: "Unassigned",
                    user_id: "unassigned"
                }
                this.finalreporingdata.push(Unassigned);
                console.log("***NO DATA FOUNND IN SECOND FIELD*** and can be unassigned");
            }
           
        },
        getuserdatareporting(e,skip){
            console.log("CLONE FUNCTION");
            console.log("Event is",e,skip)
            let user =this.$store.state.userId
            let FilterData
            if(e === 'all'){
                this.userDataList =[];
                FilterData = this.API_Service_admin()+'getallAgent?user_id='+this.getAgentInfo()._id+'&skip='+skip
                console.log("TRUE",FilterData)
            }else{
                this.userDataList =[];
                FilterData = this.API_Service_admin()+'getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip
                console.log("FALSE",FilterData)
            }
            this.finalreporingdata.push(Unassigned);
            console.log("***NO DATA FOUNND IN SECOND FIELD*** and can be unassigned");

        },
        getuserdatareporting(e,skip){
            console.log("OGG FUNCTION");
            console.log("Event is",e,skip)
            let user =this.$store.state.userId
            let FilterData
            if(e === 'all'){
                this.userDataList =[];
                FilterData = this.API_Service_admin()+'getallAgent?user_id='+this.getAgentInfo()._id+'&skip='+skip
                console.log("TRUE",FilterData)
            }else{
                this.userDataList =[];
                FilterData = this.API_Service_admin()+'getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip
                console.log("FALSE",FilterData)
            }

            //  axios.get(FilterData).then(
                //    axios.get(this.API_Service_admin()+'getallAgent?user_id='+user).then(
            //    res => {
                    this.GET(FilterData, function(res,error){
                    console.log('xyz :',res.data.errMsg[0]);
                    res.data.errMsg[0].forEach(element => {
                        element.slectStatus = '';
                    });

                    this.userreportinghierarchy=[];
                    this.allAgentdata = res.data.errMsg[0]
                    var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].totalCount
                    console.log('Page Length:',totalCount)
                    this.pageLength = Math.ceil(totalCount/this.skipdiffrence)

                    console.log("Check Page length",this.pageLength);
                    console.log('User REPONSE',this.allAgentdata)

                    for( var i=0; i < this.allAgentdata.length; i++){
                        if(this.allAgentdata[i].active === 1){
                            this.allAgentdata[i].slectStatus = 'Active';
                            if(this.allAgentdata[i].active === 1){
                            let userreportingdata ={
                                hierarchyname:this.allAgentdata[i].hierarchy_id === null ? '-' : this.allAgentdata[i].hierarchy_id.hierarchyName || "",
                                hierarchyid:this.allAgentdata[i].hierarchy_id === null ? '-' : this.allAgentdata[i].hierarchy_id._id || "",
                                username:this.allAgentdata[i].first_name || "" +' '+this.allAgentdata[i].last_name || "",
                                user_id:this.allAgentdata[i]._id,
                            }
                            this.userreportinghierarchy.push(userreportingdata)
                            }
                        }else{
                            this.allAgentdata[i].slectStatus = 'InActive'
                        }
                    }
                    console.log("reporting data object =====>>>>>>",this.userreportinghierarchy)

                    for(let j = 0; j < this.allAgentdata.length; j++){
                        // SORTING Code for Table Data
                        this.userDB = {};
                        this.userDB.primary_email = this.checkValidity(this.allAgentdata[j].primary_email)
                        this.userDB.mobile_no = this.checkValidity(this.allAgentdata[j].mobile_no)
                        this.userDB.first_name = this.checkValidity(this.allAgentdata[j].first_name)
                        this.userDB.last_name = this.checkValidity(this.allAgentdata[j].last_name)
                        this.userDB.agent_id = this.checkValidity(this.allAgentdata[j].agent_id)
                        this.userDB.branchName = this.allAgentdata[j].branchCode  === null ? '-' : this.allAgentdata[j].branchCode.branchName
                        this.userDB.RM_first_name = this.allAgentdata[j].reporting_manager === null ? '-' : this.allAgentdata[j].reporting_manager.first_name
                        this.userDB.slectStatus =this.checkValidity(this.allAgentdata[j].slectStatus)
                        this.userDB.branchCode = this.allAgentdata[j].branchCode === null ? '-' : this.allAgentdata[j].branchCode.branchCode
                        this.userDB.channelName = this.allAgentdata[j].channelCode === null ? '-' : this.allAgentdata[j].channelCode.channelName
                        this.userDB.hierarchyName = this.allAgentdata[j].hierarchy_id === null ? '-' : this.allAgentdata[j].hierarchy_id.hierarchyName
                        this.userDB.roleCode = this.allAgentdata[j].roleCode === null ? '-' : this.allAgentdata[j].roleCode.roleCode
                        this.userDB.fullobj = this.allAgentdata[j]
                        this.userDataList.push(this.userDB)

                        console.log('User LISting >',this.userDataList)
                    }
                }
            ).catch(
                err => {
                    console.log(err) ;
                }
            );

            this.GET('users_count/'+this.getAgentInfo()._id, res => {
            console.log("From component before sending to emit",res.data.errMsg);
            // let WholeCount = res.data.errMsg;
            // this.Activeuser = WholeCount.active_users
            // this.inactivuser = WholeCount.inactive_users
            // this.Totaluser = WholeCount.total_users
            // console.log('WCount', this.inactivuser);
            this.$emit('sendtrigger', res.data.errMsg)
            }).then(resp => {
                    console.log("THEN->", resp)
            })
        },

        checkValidity(data) {
            // console.log('Validity Data', data);
            if (data == "" || data == "undefined"|| data == undefined || data == null || data == '' || data == 'Invalid Date') {
                return "-"
            } else {
                return data;
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
            let res =[]
            console.log("JSON IS",result)
            for(let i = 0;i<result.length;i++){
                if(result[i].accessOpt !== '')
                {
                    res.push(result[i])
                }
            }
            this.showToast('File Uploaded Successfully','success')
            let Str = JSON.stringify(res)
            //   let StrParse = JSON.parse(Str)
            this.bulkData = Str
            console.log("Final JSON is",this.bulkData)
        },
        dialogBulkUpldFun(){
            // this.dialogBulkUpld = false
            console.log("Dialog Open", this.dialogBulkUpld)

           this.dialogBulkUpld = true
                 console.log("Dialog Open", this.dialogBulkUpld)
        },
        goUserNxt(){
            console.log("Data is",this.bulkData)
            const formData={
                userJSON :this.bulkData
            }

            // axios.post(this.API_Service_admin()+'agent_bulk_upload/'+this.getAgentInfo()._id,formData).then(
              this.POST('agent_bulk_upload/'+this.getAgentInfo()._id,formData , (res , error) => {
              
                // res=>{
                if(res.data.errCode==-1){
                    //  console.log("Response is",res)
                    this.showToast('File uploaded successfully', this.TOST().SUCCESS);
                    this.steps = 2
                    this.sucessCount = res.data.errMsg.success
                    this.failCount = res.data.errMsg.failed
                    this.errorLink = res.data.errMsg.link
                }else{
                    this.showToast('Error while uploading User Data', this.TOST().ERROR);
                }
            })
        },
        selectStatus(){
            this.statusIndex = this.userstatus.indexOf(this.editedItem.slectStatus)
            console.log('select==>',this.statusIndex)

        },
        chanel(e){
            console.log("change data",e)
        },

        saveAndEdit(_btnname){
            if(_btnname == 'Add' ){
                this.save();
            }else if(_btnname == 'Update'){
                this.updateUser();
            }
        },

        addUser(){
            // This line will reset the validations that happened earlier on dirty and touch blur events
            this.$v.$reset();
            this.btnname='Add';
            console.log("popup form error->", this.emailErrors);
            // console.log("AGENT ID",this.allAgentdata[0].agent_id)
            // let str = this.allAgentdata[0].agent_id.split('AG');
            // console.log("Split is",(str[1]))
            // let intStr = parseInt(str[1])+1;
            let random_agent_id = 'AG'+this.generateRandomCode().toUpperCase();

            this.finalreporingdata=[]
            this.editedItem.primaryEmail ='',
            this.editedItem.mobileno ='',
            this.editedItem.firstName = '',
            this.editedItem.lastName = '',
            this.editedItem.agentId = random_agent_id,
            // this.editedItem.passwrd = '',
            this.editedItem.branchCode = '',
            this.editedItem.reportingManager = '',
            this.editedItem.reportinmanagerhierarchy = '',
            this.editedItem.slectStatus = '',
            this.editedItem.branchcode = '',
            this.editedItem.channelcode = '',
            this.editedItem.rolecode = '',
            this.editedItem.heirarchy = '',
            this.editedItem.branch = '',
            this.editedItem.reportingBranchcode = '',
            this.editedItem.channelname ='',
            this.editedItem.bank='',
            this.editedItem.designation='',
            this.editedItem.nationality='',
            this.editedItem.state='',
            this.editedItem.city='',
            this.editedItem.address1='',
            this.editedItem.address2='',
            this.editedItem.postalCode='',
            this.editedItem.secMobileNo='',
            this.editedItem.secEmail='',
            this.editedItem.bankName='',
            this.editedItem.ifscCode='',
            this.editedItem.bankState='',
            this.editedItem.bankCity='',
            this.editedItem.branchName='',
            this.editedItem.accNo='',
            this.editedItem.nameAccHolder='',
            this.imageUrlList='',
            this.panelBasic=[true,false,false],
            this.dialog=true;
            this.channeldatalist();
            // this.branchlist();
            this.changeFil('')
            // this.editedItem.channelname !== '' ? this.showChannelDependFields = true : '';

        },
        branchlist(chn, cb = null) {
            // axios.get(this.API_Service_admin() + 'getbranch?created_by='+this.getAgentInfo()._id+'&branchfilter=All&channelCode=' + chn)
            this.GET('getbranch?created_by='+this.getAgentInfo()._id+'&branchfilter=All&channelCode=' + chn , function(res,error){
                // .then(res => {
                    this.branchArray = [];
                    this.Branchlistdata = [];
                    let branchArr = res.data.errMsg[0];
                    this.Branchlistdata = branchArr
                    for (var i = 0; i < branchArr.length; i++) {
                        //    if(branchArr[i].active === 1){
                        let brdata = {
                            text: branchArr[i].branchName,
                            value: branchArr[i]._id,
                            //    bankname:branchArr[i].bankm_id.bankName,
                            //    bankid:branchArr[i].bankm_id._id
                        }
                        this.branchArray.push(brdata);
                    }

                    if (typeof cb === 'function') {
                        cb();
                    }
                })
        },
        Getdesignation(chn, cb = null){
            // axios.get(this.API_Service_admin()+'getDesignationMaster?userId='+this.getAgentInfo()._id+'&channelCode='+chn).then(
                this.GET('getDesignationMaster?userId='+this.getAgentInfo()._id+'&channelCode='+chn , function(res,error){
                // res => {
                    this.responcedesignation = res.data.errMsg[0]
                    console.log("designation responce",this.responcedesignation);

                    this.designationdata=[];
                    for(let i=0;i<this.responcedesignation.length;i++){
                        if(this.responcedesignation[i].active === 1){
                        //   let heirarchymap = {
                        //       text:this.responcedesignation[i].hierarchyId.hierarchyName,
                        //       value:this.responcedesignation[i].hierarchyId._id
                        //   }
                        //   this.selectheirarchy.push(heirarchymap)
                        //   let rolemap ={
                        //       text:this.responcedesignation[i].roleId.roleName,
                        //       value:this.responcedesignation[i].roleId._id
                        //   }
                        //   this.selectrole.push(rolemap)

                        let desigdata={
                            text:this.responcedesignation[i].designatioName,
                            value:this.responcedesignation[i]._id
                        }
                        this.designationdata.push(desigdata)
                        }
                    }
                    if (typeof cb === 'function') {
                        cb();
                    }
            });
        },
        channeldatalist(cb) {
            let chaneldata = this.$store.state.chanelDetails;
            this.channeltxtarray = []
            loadChannel.getChannel(this, res => {

                for (let i = 0; i < res.length; i++) {
                    if (res[i].active === 1) {
                        let channetobj = {
                            text: res[i].channelName,
                            value: res[i]._id
                        }
                        this.channeltxtarray.push(channetobj);          // this channel array is for data filteration
                        this.channeltxtDialog.push(channetobj)          // this is for dailogue drop down
                        //   console.log("chanel details",this.channeltxtDialog)
                    }
                }
                let alldata = {
                    text: 'All',
                    value: 'all',
                }

                this.channeltxtarray.unshift(alldata);

                if (typeof cb === 'function') {
                    cb();
                }
            });
        },
        editItem (items, index) {
            this.showLoader('Loading',  true);
            console.log('DATA LIST : ', items);
            this.fnamecheck = items.fullobj._id
            let self = this;

            this.channeldatalist(() => {
                self.changeFil(items.fullobj.channelCode._id, function(code) {
                    if (code === '1') {
                        self.reporingdataarray(items.fullobj.reporting_manager_hirarchy);
                            // this.finalreporingdata = filteruserreport
                        console.log("reporting manager list finnal", self.finalreporingdata)
                        self.designationselect(items.fullobj.designation);

                        let user_Id = self.allAgentdata[index]._id
                        console.log(user_Id, 'USER ID on Edit is <=== ');

                        // axios.get(self.API_Service() + 'getuserDetails?user_id=' + user_Id).then(
                        //     res => {
                        //         self.usrdetails = res.data.errMsg;
                        //     }
                        // ).catch(
                        //     err => {
                        //         console.log(err);
                        //     }
                        // );

                        var itemsUser = items;
                        console.log("NEW USER ITEM IS::",itemsUser)

                        self.editItem.agent_id = user_Id; /// agent _id
                        self.editItem.editUser_id = itemsUser.fullobj._id
                        self.editedItem.primaryEmail = itemsUser.fullobj.primary_email
                        self.editedItem.firstName = itemsUser.fullobj.first_name
                        self.editedItem.lastName = itemsUser.fullobj.last_name
                        self.editedItem.agentId = itemsUser.fullobj.agent_id
                        //   self.editedItem.passwrd = itemsUser.fullobj.password
                        self.editedItem.branch = itemsUser.fullobj.branchCode.branchCode 
                        //   console.log("data edited branch name",self.editedItem.branch)
                        self.editedItem.mobileno = itemsUser.fullobj.mobile_no
                        self.editedItem.reportingManager = itemsUser.fullobj.reporting_manager._id
                        self.editedItem.slectStatus = itemsUser.fullobj.slectStatus
                        self.editedItem.branchcode = itemsUser.fullobj.branchCode
                        self.editedItem.channelcode = itemsUser.fullobj.channelCode
                        //   self.editedItem.rolecode = itemsUser.fullobj.roleCode.roleCode
                        self.editedItem.channelname = itemsUser.fullobj.channelCode._id
                        //  console.log('CHANNELELELELE_22',self.editedItem.channelname)

                        //   self.editedItem.heirarchy = itemsUser.fullobj.hierarchy_id._id
                        // console.log("HIERARCHY ::::::: " , itemsUser.fullobj.hierarchy_id._id);
                        self.setHierarchy(itemsUser.fullobj.hierarchy_id._id);
                        // console.log("ROLES ::::::: " , itemsUser.fullobj.roleCode.roleCode);
                        self.setRole(itemsUser.fullobj.roleCode.roleCode);

                        self.editedItem.reportinmanagerhierarchy = itemsUser.fullobj.reporting_manager_hirarchy
                        self.editedItem.bank=itemsUser.fullobj.branchCode.bankm_id
                        self.editedItem.designation=itemsUser.fullobj.designation
                        self.editedItem.nationality=itemsUser.fullobj.country
                        self.editedItem.state=itemsUser.fullobj.state
                        self.editedItem.city=itemsUser.fullobj.city
                        self.editedItem.address1=itemsUser.fullobj.address
                        self.editedItem.address2=itemsUser.fullobj.address_line_2
                        self.editedItem.postalCode=itemsUser.fullobj.pincode
                        self.editedItem.secMobileNo=itemsUser.fullobj.secondary_mobile_no
                        self.editedItem.secEmail=itemsUser.fullobj.secondary_email
                        self.editedItem.bankName=itemsUser.fullobj.bankName
                        self.editedItem.ifscCode=itemsUser.fullobj.IFSC_Code
                        self.editedItem.bankState=itemsUser.fullobj.bankState
                        self.editedItem.bankCity=itemsUser.fullobj.bankCity
                        self.editedItem.branchName=itemsUser.fullobj.bankBranchName
                        self.editedItem.accNo=itemsUser.fullobj.accountNo
                        self.editedItem.nameAccHolder=itemsUser.fullobj.accountHolderName
                        //   this.editedItem.reportingBranchcode = itemsUser.reportingBranchCode
                        console.log("Channel Drop List : " , self.channeltxtDialog);
                        console.log("Designation Drop List : " , self.designationdata);
                        console.log("Branch Drop List : " , self.branchArray);
                        console.log("Hierarchy Drop List : " , self.selectheirarchy);
                        console.log("Role Drop List : " , self.selectrole);
                        console.log("Reporting Manager Hierarchy Drop List : " , self.heirarchydatalists);
                        console.log("Reporting Manager Drop List : " , self.finalreporingdata);
                        console.log("Dailogue Form : " , self.editedItem);

                        self.TableIndex = index;
                        self.btnname = 'Update';
                        self.showLoader('Loading',  false);
                        self.dialog = true;

                    }
                });
            });

            // console.log("binded Items +++++>>>>",items)
            //    for(let i = 0; i<this.responcedesignation.length; i++){
            //     //  if(desigid === this.responcedesignation[i]._id){
            //           let heirarchymap = {
            //               text:this.responcedesignation[i].hierarchyId.hierarchyName,
            //               value:this.responcedesignation[i].hierarchyId._id
            //           }
            //           this.selectheirarchy.push(heirarchymap)

            //           let rolemap ={
            //               text:this.responcedesignation[i].roleId.roleName,
            //               value:this.responcedesignation[i].roleId._id
            //           }
            //           this.selectrole.push(rolemap)

            //         //   this.editedItem.heirarchy = this.responcedesignation[0].hierarchyId._id
            //           console.log("hierarch data",heirarchymap);

            //           let rolemap ={
            //               text:this.responcedesignation[i].roleId.roleName,
            //               value:this.responcedesignation[i].roleId._id
            //           }
            //           this.selectrole.push(rolemap)

                    //   this.rolecode = this.responcedesignation[i].roleId._id
                    //   this.editedItem.rolecode = this.responcedesignation[0].roleId._id;
                    //   console.log("Role data",this.rolecode)

                    // }
            // }
        },

        updateUser(items){
            let self = this;
            let Agent_Id = this.editItem.editUser_id;

            // console.log(Agent_Id,' PUT USER ID')
            //      this.$v.$touch()
            //         console.log(this.$v)
            //     if (this.$v.$invalid == true) {
            // }
            // else{
            let usercode = null;
            //  console.log("active status",this.editedItem.slectStatus)
            if(this.editedItem.slectStatus === "InActive") {

                usercode = 0;
            } else if(this.editedItem.slectStatus === "Active") {
                usercode = 1;
            }

            console.log('User Id : ' + Agent_Id);

            this.PUT( 'v2/updateAgent?user_id=',+ this.agentID,
           {
                // primary_email:self.editedItem.primaryEmail,
                first_name:self.editedItem.firstName,
                last_name:self.editedItem.lastName,
                //   agent_id:self.editedItem.agentId,
                //   password:self.editedItem.passwrd,
                mobile_no:self.editedItem.mobileno,
                branchCode:self.editedItem.branch,
                reporting_manager:self.editedItem.reportingManager,
                active:usercode,
                //   channelCode:self.editedItem.channelcode,
                // channelCode:self.editedItem.channelname,
                roleCode:self.editedItem.rolecode,
                hierarchy_id:self.editedItem.heirarchy,
                reporting_manager_hirarchy:self.editedItem.reportinmanagerhierarchy,
                //   bankm_id:'5c5d25b9272c0a29879a97d9',
                designation:self.editedItem.designation,
                profile_pic:self.profileImages.respFileName,
                //   user_Id:self.Agent_Id,
                user_Id: self.editItem.agent_id,
                secondary_mobile_no:self.editedItem.secMobileNo,
                country:self.editedItem.nationality,
                city:self.editedItem.city,
                state:self.editedItem.state,
                address:self.editedItem.address1,
                address_line_2:self.editedItem.address2,
                pincode:self.editedItem.postalCode,
                secondary_email:self.editedItem.secEmail,
                documentMasterId:self.docMasterId,
                accountHolderName:self.editedItem.nameAccHolder,
                accountNo:self.editedItem.accNo,
                bankState:self.editedItem.bankState,
                bankCity:self.editedItem.bankCity,
                // branchName:self.editedItem.branchName,
                bankBranchName:self.editedItem.branchName,
                bankName:self.editedItem.bankName,
                IFSC_Code:self.editedItem.ifscCode,
            },(res , error) => {

            // axios.put(this.API_Service_admin()+'v2/updateAgent?user_id='+ this.agentID,{
            //     // primary_email:self.editedItem.primaryEmail,
            //     first_name:self.editedItem.firstName,
            //     last_name:self.editedItem.lastName,
            //     //   agent_id:self.editedItem.agentId,
            //     //   password:self.editedItem.passwrd,
            //     mobile_no:self.editedItem.mobileno,
            //     branchCode:self.editedItem.branch,
            //     reporting_manager:self.editedItem.reportingManager,
            //     active:usercode,
            //     //   channelCode:self.editedItem.channelcode,
            //     // channelCode:self.editedItem.channelname,
            //     roleCode:self.editedItem.rolecode,
            //     hierarchy_id:self.editedItem.heirarchy,
            //     reporting_manager_hirarchy:self.editedItem.reportinmanagerhierarchy,
            //     //   bankm_id:'5c5d25b9272c0a29879a97d9',
            //     designation:self.editedItem.designation,
            //     profile_pic:self.profileImages.respFileName,
            //     //   user_Id:self.Agent_Id,
            //     user_Id: self.editItem.agent_id,
            //     secondary_mobile_no:self.editedItem.secMobileNo,
            //     country:self.editedItem.nationality,
            //     city:self.editedItem.city,
            //     state:self.editedItem.state,
            //     address:self.editedItem.address1,
            //     address_line_2:self.editedItem.address2,
            //     pincode:self.editedItem.postalCode,
            //     secondary_email:self.editedItem.secEmail,
            //     documentMasterId:self.docMasterId,
            //     accountHolderName:self.editedItem.nameAccHolder,
            //     accountNo:self.editedItem.accNo,
            //     bankState:self.editedItem.bankState,
            //     bankCity:self.editedItem.bankCity,
            //     // branchName:self.editedItem.branchName,
            //     bankBranchName:self.editedItem.branchName,
            //     bankName:self.editedItem.bankName,
            //     IFSC_Code:self.editedItem.ifscCode,
            // }).then(
            //     res => {
                    //  console.log('UPDATE RESPONSE',res.data.errMsg);
                    if(res.data.errCode == -1){
                        this.showToast('User Edited successfully','success')
                        self.usrputdetails = res.data.errMsg;
                        console.log('UPDATE RESPONSE After',self.usrputdetails);
                        self.dialog = false  ;
                        this.channeldatafilter = 'all'
                        this.skip=0
                        this.getuserdatareporting(this.channeldatafilter,this.skip);
                    }
                }
            ).catch(
                err => {
                    console.log(err) ;
                }
            );
        },

        deleteItem(index) {
            this.allAgentdata.splice(index, 1)
        },

        heirarchydatalist(chn, cb = null) {
            this.user_id = this.$store.state.agentDetails._id
            this.heirarchydatalists = [];
            // axios.get(this.API_Service_admin() + 'getHierarchy?userId=' + this.user_id + '&channelCode=' + chn).then(
            this.GET('getHierarchy?userId=' + this.user_id + '&channelCode=' , function(res,error){
                // res => {
                    if(res.data.errMsg[0].length == 0){
                        console.log("Its empty!",res.data.errMsg[0].length);
                        this.editedItem.reportinmanagerhierarchy = "Unassigned";
                        this.editedItem.reportingManager = "Unassigned";
                        let heirarchydata = {
                            text: "Unassigned",
                            value: "unassigned"
                        }
                        console.log("Reporting manager ->",this.userreportinghierarchy )
                        this.heirarchydatalists.push(heirarchydata);
                    }else{
                        console.log("Running regular functions as length > 0");
                        let herarchyresp = res.data.errMsg[0]
                        console.log("heirarchy data", herarchyresp)
                        for (let i = 0; i < herarchyresp.length; i++) {
                            if (herarchyresp[i].active === 1) {
                                let heirarchydata = {
                                    text: herarchyresp[i].hierarchyName,
                                    value: herarchyresp[i]._id
                                }
                                this.heirarchydatalists.push(heirarchydata)
                            }
                        }
                        if (typeof cb === 'function') {
                            cb();
                        }
                    }
            });
        },

        close () {
            this.editedItem = JSON.parse(JSON.stringify(duplicate_edit_item));
            this.editedIndex = -1;
            this.channeltxtDialog = [];
            this.designationdata = [];
            this.branchArray = [];
            this.selectheirarchy = [];
            this.selectrole = [];
            this.heirarchydatalists = [];
            this.finalreporingdata = [];
            this.dialog = false;
            // setTimeout(() => {
            //     this.editedItem = Object.assign({}, this.defaultItem)
            //     this.editedIndex = -1
            // }, 300)
        },

        save(){
            this.$v.$touch()
            //    console.log(this.$v)
        if (this.$v.$invalid == true) {
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                console.log("Form has errors")
        }
        else
        {

            let self = this;
            // Post API hit
            // console.log('CHANEL NAME',this.editedItem.channelName),
            console.log('Active InActive ::: ',this.editedItem.slectStatus);
            let usercode = null;
            if(this.editedItem.slectStatus === "InActive") {
                usercode = 0;
            } else if(this.editedItem.slectStatus === "Active") {
                usercode = 1;
            }
            let senduserData = {
                primary_email:self.editedItem.primaryEmail,
                first_name:self.editedItem.firstName,
                last_name:self.editedItem.lastName,
                agent_id:self.editedItem.agentId,
                //   password:self.editedItem.passwrd,
                mobile_no:self.editedItem.mobileno,
                //   confirm_password:self.editedItem.passwrd,
                branchCode:self.editedItem.branch,
                reporting_manager:self.editedItem.reportingManager,
                active:usercode,
                //   channelCode:self.editedItem.channelcode,
                roleCode:self.editedItem.rolecode,
                channelCode:self.editedItem.channelname,
                hierarchy_id:self.editedItem.heirarchy,
                reporting_manager_hirarchy:self.editedItem.reportinmanagerhierarchy,
                //   bankm_id:"5c5d25b9272c0a29879a97d9",
                designation:self.editedItem.designation,
                profile_pic:self.profileImages.respFileName,
                user_Id:self.user_id,
                secondary_mobile_no:self.editedItem.secMobileNo,
                country:self.editedItem.nationality,
                city:self.editedItem.city,
                state:self.editedItem.state,
                address:self.editedItem.address1,
                address_line_2:self.editedItem.address2,
                pincode:self.editedItem.postalCode,
                secondary_email:self.editedItem.secEmail,
                documentMasterId:self.docMasterId,
                accountHolderName:self.editedItem.nameAccHolder,
                accountNo:self.editedItem.accNo,
                bankState:self.editedItem.bankState,
                bankCity:self.editedItem.bankCity,
                branchName:self.editedItem.branchName,
                bankName:self.editedItem.bankName,
                IFSC_Code:self.editedItem.ifscCode,
            }
            console.log('FORMDATA on ADD : ', senduserData);
            // console.log(self.editedItem.reportingManager,'REPORTING MANAGER')
            // axios.post(this.API_Service_admin()+'v3/addagent/',senduserData).then(
              this.POST('v3/addagent/',senduserData , (res , error) => {            
                // res => {
                    // console.log('RESPONSE', res.data.errMsg);
                    if(res.data.errCode == -1){
                        let dataResp = res.data.errMsg;
                        this.showToast('User Created successfully','success')
                        // console.log('Type of Property : ', typeof(dataResp));
                        // console.log('USER DETAILS', dataResp);
                        this.channeldatafilter='all'
                        this.skip=0
                        this.dialog = false;
                        this.getuserdatareporting(this.channeldatafilter,this.skip);

                    }else{
                        // let errorrespons = res.data.errMsg;
                        // console.log("Error Messasge",errorrespons)
                        this.showToast('E-mail or mobile number already exists','error')
                    }
                }
            ).catch(
                err => {
                    console.log(err) ;
                }
            );
          }
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
.height-image{
    height: 140px;
    width:140px;
}
.uploadimage{
  height: 70px;
    width:70px;
}
.selectfile {
        opacity: 0;
        position: absolute;
        height: 100px;
        width:100px;
    }
    .sd-upload-img-sec {
        /* background-color: rgb(245, 245, 245); */
        height: 100px;
        border: 1px solid #E0E0E0;
    }
    .label-color {
        color: #9B9B9B;
        cursor: pointer;
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
.documt-normal-text-size-bulk {
        color: white;
        margin-left: 5px
    }
     @media screen and (min-width: 320px){
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
      }
</style>
