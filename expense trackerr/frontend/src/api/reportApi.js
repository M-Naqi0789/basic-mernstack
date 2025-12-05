import axiosInstance from './axiosInstance';

export const fetchSummaryReport = () => {
  return axiosInstance.get('/report/summary')
    .then(response => response.data);
};

export const fetchSpendingTrends = () => {
  // This hits your backend's GET /report/spending-trends endpoint
  // The backend should return data aggregated by month/category.
  return axiosInstance.get('/report/spending-trends')
    .then(response => response.data);
};