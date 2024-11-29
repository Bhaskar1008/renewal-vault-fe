<template>
         
   <v-navigation-drawer 
      permanent
      relative
    >

      <v-list class="pt-0 hover" v-for="(tabs, index) in sideData" :key="index" >
          <template>
        <v-divider></v-divider>

       <!-- <router-link to="/Ltab/:tabs.link"> -->
            <v-list-tile @click="selected(index,tabs.num,tabs.link)" :class="[tabs.active == true ? 'activeTabData' : 'Inactivetabdata']"  >
                    <v-list-tile-content  >
                        <v-icon >{{tabs.icon}}</v-icon>
                        <span></span>
                    </v-list-tile-content>

                    <v-list-tile-content >
                        <v-list-tile-title :class="[tabs.active == true ? 'activetextcolor' : 'Inactievtextcolor']">{{tabs.title}}</v-list-tile-title>
                        <span></span>
                    </v-list-tile-content>
            </v-list-tile>
       <!-- </router-link>  -->

         <!-- <router-link to="/Ltab/contactD">
            <v-list-tile
      
            @click="highlight($event,2)"
            v-model="selecttab"
             :class="{ tabv: isActive2 }"
            >
            <v-list-tile-content>
                <v-list-tile-title>Contact Details</v-list-tile-title>
                <span></span>
            </v-list-tile-content>
            </v-list-tile>
         </router-link>

          <router-link to="/Ltab/proD">
            <v-list-tile
           
             @click="highlight($event, 3)"
              v-model="selecttab" 
               :class="{ tabv: isActive3 }"
               >
            <v-list-tile-content>
                <v-list-tile-title>Professional Details</v-list-tile-title>
                <span></span>
            </v-list-tile-content>
            </v-list-tile>
         </router-link> -->
          </template>
      </v-list>

    </v-navigation-drawer>
   
</template>



<script>
export default {

     data () {
      return {
         
          color:"#00ACC1",
          isActive: false,
          numbertab:'',
          blue:'blue'
          
          }},
          

    created(){
        console.log("Props received::->",this.sidetabdata);
        
        this.selected(0,0,'/Lmaster/Ltab/personalD');
    },
    props:{
        sideData:{
            type:Array
        }
    },
    computed: {
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
            // console.log("HEELLLLOOOOOO")
            for (let i = 0; i < this.sideData.length; i++) 
                this._route == this.sideData[i].link ? this.sideData[i].active = true : this.sideData[i].active = false
        },

        selected(ind,num,link){
            this.jump(link)
             console.log("Inside :::->",ind , " number " + num);
            // var self= this;
            
                for(let i=0; i < this.sideData.length; i++){
                    if( i == ind){
                        this.sideData[i].active = true
                        // this.sideData[i].bgcolor='#90A4AE'
                        // this.sideData[i].color='white'
                        // this.sideData[i].icon.color='white'
                    }else{
                        this.sideData[i].active = false
                        // this.sideData[i].bgcolor='white'
                        // this.sideData[i].color='black'
                    }

                    // if(ind ==  this.sideData[i].num){
                    //     // console.log("Selected Ran with Index::", ind);
                    //     // alert("Worked",this.ind);
                    //     // this.color = "red";
                    //     // ind = this.color;
                    // }
                    // this.color = red;
                }  
                console.log("after action",this.sideData)         

            //  var change = 
            //  ind = change
        }

    },
    


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
*{
    text-decoration: none !important;
}
.tabv{
    /* border:1px red dottesd; */
   
     padding: 10px 0px;
    border:2px red dashed;
    background-color:#00ACC1;
    color: white;
    text-decoration:  none!important;;
}

.tabv.active{
    /* border:1px red dottesd; */
   
     padding: 10px 0px;
    /* border:2px red dashed; */
    background-color:blue;
    color: white;
    text-decoration:  none!important;;
}
.activeTabData{
    background-color:#90A4AE
}
.Inactivetabdata{
    background-color:#FFFFFF
}
.activetextcolor{
    color:#FFFFFF
}
.Inactievtextcolor{
    color:black
}

.active-tab{
    background-color: blue;
}
.Inactive{
    background-color: #FFFFFF
}

.v{
    /* border:1px red dottesd; */
    padding: 10px 0px;
    border:2px red dashed;
    background-color:#999;
    
}


.hover :hover{
    font-size:16.5px;
    cursor: pointer;
}


</style>
