import express from 'express';
import { protect } from '../middleware/authMiddleware.js'
import { getSummary, getSpendingTrends } from '../controllers/reportController.js';;

const router = express.Router();

router.get('/summary', protect, getSummary);
router.get('/spending-trends', protect, getSpendingTrends);

export default router;