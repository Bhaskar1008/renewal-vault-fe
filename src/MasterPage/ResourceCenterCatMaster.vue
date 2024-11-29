<template>
    <div class="category-master">
<v-card> 
        <!-- <div class="mr-3 ml-3 mb-2 mt-3"> <h3 class="title font-weight-regular">Product Category</h3></div> -->
        <!-- <hr> -->
        <v-layout align-center justify-end row class=" mb-3 ml-3 pt-3 mr-2 bgclrsource">
            <v-flex xs10 sm6 md2 class="mt-1 mr-4">
                            <v-select v-model="channeldatafilter"
                                    :items="channeldataall"
                                    item-text="text"
                                    item-value="value"
                                    label="Channel"
                                    @change="channelfilters">
                            </v-select>
            </v-flex>
            <v-flex></v-flex>

            <v-btn medium color="primary" class="white--text thebtn" @click="addChannel">Create New Resource Category</v-btn>

            <v-flex xs10 sm6 md2 class="ml-3 mr-4 mt-1">
                                <v-text-field
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search"
                                append-icon="search"
                                height="30px"></v-text-field>
            </v-flex>

        </v-layout>

        <v-data-table
            hide-actions
            :headers="headers"
            :items="objmethod"
            class="elevation-1 ma-3">
            <template slot="items" slot-scope="props">
                <td>{{ props.item._id | filterid('C')}}</td>
                <td class="text-xs-left">{{ props.item.sequence }}</td>
                <td class="text-xs-left">{{ props.item.resourceCategoryName}}</td>
                <!-- <td class="text-xs-left">{{ props.item.channelName == undefined ? "-" : props.item.channelName}}</td> -->
                <td class="text-xs-left"><span class="status" :style="{color: props.item.active == 'Inactive' ? '#d61111' : '#13961c'}">{{ props.item.active }}</span></td>
                <td class="text-xs-left">{{ props.item.created_by_name }}</td>
                <td class="text-xs-left">{{ props.item.created_date | formate-date}}</td>
                <td class="text-xs-left">{{ props.item.updated_by_name }}</td>
                <td class="text-xs-left">{{ props.item.updated_date | formate-date}}</td>
                <td class="text-xs-left"><v-btn @click="editItem(props.item)" icon><v-icon color="#636363">edit</v-icon></v-btn></td>
            </template>
        </v-data-table>

          <div class="text-xs-center pagination">
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination>
            </div> 

</v-card>

        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card>

                <v-flex style="background-color:#3a3a3a">
                    <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                </v-flex>

                <v-card-text>
                    <form @submit.prevent="saveAndEditBtn(btnname)" ref="form">
                        <v-container grid-list-md style="padding-bottom:5px;">
                            <v-layout wrap>
                                <v-flex xs12 sm6 md6>
                                    <!-- <v-text-field v-model="editedItem.categoryName" label="Product Category Name"
                                        @input="$v.editedItem.categoryName.$touch()"
                                        @blur="$v.editedItem.categoryName.$touch()"
                                        :error-messages="nameErrors"
                                        :rules="rules"
                                        counter="15"
                                    ></v-text-field> -->
                                     <!-- @change="res_cat_validation(editedItem.categoryName, 5, 'categoryName')" -->
                                     <v-text-field 
   
                                        :error-messages="err_name"
                                       v-model="editedItem.categoryName" maxlength="20" label="Resource Category Name"  counter="20"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <!-- <v-text-field v-model="editedItem.sequence" label="Sequence"
                                        type="number"
                                        @input="$v.editedItem.sequence.$touch()"
                                        @blur="$v.editedItem.sequence.$touch()"
                                        :error-messages="sequenceError"
                                    ></v-text-field> -->
                                    <v-text-field v-model="editedItem.sequence" 
                                        @change="res_cat_validation(editedItem.sequence, 3, 'sequence')" label="Sequence" readonly="false"
                                        type="text"
                                    ></v-text-field>
                                </v-flex>
                                <!-- <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.channelCode" label="Channel Code"></v-text-field>
                                </v-flex> -->
                                 <!-- <v-flex xs12 sm6 md6 >
                                   
                                    <v-select
                                        v-model="channelCode"
                                        label="Channel Code"
                                        item-text="state"
                                        item-value="abbr"
                                        :items="Pchanneldata"
                                    >
                                    </v-select>
                                </v-flex>
                                   <v-flex xs12 sm6 md6 >
                                    <v-select
                                        v-model="channelCode"
                                        label="Role Code"
                                        item-text="state"
                                        item-value="abbr"
                                        :items="Pchanneldata"
                                    >
                                    </v-select>
                                </v-flex> -->
                                <v-flex xs12 sm6 md6>
                                    <!-- <v-select @change="selectchStatus()" v-model="editedItem.categroyStatus" :items="chnlstatus" item-text="text" item-value="value" label="Status"
                                        @input="$v.editedItem.categroyStatus.$touch()"
                                        @blur="$v.editedItem.categroyStatus.$touch()"
                                        :error-messages="statusErrors">
                                    </v-select> -->
                                     <v-select @change="selectchStatus()" v-model="editedItem.categroyStatus" :items="chnlstatus" item-text="text" item-value="value" label="Status">
                                    </v-select>
                                </v-flex>
                               
                            </v-layout>
                        </v-container>
                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat="flat" large @click="close()">Cancel
                        <!-- <v-icon right dark>highlight_off</v-icon> -->
                    </v-btn>
                    <v-btn :disabled="discatadd" depressed large color="secondary"   @click="saveAndEdit(btnname)"> {{btnname | change-label}}
                        <!-- <v-icon dark right>check_circle</v-icon> -->
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



    </div>
</template>
<script>
import axios from 'axios'
import {
    required,
    minLength,
    between,
    email
} from 'vuelidate/lib/validators'
import onPageLoad from '../common/onProjectLoad'
import loadChannel from '../common/onProjectLoad.js'
var index = 0; // used for put api
var rawChannel = null;          // Raw channel contains all channels without filter
export default {

    created() {
        this.$store.commit('SET_PAGE_TITLE','Resource Category Master');
        let self = this;

        console.log("SKIP DIFF Is ->", this.skipdiffrence);

          loadChannel.getChannel(this, res => {
                    // console.log("mixin channel data" ,  res)
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

                        this.channeldataall.unshift(alldata);

                })

        onPageLoad.getChannel(this, channel => {
            try {
                rawChannel = channel;
                self.Pchanneldata = channel.filter(e => e.active == 1).map(e => { return { state: e.channelName, abbr: e._id } });
            } catch(err) {
                // console.log(err, 'Channel');
            }
        });
        this.user_id = this.getAgentInfo()._id;
        this.getProductCategory(0, this.skip);
    },

    validations: {
        editedItem:{
            categoryName:{
                required,
            },
            categroyStatus:{
                required,
            },
            sequence:{
                required,
            }
        },
      
    },
    mounted(){
        this.headers.map(e =>{
                    e.sortable = false;
        })
    },
    data() {
        return{
            ttl_err:false,
            pageLength:0,
            page:1,
            skipdiffrence:this.paginationdiff(),
            skip:0,
            discatadd:false,
            blank:false,
            channeldata:[],
            value:'',
            channeldatafilter:'all',
            channeldataall:[],
            Pchanneldata:[],
            dialog: false,
            btnname: '',
            user_id: '',
            chanelResponse: [],
            // chnelstatus:[],
            editChanel: {},
            active: '',
            TableIndex: 0,
            rules: [v =>"" || 'Max 15 characters'],
            headers: [
                { text: 'Category ID', value: 'id' },
                { text: 'Sequence No.', value: 'sequence'},
                { text: 'Category Name', value: 'name'},
                // { text: 'Channel', value: 'channel'},
                { text: 'Status', value: 'status' },
                { text: 'Created By', value: 'created_by'},
                { text: 'Created Date', value: 'created_date' },
                { text: 'Updated By', value: 'updated_by'},
                { text: 'Updated Date', value: 'updated_date'},
                { text: 'Action', value: 'action'},
            ],
            tableData: [],
            editedIndex: -1,
            editedItem: {
                categoryName: '',
                channelCode: '',
                categroyStatus: '',
                sequence: '',

            },
            defaultItem: {
                categoryName: '',
                channelCode: '',
                categroyStatus: '',
                categoryID: ''
                // branch_name:'',
                // area:'',
                // city_name:'',
                // state_name:'',
                // region_name:'',
                // zone_name:'',
            },
            chnlstatus: ['InActive', 'Active'],
            chnlstatusIndex: '',
            channelCode: ''
        }
    },
    computed:{
        
       err_name(){

            if(this.editedItem.categoryName.length > 0){
                console.log("from if");
                if(/^[0-9a-zA-z?&, \s]+$/g.test(this.editedItem.categoryName) != true){
                    this.ttl_err = true
                    return "Only alphabets and numbers are allowed"
                }else{
                    this.ttl_err = false
                    return []
                }
            }else{
                console.log("from else directy check on title ", !this.$v.editedItem.categoryName.$dirty);
                const errors = []
                if (!this.$v.editedItem.categoryName.$dirty) return errors
                !this.$v.editedItem.categoryName.required && errors.push('This field is required')
                return errors

            }

       } ,

    objmethod() {

       var self=this;
       return this.chanelResponse.filter(function(cust){return cust.sequence.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
       || cust.resourceCategoryName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
       || cust.created_by_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0  || cust.updated_by_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0

         });
       //return this.customers;
    },

        formTitle() {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle() {
            return this.editedIndex === -1 ? ' Add Resource Category' : 'Edit Resource Category'
        },
        value() {
            console.log(this.value);
        },
        nameErrors() {
            const errors = []
            if (!this.$v.editedItem.categoryName.$dirty) return errors
                !this.$v.editedItem.categoryName.required && errors.push('Product Name is required.')
            return errors
        },
        statusErrors() {
            const errors = []
            if (!this.$v.editedItem.categroyStatus.$dirty) return errors
                !this.$v.editedItem.categroyStatus.required && errors.push('Status is required.')
            return errors
        },
        sequenceError() {
            const errors = []
            if (!this.$v.editedItem.sequence.$dirty) return errors
                !this.$v.editedItem.sequence.required && errors.push('Sequence no is required')
            return errors
        },
        channelCodeEmptie() {
            const errors = []
            if (!this.$v.channelCode.$dirty) return errors
                !this.$v.channelCode.required && errors.push('Channel code is required')
            return errors
        }
    },
    filters: {
        changeLabel(label) {
            return label== 'Update' ? label : 'Submit'
        },
        filterid(id, initial) {
            try {
                if (id == null || id == undefined || id == "") { return id; }
                return initial + id.slice(16, 25).toUpperCase();
            } catch (err) { return id; }
        },
        formateDate(milisecond) {
            try {
                if (milisecond === null || milisecond === undefined || milisecond === "") {
                    return "-" 
                } else {
                    return new Date(parseInt(milisecond)).toLocaleDateString()
                }
            } catch(err) {
                return milisecond;
            }
        }
    },
    methods:{

        res_cat_validation(data, type, field){

                var self = this                
                this.validate_alpha_numeric(data, type, (res, datanew)=>{
                    if(res == true){ 
                        self.editedItem[field] = datanew
                        self.$forceUpdate();
                        return
                    }
                })

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
                this.Getchannel(this.skip)
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
                // this.GetRole(this.channeldatafilter)
                // when API has channel filter, then replace get role with this function => this.getProductCategory() and
                // the paramters/arguments as this.channeldatafilter
            },

        /**
         * @function getProductCategory
         * @description Called when page is loaded
         */
        getProductCategory(filter = 0, skip) {
            // rc99
            var skipis = skip
            console.log("SKIP to get API is ->",skipis);
            let self = this;
            this.showLoader(true);
            var adminID = this.getAgentInfo()._id 

            this.GET('fetch_resource_category/?filter='+filter+'&userId='+adminID+'&skip='+skipis, function(res, error) {
                if (error) {
                    self.showLoader(false);
                    self.showToast('Something went wrong', self.TOST().ERROR);
                    console.log('Error ', error);
                    return;
                }

                // When database fails
                if (res.data.errCode == 4) {
                    self.showLoader(false);
                    self.showToast('Database Error', self.TOST().ERROR);
                    return;
                }

                let temp = [];

                if (res.data.errCode == -1) {

                // Pagination snippet    
                    var pageLen = res.data.errMsg[1]
                    console.log("pagelen ->", pageLen)
                    
                    let totalCount = pageLen[0].count
                    console.log('Page Length:',totalCount)
                    self.pageLength = Math.ceil(totalCount/self.skipdiffrence)


                    console.log("Response is=>", res.data.errMsg)
                     res.data.errMsg[0].forEach((e, index, array) => {
                        temp.push(self.mapNewFields(e, index));
                    });

                    self.chanelResponse = temp.slice(0, temp.length);
                    console.log("FILTERED DATA==>>>", self.chanelResponse);
                    self.showLoader(false);

                    if(typeof cb == 'function') {
                        cb(1);
                    }
                } else {
                    self.showLoader(false);
                    self.showToast('Data not found', self.TOST().INFO);
                }
            });
        },

        fetchById(id, rootIndex) {
            console.log('FROM FETCH BY ID');
            // console.log('Fetch By Id : ', rootIndex);
            let self = this;
            this.showLoader(true);
            this.GET('getprodCategory?categoryId='+id, function(res, error) {

                if (error) {
                    self.showLoader(false);
                    self.showToast('Something goes wrong', self.TOST().ERROR);
                    console.log('Error ', error);
                    return;
                }

                // When database fails
                if (res.data.errCode == 4) {
                    self.showLoader(false);
                    self.showToast('Database Error', self.TOST().ERROR);
                    return;
                }

                let temp =  self.chanelResponse.splice(0, self.chanelResponse.length);

                self.chanelResponse = [];

                if (res.data.errCode == -1) {
                    res.data.errMsg.forEach((e, index, array) => {
                        temp[rootIndex] = self.mapNewFields(e, rootIndex);
                    });


                    // console.log('Temporray Value : ' , temp);

                    self.chanelResponse = temp.splice(0, temp.length);

                } else {
                    self.showToast('Data not found', self.TOST().INFO);
                }

                self.showLoader(false);
            });

        },

        // e.channelCode.hasOwnProperty('channelName') === false ? "-" : ,

        mapNewFields(e, index) {
            // console.log('CHANNEL CODE->', e.channelCode)
            try {
                return {
                    index,
                    _id: e._id == "" || e._id === null || e._id === undefined ? "" : e._id,
                    sequence: e.sequenceNo,
                    resourceCategoryName: e.ResourceCenterName,
                    // channel: e.channelCode,
                    created_by: e.created_by || "-",
                    updated_by: e.updated_by || "-",
                    // channelName: e.hasOwnProperty('channelCodes') ? (e.channelCodes === null || e.channelCodes === "" || e.channelCodes === undefined ? "-" :  e.channelCodes.channelName) : "-",
                    active: e.status === 1 ? "Active" : "Inactive",                                                                                                             
                    created_by_name: e.hasOwnProperty('created_by') === true ? e.created_by == null || e.created_by === undefined ||  e.created_by === "" ? "-" : e.created_by.first_name+' '+e.created_by.last_name : "-",
                    created_date: e.created_date || "-",
                    updated_by_name: e.hasOwnProperty('updated_by') === true ? e.updated_by == null || e.updated_by === undefined || e.updated_by === "" ? "-" : e.updated_by.first_name+' '+e.updated_by.last_name : "-",
                    updated_date: e.updated_date || "-"
                }
            } catch(err) {
                console.log(err)
            }
        },


        selectchStatus() {
            this.chnlstatusIndex = this.chnlstatus.indexOf(this.editedItem.categroyStatus)

            console.log('CHANNELSTATUS ->',this.chnlstatus);
            // console.log('selected==>', this.chnlstatusIndex);
        },

        onRadioOptionChange(evt, data, index) {
            // console.log('yes calling');
            let self = this;
            this.showConfirmDialog('Confirm', 'Are you sure you want to change this?', event => {
                //  on Agree
                if (event == 1) {
                    let formData = {
                        user_Id: this.user_id, // user id
                        prod_id: data._id,  // Product category Id
                        productName: data.productCategoryName,
                        sequence: data.sequence,
                        channelCode: date.channelCode,
                        active: parseInt(data.active)
                    }

                    console.log('PUT ', formData);
                    self.hitPUT_API(formData, index);
                } else if (event == 0) {

                    self.chanelResponse[index].active = evt == "0" ? "1" : "0";
                }
            });
        },

        /**
         * Same function called for all edit and post
         */

        saveAndEdit(_btnname) {
            if (_btnname == 'Add') {
                this.save();
            } else if (_btnname == 'Update') {
                this.updateProductCategory();
            }
        },

        addChannel(){

            this.$v.$reset();
            
            this.discataddv = false;
            this.btnname = 'Add';
            this.editedItem.categoryName = '';
            this.editedItem.categroyStatus = 'InActive'
            this.editedItem.sequence = this.chanelResponse.length+1;
            this.validations = {};
            this.dialog = true;
        },


        editItem(item) {
            this.discataddv = false;
            this.dialog = true
            /**
             * @date 22/1/2019
             * @description Modified code ed99
             */
                console.log('Items to be edited are -> : ', item);
                // return
            // console.log('CHANNEL ID : ', item.channel._id);
            this.TableIndex = item.index
            this.btnname = 'Update'
            this.dialog = true;
            this.editedItem.categoryName = item.resourceCategoryName;
            this.editedItem.categroyStatus = item.active == "Inactive" ? 'InActive': 'Active';
            this.editedItem.sequence = item.sequence;
            // this.channelCode = item.channel._id;
            //    console.log('Items : ', item._id);
            this.editedItem.categoryID = item._id;
            // console.log('CATEGORY ID->', this.editedItem.categoryID);
            // console.log(this.editedItem.sequence , ' Sequence ');
        },

        updateProductCategory() {
          
            // this.$v.$touch()
            // if (this.$v.$invalid == true) {
            //     this.showToast('Mandatory fields are not found', this.TOST().WARNING);
            //     return;
            // } else {

                let code = null;

                if (this.editedItem.categroyStatus === "InActive") {
                    code = 0;
                } else if (this.editedItem.categroyStatus === "Active") {
                    code = 1;
                }

                let sendData = {

                     ResourceCenterName: this.editedItem.categoryName,
                    sequenceNo: this.editedItem.sequence,
                    // channelCode: this.channelCode,
                    status: code, 
                    userId : this.user_id,
                    resourceId:  this.editedItem.categoryID



                    // user_Id: this.user_id,
                    // productName: this.editedItem.categoryName,
                    // sequence: this.editedItem.sequence,
                    // active: code,
                    // // channelCode: this.channelCode,
                    // prod_id: this.editedItem.categoryID
                }
                code = null;
                
                this.hitPUT_API(sendData, this.TableIndex);
            // }
        },

        hitPUT_API(formData, index = 0 ) {

            console.log("FORMDATA is ->", formData );

            console.log(formData, index,  'INCOMING DATA');
            let categoryID = formData.prod_id;
            // console.log('Before CAT_ID', categoryID )
            delete formData.prod_id;
            //   console.log(' AFTER CAT_ID', categoryID )
            let self = this;
            this.PUT('update_resource_category', formData, (res, error) => {
                if (error) {
                    self.showToast('Something goes wrong', self.TOST().ERROR);
                    console.log(error);
                    return;
                }

                if (res.data.errCode == 4) {
                    self.showToast('The entered sequence already exist', self.TOST().ERROR);
                    return;
                }

                if (res.data.errCode == 1) {
                    self.showToast('Mandatory fields are not found', self.TOST().WARNING);
                    return;
                }

                if (res.data.errCode == -1) {
                    // self.fetchById(categoryID, index);
                    console.log("response on PUT ->",res.data.errMsg);
                    self.dialog = false;
                    self.showToast('Category updated successfully', self.TOST().SUCCESS);
                    return;
                }
            });
        },

        deleteItem(index) {
            // const index = this.tableData.indexOf(item)
            // this.cfrDataObj.splice(index, 1);
            // confirm('Are you sure you want to delete this item?') &&
            this.chanelResponse.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)

                this.editedIndex = -1
            }, 300)
        },


        save() {      
//   if(/\s/g.test(this.textis)){
//               this.showToast('Product Name should not be blank', this.TOST().WARNING);
//         }else{
//         }

            console.log('this.ttl_err =>', this.ttl_err)

            this.$v.$touch()
            if(this.$v.$invalid == true) {
                console.log('from invalid true =>');
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                return
            }

            if(this.ttl_err){
                console.log("from ttl error");
                 this.showToast('Please enter valid data', this.TOST().WARNING);
                return
            }

            if(/^\s+$/g.test(this.editedItem.categoryName)) {
                 this.$v.$touch();
                 this.showToast('Please fill all empty fields', this.TOST().WARNING);
                 this.discataddv = false;
                 return
           
               
        }else if(this.editedItem.categoryName == ''){

                 this.$v.$touch();
                 this.showToast('Please fill all empty fields', this.TOST().WARNING);
                 this.discataddv = false;
                 return

        }else {
                this.discataddv = true;
                 this.saveregularflow();
        }
    },
    saveregularflow(){
        //sv99
               this.dialog = false;
                console.log('regular flow called');
                         // if(/\s/g.test(this.editedItem.categoryName)){
                //     console.log('CATEGORY NAME IS->', this.editedItem.categoryName);
                //       this.showToast('Product Name should not be blank', this.TOST().WARNING);
                //       return 
                // }
                // console.log('executing AFTER RETURN ?');
                let code = null;
                if (this.editedItem.categroyStatus === "InActive") {
                    code = 0;
                } else if (this.editedItem.categroyStatus === "Active") {
                    code = 1;
                }

                // Needed Role codes array, userID, 

                let sendData = {
                    ResourceCenterName: this.editedItem.categoryName,
                    sequenceNo: this.editedItem.sequence,
                    // channelCode: this.channelCode,
                    status: code, 
                    userId : this.user_id
                }

                console.log('POST NEW Category ', sendData.active);
                code = null;

                if (this.editedItem.categoryName.length >= 15) {
                    this.showToast('Product Category name is more than 15 characters', this.TOST().ERROR);
                    return;
                }

                // +this.user_id

                let self = this;
                this.POST('new_resource_category', sendData, (res, error) => {

                    if (error) {
                        self.showToast('Something went wrong', self.TOST().ERROR);
                        console.log(error);

                        return;
                    }

                    if (res.data.errCode == 4) {
                        console.log('res.data.errMsg', )
                        if (typeof(res.data.errMsg) == "string") {
                            //  self.showToast('The entreed sequence already exist', self.TOST().WARNING);
                            self.showToast('Database Error', self.TOST().ERROR);
                        } else {
                            self.showToast('This sequence is already exist', self.TOST().WARNING);
                        }
                    }

                    if (res.data.errCode == 1) {
                        self.showToast('Mandatory fields are not found', self.TOST().WARNING);
                        return;
                    }
                    if (res.data.errCode == -1) {

                        // res.data.errMsg.active = res.data.errMsg.active.toString();
                        this.showToast('Category created successfully', self.TOST().SUCCESS);
                        /**Date 4/02/2019
                         * When response comes then we need to get channel object form store with the help of channel Id
                        */

                        console.log('After category is addedd : ', res.data.errMsg);
                        console.log("Calling get to populate table")
                        this.getProductCategory(0, this.skip);
                        //ct99

                        // let filter = 1;
                        // self.getProductCategory(filter, cb_res => {
                        //     if (cb_res == 1) {
                        //         self.showToast('Category created successfully', self.TOST().SUCCESS);
                        //         self.dialog = false;
                        //         // self.commit('SAVE_PRODUCT_CATEGORY', 'clear');

                        //         // The line of code is committing all active cateogry in store and these values will call at product page
                        //         self.chanelResponse.forEach(obj => {
                        //             // Only active products are allowed to save
                        //             // This product categories are shown on product category list in product add module
                        //             if (obj.active == 1) {
                        //                self.commit('SAVE_PRODUCT_CATEGORY', { abbr: obj._id, state: self.doSentenceCase(obj.productCategoryName) } );
                        //             }
                        //         });
                        //     }
                        //});
                        /**
                         * @deprecated 05/02/2019 */
                        // let channels = self.$store.state.chanelDetails;
                        // console.log('Actual API  ', res.data.errMsg);
                        // let selectedChannel = [];
                        // try {
                        //     selectedChannel = channels.filter(e => e.active == 1 && e._id == res.data.errMsg.channelCode).map(e => e );
                        // } catch(err) {
                        //     console.log(err, 'Channel');
                        // }
                        // res.data.errMsg.channelCode = selectedChannel[0];
                        // console.log(res.data.errMsg , 'Modified Reponse');
                        // // instantly push into table
                        // self.chanelResponse.push(res.data.errMsg);
                        // self.commit('SAVE_PRODUCT_CATEGORY', { abbr: res.data.errMsg._id, state: self.doSentenceCase(res.data.errMsg.productCategoryName) } );

                    }
                });
            }
    }
}
</script>
<style>

.err{
    border:1px red solid;
}

.thebtn{
      display:flex;
     align-items:center;
     color:white;
     border-radius:5px;
     font-size:15px;
}

    .category-master p {
        margin: 0;
    }
    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }
    .category-master .v-toolbar__content, .v-toolbar__extension {
        align-items: center;
        display: flex;
        padding: 0;
    }

    .category-master .sd-action-btn-cnter {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .bgclrsource{
        background-color: #fafafa;
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
