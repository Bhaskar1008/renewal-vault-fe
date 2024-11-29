<template>
 <v-app>
    <v-card class="padding-card"  >
    <v-layout row wrap style="display:flex;justify-content:center;">

<v-flex xs12 sm12 md8 mt-4>
    <div id="map"></div>
 <!-- <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 600px;"
    >
   
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
         @click="getLocationAdd(m,index)"
      ></gmap-marker>
      
    </gmap-map> -->
    </v-flex>
    <v-flex xs12 sm12 style="display:flex;justify-content:center;" mt-1>
    <v-flex xs12 sm6 style="border:1px solid brown;" >
         <gmap-autocomplete
          @place_changed="setPlace"
          style="width:545px;height:40px;padding:5px">
        </gmap-autocomplete>
         <!-- <v-text-field
         ref="autocomplete"
              label="Enter Addresss"
              v-model="add"
            ></v-text-field> -->

        </v-flex>
    
    </v-flex>

    </v-layout>

    <v-layout row wrap style="display:flex;justify-content:center;">
    <v-flex xs12 sm3 d-flex>
     <v-btn color="success" @click="codeAddress(add)">Get Address</v-btn>
          <!-- <v-select @change="calculateAndDisplayRoute(mode,directionsService, directionsDisplay)"
            :items="items"
            v-model="mode"
            label="Standard"
          ></v-select> -->
        </v-flex>
     <v-flex xs6 sm3 d-flex>
     <v-btn color="success" @click="calculateAndDisplayRoute(mode,directionsService, directionsDisplay)">Check Directions</v-btn>
          <!-- <v-select @change="calculateAndDisplayRoute(mode,directionsService, directionsDisplay)"
            :items="items"
            v-model="mode"
            label="Standard"
          ></v-select> -->
        </v-flex>
        </v-layout>
    </v-card> 
  </v-app>
</template>
<script>
import { mapMutations } from 'vuex'
 import moment from "moment";
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 19.1179104, lng: 72.8715504 },
      add:'',
      ofcPosition:{lat:19.1179104,lng:72.8715504},//ANDHERI OFFICE
      increaseofcPos:{lat:19.1179104+0.008,lng:72.8715504+0.008},
      decreaseofcPos:{lat:19.1179104-0.008,lng:72.8715504-0.008},

      markers: [],
      ofcArray:[],
      places: [],
      moment: moment,
      currentPlace: null,
      showButton:false,
      mode:'',
      selectBranch:'',
      currTime:'',
      open:false,
      location:'',
      tempLocation:'',
      position:[],
        items: ['Driving', 'Walking', 'Bicycling', 'Transist'],
        directionsDisplay:[],
        directionsService:[],
        geocoder:[],
        autocomplete:[],
        lat1:'',
        lng1:''
   
    };
  },

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
       var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 40.771, lng: -73.974}
        });
   
    //   this.directionsDisplay = new google.maps.DirectionsRenderer();
     this.directionsDisplay = new google.maps.DirectionsRenderer({map: map});
        this.directionsService = new google.maps.DirectionsService();
        this.geocoder = new google.maps.Geocoder();
        //  this.autocomplete = new google.maps.places.Autocomplete(add);
    
      console.log("I AM STANDING",this.center)
    
  },
  created(){
           this.markers.push({ position: this.center });
            // this.ofcArray.push({ position: this.ofcPosition });
  },

  methods: {
       ...mapMutations(['showSnackbar', 'closeSnackbar']),
    //   getLocation(dat,i{
    //    this.position = dat
    //   },
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place.formatted_address;
      console.log("Current Place is",this.currentPlace)
    },
 codeAddress(addData) {
     var me = this
     console.log("Current place in function",me.currentPlace)
    me.address =me.currentPlace
    me.geocoder.geocode( { 'address': me.address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

    //   alert("Latitude: "+results[0].geometry.location.lat());
    //   alert("Longitude: "+results[0].geometry.location.lng());
        me.lat1 = results[0].geometry.location.lat()
        me.lng1 = results[0].geometry.location.lng()
      } 
    

      else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  },
     calculateAndDisplayRoute(mode,directionsService, directionsDisplay) {
         var me =this
        var selectedMode = mode
        console.log("Final Lat",me.lat1,me.lng1)
        // console.log("Mode is",selectedMode)
         var request = {
           origin: {lat: 19.1179104,lng: 72.8715504},
           destination:  {lat: me.lat1,lng: me.lng1},
           travelMode: google.maps.DirectionsTravelMode.DRIVING
         };
         me.markers.push({position:request.destination})
       me.directionsService.route(
      request, function(response, status) {
          if (status == 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      },
    addMarker() {
        //  this.center = {
        //   lat: this.center.lat + 0.004881,
        //   lng: this.center.lng + 0.0022908
        // };
        this.markers.push({ position: this.center });
        console.log("Markers are",this.markers)
        // this.open = true
             console.log("Increase Position",this.increaseofcPos)
                  console.log("Decrease Position",this.decreaseofcPos)
             let _self = this;
        var latlng = new google.maps.LatLng(this.markers[1].position.lat,this.markers[1].position.lng);
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
        
      
    //   if (this.currentPlace) {
    //     const marker = {
    //       lat: this.currentPlace.geometry.location.lat(),
    //       lng: this.currentPlace.geometry.location.lng()
    //     };
    //     this.markers.push({ position: marker });
    //     this.places.push(this.currentPlace);
    //     this.center = marker;
    //     this.currentPlace = null;
    //   }
    },
    checkDistance(){
          if((this.decreaseofcPos.lat < this.markers[1].position.lat  ) && (this.increaseofcPos.lat > this.markers[1].position.lat)&&
        (this.decreaseofcPos.lng < this.markers[1].position.lng  ) && (this.increaseofcPos.lng > this.markers[1].position.lng) )
        {
            this.showButton = true
              this.showSnackbar({text: 'Check In Sucess',color:'green'})  
              this.currTime = moment().format('LLL')
              console.log("Branch is",this.selectBranch)
              if(this.selectBranch == 'Axis Malad')
              {
                this.desserts[2].count += 1
                this.desserts[2].name =  moment().format('MM-DD-YYYY')
              }
               if(this.selectBranch == 'Axis Borivali')
              {
                this.desserts[0].count += 1
                this.desserts[0].name =  moment().format('MM-DD-YYYY')
              }
               if(this.selectBranch == 'Axis Andheri')
              {
                this.desserts[1].count += 1
                this.desserts[1].name =  moment().format('MM-DD-YYYY')
              }
               if(this.selectBranch == 'Axis Mulund')
              {
                this.desserts[3].count += 1
                this.desserts[3].name =  moment().format('MM-DD-YYYY')
              }
        }
        else
        {
            this.showButton = false
        }
    },
    getLocationAdd(dat,i){
        console.log("Dat",dat.position.lat)
        // alert(dat.position.lat)
        let _self = this;
        var latlng = new google.maps.LatLng(dat.position.lat,dat.position.lng);
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
console.log(dat)
this.tempLocation = dat
    },
    
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};

</script>
<style>
 #map {
        height: 300px;
        
      }

      .padl-20{
          padding-left: 20px
      }
      .padding-card{
          padding: 10px
      }
      .time-text{
        font-size:13px;
        padding-top: 15px;
       color:blue;
      }
      /* Optional: Makes the sample page fill the window. */
    /* .first-container{
        flex-direction:row;
    }
    .left-container{
        flex-direction: column
    } */
</style>
