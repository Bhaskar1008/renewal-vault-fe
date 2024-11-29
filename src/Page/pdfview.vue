<template>
<div>
        <div class="masteronewrap">
            <!-- Make here final src instead of url for a port+ pdf+ src_pdf_file .pdf -->
            <pdfdoc v-bind="{finalsrc, scale}" />
        </div>
</div>
</template>

<script>

import pdfdoc from './pdfdoc'

import _ from 'lodash';

export default {

  components: {
        pdfdoc
  },
    created() {
         this.res =  this.url.concat('pdf/');
         console.log("result CREATED url",this.res.concat(this.$store.state.BI_pdf_file));
         this.finalsrc =  this.res.concat(this.$store.state.BI_pdf_file);
         console.log("From Created->", this.finalsrc);
        //  console.log("URL is =>", this.url)
    },
    updated() {

        // this.res =  this.url.concat('pdf/')
        // console.log("result UPDATED url",this.res.concat(this.$store.state.BI_pdf_file));
        // this.finalsrc = this.res.concat(this.$store.state.BI_pdf_file)
        // console.log("From Updated" );
    },

    data() {
        return {
        
        
        // url:"https://salesdrive.iorta.in/wp-content/uploads/2019/07/Download-File-2.pdf",
        // url:"https://salesdrive.iorta.in/wp-content/uploads/2019/07/Download-File-1.pdf",
        // url: "https://salesdrive.iorta.in/wp-content/uploads/2019/07/0ef23e3ed13b6a9554e86a66a11158341fd8acab-merged-1.pdf", // my sample PDF
        // url: 'http://www.pdf995.com/samples/pdf.pdf', // my sample PDF
        // url: 'https://salesdrive.iorta.in/wp-content/uploads/2019/07/12345.pdf', // my sample PDF
        // url: "http://159.89.161.64:3020/pdf/0ef23e3ed13b6a9554e86a66a11158341fd8acab.pdf",
        // url:"https://download-file-2019.s3.ap-south-1.amazonaws.com/0ef23e3ed13b6a9554e86a66a11158341fd8acab.pdf",
        // url:"https://salesdrive.iorta.in/wp-content/uploads/2019/07/Download-File-1.pdf",
        // url:"https://salesdrive.iorta.in/wp-content/uploads/2019/07/3ed6777fdbb6c88027aae16929dddddc2aac4ff2.pdf",
        // url:"http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
        url: this.node_img_url(),
        res:null,
        finalsrc:"",
        scale: 0.9,
        

        }
    },
    methods: {

    },  
    
}
</script>


<style>

.masteronewrap{
    border:2px #01b4bb solid;
}



</style>
