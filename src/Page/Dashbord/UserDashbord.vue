<template>
    <v-app>
        <!-- <v-content> -->
            <v-container fluid grid-list-md>
            <v-card class="mt-4" style="padding:15px;">
                
            <v-layout >
                <v-flex class="ml-2 mt-2" style="">

                     <!-- <v-card-title primary-title> -->
                         <v-flex class="ml-2 mt-3">
                    <v-text class="title font-weight-bold">User Dashboard</v-text>
                    </v-flex>
                    <!-- </v-card-title> -->
                    
                    <div>
                        <v-text class="ml-2 body-1">Last Logged In: 7 Septrmber | 8:30pm</v-text>
                    </div>
                    <div>
                    <v-layout row justify-left>

                        <v-avatar class="ml-2 mt-3"
                        size='90'
                        >
                         <!-- <img
                         src="https://cdn.vuetifyjs.com/images/john.jpg"
                         alt="John"> -->
                    </v-avatar>  

                    <v-layout >
                        <v-flex md3>
                             <div class=" ml-2 mt-3">
                            <!-- <v-text class="subheading font-weight-regular">MR.Shoaib Khan</v-text> -->
                            <h3>MR.Shoaib Khan</h3>
                             </div > 
                            <div class="ml-2 mt-3">
                                <v-text class="body-1"> Mobile Number: 9892378723</v-text>
                            </div>
                            <div class="ml-2 mt-3">
                                <v-text class="body-1"> User Id: SD-A123DD</v-text>
                            </div>
                        </v-flex>

                        <v-flex md4 style="margin-top: 38px;">
                                <div class="ml-2 mt-3">
                                <v-text class="body-1"> Email Id: Shoaibkhan123@gmail.com</v-text>
                            </div>
                            <div class="ml-2 mt-3">
                                <v-text class="body-1"> Age: 45</v-text>
                            </div>
                        </v-flex>
                        
                    </v-layout>
                   
                </v-layout>
                <v-flex class="mt-2">
                 <hr>
                 </v-flex>
                    
                    <v-layout row wrap>
                    <v-flex>
                        <div class=" mt-3" style="margin-left:114px ">
                        <div>
                            <v-text class="title">50</v-text>
                            
                        </div>
                        <div>
                            <v-text>Policies Sold</v-text>
                        </div>
                        </div>
                    </v-flex>
                    <v-flex>
                         <div class=" mt-3" style=" ">
                        <div>
                            <v-text class="title">40</v-text>
                            
                        </div>
                        <div>
                            <v-text>In Progress</v-text>
                        </div>
                        </div>
                    </v-flex>

                      <v-flex>
                         <div class=" mt-3" style=" ">
                        <div>
                            <v-text class="title">10</v-text>
                            
                        </div>
                        <div>
                            <v-text>Failed</v-text>
                        </div>
                        </div>
                    </v-flex>
                    </v-layout>
                </div>

                </v-flex>   

            
            </v-layout> 

            <v-layout >
                
                <!-- <v-flex md6> -->
                  
                    

                    <!-- </v-flex> -->

                <!-- </v-flex> -->

                <!-- <v-flex md6>

                </v-flex> -->
                
            </v-layout> 
               
                
            </v-card>

             
            <v-layout row wrap>
        <v-flex  xs6 sm12 md6>
        <v-card  class="mt-3" color="white" style="padding:15px;">
                    <v-flex >      
                    <v-text class="ml-2 title font-weight-bold">User Details</v-text>

                    <span class="" style="float:right">
                     <v-icon medium >email</v-icon>
                     <v-icon medium >edit</v-icon>
                     <v-icon medium >delete</v-icon>
                     <v-icon medium >print</v-icon>
                    </span>
                    </v-flex>

                    <v-flex class="ml-2 mt-3 body-1 ">
                        <v-text  >Address: 9, jai januman society Dadar(E) mumbai</v-text>
                    </v-flex>
                    <v-flex style="display:flex" class="ml-2 mt-3 body-1 ">
                        <v-text>Branch:Dadar(E)</v-text>

                        <v-text style="margin-left: 188px;">Reporting Manager:Sudeep Makhwana</v-text>
                    </v-flex>
                    <!-- <v-flex class="ml-2 mt-3 body-1 ">
                        <v-text>Reporting Manager:Sudeep Makhwana</v-text>
                    </v-flex> -->
                    <v-flex style="display:flex" class="ml-2 mt-3 body-1 ">
                        <v-text>Reporting Manager ID:SD-1233</v-text>

                         <v-text style="margin-left: 98px;">Role: Sales-Manager</v-text>
                    </v-flex>

                     <v-flex style="display:flex" class="ml-2 mt-3 body-1 ">
                        <v-text>Channel Id: AD1234</v-text>

                         <v-text style="margin-left: 169px;">Branch Id: MUM008</v-text>
                    </v-flex>
                
                <v-flex class="mt-3">
                    <!-- <v-text class=" ml-2 title font-weight-bold">Bank Details</v-text> -->
                    <v-flex>
                    <h3 class="ml-2">Bank Details</h3>
                    </v-flex>

                <v-flex style="display:flex">
                    <!-- <v-flex class="ml-2 mt-2 body-1 "> -->
                        <v-text class="ml-2 mt-3">Bank Name: HDFC</v-text>
                    <!-- </v-flex> -->

                    <!-- <v-flex class="ml-2 mt-2 body-1 "> -->
                        <v-text class="mt-3" style="margin-left: 175px; ">Branch Name: Dadar</v-text>
                    <!-- </v-flex> -->
                </v-flex>

                <v-flex style="display:flex" >
                    <!-- <v-flex class="ml-2 mt-2 body-1 "> -->
                        <v-text class="ml-2 mt-3">IFSC COde: HDFC123</v-text>
                    <!-- </v-flex> -->

                    <!-- <v-flex class="ml-2 mt-2 body-1 "> -->
                        <v-text class="mt-3" style="margin-left: 158px;">Accouont Type: Saving</v-text>
                    <!-- </v-flex> -->
                </v-flex>

                </v-flex>

        </v-card>
      </v-flex>
      <v-flex  xs6 sm12 md6 >
        <v-card class="mt-3 ml-3" color="white" style=" height: 406px;">
        <div>
            <apexcharts style="height:300px;"  type="area" :options="chartOptions" :series="series"></apexcharts>
        </div>


        </v-card>
      </v-flex>
            </v-layout>

        <v-flex  xs6 sm12 md12 >
        <v-card  color="white" class="mt-3" style="padding:15px;">

        <v-flex class="" mt-3>

        <h3 class="ml-2  title font-weight-bold mb-3">User Logs</h3>
        <!-- </v-flex> -->

          <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <!-- <td>{{ props.item.name }}</td> -->
        <td class="">{{ props.item.DateOfLogin }}</td>
        <td class="">{{ props.item.SessionTime }}</td>
        <td class="">{{ props.item.Deviceid }}</td>
        <td class="">{{ props.item.locationid }}</td>
      
      </template>
      <template slot="pageText" slot-scope="props">
        Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
      </template>
    </v-data-table>
    </v-flex>
        </v-card>
      </v-flex>
      </v-container>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
components:{
    apexcharts: VueApexCharts,
},
 data () {
    return {
        // Chart
        chartOptions: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }],
            // ----
      headers: [
        {
          text: 'Date Of Login',
          align: 'left',
          sortable: false,
          value: 'DateOfLogin'
        },
        { text: 'Session Time', value: 'SessionTime' },
        { text: 'Device Id', value: 'Deviceid' },
        { text: 'Location', value: 'locationid' },
      ],
      desserts: [
        {
          value: false,
          DateOfLogin: '11 September 2018',
          SessionTime: '1pm to 7pm',
          Deviceid: 'DV129989ff',
          locationid: 'Goa',
          
        },
        {
          
          value: false,
          DateOfLogin: '12 November 2018',
          SessionTime: '2pm to 7pm',
          Deviceid: 'DV129989fff',
          locationid: 'Maharastra',
        },
        {
          value: false,
          DateOfLogin: '119 June 2018',
          SessionTime: '9pm to 11pm',
          Deviceid: 'DV1dfv989ff',
          locationid: 'Dehli',
        },
        {
          value: false,
          DateOfLogin: '24 july 2018',
          SessionTime: '1pm to 9pm',
          Deviceid: 'DV129s989ff',
          locationid: 'Nagpur',
        },
        {
          value: false,
          DateOfLogin: '11 September 2018',
          SessionTime: '12pm to 7pm',
          Deviceid: 'DV129989ff',
          locationid: 'Mumbai',
        },
        {
         value: false,
          DateOfLogin: '14 July 2018',
          SessionTime: '1pm to 7pm',
          Deviceid: 'DV129989ff',
          locationid: 'Thane',
        },
        {
          value: false,
          DateOfLogin: '19 September 2018',
          SessionTime: '11pm to 7pm',
          Deviceid: 'DV329989ff',
          locationid: 'Haryana',
        },
        {
          value: false,
          DateOfLogin: '12 September 2018',
          SessionTime: '1pm to 7pm',
          Deviceid: 'DV129989ff',
          locationid: 'Pune',
        },
        {
          value: false,
          DateOfLogin: '13 September 2018',
          SessionTime: '1pm to 7pm',
          Deviceid: 'DV129989ff',
          locationid: 'Nasik',
        },
        {
         value: false,
          DateOfLogin: '15 September 2018',
          SessionTime: '1pm to 7pm',
          Deviceid: 'DV129989ff',
          locationid: 'Jalgao',
        }
      ]
    }
  }

    

}
</script>
<style>
  
</style>