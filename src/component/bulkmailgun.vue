<template>

    <div>
         
       <v-card class="containercard" >
            
          <div class="tophead">
              <div class="titles">
                    <v-icon medium left color="white" class="headcontent" >mail</v-icon>
               <span class="title font-weight-thin" style="color:white;">Bulk <span class="mailingtxt">E-mailing</span></span>      
              </div>
          </div>
           <v-card class="maincard" flat>
            <!-- <v-layout > -->
                <v-flex  md3 sm3>
                    <v-autocomplete 
                        color="#00ACC1"
                        :rules="[() => !!mailinglist || 'This field is required']"
                        :items="mailinglist"
                        label="Select the Bulk Mailing List"
                        required></v-autocomplete>
                </v-flex> 
                <v-flex md3 sm3>
                        <v-text-field
                        color="#00ACC1"
                        label="Subject"
                        required
                         clearable
                        ></v-text-field>
                </v-flex>
             <!-- </v-layout> -->
                 <v-flex xs6>
                    <v-textarea  outline clearable color="#00ACC1"
                    name="input-7-4" counter
                    label="Type your message here"
                    value=""
                    ></v-textarea>
                 </v-flex>
               
                 <v-btn large
                    color="#01b4bb"
                    class="white--text sendbutton">Send Bulk E-mails
                    <v-icon right dark>send</v-icon>
                 </v-btn>
           </v-card>
       </v-card>
    </div>
    
</template>

<script>
import axios from 'axios'
export default {

    data(){
        return{
            mailgunlist:[],
            mailinglist:['Life_Insurance.pool9834fj939@mailgun.org', 'Car_Insurance.pool9834fj939@mailgun.org','MarketingTeams_Health_Insurance.pool9834fj939@mailgun.org'],
        }
    },

    created(){

        this.GETBULKLIST(id, function(res, error) {
        
        //  axios.get("http://localhost:3000/bulklist").then(res => {

                var newdata= JSON.parse(this.res);
					
                console.log("Response from Local Server is::=>", newdata );

                    for(let i=0; i < newdata.length; i++){
                      console.log("From for loop!")
                     console.log("The mailgun list address are::=>", this.newdata[i]);  

                    }
                })
                



    }


}
</script>

<style>
.headcontent{
    margin-left:12px;
}
.containercard{
    margin:10px;
    border-radius:5px;
}

.titles{
    display: flex; 
    justify-content: center;
    align-items: center;
}

.title{
    color: white;
}
.tophead{
    flex:1;
    background-color:#006064;
    padding:20px;
    display:flex;
    justify-content: center;
   
}

.mailingtxt{
    color: #01b4bb;
    font-family:roboto;
    font-weight:700;
}

.sendbutton{
           
            border-radius: 12px;
           
            font-family: roboto;
            font-size: 13px;
            font-weight: 400;
           
}

.maincard{
    padding:20px;
    border-radius: 5px;
    margin:20px;
}

</style>
