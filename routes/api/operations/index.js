import { Router } from 'express';
import { addIncome, changeBalance } from '../../../controllers/operations';
import { validateAddIncome } from './validation';
import guard from '../../../middlewares/guard';

const router = new Router();

router.post('/income', guard, validateAddIncome, addIncome);
router.patch('/balance', guard, changeBalance);

export default router;
