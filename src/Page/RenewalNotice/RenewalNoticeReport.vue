<template>
    <v-app>
      <v-card class="mt-3 mr-2 ml-2">

        <v-flex class="border-div" row  align-center style="padding:15px;background-color:#F7F7F7;">
            <v-flex>
                <v-text class="body-2" style="color:#646666">Renewal Due Reports</v-text>
            </v-flex>
		</v-flex>

        <v-layout style="border:1px solid #C1C8CC">
            <v-flex  justify-space-between align-center>
               <v-layout style="padding:10px;background-color:#23B1A9;align-items:center;">
                  <v-flex>
                     <v-text class="body-2" style="color:#ffffff">Renewal Report</v-text>
                  </v-flex>
               </v-layout>
            </v-flex>
         </v-layout>

         <!-- <v-layout class="pa-2" xs12 row wrap> -->
        <!-- <v-flex>
            <v-layout class="pa-2" xs12 row wrap>
                    <v-flex xs6>
                        <v-layout xs6 row wrap>
                            <v-flex  class="mr-2">
                                <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Line of Business*</p>
                                
                                <v-autocomplete 
                                        :items="lineofbusinesslist" 
                                        solo 
                                        label="Select"
                                        v-model="lineofbusiness"
                                        attach
                                        item-text="text"
                                        item-value="value"
                                        
                                ></v-autocomplete >
                            </v-flex>

                            <v-flex  class="mr-2">
                                <p class="mb-1" style="color:#646666;font-family:roboto;font-weight:700">Product Code ( 0 for all product)*</p>
                                <v-text-field
                                    solo 
                                    v-model="productcode"
                                    :hide-details = "true"
                                    label="Enter..."
                                ></v-text-field>
                            </v-flex>

                            
                        </v-layout>
                    </v-flex>

                    <v-flex xs6>
                        <v-layout xs6 row wrap>
                                <v-flex class=" mr-2 cust-audlog">
                                    <label class="body-1 font-weight-bold" style="color:#646666;">Expiry Period From*</label>
                                    <v-flex class="sel mt-1">
                                    <v-menu :close-on-content-click="false" 
                                        v-model="calender" :nudge-right="40" 
                                        lazy transition="scale-transition" 
                                        offset-y full-width max-width="290px"
                                        min-width="290px">
                                    <v-text-field 
                                        slot="activator" 
                                        solo
                                        v-model="fromDate" 
                                        :hide-details = "true"
                                        persistent-hint prepend-icon="event" 
                                        @blur="date = parseDate(fromDate)">
                                    </v-text-field>
                                        <v-date-picker v-model="date" no-title @input="validAge"></v-date-picker>
                                    </v-menu>
                                    </v-flex>
                                   
                                </v-flex>

                                <v-flex  class="cust-audlog">
                                    <label class="body-1 font-weight-bold" style="color:#646666;">Expiry Period To*</label>
                                    <v-flex class="sel mt-1">

                                    <v-menu :close-on-content-click="false" 
                                        v-model="calenderto" :nudge-right="40" 
                                        lazy transition="scale-transition" 
                                        offset-y full-width max-width="290px"
                                        min-width="290px">
                                    <v-text-field 
                                        slot="activator" 
                                        solo
                                        v-model="Dateto" 
                                        :hide-details = "true"
                                        persistent-hint prepend-icon="event" 
                                        @blur="dateto = parseDate(Dateto)">
                                    </v-text-field>
                                        <v-date-picker v-model="dateto" no-title @input="validAgeto"></v-date-picker>
                                    </v-menu>
                                    </v-flex>
                       
                                </v-flex>
                        
                        </v-layout>
                    </v-flex>

                    
                    
            </v-layout>
        </v-flex> -->

        <v-layout class="pl-3 pt-2" xs12 row wrap>
                <v-flex xs12>
                    <v-layout>
                        <v-flex  class="mr-3">
                            <div class="mb-1">
                                <v-text class="caption font-weight-medium" style="color:#646666">Line of Business *</v-text>
                            </div>
                            <v-autocomplete 
                                :items="lineofbusinesslist" 
                                solo 
                                label="Select"
                                v-model="lineofbusiness"
                                attach
                                item-text="text"
                                item-value="value"
                             
                            ></v-autocomplete >
                        </v-flex>
                        <v-flex  class="mr-3">
                            <div class="mb-1">
                                <v-text class="caption font-weight-medium" style="color:#646666">Product Code ( 0 for all product) *</v-text>
                            </div>
                            <v-text-field solo v-model="productcode" :hide-details = "true" label="Enter..." ></v-text-field>
                        </v-flex>

                        <v-flex class="mr-3" style="display:flex;flex-direction:column">
                            <div class="mb-1">
                                <v-text class="caption font-weight-medium" style="color:#646666">Expiry Period From *</v-text>
                            </div>
                            <input class="datepicker-text-desgn" v-model="fromDate" placeholder="Select Start Date" type="date"/>
                        </v-flex>

                        <v-flex class="mr-3" style="display:flex;flex-direction:column">
                            <div class="mb-1">
                                <v-text class="caption font-weight-medium" style="color:#646666">Expiry Period To *</v-text>
                            </div>
                            <input class="datepicker-text-desgn" v-model="Dateto" placeholder="Select End Date" type="date"/>
                        </v-flex>
                        
                    </v-layout>
                </v-flex>
            </v-layout>

        <!-- <v-layout class="pa-3" xs12 row wrap>
                <v-flex xs6>
                    <v-layout>
                    <v-flex xs7 style="flex:1" class="mr-2">
                            <p class="mb-1 caption font-weight-medium" style="">Policy no.</p>
                            <v-text-field
                                solo 
                                v-model="policynumber"
                                :hide-details = "true"
                                label="Enter..."
                            ></v-text-field>
                    </v-flex>

                    <v-flex style="flex:1;display:flex;">

                    </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs6>
                    
                </v-flex>

        </v-layout> -->

        <v-flex class="border-div" row  align-center style="padding:15px;background-color:#F7F7F7;">

            <v-layout style="align-items:center;justify-content:flex-end;">

                <!-- <v-flex> -->
                    <v-btn
                        class="mb-2"
                        color="#23B1A9"
                        text
                        dark
                        style="font-family: roboto;font-weight: 700;text-transform: none;"
                        >
                        <v-icon dark class="mr-2">cloud_download</v-icon>
                        <v-divider vertical class="mr-2"></v-divider>Schedule download
                    </v-btn>
                <!-- </v-flex> -->

                <!-- <v-flex class=""> -->
                    <!-- <v-btn
                        class="mb-2"
                        color="#152F38"
                        text
                        dark
                        style="font-family: roboto;font-weight: 700;text-transform: none;"
                        >
                        <v-icon dark class="mr-2">cancel</v-icon>
                        <v-divider vertical class="mr-2"></v-divider>Close
                    </v-btn> -->
                <!-- </v-flex> -->

                <!-- <v-flex> -->
                    <v-btn
                        class="mb-2"
                        color="#D1121B"
                        text
                        dark
                        style="font-family: roboto;font-weight: 700;text-transform: none;"
                        >
                        <v-icon dark class="mr-2">delete</v-icon>
                        <v-divider vertical class="mr-2"></v-divider>Clear
                    </v-btn>
                <!-- </v-flex> -->
            </v-layout>
            
		</v-flex>
         <!-- </v-layout> -->

         <v-layout class="mt-4" style="border:1px solid #C1C8CC">
            <v-flex  align-center>
               <v-layout style="padding:10px;background-color:#f7f7f7;align-items:center;">
                  <v-flex>
                     <v-text class="body-2" style="color:#10242B">Report Export</v-text>
                  </v-flex>
               </v-layout>
            </v-flex>
        </v-layout>

        <!-- <v-card flat  style="border:1px solid #C1C8CC; border-top:unset">
                    <v-layout row wrap justify-space-between class="ma-3 mt-4">
                            <v-flex md4 v-for="(i,index) in 9" :key="index">
                                <v-layout class="mr-4 mb-3" align-center justify-space-between style="border:1px solid #C1C8CC">
                                    <div class="pa-2" style="background-color:#F7F7F7">
                                        <img src="../../assets/dmExcel.png" style="width:25px;height:25px" />
                                    </div>
                                <v-text class="body-2 font-weight-bold" color="#10242B">Rep ID:4252885201012021</v-text>
                                <v-btn icon small>
                                    <v-icon color="#6B6B6B">get_app</v-icon>
                                </v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
        </v-card> -->

        <v-card class="ma-3">
            <div>
                 <!-- :pagination.sync="pagination" -->
                <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :search="search"
                    hide-actions
                   
                    class="elevation-1"
                    >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.reportid }}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.LOB }}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.ProductCode }}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.ExpiryStartDate }}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.ExpiryEndDate }}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.Status }}</td>
                        <td class="text-xs-left" style="border-right: 1px solid #C1C8CC">{{ props.item.action }}
                            <v-icon small left class="ml-2">get_app</v-icon>
                        </td>
                    </template>
                </v-data-table>
                <!-- <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                </div> -->
            </div>
            
        </v-card>

      </v-card>

        
    </v-app>
</template>
<script>
import axios from 'axios'
import moment from 'moment';
export default {
    created() {
        this.$store.commit('SET_PAGE_TITLE', 'Renewal Notice Reports');
        
    },

    data(){
        return{
            headers: [
                {
                text: 'Report ID',
                align: 'start',
                sortable: false,
                value: 'reportid',
                },
                { text: 'LOB', value: 'LOB' },
                { text: 'Product Code', value: 'ProductCode' },
                { text: 'Expiry Start Date', value: 'ExpiryStartDate' },
                { text: 'Expiry End Date', value: 'ExpiryEndDate' },
                { text: 'Status', value: 'Status' },
                { text: 'Actions', value: 'Actions' },
            ],
            desserts: [
            {
                reportid: '1008822',
                LOB: "Motor",
                ProductCode: "Private Car",
                ExpiryStartDate: "4/1/2020",
                ExpiryEndDate: "8/1/2020",
                Status: 'In progress',
                action: 'Download',
            },
            {
                reportid: '1008822',
                LOB: "Motor",
                ProductCode: "Private Car",
                ExpiryStartDate: "4/1/2020",
                ExpiryEndDate: "8/1/2020",
                Status: 'In progress',
                action: 'Download',
            },
            {
                reportid: '1008822',
                LOB: "Motor",
                ProductCode: "Private Car",
                ExpiryStartDate: "4/1/2020",
                ExpiryEndDate: "8/1/2020",
                Status: 'In progress',
                action: 'Download',
            },
            
            ],
            lineofbusinesslist:[
                {
                    text:'Sales',
                    value:'sales'
                },
                {
                    text:'Marketing',
                    value:'marketing'
                }
            ],
            lineofbusiness:'',
            productcode:'',
            calender:false,
            calenderto:false,
            fromDate:null,
            Dateto:null,
            policynumber:'',
        }
    },

    methods: {
        parseDate (date) {
            console.log('parsedate',date);
            if (!date) return null
            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        validAge(date){
            this.calender = false
            console.log("date",date)
            this.fromDate = moment(date).format('MM-DD-YYYY')

            let fromeDate =moment(date).valueOf()
            let CurrentDate=moment(Date.now()).valueOf()
            if(fromeDate > CurrentDate){
                // this.truevalidatefrom = true
                // this.validationfrom = "Cannot select future Date"
                console.log("Im Greate than current Date")
            }else{
                // this.truevalidatefrom = false
                // this.validationfrom =""
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
    }
}
</script>
<style>

.datepicker-text-desgn{
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    color:#666767;
    opacity: 1;
    /* font-family: robotoregular; */
    font-size: 14px;
    padding:7px;
    /* margin-top:20px; */
    /* padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 10px;
    padding-right: 40px; */
}
.cust-audlog .sel{

    /* width: 335px; */
    /* width: 296px; */
    height: 37px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 2px #00000051;
    border: 0.5px solid #C1C8CC;
    opacity: 1;

}
.border-div{
    border-top-color: #C1C8CC;
    border-bottom-color: #C1C8CC;
    border-right-color: #C1C8CC;
    border-left-color: #C1C8CC;
    border-style: solid;
    border-width: 1px;
}

.v-text-field.v-text-field--solo .v-input__control{
		min-height: 38px;
}

.v-input__prepend-outer {
    margin-right: 15px;
    margin-left: 12px;
}

.v-text-field.v-text-field--solo .v-input__append-outer, .v-text-field.v-text-field--solo .v-input__prepend-outer {
    margin-top: 6px;
}

.cust-dropdwn-hgt.v-text-field.v-text-field--solo .v-input__control{
	min-height: 40px;
}
.reconRle-di .v-text-field.v-text-field--solo .v-input__control{
	min-height: 38px;
}

.v-text-field--outline .v-input__slot {
    
    min-height: 38px !important;
    display: flex !important;
    align-items: center !important;
    /* border:1px red solid; */
}

</style>