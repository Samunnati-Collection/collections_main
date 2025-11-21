import React, { useState } from 'react'
import API from '../api'

export default function NACHForm({ collectionId }){
  const [state, setState] = useState({ accountHolder: '', accountNumber: '', ifsc: '', amount: '' })

  async function submit(){
    try{
      const res = await API.post('/nach/initiate', { collectionId, ...state });
      alert('NACH initiated: ' + res.data.paymentId);
    }catch(e){
      console.error(e); alert('Failed');
    }
  }

  return (
    <div className="p-2">
      <input placeholder="Account name" value={state.accountHolder} onChange={e=>setState(s=>({...s, accountHolder:e.target.value}))} className="border p-1 block mb-1" />
      <input placeholder="Account no" value={state.accountNumber} onChange={e=>setState(s=>({...s, accountNumber:e.target.value}))} className="border p-1 block mb-1" />
      <input placeholder="IFSC" value={state.ifsc} onChange={e=>setState(s=>({...s, ifsc:e.target.value}))} className="border p-1 block mb-1" />
      <input placeholder="Amount" value={state.amount} onChange={e=>setState(s=>({...s, amount:e.target.value}))} className="border p-1 block mb-1" />
      <button onClick={submit} className="px-2 py-1 bg-yellow-600 text-white rounded">Initiate NACH</button>
    </div>
  )
}
