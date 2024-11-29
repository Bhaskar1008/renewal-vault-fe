<template>
	<v-flex>
	
    <!-- <v-tab-item> -->
	<v-flex xs12 sm3 md3>
		<v-select autocomplete item-text="text" :items="channeltxtarray" v-model="channelName" item-value="value" label="Branch"></v-select>
	</v-flex>
	
	<div class="prop-layout-arch" >
		<v-flex v-for="(listData, index) in obj" :key="index"  class="pros-card-archive mt-2" xs12 lg6 >
			<card-component :page-name="cardListData.pageName" :card-data="listData"></card-component>
		</v-flex>
	</div>
<!-- </v-tab-item> -->


 
	</v-flex>	
</template>

<script>
	import cardComponent from '../../component/CardComponent.vue'
	import axios from 'axios'
	
	export default{
components:{
	cardComponent 
},
methods:{
	   channeldatalist(){
		   this.channelName='all'

			//    console.log("Channel Array is",chnArray)
			//    this.channeltxtarray.push(chnArray)
			   let self = this
			// let chaneldata = this.$store.state.chanelDetails
			 this.channeltxtarray=[]
			 self.GET('getchannel?userId=' + self.getAgentInfo()._id, response_chn => {
		
		
            if (response_chn.data.errCode === -1) {

					console.log("Response CODe in common",response_chn.data.errMsg)
					// let res = res.data.errMsg
                   for(let i =0;i<response_chn.data.errMsg.length;i++){
                       if(response_chn.data.errMsg[i].active === 1){
                           let channetobj ={
                               text:response_chn.data.errMsg[i].channelName,
                               value:response_chn.data.errMsg[i]._id
                           }
                           
                           this.channeltxtarray.push(channetobj)
                                   this.channeltxtDialog.push(channetobj)
                  console.log("chanel details",this.channeltxtDialog)
                       }
                      
                       

                   }
                      let alldata={
                                text:'All',
                                value:'all',
                            }
                              
                        this.channeltxtarray.unshift(alldata)

    
                                            //  })
             
                console.log("pushing chanel array",this.channeltxtarray)
            }
        });
             
        },
},

created(){
	 this.channeldatalist();
//  axios.get('http://159.89.161.64:5055/secure/user/getAgentproposal/5a8c1e7d07151804a888eafc?proposalStatus=all').then(
	this.GET('getProposal?proposaltype=login&userId='+this.getAgentInfo()._id+'&skip=0',res => {
				   console.log(res.data.errMsg[0]);
				   this.obj= res.data.errMsg[0];
                   // console.log(this.obj.benefitIllustration)
                   
               }
           );
},

		data () {
      return {
		  obj:[],
           	  channeltxtarray:[],
			  channeltxtDialog:[],
			  channelName:'all',
		  cardListData:{
			  pageName:'Archieve',
			  data:[{
        	
					name:'Shoaib Soni',
					proposalId:'PID276674',
					planName:'Increasing Insurance',
					createdDate:'25-may-2018',
					recieptingStatus:'Pending',
					specialCare:'Yes',
					status:'Passed',
        		},
				{
        	
					name:'Ash Jain',
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

<style>
	.pros-card-archive{
		padding: 4px;

	}
	#card{
		text-align: left;
		margin-bottom: 5px;

	}
			
	.prop-layout-arch{
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