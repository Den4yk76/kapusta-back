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
import errorWrapper from '../../../middlewares/error-handler';

const router = new Router();

router.get('/income', guard, queryStringValidation, errorWrapper(incomeReport));
router.get(
  '/expense',
  guard,
  queryStringValidation,
  errorWrapper(expenseReport),
);
router.get(
  '/month-transactions',
  guard,
  validateMonthTransactionsSchema,
  errorWrapper(monthTransactions),
);
router.get(
  '/month-amounts',
  guard,
  queryStringValidation,
  errorWrapper(monthAmounts),
);

export default router;
