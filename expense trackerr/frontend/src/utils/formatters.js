// /frontend/src/utils/formatters.js

/**
 * Formats a number as currency (USD default).
 * @param {number} amount - The numeric value to format.
 * @returns {string} The formatted currency string (e.g., $1,234.56).
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Formats a date string or Date object into a readable format.
 * @param {string | Date} dateInput - The date value.
 * @returns {string} The formatted date string (e.g., Dec 04, 2025).
 */
export const formatDate = (dateInput) => {
  if (!dateInput) {
    return 'N/A';
  }
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};