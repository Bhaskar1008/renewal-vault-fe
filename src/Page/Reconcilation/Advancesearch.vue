<template>
    <v-app>
        <v-card class="ma-3">
			<v-layout class="cardwhitebackclr pa-2" align-center style="">
                <div class="mr-2">
                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Search Within</v-text>
                </div>

                <!-- <v-flex class="verticle-line"></v-flex> -->
                <v-divider  class="mr-2" vertical ></v-divider>

                <div  class="tabsboxactive" :class="[showbbid == true ? 'vx-tab-active' : 're-set-tab']" style="display:flex;justify-content:center;align-items:center;" @click="searchtabsswitch('bbid')">
                    <v-text class="caption font-weight-bold" :class="[showbbid == true ? 'vx-activ-fnt' : 'vx-inactive-fnt']" >GC ID</v-text>
                </div>
                <div class="tabsboxinactive" :class="[showbsid == true ? 'vx-tab-active' : 're-set-tab']" style="display:flex;justify-content:center;align-items:center;" @click="searchtabsswitch('bsid')">
                    <v-text class="caption font-weight-bold" :class="[showbsid == true ? 'vx-activ-fnt' : 'vx-inactive-fnt']">BS ID</v-text>
                </div>
                <div class="tabsboxinactive mr-3" :class="[bothside == true ? 'vx-tab-active' : 're-set-tab']" style="display:flex;justify-content:center;align-items:center;" @click="searchtabsswitch('both')">
                    <v-text class="caption font-weight-bold" :class="[bothside == true ? 'vx-activ-fnt' : 'vx-inactive-fnt']">Both Side</v-text>
                </div>

                <!-- <v-flex xs10 sm6 md2 class="cust-audlog reconRle-di">
                    <v-flex class="sel">
                        <v-menu
                            ref="calender"
                            :close-on-content-click="false"
                            v-model="Tocalender"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px" >
                
                            <v-text-field
                                slot="activator"
                                :value="computedToDateFormattedMomentjs"
                                prepend-inner-icon="event"
                                label="Financial Year 2021"
                                :hide-details = "true"
                                solo
                                readonly
                            ></v-text-field>
                            <v-date-picker
                                v-model="toDte"
                                @change="chngToDate"
                                no-title
                            ></v-date-picker>
                        </v-menu>
                        <p class="date-validation" v-if="truevalidate=== true" >{{validation}}</p>
                    </v-flex>
				</v-flex> -->

                <v-flex class="pa-1 py-2">
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

                    </v-layout>
				</v-flex>
			</v-layout>

            <v-divider class="mt-2 mb-2"></v-divider>
            
            <v-layout class="pa-2" xs12 row wrap>
                <v-flex xs6>
                    <v-layout>
                        <v-flex style="mr-2" class="mr-2">
                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Account Number</p>
                            <v-text-field
                                solo 
                                v-model="accountnumber"
                                :hide-details = "true"
                                append-icon="search"
                                label="Search..."
                            ></v-text-field>
                        </v-flex>

                        <v-flex  class="mr-2">
                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Payment Mode</p>
                           
                            <v-autocomplete 
                                :items="Trstype" 
                                solo 
                                label="Select"
                                v-model="paymentmode"
                                attach
                                item-text="PaymentModeName"
                                item-value="payModeId"
                                @change=" checkpaymentmode(paymentmode)"
                            ></v-autocomplete >
                        </v-flex>
                       

                        
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <v-layout row wrap>
                    <!-- <v-flex xs6> -->
                       
                        <v-flex  class="mr-4">
                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Amount</p>
                            <v-text-field
                                solo 
                                v-model="amount"
                                :hide-details = "true"
                                label="Enter"
                                
                            ></v-text-field>
                
                        </v-flex>

                        <v-flex  class="mr-2">
                            <v-layout align-center>
                                <v-radio-group v-model="radios" :mandatory="false" :height="20" row>
                                    <v-flex class="mr-2" align-center>
                                    <p class="body-1" style="color:#646666;font-family:roboto;font-weight:700">Less then()</p>
                                    <v-radio class="caption " value="L"></v-radio>
                                    </v-flex>

                                    <v-flex class="mr-2" align-center>
                                    <p class="body-1" style="color:#646666;font-family:roboto;font-weight:700">More than( > )</p>
                                    <v-radio class="caption " value="M"></v-radio>
                                    </v-flex>

                                    <v-flex class="" align-center>
                                    <p class="body-1" style="color:#646666;font-family:roboto;font-weight:700">Equal to( = )</p>
                                    <v-radio class="caption " value="E"></v-radio>
                                    </v-flex>
                                </v-radio-group>  
                            </v-layout>
                        <!-- </v-flex> -->
                       
                    </v-flex>
                      
                    </v-layout>
                </v-flex>
            </v-layout>
    
        <v-layout class="darkbox pa-2 " align-center xs12 row wrap style="">

            <v-flex xs6>
                <v-layout>
                    

                    
                   
        
                </v-layout>
                	
            </v-flex>
            <v-flex xs6>
                <v-layout>
                    <!-- <v-flex row style="flex:1">
                        <v-layout>
                            <div v-for="(item, index) in amountarray" :key="index">
                                <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                    <v-flex>
                                        <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.amount}}</p>
                                    </v-flex>
                                    <div class="" @click="removechequedata(index)">
                                        <v-icon style="color:#fff" >close</v-icon>						
                                    </div>
                                </div>
                            </div>
                        </v-layout>
                    </v-flex> -->
                </v-layout>
                 
            </v-flex>
        </v-layout>
        <v-layout class="cardwhitebackclr pa-2" xs12 row wrap>
                <v-flex xs6>
                    <v-layout>
                        <v-flex class="mr-2">
                        <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Receipt No.</p>
                            <v-text-field
                                solo 
                                v-model="receiptno"
                                label="Search..."
                                :hide-details = "true"
                                append-icon="search"
                                @click:append="selectreciptnumber"
                                ></v-text-field>
                    
                        </v-flex>

                         <v-flex class="mr-2">
                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Customer Name.</p>
                                <v-text-field
                                    solo 
                                    v-model="customername"
                                    label="Search..."
                                    append-icon="search"
                                    :hide-details = "true"
                                    @click:append="selectcustomname"
                                    ></v-text-field>
                        
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <v-layout row wrap>
                        
                        <v-flex class="mr-2">
                        <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">GC ID</p>
                            <v-text-field
                                solo 
                                v-model="bbid"
                                label="Search..."
                                :hide-details = "true"
                                append-icon="search"
                                @click:append="selectbbid"
                                ></v-text-field>
                    
                        </v-flex>

                        <v-flex class="mr-2">
                        <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">BS ID</p>
                            <v-text-field
                                solo 
                                v-model="bsid"
                                label="Search..."
                                :hide-details = "true"
                                append-icon="search"
                                @click:append="selectbsid"
                                ></v-text-field>
                    
                        </v-flex>

                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout class="darkbox pa-2 " align-center xs12 row wrap style="">

            <v-flex xs6>
                <v-layout>

                    <v-flex row style="flex:1">
                        <v-layout>
                            <div v-for="(item, index) in reciptarray" :key="index">
                                <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                    <v-flex>
                                        <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.receiptNo}}</p>
                                    </v-flex>
                                    <div class="" @click="removereciptdata(item.receiptNo,index)">
                                        <v-icon style="color:#fff" >close</v-icon>						
                                    </div>
                                </div>
                            </div>
                        </v-layout>
                    </v-flex>

                    <v-flex row style="flex:1">
                            <v-layout>
                                <div v-for="(item, index) in customernamearray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.customerName}}</p>
                                        </v-flex>
                                        <div class="" @click="removencustomernamedata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                    </v-flex>

                    <!-- <v-flex row style="flex:1">
                            <v-layout>
                                <div v-for="(item, index) in accountnumberarray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.accountnumber}}</p>
                                        </v-flex>
                                        <div class="" @click="removeaccountnumberdata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                    </v-flex> -->
                </v-layout>
            </v-flex>
            <v-flex xs6>
                <v-layout>
                    <v-flex row style="flex:1">
                        <v-layout>
                            <div v-for="(item, index) in bbidarray" :key="index">
                                <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                    <v-flex>
                                        <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.bbId}}</p>
                                    </v-flex>
                                    <div class="" @click="removebbiddata(index)">
                                        <v-icon style="color:#fff" >close</v-icon>						
                                    </div>
                                </div>
                            </div>
                        </v-layout>
                    </v-flex>

                    <v-flex row style="flex:1">
                            <v-layout>
                                <div v-for="(item, index) in bsidarray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.bsId}}</p>
                                        </v-flex>
                                        <div class="" @click="removebsdata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                        </v-flex>
                </v-layout>
                 
            </v-flex>
        </v-layout>
            <v-layout v-if="showmorehide" class="cardwhitebackclr pa-2" xs12 row wrap>
                <v-flex xs6>
                    <v-layout>
                        
                        <v-flex class="mr-2">
                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Recon ID</p>
                                <v-text-field
                                    solo 
                                    v-model="reconid"
                                    label="Search..."
                                    append-icon="search"
                                    :hide-details = "true"
                                    @click:append="selectreconid"
                                    ></v-text-field>
                        
                        </v-flex>

                        <v-flex  class="mr-2">
                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Auth Code</p>
                            <v-text-field
                                solo 
                                v-model="authcode"
                                :hide-details = "true"
                                append-icon="search"
                                label="Search..."
                                @click:append="selectauthocode"
                            ></v-text-field>
                        </v-flex>

                        
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <v-layout row wrap>
                    
                        <!-- OLD PAYMENT MODE -->

                      

                           <v-flex  class="mr-2">
                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Payment Status</p>
                            <!-- <v-text-field
                                solo 
                                v-model="paymentstatus"
                                :hide-details = "true"
                                append-icon="search"
                                label="Search..."
                                @click:append="selectpaymentstatus"
                            ></v-text-field> -->
                            <v-autocomplete 
                                    :items="paymentstaus" 
                                    solo 
                                    label="Select"
                                    v-model="paymentstatus"
                                    attach
                                    item-text="PaymentStatusName"
                                    item-value="PaymentStatusId"
                                    @change=" selectedpaymetstats(paymentstatus)"
                            ></v-autocomplete >
                        </v-flex>

                        <v-flex class="mr-2">
                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Recon Status</p>
                                <!-- <v-text-field
                                    solo 
                                    v-model="reconstatus"
                                    label="Search..."
                                    append-icon="search"
                                    :hide-details = "true"
                                    @click:append="selectreconstatus"
                                    ></v-text-field> -->
                                <v-autocomplete 
                                    :items="getreconstatus" 
                                    solo 
                                    label="Select"
                                    v-model="reconstatus"
                                    attach
                                    item-text="ReconStatusName"
                                    item-value="reconStatusId"
                                    @change=" selectedreconstats(reconstatus)"
                                ></v-autocomplete>
                        
                        </v-flex>

                       
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout v-if="showmorehide" class="darkbox pa-2" align-center xs12 row wrap style="">

                <v-flex class="" xs6>
                    <v-layout>

                        <v-flex row style="flex:1">
                            <v-layout>
                                <div v-for="(item, index) in reconidarray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.reconId}}</p>
                                        </v-flex>
                                        <div class="" @click="removereconiddata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                        </v-flex>

                        <v-flex row style="flex:1">
                            <v-layout>
                                <div v-for="(item, index) in authcodearray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.authCode}}</p>
                                        </v-flex>
                                        <div class="" @click="removeauthcodedata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                        </v-flex>
                     </v-layout>
                </v-flex>
                <v-flex xs6>
                     <v-layout>
                         
                        <!-- <v-flex row style="flex:1">
                            <v-layout>
                                <div v-for="(item, index) in paymodearray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.paymentmode}}</p>
                                        </v-flex>
                                        <div class="" @click="removepaymentmodedata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                        </v-flex> -->

                        <v-flex row style="flex:1">
                            <v-layout>
                                <div v-for="(item, index) in paymentstatusarray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.paymentstatus}}</p>
                                        </v-flex>
                                        <div class="" @click="removepamentdata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                        </v-flex>

                        <v-flex row style="flex:1">
                            <v-layout>
                                <div v-for="(item, index) in reconstatusarray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.reconstatus}}</p>
                                        </v-flex>
                                        <div class="" @click="removereconstatusdata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                        </v-flex>
                     </v-layout>
                </v-flex>
            </v-layout>

            <v-layout v-if="showmorehide" class="cardwhitebackclr pa-2" xs12 row wrap>
                <v-flex xs6>
                    <v-layout>
                        <v-layout row wrap>
                         
                            <v-flex class="mr-2">
                                <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">SAP Document</p>
                                <v-text-field
                                    solo 
                                    v-model="sapdocument"
                                    :hide-details = "true"
                                    append-icon="search"
                                    label="Search..."
                                    @click:append="selectsapdoc"
                                ></v-text-field>
                            </v-flex> 
                            
                        </v-layout>
                       
                        <v-flex v-if="shownftfield" class="mr-2">
                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">NEFT Transaction No.</p>
                            <v-text-field
                                solo 
                                v-model="nefttransectionno"
                                :hide-details = "true"
                                append-icon="search"
                                label="Search..."
                                @click:append="selectnefttransection"
                            ></v-text-field>

                        </v-flex>

                        <v-flex v-if="showcheuefield" class="mr-2">
                        <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Cheque No.</p>
                            <v-text-field
                                solo 
                                v-model="Chequeno"
                                label="Search..."
                                append-icon="search"
                                :hide-details = "true"
                                @click:append="selectchequeno"
                                ></v-text-field>
                    
                        </v-flex>

                        <v-flex xs6 v-if="showcheuefield === false && shownftfield === false">

                        </v-flex>

                        
                    </v-layout>
                </v-flex>
                <v-flex xs6>
                    <v-layout>
                   

                    <v-flex style="flex:1"  class="mr-2">
                    </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout v-if="showmorehide" class="darkbox pa-2" align-center xs12 row wrap style="">

                <v-flex class="" xs6>
                    <v-layout>
                    
                        <v-flex row style="flex:1">
                            <v-layout>
                                <div v-for="(item, index) in sapdocumentarray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.sapDocument}}</p>
                                        </v-flex>
                                        <div class="" @click="removesapdata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                        </v-flex>

                        <v-flex row style="flex:1" v-if="shownftfield">
                            <v-layout>
                                <div v-for="(item, index) in nfttransectionarray" :key="index">
                                    <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                        <v-flex>
                                            <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.neftTranNo}}</p>
                                        </v-flex>
                                        <div class="" @click="removenftransectiondata(index)">
                                            <v-icon style="color:#fff" >close</v-icon>						
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                        </v-flex>

                        <v-flex row style="flex:1" v-if="showcheuefield">
                        <v-layout>
                            <div v-for="(item, index) in chequearray" :key="index">
                                <div class="chiptab" style="flex-direction: row;display:flex; margin-right:10px" > 
                                    <v-flex>
                                        <p class="caption text-xs-center ma-0 font-weight-bold" style="color:#ffffff">{{item.chequeNo}}</p>
                                    </v-flex>
                                    <div class="" @click="removechequedata(index)">
                                        <v-icon style="color:#fff" >close</v-icon>						
                                    </div>
                                </div>
                            </div>
                        </v-layout>
                        </v-flex>
                     </v-layout>
                </v-flex>
                <v-flex xs6>
                     <v-layout>
                        

                        

                        <v-flex row style="flex:1">
                          
                        </v-flex>
                     </v-layout>
                </v-flex>
            </v-layout>

            <v-divider v-if="showmorehide" class="mt-2 mb-2"></v-divider>

        
            <v-layout class="cardwhitebackclr pa-2" xs12 row wrap style="">

                    <v-layout xs8 style="justify-content:flex-end;margin-right:160px">
                        <div class="showmorebutton" @click="showmorelessdata">
                            <v-text class="caption font-weight-bold" style="color:#FFFFFF">{{bsbtn}}</v-text>
                        </div>
                    </v-layout>
                    
                  

                    <v-flex xs4>
                        <v-layout  style="justify-content:flex-end;">
                        <div class="clearallbtn" style="flex-direction: row;display:flex; margin-right:10px;" @click="clearalldata()">
                            <v-flex>
                                <p class="body-2 font-weight-bold text-xs-center ma-0" style="color:#10242B">Clear all</p>
                            </v-flex>
                            <v-flex class="">
                                <v-icon >close</v-icon>						
                            </v-flex>
                        </div>
                    
                
                
                        <div class="searchbtn" style="flex-direction: row;display:flex; margin-right:10px;" @click="searchfilter()">
                            <v-flex>
                                <p class="body-2 font-weight-bold text-xs-center ma-0" style="color:#ffffff">Search</p>
                            </v-flex>
                        </div>
                        </v-layout>
                    </v-flex>
                    
            </v-layout>

            <v-layout class="searchbox pa-2">
                <div class="">
                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Search Results</v-text>
                </div>
            </v-layout>

           
            
					<v-layout  xs12>
                        <v-flex  xs6 class="mr-2">
                                <v-card height="63" class="ma-2" style="" v-for="(item, index) in gcdatatable" :key="index">
                                    <v-layout>

                                        <v-flex class="pa-2 cardborder" @click="openreciptrainpopup">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">GC ID</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption font-weight-bold" style="color:#E46A25">{{item.BbId}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="pa-2 cardborder">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">Receipt No.</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{item.ReceiptNo}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="pa-2 cardborder">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">Chq. No.</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{item.ChqNo}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="pa-2 cardborder">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">Amt. (₹)</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{item.TransactionAmount}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="pa-2 cardborder">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">Bank Account Number</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{item.BankAccountNumber}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="pa-2 cardborder">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">Last Modify Date</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{item.LastModifiedDate}}</v-text>
                                            </v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-card>

                        </v-flex>

                        <v-flex xs6>
                                <v-card height="63" class="ma-2" style="" v-for="(item, index) in bsdatatable" :key="index">
                                    <v-layout>
                                        <v-flex class="pa-2 cardborder" @click="openbanksidepopup">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">BS ID</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption font-weight-bold" style="color:#1E9690">{{item.BsId}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="pa-2 cardborder">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">Payment Mode.</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{item.PayModeId}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="pa-2 cardborder">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">Cheque No.</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{item.Cheque}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="pa-2 cardborder">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">Instrument Date</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{item.LastModifiedDate}}</v-text>
                                            </v-flex>
                                        </v-flex>

                                        <v-flex class="pa-2 cardborder">
                                            <v-flex >
                                            <v-text class="caption font-weight-bold" style="color:#10242B">Recon Status</v-text>
                                            </v-flex>
                                            <v-flex class="mt-1">
                                                <v-text class="caption" style="color:#10242B">{{item.ActionStatusName}}</v-text>
                                            </v-flex>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                        </v-flex>
					
					</v-layout>



                	<v-dialog v-model="openrecipttrail" persistent overlay-color="#ffffff"  max-width="1400px">
                            	 <v-card>
									<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">

										<v-flex class="pa-2" xs10>
											<v-layout>
												<div style="margin-right:15px;">
													<v-text class="subheading font-weight-bold " style="color:#10242B">Receipt Audit Trail Report</v-text>
												</div>
											</v-layout>
										</v-flex>
										<v-flex class="pa-2" xs2>
										  <div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="closereciptrain">
										  		<v-icon>mdi-close</v-icon>
										  </div>
										</v-flex>
									</v-layout>

                                    <v-card height="63" class="mt-3 ml-3 mr-3" style="">
                                        <v-layout>
                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Payment ID</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">10102030405060</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Payment Mode</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Cheque</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">System</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">GC</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Tagic Location</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Mumbai</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Account No.</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">123456789</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">House Bank</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">XYZ Bank</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Payment Status</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Confirm</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Recon Status</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Reconcile</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">User Name</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">__ __ __ __</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Alternate PID </v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">__ __ __ __</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Deposit Transfer PID </v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">__ __ __ __</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">GL Account no.</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">10293947493</v-text>
                                                </v-flex>
									        </v-flex>
                                        </v-layout>
                                    </v-card>

                                    <v-flex class="pl-3 pr-3 pt-2 pb-3">
                                    <v-card height="39" class="mt-3" style="background-color:#23B1A9;">
                                        <v-layout>
                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Payment Mode</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Payment Type</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Payment Amt. (₹)</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Recon Status</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Recon Status</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">SAP Document</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Bounce/Cancel Reason</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">User Name</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Last Modify Date</v-text>
                                                </v-flex>
									        </v-flex>
                                        </v-layout>
                                    </v-card>

                                    <v-card height="39" class="mt-3 ml-2 mr-2" style="background-color:#ffffff;">
                                        <v-layout>
                                           
                                            <div class="pa-2 popupborder" style="width:135px;">
                                                <v-flex style="">
                                                    <v-text class="caption" style="color:#10242B">Cheque</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:145px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Normal</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">5,000</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Accepted</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Unreconcile</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:140px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">YV12345678</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:170px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">__ __ __ __ __ __ __ __</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">__ __ __ __ __</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:178px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">20/03/202</v-text>
                                                </v-flex>
                                            </div>
                                        </v-layout>
                                    </v-card>

                                    <v-card height="39" class="mt-3 ml-2 mr-2" style="background-color:#ffffff;">
                                        <v-layout class="">
                                           
                                            <div class="pa-2 popupborder" style="width:135px;">
                                                <v-flex style="">
                                                    <v-text class="caption" style="color:#10242B">Cheque</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:145px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Normal</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">5,000</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Accepted</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Unreconcile</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:140px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">YV12345678</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:170px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">__ __ __ __ __ __ __ __</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">__ __ __ __ __</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:178px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">20/03/202</v-text>
                                                </v-flex>
                                            </div>
                                        </v-layout>
                                    </v-card>
                                    </v-flex>
                                

                            	 </v-card>
                	</v-dialog>

                    <v-dialog v-model="banksidetrail" persistent overlay-color="#ffffff"  max-width="1400px">
                            	 <v-card>
									<v-layout class="card_shadow" justify-space-between align-center style="background-color:#FFFFFF">

										<v-flex class="pa-2" xs10>
											<v-layout>
												<div style="margin-right:15px;">
													<v-text class="subheading font-weight-bold " style="color:#10242B">Bank Side Audit Trail Report</v-text>
												</div>
											</v-layout>
										</v-flex>
										<v-flex class="pa-2" xs2>
										  <div style="display:flex;justify-content:flex-end;margin-right:10px;" @click="closebanksidepopup">
										  		<v-icon>mdi-close</v-icon>
										  </div>
										</v-flex>
									</v-layout>

                                    <v-card height="63" class="mt-3 ml-3 mr-3" style="">
                                        <v-layout>
                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Deposit Slip No.</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">10102030405060</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Cheque Number</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">xyz1233</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">House Bank</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">XYZ Bank</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Account No.</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">123456789</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Recon Status</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Reconcile</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">GL Account No.</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">101045678</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Amt. (₹)</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">3,000</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Credit Date</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">23-04-2020</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">CR/DR</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Dr</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Rejection Date</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">25-04-2020</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">RTN Recon</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Signature Mismatch</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">RTN Type</v-text>
                                                </v-flex>
                                                <v-flex class="mt-1">
                                                    <v-text class="body-2 font-weight-bold" style="color:#10242B">Customer</v-text>
                                                </v-flex>
									        </v-flex>
                                        </v-layout>
                                    </v-card>

                                    <v-flex class="pl-3 pr-3 pt-2 pb-3">
                                    <v-card height="39" class="mt-3" style="background-color:#23B1A9;">
                                        <v-layout>
                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Payment Mode</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Payment Type</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Payment Amt. (₹)</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Recon Status</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Recon Status</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">SAP Document</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Bounce/Cancel Reason</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">User Name</v-text>
                                                </v-flex>
									        </v-flex>

                                            <v-flex class="pa-2">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#ffffff">Last Modify Date</v-text>
                                                </v-flex>
									        </v-flex>
                                        </v-layout>
                                    </v-card>

                                    <v-card height="39" class="mt-3 ml-2 mr-2" style="background-color:#ffffff;">
                                        <v-layout>
                                           
                                            <div class="pa-2 popupborder" style="width:135px;">
                                                <v-flex style="">
                                                    <v-text class="caption" style="color:#10242B">Cheque</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:145px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Normal</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">5,000</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Accepted</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Unreconcile</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:140px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">YV12345678</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:170px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">__ __ __ __ __ __ __ __</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">__ __ __ __ __</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:178px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">20/03/202</v-text>
                                                </v-flex>
                                            </div>
                                        </v-layout>
                                    </v-card>

                                    <v-card height="39" class="mt-3 ml-2 mr-2" style="background-color:#ffffff;">
                                        <v-layout class="">
                                           
                                            <div class="pa-2 popupborder" style="width:135px;">
                                                <v-flex style="">
                                                    <v-text class="caption" style="color:#10242B">Cheque</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:145px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Normal</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">5,000</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Accepted</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">Unreconcile</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:140px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">YV12345678</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:170px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">__ __ __ __ __ __ __ __</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:150px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">__ __ __ __ __</v-text>
                                                </v-flex>
                                            </div>

                                            <div class="pa-2 popupborder" style="width:178px;">
                                                <v-flex >
                                                    <v-text class="caption" style="color:#10242B">20/03/202</v-text>
                                                </v-flex>
                                            </div>
                                        </v-layout>
                                    </v-card>
                                    </v-flex>
                                

                            	 </v-card>
                	</v-dialog>
        </v-card>

       
    </v-app>
</template>
<script>

import axios from 'axios'
import moment from 'moment';
// import Contests2_EligVue from '../../../../../../weex feature tata agencyv1/sales_drive_weex/sales-ui/src/views/Contests/Contests2_Elig.vue';
export default {
    
    data(){
        return{
            bbidflag:1,
            bsidflag:0,
            reciptarray:[],
            chequearray:[],
            amountarray:[],
            bbidarray:[],
            reconidarray:[],
            sapdocumentarray:[],
            paymentstatusarray:[],
            reconstatusarray:[],
            bsidarray:[],
            authcodearray:[],
            nfttransectionarray:[],
            customernamearray:[],
            paymodearray:[],
            accountnumberarray:[],
            calender:false,
            Tocalender:false,
            frmcalender:false,
            toDte:"",
            frmdate: "",
            validation:'',
            truevalidate:false,
            receiptno:'',
            Chequeno:'',
            radios:'',
            amount:'',
            bbid:'',
            reconid:'',
            sapdocument:'',
            paymentstatus:'',
            bsid:'',
            reconstatus:'',
            authcode:'',
            nefttransectionno:'',
            customername:'',
            paymentmode:'',
            accountnumber:'',
            showbbid:false,
            showbsid:false,
            bothside:true,
            openrecipttrail:false,
            banksidetrail:false,
            showmorehide:false,
            bsbtn:'Show More',
            showmore:'../../../web/assets/uparrow.png',
            User_id:'',
            Trstype:[],
            getreconstatus:[],
            paymentstaus:[],
            // Final Array List creation
            finalreciptarray:[],
            finalchequedata:[],
            finalcustomername:[],
            finalbbiddata:[],
            finalbsiddata:[],
            finalreconidarray:[],
            finalauthcodedata:[],
            finalnfttrandata:[],
            finalsapdocdata:[],
            combinedata:[],
            finalreconstatusdata:[],
            finalpaymentstatusdata:[],

            // Table data
            bsdatatable:[],
            gcdatatable:[],
            showcheuefield:false,
            shownftfield:false
            
            
        }
    },

    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Advanced Search Page');
        this.User_id = this.$store.state.agentDetails.userId;
        // this.GetAllFiltersData()
        
    },

    methods: {

        checkpaymentmode(data){
            console.log("payment mode selection",data)
            if(data === 3){
                this.showcheuefield = true
                this.shownftfield = false
            }else if(data === 5){
                this.showcheuefield = false
                this.shownftfield = true
            }else{
                this.showcheuefield = false
                this.shownftfield = false
            }

            console.log("CHEKING ",this.showcheuefield,this.shownftfield);
        },
        clearalldata(){
            var self = this;
            
            self.finalreciptarray = []
            self.finalchequedata = []
            self.finalcustomername = []
            self.finalbbiddata = []
            self.finalbsiddata = []
            self.finalreconidarray = []
            self.finalauthcodedata = []
            self.finalnfttrandata = []
            self.finalsapdocdata = []


            self.reciptarray = []
            self.chequearray = []
            self.amountarray=[]
            self.bbidarray=[]
            self.reconidarray=[]
            self.sapdocumentarray=[]
            self.paymentstatusarray=[]
            self.reconstatusarray=[]
            self.bsidarray=[]
            self.authcodearray=[]
            self.nfttransectionarray=[]
            self.customernamearray=[]
            self.paymodearray=[]
            self.accountnumberarray=[]

            self.bbidflag = 1,
            self.bsidflag = 0
            
            self.frmdate = ""
            self.toDte =  ""

            self.amount = ''
            self.radios = ''
            self.accountnumber = ''

            self.combinedata = []

            self.showbbid = false
            self.showbsid = false
            self.bothside = true

            self.paymentmode = ''
            self.paymentstatus = ''
            self.reconstatus = ''

            self.showcheuefield = false
            self.shownftfield = false
            
                    

            // self.paymentstaus.push({
            //     PaymentStatusName : '',
            //     PaymentStatusId : ''});
            



        },
        searchfilter(){
            console.log("Search API")

            var self = this;

            self.finalreciptarray = []
            self.finalchequedata = []
            self.finalcustomername = []
            self.finalbbiddata = []
            self.finalbsiddata = []
            self.finalreconidarray = []
            self.finalauthcodedata = []
            self.finalnfttrandata = []
            self.finalsapdocdata = []
            

            self.reciptarray.map((tr) => {
                self.finalreciptarray.push({
                searchObjectTypeName: "receiptNo",
                searchObjectTypeValue: tr.receiptNo,});
            })
    
            self.chequearray.map((tr) => {
                self.finalchequedata.push({
                    searchObjectTypeName:"chequeNo",
                    searchObjectTypeValue:tr.chequeNo,});
            })

            self.customernamearray.map((tr) => {
                self.finalcustomername.push({
                    searchObjectTypeName:"customerName",
                    searchObjectTypeValue:tr.customerName,});
            })

            self.bbidarray.map((tr) => {
                self.finalbbiddata.push({
                    searchObjectTypeName:"bbId",
                    searchObjectTypeValue:tr.bbId,});
            })
            
            self.bsidarray.map((tr) => {
                self.finalbsiddata.push({
                    searchObjectTypeName:"bsId",
                    searchObjectTypeValue:tr.bsId,});
            })

            self.reconidarray.map((tr) => {
                self.finalreconidarray.push({
                    searchObjectTypeName:"reconId",
                    searchObjectTypeValue:tr.reconId,});
            })

            self.authcodearray.map((tr) => {
                self.finalauthcodedata.push({
                    searchObjectTypeName:"authCode",
                    searchObjectTypeValue:tr.authCode,});
            })

            self.nfttransectionarray.map((tr) => {
                self.finalnfttrandata.push({
                    searchObjectTypeName:"neftTranNo",
                    searchObjectTypeValue:tr.neftTranNo,});
            })
    
             self.sapdocumentarray.map((tr) => {
                self.finalsapdocdata.push({
                    searchObjectTypeName:"sapDocument",
                    searchObjectTypeValue:tr.sapDocument,});
            })

            // var d = a.concat(b, c);
            self.combinedata = self.finalreciptarray.concat(self.finalchequedata,self.finalcustomername,self.finalbbiddata,self.finalbsiddata,self.finalreconidarray,self.finalauthcodedata,self.finalnfttrandata,self.finalsapdocdata,self.finalreconstatusdata,self.finalpaymentstatusdata)

            console.log("COMBINED:::",self.combinedata)
            console.log("Payment Mode::",self.paymentmode)

            console.log("RECIPT finalcustomername array::",self.finalcustomername);

            
            console.log("RECIPT Final array::",self.finalreciptarray);
            console.log("FROM AND TO DATE::",self.toDte,self.frmdate)


            let finalfromdate = ''
            let finaltodate = ''

            if(self.frmdate === ''){
                finalfromdate = ''
            }else{
                finalfromdate = moment(self.frmdate).format('DD-MM-YYYY')
            }

            if(self.toDte === ''){
                finaltodate = ''
            }else{
                finaltodate = moment(self.toDte).format('DD-MM-YYYY')
            }

            if(self.paymentmode === ""){
                self.paymentmode = 0
            }
            
            let formbody = {
                BbIdFlag : self.bbidflag,
	            BsIdFlag : self.bsidflag,
                FromDate : finalfromdate,
                ToDate :   finaltodate,
                PaymentModeId : self.paymentmode,
                // AccountNumber :self.accountnumber,
                Amount : self.amount,
                Operator: self.radios,
                BankAcNo:self.accountnumber,
                UserId: self.User_id,
                PageName : "advancedSearchView",
                SessionId : 1,
                SearchObjectList : self.combinedata
            }

            console.log("FormBody:::",formbody)
            
            self.bsdatatable = []
            self.gcdatatable = []
            axios({
                    method: "post",
                    url:
                        this.API_Service_admin()+"/AdvanceFilterAPI/api/AdvanceSearch/AdvanceSearchResult",
                    headers: {
                        "Content-Type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "7192d1bc-24c0-2574-6c67-5eaaf47f9dc4",
                    },
                    data: formbody,
                })
                .then(function (response) {   

                    console.log("Filter API RESSS",response.data);

                    let apiresponse = response.data

                    if(apiresponse.Status === 'Success'){

                        if(apiresponse.BsDataList === null && apiresponse.GcDataList === null ){
                            console.log("Object Is null BSDATA",);
                            console.log("Objest is null GC data",)

                            self.showToast("No Records Found",self.TOST().WARNING);
                        }else{
                            self.showToast("Successfully Record Found",self.TOST().SUCCESS);
                            

                            if(apiresponse.BsDataList === null){
                                console.log("NO BS DATA FOUND")
                            }else{

                                self.bsdatatable = apiresponse.BsDataList

                                console.log("BS TABLE DATA::",self.bsdatatable)
                            }

                            if(apiresponse.GcDataList === null){
                                console.log("NO GC DATA FOUND")
                            }else{
                                self.gcdatatable = apiresponse.GcDataList
                                console.log("GC TABLE DATA::",self.gcdatatable)

                            }

                        }

                    }else{
                            self.showToast(apiresponse.Message,self.TOST().WARNING);
                    }

                })
            .catch(function (error) {
            
            });
        },

        selectedpaymetstats(data){

            this.finalpaymentstatusdata = []

            this.finalpaymentstatusdata.push({
                searchObjectTypeName:"paymentStatus",
                searchObjectTypeValue:data
            })

            console.log("payment Status:::",this.finalpaymentstatusdata);

        },
        selectedreconstats(data){

            this.finalreconstatusdata = []

            this.finalreconstatusdata.push({
                searchObjectTypeName:"reconStatus",
                searchObjectTypeValue:data
            })

            console.log("Recon Status:::",this.finalreconstatusdata);

        },
        GetAllFiltersData() {
            var self = this;
            // self.showLoader('Loading', true);
            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/FilteringData/api/FilterData/getFilteringData",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "16846d3d-acef-5e0b-3343-3a47c9f20305",
                },
                data: {
                    UserId: self.User_id,
                    PageName : "advancedsearchview",
                    BankAcNo: 0,
                },
            })
            .then(function (response) {

               
                if (response.data.ErrorCode === 0){
                    self.showLoader('Loading', false);

                    if(!response.data.SearchPagePaymentMode || response.data.SearchPagePaymentMode.length == 0){
                        
                        self.showToast("No Records Found for transaction Type",self.TOST().WARNING);
                        return
                    }

                    self.Trstype=[]
                    self.getreconstatus = []
                    self.paymentstaus = []

                    response.data.SearchPagePaymentMode.map((tr) => {
                        self.Trstype.push({
                        PaymentModeName: tr.PaymentModeName,
                        payModeId: tr.PayModeId,});
                    })

                    console.log("PAYMENT MODE FILTERs:::",self.Trstype)

                     response.data.SearchPageReconStatus.map((rs) => {
                        self.getreconstatus.push({
                        ReconStatusName: rs.ReconStatusName,
                        reconStatusId: rs.reconStatusId,});
                    })


                    response.data.SearchPagePaymentStatus.map((rs) => {
                        self.paymentstaus.push({
                        PaymentStatusName: rs.PaymentStatusName,
                        PaymentStatusId: rs.PaymentStatusId,});
                    })

                
                   
                }else {
                    self.showLoader('Loading', false);
                    self.showToast('Something went wrong', this.TOST().ERROR);
                    
                }
                

            })
            .catch(function (error) {
              
            });
        },
        selectaccountnumber(){

            if(this.accountnumber !== null || this.accountnumber !== undefined || this.accountnumber !== ''){
                this.accountnumberarray.push({
                    accountnumber:this.accountnumber
                })
            }

            this.accountnumber = ''
        },

        removeaccountnumberdata(ind){
            this.accountnumberarray.splice(ind, 1)
        	// this.accountnumberarray = [...this.accountnumberarray]
        },

        selectpaymentmode(){
            if(this.paymentmode !== null || this.paymentmode !== undefined || this.paymentmode !== ''){
                this.paymodearray.push({
                    paymentmode:this.paymentmode
                })
            }

            this.paymentmode = ''
        },

        removepaymentmodedata(ind){
            this.paymodearray.splice(ind, 1)
        	// this.paymodearray = [...this.paymodearray]
        },

        selectcustomname(){
            if(this.customername !== null || this.customername !== undefined || this.customername !== ''){
                this.customernamearray.push({
                    customerName:this.customername
                })
            }

            this.customername = ''
        },

        removencustomernamedata(ind){
            this.customernamearray.splice(ind, 1)
        	// this.customernamearray = [...this.customernamearray]
        },

        selectnefttransection(){

            if(this.nefttransectionno !== null || this.nefttransectionno !== undefined || this.nefttransectionno !== ''){
                this.nfttransectionarray.push({
                    neftTranNo:this.nefttransectionno
                })
            }

            this.nefttransectionno = ''
        },

        removenftransectiondata(ind){
            this.nfttransectionarray.splice(ind, 1)
        	// this.nfttransectionarray = [...this.nfttransectionarray]
        },

        selectauthocode(){

            if(this.authcode !== null || this.authcode !== undefined || this.authcode !== ''){
                this.authcodearray.push({
                    authCode:this.authcode
                })
            }

            this.authcode = ''
        },

        removeauthcodedata(ind){
            this.authcodearray.splice(ind, 1)
        	// this.authcodearray = [...this.authcodearray]
        },

        selectreconstatus(){

            if(this.reconstatus !== null || this.reconstatus !== undefined || this.reconstatus !== ''){
                this.reconstatusarray.push({
                    reconstatus:this.reconstatus
                })
            }

            this.reconstatus = ''
        },

        removereconstatusdata(ind){
            this.reconstatusarray.splice(ind, 1)
        	// this.reconstatusarray = [...this.reconstatusarray]
        },

        selectbsid(){
            if(this.bsid !== null || this.bsid !== undefined || this.bsid !== ''){
                this.bsidarray.push({
                    bsId:this.bsid
                })
            }

            this.bsid = ''
        },

        removebsdata(ind){
            this.bsidarray.splice(ind, 1)
        	// this.bsidarray = [...this.bsidarray]
        },

        selectpaymentstatus(){
            if(this.paymentstatus !== null || this.paymentstatus !== undefined || this.paymentstatus !== ''){
                this.paymentstatusarray.push({
                    paymentstatus:this.paymentstatus
                })
            }

            this.paymentstatus = ''
        },

        removepamentdata(ind){
            this.paymentstatusarray.splice(ind, 1)
        	// this.paymentstatusarray = [...this.paymentstatusarray]
        },
        selectsapdoc(){
            if(this.sapdocument !== null || this.sapdocument !== undefined || this.sapdocument !== ''){
                this.sapdocumentarray.push({
                    sapDocument:this.sapdocument
                })
            }

            this.sapdocument = ''
        },

        removesapdata(ind){
            this.sapdocumentarray.splice(ind, 1)
        	// this.sapdocumentarray = [...this.sapdocumentarray]
        },

        selectreconid(){

            if(this.reconid !== null || this.reconid !== undefined || this.reconid !== ''){
                this.reconidarray.push({
                    reconId:this.reconid
                })
            }

            this.reconid = ''
        },

        removereconiddata(ind){
            this.reconidarray.splice(ind, 1)
        	// this.reconidarray = [...this.reconidarray]
        },

        selectbbid(){
            console.log("BBID",this.bbid);
            if(this.bbid !== null || this.bbid !== undefined || this.bbid !== ''){
                this.bbidarray.push({
                    bbId:this.bbid
                })
            }

            this.bbid = ''
        },

        removebbiddata(ind){
            this.bbidarray.splice(ind, 1)
        	// this.bbidarray = [...this.bbidarray]	
        },

        selectchequeno(){
            
            if(this.Chequeno !== null || this.Chequeno !== undefined || this.Chequeno !== ''){
                this.chequearray.push({
                    chequeNo:this.Chequeno
                })
            }

            this.Chequeno = ''
        },

        removechequedata(ind){
            this.chequearray.splice(ind, 1)
        	// this.chequearray = [...this.chequearray]	
        },
        selectreciptnumber(){

            if(this.receiptno !== null || this.receiptno !== undefined || this.receiptno !== ''){
                this.reciptarray.push({
                    receiptNo:this.receiptno
                })


            }

            console.log("Check Recipt Number array::",this.reciptarray);
            this.receiptno = ''
        },

        removereciptdata(unoqueid,ind){
            console.log("Recipt Chip remove ",ind);
            console.log("uniue::",unoqueid)

            const index = this.reciptarray.findIndex(list => list.receiptNo == unoqueid); //Find the index of stored id
            this.reciptarray.splice(index, 1)
        	// this.reciptarray = [...this.reciptarray]	

        },
        showmorelessdata(){
				if(this.showmorehide === true){
					this.showmorehide = false
					this.bsbtn = 'Show More'
				}else{
					this.showmorehide = true
					this.bsbtn = 'Show Less'
				}
		},
        openbanksidepopup(){

            this.banksidetrail = true
        },

        closebanksidepopup(){

            this.banksidetrail = false
        },
        openreciptrainpopup(){
            this.openrecipttrail = true
        },
        closereciptrain(){
            this.openrecipttrail = false
        },
        searchtabsswitch(event){
            console.log('Tabs Name::::',event)
            console.log('Tabs Name::::',event)

            if(event === 'bbid'){
                if(this.showbbid === true){
                    this.showbbid = false
                    this.bbidflag = 0
                }else{
                    this.showbbid = true
                    this.showbsid = false
                    this.bothside = false
                    this.bbidflag = 1
                    this.bsidflag = 0

                    console.log("BS ID Flag",this.bsidflag)
                    console.log("BB ID Flag",this.bbidflag)
                }
            }else if(event === 'bsid'){
                 if(this.showbsid === true){
                    this.showbsid = false
                    this.bsidflag = 0
                }else{
                    this.showbbid = false
                    this.showbsid = true
                    this.bothside = false
                    this.bsidflag = 1
                    this.bbidflag = 0

                    console.log("BS ID Flag",this.bsidflag)
                    console.log("BB ID Flag",this.bbidflag)
                }
            }else{
                 if(this.bothside === true){
                    this.bothside = false
                }else{
                    this.showbbid = false
                    this.showbsid = false
                    this.bothside = true
                    this.bbidflag = 1
                    this.bsidflag = 1

                    console.log("BS ID Flag",this.bsidflag)
                    console.log("BB ID Flag",this.bbidflag)
                }
            }

        },
        chngToDate(date) {

				this.Tocalender=false
				// this.updteRcntblFlg=true
				// this.dtsChgnd = true
				this.validDateChk()
        },

        chngfrmDate(date) {
				this.frmcalender=false
				// this.updteRcntblFlg=true
				// this.dtsChgnd = true
				this.validDateChk()
			},
        

        validDateChk(){
            
            let fromeDate =moment(this.frmdate).valueOf()
            let CurrentDate=moment(Date.now()).valueOf()
            let Todate =moment(this.toDte).valueOf()

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
    },

    computed: {
			   
        computedToDateFormattedMomentjs () {
            return this.toDte ? moment(this.toDte).format("DD-MM-YYYY"): ''
        },

        computedFrmDateFormattedMomentjs () {
            return this.frmdate ? moment(this.frmdate).format("DD-MM-YYYY"): ''
		},

	},
}
</script>
<style>


.cust-dropdwn-hgt.v-text-field.v-text-field--solo .v-input__control{
		min-height: 38px;
	}
.showmorebutton{
    background-color: #152F38;
     min-width: 120px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 5px;
    border-width: 2px ;
    border-style: solid;
    border-right-color: #E6E9EB;
    border-left-color: #E6E9EB;
    border-top-color: #E6E9EB;
    border-bottom-color: #E6E9EB;
    border-radius: 30px;
    cursor: pointer;
    
}
.popupborder{
	border-top-color: #C1C8CC;
	border-bottom-color: #C1C8CC;
	border-right-color: #C1C8CC;
	border-left-color: #C1C8CC;
	border-style: solid;
	border-width: 1px;
}

.card_shadow{
	box-shadow:0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
}
.vx-activ-fnt{
    color: #FFFFFF;
}

.vx-inactive-fnt{
    color: #10242B;
}
.searchbtn{
     width: 110px;
    justify-content: center;
    align-items: center;
    height: 25px;
    padding: 15px;
    background-color: #E46A25;
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    cursor: pointer;
}
.clearallbtn{
    
    width: 110px;
    justify-content: center;
    align-items: center;
    height: 25px;
    padding: 15px;
    background-color: #F7F7F7;
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    cursor: pointer;
}
.chiptab{
	   /* width: 110px; */
	   justify-content: center;
	   align-items: center;
	   height: 25px;
	   padding: 15px;
	   background-color: #23B1A9;
	   border-color: #C1C8CC;
	   border-style: solid;
	   border-width: 1px;
	   border-radius: 5px;
	   cursor: pointer;
}
.cardwhitebackclr{
    background-color: #ffffff;
    /* justify-content: center;
    align-items: center; */
}

.darkbox{
    background-color: #ffffff;
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
}

.searchbox{
    background-color: #ffffff;
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
}

.verticle-line{
    height: 20px;
    width: 2px;

}

.tabsboxactive{
    background-color: #23B1A9;
    padding: 10px;
    width: 110px;
    border-color: #909699;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
}

.vx-tab-active{
    background-color: #152F38;
}
.re-set-tab{
    background-color: #ffffff;
}
.tabsboxinactive{
    /* background-color: #ffffff; */
    padding: 10px;
    width: 110px;
    border-color: #909699;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
}
.cust-audlog .sel{
    width: 335px;
    height: 37px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 2px #00000051;
    border: 0.5px solid #C1C8CC;
    opacity: 1;
}
.reconRle-di .v-text-field.v-text-field--solo .v-input__control{
	min-height: 38px;
}
</style>