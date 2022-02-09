import { Router } from 'express';
import { HttpCode } from '../../../lib/constants';
import guard from '../../../middlewares/guard';
import {
  incomeReport,
  expenseReport,
  monthTransactions,
  monthAmounts,
} from '../../../controllers/reports';

const router = new Router();

router.get('/income', guard, incomeReport);
router.get('/expense', guard, expenseReport);
router.post('/month-transactions', guard, monthTransactions); // Denys TODO: Validation and next steps inside methods
router.post('/month-amounts', guard, monthAmounts); // Denys TODO: Validation

export default router;
