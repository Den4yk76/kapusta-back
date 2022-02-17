import { Router } from 'express';
import {
  googleLogin,
  registration,
  login,
  logout,
  currentUser,
} from '../../../controllers/auth';
import { validateAuth } from './validation';
import guard from '../../../middlewares/guard';
import errorWrapper from '../../../middlewares/error-handler';

const router = new Router();

router.post('/google-login', errorWrapper(googleLogin));
router.post('/signup', validateAuth, errorWrapper(registration));
router.post('/login', validateAuth, errorWrapper(login));
router.post('/logout', guard, errorWrapper(logout));
router.get('/current', guard, errorWrapper(currentUser));

export default router;
