<template>
    <div class="category-master">
        <div class="mr-3 ml-3 mb-2 mt-3"> <h3 class="title font-weight-regular">Blog Category</h3></div>
        <hr>
        <v-layout align-center justify-end row class="mt-3 mb-3 mr-2">
            <v-btn large color="#01B4BB" class="white--text" @click="addChannel">Create New Category</v-btn>
        </v-layout>

        <v-data-table
            :headers="headers"
            :items="chanelResponse"
            class="elevation-1 ma-3">
            <template slot="items" slot-scope="props">
                <td>{{ props.item._id | filterid('C')}}</td>
                <td class="text-xs-left">{{ props.item.sequence }}</td>
                <td class="text-xs-left">{{ props.item.blogCategoryName}}</td>
                <td class="text-xs-left"><span :style="{color: props.item.status == 'Inactive' ? '#d61111' : '#13961c'}">{{ props.item.status }}</span></td>
                <td class="text-xs-left">{{ props.item.created_by_name }}</td>
                <td class="text-xs-left">{{ props.item.created_date }}</td>
                <td class="text-xs-left">{{ props.item.updated_by_name }}</td>
                <td class="text-xs-left">{{ props.item.updated_date }}</td>
                <td class="text-xs-left"><v-btn @click="editItem(props.item)" icon><v-icon color="#636363">edit</v-icon></v-btn></td>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card>

                <v-flex style="background-color:#3a3a3a">
                    <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                </v-flex>

                <v-card-text>
                    <form @submit.prevent="saveAndEditBtn(btnname)" ref="form">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md6>
                                    <!-- <v-text-field v-model="editedItem.categoryName" label="Product Category Name"
                                        @input="$v.editedItem.categoryName.$touch()"
                                        @blur="$v.editedItem.categoryName.$touch()"
                                        :error-messages="nameErrors"
                                        :rules="rules"
                                        counter="15"
                                    ></v-text-field> -->
                                     <v-text-field v-model="editedItem.categoryName" label="Blog Category Name" counter="15"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <!-- <v-text-field v-model="editedItem.sequence" label="Sequence"
                                        type="number"
                                        @input="$v.editedItem.sequence.$touch()"
                                        @blur="$v.editedItem.sequence.$touch()"
                                        :error-messages="sequenceError"
                                    ></v-text-field> -->
                                    <v-text-field v-model="editedItem.sequence" label="Sequence"
                                        type="number"
                                    ></v-text-field>
                                </v-flex>
                                <!-- <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="editedItem.channelCode" label="Channel Code"></v-text-field>
                                </v-flex> -->

                                <v-flex xs12 sm6 md6>
                                    <!-- <v-select @change="selectchStatus()" v-model="editedItem.categroyStatus" :items="chnlstatus" item-text="text" item-value="value" label="Status"
                                        @input="$v.editedItem.categroyStatus.$touch()"
                                        @blur="$v.editedItem.categroyStatus.$touch()"
                                        :error-messages="statusErrors">
                                    </v-select> -->
                                     <v-select @change="selectchStatus()" v-model="editedItem.categroyStatus" :items="chnlstatus" item-text="text" item-value="value" label="Status"
                                        >
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6 >
                                    <!-- <v-select
                                        v-model="channelCode"
                                        label="Channel Code"
                                        item-text="state"
                                        item-value="abbr"
                                        :items="Pchanneldata"
                                        @input="$v.channelCode.$touch()"
                                        @blur="$v.channelCode.$touch()"
                                        :error-messages="channelCodeEmptie">
                                    </v-select> -->
                                    <!-- <v-select
                                        v-model="channelCode"
                                        label="Channel Code"
                                        item-text="state"
                                        item-value="abbr"
                                        :items="Pchanneldata"
                                    > -->
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
                    <v-btn flat="flat" large @click="saveAndEdit(btnname)">{{btnname | change-label}}
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
var index = 0; // used for put api
export default {

    created() {
         this.$store.commit('SET_PAGE_TITLE','Blog Category Master');
        // try {
        //     let channels = this.$store.state.chanelDetails;
        //     this.Pchanneldata = channels.filter(e => e.active == 1).map(e => { return { state: e.channelCode, abbr: e._id } });
        // } catch(err) {
        //     console.log(err, 'Channel');
        // }
        this.user_id = this.getAgentInfo()._id;
        this.fetchBlogsCategory();
    },

    validations: {
        editedItem: {
            categoryName: {
                required,
            },
            categroyStatus: {
                required,
            },
            sequence: {
                required,
            }
        },
        // channelCode: {
        //     required,
        // }
    },

    data() {
        return {
            Pchanneldata:[],
            dialog: false,
            btnname: '',
            user_id: '',
            chanelResponse: [],
            // chnelstatus:[],
            editChanel: {},
            active: '',
            TableIndex: 0,
            rules: [v => v.length <= 15 || 'Max 15 characters'],
            headers: [
                {
                    text: 'Category ID',
                    sortable: false,
                    value: 'id'
                },
                { text: 'Sequence No.', value: 'sequence'},
                { text: 'Category Name', value: 'name'},
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
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle() {
            return this.editedIndex === -1 ? ' Add Product Category' : 'Edit Product Category'
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
        // channelCodeEmptie() {
        //     const errors = []
        //     if (!this.$v.channelCode.$dirty) return errors
        //         !this.$v.channelCode.required && errors.push('Channel code is required')
        //     return errors
        // }
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
        }
    },
    methods: {

        /**
         * @function fetchBlogsCategory
         * @description Called when page is loaded
         */
        fetchBlogsCategory(cb = null) {
            let self = this;
            const FETCH_BLOG_CATEGORY = 'fetch_blogCategories?filter=0';

            this.GETUSER(FETCH_BLOG_CATEGORY,
             res => {

                if (res.data.errCode == 4) {
                    self.showToast('Database Error', self.TOST().ERROR);
                    return;
                }
                if (res.data.errCode == 808) {
                    // self.showToast('No blog categories are found', self.TOST().INFO);
                    return;
                }
                // if (res.data.errCode == 808) {
                //     self.showToast('No blog categories are found', self.TOST().ERROR);
                //     return;
                // }

                if (res.data.errCode == -1) {
                    // Convert Integer value to string to bind value properly at radio button
                    self.chanelResponse = res.data.errMsg.map( (obj, index, array) => {
                        // obj.active = obj.active.toString();
                        // return obj;
                        return {
                            index: index,
                            blogCategoryName: obj.blogCategoryName,
                            sequence: obj.sequence,
                            status: obj.active == 0 ? 'Inactive' : 'Active',
                            _id: obj._id,
                            updated_by_id: obj.updated_by._id,
                            updated_by_name: obj.updated_by.first_name+' '+obj.updated_by.last_name,
                            created_by_id: obj.created_by._id,
                            created_by_name: obj.created_by.first_name+' '+obj.created_by.last_name,
                            created_date: new Date(parseInt(obj.created_date)).toLocaleDateString(),
                            updated_date: new Date(parseInt(obj.updated_date)).toLocaleDateString()
                        }
                    });

                    console.log('All Product category List ', self.chanelResponse);
                    if (typeof cb == 'function') {
                        cb(1, res.data.errMsg);
                    }
                }
            })
            .catch(err => {
                console.log(err);
                self.showToast('Something goes wrong', self.TOST().ERROR);
            });
        },


        selectchStatus() {
            this.chnlstatusIndex = this.chnlstatus.indexOf(this.editedItem.categroyStatus)
            console.log('select==>', this.chnlstatusIndex)

        },
        onRadioOptionChange(evt, data, index) {
            console.log('yes calling evt' + evt);
            let self = this;
            this.showConfirmDialog('Confirm', 'Are you sure you want to change this?', event => {
                //  on Agree
                console.log('Radio Event' , event);
                if (event == 1) {
                    let formData = {
                        categoryId: data._id,  // Product category Id
                        categoryName: data.blogCategoryName,
                        sequence: data.sequence,
                        // channelCode: date.channelCode,
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

        addChannel() {
            this.btnname = 'Add';
            this.editedItem.categoryName = '';
            this.channelCode = '';
            this.editedItem.categroyStatus = '';
            this.editedItem.sequence='';
            this.validations = {};
            this.dialog = true;
        },
        editItem(item) {

            /**
             * @date 22/1/2019
             * @description Modified code
             */
            console.log('Items : ', item);
            this.TableIndex = item.index;
            this.btnname = 'Update'
            this.dialog = true;
            this.editedItem.categoryName = item.blogCategoryName;
            this.editedItem.categroyStatus = item.status == "Inactive" ? 'InActive': 'Active';
            this.editedItem.sequence = item.sequence;
            // this.channelCode = item.channelCode._id,
            this.editedItem.categoryID = item._id;
        },

        updateProductCategory(item) {

            this.$v.$touch()
            if (this.$v.$invalid == true) {
                this.showToast('Mandatory fields are not found', this.TOST().WARNING);
                return;
            } else {

                let code = null;

                if (this.editedItem.categroyStatus === "InActive") {
                    code = 0;
                } else if (this.editedItem.categroyStatus === "Active") {
                    code = 1;
                }

                let sendData = {
                    categoryName: this.editedItem.categoryName,
                    sequence: this.editedItem.sequence,
                    active: code,
                    // channelCode: this.channelCode,
                    categoryId: this.editedItem.categoryID
                }
                code = null;

                this.hitPUT_API(sendData, this.TableIndex);
            }
        },

        hitPUT_API(formData, index = 0 ) {

            // let categoryID = formData.prod_id;
            // delete formData.prod_id;

            console.log('formData : ', formData);

            let self = this;
            this.PUT('update_blog_category/'+this.user_id, formData, (res, error) => {
                if (error) {
                    self.showToast('Something goes wrong', self.TOST().ERROR);
                    console.log(error);
                    return;
                }

                if (res.data.errCode == 4) {
                    self.showToast('Database Error', self.TOST().ERROR);
                    return;
                }

                if (res.data.errCode == 1) {
                    self.showToast('Mandatory fields are not found', self.TOST().WARNING);
                    return;
                }

                if (res.data.errCode == 88) {
                    self.showToast('User not found', self.TOST().INFO);
                    return;
                }

                if (res.data.errCode == -1) {
                    /**
                     * @date 26/02/2019
                     * @author Usama
                     */
                    res.data.errMsg.active = res.data.errMsg.active.toString();
                    /**
                     * @deprecated
                     */
                    // let channels = self.$store.state.chanelDetails;
                    // let selectedChannel = [];
                    // try {
                    //     selectedChannel = channels.filter(e => e.active == 1 && e._id == res.data.errMsg[0].channelCode).map(e => e );
                    // } catch(err) {
                    //     console.log(err, 'Channel');
                    // }

                    console.log('Modified API  ', res.data.errMsg);
                    // res.data.errMsg[0].channelCode = selectedChannel[0];
                    // self.chanelResponse[index] = res.data.errMsg;
                    self.dialog = false;
                    self.showToast('Category updated successfully', self.TOST().SUCCESS);

                    /**
                     * Fetch Latest blog category from db
                     */
                    self.fetchCategoryById(res.data.errMsg._id)
                    return;
                }
            });
        },

        fetchCategoryById(c_id) {
            let self = this;
            const FETCH_CATEGORY_BY_ID = 'fetch_category_By_Id?userId='+this.user_id+'&categoryId='+c_id;

            this.GET(FETCH_CATEGORY_BY_ID, (res, err) => {
                if (!err) {
                    if (res.data.errCode == 399) {
                        self.showToast('No Category found', self.TOST().INFO);
                        return;
                    }

                    if (res.data.errCode == 4) {
                        self.showToast('Database Error', self.TOST().ERROR);
                        return;
                    }
                    if (res.data.errCode == 1) {
                        self.showToast('User not register', self.TOST().INFO);
                        return;
                    }
                    if (res.data.errCode == 397) {
                        self.showToast('Category ID not found in the URL', self.TOST().WARNING);
                        return;
                    }
                    if (res.data.errCode == 395) {
                        self.showToast('User ID not found in the URL', self.TOST().WARNING);
                        return;
                    }
                    if (res.data.errCode == -1) {
                        console.log('After getting resp : ' , res);
                        let _clonning = self.chanelResponse.slice(0, self.chanelResponse.length);
                        res = res.data.errMsg;
                        _clonning[self.TableIndex] = {
                            index: self.TableIndex,
                            blogCategoryName: res.blogCategoryName,
                            sequence: res.sequence,
                            status: res.active == 0 ? 'Inactive' : 'Active',
                            _id: res._id,
                            updated_by_id: res.updated_by._id,
                            updated_by_name: res.updated_by.first_name+' '+res.updated_by.last_name,
                            created_by_id: res.created_by._id,
                            created_by_name: res.created_by.first_name+' '+res.created_by.last_name,
                            created_date: new Date(parseInt(res.created_date)).toLocaleDateString(),
                            updated_date: new Date(parseInt(res.updated_date)).toLocaleDateString()
                        }

                        /**
                         * commit modified catgory which is active, in store
                         */

                        self.commit('SAVE_BLOGS_CATEGORY', 'clear');
                        _clonning.forEach(obj => {
                            if (obj.status == 'Active') {
                                self.commit('SAVE_BLOGS_CATEGORY', { abbr: obj._id, state: self.doSentenceCase(obj.blogCategoryName)});
                            }
                        });

                        self.chanelResponse = _clonning;
                        // _clonning = undefined;
                    }
                } else {
                    console.log(err);
                    self.showToast('Something goes wrong', self.TOST().ERROR);
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
            this.$v.$touch()
            if (this.$v.$invalid == true) {
                this.showToast('Mandatory fields are not found', this.TOST().WARNING);
            } else {

                let code = null;

                if (this.editedItem.categroyStatus === "InActive") {
                    code = 0;
                } else if (this.editedItem.categroyStatus === "Active") {
                    code = 1;
                }

                console.log(this.channelCode, 'channel Code');

                let sendData = {
                    categoryName: this.editedItem.categoryName,
                    sequence: this.editedItem.sequence,
                    // channelCode: this.channelCode,
                    active: code
                }

                console.log('POST NEW Category ', sendData);
                code = null;

                if (this.editedItem.categoryName.length >= 15) {
                    this.showToast('Blog category name is more than 15 characters', this.TOST().ERROR);
                    return;
                }

                let self = this;
                this.POST('blog_category/'+this.user_id, sendData, (res, error) => {

                    if (error) {
                        self.showToast('Something goes wrong', self.TOST().ERROR);
                        console.log(error);
                        return;
                    }

                    if (res.data.errCode == 4) {
                        if (typeof(res.data.errMsg) == "string") {
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
                        res.data.errMsg.active = res.data.errMsg.active.toString();

                        /**Date 4/02/2019
                         * When response comes then we need to get channel object form store with the help of channel Id
                         */

                        self.fetchBlogsCategory( (cb_res, data) => {
                            if (cb_res == 1) {
                                self.showToast('Category created successfully', self.TOST().SUCCESS);
                                self.dialog = false;
                                self.commit('SAVE_BLOGS_CATEGORY', 'clear');
                                console.log();
                                data.forEach(obj => {
                                    // Only active products are allowed to save
                                    // This product categories are shown on product category list in product add module
                                    console.log('Obj =>  ' , obj);
                                    if (obj.active == 1) {
                                        self.commit('SAVE_BLOGS_CATEGORY', { abbr: obj._id, state: self.doSentenceCase(obj.blogCategoryName)});
                                    }
                                });
                            }
                        });

                        /**
                         * @deprecated 05/02/2019
                         */
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
}
</script>
<style>
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
