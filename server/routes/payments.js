const express = require('express');
const router = express.Router();
const { generatePaymentQR } = require('../services/qrService');
const { Payment, Collection } = require('../models');
const { v4: uuidv4 } = require('uuid');

// generate QR for a collection
router.post('/qr', async (req, res) => {
  try{
    const { collectionId } = req.body;
    const collection = await Collection.findByPk(collectionId);
    if(!collection) return res.status(404).json({ error: 'collection not found' });
    const { dataUrl, payload } = await generatePaymentQR({ amount: collection.amountDue, loanId: collection.loanId, collectionId });

    // create payment record
    const payment = await Payment.create({ method: 'qr', reference: payload.id, amount: collection.amountDue, collectionId });
    return res.json({ qr: dataUrl, paymentId: payment.id, payload });
  }catch(e){
    console.error(e); res.status(500).json({ error: e.message });
  }
});

// mark QR paid (in production this would come from PSP webhook)
router.post('/qr/confirm', async (req, res) => {
  try{
    const { paymentId, success } = req.body;
    const payment = await Payment.findByPk(paymentId);
    if(!payment) return res.status(404).json({ error: 'payment not found' });
    payment.status = success ? 'success' : 'failed';
    if(success) payment.settledAt = new Date();
    await payment.save();

    // update collection
    const collection = await Collection.findByPk(payment.collectionId);
    if(collection){
      collection.status = success ? 'settled' : 'failed';
      await collection.save();
    }

    // broadcast via sockets
    const io = require('../utils/socket').get();
    if(io) io.emit('payment.updated', { paymentId: payment.id, status: payment.status, collectionId: payment.collectionId });

    return res.json({ ok: true });
  }catch(e){
    console.error(e); res.status(500).json({ error: e.message });
  }
});

module.exports = router;
