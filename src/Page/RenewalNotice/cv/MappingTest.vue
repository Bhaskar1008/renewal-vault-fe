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
      <div style="display: flex">
        <v-data-table
          :headers="headers"
          :items="jsonData"
          hide-actions
          class="elevation-1 pa-4"
          :expand="expand"
          item-key="key"
          style="margin-right: 9px"
        >
          <template slot="items" slot-scope="props">
            <td @click="props.expanded = !props.expanded">
              {{ props.item.key }}
            </td>
            <td>
              <v-select
                style="margin: 10px; padding: 10px"
                v-model="props.item.dataType"
                :items="dataType"
                menu-props="auto"
                single-line
                @change="handleDatatypes(props.item[item.value])"
              ></v-select>
            </td>
            <td>
              <vue-json-editor
                v-model="props.item.sampleValue"
                :show-btns="false"
                :expandedOnStart="false"
                :modes="modes"
                mode="text"
              ></vue-json-editor>
            </td>
            <td>{{ props.item.defaultValue }}</td>
            <td>
              <div style="margin-top: 2px">
                <p>Mapping Name</p>
                <v-select
                  solo
                  label="select"
                  v-model="mappingMethod"
                  :items="methodItems"
                  single-line
                  @change="handleMethods()"
                ></v-select>
              </div>
            </td>
            <td>
              <!-- <template slot="items" slot-scope="props"> -->
              <div style="display: flex; flex-direction: row">
                <div v-if="mappingMethod == 'Table'">
                  <p>Table Name</p>
                  <v-select
                    class="rounded-0"
                    solo
                    v-model="tableName"
                    label="Enter"
                    id="remark"
                    maxlength="15"
                    autocomplete="off"
                  >
                  </v-select>
                </div>
                <div v-if="mappingMethod == 'Table'" style="margin-left: 10px">
                  <p>Column Name</p>
                  <v-select
                    class="rounded-0"
                    solo
                    v-model="columnName"
                    label="Enter"
                    id="remark"
                    maxlength="15"
                    autocomplete="off"
                  >
                  </v-select>
                </div>
                <div v-if="mappingMethod == 'JSON'">
                  <p>JSON Name</p>
                  <v-select
                    class="rounded-0"
                    solo
                    v-model="jsonName"
                    label="Enter"
                    id="remark"
                    maxlength="15"
                    autocomplete="off"
                    @click="drawer.show = true"
                  >
                  </v-select>
                </div>
                <div v-if="mappingMethod == 'Conditional'">
                  <p>Conditional</p>
                  <v-text-field
                    class="rounded-0"
                    solo
                    v-model="conditional"
                    :maxlength="500"
                    label="Enter"
                    id="remark"
                    autocomplete="off"
                  >
                  </v-text-field>
                </div>
              </div>

              <!-- </template> -->
            </td>
          </template>

          <template v-slot:expand="props">
            <v-card
              flat
              v-if="
                props.item.dataType == 'Array' ||
                props.item.dataType == 'Object'
              "
            >
              <table>
                <thead>
                  <th>Key</th>
                  <th>DataType</th>
                  <th>Value</th>
                </thead>
                <tbody>
                  <tr v-for="(value, key) in props.item.sampleValue" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ typeof value }}</td>
                    <td>{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </v-card>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <v-layout wrap>
      <v-navigation-drawer
        class="drawerNavigation"
        v-model="drawer.show"
        right
        fixed
        temporary
        style="width: 570px"
        :width="570"
      >
        <div
          style="
            padding: 10px;
            width: 100%;
            background-color: #0073bb;
            color: white;
          "
        >
          JSON
          <v-icon
            @click="drawer.show = false"
            style="float: right; color: white"
            >mdi-close</v-icon
          >
        </div>
        <template>
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchDialog"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                style="width: 230px; float: right"
              ></v-text-field>
            </v-card-title>
            <!-- <v-data-table
              :headers="drawer ? headersJson : ''"
              :items="Object.entries(jsonData)"
              :search="searchDialog"
              hide-actions
            > -->
            <table>
              <th>Parameters</th>
              <td>
                <template>
                  <tree-view
                    :options="{ modifiable: true }"
                    @change-data="onChangeData"
                    :data="jsonData"
                  >
                  </tree-view>
                </template>
              </td>
            </table>
          </v-card>
          <v-layout
            class="pa-2"
            style="
               position: relative;
              left: 13px;
              display: flex;
              justify-content: end;
            "
          >
            <v-btn
              flat
              id="clearBtn"
              class="ma-2 pa-3 clear-btn-model"
              color="#646666"
              @click="search = null"
              dark
              small
            >
              <v-divider vertical class="mr-2"></v-divider>Clear
            </v-btn>
            <v-btn
              flat
              class="ma-2 pa-3 update-btn-model"
              color="#0073BB"
              dark
              small
              @click="drawer.show = false"
              >Submit
            </v-btn>
          </v-layout>
        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-app>
</template>

<script>
import Vue from "vue";
// import Vuetify from "vuetify";
import vueJsonEditor from "vue-json-editor";
import TreeView from "vue-json-tree-view";
Vue.use(TreeView);
// Vue.use(Vuetify);

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
        {
          text: "Response Parameter",
          value: "responseParam",
          sortable: false,
        },
      ],
      headerForJson: [],
      searchDialog: "",
      headersForExpand: [
        { text: "KEY", value: "key", sortable: false },
        { text: "DATATYPE", value: "dataType", sortable: false },
        { text: "SAMPLE VALUE", value: "sampleValue", sortable: false },
      ],
      headersJson: [
        { text: "Parameters", sortable: false, value: "parameter" },
      ],
      drawer: { show: false, isEditable: false },
      showModifyResponseData: [],
      expand: false,
      responseParam: "",
      mappingMethod: "",
      methodItems: ["Table", "JSON", "Conditional"],
      tableName: "",
      columnName: "",
      jsonName: "",
      conditional: "",
      max: 36,
      text: "",
      expanded: [],
      expandRow: false,
      singleExpand: true,
      nestedTable: false,
      activeItems: [],
      openItems: [],
    };
  },
  components: {
    vueJsonEditor,
  },
  methods: {
    toggle(item) {
      console.log(item, "item ID", this.openItems.indexOf(item.index));
      const index = this.openItems.indexOf(item.index);
      if (index > -1) {
        this.openItems.splice(index, 1);
        console.log(this.openItems, "this.openItems if");
      } else {
        this.openItems.push(item);
        console.log(this.openItems, "this.openItems else");
      }
    },
    onClick() {
      console.log(this.jsonData, "jsonData");
    },
    onChangeData: function (data) {
      console.log(JSON.stringify(data));
    },
    resetImageUploader() {
      this.$refs.imageUploader.value = "";
    },
    expandRow(item, index) {
      this.expanded = [];
      this.expandRow = true;
      this.expandRow = item === this.expandRow[index] ? [] : [item];
      console.log(this.expanded, this.expandRow, "expand row click");
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
            index: index,
          }));
          this.jsonData = newData;
          // this.jsonData[sampleValue] = newData;

          console.log(newData,"newData")
          for (let i = 0; i < newData.length; i++) {
            Object.keys(newData[i]).forEach((key)=>{
              console.log("keys",key)
            })            
          }

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
.clear-btn-model {
  width: 100px;
  height: 35px;
  background-color: #ffffff;
  color: #646666 !important;
  border: 1.5px solid #ccc;
  border-radius: 3px;
  text-transform: capitalize;
}
.update-btn-model {
  width: auto;
  height: 35px;
  background-color: #0073bb;
  color: #ffffff !important;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  text-transform: capitalize;
}
.v-card__title {
  width: 230px;
  float: right;
}
.v-treeview-node__prepend-icon {
  cursor: pointer;
}
</style>