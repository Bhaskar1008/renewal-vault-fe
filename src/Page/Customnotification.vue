<template>
	<v-app>
		<v-card>
			<v-layout row wrap>
				<v-card flat pr-3 pt-4 pl-3 style="background-color:#FAFAFA; width:100%">
					<v-layout pt-4 pr-3 pl-3 wrap justify-space-between>
						<!-- <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                            <v-select v-model="channeldatafilter"
                                :items="channeldataall"
                                item-text="text"
                                item-value="value"
                                label="Channel"
                                @change="channelfilters">
                            </v-select>
                        </v-flex> -->
						<v-flex></v-flex>
						<v-btn depressed medium slot="activator" color="primary" class="white--text thebtn" @click.native="addpolicy()">Create a new notification
							<v-icon dark right>add_circle</v-icon>
						</v-btn>
						<!-- <v-menu transition="slide-y-transition" >
                                <v-btn  depressed medium slot="activator" color="secondary" @click="openwindow" class="white--text thebtn">
                                    Bulk Upload
                                    <v-icon dark right>publish</v-icon>
                                </v-btn>
                        </v-menu> -->
						<!-- <v-flex xs10 sm6 md2 class="ml-2">
                            <v-text-field  @input="Searchdatatable" v-model="value" label="Search"  append-icon="search" height="30px"></v-text-field>
                        </v-flex> --></v-layout>
				</v-card>
				<v-flex class="ml-3 mr-3 mt-1" style="flex-flow:column wrap;width:98%;">
					<v-layout row justify-space-between class="mr-5 mt-3 ">
						<!-- <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                        <v-select v-model="filterby"
                            :items="filterList"
                            item-text="text"
                            item-value="value"
                            label="Filter by:"
                            @change="filterBY"
                            >
                        </v-select>
                    </v-flex>
                    <v-flex xs10 sm6 md2 class=" mt-1 mr-4">
                        <v-select v-model="valueDrp"
                            :items="valuedata"
                            item-text="text"
                            item-value="value"
                            label="Value"
                            @change="valueDropdown">
                        </v-select>
                    </v-flex> -->
						<v-flex>
							<!-- <v-btn round depressed medium slot="activator" color="primary" class="white--text" @click="gotoLeadForm">
                                    add Policy
                                    <v-icon dark right>add_circle</v-icon>
                                </v-btn> -->
							<v-dialog v-model="dialog" persistent max-width="800px">
								<v-card>
									<v-flex style="background-color:#3a3a3a">
										<v-card-title class="subheading" style="color:white">Create A NEW notification</v-card-title>
									</v-flex>
									<v-card-text>
										<v-container grid-list-md>
											<v-layout wrap>
												<!-- <v-flex xs12 sm6 md6>
													<v-text-field v-model="messagetype" label="Message Type"></v-text-field>
											</v-flex> -->
												<v-flex xs12 sm6 md6>
													<!-- <v-text-field v-model="messagereciver" label="Recievers"></v-text-field> -->
													<v-textarea auto-grow v-model="messagereciver" :rules="receivervalidation" @input="fieldvalidation(messagereciver,'receiver')" label="Recievers" rows="1"></v-textarea>
												</v-flex>
												<v-flex xs12 sm5 md6>
													<v-text-field v-model="payloadtitle" :rules="titlevalidation" @input="fieldvalidation(payloadtitle,'title')" label="Payload Title"></v-text-field>
												</v-flex>
												<v-flex xs12 sm6 md6>
													<!-- notificationbody -->
													<v-textarea auto-grow v-model="payloadbody" :rules="bodyvalidationvalidation" @input="fieldvalidation(payloadbody,'notificationbody')" label="Payload Body" rows="1"></v-textarea>
												</v-flex>
												<!-- <v-flex xs12 sm5 md6>
													<v-text-field v-model="payloadimage" label="Payload image"></v-text-field>
											</v-flex> -->
												<v-flex xs12 sm5 md6 class="">
													<v-select v-model="actionroute" :items="routename" item-text="text" item-value="value" label="Click Action"></v-select>
												</v-flex>
												<v-layout align-center d-flex>
													<v-flex xs12 md2>
														<p class="body-2">Payload image:</p>
													</v-flex>
													<v-flex xs12 sm6 md4 style="position:relative;">
														<input ref="thumb_file" type="file" name="Image_upload" accept="image/x-png,image/jpeg" style="display: none; border: 1px solid red; height: 50px; opacity:1; position: absolute; z-index: 199;" @change="handleFileUpload($event, '', 0, 'thumb')" />
														<p style="margin-left:10px;font-size:10.5px; letter-spacing:0.4px ;font-family:roboto; font-weight:400;">Recommended dimensions - Width 530px, Height: 500px</p>
														<!-- <v-btn color="success">text</v-btn> -->
														<v-btn color="blue-grey" class="white--text" @click="browseFileFromDirectory">Upload
															<v-icon right dark>cloud_upload</v-icon>
														</v-btn>
														<!-- <div style="display:flex;flex-direction:row;align-items:center; position:absolute;">
															<v-btn color="blue-grey" class="white--text">Upload
																<v-icon right dark>cloud_upload</v-icon>
															</v-btn>
															<p>{{formFields.thumnailFileName}}</p>
														</div> -->
													</v-flex>
													<v-flex xs12 sm6 md6 v-if="Object.keys(formFields.thumbnail).length > 0">
														<img :src="formFields.thumbnail.location" style="height: 100px; width: 150px" />
														<!-- <p>{{formFields.thumnailFileName}}</p> -->
													</v-flex>
												</v-layout>
												<v-flex xs12 sm6 md6>
													<v-select v-model="schedulenotification" :items="schedule" label="Schedule" @change="schedulecheck(schedulenotification)"></v-select>
												</v-flex>
												<v-flex v-if="showcalendar === true" xs12 sm6 md6>
													<v-menu :close-on-content-click="false" v-model="calender" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
														<v-text-field slot="activator" v-model="scheduledate" label="Date" persistent-hint prepend-icon="event" required @blur="date = parseDate(scheduledate)"></v-text-field>
														<v-date-picker v-model="date" no-title @input="calender = false"></v-date-picker>
													</v-menu>
												</v-flex>
												<v-flex v-if="showcalendar === true" xs12 sm6 md6>
													<v-menu :close-on-content-click="false" ref="menu" v-model="menu2" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
														<v-text-field slot="activator" v-model="scheduletime" label="Time" persistent-hint prepend-icon="access_time"></v-text-field>
														<!-- <v-date-picker :readonly="disdata" v-model="date1" no-title @input="calender1 = false"></v-date-picker> -->
														<v-time-picker v-if="menu2" v-model="scheduletime" @click:minute="$refs.menu.save(scheduletime)"></v-time-picker>
													</v-menu>
												</v-flex>
											</v-layout>
										</v-container>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn depressed large color="grey lighten-3" @click.native="dialog=false">Discard
											<v-icon right dark>highlight_off</v-icon>
										</v-btn>
										<v-btn v-if="btnname === 'Add'" depressed large color="secondary" @click.native="save">Schedule
											<v-icon dark right>schedule</v-icon>
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-flex>
					</v-layout>
					<v-flex justify-center md12 ml-3 mt-3 mr-5 mb-4>
						<h3 class="text-xs-center mb-3">Details</h3>
						<v-data-table v-model="selected" :headers="headers" :items="getnotification" hide-actions item-key="_id" class="elevation-1">
							<template slot="items" slot-scope="props">
								<td class="text-xs-left">{{props.item.messageid}}</td>
								<td class="text-xs-left">{{props.item.reciver}}</td>
								<td class="text-xs-left">{{props.item.messagetype}}</td>
								<td class="text-xs-left">{{props.item.PayloadTitle}}</td>
								<td class="text-xs-left text-no-wrap">{{props.item.PayloadBody}}</td>
								<td class="text-xs-left">
									<img class="club-img" :src="props.item.Payloadimage"></img>
								</td>
								<td class="text-xs-left">{{props.item.ClickAction}}</td>
								<td class="text-xs-left">{{props.item.Schedule}}</td>
								<td class="text-xs-left">{{props.item.ProcessedAt}}</td>
								<td class="text-xs-left">{{props.item.IsProcessed}}</td>
							</template>
						</v-data-table>
					</v-flex>
				</v-flex>
			</v-layout>
			<!-- Pagination -->
			<!-- <div class="text-xs-center pagination">
				<v-pagination v-model="page" @input="next($event)" :length="pageLength"></v-pagination>
			</div> -->
			<!-- <v-dialog v-model="dialogBulkUpld" persistent max-width="700px">
				<v-card>
					<v-flex style="background-color:#3a3a3a">
						<v-card-title class="subheading" style="color:white;justify-content:space-between;">Upload File
							<v-icon dark @click="dialogBulkUpld = false">clear</v-icon>
						</v-card-title>
					</v-flex>
					<v-card-text>
						<v-container grid-list-md>
							<v-stepper v-model="steps">
								<v-stepper-header>
									<v-stepper-step step="1">Upload Data</v-stepper-step>
									<v-divider></v-divider>
									<v-stepper-step :complete="steps > 1" step="2">Status</v-stepper-step>
								</v-stepper-header>
								<v-stepper-items>
									<v-stepper-content step="1">
										<v-card-text class="body-2 pa-0 pl-2 mb-3">Select File for upload:</v-card-text>
										<v-layout>
											<v-flex class="fileContainer-bulk  mt-6">
												<v-text class="upload-text">UPLOAD FILE</v-text>
												<v-icon right dark>publish</v-icon>
												<input type="file" id="fileUpload" @change="jsonupload">
											</v-flex>
											<v-layout ml-3 column>
												<v-text v-if="excelfilename !== '' " class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">{{excelfilename}}</v-text>
												<v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Supports xls/csv format.</v-text>
												<v-text class=" caption font-weight-regular font-italic" style="color:#bfbfbf;">Approx time to upload 2 mb file - 30 min.</v-text>
											</v-layout>
										</v-layout>
										<v-layout ml-3 mt-3>
											<div v-if="fileLink !== ''">
												<v-layout row>
													<div class="font-weight-medium body-2 ">Selected File:</div>
													<div class="body-1 font-weight-regular font-italic">{{fileLink}}</div>
												</v-layout>
											</div>
										</v-layout>
										<v-layout mt-3 justify-space-between>
											<a href="https://image-upload-bucket-2019.s3.amazonaws.com/e752617bcc158e0be6cf5ffbdce95d5b9238e274.xlsx" download>
												<v-btn color="primary">sample file
													<v-icon right dark>save_alt</v-icon>
												</v-btn>
											</a>
											<v-btn color="primary" @click="goNext()">Next
												<v-icon class="ml-2" size="20px">arrow_forward</v-icon>
											</v-btn>
										</v-layout>
									</v-stepper-content>
									<v-stepper-content step="2">
										<v-flex xs12 sm12 md12 style="display:flex;align-items:center">
											<v-icon large color="success">check_circle_outline</v-icon>
											<v-text class="subheading font-weight-medium ml-3">{{sucessCount}} Users Data successfully Uploaded</v-text>
										</v-flex>
										<v-flex xs12 sm12 md12 mt-3 style="display:flex;align-items:center">
											<v-icon large color="error">highlight_off</v-icon>
											<v-text class="subheading font-weight-medium ml-3">Errors Found in {{failCount}} Users Data</v-text>
										</v-flex>
										<v-flex mt-3>
											<v-text class="subheading font-weight-medium ml-1">Failed Data:</v-text> <a :href="errorLink" download>{{errorLink}}</a>
										</v-flex>
										<v-card-actions style="justify-content:flex-end;">
											<v-layout mt-5 justify-space-between>
												<v-btn color="primary" @click="steps =1 ">
													<v-icon class="mr-2">arrow_back</v-icon>Previous</v-btn>
												<v-btn color="primary" @click="cancelStepper">Close
													<v-icon class="ml-2" size="20px">clear</v-icon>
												</v-btn>
											</v-layout>
										</v-card-actions>
									</v-stepper-content>
								</v-stepper-items>
							</v-stepper>
						</v-container>
					</v-card-text>
				</v-card>
			</v-dialog> -->
			<!-- Manual Allocation Popup  -Salman -->
			<v-dialog v-model="manualAlloc" max-width="750">
				<v-card>
					<v-layout justify-space-between style="background-color:#424242">
						<v-card-title class="title" style="color:white">Manual Allocation</v-card-title>
						<v-flex xs4 class="mr-2 mt-2">
							<v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class=""></v-text-field>
						</v-flex>
					</v-layout>
					<v-flex pa-2>
						<v-flex v-if="showAlertext == true">
							<v-flex>
								<v-text class="caption font-weight-medium" style="color:#C62828">#Some of the selected leads do not have common ‘city’ value</v-text>
							</v-flex>
							<v-flex>
								<v-text class="caption font-weight-medium" style="color:#C62828">#Some of the selected leads are already allocated</v-text>
							</v-flex>
						</v-flex>
						<v-layout>
							<v-flex xs3>
								<v-flex>
									<v-text-field label="State"></v-text-field>
								</v-flex>
								<v-flex>
									<v-text-field label="City"></v-text-field>
								</v-flex>
								<v-flex>
									<v-text-field label="Branch"></v-text-field>
								</v-flex>
								<v-btn round small color="primary" @click="manualAlloc = false">Show agents</v-btn>
							</v-flex>
							<v-flex xs9 ml-3>
								<v-flex v-if="showAlertext == true" style="display:flex;justify-content:center">
									<v-flex xs5 ml-3 mt-4>
										<v-img src="/web/assets/Group2686.png" style="height:120px;width:140px"></v-img>
										<v-flex xs10 mt-1>
											<v-text class="caption font-weight-medium" style="color:#90A4AE">Either select a branch or search for agent code</v-text>
										</v-flex>
									</v-flex>
								</v-flex>
								<v-flex v-if="showAlertext == false">
									<v-data-table v-model="selected" :headers="popHeader" hide-actions :pagination.sync="pagination" select-all item-key="_id" class="elevation-1">
										<template slot="items" slot-scope="props">
											<td class="">{{props.item.Fname}}</td>
											<td class="">{{props.item.Lname}}</td>
											<td class="">{{props.item.agentId}}</td>
											<td class="">{{props.item.reportingManager}}</td>
											<td class="">{{props.item.userStats}}</td>
											<td class="">{{props.item.openLeads}}</td>
										</template>
									</v-data-table>
									<v-layout wrap align-center>
										<v-flex text-sm-center mt-1>
											<v-flex>
												<v-text class="caption font-weight-medium" style="color:#C62828">Cannot proceed!</v-text>
											</v-flex>
											<v-flex>
												<v-text class="caption font-weight-medium" style="color:#C62828">The count of selected agents is more than the count of leads</v-text>
											</v-flex>
										</v-flex>
										<v-btn round small disabled color="primary" @click="manualAlloc = false">Allocate</v-btn>
									</v-layout>
									<div class="text-xs-center pt-2">
										<v-pagination v-model="pagination.page" :length="pages"></v-pagination>
									</div>
								</v-flex>
							</v-flex>
						</v-layout>
					</v-flex>
					<v-card-actions>
						<!-- <v-spacer>/</v-spacer> --></v-card-actions>
				</v-card>
			</v-dialog>
			<!-- Auto Allocation Popup  -Salman -->
			<v-dialog v-model="autoAlloc" max-width="650">
				<v-card>
					<v-flex style="background-color:#424242">
						<v-card-title class="title" style="color:white">Auto Allocation</v-card-title>
					</v-flex>
					<v-flex text-sm-center mt-4>
						<v-text class="body-1 font-weight-bold" style="color:#0277BD">Allocating...</v-text>
					</v-flex>
					<v-flex text-sm-center mt-2 mb-4>
						<v-text class="body-1 font-weight-bold">25 leads from 6 cities to agents in 6 branches</v-text>
					</v-flex>
					<v-card-actions style="justify-content:space-between">
						<v-btn small round color="primary" @click="autoAlloc = false">Undo Process</v-btn>
						<v-btn small round color="primary" @click="autoAlloc = false">finish</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card>
	</v-app>
</template>
<script>
	import axios from 'axios'
	import loadChannel from '../common/onProjectLoad.js'
    var fileUpload = null
    const HELPING_TEXT = "Supports mp4 format. Approx time to upload 15mb file - 2 mins or more";
	
	
	export default {
	    filters: {
	
	       formateDate(milisecond) {
	           try {
	               return new Date(parseInt(milisecond)).toLocaleDateString()
	           } catch(err) {
	               return milisecond;
	           }
	       }
	   },
	    created(){
	            this.$store.commit('SET_PAGE_TITLE','Policy List');
	            console.log("The Agent ID from store is ->", this.getAgentInfo()._id);
	
	
	        loadChannel.getChannel(this, res => {
	                    console.log("mixin channel data" ,  res)
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
	         this.GetAllLeadData(this.channeldatafilter,this.skip);
	
	    },
	
	    mounted(){
	        this.GetAgentstate();
			// this.getAgentCity();
			this.headers.map(e =>{
                    e.sortable = false;
        	})
	    },
	    data(){
	        return{
                schedule:[{text:'Now',value:'now'},{text:'Defined Time',value:'DefinedTime'}],
                menu2:false,
                messagetype:'',
                messagereciver:'',
                payloadtitle:'',
                payloadbody:'',
                payloadimage:'',
                actionroute:'',
                scheduledate:'',
                scheduletime:'',
                picker:null,
				showcalendar:false,
				receivervalidation:[],
				titlevalidation:[],
				bodyvalidationvalidation:[],
	            PLID:'',
	            filterByData:'',
	            newpropid:[],
	            viewingdata:{},
	            proposaldata:[],
	            clientid:[],
	            validationRule:[],
	            validUser:[],
	            validPolicy:[],
	            CLID:'',
	            clienids:[],
	            mode:['Yearly', 'Half-yearly', 'Quarterly', 'Monthly'],
	            // {text:'Renew',value:'renew'},{text:'Surrendered',value:'surrendered'}
	            policystatusdata:[{text:'Inforce',value:'inforce'},{text:'Lapsed',value:'lapsed'},],
	            policytypedata:[{text:'Regular',value:'regular' },{text:'Single',value:'single'},{text:'Limited',value:'limited'}],
	            policytermsdata:["5","10","15","20","25"],
	            calender:false,
	            calender1:false,
	            date:null,
	            date1:null,
	            disdata:false,
                 cityDrp:'',
                schedulenotification:'',
	            Policyobjdata: {
	               pdt:'',
	               rider:'',
	               policyterms:'',
	               policytype:'',
	               policystatus:'',
	               installpremium:'',
	               totalsumassured:'',
	               premiumdue:'',
	               lastpremiumpaid:'',
	                paymode:'',
	                ClientId:'',
	
	                PolicyId:'',
	                custchanelCode:'',
	            },
	            dialog: false,
	            value:'',
	            TableName:'',
	            pageLength:0,
	            finalpolicydata:{},
	            page:1,
	            skip:0,
	            skipdiffrence:this.paginationdiff(),
	            channeldatafilter:'all',
	            channeldataall:[],
	            channeldata:[],
	            policyresponce:[],
	            selected:[],
	            manualAlloc:false,
	            autoAlloc:false,
	            showAlertext:false,
	            showCityDrop:false,
	            pagination:{},
	            bulkData:[],
	            filterStruct:'',
	            cityDataDrp:[],
	            getState:{},
	            Citylist:[],
	            StateListdata:[],
	            sucessCount:0,
	            failCount:0,
	            errorLink:'Link Comes Here',
	            fileLink:'',
	            excelfilename:'',
	            dialogBulkUpld:false,
	            Policydatalist:[],
	            filterby:'',
	            valueDrp:'',
                valuedata:[],
                routename:[{text:'/leadMaster/all_leads',value:'/leadMaster/all_leads'},
                {text:'/existingmaster/existingall',value:'/existingmaster/existingall'},
                {text:'/renewself/rselfall',value:'/renewself/rselfall'},
                {text:'/notifypage',value:'/notifypage'}],
	            filterList:[
	                    {text: 'Status', value: 'status'},
	                    {text: 'Product Name', value: 'productname'},
	                    {text: 'Premium Type', value: 'PremiumType'},
	                    // {text: 'Source', value: 'source'},
	                    // {text: 'Campaign', value: 'campaign'},
	                    // {text: 'Affiliate', value: 'affiliate'},
	                    {text: 'State', value: 'state'},
	                    // {text: 'City', value: 'city'},
	
	                ],
	
	            Status:[
	                {text:'Renew', value:'renew'},
	                {text:'Lapsed', value:'lapsed'}
                ],
                getnotification:[{
                    messageid:'Nf141412',
                    reciver:'3955942, 3953026,',
                    messagetype:"-",
                    PayloadTitle:'A new wave is coming',
                    PayloadBody:'This new year we are releasing some special scheme to help you earn more. Check details',
                    Payloadimage:'web/assets/registration_card.png',
                    ClickAction:'/ParterDetails',
                    Schedule:'02/14/20 2:12:01 PM',
                    ProcessedAt:'02/14/20 2:25:50 PM',
                    IsProcessed:'Yes'
                    
                }
                // ,{
                //     title:'MedCare Plus',
                //     notifybody:'Please Update your Daily Goal',
                //     image:'web/assets/registration_card.png',
                //     externalurl:"-",
                //     internalurl:'-',
                //     sendy:'Admin',
                //     empcode:'Mahesh shinde'
                // },{
                //     title:'MedCare Plus',
                //     notifybody:'Please Update your Daily Goal',
                //     image:'web/assets/registration_card.png',
                //     externalurl:"-",
                //     internalurl:'-',
                //     sendy:'Admin',
                //     empcode:'Mahesh shinde'
                // },{
                //     title:'MedCare Plus',
                //     notifybody:'Please Update your Daily Goal',
                //     image:'web/assets/registration_card.png',
                //     externalurl:"-",
                //     internalurl:'-',
                //     sendy:'Admin',
                //     empcode:'Mahesh shinde'
                // }
                ],
	            headers:[
	                        {text: 'Message ID', value: 'MessageID'},
                            {text: 'Receivers', value: 'Receivers'},
	                        {text: 'Message Type', value: 'MessageType'},
	                        {text: 'Payload Title', value: 'PayloadTitle'},
                            {text: 'Payload Body', value: 'PayloadBody',},
                            {text: 'Payload image', value: 'Payloadimage'},
                            {text: 'Action Click', value: 'ActionClick'},
                            {text: 'Schedule', value: 'Schedule'},
	                        {text: 'Processed At', value: 'ProcessedAt'},
	                        {text: 'IsProcessed?', value: 'IsProcessed'}
                            

	                        // {text: 'Action', value: 'action', sortable: false}
	                    ],
	
	            popHeader:[
	                {text:'First Name',value:'Fname'},
	                {text:'Last Name',value:'Lname'},
	                {text:'Agent ID',value:'agentId'},
	                {text:'Reporting Manager',value:'reportingManager'},
	                {text:'User Status',value:'userStats'},
	                {text:'Open Leads',value:'openLeads'},
	            ],
	            leadData:[],
                errormsg:'',
                indexofedit:null,
                imagefile:'',
                 planImages: {
                text: "Drag Images here",
                file: '',
                respFileName: '',
                respFileType: '',
                 },
                tempsrc: null,
                thumnailFileName: 'File Name',
                // thumbnail: {},
                formFields: {
                thumbnail: {},
                title: '',
                content: '',
                channelCode: '',
                roleCode: '',
                salesPitchCategory: '',
                videoTitle: '',
                youtubeURL: '',
                visible: false,
                showStepper: false,
                mediaFiles:[],
                publishStatus: '0',
                active: '0',
                URLWrong: false,
                errMsg: [],
                HTTP: 'POST',
                fileis:'',
                editFile: false,
                fileName: HELPING_TEXT,
                lightBox: {
                    location: '',
                    ext: ''
                },
                
                // thumnailFileName: 'File Name',
               
                // thumbnail: {},
                videoitis:false,
                imageitis:false,
                pdfitis:false,
            
            },
	        }
	    },
	    computed:{
	        objmethod() {
	         var self=this;
	         return this.Policydatalist.filter(function(cust){return cust.policy_id.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.client_id.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.policy_status.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	        //  || cust.SumAssured.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.productname.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.pol_term.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.prem_type.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.ann_prem_with_serv_tax.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.total_sum_assured.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.mode.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         || cust.premium_due_date.toLowerCase().indexOf(self.value.toLowerCase()) >=0
	         });
	        // }
	      },
	
	                                        // <td class="">{{props.item.policy_id}}</td>
	                                        // <td class="">{{props.item.client_id}}</td>
	                                        // <td class="">{{props.item. policy_status}}</td>
	                                        // <td class="">{{props.item.productname}} </td>
	                                        // <td class="">{{props.item.pol_term}} </td>
	                                        // <td class="">{{props.item.prem_type}} </td>
	                                        // <td class="">{{props.item.ann_prem_with_serv_tax}}</td>
	
	                                        // <td class="">{{props.item.total_sum_assured}}</td>
	                                        // <td class="">{{props.item.mode}}</td>
	                                        // <td class="">{{props.item.premium_due_date}}</td>
	
	      pages () {
	        if (this.pagination.rowsPerPage == null ||
	          this.pagination.totalItems == null
	        ) return 0
	
	        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
	      }
	
	        },
	        watch:{
	        date (val) {
	            this.scheduledate = this.formatDate(this.date)
	            console.log("From watcher the date is =>", scheduledate);
	        },
	        picker (val) {
                console.log('Watcher Time',this.scheduletime)
	            this.scheduletime = this.formatDate(this.scheduletime)
	        }
	        },
	
	    methods:{
			
			fieldvalidation(value,fieldName){
				let receiver =/^[A-Za-z0-9, ]+$/;
				let targetRegex =/^[0-9 ]+$/;
				let nameRegex =/^[A-Za-z ]+$/;
				if(fieldName == 'receiver'){
					this.receivervalidation = []
					value === '' ? this.receivervalidation.push('This is field required') : ''
					value.match(receiver) ? this.receivervalidation.push() : this.receivervalidation.push('Only alphabets and numbers are allowed')
				}else if(fieldName == 'title'){
					this.titlevalidation = []
					value === '' ? this.titlevalidation.push('This is field required') : ''
					value.match(nameRegex) ? this.titlevalidation.push() : this.titlevalidation.push('Only alphabets are allowed')
				}else if(fieldName == 'notificationbody'){
					this.bodyvalidationvalidation = []
					value === '' ? this.bodyvalidationvalidation.push('This is field required') : ''
					value.match(receiver) ? this.bodyvalidationvalidation.push() : this.bodyvalidationvalidation.push('Only alphabets and numbers are allowed')
				}
        	},
			browseFileFromDirectory () {
				this.$refs.thumb_file.click();
			},
             uploadFile(sendFile, thumb) {
            let _this = this;
            let formData = new FormData();
            formData.append('media_upload', sendFile);
          
            const UPLOAD_API ='v2/uploadFile'

    
            this.POST( UPLOAD_API, formData, (res, err) => {
              
                    _this.showLoader('Uploading', false);
                    if (res.data.errMsg.fileType == 'mp4') {
                        
                    if(this.formFields.editFile){
                          _this.formFields.mediaFiles.splice(0, 1, res.data.errMsg); 
                    }else{
                        _this.formFields.mediaFiles.push(res.data.errMsg);
                    }
                        
                          this.videoitis = true;
                          this.imageitis = false;
                          this.pdfitis =false;

                    }else if(thumb == 'thumb'){
                            
                            console.log('THUMB is ?=>', thumb)
                            console.log("Uploaded Thumbnail is ->", res.data.errMsg)
                            _this.formFields.thumbnail = {location: res.data.errMsg.location };

                    }else if(res.data.errMsg.fileType == 'jpg' || res.data.errMsg.fileType == 'jpeg' || res.data.errMsg.fileType == 'png' && thumb == undefined) {
                      
                        if(  this.formFields.editFile == true){
                        
                                 _this.formFields.mediaFiles.splice(this.indexofedit, 1,res.data.errMsg )
                        }else{
                              _this.formFields.mediaFiles.push(res.data.errMsg);
                
                                console.log("media files after pushing category from IMG",  _this.formFields.mediaFiles);
                                console.log("media files active in-active is from IMG ->",  _this.formFields.mediaFiles[0].active)
                        }
                         this.imageitis = true;
                         this.videoitis = false;
                         this.pdfitis =false;
                        
                    }else{
                        // pdf up99
                        console.log("PDF file response is=>", res.data.errMsg);
                         if(this.formFields.editFile == true){
                                 
                                 _this.brochurestabledata.splice(0, 1,{
                                            fileName: res.data.errMsg.fileName,
                                            fileType: res.data.errMsg.fileType,
                                            active: res.data.errMsg.active,
                                            location: res.data.errMsg.location,
                                            // category: this.sendcat,
                                });  
                            
                         }else{

                                _this.brochurestabledata.push({
                                            fileName: res.data.errMsg.fileName,
                                            fileType: res.data.errMsg.fileType,
                                            active: res.data.errMsg.active,
                                            location: res.data.errMsg.location,
                                            // category: this.sendcat,
                                });
                                this.pdfitis = true;
                                console.log("to be sent to mainmedia->", this.brochurestabledata);
                                this.videoitis = false;
                                this.imageitis = false;
                                
                                    _this.brochures= {
                                        text: "UPLOAD",
                                        file: '',
                                        respFileName: '',
                                        respFileType: ''
                                    } 
                        }
                        
                    }
                // }

                if ('fileName' in res.data.errMsg) {
                    _this.showToast('File uploaded successfully', _this.TOST().SUCCESS);
                } else {
                    _this.showToast('Uploading process intrupted', _this.TOST().ERROR);
                }
            })
            .catch(err => {
                _this.showLoader('Uploading', false);
                _this.showToast('Something goes wrong during uploading', _this.TOST().ERROR);
            })
        },
        validateFiles(id, thumbfile, thumb) {
                console.log("id is ->", id + "thumbfile=>", thumbfile + "thumb",thumb);
                let sendFile = {};
                // console.log("file to be uploaded is-->", file);

                if(id == 1){
                    // for video
                    // var regex_VID = new RegExp('^(mp4)$');
                    sendFile =  this.formFields.fileis;
                    console.log("From video sendFile ->",sendFile);
                    // console.log("for SPlit ->", sendFile.type.split("/")[1]);
                    this.showLoader('Uploading', true);
                    this.uploadFile(sendFile);

                }else if(id == 2){
                    // for image
                    // var regex_IMG = new RegExp('^(jpg|jpeg|png)$');
                    sendFile = this.planImages.file;
            
                    console.log("ready to Send file is ->", sendFile )
                    this.showLoader('Uploading', true);
                    this.uploadFile(sendFile);

                }else if(id == 3){
                    // for pdf
                    var regex_PDF = new RegExp('^(pdf)$');
                    sendFile = this.brochures.file;
                            console.log("ready to Send PDF file is ->", sendFile);
                    this.showLoader('Uploading', true);
                    this.uploadFile(sendFile);
                    
                }else if(id == 4){

                    sendFile = thumbfile
                    console.log("SF->", sendFile + "Thumbnail->", thumb);  
                
                    this.uploadFile(sendFile, thumb)

                }
                    // var regex_VID = new RegExp('^(pdf|mp4|jpg|jpeg|png)$');
                    // sendFile = file;
                    // console.log("Sending valid Files->", sendFile);
                    // if (id == 5) {
                    //     if (regex_VID.test(sendFile.type.split("/")[1])){
                    //         // this.showToast('File is correct', this.TOST().INFO);
                    //         this.showLoader('Uploading', true);
                    //         this.uploadFile(sendFile);  // uplaod file from this function Date 9/JAN/2019
                    //     } else {
                    //         this.showToast('You can\'t upload this file type from here', this.TOST().WARNING);
                    //     }
                    // }
        },
            handleFileUpload(event, indicator, index, thumb) {
            /**
             * The editFile property helps in file upload process,
             * User uploading a new file or reuploading (means replace with exisiting)
            */

            console.log("Are we posting from Upload button?", event.target.files);
            
            console.log('Event : ', event+ "index"+index+"indicator"+indicator);
            this.indexofedit = index;
            this.formFields.editFile = indicator == 'edit' ? true : false;
            console.log("EDIT button pressed ? ",  this.formFields.editFile);
            // return

            try {
                if (event.target.files.length > 0) {
                
                    // if (this.e1 == 2) { tc99
                        try{ 
                            if(event.target.files[0].type.split("/")[0] === "video"){
                                    this.formFields.fileName = event.target.files[0].name;
                                    console.log("VIDEO FOUND AND CONDITION REACHED", event.target.files[0].type)
                                    this.formFields.fileis = event.target.files[0]
                                if( this.formFields.editFile){
                                    console.log("edit found true from VID");
                                    this.validateFiles(1);
                                }
            
                            }else if (event.target.files[0].type.split("/")[0] === "image" && thumb == undefined) {
                                // 25/03/2019
                                // this.formFields.thumnailFileName = event.target.files[0].name;
                                this.planImages.file = event.target.files[0];
                                this.planImages.text = this.planImages.file.name;
                                console.log("From Image block...",  this.planImages.file);
                                if(this.formFields.editFile){
                                    console.log("edit found true from IMG");
                                    this.validateFiles(2);
                                }
                               
                            }else if(thumb == 'thumb'){
                                var selfis = this
                                    var _URL = window.URL || window.webkitURL;
                                    
                                    this.tempsrc = _URL.createObjectURL(event.target.files[0])
                                    console.log("thumbnail uploaded is ->", this.tempsrc );

                                    var img= new Image();

                                    img.src = this.tempsrc;
                                    
                                    img.onload= function() {
                                        //   var  widthboolean , heightboolean 

                                        //   if( this.width < 690 && this.width > 1280 ) {
                                                // alert("Thumbnail width is too Small");
                                                // widthboolean = false
                                        //   }else{
                                            //    alert("Thumbnail width acceptable");
                                            //    widthboolean = true
                                        //   }

                                        //   if(this.height > this.width){

                                                // alert("Thumbnail is not a landscape");
                                                //  heightboolean = false
                                        //   }else if(this.height < 450 || this.height > 1440){
                                                // alert("Thumbnail is too Small");
                                                //  heightboolean = false
                                        //   }else{
                                            //    alert("Thumbnail acceptable");
                                            //    heightboolean = true
                                        //   }
                                        // if(widthboolean == true && heightboolean == true ){
                                            // alert("Uploading thumbnail");
                                           selfis.formFields.thumnailFileName = event.target.files[0].name
                                        //    console.log("thumbnail File name ->", event.target.files[0].name);
                                           selfis.validateFiles(4, event.target.files[0], thumb);
                                        // }else{
                                            //  self.showToast('Please choose a different thumbnail', self.TOST().WARNING);
                                            //  alert("choose a different thumbnail");
                                            //  selfis.formFields.thumnailFileName = ""
                                        // }
                                    }
                                 
                                //     var img =  document.getElementById("theimgfound").width 
                                     
                                //    console.log("new img is", img);
                                    // console.log("img is ->",img );
                                    // var width = img.naturalWidth;
                                    // var height = img.height;
                                    //  this.validateFiles(4, event.target.files[0], thumb);

                            }else {
                               
                                  if(indicator == 'edit'){
                                        
                                         this.brochures.file = event.target.files[0];
                                         this.brochures.text = this.brochures.file.name;
                                         console.log("edit found true from PDF", this.brochures.text , "was edit true->", this.formFields.editFile);
                                         
                                         this.validateFiles(3);
                                  }else{
                                        this.brochures.file = this.$refs.brochuresFiles.files[0];
                                        // console.log("Before Name PDF ?", this.$refs.brochuresFiles.files[0]);
                                        console.log("reached else for PDF", this.$refs.brochuresFiles.files[0]);
                                        this.brochures.text = this.brochures.file.name;
                                  }
                                
                                 
                                // console.log("do we get files?=>",  this.brochures.file +"  Do we get text->", this.brochures.text )
                               
                           
                            }
                        } catch(err) {
                            console.log(err);
                            this.showToast('You have selected wrong file', this.TOST().WARNING);
                        }
                    // }
                }
            } catch(err) {
                console.error(err);
            }
        },
            uploadThumb() {
                this.save()
                this.$refs.thumb_file.click();
            },
            schedulecheck(event){
                console.log('schedule event',event);
                
                if(event === 'DefinedTime'){
                    this.showcalendar = true
                }else{
                    this.showcalendar = false
                }
            },
	
	        pdtPolicy(event){
	            // console.log('PDT event ',event)
	            if(event === '' || event == null || event == undefined){
	                this.validationRule = [() => !!this.Policyobjdata.pdt || 'This field is required']
	            }else{
	                this.GET('validate_pdt_code?pdt_code=' + event,res => {
	                if(res.data.errCode === -1){
	                    // console.log('PDT POLICY',res.data.errMsg)
	                    this.validationRule = []
	                }else if(res.data.errCode === 250){
	                    this.validationRule = ['Product code is invalid']
	                }else if(res.data.errCode === 4){
	                    this.showToast('Database Error', this.TOST().ERROR);
	                }
	
	            })
	            }
	
	        },
	
	        resetCustFilters(){
	            this.channeldatafilter = 'all';
	            this.filterby = '';
	            this.valueDrp = '';
	            this.cityDrp = '';
	            this.filterStruct = '';
	            this.GetAllLeadData()
	        },
	
	             GetAgentstate(){
	            this.GETSTATE(res=>{
	                console.log("State",res)
	                this.getState = res;
	                for(let i =0;i<this.getState.length;i++){
	                    let statedata={
	                        text:this.getState[i].region_data.name,
	                        code:this.getState[i].region_data.adminCode1
	                    }
	                    this.StateListdata.push(statedata)
	                }
	
	            })
	            console.log(this.StateListdata,"response mixin data")
	            },
	
	            cityfind(ev){
	            console.log("event ", this.StateListdata)
	            let codes= this.StateListdata.filter(e=>{
	                if(e.text === ev){
	                    return e.code
	                }
	            })
	            console.log("event filter",codes)
	            this.GETCITY(codes[0].code,resp=>{
	                console.log("city ", resp[0].cities)
	                this.Citylist = resp[0].cities
	            })
	        },
	
	             cityData(event){
	            // console.log("City event ", event)
	            // console.log("city :>>", this.citypop)
	            // console.log("State :>>", this.statepop)
	                this.GET('getbranch?branchfilter=All&created_by='+this.$store.state.agentDetails._id+'&skip=0&user_city='+this.citypop+'&user_state='+this.statepop,res => {
	                console.log('Branch details',res.data.errMsg[0])
	                this.branchArray=[];
	                let branchArr = res.data.errMsg[0];
	                for(var i =0;i< branchArr.length;i++)
	                {
	                    let brdata={
	                        text: branchArr[i].branchName,
	                        value: branchArr[i]._id,
	                    }
	                        this.branchArray.push(brdata)
	                }
	            //    console.log("Branch Array ==>>>",this.branchArray)
	            })
	
	        },
	
	           editItem (item,i) {
	             console.log("Data is",item)
	            this.TableIndex = i
	            this.btnname = 'Update';
	            this.dialog = true
	            this.disdata = true;
	            // console.log("Premium Due date in format=>", fullobj.premium_due_date);
	            // this.viewingdata = item;
	            // console.log("The Viewing data is->",   this.viewingdata)
	            var datelength = 10;
	           if(item.fullobj.premium_due_date.length > datelength ){
	              console.log("Is in Miliseconds");
	              console.log("CONVERTED FROM MILISECONDS IS=>", new Date(parseInt(item.fullobj.premium_due_date)).toLocaleDateString());
	                this.Policyobjdata.premiumdue = new Date(parseInt(item.fullobj.premium_due_date)).toLocaleDateString()
	           }else{
	               console.log("Not in milseconds", item.fullobj.premium_due_date);
	                this.Policyobjdata.premiumdue = item.fullobj.premium_due_date;
	           }
	
	            this.Policyobjdata.rider = item.fullobj.is_rider
	            this.Policyobjdata.policyterms =  item.fullobj.pol_term
				this.Policyobjdata.policytype =  item.fullobj.prem_type
				this.Policyobjdata.policystatus =  item.fullobj.policy_status
				this.Policyobjdata.installpremium =  item.fullobj.ann_prem_with_serv_tax
	            this.Policyobjdata.totalsumassured =  item.fullobj.total_sum_assured
	
	            // this.Policyobjdata.premiumdue =  item.fullobj.premium_due_date
	            // console.log("The premium date =>", item.fullobj.premium_due_date.toLocaleDateString());
	            this.Policyobjdata.custchanelCode = item.fullobj.customerChannel._id
	            this.Policyobjdata.ClientId = item.fullobj.client_id
	            this.Policyobjdata.PolicyId = item.fullobj.policy_id
	            this.Policyobjdata.pdt = item.fullobj.pdt_code.product_code
	            this.Policyobjdata.lastpremiumpaid = item.fullobj.last_premium_paid_date
	            this.Policyobjdata.paymode = item.fullobj.mode
	
				//this.Policyobjdata.lastpremiumpaid =  this.viewingdata.
				// this.Policyobjdata.themode =  this.viewingdata.application_id_ref.benefitIllustration.
	
	            },
	                // Vuetify code
	            formatDate (date) {
	                if (!date) return null
	                const [year, month, day] = date.split('-')
	                return `${month}/${day}/${year}`
	            },
	            // Vuetify code
	            parseDate (date) {
	                if (!date) return null
	                const [month, day, year] = date.split('/')
	                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
	            },
	
	        searchclient(e){
	            console.log("CLIENT Searched is-->", e)
	        },
	        SerchValidUser(event){
	            console.log('VALID USER',event)
	            if(event !== ''){
	            this.GET('validate_customer?client_id='+event, resp=>{
	                if(resp.data.errCode === -1){
	                     this.showToast('Customer Id Matched',this.TOST().SUCCESS)
	                     this.validUser = []
	
	                }else if(resp.data.errCode === 250){
	                //   this.showToast('Client Id Not Valid',this.TOST().ERROR)
	                  this.validUser = ['Customer ID not valid']
	                }else if(res.data.errCode === 4){
	                    this.showToast('Database Error', this.TOST().ERROR);
	                }
	            })
	            }else{
	                this.validUser = []
	            }
	        },
	        SerchValidPolicy(event){
	            console.log('VALID POLICY',event)
	            this.GET('validate_policy?policy_id='+event, resp=>{
	
	                if(resp.data.errCode === -1){
	                    this.showToast('Policy Id Matched',this.TOST().SUCCESS)
	                }else if(resp.data.errCode === 250){
	                //   this.showToast('Policy Id Not Valid',this.TOST().ERROR)
	                // Because of incorrect api error code it will success the when error code 250 so i have set the success Toast in this section please remove once the backend issue fixed
	                    this.showToast('Policy Id Matched',this.TOST().SUCCESS)
	
	                }else if(res.data.errCode === 4){
	                    this.showToast('Database Error', this.TOST().ERROR);
	                    this.validPolicy = ['Policy ID not valid']
	
	                }
	            })
	        },
	
	
	            save(){
				 
	            },
	            addpolicy(){
				this.receivervalidation = [];
				this.titlevalidation = [];
				this.bodyvalidationvalidation = [];
	            this.btnname = 'Add';
	            this.disdata = false
	            this.Policyobjdata.rider = ''
	            this.Policyobjdata.policyterms = ''
				this.Policyobjdata.policytype =  ''
				this.Policyobjdata.policystatus =  ''
				this.Policyobjdata.installpremium =  ''
				this.Policyobjdata.totalsumassured =  ''
	            this.Policyobjdata.premiumdue =  ''
	            this.Policyobjdata.custchanelCode = ''
	            this.Policyobjdata.ClientId = ''
	            this.Policyobjdata.PolicyId = ''
	            this.Policyobjdata.pdt = ''
	            this.Policyobjdata.lastpremiumpaid = ''
	            this.Policyobjdata.paymode = ''
	            this.dialog = true;
	        },
	
	        gotoLeadForm() {
	            // Here, Store is clear before going to next page
	            this.commit('SAVE_LEAD_RESPONSE', null);
	            this.jump('/Lmaster/status');
	      },
	       toggleAll () {
	        if (this.selected.length) this.selected = []
	        else this.selected = this.desserts.slice()
	      },
	      changeSort (column) {
	        if (this.pagination.sortBy === column) {
	          this.pagination.descending = !this.pagination.descending
	        } else {
	          this.pagination.sortBy = column
	          this.pagination.descending = false
	        }
	      },
	
	      editlead(id){
	                /**
	                 * Date 9/3/2019
	                 */
	                this.getLeadData(id, res => {
	                    if (res.data.errCode == -1) {
	                        this.$store.commit('SAVE_LEAD_RESPONSE', res.data.errMsg)
	                        // console.log("lead mutation data", res.data.errMsg)
	                        this.$router.push('/Lmaster/status')
	                    }
	                });
	            },
	      deleteItem (item,index) {
	        this.usrdetails.splice(index, 1)
	        },
	        getLeadData(id, callback = null){
	             this.GETUSER('getlead_details/'+id,res => {
	
	
	                   /**
	                    * @author Khan Usama
	                    * Date 9/3/2019
	                    * @description Access lead by id
	                    */
	
	                   if (typeof(callback) == 'function') {
	                       callback(res)
	                       return;
	                   }
	                //    ---------------------
	                    console.log('GET USER REPONSE OF LEAD',res.data.errMsg)
	                    this.leadData = res.data.errMsg[0]
	               }
	           )
	         },
	
	         filterBY(e){
	
	             console.log("Filter value",e);
	             if(e === 'status'){
	                this.showCityDrop = false;
	                  this.filterByData = e;
	             this.valuedata = [];
	             for(let i=0;i<this.policystatusdata.length;i++){
	                  let value ={
	                        text:this.policystatusdata[i].text,
	                        value:this.policystatusdata[i].value
	                    }
	                this.valuedata.push(value);
	             }
	             }else if(e === 'PremiumType'){
	                this.showCityDrop = false;
	                  this.filterByData = e;
	                  this.valuedata = [];
	                for(let i=0;i<this.policytypedata.length;i++){
	                  let value ={
	                        text:this.policytypedata[i].text,
	                        value:this.policytypedata[i].value
	                    }
	                this.valuedata.push(value);
	             }
	             }else if(e === 'state'){
	                this.filterByData = e;
	                this.valuedata = [];
	                for(let i =0;i<this.getState.length;i++){
	                let value={
	                    text:this.getState[i].region_data.name,
	                    code:this.getState[i].region_data.adminCode1
	                }
	                this.valuedata.push(value);
	                // console.log('VAlue Data State',this.valueData)
	            }
	            }
	            else{
	                this.valuedata =" "
	            }
	
	
	         },
	
	         valueDropdown(event){
	             console.log("value drop down ",event);
	             if(this.filterByData !== 'state'){
	
	                // console.log("value drop down ",event);
	                // console.log("filterByData ", this.filterByData)
	                this.filterStruct='';
	                this.filterStruct = this.filterByData +'|'+ event;
	                console.log("filterStruct",this.filterStruct);
	                this.GetAllLeadData(this.channeldatafilter,this.skip);
	                }else{
	                   this.showCityDrop = true;
	                    this.filterStruct='';
	                    this.filterStruct = this.filterByData +'|'+ event;
	                    console.log("filterStruct ELSE ",this.filterStruct);
	                    this.GetAllLeadData(this.channeldatafilter,this.skip)
	                    let codes= this.valuedata.filter(e=>{
	                        if(e.text === event){
	                            return e.code
	                        }
	                    })
	                    // this.cityDataDrp
	                    console.log('CODES',codes)
	                    event === codes[0].text ? this.showCityDrop = true : '';
	                    this.GETCITY(codes[0].code,resp=>{
	                        console.log("city ", resp[0].cities)
	                        this.cityDataDrp = resp[0].cities
	                    })
	                }
	
	         },
	
	          cityDropdown(e){
	            console.log('CITY DROP Event:>',e)
	            this.filterStruct = '';
	            this.filterStruct = this.filterByData +'|'+ this.valueDrp +'|'+ this.cityDrp
	            console.log("Filter Struct ", this.filterStruct)
	            this.GetAllLeadData(this.channeldatafilter,this.skip)
	        },
	
	         channelfilters(e){
	            console.log('data',e)
	                this.page=1
	                this.channeldatafilter = e
	                this.GetAllLeadData(this.channeldatafilter,this.skip)
	                console.log("Channel ID DATA::->",e );
	        },
	        next(e){
	                console.log('NEXT FUNCTION::',e);
	                let skipdata = e - 1
	                console.log('data',skipdata)
	                if(skipdata === 0 ){
	                    this.skip = 0
	                }else{
	                    this.skip = this.skipdiffrence*skipdata
	                }
	                console.log('skip data',this.skip)
	                this.GetAllLeadData(this.channeldatafilter,this.skip)
	            },
	
	
	         GetAllLeadData(e,skip){
	             console.log("CHECK SKIP",skip)
	            console.log("User Id",this.getAgentInfo()._id)
	             console.log("Getting Channel data to get specific channel's data",e);
	            //  old data
	            //  let Filter_Data
	            // if(e === 'all'){
	            //     Filter_Data = 'getPolicyAdmin?policy_filter=all&admin_Id='+this.getAgentInfo()._id+'&channel_Id='+e
	            //  }else{
	            //     console.log("Channel data is not ALL");
	            //     Filter_Data = 'getPolicyAdmin?policy_filter=all&admin_Id='+this.getAgentInfo()._id+'&channel_Id='+e
	            // }
	
	              let FILTER_API ='v2/getPolicyAdmin?admin_id='+this.getAgentInfo()._id;
	
	            if(this.channeldatafilter === 'all'){
	                if (Object.keys(this.filterStruct).length === 0) {
	                    this.Policydatalist =[];
	                    FILTER_API = FILTER_API+'&skip='+skip;
	                    console.log(" TRUE Filter Api RESPONSE",FILTER_API)
	                } else {
	                    this.Policydatalist =[];
	                    FILTER_API = FILTER_API+'&skip='+skip+'&filterBy='+this.filterStruct;
	                    console.log(" False Filter Api RESPONSE",FILTER_API)
	                }
	            } else {
	                if (Object.keys(this.filterStruct).length === 0) {
	                    this.Policydatalist =[];
	                    FILTER_API = FILTER_API+'&channelCode='+e +'&skip='+skip;
	                     console.log(" Else IF Filter Api RESPONSE",FILTER_API)
	                } else {
	                    this.Policydatalist =[];
	                    FILTER_API = FILTER_API+'&channelCode='+e +'&skip='+skip+'&filterBy='+this.filterStruct;
	                     console.log("Else Api RESPONSE",FILTER_API)
	                }
	            }
	
	            // axios.get(FILTER_API,res=>{(
	            //     if(res.data.errCode === -1){
	            //         console.log("getting policies data", res.data.errMsg)
	            //         this.policyresponce = res.data.errMsg
	            //         console.log("API Response",this.policyresponce)
	            //     }
	            // })
	
	            this.GET(FILTER_API,res => {
	                    if(res.data.errCode === -1){
	                    console.log("getting policies data", res.data.errMsg[0])
	                    this.policyresponce = res.data.errMsg[0]
	
	                    var pageLen = res.data.errMsg[1]
	                    let totalCount = pageLen[0].count
	                    console.log('Page Length:',totalCount)
	                    this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
	
	                    if(this.policyresponce.length !== 0){
	
	                         console.log("API Response",this.policyresponce)
	                        for(var i=0; i<this.policyresponce.length;i++){
	                        this.finalpolicydata={};
	                        this.finalpolicydata.policy_id = this.checkValidity(this.policyresponce[i].policy_id)
	                        this.finalpolicydata.client_id = this.checkValidity(this.policyresponce[i].client_id)
	                        // this.finalpolicydata.policy_status = this.checkValidity(this.policyresponce[i].policy_status)
	                        if (this.policyresponce[i].policy_status === "" || this.policyresponce[i].policy_status === undefined || this.policyresponce[i].policy_status === null) {
	                            this.finalpolicydata.policy_status = "-"
	                        } else {
	                            let temp_str = this.policyresponce[i].policy_status;
	                            for(let j = 0; j < this.policystatusdata.length; j++ ){
	                                if (temp_str === this.policystatusdata[j].value) {
	                                    this.finalpolicydata.policy_status = this.policystatusdata[j].text;
	                                    break;
	                                } else {
	                                    this.finalpolicydata.policy_status = "-"
	                                }
	                            }
	                        }
	                        this.finalpolicydata.productname = this.checkValidity(this.policyresponce[i].pdt_code)
	                        this.finalpolicydata.pol_term = this.checkValidity(this.policyresponce[i].pol_term)
	                        this.finalpolicydata.prem_type = this.checkValidity(this.policyresponce[i].prem_type)
	                        if(this.policyresponce[i].prem_type === "" || this.policyresponce[i].prem_type === undefined || this.policyresponce[i].prem_type === null){
	                            this.finalpolicydata.prem_type = "-"
	                        }else{
	                            let helper = this.policyresponce[i].prem_type
	                            for(let k = 0; k < this.policytypedata.length; k++){
	                                if(helper === this.policytypedata[k].value ){
	                                    this.finalpolicydata.prem_type = this.policytypedata[k].text;
	                                    break;
	
	                                }else{
	                                   this.finalpolicydata.prem_type = "-"
	                                }
	                            }
	                        }
	                        this.finalpolicydata.ann_prem_with_serv_tax = this.checkValidity(this.policyresponce[i].ann_prem_with_serv_tax)
	                        this.finalpolicydata.total_sum_assured = this.checkValidity(this.policyresponce[i].total_sum_assured)
	                        this.finalpolicydata.mode = this.checkValidity(this.policyresponce[i].mode)
	                        this.finalpolicydata.premium_due_date = this.checkValidity(this.policyresponce[i].premium_due_date)
	                        this.finalpolicydata.fullobj=this.policyresponce[i];
	
	                        this.Policydatalist.push(this.finalpolicydata)
	                        // console.log("Final Sorted data is",this.finalpolicydata);
	
	                        for(let i=0; i < this.Policydatalist.length; i++){
	                        //  console.log("The Premium Due date is =>", this.Policydatalist[i].premium_due_date);
	                        }
	
	
	                    }
	
	                    }else{
	                    this.showToast('No data available', this.TOST().ERROR);
	                    }
	
	                    }else if(res.data.errCode === 40){
	                    this.showToast('No proposal Exist', this.TOST().ERROR);
	                    // console.log("getting policies data", res.data.errMsg)
	                    }else if(res.data.errCode === 4){
	                    this.showToast('Database Error', this.TOST().ERROR);
	                    }else if(res.data.errCode === 1878){
	                    this.showToast('Invalid Admin', this.TOST().ERROR);
	                    }else if(res.data.errCode === 343){
	                    this.showToast('Filter_by, parameter is not a valid', this.TOST().ERROR);
	                    }
	               })
	         },
	
	          checkValidity(data) {
	                // console.log('Validity Data', data);
	                if (data == "" || data == "undefined" || data == null || data == '' || data == 'Invalid Date') {
	                    return "-"
	                } else {
	                    return data;
	                }
	            },
	
	         Searchdatatable (e) {
	                console.log("e data",e)
	                this.value = e;
	            },
	            goNext(){
	                const formData={
	                policyJSON:this.bulkData
	            }
	
	            let self = this;
	            // self.showLoader('Uploading', true);
	
	            this.POST('policy_bulk_upload/'+this.getAgentInfo()._id, formData,res=>{
	                if(res.data.errCode==-1)
	                {
	
	                        // self.showLoader('Uploading', false);
	                        self.showToast('File uploaded successfully', self.TOST().SUCCESS);
	                        self.steps = 2
	                        self.sucessCount = res.data.errMsg.success
	                        self.failCount = res.data.errMsg.failed
	                        self.errorLink = res.data.errMsg.link
	                }
	                else if (res.data.errCode == 510) {
	                    // self.showLoader('Uploading', false);
	                    self.showToast('User not found', self.TOST().ERROR);
	
	                } else if (res.data.errCode == 4) {
	                    //   self.showLoader('Uploading', false);
	                          self.showToast('A Database Error has occured', self.TOST().ERROR);
	                }
	                else if (res.data.errCode == 430) {
	                    //   self.showLoader('Uploading', false);
	                          self.showToast('Your Request body is Empty', self.TOST().ERROR);
	                }
	                else if (res.data.errCode == 343) {
	                    //   self.showLoader('Uploading', false);
	                          self.showToast('The JSON format Invalid', self.TOST().ERROR);
	                }
	
	            })
	                },
	                cancelStepper(){
	                    this.dialogBulkUpld = false
	                    this.channeldatafilter = 'all'
	                    this.GetAllLeadData(this.channeldatafilter);
	                    this.steps =1
	                },
	                openwindow(){
	                    this.bulkData=[]
	                    this.dialogBulkUpld = true
	                    this.sucessCount=0
	                    this.failCount=0
	                    this.steps = 1
	                    fileUpload =null
	                    this.excelfilename = ''
	                    this.errorLink='Link Comes Here'
	                    this.fileLink=''
	                },
	    jsonupload(e) {
	            console.log("Event is",e)
	            console.log('File Name======>>>',e.target.files[0].name)
	
	            var me = this
	            me.excelfilename= e.target.files[0].name
	        //Reference the FileUpload element.
	        fileUpload = document.getElementById("fileUpload");
	        console.log("File is",fileUpload)
	
	        //Validate whether File is valid Excel file.
	        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
	        if (regex.test(fileUpload.value.toLowerCase())) {
	            if (typeof (FileReader) != "undefined") {
	                var reader = new FileReader();
	
	                //For Browsers other than IE.
	                if (reader.readAsBinaryString) {
	                    //For NON IE Browser.
	                      reader.addEventListener('load', (e) => {
	                    this.ProcessExcel(e.target.result)
	                    })
	                    reader.readAsBinaryString(fileUpload.files[0])
	                                }
	                                else {
	                                    //For IE Browser.
	                                    reader.addEventListener('load', (e) => {
	                                                var data = "";
	                                        var bytes = new Uint8Array(e.target.result);
	                                        for (var i = 0; i < bytes.byteLength; i++) {
	                                            data += String.fromCharCode(bytes[i]);
	                                        }
	                                        this.ProcessExcel(data);
	                                    })
	                                    reader.readAsArrayBuffer(fileUpload.files[0]);
	
	                                }
	                                }
	                            else {
	                                me.showToast("This browser does not support HTML5.","error");
	                            }
	                        } else {
	
	                            me.showToast("Please upload a valid Excel file.","error",);
	                        }
	                    },
	            ProcessExcel(data) {
	                //Read the Excel File data.
	                var workbook = XLSX.read(data, {
	                    type: 'binary'
	                });
	                console.log("Workbook is",workbook.Strings)
	
	
	                var first_sheet_name = workbook.SheetNames[0];
	                    /* Get worksheet */
	                    var worksheet = workbook.Sheets[first_sheet_name];
	                //    console.log("Final Value",XLSX.utils.sheet_to_json(worksheet, {
	                //        raw: true
	                //    }));
	                //  workbook.SheetNames.forEach(function(sheetName) {
	                // Here is your object
	                var excelData =[]
	                excelData = XLSX.utils.sheet_to_csv(worksheet);
	                // var json_object = JSON.stringify(XL_row_object);
	                console.log(excelData);
	                var lines=excelData.split("\n");
	
	            var result = [];
	
	            var headers=lines[0].split(",");
	            console.log('Lines are',lines)
	
	            for(var i=1;i<lines.length-1;i++){
	
	                var obj = {};
	                var currentline=lines[i].split(",");
	                for(var j=0;j<currentline.length;j++){
	                    obj[headers[j]] = currentline[j];
	                }
	
	                result.push(obj);
	
	
	            }
	            console.log("JSON IS",result)
	            this.showToast('File Uploaded Successfully','success')
	            let Str = JSON.stringify(result)
	            //   let StrParse = JSON.parse(Str)
	            this.bulkData = Str
	
	
	
	            },
	
	    }
	
	}
</script>
<style>
	.thebtn{
	      display:flex;
	     align-items:center;
	     color:white;
	     border-radius:5px;
	     font-size:15px;
	    }
	
	.thebtn2policy{
	    display:flex;
	    align-items:center;
	    justify-content:center;
	     color:white;
	     font-size:12px;
	}
	
	    .wrapper-card{
	        flex-direction: row;
	        flex-wrap: wrap
	    }
	    .btn-size{
	        width: 1000px
	}
	.fileContainer-bulk {
	    overflow: hidden;
	    position: relative;
	}
	
	.fileContainer-bulk [type=file] {
	    cursor: inherit;
	    display: block;
	    font-size: 999px;
	    filter: alpha(opacity=0);
	    /* min-height: 100%;
	    min-width: 100%; */
	    opacity: 0;
	    position: absolute;
	    right: 0;
	    text-align: right;
	    top: 0;
	}
	
	/* Example stylistic flourishes */
	
	.fileContainer-bulk {
	    background-color:#1976d2 ;
	        flex-direction: row;
	        justify-content: center;
	        align-items: center;
	        border-radius: 4px;
	        /* height: 10px; */
	}
	
	.fileContainer-bulk [type=file] {
	    cursor: pointer;
	}
	.aloc-btn{
	    display: flex;
	    width: 230px;
	    flex-direction: row;
	}
     .club-img{
        height:40px;
        width:40px;
        margin-top:10px
    }
    .bodywidth{
            width: 300px;
        }
	 @media screen and (min-width: 320px){
	         .margin-t30{
	             margin-top: 30px;
	         }
	            .upload-text{
	             font-size:14px;
	             color:#FDFEFF;
	             font-weight: 500
	         }
	            .fileContainer-bulk {
	            width:155px;
	            display: inline-flex;
	            border-radius: 2px;
	            margin-top: 6px;
	            height: 37px;
	            position: relative;
	            cursor: pointer;
	        }
	
	     }
    @media screen and (min-width: 992px){
        .bodywidth{
            width: 100px;
        }
         .club-img{
            height:50px;
            width:50px;
            margin-top:10px
        }
    }
</style>