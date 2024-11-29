<template>
<div>
  <v-flex xs12 sm3 mt-2>
    <v-select v-model="channelFilter" :items="channeldata" label="Channel"  item-text="text" item-value="value" @change="channelFetch"></v-select>
  </v-flex>
<v-flex mt-2 style="">
  <!-- ACCESS CONTROL TABLE MODIFICATION --SALMAN 7/3/2019 -->
  <v-flex xs12 style="" >
     <scroller scroll-direction="horizontal">
    <v-layout style="background-color:#23B1A9;border:1px solid #03DAC6">
        <v-flex pa-3 text-xs-center xs4 style="">
            <v-text class="subheading" style="color:white">Modules</v-text>
        </v-flex>
        <v-flex pa-3 text-xs-center xs2 style="" v-for="(role, index) in finalData " :key="index">
            <v-text class="subheading" style="color:white">{{role}}</v-text>
        </v-flex>
    </v-layout>

    <v-layout  v-for="(Data, rootIndex) in accessSystem" :key="rootIndex" style="border:1px solid #eee">
        <v-flex pa-3 text-xs-center xs4 style=";background-color:#F4F4F6">
            <v-text class="body-1">{{Data.name}}</v-text>
        </v-flex>
        <v-flex pa-3 text-xs-center xs2 style="background-color:#F9FAFB" v-for="(data, index) in Data.roles" :key="index">
          <v-flex v-for="(roleId, ind) in data" :key="ind">
              <v-text class="body-1">{{roleId.opt1.label}}</v-text>
              <v-flex>
                <v-checkbox color="#23B1A9" style="justify-content:center" @change="onChange($event, rootIndex, index, Data.name, ind, roleId)"	v-model="roleId.opt1.value"> </v-checkbox>
              </v-flex>
          </v-flex>

        </v-flex>
    </v-layout>
      </scroller>
  </v-flex>

</v-flex>

<v-flex mt-3 style="display: flex;"><v-btn @click="updateAccess()"> UPDATE</v-btn> </v-flex>
<!-- Second table for Alocation and Reallocation***************************** -->

</div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

var onChangeEventCapture = {};
var copy_accessOPT = []
  export default {
    data () {
      return {
          getAccessOpt:[],
          channelFilter:'',
          check:'',
          userID:'',
          accesObjID:'',
          selectChannel:'',
          accessData:[],
          getROLE:{},
          dataACCESS:{},
          channeldata:[],
          channelShow:'',
          dbStruct:{
            name:'',
            n2:'',
            AG001:'',
            BM001:'',
            RM002:'',
            AD002:''

          },
          roleStruct:{
            roleCode:'',
            roleName:'',
            active:'',
            channelCode:'',
            channelName:'',
            channel_id:'',
          },
          finalData:[],
          dataStruct:[],
        selected:[],
        selectedop2:[],
        boolValue:true,

        optValue:'',

         mainmodule:[{
            usermanagement:{
                 mainname: 'User Management'
            }

         }],
      }
  },

  components:{
    axios
  },
	watch: {
		// 'desserts[0].agent.controls.opt1.value'(newValue, oldValue) {
		// 	console.log('New Value' ,newValue);
		// }
  } ,

    created(){
      this.channelApi();
      this.generateAccessManagement();


    },
    computed: {
      accessSystem() {
        let _temp_ = this.$store.getters.fetchAccess;
        // return _temp_.slice(0, _temp_.length);
        return _temp_;
      }
    },

    methods:{
      channelApi(){
          let self = this;
          self.GET('getchannel?userId=' + self.getAgentInfo()._id, res => {
            if (res.data.errCode == -1) {
                console.log('getChannel ',res.data.errMsg)
                var channelGET = res.data.errMsg

                for(let i =0;i<channelGET.length;i++){
                  if(channelGET[i].active === 1){
                      let value ={
                          text:channelGET[i].channelName,
                          value:channelGET[i]._id
                      }
                      this.channeldata.push(value)
                      console.log('Filt Data ',this.channeldata)
                      this.channelShow = this.channeldata[0].value
                      // console.log('CHann Value ',this.channelShow)

                  }
                }


                // let alldata={
                //     text:'All',
                //     value:'all',
                // }
                // this.channeldata.unshift(alldata)
                // console.log('Filt Data ',this.channeldata)
            }
        });
        // this.channelFilter = this.channelShow
        // this.selectChannel = this.channelShow
        // console.log('.selectChannel',this.selectChannel)
        // console.log('.channelFilter',this.channelFilter)

      },

      channelFetch(event){
          console.log('Channel Event ',event)
          this.selectChannel = event
          this.generateAccessManagement(this.selectChannel);
          // this.roleAPI(this.selectChannel);
      },
      roleAPI(cb = null) {
        let self = this;
        // console.log('SLECT',cb)
        // self.getROLE = {};
        self.finalData = [];
        this.GET('getrole?userId='+this.getAgentInfo()._id+'&channelCode='+ this.selectChannel +'&filter_role=22', function(res, error) {
            self.getROLE = res.data.errMsg[0]
            console.log('GET ROLE::>>', self.getROLE)
            let temp = [];
            if (self.getROLE.length === 0 || self.getROLE === null || self.getROLE === undefined || self.getROLE === "" || self.getROLE === 'undefined') {} else {
              for (let i = 0; i < self.getROLE.length; i++) {
                if(self.getROLE[i].active === 1){

                    self.finalData.push(self.getROLE[i].roleName);
                    var role_id = self.getROLE[i].roleCode
                    var data = {
                      [role_id]: {
                        "opt1": {
                          label: "View",
                          value: false,
                        }
                      }
                    }
                    temp.push(data);
                    data = {};


                }
              }
              self.finalData.sort();
              if (typeof cb == 'function') {
                cb(temp, self.getROLE);
              }
            }
            return;
        })
      },
      updateAccess(){
          console.log('Access Data::',this.accessSystem)

          let self = this;
            this.PUT(this.API_Service_admin() + 'updateaccessOpt/'+ this.accesObjID, {
            // agent_id:'5c2e2a51fbbd1115df40b926',
            accessOpt: this.accessSystem,
            user_Id:  this.userID
          }, function(res, error) {
          
            if (res.data.errCode == -1) {
              self.showToast('Successfully updated' , self.TOST().SUCCESS);
            }

              console.log('UPDATE RESPONSE :::',res.data.errMsg)
            //  let updateResp = res.data.errMsg

            //  console.log('UPDATE RESPONSE :::',updateResp)
            //  this.$store.commit('SET_ACCESS_CONTROL', updateResp)

          });
      },
      onChange(event, rootIndex, index, name, ind, roleKey) {

        // console.log('Root Index : ', rootIndex);
        // console.log('Child Index : ', index);
        // console.log('Child Index : ', index);
        // console.log('Name : ' , name);
        // console.log('key _index : ' , ind);
        // console.log('Controls  : ' , roleKey);
        // console.log('Event : ', event);

        onChangeEventCapture = Object.assign({
          rootIndex: rootIndex,
          innerIndex: index,
          event: event,
          name: name,
          keyIndex: ind,
          role: roleKey
        }, onChangeEventCapture);
        // copy_accessOPT[rootIndex];

        // for (let element of copy_accessOPT) {

        // }
        // copy_accessOPT.push(onChangeEventCapture);

        // onChangeEventCapture = {};

        // console.log('Mo : ', copy_accessOPT);

        let payLoad = {
          event: onChangeEventCapture,
          command: 'update'
        }

        this.$store.commit('SET_ACCESS_SYSTEM', payLoad);

        onChangeEventCapture = {};

        // console.log('when done 0 : ' , copy_accessOPT[rootIndex].roles[0][index][ind].opt1.value);
        // console.log('when done 1: ' , copy_accessOPT[1].roles[0][index][ind].opt1.value);

        // let value = this.getAccessOpt[rootIndex].roles[0][index][ind].opt1.value;
        // this.getAccessOpt[rootIndex].roles[0][index][ind].opt1.value = event;

        // console.log(this.getAccessOpt);
        // if (value == false) {
        //   this.getAccessOpt[rootIndex].roles[0][index][ind].opt1.value = true;
        // } else if (value == true) {
        //   this.getAccessOpt[rootIndex].roles[0][index][ind].opt1.value = false;
        // }

        // console.log(this.getAccessOpt[rootIndex].roles[0][index][ind].opt1.value);
        // this.getAccessOpt[rootIndex].roles[0][index][ind]

        // if ()


        // this.getAccessOpt[rootIndex]

        // return;

              // let varobj={
              //   ind1: rootIndex,
              //   cont: roleKey,
              //   name: name
              // }

              // this.selected.push(varobj)
              // console.log("controlss push array",this.selected)

              // this.$store.commit('SET_ACCESS_CONTROL', varobj)

              // if (roleKey.opt1.value === true){
              //     roleKey.opt1.value = false
              // }

      },

      generateAccessManagement(channelID = null) {
        this.getAccessOpt = []
        this.$store.state.accessSystem = {};
        console.log('Storeed DATA',this.$store.state.accessSystem)
        console.log('Channel D ',this.selectChannel)

        // if(this.selectChannel == null || ''){
        //   this.selectChannel = ''
        //   console.log('Channel Empty::', this.selectChannel)
        // }else{
        //   this.selectChannel = channelID
        //   console.log('Channel Full::', this.selectChannel)
        // }

        this.userID = this.$store.getters.getAgentDetails._id;
        // console.log('USER ID::::', this.userID)
        let self = this;
            // CHANNEL BROKER>5c8f8bd86309e54704a27742  channelFilter  selectChannel

        this.roleAPI((data, allRoles) => {

            console.log('ChannD ',this.selectChannel)
            console.log('ROLE D::::', data)
            console.log('AllRoles D::::', allRoles)
            // allRoles = {}; 
            this.GET(self.API_Service_admin() + 'getagentAccessOpt?userId=' +  self.userID + '&channelCode='+this.selectChannel, function(res, error) {
              let data_object_keys    = [];
              let resp_obj_keys       = [];
              let unique              = [];
              let inActiveRoles       = [];
              let newRoleCodes        = [];

              /**
               * fetch all keys which is come form @name data
               *
               * Note: All active fields are going to push data_object_keys
               */
              for (let i = 0; i < data.length; i++) {
                data_object_keys.push(Object.keys(data[i])[0]);
              }

              data_object_keys.sort();  // keys in sorted order

              console.log("");

              if (res.data.errMsg.length === 0 || res.data.errMsg === null || res.data.errMsg === undefined || res.data.errMsg === "" || res.data.errMsg === 'undefined') {
              } else {
                self.getAccessOpt = res.data.errMsg[0].accessOpt;
                console.log('Whole Access Array : ', self.getAccessOpt)

                /**
                 * fetch role keys from acces management table
                 */

                for (let i = 0; i < 1; i++) {
                  for (let j = 0; j < self.getAccessOpt[i]['roles'].length; j++) {
                    let role_obj = self.getAccessOpt[i]['roles'][j];
                    resp_obj_keys.push(Object.keys(role_obj)[0])
                  }
                }

                resp_obj_keys.sort();               // keys in sorted order

                console.log('Active Role Code : ' , data_object_keys);
                console.log('Access Role Code : ' , resp_obj_keys);

                /**
                 * this condition is work on certaine rules
                 * 1) In accessmanagement collection all features roles are empties (roles are the type of an array so its length should be 0)
                 * 2) Also, role collection is empties
                 *
                 * So admin create a new role.
                 * Note: All active role code's (from getRoleAPI) are stored into @name data_object_keys
                 */

                let role_default_value = null;

                if (resp_obj_keys.length === 0 && data_object_keys.length > 0) {           // checking access management roles length
                    data_object_keys.forEach(new_code => {
                        role_default_value = {
                            [new_code]: {
                                opt1: { label: "View", value: true }
                            }
                        }
                        self.getAccessOpt.forEach((e, index, array) => {
                            array[index].roles.push(role_default_value);
                        });
                        role_default_value = {};
                    });
                }

                /**
                 * If all roles are inactive then delete all roles object from @name self.getAccessOpt
                 */

                if (data_object_keys.length === 0) {

                    resp_obj_keys.forEach(remove_code => {
                        self.getAccessOpt.forEach((e, index, array) => {
                            for (let i = 0; i < e.roles.length; i++) {
                                for (let role in e['roles'][i]) {
                                    if (remove_code === role) {
                                        array[index]['roles'].splice(i, 1);     // removing inactive roles from the access contorl list
                                    }
                                }
                            }
                        });
                    });
                }

                /**
                 * This condition will work when both @name data_object_keys @name resp_obj_keys contains value
                 */

                let operation = null;

                if (data_object_keys.length > 0 && resp_obj_keys.length > 0) {

                    /**
                     * @function difference
                     * @augment { Array } data_object_keys  it's lenght is greater than @name resp_obj_keys
                     * @augment { Array } resp_obj_keys
                     *
                     * Note: lodash library
                     */

                    if (data_object_keys.length > resp_obj_keys.length) {
                        unique =_.difference(data_object_keys, resp_obj_keys);
                        if (unique.length > 0) {            // unique length should be greater than 0
                            let role_default_value = {};
                            unique.forEach(new_code => {        // iterates unique(Array)
                                role_default_value = {
                                    [new_code]: {
                                        opt1: { label: "View", value: true }
                                    }
                                }

                                // TODO Assining new roles with default structure to getAccessOpt

                                self.getAccessOpt.forEach((e, index, array) => {
                                    array[index].roles.push(role_default_value);
                                });
                                role_default_value = {};
                            });
                        }
                    } else {
                        unique =_.difference(resp_obj_keys, data_object_keys);

                        if (unique.length > 0) {

                            /**
                             * Deleting inactive roles from @name getAccessOpt
                             */
                            unique.forEach(remove_code => {
                                self.getAccessOpt.forEach((e, index, array) => {
                                    for (let i = 0; i < e.roles.length; i++) {
                                        for (let role in e['roles'][i]) {
                                            if (remove_code === role) {
                                                array[index]['roles'].splice(i, 1);     // removing inactive roles from the access contorl list
                                            }
                                        }
                                    }
                                });
                            });
                        }
                    }
                }

                console.log(unique, "unique data ");
                console.log(operation, "Delete");

                console.log('Access Management : ' , self.getAccessOpt);
              }


              let payLoad = {
                data: self.getAccessOpt,
                command: 'new'
              };

              payLoad = JSON.parse(JSON.stringify(payLoad));

              self.$store.commit('SET_ACCESS_SYSTEM', payLoad);
              payLoad = {};

              return;

              // resp_obj_keys.forEach(accessSystemRolesCode => {

              //     allRoles.forEach(roleOBJ => {

              //         // All inactive and match strings are insert into the inActiveRoles collection
              //         if (accessSystemRolesCode === roleOBJ.roleCode) {
              //             inActiveRoles.push(roleOBJ.roleCode);
              //         } else if (roleOBJ.active == 1) {
              //             newRoleCodes.push(roleOBJ.roleCode);
              //         }
              //     });
              // });

              // outerLoop:
              // for(let i = 0; i < resp_obj_keys.length; i++) {

              //     innerLoop:
              //     for(let j = 0; j < allRoles.length; j++) {


              //         if (resp_obj_keys[i] === allRoles[j].roleCode) {
              //             inActiveRoles.push(allRoles[j].roleCode);
              //             continue innerLoop;
              //         }

              //         if (allRoles[j].roleCode === 1) {
              //             newRoleCodes.push(allRoles[j].roleCode);
              //             continue innerLoop;
              //         }
              //     }
              // }

              // newRoleCodes = _.uniq(newRoleCodes);

              // console.log('Active :' , newRoleCodes);
              // console.log('Inactive :' , inActiveRoles);

              // return;



              /**
               * If system founds inactive roles in @name self.getAccessOpt then system will remove all roles from this array and
               * commit updated array into the store
               */

              // if (inActiveRoles.length > 0) {
              //     inActiveRoles.forEach(remove_code => {
              //         self.getAccessOpt.forEach((e, index, array) => {
              //             for (let i = 0; i < e.roles.length; i++) {
              //                 for (let role in e['roles'][i]) {
              //                     if (remove_code === role) {
              //                         array[index]['roles'].splice(i, 1);     // removing inactive roles from the access contorl list
              //                     }
              //                 }
              //             }
              //         });
              //     });
              // }

              // if (newRoleCodes.length > 0) {

              //     let role_default_value = {};
              //         newRoleCodes.forEach(new_code => {
              //         role_default_value = {
              //             [new_code]: {
              //                 opt1: { label: "View", value: true }
              //             }
              //         }

              //         self.getAccessOpt.forEach((e, index, array) => {
              //             array[index].roles.push(role_default_value);
              //         });

              //         role_default_value = {};
              //     });
              // }

              // console.log('Updated : ' , self.getAccessOpt);

              // return;





              // let operation = null;

              // Verify length

              // if (newRoleCodes.length > 0) {

              // } else {
                  // if (data_object_keys.length > resp_obj_keys.length) {
                  //     /**
                  //      * @function difference
                  //      * @augment { Array } data_object_keys  it's lenght is greater than @name resp_obj_keys
                  //      * @augment { Array } resp_obj_keys
                  //      */
                  //     unique =_.difference(data_object_keys, resp_obj_keys);
                  //     operation = "insert"
                  // } else {
                  //     /**
                  //      * @function difference
                  //      * @augment { Array } resp_obj_keys     it's lenght is greater than @name data_object_keys
                  //      * @augment { Array } data_object_keys
                  //      */
                  //     unique =_.difference(resp_obj_keys, data_object_keys);
                  //     operation = "delete"
                  // }
              // }

              // console.log('uniques : ' , unique);
              // console.log('Operation : ' +  operation);



              // if (unique.length > 0) {

              //     if (operation === "insert") {
              //         let role_default_value = {};
              //         unique.forEach(new_code => {

              //             role_default_value = {
              //                 [new_code]: {
              //                     opt1: { label: "View", value: true }
              //                 }
              //             }

              //             this.getAccessOpt.forEach((e, index, array) => {
              //                 array[index].roles.push(role_default_value);
              //             });

              //             role_default_value = {};
              //         });
              //     } else if (operation === "delete") {

              //         unique.forEach(remove_code => {
              //             this.getAccessOpt.forEach((e, index, array) => {
              //                 for (let i = 0; i < e.roles.length; i++) {
              //                     for (let role in e['roles'][i]) {
              //                         if (remove_code === role) {
              //                             array[index]['roles'].splice(i, 1);     // removing inactive roles from the access contorl list
              //                         }
              //                     }
              //                 }
              //             });
              //         });
              //     }
              // }

              // console.log('After : ' , this.getAccessOpt);
              // let payLoad = {
              //   data: self.getAccessOpt,
              //   command: 'new'
              // };

              // payLoad = JSON.parse(JSON.stringify(payLoad));

              // self.$store.commit('SET_ACCESS_SYSTEM', payLoad);
              // payLoad = {};
            });
        });
      }


    }
  }
</script>

<style>

</style>
