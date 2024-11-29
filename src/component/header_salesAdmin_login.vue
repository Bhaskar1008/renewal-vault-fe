<template>
    <div id="app">
      <v-toolbar
      color="secondary"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
      >
    <v-spacer></v-spacer>
        <v-flex >
            <img  style="width:165px; height:30px" src="../../web/assets/renewalvaultlogo.png" @click.native="jump('/proptab')">            
        </v-flex>
     </v-toolbar>
</div>
</template>

<script>
export default {
    data(){
        return{
      drawer: null,
    
        }
    },

    props: {
      source: String
    },

    methods:{
         jump(to) {
             console.log("hello")
                if (this.$router) {
                    this.$router.push(to)
                }
            },

        logout(){
              
            const Authenticate={
                email: '',
                password: ''
            }                
            this.$store.commit('SET_AGENT_DATA', {})
            this.$router.push('/LoginView');
        }
    }
}
</script>
<style>
    .crsr{
        cursor: pointer;
    }

</style>
