<template>
<v-app>
     <!-- <v-expansion-panel>
    <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
      <div slot="header">Item</div>
      <v-card> -->
        <!-- <div style="padding:4px;"> -->
    
 <template >
      <v-expansion-panel>
          <v-expansion-panel-content v-for="(item,i) in 1" :key="i">
               <div slot="header" class="body-2">Address Proof Details</div>
 <v-data-table
      :headers="headers"
      :items="TblData1"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.filename }}</td>
        <td class="text-xs-left">{{ props.item.uploaddate }}</td>
        <td class="text-xs-left">{{ props.item.Userid }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  
      </v-expansion-panel-content>
  </v-expansion-panel>
      </template>
</v-app>
</template>


<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
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
      TblData1: [],
      editedIndex: -1,
      editedItem: {
        filename: '',
        uploaddate: 0,
        Userid: 0,
        
      },
      defaultItem: {
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

      editItem (item) {
        this.editedIndex = this.TblData1.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.TblData1.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.TblData1.splice(index, 1)
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
          Object.assign(this.TblData1[this.editedIndex], this.editedItem)
        } else {
          this.TblData1.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
<style>

</style>


