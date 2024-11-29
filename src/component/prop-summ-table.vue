<template>
    <!-- <v-app> -->
        <div >
             
    <v-data-table
      :headers="headers1"
      :items="lifestyles"
      
      hide-actions
      class="elevation"
    >
      <template slot="items" slot-scope="props">
        <td>
          <span style="border-right:1px solid #000; padding-right:30px">{{ props.item.names.name1}}</span>
          <span> {{props.item.names.name2}}</span>
        </td>
        <td>{{ props.item.response }}</td>
        <td><v-icon medium color="red darken-2">{{props.item.severity}}</v-icon></td>

      </template>
    </v-data-table>
    <v-data-table
      :headers="headers2"
      :items="histories"
      
      hide-actions
      class="elevation"
    >
      <template slot="items" slot-scope="props">
        <td>
          <span style="border-right:1px solid #000; padding-right:30px">{{ props.item.names.name1}}</span>
          <span> {{props.item.names.name2}}</span>
        </td>
        <td>{{ props.item.response }}</td>
        <td><v-icon medium color="yellow darken-2">{{props.item.severity}}</v-icon></td>

      </template>
    </v-data-table>
        </div>
    <!-- </v-app> -->
</template>
<script>
export default {
     data () {
    return {
      headers1: [
        {
          text: 'Lifestyle and Medical',
          align: 'left',
          sortable: false,
          value: 'names'
        },
        
        { text: 'Response', value: 'response' },
        { text: 'Severity', value: 'severity' },
       
      ],
      lifestyles: [
        {
          value: false,
          names: {
            name1: 'Q08)',
            name2: 'Medical ailments',
          },
          response:'Diabestes, Blood Preassure',
          severity:'assistant_photo'
        },
        {
          value: true,
          names: {
            name1: 'Q11)',
            name2: 'Politically Exposed',
          },
          response:'Yes',
          severity:'assistant_photo'
        },

      ],
     headers2: [
        {
          text: 'Family Medical History',
          align: 'left',
          sortable: false,
          value: 'names'
        },
        
        { text: 'Response', value: 'response' },
        { text: 'Severity', value: 'severity' },
       
      ],
      histories: [
        {
          value: false,
          names: {
            name1: 'Q11)',
            name2: 'Family Medical History',
          },
          response:'Father, dead, heart attack, 65',
          severity:'assistant_photo'
        },
        {
          value: true,
          names: {
            name1: 'Q11)',
            name2: 'Family Medical History',
          },
          response:'Brother, alive, 40, hypertension, 35',
          severity:'assistant_photo'
        },

      ]

    }
  }
}
</script>

