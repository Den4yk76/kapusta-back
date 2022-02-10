import { Router } from 'express';
import guard from '../../../middlewares/guard';
import {
  incomeReport,
  expenseReport,
  monthTransactions,
  monthAmounts,
} from '../../../controllers/reports';
import {
  validateMonthTransactionsSchema,
  validateMonthAmountsSchema,
} from './validation';

const router = new Router();

router.get('/income', guard, incomeReport);
router.get('/expense', guard, expenseReport);
router.post(
  '/month-transactions',
  guard,
  validateMonthTransactionsSchema,
  monthTransactions,
);
router.post('/month-amounts', guard, validateMonthAmountsSchema, monthAmounts);

export default router;
