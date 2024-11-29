export function ADD_UPDATE_USER_DATA(state, data) {
    state.updateUserData=data.data
    state.typeUser = data.type
    console.log(data,"store for update")
}

export function SET_AGENT_DATA(state, agentdata) {
    console.log(agentdata)
    state.agentDetails = agentdata
}

export function SET_BANK_DETAILS_DATA(state, agentdata) {
    state.bankDetails = agentdata
}

export function SET_APPROVAL_HISTORY_ROUTE(state, name) {
    state.historyroutename = name
}

export function SET_MENU_LIST_DATA(state, agentdata) {
    state.menulistDetails = agentdata
}

export function SET_REMARK_TYPE(state, typeremark) {
    state.remarktype = typeremark
}

export function SET_PAGE_TITLE(state, headerTitle){
    state.headerName = headerTitle
    // console.log(headerTitle , state.headerName ,state , 'SET_PAGE_TITLE Mutation')
    }

export function SET_PROPOSAL_DETAILS(state, proposaldata) {
    // console.log(agentdata)
    state.proposalDetails = proposaldata
}

export function SQMD(state, qmappingdata){
    // console.log("Mutations PDF SRC",pdffile);
    state.qmappingdata.qmonth = qmappingdata.qmonth
    state.qmappingdata.qyear = qmappingdata.qyear;
    state.qmappingdata.q_maindata = qmappingdata.q_maindata;
    state.qmappingdata.q_ch_name = qmappingdata.ch_name;
    state.qmappingdata.q_cols = qmappingdata.q_cols;
    state.qmappingdata.q_channel = qmappingdata.q_channel;
    state.qmappingdata.sheet_data = qmappingdata.sheet_data;
}

export function SMD(state, mappingdata){
    // console.log("Mutations PDF SRC",pdffile);
    // state.mappingdata = mappingdata;
    state.mappingdata.mmonth = mappingdata.mmonth
    state.mappingdata.myear = mappingdata.myear;
    state.mappingdata.m_channel = mappingdata.m_channel;
    state.mappingdata.m_ch_name = mappingdata.ch_name;
    state.mappingdata.m_maindata = mappingdata.m_maindata;
    state.mappingdata.m_cols = mappingdata.m_cols;
    state.mappingdata.sheet_data =mappingdata.sheet_data;
}


export function SET_PDF_FILE_SRC(state, pdffile) {
    // console.log("Mutations PDF SRC",pdffile);
    state.BI_pdf_file = pdffile;
}

export function SET_CFR_DETAILS(state, cfr){
    console.log("Data from component is", cfr)
    console.log("CFR DATA Before", state.proposalDetails.cfrdetails)
    console.log("CFR DATA BEFORE", state.proposalDetails.cfrdetails.length)
    var len = state.proposalDetails.cfrdetails.length
    state.proposalDetails.cfrdetails = cfr
    console.log("CFR DATA After", state.proposalDetails.cfrdetails.length)
    console.log("CFR DATA After", state.proposalDetails.cfrdetails)
        // state.cfrDetails = cfr
}
export function SET_CHANEL_DETAILS(state, chaneldata) {
    // console.log(chaneldata)
    state.chanelDetails = chaneldata
}

// affiliate master
export function SET_AFFILIATE_DETAILS(state, affiliatedata) {
    // console.log(chaneldata)
    state.affiliateDetails = affiliatedata
}

export function SET_Bill_DETAILS(state, billdata) {
    // console.log(chaneldata)
    state.billDetails = billdata
}
export function SET_MASTER_ROLE_DETAILS(state, masterroledata) {
    console.log(masterroledata)
    state.masterrole = masterroledata
}

export function SET_CAR_DETAILS(state, cardata) {
    state.CarDetails = cardata
}

export function SET_PET_DETAILS(state, petdata) {
    state.PetDetails = petdata
}

export function SET_Dengue_DETAILS(state, denguedata) {
    state.DengueDetails = denguedata
}


export function showSnackbar(state, payload) {
    state.snackbar.text = payload.text
    state.snackbar.color = payload.color
        // state.snackbar.right = payload.right
    state.snackbar.multiline = payload.text !== undefined ? payload.text.length > 50 : ''
    state.snackbar.timeout = payload.timeout ? payload.timeout : 6000;
    state.snackbar.visible = true

}

export function closeSnackbar(state) {
    state.snackbar.visible = false
    state.snackbar.multiline = false
    state.snackbar.timeout = 6000
    state.snackbar.text = null
}
export function SET_TRAVEL_DETAILS(state, traveldata) {
    state.travelDetails = traveldata
}

export function SAVE_PRODUCTS(state, pageData) {
    state.productModule = pageData
}

export function SAVE_PRODUCT_CATEGORY(state, docs) {
    if (typeof docs === 'string' && docs === 'clear') {
        state.poroducts.productCategory = [];
    } else {
        state.poroducts.productCategory.push(docs)
    }
}

export function FILTER_PRODUCT_TABLE(state, incoming_id){

    console.log("mutation of filter product table is ->", incoming_id);
        state.product_channel_id = incoming_id


}

export function SAVE_FILE_CATEGORY(state, docs) {
    if (typeof docs == 'string' && docs == 'clear') {
        state.poroducts.fileCategory = [];
    } else {
        state.poroducts.fileCategory.push(docs)
    }
}

export function SAVE_ROLE_CODES(state, role_array = []) {
    state.roleCode = role_array;
}

export function SHOW_LOADER(state, config) {
    state.loader = config
}
export function SET_ACCESS_CONTROL(state, accessdata) {
    state.accessCtrl = accessdata
}

export function SET_NOTIFY_STATUS(state, ndirect) {
    state.notifictionDirect = ndirect

}

export function SET_LEADNOTIFY(state, nlead) {
    state.notificationLeadData = nlead
}


export function SET_DIFILTER(state, bankList) {
    state.bankList_Di = bankList
    console.log("from mutations",bankList.length)
}

/**
 *
 * @param {*} state
 * @param {*} docs
 *
 * POC
 * @description Blogs
 */
export function SAVE_BLOGS_CATEGORY(state, docs) {
    if (typeof docs == 'string' && docs == 'clear') {
        state.blogs.blogCategory = [];
    } else {
        state.blogs.blogCategory.push(docs)
    }
}

export function SHOW_CONFIRM_BOX(state, config) {
    state.confirmBox = config;
}

export function SAVE_EDIT_BLOG(state, blog) {
    state.editBlog = blog;
}
export function LAST_CHNNEL_DATA(state, chnl) {
    state.lastchanneselected = chnl
}
export function LED_PUT_POST(state, id) {
    state.leadputpost = id
}
export function LINKS(state, tab) {
    state.links = tab
}

// export function SAVE_FILE_CATEGORY(state, docs) {
//     if (typeof docs == 'string' && docs == 'clear') {
//         state.poroducts.fileCategory = [];
//     } else {
//         state.poroducts.fileCategory.push(docs)
//     }
// }

export function SAVE_LEAD_RESPONSE(state, res) {
    state.leadAPIResponse = res;
}
export function Lead_Object(state, lead) {
    if (typeof(lead) === 'string' && lead === 'clear') {
        state.leadDetaislData = null;
    } else {
        console.log('Mutation : ', lead)
        state.leadDetaislData = lead;
    }

}
export function LOGOT_SESSION(state,sess){
    state.sessionlogout = sess
}

export function SAVE_CITIES (state, payload) {
    state.citiesCollection = payload;
}
export function SET_ACCESS_SYSTEM(state, payload) {
    console.log('Command : ', payload.command);

    if (payload.command == 'new') {
        // console.log('Access system UPAR: ' , payload);
        state.accessSystem = payload.data;
        console.log('Access system : ', state.accessSystem);

    } else if (payload.command == 'update') {

        let event = payload.event;

        console.log('Event : ', event);

        let new_obj = {
            [event.keyIndex]: {
                opt1: {
                    label: event.role.opt1.label,
                    value: event.event
                }
            }
        }

        // console.log('Puncher Fix : ' , new_obj);

        state.accessSystem[event.rootIndex]['roles'][event.innerIndex] = new_obj
        new_obj = {};

        // for (let i = 0; i < state.accessSystem.length; i++) {


        //     if (event['name'] == state.accessSystem[i]['name']) {


        //         // console.log(state.accessSystem[i]['roles'][event.innerIndex][event.keyIndex]['opt1']['value'], 'Value');
        //     }
        // }

        console.log('State : ', state.accessSystem);
    }
}
