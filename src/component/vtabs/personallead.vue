<template>

    <div>

        <v-card class="mrg" flat>
            <p class="titletop">Personal Details</p>

        <v-container fluid>

               <div class="textfields">
                <v-flex xs4 sm5 >
                    <v-text-field
                    v-model="fname"
                    clearable
                    color="#00ACC1"
                    label="First name"
                    required
                    ></v-text-field>
                </v-flex>
                 <!-- <v-spacer> </v-spacer> -->
                <v-flex xs4 sm5 class="pl-1">
                    <v-text-field
                    clearable
                     v-model="lname"
                    color="#00ACC1"
                    label="Last name"
                    required
                    ></v-text-field>
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
                        v-model="DateofBirth"
                        label="Date of Birth"
                        persistent-hint
                        prepend-icon="event"
                        @blur="date = parseDate(DateofBirth)"
                    ></v-text-field>
                    <v-date-picker v-model="date" no-title @input="calender = false"></v-date-picker>
                </v-menu>

                    </v-flex>

                    <v-flex style="" xs4 sm5 mt-2 ml-1>
                            <v-radio-group  v-model="gender" row>
                                <v-radio
                                    label="Male"
                                    color="#00ACC1"
                                    value="male"
                                ></v-radio>
                                <v-radio
                                    label="Female"
                                    color="#00ACC1"
                                    value="female"
                                ></v-radio>
                            </v-radio-group>
                    </v-flex>
              </div>

              <div class="textfields2" >
                     <v-flex xs4 sm5>
                        <v-select
                        :items="MartialStatus"
                        color="#00ACC1"
                        label="Martial Status"
                        required
                        v-model="mstatus"
                        @change="Childyesno"
                        item-text="text"
                        item-value="value"
                        ></v-select>

                     </v-flex>
                     <v-flex v-if="btnchild === false"  xs4 sm5>
                     </v-flex>
                     <v-flex v-if="btnchild === true" style="" xs4 sm5 mt-2 ml-1>
                         <v-text style="font-size:13px">Children</v-text>
                         <v-switch  label="No / Yes" v-model="childswitch" @change="switches"></v-switch>
                            </v-flex>
              </div>
              <v-card v-if="childswitch === true" flat>
                  <v-flex xs4 sm5  ml-5 mb-3>
                       <v-btn  color="info"  @click="opendialoge"> 
                           <v-icon left> account_circle</v-icon> Add Child Details </v-btn>
                  </v-flex>
                  <v-flex v-if="ChildInfo.length !== 0"  md12  mt-3 mb-5>
                        <h3 class="text-xs-center mb-3">Child Details</h3>
                        <v-data-table
                        :headers="headersHealth"
                        :items="ChildInfo"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">

                            <td class="">{{props.item.childName}}</td>
                            <td class="">{{props.item.childAge}}</td>
                            <td class="">{{props.item.childGender}}</td>
                            <td class="">
                                <v-icon small class="mr-2" @click="editItemdilog(props.item,props.index)">edit</v-icon>

                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>
                <v-dialog v-model="dialog"   width="650" >
                    <v-card >
          <v-toolbar dark color="black">
          <v-toolbar-title>Child Details</v-toolbar-title>
        </v-toolbar>

          <v-container fluid>
             <div class="textfields">

                    <v-flex  xs4 sm5 >
                         <v-text-field v-model="ChildName"  label="Child Name" > </v-text-field>
                    </v-flex>
                    <v-flex style="" xs4 sm5 mt-2 ml-1>
                            <v-radio-group  v-model="genderchild" row>
                                <v-radio
                                    label="Male"
                                    color="#00ACC1"
                                    value="male"
                                ></v-radio>
                                <v-radio
                                    label="Female"
                                    color="#00ACC1"
                                    value="female"
                                ></v-radio>
                            </v-radio-group>
                    </v-flex>
              </div>

                 
              <div class="textfields">
                    <v-flex   xs4 sm5>
                        <v-menu
                        ref="calender"
                        :close-on-content-click="false"
                        v-model="ChildDOB"
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
                        v-model="childdate"
                        label="Date of Birth"
                        persistent-hint
                        prepend-icon="event"
                        @blur="childblurdate = parseDate(childdate)"
                    ></v-text-field>
                    <v-date-picker v-model="childblurdate" no-title @input="ChildDOB = false"></v-date-picker>
                </v-menu>

                    </v-flex>
                    <v-flex   xs4 sm5>
                    </v-flex>

              </div>

              <div>
                  
                   <v-layout class="btnm" align-center justify-end row fill-height>
                   <v-btn   color="#F5F5F5" @click="dialog = false" light> Cancel <v-icon right>cancel</v-icon></v-btn>
                   <v-btn   color="black" dark @click="saveeditfunc">  {{btnname}} <v-icon right>save</v-icon></v-btn>
              </v-layout>
              </div>


          </v-container>
                    </v-card>
                </v-dialog>


        </v-card>
              

              
            <v-layout>
                <v-layout>
                    <v-btn color="#F5F5F5" light @click="previous">Previous</v-btn>
                </v-layout>
              <v-layout class="btnm" align-center style="justify-content:flex-end" row fill-height>
                   
                   <v-btn @click="updateLead" v-if="$store.state.leadputpost === 'PUT'" color="black" dark>Update</v-btn>
                   <v-btn @click="next" color="black" dark>Proceed</v-btn>
              </v-layout>
            </v-layout>
      </v-container>

        </v-card>

    </div>

</template>

<script>
import moment from 'moment'
import putlead from '../../Page/ActivityUpload/putLeadFunc.js'
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
    created() {
        this.leaddata = this.getStore('GetLeadData')[0];
        console.log("Child Data",this.leaddata)
        this.fname = this.leaddata.firstName;
        this.lname = this.leaddata.lastName;
        this.gender = this.leaddata.gender;
        this.ChildInfo = JSON.parse(this.leaddata.ChildInfo);

        if (this.leaddata.dob === null || this.leaddata.dob === "" || this.leaddata.dob === undefined || isNaN(this.leaddata.dob)) {
            this.DateofBirth = "";
        } else {
            this.DateofBirth = moment(this.leaddata.dob).format("MM/DD/YYYY");
        }

        this.mstatus = this.leaddata.maritalStatus
        this.childStatus = this.leaddata.childStatus

        if(this.leaddata.childStatus === 'Yes'){
            this.childswitch = true
        }else{
            this.childswitch = false
        }

        this.Childyesno(this.mstatus)
        this.Childyesno('single')
    },

    data(){

        return{
            moment,
            mstatus: "",
            headersHealth: [{
                    text: 'Child Name',
                    value: 'childname'
                },
                {
                    text: 'Child Age',
                    value: 'age'
                },
                {
                    text: 'Child Gender',
                    value: 'gender'
                },
                {
                    text: 'Action',
                    value: 'action',
                    sortable: false
                }
            ],
            fname: "",
            lname: "",
            leaddata: {},
            calender: false,
            date: null,
            childblurdate:null,
            dialog:false,
            btnname:'Save',
            ChildDOB:false,
            genderchild:'',
            ChildName:'',
            gender: '',
            childdate:null,
            childswitch:false,
            btnchild:false,
            childStatus: "No",
            ChildInfo: [],
            formdata: [],
            radiogender: {
                name1: 'Male',
                name2: 'Female'
            },
            DateofBirth:null,
            inddexchld:null,

            MartialStatus:[{text:'Single',value:'single'},{text:'Married',value:'married'},{text:'Divorced',value:'divorced'},{text:'Widowed',value:'widowed'}]
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
        Childyesno(e){
            console.log("event data",e)
            if(e === 'single'){
                this.btnchild = false
            }else{
                this.btnchild = true
            }
        },
        switches(e){
            console.log('eeeee',e)
            if(e === true){
                this.childStatus = 'Yes'
            }else{
                this.childStatus = 'No'
            }
        },
        opendialoge(){
            this.dialog = true
            this.btnname = 'Save'
            this.ChildName='',
            this.childdate='',
            this.genderchild=''
        },
        editItemdilog(e,ind){
            this.dialog = true
            this.btnname = 'Update'
            this.ChildName=e.childName,
            this.childdate=e.childAge,
            this.genderchild=e.childGender
            this.inddexchld = ind
        },
        savechold(){
             let tablevalue ={
                id: 'ch'+this.makeid(),
                childName: this.ChildName,
                childAge: this.childdate,
                childGender: this.genderchild
            }
            this.ChildInfo.push(tablevalue)
            this.dialog = false
            console.log('Child data array',this.ChildInfo)
        },
        Updatechild(){

            this.ChildInfo[this.inddexchld].childName = this.ChildName
            this.ChildInfo[this.inddexchld].childAge = this.childdate 
            this.ChildInfo[this.inddexchld].childGender = this.genderchild  
            this.dialog = false
        },
        saveeditfunc(){
            if(this.btnname === 'Save'){
                this.savechold();
            }else if(this.btnname === 'Update'){
                this.Updatechild();
            }
            },

        makeid() {
                var text = "";
                var possible = "0123456789abcdefghijklmnopqrstuvwxyz";
                for (var i = 0; i < 6; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
            },

        commitFormFieldsIntoStore() {

            let Personaldetails = JSON.parse(JSON.stringify(this.leaddata));
            let dateOfBirth = moment(this.DateofBirth).valueOf();

            Personaldetails.firstName = this.fname;
            Personaldetails.lastName = this.lname;
            Personaldetails.dob = isNaN(dateOfBirth) || dateOfBirth == null || dateOfBirth === undefined ? "" : dateOfBirth;
            Personaldetails.gender = this.gender;
            Personaldetails.maritalStatus = this.mstatus;
            Personaldetails.childStatus = this.childStatus;

            /**
             * How to save child information into the @name ChildInfo
             *
             * ChildInfo type must be an array
             * push objects into it
             * and stringify with the help of JSON.stringify() function
             */
            Personaldetails.ChildInfo = JSON.stringify(this.ChildInfo);

            let temp_arr = [];
            temp_arr.push(Personaldetails);
            this.commit('Lead_Object', temp_arr);
        },

        next() {
            // this.commitFormFieldsIntoStore();
            this.jump('/Lmaster/Ltab/contactD')
        },
        previous(){
            // this.commitFormFieldsIntoStore();
            this.jump('/Lmaster/status')
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
            this.DateofBirth = this.formatDate(this.date)
        },
        childblurdate (val) {
            this.childdate = this.formatDate(this.childblurdate)
        }
    },

}
</script>

<style>

.mrg{
    margin: 5px;
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


