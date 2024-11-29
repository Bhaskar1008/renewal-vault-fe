<template>
<div>
	<v-tabs icons-and-text class="mt-2" centered light color="#FAFAFA" v-model="active" slider-color="#7F7F7F">
        <v-tab v-for="(head,n) in tabs" :key="n" class="color" ripple v-on:click="currentTab = head.text">{{head.value}}</v-tab>
    </v-tabs>
    <div>
        <component v-bind:is="currentTabComponent" ></component>
    </div>
</div>
</template>

<script>

import proposalNew from '../Page/Proposal/proposal'
import proposalArchive from '../Page/Proposal/proposalArchieve'
import proposalPassed from '../Page/Proposal/proposalPass'
import proposalRejected from '../Page/Proposal/propsalreject'
import proposalOpen from '../Page/Proposal/propsalOpen'
import proposalAll from '../Page/Proposal/proposalAll'


// @usama
import load from '../common/onProjectLoad'

export default {

    mounted() {
        this.$store.commit('SET_PAGE_TITLE', 'Applications');
        load.loadRoleCodes(this);
        load.loadProductCategories(this, this.getAgentInfo()._id);
    },
    data(){
        return {
            currentTab: 'All',

            tabs:[
                {
                text:'All',
                value:'All'
            },    
            {
                text:'New',
                value:'Login'
            },
            {
               text:'Open' ,
                value:'Draft'

            },
            {
               text:'Passed' ,
                value:'Issued'

            },
            {
               text:'Rejected' ,
                value:'Rejected'

            },
            ],
            active:null,

            tab1: false
        }
    },
    computed: {
        currentTabComponent: function () {
            console.log(this.currentTab);
            return 'proposal-' + this.currentTab.toLowerCase();
        }
    },
    methods:{
         jump(to) {
                if (this.$router) {
                    this.$router.push(to)
                }
            },
        mFunc(id) {
            // console.log('tab id' +id);
            // if(id === 0) {
            //     this.tab1 = true
            // } else if() {
            //     this.tab1 = false
            // }
        }


    },
    components:{
         proposalNew,
         proposalArchive,
         proposalPassed,
         proposalRejected,
         proposalOpen,
         proposalAll
    }
}
</script>


<style>
	.color{
        color:azure;
    }
    .v-tabs__slider-wrapper{
        width:77px !important;
        margin-left:19px !important;
    }
    .v-tabs__container--fixed-tabs .v-tabs__div, .v-tabs__container--icons-and-text .v-tabs__div{
        min-width: 110px;
        /* border:1px red dotted; */
    }
</style>
