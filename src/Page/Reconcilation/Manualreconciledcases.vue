<template>
    <v-app>
		<v-card class="">
			<v-layout class="ma-3" style="border: 0.5px solid #c1c8cc;">

			<v-flex xs10 justify-space-between align-center>
				<v-layout  style="padding:23px;background-color:#F7F7F7;align-items:center;">
						<v-flex >
							<v-text class="body-2" style="color:#646666 ;font-family: roboto;font-weight: 700;"
                                    >Manual Reconciled Cases</v-text>
						</v-flex>
					
				</v-layout>
			</v-flex>

            <v-flex class="backdropdown_mr" xs4 style="">
                    <v-menu style="width: 100%;" max-height="500px" min-width="400px" max-width="400px" offset-y>
                        <!-- <template slot="activator" v-slot-activator="{ on }"> -->
                            <v-layout
                                justify-space-between
                                align-center
                                slot="activator"
                                style="">
                                
                                <div class="bandkdivcust_mr">
                                    <img class="bankimg_mr" :src="bnkProfilePic" />
                                </div>

                                <v-flex class="">
                                    <v-flex >
                                        <p
                                            class="caption font-weight-bold mb-0 pl-2 pt-2"
                                            style="color: #10242b;">
                                            {{ nameofbank + " ( "}}{{ subbnknme + " ) "}}
                                        </p>

                                    </v-flex>

                                    <v-layout align-center>
                                        <div>
                                            <p
                                                class="caption font-weight-bold pl-2"
                                                style="color: #10242b;">
                                                A/C no.
                                            </p>
                                        </div>
                                        <div>
                                            <p
                                                class="caption"
                                                style="color: #10242b;">
                                                {{ bankaccountnumber }}
                                            </p>
                                        </div>
                                    </v-layout>
                                </v-flex>

                                <v-flex class="">
                                    <img class="downarrow_mr" src="../../assets/downArrowDI.png" />
                                </v-flex>
                            </v-layout>
                        <!-- </template> -->
                        <v-list>
                            <v-text-field class="mx-3" depressed label="Search Bank Name" prepend-inner-icon="search" solo @click.stop v-model="search" clearable @click:clear="clearSearch"></v-text-field>

                            <v-list-group
                                v-for="item in filteredItems"
                                :key="item.HouseOfBank"
                                v-model="item.active"
                                :prepend-icon="item.action"
                                no-action
                                 @click.stop
                                 class="cust-Mr-list">

                            <div slot="activator">
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title class="body-2">{{ item.HouseOfBank }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </div>
                
                            <v-list-tile
                                v-for="(subItem,index) in item.BankAcNo"
                                :key="index"
                                @click="selectbank(item.HouseOfBank,subItem.BankAcNo,subItem.BankName)"
                                class="">
                                <v-list-tile-content>
                                  <v-list-tile-title class="body-1">{{subItem.BankName + " - "}}{{subItem.BankAcNo}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            </v-list-group>
                        </v-list>   
                    </v-menu>
                </v-flex>
			</v-layout>

            <v-layout pa-3>
				
                <v-flex xs12 sm12 md12>
                        <v-card height=120  style="background-color:#F3FBFB;border-color:#C1C8CC;border-style:solid;border-width:1px;flex:1;font-family: roboto;font-weight: 700;" color="" class="card-1 pa-2 mr-3">
                                <v-text class="body-2 font-weight-bold" style="color:#1E9690">MANUAL RECONCILED CASES</v-text>
                                <v-divider class="mt-2 mb-2"></v-divider>
                                <v-layout >
                                <v-flex xs6 pa-2>
                                <v-layout justify-space-between row>
                                    <div class="">
                                        <v-text class="caption" style="color:#10242B;font-family: roboto;font-weight: 700;">Records from Bank (Approved)</v-text>
                                    </div>
                                    <div class="">
                                        <v-text class="caption font-weight-bold" style="color:#10242B;font-family: roboto;font-weight: 700;">0</v-text>
                                    </div>
                                </v-layout>
                                <v-layout mt-2 justify-space-between row>
                                    <div class="">
                                        <v-text class="caption" style="color:#10242B;font-family: roboto;font-weight: 700;">Records from Bank(Pending Approved)</v-text>
                                    </div>
                                    <div class="">
                                        <v-text class="caption font-weight-bold" style="color:#10242B;font-family: roboto;font-weight: 700;">0</v-text>
                                    </div>
                                </v-layout>
                                </v-flex>
                                
                                <v-divider vertical class="ma-2"></v-divider>

                                <v-flex pa-2>
                                <v-layout justify-space-between row>
                                    <div class="">
                                        <v-text class="caption" style="color:#10242B;font-family: roboto;font-weight: 700;">Records from GC(Approved)</v-text>
                                    </div>
                                    <div class="">
                                        <v-text class="caption font-weight-bold" style="color:#10242B;font-family: roboto;font-weight: 700;">0</v-text>
                                    </div>
                                </v-layout>
                                <v-layout mt-2 justify-space-between row>
                                    <div class="">
                                        <v-text class="caption" style="color:#10242B;font-family: roboto;font-weight: 700;">Records from GC(Pending Approved)</v-text>
                                    </div>
                                    <div class="">
                                        <v-text class="caption font-weight-bold" style="color:#10242B;font-family: roboto;font-weight: 700;">0</v-text>
                                    </div>
                                </v-layout>
                                </v-flex>
                                </v-layout>
                        </v-card> 
                </v-flex>
               
                <v-flex xs12 sm12 md10>
                    <v-card height=120  style="background-color:#FFFFFF;border-color:#C1C8CC;border-style:solid;border-width:1px;" color="" class="">
						<v-flex style="text-align:end" >
							<v-btn class="caption"
                                   @click="dialog1 = !dialog1"
                                  style="background-color: #e46a25;font-family: roboto;font-weight: 700;" dark 
                                     
                            >New Bulk Upload <v-icon dark right>mdi-plus</v-icon></v-btn>
						</v-flex>
						<v-divider class="mt-2 mb-2 mr-6" style=""></v-divider>
						<v-layout  row v-show="ForcedMtchDtafound===true">
							<!-- <v-flex xs12> -->
                                <v-layout justify-center>
                                    <!-- <v-flex xs5> -->
                                    <p class="mt-3" style="font-family: roboto;font-weight: 700;">
                                        <span class="" style="color: #e46a25;">Showing {{fromvalue}}-{{toValu}}</span> out of {{this.ForcedMtchDtaRspnseLst.length}} records
                                    </p>
                                    <!-- </v-flex> -->
                                    <!-- <v-divider class="" vertical></v-divider> -->
                                    <!-- <v-flex xs6> -->
                                    <v-pagination class="mr-bnkAcc-pgn" color="#152F38" v-model="pageNumber" :total-visible="4" :length="pages" @input="nextPage"/>

                                    <!-- </v-flex> -->

                                </v-layout>
							<!-- </v-flex>  -->
						</v-layout>
                    </v-card>
                </v-flex>
				

		</v-layout>
		
<!--new bulk upload dailog box-->

<v-layout>
        <v-flex class>
            <!-- <v-row justify="center"> -->
                <v-dialog
                    v-model="dialog1"
                    width="800"
                    height="400"
                    persistent
                    style
                >
                    <v-card>
                            <v-toolbar
                            style="
                                color: #10242b;
                                font-family: roboto;
                                font-weight: 700;
                            "
                        >
                            UPLOAD BULK RECORDS FOR MANUAL RECONCILIATION
                            <v-spacer></v-spacer>
                            <v-icon @click="dialog1 = false">mdi-close</v-icon>
                        </v-toolbar>


            <v-card class="ma-4">

            
                <v-flex xs12 >
                        <v-layout row class="ml-3">
                            <v-flex style="flex: 1;" class="mt-2">
                                <label
                                    class
                                    style="
                                        color: #646666;
                                        font-family: roboto;
                                        font-weight: 700;
                                    "
                                    >Remark</label
                                >
                                <v-flex class=" pt-2 pr-4">
                                    <v-select
                                        :items="remark"
                                        item-text="text"
                                        item-value="value"
                                    
                                        v-model="remark"
                                        label="Select"
                                        
                                        solo
                                    ></v-select>
                                </v-flex>
                            </v-flex>    
                    
                    <v-flex style="flex: 1;" class="mt-2">
                                <label
                                    class
                                    style="
                                        color: #646666;
                                        font-family: roboto;
                                        font-weight: 700;
                                    "
                                    >Description</label
                                >
                                <v-flex class="pt-2 pr-3">
                                    <v-text-field
                                        
                                        v-model="description"
                                        label="Select description"
                                        solo
                                    ></v-text-field>
                                </v-flex>
                            </v-flex>
                    
                        </v-layout>
                    </v-flex> 


                    <v-flex xs12>
                        <v-layout row class="ml-2">
                            <v-flex style="flex: 1;">
                                <label
                                    class="ml-2"
                                    style="
                                        color: #646666;
                                        font-family: roboto;
                                        font-weight: 700;
                                    "
                                    >Upload File</label
                                >
                                <v-flex class=" pt-2 ">
                                    <v-btn
                                        class="pa-4 "
                                        v-model="uploadFile"
                                        label="Upload File For Reconcilation"
                                        style="background-color:white;font-family: roboto;font-weight: 700;"
                                        solo
                                    >Upload File For Reconcilation <v-icon class="mr-4" color="#1E9690" dark right>mdi-publish</v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-flex>    
                    
                    <v-flex style="flex: 1;">
                                <label
                                    class
                                    style="
                                        color: #646666;
                                        font-family: roboto;
                                        font-weight: 700;
                                    "
                                    >OR</label
                                >
                                <v-flex class=" pt-2 ">
                                    <v-btn
                                        v-model="drag"
                                        label="Drag and drop Excel Sheet"   
                                        class="pa-4 mr-4"
                                        solo
                                        prepend-icon="vertical_align_top"
                                        style="border:dashed 1px black;font-family: roboto;font-weight: 700;"
                                    ><v-icon class="ml-2 mr-4">mdi-format-vertical-align-top</v-icon>
                                    Drag and drop Excel Sheet
                                    </v-btn>
                                </v-flex>
                            </v-flex>
                    
                        </v-layout>
                    </v-flex>
                    
                    <v-divider class="ma-4 "></v-divider>

                <v-flex xs12 class="ma-2 pb-3">
                        <v-layout row class="ml-4">
                            <v-flex style="flex: 1;">
                                
                                <v-flex class="">
                                    
                                    <p>
                                        <v-icon class="mr-3" color="#1E9690" small>mdi-domain</v-icon>Closing Balance BS & GC   <v-icon color="#1E9690" class="ml-4">mdi-check</v-icon></p>
                                </v-flex>
                            </v-flex>    
                    
                            <v-flex style="flex: 1;" class="">
                                <v-btn
                                    class=""
                                    color="#D1121B"
                                    text
                                    dark small
                                    style="
                                        font-family: roboto;
                                        font-weight: 700;
                                        text-transform: none;
                                        border-radius:20px;
                                    "
                                    @click="dialog1 = false"
                                >
                                    <v-icon dark class="mr-2" small>mdi-close</v-icon>
                                
                                    Delete
                                </v-btn>

                            </v-flex>
                    
                        </v-layout>
                    </v-flex>
                    
                
                          
            </v-card>    
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-flex align="center" justify="center">
                                <v-btn
                                    class="mb-2"
                                    color="#E46A25"
                                    text
                                    dark
                                    style="
                                        font-family: roboto;
                                        font-weight: 700;
                                        text-transform: none;
                                    "
                                    @click="dialog1 = false"
                                >
                                    <v-icon dark class="mr-2">mdi-keyboard-tab</v-icon>
                                    <v-divider vertical class="mr-2"></v-divider
                                    >Submit for Approval
                                </v-btn>
                            </v-flex>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            <!-- </v-row> -->
        </v-flex>
</v-layout>


<v-flex xs12 ma-3 >            
    <v-card style="background-color:#F7F7F7;border-color:#C1C8CC;border-style:solid;border-width:1px;flex:1;">
        
        <v-layout >
            <v-flex xs12>
            
                <v-layout justify-space-between row>
                
                <p class=" mt-3 ml-2" style="font-family: roboto;font-weight: 700;">Manual Reconciliation Request</p>
                <v-spacer></v-spacer>
                <v-btn style="background-color:white;font-family: roboto;font-weight: 700;" class="pa-3">Start Check</v-btn>
                
                </v-layout>
            
            </v-flex>
        </v-layout>
    </v-card>
</v-flex>            



<v-flex xs12  v-for="(i, index) in paginatedData" :key="index" v-show="ForcedMtchDtafound===true">
<v-card height="" class="ma-3" style="" >
					<v-layout>
						<v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Process Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.processDate|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
                        <v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">System Id</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.systemId|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						
						<v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Receipt No</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.RECEIPT_NO |checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>

						<v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Receipt Source</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.RECEIPT_SOURCE|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>

						<v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Bank Name</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.bankName|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>

						<v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">GC ID</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.GcId|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>

						<v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">BS ID</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.bsId|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Amount(<span>&#8377;</span>)</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.amount|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Txn. Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.transcationDate|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>

                        <v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Remark Type</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.RemarkType|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>

                        <v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Remark Desp</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{i.UserRemarks|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>

						<!-- <v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Txn. Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">5/4/2020</v-text>
								</v-flex>
							</v-flex>
						</v-flex> -->

						<v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Status</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{ i.ApprovalStatus|checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>

						<!-- <v-flex>
							
							<v-flex class="pa-3 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Details</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption font-weight-bold" style="color:#E46A25" @click="showMore(i)">Show more</v-text>
								</v-flex>
							</v-flex>
						</v-flex> -->

                        <v-flex >
							
						<v-flex class="pa-1 " :class="[actionbuttonshowhide === true ? 'cardborder' : '']">
								<v-flex class="mt-2 ml-2">
								<v-text class="caption font-weight-bold" style="color:#10242B">Action</v-text>
								</v-flex>
								<v-flex class="">
									<v-menu 
                                        transition="slide-x-transition"
                                        top
                                        left
                                        :nudge-left="40"
                                        :nudge-bottom="88"
                                        content-class="my-menu-bnkmstr"
                                        style=""
                                        flat
                                    >
                                        <v-btn v-if="actionbuttonshowhide" color="#1E9690" slot="activator" icon small dark >
                                            <v-icon dark small>arrow_forward</v-icon>
                                        </v-btn>
                                        <v-list dense style="background-color:#F7F7F7" class="pa-0 ma-0 cust-bnk-tile">
                                            <v-list-tile
                                                v-for="(item, index) in chkr_items"
                                                :key="index"
                                                @click="chkr_seltd(item,i)" 
                                                class="pa-0 ma-0"
                                                >

                                                <v-list-tile-action  class="pa-0 ma-0" style="background-color:#FFFFFF;min-width: 37px; border-right:0.5px solid #C1C8CC" > 
                                                    <v-icon :color="item.color" class="pl-2 pt-1">{{ item.icon }}</v-icon>
                                                </v-list-tile-action>

                                                <v-list-tile-title class="pa-0 ma-0 pl-2 pt-1 font-weight-bold">
                                                    {{ item.title }}
                                                </v-list-tile-title>

                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
								</v-flex>
							</v-flex>
						</v-flex>

					</v-layout>
				</v-card>
                
			</v-flex>

            <!-- Reject with Remark popup -->
            <!-- Reject Dialog box -->
                <v-layout>
                    <v-dialog v-model="rjctBnkDilg" persistent max-width="650px">
                        <v-card color="#F7F7F7" class="pb-2">
                            <v-layout justify-space-between  class="" style="flex:1;background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
                                <v-card-title class="pa-0 pl-3 bnkAcc-hdr text-uppercase">REJECT WITH REMARK</v-card-title>
                                <div style="border-left:1px solid #C1C8CC;" @click="close_rjctfrm()">
                                    <v-icon style="cursor: pointer;" class="pa-2" >close</v-icon>
                                </div>
                            </v-layout>
                            <v-form v-model="bankRjctForm" ref="rjctform">
                                <v-card class="ma-3 mb-0 px-3 pt-3">
                                    <v-layout class=" mb-3">
                                        <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                            <v-text>Bucket Type</v-text>
                                            <v-text color="#10242B" class="font-weight-bold">Manual Reconciliation update</v-text>
                                        </v-layout>
                                        <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                            <v-text>Request Type</v-text>
                                            <v-text color="#10242B" class="font-weight-bold"> Manual Recon</v-text>
                                        </v-layout>
                                        <v-layout column class="">
                                            <v-text>Request on </v-text>
                                            <v-text color="#10242B" class="font-weight-bold">{{approcavecreateddate}}</v-text>
                                        </v-layout>
                                    </v-layout>
                                    <v-divider ></v-divider>

                                    <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm mt-3 mb-3">
                                        <p class="mb-1 bnkAcc-hdr" style="">Remark Type</p>
                                        <v-autocomplete 
                                            :items="remarktype" 
                                            solo 
                                            label="Select Reason"
                                            item-text="RemarksDescription"
                                    		item-value="RemarksId"
                                            :hide-details = true
                                            v-model="accDesc"
                                            attach
                                        ></v-autocomplete>
                                    </v-flex>
                                    <v-divider></v-divider>
                                    <v-flex xs4 sm6 md10 class="cust-bnkAcc-frm mt-3">
                                        <p class="mb-1 bnkAcc-hdr" style="">Description</p>
                                            <v-textarea
                                                solo
                                                auto-grow
                                                rows="1"
                                                v-model="rjctdesc"
                                                placeholder="Enter Description">
                                            </v-textarea>
                                    </v-flex>
                                </v-card>
                                <v-layout class="mr-2" row justify-end style="">
                                    <v-btn  color="#FFFFFF" class="bnk-txt-tranfrm" @click="close_rjctfrm()">
                                        <v-icon color="#909699" >cancel</v-icon>
                                        <v-divider vertical class="ml-2 mr-2"></v-divider>Cancel
                                    </v-btn>
                                    <v-btn dark color="#D1121B" class="bnk-txt-tranfrm" @click="rejectwithremarkpihit()">
                                        <v-icon  dark >cancel</v-icon>
                                        <v-divider vertical dark class="ml-2 mr-2"></v-divider>Reject
                                    </v-btn>
                                </v-layout>
                            </v-form>
                        </v-card>
                    </v-dialog>
                </v-layout>

            <!-- end -->

               <!-- History Dialog box -->
                <v-layout>
                    <v-dialog v-model="hstryBnkDilg" persistent max-width="720px">
                        <v-card color="#F7F7F7" class="pb-2">
                            <v-layout justify-space-between  class="" style="flex:1;background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
                                <v-card-title class="pa-0 pl-3 bnkAcc-hdr text-uppercase">APPROVAL HISTORY</v-card-title>
                                <div style="border-left:1px solid #C1C8CC;" @click="close_hstryFrm()">
                                    <v-icon style="cursor: pointer;" class="pa-2" >close</v-icon>
                                </div>
                            </v-layout>
                            <!-- <v-form v-model="bankRjctForm" ref="hstryform"> -->
                                <v-card class="ma-3 mb-0 pb-2" color="#F7F7F7">
                                   <v-card color="#FFFFFF" class="pa-3"> 
                                        <v-layout class="">
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                                <v-text>House Of Bank </v-text>
                                                <v-text color="#10242B" class="font-weight-bold">{{approvalhistoryheaderdata.HouseOfBank |checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                                <v-text>Bank Name</v-text>
                                                <v-text color="#10242B" class="font-weight-bold">{{approvalhistoryheaderdata.BankName |checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="">
                                                <v-text>Account Number</v-text>
                                                <v-text color="#10242B" class="font-weight-bold">{{approvalhistoryheaderdata.BankAcNo |checkdata}}</v-text>
                                            </v-layout>
                                        </v-layout>
                                    </v-card>
                                    <v-card class="ma-3 pa-2" v-for="(item,index) in historyapprovaldata" :key="index">
                                        <v-layout class="">
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2 pl-1">
                                                <v-text class="font-weight-bold">Date</v-text>
                                                <v-text color="#10242B" >{{item.UpdatedOn |checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2">
                                                <v-text class="font-weight-bold">Event</v-text>
                                                <v-text color="#10242B" >{{item.ActionTaken |checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2">
                                                <v-text class="font-weight-bold">User</v-text>
                                                <v-text color="#10242B" >{{item.UserName |checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="">
                                                <v-text class="font-weight-bold">Remarks</v-text>
                                                <v-text color="#10242B">{{item.UserRemarks |checkdata}}</v-text>
                                            </v-layout>
                                        </v-layout>
                                    </v-card>
                                </v-card>
                                
                                <v-layout class="mr-2" row justify-end style="">
                                    <v-btn  dark color="#D1121B" class="bnk-txt-tranfrm" @click="close_hstryFrm()">
                                        <v-icon color="" small >cancel</v-icon>
                                        <v-divider vertical class="ml-2 mr-2"></v-divider>Cancel
                                    </v-btn>
                                </v-layout>
                            <!-- </v-form> -->
                        </v-card>
                    </v-dialog>
                </v-layout>

            <v-flex v-show="ForcedMtchDtafound===false">
                <v-card class="ma-3 text-xs-center"><v-card-text><v-text>No Records Found</v-text> </v-card-text></v-card>
            </v-flex>
            
            <!-- Show More Dialog box -->
                <v-layout>
                    <v-dialog v-model="shoMoreDilg" persistent max-width="100%">
                        <v-card color="#F7F7F7" class="pb-2">
                            <v-layout justify-space-between  class="" style="flex:1;background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
                                <v-card-title class="pa-0 pl-3 font-weight-bold text-uppercase">Receipt No. {{frcmtchpopupdta.RECEIPT_NO |checkdata}}</v-card-title>
                                <div style="border-left:1px solid #C1C8CC;" @click="close_showMore()">
                                    <v-icon style="cursor: pointer;" class="pa-2" >close</v-icon>
                                </div>
                            </v-layout>
                                <v-card class="ma-3 mb-0 pb-2" color="#F7F7F7">
                                   <v-card color="#FFFFFF" class="pa-3"> 
                                        <v-layout class="">
                                            <v-layout column class="mr-td-bdrgt mr-3">
                                                <v-text class="font-weight-bold">Created Date </v-text>
                                                <v-text color="#10242B" >{{frcmtchpopupdta.GcCreatedDate |checkdata}} </v-text>
                                            </v-layout>
                                            <v-layout column class="mr-td-bdrgt mr-3">
                                                <v-text class="font-weight-bold">GC ID </v-text>
                                                <v-text color="#10242B" >{{frcmtchpopupdta.GcId |checkdata}} </v-text>
                                            </v-layout>
                                            <v-layout column class="mr-td-bdrgt mr-3">
                                                <v-text class="font-weight-bold">BS ID </v-text>
                                                <v-text color="#10242B" >{{frcmtchpopupdta.bsId |checkdata}} </v-text>
                                            </v-layout>
                                            <v-layout column class="mr-td-bdrgt mr-3">
                                                <v-text class="font-weight-bold">Receipt Date</v-text>
                                                <v-text color="#10242B" >{{frcmtchpopupdta.RECEIPT_DATE |checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="mr-td-bdrgt mr-3">
                                                <v-text class="font-weight-bold">Receipt Status</v-text>
                                                <v-text color="#10242B" >{{frcmtchpopupdta.RECEIPT_STATUS | checkdata}}</v-text>
                                            </v-layout>
                                             <v-layout column class="mr-td-bdrgt mr-3">
                                                <v-text class="font-weight-bold">Receipt Amount</v-text>
                                                <v-text color="#10242B" ><span>&#8377;</span>{{frcmtchpopupdta.RECEIPT_TOTAL_AMT | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="">
                                                <v-text class="font-weight-bold">Payment Mode</v-text>
                                                <v-text color="#10242B">{{frcmtchpopupdta.PAYMENT_MODE_CD | checkdata}}</v-text>
                                            </v-layout>
                                        </v-layout>
                                    </v-card>
                                    <v-layout class="pa-3" wrap >
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Bank Name</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.bankName|checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Bank Name</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.accountNumber |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">D/C</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.dc |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Insured Name</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.INSURED_NAME |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Payment Instruction Date</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.PYMT_INSTR_DATE |checkdata}} </v-text>
                                        </v-layout>
                                         <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Cheque No.</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.PYMT_CHK_NO |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Payment Branch Name</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.PYMT_BRANCH_NM |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Authorization CD</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.AUTHORIZATION_CD |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Company ID</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.COMPANY_ID |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Debtor Type CD</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.DEBTOR_TYPE_CD |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Debtor ID</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.DEBTOR_ID |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Deposit Bank CD</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.DEPOSIT_BANK_CD |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Deposit Slip No.</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.DEPOSIT_SLIP_NO |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Deposit Slip Date</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.DEPOSIT_SLIP_DT |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Creator user ID    </v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.CREATOR_USER_ID |checkdata}} </v-text>
                                        </v-layout>

                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Trans TimeStamp</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.TRANS_TIMESTAMP |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">UserId CD</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.USERID_CD |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">TimeStamp</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta. TIMESTAMP |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Agent CD</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.AGENT_CD |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Agent Receipt Date</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.AGENT_RECPT_DT |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Deposit Bank Acc.</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.DEPOSIT_BANK_ACC|checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Freeze</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta. FREEZE |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Recieved From</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.RECIVED_FROM |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Recieved OPT Type</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.RECIVED_OPT_TYPE |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Recieved Client ID</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.RECIVED_CLIENT_ID |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Tagged Amount</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.TAGGED_AMOUNT |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Partner Application No.</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.PATNER_APPLICATION_NO |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Payee Relation Type</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.PAYEE_RELATION_TYPE |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5"> Branch Name</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.BRANCH_NAME |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="mr-5">Producer Name</v-text>
                                            <v-text color="#10242B" class="font-weight-bold mr-5">{{frcmtchpopupdta.PRODUCER_NAME |checkdata}} </v-text>
                                        </v-layout>
                                        <v-layout column class="mr-td-bdrBtm py-3">
                                            <v-text class="">Channel</v-text>
                                            <v-text color="#10242B" class="font-weight-bold">{{frcmtchpopupdta.CHANNEL |checkdata}} </v-text>
                                        </v-layout>
                                    </v-layout>
                                    
                                </v-card>
                                
                        </v-card>
                    </v-dialog>
                </v-layout>


        
        </v-card>
    </v-app>    
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
     created() {

        this.User_id = this.$store.state.agentDetails.userId;
        this.sessionId = this.$store.state.agentDetails.sessionId;
		this.$store.commit('SET_PAGE_TITLE', 'Manual Reconciled');
        this.GetAllFiltersData();
        this.getremarktypedata();

        let menulist = this.$store.getters.getDetamenulistils

        console.log("ALL MENU LIST:::",menulist)
        // let manualrecondata = menulist[8]

        // console.log("manual menu LIST::",manualrecondata);

        for(let i=0;i<menulist.length;i++){

            if(menulist[i].menuName === 'manualReconCases'){
                if(menulist[i].approveReject){
                    this.actionbuttonshowhide = true
                    console.log("ACTION BUTTON TRUE",this.actionbuttonshowhide)
                }else{
                    this.actionbuttonshowhide = false
                    console.log("ACTION BUTTON False",this.actionbuttonshowhide)
                }
            }
        }
       


        
     },

    computed: {
        
        filteredItems() {
            return _.orderBy(this.output.filter(item => {
              if(!this.search) return this.output;
                return (
                    item.HouseOfBank.toLowerCase().includes(this.search.toLowerCase())
                    // item.BankAcNo.includes(this.search)
                );
            }));
        },

        pages () {

            console.log(this.size ? Math.ceil(this.ForcedMtchDtaRspnseLst.length / this.size) : 0)
            return this.size ? Math.ceil(this.ForcedMtchDtaRspnseLst.length / this.size) : 0
        },

        pageCount() {
            let l = this.ForcedMtchDtaRspnseLst.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },

        paginatedData() {
            
            const start = this.pageNumber * this.size - this.size,
            end = start + this.size;

            console.log(start,end,"start End")

            if(!this.ForcedMtchDtaRspnseLst || this.ForcedMtchDtaRspnseLst.length == 0){
                this.fromvalue=0
            }else{
                this.fromvalue=start+1;
            }

            
            if(this.ForcedMtchDtaRspnseLst.length <this.size){
                this.toValu=this.ForcedMtchDtaRspnseLst.length
            }else if(this.ForcedMtchDtaRspnseLst.length <end){
                this.toValu=this.ForcedMtchDtaRspnseLst.length
            }else{
                this.toValu=end
            }

            console.log(this.fromvalue,this.toValu,"this.fromvalue this.toValu")

            return this.ForcedMtchDtaRspnseLst.slice(start, end);
        } 
    },

    filters:{

        checkdata(data) {
	        // console.log('Validity Data', data);
	        if (data == "" || data == "undefined" || data == null || data == '' || data == 'Invalid Date') {
	            return "-"
	        } else {
	            return data;
	        }
	    },
    },

    data() {
        return {
            dialog1: false,
            actionbuttonshowhide:false,
            recorecode:'',
            accDesc:'',
            approcavecreateddate:'',
            rjctdesc:'',
            Nature:["Collection", "Payment", "Investment"],
            rjctBnkDilg:false,
            hstryBnkDilg:false,
            bankRjctForm:false,
            ForcedMtchDtafound:false,
            shoMoreDilg:false,
            frcmtchpopupdta:{},
            User_id:'',
            sessionId:'',
            nameofbank:'',
            fromvalue:'',
            toValu:'',
            page:'',
            subbnknme:"",
            bankaccountnumber:'',
            output:[],
            bnkProfilePic:"",
            remark:[],
            description:'',
            uploadFile:'',
            drag:'',
            FilteringApi:[],
            ForcedMtchDtaRspnseLst:[],
            remarktype:[],
            historyapprovaldata:[],
            approvalhistoryheaderdata:[],
            pageNumber: 1,
            size: 15,
            chkr_items: [
                { title: 'View Details', icon:'highlight',color:"#646666"},
                { title: 'Approve', icon:'check_circle',color:"#1E9690" },
                { title: 'Reject With Remark' , icon:'cancel',color:"#D1121B"},
                { title: 'Approval History' , icon:'info',color:"#E46A25"}
            ],
            bankList: [
						// { bankname: 'HDFC Bank',
						// accountno:'012345678' },
						// { bankname: 'Axis Bank', 
						// accountno:'012345678' },
						// { bankname: 'ICICI Bank',
						// accountno:'012345678'},
						// { bankname: 'SBI Bank',
						// accountno:'012345678' }
                    ]            
        }
    },
    methods:{

        getremarktypedata(){
					
            this.remarktype = this.$store.state.remarktype.Reconpageremarktpe
            console.log("GET Remark Type::",this.remarktype);
		},
        approveddataapihit(){

            var self = this;
				
				axios({
					method: "post",
					url:
						this.API_Service_admin()+"/ApprovalAPI/api/ApprovalProcess/UpdateApprovalBucketAction",
					headers: {
						"Content-Type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "a960ffd8-9a16-045c-a0a7-46156aaa27b9",
					},
					data: {
						UserId: 1,
						PageName:"approvalBucketView",
                        BankAcNo: self.bankaccountnumber,
                        SessionID : 1,
						UpdateApprovalActionTypeList : [{
							RecordType : "manualReconUpdate" ,
							RecordCode :  self.recorecode,
							ActionTaken : "approved" ,
							RemarkId : 0 ,
							Remarks  : ''
						}]

					},
				})
					.then(function (response) {
						console.log("Approval APi Response>>>>>>", response);
						if(response.data[0].Status === 'Success'){
                            self.showToast( "Approval Success" , self.TOST().SUCCESS);
                            self.recorecode = ''
                        }else{
								self.showToast( response.data[0].Message , self.TOST().ERROR);
                        }
					})
					.catch(function (error) {
					self.showLoader('Loading', false);
						console.log("Approval APi Response>>>>>>", error);
					});
        },
        rejectwithremarkpihit(){
            var self = this;
				
				axios({
					method: "post",
					url:
						this.API_Service_admin()+"/ApprovalAPI/api/ApprovalProcess/UpdateApprovalBucketAction",
					headers: {
						"Content-Type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "a960ffd8-9a16-045c-a0a7-46156aaa27b9",
					},
					data: {
						UserId: 1,
						PageName:"approvalBucketView",
                        BankAcNo: self.bankaccountnumber,
                        SessionID : 1,
						UpdateApprovalActionTypeList : [{
							RecordType : "manualReconUpdate" ,
							RecordCode :  self.recorecode ,
							ActionTaken : "approved" ,
							RemarkId : self.accDesc ,
							Remarks  : self.rjctdesc
						}]

					},
				})
					.then(function (response) {
						console.log("Approval APi Response>>>>>>", response);
						if(response.data[0].Status === 'Success'){
                            self.showToast( "Remark Updated Successfully" , self.TOST().SUCCESS);
                            self.close_rjctfrm()
                        }else{
								self.showToast( response.data[0].Message , self.TOST().ERROR);
                        }
						

					})
					.catch(function (error) {
					self.showLoader('Loading', false);
						console.log("Approval APi Response>>>>>>", error);
					});
        },
        close_hstryFrm(){
            this.hstryBnkDilg = false
        },
        
        close_rjctfrm(){
                this.recorecode = ''
                this.accDesc = ''
                this.rjctdesc = ''

                this.approcavecreateddate = ''
                this.rjctBnkDilg=false
        },
        chkr_seltd(item,tbldta){
                console.log("item clciked",item);
                console.log('tbldta',tbldta)

                if(item.title==="View Details"){
                    // this.shwApprvBtn=false
                    // this.rjctBnkDilg=false
                    // this.hstryBnkDilg=false
                    // this.viewBnkDtls(tbldta)
                    this.showMore(tbldta)
                }else if(item.title==="Approve"){
                    this.recorecode = tbldta.forceMatchTrCode
                    this.approveddataapihit()
                    // this.shwApprvBtn=true
                    // this.rjctBnkDilg=false
                    // this.hstryBnkDilg=false
                    // this.viewBnkDtls(tbldta)
                    
                }else if(item.title==="Reject With Remark"){
                    // this.shwApprvBtn=false
                    // this.accType='Reject With Remark'
                    // this.$refs.rjctform.reset();
                    this.rjctBnkDilg=true
                    this.approcavecreateddate = tbldta.forceMatchDate
                    this.recorecode = tbldta.forceMatchTrCode
                    // this.hstryBnkDilg=false
                }else if(item.title==="Approval History"){
                    // this.shwApprvBtn=false
                    // this.accType='Approval History'
                    // // this.$refs.hstryform.reset();
                    // this.rjctBnkDilg=false
                    this.approcavecreateddate = tbldta.forceMatchDate
                    this.recorecode = tbldta.forceMatchTrCode
                    this.gethistory()
                    // this.hstryBnkDilg=true
                }
                
        },

        gethistory(){
                var self = this;
                
                
                self.historyapprovaldata = []
                self.approvalhistoryheaderdata = []
				axios({
					method: "post",
					url:
						this.API_Service_admin()+"/ApprovalAPI/api/ApprovalProcess/GetApprovalRecordHistory",
					headers: {
						"Content-Type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "55b94328-0e32-b65f-cc39-07a734f79620",
					},
					data: {
						UserId: 1,
						PageName:"approvalBucketView",
                        BankAcNo: self.bankaccountnumber,
                        SessionID : 1,
                        RecordType : "manualReconUpdate",
                        RecordCode : self.recorecode
						
					},
				})
					.then(function (response) {
						console.log("Approval APi Response>>>>>>", response);
						if(response.data.Status === 'Success'){
                        console.log("API SUCCESS::::",response.data)
                        
                        if(response.data.HistoryOfManualReconList.length > 0){
                            self.historyapprovaldata = response.data.HistoryOfManualReconList
                            self.approvalhistoryheaderdata = response.data.HistoryOfManualReconList[0]
                        }
                            
                
                           self.rjctBnkDilg=false
                           self.hstryBnkDilg=true
                        
                        }else{
								self.showToast( response.data.Message , self.TOST().ERROR);
                        }

                   
					})
					.catch(function (error) {
					self.showLoader('Loading', false);
						console.log("Approval APi Response>>>>>>", error);
					});
            },
        getImgUrl(picname) {
            console.log(picname,"picname")
            try{
                this.bnkProfilePic = require('../../assets/'+picname+'.png')
            }catch(error){
                this.bnkProfilePic = require('../../assets/All_banks.png')
            }
            return this.bnkProfilePic
        },
         clearSearch () {
        this.search="";
      },

        selectbank(houseOfBank,accno,bnknme) {

            console.log("SELECTED DATA::", accno);
            this.search=""
            this.nameofbank = houseOfBank;
            this.bankaccountnumber = accno;
            this.subbnknme=bnknme
            this.getImgUrl(this.nameofbank);
            this.GetForcedMatcedData();
          
        },

        GetAllFiltersData(bnkAccNo) {
            var self = this;
            
        
            self.FilteringApi=[];
            self.FilteringApi = this.$store.getters.getbankDetails;
             // console.log("Header",agentAdmin);
            self.bankList = [];
            self.FilteringApi.map((bnk) => {
                self.bankList.push({
                    BankName: bnk.bankName,
                    BankAcNo: bnk.bankAcNo,
                    HouseOfBank: bnk.houseOfBank,
                    fullObj: bnk,
                });
            });
            console.log("bankList Array", self.bankList);
            
            self.output=[]
            self.output = self.bankList.reduce(function(o, cur) {
                // console.warn("cur", cur);

            // Get the index of the key-value pair.
            var occurs = o.reduce(function(n, item, i) {
                return (item.HouseOfBank === cur.HouseOfBank) ? i : n;
            }, -1);
            //   console.warn("occurs", occurs);
            // If the name is found,
            if (occurs >= 0) {

                // append the current value to its list of values.
                o[occurs].BankAcNo = o[occurs].BankAcNo.concat({BankAcNo:cur.BankAcNo,BankName:cur.BankName});

                // Otherwise,
            } else {

                // add the current item to o (but make sure the value is an array).
                var obj = {
                HouseOfBank: cur.HouseOfBank,
                BankAcNo: [{BankAcNo:cur.BankAcNo,BankName:cur.BankName}]
                };
                // obj.BankAcNo.push({BankAcNo:cur.BankAcNo})
                // console.warn("obj",obj );
                o = o.concat([obj]);
            }

            return o;
            }, []);

            console.log(self.output);
            self.selectbank(self.bankList[0].HouseOfBank,self.bankList[0].BankAcNo,self.bankList[0].BankName);
        },

        nextPage(page) {
            console.log(page,"page")
            this.pageNumber = page;
        },

        GetForcedMatcedData(){

              let self=this
              self.showLoader('Loading', true);
              self.ForcedMtchDtaRspnseLst=[]

            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/ManualReconAPI/api/forceMatch/GetForcedMatcedData",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "8470a8e1-d65b-dec8-1ff5-0f610749d7d4",
                },
                data: {
                    UserId: self.User_id,
                    PageName: "manualReconcCasesView",
                    SessionID:self.sessionId,
                    BankAcNo: self.bankaccountnumber,
                },
            })
            .then(function (response) {
                
                if(!response.data.GetForcedMatchDataResponseList || response.data.GetForcedMatchDataResponseList == 0){
                        console.log("Array is either empty or does not exist")
                        self.ForcedMtchDtafound=false
                        self.showLoader('Loading', false);
                        self.showToast("No Records Found for Selected bank",self.TOST().WARNING);
                        
                        return
                        
                }
                self.ForcedMtchDtaRspnseLst=response.data.GetForcedMatchDataResponseList
                self.ForcedMtchDtafound=true
                console.log(" GetForcedMatcedData APi Response>>>>>>", self.ForcedMtchDtaRspnseLst);  
                self.showLoader('Loading', false);
                
            })
            .catch(function (error) {
                console.log("GetForcedMatcedData APi Response>>>>>>", error);
            });

        },
        showMore(item){
            console.log("items",item)
            this.shoMoreDilg=true
            this.frcmtchpopupdta = item
        },
        close_showMore(){
                this.shoMoreDilg=false
            },

    }
}
</script>
<style >

.bnk-txt-tranfrm{
        text-transform: none;
    }
.bnkAcc-td-bdrgt {
        border-right:1px solid #C1C8CC;
    }
.bnkAcc-hdr{
        color:#646666; 
        font-family:roboto; 
        font-weight:700

}
.cust-bnk-tile .v-list__tile{
    padding-left:0px !important;
}
.my-menu-bnkmstr {
        /* border: solid black; */
  margin-top: 40px;
  contain: initial;
  overflow: visible;
}
.my-menu-bnkmstr::before {
  position: absolute;
  content: "";
  top: 13px;
  right: -16px;
  transform: rotate(90deg);
  width: 10px; 
  height: 13px; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #F7F7F7;
}
.cardborder{
	border-top-color: #C1C8CC;
	border-bottom-color: #C1C8CC;
	border-right-color: #C1C8CC;
	border-left-color: #C1C8CC;
	border-style: solid;
	border-width: 1px;
}

.backdropdown_mr {
    background: #ffffff;
    border-left: 1px solid #c1c8cc;
    /* height: 67px; */
}
.bandkdivcust_mr {
    padding: 6px;
    border-top-color: #ffffff;
    border-right-color: #c1c8cc;
    border-bottom-color: #ffffff;
    border-left-color: #ffffff;
    border-style: solid;
    border-width: 1px;
}
.bankimg_mr {
    height: 45px;
    width: 45px;
}
.downarrow_mr {
    height: 10px;
    width: 10px;
}

.mr-td-bdrgt {
        border-right:1px solid #C1C8CC;
    }
.mr-td-bdrBtm {
        border-bottom:1px solid #C1C8CC;
}

.cust-Mr-list .v-list__group__items--no-action .v-list__tile {
    padding-left: 30px;
}

.mr-bnkAcc-pgn .v-pagination__navigation{
    box-shadow:unset !important;
    border-radius: unset !important;
    background-color:#FFFFFF !important;
    border:1px solid #DAE1E6 !important
}

.mr-bnkAcc-pgn .v-pagination__navigation--disabled{
    background-color:#DAE1E6 !important;
}

.mr-bnkAcc-pgn .v-pagination__item{
    box-shadow:unset !important;
    min-width:2rem !important;
    height:2rem !important;
    border-radius: unset !important;
    border:1px solid #DAE1E6 !important
}
</style>