import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    // Simples validação e navegação
    if(email && pwd){
      navigate('/menu')
    }
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">E-mail</span>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-primary/50" />
          </label>
          <label className="block">
            <span className="text-gray-700">Senha</span>
            <input value={pwd} onChange={e => setPwd(e.target.value)} type="password" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-primary/50" />
          </label>
          <button className="btn-primary w-full">Entrar</button>
        </form>
      </div>
    </div>
  )
}
