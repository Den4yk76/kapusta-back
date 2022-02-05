import { Router } from 'express';
import { registration, login } from '../../../controllers/auth';
import { validateAuth } from './validation';

const router = new Router();

router.post('/signup', validateAuth, registration);
router.post('/login', validateAuth, login);

export default router;
