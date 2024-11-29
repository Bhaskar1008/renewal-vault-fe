<template>
    <v-app>
        <!-- <v-content> -->
            <v-container grid-list-md text-xs-center fluid>
                <h2 color="grey" style="display:flex;color:grey;">Dashboard</h2>
                <v-divider></v-divider>
                <v-layout justify-space-around row wrap mt-3 >
                    <v-flex md4>
                        <v-card hover flat ripple height=100 color="light-blue lighten-3" class="card-1">
                            
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/action/supervisor_account_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
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
                                    <div class="display-2 font-weight-light " style="color:white">{{inactivuser | checkchange}}</div>
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
import UserManagement from '../../component/userMangmntCompo.vue'
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
              
            this.getuserscount();

    },
    updated() {
            this.getuserscount();
    },

    data() {
        return{
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

        emitone(indata){
            this.indata = indata;
            this.emiton = true;
            this.getuserscount();
        },

        getuserscount(){
            console.log("DID we Emit event?");
                if(this.emiton){
                    this.incomingdata = this.indata;
                    this.colordata = "red"
                    setTimeout(() => {
                             this.colordata = "red lighten-3"
                    }, 1090);
                }else{
                  
                    this.GET('users_count/'+this.getAgentInfo()._id, res => {
                          this.incomingdata = res.data.errMsg;
                     })
                }
                let WholeCount = this.incomingdata
                this.Activeuser = WholeCount.active_users
                this.inactivuser = WholeCount.inactive_users
                this.Totaluser = WholeCount.total_users
                this.emiton = false;
        }
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
    
</style>
