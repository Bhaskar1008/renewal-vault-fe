<template>
  <v-dialog v-model="open" overlay persistent scrollable max-width="540">
    <v-card tile>
      <v-toolbar dark style="background-color: #0073bb; height: 35px">
        <v-toolbar-title
          style="color: white; margin-bottom: 24px; font-size: 15px"
          >Search</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn
          icon
          light
          @click="$emit('onCloseSearch')"
          style="color: white; margin-bottom: 24px"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-menu bottom right offset-y></v-menu>
      </v-toolbar>

      <div>
        <v-form ref="formdata">
          <v-layout class="pl-3 pt-4" xs12 row wrap>
            <v-flex xs3 class="cust_pr">
              <p
                class="font-weight-bold ml-2 mb-1 caption"
                style="color: #64666"
              >
                Policy Number
              </p>
              <v-text-field
                class="rounded-0"
                solo
                v-model="policyNo"
                label="Enter Policy Number"
                style="width: 158px"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="ml-5 cust_pr">
              <p
                class="font-weight-bold ml-2 mb-1 caption"
                style="color: #64666"
              >
                Channel
              </p>
              <v-text-field
                @paste.prevent
                class="rounded-0"
                solo
                v-model="channel"
                label="Enter Channel"
                style="width: 158px"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="ml-5 cust_pr">
              <p
                class="font-weight-bold ml-1 mb-1 caption"
                style="color: #64666"
              >
                Producer Code
              </p>
              <v-text-field
                class="rounded-0"
                solo
                v-model="producerCode"
                label="Enter Product code"
                style="width: 158px"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout
            class="pa-2"
            style="position: relative; bottom: 20px; float: right"
          >
            <v-btn
              flat
              style="
                width: 100px;
                height: 35px;
                background-color: #ffffff;
                color: #646666;
                border: 1.5px solid #ccc;
                border-radius: 3px;
              "
              class="ma-2 pa-3"
              color="#646666"
              dark
              @click="resetData"
              small
            >
              <v-divider vertical class="mr-2"></v-divider>Clear
            </v-btn>
            <v-btn
              flat
              style="
                width: 100px;
                height: 35px;
                background-color: #0073bb;
                color: #ffffff;
                border: 1.5px solid #ccc;
                border-radius: 4px;
              "
              class="ma-2 pa-3"
              color="#0073BB"
              dark
              small
              @click="$emit('onSearchHandler', policyNo, channel, producerCode)"
            >
              <!-- handler that should be in parent -->
              <v-divider vertical class="mr-2"></v-divider>Search
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
  emits: ["onCloseSearch", "onSearchHandler"],
  data() {
    return {
      policyNo: this.data.policyNo,
      channel: this.data.channel,
      producerCode: this.data.producerCode,
    };
  },
  methods: {
    resetData() {
      this.$refs.formdata.reset();
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    // isCharacter(evt)
    //   {
    //   evt = (evt) ? evt : event;
    //    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
    //       ((evt.which) ? evt.which : 0));
    //    if (charCode > 31 && (charCode < 65 || charCode > 90) &&
    //       (charCode < 97 || charCode > 122)) {
    //       evt.preventDefault();
    //       return false;
    //    }
    //    return true;
    //   }
  },
};
</script>

<style scoped>
</style>
