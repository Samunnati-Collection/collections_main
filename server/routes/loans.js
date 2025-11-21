const express = require('express');
const router = express.Router();
const { Loan, Collection } = require('../models');

router.get('/', async (req, res) => {
  // return loans with collections
  const loans = await Loan.findAll({ include: [{ model: Collection }] });
  res.json(loans);
});

module.exports = router;
