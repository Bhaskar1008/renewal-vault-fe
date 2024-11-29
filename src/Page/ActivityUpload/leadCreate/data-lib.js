export const START_TIME_LIST = [
    {
        dispValue: "8:00 AM",
        value: "28800000"
    }, {
        dispValue: "8:30 AM",
        value: "30600000"
    }, {
        dispValue: "9:00 AM",
        value: "32400000"
    }, {
        dispValue: "9:30 AM",
        value: "34200000"
    }, {
        dispValue: "10:00 AM",
        value: "36000000"
    }, {
        dispValue: "10:30 AM",
        value: "37800000"
    }, {
        dispValue: "11:00 AM",
        value: "39600000"
    }, {
        dispValue: "11:30 AM",
        value: "41400000"
    }, {
        dispValue: "12:00 PM",
        value: "43200000"
    }, {
        dispValue: "12:30 PM",
        value: "45000000"
    }, {
        dispValue: "1:00 PM",
        value: "46800000"
    }, {
        dispValue: "1:30 PM",
        value: "48600000"
    }, {
        dispValue: "2:00 PM",
        value: "50400000"
    }, {
        dispValue: "2:30 PM",
        value: "52200000"
    }, {
        dispValue: "3:00 PM",
        value: "54000000"
    }, {
        dispValue: "3:30 PM",
        value: "55800000"
    }, {
        dispValue: "4:00 PM",
        value: "57600000"
    }, {
        dispValue: "4:30 PM",
        value: "59400000"
    }, {
        dispValue: "5:00 PM",
        value: "61200000"
    }, {
        dispValue: "5:30 PM",
        value: "63000000"
    }, {
        dispValue: "6:00 PM",
        value: "64800000"
    }, {
        dispValue: "6:30 PM",
        value: "66600000"
    }, {
        dispValue: "7:00 PM",
        value: "68400000"
    }, {
        dispValue: "7:30 PM",
        value: "70200000"
    }, {
        dispValue: "8:00 PM",
        value: "72000000"
    }, {
        dispValue: "8:30 PM",
        value: "73800000"
    }, {
        dispValue: "9:00 PM",
        value: "75600000"
    }, {
        dispValue: "9:30 PM",
        value: "77400000"
    }
]


export const LEAD_STATUS_LIST = [
    {
        value: "newleadentery",
        dispValue: "New Lead Entry"
    }, {
        value: "nocontact",
        dispValue: "No Contact"
    }, {
        value: "contact",
        dispValue: "Contact"
    }
]

export const CONTACT_DISPOSITIONS = [
    {
        value: "appointment",
        dispValue: "Appointment"
    }, {
        value: "callback",
        dispValue: "Callback"
    }, {
        value: "shorthangup",
        dispValue: "Short hang up"
    }, {
        value: "notinterested",
        dispValue: "Not Interested"
    }, {
        value: "nonserviceloc",
        dispValue: "Non Servicable location"
    }, {
        value: "noteligible",
        dispValue: "Not Eligible"
    }
]

/**
 * SUB DISPOSTIONS
 */
export const APPOINTMENT_SUB_DISPO = [
    "Client has given appointment"
]

export const CALLBACK_SUB_DISPO = [
    "Asked to call back later",
    "Decision maker unavailable",
    "ECS is active asked to call on due date"
]

export const NOT_INTRESTED = [
    "Not interested to Meet",
    "Did not Enquire",
    "Too Expensive",
    "Not interested to continue Existing Policy"
]

export const NOT_ELIGIBLE = [
    "NE - Income",
    "NE - Age"
]

export const NO_CONTACT_DISPOSITIONS = [
    {
        value: "notreachable",
        dispValue: "Not reachable"
    }, {
        value: "ringingbusy",
        dispValue: "Ringing Busy"
    }, {
        value: "wrongnumber",
        dispValue: "Wrong number"
    }, {
        value: "invalid",
        dispValue: "Invalid Number"
    }, {
        value: "switchoff",
        dispValue: "Switched off"
    }
]

export const APPOINTMENT_STATUS_LIST = [
    {
        value: "newappointment",
        dispValue: "New Appointment"
    }, {
        value: "followup",
        dispValue: "Follow Up"
    }, {
        value: "notintrested",
        dispValue: "Not Interested"
    }, {
        value: "notavailable",
        dispValue: "Not Available"
    }, {
        value: "wrngnumber",
        dispValue: "Wrong Number"
    }, {
        value: "convertd",
        dispValue: "Converted"
    }, {
        value: "renewalcollected",
        dispValue: "Renewal Collected"
    }
]


export const APPOINTMENT_DISPOSITION = [{ value: "newApptmnt", dispValue: "New Appointment" }]

export const FOLLOW_UP = [{
    value: 'metcustomer',
    dispValue: 'Met Customer, in follow up for closure'
}, {
    value: 'notmet',
    dispValue: 'Not Met - Reschedule Appt'
}]

export const NOT_INTRESTED_APPOINTMENT_DISPOSITION = [{
    value: 'apptDenies',
    dispValue: 'Client denies giving appointment'
}, {
    value: 'metFollowupNotIntrested',
    dispValue: 'Met, followed up, then not interested'
}]

export const PHONE_NOT_AVAILABLE = [{ value: 'phoneNtAvailble', dispValue: 'Phone not available always' }]
export const F_WRONG_NO_DISPOSITION = [{ value: 'Wrong_Number', dispValue: 'Wrong Number' }]
export const REN_CALLBACK = [{ value: "ConvinceRenPay", dispValue: "Convinced for renewal payment" }]
export const APPOINTMENT_CONVERTED = [{ value: "leadconverted", dispValue: "Convinced for a new policy" }]

// Appointment sub disposition

export const APPOINTMENT_SUB_DISPOSITION = {
    _appt: {
        newApptmnt: ['Untouched / Not updated Appointment']
    },
    followUp: {
        metcustomer: ["Met Customer, in follow up for closure"],
        notmet: ['Customer agreed to meet at another time', 'Not Met - Reschedule Appt as phone keeps on ringing']
    },
    N_I: {
        apptDenies: ["Client denies giving appointment"],
        metFollowupNotIntrested: ["Met, followed up, then not interested", "Bought policy from competition", "Wants to check options and buy online", "Lack of funds", "Interested in other investment tools"]
    },
    N_A: {
        phoneNtAvailble: ["Not reachable / no answer / switched off always"]
    },
    W_N: {
        Wrong_Number: ['Wrong Number']
    },
    Conv: {
        leadconverted: ['Successfully closed appt, Convinced for a new policy']
    },
    R_C: {
        ConvinceRenPay: ['Successfully closed appt, Convinced for renewal payment']
    }
};



export const STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
"Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
"Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh",
"West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Daman & Diu", "Delhi", "Lakshadweep", "Puducherry"]

export const CITIES = ["Mumbai","Kanpur","Lucknow","Banglore","Patna","Bhopal","Allahabad","Ahmadabad"]

// export function filterAPIResponse(response) {
//     if (Array.isArray(response)) {
//         if (response.length > 1) {

//         }
//     } else {
//         return -1;
//     }
// }

export const LEAD_RESPONSE = {
    "errCode":-1,
"errMsg":[
{
    "_id":"5c825a2047332b6efaa6bbc2",
    "appointment_status":"wrngnumber",
    "appointmentsubdisPosition":"Wrong Number",
    "appointmentdisPosition":"Wrong_Number",
    "leadStatus":"contact",
    "leadDisposition":"appointment",
    "leadsubDisposition":"Client has given appointment",
    "leadOwnerId":"5bfe33ed212c743b5afaef10",
    "leadCreatorId":"5bfe33ed212c743b5afaef10",
    "userId":{
        "_id":"5bfe33ed212c743b5afaef10",
        "primary_email":"king@grr.la",
        "first_name":"King ",
        "agent_id":"AG642"
    },
    "socialSecurityAdharNo":"",
    "firstName":"imran",
    "lastName":"khan",
    "dob":"",
    "gender":"",
    "maritalStatus":"",
    "mailingAddressStatus":"Yes",
    "mailingAddressSecond":"{\"mailingaddress\":{\"line1\":\"\",\"line2\":\"\",\"line3\":\"\"},\"state\":\"\",\"city\":\"\",\"country\":\"India\",\"pincode\":\"\"}",
    "ChildInfo":"[]",
    "address":[
        {
            "_id":"5c825a3547332b6efaa6bbc7",
            "line1":"",
            "line2":"",
            "line3":""
        }
    ],
    "country":"India",
    "state":"Madhya Pradesh",
    "city":"Kanpur",
    "pincode":null,
    "primaryMobile":9284750128,
    "secondaryMobile":null,
    "landlineNo":null,
    "email":"imran@grr.la",
    "education":"",
    "productType":"",
    "incomeGroup":"",
    "annuaLincome":null,
    "professionType":"",
    "vehicleInfo":[
        {
            "_id":"5c825a3547332b6efaa6bbc8"
        }
    ],
    "productCategory":"",
    "solution":"",
    "expectedPremium":null,
    "expectedclosureDate":"",
    "remarksfromSource":"Remark from agent",
    "remarksfromUser":"Remark from user",
    "HaveLifeInsurance":{
    "ExistInsur":"No",
    "ExistHealthInsur":"No"
},
"HaveLifeInsurance_details":"[]",
"Insurancedetails":"[]",
"teamMembers":"[]",
"childStatus":"",
"created_date":"1552046624648",
"lastupdatedOn":"1552046645177",
"mailingAddress":null,
"RiskCommencementDate":null,
"camapignName":null,
"leadSource":null,
"hasinvestedinmutualFunds":null,
"hasmotorInsurance":null,
"totallifeCover":null,
"hastermInsurance":null,
"totalannualPremium":null,
"totalhealthCover":null,
"hashealthInsurance":null,
"age":null,
"middleName":null,
"salutation":null
},
{
"_id":"5c825a3547332b6efaa6bbca",
"start_time":57600000,
"start_date":1552588200000,
"start_time_MS":1552645800000,
"leadId":"5c825a2047332b6efaa6bbc2",
"userId":"5bfe33ed212c743b5afaef10",
"end_time":61200000,
"end_date":1552588200000,
"end_time_MS":1552649400000,
"appintment_type":"appointment",
"set_reminder_prority":"medium",
"event_name":"Appointment",
"event_description":"Client Meeting with imran khan",
"reminder_prority_color":"#e8bd55",
"created_date":1552046645192
}
],
"dbDate":"Fri Mar 08 2019 17:34:44 GMT+0530 (IST)"
}
