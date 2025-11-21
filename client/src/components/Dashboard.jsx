import React, { useEffect, useState } from 'react'
import API from '../api'
import { socket } from '../sockets'
import QRGenerator from './QRGenerator'
import NACHForm from './NACHForm'
import PaymentsList from './PaymentsList'

export default function Dashboard(){
  const [collections, setCollections] = useState([])

  useEffect(()=>{
    // fetch collections - in demo we'll query /api/loans or seed data; simple placeholder
    async function load(){
      try{
        const res = await API.get('/loans');
        setCollections(res.data);
      }catch(e){
        console.error(e);
      }
    }
    load();

    socket.on('payment.updated', payload => {
      // reflect realtime updates
      console.log('payment.updated', payload);
      // refresh collections or apply patch
      load();
    })

    return () => socket.off('payment.updated');
  },[])

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <h2 className="text-xl font-semibold mb-2">Loans & Collections</h2>
        {collections.map(loan => (
          <div key={loan.id} className="bg-white p-4 rounded shadow mb-3">
            <div className="flex justify-between">
              <div>
                <div className="font-bold">{loan.accountNumber}</div>
                <div>Outstanding: {loan.outstanding}</div>
              </div>
              <div className="text-sm text-gray-600">Status: {loan.status}</div>
            </div>
            <div className="mt-3">
              {loan.collections?.map(col => (
                <div key={col.id} className="border p-2 rounded mb-2">
                  <div>Due: {new Date(col.dueDate).toLocaleDateString()}</div>
                  <div>Amount: {col.amountDue}</div>
                  <div>Status: {col.status}</div>
                  <div className="mt-2 flex gap-2">
                    <QRGenerator collectionId={col.id} />
                    <NACHForm collectionId={col.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-2">Payments & Settlements</h2>
        <PaymentsList />
      </div>
    </div>
  )
}
