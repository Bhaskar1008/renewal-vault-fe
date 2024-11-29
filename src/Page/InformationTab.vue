<template>
    

    <v-container grid-list-xl>
        <v-layout row wrap>
            <!-- Start here -->
            <v-flex xs12 row wrap>
                <v-card>
					<v-layout row wrap>
						<v-flex xs9 mt-3>
							<v-layout row wrap ml-1>  
				
								<v-flex xs3 text-xs-center>
									<v-avatar color="red">
										<!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"> -->
											
									</v-avatar>
									<v-text>{{prf.clientName}}</v-text>
								</v-flex>
								<!-- <v-flex xs2 text-xs-center>
								
								</v-flex> -->
								<v-flex  xs7 text-xs-right ml-6>
									<div>
										<v-btn ml-3 depressed color="#01B4BB" style="color:white" @click.native="approve">APPROVE</v-btn>
										<v-btn ml-2 depressed color="#424242" style="color:white"  @click.native="approve">REJECT</v-btn> 
										<v-btn ml-2 depressed color="#FFA200" style="color:white"  @click.native="approve" >RAISE REQUIREMENT</v-btn>
									</div>
								</v-flex>
								
							</v-layout>
						
							<v-layout row wrap style="padding-left:15px;"> 
								<v-flex  xs4 pa-3  v-for="(dat, li) in infomationData" :key="li">
									<div><v-text class="caption">{{dat.label}}</v-text></div>
									<v-text class="body-1">{{dat.value}}</v-text>
								</v-flex>
							</v-layout>
						</v-flex>

						<v-flex xs3>
					<div id="app">
    <v-container style="max-width: 600px;">
      <v-timeline dense clipped>
  
       
  
 
  
        <v-timeline-item
          class="mb-3"
          color="grey"
          icon-color="grey lighten-2"
          small
        >
          <v-layout wrap>
            <v-flex xs12>Applied.</v-flex>
			  <v-flex xs12>{{createddate}}</v-flex>
          </v-layout>
          <v-layout>
                 <v-flex xs12>15:26 EDT</v-flex>
            </v-layout>
        </v-timeline-item>
  
          <v-timeline-item
          class="mb-3"
          color="orange"
          icon-color="grey lighten-2"
          small
        >
          <v-layout wrap>
            <v-flex xs12>Verified.</v-flex>
			  <v-flex xs12>{{createddate}}</v-flex>
          </v-layout>
          <v-layout>
                 <v-flex xs12>15:26 EDT</v-flex>
            </v-layout>
        </v-timeline-item>
  
         <v-timeline-item
          class="mb-3"
          color="#01B4BB"
          icon-color="grey lighten-2"
          small
        >
          <v-layout wrap>
            <v-flex xs12>Issued.</v-flex>
			  <v-flex xs12>{{createddate}}</v-flex>
          </v-layout>
          <v-layout>
                 <v-flex xs12>15:26 EDT</v-flex>
            </v-layout>
        </v-timeline-item>
  
       
  
  
       
      </v-timeline>
    </v-container>
</div>
						</v-flex>
					</v-layout>
                
                </v-card>
            </v-flex>
                <!-- End here -->
     
    <v-flex v-for="(itemList, itemInde) in items" class="mt-2" :key="itemInde" xs12 sm12 md6>
              <!-- START -->
        <!-- <v-container fluid grid-list-md> -->
            <v-data-iterator
                :items="itemList.card"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                content-tag="v-layout"
                hide-actions
                row
                wrap
            >
                <v-flex slot="item" slot-scope="props">
                    <v-card style="border-color: #01B4BB;border-style: solid;border-width: 1px;">
                        <v-card-title class="subheading font-weight-bold box-color font-color">{{ props.item.title }}</v-card-title>
                        <v-divider></v-divider>

                        <v-list dense>
                            <v-list-tile v-for="(list, subList)  in props.item.card" :key="subList">
                                <v-list-tile-content>{{list.label}}</v-list-tile-content>
                                <v-list-tile-content  class="align-end " v-if="'data' in list">{{ list.data }}</v-list-tile-content>
                                <!-- <p  v-else >{{list.img}}</p> -->
                                <!-- <img v-else style="height: 20px; width:20px;" src="https://www.materialui.co/materialIcons/action/android_black_192x192.png" /> -->
                                <img v-else style="height: 20px; width:20px;" :src="list.img" />
                                

                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-data-iterator>
         <!-- </v-container>      -->
         <!-- END  -->
    </v-flex>
     <v-flex>
        <v-card style="border-color: #01B4BB;border-style: solid;border-width: 1px;margin-top:8px">
            <v-card-title class="subheading font-weight-bold box-color font-color">Documents</v-card-title>
            <v-divider></v-divider>

            <v-list dense>
                <v-list-tile>
                    <v-list-tile-content>PAN:</v-list-tile-content>
                    <v-list-tile-content class="align-center" style="margin-left:60px">22/05/15</v-list-tile-content>
                    <v-list-tile-content class="align-end font-decor" @click="carDialogDoc = true">view</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Driving Licence:</v-list-tile-content>
                    <v-list-tile-content class="align-center" >22/05/15</v-list-tile-content>
                    <v-list-tile-content class="align-end font-decor" @click="carDialogDoc = true">view</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Aadhar:</v-list-tile-content>
                    <v-list-tile-content class="align-center" style="margin-left:48px">22/05/15</v-list-tile-content>
                    <v-list-tile-content class="align-end font-decor" @click="carDialogDoc = true">view</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Previous policy document:</v-list-tile-content>
                    <v-list-tile-content class="align-center" style="margin-right:58px">22/05/15</v-list-tile-content>
                    <v-list-tile-content class="align-end font-decor" @click="carDialogDoc = true">view</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Registration Card:</v-list-tile-content>
                    <v-list-tile-content class="align-center" style="margin-right:8px">22/05/15</v-list-tile-content>
                    <!-- <div @click="imgWindow"> -->
                        <v-list-tile-content class="align-end font-decor" @click="imgWindow">view</v-list-tile-content>
                    <!-- </div> -->
                </v-list-tile>
                
            </v-list>
        </v-card>
    </v-flex>

     <v-dialog  v-model="carDialogDoc" width="800px ">
        <v-flex>
            <v-card>
                <v-card-title  style="background-color:#01B4BB;font-size: 16px;color: white;justify-content: center;" primary-title>Documents</v-card-title>
                <v-flex pa-4>
                    <v-carousel  :cycle = "false" >
                        <v-carousel-item v-for="(item, i) in itemIMG" :key="i = imgSlideIndex" :src="item.src">
                            {{i}}
                            <v-flex style="margin-bottom:12px;">
                                <v-text class="title font-weight-medium" style="justify-content: center;display: flex;">{{itemIMG[i].label}}</v-text>
                            </v-flex>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>            
            </v-card>
        </v-flex>
    </v-dialog>
    </v-layout>
</v-container>
</template>
<script>
    import dataList from '../common/dataList.js'
  export default {
      created() {
          console.log('Object ', dataList.Details);
        
          this.carstorevalue = this.$store.getters.getCarDetails
          
          let car_lenght =this.$store.getters.getCarDetails.length
          
          console.log('this.carstorevalue',this.carstorevalue)
          console.log('car_lenght',car_lenght)
        
            // for(i=0;i<car_lenght;i++){
            //     for(j=0;j<this.carstorevalue.length;j++)
            //     {
            //         this.dataList.Details[j].label=='City of registration' ? this.dataList.Details[j].value=this.carstorevalue[i].VehiclesDetails.CityofRegistration
            //         // self.travelFields[j].label == 'Age' ? self.travelFields[j].value = _getRespData[i].age1 :


            //     }
            // }

            let itemListLength = this.items.length;
            let nestLength = 0
            for (let i = 0; i < itemListLength; i++) {
                nestLength = this.items[i].card[0].card.length;
                for(let j = 0; j < nestLength; j++) {

                    // dataStructure.allocationDate = new Date(parseInt(resObj.created_date)).toLocaleDateString();
                    // vehicle details
                    this.items[i].card[0].card[j].label == 'City of registration :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].VehiclesDetails.CityofRegistration) :
                    this.items[i].card[0].card[j].label == 'Car make :' ? this.infomationData[1].value = this.items[i].card[0].card[j].data =  this.checkValidy(this.carstorevalue[0].VehiclesDetails.Carmake) :
                    this.items[i].card[0].card[j].label == 'Car Model :' ? this.infomationData[4].value = this.items[i].card[0].card[j].data =  this.checkValidy(this.carstorevalue[0].VehiclesDetails.Carmodel) :
                    this.items[i].card[0].card[j].label == 'Year of Production:' ? this.infomationData[7].value= this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].VehiclesDetails.YearofProduction) :
                    this.items[i].card[0].card[j].label == 'Registration date :' ? this.infomationData[2].value = this.items[i].card[0].card[j].data =  new Date(parseInt(this.carstorevalue[0].VehiclesDetails.RegistrationDate)).toLocaleDateString() :
                    this.items[i].card[0].card[j].label == 'Vehicle registration no. :' ? this.infomationData[5].value = this.items[i].card[0].card[j].data =  this.checkValidy(this.carstorevalue[0].VehiclesDetails.VehicleRegistrationNo) :
                    this.items[i].card[0].card[j].label == 'Engine no. :' ? this.infomationData[8].value= this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].VehiclesDetails.EngineNumber) :
                    this.items[i].card[0].card[j].label == 'Chassis no. :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].VehiclesDetails.ChassisNumber) :
                    
                    // personal details
                    this.items[i].card[0].card[j].label == 'Name :' ? this.prf.clientName = this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].PersonalDetails.Name) :
                    this.items[i].card[0].card[j].label == 'Aadhaar Number :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].PersonalDetails.AadhaarNumber) :
                    this.items[i].card[0].card[j].label == 'ID proof type :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].PersonalDetails.IDProofType) :
                    this.items[i].card[0].card[j].label == 'ID proof number :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].PersonalDetails.IDProofNumber) : 
                    this.items[i].card[0].card[j].label == 'Mobile number :' ?this.infomationData[0].value= this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].PersonalDetails.mobileNo): 
                    this.items[i].card[0].card[j].label == 'DOB :' ? this.items[i].card[0].card[j].data =  new Date(parseInt(this.carstorevalue[0].PersonalDetails.DOB)).toLocaleDateString() :
                    this.items[i].card[0].card[j].label == 'Address :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].PersonalDetails.Address):
                    this.items[i].card[0].card[j].label == 'Pincode :' ? this.items[i].card[0].card[j].data =  this.checkValidy(this.carstorevalue[0].PersonalDetails.Pincode):
                    this.items[i].card[0].card[j].label == 'City State :' ? this.infomationData[6].value= this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].PersonalDetails.CityState):
                    this.items[i].card[0].card[j].label == 'PAN number :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].PersonalDetails.PANNumber): 
                    // exsisting details
                    this.items[i].card[0].card[j].label == 'Previous policy type :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].ExistingInsuranceDetails.PreviousPolicyType):
                    this.items[i].card[0].card[j].label == 'Policy start date :' ? this.items[i].card[0].card[j].data =  this.checkValidy(new Date(parseInt(this.carstorevalue[0].ExistingInsuranceDetails.PolicyStartDate))).toLocaleDateString() :
                    this.items[i].card[0].card[j].label == 'Policy end date :' ? this.items[i].card[0].card[j].data = new Date(parseInt(this.carstorevalue[0].ExistingInsuranceDetails.PolicyEndDate)).toLocaleDateString() :
                    this.items[i].card[0].card[j].label == 'Insurer :' ? this.items[i].card[0].card[j].data = "-":
                    this.items[i].card[0].card[j].label == 'Status :' ? this.items[i].card[0].card[j].data = "-":

                    // loan
                    this.items[i].card[0].card[j].label == 'Hypothecation / Loan :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].Loan.Loan):
                    this.items[i].card[0].card[j].label == 'Financer name :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].Loan.FinancerName):
                    this.items[i].card[0].card[j].label == 'Financer branch :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].Loan.FinancerBranch):""

                    // nominee details
                    this.items[i].card[0].card[j].label == 'Nominee Name :' ? this.items[i].card[0].card[j].data =this.checkValidy(this.carstorevalue[0].Nominee.NomineeName):
                    this.items[i].card[0].card[j].label == 'Relationship with insured :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].Nominee.Relationship_with_nominee):
                    this.items[i].card[0].card[j].label == 'Nominee DOB :' ? this.items[i].card[0].card[j].data = this.checkValidy(new Date (parseInt(this.carstorevalue[0].Nominee.nominee_DOB))).toLocaleDateString():
                    this.items[i].card[0].card[j].label == 'Contact no. :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].Nominee.nomineeContact):
                    this.items[i].card[0].card[j].label == 'Email ID :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.carstorevalue[0].Nominee.nomineeEmail):""

                    this.createddate= new Date(parseInt(this.carstorevalue[0].created_date)).toLocaleDateString();

                    console.log('created date ',this.createddate);













                    // this.items[i].card[0].card[j].label == 'City of registration :' ? console.log('My Value : ', this.carstorevalue[0].VehiclesDetails.CityofRegistration) : ""

                }
            }
            
      },
      methods: {

          approve(){
              this.showToast('This feature is not implemented', this.TOST().INFO);
          },

         
          imgWindow() {
              this.carDialogDoc = true;
              this.imgSlideIndex = 3;
              console.log('hdkjsahdkjah');
          },

            checkValidy(data) {
                console.log('checkvalid function',data);
                if (data == "" || data == undefined || data == null || data == '' || data == undefined, undefined || data == 'Invalid Date') {
                    return "-"
                } else {
                    return data;
                }
            },
          
      },
	computed: {
        timeline () {
            return this.events.slice().reverse()
        }
    },
    data: () => ({

        createddate:'',
        carDialogDoc:false,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },

      imgSlideIndex : 0,

      prf: {
          clientName: '',
          Carmake:'',

      },

      carstorevalue:[],
	   events: [],
	    input: null,
    nonce: 0,

    itemIMG: [
                {
                label:'PAN:' ,   
                src: 'web/assets/Image13.png'
                },
                {
                label:'DRIVING LICENSE:' ,
                src: 'web/assets/Image13.png'
                },
                {
                label:'AADHAR:' ,
                src: 'web/assets/Image13.png'
                },
                {
                label:'PREVIOUS POLICY DOCUMENT:' ,
                src: 'web/assets/Image13.png'
                },
                {
                label:'REGISTRATION CARD:' ,
                src: 'web/assets/Image13.png'
                }

            ],    

      header:[{
          Cityofregistration:"City of registration",
          Carmake:'Car make :',
      }],
      infomationData:[
        {
			label:'Mobile No',
			value:'561-783-1988'

        },
         {
		   label:'Car make',
		   value:'Honda'
        },
         {
			label:'Registration Date',
	        value:'9/4/2018'
        },
          {
			label:'Email ID',
					value:'services@honda.com'
        },
          {
			label:'Car Model',
					value:'Honda City'
        },
          {
			label:'Vehicle registration no',
			value:'HR26637'
        },
          {
			label:'Location',
			value:'Mumbai,Maharashtra'
        },
          {
			label:'Year of Production',
			value:'2015'
        },
          {
			label:'Engine No',
			value:'1GN9878686876'
		}
	  ],

      items: dataList.Details
    })
  }
</script>
<style>

.box-color{
    background-color: #01B4BB
}

.font-color{
    color: #ffffff
}

.info-cmp-pd{
    padding: 18px;
    
}
.font-decor{
    color:#01B4BB;
    font-size:14px;
    text-decoration:underline;
    cursor: pointer;
}

</style>


