import axiosInstance from './axiosInstance';

export const fetchTransactions = (params = {}) => {
  return axiosInstance.get('/transactions', { params })
    .then(response => response.data);
};

export const createTransaction = (data) => {
  return axiosInstance.post('/transactions', data)
    .then(response => response.data);
};

export const updateTransaction = (id, data) => {
  // PATCH request requires the transaction ID in the URL
  return axiosInstance.patch(`/transactions/${id}`, data)
    .then(response => response.data);
};

export const deleteTransaction = (id) => {
  // DELETE request requires the transaction ID in the URL
  return axiosInstance.delete(`/transactions/${id}`)
    .then(response => response.data);
};