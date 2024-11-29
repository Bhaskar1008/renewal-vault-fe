<template>
    <v-app>
        <v-layout column style="background-color: #f7f7f7;" class="ma-2">
            <v-card flat class="mb-0 mt-2" style="border: 1px solid #c1c8cc;">
                <v-layout row justify-space-between style="background-color: #f7f7f7;">
                    <!-- <v-flex style="padding:15px;background-color:#F7F7F7"> -->
                    <v-layout row style="padding:10px;">
                        <v-text
                            class="body-2 mr-5"
                            style=" color: #646666; padding: 10px; font-family: roboto; font-weight: 700;">Data Mapping
                        </v-text>
                        <v-divider vertical></v-divider>
                        <v-btn color="#E46A25" round small dark class="dm-btn ml-4"
                            :class="[showDm===true ? 'activeredbackground_dm': 'inactivewhitebackground_dm']"
                            @click="showDmData()">Data Mapping
                        </v-btn>
                        <v-btn color="#FFFFFF" round small class="dmh-btn"
                            :class="[showDm===false ? 'activeredbackground_dm': 'inactivewhitebackground_dm']"
                            @click="showDmHstry()" >Data Mapping History
                        </v-btn>
                    </v-layout>
                    <v-flex xs2 class="backdropdown_dm"  v-if="showDm===false">
                        <v-menu style="width: 100%; " max-height="500px" offset-y>
                        <template slot="activator" v-slot-activator="{ on }">
                            <v-layout
                                justify-space-between
                                align-center
                                v-on="on"
                                style="">
                                <div class="bandkdivcust_dm">
                                    <img class="bankimg" :src="bnkProfilePic"/>
                                </div>
                                <!-- <v-flex class=""> -->
                                    <v-flex xs7>
                                        <p
                                            class="caption font-weight-bold mb-0 pl-3"
                                            style="color:#10242b;font-family: roboto; font-weight:700;">
                                            {{ nameofbank }}
                                        </p>
                                    </v-flex>
                                    <!-- <v-layout align-center>
                                        <div>
                                            <p class="caption font-weight-bold pl-2"
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
                                    </v-layout> -->
                                <!-- </v-flex> -->

                                <v-flex class="">
                                    <img
                                        class="downarrow"
                                        src="../assets/downArrowDI.png"
                                    />
                                </v-flex>
                            </v-layout>
                        </template>
                        <v-list>
                            <v-text-field class="mx-3" depressed label="Search Bank Name" prepend-inner-icon="search" solo @click.stop v-model="search" clearable @click:clear="clearSearch"></v-text-field>
                            <v-list-tile
                                v-for="(item, index) in filteredItems"
                                :key="index"
                                @click="selectbank(item)"
                            >
                                <v-list-tile-title
                                    >{{ item.houseOfBank }}</v-list-tile-title
                                >
                            </v-list-tile>
                        </v-list>
                     </v-menu>
                   </v-flex>
                </v-layout>
            </v-card>
            <v-card 
                v-if="showDm===true"
                flat 
                class="mt-0 pa-0" 
                style="border: 1px solid #c1c8cc;border-top: unset;background-color: #ffffff;">
                <v-container style="max-width: 500px; padding-top: unset;">
                    <v-stepper
                        v-model="dmSteps"
                        class="dm-custom-stepper"
                        style="box-shadow: none;">
                        <v-stepper-header class="dm-custDivider">
                            <v-stepper-step
                                :complete="dmSteps > 1"
                                edit-icon
                                step="1"
                            >
                                <div
                                    style="
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        justify-content: center;
                                    "
                                >
                                    <v-icon class="dm-header-icon" dark
                                        >cloud_upload</v-icon
                                    >
                                    <div>File Upload</div>
                                </div>
                            </v-stepper-step>

                            <v-divider
                                v-show="dmIcon2 == true"
                                color="#E46A25"
                            ></v-divider>
                            <v-divider
                                v-show="dmIcon2 == false"
                                color="#C1C8CC"
                            ></v-divider>

                            <v-stepper-step
                                :complete="dmSteps > 2"
                                step="2"
                                style="
                                    align-items: center;
                                    justify-content: center;
                                "
                            >
                                <div
                                    style="
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        justify-content: center;
                                    "
                                >
                                    <v-icon
                                        v-show="dmIcon2 == true"
                                        class="dm-header-icon"
                                        dark
                                        >layers</v-icon
                                    >
                                    <v-icon
                                        v-show="dmIcon2 == false"
                                        class="dm-header-icon-grey"
                                        >layers</v-icon
                                    >
                                    <div>Data Mapping</div>
                                </div>
                            </v-stepper-step>

                            <v-divider
                                v-show="dmIcon3 == true"
                                color="#E46A25"
                            ></v-divider>
                            <v-divider
                                v-show="dmIcon3 == false"
                                color="#C1C8CC"
                            ></v-divider>

                            <v-stepper-step
                                step="3"
                                style="
                                    align-items: center;
                                    justify-content: center;
                                "
                            >
                                <div
                                    style="
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        justify-content: center;
                                    "
                                >
                                    <v-icon
                                        v-show="dmIcon3 == true"
                                        class="dm-header-icon"
                                        dark
                                        >check_circle</v-icon
                                    >
                                    <v-icon
                                        v-show="dmIcon3 == false"
                                        class="dm-header-icon-grey"
                                        >check_circle</v-icon
                                    >
                                    <div>Submit</div>
                                </div>
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                            <v-stepper-content step="1" class="pa-3 mt-5">
                                <v-card class="pa-4 ma-1">
                                    <v-form v-model="valid" ref="form">
                                    <v-layout column>
                                        <v-flex xs10 sm4 md3>
                                            <p
                                                class="mb-1"
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                House of Bank
                                            </p>
                                            <div class="cust_dd">
                                                <v-autocomplete
                                                    :items="HouseofBnk"
                                                    item-text="text"
                                                    item-value="value"
                                                    @change="bankAccFilter"
                                                    height="30"
                                                    solo
                                                    label="Select"
                                                    v-model="houseOfBank"
                                                    :rules="[() => !!houseOfBank || 'This field is required']"
                                                    attach
                                                >
                                                </v-autocomplete>
                                            </div>
                                        </v-flex>
                                        <v-flex>
                                            <p
                                                class="mb-1"
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                Bank Account No.
                                            </p>
                                            <div class="cust_dd">
                                                <v-autocomplete
                                                    :items="BankAcNo"
                                                    @change="pymt_Mode(bankAccNo)"
                                                    item-text="text"
                                                    item-value="value"
                                                    height="30"
                                                    solo
                                                    attach
                                                    label="Select"
                                                    v-model="bankAccNo"
                                                    :rules="[() => !!bankAccNo || 'This field is required']"
                                                ></v-autocomplete>
                                            </div>
                                        </v-flex>
                                        <v-flex>
                                            <p
                                                class="mb-1"
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                Payment Mode Name
                                            </p>
                                            <div class="cust_dd">
                                                <v-autocomplete
                                                    :items="pymntModeData"
                                                    return-object
                                                    @change=" subSetFilter(PymntMdeNme)"
                                                    item-text="PaymentModeName"
                                                    item-value="PaymentModeId"
                                                    height="30"
                                                    solo
                                                    attach
                                                    label="Select"
                                                    v-model="PymntMdeNme"
                                                    :rules="[() => !!PymntMdeNme || 'This field is required']"
                                                ></v-autocomplete>
                                            </div>
                                        </v-flex>
                                        <v-flex>
                                            <p
                                                class="mb-1"
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                SubSet
                                            </p>
                                            <div class="cust_dd">
                                                <v-autocomplete
                                                    :items="dmsubsetdata"
                                                    @change="trTypeFilter(subSet)"
                                                    height="30"
                                                    solo
                                                    attach
                                                    label="Select/Create a subset"
                                                    v-model="subSet"
                                                    :rules="[() => !!subSet || 'This field is required']"
                                                ></v-autocomplete>
                                            </div>
                                        </v-flex>
                                        <v-flex v-show="dmTrtypeshow == true">
                                            <p
                                                class="mb-1"
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                SubSet Name
                                            </p>
                                            <div class="cust_dd">
                                                <v-autocomplete
                                                    :items="trData"
                                                    return-object
                                                    item-text="TrModeName"
                                                    item-value="TrModeId"
                                                    height="30"
                                                    solo
                                                    attach
                                                    @change="trTypeSelected(trType)"
                                                    label="Select"
                                                    v-model="trType"
                                                    :rules="[() => !!trType || 'This field is required']"
                                                ></v-autocomplete>
                                            </div>
                                        </v-flex>
                                        <v-flex  v-show="dmcreateTrtypeshow == true">
                                            <p
                                                class="mb-1"
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                SubSet Name
                                            </p>
                                            <div class="cust_dd">
                                                <v-text-field
                                                    v-model="subSetName"
                                                    placeholder="Enter subset Name"
                                                    solo
                                                    :rules="[() => !!subSetName || 'This field is required']"
                                                >
                                                </v-text-field>
                                            </div>
                                        </v-flex>
                                        <v-flex
                                            class="dm-fileContainer-bulk mb-3"
                                            style="border: 1px solid #c1c8cc;"
                                        >
                                            <v-text class="dm-upload-txt"
                                                >Upload Excel Sheet</v-text
                                            >
                                            <v-icon right>publish</v-icon>
                                            <input
                                                type="file"
                                                ref="fileref"
                                                id="fileUpload"
                                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                @change="jsonuploadDm"
                                            />
                                        </v-flex>
                                        <!-- v-if="excelfilename !== '' " -->
                                        <v-flex v-if="upload_xls" class="mb-3">
                                            <v-layout
                                                row
                                                style="
                                                    display: flex;
                                                    justify-content: space-between;
                                                    align-items: center;
                                                "
                                            >
                                                <img
                                                    src="../assets/dmExcel.png"
                                                    style="
                                                        width: 25px;
                                                        height: 25px;
                                                    "
                                                />
                                                <v-text>{{
                                                    excelfilename
                                                }}</v-text>
                                                <v-divider vertical></v-divider>
                                                <img
                                                    src="../assets/dmsuccess.png"
                                                    style="
                                                        width: 25px;
                                                        height: 25px;
                                                    "
                                                />
                                                <v-btn
                                                    class="dm-btn-delete-txt"
                                                    small
                                                    round
                                                    dark
                                                    color="#D1121B"
                                                    @click="dmRmvExcel"
                                                >
                                                    <v-icon
                                                        small
                                                        left
                                                        class="mr-2"
                                                        >close</v-icon
                                                    >
                                                    Delete
                                                </v-btn>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex>
                                            <v-btn
                                                block
                                                dark
                                                color="#23B1A9"
                                                @click="dmSubmitFU()"
                                                >Submit</v-btn
                                            >
                                        </v-flex>
                                    </v-layout>
                                    </v-form>
                                </v-card>
                            </v-stepper-content>
                            <v-stepper-content step="2" class="pa-3 mt-5">
                                <v-card class="pa-4 ma-1">
                                    <v-layout justify-space-between row>
                                        <v-flex
                                            xs6
                                            style="
                                                display: flex;
                                                justify-content: flex-start;
                                            "
                                        >
                                            <p
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                Bank Statement Format
                                            </p>
                                        </v-flex>
                                        <v-flex
                                            xs6
                                            style="
                                                display: flex;
                                                flex-direction: row;
                                                justify-content: center;
                                                align-items: center;
                                            "
                                        >
                                            <p
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                Uploaded Data Header
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider class="mt-1 mb-3"></v-divider>
                                    <v-layout
                                        justify-space-between
                                        style="align-items: center;"
                                        row
                                        v-for="(item, index) in StdColumnArr" :key="index"
                                      >
                                        <v-flex
                                            xs4
                                            style="
                                                display: flex;
                                                flex-direction: column;
                                                align-items: flex-start;
                                            "
                                        >
                                            <p
                                                class="mb-0"
                                                style="
                                                    color: #1e9690;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                {{item.StdColName}}<span style="color:#D1121B" v-if="item.IsMandatory ==true"> *</span>
                                            </p>
                                            <p
                                                class=""
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-size: 11px;
                                                "
                                            >
                                                {{item.StdColDataType}}
                                            </p>
                                            <!-- <p v-else></p> -->
                                            <!-- <p v-if ="item.mdNtSelected!==false"> Field is required</p> -->
                                        </v-flex>
                                        <v-flex xs7>
                                            <div class="cust_dd">
                                                <!-- <span v-if="item.dataTypMsmtch !==true" style="color:#E46A25">Data type mismatch {{item.trnstype.BankColDataType }}</span> -->
                                                <!-- @change="excelhdrnm(item,index)" -->
                                                <span v-if="item.mdNtSelected!==false" style="color:#E46A25">Field is required</span>
                                                <v-autocomplete
                                                    solo
                                                    label="Select"
                                                    return-object
                                                    :items="BankColumnArr"
                                                    item-text="BankColName"
                                                    item-value="BankColId"
                                                    v-model="item.trnstype"  
                                                    @change="excelhdrnm(item,index)" 
                                                    hide-selected
                                                    clearable
                                                ></v-autocomplete>
                                                
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider class="mb-5"></v-divider>

                                    <v-flex class="" style="">
                                        <v-btn
                                            block
                                            dark
                                            color="#23B1A9"
                                            @click="dmSubmitDM()"
                                            >Submit
                                        </v-btn>
                                    </v-flex>
                                </v-card>
                            </v-stepper-content>
                            <v-stepper-content step="3" class="pa-3 mt-5">
                                <v-card>
                                    <v-layout column v-show="dmconfirm == true">
                                        <v-card class="ma-1" style="border: 1px solid #c1c8cc;">
                                            <!-- <v-container> -->
                                                <v-layout class="dm-submit-header">
                                                    <v-flex xs12 sm5 md6 style="border-right: 1px solid #c1c8cc;" class="pl-3 py-2">Bank Statement Format</v-flex>
                                                    <v-flex xs12 sm5 md6 class="pl-3 py-2" >Uploaded Data Header</v-flex>
                                                </v-layout>
                                                <v-layout v-for="(item, index) in StdColBnkColMapData" :key="index" class="">
                                                    <v-flex xs12 sm5 md6 
                                                        style="border-right: 1px solid #c1c8cc;" 
                                                        class="pl-3 pt-3">
                                                        <p style="color: #1e9690;font-family: roboto;font-weight: 700;">{{ item.StdColName}}</p>
                                                    </v-flex>
                                                    <v-flex xs12 sm5 md6 class="pl-3 pt-3" 
                                                            style="display: flex;align-items: flex-start;"
                                                        >
                                                        <v-icon v-if="item.Message.toLowerCase()!=='pass'"
                                                            class="dm-submit-icon-error mr-2"
                                                            small
                                                            dark>
                                                            close
                                                        </v-icon>
                                                        <v-icon v-else
                                                            class="dm-submit-icon mr-2"
                                                            small
                                                            dark>
                                                            check
                                                        </v-icon>
                                                        <div style="display: flex;flex-direction: column;justify-content: center;align-items: flex-start;">
                                                            <p class="ma-0" style="color: #10242b;font-family: roboto;font-weight: 700;">{{item.BankColName}}</p>
                                                            <p v-if="item.Message.toLowerCase()!=='pass'"
                                                                class="ma-0"
                                                                style="color: #d1121b;font-family:roboto;font-size: 10px;"
                                                                >Sample value does not match the required data format *
                                                            </p>
                                                            <p v-else class="ma-0"  ></p>  
                                                        </div>
                                                    </v-flex>
                                                </v-layout>
                                        </v-card>
                                        <v-card>
                                                <v-layout
                                                    row
                                                    justify-space-between
                                                    class="ma-2"
                                                >
                                                    <v-flex xs6 class="mr-3">
                                                        <v-btn
                                                            dark
                                                            block
                                                            color="#152F38"
                                                            @click="dm_back()">
                                                            <v-icon>keyboard_arrow_left</v-icon>
                                                            Back</v-btn
                                                        >
                                                    </v-flex>
                                                    <v-flex xs6 class="ml-3">
                                                        <v-btn
                                                            block
                                                            color="#23B1A9"
                                                            @click="dm_confirm()"
                                                            :style="{backgroundColor:checkmanFlg3 === false ? '#23B1A9' : 'grey', color:checkmanFlg3 === false ? '#FFFFFF': 'inherit',}"
                                                            :disabled="checkmanFlg3 === true">
                                                            Confirm
                                                            <v-icon
                                                                >keyboard_arrow_right</v-icon
                                                            >
                                                        </v-btn>
                                                    </v-flex>
                                                </v-layout>
                                            <!-- </v-container> -->
                                        </v-card>
                                    </v-layout>
                                </v-card>
                                <v-card
                                    v-show="dmconfirm == false"
                                    class="px-5 pt-5 pb-2 ma-1"
                                >
                                    <v-layout column>
                                        <v-flex
                                            class="mt-5"
                                            style="
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                            "
                                        >
                                            <img
                                                src="../assets/dm_done.png"
                                                style="
                                                    width: 70px;
                                                    height: 70px;
                                                "
                                            />
                                        </v-flex>
                                        <v-flex
                                            class="mt-3"
                                            style="
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                            "
                                        >
                                            <p
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-weight: 700;
                                                "
                                            >
                                                {{mappingMsg.Status}}
                                            </p>
                                        </v-flex>
                                        <v-flex
                                            class="mb-5"
                                            style="
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                            "
                                        >
                                            <p
                                                style="
                                                    color: #646666;
                                                    font-family: roboto;
                                                    font-size: 12px;
                                                "
                                            >
                                                <!-- Your Mapping has been completed
                                                Successfully -->
                                                {{mappingMsg.Messagae}}
                                            </p>
                                        </v-flex>
                                        <v-flex
                                            class="mt-5"
                                            xs10
                                            style="
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                            "
                                        >
                                            <v-btn
                                                block
                                                dark
                                                color="#23B1A9"
                                                @click="dm_done()"
                                            >
                                                Done
                                                <v-icon
                                                    >keyboard_arrow_right</v-icon
                                                >
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-container>
            </v-card>
            <!-- v-if="showDm===false" -->
            <Data-Mapping v-if="showDm===false" :nameofbank="nameofbank"> </Data-Mapping>
        </v-layout>
        
    </v-app>
</template> 
<script>
import XLSX from "xlsx";
var fileUpload = null;
import axios from "axios";
import moment from 'moment';
import DataMapping from '../component/DtaMpgHstry.vue'
export default {
    components:{
        DataMapping
    },
    created() {
        this.$store.commit("SET_PAGE_TITLE", "Data Mapping");
        this.User_id = this.$store.state.agentDetails.userId;
        this.sessionId = this.$store.state.agentDetails.sessionId;
        // this.GetAllFiltersData();

        let bnklstfrmstate = [];
        bnklstfrmstate=this.$store.getters.getbankDetails;
        let self=this
        self.bankList2=[]
        bnklstfrmstate.map((bnk) => {
            self.bankList2.push({
                houseOfBank: bnk.houseOfBank,
            });
        });
        self.bankList2 = Object.values(
            self.bankList2.reduce((acc, cur) => Object.assign(acc, { [cur.houseOfBank]: cur }),{}));
            console.log(" Unique bankList's >>>", self.bankList2);
                        
            let alldata = {
                houseOfBank: 'All Banks',
                bankAcNo: self.bankList.length,
            }

        self.bankList2.unshift(alldata);
        self.selectbank(self.bankList2[0]);

    },

    computed: {
    
        filteredItems() {
            return _.orderBy(this.bankList2.filter(item => {
              if(!this.search) return this.bankList2;
                return (
                    item.houseOfBank.toLowerCase().includes(this.search.toLowerCase())
                    // item.BankAcNo.includes(this.search)
                );
            }));
        }
        
    },

    data() {
        return {
            User_id:'',
            sessionId:'',
            nameofbank: "",
            search:'',
            bankaccountnumber: "",
            bnkProfilePic:"",
            dmSteps: 0,
            showDm:true,
            resTrModeId:null,
            HouseofBnk: [],
            bankList:[],
            bankList2:[],
            bnkAccmatch:[],
            pymntModeData:[],
            checkmanFlg3:false,
            PymntMdeNme:'',
            valid:false,
            dtaMppngflag:false,
            // dataTypMsmtch:true,
            BankAcNo: [],
            StdColBnkColMapData:[],
            trData: [],
            StdColumnArr:[],
            BankColumnArr:[],
            StdBankMapDetails:[],
            mediaFile: null,
            excelfilename: "",
            dmData: ["one", "two", "Three"],
            dmsubsetdata: [],
            dmconfirm: true,
            upload_xls: false,
            bulkData: [],
            files_name: "",
            allbulkdata: [],
            just_columns: [],
            number_of_records: 0,
            reserved_for_reset: [],
            first_col_values: [],
            mappingMsg:{},
            main_parent: [],
            houseOfBank: "",
            bankAccNo: "",
            trType: "",
            subSetName: "",
            subSet: "",
            createdDate: "",
            transctDate: "",
            amount: "",
            dmIcon2: false,
            dmIcon3: false,
            dmTrtypeshow:false,
            dmcreateTrtypeshow:false
        };
    },


    watch: {
    
    },

    methods: {

        clearSearch () {
            this.search="";
        },

        selectbank(data){
            console.log("SELECTED DATA::", data);
            this.search=""
            this.nameofbank = data.houseOfBank;
            this.bankaccountnumber = data.bankAcNo;
        
            this.$store.state.allBanksDi=this.nameofbank
            console.log(this.$store.state.allBanksDi,"store banks DI")

            if(this.nameofbank==="All Banks"){
                this.getImgUrl('All_banks')
            }else{
                this.getImgUrl(this.nameofbank)
            }

        },

        getImgUrl(picname) {
            // this.bnkProfilePic = require('../assets/'+picname+'.png')
            console.log(picname,"picname")
            try{
                this.bnkProfilePic = require('../assets/'+picname+'.png')
            }catch(error){
                this.bnkProfilePic = require('../assets/All_banks.png')
            }
            return this.bnkProfilePic
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
                    PageName:"dataMapping",
                    BankAcNo: 0,
                },
            })
                .then(function (response) {
                    console.log("Filter APi Response>>>>>>", response);
                    self.showLoader('Loading', false);

                    if (response.data.ErrorCode === 0){

                        if(!response.data.FilterDataBankColMapping || response.data.FilterDataBankColMapping.length == 0){
                            console.log("Array is either empty or does not exist")
                            self.showToast("No Records Found",self.TOST().WARNING);
                            return
                        }
                        self.FilteringApi=[]
                        self.FilteringApi = response.data.FilterDataBankColMapping;
                        // self.bankList = [];
                        self.HouseofBnk=[];
                        self.FilteringApi.map((bnk) => {
                            self.HouseofBnk.push(bnk.HouseOfBank); 
                            // self.bankList.push({
                            //     HouseOfBank: bnk.HouseOfBank,
                            // });
                        });

                        let uniqbnks = [...new Set(self.HouseofBnk)];
                        console.log("uniq", uniqbnks);
                        self.HouseofBnk = [];
                        uniqbnks.map((e) => {
                            // console.log("e s-----", e);
                            self.HouseofBnk.push({ text: e, value: e });
                        });
                        // console.log("self.HouseofBnk", self.HouseofBnk);
                        // console.log("bankList Array", self.bankList);
                        // self.bankList = Object.values(
                        //     self.bankList.reduce((acc, cur) => Object.assign(acc, { [cur.HouseOfBank]: cur }),{}));
                        // console.log(" Unique bankList's >>>", self.bankList);
                        
                        // let alldata = {
                        //     HouseOfBank: 'All Banks',
                        //     BankAcNo: self.bankList.length,
                        // }

                        // self.bankList.unshift(alldata);
                        // self.$store.commit('SET_DIFILTER',self.bankList)
                        // console.log("bankList's ALL>>>", self.bankList);
                        // self.selectbank(self.bankList[0]);
                   
                    }else {
                        
                        self.showToast('Something went wrong', this.TOST().ERROR);
                        
                    }
                })
                .catch(function (error) {
                    console.log("Filter APi Response>>>>>>", error);
                });
        },

        bankAccFilter() {
            let self = this;
            self.BankAcNo = [];
            self.trData = [];
            self.pymntModeData=[];
            self.dmsubsetdata=[];
            self.bankAccNo=''
            self.PymntMdeNme=''
            self.subSet=''
            self.dmcreateTrtypeshow =false
            self.dmTrtypeshow = false
            console.log("Main bank names selected", self.houseOfBank);
            let bnkmatch = self.FilteringApi.filter(function (item) {
                return item.HouseOfBank === self.houseOfBank;
            });
            console.log("matched bank names", bnkmatch);

            bnkmatch.map((bnk) => {
                // console.log("bank names array", bnk);
                self.BankAcNo.push({ text: bnk.BankAcNo, value: bnk.BankAcNo });
            });

            self.BankAcNo = Object.values(self.BankAcNo.reduce((acc, cur) => Object.assign(acc, { [cur.value]: cur }),{}));
            console.log(" Unique BankAcNo's >>>", self.BankAcNo);
        },
        pymt_Mode(e) {
            console.log("Value from Bank Acc selection",e)
            let self = this;
            self.pymntModeData = [];
            self.dmsubsetdata=[];
            self.subSet=''
            self.PymntMdeNme=''
            self.dmcreateTrtypeshow =false
            self.dmTrtypeshow = false
            // console.log("Main bank name Selected", self.mainBankname);
            console.log("Acc Number Selected", self.bankAccNo);
            let pymt_bnkAccmatch = self.FilteringApi.filter(function (item) {
                return item.BankAcNo === self.bankAccNo;
            });

            console.log("pymt_bnkAccmatch >>>", pymt_bnkAccmatch);
            pymt_bnkAccmatch.map((bnk) => {
                // console.log("bank names", bnk);
                self.pymntModeData.push({
                    PaymentModeId: bnk.PaymentModeId,
                    PaymentModeName: bnk.PaymentModeName,
                    TrModeName:bnk.TrModeName,
                    TrModeId:bnk.TrModeId
                });
            });

            //  Remove null PaymentModeId
            self.pymntModeData = self.pymntModeData.filter((b) => {
                        return b.PaymentModeId !== null
            });

            console.log("Transaction and Payment Mode Type", self.pymntModeData);
        },

        subSetFilter(e){
            
            let self = this;

            console.log("Payment mode Number Selected", self.PymntMdeNme);
            let tempbnkAccmatch=[]
            tempbnkAccmatch = self.FilteringApi.filter(function (item) {
                return item.BankAcNo === self.bankAccNo && item.PaymentModeId===self.PymntMdeNme.PaymentModeId;
            });

            console.log("tempbnkAccmatch >>>",tempbnkAccmatch);
            let tempTrdata=[]
            tempbnkAccmatch.map((bnk) => {
                // console.log("bank names", bnk);
                tempTrdata.push({
                    TrModeName: bnk.TrModeName,
                    TrModeId: bnk.TrModeId,
                });
            });
            tempTrdata = tempTrdata.filter((b) => {
                        return b.TrModeId !== null
                    });
            console.log(" temp Transaction and Payment Mode Type", tempTrdata);
            
            self.dmsubsetdata=[];
            self.subSet=''
            self.dmTrtypeshow =false
            self.dmcreateTrtypeshow = false
            self.trData = [];
            if(!tempTrdata || tempTrdata.length == 0){
                console.log("Array is either empty or does not exist")
                self.dmsubsetdata.push(
                   {text:'Create',value:'create'});
            }else{
                self.dmsubsetdata.push(
                    {text:'Select Existing',value:'selectexisting'},
                    {text:'Create',value:'create'}
                );
            }
            

        },

        trTypeFilter(e) {
            console.log("Value from Bank payment selection",e)
        
            let self = this;
            self.trData = [];
            self.trType='';
            self.subSetName='';

            if(e==="selectexisting"){
                this.dmTrtypeshow =true
                this.dmcreateTrtypeshow = false
            }else{
                this.dmcreateTrtypeshow =true
                this.dmTrtypeshow = false
            }
            
            // console.log("Main bank name Selected", self.mainBankname);
            console.log("Payment mode Number Selected", self.PymntMdeNme);
            self.bnkAccmatch=[];
            self.bnkAccmatch = self.FilteringApi.filter(function (item) {
                return item.BankAcNo === self.bankAccNo && item.PaymentModeId===self.PymntMdeNme.PaymentModeId;
            });

            console.log("bnkAccmatch >>>", self.bnkAccmatch);
            self.bnkAccmatch.map((bnk) => {
                // console.log("bank names", bnk);
                self.trData.push({
                    TrModeName: bnk.TrModeName,
                    TrModeId: bnk.TrModeId,
                });
            });
            self.trData = self.trData.filter((b) => {
                        return b.TrModeId !== null
                    });
            console.log("Transaction and Payment Mode Type", self.trData);
        },

        trTypeSelected(e){
            console.log("tr Type",e);
        },

        excelhdrnm(e, index){
            console.log("Excel header name selected",e)
            console.log("Excel header name selected",e.StdColDataType.toLowerCase())
            console.log("Excel header name selected",e.trnstype.BankColDataType.toLowerCase())
            console.log("Excel header name selected",index)
             console.log("Excel header name selected",this.StdColumnArr)
            this.StdColumnArr[index].mdNtSelected= false
            this.$forceUpdate()
        //      if(e.StdColDataType.toLowerCase() === e.trnstype.BankColDataType.toLowerCase()){
        //          this.StdColumnArr[index].dataTypMsmtch= true
        //          this.$forceUpdate()
        //      }else{
        //           this.StdColumnArr[index].dataTypMsmtch= false
        //           this.$forceUpdate()
        //      }
        //      console.log("Excel header name selected",e.dataTypMsmtch)
        },

        dmRmvExcel() {
            this.upload_xls = false; 
            this.excelfilename = "";
            this.mediaFile =null
            this.$refs.fileref.value = ""; 
             
        },
        
        dmSubmitFU() {

            // console.log("Excel File is>>>>>>>>", this.mediaFile);
            // console.log("Create Subset>>>>>>>>",this.dmcreateTrtypeshow);
            // console.log("Create Subset>>>>>>>>",this.subSetName);
            // console.log("Create payment>>>>>>>>",this.PymntMdeNme);

            if (this.mediaFile == undefined || this.mediaFile == null) {
                this.showToast("Please select a Excel file to continue",this.TOST().WARNING);
                return;
            }

            if(this.houseOfBank ===undefined || this.houseOfBank === null||this.houseOfBank === ""||this.bankAccNo === undefined || this.bankAccNo === null || this.bankAccNo === ""){
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                this.$refs.form.validate();
                return
                
            }
            var self = this;
            var a= "";

            if(this.dmcreateTrtypeshow ===true){

                
                if(this.subSetName === undefined || this.subSetName === null|| this.subSetName === ""){
                this.showToast('Please Enter Subset Name', this.TOST().WARNING);
                this.$refs.form.validate();  
                return
               }

                a={
                    BankName: self.bnkAccmatch[0].BankName,
                    BankId: self.bnkAccmatch[0].BankId,
                    AccountNo : self.bankAccNo,
                    PaymentModeId:self.PymntMdeNme.PaymentModeId,
                    TrType : self.subSetName,
                    TrTypeId: 0,
                    UploadDate: moment().format('DD-MM-YYYY'),
                    SessionId: self.sessionId,
                    UserId: self.User_id,
                    PageName: "File Format Uploading"

                }

            }else{

                if(this.trType === undefined || this.trType === null|| this.trType === ""){
                this.showToast('Please Select Tr Type', this.TOST().WARNING);
                this.$refs.form.validate();  
                return
               }

                a = {
                    BankName: self.bnkAccmatch[0].BankName,
                    BankId: self.bnkAccmatch[0].BankId,
                    AccountNo : self.bankAccNo,
                    PaymentModeId:self.PymntMdeNme.PaymentModeId,
                    TrType : self.trType.TrModeName,
                    TrTypeId: self.trType.TrModeId,
                    UploadDate: moment().format('DD-MM-YYYY'),
                    SessionId: self.sessionId,
                    UserId: self.User_id,
                    PageName: "File Format Uploading"
                };

            }

            var b = JSON.stringify(a);
            var c = JSON.parse(b);

            console.log(typeof c, "c=>>>");
            let formData = new FormData();
            formData.append("File", self.mediaFile);
            formData.append("BankFileFormatUploadRëquest", b);
            console.log("Bank FileUpload data",formData.get("BankFileUploadRëquest"));
            self.showLoader('Loading', true);
            axios
                .post(
                    this.API_Service_admin()+"/Mapping/api/Mapping/BankFormatFileUploadAsync",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                )
                .then((res, err) => {

                    self.showLoader('Loading', false);
                    console.log("res.data.Status>>>>>>>>", res.data.Status.toLowerCase());
                    if(res.data.Status.toLowerCase()==='fail'){
                        this.showToast(res.data.Message, this.TOST().WARNING);
                        return
                    }
                    // console.log("File Upload  Bank Column Response>>>>>>>>", res.data.BankColumnDetails);
                    // console.log("File Upload standard Column Response>>>>>>>>", res.data.StdColumnDetails);
                    self.StdColumnArr= res.data.StdColumnDetails
                    self.StdColumnArr.map((e)=>{
                        e.trnstype=''
                        e.dataTypMsmtch= true 
                        e.mdNtSelected= false
                    })
                    console.log("File Upload standard Column Response>>>>>>>>", self.StdColumnArr);
                    
                    self.BankColumnArr=res.data.BankColumnDetails
                    console.log("File Upload BankColumnDetails Column Response>>>>>>>>", self.BankColumnArr);

                    self.resTrModeId=self.BankColumnArr[0].TrModeId
                    self.dmSteps = 2;
                    self.dmIcon2 = true;
                    self.upload_xls = false; 
                    self.excelfilename = "";
                    self.mediaFile =null
                    self.$refs.fileref.value = ""; 
                })
                .catch(function (error) {
                    console.log("File Upload Error>>>>>>>>", error);
                });
        },
        
        dmSubmitDM() {
            
            var self = this
            
            self.StdBankMapDetails= self.StdColumnArr
            console.log("Mapped Data", self.StdBankMapDetails)
            console.log("self.resTrModeId", self.resTrModeId)

            for(let i=0; i<self.StdBankMapDetails.length; i++ ){

                if(self.StdBankMapDetails[i].IsMandatory==true && self.StdBankMapDetails[i].trnstype=='' ){
                    self.StdBankMapDetails[i].mdNtSelected = true
                    self.$forceUpdate()
                }else{
                    self.StdBankMapDetails[i].mdNtSelected = false
                    self.$forceUpdate()
                }
            } 
 
            var checkmanFlg= false
            for(let j=0; j<self.StdBankMapDetails.length; j++ ){
                // console.log("Testing>>>>>>")
                if(self.StdBankMapDetails[j].IsMandatory==true && self.StdBankMapDetails[j].trnstype==''){
                        
                        checkmanFlg = true
                }

            }
           
            if(checkmanFlg ===true){
                console.log("checkmanFld>>>>>>>>", checkmanFlg)
                self.showToast("Please Map required fields",self.TOST().WARNING);
                return
            }

            self.StdBankMapDetails =self.StdBankMapDetails.filter((obj)=>{
                return obj.trnstype !==""
            })
            console.log("After Removing unMapped Data", self.StdBankMapDetails)


            let StdBankMapApiDta=[]
            self.StdBankMapDetails.map((bnk) => {
                // console.log("bank names array", bnk);
                StdBankMapApiDta.push({ StdColId: bnk.StdColId, BankColId: bnk.trnstype.BankColId});
            });

            console.log( StdBankMapApiDta)
            if (self.StdBankMapDetails.length<1){
                self.showToast("Pleas Map Fields Before Proceeding","error");
            }else{
              self.showLoader('Loading', true);
              axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/Mapping/api/Mapping/StdColBankColMap",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "63d5716a-e15b-2239-edb3-870f07e43ad3",
                },
                data: {
                    BankAcNo : self.bankAccNo,
                    TrModeId : self.resTrModeId,
                    UserID : 1,
                    PageName : "Mapping",
                    BankColGroupId : self.StdBankMapDetails[0].BankColGroupId,
                    StdBankMapDetails: StdBankMapApiDta
                },
            })
                .then(function (response) {
                    // console.log("StdColBnkColMapData APi Response>>>>>>", response); 
                    if(!response.data || response.data.length == 0){
                        console.log("Array is either empty or does not exist")
                        self.showToast("Something went Wrong",self.TOST().WARNING);
                        return
                    }
                    self.StdColBnkColMapData=[];
                    self.StdColBnkColMapData=response.data
                    self.showLoader('Loading', false);
                    console.log("StdColBnkColMapData APi Response>>>>>>", self.StdColBnkColMapData);
                    self.checkflag();
                    self.dmSteps = 3;
                    self.dmIcon3 = true;
                   

                })
                .catch(function (error) {
                    console.log("Filter APi Response>>>>>>", error);
                });
            }
        },

         checkflag() {
            var self = this;
            self.checkmanFlg3 = false;

            for (let i = 0; i < self.StdColBnkColMapData.length; i++) {
                console.log("res.data.Status>>>>>>>>", self.StdColBnkColMapData[i].Message.toLowerCase());
                if (self.StdColBnkColMapData[i].Message.toLowerCase() !== 'pass') {
                    self.checkmanFlg3 = true;
                }
            }
            console.log("Confirm button flag", self.checkmanFlg3);

        },



        dm_confirm() {

            let self=this

            console.log("StdColBnkColMapData APi Response>>>>>>", self.StdColBnkColMapData);

            for(let i=0; i<self.StdColBnkColMapData.length; i++ ){
                // console.log("Testing>>>>>>")
                if(self.StdColBnkColMapData[i].Message.toLowerCase() !== 'pass'){     
                   self.checkmanFlg3 = true
                }
            }
            
            if(self.checkmanFlg3 ===true){
                console.log("checkmanFld3>>>>>>>>", self.checkmanFlg3)
                self.showToast("Please Map required fields Correctly",self.TOST().WARNING);
                return
            }

            self.showLoader('Loading', true);
            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/Mapping/api/Mapping/StdColBankColMapConfirmation",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "postman-token: 5a34771b-f969-52aa-63a9-90a6d6faed",
                },
                data: {
                    BankAcNo : this.bankAccNo,
                    UserID : 1,
                    PageName : "Mapping",
                    BankColGroupId : this.StdBankMapDetails[0].BankColGroupId
                }
            })
            .then(function (response) {
                    console.log("StdColBankColMapConfirmation APi Response>>>>>>", response);
                    self.mappingMsg={};
                    self.mappingMsg = response.data
                    self.showLoader('Loading', false);
                    console.log("this.mappingMsg",self.mappingMsg)
                     self.dmconfirm = false;
                })
            .catch(function (error) {
                    console.log("StdColBankColMapConfirmation APi Error Response>>>>>>", error);
                });
           
        },


        dm_back() {
            this.dmSteps = 2;
            this.dmIcon3 = false;
            this.dtaMppngflag=true;
            this.checkmanFlg3=false
            self.StdColBnkColMapData=[]
        },


        dm_done() {
            this.resetFields()
            // this.GetAllFiltersData();
            this.dmSteps = 1;
            this.dmIcon2 = false;
            this.dmIcon3 = false;
            this.dmconfirm = true;
        },

        jsonuploadDm(e) {
            // this.upload_xls = false;
            console.log("Event file is", e);
            // console.log('File Name======>>>', e.target.files[0].name);

            this.excelfilename = e.target.files[0].name;
            this.mediaFile = e.target.files[0];
            console.log("Excel File", this.mediaFile);
            this.showToast("File Uploaded Successfully", "success");
            this.$refs.fileref.value = ""; 
            this.upload_xls = true; 
        },

        jsonupload(e) {
            this.upload_xls = false;
            this.bulkData = [];
            console.log("Event is", e);

            console.log("File Name======>>>", e.target.files[0].name);

            var me = this;
            //getting the excel file name
            me.excelfilename = e.target.files[0].name;

            //Reference the FileUpload element.
            fileUpload = document.getElementById("fileUpload");
            console.log("File is", fileUpload);
            //Validate whether File is valid Excel file.
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
            if (regex.test(fileUpload.value.toLowerCase())) {
                if (typeof FileReader != "undefined") {
                    var reader = new FileReader();
                    if (reader.readAsArrayBuffer) {
                        reader.addEventListener("load", (e) => {
                            var data = "";
                            var bytes = new Uint8Array(e.target.result);
                            console.log("e.target.result", e.target.result);
                            for (var i = 0; i < bytes.byteLength; i++) {
                                data += String.fromCharCode(bytes[i]);
                            }
                            console.log("data is", data);
                            // this.ProcessExcel(data);
                            this.allprocess(e.target.result);
                        });
                    }
                    reader.readAsArrayBuffer(e.target.files[0]);

                    this.files_name = e.target.files[0].name;
                    if (this.files_name.length > 25) {
                        this.files_name = this.files_name.slice(0, 10);
                        this.files_name = this.files_name.concat("...");
                    }
                    // }
                } else {
                    me.showToast(
                        "This browser does not support HTML5.",
                        "error"
                    );
                }
            } else {
                // alert("why from else?");
                me.showToast("Please upload a valid Excel file.", "error");
            }
        },

        allprocess(data) {
            console.log("data is ->", data);

            this.$refs.fileref.value = "";
            var workbook = XLSX.read(data, { type: "array" });
            let sheetName = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[sheetName];
            console.log("worksheet result is ", worksheet);

            var jsondata = XLSX.utils.sheet_to_json(worksheet, {
                defval: "",
                raw: false,
            });
            console.log(" jsondata data is ->", jsondata);
            if (jsondata.length == 0) {
                this.showToast("No records found in the file", "warning");
                return;
            } else {
                this.showToast("File Uploaded Successfully", "success");
            }

            this.allbulkdata = JSON.stringify(jsondata);
            console.log("BULK JSON is ->", this.allbulkdata);

            this.upload_xls = true;
            var newdata = jsondata;

            this.just_columns = [];
            var a3 = [];
            var a4 = [];

            console.log("newdata is ->", newdata);

            this.number_of_records = newdata.length;

            a3 = Object.keys(newdata[0]);
            // console.log("a3 data is ->", a3);
            console.log("a3 length is ->", newdata.length);
            var a9 = newdata.length - 1;
            console.log("a9 length ->", a9);

            a4 = Object.keys(newdata[a9]);
            // a3.push("NEW GPW")
            a3 = a3.concat().sort();
            a4 = a4.concat().sort();

            console.log("a3 sorted result is ->", a3);
            console.log("a4 sorted result is ->", a4);

            var is_same =
                a3.length == a4.length &&
                a3.every(function (element, index) {
                    return element === a4[index];
                });

            if (is_same) {
                this.reserved_for_reset = this.just_columns = Object.keys(
                    newdata[0]
                );
            } else {
                console.log(
                    "An error has occured, fallback will ensure you have relevant values of headers to map instead of empty values"
                );
                this.just_columns = [];
                var cells = Object.keys(worksheet);
                console.log("CELLS ->", worksheet);

                for (var i = 0; i < Object.keys(cells).length; i++) {
                    if (
                        cells[i].indexOf("1") == 1 ||
                        cells[i].indexOf("1") == 2
                    ) {
                        this.just_columns.push(worksheet[cells[i]].v);
                    }
                }

                this.reserved_for_reset = this.just_columns;
            }
            console.log("is same is for headers =>", is_same);
        },

        ProcessExcel(data) {
            // pe99
            //Read the Excel File data.
            var workbook = XLSX.read(data, {
                type: "binary",
            });
            console.log("workbook", workbook);
            var first_sheet_name = workbook.SheetNames[0];
            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
            //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
            //        raw: true
            //}));
            //  workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            // var excelData = []
            // excelData = XLSX.utils.sheet_to_csv(worksheet);
            console.log("worksheet data", worksheet);
            this.first_col_values = [];
            // this.just_columns = []
            var cells = Object.keys(worksheet);
            console.log("cells data", cells);
            for (let i = 0; i < this.main_sub_cat.length; i++) {
                this.main_parent.filter((e) => {
                    if (e.value == this.main_sub_cat[i].compare_parent_id) {
                        console.log("e.text ", e.text);

                        console.log(
                            "main_sub_cat ->",
                            this.main_sub_cat[i].text
                        );

                        this.mainobjis = {
                            err: false,
                            column: "",
                            maincat: {
                                text: e.text,
                                value: e.value,
                                visib: false,
                            },
                            // subcat_filter:[],
                            main_sub_cat: {
                                text: this.main_sub_cat[i].text,
                                value: this.main_sub_cat[i].value,
                                visib: false,
                            },
                        };
                    }
                });

                this.first_col_values.push(this.mainobjis);
            }

            // ds99

            for (let i = 0; i < this.def_set.length; i++) {
                var final_score_obj = {
                    err: false,
                    column: "",
                    maincat: {
                        text: this.def_set[i],
                        value: this.def_set[i],
                        visib: false,
                    },
                    main_sub_cat: {
                        text: "",
                        value: "",
                        visib: false,
                    },
                };

                this.first_col_values.push(final_score_obj);
            }

            console.log("after adding visib ->", this.first_col_values);
        },
        showDmData(){
            this.showDm=true
        },
        resetFields(){

            this.bankList = [];
            this.HouseofBnk =[];
            this.houseOfBank ='';
            this.BankAcNo = [];
            this.bankAccNo = '';
            this.pymntModeData = [];
            this.PymntMdeNme ='';
            this.dmsubsetdata=[];
            this.subSet='';
            this.trData=[];
            this.trType='';
            this.subSetName=''
            this.dmTrtypeshow =false
            this.dmcreateTrtypeshow = false
            this.upload_xls = false; 
            this.excelfilename = "";
            this.mediaFile =null
            this.$refs.fileref.value = ""; 
            this.$refs.form.reset(); 
        },

        showDmHstry(){
            this.resetFields()
            // this.GetAllFiltersData();
            this.showDm=false
        }
    },
};
</script>
<style>

.activeredbackground_dm {
    background-color: #e46a25 !important;
    color: #ffffff !important;
}

.inactivewhitebackground_dm {
    background-color: #ffffff !important;
    color: #646666 !important;
}

.backdropdown_dm {
    background: #ffffff;
    border-left: 1px solid #c1c8cc;
    /* height: 67px; */
}

.bandkdivcust_dm {
    padding: 3px;
    border-top-color: #ffffff;
    border-right-color: #c1c8cc;
    border-bottom-color: #ffffff;
    border-left-color: #ffffff;
    border-style: solid;
    border-width: 1px;
}

.downarrow {
    height: 10px;
    width: 10px;
}

.bankimg {
    height: 45px;
    width: 45px;
}

.dm-btn,
.dmh-btn {
    font-family: Roboto;
    font-size: 10px;
    text-transform: none;
}
.dm-btn {
    color: "#FFFFFF";
}
.dmh-btn {
    color: "#10242B";
}
.dm-btn-delete-txt {
    text-transform: none;
}

.dm-fileContainer-bulk {
    overflow: hidden;
    position: relative;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
}

.dm-fileContainer-bulk [type="file"] {
    cursor: inherit;
    display: block;
    font-size: 999px;
    filter: alpha(opacity=0);
    /* min-height: 100%;
    min-width: 100%; */
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
}
.dm-upload-txt {
    color: #646666;
    font-family: roboto;
    font-weight: 700;
}
.dm-custom-stepper .v-stepper__step {
    flex-direction: column !important;
    align-items: center;
    justify-content: center;
}

/* .cust_dd .v-text-field .v-text-field--solo .v-input__control{
    min-height: 38px !important;
    
} */

.cust_dd .v-text-field .v-input__slot,
.v-text-field--outline .v-input__slot {
    min-height: 40px !important;
    display: flex !important;
    align-items: center !important;
    /* border:1px red solid; */
}
/* .v-application .primary{
    background-color: unset !important;
    border-color: unset !important;
} */
.v-stepper__header span {
    background-color: unset !important;
    border-color: unset !important;
}
.dm-header-icon {
    padding: 8px !important;
    background-color: #e46a25;
    border-radius: 60px !important;
}
.dm-header-icon-grey {
    padding: 10px !important;
    background-color: #f7f7f7;
    border-radius: 60px !important;
}
.dm-custDivider.v-stepper__header .v-divider {
    margin: 0 -48px !important;
    border: 0.5px solid;
}
.dm-submit-icon {
    padding: 1px !important;
    background-color: #23b1a9;
    border-radius: 10px !important;
}
.dm-submit-icon-error {
    padding: 1px !important;
    background-color: #d1121b;
    border-radius: 10px !important;
}

.dm-custom-stepper .v-stepper__header {
    box-shadow: none;
}

.dm-submit-header {
    color: #e46a25;
    background-color: #fef9f6;
    border-bottom: 1px solid #c1c8cc;
    font-family: roboto;
    font-weight: 700;
    font-size: 12px;
    /* padding: 8px;
    padding-left: 20px; */
}

.dm-submit-flex {
    display: flex;
    justify-content: space-between;
    border: 1px solid #c1c8cc;
}
.dm-stmt-col {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}
</style>
