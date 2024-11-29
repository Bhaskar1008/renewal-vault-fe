<template>
	<v-app>
		<!-- <v-content> -->
		<v-card>
			<v-layout row wrap>
				<v-card flat style="background-color:#FAFAFA; width:100%;">
					<v-layout row justify-space-between class="mr-3 ml-3 pt-4">
						<v-flex xs10 sm6 md2 class=" mt-1 mr-4">
							<v-select v-model="channeldatafilter" :items="channeldataall" item-text="text" item-value="value" label="Channel" @change="channelfilters"></v-select>
						</v-flex>
						<v-flex></v-flex>
						<v-btn round depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addDesig()">add Designation
							<v-icon dark right>add_circle</v-icon>
						</v-btn>
						<v-menu transition="slide-y-transition">
							<v-btn round depressed medium slot="activator" color="secondary" class="white--text thebtn">Bulk Upload/Modify
								<v-icon dark right>publish</v-icon>
							</v-btn>
							<v-list>
								<v-list-tile>
									<v-btn flat color="secondary" @click="addUser()">Bulk Upload</v-btn>
								</v-list-tile>
								<v-list-tile>
									<v-btn flat color="secondary" @click="dialogBulkUpld = true">Bulk Modify</v-btn>
								</v-list-tile>
							</v-list>
						</v-menu>
						<v-flex xs10 sm6 md2 class="ml-2">
							<v-text-field @input="Searchdatatable" v-model="value" label="Search" append-icon="search" height="30px"></v-text-field>
						</v-flex>
					</v-layout>
				</v-card>
				<v-flex class="ml-3 mt-3" style="flex-flow:column wrap">
					<!-- <v-text class=" headline font-weight-bold">Designation Master</v-text> -->
					<v-layout row justify-center>
						<v-flex justify-center md11 ml-3 mt-3>
							<h3 class="text-xs-center mb-3">Designation Details</h3>
							<v-data-table :headers="headers" :items="desigResponse" hide-actions class="elevation-1">
								<template slot="items" slot-scope="props">
									<td class="">{{props.item.designatioName}}</td>
									<td class="">{{props.item.hierarchyId === null || props.item.hierarchyId === undefined ? "-" : props.item.hierarchyId.hierarchyName}}</td>
									<td class="">{{props.item.roleId === null || props.item.roleId === undefined ? "-" : props.item.roleId.roleName }}</td>
									<!-- === null || props.item.roleId === undefined ? "-" : props.item.roleId.roleName -->
									<td class="">{{props.item.channelCode.channelName}}</td>
									<!-- <td class="">{{props.item.channelStatus}}</td> -->
									<td class=""> <span class="status" :style="{color: props.item.channelStatus == 'Active' ? '#13961c' : '#d61111'}"> {{props.item.channelStatus}} </span>
									</td>
									<td class="">
										<v-icon small class="mr-2" @click="editItem(props.item,props.index)">edit</v-icon>
										<!-- Delete function commented as API is not present for this operation -->
										<!-- <v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon> -->
									</td>
								</template>
							</v-data-table>
						</v-flex>
					</v-layout>
                    <v-form v-model="valid" ref="form">
                        <v-dialog v-model="dialog" persistent max-width="800px">
                            <v-card>
                                <v-flex style="background-color:#3a3a3a">
                                    <v-card-title class="subheading" style="color:white">{{popupTitle}}</v-card-title>
                                </v-flex>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm6 md6>
                                                <v-select :readonly="disdesignation" :rules="[() => !!editedItem.chanelCode || 'This field is required']" v-model="editedItem.chanelCode" @change="setchannel" :items="channeldata" item-text="text" item-value="value" label="Channel Name"></v-select>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field counter="50" maxlength="50" v-model="editedItem.designtnName" :rules="designationnamevalid" @input="fieldvalidation(editedItem.designtnName,'name')" label="Designation Name"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-select @change="selectchStatus()" :rules="[() => !!editedItem.designtnStatus || 'This field is required']" v-model="editedItem.designtnStatus" :items="desigstatus" item-text="text" item-value="value" label="Status"></v-select>
                                            </v-flex>
                                            <!-- <v-flex xs12 sm6 md6>
                                    <v-select v-model="editedItem.chanelCode" @change="setchannel" :items="channeldata" item-text="text" item-value="value" label="Channel Name" ></v-select>
                                </v-flex> -->
                                            <v-flex xs12 sm6 md6>
												<!-- :readonly="disdesignation" -->
                                                <v-select  :rules="[() => !!editedItem.heirarchy || 'This field is required']" v-model="editedItem.heirarchy" @change="showdhdata" :items="heirarchydatalists" item-text="text" item-value="value" label="Hierarchy Name"></v-select>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
												<!-- :readonly="disdesignation" -->
                                                <v-select  :rules="[() => !!editedItem.heirarchy || 'This field is required']" v-model="editedItem.roles" @change="showdhdata" :items="roledatalists" item-text="text" item-value="value" label="Select Role"></v-select>
                                            </v-flex>
                                            <!-- <v-flex xs12 sm6 md6>
                                <p> {{editedItem.roles}}</p>
                                </v-flex> !--></v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                                        <v-icon right dark>highlight_off</v-icon>
                                    </v-btn>
                                    <v-btn :disabled="disaddbtn" depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                                        <v-icon dark right>check_circle</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-form>
					<div class="text-xs-center pagination">
						<v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
					</div>
				</v-flex>
			</v-layout>
		</v-card>
		<!-- </v-content>    -->
	</v-app>
</template>
<script>
	import { required, minLength } from 'vuelidate/lib/validators'
	import axios from 'axios'
	import loadChannel from '../common/onProjectLoad.js'

	var index = 0; // used for put api
	export default {

	    validations: {
	            editedItem: {
	                designtnName:{
	                    required, minLength: minLength(2)
	                },
	                heirarchy:{
	                    required
	                },
	                roles:{
	                    required
	                }
	            },
	    },

	    created(){
	          this.$store.commit('SET_PAGE_TITLE','Designation Master');
	            this.getheirasrchydatalist();
	            this.GetRole();
	            // getheirasrchydatalist
	            // console.log("Getting the Heirarchy response from designation", this.desigResponse);

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
	         this.getDesignatioResp(this.channeldatafilter);
	    },

	     mounted(){
	        this.headers.map(e =>{
	                    e.sortable = false;
	        })
	    },

	     // mounted(){
	    //     this.getdesignationpage(this.pagetab)
	    // },

	    data(){
	        return{
	            disaddbtn:false,
	            disdesignation:false,
	            heirarchydatalists:[],
	            roledatalists:[],
	            channelListID:'',
	            page:1,
	            skip:0,
	            skipdiffrence:this.paginationdiff(),
	            channeldatafilter:'all',
	            designationpagedata:[],
	            channeldata:[],
	            channeldataall:[],
	            bankStore:[],
	            itemsBank:[],
	            designationnamevalid:[],
	            value:'',
                dialog: false,
                valid:false,
	            btnname:'',
	            desigStore:{},
	            desigResponse:[],
	            editDesignation:{},
	            TableIndex:'',
	            desigData:[],
	            headers:[
	                        {text: 'Designation', value: 'designtnName'},
	                         {text: 'Heirarchy', value: 'heirarchy'},
	                           {text: 'Role', value: 'role'},
	                        {text: 'Channel Name', value: 'chanelCode'},
	                        {text: 'Designation Status', value: 'designtnStatus'},
	                        {text: 'Action', value: 'action', sortable: false}
	                ],
	            tableData: [],
	                editedIndex: -1,

	                editedItem: {
	                        heirarchy:'',
	                        roles:'',
	                        designtnName:'',
	                        chanelCode:'',
	                        designtnStatus:'',
	                        _id:'',
	                        channelid:'',
	            },
	            defaultItem: {
	                roles:'',
	                heirarchy:'',
	                designtnName:'',
	                chanelCode:'',
	                designtnStatus:'',
	                _id:'',
	            },
	            desigstatus:['InActive', 'Active'],
	            desigstatusIndex:'',

	        }
	    },
	    computed: {
	    //     objmethod() {
	    // 	 var self=this;

	    //    return this.desigResponse.filter(function(cust){return cust.designatioName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	    //    || cust.channelCode.channelName.toLowerCase().indexOf(self.value.toLowerCase()) >=0

	    //      });
	    // },
	        formTitle () {
	            return this.editedIndex === -1 ? 'Add' : 'Update'
	        },
	        popupTitle(){
	            return this.editedIndex === -1 ? 'New Designation' : 'Edit Designation'
	        },

	         value() {
	           console.log(this.value);
	       }
	    },

	    methods:{
	          fieldvalidation(value,fieldName){
	            let nameRegex =/^[A-Za-z&_. -]+$/;
                let targetRegex =/^[0-9 ]+$/;

	            if(fieldName == 'name'){
	                this.designationnamevalid = []
	                value === '' ? this.designationnamevalid.push('This field is required') : ''
	                value.match(nameRegex) ? this.designationnamevalid.push() : this.designationnamevalid.push('Only alphabets are allowed')
	            }
	        },
	        validate_desg(data, type, field){

	             var self = this
	                this.validate_alpha_numeric(data, type, (res, datanew)=>{
	                    if(res == true){
	                        self.editedItem[field] = datanew
	                        self.$forceUpdate();
	                        return
	                    }
	                })

	        },

	        showdhdata(e){
	            // console.log("SHOWING VMODEL _ids(expected) FOR selected dropdown data DATA", e)
	            console.log("SHOWING VMODEL FOR H DATA", e)
	        },

	        GetRole(channel) {
                let self = this;
                // console.log('Channel ID',channel)
                // console.log('Channel Store ',this.$store.state.lastchanneselected)
                channel !== '' || "undefined" || null ? this.channelListID = this.$store.state.lastchanneselected : this.channelListID = channel
                // console.log('Channel After',this.channelListID)
                this.roledatalists = [];
                this.GET('getrole?userId=' + this.getAgentInfo()._id + '&channelCode=' + this.channelListID, function(res, error) {
                    console.log("RAW API RESPONSE", res.data.errMsg);
                    res.data.errMsg.forEach(element => {
                        element.StatusRole = '';
                    });
                    self.getresponse = res.data.errMsg[0]
                    console.log('GetResponse from ROLE API', self.getresponse)
                    for (let i = 0; i < self.getresponse.length; i++) {
                        console.log("From FOR LOOP::=>");
                        if (self.getresponse[i].active === 1) {
                            let roledata = {
                                text: self.getresponse[i].roleName,
                                value: self.getresponse[i]._id
                            }
                            self.roledatalists.push(roledata);
                        }
                    }
                })
            },
	        getheirasrchydatalist(chn) {
                // console.log("From Channel Heirarchy",this.$store.state.lastchanneselected);
                let channID = this.$store.state.lastchanneselected
                this.user_id = this.$store.state.agentDetails._id;
                // console.log("");
                this.heirarchydatalists = [];
                let self = this;
                this.GET('getHierarchy?userId=' + this.user_id + '&channelCode=' + channID, function(res, error) {
                    let herarchyresp = res.data.errMsg[0]
                    for (let i = 0; i < herarchyresp.length; i++) {
                        //  console.log("From FOR LOOP::=>");
                        if (herarchyresp[i].active === 1) {
                            let heirarchydata = {
                                text: herarchyresp[i].hierarchyName,
                                value: herarchyresp[i]._id
                            }
                            // let hname = heirarchydata.text;
                            // console.log("H DATA IS::>",hname)
                            //  console.log("Getting Designation details::=>", this.desigResponse.hname);
                            //  this.desigResponse[i].newname = heirarchydata.text
                            //  console.log("New HEIRARCHY NAME****>>>", this.desigResponse[i].newname)
                            self.heirarchydatalists.push(heirarchydata);
                        }
                    }
                })
            },

	        Searchdatatable (e) {
	                this.value = e;
	            },
	        channelfilters(e){
	                console.log('data',e)
	                this.page=1
	                this.channeldatafilter = e
	                this.getDesignatioResp(this.channeldatafilter)
	            },
	            next(e){
	                console.log('Value of E =>', e);
	                let skipdata = e - 1
	                console.log(' data',skipdata)
	                if(skipdata === 0 ){
	                    this.skip = 0
	                }else{
	                    console.log("from else as skip is not Zero", this.skipdiffrence +  "  SKIP data  "+  skipdata );
	                    this.skip = this.skipdiffrence*skipdata
	                }
	                console.log('skip after cal',this.skip)
	                this.getDesignatioResp(this.channeldatafilter,this.skip)
	            },
	         selectchStatus(){
	            this.desigstatusIndex = this.desigstatus.indexOf(this.editedItem.designtnStatus)
	            console.log('select==>',this.desigstatusIndex)

	        },

	        getDesignatioResp(e,skip) {
	            let Filter_Data
	                if(e === 'all'){
	                    Filter_Data = 'getDesignationMaster?userId='+this.getAgentInfo()._id+'&skip='+skip + '&filt=4'
	                }else{
	                    Filter_Data = 'getDesignationMaster?userId='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip +'&filt=4'
	                }
	            let self = this;
	             this.GET(Filter_Data , function(res , error){
	                      if(res.data.errCode === -1){
	                    res.data.errMsg.forEach( element => {
	                        element.channelStatus = '';
	                    });

	                    self.desigResponse = res.data.errMsg[0]
	                    console.log('GET DESIG REPONSE',self.desigResponse)
	                    var pageLen = res.data.errMsg[1]
	                    let totalCount = pageLen[0].totalCount
	                    console.log('Total Page Length:',totalCount)
	                    self.pageLength = Math.ceil(totalCount/self.skipdiffrence)
	                    console.log("Before math ceil", totalCount/self.skipdiffrence);
	                    for( var i=0; i <= self.desigResponse.length; i++){
	                        if(self.desigResponse[i].active === 1){
	                            self.desigResponse[i].channelStatus = 'Active'

	                        }else{
	                            self.desigResponse[i].channelStatus = 'InActive'

	                        }
	                    }
	               }
	             })

	        },

	        saveAndEdit(_btnname){
	             if(_btnname == 'Add' )
	            {
	                this.save();
	            }
	            else if(_btnname == 'Update'){
	                    this.editDesig();
	            }
	            },

	        addDesig(){
	            this.disaddbtn = false;
	            this.disdesignation = false;
	            this.btnname = 'Add';
	            this.editedItem.designtnName = '';
                this.designationnamevalid = [];
                this.$refs.form.reset();
	            this.editedItem.chanelCode = this.$store.state.lastchanneselected;
	            this.editedItem.designtnStatus = 'InActive';
	            this.dialog = true;
	            this.editedItem.heirarchy='';
	        },
	        setchannel(e){
	            // console.log("channel store",e)
	            this.channelID = e
	            this.$store.commit('LAST_CHNNEL_DATA',this.channelID);
	            this.GetRole(this.channelID);
	            this.getheirasrchydatalist(this.channelID);
	        },

	        editItem (item,i) {
	             this.disaddbtn = false;
	            this.disdesignation = true
	            console.log("Data is",item)
	            this.TableIndex = i
	            this.btnname = 'Update'

	            this.dialog = true
	            var itemsChanel = item;
	            console.log("new item is",itemsChanel)
	            this.editedItem.roles = itemsChanel.roleId._id,
	            this.editedItem.designtnName = itemsChanel.designatioName;
	            this.editedItem.chanelCode = itemsChanel.channelCode._id;
	            this.editedItem.designtnStatus = itemsChanel.channelStatus;
	            this.editedItem._id = itemsChanel._id;
	             this.editedItem.heirarchy= itemsChanel.hierarchyId._id;
	             console.log("From edit method==>",    this.editedItem.heirarchy);

	        },

	        editDesig(item){

	            // if(this.editedItem.chanelCode === "" || this.editedItem.designtnName === "" || this.editedItem.heirarchy === "" || this.editedItem.roles === "" ){
	            //     this.showToast('Please fill all empty fields', this.TOST().WARNING);
	            //     return
	            // }else if(this.designationnamevalid.length !==0){
	            //     this.showToast('Please fill Correct data', this.TOST().WARNING);
	            //     return
                // }
                if(this.editedItem.chanelCode === "" || this.editedItem.designtnName === "" || this.editedItem.heirarchy === "" || this.editedItem.roles === "" || this.editedItem.designtnStatus === "" ){
                    this.showToast('Please fill all empty fields', this.TOST().WARNING);
                    this.$refs.form.validate();
                    this.designationnamevalid = [ !!this.editedItem.designtnName || 'This field is required' ]
	                return
	            }else if(this.designationnamevalid.length > 0){
	                this.showToast('Please fill Correct data', this.TOST().WARNING);
                }
                else{
	            this.showLoader('Uploading', true);

	            let code = null;
	                if(this.editedItem.designtnStatus === "InActive") {
	                    code = 0;
	                } else if(this.editedItem.designtnStatus === "Active") {
	                    code = 1;
	                }
	            // console.log('CHANNEL CODE',this.editedItem.designtnStatus)
	             this.PUT('updateDesignationMaster/'+this.editedItem._id,
	             {
	                    designatioName: this.editedItem.designtnName,
	                    channel_Id: this.editedItem.chanelCode,
	                    active:code,
	                    userId: this.getAgentInfo()._id  ,
	                    hierarchyId:  this.editedItem.heirarchy,
	                    roleId: this.editedItem.roles

	            } , (res , error) =>{
	                  if(res.data.errCode !== -1){
	                         this.showToast('Something went wrong', this.TOST().ERROR);
	                         this.showLoader('Uploading', false);
	                     }else if(res.data.errCode === -1){

	                        console.log('DEsIG PUT RESPONSE',res.data.errMsg);
	                        this.editDesignation = res.data.errMsg
	                        var len = res.data.errMsg.length
	                        console.log("After EDIT",len)
	                        Object.assign(this.desigResponse[this.TableIndex], this.editDesignation)
	                        // this.$store.commit('SET_CHANEL_DETAILS',this.editDesignation);
	                        // this.showToast('API Hit Successfully', this.TOST().SUCCESS);
	                        this.dialog = false

	                        this.showLoader('Uploading', false);
	                        this.channeldatafilter ='all'
	                        this.getDesignatioResp(this.channeldatafilter);
	                     }
	            })

	            if(this.editDesignation.active === 1){
	                    this.channelStatus = 'Active'
	                }else{
	                     this.channelStatus = 'InActive'
	               }
	            }
	        },



	        deleteItem(index) {

	        this.desigResponse.splice(index, 1)
	        },

	        close () {
	        this.dialog = false
	        setTimeout(() => {
	            this.editedItem = Object.assign({}, this.defaultItem)

	            this.editedIndex = -1
	        }, 300)
	        },

	        save(){
	            // if(/^\s+$/g.test( this.editedItem.designtnName)){
	            //     this.showToast('Please fill all empty fields', this.TOST().WARNING);
	            //     return
	            // }else if(this.$v.$invalid == true){
	            //     this.showToast('Please fill all empty fields', this.TOST().WARNING);
	            //     return
	            // }
	            if(this.editedItem.chanelCode === "" || this.editedItem.designtnName === "" || this.editedItem.heirarchy === "" || this.editedItem.roles === "" || this.editedItem.designtnStatus === "" ){
                    this.showToast('Please fill all empty fields', this.TOST().WARNING);
                    this.$refs.form.validate();
                    this.designationnamevalid = [ !!this.editedItem.designtnName || 'This field is required' ]
	                return
	            }
	            else{ console.log("Run regular flow...");
	                 let code = null;
	                if(this.editedItem.designtnStatus === "InActive") {
	                    code = 0;
	                } else if(this.editedItem.designtnStatus === "Active") {
	                    code = 1;
	                }
	             let self = this;
	                console.log('Active InActive ::: ',this.editedItem.channelStatus);
	                 this.disaddbtn = true;
	                let sendData = {
	                    designatioName: self.editedItem.designtnName,
	                    channel_Id: self.editedItem.chanelCode,
	                    active: code,
	                    hierarchyId: self.editedItem.heirarchy,
	                    roleId: self.editedItem.roles,
	                }
	                console.log('POP : ', sendData);
	              this.POST('addDesignationMaster/'+this.getAgentInfo()._id, sendData ,(res , error) =>{
	                  if(res.data.errCode === -1){
	                            self.editChanel = res.data.errMsg;
	                            console.log('Response Data',self.editChanel)
	                            self.$store.commit('SET_CHANEL_DETAILS',self.editChanel);
	                            self.dialog = false    ;
	                            this.showToast('Designation Created Successfully','success')
	                             this.channeldatafilter ='all'
	                            this.getDesignatioResp(this.channeldatafilter);
	                        }else{
	                            this.showToast('Something went wrong','error')
	                        }
	              })
	                //    return
	            }
	        }
	    },
	}
</script>
<style>
	.thebtn{
	      display:flex;
	     align-items:center;
	     color:white;
	     border-radius:5px;
	     font-size:15px;
	}
	.status{
	     font-family:roboto; font-weight:500; letter-spacing:0.1px;
	   }

	   .pagination{
	            margin-top: 20px;
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
