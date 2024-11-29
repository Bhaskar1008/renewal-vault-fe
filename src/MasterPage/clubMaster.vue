<template>
    <v-app>
        <!-- <v-content> -->
        <v-card>
            <v-layout row wrap >
                <v-card flat style="background-color:#FAFAFA; width:100%;">
                    <v-layout class="pt-4 ml-3 mr-3 " >
                        <v-btn  depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addClub()">
                            add Club
                            <v-icon dark right>add_circle</v-icon>
                        </v-btn>
                    </v-layout>  
                </v-card>

                <v-flex class="ml-3 mr-3 mt-2" style="flex-flow:column wrap; width:97%;">  
                    <v-layout row justify-space-between>
                        <!-- do not delete this line -->
                        <v-flex xs2></v-flex>
                            
                        <v-flex justify-center md6 ml-3 mt-3>
                            <h3 class="text-xs-center mb-3">Club Details</h3>
                            <v-data-table
                                :headers="headers"
                                :items="objmethod"
                                hide-actions
                                class="elevation-1">
                                <template slot="items" slot-scope="props">
                                    
                                    <td class="">{{props.item.clubName}}</td>
                                    <td class=""><img class="club-img" :src="props.item.clubPicture"></img></td>
                                    <td class="">{{props.item.target}}</td>
                                    <td class="">{{props.item.sequenceId}}</td>
                                    <td class="">
                                        <v-icon small class="" @click="editItem(props.item)">edit</v-icon>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-flex>
                        <v-flex xs2></v-flex>
                    </v-layout>

                    <v-dialog v-model="clubDataDialog" persistent max-width="800px">
                        <v-card>
                            <v-flex style="background-color:#3a3a3a">
                                <v-card-title class="subheading" style="color:white" >{{popupTitle}}</v-card-title>
                            </v-flex>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-form v-model="validForm" ref="form">
                                        <v-layout wrap>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field maxlength="30" :rules="clubValid" @input="validateClubFields(clubName,'name')" v-model="clubName" label="Club Name"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <!-- <v-text-field maxlength="20" :readonly="disrolecode" v-model="editedItem.rolecode" label="Club Image"></v-text-field> -->
                                                <v-layout row>
                                                    <v-flex>
                                                        <v-layout class="upld-img mt-2 ml-2">
                                                            <p class="mb-0 font-weight-medium" style="color:#fff;">UPLOAD IMAGE</p>
                                                            <v-icon dark right>publish</v-icon>
                                                        </v-layout>
                                                        <div class="upld-img-pos" style="">
                                                            <input type="file" id="imageName" style="cursor: pointer;" @change="imageUpload">
                                                        </div>
                                                    </v-flex>
                                                    <v-flex class="mr-4">
                                                        <p class="font-weight-regular font-italic" style="margin-bottom:0px;color:darkgrey;">{{clubImage}}</p>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                           
                                            <!-- :rules=""  -->
                                            <!-- @input="validateClubFields(clubTarget)" -->
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field maxlength="15" :rules="targetValid" @input="validateClubFields(clubTarget,'target')"  v-model="clubTarget" label="Target"></v-text-field>
                                            </v-flex>

                                            <v-flex xs12 sm6 md6>
                                                <v-text-field maxlength="10" :rules="sequenceValid" @input="validateClubFields(clubSequence,'sequence')" v-model="clubSequence" label="Sequence"></v-text-field>
                                            </v-flex>
                                        
                                        </v-layout>
                                    </v-form>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn depressed large color="grey lighten-3" @click.native=" close()">Cancel
                                    <v-icon right dark>highlight_off</v-icon>
                                </v-btn>
                                <v-btn depressed large color="secondary" @click.native="saveAndEditBtn(btnname)">{{btnname}}
                                    <v-icon dark right>check_circle</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog> 

                </v-flex>    
            </v-layout> 
            <div class="text-xs-center pagination">
                <v-pagination
                v-model="page"
                @input="next($event)"
                :length="pageLength"
                ></v-pagination>
            </div> 
        </v-card>
        <!-- </v-content>    -->
    </v-app>
</template>
<script>
import axios from 'axios'
import loadChannel from '../common/onProjectLoad.js' 
import { required, minLength } from 'vuelidate/lib/validators'

var imageName = null

export default {

    validations: {
        editedItem:{
            rolename:{
                required,
                minLength: minLength(2)
            },
        },
    },
    mounted(){
        this.headers.map(e =>{
                    e.sortable = false;
        })
    },
    data(){
        return{
            validForm:false,
            clubValid:[],
            targetValid:[],
            sequenceValid:[],
            clubImgName:{},
            clubImage:'',
            clubSequence:'',
            clubTarget:'',
            clubName:'',
            channelData:'',
            clubImgLoc:'',
            clubID:'',
            editedIndex: -1,
            disrolecode: false,
            clubDataDialog: false,
            postdata:'',
            pagination: {},
            pageLength:0,
            page:1,
            skip:0,
            skipdiffrence:this.paginationdiff(),
            channeldatafilter:'all',
            editClubData:{},
            btnname:'',
            statusIndex:'',
            channeldataall:[],
            value:'',
            status:['InActive','Active'],
            getClubResp:[],
            headers:[
                {text: 'Club Name', value: 'clubname'},
                {text: 'Club Image', value: 'clubimage'},
                {text: 'Target', value: 'target'},
                {text: 'Sequence', value: 'sequence'},
                {text: 'Action', value: 'action', sortable: false}
            ],
            itemActive:[
                {text: 'Active', value: 1},
                {text: 'InActive', value: 0},
            ],
            tableData: [],
            status:['Active','InActive'],
            actStatus:'',
            channeldata:[],
                
        }
    },

    created(){
        this.$store.commit('SET_PAGE_TITLE','Club Master');
        loadChannel.getChannel(this, res => {
            console.log("mixin channel data" ,  res)
            let channelalldata=[]
            for(let i =0;i<res.length;i++){
                    
                if(res[i].active === 1){
                    let channetobj ={
                        text:res[i].channelName,
                        value:res[i]._id
                    }
                    this.channeldata.push(channetobj)  
                    this.channeldataall.push(channetobj)
                }

            }
            let alldata={
                        text:'All',
                        value:'all',
                    }
                
                this.channeldataall.unshift(alldata)
        })
        this.channeldatafilter = 'all'
        this.GetClub();
    },

    computed: {
        objmethod() {
            var self=this;
            return this.getClubResp.filter(function(cust){return cust.clubName.toLowerCase().indexOf(self.value.toLowerCase()) >=0
                || cust.clubPicture.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
                || cust.target.toString().toLowerCase().indexOf(self.value.toLowerCase()) >=0
            });
            //return this.customers;
        },
        formTitle () {
            return this.editedIndex === -1 ? 'Add' : 'Edit'
        },
        popupTitle(){
            return this.editedIndex === -1 ? 'New Club' : 'Edit Club'
        },
    },
    methods:{
        next(e){
                       
            let skipdata = e - 1
            console.log('data',skipdata)
            if(skipdata === 0 ){
                this.skip = 0
            }else{
                this.skip = this.skipdiffrence*skipdata
            }
            console.log('skip data',this.skip)
            this.GetRole(this.channeldatafilter,this.skip)
        },
        validateClubFields(value,fieldName){
            try{
                // console.log('Club_FIELDS)=>',value) 
                // let nameRegex =/^[A-Za-z0-9 ]+$/;
                let nameRegex =/^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/;
                let targetRegex =/^[0-9 ]+$/;
                
                if(fieldName == 'name'){
                    this.clubValid = []
                    value === '' ? this.clubValid.push('This is field required') : ''
                    value.match(nameRegex) ? this.clubValid.push() : this.clubValid.push('Only alphabets are allowed')

                }else if(fieldName == 'target'){
                    this.targetValid = []
                    value === '' ? this.targetValid.push('This is field required') : ''
                    value.match(targetRegex) ? this.targetValid.push() : this.targetValid.push('Only numbers are allowed')

                }else if(fieldName == 'sequence'){
                    this.sequenceValid = []
                    value === '' ? this.sequenceValid.push('This is field required') : ''
                    value.match(targetRegex) ? this.sequenceValid.push() : this.sequenceValid.push('Only numbers are allowed')
                }
            }catch(err){}
        },

        imageUpload(ev){
            let self = this;
            
            console.log('UPLOADED_IMAGE__',ev.target.files[0])
            self.clubImgName = ev.target.files[0]
            self.clubImage = ev.target.files[0].name

            // The first thing we need to do is implement a FormData object like this:
            let formData = new FormData();
            formData.append('media_upload', self.clubImgName);

            // Upload API
            const UPLOAD_API = self.API_Service_admin()+'v2/uploadFile';     // server API
            axios.post(UPLOAD_API, formData, {
                headers: {  'Content-Type': 'multipart/form-data' ,
                'Authorization': 'JWT ' + self.getAgentInfo().JWT_token,
                 'sid':self.getAgentInfo().SID_Code} 

            }).then(function(res){
                if(res.data.errCode === -1){
                    self.showLoader('Uploading', false);
                    console.log('IMAGE_RESP : ', res.data.errMsg.location );
                    self.clubImgLoc = res.data.errMsg.location
                }else{
                    // console.log('IMAGE_RESP_ELSE : ' );
                }
            })
            .catch(function(error){
                self.showLoader('Uploading', false);
                // console.log('Catch Error : ', error );
                self.showToast('Something goes wrong during uploading', self.TOST().ERROR);
            });
        },

        Searchdatatable (e) {
            this.value = e;
        },
        channelfilters(e){
            console.log('data',e)
            this.page=1
            this.channeldatafilter = e
            this.GetRole(this.channeldatafilter)
        },
        next(e){
                    
            let skipdata = e - 1
            console.log('data',skipdata)
            if(skipdata === 0 ){
                this.skip = 0
            }else{
                this.skip = this.skipdiffrence*skipdata
            }
            console.log('skip data',this.skip)
            this.GetClub(this.skip)
        },

        GetClub(skip){

            this.GET('fetchClub?skip='+skip,res => {
                console.log('GetResponse CLUBS', res.data.errMsg[0]);
                this.getClubResp = res.data.errMsg[0]

                var pageLen = res.data.errMsg[1]
                let totalCount = pageLen[0].totalCount
                console.log('Page Length:',totalCount)
                this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
            });
        },
        selectStatus(){
            this.statusIndex = this.status.indexOf(this.editedItem.statusSelected)
            console.log('select==>',this.statusIndex)
            
        },

        saveAndEditBtn(_btnname){
             if( _btnname == 'Add' ){
                this.saveClub();
            } 
            else if(_btnname == 'Update'){
                this.editClub();
            }
        },

        addClub(){
            this.disrolecode = false;
            this.btnname='Add';
            // this.editedItem.rolestatus =0 clubSequence

            this.clubImgName = {}
            this.clubImgLoc = ''
            this.clubTarget = ''
            this.clubName = ''
            this.clubSequence = ''
            this.clubImage = ''
            this.clubValid = []
            this.targetValid = []
            this.sequenceValid = []
            this.channelData=this.$store.state.lastchanneselected
            this.clubDataDialog=true;
        },
        setchannel(e){
            console.log("channel store",e)
            this.$store.commit('LAST_CHNNEL_DATA',e)
        },

        editItem (item) {
            console.log("item",item)
            this.editedIndex = this.getClubResp.indexOf(item)
            console.log('index is ',this.editedIndex)
            this.btnname = 'Update' 
            // this.editedItem = Object.assign({}, item)
            this.clubDataDialog = true
            this.clubName = item.clubName
            this.clubImgLoc = item.clubPicture  
            this.clubTarget = item.target  
            this.clubSequence = item.sequenceId
            this.clubID = item._id 
         
        },

        editClub(){
            try{
                var self = this;
                if(self.clubName === '' || self.clubTarget === ''  || self.clubSequence === '' || self.clubImgLoc === '') {
                    // console.log("From IF checkinng Null or empty")
                    self.showToast('Please, Add the required fields','warning');  
                    self.$refs.form.validate() 
                    self.clubValid =  [ !!self.clubName || 'This field is required' ]
                    self.targetValid =  [ !!self.clubTarget || 'This field is required' ]
                    self.sequenceValid =  [ !!self.clubSequence || 'This field is required' ]

                    self.clubDataDialog = true;  
                    return
                }else if(self.clubValid.length !== 0  || self.targetValid.length !== 0  || self.sequenceValid.length !== 0) {
                    // console.log("From IF checkinng Null or empty")
                    self.showToast('Please, Add the correct data','warning');  
                    self.clubDataDialog = true;  
                    return
                }else{
                    self.PUT('update_club/',{              
                            clubName: self.clubName,
                            clubPicture: self.clubImgLoc,
                            target: self.clubTarget,
                            sequenceId:self.clubSequence,
                            id:self.clubID,
                            userId: self.getAgentInfo()._id
                        },res => {
                            if(res.data.errCode === -1){
                                // self.editClubData = res.data.errMsg
                                // console.log("_ editClubData _>",self.editClubData);
                                self.showToast('Club Updated Succesfully','success')
                                self.clubDataDialog = false
                                self.GetClub();
                                self.close();                        
                            }else{
                                self.showToast('Something went wrong','success')
                            }
                    });
                }
            }catch(err){}
        },
   

        deleteItem (item) {
            console.log('item',item)
            const index = this.getresponse.indexOf(item)
            // confirm('Are you sure you want to delete this item?') && 
            this.getresponse.splice(index, 1)
        },

        close () {
            this.clubDataDialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                
                this.editedIndex = -1
            }, 300)
        },
        saveClub () {
            try{
                // console.log("  c Name ",this.clubName, " t ", this.clubTarget, " seq ", this.clubSequence);
                let self = this;

                if(self.clubName === '' || self.clubTarget === ''  || self.clubSequence === '' ||
                    self.clubValid.length !== 0  || self.targetValid.length !== 0  || self.sequenceValid.length !== 0) {
                    // console.log("From IF checkinng Null or empty")
                    self.$refs.form.validate() 
                    self.clubValid =  [ !!self.clubName || 'This field is required' ]
                    self.targetValid =  [ !!self.clubTarget || 'This field is required' ]
                    self.sequenceValid =  [ !!self.clubSequence || 'This field is required' ]

                    self.showToast('Please, Add the required fields','warning');  
                    // self.clubDataDialog = true;  
                    // return
                }else if(self.clubImgLoc === '' ){
                    self.showToast('Please, Upload image for the club','warning');

                }else if(self.clubImgLoc.includes(".png") !== true ){

                    self.showToast('Please, Upload a png file','warning');
                }
                // else if(/^\s+$/g.test(self.editedItem.rolename) || this.$v.$invalid == true ){
                //     self.showToast('Please fill empty fields', self.TOST().WARNING);
                //     return
                // }
                else {
                    this.POST('create_club',{
                        clubName: self.clubName,
                        clubPicture: self.clubImgLoc,
                        target: self.clubTarget,
                        sequenceId:self.clubSequence,
                        userId: self.getAgentInfo()._id
                    },res => {
                        if(res.data.errCode === -1){
                            // console.log('POST CLUB DATA',res.data.errMsg);
                            this.postdata = res.data.errMsg;
                            console.log('post_CLUB_data',this.postdata)
                            this.GetClub();

                            this.channeldatafilter = 'all'
                            // this.GetRole(this.channeldatafilter);
                            this.showToast('Club Created Successfully','success')
                            this.clubDataDialog = false
                        }else if(res.data.errCode === 4){
                            this.showToast(res.data.errMsg,'error')
                            // this.showToast('Datebase Error','error')
                        }
                    });
                    this.close()
                }
            }catch(err){}
        },
    }
     
}

</script>
<style>
    .wrapper-card{
        flex-direction: row;
        flex-wrap: wrap
    }
    .status{
        font-family:roboto; font-weight:500; letter-spacing:0.1px;
    }
    .thebtn{
        display:flex;
        align-items:center; 
        color:white;
        border-radius:5px;
        font-size:15px;
    }
    .btn-size{
        width: 1000px
    }
    .upld-img{
        background-color:#1976d2 ;
        padding: 5px;
        align-items: center;
        border-radius: 3px;
        /* margin-top: 7px;
        margin-left: 7px; */
        width: 186px;
        justify-content: center;
        cursor: pointer;
    }
    .upld-img-pos{
        cursor: pointer;
        position: absolute;
        top:107px;
        right:118px;
        opacity:0
    }
    .club-img{
        height:40px;
        width:40px;
        margin-top:10px
    }
    @media screen and (min-width: 320px){

    }
    @media screen and (min-width: 728px){
        .add-branch-btn{
            display: flex;
            justify-content: flex-end;
            margin-right: 15px;
        }
    }
    @media screen and (min-width: 922px){
        .club-img{
            height:40px;
            width:40px;
            margin-top:10px
        }
        .add-branch-btn{
            display: flex;
            justify-content: flex-end;
            margin-right: 15px;              
        }
    }
</style>
