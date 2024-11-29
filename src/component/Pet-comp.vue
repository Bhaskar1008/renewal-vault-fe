<template>
   <!-- <v-app> -->
  <v-card>
    <v-layout  class="insurance-card-compo-row-al-cntr ">
     
      <v-flex xs2 >
		  <div class="ins-crd-cmp-pd">
			  <div style="">
				  <v-avatar color="red">
          			<span class="white--text headline">{{petData.nameofPet | name-shorter}} </span>
        		</v-avatar>
				<p class="body-2 mb-0 pt-2">Issued</p>
				<!-- {{petData.policyissued}} -->
				
			  </div>
			
		  </div>
        
      </v-flex>
		<div  class="ins-crd-compo-width">
			<v-layout row wrap>
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr" >Pet Name</P>
				<p class="body-1 mb-0 ">{{petData.nameofPet }}</p>
				</div>
			
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Date Of Birth</P>
				<p class="body-1 mb-0">{{petData.DOB}}</p>
				</div>
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Animal Type</P>
				<p class="body-1 mb-0">{{petData.animalType}}</p>
				</div>
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Name Of Owner</P>
				<p class="body-1 mb-0">{{petData.nameOfOwner}}</p>
				</div>

				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr"> Policy Issued On</P>
				<p class="body-1 mb-0">{{petData.policyissued}}</p>
				</div>

				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Premium Amount</P>
				<p class="body-1 mb-0">{{petData.premiumAmt}}</p>
				</div>

				<div class="field_2btn">
					<v-btn small color="secondary" @click="petdetails()">View Details</v-btn>
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
        petData: Object,     
	},
		created() {
		console.log('i am petdetails prop',this.petData)
		// console.log('iam id ',this.carData._id)
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
		petdetails(){
			let id = this.petData._id
			const GET_PET_API ='getpetData?filter=1&pet_id='+id;
            
            let self = this;
            this.GETUSER(GET_PET_API , function ( res , error ) {

				let _getRespData = res.data.errMsg;
				   
				   this.$store.commit('SET_PET_DETAILS',_getRespData)
				   this.$router.push('/petdetails')
                // console.log('Iam seen ID' , _getRespData);
			})
                
        
			}}


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
