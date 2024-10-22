import axiosInstance from './axiosConfig';


export const api = {
  getBalance: async () => {
    console.log(axiosInstance)
    const response = await axiosInstance.get(`dashboard`);
    return response.data;
  },

  addIncome: async (data: { amount: number; description: string; category: string; date: string }) => {
    const response = await axiosInstance.post(`/transactions`, { ...data, type: 'income' });
    return response.data;
  },

  addExpense: async (data: { amount: number; description: string; category: string; date: string }) => {
    const response = await axiosInstance.post(`/transactions`, { ...data, type: 'expense' });
    return response.data;
  },

  getTransactions: async () => {
    const response = await axiosInstance.get(`/transactions`);
    return response.data;
  },

  getBudget: async () => {
    const response = await axiosInstance.get(`/budgets`);
    return response.data;
  },

  setBudget: async (data: { category: string; amount: number }) => {
    const response = await axiosInstance.post(`/budgets`, data);
    return response.data;
  },

  getReports: async () => {
    const response = await axiosInstance.get(`/reports`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  },

  addCategory: async (name: string) => {
    const response = await axiosInstance.post(`/categories`, { name });
    return response.data;
  },

  getAccounts: async () => {
    const response = await axiosInstance.get(`/accounts`);
    return response.data;
  },

  addAccount: async (name: string) => {
    const response = await axiosInstance.post(`/accounts`, { name });
    return response.data;
  },
};
