// /frontend/src/pages/Analytics.jsx

import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/common/Header.jsx';
import BarChartComponent from '../components/charts/BarChartComponent.jsx';
import PieChartComponent from '../components/charts/PieChartComponent.jsx';
import { fetchSpendingTrends } from '../api/reportApi.js'; 

const Analytics = () => {
  const [reportData, setReportData] = useState({ monthlyTrends: [], categoryBreakdown: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReportData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSpendingTrends();
      // The backend should ideally return an object like { monthlyTrends: [...], categoryBreakdown: [...] }
      setReportData(data); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Failed to load analytics data. Status: ${err.response?.status || 'Network Error'}`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReportData();
  }, [loadReportData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900">📊 Financial Analytics</h2>

        {loading && <p className="text-indigo-600 font-medium">Generating reports...</p>}
        
        {error && (
            <div className="text-red-600 bg-red-100 p-4 rounded-md">
              <p>**Error Loading Analytics:** {error}</p>
            </div>
          )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Monthly Trends Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              {reportData.monthlyTrends && reportData.monthlyTrends.length > 0 ? (
                <BarChartComponent chartData={reportData.monthlyTrends} />
              ) : (
                <p className="text-gray-500 py-10 text-center">No sufficient monthly data available.</p>
              )}
            </div>

            {/* Category Breakdown Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              {reportData.categoryBreakdown && reportData.categoryBreakdown.length > 0 ? (
                <PieChartComponent chartData={reportData.categoryBreakdown} />
              ) : (
                <p className="text-gray-500 py-10 text-center">No sufficient category data available.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analytics;