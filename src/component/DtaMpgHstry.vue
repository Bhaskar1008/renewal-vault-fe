<template>
    <v-app>
        <v-layout column>
            <v-card>
                <v-layout row justify-center class="pt-2 pb-2">
                    <!-- <v-layout row class="pl-3">
                        <v-flex sm4 class="mr-4">
                            <label style=" color: #646666; font-family: roboto; font-weight: 700;">From</label>
                            <v-menu  class="pt-2" ref="calender" :close-on-content-click="false" v-model="calender" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                <v-text-field solo slot="activator" v-model="dmStartDate"  label="" persistent-hint prepend-inner-icon="event"  @blur="date = parseDate(dmStartDate)"></v-text-field>
                                <v-date-picker  v-model="date" no-title @input="calender = false"></v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex sm4>
                            <label style="color: #646666; font-family: roboto; font-weight: 700;" >To</label>
                            <v-menu  class="pt-2" ref="calender" :close-on-content-click="false" v-model="calender1" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                <v-text-field  solo slot="activator" v-model="dmEndDate"  label="" persistent-hint prepend-inner-icon="event" @blur="date1 = parseDate(dmEndDate)"></v-text-field>
                                <v-date-picker  v-model="date1" no-title @input="calender1 = false"></v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout> -->
                    <!-- <v-layout row> -->
                        <!-- <v-flex sm2> -->
                             <p class="mt-4 ml-3" style="font-family: roboto;font-weight: 700;">
                                <span style="color: #e46a25;">Showing {{fromvalue}}-{{toValu}} </span>out of {{diUpldhstryDta.length}} records
                            </p>
                        <!-- </v-flex> -->
                        <!-- <v-flex class='pt-3 pb-4'><v-divider vertical></v-divider></v-flex> -->
                        <!-- <v-flex sm6 > -->
                            <!-- :page="page" -->
                            <v-pagination
                                class="cust-Dm-pgn mt-2"
                                v-model="pageNumber"
                                color="#152F38"
                                flat
                                @input="nextPage"
                                :length="pages">
                            </v-pagination>

                        <!-- </v-flex> -->
                    <!-- </v-layout> -->
                </v-layout>
            </v-card>
            <v-card>
                <v-flex style="" class="cust-Di-tbl">
                    <v-data-table
                            class="Di-tbl-brdr ma-0 pa-0"
                            :headers="headers"
                            :items="paginatedData"
                            v-bind:pagination.sync="pagination"
                            hide-actions
                            item-key="_id"
                        >
                            <template slot="items" slot-scope="props" >
                                <td style="" class="Di-td-bdrgt">{{props.item.MapID}}</td>
                                <td style="" class="Di-td-bdrgt">{{props.item.CreatedDate}}</td>
                                <td style="" class="Di-td-bdrgt">{{props.item.CreatedTime}}</td>
                                <td style="" class="Di-td-bdrgt">{{props.item.BankName}}</td>
                                <td style="" class="Di-td-bdrgt">{{props.item.BankAcNo}}</td>
                                <td style="" class="Di-td-bdrgt">{{props.item.TxnType}}</td>
                                <td style="" class="Di-td-bdrgt">{{props.item.Subset}}</td>
                                <td style="" class="Di-td-bdrgt">{{props.item.ApprovalStatus}}</td>
                                <td style="" class="Di-td-bdrgt">{{props.item.RemarksFromApprover===null?'-':props.item.RemarksFromApprover}}</td>
                                <!-- <td style="" class="Di-td-bdrgt">{{props.item.paymentMode}}</td> -->
                                <!-- <td class="Di-td-bdrgt" style="color:#E46A25;font-weight: 700" v-if="props.item.status=='Approval Pending'">{{props.item.ApprovalStatus}}</td>
                                <td class="Di-td-bdrgt" style="color:#1E9690;font-weight: 700" v-else>{{props.item.ApprovalStatus}}</td> -->
                                <td class="justify-center layout px-0">
                                    <v-icon small class="mr-2" @click="dwnload_ErrorLogs(props.item, index)">get_app</v-icon>
                                </td>
                            </template>
                        </v-data-table>
                </v-flex>
            </v-card>
        </v-layout>
    </v-app>
</template>
<script>
import axios from "axios";
export default {

    props: {
        nameofbank: String
    },

    created() {
        this.User_id = this.$store.state.agentDetails.userId;
        this.sessionId = this.$store.state.agentDetails.sessionId;
        this.fieldsRcvd= this.$store.state.bankList_Di
        console.log("props recieved",this.$store.state.bankList_Di) 
        console.log("nameofbank recieved",this.nameofbank) 
        this.dm_History('All Banks');
    },

	mounted() {

        // console.log("props recieved",this.fieldsRcvd)  
    },

    watch: {

	    nofb(val) {
            console.log("From watcher the date is =>", val);
            this.dm_History(val);
        },

        date(val) {
	        this.dmStartDate = this.formatDate(this.date)
	        console.log("From watcher the date is =>", this.date);
        },
            
	    date1(val) {
            this.dmEndDate= this.formatDate(this.date1)
            console.log("From watcher the date is =>", this.date1);
		}
        					
	},
     
    computed:{

        // pages () {

        //     return this.pagination.rowsPerPage ? Math.ceil(this.diUpldhstryDta.length / this.pagination.rowsPerPage) : 0
        // },

        nofb(){
            // console.log("nameofbank recieved from computed",this.$store.state.allBanksDi)
            return this.$store.state.allBanksDi
        },

        pages () {

            console.log(this.size ? Math.ceil(this.diUpldhstryDta.length / this.size) : 0)
            return this.size ? Math.ceil(this.diUpldhstryDta.length / this.size) : 0
        },

        pageCount() {
            let l = this.diUpldhstryDta.length,
                s = this.size;
            return Math.ceil(l / s) - 1;
        },
        paginatedData() {
            const start = this.pageNumber * this.size - this.size,
            end = start + this.size;
            console.log(start,end,"start End")

            if(!this.diUpldhstryDta || this.diUpldhstryDta.length == 0){
                this.fromvalue=0
            }else{
                this.fromvalue=start+1;
            }

            if(this.diUpldhstryDta.length <this.size){
                this.toValu=this.diUpldhstryDta.length
            }else if(this.diUpldhstryDta.length <end){
                    this.toValu=this.diUpldhstryDta.length
            }else{
                this.toValu=end
            }

            console.log(this.fromvalue,this.toValu,"this.fromvalue this.toValu")
            return this.diUpldhstryDta.slice(start, end);
        }

    },

    data(){
        return{
            fieldsRcvd:[],
            nameofbankrcvd:this.nameofbank,
            calender: false,
            calender1: false,
             pagination: {
                rowsPerPage:15
            },
            pageNumber: 1,
            size: 15,
            fromvalue:'',
            toValu:'',
            dmStartDate:'',
            dmEndDate:'',
            User_id:'',
            sessionId:'',
            date: null,
            date1: null,
            page: 1,
            length: 4,
            diUpldhstryDta:[],
            setfileName:"",
            headers:[
                {text: 'Map ID', value: 'mapid',sortable: false},
                {text: 'Created Date', value: 'createdDate',sortable: false},
                {text: 'Created Time', value: 'createdTime',sortable: false},
                {text: 'Bank', value: 'bank',sortable: false},
                {text: 'Account', value: 'account',sortable: false},
                {text: 'Txn Type', value: 'txnType',sortable: false},
                {text: 'Subset', value: 'subset',sortable: false},
                { text: "Approval Status", value: "approvalStatus",sortable: false},
                { text: "Remarks From Approver", value: "remarksfromapprover",sortable: false },
                { text: "Download", value: "download",sortable: false },
            ],

        };
    },
    
    methods:{

        formatDate(date) {
	      if (!date) return null
	      const [year, month, day] = date.split('-')
	      return `${month}/${day}/${year}`
        },
        
        parseDate(date) {
            if (!date) return null
            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },

        nextPage(page) {
            this.pageNumber = page;
        },

        dm_History(indata){

            console.log("incoming data",indata)

            let self = this;
            self.showLoader('Loading', true);
            let dmHstryDta='';

            if(indata=== "All Banks"){

                dmHstryDta = {
                    UserId: self.User_id,
                    PageName: "dashboard",
                }

            }else{

                dmHstryDta = {
                    HouseOfBank:indata,
                    UserId: self.User_id,
                    PageName: "dashboard",

                }
            }

            console.log("dmHstryDta data",dmHstryDta)

            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/Mapping/api/Mapping/GetDataMappingHistory",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "a67f5146-905b-459f-f0c9-dabbd9981ec1",
                },
                data:dmHstryDta,
            })
           .then(function (response) {
               
               console.log("Filter APi Response>>>>>>", response);
               self.showLoader('Loading', false);
               self.diUpldhstryDta=[];

               if(!response.data || response.data.length == 0){
                    console.log("Array is either empty or does not exist")
                    self.showToast("No Records Found for selected Bank",self.TOST().WARNING);
                    return
                }
               
               self.diUpldhstryDta = response.data;
               
               console.log("Filter APi Response>>>>>>",self.diUpldhstryDta);
            })
            .catch(function (error) {
                console.log("Filter API Error>>>>>>", error);
            });
        },

        dwnload_ErrorLogs(indata, index) {

            console.log("indata error log clicked", indata);
            let self=this
            self.showLoader('Loading', true);
           
            let apiData = {
                BankAcNo: indata.BankAcNo,
                MapHistoryUniqueID: indata.MapHistoryUniqueID,
                TrModeId: indata.TrModeId,
                UserID: self.User_id,
                PageName: "DataMappingHistory",
            };
            console.log("Data before sendig to API ", apiData);
            axios({
                method: "post",
                url:
                    this.API_Service_admin()+"/Mapping/api/DownloadFile/GetMappingFileDownloadURL",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "792f9fb5-b1d3-c80b-8cec-e48ac1ed1567",
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
            self.setfileName=response.data.DownloadFileName
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

    }
}
</script>
<style>

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

.cust-Di-tbl table.v-table thead th{
    border-right:1px solid  #C1C8CC !important;
    background-color:#F3FBFB !important;
    color:#1E9690 !important;
    font-family:Roboto !important;
    font-weight:700 !important;
}

.cust-Di-tbl table.v-table thead th:last-child{
    border-right: unset !important;
}

.cust-Di-tbl table.v-table tbody td,
.cust-Di-tbl table.v-table thead tr{
    height: 40px !important;
}
.cust-Di-tbl table.v-table thead tr:last-child{
     height: unset !important;;
}
.Di-tbl-brdr{
    border:1px solid  #C1C8CC;
}
.Di-td-bdrgt {
    border-right:1px solid #C1C8CC;
}

</style>