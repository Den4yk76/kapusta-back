import repositoryOperations from '../../repository/operations';
class OperationsService {
  async addIncomeObject(id, body) {
    const addIncomeObj = await repositoryOperations.createIncome({
      owner: id,
      ...{ body },
    });
  }

  async deleteIncome(userId, incomeId) {
    const income = await repositoryOperations.deleteIncome(userId, incomeId);
    return income;
  }

  async deleteExpense(userId, expenseId) {
    const expense = await repositoryOperations.deleteExpense(userId, expenseId);
    return expense;
  }
}

export default OperationsService;
