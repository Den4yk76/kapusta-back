import Income from '../model/income';
import Expense from '../model/expense';

const findIncome = async id => {
  const result = await Income.find({ owner: id });
  return result;
};

const findExpense = async id => {
  const result = await Expense.find({ owner: id });
  return result;
};

export default { findIncome, findExpense };
