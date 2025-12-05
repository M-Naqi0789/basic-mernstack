import Transaction from '../models/Transaction.js';

export const createTransaction = async (req, res) => {
    try {
        const { description, amount, type, category } = req.body;

        if (!description || !amount || !type || !category) {
            return res.status(400).json({ message: 'All fields are required for a transaction.' });
        }

        const newTransaction = await Transaction.create({
            user: req.user._id,
            description,
            amount,
            type,
            category,
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error while creating transaction', error: error.message });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const userId = req.user._id;
        const { type, category, startDate, endDate } = req.query;

        const filter = { user: userId };

        if (type) {
            filter.type = type;
        }

        if (category) {
            filter.category = category;
        }

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) {
                filter.date.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.date.$lte = new Date(endDate);
            }
        }

        const transactions = await Transaction.find(filter).sort({ date: -1 });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching transactions', error: error.message });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.user._id;

        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: transactionId, user: userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found or unauthorized' });
        }

        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating transaction', error: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.user._id;

        const result = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });

        if (!result) {
            return res.status(404).json({ message: 'Transaction not found or unauthorized' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting transaction', error: error.message });
    }
};