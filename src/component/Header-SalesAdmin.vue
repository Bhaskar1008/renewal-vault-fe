<template>
  <div id="app">
    <!-- <v-app id="inspire"> -->
    <!-- <header-sale-admin-login v-if="headerVisible === false"></header-sale-admin-login>
    <header-sale-admin  v-if="headerVisible=== true"></header-sale-admin> -->
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
      class="thems_color"
      disable-resize-watcher
    >
      <!--v-else  -->
      <v-list dense>
        <!--New Dashboard  -->
        <v-list-tile
          class="crsr myDiv"
          v-if="routeList.FR19"
          @click.native="openRVPages('dashboard')"
        >
          <v-list-tile-content>
            <v-list-tile-title class="fntclr">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR19"></v-divider>

        <v-list-group
          class="arrowIcon 43"
          v-if="
            routeList.FR2 || routeList.FR3 || routeList.FR1 || routeList.FR21 || routeList.FR24 ||
            routeList.FR26 || routeList.FR27
          "
        >
          <v-list-tile slot="activator">
            <v-list-tile-title class="fntclr"
              >Schedule batch's</v-list-tile-title
            >
          </v-list-tile>

          <v-list-tile
            class="crsr"
            v-if="routeList.FR2"
            @click.native="openRVPages('scheduler')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Collection and Processing</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            class="crsr"
            v-if="routeList.FR3"
            @click.native="openRVPages('status')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr">Batch Status</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            class="crsr myDiv"
            v-if="routeList.FR1"
            @click.native="openRVPages('policy')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Policy Summary</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>


          <v-list-tile
            class="crsr myDiv"
            v-if="routeList.FR24"
            @click.native="openRVPages('BulkBucketMovementExcel')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Bulk Bucket Movement - Excel</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            class="crsr myDiv"
            v-if="routeList.FR26"
            @click.native="openRVPages('ExcelPullDataFromDataRep')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Pull Data From Data Rep</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            class="crsr myDiv"
            v-if="routeList.FR27"
            @click.native="openRVPages('DownloadReports')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Download Reports</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>

          <!-- AIGC -->
          <v-list-tile
            class="crsr myDiv"
            v-if="routeList.FR21"
            @click.native="openRVPages('PolicySummaryAigc')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Policy Summary - AIGC</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        <!-- </v-list-group> -->

        
        </v-list-group>


        <!-- </v-list-group> -->
        <v-divider
          v-if="
           routeList.FR1 || routeList.FR2 || routeList.FR3 || routeList.FR21
          "
        ></v-divider>
        <v-list-group
          class="arrowIcon 43"
          v-if="routeList.FR4 || routeList.FR5"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title class="fntclr">Manual QC</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            class="crsr"
            v-if="routeList.FR4"
            @click.native="openRVPages('download')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Download Pre Extract</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            class="crsr myDiv"
            v-if="routeList.FR5"
            @click.native="openRVPages('upload')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Upload Modified Extract</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-divider v-if="routeList.FR4 || routeList.FR5"></v-divider>

        <v-list-tile
          class="crsr"
          v-if="routeList.FR6"
          @click.native="openRVPages('triggerCCM')"
        >
          <!-- <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr">Trigger to CCM</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR6"></v-divider>

        <v-list-tile
          class="crsr"
          v-if="routeList.FR7"
          @click.native="openRVPages('renewalextract')"
        >
          <!-- <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr">Batch Report's</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="routeList.FR7"></v-divider>

        <v-list-group class="arrowIcon" v-if="routeList.FR8 || routeList.FR9">
          <v-list-tile slot="activator">
            <v-list-tile-title class="fntclr"
              >Producer license expired</v-list-tile-title
            >
          </v-list-tile>

          <v-list-tile
            class="crsr"
            v-if="routeList.FR8"
            @click.native="openRVPages('single')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Single Policy Modification</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            class="crsr"
            v-if="routeList.FR9"
            @click.native="openRVPages('multiple')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Multiple Policy Modification</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-divider v-if="routeList.FR9"></v-divider>

        <v-list-tile
          class="crsr 43"
          v-if="routeList.FR10"
          @click.native="openRVPages('renewalNotice')"
        >
          <v-list-tile-content>
            <v-list-tile-title class="fntclr"
              >RN Regeneration Page</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>

        <v-divider v-if="routeList.FR10"></v-divider>

        <!-- <v-list-tile v-if="showdatamapping === true && checkerUser == false" class="crsr" @click.native="openRVPages('renewalUpload')">
          <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action>  prepend-icon="event"
          <v-list-tile-content>
            <v-list-tile-title class="fntclr">Modified Renewal Extract</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
        <v-list-group class="arrowIcon" v-if="routeList.FR11 || routeList.FR12">
          <v-list-tile slot="activator">
            <v-list-tile-title class="fntclr"
              >Post Generation of RN</v-list-tile-title
            >
          </v-list-tile>

          <v-list-tile
            class="crsr"
            v-if="routeList.FR11"
            @click.native="openRVPages('downloadExtract')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Download Pre Extract</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            class="crsr"
            v-if="routeList.FR12"
            @click.native="openRVPages('uploadExtract')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Upload Modified Extract</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-divider v-if="routeList.FR12"></v-divider>

        <!-- <v-list-tile v-if="showdatamapping === true" class="crsr" @click.native="openRVPages('renewallicense')">
          <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="fntclr">Renewal Extract Modification</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        
        <v-divider></v-divider> -->

        <v-list-tile
          class="crsr"
          v-if="routeList.FR13"
          @click.native="openRVPages('policyAD')"
        >
          <!-- <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr"
              >Audit Policy Modification</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR13"></v-divider>

        <v-list-tile
          class="crsr 43"
          v-if="routeList.FR14"
          @click.native="openRVPages('travelReferedCases')"
        >
          <v-list-tile-content>
            <v-list-tile-title class="fntclr"
              >Upload Referred Cases</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR14"></v-divider>

        <v-list-tile
          class="crsr"
          v-if="routeList.FR15"
          @click.native="openRVPages('modifyPolicy')"
        >
          <!-- <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr">Accept/Decline</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR15"></v-divider>

        <v-list-tile
          class="crsr"
          v-if="routeList.FR16"
          @click.native="openRVPages('usermanage')"
        >
          <!-- <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr"
              >User Management</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR16"></v-divider>

        <v-list-tile
          class="crsr"
          v-if="routeList.FR20"
          @click.native="openRVPages('JobScheduler')"
        >
          <!-- <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr"
              >ETL Configuration</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR20"></v-divider>

        <v-list-tile
          class="crsr"
          v-if="routeList.FR17"
          @click.native="openRVPages('sharingrenewalnotice')"
        >
          <!-- <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr"
              >Sharing Renewal Notice</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR17"></v-divider>

        <v-list-tile
          class="crsr"
          v-if="routeList.FR18"
          @click.native="openRVPages('inactivepolicy')"
        >
          <!-- <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr"
              >Inactive Policy</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR18"></v-divider>

        <v-list-tile
          class="crsr"
          v-if="routeList.FR22"
          @click.native="openRVPages('RvAndDataRep')"
        >
          <!-- <v-list-tile-action >
              <img class="manulaiconheight" src="../../web/assets/regnerationmenu.png">
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr">Rv vs DataRep</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="routeList.FR22"></v-divider>

         <v-list-tile
            class="crsr myDiv"
            v-if="routeList.FR23"
            @click.native="openRVPages('UploadWarranties')"
          >
            <v-list-tile-content>
              <v-list-tile-title class="fntclr"
                >Upload Warranties</v-list-tile-title
              >
            </v-list-tile-content>
          </v-list-tile>

        <v-divider v-if="routeList.FR23"></v-divider>

        <v-list-tile class="crsr" @click.native="logout()">
          <!-- <v-list-tile-action>
            <v-icon color="#FFF">logout</v-icon>
          </v-list-tile-action> -->
          <v-list-tile-content>
            <v-list-tile-title class="fntclr">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      style="height: 50px"
      color="#07458E"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-side-icon
        style="position: relative; right: 10px; bottom: 10px"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-layout row align-center>
        <!-- <v-flex class="ml-3" md2  style="height:24px;">
              <p class="font-weight-bold" style="color:#CCCCCC; font-size:18px;">{{headeTitle.length > 20 ? headeTitle.slice(0,20)+"...":headeTitle  }}</p>
          </v-flex>
          <v-flex @click="home" md7 style="display:flex;justify-content:center;cursor:pointer;"> 
              <img src="../../web/assets/renewalvaultlogo.png" style="width:165px; height:30px" >
          </v-flex> -->
        <v-flex xs6 class="ml-0 mt-2">
          <!-- <v-text class="font-weight-bold" style="color:#CCCCCC;font-size:18px;">{{headeTitle}}</v-text> -->
          <img
            src="../assets/tataaiglogo.png"
            class="mb-3"
            style="width: 38px; height: 38px"
          />
        </v-flex>
        <v-divider
          style="
            position: relative;
            right:486px;
            bottom: 2px;
            background-color: #ffffff;
            margin-top: 12px;
            margin-bottom: 23px;
          "
          vertical
        ></v-divider>
        <v-flex
          class=""
          @click="home"
          xs8
          style="
            position: relative;
            right: 468px;
            bottom: 9px;
            cursor: pointer;
            display: flex;
            align-items: center;
          "
        >
          <img
            src="../../web/assets/renewalvaultlogo.png"
            style="width: 155px; height: 32px"
          />
        </v-flex>

        <v-flex
          style="position: absolute; right: 0px; bottom: 0px; height: 50px"
          class="headerdiv"
        >
          <div
            style="
              flex-direction:row;
              align-items: center;
              display: flex;
              position: relative;
              bottom: 10px;
            "
          >
            <div style="cursor: pointer; width: 50px">
              <v-btn icon>
                <v-icon>notifications</v-icon></v-btn
              >
              <span
                class="notifycolor"
                v-if="items.length !== 0 && getUnseenStatus"
              ></span>
            </div>
            <div style="cursor: pointer; width: 50px">
              <v-menu
                transition="slide-y-transition"
                bottom
                content-class="my-menu"
              >
                <v-btn icon slot="activator"> <v-icon>person</v-icon></v-btn>
                <user-inbox @logout="logout()"></user-inbox>
              </v-menu>
            </div>
          </div>
        </v-flex>
      </v-layout>

      <!-- <v-flex  style="position: absolute;right:0px;height:45px" class="headerdiv">
          <div style="flex-direction:row;align-items:center;display:flex;">
            
            <div style="cursor: pointer;">
                  <v-btn icon @click="showNotification"> <v-icon>notifications</v-icon></v-btn>
            </div>
            <div style="cursor: pointer;">
              <v-menu 
                
                transition="slide-y-transition"
                bottom
                content-class="my-menu"
                >
                
                <v-btn icon  slot="activator" @click="showUser"> <v-icon>person</v-icon></v-btn>
                <user-inbox></user-inbox>
              </v-menu>
            </div>
          </div>
  
        

        </v-flex> -->
    </v-toolbar>

    <!-- <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn> -->

    <!-- <div class="inbox-pos">
      <app-inbox
        ref="alertPanel"
        :menu="showInbox"
        @allRead="toClose"
        @onSelect="jumpLead"
      ></app-inbox>
    </div> -->

    <!-- <div class="inbox-pos" style="width:257px;margin-left:350px">
      <user-inbox :userMenu="showUserInbox" @allRead="toCloseUser" @onSelect="jumpLeadUser"></user-inbox>
    </div> -->
  </div>
</template>

<script>
import appInbox from "./notification-list";
import userInbox from "./userIcon_click";
import headerSaleAdminLogin from "./header_salesAdmin_login.vue";
import headerSaleAdmin from "./Header-SalesAdmin.vue";
import axios from "axios";
import { BaseURl, oAuthURl, tokenCred } from "../common/API_Config";
let tokenDataObj = null;
export default {
  name: "HeaderSalesAdminComponent",
  data() {
    return {
      user_name: "",
      productID: "",
      condition: false,
      mopUser: false,
      showFields: false,
      notificationData: [],
      tataagency: false,
      tata_banca: false,
      salesdrive_admin: false,
      drawer: false,
      showSuprUser: false,
      showInbox: false,
      showUserInbox: true,
      showBodUser: false,
      showDbClr: false,
      hederTitle: "",
      bdoadmin: false,
      showdashboard: false,
      showdataimport: false,
      showreconciliation: false,
      showreports: false,
      showsettingpage: false,
      showbankmaster: false,
      showdatamapping: false,
      showauditlog: false,
      showaccesscontrol: false,
      showmanualrecon: false,
      showreconrule: false,
      showadvancesearch: false,
      userlist: false,
      showapprovalbucket: false,
      checkerUser: false,
      items: [],
      routeList: {
        FR1: false,
        FR2: false,
        FR3: false,
        FR4: false,
        FR5: false,
        FR6: false,
        FR7: false,
        FR8: false,
        FR9: false,
        FR10: false,
        FR11: false,
        FR12: false,
        FR13: false,
        FR14: false,
        FR15: false,
        FR16: false,
        FR17: false,
        FR18: false,
        FR19: false,
        FR20: false,
        FR21: false,
        FR22: false,
        FR23: false,
        FR24:false,
        FR26:false,
        FR27:false
      },
      headerVisible: true,
    };
  },

  props: {
    source: String,
  },

  created() {
    let agentAdmin = this.$store.getters.getAgentDetails;

    this.showDbClr = false;
    if (agentAdmin.product_sd_code === "00") {
      // Used for Super User Login
      this.showSuprUser = true;
      this.salesdrive_admin = true;
      this.showDbClr = true;
    } else if (agentAdmin.product_sd_code === "01") {
      // Used for Normal SalesDrive Login
      this.showSuprUser = false;
      this.salesdrive_admin = true;
      this.sd_zero_one = true;
      this.showDbClr = false;
      this.bdoadmin = false;
      this.tata_banca = false;
    } else if (agentAdmin.product_sd_code === "02") {
      // Used for Tata Agency Login
      this.tataagency = true;
      this.salesdrive_admin = true;
      this.sd_zero_one = false;
      this.showSuprUser = false;
      this.showDbClr = false;
      this.bdoadmin = false;
    } else if (agentAdmin.product_sd_code === "04") {
      // Used for Tata Banca Login tata_banka@grr.la
      this.tata_banca = true;
      this.sd_zero_one = false;
      this.salesdrive_admin = true;
      this.showSuprUser = false;
      this.showDbClr = false;
      this.bdoadmin = false;
    } else if (agentAdmin.designation == "maker") {
      // Used for Tata Banca Login tata_banka@grr.la

      this.checkerUser = true;
      this.$router.push("/RenewalModify");
    } else {
      //Used for BDO_admin Login | This is  03

      // this.$router.push('npeduler');
      this.tata_banca = false;
      this.bdoadmin = true;
      this.showDbClr = false;
      this.showBodUser = true;
      this.showSuprUser = false;
    }
    this.getToken();
    this.setpermissiontosidemenubar();
  },

  components: {
    appInbox,
    headerSaleAdminLogin,
    headerSaleAdmin,
    userInbox,
  },

  computed: {
    headeTitle() {
      var str = this.$store.getters.getheaderTitle;
      return str;
    },

    getUnseenStatus() {
      // console.log('inn')
      this.items.filter((item) => {
        return item.IS_NOTIFICATION_VIEWED === 0;
      });
    },
  },

  mounted() {
    this.setRoutepages();
  },

  methods: {
    setRoutepages() {
      let self = this;
      console.log(localStorage.loginResp,"localStorage.loginResp")
      let access_list_fr = JSON.parse(localStorage.loginResp);
      access_list_fr = access_list_fr.data.ACCESS_LIST;
      for (var i = 0; i < access_list_fr.length; i++) {
        for (var key in self.routeList) {
          if (key == access_list_fr[i].id) {
            self.routeList[key] = true;
          }
        }
      }
    },
    notificationRes(val) {
      // console.log(val);
      this.$refs.alertPanel.notificationRes(val);
    },

    getToken() {
      let self = this;
      axios
        .post(
          oAuthURl,
          `grant_type=${tokenCred.grantType}&client_id=${tokenCred.clientId}&client_secret=${tokenCred.clientSecret}`
        )
        .then((res) => {
          if (res.status == 200) {
            tokenDataObj = res.data;
            this.getNotificationData();
            let access_list_fr = JSON.parse(localStorage.loginResp);
            self.user_name = access_list_fr.data.USER_NAME;
          }
        })
        .catch((error) => {});
    },

    openRVPages(event) {
      if (event == "dashboard") {
        this.jump("/dashboard");
      } else if (event == "scheduler") {
        this.jump("/rn-scheduler");
      } else if (event == "status") {
        this.jump("/rn-scheduler-status");
      } else if (event == "batches") {
        this.jump("/rn-scheduler-batches");
      } else if (event == "noticeReport") {
        this.jump("/renewalnoticereport");
      } else if (event == "download") {
        this.jump("/renewal-download");
      } else if (event == "upload") {
        this.jump("/renewalnoticeregeneration");
      } else if (event == "policy") {
        this.jump("/policysummary");
      } else if (event == "triggerCCM") {
        this.jump("/trigger-ccm");
      } else if (event == "renewalextract") {
        this.jump("/RenewalExtractReport");
      } else if (event == "single") {
        this.jump("/RenewalModify");
      } else if (event == "multiple") {
        this.jump("/MultiplePolicy");
      } else if (event == "renewalNotice") {
        this.jump("/RenewalNotRegPage");
      } else if (event == "downloadExtract") {
        this.jump("/DownloadReg");
      } else if (event == "uploadExtract") {
        this.jump("/UploadRegneration");
      } else if (event == "policyAD") {
        this.jump("/policy-audit");
      } else if (event == "travelReferedCases") {
        this.jump("/travelReferedCases");
      } else if (event == "modifyPolicy") {
        this.jump("/modifypolicy");
      } else if (event == "usermanage") {
        this.jump("/usermanagement");
      } else if (event == "sharingrenewalnotice") {
        this.jump("/sharingrenewalnotice");
      } else if (event == "inactivepolicy") {
        this.jump("/InactivePolicy");
      } else if (event == "JobScheduler") {
        this.jump("/job-scheduler");
      } else if (event == "PolicySummaryAigc") {
        this.jump("/aigc-policySummary");
      } else if (event == "RvAndDataRep") {
        this.jump("/rv-vs-datarep");
      }else if (event == "UploadWarranties") {
        this.jump("/upload-warranties");
      }else if (event == "BulkBucketMovementExcel") {
        this.jump("/excel/bulk-bucket-movement");
      }else if (event == "ExcelPullDataFromDataRep") {
        this.jump("/excel/pull-data-from-datarep");
      }else if (event == "DownloadReports") {
        this.jump("/download-reports");
      }

      this.drawer = !this.drawer;
    },

    menuBarforId() {
      let productID = this.$store.state.agentDetails.userId;

      if (productID == 43) {
        this.condition = true;
      }
      //  else if(productID == 30){
      //    this.mopUser=true
      //  }
    },

    getNotificationData() {
      axios({
        method: "post",
        url: BaseURl + "/notifications",
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
        data: {
          userId: "1623225953967",
          limit: "10",
          offset: "0",
          lastEvaluatedKey: null,
        },
      })
        .then(function (response) {
          // this.$store.commit('NOTIFICATION_DATA',response.data.data);
          this.notificationData = response.data.data;
          // self.Tabledata = []
          // let _data = {}
          // console.log('DATA Tabledata_______:::',self.Tabledata)
        })
        .catch(function (error) {});
    },

    setpermissiontosidemenubar() {
      let menulist = this.$store.getters.getDetamenulistils;
      console.log("SIDE MENU LIST::", menulist);
      resume: for (let i = 0; i < menulist.length; i++) {
        var regex_C = new RegExp(
          "^(dashboard|dataImport|reconciliation|exceptions|journals|reports|settings|bankMaster|dataMapping|auditlog|accessControl|manualReconCases|reconRules|advancedSearch|approvalBucket|userList|auditLog)$"
        );
        if ("menuName" in menulist[i]) {
          if (regex_C.test(menulist[i].menuName)) {
            if (menulist[i].menuName === "dashboard") {
              this.showdashboard = true;
              continue resume;
            }
            if (menulist[i].menuName === "dataImport") {
              this.showdataimport = true;
              continue resume;
            }
            if (menulist[i].menuName === "reconciliation") {
              this.showreconciliation = true;
              continue resume;
            }
            if (menulist[i].menuName === "reports") {
              this.showreports = true;
              continue resume;
            }
            if (menulist[i].menuName === "settings") {
              this.showsettingpage = true;
              continue resume;
            }
            if (menulist[i].menuName === "bankMaster") {
              this.showbankmaster = true;
              continue resume;
            }
            if (menulist[i].menuName === "dataMapping") {
              this.showdatamapping = true;
              continue resume;
            }
            if (menulist[i].menuName === "auditLog") {
              this.showauditlog = true;
              continue resume;
            }
            if (menulist[i].menuName === "accessControl") {
              this.showaccesscontrol = true;
              continue resume;
            }
            if (menulist[i].menuName === "manualReconCases") {
              this.showmanualrecon = true;
              continue resume;
            }
            if (menulist[i].menuName === "reconRules") {
              this.showreconrule = true;
              continue resume;
            }
            if (menulist[i].menuName === "advancedSearch") {
              this.showadvancesearch = true;
              continue resume;
            }
            if (menulist[i].menuName === "approvalBucket") {
              this.showapprovalbucket = true;
              continue resume;
            }
            if (menulist[i].menuName === "userList") {
              this.userlist = true;
              continue resume;
            }
          }
        }
      }
    },

    home() {
      if (this.bdoadmin) {
        // this.$router.push("/newdashboard");
        this.headerVisible = false;
      } else {
        // this.$router.push("/rn-scheduler");
        this.headerVisible = true;
      }
    },

    jump(to) {
      if (this.$router) {
        this.$router.push(to);
      }
    },

    logout() {
      let User_id = this.$store.state.agentDetails.userId;

      let self = this;
      self.showLoader("Loading", true);
      axios({
        method: "post",
        url: BaseURl + "/user/logout",
        headers: {
          Authorization:
            tokenDataObj.token_type + " " + tokenDataObj.access_token,
          "Content-Type": "application/json",
        },
        data: {
          userName: self.user_name,
        },
      }).then(function (response) {
        if (response.status == 200) {
          self.showLoader("Loading", false);
          self.showToast("Successfully Logout ", "success");

          self.$store.commit("SET_AGENT_DATA", {});
          self.$store.commit("SET_BANK_DETAILS_DATA", {});
          self.$store.commit("SET_MENU_LIST_DATA", {});
          self.drawer = !self.drawer;
          self.headerVisible = false;
          localStorage.removeItem("task");
          localStorage.removeItem("TrDataLs");
          localStorage.removeItem("vue_state");
          // window.localStorage.clear();
          localStorage.clear();

          self.$router.push("/LoginView");
        } else {
          self.showLoader("Loading", false);
          self.showToast(response.data.Message, self.TOST().ERROR);
        }
      });

      // this.$store.commit('SET_AGENT_DATA', {})
      // this.$router.push('/LoginView');
      // this.showToast(resp.data.errMsg,'success',)
    },

    toClose() {
      this.showInbox = !this.showInbox;
      this.getNotificationData();
      // console.log('-toclose')
    },
    toCloseUser() {
      this.showUserInbox = !this.showUserInbox;
    },

    jumpLead(evt) {
      this.$store.commit("SET_NOTIFY_STATUS", "true");
      this.$store.commit("SET_LEADNOTIFY", evt.data);
      this.showInbox = !this.showInbox;
      this.$router.push("/rn-scheduler-status");
    },
    jumpLeadUser() {
      this.$store.commit("SET_NOTIFY_STATUS", "true");
      this.$store.commit("SET_LEADNOTIFY", evt.data);
      this.showUserInbox = !this.showUserInbox;
      this.$router.push("/rn-scheduler-status");
    },

    showNotification() {
      this.getToken();
      // // this.getNotificationData();
      // this.$emit('NOTIFICATION_RES',this.notificationData);
      this.showInbox = !this.showInbox;
      this.showInbox == true ? this.$refs.alertPanel.getToken() : "";
    },
    showUser() {
      this.showUserInbox = !this.showUserInbox;

      // this.showUserInbox == true ? this.$refs.alertPanel.getToken() : "";
    },

    // closenotifications(){
    //   this.showInbox = false;
    // },
  },
};
</script>
<style>
.notifycolor {
  background: #49d587;
  border-radius: 50px;
  height: 10px;
  width: 10px;
  position: fixed !important;
  bottom: 65% !important;
  left: 93.8% !important;
  z-index: 100 !important;
}

.manulaiconheight {
  height: 20px;
  width: 20px;
}
.headerdiv {
  padding-left: 0px;
  padding: 15px;
  padding-top: 7px;
  padding-bottom: 7px;
  /* border-radius: 60px 0px 0px 60px; */
  background-color: #07458e;
  border-width: 1px;
  border-style: solid;
  border-color: #c1c8cc;

  /* width: 200px; */
}
.themcolor {
  background-color: #152f38;
}
.thems_color {
  background-color: #ffffff !important;
}

.fntclr {
  color: #0073bb !important;
}

/* .inbox-pos {
      position: fixed;
      top: 51px;
      left: 54%;
      z-index: 11;
      width: 730px;
      height: 100px;
    } */
.v-list__group__header__prepend-icon .v-icon {
  color: #ffffff;
}

.inbox-pos {
  position: fixed;
  top: 51px;
  left: 54%;
  z-index: 11;
  width: 730px;
  height: 100px;
}
.v-list__group__header__prepend-icon .v-icon {
  color: #ffffff;
}

.my-menu {
  margin-top: 40px;
  contain: initial;
  overflow: visible;
}
.my-menu::before {
  position: absolute;
  content: "";
  top: 0;
  right: 16px;
  transform: translateY(-100%);
  width: 10px;
  height: 13px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;
}

.arrowIcon .theme--light.v-icon {
  color: #07458e;
}
</style>
