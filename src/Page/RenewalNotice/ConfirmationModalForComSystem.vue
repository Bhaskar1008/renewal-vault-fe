<template>
  <v-layout row justify-center>
    <v-dialog v-model="showModel" persistent max-width="300">
      <v-card>
        <v-card-text>
          Are you sure you want change communication systems to
          {{ communicationSystem == 0 ? "CCM" : "DocIT" }}
        </v-card-text>
        <v-btn color="primary darken-1" flat="flat" @click="onClose()">
          No
        </v-btn>
        <v-btn color="primary darken-1" flat="flat"
        @click="updateCommunicationSystem()"
        > Yes </v-btn>
      </v-card>
    </v-dialog>
    
   <Loader :isLoading="isLoading"/> 
  </v-layout>
</template>
<script>
import { apiService } from './common/common';
import Loader from './common/Loader.vue'

export default {
  props: ["showModel", "communicationSystem"],
  components:{
    Loader
  },
  data(){
    return {
      isLoading:false
    }
  },
  emits: ["onCloseConfirmation"],
  methods:{
    updateCommunicationSystem(){
      const payload = {
        communicationSystem : this.communicationSystem == 0 ? "CCM" : "DocIT"
      } 
      this.isLoading=true
      apiService('post',"/update/communication-systems",payload).then((res)=>{
       if(res.status == 200){
        this.isLoading=false
        this.showModel = false
        this.showSnackbar({ text: res.data.msg, color: "green" });
        this.$emit('onCloseConfirmation')
       }
      }).catch((err)=>{
        this.isLoading=false
        this.showSnackbar({ text: "Failed to update communication system", color: "red" });
      })
    },
    onClose(){
      this.showModel = false
      this.$emit('onCloseConfirmation')
    }
  }
};
</script>

<style scoped>
</style>