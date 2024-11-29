<template>
    <v-app>
        <!-- <v-content> -->
            <v-layout class="bgclrsource " row wrap>
                <v-flex ma-3 md12>
                    <v-text class="mt-4 headline font-weight-bold">Attendance Master</v-text>
                    <hr>
                </v-flex>
                <v-layout row wrap>
                    <v-flex xs12 sm6 md3 ma-3 >
                        <p>Filter by days: </p>
                        <v-overflow-btn v-model="day" @change="filterBy(day)" :items="daysFilter" label="Status" target="#dropdown-example"></v-overflow-btn>
                    </v-flex>
                    <v-flex mt-2 md3 sm6 xs12 ml-3>
                        <!-- <div class="ml-5"> -->
                        <v-btn depressed medium color="blue-grey" class="white--text">
                            download logs
                            <!-- <v-icon right dark>get_app</v-icon> -->
                        </v-btn>    
                        
                    </v-flex>
                </v-layout>
                <v-layout  row wrap>
                    <div class="ml-3">
                        <v-date-picker v-model="picker" type="month"></v-date-picker>
                    </div>
                    <v-flex md9 xs11 ml-3>
                    <v-data-table
                        :headers="headers"
                        :items="agentDatad"
                        :search="search"
                        v-model="selected"
                        item-key="name"
                        select-all
                        class="elevation-1"
                    >
                        <template slot="headerCell" slot-scope="props">
                        <v-tooltip bottom>
                            <span slot="activator">
                            {{ props.header.text }}
                            </span>
                            <span>
                            {{ props.header.text }}
                            </span>
                        </v-tooltip>
                        </template>
                        <template slot="items" slot-scope="props">
                        <td>
                            <v-checkbox
                            v-model="props.selected"
                            primary
                            hide-details
                            ></v-checkbox>
                        </td>
                        <td>{{ props.item.agentCode }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.status }}</td>
                        <td>{{ props.item.repotingManager }}</td>
                        <td>{{ props.item.reportingBranchCode }}</td>
                        <td class="text-xs-center">{{ props.item.timesLogged }}</td>
                        <td class="justify-center layout px-0">
                            <v-icon small class="mr-2" @click="popup">visibility</v-icon>
                        </td>
                        </template>
                    </v-data-table>
                </v-flex>
                </v-layout>
                
                <v-dialog v-model="dialog" width="700">
                    <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >Log Details</v-card-title>
                        </v-flex>
                        <v-flex>
                            <v-data-table
                            :headers="logTable"
                            :items="loggedData"
                            hide-actions
                            class="elevation-1">
                            <template slot="items" slot-scope="props">
                                <td>{{props.item.benchID}}</td>
                                <td class="">{{props.item.location}}</td>
                                <td class="text-xs-center">{{props.item.loggedTimes}}</td>
                                <td class="">{{props.item.lastLogged}}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                    </v-card>
                </v-dialog>
            </v-layout>
        <!-- </v-content> -->
    </v-app>
</template>
<script>
export default {
    created() {
          this.$store.commit('SET_PAGE_TITLE','Attendance Master');
        this.filterBy(this.day);
    },
    data(){
        return{
            // daysSelected:'',
            dialog:false,
            day:'Last 7 days',
            search: '',
            selected: [],
            logTable:[{text:'Branch ID'},{text:'Location'},{text:'Times Logged In'},{text:'Last Logged In Date'}],
            daysFilter:['Last 7 days','Last 30 days','Last 60 days'],
            headers:[
                    {text:'AgentCode'},
                    {text:'Agent Name'},
                    {text:'Status'},
                    {text:'Reporting Manager'},
                    {text:'Reporting SOL ID'},
                    {text:'Times Logged In'},
                    {text: 'View'}
            ],
            loggedData:[
                {
                    benchID:'BOB454',
                    location: 'MIDC,Andheri(E)',
                    loggedTimes:'17',
                    lastLogged:'03/09/2018'
                },
                {
                    benchID:'BOB123',
                    location: 'BKC,Bandra',
                    loggedTimes:'9',
                    lastLogged:'01/09/2018'
                },
                {
                    benchID:'BOB543',
                    location: 'MIDC,Andheri(E)',
                    loggedTimes:'3',
                    lastLogged:'02/09/2018'
                }
            ],
            agentData : {
                   "7":[
                       {
                        agentCode:'N20015',
                        name:'Salman',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB125',
                        timesLogged:'5'
                    },
                    {
                        agentCode:'N20015',
                        name:'Gopal',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB125',
                        timesLogged:'13'
                    },
                    {
                        agentCode:'N20015',
                        name:'Abhishek',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB125',
                        timesLogged:'5'
                    },
                    {
                        agentCode:'N20015',
                        name:'Rajiv',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB125',
                        timesLogged:'13'
                    },
                    {
                        agentCode:'N20015',
                        name:'Shoeb',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB125',
                        timesLogged:'5'
                    },
                    {
                        agentCode:'N20015',
                        name:'Bhavik',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB125',
                        timesLogged:'13'
                    }
                ],
                "30":[
                     {
                        agentCode:'N20030',
                        name:'Rutvij',
                        status:'Active',
                        repotingManager:'Usama Shaikh',
                        reportingBranchCode:'BOB125',
                        timesLogged:'9'
                    },
                    {
                        agentCode:'N20030',
                        name:'Bhavik',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB325',
                        timesLogged:'21'
                    },
                    {
                        agentCode:'N20030',
                        name:'Kapil',
                        status:'Active',
                        repotingManager:'Usama Shaikh',
                        reportingBranchCode:'BOB125',
                        timesLogged:'9'
                    },
                    {
                        agentCode:'N20030',
                        name:'Himanshu',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB325',
                        timesLogged:'21'
                    },
                    {
                        agentCode:'N20030',
                        name:'Gopal',
                        status:'Active',
                        repotingManager:'Usama Shaikh',
                        reportingBranchCode:'BOB125',
                        timesLogged:'9'
                    },
                    {
                        agentCode:'N20030',
                        name:'Samir',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB325',
                        timesLogged:'21'
                    }
                ],
                "60":[
                     {
                        agentCode:'N20060',
                        name:'Shoeb',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB325',
                        timesLogged:'15'
                    },
                    {
                        agentCode:'N20061',
                        name:'Himanshu',
                        status:'Active',
                        repotingManager:'Gopal',
                        reportingBranchCode:'BOB125',
                        timesLogged:'25'
                    },
                    {
                        agentCode:'N20060',
                        name:'Sudeep',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB325',
                        timesLogged:'15'
                    },
                    {
                        agentCode:'N20061',
                        name:'Easwar',
                        status:'Active',
                        repotingManager:'Gopal',
                        reportingBranchCode:'BOB125',
                        timesLogged:'25'
                    },
                    {
                        agentCode:'N20060',
                        name:'Kaushik',
                        status:'Active',
                        repotingManager:'Sudeep Makwana',
                        reportingBranchCode:'BOB325',
                        timesLogged:'15'
                    },
                    {
                        agentCode:'N20061',
                        name:'Mandar',
                        status:'Active',
                        repotingManager:'Gopal',
                        reportingBranchCode:'BOB125',
                        timesLogged:'25'
                    }
                ],
                
                agentDatad:[],
                daysIndex:-1,
            }  
        }
    },
    methods:{
        popup(){
            this.dialog=true
            console.log('popup==>',this.dialog)
        },
        filterBy(day){
            try {
                //  this.daysIndex = this.daysFilter.indexOf(this.day)
        //    console.log('Filter days==>',this.daysIndex)
         
            if(day == 'Last 7 days'){
                 this.agentDatad = [];
                this.agentDatad = this.agentData[7]
                console.log('Attendance list==>',this.agentDatad)
                
            }
            else if(day === 'Last 30 days'){
                 this.agentDatad = [];
                this.agentDatad = this.agentData[30]
                console.log('Attendance list==>',this.agentDatad)
                
            }
            else if(day === 'Last 60 days'){
                console.log(this.agentDatad);
                this.agentDatad = [];
                this.agentDatad = this.agentData[60];
                console.log('Attendance list==>',this.agentDatad)
            }
            } catch(err) {
                console.log(err);
            }
           
        }
    }
}
</script>

<style>
.bgclrsource{
    background-color: #fafafa;
}

.thebtn{
      display:flex;
     align-items:center; 
     color:white;
     border-radius:5px;
     font-size:15px;
}

</style>