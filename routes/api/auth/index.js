import { Router } from 'express';
import {
  googleLogin,
  registration,
  login,
  logout,
} from '../../../controllers/auth';
import { validateAuth } from './validation';
import guard from '../../../middlewares/guard';
import errorWrapper from '../../../middlewares/error-handler';

const router = new Router();

router.post('/google-login', errorWrapper(googleLogin));
router.post('/signup', validateAuth, errorWrapper(registration));
router.post('/login', validateAuth, errorWrapper(login));
router.post('/logout', guard, errorWrapper(logout));

export default router;
