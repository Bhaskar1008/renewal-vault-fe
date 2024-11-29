<template>
  <v-snackbar
    top
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    
    :multi-line="snackbar.multiline === true">
    
    {{ snackbar.text }}

    <v-btn flat dark @click="closeSnackbar">Close</v-btn>

  </v-snackbar>
</template>
<script>
  import { mapMutations } from 'vuex'

  export default {
    mounted() {
      console.log('Color from store :  =>  ', this.$store.state.snackbar.color);
    },
    computed: {
      snackbar () {
        return this.$store.state.snackbar
      }
    },
    methods: {
      ...mapMutations(['closeSnackbar'])
    }
   }
</script>
