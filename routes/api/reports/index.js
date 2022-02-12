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
  queryStringValidation,
} from './validation';

const router = new Router();

router.get('/income', guard, queryStringValidation, incomeReport);
router.get('/expense', guard, queryStringValidation, expenseReport);
router.get(
  '/month-transactions',
  guard,
  validateMonthTransactionsSchema,
  monthTransactions,
);
router.get('/month-amounts', guard, queryStringValidation, monthAmounts);

export default router;
