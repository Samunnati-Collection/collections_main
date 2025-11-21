const { DataTypes, Model } = require('sequelize');

class User extends Model {
  static initialize(sequelize) {
    User.init({
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      role: { type: DataTypes.ENUM('admin','agent','collector'), defaultValue: 'collector' }
    }, { sequelize, modelName: 'user' });
  }
}
module.exports = User;
