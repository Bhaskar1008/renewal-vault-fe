
<template>

    <div >

        <v-card class="mrg"   flat>
            <p class="titletop">Existing Details</p>

        <v-container fluid>

            <v-flex>
                    <p style="font-family:roboto; font-weight:700; font-size:18px; margin-bottom:-1px;">Have Life Insurance ?</p>
                    <div class="textfields" style="align-items:center;">
                            <v-flex style="" xs4 sm5 mt-2 ml-1>
                                        <v-switch  label="No / Yes" v-model="lifeinsswitch" @change="scrolldown"></v-switch>
                            </v-flex>
                            <v-flex xs4 sm5>
                            </v-flex>
                    </div>

                   <v-card v-if="showfields === true" flat>
                       <v-btn color="info"  @click="opendialoge"> <v-icon left> account_circle</v-icon> Add Insurance Details </v-btn>
                <v-dialog v-model="dialog"   width="650" >
                    <v-card >
          <v-toolbar dark color="black">
          <v-toolbar-title>Insured Details</v-toolbar-title>
        </v-toolbar>

          <v-container fluid>
             <div class="textfields">
                    <v-flex   xs4 sm5>
                        <v-select
                            :items="ins"
                            color="#00ACC1"
                            v-model="insurancename"
                             placeholder="Select"
                            label="Insurer "
                            required
                        ></v-select>
                    </v-flex>

                    <v-flex  xs4 sm5 >
                         <v-text-field v-model="sumassured" type="number" label="Sum Assured" > </v-text-field>
                    </v-flex>
              </div>

                 <div class="textfields">
                    <v-flex   xs4 sm5>
                            <v-select
                                :items="policytype"
                                color="#00ACC1"
                                v-model="policyname"
                                placeholder="Select"
                                label="Select Policy Type"
                                required
                            ></v-select>

                        </v-flex>

                    <v-flex   xs4 sm5>
                        <v-select
                            :items="statPolicy"
                            color="#00ACC1"
                            v-model="statpolicyname"
                            @change="showliferiskcommen"
                            placeholder="Select"
                            label="Select Policy Status"
                            required
                        ></v-select>

                    </v-flex>

              </div>

              <div class="textfields">
                   <v-flex  xs4 sm5 >
                         <v-text-field v-model="policynum" type="number" label="Policy Number" >r</v-text-field>
                    </v-flex>
                    <v-flex v-if="liferiskcondition === true"   xs4 sm5>
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
                        v-model="computedliferiskcomm"
                        label="Risk Commencement Date"
                        persistent-hint
                        prepend-icon="event"
                        @blur="liferisk = parseDate(lifriskcommit)"
                    ></v-text-field>
                    <v-date-picker v-model="liferisk" no-title @input="calender = false"></v-date-picker>
                </v-menu>

                    </v-flex>
                    <v-flex  v-if="Applieddateshow=== true"  xs4 sm5>
                        <v-menu
                        ref="calender"
                        :close-on-content-click="false"
                        v-model="calender4"
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
                        v-model="computedapplicationdate"
                        label="Application Date"
                        persistent-hint
                        prepend-icon="event"
                        @blur="applicatdate = parseDate(lifeappdate)"
                    ></v-text-field>
                    <v-date-picker v-model="applicatdate" no-title @input="calender4 = false"></v-date-picker>
                </v-menu>

                    </v-flex>

              </div>

              <div>
                   <v-layout class="btnm" align-center justify-end row fill-height>
                   <v-btn   color="#F5F5F5" @click="dialog = false" light> Cancel <v-icon right>cancel</v-icon></v-btn>
                   <v-btn   color="black" dark @click="saveupdatelife">  {{btnNema}} <v-icon right>save</v-icon></v-btn>
              </v-layout>
              </div>


          </v-container>


        </v-card>
        </v-dialog>
        <v-flex v-if="lifeinsdata.length !== 0"  md12  mt-3 >
                        <h3 class="text-xs-center mb-3">life Insurance Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="lifeinsdata"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">

                            <td class="">{{props.item.Insurer }}</td>
                            <td class="">{{props.item.sum_Assured}}</td>
                            <td class="">{{props.item.policy_Type}}</td>
                            <td class="">{{props.item.policy_Status}}</td>
                            <td class="">{{props.item.Comencedate === null || props.item.Comencedate === "" ||props.item.Comencedate === undefined ? "" : moment(props.item.Comencedate).format('MM/DD/YYYY')}}</td>
                            <td class="">{{props.item.Appdate === null || props.item.Appdate === "" || props.item.Appdate === undefined ? "" : moment(props.item.Appdate).format('MM/DD/YYYY')}}</td>
                           <td class="">{{props.item.policynumber}}</td>
                            <td class="">
                                <v-icon small class="mr-2" @click="lifeeditdetails(props.item,props.index)">edit</v-icon>

                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>

            </v-card>

        </v-flex>




        <v-flex mt-5>
                    <p style="font-family:roboto; font-weight:700; font-size:18px; margin-bottom:-1px; color:#78909C">Have Health  Insurance ?</p>
                    <div class="textfields" style="align-items:center;">
                            <v-flex style="" xs4 sm5 mt-2 ml-1>
                                        <v-switch v-model="healthinsswitch"  label="No / Yes" @change="healthinsurepopup"></v-switch>
                            </v-flex>
                            <v-flex xs4 sm5>
                            </v-flex>
                    </div>

                   <v-card v-show="showhealth === true" flat>
                        <v-btn class="mb-5" color="info"  @click="healthdilogeopen"> <v-icon left> account_circle</v-icon> Add Insurance Details </v-btn>
                    <v-dialog
                        v-model="dialoghealth" width="650" >
      <v-card >
          <v-toolbar dark color="black">
          <v-toolbar-title>Insured Details</v-toolbar-title>
        </v-toolbar>

          <v-container fluid>
             <div class="textfields">
                    <v-flex   xs4 sm5>
                        <v-select
                            :items="relation"
                            color="#00ACC1"
                            v-model="memberType"
                             placeholder="Select"
                            label="Select Relation"
                            required
                        ></v-select>
                    </v-flex>

                    <v-flex  xs4 sm5 >
                        <v-text-field
                            clearable
                            color="#00ACC1"
                            v-model="memberName"
                            label="Name"
                            required
                            ></v-text-field>
                    </v-flex>
              </div>

                 <div class="textfields">
                     <v-flex   xs4 sm5>
                        <v-menu
                        ref="calender"
                        :close-on-content-click="false"
                        v-model="calender1"
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
                        v-model="DateofBirth"
                        label="Date of Birth"
                        persistent-hint
                        prepend-icon="event"
                        @blur="datebirth = parseDate(DateofBirth)"
                    ></v-text-field>
                    <v-date-picker v-model="datebirth" no-title @input="calender1 = false"></v-date-picker>
                </v-menu>

                    </v-flex>


                    <v-flex   xs4 sm5>
                        <v-select
                            :items="plantype"
                            color="#00ACC1"
                            placeholder="Select"
                            v-model="planType"
                            label="Types of Plan"
                            required
                        ></v-select>

                    </v-flex>

              </div>

              <div class="textfields">
                   <v-flex  xs4 sm5 >
                         <v-text-field v-model="sumInsured" type="number" label="Sum Insured" >r</v-text-field>
                    </v-flex>
                   <v-flex   xs4 sm5>
                        <v-menu
                        ref="calender"
                        :close-on-content-click="false"
                        v-model="calender2"
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
                        v-model="riskcommencement"
                        label="Risk Commencement Date"
                        persistent-hint
                        prepend-icon="event"
                        @blur="datecommece = parseDate(riskcommencement)"
                    ></v-text-field>
                    <v-date-picker v-model="datecommece" no-title @input="calender2 = false"></v-date-picker>
                </v-menu>

                    </v-flex>
              </div>

              <div>

                  <v-flex>
                    <div class="textfields" style="align-items:center;">
                    <v-flex mt-3>
                    <p style="font-family:roboto; font-weight:400; font-size:13px; font-color:#ECEFF1; letter-spacing:0.6px; opacity:0.6">Is Insured suffering from any chronic disease ?</p>
                    </v-flex>
                    <v-flex style="" xs4 sm4 mt-2 ml-1>


                                <v-switch v-model="InsurDisease"  label="No / Yes" @change="chronic"></v-switch>

                  </v-flex>


        </div>

            <v-card flat>
                        <v-flex  xs4 sm5 v-if="txtchronic === true">
                                <v-text-field
                            clearable
                            color="#00ACC1"
                            label="Enter Details"
                            v-model="desDescript"
                            required
                            ></v-text-field>
                        </v-flex>

            </v-card>


        </v-flex>

              </div>

              <div>
                   <v-layout class="btnm" align-center justify-end row fill-height>
                   <v-btn   color="#F5F5F5" @click="cancle" light> Cancel <v-icon right>cancel</v-icon></v-btn>
                   <v-btn   color="black" dark @click="saveupdateHelth">  {{btnNemaHelth}} <v-icon right>save</v-icon></v-btn>
              </v-layout>
              </div>


      </v-container>

        </v-card>
        </v-dialog>
        <v-flex v-if="healthinsdata.length !== 0"  md12  mt-3 mb-3>
                        <h3 class="text-xs-center mb-3">Health Insurance Details</h3>
                        <v-data-table
                        :headers="headersHealth"
                        :items="healthinsdata"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">

                            <td class="">{{props.item.SelectRelation }}</td>
                            <td class="">{{props.item.Name}}</td>
                            <td class="">{{props.item.DateofBirth === null || props.item.DateofBirth === "" || props.item.DateofBirth === undefined ? "" : moment(props.item.DateofBirth).format('MM/DD/YYYY')}}</td>
                            <td class="">{{props.item.planName}}</td>
                            <td class="">{{props.item.sumInsured}}</td>
                            <td class="">{{props.item.riskDate === null || props.item.riskDate === "" || props.item.riskDate === undefined ? "" : moment(props.item.riskDate).format('MM/DD/YYYY')}}</td>
                           <td class="">{{props.item.IsInsuredsufferingfromanychronicdisease}}</td>
                            <td class="">
                                <v-icon small class="mr-2" @click="editHealtIns(props.item,props.index)">edit</v-icon>

                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>

            </v-card>
        </v-flex>







              <!-- <v-layout class="btnm " align-center justify-space-between row fill-height>

                   <v-btn    color="#F5F5F5"  light @click="previous">Previous</v-btn>

                   <v-btn   color="black" @click="next" dark>Proceed</v-btn>

              </v-layout> -->
              <v-layout>
                <v-layout>
                    <v-btn color="#F5F5F5" light @click="previous">Previous</v-btn>
                </v-layout>
              <v-layout class="btnm" align-center style="justify-content:center" row fill-height>
                   
                   <v-btn @click="updateLead" v-if="$store.state.leadputpost === 'PUT'" color="black" dark>Update</v-btn>
                   <v-btn @click="next" color="black" dark>Proceed</v-btn>
              </v-layout>
            </v-layout>

      </v-container>



        </v-card>

    </div>

</template>

<script>
import moment from 'moment';
import lead from '../../Page/ActivityUpload/leadCreate/submitLead'
export default {

    created() {
        this.leaddata = this.getStore('GetLeadData')[0];

        this.lifeinsswitch = this.leaddata.HaveLifeInsurance.ExistInsur === "Yes" ? true : false;
        this.scrolldown(this.lifeinsswitch);
        this.healthinsswitch = this.leaddata.HaveLifeInsurance.ExistHealthInsur === "Yes" ? true : false;
        this.healthinsurepopup(this.healthinsswitch);

        if (this.leaddata.HaveLifeInsurance_details === "" || this.leaddata.HaveLifeInsurance_details === null
        || this.leaddata.HaveLifeInsurance_details === undefined) {
            this.lifeinsdata = []
        } else {
            this.lifeinsdata = JSON.parse(this.leaddata.HaveLifeInsurance_details);
        }
        if (this.leaddata.Insurancedetails === "" || this.leaddata.Insurancedetails === null || this.leaddata.Insurancedetails === undefined) {
            this.healthinsdata = [];
        } else {
            this.healthinsdata = JSON.parse(this.leaddata.Insurancedetails);
        }
    },
    beforeRouteLeave(to, from, next) {
        this.proceed();
        next();
    },
    computed: {
        computedliferiskcomm() {
            return this.formatDate(this.liferisk)
        },
        computeddateofbirth() {
            return this.formatDate(this.datebirth)
        },
        computeddateofcommencehealth() {
            return this.formatDate(this.datecommece)
        },
        computedapplicationdate() {
            return this.formatDate(this.applicatdate)
        }
    },

    data() {
        return {
            moment,
            lifeappdate: null,
            calender4: false,
            applicatdate: null,
            Applieddateshow: false,
            headers: [{
                    text: 'Insurer',
                    value: 'Insurer'
                },
                {
                    text: 'Sum Assured',
                    value: 'sumassured'
                },
                {
                    text: 'Policy Type',
                    value: 'policytype'
                },
                {
                    text: 'Policy Status',
                    value: 'policystatus'
                },
                {
                    text: 'Risk Commencement Date',
                    value: 'riskdate'
                },
                {
                    text: 'Application Date',
                    value: 'applicationdate'
                },
                {
                    text: 'Policy Number',
                    value: 'policynumber'
                },
                {
                    text: 'Action',
                    value: 'action',
                    sortable: false
                }
            ],

            headersHealth: [{
                    text: 'Relation',
                    value: 'Relation'
                },
                {
                    text: 'Name',
                    value: 'Name'
                },
                {
                    text: 'Date of Birth',
                    value: 'policytype'
                },
                {
                    text: 'Plan Name',
                    value: 'policystatus'
                },
                {
                    text: 'Sum Insured',
                    value: 'applicationdate'
                },
                {
                    text: 'Risk Commencement Date',
                    value: 'riskdate'
                },
                {
                    text: 'Any Chronic Disease',
                    value: 'disease'
                },
                {
                    text: 'Action',
                    value: 'action',
                    sortable: false
                }
            ],

            popupone: false,
            ins: ["Reliance", "LIC", "ICICI Preduential", "HDFC-Life", "Edelweiss", "Religare"],
            plantype: ["Individual", "Family Floater"],
            statPolicy: ["Inforce", "Applied", "Declined"],
            txtchronic: false,
            showhealth: false,
            insurancename: '',
            statpolicyname: '',
            healthupdateind: null,
            policyname: '',
            indlifdata: null,
            btnNema: '',
            policynum: '',
            planType: '',
            sumInsured: '',
            desDescript: '',
            liferisk: null,
            lifriskcommit: null,
            foo: '',
            calender: false,
            memberType: '',
            memberName: '',
            InsurDisease: false,
            lifeinsdata: [],
            healthinsdata: [],
            sumassured: '',
            btnNemaHelth: '',
            leaddata: {},
            calender1: false,
            calender2: false,
            lifeinsswitch: false,
            riskcommencement: null,
            healthinsswitch: false,
            DateofBirth: '',
            datebirth: null,
            datecommece: null,
            policytype: ["Endowment Plans", "Whole Life Policy", "Money Back Policy", "Term Plan", "Individual/FamilyFloater"],
            dialog: false,
            dialoghealth: false,
            showfields: false,
            relation: ["Father", "Mother", "Brother", "Sister"],
            protype: ["Salaried-Govt./ PSU", "Salaried-Other", "Self-Employed professional", "Retired", "Student", "Housewife", "Part-time Business"],
            City: ["Mumbai", "Chennai", "Kanpur", "Ahemdabad", "Bhopal"],
        }
    },
    methods: {
        scrolldown(e) {
            console.log("hello im event", e)
            if (e === true) {
                this.showfields = true
            } else {
                this.showfields = false
            }


        },
        cancle() {
            this.dialoghealth = false
            this.calender1 = false
            this.calender2 = false
        },
        opendialoge() {

            this.dialog = true
            this.btnNema = 'Save'
            this.insurancename = ""
            this.sumassured = ""
            this.policyname = ""
            this.statpolicyname = ""
            this.policynum = ""
            this.liferisk = ""
            this.applicatdate = ""
            this.Applieddateshow = false
            this.liferiskcondition = false

        },
        healthdilogeopen() {
            this.btnNemaHelth = "Save"
            this.dialoghealth = true
            this.memberType = ""
            this.memberName = ""
            this.DateofBirth = null
            this.InsurDisease = false
            this.txtchronic = false
            this.desDescript = ""
            this.planType = ""
            this.sumInsured = ""
            this.riskcommencement = null
        },

        healthinsurepopup(e) {
            if (e === true) {
                this.showhealth = true
            } else {
                this.showhealth = false
            }
        },
        chronic(e) {
            if (e === true) {
                this.txtchronic = true
            } else {
                this.txtchronic = false
            }
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },



        makeid() {
            var text = "";
            var possible = "0123456789abcdefghijklmnopqrstuvwxyz";
            for (var i = 0; i < 6; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },
        havelifeins() {
            let d_struct = {
                id: 'insu' + this.makeid(),
                Insurer: this.insurancename,
                sum_Assured: this.sumassured,
                policy_Type: this.policyname, // used for select policy type
                policy_Status: this.statpolicyname,
                policynumber: this.policynum,
                Comencedate: this.liferisk,
                Appdate: this.applicatdate,


            }
            console.log(typeof(this.lifeinsdata))
            //   let lifeinsdata=[]
            this.lifeinsdata.push(d_struct)
            console.log("life insurance data", this.lifeinsdata)
            this.dialog = false
        },

        havehealthins() {
            let switchisurdicese = ""
            if (this.InsurDisease === true) {
                switchisurdicese = "Yes"
            } else {
                switchisurdicese = "No"
            }
            let d_struct = {
                id: 'insu' + this.makeid(),
                SelectRelation: this.memberType,
                Name: this.doSentenceCase(this.memberName),
                DateofBirth: moment(this.DateofBirth).valueOf(),
                IsInsuredsufferingfromanychronicdisease: switchisurdicese,
                Description: this.desDescript,
                planName: this.planType,
                sumInsured: this.sumInsured,
                riskDate: moment(this.riskcommencement).valueOf()
            }
            this.healthinsdata.push(d_struct)
            this.dialoghealth = false
        },
        proceed() {

            let existing_data = JSON.parse(JSON.stringify(this.leaddata));

            let switchdata = this.lifeinsswitch === true ? "Yes" : "No";
            let switchhealthdata = this.healthinsswitch === true ? "Yes" : "No";

            existing_data.HaveLifeInsurance = {
                ExistInsur: switchdata,
                ExistHealthInsur: switchhealthdata,
            };
            existing_data.Insurancedetails = JSON.stringify(this.healthinsdata);
            existing_data.HaveLifeInsurance_details = JSON.stringify(this.lifeinsdata);

            let temp_arr = [];
            temp_arr.push(existing_data);
            this.commit('Lead_Object', temp_arr);
        },
        next() {
            this.$router.push('/Lmaster/Ltab/proposedD')
        },
        previous() {
            this.jump('/Lmaster/Ltab/proD')
        },
        showliferiskcommen(e) {
            console.log("life event", e)

            if (e === 'Inforce') {
                this.liferiskcondition = true
                this.Applieddateshow = false
            } else if (e === 'Applied' || e === 'Declined') {
                this.Applieddateshow = true
                this.liferiskcondition = false
            }

        },
        lifeeditdetails(e, ind) {
            console.log("ind", ind, "Event Data", e)
            this.indlifdata = ind
            this.dialog = true
            this.btnNema = 'Update'
            this.insurancename = e.Insurer
            this.sumassured = e.sum_Assured
            this.policyname = e.policy_Type
            this.statpolicyname = e.policy_Status
            this.policynum = e.policynumber
            this.liferisk = e.Comencedate
            this.applicatdate = e.Appdate
            if (e.Appdate === "") {
                this.Applieddateshow = false
            } else {
                this.Applieddateshow = true
            }
            if (e.Comencedate === "") {
                this.liferiskcondition = false
            } else {
                this.liferiskcondition = true
            }
        },
        udatelifedata() {
            this.lifeinsdata[this.indlifdata].Insurer = this.insurancename
            this.lifeinsdata[this.indlifdata].sum_Assured = this.sumassured
            this.lifeinsdata[this.indlifdata].policy_Type = this.policyname
            this.lifeinsdata[this.indlifdata].policy_Status = this.statpolicyname
            this.lifeinsdata[this.indlifdata].policynumber = this.policynum


            if (this.statpolicyname === "Inforce") {

                this.lifeinsdata[this.indlifdata].Comencedate = this.liferisk
            } else {
                this.lifeinsdata[this.indlifdata].Comencedate = ""
            }
            if (this.statpolicyname === "Applied" || this.statpolicyname === "Declined") {

                this.lifeinsdata[this.indlifdata].Appdate = this.applicatdate
            } else {
                this.lifeinsdata[this.indlifdata].Appdate = ""
            }
            this.dialog = false

        },
        saveupdatelife() {
            if (this.btnNema === 'Update') {
                this.udatelifedata();
            } else if (this.btnNema === 'Save') {
                this.havelifeins()
            }

        },

        editHealtIns(e, ind) {
            console.log("Ind", ind, "Event Data health", e)
            this.healthupdateind = ind
            this.dialoghealth = true
            this.btnNemaHelth = "Update"
            this.memberType = e.SelectRelation
            this.memberName = e.Name
            this.DateofBirth = moment(e.DateofBirth).format('MM/DD/YYYY')
            this.desDescript = e.Description
            this.planType = e.planName
            this.sumInsured = e.sumInsured
            this.riskcommencement = moment(e.riskDate).format('MM/DD/YYYY')
            if (e.IsInsuredsufferingfromanychronicdisease === 'Yes') {
                this.InsurDisease = true
                this.chronic(this.InsurDisease)
            } else {
                this.InsurDisease = false
                this.chronic(this.InsurDisease)
            }


        },
        UpdateHelth() {


            this.healthinsdata[this.healthupdateind].SelectRelation = this.memberType
            this.healthinsdata[this.healthupdateind].Namem = this.memberName
            this.healthinsdata[this.healthupdateind].DateofBirth = this.DateofBirth
            this.healthinsdata[this.healthupdateind].Description = this.desDescript
            this.healthinsdata[this.healthupdateind].planName = this.planType
            this.healthinsdata[this.healthupdateind].sumInsured = this.sumInsured
            this.healthinsdata[this.healthupdateind].riskDate = this.riskcommencement
            if (this.InsurDisease === true) {
                this.healthinsdata[this.healthupdateind].IsInsuredsufferingfromanychronicdisease = 'Yes'
            } else {
                this.healthinsdata[this.healthupdateind].IsInsuredsufferingfromanychronicdisease = 'No'
            }
            this.dialoghealth = false


        },
        saveupdateHelth() {
            if (this.btnNemaHelth === 'Update') {
                this.UpdateHelth();
            } else if (this.btnNemaHelth === 'Save') {
                this.havehealthins()
            }

        },

    updateLead() {
        this.proceed();
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
      liferisk (val) {
        this.lifriskcommit = this.formatDate(this.liferisk)
      },
      datebirth (val) {
        this.DateofBirth = this.formatDate(this.datebirth)
      },
      datecommece (val) {
        this.riskcommencement = this.formatDate(this.datecommece)
      },
      applicatdate (val) {
        this.lifeappdate = this.formatDate(this.applicatdate)
      }

    },
}
</script>

<style>

.titletop{
    margin-top:10px;
    font-family: roboto;
    font-weight:700;
    font-size:16px;
}

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
    justify-content: space-between;
    /* align-items: center; */
}

.textfields2{
     margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    /* border:1px dotted blue; */
    justify-content: space-between;
    /* align-items: center; */
    /* margin-left:50px; */
}

.textfields3{
     margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    /* border:1px dotted blue; */
    justify-content: space-between;
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




