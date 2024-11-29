<template>
<v-app>
	<div >
	<v-container>
								<div style=" padding-bottom: 15px;color:#1a4b9b">
									<v-text class="title">Help us to know you better</v-text>
								</div>
		
								<div style="padding-bottom: 08px; color:#706c6b">
									<v-text class="body-2" >Personal Details</v-text>
								</div>
		<div>
			<v-layout row wrap>
				

			<div style="    padding-right: 175px;padding-bottom: 10px;color:#1a4b9b">
						<v-text class="body-2">What is your date of birth?</v-text>
			<div style="width:217px;">
					<v-menu
				          ref="menu1"
				          :close-on-content-click="false"
				          v-model="menu1"
				          :nudge-right="40"
				          lazy
				          transition="scale-transition"
				          offset-y
				          full-width
				          max-width="240px"
				          min-width="290px">
							
				          <v-text-field
				            slot="activator"
				            v-model="dateFormatted"
				            label="Date"
				            hint="MM/DD/YYYY format"
				            persistent-hint
				            append-icon="event"
				            @blur="date = parseDate(dateFormatted)"

				          ></v-text-field>
									<v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
					</v-menu>
		</div>
	</div>

				<div style="padding-right: 240px;padding-bottom: 0px;color:#1a4b9b" >
						<v-text class="body-2">Who are you?</v-text>
				<div style="padding-top: 06px;">
						<v-radio-group v-model="row" row style="padding:0px;margin-left:07px">
										<div style="padding-right:15px;">
													<v-radio value="radio-1" ></v-radio>
													<v-text style="color:#e55420" class="caption">Male</v-text>
										</div>
										<div >
											<v-radio  value="radio-2" style="margin-left:4px"></v-radio>
											<v-text style="color:#e55420" class="caption">Female</v-text>                            
										</div>
            </v-radio-group>
					</div>
					
					
				</div>
				<div style="padding-left:0px;padding-top: 0px;color:#1a4b9b">
					
							<v-text class="body-2">Where are you live?</v-text>
							<v-text-field style="width:285px"
							v-model="name"
							:rules="nameRules"

							label="Enter City"
							required
							></v-text-field>
				</div>



	</v-layout>
					<div style="padding-bottom: 08px;color:#706c6b">
						<v-text class="body-2">Family Details</v-text>
					</div>
		<v-layout row wrap>
				<div  style="padding-bottom:0px;width: 391px;color:#1a4b9b">
									<v-text class="body-2">What is your marital Status?</v-text>
						<div style="padding-top:30px">
						<v-radio-group v-model="row" row style="padding:0px;margin-left:07px">
										<div style="padding-right:15px;">
													<v-radio value="radio-1" ></v-radio>
													<v-text style="color:#e55420" class="caption">Sigle</v-text>
										</div>
										<div >
											<v-radio  value="radio-2" style="margin-left:10px"></v-radio>
											<v-text style="color:#e55420" class="caption">Married</v-text>                            
										</div>
										<div style="margin-left:12px">
											<v-radio  value="radio-3" style="margin-left:10px"></v-radio>
											<v-text style="color:#e55420" class="caption">With Kids</v-text>                            
										</div>
							</v-radio-group>
                      
					</div>
				</div>
					<div style="color:#1a4b9b" >
								<v-text class="body-2">Tell us a bit more about your children</v-text>

						<div style="padding-top:10px;width:300px;overflow-x: scroll">
			
        			<div class="vertical-scroll-layout">

        <div class="container-pd-mg" v-for="(data, li) in childCollections" :key="li">
        		<v-card  color="white">
        			<div class="add-child-layout-flx">
						<v-card-text class=" title px-0">
									{{data.age}} <span class="body-2">Years</span>
						</v-card-text>
						<v-card-text style="color:#e55420" class=" body-2 px-0 pt-0">
									{{data.name}}
						</v-card-text>
        			</div>
			        
		        </v-card>
        </div>
        	

        <div class="card-pd-mg" style="padding-right:5px">
        		<v-card  color="white">
		         	
		         		 <v-card-text style="color:#9b9998" class="px-0 pl-0 pb-1 body-2">
		         		 	<div class="add-child-layout-flx">
		         		 		<v-btn icon class="pt-0"  @click.native="insertNewChild">
		         		 			<v-icon style="color:#9b9998" medium>add</v-icon>
		         		 		</v-btn>
										<v-dialog
											v-model="dialog"
											max-width="600px"
											>
											<appAddChild></appAddChild>
											<!-- <app-higher-education></app-higher-education> -->
										</v-dialog>
		         		 		<div>
		         		 			Add Child
		         		 	</div>
		         	</div>		          			
		          		</v-card-text>
		        </v-card>
        	</div>

        </div>
 
		</div>


		</div>
		
			
			</v-layout>
					<div style="padding-top:10px;color:#706c6b">
								<v-text class="body-2">Income Details</v-text>
					</div>
					<div style="padding-top: 10px">
								<v-layout row wrap>
						<div style="margin-right: 65px">
							<div style="width:325px;">
									<v-flex xs12>
									<div style="padding-bottom: 0px;margin-right: 30px;">
       								 <v-slider

												v-model="slider"
												thumb-color="red"
												thumb-label="always"
												:min="min"
												:max="max"
											></v-slider>
        					</div>
     							 </v-flex>
     					 <v-flex xs0>
      	
					<div>
							<v-label style="padding-right:122px;color:#1a4b9b">Current Income</v-label>
							<v-label style="color:#1a4b9b" >Rs. {{slider}} Lac</v-label>

					</div>
          
      			
      		
   					 </v-flex>

			</div>
	</div>
						<div style="width:325px;">
								<v-flex xs12>
						<div style="padding-bottom: 0px;padding-right: 30px">
        				<v-slider

									v-model="slider2"
									thumb-color="red"
									thumb-label="always"
									:min="min1"
									:max="max1"
								></v-slider>
        		</div>
     					 </v-flex>
     					 <v-flex xs0>
      	
							<div>
										<v-label style="padding-right:122px;color:#1a4b9b">Existing Saving</v-label>
										<v-label style="color:#1a4b9b" >Rs. {{slider2}} Lac</v-label>

							</div>
         
      			
      		
      		</v-flex>

			</div>

		</v-layout>
		</div>
							<div style="padding-top: 20px;float: right"  @click="jump('/analysiseducation')">
										<v-btn depressed large color="primary" >Start Planning </v-btn>
										
							</div>

		</div>
	</v-container>
</div>
</v-app>
</template>


<script>
	import appAddChild from './AddChild.vue'
	import appHigherEducation from './HigherEducation.vue'
	export default{
		components:{
			appAddChild,
			appHigherEducation
		},
		data(){
			return{
				dialog: false,
				dialog1:false,
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

        		childObject: {
        			age: '',
        			name: ''
        		},

        		childCollections: []

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
     },

     insertNewChild() {
			 this.dialog = true;
     	// this.childObject.age = 12;
     	// this.childObject.name = 'Ashraf'
     	// this.childCollections.push(this.childObject);

     	// this.childObject = {};

	 },
	 higherEducation(){
		 this.dialog1 = true
	 }
   }, 
  

	}

</script>
<style scoped>

	.vertical-scroll-layout {
		display: flex;
		flex-direction: row;
		width: 400px;
		/*overflow-x: scroll;*/
	}

	.card-pd-mg {
		margin : 5px;
	}

	/*Class is used to center all content of add child card*/

	.add-child-layout-flx {
		display: flex;
		flex-direction: column;
		/*justify-content: center;*/
		align-items: center;
		padding: 10px;
		width: 100px;
	}


</style>