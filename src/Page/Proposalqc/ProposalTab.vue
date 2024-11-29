<template>
<v-app>
<div>
   <v-toolbar color="primary" dark >
     <v-toolbar-title>Rahul Soni | PID87525</v-toolbar-title>
        <!-- <v-spacer></v-spacer> -->
    <v-tabs icons-and-text
    centered
    slot="extension"
      v-model="active"
      color="primary"
      dark
      slider-color="red"
      style="height:80px"
    >
      <v-tab
        v-for="(head,n) in tabs"
        :key="n"
        ripple
      >
      {{head.text}}
      </v-tab>
     
     
        
</v-tabs>
 </v-toolbar>
  <v-tabs-items v-model="active">
    <v-tab-item  v-for="n in 4" :key="n">
      <!-- <v-card flat> -->
         <proposal-bi v-if="n== 1"></proposal-bi>
        <proposal-fulfillment v-if="n== 2"></proposal-fulfillment>
        <proposal-recipting v-if="n== 3"></proposal-recipting>
        <proposal-doc v-if="n== 4"></proposal-doc>
      
      <!-- </v-card> -->
       
        </v-tab-item>
  </v-tabs-items>
    <div class="text-xs-center mt-3">
      <v-btn @click.native="next">next tab</v-btn>
    </div>
    
</div>

</v-app>
</template>


 <script>
 import proposalBi from './ProposalBi.vue';
 import proposalRecipting from './ProposalRecipting.vue'
 import proposalDoc from './ProposalDocumentUpload.vue'
 import proposalFulfillment from './Proposalfulfilment.vue'


  export default {
    components:{
      proposalRecipting,
       proposalDoc,
      proposalBi,
      proposalFulfillment,
   
    },
    data () {
      return {
        tabs:[{
          text:'Proposal BI',
        },
        {
          text:'Proposal Fulfillment',
        },
        {
          text:'Proposal Receipt',
        },
        {
          text:'Proposal Document',
        },

        ],
        active:null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        link:'/proposalbi',
        // tabItem:4
     }
    },
    methods: {
      next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0).toString()
      }
    }
  }
</script>

<style>


@media screen and (min-width: 320px) {
  
}
@media screen and (min-width: 768px) {
  
}
@media screen and (min-width: 992px) {
  
}
</style>
