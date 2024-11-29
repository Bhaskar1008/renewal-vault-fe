// Sever IP
export const USER_URL = 'https://sdtatadevnode.iorta.in/secure/user/';
// export const ADMIN_URL = 'https://sdtatadevnode.iorta.in/secure/admin/';

export const ADMIN_URL= 'https://crenode.iorta.in';

export const BANK_URL = 'https://ifsc.razorpay.com/'
export const BUKLIST_URL = 'http://localhost:3000/bulklist'

export const SOCKET_URL = 'https://sdtatadevnode.iorta.in';

export const CAPTCHA_ID = '6LeLq9sUAAAAAGDFU-HcNR5QH7vuxouh-FVHNc6M'
// IMAGE URL
export const SALESDRIVE_URL = 'http://salesdriveapp.iorta.in/img/'

export const node_img_url = 'https://nodesalesdrivedemo.iorta.in/ ' // Node Base URL  => port with ip
export const Image_URL = 'https://sdtatadevnode.iorta.in/'


//dev
export let BaseURl = 'https://55j7prgpn9.execute-api.ap-south-1.amazonaws.com/prod/'


export let oAuthURl = 'https://397611673480-auth.auth.ap-south-1.amazoncognito.com/oauth2/token'
export const tokenCred = {
     grantType : "client_credentials" ,
     clientId :"4mvhrgqptajd0stm50l7g1alin",
     clientSecret:"1job69ftt8042aa4geppjf05bp005lkkgogt7reegl00cslqosbn"
    }

//uat
// export let BaseURl = 'http://localhost:5000'

// export let BaseURl = 'https://renewalvault-api.tataaig.com'
// export let BaseURl = 'https://ak4ggmsef0.execute-api.ap-south-1.amazonaws.com/prod'
// export let oAuthURl = 'https://397611673480-auth.auth.ap-south-1.amazoncognito.com/oauth2/token'
// export const tokenCred = {
//      grantType : "client_credentials" ,
//      clientId :"4mvhrgqptajd0stm50l7g1alin",
//      clientSecret:"1job69ftt8042aa4geppjf05bp005lkkgogt7reegl00cslqosbn"
//     }




// Prod
// export let BaseURl = 'https://9h0d6g9kf2.execute-api.ap-south-1.amazonaws.com/prod'
// export let oAuthURl = 'https://982942302472-auth.auth.ap-south-1.amazoncognito.com/oauth2/token'
// export const tokenCred = {
// grantType : "client_credentials" ,
//  clientId :"4fk7g8tjkp8mntng6a142b3tvd",
//  clientSecret:"1cteg38hn5ugob750n8rnevuuho4rcvbuqhgmtqt6viuciq28kio"
// }

export let sampleFileURlForTravel = 'https://rv-travel-update-related-files.s3.ap-south-1.amazonaws.com/config/Renewal-Notice-Upload-File.xlsx'

export const policiesListByStatus = BaseURl + 'policiesListByStatus'

export const CV_PTModificationAction = BaseURl + 'CV_PTModificationAction'

export const retaintion_approval = BaseURl +'/retaintion-approval/cv/'

export const triggerToBreFailed = retaintion_approval + 'triggerToBreFailed'

export const CV_Renewed = BaseURl + 'CV_Renewed'

export const CV_RN_GeneratedFilter = BaseURl + 'CV-RN-GeneratedFilter'

export const CV_PTModificationFilter = BaseURl + 'CV_PTModificationFilter'

export const CV_RA_Filterdetails = BaseURl + 'CV-RA-Filterdetails'

export const Retaintion_Approval = BaseURl + 'Retaintion_Approval'

export const CV_DownloadPoliciesReport = BaseURl + 'CV_DownloadPoliciesReport'

export const ccmLogsAudit = BaseURl + 'ccmLogsAudit'

export const CV_Request_Response = BaseURl + 'CV_Request_Response'

export const ptRouteToQueue = retaintion_approval + 'ptRouteToQueue'

export const updatedData = retaintion_approval + 'updated-data'

export const fetchPolicyCount = BaseURl + 'fetchPolicyCount'

export const updatePolicyDataApi = BaseURl + 'update-policy-data-api'

export const rvBulkAction = BaseURl + 'RV_CV_BulkAction'

export const rvFilterBy = BaseURl + 'rvFilter'

export const bre_downloadAudit_FlowStatus = BaseURl + 'bre_downloadAudit_FlowStatus'

export const downloadAuditFlowStatus = BaseURl + 'downloadAuditFlowStatus'



//cv api path
export const cvApiPath={
    downloadLogs : '/cv/download/logs',
    downloadExcel: '/cv/download-excel/policies',
    policyCount : '/cv/lob/policies-count',
    getPolicies : '/cv/lob/policies',
    getDownloadReports : '/cv/download-reports',
    auditWorkFlowList : '/cv/policy/audit-workflow',
    auditWorkFlowListSingleDownload : '/cv/policy/audit-workflow/single-file/download',
    auditWorkFlowListDownload:'/cv/policy/audit-workflow/download',
    getPolicy:'/cv/policy/data',
    updatePolicy:'/cv/policy/update',
    bulkAction:'/cv/policies/movement',
    uploadPolicyExcel:'/cv/policy/update/excel',
    rvDataPolices:'/cv/rv-dataRep/policies',
    policiesDetails:'/cv/policies/details',
    oraclePoliciesDetails:'/cv/oracle-db/policies/details',
    excelPoliciesMovement:'/cv/excel-policies/movement',
    excelMovementHistory:'/cv/excel-policies/movement/history',
    getExcelpoliciesPulledDataHistory:'/cv/excel-policies/pull-data-history',
    pullExcelData: '/cv/excel-policies/column-update'
}

// export const modifyPolicy = BaseURl + 'getpolicylatestdata'

// export const  updatePolicy= BaseURl + 'policy-modification/declineoraccept'
