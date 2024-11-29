<template>
    <v-app>
		<v-card class="ma-3" style="border:1px solid #C1C8CC">
				<v-layout  style="padding:10px;background-color:#F7F7F7;align-items:center; border-bottom:1px solid #C1C8CC">
						<div >
							<v-text class="body-2" style="color:#646666">Reconciliation Rules</v-text>
						</div>

                        <div v-if="addbuttonshowhide" class="verticalline" style="margin-left:15px;"></div>

                        <div   v-if="addbuttonshowhide" class="addnewrule mr-3" style="margin-left:15px;flex-direction: row;display:flex; align-items:center;">
                            <v-flex class="">
                                <v-icon color="#ffffff">add</v-icon>						
                            </v-flex>
                            <v-flex @click="addnewrulepopup()">
                                <p class="caption font-weight-bold text-xs-center ma-0" style="color:#ffffff">Add New Rule</p>
                            </v-flex>
						</div>
							
				</v-layout>

                <v-layout row justify-space-between align-center style="">
                    <v-layout style="" row  align-center class="pl-1">
                        <v-btn  small class="mr-4" style="background-color:#E46A25;color:#fff">Reset</v-btn>
                        <v-flex xs4 class="mt-4 mr-4">
                            <v-select
                                class="cust-dropdwn-hgt"
                                :items="items"
                                label="Select Transaction Type"
                                solo
                                attach
                            ></v-select>
                        </v-flex>
                        <v-flex xs4 class="mt-4 ">
                            <v-select
                                class="cust-dropdwn-hgt"
                                :items="items"
                                label="Cash"
                                solo
                                attach
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout style="" row  align-center>
                        <v-text class="mr-2 rcnRle-hdr" style="color:#3C3D3D; font-size:14px;">
							<span class="" style="color:#E46A25;">Showing {{fromvalue}}-{{toValu}} </span>out of {{RecnRleLstArr.length}} records
						</v-text>
						<v-divider  class="mx-2" vertical ></v-divider>
						<v-pagination 
                            class="cust-rcnRle-pgn"
                            v-model="pageNumber"
                            color="#152F38"
                            flat
                            @input="nextPage"
                            :length="pages">
                        </v-pagination>
                    </v-layout>
                </v-layout>

                <!-- <v-flex  xs8 mt-3 ml-3 style="display:flex;flex-direction:row;">
					<div class="" style="margin-right:10px;">
						<v-btn  small class="caption" style="background-color:#E46A25;color:#fff">Reset</v-btn>
					</div>

					<v-flex class="mr-3" style="">
						<v-select
                            class="cust-dropdwn-hgt"
							:items="items"
							label="Select Transaction Type"
							solo
						></v-select>
					</v-flex>

					<v-flex class="mr-3" style="">
						<v-select
                            class="cust-dropdwn-hgt"
							:items="items"
							label="Cash"
							solo
						></v-select>
					</v-flex>
                    <v-text class="mr-1 bnkAcc-hdr" style="color:#3C3D3D; font-size:12px;">
							<span class="" style="color:#E46A25;">Showing 1-15</span> out of 75 records
						</v-text>
						<v-divider  class="ma-2" vertical ></v-divider>
						<v-pagination 
                            class="cust-rcnRle-pgn"
                            v-model="pagination.page"
                            color="#152F38"
                            flat
                            :length="pages"></v-pagination>

				</v-flex>
                 -->

                <v-layout>
                    <v-dialog v-model="dialog" persistent>
                        <v-card style="background-color:#F7F7F7" class="pb-2">
                            <v-layout justify-space-between class="align-center pa-2 box-border" style="background-color:#FFFFFF">
                                <div class="align-center ml-3">
                                    <p class="ma-0 text-uppercase" style="color:#646666;font-family:roboto;font-weight:700">{{rleTyp}}</p>
                                </div>
                                <div @click="closepopup()" style="cursor:pointer;">
                                    <v-icon class="ml-2" size="25px">clear</v-icon>
                                </div>
                            </v-layout>
                        <v-form v-model="ruleForm" ref="form">
                            <div style="">
                                <v-card class="pa-3 ma-3">
                                    <v-layout row wrap>
                                        <v-flex class="mr-5" xs3 sm3 md3>
                                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Select Transaction Type</p>
                                            <!-- <div class="cust_dd"> -->
                                                <v-autocomplete 
                                                    :items="Trstype" 
                                                    solo 
                                                    label="Select"
                                                    v-model="trans_type"
                                                    attach
                                                    item-text="paymentModeName"
                                                    item-value="payModeId"
                                                    @change=" exectionOdr(trans_type)"
                                                    :rules="[() => !!trans_type || 'This field is required']"
                                                    :readonly="dsbldChkr"
                                                    ></v-autocomplete >
                                            <!-- </div> -->
                                        </v-flex>

                                        <v-flex class="mr-5 cust-rcnRle-txtbx" xs4 sm3 md3>
                                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Rule ID</p>
                                            <!-- <div class="cust_dd"> -->
                                                <v-text-field
                                                    solo 
                                                    v-model="ruleid"
                                                    label="Auto Generated on Save"
                                                    disabled
                                                    ></v-text-field>
                                            <!-- </div> -->
                                        </v-flex>
                                    
                                        <v-flex class="mr-5" xs4 sm6 md3>
                                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Rule Name</p>
                                            <!-- <div class="cust_dd"> -->
                                                <v-text-field
                                                    :readonly="dsbldChkr"   
                                                    solo 
                                                    label="Rule Name"
                                                    v-model="rulNme"
                                                    :rules="[() => !!rulNme || 'This field is required']"
                                                    >
                                                    </v-text-field>
                                            <!-- </div> -->
                                        </v-flex>

                                        

                                        <v-flex  class="mr-5" xs4 sm6 md3>
                                            <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Select Execution Order</p>
                                            <!-- <div class="cust_dd"> -->
                                                <v-autocomplete  
                                                    :readonly="dsbldChkr"
                                                    :items="exectionOdrArr" 
                                                    solo 
                                                    label="Select"
                                                    v-model="ExOrdNo"
                                                    attach
                                                    item-text="excecutionOreder"
                                                    item-value="excecutionOreder"
                                                    item-disabled="disabled"
                                                    :rules="[() => !!ExOrdNo || 'This field is required']"
                                                    ></v-autocomplete>
                                            <!-- </div> -->
                                        </v-flex>

                                        <v-flex class="mr-5" xs4 md3>
                                        <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Status</p>
                                        
                                                <v-select 
                                                    :readonly="dsbldChkr"
                                                    :items="activelist"  
                                                    solo 
                                                    label="Select"
                                                    v-model="rule_status"
                                                    @change="selectchStatus()"
                                                    item-text="text"
                                                    item-value="value"
                                                    attach
                                                    :rules="[() => !!rule_status || 'This field is required']"
                                                    ></v-select>
                                        
                                        </v-flex>
                                    </v-layout>
                                    <v-layout column style="border: 1px solid #C1C8CC;" class="">
                                        <v-layout row justify-space-between align-center style="border-bottom: 1px solid #C1C8CC;">
                                            <div style="flex:2" class="pl-3">
                                                <p style="color:#646666;font-family:roboto;font-weight:700;" class="ma-0">Rule Builder</p>
                                            </div>
                                            <div style="flex: 2">
                                                <img class="equalimg" src="../../../web/assets/equalicon.png">
                                            </div>
                                            <div style="flex: 1" class="">
                                                <p style="color:#646666;font-family:roboto;font-weight:700;" class="ma-0">Status</p>
                                            </div>
                                        </v-layout>
                                        <v-layout row  justify-space-between style="">
                                            <div class="pa-3" style="flex:2">
                                                <v-layout row justify-start align-center style="" class="mb-1" >
                                                    <div style="border:1px solid #C1C8CC;color:#3C3D3D;border-right:unset"><p class="ma-0 px-4">Source 1</p></div>
                                                    <div><p style="border:1px solid #C1C8CC;background-color:#FEF9F6;color:#E46A25;" class="ma-0 px-4">Bank Statement</p></div>
                                                </v-layout>
                                                <v-btn small round color="#E46A25" style="text-transform:none;" v-if="dsbldChkr===false" dark @click="add_Column()">Add Column <v-icon dark small right>add</v-icon></v-btn>
                                            </div>
                                            <div class="pa-3" style="border-left:1px solid #C1C8CC;flex:2">
                                                <v-layout row justify-start align-center style="" class="mb-1">
                                                    <div style="border:1px solid #C1C8CC;color:#3C3D3D;border-right:unset"><p class="ma-0 px-4">Source 2</p></div>
                                                    <div><p style="border:1px solid #C1C8CC;background-color:#FEF9F6;color:#23B1A9;" class="ma-0 px-4">GC</p></div>
                                                </v-layout>
                                                <v-btn small round color="#23B1A9" style="text-transform:none;" dark  v-if="dsbldChkr===false" @click="add_Column()">Add Column <v-icon dark small right>add</v-icon></v-btn>
                                            </div>
                                            <div  class="pa-3" style="border-left:1px solid #C1C8CC;flex: 1">
                                                <div style=""></div>
                                            </div>
                                        </v-layout>
                                        <v-layout row  justify-space-between style="border-top: 1px solid #C1C8CC" v-for="(item, index) in def_rws" :key="index">
                                            <div class="pa-3" style="flex: 2">
                                               
                                                 <v-layout row justify-space-between align-center style=""  class="mb-3">
                                                    <v-flex xs3>
                                                        <p class="ma-0" style="color:#3C3D3D;font-family: roboto; font-weight: 700">BS Column {{ index + 1}}</p>
                                                    </v-flex>
                                                    <v-flex xs8>
                                                    <v-autocomplete
                                                            :readonly="dsbldChkr"
                                                            :items="BsColmnfltr" 
                                                            item-text="stdColName"
                                                            item-value="stdColGroupMapId" 
                                                            solo 
                                                            label="Select"
                                                            :hide-details = true
                                                            v-model="item.StdColId"
                                                            
                                                            @change="Bsselted(index)"
                                                        ></v-autocomplete>
                                                        <span v-if="item.StdColIdblnk!==false" style="color:#FF5252">This field is required *</span>
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div class="pa-3" style="border-left: 1px solid #C1C8CC;flex:2">
                                                <v-layout row justify-space-between align-center style="" class="mb-3">
                                                    <v-flex xs3>
                                                        <p class="ma-0" style="color:#3C3D3D;font-family: roboto; font-weight: 700">GC Column {{index +1}}</p>
                                                    </v-flex>
                                                    <v-flex xs8>
                                                        
                                                        <v-autocomplete
                                                            :readonly="dsbldChkr"
                                                            :items="GcColmn"
                                                            item-text="gcColName"
                                                            item-value="gcColId" 
                                                            solo 
                                                            label="Select"
                                                            :hide-details = true
                                                            v-model="item.GcColId"
                                                            
                                                            @change="Gcselted(index)" 
                                                            ></v-autocomplete>
                                                            <span v-if="item.GcColIdblnk!==false" style="color:#FF5252">This field is required *</span>                                                        
                                                    </v-flex>
                                                </v-layout>
                                            </div>
                                            <div  class="pa-3" style="border-left:1px solid #C1C8CC;flex: 1">
                                                <v-btn small round color="#D1121B" style="text-transform:none;" dark @click="dlt_colmn(index)" v-if="index!==0">Delete<v-icon small dark >close</v-icon></v-btn>
                                                <div style="" v-if="err===true"><img class="correctwrongimg" src="../../../web/assets/wrongicon.png"></div>
                                                <p class="" style="color:#D1121B;font-family: roboto; font-weight: 700" v-if="err===true">Sample value does not match the required data format *</p>
                                            </div>
                                        </v-layout>   
                                    </v-layout>
                                </v-card>
                                <v-flex @click="SaveRule()"  class="algncenter"   v-if="dsbldChkr===false" style="display: flex;flex: 1;justify-content: center;">
                                    <v-btn
                                        color="#E46A25"
                                        class="white--text"
                                        >
                                        {{btnName}}
                                        <v-icon right dark>save</v-icon>

                                    </v-btn>
                                </v-flex>


                                <v-layout  v-if="shwApprvBtn==true" class="" row justify-space-around align-center style="">
                                    <v-btn dark color="#23B1A9" class="bnk-txt-tranfrm"  @click="apprve_recrd('approve')">
                                        <v-icon dark >check_circle</v-icon>
                                        <v-divider vertical dark class="ml-2 mr-2"></v-divider>Approve
                                    </v-btn>
                                </v-layout>

                                

                            </div>
                        </v-form>
                        
                        </v-card>
                        
                    </v-dialog>
                </v-layout>

                
                 <!-- Reject Dialog box -->
                <v-layout>
                    <v-dialog v-model="rjctBnkDilg" persistent max-width="650px">
                        <v-card color="#F7F7F7" class="pb-2">
                            <v-layout justify-space-between  class="" style="flex:1;background-color:#FFFFFF;box-shadow: 0px 3px 5px #00000029;">
                                <v-card-title class="pa-0 pl-3 bnkAcc-hdr text-uppercase font-weight-bold" style="color:#646666;">{{this.rleTyp}}</v-card-title>
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

                                    <v-flex xs4 sm6 md5 class="cust-bnkAcc-frm mt-3 mb-3">
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
                                <v-card-title class="pa-0 pl-3 bnkAcc-hdr text-uppercase font-weight-bold"  style="color:#646666;">{{this.rleTyp}}</v-card-title>
                                <div style="border-left:1px solid #C1C8CC;" @click="close_hstryFrm()">
                                    <v-icon style="cursor: pointer;" class="pa-2" >close</v-icon>
                                </div>
                            </v-layout>
                            <!-- <v-form v-model="bankRjctForm" ref="hstryform"> -->
                                <v-card class="ma-3 mb-0 pb-2" color="#F7F7F7">
                                   <v-card color="#FFFFFF" class="pa-3"> 
                                        <v-layout class="">
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3">
                                                <v-text>Rule Name</v-text>
                                                <v-text color="#10242B" class="font-weight-bold text-no-wrap">{{approvalhistoryheaderdata.RuleName}}</v-text>
                                            </v-layout>
                                            <v-layout column class="mr-3">
                                                <v-text>Rule Code</v-text>
                                                <v-text color="#10242B" class="font-weight-bold text-no-wrap">{{approvalhistoryheaderdata.RuleCode}}</v-text>
                                            </v-layout>
                                            <!-- <v-layout column class="">
                                                <v-text>Account Number</v-text>
                                                <v-text color="#10242B" class="font-weight-bold">155258284822</v-text>
                                            </v-layout> -->
                                        </v-layout>
                                    </v-card>
                                    <v-card class="ma-3 pa-2" v-for="(item,index) in historyapprovaldata" :key="index">
                                        <v-layout class="">
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2 pl-1">
                                                <v-text class="font-weight-bold">Date</v-text>
                                                <v-text color="#10242B" >{{item.UpdatedOn}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2">
                                                <v-text class="font-weight-bold">Event</v-text>
                                                <v-text color="#10242B" >{{item.ActionTaken}}</v-text>
                                            </v-layout>
                                            <v-layout column class="bnkAcc-td-bdrgt mr-3 pr-2">
                                                <v-text class="font-weight-bold">User</v-text>
                                                <v-text color="#10242B" >{{item.UserName}}</v-text>
                                            </v-layout>
                                            <v-layout column class="">
                                                <v-text class="font-weight-bold">Remarks</v-text>
                                                <v-text color="#10242B">{{item.UserRemarks}}</v-text>
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
                

                    <v-flex xs12 class=" cust-rcnRle-tbl"  style="">
                        <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="paginatedData"
                            v-bind:pagination.sync="pagination"
                            hide-actions
                            item-key="id"
                            class="elevation-1 rcnRle-tbl-brdr">
                          
                            <template slot="items" slot-scope="props">
                                
                            <tr>
                               
                                <td class="rcnRle-td-bdrgt">{{props.item.RuleId |checkdata}} </td>
                                <td class="rcnRle-td-bdrgt">{{props.item.RuleName|checkdata}}</td>
                                <!-- <td class="">{{props.item.bankaccount}}</td> -->
                                <td class="rcnRle-td-bdrgt">{{props.item.TransactionType|checkdata}}</td>
                                <td class="rcnRle-td-bdrgt">{{props.item.ExeOrder|checkdata}}</td>
                                <td class="rcnRle-td-bdrgt">{{props.item.CreatedOn|checkdata}}</td>
                                <td class="rcnRle-td-bdrgt">{{props.item.UpdatedOn|checkdata}}</td>
                                <td class="rcnRle-td-bdrgt">{{props.item.RemarkType|checkdata}}</td>
                                <td class="rcnRle-td-bdrgt">{{props.item.UserRemarks|checkdata}}</td>

                                <td class="rcnRle-td-bdrgt" 
                                    :style="props.item.ApprovalStatus.toLowerCase()==='approved'?{color:'#1E9690' }:props.item.ApprovalStatus.toLowerCase()==='rejected'?{color:'#D1121B' }:{color:'#E46A25' }" 
                                    style="font-weight: 700; text-transform: capitalize;">
                                    {{props.item.ApprovalStatus | checkdata}}
                                </td>
                                <!-- <td class=" approvalfnt font-weight-bold rcnRle-td-bdrgt" style="text-transform: capitalize">{{props.item.ApprovalStatus}}</td> -->
                                <!-- <td class="rcnRle-td-bdrgt" style="color:#E46A25;font-weight: 700; text-transform: capitalize;" v-if="props.item.ApprovalStatus.toLowerCase()==='created'">{{props.item.ApprovalStatus}}</td>
                                <td class="rcnRle-td-bdrgt" style="color:#1E9690;font-weight: 700; text-transform: capitalize;" v-if="props.item.ApprovalStatus.toLowerCase()==='approved'">{{props.item.ApprovalStatus}}</td>
                                <td class="rcnRle-td-bdrgt" style="color:#D1121B;font-weight: 700;text-transform: capitalize;" v-if="props.item.ApprovalStatus.toLowerCase()==='rejected'">{{props.item.ApprovalStatus}}</td> -->
                                <td class="activestatus font-weight-bold rcnRle-td-bdrgt">{{props.item.ActiveStatus === true?"Active":"Inactive"}}</td>
                                <td class="">
                                    <v-layout >
                                    <v-icon    v-if="editbuttonshowhide" small class="mr-2" @click="editRcnRle(props.item)">edit</v-icon>
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
                                        <v-btn color="#1E9690" slot="activator" icon small dark v-if="actionbuttonshowhide">
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
                                    </v-layout>
                                </td>

                                
                            </tr>
                            </template>
                          
            
                        </v-data-table>
                    </v-flex>
	
	
			<!-- </v-layout> -->
		</v-card>
    </v-app>
    
</template>
<script>
import axios from 'axios';
import moment from 'moment';
export default {
    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Reconciliation Rules');
        this.User_id = this.$store.state.agentDetails.userId;
        this.sessionId = this.$store.state.agentDetails.sessionId;
        this.GetReconRuleDetails();
        this.GetAllFiltersData();
         this.getremarktypedata();

        let menulist = this.$store.getters.getDetamenulistils
            // let manualrecondata = menulist[2]
            console.log("manual menu LIST::",menulist);
            for(let i=0;i<menulist.length;i++){
            	if(menulist[i].menuName === 'reconRules'){
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
            	if(menulist[i].menuName === 'reconRules'){
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
            	if(menulist[i].menuName === 'reconRules'){
            		if(menulist[i].edit){
            			this.editbuttonshowhide = true
            			console.log("ACTION BUTTON TRUE",this.editbuttonshowhide)
            		}else{
            			this.editbuttonshowhide = false
            			console.log("ACTION BUTTON False",this.editbuttonshowhide)
            		}
            	}
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
        }
    },
    
    computed: {
        // pages () {
        // return this.pagination.rowsPerPage ? Math.ceil(this.RecnRleLstArr.length / this.pagination.rowsPerPage) : 0
        // },

        pages () {

            console.log(this.size ? Math.ceil(this.RecnRleLstArr.length / this.size) : 0)
            return this.size ? Math.ceil(this.RecnRleLstArr.length / this.size) : 0
        },

        pageCount() {
            let l = this.RecnRleLstArr.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedData() {
            const start = this.pageNumber * this.size - this.size,
            end = start + this.size;
            console.log(start,end,"start End")

            if(!this.RecnRleLstArr || this.RecnRleLstArr.length == 0){
                this.fromvalue=0
            }else{
                this.fromvalue=start+1;
            }

           
            if(this.RecnRleLstArr.length <this.size){
                this.toValu=this.RecnRleLstArr.length
            }else if(this.RecnRleLstArr.length <end){
                this.toValu=this.RecnRleLstArr.length
            }else{
                this.toValu=end
            }

            console.log(this.fromvalue,this.toValu,"this.fromvalue this.toValu")
            return this.RecnRleLstArr.slice(start, end);
        }
    },

    data() {
            return {
                 pagination: {
                    rowsPerPage:15
                },
                pageNumber: 1,
                size: 15,
                remarktypeItms:[],
                actionbuttonshowhide:false,
                addbuttonshowhide:false,
                editbuttonshowhide:false,
                remarktype:'',
                shwApprvBtn:false,
                dsbldChkr:false,
                Nature:["Collection", "Payment", "Investment"],
                rjctdesc:'',
                rjctBankAcNo:"",
                rjctBnkDilg:false,
                hstryBnkDilg:false,
                bankRjctForm:false,
                fromvalue:'',
                toValu:'',
                selected:'',
                houseOfBank:'',
                User_id:'',
                sessionId:'',
                ruleForm:false,
                ruleid:'',
                Trstype:[],
                rulExInfo:[],
                exectionOdrArr:[],
                RcnRleBsGcDtaLst:[],
                err:false,
                ExOrdNo:'',
                rulNme:'',
                rulcde:0,
                trans_type:'',
                // def_rws:[ 
                //     {
                //         GcCol_arr:[{GcColId:'',GcColIdblnk:false}],
                //         BsCol_arr:[{StdColId:'',StdColIdblnk:false}]
                //     } 
                // ],
                // GcCol_arr:[{Gc_Slctd:''}],
                // BsCol_arr:[{BS_Slctd:''}],
                def_rws:[{
                    GcColId:'',StdColId:'',GcColIdblnk:false,StdColIdblnk:false
                }],
                BsColmn:[],
                BsColmnfltr:[],
                BS_Slctd:'',
                GcColmn:[],
                Gc_Slctd:'', 
                newarr:[],
                RecnRleLstArr:[],
                AddUpdateRuleSetList:[],
                rule_status:'',
                gccolumlist:["PYMT_CHK_NO","CASH_CHK_NO"],
                bscolomlist:["CASH","Cheque","NFT"],
                despositelist:["DEPOSIT_SLIP_NO"],
                bscolumn2list:["Deposit Slip","Cheque Slip"],
                applicatiolist:["APPLICATION NO."],
                gccolom3list:["RECEIPT_TOTAL_AMT","BALANCE_TOTAL_AMT"],
                activelist:[{text:'InActive',value:"0"},{text: 'Active',value:"1"}],
                bankAccNo:'',
                executionorderlist:["1","2","3","4","5","6"],
                transactiontype:["Cash","NFT","UPI"],
                historyapprovaldata :[],
                approvalhistoryheaderdata : [],
                 bankList: [
					"HDFC Bank","SBI Bank","ICICI Bank","BOI Bank"
                    ],
                accoutnumberlist:[
                    "2345923939123123","3944848388121234","8384828888323434","3231232123423432"
                ],
                rulelist:[
                    "RLCS0301006","RLCS0301008","RLCS0301009","RLCS03010010"
                ],
                dialog:false,
                rleTyp:"Add New Rule",
                btnName:"Save Rule",
                shwApprvBtn:false,
                rjctRuleId:"",

                headers: [

                    { text: 'Rule ID',sortable: false,value: 'ruleid'},
                    { text: 'Rule Name', value: 'rulename',sortable: false },
                    // { text: 'Bank Account', value: 'bankaccount' },
                    { text: 'Transaction Type', value: 'transactiontype',sortable: false },
                    { text: 'Execution Order', value: 'exeorder', sortable: false},
                    { text: 'Created On', value: 'createdon',sortable: false },
                    { text: 'Updated On', value: 'updatedon', sortable: false },
                    { text: 'Remark Type', value: 'RemarkType',sortable: false },
                    { text: 'Remark Description', value: 'RemarkDescription',sortable: false },
                    { text: 'Approval Status', value: 'approvalstatus',sortable: false },
                
                    { text: 'Active Status', value: 'activestatus' ,sortable: false},
                    { text: 'Action', value: 'action',sortable: false }
                ],

                chkr_items: [
                    { title: 'View Details', icon:'highlight',color:"#646666"},
                    { title: 'Approve', icon:'check_circle',color:"#1E9690" },
                    { title: 'Reject With Remark' , icon:'cancel',color:"#D1121B"},
                    { title: 'Approval History' , icon:'info',color:"#E46A25"}
                ],


                desserts: [
					{
						
						ruleid: 'RLCS0301001',
						rulename: 'ICICI Cash rule 1',
						bankaccount: 'ICICI Bank (025288294)',
						transactiontype: 'Cash',
						exeorder: '1',
						createdon: '8/5/20',
                        updatedon:'8/5/20',
                        approvalstatus:'Approved',
                        activestatus:'Active',
                        action:'View'
					},
					{
						
						ruleid: 'RLCS0301001',
						rulename: 'ICICI Cash rule 1',
						bankaccount: 'ICICI Bank (025288294)',
						transactiontype: 'Cash',
						exeorder: '1',
						createdon: '8/5/20',
                        updatedon:'8/5/20',
                        approvalstatus:'Approved',
                        activestatus:'Active',
                        action:'View'
                    },
                    {
						
						ruleid: 'RLCS0301001',
						rulename: 'ICICI Cash rule 1',
						bankaccount: 'ICICI Bank (025288294)',
						transactiontype: 'Cash',
						exeorder: '1',
						createdon: '8/5/20',
                        updatedon:'8/5/20',
                        approvalstatus:'Approved',
                        activestatus:'Active',
                        action:'View'
                    },
                    {
						
						ruleid: 'RLCS0301001',
						rulename: 'ICICI Cash rule 1',
						bankaccount: 'ICICI Bank (025288294)',
						transactiontype: 'Cash',
						exeorder: '1',
						createdon: '8/5/20',
                        updatedon:'8/5/20',
                        approvalstatus:'Approved',
                        activestatus:'Active',
                        action:'View'
                    },
                    {
						
						ruleid: 'RLCS0301001',
						rulename: 'ICICI Cash rule 1',
						bankaccount: 'ICICI Bank (025288294)',
						transactiontype: 'Cash',
						exeorder: '1',
						createdon: '8/5/20',
                        updatedon:'8/5/20',
                        approvalstatus:'Approved',
                        activestatus:'Active',
                        action:'View'
                    },
                    {
						
						ruleid: 'RLCS0301001',
						rulename: 'ICICI Cash rule 1',
						bankaccount: 'ICICI Bank (025288294)',
						transactiontype: 'Cash',
						exeorder: '1',
						createdon: '8/5/20',
                        updatedon:'8/5/20',
                        approvalstatus:'Approved',
                        activestatus:'Active',
                        action:'View'
                    },
                    {
						
						ruleid: 'RLCS0301001',
						rulename: 'ICICI Cash rule 1',
						bankaccount: 'ICICI Bank (025288294)',
						transactiontype: 'Cash',
						exeorder: '1',
						createdon: '8/5/20',
                        updatedon:'8/5/20',
                        approvalstatus:'Approved',
                        activestatus:'Active',
                        action:'View'
					}
                ]
            }
    },

    methods:{

        GetReconRuleDetails(){
            let self= this
            self.showLoader('Loading', true);
            self.RecnRleLstArr=[]
            axios({
                method: "post",
                url:
                    self.API_Service_admin() +"/ReconRuleAPI/api/AddUpdateRule/GetReconRuleDetails",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "27292bc5-b419-c313-e8c7-e2c66d129002",
                },
                data: {
                    UserId: self.User_id,
                    PageName:"reconRulesView",
                    SessionId: self.sessionId,
                },
            })
            .then(function (response) {
                console.log("Filter APi Response>>>>>>", response);
                self.showLoader('Loading', false);
                if(!response.data.ReconRuleList || response.data.ReconRuleList.length == 0){
                    // console.log("Array is either empty or does not exist")  
                    self.showToast("No Records Found",self.TOST().WARNING);
                    return
                }
                self.RecnRleLstArr=response.data.ReconRuleList
                self.RcnRleBsGcDtaLst=response.data.ReconRuleBsGcDataList

            })
            .catch(function (error) {
                console.log("Filter APi Response>>>>>>", error);
            });
        },

        exectionOdr(e){
            
            console.log(e,  "Payement mode selected")
            
            console.log(this.rulExInfo,  "rulExInfo")
            this.exectionOdrArr=[]
            let rulemtch=[]
            this.ExOrdNo=""

            rulemtch = this.rulExInfo.filter(function (item) {
                return item.payModeId === e;
            });
            

            rulemtch.map((itm)=>{
                this.exectionOdrArr.push({
                    ...itm,
                    disabled:itm.availableToCreate===0?true:false
                })
            })
            console.log(this.exectionOdrArr,  "this.exectionOdrArrs")

            for(let i=0; i<this.def_rws.length; i++ ){
                this.def_rws[i].StdColId = ""
                // this.def_rws[i].StdColIdblnk=true
                this.$forceUpdate()
            } 
            this.BsColmnfltr=[]
            this.BsColmnfltr = this.BsColmn.filter(function (item) {
                return item.payModeId === e;
            });
        },

        addnewrulepopup(){
            // console.log("OPEN DAILOG")
            this.$refs.form.reset();
            this.dsbldChkr=false,
            this.rjctBnkDilg=false
            this.hstryBnkDilg=false
            this.shwApprvBtn=false
            this.trans_type =""
            this.ruleid = ""
            this.rleTyp="Add New Rule"
            this.btnName="Save Rule"
            this.rulNme = ""
            this.rulcde=0
            this.ExOrdNo =""
            this.rule_status ="0"
            // this.GetAllFiltersData()
            this.def_rws=[]
            this.def_rws=[
                {
                    GcColId:'',
                    StdColId:'',
                    GcColIdblnk:false,
                    StdColIdblnk:false
                }
            ]
            this.BsColmnfltr=[]
            // this.def_rws=[ 
            //     {
            //         GcCol_arr:[{GcColId:'',GcColIdblnk:false}],
            //         BsCol_arr:[{StdColId:'',StdColIdblnk:false}]
            //     } 
            // ],
            this.dialog = true
        },

        nextPage(page) {
            this.pageNumber = page;
        },

        closepopup(){
            this.dialog = false
          
        },
        selectchStatus(){
           console.log("Rule Status--->",this.rule_status);
        },
        add_Column(){
            
            let x= this.def_rws.length
            // this.def_rws.push(
            //     {
            //         GcCol_arr:[{GcColId:'',GcColIdblnk:false}],
            //         BsCol_arr:[{StdColId:'',StdColIdblnk:false}]
            //     }
            // )
           this.def_rws.push({
               GcColId:'',
               StdColId:'',
               GcColIdblnk:false,
               StdColIdblnk:false
           })
        },

        dlt_colmn(id){
            this.def_rws.splice(id,1)
        },

        add_GcColumn(gc_idx){
           this.def_rws[gc_idx].GcCol_arr.push({GcColId:'',GcColIdblnk:false})
        },

        dlte_GcColumn(indx,gcidx){
            this.def_rws[indx].GcCol_arr.splice(gcidx,1)
            console.log("Gc_Slctd--->",this.def_rws);
        },

        add_BsColumn(bs_idx){
            this.def_rws[bs_idx].BsCol_arr.push({StdColId:'',StdColIdblnk:false})
        },
        dlte_BsColumn(indx,bsidx){
            this.def_rws[indx].BsCol_arr.splice(bsidx,1)
        },

        Gcselted(index){
            this.def_rws[index].GcColIdblnk= false
            this.$forceUpdate()
        },
        Bsselted(index){
            this.def_rws[index].StdColIdblnk= false
            this.$forceUpdate()
        },
        
        SaveRule(){

            console.log("Gc_Slctd--->",this.def_rws)

           
            let checkBlank= false
            let self=this
            if(this.trans_type ===undefined || this.trans_type === null||this.trans_type === ""||this.rulNme === undefined || this.rulNme === null || this.rulNme === ""||this.ExOrdNo === undefined || this.ExOrdNo === null || this.ExOrdNo === ""||this.rule_status === undefined || this.rule_status === null || this.rule_status === ""){ 
                this.$refs.form.validate();
                checkBlank= true 
            }

            // for(let i=0;i<self.def_rws.length;i++){
            //     for(let j=0;j<self.def_rws[i].GcCol_arr.length;j++){
            //         if(self.def_rws[i].GcCol_arr[j].GcColId===''){
            //             self.def_rws[i].GcCol_arr[j].GcColIdblnk=true
            //             self.$forceUpdate()
            //             checkBlank= true
            //         }
            //     }
            //     for(let k=0;k<self.def_rws[i]. BsCol_arr.length;k++){
            //         if(self.def_rws[i].BsCol_arr[k].StdColId===''){
            //             self.def_rws[i].BsCol_arr[k].StdColIdblnk=true
            //             self.$forceUpdate()
            //             checkBlank= true
            //         }
            //     }
            // }
            for(let i=0;i<self.def_rws.length;i++){
                if(self.def_rws[i].GcColId===''){
                    self.def_rws[i].GcColIdblnk=true
                    self.$forceUpdate()
                    checkBlank= true
                }
               if(self.def_rws[i].StdColId===''){
                    self.def_rws[i].StdColIdblnk=true
                    self.$forceUpdate()
                    checkBlank= true
                }

            }

            if(checkBlank===true){
                console.log("checkmanFld>>>>>>>>", checkBlank)
                this.showToast('Please fill all Required fields', this.TOST().WARNING);
                return
            }
            //  return
            // self.grouparr()
            self.AddUpdateRuleSetList=[];
            self.def_rws.map((itm,index)=>{
                self.AddUpdateRuleSetList.push({
                    RuleId:self.btnName==="Edit"?self.ruleid:0,
                    RuleCode:this.rulcde,
                    RuleName:self.rulNme,
                    RuleExcecutionOrder:parseInt(self.ExOrdNo),
                    ExactMatchActStaId:1,
                    ProbableMatchActStaId:1,
                    GcMinDuration:1,
                    GcMaxDuration:1,
                    BankMinDuration:1,
                    BankMaxDuration:1,
                    PayModeId:self.trans_type,
                    RuleColExecutionOrder:index+1,
                    IsActive:parseInt(self.rule_status),
                    stdColGroupMapId:itm.StdColId,
                    GcColId:itm.GcColId
                });
            })
            console.log("AddUpdateRuleSetList--->",self.AddUpdateRuleSetList);

            // return
            let formData={
                UserID : self.User_id,
                PageName : self.btnName==="Edit"?"updateReconRule":"addReconRule",
                SessionId : JSON.stringify(self.sessionId),
                AddUpdateRuleSetList: self.AddUpdateRuleSetList
                
            }
            console.log("formData--------->",formData);
            
            // return
            // self.dialog = false
            self.showLoader('Loading', true);
            axios({
                method: "post",
                url:
                    self.API_Service_admin()+"/ReconRuleAPI/api/AddUpdateRule/AddUpdateRuleMethod",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "9fe0db06-3433-27df-2ef5-9c1c66d6dc66",
                },
                data: formData,
            })
            .then(function (response) {
                console.log("ReconRule APi Response>>>>>>", response); 
                self.showLoader('Loading', false);
                if(response.data.Status.toLowerCase()==="success"){
                    if(self.btnName==="Edit"){
                        self.showToast("Rule Updated Successfully", self.TOST().SUCCESS);
                        self.GetReconRuleDetails();
                        self.GetAllFiltersData()
                        self.dialog = false
                    }else{
                        self.showToast("New Rule created Successfully", self.TOST().SUCCESS);
                        self.GetReconRuleDetails();
                        // self.GetAllFiltersData()
                        self.dialog = false
                    }  
                }else if(response.data.Status.toLowerCase()==="fail"){
                    self.showToast(response.data.Message, self.TOST().WARNING);   
                }else{
                    self.showToast("Something went wrong", self.TOST().ERROR);
                    self.dialog = false
                }      
            })
            .catch(function (error) {
                console.log("Filter APi Response>>>>>>", error);
            });
            
        },

        editRcnRle(item){

            console.log("item", item)
            this.rleTyp="Edit Rule",
            this.dsbldChkr=false,
            this.rjctBnkDilg=false
            this.hstryBnkDilg=false
            // this.GetAllFiltersData()
            console.log("this.Trstype", this.Trstype)
            let editTransTyp=this.Trstype.filter(function (e) {
                return e.paymentModeName === item.TransactionType;
            });
            console.log("editTransTyp", editTransTyp)

            // this.exectionOdr(editTransTyp[0].payModeId)
            this.trans_type =editTransTyp[0].payModeId
            this.ruleid = item.RuleId
            this.rulNme = item.RuleName
            this.rulcde=item.RuleCode
            
            this.exectionOdr(editTransTyp[0].payModeId)
            let tempExOrdNo=[]
            tempExOrdNo=this.exectionOdrArr.filter(function (e) {
                console.log("inside execution order",e)
                return e.excecutionOreder === item.ExeOrder.toString();
            });
            console.log("tempExOrdNo", tempExOrdNo)


            this.ExOrdNo =tempExOrdNo[0].excecutionOreder
            this.rule_status =item.ActiveStatus===false?"0":"1"

            let bsGSMatch = this.RcnRleBsGcDtaLst.filter(function (e) {
                return e.RuleId === item.RuleId;
            });
            console.log("bsGSMatch after match", bsGSMatch)

            this.def_rws=[]
            bsGSMatch.map((i) => {
                // console.log("bank names array", bnk);
                this.def_rws.push({
                    GcColId:i.GcColId,
                    StdColId:i.StdColGroupMapId,
                    GcColIdblnk:false,
                    StdColIdblnk:false
                });
            });
            console.log("this.def_rws after match", this.def_rws)
            this.btnName="Edit"
            
            this.dialog = true

        },


        view_RcnRle(item){

            console.log("item", item)
            this.rleTyp="Review Rule",
            this.dsbldChkr=true
            // this.GetAllFiltersData()
            console.log("this.Trstype", this.Trstype)
            let editTransTyp=this.Trstype.filter(function (e) {
                return e.paymentModeName === item.TransactionType;
            });
            console.log("editTransTyp", editTransTyp)

            // this.exectionOdr(editTransTyp[0].payModeId)
            this.trans_type =editTransTyp[0].payModeId
            this.ruleid = item.RuleId
            this.rulNme = item.RuleName
            this.rulcde=item.RuleCode
            
            this.exectionOdr(editTransTyp[0].payModeId)
            let tempExOrdNo=[]
            tempExOrdNo=this.exectionOdrArr.filter(function (e) {
                console.log("inside execution order",e)
                return e.excecutionOreder === item.ExeOrder.toString();
            });
            console.log("tempExOrdNo", tempExOrdNo)


            this.ExOrdNo =tempExOrdNo[0].excecutionOreder
            this.rule_status =item.ActiveStatus===false?"0":"1"

            let bsGSMatch = this.RcnRleBsGcDtaLst.filter(function (e) {
                return e.RuleId === item.RuleId;
            });
            console.log("bsGSMatch after match", bsGSMatch)

            this.def_rws=[]
            bsGSMatch.map((i) => {
                // console.log("bank names array", bnk);
                this.def_rws.push({
                    GcColId:i.GcColId,
                    StdColId:i.StdColGroupMapId,
                    GcColIdblnk:false,
                    StdColIdblnk:false
                });
            });
            console.log("this.def_rws after match", this.def_rws)
            this.btnName="Edit"
            
            this.dialog = true

        },

        grouparr(){

            this.newarr=[];
    		this.def_rws.map(e=>{
          
          		e.BsCol_arr.map(d=>{
              	
                  e.GcCol_arr.map(g=>{
                  	  console.log('d is - > ',d)
                      console.log('g is - > ',g)
                        
                      var myobj = {
                            StdColId:d.StdColId,
                            GcColId:g.GcColId
                        }

                      this.newarr.push(myobj) 

                    })
                })
            })
    	    console.log('New ARRy Combinations--> ',this.newarr)
        },

         chkr_seltd(item,tbldta){
            console.log("item clciked",item);
                if(item.title==="View Details"){
                    this.shwApprvBtn=false
                    this.rjctBnkDilg=false
                    this.hstryBnkDilg=false
                    this.view_RcnRle(tbldta)
                }else if(item.title==="Approve"){
                    this.shwApprvBtn=true
                    this.rjctBnkDilg=false
                    this.hstryBnkDilg=false
                    this.view_RcnRle(tbldta)
                }else if(item.title==="Reject With Remark"){
                    this.shwApprvBtn=false
                    this.rleTyp='Reject With Remark'
                    this.$refs.rjctform.reset();
                    this.rjctBnkDilg=true
                    this.hstryBnkDilg=false
                    console.log("item clciked",tbldta);
                    this.rjctRuleId=tbldta.RuleId
                }else if(item.title==="Approval History"){
                    this.shwApprvBtn=false
                    this.rleTyp='Approval History'
                    // this.$refs.hstryform.reset();
                    this.rjctRuleId=tbldta.RuleId
                   
                    this.gethistory()

                    this.rjctBnkDilg=false
                    this.hstryBnkDilg=true
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
                        RecordType : "ruleMasterUpdate",
                        RecordCode : self.rjctRuleId
						
					},
				})
					.then(function (response) {
						console.log("Approval APi Response>>>>>>", response);
						if(response.data.Status === 'Success'){
                        console.log("API SUCCESS::::",response.data)
                        
                        if(response.data.HistoryOfRuleList.length > 0){
                            self.historyapprovaldata = response.data.HistoryOfRuleList
                            self.approvalhistoryheaderdata = response.data.HistoryOfRuleList[0]

                            self.rjctBnkDilg=false
                            self.hstryBnkDilg=true
                        }
                            
                
                           
                        
                        }else{
								self.showToast( response.data.Message , self.TOST().ERROR);
                        }

                   
					})
					.catch(function (error) {
					self.showLoader('Loading', false);
						console.log("Approval APi Response>>>>>>", error);
					});
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
                    "postman-token": "3f94caee-caf5-9868-c710-b9e10d4d886b",
                },
                data: {
                    UserId: self.User_id,
                    PageName : "addReconRule",
                    BankAcNo: 0,
                },
            })
            .then(function (response) {

                // console.log("Filter APi Response>>>>>>", response);
                if (response.data.ErrorCode === 0){
                    self.showLoader('Loading', false);

                    if(!response.data.RulePagePaymentModeInfo || response.data.RulePagePaymentModeInfo.length == 0){
                        // console.log("Array is either empty or does not exist")
                        self.showToast("No Records Found for transaction Type",self.TOST().WARNING);
                        return
                    }

                    self.Trstype=[]
                    response.data.RulePagePaymentModeInfo.map((tr) => {
                        self.Trstype.push({
                        paymentModeName: tr.paymentModeName,
                        payModeId: tr.payModeId,});
                    })
                    // console.log("Trtype --->",self.Trstype )
                    
                    if(!response.data.RulePageBankSide || response.data.RulePageBankSide.length == 0){
                        // console.log("Array is either empty or does not exist")
                        self.showToast("No Records Found for Rule Page Bank Side",self.TOST().WARNING);
                        return
                    }

                    self.rulExInfo=[]
                    self.rulExInfo= response.data.RulePageExecutionOrderInfo

                    self.BsColmn=[]
                    self.BsColmn=response.data.RulePageBankSide
                    // self.BsColmn = Object.values(
                    //     self.BsColmn.reduce(
                    //         (acc, cur) =>
                    //             Object.assign(acc, { [cur.stdColId]: cur }),
                    //         {}
                    //     )
                    // );

                    // console.log(" Unique paymentModeName's >>>", self.BsColmn);
                    
                    if(!response.data.RulePageGcSide || response.data.RulePageGcSide.length == 0){
                        // console.log("Array is either empty or does not exist")
                        self.showToast("No Records Found for Rule Page Bank Side",self.TOST().WARNING);
                        return
                    }
                    
                    self.GcColmn=[]
                    self.GcColmn=response.data.RulePageGcSide
                    // self.GcColmn.map((e)=>{
                    //     // e.Gc_Slctd=''
                    //     e.BS_Slctd=''
                    // })
                    // console.log("GcColmn====>",self.GcColmn)
                   

                }else {
                    self.showLoader('Loading', false);
                    self.showToast('Something went wrong', this.TOST().ERROR);
                    
	             }
                

            })
            .catch(function (error) {
                // console.log("Filter APi Response>>>>>>", error);
            });
        },
        

        close_rjctfrm(){
            this.rjctBnkDilg=false
        },
        close_hstryFrm(){
            this.historyapprovaldata = []
            this.approvalhistoryheaderdata = []
            this.hstryBnkDilg=false
        },
        getremarktypedata(){
					
            this.remarktypeItms = this.$store.getters.getremarktype.rulemasterremarktype
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
                    BankAcNo : 0,
                    UpdateApprovalActionTypeList : [{
                        RecordType : "ruleMasterUpdate" ,
                        RecordCode :  self.ruleid ,
                        ActionTaken : "approved" ,
                        RemarkId: 0 ,
                        Remarks : ""
                    }]
                }

            }else if(txtrcvd==='reject'){

                console.log(self.rjctRuleId, "reject Rule Id")
                  if( self.rjctdesc ===undefined || self.rjctdesc=== null||self.rjctdesc === "" || self.remarktype ===undefined || self.remarktype=== null||self.remarktype === ""){
                        this.showToast('Please fill all Required fields', this.TOST().WARNING);
                        this.$refs.rjctform.validate();
                        return     
                    }

                demodata={
                    UserId: self.User_id,
                    PageName : "approvalBucketView",
                    SessionID : self.sessionId,
                    BankAcNo : 0,
                    UpdateApprovalActionTypeList : [{
                        RecordType : "ruleMasterUpdate" ,
                        RecordCode :  self.rjctRuleId ,
                        ActionTaken : "rejected" ,
                        RemarkId: 0 ,
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
                    "postman-token": "09420d9d-d9de-bfcb-bff0-066e62ce153e",
                },
                data:demodata
            })
            .then(function (response) {
                console.log("Approve/reject API >>>>>>", response);
                self.showLoader('Loading', false);
                if(response.data[0].Status==="Success"){
                    self.GetReconRuleDetails();
                    self.GetAllFiltersData()
                    self.dialog=false
                    self.rjctBnkDilg=false
                    self.showToast("Record Updated Successfully", self.TOST().SUCCESS);

                }else{
                    self.showToast("Something went Wrong",self.TOST().WARNING);
                    self.dialog=false
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
<style >

.boxwidth{
    width: 97px;
}
.equalimg{
	height: 25px;
	width: 25px;
    position: relative;
    left: -29px;
}

.correctwrongimg{
    height: 20px;
    width: 20px;
}
.cust_dd .v-text-field .v-input__slot,

.firstcolomborder{
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
    border-bottom-color: unset;
    border-bottom-style: unset;
    border-bottom-width: unset;
}

.firstcolomborder2{
    border-top-color: #ffffff;
    border-right-color: #C1C8CC;
    border-left-color: #C1C8CC;
    border-bottom-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
}
.firstcolomborder3{
    border-top-color: unset;
    border-right-color:unset;
    border-left-color: unset;
    border-bottom-color: #C1C8CC;
    border-bottom-style: solid;
    border-bottom-width: 1px;
}
.flx-end{
    justify-content: flex-end!important;
}

.algncenter{
    /* justify-content: center!important;
    align-items: center!important; */
    align-self: center!important;
}
.cust-dropdwn-hgt.v-text-field.v-text-field--solo .v-input__control{
		min-height: 38px;
	}
.tableheader{
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
}
.box-border{
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
}
.approvalfnt{
    color: #1E9690;
}

.activestatus{
    color: #E46A25;
}
.verticalline{
    height: 20px;
    width: 2px;
    background-color: #C1C8CC;
}

.addnewrule{
	width: 125px;
    justify-content: center;
    align-items: center;
    /* height: 25px; */
    /* padding: 4px; */
    padding-top: 2px;
    padding-left: 7px;
    padding-right: 7px;
    padding-bottom: 2px;
    background-color: #E46A25;
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
    border-radius: 25px;
    cursor: pointer;
}

.boxbutton{
    width: 125px;
    justify-content: center;
    align-items: center;
    /* height: 25px; */
    /* padding: 4px; */
    padding-top: 2px;
    padding-left: 7px;
    padding-right: 7px;
    padding-bottom: 2px;
    background-color: #F7F7F7;
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
}

.addnewcolombtn{
	width: 125px;
    justify-content: center;
    align-items: center;
    /* height: 25px; */
    /* padding: 4px; */
    padding-top: 2px;
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 2px;
    background-color: #E46A25;
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
    border-radius: 25px;
    cursor: pointer;
}

.addnewcolombtn2{

    width: 125px;
    justify-content: center;
    align-items: center;
    /* height: 25px; */
    /* padding: 4px; */
    padding-top: 2px;
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 2px;
    background-color: #23B1A9;
    border-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
    border-radius: 25px;
    cursor: pointer;
}

.recon-tbl table.v-table thead th{
		border-top-color:#C1C8CC;
		border-bottom-color: #C1C8CC;
		border-right-color: #C1C8CC;
		border-left-color: #C1C8CC;
		border-width: 1px;
		border-style: solid;
        /* border-right:1px solid  #C1C8CC !important; */
        /* background-color:#F7F7F7 !important;
        color:#10242B !important;
        font-family:Roboto !important;
        font-weight:700 !important; */
    }

    .cust-rcnRle-pgn .v-pagination__navigation{
        box-shadow:unset !important;
        border-radius: unset !important;
        background-color:#FFFFFF !important;
        border:1px solid #DAE1E6 !important
    }
    .cust-rcnRle-pgn .v-pagination__navigation--disabled{
        background-color:#DAE1E6 !important;
    }
    .cust-rcnRle-pgn .v-pagination__item{
        box-shadow:unset !important;
        min-width:2rem !important;
        height:2rem !important;
        border-radius: unset !important;
        border:1px solid #DAE1E6 !important
    }

     .cust-rcnRle-tbl table.v-table thead th{
        border-right:1px solid  #C1C8CC !important;
        background-color:#F7F7F7 !important;
        color:#10242B !important;
        font-family:Roboto !important;
        font-weight:700 !important;
    }
    .cust-rcnRle-tbl table.v-table thead th:last-child{
        border-right: unset !important;
    }
    .cust-rcnRle-tbl table.v-table tbody td,
    .cust-rcnRle-tbl table.v-table thead tr{
        height: 40px !important;
    }
    .cust-rcnRle-tbl table.v-table thead tr:last-child{
         height: unset !important;;
    }
    .rcnRle-tbl-brdr{
        border:1px solid  #C1C8CC;
    }
    .rcnRle-td-bdrgt {
        border-right:1px solid #C1C8CC;
    }
    .rcnRle-hdr{
        color:#646666; 
        font-family:roboto; 
        font-weight:700

    }

    .cust-rcnRle-txtbx .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)>.v-input__control>.v-input__slot{
        background-color: #E6E6E6;
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