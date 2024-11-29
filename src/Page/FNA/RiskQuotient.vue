<template>
    <v-app>
        <v-card>
            <v-card-title primary-title><h1 style="color:#1a4b9b;"> Your Risk Quotient</h1></v-card-title>
                

      <v-card-text>
        <v-stepper alt-labels v-model="e1" >
          <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1" @click.native="e1=1">Very Cautious Invester</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2" @click.native="e1=2">Cautious Investor</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3" @click.native="e1=3">Moderate Investor</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 4" step="4"  @click.native="e1=4">Aggressive</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 5" step="5"  @click.native="e1=5">Very Aggressive Investor</v-stepper-step>
      

         </v-stepper-header>

         <v-stepper-content step="1">
          
        <v-card
          class="mb-3">
                <v-layout row justify-space-between> 
                   
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px; font-size:16px; font-weight:bold ">
                <h2>You are very Cautious Investor</h2>
            </v-text>
            
        </div>
        
                </v-layout>
        
        </v-card>
        <p>As a Growth Investor your pimary objective is to grow over medium and long term. 
            You may understand the equity markets and their potential in long term and willing to takeon added risk. 
            You would be aware that you may get less than waht you invested</p>
      </v-stepper-content>

        <v-stepper-content step="2">
            <v-card
                class="mb-3">
               <v-layout row justify-space-between>
        
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px;font-size:16px; font-weight:bold">
               <h2> You are Cautious Investor</h2>
            </v-text>
        </div>
        
        </v-layout>
        </v-card>
        <p>As a Growth Investor your pimary objective is to grow over medium and long term. 
            You may understand the equity markets and their potential in long term and willing to takeon added risk. 
            You would be aware that you may get less than waht you invested</p>
      </v-stepper-content>

            <v-stepper-content step="3">
        <v-card
          class="mb-3">
            <v-layout row justify-space-between="">
        
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px;font-size:16px; font-weight:bold">
              <h2> You are Moderate Investor</h2>
            </v-text>
        </div>
        
            </v-layout>
          </v-card>
          <p>As a Growth Investor your pimary objective is to grow over medium and long term. 
            You may understand the equity markets and their potential in long term and willing to takeon added risk. 
            You would be aware that you may get less than waht you invested</p>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card
          class="mb-3"
          >
          <v-layout row justify-space-between>

        
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px; font-size:16px; font-weight:bold">
              <h2> You are Aggressive Investor</h2>
            </v-text>
        </div>
        </v-layout>
        </v-card>
        <p>As a Growth Investor your pimary objective is to grow over medium and long term. 
            You may understand the equity markets and their potential in long term and willing to takeon added risk. 
            You would be aware that you may get less than waht you invested</p>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card
          class="mb-3">
          <v-layout row justify-space-between>

        
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px; font-size:16px; font-weight:bold">
               <h2> You are very Aggressive Investor</h2>
            </v-text>
        </div>
        </v-layout>
        </v-card>
        <p>As a Growth Investor your pimary objective is to grow over medium and long term. 
            You may understand the equity markets and their potential in long term and willing to takeon added risk. 
            You would be aware that you may get less than waht you invested</p>
      </v-stepper-content>


        
      
    
        </v-stepper>
          
          <!-- <v-layout row wrap>
        <v-slider
          v-model="fruits"
          :tick-labels="ticksLabels"
          :max="4"
          step="1"
          thumb-label="You"
          ticks="always"
          tick-size="2"
        ></v-slider>
        </v-layout>
        

        <v-flex mt-5>
        <v-title><h1 style="color:#1a4b9b;">{{sub_title[3]}}</h1></v-title>
        </v-flex>
        <hr>
        <v-flex mt-3>
        <p>{{details[0]}}</p>
        </v-flex> -->
      </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
export default {
    data () {
    return {
    e1: 0
    //  fruits: 0,
    //   ticksLabels: [
    //     'Very Cautious Invester',
    //     'Cautious Investor',
    //     'Moderate Investor',
    //     'Aggressive',
    //     'Very Aggressive Investor'
    //   ],
    //   sub_title:['You are Very Cautious Invester',
    //              'You are Cautious Investor',
    //              'You are Moderate Investor',
    //              'You are Aggressive Investor',
    //              'You are Very Aggressive Investor'
    //   ],
    //   details:['As a Growth Investor your pimary objective is to grow over medium and long term. You may understand']
    }
  },
  methods: {
    season (val) {
      return this.seasons[val]
    }
  }
}
</script>

