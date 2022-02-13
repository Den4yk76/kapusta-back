import { HttpCode } from '../../lib/constants.js';
import AuthService from '../../service/auth/';
import { CustomError } from '../../lib/custom-error';
const authService = new AuthService();

const googleLogin = async (req, res) => {
  const { token } = req.body;
  const user = await authService.googleLogin(token);

  if (!user) {
    throw new CustomError(
      HttpCode.SERVICE_UNAVAILABLE,
      'Sorry, somthing went wrong. Try again later, or sign in with email and password',
    );
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
    throw new CustomError(HttpCode.CONFLICT, 'Email in use');
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
    throw new CustomError(HttpCode.UNAUTHORIZED, 'Email or password is wrong');
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

export { googleLogin, registration, login, logout };
