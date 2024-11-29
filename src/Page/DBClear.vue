<template>
<v-app>
    <v-container fluid grid-list-md>
        <v-flex>
            <v-text class="headline font-weight-bold" text-md-center>Clear Database</v-text>
            <hr>
        </v-flex>

        <v-flex ml-2>
            <v-text class="" style="color:#757575" >To reset SalesDrive Database and fill default data into following collection :</v-text>
        </v-flex>
        <v-flex  ml-2>
            <v-text class="" style="color:#757575" >1.User</v-text>
        </v-flex>
        <v-flex ml-2>
            <v-text class="" style="color:#757575" >2.Branch Master </v-text>
        </v-flex>
        <v-flex ml-2>
            <v-text class="" style="color:#757575" >3.Role Master</v-text>
        </v-flex>
        <v-flex ml-2>
            <v-text class="" style="color:#757575" >4.Products</v-text>
        </v-flex>
        <v-flex ml-2>
            <v-text class="" style="color:#757575" >5.Admin User</v-text>
        </v-flex>
        <v-flex>
            <v-btn dark color="red lighten-1" @click="dialog = true">Clear DataBase</v-btn>
        </v-flex>
        <v-flex xs12 sm6 md12 mt-4 >                
            <v-card style="overflow:auto;">
                <div class="v-markup" v-if="showTextbox === true">
                    <pre>
                        <v-card-text style="color: #bd4147; " class="font-weight-bold">{{dbClrResponse}}</v-card-text>
                    </pre>
                </div>
            </v-card>
        </v-flex> 

        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title  class="headline font-weight-medium red lighten-2 dark" color="white" style="color:white">
                    Clear Database
                </v-card-title>
                <v-card-text class="subheading">
                    Are you sure you want to delete Database?
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn color="red lighten-2x" flat @click ="dialog = false">
                        cancel
                    </v-btn>
                    <v-btn color="red lighten-2x" flat @click ="clrDb">
                        ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</v-app>
   
</template>

<script>
import axios from 'axios' 

export default {

    data(){
        return{
            dbClrResponse:[],
            dialog:false,
            showTextbox:false,
        }
    },

    components:{
        axios
    },

    methods:{
        clrDb(){
            console.log("I AM IN THE FUNCTION")
            this.POSTUSER('cleardb', {} , res => {
                this.showTextbox =true
                console.log('RESPONSE DATA :',res.data.errMsg)
                this.dbClrResponse = res.data.errMsg
                this.dialog =false
            });
        }
    }

}
</script>

<style>

</style>
