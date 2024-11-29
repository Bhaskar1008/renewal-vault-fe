<template>
 <v-app>
   <!-- <v-content> -->
     <v-card class="padding-card"  >
       <v-flex class="mt-3">
       <v-text class="title font-weight-bold ">Branch Check In</v-text>
       </v-flex>
     <v-layout row wrap >
      
      <v-flex xs12 sm6 md6 mt-4>
      <v-layout row class="padl-20" >
        <v-flex xs12 sm6 md12>
            <!-- <v-textarea label="kjgfhskfg" v-model="location"></v-textarea> -->
                  <!-- <v-text class="headline font-weight-bold" >{{tempLocation}}</v-text>          -->
          <v-text-field label="My Current Location" v-model="tempLocation"></v-text-field>
        </v-flex>
        <v-flex @click="addMarker">
        <v-btn >Refresh</v-btn>
        </v-flex>
      </v-layout>
       <v-layout row class="padl-20" >
        <v-flex xs12 sm6 md12>
          <v-select v-model="selectBranch" :items="items" label="Select Branch for Check In" required></v-select>
        </v-flex>
        <v-flex @click= "checkDistance">
        <v-btn>Check</v-btn>
        </v-flex>
      </v-layout>
           <v-layout row wrap class="padl-20" v-if="showButton == true" >
               <v-flex mt-3>
         <!-- <v-btn>Check In</v-btn> -->
         <v-text class="time-text" > Checked In {{currTime}}</v-text>
               </v-flex>
               <v-flex ml-5>
         <v-btn right="true">Check Out</v-btn>
               </v-flex>
     </v-layout>
    </v-flex>

<v-flex xs12 sm6 md6 mt-4>
 <gmap-map
      :center="center"
      :zoom="12"
      style="width:90%;  height: 300px;"
    >
   
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
         @click="getLocationAdd(m,index)"
      ></gmap-marker>
        <!-- <gmap-marker
        :key="index"
        v-for="(m, index) in ofcPosition"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker> -->
    </gmap-map>
    </v-flex>
    </v-layout>
    
     <v-flex class="mt-4">
       <v-text class="title font-weight-bold" >Check In Login</v-text>
     </v-flex>
        <v-data-table 
      :headers="headers"
      :items="desserts"
      hide-actions
      class="elevation-2 mt-3"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.count }}</td>
        <!-- <td class="text-xs-right">{{ props.item.protein }}</td> -->
        <!-- <td class="text-xs-right">{{ props.item.iron }}</td> -->
      </template>
    </v-data-table>
    </v-card> 
 
    <!-- </v-content> -->
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
      ofcPosition:{lat:19.1179104,lng:72.8715504},//ANDHERI OFFICE
      increaseofcPos:{lat:19.1179104+0.008,lng:72.8715504+0.008},
      decreaseofcPos:{lat:19.1179104-0.008,lng:72.8715504-0.008},

      markers: [],
      ofcArray:[],
      places: [],
      moment: moment,
      currentPlace: null,
      showButton:false,
      selectBranch:'',
      currTime:'',
      open:false,
      location:'',
      tempLocation:'',
      position:[],
       items:[
                    'Axis Andheri',
                    'Axis Malad',
                    'Axis Borivali',
                    'Axis Mulund',
                ],
                 headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Branch Name', value: 'calories', align: 'right', },
        { text: 'Branch Code', value: 'fat',align: 'right', },
        { text: 'Times Logged In', value: 'count',align: 'right', }
        // { text: 'Protein (g)', value: 'protein' },
        // { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          value: false,
          name: '09-06-2018',
          calories: 'Axis Borivali',
          fat: 'AX 2223223',
          count: 0,
        //   protein: 4.0,
        //   iron: '1%'
        },
        {
          value: false,
          name: '09-06-2018',
          calories: 'Axis Andheri',
          fat: 'AX 2223109',
          count: 0,
        //   protein: 4.3,
        //   iron: '1%'
        },
        {
          value: false,
          name: '09-06-2018',
          calories: 'Axis Malad',
          fat: 'AX 2223567',
          count: 0,
        //   protein: 6.0,
        //   iron: '7%'
        },
        {
          value: false,
          name: '09-06-2018',
          calories: 'Axis Mulund',
          fat: 'AX 2223868',
          count: 0,
        //   protein: 4.3,
        //   iron: '8%'
        },
      ]
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
      this.currentPlace = place;
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
