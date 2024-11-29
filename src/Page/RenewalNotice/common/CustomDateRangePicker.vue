<template>
  <v-dialog persistent v-model="open" overlay scrollable max-width="400">
    <v-card tile>
      <v-toolbar dark style="background-color: #0073bb; height: 35px">
        <v-toolbar-title
          style="color: white; margin-bottom: 25px; font-size: 15px"
          >Select</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn
          icon
          light
          @click="$emit('onClose')"
          style="color: white; margin-bottom: 28px"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-menu bottom right offset-y></v-menu>
      </v-toolbar>
      <div>
        <v-form ref="formdata">
          <v-layout class="pl-3 pt-4 d-flex justify-space-between" xs6 row wrap>
            <v-flex xs3 class="ml-1 cust_pr">
              <v-layout column class="dateRange">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  From Date <span>*</span>
                </p>
                <v-menu
                  ref="calender"
                  v-model="expiryPeriodFromMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                  class="rounded-0"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      slot="activator"
                      label="YYYY/MM/DD"
                      v-model="expiryDateFrom"
                      solo
                      class="rounded-0"
                      readonly
                      maxlength="10"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <div slot="prepend-inner" class="img-cal">
                        <img
                          class="pa-1"
                          style="height: 35px"
                          src="../../../assets/date_24X24.png"
                        />
                      </div>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    @input="expiryPeriodFromMenu = false"
                    v-model="expiryDateFrom"
                    no-title
                  ></v-date-picker>
                </v-menu>
              </v-layout>
            </v-flex>
            <v-layout column class="ml-5 dateRange">
              <v-flex xs3 class="ml-5 cust_pr dateRange">
                <p class="font-weight-bold mb-1 caption" style="color: #646666">
                  To Date <span>*</span>
                </p>
                <v-menu
                  ref="calender"
                  v-model="expiryPeriodToMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                  class="rounded-0"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      slot="activator"
                      label="YYYY/MM/DD"
                      v-model="expiryDateTo"
                      solo
                      class="rounded-0"
                      readonly
                      maxlength="10"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <div slot="prepend-inner" class="img-cal">
                        <img
                          class="pa-1"
                          style="height: 35px"
                          src="../../../assets/date_24X24.png"
                        />
                      </div>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    @input="expiryPeriodToMenu = false"
                    v-model="expiryDateTo"
                    no-title
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-layout>
          <v-layout
            class="pa-2"
            style="position: relative; bottom: 15px; float: right"
          >
            <v-btn
              flat
              class="ma-2 pa-3 btn clear-btn"
              color="#646666"
              @click="$emit('onClose')"
              dark
              small
            >
              Close
            </v-btn>

            <v-btn
              flat
              class="ma-2 pa-3 btn update-btn"
              color="#0073BB"
              dark
              small
              @click="
                $emit('onCustomDateRangeHandler', expiryDateFrom, expiryDateTo)
              "
              >Update
            </v-btn>
          </v-layout>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>
 
<script>
export default {
  props: ["open", "data"],
  emits: ["onClose","onCustomDateRangeHandler"],
  data() {
    return {
      expiryPeriodFromMenu: false,
      expiryPeriodToMenu: false,
      expiryDateTo: this.data.expiryDateTo,
      expiryDateFrom: this.data.expiryDateFrom,
    };
  },
};
</script>

<style scoped>
.btn {
  width: 100px;
  height: 30px;

  border-radius: 4px;
}
.update-btn {
  background-color: #0073bb;
  color: #ffffff !important;
  border: 1.5px solid #0073bb;
}
.clear-btn {
  color: #0073bb !important;
  background-color: #ffffff !important;
  border: 1.5px solid #ccc;
}
.img-cal {
  position: relative;
  right: -1px;
  margin-top: -10px;
  background-color: #f7f7f7;
  margin-left: -12px;
}

.dateRange {
  width: 170px;
}
</style>