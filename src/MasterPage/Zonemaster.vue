<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
            <v-layout row wrap >
                 <v-card flat style="background-color:#FAFAFA; width:100%;" > 
                   <v-layout class="mr-3 ml-3 pt-4" >  
                    <v-flex xs10 sm6 md2 class=" mt-1 mr-4" >
                            <v-select v-model="channeldatafilter" 
                                    :items="channeldataall"  
                                    item-text="text" 
                                    item-value="value" 
                                    label="Channel"
                                    @change="channelfilters">
                            </v-select>                            
                    </v-flex>
                    <v-flex></v-flex>

                    <v-btn  depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addChannel()">
                                    add Zone
                            <v-icon dark right>add_circle</v-icon>
                    </v-btn>

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
                    <!-- <v-text class=" headline font-weight-bold">Zone Master</v-text>
                    <hr> -->
                </v-layout>      
                </v-card>
                <v-flex class="ml-3 mr-3 mt-3" style="flex-flow:column wrap; width:97%">   
                    <!-- <v-layout row  justify-space-between class="mr-5 mt-3"></v-layout>  -->
                    <v-layout row justify-center>
               
                    <v-flex justify-center md11 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">Zone Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="objmethod"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item.zoneName}}</td>
                            <td class="">{{props.item.channelCode.channelName}}</td>
                            <td class=""> <span class="status" :style="{color: props.item.channelStatus == 'Active' ? '#13961c' : '#d61111'}"> {{props.item.channelStatus}} </span></td>

                            <!-- <td class="">{{props.item.channelCode.channelName}}</td> -->
                           
                            <td class="">
                                <v-icon small class="mr-2" @click="editItem(props.item,props.index)">edit</v-icon>
                                <!-- <v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon> -->
                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>
                             
                </v-layout>

                    <v-dialog v-model="dialog" persistent max-width="800px">
                             
                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                    <v-card-text>
                            <form @submit.prevent="saveAndEditBtn(btnname)">
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.channelCode" :items="channeldata" @change="setchannel" item-text="text" item-value="value" label="Channel Name" ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.chanelName" label="Zone Name"
                                  @change="zone_validate(editedItem.chanelName, 5, 'chanelName')"
                                  @input="$v.editedItem.chanelName.$touch()"
                                  @blur="$v.editedItem.chanelName.$touch()"
                                 :error-messages="nameErrors"
                                ></v-text-field>
                            </v-flex>
                            <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.channelCode" label="Channel Code"></v-text-field>
                            </v-flex> -->
                             
                            <v-flex xs12 sm6 md6>
                                <v-select @change="selectchStatus()" v-model="editedItem.channelStatus" :items="chnlstatus" item-text="text" item-value="value" label="Status"
                                   @input="$v.editedItem.channelStatus.$touch()"
                                @blur="$v.editedItem.channelStatus.$touch()"
                                 :error-messages="statusErrors"
                                 ></v-select>                                
                            </v-flex>
                  
                            
                            </v-layout>
                        </v-container>
                            </form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn :disabled="disaddzone"  depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                    </v-dialog> 

                         <div class="text-xs-center pagination">
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination>
                    </div>   

                </v-flex>    
            </v-layout> 
            </v-card>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 
import { required, minLength, between,email } from 'vuelidate/lib/validators'
import loadChannel from '../common/onProjectLoad.js' 
var index = 0; // used for put api
export default {

    created(){
             this.$store.commit('SET_PAGE_TITLE','Zone Master');
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
                    let alldata={
                                text:'All',
                                value:'all',
                            }
                        
                        this.channeldataall.unshift(alldata)
                })

         this.channeldatafilter ='all'
         this.getZoneResp(this.channeldatafilter);
       
    },

    // mounted(){
    //     this.getzonepage(this.pagetab)
    // },


           validations: {
     editedItem: {
        chanelName: {
        required,
      },
      channelStatus:{
          required,
      },
}
},
 mounted(){
        this.headers.map(e =>{
                    e.sortable = false;
        })
    },

    data(){
        return{
            disaddzone:false, 
            page:1,
            skip:0,
            skipdiffrence:this.paginationdiff(),
            channeldatafilter:'all',
            zonepagedata:[],
            value:'',
            roleStore:[],
            roleData:[],
            Zchanneldata:[],
            zoneStore:[],
            zoneData:[],
            channeldataall:[],
            ChannelFilter:'all',
            dialog: false,
            btnname:'',
            user_id:'',
            chanelResponse:[],
            // chnelstatus:[],
            editChanel:{},
            TableIndex:'',
            channeldata:[],
            headers:[
                        {text: 'Zone Name', value: 'chanelName'},
                        {text: 'Channel Name', value: 'channelCode'},
                        {text: 'Zone Status', value: 'channelStatus'},
                        // {text: 'Branch Name', value: 'branch_name'},
                        // {text: 'Area', value: 'area'},
                        // {text: 'City Name', value: 'city_name'},
                        // {text: 'State Name', value: 'state_name'},
                        // {text: 'Region Name', value: 'region_name'},
                        // {text: 'Zone Name', value: 'zone_name'},
                        // {text: 'Channel Name', value: 'channelName'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
            tableData: [],
                editedIndex: -1,
                editedItem: {
                        chanelName:'',
                        channelCode:'',
                        channelStatus:'',
                        channelName:'',
                        // branch_name:'',
                        // area:'',
                        // city_name:'',
                        // state_name:'',
                        // region_name:'',
                        // zone_name:'',
            },
            defaultItem: {
                        chanelName:'',
                        channelCode:'',
                        channelStatus:'',
                        channelName:'',
                        // branch_name:'',
                        // area:'',
                        // city_name:'',
                        // state_name:'',
                        // region_name:'',
                        // zone_name:'',
            },
            chnlstatus:[{text:'InActive',value:0},{text: 'Active',value:1}],
            chnlstatusIndex:''
                
        }
    },
    computed: {
        objmethod() {
        
       
    	 var self=this;
       return this.chanelResponse.filter(function(cust){return cust.zoneName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
       || cust.channelCode.channelName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        
        
         });
       //return this.customers;
    },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'Add Zone' : 'Edit Zone'
        },

         value() {
           console.log(this.value);
       },
                   nameErrors () {
      const errors = []
      if (!this.$v.editedItem.chanelName.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.chanelName.required && errors.push('Zone Name is required.')
      return errors
    },
        statusErrors () {
      const errors = []
      if (!this.$v.editedItem.channelStatus.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.channelStatus.required && errors.push('Status is required.')
      return errors
    },
    },
    methods:{

        zone_validate(data, type, field){

                var self = this                
                this.validate_alpha_numeric(data, type, (res, datanew)=>{
                if(res == true){ 
                    self.editedItem[field] = datanew
                    self.$forceUpdate();
                    return
                }
                })

        },



        setchannel(e){
            console.log("channel store",e)
            this.$store.commit('LAST_CHNNEL_DATA',e)
        },

        Searchdatatable (e) {

            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
            },
        
         channelfilters(e){
                console.log('data',e)
                this.page=1
                this.channeldatafilter = e
                this.getZoneResp(this.channeldatafilter)
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
                this.getZoneResp(this.channeldatafilter,this.skip)
            },

         selectchStatus(){
            this.chnlstatusIndex = this.chnlstatus.indexOf(this.editedItem.channelStatus)
            console.log('select==>',this.chnlstatusIndex)
            
        },

        getZoneResp(e,skip){
             this.user_id = this.$store.state.agentDetails._id
             let Filter_Data
                if(e === 'all'){
                    Filter_Data = 'getzone?userId='+this.getAgentInfo()._id+'&skip='+skip + '&filt=4'
                }else{
                    Filter_Data ='getzone?userId='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip +'&filt=4'
                }
            this.GET(Filter_Data,res => {
               
                    console.log('GET CHANEL DATA', res.data.errMsg );
                    res.data.errMsg.forEach( element => {
                        element.channelStatus = '';
                    });

                    this.chanelResponse = res.data.errMsg[0]
                    console.log('CHANEL REPONSE',this.chanelResponse)
                    var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].totalCount
                    console.log('Page Length:',totalCount)
                    this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                    
                    for( var i=0; i < this.chanelResponse.length; i++){
                        if(this.chanelResponse[i].active === 1){
                            this.chanelResponse[i].channelStatus = 'Active'
                        }else{
                            this.chanelResponse[i].channelStatus = 'InActive'
                           
                        }
                    }
               
               }
           );
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
            this.disaddzone = false;
            this.btnname = 'Add';
            this.editedItem.chanelName = '';
            this.editedItem.channelCode = this.$store.state.lastchanneselected;
            this.editedItem.channelStatus = 0;
            this.dialog = true;

            
        },


        editItem (item,i) {
            this.disaddzone = false;
             console.log("Data is",item)
            console.log("Index is",i)
            this.TableIndex = i
            // _index = i;
            this.btnname = 'Update' 
               
            this.dialog = true
            var itemsChanel = item;
            console.log("new item is",itemsChanel)
            this.editedItem.chanelName = itemsChanel.zoneName;
            this.editedItem.channelCode = itemsChanel.channelCode._id
             this.editedItem.chanelsid = itemsChanel._id
            this.editedItem.channelStatus = itemsChanel.active;

            this.editedItem.channelName = itemsChanel.channelCode._id  
        
        },

        editChanl(item){
                            this.$v.$touch()
               console.log(this.$v)  
          if (this.$v.$invalid == true) {
              console.log("Form has errors")  
      }
      else{
            
            console.log('CHANNEL CODE',this.editedItem.chanelName)
            console.log('CHANNEL CODE',this.editedItem.channelCode)
            console.log('CHANNEL CODE',this.chnlstatusIndex)
            console.log('CHANNEL CODE',this.user_id)
            // let statuscode = ''
            // console.log("channel status",this.editedItem.channelStatus)
            // if(this.editedItem.channelStatus === 'Active'){
                
            //     statuscode:1;
            // }else if(this.editedItem.channelStatus === 'InActive'){
            //     statuscode:0;
            // }
             this.PUT('updatezoneMaster/'+this.editedItem.chanelsid,
             {              
                    zoneName: this.editedItem.chanelName,
                    channel_Id: this.editedItem.channelCode, 
                    active:this.editedItem.channelStatus,                   
                    user_Id: this.user_id

             },res => {
                     if(res.data.errCode === -1){
                   console.log('DATABASE RESPONSE',res.data.errMsg);
                    this.editChanel = res.data.errMsg

                //    console.log("Response is from server ",res.data.errMsg);
                 
                  var len = res.data.errMsg.length
                  console.log("After EDIT",len)
                    // this.$store.commit('SET_CHANEL_DETAILS',this.editChanel);
                //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})   
                // this.close();                        
                    this.dialog = false
                    this.showToast('Zone Updated successfully','success')
                    this.channeldatafilter ='all'
                    this.getZoneResp(this.channeldatafilter);
                     }else{
                         this.showToast('Something went wrong','error')
                     }
               }
           )
            // if(this.editChanel.active === 1){
            //         this.channelStatus = 'Active'
            //     }else{
            //          this.channelStatus = 'InActive'
            //     }

            //      const FormData={
            //         zoneName:this.editedItem.chanelName,
            //         _id:this.editedItem.channelCode,
            //          channelStatus:this.editedItem.channelStatus,

            //            channel_Id: this.editedItem.channelName,

            //          }
            //           Object.assign(this.chanelResponse[this.TableIndex], FormData)
}
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
               this.$v.$touch()
               console.log(this.$v)  
          if (this.$v.$invalid == true) {
              console.log("Form has errors") 
              this.showToast('Please fill all empty fields', this.TOST().WARNING);
              this.disaddzone = false; 
              return
        }else if(/^\s+$/g.test(this.editedItem.chanelName)){
             this.showToast('Please fill all empty fields', this.TOST().WARNING);
             this.disaddzone = false;
             return
        }else{
            console.log("begin regular Flow!");
            this.disaddzone = true;
            let self = this;
                // Post API hit
                // console.log('CHANEL NAME',this.editedItem.channelName),
                console.log('Active InActive ::: ',this.editedItem.channelStatus);
            //     let statuscode = null
            // if(this.editedItem.channelStatus === 'Active'){
            //     statuscode:1;
            // }else if(this.editedItem.channelStatus === 'InActive'){
            //     statuscode:0;
            // }
                let sendData = {
                    zoneName: self.editedItem.chanelName,
                    channel_Id: self.editedItem.channelCode,
                    active: this.editedItem.channelStatus
                }

               
              console.log('POP : ', sendData);
               
              this.POST('addZonemaster/'+this.user_id, sendData,res => {
                        //    console.log('POST CHANEL DATA',res.data.errMsg);
                        if(res.data.errCode === -1){
                            self.editChanel = res.data.errMsg;
                            console.log('Response Data',self.editChanel)
                            self.$store.commit('SET_CHANEL_DETAILS',self.editChanel);
                            // self.updateChnl();
                            self.dialog = false    ;
                            this.showToast('Zone Created Successfully','success')
                             this.channeldatafilter ='all'
                            this.getZoneResp(this.channeldatafilter);
                            
                                // if(self.editChanel.active === 1){
                                //     self.channelStatus = 'Active'
                                // }else{
                                //     self.channelStatus = 'InActive'
                                // }
                                
                                // const formData={
                                // zoneName :self.editedItem.chanelName,
                                // _id: self.editChanel._id,
                                // channelStatus:self.channelStatus,
                                
                                // channel_Id: self.editedItem.channelName,
                                // }
                                // self.chanelResponse.push(formData)
                        }else{
                            this.showToast('Something went wrong','error')
                        }
                            
                    }
                )
                // this.close()
                 }
                
                }

                // updateChnl(){
                //     let self = this;
                //     self.chanelResponse = self.$store.state.chanelDetails;
                //     console.log('CHNEL RESPONSE',self.chanelResponse)
                // },
        }

}
</script>
<style>

    .pagination{
            margin-top: 20px;
}

.status{
      font-family:roboto; font-weight:500; letter-spacing:0.1px;
}

 .thebtn{
      display:flex;
     align-items:center; 
     color:white;
     border-radius:5px;
     font-size:15px;
    }

    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }
    .btn-size{
        width: 1000px
}
     @media screen and (min-width: 320px){

            .pagination{
             margin-top: 20px;
}

     }
      @media screen and (min-width: 728px){
          .add-branch-btn{
              display: flex;
              justify-content: flex-end;
              margin-right: 15px;
          }

             .pagination{
                margin-top: 20px;
}
      }
      @media screen and (min-width: 922px){

             .pagination{
                margin-top: 20px;
}

          .add-branch-btn{
               display: flex;
              justify-content: flex-end;
              margin-right: 15px;              
          }
      }
</style>
