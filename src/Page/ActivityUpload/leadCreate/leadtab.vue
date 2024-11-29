<template>
<div>
	<v-tabs icons-and-text centered dark color="secondary" v-model="active" slider-color="red">
        <v-tab v-for="(head,n) in tabs" :key="n" class="color" ripple @click="currentTab = head.text">{{head.value}}</v-tab>
    </v-tabs>
    <div>
        <!-- <component v-bind:is="currentTabComponent" ></component> -->
    </div>
</div>
</template>

<script>

// import proposalNew from '../Page/Proposal/proposal'
// import proposalArchive from '../Page/Proposal/proposalArchieve'
// import proposalPassed from '../Page/Proposal/proposalPass'
// import proposalRejected from '../Page/Proposal/propsalreject'
// import proposalOpen from '../Page/Proposal/propsalOpen'

export default {
    data(){
        return {
            currentTab: 'status',

            tabs:[{
                text:'status',
                value:'Status Lead'
            },
            {
               text:'personal' ,
                value:'personal Details'

            },
            {
               text:'Conatct' ,
                value:'Conatct Details'

            },
            {
               text:'History' ,
                value:'History'

            },
            ],
            active:null,

            tab1: false
        }
    },
    computed: {
        // currentTabComponent: function () {
        //     console.log(this.currentTab);
        //     return 'proposal-' + this.currentTab.toLowerCase();
        // }
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
    // components:{
    //      proposalNew,
    //      proposalArchive,
    //      proposalPassed,
    //      proposalRejected,
    //      proposalOpen
    // }
}
</script>


<style>
	.color{
        color:azure;
    }
</style>