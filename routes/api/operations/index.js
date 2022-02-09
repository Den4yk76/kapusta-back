import { Router } from 'express';
import {
  addIncome,
  changeBalance,
  deleteIncome,
  deleteExpense,
  addExpense
} from '../../../controllers/operations';
import {
  validateAddIncome,
  validationUpdateBalance,
  validateId,
} from './validation';
import guard from '../../../middlewares/guard';

const router = new Router();

router.post('/income', guard, validateAddIncome, addIncome);
router.post('/expense', guard, validateAddIncome, addExpense);
router.patch('/balance', guard, validationUpdateBalance, changeBalance);
router.delete('/income/:id', guard, validateId, deleteIncome);
router.delete('/expense/:id', guard, validateId, deleteExpense);

export default router;
