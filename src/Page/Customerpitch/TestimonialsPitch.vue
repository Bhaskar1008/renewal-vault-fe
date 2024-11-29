<template>
    <div>
      <v-card>
        <v-layout align-center justify-space-between row fill-height class="mr-3 ml-3 mb-2 pt-3">
            <!-- <h3 class="title font-weight-regular">Testimonial</h3> -->
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
            <v-btn large color="primary" class="white--text thebtn" @click="resetFields">New</v-btn>
            <v-flex xs10 sm6 md2 class="ml-3 ">
                                <v-text-field
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search"
                                append-icon="search"
                                height="30px"></v-text-field>
            </v-flex>

        </v-layout>

        <hr>

        <div class="testimonials-form pa-3">

             <v-layout align-center row>
                <v-flex xs12 md2>
                    <p class="body-2">Title:</p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <v-text-field
                        label=""
                        v-model="formFields.title"
                        placeholder="Enter title here..."
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Channel Code:</p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                 <v-select v-model="channeldatafilter"
                                    multiple
                                    chips
                                    :items="channeldataall"
                                    item-text="text"
                                    item-value="value"
                                    label="Channel"
                                    @change="channelfilters">
                            </v-select>
                            <template v-slot:prepend-item>
                                    <!-- @click="toggle" -->
                                <v-btn @click="selectAll(1)">Select All</v-btn>
                                <v-btn @click="dis">DiSelect All</v-btn>
                            </template>
                        </v-flex>
            </v-layout>

                        <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Status: </p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-radio-group v-model="formFields.active" row>
                                    <v-radio label="Active"   value="1" color="success"></v-radio>
                                    <v-radio label="Inactive" value="0" color="red"></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>

                        <v-layout column class="mt-4 mb-4">
                            <v-flex xs12 md2 class="mt-4 mb-2">
                                <p class="body-2">Description:</p>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-textarea outline name="input-7-4" auto-grow label="Enter description here"
                                    v-model="formFields.content"
                                ></v-textarea>
                            </v-flex>
                        </v-layout>

                        <!-- <v-btn color="#01B4BB" class="white--text"  @click="save">Save and upload Videos</v-btn> -->
                         <!-- <v-btn color="#01B4BB" class="white--text" v-if="theedit" @click="editit">Continuee</v-btn> -->
                        <!-- <v-btn flat style="background-color: #F5F5F5" @click="closeit">Close</v-btn> -->
            
            <v-layout align-center d-flex>
                            <v-flex xs12 md3>
                                <p class="body-2">Video Title : </p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="" v-model="formFields.videoTitle" placeholder="Enter video title here"
                                ></v-text-field>
                            </v-flex>
            </v-layout>

            <v-layout align-center d-flex>
                            <v-flex xs12 md3>
                                <p class="body-2">Upload Thumbnail : </p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <input
                                ref="thumb_file"
                                type="file"
                                name="thumbnail_upload"
                                accept="image/x-png,image/jpeg"
                                style="display:none;"
                                @change="handleFileUpload" />

                                <div style="display:flex;flex-direction:row;align-items:center">
                                    <v-btn color="blue-grey" class="white--text" @click="uploadThumb">
                                        Upload
                                        <v-icon right dark>cloud_upload</v-icon>
                                    </v-btn>
                                    <p>{{formFields.thumnailFileName}}</p>
                                </div>
                            </v-flex>

                            <v-flex xs12 sm6 md6 v-if="Object.keys(formFields.thumbnail).length > 0">
                                <img :src="formFields.thumbnail.location" style="height: 100px; width: 150px" @click="openLightBox(media)"/>
                            </v-flex>

                        </v-layout>

                        <v-layout align-center row wrap class="mb-3">
                            <v-flex xs12 sm6 md6>
                                <p class="body-2 mb-3">Please upload video from local:</p>
                                <v-layout align-center row wrap>
                                    <v-flex xs4 sm6 md2>
                                        <input type="file" name="media_upload" ref="prodVideo" accept="video/*" class="sd-img-btn-size media-pos" style="opacity: 0" @change="handleFileUpload"/>
                                        <img src="../../assets/Group_968.png" class="sd-img-btn-size"/>
                                    </v-flex>
                                    <v-flex xs6 sm3>
                                        <p class="caption font-italic font-weight-medium" style="color:#9B9B9B">{{ formFields.fileName }}</p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <p class="body-2 mb-3">Add Youtube URL:</p>
                                <v-layout align-center row wrap v-if="formFields.visible == true">
                                    <v-flex xs4 sm6 md2 @click="formFields.visible = false">
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
                                            :error="formFields.URLWrong"
                                            :error-messages="formFields.errMsg"
                                            @change="URLValidate"
                                            v-model="formFields.youtubeURL"
                                            :clearable="true"
                                            placeholder="Enter URL here"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>

            <v-card color="grey lighten-4" class="mb-4" flat tile v-if="formFields.mediaFiles.length > 0" >
                            <v-toolbar dense>
                                <v-layout row fill-height>
                                    <v-flex  xs2 style="background-color: #01B4BB" d-flex align-center justify-center>
                                        <v-toolbar-title style="color:white" class="subheading text-md-center">Video</v-toolbar-title>
                                    </v-flex>
                                    <!-- <v-flex  xs2 style="background-color: #01B4BB" d-flex align-center justify-center>
                                        <v-toolbar-title style="color:white" class="subheading text-md-center">Thumbnail</v-toolbar-title>
                                    </v-flex> -->
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

                            <v-layout row v-for="(media, index) in formFields.mediaFiles" :key="index">
                                <v-flex  xs2 class="sd-row-tb-img pa-2" style="background-color: #01B4BB">
                                    <!-- <img v-if="media.fileType !== 'mp4'" :src="media.location" class="sd-tb-row-img" @click="openLightBox(media)"/> -->
                                    <!-- for thumbnail -->
                                    <video pause @click="openLightBox(media)" class="sd-tb-row-img">
                                        <source :src="media.location" type="video/mp4">
                                        <source :src="media.location" type="video/ogg">
                                        Your browser does not support the video tag.
                                    </video>
                                </v-flex>
                                <!-- <v-flex xs2 class="sd-row-tb-img pa-2" style="background-color: #01B4BB">
                                    <img :src="media.location" class="sd-tb-row-img" @click="openLightBox(media)"/>
                                </v-flex> -->
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
                                    <edit-file accept="image/x-png, image/jpeg, video/*" @onFileChange="handleFileUpload($event, 'edit', index)"></edit-file>
                                   
                                </v-flex>
                            </v-layout>
                        </v-card>

            <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Publish: </p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-radio-group v-model="formFields.publishStatus" row>
                                    <v-radio label="Publish"   value="1" color="success"></v-radio>
                                    <v-radio label="Draft" value="0" color="orange"></v-radio>
                                </v-radio-group>
                            </v-flex>
            </v-layout>

        <v-layout align-center justify-space-between row fill-height class="mb-5">
                            <div>
                                <v-btn color="#01B4BB" class="white--text" @click="save">{{formFields.HTTP === 'PUT' ? 'Save' : 'Submit'}}</v-btn>
                
                            </div>
                            <!-- <v-btn flat style="background-color: #F5F5F5" @click="closeit">Close</v-btn> -->
        </v-layout>





            <v-stepper v-model="e1" class="mb-4" v-show="formFields.showStepper">
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1" color="#01B4BB">Upload Data</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2" color="#01B4BB">Upload Media</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <!-- Page 1 -->
                    <v-stepper-content step="1">
                        <!-- <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Sales Pitch Category:</p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select
                                    v-model="formFields.salesPitchCategory"
                                    :items="salesPitchCategories"
                                    item-text="state"
                                    item-value="abbr"
                                    label="Select category"
                                    persistent-hint
                                    return-object
                                    single-line
                                ></v-select>
                            </v-flex>
                        </v-layout> -->
                        <!-- <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Title:</p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    label=""
                                    v-model="formFields.title"
                                    placeholder="Enter title here..."
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                         <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Channel Code:</p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                 <v-select v-model="channeldatafilter"
                                    multiple
                                    chips
                                    :items="channeldataall"
                                    item-text="text"
                                    item-value="value"
                                    label="Channel"
                                    @change="channelfilters">
                            </v-select>
                    <template v-slot:prepend-item>
                            @click="toggle"
                           <v-btn @click="selectAll(1)">Select All</v-btn> -->
                          <!-- <v-btn @click="dis">DiSelect All</v-btn>
                    </template>  -->
                                <!-- <v-select
                                    v-model="formFields.channelCode"
                                    :items="channelList"
                                    item-text="state"
                                    item-value="abbr"
                                    label="Select channel code"
                                    @change="onChannelChange"
                                    persistent-hint
                                    return-object
                                    single-line
                                ></v-select> -->
                            </v-flex>
                        </v-layout>
                        <!-- <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Role Code:</p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                
                                  <p>{{selectedrole.value}} </p>
                                <v-select
                                    v-model="selectedrole"
                                    @change="mapRoleCodes"
                                    multiple
                                    chips
                                    :items="selectrole"
                                    item-text="text"
                                    item-value="value"
                                    placeholder="Select role code"
                                    persistent-hint
                                    single-line
                                ></v-select>
                            </v-flex>
                        </v-layout> -->

                     
                   
                    

                      
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        
                        

                        
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>

            <v-data-table
                :headers="headers"
                :items="testimonials"
                class="elevation-1">
                <template slot="items" slot-scope="props">
                    <!-- <td>{{ props.item.id | formate-id('T')}}</td> -->
                    <td class="text-xs-left">{{ props.item.testimonial_id }}</td>
                     <!-- <td class="text-xs-left">{{ props.item.video }}</td> -->
                    <td class="text-xs-left text-no-wrap ">{{ props.item.title | short}}</td>
                    <td class="text-xs-left text-no-wrap">{{ props.item.content | short}}</td>
                    <!-- <td class="text-xs-left">{{ props.item.channel_code.channelName  }}</td> -->
                    <!-- <td class="text-xs-left">{{ props.item.role_code.roleCode }}</td> -->
                    <td class="text-xs-left">{{ props.item.status }}</td>
                    <td class="text-xs-left">{{ props.item.created_date | formate-date }}</td>
                    <td class="text-xs-left">{{ props.item.created_by_name }}</td>
                    <td class="text-xs-left">{{ props.item.updated_date | formate-date}}</td>
                    <td class="text-xs-left">{{ props.item.updated_by_name }}</td>
                    <td class="text-xs-left">{{ props.item.published_status == null ? "-" : props.item.published_status }}</td>
                    <td class="text-xs-left">{{ props.item.published_by == null ? "-" : props.item.published_by }}</td>
                    <td class="text-xs-left">{{ props.item.pub_date == null ?  "-" : props.item.pub_date  }}</td>
                    <td class="text-xs-left"><v-btn @click="fetchById(props.item,2)" icon><v-icon color="#636363">edit</v-icon></v-btn></td>
                </template>
            </v-data-table>

            <v-dialog v-model="dialog" max-width="650">
                <v-card><!-- <img v-if="lightBox.ext == 'png' || lightBox.ext == 'jpg' || lightBox.ext == 'jpeg'" :src="lightBox.imagePath" width="100%"/> -->
                    <video id="mediaPlayer" width="100%" :src="formFields.lightBox.location" controls>
                        Your browser does not support HTML5 video.
                    </video>
                </v-card>
            </v-dialog>
        </div>
      </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import onPageLoad from '../../common/onProjectLoad'
import editFile from './edit-file-button'
// import loadChannel from '../common/onProjectLoad.js'

const salesPitchCategories = [
    { state: 'Advisor Pitch', abbr: '5c6e48a044d01f450c50e2bf' },
    { state: 'Customer Pitch', abbr: '5c6e4bb7fe777918bcd80882' },
]

var _dup_formFields = {};
const HELPING_TEXT = "Supports mp4 format. Approx time to upload 2mb file - 30 min";
let rawChannel = null;
let multiroles = []
export default {

       components:{
            editFile,
    }, 
  
    created() {
        // this.gettestimonialstable();
        // this.fetchAll();
        this.$store.commit('SET_PAGE_TITLE','Testimonials');
        this.GET('getchannel?userId=' + this.getAgentInfo()._id, res => {
            if (res.data.errCode == -1) {

                // console.log("The response from channel api is=>",res.data.errMsg );
                let chdata = res.data.errMsg;
                this.chn = res.data.errMsg;
                let channelalldata=[]
                    for(let i =0;i<chdata.length;i++){
                        if(chdata[i].active === 1){
                            let channetobj ={
                                text:chdata[i].channelName,
                                value:chdata[i].channelCode,
                            }
                            this.channeldata.push(channetobj);
                            this.channeldataall.push(channetobj);  
                        }
                    }
                    // let alldata={
                    //             text:'All',
                    //             value:'all',
                    //         }
                    //     this.channeldataall.unshift(alldata);
                        // console.log("the channel data is ->", this.channeldata.length);

            }
        });
        // this.channeldatafilter ='all'
        // this.GetRole(this.channeldatafilter);
        //  this.getZoneResp(this.channeldatafilter);
        // Here call the get testimonials API which should have the channel filter parameter
    },
    mounted() {
        _dup_formFields = JSON.parse(JSON.stringify(this.formFields))         // Save inital values for form reset using loop
        this.rolesList = this.getStore('fetchRoleCodes');

        // console.log("The Role list is  -> ", this.rolesList);
        var newroles = this.rolesList.filter(role =>{
                   return role.state
                    // for(let i=0; this.rolesList.length; i++){
                    //    role.
                    // }
        })
        // if(  this.rolesList )

        let self = this;
        onPageLoad.getChannel(this, channel => {
             try {
                rawChannel = channel;
                self.channelList = channel.filter(e => e.active == 1).map(e => { return { state: e.channelName, abbr: e._id } });
                // console.log('Channel Code : ' ,  self.channelList);
            } catch(err) {}
        });
        this.fetchAll();
    },
    data() {
        return {
            editindex:null,
            fp:[],
            tableindex:null,
            temp:[],
            temp2:[],
            savebtn:false,
            theedit:false,
            chn:[],
            channelcodec:[],
            multirole:[],
            selectedrole:[],
            selectrole:[],
            channeldata:[],
            channeldatafilter:'',
            channeldataall:[],
            value: null, // for search
            e1: 1,
            headers: [
                { text: 'ID', value: 'id' },
                // { text: 'Category Name', value: 'category_name'},
                { text: 'Title', value: 'title'},
                { text: 'Content', value: 'content' },
                // { text: 'Channel Code', value: 'channel_code' },
                { text: 'Status', value: 'status' },
                // { text: 'Role Code', value: 'role_code' },
                { text: 'Created Date', value: 'created_date'},
                { text: 'Created By', value: 'created_by' },
                { text: 'Updated Date', value: 'updated_date'},
                { text: 'Updated By', value: 'updated_by' },
                { text: 'Published Status', value: 'published_status' },
                { text: 'Published By', value: 'published_by'},
                { text: 'Published Date', value: 'date'},
                { text: 'Action', value: 'action'},
            ],
            testimonials: [],
            salesPitchCategories,
            rolesList: [],
            channelList: [],
            dialog: false,
            formFields: {
                title: '',
                content: '',
                channelCode: '',
                roleCode: '',
                salesPitchCategory: '',
                videoTitle: '',
                youtubeURL: '',
                visible: false,
                showStepper: false,
                mediaFiles: [],
                publishStatus: '0',
                active: '0',
                URLWrong: false,
                errMsg: [],
                HTTP: 'POST',
                editFile: false,
                fileName: HELPING_TEXT,
                lightBox: {
                    location: '',
                    ext: ''
                },
                thumnailFileName: 'File Name',
                thumbnail: {}
            }
        }
    },

    filters: {
          short(text) {
            try {
                if (text.length > 50) { text = text.slice(0, 50)+'...';}
            }catch(err) {}
            return text;
        },
         formateDate(milisecond) {
           try {
               return new Date(parseInt(milisecond)).toLocaleDateString()
           } catch(err) {
               return milisecond;
           }
       },
        short(text) {
            try {
                if (text.length > 50) { text = text.slice(0, 50)+'...';}
            }catch(err) {}
            return text;
        },
        formateId(id, initial) {
            try {
                if (id == null || id == undefined || id == "") { return id; }
                return initial + id.slice(16, 25).toUpperCase();
            } catch (err) { return id; }
        },
        convert(milisecond) {
            try {
                if (milisecond == "-" || milisecond == null || milisecond == undefined || milisecond == "") {
                    return "-"
                } else {
                    return new Date(parseInt(milisecond)).toLocaleDateString()
                }
            } catch(err) {
                return milisecond;
            }
        }
    },

    watch: {
        dialog(_new_, _old_) {
            try {
                let ref = document.getElementById('mediaPlayer');
                if (this.dialog == false) {
                    ref.pause();
                }
            } catch(err) {
                // console.log(err);
            }
        }
    },

      computed: {
        objmethod() {
            try {
                let self=this;
                return this.testimonials.filter(function(cust){return cust.title.toLowerCase().indexOf(self.value.toLowerCase()) >=0
                || cust.content.toLowerCase().indexOf(self.value.toLowerCase()) >=0
                });
            }
            catch(err) {

            }

       //return this.customers;
    },
},

    methods: {

     closeit(){
            this.formFields.showStepper = false
        },

    selectAll(e){
      var everything=1;
      if( this.channeldatafilter.length == this.channeldata.length){
            alert("All Channels are already Selected");
      }else{
          console.log("e is from else->",e)
            if(e == everything){
             this.channeldatafilter = this.channeldata.map(doc => {
             return doc.value
             console.log("from if")
            });
            console.log("the values",this.channeldatafilter);
         }
      }
    
    },

    dis(){
         this.channeldatafilter = []
    },
        // edittestimonials(items, option = 0) {
        //     // let self = this;
        //     this.formFields.showStepper = true;
        //     console.log("EDITING TESTIMONIALS->",items); 
        //      this.formFields.title = items.title
        //     this.formFields.videoTitle = items.title
        //     this.formFields.content = items.description;
        //     let index = this.channelList.findIndex(element => element.abbr == res.channelCode._id);
        //     this.channeldatafilter = this.channelList[index];
        //     index = this.rolesList.findIndex(element => element.abbr == res.roleCode._id);
        //     this.formFields.roleCode = this.rolesList[index];
            // this.formFields.salesPitchCategory = '';
            // this.formFields.videoTitle = item.fileTitle;
            // this.formFields.youtubeURL = '';
            // this.formFields.publishStatus = item.publshedStatus == "Draft" ? '0' : '1';
            // this.formFields.active = item.StatusRole == "Active" ? '1' : '0';
            // // console.log('I am ', product);
            // this.GET('getProductsAll?productId='+product._id, (res, error) => {
            //     if(error) {
            //         self.showToast('Something went wrong', self.TOST().ERROR);
            //         console.log('Error ', error);
            //         return;
            //     }
            //     if (res.data.errCode == -1) {

            //         if (option === 1) {
            //            // option = 1: Insert updated data into table
            //             let temp = self.productdata.splice(0, self.productdata.length);
            //             self.productdata = [];
            //             res.data.errMsg.forEach((e, index, array) => {
            //                 temp[self.holdSelectedIndex] = self.mapFields(e, self.holdSelectedIndex);
            //             });
                      
            //             self.productdata = temp.splice(0, temp.length);
                         
            //             temp = undefined
            //         } else {
            //             // option = 0: Its mean load seleted data into form for edit
            //             /**
            //              * This code is only for tempory because API response is not porper for this admin module
            //              * so this arrangment is done by front-end side for (module workes properly without any disturbance)
            //              * Note: Here all conditions are only for arrangment of data
            //              */

            //             console.log('Response of db' , res.data.errMsg);
            //             let _data = res.data.errMsg[0];
            //             _data = self.assignNewProperties(_data);
            //             self.commit('SAVE_PRODUCTS', _data);
            //             self.showToast('Scroll Top', self.TOST().INFO);
            //             self.holdSelectedIndex = product.index;
            //             self.$emit('on-edit', {});
            //         }
            //     } else {
            //         self.showToast('Database Error', self.TOST().ERROR);
            //     }
            // });
        // },



        // gettestimonialstable(){

        //    var  Filter_Data = this. API_Service_admin() +'fetch_sales_pitch?type=testimonial&filter=0'

        //      axios.get(Filter_Data).then(
        //        res => {
        //            console.log("GET TESTIMONIALS DATA",res.data.errMsg);
        //            this.testresponse = res.data.errMsg;
        //             console.log("GET TESTIMONIALS DATA",this.testresponse);  
                    
        //              for( var i=0; i <= this.testresponse.length; i++){
        //                 // console.log('active==>',this.branchResponse[i].active)
        //                 let branchDetails =[]
        //                 if(this.testresponse[i].active ==1){
        //                     this.testresponse[i].StatusRole = 'Active'
        //                 }else{
        //                     this.testresponse[i].StatusRole = 'InActive'
        //                 }
        //                  console.log('active & inactive ==>',this.testresponse);
        //             }
                    

        //        });

        // },
        Searchdatatable() {

        },
        onChannelChange(event) {
            this.formFields.channelCode = event;
        },
        onRoleCodeChange(event) {
            this.formFields.roleCode = event;
        },
        URLValidate(evt) {
            this.formFields.errMsg = [];
            this.formFields.URLWrong = this.YTD_URLValidate(evt);
            if (this.formFields.URLWrong == true) {
                this.formFields.errMsg.push('Please enter correct YouTube URL');
            }
        },
        channelfilters(e){
                console.log('data->',e);
                // for(let i=0; i< this.chn.length; i++){
                //      if(e == this.chn[i]._id){
                //        this.channelcodec.push(this.chn[i].channelCode);
                //        console.log("the CODEC to be posted", this.channelcodec);
                // }
                // }
                    //codec
                    // console.log("ELEMENT->",element);
                // this.page=1
                this.channeldatafilter = e;
                console.log("thechannel is",this.channeldatafilter)
                // this.GetRole(this.channeldatafilter)
            },
        uploadThumb() {
            this.save()
            this.$refs.thumb_file.click();
        },

        fetchAll() {
            let self = this;
            this.showLoader('Loading', true);
            const FETCH_TESTIMONIALS = 'fetch_sales_pitch?type=testimonial';
            this.GET(FETCH_TESTIMONIALS, res => {
                console.log("FROM GET ALL testimonials data->>>>", res.data.errMsg);
                res.data.errMsg.forEach((element, index, array) => {
                    if (index == array.length) {
                        self.showLoader('Loading', false);
                    } else {
                        self.testimonials.push(self.filterFields(element));
                        console.log("Original Testimonals TABLE->", self.testimonials);
                    }
                });
                self.showLoader('Loading', false);
                console.log('Testimonials from ARRAY PUSH' , self.testimonials);
            })
            // .catch(err => {
            //     self.showLoader('Loading', false);
            //      console.log("FROM fetchAll CATCH");
            //     self.showToast('Something went wrong', self.TOST().ERROR)
            // })
        },
        filterFields(res) {
            console.log('filterFields : ', res);
            return {
                testimonial_id: res.testimonial_id,
                id: res._id,
                category_name: res.category_type,
                title: res.title,
                content: res.description,
                channel_code: res.channelCode,
                // fullobject: res,
                filePath: res.filePath,
                // filePath: res.filePath[0] == null || res.filePath[0] == [] || res.filePath[0] == "" ? res.defaultpath[0] : res.filePath[0],
                fileTitle: res.fileTitle == null ? "-" : res.fileTitle ,
                thumbnail: res.thumbnail == null ? res.thumbnail == "" : res.thumbnail,
                // role_code: res.roleCode,
                created_date: res.createdDate,  
                created_by: res.createdBy,
                created_by_name: this.doSentenceCase(res.createdBy.first_name+' '+res.createdBy.last_name),
                status: res.status == 1 ? "Active" : "Inactive",
                updated_by: res.updatedBy,
                updated_date: res.updatedDate,
                updated_by_name: this.doSentenceCase(res.updatedBy.first_name+' '+res.updatedBy.last_name),
                published_status: res.publshedStatus == 1 ? "Published" : "Draft",
                published_by: res.publshedBy == null ? '-' : this.doSentenceCase(res.publshedBy.first_name+' '+res.publshedBy.last_name),
                pub_date: res.publshedDate == null ? '-':  new Date(parseInt(res.publshedDate)).toLocaleDateString() 
            }
        },
        

        // GetRole(e,skip){
        //         this.selectrole = [];
        //         console.log('e value',e)
        //         let Filter_Data
        //         if(e === 'all'){
        //             Filter_Data =  this. API_Service_admin() + 'getrole?userId='+this.getAgentInfo()._id+'&skip='+skip
        //         }else{
        //             Filter_Data = this. API_Service_admin() + 'getrole?userId='+this.getAgentInfo()._id+'&channelCode='+e+'&skip='+skip
        //         }
        //          axios.get(Filter_Data).then(
        //        res => {
        //            console.log(res.data.errMsg);
        //             this.getresponse = res.data.errMsg[0]
        //            for(let i=0; i<this.getresponse.length; i++){
                 
        //             let rolemap ={
        //                   text: this.getresponse[i].roleName,
        //                   value: this.getresponse[i]._id
        //               }
        //                 this.selectrole.push(rolemap);
        //            }

        //            res.data.errMsg.forEach(element => {
        //                            element.StatusRole = '';
        //                        });
        //             // for( var i=0; i <= this.getresponse.length; i++){
        //             //     // console.log('active==>',this.branchResponse[i].active)
        //             //     let branchDetails =[]
        //             //     if(this.getresponse[i].active ==1){
                          
        //             //         this.getresponse[i].StatusRole = 'Active'
        //             //     }else{
        //             //         this.getresponse[i].StatusRole = 'InActive'
        //             //     }
        //             //      console.log('active & inactive ==>',this.getresponse);
        //             // }
                   
        //             // console.log(this.obj)
        //        }
        //    ).catch(
        //        err => {
        //            console.log(err) ;
        //        }
        //    );
        //     },
        mapRoleCodes(model){
            console.log("inside model->", model)
            // multiroles = model.map(doc => {
            //     return doc.value
            // });
        },
        setValuesOnForm(res) {
            console.log("SSETT->>>",res);
            this.resetFields();
            this.formFields.title = res.title;
            this.formFields.content = res.description;
            this.channeldatafilter = res.channelCode;
            this.idforput = res._id;
            this.formFields.videoTitle = res.fileTitle;
            this.formFields.thumbnail.location = res.thumbnail;
            // this.fp = res.filePath[0];
            // for(let i=0; i<res.filePath.length; i++){
            this.formFields.mediaFiles[0] = res.filePath[0];
            // }
            this.formFields.youtubeURL = '';
            this.formFields.publishStatus = res.publshedStatus == 1 ? '1' : '0';
            this.formFields.active = res.status == 1 ? '1' : '0';
            this.formFields.HTTP = 'PUT';
            this.e1 = 1;
            // console.log("fp is ->", this.fp);
             console.log("Setting THumbnail on fetchbyID->",   this.formFields.thumbnail.location);
             console.log("Media Files setting in form for edit",this.formFields.mediaFiles);
            // console.log("the channel set is ->", this.channeldatafilter);
            // console.log("the role set is->", this.selectedrole);
            // console.log("the ID for PUT->",  this.idforput);
        },

        // TODO: This @function is works for new testimonials, When admin press new button then first function will clear all the fields then show stepper
        resetFields() {
            let props = null;
            for(props in _dup_formFields) {
                this.formFields[props] = _dup_formFields[props]
            }
            this.formFields.showStepper = true;
        },
        fetchById(item, identifier) {
            console.log(">>>identity->>>",identifier);
            // this.tableindex = index;

            let self = this;
            // console.log("Fetch by ID",item._id);

            if(identifier == 1){
                console.log("identifier is->", identifier);
                // var planid = item._id;
                // console.log("planid->", planid);
                 this.idforput = item._id;
            }else{
                   console.log("ELSE identifier is->", identifier);
                 var planid = item.id;
                 console.log("planid->", planid);
                  console.log("Fetching by ID from PUT's callback,",item);
         
                this.showLoader('Loading', true);
                const FETCH_TESTIMONIALS_BY_ID =  this.API_Service_admin()+'fetch_sales_pitch?type=testimonial&id='+planid

                axios
                .get(FETCH_TESTIMONIALS_BY_ID)
                .then(res => {
                    console.log("FetchBY ID OG response->",res.data.errMsg);
                    if (res.data.errCode == 4) {
                        self.showLoader('Loading', false);
                        self.showToast('Database Error', self.TOST().ERROR)
                        return;
                    }
                    if (res.data.errCode == 10) {
                        self.showLoader('Loading', false);
                        self.showToast('Invalid request', self.TOST().ERROR)
                        return;
                    }
                    if (res.data.errCode == 15) {
                        self.showLoader('Loading', false);
                        self.showToast('Filter is not found in http request', self.TOST().WARNING)
                        return;
                    }
                    if (res.data.errCode == 101) {
                        self.showLoader('Loading', false);
                        self.showToast('No testimonial data found', self.TOST().INFO)
                        return;
                    }
                    if (res.data.errCode == -1) {
                            console.log("Fetch BY ID for before sending for forms->",res.data.errMsg[0]);
                            self.setValuesOnForm(res.data.errMsg[0]);
                            console.log("FRom Setting values into FORM fetchby ID->",res.data.errMsg[0])
                            self.showLoader('Loading', false);
                            console.log('From else part');
                        
                        
                    }
                })
                .catch(err => {
                    self.showLoader('Loading', false);
                    self.showToast('Something Goes wrong', self.TOST().ERROR)
                            console.log("from FID wrong")
                })
            }
           
        },
        handleFileUpload(event, indicator, index) {

            /**
             *   
             * if(  this.formFields.editFile == true){
                                 console.log("INDEX OF it->", this.indexofedit);
                                 _this.formFields.mediaFiles.splice(this.indexofedit, 1,res.data.errMsg )
                        }else{
                              _this.formFields.mediaFiles.push(res.data.errMsg);
                        }
             * 
             * 
             * The editFile property helps in file upload process,
             * User uploading a new file or reuploading (means replace with exisiting)
             */
            console.log("Are we posting?")
            console.log('Event : ', event);
            this.editindex = index;
            this.formFields.editFile = indicator == 'edit' ? true : false;
            console.log("EDITING ??=>",  this.formFields.editFile);
            try {
                if (event.target.files.length > 0) {
                    // if (this.e1 == 2) {
                        try {
                            if (event.target.files[0].type.split("/")[0] === "video") {
                                console.log("reached video block...?");
                                this.formFields.fileName = event.target.files[0].name;
                                this.validateFiles(5, event.target.files[0]);
                            } else if (event.target.files[0].type.split("/")[0] === "image") {
                                // 25/03/2019
                                this.formFields.thumnailFileName = event.target.files[0].name;
                                this.validateFiles(5, event.target.files[0]);
                            }
                        } catch(err) {
                            console.log(err);
                            this.showToast('You have selected a wrong file', this.TOST().WARNING);
                        }
                    // }
                }
            } catch(err) {
                console.error(err);
            }
        },
        openLightBox(obj) {

            console.log('Object  ', obj);
            this.dialog = true;
            this.formFields.lightBox.location = obj.location;
            // this.formFields.lightBox.ext = obj.fileType == 'mp4' ? obj.fileType : obj.fileType.toLowerCase();

        },
        validateFiles(id, file) {
            let sendFile = {};
            var regex_VID = new RegExp('^(mp4|jpg|jpeg|png)$');
            sendFile = file;
            console.log("Now in Send Files->", sendFile);
            if (id == 5) {
                if (regex_VID.test(sendFile.type.split("/")[1])) {
                    // this.showToast('File is correct', this.TOST().INFO);
                    this.showLoader('Uploading', true);
                    this.uploadFile(sendFile);  // uplaod file from this function Date 9/JAN/2019
                } else {
                    this.showToast('You can\'t upload this file type from here', this.TOST().WARNING);
                }
            }
        },

        uploadFile(sendFile) {
            // alert("Upload FIle, invoked");
            let _this = this;
            let formData = new FormData();
            formData.append('media_upload', sendFile);
            //videopost  http://172.16.56.162:5010/secure/admin/uploadFile  http://159.89.161.64:5035/secure/admin/uploadFile

            const UPLOAD_API = 'v2/uploadFile'
            console.log("formdata appended before post", UPLOAD_API);

            this.POST( UPLOAD_API, formData, (res, err) => {

            // axios
            // .post(UPLOAD_API, formData, {
            //     headers: {  'Content-Type': 'multipart/form-data' }
            // })
            // .then(res => {
                // if (_this.e1 == 2) {
                  console.log("checking edit or original upload",this.formFields.editFile);
                  
                    _this.showLoader('Uploading', false);
                    if (res.data.errMsg.fileType == 'mp4') {
                    //up99
                    // @akrazr (Video File edit upload and normal upload) Here we will either Upload a single file or edit an already uploaded file 

                    if(this.formFields.editFile == true){
                            console.log("INDEX OF it->", this.editindex);
                            _this.formFields.mediaFiles.splice(this.editindex, 1,res.data.errMsg )

                        }else{
                              _this.formFields.mediaFiles.push(res.data.errMsg);
                    }

                        // _this.formFields.mediaFiles.push(res.data.errMsg);
                        console.log("The MediaFiles we have are->", _this.formFields.mediaFiles);
                    } else if(res.data.errMsg.fileType == 'jpg' || res.data.errMsg.fileType == 'jpeg' || res.data.errMsg.fileType == 'png') {
                        _this.formFields.thumbnail = res.data.errMsg;
                        console.log('_this.formFields.thumbnail ', _this.formFields.thumbnail);
                    }
                // }

                if ('fileName' in res.data.errMsg) {
                    _this.showToast('File uploaded successfully', _this.TOST().SUCCESS);
                } else {
                    _this.showToast('Uploading process intrupted', _this.TOST().ERROR);
                }
            })
            .catch(err => {
                _this.showLoader('Uploading', false);
                _this.showToast('Something goes wrong during uploading', _this.TOST().ERROR);
            })
        },

        /**
         * @function save
         * POST, PUT formdata from here */
        
        save() {
            this.savebtn = true;
            // Mandatory fields validation
            if (this.formFields.mediaFiles.length < 0 ||  this.formFields.title == null || this.formFields.title == undefined || this.formFields.title == "" || this.channeldatafilter === "") {
                this.showToast('Mandatory fields are not found' , this.TOST().WARNING);
                this.e1 = 2;
                return;
            }

            console.log("Media FILES->", this.formFields.mediaFiles[0]);
            // console.log("VIDEO FILE TIITLE=>", this.formFields.videoTitle);
            var formData = {

                filePath:  this.formFields.mediaFiles[0],
                title: this.formFields.title,
                description: this.formFields.content,
                channelCode: this.channeldatafilter,
                userId: this.getAgentInfo()._id,
                // roleCode: this.selectedrole,
                // category_type: this.formFields.salesPitchCategory.abbr,
                publshedStatus:0, 
                status: this.formFields.active,
                fileTitle: this.formFields.videoTitle,
                thumbnail: this.formFields.thumbnail.location,
                id: this.idforput
            };

            console.log("FORMDATA->>>>>", formData);
            console.log("FORMDATA MediaFile->>>", formData.filePath);
            // return;
            if (this.formFields.HTTP == 'POST') {
                console.log("NOW POSTING ONLY")
                this.doPost(formData);

            } else if (this.formFields.HTTP == 'PUT') {
                  console.log("NOW FIRING PUT ONLY")  
                // this.fetchById() 
                //  formData.filePath = this.fp;
                //this gets the put an ID from post, while the next line gets the status(pub/draft)as now the switches are moved below and no longer a part of post
                 formData.id = this.idforput;
                 formData.publshedStatus = parseInt(this.formFields.publishStatus),
                 console.log("Piblished status on PUT ?",  formData.publshedStatus)
                 console.log("Firing PUT with ID->", formData.id);
                 this.doPut(formData);    
            }
        },

        doPost(formData) {
            const INSERT_TESTIMONIALS = 'new_sales_pitch?type=testimonial';
            this.showLoader('Saving', true);

            let self = this;
            this.POST(INSERT_TESTIMONIALS, formData, (res, err) => {
                // When compile time issue found or object keys undefined etc
                if (err) {
                    self.showLoader('Saving', false);
                    self.showToast('Something Went wrong', self.TOST().ERROR);
                    return;
                }

                // When database error occured
                if (res.data.errCode == 4) {
                    self.showLoader('Saving', false);
                    self.showToast('Database Error', self.TOST().ERROR);
                    return;
                }
                                                        
                if (res.data.errCode == 15) {
                    self.showLoader('Loading', false);
                    self.showToast('Filter not found in http request', self.TOST().WARNING)
                    return;
                }

                if (res.data.errCode == 10) {
                    self.showLoader('Saving', false);
                    self.showToast('Invalid request', self.TOST().ERROR);
                }

                if (res.data.errCode == 134) {
                    self.showLoader('Saving', false);
                    self.showToast('Mandatory fields are not found', self.TOST().WARNING);
                    return;
                }

                if (res.data.errCode == -1) {
                   
                    //  this.fetchreal(res.data.errMsg);
                    console.log("From Post calling fetchbyId->>");
                     this.fetchById(res.data.errMsg, 1);
                    console.log("Post resquest fired->", res.data.errMsg);
                    self.showLoader('Saving', false);
                    self.showToast('Successfully Created', self.TOST().SUCCESS);
                    self.formFields.HTTP = 'PUT';
                    
                    self.e1 = 2;        // jump to next window
                    // self.showToast('Database Error', self.TOST().ERROR);
                }
            });
        },
         fetchreal(thedata){
            console.log("the data in fetch REAl->",thedata);
            // var channelis = thedata.channel_code._id;
            var planid = thedata._id
            console.log("The plan ID->",planid);
            const FETCH_TESTIMONIALS_BY_ID =  this.API_Service_admin()+'fetch_sales_pitch?type=testimonial&id='+planid

             this.GET(FETCH_TESTIMONIALS_BY_ID , res  => {
                
                if (res.data.errCode == 4) {
                    self.showLoader('Loading', false);
                    self.showToast('Database Error', self.TOST().ERROR)
                    return;
                }
                if (res.data.errCode == 10) {
                    self.showLoader('Loading', false);
                    self.showToast('Invalid request', self.TOST().ERROR)
                    return;
                }
                if (res.data.errCode == 15) {
                    self.showLoader('Loading', false);
                    self.showToast('Filter is not found in http request', self.TOST().WARNING)
                    return;
                }
                if (res.data.errCode == 101) {
                    self.showLoader('Loading', false);
                    self.showToast('No testimonial data found', self.TOST().INFO)
                    return;
                }
                if (res.data.errCode == -1) {
                    // consosle.log("the realdata response",thedata);
                    // self.setValuesOnForm(res.data.errMsg[0]);
                    
                    console.log("BEFORE-LENGTH", this.testimonials.length)
                    console.log("FOR Setting values into FORM fetchby ID NEW VALUES after edited->",res.data.errMsg[0]);
                    this.temp = res.data.errMsg[0];
                    // this.temp2 = res.data.errMsg[0];
                    this.temp.created_by_name = this.temp.createdBy.first_name + " "+ this.temp.createdBy.last_name;
                    this.temp.updated_by_name = this.temp.updatedBy.first_name + " "+ this.temp.updatedBy.last_name;
                    this.temp.content = this.temp.description;
                    this.temp.published_status = this.temp.publshedStatus;
                    this.temp.created_date = this.temp.createdDate;
                    this.temp.updated_date = this.temp.updatedDate;
                    if( this.temp.status === 1 ){
                         this.temp.status = "Active";
                    }else{
                         this.temp.status = "Inactive";
                    }
                    console.log("after temp-> the res.data.errMsg",res.data.errMsg[0]);
                    console.log("the temp",this.temp);
                    // this.testimonials.splice(0,0,this.temp);
                    console.log("after-LENGTH", this.testimonials.length)

                                    // this.testimonials.filter(element =>{
                                    //           if( this.temp2._id == element.id){
                                    //               console.log("ID matched ?", element)
                                    //             //   console.log(" ELEMENT FOUND IS ->", element);
                                    //               element = this.temp2;
                                    //              return element
                                             
                                    //           }   
                                              
                                    // })

                    //   console.log("INDEXED TESTIMONIAL IS->>>",this.testimonials[this.tableindex])
                    //   this.testimonials[this.tableindex] = this.temp ;
                    //  console.log("AFTER INDEXED TESTIMONIAL IS->>>",this.testimonials[this.tableindex])
                    }
                   // self.showLoader('Loading', false); 
                   
            })
            // .catch(err => {
            //     // self.showLoader('Loading', false);
            //     console.log("FROM REALS CATCH");
            //     self.showToast('Something went wrong', self.TOST().ERROR)
            // })            
        },
        doPut(formData) {
            const LODAER_MSG = 'Updating'
            const UPDATE_TESTIMONIALS = 'update_sales_pitch?type=testimonial';
            this.showLoader(LODAER_MSG, true);
            let self = this;
            console.log("Form data given to PUT", formData);
            this.PUT(UPDATE_TESTIMONIALS , formData, (res, err) => {
                // When compile time issue found or object keys undefined etc
                if (err) {
                    self.showLoader(LODAER_MSG, false);
                    self.showToast('Something goes wrong', self.TOST().ERROR);
                    console.log("fromPUT wrong")
                    return;
                }

                // When database error occured
                if (res.data.errCode == 4) {
                    self.showLoader(LODAER_MSG, false);
                    self.showToast('Database Error', self.TOST().ERROR);
                    return;
                }

                if (res.data.errCode == 15) {
                    self.showLoader('Loading', false);
                    self.showToast('Filter is not found in http request', self.TOST().WARNING)
                    return;
                }

                if (res.data.errCode == 10) {
                    self.showLoader(LODAER_MSG, false);
                    self.showToast('Invalid request', self.TOST().ERROR);
                }

                if (res.data.errCode == 134) {
                    self.showLoader(LODAER_MSG, false);
                    self.showToast('Mandatory fields are not found', self.TOST().WARNING);
                    return;
                }
                if (res.data.errCode == -1) {
                    self.showLoader(LODAER_MSG, false);
                    self.formFields.HTTP == 'PUT';
                    self.e1 = 2;
                    // console.log("PUT END and formdata=> ?",formData);
                    console.log("The response of PUT?->",res.data.errMsg)
                    // this.fetchreal(res.data.errMsg);
                    // var byid = formData.id
                   
                }
            });
        },
    }
}
</script>


<style>
   .testimonials-form p {
        margin: 0;
    }
   .thebtn{

     color:white;
     border-radius:5px;
     font-size:15px;
    }

    .testimonials-form .margin-tbl{
        margin-right: 20px;
        margin-left: 20px;
    }

    .testimonials-form .sd-light-cyan {
        color: #01B4BB
    }
    .testimonials-form .sd-img-btn-size {
        width: 100px;
        height: 100px;
        cursor: pointer;
    }
    .testimonials-form .sd-upload-img-sec {
        /* background-color: rgb(245, 245, 245); */
        height: 100px;
        border: 1px solid #E0E0E0;
    }
    .testimonials-form .sd-upload-img-sec .label-color {
        color: #9B9B9B;
        cursor: pointer;
    }

    .testimonials-form .sd-tb-row-img {
        width: 70px;
        height: 40px;
    }

    .testimonials-form .sd-tb-sec3-width {
        width: 30%;
    }

    .testimonials-form .v-toolbar__content, .v-toolbar__extension {
        padding: 0;
    }

    .testimonials-form .sd-row-tb-img {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .testimonials-form .sd-action-btn-cnter {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .testimonials-form .media-pos {
        position: relative;
        top:98.5px;
    }

    .testimonials-form .dragFile {
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
