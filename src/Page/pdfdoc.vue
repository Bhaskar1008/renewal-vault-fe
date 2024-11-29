<template>
    
    <div>
       <!--" -->
    <pdfpage
       v-for="page in pages"
      v-bind="{page, scale}"
      :key="page.Pagenumber"
    />

    </div>


</template>


<script>

 import pdflib from 'pdfjs-dist';

 import range from 'lodash/range';

 import pdfpage from './pdfpage'

export default {
    props: ['finalsrc', 'scale'],

       components: {
        pdfpage
  },

    data(){
        return {
            pdf: undefined,
            pages:[],
        };
    },
    created(){

        console.log("URL from props is->", this.finalsrc);
        this.fetchPDF();
  },

  watch: {
    pdf(pdf) {

      this.pages = [];
            
      const promises = range(1, pdf.numPages).map(number => pdf.getPage(number));
      // console.log("we're in watcher...", pdf);
        //we can't control pages from here, as the object is not iterable
      Promise.all(promises).then(pages => (this.pages = pages));

      console.log("PAGES ARE =>", this.pages);  
    },
  },

  methods: {
    fetchPDF() {
      console.log('pdflib', pdflib);
    //console.log('GET DOC',);
      pdflib.getDocument(this.finalsrc).promise.then(pdfdoc_ =>{ 
            
        this.pdf = pdfdoc_;

        console.log('GET DOC', this.pdf);
       
      } )
      

    },
  },
    }

</script>

<style>



</style>
