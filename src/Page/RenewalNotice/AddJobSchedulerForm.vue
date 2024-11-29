<template>
  <section>
    <section v-if="show">
      <v-dialog v-model="show" width="500">
        <v-card> model </v-card>
      </v-dialog>
    </section>

    <div class="form-title">ETL Table Config</div>
    <table style="width: 100%">
      <thead>
        <tr>
          <th class="text-left">Column Name</th>
          <th class="text-left">Data Types</th>
          <th class="text-left">Value</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in formInputs" :key="item.text">
          <td>{{ item.text }}</td>
          <td>
            <v-select
              style="width: 100%; height: 50px"
              solo
              label="Select"
              item-text="text"
              item-value="value"
              return-object
            ></v-select>
          </td>
          <td>
            <textarea
              style="
                background-color: white;
                width: 100%;
                padding: 12px;
                border: 0.5px solid #d5d5d5;
                border-radius: 2px;
                line-height: 20px;
                font-size: 15px;
                color: #d5d5d5;
              "
              v-if="item.multi === true"
              name="w3review"
              rows="4"
              placeholder="Enter..."
              class="rounded-0 text-area-outline"
              cols="50"
            >
            </textarea>
            <!-- <v-textarea
                v-if="item.multi === true"
                solo
                name="input-7-4"
                label="Enter..."
              ></v-textarea> -->
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

          <td style="width: fit-content">
            <a
              style="text-decoration: underline; text-transform: uppercase"
              @click="showModel(item.action)"
              >{{ item.action }}</a
            >
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
  name: "AddJobSchedulerForm",
  data() {
    return {
      formInputs: [
        {
          text: "Id",
          sortable: false,
          value: "JOB_ID",
        },
        { text: "Product Id", sortable: false, value: "LOB_NAME" },
        {
          text: "Table Mapping Details",
          value: "Policy Exp. From",
          sortable: false,
          multi: true,
          action: "create array",
        },
        { text: "Insert Column", value: "Policy Exp. To", sortable: false },
        { text: "Update Column", sortable: false, value: "JOB_START_DATE" },
        {
          text: "Insert Filters",
          value: "REMARKS",
          sortable: false,
          multi: true,
          action: "create filter",
        },
        {
          text: "Update Filters",
          value: "STATUS",
          sortable: false,
          multi: true,
        },
        {
          text: "Single Column Primary Key",
          value: "ERROR_COUNT",
          sortable: false,
        },
        {
          text: "Single Column Primary Key Name",
          value: "ERROR_COUNT",
          sortable: false,
        },
        {
          text: "Multiple Column Primary Key Name",
          value: "ERROR_COUNT",
          sortable: false,
        },
        {
          text: "Multiple Column Primary Key Condition",
          value: "ERROR_COUNT",
          sortable: false,
          multi: true,
          action: "create condition",
        },
      ],

      show: false,
      modelShow: "all",
    };
  },
  methods: {
    onClickButton(event) {
      this.$emit("clicked", "all");
    },
    showModel(val) {
      this.show = true;
      this.modelShow = val;
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
.text-area-outline:focus {
  outline: none;
}
</style>