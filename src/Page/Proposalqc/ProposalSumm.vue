<template>
<v-app>
    <v-container fluid grid-list-md  style="margin-top:6px">
        <v-layout v-if="showRejectApprove === true">
            <div>
                 <v-btn small outline color="secondary" @click="changeStatus('rejected')">Reject Case</v-btn>
            </div>
            <div>
                <v-btn small color="secondary" text-color="white" @click="changeStatus('issued')">Approve Case</v-btn>
            </div>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 md8>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card color="white" class="crd-lyt-mange">
                            <v-layout row wrap style="align-items:center">
                                <flex xs2>
                                    <div  class="avtr-mgn">
                                    <v-avatar color="teal">
                                        <span class="white--text headline">{{propDetails.benefitIllustration.NameofLifeAssured | name-shorter}}</span>
                                    </v-avatar>
                                    </div>
                                </flex>
                                <div class="crd-cntnt-wdt">
                                    <!-- new code -->
                                    <div class="dtls-flx-row" style="flex:1">
                                        <div class="">
                                            <P class="subheading mb-0 txt-clr" >{{propDetails.benefitIllustration.NameofLifeAssured | to-capitlaize}} | {{propDetails.benefitIllustration.GenderofLifeAssured}}</P>
                                        </div>
                                        <div class="">
                                            <P class="subheading mb-0 txt-clr" >{{propDetails._id | id-filter}}</P>
                                        </div>
                                    </div>

                                    <div class="dtls-flx-row" style="padding-top:7px;padding-bottom:7px;">
                                        <div class="">
                                            <P class="caption mb-0 txt-clr" > DOB- {{propDetails.benefitIllustration.DateofBirthofLifeAssured}} | 34 years</P>
                                        </div>
                                        <div class="">
                                            <P class="caption mb-0 txt-clr" >Created On- {{new Date(propDetails.createdDate).toLocaleDateString()}}</P>
                                        </div>
                                    </div>
                                    <div class="dtls-flx-row">
                                        <div class="">
                                            <P class="caption mb-0 txt-clr" >App No: {{propDetails._id | id-filter}}- {{propDetails.productId.productName}}</P>
                                        </div>
                                    </div>
                                </div>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex>
                        <v-card color="white" >
                            <prop-summ-compo @docDataUpload="docStats" @premiumReciept="premStats" :proposal-data="propDetails"></prop-summ-compo>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 sm4 md4>
                <v-layout row wrap>
                    <v-flex d-flex xs12>
                        <v-card dark color="white">
                            <div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >Application Status </P>
                                    <P class="body-1 mb-0" :style={color:statusColor}>{{appStatus}}</P>
                                </div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >Premium Status </P>
                                    <P class="body-1 mb-0 "  :style={color:prem_color} >{{prem_recieve}}</P>
                                </div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >Document Status </P>
                                    <div>
                                        <div  v-for="(item,li) in docStatus.final_doc" :key="li" v-if="cfrLen !== 0" >
                                            <div v-if="li === 0">
                                                <span class="body-1 mb-0" :style={color:doc_color} >{{ item.type_issue }}</span>
                                            </div>
                                            <div style="display: flex;justify-content: flex-end;">
                                                <span v-if="li === 1" class="grey--text caption" >(+{{ item.length - 1 }} others)</span>
                                            </div>
                                        </div>
                                        <P  v-else class="body-1 mb-0 "  :style={color:doc_color} >{{docStatus.final_doc[0].type_issue}}</P>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </v-flex>

                    <v-flex d-flex xs12>
                        <v-card color="white" dark>
                            <div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-2 mb-0 txt-clr" >Personal Details</P>
                                </div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >Client ID</P>
                                    <P class="body-1 mb-0 txt-clr" >{{propDetails.leadId._id | id-filter}}</P>
                                </div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >State</P>
                                    <P class="body-1 mb-0 txt-clr" >{{propDetails.leadId.state}}</P>
                                </div>
                                    <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >City</P>
                                    <P class="body-1 mb-0 txt-clr" >{{propDetails.leadId.city}}</P>
                                </div>
                                    <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >Mobile</P>
                                    <P class="body-1 mb-0 txt-clr" >{{propDetails.leadId.primaryMobile}}</P>
                                </div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >Email</P>
                                    <P class="body-1 mb-0 txt-clr" >{{propDetails.leadId.email}}</P>
                                </div>
                            </div>
                        </v-card>
                    </v-flex>

                    <v-flex d-flex xs12>
                        <v-card color="white" dark>
                            <div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-2 mb-0 txt-clr" >Policy Details</P>
                                </div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >PT/PPT</P>
                                    <P class="body-1 mb-0 txt-clr" >{{propDetails.benefitIllustration.PolicyTerm}}/{{propDetails.benefitIllustration.PremiumPayingTerm}}</P>
                                </div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >Frequency </P>
                                    <P class="body-1 mb-0 txt-clr" >{{propDetails.benefitIllustration.AnnuityFrequency}}</P>
                                </div>
                                <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >Premium</P>
                                    <P class="body-1 mb-0 txt-clr" >{{propDetails.benefitIllustration.annualisedPremium}}</P>
                                </div>
                                    <div class="propal-sum-flx-rw" >
                                    <P class="body-1 mb-0 txt-clr" >SA</P>
                                    <P class="body-1 mb-0 txt-clr" >{{propDetails.benefitIllustration.SumAssured}}</P>
                                </div>
                            </div>
                        </v-card>
                    </v-flex>

                    <v-flex d-flex >
                        <v-layout row wrap>
                            <v-flex d-flex>
                                <v-card color="white" dark>
                                    <div>
                                        <div class="propal-sum-flx-rw" >
                                            <P class="body-2 mb-0 txt-clr" >Activity Log</P>
                                        </div>
                                        <div class="propal-sum-flx-rw" >
                                            <P class="body-1 mb-0 txt-clr" >Document CFR</P>
                                            <P class="body-1 mb-0 txt-clr" >OP98830</P>
                                            <P class="body-1 mb-0 txt-clr" >03/04/2018 15:09</P>
                                        </div>
                                        <div class="propal-sum-flx-rw" >
                                            <P class="body-1 mb-0 txt-clr" >Document Verified</P>
                                            <P class="body-1 mb-0 txt-clr" style="padding-right:19px;">OP98830</P>
                                            <P class="body-1 mb-0 txt-clr" >03/04/2018 15:09</P>
                                        </div>
                                        <div class="propal-sum-flx-rw" >
                                            <P class="body-1 mb-0 txt-clr" >Premium Verified</P>
                                            <P class="body-1 mb-0 txt-clr" style="padding-right:9px;">OP98830</P>
                                            <P class="body-1 mb-0 txt-clr" >03/04/2018 15:09</P>
                                        </div>
                                        <div class="propal-sum-flx-rw" >
                                            <P class="body-1 mb-0 txt-clr" >Case Created</P>
                                            <P class="body-1 mb-0 txt-clr" style="padding-left:14px;">OP98830</P>
                                            <P class="body-1 mb-0 txt-clr" >03/04/2018 15:09</P>
                                        </div>
                                        <div style="margin-left: 261px" >
                                            <v-layout row justify-center>
                                                <v-btn flat color="secondary" @click.native.stop="dialog1 = true">view all</v-btn>
                                                <v-dialog v-model="dialog1" max-width="500">
                                                    <v-card>
                                                        <div style="background-color:#3a3a3a">
                                                        <v-card-title class="title" style="color:white">Activity Log</v-card-title>
                                                        </div>
                                                        <v-flex xs11 ml-3>
                                                        <!-- <v-text-field v-model="comment1" label="comment" required></v-text-field>             -->
                                                            <v-data-table
                                                                    :headers="headersAL"
                                                                    :items="TblDataAL"
                                                                    hide-actions
                                                                    class="elevation-1"
                                                                >
                                                            <template slot="items" slot-scope="props">
                                                                <td>{{ props.item.Type }}</td>
                                                                <td class="text-xs-left">{{ props.item.ID }}</td>
                                                                <td class="text-xs-left">{{ props.item.DateandTime}}</td>

                                                                <td class="justify-center layout px-0">
                                                                </td>
                                                            </template>
                                                        </v-data-table>
                                                        </v-flex>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn color="secondary" flat="flat" @click.native="dialog1=false">Cancel</v-btn>
                                                            <v-btn color="secondary" @click.native=" dialog1=false">Submit</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </v-layout>
                                        </div>
                                    </div>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</v-app>
</template>

<script>
// import proposalFulfilment from './Proposalfulfilment'
import propSummCompo from '../../component/prop-summ-compo'
import axios from 'axios' ;
import { mapMutations } from 'vuex';
import store from '../../store/index'

export default {
    data: () => ({
        dialog1:false,
        drawer:false,
        showRejectApprove:false,
        propDetails:{},
        CFRDetails:{},
        obj:[],
        tabs:[],
        appStatus:'',
        statusColor:'',
        prem_recieve:'',
        prem_color:'',
        doc_recieve:{},
        doc_color:'',
        cfrLen:'',
        // docsData:{},
        final_doc:[],
        headersAL: [
            {
            text: 'Type',
            align: 'left',
            //   sortable: false,
            value: 'Type'
            },
            { text: 'ID', value: 'ID' },
            { text: 'Date and Time', value: 'DatendsTime' },
        ],
        prmiumRecipt: null
    }),
    components:{
        propSummCompo,
    },

    mounted(){

    },
    beforeMount(){
        let self = this;
        self.propDetails =  self.$store.getters.getProposalDetails
        // console.log('D.A.T.A. ',self.propDetails)
    },
    computed:{
        docStatus(){
            let self = this;
            // this.final_doc = []
            console.log('MOunt DOCS: ',store.state.documentUpload)
            // console.log('doc_recieve_: ',this.doc_recieve)
            let docs = store.state.documentUpload
            self.propDetails =  self.propDetails
            let cfrDetails = self.propDetails.cfrdetails
            this.cfrLen = self.propDetails.cfrdetails.length
            console.log('CFRRRRRR M;',cfrDetails)
            // this.final_doc = []
            // console.log('final_doc_ OUTSIDE: ',this.final_doc)
            if(cfrDetails.length !== 0){
                for(let i = 0; i < cfrDetails.length; i++){
                    if(cfrDetails[i].categoryofIssue === "Document" ){
                        let data = {
                            type_issue:cfrDetails[i].typeofIssue,
                            length:cfrDetails.length
                        }
                        console.log('final_doc_ DTAA : ',data)
                        this.final_doc.push(data)
                        console.log('final_doc_ : ',this.final_doc)
                        this.doc_color = 'red'
                        return{
                            final_doc:this.final_doc,
                            doc_color:this.doc_color,
                        }
                    }
                }
            }else if(docs.length !== 0 ){
                this.final_doc = []
                let data = {
                    type_issue:'Recieved',
                    length:cfrDetails.length
                }
                this.final_doc.push(data)
                console.log('final_doc_ ELSE: ',this.final_doc)
                this.doc_color = 'green'
                return{
                    final_doc:this.final_doc,
                    doc_color:this.doc_color,
                }
            }else{
                this.final_doc = []
                let data = {
                    type_issue:'-',
                    length:cfrDetails.length
                }
                this.final_doc.push(data)
                this.doc_color = 'black'
                return{
                    final_doc:this.final_doc,
                    doc_color:this.doc_color,
                }
            }
        }
    },
    created () {
        let self = this;
        self.propDetails =  self.$store.getters.getProposalDetails
        console.log('Proposal Data',self.propDetails) ;

        if(self.propDetails.proposalStatus !== 'issued'){
            this.showRejectApprove = true;
        }else{
            this.showRejectApprove = false;
        }

        if(self.propDetails.proposalStatus == "Proposalstarted" ){
            this.appStatus = "CFR Raised"
            this.statusColor = 'red'
        }else if(self.propDetails.proposalStatus == "issued" ){
            this.appStatus = "Issued"
            this.statusColor = 'green'
        }else if(self.propDetails.proposalStatus == "login" ){
            this.appStatus = "Login"
            this.statusColor = 'green'
        }else if(self.propDetails.proposalStatus == "rejected" ){
            this.appStatus = "Rejected"
            this.statusColor = 'red'
        }

        // CFR DETAILS by Salman
        //    console.log('CFR Details',this.$store.getters.getCFRDetails)
        // self.CFRDetails =  self.$store.getters.getCFRDetails
        //  console.log('CFR Details',self.CFRDetails) ;
        this.initialize()
        // this.docStats()
    },
    methods:{

      ...mapMutations(['showSnackbar', 'closeSnackbar']),

		 jump(to) {
                if (this.$router) {
                    this.$router.push(to)
                }
            },

            openDialogBoxPS(ind){
                console.log(ind)
                console.log('Hellooo')
                this.dialog1 = true
            },
            premStats(ev){
                console.log('PREM_DATA_: ', ev)
                if(ev.length !== 0){
                    this.prem_recieve = 'Recieved'
                    this.prem_color = 'green'
                }else{
                    this.prem_recieve = 'Pending'
                    this.prem_color = 'red'
                }
            },
            docStats(docs){
                console.log('DOCS_DATA_UP_',docs)
                // this.docsData = docs
                // for(let i = 0 ; i < docs.length; i++){
                //     if(docs.length !== 0 ){
                //         this.doc_recieve = 'Recieved'
                //         this.doc_color = 'green'
                //     }else {
                //         this.doc_recieve = docs[i].document_sub_type
                //         this.doc_color = 'red'
                //     }
                // }
            },

        // getPrimiumReciptDetails(resp) {

        //     let result = [];

        //     for(let i = 0; i < resp.length; i++) {
        //         let _obj = {
        //             Type: resp[i].benefitIllustration.PremiumType,
        //             Nature: resp[i].benefitIllustration.PremiumMode,
        //             Amount: resp[i].benefitIllustration.SumAssured,
        //             Reciepting: 'Done',
        //             TokenNo:'-',
        //             BankCode:'-',
        //         };
        //         result.push(JSON.parse(JSON.stringify(Object.assign({}, _obj))));
        //     }

        //     return result;
        // },

        initialize(){
            this.TblDataAL = [
                {
                    Type:'Document CFR',
                    ID:'OP98830',
                    DateandTime:'03/04/2018  15:09',
                },
                {
                    Type:'Document Verified',
                    ID:'OP98830',
                    DateandTime:'03/04/2018  15:09',
                },
                {
                    Type:'Premium Verified',
                    ID:'OP98830',
                    DateandTime:'03/04/2018  15:09',
                },
                {
                    Type:'Case Created',
                    ID:'OP98830',
                    DateandTime:'03/04/2018  15:09',
                },
            ]
        },

        changeStatus(status) {
            var self = this;
            // let API = "http://172.16.63.198:5010/secure/admin/chProposalStatus?proposalStatus="+status+"&proposal_Id=5be04df4788c6f59f5bbbebc";
            let API = 'chProposalStatus?proposalStatus='+status+'&proposal_Id='+self.propDetails._id;

            this.PUT(API , function(res , error) {
                /**
                 * @author Khan Usama
                 * Send notification when policy is rejected or issued
                 * Date 12/Nov/2018
                 */

                let issuBody =self.propDetails.personalDetails.FullName+"|"+'A'+self.propDetails.application_code
                let rejectBody = self.propDetails.personalDetails.FullName+"|"+'A'+self.propDetails.application_code;

                let notifyBody = {
                    userId : self.getAgentInfo()._id,
                    first_name: self.propDetails.personalDetails.FullName,
                    notification_body: status == 'issued'? issuBody : status == 'rejected' ? rejectBody : '' ,
                    CFRType: status == 'issued'? 'Proposal Issued' : status == 'rejected' ? 'Proposal Rejected' : '' ,
                    notification_type: 'applications',
                    notification_subtype: '',
                    proposal_Id:self.propDetails._id,
                    notification_status: status,
                    PlanName: self.propDetails.productId.productName,
                    PremiumAmount: self.propDetails.benefitIllustration.InstallmentPremium,
                    // CFRType:'Proposal issued'

                    // notification_body: response.data.errMsg.benefitIllustration.NameofLifeAssured +
                    //                         "|" +
                    //                         userIdentity +
                    //                         "|" +
                };

                self.showSnackbar(
                    {   text: status == 'issued'? 'Proposal Issued by admin' : 'Proposal Rejected by admin',
                        color: status == 'issued' ? 'green' : 'red'})


                this.POSTUSER("sendnotification/"+this.propDetails.leadId.userId, notifyBody , function (resp, error ) {
                    console.log(resp , 'GOT SEND NOTIGY DKKK')
                    // self.showSnackbar({text: 'Notification Send', color:'green'})

                    /**
                     * @author Khan Usama
                     * Date: 17/07/2019
                     *
                     * @description socket implementation: Socket emit event, notification is hit
                     */
                    let socket_data = {
                        message: "Policy aproved",
                        proposal_id: self.propDetails._id,
                        user_id: self.propDetails.leadId.userId
                    }
                    console.log('notification of socket', socket_data);
                    self.$socket.emit("pushNotification", socket_data);
                });
               
            })

        },
        approveForIsuance(){


            let self = this;
            const NotifyData = {
                first_name: "shoaib khan CFR",
                notification_body: "First Name CRF" +
                    "|" +
                    +
                    "|" +
                    "Deadline:",
                //   moment(createddate).format("L"),
                notification_type: "applications",
                notification_subtype: "new",
                PlanName: "CFR PlanName", // plan option
                PremiumAmount: "CFR PremiumAmount", //Installment Premium
                // CFRType:CFRType ,
                // LoginDate:LoginDate ,
                // Deadline:Deadline ,  // Ashraf
            };

            //    ashraf api call

            this.POST('cfr/'+this.propDetails._id,{
                cfr_status:'open',
                cfr_type:'document_needed'
            } , function (res , error) {
                console.log(res.data.errMsg);
                this.obj = res.data.errMsg[0];

                // Shoaib 4/7/2018  TO send notification to Agent about CFR status
                if(res.data.errCode === -1) {
                    // this.propDetails.userId._id ="A"+ this.propDetails.userId._id.slice(16,25).toUpperCase();
                    this.propDetails.userId._id ="A"+ this.propDetails.application_code.slice(16,25).toUpperCase();
                    console.log("proposal ID check",this.propDetails.userId._id);

                    this.POSTUSER("sendnotification/" + this.propDetails.leadId.userId, {
                        first_name: this.propDetails.benefitIllustration.NameofLifeAssured,
                        notification_body: this.propDetails.benefitIllustration.NameofLifeAssured +
                            "|" +
                            this.propDetails.application_code +
                            "|" +
                            "Deadline:" +
                            new Date(this.propDetails.createdDate).toLocaleDateString(),
                        //  moment(createdDate).format("L") ,
                        // notification_type:this.propDetails.cfrStatus,
                        notification_type: 'applications',
                        // notification_subtype: 'Needed',
                        notifications_subtype: this.propDetails.cfrType,
                        notification_status: "cfr",
                        // notifications_status:this.propDetails.cfrStatus,

                        PlanName: this.propDetails.productId.productName, // plan option
                        PremiumAmount: this.propDetails.benefitIllustration.InstallmentPremium //Installment Premium
                    } , function (res ,error) {
                        console.log(res.data.errMsg);
                        this.obj = res.data.errMsg[0];
                    })
                }
                // End Send notificaiton
            })
        }
    }
}
</script>

<style scoped>
    .card-1 {
		/* padding-left: 5px;
        padding-bottom: 10px;
        padding-top: 12px; */
	}
    .card-1-1 {
		padding-left: 80px;
        /* padding-bottom: 10px; */
        padding-top: 12px;
	}
	.card-1 p {
		text-align: left;
	}
    .txt-clr{
        color: black;
    }

    .propal-sum-flx-rw {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 15px;
        padding-right: 15px;
        /* margin-bottom: 10px; */
        padding-bottom: 8px;
        padding-top: 6px;
    }
    .crd-cntnt-wdt{
        width: 74%;
    }
    .avtr-mgn{
        padding: 20px;
        margin-left: 0px;
    }

    /* Top card */

    .dtls-flx-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .crd-lyt-mange {
        height: 103px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .lead-header{
    display: flex;
    /* margin: auto;     */
    flex-direction: row;
    align-items: center;
    /* flex: 1; */
    }

    @media screen and (min-width: 320px) {
        .crd-cntnt-wdt{
        width: 77%;
    }
    .card-1 {
        /* display: flex;
		padding-left: 80px;
        padding-bottom: 10px;
        padding-top: 8px; */
	}
    .card-1-1 {
        display: flex;

		padding-left: 80px;
        /* padding-bottom: 10px; */
        padding-top: 8px;
	}
    .avtr-mgn{
        padding: 20px;
        margin-left: 128px;
    }

}
    @media screen and (min-width: 768px) {
         .crd-cntnt-wdt{
        width: 72%;
    }

    .avtr-mgn{
        padding: 10px;
        /* margin-left: 128px; */
    }
    }
    @media screen and (min-width: 992px) {
        .crd-cntnt-wdt{
        width: 59%;
    }
    .card-1 {
        /* display: flex;
		padding-left: 20px;
        padding-bottom: 10px;
        padding-top: 15px; */
	}
    .card-1-1 {
        display: flex;

		padding-left: 18px;
        padding-bottom: 10px;
        padding-top: 15px;
	}
    .avtr-mgn{
        padding: 20px;
        margin-left: 0px;
    }
    }

</style>

