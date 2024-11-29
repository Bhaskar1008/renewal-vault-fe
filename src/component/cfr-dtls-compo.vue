<template>
<v-card>
    <div>
        <v-btn round color="primary" @click.native="openRaiseReqt">Raise Requirements</v-btn>
        <v-dialog v-model="dialogCfr" max-width="750">
            <v-card>
                <v-layout style="background-color:#3a3a3a">
                    <v-card-title class="subheading" style="color:white" >Raise Requirements</v-card-title>
                    <v-card-title class="subheading" style="color:white" >{{propDetails._id | id-filter}}</v-card-title>
                    <v-card-title class="subheading" style="color:white" >{{propDetails.benefitIllustration.AdvisorName | to-capitlaize}}</v-card-title>
                </v-layout>

            <v-card-text>
                <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                    <v-select

                        v-model="selectData"
                        :items="items"
                        label="Type of Life"
                        required
                    ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                    <v-select
                        v-model="selectData1"
                        :items="items1"
                        label="Category of Issue"
                        v:on:change="myFunc"

                    ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md5>
                    <v-select
                        v-model="issue"
                        :items="issueTypes"
                        label="Type of Issue"
                        required
                    ></v-select>
                    </v-flex>

                    <v-flex xs12 sm12 md12>

                    <v-text-field label="Description" v-model="cfrdata"></v-text-field>
                    </v-flex>
                </v-layout>

                <!-- NEW MEDICAL CFR FIELDS ==>SALMAN-->
                <v-flex v-if="showMedicalData === true">
                <v-layout row wrap>
                    <v-flex xs12 sm6 md6>
                    <v-select
                        v-model="testType"
                        :items="mediTestList"
                        label="Test Type"
                        multiple>
                        <template slot="selection" slot-scope="{ item, index }">
                            <v-chip v-if="index === 0">
                                <span>{{ item }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption">(+{{ testType.length - 1 }} others)</span>
                        </template>

                        </v-select>

                    </v-flex>

                    <v-flex xs12 sm6 md6>
                        <v-menu
                            :close-on-content-click="false"
                            v-model="menu2"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="date"
                            label="Schedule Date"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                        </v-menu>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                        <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menuTime"
                            :nudge-right="40"
                            :return-value.sync="time"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="time"
                            label="Schedule Time"
                            prepend-icon="access_time"
                            readonly
                            ></v-text-field>
                            <v-time-picker v-if="menuTime" v-model="time" full-width @change="$refs.menu.save(time)"></v-time-picker>
                        </v-menu>
                        </v-flex>

                        <v-flex xs12 sm6 md6>
                            <v-select
                                v-model="tpaName"
                                :items="tpaNameList"
                                label="TPA Name"
                                required
                            ></v-select>
                        </v-flex>

                        <v-flex xs12 sm6 md6>
                            <v-select
                                v-model="city"
                                :items="cityList"
                                label="City"
                                required
                            ></v-select>
                        </v-flex>

                        <!-- <v-flex xs12 sm6 md6 style="border:1px solid grey;height:53px">
                                <gmap-autocomplete  @place_changed="setPlace" style="width:335px;height:48px;padding:5px;outline: none"></gmap-autocomplete>
                        </v-flex> -->
                        <v-flex xs12 sm6 md6>
                            <v-select
                                v-model="location"
                                :items="locList"
                                label="Location"
                                required
                            ></v-select>
                        </v-flex>


                        <v-flex xs12 sm6 md6>
                            <v-select
                                v-model="contPerson"
                                :items="drList"
                                label="Contact person"
                                required
                            ></v-select>
                        </v-flex>

                        <v-flex xs12 sm6 md6>
                            <v-select
                                v-model="contPhone"
                                :items="phoneList"
                                label="Contact Phone"
                                required
                            ></v-select>
                        </v-flex>

                </v-layout>
                </v-flex>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" flat="flat" @click.native="dialogCfr = false">Cancel</v-btn>
                <v-btn color="secondary"  @click.native="submitupdtswicth(btnname)">{{btnname}}</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <v-data-table
        :headers="headers1"
        :items="cfrDataObj"
        hide-actions
        class="elevation-1">
      <template slot="items" slot-scope="props">
        <td style="padding-left:40px;">{{ props.index + 1}}</td>
        <td class="text-xs-left" style="padding: 0px;padding-left: 24px;">{{props.item.categoryofIssue }}</td>
        <td class="text-xs-left">{{ props.item._id | id-filter}}</td>
        <td class="text-xs-left">{{ props.item.requestType}}</td>
        <td class="text-xs-left">{{ props.item.cfr_des}}</td>
        <td class="text-xs-left">{{ props.item.cfrStatus}}</td>
        <td class="justify-center layout px-0">

          <v-menu transition="scale-transition">
            <v-btn icon class="mx-0" slot="activator" >
            <v-icon color="grey">settings</v-icon>
          </v-btn>
            <v-list>
              <v-list-tile >
                  <v-btn flat color="primary" @click.native="editItem(props.item,props.index)" >Edit</v-btn>
              </v-list-tile>
              <v-list-tile >
                 <v-btn flat color="primary" @click="deltData(props.item,props.index)" >Delete</v-btn>
              </v-list-tile>

            </v-list>
          </v-menu>
        </td>

      </template>


    </v-data-table>
    </v-card>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

const details = [
    'DOB Mismatch',
    'Name Mismatch',
    'Gender Mismatch',
    'Address Mismatch',
];

const document = [
    'ID Proof Not provided',
    'ID Proof Not Legible',
    'Income Proof Not provided',
    'Income Proof Not Legible',
    'Address Proof Not provided',
    'Address Proof Not Legible',
    'Age Proof Not provided',
    'Age Proof Not Legible',
]
const reciepting=[
    'Extra Premium Required',
    'Premium not reflecting',
    'Premium amount mismatch',
]
const medical = [
    'Medical Details Required',
    'Medical Test Required'
]

var _index = 0; // used for put api
export default {
    name: "GoogleMap",
    data(){
        return{
            cfrID:'',
            location:'',
            showMedicalData:false,
            menuTime:false,
            menu2:false,
            date:false,
            time:null,
            testType:[],
            tpaName:'',
            city:'',
            location:'',
            contPerson:'',
            contPhone:'',
            TblData1:[],
            checkbox:false,
            dialogCfr:false,
            selectData:null,
            selectData1:null,
            issue: null,
            snackbar: false,
            btnname:'',
            location:'',
            obj1:{},
            cfrdata:'',
            cfrDataObj:[],
            cfrDetails:{},
            //  CFRDetails:{},
            y: 'top',
            x: null,
            mode: '',
            items:[
                'Life Assured',
                'Proposer',
                'Nominee',
                'Appointee',
            ],
            items1:[{
                text: 'Details',
                value: 'Details'
                }, {
                text: 'Document',
                value: 'Document'
                }, {
                text: 'Reciepting',
                value: 'Reciepting'
                },
                {
                text: 'Medical',
                value: 'Medical'
            }],

            items2:[
                'DOB Mismatch',
                'Name Mismatch ',
                'Gender Mismatch',
                'Address Mismatch',
            ],
            issueTypes:[],
            mediTestList:[
                'Libido Test',
                '2D Echo with color Doppler',
                'Serum Alkaline Phosphates',
                'Anti HCV',
                'Complete blood count'
            ],
            tpaNameList:[
                'Good Health',
                'Health India',
                'Paramount Health',
                'Tata Health'
            ],
            cityList:[
                'Mumbai',
                'Pune',
                'Lucknow',
                'Chennai',
                'Delhi'
            ],
            loctnList:[
                'Andheri East',
                'Chembur',
                'Parel',
                'Bandra',
                'Worli',
            ],
            drList:[
                'Dr. Anuj Bhargava',
                'Dr. Ram Tripathi',
                'Dr. L. k.Advani',
                'Dr. Salil Chaudhary'
            ],
            phoneList:[
                '022-3439938'
            ],
            locList:[
                'Bandra West, Mumbai, Maharashtra, India',
                'Malad West, Mumbai, Maharashtra, India'
            ],
            headers1: [
                {
                text: 'Sr.No',
                align: 'left',
                //   sortable: false,
                value: 'SrNo'
                },
                { text: 'Type', value: 'Type' },
                { text: 'CFR ID', value: 'cfrId' },
                { text: 'Reciepting', value: 'reciepting' },
                { text: 'Description', value: 'description' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'name', sortable: false }
            ],
        }
    },

    created () {
        let self = this;
        self.propDetails =  self.$store.getters.getProposalDetails
        console.log('Proposal Data',self.propDetails);
        this.cfrDataObj = self.propDetails.cfrdetails
        // console.log("object length iss",this.cfrDataObj.length)
        console.log("Cfr Deatails are",this.cfrDataObj)
        this.initialize()
    },

    computed: {
       value() {
           console.log(this.value);
       }
    },

    methods:{
        ...mapMutations(['showSnackbar', 'closeSnackbar']),

         setPlace(place) {
            this.currentPlace = place.formatted_address;
            console.log("Current Place is",this.currentPlace)
            },

        initialize(){
            this.TblData1 = [
          {
              SrNo:'1',
              Type:'Document Upload',
              cfrId:'CFR91882',
              reciepting:'Done',
              description:'LA ID Proof - PAN Card - Unclear ',
              status:'Open',

          },]
        },

        submitupdtswicth(_btnname){
            if( _btnname == 'submit' ){
                this.submit();
            }
            else if(_btnname == 'update'){
                this.editCfr();
            }
        },

        submit(){
            var self = this;
            console.log('Dropdown Value , ', this.testType)
            self.$store.state.cfrDetails =[]
            let API = 'cfr/'+this.propDetails._id;

            this.POST(API, {
                requestType :   this.selectData,
                category_of_Issue :this.selectData1,
                type_of_Issue : this.issue,
                cfr_status : 'open' ,
                cfr_type : 'medical',
                cfr_des: this.cfrdata,
                TestType:this.testType,
                ScheduleDate:new Date(this.date).getTime(),
                ScheduleTime:this.time,
                TPAName:this.tpaName,
                City:this.city,
                Location:this.location,
                Contactperson:this.contPerson,
                ContactPhone:this.contPhone,
                userId: self.getAgentInfo()._id
            },
            res => {
                this.cfrDetails = res.data.errMsg
                //    const rqrmnt
                console.log("Response is from server POST RAW:",res.data.errMsg);
                console.log("Response is from server POST:",this.cfrDetails);
                var len = res.data.errMsg.length
                self.$store.commit('SET_CFR_DETAILS', this.cfrDetails);
                self.UpdateCfrTbl();
                this.dialogCfr = false
                this.showSnackbar({text: 'Raised CFR Sucessfully',color:'green'})
                let Proposalid = this.propDetails._id
                console.log('Proposal ID Before API',Proposalid);

                // Shoaib 4/7/2018  TO send notification to Agent about CFR status
                if(res.data.errCode === -1) {

                    // user_id is required for socket
                    let dup_user_id = this.propDetails.userId._id;

                    this.propDetails.userId._id ="A"+ this.propDetails.userId._id.slice(16,25).toUpperCase();
                    // console.log(this.propDetails.userId._id)

                    this.POSTUSER("sendnotification/"+this.propDetails.leadId.userId,{
                        first_name:this.propDetails.benefitIllustration.NameofLifeAssured,
                        notification_body:
                        this.propDetails.benefitIllustration.NameofLifeAssured+
                        "|" +
                        this.propDetails.userId._id +
                        "|" +
                        "Deadline:"+
                        new Date(this.propDetails.createdDate).toLocaleDateString(),
                        //  moment(createdDate).format("L") ,
                        // notification_type:this.propDetails.cfrStatus,
                        notification_type:'applications',
                        proposal_Id:this.propDetails._id,
                        // notification_subtype: 'Needed',
                        notifications_subtype:this.propDetails.cfrType,
                        notification_status: "cfr",
                        cfrData:this.cfrDetails,
                        // notifications_status:this.propDetails.cfrStatus,
                        PlanName: this.propDetails.productId.productName, // plan option
                        PremiumAmount:this.propDetails.benefitIllustration.InstallmentPremium //Installment Premium

                    },
                    res => {

                            this.obj = res.data.errMsg[0];

                             /**
                             * @author Khan Usama
                             * Date: 17/07/2019
                             *
                             * @description socket implementation: Socket emit event, notification is hit
                             */
                            self.$socket.emit("pushNotification", { message: "CFR Raised", user_id: dup_user_id });
                    })
                } else if(res.data.errCode === 1936){
                    this.showSnackbar({text: 'Cannot Raise CFR for Issued proposal',color:'error'})
                }
            // End Send notificaiton

            }
            )
        },

        // Put API hit for edit button (SALMAN)
        editCfr(item){
           //var self = this
            let cfrid_admin = this.$store.getters.getProposalDetails.cfrdetails[_index]._id;
            console.log(this.$store.getters.getProposalDetails , 'CFRID')
            let propId = this.$store.getters.getProposalDetails._id;
            let usersId = this.$store.getters.getAgentDetails._id;

            this.PUT('updateCfr/' +propId,{
                requestType : this.selectData,
                category_of_Issue :this.selectData1,
                type_of_Issue : this.issue,
                cfr_status : 'open' ,
                cfr_type : 'medical',
                cfr_des: this.cfrdata,
                TestType:this.testType,
                ScheduleDate:new Date(this.date).getTime(),
                ScheduleTime:this.time,
                TPAName:this.tpaName,
                City:this.city,
                Location:this.location,
                Contactperson:this.contPerson,
                ContactPhone:this.contPhone,
                userId: usersId,
                cfr_id: this.cfrID,

             },res => {
                console.log(res.data.errMsg);
                this.cfrDetails = res.data.errMsg
                //    const rqrmnt
                console.log("Response is from server PUT:",res.data.errMsg);
                var len = res.data.errMsg.length
                console.log("After EDIT",len)
                this.$store.commit('SET_CFR_DETAILS', this.cfrDetails)
                this.UpdateCfrTbl();
                this.dialogCfr = false
                this.showSnackbar({text: 'Updated CFR Sucessfully',color:'green'})
                // window.location.reload();
               }
            )

        },

        openRaiseReqt(){
            this.btnname='submit'
            this.cfrdata ='';
            this.selectData='';
            this.selectData1='';
            this.issue='';
            this.date='';
            this.time='';
            this.testType='';
            this.tpaName = '',
            this.city = '';
            this.location = '';
            this.contPerson = '';
            this.contPhone = '';
            this.dialogCfr = true
            this.showMedicalData = false
        },

        editItem (item,i) {
            console.log("Data is",item)
            console.log("Index is",i)
            _index = i;
            this.btnname = 'update'

            this.dialogCfr = true
            var itemscfr = item;
            console.log("new item is",itemscfr)
            this.cfrdata = itemscfr.cfr_des;
            this.selectData = itemscfr.requestType;
            this.selectData1 = itemscfr.categoryofIssue;
            this.issue = itemscfr.typeofIssue;
            this.testType = itemscfr.TestType.split(',');
            this.date = new Date(itemscfr.ScheduleDate).toLocaleDateString();
            this.time = itemscfr.ScheduleTime;
            this.tpaName = itemscfr.TPAName;
            this.city = itemscfr.City;
            this.location = itemscfr.Location;
            this.contPerson = itemscfr.Contactperson;
            this.contPhone = itemscfr.ContactPhone;
            this.cfrID = itemscfr._id
        },
        UpdateCfrTbl(){
            this.cfrDataObj = this.$store.getters.getProposalDetails.cfrdetails;
        }

    },
    watch: {
        selectData1: function(val, oldVal) {
            console.log('VALUE::',val)
            if(val === 'Details') {
                this.issueTypes = [];
                this.issueTypes = details;
                this.showMedicalData = false;
            } else if (val === 'Document') {
                this.issueTypes = []
                this.issueTypes = document;
                this.showMedicalData = false;
            }else if (val === 'Reciepting') {
                this.issueTypes = []
                this.issueTypes = reciepting;
                this.showMedicalData = false;
            }else if (val === 'Medical') {
                this.issueTypes = []
                this.issueTypes = medical;
                this.showMedicalData = true;
            }
        }
    }
}
</script>

<style>

</style>
