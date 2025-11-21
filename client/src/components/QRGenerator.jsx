import React, { useState } from 'react'
import API from '../api'

export default function QRGenerator({ collectionId }){
  const [qrData, setQrData] = useState(null)
  const [paymentId, setPaymentId] = useState(null)

  async function createQR(){
    const res = await API.post('/payments/qr', { collectionId });
    setQrData(res.data.qr);
    setPaymentId(res.data.paymentId);
  }

  async function confirmPaid(){
    if(!paymentId) return alert('Create QR first');
    await API.post('/payments/qr/confirm', { paymentId, success: true });
    alert('Marked paid (simulated)');
  }

  return (
    <div>
      <button onClick={createQR} className="px-3 py-1 bg-blue-600 text-white rounded">Generate QR</button>
      {qrData && (
        <div className="mt-2">
          <img src={qrData} alt="qr" className="w-40 h-40" />
          <div className="mt-2 flex gap-2">
            <button onClick={confirmPaid} className="px-3 py-1 bg-green-600 text-white rounded">Mark Paid (simulate)</button>
          </div>
        </div>
      )}
    </div>
  )
}
