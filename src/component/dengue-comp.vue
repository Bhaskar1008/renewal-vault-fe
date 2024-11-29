<template>
   <!-- <v-app> -->
  <v-card>
    <v-layout  class="dengue-card-compo-row-al-cntr ">
     
      <v-flex xs2 >
		  <div class="dengue-crd-cmp-pd">
			  <div style="">
				  <v-avatar color="red">
          			<span class="white--text headline">{{dengueData.firstName | name-shorter}}</span>
        		</v-avatar>
				<p class="body-2 mb-0 pt-2">Issued</p>
				
			  </div>
			
		  </div>
        
      </v-flex>
		<div  class="dengue-crd-compo-width">
			<v-layout row wrap>
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr" >first Name</P>
				<p class="body-1 mb-0 ">{{dengueData.firstName}}</p>
				</div>
			
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Last Name</P>
				<p class="body-1 mb-0">{{dengueData.lastName}}</p></p>
				</div>
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Name of Life Insured</P>
				<p class="body-1 mb-0">{{dengueData.NameofLife_Insured}}</p>
				</div>
			
				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Total Cost</P>
				<p class="body-1 mb-0">{{dengueData.TotalCost}}</p>
				</div>

				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">premium Amount</P>
				<p class="body-1 mb-0">{{dengueData.premiumAmt}}</p>
				</div>

				<div class="ins-field_1">
				<P class="caption mb-0 ins-lblClr">Date Of Birth</P>
				<p class="body-1 mb-0">{{dengueData.DOB}}</p>
				</div>

				<div class="field_2btn">
					<v-btn small color="secondary" @click.native="denguedata()">View Details</v-btn>
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
        dengueData: Object,     
	},
		created() {
		console.log('i am Dengue details prop',this.dengueData)
		console.log('dengue id',this.dengueData._id)
		
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
		denguedata(){



			let id = this.dengueData._id
			const GET_DENGUE_API ='getDengue?filter=1&dengue_data_id='+id;
            
			let self = this;
            this.GETUSER(GET_DENGUE_API , function ( res , error ) {
				let _getDengueRespData = res.data.errMsg;
				   
				   this.$store.commit('SET_Dengue_DETAILS',_getDengueRespData)
				   this.$router.push('/denguedetails')
                // console.log('Iam seen ID' , _getDengueRespData);
			})
                
		}


	// mounted(){
	// 	if(this.cardData.status === 'Issued') {
  //           this.statusColors.statusStyle = this.statusColors.new;
  //       } else if (this.cardData.status === 'Reject') {
  //           this.statusColors.statusStyle = this.statusColors.open;
	// 			}
	// 			}
}}
</script>

<style>
	.dengue-card-compo-row-al-cntr {
		align-items: center;
	}
	.dengue-crd-compo-width {
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
	.dengue-crd-cmp-pd{
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
