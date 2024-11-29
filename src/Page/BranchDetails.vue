<template>
 <v-app>
       <v-container grid-list-md fluid>
            <v-text class="headline font-weight-bold">Branch Details</v-text>
                    <v-layout column wrap>
                                   <!-- MAPS -->
                                            <v-layout>
                        <v-flex xs12 sm12 md8 mt-4>
                            <div id="map"></div>
                        
                            </v-flex>

                    </v-layout>
                    <v-layout>
                          <v-flex  xs12 sm12 md12 mt-3 >
                        <v-flex xs12 sm6 d-flex>
                        <v-select
                            :items="branchDetails"
                            v-model="branch"
                            label="Select Branch"
                        ></v-select>
                        </v-flex>
                    </v-flex>


                    </v-layout>
         

                      <v-layout>
                          <v-flex  xs12 sm12 md12 mt-3 >
                        <v-flex xs12 sm6 d-flex>
                        <v-text-field
                        v-model="address"
                        label="Enter Address"
                    ></v-text-field>
                        </v-flex>
                    </v-flex>


                    </v-layout>


                     <v-layout>
                          <v-flex  xs12 sm12 md12 mt-3 >
                        <v-flex xs12 sm6 d-flex>
                        <v-text-field
                        v-model="center.lat"
                        label="Enter Latitudes"
                    ></v-text-field>
                        </v-flex>
                    </v-flex>


                    </v-layout>

                      <v-layout>
                          <v-flex  xs12 sm12 md12 mt-3 >
                        <v-flex xs12 sm6 d-flex>
                        <v-text-field
                        v-model="center.lng"
                        label="Enter Longitudes"
                    ></v-text-field>
                        </v-flex>
                    </v-flex>


                    </v-layout>

                       <v-layout>
                             <!-- <v-flex  xs12 sm12 md12 mt-3 > -->
                                     <v-flex xs12 sm3 d-flex v-if="show==true" >
                      <v-btn color="info">Get Co-ordinates</v-btn>
                        </v-flex>
                            <v-flex xs12 sm3 d-flex>
                       <v-btn color="info" @click="getLocationAdd()">Set Branch Address</v-btn>
                        </v-flex>
                             <!-- </v-flex> -->
                       </v-layout>
                    </v-layout>


       </v-container>
 </v-app>
    
</template>

<script>
import axios from 'axios' 
export default {
     mounted() {
    navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //  this.center = {
        //   lat: 19.0653807,
        //   lng: 72.9195308
        // };
      });
      console.log("I AM STANDING",this.center)
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: {lat: this.center.lat, lng: this.center.lng}
        });
                var marker = new google.maps.Marker({
        position: this.center,
        map: map
            });
    
  },
    created(){
      let Id = this.$store.state.agentDetails._id
            this.GET('getbranch?userId='+ Id +'&branchfilter=All' , res => {
                   console.log('GET BRANCH DATA',res.data.errMsg);
                    res.data.errMsg.forEach(element => {
                        element.statusSelected = '';
                    });
                    this.branchResponse = res.data.errMsg
                    console.log('Branch REPONSE',this.branchResponse.length)
                    if(this.branchResponse.length == 1){
                        this.branchDetails = this.branchResponse.branchName
                    }else{
                        for( var i=0; i <= this.branchResponse.length; i++){
                            this.branchDetails.push(this.branchResponse[i].branchName)
                            if(this.branchResponse[i].active ==1){
                                this.branchResponse[i].statusSelected = 'Active'
                                // this.branchResponse[i].push(this.getStatus)
                            }else{
                                this.branchResponse[i].statusSelected = 'Inactive'
                                // this.branchResponse[i].push(this.getStatus)
                            }
                        }
                    }
                    console.log("Branches are",this.branchDetails)
               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
    },
    data(){
        return{
            userpopup:false,
            show:false,
            userName:'',
            branch:'',
            branchDetails:[],
            tempLocation:'',
            address:'',
            center: { lat: 19.1179104, lng: 72.8715504 },
        
        }
    },
    methods:{
        geolocate: function() {
                navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                };
            });
        },
        getLocationAdd(){
            console.log("Dat",this.center)
            // alert(dat.position.lat)
            let _self = this;
            var latlng = new google.maps.LatLng(this.center.lat,this.center.lng);
                var geocoder = geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            //   var me =this
                            // alert("Location: " + results[1].formatted_address);
                            let loca = results[1].formatted_address
                            this.tempLocation = results[1].formatted_address
                            //  me.location = loca
                            console.log("Location is ",this.tempLocation )
                            // return this.tempLocation
                        }
                        console.log("Location outside is",this.tempLocation )  
                        _self.accessData(this.tempLocation)
                    }
                    
                });
                console.log("Location outside is",this.tempLocation )   
        },
        accessData(dat){
            var me = this
            console.log(dat)
            this.tempLocation = dat
            this.address = this.tempLocation
            console.log("Branch ID",this.branch)
            let index = this.branchResponse.findIndex( obj => obj.branchName === me.branch);
            let branchCode = this.branchResponse[index].branchCode;
            console.log("Branch ID CODE",branchCode)

            this.PUT('updateBranch/'+branchCode,{              
                    latitude:this.center.lat,
                    longitude:this.center.lng
                } , res => {
                    console.log("Response is from server PUT:",res.data.errMsg);
                    this.showSnackbar({text: 'Branch Details Updated Sucessfully',color:'green'})                           
                }
            ).catch(
                err => {
                    console.log(err) ;
                }
            );
        },
    }
}
</script>

<style>
 #map {
        height: 300px;
        
      }

</style>
