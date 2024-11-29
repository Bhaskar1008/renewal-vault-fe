<template>
<v-card>
    <div >

        <v-toolbar
        color="secondary"
        dark
      >
        <v-toolbar-title >Add Child</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon style="color:#1a4b9b">close</v-icon>
        </v-btn>
      </v-toolbar>
        <br>
        <!-- ======================================================================================== -->
            <div>
            <v-layout  column wrap ml-3>
                <v-flex d-flex>
                    <v-layout row wrap>
                    <v-flex d-flex xs12 sm6 md5 ml-1>
                        <div>
                            
                            <div
                            class="" 
                            style=" color:#706c6b">
                                <v-text class="body-2" >Name of the Child</v-text>
                            </div>
                            
                            <div
                            class="" 
                            style=" color:#706c6b">
                                <v-text-field
                                    placeholder="Enter Name"
                                ></v-text-field>
                            </div>
                            
                    </div>
                    </v-flex>
            
                <v-flex d-flex xs5 sm6 md2 mr-1>
                    <div>
                        <v-flex ml-3>
                        <div style=" color:#706c6b">
                            <v-text class="body-2" >Boy</v-text>
                        </div>
                        </v-flex>
                        <div >
                             <v-chip outline color="primary"><v-icon >face</v-icon></v-chip>
                        </div>
                    </div>
                </v-flex>
                <v-flex d-flex xs5 sm6 md3 mr-1>
                    <div>
                        <v-flex ml-3>
                        <div style=" color:#706c6b">
                            <v-text class="body-2" >Girl</v-text>
                        </div>
                        </v-flex>
                        <div >
                             <v-chip outline color="primary"><v-icon >face</v-icon></v-chip>
                        </div>
                    </div>
                </v-flex>
                    </v-layout>    
                </v-flex>
            <v-layout row>
                <v-flex d-flex xs12 sm6 md5 ml-1 mt-3>
                    <!-- <div> -->
                        <div style="height:50px">
                            <v-slider
                                :max="17"
                                v-model="age"
                                thumb-label
                            ></v-slider>
                        </div> 
                         
                    
                </v-flex>
            </v-layout>
                <v-layout row wrap>
                <v-flex d-flex xs7 sm6 md3 ml-1>
                        <div style=" color:#706c6b">
                            <v-text class="body-2" >Age</v-text>
                        </div>
                    </v-flex>
                    <v-flex d-flex  sm1 md3 ml-4>
                        <div style=" color:#706c6b">
                            <v-text class="body-2" >{{age}} years</v-text>
                        </div>
                    </v-flex>
                    <v-flex d-flex xs12 sm6 md3 ml-1>
                <v-btn depressed large color="primary">Add
                    <v-icon dark right>check_circle</v-icon>
                </v-btn>
            </v-flex>
                </v-layout>
                   
                
                       
            </v-layout>
<!-- ======================================================================================================= -->
                
                <!-- <v-flex d-flex xs12 sm6 md4>
                    <div class="ml-3">
                        <div style=" color:#706c6b; ">
                            <v-text class="body-2" >Current Annual Income</v-text>
                        </div>
                        <div>
                        <v-text-field
                            placeholder="Annual Income"
                        ></v-text-field>
                        </div>
                        <div style=" color:#706c6b">
                            <v-text class="body-2" >% of Annual Income saved for this goal</v-text>
                        </div>
                        <div class="mt-3">
                        <v-slider
                            v-model="slider2"
                            thumb-color="red"
                            thumb-label="always"
                            :min="min1"
                            :max="max1"
                        ></v-slider>
                        </div>
                        <div style=";color:#706c6b">
                                <v-text class="body-2">Savings so far</v-text>
                        </div>
                        <div>
                        <v-text-field
                                placeholder=" Savings"
                        ></v-text-field>
                        </div>
                    </div>
                </v-flex>                
            </v-layout>     -->
                
                
    <!-- =================================================================================================            -->
        
            
        </div>
    
    </div>
</v-card>
</template>
<script>
    export default {
       data (){
           return{
               age:0
           }
       }
        
}
</script>
<style>
</style>

