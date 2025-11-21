const { DataTypes, Model } = require('sequelize');

class Loan extends Model {
  static initialize(sequelize) {
    Loan.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      accountNumber: { type: DataTypes.STRING, allowNull: false },
      principal: { type: DataTypes.DECIMAL, allowNull: false },
      outstanding: { type: DataTypes.DECIMAL, allowNull: false },
      status: { type: DataTypes.ENUM('current','past_due','closed'), defaultValue: 'current' }
    }, { sequelize, modelName: 'loan' });
  }
}
module.exports = Loan;
