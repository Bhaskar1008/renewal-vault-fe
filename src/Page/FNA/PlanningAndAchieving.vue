<template>
    
    <v-app>
        <div >
             <v-toolbar app color="secondary" height="50px" dark>
             </v-toolbar>
    
             

    <v-container fluid grid-list-sm  style="margin-top:35px">
 
     <div style=" padding-bottom: 15px;color:#1a4b9b">
            <v-text class="title">Planning And Achieving</v-text>
            </div>
    <v-layout row wrap>
     
      <v-flex d-flex xs12 sm4 >
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card color="white" tile flat class="card1-margin">
              <!-- <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text> -->
              <div class="card1-heading-image body-2">
                  <v-text class="orange--text"> For Anaya's Education</v-text>

                  <v-icon>school</v-icon>
              </div>
              <div class="card1-value-padding ">
                  <v-text>Value</v-text>
                  <div >
                  <v-text >RS.34.4Lacs</v-text>
                    <v-btn icon dark small color="cyan">
                    <v-icon dark small>edit</v-icon>
                    </v-btn>
                    </div>
              </div>

              <div class="card1-value-padding">
                  <v-text>Occurence</v-text>
                  <div style="padding-right:31px;">
                  <v-text>18 Years(2037)</v-text>
                  </div>    
              </div>

               <div class="card1-value-padding">
                  <v-text>Annualised premium</v-text>
                  <div >
                  <v-text >RS.78,4000</v-text>
                    <v-btn icon dark small color="cyan">
                    <v-icon dark small>edit</v-icon>
                    </v-btn>
                    </div>
              </div>

              <div class="edelwise-padding body-2">
                  <v-text class="blue--text">Edelweiss Tokio Life-EduSave</v-text>
              </div>

              <div class="edelwise-padding">
                  <p>An Endowment Plan That Provied Guranteed Sum Assured In Pre-defined Instalment Tax Benefit.Loan Facility And Protection</p>
              </div>

            </v-card>
          </v-flex>
          
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm4 child-flex>
         <v-card color="white" tile flat class="card1-margin">
              <!-- <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text> -->
              <div class="card1-heading-image body-2">
                  <v-text class="orange--text"> For Anaya's Wedding</v-text>

                  <v-icon>school</v-icon>
              </div>
              <div class="card1-value-padding ">
                  <v-text>Value</v-text>
                  <div >
                  <v-text >RS.34.4Lacs</v-text>
                    <v-btn icon dark small color="cyan">
                    <v-icon dark small>edit</v-icon>
                    </v-btn>
                    </div>
              </div>

              <div class="card1-value-padding">
                  <v-text>Occurence</v-text>
                  <div style="padding-right:31px;">
                  <v-text>18 Years(2037)</v-text>
                  </div>    
              </div>

               <div class="card1-value-padding">
                  <v-text>Annualised premium</v-text>
                  <div >
                  <v-text >RS.78,4000</v-text>
                    <v-btn icon dark small color="cyan">
                    <v-icon dark small>edit</v-icon>
                    </v-btn>
                    </div>
              </div>

              <div class="edelwise-padding body-2">
                  <v-text class="blue--text">Edelweiss Tokio Life-EduSave</v-text>
              </div>

              <div class="edelwise-padding">
                  <p>An Endowment Plan That Provied Guranteed Sum Assured In Pre-defined Instalment Tax Benefit.Loan Facility And Protection</p>
              </div>

            </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm4>
         <v-card color="white" tile flat class="card1-margin">
              <!-- <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text> -->
              <div class="card1-heading-image body-2">
                  <v-text class="orange--text"> For Anaya's Retirement</v-text>

                  <v-icon>school</v-icon>
              </div>
              <div class="card1-value-padding ">
                  <v-text>Value</v-text>
                  <div >
                  <v-text >RS.34.4Lacs</v-text>
                    <v-btn icon dark small color="cyan">
                    <v-icon dark small>edit</v-icon>
                    </v-btn>
                    </div>
              </div>

              <div class="card1-value-padding">
                  <v-text>Occurence</v-text>
                  <div style="padding-right:31px;">
                  <v-text>18 Years(2037)</v-text>
                  </div>    
              </div>

               <div class="card1-value-padding">
                  <v-text>Annualised premium</v-text>
                  <div >
                  <v-text >RS.78,4000</v-text>
                    <v-btn icon dark small color="cyan">
                    <v-icon dark small>edit</v-icon>
                    </v-btn>
                    </div>
              </div>

              <div class="edelwise-padding body-2">
                  <v-text class="blue--text">Edelweiss Tokio Life-EduSave</v-text>
              </div>

              <div class="edelwise-padding">
                  <p>An Endowment Plan That Provied Guranteed Sum Assured In Pre-defined Instalment Tax Benefit.Loan Facility And Protection</p>
              </div>

            </v-card>

      </v-flex>
       <v-flex xs12 sm12 text-xs-center>
            <div>
                <v-btn large class="orange--text">RS.78,400</v-btn>
            </div>
       </v-flex>
         <v-flex xs12 sm12 text-xs-center>
            <div>
                <v-text class="blue--text">Total Selected Premium Amount</v-text>
            </div>
         </v-flex>

         <v-flex xs12 sm12 text-xs-center>
           
             <v-layout row wrap style="justify-content:space-between">
                 <div  @click="jump('/riskprofile')">
                <v-btn large class="Flat">Previous
                    <!-- <v-icon>keyboard_arrow_right</v-icon> -->
                </v-btn>
            </div>
            <div class="edelwise-padding">
                <v-icon class="orange--text">report_problem</v-icon>
               <v-text>The selected premium value exceed the recommended range based on your current income level </v-text>
            </div>
            <div>
                <v-btn large class="primary">proceed
                    <!-- <v-icon>keyboard_arrow_right</v-icon> -->
                </v-btn>
            </div>
            </v-layout>
         </v-flex>


    </v-layout>
  </v-container>
            </div>
    </v-app>

</template>

<script>
export default {
    data(){
        return{
            
        }
  }
}
</script>
<style>

.card1-heading-image{
    display: flex;
    justify-content:space-between;
    padding-top: 5px;
}

.card1-value-padding{
    display: flex;
    justify-content:space-between;
    padding-top: 20px;
    align-items: center
}
.edelwise-padding{
    padding-top: 20px;
    margin: auto;
}

.card1-margin{
    padding: 15px;
}
</style>
