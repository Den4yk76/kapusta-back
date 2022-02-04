import User from '../model/user';

const findByEmail = async email => {
  return await User.findOne({ email });
};

const create = async body => {
  const user = new User(body);
  return await user.save();
};

export default {
  findByEmail,
  create,
};
