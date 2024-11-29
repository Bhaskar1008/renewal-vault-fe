<template>
    <v-app>
        <!-- <v-content> -->
            <v-card>
                 <v-layout row  justify-space-between class="bgclrsrc pl-3 pr-5 pt-3">
                            <v-flex>
                                <v-btn round depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addChannel()">
                                    add Documents
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn>
                                </v-flex>
                            <v-flex xs10 sm6 md4 class="">
                                <v-text-field 
                                @input="Searchdatatable"
                                v-model="value"
                                label="Search" 
                                append-icon="search"
                                height="30px"></v-text-field>                            
                            </v-flex>
                    </v-layout> 
            <v-layout row wrap >
                <v-flex class="  mt-3 " style="flex-flow:column wrap">
                    <!-- <v-text class=" headline font-weight-bold">Documents Master</v-text>
                    -->
                    <v-layout class="bgclrsrc">
                       
                    </v-layout>
                        
                    <v-layout row justify-center>
                        
                    <v-flex justify-center md11 ml-3 mt-3 >
                        <h3 class="text-xs-center mb-3">Documents Details</h3>
                        <v-data-table
                        :headers="headers"
                        :items="Documentsresponse"
                        hide-actions
                        class="elevation-1">
                        <template slot="items" slot-scope="props">
                            
                            <td class="">{{props.item._id | filterid('C')}}</td>
                            <td class="">{{props.item.documentType}}</td>
                            <td class="">{{props.item.documentCode}}</td>
                            <!-- <td class="">{{props.item.DocumentsStatus}}</td> -->
                            <td class=""> <span class="status" :style="{color: props.item.DocumentsStatus == 'Active' ? '#13961c' : '#d61111'}" >{{props.item.DocumentsStatus == undefined ? "-" : props.item.DocumentsStatus }} </span></td>
                            <td class="">{{props.item.createdBy.first_name +' '+ props.item.createdBy.last_name}}</td>
                           <td class="">{{props.item.createdDate | formate-date}}</td>
                           <td class="">{{props.item.updatedBy.first_name +' '+ props.item.updatedBy.last_name}}</td>
                           <!-- <td class="">{{props.item.updatedDate | formate-date}}</td> -->


                            <td class="">
                                <v-icon small class="mr-2" @click="editItem(props.item,props.index)">edit</v-icon>
                                <!-- <v-icon small @click="deleteItem(props.item,props.index)">delete</v-icon> -->
                            </td>
                        </template>
                        </v-data-table>
                    </v-flex>
                             
                </v-layout>

                    <v-dialog v-model="dialog" persistent max-width="800px">

                     <v-card>
                        <v-flex style="background-color:#3a3a3a">
                            <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                        </v-flex>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field :counter="maxlen" @change="doc_validate(editedItem.DocumentsType, 5, 'DocumentsType')" @input="documentvalidation(editedItem.DocumentsType )"  :rules="doctype" :maxlength="maxlen" v-model="editedItem.DocumentsType" label="Documents Type"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field :counter="maxl" :maxlength="maxl"  @change="doc_validate(editedItem.DocumentsCode, 5, 'DocumentsCode')" @input="documentcode(editedItem.DocumentsCode )" :rules="doccode" v-model="editedItem.DocumentsCode" label="Documents Code"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select  v-model="editedItem.DocumentsStatus" :items="chnlstatus" item-text="text" label="Status" ></v-select>                                
                            </v-flex>
                            
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                            <v-icon right dark>highlight_off</v-icon>
                        </v-btn>
                        <v-btn  :disabled="disdocadd"  depressed large color="secondary" @click.native="saveAndEdit(btnname)">{{btnname}}
                            <v-icon dark right>check_circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                    </v-dialog> 

                </v-flex>    
            </v-layout> 
            <div class="text-xs-center pagination">
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination>
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

    validations:{
        editedItem:{
            DocumentsType:{
                required,
                minLength:minLength(2),
            }
        }


    },

    created(){
            this.Getchannel(0);
            let agetdetails = {}
              this.$store.commit('SET_PAGE_TITLE','Documents Master');
            // agetdetails = this.getAgentInfo()
            // console.log("agentID Check",agetdetails)
            // this.UserID
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
            maxlen:50,
            maxl:20,
            doctype:[],
            doccode:[],
            disdocadd:false,
            dialog: false,
            btnname:'',
            pagination: {},
            pageLength:0,
            value:'',
            Documentsresponse:[],
            chanelResponse:[],
            // chnelstatus:[],
            editChanel:{},
            editaffiliateDocuments:{},
            TableIndex:'',
            headers:[
                        {text: 'Documents ID', value: 'DocumentsID'},
                        {text: 'Documents Type', value: 'DocumentsName'},
                        {text: 'Documents Code', value: 'DocumentsCode'},
                        {text: 'Documents Status', value: 'DocumentsStatus'},
                        {text: 'Created By', value:'CreatedBy'},
                        {text: 'Created Date', value: 'CreatedDate'},
                        {text: 'Updated By', value: 'UpdatedBy'},
                        // {text: 'Updated Date', value: 'UpdatedDate'},
                        {text: 'Action', value: 'action', sortable: false}
                ],
            UserID:'',
            tableData: [],
                editedIndex: -1,
               editedItem: {
                DocumentsType:'',
                DocumentsCode:'',
                DocumentsID:'',
                DocumentsStatus:'',
               
            },
            defaultItem: {
                DocumentsName:'',
                DocumentsID:'',
                DocumentsStatus:'',
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
        
       
    	//  var self=this;
        // return this.Documentsresponse.filter(function(cust){return cust.documentType.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        // || cust.documentCode.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        // || cust.DocumentsStatus.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        // || cust.createdBy.first_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        // // || cust.updatedBy.last_name.toLowerCase().indexOf(self.value.toLowerCase()) >=0
        // // || self.filteridf(cust._id).toLowerCase().indexOf(self.value.toLowerCase()) >=0 
        
        //  });
       //return this.customers;
    },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Update'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Document' : 'Edit Document'
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
       },
       filterid(id) {
           try {
               if (id == null || id == undefined || id == "") { return id; }
               return 'C' + id.slice(16, 25).toUpperCase();
           } catch (err) { return id; }
       },
       
   },

  


    methods:{
        documentvalidation(value){
            try{
                let nameRegex =/^[A-Za-z0-9& ]+$/;
                this.doctype = []
                value === '' ? this.doctype.push('This is field required') : ''
                value.match(nameRegex) ? this.doctype.push() : this.doctype.push('Only alphabets and numbers are allowed')
            }catch(err){
                console.log(err)
            }
        },

        documentcode(value){
            try{
                let nameRegex =/^[A-Za-z0-9 ]+$/;
                this.doccode = []
                value === '' ? this.doccode.push('This is field required') : ''
                value.match(nameRegex) ? this.doccode.push() : this.doccode.push('Only alphabets and numbers are allowed')
            }catch(err){
                console.log(err)
            }
        },
        doc_validate(data, type, field){

             var self = this                
             this.validate_alpha_numeric(data, type, (res, datanew)=>{
            if(res == true){ 
                self.editedItem[field] = datanew
                self.$forceUpdate();
                return
            }
        })

        },


        // The next function will switch to the next page after obtaining the correct skip 
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

        
        //This function is used for Serach the Affiliate With ID.
         filteridf(id) {
           try {
               if (id == null || id == undefined || id == "") { return id; }
               return 'C' + id.slice(16, 25).toUpperCase();
           } catch (err) { return id; }
       },
        
        Searchdatatable (e) {

            // console.log("value====>>>",e)
                this.value = e;
                // console.log("value is",this.value);
            },
            Getchannel(skip){
                let self = this;
                 this.GET('fetch_document_type?filter=0'+'&skip='+skip , function (res , error){
                      //    console.log('GET CHANEL DATA',res.data.errMsg);
                    // this.chanelResponse = res.data.errMsg
                    // console.log('CHANEL REPONSE',this.chanelResponse)
                    if(error){
                        console.log("CHECK ERROR",error);
                        return;
                    }

                    console.log('GET Documents DATA', res.data.errMsg[0] );
                // For finding Pagination skip based on the count
                    var pageLen = res.data.errMsg[1]
                    let totalCount = pageLen[0].totalCount
                    console.log('Page Length:',totalCount)
                    self.pageLength = Math.ceil(totalCount/self.skipdiffrence)

                    res.data.errMsg[0].forEach( element => {
                        element.DocumentsStatus = '';
                    });

                    self.Documentsresponse = res.data.errMsg[0]
                    console.log('Documents REPONSE',self.Documentsresponse)
                    
                    for( var i=0; i < self.Documentsresponse.length; i++){
                        // console.log('active==>',self.branchResponse[i].active)
                        // let branchDetails =[]
                       
                        if(self.Documentsresponse[i].status === 1){
                        //    <td class="">{{props.item.updatedBy.first_name +' '+ props.item.updatedBy.last_name}}</td>
                        //    <td class="">{{props.item.updatedDate | formate-date}}</td>

                            if(self.Documentsresponse[i].hasOwnProperty('updatedBy')){
                                console.log("IF Part")
                               self.Documentsresponse[i].updatedBy.first_name = self.Documentsresponse[i].updatedBy.first_name
                               self.Documentsresponse[i].updatedBy.last_name  = self.Documentsresponse[i].updatedBy.last_name
                               self.Documentsresponse[i].updatedDate = self.Documentsresponse[i].updatedDate 
                            }else{
                                console.log("Else")
                            let updatedBy = {
                                updatedBy: {
                                    first_name:" - ",
                                    last_name:""
                                }
                            }
                            let temp = Object.assign(updatedBy, self.Documentsresponse[i]);

                            self.Documentsresponse[i] = temp;
                            }

                            // console.log('active==>',self.branchResponse[i].active)
                            self.Documentsresponse[i].DocumentsStatus = 'Active'
                           
                        }else if(self.Documentsresponse[i].status === 0){
                            self.Documentsresponse[i].DocumentsStatus = 'InActive'
                           
                        }
                    }
                 })
             
            },
        //  selectchStatus(){
        //     this.chnlstatusIndex = this.chnlstatus.indexOf(this.editedItem.channelStatus)
        //     console.log('select==>',this.chnlstatusIndex)
            
        // },

    

        saveAndEdit(_btnname){
            if(this.doctype.length === 0 && this.doccode.length === 0){
                if(_btnname == 'Add' )
                {
                    this.save();
                } 
                else if(_btnname == 'Update'){
                        this.editChanl();
                }
            }
            },

        addChannel(){
            this.disdocadd=false
            this.btnname = 'Add';
            this.editedItem.DocumentsName = '';
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
            this.disdocadd=false
            this.editedIndex = 1;
             console.log("Data is",item)
             
            this.TableIndex = i
            // _index = i;
            this.btnname = 'Update' 
               
            this.dialog = true
            var itemsdocument = item;
            console.log("new item is",itemsdocument)
            this.editedItem.DocumentsType = itemsdocument.documentType;
            this.editedItem.DocumentsCode = itemsdocument.documentCode;
            this.editedItem.DocumentsID = itemsdocument._id;
            this.editedItem.DocumentsStatus = itemsdocument.status === 1 ? this.chnlstatus[1] : this.chnlstatus[0];

            //     DocumentsType:'',
            //     DocumentsCode:'',
            //     DocumentsID:'',
            //     DocumentsStatus:'',
        },

        editChanl(item){
            // console.log('Updated Data 1 ->',     this.editedItem.DocumentsType)
            // console.log('Updated Data 2->',     this.editedItem.DocumentsCode)
            // console.log("item is =>", item);
            let status = null;
            if(this.editedItem.DocumentsStatus === 'Active'){
                status = 1
            }else if(this.editedItem.DocumentsStatus === 'InActive'){
                status = 0
            }
             this.PUT('update_document_type',
             {             
                documentType: this.editedItem.DocumentsType,
				documentCode: this.editedItem.DocumentsCode,
				status: status,
                userId:this.getAgentInfo()._id,
                id: this.editedItem.DocumentsID, 
                    // affiliateName: this.editedItem.DocumentsType,
                    // id:this.editedItem.DocumentsID, 
                    // status: status,                   
                    // userId: this.getAgentInfo()._id

             } , (res , error)=>{
                   console.log("RES is=>", res.data)

                    
                     if(res.data.errCode === -1){
                   console.log('PUT DATABASE RESPONSE',res.data.errMsg);

                 
                    this.editaffiliateDocuments = res.data.errMsg

                //    console.log("Response is from server ",res.data.errMsg);
                 
                var len = res.data.errMsg.length
                console.log("After EDIT",len)
                this.$store.commit('SET_AFFILIATE_DETAILS',this.editaffiliateDocuments);
                //   this.showSnackbar({text: 'Updated Sucessfully',color:'green'})  
                this.showToast('AFFILIATE Updated Successfully','success')
                this.Getchannel(); 
                this.dialog = false
                }else{
                this.showToast('Something went wrong','error')
                }
             })
            
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
        setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            
            this.editedIndex = -1
        }, 300)
        },


        save(){

            if(/^\s+$/g.test(this.editedItem.DocumentsType)){
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                  this.disdocadd=false;
                return
            }else if(this.$v.$invalid == true){
                this.showToast('Please fill all empty fields', this.TOST().WARNING);
                  this.disdocadd=false
                return
            }else{
                this.disdocadd=true
                console.log("regular flow->");
                // return
                let self = this;
                // Post API hit
                // console.log('CHANEL NAME',this.editedItem.channelName),
                console.log('Active InActive ::: ',this.editedItem.DocumentsStatus);
                let code = null;
                if(this.editedItem.DocumentsStatus === "InActive") {
                    code = 0;
                } else if(this.editedItem.DocumentsStatus === "Active") {
                    code = 1;
                }


                let sendData = {
                    documentType: self.editedItem.DocumentsType,
                    documentCode: self.editedItem.DocumentsCode,
                    status: code,
                    userId: this.getAgentInfo()._id ,
                }

                // DocumentsType:'',
                // DocumentsCode:'',
                // DocumentsID:'',
                // DocumentsStatus:'',

                console.log('POP sending data: ', sendData);
               
              this.POST('create_document_type',sendData , (res , error) =>{
                    //    console.log('POST CHANEL DATA',res.data.errMsg);
                        if(res.data.errCode === -1){
                            self.editaffiliateDocuments = res.data.errMsg;
                            console.log('Response Data',self.editaffiliateDocuments)
                            self.$store.commit('SET_AFFILIATE_DETAILS',self.editaffiliateDocuments);
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
              })
                // this.close()



            }


             

                
                },

                // updateChnl(){
                //     let self = this;
                //     self.chanelResponse = self.$store.state.chanelDetails;
                //     console.log('CHNEL RESPONSE',self.chanelResponse)
                // },
     
    }
}
</script>
<style>
    .bgclrsrc{
    background-color: #fafafa;
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

    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
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
