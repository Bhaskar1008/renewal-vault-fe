<template>
    <v-form ref="alertPanel">
        <v-layout row v-if="menu">
            <v-flex xs12 sm6 offset-sm3 class="mt-1">
                <v-card>
                    <v-subheader class="ml-3 mb-0 pt-2 pl-0 mr-5 notifi-text">Notifications</v-subheader>
                    <p class="marktext" @click="markAll()">Mark all as read</p>
                    <v-divider></v-divider>
                    <div class="notif-window" style="width: 400x;height: 400px;overflow-y: auto">
                        <v-list v-for="(item, index) in items" :key="index" class="pb-0 pt-0" >
                            
                            <!--  <template> -->
                            <v-list-tile  avatar ripple @click="gotoLead(item)" class="notifi_height" :class="item.IS_NOTIFICATION_VIEWED === 0 ? 'unseenbgcolor' : 'seenbgcolor'">
                                <v-list-title-avatar>
                                    <v-icon class="bellicon ml-0 mr-3 mb-0">notifications</v-icon>
                                </v-list-title-avatar>
                                <!-- <v-list-tile-content>
                                <v-list-tile-title>{{ item.MODULE }}</v-list-tile-title>
                                <v-list-tile-sub-title class="text--primary">{{ item.NOTIFICATION_FOR }}</v-list-tile-sub-title>
                                <v-list-tile-sub-title class="">{{ item.appid }}</v-list-tile-sub-title>
                                <v-list-tile-sub-title>{{ item.created }}</v-list-tile-sub-title>
                                </v-list-tile-content> -->
                                
                                <v-list-tile-content class="mt-3">
                                <v-list-tile-title class="titletext"><span class="batchtext">Batch ID: </span>{{ item.JOB_ID}}</v-list-tile-title>
                                <v-list-tile-title class="statustext"><span class="batchtext">Status: </span>{{ item.JOB_EXECUTION_STATUS }}</v-list-tile-title>
                                <v-list-tile-title class="timetext">{{ time_ago(parseInt(item.NOTIFICATION_ID)) }}</v-list-tile-title>

                                <!-- <v-list-tile-sub-title class="text--primary">{{ item.TIME }}</v-list-tile-sub-title> -->
                                <!-- <v-list-item-tile class="notification-text">{{ item.NOTIFICATION_TXT }}</v-list-item-tile> -->
                                <v-icon color="grey lighten-1"></v-icon>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
                            
                            <!-- </template> -->

                        </v-list>
                        <v-divider></v-divider>
                        <p class="titletext viewalltext" v-if="items.length!==0" @click="viewnotifications()">View All Notifications</p>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-form>
</template>

<script>
  import axios from 'axios' ;
  import moment from 'moment'
import { oAuthURl, tokenCred } from '../common/API_Config';
  let tokenDataObj = null
  export default {
    props: {
      menu: {
        type: Boolean,
        default: false
      },
      
    },
    data () {
      return {

        items: [],
      }
    },

    methods: {
        viewnotifications(){
				  this.$router.push('/notifications')
        },
      
        time_ago(time) {
          time = time * 1000
          switch (typeof time) {
            case 'number':
              break;
            case 'string':
              time = +new Date(time);
              break;
            case 'object':
              if (time.constructor === Date) time = time.getTime();
              break;
            default:
              time = +new Date();
          }
          var time_formats = [
            [60, 'seconds', 1], // 60
            [120, '1 minute ago', '1 minute from now'], // 60*2
            [3600, 'mins', 60], // 60*60, 60
            [7200, '1 hour ago', '1 hour from now'], // 60602
            [86400, 'hrs', 3600], // 606024, 60*60
            [172800, 'Yesterday', 'Tomorrow'], // 606024*2
            [604800, 'days', 86400], // 6060247, 6060*24
            [1209600, 'Last week', 'Next week'], // 60602474*2
            [2419200, 'weeks', 604800], // 60602474, 606024*7
            [4838400, 'Last month', 'Next month'], // 60602474*2
            [29030400, 'months', 2419200], // 6060247412, 6060247*4
            [58060800, 'Last year', 'Next year'], // 60602474122
            [2903040000, 'years', 29030400], // 6060247412100, 60602474*12
            [5806080000, 'Last century', 'Next century'], // 6060247412100*2
            [58060800000, 'centuries', 2903040000] // 606024741210020, 6060247412*100
          ];
          var seconds = (+new Date() - time) / 1000,
            token = 'ago',
            list_choice = 1;

          if (seconds == 0) {
            return 'Just now'
          }
          if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'from now';
            list_choice = 2;
          }
          var i = 0,
            format;
          while (format = time_formats[i++])
            if (seconds < format[0]) {
              if (typeof format[2] == 'string')
                return format[list_choice];
              else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
          return time;
        },

        getToken(){
            let self = this
            axios.post(oAuthURl,
                `grant_type=${tokenCred.grantType}&client_id=${tokenCred.clientId}&client_secret=${tokenCred.clientSecret}`
            ).then( res => {
                
                if(res.status == 200){
                    tokenDataObj = res.data
                    // this.getdata('15',0)
                    // this.getLOBData()
                    this.getNotificationData();
                    // console.log('POST__TOKEEENNN__RSPPPPPPP' , tokenDataObj)
                }
            })
            .catch(error => {})
        },

        getNotificationData(){
          let self = this
          console.log("notifications")
            axios({
                method: "post",
                url:"https://9h0d6g9kf2.execute-api.ap-south-1.amazonaws.com/prod/notifications",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                    "userId": "1623225953967",
                    "limit": "10",
                    "offset": "0",
                    "lastEvaluatedKey": null
                },
            }).then(function (response) {
                console.log('DATA RESPONSE:::',response.data.data);
                // this.$store.commit('NOTIFICATION_DATA',response.data.data);
                self.items = response.data.data.Items;
                // self.Tabledata = []
                // let _data = {}
                console.log('ITEMS::',self.items)
            }).catch(function (error) {});  
        },

        getNotification() {

          // const GET_NOTIF_ = 'getnotifyAdmin/'+this.getAgentInfo()._id+'?notification_type=all'
          const GET_NOTIF_ = "https://9h0d6g9kf2.execute-api.ap-south-1.amazonaws.com/prod/notifications"
          let self = this;
          this.items = [];

          this.GET(GET_NOTIF_ , function (res ,error ){
            console.log('DATA RESPONSE:::',response.data.data);
            // res.data.errMsg[0].forEach(element => {
              //     element.leadId = '5c485161aa27a746c89b08b6';
              // });
            let _noti_ = res.data.errMsg[0];
            console.log('New List',_noti_)
            let _noti_length = _noti_.length;
            

            // let nBody = { 
            //   action: '15 min', 
            //   headline: 'Brunch this weekend?', 
            //   title: 'Ali Connors', 
            //   subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" 
            // };

            let nBody = {};   // Notification Body

            for(let i = 0; i < _noti_length; i++) {
              nBody.ID = _noti_[i].leadId
              nBody._id = _noti_[i]._id
              nBody.proposal_id = _noti_[i].proposalData
    
              nBody.action = moment(parseInt(_noti_[i].created_date)).startOf('hour').fromNow();

              // let currendata = new Date(parseInt(Date.now())).toLocaleDateString();
              // let oneDay = 24*60*60*1000;
              // var firstDate = new Date(_noti_[i].created_date);
              // var secondDate = new Date(currendata);
              // nBody.action = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
              // nBody.action = nBody.action+" days ago "
              
              nBody.created = moment(_noti_[i].created_date).format('lll');
              nBody.headline = self.doSentenceCase(_noti_[i].notification_body.split("|")[0]);
              nBody.title = self.doSentenceCase(_noti_[i].notification_type);
              nBody.subtitle = _noti_[i].notification_body.split("|")[1];
              nBody.appid = _noti_[i].notification_body.split("|")[2]; 
              self.items.push(nBody);
              // console.log('ITEMS PUSH',self.items)
              nBody = {};
            }
          })
              
        },

        gotoLead(dat){
          console.log('Page routed',dat)
          let self = this
            axios({
                method: "post",
                url:"https://9h0d6g9kf2.execute-api.ap-south-1.amazonaws.com/prod/update/notifications-status",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                  "notificationId": dat.NOTIFICATION_ID
                },
            }).then(function (response) {
                console.log('DATA RESPONSE:::',response.data.data);
                self.$emit('onSelect', {data: dat});
            }).catch(function (error) {});          
        },

        markAll(){
            let self = this
            axios({
                method: "post",
                url:"https://9h0d6g9kf2.execute-api.ap-south-1.amazonaws.com/prod/update/notifications-status",
                headers: {
                    "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                    "Content-Type": "application/json",
                },
                data: {
                  "isReadAll": true,
                },
            }).then(function (response) {
                // console.log('DATA RESPONSE:::',response.data.data);
                if(response.data.status === 200){
                  // self.getNotificationData()
                  self.$emit('allRead', {});
                  // console.log('DATA RESPONSE::in:');
                }

            }).catch(function (error) {});  
        },
    },

    computed:{
        
    }
  }
</script>


<style>

  
  .seenbgcolor{
    background: #fff;
  }

  .unseenbgcolor{
    background-color: #0000000f;
  }

  .viewalltext{
    margin-left: 33%;
    margin-top: 10px !important;
    font-weight:500;
    cursor: pointer;
  }
  .bellicon{
    cursor: pointer;
    background: #e9e9e9;
    border-radius: 50px;
    height: 30px;
    width: 30px;
    color: #1CAFCB !important;
  }

  .timetext{
    color: #6E7F7F;
    font-size: 12px;
    /* position: absolute; */
    left: 74%;
    bottom:51%;
  }

  .marktext{
    font-size: 12px;
    color: #01AFCB;
    display: inline-block;
    margin-left: 23%;
    cursor: pointer;
  }

  .notifi-text{
    color: #07458E !important;
    display: inline-block;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
  }   

  .titletext{
    color: #0073BB;
    font-size: 12px;
    letter-spacing: 0.4px;
  }

  .statustext{
    color:green;
    font-size:12px
  }

  .batchtext{
    color: #000;
    font-weight: bold;

  }

  .notifi_height.v-list--two-line .v-list__tile{
    height:15px
  }

  .notifi_height.v-list__tile__action--stack{
    height: 55px !important;
  }

  /* .notifi_height{
    height: 40px;
  } */

  .notif-window {
    /* width: 400px; */
    height: auto;

  }

  .notification-height{
    height: 100px!important;
  }
</style>
