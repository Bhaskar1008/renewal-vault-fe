<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="logoutsession" persistent max-width="290">
                <v-card  >
                    <v-card-title class="headline d-flex justify-center">Session Expired
                    </v-card-title>
                    <v-card-actions  style="justify-content: center" >
                        <v-btn color="#212121" dark v-on="on" @click="logout">Login Again</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
         dialog:false,   
        }
    },
    computed:{
        logoutsession(){
            return this.$store.state.sessionlogout
        }
    },
    methods:{
        logout(){
            this.OpenSessionExpiredpopup(false)
            localStorage.clear();
            this.$store.commit('SET_AGENT_DATA', {})
            this.showLoader(false);
            this.jump('/LoginView');
        }
    }
}
</script>
<style>

</style>