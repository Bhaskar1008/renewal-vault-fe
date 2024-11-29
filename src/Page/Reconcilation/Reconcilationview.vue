<template>
	<v-app>
		<v-card class="ma-3">
			<v-layout style="border:1px solid #C1C8CC">
				<v-flex xs10 justify-space-between align-center>
					<v-layout style="padding:10px;background-color:#F7F7F7;align-items:center;">
						<v-flex>
							<v-text class="body-2" style="color:#646666">Reconciliation</v-text>
						</v-flex>
						<v-flex style="text-align:end" @click="strtRecon()" v-if="shwRcnBtn===true">
							<v-btn class="caption text-none" dark color="#23B1A9">Start Reconciliation</v-btn>
						</v-flex>
						<v-flex style="text-align:end" @click="forcebutton()" v-if="shwFrcMtchBtn===true">
							<v-btn class="caption text-none" :class="[forcematch == true ? 'bluebackground' : 'redbackground']">{{btnname}}</v-btn>
						</v-flex>
					</v-layout>
				</v-flex>
				<v-dialog v-model="strtReconDilg" persistent max-width="650px">
					<v-card color="#F7F7F7" class="pb-2">
						<v-layout justify-space-between class="" style="flex:1;background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
							<v-card-title class="pa-0 pl-3" color="#10242B">Auto Recon Summary for <span class="rcn-hdr">&nbsp; 12/07/2020-13:59</span></v-card-title>
							<div style="border-left:1px solid #C1C8CC;" @click="close_Rcn()">
								<v-icon style="cursor: pointer;" class="pa-2">close</v-icon>
							</div>
						</v-layout>
						<v-card class="ma-3 mb-0">
							<v-layout class="pa-2 py-3">
								<v-text class="mr-1 rcn-hdr" style="color:#909699; font-size:12px;"> ICICI Bank - <span class="" style="color:#10242B;">02588284282</span> </v-text>
								<v-divider class="mx-1" color="#C1C8CC" vertical></v-divider>
								<v-text class="ml-1 rcn-hdr" style="color:#909699; font-size:12px;"> Transaction Type - <span class="" style="color:#10242B;">Cash</span> </v-text>
							</v-layout>
							<v-layout style="background-color:#23B1A9">
								<v-text class="rcn-hdr pa-2" style="color:#FFFFFF; font-size:12px;flex:1;border-right:1px solid #C1C8CC">Type</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#FFFFFF; font-size:12px;flex:1;border-right:1px solid #C1C8CC">Records</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#FFFFFF; font-size:12px;flex:1;border-right:1px solid #C1C8CC">Eligible</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#FFFFFF; font-size:12px;flex:1;border-right:1px solid #C1C8CC">Complete Match</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#FFFFFF; font-size:12px;flex:1;">No Match</v-text>
							</v-layout>
							<v-layout style="border-bottom:1px solid #C1C8CC">
								<v-text class="rcn-hdr pa-2" style="color:#152F38; font-size:12px;flex:1;border-right:1px solid #C1C8CC">Records(CG)</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#152F38; font-size:12px;flex:1;border-right:1px solid #C1C8CC">{{autoRcnRspns.GcTotalRecordsCount}}</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#152F38; font-size:12px;flex:1;border-right:1px solid #C1C8CC">{{autoRcnRspns.GcEligibleCount}}</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#152F38; font-size:12px;flex:1;border-right:1px solid #C1C8CC">{{autoRcnRspns.GcCompleteMatchCount}}</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#152F38; font-size:12px;flex:1;">{{autoRcnRspns.GcNoMatchCount}}</v-text>
							</v-layout>
							<v-layout style="border-bottom:1px solid #C1C8CC">
								<v-text class="rcn-hdr pa-2" style="color:#1E9690; font-size:12px;flex:1;border-right:1px solid #C1C8CC">Bank Statements</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#1E9690; font-size:12px;flex:1;border-right:1px solid #C1C8CC">{{autoRcnRspns.BsTotalRecordsCount}}</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#1E9690; font-size:12px;flex:1;border-right:1px solid #C1C8CC">{{autoRcnRspns.BsEligibleCount}}</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#1E9690; font-size:12px;flex:1;border-right:1px solid #C1C8CC">{{autoRcnRspns.BsCompleteMatchCount}}</v-text>
								<v-text class="rcn-hdr pa-2" style="color:#1E9690; font-size:12px;flex:1;">{{autoRcnRspns.BsNoMatchCount}}</v-text>
							</v-layout>
							<v-layout class="py-3">
								<v-btn class="caption text-none rcn-hdr" style="color:#152F38;border:1px solid #C1C8CC" depressed>Download Total Cases</v-btn>
								<v-btn class="caption text-none rcn-hdr" style="color:#E46A25;border:1px solid #C1C8CC" depressed>Download Processed Cases</v-btn>
							</v-layout>
						</v-card>
						<v-layout justify-center align-center>
							<v-btn class="caption text-none rcn-hdr" style="" dark color="#D1121B">
								<v-icon dark>cancel</v-icon>
								<v-divider class="mx-2" vertical></v-divider>Reject</v-btn>
							<v-btn class="caption text-none rcn-hdr" style="" dark color="#23B1A9">
								<v-icon dark>forward</v-icon>
								<v-divider class="mx-2" vertical></v-divider>Approve Recon</v-btn>
						</v-layout>
					</v-card>
				</v-dialog>
				<!-- <v-flex class="backdropdown" xs2>
				<v-layout>
					<div class="bandkdivcust">
						<img class="bankimg" src="../../../web/assets/newhdfclogo.png">
					</div>

					<v-flex class="mt-2 ml-2">
						<v-flex ma-0>
							<p class="caption font-weight-bold mb-0" style="color:#10242B">HDFC Bank Ltd.</p>
						</v-flex>

						<v-layout >
							<div>
								<p ma-0 class="caption font-weight-bold" style="color:#10242B">A/C no.</p>
							</div>
							<div>
								<p ma-0 class="caption" style="color:#10242B">012345678</p>
							</div>
						</v-layout>

						
					</v-flex>
					
					<v-flex class="mt-3">
							<img class="downarrow" src="../../../web/assets/downarrow.png">	
					</v-flex>


				</v-layout>
				
			</v-flex> -->
				<!-- ODL BANK FILTERS -->
				<!-- <v-flex class="backdropdown" xs3>
                <v-menu offset-y>
                    <template slot='activator' v-slot-activator="{on}">
                      

                        <v-layout v-on="on">
                            <div class="bandkdivcust" style="">
                                <img class="bankimg" :src="bnkProfilePic" >
                            </div>

                            <v-flex class="mt-3 ml-2">
                                <v-flex ma-0>
                                    <p class="caption font-weight-bold mb-0" style="color: #10242b;">{{nameofbank}}</p>
                                </v-flex>

                                <v-layout>
                                    <div>
                                        <p ma-0 class="caption font-weight-bold" style="color: #10242b;">A/C no.</p>
                                    </div>
                                    <div>
                                        <p ma-0 class="caption" style="color: #10242b;">{{bankaccountnumber}}</p>
                                    </div>
                                </v-layout>
                            </v-flex>

                            <v-flex class="mt-3 ml-5">
                                <img class="downarrow" src="../../../web/assets/downarrow.png">	
                            </v-flex>
                        </v-layout>
                    </template>
                    <v-list>
                        <v-list-tile v-for="(item, index) in bankList" :key="index" @click="selectbank(item)">
                            <v-list-tile-title>{{ item.HouseOfBank }}-{{ item.BankAcNo }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-flex> -->
				<!-- END HERE -->
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

			<v-flex v-if="showunprocess === true" pa-3 row>
				<v-card style="background-color:#FFFFFF;flex:1;" class="">
					<v-layout>
						<v-flex xs12>
							<v-flex class="pa-2 py-3">
								<v-layout wrap class="">
									<div class="">
										<!-- <label class="body-1 font-weight-bold" style="color:#646666;">From</label> -->
										<p class="body-1 font-weight-bold text-xs-center mt-1 mb-0 pa-2">From</p>
									</div>
									<v-flex xs10 sm6 md2 class=" mr-4 cust-audlog reconRle-di">
										<v-flex class="sel mt-1">
											<v-menu ref="calender" :close-on-content-click="false" v-model="frmcalender" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
												<v-text-field slot="activator" :value="computedFrmDateFormattedMomentjs" solo readonly></v-text-field>
												<v-date-picker v-model="frmdate" @change="chngfrmDate" no-title></v-date-picker>
											</v-menu>
										</v-flex>
									</v-flex>
									<div>
										<p class="body-1 font-weight-bold text-xs-center mt-1 mb-0 pa-2">To</p>
									</div>
									<v-flex xs10 sm6 md2 class="mr-4 cust-audlog reconRle-di">
										<v-flex class="sel mt-1">
											<v-menu ref="calender" :close-on-content-click="false" v-model="Tocalender" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
												<v-text-field slot="activator" :value="computedToDateFormattedMomentjs" solo readonly></v-text-field>
												<v-date-picker v-model="toDte" @change="chngToDate" no-title></v-date-picker>
											</v-menu>
											<p class="date-validation" v-if="truevalidate=== true">{{validation}}</p>
										</v-flex>
									</v-flex>
									<v-flex xs10 sm6 md2 class="mr-4">
										<v-layout justify-content-center align-center>
											<v-btn :style="{ backgroundColor: updteRcntblFlg == true ? '#E46A25' : 'grey', color: updteRcntblFlg == true ? '#FFFFFF': 'inherit',}" style="text-transform: none" @click="updteRcntbl()" :disabled="!updteRcntblFlg"> Update </v-btn>
											<v-btn outline round small color="#10242B" style="text-transform: none " @click="putDate()" v-if="dtsChgnd=== true"> Clear
												<v-icon small>close</v-icon>
											</v-btn>
										</v-layout>
									</v-flex>
								</v-layout>
							</v-flex>
						</v-flex>
					</v-layout>
				</v-card>
			</v-flex>

			<v-flex v-if="opencase === true" pa-3 row>
				<v-card style="background-color:#FFFFFF;flex:1;" class="">
					<v-layout>
						<v-flex xs12>
							<v-flex class="pa-2 py-3">
								<v-layout wrap class="">
									<div class="">
										<!-- <label class="body-1 font-weight-bold" style="color:#646666;">From</label> -->
										<p class="body-1 font-weight-bold text-xs-center mt-1 mb-0 pa-2">From</p>
									</div>
									<v-flex xs10 sm6 md2 class=" mr-4 cust-audlog reconRle-di">
										<v-flex class="sel mt-1">
											<v-menu ref="calender" :close-on-content-click="false" v-model="frmcalender" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
												<v-text-field slot="activator" :value="computedFrmDateFormattedMomentjs" solo readonly></v-text-field>
												<v-date-picker v-model="frmdate" @change="chngfrmDate" no-title></v-date-picker>
											</v-menu>
										</v-flex>
									</v-flex>
									<div>
										<p class="body-1 font-weight-bold text-xs-center mt-1 mb-0 pa-2">To</p>
									</div>
									<v-flex xs10 sm6 md2 class="mr-4 cust-audlog reconRle-di">
										<v-flex class="sel mt-1">
											<v-menu ref="calender" :close-on-content-click="false" v-model="Tocalender" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
												<v-text-field slot="activator" :value="computedToDateFormattedMomentjs" solo readonly></v-text-field>
												<v-date-picker v-model="toDte" @change="chngToDate" no-title></v-date-picker>
											</v-menu>
											<p class="date-validation" v-if="truevalidate=== true">{{validation}}</p>
										</v-flex>
									</v-flex>
									<v-flex xs10 sm6 md2 class="mr-4">
										<v-layout justify-content-center align-center>
											<v-btn :style="{ backgroundColor: updteRcntblFlg == true ? '#E46A25' : 'grey', color: updteRcntblFlg == true ? '#FFFFFF': 'inherit',}" style="text-transform: none" @click="updteRcntbl()" :disabled="!updteRcntblFlg"> Update </v-btn>
											<v-btn outline round small color="#10242B" style="text-transform: none " @click="putDate()" v-if="dtsChgnd=== true"> Clear
												<v-icon small>close</v-icon>
											</v-btn>
										</v-layout>
									</v-flex>
								</v-layout>
							</v-flex>
						</v-flex>
					</v-layout>
				</v-card>
			</v-flex>
			<v-layout pa-3>
				<v-card @click="hideprobablematch()" hover ripple height=110 style="background-color:#FEF9F6;border-color:#E46A25;border-style:solid;border-width:1px;flex:1;" color="" class="card-1 pa-2 mr-3">
					<v-text class="body-2 font-weight-bold" style="color:#E46A25">UNPROCESSED CASES</v-text>
					<v-divider class="mt-2 mb-2"></v-divider>
					<v-layout mt-2 justify-space-between row>
						<div class="">
							<v-text class="caption" style="color:#10242B">Records from Bank</v-text>
						</div>
						<div class="">
							<v-text class="caption font-weight-bold" style="color:#E46A25">{{unprocessrececordfrombankcount}}</v-text>
						</div>
					</v-layout>

					<v-layout justify-space-between row>
						<div class="">
							<v-text class="caption" style="color:#10242B">Receipts from GC</v-text>
						</div>
						<div class="">
							<v-text class="caption font-weight-bold" style="color:#E46A25">{{unprocessrecepitfromgccount}}</v-text>
						</div>
					</v-layout>
					
				</v-card>
				<v-card @click="showopensection()" hover ripple height=110 style="background-color:#F3FBFB;border-color:#C1C8CC;border-style:solid;border-width:1px;flex:1;" color="" class="card-1 pa-2 mr-3">
					<v-text class="body-2 font-weight-bold" style="color:#1E9690">OPEN CASES</v-text>
					<v-divider class="mt-2 mb-2"></v-divider>
					<v-layout mt-2 justify-space-between row>
						<div class="">
							<v-text class="caption" style="color:#10242B">Records from Bank</v-text>
						</div>
						<div class="">
							<v-text class="caption font-weight-bold" style="color:#1E9690">{{openrececordfrombankcount}}</v-text>
						</div>
					</v-layout>

					<v-layout justify-space-between row>
						<div class="">
							<v-text class="caption" style="color:#10242B">Receipts from GC</v-text>
						</div>
						<div class="">
							<v-text class="caption font-weight-bold" style="color:#1E9690">{{openrecepitfromgccount}}</v-text>
						</div>
					</v-layout>
					
				</v-card>
				<v-card @click="showprobabledata()" hover ripple height=110 style="background-color:#FFFFFF;border-color:#C1C8CC;border-style:solid;border-width:1px;flex:1;" color="" class="card-1 pa-2 mr-3">
					<v-text class="body-2 font-weight-bold" style="color:#10242B">PROBABLE MATCHES</v-text>
					<v-divider class="mt-2 mb-2"></v-divider>
					<v-layout justify-space-between row>
						<div class="">
							<v-text class="caption" style="color:#10242B">Cases with Amount Mismatch</v-text>
						</div>
						<div class="">
							<v-text class="caption font-weight-bold" style="color:#10242B">{{probablematchescount}}</v-text>
						</div>
					</v-layout>
				</v-card>
				<v-card @click="showclosedata()" hover ripple height=110 style="background-color:#FFFFFF;border-color:#C1C8CC;border-style:solid;border-width:1px;flex:1;" color="" class="card-1 pa-2">
					<v-text class="body-2 font-weight-bold" style="color:#10242B">CLOSED CASES</v-text>
					<v-divider class="mt-2 mb-2"></v-divider>
					<v-layout justify-space-between row>
						<div class="">
							<v-text class="caption" style="color:#10242B">Total Reconciled Cases</v-text>
						</div>
						<div class="">
							<v-text class="caption font-weight-bold" style="color:#10242B">{{closecasescount}}</v-text>
						</div>
					</v-layout>
				</v-card>
			</v-layout>
			<!-- Unprocess SECTION -->
			
			<v-layout class="" pa-3 style="">
				<v-flex xs6>
					<v-layout v-if="showunprocess === true" class="headingcolm" justify-space-between align-center>
						<v-flex class="pa-2" xs6>
							<v-text class="caption font-weight-bold" style="color:#10242B">Unprocessed Bank Records</v-text>
						</v-flex>
						<v-flex xs6>
							<!-- <v-layout>
								<v-btn depressed block large class="my-0 mr-0" color="#F7F7F7" style="text-transform: none;border-radius:unset"> Clear All
									<v-icon right>close</v-icon>
								</v-btn>
								<v-btn dark depressed block large class="ma-0" color="#23B1A9" style="text-transform: none;border-radius:unset" @click="applyfilters()">
									<v-icon left>mdi-tune</v-icon> Filters </v-btn>
							</v-layout> -->
						</v-flex>
						<v-dialog v-model="openfilters" persistent overlay-color="#ffffff" max-width="680px">
							<v-card class="" style="background-color:#F7F7F7">
								<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
									<v-layout v-if="showunprocess === true" class="" justify-space-between align-center>
										<v-flex class="pl-3" xs6>
											<v-text class=" font-weight-bold subheading" style="color:#10242B">Filter</v-text>
										</v-flex>
										<v-flex xs6>
											<v-layout align-center>
												<v-btn outline round class="my-0 ml-0" small color="#10242B" style="text-transform: none; " @click="rstRrFltr()"> Clear All
													<v-icon small right>close</v-icon>
												</v-btn>
												
												<v-btn depressed block class="ma-0" color="#F7F7F7" style="text-transform: none;border-radius:unset" @click="cancelpopup()"> Cancel </v-btn>
									
												<v-btn dark depressed block class="ma-0" color="#E46A25" style="text-transform: none;border-radius:unset" @click="aplyFltr()"> Apply </v-btn>
											</v-layout>
										</v-flex>
									</v-layout>
								</v-layout>
								<v-flex class="pa-1">
									<v-card class="card_shadow ma-2 pa-2 pb-3">
										<v-layout align-center>
											<v-flex class="pa-2">
												<v-text class="caption font-weight-bold" style="color:#4B4D4D">Filter Table :</v-text>
											</v-flex>
											<v-flex xs10>
												<v-radio-group v-model="radios" :mandatory="false" :height="10" row>
													<v-radio class="caption " label="Unprocessed Bank Records" value="UnprocessedBankRecords"></v-radio>
													<v-radio class="caption " label="Unprocessed Receipts" value="UnprocessedReceipts"></v-radio>
													<v-radio class="caption " label="Both" value="Both"></v-radio>
												</v-radio-group>
											</v-flex>
										</v-layout>
										<v-divider class=""></v-divider>
										<v-layout align-center>
											<v-flex class="pa-2" xs2>
												<v-text class="caption font-weight-bold" style="color:#4B4D4D">Txn. Type :</v-text>
											</v-flex>
											<v-flex xs10>
												<v-layout>
													<div>
														<v-checkbox v-model="checkboxselected" :height="10" label="Cash" value="Cash"></v-checkbox>
													</div>
													<div>
														<v-checkbox v-model="checkboxselected" :height="10" label="Cheque" value="Cheque"></v-checkbox>
													</div>
												</v-layout>
											</v-flex>
										</v-layout>
										<v-divider class=""></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">BS ID</v-text>
												</v-flex>
												<v-flex class="pl-2" xs12 md12>
													<v-text-field :hide-details="true" solo label="Search..." append-icon="search" v-model="srchBsId" @click:append="bsIdFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{bsArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout align-center wrap>
														<v-chip v-for="(item, index) in bsArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_bsIdFltr(index)" small> {{item}} </v-chip>
														<!-- <v-chip
																class="ma-2"
																close
																color="teal"
																text-color="white"
																close-icon="mdi-delete"
																small
																> -->
														<!-- @click:close="close" -->
														<!-- BS19060619 -->
														<!-- </v-chip> -->
														<!-- <v-layout align-center class="colorfilterchip" style="margin-right:10px;">
																<v-flex>
																	<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">BS19060619</p>
																</v-flex>
																<v-flex class="">
																	<v-icon color="#fff">close</v-icon>						
																</v-flex>
															</v-layout>

															<v-layout align-center class="colorfilterchip" style="margin-right:10px;">
																<v-flex>
																	<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">BS19060619</p>
																</v-flex>
																<v-flex class="">
																	<v-icon color="#fff">close</v-icon>						
																</v-flex>
															</v-layout> --></v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<v-divider class=" mt-3"></v-divider>
										<v-layout align-center class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">Amount (₹)</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Enter..." v-model="amtFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">Txn. Date</v-text>
												</v-flex>
												<v-flex xs12 class="mt-3 mr-3 cust-audlog">
													<v-flex rclass="sel mt-1">
														<v-menu v-model="calendartransection" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
															<template slot='activator' v-slot-activator="{on}">
																<v-text-field v-model="transectiondate" :hide-details="true" solo prepend-inner-icon="event" @blur="transectiondate = parseDate(transectiondate)" readonly v-on="on"> ></v-text-field>
															</template>
															<v-date-picker v-model="transectiondate" no-title @input="validtransec"></v-date-picker>
														</v-menu>
													</v-flex>
												</v-flex>
											</v-flex>
										</v-layout>
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">SOL ID</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" v-model="srchsolId" solo label="Search..." append-icon="search" @click:append="solIdFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{solIdArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in solIdArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_solIdFltr(index)" small>
															<!-- @click:close="close" -->{{item}} </v-chip>
														<!-- <v-chip
																class="ma-2"
																close
																color="teal"
																text-color="white"
																close-icon="mdi-delete"
																small
																> -->
														<!-- @click:close="close" -->
														<!-- 5688
															</v-chip> -->
														<!-- <v-layout align-center class="colorfilterchip" style="margin-right:10px;">
																<v-flex>
																	<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">BS19060619</p>
																</v-flex>
																<v-flex class="">
																	<v-icon color="#fff">close</v-icon>						
																</v-flex>
															</v-layout>

															<v-layout align-center class="colorfilterchip" style="margin-right:10px;">
																<v-flex>
																	<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">BS19060619</p>
																</v-flex>
																<v-flex class="">
																	<v-icon color="#fff">close</v-icon>						
																</v-flex>
															</v-layout> --></v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">SOL ID</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">3 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">5688</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">5688</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>
															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">Branch Name</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="brnchNme" append-icon="search" @click:append="brnchNmeFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{brnchNmeArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in brnchNmeArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_brnchNmeFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">Branch Name</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">1 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">SAKET NAGAR</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">APPLICATION NO.</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="aplcnNo" append-icon="search" @click:append="aplcnNoFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{aplcnNoArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in aplcnNoArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_aplcnNoFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">APPLICATION NO.</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">1 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">56880500000039</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">TAGIC ID</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="tgcId" append-icon="search" @click:append="tgcIdFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{tgcIdArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in tgcIdArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_tgcIdFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">TAGIC ID</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">1 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">TA020420025230</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">CUST NAME</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo v-model="custName" label="Search..." append-icon="search" @click:append="custNameFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{custNameArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in custNameArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_custNameFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">CUST NAME</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">1 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">Mr Virendra Kanpur</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">PRM AMT</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="prmAmt" append-icon="search" @click:append="prmAmtFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{prmAmtArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in prmAmtArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_prmAmtFltr(index)" small>
															<!-- @click:close="close" -->{{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
									
										<v-divider class="mt-3"></v-divider>
										<!-- <v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">PRODUCT CODE</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="pdtCde" append-icon="search" @click:append="pdtCdeFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{pdtCdeArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in pdtCdeArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_pdtCdeFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout> -->
										
										</v-card>
								</v-flex>
							</v-card>
						</v-dialog>
					</v-layout>
					<v-flex v-if="showunprocess === true" xs12 class="mr-3 recon-tbl mt-3 elevation-1" style="">
						<!-- <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="unprocesstable"
                            :expand="expand"
							v-bind:pagination.sync="pagination"
                            hide-actions
                            select-all
                            item-key="id"
                            class="elevation-1">
                            <template slot="headers" slot-scope="props" >
                                <tr>
                                    <th></th>
                                    <th v-for="header in props.headers" :key="header.text" style="color:black">{{ header.text }}</th>
                                </tr>
                            </template>

                            <template slot="items" slot-scope="props">
                                
                            <tr  @click="props.expanded = !props.expanded">
                                <v-flex v-if="showcheckbox === true" v-bind:style="{ visibility: props.item.vis  }" >
                                <td class="checkboxone" >
                                    <v-checkbox  v-model="props.item.selected" @change="tableCheck(props.item.id,$event,props.index)" primary hide-details></v-checkbox>
                                </td>
                                </v-flex>
                                
								<td v-if="showcheckbox === false" class="checkboxone" >
                                </td>
                                <td class="text-no-wrap">{{props.item.txtdate}}</td>
                                <td class="">{{props.item.bsid}}</td>
                                <td class="">{{props.item.txttype}}</td>
                                <td class="text-no-wrap">{{props.item.amount}} ({{props.item.bankdc}})</td>
                                <td class="text-no-wrap">{{props.item.createddate}} </td>
                                <td class="text-no-wrap">{{props.item.bankname | short}}</td>
                               
                            </tr>
                            </template>
                            <template slot="expand" slot-scope="props">
                                <v-card style="background-color:#FEF9F6;border-color:#E46A25;padding:15px">
                                    <v-flex style="display:flex;flex-direction:row;">
                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Account Number</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.accountnumber}}</v-text>
                                            </v-flex>
                                        </v-flex>

                    

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Bank Refrence</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.bankrefrence}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Payment Mode</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.paymentmode}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Remarks</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.remark}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Terminal ID</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.terminalid}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                    </v-flex>
                                    
                                </v-card>
                            </template>
            
                        </v-data-table> -->
						<v-card flat style="overflow-x: scroll;overflow-y: auto; transform:rotateX(180deg);" class="">
							<v-data-table v-bind:pagination.sync="pagination" :headers="headers" :items="paginatedunprocesstable" hide-actions style="transform:rotateX(180deg);">
								<template slot="items" slot-scope="props">
									
									<td class="recon-td-bdrgt">{{props.item.createdDate | checkdata}}</td>
									<!-- <td class="">{{props.item.DC}}</td> -->
									<td class="recon-td-bdrgt" style="flex-direction-row;display:flex;align-items:center; justify-content:center">
										<!-- <div style="margin-right:10px;" > -->
										<!-- <img class="filtericon" src="../../../web/assets/tableicon.png"> -->
										<v-btn flat icon color="#23B1A9" @click="openunprocesspopupmethods(props.item)">
											<v-icon>receipt</v-icon>
										</v-btn>
										<!-- </div> -->
										<div class="pb-1"> {{ props.item.systemId | checkdata}} </div>
									</td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.dc | checkdata}}</td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.amount | checkdata}}</td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.transcationDate | checkdata}} </td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.txnType | checkdata}}</td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.transactionStatus | checkdata}}</td>
									
								</template>
							</v-data-table>
						</v-card>
						<v-layout row align-center class="pa-2" style="border-top:1px solid #C1C8CC">
							<!-- unprocesstable -->
							<v-text class="mr-1 ml-3" style="color:#3C3D3D; font-size:13px; font-family: roboto;font-weight: 700;"> <span class="" style="color:#E46A25;">Showing {{fromvalue}}-{{toValu}} </span>out of {{unprocesstable.length}} records</v-text>
							<!-- <v-flex  > -->
							<v-divider class="ma-2" vertical></v-divider>
							<v-pagination class="cust-Dm-pgn" v-model="pageNumber" color="#152F38" flat :length="pagesunprocesstable" @input="nextPage"> </v-pagination>
							<!-- </v-flex> -->
						</v-layout>
					</v-flex>
					<v-dialog v-model="openunprocessbankpopup" persistent overlay-color="#ffffff" max-width="1400px">
						<v-card>
							<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
								<v-flex class="pa-2" xs10>
									<v-layout>
										<div style="margin-right:15px;">
											<v-text class="subheading" style="color:#10242B">Processed on</v-text>
										</div>
										<div style="display:flex;flex-direction:row;align-items:center;">
											<v-flex style="margin-right:10px;">
												<!-- <img class="filtericon" src="../../../web/assets/tableicon.png">-->
												<v-icon color="#23B1A9">receipt</v-icon>
											</v-flex>
											<v-flex>
												<v-text class="subheading" style="color:#10242B">{{unprocesspopupdata.bsId | checkdata}}</v-text>
											</v-flex>
										</div>
									</v-layout>
								</v-flex>
								<v-flex class="pa-2" xs2>
									<div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="closeunprocesspopupmethods">
										<v-icon>mdi-close</v-icon>
									</div>
								</v-flex>
							</v-layout>
							<v-card height="63" class="mt-3 ml-3 mr-3" style="">
								<v-layout>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">System ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.systemid | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Created Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.createddate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">D/C</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.dc | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Amount</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">Rs. {{unprocesspopupdata.amount | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Transcation Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Txn Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiontype | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Transaction Status</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectionstatus | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
							</v-card>
							<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Account Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.accountnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Flag</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.flag | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Cheque</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.cheque | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Cheque Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.chequedate | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Slip / ApplicationNo.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.depositeslipandapplication | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.depositedate | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Unique No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.uniqueno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Debt_Accnt_Nmbr / Loan Account Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.dbt_accountnoloanaccount | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.date | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider class="ml-3 mr-3"></v-divider>
							<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Card Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.cardnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Payment Mode</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.paymentmode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Authcode</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.authcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Order ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.orderid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Particulars</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.particulars | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Branch Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.branchcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Producer Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.producercode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Gl Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.ginumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Gl Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.giname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 1</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline1 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 2</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline2 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 3</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline3 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 4</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline4 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 5</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline5 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Type</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.type | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Client Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.clientcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Product Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.productcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Slip Amount</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.slipamount | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Policy No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.policyno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Receipt No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.reciptno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Location Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.locationname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Branch Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.depositebranchname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Slip Additional Information</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.depositeadditionalinfo | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn On Location</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.drawnownlocation | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn Bank</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.drawanbank | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn Branch</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.drawnbranch | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawer Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.drawername | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Return Reason</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.returnreson | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Additional Information</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.additionalinfo | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Pickup Point Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.pickuppointcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Balance</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.balance | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Bank Ref</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.bankref | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Terminal ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.terminalid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Application Number / Mid</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.applicationidmid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Arn Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.arnnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">User ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.userid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Admin ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.adminid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Utr</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.utr | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Merchant_Txn</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.merchant_txt | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Csc_Id</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.csc_id | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Remark</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.remark | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Header</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.header | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							
							<v-flex @click="showmoreandless" class="showmorebutton mb-3 ml-3 mr-3" :class="[showmorebsdata === true ? 'showlesscolor' : 'showmorecolor']">
								<v-text class="caption font-weight-bold" style="color:#FFFFFF;">{{bsbtn}}</v-text>
							</v-flex>
						</v-card>
					</v-dialog>
				</v-flex>
				<v-flex xs6>
					<v-layout v-if="showunprocess === true" class="headingrightcolm" justify-space-between align-center>
						<v-flex class="pa-2" xs6>
							<v-text class="caption font-weight-bold" style="color:#10242B">Unprocessed Receipts</v-text>
						</v-flex>
						<v-flex xs6>
							<!-- <v-layout>
								<v-btn depressed block large class="my-0 mr-0" color="#F7F7F7" style="text-transform: none;border-radius:unset "> Clear All
									<v-icon right>close</v-icon>
								</v-btn>
								<v-btn dark depressed block large class="ma-0" color="#23B1A9" style="text-transform: none;border-radius:unset " @click="applyfilters()">
									<v-icon left>mdi-tune</v-icon> Filters </v-btn>
							
							</v-layout> -->
						</v-flex>
					</v-layout>
					<v-flex v-if="showunprocess === true" xs12 class="recon-tbl mt-3 elevation-1" style="">
						<!-- <v-data-table
                            v-model="selected"
                            :headers="headerstable2"
                            :items="cgbankdata"
                            :expand="expand"
							v-bind:pagination.sync="pagination"
                            hide-actions
                            select-all
                            item-key="id"
                            class="elevation-1">
                            <template slot="headers" slot-scope="props" >
                                <tr>
                                    <th></th>
                                    <th v-for="header in props.headers" :key="header.text" style="color:black">{{ header.text }}</th>
                                </tr>
                            </template>

                            <template slot="items" slot-scope="props">
                                
                            <tr @click="props.expanded = !props.expanded">
                                <v-flex v-if="showcheckbox === true" v-bind:style="{ visibility: props.item.vis  }" >
                                <td class="checkboxone" >
                                    <v-checkbox  v-model="props.item.selected" @change="tableCheck(props.item.id,$event,props.index)" primary hide-details></v-checkbox>
                                </td>
                                </v-flex>
                                
								<td v-if="showcheckbox === false" class="checkboxone" >
                                
                                </td>
                                <td class="">{{props.item.createddate}} </td>
                                <td class="">{{props.item.reciptdate}}</td>
                                <td class="">{{props.item.chequeno}}</td>
                                <td class="">{{props.item.amount}}</td>
                                <td class="">{{props.item.txtdate}}</td>
                                
                            </tr>
                            </template>
                            <template slot="expand" slot-scope="props">
                                <v-card flat style="background-color:#FEF9F6;border-color:#E46A25;padding:15px">
                                    <v-layout style="display:flex;flex-direction:row;">
                                        <v-flex class="forceflex" style="">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">SOL ID</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.solid}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Branch Name</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.branchname}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Application NO.</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.applicationnumber}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Tagic ID</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.applicationnumber}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Cust Name</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B"></v-text>{{props.item.custname}}
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">PRM Amount</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.prmamount}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="forceflex">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#E46A25">Product Code</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{props.item.productcode}}</v-text>
                                            </v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </template>
            
                        </v-data-table> -->
						<v-card flat style="overflow-x: scroll;overflow-y: auto; transform:rotateX(180deg);" class="">
							<v-data-table v-bind:pagination.sync="pagination" :headers="headerstable2" :items="paginatedcgbankdata" hide-actions style="transform:rotateX(180deg);">
								<template slot="items" slot-scope="props">
									<td class="recon-td-bdrgt">{{props.item.Created_Date | checkdata}} </td>
									<td class="recon-td-bdrgt" style="flex-direction-row;display:flex;align-items:center;">
										<!-- <div style="margin-right:10px;" @click="opengcpopupmethods(props.item)"> -->
										<!-- <img class="filtericon" src="../../../web/assets/tableicon.png"> -->
										<!-- <v-icon color="#23B1A9">receipt</v-icon>						
									</div> -->
										<v-btn flat icon color="#23B1A9" @click="opengcpopupmethods(props.item)">
											<v-icon>receipt</v-icon>
										</v-btn>
										<div class="pb-1"> {{props.item.RECEIPT_NO | checkdata}} </div>
									</td>
									<td class="recon-td-bdrgt">{{props.item.RECEIPT_DATE | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.RECEIPT_STATUS | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.RECEIPT_TOTAL_AMT | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.PAYMENT_MODE_CD | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.PYMT_INSTR_DATE | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.RCPT_BRANCH_CD | checkdata}}</td>
									
								</template>
							</v-data-table>
						</v-card>
						<v-layout row align-center class="pa-2" style="border-top:1px solid #C1C8CC">
							<!-- <v-flex xs4 > -->
							<!-- <p class="" style="font-family: roboto;font-weight: 700;">
									<span style="color: #e46a25;">Showing 1-15 </span>out of 75 records
								</p> -->
							<!-- </v-flex> -->
							<!-- <v-flex xs8 > -->
								<!-- cgbankdata -->
							<v-text class="mr-1 ml-3" style="color:#3C3D3D; font-size:14px; font-family: roboto;font-weight: 700;"> <span class="" style="color:#E46A25;">Showing {{cgbankdatafromvalue}}-{{cgbankdatatoValu}} </span>out of {{cgbankdata.length}} records </v-text>
							<v-divider class="ma-2" vertical></v-divider>
							<v-pagination class="cust-Dm-pgn" v-model="cgbankdatapageNumber" color="#152F38" flat :length="pagescgbankdata" @input="cgbankdatanextPage"> </v-pagination>
							<!-- </v-flex> -->
						</v-layout>
						<v-dialog v-model="opengcpopup" persistent overlay-color="#ffffff" max-width="1400px">
							<v-card>
								<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
									<v-flex class="pa-2" xs10>
										<v-layout>
											<div style="margin-right:15px;">
												<v-text class="subheading" style="color:#10242B">Receipt No.</v-text>
											</div>
											<div style="display:flex;flex-direction:row;align-items:center;">
												<v-flex style="margin-right:10px;">
													<!-- <img class="filtericon" src="../../../web/assets/tableicon.png"> -->
													<v-icon color="#23B1A9">receipt</v-icon>
												</v-flex>
												<v-flex>
													<v-text class="subheading" style="color:#10242B">{{gcpopupdata.RECEIPT_NO | checkdata}}</v-text>
												</v-flex>
											</div>
										</v-layout>
									</v-flex>
									<v-flex class="pa-2" xs2>
										<div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="closegcpopup">
											<v-icon>mdi-close</v-icon>
										</div>
									</v-flex>
								</v-layout>
								<v-card height="63" class="mt-3 ml-3 mr-3" style="">
									<v-layout>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Created Date</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{gcpopupdata.Created_Date | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Date</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{gcpopupdata.RECEIPT_DATE | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Status</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{gcpopupdata.RECEIPT_STATUS | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Amount</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">Rs. {{gcpopupdata.RECEIPT_TOTAL_AMT | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Payment Mode</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{gcpopupdata.PAYMENT_MODE_CD | checkdata}}</v-text>
											</v-flex>
										</v-flex>
									</v-layout>
								</v-card>
								<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Instrument Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PYMT_INSTR_DATE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Branch Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RCPT_BRANCH_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Debtor Type Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEBTOR_TYPE_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEBTOR_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSIT_SLIP_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSIT_SLIP_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pymt Chk No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PYMT_CHK_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pymt Branch Nm</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PYMT_BRANCH_NM | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Authorization Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.AUTHORIZATION_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Bank Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSIT_BANK_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Bank Account</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSIT_BANK_ACC | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider class="ml-3 mr-3"></v-divider>
								<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Company ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.COMPANY_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Agent Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.AGENT_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECEIPT_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Policy Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.POLICY_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Tagged Amount</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">Rs. {{gcpopupdata.TAGGED_AMOUNT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Branch Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.BRANCH_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Producer Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PRODUCER_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Channel</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.CHANNEL | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Source</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECEIPT_SOURCE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Agent Recpt Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.AGENT_RECPT_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Webpos Rcpt No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.WEBPOS_RCPT_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider v-if="showmoregcdata === true" class="ml-3 mr-3"></v-divider>
								<v-layout v-if="showmoregcdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received From</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECIVED_FROM | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received Opt Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECIVED_OPT_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received Client ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECIVED_CLIENT_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Payee Relation Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PAYEE_RELATION_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Voucher No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOUCHER_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Remarks</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.REMARKS_TXT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Insured Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.INSURED_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Creator User ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.CREATOR_USER_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Trans Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.TRANS_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Userid Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.USERID_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pdc Fg</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PDC_FG | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider v-if="showmoregcdata === true" class="ml-3 mr-3"></v-divider>
								<v-layout v-if="showmoregcdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Freeze</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.FREEZE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Bounce ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_BOUNCE_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Bounce Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_BOUNCE_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Partner Application No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PATNER_APPLICATION_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Deposit ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_DEPOSIT_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Deposit Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_DEPOSIT_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Cancel Void ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_CANCEL_VOID_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Cancel Void Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_CANCEL_VOID_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Sap Document No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.SAP_DOCUMENT_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Alter Net Receipt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.ALTER_NET_RECEIPT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Old Receipt No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.OLD_RECEIPT_NUMBER | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Transfer Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSITE_TRANSFER_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Intersysyem Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.INTERSYSYEM_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Mod Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.MOD_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-flex class="showmorebutton mb-3 ml-3 mr-3" @click="showmorelessgcdata()" :class="[showmoregcdata === true ? 'showlesscolor' : 'showmorecolor']">
									<v-text class="caption font-weight-bold" style="color:#FFFFFF;">{{bsbtn}}</v-text>
								</v-flex>
							</v-card>
						</v-dialog>
					</v-flex>
				</v-flex>
			</v-layout>
			<!-- Unprocess Section END -->
			<!-- Open CASE UI STARTED -->
			
			<v-layout class="" pa-3 style="">
				<v-flex xs6>
					<v-layout v-if="opencase === true" class="headingcolm" justify-space-between align-center>
						<v-flex class="pa-2" xs6>
							<v-text class="caption font-weight-bold" style="color:#10242B">Open Bank Records</v-text>
						</v-flex>
						<v-flex xs6>
							<!-- <v-layout>
								<v-btn depressed block large class="my-0 mr-0" color="#F7F7F7" style="text-transform: none;border-radius:unset"> Clear All
									<v-icon right>close</v-icon>
								</v-btn>
								<v-btn dark depressed block large class="ma-0" color="#23B1A9" style="text-transform: none;border-radius:unset" @click="applyfilters()">
									<v-icon left>mdi-tune</v-icon> Filters </v-btn>
							</v-layout> -->
						</v-flex>
						<v-dialog v-model="openfilters" persistent overlay-color="#ffffff" max-width="680px">
							<v-card class="" style="background-color:#F7F7F7">
								<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
									<v-layout v-if="showunprocess === true" class="" justify-space-between align-center>
										<v-flex class="pl-3" xs6>
											<v-text class=" font-weight-bold subheading" style="color:#10242B">Filter</v-text>
										</v-flex>
										<v-flex xs6>
											<v-layout align-center>
												<v-btn outline round class="my-0 ml-0" small color="#10242B" style="text-transform: none; " @click="rstRrFltr()"> Clear All
													<v-icon small right>close</v-icon>
												</v-btn>
												<!-- <div class="filterchip" style="flex-direction: row;display:flex; margin-right:10px;align-self:center;"> 
													<v-flex>
														<p class="caption font-weight-bold text-xs-center ma-0" style="color:#10242B">Clear All</p>
													</v-flex>
													<v-flex class="pb-1">
														<v-icon small>close</v-icon>						
													</v-flex>
												</div> -->
												<v-btn depressed block class="ma-0" color="#F7F7F7" style="text-transform: none;border-radius:unset" @click="cancelpopup()"> Cancel </v-btn>
												<!-- <div class="clearallbox pa-2" style="flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center;" @click="cancelpopup()">
													<div style="margin-right:10px">
														<v-text class="caption font-weight-bold" style="color:#4B4D4D">Cancel</v-text>
													</div>
													
												</div> -->
												<!-- <div class="applybox pa-2" style="flex:1;display:flex;flex-direction:row;justify-content:center;align-items:center;">

													<div>
														<v-text class="caption font-weight-bold" style="color:#ffffff;">Apply</v-text>
													</div>
												</div> -->
												<v-btn dark depressed block class="ma-0" color="#E46A25" style="text-transform: none;border-radius:unset" @click="aplyFltr()"> Apply </v-btn>
											</v-layout>
										</v-flex>
									</v-layout>
								</v-layout>
								<v-flex class="pa-1">
									<v-card class="card_shadow ma-2 pa-2 pb-3">
										<v-layout align-center>
											<v-flex class="pa-2">
												<v-text class="caption font-weight-bold" style="color:#4B4D4D">Filter Table :</v-text>
											</v-flex>
											<v-flex xs10>
												<v-radio-group v-model="radios" :mandatory="false" :height="10" row>
													<v-radio class="caption " label="Unprocessed Bank Records" value="UnprocessedBankRecords"></v-radio>
													<v-radio class="caption " label="Unprocessed Receipts" value="UnprocessedReceipts"></v-radio>
													<v-radio class="caption " label="Both" value="Both"></v-radio>
												</v-radio-group>
											</v-flex>
										</v-layout>
										<v-divider class=""></v-divider>
										<v-layout align-center>
											<v-flex class="pa-2" xs2>
												<v-text class="caption font-weight-bold" style="color:#4B4D4D">Txn. Type :</v-text>
											</v-flex>
											<v-flex xs10>
												<v-layout>
													<div>
														<v-checkbox v-model="checkboxselected" :height="10" label="Cash" value="Cash"></v-checkbox>
													</div>
													<div>
														<v-checkbox v-model="checkboxselected" :height="10" label="Cheque" value="Cheque"></v-checkbox>
													</div>
												</v-layout>
											</v-flex>
										</v-layout>
										<v-divider class=""></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">BS ID</v-text>
												</v-flex>
												<v-flex class="pl-2" xs12 md12>
													<v-text-field :hide-details="true" solo label="Search..." append-icon="search" v-model="srchBsId" @click:append="bsIdFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{bsArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout align-center wrap>
														<v-chip v-for="(item, index) in bsArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_bsIdFltr(index)" small> {{item}} </v-chip>
														<!-- <v-chip
																class="ma-2"
																close
																color="teal"
																text-color="white"
																close-icon="mdi-delete"
																small
																> -->
														<!-- @click:close="close" -->
														<!-- BS19060619 -->
														<!-- </v-chip> -->
														<!-- <v-layout align-center class="colorfilterchip" style="margin-right:10px;">
																<v-flex>
																	<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">BS19060619</p>
																</v-flex>
																<v-flex class="">
																	<v-icon color="#fff">close</v-icon>						
																</v-flex>
															</v-layout>

															<v-layout align-center class="colorfilterchip" style="margin-right:10px;">
																<v-flex>
																	<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">BS19060619</p>
																</v-flex>
																<v-flex class="">
																	<v-icon color="#fff">close</v-icon>						
																</v-flex>
															</v-layout> --></v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<v-divider class=" mt-3"></v-divider>
										<v-layout align-center class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">Amount (₹)</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Enter..." v-model="amtFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">Txn. Date</v-text>
												</v-flex>
												<v-flex xs12 class="mt-3 mr-3 cust-audlog">
													<v-flex rclass="sel mt-1">
														<v-menu v-model="calendartransection" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
															<template slot='activator' v-slot-activator="{on}">
																<v-text-field v-model="transectiondate" :hide-details="true" solo prepend-inner-icon="event" @blur="transectiondate = parseDate(transectiondate)" readonly v-on="on"> ></v-text-field>
															</template>
															<v-date-picker v-model="transectiondate" no-title @input="validtransec"></v-date-picker>
														</v-menu>
													</v-flex>
												</v-flex>
											</v-flex>
										</v-layout>
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">SOL ID</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" v-model="srchsolId" solo label="Search..." append-icon="search" @click:append="solIdFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{solIdArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in solIdArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_solIdFltr(index)" small>
															{{item}} </v-chip>
													
															</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
					
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">Branch Name</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="brnchNme" append-icon="search" @click:append="brnchNmeFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{brnchNmeArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in brnchNmeArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_brnchNmeFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">Branch Name</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">1 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">SAKET NAGAR</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">APPLICATION NO.</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="aplcnNo" append-icon="search" @click:append="aplcnNoFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{aplcnNoArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in aplcnNoArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_aplcnNoFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">APPLICATION NO.</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">1 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">56880500000039</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">TAGIC ID</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="tgcId" append-icon="search" @click:append="tgcIdFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{tgcIdArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in tgcIdArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_tgcIdFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">TAGIC ID</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">1 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">TA020420025230</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">CUST NAME</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo v-model="custName" label="Search..." append-icon="search" @click:append="custNameFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{custNameArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in custNameArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_custNameFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">CUST NAME</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">1 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">Mr Virendra Kanpur</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class=" mt-3"></v-divider>
										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">PRM AMT</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="prmAmt" append-icon="search" @click:append="prmAmtFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{prmAmtArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in prmAmtArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_prmAmtFltr(index)" small>
															<!-- @click:close="close" -->{{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
										<!-- <v-layout class="mt-2">
											<v-flex xs12>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">PRM AMT</v-text>
												</v-flex>
												<v-flex class="pl-2" >
													<v-text-field
														:hide-details = "true"
														solo
														label="Search..."
														append-icon="search"
													></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs12>
												<v-flex class="">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">1 Selected</v-text>
												</v-flex>

												<v-flex class="mt-4" >
													
															<div style="display:flex;flex-direction:row;align-items:center;">
																<div  class="solidfilterchip" style="display:flex;flex-direction:row;margin-right:10px;">
																	<v-flex class="mr-2">
																		<p class="caption font-weight-bold text-xs-center ma-0" style="color:#fff">354</p>
																	</v-flex>
																	<v-flex class="">
																		<v-icon color="#fff">close</v-icon>						
																	</v-flex>
																</div>

															</div>
																	
												</v-flex>
											</v-flex>
										</v-layout> -->
										<v-divider class="mt-3"></v-divider>

										<v-layout class="mt-2">
											<v-flex xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">PRODUCT CODE</v-text>
												</v-flex>
												<v-flex class="pl-2">
													<v-text-field :hide-details="true" solo label="Search..." v-model="pdtCde" append-icon="search" @click:append="pdtCdeFltr"></v-text-field>
												</v-flex>
											</v-flex>
											<v-flex class="ml-2" xs6>
												<v-flex class="pa-2">
													<v-text class="caption font-weight-bold" style="color:#4B4D4D">{{pdtCdeArr.length}} Selected</v-text>
												</v-flex>
												<v-flex class="">
													<v-layout wrap align-center>
														<v-chip v-for="(item, index) in pdtCdeArr" :key="index" class="ma-2" close color="teal" text-color="white" close-icon="mdi-delete" @input="dlt_pdtCdeFltr(index)" small> {{item}} </v-chip>
													</v-layout>
												</v-flex>
											</v-flex>
										</v-layout>
								
										</v-card>
								</v-flex>
							</v-card>
						</v-dialog>
					</v-layout>
					<v-flex v-if="opencase === true" xs12 class="mr-3 recon-tbl mt-3 elevation-1" style="">
					
						<v-card flat style="overflow-x: scroll;overflow-y: auto; transform:rotateX(180deg);" class="">
							<v-data-table v-model="selected" item-key="trHeadStaId" v-bind:pagination.sync="pagination" :headers="opentable1headers" :items="paginatedopenbankrecordtable" select-all hide-actions style="transform:rotateX(180deg);">
								<template slot="items" slot-scope="props">

									<v-flex v-bind:style="{ visibility: props.item.vis  }" style="display:flex;align-items:center;justify-content:center;">
                                    <td class="checkboxone" >
                                        <v-checkbox   v-model="props.item.selected" primary hide-details  @change="tableCheck('openbanksidedata',props.item,props.index,$event,props.item.trHeadId)"></v-checkbox>
                                    </td>
                                    </v-flex>
									<td class="recon-td-bdrgt">{{props.item.createdDate | checkdata}}</td>
									<!-- <td class="">{{props.item.DC}}</td> -->
									<td class="recon-td-bdrgt" style="flex-direction-row;display:flex;align-items:center; justify-content:center">
										<!-- <div style="margin-right:10px;" > -->
										<!-- <img class="filtericon" src="../../../web/assets/tableicon.png"> -->
										<v-btn flat icon color="#23B1A9" @click="openunprocesspopupmethods(props.item)">
											<v-icon>receipt</v-icon>
										</v-btn>
										<!-- </div> -->
										<div class="pb-1"> {{ props.item.systemId | checkdata}} </div>
									</td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.dc | checkdata}}</td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.amount | checkdata}}</td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.transcationDate | checkdata}} </td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.txnType | checkdata}}</td>
									<td class="text-no-wrap recon-td-bdrgt">{{props.item.transactionStatus | checkdata}}</td>
									<td class="justify-center layout px-0 text-xs-center" :class="[actionbuttonshowhide === true ? 'recon-td-bdrgt' : '']">
                                    <!-- <v-menu 
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
                                                @click="chkr_seltd('openunprocess',item,props.item)" 
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
                                    </v-menu> -->
                                </td>
								</template>
							</v-data-table>
						</v-card>
						<v-layout row align-center class="pa-2" style="border-top:1px solid #C1C8CC">
							<!-- openbankrecordtable -->
							<v-text class="mr-1 ml-3" style="color:#3C3D3D; font-size:13px; font-family: roboto;font-weight: 700;"><span class="" style="color:#E46A25;"> Showing {{openbankrecordtabledatafromvalue}}-{{openbankrecordtabledatatoValu}} </span>out of {{openbankrecordtable.length}} records </v-text>
							<!-- <v-flex  > -->
							<v-divider class="ma-2" vertical></v-divider>
							<v-pagination class="cust-Dm-pgn" v-model="openbankrecordtablepageNumber" color="#152F38" flat :length="pagesopenbankrecordtable"  @input="openbankrecordtablenextPage"> </v-pagination>
							<!-- </v-flex> -->
						</v-layout>
					</v-flex>
					<v-dialog v-model="openunprocessbankpopup" persistent overlay-color="#ffffff" max-width="1400px">
						<v-card>
							<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
								<v-flex class="pa-2" xs10>
									<v-layout>
										<div style="margin-right:15px;">
											<v-text class="subheading" style="color:#10242B">BSID</v-text>
										</div>
										<div style="display:flex;flex-direction:row;align-items:center;">
											<v-flex style="margin-right:10px;">
												<!-- <img class="filtericon" src="../../../web/assets/tableicon.png">-->
												<v-icon color="#23B1A9">receipt</v-icon>
											</v-flex>
											<v-flex>
												<v-text class="subheading" style="color:#10242B">{{unprocesspopupdata.bsId | checkdata}}</v-text>
											</v-flex>
										</div>
									</v-layout>
								</v-flex>
								<v-flex class="pa-2" xs2>
									<div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="closeunprocesspopupmethods">
										<v-icon>mdi-close</v-icon>
									</div>
								</v-flex>
							</v-layout>
							<v-card height="63" class="mt-3 ml-3 mr-3" style="">
								<v-layout>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">System ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.systemid | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Created Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.createddate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">D/C</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.dc | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Amount</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">Rs. {{unprocesspopupdata.amount | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Transcation Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Txn Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiontype | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Transaction Status</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectionstatus | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
							</v-card>
							<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Account Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.accountnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Flag</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.flag | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Cheque</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.cheque | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Cheque Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.chequedate | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Slip / ApplicationNo.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.depositeslipandapplication | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.depositedate | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Unique No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.uniqueno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Debt_Accnt_Nmbr / Loan Account Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.dbt_accountnoloanaccount | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.date | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider class="ml-3 mr-3"></v-divider>
							<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Card Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.cardnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Payment Mode</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.paymentmode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Authcode</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.authcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Order ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.orderid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Particulars</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.particulars | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Branch Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.branchcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Producer Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.producercode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Gl Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.ginumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Gl Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.giname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 1</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline1 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 2</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline2 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 3</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline3 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 4</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline4 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 5</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.transectiondetailsline5 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Type</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.type | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Client Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.clientcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Product Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.productcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Slip Amount</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.slipamount | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Policy No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.policyno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Receipt No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.reciptno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Location Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.locationname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Branch Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.depositebranchname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Slip Additional Information</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.depositeadditionalinfo | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn On Location</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.drawnownlocation | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn Bank</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.drawanbank | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn Branch</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.drawnbranch | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawer Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.drawername | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Return Reason</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.returnreson | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Additional Information</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.additionalinfo | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Pickup Point Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.pickuppointcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Balance</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.balance | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Bank Ref</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.bankref | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Terminal ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.terminalid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Application Number / Mid</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.applicationidmid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Arn Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.arnnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">User ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.userid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Admin ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.adminid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Utr</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.utr | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Merchant_Txn</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.merchant_txt | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Csc_Id</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.csc_id | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Remark</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.remark | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Header</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{unprocesspopupdata.header | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
						
							<v-flex @click="showmoreandless" class="showmorebutton mb-3 ml-3 mr-3" :class="[showmorebsdata === true ? 'showlesscolor' : 'showmorecolor']">
								<v-text class="caption font-weight-bold" style="color:#FFFFFF;">{{bsbtn}}</v-text>
							</v-flex>
						</v-card>
					</v-dialog>
				</v-flex>
				<v-flex xs6>
					<v-layout v-if="opencase === true" class="headingrightcolm" justify-space-between align-center>
						<v-flex class="pa-2" xs6>
							<v-text class="caption font-weight-bold" style="color:#10242B">Open Receipts</v-text>
						</v-flex>
						<v-flex xs6>
							<!-- <v-layout>
								<v-btn depressed block large class="my-0 mr-0" color="#F7F7F7" style="text-transform: none;border-radius:unset "> Clear All
									<v-icon right>close</v-icon>
								</v-btn>
								<v-btn dark depressed block large class="ma-0" color="#23B1A9" style="text-transform: none;border-radius:unset " @click="applyfilters()">
									<v-icon left>mdi-tune</v-icon> Filters </v-btn>
							
							</v-layout> -->
						</v-flex>
					</v-layout>
					<v-flex v-if="opencase === true" xs12 class="recon-tbl mt-3 elevation-1" style="">
						
						<v-card flat style="overflow-x: scroll;overflow-y: auto; transform:rotateX(180deg);" class="">
							<v-data-table v-bind:pagination.sync="pagination" :headers="opentable2header" :items="paginatedopenreceiptrecordtable" hide-actions style="transform:rotateX(180deg);" select-all>
								<template slot="items" slot-scope="props">
									<v-flex v-bind:style="{ visibility: props.item.vis  }" style="display:flex;align-items:center;justify-content:center;" >
                                    <td class="checkboxone" >
                                        <v-checkbox   v-model="props.item.selected" primary hide-details @change="tableCheck('opengcsidedata',props.item,props.index,$event,props.item.GcKeyId)"></v-checkbox>
                                    </td>
                                    </v-flex>
									<td class="recon-td-bdrgt">{{props.item.Created_Date | checkdata}} </td>
									<td class="recon-td-bdrgt" style="flex-direction-row;display:flex;align-items:center;">
									
										<v-btn flat icon color="#23B1A9" @click="opengcpopupmethods(props.item)">
											<v-icon>receipt</v-icon>
										</v-btn>
										<div class="pb-1"> {{props.item.RECEIPT_NO | checkdata}} </div>
									</td>
									<td class="recon-td-bdrgt">{{props.item.RECEIPT_DATE | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.RECEIPT_STATUS | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.RECEIPT_TOTAL_AMT | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.PAYMENT_MODE_CD | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.PYMT_INSTR_DATE | checkdata}}</td>
									<td class="recon-td-bdrgt">{{props.item.RCPT_BRANCH_CD | checkdata}}</td>
									<td class="justify-center layout px-0 text-xs-center" :class="[actionbuttonshowhide === true ? 'recon-td-bdrgt' : '']">
                                    <!-- <v-menu 
                                        transition="slide-x-transition"
                                        top
                                        left
                                        :nudge-left="40"
                                        :nudge-bottom="88"
                                        content-class="my-menu-bnkmstr"
                                        style=""
                                        flat
                                    >
                                        <v-btn color="#1E9690" slot="activator" icon small dark v-if="actionbuttonshowhide" >
                                            <v-icon dark small>arrow_forward</v-icon>
                                        </v-btn>
                                        <v-list dense style="background-color:#F7F7F7" class="pa-0 ma-0 cust-bnk-tile">
                                            <v-list-tile
                                                v-for="(item, index) in chkr_items"
                                                :key="index"
                                                @click="chkr_seltd('opengcpopup',item,props.item)" 
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
                                    </v-menu> -->
                                </td>
								</template>
							</v-data-table>
						</v-card>
						<v-layout row align-center class="pa-2" style="border-top:1px solid #C1C8CC">
							<!-- openreceiptrecordtable -->
							<v-text class="mr-1 ml-3" style="color:#3C3D3D; font-size:14px; font-family: roboto;font-weight: 700;"> <span class="" style="color:#E46A25;">Showing {{openreceiptrecordtablefromvalue}}-{{openreceiptrecordtabletoValu}} </span>out of {{openreceiptrecordtable.length}} records </v-text>
							<v-divider class="ma-2" vertical></v-divider>
							<v-pagination class="cust-Dm-pgn" v-model="openreceiptrecordtablepageNumber" color="#152F38" flat :length="pagesopenreceiptrecordtable" @input="openreceiptrecordtablenextPage"> </v-pagination>
							<!-- </v-flex> -->
						</v-layout>
						<v-dialog v-model="opengcpopup" persistent overlay-color="#ffffff" max-width="1400px">
							<v-card>
								<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
									<v-flex class="pa-2" xs10>
										<v-layout>
											<div style="margin-right:15px;">
												<v-text class="subheading" style="color:#10242B">Receipt No.</v-text>
											</div>
											<div style="display:flex;flex-direction:row;align-items:center;">
												<v-flex style="margin-right:10px;">
													<!-- <img class="filtericon" src="../../../web/assets/tableicon.png"> -->
													<v-icon color="#23B1A9">receipt</v-icon>
												</v-flex>
												<v-flex>
													<v-text class="subheading" style="color:#10242B">{{gcpopupdata.RECEIPT_NO | checkdata}}</v-text>
												</v-flex>
											</div>
										</v-layout>
									</v-flex>
									<v-flex class="pa-2" xs2>
										<div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="closegcpopup">
											<v-icon>mdi-close</v-icon>
										</div>
									</v-flex>
								</v-layout>
								<v-card height="63" class="mt-3 ml-3 mr-3" style="">
									<v-layout>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Created Date</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{gcpopupdata.Created_Date | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Date</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{gcpopupdata.RECEIPT_DATE | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Status</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{gcpopupdata.RECEIPT_STATUS | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Amount</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">Rs. {{gcpopupdata.RECEIPT_TOTAL_AMT | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Payment Mode</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{gcpopupdata.PAYMENT_MODE_CD | checkdata}}</v-text>
											</v-flex>
										</v-flex>
									</v-layout>
								</v-card>
								<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Instrument Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PYMT_INSTR_DATE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Branch Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RCPT_BRANCH_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Debtor Type Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEBTOR_TYPE_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEBTOR_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSIT_SLIP_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSIT_SLIP_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pymt Chk No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PYMT_CHK_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pymt Branch Nm</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PYMT_BRANCH_NM | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Authorization Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.AUTHORIZATION_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Bank Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSIT_BANK_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Bank Account</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSIT_BANK_ACC | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider class="ml-3 mr-3"></v-divider>
								<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Company ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.COMPANY_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Agent Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.AGENT_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECEIPT_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Policy Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.POLICY_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Tagged Amount</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">Rs. {{gcpopupdata.TAGGED_AMOUNT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Branch Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.BRANCH_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Producer Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PRODUCER_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Channel</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.CHANNEL | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Source</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECEIPT_SOURCE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Agent Recpt Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.AGENT_RECPT_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Webpos Rcpt No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.WEBPOS_RCPT_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider v-if="showmoregcdata === true" class="ml-3 mr-3"></v-divider>
								<v-layout v-if="showmoregcdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received From</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECIVED_FROM | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received Opt Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECIVED_OPT_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received Client ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.RECIVED_CLIENT_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Payee Relation Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PAYEE_RELATION_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Voucher No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOUCHER_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Remarks</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.REMARKS_TXT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Insured Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.INSURED_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Creator User ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.CREATOR_USER_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Trans Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.TRANS_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Userid Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.USERID_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pdc Fg</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PDC_FG | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider v-if="showmoregcdata === true" class="ml-3 mr-3"></v-divider>
								<v-layout v-if="showmoregcdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Freeze</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.FREEZE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Bounce ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_BOUNCE_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Bounce Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_BOUNCE_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Partner Application No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.PATNER_APPLICATION_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Deposit ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_DEPOSIT_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Deposit Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_DEPOSIT_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Cancel Void ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_CANCEL_VOID_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Cancel Void Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.VOID_CANCEL_VOID_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Sap Document No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.SAP_DOCUMENT_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Alter Net Receipt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.ALTER_NET_RECEIPT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Old Receipt No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.OLD_RECEIPT_NUMBER | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Transfer Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.DEPOSITE_TRANSFER_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Intersysyem Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.INTERSYSYEM_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Mod Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{gcpopupdata.MOD_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-flex class="showmorebutton mb-3 ml-3 mr-3" @click="showmorelessgcdata()" :class="[showmoregcdata === true ? 'showlesscolor' : 'showmorecolor']">
									<v-text class="caption font-weight-bold" style="color:#FFFFFF;">{{bsbtn}}</v-text>
								</v-flex>
							</v-card>
						</v-dialog>
					</v-flex>
				</v-flex>
			</v-layout>
			<!-- Open Case UI END -->
			<v-flex v-if="showprobable === false">
				<v-flex class="probablematch">
					<v-text class="caption font-weight-bold" style="color:#10242B">PROBABLE MATCHES</v-text>
				</v-flex>
				<v-flex xs6 ma-2 style="display:flex;flex-direction:row;">
					<v-flex @click="resetbutton()" class="">
						<v-btn small class="caption" style="background-color:#E46A25;color:#fff">Reset</v-btn>
					</v-flex>
					<v-flex class="mr-3" style="">
						<v-select :items="items" label="Receipt Status" solo></v-select>
					</v-flex>
					<v-flex class="mr-3" style="">
						<v-select :items="items" label="is" solo></v-select>
					</v-flex>
					<v-flex class="mr-3" style="">
						<v-select :items="items" label="Deposited" solo></v-select>
					</v-flex>
				</v-flex>
				
				<v-card height="125" class="ma-3" style="" v-for="(item, index) in paginatedfinalprobabledata" :key="index" v-bind:pagination.sync="pagination">
					<v-layout>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Processed on</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.probMatchDate | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Process ID</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.probMatchTrCode | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class=" pa-2 cardborder" style="background-color:#F3FBFB;height:63px;display:flex;align-items:center;justify-content:center;" @click="showbankprobablepopup(item)">
								<v-text class="title font-weight-bold" style="color:#1E9690">BS</v-text>
							</v-flex>
							<v-flex class=" pa-2 cardborder " style="background-color:#FEF9F6;height:62px;display:flex;align-items:center;justify-content:center;" @click="showgcprobablepopup(item)">
								<v-text class="title font-weight-bold" style="color:#E46A25">GC</v-text>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Created Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.createdDate | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Created Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.createdDate | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">System ID</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.systemId | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt No</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RECEIPT_NO | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">D/C</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.dc | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt Date.</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RECEIPT_DATE | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Amount (₹)</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.amount | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt Status</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RECEIPT_STATUS | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Transcation Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.transcationDate | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt Amount</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RECEIPT_TOTAL_AMT | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Txn Type</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.txnType | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Payment Mode</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.PAYMENT_MODE_CD | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Transaction Status</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.transactionStatus | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Instrument Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.PYMT_INSTR_DATE | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder" style="height:63px;"> </v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt Branch Code</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RCPT_BRANCH_CD | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<!-- <v-flex>
							<v-flex class="pa-2 cardborder" style="height:63px;">
								
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Status</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">Deposited</v-text>
								</v-flex>
							</v-flex>
						</v-flex> -->
						<v-flex>
							<v-flex>
								<v-flex class="cardborder" style="height:63px;">
									<v-checkbox v-model="item.selected" hide-details  @change="probabletableCheck(item.banksidedata,item.GCsidedata,index,$event,item.banksidedata.trHeadId,item.GCsidedata.GcKeyId)"></v-checkbox>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder" style="height:63px;">
								<!-- <v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Details</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption font-weight-bold" style="color:#E46A25">Show more</v-text>
								</v-flex> -->
							</v-flex>
						</v-flex>
					</v-layout>
				</v-card>

				<!-- Probable Bank Side Popup -->

				<v-dialog v-model="openprobablebankpopup" persistent overlay-color="#ffffff" max-width="1400px">
						<v-card>
							<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
								<v-flex class="pa-2" xs10>
									<v-layout>
										<div style="margin-right:15px;">
											<v-text class="subheading" style="color:#10242B">BSID</v-text>
										</div>
										<div style="display:flex;flex-direction:row;align-items:center;">
											<v-flex style="margin-right:10px;">
												<!-- <img class="filtericon" src="../../../web/assets/tableicon.png">-->
												<v-icon color="#23B1A9">receipt</v-icon>
											</v-flex>
											<v-flex>
												<v-text class="subheading" style="color:#10242B">{{probablebankdata.bsId | checkdata}}</v-text>
											</v-flex>
										</div>
									</v-layout>
								</v-flex>
								<v-flex class="pa-2" xs2>
									<div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="closebanksideprobablepopupmethods">
										<v-icon>mdi-close</v-icon>
									</div>
								</v-flex>
							</v-layout>
							<v-card height="63" class="mt-3 ml-3 mr-3" style="">
								<v-layout>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Processed on</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablebankdata.probMatchDate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Created Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablebankdata.createddate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">D/C</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablebankdata.dc | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Amount</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">Rs. {{probablebankdata.amount | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Transcation Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablebankdata.transectiondate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Txn Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablebankdata.transectiontype | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Transaction Status</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablebankdata.transectionstatus | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
							</v-card>
							<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Account Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.accountnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Flag</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.flag | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Cheque</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.cheque | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Cheque Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.chequedate | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Slip / ApplicationNo.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.depositeslipandapplication | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.depositedate | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Unique No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.uniqueno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Debt_Accnt_Nmbr / Loan Account Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.dbt_accountnoloanaccount | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.date | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider class="ml-3 mr-3"></v-divider>
							<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Card Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.cardnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Payment Mode</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.paymentmode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Authcode</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.authcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Order ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.orderid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Particulars</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.particulars | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Branch Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.branchcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Producer Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.producercode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Gl Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.ginumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Gl Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.giname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 1</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.transectiondetailsline1 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 2</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.transectiondetailsline2 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 3</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.transectiondetailsline3 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 4</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.transectiondetailsline4 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 5</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.transectiondetailsline5 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Type</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.type | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Client Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.clientcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Product Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.productcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Slip Amount</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.slipamount | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Policy No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.policyno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Receipt No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.reciptno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Location Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.locationname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Branch Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.depositebranchname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Slip Additional Information</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.depositeadditionalinfo | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn On Location</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.drawnownlocation | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn Bank</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.drawanbank | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn Branch</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.drawnbranch | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawer Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.drawername | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Return Reason</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.returnreson | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Additional Information</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.additionalinfo | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Pickup Point Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.pickuppointcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Balance</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.balance | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Bank Ref</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.bankref | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Terminal ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.terminalid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Application Number / Mid</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.applicationidmid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Arn Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.arnnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">User ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.userid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Admin ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.adminid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Utr</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.utr | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Merchant_Txn</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.merchant_txt | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Csc_Id</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.csc_id | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Remark</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.remark | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Header</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{probablebankdata.header | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
						
							<v-flex @click="showmoreandless" class="showmorebutton mb-3 ml-3 mr-3" :class="[showmorebsdata === true ? 'showlesscolor' : 'showmorecolor']">
								<v-text class="caption font-weight-bold" style="color:#FFFFFF;">{{bsbtn}}</v-text>
							</v-flex>
						</v-card>
				</v-dialog>

				<!-- probable GC SIDE POPUP -->

				<v-dialog v-model="openprobablegcpopup" persistent overlay-color="#ffffff" max-width="1400px">
							<v-card>
								<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
									<v-flex class="pa-2" xs10>
										<v-layout>
											<div style="margin-right:15px;">
												<v-text class="subheading" style="color:#10242B">Receipt No.</v-text>
											</div>
											<div style="display:flex;flex-direction:row;align-items:center;">
												<v-flex style="margin-right:10px;">
													<!-- <img class="filtericon" src="../../../web/assets/tableicon.png"> -->
													<v-icon color="#23B1A9">receipt</v-icon>
												</v-flex>
												<v-flex>
													<v-text class="subheading" style="color:#10242B">{{probablegcdata.RECEIPT_NO | checkdata}}</v-text>
												</v-flex>
											</div>
										</v-layout>
									</v-flex>
									<v-flex class="pa-2" xs2>
										<div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="closeprobablegcpopup">
											<v-icon>mdi-close</v-icon>
										</div>
									</v-flex>
								</v-layout>
								<v-card height="63" class="mt-3 ml-3 mr-3" style="">
									<v-layout>
										
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Process ID</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablegcdata.probMatchTrCode | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Created Date</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablegcdata.Created_Date | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Date</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablegcdata.RECEIPT_DATE | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Status</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablegcdata.RECEIPT_STATUS | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Amount</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">Rs. {{probablegcdata.RECEIPT_TOTAL_AMT | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Payment Mode</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{probablegcdata.PAYMENT_MODE_CD | checkdata}}</v-text>
											</v-flex>
										</v-flex>
									</v-layout>
								</v-card>
								<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Instrument Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.PYMT_INSTR_DATE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Branch Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.RCPT_BRANCH_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Debtor Type Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.DEBTOR_TYPE_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.DEBTOR_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.DEPOSIT_SLIP_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.DEPOSIT_SLIP_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pymt Chk No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.PYMT_CHK_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pymt Branch Nm</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.PYMT_BRANCH_NM | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Authorization Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.AUTHORIZATION_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Bank Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.DEPOSIT_BANK_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Bank Account</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.DEPOSIT_BANK_ACC | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider class="ml-3 mr-3"></v-divider>
								<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Company ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.COMPANY_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Agent Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.AGENT_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.RECEIPT_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Policy Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.POLICY_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Tagged Amount</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">Rs. {{probablegcdata.TAGGED_AMOUNT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Branch Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.BRANCH_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Producer Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.PRODUCER_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Channel</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.CHANNEL | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Source</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.RECEIPT_SOURCE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Agent Recpt Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.AGENT_RECPT_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Webpos Rcpt No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.WEBPOS_RCPT_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider v-if="showmoregcdata === true" class="ml-3 mr-3"></v-divider>
								<v-layout v-if="showmoregcdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received From</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.RECIVED_FROM | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received Opt Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.RECIVED_OPT_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received Client ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.RECIVED_CLIENT_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Payee Relation Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.PAYEE_RELATION_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Voucher No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.VOUCHER_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Remarks</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.REMARKS_TXT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Insured Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.INSURED_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Creator User ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.CREATOR_USER_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Trans Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.TRANS_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Userid Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.USERID_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pdc Fg</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.PDC_FG | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider v-if="showmoregcdata === true" class="ml-3 mr-3"></v-divider>
								<v-layout v-if="showmoregcdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Freeze</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.FREEZE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Bounce ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.VOID_BOUNCE_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Bounce Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.VOID_BOUNCE_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Partner Application No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.PATNER_APPLICATION_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Deposit ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.VOID_DEPOSIT_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Deposit Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.VOID_DEPOSIT_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Cancel Void ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.VOID_CANCEL_VOID_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Cancel Void Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.VOID_CANCEL_VOID_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Sap Document No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.SAP_DOCUMENT_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Alter Net Receipt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.ALTER_NET_RECEIPT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Old Receipt No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.OLD_RECEIPT_NUMBER | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Transfer Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.DEPOSITE_TRANSFER_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Intersysyem Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.INTERSYSYEM_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Mod Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{probablegcdata.MOD_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-flex class="showmorebutton mb-3 ml-3 mr-3" @click="showmorelessgcdata()" :class="[showmoregcdata === true ? 'showlesscolor' : 'showmorecolor']">
									<v-text class="caption font-weight-bold" style="color:#FFFFFF;">{{bsbtn}}</v-text>
								</v-flex>
							</v-card>
				</v-dialog>


				<v-layout row align-center class="pa-2" style="border-top:1px solid #C1C8CC">
					<!-- finalprobabledata -->
					<v-text class="mr-1 ml-3" style="color:#3C3D3D; font-size:14px; font-family: roboto;font-weight: 700;"> <span class="" style="color:#E46A25;">Showing {{finalprobabledatafromvalue}}-{{finalprobabledatatoValu}} </span>out of {{finalprobabledata.length}} records </v-text>
					<v-divider class="ma-2" vertical></v-divider>
					<v-pagination class="cust-Dm-pgn" v-model="finalprobabledatapageNumber" color="#152F38" flat :length="pagesfinalprobabledata" @input="finalprobabledatanextPage"> </v-pagination>
				</v-layout>
			</v-flex>


			<!-- CLOSE Tabs -->
			<v-flex v-if="showclose === true">
				<v-flex class="probablematch">
					<v-text class="caption font-weight-bold" style="color:#10242B">CLOSED CASES</v-text>
				</v-flex>
				<v-flex xs6 ma-2 style="display:flex;flex-direction:row;">
					<v-flex @click="resetbutton()" class="">
						<v-btn small class="caption" style="background-color:#E46A25;color:#fff">Reset</v-btn>
					</v-flex>
					<v-flex class="mr-3" style="">
						<v-select :items="items" label="Receipt Status" solo></v-select>
					</v-flex>
					<v-flex class="mr-3" style="">
						<v-select :items="items" label="is" solo></v-select>
					</v-flex>
					<v-flex class="mr-3" style="">
						<v-select :items="items" label="Deposited" solo></v-select>
					</v-flex>
				</v-flex>
				<v-card height="125" class="ma-3" style="" v-for="(item, index) in paginatedfinalclosedata" :key="index" v-bind:pagination.sync="pagination">
					<v-layout>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Reconciled on</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.knockOffDate | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Recon ID</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.knockOffTrCode | checkdata}}</v-text>
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
									<v-text class="caption font-weight-bold" style="color:#1E9690">Created Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.createdDate | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Created Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.createdDate | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">System ID</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.systemId | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt No</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RECEIPT_NO | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">D/C</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.dc | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt Date.</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RECEIPT_DATE | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Amount (₹)</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.amount | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt Status</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RECEIPT_STATUS | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Transcation Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.transcationDate | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt Amount</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RECEIPT_TOTAL_AMT | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Txn Type</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.txnType | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Payment Mode</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.PAYMENT_MODE_CD | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Transaction Status</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.transactionStatus | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Instrument Date</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.PYMT_INSTR_DATE | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Remark Type</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.RemarkType | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Remark Desp</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.UserRemarks | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#1E9690">Status</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.banksidedata.ApprovalStatus | checkdata}}</v-text>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex>
									<v-text class="caption font-weight-bold" style="color:#10242B">Receipt Branch Code</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">{{item.GCsidedata.RCPT_BRANCH_CD | checkdata}}</v-text>
								</v-flex>
							</v-flex>
						</v-flex>
						<!-- <v-flex>
							<v-flex class="pa-2 cardborder" style="height:63px;">
								
							</v-flex>
							<v-flex class="pa-2 cardborder">
								<v-flex >
								<v-text class="caption font-weight-bold" style="color:#10242B">Status</v-text>
								</v-flex>
								<v-flex class="mt-1">
									<v-text class="caption" style="color:#10242B">Deposited</v-text>
								</v-flex>
							</v-flex>
						</v-flex> -->
						<v-flex>
							<v-flex>
								<v-flex class="cardborder" style="height:63px;">
									<v-checkbox hide-details></v-checkbox>
								</v-flex>
							</v-flex>
							<v-flex class="pa-2 " style="height:63px;" :class="[actionbuttonshowhide === true ? 'cardborder' : '']">
							<v-flex class="ml-3">
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
                                                v-for="(itemdetails, index) in chkr_items"
                                                :key="index"
                                                @click="closepopover(itemdetails,item.GCsidedata)" 
                                                class="pa-0 ma-0"
                                                >

                                                <v-list-tile-action  class="pa-0 ma-0" style="background-color:#FFFFFF;min-width: 37px; border-right:0.5px solid #C1C8CC" > 
                                                    <v-icon :color="itemdetails.color" class="pl-2 pt-1">{{ itemdetails.icon }}</v-icon>
                                                </v-list-tile-action>

                                                <v-list-tile-title class="pa-0 ma-0 pl-2 pt-1 font-weight-bold">
                                                    {{ itemdetails.title }}
                                                </v-list-tile-title>

                                            </v-list-tile>
                                        </v-list>
                                    </v-menu>
								</v-flex>
							</v-flex>
						</v-flex>
					</v-layout>
				</v-card>
				<v-layout  row align-center class="pa-2" style="border-top:1px solid #C1C8CC">
					<!-- finalclosedata -->
					<v-text class="mr-1 ml-3" style="color:#3C3D3D; font-size:14px; font-family: roboto;font-weight: 700;"> <span class="" style="color:#E46A25;">Showing {{finalclosedatafromvalue}}-{{finalclosedatatoValu}}</span> out of {{finalclosedata.length}} records </v-text>
					<v-divider class="ma-2" vertical></v-divider>
					<v-pagination  class="cust-Dm-pgn" v-model="finalclosedatapageNumber" color="#152F38" flat :length="pagesfinalclosedata" @input="finalclosedatanextPage"> </v-pagination>
				</v-layout>


				<!-- Bank SiDE CLOSE POPUP -->

				<v-dialog v-model="openClosebankpopup" persistent overlay-color="#ffffff" max-width="1400px">
						<v-card>
							<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
								<v-flex class="pa-2" xs10>
									<v-layout>
										<div style="margin-right:15px;">
											<v-text class="subheading" style="color:#10242B">BSID</v-text>
										</div>
										<div style="display:flex;flex-direction:row;align-items:center;">
											<v-flex style="margin-right:10px;">
												<!-- <img class="filtericon" src="../../../web/assets/tableicon.png">-->
												<v-icon color="#23B1A9">receipt</v-icon>
											</v-flex>
											<v-flex>
												<v-text class="subheading" style="color:#10242B">{{probablebankdata.bsId | checkdata}}</v-text>
											</v-flex>
										</div>
									</v-layout>
								</v-flex>
								<v-flex class="pa-2" xs2>
									<div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="banksideclosepopupmethods">
										<v-icon>mdi-close</v-icon>
									</div>
								</v-flex>
							</v-layout>
							<v-card height="63" class="mt-3 ml-3 mr-3" style="">
								<v-layout>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Reconciled on</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closebankdata.knockOffDate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Created Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closebankdata.createddate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">D/C</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closebankdata.dc | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Amount</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">Rs. {{closebankdata.amount | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Transcation Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closebankdata.transectiondate | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Txn Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closebankdata.transectiontype | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 cardborder">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Transaction Status</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closebankdata.transectionstatus | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
							</v-card>
							<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Account Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.accountnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Flag</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.flag | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Cheque</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.cheque | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Cheque Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.chequedate | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Slip / ApplicationNo.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.depositeslipandapplication | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.depositedate | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Unique No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.uniqueno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Debt_Accnt_Nmbr / Loan Account Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.dbt_accountnoloanaccount | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Date</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.date | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider class="ml-3 mr-3"></v-divider>
							<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Card Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.cardnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Payment Mode</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.paymentmode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Authcode</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.authcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Order ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.orderid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Particulars</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.particulars | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Branch Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.branchcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Producer Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.producercode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Gl Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.ginumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Gl Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.giname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 1</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.transectiondetailsline1 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 2</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.transectiondetailsline2 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 3</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.transectiondetailsline3 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 4</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.transectiondetailsline4 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Transaction Detail Line 5</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.transectiondetailsline5 | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Type</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.type | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Client Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.clientcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Product Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.productcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Slip Amount</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.slipamount | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Policy No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.policyno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Receipt No.</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.reciptno | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Location Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.locationname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Branch Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.depositebranchname | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Deposit Slip Additional Information</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.depositeadditionalinfo | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn On Location</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.drawnownlocation | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn Bank</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.drawanbank | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawn Branch</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.drawnbranch | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Drawer Name</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.drawername | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Return Reason</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.returnreson | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Additional Information</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.additionalinfo | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
							<v-divider v-if="showmorebsdata === true" class="ml-3 mr-3"></v-divider>
							<v-layout v-if="showmorebsdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Pickup Point Code</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.pickuppointcode | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Balance</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.balance | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Bank Ref</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.bankref | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Terminal ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.terminalid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Application Number / Mid</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.applicationidmid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Arn Number</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.arnnumber | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">User ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.userid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Admin ID</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.adminid | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Utr</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.utr | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Merchant_Txn</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.merchant_txt | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Csc_Id</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.csc_id | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Remark</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.remark | checkdata}}</v-text>
									</v-flex>
								</v-flex>
								<v-flex class="pa-2 mt-3">
									<v-flex>
										<v-text class="caption" style="color:#10242B">Header</v-text>
									</v-flex>
									<v-flex class="mt-1">
										<v-text class="caption font-weight-bold" style="color:#10242B">{{closebankdata.header | checkdata}}</v-text>
									</v-flex>
								</v-flex>
							</v-layout>
						
							<v-flex @click="showmoreandless" class="showmorebutton mb-3 ml-3 mr-3" :class="[showmorebsdata === true ? 'showlesscolor' : 'showmorecolor']">
								<v-text class="caption font-weight-bold" style="color:#FFFFFF;">{{bsbtn}}</v-text>
							</v-flex>
						</v-card>
				</v-dialog>

				<!-- Close GC SIDE POPUP -->

				<v-dialog v-model="openclodegcpopup" persistent overlay-color="#ffffff" max-width="1400px">
							<v-card>
								<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">
									<v-flex class="pa-2" xs10>
										<v-layout>
											<div style="margin-right:15px;">
												<v-text class="subheading" style="color:#10242B">Receipt No.</v-text>
											</div>
											<div style="display:flex;flex-direction:row;align-items:center;">
												<v-flex style="margin-right:10px;">
													<!-- <img class="filtericon" src="../../../web/assets/tableicon.png"> -->
													<v-icon color="#23B1A9">receipt</v-icon>
												</v-flex>
												<v-flex>
													<v-text class="subheading" style="color:#10242B">{{closetabgcdata.RECEIPT_NO | checkdata}}</v-text>
												</v-flex>
											</div>
										</v-layout>
									</v-flex>
									<v-flex class="pa-2" xs2>
										<div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="hideclosegcpopup">
											<v-icon>mdi-close</v-icon>
										</div>
									</v-flex>
								</v-layout>
								<v-card height="63" class="mt-3 ml-3 mr-3" style="">
									<v-layout>
										
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Recon ID</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closetabgcdata.knockOffTrCode | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Created Date</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closetabgcdata.Created_Date | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Date</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closetabgcdata.RECEIPT_DATE | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Status</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closetabgcdata.RECEIPT_STATUS | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Receipt Amount</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">Rs. {{closetabgcdata.RECEIPT_TOTAL_AMT | checkdata}}</v-text>
											</v-flex>
										</v-flex>
										<v-flex class="pa-2 cardborder">
											<v-flex>
												<v-text class="caption" style="color:#10242B">Payment Mode</v-text>
											</v-flex>
											<v-flex class="mt-1">
												<v-text class="body-2 font-weight-bold" style="color:#10242B">{{closetabgcdata.PAYMENT_MODE_CD | checkdata}}</v-text>
											</v-flex>
										</v-flex>
									</v-layout>
								</v-card>
								<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Instrument Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.PYMT_INSTR_DATE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Branch Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.RCPT_BRANCH_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Debtor Type Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.DEBTOR_TYPE_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.DEBTOR_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.DEPOSIT_SLIP_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Slip Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.DEPOSIT_SLIP_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pymt Chk No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.PYMT_CHK_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pymt Branch Nm</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.PYMT_BRANCH_NM | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Authorization Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.AUTHORIZATION_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Bank Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.DEPOSIT_BANK_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-3">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Bank Account</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.DEPOSIT_BANK_ACC | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider class="ml-3 mr-3"></v-divider>
								<v-layout class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Company ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.COMPANY_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Agent Code</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.AGENT_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.RECEIPT_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Policy Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.POLICY_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Tagged Amount</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">Rs. {{closetabgcdata.TAGGED_AMOUNT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Branch Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.BRANCH_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Producer Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.PRODUCER_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Channel</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.CHANNEL | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Receipt Source</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.RECEIPT_SOURCE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Agent Recpt Dt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.AGENT_RECPT_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Webpos Rcpt No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.WEBPOS_RCPT_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider v-if="showmoregcdata === true" class="ml-3 mr-3"></v-divider>
								<v-layout v-if="showmoregcdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received From</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.RECIVED_FROM | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received Opt Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.RECIVED_OPT_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Received Client ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.RECIVED_CLIENT_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Payee Relation Type</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.PAYEE_RELATION_TYPE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Voucher No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.VOUCHER_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Remarks</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.REMARKS_TXT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Insured Name</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.INSURED_NAME | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Creator User ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.CREATOR_USER_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Trans Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.TRANS_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Userid Cd</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.USERID_CD | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Pdc Fg</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.PDC_FG | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-divider v-if="showmoregcdata === true" class="ml-3 mr-3"></v-divider>
								<v-layout v-if="showmoregcdata === true" class=" ml-3 mr-3" style="background-color:#F7F7F7">
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Freeze</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.FREEZE | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Bounce ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.VOID_BOUNCE_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Bounce Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.VOID_BOUNCE_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Partner Application No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.PATNER_APPLICATION_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Deposit ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.VOID_DEPOSIT_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Deposit Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.VOID_DEPOSIT_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Cancel Void ID</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.VOID_CANCEL_VOID_ID | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Void Cancel Void Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.VOID_CANCEL_VOID_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Sap Document No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.SAP_DOCUMENT_NO | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Alter Net Receipt</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.ALTER_NET_RECEIPT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Old Receipt No.</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.OLD_RECEIPT_NUMBER | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Deposit Transfer Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.DEPOSITE_TRANSFER_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Intersysyem Date</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.INTERSYSYEM_DT | checkdata}}</v-text>
										</v-flex>
									</v-flex>
									<v-flex class="pa-2 mt-2">
										<v-flex>
											<v-text class="caption" style="color:#10242B">Mod Timestamp</v-text>
										</v-flex>
										<v-flex class="mt-1">
											<v-text class="caption font-weight-bold" style="color:#10242B">{{closetabgcdata.MOD_TIMESTAMP | checkdata}}</v-text>
										</v-flex>
									</v-flex>
								</v-layout>
								<v-flex class="showmorebutton mb-3 ml-3 mr-3" @click="showmorelessgcdata()" :class="[showmoregcdata === true ? 'showlesscolor' : 'showmorecolor']">
									<v-text class="caption font-weight-bold" style="color:#FFFFFF;">{{bsbtn}}</v-text>
								</v-flex>
							</v-card>
				</v-dialog>
			</v-flex>
			<v-dialog v-model="dialog" persistent max-width="290">
				<!-- <template v-slot:activator="{ on }">
			<v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
			</template> -->
				<v-card>
					<!-- <v-card-title class="headline">Use Google's location service?</v-card-title> -->
					<v-card-text>Are You Sure ?</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="green darken-1" flat @click="dialog = false">No</v-btn>
						<v-btn color="green darken-1" flat @click="dialog = false">Yes</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>


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
                                            <v-text color="#10242B" class="font-weight-bold">{{bucketname}}</v-text>
                                        </v-layout>
                                        <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                            <v-text>Request Type</v-text>
                                            <v-text color="#10242B" class="font-weight-bold">{{requesttype}}</v-text>
                                        </v-layout>
                                        <v-layout column class="">
                                            <v-text>Request on </v-text>
                                            <v-text color="#10242B" class="font-weight-bold">{{createddate}}</v-text>
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
                                            v-model="selectremarktype"
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
                                    <v-btn dark color="#D1121B" class="bnk-txt-tranfrm" @click="rejectwithremarkapicall()">
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
		</v-card>
	</v-app>
</template>
<script>
	import axios from 'axios'
	import moment from 'moment';

	let todayDate = ""
	let openobj = {
					BankTransactionId:null,
					GcTransactionId : null,
					
				}
	let probableobj = {
					BankTransactionId:null,
					GcTransactionId : null,
	}

	let openbanksidetable = [

			// BankTransactionId = '' ,
			// GcTransactionId = '' ,
			// RuleId = 84,
			// RuleResultActStaCode = "manRecon" ,
			// RuleMatchCase = "Force Matched"
	]
	let opengcsidetable = [
			// BankTransactionId = '' ,
			// GcTransactionId = '' ,
			// RuleId = 84,
			// RuleResultActStaCode = "manRecon" ,
			// RuleMatchCase = "Force Matched"
	]
	
	    export default {
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
				this.$store.commit('SET_PAGE_TITLE', 'Reconciliation');

				this.approvalopenbucketshow = this.$store.getters.getapprovalhistoryroute

				if(this.approvalopenbucketshow === 'openbucket'){
					this.showopensection()
				}else if(this.approvalopenbucketshow === 'closebucket'){
					this.showclosedata()
				}else{
					this.hideprobablematch()
				}

				console.log("APPROVAL HISTORY GETTERS::",this.approvalopenbucketshow);
				this.GetAllFiltersData()

				this.getremarktypedata()

				let menulist = this.$store.getters.getDetamenulistils

				// let manualrecondata = menulist[2]

				// console.log("manual menu LIST::",manualrecondata);

				for(let i=0;i<menulist.length;i++){
					if(menulist[i].menuName === 'reconciliation'){
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

        beforeRouteLeave(to, form, next) {
			this.$store.commit('SET_APPROVAL_HISTORY_ROUTE','')
			next();
		},
	        mounted() {

				this.forcematch = true
				this.btnname = 'Start Force Match'

				todayDate = Date.now();
				self.Dateto = moment(todayDate).format('MM-DD-YYYY'); 
				self.fromDate = moment(Date.now()).subtract(7,'d').format('MM-DD-YYYY');
				  
				// this.getcountdatafromapi(this.bankaccountnumber)
				  
	        },
	        data() {
	            return {
					rjctBnkDilg:false,
					bankRjctForm:false,
					hstryBnkDilg:false,
					actionbuttonshowhide:false,
					accDesc:'',
					rjctdesc:'',
					Nature:["Collection", "Payment", "Investment"],
					swap_final_count:false,
	                final:0,
					fval:0,
					sval:0,

					pageNumber: 1,
					size: 15,
					fromvalue:'',
					toValu:'',

					cgbankdatapageNumber:1,
					cgbankdatafromvalue:'',
					cgbankdatatoValu:'',
					cgbankdatasize:15,
					closetotalcount:0,

					openbankrecordtablepageNumber:1,
					openbankrecordtabledatafromvalue:'',
					openbankrecordtabledatatoValu:'',
					openbankrecordtablesize:15,

					openreceiptrecordtablepageNumber:1,
					openreceiptrecordtablefromvalue:'',
					openreceiptrecordtabletoValu:'',
					openreceiptrecordtablesize:15,

					finalprobabledatapageNumber:1,
					finalprobabledatafromvalue:'',
					finalprobabledatatoValu:'',
					finalprobabledatasize:15,


					finalclosedatapageNumber:1,
					finalclosedatafromvalue:'',
					finalclosedatatoValu:'',
					finalclosedatasize:15,

					finalclosedata:[],
					finalprobabledata:[],
					search:'',
					subbnknme:"",
					openbankrecordtable:[],
					openreceiptrecordtable:[],
					opencase:false,
					unprocessrecepitfromgccount:0,
					unprocessrececordfrombankcount:0,
					openrecepitfromgccount:0,
					openrececordfrombankcount:0,
					probablematchescount:0,
					closecasescount:0,
					unprocesspopupdata:{},
					gcpopupdata:{},
					probablebankdata:{},
					probablegcdata:{},
					closebankdata:{},
					openprobablebankpopup:false,
					openClosebankpopup:false,
					autoRcnRspns:{},
					bsArr:[],
					srchBsId:'',
					solIdArr:[],
					srchsolId:'',
					brnchNmeArr:[],
					brnchNme:'',
					aplcnNoArr:[],
					aplcnNo:'',
					tgcIdArr:[],
					tgcId:'',
					custNameArr:[],
					custName:'',
					prmAmtArr:[],
					prmAmt:'',
					pdtCdeArr:[],
					pdtCde:'',
					closetabgcdata:{},
					dtsChgnd:false,
					updteRcntblFlg:false,
					frmcalender: false,
					Tocalender:false,
					validation:'',
					truevalidate:false,
					radios:'Both',
					checkboxselected: [],
					probableforcematch:[],
					openfilters:false,
					showmoregcdata:false,
					bsbtn:'Show More',
					showmorebsdata:false,
					openunprocessbankpopup:false,
					strtReconDilg:false,
					opengcpopup:false,
					openprobablegcpopup:false,
					openclodegcpopup:false,
					pagination: {
               			 rowsPerPage:15
            		},
					moment,
					totoalpagelength:0,
					gcbankpagelength:0,
					bnkProfilePic:"",
					TrnsatinStrtDte:'',
					filterdata:'',
					showdropdown:false,
					dialog:false,
					showunprocess:true,
					remarktype:[],
					selectremarktype:'',
					showclose:false,
					showprobable:true,
					filterdropdown:['Created Date','Bank Name','BS ID','Txn. Type','Amount','Txn Date'],
					items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
					banksname:[
						{
							bankname:'HDFC Bank'
						},{
						bankname:'ICICI Bank'
						},
						{
						bankname:'SBI Bank'
						}
						],
					value:'',
					showcheckbox:false,
					shwFrcMtchBtn:false,
					shwRcnBtn:true,
					btnname:'',
					selected:[],
					bankList: [],
					frmdate: "",
					toDte:"",
					forcematch:true,
					agetext:'',
					nameofbank:'',
					bankaccountnumber:'',
					date:null,
					calender:false,
					fromDate:null,
					agetextto:'',
					dateto:null,
					calenderto:false,
					Dateto:null,
					transectiondate:null,
					calendartransection:false,
					expand: false,
					banksfilter:[],
					FilteringApi:[],
					expanded: [],
					singleExpand: false,
					unprocesstable:[],
					cgbankdata:[],
					startforcedata:[],
					approvalopenbucketshow:'',
					headerstable2:[
						{
						text: 'Created Date',
						align: 'left',
						sortable: false,
						value: 'createddate'
					},
					{ text: 'Receipt No.', value: 'ReceiptNo',sortable: false },
					{ text: 'Receipt Date.', value: 'ReceiptDate',sortable: false },
					{ text: 'Receipt Status', value: 'ReceiptStatus',sortable: false },
					{ text: 'Receipt Amount', value: 'ReceiptAmount' ,sortable: false},
					{ text: 'Payment Mode', value: 'PaymentMode',sortable: false },
					{ text: 'Instrument Date', value: 'InstrumentDate',sortable: false },
					{ text: 'Receipt Branch Code', value: 'ReceiptBranchCode',sortable: false},
					],

					headers: [
					{ text: 'Created Date', value: 'CreatedDate',sortable: false },
						{
						text: 'System ID',
						align: 'left',
						sortable: false,
						value: 'SystemID'
					},
					
					{ text: 'D/C', value: 'DC',sortable: false },
					{ text: 'Amount', value: 'Amount',sortable: false},
					{ text: 'Transcation Date', value: 'TranscationDate',sortable: false },
					{ text: 'Txn Type', value: 'TxnType' },
					{ text: 'Transaction Status', value: 'TransactionStatus',sortable: false },
					],

					opentable1headers: [
					{ text: 'Created Date', value: 'CreatedDate',sortable: false },
						{
						text: 'System ID',
						align: 'left',
						sortable: false,
						value: 'SystemID'
					},
					
					{ text: 'D/C', value: 'DC',sortable: false },
					{ text: 'Amount', value: 'Amount',sortable: false},
					{ text: 'Transcation Date', value: 'TranscationDate',sortable: false },
					{ text: 'Txn Type', value: 'TxnType' },
					{ text: 'Transaction Status', value: 'TransactionStatus',sortable: false },
					// { text: 'Action', value: 'action',sortable: false }
					],

					opentable2header:[
						{
						text: 'Created Date',
						align: 'left',
						sortable: false,
						value: 'createddate'
					},
					{ text: 'Receipt No.', value: 'ReceiptNo',sortable: false },
					{ text: 'Receipt Date.', value: 'ReceiptDate',sortable: false },
					{ text: 'Receipt Status', value: 'ReceiptStatus',sortable: false },
					{ text: 'Receipt Amount', value: 'ReceiptAmount' ,sortable: false},
					{ text: 'Payment Mode', value: 'PaymentMode',sortable: false },
					{ text: 'Instrument Date', value: 'InstrumentDate',sortable: false },
					{ text: 'Receipt Branch Code', value: 'ReceiptBranchCode',sortable: false},
					// { text: 'Action', value: 'action',sortable: false }
					],

					chkr_items: [
						{ title: 'View Details', icon:'highlight',color:"#646666"},
						{ title: 'Approve', icon:'check_circle',color:"#1E9690" },
						{ title: 'Reject With Remark' , icon:'cancel',color:"#D1121B"},
						{ title: 'Approval History' , icon:'info',color:"#E46A25"}
					],
					bucketname:'',
					requesttype:'',
					createddate:'',
					recorecode:'',
					historyapprovaldata : [],
                	approvalhistoryheaderdata : [],

					staticbstable:[
							{
						SystemID: '001',
						CreatedDate: '8/5/20',
						DC: '002211',
						Amount: '1000',
						TranscationDate: '8/5/20',
						TxnType: 'saving',
						TransactionStatus:'Active'
					},
					{
						SystemID: '001',
						CreatedDate: '8/5/20',
						DC: '002211',
						Amount: '1000',
						TranscationDate: '8/5/20',
						TxnType: 'saving',
						TransactionStatus:'Active'
					},
					{
						SystemID: '001',
						CreatedDate: '8/5/20',
						DC: '002211',
						Amount: '1000',
						TranscationDate: '8/5/20',
						TxnType: 'saving',
						TransactionStatus:'Active'
					},
					{
						SystemID: '001',
						CreatedDate: '8/5/20',
						DC: '002211',
						Amount: '1000',
						TranscationDate: '8/5/20',
						TxnType: 'saving',
						TransactionStatus:'Active'
					},
					],
						tablesecond: [
					{
						SystemID: '001',
						CreatedDate: '8/5/20',
						DC: '002211',
						Amount: '1000',
						TranscationDate: '8/5/20',
						TxnType: 'saving',
						TransactionStatus:'Active'
					},
					{
						SystemID: '001',
						CreatedDate: '8/5/20',
						DC: '002211',
						Amount: '1000',
						TranscationDate: '8/5/20',
						TxnType: 'saving',
						TransactionStatus:'Active'
					},
					{
						SystemID: '001',
						CreatedDate: '8/5/20',
						DC: '002211',
						Amount: '1000',
						TranscationDate: '8/5/20',
						TxnType: 'saving',
						TransactionStatus:'Active'
					},
					{
						SystemID: '001',
						CreatedDate: '8/5/20',
						DC: '002211',
						Amount: '1000',
						TranscationDate: '8/5/20',
						TxnType: 'saving',
						TransactionStatus:'Active'
					},
				
		
					],
					desserts: [
					{
						id: '001',
						createddate: '8/5/20',
						bankname: 'HDFC Bank',
						bsid: 'BS19060619',
						txntype: 'Cash',
						amount: '1000',
						txndate: '8/5/20',
						details:'Showmore'
					},
					{
						id: '002',
						createddate: '8/5/20',
						bankname: 'HDFC Bank',
						bsid: 'BS19060619',
						txntype: 'Cash',
						amount: '1000',
						txndate: '8/5/20',
						details:'Showmore'
					},
					{
						id: '003',
						createddate: '8/5/20',
						bankname: 'HDFC Bank',
						bsid: 'BS19060619',
						txntype: 'Cash',
						amount: '1000',
						txndate: '8/5/20',
						details:'Showmore'
					},
					{
						id: '004',
						createddate: '8/5/20',
						bankname: 'HDFC Bank',
						bsid: 'BS19060619',
						txntype: 'Cash',
						amount: '1000',
						txndate: '8/5/20',
						details:'Showmore'
					},
					{
						id: '005',
						createddate: '8/5/20',
						bankname: 'HDFC Bank',
						bsid: 'BS19060619',
						txntype: 'Cash',
						amount: '1000',
						txndate: '8/5/20',
						details:'Showmore'
					},
					{
						id: '006',
						createddate: '8/5/20',
						bankname: 'HDFC Bank',
						bsid: 'BS19060619',
						txntype: 'Cash',
						amount: '1000',
						txndate: '8/5/20',
						details:'Showmore'
					},
					{
						id: '007',
						createddate: '8/5/20',
						bankname: 'HDFC Bank',
						bsid: 'BS19060619',
						txntype: 'Cash',
						amount: '1000',
						txndate: '8/5/20',
						details:'Showmore'
					},
					{
						id: '008',
						createddate: '8/5/20',
						bankname: 'HDFC Bank',
						bsid: 'BS19060619',
						txntype: 'Cash',
						amount: '1000',
						txndate: '8/5/20',
						details:'Showmore'
					},
				
					],
					 
	            }
	        },
	        computed: {
			
			
			approvalopenbucketshow(){
					console.log("Approval data:::")
			},
			pages () {

            	return this.pagination.rowsPerPage ? Math.ceil(this.totoalpagelength / this.pagination.rowsPerPage) : 0
			},
			
			gcbankpages(){
            	return this.pagination.rowsPerPage ? Math.ceil(this.gcbankpagelength / this.pagination.rowsPerPage) : 0
			},

			Closepages(){
				console.log("this.pagination.rowsPerPage",this.pagination.rowsPerPage);
            	return this.pagination.rowsPerPage ? Math.ceil(this.finalclosedata.length / this.pagination.rowsPerPage) : 0
			},

			probablepages(){
            	return this.pagination.rowsPerPage ? Math.ceil(this.finalprobabledata.length / this.pagination.rowsPerPage) : 0
			},
			computedFrmDateFormattedMomentjs () {
            return this.frmdate ? moment(this.frmdate).format("DD-MM-YYYY"): ''
			},
			computedToDateFormattedMomentjs () {
            return this.toDte ? moment(this.toDte).format("DD-MM-YYYY"): ''
			},
			
			filteredItems() {
				return _.orderBy(this.output.filter(item => {
	             if(!this.search) return this.output;
	               return (
						item.HouseOfBank.toLowerCase().includes(this.search.toLowerCase())
						// item.BankAcNo.includes(this.search)
					);
				}));
			},

			pagesunprocesstable () {

				console.log(this.size ? Math.ceil(this.unprocesstable.length / this.size) : 0)
				return this.size ? Math.ceil(this.unprocesstable.length / this.size) : 0
			},
			
			paginatedunprocesstable() {
				const start = this.pageNumber * this.size - this.size,
				end = start + this.size;
				console.log(start,end,"start End")

				if(!this.unprocesstable || this.unprocesstable.length == 0){
					this.fromvalue=0
				}else{
					this.fromvalue=start+1;
				}

				
				if(this.unprocesstable.length <this.size){
					this.toValu=this.unprocesstable.length
				}else if(this.unprocesstable.length <end){
						this.toValu=this.unprocesstable.length
				}else{
					this.toValu=end
				}

				console.log(this.fromvalue,this.toValu,"this.fromvalue this.toValu")
				return this.unprocesstable.slice(start, end);
			},
			
			pagescgbankdata () {

				console.log(this.cgbankdatasize ? Math.ceil(this.cgbankdata.length / this.cgbankdatasize) : 0)
				return this.cgbankdatasize ? Math.ceil(this.cgbankdata.length / this.cgbankdatasize) : 0
			},
			
			paginatedcgbankdata() {
				const start = this.cgbankdatapageNumber * this.cgbankdatasize - this.cgbankdatasize,
				end = start + this.cgbankdatasize;
				console.log(start,end,"start End")

				if(!this.cgbankdata || this.cgbankdata.length == 0){
					this.cgbankdatafromvalue=0
				}else{
					this.cgbankdatafromvalue=start+1;
				}

				
				if(this.cgbankdata.length <this.cgbankdatasize){
					this.cgbankdatatoValu=this.cgbankdata.length
				}else if(this.cgbankdata.length <end){
						this.cgbankdatatoValu=this.cgbankdata.length
				}else{
					this.cgbankdatatoValu=end
				}

				console.log(this.cgbankdatafromvalue,this.cgbankdatatoValu,"this.fromvalue this.toValu")
				return this.cgbankdata.slice(start, end);
			},
			

			pagesopenbankrecordtable () {

				console.log(this.openbankrecordtablesize ? Math.ceil(this.openbankrecordtable.length / this.openbankrecordtablesize) : 0)
				return this.openbankrecordtablesize ? Math.ceil(this.openbankrecordtable.length / this.openbankrecordtablesize) : 0
			},
			
			paginatedopenbankrecordtable() {
				const start = this.openbankrecordtablepageNumber * this.openbankrecordtablesize - this.openbankrecordtablesize,
				end = start + this.openbankrecordtablesize;
				console.log(start,end,"start End")

				if(!this.openbankrecordtable || this.openbankrecordtable.length == 0){
					this.openbankrecordtabledatafromvalue=0
				}else{
					this.openbankrecordtabledatafromvalue=start+1;
				}

				
				if(this.openbankrecordtable.length <this.openbankrecordtablesize){
					this.openbankrecordtabledatatoValu=this.openbankrecordtable.length
				}else if(this.openbankrecordtable.length <end){
						this.openbankrecordtabledatatoValu=this.openbankrecordtable.length
				}else{
					this.openbankrecordtabledatatoValu=end
				}

				console.log(this.openbankrecordtabledatafromvalue,this.openbankrecordtabledatatoValu,"this.fromvalue this.toValu")
				return this.openbankrecordtable.slice(start, end);
			},
			

			pagesopenreceiptrecordtable () {

				console.log(this.openreceiptrecordtablesize ? Math.ceil(this.openreceiptrecordtable.length / this.openreceiptrecordtablesize) : 0)
				return this.openreceiptrecordtablesize ? Math.ceil(this.openreceiptrecordtable.length / this.openreceiptrecordtablesize) : 0
			},
			
			paginatedopenreceiptrecordtable() {
				const start = this.openreceiptrecordtablepageNumber * this.openreceiptrecordtablesize - this.openreceiptrecordtablesize,
				end = start + this.openreceiptrecordtablesize;
				console.log(start,end,"start End")

				if(!this.openreceiptrecordtable || this.openreceiptrecordtable.length == 0){
					this.openreceiptrecordtablefromvalue=0
				}else{
					this.openreceiptrecordtablefromvalue=start+1;
				}

				
				if(this.openreceiptrecordtable.length <this.openreceiptrecordtablesize){
					this.openreceiptrecordtabletoValu=this.openreceiptrecordtable.length
				}else if(this.openreceiptrecordtable.length <end){
						this.openreceiptrecordtabletoValu=this.openreceiptrecordtable.length
				}else{
					this.openreceiptrecordtabletoValu=end
				}

				console.log(this.openreceiptrecordtablefromvalue,this.openreceiptrecordtabletoValu,"this.fromvalue this.toValu")
				return this.openreceiptrecordtable.slice(start, end);
			},

			pagesfinalprobabledata () {

				console.log(this.finalprobabledatasize ? Math.ceil(this.finalprobabledata.length / this.finalprobabledatasize) : 0)
				return this.finalprobabledatasize ? Math.ceil(this.finalprobabledata.length / this.finalprobabledatasize) : 0
			},
			
			paginatedfinalprobabledata() {
				const start = this.finalprobabledatapageNumber * this.finalprobabledatasize - this.finalprobabledatasize,
				end = start + this.finalprobabledatasize;
				console.log(start,end,"start End")

				if(!this.finalprobabledata || this.finalprobabledata.length == 0){
					this.finalprobabledatafromvalue=0
				}else{
					this.finalprobabledatafromvalue=start+1;
				}

				
				if(this.finalprobabledata.length <this.finalprobabledatasize){
					this.finalprobabledatatoValu=this.finalprobabledata.length
				}else if(this.finalprobabledata.length <end){
						this.finalprobabledatatoValu=this.finalprobabledata.length
				}else{
					this.finalprobabledatatoValu=end
				}

				console.log(this.finalprobabledatafromvalue,this.finalprobabledatatoValu,"this.fromvalue this.toValu")
				return this.finalprobabledata.slice(start, end);
			},
			
			pagesfinalclosedata () {

				console.log(this.finalclosedatasize ? Math.ceil(this.finalclosedata.length / this.finalclosedatasize) : 0)
				return this.finalclosedatasize ? Math.ceil(this.finalclosedata.length / this.finalclosedatasize) : 0
			},
			
			paginatedfinalclosedata() {
				const start = this.finalclosedatapageNumber * this.finalclosedatasize - this.finalclosedatasize,
				end = start + this.finalclosedatasize;
				console.log(start,end,"start End")

				if(!this.finalclosedata || this.finalclosedata.length == 0){
					this.finalclosedatafromvalue=0
				}else{
					this.finalclosedatafromvalue=start+1;
				}

				
				if(this.finalclosedata.length <this.finalclosedatasize){
					this.finalclosedatatoValu=this.finalclosedata.length
				}else if(this.finalclosedata.length <end){
						this.finalclosedatatoValu=this.finalclosedata.length
				}else{
					this.finalclosedatatoValu=end
				}

				console.log(this.finalclosedatafromvalue,this.finalclosedatatoValu,"this.fromvalue this.toValu")
				return this.finalclosedata.slice(start, end);
        	}

			
			


	        },
	        watch: {
				
				// approvalopenbucketshow(val){
				// 	console.log("Approval data:::",val)
				// }

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

	        methods: {
				
				approveapihit(){

					var self = this;
				
				axios({
					method: "post",
					url:
						this.API_Service_admin()+"/ApprovalAPI/api/ApprovalProcess/UpdateApprovalBucketAction",
					headers: {
						"Content-Type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "97a02d5f-181d-8e32-7996-bc8a4a70f677",
					},
					data: {
						UserId: 1,
						PageName:"approvalBucketView",
						BankAcNo: self.bankaccountnumber,
						SessionID : 1,

						UpdateApprovalActionTypeList : [{
							RecordType : "autoReconUpdate" ,
							RecordCode :  self.recorecode ,
							ActionTaken : "approved" ,
							RemarkId : 0,
							Remarks  : ''
						}]

					},
				})
					.then(function (response) {
						console.log("Response>>>>>>", response);
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
				getremarktypedata(){
					
				   this.remarktype = this.$store.state.remarktype.Reconpageremarktpe
				   console.log("GET Remark Type::",this.remarktype);
				},
				rejectwithremarkapicall(){

				var self = this;
				
				axios({
					method: "post",
					url:
						this.API_Service_admin()+"/ApprovalAPI/api/ApprovalProcess/UpdateApprovalBucketAction",
					headers: {
						"Content-Type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "97a02d5f-181d-8e32-7996-bc8a4a70f677",
					},
					data: {
						UserId: 1,
						PageName:"approvalBucketView",
						BankAcNo: self.bankaccountnumber,
						SessionID : 1,

						UpdateApprovalActionTypeList : [{
							RecordType : "autoReconUpdate" ,
							RecordCode :  self.recorecode ,
							ActionTaken : "approved" ,
							RemarkId : self.selectremarktype,
							Remarks  : self.rjctdesc
						}]

					},
				})
					.then(function (response) {
						console.log("Response>>>>>>", response);
						if(response.data[0].Status === 'Success.'){
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
					this.selectremarktype = ''
					this.rjctdesc = ''
					this.rjctBnkDilg=false
				},
				chkr_seltd(tablename,item,tbldta){
					console.log("Table Name::",tablename)
					console.log("item clciked",item);
					console.log('tbldta',tbldta)

					if(item.title==="View Details"){
						// this.shwApprvBtn=false
						// this.rjctBnkDilg=false
						// this.hstryBnkDilg=false
						// this.viewBnkDtls(tbldta)
						if(tablename === 'openunprocess'){
							this.openunprocesspopupmethods(tbldta)
						}else if(tablename === 'opengcpopup'){
							this.opengcpopupmethods(tbldta)
						}
					}else if(item.title==="Approve"){
						// this.shwApprvBtn=true
						// this.rjctBnkDilg=false
						// this.hstryBnkDilg=false
						// this.viewBnkDtls(tbldta)
						this.approveapihit()
						if(tablename === 'openunprocess'){
							this.recorecode = tbldta.trHeadId
							this.createddate = tbldta.createdDate
						}else if(tablename === 'opengcpopup'){
							this.recorecode = tbldta.GcKeyId
							this.createddate = tbldta.Created_Date
						}
					}else if(item.title==="Reject With Remark"){
						this.bucketname = 'Open Bucket'
						this.requesttype = 'Auto Recon Approval Request'
						if(tablename === 'openunprocess'){
							this.recorecode = tbldta.trHeadId
							this.createddate = tbldta.createdDate
						}else if(tablename === 'opengcpopup'){
							this.recorecode = tbldta.GcKeyId
							this.createddate = tbldta.Created_Date

						}
						this.rjctBnkDilg=true

					
					}else if(item.title==="Approval History"){
						
						if(tablename === 'openunprocess'){
							this.recorecode = tbldta.trHeadId
							this.createddate = tbldta.createdDate
						}else if(tablename === 'opengcpopup'){
							this.recorecode = tbldta.GcKeyId
							this.createddate = tbldta.Created_Date

						}

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
                        RecordType : "autoReconUpdate",
                        RecordCode : self.recorecode
						
					},
				})
					.then(function (response) {
						console.log("Approval APi Response>>>>>>", response);
						if(response.data.Status === 'Success'){
                        console.log("API SUCCESS::::",response.data)
                        
                        if(response.data.HistoryOfAutoReconList.length > 0){
                            self.historyapprovaldata = response.data.HistoryOfAutoReconList
                            self.approvalhistoryheaderdata = response.data.HistoryOfAutoReconList[0]
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
				closepopover(item,tbldta){
					
					console.log("item clciked",item);
					console.log('tbldta',tbldta)

					if(item.title==="View Details"){
					
					}else if(item.title==="Approve"){

						this.recorecode = tbldta.knockOffTrCode
						this.approveapihit()
						
					}else if(item.title==="Reject With Remark"){
						// this.shwApprvBtn=false
						// this.accType='Reject With Remark'
						// this.$refs.rjctform.reset();
						this.bucketname = 'Close Bucket'
						this.requesttype = 'Auto Recon Approval Request'
						this.recorecode = tbldta.knockOffTrCode
						this.createddate = tbldta.Created_Date
						this.rjctBnkDilg=true
					
					}else if(item.title==="Approval History"){

						this.recorecode = tbldta.knockOffTrCode
						this.gethistory()
						// this.hstryBnkDilg=true
					}
                
        		},
				nextPage(page) {
					this.pageNumber = page;
				},
				cgbankdatanextPage(page) {
					this.cgbankdatapageNumber = page;
				},
				openbankrecordtablenextPage(page) {
					this.openbankrecordtablepageNumber = page;
				},
				openreceiptrecordtablenextPage(page) {
					this.openreceiptrecordtablepageNumber = page;
				},
				finalprobabledatanextPage(page) {
					this.finalprobabledatapageNumber = page;
				},
				finalclosedatanextPage(page) {
					this.finalclosedatapageNumber = page;
				},


			
			probabletableCheck(banksidedata,gcsidedata,ind,bool,banksideunique,gcsideunique){
				
				console.log("Bank SIDE DATA::",banksidedata);
				console.log("GC SIDE DATA::",gcsidedata);
				console.log("INDEX",ind)
				console.log("CHECK BOX bool",bool)
				console.log("bank Side Unique::",banksideunique)
				console.log("GC SIDE UNIQUE",gcsideunique)

				if(bool){

					probableobj.BankTransactionId = banksidedata.trHeadId
					probableobj.GcTransactionId = gcsidedata.GcKeyId
					probableobj.RuleId = 84
					probableobj.RuleResultActStaCode = "manRecon"
					probableobj.RuleMatchCase = "Force Matched"

					this.probableforcematch.push(probableobj)

					console.log("Probable match data::",this.probableforcematch);
				}else{

					console.log("false Checkbix")
					const index = this.probableforcematch.findIndex(list => list.BankTransactionId == banksideunique); //Find the index of stored id
					this.probableforcematch.splice(index, 1); // Then remove

					console.log("remove Probable match data::",this.probableforcematch);

				}

				probableobj = {
						BankTransactionId : null,
						GcTransactionId : null 
					}

			},
			tableCheck(tableidentify,data,ind,bool,uniqueid){


				console.log("Table CHECK::",tableidentify);
				console.log("data Find...",data)
				console.log("TABELE Index",ind)
				console.log("CHECKBOX EVENT::",bool)
				
				if(tableidentify === 'openbanksidedata'){

					if(bool){
						console.log("True Checkbix")
						openobj.BankTransactionId = data.trHeadId
						openobj.RuleId = 84
						openobj.RuleResultActStaCode = "manRecon"
						openobj.RuleMatchCase = "Force Matched"
						openbanksidetable.push(openobj)
					}else{
						console.log("false Checkbix")

						const index = openbanksidetable.findIndex(list => list.BankTransactionId == uniqueid); //Find the index of stored id
						openbanksidetable.splice(index, 1); // Then remove
						
						console.log("Remove bank Data:::",openbanksidetable)
					}
					
				}else{

					if(bool){
						openobj.GcTransactionId = data.GcKeyId
						openobj.RuleId = 84
						openobj.RuleResultActStaCode = "manRecon"
						openobj.RuleMatchCase = "Force Matched"
						opengcsidetable.push(openobj)
					}else{

						console.log("false Checkbix GC")

						const index = opengcsidetable.findIndex(list => list.GcTransactionId == uniqueid); //Find the index of stored id
						opengcsidetable.splice(index, 1); // Then remove
						
						console.log("Remove GC Data:::",opengcsidetable)
					}
				}



				console.log('BANK SIDE',openbanksidetable)
				console.log('GC SIDE::',opengcsidetable)
		
					openobj = {
						BankTransactionId : null,
						GcTransactionId : null 
					}
				
				
			},
			closebanksideprobablepopupmethods(){
				this.probablebankdata = {}
				this.showmorebsdata = false
				this.bsbtn = 'Show More'
				this.openprobablebankpopup = false
			},
			showbankprobablepopup(data){
				
				console.log("DATA::",data);
				this.probablebankdata=Object.assign({

					systemid : data.banksidedata.systemId,
					createddate : data.banksidedata.createdDate,
					dc:data.banksidedata.dc,
					amount:data.banksidedata.amount,
					transectiondate:data.banksidedata.transcationDate,
					transectiontype:data.banksidedata.txnType,
					transectionstatus:data.banksidedata.transactionStatus,
					accountnumber:data.banksidedata.accountNumber,
					flag:data.banksidedata.flag,
					cheque:data.banksidedata.cheque,
					chequedate:data.banksidedata.chequeDate,
					depositeslipandapplication:data.banksidedata.depositSlip,
					depositedate:data.banksidedata.depositDate,
					uniqueno:data.banksidedata.uniqueNo,
					dbt_accountnoloanaccount:data.banksidedata.debtLoanAccntNmbr,
					date:data.banksidedata.date,
					cardnumber:data.banksidedata.cardNumber,
					paymentmode:data.banksidedata.paymentMode,
					authcode:data.banksidedata.authcode,
					orderid:data.banksidedata.orderId,
					particulars:data.banksidedata.particulars,
					branchcode:data.banksidedata.branchCode,
					producercode:data.banksidedata.producerCode,
					ginumber:data.banksidedata.glNumber,
					giname:data.banksidedata.glName,
					transectiondetailsline1:data.banksidedata.transactionDetailLine1,
					transectiondetailsline2:data.banksidedata.transactionDetailLine2,
					transectiondetailsline3:data.banksidedata.transactionDetailLine3,
					transectiondetailsline4:data.banksidedata.transactionDetailLine4,
					transectiondetailsline5:data.banksidedata.transactionDetailLine5,
					type:data.banksidedata.type,
					clientcode:data.banksidedata.clientCode,
					productcode:data.banksidedata.productCode,
					slipamount:data.banksidedata.slipAmount,
					policyno:data.banksidedata.policyNo,
					reciptno:data.banksidedata.receiptNo,
					locationname:data.banksidedata.locationName,
					depositebranchname:data.banksidedata.depositBranchName,
					depositeadditionalinfo:data.banksidedata.depositSlipAdditionalInformation,
					drawnownlocation:data.banksidedata.drawnOnLocation,
					drawanbank:data.banksidedata.drawnBank,
					drawnbranch:data.banksidedata.drawnBranch,
					drawername:data.banksidedata.drawerName,
					returnreson:data.banksidedata.returnReason,
					additionalinfo:data.banksidedata.additionalInformation,
					pickuppointcode:data.banksidedata.pickupPointCode,
					balance:data.banksidedata.balance,
					bankref:data.banksidedata.bankRef,
					terminalid:data.banksidedata.terminalId,
					applicationidmid:data.banksidedata.applicationNumberMid,
					arnnumber:data.banksidedata.arnNumber,
					userid:data.banksidedata.userId,
					adminid:data.banksidedata.adminId,
					utr:data.banksidedata.utr,
					merchant_txt:data.banksidedata.merchantTxn,
					csc_id:data.banksidedata.cscId,
					remark:data.banksidedata.remark,
					header:data.banksidedata.header,
					bsId:data.banksidedata.bsId,
					probMatchDate:data.banksidedata.probMatchDate,
					probMatchTrCode :data.banksidedata.probMatchTrCode
				})
				// this.probablebankdata = data.banksidedata
				this.openprobablebankpopup = true
				console.log("Probable Bank Side popup Data",this.probablebankdata);

			},

			showbankclosepopup(data){
				console.log("CLOSE ROW DATA::",data);
				this.closebankdata=Object.assign({

					systemid : data.banksidedata.systemId,
					createddate : data.banksidedata.createdDate,
					dc:data.banksidedata.dc,
					amount:data.banksidedata.amount,
					transectiondate:data.banksidedata.transcationDate,
					transectiontype:data.banksidedata.txnType,
					transectionstatus:data.banksidedata.transactionStatus,
					accountnumber:data.banksidedata.accountNumber,
					flag:data.banksidedata.flag,
					cheque:data.banksidedata.cheque,
					chequedate:data.banksidedata.chequeDate,
					depositeslipandapplication:data.banksidedata.depositSlip,
					depositedate:data.banksidedata.depositDate,
					uniqueno:data.banksidedata.uniqueNo,
					dbt_accountnoloanaccount:data.banksidedata.debtLoanAccntNmbr,
					date:data.banksidedata.date,
					cardnumber:data.banksidedata.cardNumber,
					paymentmode:data.banksidedata.paymentMode,
					authcode:data.banksidedata.authcode,
					orderid:data.banksidedata.orderId,
					particulars:data.banksidedata.particulars,
					branchcode:data.banksidedata.branchCode,
					producercode:data.banksidedata.producerCode,
					ginumber:data.banksidedata.glNumber,
					giname:data.banksidedata.glName,
					transectiondetailsline1:data.banksidedata.transactionDetailLine1,
					transectiondetailsline2:data.banksidedata.transactionDetailLine2,
					transectiondetailsline3:data.banksidedata.transactionDetailLine3,
					transectiondetailsline4:data.banksidedata.transactionDetailLine4,
					transectiondetailsline5:data.banksidedata.transactionDetailLine5,
					type:data.banksidedata.type,
					clientcode:data.banksidedata.clientCode,
					productcode:data.banksidedata.productCode,
					slipamount:data.banksidedata.slipAmount,
					policyno:data.banksidedata.policyNo,
					reciptno:data.banksidedata.receiptNo,
					locationname:data.banksidedata.locationName,
					depositebranchname:data.banksidedata.depositBranchName,
					depositeadditionalinfo:data.banksidedata.depositSlipAdditionalInformation,
					drawnownlocation:data.banksidedata.drawnOnLocation,
					drawanbank:data.banksidedata.drawnBank,
					drawnbranch:data.banksidedata.drawnBranch,
					drawername:data.banksidedata.drawerName,
					returnreson:data.banksidedata.returnReason,
					additionalinfo:data.banksidedata.additionalInformation,
					pickuppointcode:data.banksidedata.pickupPointCode,
					balance:data.banksidedata.balance,
					bankref:data.banksidedata.bankRef,
					terminalid:data.banksidedata.terminalId,
					applicationidmid:data.banksidedata.applicationNumberMid,
					arnnumber:data.banksidedata.arnNumber,
					userid:data.banksidedata.userId,
					adminid:data.banksidedata.adminId,
					utr:data.banksidedata.utr,
					merchant_txt:data.banksidedata.merchantTxn,
					csc_id:data.banksidedata.cscId,
					remark:data.banksidedata.remark,
					header:data.banksidedata.header,
					bsId:data.banksidedata.bsId,
					knockOffDate:data.banksidedata.knockOffDate,
					knockOffTrCode :data.banksidedata.knockOffTrCode
				})
				console.log("CLOSE BANK DATA::",this.closebankdata)

				this.openClosebankpopup = true

			},

			banksideclosepopupmethods(){
				this.showmorebsdata = false
				this.bsbtn = 'Show More'
				this.closebankdata = {}
				this.openClosebankpopup = false

			},

			hideclosegcpopup(){
				this.closetabgcdata = {}
				this.showmorebsdata = false
				this.bsbtn = 'Show More'
				this.openclodegcpopup = false
			},

			showgcclosepopup(data){
				this.closetabgcdata = data.GCsidedata
				this.openclodegcpopup = true
				console.log("CLOSE GC Side popup Data",this.closetabgcdata);
			},

			showgcprobablepopup(data){

				this.probablegcdata = data.GCsidedata
				this.openprobablegcpopup = true
				console.log("Probable GC Side popup Data",this.probablegcdata);

			},

			closeprobablegcpopup(){
				this.probablegcdata = {}
				this.showmorebsdata = false
				this.bsbtn = 'Show More'
				this.openprobablegcpopup = false
			},
			GETIND(event){
				console.log("Get index::",event)
			},
			clearSearch () {
		       this.search="";
		     },
			chngfrmDate(date) {
				this.frmcalender=false
				this.updteRcntblFlg=true
				this.dtsChgnd = true
				this.validDateChk()
			},

			chngToDate(date) {
				this.Tocalender=false
				this.updteRcntblFlg=true
				this.dtsChgnd = true
				this.validDateChk()
			},

			validDateChk(){
            
            let fromeDate =moment(this.frmdate).valueOf()
            let CurrentDate=moment(Date.now()).valueOf()
            let Todate =moment(this.toDte).valueOf()

            console.log("From Date:",fromeDate,moment(fromeDate).format('DD-MM-YYYY'), "||" , "Current Date:",CurrentDate ,moment(CurrentDate).format('DD-MM-YYYY'),"||", "To Date",Todate,moment(Todate).format('DD-MM-YYYY'))
            if(Todate > CurrentDate){
                this.truevalidate = true
                this.validation = "Cannot select future Date"
                console.log("Im Greate than current Date")
            }else if (Todate < fromeDate){
                this.truevalidate = true
                this.validation ="Can't  be less than From date"
                console.log("Im Lower than To Date")
            }else{
                this.truevalidate = false
                this.validation =""
            }
		},
		updteRcntbl(){
			if(this.truevalidate=== false){
				
				if(this.showunprocess === true){
					this.fetchunprocessdata(this.bankaccountnumber)
					console.log("Unprocess function hit ");
				}else if(this.opencase === true){
					this.opencasedata(this.bankaccountnumber)
					console.log("Open function hit ");
				}else if(this.showprobable === false){
					console.log("PROBABLE function hit ");
				}else{
					this.fetchclosedata(this.bankaccountnumber)
					console.log("Close function hit ");
				}

			}else{
				this.showToast("Please Select Proper Date's",this.TOST().WARNING);
			}
		},
			
			applyfilters(){
				this.openfilters = true
			},
			cancelpopup(){
				this.openfilters = false
			},
			aplyFltr(){
				this.openfilters = false
			},
			
			showmorelessgcdata(){
				if(this.showmoregcdata === true){
					this.showmoregcdata = false
					this.bsbtn = 'Show More'
				}else{
					this.showmoregcdata = true
					this.bsbtn = 'Show Less'
				}
			},
			showmoreandless(){

				if(this.showmorebsdata === true){
					this.showmorebsdata = false
					this.bsbtn = 'Show More'
				}else{
					this.showmorebsdata = true
					this.bsbtn = 'Show Less'
				}
			},
			openunprocesspopupmethods(data){

				console.log("POPUP Data::",data);

				this.unprocesspopupdata=Object.assign({

					systemid : data.systemId,
					createddate : data.createdDate,
					dc:data.dc,
					amount:data.amount,
					transectiondate:data.transcationDate,
					transectiontype:data.txnType,
					transectionstatus:data.transactionStatus,
					accountnumber:data.accountNumber,
					flag:data.flag,
					cheque:data.cheque,
					chequedate:data.chequeDate,
					depositeslipandapplication:data.depositSlip,
					depositedate:data.depositDate,
					uniqueno:data.uniqueNo,
					dbt_accountnoloanaccount:data.debtLoanAccntNmbr,
					date:data.date,
					cardnumber:data.cardNumber,
					paymentmode:data.paymentMode,
					authcode:data.authcode,
					orderid:data.orderId,
					particulars:data.particulars,
					branchcode:data.branchCode,
					producercode:data.producerCode,
					ginumber:data.glNumber,
					giname:data.glName,
					transectiondetailsline1:data.transactionDetailLine1,
					transectiondetailsline2:data.transactionDetailLine2,
					transectiondetailsline3:data.transactionDetailLine3,
					transectiondetailsline4:data.transactionDetailLine4,
					transectiondetailsline5:data.transactionDetailLine5,
					type:data.type,
					clientcode:data.clientCode,
					productcode:data.productCode,
					slipamount:data.slipAmount,
					policyno:data.policyNo,
					reciptno:data.receiptNo,
					locationname:data.locationName,
					depositebranchname:data.depositBranchName,
					depositeadditionalinfo:data.depositSlipAdditionalInformation,
					drawnownlocation:data.drawnOnLocation,
					drawanbank:data.drawnBank,
					drawnbranch:data.drawnBranch,
					drawername:data.drawerName,
					returnreson:data.returnReason,
					additionalinfo:data.additionalInformation,
					pickuppointcode:data.pickupPointCode,
					balance:data.balance,
					bankref:data.bankRef,
					terminalid:data.terminalId,
					applicationidmid:data.applicationNumberMid,
					arnnumber:data.arnNumber,
					userid:data.userId,
					adminid:data.adminId,
					utr:data.utr,
					merchant_txt:data.merchantTxn,
					csc_id:data.cscId,
					remark:data.remark,
					header:data.header,
					bsId:data.bsId

				})

				console.log("unprocess bank popup::",this.unprocesspopupdata)

				this.openunprocessbankpopup = true

			},

			closeunprocesspopupmethods(){

				this.openunprocessbankpopup = false
				this.showmorebsdata = false
				this.unprocesspopupdata = {}
				this.bsbtn = 'Show More'
				
			},
			closegcpopup(){
				this.gcpopupdata = {}
				this.showmoregcdata = false
				this.opengcpopup = false
			},
			opengcpopupmethods(data){
				console.log("Open GC POPUP::",data)
				this.gcpopupdata = data

				console.log("FULL POPUP DATA::::",this.gcpopupdata);

				this.opengcpopup = true
			},
			checkValidity(data) {
	                    // console.log('Validity Data', data);
	                    if (data == "" || data == "undefined" || data == null || data == '' || data == 'Invalid Date') {
	                        return "-"
	                    } else {
	                        return data;
	                    }
			},
			

		// 	GetAllFiltersData(bnkAccNo) {
		// 		var self = this;
		// 		self.showLoader('Loading', true);
		// 		console.log("batchID", self.resBatchId);
		// 		self.resBatchId = 0;
		// 		if (bnkAccNo == undefined || bnkAccNo == null) {
		// 			bnkAccNo = 0;
		// 		} else {
		// 			bnkAccNo = bnkAccNo;
		// 		}
		// 		console.log("bank Accc No ", bnkAccNo);
		// 		axios({
		// 			method: "post",
		// 			url:
		// 				this.API_Service_admin()+"/FilteringData/api/FilterData/getFilteringData",
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 				"cache-control": "no-cache",
		// 				"postman-token": "3f94caee-caf5-9868-c710-b9e10d4d886b",
		// 			},
		// 			data: {
		// 				UserId: 1,
		// 				// PageId: 1,
		// 				PageName:"dataImport",
		// 				BankAcNo: bnkAccNo,
		// 			},
		// 		})
		// 			.then(function (response) {
		// 				console.log("Filter APi Response>>>>>>", response);
						
		// 				if(!response.data.FilterDataForCommon || response.data.FilterDataForCommon.length == 0){
		// 					console.log("Array is either empty or does not exist")
		// 					self.showToast("No Data Found",self.TOST().WARNING);
		// 					self.showLoader('Loading', false);
		// 					return
		// 				}

		// 				self.FilteringApi=[];
		// 				self.FilteringApi = response.data.FilterDataForCommon;

		// 				self.bankList = [];
		// 				self.FilteringApi.map((bnk) => {
		// 					self.bankList.push({
		// 						BankName: bnk.BankName,
		// 						BankAcNo: bnk.BankAcNo,
		// 						HouseOfBank: bnk.HouseOfBank,
		// 						fullObj: bnk,
		// 					});
		// 				});
		// 				console.log("bankList Array", self.bankList);
		// 				self.bankList = Object.values(
		// 					self.bankList.reduce(
		// 						(acc, cur) =>
		// 							Object.assign(acc, { [cur.BankAcNo]: cur }),
		// 						{}
		// 					)
		// 				);
		// 				console.log(" Unique bankList's >>>", self.bankList);
		// 				self.selectbank(self.bankList[0]);
		// 				// this.fetchunprocessdata()

		// 				self.showLoader('Loading', false)
		// 			})
		// 			.catch(function (error) {
		// 			self.showLoader('Loading', false);
		// 				console.log("Filter APi Response>>>>>>", error);
		// 			});
		// },
		
		getcountdatafromapi(bnkAccNo){
				console.log("Bank Account Number::",bnkAccNo);
				var self = this;
				// self.showLoader('Loading', true);

				// self.resBatchId = 0;

				self.unprocessrecepitfromgccount = 0
				self.unprocessrececordfrombankcount = 0
				self.openrecepitfromgccount = 0
				self.openrececordfrombankcount = 0
				self.probablematchescount = 0
				self.closecasescount = 0

				if (bnkAccNo == undefined || bnkAccNo == null) {
					bnkAccNo = 0;
				} else {
					bnkAccNo = bnkAccNo;
				}
				console.log("bank Accc No ", bnkAccNo);
				axios({
					method: "post",
					url:
						this.API_Service_admin()+"/FilteringData/api/FilterData/getFilteringData",
					headers: {
						"Content-Type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "3f94caee-caf5-9868-c710-b9e10d4d886b",
					},
					data: {
						UserId: 1,
						// PageId: 1,
						PageName:"reconcile",
						BankAcNo: bnkAccNo,
						FromDate : moment( this.frmdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
						ToDate :  moment(this.toDte,'YYYY-MM-DD ').format('DD-MM-YYYY'),
					},
				})
					.then(function (response) {
						console.log("Count Filter APi Response>>>>>>", response);
						
						let getcountfromresponse = response.data.FilterDataReconcileCount[0]
						console.log("get count From API:::",getcountfromresponse);

						self.unprocessrecepitfromgccount = getcountfromresponse.unprocessedReceiptsGC
						self.unprocessrececordfrombankcount = getcountfromresponse.unprocessedRecordsBank
						self.openrecepitfromgccount = getcountfromresponse.openReceiptsGC
						self.openrececordfrombankcount = getcountfromresponse.openRecordsBank
						self.probablematchescount = getcountfromresponse.probableMatches
						self.closecasescount = getcountfromresponse.closedCases

					})
					.catch(function (error) {
					self.showLoader('Loading', false);
						console.log("Filter APi Response>>>>>>", error);
					});
		},

		
		
		// GetAllFiltersData(bnkAccNo) {
		// 		var self = this;
		// 		// self.showLoader('Loading', true);
		// 		console.log("batchID", self.resBatchId);
		// 		console.log("Bank FIlter::",self.$store.getters.getbankDetails)
		// 		self.FilteringApi=[];

		// 		self.FilteringApi = self.$store.getters.getbankDetails;

		// 		if(!self.FilteringApi || self.FilteringApi.length == 0){
		// 					console.log("Array is either empty or does not exist")
		// 					self.showToast("No Data Found",self.TOST().WARNING);
		// 					self.showLoader('Loading', false);
		// 					return
		// 		}
		// 		self.bankList = [];
		// 		self.FilteringApi.map((bnk) => {
		// 			self.bankList.push({
		// 				BankName: bnk.bankName,
		// 				BankAcNo: bnk.bankAcNo,
		// 				HouseOfBank: bnk.houseOfBank,
		// 				fullObj: bnk,
		// 			});
		// 		});
		// 		console.log("bankList Array", self.bankList);
				
		// 		self.bankList = Object.values(
		// 					self.bankList.reduce(
		// 						(acc, cur) =>
		// 							Object.assign(acc, { [cur.BankAcNo]: cur }),
		// 						{}
		// 					)
		// 		);
				
		// 		console.log(" Unique bankList's >>>", self.bankList);

		// 		self.selectbank(self.bankList[0]);
		// 		// this.fetchunprocessdata()

		// 		// self.showLoader('Loading', false)
		// },
		
		// New Function added for bank dropdown
		GetAllFiltersData(bnkAccNo) {
            var self = this;
            // self.showLoader('Loading', true);
            console.log("batchID", self.resBatchId);
            self.resBatchId = 0;
        
            self.FilteringApi=[];
            self.FilteringApi = this.$store.getters.getbankDetails;
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
		// End Here
			fetchunprocessdata(accnumber){
				console.log("accnumber selected>>>>>>", accnumber);
				var self = this;
				self.unprocesstable = []
				self.cgbankdata = []
				self.totoalpagelength = 0
				self.gcbankpagelength = 0
				self.showLoader('Loading', true);
					axios({
						method: "post",
						url:
							this.API_Service_admin()+"/ReconciliationAPI/api/Reconciliation/getUnprocessedData",
						headers: {
							"Content-Type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "a2485d4a-2726-8594-e93a-e93383034293",
						},
						data: {
							UserId: 1,
							PageName: "reconcile",
							BankAcNo: accnumber,
							FromDate : moment( this.frmdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
							ToDate :  moment(this.toDte,'YYYY-MM-DD ').format('DD-MM-YYYY'),
							BucketName : "unprocessed"	

						},
					})
                .then(function (response) {
					console.log("Unprocesss APi Response>>>>>>", response.data);
					
					if((!response.data.getUnprocessedBankDataResponseList || response.data.getUnprocessedBankDataResponseList.length == 0) && (!response.data.getUnprocessedGcDataResponseList || response.data.getUnprocessedGcDataResponseList.length == 0) ){
                        console.log("Array is either empty or does not exist")
						self.showLoader('Loading', false);
						self.showToast("No Records found for selected bank",self.TOST().WARNING);
						return
					}
					
					let bnkdt= false
					if (!response.data.getUnprocessedBankDataResponseList || response.data.getUnprocessedBankDataResponseList.length == 0 ){
						bnkdt= true
						// self.showToast("No Records found for selected bank",self.TOST().WARNING);
					}
					if(bnkdt=== false){
						self.unprocesstable = response.data.getUnprocessedBankDataResponseList
						self.totoalpagelength = response.data.bankRecordCount
						console.log("FILTER DATA Bank::",self.unprocesstable);
					}
					
					let gcdt= false
					if (!response.data.getUnprocessedGcDataResponseList || response.data.getUnprocessedGcDataResponseList.length == 0 ){
						gcdt= true
						// self.showToast("No Records found for selected bank",self.TOST().WARNING);
					}

					if(gcdt=== false){
						self.cgbankdata = response.data.getUnprocessedGcDataResponseList
						self.gcbankpagelength = response.data.gcRecordCount
						console.log("GC DATA Bank::",self.cgbankdata);
					}
					
					
					self.showLoader('Loading', false);
					// self.unprocesstable = []
					
					// if(response.data.getUnprocessedBankDataResponseList === null){

					// 	self.showToast("No Data Found",self.TOST().WARNING);
					// 	self.showLoader('Loading', false);
					// }else if(response.data.getUnprocessedGcDataResponseList === null){
					// 	self.showToast("No Data Found",self.TOST().WARNING);
					// 	self.showLoader('Loading', false);
					// }
					// 	self.showLoader('Loading', false);
					// let apiresponce = response.data.getUnprocessedBankDataResponseList
					// let gcapiresponse = response.data.getUnprocessedGcDataResponseList

					// self.totoalpagelength = response.data.bankRecordCount
					// self.gcbankpagelength = response.data.gcRecordCount

					// console.log("API RESPONSE:::::",apiresponce);
				
					// self.unprocesstable = apiresponce 

					// for(let i=0;i<apiresponce.length;i++){
					// 	let obj = {
					// 		createddate:self.checkValidity(apiresponce[i].date),
					// 		bankname:self.checkValidity(apiresponce[i].bankName),
					// 		bsid:self.checkValidity(apiresponce[i].bsId),
					// 		txttype:self.checkValidity(apiresponce[i].txnType),
					// 		amount:self.checkValidity(apiresponce[i].amount),
					// 		txtdate:self.checkValidity(apiresponce[i].processDate),
					// 		accountnumber:self.checkValidity(apiresponce[i].accountNumber),
					// 		bankrefrence:self.checkValidity(apiresponce[i].bankRef),
					// 		bankdc:self.checkValidity(apiresponce[i].dc),
					// 		paymentmode :self.checkValidity(apiresponce[i].paymentMode),
					// 		remark : self.checkValidity(apiresponce[i].remark),
					// 		terminalid : self.checkValidity(apiresponce[i].terminalID),
					// 		adminid:self.checkValidity(apiresponce[i].adminID),
					// 		autocode:self.checkValidity(apiresponce[i].authcode),
					// 		id:self.checkValidity(apiresponce[i].keyId)
					// 	}
					// 		self.unprocesstable.push(obj)
					// 		obj = {}
					// }
					
					// for(let k=0;k<gcapiresponse.length;k++){
					// 	let obj = {
					// 		createddate:self.checkValidity(gcapiresponse[k].CreatedOn),
					// 		reciptdate:self.checkValidity(gcapiresponse[k].ReceiptDate),
					// 		chequeno:self.checkValidity(gcapiresponse[k].ChequeNo),
					// 		amount:self.checkValidity(gcapiresponse[k].Amount),
					// 		txtdate:self.checkValidity(gcapiresponse[k].TxnDate),
					// 		solid:self.checkValidity(gcapiresponse[k].Sol_Id),
					// 		branchname:self.checkValidity(gcapiresponse[k].BranchName),
					// 		applicationnumber:self.checkValidity(gcapiresponse[k].ApplicationNo),
					// 		tagicid:self.checkValidity(gcapiresponse[k].TagicID),
					// 		custname:self.checkValidity(gcapiresponse[k].CustName),
					// 		prmamount:self.checkValidity(gcapiresponse[k].PRM_Amount),
					// 		productcode:self.checkValidity(gcapiresponse[k].ProductCode),
					// 		id:self.checkValidity(gcapiresponse[k].GcKeyId)
					// 	}
					// 		self.cgbankdata.push(obj)
					// 		obj = {}
					// }
						// self.cgbankdata = gcapiresponse 
						// console.log("FILTER DATA Bank::",self.unprocesstable);
						// console.log("GC DATA Bank::",self.cgbankdata);

					
                   
                })
                .catch(function (error) {
                    console.log("Unprocesss APi Response>>>>>>", error);
                });
			},

			fetchprobablematch(accnumber){
				console.log("OPEN CASE accnumber selected", accnumber);
				var self = this;

				self.finalprobabledata = []
					// self.showLoader('Loading', true);
					axios({
						method: "post",
						url:
							this.API_Service_admin()+"/ReconciliationAPI/api/Reconciliation/getUnprocessedData",
						headers: {
							"Content-Type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "d5de0753-6050-a9fd-8b04-609e185ed737",
						},
						data: {
							UserId: 1,
							PageName: "reconcile",
							BankAcNo: accnumber,
							FromDate : null,
							ToDate :  null,
							BucketName : "probableMatches"	

						},
					})
                .then(function (response) {
					console.log("Probable Match APi Response>>>>>>", response.data);

				

					let banksidedata = response.data.getUnprocessedBankDataResponseList;
					let gcsidedata = response.data.getUnprocessedGcDataResponseList;

					
					let _re_mapped_closedata = [];
					repetloop :
					for (let i = 0; i < banksidedata.length; i++) {
						for (let j = 0; j < gcsidedata.length; j++) {
								if (gcsidedata[j].probMatchTrCode === banksidedata[i].probMatchTrCode) {
									let re_create_object = Object.assign({}, gcsidedata[j]);
									re_create_object.probMatchTrCode = [banksidedata[i]]

									_re_mapped_closedata.push({
										"banksidedata":banksidedata[i],
										"GCsidedata" : gcsidedata[j],
										"probMatchTrCode":banksidedata[i].probMatchTrCode
									});
									continue repetloop;
								}
								
							}
						}
					
					console.log("GET MAPPED DATA:::",_re_mapped_closedata);
					self.finalprobabledata = []
					for(let k=0; k < _re_mapped_closedata.length; k++){
						if(_re_mapped_closedata[k].probMatchTrCode === null){

						}else{
							self.finalprobabledata.push(_re_mapped_closedata[k])
						}
					}
					// self.getcountdatafromapi(self.bankaccountnumber)
					console.log("Final Probablea data::",self.finalprobabledata);

					
			
                })
                .catch(function (error) {
                    console.log("Probable APi Response>>>>>>", error);
                });

			},

			fetchclosedata(accnumber){

				console.log("OPEN CASE accnumber selected", accnumber);
				var self = this;
				self.finalclosedata = []
				// self.showLoader('Loading', true);
					axios({
						method: "post",
						url:
							this.API_Service_admin()+"/ReconciliationAPI/api/Reconciliation/getUnprocessedData",
						headers: {
							"Content-Type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "d5de0753-6050-a9fd-8b04-609e185ed737",
						},
						data: {
							UserId: 1,
							PageName: "reconcile",
							BankAcNo: accnumber,
							FromDate : null,
							ToDate :  null,
							BucketName : "closed"	

						},
					})
                .then(function (response) {
					console.log("Close APi Response>>>>>>", response.data);


					let banksidedata = response.data.getUnprocessedBankDataResponseList;
					let gcsidedata = response.data.getUnprocessedGcDataResponseList;

					
					let _re_mapped_closedata = [];
					repetloop :
					for (let i = 0; i < banksidedata.length; i++) {
						for (let j = 0; j < gcsidedata.length; j++) {
								if (gcsidedata[j].knockOffTrCode === banksidedata[i].knockOffTrCode) {
									let re_create_object = Object.assign({}, gcsidedata[j]);
									re_create_object.knockOffTrCode = [banksidedata[i]]

									_re_mapped_closedata.push({
										"banksidedata":banksidedata[i],
										"GCsidedata" : gcsidedata[j],
										"knockOffTrCode":banksidedata[i].knockOffTrCode
									});
									continue repetloop;
								}
								// else{
								// 	let find = banksidedata.findIndex(e => gcsidedata[i].knockOffTrCode === e.knockOffTrCode);
								// 	let find_01 = _re_mapped_closedata.findIndex(e => e.knockOffTrCode === banksidedata[i].knockOffTrCode)

								// 	 if(find === -1 && find_01 === -1){
								// 		_re_mapped_closedata.push(false)
								// 	 } 
								// }
								
							}
						}
					
					console.log("GET MAPPED DATA:::",_re_mapped_closedata);
					self.finalclosedata = []
					for(let k=0; k < _re_mapped_closedata.length; k++){
						if(_re_mapped_closedata[k].knockOffTrCode === null){

						}else{
							self.finalclosedata.push(_re_mapped_closedata[k])
						}
					}

					self.closetotalcount = self.finalclosedata.length
					console.log("Final Close data::",self.finalclosedata);
					// Checking Initial Length for to be 15
	                        var less_enough = self.closetotalcount
	                        var checkless_init = false
	                        if(less_enough < 15){
	                            checkless_init = false
	                        }else{
	                            checkless_init = true
	                        }
	
	
	                        // // if less than 15 we have second value same as total value as no pagination will occur
	                        // if(checkless_init){
	                        //         // checkinit is true means the final count is more than 15
	                        //         var traverse = skip + 15
	                        //         self.fval = traverse - 14
	                        //         if(self.swap_final_count){
	                        //             self.sval =  self.closetotalcount
	
	                        //         }else{
	                        //             self.sval = traverse
	                        //         }
							// }else if(self.closetotalcount == 0){
                            
                           	// 	self.sval = self.fval = 0
                        
							// }else{
							// 		self.fval = 1
							// 		self.sval = self.closetotalcount
							// }

							// console.log("First Value of pagination::",self.fval);
							// console.log("Secand Value of pagination::",self.sval);
                })
                .catch(function (error) {
                    console.log("Unprocesss APi Response>>>>>>", error);
                });
			},
			opencasedata(accnumber){
				console.log("OPEN CASE accnumber selected", accnumber);

				var self = this;
				self.openbankrecordtable = []
				self.openreceiptrecordtable = []
			
				self.showLoader('Loading', true);
					axios({
						method: "post",
						url:
							this.API_Service_admin()+"/ReconciliationAPI/api/Reconciliation/getUnprocessedData",
						headers: {
							"Content-Type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "2179d28a-bef6-ed19-cec7-9784036be08",
						},
						data: {
							UserId: 1,
							PageName: "Reconciliation",
							BankAcNo: accnumber,
							FromDate : moment( this.frmdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
							ToDate :  moment(this.toDte,'YYYY-MM-DD ').format('DD-MM-YYYY'),
							BucketName : "open"	

						},
					})
                .then(function (response) {
					console.log("OPEN APi Response>>>>>>", response.data);
					
					


					if((!response.data.getUnprocessedBankDataResponseList || response.data.getUnprocessedBankDataResponseList.length == 0) && (!response.data.getUnprocessedGcDataResponseList || response.data.getUnprocessedGcDataResponseList.length == 0) ){
                        console.log("Array is either empty or does not exist")
						self.showLoader('Loading', false);
						self.showToast("No Records found for selected bank",self.TOST().WARNING);
						return
					}
					
					let bnkdt= false
					if (!response.data.getUnprocessedBankDataResponseList || response.data.getUnprocessedBankDataResponseList.length == 0 ){
						bnkdt= true
						// self.showToast("No Records found for selected bank",self.TOST().WARNING);
					}
					if(bnkdt=== false){
						self.openbankrecordtable = response.data.getUnprocessedBankDataResponseList
						self.totoalpagelength = response.data.bankRecordCount
						console.log("OPEN FILTER DATA Bank::",self.openbankrecordtable);
					}
					
					let gcdt= false
					if (!response.data.getUnprocessedGcDataResponseList || response.data.getUnprocessedGcDataResponseList.length == 0 ){
						gcdt= true
						// self.showToast("No Records found for selected bank",self.TOST().WARNING);
					}

					if(gcdt=== false){
						self.openreceiptrecordtable = response.data.getUnprocessedGcDataResponseList
						self.gcbankpagelength = response.data.gcRecordCount
						console.log("OPEN GC DATA Bank::",self.openreceiptrecordtable);
					}
					
					self.getcountdatafromapi(self.bankaccountnumber)
					self.showLoader('Loading', false);
					
                })
                .catch(function (error) {
                    console.log("Unprocesss APi Response>>>>>>", error);
                });
			},


			selectbank(houseOfBank,accno,bnknme,transectiondate){
			console.log("SELECTED DATA::", houseOfBank,accno,bnknme,transectiondate);
			

            this.search=""
            this.nameofbank = houseOfBank;
            this.bankaccountnumber = accno;
			this.subbnknme=bnknme
			this.TrnsatinStrtDte= transectiondate
			this.getImgUrl(this.nameofbank);
			this.putDate()
			// this.fetchunprocessdata(data.BankAcNo)
			// this.getcountdatafromapi(this.bankaccountnumber)
            this.strtImport=false;
            this.imprtDtaBtnNme = "Import New Data";
            this.resBatchId = 0;
			},
			on(){

			},

			putDate(){
			this.truevalidate = false
            this.validation =""
			console.log(this.TrnsatinStrtDte,"TrnsatinStrtDte")

			let todayDate = Date.now();
            todayDate = moment(todayDate).format("DD-MM-YYYY");
			this.toDte = moment(this.TrnsatinStrtDte,'DD/MM/YYYY').format('YYYY-MM-DD');

			let new_frmdate =moment(this.TrnsatinStrtDte,'DD/MM/YYYY').subtract(2, "days");
			console.log("From date", new_frmdate);
			let nextdate = moment(new_frmdate).format("DD-MM-YYYY");
			console.log("nextdate", nextdate);
			this.frmdate = moment(nextdate,'DD/MM/YYYY').format('YYYY-MM-DD');
			
			if(this.frmdate === 'Invalid date'){
				this.frmdate = ''
			}

			if(this.toDte === 'Invalid date'){
				this.toDte = ''
			}
			this.fetchunprocessdata(this.bankaccountnumber)
			this.opencasedata(this.bankaccountnumber)
			this.fetchclosedata(this.bankaccountnumber)
			this.fetchprobablematch(this.bankaccountnumber)
			this.dtsChgnd = false
			this.updteRcntblFlg=false
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

			channelfilters(){
				console.log("Value::",this.filterdata);
				let obj = {
					bankfilter:this.filterdata
				}
				this.banksfilter.push(obj)

				console.log("Bank data::",this.banksfilter)
				// this.banksfilter
			},

			removechip(index){
				console.log("INDEX::",index)
				this.banksfilter.pop(index)

			},
			opendropdown(){
				this.showdropdown = true
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
				return `${month}/${day}/${year}`
			},
			validAge(date){
				this.calender = false
				console.log("date",date)
				this.fromDate = moment(date).format('MM-DD-YYYY')

				let fromeDate =moment(date).valueOf()
				let CurrentDate=moment(Date.now()).valueOf()
				if(fromeDate > CurrentDate){
					this.truevalidatefrom = true
					this.validationfrom = "Cannot select future Date"
					console.log("Im Greate than current Date")
				}else{
					this.truevalidatefrom = false
					this.validationfrom =""
				}
				// this.validAgeto(this.Dateto)
        	},
        
        	validAgeto(date){
				this.calenderto = false;
				this.Dateto = moment(date).format('MM-DD-YYYY');

				let fromeDate =moment(this.fromDate).valueOf()
				let CurrentDate=moment(Date.now()).valueOf()
				let Todate =moment(date).valueOf()

				console.log("From Date:",fromeDate,moment(fromeDate).format('DD-MM-YYYY'), "||" , "Current Date:",CurrentDate ,moment(CurrentDate).format('DD-MM-YYYY'),"||", "To Date",Todate,moment(Todate).format('DD-MM-YYYY'))
				// if(Todate > CurrentDate){
				//     this.truevalidate = true
				//     this.validation = "Cannot select future Date"
				//     console.log("Im Greate than current Date")
				// }else if (Todate < fromeDate){
				//     this.truevalidate = true
				//     this.validation ="Can't  be less than From date"
				//     console.log("Im Lower than To Date")
				// }else{
				//     this.truevalidate = false
				//     this.validation =""
				// }
			},

			validtransec(date){
				console.log('transection date',date)
				this.calendartransection = false;
				this.transectiondate = moment(date).format('MM-DD-YYYY');

				let fromeDate =moment(this.fromDate).valueOf()
				let CurrentDate=moment(Date.now()).valueOf()
				let Todate =moment(date).valueOf()

				// console.log("From Date:",fromeDate,moment(fromeDate).format('DD-MM-YYYY'), "||" , "Current Date:",CurrentDate ,moment(CurrentDate).format('DD-MM-YYYY'),"||", "To Date",Todate,moment(Todate).format('DD-MM-YYYY'))
				// if(Todate > CurrentDate){
				//     this.truevalidate = true
				//     this.validation = "Cannot select future Date"
				//     console.log("Im Greate than current Date")
				// }else if (Todate < fromeDate){
				//     this.truevalidate = true
				//     this.validation ="Can't  be less than From date"
				//     console.log("Im Lower than To Date")
				// }else{
				//     this.truevalidate = false
				//     this.validation =""
				// }
			},

				probableforcematchapitrigger(){
					console.log("Probable Force Match api ")

					let self = this

					if(self.probableforcematch.length === 0){
						self.showToast( "Please Select at least one record from Bank & Gc side" , self.TOST().ERROR);

						return
					}else{


						axios({
							method: "post",
							url:
								self.API_Service_admin()+"/ManualReconAPI/api/forceMatch/ForcedMatchMethod",
							headers: {
								"Content-Type": "application/json",
								"cache-control": "no-cache",
								"postman-token": "56c9e727-0b72-7a01-94f4-8d05fd3f49ba",
							},
							data: {
								UserId: 1,
								PageName: "reconcile",
								SessionID: 1,
        						BankAcNo : self.bankaccountnumber,
								ForcedMatchTransactionList : self.probableforcematch

							},
						})
						.then(function (response) {
							console.log("Start Force Response>>>>>>", response.data);
							
							if(response.data[0].Status === 'fail'){
								console.log("CHECK STATUS::",response.data[0].Status)
								self.showToast( response.data[0].Message , self.TOST().ERROR);
							
							}else{
								self.showToast( "Manual Reconciliation Success" , self.TOST().SUCCESS);
								self.probableforcematch	 = []
								
								self.fetchprobablematch(self.bankaccountnumber)



							}
						})
						.catch(function (error) {
							console.log("FORCE MATCH APi Response>>>>>>", error);
						});
					}

				},

				forcematchapitrigger(){
					
					console.log("FORCE MATCH API HITTING")

					
					let self = this
					
					if(opengcsidetable.length === 0 || openbanksidetable.length === 0){
						self.showToast( "Please Select at least one record from Bank & Gc side" , self.TOST().ERROR);

						return
					}else{

						if(opengcsidetable.length === 1 || opengcsidetable.length < 1){
						console.log("GC Table less data")

						for(let i=0;i<opengcsidetable.length;i++){
							for(let j=0;j<openbanksidetable.length;j++){
								if(openbanksidetable[j].GcTransactionId === null){
									console.log("FOUND NULL VALUE")
									openbanksidetable[j].GcTransactionId = opengcsidetable[i].GcTransactionId
								}
							}
						}

						self.startforcedata.push(openbanksidetable)

						openbanksidetable = []

						}else{
							console.log("Bank Table less data")

							for(let i=0; i<openbanksidetable.length;i++){
								for(let j=0; j<opengcsidetable.length;j++){
									if(opengcsidetable[j].BankTransactionId === null){
										opengcsidetable[j].BankTransactionId = openbanksidetable[i].BankTransactionId
									}
								}
							}

							self.startforcedata.push(opengcsidetable)

							opengcsidetable = []



						}
					}

					

					console.log("check Bank Side Object Length",openbanksidetable)
					console.log("check GC side array lenght",opengcsidetable)

					console.log("Final Structure Array Form::",self.startforcedata);


					
					axios({
							method: "post",
							url:
								self.API_Service_admin()+"/ManualReconAPI/api/forceMatch/ForcedMatchMethod",
							headers: {
								"Content-Type": "application/json",
								"cache-control": "no-cache",
								"postman-token": "56c9e727-0b72-7a01-94f4-8d05fd3f49ba",
							},
							data: {
								UserId: 1,
								PageName: "reconcile",
								SessionID: 1,
        						BankAcNo : self.bankaccountnumber,
								ForcedMatchTransactionList : self.startforcedata[0]

							},
						})
					.then(function (response) {
						console.log("Start Force Response>>>>>>", response.data);
						
						if(response.data[0].Status === 'fail'){
							console.log("CHECK STATUS::",response.data[0].Status)
							self.showToast( response.data[0].Message , self.TOST().ERROR);
							// this.showToast("Please Select Proper Date's",this.TOST().WARNING);
						}else{
							self.showToast( "Manual Reconciliation Success" , self.TOST().SUCCESS);
							self.startforcedata = []
							self.opencasedata(self.bankaccountnumber)

						}
					})
					.catch(function (error) {
						console.log("FORCE MATCH APi Response>>>>>>", error);
					});
				},
			
				forcebutton(){
					console.log("HIT:::")
					// this.forcematch = !this.forcematch
					// if(this.forcematch === true){
						this.btnname = 'Start Force Match'
						this.showcheckbox = false

						if(this.showprobable === false){
							this.probableforcematchapitrigger()
						}else{
							this.forcematchapitrigger()
						}


						
					// }else{
						// this.btnname = 'Force Match'
						// // this.dialog = true
						// this.showcheckbox = true
						// this.getcountdatafromapi(this.bankaccountnumber)
						// this.forcematchapitrigger()
					// }
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

				showprobabledata(){
					this.showprobable = false
					this.showunprocess = false
					this.showclose = false
					
					this.shwFrcMtchBtn=true,
					this.shwRcnBtn=false
					this.opencase = false

					this.fetchprobablematch(this.bankaccountnumber)
				},

				showclosedata(){
					this.showunprocess = false
					this.showprobable = true
					this.showclose = true
					this.opencase = false
					this.fetchclosedata(this.bankaccountnumber)

				},

				hideprobablematch(){
					this.showunprocess = true
					this.showprobable = true
					this.showclose = false
					this.shwFrcMtchBtn=false
					this.shwRcnBtn=true
					this.opencase = false
					this.fetchunprocessdata(this.bankaccountnumber)
				},

				showopensection(){
					this.opencase = true
					this.showunprocess = false
					this.showclose = false
					this.showprobable = true
					this.shwFrcMtchBtn=true,
					this.shwRcnBtn=false
					this.opencasedata(this.bankaccountnumber)
				},
				
				strtRecon(){

					let self=this
					self.showLoader('Loading', true);
					axios({
						method: "post",
						url:
							this.API_Service_admin()+"/AutoReconAPI/api/AutoReconEngine/RunAutoRecon",
						headers: {
							"Content-Type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "dafd8027-b99a-6076-1b20-0b7b37b8780f",
						},
						data: {
							UserId: 1,
							SessionID: 1,
							PageName:"AutoRecon",
							BankAcNo: this.bankaccountnumber,
						},
					})
					.then(function (response) {
						console.log("Auto Recon APi Response>>>>>>", response);
						console.log("Auto Recon APi Response>>>>>>", response);

						self.autoRcnRspns={}
						self.autoRcnRspns=response.data
						console.log("Auto Recon APi Response>>>>>>", self.autoRcnRspns);
						self.strtReconDilg=true
						self.showLoader('Loading', false);
						
						// self.getcountdatafromapi(self.bankaccountnumber)
					})
					.catch(function (error) {
						console.log("Auto Recon Response>>>>>>", error);
					});
					
				},
				
				close_Rcn(){
					this.strtReconDilg=false
				},
				expandtable(index){
					console.log("INDEX:::",index)
						this.expanded[index] = this.expanded[index]
					//   
				},

				// tableCheck(id,index){
				// 	console.log("ID AND INDEX::",id,index)
				// },

				resetbutton(){
					this.dialog = true
				},

				bsIdFltr(){
					if(this.srchBsId!==null && this.srchBsId!==undefined && this.srchBsId!=='' ){
						this.bsArr.push(this.srchBsId)
					}
					this.srchBsId=''
				},
				
				dlt_bsIdFltr(id){
					this.bsArr.splice(this.bsArr.indexOf(id), 1)
        			this.bsArr = [...this.bsArr]	
				},

				solIdFltr(){
					if(this.srchsolId!==null && this.srchsolId!==undefined && this.srchsolId!=='' ){
						this.solIdArr.push(this.srchsolId)
					}
					this.srchsolId=''
				},

				dlt_solIdFltr(id){
					this.solIdArr.splice(this.solIdArr.indexOf(id), 1)
        			this.solIdArr = [...this.solIdArr]	
				},
				
				brnchNmeFltr(){
					if(this.brnchNme!==null && this.brnchNme!==undefined && this.brnchNme!=='' ){
						this.brnchNmeArr.push(this.brnchNme)
					}
					this.brnchNme=''
				},

				dlt_brnchNmeFltr(id){
					this.brnchNmeArr.splice(this.brnchNmeArr.indexOf(id), 1)
        			this.brnchNmeArr = [...this.brnchNmeArr]	
				},
				
				aplcnNoFltr(){
					if(this.aplcnNo!==null && this.aplcnNo!==undefined && this.aplcnNo!=='' ){
						this.aplcnNoArr.push(this.aplcnNo)
					}
					this.aplcnNo=''
				},

				dlt_aplcnNoFltr(id){
					this.aplcnNoArr.splice(this.aplcnNoArr.indexOf(id), 1)
        			this.aplcnNoArr = [...this.aplcnNoArr]	
				},

				tgcIdFltr(){
					if(this.tgcId!==null && this.tgcId!==undefined && this.tgcId!=='' ){
						this.tgcIdArr.push(this.tgcId)
					}
					this.tgcId=''
				},

				dlt_tgcIdFltr(id){
					this.tgcIdArr.splice(this.tgcIdArr.indexOf(id), 1)
        			this.tgcIdArr = [...this.tgcIdArr]	
				},
				
				custNameFltr(){
					if(this.custName!==null && this.custName!==undefined && this.custName!=='' ){
						this.custNameArr.push(this.custName)
					}
					this.custName=''
				},

				dlt_custNameFltr(id){
					this.custNameArr.splice(this.custNameArr.indexOf(id), 1)
        			this.custNameArr = [...this.custNameArr]	
				},
				
				prmAmtFltr(){
					if(this.prmAmt!==null && this.prmAmt!==undefined && this.prmAmt!=='' ){
						this.prmAmtArr.push(this.prmAmt)
					}
					this.prmAmt=''
				},

				dlt_prmAmtFltr(id){
					this.prmAmtArr.splice(this.prmAmtArr.indexOf(id), 1)
        			this.prmAmtArr = [...this.prmAmtArr]	
				},
				
				pdtCdeFltr(){
					if(this.pdtCde!==null && this.pdtCde!==undefined && this.pdtCde!=='' ){
						this.pdtCdeArr.push(this.pdtCde)
					}
					this.pdtCde=''
				},

				dlt_pdtCdeFltr(id){
					this.pdtCdeArr.splice(this.pdtCdeArr.indexOf(id), 1)
        			this.pdtCdeArr = [...this.pdtCdeArr]	
				},
				
				rstRrFltr(){
					this.checkboxselected=''
					this.radios='Both'
					this.bsArr=[]
					this.srchBsId=''
					this.amtFltr=''
					this.solIdArr=[]
					this.srchsolId=''
					this.brnchNmeArr=[]
					this.brnchNme=''
					this.aplcnNoArr=[]
					this.aplcnNo=''
					this.tgcIdArr=[]
					this.tgcId=''
					this.custNameArr=[]
					this.custName=''
					this.prmAmtArr=[]
					this.prmAmt=''
					this.pdtCdeArr=[]
					this.pdtCde=''
				}
	        

        }
        }
</script>
<style>

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

.cust-bnk-tile .v-list__tile{
    padding-left:0px !important;
}
.v-label {
    font-size: 14px;
    line-height: 1;
    min-height: 8px;
    transition: .3s cubic-bezier(.25,.8,.5,1);
}
.showmorecolor{
	background-color: #23B1A9;
}

.showlesscolor{
	background-color: #E46A25;
}
.showmorebutton{
	/* background-color: #23B1A9; */
	padding: 10px;
	justify-content: center;
	align-items: center;
	display: flex;
}
.card_shadow{
	box-shadow:0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
}
.filtericon{
	height: 20px;
	width: 20px;
}
.filterbox{
	background-color: #23B1A9;
}

.applybox{
	background-color:#E46A25;
}

.clearallbox{
	background-color: #F7F7F7;
}
.cust-Dm-pgn .v-pagination__navigation {
    box-shadow: unset !important;
    border-radius: unset !important;
    background-color: #ffffff !important;
    border: 1px solid #dae1e6 !important;
}

.cust-Dm-pgn .v-pagination__navigation--disabled {
    background-color: #dae1e6 !important;
}

.cust-Dm-pgn .v-pagination__item {
    box-shadow: unset !important;
    min-width: 2rem !important;
    height: 2rem !important;
    border-radius: unset !important;
    border: 1px solid #dae1e6 !important;
}
.backdropdown{
	background: #ffffff;
	/* border-color: #C1C8CC;
	border-style: solid;
	border-width: 1px; */
	height: 67px;
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

.date-validation{
    color: red;
    display: flex;
    position: relative;
    bottom: 22px;
    font-size:12px
}

.bandkdivcust{
	padding: 5px;
    border-top-color: #ffffff;
    border-right-color: #C1C8CC;
    border-bottom-color: #ffffff;
    border-left-color: #C1C8CC;
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
.bottombox{
	background-color:#ffffff;
	border-top-color: #C1C8CC;
	border-bottom-color: #ffffff;
	border-right-color: #C1C8CC;
	border-left-color: #C1C8CC;
	/* border-color:#C1C8CC; */
	border-style:solid;
	border-width:1px;

}
.cust-audlog .sel{

width: 335px;
height: 37px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 2px 2px #00000051;
border: 0.5px solid #C1C8CC;
opacity: 1;

}

.cust-bank{

width: 335px;
height: 35px;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 2px 2px #00000051;
border: 0.5px solid #C1C8CC;
opacity: 1;

}
.addfilterchip{
	   min-width: 100px;
	   justify-content: center;
	   align-items: center;
	   height: 25px;
	   padding: 2px;
	   
	   border-color: #C1C8CC;
	   border-style: solid;
	   border-width: 1px;
	   border-radius: 25px;
	   cursor: pointer;
}

.filterchip{
	   width: 110px;
	   justify-content: center;
	   align-items: center;
	   height: 25px;
	   padding: 5px;
	   /* background-color: #23B1A9; */
	   border-color: #C1C8CC;
	   border-style: solid;
	   border-width: 1px;
	   border-radius: 25px;
	   cursor: pointer;
}

.colorfilterchip{
	   /* min-width: 130px; */
	   width: 130px;
	   justify-content: center;
	   align-items: center;
	   height: 25px;
	   padding: 5px;
	   background-color: #23B1A9;
	   border-color: #C1C8CC;
	   border-style: solid;
	   border-width: 1px;
	   border-radius: 25px;
	   cursor: pointer;
}

.solidfilterchip{
	   /* min-width: 130px; */
	   /* width: 130px; */
	   justify-content: center;
	   align-items: center;
	   height: 25px;
	   padding: 5px;
	   background-color: #23B1A9;
	   border-color: #C1C8CC;
	   border-style: solid;
	   border-width: 1px;
	   border-radius: 25px;
	   cursor: pointer;
}
.recon-tbl table.v-table thead th{
		border-right:0.5px solid  #C1C8CC !important;
        background-color:#F7F7F7 !important;
        color:#10242B !important;
        font-family:Roboto !important;
        font-weight:700 !important;
        /* border-right:1px solid  #C1C8CC !important; */
        /* background-color:#F7F7F7 !important;
        color:#10242B !important;
        font-family:Roboto !important;
        font-weight:700 !important; */
    }
.recon-tbl .v-table__overflow{
	overflow-x:unset !important;
	overflow-y:unset !important;
}

/* .recon-tbl table.v-table thead tr:first-child{
    height: 40px !important;;
} */
.recon-tbl table.v-table tbody td,
.recon-tbl table.v-table thead tr{
        height: 40px !important;
    }
.recon-tbl table.v-table thead tr:last-child{
         height: unset !important;
}

.recon-td-bdrgt {
        border-right:1px solid #C1C8CC;
    }


.cntalign{
	justify-content: center!important;
	align-items: center!important;
}
.forceflex{
	flex: 1!important;
}
.bluebackground{
	background-color: #23B1A9!important;
	color: #FFFFFF!important;
}

.redbackground{
	background-color: #E46A25!important;
	color: #FFFFFF!important;
}
.forchealign{
	justify-content: center !important;
	align-items: center !important;;
}
.checkboxone{
    padding: 10px !important;
    padding-top: 12px !important;
}
.v-input--selection-controls{
	margin-top: 20px;
    margin-left: 35px;
}
.cardborder{
	border-top-color: #C1C8CC;
	border-bottom-color: #C1C8CC;
	border-right-color: #C1C8CC;
	border-left-color: #C1C8CC;
	border-style: solid;
	border-width: 1px;
}
.showmoreview{
	background-color:#FEF9F6 ;
	padding: 15px;
}
.cursorpointter{
	cursor: pointer;
}
.showmorefnt{
	color: #23B1A9;
}
	/* .row{
	    display:grid;
		grid-template-columns: repeat(auto-fit,minmax(64px,auto));
	} */
	/* .row {
    display: block;
	} */

	.reconRle-di .v-text-field.v-text-field--solo .v-input__control{
		min-height: 38px;
	}

	

	.hieghtbox{
		min-height: 20px!important;;
	}
	.headingcolm{
		margin-top: 10px;
		/* padding: 10px; */
		border-top-color: #C1C8CC;
		border-bottom-color: #C1C8CC;
		border-right-color: #C1C8CC;
		border-left-color: #C1C8CC;
		border-style: solid;
		border-width: 1px;
		display: flex;
		flex: 1;
		margin-right: 15px;
	}

	.headingrightcolm{
		margin-top: 10px;
		/* padding: 10px; */
		border-top-color: #C1C8CC;
		border-bottom-color: #C1C8CC;
		border-right-color: #C1C8CC;
		border-left-color: #C1C8CC;
		border-style: solid;
		border-width: 1px;
		display: flex;
		flex: 1;
	}

	.probablematch{
		
		margin:15px;
		padding: 10px;
		border-top-color: #C1C8CC;
		border-bottom-color: #C1C8CC;
		border-right-color: #C1C8CC;
		border-left-color: #C1C8CC;
		background-color: #F7F7F7;
		border-style: solid;
		border-width: 1px;
		display: flex;
		flex: 1;
	}
    .headercolom{
        background-color: #F7F7F7;
        padding: 10;
    }
	.thebtn {
	        display: flex;
	        align-items: center;
	        color: white;
	        border-radius: 5px;
	        font-size: 15px;
	    }

	    .thebtn2policy {
	        display: flex;
	        align-items: center;
	        justify-content: center;
	        color: white;
	        font-size: 12px;
	    }

	    .wrapper-card {
	        flex-direction: row;
	        flex-wrap: wrap
	    }

	    .btn-size {
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
	        background-color: #1976d2;
	        flex-direction: row;
	        justify-content: center;
	        align-items: center;
	        border-radius: 4px;
	        /* height: 10px; */
	    }

	    .fileContainer-bulk [type=file] {
	        cursor: pointer;
	    }

	    .aloc-btn {
	        display: flex;
	        width: 230px;
	        flex-direction: row;
	    }
		.rcn-hdr{
        color:#10242B; 
        font-family:roboto; 
        font-weight:700

    }

	    @media screen and (min-width: 320px) {
	        .margin-t30 {
	            margin-top: 30px;
	        }
	        .upload-text {
	            font-size: 14px;
	            color: #FDFEFF;
	            font-weight: 500
	        }
	        .fileContainer-bulk {
	            width: 155px;
	            display: inline-flex;
	            border-radius: 2px;
	            margin-top: 6px;
	            height: 37px;
	            position: relative;
	            cursor: pointer;
	        }
	    }
</style>