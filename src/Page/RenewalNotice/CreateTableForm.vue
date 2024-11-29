<template>
  <section>
    <div class="form-title">Create Table</div>
    <table style="width: 100%">
      <thead>
        <tr>
          <th class="text-left">Create Table</th>
          <th class="text-left">List of all Tables</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in formInputs" :key="item.text">
          <td>{{ item.text }}</td>
          <td>
            <!-- :items="filterByOpn" -->
            <v-select
              v-if="item.type === 'select'"
              style="width: 100%; height: 50px"
              solo
              label="Select"
              v-model="obj[item.opt]"
              :items="select"
              :item-text="item.opt"
              :item-value="item.opt"
              return-object
            ></v-select>
            <v-text-field
              v-else
              style="width: 100%; height: 50px"
              class="rounded-0"
              solo
              label="Enter..."
              id="remark"
              maxlength="15"
            >
            </v-text-field>
          </td>
        </tr>
      </tbody>
    </table>
    <v-card-actions style="margin-top: 10px">
      <v-list-item class="grow">
        <v-row style="display: flex; justify-content: right">
          <v-btn outlined small color="error" @click="onClickButton">
            <v-icon left> mdi-close-box-outline </v-icon>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn small tile dark color="cyan">
            <v-icon left> mdi-arrow-right-circle </v-icon>
            Submit
          </v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </section>
</template>
  
  <script>
export default {
  name: "CreateTableForm",
  data() {
    return {
      formInputs: [
        {
          text: "Line of Business",
          sortable: false,
          value: "lob",
          type: "select",
          opt: "lob",
        },

        {
          text: "Table Name",
          sortable: false,
          value: "JOB_ID",
          type: "select",
          opt: "tableName",
        },
        {
          text: "Column Name",
          sortable: false,
          value: "LOB_NAME",
          type: "select",
          opt: "columnName",
        },
        {
          text: "Data Type",
          value: "Policy Exp. From",
          sortable: false,
          type: "select",
        },
        {
          text: "Primary Key",
          value: "Policy Exp. To",
          sortable: false,
          type: "select",
        },
        {
          text: "Secondary Key",
          sortable: false,
          value: "JOB_START_DATE",
          type: "select",
        },
        { text: "Read Capacity", value: "REMARKS", sortable: false },
        { text: "Write Capacity", value: "STATUS", sortable: false },
        { text: "Index Details", value: "ERROR_COUNT", sortable: false },
      ],
      obj: {
        lob: "",
        tableName: "",
        columnName: "",
      },

      select: [
        {
          lob: "RV",
          tableName: "Table1",
          columnName: "Column1",
        },
        {
          lob: "RV",
          tableName: "Table1",
          columnName: "Column2",
        },

        {
          lob: "RV",
          tableName: "Table2",
          columnName: "tab2Column1",
        },

        {
          lob: "RV",
          tableName: "Table2",
          columnName: "tab2Column2",
        },

        {
          lob: "RV",
          tableName: "Table3",
          columnName: "tab1Column1",
        },
        {
          lob: "CV",
          tableName: "CVTable1",
          columnName: "Column1",
        },
        {
          lob: "CV",
          tableName: "CVTable1",
          columnName: "Column2",
        },

        {
          lob: "CV",
          tableName: "CVTable2",
          columnName: "tab2Column1",
        },

        {
          lob: "CV",
          tableName: "CVTable2",
          columnName: "tab2Column2",
        },

        {
          lob: "CV",
          tableName: "CVTable3",
          columnName: "tab3Column1",
        },
      ],
    };
  },
  methods: {
    onClickButton(event) {
      this.$emit("clicked", "all");
    },
  },
  watch: {
    obj: {
      handler(newValue) {
        if (newValue.lob.lob) {
          console.log(
            newValue.lob.lob,
            newValue.tableName.tableName,
            newValue.columnName.columnName
          );

          this.select = this.select.filter((e) => e.lob === newValue.lob.lob);
        }

        if (newValue.lob.lob && newValue.tableName.tableName) {
          console.log(
            newValue.lob.lob,
            newValue.tableName.tableName,
            newValue.columnName.columnName
          );

          this.select = this.select.filter(
            (e) => e.tableName === newValue.tableName.tableName
          );
        }
      },
      deep: true,
    },
  },
};
</script>
  
  <style scoped>
.form-title {
  font-weight: bold;
  color: #1e83c2;
  font-size: 16px !important;
  margin-bottom: 10px;
}

thead {
  background-color: #01afcb;
  color: white;
}
th,
td {
  padding: 8px 20px;
}
tbody > tr {
  background-color: #eff3f4;
}
</style>