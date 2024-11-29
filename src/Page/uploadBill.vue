<template>
<v-app>
        <!-- <v-content> -->
			<v-container fluid grid-list-md>
                <v-flex text-xs-center xs4 offset-xs4>
                    <v-card>
                        <v-card-text class="headline font-weight-bold">OCR Demo</v-card-text>
                    </v-card>
                </v-flex>
                <v-layout row wrap mt-3>
                <v-flex @click='pickFile' >
                   <v-btn>upload bill</v-btn>
                    <v-text class="mt-2 ml-3 body-1 font-weight-medium font-italic grey--text" color=" blue-grey lighten-5" v-model='imageName'>{{imageName}}</v-text>
                    <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                </v-flex>
               
                </v-layout>
                <v-layout row wrap justify-center>
                <v-flex  xs12 sm6 md5>
                    <v-card >
                         <img :src="imageUrl"  v-if="imageUrl" class="wdth-img"/>
                        <!-- <v-img :src="imageUrl" v-if="imageUrl" aspect-ratio="2.75"></v-img> -->
                    </v-card>
                </v-flex>
                   
                <v-flex xs12 sm6 md5>                
                    <v-card v-if="showText === true">
                      <div class="v-markup">
                          <pre>
                              <!-- <code> -->
                                <v-card-text >{{resUploadbill}}</v-card-text>
                            <!-- </code> -->
                            </pre>
                        </div>
                    </v-card>
                </v-flex>  

                </v-layout>
				<!-- <v-dialog v-model="dialog" max-width="290">
					<v-card>
						<v-card-title class="headline">Hello World!</v-card-title>
						<v-card-text>Image Upload Script in VUE JS
							<hr>Yubaraj Shrestha
							<br>http://yubarajshrestha.com.np/</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog> -->
			</v-container>
		<!-- </v-content> -->
    </v-app>


   
</template>

<script>
import axios from 'axios' 

export default {

    data(){
        return{
          title: "Image Upload",
        dialog: false,
		imageName: '',
		imageUrl: '',
        imageFile: '',
        showText:false,
        billFilename:'',
        // responses:[],    
        resUploadbill:[],
        }
    },

    created(){
        this.$store.commit('SET_PAGE_TITLE','OCR');
       this.resUploadbill = this.$store.state.billDetails
       console.log('RESPONSE UPLOAD BILL',this.resUploadbill)
         
    },
     methods: {
        pickFile () {
            this.$refs.image.click ()

            
        },
		
		onFilePicked (e) {

            const files = e.target.files
            console.log('UPLOAD FILEEEE RES',files)
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
                    this.imageUrl = fr.result
                    // this.billFilename = files.FileList.name
                    this.imageFile = files[0] // this is an image file that can be sent to server...
                    this.showText = true;


                     console.log('IMAGE FILE',this.imageFile)
                      // console.log(this.billFilename , 'this.billFilename')
                    //   axios.post('http://159.89.161.64:3015/uploadBill', {
                    //          image:this.imageUrl

                    //     }).then(
                    //     res => {
                    this.POST('uploadBill',{image:this.imageUrl} , (res , error) => {            
                           
                                console.log(res.data)
                                this.upldbillRes = res.data
                                console.log('Rsponse from Server',this.upldbillRes)
                                
                                this.$store.commit('SET_Bill_DETAILS',this.upldbillRes);    
                               this.resUploadbill = res.data
                            //  this.billFilename = files[1].name
                            

                        });

             
				})
			} else {
				this.imageName = ''
                this.imageFile = ''
				this.imageUrl = ''
			}
		}
    }

   

}
</script>

<style>
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
