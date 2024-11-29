<template>

<div>
<!-- <h2>lead tab 1</h2> -->
        <!-- <v-layout align-start justify-center row fill-height>
            <v-card :style="{backgroundColor: isActive1, color:isActive2}" ripple  class="toptab" @click="highlight('/Ltab/personalD',1)"> <v-icon color="#455A64" large> description </v-icon> Details </v-card>
            <v-card :style="{backgroundColor: isActive2, color: isActive1}" ripple  class="toptab" @click="highlight('/leadhistory',2)"> <v-icon color="#455A64" large> history </v-icon>History</v-card>
        </v-layout> -->

 <v-layout row center style=" margin-top:30px; z-index:-10"> 
    
        <v-card height="300px"   style="flex:1;">
            <side-tabs  :sideData="tab"> </side-tabs>
        </v-card>
        <v-card style="flex:4; margin-left:6px;" >
        
            <router-view  style="flex:1;">  </router-view>

        </v-card>
 
</v-layout>

</div>
    
</template>

<script>

import sideTabs from '../../component/Tabs/sidetabs'

export default {
    created(){
        this.isActive1 = '#90A4AE';
        this.isActive2 = 'white';
    },
    components:{
      sideTabs
    },
    data () {
      return {
          texttest:"TXT passing",
          selecttab:"",
          isActive1: false,
           isActive2: false,
            isActive3: false,
        drawer: true,
        items:[
            {text:"text 1"},
             {text:"text 2"},
              {text:"text 3"},
        ],
        tab: [
          { 
          title: 'Personal Details', 
          icon: 'dashboard', 
          link:'/Lmaster/Ltab/personalD',
          active:false,
          num:0,
          color:"black",
          bgcolor:'White'
           },{ 
           title: 'Contact Details', 
           icon: 'contact_phone',
           link:'/Lmaster/Ltab/contactD',
           active:false,
           num:1,
           color:"black",
           bgcolor:'White'
            },{ 
           title: 'Professional Details', 
           icon: 'chrome_reader_mode',
           link:'/Lmaster/Ltab/proD',
           active:false,
           num:2, 
           color:"black",
           bgcolor:'White'
           },{ 
          title: 'Existing Details', 
          icon: 'assignment_returned', 
          link:'/Lmaster/Ltab/existingD',
          active:false,
          num:3,
          color:"black",
          bgcolor:'White'
          },{
          title: 'Proposed Details', 
          icon: 'assignment', 
          link:'/Lmaster/Ltab/proposedD',
          active:false,
          num:4,
          color:"black",
          bgcolor:'White'
          },
        ],
       
      }
    }, 

    methods:{

       highlight1(event){
           console.log("Value inside evnet h1", event)
       },

       highlight(link, num){
         
        
         console.log("Inside the v-model:::>", link);
        
         this.jump(link);
           
        
       },

    }
    
}
</script>


<style>



/* .containtab{ */
    /* display: flex;
    flex-direction: row;
    margin: 25px;
}
.righttab{
    border:1px dotted red;
  padding:20px;
} */



</style>
