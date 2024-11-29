<template>
	<v-app>
		<v-card>
			<v-layout row wrap>
				<v-flex class="ml-1 mt-3" style="flex-flow:column wrap;width:100%;padding-right:13px">
					<v-text class="headline font-weight-bold">User Management (Recondrive)</v-text>
					<hr class="mt-2">
					<v-layout column>
						<v-flex justify-center md12 ml-3 mt-3>
							<v-layout row justify-space-between style="align-items:center">

								<v-btn round depressed medium slot="activator" dark color="#E46A25" @click="addUser()">add User
									<v-icon dark right>add_circle</v-icon>
								</v-btn>
								<!-- <v-menu transition="slide-y-transition">
									<v-btn round depressed medium slot="activator" dark color="#E46A25">add User
										<v-icon dark right>add_circle</v-icon>
									</v-btn>
									<v-list>
										<v-list-tile>
											<v-btn flat color="secondary" @click="addUser()">Single User</v-btn>
										</v-list-tile>
										<v-list-tile>
											<v-btn flat color="secondary" @click="openwindow">Bulk Upload</v-btn>
										</v-list-tile>
									</v-list>
								</v-menu> -->

					        <!-- <v-flex xs10 sm6 md2 class="" >
								  <v-btn class="" style="border-radius:65px;" :loading="dwld" :disabled="dwld"  @click="download_all" tile rounded dark color="#152F38">
                                        Download <v-icon right>cloud_download</v-icon>
                                   </v-btn>
							</v-flex> -->

								<!-- <v-layout row>
									<v-flex xs10 sm6 md4 class=" mt-4"></v-flex>
									<v-flex xs10 sm6 md4 class="mr-3 "> -->
											<!-- :error-messages="reporterrors" -->
										<!-- <v-select v-model="channelFilter"
												ref="ch_clr"
											
											@change="selectChnFilter" :items="channeltxtarray" item-text="text" item-value="value" label="Channel Name"></v-select>
									</v-flex>
									<v-flex xs10 sm6 md4 class="mr-3 ml-3">
										<v-text-field @change="Searchdatatable" v-model="value" @input="clearwhenempty" label="Search By First Name/Last Name/Employee Id" prepend-icon="search" height="30px" @click:clear="clearserchall"></v-text-field>
									</v-flex>
								</v-layout> -->
							</v-layout>
						</v-flex>
						<div class="cust-usr-tbl mt-3">
							<v-data-table :headers="headers" :items="getsuserdatatable" hide-actions class="elevation-1 usr-tbl-brdr ma-0 pa-0">
								<template slot="items" slot-scope="props">
								
					
									<td class="text-xs-left usr-td-bdrgt">{{props.item.FullName | to-capitlaize}}</td>
									
									<td class="text-xs-left usr-td-bdrgt">{{props.item.UserName | to-capitlaize}}</td>
									<td class="usr-td-bdrgt">
										<v-layout row>{{props.item.Password == null || props.item.Password == "" ? "-" : props.item.Password }}
											<v-spacer>
												<v-icon size="21px" @click="copy_clipboard(props.item.Password)">file_copy</v-icon>
											</v-spacer>
										</v-layout>
									</td>
									<td class="text-xs-left usr-td-bdrgt">{{props.item.EmailId}}</td>
									<td class="text-xs-left usr-td-bdrgt">{{props.item.PhoneNumber}}</td>
									<td class="usr-td-bdrgt">{{props.item.DefaultBankId}}</td>
									<td class="text-xs-left usr-td-bdrgt">{{props.item.Designation | to-capitlaize}}</td>
									<td class="text-xs-left text-no-wrap usr-td-bdrgt text-capitalize">{{props.item.DOB}}</td>
									<td class="usr-td-bdrgt"><span class="status" :style="{color: props.item.IsActive == 'Active' ? '#13961c' : '#d61111'}">{{props.item.IsActive}}</span>
									</td>
									<!-- <td class="text-xs-left text-no-wrap usr-td-bdrgt">{{props.item.channelName}}</td> -->
									<!-- <td class="text-xs-left">{{props.item.roleCode}}</td> -->
									
									<td class="justify-center px-0">
                                    	<v-icon  class="" small @click="editItem2(props.item)">edit</v-icon>
                                	</td>
										<!-- <td class="justify-center layout px-0">
										<v-menu transition="scale-transition">
											<v-btn icon class="mx-0" slot="activator">
												<v-icon color="grey">settings</v-icon>
											</v-btn>
											<v-list>
												<v-list-tile>
													<v-btn flat color="primary" @click="editItem(props.item,props.index)">Edit</v-btn>
												</v-list-tile> -->
												<!-- <v-list-tile>
													<v-btn flat color="primary" @click="deleteItem(props.item,props.index)">Delete</v-btn>
												</v-list-tile> -->

												<!-- <v-list-tile >
                                                    <v-btn flat color="primary" @click="resetPassword(props.item)">Reset Password</v-btn>
                                                </v-list-tile> -->
												<!-- </v-list>
										</v-menu>
									</td> -->

									<!-- <td class="">{{props.item.agent_id}}</td> -->
									<!-- <td class="text-xs-left">{{props.item.branchName}}</td> -->

									<!-- <td class="">{{props.item.attendanceCount}}</td> -->

									<!-- <td class="text-xs-left">{{props.item.branchCode}}</td> -->
									<!-- <td class="">{{props.item.reportingBranchCode}}</td> -->

								</template>
							</v-data-table>
							</div>
					</v-layout>
					<!-- SINGLE USER UPLOAD DIALOG -->
					<v-form v-model="valid" ref="form">
						<v-dialog v-model="dialog" persistent max-width="800px">
							<v-card>
								<v-flex style="background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
									<v-card-title class="subheading" style="color:#646666;font-family:roboto;font-weight:700">
										{{popupTitle}}
									</v-card-title>
								</v-flex>
								<v-card-text>
									<form @submit.prevent="saveAndEdit()">
										<v-container grid-list-md>
											<template>
												<!-- <v-expansion-panel v-model="panelBasic" expand> -->
												<!-- EXPANSION-PANEL 'BASIC DETAILS' -->
												<!-- <v-expansion-panel-content> -->
												<div slot="header" class="body-2" style="color:#646666;font-family:roboto;font-weight:700">Basic Details</div>
												<v-flex pa-3 class="grey lighten-5">
			
													<v-layout wrap>
														<!-- <v-flex xs12 sm6 md6>
															<v-text-field v-model="editedItem.emp_id" solo label="Employee ID" @blur="checkUserinChannel(editedItem.emp_id)" :rules="employeidvalidation" @input="fieldvalidation(editedItem.emp_id,'employeeid')" counter="10" maxlength="10" :append-icon="empcodeuse" required></v-text-field>
														</v-flex>
														<v-flex v-if="askfor_pre_populate" md6></v-flex>
														<v-flex md12 v-if="askfor_pre_populate">
															<v-card flat style="border-radius:5px;">
																<p style="padding:24px 5px; font-weight:500; font-size:15px; text-align:center;">Do you want to Pre-Populate Existing data for Basic, Contact and Bank Details?</p>
																<div style="display:flex; justify-content:center; align-items:center; padding-bottom:15px;">
																	<v-btn round color="primary" @click="populateit">
																		<v-icon>done</v-icon>
																		<v-spacer></v-spacer>Yes</v-btn>
																	<v-btn round @click="askfor_pre_populate = false">
																		<v-icon>highlight_off</v-icon>
																		<v-spacer></v-spacer>No</v-btn>
																</div>
															</v-card>
														</v-flex> -->
														


														<!-- <v-flex xs12 sm6 md6>
													
															<v-select solo v-model="editedItem.channelname" :rules="[() => !!editedItem.channelname || 'This field is required']"   item-text="text" item-value="value" label="Department Name" @input="$v.editedItem.channelname.$touch()" @blur="$v.editedItem.channelname.$touch()"></v-select>
														</v-flex> -->
                                                        <v-flex xs12 sm6 md6>
															<v-text-field solo maxlength="25" counter="25" v-model="reconformfild.userfullname"  label="Full Name"></v-text-field>
														</v-flex>
														<v-flex xs12 sm6 md6>
															<v-text-field solo v-model="reconformfild.username" label="User Name *" counter="25" maxlength="25" @input="$v.reconformfild.username.$touch()" @blur="$v.reconformfild.username.$touch()" :error-messages="nameErrors" required></v-text-field>
														</v-flex>
														
                                                        <v-flex xs12 sm6 md6>
															<v-text-field solo v-model="reconformfild.userpassword" label="Password *" @input="$v.reconformfild.userpassword.$touch()" @blur="$v.reconformfild.userpassword.$touch()" :error-messages="passwordErrors" required></v-text-field>
														</v-flex>

														<v-flex xs12 sm6 md6>
															<v-text-field solo v-model="reconformfild.useremmailid" :rules="primaryemailvalidation" @input="fieldvalidation(reconformfild.useremmailid,'primaryemail')" label="Primary Email"  @blur="$v.reconformfild.useremmailid.$touch()" required></v-text-field>
														</v-flex>
														<!-- <v-flex xs12 sm6 md6>
															<v-text-field solo v-model="editedItem.NT_ID" :rules="ntidvalidation" @input="fieldvalidation(editedItem.NT_ID,'ntid')" label="NT ID" @blur="$v.editedItem.NT_ID.$touch()" required></v-text-field>
														</v-flex> -->
														<v-flex xs12 sm6 md6>
															<v-text-field  solo v-model="reconformfild.usermobileno" label="Enter Mobile No" :rules="[() => !!reconformfild.usermobileno || 'This field is required']" :mask="mobnumber"></v-text-field>
														</v-flex>
													
                                                        <v-flex xs12 sm6 md6>
															<v-select solo  v-model="reconformfild.bank" :items="bankList"  item-text="fullbankname" item-value="bankid" label="Bank *" @input="$v.reconformfild.bank.$touch()" @blur="$v.reconformfild.bank.$touch()" :error-messages="bankError" required></v-select>
														</v-flex>

														<v-flex xs12 sm6 md6>
															<v-select solo  v-model="reconformfild.designation" :items="designationdata2" item-text="text" item-value="value" label="Designation *" @input="$v.reconformfild.designation.$touch()"
                                                        @blur="$v.reconformfild.designation.$touch()" :error-messages="designationerror" required></v-select>
														</v-flex>

														<v-flex xs12 sm6 md6>
															<v-select solo  v-model="reconformfild.roleid" :items="userroleid" item-text="text" item-value="value" label="Role *" @input="$v.reconformfild.roleid.$touch()"
                                                        @blur="$v.reconformfild.roleid.$touch()" :error-messages="RoleERROR" required></v-select>
														</v-flex>
														<!-- HIERARCHY -->
														<!-- <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
															<v-select v-model="editedItem.heirarchy" :items="selectheirarchy"  @change="setHierarchy"  item-text="text" item-value="value"  label="Hierarchy Name"
															@input="$v.editedItem.heirarchy.$touch()"
															@blur="$v.editedItem.heirarchy.$touch()"
															:error-messages="HeirarchyErrors"
															></v-select>
														</v-flex> -->
														<!-- <v-flex xs12 sm6 md6 v-else>
															<v-select disabled v-model="editedItem.heirarchy" :items="selectheirarchy"  @change="setHierarchy"  item-text="text" item-value="value"  label="Hierarchy Name"
															@input="$v.editedItem.heirarchy.$touch()"
															@blur="$v.editedItem.heirarchy.$touch()"
															:error-messages="HeirarchyErrors"
															></v-select>
														</v-flex> -->
														<!-- ROLE-CODE -->
														<!-- <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
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
														</v-flex> -->
														<!-- BRANCH -->
														<!-- <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
															<v-select v-model="editedItem.branch" @input="$v.editedItem.branch.$touch()"
															@blur="$v.editedItem.branch.$touch()" :error-messages="branchErrors"
															:items="branchArray" autocomplete item-text="text" item-value="value" label="Branch"
															></v-select>
														</v-flex>
														<v-flex xs12 sm6 md6 v-else>
															<v-select disabled v-model="editedItem.branch"  :items="branchArray" autocomplete item-text="text" item-value="value" label="Branch"
															></v-select>
														</v-flex> -->
														<!-- REPORTING MANAGER HIERARCHY-->
														<!-- <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
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
														</v-flex> -->
														<!-- REPORTING MANAGER -->
														<!-- <v-flex xs12 sm6 md6 v-if="showChannelDependFields === true">
															<v-text-field solo v-model="editedItem.reportingManager" label="Reporting Manager Employee ID" counter="10" maxlength="10" :rules="reportingmanagervalidation" @input="fieldvalidation(editedItem.reportingManager,'reportingmanager')" @blur="$v.editedItem.reportingManager.$touch()" required></v-text-field>
														</v-flex>
														<v-flex xs12 sm6 md6 v-else>
															<v-text-field solo v-model="editedItem.reportingManager" label="Reporting Manager Employee ID" counter="10" maxlength="10" :rules="reportingmanagervalidation" @input="fieldvalidation(editedItem.reportingManager,'reportingmanager')" @blur="$v.editedItem.reportingManager.$touch()" required></v-text-field>
														</v-flex> -->

														<!-- <v-flex xs12 sm6 md6>
															
															<v-select
																solo
                                                                v-model="editedItem.state"
                                                                :rules="[() => !!editedItem.state || 'This field is required']"
                                                                @change="cityfind"
                                                                @input="$v.editedItem.state.$touch()"
                                                                @blur="$v.editedItem.state.$touch()"
                                                                autocomplete
                                                                :items="stateItems2"
                                                                label="State"
                                                            ></v-select>
														</v-flex> -->

														<!-- <v-flex xs12 sm6 md6>
															
															<v-select
																solo
                                                                v-model="editedItem.city"
                                                                :rules="[() => !!editedItem.city || 'This field is required']"
                                                                :items="cityItems2" @input="$v.editedItem.city.$touch()"
                                                                @blur="$v.editedItem.city.$touch()"
                                                                autocomplete
                                                                label="City"
                                                            ></v-select>
														</v-flex> -->
														
														<v-flex xs12 sm6 md6>
															<v-menu :close-on-content-click="false" v-model="calender" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
																<v-text-field solo :rules="[() => !!reconformfild.Dob || 'This field is required']" slot="activator" v-model="reconformfild.Dob" label="Date of Birth" persistent-hint prepend-inner-icon="event" @blur="date = parseDate(reconformfild.Dob)"></v-text-field>
																<v-date-picker v-model="date" no-title @input="validAge"></v-date-picker>
															</v-menu>
															<p style="color:red;font-size:13px;opacity:0.8;position: absolute;bottom: 839px;">{{agetext}}</p>
														</v-flex>
														<v-flex xs12 sm6 md6>
															<v-select solo v-model="reconformfild.userstatus" :items="userstatus"  item-text="text" label="User Status"></v-select>
														</v-flex>
													</v-layout>
												</v-flex>
												<!-- </v-expansion-panel-content> -->
												<!-- EXPANSION-PANEL 'Contact Details' -->
												<!-- <v-expansion-panel-content >
												<div slot="header" class="body-2">Contact Details</div>
												<v-flex pa-3 class="grey lighten-5">
													<v-layout wrap>

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
											</v-expansion-panel-content> -->
												<!-- EXPANSION-PANEL 'Bank and Identification details' -->
												<!-- <v-expansion-panel-content>
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
											</v-expansion-panel-content> -->
												<!-- </v-expansion-panel> -->
												<!-- </v-flex> -->
											</template>
											<!-- <v-divider style="border-color:#FAFAFA"></v-divider> --></v-container>
									</form>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn depressed large dark color="#152F38" @click.native=" close()">
										<v-icon left dark>highlight_off</v-icon>
										Cancel	
									</v-btn>
									<v-btn depressed large dark color="#E46A25" @click.native="saveAndEdit(btnname)">
										<v-icon dark left>check_circle</v-icon>
										{{btnname}}
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-form>
					<!-- Single User Form End -->
				</v-flex>
			</v-layout>
			<!--DIALOG FOR RESET PASSWORD-->
			<v-dialog v-model="resetDialog" persistent max-width="400px">
				<v-card>
					<v-flex style="background-color:#3a3a3a">
						<v-card-title class="subheading" style="color:white">Reset Password</v-card-title>
					</v-flex>
					<v-card-text>Are you Sure you want to Reset this user's password</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn depressed color="grey lighten-3" @click="resetDialog=false">Cancel
							<v-icon right dark>highlight_off</v-icon>
						</v-btn>
						<v-btn depressed color="secondary" @click="resetFunct()">Reset
							<v-icon dark right>check_circle</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- DIALOG FOR BULK UPLOAD -->
			<v-dialog v-model="dialogBulkUpld" persistent max-width="700px">
				<v-card>
					<v-flex style="background-color:#3a3a3a">
						<v-card-title class="subheading" style="color:white;justify-content:space-between;">Upload File
							<v-icon dark @click="dialogBulkUpld = false">clear</v-icon>
							<!-- <img src='https://www.materialui.co/materialIcons/file/file_upload_white_192x192.png' width="35px"></img> -->
						</v-card-title>
					</v-flex>
					<v-card-text>
						<v-container grid-list-md>
							<v-stepper v-model="steps">
								<v-stepper-header>
									<v-stepper-step :complete="steps > 1" step="1">Upload Data</v-stepper-step>
									<v-divider></v-divider>
									<v-stepper-step step="2">Status</v-stepper-step>
								</v-stepper-header>
								<v-stepper-items>
									<v-stepper-content step="1">
										<!-- <v-card class="mb-3"  height="200px"> -->
										<v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
										<v-layout>
											<v-flex class="fileContainer-bulk  mt-6">
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
													<div class="font-weight-medium body-2 ">Selected File:</div>
													<div class="body-1 font-weight-regular font-italic">{{fileLink}}</div>
												</v-layout>
											</div>
										</v-layout>
										<v-layout mt-3 justify-space-between>
											<a href="https://image-upload-bucket-2019.s3.ap-south-1.amazonaws.com/07785f9b524e201821df19ae9d3830a22c6fe61b.xlsx" download>
												<v-btn color="primary">sample file
													<v-icon right dark>save_alt</v-icon>
												</v-btn>
											</a>
											<v-btn color="primary" @click="goUserNxt()">Next
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
											<v-text class="subheading font-weight-medium ml-1">Failed Data:</v-text> <a :href="errorLink" download>{{errorLink}}</a>
										</v-flex>
										<v-card-actions style="justify-content:flex-end;">
											<v-layout mt-5 justify-space-between>
												<v-btn color="primary" @click="steps =1">
													<v-icon class="mr-2">arrow_back</v-icon>Previous</v-btn>
												<v-btn color="primary" @click="cancelStepper">Close
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
			<v-pagination
                class="cust-usr-pgn"
                v-model="pagination.page"
                color="#152F38"
                flat
                :length="pages">
            </v-pagination>
			<!-- <div v-if="pageLength > 1" class="text-xs-center pagination">
				<v-pagination v-model="page" @input="next($event)" :length="pageLength" class="cust-usr-pgn" color="#152F38"></v-pagination>
			</div> -->
		</v-card>
	</v-app>
</template>
<script>
	import axios from 'axios'
	import { required, minLength,maxLength, between,email } from 'vuelidate/lib/validators'
	import loadChannel from '../common/onProjectLoad.js'
	import moment from 'moment'

	var _index = 0; // used for put api
	var fileUpload =null;

	let duplicate_edit_item = {};
	export default {

	    created(){
	        // console.log('editedItem.channelname_Creat',this.editedItem.channelname)
	        duplicate_edit_item = JSON.parse(JSON.stringify(this.editedItem));
	        console.log("The agent info id is =>", this.getAgentInfo()._id);
	        this.agentID =  this.getAgentInfo()._id;
           
			this.fetchbanklist()
			this.getuserdetailstable()
			// this.getroleanddesignation()
		   
	    
	    },

	    mounted(){

		    this.headers.map(e =>{
                    e.sortable = false;
            })

	       this.channelFilter = 'all'
           this.getuserdatareporting( this.channelFilter,this.skip);

		   this.stateItems = this.getStates();
		// this.Banklist();

		//    get Table details

		

	    },

	    validations: {
	       
			
			reconformfild:{

				username:{
					required,
				},

				designation:{
					required,
				},

				bank:{
					required,
				},

				userpassword:{
					required,
				},

				roleid:{
					required,
				}
			}

	    },

	    data(){
	        return{

				pagination: {
                	rowsPerPage:15
            	},
				clrone: true,
				dwld:false,
				reports:false,

	            progresscircle:false,
	            askfor_pre_populate:false,
	            temp_storage:[],
	            empcodeuse: null,
	            fnamecheck:"",
	            showChannelDependFields :false,
	            mobnumber:'###-###-####',
	            calender:false,
	            agentID:null,
				Userskip:0,
				valid:false,
	            pagination: {},
	            docType:[],
	            docs:{},
	            docsType:'',
	            agetext:'',
	            pageLength:10,
	            moment,
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
				stateItems2:[
	                    { text: 'Maharashtra', value: 'maharashtra' },
	                    { text: 'Gujarat', value: 'Gj' },
	                    { text: 'Kerala', value: 'Kl' },
	                    { text: 'Goa', value: 'Ga' },
	                    { text: 'Madhya Pradesh', value: 'Mp' }
	                ],
	            cityItems2:[
	                    { text: 'Mumbai', value: 'mumbai' },
	                    { text: 'Ahmedabad', value: 'ah' },
	                    { text: 'Chennai', value: 'ch' },
	                    { text: 'Panaji', value: 'pn' },
	                    { text: 'Bhopal', value: 'bh' }
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
				designationdata2:[],

				userroleid:[
						// { text: '1', value: '1' },
					    // { text: '2', value: '2' },
					
				],
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
				firstnamevalidation:[],
				lastnamevalidation:[],
				primaryemailvalidation:[],
				ntidvalidation:[],
				reportingmanagervalidation:[],
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
					{text: 'Full Name', value: 'fullname'},
					{text: 'User Name', value: 'username'},
					{text: 'Password', value: 'password'},
	                {text: 'Email', value: 'primaryEmail'},
	                {text: 'Mobile No', value: 'mobileno'},
					{text: 'Bank', value: 'bank'},
					{text:'Designation',value:'designation'},
	                {text:'Date Of Birth',value:'dob'},
	                {text: 'Status', value: 'slectStatus'},
	                // {text: 'Channel Name', value: 'channelname'},
					// {text: 'Role Code', value: 'rolecode'},
	                {text: 'Action', value: 'action', sortable: false}
	               
	            ],
	            userTableData: [],
	            editedIndex: -1,
                channelFilter:'',
                FilteringApi:[],
                bankList:[],
                reconformfild:{
                    userfullname:'',
                    userpassword:'',
                    useremmailid:'',
                    usermobileno:'',
                    username:'',
                    designation:'',
                    Dob:'',
                    userstatus:'',
                    bank:'',
					roleid:'',
					recorduserid:''
                },
	            editedItem: {
	                emp_id:'',
	                primaryEmail:'',
	                firstName:'',
	                lastName:'',
	                agentId:'',
	                // passwrd:'',
	                branch:'',
                    reportingManager:'',
	                Dob:null,

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
                    NT_ID: ''
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
                    NT_ID: ''
	            },
	            date:null,
	            responcedesignation:[],
	            statusIndex:'',
	            skipdiffrence:this.paginationdiff(),
	            skip:0,
	            channeldatafilter:'all',
	            page:1,
	            resetPass:'',
				userDataList:[],
				userDataList2:[
					{
						NT_ID: "rikant_sharma@tataaig.net",
						RM_first_name: "deepak kumar",
						last_name: "sharma",
						agent_id: "3949168",
						branchCode: "-",
						branchName: "-",
						state:"maharashtra",
						city:"mumbai",
						channelName: "Agency Commercial Lines",
						primary_email: "Rikant.Sharma@tataaig.com",
						first_name: "rikant",
						mobile_no: "9549786943",
						RM_first_name:"Deepak Kumar",
						slectStatus:"Active",
						hierarchyName:"manager",
						fullobj:{
							employeeCode: "3949145"
						}
					},
					{
						NT_ID: "yeshwant@tataaig.net",
						RM_first_name: "deepak kumar",
						agent_id: "3957796",
						branchCode: "-",
						branchName: "-",
						state:"maharashtra",
						city:"mumbai",
						channelName: "Agency Commercial Lines",
						first_name: "Yashwantk",
						last_name: "Jain",
						primary_email: "Yashwantk.Jain@tataaig.com",
						mobile_no: "9926890781",
						RM_first_name:"Rikant Sharma",
						slectStatus:"Active",
						hierarchyName:"analyst",
						fullobj:{
							employeeCode: "3949168"
						}
					}
				],
				employeidvalidation:[],
				Totalusercount:0,
				activeusercount:0,
				Inactiveusercount:0,
				getsuserdatatable:[],
				getuserdataapi:[],
				apidesignation:[],
				apiuserpagerole:[],
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
					NT_ID:''
				},
				searchdata :false,
	        }
	    },
	    watch:{




	        date (val) {
	            this.reconformfild.Dob = this.formatDate(this.date)
			},

			// value: function(val){
			// 		// h99
			// 		console.log("val is ->", val);


			// 		if(val == null){

	       	// 			this.getuserdatareporting( this.channelFilter,this.skip);
			// 		}else if(val ==''){

	       	// 			this.getuserdatareporting( this.channelFilter,this.skip);

			// 		}
			// }

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

			pages () {

            return this.pagination.rowsPerPage ? Math.ceil(this.userDataList2.length / this.pagination.rowsPerPage) : 0
        },

			reporterrors(){

			   console.log(this.channeldatafilter,' ---report erros reached---- ', this.reports);
				var errors = []
				if(this.channeldatafilter == 'all'){
							var self = this
					console.log(this.channeldatafilter,' ---report erros reached---- ', this.reports);
					if(this.reports){
						errors.push('Select a Channel other than All');
						return errors
					}else{
						console.log('inner else');
						return []
					}

				}else{
					return errors
				}

		},

			// value(){
			//     return this.value
			// },

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
	            return this.editedIndex === -1 ? 'New User' : 'Edit User'
	        },

	        value() {
	           console.log(this.value);
			},
		
	        nameErrors () {
	            const errors = []
	            const name=''
	            this.editItem.firstName = name
	            if (!this.$v.reconformfild.username.$dirty) return errors

	            !this.$v.reconformfild.username.required && errors.push('User Name is required.')
	            return errors
			},
			
			passwordErrors () {
	            const errors = []
	           
	            if (!this.$v.reconformfild.userpassword.$dirty) return errors

	            !this.$v.reconformfild.userpassword.required && errors.push('Password is required.')
	            return errors
			},

			bankError(){
				const errors = []
	           
	            if (!this.$v.reconformfild.bank.$dirty) return errors

	            !this.$v.reconformfild.bank.required && errors.push('Bank is required.')
	            return errors
			},

			RoleERROR(){
				const errors = []
	           
	            if (!this.$v.reconformfild.roleid.$dirty) return errors

	            !this.$v.reconformfild.roleid.required && errors.push('Role is required.')
	            return errors
			},

			designationerror(){
				const errors = []
	           
	            if (!this.$v.reconformfild.designation.$dirty) return errors

	            !this.$v.reconformfild.designation.required && errors.push('Designation is required.')
	            return errors
			},

	        emailErrors () {
	            const errors = []
	            if (!this.$v.editedItem.primaryEmail.$dirty) return errors
	                !this.$v.editedItem.primaryEmail.email && errors.push('Must be valid e-mail')
	            !this.$v.editedItem.primaryEmail.required && errors.push('Email is required')
	            return errors
            },
            NTErrors () {
	            const errors = []
	            if (!this.$v.editedItem.NT_ID.$dirty) return errors
	                !this.$v.editedItem.NT_ID.email && errors.push('Not a valid NT_ID')
	            !this.$v.editedItem.NT_ID.required && errors.push('This field is required')
	            return errors
	        },
	        //  mobilenoErrors () {
	        //   const errors = []
	        // if (!this.$v.editedItem.mobileno.$dirty) return errors
	        //     //   !this.$v.editedItem.mobileno.email && errors.push('Must be Valid Mobile No')
	        //   !this.$v.editedItem.mobileno.required && errors.push('mobile no is required.')
	        //   return errors
	        // },
	        // agentIdErrors () {
	        //     const errors = []
	        //     if (!this.$v.editedItem.agentId.$dirty) return errors
	        //         //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	        //     !this.$v.editedItem.agentId.required && errors.push('Agent ID is required.')
	        //     return errors
	        // },
	        //    passwordErrors () {
	        //   const errors = []
	        //   if (!this.$v.editedItem.passwrd.$dirty) return errors
	        //     //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	        //   !this.$v.editedItem.passwrd.required && errors.push('Password is required.')
	        //   return errors
	        // },
	        mobileErrors () {
	            const errors = []
	            if (!this.$v.reconformfild.usermobileno.$dirty) return errors
	                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	            !this.$v.reconformfild.usermobileno.required && errors.push('Mobile No is required.')
	            return errors
	        },
	        //    branchErrors () {
	        //   const errors = []
	        //   if (!this.$v.editedItem.branch.$dirty) return errors
	        //   !this.$v.editedItem.branch.required && errors.push('Branch Name  is required.')
	        //   return errors
	        // },
	        // managerErrors () {
	        //     const errors = []
	        //     if (!this.$v.editedItem.reportingManager.$dirty) return errors
	        //         //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	        //     !this.$v.editedItem.reportingManager.required && errors.push('Reporting Manager is required.')
	        //     return errors
	        // },
	        // branchErrors(){
	        //     const errors = []
	        //     if (!this.$v.editedItem.branch.$dirty) return errors
	        //         //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	        //     !this.$v.editedItem.branch.required && errors.push('Branch is required.')
	        //     return errors
	        // },
	        // codeErrors () {
	        //     const errors = []
	        //     if (!this.$v.editedItem.rolecode.$dirty) return errors
	        //         //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	        //     !this.$v.editedItem.rolecode.required && errors.push('Role Name is required.')
	        //     return errors
	        // },
	        ChanelErrors () {
	            const errors = []
	            if (!this.$v.editedItem.channelname.$dirty) return errors
	                //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	            !this.$v.editedItem.channelname.required && errors.push('Channel Name is required.')
	            return errors
	        },
	        // HeirarchyErrors () {
	        //     const errors = []
	        //     if (!this.$v.editedItem.heirarchy.$dirty) return errors
	        //         //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	        //     !this.$v.editedItem.heirarchy.required && errors.push('Hierarchy Name is required.')
	        //     return errors
	        // },
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
		
		getroleanddesignation(){

			let self = this
			axios({
					method: "post",
					url:
						this.API_Service_admin()+"/FilteringData/api/FilterData/getFilteringData",
					headers: {
						"Content-Type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "88cea34f-0a66-c8e4-e554-5af3d6096d6d",
					},
					data: {
						"UserId": 1,
						"PageName": "adduserview",
						"BankAcNo" : 0
					},
				})
					.then(function (response) {
						console.log("Filter APi Response>>>>>>", response);

						self.apidesignation = response.data.UserPageDesignation
						self.apiuserpagerole = response.data.UserPageRole

						console.log("Designation::>>",self.apidesignation)
						console.log("Role::>>",self.apiuserpagerole)

						self.apidesignation.map((desg) => {
							self.designationdata2.push({
								text:desg.desigName,
								value:desg.desigId
							});
						});

						self.apiuserpagerole.map((desg) => {
							self.userroleid.push({
								text:desg.roleName,
								value:desg.roleId
							});
						});

						console.log("self.designationdata2",self.designationdata2)
						console.log("FINAL ROLE:::::",self.userroleid)

					})
					.catch(function (error) {
					// self.showLoader('Loading', false);
						console.log("Filter APi Response>>>>>>", error);
					});
		},
		getuserdetailstable(){
			
			var self = this;
			self.getsuserdatatable = []

			self.showLoader('Loading', true);
			axios({
				method: "post",
				url:
					this.API_Service_admin()+"/UserAPI/api/UserCreation/GetUserDetails",
				headers: {
					"Content-Type": "application/json",
					"cache-control": "no-cache",
					"postman-token": "f639393c-d438-4864-64b9-956c89504634",
				},
				data: {
					"UserId" : 1,
					"SessionId" : 1,
					"PageName": "updateUserView"
				},
			})
		.then(function (response) {
			console.log("GET RESPONSE::",response)
			self.showLoader('Loading', false);
			if(response.data.Status === 'Success'){
			  
			self.getuserdataapi = [];
			self.getsuserdatatable = []
			self.getuserdataapi = response.data.GetUserDetailsResponseList

			self.Totalusercount = response.data.UserDetailsCount
			self.activeusercount = response.data.ActiveUserCount
			self.Inactiveusercount = response.data.InActiveUserCount

	        // self.$emit('sendtrigger', response.data)

			self.getuserdataapi.map((usr) => {

            self.getsuserdatatable.push({
				
				UserName: usr.UserName,
				RoleId : usr.RoleId,
				RecordUserId: usr.RecordUserId,
				PhoneNumber : usr.PhoneNumber,
				Password : usr.Password,
				IsActive : usr.IsActive === true ? 'Active' : 'InActive',
				FullName: usr.FullName,
				EmailId : usr.EmailId,
				Designation : usr.Designation,
				DefaultBankId : usr.DefaultBankId,
				DOB : usr.DOB
            });
            });
				console.log('GetUserDetailsResponseList',self.getsuserdatatable)
			}else{
				self.showToast("No Records found",self.TOST().WARNING);
			}

		})
		.catch(function (error) {
			console.log(" ERROR Response>>>>>>", error);
		});
		},

        fetchbanklist(){
            let self = this

            console.log("BANK STORE DATA:::",self.$store.getters.getbankDetails)
            self.FilteringApi = self.$store.getters.getbankDetails
            self.FilteringApi.map((bnk) => {

            self.bankList.push({
                BankName: bnk.bankName,
                BankAcNo: bnk.bankAcNo,
                fullbankname: bnk.bankName +'('+ bnk.bankAcNo +')',
				HouseOfBank: bnk.houseOfBank,
				bankid:bnk.bankId,
                fullObj: bnk,
            });
            });
            
            console.log("LIST OF BANK",self.bankList);
        },

		download_all(){
				console.log('channel for Download is ->', this.channelFilter);


          if(this.channelFilter == 'all'){
			  		this.reports = true
					this.showToast('Please select Channel to download report', this.TOST().WARNING);




          }else{
			  this.dwld = true;
			  this.reports = false;

			    // 'getallAgent?user_id=5b3b4cc28fa96d39870443e3&channelCode=5e6900361950663e3cc5323a&skip=0&filter=xls'
			this.GET('getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+this.channelFilter+'&skip=0&filter=xls', (res, error)=>{
					if(error){
						console.log('An error has occured', error)
						return
					}
					if(res.data.errCode == -1){
						var self = this
						   console.log(' response XLS -> ', res.data.errMsg);
							var download_url = res.data.errMsg
							console.log(' ----> split ---> ', download_url.split('/').pop())
							let a = document.createElement('a')
							a.href = download_url
							var filename = download_url.split('/').pop()

							a.download = filename.toUpperCase()
							document.body.appendChild(a)
							a.click()
							document.body.removeChild(a)

							setTimeout(   self.dwld = false , 1000);
							this.showToast('User reports has been successfully Downloaded', this.TOST().SUCCESS);
					}

				})
		  }
		},


		fieldvalidation(value, fieldName) {
					console.log('ValUE  FIELD', value, fieldName);
					let receiver = /^[A-Za-z0-9 ]+$/;
					let targetRegex = /^[0-9 ]+$/;
					let nameRegex = /^[A-Za-z ]+$/;
					let emailFormate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
					if (fieldName == 'employeeid') {
						this.employeidvalidation = []
						value === '' ? this.employeidvalidation.push('This is field required') : ''
						value.match(receiver) ? this.employeidvalidation.push() : this.employeidvalidation.push('Only alphabets and numbers are allowed')
					} else if (fieldName == 'firstname') {
						this.firstnamevalidation = []
						value === '' ? this.firstnamevalidation.push('This is field required') : ''
						value.match(nameRegex) ? this.firstnamevalidation.push() : this.firstnamevalidation.push('Only alphabets are allowed')
					} else if (fieldName == 'lastname') {
						this.lastnamevalidation = []
						value === '' ? this.lastnamevalidation.push('This is field required') : ''
						value.match(nameRegex) ? this.lastnamevalidation.push() : this.lastnamevalidation.push('Only alphabets are allowed')
					} else if (fieldName == 'reportingmanager'){
						this.reportingmanagervalidation = []
						value === '' ? this.reportingmanagervalidation.push('This is field required') : ''
						value.match(receiver) ? this.reportingmanagervalidation.push() : this.reportingmanagervalidation.push('Only alphabets and numbers are allowed')
					}else if(fieldName == 'productname'){
						this.productnamevalidation = []
						value === '' ? this.productnamevalidation.push('This is field required') : ''
						value.match(receiver) ? this.productnamevalidation.push() : this.productnamevalidation.push('Only alphabets and numbers are allowed')
					}else if(fieldName == 'sumassuredvalid'){
						this.sumassuredvalidation = []
						value === '' ? this.sumassuredvalidation.push('This is field required') : ''
						value.match(targetRegex) ? this.sumassuredvalidation.push() : this.sumassuredvalidation.push('Only numbers are allowed')

					}else if(fieldName == 'primaryemail'){
					this.primaryemailvalidation = []
					value === '' ? this.primaryemailvalidation.push('This is field required') : ''
					value.match(emailFormate) ? this.primaryemailvalidation.push() : this.primaryemailvalidation.push('Enter a valid email format')
					}else if(fieldName == 'ntid'){
					this.ntidvalidation = []
					value === '' ? this.ntidvalidation.push('This is field required') : ''
					value.match(emailFormate) ? this.ntidvalidation.push() : this.ntidvalidation.push('Enter a valid email format')
					}
					//
					// productnamevalidation
				},
		call_user_validation(data, type, field){

                var self = this
                this.validate_alpha_numeric(data, type, (res, datanew)=>{
                    if(res == true){
                        self.editedItem[field] =  datanew
                        self.$forceUpdate();
                        return
                    }
                })
        },


        parseDate (date) {
            console.log('parsedate',date);
            if (!date) return null
            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
		formatDate (date) {

			if (!date) return null
			const [year, month, day] = date.split('-')
			return `${day}-${month}-${year}`
		},
		validAge(date){
			let self = this
			self.calender = false
			let datevalue = moment(date).valueOf()
				console.log('Date',datevalue)

				let currentdate=Date.now()
				let datesub = moment(currentdate).subtract(18, 'years').format('MM-DD-YYYY');
				console.log('Subtract year',datesub)
				let convertsub=moment(datesub).valueOf()
				if(datevalue >=  convertsub ){
				console.log('Your Age is Not 18')
				self.agetext = 'You are less than 18 years'
				}else{
						self.agetext = ''
				}

		},

	    copy_clipboard(indata){

	    var dummy = document.createElement("textarea");
	    document.body.appendChild(dummy).style;
	    dummy.value = indata;
	    dummy.select()
	    dummy.setSelectionRange(0, 99999)
	    document.execCommand("copy");
	    document.body.removeChild(dummy);
	    this.showToast(' Password Copied to Clipboard', this.TOST().INFO);
	    },

		populateit(){

			this.progresscircle = true
			// this.changeFil(this.temp_storage.designation._id)
			let self = this;
			this.changeFil(this.temp_storage.channelCode, function(code) {

			if (code === '1') {

			console.log('From Populate it ->', self.temp_storage);
			self.editedItem.channelname = self.temp_storage.channelCode
			self.editedItem.primaryEmail = self.temp_storage.primary_email
			self.editedItem.firstName =  self.temp_storage.first_name
			self.editedItem.lastName =  self.temp_storage.last_name
			self.editedItem.mobileno = self.temp_storage.mobile_no
			self.editedItem.Dob = moment(self.temp_storage.Dob).format('MM-DD-YYYY');
			self.editedItem.reportingManager = self.temp_storage.reporting_manager.employeeCode
			self.editedItem.state=self.temp_storage.state
			self.editedItem.designation = self.temp_storage.designation._id
			self.editedItem.city=self.temp_storage.city
			self.editedItem.address1=self.temp_storage.address
			self.editedItem.address2=self.temp_storage.address_line_2
			self.editedItem.postalCode=self.temp_storage.pincode
			self.editedItem.secMobileNo=self.temp_storage.secondary_mobile_no
			self.editedItem.secEmail=self.temp_storage.secondary_email
			self.editedItem.bankName=self.temp_storage.bankName
			self.editedItem.ifscCode=self.temp_storage.IFSC_Code
			self.editedItem.bankState=self.temp_storage.bankState
			self.editedItem.bankCity=self.temp_storage.bankCity
			self.editedItem.branchName=self.temp_storage.bankBranchName
			self.editedItem.accNo=self.temp_storage.accountNo
			self.editedItem.nameAccHolder=self.temp_storage.accountHolderName

			if(self.temp_storage.active === 1){
				self.editedItem.slectStatus = 'Active'
			}else{
				self.editedItem.slectStatus = 'InActive'
			}

			self.askfor_pre_populate = false

				self.showToast('Form Data has now been populated', self.TOST().SUCCESS);

			}
			})
		},

	        checkUserinChannel(incomingdata){

	                console.log('In-Data->', incomingdata);
	                this.editedItem.emp_id = incomingdata
	                var me = this
	                if(/^\s+$/g.test(incomingdata)){
	                      console.log("found empty ->",incomingdata);
	                      this.showToast('Employee ID cannot be empty', this.TOST().WARNING);
	                    return
	                // }else if (this.$v.$invalid == true) {
	                //      console.log("Form has errors");
	                //      this.showToast('Employee ID cannot be empty', this.TOST().INFO);
	                //      return
	                }else{
	                        // alert("Running regular flow");
	                          // 5d526b47d3cb2a0cf7087bcf
	                            var formData = {
	                                    userId: this.$store.state.agentDetails._id,
	                                    employeeCode: incomingdata,
	                            }
	                            //vu99
	                            this.POST('checkvalid_user?version=v2', formData, (res, err) => {
	                              if (err) {
	                                    console.log(err);
	                                    return;
	                              } else {
	                                console.log(" now in this.POST ", res);
	                                this.temp_storage = res.data.errMsg;
	                                if(res.data.errCode == 25){
	                                        this.empcodeuse = "check_circle"

	                                        this.askfor_pre_populate = false
	                                        return

	                                }else if(res.data.errCode == -1){

	                                        this.empcodeuse = null
	                                        console.log("response if emp code found in other channel->", this.temp_storage);
	                                        this.askfor_pre_populate = true
	                                        console.log("from -1", this.askfor_pre_populate);

	                                }else{
	                                        this.empcodeuse = null
	                                        console.log('error ->', err)
	                                        return
	                                }

	                                }

	                            })

	                }




	        },

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
                this.cityItems = this.filterCities(ev)
	        },
	        bankApi(){
	            // axios.get('https://ifsc.razorpay.com/'+ this.editedItem.ifscCode).then(
	        this.GETBANKAPI(this.editedItem.ifscCode, function(res,error){
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
	            console.log("Selected channel is =>",e)
	            console.log('Channel name v-model is ->', this.editedItem.channelname);
	            this.channeldatafilter = e;
	            this.channeldatafilter !== '' ? this.showChannelDependFields = true : this.channeldatafilter === '' ? this.showChannelDependFields = false : ''

	            let self = this;
	            // Asynchronus
	            self.getrole(self.channeldatafilter, function () {
	                self.heirarchydatalist(self.channeldatafilter, function() {
	                    self.Getdesignation(self.channeldatafilter, function() {
	                        //  self.branchlist(self.channeldatafilter, function() {
	                        //     if (typeof cb === 'function') {
	                        //         cb('1');
	                        //     }
                            // }) comment by shoaib for not used
                            if (typeof cb === 'function') {
                                    cb('1');
                            }
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
					this.reports =false
	         console.log("Selected channel is",e)
	          this.page=1
			 this.channeldatafilter = e
			 this.value='',
	         this.getuserdatareporting(this.channeldatafilter,this.skip)

	        },
	        resetPassword(temp){
	            this.resetDialog = true
	            console.log("Reset Data",temp)
	            this.resetPass = temp.fullobj._id
	            //    this.resetId = temp.
	        },
	        resetFunct(){
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
			clearserchall(){
				console.log("clear event",this.channelFilter,this.skip)
				this.value=""
				this.getuserdatareporting( this.channelFilter,this.skip);
			},
			clearwhenempty(){
				if(this.value.length === 0 || this.value === null || this.value === undefined || this.value === " " || /^\s+$/g.test(this.value)){
					if(this.searchdata === true){
						this.getuserdatareporting( this.channelFilter,this.skip);
					}
				}
			},

	        Searchdatatable (e) {


				// alert("we in search table");
	            //  @shoaib this code is used for search the data whatever user insert in the text box .please write only first name
				this.value = e;
				console.log("the value is ->", this.value);

				if(/^\s+$/g.test(this.value)){
						this.showToast('Please enter a value', this.TOST().ERROR);
					    this.value = this.value.trim();
						console.log(" empty or white space ",   this.value);
					return
				}else if(this.value == ''){
						this.showToast('Please enter a value', this.TOST().ERROR);
						console.log(" empty or white space ");
					return

				}else if(this.value == null){
						this.showToast('Please enter a value', this.TOST().ERROR);
						console.log(" empty or white space ");
					return

				}
	            // console.log("Channel Filter check",this.channelFilter)
	            let FilterData
	            if(this.channelFilter == 'all'){
	                FilterData = 'getallAgent?user_id='+this.getAgentInfo()._id+'&skip=0&searchtxt='+this.value
	                console.log("Search Filter all")
	            }else{
	                FilterData = 'getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+this.channelFilter+'&skip=0&searchtxt='+this.value
	                console.log("Search Filter other channel")
				}
				let self = this;
	            // console.log(" Serach value is",this.value);
	            // axios.get(FilterData).then(
	            //     res => {
	                    this.GET(FilterData, function(res, error) {
							if (error) {
								self.showToast('Something went wrong', self.TOST().ERROR);
								return
							}
							if (res.data.errCode === -1) {

								let searchuserdata = res.data.errMsg[0];

								console.log("Searchable data",searchuserdata);
								searchuserdata.forEach(element => {
									element.slectStatus = '';
								});


								var pageLen = res.data.errMsg[1]
								let totalCount = pageLen[0].totalCount
								// console.log('Page Length:',totalCount)
								self.pageLength = Math.ceil(totalCount/self.skipdiffrence)
								self.searchdata = true
								// console.log("Check Page length",self.pageLength);
							    //  console.log("Before for loop ");
								self.userDataList=[];

								// for( var i=0; i < self.searchuserdata.length; i++){
								// 	if(self.searchuserdata[i].active === 1){
								// 		self.searchuserdata[i].slectStatus = 'Active';
								// 	}else{
								// 		self.searchuserdata[i].slectStatus = 'InActive'
								// 	}
								// }


								console.log("a")
								for(let i = 0;i<searchuserdata.length; i++){

									let DB_strct = {};
									DB_strct.primary_email = self.checkValidity(searchuserdata[i].primary_email)
									DB_strct.mobile_no = self.checkValidity(searchuserdata[i].mobile_no)
									DB_strct.first_name = self.checkValidity(searchuserdata[i].first_name)
									DB_strct.last_name = self.checkValidity(searchuserdata[i].last_name)
									DB_strct.agent_id = self.checkValidity(searchuserdata[i].agent_id)
									DB_strct.branchName = searchuserdata[i].branchCode  === null ? '-' : searchuserdata[i].branchCode.branchName
									DB_strct.RM_first_name = searchuserdata[i].reporting_manager === null ? '-' : searchuserdata[i].reporting_manager.first_name+' '+searchuserdata[i].reporting_manager.last_name
									DB_strct.slectStatus = searchuserdata[i].active === 1 ? 'Active' : 'InActive'
									// Conditionally bind the status of the user in the Table
									searchuserdata.map(ev => {
										ev.active === 1 ? ev.slectStatus = 'Active' : ev.slectStatus = 'InActive'
									});

									// DB_strct.slectStatus =self.checkValidity(self.searchuserdata[j].slectStatus)
									DB_strct.branchCode = searchuserdata[i].branchCode === null ? '-' : searchuserdata[i].branchCode.branchCode
									DB_strct.channelName = searchuserdata[i].channelCode === null ? '-' : searchuserdata[i].channelCode.channelName
                                    // DB_strct.hierarchyName = searchuserdata[i].hierarchy_id === null ? '-' : searchuserdata[i].hierarchy_id.hierarchyName
									DB_strct.hierarchyName = searchuserdata[i].designation ? searchuserdata[i].designation.designatioName : '-'
									DB_strct.roleCode = searchuserdata[i].roleCode === null ? '-' : searchuserdata[i].roleCode.roleCode
									DB_strct.fullobj = searchuserdata[i]
									console.log("???????????)>>>",DB_strct.fullobj);
									DB_strct.NT_ID = searchuserdata[i].NT_ID === '' ? '-' :  searchuserdata[i].NT_ID === null ? '-': searchuserdata[i].NT_ID
									self.userDataList.push(DB_strct)

								}
								console.log("Final Array",self.userDataList);
								if(totalCount==1){
									self.showToast(totalCount +' Record found', self.TOST().SUCCESS);
								}else if(totalCount>1){
									self.showToast(totalCount +' Records found', self.TOST().SUCCESS);
								}else{
									self.showToast('No Records found', self.TOST().ERROR);
								}
							} else {
								self.showToast('Something went wrong', self.TOST().ERROR);
								return
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
	            //     res => {
	                    this.GETUSER('getmyAttendance/'+user+'?sortBy=604800000&skip='+this.Userskip, function(res,error){
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

	        // getrole(chanel, cb = null){
	        //     // axios.get(this.API_Service_admin()+'getrole?userId='+this.getAgentInfo()._id+'&channelCode='+chanel).then(
	        //     // res => {
	        //         let self = this;
	        //         this.GET('getrole?userId='+this.getAgentInfo()._id+'&channelCode='+chanel, function(res,error){
	        //         let roledata = res.data.errMsg[0]
	        //         for(let i=0;i<roledata.length;i++){
	        //             if(roledata[i].active === 1){
	        //                 let data = {
	        //                     text : roledata[i].roleName,
	        //                     value : roledata[i]._id,
	        //                 }
	        //                 self.itemsRole.push(data)
	        //             }
	        //         }
	        //         if (typeof cb === 'function') {
	        //             cb();
	        //         }
	        //     });
	        // },
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
	        // getuserdatareporting(e,skip){
	        //     console.log("CLONE FUNCTION");
	        //     console.log("Event is",e,skip)
	        //     let user =this.$store.state.userId
	        //     let FilterData
	        //     if(e === 'all'){
	        //         this.userDataList =[];
	        //         FilterData = 'getallAgent?user_id='+this.getAgentInfo()._id+'&skip='+skip
	        //         console.log("TRUE",FilterData)
	        //     }else{
	        //         this.userDataList =[];
	        //         FilterData = 'getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip
	        //         console.log("FALSE",FilterData)
	        //     }
	        //     this.finalreporingdata.push(Unassigned);
	        //     console.log("***NO DATA FOUNND IN SECOND FIELD*** and can be unassigned");

	        // },
	        getuserdatareporting(e,skip){
	            console.log("OGG FUNCTION");
	            console.log("Event is",e,skip)
	            let user =this.$store.state.userId
	            let FilterData
	            if(e === 'all'){
	                this.userDataList =[];
	                FilterData = 'getallAgent?user_id='+this.getAgentInfo()._id+'&skip='+skip
	                console.log("TRUE",FilterData)
	            }else{
	                this.userDataList =[];
	                FilterData = 'getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip
	                console.log("FALSE",FilterData)
	            }

	            //  axios.get(FilterData).then(
	            //     //    axios.get(this.API_Service_admin()+'getallAgent?user_id='+user).then(
	            //    res => {
	                let self = this;
	                this.GET(FilterData, function(res,error){

	                    // console.log('xyz :',res.data.errMsg[0]);
	                    if(error){
	                        console.log(error)
	                        return;
	                    }
	                    res.data.errMsg[0].forEach(element => {
	                        element.slectStatus = '';
	                    });

	                    self.userreportinghierarchy=[];
	                    self.allAgentdata = res.data.errMsg[0]
	                    var pageLen = res.data.errMsg[1]
	                    let totalCount = pageLen[0].totalCount
	                    console.log('Page Length:',totalCount)
						self.pageLength = Math.ceil(totalCount/self.skipdiffrence)
						self.searchdata =false

	                    console.log("Check Page length",self.pageLength);
	                    console.log('User REPONSE::::::::::>',self.allAgentdata)

	                    for( var i=0; i < self.allAgentdata.length; i++){
	                        if(self.allAgentdata[i].active === 1){
	                            self.allAgentdata[i].slectStatus = 'Active';
	                            if(self.allAgentdata[i].active === 1){
	                            let userreportingdata ={
	                                hierarchyname:self.allAgentdata[i].hierarchy_id === null ? '-' : self.allAgentdata[i].hierarchy_id.hierarchyName || "",
	                                hierarchyid:self.allAgentdata[i].hierarchy_id === null ? '-' : self.allAgentdata[i].hierarchy_id._id || "",
	                                username:self.allAgentdata[i].first_name || "" +' '+self.allAgentdata[i].last_name || "",
	                                user_id:self.allAgentdata[i]._id,
	                            }
	                            self.userreportinghierarchy.push(userreportingdata)
	                            }
	                        }else{
	                            self.allAgentdata[i].slectStatus = 'InActive'
	                        }
	                    }
	                    console.log("reporting data object =====>>>>>>",self.userreportinghierarchy)

	                    for(let j = 0; j < self.allAgentdata.length; j++){
	                        // SORTING Code for Table Data
	                        self.userDB = {};
	                        self.userDB.primary_email = self.checkValidity(self.allAgentdata[j].primary_email)
	                        self.userDB.mobile_no = self.checkValidity(self.allAgentdata[j].mobile_no)
	                        self.userDB.first_name = self.checkValidity(self.allAgentdata[j].first_name)
	                        self.userDB.last_name = self.checkValidity(self.allAgentdata[j].last_name)
	                        self.userDB.agent_id = self.checkValidity(self.allAgentdata[j].agent_id)
	                        self.userDB.branchName = self.allAgentdata[j].branchCode  === null ? '-' : self.allAgentdata[j].branchCode.branchName
	                        self.userDB.RM_first_name = self.allAgentdata[j].reporting_manager === null ? '-' : self.allAgentdata[j].reporting_manager.first_name+' '+self.allAgentdata[j].reporting_manager.last_name
	                        self.userDB.slectStatus =self.checkValidity(self.allAgentdata[j].slectStatus)
	                        self.userDB.branchCode = self.allAgentdata[j].branchCode === null ? '-' : self.allAgentdata[j].branchCode.branchCode
	                        self.userDB.channelName = self.allAgentdata[j].channelCode === null ? '-' : self.allAgentdata[j].channelCode.channelName
	                        self.userDB.hierarchyName = self.allAgentdata[j].hierarchy_id === null ? '-' : self.allAgentdata[j].hierarchy_id.hierarchyName
	                        self.userDB.roleCode = self.allAgentdata[j].roleCode === null ? '-' : self.allAgentdata[j].roleCode.roleCode
							self.userDB.fullobj = self.allAgentdata[j]
							self.userDB.NT_ID = self.allAgentdata[j].NT_ID === '' ? "-" : self.allAgentdata[j].NT_ID === null ? '-' : self.allAgentdata[j].NT_ID
	                        self.userDataList.push(self.userDB)

	                        console.log('User LISting >',self.userDataList)
	                    }
	                }
	            )

	            this.GET('users_count/'+this.getAgentInfo()._id, res => {
	            console.log("From component before sending to emit",res.data.errMsg);
	            // let WholeCount = res.data.errMsg;
	            // this.Activeuser = WholeCount.active_users
	            // this.inactivuser = WholeCount.inactive_users
	            // this.Totaluser = WholeCount.total_users
	            // console.log('WCount', this.inactivuser);
	            this.$emit('sendtrigger', res.data.errMsg)
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
	              this.POST('v2/agent_bulk_upload/'+this.getAgentInfo()._id,formData , (res , error) => {
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
	            if(_btnname == 'Add'){
	                this.save();
	            }else if(_btnname == 'Update'){
	                this.updateUser();
	            }
	        },

	        addUser(){
				// This line will reset the validations that happened earlier on dirty and touch blur events
				let self = this
				self.$v.$reset();
				// self.$refs.form.reset()
				self.employeidvalidation = [];
				self.firstnamevalidation = [];
				self.lastnamevalidation = [];
				self.primaryemailvalidation = [];
				self.ntidvalidation = [];
				self.reportingmanagervalidation = [];

	            self.btnname='Add';
				self.reconformfild.userfullname = ''
				self.reconformfild.userpassword = ''
				self.reconformfild.useremmailid = ''
				self.reconformfild.usermobileno = ''
				self.reconformfild.username = ''
				self.reconformfild.designation = ''
				self.reconformfild.Dob = ''
				self.reconformfild.userstatus = ''
				self.reconformfild.bank = ''
				self.reconformfild.roleid = ''
				self.reconformfild.recorduserid = ''
	            self.dialog=true;
	          
	       

	        },
	        branchlist(chn, cb = null) {
	            // axios.get(this.API_Service_admin() + 'getbranch?created_by='+this.getAgentInfo()._id+'&branchfilter=All&channelCode=' + chn)
	            //     .then(res => {
	                let self = this;
	                this.GET('getbranch?created_by='+this.getAgentInfo()._id+'&branchfilter=All&channelCode=' + chn, function(res,error){
	                    self.branchArray = [];
	                    let branchArr = res.data.errMsg[0];
	                    for (var i = 0; i < branchArr.length; i++) {
	                        //    if(branchArr[i].active === 1){
	                        let brdata = {
	                            text: branchArr[i].branchName,
	                            value: branchArr[i]._id,
	                            //    bankname:branchArr[i].bankm_id.bankName,
	                            //    bankid:branchArr[i].bankm_id._id
	                        }
	                        self.branchArray.push(brdata);
	                    }

	                    if (typeof cb === 'function') {
	                        cb();
	                    }
	                })
	        },
	        Getdesignation(chn, cb = null){
	            // axios.get(this.API_Service_admin()+'getDesignationMaster?userId='+this.getAgentInfo()._id+'&channelCode='+chn).then(
	            //     res => {
	                let self = this;
	                this.GET('getDesignationMaster?userId='+this.getAgentInfo()._id+'&channelCode='+chn, function(res,error){

                        if(!error){
	                    self.responcedesignation = res.data.errMsg[0]
	                    console.log("designation responce",self.responcedesignation);

	                    self.designationdata=[];
	                    for(let i=0;i<self.responcedesignation.length;i++){
	                        if(self.responcedesignation[i].active === 1){
	                        //   let heirarchymap = {
	                        //       text:self.responcedesignation[i].hierarchyId.hierarchyName,
	                        //       value:self.responcedesignation[i].hierarchyId._id
	                        //   }
	                        //   self.selectheirarchy.push(heirarchymap)
	                        //   let rolemap ={
	                        //       text:self.responcedesignation[i].roleId.roleName,
	                        //       value:self.responcedesignation[i].roleId._id
	                        //   }
	                        //   self.selectrole.push(rolemap)

	                        let desigdata={
	                            text:self.responcedesignation[i].designatioName,
	                            value:self.responcedesignation[i]._id
	                        }
	                        self.designationdata.push(desigdata)
	                        }
	                    }
	                    if (typeof cb === 'function') {
	                        cb();
                        }
                        }else{
                            console.log(error);
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
			
			editItem2(items){
				console.log('DATA LIST : ', items);
				
				let self = this;

				self.reconformfild.userfullname = items.FullName
				self.reconformfild.userpassword = items.Password
				self.reconformfild.useremmailid = items.EmailId
				self.reconformfild.usermobileno = items.PhoneNumber
				self.reconformfild.username = items.UserName
				// self.designationdata2.value = items.Designation
				self.reconformfild.designation = parseInt(items.Designation)

				self.reconformfild.Dob = moment(items.DOB).format('MM-DD-YYYY')
				self.reconformfild.userstatus = items.IsActive
				self.reconformfild.bank = items.DefaultBankId
				self.reconformfild.roleid = items.RoleId
				self.reconformfild.recorduserid = items.RecordUserId
				// self.getroleanddesignation()
				
				console.log("ROLE DATA::",self.reconformfild.roleid);
				console.log("DESIGNATION DATA::",self.reconformfild.designation);
							// self.editItem.agent_id = items.agent_id; /// agent _id
	                        // self.editItem.editUser_id = items.fullobj._id
	                        // self.editedItem.primaryEmail = items.primary_email
	                        // self.editedItem.firstName = items.first_name
	                        // self.editedItem.lastName = items.last_name
                            // self.editedItem.agentId = items.fullobj.employeeCode
                            // self.editedItem.emp_id = items.agent_id
                            // self.editedItem.Dob = moment(items.fullobj.Dob).format('MM-DD-YYYY');
	                        // self.editedItem.mobileno = items.mobile_no
	                        // self.editedItem.reportingManager = items.fullobj.employeeCode == "" ? "" : items.fullobj.employeeCode == null ? '' : items.fullobj.employeeCode == undefined ? '' : items.fullobj.employeeCode
	                        // self.editedItem.slectStatus = items.slectStatus
	                   
	                        // self.editedItem.channelcode = items.fullobj.channelCode == null ? "" : items.fullobj.channelCode == "" ? '' : items.fullobj.channelCode == undefined ? '' :items.fullobj.channelCode
	                        // self.editedItem.state=items.state
                            // self.editedItem.city=items.city
	                       
	                        // self.editedItem.designation=items.hierarchyName
							// self.editedItem.NT_ID = items.NT_ID
							self.btnname = 'Update';
	                        // self.showLoader('Loading',  false);
	                        self.dialog = true;
			},

	        editItem (items, index) {
	            this.showLoader('Loading',  true);
	            console.log('DATA LIST : ', items);
	            this.fnamecheck = items.fullobj._id
	            let self = this;

	            this.channeldatalist(() => {
	                self.changeFil(items.fullobj.channelCode._id, function(code) {
	                    if (code === '1') {
                            self.editedItem.state = items.fullobj.state
                            self.cityItems     = self.filterCities(items.fullobj.state);
                            self.editedItem.city = self.matchCity(items.fullobj.city, self.cityItems)
							// self.reporingdataarray(items.fullobj.reporting_manager_hirarchy);
	                        self.designationselect(items.fullobj.designation);

	                            // this.finalreporingdata = filteruserreport
	                        console.log("reporting manager list finnal", self.finalreporingdata)
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
                            self.editedItem.emp_id = itemsUser.fullobj.employeeCode
                            self.editedItem.Dob = moment(itemsUser.fullobj.Dob).format('MM-DD-YYYY');
	                        //   self.editedItem.passwrd = itemsUser.fullobj.password
	                        // self.editedItem.branch = itemsUser.fullobj.branchCode.branchCode /shoaib comment
	                        //   console.log("data edited branch name",self.editedItem.branch)
	                        self.editedItem.mobileno = itemsUser.fullobj.mobile_no
	                        self.editedItem.reportingManager = itemsUser.fullobj.reporting_manager == "" ? "" : itemsUser.fullobj.reporting_manager == null ? '' : itemsUser.fullobj.reporting_manager == undefined ? '' : itemsUser.fullobj.reporting_manager.employeeCode
	                        self.editedItem.slectStatus = itemsUser.fullobj.slectStatus
	                        // self.editedItem.branchcode = itemsUser.fullobj.branchCode
	                        self.editedItem.channelcode = itemsUser.fullobj.channelCode == null ? "" : itemsUser.fullobj.channelCode == "" ? '' : itemsUser.fullobj.channelCode == undefined ? '' :itemsUser.fullobj.channelCode
	                        //   self.editedItem.rolecode = itemsUser.fullobj.roleCode.roleCode
	                        self.editedItem.channelname = itemsUser.fullobj.channelCode._id
	                        //  console.log('CHANNELELELELE_22',self.editedItem.channelname)

	                        //   self.editedItem.heirarchy = itemsUser.fullobj.hierarchy_id._id
	                        // console.log("HIERARCHY ::::::: " , itemsUser.fullobj.hierarchy_id._id);
	                        self.setHierarchy(itemsUser.fullobj.hierarchy_id._id);
	                        // console.log("ROLES ::::::: " , itemsUser.fullobj.roleCode.roleCode);
	                        self.setRole(itemsUser.fullobj.roleCode.roleCode);

	                        // self.editedItem.reportinmanagerhierarchy = itemsUser.fullobj.reporting_manager_hirarchy
	                        // self.editedItem.bank=itemsUser.fullobj.branchCode.bankm_id /shoaib comment
	                        self.editedItem.designation=itemsUser.fullobj.designation._id
	                        // self.editedItem.nationality=itemsUser.fullobj.country /shoaib comment
	                        // self.editedItem.state=itemsUser.fullobj.state
                            // self.editedItem.city=itemsUser.fullobj.city
                            self.editedItem.NT_ID = itemsUser.fullobj.NT_ID
	                        // self.editedItem.address1=itemsUser.fullobj.address /shoaib comment
	                        // self.editedItem.address2=itemsUser.fullobj.address_line_2 /shoaib comment
	                        // self.editedItem.postalCode=itemsUser.fullobj.pincode /shoaib comment
	                        // self.editedItem.secMobileNo=itemsUser.fullobj.secondary_mobile_no /shoaib comment
	                        // self.editedItem.secEmail=itemsUser.fullobj.secondary_email /shoaib /comment
	                        // self.editedItem.bankName=itemsUser.fullobj.bankName  /shoaib comment
	                        // self.editedItem.ifscCode=itemsUser.fullobj.IFSC_Code /shoaib comment
	                        // self.editedItem.bankState=itemsUser.fullobj.bankState /shoaib comment
	                        // self.editedItem.bankCity=itemsUser.fullobj.bankCity /shoaib comment
	                        // self.editedItem.branchName=itemsUser.fullobj.bankBranchName /shoaib comment
	                        // self.editedItem.accNo=itemsUser.fullobj.accountNo /shoaib comment
	                        // self.editedItem.nameAccHolder=itemsUser.fullobj.accountHolderName /shoaib commit
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

				console.log("Update DATA::::",items);
				// if(this.editedItem.emp_id === "" || this.editedItem.channelname === "" || this.editedItem.firstName === "" || this.editedItem.lastName ===  "" || this.editedItem.primaryEmail === "" || this.editedItem.NT_ID === "" || this.editedItem.mobileno === "" || this.editedItem.designation === "" || this.editedItem.reportingManager === "" || this.editedItem.state === "" || this.editedItem.city === "" || this.editedItem.Dob === "" || this.editedItem.slectStatus === ""){
				// this.showToast('Please fill all empty fields', this.TOST().WARNING);
				// this.$refs.form.validate();
				// this.employeidvalidation =  [ !!this.editedItem.emp_id || 'This field is required' ]
				// this.firstnamevalidation =  [ !!this.editedItem.firstName || 'This field is required' ]
				// this.lastnamevalidation =  [ !!this.editedItem.lastName || 'This field is required' ]
				// this.reportingmanagervalidation =  [ !!this.editedItem.reportingManager || 'This field is required' ]
				// this.primaryemailvalidation =  [ !!editedItem.primaryEmail || 'This field is required' ]
				// this.ntidvalidation =  [ !!editedItem.NT_ID || 'This field is required' ]
				// return;
				// }else if(this.employeidvalidation.length > 0 || this.firstnamevalidation.length > 0 || this.lastnamevalidation > 0 || this.reportingmanagervalidation > 0 || this.primaryemailvalidation > 0 || this.ntidvalidation > 0){
				// 			this.showToast('Please fill Correct data', this.TOST().WARNING);
				// return;
				// }else{


				let self = this;
				// self.$v.$touch()
				if (self.$v.$invalid == true) {
						self.showToast('Please fill all mandatory fields', self.TOST().WARNING);
						console.log("Form has errors")
				}else{
				  
	            let usercode = null;
	   
	             if(self.reconformfild.userstatus === "InActive") {
	                usercode = 0;
	            } else if(self.reconformfild.userstatus === "Active") {
	                usercode = 1;
	            }
	            
				axios({
						method: "post",
						url:
							self.API_Service_admin()+"/UserAPI/api/UserCreation/AddUpdateUser",
						headers: {
							"Content-Type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "45ba7ac4-feb7-6c06-6ee3-f1090f70eee4",
						},
						data: {
							"RecordUserId" : self.reconformfild.recorduserid,
                            "RoleId" : self.reconformfild.roleid,
                            "UserName" : self.reconformfild.username,
                            "FullName" : self.reconformfild.userfullname,
                            "Designation" : self.reconformfild.designation,
                            "EmailId" : self.reconformfild.useremmailid,
                            "DefaultBankId" :self.reconformfild.bank,
                            "Password" : self.reconformfild.userpassword,
                            "UserId" : 1,
                            "SessionId" : 1,
                            "PageName": "updateUserView",
                            "phoneNumber" : self.reconformfild.usermobileno,
                            "DOB" : self.reconformfild.Dob ,
                            "isActive" : usercode							
						},
					})
                .then(function (response) {
					console.log("Create APi Response>>>>>>", response);
					if(response.data.Status === 'success'){
						self.showToast( "Usere Updated successfully" , self.TOST().SUCCESS);
						self.getuserdetailstable()
						self.dialog = false;

					}else{
						self.showToast( response.data.Message, self.TOST().ERROR);
					}

                })
                .catch(function (error) {
                    console.log("Probable APi Response>>>>>>", error);
				});
				}	
	        },

	        deleteItem(index) {
	            this.allAgentdata.splice(index, 1)
	        },

	        heirarchydatalist(chn, cb = null) {
	            this.user_id = this.$store.state.agentDetails._id
	            this.heirarchydatalists = [];

	            // axios.get(this.API_Service_admin() + 'getHierarchy?userId=' + this.user_id + '&channelCode=' + chn).then(
	            //     res => {
	                let self = this
	                    this.GET('getHierarchy?userId=' + this.user_id + '&channelCode=' + chn, function(res,error){
	                    if(res.data.errMsg[0].length == 0){
	                        console.log("Its empty!",res.data.errMsg[0].length);
	                        self.editedItem.reportinmanagerhierarchy = "Unassigned";
	                        self.editedItem.reportingManager = "Unassigned";
	                        let heirarchydata = {
	                            text: "Unassigned",
	                            value: "unassigned"
	                        }
	                        console.log("Reporting manager ->",self.userreportinghierarchy )
	                        self.heirarchydatalists.push(heirarchydata);
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
	                                self.heirarchydatalists.push(heirarchydata)
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
                
				let self = this
				console.log("self.reconformfild.username",self.reconformfild.username)
				console.log("self.reconformfild.userpassword",self.reconformfild.userpassword)
				console.log("self.reconformfild.designation",self.reconformfild.designation)
				console.log("self.reconformfild.bank",self.reconformfild.bank)
				console.log("self.reconformfild.roleid",self.reconformfild.roleid)
				self.$v.$touch()
				if (self.$v.$invalid == true) {
						self.showToast('Please fill all mandatory fields', self.TOST().WARNING);
               			console.log(self.$v)
						console.log("Form has errors")
				}
				// if(self.reconformfild.username === '' || self.reconformfild.userpassword === '' || self.reconformfild.designation === '' ||  self.reconformfild.bank === '' || self.reconformfild.roleid === ''){
				// 	self.showToast("Please fill all mandatory fields",self.TOST().WARNING);
				// console.log("DATA EMPTY")
				// 	return
				// }
				else{
				console.log("DATA Fill")
                let usercode = null
                if(self.reconformfild.userstatus === "InActive") {
	                usercode = 0;
	            } else if(self.reconformfild.userstatus === "Active") {
	                usercode = 1;
	            }
                console.log("USER STATUS:::",usercode);
                
                axios({
						method: "post",
						url:
							self.API_Service_admin()+"/UserAPI/api/UserCreation/AddUpdateUser",
						headers: {
							"Content-Type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "eeabfa28-dac2-5c08-c5bb-6422b8d094e0",
						},
						data: {
							"RecordUserId" : 0,
                            "RoleId" : self.reconformfild.roleid,
                            "UserName" : self.reconformfild.username,
                            "FullName" : self.reconformfild.userfullname,
                            "Designation" : self.reconformfild.designation,
                            "EmailId" : self.reconformfild.useremmailid,
                            "DefaultBankId" :self.reconformfild.bank,
                            "Password" : self.reconformfild.userpassword,
                            "UserId" : 1,
                            "SessionId" : 1,
                            "PageName": "addUserView",
                            "phoneNumber" : self.reconformfild.usermobileno,
                            "DOB" : moment(self.reconformfild.Dob).format('MM-DD-YYYY') ,
                            "isActive" : usercode							
						},
					})
                .then(function (response) {
					console.log("Create APi Response>>>>>>", response);
					if(response.data.Status === 'success'){
						self.showToast( "User Created successfully" , self.TOST().SUCCESS);
						self.getuserdetailstable()
						self.dialog = false;
					}else{
						self.showToast( response.data.Message, self.TOST().ERROR);
					}

                })
                .catch(function (error) {
                    console.log("Probable APi Response>>>>>>", error);
                });
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
	.status{
     font-family:roboto; font-weight:500; letter-spacing:0.1px;
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
	.cust-usr-tbl table.v-table thead th{
        border-right:1px solid  #C1C8CC !important;
        background-color:#F3FBFB !important;
        color:#1E9690 !important;
        font-family:Roboto !important;
        font-weight:700 !important;
    }
    .cust-usr-tbl table.v-table thead th:last-child{
        border-right: unset !important;
    }
	.cust-usr-tbl table.v-table tbody td,
    .cust-usr-tbl table.v-table thead tr{
        height: 40px !important;
    }
    .cust-usr-tbl table.v-table thead tr:last-child{
         height: unset !important;;
    }
	.usr-tbl-brdr{
        border:1px solid  #C1C8CC;
    }
	.usr-td-bdrgt {
        border-right:1px solid #C1C8CC;
    }
	.cust-usr-pgn .v-pagination__navigation{
        box-shadow:unset !important;
        border-radius: unset !important;
        background-color:#FFFFFF !important;
        border:1px solid #DAE1E6 !important
    }
    .cust-usr-pgn .v-pagination__navigation--disabled{
        background-color:#DAE1E6 !important;
    }
    .cust-usr-pgn .v-pagination__item{
        box-shadow:unset !important;
        min-width:2rem !important;
        height:2rem !important;
        border-radius: unset !important;
        border:1px solid #DAE1E6 !important
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
