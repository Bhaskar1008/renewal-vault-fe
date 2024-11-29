import * as URL from '../common/API_Config.js'
import axios from 'axios';
import { mapMutations } from 'vuex'
let tokenDataObj = null;
export default {
    methods: {

        validate_alpha_numeric(value, identity, callback){

            if(identity == 1){

                //for titles
                if(value.length > 0){
                    if(/^[0-9a-zA-z!?.&, \s]+$/g.test(value) != true){

                        //value = value.replace(/[^0-9A-Za-z!?., ]/g, '');
                        callback(true, value)
                    }else{
                        callback(false, value)
                    }
                }
            }else if(identity == 2){

                // for descriptions
                if(value.toString().length > 0){
                    if(/^[0-9a-zA-z &;:,!.?= \s]*$/g.test(value) != true){

                        value = value.replace(/[^0-9a-zA-z &;:,!.?= \s]/g, '');
                        callback(true, value)
                    }else{
                        callback(false, value)
                    }
                }
            }else if(identity == 3){

                // for only numbers
                if(value.toString().length > 0){
                    if(/^[0-9]*$/g.test(value) != true){
                        value = value.replace(/\D/g, '');
                        callback(true, value)
                    }else{
                        callback(false, value)
                    }
                }

            }else if(identity == 4){

                // for only alphabets
                if(value.length > 0){
                    if(/^[a-zA-z \s]+$/g.test(value) != true){
                        value = value.replace(/[^A-Za-z \s]/g, '');
                        callback(true, value)
                    }else{
                        callback(false, value)
                    }
                }

            }else{


                // for only alphabets and numbers
                if(value.toString().length > 0){
                    if(/^[0-9a-zA-z \s]+$/g.test(value) != true){
                        value = value.replace(/[^0-9A-Za-z \s]/g, '');
                        callback(true, value)
                    }else{
                        callback(false, value)
                    }
                }

            }


        },


        ...mapMutations(['showSnackbar', 'closeSnackbar']),
        jump(to) {
            if (this.$router) {
                this.$router.push(to)
            }
        },
        TOST() {
            return {
                INFO: 'info',
                SUCCESS: 'success',
                ERROR: 'error',
                WARNING: 'warning'
            }
        },

        generateRandomCode(howMany = 6, key = 'abcdefhgklmnpqrtuysovwxz0123456789') {
            let code = '';
            for (let x = 0; x < howMany; x++) {
                code += key.charAt(Math.floor(Math.random() * key.length));
            }
            return code;
        },

        imageURL() {
            var imgUrl = URL.Image_URL
            return imgUrl;
        },
        SALES_DRIVE_URL() {
            var Sales_drive = URL.SALESDRIVE_URL
            return Sales_drive;
        },
        doSentenceCase(strText) {
            try {
                var _str = strText.toLowerCase();
                var collection = _str.split(" ");
                var modifyStrigs = [];
                _str = '';
                for (var i = 0; i < collection.length; i++) {
                    modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
                    _str = _str + modifyStrigs[i] + ' ';

                }
                return _str.trim();
            } catch (err) {}
        },


        showToast(content, type, timeout) {
            type == "info" ? this.showSnackbar({ text: content, color: 'info', timeout: timeout }) :
                type == "success" ? this.showSnackbar({ text: content, color: 'success', timeout: timeout }) :
                type == "error" ? this.showSnackbar({ text: content, color: 'error', timeout: timeout }) :
                type == "warning" ? this.showSnackbar({ text: content, color: 'warning', timeout: timeout }) : ""
        },

        API_Service() {
            var API = URL.USER_URL;
            return API
        },

        API_Service_admin() {
            var API = URL.BaseURl;
            return API
        },

        API_Service_admin_bank() {
            var API = URL.BANK_URL;
            return API
        },

        API_Service_admin_bulklist() {
            var API = URL.BUKLIST_URL;
            return API
        },

        getURL(URL_TYPE) {
            var url = URL[URL_TYPE];
            return url;
        },

        GET(API, callback) {
            let self = this;
            self.showLoader('Loading', true);
            axios.get(this.API_Service_admin() + API , this.authHeader())
                .then(function(response) {
                    if (response.data.errCode === 2025) {
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader('Loading', false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    }else if(response.data.errCode === 2916){
                        self.OpenSessionExpiredpopup(true)
                    }else if(response.data.errCode === 3025){
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader(false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    } else {
                        self.showLoader('Loading', false);
                        callback(response)
                    }
                })
                .catch(function(error) {
                    self.showLoader('Loading', false);
                    callback(null, error);
                });
        },
        GETSTATE(callback) {
            this.GET('getState_city?userId='+this.$store.state.agentDetails._id+'&getstate=allstate', res => {
                if (res.data.errCode === -1) {
                    callback(res.data.errMsg)
                }
            })
        },
        GETCITY(statecode, callback) {
            this.GET('getState_city?userId='+this.$store.state.agentDetails._id+'&stateCode=' + statecode, res => {
                if (res.data.errCode === -1) {
                    callback(res.data.errMsg)
                }
            })

        },
        POST(API, formData, successCallBack,failedCallBack) {
            let self = this;
            axios.post(this.API_Service_admin() + API, formData, this.authHeader())
                .then(function(response) {
                    if (response.data.errCode === 2025) {
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader('Loading', false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    }else if(response.data.errCode === 2916){
                        self.OpenSessionExpiredpopup(true)
                    }else if(response.data.errCode === 3025){
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader(false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    }  else {
                     
                        successCallBack(response)
                       
                    }
                })
                .catch(function(error) {
                 
                    failedCallBack(null, error);
                });
        },        
        
        PUT(API, formData, cb) {
            let self = this;
            axios.put(this.API_Service_admin() + API, formData , this.authHeader())
                .then(function(response) {
                    if (response.data.errCode === 2025) {
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader('Loading', false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    }else if(response.data.errCode === 2916){
                        self.OpenSessionExpiredpopup(true)
                    }else if(response.data.errCode === 3025){
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader(false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    } else {
                        cb(response)
                    }
                })
                .catch(function(error) {
                    cb(null, error);
                });
        },
        PUTUSER(API, formData, cb) {
            let self = this;
            axios.put(this.API_Service() + API, formData , this.authHeader())
                .then(function(response) {
                    if (response.data.errCode === 2025) {
                        self.showLoader('Loading', false);
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    }else if(response.data.errCode === 2916){
                        self.OpenSessionExpiredpopup(true)
                    }else if(response.data.errCode === 3025){
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader(false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    }  else {
                        cb(response)
                    }
                })
                .catch(function(error) {
                    cb(null, error);
                });
        },
        POSTUSER(API, formData, callback) {
            let self = this;
            axios.post(this.API_Service() + API, formData , this.authHeader())
                .then(function(response) {
                    if (response.data.errCode === 2025) {
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader('Loading', false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    }else if(response.data.errCode === 2916){
                        self.OpenSessionExpiredpopup(true)
                    }else if(response.data.errCode === 3025){
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader(false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    } else {
                        callback(response);
                    }
                })
                .catch(function(error) {
                    callback(null, error);
                });
        },
        GETUSER(API, callback) {
            let self = this;
            axios.get(this.API_Service() + API , this.authHeader())
                .then(function(response) {
                    if (response.data.errCode === 2025) {
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader('Loading', false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    }else if(response.data.errCode === 2916){
                        self.OpenSessionExpiredpopup(true)
                    }else if(response.data.errCode === 3025){
                        localStorage.clear();
                        self.$store.commit('SET_AGENT_DATA', {})
                        self.showLoader(false);
                        self.jump('/LoginView');
                        self.showToast('UnAuthorised User','error',)
                    }  else {
                        callback(response);
                    }
                })
                .catch(function(error) {
                    callback(null, error);
                });
        },

        GETBANKAPI(API, callback) {
            axios.get(this.API_Service_admin_bank() + API , this.authHeader())
                .then(function(response) {
                    callback(response);
                })
                .catch(function(error) {
                    callback(null, error);
                });
        },


        GETBULKLIST(API, callback) {
            axios.get(this.API_Service_admin_bulklist() + API , this.authHeader())
                .then(function(response) {
                    callback(response);
                })
                .catch(function(error) {
                    callback(null, error);
                });
        },

        getAgentInfo() {
            return this.$store.getters.getAgentDetails;
        },
        paginationdiff() {
            let diff = 15
            return diff
        },

        node_img_url() {
            var imgsrc = URL.node_img_url
            return imgsrc;
        },
        readImage(evt, callback) {
            let reader = new FileReader();
            reader.readAsDataURL(evt.target.files[0]);
            let temp = {};
            reader.onload = function() {
                temp.image = reader.result;
                temp.name = evt.target.files[0].name;
                callback(temp);
            };
        },
        showConfirmDialog(title, message, type, callback) {
            this.commit('SHOW_CONFIRM_BOX', {
                title,
                message,
                type,
                show: true,
                callback
            });
        },
        showLoader(title, bool) {
            this.$store.commit('SHOW_LOADER', { title: title, bool: bool });
        },

        commit(commitName, data) {
            this.$store.commit(commitName, data);
        },
        getStore(getter) {
            return this.$store.getters[getter];
        },

        // Youtube URL validatory using regext
        YTD_URLValidate() {
            /**
             * @author Khan Usama
             * @description YouTube URL validation
             */
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            return evt.match(regExp) == null ? true : false; // here true mean URL is not a valid
        },

        authHeader() {
            const  access_list_fr = JSON.parse(localStorage.awsToken);
            return {
                headers:{
                    "Authorization": access_list_fr.token_type + ' ' + access_list_fr.access_token,
                    "Content-Type": "application/json",
                 }
            }
        },

        // autheader() {
        //     // let  headerObj= {
        //     //             headers:{
        //     //             "Content-Type": "application/json",
        //     //             // "x-access-token": this.$store.getters.fetchToken
        //     //              "Authorization": a_c_t_data.auth.signInUserSession.idToken.jwtToken
        //     //             }
        //     //      }
        //     // return headerObj;
        //     return {
        //         headers: {
        //             "Content-Type": "application/json",
        //             "x-access-token": this.$store.getters.fetchToken,
        //             "Authorization": a_c_t_data.auth.signInUserSession.idToken.jwtToken
        //         }
        //     }
        // },
        
        

        // Mixin filter

        doSentenceCase(strText) {
            if (strText === '' || strText == null || typeof(strText) === undefined || !isNaN(strText)) {
                return strText;
            }

            try {
                var _str = strText.toLowerCase();
                var collection = _str.split(" ");
                var modifyStrigs = [];
                _str = '';
                for (var i = 0; i < collection.length; i++) {
                    modifyStrigs[i] = collection[i].charAt(0).toUpperCase() + collection[i].slice(1);
                    _str = _str + modifyStrigs[i] + ' ';
                }
                return _str;
            } catch (err) {
                return strText;
            }
        },
        idFilter(id, initial = null) {
            try {
                if (id !== '') {
                    if (initial === null || initial === undefined || initial === "") {
                        initial = 'L';
                    }
                    if (typeof(id) !== undefined) {
                        id = initial + id.slice(16, 25).toUpperCase();
                    }
                }
                return id;
            } catch (err) {}
        },
        OpenSessionExpiredpopup(event){
            this.$store.commit('LOGOT_SESSION',event)
        },
        getStates () {
            return this.$store.getters.fetchStatesCities.states;
        },

        filterCities (state) {
            let self = this;
            try {
                let cities = this.$store.getters.fetchStatesCities.allCities.filter(e => e.StateName.toLowerCase().localeCompare(state.toLowerCase()) === 0);
                let citList = cities.map(e => self.doSentenceCase(e.cityName));
                return citList;
            } catch (exception) {
                console.log(exception)
            }
        },

        matchCity (city, cities) {
            let filterCity = cities.filter(e => e.toLowerCase().localeCompare(city.toLowerCase()) === 0);
            if (filterCity.length === 0) {
                return '';
            } else {
                return filterCity[0];
            }
        },
    },


}
