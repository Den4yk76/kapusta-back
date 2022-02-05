import { Router } from 'express';
import { registration, logout } from '../../../controllers/auth';
import { validateAuth } from './validation';
import guard from '../../../middlewares/guard';

const router = new Router();

router.post('/signup', validateAuth, registration);
router.post('/logout', guard, logout);

export default router;
