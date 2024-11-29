<template>
  <v-app>
    <v-card class="ma-3">
      <v-layout class="cardwhitebackclr pa-3" align-center>
        <div class="mr-3">
          <p class="body-2 font-weight-bold mb-0" style="color: #1e83c2">
            User Management
          </p>
        </div>
      </v-layout>
    </v-card>
    <v-card class="ma-3">
      <v-container fluid>
        <v-layout row>
          <v-flex grow pa-1>
            <v-btn
              @click="addUpdateUserHandler('ADD', {})"
              v-if="userRole === 'super-admin' || 'admin'"
              :class="{ invisible: !admin }"
              color="#D1121B"
              dark
              small
            >
              <v-icon small dark left class="mr-2">mdi-plus</v-icon>
              <v-divider vertical class="mr-2"></v-divider>
              Add User / Admin
            </v-btn>
          </v-flex>
          <v-flex shrink pa-1>
            <SwitchingCommunicationSystemVue
              v-if="
                userDetails.PARENT_PRODUCT_NAME == 'CV' &&
                userDetails.ROLE == 'admin' || userDetails.ROLE == 'super-admin'
               "
            />
          </v-flex>
          <v-flex shrink pa-1>
            <v-flex
              d-flex
              style="max-width: 190px; float: right; flex-direction: column"
            >
              <label>Filter By</label>
              <v-select
                v-model="filterReq"
                :items="userFilterItems"
                item-text="FilterName"
                item-value="ID"
                label="Select Status"
                solo
                @change="getListOfUsers()"
                return-object
              ></v-select>
            </v-flex>
          </v-flex>
          <v-flex shrink pa-1>
            <v-text-field
              v-model="searchText"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              @input="getListOfUsers()"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- table -->
      <template class="ma-3">
        <v-data-table
          :headers="headers"
          :items="TableData"
          hide-actions
          hide-default-footer
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left" style="border-right: 1px solid #c1c8cc">
              {{ props.item.FULL_NAME }}
            </td>
            <td class="text-xs-left" style="border-right: 1px solid #c1c8cc">
              {{ props.item.USER_NAME }}
            </td>
            <td class="text-xs-left" style="border-right: 1px solid #c1c8cc">
              {{ props.item.MOBILE }}
            </td>
            <td class="text-xs-left" style="border-right: 1px solid #c1c8cc">
              {{ props.item.EMAIL }}
            </td>
            <td class="text-xs-left" style="border-right: 1px solid #c1c8cc">
              {{ props.item.ROLE }}
            </td>
            <td class="text-xs-left" style="border-right: 1px solid #c1c8cc">
              {{ props.item.STATUS }}
            </td>
            <td
              class="text-xs-left"
              style="
                border-right: 1px solid #c1c8cc;
                padding: 10px;
                justify-content: center;
                display: flex;
              "
            >
              <v-icon @click="showAccessList(props.item.ACCESS_LIST)"
                >mdi mdi-eye</v-icon
              >
            </td>
            <td class="text-xs-left" style="border-right: 1px solid #c1c8cc">
              {{ props.item.LAST_LOGIN_DATE }}
            </td>
            <td
              class="text-xs-left"
              style="
                border-right: 1px solid #c1c8cc;
                align-items: center;
                display: flex;
              "
            >
              <v-icon
                @click="addUpdateUserHandler('UPDATE', props.item)"
                style="margin-right: 15px"
                >mdi-pencil</v-icon
              >
              <!-- @click="deleteItem(props.item)" -->
              <v-icon
                @click="ShowDialogBox(props.item)"
                style="margin-right: 15px"
                >mdi-delete</v-icon
              >
            </td>
          </template>
        </v-data-table>
        <v-container fluid class="my-3 paginationStyle">
          <v-layout justify-end>
            <div class="margincls mt-3 mr-3">
              <span>
                Showing <b>{{ pageStartIndex }}</b> -
                <b>{{ pageEndIndex }}</b></span
              >
              <span>
                out of <b>{{ totalListCount }}</b> records
              </span>
            </div>
            <v-pagination
              class="mr-4 mt-1 navpagenumber"
              v-model="pageNumber"
              color="#152F38"
              :length="getNoOfPages"
              :total-visible="5"
              @input="nextPage($event)"
            >
            </v-pagination>
          </v-layout>
        </v-container>
      </template>
    </v-card>
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialogforConf" max-width="300">
          <v-card>
            <v-card-text
              >Are you sure you want delete this User Credentials?
            </v-card-text>
            <v-btn
              color="primary darken-1"
              flat="flat"
              @click="dialogforConf = false"
            >
              No
            </v-btn>
            <v-btn
              v-model="Yes"
              color="primary darken-1"
              flat="flat"
              @click="deleteItem(currentUser)"
            >
              Yes
            </v-btn>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

    <template>
      <v-layout row justify-center>
        <v-dialog
          v-model="showAccessListModal"
          persistent
          overlay
          max-width="450"
        >
          <v-card>
            <v-card-title class="headline">Access list</v-card-title>
            <v-card-text>
              <div
                v-for="access of showAccessData"
                :key="access"
                style="display: inline-block"
              >
                <v-chip v-if="access.page"
                style="padding:0px 5px"
                  >{{ access.page }}
                
                  <v-icon small
                  color="green"
                  right v-if="access.view == true" 
                
                >mdi mdi-eye</v-icon>
                    <v-icon small right 
                    color="#e57232"
                    v-if="access.edit == true">mdi-pencil</v-icon>
                 
              
                </v-chip>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="showAccessListModal = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-app>
</template>

<script>
import App from "../../App.vue";
import { apiService } from "./common/common";
import SwitchingCommunicationSystemVue from "./SwitchingCommunicationSystem.vue";
export default {
  data() {
    return {
      pageStartIndex: 1,
      pageRowCount: 20,
      totalListCount: 0,
      skip: 0,
      pageNumber: 1,
      currentUser: "",
      Yes: false,
      dialogforConf: false,
      admin: true,
      user: true,
      searchText: "",
      searchFlag: false,
      TableData: [],

      headers: [
        { text: "Full Name", value: "fullname", sortable: false },
        { text: "User Name", value: "userName", sortable: false },
        { text: "Mobile", value: "mobile", sortable: false },
        { text: "Email", align: "start", sortable: false, value: "email" },
        { text: "Role", value: "role", sortable: false },

        { text: "Status", value: "Status", sortable: false },
        { text: "Access List", value: "accesslist", sortable: false },
        { text: "Last Login", value: "lastlogin", sortable: false },
        { text: "Actions", value: "Actions", sortable: false },
      ],

      userScreen: [],
      status_id: [],
      cvRenewalStatus: [],
      renewalStatus: [],

      userRole: "",
      userFilterItems: [
        { FilterName: "Admin", ID: "admin" },
        { FilterName: "Users", ID: "user" },
        { FilterName: "All", ID: "all" },
      ],
      filterReq: "",
      userDetails: {},
      showAccessListModal: false,
      showAccessData: [],
    };
  },
  components: {
    App,
    SwitchingCommunicationSystemVue,
  },
  computed: {
    pageEndIndex() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return this.pageStartIndex + this.pageRowCount <= this.totalListCount
          ? this.pageStartIndex + this.pageRowCount - 1
          : this.totalListCount;
      }
    },

    getNoOfPages() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return Math.ceil(this.totalListCount / this.pageRowCount);
      }
    },
  },

  created() {
    this.getUserDetails();
    this.$store.commit("SET_PAGE_TITLE", "User Management");
    this.getListOfUsers();
  },

  methods: {
    showAccessList(accessList) {
      this.showAccessListModal = true;
      this.showAccessData = accessList;
    
    },
    getUserDetails() {
      let userData = JSON.parse(localStorage.loginResp);
      this.userDetails = userData.data;
    },
    addUpdateUserHandler(type, data) {
      this.$store.commit("ADD_UPDATE_USER_DATA", { type, data });
      this.$router.push({
        path: "/createuser", //use name for router push
      });
    },

    nextPage(e) {
      let skipData = e - 1;
      if (skipData === 0) {
        this.skip = 0;
        this.pageStartIndex = 1;
      } else {
        this.skip = this.pageRowCount * skipData;
        this.pageStartIndex = this.pageRowCount + 1;
      }
      this.getListOfUsers();
    },

    // 1st api
    getListOfUsers() {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);

      const search = self.searchText
        ? { username_or_email: self.searchText, searchFlag: true }
        : {};
      const filter = self.filterReq.ID
        ? { role: self.filterReq.ID, searchFlag: true }
        : {};

      apiService("post", `/get/users`, {
        limit: 20,
        offset: self.skip,
        userRole: access_list_fr.data.ROLE,
        parentProductName: access_list_fr.data.PARENT_PRODUCT_NAME,
        ...search,
        ...filter,
      })
        .then(function (response) {
          const data = response.data.data.Result.map((e) => {
            return {
              ...e,
              // ACCESS_LIST: e.ACCESS_LIST.length ? e.ACCESS_LIST.map((e)=>e.page) : '-',
            };
          });
          self.TableData = data;
          self.totalListCount = response.data.data.TotalCount;
          self.pageStartIndex = self.skip + 1;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    ShowDialogBox(currentUser) {
      this.currentUser = currentUser;
      this.dialogforConf = true;
    },
    deleteItem(item) {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      self.user_name = access_list_fr.data.USER_NAME;
      apiService("delete", "/delete/user", {
        username: item.USER_NAME,
      })
        .then(function (response) {
          self.getListOfUsers();
          self.dialogforConf = false;
        })
        .catch(function (error) {});
    },
  },
};
</script>

<style>
.invalid-warning {
  margin-top: -53px;
  color: red;
  font-size: 11px;
}
</style>



