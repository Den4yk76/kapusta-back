import { Router } from 'express';
import { HttpCode } from '../../../lib/constants';
import guard from '../../../middlewares/guard';
import { incomeReport, expenseReport } from '../../../controllers/reports';

const router = new Router();

router.get('/income', guard, incomeReport);
router.get('/expense', guard, expenseReport);

export default router;
