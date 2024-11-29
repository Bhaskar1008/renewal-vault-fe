<template>
  <!-- <v-sheet class="pa-5"> -->
  <v-flex
    xs12
    sm6
   
    style="
      max-width: 190px;
      float: right;
      flex-direction: column;
    "
  >
    <label >Communication systems</label>

    <v-btn-toggle v-model="communicationSystem"
    variant="outlined" divided>
      <v-btn @click="openModel()" >CCM</v-btn>
      <v-btn  @click="openModel()">DocIT</v-btn>
    </v-btn-toggle>

    <ConfirmationModalForComSystem
      :showModel="showModel"
      :communicationSystem="communicationSystem"
      @onCloseConfirmation="onCloseConfirmation"
    />
  </v-flex>
  <!-- </v-sheet> -->
</template>

<script>
import { apiService } from './common/common';
import ConfirmationModalForComSystem from "./ConfirmationModalForComSystem.vue";
export default {
  components: {
    ConfirmationModalForComSystem,
  },
  created(){
  this.getUserData()
  },
  data() {
    return {
      communicationSystem: 0,
      showModel: false,
    };
  },
 
  methods: {
    openModel(){
      this.showModel = true;
    },
    onCloseConfirmation() {
      this.showModel = false;
      this.getUserData()
    },
    getUserData(){
      let userData = JSON.parse(localStorage.loginResp);
      const username = userData.data.USER_NAME;
      apiService('get',`/fetch/user?userName=${username}`,{}).then((res)=>{
        if(res.status == 200){
          const {data} = res.data
          this.communicationSystem = data.rng == 'CCM' ? 0 : 1
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
};
</script>

<style scoped>
.switch-btn {
  display: inline-block;
}
</style>