<template>
    <v-app>
        <v-container grid-list-xl>
            <v-layout row wrap>
                <!-- Start here -->
                <v-flex xs12 row wrap>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex xs9 mt-3>
                                <v-layout row wrap ml-1>

                                    <v-flex xs3 text-xs-center>
                                        <v-avatar color="red">
                                            <!-- <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"> -->

                                        </v-avatar>
                                        <v-text>{{travelfirst}}</v-text>
                                    </v-flex>
                                    <!-- <v-flex xs2 text-xs-center>

								</v-flex> -->
                                    <v-flex xs7 text-xs-right ml-6>
                                        <div style="margin-right: 55px;">
                                            <v-text class="body-1"> Policy Document</v-text>
                                        </div>

                                        <div>
                                            <!-- <v-btn ml-3 depressed color="#01B4BB" style="color:white">Download</v-btn> -->
                                            <a :href=download target="_blank" ml-2 depressed color="#FFA200" class="download-btn" style="">Download</a>

                                            <!-- <v-btn ml-2 depressed color="#424242" style="color:white">REJECT</v-btn>  -->
                                            <v-btn ml-2 depressed color="#FFA200" style="color:white" @click.native="dialogCfr = true">Share</v-btn>
                                        </div>
                                    </v-flex>

                                </v-layout>

                                <!-- email POPUP -->
                                <v-dialog v-model="dialogCfr" max-width="650">
                                    <v-card>
                                        <v-layout style="background-color:#3a3a3a">
                                            <v-card-title class="subheading" style="color:white">Send Email</v-card-title>

                                        </v-layout>

                                        <v-card-text>
                                            <v-container grid-list-md>
                                                <v-layout wrap>
                                                    <!-- <v-text class="body-1"> TO</v-text>          -->
                                                    <v-flex xs12 sm12 md12>

                                                        <v-text-field label="To" v-model="toemail"></v-text-field>
                                                    </v-flex>

                                                    <v-flex xs12 sm12 md12>

                                                        <v-text-field label="Subject" v-model="subject"></v-text-field>
                                                    </v-flex>

                                                    <v-textarea v-model="mail_body" auto-grow box label="Body" rows="14"></v-textarea>
                                                </v-layout>
                                            </v-container>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="secondary" flat="flat" @click.native="dialogCfr = false">Cancel</v-btn>
                                            <v-btn color="secondary">Send</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <!-- end -->

                                <v-layout row wrap style="padding-left:15px;">
                                    <v-flex xs4 pa-3 v-for="(dat, li) in infomationData" :key="li">
                                        <div>
                                            <v-text class="caption">{{dat.label}}</v-text>
                                        </div>
                                        <v-text class="body-1">{{dat.value}}</v-text>
                                    </v-flex>
                                </v-layout>
                            </v-flex>

                            <v-flex xs3>
                                <!-- <div id="app"> -->
                                <!-- <v-container style="max-width: 600px;"> -->
                                <v-timeline dense clipped>





                                    <v-timeline-item class="" color="grey" icon-color="grey lighten-2" small>
                                        <v-layout wrap>
                                            <v-flex xs12>Applied.</v-flex>
                                            <v-flex xs12>{{createddate}}</v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs12>15:26 EDT</v-flex>
                                        </v-layout>
                                    </v-timeline-item>

                                    <v-timeline-item class="" color="orange" icon-color="grey lighten-2" small>
                                        <v-layout wrap>
                                            <v-flex xs12>Verified.</v-flex>
                                            <v-flex xs12>{{createddate}}</v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs12>15:26 EDT</v-flex>
                                        </v-layout>
                                    </v-timeline-item>

                                    <v-timeline-item class="" color="#01B4BB" icon-color="grey lighten-2" small>
                                        <v-layout wrap>
                                            <v-flex xs12>Issued.</v-flex>
                                            <v-flex xs12>{{createddate}}</v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs12>15:26 EDT</v-flex>
                                        </v-layout>
                                    </v-timeline-item>





                                </v-timeline>
                                <!-- </v-container> -->
                                <!-- </div> -->
                            </v-flex>
                        </v-layout>

                    </v-card>
                </v-flex>
                <!-- End here -->

                <!-- <v-flex>
                    <v-card style="border-color: #01B4BB;border-style: solid;border-width: 1px;">
                        <v-card-title class="subheading font-weight-bold box-color font-color">Contact Details</v-card-title>
                        <v-divider></v-divider>

                        <v-list dense v-for="(cntctlist, subList)  in contactDetails" :key="subList">
                            <v-list-tile>
                                <v-list-tile-content>{{cntctlist.label}}</v-list-tile-content>
                                <v-list-tile-content class="align-end large-text">{{cntctlist.data}}</v-list-tile-content>
                            </v-list-tile>

                        </v-list>
                    </v-card>
                </v-flex> -->

                <v-flex v-for="(itemList, itemInde) in items" :key="itemInde" xs12 sm12 md6>
                    <!-- START -->
                    <!-- <v-container > -->
                    <v-data-iterator :items="itemList.card" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout" hide-actions row wrap>
                        <v-flex slot="item" slot-scope="props" class="slf-align">
                            <v-card style="border-color: #01B4BB;border-style: solid;border-width: 1px;">
                                <v-card-title class="subheading font-weight-bold box-color font-color">{{ props.item.title }}</v-card-title>
                                <v-divider></v-divider>

                                <v-list dense>
                                    <v-list-tile v-for="(list, subList)  in props.item.card" :key="subList">
                                        <v-list-tile-content>{{list.label}}</v-list-tile-content>
                                        <v-list-tile-content class="align-end large-text" v-if="'data' in list">{{ list.data }}</v-list-tile-content>

                                        <img v-else style="height: 20px; width:20px;" :src="list.img" />
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>

                    </v-data-iterator>
                    <!-- </v-container>      -->
                    <!-- END -->
                </v-flex>
                <v-flex>
                    <v-card style="border-color: #01B4BB;border-style: solid;border-width: 1px;">
                        <v-card-title class="subheading font-weight-bold box-color font-color">Documents</v-card-title>
                        <v-divider></v-divider>

                        <v-list dense>
                            <v-list-tile>
                                <v-list-tile-content>PAN:</v-list-tile-content>
                                <v-list-tile-content class="align-center" style="margin-left:60px">22/05/15</v-list-tile-content>
                                <v-list-tile-content class="align-end font-decor" @click="dialogDoc = true">view</v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>Driving Licence:</v-list-tile-content>
                                <v-list-tile-content class="align-center">22/05/15</v-list-tile-content>
                                <v-list-tile-content class="align-end font-decor" @click="dialogDoc = true">view</v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>Aadhar:</v-list-tile-content>
                                <v-list-tile-content class="align-center" style="margin-left:48px">22/05/15</v-list-tile-content>
                                <v-list-tile-content class="align-end font-decor" @click="dialogDoc = true">view</v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>Previous policy document:</v-list-tile-content>
                                <v-list-tile-content class="align-center" style="margin-right:58px">22/05/15</v-list-tile-content>
                                <v-list-tile-content class="align-end font-decor" @click="dialogDoc = true">view</v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile>
                                <v-list-tile-content>Registration Card:</v-list-tile-content>
                                <v-list-tile-content class="align-center" style="margin-right:8px">22/05/15</v-list-tile-content>
                                <v-list-tile-content class="align-end font-decor" @click="dialogDoc = true">view</v-list-tile-content>
                            </v-list-tile>

                        </v-list>
                    </v-card>
                </v-flex>

                <v-dialog v-model="dialogDoc" width="800px ">
                    <v-flex>
                        <v-card>
                            <v-card-title style="background-color:#01B4BB;font-size: 16px;color: white;justify-content: center;" primary-title>Documents</v-card-title>
                            <v-flex pa-4>
                                <v-carousel hide-controls dark :cycle="false">
                                    <v-carousel-item v-for="(item,i) in itemIMG" :key="i" :src="item.src">
                                        <v-flex style="margin-bottom:12px;">
                                            <v-text class="title font-weight-medium" style="justify-content: center;display: flex;">{{item.label}}</v-text>
                                        </v-flex>
                                    </v-carousel-item>
                                </v-carousel>
                            </v-flex>
                        </v-card>
                    </v-flex>
                </v-dialog>



            </v-layout>
        </v-container>
    </v-app>
</template>
<script>

    import travelDataList from '../common/travelDatalist.js'
    import moment from 'moment'
    export default {

        created() {

            this.getTravelData = this.$store.getters.getTravelDetails
            console.log('GET TRAVELS DATA::', this.getTravelData)

            this.travelfirst =this.checkValidy(this.getTravelData.ContactDetails.FirstName+"  "+ this.getTravelData.ContactDetails.LastName)


            let travelItemListLength = this.items.length;
            // console.log('TRAVELS DATA LENGTH::',travelItemListLength)

            this.toemail = this.getTravelData.ContactDetails.EmailAddress
            this.subject = 'Rest easy! You\'re insured - Travel care'
            this.username = this.getTravelData.TravellerDetails_Traveller1.FirstName
            // this.pdffile =
            this.download = "http://159.89.161.64:5021/pdf/"+this.getTravelData.pdf_file
            this.createddate = this.checkValidy(new Date(this.getTravelData.created_date).toLocaleDateString())
            // console.log('createddate:::::',this.createddate);
            console.log('Download link',this.download)

            this.mail_body = 'Dear ' + this.username + ',\n\nThank you for entrusting us to insure your well being. We hope to create a long-lasting association with you.\n\n We are sharing the policy document for your newly applied Travel care plan, with this mail. \n\nFor any queries related to the working of this policy, its benefits, or for any claims, please call us on the following contact numbers. We will be happy to help you.\n\nCall us on:     7150 5433\nEmail us on:     PLI_OpsClaim@BDO-insure.com\n\nLooking forward to keep you happy and sound.\n\nBest Regards\n\nTeam BDO Insure'

            let nestedLength = 0


            for (let i = 0; i < travelItemListLength; i++) {
                nestedLength = this.items[i].card[0].card.length;
                //    console.log('TRAVELS DATA NESTED::',nestedLength)
                // console.log('id Checking',this.items[i].card[0]._id);

                for (let j = 0; j < nestedLength; j++) {

                 let _country = "";
                 let travelcontry = [];
                  for (let k = 0; k < this.getTravelData.travellingCountry.length; k++) {
                _country = this.getTravelData.travellingCountry[k].country
                travelcontry.push(_country)

                //  console.log('travelling country',travelcontry)
                  }


                    this.items[i].card[0]._id == 'C1' ? (
                        //    TRIP DETAILS
                        this.items[i].card[0].card[j].label == 'Travelling to :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.travellingCountry[0]) :
                        this.items[i].card[0].card[j].label == 'Trip Start Date :' ? this.tripstart = this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.TripDetails.TripStartDate) :
                        this.items[i].card[0].card[j].label == 'Trip End Date :' ? this.tripend = this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.TripDetails.TripEndDate) : ""
                    ):this.items[i].card[0]._id == 'C10' ? (
                        this.items[i].card[0].card[j].label == 'First Name :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.ContactDetails.FirstName) :
                        this.items[i].card[0].card[j].label == 'Last Name :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.ContactDetails.LastName) :
                        this.items[i].card[0].card[j].label == 'Email Address :' ? this.infomationData[2].value = this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.ContactDetails.EmailAddress) :""

                    )
                    : this.items[i].card[0]._id == 'C2' ? (

                        //    TRAVELLER-1
                        this.items[i].card[0].card[j].label == 'First Name :' ? this.travellerfirst = this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.TravellerDetails_Traveller1.FirstName) :
                        this.items[i].card[0].card[j].label == 'Last Name :' ? this.travellerlast = this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.TravellerDetails_Traveller1.LastName) :
                        this.items[i].card[0].card[j].label == 'Gender :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.TravellerDetails_Traveller1.Gender) :
                        this.items[i].card[0].card[j].label == 'DOB :' ? this.items[i].card[0].card[j].data = this.checkValidy(new Date (parseInt(this.getTravelData.TravellerDetails_Traveller1.DOB)).toLocaleDateString()) :
                        this.items[i].card[0].card[j].label == 'Passport No :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.TravellerDetails_Traveller1.PassportNo) :
                        this.items[i].card[0].card[j].label == 'Married :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.TravellerDetails_Traveller1.Married) : ""

                    ) : this.items[i].card[0]._id == 'C3' ? (
                        //    TRAVELLER-2
                        this.items[i].card[0].card[j].label == 'First Name:' ? this.travellertwofirst = this.infomationData[3].value = this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller2.FirstName) :
                        this.items[i].card[0].card[j].label == 'Last Name:' ? this.travellertwolast = this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller2.LastName) :
                        this.items[i].card[0].card[j].label == 'Gender:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller2.Gender) :
                        this.items[i].card[0].card[j].label == 'DOB:' ? this.items[i].card[0].card[j].data = this.checkValidy(new Date(parseInt(this.getTravelData.Traveller2.DOB)).toLocaleDateString()) :
                        this.items[i].card[0].card[j].label == 'Passport No:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller2.PassportNo) :
                        this.items[i].card[0].card[j].label == 'Married:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller2.Married) :""
                        // this.items[i].card[0].card[j].label == 'Relationship With Traveller-1:s' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller2.RelationshipwithTraveller1) : ""
                    // ) : this.items[i].card[0]._id == 'C4' ? (


                    //     this.items[i].card[0].card[j].label == 'First Name:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller3.FirstName) :
                    //     this.items[i].card[0].card[j].label == 'Last Name:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller3.LastName) :
                    //     this.items[i].card[0].card[j].label == 'Gender:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller3.Gender) :
                    //     this.items[i].card[0].card[j].label == 'DOB:' ? this.items[i].card[0].card[j].data = this.checkValidy(new Date(this.getTravelData.Traveller3.DOB)).toLocaleDateString() :
                    //     this.items[i].card[0].card[j].label == 'Passport No:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller3.PassportNo) :
                    //     this.items[i].card[0].card[j].label == 'Married:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller3.Married) : ""


                    // ) : this.items[i].card[0]._id == 'C5' ? (
                    //     this.items[i].card[0].card[j].label == 'First Name:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller4.FirstName) :
                    //     this.items[i].card[0].card[j].label == 'Last Name:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller4.LastName) :
                    //     this.items[i].card[0].card[j].label == 'Gender:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller4.Gender) :
                    //     this.items[i].card[0].card[j].label == 'DOB:' ? this.items[i].card[0].card[j].data = this.checkValidy(new Date(this.getTravelData.Traveller4.DOB)).toLocaleDateString() :
                    //     this.items[i].card[0].card[j].label == 'Passport No:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller4.PassportNo) :
                    //     this.items[i].card[0].card[j].label == 'Married:' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Traveller4.Married) : ""

                    ) : this.items[i].card[0]._id == 'C8' ? (
                        //    MEDICAL DETAILS
                        this.items[i].card[0].card[j].label == 'Diseases :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.MedicalDetails.Diseases) : ""
                    ) : this.items[i].card[0]._id == 'C7' ? (

                        //    ADDRESS
                        this.items[i].card[0].card[j].label == 'Pincode :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Address.Pincode) :
                        this.items[i].card[0].card[j].label == 'Address-1 :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Address.Address1) :
                        this.items[i].card[0].card[j].label == 'Address-2 :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Address.Address2) :
                        this.items[i].card[0].card[j].label == 'Address-3 :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Address.Address3) :
                        this.items[i].card[0].card[j].label == 'City :' ? this.city = this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Address.City) :
                        this.items[i].card[0].card[j].label == 'State :' ? this.state = this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.Address.State) : ""
                    ) : this.items[i].card[0]._id == 'C6' ? (
                        //    PLAN DETAILS
                        this.items[i].card[0].card[j].label == 'Policy issued on :' ? this.items[i].card[0].card[j].data = this.checkValidy(new Date(this.getTravelData.created_date)).toLocaleDateString() :
                        this.items[i].card[0].card[j].label == 'Plan Name :' ? this.items[i].card[0].card[j].data = this.checkValidy('Travelling Care') :
                        this.items[i].card[0].card[j].label == 'Age-1 :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.age1) :
                        this.items[i].card[0].card[j].label == 'Age-2 :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.age2) :
                        this.items[i].card[0].card[j].label == 'Premium Amount  :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.premiumAmt) :
                        this.items[i].card[0].card[j].label == 'Status :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.status) :
                        this.items[i].card[0].card[j].label == 'Is the trip starting from India :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.IsTripStartingFromIndia) :
                        this.items[i].card[0].card[j].label == 'Are all the travellers resident of India :' ? this.items[i].card[0].card[j].data = this.checkValidy(this.getTravelData.AreallthetravellersResidentofIndia) : ''
                    ) : ""
                }


            }


            this.infomationData[5].value = this.checkValidy(this.city+" , "+ this.state)

            console.log("DOB date ",this.getTravelData.TravellerDetails_Traveller1.DOB);



            // this.tripdate = parseInt(this.tripend)

            this.infomationData[7].value = this.checkValidy(this.tripstart + " - "+this.tripend)
            this.infomationData[0].value = this.travellerfirst+" "+this.travellerlast
            this.infomationData[3].value = this.travellertwofirst+" "+this.travellertwolast
            this.infomationData[1].value = this.getTravelData.travellingCountry

            this.traveleroneage = this.getTravelData.TravellerDetails_Traveller1.DOB
            this.traveleroneage = parseInt( this.traveleroneage)
            this.traveleroneage = moment(  this.traveleroneage).format('YYYY')
            var currentYear = moment().format('YYYY')
            this.personage1 = currentYear - this.traveleroneage
            console.log("person Age one",this.personage1)

            this.travelertwoage = this.getTravelData.Traveller2.DOB
            this.travelertwoage = parseInt( this.travelertwoage)
            this.travelertwoage = moment(  this.travelertwoage).format('YYYY')
            this.personage2 = currentYear - this.travelertwoage
            console.log("person Age two",this.personage2)

            this.infomationData[6].value = this.personage1 +" , "+this.personage2



            for (let i = 0; i < this.contactDetails.length; i++) {

                console.log('contact data',this.getTravelData.ContactDetails.FirstName)
                //    CONTACT DETAILS
                this.contactDetails[i].label == 'First Name :' ? this.contactDetails[0].data = this.checkValidy(this.getTravelData.ContactDetails.FirstName) :
                this.contactDetails[i].label == 'Last Name :' ? this.contactDetails[1].data = this.checkValidy(this.getTravelData.ContactDetails.LastName) :
                this.contactDetails[i].label == 'Email Address :' ? this.contactDetails[2].data = this.checkValidy(this.getTravelData.ContactDetails.EmailAddress) : ''
            }

        },


        computed: {
            timeline() {
                return this.events.slice().reverse()
            }
        },

        methods: {

            checkValidy(data) {
                if (data == "" || data == undefined || data == null || data == '' || data == 'null') {
                    return "-"
                } else {
                    return data;
                }
            },

             arrayToCSV(list) {
                let csv = "";
                for (let i = 0; i < list.length; i++) {
                    csv = csv == "" ? list[i] : csv + ',' + list[i];
                }
                return csv;
            },

        },
        // data: () => ({
        data() {
            return {
                moment:moment,
                download: '',
                travelfirst:'',
                pdffile: '',
                toemail: '',
                subject: '',
                username: '',
                getTravelData: [],
                dialogCfr: false,
                // showDocs:false,
                dialogDoc: false,
                rowsPerPageItems: [4, 8, 12],
                pagination: {
                    rowsPerPage: 4
                },
                events: [],
                input: null,
                nonce: 0,
                city:'',
                state:'',
                createddate:"",
                tripstart:"",
                tripend:'',
                tripdate:'',
                travellerfirst:"",
                travellerlast:'',
                travellertwofirst:'',
                travellertwolast:'',
                traveleroneage:'',
                travelertwoage:'',
                personage1:0,
                personage2:0,

                itemIMG: [{
                        label: 'PAN:',
                        src: 'web/assets/Image13.png'
                    },
                    {
                        label: 'DRIVING LICENSE:',
                        src: 'web/assets/Image13.png'
                    },
                    {
                        label: 'AADHAR:',
                        src: 'web/assets/Image13.png'
                    },
                    {
                        label: 'PREVIOUS POLICY DOCUMENT:',
                        src: 'web/assets/Image13.png'
                    },
                    {
                        label: 'REGISTRATION CARD:',
                        src: 'web/assets/Image13.png'
                    }

                ],


                items: travelDataList.Details,

                infomationData: [{
                    //     label: 'Mobile number :',
                    //     value: '5485 5340 8000'

                    // },
                    // {
                        label: 'Traveller 1 :',
                        value: 'Sunil Mishra'
                    },
                    {
                        label: 'Trip to :',
                        value: 'USA'
                    },
                    {
                        label: 'Email ID :',
                        value: 'salmanahemed@gmail.com'
                    },
                    {
                        label: 'Traveller 2 :',
                        value: 'Kavita Mishra'
                    },
                    {
                        label: 'Medical Cover :',
                        value: '₱ 50,000'
                    },

                    {
                        label: 'Location :',
                        value: 'Mumbai, Maharashtra'
                    },
                    {
                        label: 'Traveller Ages :',
                        value: '20 -23 yr'
                    },
                    {
                        label: 'Trip Duration :',
                        value: 'Oct 15th 2018 - Oct 24th 2018'
                    },

                ],


                // contactDetails: [{
                //         label: 'First Name :',
                //         data: 'Anu'
                //     },

                //     {
                //         label: 'Last Name :',
                //         data: 'Sharma'
                //     },

                //     {
                //         label: 'Email Address :',
                //         data: 'dk@grr.la'
                //     },
                // ]
            }
        }

        // })
    }
</script>
<style>
    .download-btn {
        background-color: rgba(0, 161, 255, 0.95);
        /* rgba(0, 161, 255, 0.95);  */
        border-color: rgb(255, 162, 0);
        color: white;
        padding-bottom: 12px;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 6px;
        text-decoration: none;
    }

    .box-color {
        background-color: #01B4BB
    }

    .font-color {
        color: #ffffff
    }

    .info-cmp-pd {
        padding: 18px;
    }

    .slf-align {
        align-self: stretch;
    }

    .font-decor {
        color: #01B4BB;
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
