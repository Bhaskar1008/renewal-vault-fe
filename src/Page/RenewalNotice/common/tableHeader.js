export const rvAndDataRepTableHeader= 
  [

    
    { text: 'Policy No', value: 'TXT_POLICY_NO' },
    // {
    //   text: "Batch ID",
    //   // align: 'start',
    //   sortable: true,
    //   value: "JOB_ID",
    // },
    { text: "Policy Exp. From", value: "DAT_RENEWAL_INCEPTION_DATE", sortable: true },
    { text: "Policy Exp. To", value: "DAT_RENEWAL_EXPIRY_DATE", sortable: true },
    {
      text: "Job Sched Date/Time",
      sortable: true,
      value: "DAT_ETL_INSERT_DATETIME",
    },
    
    { text: "Status", value: "RENEWAL_STATUS" },
    
  ]


  export const excelMovementTable= 
  [ 
    {
      text: 'Unique Id', value: 'ID',  sortable: false
    },
    { text: 'Lob', value: 'STAGE_NAME' ,  sortable: false},
    { text: "Created Date", value: "CREATED_DATE", sortable: false },
    { text: "Updated Date", value: "UPDATED_DATE", sortable: false },
    {
      text: "Status",
      sortable: false,
      value: "STATUS",
    },
    { text: "Upload original file ", value: "ORIGINAL_FILE_PATH",  sortable: false },
    { text: "Updated file ", value: "UPDATED_FILE_PATH" ,  sortable: false},
    {text:'User',value :'USERID',  sortable: false}
    // { text: "Error / updated  file ", value: "ORIGINAL_FILE_PATH" },
    
  ]

  //Commercial vehicles policy summary - Aravind
  export const policySummaryHeader = [{
    text: "Product",
    value: "STAGE",
    sortable: false
  },{
    text: "Policy No",
    value: "TXT_POLICY_NO",
    sortable: false
  },
  {
    text: "Customer",
    value: "TXT_CLIENT_NAME",
    sortable: false,
  },
  {
    text: "Start Date",
    value: "DAT_PREVIOUSPOLICYSTARTDATE",
    sortable: false,
  },
  {
    text: "End Date",
    value: "DAT_PREVIOUSPOLICYENDDATE",
    sortable: false,
  },
  {
    text: "Work Flow Status",
    value: "WORKFLOW_STATUS",
    sortable: false,
  },
  {
    text: "Status",
    value: "RENEWAL_STATUS",
    sortable: false,
  },
  {
    text: "Remarks",
    value: "REMARKS",
    sortable: false,
  }, {
    text: "Registration",
    value: "TXT_REGISTRATIONNUMBER",
    sortable: false,
  }]
  
  //Two wheeler header policy summary - Aravind
  export const policySummaryHeaderTw = [{
    text: "Policy No",
    value: "POLICY_NO",
    sortable: false
  },
  {
    text: "Customer",
    value: "CUSTOMER_NAME",
    sortable: false,
  },
  {
    text: "Start Date",
    value: "POLICY_START_DATE",
    sortable: false,
  },
  {
    text: "End Date",
    value: "POLICY_EXPIRY_DATE",
    sortable: false,
  },
  {
    text: "Work Flow Status",
    value: "WORKFLOW_STATUS",
    sortable: false,
  },
  {
    text: "Status",
    value: "RENEWAL_STATUS",
    sortable: false,
  },
  {
    text: "Remarks",
    value: "REMARKS",
    sortable: false,
  }, {
    text: "Registration",
    value: "REGISTRATION_NUMBER",
    sortable: false,
  }]

  
  export const policySummaryHeaderRn = [{
    text: "Product",
    value: "STAGE",
    sortable: false
  },{
    text: "Policy No",
    value: "TXT_POLICY_NO",
    sortable: false
  },
  {
    text: "Customer",
    value: "TXT_CLIENT_NAME",
    sortable: false,
  },
  {
    text: "Start Date",
    value: "DAT_PREVIOUSPOLICYSTARTDATE",
    sortable: false,
  },
  // DAT_RENEWAL_EXPIRY_DATE
  {
    text: "End Date",
    value: "DAT_PREVIOUSPOLICYENDDATE",
    sortable: false,
  },
  {
    text: "Work Flow Status",
    value: "WORKFLOW_STATUS",
    sortable: false,
  },
  {
    text: "Status",
    value: "RENEWAL_STATUS",
    sortable: false,
  },
   {
    text: "Registration",
    value: "TXT_REGISTRATIONNUMBER",
    sortable: false,
  }]      


  export const policySummaryAIGCHeader = [
    {
      text: "Product",
      value: "VARIANT",
      sortable: false
    },{
      text: "Policy No",
      value: "TXT_POLICY_NO_CHAR",
      sortable: false
    },
    {
      text: "Branch Location",
      value: "OFFICE_BRANCH_LOCATION_NAME",
      sortable:false
    },
    {
      text: "Channel",
      value: "CHANNEL_NAME_GC",
      sortable:false
    },
    {
      text: "Customer Name",
      value: "INSURED_NAME",
      sortable: false,
    },
    {
      text: "Start Date",
      value: "INCEPTION_DATE",
      sortable: false,
    },
    {
      text: "End Date",
      value: "EXPIRY_DATE",
      sortable: false,
    },
    {
      text: "Status",
      value: "RV_RENEWAL_STATUS",
      sortable: false,
    }, 
    // {
    //   text: "Remarks",
    //   value: "REMARKS",
    //   sortable: false,
    // }
  ]

  
export const policySummaryMOPheader = [
    {
      text: "Policy Number",
      value: "TXT_POLICY_NO_CHAR",
      sortable: false,
      class: 'my-header-style'
    },
    {
      text: "Insertion Date",
      value: "DAT_ETL_INSERT_DATETIME", 
      sortable: false,
      class: 'my-header-style'
    },
    {
      text: "Reference Number",
      value: "NUM_REFERENCE_NUMBER",
      sortable: false,
      class: 'my-header-style'
    },
    {
      text: "Policy Expiry Date",
      value: "DAT_POLICY_EFF_TODATE",
      sortable: false,
      class: 'my-header-style'
    },
   
  ]