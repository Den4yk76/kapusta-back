import { Router } from 'express';
import {
  addIncome,
  changeBalance,
  deleteIncome,
  deleteExpense,
  addExpense,
} from '../../../controllers/operations';
import {
  validateAddIncome,
  validationUpdateBalance,
  validateId,
} from './validation';
import guard from '../../../middlewares/guard';
import errorWrapper from '../../../middlewares/error-handler';

const router = new Router();

router.post('/income', guard, validateAddIncome, errorWrapper(addIncome));
router.post('/expense', guard, validateAddIncome, errorWrapper(addExpense));
router.patch(
  '/balance',
  guard,
  validationUpdateBalance,
  errorWrapper(changeBalance),
);
router.delete('/income/:id', guard, validateId, errorWrapper(deleteIncome));
router.delete('/expense/:id', guard, validateId, errorWrapper(deleteExpense));

export default router;
