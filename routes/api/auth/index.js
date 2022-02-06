import { Router } from 'express';
import { registration, login, logout } from '../../../controllers/auth';
import { validateAuth } from './validation';
import guard from '../../../middlewares/guard';

const router = new Router();

router.post('/signup', validateAuth, registration);
router.post('/login', validateAuth, login);
router.post('/logout', guard, logout);

export default router;
