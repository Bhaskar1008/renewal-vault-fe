<template>
    <v-app>
      <v-layout>
          <v-flex class="card-pad" xs12>
            <v-card>
               <v-card-title primary-title>
                  <div>
                   <h3 class="subheading mb-0">Summary</h3>
                  </div>				
              </v-card-title>
		 <v-layout row wrap>
		  	<v-flex v-for="(list, index) in summary" :key="index" xs6>
					<div id="summary_card" class="custom-continer mb-3">
						<p class="body-1">{{list.label}}</p>
						<p class="body-2">{{list.value}}</p>
						   <v-divider></v-divider>
			    	</div>
						
			</v-flex>
		</v-layout>
   </v-card>
			  <v-flex xs12 pt-3>
           	 <v-card>
              	 <v-card-title primary-title>
              		  <div>
               			   <h3 class=" headline  mb-0">Benefit Illustration</h3>
               			 </div>
			  			  </v-card-title>
						<div>
                <h3 class="subheading mb-0 ml-3">ABC Endowment Plan 121N018V02</h3>
            </div>
			<!-- table code -->
<template>
<v-expansion-panel>
<v-expansion-panel-content v-for="(item,i) in 1" :key="i">
	<div slot="header" class="body-2">Product Benefits</div>
		<v-card>
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
			</v-card>
</v-expansion-panel-content>
</v-expansion-panel>
</template>



<!-- end here -->
<v-expansion-panel>
<v-expansion-panel-content v-for="(item,i) in 1" :key="i">
	<div slot="header" class="body-2">Summary Of Policyholder's Benefits</div>
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
		<v-data-table
			:headers="headers"
			:items="desserts"
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
</v-expansion-panel-content>
</v-expansion-panel>
</template>
</div>
			<div class="custom-continer">
            	 <v-btn color="primary">Download Pdf

				 </v-btn>
			</div>
            </v-card>
          </v-flex>
          </v-flex>
        
        </v-layout>
     
    </v-app>
</template>
<script>
import axios from 'axios';
export default {

	data() {
		return {
			obj:[],
			Data:{},
			Datebirth:'',
			summary: [
				{
					label: 'Plan Option',
					value: 'Increasing Insurance Plan'
				}, {
					label: 'Policy Term',
					value: '20 Years'
				}, {
					label: 'Premium Paying Term',
					value: '20 Years'
				},{
					label: 'Annualised Premium',
					value: '₹ 20,00,000'
				},{
					label: 'Sum Assured',
					value: '₹ 5,40,000'
				},{
					label: 'Payout in 18th Year',
					value: '₹ 5,40,000'
				},{
					label: 'Payout in 19th Year',
					value: '₹ 5,40,000'
				},{
					label: 'Payout at Maturity',
					value: '₹ 5,40,000'
				},{
					label: 'Minimum Payout on Death',
					value: '₹ 5,40,000'
				}
			],	
		search: '',
        selected: [],
    
        table1: [
          {
            value: false,
			name1: 'Date Of Quotation',
			data1:this.Datebirth
           
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
		  
		//   table number third
			headers: [
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
        desserts: [
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
        ]
		}
		},

		created(){
		var me = this;
		//  this._id= '5b1a300d6ad04d63e652254c'
		this.GETUSER('getProposal/'+this.getAgentInfo()._id , function (response , error) {
		// console.log(response.data.errMsg);
		me.obj = (response.data.errMsg);
		for (var i = 0; i < me.obj.length; i++) {
		console.log(me.obj[i].benefitIllustration)
		me.items = me.obj[i].benefitIllustration
		console.log(me.items)
		console.log(me.Data.ChildDateofBirth)
		me.Datebirth = me.Data.ChildDateofBirth


    }
  })
        //   console.log(this.$store.getters.getEditStatus)
        //    this._id= '5b1a300d6ad04d63e652254c'
        //    this.status = 'all'
        //          this.GET('getProposal/'+ this._id, response => {
        //               this.obj = (response.data.errMsg)
        //            console.log(this.obj)
		// 			 var errcodeAPI= -1
		// 		 })
		}

	
	}
    

</script>
<style>
	.custom-continer {
		padding-left: 20px;
		padding-right: 20px;
	}

	#summary_card p {
		text-align: left;
		margin-bottom: 5px;
	}
	.card-pad{
		padding: 4px;
	}

	
</style>


