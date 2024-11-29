import axios from 'axios';

let initialLeadBodyStructure = {
    leadStatus: "newleadentery",
    leadDisposition: "",
    leadsubDisposition: "",
    appointment_status: "",
    appointmentdisPosition: "",
    appointmentsubdisPosition: "",
    start_date: "",
    start_time: "",
    remarksfromUser: "",
    remarksfromSource: "",
    teamMembers: "[]",
    lead_Owner_Id: null,
    lead_Creator_Id: null,
    user_id: null,
    firstName: "",
    lastName: "",
    email: "",
    primaryMobile: "",
    state: "",
    city: "",
    line1: "",
    line2: "",
    line3: "",
    country: "India",
    pincode: null,
    secondaryMobile: null,
    landlineNo: null,
    socialSecurityAdharNo: "",
    mailingAddressStatus: "No",
    mailingAddressSecond: "{\"mailingaddress\":{\"line1\":\"\",\"line2\":\"\",\"line3\":\"\"},\"state\":\"\",\"city\":\"\",\"country\":\"India\",\"pincode\":\"\"}",
    dob: "",
    gender: "",
    maritalStatus: "",
    childStatus: "",
    ChildInfo: "[]",
    education: "",
    incomeGroup: "",
    annuaLincome: null,
    professionType: "",
    productCategory: "",
    productType: "",
    solution: "",
    expectedPremium: "",
    expectedclosureDate: "",
    HaveLifeInsurance: {
        ExistInsur: "No",
        ExistHealthInsur: "No"
    },
    SumAssured: "",
    Insurance: "",
    Insurancedetails: "[]",
    riskComensmentDate: null,
    HaveLifeInsurance_details: "[]",
    camapignName: "",
    leadSource: "",
    affiliateMasterId: "",
    channelCode: "",
    LeadId: ""
}

/**
 *
 * @param {Array | Object} store
 * @function generateFormDate
 * @returns form data which is object type
 * @description Before hitting API's PUT or POST first we need to maintain formdata send through API in then request body.
 */
let generateFormDate = function(updateStore) {
    let copy_initialLeadBodyStructure = JSON.parse(JSON.stringify(initialLeadBodyStructure));

    for (let props in copy_initialLeadBodyStructure) {
        copy_initialLeadBodyStructure[props] = updateStore[props];
    }

    return copy_initialLeadBodyStructure;
}



let updateLead = function(self, formData, callback) {
    console.log("Update LEad Data", formData.LeadId);
    let id = formData.LeadId;
    self.PUTUSER('updateLead/' + id, formData, (res, error) => {
        /**
         * Enhacement 17/08/2019
         */
        if (error) {
            console.log("ERROR PUT API", err)
            self.showToast('Something goes wrong', self.TOST().ERROR);
            callback(null, "0");
            return;
        } else {
            console.log("Update Response Data", res);
            responseValidation(self, res.data)
                .then(success => {

                    /**
                     *
                     */
                    self.showToast('Lead updated successfully', self.TOST().SUCCESS);
                    callback(res.data, "1");
                    self.$router.push('/ActivityLeadUpload')
                        // console.log('Response : ' , res);

                })
                .catch(reject => {})
        }

    })
}
let submitleaddata = function(self, formData, callback) {
    const CREAT_LEAD = self.API_Service() + 'addLead'
    self.POSTUSER('addLead', formData, (resp, error) => {
        if (error) {
            self.showToast('Something goes wrong', self.TOST().ERROR);
            callback(null, "0");
        } else {
            responseValidation(self, resp.data)
                .then(success => {
                    self.commit('LED_PUT_POST', 'PUT')
                        // self.$router.push('/ActivityLeadUpload')
                    console.log(resp.data);
                    callback(resp.data, 1);
                })
                .catch(reject => {

                })
        }
    })
}

let responseValidation = function(self, response) {
    return new Promise((resolve, reject) => {
        if (response.errCode === 4) {
            self.showLoader('Loading', false);
            self.showToast('Database Error', self.TOST().ERROR);
            return;
        }
        if (response.errCode === 9) {
            self.showLoader('Loading', false);
            self.showToast('Contact no. already exists', self.TOST().ERROR);
            return;
        }
        if (response.errCode === 16) {
            self.showLoader('Loading', false);
            self.showToast('Appointment not booked', self.TOST().INFO);
            return;
        }
        if (response.errCode === 1) {
            self.showLoader('Loading', false);
            self.showToast('Mandatory fields are not found', self.TOST().WARNING);
            return;
        }
        if (response.errCode === 576) {
            self.showLoader('Loading', false);
            self.showToast(response.errMsg, self.TOST().ERROR);
            reject(1);
            return;
        }
        if (response.errCode === 729) {
            self.showLoader('Loading', false);
            self.showToast('Appointment already exist on same time', self.TOST().INFO);
            reject(1);
            return;
        }
        if (response.errCode === 625) {
            self.showLoader('Loading', false);
            self.showToast(response.errMsg, self.TOST().ERROR);
            reject(1);
            return;
        }
        if (response.errCode === 533) {
            self.showLoader('Loading', false);
            self.showToast(response.errMsg, self.TOST().ERROR);
            reject(1);
            return;
        }
        if (response.errCode === -1) {
            self.showLoader('Loading', false);
            resolve();
        }
    });
}


export default {
    initialLeadBodyStructure,
    generateFormDate,
    responseValidation,
    updateLead,
    submitleaddata
}