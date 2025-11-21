const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

async function generatePaymentQR({ amount, loanId, collectionId }){
  const payload = {
    id: uuidv4(),
    type: 'samunnati-qr-payment',
    amount, loanId, collectionId,
    createdAt: new Date().toISOString()
  };
  const text = JSON.stringify(payload);
  const dataUrl = await QRCode.toDataURL(text);
  return { payload, dataUrl };
}

module.exports = { generatePaymentQR };
