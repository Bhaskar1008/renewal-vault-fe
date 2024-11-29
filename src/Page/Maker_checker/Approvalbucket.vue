<template>
   <v-app>
      <v-card class="ma-3">
         <v-layout style="border:1px solid #C1C8CC">
            <v-flex  justify-space-between align-center>
               <v-layout style="padding:22px;background-color:#F7F7F7;align-items:center;">
                  <v-flex>
                     <v-text class="body-2" style="color:#646666">Approval Requests Pending</v-text>
                  </v-flex>
               </v-layout>
            </v-flex>

            <v-flex class="backdropdown_di" xs4 style="">
					<v-menu style="width: 100%;" max-height="500px" min-width="400px" max-width="400px" offset-y>
						<template slot="activator" v-slot-activator="{ on }">
							<v-layout justify-space-between align-center v-on="on" style="">
								<div class="bandkdivcust_di"> <img class="bankimg" :src="bnkProfilePic" /> </div>
								<v-flex class="">
									<v-flex>
										<p class="caption font-weight-bold mb-0 pl-2 pt-2" style="color: #10242b;"> {{ nameofbank + " ( "}}{{ subbnknme + " ) "}} </p>
									</v-flex>
									<v-layout align-center>
										<div>
											<p class="caption font-weight-bold pl-2" style="color: #10242b;"> A/C no. </p>
										</div>
										<div>
											<p class="caption" style="color: #10242b;"> {{ bankaccountnumber }} </p>
										</div>
									</v-layout>
								</v-flex>
								<v-flex class=""> <img class="downarrow" src="../../../web/assets/downarrow.png" /> </v-flex>
							</v-layout>
						</template>
						<v-list>
							<v-text-field class="mx-3" depressed label="Search Bank Name" prepend-inner-icon="search" solo @click.stop v-model="search" clearable @click:clear="clearSearch"></v-text-field>
							<v-list-group v-for="item in filteredItems" :key="item.HouseOfBank" v-model="item.active" :prepend-icon="item.action" no-action @click.stop class="cust-Di-list">
								<div slot="activator">
									<v-list-tile>
										<v-list-tile-content>
											<v-list-tile-title class="body-2">{{ item.HouseOfBank }}</v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>
								</div>
								<v-list-tile v-for="(subItem,index) in item.BankAcNo" :key="index" @click="selectbank(item.HouseOfBank,subItem.BankAcNo,subItem.BankName,subItem.transectionstartdate)" class="">
									<v-list-tile-content>
										<v-list-tile-title class="body-1">{{subItem.BankName + " - "}}{{subItem.BankAcNo}}</v-list-tile-title>
									</v-list-tile-content>
								</v-list-tile>
							</v-list-group>
						</v-list>
					</v-menu>
				</v-flex>
         </v-layout>
         <v-layout>
            <v-card hover ripple height=110 style="background-color:#FEF9F6;border-color:#E46A25;border-style:solid;border-width:1px;" color="" class="card-1 pa-2 ma-3">
               <v-text class="body-2 font-weight-bold" style="color:#E46A25">Approval Requests Pending</v-text>
               <v-divider class="mt-2 mb-2"></v-divider>
               <v-layout>
                  <v-flex class="mr-4">
                     <v-layout mt-2 justify-space-between row>
                        <div class="mr-4">
                           <v-text class="caption" style="color:#10242B">Bank Master Update</v-text>
                        </div>
                        <div class="">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{bankmastercount}}</v-text>
                        </div>
                     </v-layout>
                     <v-layout justify-space-between row>
                        <div class="mr-4">
                           <v-text class="caption" style="color:#10242B">Manual Reconciliation Request</v-text>
                        </div>
                        <div class="">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{manualreconcount}}</v-text>
                        </div>
                     </v-layout>
                  </v-flex>
                  <v-flex class="mr-4">
                     <!-- <v-layout mt-2 justify-space-between row>
                        <div class="mr-4">
                           <v-text class="caption" style="color:#10242B">Unreconciliation Request</v-text>
                        </div>
                        <div class="">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{Unreconciliationcount}}</v-text>
                        </div>
                     </v-layout> -->
                     <v-layout mt-2 justify-space-between row>
                        <div class="mr-4">
                           <v-text class="caption" style="color:#10242B">Auto Reconciliation Request</v-text>
                        </div>
                        <div class="">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{autoreconcount}}</v-text>
                        </div>
                     </v-layout>
                     <v-layout justify-space-between row>
                        <div class="mr-4">
                           <v-text class="caption" style="color:#10242B">Recon Rules Update</v-text>
                        </div>
                        <div class="">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{reconrulecount}}</v-text>
                        </div>
                     </v-layout>
                  </v-flex>

                  <!-- <v-flex>
                     <v-layout mt-2 justify-space-between row>
                        <div class="mr-4">
                           <v-text class="caption" style="color:#10242B">Auto Reconciliation Request</v-text>
                        </div>
                        <div class="">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{autoreconcount}}</v-text>
                        </div>
                     </v-layout>
                     <v-layout justify-space-between row>
                      
                     </v-layout>
                  </v-flex> -->
               </v-layout>
            </v-card>
         </v-layout>
         <v-layout style="border:1px solid #C1C8CC" v-if="bankmastercount > 0">
            <v-flex  justify-space-between align-center>
               <v-layout style="padding:10px;background-color:#23B1A9;align-items:center;">
                  <v-flex>
                     <v-text class="body-2" style="color:#ffffff">Bank Master Update</v-text>
                  </v-flex>
               </v-layout>
            </v-flex>
         </v-layout>
         <v-flex v-if="bankmastercount > 0" xs12>
            <v-card height="63"  class="ma-3" style="" v-for="(item, index) in bankmasterdata" :key="index">
               <v-layout >
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request on</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestedOn | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request ID</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestId | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Bank Account Name</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.BankAccountName | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Bank Account Number</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.BankAccountNumber | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Remark Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RemarkType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Remark Description</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.UserRemarks | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Status</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{item.Status | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex class="pa-2 cardborder" v-if="actionbuttonshowhide"  :class="[actionbuttonshowhide === true ? 'cardborder' : '']" style="height:63px;background-color:#f7f7f7;">

                  <v-flex class="ml-2 mt-1" style="background-color:#f7f7f7;">
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
                                        <v-btn v-if="actionbuttonshowhide"  color="#1E9690" slot="activator" icon small dark >
                                            <v-icon dark small>arrow_forward</v-icon>
                                        </v-btn>
                                        <v-list dense style="background-color:#F7F7F7" class="pa-0 ma-0 cust-bnk-tile">
                                            <v-list-tile
                                                v-for="(itempopover, index) in chkr_items"
                                                :key="index"
                                                @click="bankmaster_seltd(itempopover,item)" 
                                                class="pa-0 ma-0"
                                                >

                                                <v-list-tile-action  class="pa-0 ma-0" style="background-color:#FFFFFF;min-width: 37px; border-right:0.5px solid #C1C8CC" > 
                                                    <v-icon :color="itempopover.color" class="pl-2 pt-1">{{ itempopover.icon }}</v-icon>
                                                </v-list-tile-action>

                                                <v-list-tile-title class="pa-0 ma-0 pl-2 pt-1 font-weight-bold">
                                                    {{ itempopover.title }}
                                                </v-list-tile-title>

                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
							</v-flex>
                  </v-flex>
                  <!-- <v-flex style="height:63px; align-items:center;justify-content:center;display:flex;background-color:#f7f7f7;">
                     <v-flex class="pa-3 cardborder" style="align-items:center;justify-content:center;display:flex;">
                        <v-menu
                           :nudge-left="150"
                           content-class="my-menu"
                           offset-x
                           >
                           <v-flex slot="activator" style="align-items:center;justify-content:center;display:flex;">
                              <img class="pendingarrow" src="../../../web/assets/rightcolorarrow.png">
                           </v-flex>
                           
                           <v-card class="" style="background-color:#F7F7F7;">
                              <v-layout class="pa-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/viewdetails.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;" @click="routetobankmaster">
                                    <v-text class="caption font-weight-bold" style="color:#10242B">View Details</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/approvicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;" @click="routetobankmaster">
                                    <v-text class="caption font-weight-bold" style="color:#10242B">Approve</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/closeicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;" @click="routetobankmaster">
                                    <v-text class="caption font-weight-bold" style="color:#10242B">Reject With Remark</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/approvalhistoryicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;" @click="routetobankmaster">
                                    <v-text class="caption font-weight-bold" style="color:#10242B">Approval History</v-text>
                                 </div>
                              </v-layout>
                           </v-card>
                        </v-menu>
                     </v-flex>
                  </v-flex> -->
               </v-layout>
            </v-card>
         </v-flex>

         <v-layout v-if="reconrulecount > 0" style="border:1px solid #C1C8CC">
            <v-flex  justify-space-between align-center>
               <v-layout style="padding:10px;background-color:#23B1A9;align-items:center;">
                  <v-flex>
                     <v-text class="body-2" style="color:#ffffff">Recon Rules Update</v-text>
                  </v-flex>
               </v-layout>
            </v-flex>
         </v-layout>
         <v-flex v-if="reconrulecount > 0" xs12>
            <v-card height="63"  class="ma-3" style="" v-for="(item, index) in reconruledata" :key="index">
               <v-layout >
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request on</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestedOn | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request ID</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestId | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Txn Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.TransactionType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Rule Order</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RuleOrder | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Remark Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RemarkType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Remark Description</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.UserRemarks | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Status</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{item.Status | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <!-- <v-flex style="height:63px; align-items:center;justify-content:center;display:flex;background-color:#f7f7f7;">
                     <v-flex class="pa-3 cardborder" style="align-items:center;justify-content:center;display:flex;">
                        <v-menu
                           :nudge-left="150"
                           content-class="my-menu"
                           offset-x
                           >
                           <v-flex slot="activator" style="align-items:center;justify-content:center;display:flex;">
                              <img class="pendingarrow" src="../../../web/assets/rightcolorarrow.png">
                           </v-flex>
                           <v-card class="" style="background-color:#F7F7F7;">
                              <v-layout class="pa-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/viewdetails.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routereconrulepage">View Details</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/approvicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routereconrulepage">Approve</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/closeicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routereconrulepage">Reject With Remark</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/approvalhistoryicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routereconrulepage">Approval History</v-text>
                                 </div>
                              </v-layout>
                           </v-card>
                        </v-menu>
                     </v-flex>
                  </v-flex> -->

                  <v-flex class="pa-2 cardborder" v-if="actionbuttonshowhide" :class="[actionbuttonshowhide === true ? 'cardborder' : '']" style="height:63px;align-items:center;justify-content:center;display:flex;background-color:#f7f7f7;">
								<!-- <v-flex class="ml-2">
								<v-text class="caption font-weight-bold" style="color:#10242B">Action</v-text>
								</v-flex> -->
								<v-flex class="ml-2 mt-1">
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
                                                v-for="(itempopover, index) in chkr_items"
                                                :key="index"
                                                @click="Rule_seltd(itempopover,item)" 
                                                class="pa-0 ma-0"
                                                >

                                                <v-list-tile-action  class="pa-0 ma-0" style="background-color:#FFFFFF;min-width: 37px; border-right:0.5px solid #C1C8CC" > 
                                                    <v-icon :color="itempopover.color" class="pl-2 pt-1">{{ itempopover.icon }}</v-icon>
                                                </v-list-tile-action>

                                                <v-list-tile-title class="pa-0 ma-0 pl-2 pt-1 font-weight-bold">
                                                    {{ itempopover.title }}
                                                </v-list-tile-title>

                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
								</v-flex>
						</v-flex>
                  

               </v-layout>
            </v-card>
         </v-flex>
         <v-layout style="border:1px solid #C1C8CC" v-if="manualreconcount > 0">
            <v-flex  justify-space-between align-center>
               <v-layout style="padding:10px;background-color:#23B1A9;align-items:center;">
                  <v-flex>
                     <v-text class="body-2" style="color:#ffffff">Manual Reconciliation Request</v-text>
                  </v-flex>
               </v-layout>
            </v-flex>
         </v-layout>
         <v-flex v-if="manualreconcount > 0" xs12>
            <v-card height="63"  class="ma-3" style="" v-for="(item, index) in manualrecondata" :key="index">
               <v-layout >
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request on</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestedOn | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request ID</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestId | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Bank Name</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.BankAccountName | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">GC ID</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.GcId | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">BS ID</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.BsId | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Txn. Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.TransactionType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Amount (₹)</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.Amount | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Txn. Date</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.TransactionDate | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Remark Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RemarkType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Remark Description</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.UserRemarks | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Status</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{item.Status | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  
                  <!-- <v-flex style="height:63px; align-items:center;justify-content:center;display:flex;background-color:#f7f7f7;">
                     <v-flex class="pa-3 cardborder" style="align-items:center;justify-content:center;display:flex;">
                        <v-menu
                           :nudge-left="150"
                           content-class="my-menu"
                           offset-x
                           >
                           <v-flex slot="activator" style="align-items:center;justify-content:center;display:flex;">
                              <img class="pendingarrow" src="../../../web/assets/rightcolorarrow.png">
                           </v-flex>
                           <v-card class="" style="background-color:#F7F7F7;">
                              <v-layout class="pa-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/viewdetails.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routetomanualreconpage">View Details</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/approvicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routetomanualreconpage">Approve</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/closeicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routetomanualreconpage">Reject With Remark</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/approvalhistoryicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routetomanualreconpage">Approval History</v-text>
                                 </div>
                              </v-layout>
                           </v-card>
                        </v-menu>
                     </v-flex>
                  </v-flex> -->
                  
                  <v-flex class="pa-2 cardborder" v-if="actionbuttonshowhide" style="height:63px;background-color:#f7f7f7;" :class="[actionbuttonshowhide === true ? 'cardborder' : '']">
								<!-- <v-flex class="ml-2">
								<v-text class="caption font-weight-bold" style="color:#10242B">Action</v-text>
								</v-flex> -->
								<v-flex class="ml-2 mt-1">
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
                                                v-for="(itempopup, index) in chkr_items"
                                                :key="index"
                                                @click="manual_seltd(itempopup,item)" 
                                                class="pa-0 ma-0"
                                                >

                                                <v-list-tile-action  class="pa-0 ma-0" style="background-color:#FFFFFF;min-width: 37px; border-right:0.5px solid #C1C8CC" > 
                                                    <v-icon :color="itempopup.color" class="pl-2 pt-1">{{ itempopup.icon }}</v-icon>
                                                </v-list-tile-action>

                                                <v-list-tile-title class="pa-0 ma-0 pl-2 pt-1 font-weight-bold">
                                                    {{ itempopup.title }}
                                                </v-list-tile-title>

                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
								</v-flex>
						</v-flex>

                

               </v-layout>
            </v-card>
         </v-flex>
        

        <v-layout style="border:1px solid #C1C8CC" v-if="autoreconcount > 0">
            <v-flex  justify-space-between align-center>
               <v-layout style="padding:10px;background-color:#23B1A9;align-items:center;">
                  <v-flex>
                     <v-text class="body-2" style="color:#ffffff">Auto Reconciliation Request</v-text>
                  </v-flex>
               </v-layout>
            </v-flex>
         </v-layout>
         <v-flex v-if="autoreconcount > 0" xs12>
            <v-card height="63"  class="ma-3" style="" v-for="(item, index) in autorecondatalist" :key="index">
               <v-layout >
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request on</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestedOn | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request ID</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestId | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Request Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RequestType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Bank Name</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.BankAccountName | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">GC ID</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.GcId | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">BS ID</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.BsId | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Txn. Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.TransactionType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Amount (₹)</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.Amount | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Txn. Date</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.TransactionDate | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Remark Type</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.RemarkType | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Remark Description</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption" style="color:#10242B">{{item.UserRemarks | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  <v-flex>
                     <v-flex class="pa-2 cardborder">
                        <v-flex>
                           <v-text class="caption font-weight-bold" style="color:#10242B">Status</v-text>
                        </v-flex>
                        <v-flex class="mt-1">
                           <v-text class="caption font-weight-bold" style="color:#E46A25">{{item.Status | checkdata}}</v-text>
                        </v-flex>
                     </v-flex>
                  </v-flex>
                  
                  <!-- <v-flex style="height:63px; align-items:center;justify-content:center;display:flex;background-color:#f7f7f7;">
                     <v-flex class="pa-3 cardborder" style="align-items:center;justify-content:center;display:flex;">
                        <v-menu
                           :nudge-left="150"
                           content-class="my-menu"
                           offset-x
                           >
                           <v-flex slot="activator" style="align-items:center;justify-content:center;display:flex;">
                              <img class="pendingarrow" src="../../../web/assets/rightcolorarrow.png">
                           </v-flex>
                           <v-card class="" style="background-color:#F7F7F7;">
                              <v-layout class="pa-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/viewdetails.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routetomanualreconpage">View Details</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/approvicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routetomanualreconpage">Approve</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/closeicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routetomanualreconpage">Reject With Remark</v-text>
                                 </div>
                              </v-layout>
                              <v-layout class="pr-2 pl-2 pb-2">
                                 <div class="mr-3 cusrsor">
                                    <img class="popupicon" src="../../../web/assets/approvalhistoryicon.png">
                                 </div>
                                 <div class="cusrsor" style="display:flex;justify-content:center;">
                                    <v-text class="caption font-weight-bold" style="color:#10242B" @click="routetomanualreconpage">Approval History</v-text>
                                 </div>
                              </v-layout>
                           </v-card>
                        </v-menu>
                     </v-flex>
                  </v-flex> -->
                  
                  <v-flex class="pa-2 cardborder" v-if="actionbuttonshowhide" style="height:63px;background-color:#f7f7f7;" :class="[actionbuttonshowhide === true ? 'cardborder' : '']">
								<!-- <v-flex class="ml-2">
								<v-text class="caption font-weight-bold" style="color:#10242B">Action</v-text>
								</v-flex> -->
								<v-flex class="ml-2 mt-1">
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
                                                v-for="(itempopup, index) in chkr_items"
                                                :key="index"
                                                @click="autorecon_seltd(itempopup,item)" 
                                                class="pa-0 ma-0"
                                                >

                                                <v-list-tile-action  class="pa-0 ma-0" style="background-color:#FFFFFF;min-width: 37px; border-right:0.5px solid #C1C8CC" > 
                                                    <v-icon :color="itempopup.color" class="pl-2 pt-1">{{ itempopup.icon }}</v-icon>
                                                </v-list-tile-action>

                                                <v-list-tile-title class="pa-0 ma-0 pl-2 pt-1 font-weight-bold">
                                                    {{ itempopup.title }}
                                                </v-list-tile-title>

                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
								</v-flex>
						</v-flex>

                

               </v-layout>
            </v-card>
         </v-flex>
         <!-- <v-layout v-if="Unreconciliationcount > 0" style="border:1px solid #C1C8CC">
            <v-flex  justify-space-between align-center>
               <v-layout style="padding:10px;background-color:#23B1A9;align-items:center;">
                  <v-flex>
                     <v-text class="body-2" style="color:#ffffff">Unreconciliation Request</v-text>
                  </v-flex>
               </v-layout>
            </v-flex>
         </v-layout>
         <v-flex v-if="Unreconciliationcount > 0">
            <v-flex  v-for="(item, index) in unreconciliationdatalist" :key="index">
               <v-flex xs4>
                  <v-card height="63" class="mt-3 mr-3 ml-3" style="" >
                     <v-flex>
                        <v-layout>
                           <v-flex>
                              <v-flex class="pa-2 cardborder">
                                 <v-flex>
                                    <v-text class="caption font-weight-bold" style="color:#10242B">Request on</v-text>
                                 </v-flex>
                                 <v-flex class="mt-1">
                                    <v-text class="caption" style="color:#10242B">{{item.RequestedOn | checkdata}}</v-text>
                                 </v-flex>
                              </v-flex>
                           </v-flex>
                           <v-flex>
                              <v-flex class="pa-2 cardborder">
                                 <v-flex>
                                    <v-text class="caption font-weight-bold" style="color:#10242B">Request ID</v-text>
                                 </v-flex>
                                 <v-flex class="mt-1">
                                    <v-text class="caption" style="color:#10242B">{{item.RequestId | checkdata}}</v-text>
                                 </v-flex>
                              </v-flex>
                           </v-flex>
                           <v-flex>
                              <v-flex class="pa-2 cardborder">
                                 <v-flex>
                                    <v-text class="caption font-weight-bold" style="color:#10242B">Request Type</v-text>
                                 </v-flex>
                                 <v-flex class="mt-1">
                                    <v-text class="caption" style="color:#10242B">{{item.RequestType | checkdata}}</v-text>
                                 </v-flex>
                              </v-flex>
                           </v-flex>
                        </v-layout>
                     </v-flex>
                  </v-card>
               </v-flex>
               <v-flex xs12>
                  <v-card height="125" class="mr-3 ml-3 mb-3" style="">
                     <v-layout>
                        <v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#1E9690">Reconciled on</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.ReconciledOn | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">Recon ID</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.ReconId | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class=" pa-2 cardborder" style="background-color:#F3FBFB;height:63px;display:flex;align-items:center;justify-content:center;" @click="showbankclosepopup(item)">
                              <v-text class="title font-weight-bold" style="color:#1E9690">BS</v-text>
                           </v-flex>
                           <v-flex class=" pa-2 cardborder " style="background-color:#FEF9F6;height:62px;display:flex;align-items:center;justify-content:center;" @click="showgcclosepopup(item)">
                              <v-text class="title font-weight-bold" style="color:#E46A25">GC</v-text>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#1E9690">CRE Date</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.CreDateBS | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">CRE Date</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.CreDateGC | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#1E9690">Bank Name</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.BankAccountName | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">Receipt ID</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.ReceiptId | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#1E9690">BS ID</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.BsId | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">Receipt Date.</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.ReceiptDate | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#1E9690">Txn. Type</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.TxnType | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">Cheque No.</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.ChequeNo | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#1E9690">Amount (₹)</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.Amount | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">Deposit Slip No.</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.DepositSlipNo | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#1E9690">Txn Type</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.TxnType | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">Part App No.</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.PartAppNo | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class="pa-2 cardborder" style="height:63px;">
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">Auth Code</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.AuthCode | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class="pa-2 cardborder" style="height:63px;">
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">Total Amt.</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.Amount | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                        <v-flex>
                           <v-flex class="pa-2 cardborder" style="height:63px;">
                           </v-flex>
                           <v-flex class="pa-2 cardborder">
                              <v-flex>
                                 <v-text class="caption font-weight-bold" style="color:#10242B">Status</v-text>
                              </v-flex>
                              <v-flex class="mt-1">
                                 <v-text class="caption" style="color:#10242B">{{item.Status | checkdata}}</v-text>
                              </v-flex>
                           </v-flex>
                        </v-flex>
                       
                        <v-flex v-if="actionbuttonshowhide">
                           <v-flex class="pa-2 cardborder" style="height:63px;background-color:#f7f7f7;">
                           </v-flex>
                          
                           <v-flex class="ml-2 mt-3" >
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
                                                v-for="(itempopup, index) in chkr_items"
                                                :key="index"
                                                @click="unreconciliation_seltd(itempopup,item)" 
                                                class="pa-0 ma-0"
                                                >

                                                <v-list-tile-action  class="pa-0 ma-0" style="background-color:#FFFFFF;min-width: 37px; border-right:0.5px solid #C1C8CC" > 
                                                    <v-icon :color="itempopup.color" class="pl-2 pt-1">{{ itempopup.icon }}</v-icon>
                                                </v-list-tile-action>

                                                <v-list-tile-title class="pa-0 ma-0 pl-2 pt-1 font-weight-bold">
                                                    {{ itempopup.title }}
                                                </v-list-tile-title>

                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
								</v-flex>
                        </v-flex>

                        
                     </v-layout>

                  </v-card>
               </v-flex>
            </v-flex>
         </v-flex> -->
        
         


         <div v-if="bankmastercount === 0 && manualreconcount === 0 && Unreconciliationcount === 0 && reconrulecount === 0" >
                <v-layout column justify-center align-center class="pa-5">
                    <div class="">
                        <img style="width: 190px; height: 190px;" src="../../assets/DtaImprtStrt.png" />
                    </div>
                    <div>
                        <p>
                            <span style="color: #1e9690; font-family: roboto; font-weight: 700;">
                                “No Record Found” 
                            </span>
                            
                        </p>
                    </div>
                </v-layout>
         </div>


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
                                            <v-text color="#10242B" class="font-weight-bold">{{buckettype | checkdata}}</v-text>
                                        </v-layout>
                                        <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                            <v-text>Request Type</v-text>
                                            <v-text color="#10242B" class="font-weight-bold">{{requesttype | checkdata}}</v-text>
                                        </v-layout>
                                        <v-layout column class="">
                                            <v-text>Request on </v-text>
                                            <v-text color="#10242B" class="font-weight-bold">{{approcavecreateddate | checkdata}}</v-text>
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
                                                <v-text>House Of Bank</v-text>
                                                <v-text color="#10242B" class="font-weight-bold">{{approvalhistoryheaderdata.HouseOfBank | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                                <v-text>Bank Name</v-text>
                                                <v-text color="#10242B" class="font-weight-bold">{{approvalhistoryheaderdata.BankName | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="">
                                                <v-text>Account Number</v-text>
                                                <v-text color="#10242B" class="font-weight-bold">{{approvalhistoryheaderdata.BankAcNo | checkdata}}</v-text>
                                            </v-layout>
                                        </v-layout>
                                    </v-card>
                                    <v-card class="ma-3 pa-2" v-for="(item,index) in historyapprovaldata" :key="index">
                                        <v-layout class="">
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2 pl-1">
                                                <v-text class="font-weight-bold">Date</v-text>
                                                <v-text color="#10242B" >{{item.UpdatedOn | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2">
                                                <v-text class="font-weight-bold">Event</v-text>
                                                <v-text color="#10242B" >{{item.ActionTaken | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2">
                                                <v-text class="font-weight-bold">User</v-text>
                                                <v-text color="#10242B" >{{item.UserName | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="">
                                                <v-text class="font-weight-bold">Remarks</v-text>
                                                <v-text color="#10242B">{{item.UserRemarks | checkdata}}</v-text>
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

                <!-- RULE History Dialog box -->
                <v-layout>
                    <v-dialog v-model="rulehistorydailog" persistent max-width="720px">
                        <v-card color="#F7F7F7" class="pb-2">
                            <v-layout justify-space-between  class="" style="flex:1;background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
                                <v-card-title class="pa-0 pl-3 bnkAcc-hdr text-uppercase">APPROVAL HISTORY</v-card-title>
                                <div style="border-left:1px solid #C1C8CC;" @click="close_rulepopup()">
                                    <v-icon style="cursor: pointer;" class="pa-2" >close</v-icon>
                                </div>
                            </v-layout>
                            <!-- <v-form v-model="bankRjctForm" ref="hstryform"> -->
                                <v-card class="ma-3 mb-0 pb-2" color="#F7F7F7">
                                   <v-card color="#FFFFFF" class="pa-3"> 
                                        <v-layout class="">
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                                <v-text>Rule Name</v-text>
                                                <v-text color="#10242B" class="font-weight-bold text-no-wrap">{{approvalhistoryheaderdata.RuleName | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="mr-3">
                                                <v-text>Rule Code</v-text>
                                                <v-text color="#10242B" class="font-weight-bold text-no-wrap">{{approvalhistoryheaderdata.RuleCode | checkdata}}</v-text>
                                            </v-layout>
                                            <!-- <v-layout column class="">
                                                <v-text>Account Number</v-text>
                                                <v-text color="#10242B" class="font-weight-bold">{{approvalhistoryheaderdata.BankAcNo | checkdata}}</v-text>
                                            </v-layout> -->
                                        </v-layout>
                                    </v-card>
                                    <v-card class="ma-3 pa-2" v-for="(item,index) in historyapprovaldata" :key="index">
                                        <v-layout class="">
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2 pl-1">
                                                <v-text class="font-weight-bold">Date</v-text>
                                                <v-text color="#10242B" >{{item.UpdatedOn | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2">
                                                <v-text class="font-weight-bold">Event</v-text>
                                                <v-text color="#10242B" >{{item.ActionTaken | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2">
                                                <v-text class="font-weight-bold">User</v-text>
                                                <v-text color="#10242B" >{{item.UserName | checkdata}}</v-text>
                                            </v-layout>
                                            <v-layout column class="">
                                                <v-text class="font-weight-bold">Remarks</v-text>
                                                <v-text color="#10242B">{{item.UserRemarks | checkdata}}</v-text>
                                            </v-layout>
                                        </v-layout>
                                    </v-card>
                                </v-card>
                                
                                <v-layout class="mr-2" row justify-end style="">
                                    <v-btn  dark color="#D1121B" class="bnk-txt-tranfrm" @click="close_rulepopup()">
                                        <v-icon color="" small >cancel</v-icon>
                                        <v-divider vertical class="ml-2 mr-2"></v-divider>Cancel
                                    </v-btn>
                                </v-layout>
                            <!-- </v-form> -->
                        </v-card>
                    </v-dialog>
                </v-layout>
      
      </v-card>
   </v-app>
</template>
<script>
import axios from 'axios'
export default {
    
   created(){
       this.$store.commit('SET_PAGE_TITLE', 'Approval Bucket');

      // this.fetchapprovalbucketdata()
      this.GetAllFiltersData()
      this.getremarktypedata()
      this.getpermissiondata()
      this.fetchbankandrulebucketdata()
   },

   data(){
        return{
            chkr_items: [
                { title: 'View Details', icon:'highlight',color:"#646666"},
                { title: 'Approve', icon:'check_circle',color:"#1E9690" },
                { title: 'Reject With Remark' , icon:'cancel',color:"#D1121B"},
                { title: 'Approval History' , icon:'info',color:"#E46A25"}
            ],
           rjctBnkDilg:false,
           rulehistorydailog:false,
           bankmasterdata:[],
           manualrecondata:[],
           reconruledata:[],
           unreconciliationdatalist:[],
           autorecondatalist:[],
           autoreconcount:0,
           bankmastercount:0,
           manualreconcount:0,
           reconrulecount:0,
           Unreconciliationcount:0,
           search:'',
           nameofbank:'',
           subbnknme:"",
           bankaccountnumber:'',
           bnkProfilePic:"",
           FilteringApi:[],
           output:[],
           bankList: [],
           recorecode:'',
           accDesc:'',
           rjctdesc:'',
           approcavecreateddate:'',
           remarktype:[],
           buckettype:'',
           requesttype:'',
           hstryBnkDilg:false,
           recordtypesapi:'',
           rejectactiontaken:'',
           actionbuttonshowhide:false,
           historyapprovaldata:[],
           approvalhistoryheaderdata:[],
           useraccountnumber:'',
           historybankaccount:''

        }
   },
   filters:{
				short(text) {
					try {
						if (text.length > 15) { text = text.slice(0, 15)+'...';}
					}catch(err) {}
					return text;
				},

				checkdata(data) {
	                    // console.log('Validity Data', data);
	                    if (data == "" || data == "undefined" || data == null || data == '' || data == 'Invalid Date') {
	                        return "-"
	                    } else {
	                        return data;
	                    }
	        },
             },
   computed: {
      filteredItems() {
            console.log("output:::varible",this.output)
				return _.orderBy(this.output.filter(item => {
	             if(!this.search) return this.output;
	               return (
						item.HouseOfBank.toLowerCase().includes(this.search.toLowerCase())
						// item.BankAcNo.includes(this.search)
					);
				}));
		},
   },
    methods: {
      
      getpermissiondata(){

         let menulist = this.$store.getters.getDetamenulistils

         console.log('Menu list approval:::',menulist)

				for(let i=0;i<menulist.length;i++){
					if(menulist[i].menuName === 'approvalBucket'){
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
      close_hstryFrm(){
            this.hstryBnkDilg = false
            this.historyapprovaldata = []
            this.approvalhistoryheaderdata = []
            this.recorecode = ''
            this.recordtypesapi = ''
        },

      close_rulepopup(){
            this.rulehistorydailog = false
            this.historyapprovaldata = []
            this.approvalhistoryheaderdata = []
            this.recorecode = ''
            this.recordtypesapi = ''
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
							RecordType : self.recordtypesapi ,
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
							RecordType : self.recordtypesapi ,
							RecordCode :  self.recorecode ,
							ActionTaken : self.rejectactiontaken ,
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

      Rule_seltd(item,tbldta){
                console.log("item clciked",item);
                console.log('tbldta',tbldta)
                
                
               

                if(item.title==="View Details"){

                  this.$router.push('/reconcilationrule');

                }else if(item.title==="Approve"){
                    this.recorecode = tbldta.RequestId
                    this.recordtypesapi = 'ruleMasterUpdate'
                    this.approveddataapihit()
                    
                    
                }else if(item.title==="Reject With Remark"){
                   
                    this.buckettype = 'Recon Rule Update'
                    this.requesttype = 'Recon Rule Reject'
                    this.recordtypesapi = 'ruleMasterUpdate'
                    this.rejectactiontaken = 'rejected'
                    this.approcavecreateddate = tbldta.RequestedOn
                    this.recorecode = tbldta.RequestId
                    this.rjctBnkDilg=true
                  //   this.approcavecreateddate = tbldta.forceMatchDate
                }else if(item.title==="Approval History"){
                    
                     this.recorecode = tbldta.RequestId
                     this.historybankaccount = 0
                     this.recordtypesapi = 'ruleMasterUpdate'
                     this.gethistory()
                  //   this.hstryBnkDilg=true
                }
                
      },

      bankmaster_seltd(item,tbldta){
                console.log("item clciked",item);
                console.log('tbldta',tbldta)
                
                

                if(item.title==="View Details"){

                  this.$router.push('/bankaccountmaster');

                }else if(item.title==="Approve"){
                    this.recorecode = tbldta.RequestId
                    this.recordtypesapi = 'bankMasterUpdate'
                    this.approveddataapihit()
                    
                    
                }else if(item.title==="Reject With Remark"){
                   
                    this.buckettype = 'Bank Master Update'
                    this.requesttype = 'Bank Account Reject'
                    this.recordtypesapi = 'bankMasterUpdate'
                    this.rejectactiontaken = 'rejected'
                    this.approcavecreateddate = tbldta.RequestedOn
                    this.recorecode = tbldta.RequestId
                    this.rjctBnkDilg=true
                  //   this.approcavecreateddate = tbldta.forceMatchDate
                }else if(item.title==="Approval History"){
                  
                  //   this.hstryBnkDilg=true
                    this.recorecode = tbldta.RequestId
                    this.historybankaccount = tbldta.BankAccountNumber
                    console.log("Aproval History")
                     this.recordtypesapi = 'bankMasterUpdate'
                     this.gethistory()
                }
                
      },

      autorecon_seltd(item,tbldta){
               console.log("item clciked",item);
               console.log('tbldta',tbldta)
                
               
                if(item.title==="View Details"){
	               this.$store.commit('SET_APPROVAL_HISTORY_ROUTE','closebucket')
                  this.$router.push('/reconcilation');

                }else if(item.title==="Approve"){
                    this.recorecode = tbldta.RequestId
                    this.recordtypesapi = 'autoReconUpdate'
                    this.approveddataapihit()
                    
                    
                }else if(item.title==="Reject With Remark"){
                   
                    this.buckettype = 'Open Bucket'
                    this.requesttype = 'Auto Recon Approval Request'
                    this.recordtypesapi = 'autoReconUpdate'
                    this.rejectactiontaken = 'approved'

                    this.approcavecreateddate = tbldta.RequestedOn
                    this.recorecode = tbldta.RequestId
                    this.rjctBnkDilg=true
                  //   this.approcavecreateddate = tbldta.forceMatchDate
                }else if(item.title==="Approval History"){

                     this.recordtypesapi = 'autoReconUpdate'
                     this.recorecode = tbldta.RequestId
                     this.historybankaccount = tbldta.BankAccountNumber
                     this.gethistory()
                  //   this.hstryBnkDilg=true
                }
                
   
      },
      manual_seltd(item,tbldta){
                console.log("item clciked",item);
                console.log('tbldta',tbldta)
                
                
                if(item.title==="View Details"){

                  this.$router.push('/manualreconciledcases');

                }else if(item.title==="Approve"){
                    this.recorecode = tbldta.RequestId
                    this.recordtypesapi = 'manualReconUpdate'
                    this.approveddataapihit()
                    
                    
                }else if(item.title==="Reject With Remark"){
                   
                    this.buckettype = 'Manual Reconciliation update'
                    this.recordtypesapi = 'manualReconUpdate'
                    this.requesttype = 'Manual Recon'
                    this.rejectactiontaken = 'approved'
                    this.approcavecreateddate = tbldta.RequestedOn
                    this.recorecode = tbldta.RequestId
                    this.rjctBnkDilg=true
                  //   this.approcavecreateddate = tbldta.forceMatchDate
                }else if(item.title==="Approval History"){
                  console.log("Aproval History")

                  
                  this.recordtypesapi = 'manualReconUpdate'
                  this.historybankaccount = tbldta.BankAccountNumber
                  this.recorecode = tbldta.RequestId
                  this.gethistory()
                }
                
      },

      unreconciliation_seltd(item,tbldta){
                console.log("item clciked",item);
                console.log('tbldta',tbldta)
                
               
                if(item.title==="View Details"){

                  this.$router.push('/reconcilation');
	               this.$store.commit('SET_APPROVAL_HISTORY_ROUTE','openbucket')

                }else if(item.title==="Approve"){
                    this.recorecode = tbldta.RequestId
                    this.recordtypesapi = 'autoReconUpdate'
                    this.approveddataapihit()
                    
                    
                }else if(item.title==="Reject With Remark"){
                   
                    this.buckettype = 'Open Bucket'
                    this.requesttype = 'Auto Recon Approval Request'
                    this.recordtypesapi = 'autoReconUpdate'
                    this.rejectactiontaken = 'approved'

                    this.approcavecreateddate = tbldta.RequestedOn
                    this.recorecode = tbldta.RequestId
                    this.rjctBnkDilg=true
                  //   this.approcavecreateddate = tbldta.forceMatchDate
                }else if(item.title==="Approval History"){

                     this.recordtypesapi = 'autoReconUpdate'
                     this.recorecode = tbldta.ReconId
                     this.historybankaccount = tbldta.BankAccountNumber
                     this.gethistory()
                  //   this.hstryBnkDilg=true
                }
                
      },
      getremarktypedata(){
					
            this.remarktype = this.$store.state.remarktype.Reconpageremarktpe
            console.log("GET Remark Type::",this.remarktype);
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
                        BankAcNo: self.historybankaccount,
                        SessionID : 1,
                        RecordType : self.recordtypesapi,
                        RecordCode : self.recorecode
						
					},
				})
					.then(function (response) {
						console.log("Approval APi Response>>>>>>", response);
						if(response.data.Status === 'Success'){
                            console.log("API SUCCESS::::")
                            
                            if(response.data.HistoryOfBankMasterRecordList.length > 0){
                              self.historyapprovaldata = response.data.HistoryOfBankMasterRecordList
                              self.approvalhistoryheaderdata = response.data.HistoryOfBankMasterRecordList[0]
                                 self.rjctBnkDilg=false
                                 self.hstryBnkDilg=true
                            }else if(response.data.HistoryOfManualReconList.length > 0){
                              self.historyapprovaldata = response.data.HistoryOfManualReconList
                              self.approvalhistoryheaderdata = response.data.HistoryOfManualReconList[0]
                                 self.rjctBnkDilg=false
                                 self.hstryBnkDilg=true
                            }else if(response.data.HistoryOfAutoReconList.length > 0){
                              self.historyapprovaldata = response.data.HistoryOfAutoReconList
                              self.approvalhistoryheaderdata = response.data.HistoryOfAutoReconList[0]

                                 self.rjctBnkDilg=false
                                 self.hstryBnkDilg=true
                            }else if(response.data.HistoryOfRuleList.length > 0){
                              self.historyapprovaldata = response.data.HistoryOfRuleList
                              self.approvalhistoryheaderdata = response.data.HistoryOfRuleList[0]

                                 self.rjctBnkDilg=false
                                 self.rulehistorydailog=true
                            }
                            
                     

                            console.log("ALL HISTORY DATA::",self.historyapprovaldata)
                            console.log("Header history data::",self.approvalhistoryheaderdata)
                           
                        
                        }else{
								self.showToast( response.data.Message , self.TOST().ERROR);
                        }

                   
					})
					.catch(function (error) {
					self.showLoader('Loading', false);
						console.log("Approval APi Response>>>>>>", error);
					});
            },
      close_rjctfrm(){
                this.recorecode = ''
                this.accDesc = ''
                this.rjctdesc = ''
                this.recordtypesapi = ''
                this.approcavecreateddate = ''
                this.rejectactiontaken = ''
                this.rjctBnkDilg=false
      },
      clearSearch () {
		    this.search="";
		},
      GetAllFiltersData(bnkAccNo) {
            var self = this;
          
            // console.log("batchID", self.resBatchId);
            // self.resBatchId = 0;
        
            self.FilteringApi=[];
            self.FilteringApi = self.$store.getters.getbankDetails;
            console.log("self.FilteringApi",self.FilteringApi);
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
                console.warn("cur", cur);

            // Get the index of the key-value pair.
            var occurs = o.reduce(function(n, item, i) {
                return (item.HouseOfBank === cur.HouseOfBank) ? i : n;
            }, -1);
              console.warn("occurs", occurs);
            // If the name is found,
            if (occurs >= 0) {

                // append the current value to its list of values.
                o[occurs].BankAcNo = o[occurs].BankAcNo.concat({BankAcNo:cur.BankAcNo,BankName:cur.BankName,transectionstartdate:cur.fullObj.transactionStartDate});

                // Otherwise,
            } else {

                // add the current item to o (but make sure the value is an array).
                var obj = {
                HouseOfBank: cur.HouseOfBank,
                BankAcNo: [{BankAcNo:cur.BankAcNo,BankName:cur.BankName,transectionstartdate:cur.fullObj.transactionStartDate}]
                };
                // obj.BankAcNo.push({BankAcNo:cur.BankAcNo})
                console.warn("obj",obj );
                o = o.concat([obj]);
            }

            return o;
            }, []);

            console.log(self.output);

            // if(localStorage.getItem("TrDataLs")===null) {
            self.selectbank(self.bankList[0].HouseOfBank,self.bankList[0].BankAcNo,self.bankList[0].BankName,self.bankList[0].fullObj.transactionStartDate);
            // }
         
      },
      selectbank(houseOfBank,accno,bnknme,transectiondate){
         console.log("SELECTED DATA::", houseOfBank,accno,bnknme,transectiondate);
         
         this.search=""
         this.nameofbank = houseOfBank;
         this.bankaccountnumber = accno;
			this.subbnknme=bnknme
         this.getImgUrl(this.nameofbank);
         this.fetchapprovalbucketdata(this.bankaccountnumber)
			
      },
      getImgUrl(picname) {
				// this.bnkProfilePic = require('../../assets/'+picname+'.png')
				console.log(picname,"picname")
				try{
					this.bnkProfilePic = require('../../assets/'+picname+'.png')
				}catch(error){
					this.bnkProfilePic = require('../../assets/All_banks.png')
				}
				return this.bnkProfilePic
		},
      
      fetchbankandrulebucketdata(){

         var self = this;
         self.showLoader('Loading', true);
					axios({
						method: "post",
						url:
							this.API_Service_admin()+"/ApprovalAPI/api/ApprovalProcess/GetApprovalBucketDetails",
						headers: {
							"Content-Type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "8ae0a20d-8f12-3c33-b62d-5010be7a5465",
						},
						data: {
							UserId: 1,
                     PageName: "approvalBucketView",
                     SessionID : 1,
							BankAcNo: 0,
							
						},
					})
                .then(function (response) {
                  self.showLoader('Loading', false);
                  
                  if(response.data.Status === 'Success'){
                  console.log("Approval Bucket Response::",response.data)
                  let bankmasterdatalocal = response.data.BankMasterDataList
                  // let manrecondata = response.data.ManualReconDataList
                  let reconruledatalocal = response.data.ReconRuleDataList
                  // let unreconrequestdata = response.data.UnReconciliationRequestDataList

                  self.bankmastercount = response.data.BankMasterDataListCount
                  // self.manualreconcount = response.data.ManualReconDataListCount
                  self.reconrulecount = response.data.ReconRuleDataListCount
                  // self.Unreconciliationcount = response.data.UnReconcilRequestDataListCount

                  if(bankmasterdatalocal.length === 0 && reconruledatalocal.length === 0){
                     // self.showToast("No Records Found",self.TOST().WARNING);
                  }else{

                     self.bankmasterdata = [],
                     // self.manualrecondata = [],
                     self.reconruledata = []
                     // self.unreconciliationdatalist = []


                     if(bankmasterdatalocal.length === 0){
                        console.log("Bank Master data empty")
                     }else{
                        self.bankmasterdata = bankmasterdatalocal
                        bankmasterdatalocal = []
                     }
                     // if(manrecondata.length === 0){
                     //    console.log("manrecondata data empty")
                     // }else{
                     //    self.manualrecondata = manrecondata
                     //    manrecondata = []
                     // }

                     if(reconruledatalocal.length === 0){
                        console.log("reconruledatalocal data empty")
                     }else{
                        self.reconruledata = reconruledatalocal
                        reconruledatalocal = []

                     }

                     // if(unreconrequestdata.length === 0){
                     //    console.log("unreconrequestdata data empty")
                     // }else{
                     //    self.unreconciliationdatalist = unreconrequestdata
                     //    unreconrequestdata = []

                     // console.log("unreconrequestdata data",self.unreconciliationdatalist)

                     // }


                     console.log("Bank Master data",self.bankmasterdata)
                     
                     console.log("reconruledata data",self.reconruledata)
                     
                     

                  }

                  }else{
                     self.showToast(response.data.Message,self.TOST().WARNING);
                     self.showLoader('Loading', false);

                     self.bankmasterdata = [],
                  
                     self.reconruledata = [],
                     
                     self.bankmastercount = 0
                    
                     self.reconrulecount = 0
                     


                  }
                  

               })
               .catch(function (error) {
                  self.showLoader('Loading', false);
                  console.log("Aproval APi FAIL Response>>>>>>", error);
               });
      },
      fetchapprovalbucketdata(bankacc){

         var self = this;
         self.showLoader('Loading', true);
					axios({
						method: "post",
						url:
							this.API_Service_admin()+"/ApprovalAPI/api/ApprovalProcess/GetApprovalBucketDetails",
						headers: {
							"Content-Type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "8ae0a20d-8f12-3c33-b62d-5010be7a5465",
						},
						data: {
							UserId: 1,
                     PageName: "approvalBucketView",
                     SessionID : 1,
							BankAcNo: bankacc,
							
						},
					})
                .then(function (response) {
                  self.showLoader('Loading', false);
                  
                  if(response.data.Status === 'Success'){
                  console.log("Approval Bucket Response::",response.data)
                  // let bankmasterdatalocal = response.data.BankMasterDataList
                  let manrecondata = response.data.ManualReconDataList
                  // let reconruledatalocal = response.data.ReconRuleDataList
                  let unreconrequestdata = response.data.UnReconciliationRequestDataList
                 
                  let autorecondata = response.data.AutoReconDataList

                  console.log("AUTO REON DATA::",autorecondata)
                  // self.bankmastercount = response.data.BankMasterDataListCount
                  self.manualreconcount = response.data.ManualReconDataListCount
                  // self.reconrulecount = response.data.ReconRuleDataListCount
                  self.Unreconciliationcount = response.data.UnReconcilRequestDataListCount
                  self.autoreconcount = response.data.AutoReconDataListCount

                  if(manrecondata.length === 0 && unreconrequestdata.length === 0 && autorecondata.length === 0){
                     // self.showToast("No Records Found",self.TOST().WARNING);
                  }else{

                     // self.bankmasterdata = [],
                     self.manualrecondata = [],
                     // self.reconruledata = [],
                     self.unreconciliationdatalist = []

                     // if(bankmasterdatalocal.length === 0){
                     //    console.log("Bank Master data empty")
                     // }else{
                     //    self.bankmasterdata = bankmasterdatalocal
                     //    bankmasterdatalocal = []
                     // }

                     if(manrecondata.length === 0){
                        console.log("manrecondata data empty")
                     }else{
                        self.manualrecondata = manrecondata
                        manrecondata = []
                     }

                     // if(reconruledatalocal.length === 0){
                     //    console.log("reconruledatalocal data empty")
                     // }else{
                     //    self.reconruledata = reconruledatalocal
                     //    reconruledatalocal = []

                     // }

                     // if(unreconrequestdata.length === 0){
                     //    console.log("unreconrequestdata data empty")
                     // }else{
                     //    self.unreconciliationdatalist = unreconrequestdata
                     //    unreconrequestdata = []

                     // console.log("unreconrequestdata data",self.unreconciliationdatalist)

                     // }

                     if(autorecondata.length === 0){
                        console.log("auto recon data empty")
                     }else{

                        self.autorecondatalist = autorecondata
                        autorecondata = []

                     console.log("unreconrequestdata data",self.autorecondatalist)
                     }


                     // console.log("Bank Master data",self.bankmasterdata)
                     console.log("manrecondata data",self.manualrecondata)
                     // console.log("reconruledata data",self.reconruledata)
                     console.log("unreconrequestdata data",self.autorecondatalist)
                     

                  }

                  }else{
                     self.showToast(response.data.Message,self.TOST().WARNING);
                     self.showLoader('Loading', false);

                     // self.bankmasterdata = [],
                     self.manualrecondata = [],
                     // self.reconruledata = [],
                     self.unreconciliationdatalist = []
                     // self.bankmastercount = 0
                     self.manualreconcount = 0
                     // self.reconrulecount = 0
                     self.Unreconciliationcount = 0


                  }
                  

               })
               .catch(function (error) {
                  self.showLoader('Loading', false);
                  console.log("Aproval APi FAIL Response>>>>>>", error);
               });
      },
      routetobankmaster(){
         this.$router.push('/bankaccountmaster');
      },

      routetomanualreconpage(){
         this.$router.push('/manualreconciledcases');
      },

      routetoreconpage(){
         this.$router.push('/reconcilation');
      },

      routereconrulepage(){
         this.$router.push('/reconcilationrule');
      }
    }
}
</script>
<style>

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
.backdropdown_di {
    background: #ffffff;
    border-left: 1px solid #c1c8cc;
    /* height: 67px; */
}
.bandkdivcust_di {
    padding: 6px;
    border-top-color: #ffffff;
    border-right-color: #c1c8cc;
    border-bottom-color: #ffffff;
    border-left-color: #ffffff;
    border-style: solid;
    border-width: 1px;
}

.bankimg{
	height: 45px;
	width: 45px;
}

.downarrow{
	height: 10px;
	width: 10px;
}

.cusrsor{
    cursor: pointer;
}
.popupicon{
    height: 15px;
    width: 15px;
}
.cardborder{
	border-top-color: #C1C8CC;
	border-bottom-color: #C1C8CC;
	border-right-color: #C1C8CC;
	border-left-color: #C1C8CC;
	border-style: solid;
	border-width: 1px;
}

.pendingarrow{
    height: 30px;
    width: 30px;
}

.my-menu {
  /* margin-top: 40px; */
  contain: initial;
  overflow: visible;
}
.my-menu::before {
  /* position: absolute;
  content: "";
  top: 0;
  right: 10px;
  transform: translateY(-100%);
  width: 10px; 
  height: 13px; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff; */

    position: absolute;
    content: "";
    top: 5px;
    right: -15px;
    transform: rotate(90deg);
    width: 10px; 
    height: 13px; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 13px solid #ffffff;

    /* position: absolute;
    content: "";
    top: 10px;
    right: -15px;
    transform: rotate(90deg);
    width: 10px; 
    height: 13px; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 13px solid red; */
}

</style>