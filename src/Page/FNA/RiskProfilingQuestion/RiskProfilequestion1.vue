<template>
<v-app>
    
     <v-container>
         <!-- Question 1 -->
          <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1" @click.native="e1=1">Step1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2" @click.native="e1=2"></v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3" @click.native="e1=3"></v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 4" step="4"  @click.native="e1=4"></v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 5" step="5"  @click.native="e1=5"></v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 6" step="6"  @click.native="e1=6"></v-stepper-step>

         
      
    </v-stepper-header>

    <div class =" pt-4 pl-4">
            <v-text style="color:#1a4b9b;font-size:18px; font-weight:bold">
                Understanding Your Risk Profle
            </v-text>
        </div>
 
    <v-stepper-items>
        
            
      <v-stepper-content step="1">
          
        <v-card
          class="mb-3">
                <v-layout row justify-space-between> 
                    <div >
          <!-- <div class =" pt-3">
            <v-text style="color:#1a4b9b;font-size:18px; font-weight:bold">
                Understanding Your Risk Profle
            </v-text>
        </div> -->
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px; font-size:16px; font-weight:bold ">
                What is the first though to cross your mind you invest your money?
            </v-text>
        </div>
        <div >
        <v-radio-group >    
        
         <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 2">
			<v-radio  value="radio-1" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text> I should not lose my money</v-text> 
            </div>	      
            
        </div>
        
        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 2">
			<v-radio  value="radio-2" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px; color:#7a7d82">                        
                <v-text> This should not turn out to be a bad investment</v-text> 
            </div>
        </div>   	
        

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 2">
			<v-radio  value="radio-3" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text> This should not tirn out to be a good investment</v-text> 
            </div>	      
            
        </div>

         <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 2">
			<v-radio  value="radio-4" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text> I know this is a good decision</v-text> 
            </div>
         </div>	
            </v-radio-group>
            </div>
            </div>
             <div class="pt-3 pr-2 hidden-sm-and-down  "  >
            
                <img  src="https://www.onlinetips4investment.com/wp-content/uploads/2015/02/buy-sites.jpg" height="250px" >

            
            </div>
            </v-layout> 
        </v-card>
       
        

        <v-layout row justify-space-between>
         <v-btn flat @click.native="jump('/analysiseducation')">Previous</v-btn>
        <v-btn
        
          color="primary"
          @click="e1 = 2">
          Continue
        </v-btn>
        </v-layout>
      </v-stepper-content>
      
      
      

      <v-stepper-content step="2">
            <v-card
                class="mb-3">
               <v-layout row justify-space-between>

         <div >
          <!-- <div class =" pt-3">
            <v-text style="color:#1a4b9b ;font-size:18px; font-weight:bold">
                Understanding Your Risk Profle
            </v-text>
        </div> -->
        
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px;font-size:16px; font-weight:bold">
                What do you normally associate with the word 'risk' ?
            </v-text>
        </div>
        <div >
        <v-radio-group >
            

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 3">
			<v-radio  value="radio-1" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82" >                        
                <v-text> Danger</v-text> 
            </div>	      
            
        </div>
            

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 3">
			<v-radio  value="radio-2" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text> Uncertainty</v-text> 
            </div>	      
            
        </div>
       
        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 3">
			<v-radio  value="radio-3" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text> Opportunity</v-text> 
            </div>	      
            
        </div>
        

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 3">
			<v-radio  value="radio-4" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Thrill</v-text> 
            </div>	      
            
        </div>
            </v-radio-group>
            </div>
            </div>

                <div class="pt-3 pr-2 hidden-sm-and-down ">
                    <img src="https://sloanreview.mit.edu/content/uploads/2017/07/GEN-Reeves-Leadership-1200-300x300.jpg" height:300px>
                </div>

            </v-layout>
            </v-card>
          <v-layout row justify-space-between>
        <v-btn flat @click.native="e1 = 1">Previous</v-btn>
        
        <v-btn
          color="primary"
          @click="e1 = 3">
          Continue
        </v-btn> 
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-3">
            <v-layout row justify-space-between="">
        <div >
          <!-- <div class =" pt-3">
            <v-text style="color:#1a4b9b;font-size:18px; font-weight:bold">
                Understanding Your Risk Profle
            </v-text>
        </div> -->
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px;font-size:16px; font-weight:bold">
                Would you prefer to run your own business or be a salaried employee?
            </v-text>
        </div>
        <div >
        <v-radio-group >    
        

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 4">
			<v-radio  value="radio-1" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Being a salaried employee</v-text> 
            </div>	      
            
        </div>
        

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 4">
			<v-radio  value="radio-2" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Being a salaried employee while running a part-time business</v-text> 
            </div>	      
            
        </div>
        

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 4">
			<v-radio  value="radio-3" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Running a partnership business</v-text> 
            </div>	      
            
        </div>
        

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 4">
			<v-radio  value="radio-4" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Running my own business</v-text> 
            </div>	      
            
        </div>
            </v-radio-group>
            </div>
            </div>
            <div class="pt-3 pr-2 hidden-sm-and-down ">
                <img src="https://widoobizweb.s3.amazonaws.com/wp-content/uploads/2014/04/prise-de-decision-680x453.png" height=250px>
            </div>
            </v-layout>
          </v-card>
          <v-layout row justify-space-between>
         <v-btn flat @click.native="e1 = 2">Previous</v-btn>
        <v-btn
        
          color="primary"
          @click="e1 = 4">
          Continue
        </v-btn>
       
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card
          class="mb-3"
          >
          <v-layout row justify-space-between>

        <div >
          <!-- <div class =" pt-3">
            <v-text style="color:#1a4b9b; font-size:18px; font-weight:bold">
                Understanding Your Risk Profle
            </v-text>
        </div> -->
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px; font-size:16px; font-weight:bold">
               To what extent would you expose your investments to risk, to earn higher returns?
            </v-text>
        </div>
        <div >
        <v-radio-group >    
        

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 5">
			<v-radio  value="radio-1" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>None at all</v-text> 
            </div>	      
            
        </div>
       

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 5">
			<v-radio  value="radio-2" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>About 20%</v-text> 
            </div>	      
            
        </div>
        

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 5">
			<v-radio  value="radio-3" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>About 40%</v-text> 
            </div>	      
            
        </div>
    

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 5">
			<v-radio  value="radio-4" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>More than 50%</v-text> 
            </div>	      
            
        </div>
            </v-radio-group>
            </div>
            </div>
            <div class="pt-3 pr-2 hidden-sm-and-down ">
                <!-- <img src="https://cdn.investinblockchain.com/wp-content/uploads/2018/02/iStock-51560462033.png?x88891" height=250px> -->
            </div>
            </v-layout>
          </v-card>

        <v-layout row justify-space-between="">
        <v-btn flat @click.native="e1 = 3">Previous</v-btn>
        <v-btn
          color="primary"
          @click="e1 = 5">
          Continue
        </v-btn>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card
          class="mb-3">
          <v-layout row justify-space-between>

        <div >
          <!-- <div class =" pt-3">
            <v-text style="color:#1a4b9b; font-size:18px; font-weight:bold">
                Understanding Your Risk Profle
            </v-text>
        </div> -->
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px; font-size:16px; font-weight:bold">
                How would you feel if the performance of your recent investments are below expectations?
            </v-text>
        </div>
        <div >
        <v-radio-group >
            

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 6">
			<v-radio  value="radio-1" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Very upset</v-text> 
            </div>
        </div>

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 6">
			<v-radio  value="radio-2" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Somewhat upset, but hope that it will improve in the future</v-text> 
            </div>
        </div>

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 6">
			<v-radio  value="radio-3" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Uneasy but willing to take it in my stride</v-text> 
            </div>
        </div>    
        

        <div class="pt-4 "  style="display:flex; ">
            <div @click="e1 = 6">
			<v-radio  value="radio-4" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Not upset because I know that all investments carry risk</v-text> 
            </div>
        </div>
            </v-radio-group>
            </div>
            </div>
            <div class="pt-3 pr-2 hidden-sm-and-down ">
                <img src="https://www.web4business.com.au/wp-content/uploads/2014/08/Happycustomers5.jpg" height=250px>
            </div>
            </v-layout>
          </v-card>

        <v-layout row justify-space-between="">
                <v-btn flat @click.native="e1 = 4">Previous</v-btn>
                <v-btn
                color="primary"
                @click="e1 = 6">
                Continue
                </v-btn> 
        </v-layout>
      </v-stepper-content>

        <v-stepper-content step="6">
        <v-card
          class="mb-3">
          <v-layout row justify-space-between>
        <div >
          <!-- <div class =" pt-3">
            <v-text style="color:#1a4b9b; font-size:18px; font-weight:bold">
                Understanding Your Risk Profle
            </v-text>
        </div> -->
        <div class=" pt-2">
            <v-text style="color:#5e636b;margin-left:0px; font-size:16px; font-weight:bold">
                Would you invest in a company that underperformed in the past and caused you losses?
            </v-text>
        </div>
        <div >
        <v-radio-group >   
        

        <div class="pt-4 "  style="display:flex; ">
            <div>
			<v-radio  value="radio-4" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Definitely not</v-text> 
            </div>
        </div>

        

        <div class="pt-4 "  style="display:flex; ">
            <div>
			<v-radio  value="radio-2" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>May be, but am not very sure</v-text> 
            </div>
        </div>
        

        <div class="pt-4 "  style="display:flex; ">
            <div>
			<v-radio  value="radio-3" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Perhaps I will</v-text> 
            </div>
        </div>
       

        <div class="pt-4 "  style="display:flex; ">
            <div>
			<v-radio  value="radio-4" label=""></v-radio>
            </div>
            <div class=" pt-1 pl-1" style="font-size:16px;color:#7a7d82">                        
                <v-text>Definitely yes</v-text> 
            </div>
        </div>
            </v-radio-group>
            </div>
            </div>
            <div class="pt-3 pr-2 hidden-sm-and-down ">
                <img src="https://businessmag.al/wp-content/uploads/2017/10/plan-biznesi.jpg" height=220px>
            </div>
            </v-layout>
        </v-card>

        <v-layout row justify-space-between="">
        <v-btn flat @click.native="e1 = 5">Previous</v-btn>
        <v-btn
          color="primary"
          @click="jump('/planningandachieving')">
          Proceed
        </v-btn>
        </v-layout>
        
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
   
    </v-container>
</v-app>
    
</template>

<script>


export default {

    data () {
      return {
        e1: 0
      }
    }
    
  }
</script>

<style>


</style>

