
<template>
    <v-app>
            <v-card class="mt-3">

                <v-layout >

                    <v-flex class="border-div" row  align-center style="padding:15px;background-color:#F7F7F7;">
                        <v-flex>
                            <v-text class="body-2" style="color:#646666">Audit Logs</v-text>
                        </v-flex>
			        </v-flex>
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
               

                
                <v-flex class="border-div" row  align-center style="padding:15px;background-color:#F3FBFB;">
                    <v-layout wrap  class=" ">
                        <v-flex xs10 sm6 md2 class=" mr-4 cust-audlog">
                            <label class="body-1 font-weight-bold" style="color:#646666;">From</label>
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
                                 
                                persistent-hint prepend-icon="event" 
                                @blur="date = parseDate(fromDate)">
                            </v-text-field>
                                <v-date-picker v-model="date" no-title @input="validAge"></v-date-picker>
                            </v-menu>
                            </v-flex>
                            <!-- <p class="date-validation" v-if="truevalidatefrom=== true" >{{validationfrom}}</p> -->
                        </v-flex>
                        <v-flex xs10 sm6 md2 class="mr-4 cust-audlog">
                            <label class="body-1 font-weight-bold" style="color:#646666;">To</label>
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
                                persistent-hint prepend-icon="event" 
                                @blur="dateto = parseDate(Dateto)">
                            </v-text-field>
                                <v-date-picker v-model="dateto" no-title @input="validAgeto"></v-date-picker>
                            </v-menu>
                            </v-flex>
                            <!-- <p class="date-validation" v-if="truevalidate=== true" >{{validation}}</p> -->
                        </v-flex>
                        <v-flex style="align-self: flex-end; margin-top:20px;">
                            <v-btn class="caption"  style="background-color:#E46A25;color:#ffffff;">Export <v-icon right dark>get_app</v-icon></v-btn>
                        </v-flex>
                        
                    </v-layout>
			    </v-flex>

                <v-flex xs12 class="ma-3 audit-tbl"  style="">
                                <v-data-table
                                v-model="selected"
                                :headers="headers"
                                :items="desserts"
                                hide-actions
                                
                                item-key="Component"
                                class="elevation-1">
                                
                                <template slot="items" slot-scope="props">
                                    <!-- props.expanded = !props.expanded -->
                                <tr>
                                    <td class="">{{props.item.logid}} </td>
                                    <td class="">{{props.item.createddate}}</td>
                                    <td class="">{{props.item.CreatedTime}}</td>
                                    <td class="">{{props.item.component}}</td>
                                    <td class="">{{props.item.user}}</td>
                                    <td class="">{{props.item.Bank}}</td>
                                    <td class="">{{props.item.action}}</td>
                                    <td class="">{{props.item.operation}}</td>

								</tr>
                                </template>
                            </v-data-table>
                </v-flex>
            </v-card>
    	</v-app>
</template>
<script>
import axios from 'axios'
import moment from 'moment';
// import vxLayout from '../../../../../../weex feature tata agencyv1/sales_drive_weex/sales-ui/src/components/vx-layout/vx-layout.vue';

let todayDate = ""
export default{
//   components: { vxLayout },
    filters: {
    },
    created() {

        this.$store.commit('SET_PAGE_TITLE', 'Audit Logs');
        let val ='';
        let self = this;

        self.GetAllFiltersData()
        // loadChannel.getChannel(this, res => {
        //     console.log("mixin channel data", res)
        //     for (let i = 0; i < res.length; i++) {
        //         if (res[i].active === 1) {
        //             let channetobj = {
        //                 text: res[i].channelName,
        //                 value: res[i]._id
        //             }
        //             self.channeldata.push(channetobj)
        //             self.channeldataall.push(channetobj)
        //         }
        //     }
        //     val = self.channeldataall[0].value
        //     self.channelfilters(val)
        //     todayDate = Date.now();
        //     self.Dateto = moment(todayDate).format('MM-DD-YYYY'); 
        //     self.fromDate = moment(Date.now()).subtract(7,'d').format('MM-DD-YYYY');
        // })
        
    
    },
    mounted() {
        
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
            output:[],
            searchvalue:'',
            nameofbank:'',
            searchtype:'',
            subbnknme:"",
            bankaccountnumber:'',
            value:'',
            agetext:'',
            search:'',
            truevalidate:false,
            validation:'',
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
            checkboxselected:[],
            FilteringApi:[],
            bankList:[],
            bnkProfilePic:"",
            TrnsatinStrtDte:'',
            UserList: [],
            headers: [
					{
						text: 'LogID',
						align: 'left',
						sortable: false,
						value: 'logid'
					},
					{ text: 'Created Date', value: 'createddate' },
					{ text: 'Created Time', value: 'CreatedTime' },
					{ text: 'Component', value: 'component' },
					{ text: 'User', value: 'user' },
                    { text: 'Bank', value: 'Bank' },
                    { text: 'Action', value: 'action' },
					{ text: 'Operation', value: 'operation' },
                
                    
				
            ],
            desserts: [
					{
                        logid: 'BNKMP062000012',
						createddate: '15/06/20',
						CreatedTime: '1:08:00 PM',
						component: 'Bank Data',
						user: '30294213 (Amol Cheulkar)',
                        Bank: 'HDFC EMMA',
						action: 'Data Upload',
						operation: 'User has uploaded Bank Statement',
                        
						
					},
					{
						logid: 'BNKMP062000012',
						createddate: '15/06/20',
						CreatedTime: '1:08:00 PM',
						component: 'Bank Data',
						user: '30294213 (Amol Cheulkar)',
                        Bank: 'HDFC EMMA',
						action: 'Data Upload',
						operation: 'User has uploaded Bank Statement',
					},
					{
						logid: 'BNKMP062000012',
						createddate: '15/06/20',
						CreatedTime: '1:08:00 PM',
						component: 'Bank Data',
						user: '30294213 (Amol Cheulkar)',
                        Bank: 'HDFC EMMA',
						action: 'Data Upload',
						operation: 'User has uploaded Bank Statement',
					},
					{
						logid: 'BNKMP062000012',
						createddate: '15/06/20',
						CreatedTime: '1:08:00 PM',
						component: 'Bank Data',
						user: '30294213 (Amol Cheulkar)',
                        Bank: 'HDFC EMMA',
						action: 'Data Upload',
						operation: 'User has uploaded Bank Statement',
					},
					{
						logid: 'BNKMP062000012',
						createddate: '15/06/20',
						CreatedTime: '1:08:00 PM',
						component: 'Bank Data',
						user: '30294213 (Amol Cheulkar)',
                        Bank: 'HDFC EMMA',
						action: 'Data Upload',
						operation: 'User has uploaded Bank Statement',
					},
					{
						logid: 'BNKMP062000012',
						createddate: '15/06/20',
						CreatedTime: '1:08:00 PM',
						component: 'Bank Data',
						user: '30294213 (Amol Cheulkar)',
                        Bank: 'HDFC EMMA',
						action: 'Data Upload',
						operation: 'User has uploaded Bank Statement',
					},
					{
						logid: 'BNKMP062000012',
						createddate: '15/06/20',
						CreatedTime: '1:08:00 PM',
						component: 'Bank Data',
						user: '30294213 (Amol Cheulkar)',
                        Bank: 'HDFC EMMA',
						action: 'Data Upload',
						operation: 'User has uploaded Bank Statement',
					},
					{
						logid: 'BNKMP062000012',
						createddate: '15/06/20',
						CreatedTime: '1:08:00 PM',
						component: 'Bank Data',
						user: '30294213 (Amol Cheulkar)',
                        Bank: 'HDFC EMMA',
						action: 'Data Upload',
						operation: 'User has uploaded Bank Statement',
					},
				
					],
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

        filteredItems() {
				return _.orderBy(this.output.filter(item => {
	             if(!this.search) return this.output;
	               return (
						item.HouseOfBank.toLowerCase().includes(this.search.toLowerCase())
						// item.BankAcNo.includes(this.search)
					);
				}));
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

        GetAllFiltersData(bnkAccNo) {
            var self = this;
            // self.showLoader('Loading', true);
           
            
        
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
        clearSearch () {
		       this.search="";
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
        },
        
        putDate(){
			this.truevalidate = false
            this.validation =""
			console.log(this.TrnsatinStrtDte,"TrnsatinStrtDte")

			// let todayDate = Date.now();
            // todayDate = moment(todayDate).format("DD-MM-YYYY");
			// this.toDte = moment(this.TrnsatinStrtDte,'DD/MM/YYYY').format('YYYY-MM-DD');

			// let new_frmdate =moment(this.TrnsatinStrtDte,'DD/MM/YYYY').subtract(2, "days");
			// console.log("From date", new_frmdate);
			// let nextdate = moment(new_frmdate).format("DD-MM-YYYY");
			// console.log("nextdate", nextdate);
			// this.frmdate = moment(nextdate,'DD/MM/YYYY').format('YYYY-MM-DD');
			
			// if(this.frmdate === 'Invalid date'){
			// 	this.frmdate = ''
			// }

			// if(this.toDte === 'Invalid date'){
			// 	this.toDte = ''
			// }
			
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
                        designation:Responsedata[i].designation,
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
            
            let API = 'getrackerData/'+this.getAgentInfo()._id+'?filter=Commitment Achievement Tracker&employeeCode='+empcode+'&reportType=xls&fromDate='+fromdate+'&toDate='+todate+'&channelCode='+this.channeldatafilter
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

.bankimg{
	height: 45px;
	width: 45px;
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
.backdropdown_di {
    background: #ffffff;
    border-left: 1px solid #c1c8cc;
    /* height: 67px; */
}
.audit-tbl table.v-table thead th{
        border-right:1px solid  #C1C8CC !important;
        background-color:#F7F7F7 !important;
        color:#10242B !important;
        font-family:Roboto !important;
        font-weight:700 !important;
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
.cust-audlog .sel{

width: 335px;
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
