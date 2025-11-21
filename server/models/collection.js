const { DataTypes, Model } = require('sequelize');

class Collection extends Model {
  static initialize(sequelize) {
    Collection.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      dueDate: { type: DataTypes.DATE, allowNull: false },
      amountDue: { type: DataTypes.DECIMAL, allowNull: false },
      status: { type: DataTypes.ENUM('pending','initiated','settled','failed'), defaultValue: 'pending' }
    }, { sequelize, modelName: 'collection' });
  }
}
module.exports = Collection;
