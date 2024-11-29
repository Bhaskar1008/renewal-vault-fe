<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
            <v-layout row wrap >
                <v-flex class="ml-3 mt-4" style="flex-flow:column wrap">
                    <v-text class="headline font-weight-bold">CityCountry</v-text>
                    <hr>
                    <v-flex  class="mt-5">
                    <h3>To bulk upload CityCountry details:</h3>
                    </v-flex>
                
                    <v-flex class="mt-5">
                        <v-btn depressed large color="blue-grey" class="white--text">
                            download sample
                            <v-icon right dark>get_app</v-icon>
                        </v-btn>
                    <v-btn depressed large color="primary" class="white--text">
                        upload file
                        <v-icon dark right>publish</v-icon>
                    </v-btn>
                    </v-flex>
                   
                    <v-flex class="mt-5"> 
                        <h3>To bulk modify CityCountry details:</h3>
                    </v-flex>
                    <v-flex class="mt-5">                        
                        <v-btn depressed large color="blue-grey" class="white--text">
                            export existing data
                            <v-icon right dark>get_app</v-icon>
                        </v-btn>
                        <v-btn
                            depressed large color="primary"
                            class="white--text"
                            >
                            upload file
                            <v-icon dark right>publish</v-icon>
                        </v-btn>
                        </v-flex>
                
                        <v-flex  class="add-branch-btn">
                        <v-btn depressed large color="primary" class="white--text" @click.native="addrole()">
                            add CityCountry
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                        </v-flex>
                        <v-layout row justify-space-between>
                            <!-- do not delete this line -->
                        <v-flex xs2></v-flex>
                    <v-flex justify-center md12 ml-3 mt-3>
                        <h3 class="text-xs-center mb-3">CityCountry Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="tableData"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.Cityname}}</td>
                            <td class="">{{props.item.Countrycode}}</td>
                            <!-- <td class="">{{props.item.branch_name}}</td>
                            <td class="">{{props.item.area}}</td>
                            <td class="">{{props.item.city_name}}</td>
                            <td class="">{{props.item.state_name}}</td>
                            <td class="">{{props.item.region_name}}</td>
                            <td class="">{{props.item.zone_name}}</td> -->
                            <td class="justify-center layout px-0">
                                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
                <v-flex xs2></v-flex>
                </v-layout>

                    <v-dialog v-model="dialog" persistent max-width="800px">

                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Cityname" label="City Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Countrycode" label="Country Code"></v-text-field>
                            </v-flex>
                             <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.branch_name" label="Branch Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.area" label="Area"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.city_name" label="City Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.state_name" label="State Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.region_name" label="Region Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.zone_name" label="Zone Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6 >
                                <p>Status</p>
                                <v-overflow-btn :items="status" label="Status" target="#dropdown-example"></v-overflow-btn>
                            </v-flex> -->
                            
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary" @click.native="saveAndEditBtn(btnname)">{{btnname}}
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
export default {
    data(){
        return{
            dialog: false,
            postdata:'',
            editrole:'',
            btnname:'',
            getresponse:[],
            headers:[
                        {text: 'City Name', value: 'Cityname'},
                        {text: 'Country Code', value: 'Countrycode'},
                        {text: 'Action', value: 'action', sortable: false}
                        // {text: 'Branch Name', value: 'branch_name'},
                        // {text: 'Area', value: 'area'},
                        // {text: 'City Name', value: 'city_name'},
                        // {text: 'State Name', value: 'state_name'},
                        // {text: 'Region Name', value: 'region_name'},
                        // {text: 'Zone Name', value: 'zone_name'},
                        
                ],
            tableData: [],
                editedIndex: -1,
                editedItem: {
                Cityname:'',
                Countrycode:'',
                // branch_name:'',
                // area:'',
                // city_name:'',
                // state_name:'',
                // region_name:'',
                // zone_name:'',
            },
            defaultItem: {
                rolename:'',
                rolecode:'',
                // branch_name:'',
                // area:'',
                // city_name:'',
                // state_name:'',
                // region_name:'',
                // zone_name:'',
                
            },
            status:['Active','Inactive'],
              
                
        }
    },

        //    created (){

        //         axios.get('http://159.89.161.64:5055/secure/admin/getrole?userId=5b3b4cc28fa96d39870443e3').then(
        //        res => {
        //            console.log(res.data.errMsg);
        //            this.getresponse = res.data.errMsg
        //            console.log('GetResponse',this.getresponse)

        //             // console.log(this.obj)
        //        }
        //    ).catch(
        //        err => {
        //            console.log(err) ;
        //        }
        //    );

        // },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Edit'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
        }
    },
    methods:{

        editItem (item) {
        console.log("item",item)
        this.editedIndex = this.tableData.indexOf(item)
        console.log('index is ',this.editedIndex)
        this.btnname = 'Update' 
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        // this.editedItem.Cityname = item.Cityname
        // this.editedItem.Countrycode = item.Countrycode  
          },

    editRolemstr(){
        
              
        //     console.log('I AM CLICKING UPDATE')
        //     console.log("Edited index",this.editedIndex)
        //     console.log('rolename',this.editedItem)
        //      var self = this;
        //      axios.put('http://159.89.161.64:5055/secure/admin/updateRole/5b3b4cc28fa96d39870443e3',
        //      {              
                 
        //            role_Name: self.editedItem.rolename,
        //            role_id: self.editedItem.rolecode,
        //            roleCode:self.editedIndex.rolecode
        //      }).then(
        //          res => {
        //            console.log(res.data.errMsg);
        //             this.editrole = res.data.errMsg

        //            console.log("Response is from server ",res.data.errMsg);
                 
        //           var len = res.data.errMsg.length
        //           console.log("After EDIT",len)
        //           this.$store.commit('SET_MASTER_ROLE_DETAILS', this.editrole)
              
        //           this.dialog = false 
        //         this.close();                        
               
        //        }
        //    ).catch(
        //        err => {
        //            console.log(err) ;
        //        }
        //    );
            //  const FormData={
            //    Cityname:self.editedItem.Cityname,
            //    _id : self.editedItem.rolecode

            //          }
                    //   Object.assign(this.getresponse[this.editedIndex], FormData)
                // this.getresponse[ this.editedIndex] = FormData
                // return this.getresponse
                //   / console.log("Updated table",this.getresponse)

                  Object.assign(this.tableData[this.editedIndex], this.editedItem)
                        return this.tableData
                       this.close()
          
    },
   

        deleteItem (item) {
            console.log('item',item)
        const index = this.getresponse.indexOf(item)
        // confirm('Are you sure you want to delete this item?') && 
        this.getresponse.splice(index, 1)
        },

        close () {
        this.dialog = false
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            
            this.editedIndex = -1
        }, 300)
        },


        save () 
        {
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem)
      } else {
        this.tableData.push(this.editedItem)
         this.close()
      }
     

        },

        saveAndEditBtn(_btnname){
             if( _btnname == 'Add' )
            {
                this.save();
            } 
            else if(_btnname == 'Update'){


                    this.editRolemstr();

            }
            },

             addrole(){
            this.btnname='Add';
            this.dialog=true;
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
