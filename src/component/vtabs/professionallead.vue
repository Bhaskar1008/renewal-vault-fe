<template>

    <div>

        <v-card class="mrg" flat>
            <p class="titletop">Professional Details</p>

        <v-container fluid>

                <div class="textfields">

                    <v-flex   xs4 sm5>
                        <v-select
                            :items="education"

                            color="#00ACC1"
                             placeholder="Education Type"
                            label="Education Type"
                            v-model="educationname"
                            required
                        ></v-select>

                    </v-flex>

                    <v-flex  xs4 sm5 >
                         <v-select
                            :items="protype"

                            color="#00ACC1"
                            v-model="protypename"
                            placeholder="Profession Type"
                            label="Profession Type"
                            required
                        ></v-select>
                    </v-flex>
              </div>

                 <div class="textfields">

                    <v-flex   xs4 sm5>
                        <v-select
                            :items="income"

                            v-model="incomname"
                            color="#00ACC1"
                            placeholder="Income Group"
                            label="Income Group"
                            required
                        ></v-select>

                    </v-flex>

                    <v-flex  xs4 sm5 >

                    </v-flex>
              </div>


              <!-- <v-layout class="btnm" align-center justify-space-between row fill-height>
                   <v-btn color="#F5F5F5" light @click="previous">Previous</v-btn>
                   <v-btn color="black" @click="next" dark>Proceed</v-btn>
              </v-layout> -->
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
import lead from '../../Page/ActivityUpload/leadCreate/submitLead';
const education = ["10th std pass","12th std pass","Graduate","Doctorate","Postgraduate","below 10th std","Illiterate / uneducated","Others"];
const protype = ["Salaried-Govt / PSU","Salaried-Other","Self Employeed professional","Agriculturist / Farmer",
"Part time business","Retired","Student","Housewife","Unemployed","Others"];
const income = ["Less than 2.5 Lacs", "2.5 Lacs to 3.49 Lacs", "3.5 Lacs to 4.99 Lacs", "5 Lacs to 7.99 Lacs", "8 Lacs to 9.99 Lacs", "More than 10 Lacs, Less than 14.99 Lacs", "More than 15 Lacs, Less than 20 Lacs", "More than 20 Lacs"];
export default {
    created(){
        this.leaddata = this.getStore('GetLeadData')[0];
        this.incomname = this.leaddata.incomeGroup
        this.educationname = this.leaddata.education
        this.protypename = this.leaddata.professionType
    },
    beforeRouteLeave (to, from, next) {
        this.commitFormFieldsIntoStore();
        next();
    },

    data(){
        return{
            income,
            education,
            protype,
            leaddata:{},
            incomname:'',
            educationname:'',
            protypename:''
        }
    },
    methods: {
        commitFormFieldsIntoStore() {
            let professional_data = JSON.parse(JSON.stringify(this.leaddata));
            professional_data.education = this.educationname;
            professional_data.incomeGroup = this.incomname;
            // professional_data.annuaLincome = null;       // currently not required may be but dont delete it
            professional_data.professionType = this.protypename;

            let temp_arr = [];
            temp_arr.push(professional_data);
            this.commit('Lead_Object', temp_arr);
        },

        next(){
            this.jump('/Lmaster/Ltab/existingD')
        },
        previous(){
            this.jump('/Lmaster/Ltab/contactD')
        },
        updateLead() {
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
    }

}
</script>

<style>

.mrg{
    margin: 15px;
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


