<template>
  <v-app style="">
    <template >
      
      <v-expansion-panel>
        
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Personal Details</div>
               <div slot="header" class="caption" Style="padding-left: 200px;">
        <v-icon color="green">check</v-icon>Verified:Yes</div>
      <div slot="header" class="caption">Status:Complete</div>
      
              <v-data-table
              :items="desserts"
              class="elevation-1">
          <!-- <template>
           
         </template> -->

            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                
                <span slot="activator">
                {{ props.header.text }}
                </span>
                 <span>
                  {{ props.header.text }}
                </span>
               </v-tooltip>
              </template>
              
                  <template slot="items" slot-scope="props">
                      <td>{{ props.item.name1 }}</td>
                      <td class="text-xs-left">{{ props.item.data1 }}</td>
                      <td v-if="active == true" class="text-xs-left">{{props.item.col}}</td>
                      
                     <td class="justify-center layout px-0">
                    <!-- <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                      <v-icon color="primary">comment</v-icon>
                    </v-btn> -->

                <v-btn icon @click.native.stop="openDialogBox(props.index)"> 
                    <v-icon color="primary">comment</v-icon>
                  </v-btn>
                 
                     <v-dialog v-model="dialog" max-width="500">
                  <v-card>
                    <v-card-title class="headline" >Add Comment</v-card-title>
                    <v-flex xs11 ml-3>
                    <v-text-field v-model="comment1" label="comment" required></v-text-field>            
                    </v-flex>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat="flat" @click.native=" CmntItem(comment1)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                </td>
                
        </template>
        <template slot="footer">
        <td colspan="100%">
          <v-checkbox
            v-model="checkbox"
            label="I confirm I have verified all the details of Personal Details Form"
            required
          ></v-checkbox>
        </td>
      </template>
          </v-data-table>
          
      </v-expansion-panel-content>
  </v-expansion-panel>
      </template>
      
<!--/////////////////////////////////////// shoaib Table2 start here////////////////////////////////// -->
 <template>
      <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Nominee And Appointee Details</div>
               <div slot="header" class="caption" Style="padding-left: 104px;">
        <v-icon color="green">check</v-icon>Verified:Yes</div>
      <div slot="header" class="caption">Status:Complete</div>
         <v-data-table
          :items="desserts2"
          class="elevation-2">
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                {{ props.header.text }}
                </span>
                 <span>
                  {{ props.header.text }}
                </span>
               </v-tooltip>
              </template>
                  <template slot="items" slot-scope="props">
                      <td>{{ props.item.name1 }}</td>
                      <td class="text-xs-left">{{ props.item.data1 }}</td>
                      <td v-if="active == true" class="text-xs-left">{{props.item.col }}</td>
                      
                     <td class="justify-center layout px-0">
                    <!-- <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                      <v-icon color="pink">delete</v-icon>
                    </v-btn> -->
                   <v-btn icon @click.native.stop="openDialogBox1(props.index)"> 
                    <v-icon color="primary">comment</v-icon>
                  </v-btn>
                <v-dialog v-model="dialog1" max-width="500">
                  <v-card>
                    <v-card-title class="headline" style="background-color:#4286f4;">Add Comment</v-card-title>
                    <v-flex xs11 ml-3>
                    <v-text-field v-model="comment2" label="comment" required></v-text-field>            
                    </v-flex>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat="flat" @click.native=" commentItemNo1(comment2)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                    </td>
                  </template>
         </v-data-table>
          </v-expansion-panel-content>
  </v-expansion-panel>
      </template>

<!--////////////////////////////////////// end here///////////////////////////////////////////////////// -->

<!-- /////////////////////////////////////Table3 Start Here///////////////////////////////////////////// -->
<template>
      <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Family History Details</div>
               <div slot="header" class="caption" Style="padding-left: 165px;">
        <v-icon color="green">check</v-icon>Verified:Yes</div>
      <div slot="header" class="caption">Status:Complete</div>
         <v-data-table
          :items="desserts3"
          class="elevation-1">
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                {{ props.header.text }}
                </span>
                 <span>
                  {{ props.header.text }}
                </span>
               </v-tooltip>
              </template>
                  <template slot="items" slot-scope="props">
                      <td>{{ props.item.name1 }}</td>
                      <td class="text-xs-left">{{ props.item.data1 }}</td>
                      <td v-if="active == true" class="text-xs-left">{{editedItem.tablecolItem2 }}</td>
                      
                     <td class="justify-center layout px-0">
                    <!-- <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                      <v-icon color="pink">delete</v-icon>
                    </v-btn> -->

                     <v-btn icon @click.native.stop="dialog =true"> 
                    <v-icon color="primary">comment</v-icon>
                  </v-btn>
                <v-dialog v-model="dialog2" max-width="500">
                  <v-card>
                    <v-card-title class="headline" style="background-color:#4286f4;">Add Comment</v-card-title>
                    <v-flex xs11 ml-3>
                    <v-text-field v-model="commentmsg2" label="comment" required></v-text-field>            
                    </v-flex>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat="flat" @click.native=" CmntItem(commentmsg2)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                    </td>
                  </template>
         </v-data-table>
          </v-expansion-panel-content>
  </v-expansion-panel>
      </template>

<!--//////////////////////////////////////// end here -->
<!-- //////////////////////// /////////////Table4 Start Here///////////////////////////////////////////// -->
<template>
      <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Life Insurance Details</div>
               <div slot="header" class="caption" Style="padding-left: 180px;">
        <v-icon color="yellow">hourglass_empty</v-icon>Verified:No</div>
      <div slot="header" class="caption" Style="padding-left: 18px;">Status:Requirement</div>
         <v-data-table
          :items="desserts4"
          class="elevation-1">
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                {{ props.header.text }}
                </span>
                 <span>
                  {{ props.header.text }}
                </span>
               </v-tooltip>
              </template>
                  <template slot="items" slot-scope="props">
                      <td>{{ props.item.name1 }}</td>
                      <td class="text-xs-left">{{ props.item.data1 }}</td>
                      <td v-if="active == true" class="text-xs-left">{{editedItem.tablecolItem3 }}</td>
                      
                     <td class="justify-center layout px-0">
                    <!-- <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                      <v-icon color="pink">delete</v-icon>
                    </v-btn> -->

                     <v-btn icon @click.native.stop="dialog =true"> 
                    <v-icon color="primary">comment</v-icon>
                  </v-btn>
                <v-dialog v-model="dialog3" max-width="500">
                  <v-card>
                    <v-card-title class="headline" style="background-color:#4286f4;">Add Comment</v-card-title>
                    <v-flex xs11 ml-3>
                    <v-text-field v-model="commentmsg3" label="comment" required></v-text-field>            
                    </v-flex>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat="flat" @click.native=" CmntItem(commentmsg3)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                    </td>
                  </template>
         </v-data-table>
          </v-expansion-panel-content>
  </v-expansion-panel>
      </template>

<!--//////////////////////////////////////// end here -->
<!-- // =====================salman TableData ==========================================================-->
  <template>
    <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
      <div slot="header" class="body-2">Life Style and Medical</div>
      <div slot="header" class="caption" Style="padding-left: 165px;">
        <v-icon color="green">check</v-icon>Verified:Yes</div>
      <div slot="header" class="caption">Status:Complete</div>
       <v-data-table
        
        :items="desserts5"
        class="elevation-1"
    >
       <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
         <td>{{ props.item.head1 }}</td>
        <td class="text-xs-left">{{ props.item.head2}}</td>
       <td v-if="active == true" class="text-xs-left">{{editedItem.tablecolItem4 }}</td>
        
        <td class="justify-center layout px-0">
          <!-- <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn> -->

           <v-btn icon @click.native.stop="dialog =true"> 
                    <v-icon color="primary">comment</v-icon>
                  </v-btn>
                <v-dialog v-model="dialog4" max-width="500">
                  <v-card>
                    <v-card-title class="headline" style="background-color:#4286f4;">Add Comment</v-card-title>
                    <v-flex xs11 ml-3>
                    <v-text-field v-model="commentmsg4" label="comment" required></v-text-field>            
                    </v-flex>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat="flat" @click.native=" CmntItem(commentmsg4)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
        </td>
        </template>
    </v-data-table>
     </v-expansion-panel-content>
  </v-expansion-panel>
  </template>
  

<!-- ========================================salman TableData2 ================================================-->
<template>
    <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
      <div slot="header" class="body-2">Vernacular Details</div>
      <div slot="header" class="caption" Style="padding-left: 200px;">
        <v-icon color="yellow">hourglass_empty</v-icon>Verified:No</div>
      <div slot="header" class="caption" Style="padding-left: 20px;">Status:Requirement</div>
       <v-data-table
        
        :items="desserts6"
        class="elevation-1"
    >
       <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
         <td>{{ props.item.head1 }}</td>
        <td class="text-xs-left">{{ props.item.head2}}</td>
        <td v-if="active == true" class="text-xs-left">{{editedItem.tablecolItem5 }}</td>
        
        <td class="justify-center layout px-0">
          <!-- <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn> -->

           <v-btn icon @click.native.stop="dialog =true"> 
                    <v-icon color="primary">comment</v-icon>
                  </v-btn>
                <v-dialog v-model="dialog5" max-width="500">
                  <v-card>
                    <v-card-title class="headline" style="background-color:#4286f4;">Add Comment</v-card-title>
                    <v-flex xs11 ml-3>
                    <v-text-field v-model="commentmsg5" label="comment" required></v-text-field>            
                    </v-flex>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat="flat" @click.native=" CmntItem(commentmsg5)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
        </td>
        </template>
    </v-data-table>
     </v-expansion-panel-content>
  </v-expansion-panel>
  </template>

<!-- ========================================salman TableData3 ================================================-->
<template>
    <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
      <div slot="header" class="body-2">Declaration and Signature</div>
      <div slot="header" class="caption" Style="padding-left: 152px;">
        <v-icon color="yellow">hourglass_empty</v-icon>Verified:No</div>
      <div slot="header" class="caption" Style="padding-left: 17px;">Status:Requirement</div>
       <v-data-table
        
        :items="desserts7"
        class="elevation-1"
    >
       <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
         <td>{{ props.item.head1 }}</td>
        <td class="text-xs-left">{{ props.item.head2}}</td>
        <td v-if="active == true" class="text-xs-left">{{editedItem.tablecolItem6 }}</td>
        
        <td class="justify-center layout px-0">
          <!-- <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn> -->

           <v-btn icon @click.native.stop="dialog =true"> 
                    <v-icon color="primary">comment</v-icon>
                  </v-btn>
                <v-dialog v-model="dialog6" max-width="500">
                  <v-card>
                    <v-card-title class="headline" style="background-color:#4286f4;">Add Comment</v-card-title>
                    <v-flex xs11 ml-3>
                    <v-text-field v-model="commentmsg6" label="comment" required></v-text-field>            
                    </v-flex>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat="flat" @click.native=" CmntItem(commentmsg6)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
        </td>
        </template>
    </v-data-table>
     </v-expansion-panel-content>
  </v-expansion-panel>
  </template>

  <!-- ========================================salman TableData4 ================================================-->
<template>
    <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
      <div slot="header" class="body-2">Confidential Report</div>
      <div slot="header" class="caption" Style="padding-left: 193px;">
        <v-icon color="yellow">hourglass_empty</v-icon>Verified:No</div>
      <div slot="header" class="caption" Style="padding-left: 18px;">Status:Requirement</div>
       <v-data-table
        
        :items="desserts8"
        class="elevation-1"
    >
       <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
         <td>{{ props.item.head1 }}</td>
        <td class="text-xs-left">{{ props.item.head2}}</td>
        <td v-if="active == true" class="text-xs-left">{{editedItem.tablecolItem7 }}</td>
        
        <td class="justify-center layout px-0">
          <!-- <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn> -->

           <v-btn icon @click.native.stop="dialog =true"> 
                    <v-icon color="primary">comment</v-icon>
                  </v-btn>
                <v-dialog v-model="dialog7" max-width="500">
                  <v-card>
                    <v-card-title class="headline" style="background-color:#4286f4;">Add Comment</v-card-title>
                    <v-flex xs11 ml-3>
                    <v-text-field v-model="commentmsg7" label="comment" required></v-text-field>            
                    </v-flex>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat="flat" @click.native=" CmntItem(commentmsg7)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
        </td>
        </template>
    </v-data-table>
     </v-expansion-panel-content>
  </v-expansion-panel>
  </template>

<!-- // ====================================================================salman DataTable Ends here=========================================================== -->
    <!--====================Proposal Reciepting(Salman)  =================================-->

 <template>
   <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Reciepting</div>
      <div><p class="body-1 mt-3 ml-3">Payment Details</p></div>
      <div slot="header" class="caption" Style="padding-left: 233px;">
        <v-icon color="green">check</v-icon>Verified:Yes</div>
      <div slot="header" class="caption">Status:Complete</div>
      
      <div style="width: 650px; overflow: auto">

         <v-data-table
            :headers="headers"
            :items="TblData"
            hide-actions
            class="elevation-1"
          >
      <template slot="items" slot-scope="props">
          <td>{{ props.item.Typeofpayment }}</td>
        <td class="text-xs-left">{{ props.item.Status }}</td>
        <td class="text-xs-left">{{ props.item.InstalmentPremium}}</td>
        <td class="text-xs-left">{{ props.item.ChequeDDNo}}</td>
        <td class="text-xs-left">{{ props.item.ChequeDDDate}}</td>
        <td class="text-xs-left">{{ props.item.bankname}}</td>
        <td class="text-xs-left">{{ props.item.branchname}}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>

      </div>
   
    </v-expansion-panel-content>
  </v-expansion-panel>
   
      </template>
<!-- =======================================Proposal Doc Upload(Salman)================================================== -->

<template >
      <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Address Proof Details</div>
               <div slot="header" class="caption" Style="padding-left:156px;">
        <v-icon color="yellow">hourglass_empty</v-icon>Open: 2</div>
      <div slot="header" class="caption" Style="padding-left:17px;">Status:Pending</div>
 <v-data-table
      :headers="headers1"
      :items="TblData1"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.filename }}</td>
        <td class="text-xs-left">{{ props.item.uploaddate }}</td>
        <td class="text-xs-left">{{ props.item.Userid }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="deleteItem1(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  
      </v-expansion-panel-content>
  </v-expansion-panel>
      </template>

<!--=============================== ProposalBI(salman)======================================== -->
<template>
<v-expansion-panel>
<v-expansion-panel-content v-for="(item,i) in 1" :key="i">
	<div slot="header" class="body-2">Product Benefits</div>
  <div slot="header" class="caption" Style="padding-left:197px;">
        <v-icon color="yellow">hourglass_empty</v-icon>Approved: No</div>
      <div slot="header" class="caption" Style="padding-left:0px;">Status:Pending</div>
      <div style="width: 650px; overflow: auto">
		
		<v-data-table
					:items="table1"
					:search="search"
					v-model="selected"
					item-key="name"
					class="elevation-1">
						<template slot="headerCell" slot-scope="props">
				<v-tooltip bottom>
				<span slot="activator">
							{{ props.header.text }}
					</span>
			<span>
{{ props.header.text }}
</span>
</v-tooltip>
</template>
					<template slot="items" slot-scope="props" v-if="props.index==0">
					<td>{{ props.item.name1 }}</td>
						<td class="text-xs-right">{{ Data.ChildDateofBirth }}</td>   
					</template>
					</v-data-table>
			</div>
</v-expansion-panel-content>
</v-expansion-panel>
</template>



<!-- end here -->
<v-expansion-panel>
<v-expansion-panel-content v-for="(item,i) in 1" :key="i">
	<div slot="header" class="body-2">Summary Of Policyholder's Benefits</div>
  <div slot="header" class="caption" Style="padding-left: 79px;">
        <v-icon color="green">check</v-icon>Verified:Yes</div>
      <div slot="header" class="caption">Status:Complete</div>
<div class=" custom-continer">
<v-data-table
	:items="table2"
	:search="search"
	v-model="selected"
	item-key="name"
	class="elevation-1">
		<template slot="headerCell" slot-scope="props">
<v-tooltip bottom>
<span slot="activator">
{{ props.header.text }}
</span>
<span>
{{ props.header.text }}
</span>
</v-tooltip>
</template>
<template slot="items" slot-scope="props">
		<td>{{ props.item.name }}</td>
		<td class="text-xs-right">{{ props.item.tblval1 }}</td>
		<td class="text-xs-right">{{ props.item.tblval2 }}</td>   
</template>
</v-data-table>
</div>
	</v-expansion-panel-content>
</v-expansion-panel>
		<!-- end here -->
<div >
<template>
<v-expansion-panel>
<v-expansion-panel-content v-for="(item,i) in 1" :key="i">
<div slot="header" class="body-2">Benefit Illustration Table</div>
<div slot="header" class="caption" Style="padding-left: 152px;">
  <v-icon color="green">check</v-icon>Verified:Yes</div>
<div slot="header" class="caption">Status:Complete</div>

<!-- <div class="body-2">verified:yes</div> -->
      <div style="width: 650px; overflow: auto">  
  
		<v-data-table
			:headers="headers2"
			:items="TblData2"
			hide-actions
			item-key="name">
			<template slot="headerCell" slot-scope="props">
		<v-tooltip bottom>
		<span slot="activator">
			{{ props.header.text }}
			</span>
<span>
	{{ props.header.text }}
</span>
</v-tooltip>
</template>
			<template slot="items" slot-scope="props">
<tr @click="props.expanded = !props.expanded">
		<td class="text-xs-right">{{ props.item.Years }}</td>
		<td class="text-xs-right">{{ props.item.AgeofPolicyholder}}</td>
		<td class="text-xs-right">{{ props.item.AnnualizedPremiumexcludingservicetax}}</td>
		<td class="text-xs-right">{{ props.item.BasicSumAssured }}</td>
		<td class="text-xs-right">{{ props.item.GuaranteedAdditionaccruedtilltheendoftheyear}}</td>
		<td class="text-xs-right">{{ props.item.DeathBenefitAmount1}}</td>
		<td class="text-xs-right">{{ props.item.DeathBenefitPayable}}</td>		
		<td class="text-xs-right">{{ props.item.MaturityBenefit}}</td>
		<td class="text-xs-right">{{ props.item.GuaranteedSurrenderValue}}</td>
		<td class="text-xs-right">{{ props.item.SpecialSurrenderValue}}</td>
		<td class="text-xs-right">{{ props.item.Surrendervaluepayable}}</td>
	</tr>
</template>
<template slot="expand" slot-scope="props">
<v-card flat>
<v-card-text>Peek-a-boo!</v-card-text>
</v-card>
</template>
</v-data-table>
</div>
</v-expansion-panel-content>
</v-expansion-panel>
</template>
</div>
</v-app>
</template>


<script>
  export default {
    data: () => ({
      // dialog: false,
      dialog: false,
        dialog1: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialog5: false,
        dialog6: false,
        dialog7: false,

       checkbox:false, 

        active:false,
       
      // desserts: [],
      indexno:'',
       indexno1:'',
       comment1:'',
       comment2:'',

        headers: [
        {
          text: 'Type of payment',
          align: 'left',
          sortable: false,
          value: 'Typeofpayment'
        },
        { text: 'Status', value: 'Status' },
        { text: 'Instalment Premium', value: 'InstalmentPremium' },
        { text: 'Cheque DD No.', value: 'ChequeDDNo.' },
        { text: 'Cheque DD Date', value: 'ChequeDDDate' },
        { text: 'Bank Name', value: 'bankname', bankname: false },
        { text: 'Branch Name', value: 'branchname', sortable: false },
        { text: 'Actions', value: 'name', sortable: false }
      ],
       headers1: [
        {
          text: 'Type and File Name',
          align: 'left',
          sortable: false,
          value: 'filename'
        },
        { text: 'Date of Upload', value: 'uploaddate' },
        { text: 'User ID', value: 'Userid' },
        { text: 'Actions', value: 'filename',align: 'center', sortable: false }
      ],
      headers2: [
          {
            text: 'Years',
            align: 'left',
            sortable: false,
            value: 'Years'
          },
          { text: 'Age of Policyholder', value: 'Age of Policyholder' },
          { text: 'Annualized Premium excluding service tax', value: 'Annualized Premium excluding service tax' },
          { text: 'Basic Sum Assured', value: 'Basic Sum Assured' },
          { text: 'Guaranteed Addition accrued till the end of the year', value: 'Guaranteed Addition accrued till the end of the year' },
		  { text: 'Death Benefit Amount1', value: 'Death Benefit Amount1' },
          { text: 'Death Benefit Payable', value: 'Death Benefit Payable' },
		  { text: 'Maturity Benefit', value: 'Maturity Benefit' },
          { text: 'Guaranteed Surrender Value (GSV)*', value: 'Guaranteed Surrender Value (GSV)*' },
          { text: 'Special Surrender Value (SSV)*', value: 'Special Surrender Value (SSV)*' },
          { text: 'Surrender value payable (SV)**', value: 'Surrender value payable (SV)**' },
		  
        ],

        TblData2: [
          {
            value: false,
            Years: '2',
            AgeofPolicyholder: '35',
            AnnualizedPremiumexcludingservicetax:'1000000',
			BasicSumAssured:'1000000',
			GuaranteedAdditionaccruedtilltheendoftheyear:'1000000',
            DeathBenefitAmount1:'1000000',
			DeathBenefitPayable:'1000000',
			MaturityBenefit:'1000000',
			GuaranteedSurrenderValue:'1000000',
			SpecialSurrenderValue:'1000000',
			Surrendervaluepayable:'1000000'

          },
{
            value: false,
            Years: '1',
            AgeofPolicyholder: '35',
            AnnualizedPremiumexcludingservicetax:'1000000',
			BasicSumAssured:'1000000',
			GuaranteedAdditionaccruedtilltheendoftheyear:'1000000',
            DeathBenefitAmount1:'1000000',
			DeathBenefitPayable:'1000000',
			MaturityBenefit:'1000000',
			GuaranteedSurrenderValue:'1000000',
			SpecialSurrenderValue:'1000000',
			Surrendervaluepayable:'1000000'

          },
           {
            value: false,
            Years: '1',
            AgeofPolicyholder: '35',
            AnnualizedPremiumexcludingservicetax:'1000000',
			BasicSumAssured:'1000000',
			GuaranteedAdditionaccruedtilltheendoftheyear:'1000000',
            DeathBenefitAmount1:'1000000',
			DeathBenefitPayable:'1000000',
			MaturityBenefit:'1000000',
			GuaranteedSurrenderValue:'1000000',
			SpecialSurrenderValue:'1000000',
			Surrendervaluepayable:'1000000'

          },
         {
            value: false,
            Years: '1',
            AgeofPolicyholder: '35',
            AnnualizedPremiumexcludingservicetax:'1000000',
			BasicSumAssured:'1000000',
			GuaranteedAdditionaccruedtilltheendoftheyear:'1000000',
            DeathBenefitAmount1:'1000000',
			DeathBenefitPayable:'1000000',
			MaturityBenefit:'1000000',
			GuaranteedSurrenderValue:'1000000',
			SpecialSurrenderValue:'1000000',
			Surrendervaluepayable:'1000000'

          },
         {
            value: false,
            Years: '1',
            AgeofPolicyholder: '35',
            AnnualizedPremiumexcludingservicetax:'1000000',
			BasicSumAssured:'1000000',
			GuaranteedAdditionaccruedtilltheendoftheyear:'1000000',
            DeathBenefitAmount1:'1000000',
			DeathBenefitPayable:'1000000',
			MaturityBenefit:'1000000',
			GuaranteedSurrenderValue:'1000000',
			SpecialSurrenderValue:'1000000',
			Surrendervaluepayable:'1000000'

          },
        {
            value: false,
            Years: '1',
            AgeofPolicyholder: '35',
            AnnualizedPremiumexcludingservicetax:'1000000',
			BasicSumAssured:'1000000',
			GuaranteedAdditionaccruedtilltheendoftheyear:'1000000',
            DeathBenefitAmount1:'1000000',
			DeathBenefitPayable:'1000000',
			MaturityBenefit:'1000000',
			GuaranteedSurrenderValue:'1000000',
			SpecialSurrenderValue:'1000000',
			Surrendervaluepayable:'1000000'

          },
        ],

        table2: [
          {
			value: false,
			name:'Assumed Investment Return',
			tblval1:'4%',
			tblval2:'8%'
           
		  },
		   {
			value: false,
			name:'Accumulated Guaranteed Survival/Maturity Benefits',
			tblval1:'2000000',
			tblval2:'4000000'
           
          },
          {
			value: false,
			name:'Non Guaranteed Benefits',
			tblval1:'2000000',
			tblval2:'4000000'
           
      }],
      
       table1: [
          {
            value: false,
			name1: 'Date Of Quotation',
			data1:'12/03/2017'
           
		  },
		   {
            value: false,
			name1: 'Name of the life insured',
			data1:'	ConsultIT'
           
          },
          {
            value: false,
			name1: 'Name of the insurance advisor',
			data1:'	Hello Test'
           
          },
          {
            value: false,
			name1: 'Date Of Birth',
			data1:'12/02/2016'
            
          },
          {
            value: false,
			name1: 'Policy Commencement Date',
			data1:'12/02/2016'
            
          },
          {
            value: false,
			name1: 'Total Installment premium including service tax) for Year 1',
			data1:'5000000'
            
          },
          {
            value: false,
			name1: 'Unique Identification No.',
			data1:'121N018V02'
           
          },
          {
            value: false,
            name1: 'Advisor Code',
            data1:'	12345'
          },
          {
            value: false,
			name1: 'Age Proof',
			data1:'Standard'
            
          },
          {
            value: false,
			name1: 'Policy Term',
			data1:'12'
            
          },
          {
            value: false,
            name1: 'Premium Payment Term',
            data1:'12'
		  },
		  
		   {
            value: false,
			name1: 'Mode of Premium Payment',
			data1:'	Yearly'
            
		  },
		   {
            value: false,
			name1: 'Sum Assured for Basic Plan',
			data1:'10000000'
            
		  },
		   {
            value: false,
            name1: 'Total Installment premium (excluding service tax )',
            data1:'5000000'
		  },
		   {
            value: false,
			name1: 'Total Installment premium (including service tax )for Year 2 onwards',
			data1:'5000000'
            
		  },
		    {
            value: false,
			name1: 'Age',
			data1:'50'
            
		  },
		    {
            value: false,
			name1: 'Frequency',
			data1:'20'
            
          }
    ],
    search: '',
        selected: [],


      TblData: [],
      TblData1: [],
      editedIndex: -1,
      editedItem: {
        Typeofpayment: '',
            Status: '',
            InstalmentPremium: '',
            ChequeDDNo:'',
            ChequeDDDate:'',
            bankname:'',
            branchname:''
      },
      defaultItem: {
        Typeofpayment: '',
            Status: '',
            InstalmentPremium: '',
            ChequeDDNo:'',
            ChequeDDDate:'',
            bankname:'',
            branchname:''
      },

      editedItem1: {
        filename: '',
        uploaddate: 0,
        Userid: 0,
        
      },
      defaultItem1: {
        filename: '',
        uploaddate: '',
        Userid: '',
        
      }
    
    }),

computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
         {
           name1: 'Is Proposer and Life to be Assured the same?',
            data1: 'Yes',
            col:''
            },
            {
            name1:'Aadhar Card Number',
            data1:'UID1234512',
             col:''
            },
             {
            name1:'Title',
            data1:'DR',
             col:''
            },
             {
            name1:'Full Name',
            data1:'Shoaib khan',
             col:''
            },
             {
            name1:'Father’s Full Name',
            data1:'Salim khan',
             col:''
            },
             {
            name1:'Gender',
            data1:'Male',
            col:''
            },
             {
            name1:'Marital Status',
            data1:'Single',
            col:''
            },
             {
            name1:'Date of Birth',
            data1:'19/03/1996',
            col:''
            },
             {
            name1:'Nationality',
            data1:'Indian',
            col:''
            },
             {
            name1:'Education',
            data1:'Diploma',
            col:''
            },
             {
            name1:'Source Of Income',
            data1:'Service',
            col:''
            },
             {
            name1:'Annual Income',
            data1:'2,00000',
            col:''
            },
             {
            name1:'Pupose Of Insurance',
            data1:'Seving',
            col:''
            },
             {
            name1:'Occupation',
            data1:'Agriculture',
            col:''
            },
             {
            name1:'Job Description',
            data1:'Farming',
            col:''
            },
             {
            name1:'Are you ABC Group employee ?',
            data1:'Yes',
            col:''
            },
             {
            name1:'Opting for ECS',
            data1:'Yes',
            col:''
            },
             {
            name1:'PAN Card No.',
            data1:'INC123456',
            col:''
            },
             {
            name1:'Bank Account No',
            data1:'1234567890',
            col:''
            },
             {
            name1:'IFSC Code',
            data1:'HDFC1234',
            col:''
            },
             {
            name1:'Bank Name',
            data1:'Maharastra',
            col:''
            },
             {
            name1:'Bank Branch ',
            data1:'Chembur',
            col:''
            },
             {
            name1:'Bank Account Proof',
            data1:'Passbook copy',
            col:''
            },
              {
            name1:'AddressLine1',
            data1:'Same as Above',
            col:''
            },
              {
            name1:'AddressLine2',
            data1:'Same as Above',
            col:''
            },  {
            name1:'AddressLine3',
            data1:'Same as Above',
            col:''
            },  {
            name1:'State',
            data1:'MAharastra',
            col:''
            },  {
            name1:'City',
            data1:'Mumbai',
            col:''
            },  {
            name1:'Pin Code',
            data1:'400043',
            col:''
            },  {
            name1:' Email ID',
            data1:'Shoaibkhan123@gmail.com',
            col:''
            },  {
            name1:'Mobile No.',
            data1:'988811222',
            col:''
            }, 
            {
            name1:'Landline No',
            data1:'022-123567',
            col:''
            },
             {
            name1:' Is your Permanent address same as mailing address',
            data1:'Yes',
            col:''
            },
             
          ]

          // Table 2 Data
           this.desserts2 = [
              {
            name1:'Gender',
            data1:'Male',
            col:''
            },
              {
            name1:'Title',
            data1:'DR',
            col:''
            
            },
             {
            name1:'Nominee Name',
            data1:'Paresh Soni',
            col:''
            
            },
            {
            name1:'Date of Birth',
            data1:'19/03/1996',
            col:''
            
            },
             {
            name1:'Relationship of nominee with LA',
            data1:'Business',
            col:''
            
            },
            {
            name1:'Mobile No.',
            data1:'988811222',
            col:''
            
            }, 
              {
            name1:' Email ID',
            data1:'Shoaibkhan123@gmail.com',
            col:''
            
            }, 
             {
            name1:'Is the Nominee address same as LA',
            data1:'Yes',
            col:''
            
            },
         
            {
            name1:'Will the Nominee Details be same as above for Plan 2?',
            data1:'Yes',
            col:''
            
            },
             {
            name1:'Do you want to add another Nominee?',
            data1:'Yes',
            col:''
            
            },
             {
            name1:'Appointee Details',
            },
               {
            name1:'Gender',
            data1:'Male',
            col:''
            
            },
            {
            name1:'Title',
            data1:'DR',
            col:''
            
            },
             {
            name1:'Nominee Name',
            data1:'Paresh Soni',
            col:''
            
            },
            {
            name1:'Date of Birth',
            data1:'19/03/1996',
            col:''
            
            },
             {
            name1:'Relationship of nominee with LA',
            data1:'Business',
            col:''
            
            },
             {
            name1:'Is the Appointee address same as Nominee?',
            data1:'Yes',
            col:''
            
            },
           
          
            {
            name1:'Do you want to add another Appointee?',
            data1:'NO',
            col:''
            
            },  {
            name1:'Advisor Details',
            },
             {
            name1:'Advisor Place',
            data1:'Mumbai',
            col:''
            
            }
            
             
          ]
          // End here
          // table data 3
           this.desserts3 = [
              {
            name1:'Have either of your parents or any brother or sister suffered from or died under the age of 60 due to the following conditions: Heart problem, diabetes, stroke, hypertension, raised cholestrol, cancer or any hereditary disease?',
            data1:'Yes'
            },
              {
            name1:'Add Family Member',
            },
             {
            name1:'Relationship',
            data1:'Father'
            },
            {
            name1:'Status',
            data1:'Dead'
            },
             {
            name1:'Age',
            data1:'76'
            },
             {
            name1:'Disease',
            data1:'Heart Attack'
            },
             {
            name1:'Diagnosis Age',
            data1:'65'
            },
          ]
          // end here

          // table4 start
          this.desserts4 = [
              {
            name1:'Are you currently insured or applying for Life insurance cover, Critical illness cover, Accident benefit cover, not covered above?',
            data1:'Yes'
            },
              {
            name1:'Parent / Husband Insurance Details',
            },
             {
            name1:'Name of parent / spouse',
            data1:'Paresh Soni'
            },
            {
            name1:'Total sum assured on life of parent / spouse',
            data1:'1,50,000'
            },
          ]
          // end here



  // ==========================================================Shoaib Table Ends here=====================================================================


          
// =================================salman TAbleData========================================================================
          this.desserts5 = [
          {
            head1: 'Are you currently or do you intend engaging in any hazardous occupation or hobbies?',
            head2:'Yes'
          },
          {
            head1: 'Are you currently or do you intend to live or travel outside of India for more than 6 months? If yes, please provide full details of countries to be visited and purpose of visit and duration',
            head2:'Yes'
          },
          {
            head1: 'Habits: Do you smoke or have you smoked more than 5 cigarettes / E-Cigarettes or beedis or 3 Pouches of Gutka or Chewable Tobacco per day.',
            head2:'Yes'
          },
          {
            head1: 'Do you consume or have you consumed any form of alcohol / liquor exceeding 90ml or 3 Pegs of Hard Liquor or 2 glasses of beer / wine per week.',
            head2:'Yes'
          },
          {
            head1:'Height',
            head2:'5.7',
          },
          {
            head1:'Weight',
            head2:'70kg',
          },
          {
            head1:'Are you currently taking any medication or drugs, other than minor conditions, (e.g. colds and flu), either prescribed by doctor, or have you suffered from any illness, disorder, disability or injury during the past 5 years which has required any form of medical or specialized examinations (including chest x-rays, gynecological inestigations, pap smear, or blood tests), consultaion, hospitalization or surgery?',
            head2:'No',
          },
          {
            head1:'Do you have : congenital / birth defects, pain or problems in the back, spine, muscles or joint, arthritis, gout, severe injury or other physical disability and have you been incapable of working / attending the school during the last 2 years for more than 5 days or are you currently incapable of working / attending school? ',
            head2:'No',
          },
          {
            head1:'Do you suffer from any medical ailments e.g: diabetes, high blood pressure, cancer, respiratory disease (including asthma), kidney, liver disease, stroke, any blood disorder, heart problems, hepatitis B, tuberculosis, psychiatric disorder, depression, HIV AIDS or a related infection?',
            head2:'Yes',
          },
          {
            head1:'Is any surgery planned or are you currently aware or have been advised, that you may need to seek medical advice within the near future? (Other than for medical examinations that may arise from this application)',
            head2:'No',
          },
          {
            head1:'Have you ever suffered from drug or alcohol addiction or been advised by a doctor to reduce your alcohol / drug intake? ',
            head2:'Yes',
          },
          {
            head1:'Whether the Life Assured / Proposer / Nominee(s) is/are Politically Exposed Person(s).',
            head2:'No',
          },
          
          ]

          this.desserts6=[
            {
              head1:'Name',
              head2:'Rahul Soni'
            },
             {
              head1:'Mobile No',
              head2:'987654321'
            },
             {
              head1:'Date',
              head2:'12/03/2014'
            },
             {
              head1:'Address1',
              head2:'Andheri(E)'
            },
             {
              head1:'Address2',
              head2:'Chembur'
            },
             {
              head1:'Address3',
              head2:'Chembur'
            },
            {
              head1:'State',
              head2:'Maharashtra'
            },
            {
              head1:'City',
              head2:'Mumbai'
            },
            {
              head1:'Pin Code',
              head2:'400 048'
            },
          ]

          this.desserts7 =[
            {
              head1:'In Order to support ABC Life Insurance Company in its Go-Green initiative, I agree to recieve policy documents by electronic mail instead of physical form.',
              head2:'Yes'
            },
             {
              head1:'I am aware that in order to enable the company to assess the risk, I need to undergo medicals as per ABC Life Insurace Comapny Ltd. requirements and the same has been explained to may be the Adviser / Sales MAnager',
              head2:'Yes'
            },
             {
              head1:'I authorize ABC Life Insurance Comapany Limited and/or its representative to call us/me for all policy service related calls.',
              head2:'Yes'
            },
             {
              head1:'I would like to convert this policy into an e-policy with the free e-insurance account with CAMS Insurance Repository.',
              head2:'No'
            },
             
          ]

          this.desserts8 =[
            {
              head1:'Have you met the Proposer & the Life to be Assured?',
              head2:'Yes'
            },
             {
              head1:'Are you (Advisor / SM) related to the Life to be Assured? If Yes, to whom and what is the relationship?',
              head2:'No'
            },
             {
              head1:'Do you notice any disability, mental or physical deformity for Life to be Assured?',
              head2:'No'
            },
             {
              head1:'Are you personally satisfied with the financial standing of the Proposer & Life to be Assured in relation to the proposed insurance? Please estimate the income of the Proposer.',
              head2:'Yes'
            },
             {
              head1:'Income Of The Proposer',
              head2:'150,000'
            },
             {
              head1:'Is the income proof verified by you? What is the type of income proof verified?',
              head2:'Yes'
            },
            {
              head1:'Type Of Income proof',
              head2:'Salary Slips for last 3 months'
            },
            {
              head1:'Is the age proof verified by you for all Life to be Assured?',
              head2:'Yes'
            },
            {
              head1:'Is the Life to be Assured, presently, in good health? if no, give details',
              head2:'No'
            },
            {
              head1:'How long have you konwn the Life to be assured?',
             
            },
            {
              head1:'Years',
              head2:'2 years'
            },
             {
              head1:'Months',
              head2:'6 months'
            },
             {
              head1:'SM / FLS Mobile No.',
              head2:'9876543201'
            },
          ]
         
//================================================== salman TableData Ends Here===================================================================
          //  ===================ProposalReciepting============================
           this.TblData = [
          {
            Typeofpayment: 'Online',
            Status: 'DD',
            InstalmentPremium: '4,000',
            ChequeDDNo: 'DD676',
            ChequeDDDate: '16/5/16',
            bankname:'Bank of india',
            branchname:'Chembur'
          },
          {
            Typeofpayment: 'Online',
            Status: 'Cash',
            InstalmentPremium: '5,000',
            ChequeDDNo: 'DD677',
            ChequeDDDate: '16/5/17',
            bankname:'Bank of Baroda',
            branchname:'Thane'
          },
         {
            Typeofpayment: 'Online',
            Status: 'Cheque',
            InstalmentPremium: '6,000',
            ChequeDDNo: 'DD677',
            ChequeDDDate: '16/5/19',
            bankname:'Bank of Maharastra',
            branchname:'Kurla'
          },
          {
            Typeofpayment: 'Online',
            Status: 'DD',
            InstalmentPremium: '4,000',
            ChequeDDNo: 'DD676',
            ChequeDDDate: '16/5/19',
            bankname:'Bank of india',
            branchname:'State bank of india'
          },
          {
            Typeofpayment: 'Online',
            Status: 'DD',
            InstalmentPremium: '4,000',
            ChequeDDNo: 'DD676',
            ChequeDDDate: '16/6/19',
            bankname:'Bank of india',
            branchname:'Powai'
          },
         
        ]

      // ===========================================Proposal Document Upload(Salman)============================
       this.TblData1 = [
          {
            filename: 'DRIV LCN',
            uploaddate: '26/12/18',
            Userid: 'YAUD284',
            
          },
          {
            filename: 'Bihar St. PrichayPatra(LR)',
            uploaddate: '21/2/18',
            Userid: 'TURD284',
            
          },
          {
            filename: 'CERT Form Ward Officer(LR)',
            uploaddate:'27/1/18',
            Userid: 'BAID244',
            
          },
          {
            filename: 'Telephone Bill',
            uploaddate: '04/11/18',
            Userid: 'KARD294',
            
          },
          {
            filename: 'Ration Card',
            uploaddate: '30/8/18',
            Userid: 'BCCD224',
            
          },
          {
            filename: 'Electricity Bill',
            uploaddate: '31/4/18',
            Userid: 'BDRD724',
           
          },
          {
            filename: 'Gass Connection Card Bill',
            uploaddate: '22/9/18',
            Userid: 'TARD228',
           
          },
          {
            filename: 'Life Insurance Policy(LR)',
            uploaddate: '15/10/18',
            Userid: 'RARD244',
          
          },
          {
            filename: 'Passport',
            uploaddate: '1/3/18',
            Userid: 'BATD624',
            
          },
          {
            filename: 'Voter ID',
            uploaddate: '3/3/18',
            Userid: 'BYRD264',
           
          }
        ]
      },

      // editItem (item) {
      //   this.editedIndex = this.desserts.indexOf(item)
      //   this.editedItem = Object.assign({}, item)
      //   this.dialog = true
      // },
openDialogBox(ind){
  console.log(ind)
  this.dialog = true
 this.indexno = ind
},
      CmntItem (item) {
        this.desserts[this.indexno].col = item
        this.active = true
        this.dialog = false
       },
      openDialogBox1(ind1){
        console.log(ind1)
  this.dialog = true,
 this.indexno1 = ind1
}, 
        commentItemNo1 (item,ind) {
          console.log(item.this.indexno1)
         this.desserts2[this.indexno1].col = item
        this.active = true
        this.dialog = false
       },

      // close () {
      //   this.dialog = false
      //   setTimeout(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem)
      //     this.editedIndex = -1
      //   }, 300)
      // },
editItem (item) {
        this.editedIndex = this.TblData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.TblData.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.TblData.splice(index, 1)
      },
      deleteItem1 (item) {
        const index = this.TblData1.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.TblData11.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.TblData[this.editedIndex], this.editedItem)
        } else {
          this.TblData.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
<style>

</style>


