<template>
    <v-app>

        <div class="travel-layout-new">
            <v-flex v-for="(listData, index) in travelDataSetList" :key="index" class="travel-card-new mt-2" xs12 lg6>
                <travel-details :travelData="listData"></travel-details>
            </v-flex>
        </div>
    </v-app>

</template>

<script>
    import {
        mapMutations
    } from 'vuex'
    import axios from 'axios'
    import moment from 'moment'
    import travelDetails from '../component/Travelcomp'
    export default {
        created() {
            this.$store.commit('SET_PAGE_TITLE','Travel Details');
            this.getTravelDetails();

        },

        components: {
            travelDetails
        },

        data() {
            return {

                travellingcntry: [],
                travelFields: [{
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
                }],

                moment: moment,
                carDataSetList: [],
                travelDataSetList: []
            }
        },
        methods: {
            ...mapMutations(['showSnackbar', 'closeSnackbar']),
            getCarDetails() {

            },
            arrayToCSV(list) {
                let csv = "";
                for (let i = 0; i < list.length; i++) {
                    csv = csv == "" ? list[i] : csv + ',' + list[i];
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
            getTravelDetails() {
                const GET_TRAVEL_API = 'get_travel?filter=0&travel_id=5bdd4a4612df0c9f82f151b9';

                let self = this;
                this.GETUSER(GET_TRAVEL_API , function (res ,error) {

                    let _getRespData = res.data.errMsg;
                    let _length = _getRespData.length;

                    // console.log('_length', _length)
                    let _dataSetLength = self.travelFields.length;

                    console.log('traveller response filter 0', _getRespData)

                    for (let i = 0; i < _length; i++) {

                        // const AGE = moment(""+ parseInt(_getRespData[i].TravellerDetails_Traveller1.DOB)+Date.now(), 'YYYYMMDD').fromNow();
                        // console.log("_getRespData[i].travellingCountry",_getRespData[i].travellingCountry.length)
                        let sortedFields = {};
                        let _country = "";

                        for (let j = 0; j < _getRespData[i].travellingCountry.length; j++) {
                            // let travellingto={};
                            _country = _getRespData[i].travellingCountry[j].country
                            self.travellingcntry.push(_country)
                            // console.log('array of contray ', self.travellingcntry);
                            _country = "";
                            // travellingto={};
                        }
 
                        sortedFields.travellername = self.checkValidy((_getRespData[i].TravellerDetails_Traveller1.FirstName + ' ' + _getRespData[i].TravellerDetails_Traveller1.LastName))
                        sortedFields.age = self.checkValidy(new Date(parseInt(_getRespData[i].TravellerDetails_Traveller1.DOB)).toLocaleDateString())
                        sortedFields.emailid = self.checkValidy(_getRespData[i].ContactDetails.EmailAddress)
                        sortedFields.country = self.checkValidy(_getRespData[i].travellingCountry[0])
                        console.log('country object seen',sortedFields.country)
                        // sortedFields.country = self.checkValidy(this.arrayToCSV(self.travellingcntry))

                        sortedFields.tripstart = self.checkValidy(new Date(_getRespData[i].TripDetails.TripStartDate).toLocaleDateString())
                        sortedFields.tripend = self.checkValidy(new Date(_getRespData[i].TripDetails.TripEndDate).toLocaleDateString())
                        sortedFields._id = self.checkValidy(_getRespData[i]._id)
                        sortedFields.policyissued = self.checkValidy(new Date(_getRespData[i].created_date).toLocaleDateString())
                        sortedFields.mobileno = self.checkValidy(_getRespData[i].ContactDetails.mobileNo)
                
                        self.travelDataSetList.push(sortedFields);
                        sortedFields = {};
                        // console.log("Sorted Travel", self.travelDataSetList);


                        self.showSnackbar({
                            text: 'Successfully loaded',
                            color: 'green'
                        })
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .travel-card-new {
        padding: 4px;

    }

    .travel-layout-new {
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

    @media (min-width: 320px) {}

    @media (min-width: 768px) {}

    @media (min-width: 992px) {}
</style>