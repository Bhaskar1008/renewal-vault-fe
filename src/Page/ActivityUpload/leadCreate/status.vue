<template>
    <!-- <v-card> -->
        <v-container  grid-list-md>
            <v-flex><p class="subheading mb-0" >Lead Details</p></v-flex>
            <v-layout wrap>
                 <v-flex  xs12 sm6 md6>
                    <v-select :items='channeldata'
                    item-text="text"
                    item-value="value"  label="Select Channel"
                    v-model="contact_form.channelname"></v-select>
                </v-flex>
                 <v-flex  xs12 sm6 md6>
                    <v-select :items='Affiliatelis' label="Affiliate" item-text="text" item-value="value" v-model="contact_form.affiliate"></v-select>
                </v-flex>
                <v-flex  xs12 sm6 md6>
                    <v-select :items="Leadsourcelis" item-text="text" item-value="value" label="Lead Source" v-model="contact_form.leadsource" ></v-select>
                </v-flex>
                <v-flex  xs12 sm6 md6>
                    <v-select :items='campaignlis' item-text="text"  item-value="value" label="Campaign Name" v-model="contact_form.campaign"></v-select>
                </v-flex>
                <!-- <v-flex  xs12 sm6 md6>
                    <v-select @change="channelEvent" :items='channelListID' item-text="text"  label="Channel" v-model="contact_form.chanelName"></v-select>
                </v-flex> -->
                <v-flex  xs12 sm6 md6>
                    <v-text-field v-model="contact_form.firstName" label="First Name"
                    @input="$v.contact_form.firstName.$touch()"
                    @blur="$v.contact_form.firstName.$touch()"
                    :error-messages="Firstnameerror"
                    ></v-text-field>

                </v-flex>
                <v-flex  xs12 sm6 md6>
                    <v-text-field v-model="contact_form.lastName" label="Last Name"
                    @input="$v.contact_form.lastName.$touch()"
                    @blur="$v.contact_form.lastName.$touch()"
                    :error-messages="Lastnameerror"></v-text-field>
                </v-flex>
                <v-flex  xs12 sm6 md6>
                    <v-text-field v-model="contact_form.email" label="Email address"
                    @input="$v.contact_form.email.$touch()"
                    @blur="$v.contact_form.email.$touch()"
                    :error-messages="Emailerror"></v-text-field>
                </v-flex>
                <v-flex  xs12 sm6 md6>
                    <v-text-field v-model="contact_form.contactNo"  mask="phone" label="Mobile Number"
                    @input="$v.contact_form.contactNo.$touch()"
                    @blur="$v.contact_form.contactNo.$touch()"
                    :error-messages="MobileNoerror"></v-text-field>
                </v-flex>
                <v-flex  xs12 sm6 md6>
                    <v-select :items='StateListdata' item-text="text" autocomplete  label="State" @change="cityfind(contact_form.state , null)" v-model="contact_form.state"></v-select>
                </v-flex>
                <v-flex  xs12 sm6 md6>
                    <v-select :items="Citylist" autocomplete label="City" item-text="name" v-model="contact_form.city" ></v-select>
                </v-flex>
               

                <v-flex xs12 sm6 md4>
                        <v-flex xs12 sm6 md6>

                </v-flex>
            </v-flex>
            </v-layout>

            <v-flex><p class="subheading mb-0">Status</p></v-flex>

            <v-layout class="mb-4" wrap>
                <!--
                    Lead status flow
                    It will show when leadFlowActive == true
                 -->

                <v-flex  xs12 sm6 md6 v-show="status_form.leadFlowActive">
                    <v-select :items='LEAD_STATUS_LIST' label="Lead Status" item-value="value" item-text="dispValue" v-model="status_form.leadStatus" @change="onStatusChange"></v-select>
                </v-flex>
                <v-flex  xs12 sm6 md6 v-show="status_form.enable == false && status_form.leadFlowActive == true"></v-flex>
                <v-flex  xs12 sm6 md6 v-show="status_form.enable == true &&  status_form.leadFlowActive == true">
                    <v-select :items="dispositions" label="Lead Disposition" item-value="value" item-text="dispValue" v-model="status_form.disposition" @change="onLeadDispositionsChange"></v-select>
                </v-flex>
                <v-flex  xs12 sm6 md6 v-show="status_form.show_sub_dispo == true && status_form.leadFlowActive == true">
                    <v-select :items='sub_dsipositions' label="Lead Sub-Disposition" v-model="status_form.subDisposition" ></v-select>
                </v-flex>



                <!-- When lead status is contact and lead disposition is appointment then
                Appointment flow section will visible and lead status flow will hide -->

                <!--
                    Appointment Flow
                    It will show when leadFlowActive == false
                 -->

                <v-flex  xs12 sm6 md6 v-show="status_form.leadFlowActive == false">
                    <v-select :items='APPOINTMENT_STATUS_LIST' label="Appointment Status" item-value="value" item-text="dispValue" v-model="status_form.appointment_status" @change="onAppointmentStatusChange"></v-select>
                </v-flex>
                <v-flex  xs12 sm6 md6 v-show="status_form.enable == false && status_form.leadFlowActive == false"></v-flex>
                <v-flex  xs12 sm6 md6 v-show="status_form.enable == true  && status_form.leadFlowActive == false">
                    <v-select :items="dispositions" label="Appointment Disposition" item-value="value" item-text="dispValue" v-model="status_form.appointment_disposition" @change="onAppointmentDispositionsChange"></v-select>
                </v-flex>
                <v-flex  xs12 sm6 md6 v-show="status_form.show_sub_dispo == true && status_form.leadFlowActive == false">
                    <v-select :items='sub_dsipositions' label="Appointment Sub-Disposition" v-model="status_form.appointment_subDisposition" ></v-select>
                </v-flex>

                <v-flex  xs12 sm6 md6 v-show="status_form.showDataTime">
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
                        v-model="status_form.appointment_date"
                        label="Pickup Start Date"
                        persistent-hint
                        prepend-icon="event"
                        @blur="date = parseDate(status_form.appointment_date)"
                    ></v-text-field>
                    <v-date-picker v-model="date" no-title @input="calender = false"></v-date-picker>
                </v-menu>
                </v-flex>
                <v-flex  xs12 sm6 md6 v-show="status_form.showDataTime">
                    <v-select prepend-icon="access_time" :items="START_TIME_LIST" label="Pickup Start Time" item-value="value" item-text="dispValue" v-model="status_form.appointment_time"></v-select>
                </v-flex>

                <v-flex  xs12 sm6 md6>
                    <v-text-field v-model="status_form.remarkFromsource" label="Remark From Source"></v-text-field>
                </v-flex>
                <v-flex  xs12 sm6 md6>
                    <v-text-field v-model="status_form.remarkFromUser" label="Remark From User"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout align-center justify-end row fill-height>
                <v-btn @click="jump('/ActivityLeadUpload')">Cancel</v-btn>
                <v-btn dark @click="onButtonPressed">{{ status_form.buttonName }}</v-btn>
                <v-btn dark @click="proceed" >Proceed</v-btn>
            </v-layout>
        </v-container>
    <!-- </v-card> -->

</template>


<script>

import {
    STATES,
    CITIES,
    APPOINTMENT_STATUS_LIST,
    START_TIME_LIST,
    CONTACT_DISPOSITIONS,
    NO_CONTACT_DISPOSITIONS,
    LEAD_STATUS_LIST, APPOINTMENT_CONVERTED,
    APPOINTMENT_SUB_DISPO,
    CALLBACK_SUB_DISPO, REN_CALLBACK,
    NOT_INTRESTED, F_WRONG_NO_DISPOSITION,
    NOT_ELIGIBLE, LEAD_RESPONSE,
    APPOINTMENT_DISPOSITION,
    FOLLOW_UP, PHONE_NOT_AVAILABLE,
    NOT_INTRESTED_APPOINTMENT_DISPOSITION, APPOINTMENT_SUB_DISPOSITION } from './data-lib'

import axios from 'axios'
import moment from 'moment'
import { required, minLength, between,email } from 'vuelidate/lib/validators'
import lead from './submitLead'
import loadChannel from '../../../common/onProjectLoad.js'

var _copy_contact_form = null;
var _copy_status_form = null;

export default {
    beforeMount() {
        // make a copy

        _copy_contact_form = JSON.parse(JSON.stringify(this.contact_form));
        _copy_status_form  = JSON.parse(JSON.stringify(this.status_form));

        // if(this.$store.state.leadDetaislData !== null){

        //     this.leadputdata = this.$store.state.leadDetaislData[0]
        //     console.log("Lead DAta store",this.leadputdata)
        // }

        this.doWhenPageLoad();
        this.affiliatefunc();
        this.campaignfunc();
        this.leadsourcefunc();
        // this.GetState();
        this.channeldataM();
        if(this.$store.state.leadputpost === 'PUT'){
            this.status_form.buttonName = 'Update';
            this.status_form.operation='PUT'
        }else{
           this.status_form.buttonName = 'Submit';
           this.status_form.operation='POST'
        }


    },
    beforeRouteLeave (to, from, next) {
        this.commitFormFieldsIntoStore();
        next();
    },

    validations: {
        contact_form: {
            firstName: { required },
            lastName: { required },
            email: { email, required },
            contactNo:{ required },
        }
    },

    created(){
        //  let state = this.$store.getters.GetLeadData[0].state
        //  console.log("state",state)
        //     this.cityfind(state);
    },

    data() {
        return {

            STATES,
            CITIES,
            APPOINTMENT_STATUS_LIST,
            START_TIME_LIST,
            LEAD_STATUS_LIST,
            dispositions: [],
            sub_dsipositions: [],
            channeldata:[],
            contact_form: {
                chanelName:'',
                firstName: '',
                lastName: '',
                email: '',
                contactNo:'',
                state: '',
                city: '',
                affiliate:'',
                leadsource:'',
                campaign:'',
                channelname:'',


            },
            channelListID:[],
            leadputdata:{},
            Affiliatelis:[],
            Leadsourcelis:[],
            campaignlis:[],
            StateListdata:[],
            Citylist:[],
            calender: false,
            Scheduledate:'',
            date: null,
            status_form: {
                leadStatus: LEAD_STATUS_LIST[0].value,
                disposition: '',
                subDisposition: '',
                appointment_status: '',
                appointment_disposition: '',
                appointment_subDisposition: '',
                remarkFromUser: '',
                leadId: '',
                remarkFromsource: '',
                appointment_date: '',
                appointment_time: '',
                operation: 'POST',
                buttonName: 'Submit',
                leadFlowActive: true,
                menu: true,
                showDataTime: false,
                enable: false,  // for disposition
                show_sub_dispo: false   // for sub-disposition,

            },
        }
    },
    computed: {
        computedDateFormatted () {
            return this.formatDate(this.date)
        },
    Firstnameerror () {
      const errors = []
      if (!this.$v.contact_form.firstName.$dirty) return errors
      !this.$v.contact_form.firstName.required && errors.push('First Name Is required.')
      return errors
    },
    Lastnameerror () {
      const errors = []
      if (!this.$v.contact_form.lastName.$dirty) return errors
      !this.$v.contact_form.lastName.required && errors.push('Last Name Is required.')
      return errors
    },
    Emailerror () {
      const errors = []
      if (!this.$v.contact_form.email.$dirty) return errors
      !this.$v.contact_form.email.required && errors.push('Email Address Is required.') || !this.$v.contact_form.email.email  && errors.push('Wrong Email Address.')
      return errors
    },
    MobileNoerror () {
      const errors = []
      if (!this.$v.contact_form.contactNo.$dirty) return errors
      !this.$v.contact_form.contactNo.required && errors.push('Mobile Number Is required.')
      return errors
    },
    },
    watch: {
        date (val) {
            this.status_form.appointment_date = this.formatDate(this.date)
        }
    },
    methods: {
        channelEvent(chanel){
            console.log('Channel Event',chanel)
        },

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
        channeldataM(){
            loadChannel.getChannel(this, res => {
                    console.log("mixin channel data" ,  res)
                    let channelalldata=[]
                    for(let i =0;i<res.length;i++){

                        if(res[i].active === 1){
                            let channetobj ={
                                text:res[i].channelName,
                                value:res[i]._id

                            }
                            this.channeldata.push(channetobj)
                            // this.channeldataall.push(channetobj)
                        }

                    }
                    // let alldata={
                    //             text:'All',
                    //             value:'all',
                    //         }

                    //     this.channeldataall.unshift(alldata)
                })
        },
        GetState(cb = null){
        this.GETSTATE(res=>{
        console.log("State",res)
                for(let i =0;i<res.length;i++){
                    let statedata={
                        text:res[i].region_data.name,
                        code:res[i].region_data.adminCode1
                    }
                    this.StateListdata.push(statedata)
                }
                cb === null ? "" : cb();

            })
            console.log(this.StateListdata,"response mixin data")
        },
        cityfind(ev,cb){
            console.log("event ", ev)
            let codes= this.StateListdata.filter(e=>{
                if(e.text === ev){
                    return e.code
                }
            })
            console.log("event filter",codes)
            this.GETCITY(codes[0].code,resp=>{
                console.log("city ", resp[0].cities)
                this.Citylist = resp[0].cities
                 cb === null ? "" : cb();
            })
        },
        proceed(){
            this.jump('/Lmaster/Ltab/personalD')
            // let tabs={
            //     link:'/Lmaster/Ltab/personalD',
            //     linkno:2
            // }
            // this.commit('LEAD_LINKS_TAB',tabs)
        },
        affiliatefunc(){
            this.GET('fetch_affiliate?filter=30',resp=>{
                let affiliatedata = resp.data.errMsg[0]
                 console.log("Appiliate response",affiliatedata)
                 for(let i = 0;i<affiliatedata.length;i++){
                     let affdetaisl ={
                         text:affiliatedata[i].name,
                         value:affiliatedata[i]._id,
                     }
                     this.Affiliatelis.push(affdetaisl)
                 }
                 console.log("Response Push Data Affiliate",this.Affiliatelis)
            })
        },
        campaignfunc(){
            this.GET('fetch_campaign_list?filter=30',resp=>{
                let Campaign = resp.data.errMsg[0]
                 console.log("campaign response",Campaign)
                 for(let i = 0;i<Campaign.length;i++){
                     let Campaigndetails ={
                         text:Campaign[i].name,
                         value:Campaign[i]._id,
                     }
                     this.campaignlis.push(Campaigndetails)
                 }
                 console.log("Response Push Data Campaign",this.campaignlis)
            })

        },
        leadsourcefunc(){
            this.GET('fetch_lead_sources?filter=30',resp=>{
                let LeadSource = resp.data.errMsg[0]
                 console.log("Lead Source",LeadSource)
                 for(let i = 0;i<LeadSource.length;i++){
                     let sourcedetails ={
                         text:LeadSource[i].name,
                         value:LeadSource[i]._id,
                     }
                     this.Leadsourcelis.push(sourcedetails)
                 }
                 console.log("Response Push Data Lead Sorce",this.Leadsourcelis)
            })

        },
        onStatusChange(event) {
            this.status_form.leadStatus = event;
            /**
             * When lead status is change then disposition dropdown will change
             * ex: if contact then it will load CONTACT_DISPOSITIONS
             */

            this.status_form.showDataTime = false;

            /**
             * Clear start time and start date when lead status are change
             */

            this.status_form.appointment_date = "";
            this.status_form.appointment_time = "";

            if (event == 'newleadentery') {

                /**
                 * Value's should be reset when status are changed
                 */

                this.status_form.enable = this.status_form.show_sub_dispo = false;
                this.status_form.disposition = this.status_form.subDisposition = '';
                this.dispositions = [];

            } else if (event == 'nocontact') {

                /**
                 * Value's should be reset when status are changed
                 */
                this.status_form.enable = true;
                this.status_form.show_sub_dispo = false;
                this.status_form.disposition = this.status_form.subDisposition = '';
                this.dispositions = NO_CONTACT_DISPOSITIONS;

            } else if (event == 'contact') {

                /**
                 * Value's should be reset when status are changed
                 */
                this.status_form.enable = true;
                this.status_form.show_sub_dispo = false;
                this.status_form.disposition = this.status_form.subDisposition = '';
                this.dispositions = CONTACT_DISPOSITIONS;
            }
        },

        /**
         * For Appointment flow
         */

        onAppointmentStatusChange(event) {

            /**
             * Here I am going to set default value event is empty
             */

            if (event == "" || event == null || event == undefined) {
                this.status_form.appointment_status = APPOINTMENT_STATUS_LIST[0].value;
            } else {
                this.status_form.appointment_status = event;
            }

            this.status_form.show_sub_dispo = false;
            this.status_form.enable = true;
            this.status_form.showDataTime = false;

            /**
             * Clear start time and start date when appointment status are change
             */

            this.status_form.appointment_date = "";
            this.status_form.appointment_time = "";

            if (this.status_form.appointment_status == 'newappointment') {

                // I am going to set value of appointment dispostion by manualy
                this.dispositions = APPOINTMENT_DISPOSITION;
                // this.status_form.showDataTime = true;
                this.status_form.appointment_disposition = APPOINTMENT_DISPOSITION[0].value;

                // this function helps to set default value to appointment sub disposition
                this.onAppointmentDispositionsChange(this.status_form.appointment_disposition);

            } else if (this.status_form.appointment_status == 'followup') {
                // this.status_form.showDataTime = true;
                this.dispositions = FOLLOW_UP;
                this.status_form.appointment_disposition = '';

            } else if (this.status_form.appointment_status == 'notintrested') {

                this.dispositions = NOT_INTRESTED_APPOINTMENT_DISPOSITION;
                this.status_form.appointment_disposition = '';

            } else if (this.status_form.appointment_status == 'notavailable') {

                this.dispositions = PHONE_NOT_AVAILABLE;
                this.status_form.appointment_disposition = PHONE_NOT_AVAILABLE[0].value;

                this.onAppointmentDispositionsChange(this.status_form.appointment_disposition);

            } else if (this.status_form.appointment_status == 'wrngnumber') {

                this.dispositions = F_WRONG_NO_DISPOSITION;
                this.status_form.appointment_disposition = F_WRONG_NO_DISPOSITION[0].value

                this.onAppointmentDispositionsChange(this.status_form.appointment_disposition);

            } else if (this.status_form.appointment_status == 'convertd') {

                this.dispositions = APPOINTMENT_CONVERTED;
                this.status_form.appointment_disposition = APPOINTMENT_CONVERTED[0].value;

                this.onAppointmentDispositionsChange(this.status_form.appointment_disposition);

            } else if (this.status_form.appointment_status == 'renewalcollected') {

                this.dispositions = REN_CALLBACK;
                this.status_form.appointment_disposition = '';
            }

            // console.log('appointment_status Value of ap : ' , this.status_form.appointment_status);
        },

        onAppointmentDispositionsChange(event) {

            this.status_form.showDataTime = false;

            if (event == 'newApptmnt') {
                this.status_form.showDataTime = true;
                setThingsAccordingToRequirments(this, APPOINTMENT_SUB_DISPOSITION._appt.newApptmnt);
                return;

            } if (event == 'metcustomer') {
                this.status_form.showDataTime = true;
                setThingsAccordingToRequirments(this, APPOINTMENT_SUB_DISPOSITION.followUp.metcustomer);
                return;

            } if (event == 'notmet') {
                this.status_form.showDataTime = true;
                setThingsAccordingToRequirments(this, APPOINTMENT_SUB_DISPOSITION.followUp.notmet);
                return;
            } if (event == 'apptDenies') {
                setThingsAccordingToRequirments(this, APPOINTMENT_SUB_DISPOSITION.N_I.apptDenies);
                return;
            } if (event == 'metFollowupNotIntrested') {
                setThingsAccordingToRequirments(this, APPOINTMENT_SUB_DISPOSITION.N_I.metFollowupNotIntrested);
                return;
            } if (event == 'phoneNtAvailble') {
                // console.log(event + '< = phoneNtAvailble  ')
                setThingsAccordingToRequirments(this, APPOINTMENT_SUB_DISPOSITION.N_A.phoneNtAvailble);
                return;
            } if (event == 'Wrong_Number') {
                setThingsAccordingToRequirments(this, APPOINTMENT_SUB_DISPOSITION.W_N.Wrong_Number);
                return;
            } if (event == 'ConvinceRenPay') {
                setThingsAccordingToRequirments(this, APPOINTMENT_SUB_DISPOSITION.Conv.leadconverted);
                return;
            } if (event == 'leadconverted') {
                setThingsAccordingToRequirments(this, APPOINTMENT_SUB_DISPOSITION.R_C.ConvinceRenPay);
                return;
            }


            /**
             * these line are common for all conditions so I have write only once
             */

            function setThingsAccordingToRequirments(self, _sub_disposition_list) {
                self.status_form.show_sub_dispo = true;
                self.sub_dsipositions = _sub_disposition_list;
                self.status_form.appointment_subDisposition = _sub_disposition_list.length > 1 ? "" : _sub_disposition_list[0];
            }
        },

        onInput(event) {
            console.log(event);
        },
        onLeadDispositionsChange(event) {
            this.status_form.disposition = event;   // lead sub disposition
            // console.log('event ', event);

            /**
             * Clear start time and start date when lead disposition are change
             */

            this.status_form.appointment_date = "";
            this.status_form.appointment_time = "";


            // This condition helps, to only execute require code
            if (this.status_form.leadStatus == 'nocontact') {

                // Regex for no contact
                var no_contact_regex = new RegExp('^(notreachable|ringingbusy|wrongnumber|invalid|switchoff)$');

                /**
                 * Genereate sub disposition with the help dispositions
                 */
                if (no_contact_regex.test(event)) {

                    /**
                     * When dispositions are matched with regex then we are going
                     * to find index to disposition element from dispositions array
                     *
                     * Note: dispositions array is a dynamic array it means its value's are change base on lead status
                     */

                    this.sub_dsipositions = [];     // clear previous value

                    try {

                        let index = this.dispositions.findIndex(element => element.value == event);
                        this.sub_dsipositions.push(this.dispositions[index].dispValue)          // We take only text not value

                        // visisble sub disposition
                        this.status_form.show_sub_dispo = true;

                        // Set default selected when only one element is there in the sub_dsipositions array.
                        // Note: sub_dsipositions array is also a dynamic

                        if (this.sub_dsipositions.length == 1) {
                            this.status_form.subDisposition = this.sub_dsipositions[0];
                        }
                    } catch(err) {
                        // console.log(err);
                    }
                }

                return;
            }

            if (this.status_form.leadStatus == 'contact') {

                this.status_form.showDataTime = false;          // by default it should be false


                // Regex for contact fields
                var contact_regex = new RegExp('^(appointment|callback|shorthangup|notinterested|nonserviceloc|noteligible)$');

                /**
                 * Generate sub disposition for contact
                 */

                if (contact_regex.test(event)) {

                    this.sub_dsipositions = [];     // clear previous value

                    try {

                        this.status_form.show_sub_dispo = true;         // visisble sub disposition

                        /**
                         *  When disposition is appointment so load appointment sub disposition from
                         * @name APPOINTMENT_SUB_DISPO
                         */

                        if (event == 'appointment') {

                            this.sub_dsipositions = APPOINTMENT_SUB_DISPO;
                            this.status_form.subDisposition = APPOINTMENT_SUB_DISPO[0];
                            this.status_form.showDataTime = true;
                            return;
                        }


                        if (event == 'callback') {

                            this.sub_dsipositions = CALLBACK_SUB_DISPO;

                            /**
                             * Note: By deafult @name subDisposition is clear beacouse @name CALLBACK_SUB_DISPO have multiple values
                             */
                            this.status_form.subDisposition = '';
                            this.status_form.showDataTime = true;
                            return;
                        }

                        if (event == 'notinterested') {
                            this.sub_dsipositions = NOT_INTRESTED;
                            this.status_form.subDisposition = '';               // Same process as callback
                            return;
                        }

                        if (event == 'noteligible') {
                            this.sub_dsipositions = NOT_ELIGIBLE;
                            this.status_form.subDisposition = '';               // Same process as callback
                            return;
                        }

                        /**
                         * Some lead sub dispositions are same as lead disposition. it mean if we select Short hang up then
                         * sub disposition should be same as disposition
                         */

                        let index = this.dispositions.findIndex(element => element.value == event);
                        this.sub_dsipositions.push(this.dispositions[index].dispValue);          // We take only text not value


                        if (this.sub_dsipositions.length == 1) {
                            this.status_form.subDisposition = this.sub_dsipositions[0];
                        }

                    } catch(err) {

                    }

                }
            }
        },
        onButtonPressed() {
            // Commit status form to the store
            this.commitFormFieldsIntoStore();

            // API hitting point of status form. Before, this function access updated store
            // then generate form data for API and hit API either POST or PUT

            let updatedStore = this.getStore('GetLeadData')[0];
            let formData = lead.generateFormDate(updatedStore);

            let self = this;

            switch(this.status_form.operation) {
                case 'POST':
                    lead.submitleaddata(this, formData, function(data, code) {
                        let _data_ = null;
                        if (Array.isArray(data.errMsg)) { _data_ = data.errMsg[0] } else { _data_ = data.errMsg }
                        // if(code === 1) {
                            //  console.log(' success dhdhfskhhksdfkdh');
                        self.status_form.leadId = _data_._id;
                        updatedStore.LeadId = _data_._id;
                        updatedStore.lead_Owner_Id = _data_.leadOwnerId;
                        updatedStore.lead_Creator_Id = _data_.leadCreatorId;
                        updatedStore.user_id = _data_.userId;

                        // console.log("Lead created new - > " , data);
                        // console.log("Lead Store new - > " , updatedStore);

                        let temp_array = [];
                        temp_array.push(updatedStore);
                        self.commit('Lead_Object', temp_array);

                        self.status_form.operation = 'PUT';
                        self.status_form.buttonName = 'Update';

                        self.showToast('Lead Created successfully', self.TOST().SUCCESS);

                        /**
                         * Form switching
                         */
                        if (self.status_form.leadStatus == 'contact' && self.status_form.leadDisposition == 'appointment') {
                            self.status_form.leadFlowActive = false;
                        }
                        // }
                    })
                break;
                case 'PUT':

                    updatedStore = this.getStore('GetLeadData')[0];
                    formData = lead.generateFormDate(updatedStore);

                    lead.updateLead(this, formData, function(data, code) {
                        if (code === "1") {
                            /**
                             *
                             * Date: 04/04/2019
                             * Form switching
                             */
                            if (self.status_form.leadStatus == 'contact' && self.status_form.leadDisposition == 'appointment') {
                                self.status_form.leadFlowActive = false;
                            }
                        }
                    });
                break;
            }
        },

        createLead(self, formData) {
            // this.showLoader('Loading', true);
            //   let store = this.getStore('GetLeadData')[0];

            // const NEW_LEAD = this.API_Service()+'addLead';

            // axios
            // .post(NEW_LEAD, formData)
            // .then(res => {

            //     /**
            //      *
            //      */
            //     lead.responseValidation(self, res.data)
            //     .then(success => {

            //         /**
            //          *
            //          */

            //         self.showToast('Lead created successfully', self.TOST().SUCCESS);
            //         // self.$router.push('/ActivityLeadUpload')
            //         self.status_form.leadId = res.data.errMsg._id;
            //         // self.status_form.operation = 'PUT';
            //         this.commit('LED_PUT_POST','PUT')
            //         self.status_form.buttonName = 'Update';

            //         /**
            //          * Form switching
            //          */
            //         if (self.status_form.leadStatus == 'contact' && self.status_form.leadDisposition == 'appointment') {
            //             self.status_form.leadFlowActive = false;
            //         }
            //     })
            //     .catch(reject => {})
            // })
            // .catch(err => {
            //     self.showToast('Something goes wrong', self.TOST().ERROR);
            //     console.log(err);
            // })
        },
        resetForms() {
            for (let props in _copy_contact_form) {
                this.contact_form[props] = _copy_contact_form[props];
            }

            for (let props in _copy_status_form) {
                this.status_form[props] = _copy_status_form[props];
            }
        },

        /**
         * @author Khan Usama
         * Date 03/04/2019
         * @description This function is called from two places first RouteLeave and the second place is on Update
         * button clicked or pressed from this form
         */
        commitFormFieldsIntoStore() {
            try {
                let store = this.getStore('GetLeadData')[0];

                let start_date = moment(this.status_form.appointment_date).valueOf();
                start_date == isNaN(start_date) ? "" : start_date;

                // Status form fields
                store.leadStatus = this.status_form.leadStatus;
                store.leadDisposition = this.status_form.disposition;
                store.leadsubDisposition = this.status_form.subDisposition;
                store.appointment_status = this.status_form.appointment_status;
                store.appointmentdisPosition = this.status_form.appointment_disposition;
                store.appointmentsubdisPosition = this.status_form.appointment_subDisposition;
                store.start_date = start_date;
                store.start_time = this.status_form.appointment_time;
                store.remarksfromUser = this.status_form.remarkFromUser;
                store.remarksfromSource = this.status_form.remarkFromsource;

                store.teamMembers = "[]";

                // Contact form and personal form
                store.firstName = this.contact_form.firstName;
                store.lastName = this.contact_form.lastName;

                store.email = this.contact_form.email;
                store.primaryMobile = this.contact_form.contactNo;
                store.state = this.contact_form.state /** For country */ ;
                store.city = this.contact_form.city;
                store.camapignName = this.contact_form.campaign;
                store.leadSource = this.contact_form.leadsource;
                store.affiliateMasterId = this.contact_form.affiliate;
                store.channelCode = this.contact_form.channelname


                let temp_array = [];
                temp_array.push(store);
                this.commit('Lead_Object', temp_array);
            } catch (err) {

            }

        },



        /**
         * This is used when data comes form API or store, on page load so we need to perform some activity
         *
         * Rule One: When Lead status = contact and lead disposition = appointment then appointment follow will activate
         * and lead status flow will disble but value's of lead status and lead disposition and sub dispositons are remains
         * Note: Please do not remove or replace with another values
         *
         * Also, when appointment flow activate then all fields are change
         * eg: lead status = appointment status
         * lead disposition = Appointment disposition
         * Lead sub disposition  = Appointment sub dispositions
         */

        doWhenPageLoad() {
            // initializing data or set data to fields
            this.resetForms();
            // var setData = this.$store.getters.getLeadResponse;
            var setData = this.$store.getters.GetLeadData;


            console.log('Store : ', setData );

            if (setData == null || setData == "" || setData == undefined || setData.length == 0 ) {
                // not do any thing
            } else {
                // Contact Details
                this.contact_form.channelname = setData[0].channelCode;
                this.contact_form.firstName = setData[0].firstName;
                this.contact_form.lastName = setData[0].lastName;
                this.contact_form.email = setData[0].email;
                this.contact_form.contactNo = setData[0].primaryMobile;
                this.contact_form.state = setData[0].state;
                this.contact_form.city = setData[0].city;
                this.contact_form.affiliate = setData[0].affiliateMasterId
                this.contact_form.leadsource = setData[0].leadSource
                this.contact_form.campaign = setData[0].camapignName

                let self = this
                this.GetState(() => {
                    self.cityfind(self.contact_form.state, function() {
                        self.contact_form.city = setData[0].city
                    })
                });



                // console.log("DAta Store PUT")

                this.status_form.operation = this.$store.state.leadputpost;
                if(this.$store.state.leadputpost == 'PUT'){
                    this.status_form.buttonName = 'Update';
                }else if(this.$store.state.leadputpost == 'POST'){
                    this.status_form.buttonName = 'Submit';
                }

                /**
                 * I am validating, which flow should be enable and which is disable
                 */

                if (setData[0].leadStatus === 'contact' && setData[0].leadDisposition === 'appointment') {

                    /**
                     * When this condition is true do important things here, form
                     * switching Status form to Appointment form
                     */
                    this.status_form.leadFlowActive = false;

                    // Then call onAppointmentStatusChange function and pass appointment_status as an arguments

                    if (setData[0].appointment_status == "") {
                        this.onAppointmentStatusChange(setData[0].appointment_status);
                    } else {
                        this.onAppointmentStatusChange(setData[0].appointment_status);

                        this.status_form.appointment_disposition = setData[0].appointmentdisPosition;
                        this.onAppointmentDispositionsChange(this.status_form.appointment_disposition);

                        /**
                         * On page load we have to set appointment sub dispositons
                         */

                        this.status_form.appointment_subDisposition = setData[0].appointmentsubdisPosition
                    }

                } else {

                    /**
                     * I have called @function onStatusChange here, because some functionality
                     * is works when I call onStatusChange function here and pass status as an arguments
                     */

                    this.onStatusChange(setData[0].leadStatus);

                    this.status_form.disposition = setData[0].leadDisposition

                    // same as before
                    this.onLeadDispositionsChange(this.status_form.disposition);

                    this.status_form.subDisposition = setData[0].leadsubDisposition;
                }

                this.status_form.leadId = setData[0]._id
                this.status_form.remarkFromUser = setData[0].remarksfromUser
                this.status_form.remarkFromsource = setData[0].remarksfromSource

                /**
                 *
                 */

                if (setData.length > 1) {
                    this.status_form.appointment_date = moment(setData[1].start_date).format('L');
                    this.status_form.appointment_time = setData[1].start_time.toString();

                    console.log("this.status_form.appointment_date " + this.status_form.appointment_date);
                    console.log("this.status_form.appointment_time " + this.status_form.appointment_time);
                }

            }
        }
    }
}
</script>
