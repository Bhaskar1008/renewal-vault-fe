 <template>
  <v-dialog v-model="showModel" overlay persistent scrollable max-width="300">
    <v-card tile>
      <v-toolbar dark style="background-color: #0073bb; height: 35px">
        <v-toolbar-title
          style="color: white; margin-bottom: 25px; font-size: 15px"
          >Change Password</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn
          icon
          light
          @click="onClose"
          style="color: white; margin-bottom: 28px"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-menu bottom right offset-y></v-menu>
      </v-toolbar>
      <div>
        <v-form ref="formdata">
          <v-layout
            class="ml-3 mt-3"
            style="display: flex; flex-direction: column"
          >
            <v-flex xs3 class="ml-1 cust_pr">
              <v-layout column class="dateRange">
                <p class="font-weight-bold caption" style="color: #646666">
                  New Password <span>*</span>
                </p>
                <v-text-field
                  class="rounded-0"
                  v-model="password"
                  label="Enter..."
                  solo
                  :rules="passwordRules"
                >
                </v-text-field>
              </v-layout>
            </v-flex>

            <v-flex xs3 class="ml-1 cust_pr">
              <v-layout column class="dateRange">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  Confirm New-Password again <span>*</span>
                </p>
                <v-text-field
                  class="rounded-0"
                  v-model="confirmPassword"
                  label="Enter..."
                  solo
                  :rules="confirmPasswordRules"
                >
                </v-text-field>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout style="position: relative; bottom: 15px; float: right">
            <v-btn
              flat
              style="
                width: 100px;
                height: 30px;
                background-color: #ffffff;
                color: #646666;
                border: 1.5px solid #ccc;
                border-radius: 3px;
              "
              @click="onClose"
              class="ma-2 pa-3"
              color="#646666"
              dark
              small
            >
              <v-divider vertical class="mr-2"></v-divider>cancel
            </v-btn>
            <v-btn
              flat
              style="
                width: 100px;
                height: 30px;
                background-color: #0073bb;
                color: #ffffff;
                border: 1.5px solid #ccc;
                border-radius: 4px;
              "
              class="ma-2 pa-3"
              color="#0073BB"
              dark
              small
              @click="passwordConfirmationRule"
              >Update
            </v-btn>
          </v-layout>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>


<script>
import { apiService } from "./common/common";

export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      passwordRules: [(v) => !!v || "Password is required"],
      confirmPasswordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    passwordConfirmationRule() {
      let self = this;
      if (this.password == this.confirmPassword) {
        this.changePasswordHandler();
      } else {
        self.showToast("New password didn't match", self.TOST().WARNING);
      }
    },
    changePasswordHandler() {
      let self = this;
      const userData = JSON.parse(localStorage.loginResp);
      let payload = {
        updatedBy: userData.data.ROLE,
        username: self.username,
        password: this.password,
      };
      apiService("post", "/change/password", payload)
        .then((res) => {
          const { status, msg } = res.data;
          if (status === 200) {
            self.showToast(msg, self.TOST().SUCCESS);
            self.onClose();
          } else {
            self.showToast(msg, self.TOST().WARNING);
          }
        })
        .catch((err) => {
          self.showToast("Failed to change the password", self.TOST().WARNING);
        });
    },
  },
  props: ["showModel", "onClose", "username"],
};
</script>

<style scoped>
.dateRange {
  width: 250px;
}
</style>