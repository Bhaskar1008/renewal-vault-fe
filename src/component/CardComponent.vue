<template>
   <!-- <v-app> -->
	   
  <v-card>
    <v-layout  class="card-compo-row-al-cntr ">
     
      <v-flex xs2 >
		  <div class="crd-cmp-pd">
			  <div style="">
				  <v-avatar color="red">
          			<span class="white--text headline">{{ cardData.name | name-shorter}}</span>
        		</v-avatar>
				<p class="body-2 mb-0 pt-2" :style="{color: statusColors.statusStyle}">{{cardData.status}}</p>
				
			  </div>
			
		  </div>
        
      </v-flex>
		<div  class="crd-compo-width">
			<v-layout row wrap>
			
				<div class="field_1">
				<P class="caption mb-0 lblClr" >Name</P>
				<p class="body-1 mb-0 ">{{cardData.name}}</p>
				</div>
			
			
				<div class="field_1">
				<P class="caption mb-0 lblClr">Proposal ID</P>
				<p class="body-1 mb-0">{{cardData.proposalId | id-filter}}</p>
				</div>
			
				<div class="field_1">
				<P class="caption mb-0 lblClr">Plan Name</P>
				<p class="body-1 mb-0">{{cardData.planName}}</p>
				</div>
			
				<div class="field_1">
				<P class="caption mb-0 lblClr">Created Date</P>
				<p class="body-1 mb-0">{{ new Date(cardData.createdDate).toLocaleDateString()}}</p>
				</div>

				<div class="field_1">
				<P class="caption mb-0 lblClr">Reciepting Status</P>
				<p class="body-1 mb-0">{{cardData.recieptingStatus}}</p>
				</div>

				<div class="field_1">
				<P class="caption mb-0 lblClr">Special Case</P>
				<p class="body-1 mb-0">{{cardData.specialCare}}</p>
				</div>

				<div class="field_2btn">
					<v-btn small color="secondary" @click.native="getProposalData()">View Details</v-btn>
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
		statusTitle: String,
        cardData: Object,
        pageName: String
	},

	created() {
		console.log('I am component ', this.cardData)
	},

	data(){
		return{
			 statusColors: {
                new: '#E8BD55',  
                open:'#8F68B9',
                QCpassed: '#70A1DE',
                QCrejected:'#2C93DE',
                archieve:'#77A543',
                        

                statusStyle: ''
            },
		}
	},
	methods:{
		 jump(to) {
                if (this.$router) {
                    this.$router.push(to)
                }
			},
			
			getProposalData(){
			let self = this;
			let proposalID = this.cardData.proposalId;
			
			// let id = this.userId._id;
            // let userId = self.$store.state.agentDetails._id
			// 	console.log(userId)	
			
            // this.GET('getprodCategory?categoryId='+id, function(res, error) {


			this.GET( 'getProposaldetails/'+proposalID , function(res , error){
				// console.log('Proposal Response proposal details', res)
					this.$store.commit('SET_PROPOSAL_DETAILS',res.data.errMsg[0])
					this.$router.push('/proposalsumm');
			});
            
		}
	},
	mounted(){
		if(this.cardData.status === 'new') {
            this.statusColors.statusStyle = this.statusColors.new;
        } else if (this.cardData.status === 'open') {
            this.statusColors.statusStyle = this.statusColors.open;
        }

        else if(this.cardData.status === 'QCpassed')
        {
            this.statusColors.statusStyle = this.statusColors.QCpassed;
        }

        else if(this.cardData.status === 'QCrejected')
        {
            this.statusColors.statusStyle = this.statusColors.QCrejected;
        }
         else if(this.cardData.status === 'archieve')
        {
            this.statusColors.statusStyle = this.statusColors.archieve;
        }
	},

	
}
</script>

<style>
	.card-compo-row-al-cntr {
		a2lign-items: center;
	}
	.crd-compo-width {
        width: 74%;
    }
	.field_1 {
		width: 32%;
		padding-top: 10px;
		}
	.field_1 p {
		text-align: left;
	}
	.lblClr{
		color:#BDBDBD;
	}
	.field_2btn{
		margin-left: 262px

	}

	.btn-icon{
		margin-right: 40px;
	}
	.crd-cmp-pd{
		padding: 18px;
	}

		@media screen and (min-width: 320px) {
			.field_1 {
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
		.field_1 {
		width: 32%;
		    margin-left: 0px;
		}
		.field_2btn{
		margin-left: 335px
	}
	}

	@media screen and (min-width: 992px) {
		.field_1 {
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
