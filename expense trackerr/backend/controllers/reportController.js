export const getSummary = async (req, res) => {
    try {
        const userId = req.user._id;

        const summary = await Transaction.aggregate([
            { $match: { user: userId } },
            { $group: {
                _id: null,
                totalIncome: { $sum: { $cond: [ { $eq: [ "$type", "income" ] }, "$amount", 0 ] } },
                totalExpense: { $sum: { $cond: [ { $eq: [ "$type", "expense" ] }, "$amount", 0 ] } }
            }},
            { $project: {
                _id: 0,
                totalIncome: 1,
                totalExpense: 1,
                netBalance: { $subtract: ["$totalIncome", "$totalExpense"] }
            }}
        ]);

        if (summary.length === 0) {
            return res.status(200).json({ totalIncome: 0, totalExpense: 0, netBalance: 0 });
        }

        res.status(200).json(summary[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error while generating summary', error: error.message });
    }
};



export const getSpendingTrends = async (req, res) => {
    try {
        const userId = req.user._id;
        const { year } = req.query; 

        const pipeline = [
            { $match: { user: userId, type: 'expense' } },
            
            ...(year ? [{ $match: { date: { 
                $gte: new Date(`${year}-01-01`), 
                $lte: new Date(`${year}-12-31T23:59:59.999Z`) 
            } } }] : []),

            { $group: {
                _id: { month: { $month: "$date" } },
                totalSpent: { $sum: "$amount" }
            }},
            
            { $sort: { "_id.month": 1 } },
            
            { $project: {
                _id: 0,
                month: "$_id.month",
                totalSpent: 1
            }}
        ];

        const trends = await Transaction.aggregate(pipeline);

        res.status(200).json(trends);
    } catch (error) {
        res.status(500).json({ message: 'Server error while generating spending trends', error: error.message });
    }
};
