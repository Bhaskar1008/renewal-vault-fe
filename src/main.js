import Vue from 'vue'
import Vuex from 'vuex'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'typeface-roboto/index.css'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes'
// import Slick from 'vue-slick'
import Vuelidate from 'vuelidate'
import * as VueGoogleMaps from "vue2-google-maps";
import 'vuetify/dist/vuetify.min.css'
import VueFormulate from '@braid/vue-formulate'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import mixins from './mixins/index'

import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$adminType = 'superAdmin'
Vue.prototype.$screenList = [
                    {"ID": "FR1", "screenName": "Policy Summary", "FR1": false },
                    {"ID":"FR2","screenName":"Collection And Processing","FR2":false},
                    {"ID":"FR3","screenName":"Batch Status","FR3":false},
                    {"ID":"FR4","screenName":"Manual QC(Download Pre Extract)","FR4":false},
                    {"ID":"FR5","screenName":"Upload Modified Extract","FR5":false},
                    {"ID":"FR6","screenName":"Trigger to CCM","FR6":false},
                    {"ID":"FR7","screenName":"Batch Reports","FR7":false},
                    {"ID":"FR8","screenName":"Producer licence Expired(Single Policy Modification)","FR8":false},
                    {"ID":"FR9","screenName":"Producer licence Expired(Multiple Policy Modification)","FR9":false},
                    {"ID":"FR10","screenName":"RN Regeneration Page","FR10":false},
                    {"ID":"FR11","screenName":"Post Generation RN(Download Pre Extract)","FR11":false},
                    {"ID":"FR12","screenName":"Post Generation RN(Upload Modified Extract)","FR12":false},
                    { "ID": "FR13", "screenName": "Audit Policy Modification", "FR13": false },
                    {"ID": "FR14", "screenName": "Upload Travel Referred Cases", "FR14": false },
                    {"ID":"FR15","screenName":"Accept/Decline","FR15":false},
                    {"ID":"FR16","screenName":"User Management","FR16":false},
                    {"ID":"FR17","screenName":"Sharing Renewal Notice","FR17":false},
                    {"ID":"FR18","screenName":"Inactive Policy","FR18":false},
                    { "ID": "FR19", "screenName": "Dashboard", "FR19": false },
                    { "ID": "FR21", "screenName": "Policy Summary - AIGC", "FR21": false },
                    { "ID": "FR22", "screenName": "Rv vs DataRep", "FR22": false },
                     { "ID": "FR23", "screenName": "UploadWarrantiesMop", "FR23": false },
                     { "ID": "FR24", "screenName": " Bulk Bucket Movement - Excel", "FR24": false },
                     { "ID": "FR26", "screenName": " Pull Data From Data-Rep", "FR26": false },
                     { "ID": "FR27", "screenName": " Download Reports", "FR27": false },
]

Vue.use(Vuetify, {
    iconfont: 'mdi'
  })


Vue.filter('id-filter', (id, initial = 'P') => {
    if (id !== '') {
        if (typeof(id) !== undefined) {
            id = initial + id.slice(16, 25).toUpperCase();
        }
    }
    return id;
});

Vue.filter('to-capitlaize', function(strText) {
    try {
        if (strText === '' || strText === null || typeof(strText) === 'undefine') {
            return strText;
        } else {
            let _str = strText.toLowerCase();
            let collection = _str.split(" ");
            let modifyStrigs = [];
            _str = '';
            for (let i = 0; i < collection.length; i++) {
                modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
                _str = _str + modifyStrigs[i] + ' ';
            }
            return _str;
        }
    } catch (Exception) {
        return strText;
    }

});

Vue.filter('name-shorter', function(userName) {
    if (typeof(userName) == undefined || userName == '' && typeof(userName) == 'number' || userName == null) {
        userName = 'NN'
    } else {
        let arr = userName.split(" ");
        let fLatter = arr[0].charAt(0);
        let sLatter = arr[1] == undefined ? '' : arr[1].charAt(0);
        userName = fLatter + sLatter;
    }
    return userName.toUpperCase();

});

Vue.use(Vuex);
Vue.use(Vuelidate);

Vue.use(VueFormulate)

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyCoXVoYMx_R4mSpJ1Dst9t9TB1WhrvOduk",
        libraries: "places,directions" // necessary for places inpu
    }
});


Vue.mixin(mixins)

Vue.use(VueRouter);

const router = new VueRouter({
    // mode: 'history'
    routes
});


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
