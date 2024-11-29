<template>
    <v-app>
        <!-- <v-content> -->
            <v-container grid-list-md text-xs-center fluid>
                <!-- {{logged_in_name}} -->
                <h3 color="grey" style="display:flex;color:grey; align-items: center;" ><span class="text-capitalize  mr-1" > Hi XYZ,</span> <span>  Welcome to Recondrive Dashboard</span> <span class="log_last"> (<span>Last Login:</span> <span class="last_login_values" > {{ moment(display_last_login).format('MM-DD-YYYY')}} | {{moment(display_last_login).format('hh:mm:ss A')}} ) </span> </span>  </h3>
                <v-divider></v-divider>
                <v-layout justify-space-around row wrap mt-3>
                    <v-flex md4>
                        <v-card hover flat ripple height=100 color="light-blue lighten-3" class="card-1">
                            
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/action/supervisor_account_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <!-- {{Totaluser }} -->
                                    <div class="display-2 font-weight-light " style="color:white">{{Totaluser }}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">All Users</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex md4>
                        <v-card hover flat ripple height=100 color="teal lighten-3" class="card-1">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/notification/sync_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <!-- {{Activeuser}} -->
                                    <div class="display-2 font-weight-light " style="color:white">{{Activeuser}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Active Users</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex md4>
                        <v-card hover flat ripple height=100 :color="colordata" class="card-1">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/notification/sync_disabled_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <!-- {{inactivuser | checkchange}} -->
                                    <div class="display-2 font-weight-light " style="color:white">{{inactivuser}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Inactive Users</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <!-- <v-flex md3>
                        <v-card hover flat ripple height=100 color="amber lighten-3" class="card-1">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/social/person_add_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Add New User</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex> -->
                    
                </v-layout>

                <!-- All chart comment for temporary by some reasions
                    13/11/2018
                    Usama
                 -->
                <!-- <v-layout row wrap>
                    <v-flex md6 mt-3>
                        <v-card>
                            <div>
                                <map-chart></map-chart>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-flex md6 mt-3>
                        <v-card>
                            <div>
                                <bar-chart></bar-chart>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-flex md6 mt-3>
                        <v-card>
                            <div>
                                <line-chart></line-chart>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-flex md6 mt-3>
                        <v-card>
                            <div>
                                <area-chart></area-chart>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-flex md6 mt-3>
                        <v-card  >
                            <div>
                                <scatter-chart></scatter-chart>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-flex md6 mt-3>
                        <v-card>
                            <div>
                                <bubble-chart></bubble-chart>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-flex md6 mt-3>
                        <v-card>
                            <div>
                                <heatmap-chart></heatmap-chart>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-flex md8 mt-3>
                        <v-card>
                            <div>
                                <month-heatmap></month-heatmap>
                            </div>
                        </v-card>
                    </v-flex>
                </v-layout> --> 
                <user-management @sendtrigger="emitone" ></user-management>
            </v-container>
        <!-- </v-content> -->
    </v-app>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import UserManagement from '../../component/reconuserComponent'
import axios from 'axios'
import moment from 'moment'
// Map Chart
// import mapChart from '../../component/Charts/mapChart'

// // Bar Chart
// import barChart from '../../component/Charts/barChart'
// // Line Chart
// import lineChart from '../../component/Charts/lineChart'
// // Area Chart
// import areaChart from '../../component/Charts/areaChart'
// // Scatter Chart
// import scatterChart from '../../component/Charts/scatterChart'
// // Bubble Chart
// import bubbleChart from '../../component/Charts/bubbleChart'
// // Heatmap
// import heatmapChart from '../../component/Charts/heatmap'
// // Month Heatmap
// import monthHeatmap from '../../component/Charts/Month_Heatmap/monthHeatmap'

export default {

    created(){

            this.$store.commit('SET_PAGE_TITLE','User Creation');
              
            // this.getuserscount();

            // console.log("get agent info -.", this.getAgentInfo());

            this.display_last_login =  this.getAgentInfo().lastLogin
            this.logged_in_name = this.getAgentInfo().first_name + " "+this.getAgentInfo().last_name

            this.gettotalcount()
       

    },
    updated() {
            this.getuserscount();
    },

    data() {
        return{

        logged_in_name:"",
        moment:moment,
        display_last_login:"",
        Activeuser:0,
        inactivuser:0,
        Totaluser:0 ,
        incomingdata:{},
        indata:{},
        emiton:false,
        colordata:"red lighten-3",
        }
    },

    methods: {

        gettotalcount(){
            let self = this

            	axios({
				method: "post",
				url:
					this.API_Service_admin()+"/UserAPI/api/UserCreation/GetUserDetails",
				headers: {
					"Content-Type": "application/json",
					"cache-control": "no-cache",
					"postman-token": "f639393c-d438-4864-64b9-956c89504634",
				},
				data: {
					"UserId" : 1,
					"SessionId" : 1,
					"PageName": "updateUserView"
				},
			})
		.then(function (response) {
			console.log("GET RESPONSE::",response)
			
			if(response.data.Status === 'Success'){
                let gettingcount = response.data
                console.log("COUNT:::::::::::::::",gettingcount)
                 self.colordata = "red"
                    setTimeout(() => {
                             self.colordata = "red lighten-3"
                    }, 1090);
                self.Activeuser = gettingcount.ActiveUserCount
                self.inactivuser = gettingcount.InActiveUserCount
                self.Totaluser = gettingcount.UserDetailsCount

                console.log("ACTIVE COUNT::",self.Activeuser)

			}else{
				self.showToast("No Records found",self.TOST().WARNING);
			}

		    })
		.catch(function (error) {
			console.log("FOR COUNT ERROR Response>>>>>>", error);
        });

        },
        emitone(indata){

            console.log("COUT:::::",indata)
            
            this.indata = indata;
            this.emiton = true;
            this.getuserscount();
        },

        // getuserscount(){
        //     console.log("DID we Emit event?");
        //         if(this.emiton){
        //             this.incomingdata = this.indata;
        //             this.colordata = "red"
        //             setTimeout(() => {
        //                      this.colordata = "red lighten-3"
        //             }, 1090);
        //         }else{
                  
        //             // this.GET('users_count/'+this.getAgentInfo()._id, res => {
        //             //       this.incomingdata = res.data.errMsg;
        //             //  })
        
		// 	axios({
		// 		method: "post",
		// 		url:
		// 			this.API_Service_admin()+"/UserAPI/api/UserCreation/GetUserDetails",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			"cache-control": "no-cache",
		// 			"postman-token": "f639393c-d438-4864-64b9-956c89504634",
		// 		},
		// 		data: {
		// 			"UserId" : 1,
		// 			"SessionId" : 1,
		// 			"PageName": "updateUserView"
		// 		},
		// 	})
		// .then(function (response) {
		// 	console.log("GET RESPONSE::",response)
			
		// 	if(response.data.Status === 'Success'){
        //         this.incomingdata = response.data
		// 	}else{
		// 		this.showToast("No Records found",this.TOST().WARNING);
		// 	}

		// })
		// .catch(function (error) {
		// 	console.log(" ERROR Response>>>>>>", error);
        // });
        // let WholeCount = this.incomingdata
        //         this.Activeuser = WholeCount.active_users
        //         this.inactivuser = WholeCount.inactive_users
        //         this.Totaluser = WholeCount.total_users
        //         this.emiton = false;
        //         }
                

                
        // }
    },

    components:{
        apexcharts: VueApexCharts,
        UserManagement,
        // mapChart,
        // barChart,
        // lineChart,
        // areaChart,
        // scatterChart,
        // bubbleChart,
        // heatmapChart,
        // monthHeatmap
    },
    
};

</script>

<style>

.log_last{
    margin-left: 9px;
    font-size: 15px;
    font-weight: 700;
}

.last_login_values{
    letter-spacing: 0.2px;
    font-weight: 300;
}


</style>
