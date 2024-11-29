<template>
   <div>
     <apexcharts width="500" type="bar" :options="chartOptions" :series="series"></apexcharts>
   </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios' 
import moment,{ months } from 'moment'
export default {
    created(){

      let number = moment().format('YYYY-MM-DD')
      let epochnum = moment(number).valueOf()
      console.log("EPOCH VALUE",epochnum)
      let decVal=[]
      for(let i= 1;i <8;i++)
      {
       decVal.push(epochnum-  (86400000*i))
      }
      console.log("Date values",decVal)
      console.log("Date values",decVal)
  for(let i= 0;i <decVal.length;i++)
      {
       this.chartOptions.xaxis.categories.push(moment(decVal[i]).format('DD'))
      }
      console.log("Bar values",this.chartOptions.xaxis.categories)
      
      // console.log("Chart Options are",this.chartOptions.xaxis.categories)
              this.getCarData()
              this.getTravelData()
              this.getPetData()
              this.getDengueData()


               
    },
    components: {
      apexcharts: VueApexCharts,
    },
    data: function() {
      return {
            carDataLength:0,
            petDataLength:0,
            dengueDataLength:0,
            travelDataLength:0,
        chartOptions: {
          title: {
    text: 'Application Count',
    align: 'center',
    margin: 10,
     style: {
      fontSize:  '26px',
      color:  '#263238'
    },
          },
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [],
          },
          dataLabels:{
            enabled:false
          }
        },
        series: [
       
       {
          name: 'Travel',
          data:[]
        },
        {
          name: 'Dengue',
          data: []
        },
        {
          name: 'Pet',
          data: []
        },
        {
          name: 'Car',
          data: []
        }]
        // ]
      }
    },
          methods:{
            // filter=0&user_id=5bbcc632835e564e267bd1cd
        getTravelData(){
            const GET_TRAVEL_API = 'get_travel?filter=0&user_id=5bbcc632835e564e267bd1cd';
              let TravelDate = []
                let self = this;
            // this.GET('getprodCategory?categoryId='+id, function(res, error) {
                this.GETUSER(GET_TRAVEL_API , function (res , error){

                console.log("Travel Data is",res.data.errMsg)
                let carArray = res.data.errMsg
                for(let i=0;i<carArray.length;i++)
                {
                    TravelDate.push({'date' :  moment(carArray[i].created_date).format('MM-DD')})
                }
                console.log("Travel Dates are",JSON.stringify(TravelDate))
                var result = (TravelDate).reduce( (acc, o) => (acc[o.date] = (acc[o.date] || 0)+1, acc), {} );
                console.log("Unique",result)

                var final_arr = [];
                let count =0;
                for (var props in  result) {
                  if(props.includes('02-'))
                  {
                  
                   console.log('My Properties' , props);
                  if(count <=6)
                  {
                  final_arr.push(result[props]);
                
                  }
                  
                  count++
                }
                }

                console.log('final_arr',  final_arr);

                var dk = this

                dk.series[0].name ='Travel'
                dk.series[0].data =final_arr
                console.log("Final series is",dk.series)
                
                let currData = moment().format('DD')

                      console.log("Travel Length is",res.data.errMsg.length)
                 let travellen  = res.data.errMsg.length 
                })
        },
             getDengueData(){
             const GET_DENGUE_API ='getDengue?filter=0&user_id=5bbcc632835e564e267bd1cd';
             let DengueDate = []
             this.GETUSER(GET_DENGUE_API ,function (res , error) {

                console.log("Dengue Data is",res.data.errMsg)
                    let carArray = res.data.errMsg
                for(let i=0;i<carArray.length;i++)
                {
                    DengueDate.push({'date' :  moment(carArray[i].created_date).format('MM-DD')})
                }
                console.log("Car Dates are",JSON.stringify(DengueDate))
                var result = (DengueDate).reduce( (acc, o) => (acc[o.date] = (acc[o.date] || 0)+1, acc), {} );
                console.log("Unique",result)

                var final_arr = [];
                let count =0;
                for (var props in  result) {
                  if(props.includes('02-'))
                  {
                  
                   console.log('My Properties' , props);
                  if(count <=6)
                  {
                  final_arr.push(result[props]);
                
                  }
                  
                  count++
                }
                }

                console.log('final_arr',  final_arr);

                var dk = this

                dk.series[2].name ='Dengue'
                dk.series[2].data =final_arr
                console.log("Final Dengue series is",dk.series)
                
                let currData = moment().format('DD')

                      console.log("Dengue Length is",res.data.errMsg.length)
                 let travellen  = res.data.errMsg.length 
             })
              
        },
        getPetData(){
            const GET_PET_API = 'getpetData?filter=0&user_id=5bbcc632835e564e267bd1cd';
              let PetDate = []
            let self = this;

            this.GETUSER( GET_PET_API, function(res , error) {
              //  console.log("Pet Data is",res.data.errMsg)
                    let carArray = res.data.errMsg
                for(let i=0;i<carArray.length;i++)
                {
                    PetDate.push({'date' :  moment(carArray[i].created_date).format('MM-DD')})
                }
                console.log("Pet Dates are",JSON.stringify(PetDate))
                var result = (PetDate).reduce( (acc, o) => (acc[o.date] = (acc[o.date] || 0)+1, acc), {} );
                console.log("Unique",result)

                var final_arr = [];
                    let count =0;
                 for (var props in  result) {
                  if(props.includes('02-'))
                  {
                  
                   console.log('My Properties' , props);
                  if(count <=6)
                  {
                  final_arr.push(result[props]);
                
                  }
                  
                  count++
                }
                }

                console.log('PET final_arr',  final_arr);

                var dk = this

                dk.series[1].name ='Pet'
                dk.series[1].data =final_arr
                console.log("Final Pet series is",dk.series)
                
                let currData = moment().format('DD')

                      console.log("Pet Length is",res.data.errMsg.length)
                 let travellen  = res.data.errMsg.length 
            })

        },
        getCarData(){
              const GET_TRAVEL_API ='getcar?filter=0&user_id=5bbcc632835e564e267bd1cd';

            let self = this;
            let CarDate = []

            //  this.GETUSER(GET_DENGUE_API ,function (res , error) {

            this.GETUSER(GET_TRAVEL_API, function ( res , error ) {

              console.log("Car Data is",res.data.errMsg)
                    let carArray = res.data.errMsg
                for(let i=0;i<carArray.length;i++)
                {
                    CarDate.push({'date' :  moment(carArray[i].created_date).format('MM-DD')})
                }
                console.log("Car Dates are",JSON.stringify(CarDate))
                var result = (CarDate).reduce( (acc, o) => (acc[o.date] = (acc[o.date] || 0)+1, acc), {} );
                console.log("Unique", result);
                // console.log("Type of : ", typeof(result) )


                var final_arr = [];
                let count = 0;
                // console.log('Object to Array : ' , Object.values(result));
                for (var props in  result) {
                  if(props.includes('02-'))
                  {
                  
                   console.log('My Properties' , props);
                  if(count <=6)
                  {
                  final_arr.push(result[props]);
                
                  }
                  
                  count++
                }
                }

                console.log('final_arr',  final_arr);

                var dk = this

                dk.series[3].name ='Car'
                dk.series[3].data =final_arr
                console.log("Final Car series is",dk.series)
                
                let currData = moment().format('DD')

                      console.log("Car Length is",res.data.errMsg.length)
                 let travellen  = res.data.errMsg.length
            })
        },
     
       
       
       
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
