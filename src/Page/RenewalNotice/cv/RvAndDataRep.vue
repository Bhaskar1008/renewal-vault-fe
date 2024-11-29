
<template>
  <v-app style="background-color: #e8eeef">
    <div class="mt-4">
      <v-flex class="d-flex mb-6" color="grey lighten-2" flat tile>
        <v-flex class="d-flex" color="grey lighten-2" flat tile>
          <v-flex class="pa-2" outlined tile style="display: flex">
            <v-text
              class="body-2 font-weight-bold mt-4"
              style="color: #1e83c2; margin-left: 20px"
              >Rv / Data-Rep :
            </v-text>
            <span>
              <p
                class="body-2 font-weight-bold"
                style="color: #e46a25; margin-left: 8px; margin-top: 23px"
              >
                {{
                  defaultFilter.expiryDateFrom
                    ? defaultFilter.expiryDateFrom.split("-")[0] +
                      "-" +
                      monthNames[
                        parseInt(defaultFilter.expiryDateFrom.split("-")[1]) - 1
                      ] +
                      "-" +
                      defaultFilter.expiryDateFrom.split("-")[2]
                    : defaultFilter.expiryDateFrom
                }}
                To
                {{
                  defaultFilter.expiryDateTo
                    ? defaultFilter.expiryDateTo.split("-")[0] +
                      "-" +
                      monthNames[
                        parseInt(defaultFilter.expiryDateTo.split("-")[1]) - 1
                      ] +
                      "-" +
                      defaultFilter.expiryDateTo.split("-")[2]
                    : defaultFilter.expiryDateTo
                }}
              </p>
            </span>
          </v-flex>
        </v-flex>
        <v-flex
          class="pa-2"
          outlined
          tile
          xs3
          style="max-width: 250px; right: 30px"
        >
          <p class="font-weight-bold mb-1 caption" style="color: #646666">
            Select a product *
          </p>
          <v-select
            class="main_dropdown"
            id="lineOfBusiness"
            solo
            hide-details
            label="Select line of business"
            v-model="defaultFilter.lob"
            :items="lobOpt"
            item-text="NUM_IL_PRODUCT_NAME"
            item-value="NUM_IL_PRODUCT_CODE"
            @change="onChangeLob()"
            return-object
          ></v-select>
        </v-flex>

        <v-flex class="pa-2" outlined tile xs3 style="max-width: 232px">
          <p
            class="font-weight-bold mb-1 caption"
            style="color: #646666; margin-left: 15px"
          >
            Select a inserted date *
          </p>
          <v-select
            solo
            hide-details
            :items="dateRangeOpn"
            class="main_dropdown"
            item-text="text"
            item-value="value"
            v-model="selectedDateRangeOpn"
            @input="onDateChangeHandler()"
            label="YYYY/MM/DD"
            style="max-width: 180px; left: 15px"
            return-object
          >
          </v-select>
        </v-flex>
      </v-flex>
      <!--dialog for custom date range-->
      <CustomDateRangePicker
        v-if="showCustomDateRange"
        :open="showCustomDateRange"
        @onClose="onCloseHandler"
        @onCustomDateRangeHandler="onCustomDateRangeHandler"
        :data="defaultFilter"
      />
    </div>
    <v-card class="ma-3">
      <RvAndDataRepFilterForm
        :filterData="filterData"
        @filterHandler="filterHandler"
        @clearHandler="clearHandler"
      />

      <div>
        <v-data-table
          :headers="headers"
          :items="tableData"
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
              <div v-if="item.value === 'TXT_POLICY_NO'">
                <a
                  @click.stop="
                    drawer = !drawer;
                    getPolicyDetailsByPolicyNo(props.item.TXT_POLICY_NO);
                  "
                  >{{ props.item.TXT_POLICY_NO }}</a
                >
              </div>

              <div v-else>
                {{ props.item[item.value] }}
              </div>
            </td>
          </template>
        </v-data-table>

        <v-container fluid class="my-3 paginationStyle">
          <v-layout justify-end>
            <div class="margincls mt-3 mr-3">
              <span>
                Showing <b>{{ pageStartIndex }}</b> -
                <b>{{ pageEndIndex() }}</b></span
              >
              <span>
                out of <b>{{ totalListCount }}</b> records
              </span>
            </div>

            <v-pagination
              class="mr-4 mt-1 navpagenumber"
              v-model="pageNumber"
              color="#152F38"
              :length="getNoOfPages()"
              :total-visible="5"
              @input="nextPage($event)"
            >
            </v-pagination>
          </v-layout>
        </v-container>
      </div>
      <!--SIDE DIALOG  -->
      <v-layout wrap>
        <v-navigation-drawer
          class="drawerNavigation"
          v-model="drawer"
          right
          fixed
          temporary
          style="width: 670px"
          :width="670"
        >
          <div
            id="demoformodify"
            style="
              padding: 10px;
              width: 100%;
              background-color: #0073bb;
              color: white;
            "
          >
            Rv vs Data-Rep data compare
            <v-icon @click="drawer = false" style="float: right; color: white"
              >mdi-close</v-icon
            >
          </div>
          <template>
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headersForCompare"
                :items="policyDetailsUpdate"
                :search="search"
                hide-actions
              >
                <template slot="items" slot-scope="props">
                  <td
                    v-for="item of headersForCompare"
                    :key="item.text"
                    class="text-xs-justify pr-2"
                    style="background-color: #eff3f4"
                  >
                    <div>
                      {{ props.item[item.value] }}
                    </div>
                  </td>
                </template>
              </v-data-table>
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
                class="ma-2 pa-3 view-more-field"
                color="#0073BB"
                dark
                @click="isViewMore ? (isViewMore = false) : (isViewMore = true)"
                small
              >
                {{ isViewMore ? "view less fields" : "view more fields" }}
              </v-btn>
            </v-layout>
          </template>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
    <!--Loader -->
    <Loader :isLoading="isLoading" />
  </v-app>
</template>
<script>
import { rvAndDataRepTableHeader } from "../common/tableHeader";
import RvAndDataRepFilterForm from "../filter/RvAndDataRepFilterForm.vue";

import { monthNames, apiService } from "../common/common";
import moment from "moment";
import Loader from "../common/Loader";
import CustomDateRangePicker from "../common/CustomDateRangePicker.vue";
import { cvApiPath } from "../../../common/API_Config";
export default {
  name: "RvAndDataRep",
  components: {
    RvAndDataRepFilterForm,
    CustomDateRangePicker,
    Loader,
  },
  created() {
    this.onDateChangeHandler();
    this.getUserData();
    this.getLobOptHandler();
  },
  data() {
    return {
      defaultFilter: {
        expiryDateFrom: "",
        expiryDateTo: "",
        lob: "",
      },
      search: "",
      isViewMore: false,
      isLoading: false,
      monthNames: monthNames,
      dateRangeOpn: [
        { text: "Current Month", value: "CM" },
        { text: "Previous 2 Months", value: "N2M" },
        { text: "Previous 3 Months", value: "N3M" },
        { text: "Custom", value: "DR" },
      ],
      headersForCompare: [
        {
          text: "Column-key",
          value: "column_rv",
          sortable: false,
        },
        {
          text: "Data-Rep value",
          value: "data_rep_value",
          sortable: false,
        },
        {
          text: "RV value",
          value: "rv_value",
          sortable: false,
        },
      ],
      lobOpt: [],
      selectedDateRangeOpn: { text: "Previous 3 Months", value: "N3M" },
      showCustomDateRange: false,
      token: {},
      headers: rvAndDataRepTableHeader,
      totalListCount: 10,
      limitValue: 15,
      offset: 0,
      drawer: false,
      tableData: [],
      policyDetails: [],
      policyDetailsUpdate: [],
      pageStartIndex: 1,
      pageNumber: 1,
      dialog1: false,
      expiryPeriodFromMenu: false,
      expiryPeriodToMenu: false,
      expiryDateFrom: "",
      expiryDateTo: "",
      filterData: {
        policyNo: "",
      },
    };
  },
  methods: {
    clearHandler() {
      this.filterData = {
        policyNo: "",
      };
      this.getTableDataHandler(this.filterData.policyNo);
    },
    onCloseHandler() {
      this.showCustomDateRange = false;
    },
    onCustomDateRangeHandler(expiryDateFrom, expiryDateTo) {
      this.defaultFilter.expiryDateFrom = expiryDateFrom;
      this.defaultFilter.expiryDateTo = expiryDateTo;
      this.onCloseHandler();
    },

    filterHandler() {
      this.getTableDataHandler(this.filterData.policyNo);
    },

    pageEndIndex() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return this.pageStartIndex + this.limitValue <= this.totalListCount
          ? this.pageStartIndex + this.limitValue - 1
          : this.totalListCount;
      }
    },
    nextPage(e) {
      let skipData = e - 1;
      if (skipData === 0) {
        this.offset = 0;
        this.pageStartIndex = 1;
      } else {
        this.offset = this.limitValue * skipData;
        this.pageStartIndex = this.limitValue + 1;
      }
      this.getTableDataHandler(this.filterData.policyNo);
    },
    getNoOfPages() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return Math.ceil(this.totalListCount / this.limitValue);
      }
    },
    onDateChangeHandler() {
      let self = this;
      let expiryDateFrom = "";
      let expiryDateTo = "";
      let now = new Date();
      const checkSelectedOpn = self.selectedDateRangeOpn.value;
      let currentFirst = now.setMonth(now.getMonth());
      if (checkSelectedOpn == "N2M") {
        let currentLast = now.setMonth(now.getMonth() - 2);
        expiryDateFrom = moment(new Date(parseInt(currentLast, 10))).format(
          "YYYY-MM-DD"
        );

        expiryDateTo = moment(new Date(parseInt(currentFirst, 10))).format(
          "YYYY-MM-DD"
        );
      } else if (checkSelectedOpn == "N3M") {
        let currentLast = now.setMonth(now.getMonth() - 3);
        expiryDateFrom = moment(new Date(parseInt(currentLast, 10))).format(
          "YYYY-MM-DD"
        );
        expiryDateTo = moment(new Date(parseInt(currentFirst, 10))).format(
          "YYYY-MM-DD"
        );
      } else if (checkSelectedOpn == "DR") {
        expiryDateFrom = self.defaultFilter.expiryDateFrom;
        expiryDateTo = self.defaultFilter.expiryDateTo;
        this.showCustomDateRange = true;
      } else if (checkSelectedOpn == "CM") {
        let y = now.getFullYear();
        let m = now.getMonth();
        let firstDay = new Date(y, m, 1, 0);
        expiryDateFrom = moment(firstDay).format("YYYY-MM-DD");
        let lastDay = new Date(y, m + 1, 0);
        expiryDateTo = moment(lastDay).format("YYYY-MM-DD");
      }

      self.defaultFilter.expiryDateFrom = expiryDateFrom;
      self.defaultFilter.expiryDateTo = expiryDateTo;
    },
    getUserData() {
      let access_list_fr = JSON.parse(localStorage.loginResp);
      this.userData = access_list_fr.data;
    },
    getLobOptHandler() {
      let self = this;
      self.isLoading = true;
      const lobList = this.userData.LOB;
      apiService("get", `/lob-list?productcodes=[${lobList}]`, {})
        .then((res) => {
          const { status, data, msg } = res.data;
          if (status === 200) {
            this.lobOpt = data;
            this.defaultFilter.lob = data[0];
            self.isLoading = false;
          } else {
            this.lobOpt = [];
            self.isLoading = false;
            self.showToast(msg, self.TOST().WARNING);
          }
        })
        .catch((err) => {
          this.lobOpt = [];
          self.isLoading = false;
          self.showToast("Failed to fetch lob list", self.TOST().WARNING);
        });
    },

    getTableDataHandler(policyNo) {
      let self = this;
      self.isLoading = true;

      if(self.defaultFilter.expiryDateFrom && self.defaultFilter.expiryDateTo && self.defaultFilter.lob.NUM_IL_PRODUCT_NAME ){
      let payload = {
        limit: self.limitValue,
        offset: self.offset,
        expiryFrom: self.defaultFilter.expiryDateFrom
          ? self.defaultFilter.expiryDateFrom + " 00:00:00.0"
          : "",
        expiryTo: self.defaultFilter.expiryDateTo
          ? self.defaultFilter.expiryDateTo + " 00:00:00.0"
          : "",
        lob: self.defaultFilter.lob.NUM_IL_PRODUCT_NAME,
      };
      if (policyNo) {
        payload["policyNo"] = policyNo;
      }
      apiService("post", cvApiPath.rvDataPolices, payload)
        .then((res) => {
          
          if (res.status === 200) {
            const {
            result,
            totalCount
          } = res.data;
            self.tableData = result.map((e) => {
              return {
                ...e,
                DAT_RENEWAL_INCEPTION_DATE: moment(
                  e.DAT_RENEWAL_INCEPTION_DATE
                ).format("YYYY-MM-DD"),
                DAT_RENEWAL_EXPIRY_DATE: moment(
                  e.DAT_RENEWAL_EXPIRY_DATE
                ).format("YYYY-MM-DD"),
                DAT_ETL_INSERT_DATETIME: moment(
                  e.DAT_ETL_INSERT_DATETIME
                ).format("YYYY-MM-DD"),
              };
            });
            self.totalListCount = totalCount;
            self.pageStartIndex = self.offset + 1;
            self.isLoading = false;
          } else {
            self.isLoading = false;
            self.showToast(res.data.errMsg, self.TOST().WARNING);
            // }
          }
        })
        .catch((err) => {
          console.log(err,"err")
          self.isLoading = false;
          self.showToast("Failed to fetch policy", self.TOST().WARNING);
        });
      }
    },

    getPolicyDetailsByPolicyNo(policyNo) {
      let self = this;
      self.isLoading = true;
      const payload = {
        POLICY_NO: policyNo,
        STAGE_NAME: self.defaultFilter.lob.NUM_IL_PRODUCT_NAME,
      };
      let rvData = this.fetchPolicyFromRV(payload);
      let dataRepData = this.fetchPolicyFromOracle(payload);

      Promise.all([rvData, dataRepData]).then((values) => {
        const modified = values[1].map((e) => {
          return {
            ...e,
            rv_value: values[0][e.column_rv],
          };
        });
        self.policyDetails = modified;
        self.policyDetailsUpdate = modified.slice(0, 40);
        self.isViewMore = false;
        self.isLoading = false;
      });
    },

    fetchPolicyFromOracle(payload) {
      let self = this;
      return new Promise((resolve, reject) => {
        apiService("post", cvApiPath.oraclePoliciesDetails, payload)
          .then((res) => {
            const { status, msg, data } = res.data;
            if (status === 200) {
              let b = data.response ? data.response : {};
              let array = [];
              for (const [key, value] of Object.entries(b)) {
                array.push({ column_rv: key, data_rep_value: value });
              }
              resolve(array);
            } else {
              self.isLoading = false;
              self.showToast(msg, self.TOST().WARNING);
            }
          })
          .catch((err) => {
            self.isLoading = false;
            self.showToast(
              "Failed to fetch policy from oracle db",
              self.TOST().WARNING
            );
          });
      });
    },
    fetchPolicyFromRV(payload) {
      let self = this;
      return new Promise((resolve, reject) => {
        apiService("post", cvApiPath.policiesDetails, payload)
          .then((res) => {
            const { status, msg, data } = res.data;
            if (status === 200) {
              let b = data.Items.length ? data.Items[0] : [];
              resolve(b);
            } else {
              self.isLoading = false;
              self.showToast(msg, self.TOST().WARNING);
            }
          })
          .catch((err) => {
            self.isLoading = false;
            self.showToast(
              "Failed to fetch policy from rv db",
              self.TOST().WARNING
            );
          });
      });
    },
  },

  watch: {
    defaultFilter: {
      handler(newValue, oldValue) {
        this.getTableDataHandler(this.filterData.policyNo);
      },
      deep: true,
    },
    isViewMore(newValue, oldValue) {
      if (newValue) {
        this.policyDetailsUpdate = this.policyDetails;
      } else {
        this.policyDetailsUpdate = this.policyDetails.slice(0, 40);
      }
    },
  },
};
</script>

<style scoped>
ul > :first-child a {
  /* font-weight: bold; */
  color: #000000 !important;
  opacity: 0.6;
  font-size: 14px !important;
}
.v-breadcrumbs__item {
  font-weight: bold;
  color: #1e83c2;
  font-size: 14px !important;
}
.v-breadcrumbs__divider {
  color: #000000 !important;
  opacity: 0.6;
  font-size: 14px !important;
}
.v-datatable > thead > tr > th {
  background-color: #1e83c2 !important;
}
.head-card-text {
  font-weight: bold;
  color: #1e83c2;
  /* opacity: 0.6; */
  font-size: 14px !important;
}
.v-btn {
  text-transform: capitalize;
}
.menu-action {
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  font-size: 12px;
  padding: 0px 10px;
}
.list-action {
  cursor: pointer;
  padding: 10px 0px;
  /* padding: 2px 10px; */
}
.red {
  color: red;
  background-color: white !important;
}

.dateRange {
  width: 170px;
}
.view-more-field {
  width: 112px;
  height: 35px;
  background-color: #0073bb;
  text-transform: capitalize;
  justify-content: start;
  right: 190px;
  color: #ffffff !important;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  justify-content: center;
}
</style>