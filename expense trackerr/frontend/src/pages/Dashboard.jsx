// /frontend/src/pages/Dashboard.jsx

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/common/Header.jsx';
import { fetchSummaryReport } from '../api/reportApi.js'; 

const StatCard = ({ title, value, colorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className={`mt-1 text-3xl font-bold ${colorClass}`}>
      ${parseFloat(value).toFixed(2)}
    </p>
  </div>
);

const Dashboard = () => {
  const [summary, setSummary] = useState({ 
    totalIncome: 0, 
    totalExpense: 0, 
    netBalance: 0 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSummaryReport();
      // Ensure the component handles the structure returned by your GET /report/summary endpoint
      setSummary(data); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Failed to load dashboard data. Status: ${err.response?.status || 'Network Error'}`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);
  
  // Determine color for Net Balance
  const balanceColor = summary.netBalance >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto p-6 space-y-10">
        <h2 className="text-3xl font-extrabold text-gray-900">🚀 Dashboard Overview</h2>

        {loading && <p className="text-indigo-600 font-medium">Loading financial summary...</p>}
        
        {error && (
            <div className="text-red-600 bg-red-100 p-4 rounded-md">
              <p>**Error Loading Summary:** {error}</p>
            </div>
          )}

        {!loading && !error && (
          <>
            {/* --- Summary Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="Total Income" 
                value={summary.totalIncome} 
                colorClass="text-green-600" 
              />
              <StatCard 
                title="Total Expenses" 
                value={summary.totalExpense} 
                colorClass="text-red-600" 
              />
              <StatCard 
                title="Net Balance" 
                value={summary.netBalance} 
                colorClass={balanceColor} 
              />
            </div>

            {/* --- Placeholder for Charts (Step 9) --- */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 min-h-[400px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Spending Trends (Analytics)</h3>
              <p className="text-gray-500 mt-2">Charts and detailed reports will appear here in Step 9.</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;