<template>
    <v-app>
        <!-- <v-content> -->
            <v-container grid-list-md text-xs-center fluid>
                <h2 color="grey" style="display:flex;color:grey;">Dashboard</h2>
                <v-divider></v-divider>
                <v-layout   mt-3  style="justify-content:center;">
                    <v-flex md3 >
                        <v-card hover flat ripple height=100 color="light-blue lighten-3" class="card-1">
                            
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/action/supervisor_account_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{tbllength}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">All Users</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <!-- <v-flex md3>
                        <v-card hover flat ripple height=100 color="teal lighten-3" class="card-1">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/notification/sync_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">110</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Active Users</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex> -->
                    <!-- <v-flex md3>
                        <v-card hover flat ripple height=100 color="red lighten-3" class="card-1">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img src="https://www.materialui.co/materialIcons/notification/sync_disabled_white_54x54.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">80</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Inactive Users</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex> -->
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
                
                <user-management></user-management>
            </v-container>
        <!-- </v-content> -->
    </v-app>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import UserManagement from '../../component/pocuserManegmentComp'
import axios from 'axios'
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

    data(){
        return{
            tbllength:'',
        }
    },

    created(){

            this.$store.commit('SET_PAGE_TITLE','User Management');
   
           axios.get('http://159.89.161.64:5021/secure/user/getataUser?filter=0').then(
               res => {
                    
                   
                    let tbldata = res.data.errMsg
                    console.log('User REPONSE length',tbldata.length)
                    this.tbllength = tbldata.length;
                    
                    

               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
          
    },
    
};

</script>
<style>
    
</style>
