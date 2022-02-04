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
}

export default AuthService;
