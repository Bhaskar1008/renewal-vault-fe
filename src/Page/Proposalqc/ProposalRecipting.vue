<template>
<v-app>
  <div style="padding:4px;">
     
               <div slot="header" class="body-2">Reciepting</div>
            
    <div>
       <h3 class="body-2 mt-3 ml-3">Payment Details</h3>
    </div>
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
      
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
   
  </div>
</v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
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
      TblData: [],
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
      },

      editItem (item) {
        this.editedIndex = this.TblData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.TblData.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.TblData.splice(index, 1)
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