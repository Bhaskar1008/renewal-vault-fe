<template>
   <!-- <v-app> -->
  <v-card>
    <v-layout  class="insurance-card-compo-row-al-cntr ">
     
      <v-flex xs2 >
		  <div class="ins-crd-cmp-pd">
			  <div style="">
				  <v-avatar color="red">
          			<span class="white--text headline">{{travelData.travellername | name-shorter}}</span>
        		</v-avatar>
				<p class="body-2 mb-0 pt-2">Issued</p>
				
			  </div>
			
		  </div>
        
      </v-flex>
		<div  class="ins-crd-compo-width">
			<v-layout row wrap>
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr" >Name</P>
				<p class="body-1 mb-0 ">{{travelData.travellername}}</p>
				</div>
			
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">DOB</P>
				<p class="body-1 mb-0">{{travelData.age}}</p>
				</div>
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Email</P>
				<p class="body-1 mb-0">{{travelData.emailid}}</p>
				</div>
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Travelling to</P>
				<p class="body-1 mb-0">{{travelData.country}}</p>
				</div>

				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Trip start date</P>
				<p class="body-1 mb-0">{{travelData.tripstart}}</p>
				</div>

				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Trip end date</P>
				<p class="body-1 mb-0">{{travelData.tripend}}</p>
				</div>

					<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Policy issued on</P>
				<p class="body-1 mb-0">{{travelData.policyissued}}</p>
				</div>

				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Mobile no.</P>
				<p class="body-1 mb-0">{{travelData.mobileno}}</p>
				</div>
				<!-- mobileno -->

				<div class="field_2btn">
					<v-btn small color="secondary"  @click.native="getTravelDet()">View Details</v-btn>
				</div>
			
		</v-layout>
	  </div>
      
		<v-flex xs1>
			<v-card-actions>
				<v-layout row wrap class="pb-5">
					<v-btn icon>
						<v-icon class="btn-icon">email</v-icon>
					</v-btn>
					<!-- <v-btn icon>
						<v-icon class="btn-icon">phone</v-icon>
					</v-btn>
					<v-btn icon>
						<v-icon class="btn-icon">message</v-icon>
					</v-btn> -->
				</v-layout>
			</v-card-actions>    
		</v-flex>

    </v-layout>
  </v-card>
    
</template>

<script>
import axios from 'axios'
export default {


		props:{
        travelData: Object,     
	},
		created() {
		console.log('i am Travel prop',this.travelData)
	},
		data(){
		return{
			 statusColors: {
                issue: 'Issued',  
                reject:'Reject',
                statusStyle: ''
            },
		}
	},

	methods:{
		getTravelDet(){
			let travellerID = this.travelData._id
			console.log('TRAVEL ID',travellerID)
            let self = this; 
			this.GETUSER('get_travel?filter=1&travel_id=' + travellerID , function(res , error ) {
				    console.log('TRAVEL DETAILS',res.data.errMsg[0])
					let travelData = res.data.errMsg[0]					
					// console.log('TRAVEL DATA111::',travelData)
					self.$store.commit('SET_TRAVEL_DETAILS',travelData)
					self.$router.push('/travelinfotab')
			})
					
		}
	}

	// mounted(){
	// 	if(this.cardData.status === 'Issued') {
  //           this.statusColors.statusStyle = this.statusColors.new;
  //       } else if (this.cardData.status === 'Reject') {
  //           this.statusColors.statusStyle = this.statusColors.open;
	// 			}
	// 			}
}
</script>

<style>
	.insurance-card-compo-row-al-cntr {
		align-items: center;
	}
	.ins-crd-compo-width {
        width: 74%;
    }
	.ins-field_1 {
		width: 32%;
		padding-top: 10px;
		}
	.field_1 p {
		text-align: left;
	}
	.ins-lblClr{
		color:#BDBDBD;
	}
	.field_2btn{
		margin-left: 262px

	}

	.btn-icon{
		margin-right: 40px;
	}
	.ins-crd-cmp-pd{
		padding: 18px;
	}

		@media screen and (min-width: 320px) {
			.ins-field_1 {
		    margin-left: 30px;
			}
			.field_2btn{
		margin: auto;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.btn-icon{
		margin-right: 40px;
	}
	}

	@media screen and (min-width: 768px) {
		.ins-field_1 {
		width: 32%;
		    margin-left: 0px;
		}
		.field_2btn{
		margin-left: 335px
	}
	}

	@media screen and (min-width: 992px) {
		.ins-field_1 {
		width: 32%;
		margin-left: 0px;
		}
		.field_2btn{
		margin-left: 260px
	}
	.btn-icon{
		margin-right: 20px;
	}
	}

</style>
