<template>
  <v-app style="overflow: hidden">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="xu-card">
          <h1 class="mb-2 mt-1 loginView-title">LOGIN</h1>
          <v-tabs
            centered
            class="tabs-color"
            v-model="currentItem"
            slider-color="#111"
          >
            <v-tab
              v-for="item in items"
              :key="item.value"
              :href="'#tab-' + item.value"
            >
              {{ item.label }}
            </v-tab>
          </v-tabs>
          <hr class="mb-4" style="border: 0.5 solid #c1c8cc" />
          <v-form v-model="valid">
            <v-layout row style="display: flex">
              <div
                style="
                  background-color: #23b1a9;
                  width: 50px;
                  height: 43px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  box-shadow: 0px 2px 2px #00000051;
                "
              >
                <img
                  src="../assets/User_83242x.png"
                  style="width: 30px; height: 30px"
                />
              </div>

              <v-text-field
                class="custom-txt custom-placeholer-color"
                outline
                v-if="currentItem == 'tab-ntid'"
                label="Enter NTID"
                maxlength="60"
                v-model="loginData.ntid"
                browser-autocomplete="off"
                required
                style="height: 40px"
              ></v-text-field>
              <v-text-field
                class="custom-txt custom-placeholer-color"
                v-if="currentItem == 'tab-username'"
                outline
                label="Enter User Name"
                maxlength="60"
                v-model="loginData.email"
                browser-autocomplete="off"
                required
                style="height: 40px"
              ></v-text-field>
            </v-layout>

            <v-layout row style="margin-top: 20px; display: flex">
              <div
                style="
                  background-color: #23b1a9;
                  width: 50px;
                  height: 43px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  box-shadow: 0px 2px 2px #00000051;
                "
              >
                <img
                  src="../assets/Password_83232x.png"
                  style="width: 30px; height: 30px"
                />
              </div>
              <v-text-field
                class="custom-txt-pswd custom-placeholer-color"
                label="Enter your password"
                outline
                v-model="loginData.password"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                browser-autocomplete="on"
                required
                @keyup.enter="mockLogin"
                style="height: 40px"
              >
              </v-text-field>
            </v-layout>

            <div
              v-html="captchaImage"
              style="margin-left: 100px; margin-top: 10px"
            ></div>

            <div style="display: flex; justify-content: center">
              <v-text-field
                v-model="captchaText"
                solo
                placeholder="Enter Captcha"
                style="width: 160px; margin-top: 15px; margin-bottom: -30px"
              >
                <template v-slot:append>
                  <v-icon
                    style="width: 50px; height: 50px; margin-top: 10 px"
                    @click="loadCaptcha()"
                    >mdi-refresh</v-icon
                  >
                </template>
              </v-text-field>
            </div>

            <v-checkbox
              :label="`Remember me`"
              v-model="rememberMe"
              color="primary"
            ></v-checkbox>
          </v-form>
          <v-card-actions class="pa-0">
            <v-btn
              class="loginView-tile"
              block
              color="#E46A25"
              dark
              @click="mockLogin"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      currentItem: "tab-ntid",
      items: [
        { label: "Login with NTID & Password", value: "ntid" },
        {
          label: "Login with Username & Password",
          value: "username",
        },
      ],
      e1: true,
      valid: false,
      rememberMe: false,
      captchaImage: "<img src='../assets/captcha.png' />",
      captchaText: "",
      loginData: {
        ntid: "",
        email: "",
        password: "",
      },
      responseOfLogin: "",
      routerPage: {
        FR2: "/collection-processing",
        FR3: "/batch-status",
      },
    };
  },

  methods: {
    loadCaptcha() {
      // Mocked captcha load
      this.captchaImage = "<img src='../assets/captcha.png' />";
      this.captchaText = "";
    },

    mockLogin() {
      const defaultAccessList = [
        {
          id: "FR2",
          page: "Collection and Processing",
          feature: [
            {
              id: "FR2-F1",
              name: "Schedule a Batch",
            },
            {
              id: "FR2-F2",
              name: "Batch report in Table and download",
            },
          ],
        },
        {
          id: "FR3",
          page: "Batch Status",
          feature: [
            {
              id: "FR3-F1",
              name: "Re-schedule a batch",
            },
            {
              id: "FR3-F2",
              name: "Batch report in Table",
            },
          ],
        },
      ];

      if (this.loginData.password === "test") {
        this.responseOfLogin = {
          status: "Success",
          data: {
            ACCESS_LIST: defaultAccessList,
          },
        };
        localStorage.setItem("loginResp", JSON.stringify(this.responseOfLogin));
        this.$router.push(this.routerPage["FR2"]);
      } else {
        this.$emit("showSnackbar", {
          text: "Username or Password is incorrect",
          color: "black",
        });
        this.loadCaptcha();
      }
    },
  },
};
</script>

<style>
.iconstyledropdown {
  background-color: #111;
}
.v-text-field--box > .v-input__control > .v-input__slot,
.v-text-field--outline > .v-input__control > .v-input__slot {
  align-items: stretch;
  min-height: 45px;
}

.v-text-field.v-text-field--enclosed .v-text-field__details,
.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  padding: 0 12px;
  height: 40px;
}
.v-text-field.v-text-field--enclosed .v-input__append-inner,
.v-text-field.v-text-field--enclosed .v-input__append-outer,
.v-text-field.v-text-field--enclosed .v-input__prepend-inner,
.v-text-field.v-text-field--enclosed .v-input__prepend-outer {
  margin-top: 10px;
}
.xu-card {
  padding: 20px;
  position: relative;
  width: 430px;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
}
.v-tabs__item {
  font-size: 10px;
}
.v-tabs__wrapper {
  padding: 0px !important;
  margin: 0px !important;
}
.custom-txt .v-input__slot {
  border-radius: 0px !important;
  border: 1px solid #c1c8cc !important;
  border-left: 0px !important;
}

.custom-txt .v-input__control .v-input__slot {
  background-color: #f7f7f7 !important;
  height: 40px !important;
}
.custom-txt-pswd .v-input__slot {
  border-radius: 0px !important;
  border: 1px solid #c1c8cc !important;
  border-left: 0px !important;
}

.custom-txt-pswd .v-input__control .v-input__slot {
  background-color: #f7f7f7 !important;
}

.custom-placeholer-color .v-label {
  color: #8a8a8a !important;
  font-family: Roboto;
  opacity: 1;
  top: 11px;
}

.login-margin-tp {
  margin-top: 0px;
  margin-bottom: 25px;
}

.nx-flex-row {
  display: flex;
  flex-direction: row;
}
.loginView-tile {
  font-size: 16px;
  font-weight: bold;
  font-family: "Segoe UI";
  padding: 10px 0px;
  color: white;
}

.loginView-title {
  font-size: 36px;
  color: #111;
  text-align: center;
}

.tabs-color .v-tab {
  color: #111 !important;
  font-size: 15px;
  font-weight: normal;
  font-family: "Segoe UI" !important;
  margin-left: 10px;
}

.v-tabs__item {
  letter-spacing: 0px !important;
  line-height: 18px;
}

.loginView-footer {
  margin-top: 60px;
  text-align: center;
  font-size: 12px;
}
</style>
