<template>
    <div class="product-page">
        <v-layout align-center justify-space-between row fill-height class="mr-3 ml-3 mb-2 mt-3">
             <h3 class="title font-weight-regular">New Blog</h3>
             <v-btn large color="#01B4BB" class="white--text" @click="changeFunctionality('New Product')">New Blog</v-btn>
        </v-layout>
         <hr>
        <div v-show="formShow == true" class="mr-3 ml-3 mb-4 mt-3">
            <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1" color="#01B4BB">Upload Data</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2" color="#01B4BB">Upload Media</v-stepper-step>
                    <!-- <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 3" step="3" color="#01B4BB">Upload Files</v-stepper-step> -->
                </v-stepper-header>
                <v-stepper-items>
                    <!-- Page 1 -->
                    <v-stepper-content step="1">
                        <!-- <v-card class="mb-5"> -->
                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Blog Category :</p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select
                                        v-model="frmOne.productType"
                                        :items="productCategory"
                                        item-text="state"
                                        item-value="abbr"
                                        label="Select"
                                        persistent-hint
                                        return-object
                                        single-line
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <!-- <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Role :</p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select
                                        v-model="frmOne.role"
                                        :items="rolesList"
                                        item-text="state"
                                        item-value="abbr"
                                        placeholder="Select role code"
                                        @change="changeRoleCode"
                                        persistent-hint
                                        return-object
                                        single-line
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Channel Code :</p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select
                                        v-model="channelCode"
                                        :items="channelList"
                                        item-text="state"
                                        item-value="abbr"
                                        label="Select"
                                        @change="onChannelChange"
                                        persistent-hint
                                        return-object
                                        single-line
                                    ></v-select>
                                </v-flex>
                            </v-layout> -->
                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Blog Title : </p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        label=""
                                        v-model="frmOne.productName"
                                        placeholder="Enter blog title here..."
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Blog Status : </p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-radio-group v-model="active" row>
                                        <v-radio label="Active"   value="1" color="success"></v-radio>
                                        <v-radio label="Inactive" value="0" color="red"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                            </v-layout>

                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Publish : </p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-radio-group v-model="publish" row>
                                        <v-radio label="Yes"   value="1" color="success"></v-radio>
                                        <v-radio label="No" value="0" color="orange"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                            </v-layout>

                            <v-layout column class="mt-4 mb-4">
                                <v-flex xs12 md2 class="mt-4 mb-2">
                                    <p class="body-2">Blog Description :</p>
                                </v-flex>
                                <v-flex xs12 md2>
                                    <v-textarea
                                        outline
                                        name="input-7-4"
                                        auto-grow
                                        label="write blog here..."
                                        v-model="frmOne.description"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>

                            <!-- <v-flex xs12 md2 class="mb-3">
                                <p class="body-2 sd-light-cyan">5 Reasons to buy Product : </p>
                            </v-flex>

                            <v-container fluid grid-list-md>
                                <v-layout row wrap>
                                    <v-flex d-flex xs12 sm6 md5 class="ma-2 mr-4">
                                        <v-layout align-center row>
                                            <v-avatar color="#01B4BB" size="35" class="mr-4">
                                                <span class="white--text subheading">1</span>
                                            </v-avatar>
                                            <v-textarea
                                                v-model="frmOne.reasons1"
                                                auto-grow
                                                label=""
                                                rows="1"
                                                placeholder="Please enter reason 1"
                                            ></v-textarea>
                                        </v-layout>
                                    </v-flex>

                                    <v-flex d-flex xs12 sm6 md5 class="ma-2 ml-4">
                                        <v-layout align-center row>
                                            <v-avatar color="#01B4BB" size="35" class="mr-4">
                                                <span class="white--text subheading">2</span>
                                            </v-avatar>
                                            <v-textarea
                                                v-model="frmOne.reasons2"
                                                auto-grow
                                                label=""
                                                rows="1"
                                                placeholder="Please enter reason 2"
                                            ></v-textarea>
                                        </v-layout>
                                    </v-flex>

                                    <v-flex d-flex xs12 sm6 md5 class="ma-2 mr-4">
                                        <v-layout align-center row>
                                            <v-avatar color="#01B4BB" size="35" class="mr-4">
                                                <span class="white--text subheading">3</span>
                                            </v-avatar>
                                            <v-textarea
                                                v-model="frmOne.reasons3"
                                                auto-grow
                                                label=""
                                                rows="1"
                                                placeholder="Please enter reason 3"
                                            ></v-textarea>
                                        </v-layout>
                                    </v-flex>

                                    <v-flex d-flex xs12 sm6 md5 class="ma-2 ml-4">
                                        <v-layout align-center row>
                                            <v-avatar color="#01B4BB" size="35" class="mr-4">
                                                <span class="white--text subheading">4</span>
                                            </v-avatar>
                                            <v-textarea
                                                v-model="frmOne.reasons4"
                                                auto-grow
                                                label=""
                                                rows="1"
                                                placeholder="Please enter reason 4"
                                            ></v-textarea>
                                        </v-layout>
                                    </v-flex>

                                    <v-flex d-flex xs12 sm6 md5 class="ma-2 mr-4">
                                        <v-layout align-center row>
                                            <v-avatar color="#01B4BB" size="35" class="mr-4">
                                                <span class="white--text subheading">5</span>
                                            </v-avatar>
                                            <v-textarea
                                                v-model="frmOne.reasons5"
                                                auto-grow
                                                label=""
                                                rows="1"
                                                placeholder="Please enter reason 5"
                                            ></v-textarea>
                                        </v-layout>
                                    </v-flex>

                                </v-layout>
                            </v-container> -->
                            <!-- </v-card> -->
                            <v-btn color="#01B4BB" class="white--text" @click="showDescription">Continue</v-btn>
                            <v-btn flat style="background-color: #F5F5F5" @click="changeFunctionality('Close')">Close</v-btn>
                    </v-stepper-content>

                    <!-- Page 2 -->

                    <v-stepper-content step="2">
                        <!-- <v-layout align-center d-flex>
                            <v-flex xs12 md3>
                                <p class="body-2">Video Title : </p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    label=""
                                    v-model="videoTitle"
                                    placeholder="Enter title for product video"
                                ></v-text-field>
                            </v-flex>
                        </v-layout> -->

                        <!-- <v-layout align-center row wrap class="mb-3">
                            <v-flex xs12 sm6 md6>
                                <p class="body-2 mb-3">Please upload product video from local:</p>
                                <v-layout align-center row wrap>
                                    <v-flex xs4 sm6 md2>
                                        <input type="file" name="media_upload" ref="prodVideo" accept="video/*" class="sd-img-btn-size media-pos" style="opacity: 0" @change="handleFileUpload"/>
                                        <img src="../../assets/Group_968.png" class="sd-img-btn-size"/>
                                    </v-flex>
                                    <v-flex xs6 sm3>
                                        <p class="caption font-italic font-weight-medium" style="color:#9B9B9B">Supports mp4 format. Approx time to upload 2mb file - 30 min</p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <p class="body-2 mb-3">Add Youtube URL:</p>
                                <v-layout align-center row wrap v-if="visible == true">
                                    <v-flex xs4 sm6 md2 @click="visible = false">
                                        <img src="../../assets/Group_971.png" class="sd-img-btn-size" />
                                    </v-flex>
                                    <v-flex xs6 sm3>
                                        <p class="caption font-italic font-weight-medium" style="color:#9B9B9B">Supports mp4 format. Appr ox time to upload 2mb file - 30 min</p>
                                    </v-flex>
                                </v-layout>
                                <v-layout column v-else>
                                    <v-flex xs12 md2>
                                        <p class="body-2">Video URL : </p>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                            label=""
                                            :error="URLWrong"
                                            :error-messages="errMsg"
                                            @change="URLValidate"
                                            v-model="videoURL"
                                            :clearable="true"
                                            placeholder="Enter URL here"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout> -->

                        <!-- Duplicate of above code -->
                        <!-- @depreciation 07/02/2018  -->
                        <!-- <v-layout align-center row>
                            <v-flex xs12 md3><p class="body-2">Please choose product video from the list:</p></v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select
                                    :value="videoName"
                                    :items="videoList"
                                    placeholder="Choose the video"
                                    @change="createVideoObject"
                                ></v-select>
                            </v-flex>
                        </v-layout> -->

                        <v-layout align-center d-flex>
                            <v-flex xs12 md3>
                                <p class="body-2">Image Title : </p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    label=""
                                    v-model="imageTitle"
                                    placeholder="Enter title for product image"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-flex xs12 md3 class="mb-3">
                            <p class="body-2">Upload plan works images :</p>
                        </v-flex>

                        <v-layout row wrap align-center style="cursor:pointer" class="mb-4">
                            <input ref="planPictures" name="media_upload" type="file" accept="image/x-png,image/jpeg" class="dragFile" @change="handleFileUpload"/>
                            <v-layout align-center justify-center row fill-height class="grey lighten-4 sd-upload-img-sec mr-2">
                                <v-flex xs2 >
                                    <p class="body-2 text-md-center label-color">{{planImages.text}}</p>
                                    <!-- <v-text class="body-2 text-md-center label-color" v-else>{{fileEvent.target.files[0].name}}</v-text> -->
                                </v-flex>
                            </v-layout>

                            <v-flex xs2 @click="validateFiles(2)">
                                <img src="../../assets/Group_971.png" class="sd-img-btn-size"/>
                            </v-flex>
                        </v-layout>
                        <!-- tables -->
                        <v-card color="grey lighten-4" class="mb-4" flat tile v-if="productMedia.length > 0" >
                            <v-toolbar dense>
                                <v-layout row fill-height>
                                    <v-flex  xs2 style="background-color: #01B4BB" d-flex align-center justify-center>
                                        <v-toolbar-title style="color:white" class="subheading text-md-center">Video/Image</v-toolbar-title>
                                    </v-flex>
                                    <v-flex  xs10 style="background-color: #01B4BB" d-flex align-center justify-center>
                                        <v-toolbar-title style="color:white"  class="subheading text-md-center">File Name</v-toolbar-title>
                                    </v-flex>
                                    <v-flex  xs4 style="background-color: #01B4BB" d-flex align-center justify-center>
                                        <v-toolbar-title style="color:white"  class="subheading text-md-center">Status</v-toolbar-title>
                                    </v-flex>
                                    <v-flex  xs2 style="background-color: #3E3E3E" d-flex align-center justify-center>
                                        <v-toolbar-title style="color:white" class="subheading text-md-center">Action</v-toolbar-title>
                                    </v-flex>
                                </v-layout>
                            </v-toolbar>

                            <v-layout row v-for="(media, index) in productMedia" :key="index">
                                <v-flex  xs2 class="sd-row-tb-img pa-2" style="background-color: #01B4BB">
                                    <img v-if="media.fileType !== 'mp4'" :src="media.thumbnail" class="sd-tb-row-img" @click="openLightBox(media)"/>
                                    <!-- for thumbnail -->
                                    <video v-else pause @click="openLightBox(media)" class="sd-tb-row-img">
                                        <source :src="media.thumbnail" type="video/mp4">
                                        <source :src="media.thumbnail" type="video/ogg">
                                        Your browser does not support the video tag.
                                    </video>
                                </v-flex>
                                <v-flex  xs10 d-flex align-center justify-center class="pa-2">
                                    <p class="body-1 text-md-center" style="color:#757575">{{media.fileName}}</p>
                                </v-flex>
                                <v-flex  xs4 d-flex align-center justify-center class="pa-2">
                                    <v-radio-group v-model="media.active" row justify-center xs2 @change="handleMediaActivationDeactivation($event, index)">
                                        <v-radio label="Active" value="1" color="success"></v-radio>
                                        <v-radio label="Inactive" value="0" color="red"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                                <v-flex  xs2 d-flex align-center justify-center class="pa-2">
                                    <!-- <div class="sd-action-btn-cnter"><v-btn icon><v-icon>more_vert</v-icon></v-btn></div> -->
                                    <!-- <input type="file" ref="editFiles" class="edit-btn-files" accept="image/x-png, image/jpeg, video/*" @change="handleFileUpload($event, 'edit', index)"/> -->
                                    <!-- <div class="sd-action-btn-cnter"><v-btn small color="#01B4BB" class="white--text" @click="onEditVideoFiles(media)">edit</v-btn></div> -->
                                    <edit-file accept="image/x-png, image/jpeg, video/*" @onFileChange="handleFileUpload($event, 'edit', index)"></edit-file>
                                </v-flex>
                            </v-layout>
                        </v-card>

                        <v-layout align-center justify-space-between row fill-height>
                            <div>
                                <v-btn color="#01B4BB" class="white--text" @click="pushDataIntoDB">SUBMIT</v-btn>
                                <v-btn flat style="background-color: #F5F5F5" @click="e1 = 1">Back</v-btn>
                            </div>
                            <v-btn flat style="background-color: #F5F5F5" @click="changeFunctionality('Close')">Close</v-btn>
                        </v-layout>
                    </v-stepper-content>
            </v-stepper-items>
            </v-stepper>
        </div>

        <v-dialog v-model="dialog" max-width="650">
            <v-card>

                <!-- <img v-if="lightBox.ext == 'png' || lightBox.ext == 'jpg' || lightBox.ext == 'jpeg'" :src="lightBox.imagePath" width="100%"/> -->
                <!-- <video v-else id="mediaPlayer" width="100%" :src="lightBox.imagePath" controls>
                    Your browser does not support HTML5 video.
                </video> -->
                <img :src="lightBox.imagePath" width="100%"/>
            </v-card>
        </v-dialog>

        <div class="ml-3 mt-4 mb-4">
            <h3 class="title font-weight-regular">Blog List</h3>
        </div>
        <hr>
        <!-- <div class="mr-3 ml-3 mb-4 mt-3" v-show="showCard == true"> -->
        <div class="mr-3 ml-3 mb-4 mt-3">
            <bloglist ref="plist" :callback="pushDataIntoDB" :modified-reponse="updatedReponse" @on-edit="dataLoading" @onNotFound="showCard = $event"></bloglist>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import bloglist from './blog-list'
import support from './fetchBlogs'
import onPageLoad from '../../common/onProjectLoad'
import editFile from './edit-file-button'
import _ from 'lodash'

let productCategory = [];

const language = [
    { state: 'English', abbr: 'eng' },
    { state: 'Hindi', abbr: 'hindi' },
    { state: 'Marathi', abbr: 'marathi' },
    { state: 'Tamil', abbr: 'tamil' },
    { state: 'Gujrati', abbr: 'gujrati' }
];

const brouchersType = [
    { state: 'PDF', abbr: 'pdf' },
    { state: 'PPT', abbr: 'ppt' }
];

const fileCategoriesList = [];

const videoList = [
    'Life_Insurance_101',
    'Health_insurance',
    'General_Insurance_and_Life_Insurance'
];

const fileList = [
    "mip-brochure",
    "sampoorna_raksha",
    "tata_aia_life_insurance_investone_brochure",
    "vital_care_pro"
];

var common = 'Drag files here to upload'
var btnLabels = [ 'New Product', 'Close'];
let mixin = null;

export default {
    components: {
        bloglist,
        editFile
    },
    created() {

         this.$store.commit('SET_PAGE_TITLE','Blog');

        /**
         * @function setProducts
         * @param {*} this
         * @description This function helps to get values from the store and set to all data fields.
         */
        // this.commit('SAVE_PRODUCTS', {});
        // support.setProducts(this);
    },
    beforeMount() {
    },
    mounted() {
        // this.rolesList = mixin.getStore('fetchRoleCodes');

        // // get channel from store and filter according to need
        // let channels = this.$store.state.chanelDetails;

        // try {
        //     this.channelList = channels.filter(e => e.active == 1).map(e => { return { state: e.channelCode, abbr: e._id } });
        //     // this.channelCode = this.channelList[0]
        //     // console.log('Channel Code' , this.channelCode);
        // } catch(err) {
        //     console.log(err, 'Channel');
        // }
    },
    data () {
        return {
            e1: 1,
            visible: true,
            productCategory,
            language,
            fileCategoriesList,
            brouchersType,
            rolesList: [],
            channelList: [],
            videoList,
            fileList,
            videoName: '',
            slctFile: '',
            active: '1',      // Active or inactive, used in radio group
            formShow: false,
            edit: false,
            showCard: false,
            switchedButton: btnLabels[0],
            imageTitle: '',
            videoTitle: '',
            channelCode: '',
            blogID: '',
            publish: '0',
            editor: {
                // ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                }
            },
            frmOne: {
                productType: productCategory[0],
                productName: null,
                description: '',
                role: '',
                reasons1: '',
                reasons2: '',
                reasons3: '',
                reasons4: '',
                reasons5: '',
                _lang: language[0]
            },
            fileCategory: '',
            broucherType: brouchersType[0],
            brochures: {
                text: common,
                file: '',
                respFileName: '',
                respFileType: ''
            },
            planImages: {
                text: common,
                file: '',
                respFileName: '',
                respFileType: ''
            },
            productVideo: {
                text: common,
                file: '',
                respFileName: '',
                respFileType: ''
            },
            dialog: false,
            videoURL: '',
            lightBox: {
                imagePath: '',
                ext: ''
            },

            productMedia: [],
            brochuresDetails: [],
            URLWrong: false,
            errMsg: [],
            diff: 0,  // for image and 1 for video,
            httpMethod: 'POST',
            confirm: false,
            // new property for handling file edit process
            editEnable: {
                bool: false,
                location: null
            },
            updatedReponse: {}          // store updated reponse when blog is updated
        }
    },
    watch: {
        'frmOne._lang'(newVal, oldVal) {
            // console.log('New Val : ' , newVal);
            // Future used
        },
        dialog(_new_, _old_) {
            try {
                let ref = document.getElementById('mediaPlayer');
                if (this.dialog == false) {
                    ref.pause();
                }

            } catch(err) {
                console.log(err);
            }
        }
        // active(newVal, oldVal) {
        //     console.log(newVal + ' New');
        //     console.log(oldVal + ' OLD');
        // }
    },
    methods: {
        dataLoading() {
            this.e1 = 1;   // goto start page
            this.resetForm();
            this.httpMethod = 'PUT';
            this.formShow = this.edit = true;       // the edit key identifies us to user pressed edit button for updation
            productCategory = this.productCategory = this.getStore('getBlogsCategoryList');

            let blogCategoryId = this.getStore('fetchBlog').category._id;
            /**
             * @date 01/03/2019
             * @author Khan Usama
             *
             * @description
             */
            if (productCategory.length !== 0) {
                let index = productCategory.findIndex(e => e.abbr == blogCategoryId);
                if (index == -1) {
                    /**
                     * @returns 1 onAgree and 0 Disagree
                     */
                    this.showConfirmDialog('Alert', 'This blog category is currently inactive. Please activate it to make any further changes', 'alert', evt => {
                        if (evt == 1) {}
                    });
                } else {
                    support.setProducts(this);
                }
            } else {
                this.showToast('Please create blog category first or activate existing categories', this.TOST().INFO);
            }
        },

        changeRoleCode(event) {
            this.frmOne.role = event;
            console.log(this.frmOne.role , ' Roles Code');
        },
        onChannelChange(event) {
            this.channelCode = event;
            console.log(this.channelCode , ' Channel Code');
        },
        /**
         * Make video upload object
         * Only for demo purpose
         *
         * @deprecated 07/02/2019
         * Note: Dont-remove it
         */
        // createVideoObject(event) {
        //     this.videoName = event;
        //     let customTypes = {
        //         fileName: event+".mp4",
        //         fileType: "mp4",
        //         active: "1"
        //     }
        //     console.log('custom Type : ' , customTypes);
        //     let _this = this;
        //     this.showMediaIntoTable(customTypes).then( resp => {
        //         _this.videoName = null;
        //         _this.editEnable.bool = false;
        //     });
        // },
        /** @deprecated 07/02/2019 */

        // makeObjectSameAsResponse(event) {
        //     this.slctFile = event;
        //     let customFileTypes = {
        //         fileName: event+".pdf",
        //         fileType: "pdf",
        //         active: "1"
        //     }
        //     console.log('custom File Type : ' , customFileTypes);
        //     let _this = this;
        //     this.showProductBrochuresIntoTable(customFileTypes, this.frmOne._lang.state, this.broucherType.state, this.fileCategory).then(res => {
        //         _this.editEnable.bool = false;
        //         _this.slctFile = null;
        //     });
        // },

        /**
         * This was only for demo
         * @deprecated 07/02/2019
         */

        // onEditVideoFiles(obj) {
        //     console.log(obj)
        //     this.editEnable.bool = true;
        //     this.videoName = obj.fileName.split('.')[0];
        // },

        /**
         * This was only for demo
         * @deprecated 07/02/2019
         */
        // onFileEdit(obj) {
        //     console.log(obj)
        //     this.editEnable.bool = true;
        //     this.slctFile = obj.fileName.split('.')[0];
        // },


        onFileCetgoryChange(event) {
            // Lodash
            // console.log(event, 'Not found');
            this.fileCategory = event;

            if (event == null || event == '') {} else {
                let isFound = _.findIndex(this.fileCategoriesList, function(o) { return o ==  event});
                console.log(isFound, 'dkddkd');
                if (isFound == -1) {
                    let self = this;
                    this.showConfirmDialog('Confirm', 'Are you sure you want to create new category name?', evt => {
                        evt == 1 ? self.confirm = true : '';
                        console.log(self.confirm);
                    });
                }
            }
            // console.log('Event : ', event );
            // console.log('Data Field : ', this.fileCategory);
        },
        /**
         * Date:28/01/2019
         * @function handleMediaActivationDeactivation
         */
        handleMediaActivationDeactivation(event, index = 0, mediaType = "media") {
            let self = this;
            this.showConfirmDialog('Confirm', 'Are you sure you want to create new category name?', evt => {
                if (evt == 1) {
                    mediaType == "media" ? self.productMedia[index].active = event : mediaType == "files" ? self.brochuresDetails[index].active = event : ''
                } else if (evt == 0) {
                    mediaType == "media" ? self.productMedia[index].active = (event == "0" ? "1" : "0") : mediaType == "files" ? self.brochuresDetails[index].active = (event == "0" ? "1" : "0") : ''
                }
            });
        },

        changeFunctionality(btnName) {
            this.edit = false;
            console.log(btnName);
            if (btnName.localeCompare(btnLabels[0]) == 0) {
                this.formShow = true;
                this.switchedButton = btnLabels[1];
                this.e1 = 1;
                this.httpMethod = 'POST';
                this.resetForm();
                this.$refs.plist.resetValues();
                mixin = this;
                // this.fileCategoriesList = mixin.getStore('getFileUploadCategory');
                productCategory = this.productCategory = mixin.getStore('getBlogsCategoryList');
                console.log('Product Categories : ' , productCategory);
            } else if (btnName.localeCompare(btnLabels[1]) == 0) {
                this.formShow = false;
                this.switchedButton = btnLabels[0];
            }
        },
        URLValidate(evt) {
            this.errMsg = [];
            // var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            // this.URLWrong = re.test(evt) == false ? true : false;
            // if (this.URLWrong == true) {
            //     this.errMsg.push('Please enter correct URL');
            // }
            /**
             * @author Khan Usama
             * @description YouTube URL validation
             */
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            this.URLWrong = evt.match(regExp) == null ? true : false;  // here true mean URL is not a valid
            if (this.URLWrong == true) {
                this.errMsg.push('Please enter correct YouTube URL');
            }
        },

        /**
         * 10/12/2018
         * @function validateFiles
         * @param {*} id
         * @description This function is common for all file upload which is used in this file
         * so here I have used id to indicated which is this.
         *
         * Note: It validate require file type it means we only accept eg: if we want to upload file so we accept only
         * PDF and PPtx. the same case is used in images upload which is related to product
         */

        validateFiles(id) {
            let sendFile = {};

            console.log(this.productMedia);

            /**
             * Validation of protecting user from uploading multipule files from e1 == 2 it means page 2
             * @description At page 2 we have two or three media uploading end points are available.
             * 1) Video upload from users local directory
             * 2) Video upload from youtube (User insert youtube link)
             * 3) And the third one is image uploading
             *
             * But our requirment is to upload one video file and one image. In video's, user either choose youtube link or local directory.
             *
             * Helping point: When file is uplaoded successfully the file details are stored into productMedia fields which belongs to data
             * property.
             * So we used product media for conditions.
             */

            if (this.e1 == 2 && id == 2) {

                /**
                 * Validation on upload button
                 * for eg if user pressed upload button without choosing any file so it will give an error
                 */

                if (this.planImages.text === common) {
                    this.showToast('Please, select file first', this.TOST().INFO);      // Show message when user not selected file yet
                } else {
                    // next process

                    // Date 9/JAN/2019
                    // Condition modified for multiple image upload =>  Modified date 1/30/2019
                    // Note: Why this condition is here ? Because first I have fix (only admin can upload one images) only I removed -1 to 1

                    // if (this.productMedia.findIndex(file => file.fileType == 'jpeg' || file.fileType == 'png') == 1 && this.editEnable.bool == true) {
                    //     this.showToast('You can\'t upload new image. Please modified existing one', this.TOST().INFO);
                    //     return;
                    // }

                    if(this.productMedia.length > 0 && this.editEnable.bool == false) {
                        this.showToast('You can\'t upload new image. Please modified existing one', this.TOST().INFO);
                        return;
                    }

                    var regex_PIC = new RegExp('^(jpeg|png)$');
                    sendFile = this.planImages.file;
                    if (regex_PIC.test(sendFile.type.split("/")[1])) {
                        this.showLoader('Uploading', true);
                        this.submitFile(sendFile);
                    } else {
                        this.showToast('You can\'t upload this file type from here', this.TOST().WARNING);
                    }
                }

            } else if (this.e1 == 3 && id == 3) {  // upload brochures files

                /**
                 * Validation on upload button
                 * for eg if user pressed upload button withou choosing any file so it will give an error
                 */

                if (this.brochures.text === common) {
                    this.showToast('Please, select file first', this.TOST().INFO);      // Show message when user not selected file yet
                } else {

                    var regex_FILE = new RegExp('^(pdf|pptx)$');
                    sendFile = this.brochures.file;
                    if (regex_FILE.test(sendFile.name.split(".")[1])) {
                        if (this.broucherType.abbr == 'pdf' && sendFile.name.split(".")[1] == 'pdf') {
                            this.showLoader('Uploading', true);
                            this.submitFile(sendFile);
                        } else if (this.broucherType.abbr == 'ppt' && sendFile.name.split(".")[1] == 'pptx') {
                            this.showLoader('Uploading', true);
                            this.submitFile(sendFile);      // uplaod file from this function Date 9/JAN/2019
                        } else {
                            this.showToast('Invalid file type', this.TOST().WARNING);
                        }
                    } else {
                        this.showToast('You can\'t upload this file type from here', this.TOST().WARNING);
                    }
                }


            } else if (this.e1 == 2 && id == 5) { // id = 5 denotes user wants to upload a video

                if (this.productVideo.text === common) {
                    this.showToast('Please, select file first', this.TOST().INFO);      // Show message when user not selected file yet
                } else {

                    // Validation of video Date 9/JAN/2019  => Modified date 1/30/2019
                    // Condition modified for multiple image upload
                    // Note: Why this condition is here ? Because first I have fix (only admin can upload one images) only I removed -1 to 1

                    if (this.productMedia.findIndex(file => file.fileType == 'mp4') == 1 && this.editEnable.bool == false) {
                        this.showToast('You can\'t upload new video. Please modified existing one', this.TOST().INFO);
                        return;
                        // The code will end here. the below will not executed. if condition is satisfied
                    }

                    var regex_VID = new RegExp('^(mp4)$');
                    sendFile = this.productVideo.file;
                    if (regex_VID.test(sendFile.type.split("/")[1])) {
                        this.showLoader('Uploading', true);
                        this.submitFile(sendFile);  // uplaod file from this function Date 9/JAN/2019
                    } else {
                        this.showToast('You can\'t upload this file type from here', this.TOST().WARNING);
                    }
                }
            }
        },

        submitFile(sendFile) {
            let _this = this;

            // The first thing we need to do is implement a FormData object like this:
            let formData = new FormData();

            /**
             * Next, what we will do is append the file to the formData.
             * This is done through the  append() method on the object:
             * FormData.append() – Web APIs | MDN. What we are doing is essentially
             * building a key-value pair to submit to the server like a
             * standard POST request:
             */

            // formData.append('file', sendFile);
            // Change for multer
            formData.append('media_upload', sendFile);

            // Upload API
            this.POST('uploadFile', formData,  function(res ,error){
            
               if(error){
                _this.showLoader('Uploading', false);
                console.log('Catch Error : ', error );
                _this.showToast('Something goes wrong during uploading', _this.TOST().ERROR);
        
                }else{
                    _this.showLoader('Uploading', false);
                if (_this.e1 == 2) {
                    if (res.data.errMsg.fileType == 'mp4') {
                        _this.productVideo.respFileName = res.data.errMsg.fileName;
                        // _this.brochures.respFileType = res.data.errMsg.fileType;
                        _this.productVideo.respFileType = res.data.errMsg.fileType;
                    } else if(res.data.errMsg.fileType == 'jpg' || res.data.errMsg.fileType == 'jpeg'
                    || res.data.errMsg.fileType == 'png') {
                        _this.planImages.respFileName = res.data.errMsg.fileName;
                        _this.planImages.respFileType = res.data.errMsg.fileType;
                    }

                    _this.showMediaIntoTable(res.data.errMsg)
                    .then( resp => {
                        let reset = {
                            text: common,
                            file: '',
                            respFileName: '',
                            respFileType: ''
                        }

                        if (resp == 0) {
                            _this.planImages = {};
                            _this.planImages = Object.assign(reset, _this.planImages);
                        } else if (resp == 5) { // video
                            _this.productVideo = {};
                            _this.productVideo = Object.assign(reset, _this.productVideo);
                        }
                    });
                } else if (_this.e1 == 3 ) {
                    _this.brochures.respFileName = res.data.errMsg.fileName;
                    _this.brochures.respFileType = res.data.errMsg.fileType;

                    /**
                     * When file's details saved into table then file upload section text will reset
                     */
                    _this.showProductBrochuresIntoTable(res.data.errMsg, _this.frmOne._lang.state, _this.broucherType.state, _this.fileCategory)
                    .then(() => {

                        _this.brochures = {};

                        let reset = {
                            text: common,
                            file: '',
                            respFileName: '',
                            respFileType: '',
                        }

                        _this.brochures = Object.assign(reset, _this.brochures);
                    });
                }

                if ('fileName' in res.data.errMsg) {
                    _this.showToast('File uploaded successfully', _this.TOST().SUCCESS);
                } else {
                    _this.showToast('Uploading process intrupted', _this.TOST().ERROR);
                }
                }

                
            });
         
        /**
         * @author Khan Usama
         * @function handleFileUpload
         * @param {*} event
         * @description The function is based on conditions of pages which is indicated by el. it contains page no. like 1,2 and 3 etc.
         * In this page
         */
        },
        handleFileUpload(event, indicator, index) {
            console.log('My Event ', event);
            /**
             * @description The below line of condition (Turnary) is used to identify user upload or update the files
             * because this functions is common for choosing file's from the loacl directory. So we need to identify
             * upload or update.
             */
            this.editEnable.bool = indicator == 'edit' ? true : false;
            this.editEnable.location = indicator = 'edit' ? index : null;

            // console.log('Edit ENabale :' + this.editEnable);
            try {
                if (event.target.files.length > 0) {
                    if (this.e1 == 2) {

                        try {
                            if (event.target.files[0].type.split("/")[0] == "video") {
                                // this.productVideo.file = this.$refs.prodVideo.files[0];
                                this.productVideo.file = event.target.files[0];
                                this.productVideo.text = this.productVideo.file.name;
                                this.validateFiles(5);

                            } else if (event.target.files[0].type.split("/")[0] == "image") {
                                // this.planImages.file = this.$refs.planPictures.files[0];

                                this.planImages.file = event.target.files[0];
                                this.planImages.text = this.planImages.file.name;

                                // When user click on edit button then validate functions called automatically but not for uploading first time
                                if (this.editEnable.bool == true) {
                                    this.validateFiles(2);
                                }
                            }
                        }catch(err) {
                            this.showToast('You have selected wrong file', this.TOST().WARNING);
                        }
                    } else if (this.e1 == 3) {
                        this.brochures.file = this.$refs.brochuresFiles.files[0];
                        this.brochures.text = this.brochures.file.name;

                        // When user click on edit button then validate functions called automatically but not for uploading first time
                        if (this.editEnable.bool == true) {
                            this.validateFiles(3);
                        }
                    }
                }
            } catch(err) {
                console.error(err);
            }
        },


        pushDataIntoDB(event) {
            // this.showLoader('Loading', true);
            // console.log('');
            /**
             * Extracting video and images from productMedia
             */

            // When pushDataIntoDB function called from child component bloglist then this condition will execute
            // 23/JAN/2019
            if ('code' in event && event.code == 200) {
                support.setProducts(this);
                this.httpMethod = event.http_method;
                this.showLoader('Loading', true);
            }

            // let _productVideo = {};
            // let _productImages = {};
            let _productVideo = "";
            let _productImages = "";

            // if (this.frmOne.role == "" || this.channelCode == "") {
            //     this.showToast('Channel code & role code is mandatory', this.TOST().WARNING);
            //     return;
            // }

            // if (this.frmOne.role.hasOwnProperty('abbr') == false || this.channelCode.hasOwnProperty('abbr') == false) {
            //     this.showLoader('Loading', false);
            //     this.showToast('Channel code & role code is mandatory', this.TOST().WARNING);
            //     return;
            // }

            /**
             * Product reasons are mondatory
             */

            // if (this.frmOne['reasons1'] == "" || this.frmOne['reasons2'] == "" || this.frmOne['reasons3'] == "" || this.frmOne['reasons4'] == "" || this.frmOne['reasons5'] == "") {
            //     this.showLoader('Loading', false);
            //     this.showToast('5 Reasons are mondatory', this.TOST().WARNING);
            //     return;
            // }

            if(this.frmOne.productType == "" || this.frmOne.productType == null || this.frmOne.productType == undefined) {
                this.showToast('Please select blog category first', this.TOST().WARNING);
                return;
            }
            // console.log('this.frmOne.productType ' ,);

            for (let i = 0; i < this.productMedia.length; i++) {
                if (this.productMedia[i].fileType == 'mp4') {
                    // _productVideo = {
                    //     name: this.productMedia[i].fileName,
                    //     type: this.productMedia[i].fileType,
                    //     active: parseInt(this.productMedia[i].active),
                    // }
                    // _productVideo.push({
                    //     name: this.productMedia[i].fileName,
                    //     type: this.productMedia[i].fileType,
                    //     active: parseInt(this.productMedia[i].active),
                    // });
                } else {
                    _productImages = {
                        name: this.productMedia[i].fileName,
                        type: this.productMedia[i].fileType,
                        location: this.productMedia[i].thumbnail,
                        active: parseInt(this.productMedia[i].active),
                    }

                    // _productImages.push({
                    //     name: this.productMedia[i].fileName,
                    //     type: this.productMedia[i].fileType,
                    //     active: parseInt(this.productMedia[i].active),
                    // })
                }
            }

            // When product imges is an empty object then it put key which are empty strings to avoid database error at backend
            // 15/01/2019
            // _productImages = (Object.keys(_productImages).length == 0 ? { name: '', type: '', active: 0 } : _productImages);
            // _productVideo = (Object.keys(_productVideo).length == 0 ?   { name: '', type: '', active: 0 } : _productVideo );

            let formData = {
                category: 'abbr' in this.frmOne.productType ? this.frmOne.productType.abbr : this.frmOne.productType,
                // category: '5c74d6a98e1ffb12f091a567',
                title: this.frmOne.productName,
                content: this.frmOne.description,
                blogImages: _productImages,
                blogVideos: _productVideo,
                videoLink: this.videoURL,
                videoTitle: this.videoTitle,
                imageTitle: this.imageTitle,
                active: parseInt(this.active)
            }
            let self = this;

            if (this.publish == '1') {
                formData = Object.assign({
                    publishedBy: this.getAgentInfo()._id,
                    publishedDate: Date.now(),
                    status: 'Published'
                }, formData);
            }

            console.log('Product Form data : ',  formData);

            if (this.frmOne.title !== "") {
                if (this.httpMethod == 'POST') {
                    this.POST('create_blog/'+this.getAgentInfo()._id, formData, function(resp, error) {
                        if (!error) {

                            if (resp.data.errCode !== 4) {
                                if (resp.data.errCode !== 134) {
                                    if (resp.data.errCode !== 395) {
                                        if (resp.data.errCode == -1) {
                                            self.showLoader('Loading', false);
                                            self.showToast(self.publish == '1'? 'Blog is published successfully' : 'Blog is created but not yet publish', self.TOST().SUCCESS);
                                            self.commit('SAVE_EDIT_BLOG', resp.data.errMsg);
                                            // setTimeout(() => {
                                                self.updatedReponse = resp.data.errMsg;
                                            // }, 5000)

                                            self.blogID = resp.data.errMsg._id;
                                            self.httpMethod = 'PUT';
                                            // self.$refs.plist.tabledata();
                                        } else {
                                            self.showLoader('Loading', false);
                                            self.showToast(resp.data.errMsg, self.TOST().ERROR);
                                        }
                                    } else {
                                        self.showLoader('Loading', false);
                                        self.showToast(resp.data.errMsg, self.TOST().ERROR);
                                    }
                                } else {
                                    self.showLoader('Loading', false);
                                    self.showToast(resp.data.errMsg, self.TOST().ERROR);
                                }
                            } else {
                                self.showLoader('Loading', false);
                                self.showToast('Database Error', self.TOST().ERROR);
                            }
                        } else {
                            self.showLoader('Loading', false);
                            console.log('err', error);
                            self.showToast('Something wrong in API', self.TOST().ERROR);
                        }
                    });

                } else if (this.httpMethod == 'PUT') {
                    // Date 9/JAN/2019
                    formData = Object.assign({userId: this.getAgentInfo()._id}, formData);
                    console.log('PUT Form Data : ', formData);

                    this.PUT('update_blog_by_Id?blogId='+this.blogID, formData, (resp, error) => {
                        if (!error) {
                            if (resp.data.errCode == 134) {
                                self.showLoader('Loading', false);
                                self.showToast('Mandatory fields are not found', self.TOST().ERROR);
                                return;
                            }
                            if (resp.data.errCode == 349) {
                                self.showLoader('Loading', false);
                                self.showToast('Blog ID is not found in API', self.TOST().ERROR);
                                return;
                            }
                            if (resp.data.errCode !== 4) {
                                if (resp.data.errCode !== 395) {
                                    if (resp.data.errCode == 505) {
                                        self.showLoader('Loading', false);
                                        self.showToast('No such record are found', self.TOST().ERROR);
                                    } else if (resp.data.errCode == -1) {
                                        self.showLoader('Loading', false);
                                        self.updatedReponse = resp.data.errMsg;
                                        self.showToast('Blog updated successfully', self.TOST().SUCCESS);
                                        /**
                                         * Insert new file upload category
                                         */
                                        // if (self.fileCategory == '' || self.fileCategory == null || self.confirm == false) {} else {
                                        //     onPageLoad.insertNewOne(self, {categoryName: self.fileCategory}, self.getAgentInfo()._id, function() {
                                        //         // Load File upload category from store
                                        //         console.log('I am at callback');
                                        //         self.fileCategoriesList = mixin.getStore('getFileUploadCategory');
                                        //     });
                                        // }
                                    } else {
                                        self.showLoader('Loading', false);
                                        self.showToast('User not register', self.TOST().SUCCESS);
                                    }
                                } else {
                                    self.showLoader('Loading', false);
                                    self.showToast('User ID not found in the body', self.TOST().ERROR);
                                }
                            } else {
                                self.showLoader('Loading', false);
                                self.showToast('Database Error', self.TOST().ERROR);
                            }
                        } else {
                            self.showLoader('Loading', false);
                            console.log(error);
                            self.showToast('Something goes wrong', self.TOST().ERROR);
                        }
                    });
                    // Put feature is now implemented so we don't need it. Date 10/JAN/2019
                    // self.showToast('You can\'t perform modification, because this feature is not implemented yet ', self.TOST().INFO);
                } else {
                    this.showToast('Update feature temprory blocked', this.TOST().INFO);
                }
            } else {
                self.showLoader('Loading', false);
                self.showToast('Please enter blog title', self.TOST().WARNING);
            }
        },

        /**
         * @function showProductBrochuresIntoTable
         * @description Call when data save into database
         *
         * Note: Section 3
         */

        showProductBrochuresIntoTable(file, language, brochureType, category) {
            let self = this;
            return new Promise(resolve => {
                // modified code at 10/JAN/2019
                if (self.editEnable.bool === true) {
                    // Remove file records from Array
                    self.brochuresDetails.splice(self.editEnable.location, 1);
                    self.brochuresDetails.push({
                        fileName: file.fileName,
                        fileType: file.fileType,
                        active: file.active,
                        language,
                        brochureType,
                        fileCategory: category
                    });
                    self.resetEditDataFields();     // edit helpers are reset from here
                } else {
                    self.brochuresDetails.push({
                        fileName: file.fileName,
                        fileType: file.fileType,
                        active: file.active,
                        language,
                        brochureType,
                        fileCategory: category
                    });
                }
                resolve();
            });
        },
        /**
         * @function showMediaIntoTable
         *
         * @description Call when data save into database
         *
         * Note: Section 2
         */
        showMediaIntoTable(data) {
            let self = this;
            return new Promise(resolve => {
                // modified code at 9/JAN/2019

                if (self.editEnable.bool === true) {

                    /**
                     * productMedia is connected with template, used to iterate file's in the table at page e1 = 2
                     * Note: Here revert files
                     */
                    // Remove file records from Array
                    self.productMedia.splice(self.editEnable.location, 1);
                    // then again add new updated file in the array using push methods

                    self.productMedia.push({ thumbnail: data.location, fileName: data.fileName, fileType: data.fileType, active: data.active });
                    self.resetEditDataFields();
                    data.fileType == 'mp4' ?  resolve(5) : resolve(0)
                } else {
                    /**
                     * It is used push new file
                     */
                    self.productMedia.push({ thumbnail: data.location, fileName: data.fileName, fileType: data.fileType, active: data.active });
                    console.log(self.productMedia);
                    data.fileType == 'mp4' ?  resolve(5) : resolve(0)
                }
            });
        },

        openLightBox(obj) {
            console.log('Object  ', obj);
            this.dialog = true;
            this.lightBox.imagePath = obj.thumbnail;
            this.lightBox.ext = obj.fileType == 'mp4' ? obj.fileType : obj.fileType.toLowerCase();
        },

        showDescription(event) {
            this.e1 = 2;
            this.pushDataIntoDB(event);
        },

        /**
         * @function resetEditDataFields
         *
         * @description Access when we need to upload file not updating it so we need to reset these fields
         */
        resetEditDataFields() {
            this.editEnable.bool = false;
            this.editEnable.location = null;
        },
        // getRoleCodes() {
        //     let self = this;
        //     this.rolesList = [];
        //     console.log('Roles List' , this.rolesList);
        //     this.GET('getrole?userId='+this.getAgentInfo()._id, function(resp, error) {
        //         console.log('I am here');
        //         if (!error) {
        //             let roleList = resp.data.errMsg;
        //             for (let i = 0; i < roleList.length; i++) {
        //                 let data = {
        //                     state: roleList[i].roleName,
        //                     abbr: roleList[i]._id
        //                 }
        //                 self.rolesList.push(data);
        //                 data = {};
        //             }
        //             console.log('Roles List' , self.rolesList);
        //         } else {
        //             console.log(error);
        //         }
        //     });
        // },

        /**
         * Reset Forms all fields
         */
        resetForm() {
            for(let props in this.frmOne) {
                this.frmOne[props] = props == 'productType' ? productCategory[0] : props == '_lang' ? language[0] : ''
            }
            let obj = { text: common, file: '', respFileName: '', respFileType: '' };

            this.brochures          = JSON.parse(JSON.stringify(obj));
            this.planImages         = JSON.parse(JSON.stringify(obj));
            this.productVideo       = JSON.parse(JSON.stringify(obj));
            this.videoURL           = '';
            this.imageTitle         = '';
            this.videoTitle         = '';
            this.lightBox           = { imagePath: '', ext: '' }
            this.productMedia       = [];
            this.brochuresDetails   = [];
            this.URLWrong           = false;
            this.errMsg             = [];
            // this.rolesList          = [];
            this.active             = '1';
            this.channelCode        = ''
            this.publish            = '0'
        }
    }
}
</script>
<style>
    .product-page p {
        margin: 0;
    }

    .margin-tbl{
        margin-right: 20px;
        margin-left: 20px;
    }

    .sd-light-cyan {
        color: #01B4BB
    }
    .sd-img-btn-size {
        width: 100px;
        height: 100px;
        cursor: pointer;
    }
    .sd-upload-img-sec {
        /* background-color: rgb(245, 245, 245); */
        height: 100px;
        border: 1px solid #E0E0E0;
    }
    .sd-upload-img-sec .label-color {
        color: #9B9B9B;
        cursor: pointer;
    }

    .sd-tb-row-img {
        width: 70px;
        height: 40px;
    }

    .sd-tb-sec3-width {
        width: 30%;
    }

    .product-page .v-toolbar__content, .v-toolbar__extension {
        padding: 0;
    }

    .product-page .sd-row-tb-img {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sd-action-btn-cnter {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .media-pos {
        position: absolute;
        top: 127px;
    }

    .product-page .dragFile {
        opacity: 0;
        position: absolute;
        height: 100px;
        width: 80%;
    }

    /* .edit-btn-files {
        width: 85px;
        position: absolute;
        top: 63px;
        z-index: 2;
        opacity: 0;
    } */
    @media screen and (min-width: 320px) {

    }
    @media screen and (min-width: 728px) {

    }
    @media screen and (min-width: 922px) {

    }
</style>

