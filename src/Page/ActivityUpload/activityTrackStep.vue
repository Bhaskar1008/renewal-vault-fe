<template>
     <v-stepper v-model="stepprStep" vertical>

        <!-- STEP 1 -->         
      <v-stepper-step  editable  step="1">
        Lead Data
        <!-- <small>Summarize if needed</small> -->
      </v-stepper-step>
  
      <v-stepper-content step="1">
        <v-card  class="mb-5" overflow >
            <v-stepper vertical>
                <v-stepper-step  editable step="1">New Lead Created </v-stepper-step>
                <v-stepper-content step="1">
                     <v-card  >
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Anuj Jha  9848488490</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:310px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step  editable step="2">Update - NC - Not Reachable</v-stepper-step>
                <v-stepper-content step="2">
                     <v-card>
                        <v-layout row  justify-space-between>
                        <v-flex>
                            <!-- <v-card-text style="padding:2px;color:grey">Anuj Jha  9848488490</v-card-text> -->
                        </v-flex>
                        <v-flex style="margin-left:450px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                     </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="3">Update - C -A  Call Back</v-stepper-step>
                <v-stepper-content step="3">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Call Back date-15.08.2018   Call Back time-16:30 PM</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:130px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>
            </v-stepper>
        </v-card>
        <!-- <v-btn color="primary" @click="stepprStep = 2">Continue</v-btn>
        <v-btn flat>Cancel</v-btn> -->
      </v-stepper-content>
        <!-- STEP-ENDS 1 -->      
  
        <!-- STEP 2 -->
      <v-stepper-step editable step="2">Appointment Data</v-stepper-step>
  
      <v-stepper-content step="2">
        <v-card class="mb-5">
            <v-stepper vertical>
                <v-stepper-step  editable step="1">New Appointment Created</v-stepper-step>
                <v-stepper-content step="1">
                     <v-card  >
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Appointment date-16.08.2018   Appointment time-12:30 PM</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:100px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step  editable step="2">Update - NA - Phone keeps ringing</v-stepper-step>
                <v-stepper-content step="2">
                     <v-card>
                        <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:390px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                     </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="3">Update - NM - Reschedule</v-stepper-step>
                <v-stepper-content step="3">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Appointment date-18.08.2018   Appointment time-12:30 PM</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:100px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="4">Update - M - Pitch</v-stepper-step>
                <v-stepper-content step="4">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:390px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="5">Update - M - Follow up</v-stepper-step>
                <v-stepper-content step="5">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Appointment date-18.08.2018   Appointment time-12:30 PM</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:100px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>
            </v-stepper>
        </v-card>

      </v-stepper-content>
        <!-- STEP-ENDS 2 -->            
  
        <!-- STEP 3 -->              
      <v-stepper-step editable step="3">Proposal</v-stepper-step>
  
      <v-stepper-content step="3">
        <v-card  class="mb-5">
            <v-stepper vertical>
                <v-stepper-step  editable step="1">New BI Created</v-stepper-step>
                <v-stepper-content step="1">
                     <v-card  >
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Product-Super Money Back   Annual Premium-Rs. 209,099
                            </v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:120px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step  editable step="2">Document Uploaded</v-stepper-step>
                <v-stepper-content step="2">
                     <v-card>
                        <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:390px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                     </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="3">Payment Captured</v-stepper-step>
                <v-stepper-content step="3">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Cheque Mode   Rs. 80,450</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:315px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="4">Requirement Raised</v-stepper-step>
                <v-stepper-content step="4">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">FTNR   Document Needed   Ops 49083</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:245px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="5">Requirement Raised</v-stepper-step>
                <v-stepper-content step="5">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">UW   Medicals Required   UW 93888</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:260px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="6">Document Uploaded</v-stepper-step>
                <v-stepper-content step="6">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">FTNR   Document Needed</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:315px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="7">Requirement Raised</v-stepper-step>
                <v-stepper-content step="7">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">UW   BOP  UW 93888</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:350px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step editable step="8">Payment Captured</v-stepper-step>
                <v-stepper-content step="8">
                     <v-card>
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">UW   BOP   Anand Joshi</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:335px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>
            </v-stepper>
        </v-card>
       
      </v-stepper-content>
        <!-- STEP-ENDS 3 -->            
  
        <!-- STEP 4 -->              
      <v-stepper-step editable step="4">Issuance</v-stepper-step>
      <v-stepper-content step="4">
        <v-card  class="mb-5">
            <v-stepper vertical>
                <v-stepper-step  editable step="1">Policy Confirmed </v-stepper-step>
                <v-stepper-content step="1">
                     <v-card  >
                         <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">Policy ID - AR938883   Docket No.-DFX884848Â    UW 93888</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:118px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                        </v-card>
                </v-stepper-content>

                <v-stepper-step  editable step="2">Policy Rejected</v-stepper-step>
                <v-stepper-content step="2">
                     <v-card>
                        <v-layout row  justify-space-between>
                        <v-flex>
                            <v-card-text style="padding:2px;color:grey">UW Decision   Medical Grounds   UW 93888</v-card-text>
                        </v-flex>
                        <v-flex style="margin-left:215px;">
                            <v-card-text style="padding:2px;color:grey">Anand Joshi</v-card-text>
                            <v-card-text style="padding:2px;color:grey">  12.08.2018  11:24 AM</v-card-text>
                                               
                        </v-flex>
                        </v-layout>
                     </v-card>
                </v-stepper-content>

               
            </v-stepper>
        </v-card>
        
      </v-stepper-content>
        <!-- STEP-ENDS 4 -->      
    </v-stepper>
    
</template>
<script>
export default {
    data(){
        return{
            stepprStep: 1
        }
    }
}
</script>
<style>

</style>
