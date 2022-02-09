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

const findMonthTransactions = async (unixStart, unixEnd, category) => {
  //TODO: fit find query below
  // {$and : [{count: {$gte:500}}, {count: {$lte: 5000}}]}

  if (category === 'incomes') {
    const result = await Income.find();
    return result;
  }

  if (category === 'expenses') {
    const result = await Expense.find();
    return result;
  }
};

export default { findIncome, findExpense, findMonthTransactions };
