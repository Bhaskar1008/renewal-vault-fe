<template>
    <div class="product-page">
      <v-card flat>
        <v-layout align-center justify-space-between row fill-height class="mr-3 ml-3 mb-2 pt-3">
            <!-- <h3 class="title font-weight-regular">New Product page</h3> -->
             <v-flex xs10 sm6 md2 class=" mr-4" >
                            <v-select v-model="channeldatafilter"
                                    :items="channeldataall"
                                    item-text="text"
                                    item-value="value"
                                    label="Channel"
                                    @change="channelfilters">
                            </v-select>
            </v-flex>
            <v-flex></v-flex>
            <v-btn medium color="primary" class="white--text thebtn" @click="changeFunctionality('New Product')">New Product</v-btn>
            <v-flex xs10 sm6 md2 class="ml-3 ">
                                <v-text-field
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search"
                                append-icon="search"
                                height="30px"></v-text-field>
            </v-flex>

        </v-layout>
       </v-card>

       <!-- <v-btn  @click="dostuff2" >  Show loader</v-btn> -->

          <!-- <pdfpage v-for="page in pages" v-bind="{page, scale}" :key="page.Pagenumber" /> -->
        <canvas ref="canvasis" id="canvasis" style="border:1px solid black; display:none;"></canvas>

        <!-- <v-btn @click="showLoader(true)" > Click for loader </v-btn> -->

        <div id='pdf-viewer' style="display: none" ></div>

        <div  style="display:flex; overflow-x:scroll; display: none  "  >

                <div v-for="(d, index) in img_slider_data" :key="index" >
                    <img :src="d" style="width:420px;" />
                </div>

        </div>

         <hr>
      <!-- <v-card>      -->
        <div v-show="formShow == true" class="mr-3 ml-3 mb-4 mt-3">
            <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1" color="#01B4BB">Upload Data</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2" color="#01B4BB">Upload Media</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 3" step="3" color="#01B4BB">Upload Files</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <!-- Page 1 -->
                    <v-stepper-content step="1">
                        <!-- <v-card class="mb-5"> -->
                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Product Category :</p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select
                                        v-model="frmOne.productType"
                                        :items="prod_cat"
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
                            </v-layout> -->
                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Channel Code:</p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-select
                                        multiple
                                        chips
                                        v-model="channelCode"
                                        :items="channelList"
                                        item-text="state"
                                        item-value="abbr"
                                        label="Select Channel *"
                                        @change="onChannelChange"
                                        persistent-hint

                                        single-line
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Product Name : </p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field
                                        label=""
                                        v-model="frmOne.productName"
                                        placeholder="Enter product name *"
                                        maxlength="50"
                                        counter="50"
                                        :error-messages="pname"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Product Status : </p>
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
                                    <p class="body-2">Web Link : </p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field

                                        label=""
                                        v-model="frmOne.weblink"
                                        placeholder="Enter web-link here"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout align-center row>
                                <v-flex xs12 md2>
                                    <p class="body-2">Application ID : </p>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <v-text-field

                                        label=""
                                        v-model="frmOne.appid"
                                        placeholder="Enter App ID here"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout column class="mt-4 mb-4">
                                <v-flex xs12 md2 class="mt-4 mb-2">
                                    <p class="body-2">Product Description :</p>
                                </v-flex>
                                <v-flex xs12 md2>
                                    <v-textarea
                                        outline
                                        name="input-7-4"
                                        auto-grow
                                        label="Enter product details *"
                                        v-model="frmOne.description"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>

                            <v-flex xs12 md2 class="mb-3">
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
                                                maxlength="300"
                                                counter="300"
                                            ></v-textarea>
                                        </v-layout>
                                    </v-flex>

                                    <v-flex d-flex xs12 sm6 md5 class="ma-2 ml-4">
                                        <v-layout align-center row>
                                            <v-avatar color="#01B4BB" size="35" class="mr-4">
                                                <span class="white--text subheading">2</span>
                                            </v-avatar>
                                            <v-textarea

                                                maxlength="300"
                                                counter="300"
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
                                                maxlength="300"
                                                counter="300"

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
                                                maxlength="300"
                                                counter="300"

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
                                                maxlength="300"
                                                counter="300"

                                                v-model="frmOne.reasons5"
                                                auto-grow
                                                label=""
                                                rows="1"
                                                placeholder="Please enter reason 5"
                                            ></v-textarea>
                                        </v-layout>
                                    </v-flex>

                                    <!-- <v-flex d-flex xs12 sm6 md6></v-flex> -->

                                </v-layout>

                            </v-container>
                            <!-- </v-card> -->
                            <v-btn color="#01B4BB" class="white--text" @click="showDescription">Continue</v-btn>
                            <v-btn flat style="background-color: #F5F5F5" @click="changeFunctionality('Close')">Close</v-btn>
                    </v-stepper-content>

                    <!-- Page 2 -->

                    <v-stepper-content step="2">
                        <v-layout align-center d-flex>
                            <v-flex xs12 md3>
                                <p class="body-2">Video Title : </p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                   :error-messages="vidcheck"
                                    label=""
                                    v-model="videoTitle"
                                    placeholder="Enter title for product video *"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout align-center row wrap class="mb-3">
                            <v-flex xs12 sm6 md6>
                                <p class="body-2 mb-3">Please upload product video from local:</p>
                            <v-flex><p> {{productVideo.text}} </p></v-flex>
                                <v-layout align-center row wrap>

                                    <v-flex xs4 sm6 md2>
                                        <input type="file" name="media_upload" ref="prodVideo" accept="video/*" class="sd-img-btn-size media-pos" style="opacity: 0" @change="handleFileUpload"/>
                                        <img src="../../assets/Group_968.png" class="sd-img-btn-size"/>
                                    </v-flex>
                                    <v-flex xs6 sm3 class="ml-3">
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
                                    <v-flex xs6 sm3 class="ml-3">
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

                                            @change="URLValidate"
                                            v-model="videoURL"
                                            :clearable="true"
                                            placeholder="Enter URL here"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>

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
                                    :error-messages="imgcheck"
                                    label=""
                                    v-model="imageTitle"
                                    placeholder="Enter title for product image *"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-flex xs12 md3 class="mb-3">
                            <p class="body-2">Upload plan works images :</p>
                        </v-flex>

                         <v-flex xs12 md3 class="mb-3">
                            <p style="font-size:12px; font-family:roboto; font-weight:300;">Recommended image size - Width 800px, Height 1032px  </p>
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
                                    <img v-if="media.fileType !== 'mp4'" :src="media.location" class="sd-tb-row-img" @click="openLightBox(media)"/>
                                    <!-- for thumbnail -->
                                    <video v-else pause @click="openLightBox(media)" class="sd-tb-row-img">
                                        <source :src="media.location" type="video/mp4">
                                        <source :src="media.location" type="video/ogg">
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
                                    <!-- e1 = 3 -->
                                <v-btn color="#01B4BB" class="white--text" @click="secondpage_scroll"> Continue</v-btn>
                                <v-btn flat style="background-color: #F5F5F5" @click="e1 = 1">Back</v-btn>
                            </div>
                            <v-btn flat style="background-color: #F5F5F5" @click="changeFunctionality('Close')">Close</v-btn>
                        </v-layout>


                    </v-stepper-content>

                    <!-- Page 3 -->
                    <v-stepper-content step="3">

                        <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Files upload categories :</p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <!-- <v-select
                                    v-model="fileCategory"
                                    :items="fileCategoriesList"
                                    item-text="state"
                                    item-value="abbr"
                                    label="Select"
                                    persistent-hint
                                    return-object
                                    single-line
                                ></v-select> -->
                                <v-combobox
                                    v-model="fileCategory"
                                    :items="fileCategoriesList"
                                    @change="onFileCetgoryChange"
                                    placeholder="Select from existing categories or type a new category name"
                                ></v-combobox>
                            </v-flex>
                        </v-layout>

                        <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Select File Type :</p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select
                                    v-model="broucherType"
                                    :items="brouchersType"
                                    item-text="state"
                                    item-value="abbr"
                                    label="Select"
                                    persistent-hint
                                    return-object
                                    single-line
                                ></v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout align-center row>
                            <v-flex xs12 md2>
                                <p class="body-2">Select Language :</p>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select
                                    v-model="frmOne._lang"
                                    :items="language"
                                    item-text="state"
                                    item-value="abbr"
                                    label="Select"
                                    persistent-hint
                                    return-object
                                    single-line
                                ></v-select>
                            </v-flex>
                        </v-layout>

                        <v-flex xs12 md3 class="mb-3">
                            <p class="body-2">Upload Brochures:</p>
                        </v-flex>
                        <v-layout row wrap align-center style="cursor:pointer" class="mb-4">



                            <input type="file" ref="brochuresFiles" name="media_upload" accept="application/vnd.openxmlformats-officedocument.presentationml.presentation, application/pdf" class="dragFile" v-on:change="handleFileUpload"/>
                            <v-layout align-center justify-center row fill-height class="grey lighten-4 sd-upload-img-sec mr-2">
                                <v-flex xs2 >
                                    <p class="body-2 text-md-center label-color">{{brochures.text}}</p>
                                </v-flex>
                            </v-layout>
                            <v-flex xs2>
                                <img src="../../assets/Group_971.png" class="sd-img-btn-size" v-on:click="validateFiles(3)"/>
                            </v-flex>
                        </v-layout>

                        <!-- Temporary -->
                        <!-- @depreciation 07/02/2018  -->
                        <!-- <v-layout align-center row>
                            <v-flex xs12 md2><p class="body-2">Please choose files:</p></v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select
                                    :value="slctFile"
                                    :items="fileList"
                                    placeholder="Select files from here"
                                    @change="makeObjectSameAsResponse"
                                ></v-select>
                            </v-flex>
                        </v-layout> -->

                        <!-- Not used now but may be used in future -->

                        <!-- <v-flex xs12 md3 class="mb-3">
                            <v-text class="body-2">Upload Product Thumbnail :</v-text>
                        </v-flex>

                        <v-layout row wrap align-center style="cursor:pointer" class="mb-4">
                            <v-layout align-center justify-center row fill-height class="grey lighten-4 sd-upload-img-sec mr-2">
                                <v-flex xs2 >
                                    <v-text class="body-2 text-md-center label-color">Drop files here to upload</v-text>
                                </v-flex>
                            </v-layout>

                            <v-flex xs2>
                                <img src="../../assets/Group_971.png" class="sd-img-btn-size"/>
                            </v-flex>
                        </v-layout> -->

                        <div class="mb-4">
                            <v-card color="grey lighten-4" flat tile v-if="brochuresDetails.length > 0">
                                <v-toolbar dense>
                                    <v-layout row fill-height>
                                        <v-flex  xs2 style="background-color: #01B4BB" d-flex align-center justify-center>
                                            <v-toolbar-title style="color:white" class="subheading text-md-center">Thumbnail</v-toolbar-title>
                                        </v-flex>
                                        <v-flex  xs2 style="background-color: #01B4BB" d-flex align-center justify-center>
                                            <v-toolbar-title style="color:white"  class="subheading text-md-center">Type</v-toolbar-title>
                                        </v-flex>
                                        <v-flex  xs3 style="background-color: #01B4BB" d-flex align-center justify-center>
                                            <v-toolbar-title style="color:white" class="subheading text-md-center">Language</v-toolbar-title>
                                        </v-flex>
                                        <v-flex  xs6 style="background-color: #01B4BB" d-flex align-center justify-center>
                                            <v-toolbar-title style="color:white" class="subheading text-md-center">File Name</v-toolbar-title>
                                        </v-flex>
                                        <v-flex  xs2 style="background-color: #3E3E3E" d-flex align-center justify-center>
                                            <v-toolbar-title style="color:white" class="subheading text-md-center">Action</v-toolbar-title>
                                        </v-flex>
                                    </v-layout>
                                </v-toolbar>
                                <v-layout row v-for="(docs, docIndex)  in brochuresDetails" :key="docIndex">
                                        <v-flex  xs2 class="sd-row-tb-img pa-2" style="background-color: #01B4BB">
                                            <img v-if="docs.fileType == 'pdf'" src="../../assets/pdf.png" class="sd-tb-sec3-width" />
                                            <img v-else src="../../assets/pptx.png" class="sd-tb-sec3-width" />
                                        </v-flex>
                                        <v-flex  xs2 class="sd-row-tb-img pa-2">
                                            <p class="body-1 text-md-center" style="color:#757575">{{docs.brochureType}}</p>
                                        </v-flex>
                                        <v-flex  xs3 class="sd-row-tb-img pa-2" style="background-color: #EFEFEF">
                                            <p class="body-1 text-md-center" style="color:#757575">{{docs.language}}</p>
                                        </v-flex>
                                        <v-flex  xs6 class="sd-row-tb-img pa-2">
                                            <p class="body-1 text-md-center" style="color:#757575">{{docs.fileName}}</p>
                                        </v-flex>
                                        <v-flex  xs3 class="sd-row-tb-img pa-2" style="background-color: #EFEFEF">
                                            <v-radio-group v-model="docs.active" row justify-center xs2 @change="handleMediaActivationDeactivation($event, docIndex, 'files')">
                                                <v-radio label="Active" value="1" color="success"></v-radio>
                                                <v-radio label="Inactive" value="0" color="red"></v-radio>
                                            </v-radio-group>
                                        </v-flex>
                                        <v-flex xs2 class="sd-action-btn-cnter">
                                            <!-- Updated 10/JAN/2019 -->
                                            <edit-file accept="application/vnd.openxmlformats-officedocument.presentationml.presentation, application/pdf" @onFileChange="handleFileUpload($event, 'edit', docIndex)"></edit-file>
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
                            </v-card>
                        </div>

                        <v-layout align-center justify-space-between row fill-height>
                            <div>
                                <v-btn color="#01B4BB" class="white--text" @click="pushDataIntoDB">SUBMIT</v-btn>
                                <v-btn flat style="background-color: #F5F5F5" @click="e1 = 2">Back</v-btn>
                            </div>
                            <v-btn flat style="background-color: #F5F5F5" @click="changeFunctionality('Close')">Close</v-btn>
                        </v-layout>

                    </v-stepper-content>
            </v-stepper-items>
            </v-stepper>
        </div>

     <!-- </v-card>    -->
        <!-- uploading pdf files loader up99 -->
       <v-dialog v-model="pdf_img" max-width="390">
           <v-card
           
            height="125px"
            style="display:flex; flex-direction:column; justify-content:center; align-item:center;"
           >
            <div>
                <div>
                    <p  style="margin-bottom:0px; font-size: 16px; text-align:center;" >Upload in progress</p>
                </div>
                <v-progress-linear
                    class="pt-1"
                    color="#01b4bb"
                    indeterminate
                    rounded
                    height="9"
                ></v-progress-linear>
                <!-- pdf_img2 -->
                <div   style="display:flex; flex-direction:column; justify-content:center; align-items:center;" >
                    <v-btn small v-if="pdf_img2" fab color="#4bd080" depressed > <v-icon color="white" > done </v-icon> </v-btn>
                </div>
            </div>

               
           </v-card>
       </v-dialog>

        <v-dialog v-model="dialog" max-width="650">
            <v-card>
                <img v-if="lightBox.ext == 'png' || lightBox.ext == 'jpg' || lightBox.ext == 'jpeg'" :src="lightBox.imagePath" width="100%"/>
                <video v-else id="mediaPlayer" width="100%" :src="lightBox.imagePath" controls>
                    Your browser does not support HTML5 video.
                </video>
            </v-card>
        </v-dialog>

        <div class="mr-3 ml-3 mb-4 mt-3" v-show="showCard">
            <productlist ref="plist" :callback="pushDataIntoDB"  @on-edit="dataLoading" @onNotFound="showCard = $event"></productlist>
        </div>
         <div class="mr-3 ml-3 mb-4 mt-3" v-show="!showCard">
             <v-card class="pa-4" >
                    <p class="no_products" >No Products found</p>
             </v-card>
        </div>
       <!-- </v-card>   -->
    </div>
</template>
<script>
import axios from 'axios'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import productlist from '../../Page/Customerpitch/Productlist'
import support from '../../common/getProductFromStore'
import onPageLoad from '../../common/onProjectLoad'
import editFile from './edit-file-button'

import pdfpage from '../../Page/pdfpage'

import pdflib from 'pdfjs-dist';

import range from 'lodash/range';

import _ from 'lodash'

var productCategory = [];

var thecanvas, canvas, viewer, page, viewport

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
var rawChannel = []         // All channels without filter
export default {
    components: {
        productlist,
        editFile
    },
    created() {
        this.$store.commit('SET_PAGE_TITLE','New product');
        let self = this;
        onPageLoad.loadRoleCodes(this, function () {
            self.rolesList = self.getStore('fetchRoleCodes');
        });

        onPageLoad.getChannel(this, res => {
               console.log("mixin channel data", res)
               for (let i = 0; i < res.length; i++) {
                   if (res[i].active === 1) {
                       let channetobj = {
                           text: res[i].channelName,
                           value: res[i]._id
                       }
                       this.channeldata.push(channetobj)
                       this.channeldataall.push(channetobj)
                   }
               }
               let alldata = {
                   text: 'All',
                   value: 'all',
               }
               this.channeldataall.unshift(alldata)
           })
          this.channeldatafilter ='all'


          // this.getZoneResp(this.channeldatafilter);
        // Here call the get New product API which should have the channel filter parameter


        /**
         * @function setProducts
         * @param {*} this
         * @description This function helps to get values from the store and set to all data fields.
         */
        // this.commit('SAVE_PRODUCTS', {});
        // support.setProducts(this);
    },
    beforeMount() {
        // productCategory = this.productCategory = mixin.getStore('getProductCategoryList');

        // console.log("PRODUCT CAT ->", productCategory.length);
        //getting product category from API as a fallback if getin from store fails
        // if(productCategory.length == 0){
            // console.log("from FALLBACK !");
            var self = this
            this.GET('getprodCategory?filter='+0, function(res, error) {
                if(error){
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

                if(res.data.errCode == -1){
                    self.prod_cat = [];
                    let response = res.data.errMsg
                    // console.log("response is ->", response)
                    response.map(e=>{
                        var newone = { abbr:e._id , state: e.productCategoryName }
                        // console.log("newone", newone)
                        self.prod_cat.push(newone)
                    })

                    console.log("P cat from API ->", self.prod_cat );

                }

            })



    },
    mounted() {
        thecanvas = document.getElementById('canvasis')
        let self = this;
        onPageLoad.getChannel(this, channel => {
            try{
                rawChannel = channel;

                self.channellistclone = channel.filter(e => e.active == 1).map(e => {
                    return  e
                });

                self.channelList = channel.filter(e => e.active == 1).map(e => {
                    return { state: e.channelName, abbr: e._id , fullobj: e }
                });
                // console.log("---> self ChannelList ->",  self.channelList);
            }catch(err){
                // console.log(err, 'Channel');
            }
        });
    },

    data(){
        return{

            pdf_img2:false,

            chunks:[],

            pdf_img: false,

            chunk_counter:0,
            value: '',

            all_pdf_images:[],
            more_pdf_images: false,

            pagesnew : [],
            heights :[], width :0, height :0,
            currentPage: 1,

            img_slider_data:[],
            pageIsRendering : true,
            pdf: undefined,
            pages:[],

            channellistclone:[],
            ttl_err:false,
            channelCodeList:[],
            channeldata:[],
            channeldatafilter:'all',
            channeldataall:[],
            e1: 1,
            visible: true,

            prod_cat:[],

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
            editor: {
                // ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                }
            },
            frmOne: {
                // productCategory:[],
                weblink:'',
                appid:'',
                productType: productCategory[0],
                productName: "",
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
            productVideo:{
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
            }
        }
    },
    watch: {

    // pdf(pdf){
    //         console.log("from watcher ?");
    //   this.pages = [];
    //   const promises = range(1, pdf.numPages).map(number => pdf.getPage(number));
    //   // console.log("we're in watcher...", pdf);
    //     //we can't control pages from here, as the object is not iterable
    //   Promise.all(promises).then(pages => (this.pages = pages));
    //   console.log("PAGES ARE =>", this.pages);

    // },


        'frmOne._lang'(newVal, oldVal){
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
                // console.log(err);
            }
        }
        // active(newVal, oldVal) {
        //     console.log(newVal + ' New');
        //     console.log(oldVal + ' OLD');
        // }
    },

    computed:{
        //  frmOne: {
        //         weblink:'',
        //         appid:'',
        //         productType: productCategory[0],
        //         productName: "",
        //         description: '',
        //         role: '',
        //         reasons1: '',
        //         reasons2: '',
        //         reasons3: '',
        //         reasons4: '',
        //         reasons5: '',
        //         _lang: language[0]
        //     },

        imgcheck(){
            // if(this.imageTitle.length > 0){
            //    console.log("from if");
            //   if(/^[0-9a-zA-z &.\s]+$/g.test(this.imageTitle) != true){
            //         this.ttl_err = true;
            //         return "Only alphabets, numbers are allowed"
            //     }else{
            //         this.ttl_err = false;
            //         return []
            //     }
            // }
        },

        vidcheck(){
            // if(this.videoTitle.length > 0){
            //    console.log("from if");

            //   if(/^[0-9a-zA-z &.\s]+$/g.test(this.videoTitle) != true){
            //         this.ttl_err = true;
            //         return "Only alphabets, numbers are allowed"
            //     }else{
            //         this.ttl_err = false;
            //         return []
            //     }
            // }
        },


        // weblink(){
        //     if(this.frmOne.weblink.length > 0){
        //         console.log("from if");
        //         if(/^[0-9a-zA-z&//:.?&, \s]+$/g.test(this.frmOne.weblink) != true){
        //             this.ttl_err = true;
        //             return "Only alphabets and numbers are allowed"
        //         }else{
        //             this.ttl_err = false;
        //             return []
        //         }
        //     }

        // },

        // r1(){
        //     if(this.frmOne.reasons1.length > 0){
        //         console.log("from if");
        //         if(/^[0-9a-zA-z!?.&'%, \w(-:'\w+)|\[\d.+\s]+$/g.test(this.frmOne.reasons1) != true){
        //             this.ttl_err = true;
        //             return "Only alphabets and numbers are allowed"
        //         }else{
        //             this.ttl_err = false;
        //             return []
        //         }
        //     }
        // },
        // r2(){
        //     if(this.frmOne.reasons2.length > 0){
        //         console.log("from if");
        //         if(/^[0-9a-zA-z!?.&'%, \w(-:'\w+)|\[\d.+\s]+$/g.test(this.frmOne.reasons2) != true){
        //             this.ttl_err = true;
        //             return "Only alphabets and numbers are allowed"
        //         }else{
        //             this.ttl_err = false;
        //             return []
        //         }
        //     }
        // },

        // r3(){
        //     if(this.frmOne.reasons3.length > 0){
        //         console.log("from if");
        //         if(/^[0-9a-zA-z!?.&'%, \w(-:'\w+)|\[\d.+\s]+$/g.test(this.frmOne.reasons3) != true){
        //             this.ttl_err = true;
        //             return "Only alphabets and numbers are allowed"
        //         }else{
        //             this.ttl_err = false;
        //             return []
        //         }
        //     }
        // },
        // r4(){
        //     if(this.frmOne.reasons4.length > 0){
        //         console.log("from if");
        //         if(/^[0-9a-zA-z!?.&%, \w(-:'\w+)|\[\d.+\s]+$/g.test(this.frmOne.reasons4) != true){
        //             this.ttl_err = true;
        //             return "Only alphabets and numbers are allowed"
        //         }else{
        //             this.ttl_err = false;
        //             return []
        //         }
        //     }
        // },

        // r5(){
        //     if(this.frmOne.reasons5.length > 0){
        //         console.log("from if");
        //         if(/^[0-9a-zA-z!?.&%, \w(-:'\w+)|\[\d.+\s]+$/g.test(this.frmOne.reasons5) != true){
        //             this.ttl_err = true;
        //             return "Only alphabets and numbers are allowed"
        //         }else{
        //             this.ttl_err = false;
        //             return []
        //         }
        //     }
        // },



        // appid(){

        //     if(this.frmOne.appid.length > 0){
        //        console.log("from if");

        //       if(/^[0-9a-zA-z &:.\s]+$/g.test(this.frmOne.appid) != true){
        //             this.ttl_err = true;
        //             return "Only alphabets, numbers are allowed"
        //         }else{
        //             this.ttl_err = false;
        //             return []
        //         }
        //     }

        // },

        // pdesc(){
        //     if(this.frmOne.description.length > 0){
        //        console.log("from if");
        //        if(/^[0-9a-zA-z&;:,!.?'= \w(-\w+)|\[\d.+\s]*$/g.test(this.frmOne.description) != true){
        //             this.ttl_err = true;
        //             return "Only alphabets, numbers and some special characters are allowed"
        //         }else{
        //             this.ttl_err = false;
        //             return []
        //         }
        //     }
        // },

        pname(){

            if(this.frmOne.productName.length > 0){
                console.log("from if");
                if(/^[0-9a-zA-z&, \w(-\w+)|\[\d.+\s]+$/g.test(this.frmOne.productName) != true){
                    this.ttl_err = true;
                    return "Only alphabets and numbers are allowed"
                }else{
                    this.ttl_err = false;
                    return []
                }
            }


            }

    },

    methods:{

        channelfilters(e){
            this.page=1;
            this.channeldatafilter = e
            this.$store.commit('FILTER_PRODUCT_TABLE', this.channeldatafilter);
            console.log("incoming data given to v-model is ->",  this.channeldatafilter )

        },

        Searchdatatable (event) {
            // console.log(event)
        },

        secondpage_scroll(){

            if(this.ttl_err){
                this.showToast('Please, enter valid data', this.TOST().WARNING);
                return
            }else{
                this.e1 = 3
            }


        },



        dataLoading() {
            // this will allow on edit to be scolled to the top
            document.body.scrollTop = 10;
            document.documentElement.scrollTop = 10;

            this.e1 = 1;   // goto start page
            this.resetForm();
            this.httpMethod = 'PUT';
            this.formShow = this.edit = true;       // the edit key identifies us to user pressed edit button for updation
            support.setProducts(this, rawChannel);
        },

        changeRoleCode(event) {
            this.frmOne.role = event;
            // console.log(this.frmOne.role , ' Roles Code');
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
            console.log(event, 'EVENT is');
            this.fileCategory = event;

            if (event == null || event == '') {} else {
                let isFound = _.findIndex(this.fileCategoriesList, function(o) { return o ==  event});
                // console.log(isFound, 'dkddkd');
                if (isFound == -1) {
                    let self = this;
                    this.showConfirmDialog('Confirm', 'Are you sure you want to create new category name?', '' ,evt => {
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
            this.showConfirmDialog('Confirm', `Are you sure you want to ${event == '0' ? 'inactive': 'active'} the media file?`, 'confirm', evt => {
                if (evt == 1) {
                    mediaType == "media" ? self.productMedia[index].active = event : mediaType == "files" ? self.brochuresDetails[index].active = event : ''
                } else if (evt == 0) {
                    mediaType == "media" ? self.productMedia[index].active = (event == "0" ? "1" : "0") : mediaType == "files" ? self.brochuresDetails[index].active = (event == "0" ? "1" : "0") : ''
                }
            });
        },

        changeFunctionality(btnName) {
            this.edit = false;
            let self = this;
            onPageLoad.getFileCategroy(this, this.getAgentInfo()._id, function () {
                self.fileCategoriesList = self.getStore('getFileUploadCategory');
            });
            // console.log(btnName);
            if (btnName.localeCompare(btnLabels[0]) == 0) {
                this.formShow = true;
                this.switchedButton = btnLabels[1];
                this.e1 = 1;
                this.httpMethod = 'POST';
                this.resetForm();
            } else if (btnName.localeCompare(btnLabels[1]) == 0) {
                this.formShow = false;
                this.switchedButton = btnLabels[0];
            }
        },
        URLValidate(evt) {
            this.errMsg = [];
            this.URLWrong = this.YTD_URLValidate(evt);
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

            // console.log(this.productMedia);

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
            // console.log('File : ' , sendFile)
            formData.append('media_upload', sendFile);

            // Upload API
            // const UPLOAD_API = 'http://172.16.58.82:5010/secure/admin/uploadFile'
            const UPLOAD_API = _this.API_Service_admin()+'v2/uploadFile';     // server API
            axios.post(UPLOAD_API, formData, {
                headers: {  'Content-Type': 'multipart/form-data' ,
                'Authorization': 'JWT ' + _this.getAgentInfo().JWT_token ,
                'sid':this.getAgentInfo().SID_Code}

            })
            .then(function(res){
                _this.showLoader('Uploading', false);
                if (_this.e1 == 2){
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

                    // alert("After brochure upload");

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
            })
            .catch(function(error){
                _this.showLoader('Uploading', false);
                // console.log('Catch Error : ', error );
                _this.showToast('Something goes wrong during uploading', _this.TOST().ERROR);
            });
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

                    ident == 1 && sizes[i] == 'MB' ? limit = 60 : ident == 2 && sizes[i] == 'MB' ? limit = 4 : ident == 3 && sizes[i] == 'MB' ? limit = 25 : console.log("final else do nothing")

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
        },

        /**
         * @author Khan Usama
         * @function handleFileUpload
         * @param {*} event
         * @description The function is based on conditions of pages which is indicated by el. it contains page no. like 1,2 and 3 etc.
         * In this page
         */
        demoFuntion(pages, thecanvas){
            var self = this
            // console.log("total pages ->",pages.length);
            // if(self.img_slider_data.length > pages.length){
            // }else{
            // }
            // return
            // pages.map(pg=>{
                        var scale = 1
                       var viewport = pg.getViewport({ scale });
                                        console.log("View Prt Height is ->", viewport.height );
                                        // console.log("Gettin canvas element by id is ->",  document.getElementById('canvasis') );
                                    //    self.$refs.canvasis;

                                        console.log("thecanvas is ->", thecanvas)
                                        thecanvas.height = viewport.height;
                                        thecanvas.width = viewport.width;
                                        self.pageIsRendering = true;
                                        var canvasContext = thecanvas.getContext("2d");
                                        console.log('Context->',canvasContext);
                                        // console.log('CONTEXT FROM MOUNTED->',   newviewport);
                                        // console.log('PAGE ISS +++++>>>', this.page);
                                        const renderCtx = { canvasContext, viewport }
                                        // console.log('RENDER Ctx', renderCtx)
                                       pg.render(renderCtx).promise.then(() => {
                                            self.img_slider_data.push(thecanvas.toDataURL('image/jpeg'));
                                            self.pageIsRendering = false;
                                            console.log("img slider after push ",  thecanvas.toDataURL('image/jpeg'))
                                        })
                            console.log("FINAL ->",  self.img_slider_data.length)
            // })
        },

        draw() {
            var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            for(var i = 0; i < pages.length; i++){
                ctx.putImageData(pages[i], 0, heights[i]);
                document.body.appendChild(canvas);
            }

        },

        handleFileUpload(event, indicator, index) {
            // console.log('My ', event);
            /**
             * @description The below line of condition (Turnary) is used to identify user upload or update the files
             * because this functions is common for choosing file's from the loacl directory. So we need to identify
             * upload or update.
             */
            this.editEnable.bool = indicator == 'edit' ? true : false;
            this.editEnable.location = indicator = 'edit' ? index : null;

            let self = this;

            // console.log('After modified  : ' , this.editEnable, index) ;

            console.log('event in handle file upload ->', event);
            try {
                if (event.target.files.length > 0) {
                    if (this.e1 == 2) {
                        // console.log('My ', event);
                        try{
                            if (event.target.files[0].type.split("/")[0] == "video") {
                                // this.productVideo.file = this.$refs.prodVideo.files[0];

                                this.formatBytes(1, event.target.files[0].size, 0, response=>{
                                        if(response){
                                            this.productVideo.file = event.target.files[0];
                                            this.productVideo.text = this.productVideo.file.name;
                                            console.log("video file is ->",event.target.files[0] );
                                            this.validateFiles(5);
                                        }else{
                                            console.log('File size limit exceeded')
                                            return
                                        }
                                })
                            } else if(event.target.files[0].type.split("/")[0] == "image") {
                                // this.planImages.file = this.$refs.planPictures.files[0];

                                this.planImages.file = event.target.files[0];
                                this.planImages.text = this.planImages.file.name;

                                // console.log('Object : ' , this.planImages);

                                // When user click on edit button then validate functions called automatically but not for uploading first time
                                if (this.editEnable.bool == true) {
                                    this.validateFiles(2);
                                }
                            }
                        }catch(err) {
                            this.showToast('You have selected wrong file', this.TOST().WARNING);
                        }
                    } else if (this.e1 == 3){

                            // pd99
                this.chunk_counter = 0
                var ev =   this.brochures.file = this.$refs.brochuresFiles.files[0];

                         var fileReader = new FileReader();
                            fileReader.onload = function(ev) {
                            // console.log("from file reader of brochures",fileReader.result);
                             self.pdf_img = true;
                             self.pdf_img2 =  false;
                            pdflib.getDocument(fileReader.result).promise.then(pdfdoc_ =>{ 
                                // alert("reached get PDF Document");
                                self.pdf = pdfdoc_;
                                viewer = document.getElementById('pdf-viewer');
                                for(page = 1; page <= pdfdoc_.numPages; page++) {
                                    canvas = document.createElement("canvas");
                                    canvas.className = 'pdf-page-canvas';
                                    viewer.appendChild(canvas);
                                    self.renderPage(page, canvas, pdfdoc_.numPages );
                                }

                                // ch99
                                console.log('from img_slider_data ->',  self.img_slider_data.length)



                                    // self.compute_chunks(self.img_slider_data, res=>{
                                    //         console.log('computed chunks are ->', res);
                                    // });



                            // return
                            //     var scale = 1
                            //     // for(var i = 1; i <= pdfdoc_.numPages; i++){
                            //     //              pdfdoc_.getPage(i).then(self.renderPage());
                            //     // }
                            //     // return
                            //     const promises = range(1, pdfdoc_.numPages).map(number => pdfdoc_.getPage(number));
                            //     console.log("after creatiomng promises...", promises);
                            //         //we can't control pages from here, as the object is not iterable
                            // var mypromise = Promise.all(promises).then(pages => {
                            //         self.demoFuntion(pages, thecanvas);
                            //     })
                            })

                                // this.pages = pages
                                // console.log("PAGES ARE =>", this.pages);
                            // })
                         }

                           fileReader.readAsArrayBuffer(ev);
                        this.brochures.text = this.brochures.file.name;

                        // When user click on edit button then validate functions called automatically but not for uploading first time
                        if (this.editEnable.bool == true) {
                            this.validateFiles(3);
                        }
                    }
                }
            } catch(err){
                // console.error(err);
            }
        },

        compute_chunks(data, callback){

                // callback(result)

        },


        recur(){
            // this.chunks

            var self = this
            var b64 = []

                    console.log("check chunks before sending ",self.chunks[self.chunk_counter] )

                    for(let i=0; i<self.chunks[self.chunk_counter].length; i++){

                        b64.push({base64_Image:self.chunks[self.chunk_counter][i], document_type: 'image'});

                    }

                console.log('b64 is ->', b64)


                 self.POSTUSER('lead_docs_upload',  { base64Image: b64 },res => {
                                                        console.log("response after upload is ", res.data);
                                                        self.all_pdf_images.push(...res.data.errMsg);
                                                        console.log("all pdf images lebgth is ", self.all_pdf_images.length )
                                                        self.more_pdf_images = true
                                                        // self.httpMethod = 'PUT'
                                                        if(self.all_pdf_images.length == self.img_slider_data.length){
                                                            console.log("matched checking all pdf img",self.all_pdf_images )
                                                            self.showLoader(false);
                                                           self.pdf_img2 =  true

                                                             
                                                             setTimeout(self.dostuff, 3000);
                                                            return
                                                        }else{

                                                            self.chunk_counter = self.chunk_counter + 1
                                                            self.recur()
                                                        }
                 })


        },

        // dostuff2(){

        //         console.log("$route", this.$route);

        //      this.pdf_img2 =  false
        //        this.pdf_img = true
        //         this.pdf_img2 =  true
               


        // },

        dostuff(){
                console.log("do stuff called");
                this.pdf_img = false;

        },

        bulk_img_upload(images){

                var self = this
                         console.log("final coun for self image is ", images.length)

                                const chunk = (arr, size) => (
                                    arr.reduce((acc, _, i) => {
                                        if (i % size === 0) acc.push(arr.slice(i, i + size))
                                        return acc
                                    }, [])
                                )

                                    var chunked = chunk(images, 5)
                                        console.log(chunked)

                                    self.chunks = chunked

                                    // self.show_extarcted_images = true
                                    // self.showLoader('Uploading Brochure Images',true);
                                   
                                    self.recur()


                                    // for(let i=0; i<chunked.length;i++){
                                    //          self.chunks = [];
                                    //          console.log("before secong fr loop", chunked[i].length)
                                    //           console.log("before see data", chunked[i])
                                    //     for(let j=0; j<chunked[i][j].length;j++){
                                    //            console.log("see inner lop match ", self.chunks.length == chunked[i].length);
                                    //             console.log('=>>>', self.chunks );
                                    //              self.chunks.push( { base64_Image: chunked[i][j] , document_type: 'image' } )
                                    //             if(self.chunks.length == chunked[i].length){
                                    //                 console.log("now hit api ", self.chunks )

                                    //                 self.POSTUSER('lead_docs_upload',  { base64Image: self.chunks },res => {
                                    //                     console.log("response after upload is ", res.data);
                                    //                     self.all_pdf_images = res.data.errMsg
                                    //                     console.log("all pdf images lebgth is ", self.all_pdf_images.length )
                                    //                     self.more_pdf_images = true
                                    //                     // self.httpMethod = 'PUT'


                                    //                 })
                                    //             }

                                    //     }


                                    // }


        },

        renderPage(pageNumber, canvas, countis){

            var self = this
            var scale = 1.5
          
            self.pdf.getPage(pageNumber).then(function(page) {
                viewport = page.getViewport({scale});
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                page.render({canvasContext: canvas.getContext('2d'), viewport: viewport}).promise.then(res=>{

                        // console.log("response of page.render ->", res);
                        self.img_slider_data.push( canvas.toDataURL())

                        // console.log(self.img_slider_data.length == countis)

                              if(self.img_slider_data.length == countis){
                                  
                                  self.bulk_img_upload(self.img_slider_data);
                              }




                });

            });

                    // console.log("After outside ->", self.img_slider_data.length == countis)

                    //     if(self.img_slider_data.length == countis){
                    //             alert("as found true we 're in ")








                    //     }else{
                    //         console.log("from else ", self.img_slider_data.length == countis)
                    //     }


        },

        renderPage1(page){
                 var scale = 1
                console.log("Incoming Page is ->", page);
                    var viewport = page.getViewport({scale});
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                    };
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    body.appendChild(canvas);
                    page.render(renderContext);

        },


        pushDataIntoDB(event){




                if(this.ttl_err){
                    this.showToast('Please enter valid data', this.TOST().WARNING);
                    return
                }

            console.log("this.channel cide ->", this.channelCode);

                // cc99
                this.channelCodeList = [];
                for(let i=0; i< this.channelCode.length ; i++){
                    for(let j=0; j< this.channellistclone.length; j++){
                        if(this.channelCode[i] == this.channellistclone[j]._id){
                                this.channelCodeList.push({ ch:this.channellistclone[j].channelCode , id:this.channellistclone[j]._id, ch_name: this.channellistclone[j].channelName })
                        }
                    }
                }
            // channelCodeList.push({ ch: , id:  , ch_name   })
            // this.showLoader('Loading', true);
            // console.log('');
            /**
             * Extracting video and images from productMedia
             */
            // When pushDataIntoDB function called from child component productlist then this condition will execute
            // 23/JAN/2019


            if ('code' in event && event.code == 200) {
                    alert("inside event.code == 200")
                    console.log("EVEVEVE", event, "  --->", event.code == 200)

                support.setProducts(this);
                this.httpMethod = event.http_method;
                this.showLoader('Loading', true);
            }else{
                // alert("why its used ?")
            }

            // let _productVideo = {};
            // let _productImages = {};
            let _productVideo = [];
            let _productImages = [];

            // if (this.frmOne.role == "" || this.channelCode == "") {
            //     this.showToast('Channel code & role code is mandatory', this.TOST().WARNING);
            //     return;
            // }

            if (this.channelCode == null || this.channelCode == undefined || this.channelCode == "" || this.channelCode.length == 0) {
                this.showLoader('Loading', false);
                this.showToast('Channel code & role code is mandatory', this.TOST().WARNING);
                return;
            }

            /**
             * Product reasons are mondatory
             */

            // if (this.frmOne['reasons1'] == "" || this.frmOne['reasons2'] == "" || this.frmOne['reasons3'] == "" || this.frmOne['reasons4'] == "" || this.frmOne['reasons5'] == "") {
            //     this.showLoader('Loading', false);
            //     this.showToast('5 Reasons are mondatory', this.TOST().WARNING);
            //     return;
            // }

            for (let i = 0; i < this.productMedia.length; i++) {
                if (this.productMedia[i].fileType == 'mp4') {
                    // _productVideo = {
                    //     name: this.productMedia[i].fileName,
                    //     type: this.productMedia[i].fileType,
                    //     active: parseInt(this.productMedia[i].active),
                    // }
                    _productVideo.push({
                        location: this.productMedia[i].location,
                        name: this.productMedia[i].fileName,
                        type: this.productMedia[i].fileType,
                        active: parseInt(this.productMedia[i].active),
                    });
                } else {
                    // _productImages = {
                    //     name: this.productMedia[i].fileName,
                    //     type: this.productMedia[i].fileType,
                    //     active: parseInt(this.productMedia[i].active),
                    // }

                    _productImages.push({
                        location: this.productMedia[i].location,
                        name: this.productMedia[i].fileName,
                        type: this.productMedia[i].fileType,
                        active: parseInt(this.productMedia[i].active),
                    })



                 console.log('__productImages >>>>>>>>>>>>', _productImages)

                }
            }


        if(this.more_pdf_images){

            for(let i=0; i<this.all_pdf_images.length; i++){
                    var new_pdf_imgs ={
                                location: this.all_pdf_images[i].location,
                                name: this.all_pdf_images[i].fileName,
                                type: this.all_pdf_images[i].fileType,
                                active: 1
                    }
                    _productImages.push(new_pdf_imgs);

            }
         }


            // When product imges is an empty object then it put key which are empty strings to avoid database error at backend
            // 15/01/2019
            // _productImages = (Object.keys(_productImages).length == 0 ? { name: '', type: '', active: 0 } : _productImages);
            // _productVideo = (Object.keys(_productVideo).length == 0 ?   { name: '', type: '', active: 0 } : _productVideo );
            // d99
            //DATA POSTED FROM HERE



            let formData = {
                userId: this.getAgentInfo()._id,
                productType: 'abbr' in this.frmOne.productType ? this.frmOne.productType.abbr : this.frmOne.productType,
                productName: this.frmOne.productName,
                productDescription: this.frmOne.description,
                web_link: this.frmOne.weblink ,
                appID: this.frmOne.appid ,
                channelCodeList: this.channelCodeList,
                // roleCode: typeof this.frmOne.role === 'object' && 'abbr' in this.frmOne.role ? this.frmOne.role.abbr : this.frmOne.role || 'AD002',
                roleCode: this.frmOne.role.abbr,
                reason1: this.frmOne.reasons1,
                reason2: this.frmOne.reasons2,
                reason3: this.frmOne.reasons3,
                reason4: this.frmOne.reasons4,
                reason5: this.frmOne.reasons5,
                productImages: _productImages,
                productVideo: _productVideo,
                videoLink: this.videoURL,
                videoTitle: this.videoTitle,
                imageTitle: this.imageTitle,
                channelCode: this.channelCode,
                // channelCode: this.channelCode,
                // fileCategory: this.fileCategory,
                productBrochure: this.brochuresDetails,
                thumbnail: '',
                active: parseInt(this.active)
            }
            let self = this;

            console.log('Product Form data : ',  formData);

            // return

            if (this.frmOne.productName !== "") {
                if (this.httpMethod == 'POST') {
                    this.POST('new_product', formData, function(resp, error) {
                        if (!error) {

                            if (resp.data.errCode !== 4) {
                                if (resp.data.errCode !== 134) {
                                    if (resp.data.errCode !== 510) {
                                        self.showLoader('Loading', false);
                                        self.showToast('Product created successfully', self.TOST().SUCCESS);
                                        self.commit('SAVE_PRODUCTS', resp.data.errMsg);
                                        console.log('RESPONSE after POST->',resp.data.errMsg )
                                        self.httpMethod = 'PUT';
                                        self.$refs.plist.tabledata(self.channeldatafilter, 0);
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
                            // console.log('err', error);
                            self.showToast('Something wrong in API', self.TOST().ERROR);
                        }
                    });

                } else if (this.httpMethod == 'PUT') {
                    // Date 9/JAN/2019
                  formData = Object.assign({productId: this.getStore('getProducts')._id}, formData);
                    // console.log('PUT Form Data : ', formData);

                    this.PUT('edit_product', formData, (resp, error) => {

                        if (!error) {
                            if (resp.data.errCode !== 4) {
                                if (resp.data.errCode !== 510) {
                                    if (resp.data.errCode == 505) {
                                        self.showLoader('Loading', false);
                                        self.showToast('No such record are found', self.TOST().ERROR);
                                    } else{
                                        self.showLoader('Loading', false);
                                        self.showToast('Product updated successfully', self.TOST().SUCCESS);
                                        self.more_pdf_images = false
                                        /**
                                         * Insert new file upload category
                                         */
                                        if(self.fileCategory == '' || self.fileCategory == null || self.confirm == false) {} else {
                                            onPageLoad.insertNewOne(self, {categoryName: self.fileCategory}, self.getAgentInfo()._id, function() {
                                                // Load File upload category from store
                                                // console.log('I am at callback');
                                                self.fileCategoriesList = mixin.getStore('getFileUploadCategory');
                                            });
                                        }

                                        self.$refs.plist.editProduct({_id: self.getStore('getProducts')._id}, 1);
                                    }
                                } else {
                                    self.showLoader('Loading', false);
                                    self.showToast('Not a valid user', self.TOST().ERROR);
                                }
                            } else {
                                self.showLoader('Loading', false);
                                self.showToast('Database Error', self.TOST().ERROR);
                            }
                        } else {
                            self.showLoader('Loading', false);
                            // console.log(error);
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
                self.showToast('Please enter product name', self.TOST().WARNING);
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
                        location: file.location,
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
                        location: file.location,
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
                     * Note: Here revert files*/
                    // Remove file records from Array
                    self.productMedia.splice(self.editEnable.location, 1, { location: data.location, thumbnail: data.fileName, fileName: data.fileName, fileType: data.fileType, active: data.active } );
                    // then again add new updated file in the array using push methods

                    // The line below was commented because it was pushing data after a slice, which caused it to appear at the end, now it will replace it at the sliced position
                    // self.productMedia.push({ location: data.location, thumbnail: data.fileName, fileName: data.fileName, fileType: data.fileType, active: data.active });
                    self.resetEditDataFields();
                    data.fileType == 'mp4' ?  resolve(5) : resolve(0)
                } else {
                    /**
                     * It is used push new file
                     */
                    self.productMedia.push({ location: data.location, thumbnail: data.fileName, fileName: data.fileName, fileType: data.fileType, active: data.active });
                    // console.log(self.productMedia);
                    data.fileType == 'mp4' ?  resolve(5) : resolve(0)
                }
            });
        },

        openLightBox(obj) {
            // console.log('Object  ', obj);
            this.dialog = true;
            this.lightBox.imagePath = obj.location;
            this.lightBox.ext = obj.fileType == 'mp4' ? obj.fileType : obj.fileType.toLowerCase();
        },

        scrollup(){
             document.body.scrollTop = 10;
            document.documentElement.scrollTop = 10;
        },

        showDescription(event) {

            console.log("this.ttl_err ->", this.ttl_err)

            if(this.ttl_err){
                this.showToast('Please enter valid data', this.TOST().WARNING);
                return;
            }

            if (this.channelCode == null || this.channelCode == undefined || this.channelCode == "") {
                this.showLoader('Loading', false);
                this.scrollup();
                this.showToast('Channel code  is mandatory', this.TOST().WARNING);
                return;
            }else if(this.frmOne.productName == null || this.frmOne.productName == ""){
            //   pv99
                this.scrollup();
                this.showToast('Please enter product name', this.TOST().WARNING);

                 return
            }else if(/^\s+$/g.test(this.frmOne.productName)){
                    this.scrollup();
                    this.showToast('Product name cannot be empty', this.TOST().WARNING);
                     return
            }

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
                this.frmOne[props] = props == 'productType' ? this.prod_cat[0] : props == '_lang' ? language[0] : ''
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
        }
    }
}
</script>
<style>

    .pdf-page-canvas {
        display: block;
        margin: 5px auto;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .no_products{
        text-align: center;
        font-size: 14.5px;
        font-family: roboto;
        color: #3C3D3D;
        font-weight: 400;
    }

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

