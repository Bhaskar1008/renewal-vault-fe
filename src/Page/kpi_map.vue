<template>
    <v-app>
        <!-- <v-content> -->
    <v-card>
     <v-layout row wrap >
         <v-card class="pa-2" flat style="background-color:#FAFAFA; width:100%;">
                  <v-layout class="pt-4 ml-3 mr-3 " v-if="false" >
                    <!-- <v-flex xs10 sm6 md2 class=" mr-4">
                            <v-select v-model="channeldatafilter" 
                                    :items="channeldataall"  
                                    item-text="text" 
                                    item-value="value" 
                                    label="Channel"
                                    @change="channelfilters">
                            </v-select>               
                    </v-flex> -->
                    <v-flex> </v-flex>
                     <!-- <v-btn  depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addrole()">
                                    add KPI Sub Category
                                    <v-icon dark right>add_circle</v-icon>
                     </v-btn> -->
                     <v-menu transition="slide-y-transition" >
                                <v-btn  depressed medium slot="activator" color="secondary" class="white--text thebtn">
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
                    <v-flex xs10 sm6 md2 class="ml-3 ">
                                <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                height="30px"></v-text-field>                            
                    </v-flex>
                   </v-layout>  
            </v-card>

        <v-flex class="ml-3 mr-3 ma-5" style="flex-flow:column wrap; width:97%;">  
                    <!-- <v-text class="headline font-weight-bold">Role Master</v-text>-->

            <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">Upload Sheet you want to map</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2">Start Mapping Fields</v-stepper-step>
                    <!-- <v-divider></v-divider> -->
                    <!-- <v-stepper-step step="3">Bulk Upload for Custom Sheets</v-stepper-step> -->
                </v-stepper-header>

                <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card
                            class="mb-12"
                            color="white"
                            height="470px"
                            flat
                            >

                            <v-layout row  class="yesrow" >
                                    <!-- mm99 -->

                                    <div  class="mt-2 mb-2" > 
                                        <!-- <v-btn medium color="primary" > Download Sample Sheet </v-btn> -->
                                          <a href="https://image-upload-bucket-2019.s3.ap-south-1.amazonaws.com/069fcec1f14d108e0294d8da75fdff8e39372766.xlsx" download>
                                            <v-btn color="primary">download sample file
                                                <v-icon right dark>save_alt</v-icon>
                                            </v-btn>
                                        </a>
                                    </div>
                                    <v-flex class="mt-2 mb-2" style="width: 207px !important;" >
                                            <v-select v-model="monthly_map_channel" 
                                                    :items="channeldataall"  
                                                    return-object
                                                    item-text="text" 
                                                    item-value="value" 
                                                    label="Select Channel *"
                                                    @change="channelfilters(monthly_map_channel)">
                                            </v-select>               
                                    </v-flex>
                                    <div   class="mt-2 mb-2">
                                            <!-- <p>Select Year</p>  -->
                                            <v-select v-model="yearitis" autocomplete :items="yeararr" item-text="text" return-object @change="setyear(yearitis)" label="Select Year *"></v-select>
                                    </div>
                                    <div   class="mt-2 mb-2">
                                                <!-- <p>Select Month</p>  -->
                                            <v-select v-model="monthitis" autocomplete :items="monthcollection" item-text="text" return-object @change="setquarter(monthitis)" label="Select Month *"></v-select>
                                    </div>
                                    <div  class="mt-2 mb-2" >
                                        <v-btn @click="tfu" >Upload Sheet</v-btn>
                                        <input style="display:none;"  ref="fileref"  type="file" id="fileUpload" @change="jsonupload">
                                    </div>
                                     <div  class="mt-2 mb-2" style="display:flex; flex-direction: row;" >
                                        <v-btn small  v-if="upload_xls" fab color="#4bd080" depressed > <v-icon color="white" > done </v-icon> </v-btn>
                                        <span v-if="upload_xls" style="font-weight: 700; font-family:roboto;"  class="nicetypo2 mr-1" > {{number_of_records}} </span> <span class="nicetypo2" v-if="upload_xls"> {{ number_of_records  == 1 ? "record" : "records" }} found in {{files_name}}</span>
                                     </div>
                            </v-layout>         
                            </v-card>
                           
                        <v-btn
                            color="primary"
                            @click="nextitis"
                            >
                            Continue
                            </v-btn>
                            <v-btn  @click="clearall" text>Cancel</v-btn>
                        </v-stepper-content>
                                   
                        <v-stepper-content step="2">
                            <v-card
                            class="mb-12"
                            color="white"
                            >
                            
                            <v-layout column justify-space-between>
                            <!-- do not delete this line -->
                            <v-flex xs2></v-flex>
                                <v-layout row  >
                                    <v-flex xs12 sm6 md4 style="display:flex; align-items">
                                            <span class="nicetypo2" style="margin-bottom:0px; margin-right:3px; font-family:roboto; font-weight: 500;" >Selected Channel : </span> <span class="nicetypo2" > {{display_ch}}</span>
                                    </v-flex> 

                                    <v-flex class="ml-2">
                                        <v-flex xs12 sm6 md7   >
                                                 <!-- <p class="ttlmain">Map Sub Category</p> -->
                                        </v-flex> 
                                    </v-flex>
                                     <v-flex xs12 sm6 md4  class="centerit_new ml-2">
                                            <v-btn small rounded color="info" @click="hard_reset" > <v-icon>refresh</v-icon>  Reset </v-btn>
                                    </v-flex>

                                </v-layout>

                                <v-layout row  >
                                    <!-- <input placeholder="add quarter" type="text" v-model="monthitis" >
                                       <input placeholder="add year" type="text" v-model="yearitis" > -->
                                    
                                    <v-flex class="center_flex ml-2" >
                                        <v-flex xs12 sm6 md7 >
                                                  <p class="ttlmain" >Map Main Category</p>
                                        </v-flex> 
                                    </v-flex>
                                    <v-flex class="ml-2">
                                        <v-flex xs12 sm6 md7   >
                                                 <p class="ttlmain">Map Sub Category</p>
                                        </v-flex> 
                                    </v-flex>
                                    <v-flex xs12 sm6 md4  class="centerit ml-2">
                                           <p class="ttlmain">Sheet Headers</p>
                                    </v-flex>

                                </v-layout>
                                <v-layout class="carditis" :style="{border: n.err == true ? '1px #fc8981 solid' : '1px solid  #e6ecf0', boxShadow: n.err == true ? '1px 1px 10px 0px rgba(255,150,150,0.5)' : 'none' }"  v-for="(n, index) in first_col_values " :key="index" >
                                  
                                    <v-flex class="center_flex" >
                                            <v-flex xs12 sm6 md7 style="display:flex; flex-direction:row;"  >
                                                <p class="nicetypo" >{{n.maincat.text}}</p>
                                               
                                            </v-flex> 
                                            <!-- <v-flex xs12 sm6 md7 style="display:flex; flex-direction:row;" :class="{bdr: n.maincat.text != '' ? true: false }" >
                                                    <p class="nicetypo" v-if='n.maincat.text != "" ' >{{n.maincat.text}}</p>
                                                    <v-select v-else v-model="n.maincat" :items="main_parent" item-text="text" return-object @input="setsubcat($event, index, n.maincat)" item-value="value" label="Select Main Category"></v-select>
                                                    <p v-if='n.maincat.text != "" ' class="cleariticon" @click="removedd(index)" > &times;</p>
                                            </v-flex>  -->
                                    </v-flex>
                                    <v-flex  class="center_flex2" >
                                            <v-flex xs12 sm6 md7 style="display:flex; flex-direction:row;"  >
                                                <p class="nicetypo" >{{n.main_sub_cat.text}}</p>
                                                
                                            </v-flex> 
                                        <!-- <v-flex xs12 sm6 md7 style="display:flex; flex-direction:row;" :class="{bdr: n.main_sub_cat.text != '' ? true: false }" >
                                            <p class="nicetypo" v-if='n.main_sub_cat.text != "" ' >{{n.main_sub_cat.text}}</p>
                                            <v-select v-else  v-model="n.main_sub_cat" :items="n.subcat_filter"  return-object item-text="text" item-value="value" @input="maintainsubcat($event, index)" label="Select Sub Category"></v-select>
                                            <p  v-if='n.main_sub_cat.text != "" ' class="cleariticon" @click="newremovedd(index)">&times;</p>
                                        </v-flex> -->
                                    </v-flex>
                                    <v-flex   class="centerit">
                                        <!-- <p> {{n.column}} </p>  just_columns -->
                                        <div :class="{forthediv: n.column != '' ? true : false }"  >
                                             <p ripple class="nicetyponew2" v-if='n.column != "" '>{{n.column}}</p>
                                                <v-select autocomplete v-else v-model="n.column" :items="just_columns" auto-complete return-object item-text="text" @change="filtercols($event, index)" item-value="value"  label="Map Columns"></v-select>
                                             <p fab x-small v-if='n.column != "" ' class="cleariticon" @click="removesingle(index, n.column)">&times;</p>
                                        </div>
                                        
                                    </v-flex>
                                </v-layout>
                                <v-flex xs2></v-flex>
                            </v-layout>
                            
                            </v-card>
                            <!-- <v-btn
                            color="primary"
                            @click="e1 = 3"
                            >
                            Continue
                            </v-btn> -->
                            <v-layout row>
                                      <v-flex v-if="first_col_values.length != 0" >
                                         <v-btn rounded color="primary" @click="savemapping" >Save</v-btn>
                                      </v-flex>

                                      <v-btn text> <v-icon>arrow_back_ios
</v-icon>  Back</v-btn>
                            </v-layout>
                           
                        </v-stepper-content>

                        <!-- <v-stepper-content step="3">
                            <v-card
                            class="mb-12"
                            color="white">
                                <v-btn  @click="texclu" >Bulk Upload</v-btn>
                                <input style="display:none;" type="file" id="getexcl" @change="second_bulk">
                            </v-card>
                            <v-btn
                            color="primary"
                            @click="normal_bulkupload"
                            >
                            Continue
                            </v-btn>
                            <v-btn text>Cancel</v-btn>
                        </v-stepper-content> -->
                </v-stepper-items>
  </v-stepper>

                    <v-dialog v-model="dialog" persistent max-width="800px">
                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field counter="50" maxlength="50" v-model="editedItem.rolename" label="Main Category"></v-text-field>
                            </v-flex>
                            <!-- <p>
                                {{editedItem.parent}}
                            </p> -->
                            <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.parent" :items="main_parent" item-text="text" item-value="value" label="Main Category"></v-select>
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.rolestatus"  :items="itemActive" item-text="text" item-value="value" label="Status"></v-select>
                            </v-flex> 
                       
                            
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

            <v-dialog  v-model="savemapstate" width="450">
            <v-card   class="pa-3">
                <p class="nicetyponew" >Would you like to restore your previous mapping session and continue it?</p>
                <v-layout row justify-center >
                        <v-btn small @click="restoremapstatenow" >Yes</v-btn>
                        <v-btn small @click="clear_map_state" >No</v-btn>
                </v-layout>
            </v-card>
            </v-dialog>

            <v-dialog  
                v-model="redirect_enable" width="450">
                <v-card   class="pa-3">

                        <p  class="nicetyponew" >Catgeories for that Channel does not exist, Would you like to create them ? </p>
                        <v-layout row justify-center > 
                            <v-btn @click="$router.push('/mkpic')" >Yes</v-btn>
                            <v-btn @click="clearchannel" >No</v-btn>
                        </v-layout>
                            
                </v-card>
            </v-dialog>


         

            <!-- <div class="text-xs-center pagination">
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination>
                    </div>  -->
            </v-card>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios'
import loadChannel from '../common/onProjectLoad.js' 
import { required, minLength } from 'vuelidate/lib/validators';

import XLSX from 'xlsx';

import _ from 'lodash'

var fileUpload = null;


export default {

    validations:{
        editedItem:{
            rolename:{
                required,
                minLength: minLength(2)
            },
        },
    },
    data(){
        return{

            files_name:"",
            redirect_enable: false,
            number_of_records:0,
            stop_previous: false,
            upload_xls:false,
            display_ch:"-",
            monthly_map_channel:{},
            counter: 0,

            def_set:["Final_Score", "Cheque_Bounce_Amt","Cheque_Bounce_percent", "COR_Actual "],
            just_columns:[],
            reserved_for_reset:[],
            final_apihit: false,
            saveit_as_not_empty: false,
            savemapstate:false,
            p_maps:[],
            previous_mappings:[],
            previous_map_headers:[],
            pm:false,
            allbulkdata:[],
            monthitis:"",
            yeararr:[],
            yearitis:"",
              monthcollection:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            qurtercollection:[
                {
                    text:"Quarter 1",
                    value:"q1"
                },
                 {
                    text:"Quarter 2",
                    value:"q2"
                },
                 {
                    text:"Quarter 3",
                    value:"q3"
                },
                 {
                    text:"Quarter 4",
                    value:"q4"
                },
            
            ],

            newsub_cat_holder:[],

            e1:1,
            to_restricted:[ 'Rank','Employee E-Code','Employee Name','Designation','Branch Name'],
            finalmapping:[],
            mainobjis:{},
            main_parent:[],
            first_col_values: [],
            secondupload_bulk:[],
            bulkData:[],
            excelfilename:'',
            exlname:'',
            disrolecode: false,
            dialog: false,
            postdata:'',
            pagination: {},
            pageLength:0,
            page:1,
            skip:0,
            skipdiffrence:this.paginationdiff(),
            channeldatafilter:'all',
            editrole:'',
            btnname:'',
            
            statusIndex:'',
            channeldataall:[],
            // ChannelFilter:'all',
            value:'',
            status:['InActive','Active'],
            getresponse:[],
            headers:[
                        {text: 'Parent Category', value: 'parentcategory'},
                        {text: 'Sub-Category', value: 'categoryName'},
                        {text: 'Category ID', value: 'categoryid'},
                        {text: 'Status', value: 'status'},
                        {text: 'Created by', value: 'createdby'},
                        {text: 'Updated by', value: 'updatedby'},
                        {text: 'Action', value: 'action'},
                        // {text: 'Area', value: 'area'},
                        // {text: 'City Name', value: 'city_name'},
                        // {text: 'State Name', value: 'state_name'},
                        // {text: 'Region Name', value: 'region_name'},
                        // {text: 'Zone Name', value: 'zone_name'},
                        
                ],
                // itemActivedata:[],
                itemActive:[
                    {text: 'Active', value: 1},
                    {text: 'InActive', value: 0},
                ],
         
            main_sub_cat:[],
            tableData: [],
                editedIndex: -1,

                editedItem: {
                rolename:'',
                rolecode:'',
                parent:'',
                rolestatus:'',
                statusSelected:'',
                channel:'',
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
                rolestatus:'',
                statusSelected:'',
             
                
            },
            status:['Active','InActive'],
            actStatus:'',
            channeldata:[],
              
                
        }
    },

    beforeRouteLeave(to, from, next) {
        console.log('left child component');
        this.savestate();
        next();
    },

    created(){

            this.redirect_enable = false
            loadChannel.getChannel(this, res => {
                    console.log("mixin channel data" ,  res)
                    let channelalldata=[]
                    for(let i =0;i<res.length;i++){
                            
                        if(res[i].active === 1){
                            let channetobj ={
                                text:res[i].channelName,
                                value:res[i]._id
                            }
                            this.channeldata.push(channetobj)  
                            this.channeldataall.push(channetobj)
                        }

                    }
                    // let alldata={
                    //             text:'All',
                    //             value:'all',
                    //         }
                    //     this.channeldataall.unshift(alldata)
                })

             this.$store.commit('SET_PAGE_TITLE','Map Monthly KPI');
            //  this.getting_main_cat();
            //  this.getting_sub_cat();
               var min = 2019 , max = 2024;
                for(let i = min; i<=max; i++){
                    this.yeararr.push(i)
                } 

            console.log("if map has data ->", this.$store.state.mappingdata );
            if(this.$store.state.mappingdata.m_maindata.length != 0){
                //ss99
                console.log("qmapping data from IF was not found empty ->", this.$store.state.mappingdata);
                this.savemapstate = true
            }else{
                this.savemapstate = false
            }


           

                            
                // console.log('mainparent is ->', this.main_parent );
                // this.GetRole();
        },

    computed: {
        objmethod() {
        
       
    	 var self=this;
        return this.getresponse.filter(function(cust){return cust.roleName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.roleCode.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
            || cust.channelCode.channelName.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0  
         });
       //return this.customers;
    },

        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Edit'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
        }
    },
    methods:{

         clearchannel(){
                this.redirect_enable = false;
                this.monthly_map_channel = {};

         },

         clear_map_state(){

            this.savemapstate = false
            this.stop_previous = false

               var pass_empty = {
                        myear:"",
                        mmonth:"",
                        m_channel:"",
                        ch_name:"",
                        m_cols:[],
                        m_maindata:[],
                        sheet_data:"",
                }
                this.$store.commit('SMD', pass_empty );

                console.log("SMD - ->", this.$store.state.mappingdata );

        },

        removesingle(ind, col){
            this.first_col_values[ind].column = ""
            console.log("COL is ->", col);
            this.just_columns.unshift(col);
        },

        hard_reset(){
                for(let i=0; i<this.first_col_values.length ; i++){
                     this.first_col_values[i].err = false;
                     this.first_col_values[i].column = "";
                    //  this.first_col_values[i].maincat = { text:"", value:"",visib: false,}
                    //  this.first_col_values[i].subcat_filter = [];
                    //  this.first_col_values[i].main_sub_cat = { text:"", value:"",visib: false,}
                }

                this.just_columns = [];
                this.just_columns = this.reserved_for_reset

        },

        restoremapstatenow(){
              this.savemapstate = false;
              this.e1 = 2
              this.allbulkdata = this.$store.state.mappingdata.sheet_data;
              this.first_col_values = this.$store.state.mappingdata.m_maindata;
              this.monthly_map_channel.value = this.$store.state.mappingdata.m_channel;
              this.yearitis = this.$store.state.mappingdata.myear;
              this.monthitis = this.$store.state.mappingdata.mmonth;
              this.display_ch = this.$store.state.mappingdata.ch_name;
            //   console.log("display_ch ->", this.display_ch);
              var compstore = this.$store.state.mappingdata.m_maindata.length;
              var compfirstcol = this.first_col_values.length;
              this.just_columns = this.$store.state.mappingdata.m_cols
              if(compstore == compfirstcol){
                     this.stop_previous = true
                    this.showToast("Your Mapping data is now restored", "success");
                    console.log("first_col_values restored mappings r ->", this.first_col_values);
              }
        },

        resetstore(){
            this.$store.state.mappingdata = [];
            console.log("reset working ? =>",   this.$store.state.mappingdata );
        },

       savestate(){
        // for reference only  var sam =  {
        //                     err: false,
        //                     column: worksheet[cells[i]].v ,
        //                     maincat:{
        //                         text:"",
        //                         value:"",
        //                         visib: false,
        //                     },
        //                     subcat_filter:[],
        //                     main_sub_cat: {
        //                         text: "",
        //                         value:"",
        //                         visib:false,
        //                     }           
        //         }

        if(this.final_apihit){
                var pass_empty = {
                        myear:"",
                        mmonth:"",
                        m_channel:"",
                        ch_name:"",
                        m_cols:[],
                        m_maindata:[],
                        sheet_data:"",
                }
                        this.$store.commit('SMD', pass_empty );
                console.log('not saved to store as, final api hit and data saved to DB');

        }else{

                var forcomparing = this.first_col_values.length;
                console.log("forcomparing ->", forcomparing );
                var formatching = [];
                    console.log("first col values are ->", forcomparing );
                    for(let i=0; i < forcomparing ; i++){
                            if(this.first_col_values[i].column == ""){
                                formatching.push(i);
                            }else{
                                console.log("next please, as data found")
                            }
                    }
                
                    console.log("formatching is ->",formatching.length);
                    console.log("first_col_values are ->",forcomparing);

                    console.log("matching result is =>>>>>>>>>>>", forcomparing == formatching.length)
                    var formatchlen = formatching.length
                    if(forcomparing == formatchlen){
                        console.log("from if as true it's same ->",true);
                            this.saveit_as_not_empty = false
                    }else{
                        console.log("from else as not matched")
                        this.saveit_as_not_empty = true
                    }

                    if(this.saveit_as_not_empty){
                        console.log('Saving to store as some values were selected')
                        console.log("stored SMD state is ->", this.$store.state.mappingdata);
                        var save_q_map = this.first_col_values;
                           var final_store = {
                                 myear: this.yearitis ,
                                 mmonth:  this.monthitis,
                                 ch_name: this.display_ch,
                                 m_channel:  this.monthly_map_channel.value,
                                 m_cols: this.just_columns ,
                                 m_maindata: save_q_map,
                                 sheet_data: this.allbulkdata
                        }

                        this.$store.commit('SMD', final_store );
             
                    }else{
                        
                          var pass_empty = {
                                 m_channel: "",
                                 m_cols:  [],
                                 m_maindata:  [],
                                 sheet_data:"",
                        }
                        this.$store.commit('SMD', pass_empty );
                        console.log('not saved to store as, no values were selected')
                    }
            }
        },

          clearall(){
          
                this.monthitis = ""
                this.yearitis = "";
                this.number_of_records = 0
                this.monthly_map_channel = {}
                this.upload_xls = false
                this.just_columns = []
                this.allbulkdata = []

        },

        nextitis(){

                if( this.number_of_records == 0){
                    this.showToast("Please Upload a sheet to start mapping", "warning");
                
                    return
                }   
        
                if(Object.keys(this.monthly_map_channel).length == 0 || this.yearitis == '' || this.monthitis == ''){
                    this.showToast("Please enter the fields to start mapping", "warning");
                    return
                }else{
                    
                    if(this.stop_previous){
                        console.log("previous mapping is not required as previous data-state is needed");  
                    }{
                        console.log("as stop prevoius is ->", this.stop_previous)
                        this.fetch_previous_mapping();
                    }
                     this.e1 = 2
                }
               
               
        },

        fetch_previous_mapping(){
            // pm99
            //http://172.16.62.136:2030/secure/admin/fetchKPIMaster/quater_mapping?userId=5d80e7f584dfaa4a37a6b722&skip=0
            this.GET('fetchKPIMaster/mapping?userId='+this.getAgentInfo()._id+'&channel='+this.monthly_map_channel.value, (res, error ) => {     
                if(error){
                    console.log("error occured ? ", error)
                    return;
                }else if(res.data.errCode == -1){

                        this.p_maps = [];
                        this.p_maps = res.data.errMsg[0].mapping;
                        // console.log('fetching previous mappings in p_maps =>', this.p_maps);
                        // previous_mappings:[],
                        this.previous_map_headers = [];
                        var firstcol_header = []
                        // pm:false,  
                        // console.log("just columns ->", this.just_columns);
                        // var jc = this.just_columns
                        var pmapscolumns = this.p_maps.map(e => {
                            return e.sheetColumn
                        })
                        var diff_is =   _.difference(this.just_columns, pmapscolumns );
                        console.log("diff is from Lodash->", diff_is);
                        this.just_columns =  diff_is


                        for(let i=0; i<this.first_col_values.length ; i++){

                            this.p_maps.filter(e => {

                            if(e.maincatid ==  this.first_col_values[i].maincat.value && e.subcatid == this.first_col_values[i].main_sub_cat.value){
                                    this.first_col_values[i].column = e.sheetColumn;
                                }
                            })
                        }
                        this.showToast("Previous Mapping data available and auto-mapped", "success");

                }else if(res.data.errCode == 303){

                    this.showToast("No previous mapping data available", "warning");
                    return

                }else{
                       this.showToast("Something went wrong", "error");
                       console.log("Something went wrong")
                       return
                }
    
               

            return
            // previous_mappings:[],
            this.previous_map_headers = [];
            var firstcol_header = []
            // pm:false,    
                        for(let z=0; z<this.p_maps.length; z++){
                                    this.previous_map_headers.push(this.p_maps[z].sheetColumn)
                                    firstcol_header.push(this.just_columns[z]);
                        }
                console.log("previously mapped headers ->", this.just_columns);
                var a3 = [];                                                            
                var a4 = [];
                a3 =  this.previous_map_headers;
                a4 = firstcol_header
                // a3.push("NEW GPW")
                a3 = a3.concat().sort();
                a4 = a4.concat().sort();

                console.log("a3 sorted result is ->", a3);
                console.log("a4 sorted result is ->", a4);

                var is_same = a3.length == a4.length && a3.every(function(element, index) {
                  return element === a4[index]; 
                });

                console.log("is same is ->", is_same);

                if(is_same){

                    //          err: false,
                    //         column: "" ,
                    //         maincat:{
                    //             text: themain_cat[0].text,
                    //             value: themain_cat[0].value,
                    //             visib: false,
                    //         },
                    //         // subcat_filter:[],
                    //         main_sub_cat: {
                    //             text: this.main_sub_cat[i].text,
                    //             value:  this.main_sub_cat[i].value,
                    //             visib:false,
                    //         }        
                    // }


                    for(let i=0;i<this.p_maps.length; i++){
                                
                            this.first_col_values.filter(e =>{
                                    if(e.maincat.value == this.p_maps[i].maincatid && e.main_sub_cat.value == this.p_maps[i].subcatid){
                                            console.log("first col values e is ->", e);
                                            e.column = this.p_maps[i].sheetColumn
                                    }
                            })

                    }
                
                    console.log("first col valuies when headers are macthed ->", this.first_col_values);

                    return

                }else{
                    
                    this.showToast("New values found in the sheet, you will be mapping a New Sheet", "warning");
                }

                return

                if(is_same == true){
                        this.showToast("Same Sheet was found", "success");
                        for(let i=0; i <  this.p_maps.length; i++){

                                console.log("reached for loop running twice")
                                   this.p_maps.filter(e =>{
                                        //console.log("e is =>", e)
                                        if(e.sheetColumn == this.first_col_values[i].column){
                                            //console.log("pmaps matched ->", e);
                                            this.main_parent.filter(mp =>{
                                                //  console.log("mp is ->", mp);
                                                    if(mp.value == e.maincatid){
                                                            // console.log("mp to be set on first col is ->", mp);
                                                            console.log("FCOL  ->", this.first_col_values[i])
                                                            this.first_col_values[i].maincat.text = mp.text
                                                            this.first_col_values[i].maincat.value = mp.value
                                                            this.first_col_values[i].maincat.visib = true
                                                            // console.log("after setting values ->", this.first_col_values[i] );
                                                            var fdata = this.main_sub_cat.filter(data =>{
                                                                            if(data.compare_parent_id == mp.value){
                                                                                data.visib = false
                                                                                return data
                                                                            }
                                                            })
                                                        // console.log(" fdata job done ->", fdata);
                                                          this.first_col_values[i].subcat_filter = fdata;
                                                          var res_sub =  this.main_sub_cat.filter(sub =>{                            
                                                                            if(sub.value == e.subcatid){
                                                                                // console.log("SuB ->", sub);
                                                                                return sub
                                                                            }
                                                            })
                                                            // console.log("resultant subcat is ->", res_sub);
                                                            // need to fill in sucat filter ->  subcat_filter
                                                            this.first_col_values[i].main_sub_cat = res_sub[0]
                                                             console.log('first_col value is ->', this.first_col_values[i]);
                                                            this.$forceUpdate();
                                                    }
                                            })
                                        }
                                   })
                        }
                }else{

                       this.showToast("New values found in the sheet, you will be mapping a New Sheet", "warning");
                }

            })


        },

        setyear(data){
              this.yearitis = data;
              console.log("year ->", this.yearitis);
        },

        setquarter(data){
                this.monthitis = data;
                console.log("quarter it is ->",data);
        },


        second_bulk(e) {
            console.log("Event is", e);
            console.log('File Name is >>>', e.target.files[0].name);
            var me = this
            //getting the excel file name 
            me.exlname = e.target.files[0].name;
            
            //Reference the FileUpload element.
            fileUpload = document.getElementById("fileUpload");
            console.log("File is", fileUpload);
            //Validate whether File is valid Excel file.
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
            if (regex.test(fileUpload.value.toLowerCase())) {
                if (typeof(FileReader) != "undefined") {
                    var reader = new FileReader();
                    //For Browsers other than IE.
                    if (reader.readAsBinaryString) {
                        //For NON IE Browser.
                        reader.addEventListener('load', (e) => {
                            this.bulkupld(e.target.result)
                        })
                        reader.readAsBinaryString(fileUpload.files[0])
                    }
                    else {
                        //For IE Browser.
                        reader.addEventListener('load', (e) => {
                            var data = "";
                            var bytes = new Uint8Array(e.target.result);
                            for (var i = 0; i < bytes.byteLength; i++) {
                                data += String.fromCharCode(bytes[i]);
                            }
                            this.bulkupld(data);
                        })
                        reader.readAsArrayBuffer(fileUpload.files[0]);
                    }
                }
                else {
                    me.showToast("This browser does not support HTML5.", "error");
                }
            } else {
                me.showToast("Please upload a valid Excel file.", "error", );
            }
        },

        bulkupld(data) {
            this.secondupload_bulk= []
            //Read the Excel File data.
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
           
            var first_sheet_name = workbook.SheetNames[0];

            //  console.log("execel result is =>", workbook);
            // var sheet_len = workbook.SheetNames.length

            //  this.exdata = []
            // for(let i=0; i < sheet_len ; i++){
            //        this.exdata.push(XLSX.utils.sheet_to_csv((workbook.Sheets[workbook.SheetNames[i]])).split("\n"))
            // }
            // // console.log('all sheet data->', all_sheets_data);
        

            // console.log('sheet to csv result ->', this.exdata);
            // // var exdata_len = this.exdata.length
            // // var single_lined_data = []

            // // for(let j=0; j<exdata_len; j++){
            // //      single_lined_data.push(this.exdata[j].split("\n"));
            // // }
            // // console.log("Single lined data is - >", single_lined_data);
            // return
            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
            //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
            //        raw: true
            //}));
            //  workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            var excelData = []
            excelData = XLSX.utils.sheet_to_csv(worksheet);
            // var json_object = JSON.stringify(XL_row_object);
            // console.log(excelData);
            var lines = excelData.split("\n");
            var result = [];
            var headers = lines[0].split(",");
            // console.log('Lines are', lines)
            for (var i = 1; i < lines.length - 1; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                for (var j = 0; j < currentline.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
          
            this.showToast('File Uploaded Successfully', 'success')
            let Str = JSON.stringify(result);
            // console.log("Final JSON Result:::::::",Str);
            // let StrParse = JSON.parse(Str)
            this.secondupload_bulk = Str
              console.log("BULK JSON is ->", this.secondupload_bulk);
        },

        normal_bulkupload(){
            const formData = {
                userId:this.getAgentInfo()._id,
                kpiJSON: this.secondupload_bulk, 
            };
            this.POST('v2/kpi_sheet', formData, (res, err) => {               
                    console.log('kpi_sheet =>', res.data.errMsg);
            })
        },

        texclu(){
               document.getElementById('getexcl').click();
        },

        tfu(){
               console.log("from tfu")
               document.getElementById('fileUpload').click();

              
             
        },

        getting_main_cat(channel){
            
            this.GET('fetchKPIMaster/main_category?userId='+this.getAgentInfo()._id+'&channel='+channel , (res, error )=> {
                    // p99

                if(error){
                    console.log("Error", error);
                    return;
                }

                if(res.data.errCode == -1){
                       this.redirect_enable = false;
                     console.log("main cat data channel wise only" ,  res.data.errMsg[0])
                    var parentdata = res.data.errMsg[0];
                    for(let i =0;i< parentdata.length;i++){    
                      
                            let channetobj = {
                                text:parentdata[i].categoryName,
                                value:parentdata[i]._id,
                                visib:false
                            }
                           this.main_parent.push(channetobj)
                        
                    }
                  
                    this.getting_sub_cat(channel);

                }else if(res.data.errCode == 303){
                      this.redirect_enable = true;
                      return

                }else{

                       console.log("An error has occured");

                }
                  


                   

                })
        },

        // remove_sub(){
        //          this.first_col_values[ind].maincat = {
        //         text: "",
        //         value: "",
        //         visib : false,
        // }
        // },

        removedd(ind){
            this.first_col_values[ind].maincat = {
                text: "",
                value: "",
                visib : false,
           }
            this.first_col_values[ind].main_sub_cat = {
                text: "",
                value: "",
                visib : false,
            } 
            this.first_col_values[ind].subcat_filter = []
        //      console.log("bf",this.first_col_values[ind].subcat_filter) 
        //       console.log("bf of main sub cat", this.first_col_values[ind].main_sub_cat) 
        //     this.first_col_values[ind].subcat_filter.push(this.first_col_values[ind].main_sub_cat);
        //     this.first_col_values[ind].main_sub_cat = {
        //         text: "",
        //         value: "Select",
        //         visib : false,
        //    }
        //      console.log("after",this.first_col_values[ind].subcat_filter) 
        //    console.log("af of main sub cat", this.first_col_values[ind].main_sub_cat) 
        },
          

        newremovedd(ind){
            this.first_col_values[ind].main_sub_cat = {
                text: "",
                value: "",
                visib : false,
            } 
        },

        maintainsubcat(evt, ind){

              
            console.log("evt is ->", ind);
            for(let i=0; i< this.first_col_values.length; i++){
                // console.log("main sub cat value", this.first_col_values[i].main_sub_cat.value)
                // console.log("ind ", ind);
                // console.log("i is =>", i)
                    
                         if(i != ind &&  this.first_col_values[i].main_sub_cat.value == evt.value){
                                // alert("You're already using that value in ");
                                console.log("Using that value already ->",this.first_col_values[i].column);
                                this.showToast("You have already Mapped it to "+this.first_col_values[i].column, "warning", );
                                this.first_col_values[i].err = true
                                this.first_col_values[ind].main_sub_cat = {
                                                        text: "",
                                                        value:"",
                                                        visib:false,
                                                    }
                         }else{
                                
                                this.first_col_values[i].err = false
                                console.log("values nt f")
                                evt.visib = true
                                this.newsub_cat_holder.push(evt);
                                this.newsub_cat_holder.map(e=>{
                                        e.visib = true
                                })
                         }
            }


            // var newarrone = []
            //     for(let i=0; i<this.first_col_values.length; i++){
            //         for(let j=0; j< this.first_col_values[i].subcat_filter.length; j++)

            //           if(this.first_col_values[i].subcat_filter[j].visib == false){
                         
            //               var objmain = this.first_col_values[i].subcat_filter[j];
            //             //    console.log("objmain values are ->", objmain);
            //                newarrone.push(objmain);
            //                     // this.first_col_values[ind].subcat_filter.push(objmain);
            //                 // this.first_col_values[i].subcat_filter.push()
            //           }
            //     }
            

            // this.first_col_values[ind].subcat_filter = newarrone
            // console.log("newonearr is ->",newarrone);
            //  console.log(" MAIN THING ",  this.first_col_values[ind].subcat_filter);
            //   console.log('newsub cat  ->',  this.newsub_cat_holder);
  
                    // for(let i=0; i< this.first_col_values.length; i++){
                    //     //    console.log(" sync subcats of same parents ->");
                    //        for(let j=0; j<this.newsub_cat_holder.length; j++){  
                    //             this.first_col_values[i].subcat_filter.filter( e=>{
                    //                 //  console.log("what values in subcat in filter ->", e.compare_parent_id);
                    //                 //  console.log("second loop true values matching is ->", this.newsub_cat_holder[j].compare_parent_id)
                    //                 if(e.compare_parent_id == this.newsub_cat_holder[j].compare_parent_id){
                    //                         console.log("matched item found is ->", e);
                    //                         console.log("new sub cat holder matched ->",  this.newsub_cat_holder[j]);
                    //                     // var theindex =  this.first_col_values[i].subcat_filter.findIndex(e => e.compare_parent_id == this.newsub_cat_holder[j].value)
                    //                     // console.log("second sync index is =->", theindex);
                    //                     // this.first_col_values[i].subcat_filter.splice(theindex, 1)
                    //                 }
                    //             })
                    //        }               
                    // }
            // }
             
            //  console.log('after sub cat filteration ->',  this.first_col_values);

            //    this.first_col_values[ind].subcat_filter.filter(element =>{
            //         console.log("what's element ->", element);
            //         if(element.value == evt.value){
            //              console.log('if return object is ->', evt.value);
            //           var pos = this.first_col_values[ind].subcat_filter.findIndex( element => element.value === evt.value )
            //         this.first_col_values[ind].subcat_filter.splice(pos, 1);

            //         this.newsub_cat_holder.push(...this.first_col_values[ind].subcat_filter)

            //            console.log("newsub cat holder ->", this.newsub_cat_holder );
            //         }
            // })

        },

        filtercols(e, index){
             console.log(e);

             if(this.first_col_values[index].err == true){
                    this.first_col_values[index].err = false;
             }


             var ind_pos  =   this.just_columns.findIndex( d => d == e)
             console.log("ind_pos is ->", ind_pos);
             this.just_columns.splice(ind_pos, 1);

        },

        setsubcat(evt, index, mcat){
           console.log("mainsubcat stored are ->", this.main_sub_cat);
            console.log("setsub cat called from @input ->", evt);
            // return
            // this.first_col_values[index].maincat = evt;
            // console.log('setsubcat fired',  this.first_col_values[index].maincat);
            // var maindata
            // this.main_parent.filter(element =>{
            //         console.log("what's element ->", element);
            //         if(element.value == evt.value){
            //              console.log('if return object is ->', evt.value);
            //           var pos = this.main_parent.findIndex( element => element.value === evt.value )
            //         this.main_parent.splice(pos, 1);
            //         console.log("main parent ->",  this.main_parent);
            //         }
            // })
        //       console.log("main parent before ->", this.main_parent.length );
        //    this.main_parent.filter(e=>{
        //                 if(e.value == evt.value){
        //                     console.log("matched e is =>", e.visib = true);
        //                     e.visib = true
        //                     return e
        //                 }
        //     })

            
      
        //      var newarrone = []
        //      var falseobj = {}
        //     console.log("main parent after ->", this.main_parent.length );

        //     for(let i=0; i<this.main_parent.length; i++){
                  
        //            if(this.main_parent[i].visib == false){
                          
        //                          falseobj = this.main_parent[i]
        //                          console.log("newarr i ->", falseobj);
        //                          newarrone.push(falseobj);         
        //             }  
        //     }
        //     console.log("NEWARRONE after true false check->", newarrone );

                    

            var fdata = this.main_sub_cat.filter(e =>{
                            console.log('from filter ->', e);
                            if(e.compare_parent_id == evt.value){
                                e.visib = false
                                return e
                            }
            })
        
            
                // for(let i=0; i< this.newsub_cat_holder.length; i++){
                //         //    console.log("are we reaching somewhere ->");
                //                fdata.filter(e=>{
                //                         if(e.value == this.newsub_cat_holder[i].value){
                //                             var theindex = fdata.findIndex(e => e.value == this.newsub_cat_holder[i].value)
                //                             console.log("index is =->", theindex);
                //                             fdata.splice(theindex, 1)
                //                         }
                //                })
                // }
 
                //  for(let i=0; i<this.first_col_values.length; i++){
                //         // for(let j=0; j<this.first_col_values[i].subcat_filter.length; j++){
                //                     if(this.first_col_values[i].maincat.value == evt.value){
                //                              this.first_col_values[i].subcat_filter = fdata;
                //                     }
                //         // }                     
                //  }

            //  for(let i=0; i< this.first_col_values.length; i++){
            //         this.first_col_values[i].
            //  }
              this.first_col_values[index].subcat_filter = fdata;

            //   console.log("subcat-filter checking for true/ false values ->", this.first_col_values[index] );



           
            //  var pos = this.fdata.findIndex( element => element.value === evt.value )

            // for(let i=0; i < this.newsub_cat_holder.length ; i++){
            //         if(evt.value == this.newsub_cat_holder[i].compare_parent_id){
            //                     console.log("print new subcat holder in loop =>",  )
            //                     fdata.push(this.newsub_cat_holder[i])
            //         }
            //    }
        
            // console.log("newsub cat holder length", this.newsub_cat_holder.length );
            // if(this.newsub_cat_holder.length != 0){
             
            //     for(let i=0; i < this.newsub_cat_holder.length ; i++){

            //         if(evt.value == this.newsub_cat_holder[i].compare_parent_id){
            //                     console.log("print new subcat holder in loop =>",  )
            //                     fdata.push(this.newsub_cat_holder[i])
            //         }
            //    }
            // }
    
            // console.log("fdata after processing for loop ->", fdata);
         
            // for(let i=0; i< this.first_col_values.length; i++){
            //         if(this.first_col_values[i].maincat.visib == true){
            //         }
            // }

            // console.log("find single truth value",  this.first_col_values)

        },


getting_sub_cat(channel){
              this.GET('fetchKPIMaster/sub_category?userId='+this.getAgentInfo()._id+'&channel='+channel ,res => {
                    // c99
                    var childdata = res.data.errMsg[0]
                     console.log("Sub category data" ,  childdata);
                    for(let i =0;i< childdata.length;i++){
                            
                        // if(childdata[i].status === 1){
                            let channetobj = {
                                compare_parent_id:childdata[i].parentCategory._id,
                                text:childdata[i].categoryName,
                                value:childdata[i]._id
                            }
                           this.main_sub_cat.push(channetobj);
                        // }
                    } 
              })

            console.log("Channel-wise sub cat =>", this.main_sub_cat);
},

        // getting_sub_cat(){

        //       this.GET('fetchKPIMaster/sub_category?userId='+this.getAgentInfo()._id+'&channel='+channel ,res => {
        //             // c99
        //             var childdata = res.data.errMsg[0]
        //              console.log("Sub category data" ,  childdata);
        //             for(let i =0;i< childdata.length;i++){
                        
        //                 this.main_parent.filter(e=> {

        //                         if(e.value == childdata[i].parentCategory._id){
        //                                  let channetobj = {
        //                                 compare_parent_id: childdata[i].parentCategory._id,
        //                                 text:childdata[i].categoryName,
        //                                 value:childdata[i]._id
        //                             }
        //                         this.main_sub_cat.push(channetobj);
        //                     }
        //                 })
        //             } 
        //       })
        //       console.log("response of sub cat =>", this.main_sub_cat);
        // },

        savemapping(){
            //sm99
            // console.log('first col values on SAVE======== ->', this.first_col_values);
            this.finalmapping = []
            for(let z=0; z < this.first_col_values.length; z++){

                      if(this.first_col_values[z].err == true){
                            this.showToast("One or more mapping field has duplicate values", "error", );
                            this.final_apihit = false;
                            return
                      }        
            }


            // for(let i=0; i < this.first_col_values.length; i++){

            //         if(this.first_col_values[i].column == '' || this.first_col_values[i].column == null){
            //              this.first_col_values[i].err = true
            //              this.showToast("One or more fields are left un-mapped", "error", );
            //              console.log("====>>>",  this.first_col_values[i].err);
            //              console.log(" what color =>",   this.first_col_values[i]);
            //              return
            //         }
            // }

            var colslength = this.first_col_values.length;
            console.log('cols length ->',  colslength);
            var self = this;
            for(let i=0; i<colslength; i++){
                // console.log("what we have inside ->", self.first_col_values[i].maincat);
                    var finalobj = {}
                    finalobj = {
                            sheetColumn: self.first_col_values[i].column,
                            mainCategory:self.first_col_values[i].maincat.text,
                            maincatid: self.first_col_values[i].maincat.value , 
                            mappedWithSubCategory: self.first_col_values[i].main_sub_cat.text ,
                            subcatid: self.first_col_values[i].main_sub_cat.value 
                    }
                    self.finalmapping.push(finalobj)
            }

            console.log("final_mapping ->",  self.finalmapping);
            
            this.POST('KPIMasters/mapping ', { mapping:this.finalmapping, channel: this.monthly_map_channel.value, userId: this.getAgentInfo()._id  } ,res => {
                if(res.data.errCode == -1){
                    console.log('mapping response =>', res.data.errMsg);
                  

                    // fd99

            const formData = {
                userId:this.getAgentInfo()._id,
                kpiJSON: this.allbulkdata,
                month: this.monthitis,
                year: this.yearitis,
                channel: this.monthly_map_channel.value
            };

            console.log("FormData before sending is", formData);

                    this.showLoader('Uploading', true);
                    let self = this;
                    this.POST('v2/kpi_sheet', formData, (res, err)=>{
                            
                            if (res.data.errCode == -1){
                                self.final_apihit = true;
                                console.log("Download link",res.data.errMsg);
                                self.showLoader('Uploading', false);
                                setTimeout(function(){  
                                    self.showLoader('Uploading', false);
                                    self.showToast("Mapping Data & Monthly KPI Sheet successfully uploaded", "success", );
                                    // self.showToast("Monthly KPI Sheet has been successfully uploaded", "success", );         
                            }, 1000);
                               
                            }else{
                                  self.showLoader('Uploading', false);
                                  self.final_apihit = false;
                                  self.showToast("Something went wrong", "error", ); 
                            }
                    })
                }else{
                    this.showToast("An error has occured", "error", );
                    console.log("mapping failed");
                }
            })

            console.log('final array mapping ->', this.finalmapping);
            // this.e1 = 3

        },

        jsonupload(e){

            // console.log("e si from click on element triggered ->", e);
            // return
           

            this.upload_xls = false 
            this.bulkData = [];
            console.log("Event is", e)

            console.log('File Name======>>>', e.target.files[0].name)
           

            

            var me = this
            //getting the excel file name 
            me.excelfilename = e.target.files[0].name 
            
            //Reference the FileUpload element.
            fileUpload = document.getElementById("fileUpload");
            console.log("File is", fileUpload)
            //Validate whether File is valid Excel file.
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
            if (regex.test(fileUpload.value.toLowerCase())){
                if (typeof(FileReader) != "undefined"){
                    var reader = new FileReader();
                    //For Browsers other than IE.
                    // if (reader.readAsBinaryString) {
                    //     //For NON IE Browser.
                    //     reader.addEventListener('load', (e) => {
                    //         this.ProcessExcel(e.target.result)
                    //         this.allprocess(e.target.result)
                    //     })
                    //     reader.readAsBinaryString(fileUpload.files[0])
                    // }
                    // else {
                        //For IE Browser.
                    if(reader.readAsArrayBuffer){
                            reader.addEventListener('load', (e) => {
                            var data = "";
                            var bytes = new Uint8Array(e.target.result);
                            for (var i = 0; i < bytes.byteLength; i++) {
                                data += String.fromCharCode(bytes[i]);
                            }
                            this.ProcessExcel(data);
                            this.allprocess(e.target.result)
                        })
                    }
                        reader.readAsArrayBuffer(e.target.files[0]);

                     this.files_name =  e.target.files[0].name;
                     if(this.files_name.length > 25){
                         this.files_name = this.files_name.slice(0,10);
                         this.files_name = this.files_name.concat("...");
                     }
                    // }
                }
                else {
                    me.showToast("This browser does not support HTML5.", "error");
                }
            } else {
                // alert("why from else?");
                me.showToast("Please upload a valid Excel file.", "error", );
            }
        },

        allprocess(data){
                console.log("data is ->", data)
            //   var workbook = XLSX.read(data, {
	        //         type: 'binary'
	        //     });
	        //     console.log("Workbook is",workbook.Strings)
	
	        //     var first_sheet_name = workbook.SheetNames[0];
	        //     /* Get worksheet */
	        //     var worksheet = workbook.Sheets[first_sheet_name];
	        //     //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
	        //     //        raw: true
	        //     //    }));
	        //     var excelData =[]
	        //     excelData = XLSX.utils.sheet_to_csv(worksheet);
	        //     // var json_object = JSON.stringify(XL_row_object);
	        //     console.log(excelData);
	        //     var lines=excelData.split("\n");
	
	        //     var result = [];
	
	        //     var headers=lines[0].split(",");
	        //     console.log('Lines are',lines)
	
	        //     for(var i=1;i<lines.length-1;i++){
	        //         var obj = {};
	        //         var currentline=lines[i].split(",");
	        //         for(var j=0;j<currentline.length;j++){
	        //             obj[headers[j]] = currentline[j];
	        //         }
	        //         result.push(obj);
	        //     }
	        //     let res =[]
	        //     // console.log("JSON IS",result)
	        //     for(let i = 0;i<result.length;i++){
	        //         if(result[i].accessOpt !== '')
	        //         {
	        //             res.push(result[i])
	        //         }
	        //     }
	        //     this.showToast('File Uploaded Successfully','success')
	        //     let Str = JSON.stringify(res)
	            //   let StrParse = JSON.parse(Str)
	            // this.bulkData = Str
                // console.log("Final JSON is",this.bulkData)
            this.$refs.fileref.value = '';
            var workbook = XLSX.read( data , {type: 'array'});
                     let sheetName = workbook.SheetNames[0];
                     let worksheet = workbook.Sheets[sheetName];
                     console.log("worksheet result is ", worksheet);
                       
                     var jsondata = XLSX.utils.sheet_to_json(worksheet, {defval:"", raw: false})
            if(jsondata.length == 0){
                 this.showToast('No records found in the file','warning')
                    return
            }else{
                 this.showToast('File Uploaded Successfully','success')
            }
                   
            this.allbulkdata = JSON.stringify(jsondata);
              console.log("BULK JSON is ->", this.allbulkdata);

             
              this.upload_xls = true
              var newdata  = jsondata;

                this.just_columns = []
                var a3 = [];                                                            
                var a4 = [];

                console.log("newdata is ->", newdata);
                 
                this.number_of_records = newdata.length
              
                a3 =   Object.keys(newdata[0]);
                console.log("a3 length is ->", newdata.length);
                var a9 = newdata.length - 1

                a4 = Object.keys(newdata[a9])
                // a3.push("NEW GPW")
                a3 = a3.concat().sort();
                a4 = a4.concat().sort();

                console.log("a3 sorted result is ->", a3);
                console.log("a4 sorted result is ->", a4);
               

                var is_same = a3.length == a4.length && a3.every(function(element, index) {
                  return element === a4[index]; 
                });

                if(is_same){
                      this.reserved_for_reset =  this.just_columns = Object.keys(newdata[0])
                    
                }else{
                    console.log("An error has occured, fallback will ensure you have relevant values of headers to map instead of empty values");
                        this.just_columns = []
                        var cells = Object.keys(worksheet);
                        console.log("CELLS ->", worksheet );

                        for (var i = 0; i < Object.keys(cells).length; i++){

                            if( cells[i].indexOf('1')  == 1 || cells[i].indexOf('1') == 2){
                                this.just_columns.push(worksheet[cells[i]].v);

                            } 
                        }

                          this.reserved_for_reset  = this.just_columns
                }
                console.log("is same is for headers =>", is_same)

        },


        ProcessExcel(data){
            // pe99
            //Read the Excel File data.
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
           
            var first_sheet_name = workbook.SheetNames[0];

            //  console.log("execel result is =>", workbook);

            // var sheet_len = workbook.SheetNames.length
            //  this.exdata = []
            // for(let i=0; i < sheet_len ; i++){
            //        this.exdata.push(XLSX.utils.sheet_to_csv((workbook.Sheets[workbook.SheetNames[i]])).split("\n"))
            // }
            // // console.log('all sheet data->', all_sheets_data);
        

            // console.log('sheet to csv result ->', this.exdata);
            // // var exdata_len = this.exdata.length
            // // var single_lined_data = []

            // // for(let j=0; j<exdata_len; j++){
            // //      single_lined_data.push(this.exdata[j].split("\n"));
            // // }
            // // console.log("Single lined data is - >", single_lined_data);
            // return
            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
            //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
            //        raw: true
            //}));
            //  workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            // var excelData = []
            // excelData = XLSX.utils.sheet_to_csv(worksheet);
        this.first_col_values = []
        // this.just_columns = []
        var cells = Object.keys(worksheet);
        // uniq = [...new Set(array)];
        // m99
        // for (var i = 0; i < Object.keys(cells).length; i++) {
        //     if( cells[i].indexOf('1') > -1){

        //         // this.mainobjis = {
        //         //             err: false,
        //         //             column: "" ,
        //         //             maincat:{
        //         //                 text:"",
        //         //                 value:"",
        //         //                 visib: false,
        //         //             },
        //         //             subcat_filter:[],
        //         //             main_sub_cat: {
        //         //                 text: "",
        //         //                 value:"",
        //         //                 visib:false,
        //         //             }
                            
        //         // }
        //         this.just_columns.push( worksheet[cells[i]].v);
        //         // this.first_col_values.push(this.mainobjis); //Contails all column names
        //     }
        // }
                        // this.main_sub_cat.length
         for(let i=0; i<this.main_sub_cat.length ; i++){

                    // var themain_cat = this.main_parent.filter(e=>{
                    //         if(this.main_sub_cat[i].compare_parent_id == e.value){
                    //             console.log("main_parent ->", e);
                    //             return e
                    //         }
                    // })
                    // console.log("main parent cat ->", this.main_parent );
                    // console.log("filtered main cat =>", themain_cat);
                
                this.main_parent.filter(e=> {

                    if(e.value == this.main_sub_cat[i].compare_parent_id){

                            console.log("e.text ", e.text)

                            console.log("main_sub_cat ->", this.main_sub_cat[i].text)
                        
                          this.mainobjis = {
                            err: false,
                            column: "",
                            maincat:{
                                text: e.text,
                                value: e.value,
                                visib: false,
                            },
                            // subcat_filter:[],
                            main_sub_cat: {
                                text: this.main_sub_cat[i].text,
                                value:  this.main_sub_cat[i].value,
                                visib:false,
                            }        
                        }

                        }

                })
                   
                this.first_col_values.push(this.mainobjis);


         } 

        // ds99

         for(let i=0; i< this.def_set.length; i++){
             
             var final_score_obj = {
                            err: false,
                            column:  "" ,
                            maincat:{
                                text:  this.def_set[i],
                                value:  this.def_set[i],
                                visib: false,
                            },
                            // subcat_filter:[],
                            main_sub_cat: {
                                text: "",
                                value:  "",
                                visib:false,
                            }        
                    }

                    this.first_col_values.push(final_score_obj);
         }

        


        
            
            console.log("after adding visib ->",  this.first_col_values);

       
        //   for(let i=0; i< this.to_restricted.length; i++){
        //         for(let j=0; j< this.first_col_values.length; j++){
        //              if(this.to_restricted[i] == this.first_col_values[j].column){
        //                         this.first_col_values.splice(j, 1);
        //              }
        //         }
        //   }
 

            // var json_object = JSON.stringify(XL_row_object);
            // console.log(excelData);
            // var lines = excelData.split("\n");
            // var result = [];
            // var headers = lines[0].split(",");
            // // console.log('Lines are', lines)
            // for (var i = 1; i < lines.length - 1; i++) {
            //     var obj = {};
            //     var currentline = lines[i].split(",");
            //     for (var j = 0; j < currentline.length; j++) {
            //         obj[headers[j]] = currentline[j];
            //     }
            //     result.push(obj);
            // }
          
            // this.showToast('File Uploaded Successfully', 'success')
            // let Str = JSON.stringify(result)
            // // console.log("Final JSON Result:::::::",Str);
            // //   let StrParse = JSON.parse(Str)
            // this.bulkData = Str
            //   console.log("BULK JSON is ->", this.bulkData);
        },



        Searchdatatable (e) {

            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
            },
            channelfilters(data){

                console.log('incoming channel data',data);
                this.page=1
                this.channeldatafilter = data.value
                this.display_ch =  data.text
                // this.GetRole(this.channeldatafilter)

                this.getting_main_cat(this.channeldatafilter);
            //  this.getting_sub_cat();
            },
            next(e){
                       
                let skipdata = e - 1
                console.log('data',skipdata)
                if(skipdata === 0 ){
                    this.skip = 0
                }else{
                    this.skip = this.skipdiffrence*skipdata
                }
                console.log('skip data',this.skip)
                this.GetRole(this.channeldatafilter,this.skip)
            },

            GetRole(e,skip){
                console.log('e value',e)
                let Filter_Data
                return
                //  Filter_Data ='fetchKPIMaster/sub_category?userId='+this.getAgentInfo()._id+'&skip='+0
               
                 this.GET(Filter_Data,res => {
                     this.getresponse = []
                //    console.log(res.data.errMsg);
                //    res.data.errMsg.forEach(element => {
                //                    element.StatusRole = '';
                //                });
                    this.getresponse = res.data.errMsg[0]

                    console.log('GetResponse kpi main cat', this.getresponse);
                // var getreslen =  res.data.errMsg[0].length;
                // for(let j=0; j<getreslen; j++ ){
                        
                //         if( res.data.errMsg[0][j].channelCode.active == 1){
                //            getroleres.push(res.data.errMsg[0][j]);
                //         }

                // }
                //    console.log("new array is ->",getroleres);
                //    this.getresponse = getroleres

                    // var pageLen = res.data.errMsg[1]
                    // let totalCount = pageLen[0].totalCount
                    // console.log('Page Length:',totalCount)
                    // this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                    // this.pageLength =6
                    // for( var i=0; i <= this.getresponse.length; i++){
                    //     // console.log('active==>',this.branchResponse[i].active)
                    //     let branchDetails =[]
                    //     if(this.getresponse[i].active ==1){
                    //         // console.log('active==>',this.branchResponse[i].active)
                    //         this.getresponse[i].StatusRole = 'Active'
                    //     }else{
                    //         this.getresponse[i].StatusRole = 'InActive'
                    //     }
                    // }

                    // console.log(this.obj)
               }
           );
            },
         selectStatus(){
            this.statusIndex = this.status.indexOf(this.editedItem.statusSelected)
            console.log('select==>',this.statusIndex)
            
        },

         saveAndEditBtn(_btnname){
             if( _btnname == 'Add' ){
                this.save();
            } 
            else if(_btnname == 'Update'){
                this.editRolemstr();
             }
            },

        addrole(){
            this.disrolecode = false;
            this.btnname='Add';
            this.editedItem.rolestatus =0
            this.editedItem.rolename =''
            this.editedItem.rolecode=''
            this.editedItem.channel=this.$store.state.lastchanneselected
            this.dialog=true;
        },
        setchannel(e){
            console.log("channel store",e)
            this.$store.commit('LAST_CHNNEL_DATA',e)
        },

        editItem(item){
                this.disrolecode = true;
                console.log("item",item)
                this.btnname = 'Update';
                this.dialog = true;
                this.editedItem.rolename = item.categoryName
                this.editedItem.rolestatus = item.status
                this.editedItem.parent = item.parentCategory._id

                return
                // this.editedIndex = this.getresponse.indexOf(item)
                console.log('index is ',this.editedIndex)
           
                this.editedItem = Object.assign({}, item)
             
              
         
         },

    editRolemstr(){
        
              
        console.log(' UPDATE fired ');
    
        console.log('role status', this.editedItem.rolestatus + " - "+  this.editedItem.rolename)

        return
        
       // Object.assign(this.getresponse[this.editedIndex], this.editedItem) 
             var self = this;
             this.PUT('updateRole/'+this.editedItem.rolecode,
             {              
                 
                   role_Name: self.editedItem.rolename,
                   role_id: self.editedItem.rolecode,
                   roleCode:self.editedItem.rolecode,
                   active: self.editedItem.rolestatus, 
                   channel_Id:self.editedItem.channel  ,
                    user_Id:self.getAgentInfo()._id
                            

             },res => {
                     if(res.data.errCode === -1){
                   console.log(res.data.errMsg);
                    this.editrole = res.data.errMsg

                   console.log("Response is from server ",res.data.errMsg);
                
                 
                  var len = res.data.errMsg.length
                  console.log("After EDIT",len)
                  this.$store.commit('SET_MASTER_ROLE_DETAILS', this.editrole)
                 this.showToast('Role Updated Succesfully','success')
                  this.dialog = false
                  this.channeldatafilter = 'all'
                  this.GetRole(this.channeldatafilter);
                //   this.vSnackbar('success', 'Data Edited Succesfully')   
                // this.close();                        
                     }else{
                         this.showToast('Something went wrong','success')
                     }
               }
           );

            // if(self.editedItem.rolestatus === 1){
            //     this.actStatus = 'Active'
            // }else{
            //     this.actStatus = "InActive"
            // }

            
            //  const FormData={
            //    roleName:self.editedItem.rolename,
            //    _id : self.editedItem.rolecode,
            //     StatusRole: this.actStatus
            

            //          }
            //           Object.assign(this.getresponse[this.editedIndex], FormData)
          
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


        save() {


        let rleactive;
        // console.log('Index is',this.editedIndex)
        // console.log('Role Status',this.editedItem.rolestatus)
        // console.log('rolecode',this.editedItem.rolecode)
        

        let self = this;
        // if(this.editedItem.rolecode === null || this.editedItem.rolecode === ''  ) {
        //     console.log("From IF checkinng Null or empty")
        //    this.showToast('Please, Add a Role Code to Continue...','error');  
        //    this.dialog = true;  
        //    return
        // }else 

        var formData = {
            categoryName: self.editedItem.rolename ,
            parentCategory: self.editedItem.parent,
            status: self.editedItem.rolestatus,
            userId: this.getAgentInfo()._id
        }
        
        console.log("formdata for post is ->", formData );

        
        if(/^\s+$/g.test(self.editedItem.rolename) || this.$v.$invalid == true ){
            self.showToast('Please fill empty fields', self.TOST().WARNING);
            return
        }else {
                // p99
               this.POST('KPIMasters/sub_category',formData,res => {
                if(res.data.errCode === -1){

                //console.log('POST CHANEL DATA',res.data.errMsg);
                //this.postdata = res.data.errMsg;
                  console.log('post data response',  res.data.errMsg)
                  this.getresponse.push(res.data.errMsg);
                 
                //   this.$store.commit('SET_MASTER_ROLE_DETAILS',this.postdata);
                   // console.log(this.obj)
                //    this.channeldatafilter = 'all'
                //    this.GetRole(this.channeldatafilter);
                   this.showToast('Main KPI Category Created Successfully','success')
                   this.dialog = false
                  }else{
                      this.showToast('Something went wrong','error')
                  }
                   
              }
          );
       
        //   if(this.postdata.active == 1)
        //   {
        //     this.actStatus = 'Active' 
        //   }
        //   else
        //   {
        //    this.actStatus = "Active"
        //   }
        //   const formData={
        //        roleName:this.editedItem.rolename,
        //        _id : this.editedItem.rolecode,
        //        StatusRole: this.actStatus 
           

        //   }

        //     this.getresponse.push(formData)
       

      this.close()

        }
        },
    }
     
    }

</script>
<style>

    .forthediv{
        width: 200px;
        border: 1px #dfe3e6 solid;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 15px;
        border-radius: 65px;
    }

    .nicetyponew{
        text-align:center;
        font-size:14px;
        font-family: roboto;
        font-weight: 500;
    }

    .nicetyponew2{
        margin-bottom: 0px !important;
        text-align:center;
        font-size:13.5px;
        letter-spacing: 0.4px;
        font-family: roboto;
        font-weight: 500;
    }

    .ttlmain{
        font-size:16px;
        font-family: roboto;
        font-weight: 700;
    }

    .bdr{
        border: 1px solid #ebecee;
        padding: 6px 12px;
        border-radius: 55px;
    }

    .yesrow{
        display: flex;
        flex-direction: column !important;
        justify-content: center;
        align-items: center;
    }

    .cleariticon{
        margin:0px !important; 
        margin-bottom:0px !important; 
        margin-left: 8px !important;
        font-size: 20px; font-weight:300; cursor:pointer; 
         transition: all 0.12s ease-in-out;
    }

      .cleariticon:hover{
        margin:0px !important; 
        margin-bottom:0px !important; 
        margin-left: 8px !important;
        font-size: 25px; font-weight:300; cursor:pointer; 
        transition: all 0.12s ease-in-out;
    }

    .center_flex{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
     .center_flex2{
        display:flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .nicetypo{
        margin-top:2px ;
        font-size:16px;
        font-family: roboto;
        font-weight: 300;
        display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0px !important;
    width: 186px;
    }

     .nicetypo2{
        margin-top:2px ;
        font-size:16px;
        font-family: roboto;
        font-weight: 300;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 0px !important;
    
    }

    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }

    .status{
    font-family:roboto; font-weight:500; letter-spacing:0.1px;
    }
    .carditis{
           padding: 15px 10px;
           margin: 15px 0px;
           border:1px solid #e6ecf0;
           border-radius: 6px;
    }

    .centerit{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .centerit_new{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
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
