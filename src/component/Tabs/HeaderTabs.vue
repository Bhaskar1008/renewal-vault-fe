<template>

<!-- <div> -->
    <!-- <v-app> -->
        <!-- <v-card> -->
            <!-- <v-layout row wrap > -->
                <!-- <v-flex class="ml-3 mt-3 " style="flex-flow:column wrap;width:100%;"> -->
        <!-- <v-flex style="position:absolute;top:50px"><p class="heading mb-0 ml-5" style="font-size:19px;" >Create Lead</p></v-flex> -->
     <v-layout  justify-center row  class="header-tabs-root">
             <div class="toptab " :class="[data.active == true ? 'activetabs' : 'inactivetab']" v-for="(data,index) in Tabdata" :key="index"  ripple    @click="ActiveTab(index)"> 
                 <v-icon color="#455A64"  large> {{data.Ticon}} </v-icon> {{data.Tname}} 
            </div>
     </v-layout>

                <!-- </v-flex> -->
            <!-- </v-layout> -->
        <!-- </v-card> -->
    <!-- </v-app> -->
<!-- </div> -->
    
</template>



<script>
export default {
    props:{
        Tabdata : Array
    },
    created(){
    

    },
    mounted(){
        this.tabActiveThroughRoute();
    },
    data(){
        return {
        
        //   darkgrey:'#424242',
          isActive1:'#90A4AE',
        //   isActive1: false,
        //    isActive2: false,
        //     isActive3: false,
            
        }
    },
    computed:{
        _route() {
            return this.$store.state.links;
        }

    },
    watch: {
        _route(cPath, oldPath) {
            
                this.tabActiveThroughRoute();

        }
    },
   

    methods:{
         tabActiveThroughRoute() {
            for (let i = 0; i < this.Tabdata.length; i++) 
                this._route.includes('/Lmaster/Ltab/') == this.Tabdata[i].Tlink.includes('/Lmaster/Ltab/') ? this.Tabdata[i].active = true : this.Tabdata[i].active = false
        },
        ActiveTab(ind){
            console.log("COMPENET DATA",this.Tabdata)
            for (let i = 0; i < this.Tabdata.length; i++) {
                    if (i == ind ) {
                        this.Tabdata[i].active = true
                        
                        
                        this.$router.push(this.Tabdata[i].Tlink);
                    } else {
                        this.Tabdata[i].active = false;

                    }
                            }

        },
    //      highlightmain(link, num){
         
        
    //      console.log("Inside the v-model:::>", link);
        
    //      this.jump(link);
        
    //      if(num == 1){
    //          this.isActive1 = '#90A4AE';
    //           this.isActive2 = 'white';
    //           this.isActive3 = 'white'
    //         //    this.isActive3 = false;
    //      }
    //       else if(num == 2){
    //           this.isActive1 =  'white';
    //           this.isActive2 = '#90A4AE';
    //            this.isActive3 = 'white';
    //         //    this.isActive3 = false;
    //      } else if(num == 3){
    //          this.isActive1 = 'white';
    //           this.isActive2 = 'white';
    //            this.isActive3 = '#90A4AE'
    //         //    this.isActive3 = false;
    //      }
        
        
    //    },
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
    box-shadow: 4px 4px 1px -1px #eae8e8;
    /* background-color: black */

}
.activetabs{
background-color: #90A4AE
}
.inactivetab{
    background-color: #f7f7f7
}

.toptab> *{
    font-size:10px;
}

/* .header-tabs-root .theme--light.v-sheet {
    background-color: black;
} */

</style>

