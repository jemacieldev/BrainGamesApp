import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Resultado({ results, clearResults }){
  const navigate = useNavigate()
  const total = results?.length || 0
  const correct = (results || []).filter(r => r.correct).length

  return (
    <div className="py-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Parabéns</h2>
      <div className="max-w-xs mx-auto bg-white p-6 rounded-xl shadow">
        <div className="text-center mb-4">Você acertou <strong>{correct}</strong> de <strong>{total}</strong></div>
        <div className="mb-4">
          <div className="inline-block bg-yellow-100 p-6 rounded-full shadow">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l2.09 4.24L18.7 7l-3.55 2.76L15.82 14 12 11.77 8.18 14l.67-4.24L5.3 7l4.61-.76L12 2z" fill="#f59e0b"/></svg>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { if(clearResults) clearResults(); navigate('/menu') }} className="px-4 py-2 rounded-full bg-white border">Menu</button>
          <button onClick={() => navigate('/relatorio')} className="px-4 py-2 rounded-full bg-primary text-white">Continuar</button>
        </div>
      </div>
    </div>
  )
}
