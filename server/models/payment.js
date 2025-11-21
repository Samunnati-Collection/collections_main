const { DataTypes, Model } = require('sequelize');

class Payment extends Model {
  static initialize(sequelize) {
    Payment.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      method: { type: DataTypes.ENUM('qr','nach','bank_transfer'), allowNull: false },
      reference: { type: DataTypes.STRING },
      amount: { type: DataTypes.DECIMAL, allowNull: false },
      status: { type: DataTypes.ENUM('initiated','success','failed','pending'), defaultValue: 'initiated' },
      settledAt: { type: DataTypes.DATE }
    }, { sequelize, modelName: 'payment' });
  }
}
module.exports = Payment;
