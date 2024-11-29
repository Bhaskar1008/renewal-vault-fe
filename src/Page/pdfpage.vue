
<template>
    
<div>

    <!-- <v-layout>
        <v-flex>
          <v-text-field
                label="Enter value here"
                v-model="checkit"
                v-checkblank="checkit"
          ></v-text-field>
        </v-flex>
        <v-flex>
             <p>{{checkit}}</p>
        </v-flex>
    </v-layout> -->

    <canvas ref="canvas" id='newcanvas' ></canvas>

</div>


</template>

<script>

export default {

    data() {
        return {
            checkit:"",
            viewport:null,
            renderTask:null, 
             canvas: null,
             context: null,
             pageIsRendering : true,
        }
    },

    props: ['page', 'scale'],

    mounted() {
    // this.drawPage();

      console.log('THIS>PAGE>>>', this.page);
      //  this.viewport = this.page.getViewport(this.scale);
        var scale = this.scale;

        console.log('SCALE is--->', this.scale);

    // to set rendering to true within the canvas;
    this.pageIsRendering= true;

       console.log('VIEWPORT FROM MOUNTED->', this.viewport);
       var vm = this
          vm.canvas = vm.$refs.canvas;

             const viewport = this.page.getViewport({ scale });
                vm.canvas.height = viewport.height;
                vm.canvas.width = viewport.width;


          console.log('CANVASSSS->', vm.canvas);
         var canvasContext = vm.canvas.getContext("2d");
          console.log('Context->',canvasContext);
        // console.log('CONTEXT FROM MOUNTED->',   newviewport);
      //   console.log('PAGE ISS +++++>>>', this.page);
      const renderCtx = { canvasContext, viewport }
        console.log('RENDER Ctx', renderCtx)
       this.page.render(renderCtx).promise.then(() => {
          this.pageIsRendering = false;
      
       })
      
        
  },
    // render(h) {
    //     const { attrs :canvasAttrs} = this;
    //     console.log('FROM RENDER->')
    //     return h('canvas', {attrs});

    //     // return <canvas id="canvas"></canvas>
    // },

    created() {
         console.log('THIS>PAGE>>>', this.page);
        // console.log('PAGEEEEE WITHIN RENDER method->', page);
        // // PDFPageProxy#getViewport
        // // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
        // this.viewport = this.page.getViewport(this.scale);
        // console.log('PDF PAGE created', this.viewport);
       
      //  const renderContext = { canvasContext, viewport }


  },

  //  computed: {
  //       canvasAttrs() {
  //       let {width, height} = this.viewport;
  //       [width, height] = [width, height].map(dim => Math.ceil(dim));

  //       const style = this.canvasStyle();
  //       console.log('within canvasAttrs');
  //       return {
  //           width,
  //           height,
  //           style,
  //           class: 'pdf-page',
  //       };
  //     }, 

  //   canvasStyle() {
  //     const {width: actualSizeWidth, height: actualSizeHeight} = this.actualSizeViewport;
  //     const pixelRatio = window.devicePixelRatio || 1;
  //     const [pixelWidth, pixelHeight] = [actualSizeWidth, actualSizeHeight]
  //       .map(dim => Math.ceil(dim / pixelRatio));
  //     return `width: ${pixelWidth}px; height: ${pixelHeight}px;`
  //   },

  //   actualSizeViewport() {
  //     return this.viewport.clone({scale: this.scale});
  //   },   
  //  },

  //  methods: {
  //        drawPage() {
  //     if (this.renderTask) return;

  //     const {viewport} = this;
  //     const canvasContext = this.$el.getContext('2d');
  //     const renderContext = {canvasContext, viewport};

  //     // PDFPageProxy#render
  //     // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
  //     this.renderTask = this.page.render(renderContext);
  //     this.renderTask.
  //       then(() => this.$emit('rendered', this.page));
  //       console.log('PAGE is->', this.page);
  //   },
  //  },
  



}
</script>

<style>

.pdf-page {
    border:1px red solid;
  display: block;
  margin: 0 auto;
}


</style>
