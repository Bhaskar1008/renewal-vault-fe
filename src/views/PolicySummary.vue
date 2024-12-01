<script>
import { api } from '../services/api'

export default {
  data() {
    return {
      lobList: [],
      selectLob: null,
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
      policyCards: [],
      dateRange: {
        from: '',
        to: ''
      },
      loading: false
    }
  },
  async created() {
    await this.fetchPolicySummary()
  },
  methods: {
    async fetchPolicySummary() {
      this.loading = true
      try {
        const data = await api.getPolicySummary()
        this.policyCards = data.policyCards
        this.lobList = data.lobList
        this.selectLob = data.lobList[0]
        this.dateRange = data.dateRange
      } catch (error) {
        console.error('Error fetching policy summary:', error)
      } finally {
        this.loading = false
      }
    },
    async handleLOBChange() {
      if (!this.selectLob) return
      this.loading = true
      try {
        const updatedCards = await api.filterByLOB(this.selectLob.NUM_IL_PRODUCT_CODE)
        this.policyCards = updatedCards
      } catch (error) {
        console.error('Error updating LOB:', error)
      } finally {
        this.loading = false
      }
    },
    async handleDateChange() {
      if (!this.selectDate) return
      this.loading = true
      try {
        await api.updatePolicyEndDate(this.selectDate.value)
        await this.fetchPolicySummary()
      } catch (error) {
        console.error('Error updating date range:', error)
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    selectLob: {
      handler: 'handleLOBChange',
      deep: true
    },
    selectDate: {
      handler: 'handleDateChange',
      deep: true
    }
  }
}
</script>

<template>
  <v-row style="margin-top: 5px">
    <v-col cols="7">
      <v-flex class="pa-2" outlined tile style="display: flex">
        <v-text class="body-2 font-weight-bold mt-4" style="color: #1e83c2; margin-left: 20px"
          >Policy Summary -
        </v-text>
        <span>
          <p class="body-2 font-weight-bold mt-4" style="color: #e46a25; margin-left: 8px">
            {{ dateRange.from }} To {{ dateRange.to }}
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
      <v-flex v-for="card in policyCards" :key="card.id">
        <v-col>
          <v-hover v-slot="{ isHovering, props }" close-delay="200">
            <v-card
              :elevation="isHovering ? 16 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              width="150px"
              height="80px"
              :style="{ cursor: 'pointer' }"
            >
              <v-card-item>
                <v-card-title :style="{ color: card.color }">{{ card.title }}</v-card-title>
                <v-card-text>{{ card.subtitle }}</v-card-text>
              </v-card-item>
            </v-card>
          </v-hover>
        </v-col>
      </v-flex>
    </v-row>
  </main>

  <v-overlay v-model="loading" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>
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