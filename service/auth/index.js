import Users from '../../repository/users';

class AuthService {
  async isUserExist(email) {
    const user = await Users.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { email } = await Users.create(body);
    return { email };
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }
}

export default AuthService;
