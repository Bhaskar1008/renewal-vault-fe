<template>
	<v-app>
		<!-- <v-content> -->
		<v-card>
			<v-layout row wrap>
				<v-card flat style="background-color:#FAFAFA; width:100%;">
					<v-layout row class="mr-3 ml-3 mt-4">
						<v-flex xs10 sm6 md2 class="mr-4">
							<v-select v-model="channeldatafilter" :items="channeldataall" item-text="text" item-value="value" label="Channel" @change="channelfilters"></v-select>
						</v-flex>
						<v-flex></v-flex>
						<v-btn round depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addChannel()">add Hierarchy
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
						<v-flex xs10 sm6 md2 class="ml-2 ">
							<v-text-field @input="Searchdatatable" v-model="value" label="Search" append-icon="search" height="30px"></v-text-field>
						</v-flex>
						<!-- <v-text class=" headline font-weight-bold">Hierarchy Management</v-text> --></v-layout>
				</v-card>
				<v-flex class="ml-3 mr-3 mt-3" style="flex-flow:column wrap; width:97%;">
					<v-layout row justify-center>
						<v-flex justify-center md11 ml-3 mt-3>
							<h3 class="text-xs-center mb-3">Hierarchy Details</h3>
							<v-data-table :headers="headers" :items="objmethod" hide-actions class="elevation-1">
								<template slot="items" slot-scope="props">
									<td class="">{{props.item.hierarchyName}}</td>
									<td class="">{{props.item.levelCode}}</td>
									<td class=""> <span class="status" :style="{color: props.item.channelStatus == 'Active' ? '#13961c' : '#d61111'}">  {{props.item.channelStatus}} </span> 
									</td>
									<td class="">{{props.item.channelCode.channelName}}</td>
									<td class="">
										<v-icon small class="mr-2" @click="editItem(props.item,props.index)">edit</v-icon>
										<v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon>
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
                                    <!-- <v-form @submit.prevent="saveAndEditBtn(btnname)"> -->
                                        <v-container grid-list-md>
                                            <v-layout wrap>
                                                <v-flex xs12 sm6 md6>
                                                    <v-select :readonly="disH" v-model="editedItem.channelName" :rules="[() => !!editedItem.channelName || 'This field is required']" label="Channel Name" @change="setchannel" :items="channeldata" item-text="text" item-value="value"></v-select>
                                                </v-flex>
                                                <v-flex xs12 sm6 md6>
                                                    <!-- @blur="$v.editedItem.chanelName.$touch()" -->
                                                    <!-- @change="validate_hdata(editedItem.chanelName, 4, 'chanelName')" -->
                                                    <v-text-field v-model="editedItem.chanelName" label="Hierarchy Name" @input="fieldvalidation(editedItem.chanelName,'name')" :rules="hierarchynamevalid"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm6 md6>
                                                    <!-- @blur="$v.editedItem.channelCode.$touch()" -->
                                                    <!-- @change="validate_hdata(editedItem.channelCode, 3, 'chanelName')" -->
                                                    <v-text-field :readonly="disH" v-model="editedItem.channelCode" type="number" label="Level Code" @input="fieldvalidation(editedItem.channelCode,'levelcode')" :rules="levelcodevalid"></v-text-field>
                                                </v-flex>
                                                <v-flex xs12 sm6 md6>
                                                    <v-select @change="selectchStatus()" :rules="[() => !!editedItem.channelStatus || 'This field is required']" v-model="editedItem.channelStatus" :items="chnlstatus" item-text="text" item-value="value" label="Status" @input="$v.editedItem.channelStatus.$touch()" ></v-select>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    <!-- </v-form> -->
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                                        <v-icon right dark>highlight_off</v-icon>
                                    </v-btn>
                                    <v-btn :disabled="disaddH" depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                                        <v-icon dark right>check_circle</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-form>
				</v-flex>
			</v-layout>
			<div class="text-xs-center pagination" v-if="visible === true">
				<v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
			</div>
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
	          this.$store.commit('SET_PAGE_TITLE','Hierarchy Master');
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
	         this.getHResp(this.channeldatafilter);
	          
	       
	    },
	               validations: {
	     editedItem: {
	        chanelName: {
	        required,
	      },
	         channelCode: {
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
	
	        // This Function is used to Get Hierarchy data with pagination.
	    //   this.GetHierarchydata(this.hierarchyskip)
	    },
	
	
	    data(){
	        return{

	            disaddH:false,
	            disH:false,
                pageLength:0,
                valid:false,
	            page:1,
	            skip:0,
	            visible : false,
	            skipdiffrence:this.paginationdiff(),
	            channeldatafilter:'all',
	            Hierarchydata:[],
	            channeldataall:[],
	            hierarchynamevalid:[],
	            levelcodevalid:[],
	            value:'',
	            // Hchanneldata:[],
	            user_id:'',
	            dialog: false,
	            btnname:'',
	            chanelResponse:[],
	            // chnelstatus:[],
	            editChanel:{},
	            TableIndex:'',
	            channeldata:[],
	           
	            headers:[
	                        {text: 'Hierarchy Name', value: 'chanelName'},
	                        {text: 'Level Code', value: 'channelCode'},
	                        {text: 'Hierarchy Status', value: 'channelStatus'},
	                         {text: 'Channel Name', value: 'channelName'},
	                        // {text: 'Branch Name', value: 'branch_name'},
	                        // {text: 'Area', value: 'area'},
	                        // {text: 'City Name', value: 'city_name'},
	                        // {text: 'State Name', value: 'state_name'},
	                        // {text: 'Region Name', value: 'region_name'},
	                        // {text: 'Zone Name', value: 'zone_name'},
	                        {text: 'Action', value: 'action', sortable: false}
	                ],
	            tableData: [],
	                editedIndex: -1,
	                editedItem: {
	                    chanelName:'',
	                    channelCode:'',
	                    channelStatus:'',
	                    chanelsid:'',
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
	                chanelsid:'',
	                 channelName:'',
	                // branch_name:'',
	                // area:'',
	                // city_name:'',
	                // state_name:'',
	                // region_name:'',
	                // zone_name:'',
	            },
	            chnlstatus:['Active','InActive'],
	            chnlstatusIndex:'',
	             HStore:[],
	            HData:[],
	                
	        }
	    },
	    computed: {
	        objmethod() {
	        
	       
	    	 var self=this;
	       return this.chanelResponse.filter(function(cust){return cust.hierarchyName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	        || cust.levelCode.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.channelCode.channelName.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         });
	       //return this.customers;
	    },
	        formTitle () {
	            return this.editedIndex === -1 ? 'Add' : 'Update'
	        },
	        popupTitle(){
	            return this.editedIndex === -1 ? 'New Hierarchy' : 'Edit Hierarchy'
	        },
	
	         value() {
	           console.log(this.value);
	       },
	                     nameErrors () {
	      const errors = []
	      if (!this.$v.editedItem.chanelName.$dirty) return errors
	        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	      !this.$v.editedItem.chanelName.required && errors.push('Hierarchy Name is required.')
	      return errors
	    },
	            codeErrors () {
	      const errors = []
	      if (!this.$v.editedItem.channelCode.$dirty) return errors
	        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
	      !this.$v.editedItem.channelCode.required && errors.push('Level Code is required.')
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
	        fieldvalidation(value,fieldName){
	            let nameRegex =/^[A-Za-z_& ]+$/;
	            let targetRegex =/^[0-9 ]+$/;
	            if(fieldName == 'name'){
	                this.hierarchynamevalid = []
	                value === '' ? this.hierarchynamevalid.push('This is field required') : ''
	                value.match(nameRegex) ? this.hierarchynamevalid.push() : this.hierarchynamevalid.push('Only alphabets are allowed')
	            }else if(fieldName == 'levelcode'){
	                this.levelcodevalid = []
	                value === '' ? this.levelcodevalid.push('This is field required') : ''
	                value.match(targetRegex) ? this.levelcodevalid.push() : this.levelcodevalid.push('Only numbers are allowed')
	            }
	        },
	        validate_hdata(data, type, field){
	
	             var self = this                
	                this.validate_alpha_numeric(data, type, (res, datanew)=>{
	                    if(res == true){ 
	                        self.editedItem[field] = datanew
	                        self.$forceUpdate();
	                        return
	                    }
	                })
	
	        },
	
	        Searchdatatable (e) {
	
	            // console.log("value====>>>",e)
	                this.value = e;
	                // console.log("value is",this.value);
	            },
	
	       
	
	        // End heare Pagination function
	           channelfilters(e){
	                console.log('data',e)
	                this.page=1
	                this.channeldatafilter = e
	                this.getHResp(this.channeldatafilter)
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
	                this.getHResp(this.channeldatafilter,this.skip)
	            },
	
	
	    getHResp(e,skip){
	
	        this.user_id = this.$store.state.agentDetails._id
	            let Filter_Data
	                if(e === 'all'){
	                    Filter_Data = 'getHierarchy?userId='+this.user_id+'&skip='+skip + '&hierarchy_type=3'
	                }else{
	                    Filter_Data = 'getHierarchy?userId='+this.user_id+'&channelCode='+e+'&skip='+skip +'&hierarchy_type=3'
	                }
	             let self = this;
	              this.GET(Filter_Data , function (res , error){
	
	                   //    console.log('GET CHANEL DATA',res.data.errMsg);
	                    // this.chanelResponse = res.data.errMsg
	                    // console.log('CHANEL REPONSE',this.chanelResponse)
	
	
	                    console.log('GET CHANEL DATA', res.data.errMsg[0]);
	                    res.data.errMsg.forEach( element => {
	                        element.channelStatus = '';
	                    });
	
	                    self.chanelResponse = res.data.errMsg[0]
	                    console.log(' The CHANEL REPONSE',self.chanelResponse)
	                    var pageLen = res.data.errMsg[1]
	                    let totalCount = pageLen[0].totalCount
	                    console.log('Page Length:',totalCount)
	                    self.pageLength = Math.ceil(totalCount/self.skipdiffrence)
	                    console.log('length pagination',self.pageLength)
	                    if(self.pageLength >1){
	                        self.visible = true
	                    }else{
	                        self.visible =false
	                    }
	                    if(self.chanelResponse.length !== 0){
	                    
	                    for( var i=0; i <= self.chanelResponse.length; i++){
	                        // console.log('active==>',self.branchResponse[i].active)
	                        // let branchDetails =[]
	                        if(self.chanelResponse[i].active === 1){
	                            // console.log('active==>',self.branchResponse[i].active)
	                            self.chanelResponse[i].channelStatus = 'Active'
	                           
	                        }else{
	                            self.chanelResponse[i].channelStatus = 'InActive'
	                        }
	                    }
	                    }
	              })
	            
	        },
	
	        selectchStatus(){
	            this.chnlstatusIndex = this.chnlstatus.indexOf(this.editedItem.channelStatus)
	            console.log('select==>',this.chnlstatusIndex)
	        },
	        setchannel(e){
	            console.log("channel store",e)
	            this.$store.commit('LAST_CHNNEL_DATA',e)
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
	             this.disH = false;
	             this.disaddH= false;
                this.btnname = 'Add';
                this.$refs.form.reset()
	            this.hierarchynamevalid = [];
	            this.levelcodevalid = [];
	            this.editedItem.chanelName = '';
	            this.editedItem.channelCode = '';
	            this.editedItem.channelStatus = 'InActive';
	            this.dialog = true;
	            this.editedItem.channelName = this.$store.state.lastchanneselected;
	        },
	        editItem (item,i) {
	            this.disH = true;
	            this.disaddH= false;
	            //  console.log("Data is",item)
	            // console.log("Index is",i)
	            this.TableIndex = i
	            // _index = i;
	            this.btnname = 'Update';
	            this.dialog = true;
	            var itemsChanel = item;
	            this.editedItem.chanelName = itemsChanel.hierarchyName;
	            this.editedItem.channelCode = itemsChanel.levelCode;
	            this.editItem.chanelsid = itemsChanel._id
	            console.log('Channel S-ID==> ',this.editItem.chanelsid)
	            this.editedItem.channelStatus = itemsChanel.channelStatus;
	
	            this.editedItem.channelName = itemsChanel.channelCode._id;
	        },
	
	    editChanl(item){
	        //        this.$v.$touch()
	        //        console.log(this.$v)  
	        //   if(this.hierarchynamevalid.length !== 0 || this.levelcodevalid.length !== 0){
	        //     this.showToast('Please fill Correct data', this.TOST().WARNING);
	        //     this.hierarchynamevalid.push('This fields are required')
	        //     return;
	        // }else if(this.editedItem.channelName === ""){
	        //     this.showToast('Please fill all empty fields', this.TOST().WARNING);
	        //     return;
	        // }
	        // if (this.$v.$invalid == true) {
	        //     console.log("Form has errors")  
            // }
             if(this.editedItem.chanelName === "" || this.editedItem.channelName === "" || this.editedItem.channelCode === "" || this.editedItem.channelStatus === "" ){
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                this.$refs.form.validate();
                this.hierarchynamevalid = [ !!this.editedItem.chanelName || 'This field is required' ]
                this.levelcodevalid = [ !!this.editedItem.channelCode || 'This field is required' ]
	            return;
	       }else if(this.hierarchynamevalid.length > 0 ||this.levelcodevalid.length > 0 ){
	                this.showToast('Please fill Correct data', this.TOST().WARNING);
           }
	      else{
	            let code = null;
	                if(this.editedItem.channelStatus === "InActive") {
	                    code = 0;
	                } else if(this.editedItem.channelStatus === "Active") {
	                    code = 1;
	                }
	            this.PUT('updateHierarchy/'+ this.editItem.chanelsid,
	             {                 
	                    hierarchy_name: this.editedItem.chanelName,
	                    levelCode: this.editedItem.channelCode, 
	                    active:code,                   
	                    user_Id: this.user_id,
	
	                    channel_Id: this.editedItem.channelName,        
	
	             } , (res , error)=>{
	                  if(res.data.errCode === -1){
	                   console.log('DATABASE RESPONSE',res.data.errMsg);
	                    this.editChanel = res.data.errMsg
	
	                //    console.log("Response is from server ",res.data.errMsg);
	                 
	                  var len = res.data.errMsg.length
	                  console.log("After EDIT",len)
	                    this.$store.commit('SET_CHANEL_DETAILS',this.editChanel);
	                //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})   
	                //                        
	                    this.dialog = false
	                    this.showToast('Hirarchy Updated Successfully','success')
	                     this.channeldatafilter ='all'
	                    this.getHResp(this.channeldatafilter);
	                     this.close(); 
	
	                     }else{
	                         this.showToast('Something went wrong','error')
	                     }
	             })
	
	//             if(this.editChanel.active === 1){
	//                     this.channelStatus = 'Active'
	//                 }else{
	//                      this.channelStatus = 'InActive'
	//                 }
	
	//                  const FormData={
	//                     hierarchyName:this.editedItem.chanelName,
	//                     levelCode:this.editedItem.channelCode,
	//                      channelStatus:this.editedItem.channelStatus,
	
	//                      channel_Id: this.editedItem.channelName,
	
	//                      }
	//                       Object.assign(this.chanelResponse[this.TableIndex], FormData)
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
	            
	            // this.$v.$touch()
	        
	            //    console.log(this.$v) 
	        // if(this.hierarchynamevalid.length !== 0 || this.levelcodevalid.length !== 0){
	        //     this.showToast('Please fill Correct data', this.TOST().WARNING);
	        //     this.hierarchynamevalid.push('This fields are required')
	        //     return;
            // }
            if(this.editedItem.chanelName === "" || this.editedItem.channelName === "" || this.editedItem.channelCode === "" || this.editedItem.channelStatus === "" ){
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                this.$refs.form.validate();
                this.hierarchynamevalid = [ !!this.editedItem.chanelName || 'This field is required' ]
                this.levelcodevalid = [ !!this.editedItem.channelCode || 'This field is required' ]
	            return;
	        }
	        // else if (this.$v.$invalid == true) {
	        //     this.showToast('Please fill all empty fields', this.TOST().WARNING);
	        //      this.disaddH= false;
	        //     return
	        // }
	        else{
	            this.disaddH= true;
	            console.log("Regular Flow starts from here...");
	            // return 
	             let self = this;
	                // Post API hit
	                // console.log('CHANEL NAME',this.editedItem.channelName),
	                // console.log('Active InActive ::: ',this.editedItem.channelStatus);
	                let code = null;
	                if(self.editedItem.channelStatus === "InActive") {
	                    code = 0;
	                } else if(self.editedItem.channelStatus === "Active") {
	                    code = 1;
	                }
	                let sendData = {
	                    hierarchy_name: self.editedItem.chanelName,
	                    levelCode: self.editedItem.channelCode,
	                    active: code,
	
	                    channel_Id: self.editedItem.channelName,
	                }
	
	                console.log('POP : ', sendData);
	               
	              this.POST('addHierarchy/'+this.user_id, sendData , (res , error) => {
	                   //    console.log('POST CHANEL DATA',res.data.errMsg);
	                        if(res.data.errCode === -1){
	                            self.editChanel = res.data.errMsg;
	                            console.log('Response Data',self.editChanel)
	                            self.$store.commit('SET_CHANEL_DETAILS',self.editChanel);
	                            // self.updateChnl();
	                            self.dialog = false ;
	                            this.showToast('Hierarchy Successfully Created','success')
	                            self.channeldatafilter ='all'
	                             self.getHResp(self.channeldatafilter);
	
	                                // if(self.editChanel.active === 1){
	                                //     self.channelStatus = 'Active'
	                                // }else{
	                                //     self.channelStatus = 'InActive'
	                                // }
	                                
	                                // const formData={
	                                // hierarchyName :self.editedItem.chanelName,
	                                // levelCode: self.editedItem.channelCode,
	                                // _id: self.editedItem.channelCode,
	                                // channelStatus:self.channelStatus,
	                                    
	                                // channel_Id: self.editedItem.channelName,
	                                
	                                // }
	                                // self.chanelResponse.push(formData)
	                        }else if(res.data.errCode === 4){
							
								this.disaddH= false;
	                            this.showToast('Duplicate Level Code found, please try again','error')
								
							}else{
								this.disaddH= false;
	                            this.showToast('Something went wrong','error')
	                        }
	              })
	                // this.close()
	
	                
	                }
	
	                // updateChnl(){
	                //     let self = this;
	                //     self.chanelResponse = self.$store.state.chanelDetails;
	                //     console.log('CHNEL RESPONSE',self.chanelResponse)
	                // },
	        }
	    }
	}
</script>
<style>
	.wrapper-card{
	        flex-direction: row;
	        flex-wrap: wrap
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