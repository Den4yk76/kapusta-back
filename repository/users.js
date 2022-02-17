import User from '../model/user';
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const findById = async id => {
  return await User.findById(id);
};

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async body => {
  const user = new User({ ...body, balance: 0 });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const googleLogin = async token => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const user = await findByEmail(payload.email);

  if (!user) {
    return await create({ email: payload.email, token });
  } else {
    await updateToken(user.id, token);
    return user;
  }
};

const getUserByToken = async token => {
  const user = await User.findOne({ token });
  return user;
};

export default {
  findById,
  findByEmail,
  create,
  updateToken,
  googleLogin,
  getUserByToken,
};
