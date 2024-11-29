<template>
   <v-app>
        <v-layout>
           
            <v-flex xs12 sm6 offset-sm3>
                <v-card class="xu-card">
                    <div class="regPage-heading">
                     <h2>Sign Up</h2>
                    </div>                   
                    <v-form v-model="valid">
                        <v-text-field
                            label="Name"
                            v-model="name"
                            :rules="nameRules"
                            :counter="20"
                            required>
                        </v-text-field>

                        <v-text-field
                            label="Email"
                            v-model="email"
                            :rules="emailRules"
                            :counter="10"
                            required>
                        </v-text-field>


                        <v-text-field
                            name="input-10-1"
                            label="Password"
                            hint="At least 8 characters"
                            v-model="password"
                            min="8"
                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (e1 = !e1)"
                            :type="e1 ? 'password' : 'text'"
                            counter="8"
                            required>
                        </v-text-field>
                
                    
                    </v-form>
                  
                    <v-card-actions >
                        
                        <v-btn class="regPage-btn" block color="primary" @click.native="otpdialog = true" >Register</v-btn>
                        <v-btn class="regPage-btn" block color="primary" @click="addTable" >Table </v-btn>
                    </v-card-actions>
                    <div class="regPage-link">
                        <router-link to="/LoginView"> already have an account? <a href="LoginView" @click="navigateTologin">login.</a></router-link>
                    </div>
                    <!-- table view Example button start-->
                        <!-- <div class="regPage-link">
                        <router-link to="/TableInfo"> Want to go table view? <a href="TableInfo" @click="TableInfopage()">Go TO Table.</a></router-link>
                    </div> -->
                    <!-- table viwe example button end -->
                        <v-dialog v-model="otpdialog" max-width="450">
                                <v-card>
                                    <v-card-title class="heading-OTP">Please Enter the OTP to Verify your Account</v-card-title>
                                    <v-card-text>OTP(One Time Password) has been Sent to this Email iorta@gmail.com</v-card-text>
                <div class="OTP-textField-pading">
                            <v-text-field 
                                label="Enter OTP"
                                v-model="value"
                                :rules="OTPRules"
                                :type="e5 ? 'password' : number"
                                maxlength="4"  id="pin" pattern="^0[1-9]|[1-9]\d$" 
                                @input="OtpCheck()"
                                required
                            ></v-text-field>
                            
                </div>
                
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <!-- <v-btn @click.native="entryToLogin()" value="Finish" color="primary">Validate OTP</v-btn> -->
                                        <v-btn flat color="normal" @click.native="RsendOTP()">Resend OTP</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            
                            <v-dialog v-model="RsendOTPdialog" max-width="450">
                                    <v-card>
                                        
            
                                        <v-card-text>OTP(One Time Password) has been Resend Successfully.</v-card-text>
                                        
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="normal" @click.native="resendok()">Ok</v-btn>
                                            
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                
                </v-card>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            otpdialog: false,
            RsendOTPdialog: false,
            e5: true,
            OTPvalue: '1234',
            value: '',
            e1: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 20 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            name: '',
            OTPRules: [
                v => !!v || 'OTP is Required',
            ],
        }),
        methods: {
            resendok() {
                if (this.otpdialog == false) {
                    this.otpdialog = true;
                    this.RsendOTPdialog = false;
                }
            },
            RsendOTP() {
                if (this.otpdialog == true) {
                    this.otpdialog = false;
                    this.RsendOTPdialog = true;
                }

            },
            OtpCheck() {
                     if(this.value.length === 4) {
                    if (this.value === this.OTPvalue) {
                        alert("you are regidtered successfully")
                    } else {
                        alert("OTP dosnt Match")
                    }
                } 
            },
            navigateTologin()
            {
                this.$router.push('/LoginView');
            },
            addTable(){
                 this.$router.push('/Table');
            }
            // end table function example


         }

    }
</script>

<style scoped>
    .xu-card {
        padding: 20px;
        position: relative;
        width: 400px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .nx-flex-row {
        flex-direction: row;
        /* flex-wrap: wrap; */
    }
    
    .OTP-textField-pading {
        padding: 20px;
    }
    
    .heading-OTP {
        font-size: 18px;
        font-weight: bold;
    }
    
    .regPage-btn {
        margin-top: 30px;
    }
    
    .regPage-heading {
        color: #2e81e8;
        text-align: center;
        margin-bottom: 30px;
    }

    .regPage-link{
        text-align: center;
    }
</style>