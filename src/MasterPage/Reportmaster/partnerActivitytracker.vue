
<template>
    <v-card>
        <v-layout row wrap>
            <v-card flat style="background-color:#FAFAFA; width:100%;">
                <v-layout wrap justify-space-between class="pt-4 ml-3 mr-3 " color="#FAFAFA">
                    <v-flex xs10 sm6 md3 class=" mt-1 mr-4">
                        <v-select v-model="channeldatafilter" :items="channeldataall" item-text="text" item-value="value" label="Channel" @change="channelfilters"></v-select>
                    </v-flex>
                    <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                        <v-menu :close-on-content-click="false" 
                            v-model="calender" :nudge-right="40" 
                            lazy transition="scale-transition" 
                            offset-y full-width max-width="290px"
                            min-width="290px">
                        <v-text-field 
                            slot="activator" 
                            v-model="fromDate" 
                            label="From" 
                            persistent-hint prepend-icon="event" 
                            @blur="date = parseDate(fromDate)">
                        </v-text-field>
                            <v-date-picker v-model="date" no-title @input="validAge"></v-date-picker>
                        </v-menu>
                        <p class="date-validation" v-if="truevalidatefrom=== true" >{{validationfrom}}</p>
                    </v-flex>
                    <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                        <v-menu :close-on-content-click="false" 
                            v-model="calenderto" :nudge-right="40" 
                            lazy transition="scale-transition" 
                            offset-y full-width max-width="290px"
                            min-width="290px">
                        <v-text-field 
                            slot="activator" 
                            v-model="Dateto" 
                            label="To" 
                            persistent-hint prepend-icon="event" 
                            @blur="dateto = parseDate(Dateto)"
                            >
                        </v-text-field>
                            <v-date-picker v-model="dateto" no-title @input="validAgeto"></v-date-picker>
                        </v-menu>
                        <p class="date-validation" v-if="truevalidate=== true" >{{validation}}</p>
                    </v-flex>

                    <v-flex></v-flex>
                    <v-flex xs10 sm6 md2 class="ml-2">
                        <v-text-field  v-model="searchvalue" label="Search" @input="Searchinputblank()" @change="Searchdata()" append-icon="search" height="30px"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-card>
            <div>
                <hr>
            </div>
            <v-flex class="ml-3 mr-3 " style="flex-flow:column wrap;width:100%;">
                <v-layout wrap align-center class="pt-4 ml-3 mr-3 " color="#FAFAFA">
                    <strong class="mr-3 ml-3 "  >{{selectedcount}} Selected</strong>
                    <v-btn depressed medium slot="activator" color="primary" :disabled="selectedcount > 0 ?false:true" class="white--text thebtn" @click="downloadall" >Download Reports
                        <v-icon dark right>save_alt</v-icon>
                    </v-btn>
                </v-layout>
                <v-flex justify-center md12 ml-3 mt-3 mr-5 mb-4>
                    <h3 class="text-xs-center mb-3">Details</h3>
                    <v-data-table
                        :headers="popHeader"
                        :value="checkboxselected"
                        @input="enterSelect($event)"
                        :items="UserList"
                        item-key="name"
                        select-all
                        class="elevation-1"
                        hide-actions
                        
                    >
                        
                        <template slot="items" slot-scope="props">
                        <td>
                            <v-checkbox
                            v-model="props.item.selected"
                            primary
                            hide-details
                            @change="Checkboxcheckedall"
                            ></v-checkbox>
                        </td>
                        <td>{{ props.item.employeeId }}</td>
                        <td class="">{{ props.item.employeenbname }}</td>
                        <td class="">{{ props.item.ChannelName }}</td>
                        <td class="">{{ props.item.designation.designatioName }}</td>
                        <td class="">{{ props.item.supervisornme }}</td>
                        <td class="">
                            <v-btn outline  small slot="activator" :disabled="selectedcount > 0 ?true:false" color="blue-grey" @click="DownloadUserReport(props.item.employeeId)" class="white--text thebtn2 " >Download
                                <v-icon dark right>save_alt</v-icon>
                            </v-btn></td>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-flex>
        </v-layout>
        <div class="text-xs-center pagination" v-if="pageLength !== null && pageLength > 1">
            <v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
        </div>
    </v-card>
</template>
<script>
import axios from 'axios'
import loadChannel from '../../common/onProjectLoad.js'
import moment from 'moment';

let todayDate = ""
export default{
    filters: {
    },
    created() {

        this.$store.commit('SET_PAGE_TITLE', 'Partner Activity Tracker');
        let val ='';
        let self = this;
        loadChannel.getChannel(this, res => {
            console.log("mixin channel data", res)
            for (let i = 0; i < res.length; i++) {
                if (res[i].active === 1) {
                    let channetobj = {
                        text: res[i].channelName,
                        value: res[i]._id
                    }
                    self.channeldata.push(channetobj)
                    self.channeldataall.push(channetobj)
                }
            }
            val = self.channeldataall[0].value
            self.channelfilters(val)
            todayDate = Date.now();
            self.Dateto = moment(todayDate).format('MM-DD-YYYY'); 
            self.fromDate = moment(Date.now()).subtract(7,'d').format('MM-DD-YYYY');
        })
        
    
    },
    mounted() {
        this.popHeader.map(e =>{
                    e.sortable = false;
        })
    },
    data() {
        return {
            moment,
            channeldata:[],
            channeldataall:[],
            page:1,
            skip:0,
            skipdiffrence:15,
            pageLength:null,
            channeldatafilter:'',
            searchvalue:'',
            searchtype:'',
            value:'',
            agetext:'',
            date:null,
            calender:false,
            fromDate:null,
            agetextto:'',
            dateto:null,
            calenderto:false,
            Dateto:null,
            selected:false,
            selectedcount:0,
            SelectedIDS:[],
            truevalidate:false,
            truevalidatefrom:false,
            validationfrom:'',
            validation:'',
            checkboxselected:[],
            UserList: [],
            popHeader: [
            {
                text: 'Employee Id',
                value: 'eid'
            },
            {
                text: 'Name',
                value: 'name'
            },
            {
                text: 'Channel',
                value: 'channel'
            },
            {
                text: 'Designation',
                value: 'designation'
            },
            {
                text: 'Supervisor Name',
                value: 'supervisor'
            },
            {
                text: 'Download Report',
                value: 'userStats'
            },],
        }
    },
    computed: {
        objmethod() {
            var self = this;
         return self.UserList.filter(function(cust){return cust.partnerName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.emailAddress.toLowerCase().indexOf(self.value.toLowerCase()) >=0
         || cust.addresss.toLowerCase().indexOf(self.value.toLowerCase()) >=0
          || cust.contactNo.toLowerCase().indexOf(self.value.toString().toLowerCase()) >=0
         })
        },
      
    },
    watch: {
       date (val) {
	            this.fromDate = this.formatDate(this.date)
            }, 
        dateto (val) {
            this.Dateto = this.formatDate(this.dateto)
        },
    },
    methods: {

       channelfilters(e) {
            console.log('data', e)
            this.page = 1
            this.channeldatafilter = e
            this.GetAgentDetails(0,'NotSearch')
        },
        next(e) {
            let skipdata = e - 1
            console.log('data', skipdata)
            if (skipdata === 0) {
                this.skip = 0
            } else {
                this.skip = this.skipdiffrence * skipdata
            }
            this.GetAgentDetails(this.skip,this.searchtype)
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
        Searchdata(){
            this.searchtype = 'search'
            this.GetAgentDetails(0,this.searchtype)
        },
        Searchinputblank(){
            if(this.searchvalue.length === 0){
                this.GetAgentDetails(0,'NotSearch')
            }
        },
        GetAgentDetails(skip,Typeserch){
            this.UserList=[]
            let API =''
            this.searchtype=Typeserch
            if(this.searchtype === 'search'){
                API = 'getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+this.channeldatafilter+'&skip='+skip+'&searchtxt='+this.searchvalue+'&searchType=fname'
            }else{
                API = 'getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+this.channeldatafilter+'&skip='+skip
            }
            this.GET(API,res=>{
                let Responsedata = res.data.errMsg[0]
                var pageLen = res.data.errMsg[1]
                let totalCount = pageLen[0].totalCount
                console.log('Page Length:',totalCount)
                this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                console.log("USER LIST",Responsedata)
                for(let i=0;i<Responsedata.length;i++){
                    let object={
                        selected:false,
                        employeeId:Responsedata[i].employeeCode,
                        employeenbname:Responsedata[i].first_name +' '+Responsedata[i].last_name,
                        ChannelName:Responsedata[i].channelCode.channelName,
                        designation:Responsedata[i].designation.designatioName,
                        supervisornme:Responsedata[i].reporting_manager === null || Responsedata[i].reporting_manager === undefined || Responsedata[i].reporting_manager == ''? '-':Responsedata[i].reporting_manager.first_name,

                    }
                    this.UserList.push(object)
                }
            })
        },
        DownloadUserReport(empcode){
            // console.log("To Date ===", new Date(this.Dateto).valueOf());
            // console.log("From Date",this.fromDate)
            // return;
            let fromdate = moment(this.fromDate).format('YYYY-M-D')
            let todate = moment(todayDate).format('YYYY-M-D')
            console.log("To Date", todate)
            
            let API = 'getrackerData/'+this.getAgentInfo()._id+'?filter=partner_activity_Tracker&employeeCode='+empcode+'&reportType=xls&fromDate='+fromdate+'&toDate='+todate+'&channelCode='+this.channeldatafilter
            this.GET(API,res=>{
                console.log("Response",res)
                if(res.data.errCode === -1){
                var a = document.createElement('a');
                        a.href = res.data.errMsg;
                        a.download = "partnerActivityTracker";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                }else if (res.data.errCode === 4){
                    this.showToast('No Data Found', this.TOST().INFO);
                }
            })
        },
        Checkboxcheckedall(ev){
            // console.log("Checked Event",this.UserList,this.checkboxselected)
            let selecteddata = this.UserList.filter(cl=> cl.selected === true)
            let selectedemployeecode=selecteddata.map(cl=> cl.employeeId)
            this.SelectedIDS = selectedemployeecode
            this.selectedcount = this.SelectedIDS.length
             console.log("Checked Event",this.SelectedIDS )
        },
        enterSelect(ev){
            // console.log("EVENT SELECT ALL",ev,this.checkboxselected)
            if(ev.length > 0){
            for(let i=0;i<this.UserList.length ;i++){
                this.UserList[i].selected = true
                this.selectedcount = this.UserList.length
                let selecteddata = this.UserList.filter(cl=> cl.selected === true)
                let selectedemployeecode=selecteddata.map(cl=> cl.employeeId)
                this.SelectedIDS = selectedemployeecode
            }
            }else if(ev.length === 0){
            for(let i=0;i<this.UserList.length ;i++){
                this.UserList[i].selected = false
                this.selectedcount = 0
                let selecteddata = this.UserList.filter(cl=> cl.selected === true)
                let selectedemployeecode=selecteddata.map(cl=> cl.employeeId)
                this.SelectedIDS = selectedemployeecode
            } 
            }
        },
        downloadall(){
                console.log("DOWNLOAD ALL",this.SelectedIDS)
        }
    }
}
</script>

<style>

.sd-img-btn-size {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }
.media-pos {
        position: absolute;
        top: 127px;
    }
.thebtn{
      display:flex;
     align-items:center;
     color:white;
     border-radius:5px;
     font-size:12px;
    }
.thebtn2{
    display:flex;
    align-items:center;
    justify-content:center;
     color:white;
     font-size:10px;
}
    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }
    .btn-size{
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
    background-color:#1976d2 ;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        /* height: 10px; */
}

.fileContainer-bulk [type=file] {
    cursor: pointer;
}
.aloc-btn{
    display: flex;
    width: 230px;
    flex-direction: row;
}
.date-validation{
    color: red;
    display: flex;
    position: relative;
    bottom: 11px;
    font-size:12px
}
 @media screen and (min-width: 320px){
         .margin-t30{
             margin-top: 30px;
         }
            .upload-text{
             font-size:14px;
             color:#FDFEFF;
             font-weight: 500
         }
            .fileContainer-bulk {
            width:155px;
            display: inline-flex;
            border-radius: 2px;
            margin-top: 6px;
            height: 37px;
            position: relative;
            cursor: pointer;
        }

     }


</style>
