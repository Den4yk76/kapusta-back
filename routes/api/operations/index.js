import { Router } from 'express';
import { addIncome, deleteIncome } from '../../../controllers/operations';
import { validateAddIncome } from './validation';
import guard from '../../../middlewares/guard';

const router = new Router();

router.post('/income', guard, validateAddIncome, addIncome);
router.delete('/delete-income/:id', guard, deleteIncome);

export default router;
