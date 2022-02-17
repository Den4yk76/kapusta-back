import { HttpCode } from '../../lib/constants.js';
import AuthService from '../../service/auth/';
const authService = new AuthService();

const googleLogin = async (req, res) => {
  const { token } = req.body;
  const user = await authService.googleLogin(token);

  if (!user) {
    return res.status(HttpCode.SERVICE_UNAVAILABLE).json({
      status: 'error',
      code: HttpCode.SERVICE_UNAVAILABLE,
      message:
        'Sorry, somthing went wrong. Try again later, or sign in with email and password',
    });
  }

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    user,
  });
};

const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email in use',
    });
  }

  const data = await authService.create(req.body);

  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    user: { ...data },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);

  if (!user) {
    return res
      .status(HttpCode.UNAUTHORIZED)
      .json({ message: 'Email or password is wrong' });
  }

  const token = await authService.getToken(user);
  await authService.setToken(user.id, token);

  const response = {
    token: token,
    user: {
      email: user.email,
      balance: user.balance,
    },
  };
  res.status(HttpCode.OK).json(response);
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res.status(HttpCode.NO_CONTENT).json();
};

const getCurrentUser = async (req, res, next) => {
  console.log('user by token from contr');
  const user = await authService.getUserByToken(req.user.token);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      Status: 'Unauthorized',
      code: HttpCode.UNAUTHORIZED,
      message: {
        message: 'Not authorized',
      },
    });
  }
  return res.status(HttpCode.OK).json({
    status: 'OK',
    code: HttpCode.OK,
    user: {
      email: req.user.email,
    },
  });
};
export { googleLogin, registration, login, logout, getCurrentUser };
