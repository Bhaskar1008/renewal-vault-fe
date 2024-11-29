<template>
    <v-app>
        <v-card class="ma-3" style="background-color:#F7F7F7;" flat>
            <v-layout column class="">
                <v-card flat class=" mb-0" style="border:1px solid #C1C8CC;border-bottom: unset">
                    <v-layout row justify-space-between align-center style="padding:5px;background-color:#F7F7F7">
                            <v-text 
                            class="body-2 mr-1 ml-3 my-1 font-weight-bold headline" 
                             style="color: #646666;"
                            >
                            Reports
                            </v-text>
                    </v-layout>
                </v-card>
                <v-card flat class="mb-0" style="border:1px solid #C1C8CC;">
                    <v-layout row justify-space-between align-center style="background-color:#F3FBFB" >
                        <v-layout column class="ml-3 mr-5 mt-3" >
                            <label
                                style="color: #646666"
                                class="font-weight-bold mb-1" >Select Bank
                            </label>
                            <v-autocomplete
                                solo
                                label="Select"
                                :items="slctBnk"
                                item-text="houseOfBank"
                                item-value="houseOfBank"
                                v-model="sltdBnkNme"
                                attach
                                @change="sltdBnk(sltdBnkNme)">
                            </v-autocomplete>
                        </v-layout>
                        <v-layout column class="mx-5 mt-3">
                            <label
                                style="color: #646666"
                                class="font-weight-bold mb-1">From
                            </label>
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
                                  min-width="290px" >
                                      <v-text-field
                                          slot="activator"
                                          label="Select From Date"
                                          :value="computedDateFormattedMomentjs"
                                          solo
                                          prepend-inner-icon="event"
                                          readonly
                                      ></v-text-field>
                                  <v-date-picker
                                      v-model="frmDate"
                                      @change="chngDate"
                                      no-title
                                  ></v-date-picker>
                                </v-menu>
                        </v-layout>
                        <v-layout column class="mx-5 mt-3">
                            <label
                                style="color: #646666"
                                class="font-weight-bold mb-1">To
                            </label>
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
                                  min-width="290px" >
                                      <v-text-field
                                          slot="activator"
                                          label="Select To Date"
                                          :value="computedToDteMomentjs"
                                          solo
                                          readonly
                                          prepend-inner-icon="event"
                                      ></v-text-field>
                                  <v-date-picker
                                      v-model="toDate"
                                      @change="chngToDate"
                                      no-title
                                  ></v-date-picker>
                                </v-menu>
                        </v-layout>
                        <v-layout column class="ml-3 mr-5 mt-3" >
                            <v-btn class="text-capitalize" large color="#E46A25" dark>Search</v-btn>
                        </v-layout>
                    </v-layout>
                </v-card>
                <v-card flat  style="border:1px solid #C1C8CC; border-top:unset">
                    <v-layout row wrap justify-space-between class="ma-3 mt-4">
                            <v-flex md4 v-for="(i,index) in 9" :key="index">
                                <v-layout class="mr-4 mb-3" align-center justify-space-between style="border:1px solid #C1C8CC">
                                    <div class="pa-2" style="background-color:#F7F7F7">
                                        <img src="../assets/dmExcel.png" style="width:25px;height:25px" />
                                    </div>
                                <v-text class="body-2 font-weight-bold" color="#10242B">Closing Balance BS & GC</v-text>
                                <v-btn icon small @click="dwnload_rprt()">
                                    <v-icon color="#6B6B6B">get_app</v-icon>
                                </v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-layout>
        </v-card>
    </v-app>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
    data(){
        return{
            frmCalender: false,
            toCalender:false,
            frmDate: "",
            toDate:"",
            slctBnk:[],
            sltdBnkNme:"All Banks",
            setfileName:"",

        }
    },

    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Reports');
        this.User_id = this.$store.state.agentDetails.userId;
        this.sessionId = this.$store.state.agentDetails.sessionId;
        this.GetAllFiltersData()
    },

    computed: {

        computedDateFormattedMomentjs () {
            return this.frmDate ? moment(this.frmDate).format("DD-MM-YYYY"): ''
        },
        computedToDteMomentjs() {
            return this.toDate ? moment(this.toDate).format("DD-MM-YYYY"): ''
        },
    },


   
    methods:{
        chngDate(date) {
            console.log("Incoming date", date);
            this.frmCalender = false;
        },

        chngToDate(date) {
            console.log("Incoming date", date);
            this.toCalender = false;
        },

        GetAllFiltersData() {
        
            this.slctBnk=[];
            this.slctBnk = this.$store.getters.getbankDetails;
            console.log("this.slctBnk", this.slctBnk);
            let alldata = {
                houseOfBank: 'All Banks',
                bankAcNo: this.slctBnk.length,
            }

            this.slctBnk.unshift(alldata);
        },

        sltdBnk(name){
            console.log("selected Bank", name);
        },
        dwnload_rprt(){
            // console.log("indata error log clicked", indata);
            let self=this
            self.showLoader('Loading', true);
           
            let apiData = {
                UserId: self.User_id,
                PageName: "addReconRule",
                SessionId:self.sessionId
            };
            console.log("Data before sendig to API ", apiData);
            axios({
                method: "post",
                url:
                    self.API_Service_admin()+"/ReportAPI/api/AuditTrailReport/GetGcAuditTrailData",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "d85c4a30-d29f-a3e1-edb6-7d2d50483ce7",
                },
                data: apiData,
            })
            .then((response) => {
            console.log("DownloadFileStream",response.data.DownloadFileStream);
            if(!response.data.DownloadFileStream){
                console.log("Array is either empty or does not exist")
                self.showLoader('Loading', false);
                self.showToast("No Files Found",this.TOST().WARNING);
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

</style>