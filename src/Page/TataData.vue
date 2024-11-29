<template>
    <!--<v-container class="main-container">-->
    <div class="ma-3">
        <!--<v-layout class="main-ipmort-layout">-->

        <div
            style=" box-shadow: 0px 1px 1px #00000051; border: 0.5px solid #c1c8cc; border-bottom:none; background-color: #ffffff;">
            <v-layout style="background-color: #ffffff;" class="">
                <v-toolbar flat class="pa-0">
                    <v-toolbar-title class="">{{ dataimport  }}</v-toolbar-title>
                    <v-divider vertical class="ml-5" inset></v-divider>
                    <v-btn
                        class="ml-5 di-btn px-4"
                        small
                        color="#E46A25"
                        dark
                        style="border-radius: 25px;font-family: roboto;font-weight: 700;"
                        :class="[showimport === true ? 'activeredbackground' : 'inactivewhitebackground']"
                        @click="showimportdata()"
                        v-model="dataimport"
                        >Data Import
                    </v-btn>

                    <v-btn
                        class="di-btn px-4 mr-5"
                        color="#E46A25"
                        small
                        style="border-radius: 25px;font-family: roboto;font-weight: 700;"
                        :class="[showhistory === true ? 'activeredbackground' : 'inactivewhitebackground']"
                        @click="showhistorydata()"
                        v-model="updateimport">
                        Upload History
                    </v-btn>
                </v-toolbar>

                <v-flex class="backdropdown_di" xs6 sm6 md5 style="">
                    <v-menu style="width: 100%;" max-height="500px" min-width="400px" max-width="400px" offset-y>
                        <template slot="activator" v-slot-activator="{ on }">
                            <v-layout
                                justify-space-between
                                align-center
                                v-on="on"
                                style="">
                                
                                <div class="bandkdivcust_di">
                                    <img class="bankimg" :src="bnkProfilePic" />
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
                                    <img class="downarrow" src="../assets/downArrowDI.png" />
                                </v-flex>
                            </v-layout>
                        </template>
                        <v-list>
                            <v-text-field class="mx-3" depressed label="Search Bank Name" prepend-inner-icon="search" solo @click.stop v-model="search" clearable @click:clear="clearSearch"></v-text-field>

                            <v-list-group
                                v-for="item in filteredItems"
                                :key="item.HouseOfBank"
                                v-model="item.active"
                                :prepend-icon="item.action"
                                no-action
                                 @click.stop
                                 class="cust-Di-list">

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
        </div>
        <!-- ---Bs99--- -->
        <div v-if="showimport === true"  class="pa-2" style="background-color: #ffffff; border: 0.5px solid #c1c8cc;">
            <div style="background-color: #ffffff;" class="mb-2 ml-2" >
                <v-flex>
                    <v-btn
                        @click="toggleDiBtn"
                        class="di-btn"
                        :color="strtImport===true?'#D1121B':'#23B1A9'"
                        dark >
                        {{ imprtDtaBtnNme }}
                        <v-icon dark right v-if="strtImport===true" small>mdi-close-circle</v-icon>
                        <v-icon dark right v-else small>mdi-publish</v-icon>
                    </v-btn>
                </v-flex>
            </div>
            <hr class="mb-2" color="#C1C8CC" size="0.5" />
            <div class="ma-3" v-if="strtImport === true">
                <v-layout>
                    <v-flex xs6>
                        <v-layout row class>
                            <v-flex style="flex: 1;">
                                <label style=" color: #646666; font-family: roboto; font-weight: 700;">Selected Bank</label>
                                <!-- :readonly="true" -->
                                <v-flex class="sel pt-2 pr-4">
                                    <v-select
                                        :items="HouseofBnk"
                                        item-text="text"
                                        item-value="value"
                                        @change="bankAccFilter"
                                        v-model="bank"
                                        label="Select"
                                        dense
                                        solo
                                        :readonly="true"
                                    ></v-select>
                                </v-flex>
                            </v-flex>
                            <v-flex style="flex: 1;">
                                <label style="color: #646666;font-family: roboto;font-weight: 700;">Selected Account</label>
                                <!-- :readonly="true" -->
                                <v-flex class="sel pt-2 pr-4">
                                    <v-select
                                        :items="BankAcNo"
                                        @change="trTypeFilter"
                                        item-text="text"
                                        item-value="value"
                                        v-model="account"
                                        dense
                                        solo
                                        label="Select"
                                        :readonly="true"
                                         >
                                    </v-select>
                                </v-flex>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex xs6>
                        <v-layout row class>
                            <v-flex style="flex: 1;">
                                <label
                                    style="color: #646666;font-family: roboto;font-weight: 700;">Select Date
                                </label>
                                <v-flex class="sel pt-2 pr-4">
                                    <!-- <v-menu
                                        ref="calender"
                                        :close-on-content-click="false"
                                        v-model="imprtcalender"
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
                                            v-model="imprtdate"
                                            solo
                                            readonly
                                            prepend-inner-icon="event"
                                            @blur="imprtSelddate = parseDate(imprtdate)"
                                        ></v-text-field>

                                        <v-date-picker
                                            v-model="imprtSelddate"
                                            no-title
                                            @input="chngDate"
                                        ></v-date-picker>
                                    </v-menu> -->

                                    <v-menu
                                       ref="calender"
                                        :close-on-content-click="false"
                                        v-model="imprtcalender"
                                        :nudge-right="40"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px" >
                                        <!-- <template v-slot:activator="{ on }"> -->
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
                                            @change="chngDate"
                                            no-title
                                            :min="nowDate"
                                        ></v-date-picker>
                                    </v-menu>
                                    <p
                                        class="date-di-validation"
                                        v-if="truevalidatefrom === true" >
                                        {{ validationfrom }}
                                    </p>
                                </v-flex>
                            </v-flex>

                            <v-flex class="d-flex mt-3" style="flex: 1;" >
                                <v-flex class="sel" style="padding-top:7px;">
                                    <div class="cust_blnkRnChk" style="" :disabled="trggrBlnkRnFlg === true" >
                                        <!-- <v-icon  color="#1E9690" left class="blnkRnChkIcn" style=" " :disabled="trggrBlnkRnFlg === true" >mdi-plus</v-icon>  -->
                                        <v-btn large @click="blk_blnkrnchk()"  style="text-transform: none " :disabled="trggrBlnkRnFlg === true">
                                            <v-icon class="" dark left>add</v-icon>
                                            Trigger Blank Run</v-btn>
                                    </div>
                                </v-flex>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-flex
                    class="closebal pa-2 mb-4"
                    style="color: #10242b;font-family: roboto;border: 0.5px solid #c1c8cc;">
                    Bank Statement Closing Balance:
                    <span style="color: #e46a25;">
                        <span>&#8377;</span>
                        {{PreviousClosingBalance === undefined ? "0" : PreviousClosingBalance}} as on 
                        {{ TransactionStartDate === undefined ? "-": TransactionStartDate}}
                    </span>
                </v-flex>
                <v-layout row wrap class="">
                    <v-card
                        class="mr-4 mb-4"
                        style="width: 283px;"
                        v-for="(item, index) in trData" :key="index">
                        <p
                            class="ml-3 mt-2"
                            style="color: #646666;font-family: roboto;font-weight: 700;">
                            {{ item.PaymentModeId === 1 ? "Bank Statement" : item.PaymentModeName }} - {{ item.TrModeName }}
                        </p>
                        <!-- <v-flex> -->
                        <v-flex class="d-flex ma-2">
                            <v-btn
                                
                                class=" di-btn"
                                color="#23B1A9"
                                style=" color: ; font-family: roboto; font-weight: 700;"
                                @click="opendialog(item, index)"
                                dark>
                                {{ item.UploadBtn }}
                                <v-icon dark right>mdi-cloud-upload</v-icon>
                            </v-btn>
                            <!-- @click="dialog1 = !dialog1" -->
                            <v-btn
                                v-if="item.TrModeId !== 1"
                                
                                class="di-btn"
                                @click="snglBlnkRn(item,index)"
                                style="font-family: roboto; font-weight: 700; color:#10242B"
                                >Blank Run</v-btn
                            >
                        </v-flex>
                        <div
                            class="ma-3"
                            style="color: #646666; font-family: roboto;"
                        >
                            <v-flex class="pt-3 pb-3">
                                <span>Count of Records</span>
                                <p class="right" style="color: #10242b;">
                                    {{ item.CountOfRecord===null?'-':item.CountOfRecord}}
                                </p>
                            </v-flex>
                            <hr />
                            <v-flex class="pt-3 pb-3">
                                <span>Date Match</span>
                                <span
                                    class="right"
                                    :style="{color: item.IsDateMatch == true ? '#23B1A9' : '#D1121B'}">
                                    {{item.IsDateMatch === true ? "Yes" : item.IsDateMatch === null ? '-' :"No"}}
                                </span>
                            </v-flex>
                            <hr />
                            <v-flex
                                class="pt-3 pb-3"
                                v-if="item.TrModeId === 1">
                                <span>Closing Balance</span>
                                <span class="right" style="color: #e46a25;">
                                    <span>&#8377;</span>{{ item.ClosingBalance }}
                                </span>
                            </v-flex>
                            <hr v-if="item.TrModeId === 1" />
                            <v-flex
                                class="pt-3 pb-3"
                               >
                               <v-layout justify-space-between>
                                   <v-text>Net Amount (Credit/Debit)</v-text>
                                   <v-text style="color: #e46a25;">&#8377;{{item.NetBalance.toLocaleString() }}</v-text>
                               </v-layout>
                                <!-- <span>Net Amount (Credit - Debit)</span>
                                <span class="right" style="color: #e46a25;">
                                    <span>&#8377;</span>{{item.NetBalance.toLocaleString() }}
                                </span> -->
                            </v-flex>
                            <hr />
                            <v-flex
                                class="pt-3 pb-3"
                                v-if="item.TrModeId === 1" >
                                <span>Opening Balance Match</span>
                                <span
                                    class="right"
                                    :style="{color: item.IsOpeningBalanceMatch === true ? '#23B1A9': '#D1121B'}">
                                    {{item.IsOpeningBalanceMatch === true ? "Yes" : item.IsOpeningBalanceMatch === null ? '-' :"No"}}
                                </span>
                            </v-flex>
                            <hr v-if="item.TrModeId === 1" />
                            
                            <v-flex class="pt-3 pb-3" v-if="item.blnkrnflg === false">
                                <span>Upload Status</span>
                                <span
                                    class="right"
                                    :style="{color: item.UploadStatus === true ? '#23B1A9': '#D1121B'}">
                                    {{ item.UploadStatus === true? "Pass": item.UploadStatus === null ? '-' :"Failed"}}
                                </span>
                            </v-flex>
                            <v-flex class="pt-3 pb-3" v-else>
                                <span>Upload Status</span>
                                <span
                                    class="right"
                                    :style="{color: item.UploadStatus === true ? '#23B1A9': '#D1121B'}">
                                    {{ item.actionStatus === "blankRun" ? "Blank Run": item.actionStatus === null ? '-' :"Failed"}}
                                </span>
                            </v-flex>
                            <hr />
                            <v-flex
                                class="pt-3 pb-3"
                                v-if="item.TrModeId !== 1">
                                <span>Data Sheet Format</span>
                                <span
                                    class="right"
                                    :style="{color:item.IsDataSheetFormatValid === true? '#23B1A9': '#D1121B'}">
                                    {{ item.IsDataSheetFormatValid === true? "Pass": item.IsDataSheetFormatValid === null ? '-' :"Failed" }}
                                </span>
                            </v-flex>
                            <hr v-if="item.TrModeId !== 1" />
                        </div>
                        <!-- @click="dwnload_ErrorLogs(item, index)" -->
                        <v-flex v-if="item.TrModeId !== 1" class="pt-4"></v-flex>
                        <v-flex
                            class="d-flex ma-2"
                            v-if="item.IsErrorFileAddeded == true">
                            <v-btn
                                class="di-btn"
                                @click="dwnload_ErrorLogs(item, index)">
                                <v-icon dark right color="#646666" class="ma-2"
                                    >mdi-cloud-download</v-icon
                                >Download Error Logs
                            </v-btn>
                        </v-flex>
                    </v-card>
                </v-layout>
            </div>
            <div v-else >
                <v-layout column justify-center align-center class="pa-5">
                    <div class="">
                        <img style="width: 190px; height: 190px;" src="../assets/DtaImprtStrt.png" />
                    </div>
                    <div>
                        <p>
                            Click on
                            <span style="color: #1e9690; font-family: roboto; font-weight: 700;">
                                “Import New Data” 
                            </span>
                            button to start data import
                        </p>
                    </div>
                </v-layout>
            </div>
            
        </div>
        <!--bottom button-->
                <div v-if="strtImport === true" style="background-color:#F7F7F7">
                    <v-card class="bottombtn mt-3">
                        <v-btn
                            class="right mb-1 mt-2 di-btn"
                            tile
                            @click="saveDraft()"
                            :style="{ backgroundColor: saveDraftflag == true ? '#152F38' : 'grey', color: saveDraftflag == true ? '#FFFFFF': 'inherit',}"
                            :disabled="!saveDraftflag"
                            ><v-icon left>mdi-content-save</v-icon> Save As Draft
                        </v-btn>
                        <v-btn
                            class="right mb-1 mt-2 di-btn"
                            tile
                            :style="{
                                backgroundColor:
                                    saveDraftflag == true ? '#23B1A9' : 'grey',
                                color:
                                    saveDraftflag == true
                                        ? '#FFFFFF'
                                        : 'inherit',
                            }"
                            :disabled="submtfrApprovalflag2 === true"
                            @click="submtApproval()"
                            ><v-icon class="" left>mdi-arrow-right</v-icon>Submit</v-btn>
                    </v-card>
                </div>

        <v-flex class>
            <v-row justify="center">
                <v-dialog
                    v-model="dialogrst"
                    width="580"
                    height="380"
                    persistent
                    style
                >
                    <v-card>
                        <v-toolbar
                            style="color: #10242b;font-family: roboto;font-weight: 700;">
                            Confirmation
                            <v-spacer></v-spacer>
                            <v-icon @click="dialogrst = false">clear</v-icon>
                        </v-toolbar>
                        <v-layout>
                            <v-flex xs12>
                                <v-layout column class>
                                    <v-flex xs12 class="pa-2 pt-3 pl-3">
                                        <p>
                                            Do you want to Reset the Uploaded Data?
                                        </p>
                                    </v-flex>
                                        <v-card-actions >
                                            <v-spacer></v-spacer>
                                            <v-flex>
                                                <v-btn
                                                    small
                                                    class="pa-2 mb-2"
                                                    color="#152F38"
                                                    text
                                                    dark
                                                    style=" font-family: roboto; font-weight: 700; text-transform: none;"
                                                    @click="rstTRNo()">
                                                    <v-icon
                                                        dark
                                                        small
                                                        class="mr-2"
                                                        >cancel</v-icon>
                                                    <v-divider
                                                        vertical
                                                        class="mr-2">
                                                    </v-divider>
                                                    No
                                                </v-btn>

                                                <v-btn
                                                    class="pa-2 mb-2"
                                                    small
                                                    color="#23B1A9"
                                                    text
                                                    dark
                                                    style="font-family: roboto;font-weight: 700;text-transform: none;"
                                                    @click="rstTRYs()">
                                                    <v-icon
                                                        dark
                                                        small
                                                        class="mr-2"
                                                        >done</v-icon>
                                                    <v-divider
                                                        vertical
                                                        class="mr-2">
                                                    </v-divider>
                                                    Yes
                                                </v-btn>
                                            </v-flex>
                                        </v-card-actions>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-flex>

        <v-dialog v-model="dialogBulkUpld" persistent max-width="700px">
            <v-card class="pb-1" style="background-color: #f7f7f7;">
                <v-flex
                    style=" background-color: #ffffff; box-shadow: 0px 3px 5px #00000029;">
                    <v-card-title
                        class="subheading"
                        style="color: #10242b; justify-content: space-between; font-family: roboto; font-weight: 700;">
                        Upload File
                        <v-icon style="" @click="closebulk">clear</v-icon>
                    </v-card-title>
                </v-flex>
                <v-card class="ma-4">
                    <v-container grid-list-md class="mb-1">
                        <v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
                        <v-layout>
                            <v-flex class="fileContainer-bnkBulk mt-6">
                                <span class="upload-bnktext">SELECT FILE</span>
                                <v-icon right dark>publish</v-icon>
                                <input
                                    type="file"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    ref="fileref"
                                    id="fileUpload"
                                    @change="jsonupload"
                                />
                            </v-flex>
                            <v-layout ml-3 column>
                                <span
                                    v-if="excelfilename !== ''"
                                    class="caption font-weight-regular font-italic"
                                    style="color: #bfbfbf;"
                                    >{{ excelfilename }}</span>
                                <span
                                    class="caption font-weight-regular font-italic"
                                    style="color: #bfbfbf;"
                                    >Supports xls/csv format.</span>
                                <span
                                    class="caption font-weight-regular font-italic"
                                    style="color: #bfbfbf;">
                                    Approx time to upload 2 mb file - 30 min.
                                </span>
                            </v-layout>
                        </v-layout>
                        <v-layout ml-3 mt-3> </v-layout>
                        <v-layout mt-3 justify-center>
                            <v-btn dark color="#E46A25" @click="goNext()">
                                Submit
                                <v-icon class="ml-2" size="20px">arrow_forward</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-card>
        </v-dialog>
        <!--blank run confirm box-->

        <v-flex class>
            <v-row justify="center">
                <v-dialog
                    v-model="dialog1"
                    width="580"
                    height="380"
                    persistent
                    style
                >
                    <v-card>
                        <v-toolbar
                            style="color: #10242b;font-family: roboto;font-weight: 700;">
                            Confirmation
                            <v-spacer></v-spacer>
                            <v-icon @click="dialog1 = false">clear</v-icon>
                        </v-toolbar>
                        <v-layout>
                            <v-flex xs12>
                                <v-layout column class>
                                    <v-flex xs12 class="pa-2 pt-3 pl-3">
                                        <p>
                                            Do you want to skip the upload from {{ this.snglRnclkDta.TrModeName}}
                                        </p>
                                    </v-flex>
                                        <v-card-actions >
                                            <v-spacer></v-spacer>
                                            <v-flex>
                                                <v-btn
                                                    small
                                                    class="pa-2 mb-2"
                                                    color="#152F38"
                                                    text
                                                    dark
                                                    style=" font-family: roboto; font-weight: 700; text-transform: none;"
                                                    @click="dialog1= false">
                                                    <v-icon
                                                        dark
                                                        small
                                                        class="mr-2"
                                                        >cancel</v-icon>
                                                    <v-divider
                                                        vertical
                                                        class="mr-2">
                                                    </v-divider>
                                                    No
                                                </v-btn>

                                                <v-btn
                                                    class="pa-2 mb-2"
                                                    small
                                                    color="#23B1A9"
                                                    text
                                                    dark
                                                    style="font-family: roboto;font-weight: 700;text-transform: none;"
                                                    @click="snglBlnkRnYs()">
                                                    <v-icon
                                                        dark
                                                        small
                                                        class="mr-2"
                                                        >done</v-icon>
                                                    <v-divider
                                                        vertical
                                                        class="mr-2">
                                                    </v-divider>
                                                    Yes
                                                </v-btn>
                                            </v-flex>
                                        </v-card-actions>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-flex>
         <v-flex class>
            <v-row justify="center">
                <v-dialog
                    v-model="dialog2"
                    width="580"
                    height="375"
                    persistent
                    style
                >
                    <v-card>
                        <v-toolbar style=" color: #10242b;font-family: roboto;font-weight: 700;height: 50px;">
                            Confirmation
                            <v-spacer></v-spacer>
                            <v-icon @click="dialog2 = false">clear</v-icon>
                        </v-toolbar>
                        <v-layout>
                            <v-flex xs12>
                                <v-layout column class>
                                    <v-flex xs12 class="pa-2 pt-3 pl-3">
                                        <p>
                                            Do you want to skip the  Transaction upload?
                                        </p>
                                    </v-flex>
                                        <v-card-actions> 
                                            <v-spacer></v-spacer>
                                            <v-flex>
                                                <v-btn
                                                    small
                                                    class="pa-2 mb-2"
                                                    color="#152F38"
                                                    text
                                                    dark
                                                    style=" font-family: roboto; font-weight: 700; text-transform: none;"
                                                    @click="dialog2= false">
                                                    <v-icon
                                                        dark
                                                        small
                                                        class="mr-2"
                                                        >cancel</v-icon
                                                    >
                                                    <v-divider
                                                        vertical
                                                        class="mr-2"
                                                    ></v-divider
                                                    >No
                                                </v-btn>

                                                <v-btn
                                                    class="pa-2 mb-2"
                                                    small
                                                    color="#23B1A9"
                                                    text
                                                    dark
                                                    style="font-family: roboto;font-weight: 700;text-transform: none;"
                                                    @click="blkBlnkRnYs()">
                                                    <v-icon
                                                        dark
                                                        small
                                                        class="mr-2">done
                                                    </v-icon>
                                                    <v-divider
                                                        vertical
                                                        class="mr-2">
                                                    </v-divider
                                                    >Yes
                                                </v-btn>
                                            </v-flex>
                                        </v-card-actions>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-flex>
        <!--FOR dialog box-->

        <v-flex class>
            <v-row justify="center">
                <v-dialog
                    v-model="dialog"
                    width="800"
                    height="300"
                    persistent
                    style
                >
                    <v-card color="#F7F7F7">
                        <v-toolbar
                            color="#FFFFFF"
                            class="pa-0 ma-0"
                            style="color: #10242b;font-family: roboto;font-weight: 700;height: 58px;">
                            FILES UPLOADED
                        </v-toolbar>

                        <v-card class="ma-4 pa-2">
                            <div
                                style="color: #10242b;font-family: roboto;font-weight: 700;">
                                Files uploaded
                            </div>

                            <v-layout
                                class="ma-2"
                                row
                                wrap
                                flat
                                height="90"
                                tile
                            >
                                <v-card
                                    v-for="(item, index) in trData"
                                    :key="index"
                                    class="pa-3 mb-3"
                                    width="140px"
                                    style="color:#10242b; font-family: roboto; font-weight: 700; border-left: 3px solid #23b1a9;"
                                    outlined
                                    tile >
                                    {{ item.TrModeName }}
                                    <div v-if="item.UploadStatus == true">
                                        <v-icon class="mt-2" color="#23B1A9">check_circle</v-icon>
                                    </div>
                                    <div v-else>
                                        <v-icon class="mt-2" color="#D1121B">cancel</v-icon>
                                    </div>
                                </v-card>
                            </v-layout>

                            <v-card-title style="color: #10242b;font-family: roboto;font-weight: 700;">Data Validation</v-card-title>
                            <v-flex class="d-flex row">
                                <v-card class="d-flex pa-1 ma-2">
                                    <v-col>
                                        <v-flex
                                            style="color: #646666;font-family: roboto;font-weight: 700;display: flex;">
                                            <div
                                                v-if=" sbmtAprvlRspnse.isBSandTRbalanceTally ===true">
                                                <v-icon
                                                    class="mt-2"
                                                    color="#23B1A9">check_circle
                                                </v-icon>
                                            </div>
                                            <div v-else>
                                                <v-icon
                                                    class="mt-2"
                                                    color="#D1121B"
                                                    >cancel</v-icon>
                                            </div>
                                            <span class="pa-2"
                                                >{{bsTrtly}}</span
                                            >
                                        </v-flex>
                                    </v-col>
                                </v-card>
                                <v-card class="d-flex pa-1 ma-2">
                                    <v-col>
                                        <v-flex
                                            style="color: #646666;font-family: roboto;font-weight: 700;display: flex;">
                                            <div
                                                v-if="sbmtAprvlRspnse.isWithoutDuplicateEntry ===true">
                                                <v-icon
                                                    class="mt-2"
                                                    color="#23B1A9">check_circle
                                                </v-icon>
                                            </div>
                                            <div v-else>
                                                <v-icon
                                                    class="mt-2"
                                                    color="#D1121B"
                                                    >cancel</v-icon
                                                >
                                            </div>
                                            <span class="pa-2"
                                                >{{duplicate}}</span
                                            >
                                        </v-flex>
                                    </v-col>
                                </v-card>
                            </v-flex>

                            <v-flex xs9>
                                <v-card class="pa-1 ma-2">
                                    <div
                                        style="color: #646666;font-family: roboto;font-weight: 700;display: flex;">
                                        <div
                                            v-if="sbmtAprvlRspnse.isOpeningBalanceMatch === true">
                                            <v-icon class="mt-2" color="#23B1A9">check_circle</v-icon>
                                        </div>
                                        <div v-else>
                                            <v-icon class="mt-2" color="#D1121B">cancel</v-icon
                                            >
                                        </div>
                                        <span class="pa-2">
                                            {{blncmtch}}
                                        </span>
                                    </div>
                                </v-card>
                            </v-flex>
                            <v-divider class="mt-3"></v-divider>
                            <v-card class="pa-1" flat>
                                <div
                                    :class="[sbmtAprvlRspnse.Status === 'success' ? 'green-clr' : 'red-clr']"
                                    style="font-family: roboto;font-weight: 700;display: flex; justify-content:center;flex-wrap: wrap;">
                                    <span class="pa-2">
                                        {{sbmtAprvlRspnse.Message | checkdata}}
                                    </span>
                                </div>
                            </v-card>
                        </v-card>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-flex align="center" justify="center">
                                <v-btn
                                    class="mb-2"
                                    color="#E46A25"
                                    text
                                    dark
                                    style="font-family: roboto;font-weight: 700;text-transform: none;"
                                    @click="closeSAbx">
                                    <v-icon dark class="mr-2">cancel</v-icon>
                                    <v-divider vertical class="mr-2"></v-divider>Close
                                </v-btn>
                            </v-flex>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-flex>

        <!--Update history data-->
        <div
            v-if="showhistory === true"
            class
            style="background-color: #ffffff;"
        >
            <div
                style="box-shadow: 0px 2px 2px #00000051;border: 0.5px solid #c1c8cc;background-color:#FFFFFF;"
                class="pa-3">
                <v-layout justify-space-between>
                    <v-flex xs6 >
                        <v-layout row class>
                            <v-flex>
                                <label
                                    style="color: #646666;font-family: roboto;font-weight: 700;"
                                    >From</label>
                                <v-flex class="solo sel pt-2 pr-4">
                                    <v-menu
                                        ref="calender"
                                        :close-on-content-click="false"
                                        v-model="frmCalender"
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
                                            v-model="frmDateTxt"
                                            solo
                                            prepend-inner-icon="event"
                                            style="max-width: 300px;"
                                            @blur="fromdate = parseDate(frmDateTxt)"></v-text-field>
                                        <v-date-picker
                                            v-model="fromdate"
                                            no-title
                                        ></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-flex>

                            <v-flex>
                                <label
                                    style="color: #646666;font-family: roboto;font-weight: 700;">To</label>
                                <v-flex class="sel pt-2 pr-4">
                                    <v-menu
                                        ref="calender"
                                        :close-on-content-click="false"
                                        v-model="toCalender"
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
                                            v-model="toDateTxt"
                                            solo
                                            class
                                            prepend-inner-icon="event"
                                            style
                                            @blur="toDate = parseDate(toDateTxt)">
                                        </v-text-field>

                                        <v-date-picker v-model="toDate" no-title></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs5 class="">
                        <v-layout row class="mt-3">
                            <v-flex>
                                <p class="mt-3 ml-3" style="font-family: roboto; font-weight: 700;">
                                    <span style="color: #e46a25;">Showing {{fromvalue}}-{{toValu}} </span>out of {{upldhstryData.length}}
                                </p>
                            </v-flex>
                            <v-divider class="" vertical></v-divider>
                            <v-flex xs7>
                                <v-pagination
                                    class="cust-Di-pgn mt-2"
                                    v-model="pageNumber"
                                    color="#152F38"
                                    flat
                                    @input="nextPage"
                                    :length="pages"
                                ></v-pagination>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex class="cust-di-tbl">
                        <v-data-table
                            :headers="headers"
                            :items="paginatedData"
                            v-bind:pagination.sync="pagination"
                            class="custDi-tbl-brdr"
                            hide-actions
                        >
                            <template slot="items" slot-scope="props">
                                <td class="custDi-td-bdrgt">{{ props.item.Upload_Id | checkdata }}</td>
                                <td class="custDi-td-bdrgt">{{ props.item.Date == null? "-": props.item.Date}}</td>
                                <td class="custDi-td-bdrgt">{{ props.item.BankName | checkdata}}</td>
                                <td class="custDi-td-bdrgt">{{ props.item.BankAcNo | checkdata}}</td>
                                <td class="custDi-td-bdrgt">{{ props.item.UploadType | checkdata}}</td>
                                <td class="custDi-td-bdrgt">{{ props.item.FileBatchId | checkdata}}</td>
                                <td class="custDi-td-bdrgt">{{ props.item.ApprovalStatus| checkdata }}</td>
                                <!-- <td class="custDi-td-bdrgt">{{ props.item.RemarksFromApprover }}</td> -->
                                <td class="justify-center layout px-0" >
                                    <v-icon class="mr-2" @click="download_report(props.item,props.index)" :disabled="props.item.ApprovalStatus==='Blank Run'">get_app </v-icon>
                                </td>
                            </template>
                        </v-data-table>
                    </v-flex>
                </v-layout>
            </div>
        </div>
    </div>
    <!-- </v-container>-->
</template>

<script>
import axios from "axios";
import XLSX from "xlsx";
var fileUpload = null;
import moment from "moment";
let todayDate = "";
export default {
    created() {

        this.User_id = this.$store.state.agentDetails.userId;
        this.sessionId = this.$store.state.agentDetails.sessionId;
        this.$store.commit("SET_PAGE_TITLE", "Data Import");
        let todayDate = Date.now();
        // this.imprtdate = moment(todayDate).format("DD-MM-YYYY");
        console.log("trans date", this.TransactionStartDate);
        this.frmDateTxt = moment(todayDate - 6 * 24 * 3600 * 1000).format(
            "DD-MM-YYYY"
        );
        this.toDateTxt = moment(todayDate).format("DD-MM-YYYY");

        if("TrDataLs" in localStorage){
            console.log("YES Data")
            // this.trData= JSON.parse(localStorage.getItem("TrDataLs"));
            this.val = JSON.parse(localStorage.getItem('task'));
            console.log("YES Data", this.val)
            this.nameofbank=this.val.nameofbank
            this.subbnknme=this.val.subbnknme
            this.bankaccountnumber=this.val.bankaccountnumber
            this.getImgUrl(this.nameofbank);
            this.strtImport= this.val.strtImport
            this.imprtdate= this.val.imprtdate
            this.oldDate= this.val.imprtdate
            // this.GetAllFiltersData();
            // this.GetBnkData(this.bankaccountnumber)
            // this.bankAccFilter();
            // this.trTypeFilter();
            this.bank= this.val.bank
            this.account=this.val.account
            // this.trData= JSON.parse(localStorage.getItem("TrDataLs"));
            // this.imprtdate= this.val.imprtdate
            
        }else{
            // this.GetAllFiltersData();
        }
        
        // var self = this;

           
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
    
    computed: {
        // pages () {
        // return this.pagination.rowsPerPage ? Math.ceil(this.upldhstryData.length / this.pagination.rowsPerPage) : 0
        // },
        computedDateFormattedMomentjs () {
            return this.imprtdate ? moment(this.imprtdate).format("DD-MM-YYYY"): ''
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
        pages () {

            console.log(this.size ? Math.ceil(this.upldhstryData.length / this.size) : 0,"Pages length")
            return this.size ? Math.ceil(this.upldhstryData.length / this.size) : 0
        },

        pageCount() {
            let l = this.upldhstryData.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedData() {
            const start = this.pageNumber * this.size - this.size,
            end = start + this.size;
            console.log(start,end,"start End")

            if(!this.upldhstryData || this.upldhstryData.length == 0){
                this.fromvalue=0
            }else{
                this.fromvalue=start+1;
            }
            

            if(this.upldhstryData.length <this.size){
                this.toValu=this.upldhstryData.length
            }else if(this.upldhstryData.length <end){
                this.toValu=this.upldhstryData.length
            }else{
                this.toValu=end
            }

            console.log(this.fromvalue,this.toValu,"this.fromvalue this.toValu")
            return this.upldhstryData.slice(start, end);
        }
        
    },
    mounted() {
        this.headers.map((e) => {
            e.sortable = false;
        });
    },

    watch: {
        imprtSelddate(val) {
            this.imprtdate = this.formatDate(this.imprtSelddate);
        },
        fromdate(val) {
            this.frmDateTxt = this.formatDate(this.fromdate);
        },
        toDate(val) {
            this.toDateTxt = this.formatDate(this.toDate);
        },
        
    },

    data() {
        return {
            maxdate: new Date().toISOString().substr(0, 10),
            nowDate:'',
             search: '',
            pagination: {
                rowsPerPage:15
            },
            pageNumber: 1,
            size: 15,
            fromvalue:'',
            toValu:'',
            FilteringApi: [],
            bankAPIData:[],
            output:[],
            User_id:'',
            sessionId:'',
            bnkProfilePic:"",
            duplicate:"",
            bsTrtly:"",
            blncmtch:"",
            dteDiff:null,
            incmgDate:null,
            oldDate:null,
            imprtDtaBtnNme: "Import New Data",
            checkmanFlg3: false,
            strtImport: false,
            truevalidatefrom: false,
            trForBnkStmt: {},
            snglBnkRunRes:{},
            bulkBlnkRnRes:{},
            snglRnclkDta:"",
            val:"",
            bankList: [],
            draftRspnse: [],
            upldhstryData: [],
            bsClsBlnce: [],
            sbmtAprvlRspnse: {},
            nameofbank: "",
            subbnknme:"",
            bankaccountnumber: "",
            PreviousClosingBalance: "",
            TransactionStartDate: "",
            trForCash: [],
            trForCc: [],
            trForFd: [],
            trData: [],
            uploadedIndx: null,
            blnkRunIndx: null,
            dialogBulkUpld: false,
            HouseofBnk: [],
            mediaFile: null,
            BankAcNo: [],
            mainBank: [],
            mainBankname: "",
            active: false,
            showimport: true,
            showhistory: false,
            incomngTrType: "",
            resBatchId: 0,
            submtfrApprovalflag: false,
            submtfrApprovalflag2: true,
            trggrBlnkRnFlg:false,
            saveDraftflag: false,
            banks: ["ICICI", "BOI", "SBI", "Axis"],
            accounts: ["Default", "Saving", "Current"],
            bank: "",
            account: "",
            dataimport: "Data Import",
            updateimport: "Upload History",
            dialog: false,
            dialog1: false,
            dialogrst:false,
            dialog2:false,
            date: "",
            imprtSelddate: null,
            toDate: null,
            fromdate: null,
            imprtdate: "",
            triblankrun: "",
            stateClosBal: "4000000",
            countRecord: "123",
            dateMatch: "Yes",
            balance: 456000,
            openingBal: "No",
            netAmount: "50000",
            uploadStatus: false,
            dataSheetFormat: "Pass",
            selected: [],
            frmDateTxt: "",
            toDateTxt: "",
            todate: "",
            editedIndex: -1,
            calender: false,
            frmCalender: false,
            imprtcalender: false,
            toCalender: false,
            excelfilename: "",
            setfileName:"",
            steps: 0,
            headers: [
                { text: "Upload ID", value: "upload_Id" },
                { text: "Uploaded Date", value: "uploadedDate" },
                { text: "Bank", value: "bankName" },
                { text: "Bank Account No.", value: "bankAcNo" },
                { text: "Upload Type", value: "uploadType" },
                { text: "File BatchId", value: "batchId" },
                { text: "Approval Status", value: "approvalStatus" },
                // { text: "Remarks From Approver", value: "remarksfromapprover" },
                { text: "Download", value: "download" },
            ],
        };
    },

    methods: {

        clearSearch () {
            this.search="";
        },
        nextPage(page) {
            this.pageNumber = page;
        },

        selectbank(houseOfBank,accno,bnknme) {
            localStorage.removeItem("task");
            localStorage.removeItem("TrDataLs");
            console.log("SELECTED DATA::", accno);
            this.search=""
            this.nameofbank = houseOfBank;
            this.bankaccountnumber = accno;
            this.subbnknme=bnknme
            this.getImgUrl(this.nameofbank);
            this.strtImport=false;
            this.submtfrApprovalflag2 = true
            this.imprtDtaBtnNme = "Import New Data";
            this.resBatchId = 0;
            if (this.showimport === false) {
                this.showhistorydata();
            }
        },

        setTransDate(){

            let todayDate = Date.now();
            todayDate = moment(todayDate).format("DD-MM-YYYY");
            let transDate=this.TransactionStartDate;

            console.log("todayDate--------",todayDate===transDate)
            console.log("transDate------",transDate)
            this.nowDate=moment(transDate,'DD/MM/YYYY').format('YYYY-MM-DD');

            if(todayDate===transDate){
                this.imprtdate = moment(todayDate,'DD/MM/YYYY').format('YYYY-MM-DD');
                this.trggrBlnkRnFlg=true
            }else{    
                let new_date = moment(this.TransactionStartDate,"DD-MM-YYYY").add(1, "days");
                console.log("TransactionStartDate", new_date);
                let nextdate = moment(new_date).format("DD-MM-YYYY");
                console.log("nextdate", nextdate);
                this.imprtdate = moment(nextdate,'DD/MM/YYYY').format('YYYY-MM-DD');
                console.log("batch ID", this.resBatchId);
            }
            this.oldDate= this.imprtdate
            console.log("old date", this.oldDate);
        },

        on() {},

        getImgUrl(picname) {
            console.log(picname,"picname")
            try{
                this.bnkProfilePic = require('../assets/'+picname+'.png')
            }catch(error){
                this.bnkProfilePic = require('../assets/All_banks.png')
            }
            return this.bnkProfilePic
        },

        onImgError(){
            this.bnkProfilePic =require('../assets/All_banks.png')
        },

       

        GetAllFiltersData(bnkAccNo) {
            var self = this;
            // self.showLoader('Loading', true);
            console.log("batchID", self.resBatchId);
            self.resBatchId = 0;
        
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

            if(localStorage.getItem("TrDataLs")===null) {
                self.selectbank(self.bankList[0].HouseOfBank,self.bankList[0].BankAcNo,self.bankList[0].BankName);
            }
            // axios({
            //     method: "post",
            //     url:
            //         this.API_Service_admin() +"/FilteringData/api/FilterData/getFilteringData",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "cache-control": "no-cache",
            //         "postman-token": "3f94caee-caf5-9868-c710-b9e10d4d886b",
            //     },
            //     data: {
            //         UserId: 1,
            //         // PageId: 1,
            //         PageName:"dataImport",
            //         BankAcNo: bnkAccNo,
            //     },
            // })
            //     .then(function (response) {
            //         console.log("Filter APi Response>>>>>>", response);

            //         if(!response.data.FilterDataForCommon || response.data.FilterDataForCommon.length == 0){
            //             console.log("Array is either empty or does not exist")
            //              self.showToast("No Data Found",self.TOST().WARNING);
            //              self.showLoader('Loading', false);
            //             return
            //         }

                    // self.FilteringApi=[];
                    // self.FilteringApi = response.data.FilterDataForCommon;

                    // self.bankList = [];
                    // self.FilteringApi.map((bnk) => {
                    //     self.bankList.push({
                    //         BankName: bnk.BankName,
                    //         BankAcNo: bnk.BankAcNo,
                    //         HouseOfBank: bnk.HouseOfBank,
                    //         fullObj: bnk,
                    //     });
                    // });
                    // console.log("bankList Array", self.bankList);
                    // self.bankList = Object.values(
                    //     self.bankList.reduce(
                    //         (acc, cur) =>
                    //             Object.assign(acc, { [cur.BankAcNo]: cur }),
                    //         {}
                    //     )
                    // );
                    // console.log(" Unique bankList's >>>", self.bankList);
    
                    // if(localStorage.getItem("TrDataLs")===null) {
                    //     self.selectbank(self.bankList[0]);
                    // }
                    
                    // self.showLoader('Loading', false)
                // })
                // .catch(function (error) {
                //     console.log("Filter APi Response>>>>>>", error);
                // });
        },

        GetBnkData(bnkAccNo) {
            var self = this;
            self.showLoader('Loading', true);
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
                    UserId: self.User_id,
                    // PageId: 1,
                    PageName:"dataImport",
                    BankAcNo: bnkAccNo,
                },
            })
                .then(function (response) {
                    console.log("Filter APi Response>>>>>>", response);
                    self.bankAPIData=[]
                    if(!response.data.FilterDataForCommon || response.data.FilterDataForCommon.length == 0){
                        console.log("Array is either empty or does not exist")
                         self.showToast("No Data Found",self.TOST().WARNING);
                         self.showLoader('Loading', false);
                        return
                    }
                    var found = false;
                    for(let i=0; i<response.data.FilterDataForCommon.length;i++){

                        if (response.data.FilterDataForCommon[i].PaymentModeId === 1) {
                            found = true;
                            break;
                        }
                    }

                    if(found === false){
                        console.log("Array is either empty or does not exist")
                            self.showToast("Please Map BS first for selected bank",self.TOST().WARNING);
                            self.showLoader('Loading', false);
                            return
                    }

                    self.bankAPIData = response.data.FilterDataForCommon;
                    // var self = this;
                    let bnknmeMatch = self.bankAPIData.filter(function (item) {
                        return item.BankAcNo === self.bankaccountnumber;
                    });

                    console.log("bnknmeMatch", bnknmeMatch);
                    self.PreviousClosingBalance = bnknmeMatch[0].PreviousClosingBalance;
                    self.TransactionStartDate = bnknmeMatch[0].TransactionStartDate;

                    self.HouseofBnk = [];
                    self.BankAcNo = [];
                    self.trData = [];
                    bnknmeMatch.map((bnk) => {
                        self.HouseofBnk.push(bnk.HouseOfBank);
                    });

                    let uniqbnks = [...new Set(self.HouseofBnk)];
                    console.log("uniq", uniqbnks);
                    self.HouseofBnk = [];
                    uniqbnks.map((e) => {
                        // console.log("e s-----",   e);
                        self.HouseofBnk.push({ text: e, value: e });
                    });
                    console.log("self.HouseofBnk", self.HouseofBnk);

                    if(localStorage.getItem("TrDataLs")===null) {
                        self.bank = self.HouseofBnk[0];
                        
                    }
                    self.strtImport = true;
                    self.resBatchId = 0;
                    self.imprtDtaBtnNme = "Cancel";
                    self.truevalidatefrom = false;
                    self.saveDraftflag = false; 
                    self.validationfrom = "";
                    self.bankAccFilter();
                    self.trTypeFilter();
                    if(localStorage.getItem("TrDataLs")===null) {
                        self.setTransDate();
                    }

                    if("TrDataLs" in localStorage){
                        console.log("this.imprtdate",self.imprtdate)
                        console.log("this.TransactionStartDate",self.TransactionStartDate)
                        if( moment(self.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY')<=self.TransactionStartDate){
                            self.trggrBlnkRnFlg =true
                        }else{
                            self.trggrBlnkRnFlg =false
                        }
                        let transDate=self.TransactionStartDate;
                        self.nowDate=moment(transDate,'DD/MM/YYYY').format('YYYY-MM-DD');
                    }
                    // self.setTransDate();
                    
                    self.showLoader('Loading', false);

                })
                .catch(function (error) {
                    console.log("Filter APi Response>>>>>>", error);
                });
        },


        parseDate(date) {
            console.log("parsedate", date);
            if (!date) return null;
            const [month, day, year] = date.split("/");
            return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
        },

        formatDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return `${day}-${month}-${year}`;
        },
        // trtpyreset(){
        //     if(this.resBatchId!==0){
        //         this.dialogrst=true;    
        //     }
        // },
        rstTRYs(){
            localStorage.removeItem("task");
            localStorage.removeItem("TrDataLs");
            this.trTypeFilter();
            this.resBatchId=0;
            // console.log("this.imprtdate Date", this.imprtdate)
            this.chngDate(this.incmgDate)
            this.dialogrst =false
            this.imprtcalender = false;
            this.saveDraftflag = false
            this.submtfrApprovalflag2 = true
            console.log("this.imprtdate Date", this.imprtdate)
            console.log("this.resBatchId", this.resBatchId)
        },
        rstTRNo(){
            this.imprtdate=this.oldDate
            this.dialogrst =false
            this.imprtcalender = false; 
        },

        chngDate(date) {
            console.log("Incoming date", date);
            // this.imprtdate= moment(date,'DD/MM/YYYY').format('YYYY-MM-DD'); 
            if(this.resBatchId!==0 && this.oldDate!==this.imprtdate){
                this.dialogrst=true;
                this.incmgDate=date
            }else{
                this.imprtcalender = false;
                
                console.log("transction Date", this.TransactionStartDate);
                console.log("this.imprtdate Date", this.imprtdate)
                this.oldDate=this.imprtdate
                console.log("this.oldDate Date", this.oldDate)

                console.log("matching Date",moment(this.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY')===this.TransactionStartDate)
                if( moment(this.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY')<=this.TransactionStartDate){
                    this.trggrBlnkRnFlg =true
                }else{
                    this.trggrBlnkRnFlg =false
                }
               
                let fromeDate = moment(date).valueOf();
                let CurrentDate = moment(Date.now()).valueOf();
                this.datediff(this.imprtdate);
                if (fromeDate > CurrentDate) {
                    this.truevalidatefrom = true;
                    this.validationfrom = "Cannot select future Date";
                    console.log("Im Greate than current Date");
                }else if(this.dteDiff>1){
                    this.truevalidatefrom = true;
                    this.validationfrom = "Add/Blank Run Previous Date Transaction First";
                    console.log("Previous Date Transaction First");
                }else {
                    this.truevalidatefrom = false;
                    this.validationfrom = "";
                }
            }
            
            // this.dialogrst=true;
            
        },

        datediff(date){ 
            let self = this;
            console.log("Date Selected", date);
            console.log("TransactionStartDate Selected",self.TransactionStartDate);
            // let seltdDte = moment(new Date(date)).format("DD-MM-YYYY");
            // console.log(seltdDte, ">>>>>seltdDte");
            let seltdDte2 = moment(moment(date,'YYYY-MM-DD ').format('DD-MM-YYYY'), "DD-MM-YYYY");
            console.log(seltdDte2, ">>>>>seltdDte2");
            let lstTransDte = moment(self.TransactionStartDate, "DD-MM-YYYY");
            console.log(lstTransDte, ">>>>>lstTransDte");
            self.dteDiff = seltdDte2.diff(lstTransDte, "days");
            console.log(self.dteDiff, " days of difference >>>>>");
            console.log(self.trData, "UPLOAD data");
        },

        closebulk() {
            // console.log("Excel File is>>>>>>>>", this.mediaFile);
            this.dialogBulkUpld = false;
            this.showLoader("Uploading", false);
            (this.mediaFile = null), (this.$refs.fileref.value = "");
            //  console.log("Excel File is>>>>>>>>", this.mediaFile);
        },

        cancelStepper() {
            this.dialogBulkUpld = false;
            this.steps = 1;
        },

        nameChange(pageName) {},

        toggleDiBtn() {
            if (this.imprtDtaBtnNme === "Import New Data") {
                // this.GetBnkData(this.bankaccountnumber)
               
            } else {
                this.strtImport = false;
                this.imprtDtaBtnNme = "Import New Data";
                
                // this.resetData();
                // console.log("resBatchId",this.resBatchId);
            }
        },

        showimportdata() {
            this.showimport = true;
            this.showhistory = false;
            this.dataimport = "Data Import";
            
            // console.log("upload click batch id", this.resBatchId)
            // console.log("upload click bankAcc no.", this.BankAcNo)
            // console.log("upload click tr data", this.trData)
        },

        showhistorydata() {
            this.showimport = false;
            this.strtImport = false;
            this.showhistory = true;
            this.imprtDtaBtnNme ="Import New Data"

            // this.resetData();
            this.truevalidatefrom = false;
            this.validationfrom = "";
            this.upldhstryData = [];
            console.log("Current bank Account no", this.bankaccountnumber);
            this.dataimport = "Upload History";
            let self = this;
            self.showLoader('Loading', true);
            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/UploadHistory/api/ViewUploadHistory/getBankFileUploadHistory ",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "189fef62-884b-ee1c-0187-82f7a006b0c3",
                },
                data: {
                    UserId: self.User_id,
                    PageName: "dashboard",
                    BankAcNo: this.bankaccountnumber,
                },
            })
                .then(function (response) {
                    console.log("Filter APi Response>>>>>>", response);
                    self.showLoader('Loading', false);
                    if(!response.data.GetUploadHistoryResponseList || response.data.GetUploadHistoryResponseList.length == 0){
                        console.log("Array is either empty or does not exist")
                         self.showToast("No Records Found for selected Bank",self.TOST().WARNING);
                        return
                    }
                    self.upldhstryData = response.data.GetUploadHistoryResponseList;
                    console.log("Filter APi Response>>>>>>", self.upldhstryData);
                })
                .catch(function (error) {
                    console.log("Filter APi Response>>>>>>", error);
                });
        },

        bankAccFilter() {
            let self = this;
            self.BankAcNo = [];
            self.trData = [];
            console.log("Main bank names selected", self.bank);
            console.log(
                "Global filter bank Acc selected",
                self.bankaccountnumber
            );
            let bnkmatch = self.bankAPIData.filter(function (item) {
                return item.BankAcNo === self.bankaccountnumber;
            });
            console.log("matched bank names", bnkmatch);

            bnkmatch.map((bnk) => {
                // console.log("bank names array", bnk);
                self.BankAcNo.push({ text: bnk.BankAcNo, value: bnk.BankAcNo });
            });
            self.BankAcNo = Object.values(
                self.BankAcNo.reduce(
                    (acc, cur) => Object.assign(acc, { [cur.value]: cur }),
                    {}
                )
            );
            console.log(" Unique BankAcNo's >>>", self.BankAcNo);
            if(localStorage.getItem("TrDataLs")===null) {
                self.account = self.BankAcNo[0];
            }
            
        },

        trTypeFilter() {
            let self = this;
            self.trData = [];
            console.log("Acc Number Selected",  self.bankaccountnumber);
            let bnkAccmatch = self.bankAPIData.filter(function (item) {
                return item.BankAcNo === self.bankaccountnumber;
            });

            console.log("bnkAccmatch >>>", bnkAccmatch);

            
            if(localStorage.getItem("TrDataLs")===null) {
                bnkAccmatch.map((bnk) => {
                // console.log("bank names", bnk);
                    self.trData.push({
                        TrModeName: bnk.TrModeName,
                        TrModeId: bnk.TrModeId,
                        PaymentModeName: bnk.PaymentModeName,
                        PaymentModeId: bnk.PaymentModeId,
                        BankId: bnk.BankId,
                        BankAcNo: bnk.BankAcNo,
                        BankName: bnk.BankName,
                        HouseOfBank: bnk.HouseOfBank,
                        trnsID: "",
                        CountOfRecord: null,
                        IsDateMatch: null,
                        NetBalance: "",
                        IsOpeningBalanceMatch: null,
                        UploadStatus:null,
                        UploadStatusMessage: "",
                        IsErrorFileAddeded: false,
                        IsDataSheetFormatValid: null,
                        OpeningBalance: "0",
                        ClosingBalance: "0",
                        batchId: "",
                        fieldID: "",
                        actionStatus: "",
                        Status: "",
                        UploadBtn: "Upload",
                        trCounter:0,
                        blnkrnflg:false
                    });
                });
                        
            }else{
                self.trData= JSON.parse(localStorage.getItem("TrDataLs"));
                self.checkflag();
                self.resBatchId= self.val.resBatchId
                self.saveDraftflag = true;
            }
            
            console.log("Transaction and Payment Mode Type", self.trData);
        },

        opendialog(e, index) {
            let self=this
            self.excelfilename = "";
            self.datediff(self.imprtdate)
            if (self.dteDiff > 1) {
                self.showToast("Please Upload/Blank Run Previous Day Data First",self.TOST().WARNING);
                return;
            }

            if (this.truevalidatefrom ===true) {
                self.showToast("Future Date Transaction Not Possible",self.TOST().WARNING);
                console.log("Im Greate than current Date");
                return;            
            }
            self.dialogBulkUpld = true;
            console.log("upload Data ", e);
            console.log("upload Data ", index);
            self.incomngTrType = e;
            self.uploadedIndx = index;
        },

        goNext() {
            console.log("Excel File is>>>>>>>>", this.mediaFile);

            if (this.mediaFile == undefined || this.mediaFile == null) {
                this.showToast("Please select a file to continue",this.TOST().WARNING);
                return;
            }
            this.errorLink = "";
            var self = this;
            console.log("TrType", self.incomngTrType);
            var a = {
                HouseOfBank: self.incomngTrType.HouseOfBank,
                BankName: self.incomngTrType.BankName,
                AccountNo: self.account.value,
                TrType: self.incomngTrType.TrModeName,
                TrTypeId: self.incomngTrType.TrModeId,
                TransactionDate: moment(self.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
                UserID: 1,
                PageName: "dataImport",
                BatchId: this.resBatchId,
                PaymentmodeName : self.incomngTrType.PaymentModeName,
            };

            var b = JSON.stringify(a);
            var c = JSON.parse(b);

            console.log(typeof c, "c=>>>");
            let formData = new FormData();
            formData.append("File", self.mediaFile);
            formData.append("bankFileUploadRëquest", b);

            console.log("Bank  FileUpload data",formData.get("BankFileUploadRëquest"));

            self.closebulk();
            self.showLoader('Loading', true);
            axios
                .post(
                    this.API_Service_admin()+"/FileUploadNew/api/FileUpload/UploadFileRespones",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                )
                .then((res, err) => {
                    console.log("File Upload Response>>>>>>>>", res);
                    self.showLoader('Loading', false);
                    // if((res.data.batchId === null || res.data.batchId === undefined) && self.resBatchId === 0  ){
                    //     self.resBatchId= 0
                    // }else{
                    self.resBatchId = res.data.batchId;
                    // }
                    
                   
                    console.log("BatchId after Response>>>>", this.resBatchId);
                    self.mediaFile = null;
                    self.$refs.fileref.value = "";
                    console.log("Excel File is>>>>>>>>", this.mediaFile);
                    self.trForBnkStmt={}
                    self.trForBnkStmt = res.data;
                    console.log("trForBnkStmt", this.trForBnkStmt);
                    self.trData[self.uploadedIndx].CountOfRecord =self.trForBnkStmt.CountOfRecord;
                    self.trData[self.uploadedIndx].IsDateMatch =self.trForBnkStmt.IsDateMatch;
                    self.trData[self.uploadedIndx].NetBalance =self.trForBnkStmt.NetBalance;
                    self.trData[self.uploadedIndx].IsOpeningBalanceMatch =self.trForBnkStmt.IsOpeningBalanceMatch;
                    self.trData[self.uploadedIndx].UploadStatus =self.trForBnkStmt.UploadStatus;
                    self.trData[self.uploadedIndx].IsDataSheetFormatValid =self.trForBnkStmt.IsDataSheetFormatValid;
                    self.trData[self.uploadedIndx].OpeningBalance =self.trForBnkStmt.OpeningBalance;
                    self.trData[self.uploadedIndx].ClosingBalance =self.trForBnkStmt.ClosingBalance;
                    self.trData[self.uploadedIndx].batchId =self.trForBnkStmt.batchId;
                    self.trData[self.uploadedIndx].fieldID = self.trForBnkStmt.fieldID;
                    self.trData[self.uploadedIndx].actionStatus =self.trForBnkStmt.actionStatus;
                    self.trData[self.uploadedIndx].Status =self.trForBnkStmt.Status;
                    self.trData[self.uploadedIndx].UploadStatusMessage =self.trForBnkStmt.UploadStatusMessage;
                    self.trData[self.uploadedIndx].IsErrorFileAddeded =self.trForBnkStmt.IsErrorFileAddeded;
                    self.trData[self.uploadedIndx].UploadBtn = "Re-Upload";
                    self.trData[self.uploadedIndx].blnkrnflg= false

                    if( self.trData[self.uploadedIndx].UploadStatus ===true && self.trData[self.uploadedIndx].TrModeId !==1 ){
                        self.trData[self.uploadedIndx].trCounter = 1;
                    }else{
                        self.trData[self.uploadedIndx].trCounter = 0;
                    }


                    if( self.trData[self.uploadedIndx].UploadStatus ===true ){
                        self.showToast("File uploaded successfully",self.TOST().SUCCESS);
                    }else if( self.trData[self.uploadedIndx].UploadStatus ===false ){
                        self.showToast("File upload rejected",self.TOST().WARNING);
                    }else{
                        self.showToast('Something went wrong', this.TOST().ERROR);
                    }
                    
                    self.$forceUpdate();
                    console.log("trData", self.trData);
                    localStorage.setItem("TrDataLs", JSON.stringify(self.trData));
                    var obj = {
                        "nameofbank":self.nameofbank,
                        "subbnknme":self.trData[0].BankName,
                        "bankaccountnumber":self.bankaccountnumber,
                        "strtImport": self.strtImport,
                        "bank": self.bank,
                        "account":self.account,
                        "imprtdate": self.imprtdate,
                        "resBatchId": self.resBatchId
                    }
                    localStorage.setItem("task", JSON.stringify(obj));
                    self.checkflag();
                    self.saveDraftflag = true;
                    self.checkmanFlg3 = false;
                })
                .catch(function (error) {
                    console.log("File Upload Error>>>>>>>>", error);
                });
        },

        checkflag() {
            var self = this;
            self.submtfrApprovalflag2 = false;

            for (let i = 0; i < self.trData.length; i++) {
                if (
                    self.trData[i].UploadStatus === false ||
                    self.trData[i].UploadStatus === undefined ||
                    self.trData[i].UploadStatus === null
                ) {
                    self.submtfrApprovalflag2 = true;
                }
            }
            console.log("submit for Approvl Flag", self.submtfrApprovalflag2);

        },

        jsonupload(e) {
            console.log("Event file is", e);
            // console.log('File Name======>>>', e.target.files[0].name);

            this.excelfilename = e.target.files[0].name;
            this.mediaFile = e.target.files[0];
            console.log("length of file", this.mediaFile);
            this.showToast("Success. Please click on " + '"Submit"' + " to upload file","success");
            this.$refs.fileref.value = "";
        },

        snglBlnkRn(e,index){

            let self=this

            self.datediff(self.imprtdate)

            if (self.dteDiff > 1) {
                self.showToast("Please Upload/Blank Run Previous Day Data First",self.TOST().WARNING);
                return;
            }
            if (this.truevalidatefrom ===true) {
                // this.truevalidatefrom = true;
                // this.validationfrom = "Cannot select future Date";
                 self.showToast("Future Date Transaction Not Possible",self.TOST().WARNING
                );
                console.log("Im Greate than current Date");
                return;            
            }
              // 99
            let bsUploadFlag= false
            console.log("trData", self.trData);
            for(let k=0; k<self.trData.length;k++){
                if(self.trData[k].UploadStatus !==true && self.trData[k].TrModeId==1){
                        bsUploadFlag = true
                }
            }

            if(bsUploadFlag ===true){
                console.log("BS upload Flag>>>>>>>>", bsUploadFlag)
                self.showToast("Please Upload Correct Bank Statement Data First",self.TOST().WARNING);
                return
            }  

            console.log("snglBlnkRn", e)
            this.snglRnclkDta= e
            this.blnkRunIndx=index
            this.dialog1=true
        },

        snglBlnkRnYs(){

            let self=this;
            self.showLoader('Loading', true);

            let snglBlnkRnDta = {
                BankAcNo: self.snglRnclkDta.BankAcNo,
                TrModeId: self.snglRnclkDta.TrModeId,
                BatchId: self.resBatchId,
                TransactionDate: moment(self.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
                OrigionalFileName: "",
                OpeningBalance: 0,
                NetBalance: 0,
                SessionId: self.sessionId,
                UserId: self.User_id,
                PageName: "File Uploading"
            };
            console.log("snglBlnkRnDta",snglBlnkRnDta)

                // sgle99
             axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/FileUploadNew/api/FileUpload/SingleTrBlankRun",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "25547666-a8e0-ea43-3300-ad38bee99bd4",
                },
                data:snglBlnkRnDta, 
            })
                .then(function (response) {
                    console.log("Single Blank API Response>>>>>>", response);
                    self.showLoader('Loading', false);
                    self.snglBnkRunRes={};
                    self.snglBnkRunRes =response.data
                    self.trData[self.blnkRunIndx].CountOfRecord=self.snglBnkRunRes.InsertCount
                    self.trData[self.blnkRunIndx].IsDateMatch= null
                    self.trData[self.blnkRunIndx].NetBalance= ""
                    self.trData[self.blnkRunIndx].IsOpeningBalanceMatch= false
                    self.trData[self.blnkRunIndx].UploadStatusMessage= ""
                    self.trData[self.blnkRunIndx].IsErrorFileAddeded= false
                    self.trData[self.blnkRunIndx].IsDataSheetFormatValid= null
                    self.trData[self.blnkRunIndx].OpeningBalance= "0"
                    self.trData[self.blnkRunIndx].ClosingBalance= "0"
                    self.trData[self.blnkRunIndx].batchId=self.snglBnkRunRes.BatchId
                    self.trData[self.blnkRunIndx].fieldID= ""
                    self.trData[self.blnkRunIndx].actionStatus= self.snglBnkRunRes.ActionStatus
                    self.trData[self.blnkRunIndx].Status=self.snglBnkRunRes.Status
                    self.trData[self.blnkRunIndx].UploadStatus =self.snglBnkRunRes.UploadStatus
                    self.trData[self.blnkRunIndx].UploadBtn = "Upload"
                    self.trData[self.blnkRunIndx].trCounter = 0 
                    self.trData[self.blnkRunIndx].blnkrnflg= true
                    self.$forceUpdate();
                    self.dialog1=false
                    console.log("trData", self.trData);
                    self.checkflag();
                    localStorage.setItem("TrDataLs", JSON.stringify(self.trData));
                    var obj = {
                        "nameofbank":self.nameofbank,
                        "subbnknme":self.trData[0].BankName,
                        "bankaccountnumber":self.bankaccountnumber,
                        "strtImport": self.strtImport,
                        "bank": self.bank,
                        "account":self.account,
                        "imprtdate": self.imprtdate,
                        "resBatchId": self.resBatchId
                    }
                    localStorage.setItem("task", JSON.stringify(obj));
                })
                .catch(function (error) {
                    console.log("Single Blank API Error>>>>>>", error);
                });

        },

        blk_blnkrnchk(){
            
            let self=this

            self.datediff(self.imprtdate)
            // return
           
            if (self.dteDiff > 1) {
                self.showToast(
                    "Please Upload/Blank Run Previous Day Data First",
                    self.TOST().WARNING
                );
                return;
            }

            if (this.truevalidatefrom ===true) {
               
                 self.showToast(
                    "Future Date Transaction Not Possible",
                    self.TOST().WARNING
                );
                console.log("Im Greate than current Date");
                return;            
            }

            this.dialog2=true

        },

        blkBlnkRnYs(){
            // this.datediff(this.imprtdate);

            let self=this;
            self.showLoader('Loading', true);
            let bulkBlnkRnDta = {
                BankAcNo: self.account.value,
                TransactionDate: moment(self.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
                OrigionalFileName: "",
                OpeningBalance: 0,
                NetBalance: 0,
                SessionId: self.sessionId,
                UserId: self.User_id,
                PageName: "dataImport"
            };
            console.log("bulk Blnk Rn Dta",bulkBlnkRnDta)
                // sgle99
             axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/FileUploadNew/api/FileUpload/BulkTrBlankRun",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "77d3ff05-07a7-bfca-1f09-f4b41e968ed4",
                },
                data:bulkBlnkRnDta, 
            })
                .then(function (response) {
                    console.log("Bulk Blank Run APi Response>>>>>>", response);
                    self.showLoader('Loading', false);
                    self.bulkBlnkRnRes =response.data
                    self.dialog2=false
                    self.showhistorydata();
                })

                .catch(function (error) {
                    console.log("Bulk Blank Run API Error>>>>>>", error);
                })

        },


        saveDraft() {
            //         console.log("v-model main bank vlue",this.mainBankname)
            // let data= {
            //         BankId: this.mainBankname.value,
            //         // TrModeId: 3,
            //         TransactionDate: "29-04-2020",
            //         BatchId: this.resBatchId,
            //         ActionStatus: "saveAsDraft",
            //         SessionId: 1,
            //         UserId: 1,
            //         PageName: "File Uploading",
            //         // FunctionName: "fileBatchStatusUpdateRequest",
            //     }
            //     console.log(data)
            //     return
            var self = this;
            self.showLoader('Loading', true);
            if (self.resBatchId == 0 || self.resBatchId == null) {
                self.showToast(
                    "Please upload at least one Data File",
                    self.TOST().WARNING
                );
                return;
            } else {
                axios({
                    method: "post",
                    url:
                        this.API_Service_admin()+"/FileUploadNew/api/FileUpload/fileBatchStatusUpdateRequest",
                    headers: {
                        "Content-Type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "52104913-18ea-4dec-883e-1d55b69aa2eb",
                    },
                    data: {
                        BankId: self.trData[0].BankId,
                        // TrModeId: 3,
                        TransactionDate: moment(self.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
                        BatchId: self.resBatchId,
                        ActionStatus: "saveAsDraft",
                        SessionId: self.sessionId,
                        UserId: self.User_id,
                        PageName: "File Uploading",
                        // FunctionName: "fileBatchStatusUpdateRequest",
                    },
                })
                    .then(function (response) {
                        self.draftRspnse=[];
                        self.draftRspnse.push(response.data);
                        self.showLoader('Loading', false);
                        console.log(self.draftRspnse, "Draft response.data");
                        self.showhistorydata();
                        localStorage.removeItem("task");
                        localStorage.removeItem("TrDataLs");
                    })
                    .catch(function (error) {
                        console.log("Save as Draft Error>>>>>>>>", error);
                    });
            }
        },

        submtApproval() {


            let self = this;
            console.log("Date Selected", self.imprtdate);
            console.log("TransactionStartDate Selected",self.TransactionStartDate);

            self.datediff(self.imprtdate)


            if (self.dteDiff > 1) {
                self.showToast("Please Upload Previous Day Data First",self.TOST().WARNING);
                return;
            }

            // let data= {

            //         BankId: self.incomngTrType.BankId,
            //         // TrModeId: 3,
            //         TransactionDate: self.imprtdate,
            //         BatchId: self.resBatchId,
            //         ActionStatus: "fileSentForApproval",
            //         SessionId: 1,
            //         UserId: 1,
            //         PageName: "File Uploading",
            //         // FunctionName: "fileBatchStatusUpdateRequest",
            //     }
            //     console.log(data,"Before API huit")
            // return

            for (let i = 0; i < self.trData.length; i++) {
                console.log("Testing>>>>>>");
                if (self.trData[i].UploadStatus !== true) {
                    self.checkmanFlg3 = true;
                }
            }

            if (self.checkmanFlg3 === true) {
                console.log("checkmanFld3>>>>>>>>", self.checkmanFlg3);
                self.showToast(
                    "Please Upload Correct Data",
                    self.TOST().WARNING
                );
                return;
            }

            let trUploadFlag=false
            for (let i = 0; i < self.trData.length; i++) {
                console.log(" trUploadFlag Testing>>>>>>");
                if (self.trData[i].UploadStatus === true && self.trData[i].TrModeId !==1 && self.trData[i].trCounter===1) {
                    trUploadFlag = true;
                }
            }



            if (trUploadFlag === false) {
                console.log("trUploadFlag>>>>>>>>",trUploadFlag);
                self.showToast(
                    "Please Upload Atleast One Transaction File",
                    self.TOST().WARNING
                );
                return;
            }
            self.showLoader('Loading', true);
            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/FileUploadNew/api/FileUpload/fileBatchStatusUpdateRequest",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "d024ca19-64b5-14f2-649f-c7444a336d29",
                },
                data: {
                    BankId: self.trData[0].BankId,
                    // TrModeId: 3,
                    TransactionDate: moment(self.imprtdate,'YYYY-MM-DD ').format('DD-MM-YYYY'),
                    BatchId: self.resBatchId,
                    ActionStatus: "fileGroupSubmit",
                    SessionId: self.sessionId,
                    UserId: self.User_id,
                    PageName: "File Uploading",
                    // FunctionName: "fileBatchStatusUpdateRequest",
                },
            })
                .then(function (response) {
                    console.log("Send for Approval Response>>>>>>>>",response.data);
                    self.showLoader('Loading', false);
                    self.sbmtAprvlRspnse = {};
                    self.sbmtAprvlRspnse = response.data;
                    console.log(self.sbmtAprvlRspnse, "Submit Approval response.data");
                    
                    if(self.sbmtAprvlRspnse.isBSandTRbalanceTally===true){
                        self.bsTrtly="BS and TR balance tally"
                    }else{
                        self.bsTrtly="BS and TR balance mismatch"
                    }

                    if(self.sbmtAprvlRspnse.isWithoutDuplicateEntry===true){
                        self.duplicate="No duplicate file found"
                    }else{
                        self.duplicate="Duplicate file found"
                    }

                    if(self.sbmtAprvlRspnse.isOpeningBalanceMatch===true){
                        self.blncmtch="BS Opening Balance match with previous day opening balance"
                    }else{
                        self.blncmtch="BS Opening Balance mismatch with previous day opening balance"
                    }

                    self.dialog = true;
                })
                .catch(function (error) {
                    console.log("Send for Approval Error>>>>>>>>", error);
                });
        },

        closeSAbx() {

            if((this.sbmtAprvlRspnse.isWithoutDuplicateEntry===true)&& (this.sbmtAprvlRspnse.isBSandTRbalanceTally===true) && (this.sbmtAprvlRspnse.isOpeningBalanceMatch===true)){
                localStorage.removeItem("task");
                localStorage.removeItem("TrDataLs");
                this.showhistorydata();
                this.resBatchId = 0;
                this.saveDraftflag = false;
                this.submtfrApprovalflag2 = true;
                console.log("Batch id after approval", this.resBatchId);
                console.log("bank names after approval", this.HouseofBnk);
                this.dialog = false;
            }else{
                this.dialog = false;
            }
        },

        download_report(indata, index) {
            console.log("incoming Data>>>>>>>>>>", indata);
            this.showLoader('Loading', true);
            let apiData = {
                BankAcNo: indata.BankAcNo,
                FileBatchId: indata.FileBatchId,
                UserID: 1,
                PageName: "DownloadFile",
            };
            console.log("Data before sendig to API ", apiData);

            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/FileUploadNew/api/DownloadFile/GetDownloadFileGroupURL",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "095cdacd-8598-70ca-3e79-ba4d68689aec",
                },
                data: apiData,
            })
            .then((response) => {
                 console.log("resoonse is ", response);
                 this.showLoader('Loading', false);
                 
                 let result=[]
                 // { 
                 //     DownloadFileURL: "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P3htbCB2ZXJzaW9uPSIxLjAiIGVuY29kaW5nPSJ1dGYtOCI/Pjxjb3JlUHJvcGVydGllcyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmRjdGVybXM9Imh0dHA6Ly9wdXJsLm9yZy9kYy90ZXJtcy8iIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvcGFja2FnZS8yMDA2L21ldGFkYXRhL2NvcmUtcHJvcGVydGllcyI+PGRjdGVybXM6Y3JlYXRlZCB4c2k6dHlwZT0iZGN0ZXJtczpXM0NEVEYiPjIwMjAtMDgtMDVUMTI6NTY6MjYuOTkyMjYzN1o8L2RjdGVybXM6Y3JlYXRlZD48ZGN0ZXJtczptb2RpZmllZCB4c2k6dHlwZT0iZGN0ZXJtczpXM0NEVEYiPjIwMjAtMDgtMDVUMTI6NTY6MjYuOTkyMjc5M1o8L2RjdGVybXM6bW9kaWZpZWQ+PC9jb3JlUHJvcGVydGllcz5QSwMEFAAACAAADWcFUe5XqGucAgAAnAIAAAsAAABfcmVscy8ucmVsc++7vzw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9InV0Zi04Ij8+PFJlbGF0aW9uc2hpcHMgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9wYWNrYWdlLzIwMDYvcmVsYXRpb25zaGlwcyI+PFJlbGF0aW9uc2hpcCBUeXBlPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL29mZmljZURvY3VtZW50IiBUYXJnZXQ9Ii94bC93b3JrYm9vay54bWwiIElkPSJSZjQzYTM5Y2ExY2NmNDdiMSIgLz48UmVsYXRpb25zaGlwIFR5cGU9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvZXh0ZW5kZWQtcHJvcGVydGllcyIg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"
                 // },
                 // {
                 //     DownloadFileURL: "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P3htbCB2ZXJzaW9uPSIxLjAiIGVuY29kaW5nPSJ1dGYtOCI/Pjxjb3JlUHJvcGVydGllcyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmRjdGVybXM9Imh0dHA6Ly9wdXJsLm9yZy9kYy90ZXJtcy8iIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvcGFja2FnZS8yMDA2L21ldGFkYXRhL2NvcmUtcHJvcGVydGllcyI+PGRjdGVybXM6Y3JlYXRlZCB4c2k6dHlwZT0iZGN0ZXJtczpXM0NEVEYiPjIwMjAtMDgtMDVUMTI6NTY6MjYuOTkyMjYzN1o8L2RjdGVybXM6Y3JlYXRlZD48ZGN0ZXJtczptb2RpZmllZCB4c2k6dHlwZT0iZGN0ZXJtczpXM0NEVEYiPjIwMjAtMDgtMDVUMTI6NTY6MjYuOTkyMjc5M1o8L2RjdGVybXM6bW9kaWZpZWQ+PC9jb3JlUHJvcGVydGllcz5QSwMEFAAACAAADWcFUe5XqGucAgAAnAIAAAsAAABfcmVscy8ucmVsc++7vzw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9InV0Zi04Ij8+PFJlbGF0aW9uc2hpcHMgeG1sbnM9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9wYWNrYWdlLzIwMDYvcmVsYXRpb25zaGlwcyI+PFJlbGF0aW9uc2hpcCBUeXBlPSJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL29mZmljZURvY3VtZW50IiBUYXJnZXQ9Ii94bC93b3JrYm9vay54bWwiIElkPSJSZjQzYTM5Y2ExY2NmNDdiMSIgLz48UmVsYXRpb25zaGlwIFR5cGU9Imh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvZXh0ZW5kZWQtcHJvcGVydGllcyIg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"
 
                 // }
                 result = response.data;
                 result = result.map((a,index) => {
                     return {
                         download: a.DownloadFileStream,
                         filename: a.NewFileName,
                         blob1:"",
                         blobUrl1:""
                     };
                 });

                 console.log( " ----> from multi - dowload links ---> ",result);

                 result = result.filter((b) => {
                    return b.download !== null
                 });

                 // let download_url = response.data.DownloadFileURL
                 console.log( " ----> from multi - dowload links after remove null ---> ",result);
                 if(!result || result.length == 0){
                    console.log("Array is either empty or does not exist")
                    this.showToast("No Files Found",this.TOST().WARNING);
                    return
                 }
                 for(let i=0;i<result.length;i++){
                     var contentType = 'application/vnd.ms-excel';
                     result[i].blob1= this.b64toBlob(result[i].download, contentType);
                     result[i].blobUrl1 = URL.createObjectURL(result[i].blob1);

                 }
                 console.log("blobUrl1>>>>>>>>", result);
                 result = result.map((a,index) => {
                     return {
                         download: a.blobUrl1,
                         filename: a.filename,
                     };
                 });
                 console.log("final Bloblinks>>>>>>>>", result);
                 this.download_files(result);
                 

            })
            .catch(function (error) {
                 console.log("Send for Approval Error>>>>>>>>", error);
            });
        },

        download_files(files) {
            function download_next(i) {
                if (i >= files.length) {
                 return;
                }
                var a = document.createElement("a");
                a.href = files[i].download;
                a.target = "_parent";
                // Use a.download if available, it prevents plugins from opening.
                if ("download" in a) {
                    a.download = files[i].filename;
                }
                // Add a to the doc for click to work.
                (document.body || document.documentElement).appendChild(a);
                if (a.click) {
                    a.click(); // The click method is supported by most browsers.
                } else {
                    console.log(
                        "The click method is not supported by browsers."
                    );
                }
                // Delete the temporary link.
                a.parentNode.removeChild(a);
                // Download the next file with a small timeout. The timeout is necessary
                // for IE, which will otherwise only download the first file.
                setTimeout(function () {
                    download_next(i + 1);
                }, 700);
            }
            // Initiate the first download.
            download_next(0);
        },

        forceDownload(url, fileName) {
            console.log("force download called");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "blob";
            xhr.onload = function () {
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(this.response);
                var tag = document.createElement("a");
                tag.href = imageUrl;
                tag.download = fileName;
                document.body.appendChild(tag);
                tag.click();
                document.body.removeChild(tag);
            };
            xhr.send();
        },

        dwnload_ErrorLogs(indata, index){
            console.log(indata);
            // this.setfileName = indata.HouseOfBank+"_"+indata.PaymentModeName+"_"+indata.TrModeName+"_"+ moment().format("DD-MM-YYYY");
            let self=this
            self.showLoader('Loading', true);
            // axios({
            //     method: "get",
            //     url:
            //         this.API_Service_admin()+"/FileUploadNew/api/DownloadFile/DownloadFileStream",

            //     headers: {
            //         "Content-Type": "application/json",
            //         "cache-control": "no-cache",
            //         "postman-token": "3a975120-cee9-0a20-7223-5049fc97da8a",
            //     },
            // })

            let apiData = {
                BankAcNo: indata.BankAcNo,
                FileBatchId: indata.batchId,
                TrModeId: indata.TrModeId,
                UserID: 1,
                PageName: "DownloadFile",
            };
            console.log("Data before sendig to API ", apiData);
            axios({
                method: "post",
                url:
                   this.API_Service_admin()+"/FileUploadNew/api/DownloadFile/GetSinlgFileDownloadURL",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "59b0d656-d0a5-26b4-3cf7-1890cd9c7a37",
                },
                data: apiData,
            })
            .then((response) => {
            console.log("DownloadFileStream",response.data.DownloadFileStream);
            if(!response.data.DownloadFileStream){
                console.log("Array is either empty or does not exist")
                self.showLoader('Loading', false);
                this.showToast("No Files Found",this.TOST().WARNING);
                return
            }
            self.setfileName=response.data.NewFileName
            self.convertBase64ToExcel(response.data.DownloadFileStream)
            self.showLoader('Loading', false);
            
            })
            .catch(function (error) {
                console.log("DownloadFileStream Error>>>>>>>>", error);
                });

        },

        convertBase64ToExcel(data){
            var contentType = 'application/vnd.ms-excel';
            var blob1 = this.b64toBlob(data, contentType);
            var blobUrl1 = URL.createObjectURL(blob1);
            console.log("blobUrl1>>>>>>>>", blobUrl1);
            // return   
            // window.open(blobUrl1);
            let a = document.createElement("a");
            a.href = blobUrl1;
            a.download = this.setfileName || 'download';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl1);
        },

        b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {type: contentType});
            return blob;
        },

        // dwnload_ErrorLogs(indata, index) {
        //     console.log("indata error log clicked", indata);
        //     let apiData = {
        //         BankAcNo: indata.BankAcNo,
        //         FileBatchId: indata.batchId,
        //         TrModeId: indata.TrModeId,
        //         UserID: 1,
        //         PageName: "DownloadFile",
        //     };
        //     console.log("Data before sendig to API ", apiData);
        //     axios({
        //         method: "post",
        //         url:
        //             this.API_Service_admin()+"/AwsUploadDownload/api/DownloadFile/GetSinlgFileDownloadURL",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "cache-control": "no-cache",
        //             "postman-token": "4974a5a1-9c6c-1062-674c-676ea116d198",
        //         },
        //         data: apiData,
        //     })
        //         .then(function (response) {
        //             console.log("resoonse is ", response.data);
        //             let download_url = response.data.DownloadFileURL;
        //             console.log(" ----> URL ---> ", download_url);
        //             let a = document.createElement("a");
        //             a.href = download_url;
                    // var filename = download_url.split('/').pop()
                    // var extend = indata.BankName+"_"+indata.PaymentModeName+" "+indata.TrModeName
                    // a.download = filename.concat(extend).toUpperCase()
                    // document.body.appendChild(a);

                    // a.click();
                    // document.body.removeChild(a);
                    // setTimeout(self.upldhstryData[index].dwld = false , 1000);
        //         })
        //         .catch(function (error) {
        //             console.log("Send for Approval Error>>>>>>>>", error);
        //         });
        // },
    },
};
</script>

<style>

.cust_blnkRnChk{
    display: flex !important; 
    align-items: center !important;   
}

.blnkRnChkIcn{
    margin-right:unset !important;
    border:1px solid #C1C8CC !important;
    padding:11px !important;  
    /* cursor:pointer !important; */
    box-shadow: 0px 2px 2px #00000051;

}

.blnkRnChkBtn{

    color:#646666 !important; 
    margin-left:unset !important; 
    border:0.5px solid #C1C8CC !important; 
    /* border-left:unset !important; */
    padding:23px 26px !important;
    background-color:#E6E6E6 !important;
    text-transform: none !important;
    font-family: Roboto !important;
    font-weight: 700 !important;
    box-shadow: 0px 2px 2px #00000051;

}
.activeredbackground {
    background-color: #e46a25 !important;
    color: #ffffff !important;
}

.inactivewhitebackground {
    background-color: #ffffff !important;
    color: #646666 !important;
}

.di-btn {
    text-transform: none;
}
.bottombtn {
    height: 55px;
    /* box-shadow: 0px 3px 3px #00000051; */
    border: 1px solid #c1c8cc !important;
    background-color: #F7F7F7 !important;
    opacity: 2;
}

.cursorpointter {
    cursor: pointer;
}

.fileContainer-bnkBulk {
    overflow: hidden;
    position: relative;
}

.fileContainer-bnkBulk [type="file"] {
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

.fileContainer-bnkBulk {
    background-color: #e46a25;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    /* height: 10px; */
}

.fileContainer-bnkBulk [type="file"] {
    cursor: pointer;
}

.hs:before,
.hs:after {
    content: "";
    width: 10px;
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

.downarrow {
    height: 10px;
    width: 10px;
}

.bankimg {
    height: 45px;
    width: 45px;
}

.di-submit-icon-error {
    padding: 1px !important;
    background-color: #d1121b;
    border-radius: 10px !important;
}
.cust-di-tbl table.v-table thead th {
    border-right: 1px solid #c1c8cc !important;
    background-color: #f3fbfb !important;
    color: #1e9690 !important;
    font-family: Roboto !important;
    font-weight: 700 !important;
}
.cust-di-tbl table.v-table thead th:last-child {
    border-right: unset !important;
}
.cust-di-tbl table.v-table tbody td,
.cust-di-tbl table.v-table thead tr {
    height: 40px !important;
}
.cust-di-tbl table.v-table thead tr:last-child {
    height: unset !important;
}
.cust-di-tbl .v-table tr:hover:not(.v-table__expanded__content) {
    background: #fef9f6 !important;
}

.custDi-tbl-brdr {
    border: 1px solid #c1c8cc;
}
.custDi-td-bdrgt {
    border-right: 1px solid #c1c8cc;
}
.cust-Di-pgn .v-pagination__navigation {
    box-shadow: unset !important;
    border-radius: unset !important;
    background-color: #ffffff !important;
    border: 1px solid #dae1e6 !important;
}
.cust-Di-pgn .v-pagination__navigation--disabled {
    background-color: #dae1e6 !important;
}
.cust-Di-pgn .v-pagination__item {
    box-shadow: unset !important;
    min-width: 2rem !important;
    height: 2rem !important;
    border-radius: unset !important;
    border: 1px solid #dae1e6 !important;
}
.date-di-validation {
    color: red;
    display: flex;
    position: relative;
    bottom: 11px;
    font-size: 12px;
}

.cust-Di-list .v-list__group__items--no-action .v-list__tile {
    padding-left: 30px;
}

.green-clr{
    color:#23B1A9 !important;
}

.red-clr{
    color:#D1121B !important;
}

@media screen and (min-width: 320px) {
    .upload-bnktext {
        font-size: 14px;
        color: #fdfeff;
        font-weight: 500;
    }
    .fileContainer-bnkBulk {
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
