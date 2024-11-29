<template>
    <v-app>
        
        <div class="insu-layout-new" >
            <v-flex  v-for="(listData, index) in carDataSetList" :key="index" class="pros-card-new mt-2" xs12 lg6>
               
                    <insu-car
                     :car-data="listData"
                    ></insu-car>
            </v-flex>
        </div>
    </v-app>

</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import insuCar from '../component/insuranceCompo'
export default {
    created() {
        this.$store.commit('SET_PAGE_TITLE','Car Details');
        this.getCarDetails();              
    },

    components:{
	insuCar
},
    
    data() {
        return {
            

            travelFields: [
                {
                    label: 'Name',
                    value: ''
                }, {
                    label: 'Age',
                    value: ''
                }, {
                    label: 'Email',
                    value: ''
                }, {
                    label: 'Travelling to',
                    value: ''
                }, {
                    label: 'Trip Start Date',
                    value: ''
                }, {
                    label: 'Trip End Date',
                    value: ''
                }, {
                    label: 'Sum insured',
                    value: ''
                }
            ],

            moment:moment,
            carDataSetList: [],
            travelDataSetList: []
        }
    },
    methods: {
        ...mapMutations(['showSnackbar', 'closeSnackbar']),
        getCarDetails() {
            console.log('API HITING');
            const GET_CAR_API = 'getcar?filter=0&car_id=5bdd48bc12df0c9f82f151aa';
            let self = this;
            this.GETUSER(GET_CAR_API , res => {
                let _getRespData = res.data.errMsg;
                let _length = _getRespData.length;
                console.log('Response : qwdfwqfqwf ' , _getRespData);
                for(let i = 0; i < _length; i++) {
                    let sortedFields = {};
                    sortedFields.personalname = _getRespData[i].PersonalDetails.Name
                    sortedFields.policyno = _getRespData[i].VehiclesDetails.VehicleRegistrationNo
                    sortedFields.planname = _getRespData[i].VehiclesDetails.car_img
                    sortedFields.carmake = _getRespData[i].VehiclesDetails.Carmake
                    sortedFields.premiumAmount =  _getRespData[i].premiumAmt
                    sortedFields.status =  "Issued" 
                    sortedFields.lifeinsu = _getRespData[i].VehiclesDetails.Carmodel
                    sortedFields._id=_getRespData[i]._id
                    sortedFields.policyissued =new Date(_getRespData[i].created_date).toLocaleDateString()

                    self.carDataSetList.push(sortedFields);
                    sortedFields = {};
                    console.log('car data ',self.carDataSetList)
                }

                /**
                 * When first API data display sucessfully on front end then another function
                 * will execute
                 */

                self.getTravelDetails();
			}).catch(error => {
                console.log(error);
            });
        },

        arrayToCSV(list) {
            let csv = "";
            for (let i = 0; i < list.length; i++) {
                csv = csv == "" ? list[i] : csv+','+list[i];
            }
            return csv;
        },

        filterID(id) {
            if (id !== '') {
                if (typeof(id) !== undefined) {
                    id = 'P' + id.slice(16, 25).toUpperCase();
                }
            }
            return id;
        },
        getTravelDetails() {
            const GET_TRAVEL_API ='get_travel?filter=0&travel_id=5bdd4a4612df0c9f82f151b9';

            let self = this;
            THIS.GETUSER(GET_TRAVEL_API , res => {
                
                let _getRespData = res.data.errMsg;
                let _length = _getRespData.length;
                let _dataSetLength = self.travelFields.length;

                for(let i = 0; i < _length; i++) {

                    // const AGE = moment(""+ parseInt(_getRespData[i].TravellerDetails_Traveller1.DOB)+Date.now(), 'YYYYMMDD').fromNow();
                    for(let j = 0; j < _dataSetLength; j++) {

                        self.travelFields[j].label == 'Name' ? self.travelFields[j].value = (_getRespData[i].TravellerDetails_Traveller1.FirstName+' '+_getRespData[i].TravellerDetails_Traveller1.LastName) : 
                        self.travelFields[j].label == 'Age' ? self.travelFields[j].value = _getRespData[i].age1 : 
                        self.travelFields[j].label == 'Email' ? self.travelFields[j].value = _getRespData[i].ContactDetails.EmailAddress  : 
                        self.travelFields[j].label == 'Travelling to' ? self.travelFields[j].value = this.arrayToCSV(_getRespData[i].travellingCountry) :
                        self.travelFields[j].label == 'Trip Start Date' ? self.travelFields[j].value =  _getRespData[i].TripDetails.TripStartDate :
                        self.travelFields[j].label == 'Trip End Date' ? self.travelFields[j].value = _getRespData[i].TripDetails.TripEndDate :
                        self.travelFields[j].label == 'Sum insured' ? self.travelFields[j].value = '50,00'+ ((i+2)*2) : ''
                    }

                    self.travelDataSetList.push({data: self.travelFields});
                    console.log(self.travelDataSetList);

                    self.showSnackbar({text: 'Successfully loaded',color:'green'})             
                }
			}).catch(error => {
                console.log(error);
            });

        }
    }
}
</script>

<style scoped>

    .pros-card-new{
		padding: 4px;

	}
    .insu-layout-new{
		display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
	}
    .insurance-admin-page .ctm-row {
        flex-direction: row;
        /* flex-flow: wrap; */
    }

    .insurance-admin-page .ctm-pd {
        padding: 20px;
    }

    @media (min-width: 320px) {
        
    }
    @media (min-width: 768px) {
        
    }
    @media (min-width: 992px) {
        
    }
</style>

