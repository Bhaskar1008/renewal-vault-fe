<template>
   <div @click="getData()">
        <apexchart type=donut width=380 :options="chartOptions" :series="series" />
   </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios' 
import moment from 'moment'

export default {
    created(){
              this.getCarData()
              this.getTravelData()
              this.getPetData()
              this.getDengueData()
              
    },
    // props:{
    //     petLength:{
    //           type:String,
    //           default:'0'
    //     }
    // },
   components: {
        apexchart: VueApexCharts,
      },
      data:function() {
          return{
             carDataLength:0,
            petDataLength:0,
            dengueDataLength:0,
            travelDataLength:0,
            totalData:0,
           series: [],
        chartOptions: {
                 title: {
    text: 'Application Types',
    align: 'center',
    margin: 10,
     style: {
      fontSize:  '26px',
      color:  '#263238'
    },
                 },
            labels:['Travel','Pet','Dengue','Car'],
          // dataLabels: {
          
          //   enabled: true
          // },

          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
                  // labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
              position: 'bottom',
              offsetY: 0,
              height: 0,
               markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        // strokeColor: '#fff',
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0
    },
          }
        }    
      }
    },
    methods:{
        // filter=0&user_id=5bbcc632835e564e267bd1cd
        getCarData(){
            //   const GET_TRAVEL_API = this.API_Service()+'getcar?filter=0&car_id=5bdd4a4612df0c9f82f151b9';
                const GET_TRAVEL_API ='getcar?filter=0&user_id=5bbcc632835e564e267bd1cd';

            let self = this;
            let Date = []
            this.GETUSER(GET_TRAVEL_API , function( res , error) {
                   // console.log("Car Data is",res.data.errMsg)
                let carArray = res.data.errMsg
                for(let i=0;i<carArray.length;i++) 
                {
                    Date.push(moment(carArray[i].created_date).format('DD'))
                }
                console.log("car Dates are",Date)
                 console.log(" Car Length is",res.data.errMsg.length)
                 self.carDataLength = res.data.errMsg.length
                  let carlen  = res.data.errMsg.length 
                   self.$emit('getCarLength',{
                    data:carlen
                })
                  self.series.push(carlen)
                //  self.carFn(carlen)
            })
           
        },
      
            getTravelData(){
            // const GET_TRAVEL_API = this.API_Service() + 'get_travel?filter=0&travel_id=5bdd4a4612df0c9f82f151b9';
               const GET_TRAVEL_API = 'get_travel?filter=0&user_id=5bbcc632835e564e267bd1cd';
              let TravelDate = []
                let self = this;
            // this.GETUSER(GET_TRAVEL_API , function (res , error){
                this.GETUSER(GET_TRAVEL_API , function (res , error) {
                    //  console.log("Travel Data is",res.data.errMsg)
                    let carArray = res.data.errMsg
                for(let i=0;i<carArray.length;i++)
                {
                    TravelDate.push(moment(carArray[i].created_date).format('DD'))
                }
                console.log("Travel Dates are",TravelDate)
                      console.log("Travel Length is",res.data.errMsg.length)
                 let travellen  = res.data.errMsg.length 
                  self.$emit('getTravelLength',{
                    data:travellen
                })
                 self.series.push(travellen)
                //  self.travelFn(travellen)
                })
                  
        },
        getPetData(){
            // const GET_PET_API = this.API_Service()+'getpetData?filter=0&pet_data_id=5bfea7d5c542ad4e74fc3a03';
               const GET_PET_API = 'getpetData?filter=0&user_id=5bbcc632835e564e267bd1cd';
              let PetDate = []
            let self = this;
            this.GETUSER(GET_PET_API , function ( res , error) {
               //  console.log("Pet Data is",res.data.errMsg)
                let carArray = res.data.errMsg
                for(let i=0;i<carArray.length;i++)
                {
                    PetDate.push(moment(carArray[i].created_date).format('DD'))
                }
                console.log("Pet Dates are",PetDate)
                      console.log("Pet Length is",res.data.errMsg.length)
                 self.petDataLength = res.data.errMsg.length 
                  let petlen  = res.data.errMsg.length 
                //   self.petLength = res.data.errMsg.length 
                self.$emit('getPetLength',{
                    data:petlen
                })
                  self.series.push(petlen)
                //  self.petFn(petlen)
            })
               

        },
          getDengueData(){
            //  const GET_PET_API = this.API_Service()+'getDengue?filter=0&dengue_data_id=5bfe7145d34219366fb401d5';
               const GET_PET_API = 'getDengue?filter=0&user_id=5bbcc632835e564e267bd1cd';
              let DengueDate = []
            let self = this;
            // this.GETUSER(GET_TRAVEL_API , function (res , error){
            this.GETUSER(GET_PET_API , function( res , error) {
               //  console.log("Dengue Data is",res.data.errMsg)
                let carArray = res.data.errMsg
                for(let i=0;i<carArray.length;i++)
                {
                    DengueDate.push(moment(carArray[i].created_date).format('DD'))
                }
                console.log("Dengue Dates are",DengueDate)
                  console.log(" Dengue Length is",res.data.errMsg.length)
                 self.dengueDataLength = res.data.errMsg.length
                  let denguelen  = res.data.errMsg.length 
                   self.$emit('getDengueLength',{
                    data:denguelen
                })
                  self.series.push(denguelen)
                //  self.dengueFn(denguelen)
            })
               
        },
           
      
     
       
       
        //    petFn(dat){
        //       this.petDataLength = dat
        //        this.series.push(this.petDataLength)

        // },
        
        //    dengueFn(dat){
            
        //       this.dengueDataLength = dat
        //        this.series.push(this.dengueDataLength)

        // },
        //     travelFn(dat){
        //     this.travelDataLength = dat
        //     console.log(this.travelDataLength)
        //     this.series.push(this.travelDataLength)
            

        // },
        //    carFn(dat){
        //       this.carDataLength = dat
        //        this.series.push(this.carDataLength)

        // },
       
        getData()
        {
            console.log("I am clicked")
            console.log(this.travelDataLength+this.carDataLength+this.petDataLength+this.dengueDataLength)
            let total = this.travelDataLength+this.carDataLength+this.petDataLength+this.dengueDataLength
            let travelPer = (this.travelDataLength/total)*100
               let denguePer = (this.dengueDataLength/total)*100
                  let carPer = (this.carDataLength/total)*100
                     let petPer = (this.petDataLength/total)*100
            console.log((travelPer).toFixed(3))
              console.log((denguePer).toFixed(3))
                console.log((carPer).toFixed(3))
                  console.log((petPer).toFixed(3))
        }
    }
};
</script>
