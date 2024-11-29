
<template>

    <div>

        <v-card class="mrg" flat>
            <p class="titletop" >Proposed Details</p>

        <v-container fluid>

                <div class="textfields">

                    <v-flex   xs4 sm5>
                        <v-select
                            :items="procat"
                            autocomplete
                            v-model="productcat"
                            color="#00ACC1"
                             placeholder="Select"
                            label="Product Category"
                            required
                        ></v-select>

                    </v-flex>

                    <v-flex  xs4 sm5 >
                         <v-select
                            :items="planname"
                            v-model="plannamepro"
                            autocomplete
                            color="#00ACC1"
                            placeholder="Select"
                            label="Plan Name"
                            required
                        ></v-select>
                    </v-flex>
              </div>

                 <div class="textfields">

                  <v-flex   xs4 sm5>
                        <v-menu
                        ref="calender"
                        :close-on-content-click="false"
                        v-model="calender"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                    >
                    <v-text-field
                        slot="activator"
                        v-model="planDate"
                        label="Expected Closure Date"
                        persistent-hint
                        prepend-icon="event"
                        @blur="date = parseDate(planDate)"
                        ></v-text-field>
                        <v-date-picker v-model="date" no-title @input="calender = false"></v-date-picker>
                    </v-menu>

                    </v-flex>

                    <v-flex  xs4 sm5 >
                          <v-text-field
                                v-model="expectedpremium"
                                label="Expected Premium"
                                type="number"
                                persistent-hint


                            ></v-text-field>
                    </v-flex>
              </div>
              <!-- <v-layout class="btnm" align-center justify-space-between row fill-height>

                   <v-btn    color="#F5F5F5" light @click="previous">Previous</v-btn>

                   <v-btn   color="black" dark @click="proceed">Submit</v-btn>

              </v-layout> -->
              <v-layout>
                <v-layout>
                    <v-btn color="#F5F5F5" light @click="previous">Previous</v-btn>
                </v-layout>
              <v-layout class="btnm" align-center style="justify-content:flex-end" row fill-height>

                   <v-btn @click="updateLead" v-if="$store.state.leadputpost === 'PUT'" color="black" dark>Update</v-btn>
                   <v-btn @click="submitdata" v-if="$store.state.leadputpost === 'POST'" color="black" dark>Submit</v-btn>
              </v-layout>
            </v-layout>

      </v-container>



        </v-card>

    </div>

</template>

<script>
import moment from 'moment'
import lead from '../../Page/ActivityUpload/leadCreate/submitLead';
export default {

    computed: {
        computedDateFormatted () {
            return this.formatDate(this.date)
        }
        },
        beforeRouteLeave (to, from, next) {
            this.commitFormFieldsIntoStore();
            next();
        },
        created(){
            this.leaddata = this.getStore('GetLeadData')[0];

            if (this.leaddata.expectedclosureDate === null || this.leaddata.expectedclosureDate === ""||
            this.leaddata.expectedclosureDate === undefined || isNaN(this.leaddata.expectedclosureDate)) {
                this.planDate = ""
            } else {
                this.planDate = moment(this.leaddata.expectedclosureDate).format('MM/DD/YYYY')
            }
            this.productcat = this.leaddata.productCategory
            this.plannamepro = this.leaddata.solution
            this.expectedpremium = this.leaddata.expectedPremium
        },

    data(){
        return{
            moment,
            planname:["Dhan Labh","Cash Income","Cover Plus"],
            procat:["Traditional","Protection","ULIP"],
            calender: false,
            date: null,
            leaddata:[],
            planDate:'',
            productcat:'',
            plannamepro:'',
            expectedpremium:'',
        }
    },
     methods: {
    // Vuetify code
        formatDate (date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        // Vuetify code
        parseDate (date) {
            if (!date) return null
            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        commitFormFieldsIntoStore() {

            let proposed_data = JSON.parse(JSON.stringify(this.leaddata));
            let expectedclosureDate  = moment(this.planDate).valueOf();

            proposed_data.productCategory = this.productcat;   //
            proposed_data.solution = this.plannamepro;
            proposed_data.expectedPremium = this.expectedpremium; //
            proposed_data.expectedclosureDate = isNaN(expectedclosureDate) || expectedclosureDate === null || expectedclosureDate === undefined ? "" : expectedclosureDate;   //

            let temp_arr = [];
            temp_arr.push(proposed_data);
            this.commit('Lead_Object', temp_arr);
        },
        previous(){
            this.jump('/Lmaster/Ltab/existingD')
        },
        submitdata(){
            let store = this.getStore('GetLeadData')[0];
            let formData = lead.generateFormDate(store);

            let self = this;

            lead.submitleaddata(this, formData, function(data, code) {
                if(code === 1){
                    //  console.log(' success dhdhfskhhksdfkdh');
                    // self.status_form.leadId = data.errMsg._id;
                    store.LeadId = data.errMsg._id;
                    store.lead_Owner_Id = data.errMsg.leadOwnerId;
                    store.lead_Creator_Id = data.errMsg.leadCreatorId;
                    store.user_id = data.errMsg.userId;

                    let temp_array = [];
                    temp_array .push(store);

                    self.commit('Lead_Object', temp_array);
                    self.showToast('Lead Created successfully', self.TOST().SUCCESS);
                    self.$router.push('/ActivityLeadUpload');
                }
            });
        },
        updateLead() {
            this.commitFormFieldsIntoStore();
            let self = this;
            let updatedStore = this.getStore('GetLeadData')[0];
            let formData = lead.generateFormDate(updatedStore);

            lead.updateLead(this, formData, function(data, code) {
                if (code === "1") {
                    // Jump to status form
                    self.jump('/Lmaster/status');
                }
            });
        }

    },
    watch: {
        date (val) {
            this.planDate = this.formatDate(this.date)
        }
    },

}
</script>

<style>

.mrg{
    margin: 15px;
}

.btnm{
    margin:0px 25px !important;
}

.titletop{
    margin-top:10px;
    font-family: roboto;
    font-weight:700;
    font-size:16px;
}

.textfields{
    display: flex;
    flex-direction: row;
    /* border:1px dotted blue; */
    margin-bottom: 20px;
    justify-content: space-evenly;
    /* align-items: center; */
}

.textfields2{
     margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    /* border:1px dotted blue; */
    justify-content: space-evenly;
    /* align-items: center; */
    /* margin-left:50px; */
}

.textfields3{
     margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    /* border:1px dotted blue; */
    justify-content: space-evenly;
    /* align-items: center; */
    /* margin-left:50px; */
}

.button{
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    /* border:1px dotted blue; */
    justify-content:space-between;
}


</style>




