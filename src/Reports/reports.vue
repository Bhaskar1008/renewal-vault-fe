<template>
    <v-app>
        <v-content>
            <v-layout mt-5 row wrap justify-center>
                <v-card class="wrapper-card">
                    <v-layout >
                        <div class="ml-4 mt-3">
                            <v-text class="title-size">Toggle Date Range</v-text>
                        </div>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex md3 sm6 xs9 ml-5>
                          <v-menu
                            ref="menu"
                            :close-on-content-click="false"
                            v-model="menu"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="date"
                            label="Start date"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker
                            ref="picker"
                            v-model="date"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="save"
                            ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <div class="mt-4 ml-4 md1">
                          <v-text>To</v-text>
                      </div>
                      <v-flex md3 sm6 xs9 ml-4 >
                          <v-menu
                            ref="menu1"
                            :close-on-content-click="false"
                            v-model="menu1"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="date1"
                            label="End date"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker
                            ref="picker"
                            v-model="date1"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="save1"
                            ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <!-- <v-flex> -->
                        <div class="text-xs-center ml-3">
                            <v-btn round color="primary" dark>Apply</v-btn>
                        </div>
                      <!-- </v-flex> -->
                    </v-layout>
                    <v-layout >
                        <div class="ml-4 mt-3">
                            <v-text class="title-size">Download Reports</v-text>
                        </div>
                    </v-layout>
                    <v-layout row>
                        <v-card width="400px" class="ml-5 mt-3">
                            <v-card-title primary-title>
                                <div>
                                    <!-- <h3 class="">Kangaroo Valley Safari</h3> -->
                                    <v-layout row>
                                        <v-flex >
                                            <h5>Report Name</h5>
                                            <h4>Fund Report</h4>
                                        </v-flex>
                                        <v-flex ml-5  >
                                            <div class="ml-5">
                                                <h5>Data Range</h5>
                                                <h4>12/04/2018 to 31/08/2018</h4>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout mt-3 row>
                                        <v-flex>
                                            <h5>Last Download On</h5>
                                            <h4>09/04/2018</h4>
                                        </v-flex>
                                        <v-flex ml-5>
                                            <v-btn
                                                :loading="loading3"
                                                :disabled="loading3"
                                                color="blue"
                                                class="white--text"
                                                @click.native="loader = 'loading3'"
                                                >
                                                Download
                                                <v-icon right dark>get_app</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </div>
                            </v-card-title>
                        </v-card>
                        <v-card width="400px" class="ml-5 mt-3">
                            <v-card-title primary-title>
                                <div>
                                    <!-- <h3 class="">Kangaroo Valley Safari</h3> -->
                                    <v-layout row>
                                        <v-flex >
                                            <h5>Report Name</h5>
                                            <h4>Fund Report</h4>
                                        </v-flex>
                                        <v-flex ml-5  >
                                            <div class="ml-5">
                                                <h5>Data Range</h5>
                                                <h4>12/04/2018 to 31/08/2018</h4>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout mt-3 row>
                                        <v-flex>
                                            <h5>Last Download On</h5>
                                            <h4>09/04/2018</h4>
                                        </v-flex>
                                        <v-flex ml-5>
                                            <v-btn
                                                :loading="loading3"
                                                :disabled="loading3"
                                                color="blue"
                                                class="white--text"
                                                @click.native="loader = 'loading3'"
                                                >
                                                Download
                                                <v-icon right dark>get_app</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </div>
                            </v-card-title>
                        </v-card>
                    </v-layout>
                </v-card>
            </v-layout>
        </v-content>
    </v-app>
</template>
<script>
export default {
    data(){
        return{
            date: null,
            menu: false,
            date1: null,
            menu1: false
        }
    },
    watch:{
        menu (val) {
            val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
        menu1 (val) {
            val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
    },
    methods:{
        save (date) {
            this.$refs.menu.save(date)
        },
        save1 (date1) {
            this.$refs.menu1.save1(date1)
        }
    }
}
</script>
<style>
    .wrapper-card{
        width: 1200px;
        height: 700px
    }
    .title-size{
        /* font-size: 16px;
        font-family: robotoregular;
        font-weight: bold; */
        font-size: 21px;
    /* font-family:; */
    font-weight: bold;
    }

</style>
