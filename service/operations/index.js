import repositoryOperations from '../../repository/operations';
import repositoryUsers from '../../repository/users';

class OperationsService {
  async changeBalance() {
    //to do Zmennn
  }

  async addIncome() {
    //to do Zmennn
  }

  async deleteIncome(userId, incomeId) {
    const income = await repositoryOperations.deleteIncome(userId, incomeId);
    return income;
  }
}

export default OperationsService;
