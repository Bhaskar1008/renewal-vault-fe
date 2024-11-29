<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <!-- Start here -->
      <v-flex xs12 row wrap>
        <v-card>
          <v-layout row wrap>
            <v-flex xs9 mt-3>
              <v-layout row wrap ml-1>  
                <v-flex xs3 text-xs-center>
                  <!-- <v-avatar color="red">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                  </v-avatar> -->
                  <v-text>
                    {{avtarname}}
                  </v-text>
                </v-flex>
                <!-- <v-flex xs2 text-xs-center>
</v-flex> -->
                <v-flex  xs7 text-xs-right ml-6>
                  <div style="margin-right: 55px;">
                    <v-text class="body-1"> Policy Document</v-text>
                  </div>
                  <div>
                   <a :href=download target="_blank" ml-2 depressed color="#FFA200" class="download-btn" style="">Download</a>
                    
                    <v-btn ml-2 depressed color="#FFA200" style="color:white" @click.native="openpopup()">Share
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
                <!-- email POPUP -->
               <v-dialog v-model="dialogCfr" max-width="650">
            <v-card>
                <v-layout style="background-color:#3a3a3a">
                    <v-card-title class="subheading" style="color:white" >Send Email</v-card-title>
                  
                </v-layout>

        <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>   
                <!-- <v-text class="body-1"> TO</v-text>          -->
                <v-flex xs12 sm12 md12>
                 
                <v-text-field label="To" v-model="toemail"></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                 
                <v-text-field label="Subject" v-model="subject"></v-text-field>
                </v-flex>

                 <v-textarea
                    v-model="mail_body"
                    auto-grow
                    box
                    
                    label="Body"
                    rows="14"
                 ></v-textarea>
              </v-layout>
            </v-container> 
    </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" flat="flat" @click.native="dialogCfr = false">Cancel</v-btn>
                <v-btn color="secondary" >Send</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog> 
              <!-- end -->
              <v-layout row wrap style="padding-left:15px;"> 
                <v-flex  xs4 pa-3  v-for="(dat, li) in infomationData" :key="li">
                  <div>
                    <v-text class="caption">{{dat.label}}
                    </v-text>
                  </div>
                  <v-text class="body-1">{{dat.value}}
                  </v-text>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs3>
              <div id="app">
                <v-container style="max-width: 600px;">
                  <v-timeline dense clipped>
                    <v-timeline-item
                                     class="mb-3"
                                     color="grey"
                                     icon-color="grey lighten-2"
                                     small
                                     >
                      <v-layout wrap>
                        <v-flex xs12>Applied.
                        </v-flex>
                        <v-flex xs12>14/11/18T
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex xs12>15:26 EDT
                        </v-flex>
                      </v-layout>
                    </v-timeline-item>
                    <v-timeline-item
                                     class="mb-3"
                                     color="orange"
                                     icon-color="grey lighten-2"
                                     small
                                     >
                      <v-layout wrap>
                        <v-flex xs12>Verified.
                        </v-flex>
                        <v-flex xs12>16/11/18
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex xs12>15:26 EDT
                        </v-flex>
                      </v-layout>
                    </v-timeline-item>
                    <v-timeline-item
                                     class="mb-3"
                                     color="#01B4BB"
                                     icon-color="grey lighten-2"
                                     small
                                     >
                      <v-layout wrap>
                        <v-flex xs12>Issued.
                        </v-flex>
                        <v-flex xs12>19/11/18
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex xs12>15:26 EDT
                        </v-flex>
                      </v-layout>
                    </v-timeline-item>
                  </v-timeline>
                </v-container>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <!-- End here -->
    </v-layout>
  </v-container>
</template>
<script>
  // import dataList from '../common/dataList.js'
  export default {
    created() {
      
        this.denguestorevalue = this.$store.getters.getDengue
        this.avtarname=this.$store.getters.getDengue[0].firstName
        this.toemail=this.denguestorevalue[0].email
        this.pdf= this.denguestorevalue[0].pdf_file
        this.download = this.node_img_url()+'/pdf/'+this.pdf
        this.subject='Rest easy! You’re insured - Dengue care'
        console.log('avtarname',this.avtarname);
    
        console.log('dengue store value',this.denguestorevalue);
    
        for(let i = 0; i < this.infomationData.length; i++){
          this.infomationData[i].value = this.infomationData[i].label == 'Name of Life Insured' ?this.checkValidy(this.denguestorevalue[0].NameofLife_Insured) :
          this.infomationData[i].value = this.infomationData[i].label == 'plan Name' ? "Dengue Care" : 
          this.infomationData[i].value = this.infomationData[i].label == 'premium Amount' ? this.checkValidy(this.denguestorevalue[0].premiumAmt) : 
          this.infomationData[i].value = this.infomationData[i].label == 'first Name' ? this.checkValidy(this.denguestorevalue[0].firstName) :
          this.infomationData[i].value = this.infomationData[i].label == 'Last Name' ?this.checkValidy(this.denguestorevalue[0].lastName) : 
          this.infomationData[i].value = this.infomationData[i].label == 'Date Of Birth' ?new Date(parseInt(this.checkValidy(this.denguestorevalue[0].DOB))).toLocaleDateString() : 
          this.infomationData[i].value = this.infomationData[i].label == 'Add on Covers' ? this.checkValidy(this.denguestorevalue[0].Addon_Covers) :
          this.infomationData[i].value = this.infomationData[i].label == 'Email ID' ? this.checkValidy(this.denguestorevalue[0].email) : 
          this.infomationData[i].value = this.infomationData[i].label == 'Policy issued' ? new Date(parseInt(this.checkValidy(this.denguestorevalue[0].created_date))).toLocaleDateString(): 
          this.infomationData[i].value = this.infomationData[i].label == 'DST' ? "25%":
          this.infomationData[i].value = this.infomationData[i].label == 'LGT' ? "15%" : 
          this.infomationData[i].value = this.infomationData[i].label == 'VAT' ? "25%" : ""

          this.mail_body='Dear '+ this.avtarname+',\n\nThank you for entrusting us to insure your well being. We hope to create a long-lasting association with you.\n\n We are sharing the policy document for your newly applied Dengue care plan, with this mail. \n\nFor any queries related to the working of this policy, its benefits, or for any claims, please call us on the following contact numbers. We will be happy to help you.\n\nCall us on:     7150 5433\nEmail us on:     PLI_OpsClaim@BDO-insure.com\n\nLooking forward to keep you happy and sound.\n\nBest Regards\n\nTeam BDO Insure'











       
          }
    }
    ,
    methods: {

        checkValidy(data) {
                if (data == "" || data == undefined || data == null || data == '' || data == 'null') {
                    return "-"
                } else {
                    return data;
                }
            },

       openpopup(){
        this.dialogCfr=true
      }
    }
    ,
    computed: {
    }
    ,
    data: () => ({
      mail_body:'',
      download:'',
      pdf:'',
      subject:'',
      toemail:'',
      carDialogDoc:false,
      dialogCfr:false,
      avtarname:'',
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
      ,
      imgSlideIndex : 0,
      denguestorevalue:[],
      events: [],
      input: null,
      nonce: 0,
      
      header:[{
        Cityofregistration:"City of registration",
        Carmake:'Car make :',
      }
             ],
      infomationData:[
        {
          label:'Name of Life Insured',
          value:'Shoaib'
        }
        ,
        {
          label:'plan Name',
          value:'XYZ'
        }
        ,
        {
          label:'premium Amount',
          value:'2000'
        }
        ,
        {
          label:'first Name',
          value:'Shoaib'
        }
        ,
        {
          label:'Last Name',
          value:'khan'
        }
        ,
        {
          label:'Date Of Birth',
          value:'19/03/1996'
        }
        ,
        {
          label:'Add on Covers',
          value:'YES'
        }
        ,
        {
          label:'Email ID',
          value:'khan@gmail.com'
        }
        ,
        {
          label:'Policy issued',
          value:'29/11/2018'
        },

        {
          label:'DST',
          value:'shoaib'
        }
        ,
        {
          label:'LGT',
          value:'khan'
        },

          {
          label:'VAT',
          value:'12%'
        }
        
      ],
    //   items: dataList.Details
    }
                )
  }
</script>
<style>

.download-btn{
    background-color: rgba(0, 161, 255, 0.95);
    /* rgba(0, 161, 255, 0.95);  */
    border-color: rgb(255, 162, 0);color: white;
     padding-bottom: 12px;
     padding-left: 15px;
     padding-right: 15px;
     padding-top: 6px;
     text-decoration: none;
  }
  .box-color{
    background-color: #01B4BB
  }
  .font-color{
    color: #ffffff
  }
  .info-cmp-pd{
    padding: 18px;
  }
  .font-decor{
    color:#01B4BB;
    font-size:14px;
    text-decoration:underline;
    cursor: pointer;
  }
</style>
