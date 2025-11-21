// simple seed script to create demo loans and collections
const { sequelize, Loan, Collection } = require('./models');
(async ()=>{
  await sequelize.sync({ alter: true });
  const loan = await Loan.create({ accountNumber: 'ACC-1001', principal: 50000, outstanding: 20000 });
  await Collection.create({ dueDate: new Date(Date.now()+5*24*3600*1000), amountDue: 5000, loanId: loan.id });
  console.log('Seeded');
  process.exit(0);
})();
