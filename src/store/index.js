// Comment below line to configure Vuex on APK / IOS device
import Vue from 'vue'

import Vuex from 'vuex'
// import * as actions from './actions'
import * as mutations from './mutation'

Vue.use(Vuex)
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('vue_state');
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        // const serializedState = JSON.stringify(state);
        const serializedState = state;
        localStorage.setItem('vue_state', serializedState);
    } catch (err) {
        console.error(`Something went wrong: ${err}`);
    }
}

//Add this in state after { loadState() ||

const store = new Vuex.Store({
    state: loadState() || {
        snackbar: {
            visible: false,
            text: '',
            color: 'red',
            timeout: 6000,
            multiline: false,


        },
        updateUserData: {},
        typeUser:"",

        historyroutename:'',
        headerName: 'Default Title',

        product_channel_id:"all",

        notifictionDirect: 'false',
        notificationLeadData: [],
        agentDetails: [],
        menulistDetails:[],
        bankDetails:[],
        proposalDetails: {},
        cfrDetails: [],
        masterDetails: {},
        remarktype:[],
        masterrole: {},
        chanelDetails: {},
        billDetails: {},
        travelDetails: {},
        documentUpload:[],
        imagelink: 'https://www.materialui.co/materialIcons/av/not_interested_white_192x192.png',
        notificationTextColor: '#98874b',
        CarDetails: {},
        productModule: {},
        loader: {
            title: '',
            bool: ''
        },
        PetDetails: {},
        DengueDetails: {},
        accessCtrl: {},
        blogs: {
            fileCategory: [],
            blogCategory: []
        },
        poroducts: {
            fileCategory: [],
            productCategory: []
        },
        roleCode: [],
        editBlog: {},
        confirmBox: {
            title: '',
            message: '',
            type: 'confirm',
            show: false,
            callback: null
        },
        lastchanneselected: '',
        leadAPIResponse: null,
        accessSystem: null,
        affiliateDetails: {},
        leadDetaislData: null,
        bankList_Di:[],
        allBanksDi:'',
        leadputpost: '',
        links: '',
        citiesCollection: {
            states: [],
            allCities: []
        },

        qmappingdata:{
                qmonth:"",
                qyear: 0,
                q_channel:"",
                q_ch_name:"",
                q_cols: [],
                q_maindata: [],
                sheet_data:""
        },
        mappingdata:{
                mmonth:"",
                myear: 0,
                m_channel:"",
                m_ch_name:"",
                m_cols:[],
                m_maindata:[],
                sheet_data:""
        },
        sessionlogout:false,

        BI_pdf_file:null,

        // ************************************New ACCESS CONTROL STORE DATA************************************

        // ********Table Header data in Store**************
        headers: [

            { text: 'Main Modules', align: 'left', value: 'mainmodule' },

            { text: 'Sub Modules', align: 'left', value: 'submodules' },

            { text: 'Agent', value: 'agent' },

            { text: 'Branch Manager', value: 'branchmanager' },

            { text: 'Regional Manager', value: 'regionalmanager' },

            { text: 'Zone Manager', value: 'zonemanager' }

        ]
    },
    mutations,
    getters: {
        
        getapprovalhistoryroute(state){
            return state.historyroutename
        },
        getremarktype(state) {
            return state.remarktype
        },
        getheaderTitle(state) {
            return state.headerName
        },

        getAgentDetails(state) {
            return state.agentDetails
        },
        getbankDetails(state) {
            return state.bankDetails
        },
        getDetamenulistils(state) {
            return state.menulistDetails
        },
        
        getProposalDetails(state) {
            return state.proposalDetails
        },
        getCFRDetails(state) {
            return state.cfrDetails
        },
        // getMasterPageDetails(state) {
        //     return state.masterDetails
        // },
        getMasterRole(state) {
            return state.masterrole
        },
        getChanelDetails(state) {
            return state.chanelDetails
        },

        getaffiliateDetails(state) {
            return state.affiliateDetails
        },

        // affiliateDetails
        getUploadBillDetails(state) {
            return state.billDetails
        },
        getTravelDetails(state) {
            return state.travelDetails
        },
        getCarDetails(state) {
            return state.CarDetails
        },
        loader(state) {
            return state.loader
        },
        getPetDetails(state) {
            return state.PetDetails
        },
        getProducts(state) {
            return state.productModule
        },

        getDengue(state) {
            return state.DengueDetails
        },

        getDengue(state) {
            return state.headers
        },
        getAccessCtrlData(state) {
            return state.accessCtrl
        },
        getFileUploadCategory(state) {
            return state.poroducts.fileCategory
        },
        getBlogsCategoryList(state) {
            return state.blogs.blogCategory
        },
        getConfirmBox(state) {
            return state.confirmBox
        },
        fetchBlog(state) {
            return state.editBlog
        },
        Getlastchannel(state) {
            return state.lastchanneselected
        },
        getLeadResponse(state) {
            return state.leadAPIResponse
        },
        fetchAccess(state) {
            return state.accessSystem
        },
        getFileUploadCategory(state) {
            return state.poroducts.fileCategory
        },
        getProductCategoryList(state) {
            return state.poroducts.productCategory
        },
        fetchRoleCodes(state) {
            return state.roleCode
        },
        GetLeadData(state) {
            return state.leadDetaislData
        },
        GetLeadPutPost(state) {
            return state.leadputpost
        },
        fetchStatesCities (state) {
            return state.citiesCollection;
        }


    }
})

store.watch(
    (state) => {
        console.log(state);
        if(state.links.fullPath !== '/LoginView'){
            saveState(state);
        }
    }
)

export default store
