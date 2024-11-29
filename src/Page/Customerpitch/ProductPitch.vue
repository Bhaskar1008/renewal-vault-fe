<template>
    <v-app>
        <!-- <v-content> -->
            <!-- <v-card> -->
            <v-layout row wrap >
                <v-flex class="ml-3 mt-3" style="flex-flow:column wrap">
                    <v-text class="headline font-weight-bold">Products</v-text>
                    <hr>
                    <v-flex xs12 sm6 md6 ml-3 mt-3>
                        <v-flex xs12 sm6 md6 ml-3 mt-3>
                            <v-text class="title font-weight-bold">Product Title:</v-text>  
                        </v-flex>
                        <v-text-field placeholder="Title" v-model="storyTitle"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6 ml-3 mt-3>
                        <v-text class="title font-weight-bold">Description:</v-text>  
                    </v-flex>
                    
                    <v-card>
                    <div class="mt-3 md11 text-editor-size">
                        <vue-editor
                            v-model="content1"
                            ref="editor1"
                            :editor-toolbar="toolbarSettings"
                            :editor-options="editorSettings"
                            :disabled="editorIsDisabled"
                            placeholder="First custom placeholder"
                            @blur="onEditorBlur1"
                            @focus="onEditorFocus1"
                            @ready="onEditorReady1"
                            @selection-change="onSelectionChange1">
                        </vue-editor>
                    </div>
                    </v-card>
                    <v-flex xs12 sm6 md6 ml-3 mt-3>
                        <v-text class="title font-weight-bold">Useful Features of Term Insurance Plans:</v-text>
                    </v-flex>
                    <v-card >
                    <div class="mt-3 md11 text-editor-size">
                        <vue-editor
                            v-model="content2"
                            ref="editor2"
                            :editor-toolbar="toolbarSettings"
                            :editor-options="editorSettings"
                            :disabled="editorIsDisabled"
                            placeholder="First custom placeholder"
                            @blur="onEditorBlur2"
                            @focus="onEditorFocus2"
                            @ready="onEditorReady2"
                            @selection-change="onSelectionChange2">
                        </vue-editor>
                    </div>
                    </v-card>
                    <v-flex xs12 sm6 md6 ml-3 mt-3>
                        <v-text class="title font-weight-bold">Why should you get a Term Insurance Plan?:</v-text>
                    </v-flex>
                    <v-card>
                    <div class="mt-3 md11 text-editor-size">
                        <vue-editor
                            v-model="content3"
                            ref="editor3"
                            :editor-toolbar="toolbarSettings"
                            :editor-options="editorSettings"
                            :disabled="editorIsDisabled"
                            placeholder="First custom placeholder"
                            @blur="onEditorBlur3"
                            @focus="onEditorFocus3"
                            @ready="onEditorReady3"
                            @selection-change="onSelectionChange3">
                        </vue-editor>
                    </div>
                    </v-card>
                    <v-layout row wrap mt-3>
                        <v-flex>
                        <v-btn @click='pickFile' depressed medium color="primary">upload Image</v-btn>
                            <v-text class="mt-2 ml-3 body-1 font-weight-medium font-italic grey--text" color=" blue-grey lighten-5">{{fileName}}</v-text>
                            <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    <v-btn @click='uploadData' depressed medium color="primary">upload Data</v-btn>
                    
                    <v-layout row justify-space-between>
                        <v-flex justify-center md10>
                            <h3 class="text-xs-center mb-3">Image Table</h3>
                            <v-data-table
                            :headers="headers"
                            :items="successList"
                            hide-actions
                            class="elevation-1">
                                <template slot="items" slot-scope="props">
                                    <td class="">{{props.item.title}}</td>
                                    <td class="" @click="showText(props.item.story1)">{{props.item.story1}}</td>
                                    <td class="" @click="showText(props.item.story2)">{{props.item.story2}}</td>
                                    <td class="" @click="showText(props.item.story3)">{{props.item.story3}}</td>
                                    <td class=""><img class="documt-id-prof" @click="showdialog(props.item.image)" :src="props.item.image"/></td>
                                    <!-- <td class=""><img class="documt-id-prof" @click="showdialog(props.item.storyImage)" :src="props.item.storyImage" /></td> -->
                                    <!-- <td class="">{{fileName}}</td>  -->
                                    <!-- <td class="justify-center layout px-0">
                                        <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                                        <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                                    </td> -->
                                </template>
                            </v-data-table>
                        </v-flex>
                </v-layout>
                </v-flex>    
            </v-layout> 
            <!-- </v-card> -->

        <!-- </v-content>    -->
        <v-dialog v-model="dialog" width="500px">
            <v-card>
                <v-toolbar color="secondary" dark>
                    <v-toolbar-title >Review</v-toolbar-title>
                </v-toolbar>
                <v-layout mt-3 justify-center>
                    <img height="300px" :src="dialogimage"/>
                </v-layout>
            </v-card>
         </v-dialog>
         <v-dialog v-model="dialog1" width="800px">
            <v-card>
              <v-toolbar color="secondary" dark>
                <v-toolbar-title >Review</v-toolbar-title>
              </v-toolbar>
              <v-layout ml-3 column v-html="this.content">
                {{this.content}}
              </v-layout>
            </v-card>
         </v-dialog>  
   
    </v-app>
</template>

<script>
    import axios from 'axios' 
    import { VueEditor, Quill } from 'vue2-editor';

    let myStory = "";
    export default {
        components: {
            VueEditor
        },
        data(){
            return{
                mainImage:'',
                dialog1:false,
                imageList: [],
                // imageUrlList: [],
                storyTitle:'',
                successList:[],
                toolbarSettings: [
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote", "code-block"],
                    [{ header: 1 }, { header: 2 }],
                    [{ list: "ordered" }, { list: "bullet" }]
                ],
                editorSettings: {},
                editorIsDisabled: false,
                content1:'',
                content2:'',
                content3:'',
                title: "Image Upload",
                dialog: false,
                dialogimage:'',
                arrayData:[],
                arrayDataUrl:[],
                imageList: [],
                imageUrlList: [],
                fileName:'',
                tableShow:false,    
                imgact:false,
                // showText:false,
                billFilename:'',
                // responses:[],    
                resUploadbill:[],
                headers:[
                    // {text: 'Image', value: 'image'},
                    // {text: 'File Name', value: 'filename'},
                    {text: 'Title', value: 'title'},
                    {text: 'Description', value: 'Description'},
                    {text: 'Useful Features of Term Insurance Plans', value: 'feature'},
                    {text: 'Why should you get a Term Insurance Plan', value: 'plans'},
                    {text: 'Image', value: 'image'},
                    // {text: 'Action', value: 'action', sortable: false}
                ],
                tableData: [],
                editedIndex: -1,
                richStory:'',
                mainFile:[]

                // editedItem: {
                //     rolename:'',
                //     rolecode:'',
                //     rolestatus:'',
                //     statusSelected:''
                // }
            }
        },

        created(){
        this.resUploadbill = this.$store.state.billDetails
        console.log('RESPONSE UPLOAD BILL',this.resUploadbill)
            
        },
        watch: {
            content: function(latest, old) {
                myStory = latest;
                console.log(myStory);
            }
        },
        methods: {
            uploadData(){
                // Object.assign(this.successList[this.editedIndex], this.editedItem)
                // this.editedItem.title  = this.storyTitle
                let editedItem = {};
                editedItem.title= this.storyTitle;
                editedItem.richText1 = this.richStory1
                editedItem.richText2 = this.richStory2
                editedItem.richText3 = this.richStory3
                editedItem.story1= this.content1;
                editedItem.story2= this.content2;
                editedItem.story3= this.content3;
                
                this.successList.push(editedItem)
                console.log('0000000',this.successList);
                // editedItem   = {};
                // myStory = `<h1>dk title </h1>`;
                for (var i = 0; i < this.mainFile.length; i++) {
                    var fileReader = new FileReader()
                    fileReader.addEventListener('load', () => {
                    this.imageUrlList.push(fileReader.result)
                    
                    
                    for(var j = 0; j < this.imageUrlList.length; j++){
                        console.log("Final List",this.imageUrlList[j])
                        editedItem.image = this.imageUrlList[j]
                    }
                        // this.mainImage = this.imageUrlList[j] 
                        // editedItem.image = this.imageUrlList[j]
                    //     console.log('image list==>',this.imageUrlList[j])
                    // }
                    // editedItem.storyImage= this.imageUrlList[i]
                    // console.log("List is",editedItem.storyImage)
                })
                fileReader.readAsDataURL(this.mainFile[i])
                this.imageList = this.mainFile[i]
                // console.log('llllllliist',this.imageList)
                }
                // for(var j = 0; j < this.imageUrlList.length; j++){
                //         // this.mainImage = this.imageUrlList[j]
                //         return this.imageUrlList[i]
                //         console.log('image list==>',this.imageUrlList[j])
                //     }
                // editedItem.storyImage = this.imageUrlList
                // console.log("List is",editedItem.storyImage)
            },

            // =======================================
            onEditorBlur2(quill) {
                this.richStory2 = quill.container.innerText
                console.log("editor blur!", this.richStory2);
                
            },
            onEditorFocus2(quill) {
                console.log("editor focus!", quill);
            },
            onEditorReady2(quill) {
                console.log("editor ready!", quill);
            },
            onEditorChange2({ quill, html, text }) {
                console.log("editor change!", quill, html, text);
                this.content = html;
            },
            onSelectionChange2(range, oldRange, source) {
                console.log("Selection change!", range);
            },

            // =============================================
            onEditorBlur1(quill) {
                this.richStory1 = quill.container.innerText
                console.log("editor blur!", this.richStory1);
                
            },
            onEditorFocus1(quill) {
                console.log("editor focus!", quill);
            },
            onEditorReady1(quill) {
                console.log("editor ready!", quill);
            },
            onEditorChange1({ quill, html, text }) {
                console.log("editor change!", quill, html, text);
                this.content = html;
            },
            onSelectionChange1(range, oldRange, source) {
                console.log("Selection change!", range);
            },

            // ==============================================
            onEditorBlur1(quill) {
                this.richStory3 = quill.container.innerText
                console.log("editor blur!", this.richStory3);
                
            },
            onEditorFocus3(quill) {
                console.log("editor focus!", quill);
            },
            onEditorReady3(quill) {
                console.log("editor ready!", quill);
            },
            onEditorChange3({ quill, html, text }) {
                console.log("editor change!", quill, html, text);
                this.content = html;
            },
            onSelectionChange3(range, oldRange, source) {
                console.log("Selection change!", range);
            },
            editedText(evt){
                console.log('jwdgjewf', evt)
            },
            showdialog(img){
                this.dialog = true;
                this.dialogimage = img;
                console.log(img);
            },
            showText(text){

                // this.editedIndex = this.successList.indexOf(text)
                // console.log('popup index==>',text)
                this.content = text
                // myStory= Object.assign({}, text)
            //     // this.dialog = true
            //     // console.log('popupp==>',this.myStory)
                this.dialog1 = true
            //     // this.myStory = text
            //     console.log('popupp==>',this.myStory)
            },
            pickFile () {
                this.$refs.image.click ()
            },
            showdialog(img){
                this.dialog = true;
                this.dialogimage = img;
                console.log(img);
            },
            // pickFile () {
            //     this.$refs.image.click ()
            // },
            onFileChange(e){
                //TESY CODE
                let selectedFiles = event.target.files || event.dataTransfer.files 
                console.log('selected img==>',selectedFiles)
                this.imageList = []
                for(var i =0; i < selectedFiles.length;i++)
                {
                this.imageList.push(selectedFiles[i]);
                }
                if (!this.imageList.length) {
                    return
                }
                this.createImage(this.imageList)
                this.imgact = true;
                },
            createImage (file) {
                // this.tableShow = true;
                this.mainFile = file
                console.log("File is",this.mainFile) 
                this.fileName = file[0].name
                console.log("File NAme",this.fileName)
                // for (var i = 0; i < file.length; i++) {
                //     var fileReader = new FileReader()
                //     // var vm = this
                //     fileReader.addEventListener('load', () => {
                //     this.imageUrlList.push(fileReader.result)
                //     console.log("Final List",this.imageUrlList)
                // })
                // fileReader.readAsDataURL(file[i])
                // this.imageList = file[i]
                // }
                // console.log("List is",this.imageUrlList)
            },
            onFilePicked (e) {
                //TESY CODE
                let selectedFiles = event.target.files || event.dataTransfer.files 
                this.imageList = []
                for(var i =0; i < selectedFiles.length;i++)
                {
                this.imageList.push(selectedFiles[i]);
                }
                if (!this.imageList.length) {
                    return
                }
                this.createImage(this.imageList)
                this.imgact = true;
                }
            }
        }
    </script>

    <style>
    .documt-id-prof {
                width: 70px;
                height: 40px;
            }
    .v-markup {
    box-shadow: none;
    display: flex;
    border-radius: 2px;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 16px;
    background: #2d2d2d;
    color: #fff;
    }
    .wdth-img{
        width:730px
    }

    @media screen and (min-width: 320px) {

    .wdth-img{
        width:580px
    }

    }

    @media screen and (min-width: 768px) {
    /* .wdth-cmp{
    width:740px;
    } */
    
    }
    @media screen and (min-width: 992px) {
    /* .wdth-img{
        width:730px
    } */
    
    }
    </style>