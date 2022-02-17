import { Router } from 'express';
import {
  googleLogin,
  registration,
  login,
  logout,
  getCurrentUser,
} from '../../../controllers/auth';
import { validateAuth } from './validation';
import guard from '../../../middlewares/guard';

const router = new Router();

router.post('/google-login', googleLogin);
router.post('/signup', validateAuth, registration);
router.post('/login', validateAuth, login);
router.post('/logout', guard, logout);
router.get('/current', guard, getCurrentUser);

export default router;
