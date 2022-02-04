import { Router } from 'express';
import { registration } from '../../../controllers/auth';
import { validateAuth } from './validation';

const router = new Router();

router.post('/signup', validateAuth, registration);

export default router;
