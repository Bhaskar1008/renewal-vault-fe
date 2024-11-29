<template>
  <div>
    <v-layout class="cardwhitebackclr pa-3" align-center> </v-layout>

    <v-form ref="formData"> </v-form>

    <v-layout
      class="pa-2"
      style="position: relative; bottom: 40px; float: right"
    >
      <v-btn
        flat
        style="
          width: 80px;
          height: 35px;
          background-color: #0073bb;
          color: #ffffff;
          border: 1.5px solid #ccc;
          border-radius: 4px;
        "
        class="ma-1 pa-3"
        dark
        small
        @click="dialog = true"
      >
        Search
      </v-btn>
    </v-layout>

    <template>
      <v-dialog persistent v-model="dialog" overlay scrollable max-width="550">
        <v-card tile>
          <v-toolbar dark style="background-color: #0073bb; height: 38px">
            <v-toolbar-titlestyle
              style="color: white; margin-bottom: 24px; font-size: 15px"
              >Search</v-toolbar-titlestyle
            >
            <v-spacer></v-spacer>
            <v-btn
              icon
              light
              @click="
                dialog = false;
                $emit('clearHandler');
              "
              style="color: white; margin-bottom: 24px"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-menu bottom right offset-y></v-menu>
          </v-toolbar>

          <div>
            <v-form ref="formdata">
              <v-layout class="pl-3 pt-4 cust_pr" xs12 row wrap>
                <v-flex xs12 class="pr-3">
                  <p
                    class="font-weight-bold ml-2 mb-1 caption"
                    style="color: #64666"
                  >
                    Policy Number
                  </p>
                  <v-text-field
                    @keypress="isNumber($event)"
                    class="rounded-0"
                    solo
                    v-model="filterData.policyNo"
                    label="Enter Policy Number"
                  >
                  </v-text-field>
                </v-flex>
                <!-- <v-flex xs3 class="ml-5">
                  <p
                    class="font-weight-bold ml-1 mb-1 caption"
                    style="color: #64666"
                  >
                    Product ID
                  </p>
                  <v-text-field
                    class="rounded-0"
                    @keypress="isNumber($event)"
                    solo
                    v-model="productID"
                    label="Enter Product ID"
                    style="width: 158px"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs3 class="ml-5 mr-3">
                  <p
                    class="font-weight-bold ml-2 mb-1 caption"
                    style="color: #64666"
                  >
                    Producer
                  </p>
                  <v-text-field
                    class="rounded-0"
                    @keypress="isNumber($event)"
                    solo
                    v-model="producer"
                    label="Producer"
                    style="width: 158px"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout xs12 row wrap>
                <v-flex xs3 class="ml-3" style="margin-top: -26px">
                  <p
                    class="font-weight-bold ml-2 mb-1 caption"
                    style="color: #64666"
                  >
                    Registration No.
                  </p>
                  <v-text-field
                    class="rounded-0"
                    solo
                    v-model="registrationNo"
                    @keypress="removeSpecialCharacters($event)"
                    label="Registration No."
                    style="width: 158px; height: 35px"
                  >
                  </v-text-field>
                </v-flex> -->
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
                  @click="
                    dialog = false;
                    $emit('clearHandler');
                  "
                  class="ma-2 pa-3"
                  color="#646666"
                  dark
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
                  @click="
                    dialog = false;
                    $emit('filterHandler');
                  "
                >
                  <v-divider vertical class="mr-2"></v-divider>Search
                </v-btn>
              </v-layout>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
export default {
  name: "RvAndDataRepFilterForm",
  props: ["filterData"],
  emits: ["filterHandler", "clearHandler"],
  created() {},
  data() {
    return {
      dialog: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>