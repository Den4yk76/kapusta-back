import repositoryOperations from '../../repository/operations';
import repositoryUsers from '../../repository/users';

class OperationsService {


  async addIncomeObject(id, body) {
    const addIncomeObj = await repositoryOperations.createIncome({ owner: id, ...{ body } })
  }

  async deleteIncome(userId, incomeId) {
    const income = await repositoryOperations.deleteIncome(userId, incomeId);
    return income;
  }
}

export default OperationsService;
