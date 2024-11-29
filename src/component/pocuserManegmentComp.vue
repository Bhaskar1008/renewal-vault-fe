<template>
    <v-app>
        <!-- <v-content> -->
            <v-card class=" mt-2 pa-3" style="overflow:hidden;">
                
            <v-layout row wrap >
               <!-- justify-space-between -->
                    <v-layout>
                       
                        <v-flex xs10 sm6 md4 class=" mt-4">
                            <v-text-field solo-inverted flat label="Search" append-icon="search" height="30px"></v-text-field>                            
                        </v-flex>
                    </v-layout>

                    <!-- <v-layout > -->
                
                    <v-flex  xs12 sm12 md12 mt-3 >
                        <h3 class="text-xs-center mb-3">User Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="TblData"
                        hide-actions
                        class="elevation-2" >
                        <template slot="items" slot-scope="props">
                             
                            <!-- <td class="">{{props.index}}</td> -->
                            <td class="">{{props.item.FirstName}}</td>
                            <td class="">{{props.item.mobileNo}}</td>
                            <td class="">{{props.item.policyCount}}</td>
                            <td class="">{{props.item.noOf_logins}}</td>
                            <td class="">{{moment(props.item.last_login).utc().format("YYYY-MM-DD")}}</td>
                        
                            <td class="justify-center layout px-0">
                                 <v-menu transition="scale-transition">
                                    <v-btn icon class="mx-0" slot="activator" >
                                    <v-icon color="grey">settings</v-icon>
                                </v-btn>
                                    <v-list>
                                    <v-list-tile >
                                        <v-btn flat color="primary" @click.native="editItem(props.item,props.index)">Edit</v-btn>
                                    </v-list-tile>
                                    <v-list-tile >
                                        <v-btn flat color="primary" @click.native="deleteItem(props.item,props.index)">Delete</v-btn>
                                    </v-list-tile>
                                     <v-list-tile >
                                        <v-btn flat color="primary" @click.native="resetPass(props.item,props.index)">Reset Password</v-btn>
                                    </v-list-tile>

                                    </v-list>
                                </v-menu>
                                <!-- <v-icon small class="mr-2"  @click="editItem(props.item, props.index)" >remove_red_eye</v-icon>
                                <v-icon small class="mr-2" @click="editItem(props.item, props.index)" >edit</v-icon>
                                <v-icon small @click="deleteItem(props.item,props.index)" >delete</v-icon> -->
                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>
                <!-- </v-layout> -->

                    <!-- <v-layout> -->
                    
                    <!-- </v-layout> -->

                    <!-- DIALOG FOR BULK UPLOAD -->
                    <v-dialog v-model="dialogBulkUpld" persistent max-width="700px">
                         <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white;justify-content:space-between;" >Upload File  
                                <v-icon dark @click="dialogBulkUpld = false">clear</v-icon>
                                <!-- <img src='https://www.materialui.co/materialIcons/file/file_upload_white_192x192.png' width="35px"></img> -->
                            </v-card-title>
                            
                        </v-flex>

                     <v-card-text>
                        <v-container grid-list-md>
                           <v-stepper v-model="steps">
                                <v-stepper-header>
                                <v-stepper-step :complete="steps > 1"  step="1">Upload Data</v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step  step="2">Status</v-stepper-step>

                                <!-- <v-divider></v-divider> -->

                                <!-- <v-stepper-step  step="3">Name of step 3</v-stepper-step> -->
                                </v-stepper-header>

                                <v-stepper-items>
                                <v-stepper-content step="1">
                                    <!-- <v-card class="mb-3"  height="200px"> -->
                                        <v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
                                        <v-layout >
                                        <!-- <v-flex md2> -->
                                          <!-- <upload-button fileChangedCallback = "jsonupload" color="primary" title="Upload"></upload-button>  -->
                                          <!-- <div>
                                          <input type="file"  
                                                id="fileUpload"
                                                @change="jsonupload">
                                            </div> -->
                                          <!-- </v-flex> -->
                                        <div class="fileContainer-bulk  mt-4-bulk"  >
                                            <v-text class="documt-normal-text-size-bulk subheading ">UPLOAD</v-text>
                                            <v-icon dark>publish</v-icon>
                                            <input type="file"  
                                            id="fileUpload"
                                            @change="jsonupload">
                                        </div>
                                        <v-layout ml-3 column>    
                                            <v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Supports xls/csv format.</v-text>
                                            <v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Approx time to upload 2 mb file - 30 min.</v-text>                                            
                                        </v-layout>
                                        </v-layout>
                                        <v-layout ml-3 mt-3>
                                            <div v-if="fileLink !== ''">
                                                <v-layout row>
                                                    <div class="font-weight-medium body-2 "> Selected File: </div>
                                                    <div class="body-1 font-weight-regular font-italic">{{fileLink}}</div>
                                                </v-layout>
                                            </div>
                                        </v-layout>
                                    <!-- </v-card> -->
                                    <!-- <v-divider></v-divider>                                         -->
                                    <v-layout mt-3 justify-space-between>
                                        <!-- <v-card-actions style="justify-content:/space-between;"> -->
                                            <!-- <v-spacer></v-spacer> -->
                                            <v-btn color="primary">sample file
                                                <v-icon right dark>save_alt</v-icon>
                                            </v-btn>
                                            <v-btn color="primary" @click="steps = 2">Next <v-icon class="ml-2" size="20px">arrow_forward</v-icon></v-btn>
                                        
                                        <!-- </v-card-actions> -->
                                    </v-layout>
                                </v-stepper-content>

                                <v-stepper-content step="2">
                                    <!-- <v-card class="mb-5 pa-5" height="200px"> -->
                                        <v-flex xs12 sm12 md12 style="display:flex;align-items:center">
                                            <v-icon large color="success">check_circle_outline</v-icon>
                                            <v-text class="subheading font-weight-medium ml-3">50 Users Data successfully Uploaded</v-text>
                                        </v-flex>

                                        <v-flex xs12 sm12 md12 mt-3 style="display:flex;align-items:center">
                                            <v-icon large color="error">highlight_off</v-icon>                                 
                                            <v-text class="subheading font-weight-medium ml-3">Error Found in 9 Users Data</v-text>                                
                                        </v-flex>
                                        <v-flex mt-3>
                                            <v-text class="subheading font-weight-medium ml-1">Failed Data:</v-text> 
                                            <a :href ="downloadlink" download>{{downloadlink}}</a>
                                        </v-flex>
                                        
                                    <!-- </v-card>  -->
                                    <v-card-actions style="justify-content:flex-end;">
                                    <!-- <v-btn color="primary" @click.native=" close()">Download
                                        <v-icon right dark>save_alt</v-icon>
                                    </v-btn> -->
                                    <v-layout mt-5 justify-space-between>
                                        <v-btn color="primary" @click="steps =1"><v-icon class="mr-2">arrow_back</v-icon>Previous</v-btn>                                    
                                        <v-btn color="primary" @click="cancelStepper">Cancel <v-icon class="ml-2" size="20px">clear</v-icon></v-btn>
                                    </v-layout>
                                    </v-card-actions>
                                </v-stepper-content>
                             </v-stepper-items>
                            </v-stepper>
                
                        </v-container>
                    </v-card-text>
            
                    </v-card>

                    </v-dialog>

                    <v-dialog v-model="dialogDwnld" persistent max-width="500px">
                          <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >Uploaded User</v-card-title>
                        </v-flex>

                     <v-card-text>
                        <v-container grid-list-md>
                           
                            <v-flex xs12 sm12 md12 style="display:flex;align-items:center">
                                <v-icon large color="success">check_circle_outline</v-icon>
                                <v-text class="subheading font-weight-medium ml-3">50 Users Data successfully Uploaded</v-text>
                            </v-flex>

                             <v-flex xs12 sm12 md12 mt-3 style="display:flex;align-items:center">
                                 <v-icon large color="error">highlight_off</v-icon>                                 
                                <v-text class="subheading font-weight-medium ml-3">Error Found in 9 Users Data</v-text>                                
                            </v-flex>
                        </v-container>
                    </v-card-text>
                    <!-- <v-divider></v-divider> -->
                    <v-card-actions>
                        <!-- <v-spacer></v-spacer> -->
                        <v-btn color="primary" @click.native=" close()">Download
                            <v-icon right dark>cloud_download</v-icon>
                        </v-btn>
                        <!-- <v-btn depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn> -->
                    </v-card-actions>
                    </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialog" persistent max-width="800px">

                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                     <v-card-text>
                         <form @submit.prevent="saveAndEdit()">
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.primaryEmail" 
                                label="Primary Email"
                                   @input="$v.editedItem.primaryEmail.$touch()"
                                @blur="$v.editedItem.primaryEmail.$touch()"
                                 :error-messages="emailErrors"
                                required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                 v-model="editedItem.firstName" 
                                label="First Name"
                                  @input="$v.editedItem.firstName.$touch()"
                                @blur="$v.editedItem.firstName.$touch()"
                                 :error-messages="nameErrors"
                                required
                      
                                >

                                </v-text-field>
                                
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.agentId" label="Agent ID"
                                    @input="$v.editedItem.agentId.$touch()"
                                @blur="$v.editedItem.agentId.$touch()"
                                 :error-messages="agentIdErrors"
                                >

                                </v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.passwrd" label="Password"
                                   @input="$v.editedItem.passwrd.$touch()"
                                @blur="$v.editedItem.passwrd.$touch()"
                                 :error-messages="passwordErrors"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.branch"  :items="branchArray"  item-text="text" item-value="value" label="Branch" 
                                ></v-select>
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.reportingManager" :items="itemsReprtMngr"  item-text="text" item-value="value"  label="Reporting Manager"
                                  @input="$v.editedItem.reportingManager.$touch()"
                                @blur="$v.editedItem.reportingManager.$touch()"
                                 :error-messages="managerErrors" ></v-select>                                
                            </v-flex>
                             <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.Active" label="Active"></v-text-field>
                            </v-flex> -->
                             <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.slectStatus" :items="userstatus" item-text="text" item-value="value" label="User Status" 
                                  @input="$v.editedItem.slectStatus.$touch()"
                                @blur="$v.editedItem.slectStatus.$touch()"
                                 :error-messages="statusErrors"></v-select>                                                                
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.channelcode" :items="itemsChanel"  item-text="text" item-value="value"  label="Channel Code" ></v-select>                                                                
                            </v-flex>
                             <v-flex xs12 sm6 md6>
                                <v-select v-model="editedItem.rolecode" :items="itemsRole"  item-text="text" item-value="value"  label="Role Code"
                                  @input="$v.editedItem.rolecode.$touch()"
                                @blur="$v.editedItem.rolecode.$touch()"
                                 :error-messages="codeErrors" ></v-select>                                                                
                            </v-flex>
                             <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.reportingBranchcode" label="Reporting Branch Code"></v-text-field>
                            </v-flex> -->
                           
                            </v-layout>
                        </v-container>
                         </form>
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                              <v-text class="subheading font-weight-medium ml-3"  v-if="submitStatus === 'ERROR'">{{submitStatus}}</v-text> 
                                   <v-text class="subheading font-weight-medium ml-3"  v-else>{{submitStatus}}</v-text> 
                    </v-card>
           
                    </v-dialog> 

                    <!-- Reset Password Popup -->
                       <v-dialog v-model="reset" persistent max-width="800px">

                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                     <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text>Are you sure you want to reset password</v-text>
                            </v-flex>
                             <!-- <v-flex xs12 sm6 md6>
                                <v-text-field v-model="editedItem.reportingBranchcode" label="Reporting Branch Code"></v-text-field>
                            </v-flex> -->
                           
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native="closeResetDialog()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn depressed large color="secondary" @click.native="resetData()">OK
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                    </v-dialog> 

                <!-- </v-flex>     -->
            </v-layout> 
                
            </v-card>
        <!-- </v-content>    -->
   
    </v-app>
</template>
<script>
import axios from 'axios' 
import UploadButton from 'vuetify-upload-button';
import { required, minLength, between,email } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {

    created(){
        console.log("Created Method called")
        //    axios.get('http://159.89.161.64:5021/secure/user/getataUser?filter=0').then(    //have comments this line because of JWT we dont have  this static  varible
            this.GET('getataUser?filter=0' , function(res,error){    
            //    res => {
                    
                    //  console.log('xyz :',res.data.errMsg);
                    // res.data.errMsg.forEach(element => {
                    //                element.slectStatus = '';
                    //                element.branchName = '';
                    //                element.rolecode = '';
                    //            });

                    this.TblData = res.data.errMsg
                    console.log('User REPONSE',this.TblData)
                    
                    

               }
           ).catch(
               err => {
                   console.log(err) ;
               }
           );
          
    },
    validations: {
     editedItem: {
      firstName: {
        required,
      },
      primaryEmail:{
          required,
          email
      },
      agentId:{
          required
      },
       passwrd:{
          required,
      },
    //     branch:{
    //       required
    //   },
        reportingManager:{
          required
      },
        slectStatus:{
          required
      },
        rolecode:{
          required
      }
},
},
    // email: { required, email },
    // select: { required },
    // checkbox: { required }


  
    data(){
        return{
            moment:moment,
            userfirstName:'',
            downloadlink:"../../../web/assets/Excel_Lead_Upload_Format.xlsx",
            steps:0,
            submitStatus:'',
            fileName:'',
            showFileName:false,
            dialog: false,
            dialogDwnld:false,
            dialogBulkUpld:false,
            reset:false,
            btnname:'',
             usrdetails:[],
            TableIndex:'',
            branchArray:[],
            userstatus:['InActive','Active'],
            usrputdetails:[],
            allAgentdata:[],
            itemsBranch : [
                    {text:"ADMINDK_updated",value:"787878"},
                    {text:"testdk UPDATED",value:"898989"},
                   ],

                itemsReprtMngr : [
                    {text:"Usama",value:"5b8e2fb744487867bad96436"},
                     {text:"Sudeep",value:"5b8e38e244487867bad9644b"},
                      {text:"Abhishek",value:"5b8e3c7f44487867bad96459"},
                       {text:"Salman",value:"5b8e3c9044487867bad9645a"},
                    
                   ],

                itemsChanel : [
                    {text:"Abhi123",value:"AS9823"},
                    {text:"sudeep",value:"sd12"},
                   ],
                itemsBranchCode: [
                    {text:"ADMINDK_updated",value:"787878"},
                    {text:"testdk UPDATED",value:"898989"},
                   ],
                 itemsRole:[
                    {text:"Usama",value:"UK1242"},
                    {text:"dsd",value:"sds23"},
                   ],

            headers:[
                        {text: 'First Name', value: 'firstName'},
                        {text: 'Mobile No', value: 'mobileno'},
                        {text: 'Policy Count', value: 'policycount'},
                        {text: 'Number Of Logins', value: 'numberoflogins'},
                        {text: 'Last Login Date', value: 'lastlogindate'},
                        // {text: 'Branch', value: 'branch'},
                        // {text: 'Reporting Manager', value: 'reportingManager'},
                        // {text: 'User Status', value: 'slectStatus'},
                        // {text: 'Channel Code', value: 'channelcode'},
                        // {text: 'Role Code', value: 'rolecode'},
                       
                        {text: 'Action', value: 'action', sortable: false}
                ],
            TblData: [],
            userEmail:'',
                editedIndex: -1,
                editedItem: {
               primaryEmail:'',
                firstName:'',
                lastName:'',
                agentId:'',
                passwrd:'',
                branch:'',
                reportingManager:'',
                slectStatus:'',
                branchcode:'',
                channelcode:'',
                rolecode:'',
                reportingBranchcode:'',
            },
            defaultItem: {
               primaryEmail:'',
                firstName:'',
                lastName:'',
                agentId:'',
                passwrd:'',
                branch:'',
                reportingManager:'',
                slectStatus:'',
                branchcode:'',
                channelcode:'',
                rolecode:'',
                reportingBranchcode:'',
                
            },
            statusIndex:'',
            Datas: {
                // We will make a Workbook contains 2 Worksheets
                // 'headers':[
                //         {text: 'Primary Email', value: 'primaryEmail'},
                //         {text: 'First Name', value: 'firstName'},
                //         {text: 'Last Name', value: 'lastName'},
                //         {text: 'Agent ID', value: 'agentId'},
                //         {text: 'Password', value: 'passwrd'},
                //         {text: 'Branch', value: 'branch'},
                //         {text: 'Reporting Manager', value: 'reportingManager'},
                //         {text: 'User Status', value: 'slectStatus'},
                //         {text: 'Channel Code', value: 'channelcode'},
                //         {text: 'Role Code', value: 'rolecode'},
                       
                //         {text: 'Action', value: 'action', sortable: false}
                // ],
                 'animals': [
                            {"name": "cat", "category": "animal"}
                            ,{"name": "dog", "category": "animal"}
                            ,{"name": "cat", "category": "animal"}
                        ],
                'pokemons': [
                            {"name": "pikachu", "category": "pokemon"}
                            ,{"name": "Arbok", "category": "pokemon"}
                            ,{"name": "Eevee", "category": "pokemon"}
                        ]
            },
            fileLink:'',
            split:[]
              
                
        }
    },

    components:{
        UploadButton
    },

      computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New User' : 'Edit User'
        },

         value() {
           console.log(this.value);
       },
          nameErrors () {
      const errors = []
      const name=''
      this.editItem.firstName = name
      if (!this.$v.editedItem.firstName.$dirty) return errors

      !this.$v.editedItem.firstName.required && errors.push('Name is required.')
      return errors
    },
         emailErrors () {
      const errors = []
      if (!this.$v.editedItem.primaryEmail.$dirty) return errors
          !this.$v.editedItem.primaryEmail.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.primaryEmail.required && errors.push('Email is required.')
      return errors
    },
        agentIdErrors () {
      const errors = []
      if (!this.$v.editedItem.agentId.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.agentId.required && errors.push('Agent ID is required.')
      return errors
    },
       passwordErrors () {
      const errors = []
      if (!this.$v.editedItem.passwrd.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.passwrd.required && errors.push('Password is required.')
      return errors
    },
    //    branchErrors () {
    //   const errors = []
    //   if (!this.$v.editedItem.branch.$dirty) return errors
    //   !this.$v.editedItem.branch.required && errors.push('Branch Name  is required.')
    //   return errors
    // },
       managerErrors () {
      const errors = []
      if (!this.$v.editedItem.reportingManager.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.reportingManager.required && errors.push('Reporting Manager is required.')
      return errors
    },
       codeErrors () {
      const errors = []
      if (!this.$v.editedItem.rolecode.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.rolecode.required && errors.push('Role Code is required.')
      return errors
    },
       statusErrors () {
      const errors = []
      if (!this.$v.editedItem.slectStatus.$dirty) return errors
        //   !this.$v.editedItem.agentId.email && errors.push('Must be valid e-mail')
      !this.$v.editedItem.slectStatus.required && errors.push('Status is required.')
      return errors
    },
    },

    methods:{


            // Made by salman Not using it for now,But please for dont delete it
        downloadCSV(){
        // On Click Excel download button

            // export json to Worksheet of Excel
            // only array possible
            var animalWS = XLSX.utils.json_to_sheet(this.Datas.animals)
            var pokemonWS = XLSX.utils.json_to_sheet(this.Datas.pokemons)

            // A workbook is the name given to an Excel file
            var wb = XLSX.utils.book_new() // make Workbook of Excel

            // add Worksheet to Workbook
            // Workbook contains one or more worksheets
            XLSX.utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet
            XLSX.utils.book_append_sheet(wb, pokemonWS, 'pokemons')

            // export Excel file
            XLSX.writeFile(wb, 'book.xlsx') // name of the file is 'book.xlsx'
        },

        jsonupload(e) {
            console.log("Event is",e.target.value)
            this.split  = e.target.value
            console.log("array is",this.split)
            this.fileLink = e.target.value
        //Reference the FileUpload element.
        var fileUpload = document.getElementById("fileUpload");
        console.log("File is",fileUpload)
 
        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
 
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    //For NON IE Browser.
                      reader.addEventListener('load', (e) => {
       this.ProcessExcel(e.target.result)
    })
    reader.readAsBinaryString(fileUpload.files[0])
                } 
                else {
                    //For IE Browser.
                      reader.addEventListener('load', (e) => {
                                   var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        this.ProcessExcel(data);
                      })
                      reader.readAsArrayBuffer(fileUpload.files[0]); 
                
                 }
                }
             else {
                // this.vSnackBar("error","This browser does not support HTML5.");
            }
        } else {
           
            // this.vSnackBar("error","Please upload a valid Excel file.");
        }
    },

     ProcessExcel(data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        console.log("Workbook is",workbook.Strings)

 
       var first_sheet_name = workbook.SheetNames[0];
           /* Get worksheet */
           var worksheet = workbook.Sheets[first_sheet_name];
        //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
        //        raw: true
        //    }));
           let excelData =[]
           excelData = XLSX.utils.sheet_to_json(worksheet, {
               raw: true
           })
        
           console.log("Formatted Json",excelData)
        
    },


        fileChangedCallback(event){
                console.log(event)
                const file = event
                console.log('EVENT NAME',event.name)
                if(file !== undefined) {
                this.fileName = file.name
                // console.log(this.fileName,'TTTTTTTTTTT')
                this.showFileName = true;
				
			} 
        },

        saveAndEdit(_btnname){
             if(_btnname == 'Submit' )
            {
                this.save();
            } 
            else if(_btnname == 'Update'){
                    this.editItem();
            }
            },

         addUser(){
            this.btnname='Submit';
                this.editedItem.primaryEmail ='',
                this.editedItem.firstName = '',
                this.editedItem.lastName = '',
                this.editedItem.agentId = '',
                this.editedItem.passwrd = '',
                this.editedItem.branch = '',
                this.editedItem.reportingManager = '',
                this.editedItem.slectStatus = '',
                this.editedItem.branchcode = '',
                this.editedItem.channelcode = '',
                this.editedItem.rolecode = '',
                this.editedItem.reportingBranchcode = '',
            this.dialog=true;
         },

     save () {
         this.btnname='Submit';
         this.$v.$touch()
               console.log(this.$v)  
          if (this.$v.$invalid == true) {
              console.log("Form has errors")  
        this.submitStatus = 'Please correct form errors'
      } 
      else {
          console.log("Form is perfect")
        if (this.editedIndex > -1) {
          Object.assign(this.TblData[this.editedIndex], this.editedItem)
        } else {
          this.TblData.push(this.editedItem)
        }
        this.close()
               }
        //        this.$v.$touch()
        //        if (!this.$v.$invalid){ 
        // if (this.editedIndex > -1) {
        //   Object.assign(this.TblData[this.editedIndex], this.editedItem)
        // } else {
        //   this.TblData.push(this.editedItem)
        // }
        // this.close()
        //        }
        //        else
        //        {
        //            console.log("Valid Form Status")
        //        }
      },

        close () {
            this.dialog = false
            this.dialogBulkUpld = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                
                this.editedIndex = -1
            }, 300)
        },
        cancelStepper(){
            this.steps=1
            this.dialog = false
            this.dialogBulkUpld = false
            
        },

        editItem (item) {
            // this.btnname='Update';
        this.editedIndex = this.TblData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      resetPass(dat,ind){
           this.reset = true
           console.log("Data to be reseted is",dat.primary_email)
           this.getEmailData(dat.primary_email)
      },
      closeResetDialog(){
         this.reset = false
      },
getEmailData(em){
    this.userEmail = em
},
      resetData(){
          var me = this
 console.log("Email in  POST method",this.userEmail)

            // axios.post(this. API_Service_admin() +'reset_user_pass',{
            //     email :this.userEmail

            // }).then(
            //    res => {
              this.POST('reset_user_pass',{ email :this.userEmail} , (res , error) => {                        
                   console.log("POST RESPONSE",res)
                   if(res.data.errCode == -1)
                   {
                       me.showSnackbar({text:'Password successfully reset',color:'green'})
                   }
      })
      
    },
}
    // fileUpld(caseId){
    //     switch (caseId) {
    //         case 1:
    //            this.showFileName =true;
    //             break;
    
    //     }
    // },
  
}
</script>
<style>
  .fileContainer-bulk {
    overflow: hidden;
    position: relative;
}

.fileContainer-bulk [type=file] {
    cursor: inherit;
    display: block;
    font-size: 999px;
    filter: alpha(opacity=0);
    /* min-height: 100%;
    min-width: 100%; */
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
}

/* Example stylistic flourishes */
.fileContainer-bulk:hover{
    background-color:rgb(82, 196, 190);
}
.fileContainer-bulk {
    margin-left: 30px;
    
    background-color:#1FB3AB ;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        /* height: 10px; */
}

.fileContainer-bulk [type=file] {
    cursor: pointer;
}
.documt-box-pading-bulk {
        padding: 10px;
        flex:1;
    }
    .mt-4-bulk{
    margin-top:4px;
    padding: 5px
}
.documt-normal-text-size-bulk {
        color: white;
        margin-left: 5px
    }
</style>
