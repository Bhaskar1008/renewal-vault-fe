<template>

<!-- <div> -->
    <!-- <v-app> -->
        <!-- <v-card> -->
            <!-- <v-layout row wrap > -->
                <!-- <v-flex class="ml-3 mt-3 " style="flex-flow:column wrap;width:100%;">
                    <v-text class="mt-4  headline font-weight-bold">Activity Upload</v-text> -->
        <!-- <v-flex style="position:absolute;top:50px"><p class="heading mb-0 ml-5" style="font-size:19px;" >Create Lead</p></v-flex> -->
     <!-- <v-layout  justify-center row  >
             <v-card v-for="(data,index) in Tabdata" :key="index" :class="[data.active === true ? 'activetab':'inactivetab']" ripple  class="toptab" @click="ActiveTab(index)"> <v-icon color="#455A64"  large> {{data.Ticon}} </v-icon> {{data.Tname}} </v-card> -->
             <!-- <v-card :style="{backgroundColor: isActive1, color:darkgrey}" ripple  class="toptab" @click="highlightmain('/Lmaster/status',1)"> <v-icon color="#455A64"  large> info </v-icon> Status </v-card> -->
            <!-- <v-card :style="{backgroundColor: isActive2, color:darkgrey}" ripple  class="toptab" @click="highlightmain('/Lmaster/Ltab/personalD',2)"> <v-icon color="#455A64"  large> description </v-icon> Details </v-card> -->
            <!-- <v-card :style="{backgroundColor: isActive3, color:darkgrey}" ripple  class="toptab" @click="highlightmain('/Lmaster/leadhistory',3)"> <v-icon color="#455A64" large> history </v-icon>History</v-card> -->
     <!-- </v-layout> -->

        
     <!-- <v-layout  center style=" margin-top:30px; z-index:-10"> 
         <tab :Tabdata="Tabdata"></tab>  -->
        <!-- <v-card style="flex:1; margin:10px;" class="mr-5" flat>  -->
            
            <!-- <router-view style="flex:1;">  </router-view> -->

        <!-- </v-card> -->
 
<!-- </v-layout> -->
                <!-- </v-flex> -->
            <!-- </v-layout> -->
        <!-- </v-card> -->

    <v-card>
        <v-flex pt-4 pl-3>
            <v-text  class="mt-4  headline font-weight-bold">Activity Upload</v-text>
        </v-flex> 
        <!-- <tab :Tabdata="Tabdata"></tab>  -->
        <router-view >  </router-view>
    </v-card>

    <!-- </v-app> -->
<!-- </div> -->
    
</template>



<script>
import Tab from './HeaderTabs.vue'
export default {
    created(){
        console.log("this STORE LIKS DATA",this.$store.state.links)

    },
    components:{
        Tab
    },
    data(){
        return {
        
          darkgrey:'#424242',
          isActive1: false,
           isActive2: false,
            isActive3: false,
            Tabdata:[{
                Tname:'Status',
                Ticon:'info',
                Tlink:'/Lmaster/status',
                active:false,
                darkgrey:'#424242',
            },
            {
                Tname:'Details',
                Ticon:'description',
                Tlink:'/Lmaster/Ltab/personalD',
                 active:false,
                 darkgrey:'#424242',
            }

            ]
        }
    },
    computed: {
        // tadata(){
        //     let me = this
        //     this.currentRoute = this.$store.state.links
        //     for(let i=0;i<me.Tabdata.length;i++){
        //     if ( me.Tabdata[i].Tlink == me.currentRoute){
        //             me.Tabdata[i].active = false
        //             // me.jump(Tabdata[i].Tlink)
        //         // }else if (me.currentRoute == '/Lmaster/Ltab/personalD') {
        //         //    me.Tabdata[i].active = true 
        //         // //    me.jump(Tabdata[i].Tlink)
        //         } else if (me.Tabdata[i].Tlink !== me.currentRoute){
        //            me.Tabdata[i].active = false  
        //         }
        //     }return me.Tabdata 
        // }
    },
   

    methods:{
        ActiveTab(ind){
            for (let i = 0; i < this.tabs.length; i++) {
                    if (i == ind ) {
                        this.tabs[i].active = true;
                        this.tabs[i].bgColor = '#01B4BB';
                        this.tabs[i].icon = this.tabs[i].whiteIcon;
                        this.tabs[i].color = '#fff';
                        
                        me.$router.push(this.tabs[i].link);
                    } else {
                        this.tabs[i].active = false;
                        this.tabs[i].bgColor = '#fff';
                        this.tabs[i].icon = this.tabs[i].blackIcon;
                        this.tabs[i].color = '#000000'

                    }
                            }

        },
         highlightmain(link, num){
         
        
         console.log("Inside the v-model:::>", link);
        
         this.jump(link);
        
         if(num == 1){
             this.isActive1 = '#90A4AE';
              this.isActive2 = 'white';
              this.isActive3 = 'white'
            //    this.isActive3 = false;
         }
          else if(num == 2){
              this.isActive1 =  'white';
              this.isActive2 = '#90A4AE';
               this.isActive3 = 'white';
            //    this.isActive3 = false;
         } else if(num == 3){
             this.isActive1 = 'white';
              this.isActive2 = 'white';
               this.isActive3 = '#90A4AE'
            //    this.isActive3 = false;
         }
        
        
       },
    }
    
}
</script>

<style>

.toptab{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
padding:20px;
border-radius:10px;
width:140px;
height:100px;
margin:10px;
cursor: pointer;

}
.activetab{
background-color: '#90A4AE'
}
.inactivetab{
    background-color: '#FFFFFF'
}

.toptab> *{
    font-size:10px;
}

</style>

