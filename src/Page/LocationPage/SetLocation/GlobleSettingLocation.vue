<template>
    <v-app>
        <!-- <v-content> -->
            <v-card class="pb-5">
             <v-layout row wrap pl-5 >
                <v-flex class="ml-3 mt-3" style="flex-flow:column wrap;width:100%;padding-right:37px">
                    <v-text class="headline font-weight-bold">Globle Location Setting</v-text>
                    <!-- <hr> -->
                </v-flex>


            </v-layout>
            <v-card class="ml-5 mr-5 " width=45%>
           
            
            <v-container fluid grid-list-md pr-5 pl-5 >
                
             <v-flex xs12 sm6 md6 ml-3>
          <v-text-field
            label="Set Branch Locatin Radius"
          ></v-text-field>
        </v-flex> 
    </v-container>

   
</v-card>
                    <v-flex  class="add-branch-btn"  >
                        <v-btn depressed medium color="primary" class="white--text">
                            Save
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                        </v-flex>

 <v-flex justify-center md11 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">Globle Setting Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="branchResponse"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <!-- <td class="">{{props.item.channel}}</td> -->
                            <td class="">{{props.item.BranchRadius}}</td>
                 
                            <td class="justify-center layout px-0">
                                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                                
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-card>
        <!-- </v-content> -->
   
    </v-app>
</template>
<script>

export default {

    data(){
        return{
           
            headers:[
                        {text: 'Brnach Location Radius', value: 'BranchRadius'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
                tableData: [],
                editedIndex: -1,
                editedItem: {
                BranchRadius:'',
                },
                defaultItem: {
                    BranchRadius:'',
                    
                    
                },
        }}

     
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
 .documt-id-prof {
            width: 70px;
            height: 40px;
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
              padding-right: 70px;              
          }
      }
</style>
