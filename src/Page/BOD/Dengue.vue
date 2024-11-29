<template>
    <v-app>
        
        <div class="insu-layout-new" >
            <v-flex v-for="(listData, index) in dengueDataSetList" :key="index" class="pros-card-new mt-2" xs12 lg6>
                    
               
                    <!-- <insu-car
                     :car-data="listData"
                    ></insu-car> -->
                    <dengue

                    :dengue-data="listData"
                    >

                    </dengue>

            </v-flex>
        </div>
    </v-app>

</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import dengue from '../../component/dengue-comp'
export default {
    created() {
        this.getCarDetails();              
    },

    components:{
	dengue
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
            dengueDataSetList: [],
            travelDataSetList: []
        }
    },
    methods: {
        ...mapMutations(['showSnackbar', 'closeSnackbar']),
        getCarDetails() {
            
            console.log('API HITING');
            const GET_PET_API = 'getDengue?filter=0&dengue_data_id=5bfe7145d34219366fb401d5';
            
            let self = this;
            this.GET(GET_PET_API, res => {
                let _getRespData = res.data.errMsg;
                let _length = _getRespData.length;
                console.log('Response : Dengue ' , _getRespData);
                console.log('pet lenght',_length)
                for(let i = 0; i < _length; i++) {
                    let sortedFields = {};
                    sortedFields.firstName = self.checkValidy(_getRespData[i].firstName)
                    sortedFields.lastName = self.checkValidy(_getRespData[i].lastName)
                    sortedFields.NameofLife_Insured =self.checkValidy(_getRespData[i].NameofLife_Insured)
                    sortedFields.TotalCost =self.checkValidy(_getRespData[i].TotalCost)
                    sortedFields.premiumAmt =self.checkValidy(_getRespData[i].premiumAmt)
                    sortedFields.DOB =self.checkValidy(new Date(parseInt(_getRespData[i].DOB)).toLocaleDateString())
                    sortedFields._id=_getRespData[i]._id
                    self.dengueDataSetList.push(sortedFields);
                    sortedFields = {};
                    console.log('Dengue data ',self.dengueDataSetList)
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

         checkValidy(data) {
                // console.log('jdlkasjklajdalsk', data);
                if (data == "" || data == undefined || data == null || data == '' || data == undefined, undefined || data == 'Invalid Date') {
                    return "-"
                } else {
                    return data;
                }
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

