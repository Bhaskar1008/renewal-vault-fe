<template>
<v-flex>
	<!-- <v-flex xs12 sm3 md3>
		<v-select autocomplete item-text="text" :items="channeltxtarray" @change="getProposalData" v-model="channelName" item-value="value" label="Channel"></v-select>
	</v-flex> -->
	<v-layout justify-start row>
	<v-flex xs12 sm10 md8 lg6>
        <v-card ref="form" flat class="modifydd" light style="width:200px;">
          <v-card-text>
            <v-autocomplete
			 item-text="text"
			 :items="channeltxtarray"
			 @change="getProposalData"
			 v-model="channelName"
			 item-value="value"
			 label="Channel"              
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

	<div class="prop-layout-pass" v-if="showblank == false">
		<!-- <v-flex v-for="(listData, index) in passobj" :key="index"  class="pros-card-pass mt-4" xs12 lg6 > -->
				
			<!-- <card-component :page-name="cardListData.pageName" :card-data="listData"></card-component> -->
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

		<div v-if=" this.showblank === false" class="text-xs-center pagination">
            <v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
    	</div>


	<div v-if="showblank == true" style="margin-top:40px; display:flex;justify-content:center">

		<v-card class="nodatacard">
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
	 this.channeldatalist();
	 this.channelName='all'
	 this.getProposalData('all');
//  axios.get('http://159.89.161.64:5055/secure/user/getAgentproposal/5a8c1e7d07151804a888eafc?proposalStatus=all').then(
	// self = this
	// let passresponse = [];
	// axios.get(this.API_Service_admin()+'getProposal?proposaltype=issued&userId=5b3b4cc28fa96d39870443e3&skip=0').
	// 		then( res => {
	// 			   console.log('PASSED GET::',res.data.errMsg);
	// 				passresponse= res.data.errMsg[0];
					
	// 			   for(let i = 0; i < passresponse.length; i++) {
	// 				// this.data.name = this.doSentenceCase(passresponse[i].benefitIllustration.AdvisorName);



	// 					self.cardListData.dataStruct.name = self.doSentenceCase(passresponse[i].benefitIllustration.NameofLifeAssured);
	// 					self.cardListData.dataStruct.proposalId = passresponse[i]._id;
	// 					self.cardListData.dataStruct.planName = passresponse[i].productId.productName;
	// 					self.cardListData.dataStruct.createdDate = passresponse[i].createdDate;
	// 					self.cardListData.dataStruct.recieptingStatus = 'Complete';
	// 					self.cardListData.dataStruct.specialCare = '-';


	// 				// self.cardListData.dataStruct.name = "shoaib";

	// 				// self.cardListData.dataStruct.proposalId = passresponse[i]._id;
	// 				// self.cardListData.dataStruct.planName = passresponse[i].benefitIllustration.AdvisorName;
	// 				// self.cardListData.dataStruct.createdDate =passresponse[i].createdDate;
	// 				// self.cardListData.dataStruct.recieptingStatus = passresponse[i].benefitIllustration.AdvisorName;
	// 				// self.cardListData.dataStruct.specialCare= passresponse[i].benefitIllustration.AdvisorName;
	// 				self.cardListData.dataStruct.status='issued'

	// 				self.passobj.push(self.cardListData.dataStruct);
					
	// 				console.log('pass object ',self.passobj);
					
	// 				self.cardListData.dataStruct = {};
					
	// 			   }

    //                // console.log(this.obj.benefitIllustration)
                   
    //            }
    //        ).catch(
    //            err => {
    //                console.log(err) ;
    //            }
    //        );
},

	computed:{
			objmethod() {
    	 var self=this;
			 return this.passobj.filter(function(cust){return cust.name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
			 || cust.applicationcode.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        // || cust.planName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
				// || cust.specialCare.toLowerCase().indexOf(self.value.toLowerCase()) >=0
				
         
           
         });
       //return this.customers;
    },
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
			this.passobj=[];
			let FilterData
			let self=this
			if(chnl === 'all')
			{
				FilterData = 'getProposal?proposaltype=issued&userId='+this.getAgentInfo()._id+'&skip='+skip
			}
			else
			{
				FilterData = 'getProposal?proposaltype=issued&userId='+this.getAgentInfo()._id+'&channelCode='+chnl+'&skip='+skip
			}
			
			this.GET(FilterData,res => {
				  //  console.log('PASSED GET::',res.data.errMsg);
					let passresponse= res.data.errMsg[0];

						if(passresponse.length == 0){
							this.showblank = true
						}
					else{
						this.showblank = false
				   for(let i = 0; i < passresponse.length; i++) {
					// this.data.name = this.doSentenceCase(passresponse[i].benefitIllustration.AdvisorName);

						self.cardListData.dataStruct.name = self.doSentenceCase(passresponse[i].benefitIllustration.NameofLifeAssured);
						self.cardListData.dataStruct.proposalId = passresponse[i]._id;
						self.cardListData.dataStruct.planName = passresponse[i].productId.productName;
						self.cardListData.dataStruct.createdDate = passresponse[i].createdDate;
						self.cardListData.dataStruct.recieptingStatus = 'Complete';
						self.cardListData.dataStruct.specialCare = '-';
						self.cardListData.dataStruct.applicationcode= passresponse[i].application_code;
						self.cardListData.dataStruct.proposalid = passresponse[i]._id;
					// self.cardListData.dataStruct.name = "shoaib";
					// self.cardListData.dataStruct.proposalId = passresponse[i]._id;
					// self.cardListData.dataStruct.planName = passresponse[i].benefitIllustration.AdvisorName;
					// self.cardListData.dataStruct.createdDate =passresponse[i].createdDate;
					// self.cardListData.dataStruct.recieptingStatus = passresponse[i].benefitIllustration.AdvisorName;
					// self.cardListData.dataStruct.specialCare= passresponse[i].benefitIllustration.AdvisorName;
					self.cardListData.dataStruct.status='Issued'

					self.passobj.push(self.cardListData.dataStruct);
					
					// console.log('pass object ',self.passobj);
					
					self.cardListData.dataStruct = {};
					
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
		  obj:[],
		showblank:false,
		channeltxtarray:[],
		channeltxtDialog:[],
		channelName:'all',
		passobj:[],
		  cardListData:{
			  pageName:'QCPassed',
			  passresponse:[],
			  dataStruct:{
        	
					name:'Gopal Hannurkar',
					proposalId:'PID276674',
					planName:'Increasing Insurance',
					createdDate:'25-may-2018',
					recieptingStatus:'Pending',
					specialCare:'Yes',
					status:'Passed',
        		},
			
			
		  },
		//   cardListDatas:{
		// 	  pageName:'Open',
			  
		//   }
        
      }
    }
	}
</script>

<style>
	

	.modifydd{
		background-color:#fafafa !important;
		height:60px;
		margin-top:-69px;
		margin-left:12px;
	} 

	.nodatacard{
		display:flex; 
		flex:1; 
		justify-content:center;
		align-items:center; 
		height:490px;
	}

	 .nodata{
		 
	 font-size:25px;
	 font-weight:500;
	 color:#999;
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