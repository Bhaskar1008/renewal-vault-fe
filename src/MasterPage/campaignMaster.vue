<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
                
            <v-layout class="bgclrsource" row wrap >
                <v-flex class="ml-3 mt-3" style="flex-flow:column wrap;width:100%;padding-right:70px">
                    <v-text class=" headline font-weight-bold">Campaign Master</v-text>
                    <hr>
                    <v-layout row  justify-space-between class="mr-5 mt-3">
                            <v-flex>
                            <v-menu transition="slide-y-transition" >
                                <v-btn round depressed medium slot="activator" color="secondary" class="white--text">
                                    Bulk Upload/Modify
                                    <v-icon dark right>publish</v-icon>
                                </v-btn>
                                <v-list>
                                    <v-list-tile>
                                        <v-btn flat color="secondary" @click="addUser()">Bulk Upload</v-btn>
                                    </v-list-tile>
                                    <v-list-tile >
                                        <v-btn flat color="secondary"  @click="dialogBulkUpld = true">Bulk Modify</v-btn>
                                    </v-list-tile>

                                </v-list>
                                </v-menu>
                        
                                <v-btn round depressed medium slot="activator" color="primary" class="white--text" @click.native="addCompaign()">
                                    add Campaign
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn>
                                </v-flex>
                            <v-flex xs10 sm6 md4 class=" mt-1">
                                <v-text-field 
                                @input="Searchdatatable"
                                
                                label="Search" 
                                append-icon="search"
                                height="30px"></v-text-field>                            
                            </v-flex>
                    </v-layout>

                    <v-layout row justify-center>
                
                    <v-flex justify-center md11 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">Campaign Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="campaignTableData"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                             
                            <!-- <td class="">{{props.index}}</td> -->
                            <td class="">{{props.item.channel}}</td>
                            <td class="">{{props.item.campaignName}}</td>
                            <td class="">{{props.item.campaignCode}}</td>
                            <td class="">{{props.item.subCampaignName}}</td>
                            <td class="">{{props.item.campdate}}</td>
                           
                           
                            <td class="">
                                <v-icon small class="mr-2" @click="editItem(props.item, props.index)">edit</v-icon>
                                <v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon>
                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>
                         
                </v-layout>

                    <v-dialog v-model="dialog1" persistent max-width="800px">

                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                     <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.channel"  :items="chanelCode"  item-text="text" item-value="value" label="Channel Code" ></v-select>                                  
                                <!-- <v-text-field v-model="editedItem.channel" label="Channel"></v-text-field> -->
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.campaignName" label="Campaign Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.campaignCode" label="Campaign Code"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.subCampaignName" label="Sub-Campaign Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.campaignDesc" label="Campaign Description"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-menu
                                    :close-on-content-click="false"
                                    v-model="menu"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                    >
                                    <v-text-field
                                        slot="activator"
                                        v-model="startDate"
                                        label="Start Date"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint
                                        prepend-icon="event"
                                        
                                    ></v-text-field>
                                    <v-date-picker v-model="editedItem.campdate" no-title @input="menu = false"></v-date-picker>
                                    </v-menu>
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
                    </v-dialog> 

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
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 

var _index = 0; // used for put api
export default {

    created(){
        // this.GET('fetch_affiliate?filter=0'+'&skip='+skip , function(res,error){
         this.GET('getchannel?userId='+this.getAgentInfo()._id , function(res , error){

              // console.log('GET CHANEL DATA', res.data.errMsg );
                    this.channel =  res.data.errMsg;
                    console.log('GET champaign DATA::', this.channel);
                   
                    // this.chanelCode  = this.channel[i].channelCode;
                    // console.log('CHANEL CODE::', this.chanelCode);

                     for(var i =0;i< this.channel.length;i++)
                   {
                       this.chanelCode.push(this.channel[i].channelCode)
                   }
                   console.log("changgel Array",this.chanelCode)
         })
            
    },


  
    data(){
        return{
            chanelCode:[],
            channel:{},
            dialog1: false,
            pagination: {},
            pageLength:0,
            dateFormatted:null,
            date:null,
            // startDate: null,
            menu:false,
            menu1:false,
            btnname:'',
            TableIndex:'',
           

                cmpnArray : [
                    {text:"Usama",value:"5b8e2fb744487867bad96436"},
                     {text:"Sudeep",value:"5b8e38e244487867bad9644b"},
                      {text:"Abhishek",value:"5b8e3c7f44487867bad96459"},
                       {text:"Salman",value:"5b8e3c9044487867bad9645a"},
                    
                   ],

          

            headers:[
                        {text: 'Channel', value: 'channel'},
                        {text: 'Campaign Name', value: 'campaignName'},
                        {text: 'Campaign Code', value: 'campaignCode'},
                        {text: 'Sub-Campaign Name', value: 'subCampaignName'},
                        {text: 'Start Date', value: 'campdate'},
                       
                        {text: 'Action', value: 'action', sortable: false}
                ],
            campaignTableData: [],
                editedIndex: -1,
                editedItem: {
                    channel:'',
                campaignName:'',
                campaignCode:'',
                subCampaignName:'',
                campaignDesc:'',
                campdate:'',

               },

            defaultItem: {
                channel:'',
               campaignName:'',
                campaignCode:'',
                subCampaignName:'',
                campaignDesc:'',
                campdate:'',
                 },
              
                
        }
    },
    computed: {
        // formTitle () {
        //     return this.editedIndex === -1 ? 'Add' : 'Update'
        // },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Campaign' : 'Edit Campaign'
        },

         value() {
           console.log(this.value);
       },
        startDate () {
      return this.formatDate(this.editedItem.campdate)
    }

    },
    watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.editedItem.campdate)
    }
  },
    methods:{
          formatDate (date) {
      if (!this.editedItem.campdate) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!this.editedItem.campdate) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
        //  selectStatus(){
        //     this.statusIndex = this.userstatus.indexOf(this.editedItem.slectStatus)
        //     console.log('select==>',this.statusIndex)
            
        // },

        saveAndEdit(_btnname){
             if(_btnname == 'Add' )
            {
                this.save();
            } 
            else if(_btnname == 'Update'){
                    this.updateUser();
            }
            },

       
         addCompaign(){
            this.btnname='Add';
               this.dialog1 = true;
        },


        editItem (items, index) {            
          
            //  console.log("Data is",items)
            // console.log("Index is",index)
            // this.TableIndex = index
            
            // this.btnname = 'Update' 
               
            // this.dialog1 = true

            // var campItems = items;
            // console.log("NEW USER ITEM IS::",campItems)
            //           this.editedItem.campdate = campItems.campdate
            //           this.editedItem.campaignCode = campItems.campaignCode
            //           this.editedItem.campaignName = campItems.campaignName
         this.editedIndex = this.campaignTableData.indexOf(items)
        this.editedItem = Object.assign({}, items)
        this.dialog1 = true
        
        },

        updateUser(){
        
        },

       

        deleteItem(index) {
       
        this.campaignTableData.splice(index, 1)
        },

        close () {
        // this.dialog1 = false
        this.dialog1 = false
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            
            this.editedIndex = -1
        }, 300)
        },


        save(){
            //   console.log("NEW SUB-CAMPAIGN ITEM IS::",this.campaignTableData)
            if (this.editedIndex > -1) {
          Object.assign(this.campaignTableData[this.editedIndex], this.editedItem)
        } else {
          this.campaignTableData.push(this.editedItem)
        }
        this.close()
                },


    }
}
</script>
<style>
.bgclrsource{
    background-color: #fafafa;
}
    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
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
