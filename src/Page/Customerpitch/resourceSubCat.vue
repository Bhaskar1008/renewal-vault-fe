<template>
    <div>
      <v-card>
        <v-layout align-center justify-space-between row fill-height class="mr-3 ml-3 mb-2 pt-3">
            <!-- <h3 class="title font-weight-regular">Testimonial</h3> -->
            <v-flex xs10 sm6 md2 class=" mt-1 mr-4" >
                            <v-select v-model="filt_ch"
                                    :items="channeldataall"
                                    item-text="text"
                                    item-value="value"
                                    label="Channel"
        
                                    @change="for_ch_filter(filt_ch)">
                            </v-select>
            </v-flex>
            <v-flex>   </v-flex>
            <v-btn large color="primary" class="white--text thebtn" @click="resetFields">New</v-btn>
            <v-flex xs10 sm6 md2 class="ml-3 ">
                                <v-text-field
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search here"
                                append-icon="search"
                                height="30px"></v-text-field>
            </v-flex>
        </v-layout>

        <hr>

        <div class="testimonials-form pa-3">
            <!-- <v-flex>
                <v-btn large round @click="sendtestdata"> Send test data </v-btn>
            </v-flex> -->
            <v-layout align-center >
                            <v-flex xs12 md2>
                                <p class="body-2">Channel:</p>
                            </v-flex>
                             <!-- @click="toggle" -->
                                <v-flex xs10 sm6 md4 class=" mt-1 mr-4" >
                                    <v-select v-model="channeldatafilter"
                                            :items="channeldataall"
                                            item-text="text"
                                            item-value="value"
                                            label="Select Channel *" 
                                            multiple
                                            chips
                                            @change="channelfilters"
                                            :error-messages="check_ch"
                                            >
                                    </v-select>
                                

                                <!-- <v-btn @click="getselected(channeldatafilter)" > Get Roles</v-btn> -->

                            <!-- <template v-slot:prepend-item>
                                   
                                <v-btn @click="selectAll(1)">Select All</v-btn>
                                <v-btn @click="dis">DiSelect All</v-btn>
                            </template> -->
                        </v-flex>
                        <!-- <v-flex>
                          
                            <v-icon class="ttip">info</v-icon>
                         
                        </v-flex> -->
            </v-layout>

<v-layout row>
    <div style="display: flex; justify-content: center; align-items: center;" v-if="channeldatafilter.length > 0" >
         <p class="body-2">Roles:</p>
    </div>
    <v-flex>
                    <!-- t99 -->
        <!-- <p>{{ JSON.stringify(selec)}}</p> -->
            <v-treeview
            class="thetree"
            hoverable 
                shaped
               rounded
                @input="whatweget"
                v-model="selec"
                selectable
                selection-type="independent"
                return-object
                selected-color="green"
                :items="itemss"  
                open-all
            ></v-treeview>
    </v-flex>
</v-layout>
              <!-- <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Role Code:</p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                 <v-select v-model="selectedrole"
                                    @change="mapRoleCodes"
                                    multiple
                                    chips
                                    :items="rolesall"
                                    item-text="text"
                                    item-value="value"
                                    label="Role"
                                   >
                                </v-select>
                            <template v-slot:prepend-item>
                                  
                                <v-btn @click="selectAllrole(1)">Select All</v-btn>
                                <v-btn @click="emptyroles">Dis-Select All</v-btn>
                            </template>
                        </v-flex>
            </v-layout>    @click="toggle" -->
            <!-- cr99 -->
            <v-layout align-center row>
                          <v-flex xs12 md2>
                                <p class="body-2">Resource Category:</p>
                          </v-flex>
                          <v-flex xs10 sm6 md4 class="mt-1 mr-4" >

                                    <v-combobox
                                            v-model="resourcecat"
                                            :items="rescategory"
                                            item-text="text"
                                            item-value="value"
                                            label="Select Resource Category *" 
                                            @change="resmaincat(resourcecat)"
                                            :error-messages="errr_cat"
                                    >
                                    </v-combobox>
                        </v-flex>
            </v-layout>
               <v-layout align-center row>
                          <v-flex xs12 md2>
                                <p class="body-2">Sub-Categories:</p>
                          </v-flex>
                          <v-flex xs10 sm6 md4 class="mt-1 mr-4" >
                                    <v-select v-model="subcat"
                                            :items="subcategories"
                                            item-text="text"
                                            item-value="value"
                                            label="Select Sub-Categories *" 
                                            @change="subcatefilter"
                                            :error-messages="err_sub_cat"
                                    >
                                    </v-select>
                        </v-flex>
            </v-layout>
                                 <!-- @change="radiochecks" -->
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

            <v-layout align-center row>
                <v-flex xs12 md2>
                    <p class="body-2">Title:</p>
                </v-flex>
                <v-flex xs12 sm6 md4>
                      <!-- @change="resource_validate(formFields.title, 1 , 'title' )" -->
                    <v-text-field
                        :error-messages="title_check"
                        label=""
                        v-model="formFields.title"
                        placeholder="Enter title here *"
                        :rules="err_title"
                        @blur="$v.formFields.title.$touch()"
                        
                    ></v-text-field>
                </v-flex>
            </v-layout>

                        <v-layout column class="mt-4 mb-4">
                            <v-flex xs12 md2 class="mt-4 mb-2">
                                <p class="body-2">Description:</p>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-textarea counter="320" maxlength="320" outline name="input-7-4" auto-grow label="Enter description here *"
                                      @blur="$v.formFields.content.$touch()"
                                    :error-messages="content_check"     v-model="formFields.content"
                                ></v-textarea>
                            </v-flex>
                        </v-layout>

                        <!-- <v-btn color="#01B4BB" class="white--text"  @click="save">Save and upload Videos</v-btn> -->
                         <!-- <v-btn color="#01B4BB" class="white--text" v-if="theedit" @click="editit">Continuee</v-btn> -->
                        <!-- <v-btn flat style="background-color: #F5F5F5" @click="closeit">Close</v-btn> -->
            


            <v-layout align-center d-flex>
                            <v-flex xs12 md3>
                                <!-- <p class="body-2">Video Title : </p> -->
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <!-- <v-text-field label="" v-model="formFields.videoTitle" placeholder="Enter video title here"
                                ></v-text-field> -->
                            </v-flex>
            </v-layout>


        <!-- Code for Uploading Images running fine -->
                <!-- Flow is:==>
                Accept file
                Sends to Upload API -->

             <v-layout row wrap align-center style="cursor:pointer" class="mb-4"  v-if="subcat == 'ftimg'"  >
                            <input ref="planPictures" name="media_upload" type="file" accept="image/x-png,image/jpeg" class="dragFile" @change="handleFileUpload"/>
                            <v-layout align-center justify-center row fill-height class="grey lighten-4 sd-upload-img-sec mr-2">
                                <v-flex xs2  @click="uploadThumb">
                                    <p class="body-2 text-md-center label-color">{{planImages.text}}</p>
                                    <!-- <v-text class="body-2 text-md-center label-color" v-else>{{fileEvent.target.files[0].name}}</v-text> -->
                                </v-flex>
                            </v-layout>
                            <v-flex xs2 @click="validateFiles(2)">
                                <img src="../../assets/Group_971.png" class="sd-img-btn-size"/>
                            </v-flex>
             </v-layout>

<!-- ========================================== Now Uploading PDF files //pd99 ==================================================== -->
<v-layout column  v-if="subcat == 'pdf'"  >
    <p class="body-2 mb-3">Please upload PDF file from local:</p>

    <v-layout row wrap align-center style="cursor:pointer" class="mb-4">
                                <input type="file" ref="brochuresFiles" name="media_upload" accept="application/pdf" class="dragFile" v-on:change="handleFileUpload" />
                                <v-layout align-center justify-center row fill-height class="grey lighten-4 sd-upload-img-sec mr-2">
                                    <v-flex xs2 >
                                        <p class="body-2 text-md-center label-color">{{brochures.text}}</p>
                                    </v-flex>
                                </v-layout>
                                <v-flex xs2>
                                    <img src="../../assets/Group_971.png" class="sd-img-btn-size" @click="validateFiles(3)"/>
                                </v-flex>
    </v-layout>
</v-layout>


<!-- +++++++++++++++++++++++++++++++++++++++ Now for Uploading Video vid99 ++++++++++++++++++++++++++++++++++++++++++++++++++-->
<v-layout column   v-if="subcat == 'videos'" >
    <p class="body-2 mb-3">Please upload video from local:</p>
                               
    <v-layout row wrap align-center style="cursor:pointer" class="mb-4">
                            <input ref="planPictures" name="media_upload" type="file" accept="video/*" class="dragFile" @change="handleFileUpload"/>
                            <v-layout align-center justify-center row fill-height class="grey lighten-4 sd-upload-img-sec mr-2">
                                <v-flex xs2 >
                                    <!-- @click="uploadThumb" -->
                                    <p class="body-2 text-md-center label-color">{{formFields.fileName}}</p>
                                    <!-- <v-text class="body-2 text-md-center label-color" v-else>{{fileEvent.target.files[0].name}}</v-text> -->
                                </v-flex>
                            </v-layout>
                            <v-flex xs2 @click="validateFiles(1)">
                                <img src="../../assets/Group_971.png" class="sd-img-btn-size"/>
                            </v-flex>
    </v-layout>
</v-layout>                            
                                <!-- <v-layout align-center row wrap class="mb-4">
                                    <v-flex xs4 sm6 md2>
                                        <input type="file" name="media_upload" ref="prodVideo" accept="video/*" class="sd-img-btn-size media-pos" style="opacity: 0" @change="handleFileUpload"/>
                                        <img src="../../assets/Group_968.png" class="sd-img-btn-size"/>
                                    </v-flex>
                                    <v-flex xs6 sm3>
                                        <p class="caption body-2 font-italic font-weight-medium" style="color:#9B9B9B">{{ formFields.fileName }}</p>
                                    </v-flex>
                            <v-flex xs2>
                                <img src="../../assets/Group_971.png" class="sd-img-btn-size" @click="validateFiles(2)"/>
                            </v-flex>
                                </v-layout> -->


            <v-layout align-center d-flex>
                            <v-flex xs12 md2>
                                <p class="body-2">Upload Thumbnail/Main Image: </p>
                            </v-flex>
                            <v-flex xs12 sm6 md4 style="position:relative; margin-bottom:60px; ">
                                <input
                                ref="thumb_file"
                                type="file"
                                name="thumbnail_upload"
                                accept="image/x-png,image/jpeg"
                                
                                style="display: block; border: 1px solid red; height: 50px; opacity:0; position: absolute; z-index: 199;"
                                @change="handleFileUpload($event, '', 0, 'thumb')" />
                               <p style="margin-left:10px;font-size:10.5px; letter-spacing:0.4px ;font-family:roboto; font-weight:400;">Recommended dimensions - Width 1000px, Height: 500px</p> 

                                <div style="display:flex;flex-direction:row;align-items:center; position:absolute;">
                                    <v-btn color="blue-grey" class="white--text" >
                                        Upload
                                        <v-icon right dark>cloud_upload</v-icon>
                                    </v-btn>
                                    <p>{{formFields.thumnailFileName}}</p>
                                </div>
                               
                            </v-flex>

                            <v-flex xs12 sm6 md6 v-if="Object.keys(formFields.thumbnail).length > 0">
                                <img :src="formFields.thumbnail.location" style="height: 100px; width: 150px" @click="openthumb(formFields.thumbnail)"/>
                            </v-flex>

                        </v-layout>
    <div style="display: none;">
                        <v-layout align-center row wrap class="mb-3">
                            <v-flex xs12 sm6 md6>
                                <!-- <p class="body-2 mb-3">Please upload video from local:</p> -->
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
</div>

            <v-card color="grey lighten-4" class="mb-4" flat tile v-if="formFields.mediaFiles.length > 0 || brochurestabledata.length > 0" >
                            <v-toolbar dense>
                                <v-layout row fill-height>
                                    <v-flex  xs2 style="background-color: #01B4BB" d-flex align-center justify-center>
                                        <v-toolbar-title style="color:white" class="subheading text-md-center">Media</v-toolbar-title>
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

 <!-- =================== Upload Table for Image Only =============================== -->
<div   v-if="this.imageitis" >
                            <v-layout  row v-for="(media, index) in formFields.mediaFiles" :key="index">
                                <v-flex xs2 class="sd-row-tb-img pa-2" style="background-color: #01B4BB">
                                    <img v-if="media.fileType !== 'mp4'" :src="media.location" class="sd-tb-row-img" @click="openLightBox(media)"/>
                                    <!-- for thumbnail -->
                                    <!-- <div  v-if="media.fileType == 'mp4'" >
                                        <video    pause @click="openLightBox(media)" class="sd-tb-row-img">
                                            <source :src="media.location" type="video/mp4">
                                            <source :src="media.location" type="video/ogg">
                                            Your browser does not support the video tag.
                                        </video>
                                    </div> -->
                                </v-flex>
                                <!-- <v-flex xs2 class="sd-row-tb-img pa-2" style="background-color: #01B4BB">
                                    <img :src="media.location" class="sd-tb-row-img" @click="openLightBox(media)"/>
                                </v-flex> -->
                                <v-flex  xs10 d-flex align-center justify-center class="pa-2">
                                    <p class="body-1 text-md-center" style="color:#757575">{{media.fileName |  }} </p>
                                </v-flex>
                                <v-flex  xs4 d-flex align-center justify-center class="pa-2">
                                    <v-radio-group v-model="media.active" row justify-center xs2 @change="handleMediaActivationDeactivation($event, index)">
                                        <v-radio label="Active" value="1" color="success"></v-radio>
                                        <v-radio label="Inactive" value="0" color="red"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                                <v-flex  xs2 d-flex align-center justify-center class="pa-2">
                                    <edit-file accept="image/x-png, image/jpeg" @onFileChange="handleFileUpload($event, 'edit', index)"></edit-file>
                                </v-flex>
                            </v-layout>
</div>                                                  
<!-- ========================= Upload Table for Video Only ============================== -->
<div   v-if="this.videoitis" >
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
                                    <img :src="media.location" class="sd-tb-row-img" @click="openLightBox(media)"/> fileName
                                </v-flex> -->
                                <v-flex  xs10 d-flex align-center justify-center class="pa-2">
                                    <p class="body-1 text-md-center" style="color:#757575">{{media.location}}</p>
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
</div>

<div v-if="this.pdfitis">
     <v-layout row v-for="(docs, docIndex)  in brochurestabledata" :key="docIndex">
                                        <v-flex  xs2 class="sd-row-tb-img pa-2" style="background-color: #01B4BB">
                                            <img v-if="docs.fileType == 'pdf'" src="../../assets/pdf.png" class="sd-tb-sec3-width" />
                                            <!-- <img v-else src="../../assets/pptx.png" class="sd-tb-sec3-width" /> -->
                                        </v-flex>
                                        <v-flex  xs2 class="sd-row-tb-img pa-2">
                                            <p class="body-1 text-md-center" style="color:#757575">{{docs.fileType}}</p>
                                        </v-flex>
                                        <!-- <v-flex  xs3 class="sd-row-tb-img pa-2" style="background-color: #EFEFEF">
                                            <p class="body-1 text-md-center" style="color:#757575">{{docs.language}}</p>
                                        </v-flex> -->
                                        <v-flex  xs6 class="sd-row-tb-img pa-2">
                                            <p class="body-1 text-md-center" style="color:#757575">{{docs.fileName}}</p>
                                        </v-flex>
                                        <v-flex  xs3 class="sd-row-tb-img pa-2" style="background-color: #EFEFEF">
                                            <v-radio-group v-model="docs.active" row justify-center xs2 @change="handleMediaActivationDeactivation($event, docIndex)">
                                                <v-radio label="Active" value="1" color="success"></v-radio>
                                                <v-radio label="Inactive" value="0" color="red"></v-radio>
                                            </v-radio-group>
                                        </v-flex>
                                        <v-flex xs2 class="sd-action-btn-cnter">
                                        
                                        <div style="position:relative; width:130px; height:100px;">
                                            <input  style="z-index:199; cursor:pointer; margin-top:35px position:absolute" type="file" ref="brochuresFiles" name="media_upload" accept="application/pdf" class="dragFile" v-on:change="handleFileUpload($event, 'edit')" />    
                                            <v-btn style="position:absolute;  cursor:pointer; margin-top:35px;" small color="#01B4BB" class="white--text">edit</v-btn>
                                        </div>
                                        <!-- <edit-file  accept="application/pdf" ref="brochuresFiles" @onFileChange="handleFileUpload($event, 'edit', docIndex)"></edit-file> -->
                                            
                                            <!-- <div>
                                                <input
                                                    type="file"
                                                    ref="editFiles"
                                                    class="edit-btn-files"
                                                    accept="application/vnd.openxmlformats-officedocument.presentationml.presentation, application/pdf"
                                                    @change="handleFileUpload($event, 'edit', index)"
                                                />
                                            </div> -->
                                            <!-- <div class="sd-action-btn-cnter"><v-btn small color="#01B4BB" class="white--text" @click="onFileEdit(docs)">edit</v-btn></div> -->

                                        </v-flex>
                                </v-layout>
</div>

                        </v-card>

<v-layout class="mt-4">
         <v-flex xs12 md2 class="mt-4 mr-2">
                <p class="body-2">Tags: </p>
         </v-flex>
            <v-flex xs12 md3 class="pb-4 mb-2">
                <v-combobox
                    v-model="multitags"
                    counter light hint
                    :items="thetags"
                    @change="selectedtags"
                    item-value="value"
                    filled
                    chips
                    deletable-chips
                    label="Select or Search Existing Tags *"
                    multiple
                    small-chips
                    >
               </v-combobox>
            </v-flex>
            <v-flex md2> 
                <v-layout column justify-center align-center class="mt-2 ml-4">
                    <!-- <p style="font-family:roboto; font-weight:400; font-size:16px; color:#1976d2;">Add new Tags</p> -->
                    <v-btn round medium color="primary" @click="opentags" >Add new Tags <v-icon right >add_circle
</v-icon> </v-btn>
                </v-layout>
            </v-flex>
</v-layout>

            <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Publish: </p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-radio-group @change="radiochecks"  v-model="formFields.publishStatus" row>
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


              
<!-- tags    @change="whatitdoes"   item-text="text" -->

<!-- <img  :src="tempsrc" id="theimgfound" >  -->
<v-flex>
    
<!-- <v-dialog
      v-model="tagpopup"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Confirm New Tag Creation?</v-card-title>

        <v-card-text>
         A new Tag <span style="font-size:18px; font-weight:bold; color: #01b4bb;"> {{toview}} </span> will be created, after you confirm it.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
           dark
            text
            @click="createthetag(2)"
          >
            No
          </v-btn>
    
          <v-btn
            color="primary"
            text
            @click="createthetag(1)"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <v-dialog
      v-model="tagson"
      width="510"
    >
  
      <v-card >
        <v-card-title
          class="secondary"
          primary-title
          style="color:#fff; font-size:16px;"
        >
         Create New Tags
        </v-card-title>

  <!-- @change="resource_validate(fromtagsinput, 4, 'onlytags' )" -->
         <v-text-field class="pl-4 pt-2 pr-4"
            v-model="fromtagsinput"
            :counter="20"
            maxlength="20"
            label="Add a new Tag here"
            required
            :error-messages="tag_check" 
          
          ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="makenewtags(fromtagsinput)"
          >
           Create a Tag
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


<!-- <v-btn color="primiary" @click="computeall" > Save it</v-btn>  #ff9800   -->
</v-flex>                  
            <v-data-table
                :headers="headers"
                :items="testimonials"
                class="elevation-1"
                hide-actions
                >
                <template slot="items" slot-scope="props">
                    <!-- <td>{{ props.item.id | formate-id('T')}}</td>  contentCategory -->
                    <td class="text-xs-left">{{ props.item.resID.toUpperCase() }}</td>
                     <!-- <td class="text-xs-left">{{ props.item.video }}</td> -->
                    <td class="text-xs-left text-no-wrap ">{{ props.item.title | short}}</td>  
                     <td class="text-xs-left text-no-wrap ">
                         
                             <!-- <v-menu transition="scale-transition" style="cursor:pointer; border-radius: 12px; "  >
                                                <v-chip ref="channel_chip" outline class="mx-0" slot="activator" style="cursor:pointer !important; font-family:roboto; font-weight:600; letter-spacing: 0.4px; " > 
                                                    {{ props.item.arr}}
                                                </v-chip>
											
                                            <v-card class="pa-3" style="border-radius: 12px;" >
                                                         <ul
                                                            v-for="(item, index) in props.item.final"
                                                            :key="index"
                                                            style="display:flex; flex-direction: column;"
                                                            >
                                                            <li style="margin-bottom:4px;" >{{ item }}</li>
                                                            </ul>
                                            </v-card>
    
                                                        
												
					        </v-menu> -->
                         
                         
                         
                         
                         
                         
                          <v-chip outline  style="font-family:roboto; font-weight:300;" > {{ props.item.arr.length == 0 ? "-" : props.item.final }} </v-chip>  </td>  
                    <td class="text-xs-left text-no-wrap">{{ props.item.content | short}}</td>
                    <td class="text-xs-left text-no-wrap">  {{ props.item.contentCategory == 'videos' ? "Videos" : props.item.contentCategory == 'pdf' ? "PDF" : props.item.contentCategory == 'infographic' ? "Infographics" : props.item.contentCategory == 'articles' ? "Article" : "-" }}</td>
                    <!-- <td class="text-xs-left">{{ props.item.channel_code.channelName  }}</td> -->
                    <!-- <td class="text-xs-left">{{ props.item.role_code.roleCode }}</td> -->
                    <td class="text-xs-left"> <span class="status" :style="{color: props.item.status == 'Active' ? '#13961c' : '#d61111'}" > {{ props.item.status}} </span></td>
                    <td class="text-xs-left">{{ props.item.created_date | formate-date }}</td>
                    <!-- <td class="text-xs-left">{{ props.item.created_by_name }}</td> -->
                    <td class="text-xs-left">{{ props.item.updated_date | formate-date}}</td>
                    <!-- <td class="text-xs-left">{{ props.item.updated_by_name }}</td> -->
                    <td class="text-xs-left">  <span class="status" :style="{color: props.item.content_published == '1' ? '#13961c' : '#ff9800'}" > {{ props.item.content_published == null ? "-" : props.item.content_published == 1 ? "Published" : "Draft" }}</span></td>
                    <!-- <td class="text-xs-left">{{ props.item.published_by == null ? "-" : props.item.published_by }}</td> -->
                    <!-- <td class="text-xs-left">{{ props.item.pub_date == null ?  "-" : props.item.pub_date  }}</td> -->
                    <td class="text-xs-left"><v-btn @click="fetchById(props.item,2)" icon><v-icon color="#636363">edit</v-icon></v-btn></td>
                </template>
            </v-data-table>

              <div class="text-xs-center pagination">
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination>
              </div> 

            <v-dialog v-model="dialog" max-width="650">
                <v-card>
                
                    <img v-if="formFields.lightBox.ext == 'png' || formFields.lightBox.ext == 'jpg' || formFields.lightBox.ext == 'jpeg'" :src="formFields.lightBox.location" width="100%"/>
                    
                    <video   v-if="formFields.lightBox.ext == 'mp4'"  id="mediaPlayer" width="100%" :src="formFields.lightBox.location" controls>
                        Your browser does not support HTML5 video.
                    </video>

                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogthumb" max-width="650">
                <v-card>
                    <img :src="formFields.lightBox.location" width="100%"/>
                </v-card>
            </v-dialog>

            <v-dialog v-model="draftboolean" width="550" height="200">
               
                <v-card  flat style="display:flex; justify-content:center; flex-direction:column; padding:10px; align-items:center;">
                     <v-icon large class="closepubdraft" @click="draftboolean= false">&times;</v-icon>
                        <v-icon large v-if="this.formFields.publishStatus == 1" > publish</v-icon>
                          <v-icon large v-if="this.formFields.publishStatus == 0"> save_alt</v-icon>
                        <p class="pubdraftpopup">{{desc_draft_publish}}</p>
                        <v-btn @click="draftboolean= false" color="primary" >ok</v-btn>
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


import {
    required,
    minLength,
    between,
} from 'vuelidate/lib/validators'

import _ from 'lodash/difference'

import diffit from 'lodash/difference'

import loadChannel from '../../common/onProjectLoad.js'

import __ from 'lodash'

var myoldtags = []

const salesPitchCategories = [
    { state: 'Advisor Pitch', abbr: '5c6e48a044d01f450c50e2bf' },
    { state: 'Customer Pitch', abbr: '5c6e4bb7fe777918bcd80882' },
]

var globalformdata = {}

var _dup_formFields = {};
const HELPING_TEXT = "Supports mp4 format. Approx time to upload 15mb file - 2 mins or more";
let rawChannel = null;
let multiroles = []
export default {

    components:{
            editFile,
    },

    validations: {
        channeldatafilter:{
             required,
        },

      formFields:{
        content:{
            required,
            minLength: minLength(5),
        },

        title:{
             required,
             minLength: minLength(3),
       }
      },

        subcat:{required},
        fromtagsinput:{required},

        resourcecat:{required},
        

    },
    
  
    created() {
         this.main_edit = false
        this.gettags();
        // this.gettestimonialstable();
        // this.fetchAll();
        this.$store.commit('SET_PAGE_TITLE','Resource Center');
        // Getting values for Roles drop-down
        var  Filter_Data = 'getrole?userId='+this.getAgentInfo()._id
        //r99
        this.GET(Filter_Data , res =>{

                // console.log("getting Roles here ->", res.data.errMsg[0]);
                let rolesdata = res.data.errMsg[0]
                for(let i =0;i<rolesdata.length;i++){
                        if(rolesdata[i].active === 1){
                            let roleobject ={
                                text:rolesdata[i].roleName,
                                value:rolesdata[i].roleCode,
                            }
                            // for select all
                            this.roledata.push(roleobject);
                            this.rolesall.push(roleobject);  
                        }
                }
                // this.rolesall
        });
        // Getting values for Channel drop-down
        this.rCat();

        // this.GET('getchannel?userId=' + this.getAgentInfo()._id, res => {
        //     if (res.data.errCode == -1) {
        //             console.log("For ROle the selected channel is=>", res.data.errMsg)
        //         //    this.GET('getrole?userId='+this.getAgentInfo()._id+'&channelCode='+e , res =>{
        //         //             console.log("role")
        //         //    }  ) 
        //         // console.log("The response from channel api is=>",res.data.errMsg );
        //         let chdata = res.data.errMsg;
        //         this.chn = res.data.errMsg;
        //         let channelalldata=[]
        //             for(let i =0;i<chdata.length;i++){
        //                 if(chdata[i].active === 1){
        //                     let channetobj ={
        //                         text:chdata[i].channelName,
        //                         value:chdata[i]._id,
        //                     }
        //                     this.channeldata.push(channetobj);
        //                     this.channeldataall.push(channetobj);  
        //                 }
        //             }
        //             // let alldata={
        //             //             text:'All',
        //             //             value:'all',
        //             //         }
        //             //     this.channeldataall.unshift(alldata);
        //                 // console.log("the channel data is ->", this.channeldata.length);
        //     }
        // });

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
                    // let alldata={
                    //             text:'All',
                    //             value:'all',
                    //         }
                    //     this.channeldataall.unshift(alldata)
                })


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
        this.fetchAll('all', 0);
    },

  

    data() {
        return{ 

            filt_ch:"",
            ttl_err:false,
            err_title:[],
            err_content:[],
            err_tags:[],
            err_cat:[],
            errr_sub_cat:[],
           
           start_upload: false,
           
            errormsg:{
                ttl:"",
                content:"",
                category:"",
                type:"",
                channel:"",
                tags:"",

            },

            main_edit: false,
            skipdiffrence:this.paginationdiff(),
            pagination: {},
            pageLength:0,
            page:1,
            skip:0,
            dialogthumb:false,
            desc_draft_publish:"",
            draftboolean:false,
            tempsrc: null,
            promise1:false,
            promise2:false,
            rescat_formData:null,
            newseq:null,
            oldtags:[],
            properthumb:null,
            from_edit_tags: false,
            mediaStatus:null,
            //  'videos', 'pdf', 'articles', 'infographic' 
        collectchannels: [],
        uploaddock:[ {videos:false}, {pdf:false}, {articles:false}, {infographic:false} ],
            fromtagsinput:"",
            tagson:false,
            toview:"",
          tagpopup:false,  
            allowcreation_tag: false,
            sendcat:"",
            mainmedia:[],
            newdataarray:[],
            rescategory:[],
        // rescategory:[],
        resourcecat:"", 
        videoitis:false,
        imageitis:false,
        pdfitis:false,
        subcat:"", 
        subcategories:[
            { text:"Videos", value:"videos" },
            { text:"PDF", value:"pdf" },
            { text:"Article", value:"articles"},
            { text:"Infographics", value:"infographic"},
        ],
        newarrayis:[],
        forchonly:[ ],
        items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' },
          ],
        },],

            foritems:[],
            selectionType:'independent',
            selec:[],
        itemss: [],
            multitags:[],
            thetags:[],
            roledata:[],
            selectallroles:[],
            rolesall:[],
            indexofedit:null,
            planImages: {
                text: "Drag Images here",
                file: '',
                respFileName: '',
                respFileType: ''
            },

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
                {text:'Channel', value:'ch'},
                { text: 'Content', value: 'content' },
                // { text: 'Channel Code', value: 'channel_code' },
                { text: 'Type', value: 'type' },
                { text: 'Status', value: 'status' },
                // { text: 'Role Code', value: 'role_code' },
                { text: 'Created Date', value: 'created_date'},
                // { text: 'Created By', value: 'created_by' },
                { text: 'Updated Date', value: 'updated_date'},
                // { text: 'Updated By', value: 'updated_by' },
                { text: 'Published Status', value: 'published_status' },
                // { text: 'Published By', value: 'published_by'},
                // { text: 'Published Date', value: 'date'},
                { text: 'Action', value: 'action'},
            ],
            testimonials: [],
            salesPitchCategories,
            rolesList: [],
            channelList: [],
            dialog: false,
            brochurestabledata:[],
            brochures: {
                text: "Upload PDF Files",
                file: '',
                respFileName: '',
                respFileType: ''
            },
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
                mediaFiles:[],
                publishStatus: '0',
                active: '0',
                URLWrong: false,
                errMsg: [],
                HTTP: 'POST',
                fileis:'',
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

        shorten(text) {
            try {
                 text = text.slice(65)
            }catch(err){  }
            return text;
        },

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


          check_ch(){

                const errors = []
                if (!this.$v.channeldatafilter.$dirty) return errors

                !this.$v.channeldatafilter.required && errors.push('This field is required')
                return errors

          },

          err_sub_cat(){

              console.log("err sub cat");
                const errors = []
                if (!this.$v.subcat.$dirty) return errors

                !this.$v.subcat.required && errors.push('This field is required')
                return errors

          },

          errr_cat(){
            
            if(this.resourcecat == null){
                console.log("resource cat incoming is null");
                return
            }

            if(this.resourcecat.length > 0){
                if(/^[a-zA-z \s]+$/g.test(this.resourcecat) != true){ 
                    console.log("invalid data found in resourCAT ")
                    return "Only alphabets are allowed"
                }
            }else{
                
                const errors = []
                if (!this.$v.resourcecat.$dirty) return errors
                !this.$v.resourcecat.required && errors.push('This field is required')
                return errors
            }
            // this.err_cat = []
          },

          title_check(){

                console.log("ttl checl ->", this.formFields.title.length);

            if(this.formFields.title.length > 0){
                console.log("from if ");
                if(/^[0-9a-zA-z ?&,\w(-:'\w+)|\[\d.+\s]+$/g.test(this.formFields.title) != true){
                    this.ttl_err = true
                    return "Only alphabets are allowed"
                }else{
                    this.ttl_err = false
                    return []
                }
            }else{
                 console.log("from else diurecty check on title ", !this.$v.formFields.title.$dirty);
                const errors = []
                if (!this.$v.formFields.title.$dirty) return errors
                !this.$v.formFields.title.required && errors.push('This field is required')
                return errors

            }
          },

          tag_check(){

                if(this.fromtagsinput.length > 0){
                        if(/^[a-zA-z \s]+$/g.test(this.fromtagsinput) != true){
                            this.ttl_err = true
                            return "Only alphabets are allowed"
                        }else{
                            this.ttl_err = false
                            return []
                    }
                }else{
                    console.log("from else tags ");
                    const errors = []
                    if (!this.$v.fromtagsinput.$dirty) return errors
                    !this.$v.fromtagsinput.required && errors.push('This field is required')
                    return errors
                }

          },

         content_check(){

                if(this.formFields.content.length > 0){
                         if(/^[0-9a-zA-z &;:,!.?= \w(-\w+)|\[\d.+\s]*$/g.test(this.formFields.content) != true){
                            this.ttl_err = true
                            return "Only alphabets, numbers and some special characters are allowed"
                        }else{
                            this.ttl_err = false
                            return []
                    }
                }else{

                    const errors = []
                    if (!this.$v.formFields.content.$dirty) return errors
                    !this.$v.formFields.content.required && errors.push('This field is required')
                    return errors     

                }
           },

            // err_content:[],
            // err_tags:[],


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

    opentags(){

      this.tagson = true
      this.$v.$reset();

    },

     resource_validate(data, type, field){

              var self = this                
                this.validate_alpha_numeric(data, type, (res, datanew)=>{
                    console.log("res is ->", res);
                    if(res == true){ 
                        this.stop_progress = res
                        if(field == 'onlytags'){
                             self.fromtagsinput = datanew
                             self.$forceUpdate();
                             return
                        }else{

                            self.formFields[field] = datanew
                            self.errormsg[field] = "Please enter valid data, non-valid characters will be removed"
                            self.$forceUpdate();
                            return
                        }
                        
                    }else{
                         this.stop_progress = res
                    }
                })



    },


    selectedtags(e){
        console.log("selected tags", e);
    },

      next(e){      
          console.log("e is =>", e);
                let skipdata = e - 1
                console.log('data',skipdata)
                if(skipdata === 0 ){
                    this.skip = 0
                }else{
                    this.skip = this.skipdiffrence*skipdata
                }
                console.log('skip data ->',this.skip);
                this.fetchAll(this.filt_ch ,this.skip);
      },

    handleMediaActivationDeactivation(e, indexis){
     
        this.mediaStatus = e
        // console.log("in media status", this.mediaStatus +"type is", this.formFields.mediaFiles[0].fileType );
        // return
    
    if(this.formFields.mediaFiles.length){
          if(this.formFields.mediaFiles[0].fileType == 'mp4' || this.formFields.mediaFiles[0].fileType == 'jpg'|| this.formFields.mediaFiles[0].fileType == 'png'){
             this.formFields.mediaFiles[0].active = this.mediaStatus;
          }else{
              console.log("Wrong file Type uploaded")
          }
    }else{
        if(this.brochurestabledata[0].fileType == 'pdf'){
             this.brochurestabledata[0].active = this.mediaStatus;
        }else{
             console.log("Wrong file Type from pdf");
        }
    }
     
          
    },


    radiochecks(){
                if(this.formFields.publishStatus == 0){
                    this.draftboolean = true;
                    this.desc_draft_publish = "This will put your resource content in Draft state and it won't be visible in the Resource Center area"
                }else{
                    this.draftboolean = true;
                    this.desc_draft_publish = "This will Publish your resource content in the Resource Center area"
                }
    },
  
    makenewtags(e){
        // tg99

        this.$v.$touch();
        if (this.$v.fromtagsinput.$invalid == true){
                console.log("Form has errors in tags submit");  
                this.showToast('Please enter a tag', this.TOST().WARNING);
                return;
        }

        if(this.ttl_err){
            this.showToast('Invalid data in tags', this.TOST().WARNING);
            console.log("invalid data in tags");
            return;
        }

        console.log("what's the data->", e);
        var elen  = e.length
        if(/^\s+$/g.test(e)){
            this.showToast('Tags input cannot be empty', this.TOST().WARNING);
            return
        }else if(e == "" || e == null || elen == 0  ){
            this.showToast('Tags input cannot be empty', this.TOST().WARNING);
            return
        }else{
          
            let eventdata = e;
            console.log("len is ->", this.thetags.length);
         var resultvalue
        if(this.thetags.length == 0){
               resultvalue = -1
        }else{
               resultvalue = this.thetags.findIndex(element => element.text == eventdata)
               console.log("Result value is ->", resultvalue);
        }
          
            var self = this;
            if(resultvalue != -1){
                // alert("new Data found");
                self.showToast('tag is already present, Select it from drop-down', self.TOST().ERROR);
            }else{
                // alert("We will post, as new data found");
              let formData = {
                    name: eventdata,
                    userId: this.getAgentInfo()._id,
              }

                this.showToast('A new Tag will be created', this.TOST().INFO);
                  
                    this.POST('add_tag', formData , (res, err) => {
                        // console.log("respponse after posting tags is ->", res.data.errMsg);
                      
                           var lengthtag =  res.data.errMsg.length;
                           for(let i=0; i < lengthtag; i++){
                                let createtags = {
                                     text : res.data.errMsg[i].text,
                                     value : res.data.errMsg[i].value,
                                }
                                this.thetags.push(createtags);
                           }
                            console.log("THE TAGS ->", this.thetags);
                            this.showToast('A new Tag was created', this.TOST().SUCCESS);
                            this.gettags();
                            this.multitags.push(e);
                    })
            }

        //  }else {
        //       console("When is -1");
        //       
        //  }

            this.tagson = false
            //   return
        
                  

            
    //       }else{
    //         this.showToast('tag is already present, Select it from drop-down', this.TOST().ERROR); 
    //         console.log("Tag is  there");  // }
    // }
        //         return


        //    this.fromtagsinput

        }

        



    },

    // sendtestdata(){
    //     // st99 
    //     this.selec.push(JSON.parse([{"id":"CH10","name":"Tech_iorta","channel_id":"5cd9569e41108e35b4fa9973","children":[{"id":"CH037983","name":"Channel Head","ch":"CH10"}]},{"id":"CH037983","name":"Channel Head","ch":"CH10"},{"id":"BMG1","name":"Branch Manager","ch":"CH1"},{"id":"ZMG1","name":"Zone Manager","ch":"CH1"}]))
    //     //  this.selec.push( { id: "AG8717", name: "Agent", ch: "CH7" }, { id: "BM008717", name: "Branch Manager", ch: "CH7" }, { id: "RM8717", name: "Regional Manager", ch: "CH7" }, { id: "CH8717", name: "Channel Head", ch: "CH7" }, { id: "CH7", name: "mychannel", "channel_id": "5d39667620a69964d591bbe1", children: [ { id: "AG8717", name: "Agent", ch: "CH7" }, { id: "SM8717", name: "Sales Manager", ch: "CH7" }, { id: "BM008717", name: "Branch Manager", ch: "CH7" }, { id: "RM8717", name: "Regional Manager", ch: "CH7" }, { id: "CH8717", name: "Channel Head", ch: "CH7" } ] }, { id: "SM8717", name: "Sales Manager", ch: "CH7" },  { id: "RM1636", name: "Regional Manager", ch: "CH5" }, { id: "SM1636", name: "Sales Manager", ch: "CH5" }, { id: "RPM01", name: "Product Manager", ch: "CH5" } ); 
    //      console.log("this.selec with TEST response DATA on EDIT->", this.selec);
    // },

    gettags(){

            this.GET('get_all_tags', res=>{

                    console.log("getting all tags->", res.data.errMsg.length);

                if(res.data.errCode == 567){

                }else{
                       for(let i=0; i < res.data.errMsg.length; i++){
                            // let tagsobj = {
                            //     text : res.data.errMsg[i].name,
                            //     value : res.data.errMsg[i].name,
                            //     // value: res.data.errMsg[i]._id 
                            // }
                            this.thetags.push(res.data.errMsg[i].name);
                        }
                }
                        console.log("GETTING ALL TAGS->", this.thetags);
              } )

    },

    rCat(){
           
        this.fetchResourceCategory(0, data => {

            let rescateg = data[0];
            // this newseq is reqired for creating resource cat over the air from the drop-down
            var sequenceis = data.length
            this.newseq = sequenceis;
            // this.chn = res.data.errMsg;
            console.log("for new drop-down",rescateg);
            var datanew = [];
            for(let i =0; i < rescateg.length; i++){
                // if(rescateg[i].status === 1){
                // console.log("from for LOOP ->", rescateg[i].ResourceCenterName);
                let objis ={
                    text: rescateg[i].ResourceCenterName,
                    value: rescateg[i]._id,
                }
                // console.log(" :items->", this.channeldataall.push(objis));
                this.rescategory.push(objis);
                //   console.log("for the :items-->", objis);
                // }
            }

        })
            
    },

    fetchResourceCategory(filter = 0, cb) {
        const FETCH_API = 'fetch_resource_category/?filter='+filter+'&userId='+this.getAgentInfo()._id ;
        this.GET(FETCH_API, res => { 
            if (res.data.errCode === 4){
                return;
            } else if (res.data.errCode === -1) {
                cb(res.data.errMsg);
            }                            
        });
    },

    resmaincat(e){

            if(this.resourcecat == null){
                    console.log("incoming found null")
                    return;
            }

           
            console.log("selected item is->", e);

            console.log("vuelidate data objects ->", this.$v);


          
            var resoutput

            if(/^\s+$/g.test(e) || e == null ){
                this.showToast('Please enter a resource category', this.TOST().WARNING);
                return
             }else if(this.$v.resourcecat.$invalid == true) {
                 console.log("from vuelidate ->", this.$v);
                 this.showToast('Please enter a resource category', this.TOST().WARNING);
                return
             }else{
                 console.log("run regular flow");
                
                                if(e.hasOwnProperty('text')){
                                    console.log("TRUE");
                                resoutput = this.rescategory.findIndex(data => data.value === e.value)  
                                }else {
                                    console.log("false");
                                    resoutput = this.rescategory.findIndex(data => data.text === e)  
                                }

                        if(resoutput == -1){

                             // var filter = 0
                                // var adminID = this.getAgentInfo()._id    
                            let self = this;
                            //  filter = 0
                            
                            this.fetchResourceCategory(0, data => {
        
                               console.log("create that category", data[0]);
                                this.newseq = data[0].length;
                                console.log("the newseq is ->", this.newseq);
                               let sendData = {
                                    ResourceCenterName: e,
                                    sequenceNo:  this.newseq + 1,
                                    status: 1, 
                                    userId : this.getAgentInfo()._id
                             }

                             console.log("formData fr POST is res cat", sendData );
                             
                              this.POST('new_resource_category', sendData, res => {

                                if(res.data.errCode == 4 ){
                                      this.showToast('Sequence already exists', this.TOST().WARNING);
                                }else{

                                    this.rCat()                                    
                                    // console.log("post response", res.data.errMsg);
                                    // let resobj = {
                                    //         text: res.data.errMsg.ResourceCenterName,
                                    //         value: res.data.errMsg._id,
                                    // }
                                    // this.rescategory.push(resobj);
                                    // // this.fetchResourceCategory()
                                    this.showToast('A new Resource Category has been created, Please Select it to continue...', this.TOST().INFO);
                                    // console.log("Final data for Form", resobj);

                                    // this.rescat_formData = resobj.value   
                                    // console.log("resourcecat for formData is->",this.rescat_formData);
                                }  
                              })

                            });
                        }else{
                            console.log("just select from existing ones, final data for form", this.resourcecat);
                            this.rescat_formData = this.resourcecat.value
                            console.log("resourcecat for formData is->",this.rescat_formData);
                        }
                
             }
            //sanitzing the object for only value
            // if(this.resourcecat.hasOwnProperty('value')){
            //       this.rescat_formData = this.resourcecat.value
            //       this.resourcecat = this.resourcecat.text
            // }else{
            //      this.rescat_formData = this.resourcecat.value
            //      this.resourcecat = this.resourcecat.text
            // }
           
    },

    subcatefilter(e){
            this.sendcat = e;
            console.log("selected items are->",this.sendcat);
           
            this.uploaddock.findIndex( element => element == e  )


            
    },

    whatweget(){
        //cn99
        console.log("CLICKED received", this.selec);
        // console.log("Channel is ->", this.forchonly);

        // console.log("everything needed", this.itemss)
        // var finaldata = 12
    },

    whatitdoes(e){
        // tt99
        console.log("what's the data->", e);
        
         let eventdata=e
            console.log("Incoming tag is ->", e)
            if(eventdata.length === 0){
                eventdata = e[0]
            }else{
            let position = e.length -1 
                eventdata = e[position]
            }

            var resultvalue = this.thetags.findIndex(element => element.text == eventdata)
            console.log("Result value is ->",resultvalue)
           
         if(resultvalue == -1){
             this.toview = eventdata
            //  console.log("TAGS is there->);
              let formData = {
                    name: eventdata,
                    userId: this.getAgentInfo()._id,
              }

                console.log("ready to post formData->", formData);
                this.showToast('A new Tag will be created', this.TOST().INFO);
                  return
                    this.POST('add_tag', globalformdata , (res, err) => {
                            console.log("respponse after posting tags is ->", res.data.errMsg);
                            this.showToast('A new Tag was created', this.TOST().SUCCESS);
                            this.gettags();
                    })
                  

            
          }else{
            this.showToast('tag is already present, Select it from drop-down', this.TOST().ERROR); 
            console.log("Tag is  there");  // }
    }
                return
                // }else{
                //     console.log("what's the data->", e);
            // this.showToast('Tag already exists, try something different', this.TOST().ERROR);
            //   return
        // }  
    },

   

    remove(){

        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]

    },

     closeit(){
            this.formFields.showStepper = false
        },
    //sr99
    emptyroles(){
            this.selectedrole = [];
    },

    selectAllrole(e){
      
    //   if( this.selectedrole.length == this.channeldata.length){
    //         alert("All Channels are already Selected");
    //   }else{
        var alldata=1;
        this.se
          console.log("e is from else->",e)
            if(e == alldata){
             this.selectedrole = this.roledata.map(doc => {
             return doc.value
             console.log("from if")
            });
            console.log("the values",this.rolesall.length);
         }
    //   }
    
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
        // onblur(e){
        //     console.log("ON blur, fired ?", e);  
        // },

        for_ch_filter(ch_val){
            console.log("ch_val is ->",ch_val);
            this.filt_ch = ch_val;

            this.fetchAll(this.filt_ch, 0);

        },

    
        channelfilters(e){
                // console.log('data->',e);
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
                // console.log("the channel are",this.channeldatafilter);
                // return
            // this.GetRole(this.channeldatafilter);
            // console.log("WE get unique diff from array-=>", diffit( this.channeldatafilter, this.itemss));   
        // console.log("what's filtered data->",newfiltereddata);
                 let unique2 = this.itemss.filter((o) => this.channeldatafilter.indexOf(o.channel_id) === -1);
                 console.log("unique 2 is ->", unique2);
                 if(unique2.length == 0){
                        this.GetRole(this.channeldatafilter);
                 }else{
                    //  console.log("len of unique array 2->", unique2.length);
                     var spliceat = unique2[0].channel_id
                    //   console.log("ID to be matched is->", spliceat);
            //    var indextofind = this.brocollections.findIndex(e => e._id === dat._id);
            // for(let i=0; i< this.itemss.length; i++){
            //     console.log("itemss-->>>>>>>>>>", this.itemss[i].channel_id);  
            // }
                //   console.log("matching ids found boolean is->",  this.itemss.findIndex( 
                //       element =>{
                //          if(element.channel_id === unique2[0].channel_id){
                //             var truthy = true
                //             console.log("truthy",truthy)
                //          }else {
                //             var falsy = false
                //             console.log("false", falsy)
                //          }
                //       }
                //    ));  
                    let datais = this.itemss.findIndex( element => element.channel_id === unique2[0].channel_id)
                    console.log("splcing will happen at ->", datais);
                    this.itemss.splice(datais, 1);
                    
                   this.collectchannels.splice(datais, 1);
                    
                    console.log("itemss Splice", this.itemss)
                    console.log("Collect Channels Splice", this.collectchannels)
                    console.log("Selected Items were  ->", this.channeldatafilter);
                 }
                    // for(let y=0; y< unique1.length; y++){
                    //      
                    //     this.GetRole(unique1[y]);
                    // }
                // console.log("UNique in Array 1->, selection",unique1);
                // let unique2 = this.itemss.filter((o) => this.channeldatafilter.indexOf(o) === -1);
                //  console.log("UNique in Array 2 ->, selection",unique2);
                // this.GetRole(this.channeldatafilter);
                // if( this.channeldatafilter[i] == this.itemss[i]. )     
                // return
                // this.GetRole(this.channeldatafilter)
            },
        //rr ch99
        GetRole(e, ident, datais){
            // a99 ident == 1 means edit is fired
            
            var ifedit = ident
            var forrole

          if(ifedit == 1){
            // alert("Edit fired")
                forrole = e
          } else{
            // alert("POST fired")
            let eventdata=e
            console.log("Incoming e is  data ->", e)
            if(eventdata.length === 0){
                eventdata = e[0]
            }else{
            let position = e.length -1 
               forrole  =   eventdata = e[position]
            }
          } 
           
            // for(let i=0;i<this.itemss.length ;i++){
                // var indextofind = this.itemss.findIndex(e => e.channel_id == eventdata);
                // console.log("INDEX to be spliced is->",indextofind);
            // }    .indexOf(o)
            // console.log("Incoming e is latest data->", eventdata);
            // this.newarrayis = eventdata
            // let indexnewis = newarrayis.filter(
            //     (o) => this.itemss.channel_id == 
            // );
            // console.log("NEW INDEX IS->", indexnewis)
            // return
            console.log("Before pushing into Itemss array=>", this.itemss);
    
            const Fetch_Roles = 'getrole?userId='+this.getAgentInfo()._id+'&channelCode='+forrole
            // axios.get(Fetch_Roles).then( res => {
            this.GET(Fetch_Roles, res => {
            // this.collectchannels =[]
            // console.log("length->", res.data.errMsg[0][2].active);
            // for(let i=0; i < res.data.errMsg[0].length; i++){
            //     // console.log("From axios get using then->", res.data.errMsg[0][i].active)
            //     if(res.data.errMsg[0][i].active == 0){
            //                res.data.errMsg[0].filter(element => element. );
            //     }
            // }
             var activearray = []
             for(let i=0; i < res.data.errMsg[0].length; i++){ 
                    console.log("From axios get using then->", res.data.errMsg[0][i].active)
                    if(res.data.errMsg[0][i].active == 1){
                       
                        console.log("the IN-ACTIVE ROLE is ->", res.data.errMsg[0][i]);
                        activearray.push( res.data.errMsg[0][i])   
                    }
             }
                    this.foritems = activearray
                 console.log("GET ROLE BY CHANNEL=>",  this.foritems);
                //  console.log("ACTIVE ARRAY->", activearray);
            // Currently the execution is not waiting for the api response and psuhing empty data in array , need to use .then promise 
            // return

             var childrennew = []
                    for(let i=0; i<this.foritems.length ; i++){
                        var childobj = {
                            id :  this.foritems[i].roleCode ,
                            name: this.foritems[i].roleName ,
                            ch: this.foritems[i].channelCode.channelCode
                        }
                            childrennew.push(childobj);       
                    }
                    
            // the data tree structured data will be pushed here after getting all the role codes for each selected channel, 
                //  this.foritems[0].channelCode.channelCode
                // console.log(" SELEC is =>",  this.selec)
            let newitem ={
                        id: this.foritems[0].channelCode.channelCode,
                        name: this.foritems[0].channelCode.channelName,
                        channel_id: this.foritems[0].channelCode._id,
                        children: childrennew
            }
            this.collectchannels.push(this.foritems[0].channelCode._id);
            this.itemss.push(newitem);
            console.log("Collectchannels+>", this.collectchannels);

            this.forchonly.push(this.foritems[0].channelCode.channelCode);
            // console.log("root obj", this.forchonly);


             if(datais.channelList.length == this.itemss.length){
                   console.log("send true", datais.channelList.length ,"itemss length", this.itemss.length);
                   this.selec = datais.accessCodes_Clone
                   console.log("MAIN SELEC is access clone >_>==-==>", datais.accessCodes_Clone);
             }else{
                   console.log("NM", this.selec);
             }

             
            })
        },

    computeall(){

        // console.log("old ARray =>", this.selec);
                 
        // console.log("New array is=>", this.itemss);

        // console.log("lodash diff ->", diffit( this.selec, this.forchonly));

        // var cleanedselect =  diffit( this.selec, this.forchonly)

        // console.log("Cleaned selec is =>", cleanedselect );
        // var self = this;
        // console.log("length of cleaned arr is=>", cleanedselect.length);
        //     for(let i=0; i<cleanedselect.length; i++){
        //             for(let j=0; j < cleanedselect.length; j++){
        //                     console.log("I is =>", i);
        //                     if(self.itemss[i].children[j].id == cleanedselect[j]){
        //                         console.log("J is =>", j)
        //                         console.log("Childer are ?=>", cleanedselect[j] );
                                //   console.log("Which Channel they belong ->", self.itemss[i].id);
                                //   var channelis = self.itemss[i].id;
                                //   var selectedrole = [];
                                //     selectedrole.push(cleanedselect[i])
                                //   var finalis ={
                                //       channelis: channelis, 
                                //       roles: selectedrole
                                //   }
                    //             // console.log("finalis", finalis )
                    //         }
                    // } 
            // }
        // console.log("lodash diff ->", diffit( this.selec, this.forchonly));

        },
        uploadThumb() {
            this.save()
            this.$refs.thumb_file.click();
        },

        sortit(a, b) {
                return a - b;
        },

        fetchAll(ch,skip){
            this.testimonials = [];
            let self = this;
           
            var FETCH_TESTIMONIALS

            if(ch == 'all'){
                FETCH_TESTIMONIALS = 'fetch_resources?filter=0&skip='+skip;
            }else{
                FETCH_TESTIMONIALS = 'fetch_resources?filter=0&channel_code='+ch+'&skip='+skip;
            }

            console.log("fetch testimonials build is->",FETCH_TESTIMONIALS);

            // return

            this.showLoader('Loading', true);
            this.GET(FETCH_TESTIMONIALS, res => {
                console.log("FROM GET ALL resource data->>>>", res);
                
                    var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].count
                    console.log('Page Length:',totalCount)
                    this.pageLength = Math.ceil(totalCount/this.skipdiffrence)

                    console.log(' PL from rsm->', this.pageLength);

                 var farr =  res.data.errMsg[0].slice(0, res.data.errMsg[0].length)
                 farr.forEach((element, index, array) => {
                    if(index == array.length) {
                      
                        console.log("SHOULD NOW CALL NF CALLED")
                        self.showLoader('Loading', false);
                       
                    } else {

                        self.testimonials.push(self.filterFields(element));
                       
                    }




                });
                self.newfields();
                self.showLoader('Loading', false);

               

                // console.log('Testimonials from ARRAY PUSH' , self.testimonials);
            })
          
        },

        newfields(){
            // console.log("NF CALLED ")
                var self = this
                 this.testimonials.map(e=>{
                            e.ch = e.accessCodes_Clone.map(ch =>{
                                    // console.log("root->", ch)
                                    // console.log("->", ch.ch)
                                    // console.log("CH is ->", ch.ch != undefined);
                                if(!ch.hasOwnProperty('children')){
                                    if(ch.hasOwnProperty('ch')){
                                        if(ch.ch != undefined){
                                            //  return ch.ch+" + "
                                            return ch.ch
                                        }else{
                                            console.log("shoyld never reacch undeined");
                                        }
                                    }else{
                                        console.log("skipped ch ");
                                    }
                                }else{
                                    console.log("skipped childern");
                                }
                            })
                            e.arr = e.ch
                            e.arr =  e.arr.filter(function( element ) {
                                     return element !== undefined;
                            });
                        })
            
   
                        self.testimonials.map(e=>{
                             e.arr =  e.arr.map(ar =>{
                                      // console.log("BEFORE SLICE ->", e)
                                      return    parseInt(ar.slice(2, ar.length))
                                })
                                e.arr.sort(this.sortit);
                                e.arr = [...new Set(e.arr)];
                        })

                       self.testimonials.map(e=>{
                          e.final = e.arr.map(arr=>{
                                      return  arr =  "CH"+arr.toString()+" + "        
                            })
                       })

                          self.testimonials.map(e=>{
                              e.final = [...new Set(e.final)];
                              e.final = e.final.toString().replace(/[,]/g, "");
                              var len = e.final.length
                              e.final = e.final.slice(0,len - 2)
                            
                        })
                        this.$forceUpdate();
                       console.log("after new one with FINal TABLE->", self.testimonials);




        },

        filterFields(res) {

                // console.log("RES is ->", res);

            // for(let i=0; i < res.length; i++ ){
            //      console.log('TAGGGGSSSS : ', res[i].mediaFiles.fileType);
            // }
           

            // res.defaultpath.push({
            //     active: 1,
            //     fileName: "default title video",
            //     fileType: "mp4",
            //     location: "http://172.16.57.52:5010/558ca0b4feceed22dd04af23bc69155f1bb16ef1.mp4",
            // })

//  console.log('filterFields after default file path: ', res);
 //h9
            return {

                title: res.title == null ? "-" : res.title ,
                content: res.content == null ? "-" : res.content,
                contentCategory: res.contentCategory,
                content_published: res.content_published,
                status: res.status == 1 ? "Active" : "InActive",
                tags: res.tags,
                accessCodes:res.accessCodes,
                created_date: res.created_date,
                updated_date: res.updated_date,
                category: res.category,
                id: res._id,
                channelList: res.channelList,
                mediaFiles: res.mediaFiles.length == 0 ? "" : res.mediaFiles ,
                thumbnail: res.thumbnail,
                accessCodes_Clone: JSON.parse(res.accessCodes_Clone),
                resID : res.resource_id
                // all_ch: res.



                // testimonial_id: res.testimonial_id,
                // id: res._id,
                // category_name: res.category_type,
                // title: res.title,
                // content: res.content,
                // channel_code: res.channelCode,
                // // fullobject: res,
                // filePath: res.filePath,
                // // filePath: res.filePath[0] == null || res.filePath[0] == [] || res.filePath[0] == "" ? res.defaultpath[0] : res.filePath[0],
                // fileTitle: res.fileTitle == null ? "-" : res.fileTitle ,
                // thumbnail: res.thumbnail == null ? res.thumbnail == "" : res.thumbnail,
                // // role_code: res.roleCode,
                // created_date: res.createdDate,
                // created_by: res.createdBy,
                // created_by_name: this.doSentenceCase(res.createdBy.first_name+' '+res.createdBy.last_name),
                // status: res.status == 1 ? "Active" : "Inactive",
                // updated_by: res.updatedBy,
                // updated_date: res.updatedDate,
                // updated_by_name: this.doSentenceCase(res.updatedBy.first_name+' '+res.updatedBy.last_name),
                // published_status: res.publshedStatus == 1 ? "Published" : "Draft",
                // published_by: res.publshedBy == null ? '-' : this.doSentenceCase(res.publshedBy.first_name+' '+res.publshedBy.last_name),
                // pub_date: res.publshedDate == null ? '-':  new Date(parseInt(res.publshedDate)).toLocaleDateString() 
            }
        },

//nr99
        mapRoleCodes(model){
            console.log("inside model->", model)
            multiroles = model.map(doc => {
                return doc.value
            });
        },
        setValuesOnForm(res){
            //sv99
            this.from_edit_tags = true;
            console.log("SSETT CALLED->>>",res);
            this.formFields.HTTP = 'PUT';
            // alert("Now making in PUT request...");
            console.log("NOW, HTTPS METHOD IS =>", this.formFields.HTTP );

            this.formFields.thumbnail = {location: res.thumbnail }
            
            this.formFields.publishStatus = JSON.stringify(res.content_published);
// console.log(" PUBLISH STATUS ",  this.formFields.publishStatus)
// console.log("published active->",this.formFields.publishStatus);

            this.formFields.active = res.status == "Inactive" ? '0' : '1'
            console.log("Active->",  this.formFields.active);

            // console.log("FILE TYPE +++>===>>", res.mediaFiles[0].fileType);
            
            if(res.mediaFiles.length != 0){
                     if(res.mediaFiles[0].fileType == "pdf"){
                            this.brochurestabledata.push(res.mediaFiles[0]);
                            // this.brochurestabledata[0].active = JSON.stringify(this.brochurestabledata[0].active);
                            this.imageitis =false;
                            this.pdfitis = true;
                            this.videoitis = false;
                        }else if(res.mediaFiles[0].fileType == "mp4"){
                            this.formFields.mediaFiles.push(res.mediaFiles[0]);
                            // this.formFields.mediaFiles[0].active = JSON.stringify(this.formFields.mediaFiles[0].active);
                            this.imageitis =false;
                            this.pdfitis = false;
                            this.videoitis = true;
                      }
            }else{
                    console.log("Continue as media is in thumbnail");
            }
                   
                // }else{

                //     this.formFields.mediaFiles.push( res.mediaFiles[0]);
                //     // this.formFields.mediaFiles[0].active = JSON.stringify(this.formFields.mediaFiles[0].active);
                //     this.imageitis =true;
                //     this.pdfitis = false;
                //     this.videoitis = false;
                // }
                console.log("before mutlitags->", this.multitags)
                myoldtags = res.tags
                this.multitags = res.tags;
                console.log("after mutlitags->", this.multitags + "my old tags>>", myoldtags);
                
            //     var gettingtagsid = [] 
            //     console.log("thetags ->", this.thetags);
            //     var lenfortag = res.tags.length
          
            //     //   thetags                    
            //     let mydata = this.thetags.filter((thedata) => 
            //                 res.tags.indexOf(thedata.text) != -1
            //     );

            //     // console.log("Processed TAGS are ->", mydata );

            // // console.log("before ->",  this.channeldatafilter) 
            // //   this.multitags =  mydata
            //     for(let z=0; z < mydata.length; z++){        
            //         this.multitags.push(mydata[z].value);
            //     }
            //   this.multitags = mydata[i].value
                this.channeldatafilter = res.channelList = [...new Set(res.channelList)]
                console.log("channel multi-select  drop_DOWN->", res.channelList);
                // res.channelList =  [...new Set(res.channelList)]


                // console.log("MULTI_TAGS->", this.multitags);
                // this.oldtags = this.multitags;
                // return
            this.formFields.title = res.title;
            console.log("title ->",this.formFields.title)
            this.subcat = res.contentCategory;
            this.sendcat = res.contentCategory;
            console.log("Sub-cat->", this.subcat);

            this.formFields.content = res.content;

            this.idforput = res.id;

              var reskeyis = this.rescategory.findIndex(element => element.value === res.category);
                // console.log("res key is  ->", reskeyis);
                this.resourcecat =  this.rescategory[reskeyis].text 
                this.rescat_formData = res.category;
            // this.resourcecat = res.category; 
             console.log("content ->", this.resourcecat + "ID is ->", this.idforput);
            // console.log("from FBI old tags->", this.oldtags);
             document.body.scrollTop = 10;
             document.documentElement.scrollTop = 10;
        // console.log("FTYPE->", res.mediaFiles[0].fileType);
               
            // if(this.formFields.mediaFiles.length)

            // this.formFields.videoTitle = res.fileTitle;
            // this.formFields.thumbnail.location = res.thumbnail;
            // this.fp = res.filePath[0];
            // for(let i=0; i<res.filePath.length; i++){
            // this.formFields.mediaFiles[0] = res.filePath[0];
            // }
            // this.formFields.youtubeURL = '';
            // this.formFields.publishStatus = res.publshedStatus == 1 ? '1' : '0';
            // this.formFields.active = res.status == 1 ? '1' : '0';
         
            //   this.formFields.mediaFiles[0] = res.filePath[0];
            // this.e1 = 1;
            // console.log("fp is ->", this.fp);
            //  console.log("Setting THumbnail on fetchbyID->",   this.formFields.thumbnail.location);
            //  console.log("Media Files setting in form for edit",this.formFields.mediaFiles);
            // console.log("the channel set is ->", this.channeldatafilter);
            // console.log("the role set is->", this.selectedrole);
            // console.log("the ID for PUT->",  this.idforput);
        },

        // TODO: This @function is works for new testimonials, When admin press new button then first function will clear all the fields then show stepper
        resetFields() {
            this.$v.$reset();
            let props = null;
            for(props in _dup_formFields) {
                this.formFields[props] = _dup_formFields[props]
            }
            this.brochurestabledata = []
            this.formFields.mediaFiles = []
            console.log("RESETTED MEDIAFILES  ?",   this.formFields.mediaFiles)
            this.multitags = [];
            this.channeldatafilter = "";
            this.itemss = []
            this.resourcecat = ""
            this.brochurestabledata = []
            this.pdfitis = false;
            this.imageitis = false;
            this.videoitis = false;
            this.subcat = "";
            
            this.formFields.showStepper = true;
        },

        
        fetchById(item, identifier) {  
             this.resetFields();
             this.main_edit =  true
             // @akshay On edit, we need collect channels empty on edit bug spotted on 28th...
             this.collectchannels = []
          console.log(">>>Item is->>>",item);
         //fbi
        // var populateroles = new Promise(function(resolve, reject) { 
                                // const x = "geeksforgeeks"; 
                                // const y = "geeksforgeeks"
                // removing duplicate channels if found any
                item.channelList = [...new Set(item.channelList)]

                console.log("channel list from fetch BY ID",item.channelList );

                var chlstlength = item.channelList.length;

                this.setValuesOnForm(item);
                //  var forselec =item.accessCodes_Clone
                // this.selec = forselec 
            //    console.log("SELEC is->",  this.selec );
                for(let i=0; i < chlstlength ; i++){
                
                    console.log("FOR GET ROLES->",item.channelList[i]);
                    this.GetRole(item.channelList[i], 1, item); 

                }  

        // });
            // console.log(item.channelList.length)
            //    console.log(this.itemss.length)
            // if(item.channelList.length === this.itemss.length){

            //      forward = true
            //       if(forward){ 
            //         console.log("from if block resolving, start populating roles");

            //         // resolve(); 
            //       } else{ 
            //         console.log("Else rejecting");
            //         // reject(); 
            //       } 
            // }else{
            //     console.log("from")
            //     forward = false
            // } 
        // }); 
// populateroles. 
//     then(function () { 
        // console.log('Success, You can now populate roles'); 
    // }). 
    // catch(function () { 
    //     console.log('Some error has occured'); 
    // });
        
              //    var forselec =item.accessCodes_Clone
             //    this.selec = forselec 
            //    console.log("SELEC is->",  this.selec );
           //    console.log("PARSE Json->",JSON.parse(item.accessCodes_Clone)); 

            return
   
            // this.tableindex = index;
            let self = this;
            // console.log("Fetch by ID",item._id);

            // if(identifier == 1){
            //     console.log("identifier is->", identifier);
                // var planid = item._id;
                // console.log("planid->", planid);
                //  this.idforput = item._id;

            // }else{
                //    console.log("ELSE identifier is->", identifier);
                //  var planid = item.id;
                //  console.log("planid->", planid);
                //   console.log("Fetching by ID from PUT's callback,",item);
         
                this.showLoader('Loading', true);
                const FETCH_TESTIMONIALS_BY_ID =  this.API_Service_admin()+'fetch_sales_pitch?type=presentation&id='+planid

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

                            return

                            // self.setValuesOnForm(res.data.errMsg[0]);
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
            // }
        },



        formatBytes(ident, bytes, decimals, callback){
                if(bytes == 0) return '0 Bytes';
                    var k = 1024,
                    dm = decimals <= 0 ? 0 : decimals || 2,
                    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                    i = Math.floor(Math.log(bytes) / Math.log(k));
                    //  + ' ' + sizes[i]
                    var main_size =  parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
                    var type, limit
                       
                    console.log("main-size is ->", main_size);
                    ident == 1 && sizes[i] == 'MB' ? limit = 60 : ident == 2 && sizes[i] == 'MB' ? limit = 4 : ident == 3 && sizes[i] == 'MB' ? limit = 25 : limit = undefined

                    console.log("LIMIT undefined ->", limit);

                    if(main_size > limit){

                            if(sizes[i] == 'MB'){   
                                if(limit == 60){
                                    type ="Video"
                                }else if(limit == 4){
                                    type ="Image"
                                }else{
                                    type ="PDF"
                                }
                                this.showToast('File-Size exceed, Upload limit is '+ limit+' MB for '+type   , this.TOST().ERROR)
                                callback(false)
                                return
                            }

                    }else{
                                callback(true)   
                    }


                   
                  

                    // if(ident == 1 && sizes[i] == 'MB'){
                    //     // for video max-size 60MB
                    //     console.log('')
                    //     main_size > 60 ? this. : callback(true)


                    // }else if(ident == 2 && sizes[i] == 'MB'){
                    //     // for image max-size 4MB
                    //     main_size > 4 ? callback(false) : callback(true)
                    // }else{
                    //     //for pdf max-size 25MB
                    //     if(sizes[i] == 'MB'){
                    //           main_size > 25 ? callback(false) : callback(true)
                    //     }
                //  callback(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)))
},




        handleFileUpload(event, indicator, index, thumb) {
            
            /**
             * The editFile property helps in file upload process,
             * User uploading a new file or reuploading (means replace with exisiting)*/
            // console.log("Are we posting from Upload button?", event.target.files);

            console.log("incoming file data ->", event.target.files );
            
            console.log('Event : ', event+ "index"+index+"indicator"+indicator);
            this.indexofedit = index;
            this.formFields.editFile = indicator == 'edit' ? true : false;
            console.log("EDIT button pressed ? ",  this.formFields.editFile);
            // return

            try {
                if (event.target.files.length > 0) {
                    
                    // if (this.e1 == 2) { tc99
                        try{ 
                            if(event.target.files[0].type.split("/")[0] === "video"){
                                 this.formFields.fileName = ""
                                    // console.log("VIDEO FOUND AND CONDITION REACHED", event.target.files[0])

                                    this.formatBytes(1, event.target.files[0].size,0, response=>{
                                          console.log("response is from size validation is", response)
                                         if(response){
                                                 this.start_upload = true;
                                                 this.formFields.fileName = event.target.files[0].name;
                                                 this.formFields.fileis = event.target.files[0]   
                                                if(this.formFields.editFile){
                                                    console.log("edit found true from VID");
                                                    this.validateFiles(1);
                                                }
                                         }else{
                                                 this.formFields.fileName = HELPING_TEXT
                                                 this.start_upload = false;
                                                 return
                                         }

                                         return
                                       
                                            // if(response > 65 ){
                                            //      this.formFields.fileName = "FILE-SIZE limit Exceed, please try again, max upload size is 60MB"
                                            //      var self = this
                                            //      setTimeout(function(){ self.formFields.fileName = HELPING_TEXT }, 3000);
                                            //      this.showToast('File-Size exceed, max Upload limit is 60MB', this.TOST().ERROR)
                                            //      this.start_upload = false;
                                            //      return
                                            // }else{
                                            //      this.start_upload = true;
                                            //      this.formFields.fileName = event.target.files[0].name;
                                            //      console.log("run regular video upload flow, file size within acceptable limit", response)
                                            //      this.formFields.fileis = event.target.files[0]
                                            // }
                                          
                                             
                                        

                                    })


                                    // this.showToast('File Format Not Supported', this.TOST().ERROR)
                                    
                                   
                                // if( this.formFields.editFile){
                                //     console.log("edit found true from VID");
                                //     this.validateFiles(1);
                                // }
            
                            }else if (event.target.files[0].type.split("/")[0] === "image" && thumb == undefined) {
                                // 25/03/2019
                                // this.formFields.thumnailFileName = event.target.files[0].name;
                                this.planImages.file = event.target.files[0];
                                this.planImages.text = this.planImages.file.name;
                                console.log("From Image block...",  this.planImages.file);


                                this.formatBytes(2, event.target.files[0].size,0, response=>{
                                          console.log("response is from size validation is", response)
                                         if(response){
                                                 this.start_upload = true;
                                                 this.planImages.file = event.target.files[0];
                                                 this.planImages.text = this.planImages.file.name;  
                                                if(this.formFields.editFile){
                                                    console.log("edit found true from IMG");
                                                    this.validateFiles(2);
                                                }
                                         }else{
                                                 this.planImages.text = "Drag Images here"
                                                 this.start_upload = false;
                                                 return
                                         }
                                })

                                // if(this.formFields.editFile){
                                //     console.log("edit found true from IMG");
                                //     this.validateFiles(2);
                                // }
                               
                            }else if(thumb == 'thumb'){
                                // console.log("event.target",event.target);
                                var selfis = this
                                    var _URL = window.URL || window.webkitURL;
                                    
                                    this.tempsrc = _URL.createObjectURL(event.target.files[0])

                                  this.formatBytes(2, event.target.files[0].size, 0, response=>{

                                        console.log("response for img upload from thumb", response);

                                        if(response){
                                                console.log("thumbnail uploaded is ->", this.tempsrc );
                                                var img= new Image();
                                                 this.start_upload = true;
                                                img.src = this.tempsrc;

                                                img.onload= function() {
                                                //   var  widthboolean , heightboolean 
                                                //   if( this.width < 690 && this.width > 1280 ) {
                                                // alert("Thumbnail width is too Small");
                                                // widthboolean = false
                                                //   }else{
                                                //    alert("Thumbnail width acceptable");
                                                //    widthboolean = true
                                                //   }
                                                //   if(this.height > this.width){
                                                // alert("Thumbnail is not a landscape");
                                                //  heightboolean = false
                                                //   }else if(this.height < 450 || this.height > 1440){
                                                // alert("Thumbnail is too Small");
                                                //  heightboolean = false
                                                //   }else{
                                                //    alert("Thumbnail acceptable");
                                                //    heightboolean = true
                                                //   }
                                                // if(widthboolean == true && heightboolean == true ){
                                                // alert("Uploading thumbnail");
                                                selfis.formFields.thumnailFileName = event.target.files[0].name
                                                //    console.log("thumbnail File name ->", event.target.files[0].name);
                                                selfis.validateFiles(4, event.target.files[0], thumb);
                                                // }else{
                                                //  self.showToast('Please choose a different thumbnail', self.TOST().WARNING);
                                                //  alert("choose a different thumbnail");
                                                //  selfis.formFields.thumnailFileName = ""
                                                // }
                                                }
                                        }else{

                                            this.start_upload = false;
                                            return

                                        }

                                  } )

                                  
                                 
                                //     var img =  document.getElementById("theimgfound").width 
                                //    console.log("new img is", img);
                                    // console.log("img is ->",img );
                                    // var width = img.naturalWidth;
                                    // var height = img.height;
                                    //  this.validateFiles(4, event.target.files[0], thumb);

                            }else {
                                 
                                  if(indicator == 'edit'){

                                        this.formatBytes(3, event.target.files[0].size, 0, response=>{
                                            
                                            if(response){
                                                    this.start_upload = true;
                                                    this.brochures.file = event.target.files[0];
                                                    this.brochures.text = this.brochures.file.name;
                                                    console.log("edit found true from PDF", this.brochures.text , "was edit true->", this.formFields.editFile);
                                                    this.validateFiles(3);
                                            }else{
                                                  
                                                  this.start_upload = false;
                                                  return

                                            }


                                        })
                                         
                                  }else{

                                        this.formatBytes(3, event.target.files[0].size, 0, response=>{

                                                console.log("response of PDF is ->", response)

                                                if(response){
                                                    this.start_upload = true;
                                                    this.brochures.file = this.$refs.brochuresFiles.files[0];
                                                    // console.log("Before Name PDF ?", this.$refs.brochuresFiles.files[0]);
                                                    // console.log("reached else for PDF", this.$refs.brochuresFiles.files[0]);
                                                    this.brochures.text = this.brochures.file.name;

                                                }else{

                                                    this.start_upload = false;
                                                    return

                                                }

                                        })

                                       
                                  }
                                
                                 
                                // console.log("do we get files?=>",  this.brochures.file +"  Do we get text->", this.brochures.text )
                               
                           
                            }
                        } catch(err) {
                            console.log(err);
                            this.showToast('You have selected wrong file', this.TOST().WARNING);
                        }
                    // }
                }
            } catch(err) {
                console.error(err);
            }
        },
        //    imgopenLightBox(obj) {
        //     console.log('Object received is ', obj);
        //     this.dialog = true;
        //     this.formFields.lightBox.location = obj.location;
        //     this.formFields.lightBox.ext = obj.fileType == 'png' ? obj.fileType : obj.fileType.toLowerCase();
        //     // console.log("EXT->", this.formFields.lightBox.ext);
        // },

        openthumb(obj) {
            this.dialogthumb = true;
            this.formFields.lightBox.location = obj.location;
        },


        openLightBox(obj) {
            console.log('Object received is ', obj);
            this.dialog = true;
            this.formFields.lightBox.location = obj.location;
            this.formFields.lightBox.ext = obj.fileType == 'mp4' ? obj.fileType : obj.fileType.toLowerCase();
            // console.log("EXT->", this.formFields.lightBox.ext);

        },
    validateFiles(id, thumbfile, thumb){
    
        console.log("start_upload is", this.start_upload);
        if(!this.start_upload){
            this.showToast('Max-Upload size exceeded', this.TOST().ERROR);
            return
        }


        console.log("id is ->", id + "thumbfile=>", thumbfile + "thumb",thumb);
        let sendFile = {};
        // console.log("file to be uploaded is-->", file);

        if(id == 1){
            // for video
            // var regex_VID = new RegExp('^(mp4)$');
            sendFile =  this.formFields.fileis;
            console.log("From Video SendFile ->",sendFile);
            // console.log("for SPlit ->", sendFile.type.split("/")[1]);
             this.showLoader('Uploading', true);
             this.uploadFile(sendFile);

        }else if(id == 2){
            // for image
            // var regex_IMG = new RegExp('^(jpg|jpeg|png)$');
            sendFile = this.planImages.file;
    
            console.log("ready to Send file is ->", sendFile )
            this.showLoader('Uploading', true);
            this.uploadFile(sendFile);

        }else if(id == 3){
            // for pdf
            var regex_PDF = new RegExp('^(pdf)$');
            sendFile = this.brochures.file;
                    console.log("ready to Send PDF file is ->", sendFile);
             this.showLoader('Uploading', true);
             this.uploadFile(sendFile);
            
        }else if(id == 4){

            sendFile = thumbfile
              var regex_IMG = new RegExp('^(jpg|jpeg|png)$');
            console.log("SF->", sendFile + "Thumbnail->", thumb);  
           
            this.uploadFile(sendFile, thumb)

        }
            // var regex_VID = new RegExp('^(pdf|mp4|jpg|jpeg|png)$');
            // sendFile = file;
            // console.log("Sending valid Files->", sendFile);
            // if (id == 5) {
            //     if (regex_VID.test(sendFile.type.split("/")[1])){
            //         // this.showToast('File is correct', this.TOST().INFO);
            //         this.showLoader('Uploading', true);
            //         this.uploadFile(sendFile);  // uplaod file from this function Date 9/JAN/2019
            //     } else {
            //         this.showToast('You can\'t upload this file type from here', this.TOST().WARNING);
            //     }
            // }
        },
        uploadFile(sendFile, thumb) {
            let _this = this;
            let formData = new FormData();
            formData.append('media_upload', sendFile);
            //videopost  http://172.16.56.162:5010/secure/admin/uploadFile  http://159.89.161.64:5035/secure/admin/uploadFile 159.89.161.64:5035
            const UPLOAD_API ='v2/uploadFile'

            // axios
            // .post(UPLOAD_API, formData, {
            //     headers: {  'Content-Type': 'multipart/f,,m, ,lmorm-data' }
            // })
            // .then(res => {
            this.POST( UPLOAD_API, formData, (res, err) => {
                // if (_this.e1 == 2) {
                    _this.showLoader('Uploading', false);
                    if (res.data.errMsg.fileType == 'mp4') {
                    _this.showToast('File Format Not Supported', _this.TOST().ERROR);

                        // console.log("MP4 CONDITION REACHED");
                    if(this.formFields.editFile){
                          _this.formFields.mediaFiles.splice(0, 1, res.data.errMsg); 
                    }else{
                        _this.formFields.mediaFiles.push(res.data.errMsg);
                    }
                        // console.log("media files after pushing category from video", _this.formFields.mediaFiles[0].active);
                          this.videoitis = true;
                          this.imageitis = false;
                          this.pdfitis =false;

                    }else if(thumb == 'thumb'){
                            // th99
                            console.log('THUMB is ?=>', thumb)
                            console.log("Uploaded Thumbnail is ->", res.data.errMsg)
                            _this.formFields.thumbnail = {location: res.data.errMsg.location };

                    }else if(res.data.errMsg.fileType == 'jpg' || res.data.errMsg.fileType == 'jpeg' || res.data.errMsg.fileType == 'png' && thumb == undefined) {
                        // _this.formFields.thumbnail = res.data.errMsg;
                        // console.log("before psuhing into mediafiles->",res.data.errMsg);
    // @akrazr here we normally push uploaded images in array or take that array and edit an already uploaded image from that particular index position
                        if(  this.formFields.editFile == true){
                                //  console.log("INDEX OF it->", this.indexofedit);
                                 _this.formFields.mediaFiles.splice(this.indexofedit, 1,res.data.errMsg )
                        }else{
                              _this.formFields.mediaFiles.push(res.data.errMsg);
                
                                console.log("media files after pushing category from IMG",  _this.formFields.mediaFiles);
                                console.log("media files active in-active is from IMG ->",  _this.formFields.mediaFiles[0].active)
                        }
                         this.imageitis = true;
                         this.videoitis = false;
                         this.pdfitis =false;
                        // console.log('IMMAGE table view ->',  this.imageitis);
                        // console.log('_this.formFields.thumbnail ', _this.formFields.thumbnail);
                    }else{
                        // pdf up99
                        console.log("PDF file response is=>", res.data.errMsg);
                         if(this.formFields.editFile == true){
                                 _this.brochurestabledata.splice(0, 1,{
                                            fileName: res.data.errMsg.fileName,
                                            fileType: res.data.errMsg.fileType,
                                            active: res.data.errMsg.active,
                                            location: res.data.errMsg.location,
                                            // category: this.sendcat,
                                });  
                            
                         }else{

                                _this.brochurestabledata.push({
                                            fileName: res.data.errMsg.fileName,
                                            fileType: res.data.errMsg.fileType,
                                            active: res.data.errMsg.active,
                                            location: res.data.errMsg.location,
                                            // category: this.sendcat,
                                });
                                this.pdfitis = true;
                                console.log("to be sent to mainmedia->", this.brochurestabledata);
                                this.videoitis = false;
                                this.imageitis = false;
                                
                                    _this.brochures= {
                                        text: "UPLOAD",
                                        file: '',
                                        respFileName: '',
                                        respFileType: ''
                                    } 
                        }
                        
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
         * POST, PUT formdata from here
         */
        save(){

            console.log("Form errors are ->", this.$v);  
            this.$v.$touch();
            if(this.$v.channeldatafilter.$invalid || this.$v.formFields.$invalid || this.$v.subcat.$invalid || this.$v.resourcecat.$invalid){

                    console.log("Form has errors");  
                    this.showToast('Please fill all required fields', this.TOST().WARNING);
                    return
            }

          



           if(this.ttl_err){
               console.log("err found, as Data is Invalid")
                 this.showToast('Please enter valid data', this.TOST().WARNING);
               return;
           }else{
                console.log("run regular flow pre-")  
           }

           

            this.mainmedia = []
            this.savebtn = true;
            // Mandatory fields validation  || this.channeldatafilter === ""
            if (this.formFields.title == null || this.formFields.title == undefined || this.formFields.title == "" || this.selec == null || this.multitags.length == 0 ) {
                this.showToast('Mandatory fields are not found' , this.TOST().WARNING);
                return;
            }else if((/^\s+$/g.test(this.resourcecat) || /^\s+$/g.test(this.formFields.title) || /^\s+$/g.test(this.resourcecat))) {
                    console.log("from empty/blank check")
                    this.showToast('Mandatory fields are not found' , this.TOST().WARNING);

                    return;

            }

            // console.log("Media FILES before Switch->", this.formFields.mediaFiles[0]);  
            // console.log("What's mainmedia before array populate->", this.mainmedia);   
           
        if(this.formFields.mediaFiles[0] != undefined || this.formFields.mediaFiles[0] != null || this.brochurestabledata.length > 0 ){
                    console.log("heading towards a media-push",   this.main_edit);
                    if(this.formFields.mediaFiles.length != 0){

                                if(this.formFields.mediaFiles[0].fileType == 'mp4'){
                                        // console.log("fired from a mp4 file");
                                        this.mainmedia.push(this.formFields.mediaFiles[0]);
                                }else if(this.formFields.mediaFiles[0].fileType !== 'mp4'){
                                        // console.log("fired from not a mp4 file, IMG FILE");
                                        this.mainmedia.push(this.formFields.mediaFiles[0]);    
                                }

                    }else if(this.brochurestabledata.length != 0){
                            this.mainmedia.push(this.brochurestabledata[0]);
                    }else{
                        console.log("data was being edited")
                    }
        }else{
                    console.log("else  because main media is undefined", this.mainmedia);
                    // this.mainmedia = []
        }
            var onlytags = [];
            var temptags = this.multitags;
            // console.log("temp tags->", this.multitags );
          
            var lenis = this.multitags.length;
            // console.log("EDIT TAGS Boolean->", this.from_edit_tags)
            // if(this.from_edit_tags == true){
            //    for(let i=0; i < lenis; i++){
                  
            //         onlytags.push(this.multitags[i].value);
            //         console.log("FOR LOOP-->",this.multitags[i].value);
            //    }
            // }else{
            //      onlytags = this.multitags 
            // }
            // onlytags = temptags
            // console.log("has own property->",this.multitags.hasOwnProperty(value));
            // return
            // console.log('old tags', this.oldtags);
            // //  myoldtags.filter
            //  let theposition = myoldtags.filter((thedata) => 
            //                  this.multitags.indexOf(thedata) == 1
            //     );
            // console.log("theposition is ->", theposition );
            // return
            //  this.multitags = this.multitags.map(element => element.value)
            //  if( this.multitags[0] == undefined){
            //      alert("Undefined FOUND");
            //       this.multitags = this.multitags.filter(function( element ) {
            //          return element !== undefined;
            // });
            //  }else{
            //     console.log("No Undefined Found, tags were added, but can removed"); 
            //  }
            // console.log("else what if has own property is passed or fails?")
        // console.log("multi-tags are before put and post->", this.multitags);
        //  console.log("my old tags->", myoldtags);
        //  onlytags =  onlytags.concat(myoldtags)
        //  this.multitags = onlytags;
        //  console.log("Only tags", onlytags);
        //  onlytags = onlytags.filter(function( element ) {
        //              return element !== undefined;
        //     });
        // console.log('Multi-tags->', this.multitags);
        onlytags = this.multitags;

        //      this.multitags 
        //     // if(){
        //          onlytags = onlytags.concat(temptags)
        //     // }
        //          console.log("Only tags", onlytags);
                 
        //     onlytags = onlytags.filter(function( element ) {
        //              return element !== undefined;
        //     });
            //   console.log("Only tags", onlytags);
            // return
            // var testdata = [ { "id": "SM8717", "name": "Sales Manager", "ch": "CH7" }, { "id": "BM008717", "name": "Branch Manager", "ch": "CH7" }, { "id": "RM8717", "name": "Regional Manager", "ch": "CH7" }, { "id": "CH8717", "name": "Channel Head", "ch": "CH7" }, { "id": "CH7", "name": "mychannel", "channel_id": "5d39667620a69964d591bbe1", "children": [ { "id": "AG8717", "name": "Agent", "ch": "CH7" }, { "id": "SM8717", "name": "Sales Manager", "ch": "CH7" }, { "id": "BM008717", "name": "Branch Manager", "ch": "CH7" }, { "id": "RM8717", "name": "Regional Manager", "ch": "CH7" }, { "id": "CH8717", "name": "Channel Head", "ch": "CH7" } ] }, { "id": "AG8717", "name": "Agent", "ch": "CH7" } ]
            // console.log("Infographics ->", this.formFields.thumbnail);
            // console.log("mainmedia is ->", this.mainmedia);  
            
           if(this.sendcat == 'infographic' || this.sendcat == 'articles' ){
                    this.properthumb = { location:  this.formFields.thumbnail.location } 
           }else{
                 console.log("FROM ELSE", this.mainmedia);
           }


            // fd99 if mainmedia is empty .length == 0 ?  this.properthumb : this.mainmedia 
            // console.log("VIDEO FILE TIITLE=>", this.formFields.videoTitle);
            var formData = {

              //mediaFiles:  this.formFields.mediaFiles[0],  
                accessCodes_Clone: this.selec, 
                channelList : this.collectchannels,
                mediaFiles : this.mainmedia.length == 0 ? [] : this.mainmedia,
                title: this.formFields.title, 
                content: this.formFields.content,
                contentCategory: this.sendcat,
                thumbnail:  this.formFields.thumbnail.location ,
                // channelCode: this.channeldatafilter,
                userId: this.getAgentInfo()._id,
                category: this.rescat_formData,
                // roleCode: this.selectedrole,
                // category_type: this.formFields.salesPitchCategory.abbr,
                content_published: this.formFields.publishStatus, 
                status: this.formFields.active,
                tags: onlytags,
                fileTitle: this.formFields.videoTitle,
                // filePath: 
                // thumbnail: this.formFields.thumbnail.location,
                // userId: this.getAgentInfo()._id, 
                // id: this.idforput
            };

            // console.log("FINAL FORMDATA->>>>>", formData);
            
            if (this.formFields.HTTP == 'POST') {
                console.log("NOW POSTING ONLY", formData);
                
                this.doPost(formData);
                
            } else if (this.formFields.HTTP == 'PUT') {
                  
                // this.fetchById() 
                //  formData.filePath = this.fp;
                //this gets the put an ID from post, while the next line gets the status(pub/draft)as now the switches are moved below and no longer a part of post
                 formData.resourceId = this.idforput;
                 formData.userId = this.getAgentInfo()._id;
                //  formData.publshedStatus = parseInt(this.formFields.publishStatus),
                //  console.log("Piblished status on PUT ?",  formData.publshedStatus)
                 console.log("Firing PUT with ID->", formData.resourceId);
                 console.log("NOW FIRING PUT ONLY", formData);
                
                 

                 this.doPut(formData);      
            }
        },

        doPost(formData) {
            const create_resource = 'create_resource';
            this.showLoader('Saving', true);
            let self = this;
            this.POST(create_resource, formData, (res, err) => {
                // When compile time issue found or object keys undefined etc
                // if (err) {
                //     self.showLoader('Saving', false);
                //     self.showToast('Something Went wrong', self.TOST().ERROR);
                //     return;
                // }
                // When any error occurs
                if(res.data.errCode == 208 || res.data.errCode == 489 || res.data.errCode == 567 || res.data.errCode == 510 ){
                   var erris =  res.data.errMsg 
                     self.showToast( erris , self.TOST().ERROR);
                        self.showLoader('Saving', false);
                }
               

                if (res.data.errCode == -1) {
                    //  this.fetchreal(res.data.errMsg);
                    console.log("From Post calling fetchbyId->>");
                    // this.fetchById(res.data.errMsg, 1);
                    console.log("Post resquest's response is->", res.data.errMsg);
                    self.showLoader('Saving', false);
                    self.showToast('Successfully Created', self.TOST().SUCCESS);
                    self.formFields.HTTP = 'PUT';
                    self.resetFields();
                    self.fetchAll(self.filt_ch, 0);
                    // self.e1 = 2;        // jump to next window
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

             axios
            .get(FETCH_TESTIMONIALS_BY_ID)
            .then(res => {
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
            .catch(err => {
                // self.showLoader('Loading', false);
                console.log("FROM REALS CATCH");
                self.showToast('Something went wrong', self.TOST().ERROR)
            })            
        },
        doPut(formData) {

            const LODAER_MSG = 'Updating'
            const UPDATE_TESTIMONIALS = 'update_resource';
            this.showLoader(LODAER_MSG, true);
            let self = this;
            console.log("Form data given to PUT", formData);
            this.PUT(UPDATE_TESTIMONIALS , formData, (res, err) => {
                // When compile time issue found or object keys undefined etc
                // if (err) {
                //     self.showLoader(LODAER_MSG, false);
                //     self.showToast('Something goes wrong', self.TOST().ERROR);
                //     console.log("fromPUT wrong")
                //     return;
                // }

                // When database error occured
                if (res.data.errCode == 4) {
                    self.showLoader(LODAER_MSG, false);
                    self.showToast('Database Error', self.TOST().ERROR);
                    return;
                }

                if (res.data.errCode == 489) {
                    self.showLoader('Loading', false);
                    self.showToast("Multiple Files can't be uploaded", self.TOST().WARNING)
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
                    self.main_edit = false
                    self.showToast('Resource Successfully Updated', self.TOST().SUCCESS);
                    self.showLoader(LODAER_MSG, false);
                    self.formFields.HTTP == 'PUT';
                    // console.log("PUT END and formdata=> ?",formData);
                    console.log("The response of PUT?->",res.data.errMsg);
                     self.resetFields();
                    self.fetchAll(self.filt_ch, 0);
                    
                    // this.fetchreal(res.data.errMsg);
                    // var byid = formData.id
                   
                }
            });
        },
    }
}
</script>

<style>

.thetree{
    flex-wrap: wrap;
    margin-left: 75px;
}
.v-treeview>.v-treeview-node{
    padding: 20px !important;
}

.pubdraftpopup{
    font-size: 18px; font-family: roboto; 
    padding: 20px;
}

.closepubdraft{
    align-self: flex-end; font-family:26px; cursor:pointer;
}

.status{
      font-family:roboto; font-weight:500; letter-spacing:0.1px;
}

  .theme--light.v-treeview{
      display: flex;
  }
  .v-treeview-node__root{
    padding: 0px 25px;
  }
  .v-treeview-node--leaf{
      border-radius: 50px; 
  }

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
        width: 300px;
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



