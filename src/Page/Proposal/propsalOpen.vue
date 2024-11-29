<template>
<v-flex>
	<!-- <v-card   dark style="border:1px red dotted; width:220px;">
	<v-flex  style=""   >
		<v-autocomplete autocomplete color="white"  class="dd" :items="channeltxtarray"  v-model="channelName"  label="Channel"></v-autocomplete>
	</v-flex>
	</v-card> -->
<v-layout justify-start row>
	<v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" flat class="modifydd" light style="width:200px;">
          <v-card-text>
            <v-autocomplete
              v-model="channelName"
			  @change="getProposalData"
			  :items="channeltxtarray"
			  label="Channel"
			  item-text="text"
			  item-value="value"                      
            ></v-autocomplete>
          </v-card-text>   
        </v-card>
      </v-flex>
</v-layout>	

<v-layout justify-end row>
			<v-flex xs12 sm10 md8 lg2 style8>
        <v-card ref="form" flat class="modifydd2" light style="width:200px;">
          <v-card-text>
            			 <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                height="30px">
									 </v-text-field>  
          </v-card-text>   
        </v-card>
      </v-flex>
</v-layout>	


	<div class="prop-layout-pass"  v-if="showblank == false">
		<!-- <v-flex v-for="(listRejctData, index) in objRejct" :key="index"  class="pros-card-pass mt-2" xs12 lg6 > -->
				<v-flex  class="pros-card-pass mt-4" pl-2 pr-2 >
			  			<v-data-table
                        :headers="headers"
                        :items="objmethod"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.applicationcode}}</td>
                            <td class="">{{props.item.name}}</td>
							<td class="">{{props.item.status}}</td>
							<td class="">{{props.item.createdDate | formateDate}}</td>
							<td class="">{{props.item.planName == undefined || null ? "-" : props.item.planName }}</td>
							<td class="">{{props.item.recieptingStatus}}</td>
							<td class="">{{props.item.specialCare}}</td>
                            <!-- <td class="">{{props.item.channelCode.channelName}}</td> -->
                           
                            <td class="">
                                <v-icon small class="mr-2" @click="getProposalview(props.item.proposalid , props.index)">remove_red_eye
</v-icon>
                                <!-- <v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon> -->
                            </td>
                        </template>
                        </v-data-table>

			<!-- <card-component :page-name="cardListData.pageName" :card-data="listRejctData"></card-component> -->
		</v-flex>
	</div>

		<div v-if="this.showblank === false" class="text-xs-center pagination">
            <v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
   		</div>
	


		<div v-if="showblank == true" style="margin-top:40px; display:flex;justify-content:center; align-items:center;">
			 <v-card style="width:100%; height:100%;">
				 <p class="nodata"> No data available</p>
            <!-- <v-img class="img-hgt" src="http://159.89.161.64:8081/web/assets/NodataImage.png"
                >
            </v-img> -->
			</v-card>
		</div>
</v-flex>
</template>

<script>
	import cardComponent from '../../component/CardComponent.vue'
	import axios from 'axios'
	
	export default{
components:{
	cardComponent 
},

created(){

	 console.log("TABLE DATA=>", this.objRejct);

	 this.channeldatalist();
	 this.channelName='all'
	 this.getProposalData('all')
	 console.log("the ID IS +>", this.objRejct.proposalid)
//  axios.get('http://159.89.161.64:5055/secure/user/getAgentproposal/5a8c1e7d07151804a888eafc?proposalStatus=all').then(
// axios.get(this.API_Service_admin()+'getProposal?proposaltype=Proposalstarted&userId=5b3b4cc28fa96d39870443e3&skip=0').
// 			then( 
//                res => {
// 				   console.log('REJECT GET DATA::',res.data.errMsg);
// 				   rejctResp= res.data.errMsg[0];
// 				   // console.log(this.obj.benefitIllustration)
// 				   for(let i = 0; i < rejctResp.length; i++) {
// 						this.dataStruct.name = this.doSentenceCase(rejctResp[i].benefitIllustration.NameofLifeAssured);
// 						this.dataStruct.proposalId = rejctResp[i]._id;
// 						this.dataStruct.planName = rejctResp[i].productId.productName;
// 						this.dataStruct.createdDate = rejctResp[i].createdDate;
// 						this.dataStruct.recieptingStatus = '-';
// 						this.dataStruct.specialCare = '-';
// 						this.dataStruct.status = 'Draft'
					
// 						this.objRejct.push(this.dataStruct);
// 						console.log('DATA pushed', this.objRejct)
						
// 						this.dataStruct = {};
// 					}
                   
//                }
//            ).catch(
//                err => {
//                    console.log(err) ;
//                }
//            );
},

  filters: {

       formateDate(milisecond) {
           try {
               return new Date(parseInt(milisecond)).toLocaleDateString()
           } catch(err) {
               return milisecond;
           }
       }
	 },
	 
	computed:{
		objmethod() {
    	 var self=this;
			 return this.objRejct.filter(function(cust){return cust.name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 
			 	|| cust.applicationcode.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
			//  || cust.planName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
				// || cust.specialCare.toLowerCase().indexOf(self.value.toLowerCase()) >=0
			
         
           
         });
       //return this.customers;
    },
	},


methods:{
	Searchdatatable (e) {
            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
			},
			
		 next(e){
                // console.log('Page Event', e)
                let skipdata = e - 1
                console.log('data',skipdata)
                if(skipdata === 0 ){
                    this.skip = 0
                }else{
                    this.skip = this.skipdiffrence*skipdata
                }
				console.log('skip data',this.skip)
				this.getProposalData(this.channelName,this.skip)
                // this.GetAllLeadData(this.channeldatafilter,this.skip)
		},
		
	getProposalData(chnl,skip){
			// console.log("Channel is",chnl)
			this.objRejct=[];
			let FilterData
			if(chnl === 'all')
			{
				FilterData ='getProposal?proposaltype=Proposalstarted&userId='+this.getAgentInfo()._id+'&skip='+skip
			}
			else
			{
				FilterData ='getProposal?proposaltype=Proposalstarted&userId='+this.getAgentInfo()._id+'&channelCode='+chnl+'&skip='+skip
			}
			
			this.GET(FilterData,res => {
				  //  console.log(' GET DRAFT DATA::',res.data.errMsg);

					 let rejctResp= res.data.errMsg[0];
					 
						// console.log("IDIDIDIDIID = >", rejctResp[i]._id)

				   if(rejctResp.length == 0){
					   this.showblank = true
				   }
				   else{
					  this.showblank = false
				   // console.log(this.obj.benefitIllustration)
				   for(let i = 0; i < rejctResp.length; i++) {

						this.dataStruct.name = this.doSentenceCase(rejctResp[i].benefitIllustration.NameofLifeAssured);
						this.dataStruct.proposalId = rejctResp[i]._id;
						this.dataStruct.planName = rejctResp[i].productId.productName;
						this.dataStruct.createdDate = rejctResp[i].createdDate;
						this.dataStruct.applicationcode= rejctResp[i].application_code
						this.dataStruct.recieptingStatus = '-';
						this.dataStruct.specialCare = '-';
						this.dataStruct.status = 'Draft';
						this.dataStruct.proposalid = rejctResp[i]._id;
						// console.log("IDIDIDIDIDID==>>",  rejctResp[i]._id);
						// console.log("IDs from dataSTRUCT ==>>",this.dataStruct.proposalid);
						this.objRejct.push(this.dataStruct);
						// console.log('DATA pushed', this.objRejct)
						
						this.dataStruct = {};
					}
				   }

				    var pageLen = res.data.errMsg[1]
					console.log('LEAD pageLen: >',pageLen)
					let totalCount = pageLen[0].totalCount
					// if(totalCount == 0){	
					// this.pageLength = 1
					// }else{
                    console.log('Page Length:',totalCount)
                    // console.log('Skip Diff Length:',this.skipdiffrence)
					this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
               
				}
			);
          
		},

		getProposalview(id, index){
			// console.log("the Proposal ID=>", id);
			// console.log("the index is=>", index);
			let self = this;
			
			let proposalID = id;
			// console.log("Proposal ID after click is=>", proposalID)
			
			// let id = this.userId._id;
            // let userId = self.$store.state.agentDetails._id
			// 	console.log(userId)	
			
			this.GET('getProposaldetails/'+proposalID,res => {
					// console.log('Proposal Response proposal details', res)
					this.$store.commit('SET_PROPOSAL_DETAILS',res.data.errMsg[0])
					this.$router.push('/proposalsumm');
				}
			);
		},
    channeldatalist(){

			//    console.log("Channel Array is",chnArray)
			//    this.channeltxtarray.push(chnArray)
			   let self = this
			// let chaneldata = this.$store.state.chanelDetails
			 this.channeltxtarray=[]
			 self.GET('getchannel?userId=' + self.getAgentInfo()._id, response_chn => {
		
			
            if (response_chn.data.errCode === -1) {
	   
					// console.log("Response CODe in common",response_chn.data.errMsg)
					// let res = res.data.errMsg
                   for(let i =0;i<response_chn.data.errMsg.length;i++){
                       if(response_chn.data.errMsg[i].active === 1){
                           let channetobj ={
                               text:response_chn.data.errMsg[i].channelName,
                               value:response_chn.data.errMsg[i]._id
                           }
                           
                           this.channeltxtarray.push(channetobj)
                                   this.channeltxtDialog.push(channetobj)
                  // console.log("chanel details",this.channeltxtDialog)
                       }
                      
                       

                   }
                      let alldata={
                                text:'All',
                                value:'all',
                            }
                              
                        this.channeltxtarray.unshift(alldata)

    
                                            //  })
             
                // console.log("pushing chanel array",this.channeltxtarray)
            }
        });
             
        },
},

		data () {
      return {
		  		skipdiffrence:this.paginationdiff(),
				pageLength:0,
				page:1,
				skip:0, 
				value:'',
				headers: [
                { text: 'Proposal  ID', value: 'id' },
                { text: 'Name', value: 'name'},
								{ text: 'Status', value: 'status' },
								{ text: 'Created Date', value: 'created'},
								{ text: 'Plan Name', value: 'plan'},
                { text: 'Receiepting status', value: 'receiepting'},
                { text: 'Special Case', value: 'special'},
                { text: 'Action', value: 'action'},
            ],
		  objRejct:[],
		  	  channeltxtarray:[],
			  channeltxtDialog:[],
			  channelName:'all',
			  showblank:false,
		  		dataStruct:{
				name:'',
				proposalId:'',
				planName:'',
				createdDate:'',
				recieptingStatus:'',
				specialCare:'',
				status:'Reject',
			},

		  cardListData:{
			  pageName:'QCReject',
			  data:[{
        	
					name:'Bhavin suthar',
					proposalId:'PID276674',
					planName:'Increasing Insurance',
					createdDate:'25-may-2018',
					recieptingStatus:'Pending',
					specialCare:'Yes',
					status:'Rejected',
        		},
				{
        	
					name:'Nadeem khan',
					proposalId:'PID276674',
					planName:'Increasing Insurance',
					createdDate:'25-may-2018',
					recieptingStatus:'Pending',
					specialCare:'Yes',
					status:'Rejected',
				},
				
				],
			
		  },
		//   cardListDatas:{
		// 	  pageName:'Open',
			  
		//   }
        
      }
    }
	}
</script>

<style >

 .nodata{
	 font-size:25px;
	 font-weight:500;
	 color:#999;
 }

/* .theme--light.v-label{
		color:white !important;
		font-weight:500;
		letter-spacing: 0.5px;
		font-size:15px;
	}

.theme--light.v-icon{
		color:white !important;
	}
	 .theme--light.v-input input, .theme--light.v-input:not(.v-input--is-disabled) textarea{
		color:white !important;
	}
	.v-autocomplete .v-select.v-text-field input{
		color:white  !important;
	}
	*/

	.modifydd2{
			background-color:#fafafa !important;
		height:60px;
		margin-top:-69px;
		right:-16px;
	} 

	.modifydd{
		background-color:#fafafa !important;
		height:60px;
		margin-top:-69px;
		margin-left:12px;
	} 


	.img-hgt{
		height: 600px;
		width: 700px;
	}	
	.pros-card-pass{
		padding: 4px;

	}
	#card{
		text-align: left;
		margin-bottom: 5px;

	}
			
	.prop-layout-pass{
		display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
	}
	/* @media screen and (min-width: 320px) {
		
	}

	@media screen and (min-width: 768px) {
		.nx-flex-direction-ld-mgmt {
            flex-direction: column;
        }
	}

	@media screen and (min-width: 992px) {
		
	} */
</style>