<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
                
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3" style="flex-flow:column wrap;width:100%;padding-right:70px">
                    <v-text class=" headline font-weight-bold">Sub-Campaign Master</v-text>
                    <hr>
                    <v-layout row wrap mt-4>

                      <h3 class="mt-2">To bulk upload sub-campaign details:</h3>                
                    <v-flex class="ml-5">
                        <v-btn depressed medium color="blue-grey" class="white--text">
                            sample file
                            <v-icon right dark>get_app</v-icon>
                        </v-btn>
                    <v-btn depressed medium color="primary" class="white--text">
                        upload file
                        <v-icon dark right>publish</v-icon>
                    </v-btn>
                    </v-flex>
                   </v-layout>

                   <v-layout row wrap mt-5>
                        
                      <h3 class="mt-2">To bulk modify sub-campaign details:</h3>                
                    <v-flex class="ml-5">
                        <v-btn depressed medium color="blue-grey" class="white--text">
                            existing data
                            <v-icon right dark>get_app</v-icon>
                        </v-btn>
                    <v-btn depressed medium color="primary" class="white--text">
                        upload file
                        <v-icon dark right>publish</v-icon>
                    </v-btn>
                    </v-flex>
                   </v-layout>
                
                        <v-flex  class="add-branch-btn">
                            
                             <v-btn depressed medium color="primary" class="white--text" @click.native="addCompaign()">
                                create sub campaign
                                <v-icon dark right>add_circle</v-icon>
                            </v-btn>
                        </v-flex>

                    <v-layout row justify-center>
                
                    <v-flex justify-center md6 mt-3 >
                        <h3 class="text-xs-center mb-3">Sub-Campaign Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="subcampaignTblData"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                             
                            <!-- <td class="">{{props.index}}</td> -->
                            <td class="">{{props.item.subCampaignName}}</td>
                            <td class="">{{props.item.subCampaignCode}}</td>
                            <td class="">{{props.item.strtDate}}</td>
                           
                           
                            <td class="justify-center layout px-0">
                                <v-icon small class="mr-2" @click="editItem(props.item, props.index)">edit</v-icon>
                                <v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon>
                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>
                         
                </v-layout>

                    <v-dialog v-model="dialog2" persistent max-width="800px">

                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                     <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.subCampaignName"  :items="cmpnArray"  item-text="text" item-value="value" label="Sub-Campaign Name" ></v-select>                                
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.subCampaignCode" label="Sub-Campaign Code"></v-text-field>
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
                                    <v-date-picker v-model="editedItem.strtDate" no-title @input="menu = false"></v-date-picker>
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
                
            </v-card>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 

var _index = 0; // used for put api
export default {

    created(){

         
    },


  
    data(){
        return{
            dialog2: false,
            dateFormatted:null,
            date:null,
            
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
                    {text: 'Sub-Campaign Name', value: 'subCampaignName'},
                    {text: 'Sub-Campaign Code', value: 'subCampaignCode'},
                    {text: 'Start Date', value: 'strtDate'},
                    
                    {text: 'Action', value: 'action', sortable: false}
                ],
            subcampaignTblData: [],
                editedIndex: -1,
                editedItem: {
                subCampaignName:'',
                subCampaignCode:'',
                strtDate:null,

               },

            defaultItem: {
               subCampaignName:'',
                subCampaignCode:'',
                strtDate:null,
                 },
              
                
        }
    },
    computed: {
        // formTitle () {
        //     return this.editedIndex === -1 ? 'Add' : 'Update'
        // },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Sub-Campaign' : 'Edit Sub-Campaign'
        },

         value() {
           console.log(this.value);
       },
        startDate () {
      return this.formatDate(this.editedItem.strtDate)
    }

    },
    watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.editedItem.strtDate)
    }
  },
    methods:{
          formatDate (date) {
      if (!this.editedItem.strtDate) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!this.editedItem.strtDate) return null

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
               this.dialog2 = true;
        },


        editItem (items, index) {            
          
            //  console.log("Data is",items)
            // console.log("Index is",index)
            // this.TableIndex = index
            
            // this.btnname = 'Update' 
               
            // this.dialog2 = true

            // var campItems = items;
            // console.log("NEW USER ITEM IS::",campItems)
            //           this.editedItem.strtDate = campItems.strtDate
            //           this.editedItem.subCampaignCode = campItems.subCampaignCode
            //           this.editedItem.subCampaignName = campItems.subCampaignName

        this.editedIndex = this.subcampaignTblData.indexOf(items)
        this.editedItem = Object.assign({}, items)
        this.dialog2 = true
                   
        
        },

        updateUser(items){
        
        },

       

        deleteItem(index) {
       
        this.subcampaignTblData.splice(index, 1)
        },

        close () {
        // this.dialog2 = false
        this.dialog2 = false
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            
            this.editedIndex = -1
        }, 300)
        },


        save(){

            console.log("NEW SUB-CAMPAIGN ITEM IS::",this.subcampaignTblData)
            if (this.editedIndex > -1) {
          Object.assign(this.subcampaignTblData[this.editedIndex], this.editedItem)
        } else {
          this.subcampaignTblData.push(this.editedItem)
        }
        this.close()
        },


    }
}
</script>
<style>
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
