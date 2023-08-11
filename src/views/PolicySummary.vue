<script >
// import TheWelcome from '../components/TheWelcome.vue'

export default {
  data() {
    return {
      lobList: [
        {
          NUM_IL_PRODUCT_NAME: 'CommercialVehicleGCV',
          NUM_IL_PRODUCT_CODE: 105871
        }
      ],
      selectLob: { NUM_IL_PRODUCT_NAME: 'CommercialVehicleGCV', NUM_IL_PRODUCT_CODE: 105871 },
      dateRangeFilterOpn: [
        { text: 'Current Month', value: 'CM' },
        { text: 'Next 2 Months', value: 'N2M' },
        { text: 'Next 3 Months', value: 'N3M' },
        { text: 'Custom', value: 'DR' }
      ],
      selectDate: {
        text: 'Next 2 Months',
        value: 'N2M'
      },
      policyCountData: [1, 2, 3, 4, 5, 6, 9, 8, 7, 445, 4]
    }
  }
}
</script>

<template>
  <!-- <TheWelcome /> -->
  <v-row style="margin-top: 5px">
    <v-col cols="7">
      <v-flex class="pa-2" outlined tile style="display: flex">
        <v-text class="body-2 font-weight-bold mt-4" style="color: #1e83c2; margin-left: 20px"
          >Policy Summary -
        </v-text>
        <span>
          <p class="body-2 font-weight-bold mt-4" style="color: #e46a25; margin-left: 8px">
            2023-Aug-07 To 2023-Nov-07
          </p>
        </span>
      </v-flex>
    </v-col>
    <v-col>
      <p class="font-weight-bold mb-1 caption" style="color: #646666">Select Line of Business *</p>
      <v-select
        label=""
        class="main_dropdown"
        :items="lobList"
        v-model="selectLob"
        return-object
        item-title="NUM_IL_PRODUCT_NAME"
        item-value="NUM_IL_PRODUCT_CODE"
        variant="solo"
        style="width: 250px"
      ></v-select>
    </v-col>

    <v-col>
      <p class="font-weight-bold mb-1 caption" style="color: #646666">Select Policy End Date *</p>
      <v-select
        label=""
        class="main_dropdown"
        :items="dateRangeFilterOpn"
        v-model="selectDate"
        return-object
        item-title="text"
        item-value="value"
        variant="solo"
        style="width: 200px"
      ></v-select>
    </v-col>
  </v-row>
  <main>
    <v-row style="margin-left: 5px; margin-right: 5px">
      <v-flex v-for="rv in policyCountData" :key="rv">
        <v-col>
          <v-hover
          v-slot="{ isHovering, props }"
        close-delay="200"
      >
          <v-card
          :elevation="isHovering ? 16 : 2"
          :class="{ 'on-hover': isHovering }"
          v-bind="props"
            :title="rv"
            style="color: #1e83c2; cursor: pointer"
            width="150px"
            height="80px"
            text="This is content"
          ></v-card>
          
      </v-hover>
        </v-col>
      </v-flex>
    </v-row>
  </main>
</template>

<style>
*.main_dropdown .v-text-field.v-text-field--solo .v-input__control {
  min-height: 30px !important;
  max-height: 5px;
  border-radius: 5px;
}

.main_dropdown
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  border-radius: 5px;
  outline: solid 1px rgb(201, 201, 201);
}
.v-card-item .v-card-title {
  padding: 0;
  font-weight: bold;
  font-size: 16px;
}
.v-card-item .v-card-text {
  font-size: 12px;
}
</style>