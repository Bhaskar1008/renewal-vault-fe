<template>
 <v-layout wrap>
            <v-flex xs12 sm6 offset-sm3>
 <v-card>
     <v-form v-model="valid" ref="form" lazy-validation>
         <v-flex>
    <v-text-field
        label="Name"
        v-model="editedItem.name"
        :rules="nameRules"
        :counter="20"
        required>
    </v-text-field>
         </v-flex>
<v-flex >
    <v-text-field
        label="Email"
        v-model="editedItem.email"
        :rules="emailRules"
        :counter="10"
        required>
    </v-text-field>
</v-flex>
    <v-checkbox
      label="Do you agree?"
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      required
    ></v-checkbox>
    <v-card-actions class="Table-btn">
     
 <v-btn @click.native="submit" >submit</v-btn>
    <v-btn @click.native="clear" >clear</v-btn>
   
    </v-card-actions>
  <hr>

  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
    sort-icon="mdi-menu-down"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.email }}</td>
      <td class="text-xs-right">{{ props.item.password }}</td>
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

   </v-form>
 </v-card>
  </v-flex>
 </v-layout>
</template>

<script>
  export default {
    
     
         data: () => ({
      valid: true,
      name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 20 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
     
      checkbox: false,
     
        headers: [
        {
          text: 'NAME',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'EMAIL', align: 'right', value: 'email' },
        { text: 'ACTIONS', align: 'right', value: ''}
       
        
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email:''
       
      },
      defaultItem: {
        name: '',
       email:''
      }
    }),

   
 methods:{
       
 initialize () {
        this.items = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3
          },
         
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
      },

     
      submit () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
        } else {
          this.items.push(this.editedItem)
        }
        
      }
    



},
       computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'submit' : 'Edit Item'
      }
    },

    created () {
      this.initialize()
    }

    }
</script>

<style>
.Table-btn{
    margin-left:190px;
}
</style>
