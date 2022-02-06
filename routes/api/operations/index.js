import { Router } from 'express';
import { addIncome } from '../../../controllers/operations';
import { validateAddIncome } from './validation';
import guard from '../../../middlewares/guard';

const router = new Router();

router.post('/income', guard, validateAddIncome, addIncome);

export default router;