<template>
 <v-app>
       <v-container grid-list-md text-xs-center fluid>
         <v-card>
         <v-card class="pa-4  grey lighten-5" flat style="margin-top: -16px">
           <v-layout row align-center :style="{justifyContent: only_user_logs == true ? 'space-between':'flex-end' }"  >
            <!-- <v-text class="headline font-weight-bold">USER SESSION LOGS</v-text> -->
            <v-flex xs10 sm6 md2 class=" mt-1 mr-4" v-if="only_user_logs">
              <v-select v-model="channeldatafilter" :items="channeldataall" item-text="text" item-value="value" label="Channel" @change="channelfilters"></v-select>
            </v-flex>
             <v-flex xs10 sm6 md3 class=" mt-1">

                 <v-select v-model="selected_data" :items="switch_data" item-text="text" item-value="value" label="Select logs type" @change="changelogs(selected_data)"></v-select>
                                <!-- <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                height="30px"></v-text-field>                             -->
              </v-flex>
            </v-layout>
         </v-card>      
                    <v-card flat class="pa-4">
                      <v-layout column>
                      <v-flex  xs12 sm12 md12 mt-3 >
                        <h3 class="text-xs-center mb-3"> {{only_user_logs == true ? "User Session logs" : "Admin Session logs" }}</h3>

                        <div v-if="only_user_logs"  >
                                  <v-data-table
                                        :headers="ulh"
                                        :items="userDataList"
                                        :sort-by="['lastlogindate']"
                                        hide-actions
                                        class="elevation-2" >
                                              <template slot="items" slot-scope="props"  >
                                  
                                          <td class="">{{props.item.first_name + " "+ props.item.last_name}}</td>
                                          <td class="">{{props.item.fullobj.employeeCode}}</td>
                                          <td class="">{{props.item.RM_first_name }}</td>
                                          <!-- {{props.item.fullobj.last_login}} -->
                                          <td class="">
                                            <!-- {{moment(props.item.fullobj.last_login).format('MM-DD-YYYY')}} | {{ moment(props.item.fullobj.last_login).format('HH:mm')}} -->
                                            {{ props.item.fullobj.last_login===null? "-":props.item.fullobj.last_login===undefined?"-":moment(props.item.fullobj.last_login).format('MM-DD-YYYY')  +" | "+ moment(props.item.fullobj.last_login).format('HH:mm') }}
                                          </td>
                                          <td> <v-btn flat color="primary"   @click="openUserLog(props.item)"  >{{props.item.fullobj.noOf_logins}}</v-btn></td>
                                    
                                </template>
                                
                                
                              </v-data-table>
                        </div>

                        <div  v-if="!only_user_logs">
                                 <v-data-table
                                          :headers="alh"
                                          :items="admin_array"
                                          hide-actions
                                          class="elevation-2" >
                                 
                                   <template slot="items" slot-scope="props"  >
                                    <td class="">{{props.item.first_name + " "+ props.item.last_name}}</td>
                                    <td class="">{{props.item.designation}}</td>
                                    <!-- {{props.item.last_login}} -->
                                    <td class="">
                                      {{ props.item.last_login===null? "-" :props.item.last_login===undefined? "-" : moment(props.item.last_login).format('MM-DD-YYYY')  +" | "+ moment(props.item.last_login).format('HH:mm') }}
                                      <!-- {{moment(props.item.last_login).format('MM-DD-YYYY')}} | {{ moment(props.item.last_login).format('HH:mm')}} -->
                                    </td>
                                    <td> <v-btn flat color="primary" @click="openUserLog(props.item)">{{props.item.noOf_logins}}</v-btn></td>
                                  
                                  </template>

                               </v-data-table>

                        </div>
                     
                    </v-flex>
                    <div class="text-xs-center pagination mt-4">
                              <!-- @input="next($event)" -->
                              <v-pagination
                                v-model="page"
                                :length="pageLength"
                                :total-visible="totalVisible"
                                @input="next($event)"
                              ></v-pagination>
                        </div> 
                </v-layout>
              </v-card>
          </v-card>
                      <!-- Reset Password Popup -->
                       <v-dialog v-model="userpopup" persistent max-width="1000px">

                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading text-capitalize" style="color:white" >Check-ins for {{userName}}</v-card-title>
                        </v-flex>

                     <v-card-text>
                          <v-data-table
                        :headers="popheaders"
                        :items="sortedsession"
                        disable-initial-sort
                        :sort-by="['sdate']"
                        hide-actions
                        class="elevation-2 user-tbl-attrb" >
                        <template slot="items" slot-scope="props">
                             
                            <!-- <td class="">{{props.index}}</td> -->
                            <td class="">{{props.item.SessionID}}</td>
                            <!-- <td class="">{{moment(props.item.created_date).format('MM-DD-YYYY')}} | {{ moment(props.item.created_date).format('HH:mm')}}</td> -->
                              <td class="">{{moment(props.item.created_date).format('MM-DD-YYYY')}} | {{ moment(props.item.created_date).format('HH:mm')}}</td>
                            <!-- <td class="">{{moment(props.item.created_date).format("HH:mm")}}</td> -->
                            <!-- need to change values later -->
                            <!-- <td class="">{{moment(props.item.created_date).format('MM-DD-YYYY')}} | {{ moment(props.item.created_date).format('HH:mm')}}</td> -->
                            <!-- <td class="">{{moment(props.item.created_date).format("HH:mm")}}</td> -->
                            <!-- +++++++++++++ -->
                            <td class=""><v-icon class="ml-3">{{props.item.devicetype}}</v-icon></td>
                            <td class="" >{{ props.item.DeviceData.browserName != 'Other' ? props.item.DeviceData.browserName : "-"  }}</td>
                            <!-- {{props.item.devicetype}} -->

                            <!-- <td class="">{{props.item.reportingBranchCode}}</td> -->
                        </template>
                        </v-data-table>
                        <div class="text-xs-center pagination mt-4">
                              <!-- <v-pagination
                                v-model="popuppage"
                                :length="popuppageLength"
                                :total-visible="popuptotalVisible"
                                @input="next($event)"
                              ></v-pagination> -->
                        </div> 
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click="closeUserDialog()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary" @click="closeUserDialog()">OK
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                    </v-dialog> 

       </v-container>
 </v-app>
    
</template>

<script>

import loadChannel from '../../common/onProjectLoad.js';

import moment from 'moment';

export default {

  created(){
      this.$store.commit('SET_PAGE_TITLE','User Session logs');
        loadChannel.getChannel(this, res => {
            console.log("mixin channel data", res)
            for (let i = 0; i < res.length; i++) {
                if (res[i].active === 1) {
                    let channetobj = {
                        text: res[i].channelName,
                        value: res[i]._id
                    }
                    // this.channeldata.push(channetobj)
                    this.channeldataall.push(channetobj)
                }
            }
            let alldata = {
                text: 'All',
                value: 'all',
            }
            this.channeldataall.unshift(alldata)
        })

       
        

        this.selected_data = 'userlogs'
        this.headers= this.ulh
        this.getuserdatareporting('all', 0);
        console.log("product codefind ->", this.getAgentInfo());


  },
   mounted(){
        this.headers.map(e =>{
                    e.sortable = false;
        }),
        this.popheaders.map(e =>{
                    e.sortable = false;
        })

    },
    
    data(){
        return{

          // dis_rip:true,
          only_user_logs:true,

          switch_data:[
            {
              text:"User Session Logs",
              value:"userlogs",
            },
            {
              text:"Admin Session Logs",
              value:"adminlogs",
            },
          ],

          selected_data:"",

          moment:moment,
            pageLength:0,
            // popuppageLength:0,
            channeldatafilter:"all",

          admin_array:[],

            usl:[],

            userDataList:[],
            userreportinghierarchy:[],
            allAgentdata:[],
            allSessiondata:[],
            sortedsession:[],
            skipdiffrence:this.paginationdiff(),
            
            channeldataall:[],
             totalVisible: 0,
             value:'',
             page:1,
             userpopup:false,
             userName:"-",
             headers:[],
             ulh:[   {text: 'Name', value: 'name',align:'center'},
                        {text: 'Employee ID', value: 'empolyeeid',align:'center'},
                        {text: 'Reporting Manager', value: 'reportingmanager',align:'center'},
                        {text: 'Last Login Date', value: 'lastlogindate',align:'center'},
                        {text: '60-Day Login', value: '60daylogin',align:'center'}
              ],

              alh:[

                        {text: 'Name', value: 'name',align:'center'},
                        {text: 'Designation', value: 'reportingmanager',align:'center'},
                        {text: 'Last Login Date', value: 'lastlogindate',align:'center'},
                        {text: '60-Day Login', value: '60daylogin',align:'center'},

              ],

                 UserData: [],
                  popheaders:[
                        {text: 'SessionID', value: 'SessionID'},
                        {text: 'Start Time', value: 'sdate'},
                        // {text: 'Start Time', value: 'time'},
                        // {text: 'End Time', value: 'date'},
                        // {text: 'End Time', value: 'time'},
                        {text: 'Device Type', value: 'devicetype'},
                        {text: 'Browser Name', value: 'browserName'},
                        
                      
                ],
                UserLogData: [ ],
        }
    },

    computed:{
       objmethod() {
     
    	 var self=this;
       return this.UserData.filter(function(cust){return cust.branch.toLowerCase().indexOf(self.value.toLowerCase()) >=0  || cust.name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
           
         });

       }
    },
    methods:{

      changelogs(e){

            console.log("e i> ", e)

            if(e == 'userlogs'){
                this.only_user_logs = true
                   this.page = 1
                 this.getuserdatareporting( this.channeldatafilter ,0);
            }else{
                this.page = 1
                this.only_user_logs =false
                this.getadmin_users_data(0);
            }
      },

      getadmin_users_data(skip){

            var self = this
            this.GET( 'fetchAllAdminUsers/'+this.getAgentInfo()._id+'?skip='+skip+'&product_sd_code='+this.getAgentInfo().product_sd_code,  function(res,error){

                      var pageLen = res.data.errMsg[1]
	                    let totalCount = pageLen[0].count
	                    console.log('Page Length:',totalCount)
                      self.pageLength = Math.ceil(totalCount/self.skipdiffrence)
                      self.admin_array = [];
      console.log("response admin reporting data -=>", res.data.errMsg);
      // return
                      self.admin_array = res.data.errMsg[0]

                        self.admin_array = self.admin_array.sort((a, b) => b.last_login - a.last_login)
                //  console.log("admin arr ->", )

            })

      },


       checkValidity(data) {
	            // console.log('Validity Data', data);
	            if (data == "" || data == "undefined"|| data == undefined || data == null || data == '' || data == 'Invalid Date') {
	                return "-"
	            } else {
	                return data;
	            }
	        },

         channelfilters(e) {
            console.log('data', e)
            this.page = 1
            this.channeldatafilter = e
            this.getuserdatareporting(this.channeldatafilter , 0)
           
        },


        next(e){
            console.log("incoming e in next ->", e)
	            let skipdata = e - 1
	            console.log('SKip data',skipdata)
	            if(skipdata === 0 ){
	                this.skip = 0
	            }else{
                  this.skip = this.skipdiffrence*skipdata
                  console.log("calculat in else ->", this.skip)
              }
              if(this.only_user_logs==true){
                this.getuserdatareporting(this.channeldatafilter,this.skip)
              }else
	            this.getadmin_users_data(this.skip)
          },
          
          // popupnext(e){
	        //     let skipdata = e - 1
	        //     console.log('Page Number',skipdata)
	        //     if(skipdata === 0 ){
	        //         this.skip = 0
	        //     }else{
	        //         this.skip = this.skipdiffrence*skipdata
          //     }
              
          //       this.openUserLog(this.skip)
	        // },


        Searchdatatable (e) {
                  this.value = e;
                  console.log("VALUE from search is",this.value);
              },


        openUserLog(dat){
              // this.dis_rip = false,
              console.log("dat is ->", dat);
              console.log("confition for if ->", this.only_user_logs);

                if(this.only_user_logs==true){

                  if(dat.fullobj.noOf_logins == 0){
                     console.log("from if user logs ->", dat.fullobj.noOf_logins)
                     this.showToast('No Session Logs Available', this.TOST().WARNING);
                    return
                    }

                }else{
                  if(dat.noOf_logins == 0){
                    console.log("from if admin user logs ->", dat.noOf_logins)
                    this.showToast('No Session Logs Available', this.TOST().WARNING);
                    //  this.getadmin_users_data(0);
                    return
                    }
                }


                  this.allSessiondata=[]
                  console.log("Open User Logs", dat);
                  this.userpopup = true
                  this.userName = dat.first_name + " " + dat.last_name
                  var d = new Date()
                  var num = 86400000
                  var res = d.getTime();
                  res = res+num;	
                  console.log("res is ->",res);
                  var todaydate = moment(res).format('YYYY-MM-DD')
                  console.log("jan is ->", todaydate);
                  var mo =	moment().subtract(61, 'days').calendar();
                  var fromdate =   moment( mo, "MMDDYYYY").valueOf()
                  var final_from_date =  moment(fromdate).format('YYYY-MM-DD')
                  console.log("moment 60 days", final_from_date	);
          
                        
  // 172.16.63.131:5020/secure/admin/getrackerData/5d80e7f584dfaa4a37a6b722?filter=User Login Tracker&employeeCode=3952815&reportType=json&fromDate=2020-2-4&toDate=2020-2-30&adminId=5d80e7f584dfaa4a37a6b722

                  let FilterData
                  if(this.selected_data=="userlogs"){

                    FilterData = 'getrackerData/'+this.getAgentInfo()._id+'?filter=User Login Tracker&employeeCode='+dat.fullobj.employeeCode.toString()+'&reportType=json&fromDate='+final_from_date+'&toDate='+todaydate
                         console.log("USer Data TRUE popup table",FilterData)

                  }else{

                    FilterData = 'getrackerData/'+this.getAgentInfo()._id+'?filter=Admin Login Tracker&employeeCode=jj&reportType=json&fromDate='+final_from_date+'&toDate='+todaydate+'&adminId='+this.getAgentInfo()._id
                      console.log(" admin data true popup table",FilterData)
                  }
                  
                  let self = this;
                  this.GET(FilterData, function(res,error){
                      self.sortedsession = []
                       self.allSessiondata=[]
                      // var pageLen = res.data.errMsg
	                    // let totalCount = pageLen[0].count
	                    // console.log('Page Length:',totalCount)
                      // self.popuppageLength = Math.ceil(totalCount/self.skipdiffrence)
                      

                    if(error){
                      console.log(error)
                      return;
                    }
                    // console.log("response from api is =>", res.data.errMsg)
                    if(res.data.errCode==4){
                      self.allSessiondata=[]

                    }else{
                      self.allSessiondata= res.data.errMsg
                      console.log("response from api is =>", self.allSessiondata)
                    }
                  
                    self.allSessiondata.map(e => {
                     
                        if(e.DeviceData.browserName != "Other" && e.DeviceData.os =="Android"){

                              e.devicetype="smartphone"                            

                        }else if(e.DeviceData.browserName != "Other" && e.DeviceData.os =="Windows" ){

                                e.devicetype="desktop_windows"

                        }else if(e.DeviceData.browserName != "Other" && e.DeviceData.os =="Mac OS X" ){

                              e.devicetype="laptop_mac"

                        }else if(e.DeviceData.browserName != "Other" && e.DeviceData.os =="iOS" ){

                             e.devicetype="phone_iphone"

                        }else if(e.DeviceData.browserName == "Other" && e.DeviceData.os =="Android" ){

                                e.devicetype="android"
                        }

                    })

                     //  self.allSessiondata  created_date
                   self.sortedsession = self.allSessiondata.sort((a, b) => b.created_date - a.created_date);
                   console.log('after sorting what we have >',  self.sortedsession);


                    })

               
          },


        closeUserDialog(){
            this.userpopup = false
        },


        getuserdatareporting(e,skip){
	            console.log("OGG FUNCTION");
	            console.log("Event is",e,skip)
	            let user =this.$store.state.userId
	            let FilterData
	            if(e === 'all'){
	                this.userDataList =[];
	                FilterData = 'getallAgent?user_id='+this.getAgentInfo()._id+'&skip='+skip
	                console.log("TRUE",FilterData)
	            }else{
	                this.userDataList =[];
	                FilterData = 'getallAgent?user_id='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip
	                console.log("FALSE",FilterData)
	            }

	            //  axios.get(FilterData).then(
	            //     //    axios.get(this.API_Service_admin()+'getallAgent?user_id='+user).then(
	            //    res => {
	                let self = this;
	                this.GET(FilterData, function(res,error){

	                    // console.log('xyz :',res.data.errMsg[0]);
	                    if(error){
	                        console.log(error)
	                        return;
	                    }
	                    res.data.errMsg[0].forEach(element => {
	                        element.slectStatus = '';
	                    });

	                    self.userreportinghierarchy=[];
	                    self.allAgentdata = res.data.errMsg[0]
	                    var pageLen = res.data.errMsg[1]
	                    let totalCount = pageLen[0].totalCount
	                    console.log('Page Length:',totalCount)
						          self.pageLength = Math.ceil(totalCount/self.skipdiffrence)
						// self.searchdata =false

	                    console.log("Check Page length",self.pageLength);
	                    console.log('User REPONSE',self.allAgentdata)

	                    for( var i=0; i < self.allAgentdata.length; i++){
	                        if(self.allAgentdata[i].active === 1){
	                            self.allAgentdata[i].slectStatus = 'Active';
	                            if(self.allAgentdata[i].active === 1){
	                            let userreportingdata ={
	                                hierarchyname:self.allAgentdata[i].hierarchy_id === null ? '-' : self.allAgentdata[i].hierarchy_id.hierarchyName || "",
	                                hierarchyid:self.allAgentdata[i].hierarchy_id === null ? '-' : self.allAgentdata[i].hierarchy_id._id || "",
	                                username:self.allAgentdata[i].first_name || "" +' '+self.allAgentdata[i].last_name || "",
	                                user_id:self.allAgentdata[i]._id,
	                            }
	                            self.userreportinghierarchy.push(userreportingdata)
	                            }
	                        }else{
	                            self.allAgentdata[i].slectStatus = 'InActive'
	                        }
	                    }
	                    console.log("reporting data object =====>>>>>>",self.userreportinghierarchy)
                   
	                    for(let j = 0; j < self.allAgentdata.length; j++){
	                        // SORTING Code for Table Data
	                        self.userDB = {};
	                        self.userDB.primary_email = self.checkValidity(self.allAgentdata[j].primary_email)
	                        self.userDB.mobile_no = self.checkValidity(self.allAgentdata[j].mobile_no)
	                        self.userDB.first_name = self.checkValidity(self.allAgentdata[j].first_name)
	                        self.userDB.last_name = self.checkValidity(self.allAgentdata[j].last_name)
	                        self.userDB.agent_id = self.checkValidity(self.allAgentdata[j].agent_id)
	                        self.userDB.branchName = self.allAgentdata[j].branchCode  === null ? '-' : self.allAgentdata[j].branchCode.branchName
	                        self.userDB.RM_first_name = self.allAgentdata[j].reporting_manager === null ? '-' : self.allAgentdata[j].reporting_manager.first_name
	                        self.userDB.slectStatus =self.checkValidity(self.allAgentdata[j].slectStatus)
	                        self.userDB.branchCode = self.allAgentdata[j].branchCode === null ? '-' : self.allAgentdata[j].branchCode.branchCode
	                        self.userDB.channelName = self.allAgentdata[j].channelCode === null ? '-' : self.allAgentdata[j].channelCode.channelName
	                        self.userDB.hierarchyName = self.allAgentdata[j].hierarchy_id === null ? '-' : self.allAgentdata[j].hierarchy_id.hierarchyName
	                        self.userDB.roleCode = self.allAgentdata[j].roleCode === null ? '-' : self.allAgentdata[j].roleCode.roleCode
	                        self.userDB.fullobj = self.allAgentdata[j]
	                        self.userDataList.push(self.userDB)

	                        console.log('User LISting >',self.userDataList)
                      }

                      // sorting from latest to old for vuetify table
                      self.userDataList = self.userDataList.sort((a, b) => b.fullobj.last_login - a.fullobj.last_login)
                      
                 

	                }
	            )

	           
	        },
    }
}
</script>

<style>
/* .user-data-attrb{
     height:500px;
    overflow: auto;
} */
.user-tbl-attrb{
    height:300px;
    overflow: auto;
}

</style>
