const sequelize = require('../config/db');
const User = require('./user');
const Loan = require('./loan');
const Collection = require('./collection');
const Payment = require('./payment');

// initialize models with sequelize instance
User.initialize(sequelize);
Loan.initialize(sequelize);
Collection.initialize(sequelize);
Payment.initialize(sequelize);

// relations
User.hasMany(Loan, { foreignKey: 'userId' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Loan.hasMany(Collection, { foreignKey: 'loanId' });
Collection.belongsTo(Loan, { foreignKey: 'loanId' });
Collection.hasMany(Payment, { foreignKey: 'collectionId' });
Payment.belongsTo(Collection, { foreignKey: 'collectionId' });

module.exports = { sequelize, User, Loan, Collection, Payment };
