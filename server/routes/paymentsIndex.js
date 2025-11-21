const express = require('express');
const router = express.Router();
const { Payment } = require('../models');

router.get('/', async (req, res) => {
  const items = await Payment.findAll({ limit: 100, order: [['createdAt','DESC']] });
  res.json(items);
});

module.exports = router;
