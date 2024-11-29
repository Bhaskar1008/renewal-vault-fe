<template>

    <div>
             <div id="toform" ></div>

        <v-card class="mrg" flat>
            <p class="titletop">Contact Details</p>

             <v-container fluid>

               <div class="textfields">
                <v-flex xs4 sm5 >
                    <v-text-field
                    clearable
                    color="#00ACC1"
                    label="Address Line 1"
                    v-model="Address1"
                    required

                    ></v-text-field>
                </v-flex>
                 <!-- <v-spacer> </v-spacer> -->
                <v-flex xs4 sm5 >
                    <v-text-field
                    clearable
                    color="#00ACC1"
                    label="Address Line 2"
                     v-model="Address2"
                    required
                    ></v-text-field>
                </v-flex>

              </div>

              <div class="textfields">

                    <v-flex   xs4 sm5>
                        <v-text-field
                            clearable
                            color="#00ACC1"
                            label="Landmark"
                            placeholder="Landmark"
                             v-model="landmark"
                            required
                            ></v-text-field>

                    </v-flex>

                    <v-flex xs4 sm5  >
                         <v-select
                            :items="Country"
                            autocomplete
                            color="#00ACC1"
                            label="Country"
                             v-model="countryname"
                            required
                        ></v-select>
                    </v-flex>
              </div>

                 <div class="textfields">

                    <v-flex xs4 sm5>
                        <v-select

                            autocomplete
                            color="#00ACC1"
                            :items='StateListdata' item-text="text"
                            label="State" @change="cityfind(statename , null)"
                             v-model="statename"
                            required
                        ></v-select>

                    </v-flex>

                    <v-flex  xs4 sm5  >
                         <v-select
                            :items="Citylist" label="City" item-text="name"
                            autocomplete
                            color="#00ACC1"
                             v-model="cityname"
                            required
                        ></v-select>
                    </v-flex>
              </div>

               <div class="textfields">
                        <v-flex xs4 sm5 >
                            <v-text-field
                            clearable
                            color="#00ACC1"
                            label="Pin Code"
                             v-model="pincode"
                            required
                            ></v-text-field>
                        </v-flex>
                 <!-- <v-spacer> </v-spacer> -->
                        <v-flex xs4 sm5>
                            <v-text-field
                            clearable
                            color="#00ACC1"
                            mask="phone"
                            label="Primary Mobile"
                             v-model="primarymobile"
                            required
                            ></v-text-field>
                        </v-flex>

              </div>

               <div class="textfields">
                <v-flex xs4 sm5 >
                    <v-text-field
                    clearable
                    color="#00ACC1"
                    mask="phone"
                    label="Alternative Mobile"
                     v-model="alternatnumber"
                    required
                    ></v-text-field>
                </v-flex>
                 <!-- <v-spacer> </v-spacer> -->
                <v-flex xs4 sm5>
                    <v-text-field
                    clearable
                    mask="phone"
                    color="#00ACC1"
                    label="Landline No."
                     v-model="landlineno"
                    required
                    ></v-text-field>
                </v-flex>

              </div>

               <div class="textfields">
                <v-flex xs4 sm5 >
                    <v-text-field
                    clearable
                    color="#00ACC1"
                    label="Social Security (Aadhaar No.)"
                     v-model="aadharno"
                    required
                    ></v-text-field>
                </v-flex>
                 <!-- <v-spacer> </v-spacer> -->
                <v-flex xs4 sm5>
                    <v-text-field
                    clearable
                    color="#00ACC1"
                    label="Email Address"
                     v-model="emailaddress"
                    required
                    ></v-text-field>
                </v-flex>

        </div>

        <v-flex>
            <p style="font-family:roboto; font-weight:700; font-size:18px; margin-bottom:-1px;">Mailing Address</p>
            <div class="textfields" style="align-items:center;">
            <v-flex>
             <p style="font-family:roboto; font-weight:400; font-size:13px; font-color:#ECEFF1; letter-spacing:0.6px; opacity:0.6">Is this your permenant mailing address?</p>
            </v-flex>
            <v-flex style="" xs4 sm4 mt-2 ml-1>


                        <v-switch v-model="mailingaddressswitch" label="Yes / No" @change="scrolldown"></v-switch>

                    </v-flex>
        </div>
        </v-flex>

            <v-card  flat v-show="showfields">

                  <div class="textfields">
                <v-flex xs4 sm5 >
                    <v-text-field
                    clearable
                    color="#00ACC1"
                    label="Address Line 1"
                     v-model="subaddress1"
                    required
                    ></v-text-field>
                </v-flex>
                 <!-- <v-spacer> </v-spacer> -->
                <v-flex xs4 sm5 >
                    <v-text-field
                    clearable
                    color="#00ACC1"
                    label="Address Line 2"
                     v-model="subaddress2"
                    required
                    ></v-text-field>
                </v-flex>

              </div>

              <div class="textfields">

                    <v-flex   xs4 sm5>
                        <v-text-field
                            clearable
                            color="#00ACC1"
                            label="Landmark"
                            placeholder="Landmark"
                             v-model="sublandmark"
                            required
                            ></v-text-field>

                    </v-flex>

                    <v-flex  xs4 sm5 >
                         <v-select
                            :items="Country"
                            autocomplete
                            color="#00ACC1"
                            label="Country"
                             v-model="subcountry"
                            required
                        ></v-select>
                    </v-flex>
              </div>

                 <div class="textfields">

                    <v-flex   xs4 sm5>
                        <v-select
                            :items='StateListdatamailing' item-text="text"
                            label="State" @change="cityfindmailing(substate , null)"
                            autocomplete
                            color="#00ACC1"

                             v-model="substate"
                            required
                        ></v-select>

                    </v-flex>

                    <v-flex  xs4 sm5 >
                         <v-select
                            :items="Citylistmailing"
                            autocomplete
                            color="#00ACC1"
                            item-text="name"
                            label="City"
                             v-model="subcity"
                            required
                        ></v-select>
                    </v-flex>
              </div>

               <div class="textfields" >
                        <v-flex xs4 sm5 >
                            <v-text-field
                            clearable
                            color="#00ACC1"
                            label="Pin Code"
                             v-model="subpin"
                            required
                            ></v-text-field>
                        </v-flex>
                 <!-- <v-spacer> </v-spacer> -->
                        <v-flex xs4 sm5 >

                        </v-flex>

              </div>

            </v-card>
              <!-- <v-layout class="btnm" align-center justify-space-between row fill-height>
                   <v-btn  color="#F5F5F5" light @click="previous">Previous</v-btn>
                   <v-btn color="black" @click="next" dark>Proceed</v-btn>
              </v-layout> -->

              <v-layout>
                <v-layout>
                    <v-btn color="#F5F5F5" light @click="previous">Previous</v-btn>
                </v-layout>
              <v-layout class="btnm" align-center style="justify-content:flex-end" row fill-height>

                   <v-btn @click="updateLead" v-if="$store.state.leadputpost === 'PUT'" color="black" dark>Update</v-btn>
                   <v-btn @click="next" color="black" dark>Proceed</v-btn>
              </v-layout>
            </v-layout>
              <div id="toform" ></div>

      </v-container>


        </v-card>

    </div>

</template>

<script>
import {
    STATES,
    CITIES, } from '../../Page/ActivityUpload/leadCreate/data-lib.js'
import moment from 'moment'
import lead from '../../Page/ActivityUpload/leadCreate/submitLead'

export default {
    created(){
        this.leaddata = this.getStore('GetLeadData')[0];

        if (this.leaddata.mailingAddressStatus ==="Yes"){
            this.mailingaddressswitch = true
            this.scrolldown(this.mailingaddressswitch)
        } else{
            this.mailingaddressswitch = false
            this.scrolldown(this.mailingaddressswitch)
        }

        console.log("Lead DEtails", this.leaddata);

        this.Address1 = this.leaddata.line1
        this.Address2 = this.leaddata.line2
        this.landmark = this.leaddata.line3
        this.countryname = this.leaddata.country
        this.statename = this.leaddata.state
        this.cityname = this.leaddata.city
        this.pincode = this.leaddata.pincode
        this.primarymobile = this.leaddata.primaryMobile
        this.alternatnumber  =  this.leaddata.secondaryMobile
        this.landlineno =  this.leaddata.landlineNo
        this.aadharno = this.leaddata.socialSecurityAdharNo
        this.emailaddress = this.leaddata.email

        let mailingAddressSecond = JSON.parse(this.leaddata.mailingAddressSecond);

        this.subaddress1 = mailingAddressSecond.mailingaddress.line1
        this.subaddress2 = mailingAddressSecond.mailingaddress.line2
        this.sublandmark = mailingAddressSecond.mailingaddress.line3
        this.subcountry = mailingAddressSecond.country
        this.substate = mailingAddressSecond.state
        this.subcity = mailingAddressSecond.city
        this.subpin = mailingAddressSecond.pincode

        let self = this
            this.GetState(() => {
                self.cityfind(self.statename, function() {
                    self.cityname = this.leaddata.city
                })
            });

            // if(this.mailingaddressswitch === true && this.leaddata.mailingAddressStatus ==="Yes"){
                // let self = this
            this.GetStatemailing(() => {
                self.cityfindmailing(self.substate, function() {
                    self.subcity = mailingAddressSecond.city
                })
            });
            // }
    },
    beforeRouteLeave (to, from, next) {
        this.commitFormFieldsIntoStore();
        next();
    },
    data() {
        return {
            STATES,
            CITIES,
            moment,
            switch:"",
            leaddata:{},
            Country : ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
            State:["Kerala", "Gujarat","Bihar","Maharashtra"],
            City:["Mumbai", "Chennai", "Kanpur","Ahemdabad", "Bhopal"],
            yes:true,
            no:false,
            Address1:'',
            Address2:'',
            landmark:'',
            countryname:'',
            statename:'',
            mailingaddressswitch:false,
            cityname:'',
            pincode:'',
            primarymobile:'',
            alternatnumber:'',
            landlineno:'',
            aadharno:'',
            emailaddress:'',
            subaddress1:'',
            subaddress2:'',
            sublandmark:'',
            subcountry:'',
            substate:'',
            subcity:'',
            subpin:'',
            StateListdata:[],
            Citylist:[],
            StateListdatamailing:[],
            Citylistmailing:[],
            showfields:false,
        }
    },

    methods:{
        scrolldown(e) {
            // this.showfields = !this.showfields
            // var container = this.$el.querySelector("#toform");
            // container.scrollTop = container.scrollHeight;
            console.log("event",e);
            if (e === true) {
                this.showfields=true
            } else {
                this.showfields=false
            }
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

        GetStatemailing(cb = null){
        this.GETSTATE(res=>{
        console.log("State",res)
                for(let i =0;i<res.length;i++){
                    let statedata={
                        text:res[i].region_data.name,
                        code:res[i].region_data.adminCode1
                    }
                    this.StateListdatamailing.push(statedata)
                }
                cb === null ? "" : cb();

            })
            console.log(this.StateListdatamailing,"response mixin data")
        },
        cityfindmailing(ev,cb){
            console.log("event ", ev)
            let codes= this.StateListdatamailing.filter(e=>{
                if(e.text === ev){
                    return e.code
                }
            })
            console.log("event filter",codes)
            this.GETCITY(codes[0].code,resp=>{
                console.log("city ", resp[0].cities)
                this.Citylistmailing = resp[0].cities
                 cb === null ? "" : cb();
            })
        },
        commitFormFieldsIntoStore() {

            let contact_data = JSON.parse(JSON.stringify(this.leaddata));

            let mailingFormdata = {
                mailingaddress: {
                    line1: this.subaddress1,
                    line2: this.subaddress2,
                    line3: this.sublandmark,
                },
                state:this.substate,
                city: this.subcity,
                country: this.subcountry,
                pincode: this.subpin,
            };

            let switchdata = null;
            if (this.mailingaddressswitch === true){
                switchdata = "Yes"
            } else {
                switchdata = "No"
            }

            contact_data.email = this.emailaddress;
            contact_data.primaryMobile = this.primarymobile;
            contact_data.state = this.statename;
            contact_data.city = this.cityname;
            contact_data.line1 = this.Address1;
            contact_data.line2 = this.Address2;
            contact_data.line3 = this.landmark;
            contact_data.country = this.countryname;
            contact_data.pincode = this.pincode;
            contact_data.secondaryMobile = this.alternatnumber;
            contact_data.landlineNo = this.landlineno;
            contact_data.socialSecurityAdharNo = this.aadharno;
            contact_data.mailingAddressStatus = switchdata;
            contact_data.mailingAddressSecond = JSON.stringify(mailingFormdata);

            let temp_arr = [];
            temp_arr.push(contact_data);
            this.commit('Lead_Object', temp_arr);
        },

        next(){
            this.$router.push('/Lmaster/Ltab/proD')
        },
        previous(){
            this.jump('/Lmaster/Ltab/personalD')
        },
        updateLead() {
            this.commitFormFieldsIntoStore();
            let self = this;
            let updatedStore = this.getStore('GetLeadData')[0];
            let formData = lead.generateFormDate(updatedStore);

            console.log('Before going to update : ' ,formData);

            return;

            lead.updateLead(this, formData, function(data, code) {
                if (code === "1") {
                    // Jump to status form
                    self.jump('/Lmaster/status');
                }
            });
        }
    }
}
</script>

<style>

.mrg{
    margin: 35px;
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


