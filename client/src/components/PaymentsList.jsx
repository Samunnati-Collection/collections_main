import React, { useEffect, useState } from 'react'
import API from '../api'
import { socket } from '../sockets'

export default function PaymentsList(){
  const [payments, setPayments] = useState([])

  useEffect(()=>{
    async function load(){
      try{
        const res = await API.get('/payments');
        setPayments(res.data);
      }catch(e){
        console.error(e);
      }
    }
    load();
    socket.on('payment.updated', payload => load());
    return ()=>socket.off('payment.updated');
  },[])

  return (
    <div className="bg-white p-3 rounded shadow">
      {payments.length === 0 && <div className="text-sm text-gray-500">No payments yet.</div>}
      <ul className="space-y-2">
        {payments.map(p => (
          <li key={p.id} className="border rounded p-2">
            <div>Method: {p.method}</div>
            <div>Amount: {p.amount}</div>
            <div>Status: {p.status}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
