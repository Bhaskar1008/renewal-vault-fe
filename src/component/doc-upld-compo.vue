<template>
    <!-- <v-app> -->
    <v-card>
      <v-data-table
        :headers="headers1"
        :items="cfrDocData"
        hide-actions
        class="elevation-1">
      <template slot="items" slot-scope="props">
        <td style="padding-left:40px;">{{ props.index + 1}}</td>
        <td class="text-xs-left" style="padding: 0px;padding-left: 24px;">{{props.item.document_sub_type}}</td>
        <td class="text-xs-left" style="padding: 0px;padding-left: 24px;">{{props.item.document_sub_type}}</td>
        <td class="text-xs-left" style="cursor:pointer"><img :src="props.item.Imgdoc" width="90%" @click="openpopup(props)" ></td>
        <td class="text-xs-left" style="padding: 0px;padding-left: 24px;">{{props.item.doc_status}}</td>
        <td class="text-xs-left" style="padding: 0px;padding-left: 24px;">{{props.item.doc_status}}</td>
        <td class="justify-center layout px-0">
          <v-menu transition="scale-transition">
            <v-btn icon class="mx-0" slot="activator" >
              <v-icon color="grey">settings</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile >
                  <v-btn flat color="primary" @click.native="editItem(props.item,props.index)" >Approve</v-btn>
              </v-list-tile>
              <v-list-tile >
                 <v-btn flat color="primary" @click.native="dialogCfr = true" >Reject</v-btn>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </template>
    </v-data-table>

<v-dialog v-model="dialogCfr" max-width="750">
    <v-card>
        <v-layout style="background-color:#3a3a3a">
            <v-card-title class="subheading" style="color:white" >Raise Requirements</v-card-title>
            <!-- <v-card-title class="subheading" style="color:white" >{{propDetails._id | id-filter}}</v-card-title>
            <v-card-title class="subheading" style="color:white" >{{propDetails.benefitIllustration.AdvisorName | to-capitlaize}}</v-card-title> -->
        </v-layout>

        <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md3>
                   <v-select
                    v-model="selectData"
                    :items="items"
                    label="Type of Life"
                    required
                ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md3>
                   <v-select
                    v-model="selectData1"
                    :items="items1"
                    label="Category of Issue"
                    v:on:change="myFunc"
                    
                ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md5>
                   <v-select
                    v-model="issue"
                    :items="issueTypes"
                    label="Type of Issue"
                    required
                ></v-select>
                </v-flex> 
                <v-flex xs12 sm12 md11>
                 
                <v-text-field label="Description" v-model="cfrdata"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container> 
    </v-card-text>
          
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat="flat" @click.native="dialogCfr = false">Cancel</v-btn>
            <v-btn color="secondary"  @click.native="submitupdtswicth(btnname)">Submit</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Image Popup -->
    <v-dialog v-model="imagePOPUP" width="500" style="border-radius:12px;">
      <!-- display:flex; flex-direction:row; -->
      <v-card style="border-radius:12px; background:transparent;">
          <v-layout>
            <v-fab-transition>
              <v-btn fab dark small absolute top right style="margin-top:25px; margin-right:-11px; opacity:0.75; ">
                <v-icon medium @click="closeimg"> clear </v-icon>
              </v-btn>
            </v-fab-transition>
          </v-layout>
          <v-img :src="catchimg" style="width: 100%; border-radius:12px;"></v-img>
      </v-card>
    </v-dialog>
    <!-- end -->

    </v-card>
<!-- </v-app> -->
</template>

<script>
import store from '../store/index'
var imgsrc=''

const i = 0;
export default {
  created() {
    
    let recip = this.$store.getters.getProposalDetails;
    this.reciptData = recip.documentUpload[0]
    // let reciept = this.reciptData[0].CustomerDeclarationCapture[1].document_sub_type
    console.log('Document : ', this.reciptData);
    // this.$emit('docUpload' ,this.reciptData)
    let _docs = {}
    store.state.documentUpload = [];
    for ( var _props in this.reciptData) {
    //   if (_props.includes('Upload') == true) {
          for(let i = 0; i < this.reciptData[_props].length; i++) {
              _docs = this.reciptData[_props][i];
              this.cfrDocData.push(_docs);
              store.state.documentUpload = this.cfrDocData
              _docs = {};
          }

        // if (this.reciptData[_props][i] !== undefined) {
        //     let obj = this.reciptData[_props][i];
        //     this.cfrDocData.push(obj);
        //     console.log('CFR DOC DATA::',this.cfrDocData); 
        // }
          

        // if (typeof(this.reciptData[_props]) == 'object') {
        //   this.cfrDocData.push(this.reciptData[_props]);

        //     //    for (let i = 0; i< this.cfrDocData.length; i++){
        //     //         this.CFRData = this.cfrDocData[i]
        //     //         console.log('Objects DTA : ',this.CFRData);
        //     //     }
        
        // }
    //   }
      console.log('Objects in table : ',this.cfrDocData);
    //   console.log('Objects RECIEPT : ',this.reciptData[_props]);
    }
    


    // const _URL_LOC = "http://159.89.161.64:5020/";
      // imgSRC = this.imageURL()
        //  imgsrc:this.node_img_url(),

    // this.docs.idProof  = this.node_img_url()+reciptData.documentUpload.UploadIDProof.Imgdoc;
    // this.docs.passport = "";
    // this.docs.income = this.node_img_url()+reciptData.documentUpload.UploadIncomeProof.Imgdoc; 
  },
    data(){
        return{
              imgsrc:this.node_img_url(),
              cfrDocData:[],
              CFRData:[],
              dialogCfr:false,
              imagePOPUP: false,
              catchimg:'',
              reciptData:[],
              cfrdata:'',
              arrData:[
                {
                    test:1
                },
                {
                    test:2
                }
              ],
             row:null,
            row1:null,
            row2:null,
            showSelect:false,
            showSelect1:false,
            showSelect2:false,
            select: null,
            select1: null,
            select2: null,
            selectData:'Proposer',
            selectData1:'Document',
                issue:'ID Proof Not provided',
            
            items12: [
              'Item 1',
              'Item 2',
              'Item 3',
              'Item 4'
            ],
             items:[
                    'Life Assured',
                    'Proposer',
                    'Nominee',
                    'Appointee',
                ],
                 items1:[{
                    text: 'Details',
                    value: 'Details'
                 }, {
                    text: 'Document',
                    value: 'Document'
                 }, {
                    text: 'Reciepting',
                    value: 'Reciepting'
                 }],

                 items2:[
                    'DOB Mismatch',
                    'Name Mismatch ',
                    'Gender Incorrect',
                    'Address Mismatch',
                ],
                issueTypes:[
                  'ID Proof Not provided',
            'ID Proof Not Legible',
            'Income Proof Not provided',
            'Income Proof Not Legible',
            'Address Proof Not provided',
            'Address Proof Not Legible',
            'Age Proof Not provided',
            'Age Proof Not Legible',
                        ],
                    
            headers1: [
            {
            text: 'Sr.No',
            align: 'left',
            //   sortable: false,
            value: 'SrNo'
            },
            { text: 'Document type', value: 'Type' },
            { text: 'Document name', value: 'Docname' },
            { text: 'Image', value: 'DocImage' },
            { text: 'Uploaded time', value: 'time' },
            { text: 'ReSubmitted', value: 'resubmitted' },
            { text: 'Actions', value: 'name', sortable: false }
        ],

            docs: {
              idProof: '',
              passport: '',
              income: ''
            }
        }
    },

    methods:{

        openpopup(props){
             this.imagePOPUP=true;
             this.catchimg = props.item.Imgdoc;
            //  console.log("CLICKED!!!",props);
        },

        closeimg(){
            this.imagePOPUP=false;
        },

         selectDrp(id) {
                switch (id) {
                    case 1:
                        this.showSelect = true
                        break;
                    case 2:
                        this.showSelect = false
                        break;
                    case 3:
                        this.showSelect1 = true
                        break;
                    case 4:
                        this.showSelect1 = false
                        break;
                    case 5:
                        this.showSelect2 = true
                        break;
                    case 6:
                        this.showSelect2 = false
                        break;
                }
            },
    }
    
}
</script>

<style>
 .doc-upld-mrgn{
      /* margin-left:60px; */
      margin:18px;
    }
    .doc-img-size{
      width: 200px;
      margin-left: 12px;
    }

    .drp-dwn-slct{
     width: 185px;
    padding-left: 39px;
    margin: -24px;
    }
</style>
