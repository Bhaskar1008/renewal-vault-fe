<template>

	<v-app>
	<v-card>
		<v-toolbar
        color="white"
        dark
      >
        <v-toolbar-title style="color:#1a4b9b">Cost of Ashraf's Higher Education</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon style="color:#1a4b9b">close</v-icon>
        </v-btn>
      </v-toolbar>
		<br>

        <!-- ======================================================================================== -->
            <div>
			<v-layout row wrap>
                
                <v-flex d-flex xs12 sm6 md4>
                    <div class="ml-3">
                        						
						<div style=" color:#706c6b">
			                <v-text class="body-2" >Select the Course</v-text>
                        </div>
                        <div>
						<v-select
                            v-validate="'required'"
                            :items="courseType"
                            v-model="course"
                            label="Select"
                            data-vv-name="select"
                            required
                        ></v-select>
                        </div>


                        	<div style=" color:#706c6b">
			                    <v-text class="body-2" >Starting Year</v-text>
                            </div>
                            <div>
						    <v-select
                                v-validate="'required'"
                                :items="year"
                                v-model="selectedYear"
                                label="Select"
                                data-vv-name="select"
                                required
                            ></v-select>
                            </div>


                        	<div
                            class="mt-3" 
                            style="color:#706c6b">
                                <v-text class="body-2">2017 Cost of MBA in tier-1 Institute</v-text>
                            </div>
                            <div style="">
                                <v-text-field
                                    placeholder="Cost of Course"
                                ></v-text-field>
                            </div>
                        </div>
                </v-flex>

<!-- ======================================================================================================= -->
                
                <v-flex d-flex xs12 sm6 md4>
                    <div class="ml-3">
                        <div style=" color:#706c6b; ">
			                <v-text class="body-2" >Current Annual Income</v-text>
                        </div>
                        <div>
						<v-text-field
                            placeholder="Annual Income"
                        ></v-text-field>
                        </div>

                        
                        <div style=" color:#706c6b">
                            <v-text class="body-2" >% of Annual Income saved for this goal</v-text>
                        </div>
                        
                        <div class="mt-4 ">
                        <v-slider
                            v-model="slider2"
                            thumb-color="red"
                            thumb-label="always"
                            thumb-size=25
                            :min="min1"
					        :max="max1"
			            ></v-slider>
			            </div>

                        <v-flex mt-2>
			            <div style=";color:#706c6b">
                                <v-text class="body-2">Savings so far</v-text>
                        </div>
                        </v-flex>
                        <div>
                        <v-text-field
                                placeholder=" Savings"
                        ></v-text-field>
                        </div>
                    </div>
                </v-flex>
                                
			</v-layout>    
                
             <div style="padding-top: 20px;float: right;">
                <v-btn depressed large color="primary">Process</v-btn>
            </div>   
    <!-- =================================================================================================            -->
        
		    
        </div>
	</v-card>
    
</v-app>
</template>


<script>

const courseType = [
    {
        text: 'Masters in Engineering',
        value: 'engineering'
    }, {
        text: 'Masters in Business',
        value: 'busines'
    }, {
        text: 'Masters in Pharma',
        value: 'pharma'
    }, {
        text: 'Masters in Medical',
        value: 'medical'
    }
]
	export default {
        created() {
            let obj = {};

            for (let startYear = 2015; startYear <=2050; startYear++ ) {
                obj.value = startYear;
                obj.text = ''+startYear
                this.year.push(obj);

                console.log(this.year);
                obj = {};
            }
        },
		data() {
			return {
                courseType,

                year: [],



                course: null,
                selectedYear: null,
                a:[
                    '123',
                    '3243',
                    
                ],
               
                
				date:null,
				dateFormatted:null,
				menu1:false,
				ChildAge:'10',
				ChildName:'Usama Khan',
				slider: 2,
        		selectedSeason: 0,
        		min:0,
        		max:30,
        		min1:0,
        		max1:100,
        		slider2:5,

			}

		},
		
		computed: {
     computedDateFormatted () {
       return this.formatDate(this.date)
     }
   },

   watch: {
     date (val) {
       this.dateFormatted = this.formatDate(this.date)
     }
   },

   methods: {
     formatDate (date) {
       if (!date) return null

       const [year, month, day] = date.split('-')
       return `${month}/${day}/${year}`
     },
     parseDate (date) {
       if (!date) return null

       const [month, day, year] = date.split('/')
       return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
     }
   }, 
   // season (val) {
   //      switch (val) {
   //        case 0: return 'Winter'
   //        case 1: return 'Spring'
   //        case 2: return 'Summer'
   //        case 3: return 'Fall'
   //      }
   //    }

   watch: {
       course: function(val, oldVal) {
           console.log('Course : ', val);
       },

       year: function(val, oldVal) {
           console.log('YEAr : ', val);
       }
   }

    }

</script>
<style>



</style>