import Income from '../model/income';
import User from '../model/user';

const createIncome = async (body) => {
  const income = new Income(body);
  return income
};


const updateBalance = async (id, body) => {
  return User.findOneAndUpdate({ _id: id }, { ...body }, { new: true });
};

const deleteIncome = (userId, incomeId) => {
  const result = Income.findOneAndRemove({
    _id: incomeId,
    owner: userId,
  });
  return result;
};

export default { createIncome, deleteIncome, updateBalance };
