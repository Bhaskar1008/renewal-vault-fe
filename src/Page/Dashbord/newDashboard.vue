<template>
<v-app>
    <v-container grid-list-md fluid>
        <!-- <h5 color="grey" class="" style="display:flex;color:grey;">Hi Admin,Welcome to salesdrive</h5> -->
        <v-text class="subheading font-weight-bold">Hi Admin,Welcome to salesdrive</v-text>
         <v-layout row wrap>
            <v-flex md6 mt-3>
                <v-card>
                    <div style="height:384px">
                        <bar-chart></bar-chart>
                    </div>
                </v-card>
            </v-flex>
                <v-flex md6 mt-3>
                <v-card>
                    <div style="display:flex;justify-content:center">
                        <pie-chart @getPetLength="getPet" @getTravelLength="getTravel" @getCarLength="getCar" @getDengueLength="getDengue"></pie-chart>
                    </div>
                </v-card>
            </v-flex>
            
        </v-layout>

        <v-flex mt-4>
            <v-text class="title font-weight-bold">Category-wise Application</v-text>
        </v-flex>

        <v-layout justify-space-around row wrap mt-3 >
                    <v-flex md3>
                        <v-card hover flat ripple height=100 color="light-blue lighten-3" class="card-1" @click="jump('/traveldetails')">
                            
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img class="img-heigth-ne" src="../../../web/assets/Traveladmin.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{travelCount}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Travel</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex md3>
                        <v-card hover flat ripple height=100 color="teal lighten-3" class="card-1" @click="jump('/pet')">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img class="img-heigth-ne" src="../../../web/assets/Petadmin.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{petCount}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Pet</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex md3>
                        <v-card hover flat ripple height=100 color="amber lighten-3" class="card-1" @click="jump('/Dengue')">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img class="img-heigth-ne" src="../../../web/assets/dengueadmin.png">
                                </div>
                                <div class="mr-4 mt-3">
                                      <div class="display-2 font-weight-light " style="color:white">{{dengueCount}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Dengue</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>

                       <v-flex md3>
                        <v-card hover flat ripple height=100 color="red lighten-3" class="card-1" @click="jump('/insu_admin')">
                            <v-layout justify-space-between row>
                                <div class="ml-3 mt-2">
                                    <img class="img-heigth-ne" src="../../../web/assets/caradmin.png">
                                </div>
                                <div class="mr-4 mt-3">
                                    <div class="display-2 font-weight-light " style="color:white">{{carCount}}</div>
                                </div>
                            </v-layout>
                            <v-layout>
                                <div class="ml-3">
                                    <div class="subheading font-weight-light" style="color:white">Car</div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    
                </v-layout>

    </v-container>
</v-app>
</template>

<script>

// Bar Chart
import barChart from '../../component/Charts/barChart'
import pieChart from '../../component/Charts/pieChart'

export default {
     components:{
        barChart,pieChart
    },
    created() {
         this.$store.commit('SET_PAGE_TITLE','Dashboard');
    },
    data(){
        return{
            travelCount:0,
            petCount:0,
            dengueCount:0,
            carCount:0
        }
    },
    methods:{
        getTravel(event){
            console.log("Travel value is",event.data)
            this.travelCount = event.data

        },
          getPet(event){
            console.log("Pet value is",event.data)
             this.petCount = event.data

        },
          getDengue(event){
            console.log("Dengue value is",event.data)
             this.dengueCount = event.data

        },
          getCar(event){
            console.log("Car value is",event.data)
             this.carCount = event.data

        }
    }
    
}
</script>

<style>
.btnCards{
    display:flex;
    background-color:#0976B4;
    border-radius: 8px;
    box-shadow: 0 2px 2px grey;
}
.img-heigth-ne{
    height:55px;
    width:55px
}
</style>
