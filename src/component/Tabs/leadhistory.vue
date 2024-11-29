<template>

<div>
    <div class="masterhistory">
        <v-layout>
            <v-card class="historytimeline" flat>

                    <template>
                    <v-stepper v-model="e6" vertical flat>
                        <v-stepper-step :complete="e6 > 1" step="1">
                        Select an app
                        <small>Summarize if needed</small>
                        </v-stepper-step>

                        <v-stepper-content step="1">
                        
                        <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

                        <v-stepper-content step="2">
                        
                        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

                        <v-stepper-content step="3">
                        
                        <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>
                        </v-stepper-content>

                        <v-stepper-step step="4">View setup instructions</v-stepper-step>
                        <v-stepper-content step="4">
                        <!-- <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card> -->
                        <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>
                        </v-stepper-content>
                    </v-stepper>
                    </template>
            </v-card>
        </v-layout>
    </div>
</div>
    
</template>



<script>
export default {
     data () {
      return {
        e6: 1
      }
    }
}
</script>

<style>

.masterhistory{
    display:flex;
    margin:20px;
    justify-content: center;
    align-items: center;
}
.historytimeline{
    flex:1;
}


</style>
