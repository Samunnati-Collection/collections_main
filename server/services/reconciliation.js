const { Payment, Collection } = require('../models');
const socketUtil = require('../utils/socket');

async function reconcilePayment(paymentId, status, settledAt = new Date()){
  const payment = await Payment.findByPk(paymentId);
  if(!payment) throw new Error('Payment not found');
  payment.status = status;
  if(status === 'success') payment.settledAt = settledAt;
  await payment.save();

  // update collection
  const collection = await Collection.findByPk(payment.collectionId);
  if(collection){
    if(status === 'success') collection.status = 'settled';
    else if(status === 'failed') collection.status = 'failed';
    await collection.save();
  }

  // emit socket event
  const io = socketUtil.get();
  if(io) io.emit('payment.updated', { paymentId: payment.id, status: payment.status, collectionId: payment.collectionId });
  return payment;
}

module.exports = { reconcilePayment };
