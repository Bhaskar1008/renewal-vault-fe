<template> 
<div>
    <!-- <v-toolbar style="margin-top:65px; padding:7px; align-items:center;" fixed light scroll-off-screen scroll-target="#scrolling-techniques">  -->
   
        
  <v-layout mt-3 row align-center justify-space-between>
    <!-- <v-text class="headline font-weight-bold">Features Access Control</v-text> -->
  
    <v-flex ml-3 xs3 md2 >
        <v-select class="channeldropdown" v-model="channeldatafilter"
            :items="channeldata"  
            item-text="text" 
            item-value="value" 
            label="Channel"
            @change="channelfilters">
        </v-select> 
      </v-flex>
      <v-btn color="#1976D2" medium class="caption"  @click="updateAccessManagement()"> Update  Permissions</v-btn>

    </v-layout>
  

    <div v-if="rolespresent" style="margin:10px; padding:50px; margin-top:13px; background-color:#fff;">
        <p style="font-family:roboto; font-size:25px;"> There're no role's assigned for that Channel</p>    
    </div>

    <div v-else style="margin:10px; padding:50px; margin-top:12px; background-color:#fff;">
        <v-expansion-panel expand mt-1 >
            <v-expansion-panel-content v-for="(item,i) in items" :key="i" expand-icon="arrow_drop_down">
                <div slot="header" class="subheading font-weight-bold">{{item.featureName}}</div>
                <v-card>
                    <v-flex xs12 style="" >
                        <v-flex pt-2 style="background-color:#23B1A9;">
                            <!-- <v-flex pa-1 text-xs-left xs3>
                                <p class="subheading font-weight-medium" style="color:white">Role Name</p>
                            </v-flex> -->
                            <v-flex pa-1 style="display:flex; flex-direction:row;" >
                                <p class="subheading font-weight-medium" style="color:white; padding-left:20px;">Please check the box for the role you want this feature to be activated</p>
                                <!-- <v-checkbox color="#23B1A9"  v-model="item.roles.read" @click="sele    ctall(true, i, index, 'read')" label="Check All" ></v-checkbox> -->
                            </v-flex>
                            <!-- <v-flex pa-1  >
                                <v-checkbox color="white"  label="Check All" @change="item.roles.read = false" style="display:flex;justify-content:center"></v-checkbox>
                            </v-flex> -->

                            <!-- <v-flex pa-1 text-xs-center xs2>
                                <p class="subheading font-weight-medium" style="color:white">Write</p>
                            </v-flex> -->
                        </v-flex>

                        <v-layout pt-2  style="border-top:1px solid #eee; flex-wrap: wrap;">
                            <!-- <v-flex pa-1 text-xs-left xs3 style="">
                                <p class="body-1 font-weight-medium">{{role.roleName}}</p>
                            </v-flex> -->
                            <v-flex v-for="(role, index) in item.roles" :key="index">
                                <v-flex pa-2 text-xs-left  class="theroles">
                                    <v-checkbox color="#23B1A9"  v-model="role.read"  @change="changeCurrentState($event, i, index, 'read')" :label="role.roleName" ></v-checkbox>
                                </v-flex>
                            </v-flex>
                            <!-- <v-flex pa-1 text-xs-right xs2>
                                <v-checkbox color="#23B1A9" v-model="role.write" :label="role.roleName" @change="changeCurrentState($event, i, index, 'write')" style="display:flex;justify-content:center"></v-checkbox>
                            </v-flex> -->
                        </v-layout>
                    </v-flex>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
 </div>
</template>

<script>

import axios from 'axios'
import loadChannel from '../common/onProjectLoad.js'

let access_id;

export default {

    created(){
        if(this.items.hasOwnProperty('read')){
            this.rolespresent= true;
        }else{ 
             this.rolespresent= false;
        }
        this.$store.commit('SET_PAGE_TITLE','Access Control');
        this.userID = this.$store.getters.getAgentDetails._id;
         
        var self = this;
      
        // this.GET('getchannel?userId='+this.getAgentInfo()._id,res => {
        //     // console.log("get newly created channels=>", res.data.errMsg);
        //     var channelGET = res.data.errMsg;
        //     // console.log('channelGET ',channelGET);
        //     for(let i = 0; i < channelGET.length; i++){
        //         if(channelGET[i].active === 1){
        //             let ddchannel ={
        //                 text:channelGET[i].channelName,
        //                 value:channelGET[i]._id
        //             }
        //             this.channeldata.push(ddchannel)  
        //             // console.log('Filt Data ',this.channeldata);
        //         }
        //     }
        //     // this.getAccess( this.channeldatafilter);  
        //     var data = channelGET[0]._id;
        //     this.channelfilters(data);
        //     // this.channeldatafilter = channelGET[1]._id;
        // })

        loadChannel.getChannel(this, res => {
               console.log("mixin channel data", res)
               for (let i = 0; i < res.length; i++) {
                   if (res[i].active === 1) {
                       let channetobj = {
                           text: res[i].channelName,
                           value: res[i]._id
                       }
                       this.channeldata.push(channetobj)
                   }
               }
            //    var data = channelGET[0]._id;
            this.channelfilters(this.channeldata[0].value);
           })
    },

    data() {
        return {
            rolespresent:false,
            channeldatafilter:"",
            channeldata:[],
            userID:'',
            displayarray:[],
            checkbox:true,
            selected:false,
            selected2:false,
           checkboxr:true,
           checkboxw:false,
           items: []
        }
    },    

    methods:{
        sendchange(e){
            console.log("The sent event is =>", e)
        },
        channelfilters(e){
            // console.log('data id',e)
            // this.page=1
            this.channeldatafilter = e
            this.getAccess(this.channeldatafilter)
        },

        changeCurrentState(event, _root_, child, accessType) {
            // console.log("Inside event=>", event);
            // console.log("Root Index : " + _root_);
            // console.log("Child Index : " + child);
            // console.log("Access Type : " + accessType);
            let _duplicate_ = this.items.slice(0, this.items.length);
            // console.log("_duplicate_ Type : " + _duplicate_);
            _duplicate_[_root_].roles[child][accessType] = event;
            this.items = [];
            this.items = _duplicate_;
            // console.log('After change : ' , this.items);
        },

        getAccess(e) {
            let self = this;
            let logUserData = self.$store.getters.getAgentDetails

            self.GET('getagentAccessOpt?userId=' +  self.userID + '&channelCode=' + e , function(res, error) {
                 self.items=[];
                if (res.data.errCode === -1){

                    if(res.data.errMsg.length == 0){
                        self.showToast('Sorry, no access management data available' , self.TOST().ERROR);
                        return
                    }
                   
                    // console.log("The access opt api result is =>", res.data.errMsg);
                    let accessData = res.data.errMsg[0].accessOpt
                    console.log("|==( accessData )==>", accessData);

                    
                    
                    if(logUserData.product_sd_code === '02'){ 
                        for(let _data of accessData){
                            if(_data.featureName === 'Business' || _data.featureName === 'SalesGuide' || _data.featureName === 'Renewals' ||
                                _data.featureName === 'Activities' || _data.featureName === 'Application' || _data.featureName === 'TodoList' || 
                                _data.featureName === 'Birthday' || _data.featureName === 'Partners' || _data.featureName === 'UpcomingEvents'){
                                
                                self.items.push(_data)
                                // console.log('|==(Access_DATA)==> ' , self.items);
                            }
                        }
                    }else{
                        self.items = accessData;
                    }
                    // self.items = res.data.errMsg[0].accessOpt;
                    // console.log('Access Management : ' , self.items);
                    access_id = res.data.errMsg[0]._id;
                } else if(res.data.errCode === 744){
                    self.showToast('Sorry, we have not found any user data available' , self.TOST().ERROR);
                }else if(res.data.errCode === 704){
                    self.showToast('Sorry, no access management data available' , self.TOST().ERROR);
                }else if(res.data.errCode === 101){
                    self.showToast('No Records found' , self.TOST().ERROR);
                }else if(res.data.errCode === 4){
                    self.showToast('Database error encountered' , self.TOST().ERROR);
                }
                
            })
        },

        updateAccessManagement() {
            let formData = {
                accessOpt: this.items,
                userId: this.userID,
                accessId: access_id
            }
            // console.log("Form Data : " , formData);
            let self = this;

            self.PUT('/v2/updateaccessOpt/', formData,res => {
                if (res.data.errCode === -1) {
                    self.showToast('Successfully updated' , self.TOST().SUCCESS);
                    console.log('UPDATE RESPONSE :::', res.data.errMsg)
                }else if(res.data.errCode === 744){
                         self.showToast('Sorry, we have not found any user data in request body' , self.TOST().ERROR);
                }else if(res.data.errCode === 704){
                         self.showToast('Sorry, no access management data in request body' , self.TOST().ERROR);
                }else if(res.data.errCode === 101){
                         self.showToast('No Records found' , self.TOST().ERROR);
                }else if(res.data.errCode === 4){
                         self.showToast('Database error encountered' , self.TOST().ERROR);
                }
            });
        }
    },

}
    

</script>

<style scoped>
 .caption{
     border-radius: 5px;
     color:white;
     font-size:16px;
 }

 .channeldropdown{
     width:220px;
     /* border:1px red dashed; */
 }

.child-flex>*, .flex{
        flex:0;
}

.theroles{
    /* border:1px red solid; */
    width:210px;
}

.v-input--selection-controls{
    padding:0px;
    margin:0px;
}

.rwh{
    width:0px; 
    height:40px;
}

.typohead{
       font-size:14px;
       color:#6d8ba3;
       font-family:roboto;
       font-weight:400;
       letter-spacing:1px;
}

   .v-expansion-panel__header{
       background-color: white;
       
       border:0.1px #a5b9d1 solid;
     
   }
    .v-expansion-panel__header:hover{
      
         background-color:#f4f6f9 ;
         border:0.1px #a5b9d1 solid;
         transition:  background-color 500ms cubic-bezier(0.23, 1, 0.32, 1);
   }

   .active{
      
       font-size:15px;
       padding-left:0px;
       color:#01b4bb;
       font-family:roboto;
       font-weight:500;
       letter-spacing:0.5px;
      text-align:left;
       transition: font-size  1s ease, padding-left 200ms cubic-bezier(0.23, 1, 0.32, 1),  letter-spacing 200ms cubic-bezier(0.23, 1, 0.32, 1)
   }  
   .active:hover{
       font-size:15px;
       padding-left:12px;
       color:#01b4bb;
       font-family:roboto;
       font-weight:500;
       letter-spacing:1.2px;
       text-align:left;
       transition: font-size  1s ease, padding-left 200ms cubic-bezier(0.23, 1, 0.32, 1),  letter-spacing 200ms cubic-bezier(0.23, 1, 0.32, 1)
     
   }  
   /* .v-expansion-panel__container{
      padding-left:0px;
     
   }  
   .v-expansion-panel__container:hover{
       padding-left:55px;
       transition:  padding-left 200ms cubic-bezier(0.23, 1, 0.32, 1);
   }  
   .v-expansion-panel--popout > .v-expansion-panel__container:hover{
        padding-left:0px;
   } */
  
   .rname{
       width:75px;
   }

</style>