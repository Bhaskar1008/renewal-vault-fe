<template>
  <v-app>
    <v-content style="padding: 50px 0px 0px">
      <!-- <div class="_app-mx-width"> -->
      <v-container style="max-width: 1400px; padding: 0px">
        <!-- All Routes show here -->

        <header-sale-admin v-if="headerVisible === true"></header-sale-admin>
        <header-sale-admin-login v-else></header-sale-admin-login>
        <snackbar-store></snackbar-store>
        <loader></loader>
        <confirm-box></confirm-box>
        <sessionexpired></sessionexpired>
        <!-- <web-cam></web-cam> -->

        <!-- <div class="_app-mx-width"> -->
        <router-view />
        <!-- </div> -->
      </v-container>
      <!-- </div> -->
    </v-content>
  </v-app>
</template>

<script>
// import webCam from './Page/web-cam'
import appLoginPage from "./Page/LoginView.vue";
import registrationPage from "./Page/RegistrationPage.vue";
import snackbarStore from "./Page/snackbars.vue";
import headerSaleAdmin from "./component/Header-SalesAdmin.vue";
import headerSaleAdminLogin from "./component/header_salesAdmin_login.vue";
import Loader from "./component/loader";
import confirmBox from "./component/confirm-dialog";
import sessionexpired from "./component/logoutDialog";

export default {
  name: "AppComponent",
  created() {
    let self = this;
    this.$forceUpdate()

    if (self.$socket) {
      self.$socket.on("message", (data) => {
        self.$socket.emit("reply", { client: "Hey I am client" });
      });
    }
  },

  mounted() {
    let dup_route = {
      fullPath: this.$route.fullPath,
      name: this.$route.name,
      params: this.$route.params,
      path: this.$route.path,
    };
    let route_split = dup_route.fullPath.split("/");
    dup_route.route_name = route_split[1];

    let adminitis = this.$store.getters.getAgentDetails;
    let defaultRoute = "";

    if (adminitis.product_sd_code === "01") {
      defaultRoute = "/proptab";
    } else if (adminitis.product_sd_code === "02") {
      defaultRoute = "/datamapping";
    } else if (adminitis.product_sd_code === "04") {
      defaultRoute = "/maindashboard";
    } else {
      defaultRoute = "/datamapping";
    }
    this.userAuthenticated();
  },

  data() {
    return {
      headerVisible: false,
      routeforLogin: "",
    };
  },
  components: {
    appLoginPage,
    registrationPage,
    snackbarStore,
    headerSaleAdmin,
    headerSaleAdminLogin,
    Loader,
    confirmBox,
    sessionexpired,
  },
  created() {
    this.userAuthenticated();
  },
  methods: {
    checkAuthen() {
      let agentEnable = this.$store.getters.getAgentDetails;

      if (Object.keys(agentEnable).length !== 0) {
        return true;
      } else if (Object.keys(agentEnable).length === 0) {
        return false;
      }
    },
    userAuthenticated() {
      try {
        if (localStorage.loginResp) {
          let userData = JSON.parse(localStorage.loginResp);
          if (userData.token) {
            this.headerVisible = true;
          } else {
            this.headerVisible = false;
            this.$router.push("/LoginView");
          }
        } else {
          this.headerVisible = false;
          this.$router.push("/LoginView");
        }
      } catch (err) {
        this.headerVisible = false;
        this.$router.push("/LoginView");
      }
    },
  },
  watch: {
    $route: function (to, from) {
      this.userAuthenticated();
      this.routeforLogin = this.$router.history.current.fullPath;
      this.commit("LINKS", this.routeforLogin);
      // this.headerVisible = false;
      let adminitis = this.$store.getters.getAgentDetails;
      this.showLoader("", false);
      let defaultRoute = "";
      if (adminitis.product_sd_code === "01") {
        defaultRoute = "/proptab";
      } else if (adminitis.product_sd_code === "02") {
        defaultRoute = "/datamapping";
      } else if (adminitis.product_sd_code === "04") {
        defaultRoute = "/maindashboard";
      } else {
        this.userAuthenticated();
      }
    },
  },
};
</script>

<style>
  @import './assets/css/formulate.css';

._app-wrper {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

._app-mx-width {
  max-width: 2080px;
}

div.jsoneditor-menu {
    display: none !important;
    width: 100%;
    height: 35px;
    padding: 2px;
    margin: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: white;
    background-color: black;
    border-bottom: 1px solid #3883fa;
    }
</style>
