<template>
	<v-app>
		<!-- <v-content> -->
		<v-card>
			<v-layout row justify-space-between class="bgclrsource pr-3 pt-4 pl-4">
				<v-flex>
					<v-btn depressed medium slot="activator" color="primary" class=" ml-0 white--text thebtn" @click.native="addChannel()">Add Occupation Source
						<v-icon dark right>add_circle</v-icon>
					</v-btn>
				</v-flex>
				<v-flex xs10 sm6 md2 class="">
					<v-text-field @input="Searchdatatable" v-model="value" label="Search" append-icon="search" height="30px"></v-text-field>
				</v-flex>
			</v-layout>
			<v-layout row wrap>
				<v-flex class="ml-3 mt-3" style="flex-flow:column wrap">
					<!-- <v-text class=" headline font-weight-bold">Occupation Master</v-text>
                    <hr> -->
					<v-layout row justify-center>
						<v-flex justify-center md11 ml-3 mt-3>
							<h3 class="text-xs-center mb-3">Occupation Details</h3>
							<v-data-table :headers="headers" :items="objmethod" hide-actions class="elevation-1">
								<template slot="items" slot-scope="props">
									<!-- <td class="">{{props.item._id | filterid('C')}}</td> -->
									<td class="">{{props.item.code }}</td>
									<td class="">{{props.item.occupation}}</td>
									<td class=""> <span class="status" :style="{color: props.item.sourceStatus == 'Active' ? '#13961c' : '#d61111'}">{{props.item.sourceStatus}} </span>
									</td>
									<td class="">{{props.item.createdBy.first_name +' '+ props.item.createdBy.last_name}}</td>
									<td class="">{{props.item.createdDate | formate-date}}</td>
									<td class="">{{props.item.updatedBy.first_name +' '+ props.item.updatedBy.last_name}}</td>
									<td class="">{{props.item.updatedDate | formate-date}}</td>
									<td class="">
										<v-icon small class="mr-2" @click="editItem(props.item,props.index)">edit</v-icon>
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
                                                <!-- :rules="[rules.required,]" -->
                                                <!-- :error-messages="check_name" -->
                                                <v-text-field maxlength="50" counter="50" :rules="occupationnamevalid" @input="check_name(editedItem.occupationName,'name')" v-model="editedItem.occupationName" label="Occupation Name"></v-text-field>
                                            </v-flex>
                                            <!-- <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.sourceID" disabled label="Affiliate Code"></v-text-field>
                                </v-flex> -->
                                            <v-flex xs12 sm6 md6>
                                                <v-select v-model="editedItem.sourceStatus" :rules="[() => !!editedItem.sourceStatus || 'This field is required']" :items="chnlstatus" item-text="text" label="Status"></v-select>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                                        <v-icon right dark>highlight_off</v-icon>
                                    </v-btn>
                                    <v-btn :disabled="disocmadd" depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                                        <v-icon dark right>check_circle</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-form>
				</v-flex>
			</v-layout>
			<div class="text-xs-center pagination">
				<v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
			</div>
		</v-card>
		<!-- </v-content>    -->
	</v-app>
</template>
<script>
	import axios from 'axios' 
	
	import { required, minLength } from 'vuelidate/lib/validators'
	
	var index = 0; // used for put api
	export default {
	
	    created(){
	              this.$store.commit('SET_PAGE_TITLE','Occupation Master');
	            this.Getchannel(0);
	            let agetdetails = {}
	            // agetdetails = this.getAgentInfo()
	            // console.log("agentID Check",agetdetails)
	            // this.UserID
	             this.uID =  this.getAgentInfo();
	          console.log("THe USer ID IS :::=>>>",this.uID);
	    },
	
	    validations: {
	     editedItem: {
	        occupationName:{
	            required, minLength:minLength(2)
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
	            page:1,
	            skipdiffrence:this.paginationdiff(),
	            skip:0,
	            disocmadd:false,
                dialog: false,
                valid:false,
	            btnname:'',
	            pagination: {},
	            pageLength:0,
	            value:'',
	            sourceresponse:[],
	            chanelResponse:[],
	            occupationnamevalid:[],
	            rname:false,
	            // chnelstatus:[],
	            editChanel:{},
	            editsourceresponse:{},
	            rules:{
	                required: value => !!value || 'This fields are required.',
	            },
	            TableIndex:'',
	            headers:[
	                        {text: 'Occupation ID', value: 'sourceID', sortable: false},
	                        {text: 'Occupation Name', value: 'occupationName', sortable: false},
	                        {text: 'Occupation Status', value: 'sourceStatus', sortable: false},
	                        {text: 'Created By', value:'CreatedBy'},
	                        {text: 'Created Date', value: 'CreatedDate'},
	                        {text: 'Updated By', value: 'UpdatedBy'},
	                        {text: 'Updated Date', value: 'UpdatedDate'},
	                        {text: 'Action', value: 'action', sortable: false}
	                ],
	            UserID:'',
	            tableData: [],
	                editedIndex: -1,
	              editedItem: {
	                occupationName:'',
	                sourceID:'',
	                sourceStatus:'',
	               
	            },
	            defaultItem: {
	                occupationName:'',
	                sourceID:'',
	                sourceStatus:'',
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
	       return this.sourceresponse.filter(function(cust){return cust.occupation.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	        || cust.createdBy.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 ||  cust.createdBy.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0  
	        || cust.updatedBy.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 ||  cust.updatedBy.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0 
	          || cust._id.toLowerCase().indexOf(self.value.toLowerCase()) >=0  
	         });
	       //return this.customers;
	    },
	    //    check_name(){
	    //            //your regex for detecting special characters/number and so on will check for invaid data in if block and will return the desire error msg, else send an empty array or maybe string
	    //             if(this.editedItem.occupationName.length > 0){ 
	    //                 if(/^[a-zA-z \s]+$/g.test(this.editedItem.occupationName) != true){
	    //                     this.rname = true
	    //                     // console.log("CHECK INVALID",this.rname);
	    //                     return "Only alphabets are allowed"
	    //                 }else{
	    //                     this.rname = false
	    //                     return []
	    //                 }
	    //             }else{
	    //                     // return "This Fields are Required."
	    //             }
	    //     },
	        formTitle () {
	            return this.editedIndex === -1 ? 'Add' : 'Update'
	        },
	        popupTitle(){
	            return this.editedIndex === -1 ? 'New Occupation Source' : 'Edit Occupation Source'
	        },
	
	         value() {
	           console.log(this.value);
	       }
	    },
	
	    filters: {
	
	       formateDate(milisecond) {
	           try {
	               return new Date(parseInt(milisecond)).toLocaleDateString()
	           } catch(err) {
	               return milisecond;
	           }
	       }
	
	       ,
	        filterid(id, initial) {
	           try {
	               if (id == null || id == undefined || id == "") { return id; }
	               return initial + id.slice(16, 25).toUpperCase();
	           } catch (err) { return id; }
	       },
	   },
	
	
	    methods:{
	
	        check_name(value,fieldName){
	                //your regex for detecting special characters/number and so on will check for invaid data in if block and will return the desire error msg, else send an empty array or maybe string
	            // console.log("ValUE Fieldname",value,fieldName);
	            // return;
	
	            // let self = this;
	            // let innerFunction = function () {
	            //     self.occupationnamevalid.push('Only alphabets are allowed');
	            //     self.rname = true
	            // }
	            let nameRegex =/^[A-Za-z&_ ]+$/;
	            let targetRegex =/^[0-9 ]+$/;
	            if(fieldName == 'name'){
	                this.occupationnamevalid = []
	                value === '' ? this.occupationnamevalid.push('This is field required') : ''
	                value.match(nameRegex) ? this.occupationnamevalid.push() : this.occupationnamevalid.push('Only alphabets are allowed')
	            }
	            // else if(fieldName == 'target'){
	            //     this.targetValid = []
	            //     value === '' ? this.targetValid.push('This is field required') : ''
	            //     value.match(targetRegex) ? this.targetValid.push() : this.targetValid.push('Only numbers are allowed')
	            // }else if(fieldName == 'sequence'){
	            //     this.sequenceValid = []
	            //     value === '' ? this.sequenceValid.push('This is field required') : ''
	            //     value.match(targetRegex) ? this.sequenceValid.push() : this.sequenceValid.push('Only numbers are allowed')
	            // }
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
	
	        Searchdatatable (e) {
	
	            // console.log("value====>>>",e)
	                this.value = e;
	                // console.log("value is",this.value);
	            },
	            //    fetchById(id, rootIndex) {
	            // console.log('Fetch By Id : ', rootIndex);
	            // let self = this;
	            // this.showLoader(true);
	        //     this.GET('fetch_lead_sources?id='+id, function(res, error) {
	
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
	
	
	            Getchannel(skip){
	                 this.GET('fetch_occupation?filter=0'+'&skip='+skip,res => {
	                //    console.log('GET CHANEL DATA',res.data.errMsg);
	                    // this.chanelResponse = res.data.errMsg
	                    // console.log('CHANEL REPONSE',this.chanelResponse)
	                    console.log('getting Occupation  data DATA', res.data.errMsg[0] );
	
	                    var pageLen = res.data.errMsg[1]
	                    let totalCount = pageLen[0].totalCount
	                    console.log('Page Length:',totalCount)
	                    this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
	
	                    res.data.errMsg.forEach( element => {
	                        element.sourceStatus = '';
	                    });
	
	                    this.sourceresponse = res.data.errMsg[0]
	                    console.log('Source REPONSE',this.sourceresponse)
	                    
	                    for( var i=0; i <= this.sourceresponse.length; i++){
	                        // console.log('active==>',this.branchResponse[i].active)
	                        // let branchDetails =[]
	                        if(this.sourceresponse[i].status === 1){
	                            // console.log('active==>',this.branchResponse[i].active)
	                            this.sourceresponse[i].sourceStatus = 'Active'
	                           
	                        }else if(this.sourceresponse[i].status === 0){
	                            this.sourceresponse[i].sourceStatus = 'InActive'
	                           
	                        }
	                    }
	               
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
	            this.disocmadd = false;
	            this.rname = false;
	            this.btnname = 'Add';
                this.occupationnamevalid = [];
                this.$refs.form.reset()
	            this.editedItem.occupationName = '';
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
	             console.log("Data is",item)
	            console.log("Index is",i)
	            this.TableIndex = i
	            this.disocmadd = false;
	            // _index = i;
	            this.btnname = 'Update';
	               
	            this.dialog = true
	            var itemssource = item;
	            console.log("new item is",itemssource)
	            this.editedItem.occupationName = itemssource.occupation;
	            this.editedItem.sourceID = itemssource._id;
	            this.editedItem.sourceStatus = itemssource.status === 1 ? this.chnlstatus[1] : this.chnlstatus[0];        
	        },
	
	        editChanl(item){            
	            // console.log('CHANNEL CODE',this.editedItem.channelStatus)
	        //     if(/^\s+$/g.test(this.editedItem.occupationName)){
	        //             this.showToast('Please fill all empty fields', this.TOST().WARNING);
	        //             this.disocmadd = false;
	        //             return
	        //    }else if(this.$v.$invalid == true){
	        //             this.showToast('Please fill all empty fields', this.TOST().WARNING);  
	        //             this.disocmadd = false;
	        //             return
	        //    }else if(this.editedItem.sourceStatus === "" || this.editedItem.sourceStatus === null || this.editedItem.sourceStatus === undefined){
	        //             this.showToast('Please fill all empty fields', this.TOST().WARNING);  
	        //             return
	        //     }else if(this.rname === true){
	        //             this.showToast('Please fill Correct data', this.TOST().WARNING);  
	        //         return;
            //     }
                if(this.editedItem.occupationName === "" || this.editedItem.sourceStatus === ""){
                    console.log("ALL Fields are Empty");
                    this.showToast('Please fill all empty fields', this.TOST().WARNING);
                    this.$refs.form.validate();
	                this.occupationnamevalid = [ !!this.editedItem.occupationName || 'This field is required' ]
	            return
                }else if(this.occupationnamevalid.length > 0){
	                    this.showToast('Please fill Correct data', this.TOST().WARNING);
                }else{
	            let status = null
	            if(this.editedItem.sourceStatus === 'Active'){
	                status = 1
	            }else if(this.editedItem.sourceStatus === 'InActive'){
	                status = 0
	            }
	             this.PUT('update_occupation',
	             {              
	                    occupation: this.editedItem.occupationName,
	                    id:this.editedItem.sourceID, 
	                    status: status,                   
	                    userId: this.getAgentInfo()._id
	                        
	             },res => {
	                     if(res.data.errCode === -1){
	                   console.log('PUT DATABASE RESPONSE',res.data.errMsg);
	                    this.editsourceresponse = res.data.errMsg
	                   
	                // console.log("Response is from server ",res.data.errMsg);
	                   
	                  var len = res.data.errMsg.length
	                  console.log("After EDIT",len)
	                // this.$store.commit('SET_AFFILIATE_DETAILS',this.editsourceresponse);
	                //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})  
	                this.showToast('Your Occupation has been Updated Successfully','success')
	                // this.fetchById(); 
	                this.Getchannel();
	                    this.dialog = false
	                     }else{
	                        this.showToast('Something went wrong','error')
	                     }
	               }
	           );
	            }
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
	
	        },
	
	       
	
	        deleteItem(index) {
	        // const index = this.tableData.indexOf(item)
	        // this.cfrDataObj.splice(index, 1);
	        // confirm('Are you sure you want to delete this item?') && 
	        this.chanelResponse.splice(index, 1)
	        },
	
	        close () {
	        this.dialog = false
	        this.rname = false;
	        setTimeout(() => {
	            this.editedItem = Object.assign({}, this.defaultItem)
	            
	            this.editedIndex = -1
	        }, 300)
	        },
	
	
	        save(){
	            console.log("OCUPPATION STATUS",this.editedItem.sourceStatus);
	            
	        //    if(/^\s+$/g.test(this.editedItem.occupationName)){
	        //             this.showToast('Please fill all empty fields', this.TOST().WARNING);
	        //             this.disocmadd = false;
	        //             return
	        //    }else if(this.$v.$invalid == true){
	        //             this.showToast('Please fill all empty fields', this.TOST().WARNING);  
	        //             this.disocmadd = false;
	        //             return
	        //    }else if(this.editedItem.sourceStatus === "" || this.editedItem.sourceStatus === null || this.editedItem.sourceStatus === undefined){
	        //             this.showToast('Please fill all empty fields', this.TOST().WARNING);  
	        //             return
	        //    }else if(this.rname === true){
	        //             this.showToast('Only alphabets are allowed', this.TOST().WARNING);  
	        //         return; occupationnamevalid
	            if(this.editedItem.occupationName === "" || this.editedItem.sourceStatus === ""){
                    console.log("ALL Fields are Empty");
                    this.showToast('Please fill all empty fields', this.TOST().WARNING);
                    this.$refs.form.validate();
	                this.occupationnamevalid = [ !!this.editedItem.occupationName || 'This field is required' ]
	                return;
	            }else{
	             this.disocmadd = true;
	             console.log("Regular flow for occ master");
	      
	             let self = this;
	                // Post API hit
	                // console.log('CHANEL NAME',this.editedItem.channelName),
	                console.log('Active InActive ::: ',this.editedItem.sourceStatus);
	                let code = null;
	                if(this.editedItem.sourceStatus === "InActive") {
	                    code = 0;
	                } else if(this.editedItem.sourceStatus === "Active") {
	                    code = 1;
	                }
	                let sendData = {
	                    occupation: self.editedItem.occupationName,
	                    userId: this.getAgentInfo()._id ,
	                    status: code
	                }
	
	                console.log('POP sending data: ', sendData);
	               
	              this.POST('create_occupation',sendData,res => {
	                        //    console.log('POST CHANEL DATA',res.data.errMsg);
	                        if(res.data.errCode === -1){
	                            self.editsourceresponse = res.data.errMsg;
	                            console.log('Response Data',self.editsourceresponse)
	                            self.$store.commit('SET_AFFILIATE_DETAILS',self.editsourceresponse);
	                            // self.updateChnl();
	                            self.dialog = false    ;
	                            
	                                // if(self.editChanel.active === 1){
	                                //     self.channelStatus = 'Active'
	                                // }else{
	                                //     self.channelStatus = 'Inactive'
	                                // }
	                                
	                                // const formData={
	                                // channelName :self.editedItem.chanelName,
	                                // channel_code: self.editedItem.channelCode,
	                                // _id: self.editedItem.channelCode,
	                                // channelStatus:self.channelStatus,
	                                
	                                // }
	                                // self.chanelResponse.push(formData)
	                                this.showToast('Channel created Successfully','success')
	                                this.Getchannel();
	                        }else{
	                           this.showToast('Something went wrong','error') 
	                        }
	                            
	                    }
	                );
	                // this.close()       
	                }
	          }
	                
	        },
	
	                // updateChnl(){
	                //     let self = this;
	                //     self.chanelResponse = self.$store.state.chanelDetails;
	                //     console.log('CHNEL RESPONSE',self.chanelResponse)
	                // },
	     
	    
	    
	}
</script>
<style>
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
	      }
</style>