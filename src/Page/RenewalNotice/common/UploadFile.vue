<template>
    <div>
      <input type="file" ref="fileInput" @change="handleFileUpload" :multiple="multiple" :accept="acceptableFileTypes"/>
      <v-btn @click="uploadFile">Upload</v-btn>
      <v-flex xs3 class="mr-3">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Upload *
                </p>

                <!-- {{ file }} -->
                <v-flex
                  class="dm-fileContainer-bulk mt-1 mr-2"
                  style="border: 1px solid #c1c8cc; height: 38px"
                >
                  <label
                    for="myfile"
                    class="caption font-weight-medium"
                    style="margin-left: 5px; cursor: pointer"
                  >
                    {{
                      selectFileData
                        ? selectFileData[0].name
                        : "upload file for bulk movement"
                    }}
                    <img
                      style="cursor: pointer"
                      class="ml-3"
                      src="../../../assets/upload.png"
                  /></label>
                  <!-- <v-file-input
  show-size
  truncate-length="15"
></v-file-input> -->
                  <input
                    hide-details="true"
                    type="file"
                    id="myfile"
                    name="myfile"
                    ref="imageUploader"
                    @click="resetImageUploader"
                    @change="onFilePicked"
                    style="z-index: -1; cursor: pointer"
                    accept="acceptableFileTypes"
                  />
                </v-flex>
              </v-flex>
    </div>
</template>
  
<script>
   import { apiService } from "../common/common";
   export default {
    name: 'UploadFile',
    props: ['uploadURL','multiple','label','fileData','acceptableFileTypes'],
    data() {
        return {
            multiple: "",
        }
    },
    methods: {
      handleFileUpload(event) {
        this.uploadedFiles = event.target.files;
      },
      uploadFile() {
        const files = {...this.uploadedFiles};
        this.uploadedFiles = null;
        if (files.length) {
          const formData = new FormData();
          files.forEach((e,i) => {
            formData.append(`file${i+1}`, e);
          });

          if (this.fileData) {
            for (const key of this.fileData) {
              formData.append(key, this.fileData[key]);
            }
          }
          
          apiService(`/${uploadURL}`, formData)
            .then(response => {
              console.log('File uploaded successfully');
            })
            .catch(error => {
              console.error('Error uploading file:', error);
            });
        } else {
          console.log('No file selected');
        }
      },
    }
  }
</script>

<style scoped>
.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

</style>
  