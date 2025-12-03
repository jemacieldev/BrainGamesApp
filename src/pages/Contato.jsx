import React, { useState } from 'react'
import Voltar from "../components/Voltar"; 


export default function Contato() {
  const [form, setForm] = useState({
    id: "",
    email: "",
    telefone: "",
    mensagem: ""
  })

  const [enviado, setEnviado] = useState(false)

  function handleChange(e){
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e){
    e.preventDefault()

    const registros = JSON.parse(localStorage.getItem("bg_contatos") || "[]")
    registros.push({ ...form, data: new Date().toISOString() })
    localStorage.setItem("bg_contatos", JSON.stringify(registros))

    setEnviado(true)
    setForm({ id:"", email:"", telefone:"", mensagem:"" })
  }

  return (
    <div className="p-6 max-w-lg mx-auto">

      <Voltar />

      <div className="flex flex-col items-center mb-8">
        <img
          src="/public/contato.webp"
          alt="Contato"
          className="w-32 h-32 object-cover rounded-full shadow-md border"
        />

        <h1 className="text-3xl font-bold mt-4">Contato</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="id"
          placeholder="ID do aluno (se houver)"
          value={form.id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="mensagem"
          placeholder="Mensagem"
          required
          rows="4"
          value={form.mensagem}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>

        <button className="btn-primary px-4 py-2 rounded">Enviar</button>

        {enviado && (
          <p className="text-green-600 font-medium mt-2">
            Mensagem enviada com sucesso!
          </p>
        )}
      </form>
    </div>
  )
}

