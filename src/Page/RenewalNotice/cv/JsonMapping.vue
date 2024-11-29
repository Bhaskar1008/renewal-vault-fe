<template>
  <v-app>
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: #1e83c2"
        >Create New JSON Mapping</v-text
      >
    </div>
    <v-card class="ma-3">
      <h1>Upload JSON file*</h1>
      <input
        type="file"
        ref="imageUploader"
        @click="resetImageUploader"
        @change="handleFileUpload"
        accept=".json"
      />
      <v-btn @click="onClick()" class="ma-2" color="#E46A25" dark small>
        <v-icon small dark left class="mr-2">mdi-checkbox-marked-circle</v-icon>
        <v-divider vertical class="mr-2"></v-divider>
        Submit
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="jsonData"
        hide-actions
        class="elevation-1 pa-4"
      >
        <template slot="items" slot-scope="props">
          <td
            v-for="item of headers"
            :key="item.text"
            class="text-xs-justify pr-2"
            style="background-color: #eff3f4"
          >
            <div
              v-if="item.value === 'dataType'"
              style="margin: 10px; padding: 10px"
            >
              <v-select
                v-model="props.item[item.value]"
                :items="dataType"
                menu-props="auto"
                single-line
                @change="handleDatatypes(props.item[item.value])"
              ></v-select>
            </div>
            <div
              v-if="item.value === 'sampleValue'"
              style="margin: 10px; padding: 50"
            >
              <!-- <v-text-field
              class="rounded-0"
              v-model="props.item[item.value]"
              label="Enter..."
              solo
              v-if="
                props.item.dataType == 'Number' ||
                props.item.dataType == 'String'
              "
            >
            </v-text-field> -->

              <vue-json-editor
                v-model="props.item[item.value]"
                :show-btns="false"
                :expandedOnStart="false"
                :modes="modes"
                mode="text"
              ></vue-json-editor>
            </div>
            <div v-else-if="item.value === 'defaultValue'">
              <!-- <v-text-field
              class="rounded-0"
              v-model="props.item[item.value]"
              label="Enter..."
              solo
              v-if="
                props.item.dataType == 'Number' ||
                props.item.dataType == 'String'
              "
            >
            </v-text-field> -->
              <vue-json-editor
                v-model="props.item[item.value]"
                :show-btns="false"
                :expandedOnStart="false"
                :modes="modes"
                mode="text"
              ></vue-json-editor>
            </div>

            <div v-else>
              {{ props.item[item.value] }}
            </div>
            <div v-if="item.value === 'mappingMethod'" style="width: 150px">
              <v-select
                solo
                label="select"
                v-model="mappingMethod"
                :items="methodItems"
                single-line
                @change="handleMethods()"
              ></v-select>
            </div>
            <div
              v-if="item.value === 'responseParam'"
              style="display: flex; flex-direction: row"
            >
              <div v-if="mappingMethod == 'Table'">
                <p>Table Name</p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="tableName"
                  label="Enter..."
                  id="remark"
                  maxlength="15"
                  autocomplete="off"
                >
                </v-text-field>
              </div>
              <div v-if="mappingMethod == 'Table'" style="margin-left: 10px">
                <p>Column Name</p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="columnName"
                  label="Enter..."
                  id="remark"
                  maxlength="15"
                  autocomplete="off"
                >
                </v-text-field>
              </div>
              <div v-if="mappingMethod == 'JSON'">
                <p>JSON Name</p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="jsonName"
                  label="Enter..."
                  id="remark"
                  maxlength="15"
                  autocomplete="off"
                >
                </v-text-field>
              </div>
              <div v-if="mappingMethod == 'Conditional'">
                <p>Conditional</p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="conditional"
                  :maxlength="500"
                  label="Enter..."
                  id="remark"
                  autocomplete="off"
                >
                </v-text-field>
              </div>
            </div>
          </td>
          <!-- <td>
            
          </td> -->
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify";
import vueJsonEditor from "vue-json-editor";
Vue.use(Vuetify);

export default {
  data() {
    return {
      jsonData: [],
      modes: ["code", "text"],
      dataType: ["Object", "String", "Number", "Boolean", "Symbol", "Array"],
      headers: [
        { text: "KEY", value: "key", sortable: false },
        { text: "DATATYPE", value: "dataType", sortable: false },
        { text: "SAMPLE VALUE", value: "sampleValue", sortable: false },
        { text: "DEFAULT VALUE", value: "defaultValue", sortable: false },
        { text: "Mapping Method", value: "mappingMethod", sortable: false },
        {
          text: "Response Parameter",
          value: "responseParam",
          sortable: false,
        },
      ],
      responseParam: "",
      mappingMethod: "",
      methodItems: ["Table", "JSON", "Conditional"],
      tableName: "",
      columnName: "",
      jsonName: "",
      conditional: "",
      max: 36,
      text: "",
    };
  },
  components: {
    vueJsonEditor,
  },
  methods: {
    onClick() {
      console.log(this.jsonData, "jsonData");
    },
    rowClick(item, row) {
      console.log('row clicked')
    },
    resetImageUploader() {
      this.$refs.imageUploader.value = "";
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      //   console.log(reader);
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          let objToArr = Object.entries(data);
          const newData = objToArr.map((res, index) => ({
            key: res[0],
            dataType: this.handlerConc(res[1]).type,
            sampleValue: res[1],
            defaultValue: this.handlerConc(res[1]).val,
          }));
          this.jsonData = newData;
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsText(file);
    },
    handlerConc(val) {
      let a = { type: "String", val: "" };
      if (val instanceof Array) {
        a = { type: "Array", val: [] };
      } else if (val instanceof Object) {
        a = { type: "Object", val: {} };
      } else if (val instanceof String) {
        a = { type: "String", val: "" };
      } else if (typeof val == "number") {
        a = { type: "Number", val: 0 };
      } else if (val instanceof Boolean) {
        a = { type: "Boolean", val: false };
      }
      return a;
    },
    handleMethods() {
      console.log(this.mappingMethod, "mapping method");
    },
  },
};
</script>

<style>
</style>