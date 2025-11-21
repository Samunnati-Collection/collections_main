// Simulated NACH provider integration
const { v4: uuidv4 } = require('uuid');

async function initiateNACH({ accountHolder, accountNumber, ifsc, amount, collectionId }){
  // In prod: call bank/aggregator API with signed request
  const requestId = uuidv4();
  // simulate provider returning an instruction id and pending status
  return { requestId, status: 'pending', providerRef: `NACH-${requestId}` };
}

async function simulateBankCallback(app, paymentId, success = true){
  // placeholder for simulation
}

module.exports = { initiateNACH, simulateBankCallback };
