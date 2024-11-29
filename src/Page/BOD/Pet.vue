<template>
    <v-app>
        
        <div class="insu-layout-new" >
            <v-flex v-for="(listData, index) in petDataSetList" :key="index" class="pros-card-new mt-2" xs12 lg6>
                
               
                    <!-- <insu-car
                     :car-data="listData"
                    ></insu-car> -->
                    <pet
                    :pet-data="listData"
                     >

                    </pet>

            </v-flex>
        </div>
    </v-app>

</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import pet from '../../component/Pet-comp'
export default {
    created() {
         this.$store.commit('SET_PAGE_TITLE','Pet Details');
        this.getCarDetails();              
    },

    components:{
	pet
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
            petDataSetList: [],
            travelDataSetList: []
        }
    },
    methods: {
        ...mapMutations(['showSnackbar', 'closeSnackbar']),
        getCarDetails() {
            
            console.log('API HITING');
            const GET_PET_API = 'getpetData?filter=0&dengue_data_id=5bfea7d5c542ad4e74fc3a03';
            
            let self = this;
            this.GETUSER(GET_PET_API , res => {
                
                let _getRespData = res.data.errMsg;
                let _length = _getRespData.length;
                
                console.log('Response : qwdfwqfqwf ' , _getRespData);
                console.log('pet lenght',_length)


                for(let i = 0; i < _length; i++) {

                    let sortedFields = {};
                    sortedFields.nameofPet = _getRespData[i].nameofPet
                    sortedFields.DOB = new Date(parseInt(_getRespData[i].DOB)).toLocaleDateString()
                    sortedFields.animalType = _getRespData[i].animalType
                    sortedFields.nameOfOwner =  _getRespData[i].nameOfOwner
                    sortedFields.policyissued = new Date(parseInt(_getRespData[i].created_date)).toLocaleDateString()
                    sortedFields.premiumAmt = _getRespData[i].premiumAmt
                    sortedFields._id=_getRespData[i]._id

                    self.petDataSetList.push(sortedFields);
                    sortedFields = {};

                    console.log('pet data ',self.petDataSetList)
                }

                /**
                 * When first API data display sucessfully on front end then another function
                 * will execute
                 */

            
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

