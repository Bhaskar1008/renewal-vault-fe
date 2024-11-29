<template>
    <v-app style="background-color:#E8EEEF">
        <div style="margin-left:35px" class="mt-4">
            <v-text class="body-2 font-weight-bold" style="color:#1E83C2">Notifications</v-text>
        </div>
        <v-card class="ma-3 pa-4">
            <v-data-table
                :headers="notificationHeaders"
                :items="ALLnotifications"
                hide-actions
                style="width:50% !important"
                class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left" style="background-color:#EFF3F4;">{{props.item.JOB_ID}}</td>
                    <td class="text-xs-left" style="background-color:#EFF3F4;">
                        <p v-if="props.item.JOB_EXECUTION_STATUS === 'Success'" class="classSuccess">{{props.item.JOB_EXECUTION_STATUS}}</p>
                        <p v-if="props.item.JOB_EXECUTION_STATUS === 'Failed'" class="classFailed">{{props.item.JOB_EXECUTION_STATUS}}</p>
                        <p v-if="props.item.JOB_EXECUTION_STATUS === 'In Progress'" class="classProgress">{{props.item.JOB_EXECUTION_STATUS}}</p>
                    </td>
                    <td class="text-xs-left" style="background-color:#EFF3F4;">{{ time_ago(props.item.NOTIFICATION_ID) }}</td>
                </template>
            </v-data-table>
            <!-- <v-container fluid class="my-3 paginationStyle" v-if="ALLnotifications.length !== 0" style="margin-left:-12% !important">
                <v-layout justify-center>
                    <div class="margincls">
                        <span> Showing {{ pageStartIndex }} - {{ pageEndIndex }}</span>
                        <span> out of {{ totalListCount }} records </span>
                    </div>
                    <v-pagination 
                        class="mr-4 mt-1 navpagenumber"
                        v-model="page" 
                        color="#152F38" :length="getNoOfPages" 
                        :total-visible="5" @input="nextPage($event)">
                    </v-pagination>
                </v-layout>
            </v-container> -->
        </v-card>
    </v-app>
</template>

<script>
import axios from 'axios'
let tokenDataObj = null
    export default {
        data(){
            return{
                notificationHeaders:[
                    { text: 'Batch ID', value: 'JOB_ID' },
                    { text: 'Status', value: 'JOB_EXECUTION_STATUS' },
                    {text: "Time",value: "NOTIFICATION_ID",sortable: false},
      
                ],
                ALLnotifications:[],
                page            :   1,
                pageStartIndex  :   1,
                pageRowCount  :   10,
                totalListCount  :   0,
                IsFilter: false,
            }
        },

        methods: {
            getToken(){
                let self = this
                axios.post(config.oAuthURl,
                    'grant_type=client_credentials&client_id=4mvhrgqptajd0stm50l7g1alin&client_secret=1job69ftt8042aa4geppjf05bp005lkkgogt7reegl00cslqosbn'
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
                    url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/notifications",
                    headers: {
                        "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                        "Content-Type": "application/json",
                    },
                    data: {
                        "userId": "1623225953967",
                        "limit": "10",
                        "offset": "1",
                        "lastEvaluatedKey": null
                    },
                }).then(function (response) {
                    console.log('DATA RESPONSE:::',response.data.data);
                    self.ALLnotifications = response.data.data.Items;
                    self.totalListCount = response.data.data.Count
                    console.log('--', self.ALLnotifications)
                }).catch(function (error) {});  
            },

            nextPage(){
                axios({
                    method: "post",
                    url:"https://c8jd830vra.execute-api.ap-south-1.amazonaws.com/prod/notifications",
                    headers: {
                        "Authorization": tokenDataObj.token_type +' '+ tokenDataObj.access_token,
                        "Content-Type": "application/json",
                    },
                    data: {
                        "userId": "1623225953967",
                        "limit": "10",
                        "offset": this.page,
                        "lastEvaluatedKey": null
                    },
                }).then(function (response) {
                    console.log('DATA RESPONSE:::',response.data.data);
                    self.ALLnotifications = response.data.data.Items;
                    self.totalListCount = response.data.data.Count
                    console.log('--', self.ALLnotifications)
                }).catch(function (error) {});  
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
        },

        created(){
            this.getToken()
        },

        computed:{
            pageEndIndex(){
                if(!this.totalListCount){
                    return 0
                }else{
                    return ((this.pageStartIndex + (this.pageRowCount)) <= this.totalListCount) ? this.pageStartIndex + (this.pageRowCount) - 1 : this.totalListCount;
                }
            },

            getNoOfPages(){
                if(!this.totalListCount){
                    return 0;
                }else{
                    return Math.ceil(this.totalListCount / this.pageRowCount);
                }
            },
        }
    }
</script>

<style>

    .classSuccess{
   background-color: #29C83F;
   /* width: 70px; */
   color: white;
   text-align: center;
   padding: 3px;
   position: relative;
   top: 7px;
   border-radius: 5px;
}

.classFailed{
    background-color: #FD5F57;
   color: white;
   text-align: center;
   padding: 3px;
   position: relative;
   top: 7px;
   border-radius: 5px;
}

.classProgress{
   background-color: #FEBC2E;
   /* width: 100px; */
   color: white;
   text-align: center;
   padding: 3px;
   position: relative;
   top: 7px;
   border-radius: 5px;
}

</style>