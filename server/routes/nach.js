const express = require('express');
const router = express.Router();
const { initiateNACH } = require('../services/nachService');
const { Payment, Collection } = require('../models');
const { reconcilePayment } = require('../services/reconciliation');

// initiate a NACH debit for a collection
router.post('/initiate', async (req, res) => {
  try{
    const { collectionId, accountHolder, accountNumber, ifsc, amount } = req.body;
    const collection = await Collection.findByPk(collectionId);
    if(!collection) return res.status(404).json({ error: 'collection not found' });

    const provider = await initiateNACH({ accountHolder, accountNumber, ifsc, amount, collectionId });

    const payment = await Payment.create({ method: 'nach', reference: provider.providerRef, amount, collectionId, status: 'pending' });

    // return provider info and payment record id
    return res.json({ paymentId: payment.id, provider });
  }catch(e){
    console.error(e); res.status(500).json({ error: e.message });
  }
});

// webhook endpoint for bank/provider to call when NACH event occurs
router.post('/webhook', async (req, res) => {
  try{
    const { paymentId, status } = req.body; // provider should send
    // reconcile: status -> 'success' or 'failed'
    await reconcilePayment(paymentId, status);
    return res.json({ ok: true });
  }catch(e){
    console.error(e); res.status(500).json({ error: e.message });
  }
});

module.exports = router;
