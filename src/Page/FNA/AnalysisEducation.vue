<template>
 <v-app>
  <div >
        <v-container>
            <div class="card-padding-scroll">
                <div class="vertical-scroll-layout-edu">
                    
            <v-layout row wrap>
                <div style="padding-right:40px;padding-bottom:20px">
                  <v-card  color="white">
              <div class="add-child-layout-flx-edu">
                            <v-card-text >
                                        12345 
                            </v-card-text>
                            <v-card-text style="color:#e55420" class=" body-2 px-0 pt-0">
                                      Ashraf 
                            </v-card-text>
              </div>
               
              
            </v-card>
             </div>
             <div style="padding-right:40px">
                        <v-card  color="white">
              <div class="add-child-layout-flx-edu">
                            <v-card-text >
                                        12345
                            </v-card-text>
                            <v-card-text style="color:#e55420" class=" body-2 px-0 pt-0">
                                      Ashraf 
                            </v-card-text>
              </div>
               
              
            </v-card>
             </div>
            
             <div style="padding-right:40px">
                        <v-card  color="white">
              <div class="add-child-layout-flx-edu">
                            <v-card-text >
                                        12345
                            </v-card-text>
                            <v-card-text style="color:#e55420" class=" body-2 px-0 pt-0">
                                      Ashraf 
                            </v-card-text>
              </div>
               
              
            </v-card>
             </div>
             <div style="padding-right:40px">
                        <v-card  color="white">
              <div class="add-child-layout-flx-edu">
                            <v-card-text >
                                        12345 
                            </v-card-text>
                            <v-card-text style="color:#e55420" class=" body-2 px-0 pt-0">
                                      Ashraf 
                            </v-card-text>
              </div>
               
              
            </v-card>
             </div>
             <div style="padding-right:0px">
                        <v-card  color="white">
              <div class="add-child-layout-flx-edu">
                            <v-card-text >
                                        12345 
                            </v-card-text>
                            <v-card-text style="color:#e55420" class=" body-2 px-0 pt-0">
                                      Ashraf 
                            </v-card-text>
              </div>
               
              
            </v-card>
             </div>
             
            </v-layout>
        </div>
        </div>
        <div>
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
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
  <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
</slick>
        <v-text style="color:#1a4b9b; " class="title">
                Goal Planner
            </v-text>
        
            <v-text class="justify-center-goals-txt">
                select the Goals you want to select
            </v-text>
        </div>
        
          <div> 
        <div style="padding-top: 15px">
            <v-text style="color:#1a4b9b; " class="title">
                Goal Platter
            </v-text>
        </div>
          </div>
          <v-layout>
              <div >
                  <v-flex  lg12 sm12 pr-4 pt-4>
                  <v-card color="white" >
                    <v-card-title primary class="body-2" style="color:#e55420">Early Years</v-card-title>
                    <v-text class="year-text-style">Age 30 to 40 years <span class="span-tag-style">2018-2018</span></v-text>
                     <div style="padding-top:25px;padding-left:125px" >
                        <v-btn icon>
                            <v-icon  style="color:#d4d6d8;"  x-large>add</v-icon>
                    </v-btn>

                     </div>
                     <div >
                         <v-card-text style="color:#d4d6d8;" class="text-md-center">
                             Add Goals you want to plan
                         </v-card-text>
                     </div>

                     <div :style="{'marginLeft': '50px', 'flex': '1'}">
                        <Container 
                        :group-name="'1'" 
                        :get-child-payload="getChildPayload3" 
                        @drop="onDrop('items3', $event)"
                        drag-class="card-ghost"
                        drop-class="card-ghost-drop">            
                          <Draggable v-for="item in items3" :key="item.id">
                            <v-flex md12 mr-5 mb-2>
                            <div class="draggable-item">
                              

                              <v-flex ml-2 mt-2>
                                <v-text >
                                  {{item.card_title}}
                                </v-text>
                              
                              <v-icon style="margin-left:30px">delete_sweep</v-icon>
                              <v-icon style="margin-left:5px">create</v-icon>
                            </v-flex>
                            <div class="sub_title">
                            <v-text>
                              {{item.amount}}
                            </v-text>
                            </div>
                            </div>
                          </v-flex>
                          </Draggable>
                        </Container>
                      </div>
                     <div>
                         <v-card-text style="color:#e55420" class="title text-md-center" >
                             Rs. {{amount1}} Lacs 
                         </v-card-text>
                     </div>
                     </v-card>
                </v-flex>
              </div>
              <div>
                  <v-flex  lg12 sm12 pr-4 pt-4>
                   <v-card color="white" >
                    <v-card-title primary class="body-2" style="color:#e55420">Responsible Years</v-card-title>
                    <v-text class="year-text-style" >Age 41 to 50 years <span class="span-tag-style">2018-2018</span></v-text>
                 <div style="padding-top:25px;padding-left:125px" >
                        <v-btn icon>
                            <v-icon  style="color:#d4d6d8;"  x-large>add</v-icon>
                    </v-btn>

                     </div>
                     <div>
                         <v-card-text style="color:#d4d6d8" class=" text-md-center">
                             Add Goals you want to plan
                         </v-card-text>
                     </div>

                     <div :style="{'marginLeft': '50px', 'flex': '1'}">
                        <Container 
                        :group-name="'1'" 
                        :get-child-payload="getChildPayload1" 
                        @drop="onDrop('items1', $event)"
                        drag-class="card-ghost"
                        drop-class="card-ghost-drop">            
                          <Draggable v-for="item in items1" :key="item.id">
                            <v-flex md12 mr-5 mb-2>
                            <div class="draggable-item">
                              

                              <v-flex ml-2 mt-2>
                                <v-text >
                                  {{item.card_title}}
                                </v-text>
                              
                              <v-icon style="margin-left:30px">delete_sweep</v-icon>
                              <v-icon style="margin-left:5px">create</v-icon>
                            </v-flex>
                            <div class="sub_title">
                            <v-text>
                              {{item.amount}}
                            </v-text>
                            </div>
                            </div>
                          </v-flex>
                          </Draggable>
                        </Container>
                      </div>
                     <div>
                         <v-card-text style="color:#e55420" class="title text-md-center">
                             Rs. {{amount2}} Lacs
                         </v-card-text>
                     </div>
                
                
                </v-card>
      </v-flex>
              </div>
              <div>
                  <v-flex  lg12 sm12 pr-4 pt-4>
                    <v-card color="white">
                    <v-card-title primary class="body-2" style="color:#e55420"> Pre-Retirement Year</v-card-title>
                    <v-text class="year-text-style">Age 51 to 60 years <span class="span-tag-style">2018-2018</span></v-text>
                    <div style="padding-top:25px;padding-left:125px" >
                        <v-btn icon>
                            <v-icon  style="color:#d4d6d8;"  x-large>add</v-icon>
                    </v-btn>

                     </div>
                     <div>
                         <v-card-text style="color:#d4d6d8" class=" text-md-center">
                             Add Goals you want to plan
                         </v-card-text>
                     </div>

                     <div :style="{'marginLeft': '50px', 'flex': '1'}">
                        
                        <Container 
                          :group-name="'1'" 
                          :get-child-payload="getChildPayload2" 
                          @drop="onDrop('items2', $event)"
                          drag-class="card-ghost"
                          drop-class="card-ghost-drop"
                          >            
                          <Draggable v-for="item in items2" :key="item.id">
                           
                              <v-flex md12 mr-5 >  
                          <div class="draggable-item">
                                <v-flex ml-2 mt-2>
                                <v-text >
                                  {{item.card_title}}
                                </v-text>
                              
                              <v-icon style="margin-left:30px">delete_sweep</v-icon>
                              <v-icon style="margin-left:5px">create</v-icon>
                            </v-flex>
                                <div class="sub_title"> 
                                <v-text>
                                  {{item.amount}}
                                </v-text>
                            </div>
                          
                        </div>
                        </v-flex>
                          </Draggable>
                        </Container>
                      
                      </div>
                     <div >
                         <v-card-text style="color:#e55420" class="title text-md-center">
                             Rs. {{amount3}} Lacs
                         </v-card-text>
                     </div>
                 
                    
                
                </v-card>
      </v-flex>
              </div>
          </v-layout>
        </v-container>
  </div>
    
 </v-app>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from "./../../utils.js";
import Slick from 'vue-slick';
export default {
    components: { Container, Draggable,Slick },
    data(){
        return {
            slickOptions: {
                slidesToShow: 3,
                // Any other options that can be got from plugin documentation
            },
            amount1:2435,
            amount2:3564,
            amount3:6647,
            
          //   items1: generateItems(2, i => ({
          //   id: "1" + i,
          //   data: `Draggable 1 - ${i}`
          // })),
          //   items2: generateItems(2, i => ({
          //   id: "2" + i,
          //   data: `Draggable 2 - ${i}`
          // })),

          
             items1:[{
               card_title : "Ananya's Education" ,
               amount : "12,30,000"
             } ,
             {
               card_title : "Pre-Retirement Corpus" ,
               amount : "4,30,000"
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

        // Events listeners
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

  .title
  {
    margin-left: 2px;
    font-size: 15px;
  }
  .add-child-layout-flx-edu {
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    align-items: center;
    padding: 10px;
    width: 90px;
        height:90px
  }
    .vertical-scroll-layout-edu {
    display: flex;
    flex-direction: row;
    width: 700px;
    /*overflow-x: scroll;*/
  }
    .span-tag-style{
    padding-left:80px;
    padding-right:17px;
    font-weight:bold;
    color:#1a4b9b
  }
    .year-text-style{
        padding-left:17px;
        color:#706c6b
  }
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
  margin-bottom: 2px;
  margin-top: 2px;
  margin-left: 2px;
  
}
.sub_title
{
  margin-left: 8px;
  font-size: 9px;
  height: 10px;
}
    @media screen and (min-width: 320px) {
        .card-padding-scroll{
            padding-top:10px;
            width:290px;
            overflow-x: scroll;
            padding-left:10px;
            padding-right:10px;
            margin-left:5px
        }
        .justify-center-goals-txt{
            margin-left:50px;
            color:#706c6b;
            
        }
    }
    @media screen and (min-width: 768px) {
        
        
    }
    @media screen and (min-width: 992px) {
        
        .card-padding-scroll{
            padding-top:10px;
            width:630px;
            overflow-x: scroll;
            padding-left:10px;
            padding-right:0px;
            margin-left:103px
        }
        .justify-center-goals-txt{
            margin-left:300px;
            color:#706c6b;
            
        }
        .card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg)
}

.card-ghost-drop{
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg)
}
    }
    
      

</style>