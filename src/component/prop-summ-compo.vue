<template>
<v-app>
<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
      <div slot="header" class="body-2">Premium Reciept</div>
      <div slot="header" class="caption" Style="padding-left: 233px;">
        <v-icon color="green">check_circle</v-icon>Verified: Yes</div>
      <div slot="header" class="caption">Status: Complete</div>
      
      <div class="wdth-cmp" style="">
          <v-data-table
            :headers="headers"
            :items="TblData"
            hide-actions
            class="elevation-1">
              <template slot="items" slot-scope="props">
                <td style="padding-left:40px;">{{ props.item.SrNo }}</td>
                <td class="text-xs-left" style="padding: 0px;padding-left: 24px;">{{ props.item.Type }}</td>
                <td class="text-xs-left">{{ props.item.Nature}}</td>
                <td class="text-xs-left">{{ props.item.Amount}}</td>
                <td class="text-xs-left">{{ props.item.Reciepting}}</td>
                <td class="text-xs-left">{{ props.item.TokenNo}}</td>
                <td class="text-xs-left">{{ props.item.BankCode}}</td>
                <td class="justify-center layout px-0">

                  <v-btn icon class="mx-0" @click.native="editItem(props.item)">
                    <v-icon color="grey">settings</v-icon>
                  </v-btn>
                
                  <v-dialog v-model="dialog" max-width="500">
                      <v-card>
                          <v-layout style="background-color:#3a3a3a">
                              <v-card-title class="subheading" style="color:white" >Manual Update-Premium Reciept</v-card-title>
                              <v-card-title class="subheading" style="color:white" >PID81452</v-card-title>
                              <v-card-title class="subheading large-text" style="color:white" >Rahul Venkatraman</v-card-title>
                          </v-layout>
                    
                          <v-card-text>
                            <v-container grid-list-md>
                              <v-layout wrap>
                                <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItem.Type" label="Type"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItem.Nature" label="Nature"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItem.Amount" label="Amount"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItem.TokenNo" label="Token No."></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItem.BankCode" label="Bank Code"></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="secondary" flat="flat" @click.native=" close(comment1)">Cancel</v-btn>
                              <v-btn color="secondary" @click.native="submit">Submit</v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-dialog>
                </td>
                
              </template>
              <template slot="footer">
                <td colspan="60%">
                <v-subheader style="width:50%;font-size:12px;" ><v-checkbox
                color="green"
                style="padding-top:23px;"
                  v-model="checkbox"
                    required
                  ></v-checkbox >I confirm I have verified all the details of Personal Details Form</v-subheader>
                
                </td>
              </template>
          
          </v-data-table>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<!-- ===============================Proposal Form================================ -->
 <template>
   <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Proposal Form</div>
      <div slot="header" class="caption" Style="padding-left: 251px;">
        <v-icon color="green">check_circle</v-icon>Verified: Yes</div>
      <div slot="header" class="caption">Status: Complete</div>
        
      <div>
        <!-- <img src="src/assets/propForm.png"  width="90%"/> -->
<!-- h99 -->
  <div class="divforbtn">          
    <a :href="finalsrcis" download>
        <v-btn color="primary" class="placeit" round medium > <v-icon class="pr-1">get_app
</v-icon> Download</v-btn>
    </a>
  </div>
        <!-- Here we have the pdf viewer component to render pdf page pv -->
        <pv  ></pv>
        <div style="padding-left: 35px;">
            <v-subheader style="width:46%;font-size:12px;" ><v-checkbox
            style="padding-top:8px;"
            color="green"
              v-model="checkbox1"
                required
              ></v-checkbox >I confirm I have verified all the details of Personal Details Form</v-subheader> 
        </div>
          
    </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
   </template>

   <!-- ===============================Documents Uploaded================================ -->
 <template>
   <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Documents Uploaded</div>
      <div slot="header" class="caption" Style="padding-left: 225px;">
        <v-icon color="yellow">hourglass_empty</v-icon>Verified: No</div>
      <div slot="header" class="caption" Style="padding-left: 18px;">Status: Requirement</div>
      <div style="wdth-cmp">
          <!-- <v-container > -->
            <doc-upload-compo></doc-upload-compo>
          <!-- </v-container> -->
    </div>
       <div style="padding-left: 35px;">
        <v-subheader style="width:56%;font-size:12px;" ><v-checkbox
        style="padding-top:8px;"
        color="green"
          v-model="checkbox2"
            required
          ></v-checkbox >I confirm I have verified all the details of Personal Details Form</v-subheader>
        </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
   </template>

  <!-- ===============================Underwriting Related================================ -->
<template>
   <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Underwriting Related</div>
      <div slot="header" class="caption" Style="padding-left: 213px;">
        <v-icon color="green">check_circle</v-icon>Verified: Yes</div>
      <div slot="header" class="caption">Status: Complete</div>
      
      <div class="wdth-cmp" style="">
        <app-prop-table></app-prop-table>
        
    </div>
     <div style="padding-left: 35px;">
        <v-subheader style="width:56%;font-size:12px;" ><v-checkbox
        style="padding-top:8px;"
        color="green"
          v-model="checkbox3"
            required
          ></v-checkbox >I confirm I have verified all the details of Personal Details Form</v-subheader>
         
        </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>


 <!-- ===============================CFR Details================================ -->
 <template>
   <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">CFR Details</div>
     <div slot="header" class="caption" Style="padding-left:263px;">
      <v-icon color="yellow">hourglass_empty</v-icon>Open: {{cfr_count}}</div>
      <div slot="header" class="caption" Style="padding-left:17px;">Status: Pending</div>
      
      <div class="wdth-cmp" style="">
          
         <cfr-dtls-compo></cfr-dtls-compo>
         
      </div>
     <div style="padding-left: 35px;">
        <v-subheader style="width:56%;font-size:12px;" ><v-checkbox
        style="padding-top:8px;"
        color="green"
          v-model="checkbox2"
            required
          ></v-checkbox >I confirm I have verified all the details of Personal Details Form</v-subheader>
         
        </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
   </template>

   <!-- ===============================MEDICAL CFR================================ -->
 <!-- <template>
   <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Medical CFR</div>
      <div slot="header" class="caption" Style="padding-left:236px;">
        <v-icon color="yellow">hourglass_empty</v-icon>Approved: No</div>
      <div slot="header" class="caption" Style="padding-left:5px;">Status:Pending</div>
      
      <div class="wdth-cmp">
        <cfr-dtls-compo></cfr-dtls-compo>
    </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
   </template> -->

   <!-- ===============================Dispatch Details================================ -->
 <template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
      <div slot="header" class="body-2">Dispatch Details</div>
      <div slot="header" class="caption" Style="padding-left:236px;">
      <v-icon color="yellow">hourglass_empty</v-icon>Approved: No</div>
      <div slot="header" class="caption" Style="padding-left:5px;">Status:Pending</div>
      
      <div style="width: 650px; overflow: auto">
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
   </template>

</v-app>
</template>
<script>

import appPropTable from '../component/prop-summ-table.vue'
import docUploadCompo from '../component/doc-upld-compo'
import cfrDtlsCompo from '../component/cfr-dtls-compo'
import store from '../store/index'

import pv from '../Page/pdfview.vue';

export default {
    components: {
      pv,
      appPropTable,
      docUploadCompo,
      cfrDtlsCompo
    },
    props:{
      proposalData: Object
    },
    data(){
        return{
            baseurl: this.node_img_url(),
            resultis:null,
            finalsrcis:"",
            TblData:[],
            cfr_count:'',
            dialog:false,
            checkbox: false,
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
           

            headers: [
        {
          text: 'Sr.No',
          align: 'left',
        //   sortable: false,
          value: 'SrNo'
        },
        { text: 'Type', value: 'Type' },
        { text: 'Payment Mode', value: 'Nature' },
        { text: 'Amount', value: 'Amount' },
        { text: 'Reciepting', value: 'Reciepting' },
        { text: 'Token No.', value: 'TokenNo' },
        { text: 'Bank Code', value: 'BankCode' },
        { text: 'Actions', value: 'name', sortable: false }
      ],

      editedIndex: -1,
      editedItem: {
         Type: '',
       Nature:'',
       Amount:'',
       TokenNo:'',
       BankCode:'',
       
      },
      defaultItem: {
        Type: '',
       Nature:'',
       Amount:'',
       TokenNo:'',
       BankCode:'',

      }
        }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
      console.log('PROP CREATED ', this.proposalData.BI_pdf_file);
      this.cfr_count = this.proposalData.cfrdetails.length

    // The Line Below will commit/set the new proposal's BI-PDF file src(source) in store for the PDF-Viewer to access and render it
      this.$store.commit("SET_PDF_FILE_SRC", this.proposalData.BI_pdf_file);
      console.log('PROP from store ', this.$store.state.BI_pdf_file); 
      
      this.resultis = this.baseurl.concat("pdf/");
      this.finalsrcis =  this.resultis.concat(this.$store.state.BI_pdf_file);

      // console.log('STORE CREATED',store.state.documentUpload)
    },
    mounted() {
      // console.log('PROP MOUNTED ',this.proposalData)
      // console.log('STORE Mounted',store.state.documentUpload)
      // this.$emit('docDataUpload' ,store.state.documentUpload)
    },
    methods:{

        initialize() {
          let reciptData = this.$store.getters.getProposalDetails;
          console.log("Recipt data",reciptData);
          let _obj = {
              SrNo: 1,
              Type: reciptData.benefitIllustration.PremiumType || '-',
              Nature: reciptData.benefitIllustration.PremiumMode || '-',
              Amount: reciptData.benefitIllustration.annualisedPremium || '-',
              Reciepting: 'Done',
              TokenNo:'-',
              BankCode:'-'
          }
          this.TblData.push(_obj);
          this.$emit('premiumReciept' ,this.TblData)

        },
        openDialogBox(ind){
        console.log(ind)
        this.dialog = true

        },
         close(item) {
        this.active = true
        this.dialog = false
       },

        editItem (item) {
        this.editedIndex = this.TblData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      submit() {
      if (this.editedIndex > -1) {
        Object.assign(this.TblData[this.editedIndex], this.editedItem)
      } else {
        this.TblData.push(this.editedItem)
      }
      this.close()
    },

    }
}
</script>
<style>
/* .wdth-cmp{
  width:970px;
  overflow: auto
} */
  .divforbtn{
   display: flex;
   flex:1;
   justify-content: flex-end;
  }


  .placeit{
    text-decoration: none;
    margin-bottom: -120px;
    display: flex;
  }
    .placeit:hover{
      text-decoration: none;
    margin-bottom: -120px;
    display: flex;
    letter-spacing: 0.5px;
  }

.pop-field {
		width: 32%;
		padding-top: 10px;
		}
    .lblColr{
		color:#BDBDBD;
	}
    .crd-compo-width{
        width: 100%;
    }


		@media screen and (min-width: 320px) {

 

}

@media screen and (min-width: 768px) {
 /* .wdth-cmp{
  width:790px;
  overflow: auto
} */
  
}
@media screen and (min-width: 992px) {

  
}
   
</style>
