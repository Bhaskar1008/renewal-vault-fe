<template>
    <v-app>
      <v-card class="ma-5">
        <v-flex class="ma-5">
          <v-text
            class="body-4"
            style="
              color: #646666;
              font-size: 18px;
              font-weight: 600;
              margin-left: 409px;
              color: #1e83c2;
            "
            >Upload/Create Table or JSON - Response Mapping</v-text
          >
          <v-text style="color: crimson; margin-left: 390px; font-weight: 500"
            >Choose atleast one or all three options to proceed with JSON
            mapping</v-text
          >
        </v-flex>
  
        <v-layout class="ma-5">
          <v-flex>
            <v-text style="margin-left: 22px; font-weight: 500; color: #0073bb"
              >Upload Table</v-text
            >
            <!-- <v-layout style="height: 100%"> -->
            <div class="uploadDiv" style="display: block">
              <input
                type="file"
                id="myfile"
                name="myfile"
                ref="myfile"
                @change="onExcelFilePicked"
              />
              <label for="myfile" id="labelForUpload1">
                <v-icon style="color: #2e8b57">mdi-upload </v-icon>
                {{
                  selectedFileName1
                    ? selectedFileName1
                    : "Drop files to Upload or"
                }}
                &nbsp;
                <u style="margin-right: 2px; color: blue">
                  {{ selectedFileName1 ? "" : "Browse" }}
                </u>
              </label>
            </div>
          </v-flex>
  
          <v-flex>
            <v-text style="margin-left: 22px; font-weight: 500; color: #0073bb"
              >Create New Table</v-text
            >
  
            <!-- <v-layout style="height: 100%"> -->
            <div class="uploadDiv" style="display: block">
              <input
                type="file"
                id="myfile1"
                name="myfile1"
                ref="imageUploader2"
              />
              <label for="myfile1" id="labelForUpload2">
                <v-icon style="color: #2e8b57">mdi-pencil-box</v-icon>
  
                {{
                  selectedFileName2 ? selectedFileName2 : "Click to Create Table"
                }}
                &nbsp;
                <u style="margin-right: 2px; color: blue">
                  {{ selectedFileName2 ? "" : "Browse" }}
                </u>
              </label>
            </div>
          </v-flex>
  
          <v-flex>
            <v-text style="margin-left: 22px; font-weight: 500; color: #0073bb"
              >Upload JSON - Response Mapping</v-text
            >
            <!-- <v-layout style="height: 100%"> -->
            <div class="uploadDiv" style="display: block">
              <input
                type="file"
                id="myfile2"
                name="myfile2[]"
                ref="myfile2"
                @change="onJsonFilePicked"
                multiple
                accept=".json"
              />
              <label for="myfile2" id="labelForUpload3">
                <v-icon style="color: #2e8b57">mdi-upload </v-icon>
  
                {{
                  selectedFileName3
                    ? selectedFileName3
                    : "Drop files to Upload or"
                }}
                &nbsp;
                <u style="margin-right: 2px; color: blue">
                  {{ selectedFileName3 ? "" : "Browse" }}
                </u>
              </label>
            </div>
            <div v-if="files">
              <table>
                <tr>
                  <th>JSON</th>
                  <th>Action</th>
                </tr>
                <tr v-for="(file, index) in files" v-bind:key="index">
                  <td>{{ files[index].name }}</td>
                  <td>
                    <button @click="removeFile(index)">
                      <v-icon style="color: crimson">mdi-delete</v-icon>
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-app>
  </template>
    <script>

  export default {
    data() {
      return {
        selectedFileName1: null,
        selectedFileName2: null,
        selectedFileName3: null,
        selectFileData: {},
        selectFileData3: {},
        uploadedFiles: "",
        files: [],
        headers: [
          { text: "JSON", sortable: false, value: "file" },
          { text: "Action", sortable: false, value: "action" },
        ],
      };
    },
    methods: {
      onExcelFilePicked(event) {
        let self = this;
        let file = event.target.files[0];
        self.selectFileData = event.target.files;
        self.selectedFileName1 = file.name ? file.name : null;
        console.log(self.selectFileData, "file");
        if (
          self.selectFileData[0].type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          event.target.files[0].type == "text"
        ) {
          if (Object.keys(self.selectFileData).length !== 0) {
            self.showToast("File Added Successfully", self.TOST().SUCCESS);
            console.log(self.selectFileData[0].name, "file data");
          }
        } else {
          self.showToast("Excel file allowed", self.TOST().WARNING);
        }
      },
      onJsonFilePicked(event) {
        var files = event.target.files;
        if (!files.length) return;
        this.createFile(files);
        if (
          self.selectFileData[0].type == "application/json" ||
          event.target.files.type == "json"
        ) {
          if (Object.keys(self.selectFileData).length !== 0) {
            self.showToast("File Added Successfully", self.TOST().SUCCESS);
            console.log(self.selectFileData[0].name, "file data");
          }
        } else {
          self.showToast("Only JSON file allowed", self.TOST().WARNING);
        }
        console.log(event.target.files[0].name, "event.dataTransfer.files");
      },
      createFile(files) {
        var self = this;
        // self.files=event.target.files
        // console.log(files,"files")
        for (var index = 0; index < files.length; index++) {
          const fileURL = event.target.files[index];
          self.files.push(fileURL);
          console.log(self.files[index].name, "files name");
        }
      },
      removeFile(index) {
        this.files.splice(index, 1);
      },
    },
  };
  </script>
    <style scoped>
  .uploadDiv {
    margin: 0 auto;
    margin-top: 30px;
    height: 120px;
    width: 335px;
    background-color: white;
    outline: 1px dashed rgb(161, 156, 156);
    box-sizing: border-box;
  }
  #labelForUpload1 {
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 51px 0px 0px 0px;
    font-size: 15px;
    color: #07458e;
  }
  #labelForUpload2 {
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 51px 0px 0px 0px;
    font-size: 15px;
    color: #07458e;
  }
  #labelForUpload3 {
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 51px 0px 0px 0px;
    font-size: 15px;
    color: #07458e;
  }
  input[type="file"] {
    display: none;
  }
  th {
    border: 1px solid #dddddd;
    background-color: #07458e;
    text-align: left;
    padding: 6px;
    color: white;
  }
  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 6px;
  }
  table {
    border-collapse: collapse;
    width: 88%;
    margin-top: 10px;
    margin-left: 24px;
  }
  </style>