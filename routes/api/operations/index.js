import { Router } from 'express';
import { updateBalance } from '../../../controllers/operations';

const router = new Router();

router.patch('./balance', updateBalance);

export default router;
