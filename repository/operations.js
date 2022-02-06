import Income from '../model/income';
import User from '../model/user';
// console.log('user', User()); //user { token: null, balance: '0', id: '620024295c2ca34733147bd3' }

const createIncome = () => {
  //to do Zmennn
};

const updateBalance = async (id, body) => {
  return User.findOneAndUpdate({ _id: id }, { ...body }, { new: true });
};

export default { createIncome, updateBalance };
