<template>
	<v-app>
        <v-card class="ma-3" style="background-color:#F7F7F7">
            <v-layout column class="">
                <v-card flat class=" mb-0" style="border:1px solid #C1C8CC; border-bottom: unset;">
                    <v-layout row justify-space-between align-center style="padding:5px;background-color:#F7F7F7">
                        <v-layout row justify-start align-center class="cust_addbnkAcc-btn">
                            <v-text 
                            class="body-2 mr-1 ml-3 bnkAcc-hdr"  
                            >
                            Bank Account Master
                            </v-text>
                            <v-divider  class="ma-2" vertical ></v-divider>
                            <v-btn   v-if="addbuttonshowhide" color="#E46A25" small round dark class="" style="text-transform:none;" @click="add_bnkAcc()">
                                <v-icon class="" small dark left >add</v-icon>
                                New Bank Account
                            
                            </v-btn>
                        </v-layout>
                        <v-layout row justify-end align-center>
                            <v-text class="mr-1 bnkAcc-hdr" style="color:#3C3D3D; font-size:12px;">
                                <span class="" style="color:#E46A25;">Showing {{fromvalue}}-{{toValu}} </span>out of {{GetBnkMstrHstryDta.length}} records
                            </v-text>
                            <v-divider  class="ma-2" vertical ></v-divider>
                            <v-pagination 
                                class="cust-bnkAcc-pgn"
                                v-model="pageNumber"
                                color="#152F38"
                                flat
                                @input="nextPage"
                                :length="pages"></v-pagination>
                        </v-layout>
                    </v-layout>
                </v-card>
                <v-card flat class="mb-0 mt-0 " style="">
                    <v-flex style="" class="cust-bnkAcc-tbl">
                        <v-data-table
                            class="bnkAcc-tbl-brdr ma-0 pa-0"
                            :headers="headers"
                            :items="paginatedData"
                            v-bind:pagination.sync="pagination"
                            hide-actions
                            item-key="_id"
                        >
                            <template slot="items" slot-scope="props" >
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.Country| checkdata}}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.HouseOfBank| checkdata}}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.BankId| checkdata}}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.BankName| checkdata}}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.BankAcNo| checkdata}}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.TransactionStartDate| checkdata}}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.Description| checkdata}}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.GlCode1| truncate(16,'...') }}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.GlCode2| truncate(16,'...') }}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.GlCode3| truncate(16,'...') }}</td>
                                
                                <!-- <td style="" class="bnkAcc-td-bdrgt">{{Array.prototype.map.call(props.item.PaymentModeName, function(item) { return item.text; }).join(", ")}}</td> -->
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.PaymentModeName| checkdata}}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.RemarkType| checkdata }}</td>
                                <td style="" class="bnkAcc-td-bdrgt">{{props.item.UserRemarks| checkdata }}</td>
                                <td class="bnkAcc-td-bdrgt bnkAcc-hdr" :style="props.item.Status.toLowerCase()==='approved'?{color:'#1E9690' }:props.item.Status.toLowerCase()==='rejected'?{color:'#D1121B' }:{color:'#E46A25' }" style="font-weight: 700; text-transform: capitalize;" >{{props.item.Status| checkdata}}</td>
                                <!-- <td class="bnkAcc-td-bdrgt bnkAcc-hdr" style="color:#1E9690;font-weight: 700; text-transform: capitalize;" v-if="props.item.Status.toLowerCase()==='approved'">{{props.item.Status}}</td>
                                <td class="bnkAcc-td-bdrgt bnkAcc-hdr" style="color:#D1121B;font-weight: 700;text-transform: capitalize;" v-if="props.item.Status.toLowerCase()==='rejected'">{{props.item.Status}}</td> -->
                                <td class="justify-center layout px-0 text-xs-center">
                                    <v-icon  v-if="editbuttonshowhide" class="mr-2" small @click="editBnkAcc(props.item)">edit</v-icon>
                                    <v-menu 
                                        transition="slide-x-transition"
                                        top
                                        left
                                        :nudge-left="40"
                                        :nudge-bottom="88"
                                        content-class="my-menu-bnkmstr"
                                        style=""
                                        flat
                                        allow-overflow
                                        
                                    >
                                        <v-btn color="#1E9690" slot="activator" icon small dark v-if="actionbuttonshowhide" >
                                            <v-icon dark small>arrow_forward</v-icon>
                                        </v-btn>
                                        <v-list dense style="background-color:#F7F7F7" class="pa-0 ma-0 cust-bnk-tile">
                                            <v-list-tile
                                                v-for="(item, index) in chkr_items"
                                                :key="index"
                                                @click="chkr_seltd(item,props.item)" 
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
                                </td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-card>
                <!-- Add/Eit Dialog box -->
                <v-layout>
                    <v-dialog v-model="addBnkDilg" persistent max-width="650px">
                        <v-card color="#F7F7F7" class="pb-2">
                            <v-layout justify-space-between  class="" style="flex:1;background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
                                <v-card-title class="pa-0 pl-3 bnkAcc-hdr text-uppercase">{{this.accType}} Bank Account</v-card-title>
                                <div style="border-left:1px solid #C1C8CC;" @click="close_frm()">
                                    <v-icon style="cursor: pointer;" class="pa-2" >close</v-icon>
                                </div>
                            </v-layout>
                            <v-form v-model="bankAccForm" ref="form">
                                <v-card class="ma-3 mb-0">
                                    <v-layout column class="" style="background-color:#FFFFFF">
                                        <v-layout class="mt-3" row justify-space-around wrap>
                                            <v-flex xs4 sm6 md5>
                                                <p class="mb-1 bnkAcc-hdr" style="">House of Bank</p>
                                                <!-- return-object
                                                        item-text="PaymentModeName"
                                                        item-value="value" -->
                                                <div class="cust-bnkAcc-frm">
                                                    <v-combobox
                                                        solo
                                                        v-model="select_bank"
                                                        :items="bnknams"
                                                        label="Select/Create New"
                                                        @change="selecBank(select_bank)"
                                                        :rules="[() => !!select_bank || 'This field is required']"
                                                        attach
                                                        :readonly="disdesignation"
                                        
                                                    ></v-combobox> 
                                                </div>  
                                            </v-flex>         
                                            <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm">
                                                <p class="mb-1 bnkAcc-hdr" style="">Account Name</p>
                                                <v-text-field
                                                    solo
                                                    v-model="accountName"
                                                    placeholder="Enter Account Name"
                                                    :readonly="disdesignation"
                                                >
                                                </v-text-field>
                                                            
                                            </v-flex>

                                            <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm">
                                                <p class="mb-1 bnkAcc-hdr" style="">Account Number</p>
                                                <v-text-field
                                                    solo
                                                    v-model="accNo"
                                                    :readonly="disdesignation" 
                                                    :rules="installmentpremvalid" @input="fieldvalidation(accNo,'installmentpremium')"
                                                    placeholder="Enter Account Number"></v-text-field>
                                            </v-flex>

                                            <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm">
                                                <p class="mb-1 bnkAcc-hdr" style="">Opening Date</p>
                                                <v-menu
                                                        ref="calender"
                                                        :close-on-content-click="true"
                                                        v-model="imprtcalender"
                                                        :nudge-right="40"
                                                        lazy
                                                        transition="scale-transition"
                                                        offset-y
                                                        full-width
                                                        max-width="290px"
                                                        min-width="290px" 
                                                        :disabled="disdesignation">
                                                        <!-- <template v-slot:activator="{ on }"> -->
                                                            <!-- :readonly="disdesignation" -->
                                                            <v-text-field
                                                                slot="activator"
                                                                label="Picker in menu"
                                                                :value="computedDateFormattedMomentjs"
                                                                solo
                                                                readonly 
                                                            ></v-text-field>
                                                        <!-- </template> -->
                                                        <v-date-picker
                                                            v-model="imprtdate"
                                                            no-title
                                                            :max="maxdte"
                                                        ></v-date-picker>
                                                </v-menu>
                                            </v-flex>

                                            <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm">
                                                <p class="mb-1 bnkAcc-hdr" style="">Description</p>
                                                <!-- <v-text-field
                                                    solo
                                                    v-model="accDesc"
                                                    placeholder="Enter Description"></v-text-field> -->

                                                    <v-autocomplete 
                                                            :items="Nature" 
                                                            solo 
                                                            label="Select Description"
                                                            :hide-details = true
                                                            v-model="accDesc"
                                                            attach
                                                            :readonly="disdesignation"
                                                        ></v-autocomplete>
                                            </v-flex>
                                            
                                            <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm">
                                                <p class="mb-1 bnkAcc-hdr" style="">GL Code 1</p>
                                                <v-textarea
                                                    solo
                                                    :readonly="disdesignation"
                                                    v-model="gl"
                                                    auto-grow
                                                    rows="1"
                                                    :rules="[() => !!gl || 'This field is required']"
                                                    placeholder="Enter GL"></v-textarea>
                                            </v-flex>
                                            <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm">
                                                <p class="mb-1 bnkAcc-hdr" style="">GL Code 2</p>
                                                <v-textarea
                                                    solo
                                                    rows="1"
                                                    auto-grow
                                                    v-model="gl2"
                                                    :readonly="disdesignation"
                                                    placeholder="Enter GL"></v-textarea>
                                            </v-flex>
                                            <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm">
                                                <p class="mb-1 bnkAcc-hdr" style="">GL Code 3</p>
                                                <v-textarea
                                                    solo
                                                    auto-grow
                                                    rows="1"
                                                    v-model="gl3"
                                                    :readonly="disdesignation"
                                                    placeholder="Enter GL"></v-textarea>
                                            </v-flex>
                                            
                                        </v-layout>
                                        <v-divider class="mb-3 ml-3 mr-3"></v-divider>
                                        <div v-if="disdesignation===false">
                                        <p class="mb-1 pl-4 bnkAcc-hdr" style="">Select Payment Mode</p>
                                        <v-item-group 
                                            
                                            multiple 
                                            v-model="seltdPymtMode" 
                                            class="bnkAcc-custPointer ma-2"
                                            :mandatory="mandatory"
                                            @change="seldPymtMode()">
                                            
                                            <!-- active-class="teal darken-1--text text--teal darken-1" -->
                                            <v-item 
                                                
                                                v-for="(item,index) in avlblPymtModes"
                                                :key="index"
                                                
                                            >
                                                <v-chip
                                                    
                                                    class="ml-3 mb-3"
                                                    small
                                                    dark
                                                    :color="active?'#23B1A9':'#9e9e9e'"
                                                    slot-scope="{ active, toggle }"
                                                    :selected="active"
                                                    @click="toggle"
                                                >
                                                    {{ item.PaymentModeName}}
                                                </v-chip>
                                            </v-item>
                                        </v-item-group>
                                        </div>
                                        <div v-else>
                                            <p class="mb-1 pl-4 bnkAcc-hdr" style="">Selected Payment Mode</p>
                                            <!-- text-color="black" outline  color="secondary" -->
                                            <v-chip class="ml-4 mb-3" v-for="(item, index) in vwPymtmde" :key="index"  small :readonly="disdesignation">{{item}}</v-chip>
                                        </div>
                                    </v-layout>
                                </v-card>
                                <v-layout  v-if="disdesignation===false" class="" row justify-space-around align-center style="" @click="subtFrAppvl()">
                                    <v-btn dark color="#E46A25" class="bnk-txt-tranfrm">
                                        <v-icon dark >keyboard_tab</v-icon>
                                        <v-divider vertical dark class="ml-2 mr-2"></v-divider>Submit for Approval
                                    </v-btn>
                                </v-layout>
                                <v-layout  v-if="shwApprvBtn===true" class="" row justify-space-around align-center style="">
                                    <v-btn dark color="#23B1A9" class="bnk-txt-tranfrm"  @click="apprve_recrd('approve')">
                                        <v-icon dark >check_circle</v-icon>
                                        <v-divider vertical dark class="ml-2 mr-2"></v-divider>Approve
                                    </v-btn>
                                </v-layout>
                            </v-form>
                        </v-card>
                    </v-dialog>
                </v-layout>

                <!-- Reject Dialog box -->
                <v-layout>
                    <v-dialog v-model="rjctBnkDilg" persistent max-width="650px">
                        <v-card color="#F7F7F7" class="pb-2">
                            <v-layout justify-space-between  class="" style="flex:1;background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
                                <v-card-title class="pa-0 pl-3 bnkAcc-hdr text-uppercase">{{this.accType}}</v-card-title>
                                <div style="border-left:1px solid #C1C8CC;" @click="close_rjctfrm()">
                                    <v-icon style="cursor: pointer;" class="pa-2" >close</v-icon>
                                </div>
                            </v-layout>
                            <v-form v-model="bankRjctForm" ref="rjctform">
                                <v-card class="ma-3 mb-0 px-3 pt-3">
                                    <v-layout class=" mb-3">
                                        <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                            <v-text>Bucket Type</v-text>
                                            <v-text color="#10242B" class="font-weight-bold">Bank Master Update</v-text>
                                        </v-layout>
                                        <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                            <v-text>Request Type</v-text>
                                            <v-text color="#10242B" class="font-weight-bold"> Bank Account Reject</v-text>
                                        </v-layout>
                                        <v-layout column class="">
                                            <v-text>Request on </v-text>
                                            <v-text color="#10242B" class="font-weight-bold">6/6/2020 18:06</v-text>
                                        </v-layout>
                                    </v-layout>
                                    <v-divider ></v-divider>

                                    <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm mt-3 mb-2">
                                        <p class="mb-1 bnkAcc-hdr" style="">Select</p>
                                        <v-autocomplete 
                                            :items="remarktypeItms" 
                                            solo 
                                            label="Select Reason"
                                            v-model="remarktype"
                                            :rules="[() => !!remarktype || 'This field is required']"
                                            return-object
                                            item-text="RemarksDescription"
                                            item-value="RemarksId"
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
                                                :rules="[() => !!rjctdesc || 'This field is required']"
                                                placeholder="Enter Description">
                                            </v-textarea>
                                    </v-flex>
                                </v-card>
                                <v-layout class="mr-2" row justify-end style="">
                                    <v-btn  color="#FFFFFF" class="bnk-txt-tranfrm" @click="close_rjctfrm()">
                                        <v-icon color="#909699" >cancel</v-icon>
                                        <v-divider vertical class="ml-2 mr-2"></v-divider>Cancel
                                    </v-btn>
                                    <v-btn dark color="#D1121B" class="bnk-txt-tranfrm"  @click="apprve_recrd('reject')">
                                        <v-icon  dark >cancel</v-icon>
                                        <v-divider vertical dark class="ml-2 mr-2"></v-divider>Reject
                                    </v-btn>
                                </v-layout>
                            </v-form>
                        </v-card>
                    </v-dialog>
                </v-layout>

                <!-- Reject Dialog box -->
                <v-layout>
                    <v-dialog v-model="hstryBnkDilg" persistent max-width="720px">
                        <v-card color="#F7F7F7" class="pb-2">
                            <v-layout justify-space-between  class="" style="flex:1;background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
                                <v-card-title class="pa-0 pl-3 bnkAcc-hdr text-uppercase">{{this.accType}}</v-card-title>
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

            </v-layout>
        </v-card>
	</v-app>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {

    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Bank Account Master');
        this.User_id = this.$store.state.agentDetails.userId;
        this.sessionId = this.$store.state.agentDetails.sessionId;
        this.GetBankMasterHistory()
        // this.GetAllFiltersData()
        this.getremarktypedata();

        let menulist = this.$store.getters.getDetamenulistils
            // let manualrecondata = menulist[2]
            console.log("manual menu LIST::",menulist);
            for(let i=0;i<menulist.length;i++){
            	if(menulist[i].menuName === 'bankMaster'){
            		if(menulist[i].approveReject){
            			this.actionbuttonshowhide = true
            			console.log("ACTION BUTTON TRUE",this.actionbuttonshowhide)
            		}else{
            			this.actionbuttonshowhide = false
            			console.log("ACTION BUTTON False",this.actionbuttonshowhide)
            		}
            	}
            }

            for(let i=0;i<menulist.length;i++){
            	if(menulist[i].menuName === 'bankMaster'){
            		if(menulist[i].add){
            			this.addbuttonshowhide = true
            			console.log("ACTION BUTTON TRUE",this.addbuttonshowhide)
            		}else{
            			this.addbuttonshowhide = false
            			console.log("ACTION BUTTON False",this.addbuttonshowhide)
            		}
            	}
            }

            for(let i=0;i<menulist.length;i++){
            	if(menulist[i].menuName === 'bankMaster'){
            		if(menulist[i].edit){
            			this.editbuttonshowhide = true
            			console.log("ACTION BUTTON TRUE",this.editbuttonshowhide)
            		}else{
            			this.editbuttonshowhide = false
            			console.log("ACTION BUTTON False",this.editbuttonshowhide)
            		}
            	}
            }
               
            let todayDate = Date.now();
            todayDate = moment(todayDate).format("DD-MM-YYYY");
            this.maxdte = moment(todayDate,'DD/MM/YYYY').format('YYYY-MM-DD');
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
        
        truncate: function (text, length, suffix) {
            if (text == ""|| text == "undefined" || text == null || text == '' || text == 'Invalid Date'){
                 return "-"
            }
            else if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        }
    },
    computed: {
       
        computedDateFormattedMomentjs () {
            console.log(this.imprtdate)
            console.log(this.imprtdate ? moment(this.imprtdate).format("DD-MM-YYYY"): '')
            return this.imprtdate ? moment(this.imprtdate).format("DD-MM-YYYY"): ''
        },
        pages () {

            console.log(this.size ? Math.ceil(this.GetBnkMstrHstryDta.length / this.size) : 0)
            return this.size ? Math.ceil(this.GetBnkMstrHstryDta.length / this.size) : 0
        },

        pageCount() {
            let l = this.GetBnkMstrHstryDta.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedData() {
            const start = this.pageNumber * this.size - this.size,
            end = start + this.size;
            console.log(start,end,"start End")

            if(!this.GetBnkMstrHstryDta || this.GetBnkMstrHstryDta.length == 0){
                this.fromvalue=0
            }else{
                this.fromvalue=start+1;
            }

            
            if(this.GetBnkMstrHstryDta.length <this.size){
                this.toValu=this.GetBnkMstrHstryDta.length
            }else if(this.GetBnkMstrHstryDta.length <end){
                    this.toValu=this.GetBnkMstrHstryDta.length
            }else{
                this.toValu=end
            }

            console.log(this.GetBnkMstrHstryDta.slice(start, end),"this.fromvalue this.toValu")
            return this.GetBnkMstrHstryDta.slice(start, end);
        }
    },
    data(){
        return{
            // page: 1,
              pagination: {
                rowsPerPage:15
            },
            remarktypeItms:[],
            remarktype:'',
            actionbuttonshowhide:false,
            addbuttonshowhide:false,
            editbuttonshowhide:false,
            pageNumber: 1,
            size: 15,
            BankId:0,
            fromvalue:'',
            toValu:'',
            GetBnkMstrHstryDta:[],
            vwPymtmde:[],
            User_id:'',
            sessionId:'',
            rjctBnkDilg:false,
            hstryBnkDilg:false,
            disdata:false,
            disdesignation:false,
            shwApprvBtn:false,
            maxdte:"",
            mandatory: true,
            addBnkDilg:false,
            bankAccForm:false,
            bankRjctForm:false,
            select_bank:'',
            newbnkname:'',
            accountName:'',
            imprtcalender: false,
            imprtdate: "",
            accDesc:'',
            accNo:'',
            gl:'',
            gl2:'',
            gl3:'',
            rjctdesc:'',
            seltdPymtMode:[],
            accType:'Add New',
            editedIndex: -1,
            headers:[
                
                {text: 'Country', value: 'country',sortable: false},
                {text: 'House of Bank', value: 'houseOfBank',sortable: false},
                {text: 'Bank Id', value: 'bankId',sortable: false},
                {text: 'Bank Name', value: 'bankName',sortable: false},
                {text: 'Account Number', value: 'accountNumber',sortable: false},
                {text: 'Opening Date', value: 'openingDate',sortable: false},
                {text: 'Description', value: 'description',sortable: false},
                {text: 'GL Code 1', value: 'glCode1',sortable: false},
                {text: 'GL Code 2', value: 'glCode2',sortable: false},
                {text: 'GL Code 3', value: 'glCode3',sortable: false},
                {text: 'Payment Mode', value: 'paymentMode', sortable: false},
                {text: 'Remark Type', value: 'remarktype', sortable: false},
                {text: 'Remark Description', value: 'RemarkDescription', sortable: false},
                {text: 'Status', value: 'status', sortable: false},
                {text: 'Action', value: 'action', sortable: false},

            ],
            Nature:["Collection", "Payment", "Investment"],

            acc_details:[
                {
                    country:'India',
                    bankName:{
                        value: "icici",
                        text: "ICICI"
                    },
                    accountName:'HSBC EMMA',
                    description:'Collection',
                    accountNumber:'002176410002',
                    paymentMode:[
                            {text:'Cash',value:'cash'},
                            {text:'Cheque',value:'cheque'},
                            {text:'BS',value:'bs'},
                            {text:'CC', value:'cc'},
                            {text:'Fund Transfer',value:'fundtransfer'}
                        ],
                    status:'Approval Pending',
                },{
                    country:'India',
                    bankName:{
                        value: "hdfc",
                        text: "HDFC"
                    },
                    accountName:'HSBC EMMA',
                    description:'Collection',
                    accountNumber:'002176410002',
                    paymentMode:[
                            {text:'Cash',value:'cash'},
                            {text:'Cheque',value:'cheque'},
                            {text:'CC', value:'cc'},
                            {text:'Fund Transfer',value:'fundtransfer'}
                        ],
                    status:'Approval Pending',

                },{
                    country:'India',
                    bankName:{
                        value: "hdfc",
                        text: "HDFC"
                    },
                    accountName:'HSBC EMMA',
                    description:'Collection',
                    accountNumber:'002176410002',
                    paymentMode:[
                            {text:'Cash',value:'cash'},
                            {text:'Cheque',value:'cheque'},
                            {text:'BS',value:'bs'},
                            {text:'CC', value:'cc'},
                        ],
                    status:'Approval Pending',

                },{
                    country:'India',
                    bankName:{
                        value: "hdfc",
                        text: "HDFC"
                    },
                    accountName:'HSBC EMMA',
                    description:'Collection',
                    accountNumber:'002176410002',
                    paymentMode:[
                            {text:'Cash',value:'cash'},
                            {text:'Cheque',value:'cheque'},
                            {text:'BS',value:'bs'},
                            {text:'CC', value:'cc'},
                            {text:'Fund Transfer',value:'fundtransfer'}
                        ],
                    status:'Approved',
                    rjctBankAcNo:'',
                }
            ],

            bnknams:[],
            chkr_items: [
                { title: 'View Details', icon:'highlight',color:"#646666"},
                { title: 'Approve', icon:'check_circle',color:"#1E9690" },
                { title: 'Reject With Remark' , icon:'cancel',color:"#D1121B"},
                { title: 'Approval History' , icon:'info',color:"#E46A25"}
            ],

            avlblPymtModes:[],
            customeridvalid: [],

            policyidvalid: [],

            bodyvalidationvalidation:[],
            installmentpremvalid:[],
            productnamevalidation:[],
            sumassuredvalidation:[],
            recordcode:'',
            historyapprovaldata:[],
            approvalhistoryheaderdata:[]

        }
    },
     methods:{

        GetBankMasterHistory(){

              let self=this
              self.showLoader('Loading', true);

            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/MasterSetupAPI/api/BankMaster/GetBankMasterHistory",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "68a443e0-1659-4e21-58ef-5f5f23500743",
                },
                data: {
                    UserId: self.User_id,
                    PageId: 1,
                    BankAcNo: 0,
                },
            })
            .then(function (response) {
                console.log(" GetBankMasterHistory Filter APi Response>>>>>>", response);
                if (response.data.ErrorCode === 0){
                    self.showLoader('Loading', false);
                    if(!response.data.GetBankMasterHistoryResponseList || response.data.GetBankMasterHistoryResponseList.length == 0){
                        console.log("Array is either empty or does not exist")
                        self.showToast("No Records Found",self.TOST().WARNING);
                        return
                    }
                    self.GetBnkMstrHstryDta=[]
                    self.GetBnkMstrHstryDta=response.data.GetBankMasterHistoryResponseList
                    console.log("History Bank master",self.GetBnkMstrHstryDta)
                }else {
                    self.showLoader('Loading', false);
	                self.showToast('Something went wrong', this.TOST().ERROR);
	             }
                
            })
            .catch(function (error) {
                console.log("Filter APi Response>>>>>>", error);
            });

        },
        nextPage(page) {
            this.pageNumber = page;
        },

        GetAllFiltersData() {
            var self = this;
            self.showLoader('Loading', true);
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
                    UserId: self.User_id,
                    PageName : "addBankMaster",
                    BankAcNo: 0,
                },
            })
            .then(function (response) {

                console.log("Filter APi Response>>>>>>", response);

                if (response.data.ErrorCode === 0){
                    self.showLoader('Loading', false);

                    if(!response.data.FilterDataHouseBank || response.data.FilterDataHouseBank.length == 0){
                        console.log("Array is either empty or does not exist")
                        self.showToast("No Records Found for House of Bank",self.TOST().WARNING);
                        return
                    }

                    self.bnknams=[]
                    response.data.FilterDataHouseBank.map((bnk) => {
                        self.bnknams.push(bnk.HouseOfBank);
                    });
                    
                    if(!response.data.FilterDataPaymentModeName || response.data.FilterDataPaymentModeName.length == 0){
                        console.log("Array is either empty or does not exist")
                        self.showToast("No Records Found for Payment Mode",self.TOST().WARNING);
                        return
                    }
                    
                    self.avlblPymtModes=[]
                    self.avlblPymtModes=response.data.FilterDataPaymentModeName
                    console.log("FilterDataHouseBank  Bank master",self.bnknams)
                    console.log("FilterDataPaymentModeName Bank master",self.avlblPymtModes)

                }else {
                    self.showLoader('Loading', false);
                    self.showToast('Something went wrong', this.TOST().ERROR);
                    
	             }
                

            })
            .catch(function (error) {
                console.log("Filter APi Response>>>>>>", error);
            });
        },

        setImprtdate(){
            // this.showLoader('Loading', false);
            let todayDate = Date.now();
            todayDate = moment(todayDate).format("DD-MM-YYYY");
            this.imprtdate = moment(todayDate,'DD/MM/YYYY').format('YYYY-MM-DD');
            console.log("this.imprtdate",this.imprtdate)
           

        },
        add_bnkAcc(){

                // this.GetAllFiltersData()
                this.$refs.form.reset();
                
                // console.log("Form>>>>>>", this.$refs.form);
                // console.log("Form reset>>>>>>", this.$refs.form.reset());
                this.disdata = false
                this.disdesignation=false
                this.rjctBnkDilg=false
                this.hstryBnkDilg=false
                this.shwApprvBtn=false
                this.imprtdate=''
                // let todayDate = Date.now();
                // todayDate = moment(todayDate).format("DD-MM-YYYY");
                // this.imprtdate = moment(todayDate,'DD/MM/YYYY').format('YYYY-MM-DD');
                // console.log("this.imprtdate",this.imprtdate)
                this.select_bank=''
                this.installmentpremvalid = []
                this.accountName=''
                this.accDesc=''
                this.gl=''
                this.accNo=''
                this.seltdPymtMode=[],
                 this.seltdPymtMode=[0],
                this.accType='Add New'
                setTimeout(this.setImprtdate,700)
                // this.showLoader('Loading', true);
                this.addBnkDilg=true
        },
            close_frm(){
                this.addBnkDilg=false
            },
            close_rjctfrm(){
                this.rjctBnkDilg=false
            },
            close_hstryFrm(){
                this.hstryBnkDilg=false
                this.historyapprovaldata = []
                this.approvalhistoryheaderdata = []
                this.recordcode = ''
            },
            seldPymtMode(){
                console.log(this.seltdPymtMode);
            },
            selecBank(item){
             console.log("Selected bank",item);
            },
            
            
            subtFrAppvl(){
                // console.log("Client id EMPTY",this.installmentpremvalid)
                // return this.installmentpremvalid.length > 0

                    if(this.installmentpremvalid.length > 0 || this.accNo ===undefined || this.accNo === null||this.accNo === ""||this.select_bank === undefined || this.select_bank === null || this.select_bank === ""||this.gl === undefined || this.gl === null || this.gl === ""){
                        this.showToast('Please fill all Required fields', this.TOST().WARNING);
                        this.$refs.form.validate();
                        // this.installmentpremvalid =  [ !!this.accNo || 'This field is required' ]
                        return     
                    }
                   
                    let filteredArr=[]
                    console.log(this.select_bank);
                    const isInArray = this.seltdPymtMode.includes(0);
                    console.log(isInArray,"isInArray");

                    if(isInArray===false){
                        this.showToast('Payment Mode "BS" is Mandatory', this.TOST().WARNING);
                        return
                    }
                    
                    this.seltdPymtMode=this.seltdPymtMode.sort((a, b) => a - b);
                    console.log("Sorted chips",this.seltdPymtMode);
                  
                    for(let j=0;j<this.seltdPymtMode.length;j++){

                        filteredArr.push(this.avlblPymtModes[this.seltdPymtMode[j]]);

                    }

                    console.log("inner Values", filteredArr);
                    let PaymentModeName = filteredArr.map(({ PaymentModeName }) => PaymentModeName)
                    
                    console.log("PaymentModeName array as string", PaymentModeName);
                   

                    // let frmdata={
                    //     BankAcNo:this.accNo,
                    //     BankId: 39,
                    //     BankName: this.accountName,
                    //     Country: "INDIA",
                    //     Description: this.accDesc,
                    //     HouseOfBank:this.select_bank,
                    //     PayModeId: 0,
                    //     PaymentModeName: PaymentModeName,
                    //     Status: "Approval Pending",
                    //     GL: this.gl,
                    // }
                
                let self=this
                self.showLoader('Loading', true);
                let demodata=''

                if(this.accType==='Edit'){

                    demodata={

                        HouseOfBank: self.select_bank,
                        BankName: self.accountName,
                        BankAcNo : parseInt(self.accNo),
                        BankId:self.BankId,
                        Description:self.accDesc,
                        GlCode1 : self.gl,
                        GlCode2: self.gl2===undefined?"":self.gl2,
                        GlCode3: self.gl3===undefined?"":self.gl3,
                        DefaultOpeningBalance : 1.1,
                        TransactionStartDate : moment(self.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
                        UserId : self.User_id,
                        PageName : "updateBankMaster", 
                        PayModeType : PaymentModeName
                    }

                }else{

                    demodata={

                        HouseOfBank: self.select_bank,
                        BankName: self.accountName,
                        BankAcNo : parseInt(self.accNo),
                        BankId :0,
                        Description:self.accDesc,
                        GlCode1: self.gl,
                        GlCode2: self.gl2===undefined?"":self.gl2,
                        GlCode3: self.gl3===undefined?"":self.gl3,
                        DefaultOpeningBalance : 1.1,
                        TransactionStartDate : moment(self.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
                        UserId : self.User_id,
                        PageName : "addBankMaster", 
                        PayModeType : PaymentModeName
                    }

                }
                
              
                console.log("from demodata--------->",demodata);
                //this.GetBnkMstrHstryDta.unshift(frmdata)

                        // var today = new Date();
                        // var dd = today.getDate();

                        // var mm = today.getMonth()+1; 
                        // var yyyy = today.getFullYear();
                        // if(dd<10) 
                        // {
                        //     dd='0'+dd;
                        // } 

                        // if(mm<10) 
                        // {
                        //     mm='0'+mm;
                        // } 
                        // today = mm+'-'+dd+'-'+yyyy;
                        // console.log(today);
                        // today = mm+'/'+dd+'/'+yyyy;
                        // console.log(today);
                        // today = dd+'-'+mm+'-'+yyyy;
                        // console.log(today);


                    axios({
                        method: "post",
                        url:
                            this.API_Service_admin()+"/MasterSetupAPI/api/BankMaster/AddUpdateBankMaster",
                        headers: {
                            "Content-Type": "application/json",
                            "cache-control": "no-cache",
                            "postman-token": "734f5baa-ed30-2df8-b101-b748f9cb858a",
                        },
                        data: demodata,
                        // {
                            
                        //     HouseOfBank: self.select_bank,
                        //     BankName: self.accountName,
                        //     BankAcNo : self.accNo,
                        //     GlCode : self.gl,
                        //     DefaultOpeningBalance : 1.1,
                        //     TransactionStartDate : moment(new Date()).format("DD-MM-YYYY"),
                        //     UserId : 1,
                        //     PageId : 10,
                        //     PayModeType : []

                        // },
                    })
                    
                    .then(function (response) {
                        console.log("Add Bank master Response>>>>>>", response);
                        self.showLoader('Loading', false);

                        if(!response.data || response.data.length == 0){
                            console.log("Array is either empty or does not exist")
                            self.showToast("Database Error",self.TOST().ERROR);
                            return
                        }

                        if(response.data[0].Status.toLowerCase()==="fail"){
                           self.showToast(response.data[0].Message, self.TOST().WARNING);
                           return
                        }

                        if(self.accType==='Edit'){
                            self.showToast("Record Updated Successfully", self.TOST().SUCCESS);
                        }else{
                            self.showToast("New Record Added Successfully", self.TOST().SUCCESS);
                        }
                        
                        // self.getGlblPgeDta()
                        self.GetBankMasterHistory();
                        // self.GetAllFiltersData()
                        self.addBnkDilg=false
                        
                    })
                    .catch(function (error) {
                        console.log("Filter APi Response>>>>>>", error);
                    });

            },


                editBnkAcc(item){
                console.log("item", item)
                this.disdata = true;
                this.disdesignation=false
                this.shwApprvBtn=false
                this.rjctBnkDilg=false
                this.hstryBnkDilg=false
                this.editedIndex = this.acc_details.indexOf(item)
                console.log("this.avlblPymtModes",this.avlblPymtModes)
                this.addBnkDilg=true
                this.accType='Edit'
                console.log(item)
                let arr = item.PaymentModeName.split(',');
                console.log(arr)
                    let ary = new Array();
                    for(let i = 0;i < this.avlblPymtModes.length; i++){
                        for(let z = 0; z < arr.length; z++)
                        {
                            if(this.avlblPymtModes[i].PaymentModeName == arr[z])
                            {
                            let idx = this.avlblPymtModes.indexOf(this.avlblPymtModes[i]);
                            ary.push(idx);
                            }
                        }
                    }
                console.log("intersectionintersection",ary)

                // var element = {}
                // element.HouseOfBank = item.HouseOfBank;
                // console.log("element",element)
                this.BankId=item.BankId
                this.select_bank=item.HouseOfBank
                this.accountName=item.BankName
                this.accDesc=item.Description
                this.accNo=item.BankAcNo
                this.installmentpremvalid = []
                this.imprtdate=moment(item.TransactionStartDate,'DD/MM/YYYY').format('YYYY-MM-DD');
                this.seltdPymtMode=ary
                this.gl=item.GlCode1
                this.gl2=item.GlCode2
                this.gl3=item.GlCode3
            },

            chkr_seltd(item,tbldta){
                console.log("item clciked",item);
                console.log("Grid Data::",tbldta)
                if(item.title==="View Details"){
                    this.shwApprvBtn=false
                    this.rjctBnkDilg=false
                    this.hstryBnkDilg=false
                    this.viewBnkDtls(tbldta)
                }else if(item.title==="Approve"){
                    this.shwApprvBtn=true
                    this.rjctBnkDilg=false
                    this.hstryBnkDilg=false
                    this.recordcode = tbldta.BankId
                    this.viewBnkDtls(tbldta)
                }else if(item.title==="Reject With Remark"){
                   
                    this.shwApprvBtn=false
                    this.accType='Reject With Remark'
                    this.$refs.rjctform.reset();
                    this.rjctBnkDilg=true
                    this.hstryBnkDilg=false
                    this.recordcode = tbldta.BankId
                    console.log("item clciked",tbldta);
                    this.rjctBankAcNo=tbldta.BankAcNo
                }else if(item.title==="Approval History"){
                    this.shwApprvBtn=false
                    this.accType='Approval History'
                    // this.$refs.hstryform.reset();
                    this.rjctBankAcNo = tbldta.BankAcNo
                    this.recordcode = tbldta.BankId
                    this.gethistory()
                    
                }
                

            },

            gethistory(){
                var self = this;
                
                console.log("BANK ACC NO:",self.rjctBankAcNo)
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
                        BankAcNo: self.rjctBankAcNo,
                        SessionID : 1,
                        RecordType : "bankMasterUpdate",
                        RecordCode : self.recordcode
						// UpdateApprovalActionTypeList : [{
						// 	RecordType : "manualReconUpdate" ,
						// 	RecordCode :  self.recorecode,
						// 	ActionTaken : "approved" ,
						// 	RemarkId : 0 ,
						// 	Remarks  : ''
						// }]

					},
				})
					.then(function (response) {
						console.log("Approval APi Response>>>>>>", response);
						if(response.data.Status === 'Success'){
                            console.log("API SUCCESS::::")
                            
                            self.historyapprovaldata = response.data.HistoryOfBankMasterRecordList
                            self.approvalhistoryheaderdata = response.data.HistoryOfBankMasterRecordList[0]

                            console.log("ALL HISTORY DATA::",self.historyapprovaldata)
                            console.log("Header history data::",self.approvalhistoryheaderdata)
                        
                        }else{
								self.showToast( response.data.Message , self.TOST().ERROR);
                        }

                    self.rjctBnkDilg=false
                    self.hstryBnkDilg=true
					})
					.catch(function (error) {
					self.showLoader('Loading', false);
						console.log("Approval APi Response>>>>>>", error);
					});
            },

            viewBnkDtls(tbldta){
                console.log("item clciked",tbldta);
                this.disdata = true;
                this.disdesignation=true
                this.disdata = true;
                // this.editedIndex = this.acc_details.indexOf(item)
                // console.log("this.avlblPymtModes",this.avlblPymtModes)
                this.addBnkDilg=true
                this.accType='Review'
                // console.log(item)
                this.vwPymtmde = tbldta.PaymentModeName.split(',');
                this.select_bank=tbldta.HouseOfBank
                this.accountName=tbldta.BankName
                this.accDesc=tbldta.Description
                this.accNo=tbldta.BankAcNo
                this.installmentpremvalid = []
                this.imprtdate=moment(tbldta.TransactionStartDate,'DD/MM/YYYY').format('YYYY-MM-DD');
                // this.seltdPymtMode=ary
                this.gl=tbldta.GlCode1
                this.gl2=tbldta.GlCode2
                this.gl3=tbldta.GlCode3

            },
            
            getGlblPgeDta() {
            var self = this;
            self.showLoader('Loading', true);
            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/FilteringData/api/FilterData/getFilteringData",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "e1c95b32-10d8-ed76-b79b-f4ab2b912bb0",
                },
                data: {
                    UserId: self.User_id,
                    PageName : "globalpage",
                    BankAcNo: 0,
                },
            })
            .then(function (response) {

                console.log("Filter APi Response for globalpage >>>>>>", response);
                self.showLoader('Loading', false);

                if(!response.data.FilterDataGlopalPage || response.data.FilterDataGlopalPage.length == 0){
                    console.log("Array is either empty or does not exist")
                    return
                }

                let glblBnkdtls = response.data.FilterDataGlopalPage
                console.log("glblBnkdtls",glblBnkdtls)
                self.$store.commit('SET_BANK_DETAILS_DATA', glblBnkdtls)

            })
            .catch(function (error) {
                console.log("Filter APi Response>>>>>>", error);
            });
        },
            fieldvalidation(value, fieldName) {
	                    console.log('ValUE  FIELD', value, fieldName);
	                    let receiver = /^[A-Za-z0-9 ]+$/;
	                    let targetRegex = /^[0-9 ]+$/;
	                    let nameRegex = /^[A-Za-z ]+$/;
	                    if (fieldName == 'searchcustomerid') {
	                        this.customeridvalid = []
	                        value === '' ? this.customeridvalid.push('This is field required') : ''
	                        value.match(receiver) ? this.customeridvalid.push() : this.customeridvalid.push('Only alphabets and numbers are allowed')
	                    } else if (fieldName == 'searchpolicyid') {
	                        this.policyidvalid = []
	                        value === '' ? this.policyidvalid.push('This is field required') : ''
	                        value.match(receiver) ? this.policyidvalid.push() : this.policyidvalid.push('Only alphabets and numbers are allowed')
	                    } else if (fieldName == 'notificationbody') {
	                        this.bodyvalidationvalidation = []
	                        value === '' ? this.bodyvalidationvalidation.push('This is field required') : ''
	                        value.match(receiver) ? this.bodyvalidationvalidation.push() : this.bodyvalidationvalidation.push('Only alphabets and numbers are allowed')
	                    } else if (fieldName == 'installmentpremium') {
	                        this.installmentpremvalid = []
	                        value === '' ? this.installmentpremvalid.push('This is field required') : ''
	                        value.match(targetRegex) ? this.installmentpremvalid.push() : this.installmentpremvalid.push('Only numbers are allowed')
                        }else if(fieldName == 'productname'){
                            this.productnamevalidation = []
	                        value === '' ? this.productnamevalidation.push('This is field required') : ''
	                        value.match(receiver) ? this.productnamevalidation.push() : this.productnamevalidation.push('Only alphabets and numbers are allowed')
                        }else if(fieldName == 'sumassuredvalid'){
                            this.sumassuredvalidation = []
                            value === '' ? this.sumassuredvalidation.push('This is field required') : ''
	                        value.match(targetRegex) ? this.sumassuredvalidation.push() : this.sumassuredvalidation.push('Only numbers are allowed')

                        }
                        //
                        // productnamevalidation
            },

            getremarktypedata(){
					
                this.remarktypeItms = this.$store.getters.getremarktype.bankmasterremarktype
                console.log("GET Remark Type::",this.remarktypeItms);
		    },
            
        apprve_recrd(txtrcvd){

            console.log("text recieved",txtrcvd)

            let demodata=""
            var self = this;
           
            if(txtrcvd==='approve'){

                demodata={
                    UserId: self.User_id,
                    PageName : "approvalBucketView",
                    SessionID : self.sessionId,
                    BankAcNo : parseInt(self.accNo),
                    UpdateApprovalActionTypeList : [{
                        RecordType : "bankMasterUpdate" ,
                        RecordCode :  self.recordcode ,
                        ActionTaken : "approved" ,
                        RemarkId: 0 ,
                        Remarks : ""
                    }]
                }

            }else if(txtrcvd==='reject'){

                console.log(self.rjctBankAcNo, "rejectBankaCC No")
                console.log(self.remarktype, "remarktype No")

                  if( self.rjctdesc ===undefined || self.rjctdesc=== null||self.rjctdesc === "" || self.remarktype ===undefined || self.remarktype=== null||self.remarktype === ""){
                        this.showToast('Please fill all Required fields', this.TOST().WARNING);
                        this.$refs.rjctform.validate();
                        return     
                    }

                demodata={
                    UserId: self.User_id,
                    PageName : "approvalBucketView",
                    SessionID : self.sessionId,
                    BankAcNo : parseInt(self.rjctBankAcNo),
                    UpdateApprovalActionTypeList : [{
                        RecordType : "bankMasterUpdate" ,
                        RecordCode :  self.recordcode ,
                        ActionTaken : "rejected" ,
                        RemarkId: self.remarktype.RemarksId,
                        Remarks : self.rjctdesc
                    }]
                }

            }

            console.log("demodata recieved",demodata)

           self.showLoader('Loading', true);  
            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/ApprovalAPI/api/ApprovalProcess/UpdateApprovalBucketAction",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "e85889ef-71db-ea7d-eb20-1dcbca9ed7d8",
                },
                data:demodata
            })
            .then(function (response) {
                self.showLoader('Loading', false);
                if(response.data[0].Status==="Success"){
                    console.log("Approve/reject API >>>>>>", response);
                    
                    // self.getGlblPgeDta()
                    self.GetBankMasterHistory();
                    // self.GetAllFiltersData()
                    self.addBnkDilg=false
                    self.rjctBnkDilg=false
                    self.showToast("Record Updated Successfully", self.TOST().SUCCESS);

                }else{
                    self.showToast("Something went Wrong",self.TOST().WARNING);
                    self.addBnkDilg=false
                    self.rjctBnkDilg=false
                }
                
            })
            .catch(function (error) {
                console.log("Filter APi Response>>>>>>", error);
            });

            }

        }
    
}
</script>
<style>
    /* .cust_addbnkAcc-btn .v-btn__content{
        padding: 7px;
    } */
    .bnkAcc-hdr{
        color:#646666; 
        font-family:roboto; 
        font-weight:700

    }
    .bnkAcc-tbl-brdr{
        border:1px solid  #C1C8CC;
    }
    .bnkAcc-td-bdrgt {
        border-right:1px solid #C1C8CC;
    }
    .cust-bnkAcc-tbl table.v-table thead th{
        border-right:1px solid  #C1C8CC !important;
        background-color:#F3FBFB !important;
        color:#1E9690 !important;
        font-family:Roboto !important;
        font-weight:700 !important;
    }
    .cust-bnkAcc-tbl table.v-table thead th:last-child{
        border-right: unset !important;
    }
    .cust-bnkAcc-pgn .v-pagination__navigation{
        box-shadow:unset !important;
        border-radius: unset !important;
        background-color:#FFFFFF !important;
        border:1px solid #DAE1E6 !important
    }
    .cust-bnkAcc-pgn .v-pagination__navigation--disabled{
        background-color:#DAE1E6 !important;
    }
    .cust-bnkAcc-pgn .v-pagination__item{
        box-shadow:unset !important;
        min-width:2rem !important;
        height:2rem !important;
        border-radius: unset !important;
        border:1px solid #DAE1E6 !important
    }
    .cust-bnkAcc-tbl table.v-table tbody td,
    .cust-bnkAcc-tbl table.v-table thead tr{
        height: 40px !important;
    }
    .cust-bnkAcc-tbl table.v-table thead tr:last-child{
         height: unset !important;;
    }

    .cust-bnkAcc-frm .v-text-field .v-input__slot,
     .cust-bnkAcc-frm .v-text-field--outline .v-input__slot {
        min-height: 40px !important;
        display: flex!important;
        align-items: center!important;
        /* border:1px red solid; */
    }

  .cust-bnkAcc-frm .v-textarea.v-text-field--enclosed.v-text-field--single-line textarea {
    margin-top: 0px !important;
    }

    .bnk-txt-tranfrm{
        text-transform: none;
    }
    .bnkAcc-custPointer .v-chip .v-chip__content{
        cursor: pointer !important;
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

.cust-bnk-tile .v-list__tile{
    padding-left:0px !important;
}
    
</style>