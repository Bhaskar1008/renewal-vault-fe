<template>
<div>
    <!-- <v-playback :url="url" ></v-playback> -->
</div>
</template>

<script>
 import Vue from 'vue'
import vPlayBack from 'v-playback';
Vue.use(vPlayBack);
 export default {
    data(){
        return {
            url: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }
    }
};

</script>