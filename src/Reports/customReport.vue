<template>
    <v-app>
        <v-content>
            <v-layout justify-content align-center mt-5 ml-5 row>
                <v-card class="ml-5" height="700px" width="500px">
                    <v-card-title class="ml-5" primary-title>
                       <h3> Report Data Table Attributes</h3>
                    </v-card-title>
                    <Container 
                          :group-name="'1'" 
                          :get-child-payload="getChildPayload1" 
                          @drop="onDrop('items1', $event)"
                          drag-class="card-ghost"
                          drop-class="card-ghost-drop"
                          >            
                          <Draggable v-for="item in items1" :key="item.id">
                              <v-flex class="ml-5 mt-3">
                                <div class="draggable-item ml-5">
                                <v-layout row>
                                    
                                    <!-- <v-checkbox
                                    
                                    v-model="checkbox"
                                    ></v-checkbox> -->
                                    <v-flex>
                                    <div class="mt-2 ml-2">
                                        <h4>{{item.card_title}}</h4>
                                    </div>
                                    </v-flex>
                                    
                                </v-layout>
                                </div>
                              </v-flex>
                          </Draggable>
                        </Container>
                </v-card>
                <v-flex ml-3 row>
                    <v-card height="345px" width="700px">
                        <v-card-title class="ml-5" primary-title>
                            <h3>Add to Rows</h3>
                        </v-card-title>
                        <Container 
                          :group-name="'1'" 
                          :get-child-payload="getChildPayload2" 
                          @drop="onDrop('items2', $event)"
                          drag-class="card-ghost"
                          drop-class="card-ghost-drop"
                          >            
                          <Draggable v-for="item in items2" :key="item.id">
                              <v-flex class="ml-5 mt-3">
                                <div class="draggable-item ml-5">
                                <v-layout row>
                                    
                                    <v-flex>
                                    <div class="mt-2 ml-2">
                                        <h4>{{item.card_title}}</h4>
                                    </div>
                                    </v-flex>
                                    <div class="mt-2 ml-2">
                                        <v-icon>edit</v-icon>
                                    </div>
                                    <div class="mt-2 ml-2">
                                        <v-icon>delete</v-icon>
                                    </div>
                                </v-layout>
                                </div>
                              </v-flex>
                          </Draggable>
                        </Container>
                    </v-card>
                    <v-card class="mt-3" height="345px" width="700px">
                        <v-card-title class="ml-5" primary-title>
                            <h3> Add to Columns</h3>
                        </v-card-title>
                        <Container 
                          :group-name="'1'" 
                          :get-child-payload="getChildPayload3" 
                          @drop="onDrop('items3', $event)"
                          drag-class="card-ghost"
                          drop-class="card-ghost-drop"
                          >            
                          <Draggable v-for="item in items3" :key="item.id">
                              <v-flex class="ml-5 mt-3">
                                <div class="draggable-item ml-5">
                                <v-layout row>
                                    <div class="mt-2 ml-2">
                                        <v-icon>drag_handle</v-icon>
                                    </div>
                                    <v-flex>
                                    <div class="mt-2 ml-2">
                                        <h4>{{item.card_title}}</h4>
                                    </div>
                                    </v-flex>
                                    <div class="mt-2 ml-2">
                                        <v-icon>edit</v-icon>
                                    </div>
                                    <div class="mt-2 ml-2">
                                        <v-icon>delete</v-icon>
                                    </div>
                                </v-layout>
                                </div>
                              </v-flex>
                          </Draggable>
                        </Container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>
    </v-app>
</template>
<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "./../utils.js";
// import Slick from 'vue-slick';
export default {
    components:{
        Container,
        Draggable,
        // Slick
    },
    data(){
        return{
            
            checkbox:true,
            amount1:2435,
            amount2:3564,
            amount3:6647,
            items1:[
                {
                card_title : "Encrypted member ID" ,
                },
                {
                card_title : "Employee Status" ,
                },
                {
                card_title : "Employee Type" ,
                },
                {
                 card_title : "Member ID" ,
                },
                {
                 card_title : "Subscriber ID" ,
                },
                {
                 card_title : "Employee Exempt Status" ,
                },
                {
                 card_title : "Mental Health Carrier " ,
                },
                {
                 card_title : "Rx Carrier " ,
                }
            ],

             items2:[
               {
               card_title : "Employee Status" ,
               },
               {
               card_title : "Employee Exempt Status" ,
               },
               {
               card_title : "Employee Bargaining Status" ,
               }
             ],
             items3 : [
                {
                 card_title : "Network Billed" ,
                },
                {
                 card_title : "Network Paid" ,
                },
                {
                 card_title : "Network Day" ,
                }
            ]
        }
    },
    methods:{
        onDrop: function(collection, dropResult) {
        this[collection] = applyDrag(this[collection], dropResult);
        },
        getChildPayload1: function(index) {
            return this.items1[index];
        },
        getChildPayload2: function(index) {
        return this.items2[index];
        },
        getChildPayload3: function(index) {
        return this.items3[index];
        },
       
    }

}
</script>

<style>
    .draggable-item{
        color:#1a4b9b;
        /*font-size: 15px;*/
        height: 50px;
        /*line-height: 40px;*/
        /*text-align: center;*/
        width : 350px;
        display: block;
        background-color: #fff;
        outline: 0;
        border: 1px solid rgba(0,0,0,.125);
        margin-bottom: 2px;
        margin-top: 2px;
        margin-left: 2px;
        
        }
</style>

