import { delay, handleApiError } from './utils/apiUtils';
import { policyData } from './mockData/policyData';

export const api = {
  async getPolicySummary() {
    try {
      await delay(500); // Simulate network delay
      return policyData;
    } catch (error) {
      handleApiError(error);
    }
  },

  async updatePolicyEndDate(dateFilter) {
    try {
      await delay(300);
      return {
        success: true,
        message: 'Date filter updated successfully'
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  async filterByLOB(lobCode) {
    try {
      await delay(300);
      const filteredCards = policyData.policyCards.map(card => ({
        ...card,
        title: Math.floor(Math.random() * 100).toString() // Simulate different numbers for different LOBs
      }));
      return filteredCards;
    } catch (error) {
      handleApiError(error);
    }
  }
};