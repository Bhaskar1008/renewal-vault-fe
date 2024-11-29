<template>
  <v-app>
    <div style="margin-left: 35px" class="mt-4">
      <v-text class="body-2 font-weight-bold" style="color: black">
        {{ type }} USER
      </v-text>
      <!-- </div>
    <div style="margin-left: 35px;float:right" class="mt-4"> -->
      <v-btn
        style="
          background-color: #2a811b;
          color: white;
          float: right;
          z-index: 10000;
        "
        @click="changePasswordHandler"
        v-if="type == 'UPDATE' && loginType != 'ntid'"
      >
        Change Password
      </v-btn>
      <ChangePassword
        v-if="showModel"
        :showModel="showModel"
        :username="username"
        :onClose="closeModel"
      />
    </div>
    <v-card class="ma-3">
      <v-layout class="pl-3 mt-3" xs16 row wrap>
        <v-flex xs12>
          <!-- <v-card> -->
          <v-container v-bind="{ [`grid-list-lg`]: true }" fluid>
            <v-layout row wrap>
              <v-flex xs3>
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Login Type<span>*</span>
                </p>
                <v-select
                  selected
                  class="rounded-0"
                  solo
                  :disabled="type === 'UPDATE'"
                  v-model="loginType"
                  :rules="textRule"
                  :items="loginItem"
                  item-text="label"
                  item-value="value"
                  label="Select"
                >
                </v-select>
              </v-flex>
              <v-flex xs3>
                <!-- <FormulateInput
  type="text"
  name=" Full Name"
  label=" Full Name"
  class="rounded-0"
  placeholder="Enter the full name"
  v-model="fullname"
  validation="required"

/> -->
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Full Name
                </p>
                <v-text-field
                  class="rounded-0"
                  solo
                  v-model="fullname"
                  label="Enter..."
                  :rules="textRule"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3 v-if="loginType == 'username'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  User Name<span v-if="type == 'ADD'">*</span>
                </p>
                <v-text-field
                  class="rounded-0"
                  :disabled="type === 'UPDATE'"
                  v-model="username"
                  label="Enter..."
                  :rules="textRule"
                  solo
                  :style="{
                    cursor: type == 'UPDATE' ? not - allowed : pointer,
                  }"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3 v-if="loginType == 'ntid'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  NTID <span>*</span>
                </p>
                <v-text-field
                  class="rounded-0"
                  :disabled="type === 'UPDATE'"
                  v-model="ntid"
                  label="Enter..."
                  :rules="textRule"
                  solo
                  :style="{
                    cursor: type == 'UPDATE' ? not - allowed : pointer,
                  }"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3 v-if="type == 'ADD' && loginType != 'ntid'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Password<span v-if="type == 'ADD'">*</span>
                </p>
                <v-text-field
                  class="rounded-0"
                  v-model="password"
                  label="Enter..."
                  :rules="textRule"
                  solo
                >
                </v-text-field>
              </v-flex>
              <v-flex xs3>
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Primary Email
                </p>
                <v-text-field
                  class="rounded-0"
                  v-model="email"
                  label="Enter..."
                  solo
                >
                </v-text-field>
                <!-- :class="{ valid: isValidEmail, invalid: !isValidEmail }"
                  @keyup="ValidateEmail" -->
                <!-- <div class="invalid-warning" v-if="!isValidEmail">Invalid Email Address!</div>    -->
              </v-flex>

              <v-flex xs3>
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Mobile Number
                </p>
                <v-text-field
                  class="rounded-0"
                  v-model="mobileno"
                  label="Enter..."
                  :class="{
                    valid: isValidPhoneNumber,
                    invalid: !isValidPhoneNumber,
                  }"
                  @keyup="validatePhoneNumber"
                  solo
                >
                </v-text-field>
              </v-flex>

              <v-flex xs3>
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Line of Business
                </p>
                <v-select
                  v-model="parentProductList"
                  :items="parentProductListOpt"
                  label="Select"
                  solo
                  wrap
                  item-text="text"
                  item-value="text"
                  @change="changeProduct()"
                >
                </v-select>
              </v-flex>

              <v-flex xs3>
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Product List
                </p>
                <v-select
                  v-model="lob_list"
                  :items="newLobArray"
                  label="Select"
                  multiple
                  solo
                  wrap
                  :rules="lobLabel"
                  item-text="text"
                  item-value="NUM_IL_PRODUCT_CODE"
                  @change="changeLobData()"
                >
                  <template v-slot:selection="{ item, index }">
                    <span v-if="index === 0">{{
                      item.NUM_IL_PRODUCT_NAME
                    }}</span>
                    <span v-if="index === 1">
                      (+{{ lob_list.length - 1 }} others)
                    </span>
                  </template>
                </v-select>
              </v-flex>
              <v-flex xs3>
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Role<span v-if="type == 'ADD' || type == 'UPDATE'">*</span>
                </p>
                <v-select
                  selected
                  class="rounded-0"
                  solo
                  v-model="role"
                  :rules="textRule"
                  :items="roleItem"
                  @change="autoPopulateHandler()"
                  label="Select"
                >
                </v-select>
              </v-flex>
              <v-flex xs3 v-show="role == 'user'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Sub Role
                </p>
                <v-select
                  class="rounded-0"
                  solo
                  v-model="sub_role"
                  :rules="textRule"
                  :items="subRoles"
                  @change="autoPopulateHandlerSubRole()"
                  label="Enter..."
                >
                </v-select>
              </v-flex>

              <v-flex xs3>
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Access List
                </p>

                <v-select
                  v-model="userScreenList"
                  :items="accessListApi"
                  item-text="page"
                  item-value="id"
                  label="Select"
                  multiple
                  solo
                  dense
                  @change="selectAccessList"
                  :rules="accessListLabel"
                >
                  <template v-slot:selection="{ item, index }">
                    <span v-if="index === 0">{{ item.page }}</span>
                    <span v-if="index === 1">
                      (+{{ userScreenList.length - 1 }} others)
                    </span>
                  </template>
                </v-select>
              </v-flex>

              <v-flex xs3 v-show="showRenewalStatus">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Renewal Status
                </p>

                <v-select
                  v-model="renewalStatusFR1"
                  :items="selectedLOBwithBucket"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  multiple
                  solo
                  dense
                  @change="selectedRenewalStatus"
                  :rules="textRule"
                >
                  <template v-slot:selection="{ item, index }">
                    <span v-if="index === 0">{{ item.name }}</span>
                    <span v-if="index === 1">
                      (+{{ renewalStatusFR1.length - 1 }} others)
                    </span>
                  </template>
                </v-select>
              </v-flex>
              <v-flex xs3 v-show="parentProductList=='MARINE'">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                 Access Generate Log<span v-if="type == 'ADD'">*</span>
                </p>
                <v-select
                  v-model="isGenerateLog"
                  :items="generateLogs"
                  solo
                  class="font-weight-bold textbold"
                  label="Select"
                  :rules="textRule"
                ></v-select>
              </v-flex>


              <v-flex xs3>
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Status<span v-if="type == 'ADD'">*</span>
                </p>
                <v-select
                  v-model="status"
                  :items="statusArray"
                  solo
                  class="font-weight-bold textbold"
                  label="Select"
                  :rules="textRule"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>

      <AddUserTabs />
      <v-layout class="justify-end mr-3">
        <v-btn @click="close()" class="ma-2" color="#4B4D4D" dark small>
          <v-icon small dark left class="mr-2">cancel</v-icon>
          <v-divider vertical class="mr-2"></v-divider>
          CANCEL
        </v-btn>
        <v-btn
          v-if="type == 'ADD'"
          @click="addUpdateUserHandler()"
          class="ma-2"
          color="#E46A25"
          dark
          small
        >
          <v-icon small dark left class="mr-2"
            >mdi-checkbox-marked-circle</v-icon
          >
          <v-divider vertical class="mr-2"></v-divider>
          {{ type }}
        </v-btn>
        <v-btn
          v-if="type == 'UPDATE'"
          @click="addUpdateUserHandler()"
          class="ma-2"
          color="#E46A25"
          dark
          small
        >
          <v-icon small dark left class="mr-2"
            >mdi-checkbox-marked-circle</v-icon
          >
          <v-divider vertical class="mr-2"></v-divider>
          {{ type }}
        </v-btn>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script>
import AddUserTabs from "./AddUserTabs.vue";
import ChangePassword from "./ChangePassword.vue";
import {
  validateEmailField,
  validatePhoneNumberField,
} from "./validator/validateForm";
import App from "../../App.vue";
import { computed } from "vue";
import { apiService,autoPopulateData } from "./common/common";

export default {
  data() {
    return {
      userType: "user",
      fullname: "",
      username: "",
      password: "",
      email: "",
      mobileno: "",
      lob_list: [],
      parentProductList: "",
      parentProductListOpt: [],
      userScreenList: [],
      role: "",
      roleItem: ["admin", "user"],
      loginType: "ntid",
      ntid: "",
      loginItem: [
        { label: "Using NTID & Password", value: "ntid" },
        {
          label: "Using Username & Password",
          value: "username",
        },
      ],
      generateLogs:["True","False"],
      sub_role: "",
      subRoles: [
        "Auto PT",
        "Auto PT (View Only)",
        "Retention team",
        "Retention team (View Only)",
        "Distribution team",
        "BOPs",
        "UW Team",
        "Marine PT",
        "DOPS checker",
        "DOPS maker",
        "Hub user",
      ],
      status: "",
      statusArray: ["active", "In-active"],
      renewalStatus: [],
      renewalStatusFR1: [],
      textRule: [(v) => !!v || "This Field is required"],
      accessListLabel: [(v) => v.length > 0 || "This fields is required"],
      lobLabel: [(v) => !!v || "This fields is required"],
      isValidPhoneNumber: true,
      isValidEmail: true,
      newLobArray: [],
      lobArray: [],
      screenList: [],
      lobDataArray: [],
      accessListApi: [],
      showRenewalStatus: false,
      selectedAccessList: [],
      selectedLOBwithBucket: [],
      selectedBucket: [],
      type: "ADD",
      userId: "",
      updatedBy: "",
      updateUserData: "",
      currentUpdatingData: {},
      showModel: false,
      communicationSystemOpn: "",
      noOfBackDays:0,
      dataForAuto:autoPopulateData,
      isGenerateLog:"False"
    };
  },
  components: {
    App,
    AddUserTabs,
    ChangePassword,
  },
  provide() {
    return {
      selectedAccessList: computed(() => this.selectedAccessList),
      selectedBucket: computed(() => this.selectedBucket),
      showRenewalStatus: computed(() => this.showRenewalStatus),
      parentProductList: computed(() => this.parentProductList),
    };
  },

  created() {
    this.$store.commit("SET_PAGE_TITLE", "User Management");
    this.updateUserData = this.$store.state.updateUserData;
    this.type = this.$store.state.typeUser ? this.$store.state.typeUser : "ADD";

    let access_list_fr = JSON.parse(localStorage.loginResp);
    this.loginRespRole = access_list_fr.data.ROLE;
    this.getLOBData();
    this.getUserData();
    if (this.$store.state.typeUser == "UPDATE") {
      this.editUserItem();
    }
  },

  methods: {
    uniqByKeepLast(data, key) {
      return [...new Map(data.map((x) => [key(x), x])).values()];
    },
    autoPopulateHandler() {
      let self = this;
      if (self.role == "admin" && self.parentProductList == "CV") {
        const formattedPolicy = self.accessListApi.map((e) => e.id);
        self.userScreenList = formattedPolicy;
        self.selectAccessList();
        self.renewalStatusFR1 = [];
        self.selectedBucket = [];

        self.selectedRenewalStatus();
      } else if (self.role == "user" && self.parentProductList == "CV") { 
        self.sub_role=""
        self.userScreenList = ["FR1", "FR27"];
        self.selectAccessList();
      }

    },
    autoPopulateHandlerSubRole() {
      let self = this;

      const auto = self.dataForAuto;

      if (auto[self.sub_role] && self.parentProductList == "CV" ) {
        self.renewalStatusFR1 = auto[self.sub_role].map((e) => e.id);
        self.selectedBucket = auto[self.sub_role];
       } else {
        self.renewalStatusFR1 = [];
        self.selectedBucket = [];

        self.selectedRenewalStatus();
      }
    },
    changePasswordHandler() {
      this.showModel = true;
    },
    closeModel() {
      this.showModel = false;
    },
    getLOBData() {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let lobList = JSON.stringify(access_list_fr.data.LOB);
      apiService("get", `/lob-list?productcodes=${lobList}`, {})
        .then(function (response) {
          if (response.status == 200) {
            const modifyData = response.data.data.map((e) => {
              return {
                ...e,
                text: `${e.NUM_IL_PRODUCT_NAME}`,
              };
            });
            self.newLobArray = modifyData;
            self.lobArray = modifyData;

            const modifiedProductList = [
              ...new Set(
                modifyData.map((e) => {
                  return {
                    text:
                      e.PARENT_PRODUCT_NAME === "Renewal Voult"
                        ? "Renewal Vault"
                        : e.PARENT_PRODUCT_NAME,
                  };
                })
              ),
            ];
            // console.log(modifiedProductList,'g')
            self.parentProductListOpt = modifiedProductList;
            self.changeLobData();
          }
        })
        .catch(function (error) {});
    },
    changeProduct() {
      let data = [];
      if (this.parentProductList === "Renewal Vault") {
        data = this.lobArray;
      } else {
        data = this.lobArray.filter(
          (e) => e.PARENT_PRODUCT_NAME === this.parentProductList
        );
      }
      this.lob_list = [];
      this.newLobArray = data;
      this.accessListApi = [];
      this.userScreenList = [];
      this.role = "";
    },
    changeLobData() {
      let self = this;
      try {
        self.accessListApi = [];

        let resH = self.newLobArray[0];
        if (self.lob_list.includes(resH.NUM_IL_PRODUCT_CODE)) {
          for (var i = 0; i < resH.ACCESS_LIST.length; i++) {
            self.accessListApi.push(resH.ACCESS_LIST[i]);
          }
          if (self.type === "UPDATE") {
            let d = [];
            for (let i of resH.ACCESS_LIST) {
              const y = this.updateUserData.ACCESS_LIST.find(
                (e) => e.id === i.id
              );
              if (y) {
                d.push(y);
              } else {
                d.push(i);
              }
            }

            self.accessListApi = d;
          }
        }

        self.newLobArray.map((res) => {
          if (self.lob_list.includes(res.NUM_IL_PRODUCT_CODE)) {
            if (res.BUCKETS.length) {
              self.selectedLOBwithBucket = res.BUCKETS;

              if (self.type === "UPDATE") {
                let d = [];
                for (let i of res.BUCKETS) {
                  const y = this.updateUserData.RENEWAL_STATUS.find(
                    (e) => e.id === i.id
                  );
                  if (y) {
                    d.push(y);
                  } else {
                    d.push(i);
                  }
                }

                self.selectedLOBwithBucket = d;
              }
              // console.log(self.selectedLOBwithBucket, "h");
            }
          }
        });
      } catch (err) {
        console.log(err, "err");
      }
    },
    // ValidateEmail(input) {
    //   this.isValidEmail = validateEmailField(input);
    // },
    validatePhoneNumber() {
      this.isValidPhoneNumber = validatePhoneNumberField(this.mobileno);
    },
    selectAccessList() {
      let filterBasedOnAccessList = this.selectedAccessList;
      for (let i = 0; i <= this.userScreenList.length; i++) {
        const d = this.accessListApi.filter(
          (f) => f.id === this.userScreenList[i]
        );
        if (d.length) {
          let check = filterBasedOnAccessList.filter((e) => e.id === d[0].id);
          if (!check.length) {
            filterBasedOnAccessList.push(d[0]);
          } else {
            filterBasedOnAccessList = check;
          }
        }
      }
      this.selectedAccessList = filterBasedOnAccessList;
    },
    selectedRenewalStatus() {
      let res = this.selectedBucket;

      for (let i = 0; i <= this.renewalStatusFR1.length; i++) {
        const filterId = this.selectedLOBwithBucket.filter(
          (e) => e.id === this.renewalStatusFR1[i]
        );

        if (filterId.length) {
          let h = res.filter((e) => e.id === filterId[0].id);

          if (!h.length) {
            res.push(filterId[0]);
          } else {
            res = h;
          }
        }
      }
      // [{"name":"ALL","Status":0,"id":"FR1-B1","Search":true,"Download":true},{"name":"Bre-Pending","Status":1,"id":"FR1-B2","Search":true,"Bulk action":true,"Filter by":true},{"name":"Bre-Success","Status":2,"id":"FR1-B3","Search":true,"Bulk action":true,"Download":true},{"name":"Bre-Declined","Status":3,"id":"FR1-B4","Search":true,"Bulk action":true,"Download":true},{"name":"PT-Modification-Queue","Status":4,"id":"FR1-B5","Search":true,"Bulk action":true,"Download":true,"Upload":true,"Filter by":true},{"name":"Renewed","Status":8,"id":"FR1-B9","Search":true},{"name":"Lapsed","Status":9,"id":"FR1-B10","Search":true}]
      // const auto = {
      //   "Auto PT" : [{id: "FR1-B1",}, "FR1-B2", "FR1-B3", "FR1-B4", "FR1-B5", "FR1-B9", "FR1-B10" ],
      //   "Auto PT (View Only)":[ "FR1-B1", "FR1-B2", "FR1-B3", "FR1-B4", "FR1-B5", "FR1-B9", "FR1-B10" ],
      //   "Retention team":[ "FR1-B1", "FR1-B6", "FR1-B7", "FR1-B8", "FR1-B9", "FR1-B10" ],
      //   "Retention team (View Only)" :[ "FR1-B1", "FR1-B6", "FR1-B7", "FR1-B8", "FR1-B9", "FR1-B10" ]
      // // }
      // auto[self.sub_role]
      // console.log(res,"res")
      this.selectedBucket = res;
    },
    close() {
      this.$router.push("/usermanagement");
    },

    getUserData() {
      let userData = JSON.parse(localStorage.loginResp);
      const username = userData.data.USER_NAME;
      apiService("get", `/fetch/user?userName=${username}`, {})
        .then((res) => {
          if (res.status == 200) {
            const { data } = res.data;
            console.log(data, "da");
            this.communicationSystemOpn = data.rng;
            this.noOfBackDays = data.noOfBackDays;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addUpdateUserHandler() {
      let self = this;
      const userIdCheck =
        self.type === "ADD"
          ? { password: self.password }
          : { userId: self.userId, updatedBy: self.updatedBy };
      const loginType =
        self.loginType == "ntid"
          ? {
              ntid: self.ntid.toLowerCase(),
              username: self.ntid.toLowerCase(),
            }
          : {
              username: self.username.toLowerCase(),
            };
      const reqData = {
        ...loginType,
        loginType: self.loginType,
        accessList: self.selectedAccessList,
        createdBy: self.createdBy,
        email: self.email,
        fullname: self.fullname,
        lob: self.lob_list,
        mobile: self.mobileno,
        role: self.role.toLowerCase(),
        subRole: self.sub_role,
        status: self.status,
        renewal_status: self.selectedBucket,
        parentProductName: self.parentProductList,
        rng: this.communicationSystemOpn,
        noOfBackDays:this.noOfBackDays,
        isGenerateLog: this.isGenerateLog == "True" ? true : false ,
        ...userIdCheck,
      };
      const payload =
        self.type === "ADD"
          ? { method: "post", url: "/add/new-user" }
          : { method: "put", url: "/update/user" };
      apiService(payload.method, payload.url, reqData)
        .then(function (res) {
          const { status, message, msg } = res.data;
          if (status === 200) {
            self.showLoader("Loading", false);
            self.showToast(
              `User ${self.type.toLowerCase()} Successfully`,
              self.TOST().SUCCESS
            );
            self.$router.push("/usermanagement");
          } else if (status == 401) {
            self.showToast(msg, self.TOST().WARNING);
            self.showLoader("Loading", false);
          } else {
            self.showToast(message, self.TOST().WARNING);
            self.showLoader("Loading", false);
          }
        })
        .catch(function (error) {
          self.showToast(error.response.data.message, self.TOST().WARNING);
          self.showLoader("Loading", false);
        });
    },
    editUserItem() {
      let access_list_fr = JSON.parse(localStorage.loginResp);
      let updatedBy = JSON.stringify(access_list_fr.data.ROLE);

      this.fullname = this.updateUserData.FULL_NAME;
      this.username = this.updateUserData.USER_NAME;
      this.password = this.updateUserData.PASSWORD;
      this.email = this.updateUserData.EMAIL;
      this.renewal_status = this.updateUserData.RENEWAL_STATUS;
      this.role = this.updateUserData.ROLE;
      this.sub_role = this.updateUserData.SUB_ROLE;
      this.mobileno = this.updateUserData.MOBILE;
      this.userId = this.updateUserData.USER_ID;
      this.lob_list = this.updateUserData.LOB;
      this.loginType = this.updateUserData.LOGIN_TYPE || "username";
      this.ntid = this.updateUserData.NTID;
      this.updatedBy = updatedBy;
      // this.showRenewalStatus

      this.userScreenList = this.updateUserData.ACCESS_LIST.map((e) => e.id);
      this.renewalStatusFR1 = this.updateUserData.RENEWAL_STATUS.map(
        (e) => e.id
      );

      this.status = this.updateUserData.STATUS;
      this.selectedAccessList = this.updateUserData.ACCESS_LIST;
      this.selectedBucket = this.updateUserData.RENEWAL_STATUS;
      this.isGenerateLog=  this.updateUserData.isGenerateLog  ? 'True' : "False";
      // selectedLOBwithBucket
      if (this.updateUserData.RENEWAL_STATUS) {
        // console.log(this.updateUserData.RENEWAL_STATUS,"this.updateUserData.RENEWAL_STATUS")
        this.showRenewalStatus = true;
      }
      this.parentProductList = this.updateUserData.PARENT_PRODUCT_NAME;

      this.sub_role = this.updateUserData.SUB_ROLE || "";
    },
  },
  watch: {
    userScreenList(newQuestion, oldQuestion) {
      this.showRenewalStatus = false;
      const checkParentProduct =
        this.parentProductList == "CV" || this.parentProductList == "TW" ? "FR1" : "FR21";
      const filterToCheckProduct = newQuestion.filter(
        (e) => e == checkParentProduct
      );
      if (filterToCheckProduct.length) {
        this.showRenewalStatus = true;
      } else {
        this.showRenewalStatus = false;
      }
    },
 
  //   ntid(newVal) {
  //   	this.ntid = this.ntid.toLowerCase()
    
  // }
  },
};
</script>

<style scoped>
</style>