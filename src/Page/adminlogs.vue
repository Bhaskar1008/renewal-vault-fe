<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
             
            <v-layout row  justify-space-between class="bgclrcamp bgclrsource pt-3 pl-3 pr-3">
                            <v-flex xs10 sm6 md2>
                                 <v-select v-model="selectedmodule" 
                                    :items="themodules"  
                                    label="Select Module"
                                    @change="sendingmodule">
                                 </v-select> 
                            </v-flex>
                        <v-flex xs10 sm6 md3 class="pl-1" >
                            <v-layout row>
                                <v-flex xs10 sm6 md10 class="pr-3">
                                    <v-text-field 
                                    v-model="searchlogs"
                                    label="Search" 
                                    @input="clrapi"
                                    height="30px"></v-text-field>                            
                                </v-flex>
                                <v-btn class="mt-2" medium @click="seek_post" ><v-icon>search</v-icon></v-btn>
                            </v-layout>
                        </v-flex>
             </v-layout>

            <v-layout row wrap >
                <v-flex class=" mt-3" style="flex-flow:column wrap">
                    <!-- <v-text class="headline font-weight-bold">Campaign Master</v-text>
                    <hr> -->
                  <v-layout row justify-center>
                    <v-flex justify-center md11 mt-3 >
                        <h3 class="text-xs-center mb-3">{{selectedmodule == "" ? "All " : selectedmodule}}  Logs |  Showing {{posone}} to {{postwo}}  out of {{thetotalcountis}}</h3>
                        <v-data-table
                        hide-default-footer
                        hide-actions
                        pagination.sync
                        :sort-by="['date', 'timestamp']"
                        :headers="headers"
                        :items="campresponse"
                        class="elevation-1 myheader">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.created_date | formate-date }}</td>
                            <td class="timeis"><p>{{props.item.created_date | timestamp }}</p></td>
                            <td class="">{{props.item.api_endpoint}}</td>  
                            <td class="">{{props.item.module_name == null || props.item.module_name == "" ? "-" : props.item.module_name}}</td>
                            <td> 
                                <!-- <span class="status" :style="{color: props.item.campStatus == 'Active' ? '#13961c' : '#d61111'}" >{{props.item.campStatus}} </span> -->
                                {{props.item.admin_user_Id}} 
                            </td>
                            <td>
                                <!-- <span class="status" :style="{color: props.item.campStatus == 'Active' ? '#13961c' : '#d61111'}" >{{props.item.campStatus}} </span> -->
                                {{props.item.sd_user}} 
                            </td>
                            <td> 
                                <v-chip v-if="props.item.response_json.errCode == -1" > <v-icon left color="green">done</v-icon> Success </v-chip>
                                <v-chip class="pr-3" v-if="props.item.response_json.errCode != -1" > <v-icon left color="red">close</v-icon> Failed </v-chip>
                                <!-- <v-btn outlined > {{props.item.response_json.errCode == "-1" ? "Ok" : "Error"}} </v-btn> </td> -->
                            <td class="logdesc"><p> {{props.item.log_description == "" || props.item.log_description == null ? "-" : props.item.log_description.charAt(0).toUpperCase()+ props.item.log_description.slice(1)  }}</p> </td>
                            <td class="" style="display:flex; justify-content:center; align-items:center; margin:4px"> 
                               
                                    <v-btn small round  @click="sendpayload(props.item.request_json, props.item.response_json,  props.item.olddata )" > <v-icon>swap_vert</v-icon> Check Payload </v-btn>
                                    
                            </td>
                      
                        </template>
                        </v-data-table>
                    </v-flex>
                             
                </v-layout>
                    <v-dialog  v-model="openreqres" persistent max-width="800px" height="500px;" class="dial thepre" style="border-radius: 4px; background-color:red;" >

                    <v-card  style="border-radius:4px;">
                      <v-card class="thepre" style=" z-index: 10; padding:20px; position:fixed; border-radius: 4px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; width: 800px;">  
                          
                        <v-btn flat @click="openreqres = false" style="position:absolute; right:0px; top:0px;" small fab> <v-icon> close </v-icon> </v-btn>
                        <v-layout row justify-center>
                                <v-chip ripple   class="chips mr-2" @click="showreq" v-bind:style="{backgroundColor : coloris }" >
                                        <v-avatar left>
                                                <v-img src="/src/assets/up.png"></v-img>
                                        </v-avatar>
                                            <p class="ptag" style="font-family:roboto; font-size:15px; font-weight:400;">     Request </p>
                                </v-chip>
                                <!-- diffdata -->
                                <v-chip pill  class="chips ml-2"  @click="showres"  v-bind:style="{backgroundColor : coloris2 }" >
                                        <v-avatar left>
                                                <v-img src="/src/assets/down.png"></v-img>
                                        </v-avatar>
                                            <p class="ptag" style="font-family:roboto; font-size:15px; font-weight:400;">    Response </p>
                                </v-chip>
                                 <v-chip v-if="showdiff_chip_card" pill   class="chips ml-2"  @click="showdiff"  v-bind:style="{backgroundColor : coloris3 }" >
                                        <v-avatar left>
                                                <v-img src="/src/assets/refresh.png"></v-img>
                                        </v-avatar>
                                            <p class="ptag" style="font-family:roboto; font-size:15px; font-weight:400;">  Updated fields </p>
                                </v-chip>
                        </v-layout>
                      </v-card>
                        <!-- border-top-right-radius: 0px; border-top-left-radius: 0px -->
                    <v-card class="thepre" style="padding:20px; position:relative; border-radius: 10px;">     
                        
                    <!-- <v-card>
                    </v-card> -->
                     
                    <v-card id="thepre"  v-if="reqcard" style="margin-top: 70px; overflow-wrap: break-word; overflow-x: hidden; padding:10px;" >
                               <pre id="thepre"  > {{JSON.stringify(thereqis, null, '  ')}}
                                </pre>
                    </v-card>
                            <v-card v-if="rescard" style="overflow-wrap: break-word; margin-top: 70px; overflow-x: scroll; padding:10px;">
                                           <pre  cols="100" rows="25" >{{JSON.stringify(theresis,null, '  ')}}
                                </pre>
                            </v-card>
                              <v-card v-if="diffcard" style="overflow-wrap: break-word; margin-top: 70px; overflow-x: scroll; padding:10px;">
                                           <pre  cols="100" rows="25" >{{diffdata}}
                                </pre>
                            </v-card>

                    <!-- <v-card-actions> -->
                        <!-- <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary"  :disabled="disbtn" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn> -->
                    <!-- </v-card-actions> -->
                    </v-card>
                </v-card>
                    </v-dialog> 

                </v-flex>    
            </v-layout> 
            <div class="text-xs-center pagination" >
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                                :total-visible="20"
                              ></v-pagination>
                    </div> 
            </v-card>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 

import moment from 'moment'

import { required, minLength, between } from 'vuelidate/lib/validators'

var index = 0; // used for put api
export default {

      validations: {
     editedItem: {
        campName: {
            required,
            minLength: minLength(2)
                }
        },
    },

    created(){




    // this.getObjectDiff(this.obj1, this.obj2)
    // console.log("this.obj1", this.obj1);
    //  console.log("this.obj2", this.obj2);



        //  this.gettinglogs(0);
        //  this.gettinglogs(1, "Application");
        //  this.gettinglogs(3);
        // this.getmoduleslist();
        this.getAllModule();

         this.getModulesList();

            this.$store.commit('SET_PAGE_TITLE','Admin Activity Logs');
            // this.GetLogs(0);
            let agetdetails = {}
            // agetdetails = this.getAgentInfo()
            // console.log("agentID Check",agetdetails)
          this.uID =  this.getAgentInfo();

        //    var res = JSON.parse(this.thereqis)
           
           console.log("the OBJECT is->", res );

        //   console.log("THe USer ID IS :::=>>>",this.uID);
    },
    mounted(){
        this.headers.map(e =>{
            e.sortable = false;
        })
    },

    data(){
        return{

            diffcard: false,
            diffdata:null,
        showdiff_chip_card: true,
        obj1 :{

  channelCode: {
    channelCode: "CH1",
    channelName: "Test_code",
    created_by: "5b3b4cc28fa96d39870443e3",
    created_date: 1561978403591,
    updated_by: "5b3b4cc28fa96d39870443e8",
    _id: "5d19e62378402c1d059bc54b"
  },
  hierarchyName: "Zonal Manager",
  levelCode: 3,
  active: 1,

},

   obj2 :{

  channelCode: {
    channelCode: "CH1",
    channelName: "Test_code",
    created_by: "5b3b4cc28fa96d39870443e3",
    created_date: 1561978403591,
    updated_by: "5b3b4cc28fa96d39870443e8",
    _id: "5d19e62378402c1d059bc54b"
  },
  hierarchyName: "Zonal Manager",
  levelCode: 3,
  active: 0,

},


            posone:1,
            postwo:15,

            thetotalcountis:0,
            initialpage:1,
            nextsearch:false,
            nextspecific:false,
            //  resbody:"",
            //  reqbody:"",
            searchlogs:"",
            selectedmodule:"",
            themodules:[],
            thereqis:{},
            theresis:{},
            searchdata:false,
            // reqdata:"  ", 
            // resdata:"",
            reqcard:false,
            rescard:false,
            coloris2:"#BBDEFB",
            coloris:"#BBDEFB",
            coloris3:"#BBDEFB",
            activeColor:false ,
            openreqres:false,
            // page:1,
            // skipdiffrence:this.paginationdiff(),
            // skip:0,
            disname:false,
            disbtn:false,
            ccode:false,
            dialog: false,
            visible:false,
            skipdiffrence:this.paginationdiff(),
            btnname:'',
            pagination: {},
            pageLength:0,
            skip:0,
            page:1,
            value:'',
            campresponse:[],
            chanelResponse:[],
            // chnelstatus:[],
            editChanel:{},
            editsourceresponse:{},
            TableIndex:'',
            headers:[
                        {text: 'Date', value: 'date' },
                        {text: 'Timestamp', value: 'timestamp'},
                        {text: 'API Name', value: 'campName'},
                        {text: 'Module Name', value: 'modulename'},
                         {text: 'Admin ID', value: 'admin id'},
                        {text: 'User ID', value: 'campStatus'},
                        {text: 'API Status', value:'apistatus'},
                        {text: 'Log Description', value: 'logdescription'},
                        {text: 'View Payload', value:'payload'},
                        // {text: 'Created Date', value: 'CreatedDate'},
                        // {text: 'Updated By', value: 'UpdatedBy'},
                        // {text: 'Updated Date', value: 'UpdatedDate'},
                        // {text: 'Action', value: 'action', sortable: false}
                ],
            UserID:'',
            tableData: [],
                editedIndex: -1,
                editedItem: {
                campName:'',
                sourceID:'',
                campStatus:'',
                campaignDate:'',
                campcode:'',
               
            },
            defaultItem: {
                campName:'',
                sourceID:'',
                campStatus:'',
                campaignDate:'',
                // branch_name:'',
                // area:'',
                // city_name:'',
                // state_name:'',
                // region_name:'',
                // zone_name:'',
            },
            chnlstatus:['InActive', 'Active'],
            chnlstatusIndex:'',
            editchanneiId:'',
        }
    },
    computed: {
         objmethod() {
        
    	 var self=this;
       return this.campresponse.filter(function(cust){return cust.name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 
        || cust.code.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        || cust.createdBy.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 ||  cust.createdBy.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 || 
         cust.updatedBy.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 ||  cust.updatedBy.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 
          || cust._id.toLowerCase().indexOf(self.value.toLowerCase()) >=0     
         });
       //return this.customers;
    },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'Add New Channel' : 'Edit Channel'
        },

    //      value() {
    //        console.log(this.value);
    //    }
    },

    filters: {

       timestamp(milisecond){
            return moment.utc(milisecond).format('hh:mm:ss A');
       },

       formateDate(milisecond) {
           try {
               return new Date(parseInt(milisecond)).toLocaleDateString()
           } catch(err){
               return milisecond
           }
       },
        filterid(id, initial){
           try{
               if (id == null || id == undefined || id == "") { return id; }
               return initial + id.slice(16, 25).toUpperCase();
           }catch (err) { return id; }
       },
   },

  methods:{
    // getmoduleslist(){
    //      this.gettinglogs(3,0,  data => {
    //           this.themodules = data
              
    //           this.themodules.unshift('All');
    //         //this.sendingmodule();
    //           console.log("themodules list is ->", this.themodules);
    //           this.selectedmodule = "All";
    //           this.searchdata = false
              
    //      })
    // },

    getAllModule(){
        this.nextspecific = false
        // console.log("What;s Skip on created->", this.skip);
         this.gettinglogs(0, this.skip,  data => {
            this.campresponse = data;   
          
             if(this.skip == 0){
                        this.posone = 1
             }else{
                        this.posone = this.skip
             }
                    this.postwo =  this.campresponse.length + this.skip
                    // if(this.)
                    console.log("after CALLBACK",this.pageLength);
                    if(this.pageLength  == e){
                        console.log("POSTWO ->>>",this.campresponse.length);
                        this.postwo =  this.campresponse.length
                    }
                console.log("Current length in table ->", this.campresponse.length);
                if(this.campresponse.length < 15){
                        // alert(this.campresponse.length);
                        this.postwo = this.campresponse.length

                }

         })
    },

    sendingmodule(){
        console.log("ALL IS ->", this.selectedmodule);
        this.nextspecific = true;
        this.next(1);
        // this.gettinglogs(1, this.skip, data => {
        //     this.campresponse = []
        //     this.campresponse = data;
            
        //  })
       

    },
    clrapi(){
        if(this.searchlogs.length === 0){
            // console.log(this.searchdata , "clear Boolean")
            if(this.searchdata === true){
            // console.log("HELLO IM CLEAR")
            // this.getmoduleslist();
            this.getModulesList();
             this.getAllModule();

            }
        }
    },

    gettinglogs(incoming, skip, callback){
        // always globally setting the global search whenever hitting any api of getting logs
        this.nextsearch =  false;
        // console.log("from CREATED");
        //&module_type=Application;
        // for all => getlogsAdmin?userId=5b3b4cc28fa96d39870443e3&filter_user=5b3b4cc28fa96d39870443e3
        // for specific module =>  getlogsAdmin?userId=5b3b4cc28fa96d39870443e3&filter_user=5b3b4cc28fa96d39870443e3&module_type='+this.selectedmodule
        var filter;
        // this.selectedmodule = moduleis   = > pagination skip -> &skip'+skip+'
        // conditionally choosing whether to get all logs or specific logs, or modules drop-down list data
        if(incoming == 0){
            filter = 'getlogsAdmin?userId='+this.getAgentInfo()._id+'&module_type=&skip='+skip
        }else if(incoming == 1){
            var modulename = this.selectedmodule
            if(modulename == "All"){
                modulename = ""
            }
           //  +'&skip='+skip
            filter = 'getlogsAdmin?userId='+this.getAgentInfo()._id+'&module_type='+modulename+'&skip='+skip
        }else{
            filter = 'getlogsAdmin?userId='+this.getAgentInfo()._id+'&module_list=1' 
        }

         this.GET(filter, res =>{
                var errcodeis = res.data.errCode
                console.log("STATUS OK IS->",errcodeis);
                const maindata = res.data.errMsg[0];
                //getting  the global pagination count to be sent to the bottom page and setting Skip for next hit
                 var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].totalCount
                    console.log('Page Length:',totalCount)
                    this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                    this.thetotalcountis  = totalCount
                    // 1 of campresponse.length out of total
                    // console.log("Module->", this.selectedmodule +'__  TOTAL COUNT is'+  this.thetotalcountis )

            if(errcodeis == -1){
                //callback will send data as per condition satisfatied to whover has called it
                console.log("reached response ?", maindata);
                callback(maindata);
            }else{
                 this.campresponse = []
                 this.showToast("Something went wrong", this.TOST().WARNING);
            }
         })

    },

    seek_post(skip){
 
         var seek_URL = 'getlogsAdmin?userId='+this.getAgentInfo()._id+'&search_text='+this.searchlogs+'&skip='+this.skip
            this.GET(seek_URL, res => {
                 this.nextsearch = true;

                 var pageLen = res.data.errMsg[1]
                 let totalCount = pageLen[0].totalCount
                 console.log('Page Length -> Search =>:',totalCount)
                
                 this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                 this.thetotalcountis  = totalCount
                 
                 this.campresponse = []
                 this.campresponse = res.data.errMsg[0] 
                 this.searchdata = true

                  if(this.skip == 0){
                        this.posone = 1
                  }else{
                        this.posone = this.skip
                  }
                  console.log("Current length in table ->", this.campresponse.length);
                  this.postwo = this.campresponse.length + this.skip
                    // if(this.)
                    console.log(this.pageLength);
                  if(this.pageLength  == e){
                        this.postwo = this.thetotalcountis
                  }

                  if(this.campresponse.length < 15){
                        // alert(this.campresponse.length);
                        this.postwo = this.campresponse.length
                  }

                 //console.log("search results->",this.campresponse);
         })

    },
   
    getModulesList(){

          this.GET('getlogsAdmin?userId='+this.getAgentInfo()._id+'&filter_user='+this.getAgentInfo()._id+'&module_list='+1, res => {   
              
            //   console.log("response for modules is", res.data.errMsg);
              this.themodules = res.data.errMsg;
                this.themodules.unshift('All');
            //this.sendingmodule();
            //   console.log("themodules list is ->", this.themodules);
              this.selectedmodule = this.themodules[0];
              this.searchdata = false

          })

    },



getObjectDiff(obj1, obj2, cb) {

  var final_single_obj = {}
  const diff = Object.keys(obj1).reduce((result, key) => {

    if (!obj2.hasOwnProperty(key)) {
      result.push(key);
      console.log("result after push ->", result);
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));

  console.log("Diff is->", diff);
  var farr = []
  var sarr = []
  var tarr = []
  var foarr = []
  var thekeyis = []
  var singleobj = {}
  var singleOLD_obj = {}

  var op = {}
  var newop = {}
  var p
  for (p in obj2) {

    for (let i = 0; i < diff.length; i++) {
      if (p == diff[i]) {
        op[diff[i]] = obj2[p]

        Object.size = function(obj) {
          var size = 0,
            key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        };
        // getting the size of an object
        // console.log('obj p ->', obj2[p])
        var datais
        var size = Object.size(obj2[p]);
        datais = typeof obj2[p]

        if (datais === null || datais === undefined) {
          console.log("before conv to string data is->", datais)
          datais = "string"
        }
        if (datais === 'string') {
          size = 0
        }

        /*  return */
        console.log('SIZE is ->', size);
        if (size > 0) {
          sarr.push(obj2[p]);
          farr.push(obj1[diff[i]]);
          thekeyis.push(diff[i]);
          console.log('Og diff is->', diff[i]);
          console.log("KEYIS->", thekeyis);
          console.log('sarr->', sarr);
          console.log('farr->', farr)

        } else {
          tarr.push(obj2[p])
          foarr.push([diff[i]])
          console.log('tarr->', tarr);
          console.log('foarr->', ...foarr);
          var tlen = tarr.length;

          for (let i = 0; i < tlen; i++) {
            singleobj[foarr[i]] = tarr[i]
            singleOLD_obj[foarr[i]] = obj1[foarr[i]]
          }

          final_single_obj = singleobj
          /*  obj1[foarr[i]] */
          /*   console.log("final old obj ->",singleOLD_obj ); */
          console.log("final old obj ->", singleOLD_obj);
          console.log("Final New Single_obj is ->", singleobj);

        }
      }
    }
  }
  var final_obj = {}
  var oppnew = {}
  var f_res = []
  var for_new_diff = []
  for (let j = 0; j < farr.length; j++) {

    var fobj = farr[j]
    var sobj = sarr[j]

    console.log("farr->", farr[j]);
    console.log("sarr->", sarr[j]);

    /* return */

    /* function getSecondObjectDiff(fobj, sobj) { */
    console.log('calling the founction', j + 1);
    const newdiff = Object.keys(fobj).reduce((r, k) => {

      if (!sobj.hasOwnProperty(k)) {
        r.push(k);
        /* console.log("result after push from 2nd ->", r) */
      } else if (_.isEqual(fobj[k], sobj[k])) {
        const theresultKeyIndex = r.indexOf(k);
        r.splice(theresultKeyIndex, 1);
      }
      return r;
    }, Object.keys(sobj));
    for_new_diff = []
    for_new_diff.push(...newdiff)
    console.log('newdiff ->', for_new_diff)
    f_res = []
    for (let i = 0; i < for_new_diff.length; i++) {
      /* console.log('What we need', [newdiff[i]]) */
      f_res.push(oppnew[thekeyis[j]] = {
        /* f_res.push([newdiff[i]])*/
        [for_new_diff[i]]: obj2[thekeyis[j]][
          [for_new_diff[i]]
        ]
      })
      /*   var deepobj = {}
        for(let i=0; i< f_res.length; i++){
              var urdata = {}
               urdata = Object.assign(f_res[i])
               console.log('urdata',urdata);
              oppnew[diff[j]] =  urdata 
        } */
      /* console.log("nested Old objected ->", obj1[thekeyis[j]]) */
      ;
      oppnew[thekeyis[j]] = {
        ...f_res
      }
    }
    /* console.log("nested Old objected ->", obj2[thekeyis[j]]) */
    //  console.log("NEW OBJ is->",oppnew);
    //  console.log('and our single object ->', singleobj);

    final_obj = {
      ...oppnew,
      ...singleobj
    }
    console.log("FINAL RESULT FOR LOGGER->", final_obj);
    //  callback for the final result that will be stored in diff obj data
    /* 	   
    	           if(oppnew == null){
    	                       alert("oppnew is null")
    	                        final_obj  = {...singleobj }
    	            }else{
    	              alert("oppnew is NOT null")
    	                       final_obj  = {...oppnew, ...singleobj}
    	            } */
    /*  }  */
    /*   getSecondObjectDiff(fobj, sobj) */
  }


  /* if(thekeyis.length > 0){  
      for(let i=0; i< for_new_diff.length ; i++ ){
       final_obj[final_obj] =
           console.log("from loop->",final_obj[thekeyis][i]); 
          final_obj[thekeyis] = final_obj[thekeyis][i]
      }   
    }*/
  console.log("SINGLE OBJ", oppnew);
  if (Object.keys(oppnew).length === 0) {
    // alert("Oppnew is null");
    final_obj = final_single_obj
  }
  console.log("FINAL OBJ is ->", final_obj)
  
  cb(final_obj)

  return diff;



},

// let obj1 = {

//   channelCode: {
//     channelCode: "CH1",
//     channelName: "Test_code",
//     created_by: "5b3b4cc28fa96d39870443e3",
//     created_date: 1561978403591,
//     updated_by: "5b3b4cc28fa96d39870443e8",
//     _id: "5d19e62378402c1d059bc54b"
//   },
//   hierarchyName: "Zonal Manager",
//   levelCode: 3,
//   active: 1,

// }


/*  {
    status: "Active",
    benefitIllustration: "1982198219.pdf",
    a: 1,
    c: { foo: 1, bar: 2, cat:'bark'},
    d: { baz: 0, bat: 2, cat:'meow' },
    e: [{line1:"mh1"},],
    update_by: 'admin khan',
    created_by: 'admin khan',
    b: 2,
    proposal_count: [ {count: 30, id: "login"}, { id: "proposalstarted", count: 0,}],
} */

// let obj2 = {

//   channelCode: {
//     channelCode: "CH1",
//     channelName: "Test_code",
//     created_by: "5b3b4cc28fa96d39870443e3",
//     created_date: 1561978403591,
//     updated_by: "5b3b4cc28fa96d39870443e8090",
//     _id: "5d19e62378402c1d059bc54b"
//   },
//   hierarchyName: "General Manager",
//   levelCode: 4,
//   active: 0,


// }

/* {
    leads: [    ],
    status: "Active",
    benefitIllustration: "1982198219.pdf",
    proposal_count: [ {count: 30, id: "proposalstarted"}, { id: "proposalstarted", count: 12,}],
    b: 2,
    a: 1,
    c: { foo: 1, bar: 2, cat:'bark'},
    d: { baz: 0, bat: 2, cat:'meow' },
    e: [{line1:"mh1"},],
    update_by: 'admin khan',
    created_by: 'admin khan',
} */

// getObjectDiff(obj1, obj2)














    
    sendpayload(reqdata, resdata, olddata){

        console.log("olddata ->", olddata)

        // return
        if(olddata == undefined || olddata == null){
            //   alert("olddata found undefined");
               this.showdiff_chip_card = false
        }else{
                // alert("olddata  present");
               this.showdiff_chip_card = true
        }

            this.openreqres = true;
            console.log("req ->", reqdata + " res->  "+resdata.errMsg );
            if(resdata.errCode != -1){
                this.theresis =  resdata.errMsg
            }else{
                
                  this.theresis = resdata.errMsg;
            }
            var dashis = '-'
            this.thereqis = reqdata == undefined || reqdata == null ? dashis : reqdata ;
         console.log("response data before ops->", resdata.errMsg);
            if(resdata.errMsg.length > 0 ){
                    for(let i=0; i<resdata.errMsg.length ; i++){
                        resdata.errMsg = resdata.errMsg[i]
                    }
            }
           
            this.getObjectDiff(olddata, resdata.errMsg, data =>{  
                    this.diffdata = data
                    console.log("resultant diff is -=>",  this.diffdata );

            })

    },
   
    showreq(){
          
          this.coloris ="#64B5F6"
          this.coloris2 ="#BBDEFB"
            this.coloris3 ="#BBDEFB"
          this.reqcard = true
          this.rescard = false
          this.diffcard = false
    },

    showres(){
          this.coloris ="#BBDEFB"
          this.coloris2 ="#64B5F6"
            this.coloris3 ="#BBDEFB"
          this.reqcard =false
          this.diffcard = false
          this.rescard =true
    },

     showdiff(){
          this.coloris ="#BBDEFB" 
          this.coloris2 ="#BBDEFB"
          this.coloris3 ="#64B5F6"
          this.reqcard =false
          this.rescard =false
          this.diffcard = true
    },

    next(e){
        //console.log("SELECTED MODULE is ->", this.selectedmodule); 
        this.initialpage = 1
                console.log("E is ->", e);
                let skipdata = e - 1
                console.log('data',skipdata)
                if(skipdata === 0 ){
                    this.skip = 0
                }else{
                    this.skip = this.skipdiffrence*skipdata
                }
                // console.log('skip data',this.skip)
           
                

            if(this.nextspecific){
                // this.sendingmodule();
                    this.gettinglogs(1, this.skip, data => {
                    this.campresponse = []
                    this.campresponse = data;

                    if(this.skip == 0){
                        this.posone = 1
                    }else{
                        this.posone = this.skip
                    }
                    console.log("Current length in table ->", this.campresponse.length);
                    this.postwo = this.campresponse.length + this.skip
                    // if(this.)
                    console.log(this.pageLength);
                    if(this.pageLength  == e){
                        this.postwo = this.thetotalcountis
                    }

                    if(this.campresponse.length < 15){
                        // alert(this.campresponse.length);
                        this.postwo = this.campresponse.length

                    }

                    })
            }else if(this.nextsearch){
                this.seek_post(this.skip);
            }else{
                console.log("FROM ELSE");
                this.getAllModule();
            }

           
            // if(this.skip == 0){
            //      this.posone = 1
            // }else{
            //      this.posone = this.skip
            // }
            // console.log("Current length in table ->", this.campresponse.length);
            // this.postwo = 15 + this.skip
            // // if(this.)
            // console.log(this.pageLength);
            // if(this.pageLength  == e){
            //      this.postwo = this.thetotalcountis
            // }

            // if(this.campresponse.length < 15){
            //     alert(this.campresponse.length);
            //     this.postwo = this.campresponse.length

            // }



        //     console.log("FROM NEXT");
        // if(this.nextspecific == false){

        //       if(this.initialpage == 1){
        //         this.initialpage = this.campresponse.length 
        //            console.log("1st");
        //     }else if(this.initialpage == 0){
        //         this.initialpage = 1
        //           console.log("2nd");
        //     }else{
        //         this.initialpage = this.skip
        //           console.log("3rd");
        //     }
            
        // }
          
        // console.log("init->", this.initialpage)
                
                // this.Getchannel(this.skip)
    },



        checklength(){
                if(this.editedItem.campName.length > 15){
                    this.showToast('Character limit is only 15', this.TOST().WARNING);
                    console.log("greater than 15 ",this.editedItem.campName.length);
                    return
                }
               
        },
        // next(e){
                
        //         let skipdata = e - 1
        //         console.log('data',skipdata)
        //         if(skipdata === 0 ){
        //             this.skip = 0
        //         }else{
        //             this.skip = this.skipdiffrence*skipdata
        //         }
        //         console.log('skip data',this.skip)
        //         this.GetLogs(this.skip)
        //     },
      
        Searchdatatable (e) {

            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
            },

        //     fetchById(id, rootIndex) {
        //     // console.log('Fetch By Id : ', rootIndex);
        //     let self = this;
        //     this.showLoader(true);
        //     this.GET('http://172.16.63.13:5010/secure/admin/getlogsAdmin?userId=5b3b4cc28fa96d39870443e3', function(res, error) {

        //         if (error) {
        //             self.showLoader(false);
        //             self.showToast('Something goes wrong', self.TOST().ERROR);
        //             console.log('Error ', error);
        //             return;
        //         }
        //         // When database fails
        //         if (res.data.errCode == 4) {
        //             self.showLoader(false);
        //             self.showToast('Database Error', self.TOST().ERROR);
        //             return;
        //         }
        //         let temp =  self.chanelResponse.splice(0, self.chanelResponse.length);

        //         self.chanelResponse = [];
        //         if (res.data.errCode == -1) {

        //             res.data.errMsg.forEach((e, index, array) => {
        //                 temp[rootIndex] = self.mapNewFields(e, rootIndex);
        //             });
        //             // console.log('Temporray Value : ' , temp);
        //             self.chanelResponse = temp.splice(0, temp.length);
        //         } else {
        //             self.showToast('Data not found', self.TOST().INFO);
        //         }

        //         self.showLoader(false);
        //     });
        // },

        mapNewFields(e, index) {
                  console.log("New fields for mapping are::=>", e)
            try {
                return {
                    index,
                    _id: e._id,
                    // created_by: e.created_by,
                    // updated_by: e.updated_by,
                    // channelName: e.channelCode.channelName,
                    status: e.status === 1 ? "Active" : "Inactive",
                    // created_by_name: e.created_by.first_name+' '+e.created_by.last_name,
                    // created_date: e.created_date,
                    // updated_by_name: e.updated_by.first_name+' '+e.updated_by.last_name,
                    // updated_date: e.updated_date
                }
            } catch(err) {
                console.log("An error has occured in ")
            }
        },
                    // http://172.16.63.13:5010/secure/admin/getlogsAdmin?userId=5b3b4cc28fa96d39870443e3 &module_type=Application

        GetLogs(filter){

         console.log("getLOGS->", filter);

          this.GET('getlogsAdmin?userId='+this.getAgentInfo()._id+'&filter_user='+this.getAgentInfo()._id+'&module_list='+filter, res => {      
            
                //    console.log('GET CHANEL DATA',res.data.errMsg);
                    // this.chanelResponse = res.data.errMsg
                    // console.log('CHANEL REPONSE',this.chanelResponse)
                    
                    // res.data.errMsg[0].forEach( element => {
                    //     element.campStatus = '';
                    // });
                    // this.campresponse = []
                    this.campresponse = res.data.errMsg
                    console.log('Source REPONSE',this.campresponse)

                        // var pageLen = res.data.errMsg[1]
                        // let totalCount = pageLen[0].totalCount
                        // console.log('Page Length:',totalCount)
                        // this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                        // if(this.pageLength >1){
                        // this.visible = true
                        //     }else{
                        //         this.visible =false
                        //     }
                  
               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
            },
        //  selectchStatus(){
        //     this.chnlstatusIndex = this.chnlstatus.indexOf(this.editedItem.channelStatus)
        //     console.log('select==>',this.chnlstatusIndex)
            
        // },
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
             this.disbtn = false;
            this.disname = false;
            this.ccode = false;
            this.btnname = 'Add';
            this.editedItem.campName = '';
             this.editedItem.campaignDate =''
            if(this.chanelResponse.length === 0){
                this.editedItem.channelCode  ='CH1'
            }else{
            let chanel = this.chanelResponse[0].channelCode
            // console.log('channe;',chanel)
            let constsplitchannel = chanel.split('CH')
            // console.log("Chnel code",(constsplitchannel[1]) )
            let intchnnal = parseInt(constsplitchannel[1])
            this.editedItem.channelCode  ='CH'+(intchnnal+1)
            }
            // this.editedItem.channelCode = '';
            this.editedItem.channelStatus = 'InActive';
            this.dialog = true;
        },


        editItem (item,i) {
             this.disname = true;
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            // _index = i;
            this.btnname = 'Update' 
            this.ccode=true;
            this.dialog = true;
            var itemssource = item;
            console.log("new item is",itemssource)
            this.editedItem.campcode = itemssource.code;
            this.editedItem.campName = itemssource.name;
            this.editedItem.sourceID = itemssource._id;
            this.editedItem.campStatus = itemssource.status === 1 ? this.chnlstatus[1] : this.chnlstatus[0];        
        },

        editChanl(item){  
                 
            // console.log('CHANNEL CODE',this.editedItem.channelStatus)
            let status = null
            if(this.editedItem.campStatus === 'Active'){
                status = 1
            }else if(this.editedItem.campStatus === 'InActive'){
                status = 0
            }
            console.log('Before PUT',  this.editedItem.campName);
            //  axios.put(this. API_Service_admin() + 'update_campaign',
            //  {              
            //         campName: this.editedItem.campName,
            //         id: this.editedItem.sourceID, 
            //         status: status,                   
            //         userId: this.getAgentInfo()._id,
            //         code: this.editedItem.campcode,

                        
            //  }).then(
                //  res => {
                    this.PUT('update_campaign', {              
                    campName: this.editedItem.campName,
                    id: this.editedItem.sourceID, 
                    status: status,                   
                    userId: this.getAgentInfo()._id,
                    code: this.editedItem.campcode,

                        
                     } , (res , error) => {                                        
                     if(res.data.errCode === -1){
                   console.log('PUT DATABASE RESPONSE',res.data.errMsg);
                    this.editsourceresponse = res.data.errMsg

                //    console.log("Response is from server ",res.data.errMsg);
                 
                  var len = res.data.errMsg.length
                  console.log("After EDIT",len)
                // this.$store.commit('SET_AFFILIATE_DETAILS',this.editsourceresponse);
                //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})  
                this.showToast('Your Campaign Updated Successfully','success')
                // this.fetchById(); 
                this.GetLogs(0);
                    this.dialog = false

                     }else if(res.data.errCode === 428){
                          this.showToast('Campaign code data is mandatory','error')
                     }else{
                        this.showToast('Something went wrong','error')
                     }
               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
            // if(this.editChanel.active === 1){
            //         this.channelStatus = 'Active'
            //     }else{
            //          this.channelStatus = 'Inactive'
            //     }

            //      const FormData={
            //         channelName:this.editedItem.chanelName,
            //         _id:this.editedItem.channelCode,
            //          channelStatus:this.editedItem.channelStatus,

            //          }
            //           Object.assign(this.chanelResponse[this.TableIndex], FormData)
          this.disbtn = false;

        },

       

        deleteItem(index) {
        // const index = this.tableData.indexOf(item)
        // this.cfrDataObj.splice(index, 1);
        // confirm('Are you sure you want to delete this item?') && 
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
             this.disbtn = true;
             let self = this;
             // this condition will check for blank spaces only, anything after blank space is valid
            if(/^\s+$/g.test(self.editedItem.campName)){
                        self.showToast('Campaign Name should not be empty', self.TOST().WARNING);
                        this.disbtn = false;
                        return
            }
            else if(self.$v.$invalid == true){
                      self.showToast('Campaign Name should not be empty', self.TOST().WARNING);
                     this.disbtn = false;
            }
            else{
               
                // Post API hit
                // console.log('CHANEL NAME',this.editedItem.channelName),
                console.log('Active InActive ::: ',this.editedItem.campStatus);
                let code = null;
                if(this.editedItem.campStatus === "InActive") {
                    code = 0;
                } else if(this.editedItem.campStatus === "Active") {
                    code = 1;
                }
                let sendData = {
                    campaignName: self.editedItem.campName,
                    userId: this.getAgentInfo()._id ,
                    status: code,
                }

                console.log('POP sending data: ', sendData);
               
            //   axios.post(this. API_Service_admin() + 'create_campaign',sendData).then(
            //         res => {

                        this.POST('create_campaign',sendData, (res , error) => {                            

                        //    console.log('POST CHANEL DATA',res.data.errMsg);
                        if(res.data.errCode === -1){
                            self.editsourceresponse = res.data.errMsg[0];
                            console.log('Response Data',self.editsourceresponse)
                            self.$store.commit('SET_AFFILIATE_DETAILS',self.editsourceresponse);
                            // self.updateChnl();
                            self.dialog = false    ;
                            
                                // if(self.editChanel.active === 1){
                                //     self.channelStatus = 'Active'
                                // }else{a
                                //     self.channelStatus = 'Inactive'
                                // }
                                // const formData={
                                // channelName :self.editedItem.chanelName,
                                // channel_code: self.editedItem.channelCode,
                                // _id: self.editedItem.channelCode,
                                // channelStatus:self.channelStatus,
                                
                                // }
                                // self.chanelResponse.push(formData)
                                this.showToast('Campaign created Successfully','success');
                                this.GetLogs(0);
                                this.disbtn = false;
                        }else{
                           this.disbtn = false;
                           this.showToast('Mandatory fields not found','error');
                        }
                            
                    }
                ).catch(
                    err => {
                        console.log(err) ;
                    }
                );

        }
                // this.close()

               
                },

                // updateChnl(){
                //     let self = this;
                //     self.chanelResponse = self.$store.state.chanelDetails;
                //     console.log('CHNEL RESPONSE',self.chanelResponse)
                // },
     
    }
}
</script>
<style>

.myheader > th{
    border:1px red solid;
}

.timeis{
    display: flex;
    width: 128px;
}

.logdesc > p{
    margin-bottom:0px;
    width: 250px;
    text-align: center;
    letter-spacing: 0.3px;
}

#thepre::-webkit-scrollbar-track {
  border-radius: 10px;
  background: rgba(0,0,0,0.1);
  border: 1px solid #ccc;
}

#thepre::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: linear-gradient(left, #fff, #e4e4e4);
  border: 1px solid #aaa;
}

#thepre::-webkit-scrollbar-thumb:hover {
  background: #fff;
}

#thepre::-webkit-scrollbar-thumb:active {
  background: linear-gradient(left, #22ADD4, #1E98BA);
}






 .dial{
     border-radius: 20px !important ;
 }

 

 .chips{
     background-color: #BBDEFB;
     box-shadow:0 2px 3px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.15);
     cursor: pointer;
     display: flex;
     justify-content: center;
     align-items: center;
     text-align: center;
     margin-bottom:0px;
     cursor: pointer;
 }
 .ptag{
     margin-bottom:0px;
     cursor: pointer;
 }

 /* .chips{
       background-color: #b3e5fc;
     box-shadow:0 2px 3px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.15);
      cursor: pointer;
 } */

 /* the line below will make view payload to align center */
 .v-datatable thead th.column.sortable:last-child {
     /* border:2px green dashed; */
     text-align: center !important;
 }

 .status{
    font-family:roboto; font-weight:500; letter-spacing:0.1px;
 }

.bgclrsource{
    background-color: #fafafa;
}
.bgclrcamp{
    background-color: #FAFAFA;
}

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
          .pagination{
            margin-top: 20px;
            }
      }
</style>
