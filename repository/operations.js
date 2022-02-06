import Income from '../model/income';

const createIncome = () => {
  //to do Zmennn
};

const deleteIncome = (userId, incomeId) => {
  const result = Income.findOneAndRemove({
    _id: incomeId,
    owner: userId,
  });
  return result;
};

export default { createIncome, deleteIncome };
