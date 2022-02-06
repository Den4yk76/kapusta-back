import { HttpCode } from '../../lib/constants.js';
import AuthService from '../../service/auth/';
const authService = new AuthService();

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
    },
  };
  res.status(HttpCode.OK).json(response);
};

const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res.status(HttpCode.NO_CONTENT).json();
};

export { registration, login, logout };
