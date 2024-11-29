<template>
  <div>
    <v-card class="py-2">
      <v-list-tile>
        <v-avatar
          color="red"
          style="height: 40px; width: 40px; margin-right: 10px"
        >
          <span class="white--text headline">{{ userName[0] }}</span>
        </v-avatar>
        <v-list-tile-content>
          <v-text
            class="white-text title font-weight-bold"
            style="font-size: 14px !important"
            >Username: {{ userName }}</v-text
          >
          <v-list-tile-title
            class="text-capitalize"
            style="font-size: 14px !important"
            >User Id: {{ userId }}</v-list-tile-title
          >
          <v-list-tile-sub-title color="#10242B"
            >Role: {{ designation }}</v-list-tile-sub-title
          >
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mt-2"></v-divider>
      <v-card-actions class="mt-1">
        <v-btn
          color="#1E9690"
          dark
          class="text-capitalize"
          block
          small
          @click="$emit('logout')"
          >Logout</v-btn
        >
      </v-card-actions>
    </v-card>
    <!-- </v-menu> -->
    <!-- </v-flex> -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

import * as config from "../common/API_Config";
let tokenDataObj = null;
export default {
  name: "userClickComponent",
  created() {
    let self = this;
    this.getToken();
    let access_list_fr = JSON.parse(localStorage.loginResp);
    let user_Name = JSON.stringify(access_list_fr.data.USER_NAME);
    self.userName = user_Name.replace(/"/g, "");
    let user_Id = JSON.stringify(access_list_fr.data.USER_ID);
    self.userId = user_Id.replace(/"/g, "");
    let user_designation = JSON.stringify(access_list_fr.data.ROLE);
    self.designation = user_designation.replace(/"/g, "");
    this.userDetails = {};
    this.userDetails = this.$store.getters.getAgentDetails;
  },
  props: {
    userMenu: {
      type: Boolean,
      default: false,
    },
    usrDtls: {
      type: Object,
    },
  },
  emits: ["logout"],
  filters: {
    nameToInitials(fullName) {
      const namesArray = fullName.split(" ");
      if (namesArray.length === 1)
        return `${namesArray[0].charAt(0).toUpperCase()}`;
      else
        return `${namesArray[0].charAt(0).toUpperCase()}${namesArray[
          namesArray.length - 1
        ]
          .charAt(0)
          .toUpperCase()}`;
    },
  },

  data() {
    return {
      userDetails: {},
      userName: "",
      userId: "",
      designation: "",
      user_name: "",
      headerVisible: true,
    };
  },

  methods: {
    getToken() {
      let self = this;
      axios
        .post(
          config.oAuthURl,
          `grant_type=${config.tokenCred.grantType}&client_id=${config.tokenCred.clientId}&client_secret=${config.tokenCred.clientSecret}`
        )
        .then((res) => {
          let access_list_fr = JSON.parse(localStorage.loginResp);
          let lob_list = JSON.stringify(access_list_fr.data.LOB);
          console.log(self.userName,"user mane")
          if (res.status == 200) {
            console.log(self.userName,"user mane")
            tokenDataObj = res.data;
            let access_list_fr = JSON.parse(localStorage.loginResp);
            self.user_name = access_list_fr.data.USER_NAME;
          }
        })
        .catch((error) => {});
    },
  },
};
</script>


<style>
</style>
