<template>
 <v-app>
  <div >
    <v-container >
        <v-flex xs12 >
        <div >
                
                    
            <v-layout justify-space-around row >
                
                  <v-card  width="140px" height="90px">
                        <v-flex ml-5>
                            <v-icon x-large>folder_open</v-icon>
                            </v-flex>
                            <v-card-text style="color:#e55420">
                                        Kirans Education
                            </v-card-text>
              
               
              
            </v-card>
             
             <div >
                        <v-card width="140px" height="90px">
              <div >
                  <v-flex ml-5> 
                            <v-icon x-large >info</v-icon>
                            </v-flex>
                            <v-card-text style="color:#e55420">
                                      Kirans wedding
                            </v-card-text>
                            
              </div>
               
              
            </v-card>
             </div>
            
             <div>
                        <v-card width="140px" height="90px">
              <div>
                  <v-flex ml-5>
                            <v-icon x-large>event</v-icon>
                  </v-flex>
                            <v-card-text style="color:#e55420">
                                      Retirement fund
                            </v-card-text>
              </div>
               </v-card>
             </div>
             
             <div>
                    
                        <v-card width="140px" height="90px">
                    <v-flex ml-5>
                      
                           <v-icon x-large>home</v-icon>
                           </v-flex>
                            <v-card-text style="color:#e55420" >
                                      Bigger Car 
                            </v-card-text>
                         </v-card>
                         
             </div>
             <div>
                        <v-card width="140px" height="90px">
              <div>
                  <v-flex ml-5>
                            <v-icon x-large>widgets</v-icon>
                            </v-flex>
                            <v-card-text style="color:#e55420" >
                                      Home 
                            </v-card-text>
              </div>
               
              
            </v-card>
             </div>
             
            </v-layout>
            
        </div>
        
        </v-flex>
        <!-- <v-flex>
        <div class="top-scroller">
        <v-tabs show-arrows centered>
            <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab>
                    <v-icon x-large>home</v-icon>
                    
                </v-tab>
                <v-tab>
                    <v-icon x-large>event</v-icon>
                </v-tab>
                <v-tab>
                    <v-icon x-large>info</v-icon>
                </v-tab>
                <v-tab>
                    <v-icon x-large>folder_open</v-icon>
                </v-tab>
                <v-tab>
                    <v-icon x-large>widgets</v-icon>
                </v-tab>    
            </v-tabs>
        </div>
        </v-flex> -->
        
      
        </v-container>
   
        <p class="text-xs-center" style="font-size:10px">Select the Goals you want to plan </p>
        
        
        <v-layout justify-space-between row>
        <v-flex ml-3 md10 xs9>
                  <v-text style="color:#1a4b9b; " class="title">
               Slick Starts
            </v-text>
          <slick
  ref="slick"
  :options="slickOptions"
  @afterChange="handleAfterChange"
  @beforeChange="handleBeforeChange"
  @breakpoint="handleBreakpoint"
  @destroy="handleDestroy"
  @edge="handleEdge"
  @init="handleInit"
  @reInit="handleReInit"
  @setPosition="handleSetPosition"
  @swipe="handleSwipe"
  @lazyLoaded="handleLazyLoaded"
  @lazyLoadError="handleLazeLoadError">
         <v-card  width="140px" height="90px">
                        <v-flex ml-5>
                            <v-icon x-large>folder_open</v-icon>
                            </v-flex>
                            <v-card-text style="color:#e55420">
                                        Kirans Education
                            </v-card-text>
              
               
              
            </v-card>
                   <v-card  width="140px" height="90px">
                        <v-flex ml-5>
                            <v-icon x-large>folder_open</v-icon>
                            </v-flex>
                            <v-card-text style="color:#e55420">
                                        Kirans Education
                            </v-card-text>
              
               
              
            </v-card>
                   <v-card  width="140px" height="90px">
                        <v-flex ml-5>
                            <v-icon x-large>folder_open</v-icon>
                            </v-flex>
                            <v-card-text style="color:#e55420">
                                        Kirans Education
                            </v-card-text>
              
               
              
            </v-card>
                   <v-card  width="140px" height="90px">
                        <v-flex ml-5>
                            <v-icon x-large>folder_open</v-icon>
                            </v-flex>
                            <v-card-text style="color:#e55420">
                                        Kirans Education
                            </v-card-text>
              
               
              
            </v-card>
                   <v-card  width="140px" height="90px">
                        <v-flex ml-5>
                            <v-icon x-large>folder_open</v-icon>
                            </v-flex>
                            <v-card-text style="color:#e55420">
                                        Kirans Education
                            </v-card-text>
              
               
              
            </v-card>
                   <v-card  width="140px" height="90px">
                        <v-flex ml-5>
                            <v-icon x-large>folder_open</v-icon>
                            </v-flex>
                            <v-card-text style="color:#e55420">
                                        Kirans Education
                            </v-card-text>
              
               
              
            </v-card>
  <!-- <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt="" style="max-width: 180px;"></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt="" style="max-width: 180px;"></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt="" style="max-width: 180px;"></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt="" style="max-width: 180px;"></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt="" style="max-width: 180px;"></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt="" style="max-width: 180px;"></a> -->

 
</slick>
        <v-text style="color:#1a4b9b; " class="title">
                Goal Planner
            </v-text>
        
        </v-flex>
        <p>{{people}}</p>
        <v-flex>
            
        <v-switch v-model="people" value="Suggested"></v-switch>
        </v-flex>
        </v-layout>
        
        <v-layout row wrap justify-space-around >
            <v-flex xs12 sm5 md3>
                <v-card height="390px">
                    
                       <v-card-text  style="color:#e55420;font-size:20px">Early Years</v-card-text>
                       
                    
                    <v-layout justify-space-between>
                    <v-card-text>Age 30 to 50 years</v-card-text>
                    <v-flex xs9 md7>
                    <v-card-text>2018-2028</v-card-text>
                    </v-flex>
                    </v-layout>
                        <v-layout justify-center>
                            <v-btn large fab icon>
                                <v-icon  style="color:#d4d6d8;"  x-large>add</v-icon>
                                
                            </v-btn>
                        </v-layout>
                        <p class="text-xs-center" style="color:#d4d6d8">Add Goals you want to plan</p>
                        <v-layout  justify-center row >
                            <!-- <div style="height:90px"> -->
                                <div :style="{'marginLeft': '50px', 'flex': '1'}">
                        <Container 
                        :group-name="'1'" 
                        :get-child-payload="getChildPayload3" 
                        @drop="onDrop('items3', $event)"
                        drag-class="card-ghost"
                        drop-class="card-ghost-drop">            
                          <Draggable v-for="item in items3" :key="item.id">
                            <v-layout mr-5 mt-2>  
                          <div class="draggable-item">
                                <v-flex ml-2 >
                                <v-text >
                                  {{item.card_title}}
                                </v-text>
                              
                              <v-icon>delete_sweep</v-icon>
                              <v-icon >create</v-icon>
                            </v-flex>
                                <div class="sub_title"> 
                                <v-text>
                                  {{item.amount}}
                                </v-text>
                            </div>
                          
                        </div>
                              </v-layout>
                          </Draggable>
                        </Container>
                      </div>
                            <!-- </div> -->

                            </v-layout>
                            <v-flex mt-2>
                            <p style="color:#e55420" class="title text-xs-center">
                             Rs. {{amount3}} Lacs
                            </p>
                         </v-flex>
        
                </v-card>
                </v-flex>
                <v-flex xs12 sm5 md3>
                <v-card height="400px">
                    
                       <v-card-text  style="color:#e55420;font-size:20px">Early Years</v-card-text>
                       
                    
                    <v-layout justify-space-between>
                    <v-card-text>Age 30 to 50 years</v-card-text>
                    <v-flex xs9 md7>
                    <v-card-text>2018-2028</v-card-text>
                    </v-flex>
                    </v-layout>
                        <v-layout justify-center>
                            <v-btn large fab icon>
                                <v-icon  style="color:#d4d6d8;"  x-large>add</v-icon>
                                
                            </v-btn>
                        </v-layout>
                        <p class="text-xs-center" style="color:#d4d6d8">Add Goals you want to plan</p>
                        <v-layout  justify-center row >
                            <!-- <div style="height:90px"> -->
                                <div :style="{'marginLeft': '50px', 'flex': '1'}">
                                <Container 
                        :group-name="'1'" 
                        :get-child-payload="getChildPayload1" 
                        @drop="onDrop('items1', $event)"
                        drag-class="card-ghost"
                        drop-class="card-ghost-drop">            
                          <Draggable v-for="item in items1" :key="item.id">
                            <v-layout mr-5 mt-2>  
                          <div class="draggable-item" style="width:200px">
                                <v-flex ml-2>
                                <v-text >
                                  {{item.card_title}}
                                </v-text>
                              
                              <v-icon>delete_sweep</v-icon>
                              <v-btn flat icon color="pink" @click.native="higherEducation">
                              
                              <v-icon >create</v-icon>
                              </v-btn>
                                <v-dialog
								    v-model="dialog"
									>
										<app-higher-education></app-higher-education>
								</v-dialog>
                            </v-flex>
                                <div class="sub_title"> 
                                <v-text>
                                  {{item.amount}}
                                </v-text>
                            </div>
                          
                        </div>
                              </v-layout>
                          </Draggable>
                        </Container>
                                </div>
                            <!-- </div> -->

                            </v-layout>
                            
                            <p style="color:#e55420" class="title text-xs-center">
                             Rs. {{amount3}} Lacs
                            </p>
                         
        
                </v-card>
                </v-flex>

            <v-flex xs12 sm5 md3>
                <v-card height="400px">
                    
                       <v-card-text  style="color:#e55420;font-size:20px">Early Years</v-card-text>
                       
                    
                    <v-layout justify-space-between>
                    <v-card-text>Age 30 to 50 years</v-card-text>
                    <v-flex xs9 md7>
                    <v-card-text>2018-2028</v-card-text>
                    </v-flex>
                    </v-layout>
                        <v-layout justify-center>
                            <v-btn large fab icon>
                                <v-icon  style="color:#d4d6d8;"  x-large>add</v-icon>
                                
                            </v-btn>
                        </v-layout>
                        <p class="text-xs-center" style="color:#d4d6d8">Add Goals you want to plan</p>
                        <v-layout  justify-center row >
                            <!-- <div style="height:90px"> -->
                                <div :style="{'marginLeft': '50px', 'flex': '1'}">
                                <Container 
                          :group-name="'1'" 
                          :get-child-payload="getChildPayload2" 
                          @drop="onDrop('items2', $event)"
                          drag-class="card-ghost"
                          drop-class="card-ghost-drop"
                          >            
                          <Draggable v-for="item in items2" :key="item.id">
                           
                              <v-layout mr-5 mt-2>  
                          <div class="draggable-item">
                                <v-flex ml-2 >
                                <v-text >
                                  {{item.card_title}}
                                </v-text>
                              
                              <v-icon>delete_sweep</v-icon>
                              <v-icon>create</v-icon>
                            </v-flex>
                                <div class="sub_title"> 
                                <v-text>
                                  {{item.amount}}
                                </v-text>
                            </div>
                          
                        </div>
                              </v-layout>
                          </Draggable>
                        </Container>
                                </div>
                            <!-- </div> -->

                            </v-layout>
                            
                            <p style="color:#e55420" class="title text-xs-center">
                             Rs. {{amount3}} Lacs
                            </p>
                         
        
                </v-card>
                </v-flex>
                
        </v-layout>
        <v-layout justify-space-between>
        <div style="padding-top: 20px;float: right;" @click="jump('/helptoknowbetter')">
				<v-btn depressed large color="flat">Previous </v-btn>
		</div>
        <div style="padding-top: 20px;float: right;" @click="jump('/riskprofile')">
				<v-btn depressed large color="primary"> proceed</v-btn>
		</div>
        </v-layout>
  </div>
    
 </v-app>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "./../../utils.js";
import Slick from 'vue-slick';
import  '../../../node_modules/slick-carousel/slick/slick.css';
import appHigherEducation from './HigherEducation.vue'


export default {
    components: { 
        Container,
        Draggable,
        Slick,
        appHigherEducation
        },
    data(){
        return {
            dialog: false,
             slickOptions: {
                slidesToShow: 3,
                slidesToScroll: 3,
               
                autoplay:true,
               infinite:false,
        
                // Any other options that can be got from plugin documentation
            },
            people:"",
            items1:[{
               card_title : "Ananya's Education" ,
               amount : "12,30,000"
             } ,
             

             ],

             items2:[
               {
               card_title : "Ananya's wedding" ,
               amount : "9,30,000"
             } 
             ],
             items3 : [
                  
             ]

        }
    },
    methods: {
    
    higherEducation(){
        this.dialog =true
    },
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
    // METHODS FOR SLIDER
       next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },

        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },
          handleAfterChange(event, slick, currentSlide) {
            console.log('handleAfterChange', event, slick, currentSlide);
        },
        handleBeforeChange(event, slick, currentSlide, nextSlide) {
            console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
        },
        handleBreakpoint(event, slick, breakpoint) {
            console.log('handleBreakpoint', event, slick, breakpoint);
        },
        handleDestroy(event, slick) {
            console.log('handleDestroy', event, slick);
        },
        handleEdge(event, slick, direction) {
            console.log('handleEdge', event, slick, direction);
        },
        handleInit(event, slick) {
            console.log('handleInit', event, slick);
        },
        handleReInit(event, slick) {
            console.log('handleReInit', event, slick);
        },
        handleSetPosition(event, slick) {
            console.log('handleSetPosition', event, slick);
        },
        handleSwipe(event, slick, direction) {
            console.log('handleSwipe', event, slick, direction);
        },
        handleLazyLoaded(event, slick, image, imageSource) {
            console.log('handleLazyLoaded', event, slick, image, imageSource);
        },
        handleLazeLoadError(event, slick, image, imageSource) {
            console.log('handleLazeLoadError', event, slick, image, imageSource);
        },

      
        //END METHOD
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
  width : 100%;
  display: block;
  background-color: #fff;
  outline: 0;
  border: 1px solid rgba(0,0,0,.125);
  /* margin-bottom: 2px;
  margin-top: 2px;
  margin-left: 2px; */
  
}
.sub_title
{
  margin-left: 8px;
  font-size: 9px;
  height: 10px;
}


.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg)
}

.card-ghost-drop{
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg)
}
    
</style>