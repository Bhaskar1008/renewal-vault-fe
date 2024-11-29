<template>
    <v-app>
        <v-layout column style="background-color:#F7F7F7" class="ma-2">
            <v-card flat class=" mb-0 mt-2" style="border:1px solid #C1C8CC;">
                <v-layout row style="padding:5px;background-color:#F7F7F7">
                    <v-text 
                        class="body-2 mr-5"  
                        style="color:#646666; padding:10px; font-family:roboto; font-weight:700">
                        Access Control
                    </v-text>
                </v-layout>
            </v-card>
            <v-card flat class="mb-0 mt-0" style="">
                <v-layout  row  class="acc-updte-div" style="">
                    <v-btn 
                        tile
                        color="#152F38" 
                        class="acc-txttrnsfrm-none"
                        dark>
                        Update Permissions
                        <v-icon dark right>mdi-keyboard-tab</v-icon>
                    </v-btn>
                </v-layout>
                <v-flex style="" class="cust_access-table">
                    <v-data-table
                        class="recon-tbl-brdr"
                        outline
                        v-model="selected"
                        :headers="headers"
                        :items="recon_functions"
                        hide-actions
                        item-key="_id">
                        <template slot="items" slot-scope="props">
                            <td class="" style="padding-top: unset !important; border-right:1px solid #C1C8CC">
                                {{props.item.functionalities}}</td>
                            <td class="" style=" border-right:1px solid #C1C8CC">
                                <v-radio-group dense row v-model="active" class="ma-0 pa-0">
                                    <v-radio @change="permisson(props.item.faMaker, props.item.functionalities,headers[1])" color="#E46A25" small  label="View" value="view"></v-radio>
                                    <v-radio color="#E46A25" label="Edit" value="edit"></v-radio>
                                </v-radio-group>
                            </td>
                            <td class="" style=" border-right:1px solid #C1C8CC">
                                <v-radio-group dense  v-model="active" row class="ma-0 pa-0">
                                    <v-radio color="#E46A25" small  label="View" value="view"></v-radio>
                                    <v-radio color="#E46A25" label="Edit" value="edit"></v-radio>
                                </v-radio-group>
                            </td>
                            <td class="" style=" border-right:1px solid #C1C8CC">
                                <v-radio-group  v-model="active" dense row class="ma-0 pa-0">
                                    <v-radio color="#E46A25" small  label="View" value="view"></v-radio>
                                    <v-radio color="#E46A25" label="Edit" value="edit"></v-radio>
                                </v-radio-group>
                            </td>
                            <td class="" style=" border-right:1px solid #C1C8CC">
                                <v-radio-group v-model="active" dense row class="ma-0 pa-0">
                                    <v-radio color="#E46A25" small  label="View" value="view"></v-radio>
                                    <v-radio color="#E46A25" label="Edit" value="edit"></v-radio>
                                </v-radio-group>
                            </td>
                            <td class="" style="">
                                <v-radio-group v-model="active" dense row class="ma-0 pa-0">
                                    <v-radio color="#E46A25" small  label="View" value="view"></v-radio>
                                    <v-radio color="#E46A25" label="Edit" value="edit"></v-radio>
                                </v-radio-group>
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-card>

        </v-layout>
    </v-app>
</template>
<script>
export default {
    data(){
        return{
            F_A_Maker:'',
            active:'view',
            headers:[
                {text: 'Functionalities', value: 'functionalities',sortable: false},
                {text: 'F&A Maker', value: 'faMaker',sortable: false},
                {text: 'F&A Checker', value: 'faChecker',sortable: false},
                {text: 'F&A Admin', value: 'faAdmin',sortable: false},
                {text: 'Auditor', value: 'auditor', sortable: false},
                {text: 'IT Support', value: 'itSupport', sortable: false}       
            ],
            recon_functions:[
                {
                    functionalities:'Bank Data Master',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Bank Data Upload',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Bank Data Approval',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Bank Data Master',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Bank Data Master',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Auto Recon',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Auto Recon Approval',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Manual Recon',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Manual Recon Approval',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Recon Rule Engine View',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
                {
                    functionalities:'Recon Rule Engine Edit',
                    faMaker:'view',
                    faChecker:'view',
                    faAdmin:'view',
                    auditor:'view',
                    itSupport:'view',

                },
            ]
        }
    },
    methods:{
        permisson(e,f,h){
            console.log(e)
            console.log(f)
            console.log(h)
        }
    }
}
</script>
<style>
.acc-txttrnsfrm-none{
    text-transform: none;
}
.acc-tbl-hdr{
   flex:1; 
   justify-content:space-between;
   align-items: stretch;
   background-color: #F3FBFB;
   color:#1E9690;
   font-family:Roboto;
   font-weight:600;
}
.acc-tbl-flx1{
    padding:10px;
    padding-left:12px;
    flex:1;
    border:0.5px solid #C1C8CC;
    border-bottom: unset;
    border-left: unset;
}
.frst-col{
   color:#10242B;
   font-family:Roboto;
   font-weight:700;
}
.acc-data-hvr:hover{
    background-color: #FEF9F6;
    color: #E46A25;
}
.frst-col:hover{
    color: #E46A25;
}
.recon-tbl-brdr{
    border:1px solid  #C1C8CC

}
/* .recon-tbl-brd td{
    padding-top:24px !important
} */
.cust_access-table table.v-table thead{
    border-bottom: unset !important;
}
.cust_access-table table.v-table tbody td{
    padding-top: 14px !important;
    
}

.cust_access-table table.v-table thead th{
    border-right:1px solid  #C1C8CC !important;
    background-color:#F3FBFB !important;
    color:#1E9690 !important;
    font-family:Roboto !important;
    font-weight:700 !important;
}

.cust_access-table .v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
    margin-bottom: 0px;
}
.cust_access-table .v-input--selection-controls__ripple{
    height: 25px;
    width: 25px;
    left: -9px;
    top: calc(50% - 20px);
    margin: 7px;
}
.cust_access-table .v-input--selection-controls__input{
    height: unset;
}
.cust_access-table table .v-icon{
    font-size: 21px;
}   
.cust_access-table .v-table tr:hover:not(.v-table__expanded__content) {
  background: #FEF9F6 !important;
}
.acc-updte-div{
    padding:5px;
    background-color:#FFFFFF;
    justify-content: flex-end; 
    border-right:1px solid #C1C8CC;
    border-left:1px solid #C1C8CC;
}
.cust_access-table table.v-table thead th:last-child{
    border-right: unset !important;

}

.cust_access-table table.v-table tr:hover{
    color: #E46A25;

}
/* .cust_access-table table.v-table thead tr:last-child{
         height: unset !important;;
    } */
</style>