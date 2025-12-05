import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/common/Header.jsx';
import TransactionForm from '../components/transactions/TransactionForm.jsx';
import TransactionTable from '../components/transactions/TransactionTable.jsx';
import { fetchTransactions } from '../api/transactionApi.js';

const TransactionsLedger = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({}); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  // State to track which transaction is being edited (null for creation)
  const [editingTransaction, setEditingTransaction] = useState(null);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions(filters); 
      setTransactions(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Failed to fetch transactions. Status: ${err.response?.status || 'Network Error'}`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleTransactionAction = () => {
    // Called after a transaction is Created, Updated, or Deleted
    closeModal();
    loadTransactions();
  };

  const handleNewTransaction = () => {
    setEditingTransaction(null); // Clear editing state for a new transaction
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction); // Set the transaction data for the form
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null); // Reset editing state
  };

  // Placeholder logic for filter/sort (which still needs full implementation)
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Transactions Ledger ({transactions.length})</h2>

        {/* --- Controls Section --- */}
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" onClick={() => handleFilterChange({ type: 'expense' })}>Filter (Expense)</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" onClick={() => setFilters({})}>Clear Filters</button>
          </div>
          <button 
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleNewTransaction}
          >
            ➕ New Transaction
          </button>
        </div>
        
        {/* --- Transaction List/Table Section --- */}
        <div className="w-full bg-white p-6 rounded-lg shadow-xl border border-gray-200 min-h-[500px]">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-indigo-600 font-medium">Loading transactions...</p>
            </div>
          )}

          {error && (
            <div className="text-red-600 bg-red-100 p-4 rounded-md">
              <p>**Error Loading Data:** {error}</p>
            </div>
          )}

          {!loading && !error && (
            <TransactionTable 
              transactions={transactions} 
              onEdit={handleEditTransaction} 
              onDeleted={handleTransactionAction} 
            />
          )}
        </div>
      </main>

      {/* --- Modal for TransactionForm --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full m-4 shadow-2xl">
            <TransactionForm 
              onClose={closeModal} 
              onTransactionCreated={handleTransactionAction} 
              initialData={editingTransaction} // Pass data for editing
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default TransactionsLedger;