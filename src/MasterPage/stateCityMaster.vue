<template>
    <v-app>
            <v-card flat>
            <v-layout row wrap >
                <v-flex class="ml-3 mr-3 mt-3" style="flex-flow:column wrap; width:97%">
                    <!-- <v-text class=" headline font-weight-bold">State Master</v-text>
                    <hr> -->
                        <v-layout row  justify-space-between align-center class="mt-2">
                            <!-- <v-flex>
                                <v-btn round depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addChannel()">
                                    add State
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn>
                            </v-flex> -->
                            <v-flex xs12 sm6 md3 class="">
                                <v-select v-model="editedItem.stateMaster" @change="getCity" :items="StateListdata" item-text="text"   label="State" ></v-select> 
                            </v-flex>
                            <v-flex xs10 sm6 md3 class=" ml-3">
                                <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                ></v-text-field>                            
                            </v-flex>
                    </v-layout>

                    <v-layout row justify-center>
               
                    <v-flex justify-center md9 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">State Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="objmethod"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <!-- <td class="">{{props.item.code}}</td>
                            <td class="">{{props.item.cityMaster}}</td> -->
                            <td class="">{{props.item.asciiname}}</td>
                            <!-- <td class="">{{props.item.channelStatus}}</td> -->
                           
                            <td class="">
                                <v-icon small class="mr-2" @click="editItem(props.item,props.index)">edit</v-icon>
                                <v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon>
                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>
                             
                </v-layout>

                    <!-- <v-dialog v-model="dialog" persistent max-width="800px">
                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.stateMaster" @change="getCity" :items="StateListdata" item-text="text"   label="State" ></v-select> 
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.cityMaster" :items="cityList" item-text="name" label="City" ></v-select> 
                            </v-flex>
                            
                            </v-layout>
                        </v-container>  
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                    </v-dialog>  -->

                </v-flex>    
            </v-layout> 
            <div class="text-xs-center pagination">
                <v-pagination
                v-model="page"
                @input="next($event)"
                :length="pageLength"
                ></v-pagination>
            </div> 
            </v-card>
    </v-app>
</template>
<script>
import axios from 'axios' 

var index = 0; // used for put api
export default {

    created(){
          this.$store.commit('SET_PAGE_TITLE','State-City Master');
        this.Getstate();
        this.getCity();

    },

    data(){
        return{
            dialog: false,
            btnname:'',
            pagination: {},
            pageLength:0,
            value:'',
            // chanelResponse:[],
            // chnelstatus:[],
            // editChanel:{},
            StateListdata:[],
            cityList:[],
            finalState:[],
            finalcityState:[],
            stateCity:{
                stateCode:'',
                stateName:'',
                cityName:''
            },
            TableIndex:'',
            headers:[
                        // {text: 'State Code', value: 'stateCode'},
                        // {text: 'State', value: 'stateMaster'},
                        {text: 'City', value: 'cityMaster'},
                        // {text: 'Channel Status', value: 'channelStatus'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
            tableData: [],
                editedIndex: -1,
                editedItem: {
                stateCode:'',
                stateMaster:'',
                cityMaster:'',
                // channelStatus:'',
                
            },
            defaultItem: {
                stateCode:'',
                stateMaster:'',
                cityMaster:'',
                // channelStatus:'',
                
            },
            chnlstatus:['InActive', 'Active'],
            chnlstatusIndex:'',
            editchanneiId:'',
                
        }
    },
    computed: {
        objmethod() {
        
       
    	 var self=this;
                return this.chanelResponse.filter(function(cust){return cust.asciiname.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        // || cust.channelCode.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
       
       
          
         });
       //return this.customers;
    },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New State' : 'Edit State'
        },

         value() {
           console.log(this.value);
       }
    },
    methods:{
        Searchdatatable (e) {
            this.value = e;
            // console.log("value is",this.value);
        },
            Getstate(){
                this.GETSTATE(res=>{
                    // console.log('State Resp',res)
                for(let i =0;i<res.length;i++){
                    let statedata={
                        text:res[i].region_data.name,
                        code:res[i].region_data.adminCode1
                    }
                    this.StateListdata.push(statedata)
                }

            })
            console.log(this.StateListdata,"response mixin data")
           
            },
             getCity(ev){
                    // console.log("event ", this.StateListdata)
                    console.log("event ev>>", ev)
                    // this.editedItem.cityMaster = ev
                    
                    let codes= this.StateListdata.filter(e=>{
                        if(e.text === ev){
                            return e.code
                        }
                    })
                    // console.log("event filter",codes)
                    this.GETCITY(codes[0].code,resp=>{
                        // console.log("city ", resp[0].cities)
                        this.cityList = resp[0].cities
                        console.log("city :>>", this.cityList)

                    })
                },
    

        saveAndEdit(_btnname){
             if(_btnname == 'Add' )
            {
                this.save();
            } 
            else if(_btnname == 'Update'){
                    this.editChanl();
            }
            },

        addChannel(){
            this.btnname = 'Add';
            this.editedItem.chanelName = '';
            this.editedItem.channelStatus = 'InActive';
            this.dialog = true;
        },


        editItem (item,i) {
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            // _index = i;
            this.btnname = 'Update' 
               
            this.dialog = true
            var itemsChanel = item;
            console.log("new item is",itemsChanel)
            this.editedItem.chanelName = itemsChanel.channelName;
            this.editedItem.channelCode = itemsChanel.channelCode;
            this.editedItem.channelStatus = itemsChanel.channelStatus;
            this.editchanneiId = itemsChanel._id
        
        },

        editChanl(item){
            
         
        },

        deleteItem(index) {
            this.chanelResponse.splice(index, 1)
        },

        close () {
        this.dialog = false
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            
            this.editedIndex = -1
        }, 300)
        },


        save(){
           
          
        },
    }
}
</script>
<style>
    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }
 .thebtn{
      display:flex;
     align-items:center; 
     color:white;
     border-radius:5px;
     font-size:15px;
}

    .btn-size{
        width: 1000px
}
     @media screen and (min-width: 320px){

     }
      @media screen and (min-width: 728px){
          .add-branch-btn{
              display: flex;
              justify-content: flex-end;
              margin-right: 15px;
          }
      }
      @media screen and (min-width: 922px){
          .add-branch-btn{
               display: flex;
              justify-content: flex-end;
              margin-right: 15px;              
          }
      }
</style>
